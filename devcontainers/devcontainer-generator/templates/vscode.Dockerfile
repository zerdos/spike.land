FROM devimage

### vscode.Dockerfile

RUN  (mkdir -p /etc/apt/keyrings && \
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg && \
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" | \
tee /etc/apt/sources.list.d/vscode.list) && \
apt-get update && \
apt-get install -y code libxtst6 openssh-server && \
apt-get autoremove -y && \
apt-get clean -y && \
rm -rf /var/lib/apt/lists/* || echo "this arch is not supported"
#   && sed -i -e 's/\/usr\/bin\/code/\/usr\/share\/code\/code --user-data-dir /g' /usr/share/applications/code.desktop 