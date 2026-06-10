import { logos } from "@/lib/content";

export function LogoWall() {
  // Duplicate the row so the marquee loops seamlessly (translateX(-50%)).
  const row = [...logos, ...logos];
  return (
    <section className="logo-wall" data-screen-label="Khách hàng tin dùng">
      <p className="lw-label">
        <b>500+</b> doanh nghiệp thuộc nhiều lĩnh vực đang đồng bộ vận hành cùng ASync
      </p>
      <div className="logo-mask">
        <div className="logo-row" id="logoRow">
          {row.map((name, i) => (
            <span className="logo-chip" key={`${name}-${i}`}>
              <i />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
