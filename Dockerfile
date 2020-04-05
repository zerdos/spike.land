
ARG USER=developer
ARG DEVCONTAINER=devimages/focal-devcontainer
FROM ${DEVCONTAINER}

WORKDIR $HOME/projects
                                        
COPY yarn.lock package.json ./
RUN sudo chown -R $USER:$USER . && yarn --frozen-lockfile

COPY .git ./.git

RUN sudo chown -R $USER:$USER .git && git reset --hard HEAD 
RUN yarn --frozen-lockfile