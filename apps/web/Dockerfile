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

FROM node:20-alpine AS base

ARG CLERK_SECRET_KEY
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_SECRET
ARG WEBHOOK_SECRET
ARG NEXT_PUBLIC_GRAPHQL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_UPLOAD_PRESET
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG TAG_ID

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY apps/web .

EXPOSE 3000

ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npx", "next", "start"]
