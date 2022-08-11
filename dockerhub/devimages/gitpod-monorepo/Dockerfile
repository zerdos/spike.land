# syntax=docker/dockerfile:1.4.1

FROM node:18 as helper
WORKDIR /app
RUN git clone --depth 1 --recurse-submodules --shallow-submodules https://github.com/zerdos/spike.land.git



FROM devimages/gitpod

COPY --link --chown=gitpod:gitpod --from=devimages/monorepo-modules /home/node /home/gitpod

USER gitpod
WORKDIR /workspace/monorepo
COPY --chown=gitpod:gitpod --from=helper --link /app/spike.land/  /workspace/monorepo
RUN yarn

