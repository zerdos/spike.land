FROM devimages/focal-devcontainer

WORKDIR $HOME/projects
                                        
COPY yarn.lock package.json ./

RUN sudo chown -R $USER:$USER . && yarn --frozen-lockfile


RUN ls -la

COPY .git ./.git

RUN sudo chown -R $USER:$USER .git && git reset --hard HEAD 
RUN yarn --frozen-lockfile