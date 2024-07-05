# 
# docker build --progress=plain --no-cache -t api -f apps/api/Dockerfile .
# docker build --no-cache -t api -f apps/api/Dockerfile .
# 
# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json .
COPY dist/apps/api/main.js /app/dist/main.js

# RUN npm i --legacy-peer-deps --production
RUN npm install --only=production

# Stage 2: Setup PM2 and Nginx
FROM node:16-alpine

# Install PM2 globally
RUN npm install -g pm2

# Install Nginx and Certbot
RUN apk add --no-cache nginx certbot-nginx openssl

# Copy built application from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/
COPY --from=build /app/node_modules /app/node_modules

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set the working directory
WORKDIR /app

# Expose ports for Nginx
EXPOSE 80 443

# Start Nginx and PM2
# CMD ["sh", "-c", "nginx && pm2-runtime start dist/main.js"]
















# # FROM node:20-alpine
# FROM node:18-buster


# Install curl
# RUN apt-get update && apt-get install -y curl

# Download and install Bun
# RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
# ENV BUN_INSTALL=/root/.bun
# ENV PATH=$BUN_INSTALL/bin:$PATH

# WORKDIR /app

# COPY apps/api .
# COPY package.json package-lock.json .


# Copy Nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# # Install PM2 globally
# RUN npm install -g pm2

# # # Install Nginx
# RUN apk add --no-cache nginx certbot-nginx openssl

# # # Expose ports
# EXPOSE 80 443

# # Start Nginx and PM2
# CMD ["sh", "-c", "nginx && pm2-runtime start dist/main.js"]
# CMD ["sh", "-c", "node dist/main.js"]

# Debug: List the contents of /app after copying project files
# RUN ls -la /app

# Install dependencies from the root package.json
# RUN npm i --legacy-peer-deps


# Build the API project
# RUN npx nest build

# EXPOSE 3000

# CMD ["node", "dist/main"]
