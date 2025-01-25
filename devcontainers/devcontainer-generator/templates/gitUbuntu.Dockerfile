FROM devimage
### git for Ubuntu

RUN add-apt-repository ppa:git-core/ppa && apt-get update \
&& apt-get install --no-install-recommends -y \
    git \
&& apt-get autoremove -y \
&& apt-get clean -y \
&& rm -rf /var/lib/apt/lists/* 
