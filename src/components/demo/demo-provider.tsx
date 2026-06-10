"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DemoContext } from "./demo-context";
import { DemoForm } from "./demo-form";

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("erp");

  const openDemo = useCallback((p?: string) => {
    if (p) setProduct(p);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ open: openDemo }), [openDemo]);

  return (
    <DemoContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby="demo-desc">
          <DialogHeader>
            <span className="pill pill-lime">Đặt lịch demo</span>
            <DialogTitle>Trải nghiệm ASync cùng chuyên gia</DialogTitle>
            <DialogDescription id="demo-desc">
              Để lại thông tin, đội ngũ ASync sẽ liên hệ tư vấn và demo nền tảng phù hợp với
              doanh nghiệp của bạn.
            </DialogDescription>
          </DialogHeader>
          {/* Remount the form per open so its action state resets. */}
          <DemoForm
            key={open ? `${product}-open` : "closed"}
            defaultProduct={product}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </DemoContext.Provider>
  );
}
