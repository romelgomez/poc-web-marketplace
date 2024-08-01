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

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY apps/web .

EXPOSE 3000

ENV PORT 3000

CMD ["npx", "next", "start"]
