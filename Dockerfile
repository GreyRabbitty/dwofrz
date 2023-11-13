ARG PLATFORM=linux/amd64
ARG BASE_IMAGE=node:18-alpine
# ===================== builder =====================
FROM --platform=${PLATFORM} ${BASE_IMAGE} AS builder

# Install necessary dependencies
RUN  apk update && apk add --no-cache --update git && which yarn || npm install --global yarn

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

RUN  yarn build
# ====================== app ======================
FROM --platform=${PLATFORM} ${BASE_IMAGE} AS app

WORKDIR /app

# Define default env variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

RUN addgroup --system --gid 1001 ragnarokgrp && adduser --system --uid 1001 ragnarokusr

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/ ./
COPY --from=builder /app/yarn.lock .

# Automatically leverage output traces to reduce image size, see: https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=ragnarokusr:ragnarokgrp /app/.next/standalone ./
COPY --from=builder --chown=ragnarokusr:ragnarokgrp /app/.next/static ./.next/static

USER ragnarokusr
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
