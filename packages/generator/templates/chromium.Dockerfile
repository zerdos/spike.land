FROM devimage

### chromium.Dockerfile
RUN  add-apt-repository  https://github.com/saiarcot895/chromium-ubuntu-build. \
    && apt-get update && apt-get install  -y --no-install-recommends chromium-browser \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && mv /usr/bin/google-chrome /usr/bin/google-chrome-bin \
  && echo "/usr/bin/google-chrome-bin --no-sandbox"

