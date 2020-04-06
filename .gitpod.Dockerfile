FROM devimages/focal-devcontainer

USER 0

RUN addgroup --gid 33333 gitpod  \
  && adduser --uid 33333 --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup 33333 33333 \
  && adduser 33333 sudo \
  && chown 33333:33333 -R /home/gitpod \
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers 
                    
USER gitpod


ENV SHELL=/usr/bin/zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g' .zshrc 

