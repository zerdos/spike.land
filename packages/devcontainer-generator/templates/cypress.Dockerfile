FROM devimage


COPY --link --from=cy-builder  /home/node/cy /home/node/cy
