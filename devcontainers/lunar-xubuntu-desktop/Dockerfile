FROM devimages/lunar-devcontainer:latest

USER 0
RUN apt update && apt dist-upgrade --yes && apt install lightdm --yes && apt install xubuntu-desktop --yes
RUN echo "allowed_users=anybody"  >> /etc/X11/Xwrapper.config
USER ${USER}