ARG DISTRO=eoan
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
  && echo "bash /usr/bin/startx" >> /usr/bin/startWithBash && chmod +x /usr/bin/startWithBash 
### xpra.Dockerfile

ENV XPRADISTRO=eoan

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl gnupg2 \
    && curl https://xpra.org/gpg.asc | apt-key add - \
    && curl https://xpra.org/repos/eoan/xpra.list > /etc/apt/sources.list.d/xpra.list \
    # && curl https://xpra.org/repos/eoan/xpra-beta.list >> /etc/apt/sources.list.d/xpra.list \
    && apt-get update \ 
    && apt-get install -y \
        xpra xpra-html5 x264 terminator python3 python-paramiko python-pyinotify python-xdg dbus dbus-x11 xterm menu \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 
RUN echo "xpra start --start=xterm --html=on --bind-tcp=0.0.0.0:14500 --daemon=no --encoding=x264" > /usr/bin/startx

### suffix.Dockerfie


CMD /usr/bin/startWithBash