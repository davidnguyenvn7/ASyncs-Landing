"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/count-up";

type Kpi = {
  label: string;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  width: number;
  up?: boolean;
};

const kpis: Kpi[] = [
  { label: "Tăng trưởng doanh thu", to: 22, prefix: "+", suffix: "%", width: 88, up: true },
  { label: "Khách hàng mới", to: 58, width: 64 },
  { label: "Tỷ lệ giữ chân", to: 78, suffix: "%", width: 78 },
  { label: "Hiệu suất đội ngũ", to: 91, suffix: "%", width: 91 },
  { label: "Công nợ phải thu", to: 12.4, decimals: 1, suffix: " tr", width: 30 },
];

function KpiBar({ width }: { width: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span className="kbar" ref={ref}>
      <i style={{ width: shown ? `${width}%` : 0 }} />
    </span>
  );
}

export function Dashboard() {
  return (
    <section className="section dark" id="dashboard" data-screen-label="Bảng điều hành">
      <div className="wrap">
        <div className="dash-head">
          <span className="eyebrow center reveal">ASyncs INSIGHT+ · Bảng điều hành</span>
          <h2 className="h-section reveal d1">Điều hành doanh nghiệp bằng dữ liệu</h2>
          <p className="lead reveal d2">
            Mọi chỉ số vận hành hội tụ trên một bảng điều hành —{" "}
            <br />
            giúp nhà quản lý ra quyết định chính xác ngay khi cần.
          </p>
        </div>
        <div className="browser reveal d2" id="dashMock">
          <div className="glow glow-c" />
          <div className="browser-bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser-url">asyncs · business dashboard</span>
          </div>
          <div className="dash-body">
            <div className="kpi-grid">
              {kpis.map((k, i) => (
                <div className={`kpi${k.up ? " up" : ""}`} key={i}>
                  <span className="kl">{k.label}</span>
                  <CountUp
                    className="kv"
                    to={k.to}
                    prefix={k.prefix}
                    suffix={k.suffix}
                    decimals={k.decimals}
                  />
                  <KpiBar width={k.width} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
