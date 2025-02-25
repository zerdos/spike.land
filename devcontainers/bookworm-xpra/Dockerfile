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
FROM debian:bookworm as devimage

# Base metadata
LABEL maintainer="zoltan.erdos@me.com"
ENV DEBIAN_FRONTEND=noninteractive

# Cypress environment variables
ENV QT_X11_NO_MITSHM=1 \
    _X11_NO_MITSHM=1 \
    _MITSHM=0 

# Switch to root user
USER 0

# Update and install base packages
RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get install --no-install-recommends -y \
       apt-transport-https \
       apt-utils \
       curl \
       git \
       gpg \
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
       libappindicator3-1 \
       xdg-utils \
       wget \
       gpg-agent \
       htop \
       inotify-tools \
       libvips \
       locales \
       make \
       mc \
       dirmngr \
       procps \
       psmisc \
       sudo \
       tzdata \
       xz-utils \
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


COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node:lts-bullseye-slim --link /usr/local/lib/node_modules /usr/local/lib/node_modules

COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
                                                
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npx /usr/local/bin/npx


RUN node --version
RUN chmod 755 /usr/local/bin/yarn &&   yarn --version

### xpra.Dockerfile

ENV XPRADISTRO=bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl gnupg2 \
    && curl https://xpra.org/gpg.asc | apt-key add - \
    && curl https://xpra.org/repos/bookworm/xpra.list > /etc/apt/sources.list.d/xpra.list \
    # && curl https://xpra.org/repos/bookworm/xpra-beta.list >> /etc/apt/sources.list.d/xpra.list \
    && apt-get update \ 
    && apt-get install -y \
        xpra xpra-html5 x264 terminator python3 python-paramiko python-pyinotify python-xdg dbus dbus-x11 xterm menu \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 
### xfce.Dockerfile

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


RUN echo "xpra start-desktop --start=xfce4-session --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx

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
### chromium.Dockerfile
# Update the package list
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    # Try installing Google Chrome
    (wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb) || \
    # If that fails, try installing Chromium
    (apt-get install -y chromium || \
    echo "This architecture is not supported for Google Chrome or Chromium.") && \
    # Clean up
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /google-chrome-stable_current_amd64.deb

# Set environment variables
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0

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
### zsh.Dockerfile

# Switch to root user to perform the chown operation
USER 0

# Change ownership of the user's home directory
RUN chown ${USER}:${USER} -R ${HOME}

# Switch back to the specified user
USER ${USER}

# Set the working directory
WORKDIR ${HOME}

# Install Oh My Zsh with specified plugins and theme
RUN rm -rf ${HOME}/.oh-my-zsh \
    && sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.0/zsh-in-docker.sh)" -- \
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

### deno.Dockerfile

USER ${USER}
RUN (curl -fsSL https://deno.land/x/install/install.sh | sh -s v2.2.1 \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${HOME}/.zshrc \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.zshrc) || echo no-deno

USER 0
RUN (ln /home/${USER}/.deno/bin/deno /usr/bin) || echo no-deno

USER ${USER}

  
### suffix.Dockerfie



CMD /usr/bin/startWithBash