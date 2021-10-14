FROM devimage

### chromium.Dockerfile
RUN  add-apt-repository  https://github.com/saiarcot895/chromium-ubuntu-build. \
    && apt-get update && apt-get install  -y --no-install-recommends chromium-browser \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* 

