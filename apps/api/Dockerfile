# :: test steps ::
# 
# 1. npx nx build api  --configuration=production
#
# 2. docker-compose down -v
#
# 3. docker build --progress=plain --no-cache -t maryline/api:0.0.1 -f apps/api/Dockerfile .
# 
# 3. docker-compose up --build
# 

# Use a consistent base image for both stages to improve layer sharing
FROM node:18-alpine AS base

# Set the working directory for future commands
WORKDIR /app

# Stage 1: Build the application
FROM base AS build

# Install dependencies separately to cache layer if package.json didn't change
COPY package*.json ./
COPY apps/api/prisma/schema.prisma ./prisma/
RUN npm install

# Copy prisma schema and other files needed for build
COPY . .

# Build the application
RUN npx prisma generate
RUN npx nx build api

# Stage 2: Setup the application
FROM base AS runtime

# Set the working directory
WORKDIR /app

# Copy built application and dependencies from the build stage
COPY --from=build /app/dist/apps/api /app/dist/apps/api
COPY --from=build /app/package*.json /app/
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/nx.json /app

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run", "start:migrated"]
