# :: test steps ::
# 
# 1. npx nx build api  --configuration=production
#
# 2. docker-compose down -v
#
# 3. docker build --progress=plain --no-cache -t maryline/web:0.0.1 -f apps/web/Dockerfile .
# 
# 3. docker-compose up --build
#

# # Stage 1: Build
# FROM node:18-alpine AS builder
# WORKDIR /app

# COPY package*.json ./

# RUN npm ci

# COPY . .

# RUN nonpx nx build web --configuration=production

# # Stage 2: Serve
# FROM node:18-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs

# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /dist/apps/web/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /apps/web/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /apps/web/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD HOSTNAME="0.0.0.0" node server.js


# Base image
FROM node:20-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx nx build web

# Stage 3: Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV development
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone/apps/web ./standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "standalone/server.js"]
