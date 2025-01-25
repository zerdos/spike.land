FROM node:alpine



USER root

# Install necessary packages
RUN apk update && apk add --no-cache git zsh shadow perl gcompat

# Delete existing 'node' user and group
RUN usermod -aG 1000 node && deluser node

# Recreate 'node' group with host's GID

# Accept UID and GID as build arguments with defaults
ARG USER_UID=1000
ARG USER_GID=1000
ARG USER=${USER}

RUN addgroup -g ${USER_GID} -S ${USER}

# Recreate 'node' user with host's UID, add to 'node' group
RUN adduser -u ${USER_UID} -G ${USER} -s /bin/sh -D ${USER}

RUN mkdir -p /home/${USER}/tmpfs /home/${USER}/workspace
VOLUME [ "/home/${USER}/tmpfs" ]
# Set ownership of the home directory
RUN chown -R ${USER}:${USER} /home/${USER}

USER ${USER}

# Set working directory
WORKDIR /home/${USER}/workspace
