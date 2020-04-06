FROM devimages/focal-devcontainer

USER 0

RUN addgroup --gid 33333 gitpod  \
  && adduser --uid 33333 --disabled-password --gecos "" --force-badname --shell /usr/bin/zsh --ingroup gitpod gitpod \
  && adduser gitpod sudo \
  && chown gitpod:gitpod -R /home/gitpod 
                    
USER gitpod
ENV HOME="/home/gitpod"
WORKDIR /home/gitpod

ENV SHELL=/usr/bin/zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && sed -i -e 's/plugins=(git)/plugins=(git gitfast git-extras npm yarn)/g' .zshrc 

