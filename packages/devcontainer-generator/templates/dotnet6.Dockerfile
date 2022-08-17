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





ENV DOTNET_SDK_VERSION="6.0.400-1"

COPY --link --from=mcr.microsoft.com/dotnet/sdk:6.0-jammy  /usr/share/dotnet /usr/share/dotnet
# COPY --link --from=mcr.microsoft.com/dotnet/sdk:6.0-jammy  /usr/share/powershell /usr/share/powershell


RUN  ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet 

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
