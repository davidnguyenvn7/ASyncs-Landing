"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Bridges shadcn's API onto ASync's hand-authored `.btn` styles so the
 * landing-page buttons keep their exact look while gaining a typed, composable
 * component (supports `asChild` for rendering as an anchor).
 */
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      lime: "btn-lime",
      ghostDark: "btn-ghost-d",
      ghostLight: "btn-ghost-l",
    },
  },
  defaultVariants: {
    variant: "lime",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
