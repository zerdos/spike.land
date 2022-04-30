import {
  require_debounce,
  require_isObject
} from "./chunk-WNTDPOE4.mjs";
import {
  __commonJS,
  init_react_shim
} from "./chunk-D7XGJMVH.mjs";

// ../../node_modules/lodash/throttle.js
var require_throttle = __commonJS({
  "../../node_modules/lodash/throttle.js"(exports, module) {
    init_react_shim();
    var debounce = require_debounce();
    var isObject = require_isObject();
    var FUNC_ERROR_TEXT = "Expected a function";
    function throttle(func, wait, options) {
      var leading = true, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
      });
    }
    module.exports = throttle;
  }
});
export default require_throttle();
