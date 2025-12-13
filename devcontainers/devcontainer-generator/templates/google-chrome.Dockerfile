FROM devimage

### chromium.Dockerfile
USER 0

# Update the package list
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    # Try installing Google Chrome
    (wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb) || \
    # If that fails, try installing Chromium
    (apt-get install -y chromium || \
    echo "This architecture is not supported for Google Chrome or Chromium.") && \
    # Clean up
    apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /google-chrome-stable_current_amd64.deb

# Set environment variables
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0

USER ${USER}
