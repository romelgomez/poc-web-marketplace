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

# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy the dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the codebase
COPY . .

# Build the Next.js app
RUN npx nx build web --configuration=production

# Stage 2: Serve
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# # Install serve globally
RUN npm install -g serve

# # Copy the build output from the builder stage
COPY --from=builder /app/dist/apps/web ./

# # Expose the port the app runs on
EXPOSE 3000

# # Command to run the application
# CMD ["serve", "-s", ".", "-l", "3000"]