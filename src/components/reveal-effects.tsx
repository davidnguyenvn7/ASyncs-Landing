"use client";

import { useReveal } from "@/hooks/use-reveal";

/** Mounts the scroll-reveal IntersectionObserver for the whole page. */
export function RevealEffects() {
  useReveal();
  return null;
}
