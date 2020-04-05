FROM devimages/focal-devcontainer
                                        
WORKDIR  /project
RUN sudo chown $USER:$USER /project

COPY --chown=$USER:$USER yarn.lock package.json ./
RUN yarn --frozen-lockfile

COPY --chown=$USER:$USER  .git ./.git
RUN ls -la .git
# RUN git reset --hard HEAD 
RUN yarn --frozen-lockfile