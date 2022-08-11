FROM devimage

### dotnet.Dockerfile

ENV \
    # Unset ASPNETCORE_URLS from aspnet base image
    ASPNETCORE_URLS= \
    # Do not generate certificate
    DOTNET_GENERATE_ASPNET_CERTIFICATE=false \
    # Do not show first run text
    DOTNET_NOLOGO=true \
    # SDK version
    DOTNET_SDK_VERSION={DOTNET_SDK_VERSION} \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # PowerShell telemetry for docker image usage
    POWERSHELL_DISTRIBUTION_CHANNEL=PSDocker-DotnetSDK-Ubuntu-22.04 


RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        git \
        wget \
    && rm -rf /var/lib/apt/lists/*


# Install .NET SDK
RUN (curl -fSL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='{amd_dotnet_sha512}' \
    && echo "$dotnet_sha512  dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    # Trigger firstgit  run experience by running arbitrary cmd
    && dotnet help) || ( rm -rf dotnet*  /usr/share/dotnet && curl -fSL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-arm64.tar.gz  \
    && dotnet_sha512='{arm_dotnet_sha512}' \
    && echo "$dotnet_sha512  dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    # Trigger first run experience by running arbitrary cmd
    && dotnet help)

# # Install PowerShell global tool
# RUN powershell_version=7.2.3 \
#     && curl -fSL --output PowerShell.Linux.x64.$powershell_version.nupkg https://pwshtool.blob.core.windows.net/tool/$powershell_version/PowerShell.Linux.x64.$powershell_version.nupkg \
#     && powershell_sha512='acc4ff549b13a04cdcfbdb80830b1ad400ad3f99c54d8863a20150cd623e923b01ffee321adf6ff2e24ecf84cd10b77ebb9d563b715fcb78fca687dffa6e16ab' \
#     && echo "$powershell_sha512  PowerShell.Linux.x64.$powershell_version.nupkg" | sha512sum -c - \
#     && mkdir -p /usr/share/powershell \
#     && dotnet tool install --add-source / --tool-path /usr/share/powershell --version $powershell_version PowerShell.Linux.x64 \
#     && dotnet nuget locals all --clear \
#     && rm PowerShell.Linux.x64.$powershell_version.nupkg \
#     && ln -s /usr/share/powershell/pwsh /usr/bin/pwsh \
#     && chmod 755 /usr/share/powershell/pwsh \
#     # To reduce image size, remove the copy nupkg that nuget keeps.
#     && find /usr/share/powershell -print | grep -i '.*[.]nupkg$' | xargs rm
