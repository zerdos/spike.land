import {
  require_clsx,
  require_prop_types
} from "./chunk-chunk-ZZWIKWD4.mjs";
import {
  prettierJs,
  runner
} from "./chunk-chunk-IUC3ZY2Z.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-RNJNNLQS.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-NFYMKIWC.mjs";
import {
  mST,
  onSessionUpdate
} from "./chunk-chunk-MIF2TXG6.mjs";
import {
  require_react_dom
} from "./chunk-chunk-M3XF32XQ.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __commonJS,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/shims.js
var require_shims = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/shims.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.findInArray = findInArray;
    exports.isFunction = isFunction;
    exports.isNum = isNum;
    exports.int = int;
    exports.dontSetMe = dontSetMe;
    function findInArray(array, callback) {
      for (var i = 0, length = array.length; i < length; i++) {
        if (callback.apply(callback, [array[i], i, array]))
          return array[i];
      }
    }
    __name(findInArray, "findInArray");
    function isFunction(func) {
      return typeof func === "function" || Object.prototype.toString.call(func) === "[object Function]";
    }
    __name(isFunction, "isFunction");
    function isNum(num) {
      return typeof num === "number" && !isNaN(num);
    }
    __name(isNum, "isNum");
    function int(a) {
      return parseInt(a, 10);
    }
    __name(int, "int");
    function dontSetMe(props, propName, componentName) {
      if (props[propName]) {
        return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
      }
    }
    __name(dontSetMe, "dontSetMe");
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/getPrefix.js
var require_getPrefix = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/getPrefix.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getPrefix = getPrefix;
    exports.browserPrefixToKey = browserPrefixToKey;
    exports.browserPrefixToStyle = browserPrefixToStyle;
    exports.default = void 0;
    var prefixes = ["Moz", "Webkit", "O", "ms"];
    function getPrefix() {
      var _window$document, _window$document$docu;
      var prop = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      if (typeof window === "undefined")
        return "";
      var style = (_window$document = window.document) === null || _window$document === void 0 ? void 0 : (_window$document$docu = _window$document.documentElement) === null || _window$document$docu === void 0 ? void 0 : _window$document$docu.style;
      if (!style)
        return "";
      if (prop in style)
        return "";
      for (var i = 0; i < prefixes.length; i++) {
        if (browserPrefixToKey(prop, prefixes[i]) in style)
          return prefixes[i];
      }
      return "";
    }
    __name(getPrefix, "getPrefix");
    function browserPrefixToKey(prop, prefix) {
      return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
    }
    __name(browserPrefixToKey, "browserPrefixToKey");
    function browserPrefixToStyle(prop, prefix) {
      return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
    }
    __name(browserPrefixToStyle, "browserPrefixToStyle");
    function kebabToTitleCase(str) {
      var out = "";
      var shouldCapitalize = true;
      for (var i = 0; i < str.length; i++) {
        if (shouldCapitalize) {
          out += str[i].toUpperCase();
          shouldCapitalize = false;
        } else if (str[i] === "-") {
          shouldCapitalize = true;
        } else {
          out += str[i];
        }
      }
      return out;
    }
    __name(kebabToTitleCase, "kebabToTitleCase");
    var _default = getPrefix();
    exports.default = _default;
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/domFns.js
var require_domFns = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/domFns.js"(exports) {
    "use strict";
    init_define_process();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.matchesSelector = matchesSelector;
    exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
    exports.addEvent = addEvent;
    exports.removeEvent = removeEvent;
    exports.outerHeight = outerHeight;
    exports.outerWidth = outerWidth;
    exports.innerHeight = innerHeight;
    exports.innerWidth = innerWidth;
    exports.offsetXYFromParent = offsetXYFromParent;
    exports.createCSSTransform = createCSSTransform;
    exports.createSVGTransform = createSVGTransform;
    exports.getTranslation = getTranslation;
    exports.getTouch = getTouch;
    exports.getTouchIdentifier = getTouchIdentifier;
    exports.addUserSelectStyles = addUserSelectStyles;
    exports.removeUserSelectStyles = removeUserSelectStyles;
    exports.addClassName = addClassName;
    exports.removeClassName = removeClassName;
    var _shims = require_shims();
    var _getPrefix = _interopRequireWildcard(require_getPrefix());
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = /* @__PURE__ */ __name(function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      }, "_getRequireWildcardCache"))(nodeInterop);
    }
    __name(_getRequireWildcardCache, "_getRequireWildcardCache");
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    __name(_interopRequireWildcard, "_interopRequireWildcard");
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    __name(ownKeys, "ownKeys");
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    __name(_objectSpread, "_objectSpread");
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    var matchesSelectorFunc = "";
    function matchesSelector(el, selector) {
      if (!matchesSelectorFunc) {
        matchesSelectorFunc = (0, _shims.findInArray)(["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"], function(method) {
          return (0, _shims.isFunction)(el[method]);
        });
      }
      if (!(0, _shims.isFunction)(el[matchesSelectorFunc]))
        return false;
      return el[matchesSelectorFunc](selector);
    }
    __name(matchesSelector, "matchesSelector");
    function matchesSelectorAndParentsTo(el, selector, baseNode) {
      var node = el;
      do {
        if (matchesSelector(node, selector))
          return true;
        if (node === baseNode)
          return false;
        node = node.parentNode;
      } while (node);
      return false;
    }
    __name(matchesSelectorAndParentsTo, "matchesSelectorAndParentsTo");
    function addEvent(el, event, handler, inputOptions) {
      if (!el)
        return;
      var options = _objectSpread({
        capture: true
      }, inputOptions);
      if (el.addEventListener) {
        el.addEventListener(event, handler, options);
      } else if (el.attachEvent) {
        el.attachEvent("on" + event, handler);
      } else {
        el["on" + event] = handler;
      }
    }
    __name(addEvent, "addEvent");
    function removeEvent(el, event, handler, inputOptions) {
      if (!el)
        return;
      var options = _objectSpread({
        capture: true
      }, inputOptions);
      if (el.removeEventListener) {
        el.removeEventListener(event, handler, options);
      } else if (el.detachEvent) {
        el.detachEvent("on" + event, handler);
      } else {
        el["on" + event] = null;
      }
    }
    __name(removeEvent, "removeEvent");
    function outerHeight(node) {
      var height = node.clientHeight;
      var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      height += (0, _shims.int)(computedStyle.borderTopWidth);
      height += (0, _shims.int)(computedStyle.borderBottomWidth);
      return height;
    }
    __name(outerHeight, "outerHeight");
    function outerWidth(node) {
      var width = node.clientWidth;
      var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      width += (0, _shims.int)(computedStyle.borderLeftWidth);
      width += (0, _shims.int)(computedStyle.borderRightWidth);
      return width;
    }
    __name(outerWidth, "outerWidth");
    function innerHeight(node) {
      var height = node.clientHeight;
      var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      height -= (0, _shims.int)(computedStyle.paddingTop);
      height -= (0, _shims.int)(computedStyle.paddingBottom);
      return height;
    }
    __name(innerHeight, "innerHeight");
    function innerWidth(node) {
      var width = node.clientWidth;
      var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
      width -= (0, _shims.int)(computedStyle.paddingLeft);
      width -= (0, _shims.int)(computedStyle.paddingRight);
      return width;
    }
    __name(innerWidth, "innerWidth");
    function offsetXYFromParent(evt, offsetParent, scale) {
      var isBody = offsetParent === offsetParent.ownerDocument.body;
      var offsetParentRect = isBody ? {
        left: 0,
        top: 0
      } : offsetParent.getBoundingClientRect();
      var x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
      var y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
      return {
        x,
        y
      };
    }
    __name(offsetXYFromParent, "offsetXYFromParent");
    function createCSSTransform(controlPos, positionOffset) {
      var translation = getTranslation(controlPos, positionOffset, "px");
      return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)("transform", _getPrefix.default), translation);
    }
    __name(createCSSTransform, "createCSSTransform");
    function createSVGTransform(controlPos, positionOffset) {
      var translation = getTranslation(controlPos, positionOffset, "");
      return translation;
    }
    __name(createSVGTransform, "createSVGTransform");
    function getTranslation(_ref2, positionOffset, unitSuffix) {
      var x = _ref2.x, y = _ref2.y;
      var translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");
      if (positionOffset) {
        var defaultX = "".concat(typeof positionOffset.x === "string" ? positionOffset.x : positionOffset.x + unitSuffix);
        var defaultY = "".concat(typeof positionOffset.y === "string" ? positionOffset.y : positionOffset.y + unitSuffix);
        translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
      }
      return translation;
    }
    __name(getTranslation, "getTranslation");
    function getTouch(e, identifier) {
      return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function(t) {
        return identifier === t.identifier;
      }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function(t) {
        return identifier === t.identifier;
      });
    }
    __name(getTouch, "getTouch");
    function getTouchIdentifier(e) {
      if (e.targetTouches && e.targetTouches[0])
        return e.targetTouches[0].identifier;
      if (e.changedTouches && e.changedTouches[0])
        return e.changedTouches[0].identifier;
    }
    __name(getTouchIdentifier, "getTouchIdentifier");
    function addUserSelectStyles(doc) {
      if (!doc)
        return;
      var styleEl = doc.getElementById("react-draggable-style-el");
      if (!styleEl) {
        styleEl = doc.createElement("style");
        styleEl.type = "text/css";
        styleEl.id = "react-draggable-style-el";
        styleEl.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n";
        styleEl.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n";
        doc.getElementsByTagName("head")[0].appendChild(styleEl);
      }
      if (doc.body)
        addClassName(doc.body, "react-draggable-transparent-selection");
    }
    __name(addUserSelectStyles, "addUserSelectStyles");
    function removeUserSelectStyles(doc) {
      if (!doc)
        return;
      try {
        if (doc.body)
          removeClassName(doc.body, "react-draggable-transparent-selection");
        if (doc.selection) {
          doc.selection.empty();
        } else {
          var selection = (doc.defaultView || window).getSelection();
          if (selection && selection.type !== "Caret") {
            selection.removeAllRanges();
          }
        }
      } catch (e) {
      }
    }
    __name(removeUserSelectStyles, "removeUserSelectStyles");
    function addClassName(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
          el.className += " ".concat(className);
        }
      }
    }
    __name(addClassName, "addClassName");
    function removeClassName(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), "g"), "");
      }
    }
    __name(removeClassName, "removeClassName");
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/positionFns.js
var require_positionFns = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/positionFns.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getBoundPosition = getBoundPosition;
    exports.snapToGrid = snapToGrid;
    exports.canDragX = canDragX;
    exports.canDragY = canDragY;
    exports.getControlPosition = getControlPosition;
    exports.createCoreData = createCoreData;
    exports.createDraggableData = createDraggableData;
    var _shims = require_shims();
    var _domFns = require_domFns();
    function getBoundPosition(draggable, x, y) {
      if (!draggable.props.bounds)
        return [x, y];
      var bounds = draggable.props.bounds;
      bounds = typeof bounds === "string" ? bounds : cloneBounds(bounds);
      var node = findDOMNode(draggable);
      if (typeof bounds === "string") {
        var ownerDocument = node.ownerDocument;
        var ownerWindow = ownerDocument.defaultView;
        var boundNode;
        if (bounds === "parent") {
          boundNode = node.parentNode;
        } else {
          boundNode = ownerDocument.querySelector(bounds);
        }
        if (!(boundNode instanceof ownerWindow.HTMLElement)) {
          throw new Error('Bounds selector "' + bounds + '" could not find an element.');
        }
        var boundNodeEl = boundNode;
        var nodeStyle = ownerWindow.getComputedStyle(node);
        var boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
        bounds = {
          left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
          top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
          right: (0, _domFns.innerWidth)(boundNodeEl) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
          bottom: (0, _domFns.innerHeight)(boundNodeEl) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
        };
      }
      if ((0, _shims.isNum)(bounds.right))
        x = Math.min(x, bounds.right);
      if ((0, _shims.isNum)(bounds.bottom))
        y = Math.min(y, bounds.bottom);
      if ((0, _shims.isNum)(bounds.left))
        x = Math.max(x, bounds.left);
      if ((0, _shims.isNum)(bounds.top))
        y = Math.max(y, bounds.top);
      return [x, y];
    }
    __name(getBoundPosition, "getBoundPosition");
    function snapToGrid(grid, pendingX, pendingY) {
      var x = Math.round(pendingX / grid[0]) * grid[0];
      var y = Math.round(pendingY / grid[1]) * grid[1];
      return [x, y];
    }
    __name(snapToGrid, "snapToGrid");
    function canDragX(draggable) {
      return draggable.props.axis === "both" || draggable.props.axis === "x";
    }
    __name(canDragX, "canDragX");
    function canDragY(draggable) {
      return draggable.props.axis === "both" || draggable.props.axis === "y";
    }
    __name(canDragY, "canDragY");
    function getControlPosition(e, touchIdentifier, draggableCore) {
      var touchObj = typeof touchIdentifier === "number" ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
      if (typeof touchIdentifier === "number" && !touchObj)
        return null;
      var node = findDOMNode(draggableCore);
      var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
      return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
    }
    __name(getControlPosition, "getControlPosition");
    function createCoreData(draggable, x, y) {
      var state = draggable.state;
      var isStart = !(0, _shims.isNum)(state.lastX);
      var node = findDOMNode(draggable);
      if (isStart) {
        return {
          node,
          deltaX: 0,
          deltaY: 0,
          lastX: x,
          lastY: y,
          x,
          y
        };
      } else {
        return {
          node,
          deltaX: x - state.lastX,
          deltaY: y - state.lastY,
          lastX: state.lastX,
          lastY: state.lastY,
          x,
          y
        };
      }
    }
    __name(createCoreData, "createCoreData");
    function createDraggableData(draggable, coreData) {
      var scale = draggable.props.scale;
      return {
        node: coreData.node,
        x: draggable.state.x + coreData.deltaX / scale,
        y: draggable.state.y + coreData.deltaY / scale,
        deltaX: coreData.deltaX / scale,
        deltaY: coreData.deltaY / scale,
        lastX: draggable.state.x,
        lastY: draggable.state.y
      };
    }
    __name(createDraggableData, "createDraggableData");
    function cloneBounds(bounds) {
      return {
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom
      };
    }
    __name(cloneBounds, "cloneBounds");
    function findDOMNode(draggable) {
      var node = draggable.findDOMNode();
      if (!node) {
        throw new Error("<DraggableCore>: Unmounted during event!");
      }
      return node;
    }
    __name(findDOMNode, "findDOMNode");
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/log.js
var require_log = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/utils/log.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = log;
    function log() {
      var _console;
      if (void 0)
        (_console = console).log.apply(_console, arguments);
    }
    __name(log, "log");
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/DraggableCore.js
var require_DraggableCore = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/DraggableCore.js"(exports) {
    "use strict";
    init_define_process();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var React3 = _interopRequireWildcard(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _domFns = require_domFns();
    var _positionFns = require_positionFns();
    var _shims = require_shims();
    var _log = _interopRequireDefault(require_log());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = /* @__PURE__ */ __name(function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      }, "_getRequireWildcardCache"))(nodeInterop);
    }
    __name(_getRequireWildcardCache, "_getRequireWildcardCache");
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    __name(_interopRequireWildcard, "_interopRequireWildcard");
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    __name(_slicedToArray, "_slicedToArray");
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    __name(_nonIterableRest, "_nonIterableRest");
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    __name(_unsupportedIterableToArray, "_unsupportedIterableToArray");
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    __name(_arrayLikeToArray, "_arrayLikeToArray");
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    __name(_iterableToArrayLimit, "_iterableToArrayLimit");
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    __name(_arrayWithHoles, "_arrayWithHoles");
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    __name(_classCallCheck, "_classCallCheck");
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    __name(_defineProperties, "_defineProperties");
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    __name(_createClass, "_createClass");
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    __name(_inherits, "_inherits");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return /* @__PURE__ */ __name(function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      }, "_createSuperInternal");
    }
    __name(_createSuper, "_createSuper");
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self);
    }
    __name(_possibleConstructorReturn, "_possibleConstructorReturn");
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    __name(_assertThisInitialized, "_assertThisInitialized");
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    __name(_isNativeReflectConstruct, "_isNativeReflectConstruct");
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : /* @__PURE__ */ __name(function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      }, "_getPrototypeOf");
      return _getPrototypeOf(o);
    }
    __name(_getPrototypeOf, "_getPrototypeOf");
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    var eventsFor = {
      touch: {
        start: "touchstart",
        move: "touchmove",
        stop: "touchend"
      },
      mouse: {
        start: "mousedown",
        move: "mousemove",
        stop: "mouseup"
      }
    };
    var dragEventFor = eventsFor.mouse;
    var DraggableCore = /* @__PURE__ */ function(_React$Component) {
      _inherits(DraggableCore2, _React$Component);
      var _super = _createSuper(DraggableCore2);
      function DraggableCore2() {
        var _this;
        _classCallCheck(this, DraggableCore2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "state", {
          dragging: false,
          lastX: NaN,
          lastY: NaN,
          touchIdentifier: null
        });
        _defineProperty(_assertThisInitialized(_this), "mounted", false);
        _defineProperty(_assertThisInitialized(_this), "handleDragStart", function(e) {
          _this.props.onMouseDown(e);
          if (!_this.props.allowAnyClick && typeof e.button === "number" && e.button !== 0)
            return false;
          var thisNode = _this.findDOMNode();
          if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
            throw new Error("<DraggableCore> not mounted on DragStart!");
          }
          var ownerDocument = thisNode.ownerDocument;
          if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
            return;
          }
          if (e.type === "touchstart")
            e.preventDefault();
          var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
          _this.setState({
            touchIdentifier
          });
          var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _assertThisInitialized(_this));
          if (position == null)
            return;
          var x = position.x, y = position.y;
          var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
          (0, _log.default)("DraggableCore: handleDragStart: %j", coreEvent);
          (0, _log.default)("calling", _this.props.onStart);
          var shouldUpdate = _this.props.onStart(e, coreEvent);
          if (shouldUpdate === false || _this.mounted === false)
            return;
          if (_this.props.enableUserSelectHack)
            (0, _domFns.addUserSelectStyles)(ownerDocument);
          _this.setState({
            dragging: true,
            lastX: x,
            lastY: y
          });
          (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
          (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
        });
        _defineProperty(_assertThisInitialized(_this), "handleDrag", function(e) {
          var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
          if (position == null)
            return;
          var x = position.x, y = position.y;
          if (Array.isArray(_this.props.grid)) {
            var deltaX = x - _this.state.lastX, deltaY = y - _this.state.lastY;
            var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
            var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);
            deltaX = _snapToGrid2[0];
            deltaY = _snapToGrid2[1];
            if (!deltaX && !deltaY)
              return;
            x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
          }
          var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
          (0, _log.default)("DraggableCore: handleDrag: %j", coreEvent);
          var shouldUpdate = _this.props.onDrag(e, coreEvent);
          if (shouldUpdate === false || _this.mounted === false) {
            try {
              _this.handleDragStop(new MouseEvent("mouseup"));
            } catch (err) {
              var event = document.createEvent("MouseEvents");
              event.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              _this.handleDragStop(event);
            }
            return;
          }
          _this.setState({
            lastX: x,
            lastY: y
          });
        });
        _defineProperty(_assertThisInitialized(_this), "handleDragStop", function(e) {
          if (!_this.state.dragging)
            return;
          var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _assertThisInitialized(_this));
          if (position == null)
            return;
          var x = position.x, y = position.y;
          var coreEvent = (0, _positionFns.createCoreData)(_assertThisInitialized(_this), x, y);
          var shouldContinue = _this.props.onStop(e, coreEvent);
          if (shouldContinue === false || _this.mounted === false)
            return false;
          var thisNode = _this.findDOMNode();
          if (thisNode) {
            if (_this.props.enableUserSelectHack)
              (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
          }
          (0, _log.default)("DraggableCore: handleDragStop: %j", coreEvent);
          _this.setState({
            dragging: false,
            lastX: NaN,
            lastY: NaN
          });
          if (thisNode) {
            (0, _log.default)("DraggableCore: Removing handlers");
            (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
            (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
          }
        });
        _defineProperty(_assertThisInitialized(_this), "onMouseDown", function(e) {
          dragEventFor = eventsFor.mouse;
          return _this.handleDragStart(e);
        });
        _defineProperty(_assertThisInitialized(_this), "onMouseUp", function(e) {
          dragEventFor = eventsFor.mouse;
          return _this.handleDragStop(e);
        });
        _defineProperty(_assertThisInitialized(_this), "onTouchStart", function(e) {
          dragEventFor = eventsFor.touch;
          return _this.handleDragStart(e);
        });
        _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function(e) {
          dragEventFor = eventsFor.touch;
          return _this.handleDragStop(e);
        });
        return _this;
      }
      __name(DraggableCore2, "DraggableCore");
      _createClass(DraggableCore2, [{
        key: "componentDidMount",
        value: /* @__PURE__ */ __name(function componentDidMount() {
          this.mounted = true;
          var thisNode = this.findDOMNode();
          if (thisNode) {
            (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
              passive: false
            });
          }
        }, "componentDidMount")
      }, {
        key: "componentWillUnmount",
        value: /* @__PURE__ */ __name(function componentWillUnmount() {
          this.mounted = false;
          var thisNode = this.findDOMNode();
          if (thisNode) {
            var ownerDocument = thisNode.ownerDocument;
            (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
            (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
            (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
            (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
            (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
              passive: false
            });
            if (this.props.enableUserSelectHack)
              (0, _domFns.removeUserSelectStyles)(ownerDocument);
          }
        }, "componentWillUnmount")
      }, {
        key: "findDOMNode",
        value: /* @__PURE__ */ __name(function findDOMNode() {
          var _this$props$nodeRef$c, _this$props, _this$props$nodeRef;
          return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$nodeRef = _this$props.nodeRef) === null || _this$props$nodeRef === void 0 ? void 0 : _this$props$nodeRef.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
        }, "findDOMNode")
      }, {
        key: "render",
        value: /* @__PURE__ */ __name(function render() {
          return /* @__PURE__ */ React3.cloneElement(React3.Children.only(this.props.children), {
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp,
            onTouchEnd: this.onTouchEnd
          });
        }, "render")
      }]);
      return DraggableCore2;
    }(React3.Component);
    exports.default = DraggableCore;
    _defineProperty(DraggableCore, "displayName", "DraggableCore");
    _defineProperty(DraggableCore, "propTypes", {
      allowAnyClick: _propTypes.default.bool,
      disabled: _propTypes.default.bool,
      enableUserSelectHack: _propTypes.default.bool,
      offsetParent: /* @__PURE__ */ __name(function offsetParent(props, propName) {
        if (props[propName] && props[propName].nodeType !== 1) {
          throw new Error("Draggable's offsetParent must be a DOM Node.");
        }
      }, "offsetParent"),
      grid: _propTypes.default.arrayOf(_propTypes.default.number),
      handle: _propTypes.default.string,
      cancel: _propTypes.default.string,
      nodeRef: _propTypes.default.object,
      onStart: _propTypes.default.func,
      onDrag: _propTypes.default.func,
      onStop: _propTypes.default.func,
      onMouseDown: _propTypes.default.func,
      scale: _propTypes.default.number,
      className: _shims.dontSetMe,
      style: _shims.dontSetMe,
      transform: _shims.dontSetMe
    });
    _defineProperty(DraggableCore, "defaultProps", {
      allowAnyClick: false,
      disabled: false,
      enableUserSelectHack: true,
      onStart: /* @__PURE__ */ __name(function onStart() {
      }, "onStart"),
      onDrag: /* @__PURE__ */ __name(function onDrag() {
      }, "onDrag"),
      onStop: /* @__PURE__ */ __name(function onStop() {
      }, "onStop"),
      onMouseDown: /* @__PURE__ */ __name(function onMouseDown() {
      }, "onMouseDown"),
      scale: 1
    });
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/Draggable.js
var require_Draggable = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/Draggable.js"(exports) {
    "use strict";
    init_define_process();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return typeof obj2;
        }, "_typeof");
      } else {
        _typeof = /* @__PURE__ */ __name(function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, "_typeof");
      }
      return _typeof(obj);
    }
    __name(_typeof, "_typeof");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "DraggableCore", {
      enumerable: true,
      get: /* @__PURE__ */ __name(function get() {
        return _DraggableCore.default;
      }, "get")
    });
    exports.default = void 0;
    var React3 = _interopRequireWildcard(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _reactDom = _interopRequireDefault(require_react_dom());
    var _clsx2 = _interopRequireDefault(require_clsx());
    var _domFns = require_domFns();
    var _positionFns = require_positionFns();
    var _shims = require_shims();
    var _DraggableCore = _interopRequireDefault(require_DraggableCore());
    var _log = _interopRequireDefault(require_log());
    var _excluded = ["axis", "bounds", "children", "defaultPosition", "defaultClassName", "defaultClassNameDragging", "defaultClassNameDragged", "position", "positionOffset", "scale"];
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function")
        return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = /* @__PURE__ */ __name(function _getRequireWildcardCache2(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      }, "_getRequireWildcardCache"))(nodeInterop);
    }
    __name(_getRequireWildcardCache, "_getRequireWildcardCache");
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    __name(_interopRequireWildcard, "_interopRequireWildcard");
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    __name(_extends, "_extends");
    function _objectWithoutProperties(source, excluded) {
      if (source == null)
        return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key))
            continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    __name(_objectWithoutProperties, "_objectWithoutProperties");
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    __name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    __name(ownKeys, "ownKeys");
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    __name(_objectSpread, "_objectSpread");
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    __name(_slicedToArray, "_slicedToArray");
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    __name(_nonIterableRest, "_nonIterableRest");
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    __name(_unsupportedIterableToArray, "_unsupportedIterableToArray");
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    __name(_arrayLikeToArray, "_arrayLikeToArray");
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null)
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    __name(_iterableToArrayLimit, "_iterableToArrayLimit");
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    __name(_arrayWithHoles, "_arrayWithHoles");
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    __name(_classCallCheck, "_classCallCheck");
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    __name(_defineProperties, "_defineProperties");
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    __name(_createClass, "_createClass");
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    __name(_inherits, "_inherits");
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || /* @__PURE__ */ __name(function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, "_setPrototypeOf");
      return _setPrototypeOf(o, p);
    }
    __name(_setPrototypeOf, "_setPrototypeOf");
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return /* @__PURE__ */ __name(function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      }, "_createSuperInternal");
    }
    __name(_createSuper, "_createSuper");
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return _assertThisInitialized(self);
    }
    __name(_possibleConstructorReturn, "_possibleConstructorReturn");
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    __name(_assertThisInitialized, "_assertThisInitialized");
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    __name(_isNativeReflectConstruct, "_isNativeReflectConstruct");
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : /* @__PURE__ */ __name(function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      }, "_getPrototypeOf");
      return _getPrototypeOf(o);
    }
    __name(_getPrototypeOf, "_getPrototypeOf");
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    var Draggable2 = /* @__PURE__ */ function(_React$Component) {
      _inherits(Draggable3, _React$Component);
      var _super = _createSuper(Draggable3);
      function Draggable3(props) {
        var _this;
        _classCallCheck(this, Draggable3);
        _this = _super.call(this, props);
        _defineProperty(_assertThisInitialized(_this), "onDragStart", function(e, coreData) {
          (0, _log.default)("Draggable: onDragStart: %j", coreData);
          var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData));
          if (shouldStart === false)
            return false;
          _this.setState({
            dragging: true,
            dragged: true
          });
        });
        _defineProperty(_assertThisInitialized(_this), "onDrag", function(e, coreData) {
          if (!_this.state.dragging)
            return false;
          (0, _log.default)("Draggable: onDrag: %j", coreData);
          var uiData = (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData);
          var newState = {
            x: uiData.x,
            y: uiData.y
          };
          if (_this.props.bounds) {
            var x = newState.x, y = newState.y;
            newState.x += _this.state.slackX;
            newState.y += _this.state.slackY;
            var _getBoundPosition = (0, _positionFns.getBoundPosition)(_assertThisInitialized(_this), newState.x, newState.y), _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2), newStateX = _getBoundPosition2[0], newStateY = _getBoundPosition2[1];
            newState.x = newStateX;
            newState.y = newStateY;
            newState.slackX = _this.state.slackX + (x - newState.x);
            newState.slackY = _this.state.slackY + (y - newState.y);
            uiData.x = newState.x;
            uiData.y = newState.y;
            uiData.deltaX = newState.x - _this.state.x;
            uiData.deltaY = newState.y - _this.state.y;
          }
          var shouldUpdate = _this.props.onDrag(e, uiData);
          if (shouldUpdate === false)
            return false;
          _this.setState(newState);
        });
        _defineProperty(_assertThisInitialized(_this), "onDragStop", function(e, coreData) {
          if (!_this.state.dragging)
            return false;
          var shouldContinue = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_assertThisInitialized(_this), coreData));
          if (shouldContinue === false)
            return false;
          (0, _log.default)("Draggable: onDragStop: %j", coreData);
          var newState = {
            dragging: false,
            slackX: 0,
            slackY: 0
          };
          var controlled = Boolean(_this.props.position);
          if (controlled) {
            var _this$props$position = _this.props.position, x = _this$props$position.x, y = _this$props$position.y;
            newState.x = x;
            newState.y = y;
          }
          _this.setState(newState);
        });
        _this.state = {
          dragging: false,
          dragged: false,
          x: props.position ? props.position.x : props.defaultPosition.x,
          y: props.position ? props.position.y : props.defaultPosition.y,
          prevPropsPosition: _objectSpread({}, props.position),
          slackX: 0,
          slackY: 0,
          isElementSVG: false
        };
        if (props.position && !(props.onDrag || props.onStop)) {
          console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
        }
        return _this;
      }
      __name(Draggable3, "Draggable");
      _createClass(Draggable3, [{
        key: "componentDidMount",
        value: /* @__PURE__ */ __name(function componentDidMount() {
          if (typeof window.SVGElement !== "undefined" && this.findDOMNode() instanceof window.SVGElement) {
            this.setState({
              isElementSVG: true
            });
          }
        }, "componentDidMount")
      }, {
        key: "componentWillUnmount",
        value: /* @__PURE__ */ __name(function componentWillUnmount() {
          this.setState({
            dragging: false
          });
        }, "componentWillUnmount")
      }, {
        key: "findDOMNode",
        value: /* @__PURE__ */ __name(function findDOMNode() {
          var _this$props$nodeRef$c, _this$props, _this$props$nodeRef;
          return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$nodeRef = _this$props.nodeRef) === null || _this$props$nodeRef === void 0 ? void 0 : _this$props$nodeRef.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
        }, "findDOMNode")
      }, {
        key: "render",
        value: /* @__PURE__ */ __name(function render() {
          var _clsx;
          var _this$props2 = this.props, axis = _this$props2.axis, bounds = _this$props2.bounds, children = _this$props2.children, defaultPosition = _this$props2.defaultPosition, defaultClassName = _this$props2.defaultClassName, defaultClassNameDragging = _this$props2.defaultClassNameDragging, defaultClassNameDragged = _this$props2.defaultClassNameDragged, position = _this$props2.position, positionOffset = _this$props2.positionOffset, scale = _this$props2.scale, draggableCoreProps = _objectWithoutProperties(_this$props2, _excluded);
          var style = {};
          var svgTransform = null;
          var controlled = Boolean(position);
          var draggable = !controlled || this.state.dragging;
          var validPosition = position || defaultPosition;
          var transformOpts = {
            x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
            y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
          };
          if (this.state.isElementSVG) {
            svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
          } else {
            style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
          }
          var className = (0, _clsx2.default)(children.props.className || "", defaultClassName, (_clsx = {}, _defineProperty(_clsx, defaultClassNameDragging, this.state.dragging), _defineProperty(_clsx, defaultClassNameDragged, this.state.dragged), _clsx));
          return /* @__PURE__ */ React3.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
            onStart: this.onDragStart,
            onDrag: this.onDrag,
            onStop: this.onDragStop
          }), /* @__PURE__ */ React3.cloneElement(React3.Children.only(children), {
            className,
            style: _objectSpread(_objectSpread({}, children.props.style), style),
            transform: svgTransform
          }));
        }, "render")
      }], [{
        key: "getDerivedStateFromProps",
        value: /* @__PURE__ */ __name(function getDerivedStateFromProps(_ref, _ref2) {
          var position = _ref.position;
          var prevPropsPosition = _ref2.prevPropsPosition;
          if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
            (0, _log.default)("Draggable: getDerivedStateFromProps %j", {
              position,
              prevPropsPosition
            });
            return {
              x: position.x,
              y: position.y,
              prevPropsPosition: _objectSpread({}, position)
            };
          }
          return null;
        }, "getDerivedStateFromProps")
      }]);
      return Draggable3;
    }(React3.Component);
    exports.default = Draggable2;
    _defineProperty(Draggable2, "displayName", "Draggable");
    _defineProperty(Draggable2, "propTypes", _objectSpread(_objectSpread({}, _DraggableCore.default.propTypes), {}, {
      axis: _propTypes.default.oneOf(["both", "x", "y", "none"]),
      bounds: _propTypes.default.oneOfType([_propTypes.default.shape({
        left: _propTypes.default.number,
        right: _propTypes.default.number,
        top: _propTypes.default.number,
        bottom: _propTypes.default.number
      }), _propTypes.default.string, _propTypes.default.oneOf([false])]),
      defaultClassName: _propTypes.default.string,
      defaultClassNameDragging: _propTypes.default.string,
      defaultClassNameDragged: _propTypes.default.string,
      defaultPosition: _propTypes.default.shape({
        x: _propTypes.default.number,
        y: _propTypes.default.number
      }),
      positionOffset: _propTypes.default.shape({
        x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
        y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
      }),
      position: _propTypes.default.shape({
        x: _propTypes.default.number,
        y: _propTypes.default.number
      }),
      className: _shims.dontSetMe,
      style: _shims.dontSetMe,
      transform: _shims.dontSetMe
    }));
    _defineProperty(Draggable2, "defaultProps", _objectSpread(_objectSpread({}, _DraggableCore.default.defaultProps), {}, {
      axis: "both",
      bounds: false,
      defaultClassName: "react-draggable",
      defaultClassNameDragging: "react-draggable-dragging",
      defaultClassNameDragged: "react-draggable-dragged",
      defaultPosition: {
        x: 0,
        y: 0
      },
      scale: 1
    }));
  }
});

// ../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/cjs.js
var require_cjs = __commonJS({
  "../../.yarn/__virtual__/react-draggable-virtual-7801c82329/0/global/cache/react-draggable-npm-4.4.4-f0b7a5c546-9.zip/node_modules/react-draggable/build/cjs/cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    var _require = require_Draggable();
    var Draggable2 = _require.default;
    var DraggableCore = _require.DraggableCore;
    module.exports = Draggable2;
    module.exports.default = Draggable2;
    module.exports.DraggableCore = DraggableCore;
  }
});

// ../../.yarn/global/cache/fast-memoize-npm-2.5.2-f42a7c6940-9.zip/node_modules/fast-memoize/src/index.js
var require_src = __commonJS({
  "../../.yarn/global/cache/fast-memoize-npm-2.5.2-f42a7c6940-9.zip/node_modules/fast-memoize/src/index.js"(exports, module) {
    init_define_process();
    function memoize2(fn, options) {
      var cache = options && options.cache ? options.cache : cacheDefault;
      var serializer = options && options.serializer ? options.serializer : serializerDefault;
      var strategy = options && options.strategy ? options.strategy : strategyDefault;
      return strategy(fn, {
        cache,
        serializer
      });
    }
    __name(memoize2, "memoize");
    function isPrimitive(value) {
      return value == null || typeof value === "number" || typeof value === "boolean";
    }
    __name(isPrimitive, "isPrimitive");
    function monadic(fn, cache, serializer, arg) {
      var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    __name(monadic, "monadic");
    function variadic(fn, cache, serializer) {
      var args = Array.prototype.slice.call(arguments, 3);
      var cacheKey = serializer(args);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    __name(variadic, "variadic");
    function assemble(fn, context, strategy, cache, serialize) {
      return strategy.bind(
        context,
        fn,
        cache,
        serialize
      );
    }
    __name(assemble, "assemble");
    function strategyDefault(fn, options) {
      var strategy = fn.length === 1 ? monadic : variadic;
      return assemble(
        fn,
        this,
        strategy,
        options.cache.create(),
        options.serializer
      );
    }
    __name(strategyDefault, "strategyDefault");
    function strategyVariadic(fn, options) {
      var strategy = variadic;
      return assemble(
        fn,
        this,
        strategy,
        options.cache.create(),
        options.serializer
      );
    }
    __name(strategyVariadic, "strategyVariadic");
    function strategyMonadic(fn, options) {
      var strategy = monadic;
      return assemble(
        fn,
        this,
        strategy,
        options.cache.create(),
        options.serializer
      );
    }
    __name(strategyMonadic, "strategyMonadic");
    function serializerDefault() {
      return JSON.stringify(arguments);
    }
    __name(serializerDefault, "serializerDefault");
    function ObjectWithoutPrototypeCache() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    __name(ObjectWithoutPrototypeCache, "ObjectWithoutPrototypeCache");
    ObjectWithoutPrototypeCache.prototype.has = function(key) {
      return key in this.cache;
    };
    ObjectWithoutPrototypeCache.prototype.get = function(key) {
      return this.cache[key];
    };
    ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
      this.cache[key] = value;
    };
    var cacheDefault = {
      create: /* @__PURE__ */ __name(function create() {
        return new ObjectWithoutPrototypeCache();
      }, "create")
    };
    module.exports = memoize2;
    module.exports.strategies = {
      variadic: strategyVariadic,
      monadic: strategyMonadic
    };
  }
});

// js/Editor.tsx
init_define_process();
var import_react2 = __toESM(require_emotion_react_cjs(), 1);
var import_react3 = __toESM(require_react(), 1);

// ../../.yarn/__virtual__/react-rnd-virtual-1610495181/0/global/cache/react-rnd-npm-10.3.7-cb1aaea902-9.zip/node_modules/react-rnd/lib/index.js
init_define_process();
var import_react = __toESM(require_react());
var import_react_draggable = __toESM(require_cjs());

// ../../.yarn/__virtual__/re-resizable-virtual-3b39e27e89/0/global/cache/re-resizable-npm-6.9.6-ea5c7065a7-9.zip/node_modules/re-resizable/lib/index.js
init_define_process();
var React2 = __toESM(require_react());

// ../../.yarn/__virtual__/re-resizable-virtual-3b39e27e89/0/global/cache/re-resizable-npm-6.9.6-ea5c7065a7-9.zip/node_modules/re-resizable/lib/resizer.js
init_define_process();
var React = __toESM(require_react());
var __extends = function() {
  var extendStatics2 = /* @__PURE__ */ __name(function(d, b) {
    extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics2(d, b);
  }, "extendStatics");
  return function(d, b) {
    extendStatics2(d, b);
    function __() {
      this.constructor = d;
    }
    __name(__, "__");
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var styles = {
  top: {
    width: "100%",
    height: "10px",
    top: "-5px",
    left: "0px",
    cursor: "row-resize"
  },
  right: {
    width: "10px",
    height: "100%",
    top: "0px",
    right: "-5px",
    cursor: "col-resize"
  },
  bottom: {
    width: "100%",
    height: "10px",
    bottom: "-5px",
    left: "0px",
    cursor: "row-resize"
  },
  left: {
    width: "10px",
    height: "100%",
    top: "0px",
    left: "-5px",
    cursor: "col-resize"
  },
  topRight: {
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "-10px",
    top: "-10px",
    cursor: "ne-resize"
  },
  bottomRight: {
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "-10px",
    bottom: "-10px",
    cursor: "se-resize"
  },
  bottomLeft: {
    width: "20px",
    height: "20px",
    position: "absolute",
    left: "-10px",
    bottom: "-10px",
    cursor: "sw-resize"
  },
  topLeft: {
    width: "20px",
    height: "20px",
    position: "absolute",
    left: "-10px",
    top: "-10px",
    cursor: "nw-resize"
  }
};
var Resizer = function(_super) {
  __extends(Resizer2, _super);
  function Resizer2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.onMouseDown = function(e) {
      _this.props.onResizeStart(e, _this.props.direction);
    };
    _this.onTouchStart = function(e) {
      _this.props.onResizeStart(e, _this.props.direction);
    };
    return _this;
  }
  __name(Resizer2, "Resizer");
  Resizer2.prototype.render = function() {
    return React.createElement("div", { className: this.props.className || "", style: __assign(__assign({ position: "absolute", userSelect: "none" }, styles[this.props.direction]), this.props.replaceStyles || {}), onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart }, this.props.children);
  };
  return Resizer2;
}(React.PureComponent);

// ../../.yarn/__virtual__/re-resizable-virtual-3b39e27e89/0/global/cache/re-resizable-npm-6.9.6-ea5c7065a7-9.zip/node_modules/re-resizable/lib/index.js
var import_fast_memoize = __toESM(require_src());
var __extends2 = function() {
  var extendStatics2 = /* @__PURE__ */ __name(function(d, b) {
    extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics2(d, b);
  }, "extendStatics");
  return function(d, b) {
    extendStatics2(d, b);
    function __() {
      this.constructor = d;
    }
    __name(__, "__");
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var DEFAULT_SIZE = {
  width: "auto",
  height: "auto"
};
var clamp = (0, import_fast_memoize.default)(function(n, min, max) {
  return Math.max(Math.min(n, max), min);
});
var snap = (0, import_fast_memoize.default)(function(n, size) {
  return Math.round(n / size) * size;
});
var hasDirection = (0, import_fast_memoize.default)(function(dir, target) {
  return new RegExp(dir, "i").test(target);
});
var isTouchEvent = /* @__PURE__ */ __name(function(event) {
  return Boolean(event.touches && event.touches.length);
}, "isTouchEvent");
var isMouseEvent = /* @__PURE__ */ __name(function(event) {
  return Boolean((event.clientX || event.clientX === 0) && (event.clientY || event.clientY === 0));
}, "isMouseEvent");
var findClosestSnap = (0, import_fast_memoize.default)(function(n, snapArray, snapGap) {
  if (snapGap === void 0) {
    snapGap = 0;
  }
  var closestGapIndex = snapArray.reduce(function(prev, curr, index) {
    return Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index : prev;
  }, 0);
  var gap = Math.abs(snapArray[closestGapIndex] - n);
  return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
});
var endsWith = (0, import_fast_memoize.default)(function(str, searchStr) {
  return str.substr(str.length - searchStr.length, searchStr.length) === searchStr;
});
var getStringSize = (0, import_fast_memoize.default)(function(n) {
  n = n.toString();
  if (n === "auto") {
    return n;
  }
  if (endsWith(n, "px")) {
    return n;
  }
  if (endsWith(n, "%")) {
    return n;
  }
  if (endsWith(n, "vh")) {
    return n;
  }
  if (endsWith(n, "vw")) {
    return n;
  }
  if (endsWith(n, "vmax")) {
    return n;
  }
  if (endsWith(n, "vmin")) {
    return n;
  }
  return n + "px";
});
var getPixelSize = /* @__PURE__ */ __name(function(size, parentSize, innerWidth, innerHeight) {
  if (size && typeof size === "string") {
    if (endsWith(size, "px")) {
      return Number(size.replace("px", ""));
    }
    if (endsWith(size, "%")) {
      var ratio = Number(size.replace("%", "")) / 100;
      return parentSize * ratio;
    }
    if (endsWith(size, "vw")) {
      var ratio = Number(size.replace("vw", "")) / 100;
      return innerWidth * ratio;
    }
    if (endsWith(size, "vh")) {
      var ratio = Number(size.replace("vh", "")) / 100;
      return innerHeight * ratio;
    }
  }
  return size;
}, "getPixelSize");
var calculateNewMax = (0, import_fast_memoize.default)(function(parentSize, innerWidth, innerHeight, maxWidth, maxHeight, minWidth, minHeight) {
  maxWidth = getPixelSize(maxWidth, parentSize.width, innerWidth, innerHeight);
  maxHeight = getPixelSize(maxHeight, parentSize.height, innerWidth, innerHeight);
  minWidth = getPixelSize(minWidth, parentSize.width, innerWidth, innerHeight);
  minHeight = getPixelSize(minHeight, parentSize.height, innerWidth, innerHeight);
  return {
    maxWidth: typeof maxWidth === "undefined" ? void 0 : Number(maxWidth),
    maxHeight: typeof maxHeight === "undefined" ? void 0 : Number(maxHeight),
    minWidth: typeof minWidth === "undefined" ? void 0 : Number(minWidth),
    minHeight: typeof minHeight === "undefined" ? void 0 : Number(minHeight)
  };
});
var definedProps = [
  "as",
  "style",
  "className",
  "grid",
  "snap",
  "bounds",
  "boundsByDirection",
  "size",
  "defaultSize",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "lockAspectRatio",
  "lockAspectRatioExtraWidth",
  "lockAspectRatioExtraHeight",
  "enable",
  "handleStyles",
  "handleClasses",
  "handleWrapperStyle",
  "handleWrapperClass",
  "children",
  "onResizeStart",
  "onResize",
  "onResizeStop",
  "handleComponent",
  "scale",
  "resizeRatio",
  "snapGap"
];
var baseClassName = "__resizable_base__";
var Resizable = function(_super) {
  __extends2(Resizable2, _super);
  function Resizable2(props) {
    var _this = _super.call(this, props) || this;
    _this.ratio = 1;
    _this.resizable = null;
    _this.parentLeft = 0;
    _this.parentTop = 0;
    _this.resizableLeft = 0;
    _this.resizableRight = 0;
    _this.resizableTop = 0;
    _this.resizableBottom = 0;
    _this.targetLeft = 0;
    _this.targetTop = 0;
    _this.appendBase = function() {
      if (!_this.resizable || !_this.window) {
        return null;
      }
      var parent = _this.parentNode;
      if (!parent) {
        return null;
      }
      var element = _this.window.document.createElement("div");
      element.style.width = "100%";
      element.style.height = "100%";
      element.style.position = "absolute";
      element.style.transform = "scale(0, 0)";
      element.style.left = "0";
      element.style.flex = "0 0 100%";
      if (element.classList) {
        element.classList.add(baseClassName);
      } else {
        element.className += baseClassName;
      }
      parent.appendChild(element);
      return element;
    };
    _this.removeBase = function(base) {
      var parent = _this.parentNode;
      if (!parent) {
        return;
      }
      parent.removeChild(base);
    };
    _this.ref = function(c) {
      if (c) {
        _this.resizable = c;
      }
    };
    _this.state = {
      isResizing: false,
      width: typeof (_this.propsSize && _this.propsSize.width) === "undefined" ? "auto" : _this.propsSize && _this.propsSize.width,
      height: typeof (_this.propsSize && _this.propsSize.height) === "undefined" ? "auto" : _this.propsSize && _this.propsSize.height,
      direction: "right",
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      backgroundStyle: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0)",
        cursor: "auto",
        opacity: 0,
        position: "fixed",
        zIndex: 9999,
        top: "0",
        left: "0",
        bottom: "0",
        right: "0"
      },
      flexBasis: void 0
    };
    _this.onResizeStart = _this.onResizeStart.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    return _this;
  }
  __name(Resizable2, "Resizable");
  Object.defineProperty(Resizable2.prototype, "parentNode", {
    get: function() {
      if (!this.resizable) {
        return null;
      }
      return this.resizable.parentNode;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable2.prototype, "window", {
    get: function() {
      if (!this.resizable) {
        return null;
      }
      if (!this.resizable.ownerDocument) {
        return null;
      }
      return this.resizable.ownerDocument.defaultView;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable2.prototype, "propsSize", {
    get: function() {
      return this.props.size || this.props.defaultSize || DEFAULT_SIZE;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable2.prototype, "size", {
    get: function() {
      var width = 0;
      var height = 0;
      if (this.resizable && this.window) {
        var orgWidth = this.resizable.offsetWidth;
        var orgHeight = this.resizable.offsetHeight;
        var orgPosition = this.resizable.style.position;
        if (orgPosition !== "relative") {
          this.resizable.style.position = "relative";
        }
        width = this.resizable.style.width !== "auto" ? this.resizable.offsetWidth : orgWidth;
        height = this.resizable.style.height !== "auto" ? this.resizable.offsetHeight : orgHeight;
        this.resizable.style.position = orgPosition;
      }
      return { width, height };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Resizable2.prototype, "sizeStyle", {
    get: function() {
      var _this = this;
      var size = this.props.size;
      var getSize = /* @__PURE__ */ __name(function(key) {
        if (typeof _this.state[key] === "undefined" || _this.state[key] === "auto") {
          return "auto";
        }
        if (_this.propsSize && _this.propsSize[key] && endsWith(_this.propsSize[key].toString(), "%")) {
          if (endsWith(_this.state[key].toString(), "%")) {
            return _this.state[key].toString();
          }
          var parentSize = _this.getParentSize();
          var value = Number(_this.state[key].toString().replace("px", ""));
          var percent = value / parentSize[key] * 100;
          return percent + "%";
        }
        return getStringSize(_this.state[key]);
      }, "getSize");
      var width = size && typeof size.width !== "undefined" && !this.state.isResizing ? getStringSize(size.width) : getSize("width");
      var height = size && typeof size.height !== "undefined" && !this.state.isResizing ? getStringSize(size.height) : getSize("height");
      return { width, height };
    },
    enumerable: false,
    configurable: true
  });
  Resizable2.prototype.getParentSize = function() {
    if (!this.parentNode) {
      if (!this.window) {
        return { width: 0, height: 0 };
      }
      return { width: this.window.innerWidth, height: this.window.innerHeight };
    }
    var base = this.appendBase();
    if (!base) {
      return { width: 0, height: 0 };
    }
    var wrapChanged = false;
    var wrap = this.parentNode.style.flexWrap;
    if (wrap !== "wrap") {
      wrapChanged = true;
      this.parentNode.style.flexWrap = "wrap";
    }
    base.style.position = "relative";
    base.style.minWidth = "100%";
    base.style.minHeight = "100%";
    var size = {
      width: base.offsetWidth,
      height: base.offsetHeight
    };
    if (wrapChanged) {
      this.parentNode.style.flexWrap = wrap;
    }
    this.removeBase(base);
    return size;
  };
  Resizable2.prototype.bindEvents = function() {
    if (this.window) {
      this.window.addEventListener("mouseup", this.onMouseUp);
      this.window.addEventListener("mousemove", this.onMouseMove);
      this.window.addEventListener("mouseleave", this.onMouseUp);
      this.window.addEventListener("touchmove", this.onMouseMove, {
        capture: true,
        passive: false
      });
      this.window.addEventListener("touchend", this.onMouseUp);
    }
  };
  Resizable2.prototype.unbindEvents = function() {
    if (this.window) {
      this.window.removeEventListener("mouseup", this.onMouseUp);
      this.window.removeEventListener("mousemove", this.onMouseMove);
      this.window.removeEventListener("mouseleave", this.onMouseUp);
      this.window.removeEventListener("touchmove", this.onMouseMove, true);
      this.window.removeEventListener("touchend", this.onMouseUp);
    }
  };
  Resizable2.prototype.componentDidMount = function() {
    if (!this.resizable || !this.window) {
      return;
    }
    var computedStyle = this.window.getComputedStyle(this.resizable);
    this.setState({
      width: this.state.width || this.size.width,
      height: this.state.height || this.size.height,
      flexBasis: computedStyle.flexBasis !== "auto" ? computedStyle.flexBasis : void 0
    });
  };
  Resizable2.prototype.componentWillUnmount = function() {
    if (this.window) {
      this.unbindEvents();
    }
  };
  Resizable2.prototype.createSizeForCssProperty = function(newSize, kind) {
    var propsSize = this.propsSize && this.propsSize[kind];
    return this.state[kind] === "auto" && this.state.original[kind] === newSize && (typeof propsSize === "undefined" || propsSize === "auto") ? "auto" : newSize;
  };
  Resizable2.prototype.calculateNewMaxFromBoundary = function(maxWidth, maxHeight) {
    var boundsByDirection = this.props.boundsByDirection;
    var direction = this.state.direction;
    var widthByDirection = boundsByDirection && hasDirection("left", direction);
    var heightByDirection = boundsByDirection && hasDirection("top", direction);
    var boundWidth;
    var boundHeight;
    if (this.props.bounds === "parent") {
      var parent_1 = this.parentNode;
      if (parent_1) {
        boundWidth = widthByDirection ? this.resizableRight - this.parentLeft : parent_1.offsetWidth + (this.parentLeft - this.resizableLeft);
        boundHeight = heightByDirection ? this.resizableBottom - this.parentTop : parent_1.offsetHeight + (this.parentTop - this.resizableTop);
      }
    } else if (this.props.bounds === "window") {
      if (this.window) {
        boundWidth = widthByDirection ? this.resizableRight : this.window.innerWidth - this.resizableLeft;
        boundHeight = heightByDirection ? this.resizableBottom : this.window.innerHeight - this.resizableTop;
      }
    } else if (this.props.bounds) {
      boundWidth = widthByDirection ? this.resizableRight - this.targetLeft : this.props.bounds.offsetWidth + (this.targetLeft - this.resizableLeft);
      boundHeight = heightByDirection ? this.resizableBottom - this.targetTop : this.props.bounds.offsetHeight + (this.targetTop - this.resizableTop);
    }
    if (boundWidth && Number.isFinite(boundWidth)) {
      maxWidth = maxWidth && maxWidth < boundWidth ? maxWidth : boundWidth;
    }
    if (boundHeight && Number.isFinite(boundHeight)) {
      maxHeight = maxHeight && maxHeight < boundHeight ? maxHeight : boundHeight;
    }
    return { maxWidth, maxHeight };
  };
  Resizable2.prototype.calculateNewSizeFromDirection = function(clientX, clientY) {
    var scale = this.props.scale || 1;
    var resizeRatio = this.props.resizeRatio || 1;
    var _a = this.state, direction = _a.direction, original = _a.original;
    var _b = this.props, lockAspectRatio = _b.lockAspectRatio, lockAspectRatioExtraHeight = _b.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _b.lockAspectRatioExtraWidth;
    var newWidth = original.width;
    var newHeight = original.height;
    var extraHeight = lockAspectRatioExtraHeight || 0;
    var extraWidth = lockAspectRatioExtraWidth || 0;
    if (hasDirection("right", direction)) {
      newWidth = original.width + (clientX - original.x) * resizeRatio / scale;
      if (lockAspectRatio) {
        newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
      }
    }
    if (hasDirection("left", direction)) {
      newWidth = original.width - (clientX - original.x) * resizeRatio / scale;
      if (lockAspectRatio) {
        newHeight = (newWidth - extraWidth) / this.ratio + extraHeight;
      }
    }
    if (hasDirection("bottom", direction)) {
      newHeight = original.height + (clientY - original.y) * resizeRatio / scale;
      if (lockAspectRatio) {
        newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
      }
    }
    if (hasDirection("top", direction)) {
      newHeight = original.height - (clientY - original.y) * resizeRatio / scale;
      if (lockAspectRatio) {
        newWidth = (newHeight - extraHeight) * this.ratio + extraWidth;
      }
    }
    return { newWidth, newHeight };
  };
  Resizable2.prototype.calculateNewSizeFromAspectRatio = function(newWidth, newHeight, max, min) {
    var _a = this.props, lockAspectRatio = _a.lockAspectRatio, lockAspectRatioExtraHeight = _a.lockAspectRatioExtraHeight, lockAspectRatioExtraWidth = _a.lockAspectRatioExtraWidth;
    var computedMinWidth = typeof min.width === "undefined" ? 10 : min.width;
    var computedMaxWidth = typeof max.width === "undefined" || max.width < 0 ? newWidth : max.width;
    var computedMinHeight = typeof min.height === "undefined" ? 10 : min.height;
    var computedMaxHeight = typeof max.height === "undefined" || max.height < 0 ? newHeight : max.height;
    var extraHeight = lockAspectRatioExtraHeight || 0;
    var extraWidth = lockAspectRatioExtraWidth || 0;
    if (lockAspectRatio) {
      var extraMinWidth = (computedMinHeight - extraHeight) * this.ratio + extraWidth;
      var extraMaxWidth = (computedMaxHeight - extraHeight) * this.ratio + extraWidth;
      var extraMinHeight = (computedMinWidth - extraWidth) / this.ratio + extraHeight;
      var extraMaxHeight = (computedMaxWidth - extraWidth) / this.ratio + extraHeight;
      var lockedMinWidth = Math.max(computedMinWidth, extraMinWidth);
      var lockedMaxWidth = Math.min(computedMaxWidth, extraMaxWidth);
      var lockedMinHeight = Math.max(computedMinHeight, extraMinHeight);
      var lockedMaxHeight = Math.min(computedMaxHeight, extraMaxHeight);
      newWidth = clamp(newWidth, lockedMinWidth, lockedMaxWidth);
      newHeight = clamp(newHeight, lockedMinHeight, lockedMaxHeight);
    } else {
      newWidth = clamp(newWidth, computedMinWidth, computedMaxWidth);
      newHeight = clamp(newHeight, computedMinHeight, computedMaxHeight);
    }
    return { newWidth, newHeight };
  };
  Resizable2.prototype.setBoundingClientRect = function() {
    if (this.props.bounds === "parent") {
      var parent_2 = this.parentNode;
      if (parent_2) {
        var parentRect = parent_2.getBoundingClientRect();
        this.parentLeft = parentRect.left;
        this.parentTop = parentRect.top;
      }
    }
    if (this.props.bounds && typeof this.props.bounds !== "string") {
      var targetRect = this.props.bounds.getBoundingClientRect();
      this.targetLeft = targetRect.left;
      this.targetTop = targetRect.top;
    }
    if (this.resizable) {
      var _a = this.resizable.getBoundingClientRect(), left = _a.left, top_1 = _a.top, right = _a.right, bottom = _a.bottom;
      this.resizableLeft = left;
      this.resizableRight = right;
      this.resizableTop = top_1;
      this.resizableBottom = bottom;
    }
  };
  Resizable2.prototype.onResizeStart = function(event, direction) {
    if (!this.resizable || !this.window) {
      return;
    }
    var clientX = 0;
    var clientY = 0;
    if (event.nativeEvent && isMouseEvent(event.nativeEvent)) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    } else if (event.nativeEvent && isTouchEvent(event.nativeEvent)) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    }
    if (this.props.onResizeStart) {
      if (this.resizable) {
        var startResize = this.props.onResizeStart(event, direction, this.resizable);
        if (startResize === false) {
          return;
        }
      }
    }
    if (this.props.size) {
      if (typeof this.props.size.height !== "undefined" && this.props.size.height !== this.state.height) {
        this.setState({ height: this.props.size.height });
      }
      if (typeof this.props.size.width !== "undefined" && this.props.size.width !== this.state.width) {
        this.setState({ width: this.props.size.width });
      }
    }
    this.ratio = typeof this.props.lockAspectRatio === "number" ? this.props.lockAspectRatio : this.size.width / this.size.height;
    var flexBasis;
    var computedStyle = this.window.getComputedStyle(this.resizable);
    if (computedStyle.flexBasis !== "auto") {
      var parent_3 = this.parentNode;
      if (parent_3) {
        var dir = this.window.getComputedStyle(parent_3).flexDirection;
        this.flexDir = dir.startsWith("row") ? "row" : "column";
        flexBasis = computedStyle.flexBasis;
      }
    }
    this.setBoundingClientRect();
    this.bindEvents();
    var state = {
      original: {
        x: clientX,
        y: clientY,
        width: this.size.width,
        height: this.size.height
      },
      isResizing: true,
      backgroundStyle: __assign2(__assign2({}, this.state.backgroundStyle), { cursor: this.window.getComputedStyle(event.target).cursor || "auto" }),
      direction,
      flexBasis
    };
    this.setState(state);
  };
  Resizable2.prototype.onMouseMove = function(event) {
    if (!this.state.isResizing || !this.resizable || !this.window) {
      return;
    }
    if (this.window.TouchEvent && isTouchEvent(event)) {
      try {
        event.preventDefault();
        event.stopPropagation();
      } catch (e) {
      }
    }
    var _a = this.props, maxWidth = _a.maxWidth, maxHeight = _a.maxHeight, minWidth = _a.minWidth, minHeight = _a.minHeight;
    var clientX = isTouchEvent(event) ? event.touches[0].clientX : event.clientX;
    var clientY = isTouchEvent(event) ? event.touches[0].clientY : event.clientY;
    var _b = this.state, direction = _b.direction, original = _b.original, width = _b.width, height = _b.height;
    var parentSize = this.getParentSize();
    var max = calculateNewMax(parentSize, this.window.innerWidth, this.window.innerHeight, maxWidth, maxHeight, minWidth, minHeight);
    maxWidth = max.maxWidth;
    maxHeight = max.maxHeight;
    minWidth = max.minWidth;
    minHeight = max.minHeight;
    var _c = this.calculateNewSizeFromDirection(clientX, clientY), newHeight = _c.newHeight, newWidth = _c.newWidth;
    var boundaryMax = this.calculateNewMaxFromBoundary(maxWidth, maxHeight);
    if (this.props.snap && this.props.snap.x) {
      newWidth = findClosestSnap(newWidth, this.props.snap.x, this.props.snapGap);
    }
    if (this.props.snap && this.props.snap.y) {
      newHeight = findClosestSnap(newHeight, this.props.snap.y, this.props.snapGap);
    }
    var newSize = this.calculateNewSizeFromAspectRatio(newWidth, newHeight, { width: boundaryMax.maxWidth, height: boundaryMax.maxHeight }, { width: minWidth, height: minHeight });
    newWidth = newSize.newWidth;
    newHeight = newSize.newHeight;
    if (this.props.grid) {
      var newGridWidth = snap(newWidth, this.props.grid[0]);
      var newGridHeight = snap(newHeight, this.props.grid[1]);
      var gap = this.props.snapGap || 0;
      newWidth = gap === 0 || Math.abs(newGridWidth - newWidth) <= gap ? newGridWidth : newWidth;
      newHeight = gap === 0 || Math.abs(newGridHeight - newHeight) <= gap ? newGridHeight : newHeight;
    }
    var delta = {
      width: newWidth - original.width,
      height: newHeight - original.height
    };
    if (width && typeof width === "string") {
      if (endsWith(width, "%")) {
        var percent = newWidth / parentSize.width * 100;
        newWidth = percent + "%";
      } else if (endsWith(width, "vw")) {
        var vw = newWidth / this.window.innerWidth * 100;
        newWidth = vw + "vw";
      } else if (endsWith(width, "vh")) {
        var vh = newWidth / this.window.innerHeight * 100;
        newWidth = vh + "vh";
      }
    }
    if (height && typeof height === "string") {
      if (endsWith(height, "%")) {
        var percent = newHeight / parentSize.height * 100;
        newHeight = percent + "%";
      } else if (endsWith(height, "vw")) {
        var vw = newHeight / this.window.innerWidth * 100;
        newHeight = vw + "vw";
      } else if (endsWith(height, "vh")) {
        var vh = newHeight / this.window.innerHeight * 100;
        newHeight = vh + "vh";
      }
    }
    var newState = {
      width: this.createSizeForCssProperty(newWidth, "width"),
      height: this.createSizeForCssProperty(newHeight, "height")
    };
    if (this.flexDir === "row") {
      newState.flexBasis = newState.width;
    } else if (this.flexDir === "column") {
      newState.flexBasis = newState.height;
    }
    this.setState(newState);
    if (this.props.onResize) {
      this.props.onResize(event, direction, this.resizable, delta);
    }
  };
  Resizable2.prototype.onMouseUp = function(event) {
    var _a = this.state, isResizing = _a.isResizing, direction = _a.direction, original = _a.original;
    if (!isResizing || !this.resizable) {
      return;
    }
    var delta = {
      width: this.size.width - original.width,
      height: this.size.height - original.height
    };
    if (this.props.onResizeStop) {
      this.props.onResizeStop(event, direction, this.resizable, delta);
    }
    if (this.props.size) {
      this.setState(this.props.size);
    }
    this.unbindEvents();
    this.setState({
      isResizing: false,
      backgroundStyle: __assign2(__assign2({}, this.state.backgroundStyle), { cursor: "auto" })
    });
  };
  Resizable2.prototype.updateSize = function(size) {
    this.setState({ width: size.width, height: size.height });
  };
  Resizable2.prototype.renderResizer = function() {
    var _this = this;
    var _a = this.props, enable = _a.enable, handleStyles = _a.handleStyles, handleClasses = _a.handleClasses, handleWrapperStyle = _a.handleWrapperStyle, handleWrapperClass = _a.handleWrapperClass, handleComponent = _a.handleComponent;
    if (!enable) {
      return null;
    }
    var resizers = Object.keys(enable).map(function(dir) {
      if (enable[dir] !== false) {
        return React2.createElement(Resizer, { key: dir, direction: dir, onResizeStart: _this.onResizeStart, replaceStyles: handleStyles && handleStyles[dir], className: handleClasses && handleClasses[dir] }, handleComponent && handleComponent[dir] ? handleComponent[dir] : null);
      }
      return null;
    });
    return React2.createElement("div", { className: handleWrapperClass, style: handleWrapperStyle }, resizers);
  };
  Resizable2.prototype.render = function() {
    var _this = this;
    var extendsProps = Object.keys(this.props).reduce(function(acc, key) {
      if (definedProps.indexOf(key) !== -1) {
        return acc;
      }
      acc[key] = _this.props[key];
      return acc;
    }, {});
    var style = __assign2(__assign2(__assign2({ position: "relative", userSelect: this.state.isResizing ? "none" : "auto" }, this.props.style), this.sizeStyle), { maxWidth: this.props.maxWidth, maxHeight: this.props.maxHeight, minWidth: this.props.minWidth, minHeight: this.props.minHeight, boxSizing: "border-box", flexShrink: 0 });
    if (this.state.flexBasis) {
      style.flexBasis = this.state.flexBasis;
    }
    var Wrapper = this.props.as || "div";
    return React2.createElement(
      Wrapper,
      __assign2({ ref: this.ref, style, className: this.props.className }, extendsProps),
      this.state.isResizing && React2.createElement("div", { style: this.state.backgroundStyle }),
      this.props.children,
      this.renderResizer()
    );
  };
  Resizable2.defaultProps = {
    as: "div",
    onResizeStart: function() {
    },
    onResize: function() {
    },
    onResizeStop: function() {
    },
    enable: {
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true
    },
    style: {},
    grid: [1, 1],
    lockAspectRatio: false,
    lockAspectRatioExtraWidth: 0,
    lockAspectRatioExtraHeight: 0,
    scale: 1,
    resizeRatio: 1,
    snapGap: 0
  };
  return Resizable2;
}(React2.PureComponent);

// ../../.yarn/__virtual__/react-rnd-virtual-1610495181/0/global/cache/react-rnd-npm-10.3.7-cb1aaea902-9.zip/node_modules/react-rnd/lib/index.js
var extendStatics = /* @__PURE__ */ __name(function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
}, "extendStatics");
function __extends3(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  __name(__, "__");
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
__name(__extends3, "__extends");
var __assign3 = /* @__PURE__ */ __name(function() {
  __assign3 = Object.assign || /* @__PURE__ */ __name(function __assign4(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  }, "__assign");
  return __assign3.apply(this, arguments);
}, "__assign");
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
__name(__rest, "__rest");
var Draggable = import_react_draggable.default;
var resizableStyle = {
  width: "auto",
  height: "auto",
  display: "inline-block",
  position: "absolute",
  top: 0,
  left: 0
};
var getEnableResizingByFlag = /* @__PURE__ */ __name(function(flag) {
  return {
    bottom: flag,
    bottomLeft: flag,
    bottomRight: flag,
    left: flag,
    right: flag,
    top: flag,
    topLeft: flag,
    topRight: flag
  };
}, "getEnableResizingByFlag");
var Rnd = function(_super) {
  __extends3(Rnd2, _super);
  function Rnd2(props) {
    var _this = _super.call(this, props) || this;
    _this.resizingPosition = { x: 0, y: 0 };
    _this.offsetFromParent = { left: 0, top: 0 };
    _this.resizableElement = { current: null };
    _this.originalPosition = { x: 0, y: 0 };
    _this.refDraggable = function(c) {
      if (!c)
        return;
      _this.draggable = c;
    };
    _this.refResizable = function(c) {
      if (!c)
        return;
      _this.resizable = c;
      _this.resizableElement.current = c.resizable;
    };
    _this.state = {
      resizing: false,
      bounds: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight
    };
    _this.onResizeStart = _this.onResizeStart.bind(_this);
    _this.onResize = _this.onResize.bind(_this);
    _this.onResizeStop = _this.onResizeStop.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDrag = _this.onDrag.bind(_this);
    _this.onDragStop = _this.onDragStop.bind(_this);
    _this.getMaxSizesFromProps = _this.getMaxSizesFromProps.bind(_this);
    return _this;
  }
  __name(Rnd2, "Rnd");
  Rnd2.prototype.componentDidMount = function() {
    this.updateOffsetFromParent();
    var _a = this.offsetFromParent, left = _a.left, top = _a.top;
    var _b = this.getDraggablePosition(), x = _b.x, y = _b.y;
    this.draggable.setState({
      x: x - left,
      y: y - top
    });
    this.forceUpdate();
  };
  Rnd2.prototype.getDraggablePosition = function() {
    var _a = this.draggable.state, x = _a.x, y = _a.y;
    return { x, y };
  };
  Rnd2.prototype.getParent = function() {
    return this.resizable && this.resizable.parentNode;
  };
  Rnd2.prototype.getParentSize = function() {
    return this.resizable.getParentSize();
  };
  Rnd2.prototype.getMaxSizesFromProps = function() {
    var maxWidth = typeof this.props.maxWidth === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxWidth;
    var maxHeight = typeof this.props.maxHeight === "undefined" ? Number.MAX_SAFE_INTEGER : this.props.maxHeight;
    return { maxWidth, maxHeight };
  };
  Rnd2.prototype.getSelfElement = function() {
    return this.resizable && this.resizable.resizable;
  };
  Rnd2.prototype.getOffsetHeight = function(boundary) {
    var scale = this.props.scale;
    switch (this.props.bounds) {
      case "window":
        return window.innerHeight / scale;
      case "body":
        return document.body.offsetHeight / scale;
      default:
        return boundary.offsetHeight;
    }
  };
  Rnd2.prototype.getOffsetWidth = function(boundary) {
    var scale = this.props.scale;
    switch (this.props.bounds) {
      case "window":
        return window.innerWidth / scale;
      case "body":
        return document.body.offsetWidth / scale;
      default:
        return boundary.offsetWidth;
    }
  };
  Rnd2.prototype.onDragStart = function(e, data) {
    if (this.props.onDragStart) {
      this.props.onDragStart(e, data);
    }
    var pos = this.getDraggablePosition();
    this.originalPosition = pos;
    if (!this.props.bounds)
      return;
    var parent = this.getParent();
    var scale = this.props.scale;
    var boundary;
    if (this.props.bounds === "parent") {
      boundary = parent;
    } else if (this.props.bounds === "body") {
      var parentRect_1 = parent.getBoundingClientRect();
      var parentLeft_1 = parentRect_1.left;
      var parentTop_1 = parentRect_1.top;
      var bodyRect = document.body.getBoundingClientRect();
      var left_1 = -(parentLeft_1 - parent.offsetLeft * scale - bodyRect.left) / scale;
      var top_1 = -(parentTop_1 - parent.offsetTop * scale - bodyRect.top) / scale;
      var right = (document.body.offsetWidth - this.resizable.size.width * scale) / scale + left_1;
      var bottom = (document.body.offsetHeight - this.resizable.size.height * scale) / scale + top_1;
      return this.setState({ bounds: { top: top_1, right, bottom, left: left_1 } });
    } else if (this.props.bounds === "window") {
      if (!this.resizable)
        return;
      var parentRect_2 = parent.getBoundingClientRect();
      var parentLeft_2 = parentRect_2.left;
      var parentTop_2 = parentRect_2.top;
      var left_2 = -(parentLeft_2 - parent.offsetLeft * scale) / scale;
      var top_2 = -(parentTop_2 - parent.offsetTop * scale) / scale;
      var right = (window.innerWidth - this.resizable.size.width * scale) / scale + left_2;
      var bottom = (window.innerHeight - this.resizable.size.height * scale) / scale + top_2;
      return this.setState({ bounds: { top: top_2, right, bottom, left: left_2 } });
    } else {
      boundary = document.querySelector(this.props.bounds);
    }
    if (!(boundary instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
      return;
    }
    var boundaryRect = boundary.getBoundingClientRect();
    var boundaryLeft = boundaryRect.left;
    var boundaryTop = boundaryRect.top;
    var parentRect = parent.getBoundingClientRect();
    var parentLeft = parentRect.left;
    var parentTop = parentRect.top;
    var left = (boundaryLeft - parentLeft) / scale;
    var top = boundaryTop - parentTop;
    if (!this.resizable)
      return;
    this.updateOffsetFromParent();
    var offset = this.offsetFromParent;
    this.setState({
      bounds: {
        top: top - offset.top,
        right: left + (boundary.offsetWidth - this.resizable.size.width) - offset.left / scale,
        bottom: top + (boundary.offsetHeight - this.resizable.size.height) - offset.top,
        left: left - offset.left / scale
      }
    });
  };
  Rnd2.prototype.onDrag = function(e, data) {
    if (!this.props.onDrag)
      return;
    var _a = this.offsetFromParent, left = _a.left, top = _a.top;
    if (!this.props.dragAxis || this.props.dragAxis === "both") {
      return this.props.onDrag(e, __assign3(__assign3({}, data), { x: data.x - left, y: data.y - top }));
    } else if (this.props.dragAxis === "x") {
      return this.props.onDrag(e, __assign3(__assign3({}, data), { x: data.x + left, y: this.originalPosition.y + top, deltaY: 0 }));
    } else if (this.props.dragAxis === "y") {
      return this.props.onDrag(e, __assign3(__assign3({}, data), { x: this.originalPosition.x + left, y: data.y + top, deltaX: 0 }));
    }
  };
  Rnd2.prototype.onDragStop = function(e, data) {
    if (!this.props.onDragStop)
      return;
    var _a = this.offsetFromParent, left = _a.left, top = _a.top;
    if (!this.props.dragAxis || this.props.dragAxis === "both") {
      return this.props.onDragStop(e, __assign3(__assign3({}, data), { x: data.x + left, y: data.y + top }));
    } else if (this.props.dragAxis === "x") {
      return this.props.onDragStop(e, __assign3(__assign3({}, data), { x: data.x + left, y: this.originalPosition.y + top, deltaY: 0 }));
    } else if (this.props.dragAxis === "y") {
      return this.props.onDragStop(e, __assign3(__assign3({}, data), { x: this.originalPosition.x + left, y: data.y + top, deltaX: 0 }));
    }
  };
  Rnd2.prototype.onResizeStart = function(e, dir, elementRef) {
    e.stopPropagation();
    this.setState({
      resizing: true
    });
    var scale = this.props.scale;
    var offset = this.offsetFromParent;
    var pos = this.getDraggablePosition();
    this.resizingPosition = { x: pos.x + offset.left, y: pos.y + offset.top };
    this.originalPosition = pos;
    if (this.props.bounds) {
      var parent_1 = this.getParent();
      var boundary = void 0;
      if (this.props.bounds === "parent") {
        boundary = parent_1;
      } else if (this.props.bounds === "body") {
        boundary = document.body;
      } else if (this.props.bounds === "window") {
        boundary = window;
      } else {
        boundary = document.querySelector(this.props.bounds);
      }
      var self_1 = this.getSelfElement();
      if (self_1 instanceof Element && (boundary instanceof HTMLElement || boundary === window) && parent_1 instanceof HTMLElement) {
        var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
        var parentSize = this.getParentSize();
        if (maxWidth && typeof maxWidth === "string") {
          if (maxWidth.endsWith("%")) {
            var ratio = Number(maxWidth.replace("%", "")) / 100;
            maxWidth = parentSize.width * ratio;
          } else if (maxWidth.endsWith("px")) {
            maxWidth = Number(maxWidth.replace("px", ""));
          }
        }
        if (maxHeight && typeof maxHeight === "string") {
          if (maxHeight.endsWith("%")) {
            var ratio = Number(maxHeight.replace("%", "")) / 100;
            maxHeight = parentSize.width * ratio;
          } else if (maxHeight.endsWith("px")) {
            maxHeight = Number(maxHeight.replace("px", ""));
          }
        }
        var selfRect = self_1.getBoundingClientRect();
        var selfLeft = selfRect.left;
        var selfTop = selfRect.top;
        var boundaryRect = this.props.bounds === "window" ? { left: 0, top: 0 } : boundary.getBoundingClientRect();
        var boundaryLeft = boundaryRect.left;
        var boundaryTop = boundaryRect.top;
        var offsetWidth = this.getOffsetWidth(boundary);
        var offsetHeight = this.getOffsetHeight(boundary);
        var hasLeft = dir.toLowerCase().endsWith("left");
        var hasRight = dir.toLowerCase().endsWith("right");
        var hasTop = dir.startsWith("top");
        var hasBottom = dir.startsWith("bottom");
        if ((hasLeft || hasTop) && this.resizable) {
          var max = (selfLeft - boundaryLeft) / scale + this.resizable.size.width;
          this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
        }
        if (hasRight || this.props.lockAspectRatio && !hasLeft && !hasTop) {
          var max = offsetWidth + (boundaryLeft - selfLeft) / scale;
          this.setState({ maxWidth: max > Number(maxWidth) ? maxWidth : max });
        }
        if ((hasTop || hasLeft) && this.resizable) {
          var max = (selfTop - boundaryTop) / scale + this.resizable.size.height;
          this.setState({
            maxHeight: max > Number(maxHeight) ? maxHeight : max
          });
        }
        if (hasBottom || this.props.lockAspectRatio && !hasTop && !hasLeft) {
          var max = offsetHeight + (boundaryTop - selfTop) / scale;
          this.setState({
            maxHeight: max > Number(maxHeight) ? maxHeight : max
          });
        }
      }
    } else {
      this.setState({
        maxWidth: this.props.maxWidth,
        maxHeight: this.props.maxHeight
      });
    }
    if (this.props.onResizeStart) {
      this.props.onResizeStart(e, dir, elementRef);
    }
  };
  Rnd2.prototype.onResize = function(e, direction, elementRef, delta) {
    var newPos = { x: this.originalPosition.x, y: this.originalPosition.y };
    var left = -delta.width;
    var top = -delta.height;
    var directions = ["top", "left", "topLeft", "bottomLeft", "topRight"];
    if (directions.indexOf(direction) !== -1) {
      if (direction === "bottomLeft") {
        newPos.x += left;
      } else if (direction === "topRight") {
        newPos.y += top;
      } else {
        newPos.x += left;
        newPos.y += top;
      }
    }
    if (newPos.x !== this.draggable.state.x || newPos.y !== this.draggable.state.y) {
      this.draggable.setState(newPos);
    }
    this.updateOffsetFromParent();
    var offset = this.offsetFromParent;
    var x = this.getDraggablePosition().x + offset.left;
    var y = this.getDraggablePosition().y + offset.top;
    this.resizingPosition = { x, y };
    if (!this.props.onResize)
      return;
    this.props.onResize(e, direction, elementRef, delta, {
      x,
      y
    });
  };
  Rnd2.prototype.onResizeStop = function(e, direction, elementRef, delta) {
    this.setState({
      resizing: false
    });
    var _a = this.getMaxSizesFromProps(), maxWidth = _a.maxWidth, maxHeight = _a.maxHeight;
    this.setState({ maxWidth, maxHeight });
    if (this.props.onResizeStop) {
      this.props.onResizeStop(e, direction, elementRef, delta, this.resizingPosition);
    }
  };
  Rnd2.prototype.updateSize = function(size) {
    if (!this.resizable)
      return;
    this.resizable.updateSize({ width: size.width, height: size.height });
  };
  Rnd2.prototype.updatePosition = function(position) {
    this.draggable.setState(position);
  };
  Rnd2.prototype.updateOffsetFromParent = function() {
    var scale = this.props.scale;
    var parent = this.getParent();
    var self = this.getSelfElement();
    if (!parent || self === null) {
      return {
        top: 0,
        left: 0
      };
    }
    var parentRect = parent.getBoundingClientRect();
    var parentLeft = parentRect.left;
    var parentTop = parentRect.top;
    var selfRect = self.getBoundingClientRect();
    var position = this.getDraggablePosition();
    var scrollLeft = parent.scrollLeft;
    var scrollTop = parent.scrollTop;
    this.offsetFromParent = {
      left: selfRect.left - parentLeft + scrollLeft - position.x * scale,
      top: selfRect.top - parentTop + scrollTop - position.y * scale
    };
  };
  Rnd2.prototype.render = function() {
    var _a = this.props, disableDragging = _a.disableDragging, style = _a.style, dragHandleClassName = _a.dragHandleClassName, position = _a.position, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, dragAxis = _a.dragAxis, dragGrid = _a.dragGrid, bounds = _a.bounds, enableUserSelectHack = _a.enableUserSelectHack, cancel = _a.cancel, children = _a.children, onResizeStart = _a.onResizeStart, onResize = _a.onResize, onResizeStop = _a.onResizeStop, onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragStop = _a.onDragStop, resizeHandleStyles = _a.resizeHandleStyles, resizeHandleClasses = _a.resizeHandleClasses, resizeHandleComponent = _a.resizeHandleComponent, enableResizing = _a.enableResizing, resizeGrid = _a.resizeGrid, resizeHandleWrapperClass = _a.resizeHandleWrapperClass, resizeHandleWrapperStyle = _a.resizeHandleWrapperStyle, scale = _a.scale, allowAnyClick = _a.allowAnyClick, resizableProps = __rest(_a, ["disableDragging", "style", "dragHandleClassName", "position", "onMouseDown", "onMouseUp", "dragAxis", "dragGrid", "bounds", "enableUserSelectHack", "cancel", "children", "onResizeStart", "onResize", "onResizeStop", "onDragStart", "onDrag", "onDragStop", "resizeHandleStyles", "resizeHandleClasses", "resizeHandleComponent", "enableResizing", "resizeGrid", "resizeHandleWrapperClass", "resizeHandleWrapperStyle", "scale", "allowAnyClick"]);
    var defaultValue = this.props.default ? __assign3({}, this.props.default) : void 0;
    delete resizableProps.default;
    var cursorStyle = disableDragging || dragHandleClassName ? { cursor: "auto" } : { cursor: "move" };
    var innerStyle = __assign3(__assign3(__assign3({}, resizableStyle), cursorStyle), style);
    var _b = this.offsetFromParent, left = _b.left, top = _b.top;
    var draggablePosition;
    if (position) {
      draggablePosition = {
        x: position.x - left,
        y: position.y - top
      };
    }
    var pos = this.state.resizing ? void 0 : draggablePosition;
    var dragAxisOrUndefined = this.state.resizing ? "both" : dragAxis;
    return (0, import_react.createElement)(
      Draggable,
      { ref: this.refDraggable, handle: dragHandleClassName ? ".".concat(dragHandleClassName) : void 0, defaultPosition: defaultValue, onMouseDown, onMouseUp, onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop, axis: dragAxisOrUndefined, disabled: disableDragging, grid: dragGrid, bounds: bounds ? this.state.bounds : void 0, position: pos, enableUserSelectHack, cancel, scale, allowAnyClick, nodeRef: this.resizableElement },
      (0, import_react.createElement)(Resizable, __assign3({}, resizableProps, { ref: this.refResizable, defaultSize: defaultValue, size: this.props.size, enable: typeof enableResizing === "boolean" ? getEnableResizingByFlag(enableResizing) : enableResizing, onResizeStart: this.onResizeStart, onResize: this.onResize, onResizeStop: this.onResizeStop, style: innerStyle, minWidth: this.props.minWidth, minHeight: this.props.minHeight, maxWidth: this.state.resizing ? this.state.maxWidth : this.props.maxWidth, maxHeight: this.state.resizing ? this.state.maxHeight : this.props.maxHeight, grid: resizeGrid, handleWrapperClass: resizeHandleWrapperClass, handleWrapperStyle: resizeHandleWrapperStyle, lockAspectRatio: this.props.lockAspectRatio, lockAspectRatioExtraWidth: this.props.lockAspectRatioExtraWidth, lockAspectRatioExtraHeight: this.props.lockAspectRatioExtraHeight, handleStyles: resizeHandleStyles, handleClasses: resizeHandleClasses, handleComponent: resizeHandleComponent, scale: this.props.scale }), children)
    );
  };
  Rnd2.defaultProps = {
    maxWidth: Number.MAX_SAFE_INTEGER,
    maxHeight: Number.MAX_SAFE_INTEGER,
    scale: 1,
    onResizeStart: function() {
    },
    onResize: function() {
    },
    onResizeStop: function() {
    },
    onDragStart: function() {
    },
    onDrag: function() {
    },
    onDragStop: function() {
    }
  };
  return Rnd2;
}(import_react.PureComponent);

// js/isMobile.mjs
init_define_process();
function isMobile() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.userAgent.indexOf("SAMSUNG") === -1;
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.slice(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && !isIOS;
}
__name(isMobile, "isMobile");

// js/Editor.tsx
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod = {
  getValue: async () => "",
  setValue: async (code) => {
    if (code.length < 10)
      console.log(code);
  },
  getErrors: async () => [],
  code: "",
  counter: 0,
  codeToSet: ""
};
var Editor = /* @__PURE__ */ __name(({ codeSpace }) => {
  const ref = (0, import_react3.useRef)(null);
  const { i, code } = mST();
  const engine = isMobile() ? "ace" : "monaco";
  const [
    mySession,
    changeContent
  ] = (0, import_react3.useState)({
    myCode: code,
    counter: i,
    started: false,
    onChange(_cb) {
    }
  });
  mod.counter = mST().i;
  const {
    myCode,
    started,
    onChange
  } = mySession;
  mod.code = myCode;
  (0, import_react3.useEffect)(() => {
    if (started)
      return;
    if (!ref?.current || started) {
      return;
    }
    const container = ref?.current;
    if (container === null)
      return;
    (engine === "monaco" ? setMonaco(container, codeSpace) : setAce(container, codeSpace)).then((res) => Object.assign(mod, { setValue: res?.setValue })).then(
      () => changeContent((x) => ({ ...x, started: true }))
    );
  }, [started, ref.current]);
  (0, import_react3.useEffect)(
    () => {
      mod.getErrors().then(console.log);
      onChange(
        () => mod.getValue().then(
          () => changeContent((x) => ({
            ...x,
            counter: mod.counter,
            myCode: mod.code
          }))
        )
      );
    },
    [onChange, myCode, changeContent]
  );
  onSessionUpdate(async () => {
    if (mod.counter >= mST().i) {
      return;
    }
    const { i: i2, code: code2 } = mST();
    if (!code2)
      return;
    mod.setValue(code2);
    mod.code = code2;
    mod.counter = i2;
    changeContent((x) => ({
      ...x,
      counter: i2,
      myCode: code2
    }));
  }, "editor");
  const EditorNode = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "data-test-id": "editor",
      ref,
      css: import_react2.css`
    ${engine === "ace" ? `` : `border-right: 4px dashed gray;
    border-bottom: 4px dashed gray;`}

    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    `
    }
  );
  if (engine === "ace")
    return EditorNode;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Rnd,
    {
      enableResizing: true,
      disableDragging: true,
      minWidth: 640,
      minHeight: "100vh",
      bounds: "body",
      allowAnyClick: true,
      lockAspectRatio: false,
      enable: {
        top: false,
        bottom: true,
        right: true,
        left: false
      },
      defaultSize: {
        width: "640px",
        height: "100vh"
      },
      children: EditorNode
    }
  );
}, "Editor");
async function onModChange(_code, codeSpace) {
  const code = prettierJs(_code);
  if (!code)
    return;
  if (code === prettierJs(mod.code))
    return;
  const counter = ++mod.counter;
  mod.code = code;
  runner({ code, counter, codeSpace });
}
__name(onModChange, "onModChange");
var startedM = 0;
async function setMonaco(container, codeSpace) {
  if (startedM)
    return;
  startedM = 1;
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.href = location.origin + "/Editor.css";
  document.head.append(link);
  const { startMonaco } = await import("./chunk-startMonaco-ORMJSN66.mjs");
  return await startMonaco({
    container,
    codeSpace,
    code: mST().code,
    onChange: (code) => onModChange(code, codeSpace)
  });
}
__name(setMonaco, "setMonaco");
var startedAce = 0;
async function setAce(container, codeSpace) {
  if (startedAce)
    return;
  startedAce = 1;
  const { startAce } = await import("./chunk-startAce-L4DX4ZHZ.mjs");
  return await startAce(
    mST().code,
    (code) => onModChange(code, codeSpace),
    container
  );
}
__name(setAce, "setAce");

export {
  Editor
};
