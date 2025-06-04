FROM devimage


COPY --from=node:lts-bullseye-slim --link /usr/local/bin/node /usr/local/bin/node
COPY --from=node:lts-bullseye-slim --link /usr/local/lib/node_modules /usr/local/lib/node_modules

COPY --from=node-builder --link /usr/local/bin/yarn /usr/local/bin/yarn
                                                
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node:lts-bullseye-slim --link /usr/local/bin/npx /usr/local/bin/npx


RUN node --version
RUN chmod 755 /usr/local/bin/yarn &&  yarn --version
