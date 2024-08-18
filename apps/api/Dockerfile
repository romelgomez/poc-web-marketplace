FROM node:18-alpine AS base

WORKDIR /app

FROM base AS build

COPY package*.json ./

COPY apps/api/prisma/schema.prisma ./prisma/

RUN npm install

COPY . .

RUN prisma generate

RUN npm nx build api

FROM base AS runtime

WORKDIR /app

COPY --from=build /app/dist/apps/api /app/dist/apps/api
COPY --from=build /app/package*.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/nx.json /app

EXPOSE 3001

CMD ["npm", "run", "start:migrated"]
