import { DemoButton } from "@/components/demo/demo-button";

export function Hero() {
  return (
    <section className="section hero dark" data-screen-label="Hero">
      <div className="glow glow-a" />
      <div className="grid-bg" />
      <div className="wrap hero-inner">
        <span className="eyebrow center reveal">Business Automation Infrastructure</span>
        <h1 className="h-display reveal d1">
          From chaos to <span className="grad">synchronized systems</span>
        </h1>
        <p className="lead reveal d2">
          ASync là nền tảng vận hành &amp; tự động hoá toàn diện cho doanh nghiệp — hợp nhất công
          việc, tài chính, nhân sự, bán hàng và dữ liệu trên một hệ thống duy nhất. Linh hoạt cho
          mọi lĩnh vực, từ thương mại – dịch vụ – sản xuất đến giáo dục.
        </p>
        <div className="hero-actions reveal d3">
          <DemoButton variant="lime">
            Đặt lịch demo <span className="arr">→</span>
          </DemoButton>
          <a className="btn btn-ghost-d" href="#platform">
            Khám phá nền tảng
          </a>
        </div>
        <div className="hero-solutions reveal d4">
          <a className="sol-card" href="#platform">
            <span className="sol-name">
              <i />
              ASync ERP
            </span>
            <p>Vận hành &amp; tự động hoá cho doanh nghiệp đa lĩnh vực.</p>
            <span className="sol-go">
              Xem giải pháp <span className="arr">→</span>
            </span>
          </a>
          <a className="sol-card alt" href="#diff">
            <span className="sol-name">
              <i />
              ASync EDU+
            </span>
            <p>Vertical chuyên sâu cho trung tâm &amp; tổ chức giáo dục.</p>
            <span className="sol-go">
              Xem giải pháp <span className="arr">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
