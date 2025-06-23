# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the app
RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# Copy dist (compiled app)
COPY --from=builder /app/dist ./dist

# Copy Prisma client (default path: node_modules/@prisma/client)
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy schema.prisma (optional, for migrations or debug)
COPY --from=builder /app/prisma ./prisma

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

USER node

EXPOSE 8000

CMD ["./docker-entrypoint.sh"]
