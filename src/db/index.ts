import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __asyncPgPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at your VPS Postgres.",
    );
  }
  return new Pool({
    connectionString,
    // Enable TLS when the VPS connection string asks for it.
    ssl: connectionString.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : undefined,
    max: 10,
  });
}

// Reuse the pool across hot reloads in development.
const pool = globalThis.__asyncPgPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalThis.__asyncPgPool = pool;

export const db = drizzle(pool, { schema });
export { schema };
