FROM devimage

### zsh.Dockerfie

RUN apt-get update && apt-get install -y --no-install-recommends zsh \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && chsh -s /usr/bin/zsh ${USER}


USER ${USER}

ENV SHELL=/usr/bin/zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g'  ~/.zshrc \
    && touch  ~/.bashrc && echo ":)" >  ~/.mood