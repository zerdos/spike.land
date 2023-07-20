FROM openjdk:22-bookworm

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
	&& apt-get install -y nodejs ./google-chrome-stable_current_amd64.deb \
    && rm ./google-chrome-stable_current_amd64.deb \
    && apt-get autoremove -y \
    && apt-get clean -y \
	&& rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
    && sed -i 's/"$HERE\/chrome"/"$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome
