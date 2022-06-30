FROM node

WORKDIR /workspace
RUN chown node:node /workspace

USER node

RUN git clone https://github.com/zerdos/spike.land.git
RUN cd monorepo && yarn 