# ref: https://www.temiz.dev/articles/how-to-reduce-nextjs-docker-image-size

FROM node:20-alpine AS deps

COPY package*.json ./

RUN npm ci

FROM node:20-alpine AS builder

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY apps/web .

COPY --from=deps /node_modules ./node_modules

RUN npx next build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
