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
FROM ubuntu:jammy AS devimage

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
RUN n=0; \
    max_tries=3; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
    done \
    && apt-get dist-upgrade -y \
    && rm -rf /var/lib/apt/lists/* \
    && n=0; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
    done \
    && (apt-get install --no-install-recommends -y libayatana-appindicator3-1 \
        || apt-get install --no-install-recommends -y libappindicator3-1 \
        || echo "Failed to install libappindicator3-1") \
    && rm -rf /var/lib/apt/lists/* \
    && n=0; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
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
    && n=0; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
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
    && n=0; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
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
    && n=0; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
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
    && n=0; \
    until [ $n -ge $max_tries ]; do \
      apt-get update && break; \
      n=$((n+1)); \
      if [ $n -lt $max_tries ]; then \
        sleep 15; \
      fi \
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


COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node:lts-bullseye-slim --link /usr/local/lib/node_modules /usr/local/lib/node_modules

COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
                                                
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npx /usr/local/bin/npx


RUN node --version
RUN chmod 755 /usr/local/bin/yarn &&   yarn --version

### noVNC.Dockerfile

# Set environment variable for the port
ENV PORT=6080

# Clone the noVNC repository and set up the necessary files
RUN git clone https://github.com/novnc/noVNC.git --depth=1 \
    && cp -af ./noVNC/. /usr/share/novnc/ \
    && rm -rf ./noVNC \
    && cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html 

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

### suffix.Dockerfie



CMD /usr/bin/startWithBash