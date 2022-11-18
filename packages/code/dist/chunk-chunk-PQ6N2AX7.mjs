import {
  require_react_dom
} from "./chunk-chunk-7UW6FRGF.mjs";
import {
  __commonJS,
  init_define_process
} from "./chunk-chunk-CIPP7HWN.mjs";

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

export {
  require_client
};
