
FROM devimage


COPY --link --from=node-builder  /root/.cache/Cypress /home/${USER}/.cache/Cypress
RUN chown -R ${USER}:${USER} /home/${USER}/.cache