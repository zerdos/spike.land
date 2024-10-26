FROM node:alpine

# Accept UID and GID as build arguments with defaults
ARG USER_UID=1000
ARG USER_GID=1000

USER root

# Install necessary packages
RUN apk update && apk add --no-cache git zsh shadow perl

# Delete existing 'node' user and group
RUN usermod -aG 1000 node && deluser node

# Recreate 'node' group with host's GID
RUN addgroup -g ${USER_GID} node

# Recreate 'node' user with host's UID, add to 'node' group
RUN adduser -u ${USER_UID} -G node -s /bin/sh -D node

RUN mkdir -p /home/node/tmpfs
VOLUME [ "/home/node/tmpfs" ]
# Set ownership of the home directory
RUN chown -R node:node /home/node

USER node

# Set working directory
WORKDIR /home/node/workspace
