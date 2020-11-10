FROM devimage

### vscode.Dockerfile
RUN  curl -sSL https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" >> /etc/apt/sources.list.d/vscode.list \
    && apt-get update && apt-get install -y --no-install-recommends code libxtst6 \
     && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/* \
  && sed -i -e 's/\/usr\/bin\/code/\/usr\/share\/code\/code --user-data-dir /g' /usr/share/applications/code.desktop 