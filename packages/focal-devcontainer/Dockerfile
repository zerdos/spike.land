ARG DISTRO=focal
FROM ubuntu:${DISTRO}

### base.Dockerfile
### Generator: https://github.com/zerdos/devcontainer/
LABEL maintainer=zoltan.erdos@me.com

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
  apt-transport-https \
  apt-utils \
  curl \
  dirmngr \
  g++ \
  gcc \
  cachefilesd \
  git \
  gpg \
  gpg-agent \
  htop \
  inotify-tools \
  libvips \
  locales \
  make \
  mc \
  nano \
  procps \
  psmisc \
  python3 \
  software-properties-common \
  sudo \
  tzdata \
  xz-utils \
  zsh \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 

ARG USER="developer"
ENV USER=${USER}

RUN addgroup --gid 1000 ${USER}  \
  && adduser --uid 1000 --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup ${USER} ${USER} \
  && adduser ${USER} sudo \
  && chown ${USER}:${USER} -R /home/${USER} \
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
  && echo "Set disable_coredump false" >> /etc/sudo.conf \
  && touch /usr/bin/startx /usr/bin/startWithBash \
  && chmod +x /usr/bin/startx /usr/bin/startWithBash \
  && echo "(sudo sysctl fs.inotify.max_user_watches=524288 fs.inotify.max_user_instances=524288 net.core.somaxconn=524288 fscache.object_max_active=524288 || echo failed) && (sudo sysctl -p || echo failed) && (sudo chown ${USER}:${USER} /home/${USER}/tmpfs)" >> /usr/bin/startx \
  && echo "bash /usr/bin/startx" >> /usr/bin/startWithBash && chmod +x /usr/bin/startWithBash ### git for Ubuntu

RUN add-apt-repository ppa:git-core/ppa && apt-get update \
&& apt-get install --no-install-recommends -y \
    git \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* 

ENV NODE_VERSION 14.9.0

RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='x64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  # gpg keys listed at https://github.com/nodejs/node#release-keys
  && set -ex \
  && for key in \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    77984A986EBC2AA786BC0F66B01FBB92821C587A \
    8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
    4ED778F539E3634C779C87C6D7062848A1AB005C \
    A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
    B9E2F5981AA6E0CD28160D9FF13993A75599653C \
  ; do \
    gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
    gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
    gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
  done \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
  && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
  && npm i -g yarn@1.22.5 \
  && mkdir /yarn && chown ${USER}:${USER} /yarn

ENV YARN_CACHE_FOLDER=/yarn

### noVNC.Dockerfile

RUN  apt-get update \
  && apt-get install --no-install-recommends -y \
    autocutsel \
    xfwm4 \
    libgtk-3-0 \
    xvfb \
    novnc \
    websockify \
    dbus-x11 \
    nano \
    mc \
    htop \
    procps \
    terminator \
    tigervnc-standalone-server \
    tigervnc-xorg-extension \
  &&  cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
  && sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session \
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && echo "((chmod 644 ~/.ssh/*.pub && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.gitconfig) || true ) && (vncserver -SecurityTypes none -cleanstale -useold :1 -localhost no --I-KNOW-THIS-IS-INSECURE && websockify --web=/usr/share/novnc/ --wrap-mode=ignore 6080 localhost:5901 || echo ok)" >> /usr/bin/startx

### xfce.Dockerfile

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
        gpg-agent \
        # xfce4-goodies \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 

    
### chromium.Dockerfile
RUN  curl -sSL  https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y --no-install-recommends google-chrome-stable \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

### vscode.Dockerfile
RUN  curl -sSL https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" >> /etc/apt/sources.list.d/vscode.list \
    && apt-get update && apt-get install -y code \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

# docker.Dockerfile
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && add-apt-repository \
         "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal test" \
    && apt-get install --no-install-recommends -y \
        docker-ce \
        docker-ce-cli \
    && curl -L  \
        https://github.com/docker/compose/releases/download/1.27.0-rc2/docker-compose-`uname -s`-`uname -m` \
        -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose \
    && usermod -G docker -a ${USER} \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 

ENV COMPOSE_DOCKER_CLI_BUILD=1
ENV DOCKER_BUILDKIT=1
### zsh.Dockerfie

USER ${USER}
ENV HOME /home/${USER}
WORKDIR /home/${USER}
ENV SHELL=/usr/bin/zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g' .zshrc 

### suffix.Dockerfie


CMD /usr/bin/startWithBash