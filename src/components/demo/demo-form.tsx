"use client";

import { useActionState, useEffect } from "react";
import { submitDemoRequest, type DemoFormState } from "@/app/actions";
import { productOptions } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initialState: DemoFormState = { ok: false, message: "" };

export function DemoForm({
  defaultProduct = "erp",
  onSuccess,
}: {
  defaultProduct?: string;
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState(submitDemoRequest, initialState);

  useEffect(() => {
    if (state.ok && onSuccess) {
      const t = setTimeout(onSuccess, 1600);
      return () => clearTimeout(t);
    }
  }, [state.ok, onSuccess]);

  if (state.ok) {
    return (
      <p className="form-status ok" role="status">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="demo-form">
      <div className="field-grid">
        <div className="field-group">
          <Label htmlFor="df-name">Họ và tên *</Label>
          <Input id="df-name" name="name" placeholder="Nguyễn Văn A" required />
          {state.errors?.name && <span className="field-error">{state.errors.name}</span>}
        </div>
        <div className="field-group">
          <Label htmlFor="df-email">Email *</Label>
          <Input id="df-email" name="email" type="email" placeholder="ban@congty.vn" required />
          {state.errors?.email && <span className="field-error">{state.errors.email}</span>}
        </div>
        <div className="field-group">
          <Label htmlFor="df-phone">Số điện thoại</Label>
          <Input id="df-phone" name="phone" placeholder="09xx xxx xxx" />
        </div>
        <div className="field-group">
          <Label htmlFor="df-company">Doanh nghiệp</Label>
          <Input id="df-company" name="company" placeholder="Tên công ty" />
        </div>
        <div className="field-group">
          <Label htmlFor="df-industry">Lĩnh vực</Label>
          <Input id="df-industry" name="industry" placeholder="Bán lẻ, F&B, giáo dục…" />
        </div>
        <div className="field-group">
          <Label htmlFor="df-product">Quan tâm sản phẩm</Label>
          <select
            id="df-product"
            name="product"
            className="field"
            defaultValue={defaultProduct}
          >
            {productOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field-group">
        <Label htmlFor="df-message">Nội dung cần trao đổi</Label>
        <Textarea id="df-message" name="message" placeholder="Mô tả ngắn nhu cầu của bạn…" />
      </div>
      <div className="form-actions">
        <Button type="submit" variant="lime" disabled={pending}>
          {pending ? "Đang gửi…" : "Gửi yêu cầu"}
          <span className="arr">→</span>
        </Button>
        {state.message && !state.ok && (
          <span className="form-status err" role="alert">
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
