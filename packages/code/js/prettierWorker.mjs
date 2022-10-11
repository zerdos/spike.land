import * as Comlink from "comlink"


onconnect = function (event) {
    const port = event.ports[0];
  
    Comlink.expose(prettier, port);
  };
  



