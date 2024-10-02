FROM devimage

### xfce.Dockerfile

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
        xfce4-session \
        nano \
        terminator \
        gpg-agent \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

