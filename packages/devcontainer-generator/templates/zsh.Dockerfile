FROM devimage

### zsh.Dockerfie

USER ${USER}
RUN cd && wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh \
    && chmod +x ./install.sh &&  ./install.sh && rm -rf install.sh \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g'  ~/.zshrc \
    && touch  ~/.bashrc && echo ":)" >  ~/.mood

ENV SHELL=/usr/bin/zsh
