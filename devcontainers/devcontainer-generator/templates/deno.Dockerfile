FROM devimage

### deno.Dockerfile

USER ${USER}
RUN (curl -fsSL https://deno.land/x/install/install.sh | sh -s v{DENO_VERSION} \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> /home/${USER}/.zshrc \
  && echo "export DENO_INSTALL=\"\${HOME}/.deno\"" >> /home/${USER}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> /home/${USER}/.bashrc \
  && echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> /home/${USER}/.zshrc) || echo no-deno

USER 0
RUN (ln /home/${USER}/.deno/bin/deno /usr/bin) || echo no-deno

USER ${USER}
