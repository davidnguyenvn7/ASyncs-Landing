"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section className="section light" id="industries" data-screen-label="Lĩnh vực">
      <div className="wrap">
        <div className="ind-head">
          <span className="eyebrow center reveal">Lĩnh vực</span>
          <h2 className="h-section reveal d1">Linh hoạt cho mọi lĩnh vực.</h2>
          <p className="lead reveal d2">
            Cùng một nền tảng, cấu hình riêng cho từng ngành — từ thương mại, dịch vụ, sản xuất đến
            giáo dục và y tế.
          </p>
        </div>
        <Tabs.Root defaultValue="ind-0">
          <Tabs.List className="ind-tabs reveal d2" aria-label="Lĩnh vực">
            {industries.map((ind, i) => (
              <Tabs.Trigger className="ind-tab" value={`ind-${i}`} key={i}>
                {ind.tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {industries.map((ind, i) => (
            <Tabs.Content className="ind-panel" value={`ind-${i}`} key={i}>
              <div>
                <h3>{ind.title}</h3>
                <p className="ind-desc">{ind.desc}</p>
                <ul className="ind-points">
                  {ind.points.map((p, pi) => (
                    <li key={pi}>
                      <span className="ck">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ind-visual">
                {ind.stats.map((s, si) => (
                  <div className="ind-stat" key={si}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
