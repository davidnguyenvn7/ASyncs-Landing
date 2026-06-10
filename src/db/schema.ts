import { pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/** Which ASync product / vertical the lead is interested in. */
export const productEnum = pgEnum("async_product", [
  "erp",
  "core",
  "finance",
  "people",
  "crm",
  "edu",
  "insight",
]);

/** Stage of the lead in the sales pipeline. */
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
]);

/**
 * Demo / consultation requests captured from the landing page
 * ("Đặt lịch demo" CTA). Stored on the VPS Postgres instance.
 */
export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  company: varchar("company", { length: 200 }),
  industry: varchar("industry", { length: 120 }),
  product: productEnum("product").default("erp").notNull(),
  message: text("message"),
  status: leadStatusEnum("status").default("new").notNull(),
  source: varchar("source", { length: 80 }).default("landing").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DemoRequest = typeof demoRequests.$inferSelect;
export type NewDemoRequest = typeof demoRequests.$inferInsert;
