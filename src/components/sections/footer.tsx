import { footerColumns } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-map">
          <div className="f-intro">
            <span className="brand-mark" style={{ fontSize: 24 }}>
              A<b style={{ color: "var(--lime)" }}>Sync</b>
            </span>
            <p>
              From chaos to synchronized systems. Hạ tầng tự động hoá vận hành cho doanh nghiệp đa
              lĩnh vực đang lớn lên.
            </p>
            <div className="f-badges">
              <span>ISO 27001</span>
              <span>SOC 2</span>
              <span>PCI DSS</span>
            </div>
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
          <span>© 2026 ASync. All rights reserved.</span>
          <span className="font-mono">ASYNCHRONIZED&nbsp;SYSTEM</span>
        </div>
      </div>
    </footer>
  );
}
