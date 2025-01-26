
FROM devimage


# COPY --link --from=node-builder  /root/.cache/Cypress ${HOME}/.cache/Cypress
# RUN chown -R ${USER}:${USER} ${HOME}/.cache