# ref: https://www.temiz.dev/articles/how-to-reduce-nextjs-docker-image-size

FROM node:20-alpine AS deps

COPY package*.json ./

RUN npm ci

FROM node:20-alpine AS builder

ARG NODE_ENV=production
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

WORKDIR /app

COPY apps/web .

COPY --from=deps /node_modules ./node_modules

RUN npx next build

FROM node:20-alpine AS runner

WORKDIR /app

# TODO: check if railway works fine without this:
# 14 warnings found (use docker --debug to expand):
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") (line 16)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "CLOUDINARY_API_KEY") (line 33)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") (line 36)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") (line 47)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "CLOUDINARY_SECRET") (line 32)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "WEBHOOK_SECRET") (line 38)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "CLOUDINARY_SECRET") (line 43)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "CLERK_SECRET_KEY") (line 48)
#   - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 59)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "WEBHOOK_SECRET") (line 49)
#   - LegacyKeyValueFormat: "ENV key=value" should be used instead of legacy "ENV key value" format (line 57)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY") (line 12)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ARG "CLERK_SECRET_KEY") (line 37)
#   - SecretsUsedInArgOrEnv: Do not use ARG or ENV instructions for sensitive data (ENV "CLOUDINARY_API_KEY") (line 44)

ARG NODE_ENV=production
# ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# ARG CLOUDINARY_SECRET
# ARG CLOUDINARY_API_KEY
# ARG NEXT_PUBLIC_UPLOAD_PRESET
# ARG NEXT_PUBLIC_GRAPHQL
# ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# ARG CLERK_SECRET_KEY
# ARG WEBHOOK_SECRET

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=${NODE_ENV}
# ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
# ENV CLOUDINARY_SECRET=${CLOUDINARY_SECRET}
# ENV CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
# ENV NEXT_PUBLIC_UPLOAD_PRESET=${NEXT_PUBLIC_UPLOAD_PRESET}
# ENV NEXT_PUBLIC_GRAPHQL=${NEXT_PUBLIC_GRAPHQL}
# ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
# ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
# ENV WEBHOOK_SECRET=${WEBHOOK_SECRET}

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js
