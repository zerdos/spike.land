FROM devimage

## cypress.Dockerfile
ENV  QT_X11_NO_MITSHM=1 \
  _X11_NO_MITSHM=1 \
  _MITSHM=0 

RUN apt-get update \
&& apt-get install --no-install-recommends -y \
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
  curl  \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* 


USER ${USER}

WORKDIR /home/${USER}

RUN mkdir cy && cd cy && yarn init &&  yarn add cypress@{CYPRESS_VERSION} --mode=skip-build && yarn cypress install && yarn cypress verify

USER 0