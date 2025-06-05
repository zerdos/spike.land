# syntax=docker/dockerfile:1.12.0

# Stage 1: Node builder for Cypress
FROM node:slim AS node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.9.2.cjs /usr/local/bin/yarn
RUN chmod 755 /usr/local/bin/yarn && apt-get update && apt-get install -y --no-install-recommends git unzip && rm -rf /var/lib/apt/lists/*

# Stage 2: Base image setup
FROM debian:bullseye AS devimage

# Base metadata
LABEL maintainer="zoltan.erdos@me.com"
ENV DEBIAN_FRONTEND=noninteractive \
    QT_X11_NO_MITSHM=1 \
    _X11_NO_MITSHM=1 \
    _MITSHM=0

# Switch to root user
USER 0

# Update system and install base packages in a single layer
RUN apt-get update || (sleep 15 && apt-get update) || (sleep 15 && apt-get update) && \
    apt-get dist-upgrade -y && \
    apt-get update || (sleep 15 && apt-get update) || (sleep 15 && apt-get update) && \
    # Install all packages in a single run to reduce layers
    apt-get install --no-install-recommends -y \
        apt-transport-https \
        apt-utils \
        ca-certificates \
        curl \
        autocutsel \
        build-essential \
        bzip2 \
        dbus \
        dbus-x11 \
        dirmngr \
        fonts-noto-color-emoji \
        g++ \
        git \
        gpg \
        gpg-agent \
        htop \
        inotify-tools \
        libayatana-appindicator3-1 \
        libcurl4 \
        libgbm-dev \
        libgtk-3-0 \
        libgtk2.0-0 \
        libnotify-dev \
        libnss3 \
        libvips \
        libxss1 \
        libxtst6 \
        locales \
        make \
        mc \
        procps \
        psmisc \
        sudo \
        tigervnc-standalone-server \
        tigervnc-xorg-extension \
        tzdata \
        unzip \
        websockify \
        wget \
        xdg-utils \
        xfwm4 \
        xvfb \
        xz-utils \
        zsh \
    || (apt-get install --no-install-recommends -y \
            libappindicator3-1 \
            # Continue with remaining packages if libayatana-appindicator3-1 failed
            # (Re-listing all packages that might not have been installed)
        ) \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Define the user and set up sudo permissions
ARG USER_UID=1000
ARG USER_GID=1000
ARG USER="gitpod"
ARG HOME
ARG USERNAME=${USER}
ARG USER_HOME=${HOME:-/home/${USER}}
ENV USER=${USER}
ENV USERNAME=${USERNAME}
ENV USER_HOME=${USER_HOME}
ENV HOME=${USER_HOME}

# Create user in a single layer
RUN (userdel -r -f "$(id -un 1000)" 2>/dev/null || true) && \
    (groupdel -f "$(getent group 1000 | cut -d: -f1)" 2>/dev/null || true) && \
    if getent group ${USER_GID} > /dev/null 2>&1; then \
        groupmod -n ${USER} $(getent group ${USER_GID} | cut -d: -f1) || groupadd -g ${USER_GID} ${USER}; \
    else \
        groupadd -g ${USER_GID} ${USER}; \
    fi && \
    useradd -l -u ${USER_UID} -g ${USER_GID} -G sudo -m -s /usr/bin/zsh ${USER} && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    echo "Set disable_coredump false" >> /etc/sudo.conf && \
    chown ${USER}:${USER} -R ${USER_HOME} 2>/dev/null || true

# Set up start scripts
RUN touch /usr/bin/startx /usr/bin/startWithBash \
    && chmod +x /usr/bin/startx /usr/bin/startWithBash \
    && echo "( test -f ${USER_HOME}/.zshrc || (cp ${USER_HOME}/.oh-my-zsh/.zshrc ${USER_HOME}/.zshrc || echo no_zshr) && sudo service dbus start && sudo sysctl fs.inotify.max_user_watches=524288 fs.inotify.max_user_instances=524288 net.core.somaxconn=524288 fscache.object_max_active=524288 || echo failed) && (sudo sysctl -p || echo failed) && (sudo chown ${USER}:${USER} ${USER_HOME}/tmpfs || echo failed)" >> /usr/bin/startx \
    && echo "bash /usr/bin/startx" >> /usr/bin/startWithBash

### git.Dockerfile

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    make \
    libssl-dev \
    libghc-zlib-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
    gpg \
&& curl -Lo /usr/src/git.tar.gz  https://github.com/git/git/archive/v2.48.1.tar.gz \
&& tar -C /usr/src/ -xf /usr/src/git.tar.gz && cd /usr/src/git-* \
&& make prefix=/usr/local all \
&& make prefix=/usr/local install \
&& apt-get remove -y \
    libssl-dev \
    libghc-zlib-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /tmp/* /var/lib/apt/lists/* /usr/src/*# Stage 1: Base dependencies
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
RUN curl -fsSL https://deb.nodesource.com/setup_22.14.0.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && npm install -g yarn@4.9.2 \
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

# Install Node.js (if not already included by another template)
# This section might be redundant if the 'node' template is always used with this one.
# Consider adding a check or relying on the 'node' template dependency.
USER root
RUN apt-get update && apt-get install -y curl gnupg &&     curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - &&     apt-get install -y nodejs

# Install Wrangler CLI
RUN npm install -g wrangler

### suffix.Dockerfie



CMD /usr/bin/startWithBash