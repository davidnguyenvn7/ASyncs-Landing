"use client";

import { useState } from "react";
import { eduTabs } from "@/lib/content";
import { CountUp } from "@/components/count-up";

export function EduDiff() {
  const [active, setActive] = useState(0);

  return (
    <section className="section dark" id="diff" data-screen-label="ASyncs EDU+">
      <div className="wrap">
        <div className="diff-grid">
          <div>
            <span className="eyebrow reveal">ASyncs EDU+</span>
            <h2 className="h-section reveal d1" style={{ marginTop: 16 }}>
              Giải pháp chuyên dùng
              <br />
              mảng giáo dục.
            </h2>
            <div className="diff-tabs" role="tablist" aria-label="Điểm khác biệt">
              {eduTabs.map((t, i) => (
                <button
                  key={t.num}
                  className={`diff-tab reveal d${i + 2}`}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                >
                  <span className="dt-top">
                    <span className="dt-num">{t.num}</span>
                    <h4>{t.title}</h4>
                  </span>
                  <div className="dt-body">
                    <p>{t.desc}</p>
                    <div className="chip-row">
                      {t.chips.map((c, ci) => (
                        <span className="chip" key={ci}>
                          {c.check && <span className="ck">✓</span>}
                          {c.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="game-panel reveal d2" aria-label="Bảng xếp hạng học viên">
            <div className="glow glow-b" />
            <div className="game-head">
              <span className="gh-label">Top học viên tuần này</span>
              <span className="pill pill-outline-d pill-dot">live</span>
            </div>
            <div className="lead-list">
              <div className="lead-row top">
                <span className="lead-rank">1</span>
                <span className="lead-name">
                  <span className="lead-ava">MA</span>Minh Anh
                </span>
                <span className="lead-xp">1.250 XP</span>
              </div>
              <div className="lead-row">
                <span className="lead-rank">2</span>
                <span className="lead-name">
                  <span className="lead-ava">HN</span>Hoàng Nam
                </span>
                <span className="lead-xp">1.180 XP</span>
              </div>
              <div className="lead-row">
                <span className="lead-rank">3</span>
                <span className="lead-name">
                  <span className="lead-ava">GH</span>Gia Hân
                </span>
                <span className="lead-xp">1.040 XP</span>
              </div>
            </div>
            <div className="game-stats">
              <div className="gstat">
                <CountUp className="gv" to={18} prefix="+" suffix="%" />
                <div className="gl">Tỷ lệ duy trì</div>
              </div>
              <div className="gstat">
                <CountUp className="gv" to={92} suffix="%" />
                <div className="gl">Hoàn thành bài tập</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
