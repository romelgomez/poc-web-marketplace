# :: test steps ::
# 
# 1. npx nx build api  --configuration=production
#
# 2. docker-compose down -v
#
# 3. docker build --progress=plain --no-cache -t api -f apps/api/Dockerfile .
# 
# 3. docker-compose up --build
# 

# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json .
COPY dist/apps/api/main.js /app/dist/main.js
COPY prisma ./prisma
COPY apps/api/prisma/schema.prisma ./prisma

RUN npm install

# TODO where I place these commants to migrate the database, the docker-compose is the 
# task that start the database and only then we can do this 
# RUN npx prisma generate
# RUN npx prisma migrate dev --name init 
# RUN npx prisma migrate deploy

# Stage 2: Setup the application
FROM node:16-alpine

# Copy built application from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start:migrated"]
