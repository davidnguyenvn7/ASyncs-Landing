"use client";

import { createContext, useContext } from "react";

type DemoContextValue = {
  open: (product?: string) => void;
};

export const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo must be used within <DemoProvider>");
  }
  return ctx;
}
