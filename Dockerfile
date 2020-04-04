FROM node:alpine

WORKDIR /projects

COPY yarn.lock package.json ./
RUN yarn --frozen-lockfile

RUN apk add git

COPY .git ./.git
RUN git reset --hard HEAD 
RUN yarn --frozen-lockfile