# syntax=docker/dockerfile:1.4.1

FROM node:alpine as cy-builder
USER node
RUN cd && mkdir cy && cd cy && yarn add --dev cypress


FROM node 
USER node
COPY --link --from=cy-builder /home/node/cy /home/node/cy

