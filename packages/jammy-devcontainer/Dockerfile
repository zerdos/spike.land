# syntax=docker/dockerfile:1.4.1

FROM node:alpine as node-builder
ADD https://raw.githubusercontent.com/yarnpkg/berry/master/packages/yarnpkg-cli/bin/yarn.js /usr/local/bin/yarn

RUN chmod 755 /usr/local/bin/yarn && apk add --no-cache git unzip

RUN cd && mkdir cy && cd cy && yarn init  && yarn add --dev cypress --mode=skip-build && yarn run cypress install --force

FROM ubuntu:jammy as devimage

### base.Dockerfile
### Generator: https://github.com/zerdos/spike.land/tree/main/dockerhub/devimages

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

RUN (addgroup --gid 1000 ${USER}  \
  && adduser --uid 1000 --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup ${USER} ${USER}  || echo user_exist) \
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



COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
                                                    

RUN node --version
RUN chmod 755 /usr/local/bin/yarn &&   yarn --version

# RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
#   && case "${dpkgArch##*-}" in \
#     amd64) ARCH='x64';; \
#     ppc64el) ARCH='ppc64le';; \
#     s390x) ARCH='s390x';; \
#     arm64) ARCH='arm64';; \
#     armhf) ARCH='armv7l';; \
#     i386) ARCH='x86';; \
#     *) echo "unsupported architecture"; exit 1 ;; \
#   esac \
#   # gpg keys listed at https://github.com/nodejs/node#release-keys
#   && set -ex \
#   && for key in \
#     4ED778F539E3634C779C87C6D7062848A1AB005C \
#     141F07595B7B3FFE74309A937405533BE57C7D57 \
#     94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
#     74F12602B6F1C4E913FAA37AD3A89613643B6201 \
#     71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
#     8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
#     C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
#     C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C \
#     DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
#     A48C2BEE680E841632CD4E44F07496B3EB3C1762 \
#     108F52B48DB57BB0CC439B2997B01419BD92F80A \
#     B9E2F5981AA6E0CD28160D9FF13993A75599653C \
#   ; do \
#       gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "$key" || \
#       gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key" ; \
#   done \
#   && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
#   && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
#   && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
#   && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
#   && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
#   && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
#   && ln -s /usr/local/bin/node /usr/local/bin/nodejs \
#   # smoke tests
#   && node --version \
#   # && npm i -g npm \
#   && npm --version  \
#   && npm i -g npm yarn
### dotnet.Dockerfile

ENV \
    # Unset ASPNETCORE_URLS from aspnet base image
    ASPNETCORE_URLS= \
    # Do not generate certificate
    DOTNET_GENERATE_ASPNET_CERTIFICATE=false \
    # Do not show first run text
    DOTNET_NOLOGO=true \
    # SDK version
    DOTNET_SDK_VERSION=6.0.400 \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # PowerShell telemetry for docker image usage
    POWERSHELL_DISTRIBUTION_CHANNEL=PSDocker-DotnetSDK-Ubuntu-22.04 





ENV DOTNET_SDK_VERSION="6.0.400-1"

COPY --link --from=mcr.microsoft.com/dotnet/sdk:6.0-jammy  /usr/share/dotnet /usr/share/dotnet
# COPY --link --from=mcr.microsoft.com/dotnet/sdk:6.0-jammy  /usr/share/powershell /usr/share/powershell


RUN  ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet 

# # Install PowerShell global tool
# RUN powershell_version=7.2.3 \
#     && curl -fSL --output PowerShell.Linux.x64.$powershell_version.nupkg https://pwshtool.blob.core.windows.net/tool/$powershell_version/PowerShell.Linux.x64.$powershell_version.nupkg \
#     && powershell_sha512='acc4ff549b13a04cdcfbdb80830b1ad400ad3f99c54d8863a20150cd623e923b01ffee321adf6ff2e24ecf84cd10b77ebb9d563b715fcb78fca687dffa6e16ab' \
#     && echo "$powershell_sha512  PowerShell.Linux.x64.$powershell_version.nupkg" | sha512sum -c - \
#     && mkdir -p /usr/share/powershell \
#     && dotnet tool install --add-source / --tool-path /usr/share/powershell --version $powershell_version PowerShell.Linux.x64 \
#     && dotnet nuget locals all --clear \
#     && rm PowerShell.Linux.x64.$powershell_version.nupkg \
#     && ln -s /usr/share/powershell/pwsh /usr/bin/pwsh \
#     && chmod 755 /usr/share/powershell/pwsh \
#     # To reduce image size, remove the copy nupkg that nuget keeps.
#     && find /usr/share/powershell -print | grep -i '.*[.]nupkg$' | xargs rm



COPY --link --from=node-builder  /root/.cache/Cypress /home/${USER}/.cache/Cypress
RUN chown -R ${USER}:${USER} /home/${USER}/.cache
### noVNC.Dockerfile

RUN  git clone https://github.com/novnc/noVNC.git  --depth=1 \
  && cp -af ./noVNC/.  /usr/share/novnc/ \
  && rm -rf ./noVNC \
  && cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
  && (sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
  && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session) \
  || ( sed -i -e '1 aautocutsel -fork' /etc/X11/Xtigervnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xtigervnc-session \
  && sed -i -e '1 aterminator &' /etc/X11/Xtigervnc-session ) \
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && echo "((chmod 644 ~/.ssh/*.pub && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.gitconfig) || true ) && (vncserver -SecurityTypes none -cleanstale -useold :1 -localhost no --I-KNOW-THIS-IS-INSECURE && websockify --web=/usr/share/novnc/ --wrap-mode=ignore 6080 localhost:5901 || echo ok)" >> /usr/bin/startx

### xfce.Dockerfile

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
       nano \
        terminator \
        gpg-agent \
        # xfce4-goodies \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 

    
### chromium.Dockerfile
RUN  (curl -sSL  https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y --no-install-recommends \  
    ## firefox 
    google-chrome-stable ) \
    ||  (apt-get install -y chromium ||  echo "this arch is not supported") \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 
  
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0
### vscode.Dockerfile
RUN  (curl -sSL https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" >> /etc/apt/sources.list.d/vscode.list \
    && apt-get update && apt-get install -y  code libxtst6 openssh-server \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* ) || echo "this arch is not supported" 
#   && sed -i -e 's/\/usr\/bin\/code/\/usr\/share\/code\/code --user-data-dir /g' /usr/share/applications/code.desktop 
### zsh.Dockerfie

USER 0
RUN chown ${USER}:${USER} -R /home/${USER}
USER ${USER}

WORKDIR /home/${USER}
RUN cd && rm -rf /home/${USER}/.oh-my-zsh && sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.3/zsh-in-docker.sh)" -- \
-t robbyrussell \
-p git \
-p gitfast \
-p git-extras \
-p yarn \
-a 'CASE_SENSITIVE="true"' \
 && touch  ~/.bashrc && echo ":)" >  ~/.mood

ENV SHELL=/usr/bin/zsh
### deno.Dockerfile

USER ${USER}
RUN (curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.29.2 \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${HOME}/.zshrc \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.zshrc) || echo no-deno

USER 0
RUN (ln /home/${USER}/.deno/bin/deno /usr/bin) || echo no-deno

USER ${USER}

  
### suffix.Dockerfie



CMD /usr/bin/startWithBash