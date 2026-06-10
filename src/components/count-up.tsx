"use client";

import { useEffect, useRef, useState, type ElementType, type Ref } from "react";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
  /** Element tag to render — lets sections reuse element-based CSS (e.g. `b`). */
  as?: "span" | "b" | "div";
};

/** Formats a number with a fixed number of decimals and grouped thousands. */
function format(value: number, decimals: number) {
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts up to `to` once the element scrolls into view — the React port of the
 * original `data-count` animation used across KPIs, the gamification stats and
 * the impact band.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1400,
  className,
  as = "span",
}: CountUpProps) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (prefersReduced) {
        setValue(to);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        // easeOutExpo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setValue(to * eased);
        if (t < 1) requestAnimationFrame(tick);
        else setValue(to);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <Tag ref={ref as Ref<HTMLSpanElement>} className={className}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </Tag>
  );
}
