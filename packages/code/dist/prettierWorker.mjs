import {
  expose
} from "./chunk-chunk-YJRWAMRK.mjs";
import {
  init_define_process
} from "./chunk-chunk-QTIR5YHF.mjs";
import "./chunk-chunk-477FBAEY.mjs";

// js/prettierWorker.mjs
init_define_process();
onconnect = function(event) {
  const port = event.ports[0];
  expose(prettier, port);
};
