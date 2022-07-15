FROM devimages/gitpod

COPY --chown=gitpod:gitpod --from=devimages/monorepo-modules:latest /home/node/.cache/yarn/. /home/gitpod/.cache/yarn/

WORKDIR /workspace/monorepo

ADD https://github.com/zerdos/spike.land.git .
RUN yarn

