import { DemoButton } from "@/components/demo/demo-button";

export function Cta() {
  return (
    <section className="section dark" id="cta" data-screen-label="CTA">
      <div className="wrap">
        <div className="cta-banner reveal">
          <div className="glow glow-e" />
          <div className="cta-banner-inner">
            <span className="pill pill-lime">Sẵn sàng đồng bộ</span>
            <h2>Tối ưu vận hành, tăng trưởng đột phá.</h2>
            <p className="lead">
              Khám phá cách ASync giúp bạn chuẩn hoá quy trình, giảm công việc thủ công và kiểm
              soát mọi hoạt động trên một nền tảng duy nhất.
            </p>
            <div className="hero-actions">
              <DemoButton variant="lime">
                Đặt lịch demo <span className="arr">→</span>
              </DemoButton>
              <DemoButton variant="ghostDark">Trao đổi với chuyên gia</DemoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
