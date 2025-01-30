FROM node:alpine

# Set default values for build arguments
ARG USER_UID=1000
ARG USER_GID=1000
ARG USERNAME=node
ARG USER_HOME=/home/node

# Install necessary packages in a single layer
RUN apk update && apk add --no-cache \
    git \
    zsh \
    shadow \
    perl \
    gcompat \
    bash \
    curl \
    build-base \
    netcat-openbsd \
    libc++ \
    && rm -rf /var/cache/apk/*

# Set up user and permissions in a single layer
RUN if getent passwd node; then deluser node; fi && \
    if getent group node; then delgroup node; fi && \
    addgroup -g ${USER_GID} -S ${USERNAME} && \
    adduser -u ${USER_UID} -S -s /bin/bash -G ${USERNAME} ${USERNAME} && \
    mkdir -p ${USER_HOME}/tmpfs ${USER_HOME}/workspace ${USER_HOME}/.yarn  && \
    chown -R ${USERNAME} ${USER_HOME} && \
    corepack enable

# Set environment variables
ENV HOME=${USER_HOME} \
    PATH=${USER_HOME}/.local/bin:${PATH} \
    SHELL=/bin/bash

# Create volume for temporary storage

# Copy entrypoint script
COPY --chown=root:root docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Switch to non-root user
USER ${USERNAME}

VOLUME ["${USER_HOME}/tmpfs"]
VOLUME ["${USER_HOME}/workspace"]
VOLUME ["${USER_HOME}/.yarn"]

# Set working directory
WORKDIR ${USER_HOME}/workspace

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["bash"]
