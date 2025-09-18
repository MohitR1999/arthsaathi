FROM node:22-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

FROM node:22-alpine3.20 AS runner
WORKDIR /app
COPY --from=builder /usr/src/app /app
RUN npm i -g serve
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]