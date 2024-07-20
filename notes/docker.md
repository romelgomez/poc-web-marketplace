# To play with docker

```bash
psql -U developer -d chevere -h localhost
```

docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker rmi $(docker images -q) 

docker rmi $(docker images -q)             

docker images

docker rm $(docker ps -aq) 

docker stop $(docker ps -aq)

docker volume




## some random notes/ideas with docker to build the web

```dockerfile

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


# docker build --progress=plain --no-cache -t maryline/web:0.0.1 -f apps/web/Dockerfile .

FROM node:20-alpine AS base

WORKDIR /app

RUN ls -l

COPY apps/web/server.js .

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="127.0.0.1" node server.js



# # Stage 1: Dependencies
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci

# # Stage 2: Build
# FROM deps AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npx nx build web

# # Stage 3: Runner
# FROM builder AS runner
# WORKDIR /app
# ENV NODE_ENV development
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone/apps/web ./standalone
# COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# # CMD ["node", "standalone/server.js"]




# # # Install dependencies only when needed
# # FROM node:lts-alpine AS deps

# # WORKDIR /app
# # COPY package.json yarn.lock .npmrc ./
# # RUN yarn install --frozen-lockfile

# # # Rebuild the source code only when needed
# # # This is where because may be the case that you would try
# # # to build the app based on some `X_TAG` in my case (Git commit hash)
# # # but the code hasn't changed.
# # FROM node:lts-alpine AS builder


# # ARG environment
# # ENV environment=${environment}
# # WORKDIR /app
# # COPY . .
# # COPY --from=deps /app/node_modules ./node_modules
# # RUN yarn build

# # # Production image, copy all the files and run next
# # FROM node:lts-alpine AS runner

# # ARG X_TAG
# # WORKDIR /app
# # ENV NODE_ENV=production

# # RUN addgroup -g 1001 -S nodejs
# # RUN adduser -S nextjs -u 1001

# # COPY --from=builder /app/next.config.js ./
# # COPY --from=builder /app/public ./public
# # COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json

# # USER nextjs

# # EXPOSE 3000

# # CMD ["node_modules/.bin/next", "start"]
```