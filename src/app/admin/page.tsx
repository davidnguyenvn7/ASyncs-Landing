import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { deleteProject, logout } from "./actions";
import { ProjectForm } from "./project-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireUser();
  const list = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return (
    <div className="admin-wrap">
      <header className="admin-top">
        <div>
          <h1 className="admin-title">Quản trị dự án</h1>
          <p className="admin-sub">Đăng nhập: {user.name || user.email}</p>
        </div>
        <form action={logout}>
          <button className="btn btn-ghost-d btn-text" type="submit">
            Đăng xuất
          </button>
        </form>
      </header>

      <section className="admin-panel">
        <h2 className="admin-h2">Thêm dự án mới</h2>
        <ProjectForm />
      </section>

      <section className="admin-panel">
        <h2 className="admin-h2">Dự án đã đăng ({list.length})</h2>
        {list.length === 0 ? (
          <p className="admin-empty">Chưa có dự án nào.</p>
        ) : (
          <ul className="admin-list">
            {list.map((p) => (
              <li className="admin-item" key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="admin-thumb" src={`/uploads/${p.thumbnailPath}`} alt={p.title} />
                <div className="admin-item-body">
                  <b>{p.title}</b>
                  <a href={p.linkUrl} target="_blank" rel="noopener noreferrer nofollow">
                    {p.linkUrl}
                  </a>
                  {p.description && <span className="admin-item-desc">{p.description}</span>}
                </div>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="btn btn-ghost-d btn-text admin-del" type="submit">
                    Xoá
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
