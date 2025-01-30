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
    && rm -rf /var/cache/apk/*

# Set up user and permissions in a single layer
RUN if getent passwd node; then deluser node; fi && \
    if getent group node; then delgroup node; fi && \
    addgroup -g ${USER_GID} -S ${USERNAME} && \
    adduser -u ${USER_UID} -S -s /bin/zsh -G ${USERNAME} ${USERNAME} && \
    mkdir -p ${USER_HOME}/tmpfs ${USER_HOME}/workspace && \
    chown -R ${USERNAME}:${USERNAME} ${USER_HOME}

# Set environment variables
ENV HOME=${USER_HOME} \
    PATH=${USER_HOME}/.local/bin:${PATH} \
    SHELL=/bin/zsh

# Create volume for temporary storage
VOLUME ["${USER_HOME}/tmpfs"]

# Switch to non-root user
USER ${USERNAME}

# Set working directory
WORKDIR ${USER_HOME}/workspace

# Install global yarn packages if needed
# RUN yarn global add <your-global-packages>

# Cache bust only when package files change
COPY --chown=${USERNAME}:${USERNAME} package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

# Set default command
CMD ["zsh"]
