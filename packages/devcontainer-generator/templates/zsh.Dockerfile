FROM devimage

### zsh.Dockerfie


RUN mkdir -p /workspace/node_modules && chown  ${USER}:${USER} /workspace  /workspace/node_modules
USER ${USER}

ENV SHELL=/usr/bin/zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g'  ~/.zshrc \
    && touch  ~/.bashrc && echo ":)" >  ~/.mood