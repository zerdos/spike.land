FROM node as workspace-cache
WORKDIR /workspace
RUN git clone https://github.com/spike-land/monorepo.git
RUN cd monorepo && yarn 

FROM devimages/groovy-devcontainer:latest

USER 0

RUN wget https://raw.githubusercontent.com/gitpod-io/workspace-images/master/base/install-packages && mv install-packages /usr/bin && chmod +x /usr/bin/install-packages

ARG DEBIAN_FRONTEND=noninteractive

RUN yes | unminimize \
    && install-packages \
        zip \
        unzip \
        bash-completion \
        build-essential \
        ninja-build \
        htop \
        jq \
        less \
        locales \
        man-db \
        nano \
        ripgrep \
        software-properties-common \
        sudo \
        time \
        emacs-nox \
        vim \
        multitail \
        lsof \
        ssl-cert \
        fish \
        zsh \
    && locale-gen en_US.UTF-8

ENV LANG=en_US.UTF-8

### Git ###
RUN add-apt-repository -y ppa:git-core/ppa \
    && install-packages git git-lfs

### Gitpod user ###
# '-l': see https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
RUN userdel gitpod && rm -rf /home/gitpod
RUN useradd -l -u 33333 -G sudo -md /home/gitpod -s /bin/bash -p gitpod gitpod \
    # passwordless sudo for users in the 'sudo' group
    && sed -i.bkp -e 's/%sudo\s\+ALL=(ALL\(:ALL\)\?)\s\+ALL/%sudo ALL=NOPASSWD:ALL/g' /etc/sudoers
ENV HOME=/home/gitpod
WORKDIR $HOME
# custom Bash prompt
RUN { echo && echo "PS1='\[\033[01;32m\]\u\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\]\$(__git_ps1 \" (%s)\") $ '" ; } >> .bashrc

RUN   git clone https://github.com/novnc/noVNC.git  --depth=1 \
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
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults 
### Gitpod user (2) ###
USER gitpod
# use sudo so that user does not get sudo usage info on (the first) login
RUN sudo echo "Running 'sudo' for Gitpod: succUess" && \
    # create .bashrc.d folder and source it in the bashrc
    mkdir -p /home/gitpod/.bashrc.d && \
    (echo; echo "for i in \$(ls -A \$HOME/.bashrc.d/); do source \$HOME/.bashrc.d/\$i; done"; echo) >> /home/gitpod/.bashr

# configure git-lfs
RUN sudo git lfs install --system

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g'  ~/.zshrc \
    && curl -fsSL https://deno.land/x/install/install.sh | sh \
    && touch  ~/.bashrc  \ 
    && echo "export DENO_INSTALL=\"/home/gitpod/.deno\"" >> ~/.zshrc  \
    && echo "export DENO_INSTALL=\"/home/gitpod/.deno\"" >> ~/.bashrc \
    && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\""  >>  ~/.zshrc \
    && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >>  ~/.bashrc \
    && echo ":)" >  ~/.mood

COPY --chown=gitpod:gitpod --from=workspace-cache /workspace_cache /workspace-cache