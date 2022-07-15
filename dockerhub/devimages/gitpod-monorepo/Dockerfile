# syntax=docker/dockerfile:1.4.1
FROM node:18 as helper
WORKDIR /app
RUN git clone --depth 1 --recurse-submodules --shallow-submodules https://github.com/zerdos/spike.land.git




FROM devimages/gitpod

COPY --link --chown=gitpod:gitpod --from=devimages/monorepo-modules:latest /home/node/.cache/yarn/. /home/gitpod/.cache/yarn/

USER gitpod
WORKDIR /workspace/monorepo
COPY --chown=gitpod:gitpod --from=helper /app/spike.land/.  .
RUN yarn

