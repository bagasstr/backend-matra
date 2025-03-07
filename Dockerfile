# Base image
FROM node:20-alpine

# Set environment variables
ENV NODE_ENV=production

# Install dependencies
RUN apk add --no-cache openssl


# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (optimize caching layers)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy Prisma schema separately (for prisma generate step)
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application source code
COPY . .

# Expose the port
EXPOSE 5200

# Start the Express server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]


