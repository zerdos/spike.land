# syntax=docker/dockerfile:1.4.1

FROM node:alpine as node-builder
ADD https://raw.githubusercontent.com/zerdos/spike.land/main/.yarn/releases/yarn-4.0.0-rc.45.cjs /usr/local/bin/yarn

RUN chmod 755 /usr/local/bin/yarn && apk add --no-cache git unzip

RUN cd && mkdir cy && cd cy && yarn init  && yarn add --dev cypress --mode=skip-build && yarn run cypress install --force

FROM {DISTRO} as devimage

### base.Dockerfile
### Generator: https://github.com/zerdos/spike.land/tree/main/packages

LABEL maintainer=zoltan.erdos@me.com

ENV DEBIAN_FRONTEND=noninteractive

## cypress.Dockerfile
ENV  QT_X11_NO_MITSHM=1 \
  _X11_NO_MITSHM=1 \
  _MITSHM=0 


USER 0

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
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  bzip2 \
  unzip \
  bzip2 \
  libasound2 \
  libxtst6 \
  xvfb \
  fonts-liberation \
  libcurl4 \
  libappindicator3-1\
  libcurl3-gnutls \
  libcurl3-nss \
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
  software-properties-common \
  sudo \
  tzdata \
  xz-utils \
  && apt-get install --install-recommends -y \
  autocutsel \
  dbus \
  dbus-x11 \
  xfwm4 \
  zsh \
  fonts-noto-color-emoji \
  # xvfb \
  novnc \
  g++ \
  # websockify \
  tigervnc-standalone-server \
  tigervnc-xorg-extension \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 

ARG USER="gitpod"
ENV USER=${USER}

RUN (addgroup --gid 1001 ${USER}  \
  && adduser --uid 1001 --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup ${USER} ${USER}  || echo user_exist) \
  && adduser ${USER} sudo \
  && chown ${USER}:${USER} -R /home/${USER} \
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
  && echo "Set disable_coredump false" >> /etc/sudo.conf \
  && touch /usr/bin/startx /usr/bin/startWithBash \
  && chmod +x /usr/bin/startx /usr/bin/startWithBash \
  && echo "(sudo sysctl fs.inotify.max_user_watches=524288 fs.inotify.max_user_instances=524288 net.core.somaxconn=524288 fscache.object_max_active=524288 || echo failed) && (sudo sysctl -p || echo failed) && (sudo chown ${USER}:${USER} /home/${USER}/tmpfs)" >> /usr/bin/startx \
  && echo "bash /usr/bin/startx" >> /usr/bin/startWithBash && chmod +x /usr/bin/startWithBash  \
  # && curl --silent --location https://deb.nodesource.com/setup_18.x | bash - \
  # && apt-get update \
  # && apt-get install --no-install-recommends -y nodejs build-essential \
  #   && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 
