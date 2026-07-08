/**
 * Bootstrap / reset an admin account.
 *
 *   ADMIN_EMAIL=you@asyncs.tech ADMIN_PASSWORD='strong-secret' \
 *     ADMIN_NAME='Admin' npm run create-admin
 *
 * Safe to re-run: an existing email has its password + name updated.
 */
import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/password";

async function main() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  const name = (process.env.ADMIN_NAME || "").trim() || null;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("ADMIN_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  await db
    .insert(users)
    .values({ email, passwordHash, name, role: "admin" })
    .onConflictDoUpdate({
      target: users.email,
      set: { passwordHash, name },
    });

  console.log(`✓ Admin ready: ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
