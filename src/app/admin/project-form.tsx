"use client";

import { useActionState, useEffect, useRef } from "react";
import { createProject, type ActionState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const initial: ActionState = { ok: false, message: "" };

export function ProjectForm() {
  const [state, formAction, pending] = useActionState(createProject, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful submit so the next entry starts blank.
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form action={formAction} ref={formRef} className="admin-form">
      <div className="field-group">
        <Label htmlFor="title">Tiêu đề dự án *</Label>
        <Input id="title" name="title" placeholder="Tên dự án" required />
      </div>
      <div className="field-group">
        <Label htmlFor="linkUrl">Link dự án *</Label>
        <Input id="linkUrl" name="linkUrl" type="url" placeholder="https://…" required />
      </div>
      <div className="field-group">
        <Label htmlFor="description">Mô tả ngắn</Label>
        <Textarea id="description" name="description" placeholder="Giới thiệu ngắn về dự án…" />
      </div>
      <div className="field-group">
        <Label htmlFor="thumbnail">Ảnh thumbnail * (JPG/PNG/WEBP, ≤ 2MB)</Label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="field"
          required
        />
      </div>
      <div className="form-actions">
        <Button type="submit" variant="lime" disabled={pending}>
          {pending ? "Đang lưu…" : "Thêm dự án"}
        </Button>
        {state.message && (
          <span className={`form-status ${state.ok ? "ok" : "err"}`} role="status">
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
