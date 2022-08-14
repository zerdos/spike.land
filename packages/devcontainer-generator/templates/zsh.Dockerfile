FROM devimage

### zsh.Dockerfie

USER ${USER}

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
-p git \
-p gitfast \
-p git-extras \
-p yarn \
-p ssh-agent \
-a 'CASE_SENSITIVE="true"' \
 && touch  ~/.bashrc && echo ":)" >  ~/.mood

ENV SHELL=/usr/bin/zsh
