# syntax=docker/dockerfile:1.4.1

FROM node:18 as helper
WORKDIR /app
RUN git clone --depth 1 --recurse-submodules --shallow-submodules https://github.com/zerdos/spike.land.git



FROM devimages/gitpod

USER gitpod
WORKDIR /workspace/monorepo
COPY --chown=gitpod:gitpod --from=helper /app/spike.land/  /workspace/monorepo
RUN yarn

