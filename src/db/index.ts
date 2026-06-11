import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __asyncPgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __asyncDb: NodePgDatabase<typeof schema> | undefined;
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

// Lazily build the Drizzle client so importing this module never opens a
// connection. This lets `next build` succeed even when DATABASE_URL is unset
// (e.g. a first Vercel deploy before the production DB is wired up); the pool is
// only created the first time a query actually runs.
function getDb(): NodePgDatabase<typeof schema> {
  if (globalThis.__asyncDb) return globalThis.__asyncDb;
  const pool = globalThis.__asyncPgPool ?? createPool();
  // Reuse the pool across hot reloads in development.
  if (process.env.NODE_ENV !== "production") globalThis.__asyncPgPool = pool;
  const database = drizzle(pool, { schema });
  if (process.env.NODE_ENV !== "production") globalThis.__asyncDb = database;
  return database;
}

export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});

export { schema };
