FROM devimage

### xfce.Dockerfile

USER 0
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        xfce4 \
        xfce4-session \
        nano \
        terminator \
        gpg-agent \
    xfce4-goodies xfce4-helpers  aspell-doc spellutils gvfs hunspell \
    libenchant-2-voikko  libvisual-0.4-plugins file fancontrol i2c-tools heif-gdk-pixbuf \
    libavif-gdk-pixbuf webp-pixbuf-loader tumbler-plugins-extra \
    arj cpio lhasa  lrzip lzip lzop ncompress pbzip2 pigz plzip \
    unar zip zstd gigolo parole xfce4-indicator-plugin xfce4-mpc-plugin \
     xsensors mugshot \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

USER ${USER}