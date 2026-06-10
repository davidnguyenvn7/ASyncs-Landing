import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="section light" id="testimonials" data-screen-label="Khách hàng">
      <div className="wrap">
        <div className="platform-head">
          <span className="eyebrow center reveal">Khách hàng</span>
          <h2 className="h-section reveal d1">
            Được tin dùng bởi doanh nghiệp nhiều lĩnh vực.
          </h2>
        </div>
        <div className="tgrid">
          {testimonials.map((t, i) => (
            <article className={`tcard reveal${i ? ` d${i}` : ""}`} key={i}>
              <div className="tstat">{t.stat}</div>
              <p className="tquote">“{t.quote}”</p>
              <div className="twho">
                <span className="ava">{t.ava}</span>
                <span>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
