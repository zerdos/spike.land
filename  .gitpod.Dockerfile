
ARG USER=developer
ARG DEVCONTAINER=devimages/focal-devcontainer
FROM ${DEVCONTAINER}

WORKDIR $HOME/projects
RUN sh packages/zed-vision-site/scripts/debts.sh
                                        
COPY yarn.lock package.json ./
RUN sudo chown -R $USER:$USER . && yarn --frozen-lockfile

COPY .git ./.git

RUN sudo chown -R $USER:$USER .git && git reset --hard HEAD 
RUN yarn --frozen-lockfile
