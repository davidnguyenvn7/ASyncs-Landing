import { footerColumns } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-map">
          <div className="f-intro">
            <span className="brand-mark" style={{ fontSize: 24 }}>
              A<b style={{ color: "var(--lime)" }}>Syncs</b>
            </span>
            <p className="f-tag">
              From chaos to <span className="grad">synchronized systems</span>
            </p>
          </div>
          {footerColumns.map((col) => (
            <div className="f-col" key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((l) => (
                <a href={l.href} key={l.label}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bot">
          <span>© 2026 ASyncs. All rights reserved.</span>
          <span className="font-mono">A&nbsp;SYNCHRONIZED&nbsp;SYSTEM</span>
        </div>
      </div>
    </footer>
  );
}
