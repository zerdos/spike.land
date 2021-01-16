FROM devimage

### deno.Dockerfile
RUN  apt-get update && apt-get install -y --no-install-recommends unzip \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && curl -fsSL https://deno.land/x/install/install.sh | sh -s v{DENO_VERSION}

  