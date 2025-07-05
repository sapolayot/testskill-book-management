# Stage 1 - Build
FROM node:22.0.0-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2 - Production
FROM node:stable-alpine as final
WORKDIR /app
COPY --from=builder /app ./
ENV PORT=80
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]
