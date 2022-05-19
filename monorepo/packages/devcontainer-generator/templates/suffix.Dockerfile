FROM devimage

### suffix.Dockerfie



COPY zerdos/. /home/${USER}

CMD /usr/bin/startWithBash