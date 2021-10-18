FROM devimage

### deno.Dockerfile

USER 0
RUN apt-get update && apt-get install -y --no-install-recommends unzip \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 

USER ${USER}

RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v{DENO_VERSION} \
  echo "export DENO_INSTALL="\${HOME}/.deno\"" >> ${HOME}/.zshrc \
  echo "export PATH=\"\$DENO_INSTALL/bin:\$PATH\"" >> ${HOME}/.zshrc
  