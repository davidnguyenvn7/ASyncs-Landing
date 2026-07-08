import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects as projectsTable } from "@/db/schema";

/**
 * Public "Dự án" showcase. Server component: reads published projects straight
 * from Postgres. Renders nothing when there are none, so the landing page has
 * no empty section before the first project is added.
 */
export async function Projects() {
  let items: (typeof projectsTable.$inferSelect)[] = [];
  try {
    items = await db.select().from(projectsTable).orderBy(desc(projectsTable.createdAt));
  } catch (err) {
    console.error("Failed to load projects:", err);
    return null;
  }

  if (items.length === 0) return null;

  return (
    <section className="section light" id="projects" data-screen-label="Dự án">
      <div className="wrap">
        <div className="platform-head">
          <span className="eyebrow center reveal">Dự án</span>
          <h2 className="h-section reveal d1">
            Những sản phẩm chúng tôi
            <br />
            đã đồng hành
          </h2>
        </div>
        <div className="pgrid">
          {items.map((p, i) => (
            <a
              className={`pcard reveal${i % 3 ? ` d${i % 3}` : ""}`}
              key={p.id}
              href={p.linkUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <div className="pthumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/uploads/${p.thumbnailPath}`} alt={p.title} loading="lazy" />
              </div>
              <div className="pbody">
                <b className="ptitle">{p.title}</b>
                {p.description && <p className="pdesc">{p.description}</p>}
                <span className="plink">
                  Xem dự án <span className="arr">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
