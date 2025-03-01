# syntax=docker/dockerfile:1.12.0

# Stage 1: Node builder for Cypress
FROM node:slim as node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.6.0.cjs /usr/local/bin/yarn
RUN chmod 755 /usr/local/bin/yarn && apt-get update && apt-get install -y --no-install-recommends git unzip && rm -rf /var/lib/apt/lists/*

# Stage 2: Base image setup
FROM ubuntu:jammy AS devimage

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


COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node:lts-bullseye-slim --link /usr/local/lib/node_modules /usr/local/lib/node_modules

COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
                                                
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npx /usr/local/bin/npx


RUN node --version
RUN chmod 755 /usr/local/bin/yarn &&   yarn --version

### noVNC.Dockerfile
USER 0

# Set environment variable for the port
ENV PORT=6080

# Download and set up noVNC
RUN mkdir -p /tmp/novnc-build && \
    cd /tmp/novnc-build && \
    wget -q https://github.com/novnc/noVNC/archive/refs/tags/v1.4.0.tar.gz && \
    tar -xzf v1.4.0.tar.gz && \
    rm -rf /usr/share/novnc && \
    mkdir -p /usr/share/novnc && \
    cp -a noVNC-1.4.0/. /usr/share/novnc/ && \
    cd / && \
    rm -rf /tmp/novnc-build && \
    cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# Modify Xvnc-session and Xtigervnc-session configuration
RUN if [ -f /etc/X11/Xvnc-session ]; then \
        sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
        && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
        && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session; \
    else \
        sed -i -e '1 aautocutsel -fork' /etc/X11/Xtigervnc-session \
        && sed -i -e 's/iconic/nowin/g' /etc/X11/Xtigervnc-session \
        && sed -i -e '1 aterminator &' /etc/X11/Xtigervnc-session; \
    fi

# Adjust xfwm4 defaults
RUN sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
    && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults

# Update the startx script
RUN echo "((chmod 644 ~/.ssh/*.pub && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.gitconfig) || true ) \
    && (vncserver -SecurityTypes none -cleanstale -useold :1 -localhost no --I-KNOW-THIS-IS-INSECURE \
    && websockify --web=/usr/share/novnc/ --wrap-mode=ignore ${PORT} localhost:5901 || echo ok)" \
    >> /usr/bin/startx

USER ${USER}
### xfce.Dockerfile

USER 0
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
        xfce4-session \
        nano \
        terminator \
        gpg-agent \
    xfce4-goodies xfce4-helpers  aspell-doc spellutils gvfs hunspell \
    libenchant-2-voikko  libvisual-0.4-plugins file fancontrol i2c-tools heif-gdk-pixbuf \
    libavif-gdk-pixbuf webp-pixbuf-loader tumbler-plugins-extra \
    arj cpio lhasa  lrzip lzip lzop ncompress pbzip2 pigz plzip \
    unar zip zstd gigolo parole xfce4-indicator-plugin xfce4-mpc-plugin \
     xsensors mugshot \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

USER ${USER}
### suffix.Dockerfie



CMD /usr/bin/startWithBash