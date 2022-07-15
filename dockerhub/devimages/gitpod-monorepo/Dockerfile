# syntax=docker/dockerfile:1.4.1
FROM devimages/gitpod

COPY --link --chown=gitpod:gitpod --from=devimages/monorepo-modules:latest /home/node/.cache/yarn/. /home/gitpod/.cache/yarn/

WORKDIR /workspace/monorepo

ADD  https://github.com/zerdos/spike.land.git .
RUN yarn

