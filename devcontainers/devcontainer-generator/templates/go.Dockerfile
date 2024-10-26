FROM devimage

### go.Dockerfie
RUN wget -q https://dl.google.com/go/go1.14.1.linux-amd64.tar.gz -O go.tar.gz \
    && tar -xzf go.tar.gz -C /usr/share \
    && rm -rf go.tar.gz \
    && ln -s /usr/share/go/bin/go /usr/bin/go
