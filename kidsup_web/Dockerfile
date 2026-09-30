FROM node:22-alpine AS base

# ─── deps ─────────────────────────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
# sharp — native image optimiser for next/image (linux/x64/musl build)
RUN npm install --cpu=x64 --os=linux --libc=musl --no-save sharp

# ─── builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# "prod" only for the image deployed to kids-up.pl — everything else (default
# "test") makes app/robots.ts block indexing, so test.kids-up.pl never leaks
# into search results. Baked in at build time because these are NEXT_PUBLIC_*
# vars, inlined during `next build`, not readable from a runtime env var.
ARG NEXT_PUBLIC_ENV=test
ARG NEXT_PUBLIC_SITE_URL=https://kids-up.pl
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ─── runner ───────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
