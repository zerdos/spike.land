FROM devimage

### zsh.Dockerfile

# Switch to root user to perform the chown operation
USER 0

# Change ownership of the user's home directory and set working directory
RUN chown ${USER}:${USER} -R ${USER_HOME} || echo "Failed to chown home directory"

# Switch back to the specified user
USER ${USER}

# Set the working directory
WORKDIR ${USER_HOME}

# Install Oh My Zsh with specified plugins and theme
RUN rm -rf ${USER_HOME}/.oh-my-zsh \
    && sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.2.1/zsh-in-docker.sh)" -- \
       -t robbyrussell \
       -p git \
       -p gitfast \
       -p git-extras \
       -p yarn \
       -a 'CASE_SENSITIVE="true"' \
    && touch ~/.bashrc \
    && curl -fsSL https://claude.ai/install.sh | bash \
    && echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc \
    && echo ":)" > ~/.mood

# Set the default shell to zsh
ENV SHELL=/usr/bin/zsh
