"use client";

import { useEffect, useRef, useState } from "react";
import { megaSuites } from "@/lib/content";
import { useDemo } from "@/components/demo/demo-context";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const { open: openDemo } = useDemo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega menu on outside click / Escape.
  useEffect(() => {
    if (!megaOpen) return;
    const onDown = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaOpen]);

  const closeAll = () => {
    setNavOpen(false);
    setMegaOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`} id="header">
      <div className={`wrap nav${navOpen ? " nav-open" : ""}`}>
        <a className="brand" href="#top" aria-label="ASyncs" onClick={closeAll}>
          <span className="brand-mark">
            A<b>Syncs</b>
          </span>
          <span className="brand-tag">A Synchronized System</span>
        </a>

        <nav className="nav-links" id="navLinks">
          <div
            className={`has-mega${megaOpen ? " open" : ""}`}
            ref={megaRef}
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <a
              className="mega-trigger"
              role="button"
              tabIndex={0}
              aria-expanded={megaOpen}
              onClick={() => setMegaOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMegaOpen((v) => !v);
                }
              }}
            >
              Hệ thống <span className="caret" />
            </a>
            <div className="mega" id="megaPanel">
              <div className="mega-grid">
                {megaSuites.map((s) => (
                  <a className="mega-suite" href={s.href} key={s.name} onClick={closeAll}>
                    <div className="ms-top">
                      <span className="ms-ic">{s.icon}</span>
                      <span className="ms-name">
                        ASyncs <b>{s.name}</b>
                      </span>
                    </div>
                    <p className="ms-desc">{s.desc}</p>
                    <div className="mega-apps">
                      {s.apps.map((a) => (
                        <span key={a}>{a}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
              <div className="mega-foot">
                <p>
                  <b>22 phân hệ</b> kết nối trong một nền tảng duy nhất — triển khai theo nhu cầu
                  từng doanh nghiệp.
                </p>
                <button
                  className="btn btn-lime"
                  onClick={() => {
                    closeAll();
                    openDemo();
                  }}
                >
                  Đặt lịch demo <span className="arr">→</span>
                </button>
              </div>
            </div>
          </div>
          <a href="#industries" onClick={closeAll}>
            Lĩnh vực
          </a>
          <a href="#testimonials" onClick={closeAll}>
            Khách hàng
          </a>
          <a href="#faq" onClick={closeAll}>
            Tài nguyên
          </a>
          <button
            className="btn btn-lime mobile-only"
            onClick={() => {
              closeAll();
              openDemo();
            }}
          >
            Đặt lịch demo
          </button>
        </nav>

        <div className="nav-cta">
          <button className="btn btn-ghost-d btn-text" onClick={() => openDemo()}>
            Đăng nhập
          </button>
          <button className="btn btn-lime btn-text" onClick={() => openDemo()}>
            Đặt lịch demo <span className="arr">→</span>
          </button>
          <button
            className="nav-toggle"
            aria-label="Mở menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
