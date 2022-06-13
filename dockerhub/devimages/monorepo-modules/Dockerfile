FROM node

WORKDIR /workspace
RUN chown node:node /workspace

USER node

RUN git clone https://github.com/spike-land/monorepo.git
RUN cd monorepo && yarn 