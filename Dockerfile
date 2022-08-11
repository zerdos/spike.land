# syntax=docker/dockerfile:1.4.1

FROM node as node-builder

WORKDIR /home/node

RUN mkdir node && cd node && yarn add node@16.16.0

FROM ubuntu:jammy as nubuntu
VOLUME [ "/app" ]
COPY --from=node-builder /home/node/node/node_modules/node/bin/node /usr/local/bin/node
COPY .yarn/releases/yarn-3.2.2.cjs /usr/local/bin/yarn

FROM nubuntu as cache
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml  /app/
COPY .yarn/plugins/. /app/.yarn/plugins/
COPY .yarn/releases/. /app/.yarn/releases/

COPY packages/code/package.json /app/packages/code/
COPY sites/spike.land/package.json /app/sites/spike.land/

WORKDIR /app

RUN yarn install --mode=skip-build

FROM nubuntu as devcontainer

# FROM /app
# COPY --link /app /app
WORKDIR /app
VOLUME [ "/app" ]
COPY --from=cache --link /app /app
COPY . .

RUN yarn install  --mode=skip-build 
RUN yarn re:build
