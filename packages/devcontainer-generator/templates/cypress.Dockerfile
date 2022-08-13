FROM devimage


COPY --link --from=node-builder  /home/node/cy /home/node/cy
