FROM devimage

# docker.Dockerfile
RUN ARCH= && dpkgArch="$(dpkg --print-architecture)" \
  && case "${dpkgArch##*-}" in \
    amd64) ARCH='amd64';; \
    ppc64el) ARCH='ppc64le';; \
    s390x) ARCH='s390x';; \
    arm64) ARCH='arm64';; \
    armhf) ARCH='armv7l';; \
    i386) ARCH='x86';; \
    *) echo "unsupported architecture"; exit 1 ;; \
  esac \
  # gpg keys listed at https://github.com/nodejs/node#release-keys
  && set -ex \
   && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && add-apt-repository \
         "deb [arch=$ARCH] https://download.docker.com/linux/ubuntu groovy stable" \
       && apt-get install --no-install-recommends -y \
        docker-ce \
        docker-ce-cli \
    && curl -L  \
        https://github.com/docker/compose/releases/download/v2.0.1/docker-compose-`uname -s`-`uname -m` \
        -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose \
    && usermod -G docker -a ${USER} \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* 

ENV COMPOSE_DOCKER_CLI_BUILD=1
ENV DOCKER_BUILDKIT=1