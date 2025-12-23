# syntax=docker/dockerfile:1.12.0

# Stage 1: Node builder for Cypress
FROM node:slim AS node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.12.0.cjs /usr/local/bin/yarn
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
