# Stage 1: Base dependencies
FROM debian:bookworm-slim AS base
# Use Debian-based images throughout for consistency
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Stage 2: Build tools (used for compilation only)
FROM base AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Stage 3: Node setup
FROM builder AS node-builder
# Add NodeSource repository
RUN curl -fsSL https://deb.nodesource.com/setup_{NODE_VERSION}.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g yarn@{YARN_VERSION} \
    && npm cache clean --force \
    && rm -rf /var/lib/apt/lists/*

# Stage 4: Build native modules if needed
FROM node-builder AS module-builder
WORKDIR /build
COPY package.json yarn.lock* .yarnrc.yml .yarn ./
RUN yarn install --immutable

# Stage 5: Development environment
FROM base AS development
# Install runtime dependencies only
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    openssh-client \
    zsh \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Copy Node.js and npm from node-builder
COPY --from=node-builder /usr/bin/node /usr/bin/
COPY --from=node-builder /usr/bin/npm /usr/bin/
COPY --from=node-builder /usr/bin/npx /usr/bin/
COPY --from=node-builder /usr/bin/yarn /usr/bin/
COPY --from=node-builder /usr/lib/node_modules /usr/lib/node_modules

# Copy built node modules if needed
COPY --from=module-builder /build/node_modules /app/node_modules

# Create and set up user
ARG USER_UID=1000
ARG USER_GID=1000
ARG USER="developer"
ENV USER=${USER}

RUN groupadd --gid ${USER_GID} ${USER} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} --shell /usr/bin/zsh --create-home ${USER} \
    && echo "${USER} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USER} \
    && chmod 0440 /etc/sudoers.d/${USER}

# Set working directory and switch to non-root user
WORKDIR /app
USER ${USER}

# Default command
CMD ["zsh"]
