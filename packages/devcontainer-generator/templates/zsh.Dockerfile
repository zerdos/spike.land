FROM devimage

### zsh.Dockerfie


RUN mkdir -p /workspace/node_modules && chown  ${USER}:${USER} /workspace  /workspace/node_modules
USER ${USER}

ENV SHELL=/usr/bin/zsh
RUN cd && wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh \
    && sh install.sh && rm -rf install.sh \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g'  ~/.zshrc \
    && touch  ~/.bashrc && echo ":)" >  ~/.mood