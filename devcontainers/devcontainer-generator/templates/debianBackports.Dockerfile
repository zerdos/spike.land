FROM devimage

## debianBackports.Dockerfile
RUN echo 'deb http://deb.debian.org/debian {DISTRO}-backports main' > /etc/apt/sources.list.d/backports.list \
    && apt-get update \
	&& apt-get -t {DISTRO}-backports install git -y \
	&& apt-get autoremove -y \
	&& apt-get clean -y \
	&& rm -rf /var/lib/apt/lists/*
	