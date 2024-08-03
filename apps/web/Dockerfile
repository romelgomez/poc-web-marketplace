FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY apps/web .

EXPOSE 3000

ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npx", "next", "dev"]
