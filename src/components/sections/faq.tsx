"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section className="section light" id="faq" data-screen-label="Hỏi đáp">
      <div className="wrap">
        <div className="platform-head">
          <span className="eyebrow center reveal">Hỏi đáp</span>
          <h2 className="h-section reveal d1">Những câu hỏi thường gặp</h2>
        </div>
        <Accordion.Root type="single" collapsible className="faq-wrap reveal d1">
          {faqs.map((f, i) => (
            <Accordion.Item className="faq-item" value={`faq-${i}`} key={i}>
              <Accordion.Header>
                <Accordion.Trigger className="faq-q">
                  {f.q}
                  <span className="pm" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="faq-a">
                <p>{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
