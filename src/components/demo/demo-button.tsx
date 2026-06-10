"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useDemo } from "./demo-context";

/**
 * A CTA button that opens the demo-request dialog. Drop-in replacement for the
 * original `<a href="#cta">Đặt lịch demo</a>` links.
 */
export function DemoButton({
  product,
  children,
  ...props
}: ButtonProps & { product?: string }) {
  const { open } = useDemo();
  return (
    <Button type="button" onClick={() => open(product)} {...props}>
      {children}
    </Button>
  );
}
