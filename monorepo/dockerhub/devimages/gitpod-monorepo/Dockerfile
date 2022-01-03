FROM devimages/gitpod

COPY --chown=gitpod:gitpod --from=devimages/monorepo-modules:latest /home/node/.cache/yarn/. /home/gitpod/.cache/yarn/
COPY --chown=gitpod:gitpod --from=devimages/monorepo-modules:latest /workspace/monorepo/. /home/gitpod/monorepo/

