import { CountUp } from "@/components/count-up";

const cells = [
  { to: 500, suffix: "+", label: "Doanh nghiệp đồng bộ" },
  { to: 22, prefix: "+", suffix: "%", label: "Tăng trưởng doanh thu TB" },
  { to: 70, prefix: "−", suffix: "%", label: "Thao tác thủ công" },
  { to: 22, label: "Phân hệ vận hành" },
];

export function Impact() {
  return (
    <section className="section dark" id="impact" data-screen-label="Tác động">
      <div className="wrap">
        <div className="impact-grid">
          {cells.map((c, i) => (
            <div className={`impact-cell reveal${i ? ` d${i}` : ""}`} key={i}>
              <CountUp as="b" to={c.to} prefix={c.prefix} suffix={c.suffix} />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
