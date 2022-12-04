import {
  IOutlineModelService,
  ReferencesController,
  ToggleTabFocusModeAction,
  init_outlineModel,
  init_toggleTabFocusMode,
  registerLanguage
} from "./chunk-chunk-74LQIDSP.mjs";
import {
  require_clsx,
  require_prop_types
} from "./chunk-chunk-ZZWIKWD4.mjs";
import {
  $,
  AccessibilityHelpNLS,
  CancellationTokenSource,
  Codicon,
  Color,
  DeferredPromise,
  Disposable,
  DisposableStore,
  EditorAction,
  EditorCommand,
  EditorContextKeys,
  Event,
  Extensions2 as Extensions,
  GoToLineNLS,
  HC_BLACK_THEME_NAME,
  HC_LIGHT_THEME_NAME,
  ICodeEditorService,
  ICommandService,
  IConfigurationService,
  IContextKeyService,
  IDialogService,
  IInstantiationService,
  IKeybindingService,
  ILanguageFeaturesService,
  ILanguageService,
  INotificationService,
  IOpenerService,
  IQuickInputService,
  IStandaloneThemeService,
  IStorageService,
  ITelemetryService,
  InspectTokensNLS,
  LRUCache,
  MutableDisposable,
  NullState,
  OverviewRulerLane,
  QuickCommandNLS,
  QuickHelpNLS,
  QuickOutlineNLS,
  Range,
  RawContextKey,
  Registry,
  SymbolKinds,
  ToggleHighContrastNLS,
  TokenMetadata,
  TokenizationRegistry,
  URI,
  VS_DARK_THEME_NAME,
  VS_LIGHT_THEME_NAME,
  Widget,
  addDisposableListener,
  addStandardDisposableListener,
  alert,
  append,
  clearNode,
  coalesce,
  createFastDomNode,
  createMatches,
  editorHoverBorder,
  editor_api_exports,
  findLast,
  format,
  fuzzyScore,
  getCodeEditor,
  init_aria,
  init_arrays,
  init_async,
  init_cancellation,
  init_codeEditorService,
  init_codicons,
  init_color,
  init_colorRegistry,
  init_commands,
  init_configuration,
  init_contextkey,
  init_dom,
  init_editorBrowser,
  init_editorColorRegistry,
  init_editorContextKeys,
  init_editorExtensions,
  init_encodedTokenAttributes,
  init_errors,
  init_event,
  init_fastDomNode,
  init_formattedTextRenderer,
  init_functional,
  init_instantiation,
  init_keybinding,
  init_language,
  init_languageFeatures,
  init_languages,
  init_lifecycle,
  init_map,
  init_model,
  init_nls,
  init_nullTokenize,
  init_opener,
  init_path,
  init_platform,
  init_platform2,
  init_range,
  init_standaloneStrings,
  init_standaloneTheme,
  init_strings,
  init_telemetry,
  init_theme,
  init_themeService,
  init_types,
  init_uri,
  init_widget,
  isCancellationError,
  isDark,
  isDiffEditor,
  isHighContrast,
  isIOS,
  isMacintosh,
  isString,
  isWindows,
  localize,
  matchesContiguousSubString,
  matchesPrefix,
  matchesWords,
  nullTokenize,
  nullTokenizeEncoded,
  once,
  or,
  overviewRulerRangeHighlight,
  registerEditorAction,
  registerEditorCommand,
  registerEditorContribution,
  registerThemingParticipant,
  renderFormattedText,
  reset,
  sep,
  severity_default,
  stripIcons,
  stripWildcards,
  themeColorFromId,
  timeout,
  toDisposable,
  trim,
  withNullAsUndefined
} from "./chunk-chunk-WGJB5WIY.mjs";
import {
  prettierJs,
  runner
} from "./chunk-chunk-Y2MLRQU4.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-RNJNNLQS.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-NFYMKIWC.mjs";
import {
  mST,
  onSessionUpdate
} from "./chunk-chunk-JQLFMSSW.mjs";
import {
  require_react_dom
} from "./chunk-chunk-M3XF32XQ.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __commonJS,
  __esm,
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

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.css
var init_ = __esm({
  "../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.css"() {
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js
var require_accessibilityHelp = __commonJS({
  "../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js"(exports) {
    init_define_process();
    init_();
    init_dom();
    init_fastDomNode();
    init_formattedTextRenderer();
    init_aria();
    init_widget();
    init_lifecycle();
    init_platform();
    init_strings();
    init_uri();
    init_editorExtensions();
    init_editorContextKeys();
    init_toggleTabFocusMode();
    init_contextkey();
    init_instantiation();
    init_keybinding();
    init_opener();
    init_standaloneStrings();
    var __decorate8 = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param8 = exports && exports.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    var CONTEXT_ACCESSIBILITY_WIDGET_VISIBLE = new RawContextKey("accessibilityHelpWidgetVisible", false);
    var AccessibilityHelpController = /* @__PURE__ */ __name(class AccessibilityHelpController2 extends Disposable {
      static get(editor) {
        return editor.getContribution(AccessibilityHelpController2.ID);
      }
      constructor(editor, instantiationService) {
        super();
        this._editor = editor;
        this._widget = this._register(instantiationService.createInstance(AccessibilityHelpWidget, this._editor));
      }
      show() {
        this._widget.show();
      }
      hide() {
        this._widget.hide();
      }
    }, "AccessibilityHelpController");
    AccessibilityHelpController.ID = "editor.contrib.accessibilityHelpController";
    AccessibilityHelpController = __decorate8([
      __param8(1, IInstantiationService)
    ], AccessibilityHelpController);
    function getSelectionLabel(selections, charactersSelected) {
      if (!selections || selections.length === 0) {
        return AccessibilityHelpNLS.noSelection;
      }
      if (selections.length === 1) {
        if (charactersSelected) {
          return format(AccessibilityHelpNLS.singleSelectionRange, selections[0].positionLineNumber, selections[0].positionColumn, charactersSelected);
        }
        return format(AccessibilityHelpNLS.singleSelection, selections[0].positionLineNumber, selections[0].positionColumn);
      }
      if (charactersSelected) {
        return format(AccessibilityHelpNLS.multiSelectionRange, selections.length, charactersSelected);
      }
      if (selections.length > 0) {
        return format(AccessibilityHelpNLS.multiSelection, selections.length);
      }
      return "";
    }
    __name(getSelectionLabel, "getSelectionLabel");
    var AccessibilityHelpWidget = /* @__PURE__ */ __name(class AccessibilityHelpWidget2 extends Widget {
      constructor(editor, _contextKeyService, _keybindingService, _openerService) {
        super();
        this._contextKeyService = _contextKeyService;
        this._keybindingService = _keybindingService;
        this._openerService = _openerService;
        this._editor = editor;
        this._isVisibleKey = CONTEXT_ACCESSIBILITY_WIDGET_VISIBLE.bindTo(this._contextKeyService);
        this._domNode = createFastDomNode(document.createElement("div"));
        this._domNode.setClassName("accessibilityHelpWidget");
        this._domNode.setDisplay("none");
        this._domNode.setAttribute("role", "dialog");
        this._domNode.setAttribute("aria-hidden", "true");
        this._contentDomNode = createFastDomNode(document.createElement("div"));
        this._contentDomNode.setAttribute("role", "document");
        this._domNode.appendChild(this._contentDomNode);
        this._isVisible = false;
        this._register(this._editor.onDidLayoutChange(() => {
          if (this._isVisible) {
            this._layout();
          }
        }));
        this._register(addStandardDisposableListener(this._contentDomNode.domNode, "keydown", (e) => {
          if (!this._isVisible) {
            return;
          }
          if (e.equals(2048 | 35)) {
            alert(AccessibilityHelpNLS.emergencyConfOn);
            this._editor.updateOptions({
              accessibilitySupport: "on"
            });
            clearNode(this._contentDomNode.domNode);
            this._buildContent();
            this._contentDomNode.domNode.focus();
            e.preventDefault();
            e.stopPropagation();
          }
          if (e.equals(2048 | 38)) {
            alert(AccessibilityHelpNLS.openingDocs);
            let url = this._editor.getRawOptions().accessibilityHelpUrl;
            if (typeof url === "undefined") {
              url = "https://go.microsoft.com/fwlink/?linkid=852450";
            }
            this._openerService.open(URI.parse(url));
            e.preventDefault();
            e.stopPropagation();
          }
        }));
        this.onblur(this._contentDomNode.domNode, () => {
          this.hide();
        });
        this._editor.addOverlayWidget(this);
      }
      dispose() {
        this._editor.removeOverlayWidget(this);
        super.dispose();
      }
      getId() {
        return AccessibilityHelpWidget2.ID;
      }
      getDomNode() {
        return this._domNode.domNode;
      }
      getPosition() {
        return {
          preference: null
        };
      }
      show() {
        if (this._isVisible) {
          return;
        }
        this._isVisible = true;
        this._isVisibleKey.set(true);
        this._layout();
        this._domNode.setDisplay("block");
        this._domNode.setAttribute("aria-hidden", "false");
        this._contentDomNode.domNode.tabIndex = 0;
        this._buildContent();
        this._contentDomNode.domNode.focus();
      }
      _descriptionForCommand(commandId, msg, noKbMsg) {
        const kb = this._keybindingService.lookupKeybinding(commandId);
        if (kb) {
          return format(msg, kb.getAriaLabel());
        }
        return format(noKbMsg, commandId);
      }
      _buildContent() {
        const options = this._editor.getOptions();
        const selections = this._editor.getSelections();
        let charactersSelected = 0;
        if (selections) {
          const model = this._editor.getModel();
          if (model) {
            selections.forEach((selection) => {
              charactersSelected += model.getValueLengthInRange(selection);
            });
          }
        }
        let text = getSelectionLabel(selections, charactersSelected);
        if (options.get(56)) {
          if (options.get(84)) {
            text += AccessibilityHelpNLS.readonlyDiffEditor;
          } else {
            text += AccessibilityHelpNLS.editableDiffEditor;
          }
        } else {
          if (options.get(84)) {
            text += AccessibilityHelpNLS.readonlyEditor;
          } else {
            text += AccessibilityHelpNLS.editableEditor;
          }
        }
        const turnOnMessage = isMacintosh ? AccessibilityHelpNLS.changeConfigToOnMac : AccessibilityHelpNLS.changeConfigToOnWinLinux;
        switch (options.get(2)) {
          case 0:
            text += "\n\n - " + turnOnMessage;
            break;
          case 2:
            text += "\n\n - " + AccessibilityHelpNLS.auto_on;
            break;
          case 1:
            text += "\n\n - " + AccessibilityHelpNLS.auto_off;
            text += " " + turnOnMessage;
            break;
        }
        if (options.get(135)) {
          text += "\n\n - " + this._descriptionForCommand(ToggleTabFocusModeAction.ID, AccessibilityHelpNLS.tabFocusModeOnMsg, AccessibilityHelpNLS.tabFocusModeOnMsgNoKb);
        } else {
          text += "\n\n - " + this._descriptionForCommand(ToggleTabFocusModeAction.ID, AccessibilityHelpNLS.tabFocusModeOffMsg, AccessibilityHelpNLS.tabFocusModeOffMsgNoKb);
        }
        const openDocMessage = isMacintosh ? AccessibilityHelpNLS.openDocMac : AccessibilityHelpNLS.openDocWinLinux;
        text += "\n\n - " + openDocMessage;
        text += "\n\n" + AccessibilityHelpNLS.outroMsg;
        this._contentDomNode.domNode.appendChild(renderFormattedText(text));
        this._contentDomNode.domNode.setAttribute("aria-label", text);
      }
      hide() {
        if (!this._isVisible) {
          return;
        }
        this._isVisible = false;
        this._isVisibleKey.reset();
        this._domNode.setDisplay("none");
        this._domNode.setAttribute("aria-hidden", "true");
        this._contentDomNode.domNode.tabIndex = -1;
        clearNode(this._contentDomNode.domNode);
        this._editor.focus();
      }
      _layout() {
        const editorLayout = this._editor.getLayoutInfo();
        const w = Math.max(5, Math.min(AccessibilityHelpWidget2.WIDTH, editorLayout.width - 40));
        const h = Math.max(5, Math.min(AccessibilityHelpWidget2.HEIGHT, editorLayout.height - 40));
        this._domNode.setWidth(w);
        this._domNode.setHeight(h);
        const top = Math.round((editorLayout.height - h) / 2);
        this._domNode.setTop(top);
        const left = Math.round((editorLayout.width - w) / 2);
        this._domNode.setLeft(left);
      }
    }, "AccessibilityHelpWidget");
    AccessibilityHelpWidget.ID = "editor.contrib.accessibilityHelpWidget";
    AccessibilityHelpWidget.WIDTH = 500;
    AccessibilityHelpWidget.HEIGHT = 300;
    AccessibilityHelpWidget = __decorate8([
      __param8(1, IContextKeyService),
      __param8(2, IKeybindingService),
      __param8(3, IOpenerService)
    ], AccessibilityHelpWidget);
    var ShowAccessibilityHelpAction = class extends EditorAction {
      constructor() {
        super({
          id: "editor.action.showAccessibilityHelp",
          label: AccessibilityHelpNLS.showAccessibilityHelpAction,
          alias: "Show Accessibility Help",
          precondition: void 0,
          kbOpts: {
            primary: 512 | 59,
            weight: 100,
            linux: {
              primary: 512 | 1024 | 59,
              secondary: [512 | 59]
            }
          }
        });
      }
      run(accessor, editor) {
        const controller = AccessibilityHelpController.get(editor);
        controller === null || controller === void 0 ? void 0 : controller.show();
      }
    };
    __name(ShowAccessibilityHelpAction, "ShowAccessibilityHelpAction");
    registerEditorContribution(AccessibilityHelpController.ID, AccessibilityHelpController, 4);
    registerEditorAction(ShowAccessibilityHelpAction);
    var AccessibilityHelpCommand = EditorCommand.bindToContribution(AccessibilityHelpController.get);
    registerEditorCommand(new AccessibilityHelpCommand({
      id: "closeAccessibilityHelp",
      precondition: CONTEXT_ACCESSIBILITY_WIDGET_VISIBLE,
      handler: (x) => x.hide(),
      kbOpts: {
        weight: 100 + 100,
        kbExpr: EditorContextKeys.focus,
        primary: 9,
        secondary: [1024 | 9]
      }
    }));
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.css
var init_2 = __esm({
  "../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.css"() {
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js
var require_inspectTokens = __commonJS({
  "../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js"(exports) {
    init_define_process();
    init_2();
    init_dom();
    init_color();
    init_lifecycle();
    init_editorExtensions();
    init_languages();
    init_encodedTokenAttributes();
    init_nullTokenize();
    init_language();
    init_standaloneTheme();
    init_colorRegistry();
    init_themeService();
    init_standaloneStrings();
    init_theme();
    var __decorate8 = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param8 = exports && exports.__param || function(paramIndex, decorator) {
      return function(target, key) {
        decorator(target, key, paramIndex);
      };
    };
    var InspectTokensController = /* @__PURE__ */ __name(class InspectTokensController2 extends Disposable {
      static get(editor) {
        return editor.getContribution(InspectTokensController2.ID);
      }
      constructor(editor, standaloneColorService, languageService) {
        super();
        this._editor = editor;
        this._languageService = languageService;
        this._widget = null;
        this._register(this._editor.onDidChangeModel((e) => this.stop()));
        this._register(this._editor.onDidChangeModelLanguage((e) => this.stop()));
        this._register(TokenizationRegistry.onDidChange((e) => this.stop()));
        this._register(this._editor.onKeyUp((e) => e.keyCode === 9 && this.stop()));
      }
      dispose() {
        this.stop();
        super.dispose();
      }
      launch() {
        if (this._widget) {
          return;
        }
        if (!this._editor.hasModel()) {
          return;
        }
        this._widget = new InspectTokensWidget(this._editor, this._languageService);
      }
      stop() {
        if (this._widget) {
          this._widget.dispose();
          this._widget = null;
        }
      }
    }, "InspectTokensController");
    InspectTokensController.ID = "editor.contrib.inspectTokens";
    InspectTokensController = __decorate8([
      __param8(1, IStandaloneThemeService),
      __param8(2, ILanguageService)
    ], InspectTokensController);
    var InspectTokens = class extends EditorAction {
      constructor() {
        super({
          id: "editor.action.inspectTokens",
          label: InspectTokensNLS.inspectTokensAction,
          alias: "Developer: Inspect Tokens",
          precondition: void 0
        });
      }
      run(accessor, editor) {
        const controller = InspectTokensController.get(editor);
        controller === null || controller === void 0 ? void 0 : controller.launch();
      }
    };
    __name(InspectTokens, "InspectTokens");
    function renderTokenText(tokenText) {
      let result = "";
      for (let charIndex = 0, len = tokenText.length; charIndex < len; charIndex++) {
        const charCode = tokenText.charCodeAt(charIndex);
        switch (charCode) {
          case 9:
            result += "\u2192";
            break;
          case 32:
            result += "\xB7";
            break;
          default:
            result += String.fromCharCode(charCode);
        }
      }
      return result;
    }
    __name(renderTokenText, "renderTokenText");
    function getSafeTokenizationSupport(languageIdCodec, languageId) {
      const tokenizationSupport = TokenizationRegistry.get(languageId);
      if (tokenizationSupport) {
        return tokenizationSupport;
      }
      const encodedLanguageId = languageIdCodec.encodeLanguageId(languageId);
      return {
        getInitialState: () => NullState,
        tokenize: (line, hasEOL, state) => nullTokenize(languageId, state),
        tokenizeEncoded: (line, hasEOL, state) => nullTokenizeEncoded(encodedLanguageId, state)
      };
    }
    __name(getSafeTokenizationSupport, "getSafeTokenizationSupport");
    var InspectTokensWidget = class extends Disposable {
      constructor(editor, languageService) {
        super();
        this.allowEditorOverflow = true;
        this._editor = editor;
        this._languageService = languageService;
        this._model = this._editor.getModel();
        this._domNode = document.createElement("div");
        this._domNode.className = "tokens-inspect-widget";
        this._tokenizationSupport = getSafeTokenizationSupport(this._languageService.languageIdCodec, this._model.getLanguageId());
        this._compute(this._editor.getPosition());
        this._register(this._editor.onDidChangeCursorPosition((e) => this._compute(this._editor.getPosition())));
        this._editor.addContentWidget(this);
      }
      dispose() {
        this._editor.removeContentWidget(this);
        super.dispose();
      }
      getId() {
        return InspectTokensWidget._ID;
      }
      _compute(position) {
        const data = this._getTokensAtLine(position.lineNumber);
        let token1Index = 0;
        for (let i = data.tokens1.length - 1; i >= 0; i--) {
          const t = data.tokens1[i];
          if (position.column - 1 >= t.offset) {
            token1Index = i;
            break;
          }
        }
        let token2Index = 0;
        for (let i = data.tokens2.length >>> 1; i >= 0; i--) {
          if (position.column - 1 >= data.tokens2[i << 1]) {
            token2Index = i;
            break;
          }
        }
        const lineContent = this._model.getLineContent(position.lineNumber);
        let tokenText = "";
        if (token1Index < data.tokens1.length) {
          const tokenStartIndex = data.tokens1[token1Index].offset;
          const tokenEndIndex = token1Index + 1 < data.tokens1.length ? data.tokens1[token1Index + 1].offset : lineContent.length;
          tokenText = lineContent.substring(tokenStartIndex, tokenEndIndex);
        }
        reset(this._domNode, $("h2.tm-token", void 0, renderTokenText(tokenText), $("span.tm-token-length", void 0, `${tokenText.length} ${tokenText.length === 1 ? "char" : "chars"}`)));
        append(this._domNode, $("hr.tokens-inspect-separator", { "style": "clear:both" }));
        const metadata = (token2Index << 1) + 1 < data.tokens2.length ? this._decodeMetadata(data.tokens2[(token2Index << 1) + 1]) : null;
        append(this._domNode, $("table.tm-metadata-table", void 0, $("tbody", void 0, $("tr", void 0, $("td.tm-metadata-key", void 0, "language"), $("td.tm-metadata-value", void 0, `${metadata ? metadata.languageId : "-?-"}`)), $("tr", void 0, $("td.tm-metadata-key", void 0, "token type"), $("td.tm-metadata-value", void 0, `${metadata ? this._tokenTypeToString(metadata.tokenType) : "-?-"}`)), $("tr", void 0, $("td.tm-metadata-key", void 0, "font style"), $("td.tm-metadata-value", void 0, `${metadata ? this._fontStyleToString(metadata.fontStyle) : "-?-"}`)), $("tr", void 0, $("td.tm-metadata-key", void 0, "foreground"), $("td.tm-metadata-value", void 0, `${metadata ? Color.Format.CSS.formatHex(metadata.foreground) : "-?-"}`)), $("tr", void 0, $("td.tm-metadata-key", void 0, "background"), $("td.tm-metadata-value", void 0, `${metadata ? Color.Format.CSS.formatHex(metadata.background) : "-?-"}`)))));
        append(this._domNode, $("hr.tokens-inspect-separator"));
        if (token1Index < data.tokens1.length) {
          append(this._domNode, $("span.tm-token-type", void 0, data.tokens1[token1Index].type));
        }
        this._editor.layoutContentWidget(this);
      }
      _decodeMetadata(metadata) {
        const colorMap = TokenizationRegistry.getColorMap();
        const languageId = TokenMetadata.getLanguageId(metadata);
        const tokenType = TokenMetadata.getTokenType(metadata);
        const fontStyle = TokenMetadata.getFontStyle(metadata);
        const foreground = TokenMetadata.getForeground(metadata);
        const background = TokenMetadata.getBackground(metadata);
        return {
          languageId: this._languageService.languageIdCodec.decodeLanguageId(languageId),
          tokenType,
          fontStyle,
          foreground: colorMap[foreground],
          background: colorMap[background]
        };
      }
      _tokenTypeToString(tokenType) {
        switch (tokenType) {
          case 0:
            return "Other";
          case 1:
            return "Comment";
          case 2:
            return "String";
          case 3:
            return "RegEx";
          default:
            return "??";
        }
      }
      _fontStyleToString(fontStyle) {
        let r = "";
        if (fontStyle & 1) {
          r += "italic ";
        }
        if (fontStyle & 2) {
          r += "bold ";
        }
        if (fontStyle & 4) {
          r += "underline ";
        }
        if (fontStyle & 8) {
          r += "strikethrough ";
        }
        if (r.length === 0) {
          r = "---";
        }
        return r;
      }
      _getTokensAtLine(lineNumber) {
        const stateBeforeLine = this._getStateBeforeLine(lineNumber);
        const tokenizationResult1 = this._tokenizationSupport.tokenize(this._model.getLineContent(lineNumber), true, stateBeforeLine);
        const tokenizationResult2 = this._tokenizationSupport.tokenizeEncoded(this._model.getLineContent(lineNumber), true, stateBeforeLine);
        return {
          startState: stateBeforeLine,
          tokens1: tokenizationResult1.tokens,
          tokens2: tokenizationResult2.tokens,
          endState: tokenizationResult1.endState
        };
      }
      _getStateBeforeLine(lineNumber) {
        let state = this._tokenizationSupport.getInitialState();
        for (let i = 1; i < lineNumber; i++) {
          const tokenizationResult = this._tokenizationSupport.tokenize(this._model.getLineContent(i), true, state);
          state = tokenizationResult.endState;
        }
        return state;
      }
      getDomNode() {
        return this._domNode;
      }
      getPosition() {
        return {
          position: this._editor.getPosition(),
          preference: [2, 1]
        };
      }
    };
    __name(InspectTokensWidget, "InspectTokensWidget");
    InspectTokensWidget._ID = "editor.contrib.inspectTokensWidget";
    registerEditorContribution(InspectTokensController.ID, InspectTokensController, 4);
    registerEditorAction(InspectTokens);
    registerThemingParticipant((theme, collector) => {
      const border = theme.getColor(editorHoverBorder);
      if (border) {
        const borderWidth = isHighContrast(theme.type) ? 2 : 1;
        collector.addRule(`.monaco-editor .tokens-inspect-widget { border: ${borderWidth}px solid ${border}; }`);
      }
    });
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

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/editor.main.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/monaco.contribution.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/abap/abap.contribution.js
init_define_process();
registerLanguage({
  id: "abap",
  extensions: [".abap"],
  aliases: ["abap", "ABAP"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/abap/abap"], resolve, reject);
      });
    } else {
      return import("./chunk-abap-Y6UJEC74.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/apex/apex.contribution.js
init_define_process();
registerLanguage({
  id: "apex",
  extensions: [".cls"],
  aliases: ["Apex", "apex"],
  mimetypes: ["text/x-apex-source", "text/x-apex"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/apex/apex"], resolve, reject);
      });
    } else {
      return import("./chunk-apex-QVO4QHX7.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/azcli/azcli.contribution.js
init_define_process();
registerLanguage({
  id: "azcli",
  extensions: [".azcli"],
  aliases: ["Azure CLI", "azcli"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/azcli/azcli"], resolve, reject);
      });
    } else {
      return import("./chunk-azcli-OYUPPR3D.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/bat/bat.contribution.js
init_define_process();
registerLanguage({
  id: "bat",
  extensions: [".bat", ".cmd"],
  aliases: ["Batch", "bat"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/bat/bat"], resolve, reject);
      });
    } else {
      return import("./chunk-bat-FU3UQTQV.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/bicep/bicep.contribution.js
init_define_process();
registerLanguage({
  id: "bicep",
  extensions: [".bicep"],
  aliases: ["Bicep"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/bicep/bicep"], resolve, reject);
      });
    } else {
      return import("./chunk-bicep-RTODG5FJ.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/cameligo/cameligo.contribution.js
init_define_process();
registerLanguage({
  id: "cameligo",
  extensions: [".mligo"],
  aliases: ["Cameligo"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/cameligo/cameligo"], resolve, reject);
      });
    } else {
      return import("./chunk-cameligo-KEIXAC7H.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/clojure/clojure.contribution.js
init_define_process();
registerLanguage({
  id: "clojure",
  extensions: [".clj", ".cljs", ".cljc", ".edn"],
  aliases: ["clojure", "Clojure"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/clojure/clojure"], resolve, reject);
      });
    } else {
      return import("./chunk-clojure-6H4B7ETK.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/coffee/coffee.contribution.js
init_define_process();
registerLanguage({
  id: "coffeescript",
  extensions: [".coffee"],
  aliases: ["CoffeeScript", "coffeescript", "coffee"],
  mimetypes: ["text/x-coffeescript", "text/coffeescript"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/coffee/coffee"], resolve, reject);
      });
    } else {
      return import("./chunk-coffee-OWJNBLRK.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution.js
init_define_process();
registerLanguage({
  id: "c",
  extensions: [".c", ".h"],
  aliases: ["C", "c"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/cpp/cpp"], resolve, reject);
      });
    } else {
      return import("./chunk-cpp-TV3RUYR4.mjs");
    }
  }
});
registerLanguage({
  id: "cpp",
  extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx"],
  aliases: ["C++", "Cpp", "cpp"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/cpp/cpp"], resolve, reject);
      });
    } else {
      return import("./chunk-cpp-TV3RUYR4.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution.js
init_define_process();
registerLanguage({
  id: "csharp",
  extensions: [".cs", ".csx", ".cake"],
  aliases: ["C#", "csharp"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/csharp/csharp"], resolve, reject);
      });
    } else {
      return import("./chunk-csharp-RPFBXVLW.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/csp/csp.contribution.js
init_define_process();
registerLanguage({
  id: "csp",
  extensions: [],
  aliases: ["CSP", "csp"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/csp/csp"], resolve, reject);
      });
    } else {
      return import("./chunk-csp-UVQ7Z25K.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/css/css.contribution.js
init_define_process();
registerLanguage({
  id: "css",
  extensions: [".css"],
  aliases: ["CSS", "css"],
  mimetypes: ["text/css"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/css/css"], resolve, reject);
      });
    } else {
      return import("./chunk-css-AL7KUEYO.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/cypher/cypher.contribution.js
init_define_process();
registerLanguage({
  id: "cypher",
  extensions: [".cypher", ".cyp"],
  aliases: ["Cypher", "OpenCypher"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/cypher/cypher"], resolve, reject);
      });
    } else {
      return import("./chunk-cypher-JF5UJ27U.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/dart/dart.contribution.js
init_define_process();
registerLanguage({
  id: "dart",
  extensions: [".dart"],
  aliases: ["Dart", "dart"],
  mimetypes: ["text/x-dart-source", "text/x-dart"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/dart/dart"], resolve, reject);
      });
    } else {
      return import("./chunk-dart-CBTDABJG.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/dockerfile/dockerfile.contribution.js
init_define_process();
registerLanguage({
  id: "dockerfile",
  extensions: [".dockerfile"],
  filenames: ["Dockerfile"],
  aliases: ["Dockerfile"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/dockerfile/dockerfile"], resolve, reject);
      });
    } else {
      return import("./chunk-dockerfile-6YFUBD72.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/ecl/ecl.contribution.js
init_define_process();
registerLanguage({
  id: "ecl",
  extensions: [".ecl"],
  aliases: ["ECL", "Ecl", "ecl"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/ecl/ecl"], resolve, reject);
      });
    } else {
      return import("./chunk-ecl-3ZRXROV5.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/elixir/elixir.contribution.js
init_define_process();
registerLanguage({
  id: "elixir",
  extensions: [".ex", ".exs"],
  aliases: ["Elixir", "elixir", "ex"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/elixir/elixir"], resolve, reject);
      });
    } else {
      return import("./chunk-elixir-ZGIX7JLL.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/flow9/flow9.contribution.js
init_define_process();
registerLanguage({
  id: "flow9",
  extensions: [".flow"],
  aliases: ["Flow9", "Flow", "flow9", "flow"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/flow9/flow9"], resolve, reject);
      });
    } else {
      return import("./chunk-flow9-I3J5Y5EP.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/fsharp/fsharp.contribution.js
init_define_process();
registerLanguage({
  id: "fsharp",
  extensions: [".fs", ".fsi", ".ml", ".mli", ".fsx", ".fsscript"],
  aliases: ["F#", "FSharp", "fsharp"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/fsharp/fsharp"], resolve, reject);
      });
    } else {
      return import("./chunk-fsharp-VOJIDCME.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/freemarker2/freemarker2.contribution.js
init_define_process();
registerLanguage({
  id: "freemarker2",
  extensions: [".ftl", ".ftlh", ".ftlx"],
  aliases: ["FreeMarker2", "Apache FreeMarker2"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAngleInterpolationDollar);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagAutoInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-angle.interpolation-dollar",
  aliases: ["FreeMarker2 (Angle/Dollar)", "Apache FreeMarker2 (Angle/Dollar)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAngleInterpolationDollar);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagAngleInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-bracket.interpolation-dollar",
  aliases: ["FreeMarker2 (Bracket/Dollar)", "Apache FreeMarker2 (Bracket/Dollar)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagBracketInterpolationDollar);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagBracketInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-angle.interpolation-bracket",
  aliases: ["FreeMarker2 (Angle/Bracket)", "Apache FreeMarker2 (Angle/Bracket)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAngleInterpolationBracket);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagAngleInterpolationBracket);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-bracket.interpolation-bracket",
  aliases: ["FreeMarker2 (Bracket/Bracket)", "Apache FreeMarker2 (Bracket/Bracket)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagBracketInterpolationBracket);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagBracketInterpolationBracket);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-auto.interpolation-dollar",
  aliases: ["FreeMarker2 (Auto/Dollar)", "Apache FreeMarker2 (Auto/Dollar)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAutoInterpolationDollar);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagAutoInterpolationDollar);
    }
  }
});
registerLanguage({
  id: "freemarker2.tag-auto.interpolation-bracket",
  aliases: ["FreeMarker2 (Auto/Bracket)", "Apache FreeMarker2 (Auto/Bracket)"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/freemarker2/freemarker2"], resolve, reject);
      }).then((m) => m.TagAutoInterpolationBracket);
    } else {
      return import("./chunk-freemarker2-REOH4UP2.mjs").then((m) => m.TagAutoInterpolationBracket);
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/go/go.contribution.js
init_define_process();
registerLanguage({
  id: "go",
  extensions: [".go"],
  aliases: ["Go"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/go/go"], resolve, reject);
      });
    } else {
      return import("./chunk-go-IGAJDRI7.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/graphql/graphql.contribution.js
init_define_process();
registerLanguage({
  id: "graphql",
  extensions: [".graphql", ".gql"],
  aliases: ["GraphQL", "graphql", "gql"],
  mimetypes: ["application/graphql"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/graphql/graphql"], resolve, reject);
      });
    } else {
      return import("./chunk-graphql-MSKONWM4.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/handlebars/handlebars.contribution.js
init_define_process();
registerLanguage({
  id: "handlebars",
  extensions: [".handlebars", ".hbs"],
  aliases: ["Handlebars", "handlebars", "hbs"],
  mimetypes: ["text/x-handlebars-template"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/handlebars/handlebars"], resolve, reject);
      });
    } else {
      return import("./chunk-handlebars-NBJGLVQE.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/hcl/hcl.contribution.js
init_define_process();
registerLanguage({
  id: "hcl",
  extensions: [".tf", ".tfvars", ".hcl"],
  aliases: ["Terraform", "tf", "HCL", "hcl"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/hcl/hcl"], resolve, reject);
      });
    } else {
      return import("./chunk-hcl-PYICWRBP.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/html/html.contribution.js
init_define_process();
registerLanguage({
  id: "html",
  extensions: [".html", ".htm", ".shtml", ".xhtml", ".mdoc", ".jsp", ".asp", ".aspx", ".jshtm"],
  aliases: ["HTML", "htm", "html", "xhtml"],
  mimetypes: ["text/html", "text/x-jshtm", "text/template", "text/ng-template"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/html/html"], resolve, reject);
      });
    } else {
      return import("./chunk-html-RL4KWNQK.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/ini/ini.contribution.js
init_define_process();
registerLanguage({
  id: "ini",
  extensions: [".ini", ".properties", ".gitconfig"],
  filenames: ["config", ".gitattributes", ".gitconfig", ".editorconfig"],
  aliases: ["Ini", "ini"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/ini/ini"], resolve, reject);
      });
    } else {
      return import("./chunk-ini-UOD43F2L.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/java/java.contribution.js
init_define_process();
registerLanguage({
  id: "java",
  extensions: [".java", ".jav"],
  aliases: ["Java", "java"],
  mimetypes: ["text/x-java-source", "text/x-java"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/java/java"], resolve, reject);
      });
    } else {
      return import("./chunk-java-VPPN3UHX.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js
init_define_process();
registerLanguage({
  id: "javascript",
  extensions: [".js", ".es6", ".jsx", ".mjs", ".cjs"],
  firstLine: "^#!.*\\bnode",
  filenames: ["jakefile"],
  aliases: ["JavaScript", "javascript", "js"],
  mimetypes: ["text/javascript"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/javascript/javascript"], resolve, reject);
      });
    } else {
      return import("./chunk-javascript-OYX35QPR.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/julia/julia.contribution.js
init_define_process();
registerLanguage({
  id: "julia",
  extensions: [".jl"],
  aliases: ["julia", "Julia"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/julia/julia"], resolve, reject);
      });
    } else {
      return import("./chunk-julia-U5DZ4DTV.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/kotlin/kotlin.contribution.js
init_define_process();
registerLanguage({
  id: "kotlin",
  extensions: [".kt"],
  aliases: ["Kotlin", "kotlin"],
  mimetypes: ["text/x-kotlin-source", "text/x-kotlin"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/kotlin/kotlin"], resolve, reject);
      });
    } else {
      return import("./chunk-kotlin-JMB3BA7Z.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/less/less.contribution.js
init_define_process();
registerLanguage({
  id: "less",
  extensions: [".less"],
  aliases: ["Less", "less"],
  mimetypes: ["text/x-less", "text/less"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/less/less"], resolve, reject);
      });
    } else {
      return import("./chunk-less-5HMCQNFL.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/lexon/lexon.contribution.js
init_define_process();
registerLanguage({
  id: "lexon",
  extensions: [".lex"],
  aliases: ["Lexon"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/lexon/lexon"], resolve, reject);
      });
    } else {
      return import("./chunk-lexon-JF635JON.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/lua/lua.contribution.js
init_define_process();
registerLanguage({
  id: "lua",
  extensions: [".lua"],
  aliases: ["Lua", "lua"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/lua/lua"], resolve, reject);
      });
    } else {
      return import("./chunk-lua-SG3WIDK3.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/liquid/liquid.contribution.js
init_define_process();
registerLanguage({
  id: "liquid",
  extensions: [".liquid", ".html.liquid"],
  aliases: ["Liquid", "liquid"],
  mimetypes: ["application/liquid"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/liquid/liquid"], resolve, reject);
      });
    } else {
      return import("./chunk-liquid-XFOEPKLU.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/m3/m3.contribution.js
init_define_process();
registerLanguage({
  id: "m3",
  extensions: [".m3", ".i3", ".mg", ".ig"],
  aliases: ["Modula-3", "Modula3", "modula3", "m3"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/m3/m3"], resolve, reject);
      });
    } else {
      return import("./chunk-m3-OQHM36QC.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js
init_define_process();
registerLanguage({
  id: "markdown",
  extensions: [".md", ".markdown", ".mdown", ".mkdn", ".mkd", ".mdwn", ".mdtxt", ".mdtext"],
  aliases: ["Markdown", "markdown"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/markdown/markdown"], resolve, reject);
      });
    } else {
      return import("./chunk-markdown-JF6D2HXA.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/mips/mips.contribution.js
init_define_process();
registerLanguage({
  id: "mips",
  extensions: [".s"],
  aliases: ["MIPS", "MIPS-V"],
  mimetypes: ["text/x-mips", "text/mips", "text/plaintext"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/mips/mips"], resolve, reject);
      });
    } else {
      return import("./chunk-mips-OA7QQ2VR.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/msdax/msdax.contribution.js
init_define_process();
registerLanguage({
  id: "msdax",
  extensions: [".dax", ".msdax"],
  aliases: ["DAX", "MSDAX"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/msdax/msdax"], resolve, reject);
      });
    } else {
      return import("./chunk-msdax-3PM23ADG.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution.js
init_define_process();
registerLanguage({
  id: "mysql",
  extensions: [],
  aliases: ["MySQL", "mysql"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/mysql/mysql"], resolve, reject);
      });
    } else {
      return import("./chunk-mysql-CUGAB25E.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/objective-c/objective-c.contribution.js
init_define_process();
registerLanguage({
  id: "objective-c",
  extensions: [".m"],
  aliases: ["Objective-C"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/objective-c/objective-c"], resolve, reject);
      });
    } else {
      return import("./chunk-objective-c-3VFSO454.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/pascal/pascal.contribution.js
init_define_process();
registerLanguage({
  id: "pascal",
  extensions: [".pas", ".p", ".pp"],
  aliases: ["Pascal", "pas"],
  mimetypes: ["text/x-pascal-source", "text/x-pascal"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/pascal/pascal"], resolve, reject);
      });
    } else {
      return import("./chunk-pascal-J6BO75M2.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/pascaligo/pascaligo.contribution.js
init_define_process();
registerLanguage({
  id: "pascaligo",
  extensions: [".ligo"],
  aliases: ["Pascaligo", "ligo"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/pascaligo/pascaligo"], resolve, reject);
      });
    } else {
      return import("./chunk-pascaligo-I4JD3YUX.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/perl/perl.contribution.js
init_define_process();
registerLanguage({
  id: "perl",
  extensions: [".pl"],
  aliases: ["Perl", "pl"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/perl/perl"], resolve, reject);
      });
    } else {
      return import("./chunk-perl-VVYILJNX.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/pgsql/pgsql.contribution.js
init_define_process();
registerLanguage({
  id: "pgsql",
  extensions: [],
  aliases: ["PostgreSQL", "postgres", "pg", "postgre"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/pgsql/pgsql"], resolve, reject);
      });
    } else {
      return import("./chunk-pgsql-43OE3K2Y.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/php/php.contribution.js
init_define_process();
registerLanguage({
  id: "php",
  extensions: [".php", ".php4", ".php5", ".phtml", ".ctp"],
  aliases: ["PHP", "php"],
  mimetypes: ["application/x-php"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/php/php"], resolve, reject);
      });
    } else {
      return import("./chunk-php-ZJGR7HF5.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/pla/pla.contribution.js
init_define_process();
registerLanguage({
  id: "pla",
  extensions: [".pla"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/pla/pla"], resolve, reject);
      });
    } else {
      return import("./chunk-pla-32MX5RKJ.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/postiats/postiats.contribution.js
init_define_process();
registerLanguage({
  id: "postiats",
  extensions: [".dats", ".sats", ".hats"],
  aliases: ["ATS", "ATS/Postiats"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/postiats/postiats"], resolve, reject);
      });
    } else {
      return import("./chunk-postiats-24PKGEZA.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/powerquery/powerquery.contribution.js
init_define_process();
registerLanguage({
  id: "powerquery",
  extensions: [".pq", ".pqm"],
  aliases: ["PQ", "M", "Power Query", "Power Query M"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/powerquery/powerquery"], resolve, reject);
      });
    } else {
      return import("./chunk-powerquery-Q7AGIIGV.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.contribution.js
init_define_process();
registerLanguage({
  id: "powershell",
  extensions: [".ps1", ".psm1", ".psd1"],
  aliases: ["PowerShell", "powershell", "ps", "ps1"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/powershell/powershell"], resolve, reject);
      });
    } else {
      return import("./chunk-powershell-ZDHIYNUZ.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/protobuf/protobuf.contribution.js
init_define_process();
registerLanguage({
  id: "proto",
  extensions: [".proto"],
  aliases: ["protobuf", "Protocol Buffers"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/protobuf/protobuf"], resolve, reject);
      });
    } else {
      return import("./chunk-protobuf-6LOTK4U5.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/pug/pug.contribution.js
init_define_process();
registerLanguage({
  id: "pug",
  extensions: [".jade", ".pug"],
  aliases: ["Pug", "Jade", "jade"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/pug/pug"], resolve, reject);
      });
    } else {
      return import("./chunk-pug-NUXI6OJV.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/python/python.contribution.js
init_define_process();
registerLanguage({
  id: "python",
  extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
  aliases: ["Python", "py"],
  firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/python/python"], resolve, reject);
      });
    } else {
      return import("./chunk-python-A4PGZ6Q6.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/qsharp/qsharp.contribution.js
init_define_process();
registerLanguage({
  id: "qsharp",
  extensions: [".qs"],
  aliases: ["Q#", "qsharp"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/qsharp/qsharp"], resolve, reject);
      });
    } else {
      return import("./chunk-qsharp-VQYJDTLD.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/r/r.contribution.js
init_define_process();
registerLanguage({
  id: "r",
  extensions: [".r", ".rhistory", ".rmd", ".rprofile", ".rt"],
  aliases: ["R", "r"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/r/r"], resolve, reject);
      });
    } else {
      return import("./chunk-r-O4JJHGNF.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/razor/razor.contribution.js
init_define_process();
registerLanguage({
  id: "razor",
  extensions: [".cshtml"],
  aliases: ["Razor", "razor"],
  mimetypes: ["text/x-cshtml"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/razor/razor"], resolve, reject);
      });
    } else {
      return import("./chunk-razor-XFK7OCTU.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/redis/redis.contribution.js
init_define_process();
registerLanguage({
  id: "redis",
  extensions: [".redis"],
  aliases: ["redis"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/redis/redis"], resolve, reject);
      });
    } else {
      return import("./chunk-redis-FJDCFW5W.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/redshift/redshift.contribution.js
init_define_process();
registerLanguage({
  id: "redshift",
  extensions: [],
  aliases: ["Redshift", "redshift"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/redshift/redshift"], resolve, reject);
      });
    } else {
      return import("./chunk-redshift-SJJTBOWS.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/restructuredtext/restructuredtext.contribution.js
init_define_process();
registerLanguage({
  id: "restructuredtext",
  extensions: [".rst"],
  aliases: ["reStructuredText", "restructuredtext"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/restructuredtext/restructuredtext"], resolve, reject);
      });
    } else {
      return import("./chunk-restructuredtext-XOC6GZAC.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution.js
init_define_process();
registerLanguage({
  id: "ruby",
  extensions: [".rb", ".rbx", ".rjs", ".gemspec", ".pp"],
  filenames: ["rakefile", "Gemfile"],
  aliases: ["Ruby", "rb"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/ruby/ruby"], resolve, reject);
      });
    } else {
      return import("./chunk-ruby-MH5HTDQV.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/rust/rust.contribution.js
init_define_process();
registerLanguage({
  id: "rust",
  extensions: [".rs", ".rlib"],
  aliases: ["Rust", "rust"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/rust/rust"], resolve, reject);
      });
    } else {
      return import("./chunk-rust-E7TVY2KX.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/sb/sb.contribution.js
init_define_process();
registerLanguage({
  id: "sb",
  extensions: [".sb"],
  aliases: ["Small Basic", "sb"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/sb/sb"], resolve, reject);
      });
    } else {
      return import("./chunk-sb-ZETQKOAR.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/scala/scala.contribution.js
init_define_process();
registerLanguage({
  id: "scala",
  extensions: [".scala", ".sc", ".sbt"],
  aliases: ["Scala", "scala", "SBT", "Sbt", "sbt", "Dotty", "dotty"],
  mimetypes: ["text/x-scala-source", "text/x-scala", "text/x-sbt", "text/x-dotty"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/scala/scala"], resolve, reject);
      });
    } else {
      return import("./chunk-scala-F4YOFMYZ.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/scheme/scheme.contribution.js
init_define_process();
registerLanguage({
  id: "scheme",
  extensions: [".scm", ".ss", ".sch", ".rkt"],
  aliases: ["scheme", "Scheme"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/scheme/scheme"], resolve, reject);
      });
    } else {
      return import("./chunk-scheme-OAC7BXO3.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/scss/scss.contribution.js
init_define_process();
registerLanguage({
  id: "scss",
  extensions: [".scss"],
  aliases: ["Sass", "sass", "scss"],
  mimetypes: ["text/x-scss", "text/scss"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/scss/scss"], resolve, reject);
      });
    } else {
      return import("./chunk-scss-L4QIJYH6.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/shell/shell.contribution.js
init_define_process();
registerLanguage({
  id: "shell",
  extensions: [".sh", ".bash"],
  aliases: ["Shell", "sh"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/shell/shell"], resolve, reject);
      });
    } else {
      return import("./chunk-shell-V47DPO6J.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/solidity/solidity.contribution.js
init_define_process();
registerLanguage({
  id: "sol",
  extensions: [".sol"],
  aliases: ["sol", "solidity", "Solidity"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/solidity/solidity"], resolve, reject);
      });
    } else {
      return import("./chunk-solidity-OLNXW7I7.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/sophia/sophia.contribution.js
init_define_process();
registerLanguage({
  id: "aes",
  extensions: [".aes"],
  aliases: ["aes", "sophia", "Sophia"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/sophia/sophia"], resolve, reject);
      });
    } else {
      return import("./chunk-sophia-KF3XNYK5.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/sparql/sparql.contribution.js
init_define_process();
registerLanguage({
  id: "sparql",
  extensions: [".rq"],
  aliases: ["sparql", "SPARQL"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/sparql/sparql"], resolve, reject);
      });
    } else {
      return import("./chunk-sparql-ULO7GZ7O.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js
init_define_process();
registerLanguage({
  id: "sql",
  extensions: [".sql"],
  aliases: ["SQL"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/sql/sql"], resolve, reject);
      });
    } else {
      return import("./chunk-sql-UFTAFFDC.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/st/st.contribution.js
init_define_process();
registerLanguage({
  id: "st",
  extensions: [".st", ".iecst", ".iecplc", ".lc3lib"],
  aliases: ["StructuredText", "scl", "stl"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/st/st"], resolve, reject);
      });
    } else {
      return import("./chunk-st-PCQ6M4DC.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/swift/swift.contribution.js
init_define_process();
registerLanguage({
  id: "swift",
  aliases: ["Swift", "swift"],
  extensions: [".swift"],
  mimetypes: ["text/swift"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/swift/swift"], resolve, reject);
      });
    } else {
      return import("./chunk-swift-RDETNDOP.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/systemverilog/systemverilog.contribution.js
init_define_process();
registerLanguage({
  id: "systemverilog",
  extensions: [".sv", ".svh"],
  aliases: ["SV", "sv", "SystemVerilog", "systemverilog"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/systemverilog/systemverilog"], resolve, reject);
      });
    } else {
      return import("./chunk-systemverilog-LWAAB5FN.mjs");
    }
  }
});
registerLanguage({
  id: "verilog",
  extensions: [".v", ".vh"],
  aliases: ["V", "v", "Verilog", "verilog"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/systemverilog/systemverilog"], resolve, reject);
      });
    } else {
      return import("./chunk-systemverilog-LWAAB5FN.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/tcl/tcl.contribution.js
init_define_process();
registerLanguage({
  id: "tcl",
  extensions: [".tcl"],
  aliases: ["tcl", "Tcl", "tcltk", "TclTk", "tcl/tk", "Tcl/Tk"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/tcl/tcl"], resolve, reject);
      });
    } else {
      return import("./chunk-tcl-PRXK2JUU.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/twig/twig.contribution.js
init_define_process();
registerLanguage({
  id: "twig",
  extensions: [".twig"],
  aliases: ["Twig", "twig"],
  mimetypes: ["text/x-twig"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/twig/twig"], resolve, reject);
      });
    } else {
      return import("./chunk-twig-EQ7HOVNQ.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/vb/vb.contribution.js
init_define_process();
registerLanguage({
  id: "vb",
  extensions: [".vb"],
  aliases: ["Visual Basic", "vb"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/vb/vb"], resolve, reject);
      });
    } else {
      return import("./chunk-vb-NFCZO2A4.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js
init_define_process();
registerLanguage({
  id: "xml",
  extensions: [
    ".xml",
    ".dtd",
    ".ascx",
    ".csproj",
    ".config",
    ".wxi",
    ".wxl",
    ".wxs",
    ".xaml",
    ".svg",
    ".svgz",
    ".opf",
    ".xsl"
  ],
  firstLine: "(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)",
  aliases: ["XML", "xml"],
  mimetypes: ["text/xml", "application/xml", "application/xaml+xml", "application/xml-dtd"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/xml/xml"], resolve, reject);
      });
    } else {
      return import("./chunk-xml-WS3FK4DY.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js
init_define_process();
registerLanguage({
  id: "yaml",
  extensions: [".yaml", ".yml"],
  aliases: ["YAML", "yaml", "YML", "yml"],
  mimetypes: ["application/x-yaml", "text/x-yaml"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/yaml/yaml"], resolve, reject);
      });
    } else {
      return import("./chunk-yaml-UY5CYTGQ.mjs");
    }
  }
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/language/css/monaco.contribution.js
init_define_process();
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __reExport = /* @__PURE__ */ __name((target, mod2, secondTarget) => (__copyProps(target, mod2, "default"), secondTarget && __copyProps(secondTarget, mod2, "default")), "__reExport");
var monaco_editor_core_exports = {};
__reExport(monaco_editor_core_exports, editor_api_exports);
var LanguageServiceDefaultsImpl = /* @__PURE__ */ __name(class {
  _onDidChange = new monaco_editor_core_exports.Emitter();
  _options;
  _modeConfiguration;
  _languageId;
  constructor(languageId, options, modeConfiguration) {
    this._languageId = languageId;
    this.setOptions(options);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get diagnosticsOptions() {
    return this.options;
  }
  get options() {
    return this._options;
  }
  setOptions(options) {
    this._options = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setDiagnosticsOptions(options) {
    this.setOptions(options);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
}, "LanguageServiceDefaultsImpl");
var optionsDefault = {
  validate: true,
  lint: {
    compatibleVendorPrefixes: "ignore",
    vendorPrefix: "warning",
    duplicateProperties: "warning",
    emptyRules: "warning",
    importStatement: "ignore",
    boxModel: "ignore",
    universalSelector: "ignore",
    zeroUnits: "ignore",
    fontFaceProperties: "warning",
    hexColorLength: "error",
    argumentsInColorFunction: "error",
    unknownProperties: "warning",
    ieHack: "ignore",
    unknownVendorSpecificProperties: "ignore",
    propertyIgnoredDueToDisplay: "warning",
    important: "ignore",
    float: "ignore",
    idSelector: "ignore"
  },
  data: { useDefaultDataProvider: true },
  format: {
    newlineBetweenSelectors: true,
    newlineBetweenRules: true,
    spaceAroundSelectorSeparator: false,
    braceStyle: "collapse",
    maxPreserveNewLines: void 0,
    preserveNewLines: true
  }
};
var modeConfigurationDefault = {
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  definitions: true,
  references: true,
  documentHighlights: true,
  rename: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true,
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true
};
var cssDefaults = new LanguageServiceDefaultsImpl("css", optionsDefault, modeConfigurationDefault);
var scssDefaults = new LanguageServiceDefaultsImpl("scss", optionsDefault, modeConfigurationDefault);
var lessDefaults = new LanguageServiceDefaultsImpl("less", optionsDefault, modeConfigurationDefault);
monaco_editor_core_exports.languages.css = { cssDefaults, lessDefaults, scssDefaults };
function getMode() {
  if (false) {
    return new Promise((resolve, reject) => {
      __require(["vs/language/css/cssMode"], resolve, reject);
    });
  } else {
    return import("./chunk-cssMode-AZ3MTMKO.mjs");
  }
}
__name(getMode, "getMode");
monaco_editor_core_exports.languages.onLanguage("less", () => {
  getMode().then((mode) => mode.setupMode(lessDefaults));
});
monaco_editor_core_exports.languages.onLanguage("scss", () => {
  getMode().then((mode) => mode.setupMode(scssDefaults));
});
monaco_editor_core_exports.languages.onLanguage("css", () => {
  getMode().then((mode) => mode.setupMode(cssDefaults));
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/language/html/monaco.contribution.js
init_define_process();
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __reExport2 = /* @__PURE__ */ __name((target, mod2, secondTarget) => (__copyProps2(target, mod2, "default"), secondTarget && __copyProps2(secondTarget, mod2, "default")), "__reExport");
var monaco_editor_core_exports2 = {};
__reExport2(monaco_editor_core_exports2, editor_api_exports);
var LanguageServiceDefaultsImpl2 = /* @__PURE__ */ __name(class {
  _onDidChange = new monaco_editor_core_exports2.Emitter();
  _options;
  _modeConfiguration;
  _languageId;
  constructor(languageId, options, modeConfiguration) {
    this._languageId = languageId;
    this.setOptions(options);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get options() {
    return this._options;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  setOptions(options) {
    this._options = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
}, "LanguageServiceDefaultsImpl");
var formatDefaults = {
  tabSize: 4,
  insertSpaces: false,
  wrapLineLength: 120,
  unformatted: 'default": "a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map, object, q, samp, select, small, span, strong, sub, sup, textarea, tt, var',
  contentUnformatted: "pre",
  indentInnerHtml: false,
  preserveNewLines: true,
  maxPreserveNewLines: void 0,
  indentHandlebars: false,
  endWithNewline: false,
  extraLiners: "head, body, /html",
  wrapAttributes: "auto"
};
var optionsDefault2 = {
  format: formatDefaults,
  suggest: {},
  data: { useDefaultDataProvider: true }
};
function getConfigurationDefault(languageId) {
  return {
    completionItems: true,
    hovers: true,
    documentSymbols: true,
    links: true,
    documentHighlights: true,
    rename: true,
    colors: true,
    foldingRanges: true,
    selectionRanges: true,
    diagnostics: languageId === htmlLanguageId,
    documentFormattingEdits: languageId === htmlLanguageId,
    documentRangeFormattingEdits: languageId === htmlLanguageId
  };
}
__name(getConfigurationDefault, "getConfigurationDefault");
var htmlLanguageId = "html";
var handlebarsLanguageId = "handlebars";
var razorLanguageId = "razor";
var htmlLanguageService = registerHTMLLanguageService(htmlLanguageId, optionsDefault2, getConfigurationDefault(htmlLanguageId));
var htmlDefaults = htmlLanguageService.defaults;
var handlebarLanguageService = registerHTMLLanguageService(handlebarsLanguageId, optionsDefault2, getConfigurationDefault(handlebarsLanguageId));
var handlebarDefaults = handlebarLanguageService.defaults;
var razorLanguageService = registerHTMLLanguageService(razorLanguageId, optionsDefault2, getConfigurationDefault(razorLanguageId));
var razorDefaults = razorLanguageService.defaults;
monaco_editor_core_exports2.languages.html = {
  htmlDefaults,
  razorDefaults,
  handlebarDefaults,
  htmlLanguageService,
  handlebarLanguageService,
  razorLanguageService,
  registerHTMLLanguageService
};
function getMode2() {
  if (false) {
    return new Promise((resolve, reject) => {
      __require(["vs/language/html/htmlMode"], resolve, reject);
    });
  } else {
    return import("./chunk-htmlMode-DRUGFHAD.mjs");
  }
}
__name(getMode2, "getMode");
function registerHTMLLanguageService(languageId, options = optionsDefault2, modeConfiguration = getConfigurationDefault(languageId)) {
  const defaults = new LanguageServiceDefaultsImpl2(languageId, options, modeConfiguration);
  let mode;
  const onLanguageListener = monaco_editor_core_exports2.languages.onLanguage(languageId, async () => {
    mode = (await getMode2()).setupMode(defaults);
  });
  return {
    defaults,
    dispose() {
      onLanguageListener.dispose();
      mode?.dispose();
      mode = void 0;
    }
  };
}
__name(registerHTMLLanguageService, "registerHTMLLanguageService");

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/language/json/monaco.contribution.js
init_define_process();
var __defProp3 = Object.defineProperty;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames3 = Object.getOwnPropertyNames;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __copyProps3 = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames3(from))
      if (!__hasOwnProp3.call(to, key) && key !== except)
        __defProp3(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc3(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __reExport3 = /* @__PURE__ */ __name((target, mod2, secondTarget) => (__copyProps3(target, mod2, "default"), secondTarget && __copyProps3(secondTarget, mod2, "default")), "__reExport");
var monaco_editor_core_exports3 = {};
__reExport3(monaco_editor_core_exports3, editor_api_exports);
var LanguageServiceDefaultsImpl3 = /* @__PURE__ */ __name(class {
  _onDidChange = new monaco_editor_core_exports3.Emitter();
  _diagnosticsOptions;
  _modeConfiguration;
  _languageId;
  constructor(languageId, diagnosticsOptions, modeConfiguration) {
    this._languageId = languageId;
    this.setDiagnosticsOptions(diagnosticsOptions);
    this.setModeConfiguration(modeConfiguration);
  }
  get onDidChange() {
    return this._onDidChange.event;
  }
  get languageId() {
    return this._languageId;
  }
  get modeConfiguration() {
    return this._modeConfiguration;
  }
  get diagnosticsOptions() {
    return this._diagnosticsOptions;
  }
  setDiagnosticsOptions(options) {
    this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
  setModeConfiguration(modeConfiguration) {
    this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
    this._onDidChange.fire(this);
  }
}, "LanguageServiceDefaultsImpl");
var diagnosticDefault = {
  validate: true,
  allowComments: true,
  schemas: [],
  enableSchemaRequest: false,
  schemaRequest: "warning",
  schemaValidation: "warning",
  comments: "error",
  trailingCommas: "error"
};
var modeConfigurationDefault2 = {
  documentFormattingEdits: true,
  documentRangeFormattingEdits: true,
  completionItems: true,
  hovers: true,
  documentSymbols: true,
  tokens: true,
  colors: true,
  foldingRanges: true,
  diagnostics: true,
  selectionRanges: true
};
var jsonDefaults = new LanguageServiceDefaultsImpl3("json", diagnosticDefault, modeConfigurationDefault2);
monaco_editor_core_exports3.languages.json = { jsonDefaults };
function getMode3() {
  if (false) {
    return new Promise((resolve, reject) => {
      __require(["vs/language/json/jsonMode"], resolve, reject);
    });
  } else {
    return import("./chunk-jsonMode-OZVHVWXW.mjs");
  }
}
__name(getMode3, "getMode");
monaco_editor_core_exports3.languages.register({
  id: "json",
  extensions: [".json", ".bowerrc", ".jshintrc", ".jscsrc", ".eslintrc", ".babelrc", ".har"],
  aliases: ["JSON", "json"],
  mimetypes: ["application/json"]
});
monaco_editor_core_exports3.languages.onLanguage("json", () => {
  getMode3().then((mode) => mode.setupMode(jsonDefaults));
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/edcore.main.js
init_define_process();
var import_accessibilityHelp = __toESM(require_accessibilityHelp());

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js
init_define_process();
init_dom();
init_lifecycle();
init_editorExtensions();
init_platform();
var IPadShowKeyboard = class extends Disposable {
  constructor(editor) {
    super();
    this.editor = editor;
    this.widget = null;
    if (isIOS) {
      this._register(editor.onDidChangeConfiguration(() => this.update()));
      this.update();
    }
  }
  update() {
    const shouldHaveWidget = !this.editor.getOption(84);
    if (!this.widget && shouldHaveWidget) {
      this.widget = new ShowKeyboardWidget(this.editor);
    } else if (this.widget && !shouldHaveWidget) {
      this.widget.dispose();
      this.widget = null;
    }
  }
  dispose() {
    super.dispose();
    if (this.widget) {
      this.widget.dispose();
      this.widget = null;
    }
  }
};
__name(IPadShowKeyboard, "IPadShowKeyboard");
IPadShowKeyboard.ID = "editor.contrib.iPadShowKeyboard";
var ShowKeyboardWidget = class extends Disposable {
  constructor(editor) {
    super();
    this.editor = editor;
    this._domNode = document.createElement("textarea");
    this._domNode.className = "iPadShowKeyboard";
    this._register(addDisposableListener(this._domNode, "touchstart", (e) => {
      this.editor.focus();
    }));
    this._register(addDisposableListener(this._domNode, "focus", (e) => {
      this.editor.focus();
    }));
    this.editor.addOverlayWidget(this);
  }
  dispose() {
    this.editor.removeOverlayWidget(this);
    super.dispose();
  }
  getId() {
    return ShowKeyboardWidget.ID;
  }
  getDomNode() {
    return this._domNode;
  }
  getPosition() {
    return {
      preference: 1
    };
  }
};
__name(ShowKeyboardWidget, "ShowKeyboardWidget");
ShowKeyboardWidget.ID = "editor.contrib.ShowKeyboardWidget";
registerEditorContribution(IPadShowKeyboard.ID, IPadShowKeyboard, 3);

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/edcore.main.js
var import_inspectTokens = __toESM(require_inspectTokens());

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js
init_define_process();
init_platform2();
init_standaloneStrings();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/helpQuickAccess.js
init_define_process();
init_nls();
init_platform2();
init_lifecycle();
init_keybinding();
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var HelpQuickAccessProvider = /* @__PURE__ */ __name(class HelpQuickAccessProvider2 {
  constructor(quickInputService, keybindingService) {
    this.quickInputService = quickInputService;
    this.keybindingService = keybindingService;
    this.registry = Registry.as(Extensions.Quickaccess);
  }
  provide(picker) {
    const disposables = new DisposableStore();
    disposables.add(picker.onDidAccept(() => {
      const [item] = picker.selectedItems;
      if (item) {
        this.quickInputService.quickAccess.show(item.prefix, { preserveValue: true });
      }
    }));
    disposables.add(picker.onDidChangeValue((value) => {
      const providerDescriptor = this.registry.getQuickAccessProvider(value.substr(HelpQuickAccessProvider2.PREFIX.length));
      if (providerDescriptor && providerDescriptor.prefix && providerDescriptor.prefix !== HelpQuickAccessProvider2.PREFIX) {
        this.quickInputService.quickAccess.show(providerDescriptor.prefix, { preserveValue: true });
      }
    }));
    picker.items = this.getQuickAccessProviders().filter((p) => p.prefix !== HelpQuickAccessProvider2.PREFIX);
    return disposables;
  }
  getQuickAccessProviders() {
    const providers = this.registry.getQuickAccessProviders().sort((providerA, providerB) => providerA.prefix.localeCompare(providerB.prefix)).flatMap((provider) => this.createPicks(provider));
    return providers;
  }
  createPicks(provider) {
    return provider.helpEntries.map((helpEntry) => {
      const prefix = helpEntry.prefix || provider.prefix;
      const label = prefix || "\u2026";
      return {
        prefix,
        label,
        keybinding: helpEntry.commandId ? this.keybindingService.lookupKeybinding(helpEntry.commandId) : void 0,
        ariaLabel: localize("helpPickAriaLabel", "{0}, {1}", label, helpEntry.description),
        description: helpEntry.description
      };
    });
  }
}, "HelpQuickAccessProvider");
HelpQuickAccessProvider.PREFIX = "?";
HelpQuickAccessProvider = __decorate([
  __param(0, IQuickInputService),
  __param(1, IKeybindingService)
], HelpQuickAccessProvider);

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess.js
Registry.as(Extensions.Quickaccess).registerQuickAccessProvider({
  ctor: HelpQuickAccessProvider,
  prefix: "",
  helpEntries: [{ description: QuickHelpNLS.helpQuickAccessActionLabel }]
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/gotoLineQuickAccess.js
init_define_process();
init_lifecycle();
init_editorBrowser();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/editorNavigationQuickAccess.js
init_define_process();
init_functional();
init_lifecycle();
init_types();
init_editorBrowser();
init_model();
init_editorColorRegistry();
init_themeService();
var AbstractEditorNavigationQuickAccessProvider = class {
  constructor(options) {
    this.options = options;
    this.rangeHighlightDecorationId = void 0;
  }
  provide(picker, token) {
    var _a;
    const disposables = new DisposableStore();
    picker.canAcceptInBackground = !!((_a = this.options) === null || _a === void 0 ? void 0 : _a.canAcceptInBackground);
    picker.matchOnLabel = picker.matchOnDescription = picker.matchOnDetail = picker.sortByLabel = false;
    const pickerDisposable = disposables.add(new MutableDisposable());
    pickerDisposable.value = this.doProvide(picker, token);
    disposables.add(this.onDidActiveTextEditorControlChange(() => {
      pickerDisposable.value = void 0;
      pickerDisposable.value = this.doProvide(picker, token);
    }));
    return disposables;
  }
  doProvide(picker, token) {
    const disposables = new DisposableStore();
    const editor = this.activeTextEditorControl;
    if (editor && this.canProvideWithTextEditor(editor)) {
      const context = { editor };
      const codeEditor = getCodeEditor(editor);
      if (codeEditor) {
        let lastKnownEditorViewState = withNullAsUndefined(editor.saveViewState());
        disposables.add(codeEditor.onDidChangeCursorPosition(() => {
          lastKnownEditorViewState = withNullAsUndefined(editor.saveViewState());
        }));
        context.restoreViewState = () => {
          if (lastKnownEditorViewState && editor === this.activeTextEditorControl) {
            editor.restoreViewState(lastKnownEditorViewState);
          }
        };
        disposables.add(once(token.onCancellationRequested)(() => {
          var _a;
          return (_a = context.restoreViewState) === null || _a === void 0 ? void 0 : _a.call(context);
        }));
      }
      disposables.add(toDisposable(() => this.clearDecorations(editor)));
      disposables.add(this.provideWithTextEditor(context, picker, token));
    } else {
      disposables.add(this.provideWithoutTextEditor(picker, token));
    }
    return disposables;
  }
  canProvideWithTextEditor(editor) {
    return true;
  }
  gotoLocation({ editor }, options) {
    editor.setSelection(options.range);
    editor.revealRangeInCenter(options.range, 0);
    if (!options.preserveFocus) {
      editor.focus();
    }
  }
  getModel(editor) {
    var _a;
    return isDiffEditor(editor) ? (_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.modified : editor.getModel();
  }
  addDecorations(editor, range) {
    editor.changeDecorations((changeAccessor) => {
      const deleteDecorations = [];
      if (this.rangeHighlightDecorationId) {
        deleteDecorations.push(this.rangeHighlightDecorationId.overviewRulerDecorationId);
        deleteDecorations.push(this.rangeHighlightDecorationId.rangeHighlightId);
        this.rangeHighlightDecorationId = void 0;
      }
      const newDecorations = [
        {
          range,
          options: {
            description: "quick-access-range-highlight",
            className: "rangeHighlight",
            isWholeLine: true
          }
        },
        {
          range,
          options: {
            description: "quick-access-range-highlight-overview",
            overviewRuler: {
              color: themeColorFromId(overviewRulerRangeHighlight),
              position: OverviewRulerLane.Full
            }
          }
        }
      ];
      const [rangeHighlightId, overviewRulerDecorationId] = changeAccessor.deltaDecorations(deleteDecorations, newDecorations);
      this.rangeHighlightDecorationId = { rangeHighlightId, overviewRulerDecorationId };
    });
  }
  clearDecorations(editor) {
    const rangeHighlightDecorationId = this.rangeHighlightDecorationId;
    if (rangeHighlightDecorationId) {
      editor.changeDecorations((changeAccessor) => {
        changeAccessor.deltaDecorations([
          rangeHighlightDecorationId.overviewRulerDecorationId,
          rangeHighlightDecorationId.rangeHighlightId
        ], []);
      });
      this.rangeHighlightDecorationId = void 0;
    }
  }
};
__name(AbstractEditorNavigationQuickAccessProvider, "AbstractEditorNavigationQuickAccessProvider");

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/gotoLineQuickAccess.js
init_nls();
var AbstractGotoLineQuickAccessProvider = class extends AbstractEditorNavigationQuickAccessProvider {
  constructor() {
    super({ canAcceptInBackground: true });
  }
  provideWithoutTextEditor(picker) {
    const label = localize("cannotRunGotoLine", "Open a text editor first to go to a line.");
    picker.items = [{ label }];
    picker.ariaLabel = label;
    return Disposable.None;
  }
  provideWithTextEditor(context, picker, token) {
    const editor = context.editor;
    const disposables = new DisposableStore();
    disposables.add(picker.onDidAccept((event) => {
      const [item] = picker.selectedItems;
      if (item) {
        if (!this.isValidLineNumber(editor, item.lineNumber)) {
          return;
        }
        this.gotoLocation(context, { range: this.toRange(item.lineNumber, item.column), keyMods: picker.keyMods, preserveFocus: event.inBackground });
        if (!event.inBackground) {
          picker.hide();
        }
      }
    }));
    const updatePickerAndEditor = /* @__PURE__ */ __name(() => {
      const position = this.parsePosition(editor, picker.value.trim().substr(AbstractGotoLineQuickAccessProvider.PREFIX.length));
      const label = this.getPickLabel(editor, position.lineNumber, position.column);
      picker.items = [{
        lineNumber: position.lineNumber,
        column: position.column,
        label
      }];
      picker.ariaLabel = label;
      if (!this.isValidLineNumber(editor, position.lineNumber)) {
        this.clearDecorations(editor);
        return;
      }
      const range = this.toRange(position.lineNumber, position.column);
      editor.revealRangeInCenter(range, 0);
      this.addDecorations(editor, range);
    }, "updatePickerAndEditor");
    updatePickerAndEditor();
    disposables.add(picker.onDidChangeValue(() => updatePickerAndEditor()));
    const codeEditor = getCodeEditor(editor);
    if (codeEditor) {
      const options = codeEditor.getOptions();
      const lineNumbers = options.get(62);
      if (lineNumbers.renderType === 2) {
        codeEditor.updateOptions({ lineNumbers: "on" });
        disposables.add(toDisposable(() => codeEditor.updateOptions({ lineNumbers: "relative" })));
      }
    }
    return disposables;
  }
  toRange(lineNumber = 1, column = 1) {
    return {
      startLineNumber: lineNumber,
      startColumn: column,
      endLineNumber: lineNumber,
      endColumn: column
    };
  }
  parsePosition(editor, value) {
    const numbers = value.split(/,|:|#/).map((part) => parseInt(part, 10)).filter((part) => !isNaN(part));
    const endLine = this.lineCount(editor) + 1;
    return {
      lineNumber: numbers[0] > 0 ? numbers[0] : endLine + numbers[0],
      column: numbers[1]
    };
  }
  getPickLabel(editor, lineNumber, column) {
    if (this.isValidLineNumber(editor, lineNumber)) {
      if (this.isValidColumn(editor, lineNumber, column)) {
        return localize("gotoLineColumnLabel", "Go to line {0} and character {1}.", lineNumber, column);
      }
      return localize("gotoLineLabel", "Go to line {0}.", lineNumber);
    }
    const position = editor.getPosition() || { lineNumber: 1, column: 1 };
    const lineCount = this.lineCount(editor);
    if (lineCount > 1) {
      return localize("gotoLineLabelEmptyWithLimit", "Current Line: {0}, Character: {1}. Type a line number between 1 and {2} to navigate to.", position.lineNumber, position.column, lineCount);
    }
    return localize("gotoLineLabelEmpty", "Current Line: {0}, Character: {1}. Type a line number to navigate to.", position.lineNumber, position.column);
  }
  isValidLineNumber(editor, lineNumber) {
    if (!lineNumber || typeof lineNumber !== "number") {
      return false;
    }
    return lineNumber > 0 && lineNumber <= this.lineCount(editor);
  }
  isValidColumn(editor, lineNumber, column) {
    if (!column || typeof column !== "number") {
      return false;
    }
    const model = this.getModel(editor);
    if (!model) {
      return false;
    }
    const positionCandidate = { lineNumber, column };
    return model.validatePosition(positionCandidate).equals(positionCandidate);
  }
  lineCount(editor) {
    var _a, _b;
    return (_b = (_a = this.getModel(editor)) === null || _a === void 0 ? void 0 : _a.getLineCount()) !== null && _b !== void 0 ? _b : 0;
  }
};
__name(AbstractGotoLineQuickAccessProvider, "AbstractGotoLineQuickAccessProvider");
AbstractGotoLineQuickAccessProvider.PREFIX = ":";

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess.js
init_platform2();
init_codeEditorService();
init_types();
init_standaloneStrings();
init_event();
init_editorExtensions();
init_editorContextKeys();
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param2 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var StandaloneGotoLineQuickAccessProvider = /* @__PURE__ */ __name(class StandaloneGotoLineQuickAccessProvider2 extends AbstractGotoLineQuickAccessProvider {
  constructor(editorService) {
    super();
    this.editorService = editorService;
    this.onDidActiveTextEditorControlChange = Event.None;
  }
  get activeTextEditorControl() {
    return withNullAsUndefined(this.editorService.getFocusedCodeEditor());
  }
}, "StandaloneGotoLineQuickAccessProvider");
StandaloneGotoLineQuickAccessProvider = __decorate2([
  __param2(0, ICodeEditorService)
], StandaloneGotoLineQuickAccessProvider);
var GotoLineAction = class extends EditorAction {
  constructor() {
    super({
      id: GotoLineAction.ID,
      label: GoToLineNLS.gotoLineActionLabel,
      alias: "Go to Line/Column...",
      precondition: void 0,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 2048 | 37,
        mac: { primary: 256 | 37 },
        weight: 100
      }
    });
  }
  run(accessor) {
    accessor.get(IQuickInputService).quickAccess.show(StandaloneGotoLineQuickAccessProvider.PREFIX);
  }
};
__name(GotoLineAction, "GotoLineAction");
GotoLineAction.ID = "editor.action.gotoLine";
registerEditorAction(GotoLineAction);
Registry.as(Extensions.Quickaccess).registerQuickAccessProvider({
  ctor: StandaloneGotoLineQuickAccessProvider,
  prefix: StandaloneGotoLineQuickAccessProvider.PREFIX,
  helpEntries: [{ description: GoToLineNLS.gotoLineActionLabel, commandId: GotoLineAction.ID }]
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/gotoSymbolQuickAccess.js
init_define_process();
init_async();
init_cancellation();
init_codicons();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/base/common/fuzzyScorer.js
init_define_process();
init_path();
init_platform();
init_strings();
var NO_SCORE2 = [void 0, []];
function scoreFuzzy2(target, query, patternStart = 0, wordStart = 0) {
  const preparedQuery = query;
  if (preparedQuery.values && preparedQuery.values.length > 1) {
    return doScoreFuzzy2Multiple(target, preparedQuery.values, patternStart, wordStart);
  }
  return doScoreFuzzy2Single(target, query, patternStart, wordStart);
}
__name(scoreFuzzy2, "scoreFuzzy2");
function doScoreFuzzy2Multiple(target, query, patternStart, wordStart) {
  let totalScore = 0;
  const totalMatches = [];
  for (const queryPiece of query) {
    const [score, matches] = doScoreFuzzy2Single(target, queryPiece, patternStart, wordStart);
    if (typeof score !== "number") {
      return NO_SCORE2;
    }
    totalScore += score;
    totalMatches.push(...matches);
  }
  return [totalScore, normalizeMatches(totalMatches)];
}
__name(doScoreFuzzy2Multiple, "doScoreFuzzy2Multiple");
function doScoreFuzzy2Single(target, query, patternStart, wordStart) {
  const score = fuzzyScore(query.original, query.originalLowercase, patternStart, target, target.toLowerCase(), wordStart, { firstMatchCanBeWeak: true, boostFullMatch: true });
  if (!score) {
    return NO_SCORE2;
  }
  return [score[0], createMatches(score)];
}
__name(doScoreFuzzy2Single, "doScoreFuzzy2Single");
var NO_ITEM_SCORE = Object.freeze({ score: 0 });
function normalizeMatches(matches) {
  const sortedMatches = matches.sort((matchA, matchB) => {
    return matchA.start - matchB.start;
  });
  const normalizedMatches = [];
  let currentMatch = void 0;
  for (const match of sortedMatches) {
    if (!currentMatch || !matchOverlaps(currentMatch, match)) {
      currentMatch = match;
      normalizedMatches.push(match);
    } else {
      currentMatch.start = Math.min(currentMatch.start, match.start);
      currentMatch.end = Math.max(currentMatch.end, match.end);
    }
  }
  return normalizedMatches;
}
__name(normalizeMatches, "normalizeMatches");
function matchOverlaps(matchA, matchB) {
  if (matchA.end < matchB.start) {
    return false;
  }
  if (matchB.end < matchA.start) {
    return false;
  }
  return true;
}
__name(matchOverlaps, "matchOverlaps");
function queryExpectsExactMatch(query) {
  return query.startsWith('"') && query.endsWith('"');
}
__name(queryExpectsExactMatch, "queryExpectsExactMatch");
var MULTIPLE_QUERY_VALUES_SEPARATOR = " ";
function prepareQuery(original) {
  if (typeof original !== "string") {
    original = "";
  }
  const originalLowercase = original.toLowerCase();
  const { pathNormalized, normalized, normalizedLowercase } = normalizeQuery(original);
  const containsPathSeparator = pathNormalized.indexOf(sep) >= 0;
  const expectExactMatch = queryExpectsExactMatch(original);
  let values = void 0;
  const originalSplit = original.split(MULTIPLE_QUERY_VALUES_SEPARATOR);
  if (originalSplit.length > 1) {
    for (const originalPiece of originalSplit) {
      const expectExactMatchPiece = queryExpectsExactMatch(originalPiece);
      const { pathNormalized: pathNormalizedPiece, normalized: normalizedPiece, normalizedLowercase: normalizedLowercasePiece } = normalizeQuery(originalPiece);
      if (normalizedPiece) {
        if (!values) {
          values = [];
        }
        values.push({
          original: originalPiece,
          originalLowercase: originalPiece.toLowerCase(),
          pathNormalized: pathNormalizedPiece,
          normalized: normalizedPiece,
          normalizedLowercase: normalizedLowercasePiece,
          expectContiguousMatch: expectExactMatchPiece
        });
      }
    }
  }
  return { original, originalLowercase, pathNormalized, normalized, normalizedLowercase, values, containsPathSeparator, expectContiguousMatch: expectExactMatch };
}
__name(prepareQuery, "prepareQuery");
function normalizeQuery(original) {
  let pathNormalized;
  if (isWindows) {
    pathNormalized = original.replace(/\//g, sep);
  } else {
    pathNormalized = original.replace(/\\/g, sep);
  }
  const normalized = stripWildcards(pathNormalized).replace(/\s|"/g, "");
  return {
    pathNormalized,
    normalized,
    normalizedLowercase: normalized.toLowerCase()
  };
}
__name(normalizeQuery, "normalizeQuery");
function pieceToQuery(arg1) {
  if (Array.isArray(arg1)) {
    return prepareQuery(arg1.map((piece) => piece.original).join(MULTIPLE_QUERY_VALUES_SEPARATOR));
  }
  return prepareQuery(arg1.original);
}
__name(pieceToQuery, "pieceToQuery");

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/gotoSymbolQuickAccess.js
init_lifecycle();
init_strings();
init_range();
init_languages();
init_outlineModel();
init_nls();
init_languageFeatures();
init_arrays();
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param3 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AbstractGotoSymbolQuickAccessProvider = /* @__PURE__ */ __name(class AbstractGotoSymbolQuickAccessProvider2 extends AbstractEditorNavigationQuickAccessProvider {
  constructor(_languageFeaturesService, _outlineModelService, options = /* @__PURE__ */ Object.create(null)) {
    super(options);
    this._languageFeaturesService = _languageFeaturesService;
    this._outlineModelService = _outlineModelService;
    this.options = options;
    this.options.canAcceptInBackground = true;
  }
  provideWithoutTextEditor(picker) {
    this.provideLabelPick(picker, localize("cannotRunGotoSymbolWithoutEditor", "To go to a symbol, first open a text editor with symbol information."));
    return Disposable.None;
  }
  provideWithTextEditor(context, picker, token) {
    const editor = context.editor;
    const model = this.getModel(editor);
    if (!model) {
      return Disposable.None;
    }
    if (this._languageFeaturesService.documentSymbolProvider.has(model)) {
      return this.doProvideWithEditorSymbols(context, model, picker, token);
    }
    return this.doProvideWithoutEditorSymbols(context, model, picker, token);
  }
  doProvideWithoutEditorSymbols(context, model, picker, token) {
    const disposables = new DisposableStore();
    this.provideLabelPick(picker, localize("cannotRunGotoSymbolWithoutSymbolProvider", "The active text editor does not provide symbol information."));
    (() => __awaiter(this, void 0, void 0, function* () {
      const result = yield this.waitForLanguageSymbolRegistry(model, disposables);
      if (!result || token.isCancellationRequested) {
        return;
      }
      disposables.add(this.doProvideWithEditorSymbols(context, model, picker, token));
    }))();
    return disposables;
  }
  provideLabelPick(picker, label) {
    picker.items = [{ label, index: 0, kind: 14 }];
    picker.ariaLabel = label;
  }
  waitForLanguageSymbolRegistry(model, disposables) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._languageFeaturesService.documentSymbolProvider.has(model)) {
        return true;
      }
      const symbolProviderRegistryPromise = new DeferredPromise();
      const symbolProviderListener = disposables.add(this._languageFeaturesService.documentSymbolProvider.onDidChange(() => {
        if (this._languageFeaturesService.documentSymbolProvider.has(model)) {
          symbolProviderListener.dispose();
          symbolProviderRegistryPromise.complete(true);
        }
      }));
      disposables.add(toDisposable(() => symbolProviderRegistryPromise.complete(false)));
      return symbolProviderRegistryPromise.p;
    });
  }
  doProvideWithEditorSymbols(context, model, picker, token) {
    var _a;
    const editor = context.editor;
    const disposables = new DisposableStore();
    disposables.add(picker.onDidAccept((event) => {
      const [item] = picker.selectedItems;
      if (item && item.range) {
        this.gotoLocation(context, { range: item.range.selection, keyMods: picker.keyMods, preserveFocus: event.inBackground });
        if (!event.inBackground) {
          picker.hide();
        }
      }
    }));
    disposables.add(picker.onDidTriggerItemButton(({ item }) => {
      if (item && item.range) {
        this.gotoLocation(context, { range: item.range.selection, keyMods: picker.keyMods, forceSideBySide: true });
        picker.hide();
      }
    }));
    const symbolsPromise = this.getDocumentSymbols(model, token);
    let picksCts = void 0;
    const updatePickerItems = /* @__PURE__ */ __name((positionToEnclose) => __awaiter(this, void 0, void 0, function* () {
      picksCts === null || picksCts === void 0 ? void 0 : picksCts.dispose(true);
      picker.busy = false;
      picksCts = new CancellationTokenSource(token);
      picker.busy = true;
      try {
        const query = prepareQuery(picker.value.substr(AbstractGotoSymbolQuickAccessProvider2.PREFIX.length).trim());
        const items = yield this.doGetSymbolPicks(symbolsPromise, query, void 0, picksCts.token);
        if (token.isCancellationRequested) {
          return;
        }
        if (items.length > 0) {
          picker.items = items;
          if (positionToEnclose && query.original.length === 0) {
            const candidate = findLast(items, (item) => Boolean(item.type !== "separator" && item.range && Range.containsPosition(item.range.decoration, positionToEnclose)));
            if (candidate) {
              picker.activeItems = [candidate];
            }
          }
        } else {
          if (query.original.length > 0) {
            this.provideLabelPick(picker, localize("noMatchingSymbolResults", "No matching editor symbols"));
          } else {
            this.provideLabelPick(picker, localize("noSymbolResults", "No editor symbols"));
          }
        }
      } finally {
        if (!token.isCancellationRequested) {
          picker.busy = false;
        }
      }
    }), "updatePickerItems");
    disposables.add(picker.onDidChangeValue(() => updatePickerItems(void 0)));
    updatePickerItems((_a = editor.getSelection()) === null || _a === void 0 ? void 0 : _a.getPosition());
    let ignoreFirstActiveEvent = 2;
    disposables.add(picker.onDidChangeActive(() => {
      const [item] = picker.activeItems;
      if (item && item.range) {
        if (ignoreFirstActiveEvent-- > 0) {
          return;
        }
        editor.revealRangeInCenter(item.range.selection, 0);
        this.addDecorations(editor, item.range.decoration);
      }
    }));
    return disposables;
  }
  doGetSymbolPicks(symbolsPromise, query, options, token) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
      const symbols = yield symbolsPromise;
      if (token.isCancellationRequested) {
        return [];
      }
      const filterBySymbolKind = query.original.indexOf(AbstractGotoSymbolQuickAccessProvider2.SCOPE_PREFIX) === 0;
      const filterPos = filterBySymbolKind ? 1 : 0;
      let symbolQuery;
      let containerQuery;
      if (query.values && query.values.length > 1) {
        symbolQuery = pieceToQuery(query.values[0]);
        containerQuery = pieceToQuery(query.values.slice(1));
      } else {
        symbolQuery = query;
      }
      let buttons;
      const openSideBySideDirection = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.openSideBySideDirection) === null || _b === void 0 ? void 0 : _b.call(_a);
      if (openSideBySideDirection) {
        buttons = [{
          iconClass: openSideBySideDirection === "right" ? Codicon.splitHorizontal.classNames : Codicon.splitVertical.classNames,
          tooltip: openSideBySideDirection === "right" ? localize("openToSide", "Open to the Side") : localize("openToBottom", "Open to the Bottom")
        }];
      }
      const filteredSymbolPicks = [];
      for (let index = 0; index < symbols.length; index++) {
        const symbol = symbols[index];
        const symbolLabel = trim(symbol.name);
        const symbolLabelWithIcon = `$(${SymbolKinds.toIcon(symbol.kind).id}) ${symbolLabel}`;
        const symbolLabelIconOffset = symbolLabelWithIcon.length - symbolLabel.length;
        let containerLabel = symbol.containerName;
        if (options === null || options === void 0 ? void 0 : options.extraContainerLabel) {
          if (containerLabel) {
            containerLabel = `${options.extraContainerLabel} \u2022 ${containerLabel}`;
          } else {
            containerLabel = options.extraContainerLabel;
          }
        }
        let symbolScore = void 0;
        let symbolMatches = void 0;
        let containerScore = void 0;
        let containerMatches = void 0;
        if (query.original.length > filterPos) {
          let skipContainerQuery = false;
          if (symbolQuery !== query) {
            [symbolScore, symbolMatches] = scoreFuzzy2(symbolLabelWithIcon, Object.assign(Object.assign({}, query), { values: void 0 }), filterPos, symbolLabelIconOffset);
            if (typeof symbolScore === "number") {
              skipContainerQuery = true;
            }
          }
          if (typeof symbolScore !== "number") {
            [symbolScore, symbolMatches] = scoreFuzzy2(symbolLabelWithIcon, symbolQuery, filterPos, symbolLabelIconOffset);
            if (typeof symbolScore !== "number") {
              continue;
            }
          }
          if (!skipContainerQuery && containerQuery) {
            if (containerLabel && containerQuery.original.length > 0) {
              [containerScore, containerMatches] = scoreFuzzy2(containerLabel, containerQuery);
            }
            if (typeof containerScore !== "number") {
              continue;
            }
            if (typeof symbolScore === "number") {
              symbolScore += containerScore;
            }
          }
        }
        const deprecated = symbol.tags && symbol.tags.indexOf(1) >= 0;
        filteredSymbolPicks.push({
          index,
          kind: symbol.kind,
          score: symbolScore,
          label: symbolLabelWithIcon,
          ariaLabel: symbolLabel,
          description: containerLabel,
          highlights: deprecated ? void 0 : {
            label: symbolMatches,
            description: containerMatches
          },
          range: {
            selection: Range.collapseToStart(symbol.selectionRange),
            decoration: symbol.range
          },
          strikethrough: deprecated,
          buttons
        });
      }
      const sortedFilteredSymbolPicks = filteredSymbolPicks.sort((symbolA, symbolB) => filterBySymbolKind ? this.compareByKindAndScore(symbolA, symbolB) : this.compareByScore(symbolA, symbolB));
      let symbolPicks = [];
      if (filterBySymbolKind) {
        let updateLastSeparatorLabel = function() {
          if (lastSeparator && typeof lastSymbolKind === "number" && lastSymbolKindCounter > 0) {
            lastSeparator.label = format(NLS_SYMBOL_KIND_CACHE[lastSymbolKind] || FALLBACK_NLS_SYMBOL_KIND, lastSymbolKindCounter);
          }
        };
        __name(updateLastSeparatorLabel, "updateLastSeparatorLabel");
        let lastSymbolKind = void 0;
        let lastSeparator = void 0;
        let lastSymbolKindCounter = 0;
        for (const symbolPick of sortedFilteredSymbolPicks) {
          if (lastSymbolKind !== symbolPick.kind) {
            updateLastSeparatorLabel();
            lastSymbolKind = symbolPick.kind;
            lastSymbolKindCounter = 1;
            lastSeparator = { type: "separator" };
            symbolPicks.push(lastSeparator);
          } else {
            lastSymbolKindCounter++;
          }
          symbolPicks.push(symbolPick);
        }
        updateLastSeparatorLabel();
      } else if (sortedFilteredSymbolPicks.length > 0) {
        symbolPicks = [
          { label: localize("symbols", "symbols ({0})", filteredSymbolPicks.length), type: "separator" },
          ...sortedFilteredSymbolPicks
        ];
      }
      return symbolPicks;
    });
  }
  compareByScore(symbolA, symbolB) {
    if (typeof symbolA.score !== "number" && typeof symbolB.score === "number") {
      return 1;
    } else if (typeof symbolA.score === "number" && typeof symbolB.score !== "number") {
      return -1;
    }
    if (typeof symbolA.score === "number" && typeof symbolB.score === "number") {
      if (symbolA.score > symbolB.score) {
        return -1;
      } else if (symbolA.score < symbolB.score) {
        return 1;
      }
    }
    if (symbolA.index < symbolB.index) {
      return -1;
    } else if (symbolA.index > symbolB.index) {
      return 1;
    }
    return 0;
  }
  compareByKindAndScore(symbolA, symbolB) {
    const kindA = NLS_SYMBOL_KIND_CACHE[symbolA.kind] || FALLBACK_NLS_SYMBOL_KIND;
    const kindB = NLS_SYMBOL_KIND_CACHE[symbolB.kind] || FALLBACK_NLS_SYMBOL_KIND;
    const result = kindA.localeCompare(kindB);
    if (result === 0) {
      return this.compareByScore(symbolA, symbolB);
    }
    return result;
  }
  getDocumentSymbols(document2, token) {
    return __awaiter(this, void 0, void 0, function* () {
      const model = yield this._outlineModelService.getOrCreate(document2, token);
      return token.isCancellationRequested ? [] : model.asListOfDocumentSymbols();
    });
  }
}, "AbstractGotoSymbolQuickAccessProvider");
AbstractGotoSymbolQuickAccessProvider.PREFIX = "@";
AbstractGotoSymbolQuickAccessProvider.SCOPE_PREFIX = ":";
AbstractGotoSymbolQuickAccessProvider.PREFIX_BY_CATEGORY = `${AbstractGotoSymbolQuickAccessProvider.PREFIX}${AbstractGotoSymbolQuickAccessProvider.SCOPE_PREFIX}`;
AbstractGotoSymbolQuickAccessProvider = __decorate3([
  __param3(0, ILanguageFeaturesService),
  __param3(1, IOutlineModelService)
], AbstractGotoSymbolQuickAccessProvider);
var FALLBACK_NLS_SYMBOL_KIND = localize("property", "properties ({0})");
var NLS_SYMBOL_KIND_CACHE = {
  [5]: localize("method", "methods ({0})"),
  [11]: localize("function", "functions ({0})"),
  [8]: localize("_constructor", "constructors ({0})"),
  [12]: localize("variable", "variables ({0})"),
  [4]: localize("class", "classes ({0})"),
  [22]: localize("struct", "structs ({0})"),
  [23]: localize("event", "events ({0})"),
  [24]: localize("operator", "operators ({0})"),
  [10]: localize("interface", "interfaces ({0})"),
  [2]: localize("namespace", "namespaces ({0})"),
  [3]: localize("package", "packages ({0})"),
  [25]: localize("typeParameter", "type parameters ({0})"),
  [1]: localize("modules", "modules ({0})"),
  [6]: localize("property", "properties ({0})"),
  [9]: localize("enum", "enumerations ({0})"),
  [21]: localize("enumMember", "enumeration members ({0})"),
  [14]: localize("string", "strings ({0})"),
  [0]: localize("file", "files ({0})"),
  [17]: localize("array", "arrays ({0})"),
  [15]: localize("number", "numbers ({0})"),
  [16]: localize("boolean", "booleans ({0})"),
  [18]: localize("object", "objects ({0})"),
  [19]: localize("key", "keys ({0})"),
  [7]: localize("field", "fields ({0})"),
  [13]: localize("constant", "constants ({0})")
};

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess.js
init_platform2();
init_codeEditorService();
init_types();
init_standaloneStrings();
init_event();
init_editorExtensions();
init_editorContextKeys();
init_outlineModel();
init_languageFeatures();
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param4 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var StandaloneGotoSymbolQuickAccessProvider = /* @__PURE__ */ __name(class StandaloneGotoSymbolQuickAccessProvider2 extends AbstractGotoSymbolQuickAccessProvider {
  constructor(editorService, languageFeaturesService, outlineModelService) {
    super(languageFeaturesService, outlineModelService);
    this.editorService = editorService;
    this.onDidActiveTextEditorControlChange = Event.None;
  }
  get activeTextEditorControl() {
    return withNullAsUndefined(this.editorService.getFocusedCodeEditor());
  }
}, "StandaloneGotoSymbolQuickAccessProvider");
StandaloneGotoSymbolQuickAccessProvider = __decorate4([
  __param4(0, ICodeEditorService),
  __param4(1, ILanguageFeaturesService),
  __param4(2, IOutlineModelService)
], StandaloneGotoSymbolQuickAccessProvider);
var GotoSymbolAction = class extends EditorAction {
  constructor() {
    super({
      id: GotoSymbolAction.ID,
      label: QuickOutlineNLS.quickOutlineActionLabel,
      alias: "Go to Symbol...",
      precondition: EditorContextKeys.hasDocumentSymbolProvider,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 2048 | 1024 | 45,
        weight: 100
      },
      contextMenuOpts: {
        group: "navigation",
        order: 3
      }
    });
  }
  run(accessor) {
    accessor.get(IQuickInputService).quickAccess.show(AbstractGotoSymbolQuickAccessProvider.PREFIX);
  }
};
__name(GotoSymbolAction, "GotoSymbolAction");
GotoSymbolAction.ID = "editor.action.quickOutline";
registerEditorAction(GotoSymbolAction);
Registry.as(Extensions.Quickaccess).registerQuickAccessProvider({
  ctor: StandaloneGotoSymbolQuickAccessProvider,
  prefix: AbstractGotoSymbolQuickAccessProvider.PREFIX,
  helpEntries: [
    { description: QuickOutlineNLS.quickOutlineActionLabel, prefix: AbstractGotoSymbolQuickAccessProvider.PREFIX, commandId: GotoSymbolAction.ID },
    { description: QuickOutlineNLS.quickOutlineByCategoryActionLabel, prefix: AbstractGotoSymbolQuickAccessProvider.PREFIX_BY_CATEGORY }
  ]
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js
init_define_process();
init_platform2();
init_standaloneStrings();
init_codeEditorService();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/commandsQuickAccess.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/commandsQuickAccess.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/base/common/errorMessage.js
init_define_process();
init_arrays();
init_types();
init_nls();
function exceptionToErrorMessage(exception, verbose) {
  if (verbose && (exception.stack || exception.stacktrace)) {
    return localize("stackTrace.format", "{0}: {1}", detectSystemErrorMessage(exception), stackToString(exception.stack) || stackToString(exception.stacktrace));
  }
  return detectSystemErrorMessage(exception);
}
__name(exceptionToErrorMessage, "exceptionToErrorMessage");
function stackToString(stack) {
  if (Array.isArray(stack)) {
    return stack.join("\n");
  }
  return stack;
}
__name(stackToString, "stackToString");
function detectSystemErrorMessage(exception) {
  if (typeof exception.code === "string" && typeof exception.errno === "number" && typeof exception.syscall === "string") {
    return localize("nodeExceptionMessage", "A system error occurred ({0})", exception.message);
  }
  return exception.message || localize("error.defaultMessage", "An unknown error occurred. Please consult the log for more details.");
}
__name(detectSystemErrorMessage, "detectSystemErrorMessage");
function toErrorMessage(error = null, verbose = false) {
  if (!error) {
    return localize("error.defaultMessage", "An unknown error occurred. Please consult the log for more details.");
  }
  if (Array.isArray(error)) {
    const errors = coalesce(error);
    const msg = toErrorMessage(errors[0], verbose);
    if (errors.length > 1) {
      return localize("error.moreErrors", "{0} ({1} errors in total)", msg, errors.length);
    }
    return msg;
  }
  if (isString(error)) {
    return error;
  }
  if (error.detail) {
    const detail = error.detail;
    if (detail.error) {
      return exceptionToErrorMessage(detail.error, verbose);
    }
    if (detail.exception) {
      return exceptionToErrorMessage(detail.exception, verbose);
    }
  }
  if (error.stack) {
    return exceptionToErrorMessage(error, verbose);
  }
  if (error.message) {
    return error.message;
  }
  return localize("error.defaultMessage", "An unknown error occurred. Please consult the log for more details.");
}
__name(toErrorMessage, "toErrorMessage");

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/commandsQuickAccess.js
init_errors();
init_lifecycle();
init_map();
init_types();
init_nls();
init_commands();
init_configuration();
init_instantiation();
init_keybinding();

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/pickerQuickAccess.js
init_define_process();
init_async();
init_cancellation();
init_lifecycle();
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var TriggerAction;
(function(TriggerAction2) {
  TriggerAction2[TriggerAction2["NO_ACTION"] = 0] = "NO_ACTION";
  TriggerAction2[TriggerAction2["CLOSE_PICKER"] = 1] = "CLOSE_PICKER";
  TriggerAction2[TriggerAction2["REFRESH_PICKER"] = 2] = "REFRESH_PICKER";
  TriggerAction2[TriggerAction2["REMOVE_ITEM"] = 3] = "REMOVE_ITEM";
})(TriggerAction || (TriggerAction = {}));
function isPicksWithActive(obj) {
  const candidate = obj;
  return Array.isArray(candidate.items);
}
__name(isPicksWithActive, "isPicksWithActive");
function isFastAndSlowPicks(obj) {
  const candidate = obj;
  return !!candidate.picks && candidate.additionalPicks instanceof Promise;
}
__name(isFastAndSlowPicks, "isFastAndSlowPicks");
var PickerQuickAccessProvider = class extends Disposable {
  constructor(prefix, options) {
    super();
    this.prefix = prefix;
    this.options = options;
  }
  provide(picker, token, runOptions) {
    var _a;
    const disposables = new DisposableStore();
    picker.canAcceptInBackground = !!((_a = this.options) === null || _a === void 0 ? void 0 : _a.canAcceptInBackground);
    picker.matchOnLabel = picker.matchOnDescription = picker.matchOnDetail = picker.sortByLabel = false;
    let picksCts = void 0;
    const picksDisposable = disposables.add(new MutableDisposable());
    const updatePickerItems = /* @__PURE__ */ __name(() => __awaiter2(this, void 0, void 0, function* () {
      const picksDisposables = picksDisposable.value = new DisposableStore();
      picksCts === null || picksCts === void 0 ? void 0 : picksCts.dispose(true);
      picker.busy = false;
      picksCts = new CancellationTokenSource(token);
      const picksToken = picksCts.token;
      const picksFilter = picker.value.substr(this.prefix.length).trim();
      const providedPicks = this._getPicks(picksFilter, picksDisposables, picksToken, runOptions);
      const applyPicks = /* @__PURE__ */ __name((picks, skipEmpty) => {
        var _a2;
        let items;
        let activeItem = void 0;
        if (isPicksWithActive(picks)) {
          items = picks.items;
          activeItem = picks.active;
        } else {
          items = picks;
        }
        if (items.length === 0) {
          if (skipEmpty) {
            return false;
          }
          if (picksFilter.length > 0 && ((_a2 = this.options) === null || _a2 === void 0 ? void 0 : _a2.noResultsPick)) {
            items = [this.options.noResultsPick];
          }
        }
        picker.items = items;
        if (activeItem) {
          picker.activeItems = [activeItem];
        }
        return true;
      }, "applyPicks");
      if (providedPicks === null) {
      } else if (isFastAndSlowPicks(providedPicks)) {
        let fastPicksApplied = false;
        let slowPicksApplied = false;
        yield Promise.all([
          (() => __awaiter2(this, void 0, void 0, function* () {
            yield timeout(PickerQuickAccessProvider.FAST_PICKS_RACE_DELAY);
            if (picksToken.isCancellationRequested) {
              return;
            }
            if (!slowPicksApplied) {
              fastPicksApplied = applyPicks(providedPicks.picks, true);
            }
          }))(),
          (() => __awaiter2(this, void 0, void 0, function* () {
            picker.busy = true;
            try {
              const awaitedAdditionalPicks = yield providedPicks.additionalPicks;
              if (picksToken.isCancellationRequested) {
                return;
              }
              let picks;
              let activePick = void 0;
              if (isPicksWithActive(providedPicks.picks)) {
                picks = providedPicks.picks.items;
                activePick = providedPicks.picks.active;
              } else {
                picks = providedPicks.picks;
              }
              let additionalPicks;
              let additionalActivePick = void 0;
              if (isPicksWithActive(awaitedAdditionalPicks)) {
                additionalPicks = awaitedAdditionalPicks.items;
                additionalActivePick = awaitedAdditionalPicks.active;
              } else {
                additionalPicks = awaitedAdditionalPicks;
              }
              if (additionalPicks.length > 0 || !fastPicksApplied) {
                let fallbackActivePick = void 0;
                if (!activePick && !additionalActivePick) {
                  const fallbackActivePickCandidate = picker.activeItems[0];
                  if (fallbackActivePickCandidate && picks.indexOf(fallbackActivePickCandidate) !== -1) {
                    fallbackActivePick = fallbackActivePickCandidate;
                  }
                }
                applyPicks({
                  items: [...picks, ...additionalPicks],
                  active: activePick || additionalActivePick || fallbackActivePick
                });
              }
            } finally {
              if (!picksToken.isCancellationRequested) {
                picker.busy = false;
              }
              slowPicksApplied = true;
            }
          }))()
        ]);
      } else if (!(providedPicks instanceof Promise)) {
        applyPicks(providedPicks);
      } else {
        picker.busy = true;
        try {
          const awaitedPicks = yield providedPicks;
          if (picksToken.isCancellationRequested) {
            return;
          }
          applyPicks(awaitedPicks);
        } finally {
          if (!picksToken.isCancellationRequested) {
            picker.busy = false;
          }
        }
      }
    }), "updatePickerItems");
    disposables.add(picker.onDidChangeValue(() => updatePickerItems()));
    updatePickerItems();
    disposables.add(picker.onDidAccept((event) => {
      const [item] = picker.selectedItems;
      if (typeof (item === null || item === void 0 ? void 0 : item.accept) === "function") {
        if (!event.inBackground) {
          picker.hide();
        }
        item.accept(picker.keyMods, event);
      }
    }));
    disposables.add(picker.onDidTriggerItemButton(({ button, item }) => __awaiter2(this, void 0, void 0, function* () {
      var _b, _c;
      if (typeof item.trigger === "function") {
        const buttonIndex = (_c = (_b = item.buttons) === null || _b === void 0 ? void 0 : _b.indexOf(button)) !== null && _c !== void 0 ? _c : -1;
        if (buttonIndex >= 0) {
          const result = item.trigger(buttonIndex, picker.keyMods);
          const action = typeof result === "number" ? result : yield result;
          if (token.isCancellationRequested) {
            return;
          }
          switch (action) {
            case TriggerAction.NO_ACTION:
              break;
            case TriggerAction.CLOSE_PICKER:
              picker.hide();
              break;
            case TriggerAction.REFRESH_PICKER:
              updatePickerItems();
              break;
            case TriggerAction.REMOVE_ITEM: {
              const index = picker.items.indexOf(item);
              if (index !== -1) {
                const items = picker.items.slice();
                const removed = items.splice(index, 1);
                const activeItems = picker.activeItems.filter((activeItem) => activeItem !== removed[0]);
                const keepScrollPositionBefore = picker.keepScrollPosition;
                picker.keepScrollPosition = true;
                picker.items = items;
                if (activeItems) {
                  picker.activeItems = activeItems;
                }
                picker.keepScrollPosition = keepScrollPositionBefore;
              }
              break;
            }
          }
        }
      }
    })));
    return disposables;
  }
};
__name(PickerQuickAccessProvider, "PickerQuickAccessProvider");
PickerQuickAccessProvider.FAST_PICKS_RACE_DELAY = 200;

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/commandsQuickAccess.js
init_telemetry();
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param5 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AbstractCommandsQuickAccessProvider = /* @__PURE__ */ __name(class AbstractCommandsQuickAccessProvider2 extends PickerQuickAccessProvider {
  constructor(options, instantiationService, keybindingService, commandService, telemetryService, dialogService) {
    super(AbstractCommandsQuickAccessProvider2.PREFIX, options);
    this.instantiationService = instantiationService;
    this.keybindingService = keybindingService;
    this.commandService = commandService;
    this.telemetryService = telemetryService;
    this.dialogService = dialogService;
    this.commandsHistory = this._register(this.instantiationService.createInstance(CommandsHistory));
    this.options = options;
  }
  _getPicks(filter, _disposables, token) {
    return __awaiter3(this, void 0, void 0, function* () {
      const allCommandPicks = yield this.getCommandPicks(token);
      if (token.isCancellationRequested) {
        return [];
      }
      const filteredCommandPicks = [];
      for (const commandPick of allCommandPicks) {
        const labelHighlights = withNullAsUndefined(AbstractCommandsQuickAccessProvider2.WORD_FILTER(filter, commandPick.label));
        const aliasHighlights = commandPick.commandAlias ? withNullAsUndefined(AbstractCommandsQuickAccessProvider2.WORD_FILTER(filter, commandPick.commandAlias)) : void 0;
        if (labelHighlights || aliasHighlights) {
          commandPick.highlights = {
            label: labelHighlights,
            detail: this.options.showAlias ? aliasHighlights : void 0
          };
          filteredCommandPicks.push(commandPick);
        } else if (filter === commandPick.commandId) {
          filteredCommandPicks.push(commandPick);
        }
      }
      const mapLabelToCommand = /* @__PURE__ */ new Map();
      for (const commandPick of filteredCommandPicks) {
        const existingCommandForLabel = mapLabelToCommand.get(commandPick.label);
        if (existingCommandForLabel) {
          commandPick.description = commandPick.commandId;
          existingCommandForLabel.description = existingCommandForLabel.commandId;
        } else {
          mapLabelToCommand.set(commandPick.label, commandPick);
        }
      }
      filteredCommandPicks.sort((commandPickA, commandPickB) => {
        const commandACounter = this.commandsHistory.peek(commandPickA.commandId);
        const commandBCounter = this.commandsHistory.peek(commandPickB.commandId);
        if (commandACounter && commandBCounter) {
          return commandACounter > commandBCounter ? -1 : 1;
        }
        if (commandACounter) {
          return -1;
        }
        if (commandBCounter) {
          return 1;
        }
        return commandPickA.label.localeCompare(commandPickB.label);
      });
      const commandPicks = [];
      let addSeparator = false;
      for (let i = 0; i < filteredCommandPicks.length; i++) {
        const commandPick = filteredCommandPicks[i];
        const keybinding = this.keybindingService.lookupKeybinding(commandPick.commandId);
        const ariaLabel = keybinding ? localize("commandPickAriaLabelWithKeybinding", "{0}, {1}", commandPick.label, keybinding.getAriaLabel()) : commandPick.label;
        if (i === 0 && this.commandsHistory.peek(commandPick.commandId)) {
          commandPicks.push({ type: "separator", label: localize("recentlyUsed", "recently used") });
          addSeparator = true;
        }
        if (i !== 0 && addSeparator && !this.commandsHistory.peek(commandPick.commandId)) {
          commandPicks.push({ type: "separator", label: localize("morecCommands", "other commands") });
          addSeparator = false;
        }
        commandPicks.push(Object.assign(Object.assign({}, commandPick), { ariaLabel, detail: this.options.showAlias && commandPick.commandAlias !== commandPick.label ? commandPick.commandAlias : void 0, keybinding, accept: () => __awaiter3(this, void 0, void 0, function* () {
          this.commandsHistory.push(commandPick.commandId);
          this.telemetryService.publicLog2("workbenchActionExecuted", {
            id: commandPick.commandId,
            from: "quick open"
          });
          try {
            yield this.commandService.executeCommand(commandPick.commandId);
          } catch (error) {
            if (!isCancellationError(error)) {
              this.dialogService.show(severity_default.Error, localize("canNotRun", "Command '{0}' resulted in an error ({1})", commandPick.label, toErrorMessage(error)));
            }
          }
        }) }));
      }
      return commandPicks;
    });
  }
}, "AbstractCommandsQuickAccessProvider");
AbstractCommandsQuickAccessProvider.PREFIX = ">";
AbstractCommandsQuickAccessProvider.WORD_FILTER = or(matchesPrefix, matchesWords, matchesContiguousSubString);
AbstractCommandsQuickAccessProvider = __decorate5([
  __param5(1, IInstantiationService),
  __param5(2, IKeybindingService),
  __param5(3, ICommandService),
  __param5(4, ITelemetryService),
  __param5(5, IDialogService)
], AbstractCommandsQuickAccessProvider);
var CommandsHistory = /* @__PURE__ */ __name(class CommandsHistory2 extends Disposable {
  constructor(storageService, configurationService) {
    super();
    this.storageService = storageService;
    this.configurationService = configurationService;
    this.configuredCommandsHistoryLength = 0;
    this.updateConfiguration();
    this.load();
    this.registerListeners();
  }
  registerListeners() {
    this._register(this.configurationService.onDidChangeConfiguration(() => this.updateConfiguration()));
  }
  updateConfiguration() {
    this.configuredCommandsHistoryLength = CommandsHistory2.getConfiguredCommandHistoryLength(this.configurationService);
    if (CommandsHistory2.cache && CommandsHistory2.cache.limit !== this.configuredCommandsHistoryLength) {
      CommandsHistory2.cache.limit = this.configuredCommandsHistoryLength;
      CommandsHistory2.saveState(this.storageService);
    }
  }
  load() {
    const raw = this.storageService.get(CommandsHistory2.PREF_KEY_CACHE, 0);
    let serializedCache;
    if (raw) {
      try {
        serializedCache = JSON.parse(raw);
      } catch (error) {
      }
    }
    const cache = CommandsHistory2.cache = new LRUCache(this.configuredCommandsHistoryLength, 1);
    if (serializedCache) {
      let entries;
      if (serializedCache.usesLRU) {
        entries = serializedCache.entries;
      } else {
        entries = serializedCache.entries.sort((a, b) => a.value - b.value);
      }
      entries.forEach((entry) => cache.set(entry.key, entry.value));
    }
    CommandsHistory2.counter = this.storageService.getNumber(CommandsHistory2.PREF_KEY_COUNTER, 0, CommandsHistory2.counter);
  }
  push(commandId) {
    if (!CommandsHistory2.cache) {
      return;
    }
    CommandsHistory2.cache.set(commandId, CommandsHistory2.counter++);
    CommandsHistory2.saveState(this.storageService);
  }
  peek(commandId) {
    var _a;
    return (_a = CommandsHistory2.cache) === null || _a === void 0 ? void 0 : _a.peek(commandId);
  }
  static saveState(storageService) {
    if (!CommandsHistory2.cache) {
      return;
    }
    const serializedCache = { usesLRU: true, entries: [] };
    CommandsHistory2.cache.forEach((value, key) => serializedCache.entries.push({ key, value }));
    storageService.store(CommandsHistory2.PREF_KEY_CACHE, JSON.stringify(serializedCache), 0, 0);
    storageService.store(CommandsHistory2.PREF_KEY_COUNTER, CommandsHistory2.counter, 0, 0);
  }
  static getConfiguredCommandHistoryLength(configurationService) {
    var _a, _b;
    const config = configurationService.getValue();
    const configuredCommandHistoryLength = (_b = (_a = config.workbench) === null || _a === void 0 ? void 0 : _a.commandPalette) === null || _b === void 0 ? void 0 : _b.history;
    if (typeof configuredCommandHistoryLength === "number") {
      return configuredCommandHistoryLength;
    }
    return CommandsHistory2.DEFAULT_COMMANDS_HISTORY_LENGTH;
  }
}, "CommandsHistory");
CommandsHistory.DEFAULT_COMMANDS_HISTORY_LENGTH = 50;
CommandsHistory.PREF_KEY_CACHE = "commandPalette.mru.cache";
CommandsHistory.PREF_KEY_COUNTER = "commandPalette.mru.counter";
CommandsHistory.counter = 1;
CommandsHistory = __decorate5([
  __param5(0, IStorageService),
  __param5(1, IConfigurationService)
], CommandsHistory);

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/contrib/quickAccess/browser/commandsQuickAccess.js
var AbstractEditorCommandsQuickAccessProvider = class extends AbstractCommandsQuickAccessProvider {
  constructor(options, instantiationService, keybindingService, commandService, telemetryService, dialogService) {
    super(options, instantiationService, keybindingService, commandService, telemetryService, dialogService);
  }
  getCodeEditorCommandPicks() {
    const activeTextEditorControl = this.activeTextEditorControl;
    if (!activeTextEditorControl) {
      return [];
    }
    const editorCommandPicks = [];
    for (const editorAction of activeTextEditorControl.getSupportedActions()) {
      editorCommandPicks.push({
        commandId: editorAction.id,
        commandAlias: editorAction.alias,
        label: stripIcons(editorAction.label) || editorAction.id
      });
    }
    return editorCommandPicks;
  }
};
__name(AbstractEditorCommandsQuickAccessProvider, "AbstractEditorCommandsQuickAccessProvider");

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess.js
init_types();
init_instantiation();
init_keybinding();
init_commands();
init_telemetry();
init_editorExtensions();
init_editorContextKeys();
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param6 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var StandaloneCommandsQuickAccessProvider = /* @__PURE__ */ __name(class StandaloneCommandsQuickAccessProvider2 extends AbstractEditorCommandsQuickAccessProvider {
  get activeTextEditorControl() {
    return withNullAsUndefined(this.codeEditorService.getFocusedCodeEditor());
  }
  constructor(instantiationService, codeEditorService, keybindingService, commandService, telemetryService, dialogService) {
    super({ showAlias: false }, instantiationService, keybindingService, commandService, telemetryService, dialogService);
    this.codeEditorService = codeEditorService;
  }
  getCommandPicks() {
    return __awaiter4(this, void 0, void 0, function* () {
      return this.getCodeEditorCommandPicks();
    });
  }
}, "StandaloneCommandsQuickAccessProvider");
StandaloneCommandsQuickAccessProvider = __decorate6([
  __param6(0, IInstantiationService),
  __param6(1, ICodeEditorService),
  __param6(2, IKeybindingService),
  __param6(3, ICommandService),
  __param6(4, ITelemetryService),
  __param6(5, IDialogService)
], StandaloneCommandsQuickAccessProvider);
var GotoLineAction2 = class extends EditorAction {
  constructor() {
    super({
      id: GotoLineAction2.ID,
      label: QuickCommandNLS.quickCommandActionLabel,
      alias: "Command Palette",
      precondition: void 0,
      kbOpts: {
        kbExpr: EditorContextKeys.focus,
        primary: 59,
        weight: 100
      },
      contextMenuOpts: {
        group: "z_commands",
        order: 1
      }
    });
  }
  run(accessor) {
    accessor.get(IQuickInputService).quickAccess.show(StandaloneCommandsQuickAccessProvider.PREFIX);
  }
};
__name(GotoLineAction2, "GotoLineAction");
GotoLineAction2.ID = "editor.action.quickCommand";
registerEditorAction(GotoLineAction2);
Registry.as(Extensions.Quickaccess).registerQuickAccessProvider({
  ctor: StandaloneCommandsQuickAccessProvider,
  prefix: StandaloneCommandsQuickAccessProvider.PREFIX,
  helpEntries: [{ description: QuickCommandNLS.quickCommandHelp, commandId: GotoLineAction2.ID }]
});

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch.js
init_define_process();
init_editorExtensions();
init_codeEditorService();
init_configuration();
init_contextkey();
init_instantiation();
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param7 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var StandaloneReferencesController = /* @__PURE__ */ __name(class StandaloneReferencesController2 extends ReferencesController {
  constructor(editor, contextKeyService, editorService, notificationService, instantiationService, storageService, configurationService) {
    super(true, editor, contextKeyService, editorService, notificationService, instantiationService, storageService, configurationService);
  }
}, "StandaloneReferencesController");
StandaloneReferencesController = __decorate7([
  __param7(1, IContextKeyService),
  __param7(2, ICodeEditorService),
  __param7(3, INotificationService),
  __param7(4, IInstantiationService),
  __param7(5, IStorageService),
  __param7(6, IConfigurationService)
], StandaloneReferencesController);
registerEditorContribution(ReferencesController.ID, StandaloneReferencesController, 4);

// ../../.yarn/global/cache/monaco-editor-npm-0.35.0-dev.20221204-ea0d8b005c-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js
init_define_process();
init_editorExtensions();
init_standaloneTheme();
init_standaloneStrings();
init_theme();
var ToggleHighContrast = class extends EditorAction {
  constructor() {
    super({
      id: "editor.action.toggleHighContrast",
      label: ToggleHighContrastNLS.toggleHighContrast,
      alias: "Toggle High Contrast Theme",
      precondition: void 0
    });
    this._originalThemeName = null;
  }
  run(accessor, editor) {
    const standaloneThemeService = accessor.get(IStandaloneThemeService);
    const currentTheme = standaloneThemeService.getColorTheme();
    if (isHighContrast(currentTheme.type)) {
      standaloneThemeService.setTheme(this._originalThemeName || (isDark(currentTheme.type) ? VS_DARK_THEME_NAME : VS_LIGHT_THEME_NAME));
      this._originalThemeName = null;
    } else {
      standaloneThemeService.setTheme(isDark(currentTheme.type) ? HC_BLACK_THEME_NAME : HC_LIGHT_THEME_NAME);
      this._originalThemeName = currentTheme.themeName;
    }
  }
};
__name(ToggleHighContrast, "ToggleHighContrast");
registerEditorAction(ToggleHighContrast);

// js/isMobile.mjs
init_define_process();
function isMobile() {
  const isIOS2 = /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.userAgent.indexOf("SAMSUNG") === -1;
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[23]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.slice(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check && !isIOS2;
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
  const { startMonaco } = await import("./chunk-startMonaco-S2LUGQZV.mjs");
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
