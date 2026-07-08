import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

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

/**
 * Admin accounts allowed into /admin. Passwords are scrypt-hashed
 * (salt:hash hex, see src/lib/password.ts) — never stored in the clear.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 160 }),
  role: varchar("role", { length: 32 }).default("admin").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/**
 * Server-side sessions. The opaque token lives in an httpOnly cookie; the row
 * here is looked up on every protected request and deleted on logout / expiry.
 */
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;

/**
 * Showcase projects submitted from the admin panel and rendered on the landing
 * page. `thumbnailPath` is the stored filename under the uploads volume
 * (served via /uploads/<name>); `linkUrl` is the outbound link.
 */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  thumbnailPath: varchar("thumbnail_path", { length: 200 }).notNull(),
  linkUrl: varchar("link_url", { length: 500 }).notNull(),
  createdBy: integer("created_by").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
