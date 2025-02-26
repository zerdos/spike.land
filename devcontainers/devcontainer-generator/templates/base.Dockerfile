# syntax=docker/dockerfile:1.12.0

# Stage 1: Node builder for Cypress
FROM node:alpine as node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.6.0.cjs /usr/local/bin/yarn
RUN chmod 755 /usr/local/bin/yarn && apk add --no-cache git unzip

# Uncomment the following lines if you need to install Cypress during the build
# RUN mkdir /cy && cd /cy && yarn init -y \
#     && yarn add --dev cypress --mode=skip-build \
#     && yarn run cypress install --force

# Stage 2: Base image setup
FROM {DISTRO} as devimage

# Base metadata
LABEL maintainer="zoltan.erdos@me.com"
ENV DEBIAN_FRONTEND=noninteractive

# Cypress environment variables
ENV QT_X11_NO_MITSHM=1 \
    _X11_NO_MITSHM=1 \
    _MITSHM=0 

# Switch to root user
USER 0

# Update system and install base packages in stages
RUN for i in {1..3}; do \
      (apt-get update && break) || sleep 15; \
    done \
    && apt-get dist-upgrade -y \
    && rm -rf /var/lib/apt/lists/* \
    && for i in {1..3}; do \
      (apt-get update && break) || sleep 15; \
    done \
    && (apt-get install --no-install-recommends -y libayatana-appindicator3-1 \
        || apt-get install --no-install-recommends -y libappindicator3-1 \
        || echo "Failed to install libappindicator3-1") \
    && rm -rf /var/lib/apt/lists/* \
    && for i in {1..3}; do \
      (apt-get update && break) || sleep 15; \
    done \
    && apt-get install --no-install-recommends -y \
       apt-transport-https \
       apt-utils \
       curl \
       git \
       gpg \
       wget \
       gpg-agent \
       dirmngr \
       sudo \
    && rm -rf /var/lib/apt/lists/* \
    && for i in {1..3}; do \
      (apt-get update && break) || sleep 15; \
    done \
    && apt-get install --no-install-recommends -y \
       libgtk2.0-0 \
       libgtk-3-0 \
       libnotify-dev \
       libgbm-dev \
       libnss3 \
       libxss1 \
       bzip2 \
       unzip \
       libasound2 \
       libxtst6 \
       xvfb \
       fonts-liberation \
       libcurl4 \
       xdg-utils \
    && rm -rf /var/lib/apt/lists/* \
    && for i in {1..3}; do \
      (apt-get update && break) || sleep 15; \
    done \
    && apt-get install --no-install-recommends -y \
       htop \
       inotify-tools \
       libvips \
       locales \
       make \
       mc \
       procps \
       psmisc \
       tzdata \
       xz-utils \
    && rm -rf /var/lib/apt/lists/* \
    && for i in {1..3}; do \
      (apt-get update && break) || sleep 15; \
    done \
    && apt-get install --install-recommends -y \
       autocutsel \
       dbus \
       build-essential \
       dbus-x11 \
       xfwm4 \
       zsh \
       fonts-noto-color-emoji \
       novnc \
       g++ \
    && rm -rf /var/lib/apt/lists/* \
    && for i in {1..3}; do \
      (apt-get update && break) || sleep 1; \
    done \
    && apt-get install --install-recommends -y \
       tigervnc-standalone-server \
       tigervnc-xorg-extension \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Define the user and set up sudo permissions
ARG USER_UID=1000
ARG USER_GID=1000

ARG USER="gitpod"
ENV USER=${USER}


RUN (addgroup --gid ${USER_GID} ${USER} \
    && adduser --uid ${USER_UID} --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup ${USER} ${USER} \
    && adduser ${USER} sudo \
    && chown ${USER}:${USER} -R /home/${USER} \
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
    && echo "Set disable_coredump false" >> /etc/sudo.conf) || echo "Failed to add user"

# Set up start scripts
RUN touch /usr/bin/startx /usr/bin/startWithBash \
    && chmod +x /usr/bin/startx /usr/bin/startWithBash \
    && echo "( test -f /home/${USER}/.zshrc  || (cp /home/${USER}/.oh-my-zsh/.zshrc /home/${USER}/.zshrc || echo no_zshr)  && sudo service dbus start && sudo sysctl fs.inotify.max_user_watches=524288 fs.inotify.max_user_instances=524288 net.core.somaxconn=524288 fscache.object_max_active=524288 || echo failed) && (sudo sysctl -p || echo failed) && (sudo chown ${USER}:${USER} /home/${USER}/tmpfs)" >> /usr/bin/startx \
    && echo "bash /usr/bin/startx" >> /usr/bin/startWithBash \
    && chmod +x /usr/bin/startWithBash \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
