import {
  __toESM,
  init_chunk_chunk_EFO53JI7,
  init_chunk_chunk_GBRFGZQ7,
  init_define_process as init_define_process2,
  require_client,
  require_react_dom
} from "./chunk-chunk-OWE3IVJZ.mjs";
import {
  init_define_process
} from "./chunk-chunk-4FHARZBR.mjs";

// dist/reactDom.mjs
init_define_process();
init_chunk_chunk_GBRFGZQ7();
init_define_process2();
var import_react_dom = __toESM(require_react_dom(), 1);
var {
  createPortal,
  flushSync,
  render,
  findDOMNode,
  hydrate,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
  version
} = import_react_dom.default;
var reactDom_default = import_react_dom.default;

// dist/reactDomClient.mjs
init_define_process();
init_chunk_chunk_EFO53JI7();
init_chunk_chunk_GBRFGZQ7();
init_define_process2();
var import_client = __toESM(require_client(), 1);
var { createRoot, hydrateRoot } = import_client.default;
var reactDomClient_default = import_client.default;

export {
  createPortal,
  flushSync,
  reactDom_default,
  createRoot,
  hydrateRoot
};
