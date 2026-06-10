import { journey } from "@/lib/content";

export function Journey() {
  return (
    <section className="section dark" data-screen-label="Hành trình chuyển đổi">
      <div className="wrap">
        <div className="platform-head">
          <span className="eyebrow center reveal">Hành trình chuyển đổi</span>
          <h2 className="h-section reveal d1">Đồng hành từ rời rạc đến đồng bộ.</h2>
        </div>
        <div className="journey-grid">
          {journey.map((j, i) => (
            <div className={`jstep reveal${i ? ` d${i}` : ""}`} key={j.n}>
              <span className="jn">{j.n}</span>
              <h4>{j.title}</h4>
              <p>{j.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
