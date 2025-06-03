FROM devimage

### deno.Dockerfile

USER ${USER}
RUN (curl -fsSL https://deno.land/x/install/install.sh | sh -s v{DENO_VERSION} \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${USER_HOME}/.zshrc \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> ${USER_HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${USER_HOME}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${USER_HOME}/.zshrc) || echo no-deno

USER 0
RUN (ln ${USER_HOME}/.deno/bin/deno /usr/bin) || echo no-deno

USER ${USER}
