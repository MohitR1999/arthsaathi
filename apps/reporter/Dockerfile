FROM node:22-alpine3.21 AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN npm install turbo@^2.5.8 --global
COPY . .
RUN turbo prune arthsaathi-reporter --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN npm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
WORKDIR /app/apps/reporter
EXPOSE 5002

CMD npm run start
