FROM devimage

COPY --link --from=node-builder /root/.cache/Cypress /root/.cache/Cypress
