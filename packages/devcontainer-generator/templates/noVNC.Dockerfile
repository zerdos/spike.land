FROM devimage

### noVNC.Dockerfile

ENV PORT=6080

RUN  git clone https://github.com/novnc/noVNC.git  --depth=1 \
  && cp -af ./noVNC/.  /usr/share/novnc/ \
  && rm -rf ./noVNC \
  && cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html \
  && (sed -i -e '1 aautocutsel -fork' /etc/X11/Xvnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xvnc-session \
  && sed -i -e '1 aterminator &' /etc/X11/Xvnc-session) \
  || ( sed -i -e '1 aautocutsel -fork' /etc/X11/Xtigervnc-session \
  && sed -i -e 's/iconic/nowin/g' /etc/X11/Xtigervnc-session \
  && sed -i -e '1 aterminator &' /etc/X11/Xtigervnc-session ) \
  && sed -i -e 's/workspace_count=4/workspace_count=1/g' /usr/share/xfwm4/defaults \
  && sed -i -e 's/use_compositing=true/use_compositing=false/g' /usr/share/xfwm4/defaults \
  && echo "((chmod 644 ~/.ssh/*.pub && chmod 600 ~/.ssh/id_rsa && chmod 600 ~/.gitconfig) || true ) && (vncserver -SecurityTypes none -cleanstale -useold :1 -localhost no --I-KNOW-THIS-IS-INSECURE && websockify --web=/usr/share/novnc/ --wrap-mode=ignore ${PORT} localhost:5901 || echo ok)" >> /usr/bin/startx
