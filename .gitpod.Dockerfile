
ARG USER=gitpod
ARG DEVCONTAINER=devimages/groovy-devcontainer:6.7.4
FROM ${DEVCONTAINER}

WORKDIR /workspace/monorepo
                                        
COPY yarn.lock package.json ./
RUN sudo chown -R $USER:$USER . && yarn --frozen-lockfile

COPY .git ./.git

RUN sudo chown -R $USER:$USER .git && git reset --hard HEAD 
RUN yarn --frozen-lockfile
