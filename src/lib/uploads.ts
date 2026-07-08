import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Where uploaded thumbnails live. In the container this is a mounted Docker
// volume (see docker-compose.prod.yml); locally it resolves to ./uploads.
// Kept relative (not process.cwd()) so Next's file tracer doesn't pull in the
// whole project directory.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

// Accepted image types -> file extension.
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB

/** Stored filenames are always <32 hex>.<ext>; reject anything else (traversal). */
export const SAFE_NAME_RE = /^[a-f0-9]{32}\.(jpg|png|webp)$/;

export type SaveResult =
  | { ok: true; filename: string }
  | { ok: false; error: string };

/**
 * Validate + persist an uploaded image to UPLOAD_DIR. Returns the stored
 * filename (to save as `thumbnailPath`) or a user-facing error message.
 */
export async function saveThumbnail(file: File): Promise<SaveResult> {
  if (!file || file.size === 0) return { ok: false, error: "Vui lòng chọn ảnh thumbnail." };
  if (file.size > MAX_UPLOAD_BYTES) return { ok: false, error: "Ảnh vượt quá 2MB." };

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) return { ok: false, error: "Chỉ chấp nhận ảnh JPG, PNG hoặc WEBP." };

  const filename = `${randomBytes(16).toString("hex")}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return { ok: true, filename };
}

export function contentTypeFor(filename: string): string {
  if (filename.endsWith(".png")) return "image/png";
  if (filename.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}
