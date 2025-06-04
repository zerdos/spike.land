# syntax=docker/dockerfile:1.12.0

# Stage 1: Node builder for Cypress
FROM node:slim AS node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.9.1.cjs /usr/local/bin/yarn
RUN chmod 755 /usr/local/bin/yarn && apt-get update && apt-get install -y --no-install-recommends git unzip && rm -rf /var/lib/apt/lists/*

# Stage 2: Base image setup
FROM ubuntu:rolling AS devimage

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


COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node:lts-bullseye-slim --link /usr/local/lib/node_modules /usr/local/lib/node_modules

COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
                                                
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npx /usr/local/bin/npx


RUN node --version
RUN chmod 755 /usr/local/bin/yarn &&  yarn --version

### deno.Dockerfile

USER ${USER}
RUN (curl -fsSL https://deno.land/x/install/install.sh | sh -s v2.2.1 \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${USER_HOME}/.zshrc \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${USER_HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${USER_HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${USER_HOME}/.zshrc) || echo no-deno

USER 0
RUN (ln ${USER_HOME}/.deno/bin/deno /usr/bin) || echo no-deno

USER ${USER}

### noVNC.Dockerfile
USER 0

# Set environment variable for the port
ENV PORT=6080

# Download and set up noVNC with error handling
RUN set -e && \
    mkdir -p /tmp/novnc-build && \
    cd /tmp/novnc-build && \
    wget -q https://github.com/novnc/noVNC/archive/refs/tags/v1.5.0.tar.gz || \
        (echo "Failed to download noVNC, retrying..." && \
         sleep 5 && \
         wget -q https://github.com/novnc/noVNC/archive/refs/tags/v1.5.0.tar.gz) && \
    tar -xzf v1.5.0.tar.gz && \
    mkdir -p /usr/share/novnc && \
    cp -a noVNC-1.5.0/* /usr/share/novnc/ && \
    if [ -f /usr/share/novnc/vnc.html ]; then \
        cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html; \
    fi && \
    cd / && \
    rm -rf /tmp/novnc-build

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
### docker.Dockerfile
USER 0

RUN apt-get update && apt-get install -y ca-certificates curl \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc \
    && chmod a+r /etc/apt/keyrings/docker.asc \
    && echo \
       "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
       $(. /etc/os-release && echo "bookworm") stable" >> /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin \
    && usermod -aG docker ${USER} \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

    USER ${USER}
### vscode.Dockerfile

RUN  (mkdir -p /etc/apt/keyrings && \
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" | \
tee /etc/apt/sources.list.d/vscode.list) && \
apt-get update && \
apt-get install -y code libxtst6 openssh-server && \
apt-get autoremove -y && \
apt-get clean -y && \
rm -rf /var/lib/apt/lists/* || echo "this arch is not supported"
#   && sed -i -e 's/\/usr\/bin\/code/\/usr\/share\/code\/code --user-data-dir /g' /usr/share/applications/code.desktop 
### zsh.Dockerfile

# Switch to root user to perform the chown operation
USER 0

# Change ownership of the user's home directory and set working directory
RUN chown ${USER}:${USER} -R ${USER_HOME} || echo "Failed to chown home directory"

# Switch back to the specified user
USER ${USER}

# Set the working directory
WORKDIR ${USER_HOME}

# Install Oh My Zsh with specified plugins and theme
RUN rm -rf ${USER_HOME}/.oh-my-zsh \
    && sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.1/zsh-in-docker.sh)" -- \
       -t robbyrussell \
       -p git \
       -p gitfast \
       -p git-extras \
       -p yarn \
       -a 'CASE_SENSITIVE="true"' \
    && touch ~/.bashrc \
    && echo ":)" > ~/.mood

# Set the default shell to zsh
ENV SHELL=/usr/bin/zsh

### suffix.Dockerfie



CMD /usr/bin/startWithBash