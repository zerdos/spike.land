FROM devimage

### zsh.Dockerfie

USER ${USER}


ENV SHELL=/usr/bin/zsh
RUN  cd && rm -rf /home/${USER}/.oh-my-zsh && sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
-t robbyrussell \
-p git \
-p gitfast \
-p git-extras \
-p yarn \
-a 'CASE_SENSITIVE="true"' \
 && touch  ~/.bashrc && echo ":)" >  ~/.mood
