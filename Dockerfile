# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# ASyncs Landing — production image (Next.js standalone).
# Build targets:
#   - "migrator": applies Drizzle SQL migrations, then exits.
#   - "runner"  : the long-running Next.js server (default).
# ─────────────────────────────────────────────────────────────

FROM node:22-alpine AS base
WORKDIR /app
# Next.js/sharp friendliness on Alpine.
RUN apk add --no-cache libc6-compat

# ---- deps: install all dependencies (incl. devDeps for build & migrate) ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: produce the standalone server bundle ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# DATABASE_URL is intentionally unset here; the DB client is lazily created so
# `next build` succeeds without a live database.
RUN npm run build

# ---- migrator: one-shot container that runs drizzle-kit migrate ----
FROM base AS migrator
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY drizzle.config.ts ./
COPY drizzle ./drizzle
COPY src ./src
COPY tsconfig.json ./
CMD ["npm", "run", "db:migrate"]

# ---- runner: minimal runtime image ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone output already contains a pruned node_modules and server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
