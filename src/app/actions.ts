"use server";

import { db } from "@/db";
import { demoRequests } from "@/db/schema";
import type { NewDemoRequest } from "@/db/schema";

export type DemoFormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

const PRODUCTS = ["erp", "core", "finance", "people", "crm", "edu", "insight"] as const;
type Product = (typeof PRODUCTS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Server Action backing the "Đặt lịch demo" form. Validates input and persists
 * the lead to the VPS Postgres instance via Drizzle.
 */
export async function submitDemoRequest(
  _prev: DemoFormState,
  formData: FormData,
): Promise<DemoFormState> {
  const name = str(formData, "name");
  const email = str(formData, "email");
  const phone = str(formData, "phone");
  const company = str(formData, "company");
  const industry = str(formData, "industry");
  const productRaw = str(formData, "product");
  const message = str(formData, "message");

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Vui lòng nhập họ tên.";
  if (!EMAIL_RE.test(email)) errors.email = "Email chưa hợp lệ.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Vui lòng kiểm tra lại thông tin.", errors };
  }

  const product: Product = (PRODUCTS as readonly string[]).includes(productRaw)
    ? (productRaw as Product)
    : "erp";

  const row: NewDemoRequest = {
    name,
    email,
    phone: phone || null,
    company: company || null,
    industry: industry || null,
    product,
    message: message || null,
  };

  try {
    await db.insert(demoRequests).values(row);
  } catch (err) {
    console.error("Failed to save demo request:", err);
    return {
      ok: false,
      message: "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.",
    };
  }

  return {
    ok: true,
    message: "Đã nhận yêu cầu! Đội ngũ ASync sẽ liên hệ với bạn trong thời gian sớm nhất.",
  };
}
