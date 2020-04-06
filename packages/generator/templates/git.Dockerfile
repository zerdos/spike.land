FROM devimage

### git.Dockerfile

RUN apt-get update && \ 
    apt-get install --no-install-recommends -y \ 
    make \
    libssl-dev \
    libghc-zlib-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
    gpg \
&& curl -Lo /usr/src/git.tar.gz  https://github.com/git/git/archive/v{GIT_VERSION}.tar.gz \
&& tar -C /usr/src/ -xf /usr/src/git.tar.gz && cd /usr/src/git-* \
&& make prefix=/usr/local all \
&& make prefix=/usr/local install \
&& apt-get remove -y \
    libssl-dev \
    libghc-zlib-dev \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    gettext \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /tmp/* /var/lib/apt/lists/* /usr/src/*