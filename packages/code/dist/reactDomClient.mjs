import {
  require_react_dom
} from "./chunk-chunk-LFFDIMG7.mjs";
import {
  __commonJS,
  __toESM,
  init_define_process
} from "./chunk-chunk-ZKWO2POS.mjs";

// ../../.yarn/__virtual__/react-dom-virtual-fbce32c2b9/0/global/cache/react-dom-npm-18.2.0-dd675bca1c-9.zip/node_modules/react-dom/client.js
var require_client = __commonJS({
  "../../.yarn/__virtual__/react-dom-virtual-fbce32c2b9/0/global/cache/react-dom-npm-18.2.0-dd675bca1c-9.zip/node_modules/react-dom/client.js"(exports) {
    "use strict";
    init_define_process();
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});

// js/reactDomClient.ts
init_define_process();
var import_client = __toESM(require_client(), 1);
var { createRoot, hydrateRoot } = import_client.default;
var reactDomClient_default = import_client.default;
export {
  createRoot,
  reactDomClient_default as default,
  hydrateRoot
};
