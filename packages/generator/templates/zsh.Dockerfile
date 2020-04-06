FROM devimage

### zsh.Dockerfie

USER ${USER}
ENV HOME /home/${USER}
WORKDIR /home/${USER}
ENV SHELL=/usr/bin/zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g' .zshrc 
