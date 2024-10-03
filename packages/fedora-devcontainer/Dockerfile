# syntax=docker/dockerfile:1.5.2

# Stage 1: Node builder for Cypress
FROM node:alpine as node-builder

# Add yarn
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.5.0.cjs /usr/local/bin/yarn
RUN chmod 755 /usr/local/bin/yarn && apk add --no-cache git unzip

# Uncomment the following lines if you need to install Cypress during the build
# RUN mkdir /cy && cd /cy && yarn init -y \
#     && yarn add --dev cypress --mode=skip-build \
#     && yarn run cypress install --force

# Stage 2: Base image setup
FROM fedora:latest as devimage

# Base metadata
LABEL maintainer="zoltan.erdos@me.com"
RUN dnf -y update \
    && dnf -y upgrade \
    && dnf -y install \
       curl \
       git \
       gpg \
       gtk2 \
       gtk3 \
       libnotify \
       mesa-libgbm \
       nss \
       libXScrnSaver \
       bzip2 \
       unzip \
       alsa-lib \
       libXtst \
       xorg-x11-server-Xvfb \
       google-noto-sans-fonts \
       libcurl \
       libappindicator-gtk3 \
       wget \
       gnupg2 \
       htop \
       inotify-tools \
       vips \
       make \
       mc \
       procps \
       psmisc \
       sudo \
       tzdata \
       xz \
    && dnf -y install \
       dbus \
       dbus-x11 \
       xfwm4 \
       zsh \
       google-noto-emoji-fonts \
       novnc \
       g++ \
       tigervnc-server \
    && dnf -y autoremove \
    && dnf clean all


# Define the user and set up sudo permissions
ARG USER_UID=1000
ARG USER_GID=1000

ARG USER="gitpod"
ENV USER=${USER}

RUN groupadd --gid ${USER_GID} ${USER} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} --create-home --shell /usr/bin/zsh ${USER} \
    && usermod -aG wheel ${USER} \
    && chown ${USER}:${USER} -R /home/${USER} \
    && echo '%wheel ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
    && echo "Set disable_coredump false" >> /etc/sudo.conf

    RUN touch /usr/bin/startx /usr/bin/startWithBash \
    && chmod +x /usr/bin/startx /usr/bin/startWithBash \
    && dnf clean all


COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npx /usr/local/bin/npx

RUN node --version
RUN chmod 755 /usr/local/bin/yarn && yarn --version


RUN dnf update \
    && dnf install -y \
       @xfce-desktop-environment \
       xfce4-session \
       nano \
       terminator \
       gnupg2 \
    && dnf autoremove -y \
    && dnf clean all


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

RUN dnf -y update \
    && dnf -y install \
       @xfce-desktop-environment \
       xfce4-session \
       nano \
       terminator \
       gnupg2 \
       7zip \
       aspell-doc \
       gvfs \
       hunspell \
       libenchant \
       libvisual-0.4 \
       i2c-tools \
       libheif \
       webp-pixbuf-loader \
       tumbler \
       zip \
       zstd \
       gigolo \
       parole \
       xfce4-indicator-plugin \
       xsensors \
       mugshot \
    && dnf autoremove -y \
    && dnf clean all

### chromium.Dockerfile
# Update the package list and install Chromium
RUN dnf -y update && \
    dnf -y install chromium && \
    dnf autoremove -y && \
    dnf clean all

# Set environment variables
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0

### vscode.Dockerfile
RUN dnf -y install \
       https://packages.microsoft.com/yumrepos/vscode/code-latest.x86_64.rpm \
       libXtst \
       openssh-server \
    && dnf autoremove -y \
    && dnf clean all

# Docker setup
RUN dnf -y install dnf-plugins-core \
    && dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo \
    && dnf install -y docker-ce docker-ce-cli containerd.io \
    && curl -L https://github.com/docker/compose/releases/download/v2.5.1/docker-compose-`uname -s`-`uname -m` \
    -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose \
    && usermod -aG docker ${USER} \
    && dnf autoremove -y \
    && dnf clean all

ENV COMPOSE_DOCKER_CLI_BUILD=1
ENV DOCKER_BUILDKIT=1

### zsh.Dockerfile

# Install Oh My Zsh with specified plugins and theme
USER ${USER}
RUN rm -rf /home/${USER}/.oh-my-zsh \
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

RUN (curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.46.3 \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${HOME}/.zshrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.zshrc)

USER 0
RUN ln -s /home/${USER}/.deno/bin/deno /usr/bin || echo "deno not linked"

USER ${USER}

CMD /usr/bin/startWithBash
