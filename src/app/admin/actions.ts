"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects, users } from "@/db/schema";
import { getCurrentUser, createSession, destroySession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { saveThumbnail, UPLOAD_DIR, SAFE_NAME_RE } from "@/lib/uploads";

export type ActionState = { ok: boolean; message: string };

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/** Login form action. Redirects to /admin on success. */
export async function login(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const email = str(fd, "email").toLowerCase();
  const password = str(fd, "password");
  if (!email || !password) return { ok: false, message: "Nhập email và mật khẩu." };

  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = rows[0];
  // Verify even when the user is missing, to avoid leaking which emails exist.
  const dummy = "00:00";
  const valid = await verifyPassword(password, user?.passwordHash ?? dummy);
  if (!user || !valid) return { ok: false, message: "Email hoặc mật khẩu không đúng." };

  await createSession(user.id);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

/** Create a showcase project (auth required). */
export async function createProject(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "Phiên đã hết hạn, đăng nhập lại." };

  const title = str(fd, "title");
  const description = str(fd, "description");
  const linkUrl = str(fd, "linkUrl");
  const file = fd.get("thumbnail");

  if (title.length < 2) return { ok: false, message: "Tiêu đề quá ngắn." };
  if (!/^https?:\/\/.+/i.test(linkUrl)) {
    return { ok: false, message: "Link phải bắt đầu bằng http:// hoặc https://" };
  }
  if (!(file instanceof File)) return { ok: false, message: "Vui lòng chọn ảnh thumbnail." };

  const saved = await saveThumbnail(file);
  if (!saved.ok) return { ok: false, message: saved.error };

  try {
    await db.insert(projects).values({
      title,
      description: description || null,
      thumbnailPath: saved.filename,
      linkUrl,
      createdBy: user.id,
    });
  } catch (err) {
    console.error("Failed to create project:", err);
    return { ok: false, message: "Không thể lưu dự án. Thử lại sau." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true, message: "Đã thêm dự án." };
}

/** Delete a project + its thumbnail file (auth required). */
export async function deleteProject(fd: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;

  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  const project = rows[0];
  if (!project) return;

  await db.delete(projects).where(eq(projects.id, id));

  // Best-effort cleanup of the file on disk.
  if (SAFE_NAME_RE.test(project.thumbnailPath)) {
    await unlink(path.join(UPLOAD_DIR, project.thumbnailPath)).catch(() => {});
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
