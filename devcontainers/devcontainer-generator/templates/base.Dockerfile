# syntax=docker/dockerfile:1.12.0

# Stage 1: Node builder for Cypress
FROM node:slim as node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.6.0.cjs /usr/local/bin/yarn
RUN chmod 755 /usr/local/bin/yarn && apt-get update && apt-get install -y --no-install-recommends git unzip && rm -rf /var/lib/apt/lists/*

# Stage 2: Base image setup
FROM {DISTRO} AS devimage

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
        autocutsel \
        build-essential \
        bzip2 \
        curl \
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
        libasound2 \
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
        novnc \
        procps \
        psmisc \
        sudo \
        tigervnc-standalone-server \
        tigervnc-xorg-extension \
        tzdata \
        unzip \
        wget \
        xdg-utils \
        xfwm4 \
        xvfb \
        xz-utils \
        zsh \
    || (apt-get update || (sleep 15 && apt-get update) || (sleep 15 && apt-get update) && \
        apt-get install --no-install-recommends -y \
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
ENV USER=${USER}

# Create user in a single layer
RUN addgroup --gid ${USER_GID} ${USER} \
    && adduser --uid ${USER_UID} --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup ${USER} ${USER} \
    && adduser ${USER} sudo \
    && chown ${USER}:${USER} -R /home/${USER} \
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
    && echo "Set disable_coredump false" >> /etc/sudo.conf

# Set up start scripts
RUN touch /usr/bin/startx /usr/bin/startWithBash \
    && chmod +x /usr/bin/startx /usr/bin/startWithBash \
    && echo "( test -f /home/${USER}/.zshrc || (cp /home/${USER}/.oh-my-zsh/.zshrc /home/${USER}/.zshrc || echo no_zshr) && sudo service dbus start && sudo sysctl fs.inotify.max_user_watches=524288 fs.inotify.max_user_instances=524288 net.core.somaxconn=524288 fscache.object_max_active=524288 || echo failed) && (sudo sysctl -p || echo failed) && (sudo chown ${USER}:${USER} /home/${USER}/tmpfs || echo failed)" >> /usr/bin/startx \
    && echo "bash /usr/bin/startx" >> /usr/bin/startWithBash
