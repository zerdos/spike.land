FROM node:alpine

# Accept arguments with defaults
ARG USER_UID=1000
ARG USER_GID=1000
ARG USER=node
ARG HOME=/home/node

# Install necessary packages in a single layer
RUN apk update && apk add --no-cache \
    git \
    zsh \
    shadow \
    perl \
    gcompat \
    && rm -rf /var/cache/apk/*

# Set up user and permissions in a single layer
RUN deluser node \
    && addgroup -g ${USER_GID} -S ${USER} \
    && adduser -u ${USER_UID} -G ${USER} -s /bin/zsh -D ${USER} \
    && mkdir -p ${HOME}/tmpfs ${HOME}/workspace \
    && chown -R ${USER}:${USER} ${HOME}

# Set environment variables
ENV HOME=${HOME} \
    PATH=${HOME}/.local/bin:${PATH} \
    SHELL=/bin/zsh

# Create volume for temporary storage
VOLUME ["${HOME}/tmpfs"]

# Switch to non-root user
USER ${USER}

# Set working directory
WORKDIR ${HOME}/workspace

# Install global yarn packages if needed
# RUN yarn global add <your-global-packages>

# Cache bust only when package files change
COPY --chown=${USER}:${USER} package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000

# Set default command
CMD ["zsh"]
