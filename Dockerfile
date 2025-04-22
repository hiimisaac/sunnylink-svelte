# syntax = docker/dockerfile:1

# Adjust DENO_VERSION as desired
ARG DENO_VERSION=2.0.3
FROM denoland/deno:${DENO_VERSION} AS base

LABEL fly_launch_runtime="SvelteKit"

# SvelteKit app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed for build (if any)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential

# Copy application code
COPY . .

# Cache dependencies and build application
RUN deno cache --unstable ./src/**/*.ts
RUN deno task build

# Final stage for app image
FROM base

# Copy built application and necessary files
COPY --from=build /app/.svelte-kit/output /app/.svelte-kit/output
COPY --from=build /app/static /app/static
COPY --from=build /app/svelte.config.js /app/svelte.config.js
COPY --from=build /app/deno.json /app/deno.json
COPY --from=build /app/vite.config.ts /app/vite.config.ts

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "deno", "run", "--allow-net", "--allow-env", "--allow-read", ".svelte-kit/output/server/index.js" ]