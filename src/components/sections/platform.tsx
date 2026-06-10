import { suites, type Suite } from "@/lib/content";
import { DemoButton } from "@/components/demo/demo-button";

function SuiteVisual({ suite }: { suite: Suite }) {
  return (
    <div className="suite-visual reveal d2">
      <div className="mock">
        <div className="mock-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span>{suite.barLabel}</span>
        </div>
        <div className="mock-body">
          {suite.visual.kind === "rows" &&
            suite.visual.rows.map((r, i) => (
              <div className="mock-row" key={i}>
                <span className="ava">{r.ava}</span>
                <span className="mr-main">
                  <span className="mr-t">{r.title}</span>
                  <span className="mr-s">{r.sub}</span>
                </span>
                <span className={`tag ${r.tagKind}`}>{r.tag}</span>
              </div>
            ))}
          {suite.visual.kind === "finance" && (
            <>
              <div className="mock-kpis">
                {suite.visual.kpis.map((k, i) => (
                  <div className="mock-kpi" key={i}>
                    <b>{k.value}</b>
                    <span>{k.label}</span>
                  </div>
                ))}
              </div>
              <div className="mock-chart">
                {suite.visual.chart.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SuiteBlock({ suite }: { suite: Suite }) {
  const copy = (
    <div className="suite-copy reveal">
      <span className="suite-label">
        <span className="si">{suite.icon}</span>
        {suite.label}
      </span>
      <h3>{suite.title}</h3>
      <p>{suite.desc}</p>
      <ul className="suite-bullets">
        {suite.bullets.map((b, i) => (
          <li key={i}>
            <span className="ck">✓</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="suite-apps">
        {suite.apps.map((a, i) => (
          <span className="app" key={i}>
            <i>{a.icon}</i>
            {a.name}
          </span>
        ))}
      </div>
      <div className="suite-cta">
        <DemoButton product={suite.id} variant="lime">
          Demo tính năng <span className="arr">→</span>
        </DemoButton>
        <a className="btn btn-ghost-d" href="#platform">
          Xem chi tiết
        </a>
      </div>
    </div>
  );

  return (
    <div className={`suite${suite.flip ? " flip" : ""}`}>
      {copy}
      <SuiteVisual suite={suite} />
    </div>
  );
}

export function Platform() {
  return (
    <section className="section dark" id="platform" data-screen-label="Nền tảng">
      <div className="wrap">
        <div className="platform-head">
          <span className="eyebrow center reveal">Một nền tảng</span>
          <h2 className="h-section reveal d1">Một nền tảng. Mọi giải pháp vận hành.</h2>
          <p className="lead reveal d2">
            Sáu bộ sản phẩm kết nối chặt chẽ, thay thế hàng chục công cụ rời rạc bằng một nguồn dữ
            liệu duy nhất — triển khai linh hoạt cho mọi mô hình doanh nghiệp.
          </p>
        </div>
        {suites.map((s) => (
          <SuiteBlock suite={s} key={s.id} />
        ))}
      </div>
    </section>
  );
}
