# Stage 1 - build
FROM node:22.12.0-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2 - production
FROM node:22.12.0-alpine as final
WORKDIR /app
COPY --from=builder /app ./
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]