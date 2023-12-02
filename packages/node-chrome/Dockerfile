FROM --platform=amd64 debian:bookworm
ENV NODE_MAJOR=20

RUN  apt-get update && apt-get install -y ca-certificates curl gnupg wget &&  mkdir -p /etc/apt/keyrings && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key |  gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
	&& apt-get update && apt-get install -y  nodejs && apt-get dist-upgrade -y \
    && apt-get install -y  ./google-chrome-stable_current_amd64.deb \
    && rm ./google-chrome-stable_current_amd64.deb \
    && apt-get autoremove -y \
    && apt-get clean -y \
	&& rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
    && sed -i 's/"$HERE\/chrome"/"$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome \
    && npm install -g yarn loki concurrently node-fetch-cache
