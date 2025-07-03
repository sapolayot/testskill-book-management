# Stage 1 - build
FROM node:stable-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2 - production
FROM node:stable-alpine as final
WORKDIR /app
COPY --from=builder /app ./
ENV HOST=0.0.0.0
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]
