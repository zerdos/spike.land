import {
  Children,
  cloneElement,
  createContext,
  createElement,
  forwardRef,
  isValidElement,
  p,
  react_default,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-W3X7RECQ.mjs";
import {
  require_tslib
} from "./chunk-chunk-KCPADY5M.mjs";
import {
  __commonJS,
  __toESM,
  define_process_default,
  init_define_process
} from "./chunk-chunk-RVPM6HJ7.mjs";

// ../../.yarn/global/cache/@emotion-memoize-npm-0.7.4-5648cf11b8-9.zip/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js
var require_memoize_browser_cjs = __commonJS({
  "../../.yarn/global/cache/@emotion-memoize-npm-0.7.4-5648cf11b8-9.zip/node_modules/@emotion/memoize/dist/memoize.browser.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function memoize(fn) {
      var cache = {};
      return function(arg) {
        if (cache[arg] === void 0)
          cache[arg] = fn(arg);
        return cache[arg];
      };
    }
    exports.default = memoize;
  }
});

// ../../.yarn/global/cache/@emotion-is-prop-valid-npm-0.8.8-261a0f2426-9.zip/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js
var require_is_prop_valid_browser_cjs = __commonJS({
  "../../.yarn/global/cache/@emotion-is-prop-valid-npm-0.8.8-261a0f2426-9.zip/node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var memoize = _interopDefault(require_memoize_browser_cjs());
    var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    var index = memoize(
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
    );
    exports.default = index;
  }
});

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
init_define_process();
var MotionConfigContext = createContext({
  transformPagePoint: function(p2) {
    return p2;
  },
  isStatic: false,
  reducedMotion: "never"
});

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
init_define_process();
var MotionContext = createContext({});
function useVisualElementContext() {
  return useContext(MotionContext).visualElement;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/PresenceContext.mjs
init_define_process();
var PresenceContext = createContext(null);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/is-browser.mjs
init_define_process();
var isBrowser = typeof document !== "undefined";

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
init_define_process();
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-reduced-motion.mjs
init_define_process();
var import_tslib = __toESM(require_tslib(), 1);
var prefersReducedMotion = { current: null };
var hasDetected = false;
function initPrefersReducedMotion() {
  hasDetected = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    var motionMediaQuery_1 = window.matchMedia("(prefers-reduced-motion)");
    var setReducedMotionPreferences = function() {
      return prefersReducedMotion.current = motionMediaQuery_1.matches;
    };
    motionMediaQuery_1.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
function useReducedMotion() {
  !hasDetected && initPrefersReducedMotion();
  var _a = (0, import_tslib.__read)(useState(prefersReducedMotion.current), 1), shouldReduceMotion = _a[0];
  return shouldReduceMotion;
}
function useReducedMotionConfig() {
  var reducedMotionPreference = useReducedMotion();
  var reducedMotion = useContext(MotionConfigContext).reducedMotion;
  if (reducedMotion === "never") {
    return false;
  } else if (reducedMotion === "always") {
    return true;
  } else {
    return reducedMotionPreference;
  }
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
init_define_process();
var LayoutGroupContext = createContext({});

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
init_define_process();
var SwitchLayoutGroupContext = createContext({});

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/index.mjs
init_define_process();
var import_tslib4 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/use-features.mjs
init_define_process();
var import_tslib2 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/process.mjs
init_define_process();
var defaultEnvironment = "production";
var env = typeof define_process_default === "undefined" || define_process_default.env === void 0 ? defaultEnvironment : "development";

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/definitions.mjs
init_define_process();
var createDefinition = function(propNames) {
  return {
    isEnabled: function(props) {
      return propNames.some(function(name) {
        return !!props[name];
      });
    }
  };
};
var featureDefinitions = {
  measureLayout: createDefinition(["layout", "layoutId", "drag"]),
  animation: createDefinition([
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView"
  ]),
  exit: createDefinition(["exit"]),
  drag: createDefinition(["drag", "dragControls"]),
  focus: createDefinition(["whileFocus"]),
  hover: createDefinition(["whileHover", "onHoverStart", "onHoverEnd"]),
  tap: createDefinition(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
  pan: createDefinition([
    "onPan",
    "onPanStart",
    "onPanSessionStart",
    "onPanEnd"
  ]),
  inView: createDefinition([
    "whileInView",
    "onViewportEnter",
    "onViewportLeave"
  ])
};
function loadFeatures(features) {
  for (var key in features) {
    if (features[key] === null)
      continue;
    if (key === "projectionNodeConstructor") {
      featureDefinitions.projectionNodeConstructor = features[key];
    } else {
      featureDefinitions[key].Component = features[key];
    }
  }
}

// ../../.yarn/global/cache/hey-listen-npm-1.0.8-adb7dae9da-9.zip/node_modules/hey-listen/dist/hey-listen.es.js
init_define_process();
var warning = function() {
};
var invariant = function() {
};
if (true) {
  warning = function(check, message) {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = function(check, message) {
    if (!check) {
      throw new Error(message);
    }
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/LazyContext.mjs
init_define_process();
var LazyContext = createContext({ strict: false });

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/use-features.mjs
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
function useFeatures(props, visualElement2, preloadedFeatures) {
  var features = [];
  var lazyContext = useContext(LazyContext);
  if (!visualElement2)
    return null;
  if (env !== "production" && preloadedFeatures && lazyContext.strict) {
    invariant(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
  }
  for (var i = 0; i < numFeatures; i++) {
    var name_1 = featureNames[i];
    var _a = featureDefinitions[name_1], isEnabled = _a.isEnabled, Component = _a.Component;
    if (isEnabled(props) && Component) {
      features.push(createElement(Component, (0, import_tslib2.__assign)({ key: name_1 }, props, { visualElement: visualElement2 })));
    }
  }
  return features;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
init_define_process();
function useVisualElement(Component, visualState, props, createVisualElement) {
  var lazyContext = useContext(LazyContext);
  var parent = useVisualElementContext();
  var presenceContext = useContext(PresenceContext);
  var shouldReduceMotion = useReducedMotionConfig();
  var visualElementRef = useRef(void 0);
  if (!createVisualElement)
    createVisualElement = lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component, {
      visualState,
      parent,
      props,
      presenceId: presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.id,
      blockInitialAnimation: (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false,
      shouldReduceMotion
    });
  }
  var visualElement2 = visualElementRef.current;
  useIsomorphicLayoutEffect(function() {
    visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
  });
  useEffect(function() {
    var _a;
    (_a = visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.animateChanges();
  });
  useIsomorphicLayoutEffect(function() {
    return function() {
      return visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.notifyUnmount();
    };
  }, []);
  return visualElement2;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
init_define_process();
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement2, externalRef) {
  return useCallback(
    function(instance) {
      var _a;
      instance && ((_a = visualState.mount) === null || _a === void 0 ? void 0 : _a.call(visualState, instance));
      if (visualElement2) {
        instance ? visualElement2.mount(instance) : visualElement2.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    [visualElement2]
  );
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/variants.mjs
init_define_process();
function isVariantLabels(v) {
  return Array.isArray(v);
}
function isVariantLabel(v) {
  return typeof v === "string" || isVariantLabels(v);
}
function getCurrent(visualElement2) {
  var current = {};
  visualElement2.forEachValue(function(value, key) {
    return current[key] = value.get();
  });
  return current;
}
function getVelocity(visualElement2) {
  var velocity = {};
  visualElement2.forEachValue(function(value, key) {
    return velocity[key] = value.getVelocity();
  });
  return velocity;
}
function resolveVariantFromProps(props, definition, custom, currentValues, currentVelocity) {
  var _a;
  if (currentValues === void 0) {
    currentValues = {};
  }
  if (currentVelocity === void 0) {
    currentVelocity = {};
  }
  if (typeof definition === "function") {
    definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = (_a = props.variants) === null || _a === void 0 ? void 0 : _a[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== null && custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
function resolveVariant(visualElement2, definition, custom) {
  var props = visualElement2.getProps();
  return resolveVariantFromProps(props, definition, custom !== null && custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity(visualElement2));
}
function checkIfControllingVariants(props) {
  var _a;
  return typeof ((_a = props.animate) === null || _a === void 0 ? void 0 : _a.start) === "function" || isVariantLabel(props.initial) || isVariantLabel(props.animate) || isVariantLabel(props.whileHover) || isVariantLabel(props.whileDrag) || isVariantLabel(props.whileTap) || isVariantLabel(props.whileFocus) || isVariantLabel(props.exit);
}
function checkIfVariantNode(props) {
  return Boolean(checkIfControllingVariants(props) || props.variants);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (checkIfControllingVariants(props)) {
    var initial = props.initial, animate4 = props.animate;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate4) ? animate4 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  var _a = getCurrentTreeVariants(props, useContext(MotionContext)), initial = _a.initial, animate4 = _a.animate;
  return useMemo(function() {
    return { initial, animate: animate4 };
  }, [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate4)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/id.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-constant.mjs
init_define_process();
function useConstant(init) {
  var ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/state.mjs
init_define_process();
var globalProjectionState = {
  hasAnimatedSinceResize: true,
  hasEverUpdated: false
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/id.mjs
var id = 1;
function useProjectionId() {
  return useConstant(function() {
    if (globalProjectionState.hasEverUpdated) {
      return id++;
    }
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/use-projection.mjs
init_define_process();
function useProjection(projectionId, _a, visualElement2, ProjectionNodeConstructor) {
  var _b;
  var layoutId = _a.layoutId, layout = _a.layout, drag2 = _a.drag, dragConstraints = _a.dragConstraints, layoutScroll = _a.layoutScroll;
  var initialPromotionConfig = useContext(SwitchLayoutGroupContext);
  if (!ProjectionNodeConstructor || !visualElement2 || (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.projection)) {
    return;
  }
  visualElement2.projection = new ProjectionNodeConstructor(projectionId, visualElement2.getLatestValues(), (_b = visualElement2.parent) === null || _b === void 0 ? void 0 : _b.projection);
  visualElement2.projection.setOptions({
    layoutId,
    layout,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement: visualElement2,
    scheduleRender: function() {
      return visualElement2.scheduleRender();
    },
    animationType: typeof layout === "string" ? layout : "both",
    initialPromotionConfig,
    layoutScroll
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/VisualElementHandler.mjs
init_define_process();
var import_tslib3 = __toESM(require_tslib(), 1);
var VisualElementHandler = function(_super) {
  (0, import_tslib3.__extends)(VisualElementHandler2, _super);
  function VisualElementHandler2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  VisualElementHandler2.prototype.getSnapshotBeforeUpdate = function() {
    this.updateProps();
    return null;
  };
  VisualElementHandler2.prototype.componentDidUpdate = function() {
  };
  VisualElementHandler2.prototype.updateProps = function() {
    var _a = this.props, visualElement2 = _a.visualElement, props = _a.props;
    if (visualElement2)
      visualElement2.setProps(props);
  };
  VisualElementHandler2.prototype.render = function() {
    return this.props.children;
  };
  return VisualElementHandler2;
}(react_default.Component);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/index.mjs
function createMotionComponent(_a) {
  var preloadedFeatures = _a.preloadedFeatures, createVisualElement = _a.createVisualElement, projectionNodeConstructor = _a.projectionNodeConstructor, useRender = _a.useRender, useVisualState2 = _a.useVisualState, Component = _a.Component;
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    var layoutId = useLayoutId(props);
    props = (0, import_tslib4.__assign)((0, import_tslib4.__assign)({}, props), { layoutId });
    var config = useContext(MotionConfigContext);
    var features = null;
    var context = useCreateMotionContext(props);
    var projectionId = config.isStatic ? void 0 : useProjectionId();
    var visualState = useVisualState2(props, config.isStatic);
    if (!config.isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component, visualState, (0, import_tslib4.__assign)((0, import_tslib4.__assign)({}, config), props), createVisualElement);
      useProjection(projectionId, props, context.visualElement, projectionNodeConstructor || featureDefinitions.projectionNodeConstructor);
      features = useFeatures(props, context.visualElement, preloadedFeatures);
    }
    return createElement(
      VisualElementHandler,
      { visualElement: context.visualElement, props: (0, import_tslib4.__assign)((0, import_tslib4.__assign)({}, config), props) },
      features,
      createElement(MotionContext.Provider, { value: context }, useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, config.isStatic, context.visualElement))
    );
  }
  return forwardRef(MotionComponent);
}
function useLayoutId(_a) {
  var _b;
  var layoutId = _a.layoutId;
  var layoutGroupId = (_b = useContext(LayoutGroupContext)) === null || _b === void 0 ? void 0 : _b.id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
init_define_process();
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
init_define_process();
var isMotionValue = function(value) {
  return Boolean(value !== null && typeof value === "object" && value.getVelocity);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
init_define_process();
var validMotionProps = /* @__PURE__ */ new Set([
  "initial",
  "animate",
  "exit",
  "style",
  "variants",
  "transition",
  "transformTemplate",
  "transformValues",
  "custom",
  "inherit",
  "layout",
  "layoutId",
  "layoutDependency",
  "onLayoutAnimationStart",
  "onLayoutAnimationComplete",
  "onLayoutMeasure",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "drag",
  "dragControls",
  "dragListener",
  "dragConstraints",
  "dragDirectionLock",
  "dragSnapToOrigin",
  "_dragX",
  "_dragY",
  "dragElastic",
  "dragMomentum",
  "dragPropagation",
  "dragTransition",
  "whileDrag",
  "onPan",
  "onPanStart",
  "onPanEnd",
  "onPanSessionStart",
  "onTap",
  "onTapStart",
  "onTapCancel",
  "onHoverStart",
  "onHoverEnd",
  "whileFocus",
  "whileTap",
  "whileHover",
  "whileInView",
  "onViewportEnter",
  "onViewportLeave",
  "viewport",
  "layoutScroll"
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
init_define_process();
var shouldForward = function(key) {
  return !isValidMotionProp(key);
};
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = function(key) {
    return key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
  };
}
try {
  loadExternalIsValidProp(require_is_prop_valid_browser_cjs().default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  var filteredProps = {};
  for (var key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/resolve-value.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
init_define_process();
var isKeyframesTarget = function(v) {
  return Array.isArray(v);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = function(v) {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = function(v) {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  var unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
init_define_process();
var import_tslib5 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
init_define_process();
function isAnimationControls(v) {
  return typeof v === "object" && typeof v.start === "function";
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState(_a, props, context, presenceContext) {
  var scrapeMotionValuesFromProps3 = _a.scrapeMotionValuesFromProps, createRenderState = _a.createRenderState, onMount = _a.onMount;
  var state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = function(instance) {
      return onMount(props, instance, state);
    };
  }
  return state;
}
var makeUseVisualState = function(config) {
  return function(props, isStatic) {
    var context = useContext(MotionContext);
    var presenceContext = useContext(PresenceContext);
    return isStatic ? makeState(config, props, context, presenceContext) : useConstant(function() {
      return makeState(config, props, context, presenceContext);
    });
  };
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  var values = {};
  var blockInitialAnimation = (presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.initial) === false;
  var motionValues = scrapeMotionValues(props);
  for (var key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  var initial = props.initial, animate4 = props.animate;
  var isControllingVariants = checkIfControllingVariants(props);
  var isVariantNode = checkIfVariantNode(props);
  if (context && isVariantNode && !isControllingVariants && props.inherit !== false) {
    initial !== null && initial !== void 0 ? initial : initial = context.initial;
    animate4 !== null && animate4 !== void 0 ? animate4 : animate4 = context.animate;
  }
  var initialAnimationIsBlocked = blockInitialAnimation || initial === false;
  var variantToSet = initialAnimationIsBlocked ? animate4 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    var list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach(function(definition) {
      var resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      var transitionEnd = resolved.transitionEnd;
      resolved.transition;
      var target = (0, import_tslib5.__rest)(resolved, ["transitionEnd", "transition"]);
      for (var key2 in target) {
        var valueTarget = target[key2];
        if (Array.isArray(valueTarget)) {
          var index = initialAnimationIsBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index];
        }
        if (valueTarget !== null) {
          values[key2] = valueTarget;
        }
      }
      for (var key2 in transitionEnd)
        values[key2] = transitionEnd[key2];
    });
  }
  return values;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/types.mjs
init_define_process();
var AnimationType;
(function(AnimationType2) {
  AnimationType2["Animate"] = "animate";
  AnimationType2["Hover"] = "whileHover";
  AnimationType2["Tap"] = "whileTap";
  AnimationType2["Drag"] = "whileDrag";
  AnimationType2["Focus"] = "whileFocus";
  AnimationType2["InView"] = "whileInView";
  AnimationType2["Exit"] = "exit";
})(AnimationType || (AnimationType = {}));

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/events/use-dom-event.mjs
init_define_process();
function addDomEvent(target, eventName, handler, options) {
  if (options === void 0) {
    options = { passive: true };
  }
  target.addEventListener(eventName, handler, options);
  return function() {
    return target.removeEventListener(eventName, handler);
  };
}
function useDomEvent(ref, eventName, handler, options) {
  useEffect(function() {
    var element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/events/event-info.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/utils/event-type.mjs
init_define_process();
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
function isTouchEvent(event) {
  var hasTouches = !!event.touches;
  return hasTouches;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/events/event-info.mjs
function filterPrimaryPointer(eventHandler) {
  return function(event) {
    var isMouseEvent2 = event instanceof MouseEvent;
    var isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  var primaryTouch = e.touches[0] || e.changedTouches[0];
  var point2 = primaryTouch || defaultPagePoint;
  return {
    x: point2[pointType + "X"],
    y: point2[pointType + "Y"]
  };
}
function pointFromMouse(point2, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    x: point2[pointType + "X"],
    y: point2[pointType + "Y"]
  };
}
function extractEventInfo(event, pointType) {
  if (pointType === void 0) {
    pointType = "page";
  }
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
var wrapHandler = function(handler, shouldFilterPrimaryPointer) {
  if (shouldFilterPrimaryPointer === void 0) {
    shouldFilterPrimaryPointer = false;
  }
  var listener = function(event) {
    return handler(event, extractEventInfo(event));
  };
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/events/utils.mjs
init_define_process();
var supportsPointerEvents = function() {
  return isBrowser && window.onpointerdown === null;
};
var supportsTouchEvents = function() {
  return isBrowser && window.ontouchstart === null;
};
var supportsMouseEvents = function() {
  return isBrowser && window.onmousedown === null;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
var mouseEventNames = {
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointercancel: "mousecancel",
  pointerover: "mouseover",
  pointerout: "mouseout",
  pointerenter: "mouseenter",
  pointerleave: "mouseleave"
};
var touchEventNames = {
  pointerdown: "touchstart",
  pointermove: "touchmove",
  pointerup: "touchend",
  pointercancel: "touchcancel"
};
function getPointerEventName(name) {
  if (supportsPointerEvents()) {
    return name;
  } else if (supportsTouchEvents()) {
    return touchEventNames[name];
  } else if (supportsMouseEvents()) {
    return mouseEventNames[name];
  }
  return name;
}
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs
init_define_process();
function createLock(name) {
  var lock = null;
  return function() {
    var openLock = function() {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  var lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    var openHorizontal_1 = globalHorizontalLock();
    var openVertical_1 = globalVerticalLock();
    if (openHorizontal_1 && openVertical_1) {
      lock = function() {
        openHorizontal_1();
        openVertical_1();
      };
    } else {
      if (openHorizontal_1)
        openHorizontal_1();
      if (openVertical_1)
        openVertical_1();
    }
  }
  return lock;
}
function isDragActive() {
  var openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs
init_define_process();
function useUnmountEffect(callback) {
  return useEffect(function() {
    return function() {
      return callback();
    };
  }, []);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
init_define_process();
function usePresence() {
  var context = useContext(PresenceContext);
  if (context === null)
    return [true, null];
  var isPresent2 = context.isPresent, onExitComplete = context.onExitComplete, register = context.register;
  var id3 = useId();
  useEffect(function() {
    return register(id3);
  }, []);
  var safeToRemove = function() {
    return onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete(id3);
  };
  return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
}
function useIsPresent() {
  return isPresent(useContext(PresenceContext));
}
function isPresent(context) {
  return context === null ? true : context.isPresent;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/index.mjs
init_define_process();

// ../../.yarn/global/cache/framesync-npm-6.1.1-0a629abcc6-9.zip/node_modules/framesync/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/framesync-npm-6.1.1-0a629abcc6-9.zip/node_modules/framesync/dist/es/on-next-frame.mjs
init_define_process();
var defaultTimestep = 1 / 60 * 1e3;
var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

// ../../.yarn/global/cache/framesync-npm-6.1.1-0a629abcc6-9.zip/node_modules/framesync/dist/es/create-render-step.mjs
init_define_process();
function createRenderStep(runNextFrame2) {
  let toRun = [];
  let toRunNextFrame = [];
  let numToRun = 0;
  let isProcessing2 = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  const step = {
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing2;
      const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (buffer.indexOf(callback) === -1) {
        buffer.push(callback);
        if (addToCurrentFrame && isProcessing2)
          numToRun = toRun.length;
      }
      return callback;
    },
    cancel: (callback) => {
      const index = toRunNextFrame.indexOf(callback);
      if (index !== -1)
        toRunNextFrame.splice(index, 1);
      toKeepAlive.delete(callback);
    },
    process: (frameData) => {
      if (isProcessing2) {
        flushNextFrame = true;
        return;
      }
      isProcessing2 = true;
      [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
      toRunNextFrame.length = 0;
      numToRun = toRun.length;
      if (numToRun) {
        for (let i = 0; i < numToRun; i++) {
          const callback = toRun[i];
          callback(frameData);
          if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame2();
          }
        }
      }
      isProcessing2 = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData);
      }
    }
  };
  return step;
}

// ../../.yarn/global/cache/framesync-npm-6.1.1-0a629abcc6-9.zip/node_modules/framesync/dist/es/index.mjs
var maxElapsed = 40;
var useDefaultElapsed = true;
var runNextFrame = false;
var isProcessing = false;
var frame = {
  delta: 0,
  timestamp: 0
};
var stepsOrder = [
  "read",
  "update",
  "preRender",
  "render",
  "postRender"
];
var steps = stepsOrder.reduce((acc, key) => {
  acc[key] = createRenderStep(() => runNextFrame = true);
  return acc;
}, {});
var sync = stepsOrder.reduce((acc, key) => {
  const step = steps[key];
  acc[key] = (process2, keepAlive = false, immediate = false) => {
    if (!runNextFrame)
      startLoop();
    return step.schedule(process2, keepAlive, immediate);
  };
  return acc;
}, {});
var cancelSync = stepsOrder.reduce((acc, key) => {
  acc[key] = steps[key].cancel;
  return acc;
}, {});
var flushSync = stepsOrder.reduce((acc, key) => {
  acc[key] = () => steps[key].process(frame);
  return acc;
}, {});
var processStep = (stepId) => steps[stepId].process(frame);
var processFrame = (timestamp) => {
  runNextFrame = false;
  frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
  frame.timestamp = timestamp;
  isProcessing = true;
  stepsOrder.forEach(processStep);
  isProcessing = false;
  if (runNextFrame) {
    useDefaultElapsed = false;
    onNextFrame(processFrame);
  }
};
var startLoop = () => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
};
var getFrameData = () => frame;
var es_default = sync;

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/index.mjs
init_define_process();
var import_tslib7 = __toESM(require_tslib(), 1);

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/generators/spring.mjs
init_define_process();
var import_tslib6 = __toESM(require_tslib(), 1);

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/clamp.mjs
init_define_process();
var clamp = (min, max, v) => Math.min(Math.max(v, min), max);

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(minDamping, maxDamping, dampingRatio);
  duration = clamp(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a2 / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    };
    derivative = (undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = duration * 1e3;
  if (isNaN(undampedFreq)) {
    return {
      stiffness: 100,
      damping: 10,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/generators/spring.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys2) {
  return keys2.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = (0, import_tslib6.__rest)(_a, ["from", "to", "restSpeed", "restDelta"]);
  const state = { done: false, value: from };
  let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
  let resolveSpring = zero;
  let resolveVelocity = zero;
  function createSpring() {
    const initialVelocity = velocity ? -(velocity / 1e3) : 0;
    const initialDelta = to - from;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
    if (restDelta === void 0) {
      restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
    }
    if (dampingRatio < 1) {
      const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      };
      resolveVelocity = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
    }
  }
  createSpring();
  return {
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        const currentVelocity = resolveVelocity(t) * 1e3;
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? to : current;
      return state;
    },
    flipTarget: () => {
      velocity = -velocity;
      [from, to] = [to, from];
      createSpring();
    }
  };
}
spring.needsInterpolation = (a2, b2) => typeof a2 === "string" || typeof b2 === "string";
var zero = (_t) => 0;

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/interpolate.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/progress.mjs
init_define_process();
var progress = (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/mix.mjs
init_define_process();
var mix = (from, to, progress3) => -progress3 * from + progress3 * to + from;

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/mix-color.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/numbers/index.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/utils.mjs
init_define_process();
var clamp2 = (min, max) => (v) => Math.max(Math.min(v, max), min);
var sanitize = (v) => v % 1 ? Number(v.toFixed(5)) : v;
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v) {
  return typeof v === "string";
}

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = Object.assign(Object.assign({}, number), { transform: clamp2(0, 1) });
var scale = Object.assign(Object.assign({}, number), { default: 1 });

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/numbers/units.mjs
init_define_process();
var createUnitType = (unit) => ({
  test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/color/hsla.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/color/utils.mjs
init_define_process();
var isColorString = (type, testProp) => (v) => {
  return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (!isString(v))
    return v;
  const [a2, b2, c2, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/color/hsla.mjs
var hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/color/rgba.mjs
init_define_process();
var clampRgbUnit = clamp2(0, 255);
var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
var rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/color/hex.mjs
init_define_process();
function parseHex(v) {
  let r = "";
  let g = "";
  let b2 = "";
  let a2 = "";
  if (v.length > 5) {
    r = v.substr(1, 2);
    g = v.substr(3, 2);
    b2 = v.substr(5, 2);
    a2 = v.substr(7, 2);
  } else {
    r = v.substr(1, 1);
    g = v.substr(2, 1);
    b2 = v.substr(3, 1);
    a2 = v.substr(4, 1);
    r += r;
    g += g;
    b2 += b2;
    a2 += a2;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b2, 16),
    alpha: a2 ? parseInt(a2, 16) / 255 : 1
  };
}
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/color/index.mjs
init_define_process();
var color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/complex/index.mjs
init_define_process();
var colorToken = "${c}";
var numberToken = "${n}";
function test(v) {
  var _a, _b, _c, _d;
  return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
function analyse(v) {
  if (typeof v === "number")
    v = `${v}`;
  const values = [];
  let numColors = 0;
  const colors = v.match(colorRegex);
  if (colors) {
    numColors = colors.length;
    v = v.replace(colorRegex, colorToken);
    values.push(...colors.map(color.parse));
  }
  const numbers = v.match(floatRegex);
  if (numbers) {
    v = v.replace(floatRegex, numberToken);
    values.push(...numbers.map(number.parse));
  }
  return { values, numColors, tokenised: v };
}
function parse(v) {
  return analyse(v).values;
}
function createTransformer(v) {
  const { values, numColors, tokenised } = analyse(v);
  const numValues = values.length;
  return (v2) => {
    let output = tokenised;
    for (let i = 0; i < numValues; i++) {
      output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
    }
    return output;
  };
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
  const parsed = parse(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = { test, parse, createTransformer, getAnimatableNone };

// ../../.yarn/global/cache/style-value-types-npm-5.1.1-15a1ad4740-9.zip/node_modules/style-value-types/dist/es/complex/filter.mjs
init_define_process();
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  let [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
  const functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
} });

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
init_define_process();
function hueToRgb(p2, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p2 + (q - p2) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p2 + (q - p2) * (2 / 3 - t) * 6;
  return p2;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p2 = 2 * lightness - q;
    red = hueToRgb(p2, q, hue + 1 / 3);
    green = hueToRgb(p2, q, hue);
    blue = hueToRgb(p2, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/mix-color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
var notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
var mixColor = (from, to) => {
  let fromColorType = getColorType(from);
  let toColorType = getColorType(to);
  invariant(!!fromColorType, notAnimatable(from));
  invariant(!!toColorType, notAnimatable(to));
  let fromColor = fromColorType.parse(from);
  let toColor = toColorType.parse(to);
  if (fromColorType === hsla) {
    fromColor = hslaToRgba(fromColor);
    fromColorType = rgba;
  }
  if (toColorType === hsla) {
    toColor = hslaToRgba(toColor);
    toColorType = rgba;
  }
  const blended = Object.assign({}, fromColor);
  return (v) => {
    for (const key in blended) {
      if (key !== "alpha") {
        blended[key] = mixLinearColor(fromColor[key], toColor[key], v);
      }
    }
    blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
    return fromColorType.transform(blended);
  };
};

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/mix-complex.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/inc.mjs
init_define_process();
var isNum = (v) => typeof v === "number";

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/pipe.mjs
init_define_process();
var combineFunctions = (a2, b2) => (v) => b2(a2(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/mix-complex.mjs
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v) => mix(origin, target, v);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
var mixArray = (from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
  return (v) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }
    return output;
  };
};
var mixObject = (origin, target) => {
  const output = Object.assign(Object.assign({}, origin), target);
  const blendValue = {};
  for (const key in output) {
    if (origin[key] !== void 0 && target[key] !== void 0) {
      blendValue[key] = getMixer(origin[key], target[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
};
function analyse2(value) {
  const parsed = complex.parse(value);
  const numValues = parsed.length;
  let numNumbers = 0;
  let numRGB = 0;
  let numHSL = 0;
  for (let i = 0; i < numValues; i++) {
    if (numNumbers || typeof parsed[i] === "number") {
      numNumbers++;
    } else {
      if (parsed[i].hue !== void 0) {
        numHSL++;
      } else {
        numRGB++;
      }
    }
  }
  return { parsed, numNumbers, numRGB, numHSL };
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse2(origin);
  const targetStats = analyse2(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return (p2) => `${p2 > 0 ? target : origin}`;
  }
};

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/interpolate.mjs
var mixNumber = (from, to) => (p2) => mix(from, to, p2);
function detectMixerFactory(v) {
  if (typeof v === "number") {
    return mixNumber;
  } else if (typeof v === "string") {
    if (color.test(v)) {
      return mixColor;
    } else {
      return mixComplex;
    }
  } else if (Array.isArray(v)) {
    return mixArray;
  } else if (typeof v === "object") {
    return mixObject;
  }
}
function createMixers(output, ease, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || detectMixerFactory(output[0]);
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease) {
      const easingFunction = Array.isArray(ease) ? ease[i] : ease;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function fastInterpolate([from, to], [mixer]) {
  return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
  const inputLength = input.length;
  const lastInputIndex = inputLength - 1;
  return (v) => {
    let mixerIndex = 0;
    let foundMixerIndex = false;
    if (v <= input[0]) {
      foundMixerIndex = true;
    } else if (v >= input[lastInputIndex]) {
      mixerIndex = lastInputIndex - 1;
      foundMixerIndex = true;
    }
    if (!foundMixerIndex) {
      let i = 1;
      for (; i < inputLength; i++) {
        if (input[i] > v || i === lastInputIndex) {
          break;
        }
      }
      mixerIndex = i - 1;
    }
    const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
    return mixers[mixerIndex](progressInRange);
  };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/easing/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/easing/utils.mjs
init_define_process();
var reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);
var mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;
var createExpoIn = (power) => (p2) => Math.pow(p2, power);
var createBackIn = (power) => (p2) => p2 * p2 * ((power + 1) * p2 - power);
var createAnticipate = (power) => {
  const backEasing = createBackIn(power);
  return (p2) => (p2 *= 2) < 1 ? 0.5 * backEasing(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));
};

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/easing/index.mjs
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = (p2) => p2;
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = (p2) => 1 - Math.sin(Math.acos(p2));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = (p2) => {
  if (p2 === 1 || p2 === 0)
    return p2;
  const p22 = p2 * p2;
  return p2 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p2 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p2 + 3.4 : p2 < BOUNCE_THIRD_THRESHOLD ? ca * p22 - cb * p2 + cc : 10.8 * p2 * p2 - 20.52 * p2 + 10.72;
};
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = (p2) => p2 < 0.5 ? 0.5 * (1 - bounceOut(1 - p2 * 2)) : 0.5 * bounceOut(p2 * 2 - 1) + 0.5;

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  let interpolator = createInterpolator();
  return {
    next: (t) => {
      state.value = interpolator(t);
      state.done = t >= duration;
      return state;
    },
    flipTarget: () => {
      values.reverse();
      interpolator = createInterpolator();
    }
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/generators/decay.mjs
init_define_process();
function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
  const state = { done: false, value: from };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - from;
  return {
    next: (t) => {
      const delta = -amplitude * Math.exp(-t / timeConstant);
      state.done = !(delta > restDelta || delta < -restDelta);
      state.value = state.done ? target : target + delta;
      return state;
    },
    flipTarget: () => {
    }
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
var types = { keyframes, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys2 = new Set(Object.keys(config));
  if (keys2.has("ease") || keys2.has("duration") && !keys2.has("dampingRatio")) {
    return keyframes;
  } else if (keys2.has("dampingRatio") || keys2.has("stiffness") || keys2.has("mass") || keys2.has("damping") || keys2.has("restSpeed") || keys2.has("restDelta")) {
    return spring;
  }
  return keyframes;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
init_define_process();
function loopElapsed(elapsed, duration, delay = 0) {
  return elapsed - duration - delay;
}
function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
}
function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/index.mjs
var framesync = (update) => {
  const passTimestamp = ({ delta }) => update(delta);
  return {
    start: () => es_default.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
};
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = (0, import_tslib7.__rest)(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
  let { to } = options;
  let driverControls;
  let repeatCount = 0;
  let computedDuration = options.duration;
  let latest;
  let isComplete = false;
  let isForwardPlayback = true;
  let interpolateFromNumber;
  const animator = detectAnimationFromOptions(options);
  if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
    interpolateFromNumber = interpolate([0, 100], [from, to], {
      clamp: false
    });
    from = 0;
    to = 100;
  }
  const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
  function repeat() {
    repeatCount++;
    if (repeatType === "reverse") {
      isForwardPlayback = repeatCount % 2 === 0;
      elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
    } else {
      elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
      if (repeatType === "mirror")
        animation.flipTarget();
    }
    isComplete = false;
    onRepeat && onRepeat();
  }
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  function update(delta) {
    if (!isForwardPlayback)
      delta = -delta;
    elapsed += delta;
    if (!isComplete) {
      const state = animation.next(Math.max(0, elapsed));
      latest = state.value;
      if (interpolateFromNumber)
        latest = interpolateFromNumber(latest);
      isComplete = isForwardPlayback ? state.done : elapsed <= 0;
    }
    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
    if (isComplete) {
      if (repeatCount === 0)
        computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
      if (repeatCount < repeatMax) {
        hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
      } else {
        complete();
      }
    }
  }
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/inertia.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
init_define_process();
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/animations/inertia.mjs
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  function startAnimation2(options) {
    currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
    currentAnimation = animate(Object.assign(Object.assign({}, options), {
      driver,
      onUpdate: (v) => {
        var _a;
        onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
        (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
      },
      onComplete,
      onStop
    }));
  }
  function startSpring(options) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  if (isOutOfBounds(from)) {
    startSpring({ from, velocity, to: boundaryNearest(from) });
  } else {
    let target = power * velocity + from;
    if (typeof modifyTarget !== "undefined")
      target = modifyTarget(target);
    const boundary = boundaryNearest(target);
    const heading = boundary === min ? -1 : 1;
    let prev;
    let current;
    const checkBoundary = (v) => {
      prev = current;
      current = v;
      velocity = velocityPerSecond(v - prev, getFrameData().delta);
      if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
        startSpring({ from: v, to: boundary, velocity });
      }
    };
    startAnimation2({
      type: "decay",
      from,
      velocity,
      timeConstant,
      power,
      restDelta,
      modifyTarget,
      onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
    });
  }
  return {
    stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
  };
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/angle.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/radians-to-degrees.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/apply-offset.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/attract.mjs
init_define_process();
var identity = (v) => v;
var createAttractor = (alterDisplacement = identity) => (constant, origin, v) => {
  const displacement = origin - v;
  const springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
  return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
};
var attract = createAttractor();
var attractExpo = createAttractor(Math.sqrt);

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/degrees-to-radians.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/distance.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/is-point.mjs
init_define_process();
var isPoint = (point2) => point2.hasOwnProperty("x") && point2.hasOwnProperty("y");

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/is-point-3d.mjs
init_define_process();
var isPoint3D = (point2) => isPoint(point2) && point2.hasOwnProperty("z");

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/distance.mjs
var distance1D = (a2, b2) => Math.abs(a2 - b2);
function distance(a2, b2) {
  if (isNum(a2) && isNum(b2)) {
    return distance1D(a2, b2);
  } else if (isPoint(a2) && isPoint(b2)) {
    const xDelta = distance1D(a2.x, b2.x);
    const yDelta = distance1D(a2.y, b2.y);
    const zDelta = isPoint3D(a2) && isPoint3D(b2) ? distance1D(a2.z, b2.z) : 0;
    return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
  }
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/point-from-vector.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/smooth-frame.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/to-decimal.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/smooth.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/snap.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/velocity-per-frame.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/utils/wrap.mjs
init_define_process();
var wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/easing/cubic-bezier.mjs
init_define_process();
var a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
var b = (a1, a2) => 3 * a2 - 6 * a1;
var c = (a1) => 3 * a1;
var calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
var getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 10;
function binarySubdivide(aX, aA, aB, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
var newtonIterations = 8;
var newtonMinSlope = 1e-3;
function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
  for (let i = 0; i < newtonIterations; ++i) {
    const currentSlope = getSlope(aGuessT, mX1, mX2);
    if (currentSlope === 0) {
      return aGuessT;
    }
    const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
    aGuessT -= currentX / currentSlope;
  }
  return aGuessT;
}
var kSplineTableSize = 11;
var kSampleStepSize = 1 / (kSplineTableSize - 1);
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return linear;
  const sampleValues = new Float32Array(kSplineTableSize);
  for (let i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }
  function getTForX(aX) {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = kSplineTableSize - 1;
    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;
    const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * kSampleStepSize;
    const initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= newtonMinSlope) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// ../../.yarn/global/cache/popmotion-npm-11.0.4-c8902b1562-9.zip/node_modules/popmotion/dist/es/easing/steps.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/array.mjs
init_define_process();
var import_tslib8 = __toESM(require_tslib(), 1);
function addUniqueItem(arr, item) {
  arr.indexOf(item) === -1 && arr.push(item);
}
function removeItem(arr, item) {
  var index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
}
function moveItem(_a, fromIndex, toIndex) {
  var _b = (0, import_tslib8.__read)(_a), arr = _b.slice(0);
  var startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < arr.length) {
    var endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
    var _c = (0, import_tslib8.__read)(arr.splice(fromIndex, 1), 1), item = _c[0];
    arr.splice(endIndex, 0, item);
  }
  return arr;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = function() {
  function SubscriptionManager2() {
    this.subscriptions = [];
  }
  SubscriptionManager2.prototype.add = function(handler) {
    var _this = this;
    addUniqueItem(this.subscriptions, handler);
    return function() {
      return removeItem(_this.subscriptions, handler);
    };
  };
  SubscriptionManager2.prototype.notify = function(a2, b2, c2) {
    var numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b2, c2);
    } else {
      for (var i = 0; i < numSubscriptions; i++) {
        var handler = this.subscriptions[i];
        handler && handler(a2, b2, c2);
      }
    }
  };
  SubscriptionManager2.prototype.getSize = function() {
    return this.subscriptions.length;
  };
  SubscriptionManager2.prototype.clear = function() {
    this.subscriptions.length = 0;
  };
  return SubscriptionManager2;
}();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/index.mjs
var isFloat = function(value) {
  return !isNaN(parseFloat(value));
};
var MotionValue = function() {
  function MotionValue3(init) {
    var _this = this;
    this.version = "7.0.2";
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = function(v, render) {
      if (render === void 0) {
        render = true;
      }
      _this.prev = _this.current;
      _this.current = v;
      var _a = getFrameData(), delta = _a.delta, timestamp = _a.timestamp;
      if (_this.lastUpdated !== timestamp) {
        _this.timeDelta = delta;
        _this.lastUpdated = timestamp;
        es_default.postRender(_this.scheduleVelocityCheck);
      }
      if (_this.prev !== _this.current) {
        _this.updateSubscribers.notify(_this.current);
      }
      if (_this.velocityUpdateSubscribers.getSize()) {
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
      if (render) {
        _this.renderSubscribers.notify(_this.current);
      }
    };
    this.scheduleVelocityCheck = function() {
      return es_default.postRender(_this.velocityCheck);
    };
    this.velocityCheck = function(_a) {
      var timestamp = _a.timestamp;
      if (timestamp !== _this.lastUpdated) {
        _this.prev = _this.current;
        _this.velocityUpdateSubscribers.notify(_this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  MotionValue3.prototype.onChange = function(subscription) {
    return this.updateSubscribers.add(subscription);
  };
  MotionValue3.prototype.clearListeners = function() {
    this.updateSubscribers.clear();
  };
  MotionValue3.prototype.onRenderRequest = function(subscription) {
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  };
  MotionValue3.prototype.attach = function(passiveEffect) {
    this.passiveEffect = passiveEffect;
  };
  MotionValue3.prototype.set = function(v, render) {
    if (render === void 0) {
      render = true;
    }
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  };
  MotionValue3.prototype.get = function() {
    return this.current;
  };
  MotionValue3.prototype.getPrevious = function() {
    return this.prev;
  };
  MotionValue3.prototype.getVelocity = function() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  };
  MotionValue3.prototype.start = function(animation) {
    var _this = this;
    this.stop();
    return new Promise(function(resolve) {
      _this.hasAnimated = true;
      _this.stopAnimation = animation(resolve);
    }).then(function() {
      return _this.clearAnimation();
    });
  };
  MotionValue3.prototype.stop = function() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  };
  MotionValue3.prototype.isAnimating = function() {
    return !!this.stopAnimation;
  };
  MotionValue3.prototype.clearAnimation = function() {
    this.stopAnimation = null;
  };
  MotionValue3.prototype.destroy = function() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  };
  return MotionValue3;
}();
function motionValue(init) {
  return new MotionValue(init);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/setters.mjs
init_define_process();
var import_tslib12 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
init_define_process();
var isNumericalString = function(v) {
  return /^\-?\d*\.?\d+$/.test(v);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
init_define_process();
var isZeroValueString = function(v) {
  return /^0[^.\s]+$/.test(v);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
init_define_process();
var import_tslib10 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
init_define_process();
var import_tslib9 = __toESM(require_tslib(), 1);
var int = (0, import_tslib9.__assign)((0, import_tslib9.__assign)({}, number), { transform: Math.round });

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
var numberValueTypes = {
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  size: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px,
  zIndex: int,
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var defaultValueTypes = (0, import_tslib10.__assign)((0, import_tslib10.__assign)({}, numberValueTypes), {
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
});
var getDefaultValueType = function(key) {
  return defaultValueTypes[key];
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  var _a;
  var defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
init_define_process();
var import_tslib11 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
init_define_process();
var testValueType = function(v) {
  return function(type) {
    return type.test(v);
  };
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
init_define_process();
var auto = {
  test: function(v) {
    return v === "auto";
  },
  parse: function(v) {
    return v;
  }
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = function(v) {
  return dimensionValueTypes.find(testValueType(v));
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = (0, import_tslib11.__spreadArray)((0, import_tslib11.__spreadArray)([], (0, import_tslib11.__read)(dimensionValueTypes), false), [color, complex], false);
var findValueType = function(v) {
  return valueTypes.find(testValueType(v));
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement2, key, value) {
  if (visualElement2.hasValue(key)) {
    visualElement2.getValue(key).set(value);
  } else {
    visualElement2.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement2, definition) {
  var resolved = resolveVariant(visualElement2, definition);
  var _a = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {}, _b = _a.transitionEnd, transitionEnd = _b === void 0 ? {} : _b;
  _a.transition;
  var target = (0, import_tslib12.__rest)(_a, ["transitionEnd", "transition"]);
  target = (0, import_tslib12.__assign)((0, import_tslib12.__assign)({}, target), transitionEnd);
  for (var key in target) {
    var value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement2, key, value);
  }
}
function setVariants(visualElement2, variantLabels) {
  var reversedLabels = (0, import_tslib12.__spreadArray)([], (0, import_tslib12.__read)(variantLabels), false).reverse();
  reversedLabels.forEach(function(key) {
    var _a;
    var variant = visualElement2.getVariant(key);
    variant && setTarget(visualElement2, variant);
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      setVariants(child, variantLabels);
    });
  });
}
function setValues(visualElement2, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement2, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement2, [definition]);
  } else {
    setTarget(visualElement2, definition);
  }
}
function checkTargetForNewValues(visualElement2, target, origin) {
  var _a, _b, _c;
  var _d;
  var newValueKeys = Object.keys(target).filter(function(key2) {
    return !visualElement2.hasValue(key2);
  });
  var numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (var i = 0; i < numNewValues; i++) {
    var key = newValueKeys[i];
    var targetValue = target[key];
    var value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key, targetValue);
    }
    visualElement2.addValue(key, motionValue(value));
    (_c = (_d = origin)[key]) !== null && _c !== void 0 ? _c : _d[key] = value;
    visualElement2.setBaseTarget(key, value);
  }
}
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  var valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
function getOrigin(target, transition, visualElement2) {
  var _a, _b;
  var origin = {};
  for (var key in target) {
    origin[key] = (_a = getOriginFromTransition(key, transition)) !== null && _a !== void 0 ? _a : (_b = visualElement2.getValue(key)) === null || _b === void 0 ? void 0 : _b.get();
  }
  return origin;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/animation.mjs
init_define_process();
var import_tslib16 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
init_define_process();
var import_tslib15 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/time-conversion.mjs
init_define_process();
var secondsToMilliseconds = function(seconds) {
  return seconds * 1e3;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/easing.mjs
init_define_process();
var import_tslib13 = __toESM(require_tslib(), 1);
var easingLookup = {
  linear,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate,
  bounceIn,
  bounceInOut,
  bounceOut
};
var easingDefinitionToFunction = function(definition) {
  if (Array.isArray(definition)) {
    invariant(definition.length === 4, "Cubic bezier arrays must contain four numerical values.");
    var _a = (0, import_tslib13.__read)(definition, 4), x1 = _a[0], y1 = _a[1], x2 = _a[2], y2 = _a[3];
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    invariant(easingLookup[definition] !== void 0, "Invalid easing type '".concat(definition, "'"));
    return easingLookup[definition];
  }
  return definition;
};
var isEasingArray = function(ease) {
  return Array.isArray(ease) && typeof ease[0] !== "number";
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
init_define_process();
var isAnimatable = function(key, value) {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
init_define_process();
var import_tslib14 = __toESM(require_tslib(), 1);
var underDampedSpring = function() {
  return {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
  };
};
var criticallyDampedSpring = function(to) {
  return {
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  };
};
var linearTween = function() {
  return {
    type: "keyframes",
    ease: "linear",
    duration: 0.3
  };
};
var keyframes2 = function(values) {
  return {
    type: "keyframes",
    duration: 0.8,
    values
  };
};
var defaultTransitions = {
  x: underDampedSpring,
  y: underDampedSpring,
  z: underDampedSpring,
  rotate: underDampedSpring,
  rotateX: underDampedSpring,
  rotateY: underDampedSpring,
  rotateZ: underDampedSpring,
  scaleX: criticallyDampedSpring,
  scaleY: criticallyDampedSpring,
  scale: criticallyDampedSpring,
  opacity: linearTween,
  backgroundColor: linearTween,
  color: linearTween,
  default: criticallyDampedSpring
};
var getDefaultTransition = function(valueKey, to) {
  var transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes2;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return (0, import_tslib14.__assign)({ to }, transitionFactory(to));
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
init_define_process();
var instantAnimationState = {
  current: false
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
function isTransitionDefined(_a) {
  _a.when;
  _a.delay;
  _a.delayChildren;
  _a.staggerChildren;
  _a.staggerDirection;
  _a.repeat;
  _a.repeatType;
  _a.repeatDelay;
  _a.from;
  var transition = (0, import_tslib15.__rest)(_a, ["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from"]);
  return !!Object.keys(transition).length;
}
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions(_a) {
  var ease = _a.ease, times = _a.times, yoyo = _a.yoyo, flip = _a.flip, loop = _a.loop, transition = (0, import_tslib15.__rest)(_a, ["ease", "times", "yoyo", "flip", "loop"]);
  var options = (0, import_tslib15.__assign)({}, transition);
  if (times)
    options["offset"] = times;
  if (transition.duration)
    options["duration"] = secondsToMilliseconds(transition.duration);
  if (transition.repeatDelay)
    options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
  if (ease) {
    options["ease"] = isEasingArray(ease) ? ease.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease);
  }
  if (transition.type === "tween")
    options.type = "keyframes";
  if (yoyo || loop || flip) {
    warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
    legacyRepeatWarning = true;
    if (yoyo) {
      options.repeatType = "reverse";
    } else if (loop) {
      options.repeatType = "loop";
    } else if (flip) {
      options.repeatType = "mirror";
    }
    options.repeat = loop || yoyo || flip || transition.repeat;
  }
  if (transition.type !== "spring")
    options.type = "keyframes";
  return options;
}
function getDelayFromTransition(transition, key) {
  var _a, _b;
  var valueTransition = getValueTransition(transition, key) || {};
  return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = (0, import_tslib15.__spreadArray)([], (0, import_tslib15.__read)(options.to), false);
    options.to[0] = options.from;
  }
  return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
  var _a;
  if (Array.isArray(options.to)) {
    (_a = transition.duration) !== null && _a !== void 0 ? _a : transition.duration = 0.8;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = (0, import_tslib15.__assign)((0, import_tslib15.__assign)({}, transition), getDefaultTransition(key, options.to));
  }
  return (0, import_tslib15.__assign)((0, import_tslib15.__assign)({}, options), convertTransitionToAnimationOptions(transition));
}
function getAnimation(key, value, target, transition, onComplete) {
  var _a;
  var valueTransition = getValueTransition(transition, key);
  var origin = (_a = valueTransition.from) !== null && _a !== void 0 ? _a : value.get();
  var isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  var isOriginAnimatable = isAnimatable(key, origin);
  warning(isOriginAnimatable === isTargetAnimatable, "You are trying to animate ".concat(key, ' from "').concat(origin, '" to "').concat(target, '". ').concat(origin, " is not an animatable value - to enable this animation set ").concat(origin, " to a value animatable to ").concat(target, " via the `style` property."));
  function start() {
    var options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: function(v) {
        return value.set(v);
      }
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia((0, import_tslib15.__assign)((0, import_tslib15.__assign)({}, options), valueTransition)) : animate((0, import_tslib15.__assign)((0, import_tslib15.__assign)({}, getPopmotionAnimationOptions(valueTransition, options, key)), { onUpdate: function(v) {
      var _a2;
      options.onUpdate(v);
      (_a2 = valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, v);
    }, onComplete: function() {
      var _a2;
      options.onComplete();
      (_a2 = valueTransition.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition);
    } }));
  }
  function set() {
    var _a2, _b;
    var finalTarget = resolveFinalValueInKeyframes(target);
    value.set(finalTarget);
    onComplete();
    (_a2 = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(valueTransition, finalTarget);
    (_b = valueTransition === null || valueTransition === void 0 ? void 0 : valueTransition.onComplete) === null || _b === void 0 ? void 0 : _b.call(valueTransition);
    return { stop: function() {
    } };
  }
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
function startAnimation(key, value, target, transition) {
  if (transition === void 0) {
    transition = {};
  }
  if (instantAnimationState.current) {
    transition = { type: false };
  }
  return value.start(function(onComplete) {
    var delayTimer;
    var controls;
    var animation = getAnimation(key, value, target, transition, onComplete);
    var delay = getDelayFromTransition(transition, key);
    var start = function() {
      return controls = animation();
    };
    if (delay) {
      delayTimer = window.setTimeout(start, secondsToMilliseconds(delay));
    } else {
      start();
    }
    return function() {
      clearTimeout(delayTimer);
      controls === null || controls === void 0 ? void 0 : controls.stop();
    };
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/transform.mjs
init_define_process();
var transformAxes = ["", "X", "Y", "Z"];
var order = ["translate", "scale", "rotate", "skew"];
var transformProps = ["transformPerspective", "x", "y", "z"];
order.forEach(function(operationKey) {
  return transformAxes.forEach(function(axesKey) {
    return transformProps.push(operationKey + axesKey);
  });
});
function sortTransformProps(a2, b2) {
  return transformProps.indexOf(a2) - transformProps.indexOf(b2);
}
var transformPropSet = new Set(transformProps);
function isTransformProp(key) {
  return transformPropSet.has(key);
}
var transformOriginProps = /* @__PURE__ */ new Set(["originX", "originY", "originZ"]);
function isTransformOriginProp(key) {
  return transformOriginProps.has(key);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/animation.mjs
function animateVisualElement(visualElement2, definition, options) {
  if (options === void 0) {
    options = {};
  }
  visualElement2.notifyAnimationStart(definition);
  var animation;
  if (Array.isArray(definition)) {
    var animations2 = definition.map(function(variant) {
      return animateVariant(visualElement2, variant, options);
    });
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement2, definition, options);
  } else {
    var resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
    animation = animateTarget(visualElement2, resolvedDefinition, options);
  }
  return animation.then(function() {
    return visualElement2.notifyAnimationComplete(definition);
  });
}
function animateVariant(visualElement2, variant, options) {
  var _a;
  if (options === void 0) {
    options = {};
  }
  var resolved = resolveVariant(visualElement2, variant, options.custom);
  var _b = (resolved || {}).transition, transition = _b === void 0 ? visualElement2.getDefaultTransition() || {} : _b;
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  var getAnimation2 = resolved ? function() {
    return animateTarget(visualElement2, resolved, options);
  } : function() {
    return Promise.resolve();
  };
  var getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? function(forwardDelay) {
    if (forwardDelay === void 0) {
      forwardDelay = 0;
    }
    var _a2 = transition.delayChildren, delayChildren = _a2 === void 0 ? 0 : _a2, staggerChildren = transition.staggerChildren, staggerDirection = transition.staggerDirection;
    return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : function() {
    return Promise.resolve();
  };
  var when = transition.when;
  if (when) {
    var _c = (0, import_tslib16.__read)(when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2], 2), first = _c[0], last = _c[1];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
function animateTarget(visualElement2, definition, _a) {
  var _b;
  var _c = _a === void 0 ? {} : _a, _d = _c.delay, delay = _d === void 0 ? 0 : _d, transitionOverride = _c.transitionOverride, type = _c.type;
  var _e = visualElement2.makeTargetAnimatable(definition), _f = _e.transition, transition = _f === void 0 ? visualElement2.getDefaultTransition() : _f, transitionEnd = _e.transitionEnd, target = (0, import_tslib16.__rest)(_e, ["transition", "transitionEnd"]);
  if (transitionOverride)
    transition = transitionOverride;
  var animations2 = [];
  var animationTypeState = type && ((_b = visualElement2.animationState) === null || _b === void 0 ? void 0 : _b.getState()[type]);
  for (var key in target) {
    var value = visualElement2.getValue(key);
    var valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    var valueTransition = (0, import_tslib16.__assign)({ delay }, transition);
    if (visualElement2.shouldReduceMotion && isTransformProp(key)) {
      valueTransition = (0, import_tslib16.__assign)((0, import_tslib16.__assign)({}, valueTransition), { type: false, delay: 0 });
    }
    var animation = startAnimation(key, value, valueTarget, valueTransition);
    animations2.push(animation);
  }
  return Promise.all(animations2).then(function() {
    transitionEnd && setTarget(visualElement2, transitionEnd);
  });
}
function animateChildren(visualElement2, variant, delayChildren, staggerChildren, staggerDirection, options) {
  if (delayChildren === void 0) {
    delayChildren = 0;
  }
  if (staggerChildren === void 0) {
    staggerChildren = 0;
  }
  if (staggerDirection === void 0) {
    staggerDirection = 1;
  }
  var animations2 = [];
  var maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
  var generateStaggerDuration = staggerDirection === 1 ? function(i) {
    if (i === void 0) {
      i = 0;
    }
    return i * staggerChildren;
  } : function(i) {
    if (i === void 0) {
      i = 0;
    }
    return maxStaggerDuration - i * staggerChildren;
  };
  Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach(function(child, i) {
    animations2.push(animateVariant(child, variant, (0, import_tslib16.__assign)((0, import_tslib16.__assign)({}, options), { delay: delayChildren + generateStaggerDuration(i) })).then(function() {
      return child.notifyAnimationComplete(variant);
    }));
  });
  return Promise.all(animations2);
}
function stopAnimation(visualElement2) {
  visualElement2.forEachValue(function(value) {
    return value.stop();
  });
}
function sortByTreeOrder(a2, b2) {
  return a2.sortNodePosition(b2);
}
function shouldBlockAnimation(_a, key) {
  var protectedKeys = _a.protectedKeys, needsAnimating = _a.needsAnimating;
  var shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/animations.mjs
init_define_process();
var import_tslib18 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
init_define_process();
var import_tslib17 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
init_define_process();
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  var prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (var i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.InView,
  AnimationType.Focus,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Exit
];
var reversePriorityOrder = (0, import_tslib17.__spreadArray)([], (0, import_tslib17.__read)(variantPriorityOrder), false).reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement2) {
  return function(animations2) {
    return Promise.all(animations2.map(function(_a) {
      var animation = _a.animation, options = _a.options;
      return animateVisualElement(visualElement2, animation, options);
    }));
  };
}
function createAnimationState(visualElement2) {
  var animate4 = animateList(visualElement2);
  var state = createState();
  var allAnimatedKeys = {};
  var isInitialRender = true;
  var buildResolvedTypeValues = function(acc, definition) {
    var resolved = resolveVariant(visualElement2, definition);
    if (resolved) {
      resolved.transition;
      var transitionEnd = resolved.transitionEnd, target = (0, import_tslib17.__rest)(resolved, ["transition", "transitionEnd"]);
      acc = (0, import_tslib17.__assign)((0, import_tslib17.__assign)((0, import_tslib17.__assign)({}, acc), target), transitionEnd);
    }
    return acc;
  };
  function isAnimated(key) {
    return allAnimatedKeys[key] !== void 0;
  }
  function setAnimateFunction(makeAnimator) {
    animate4 = makeAnimator(visualElement2);
  }
  function animateChanges(options, changedActiveType) {
    var _a;
    var props = visualElement2.getProps();
    var context = visualElement2.getVariantContext(true) || {};
    var animations2 = [];
    var removedKeys = /* @__PURE__ */ new Set();
    var encounteredKeys = {};
    var removedVariantIndex = Infinity;
    var _loop_1 = function(i2) {
      var type = reversePriorityOrder[i2];
      var typeState = state[type];
      var prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      var propIsVariant = isVariantLabel(prop);
      var activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      var isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = (0, import_tslib17.__assign)({}, encounteredKeys);
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        return "continue";
      }
      var variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      var shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i2 > removedVariantIndex && propIsVariant;
      var definitionList = Array.isArray(prop) ? prop : [prop];
      var resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      var _b = typeState.prevResolvedValues, prevResolvedValues = _b === void 0 ? {} : _b;
      var allKeys = (0, import_tslib17.__assign)((0, import_tslib17.__assign)({}, prevResolvedValues), resolvedValues);
      var markToAnimate = function(key2) {
        shouldAnimateType = true;
        removedKeys.delete(key2);
        typeState.needsAnimating[key2] = true;
      };
      for (var key in allKeys) {
        var next = resolvedValues[key];
        var prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        if (next !== prev) {
          if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
            if (!shallowCompare(next, prev) || variantDidChange) {
              markToAnimate(key);
            } else {
              typeState.protectedKeys[key] = true;
            }
          } else if (next !== void 0) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = (0, import_tslib17.__assign)((0, import_tslib17.__assign)({}, encounteredKeys), resolvedValues);
      }
      if (isInitialRender && visualElement2.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push.apply(animations2, (0, import_tslib17.__spreadArray)([], (0, import_tslib17.__read)(definitionList.map(function(animation) {
          return {
            animation,
            options: (0, import_tslib17.__assign)({ type }, options)
          };
        })), false));
      }
    };
    for (var i = 0; i < numAnimationTypes; i++) {
      _loop_1(i);
    }
    allAnimatedKeys = (0, import_tslib17.__assign)({}, encounteredKeys);
    if (removedKeys.size) {
      var fallbackAnimation_1 = {};
      removedKeys.forEach(function(key) {
        var fallbackTarget = visualElement2.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation_1[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation_1 });
    }
    var shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate4(animations2) : Promise.resolve();
  }
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach(function(child) {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    var animations2 = animateChanges(options, type);
    for (var key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    isAnimated,
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: function() {
      return state;
    }
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (isVariantLabels(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive) {
  if (isActive === void 0) {
    isActive = false;
  }
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  var _a;
  return _a = {}, _a[AnimationType.Animate] = createTypeState(true), _a[AnimationType.InView] = createTypeState(), _a[AnimationType.Hover] = createTypeState(), _a[AnimationType.Tap] = createTypeState(), _a[AnimationType.Drag] = createTypeState(), _a[AnimationType.Focus] = createTypeState(), _a[AnimationType.Exit] = createTypeState(), _a;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.mjs
init_define_process();
var makeRenderlessComponent = function(hook) {
  return function(props) {
    hook(props);
    return null;
  };
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: makeRenderlessComponent(function(_a) {
    var visualElement2 = _a.visualElement, animate4 = _a.animate;
    visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
    if (isAnimationControls(animate4)) {
      useEffect(function() {
        return animate4.subscribe(visualElement2);
      }, [animate4]);
    }
  }),
  exit: makeRenderlessComponent(function(props) {
    var custom = props.custom, visualElement2 = props.visualElement;
    var _a = (0, import_tslib18.__read)(usePresence(), 2), isPresent2 = _a[0], safeToRemove = _a[1];
    var presenceContext = useContext(PresenceContext);
    useEffect(function() {
      var _a2, _b;
      visualElement2.isPresent = isPresent2;
      var animation = (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Exit, !isPresent2, { custom: (_b = presenceContext === null || presenceContext === void 0 ? void 0 : presenceContext.custom) !== null && _b !== void 0 ? _b : custom });
      !isPresent2 && (animation === null || animation === void 0 ? void 0 : animation.then(safeToRemove));
    }, [isPresent2]);
  })
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
init_define_process();
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  if (target === void 0) {
    target = 0;
  }
  if (maxDistance === void 0) {
    maxDistance = 0.01;
  }
  return distance(value, target) < maxDistance;
}
function calcAxisDelta(delta, source, target, origin) {
  if (origin === void 0) {
    origin = 0.5;
  }
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
  calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
  target.min = layout.min - parent.min;
  target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
  calcRelativeAxisPosition(target.x, layout.x, parent.x);
  calcRelativeAxisPosition(target.y, layout.y, parent.y);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/models.mjs
init_define_process();
var createAxisDelta = function() {
  return {
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0
  };
};
var createDelta = function() {
  return {
    x: createAxisDelta(),
    y: createAxisDelta()
  };
};
var createAxis = function() {
  return { min: 0, max: 0 };
};
var createBox = function() {
  return {
    x: createAxis(),
    y: createAxis()
  };
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/index.mjs
init_define_process();
var import_tslib20 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/lifecycles.mjs
init_define_process();
var import_tslib19 = __toESM(require_tslib(), 1);
var names = [
  "LayoutMeasure",
  "BeforeLayoutMeasure",
  "LayoutUpdate",
  "ViewportBoxUpdate",
  "Update",
  "Render",
  "AnimationComplete",
  "LayoutAnimationComplete",
  "AnimationStart",
  "LayoutAnimationStart",
  "SetAxisTarget",
  "Unmount"
];
function createLifecycles() {
  var managers = names.map(function() {
    return new SubscriptionManager();
  });
  var propSubscriptions = {};
  var lifecycles = {
    clearAllListeners: function() {
      return managers.forEach(function(manager) {
        return manager.clear();
      });
    },
    updatePropListeners: function(props) {
      names.forEach(function(name) {
        var _a;
        var on = "on" + name;
        var propListener = props[on];
        (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
        if (propListener) {
          propSubscriptions[name] = lifecycles[on](propListener);
        }
      });
    }
  };
  managers.forEach(function(manager, i) {
    lifecycles["on" + names[i]] = function(handler) {
      return manager.add(handler);
    };
    lifecycles["notify" + names[i]] = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return manager.notify.apply(manager, (0, import_tslib19.__spreadArray)([], (0, import_tslib19.__read)(args), false));
    };
  });
  return lifecycles;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/warn-once.mjs
init_define_process();
var warned = /* @__PURE__ */ new Set();
function warnOnce(condition, message, element) {
  if (condition || warned.has(message))
    return;
  console.warn(message);
  if (element)
    console.warn(element);
  warned.add(message);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  var _a;
  for (var key in next) {
    var nextValue = next[key];
    var prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (true) {
        warnOnce(nextValue.version === "7.0.2", "Attempting to mix Framer Motion versions ".concat(nextValue.version, " with 7.0.2 may not work as expected."));
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        var existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        element.addValue(key, motionValue((_a = element.getStaticValue(key)) !== null && _a !== void 0 ? _a : nextValue));
      }
    }
  }
  for (var key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/index.mjs
var visualElement = function(_a) {
  var _b = _a.treeType, treeType = _b === void 0 ? "" : _b, build = _a.build, getBaseTarget = _a.getBaseTarget, makeTargetAnimatable = _a.makeTargetAnimatable, measureViewportBox2 = _a.measureViewportBox, renderInstance = _a.render, readValueFromInstance = _a.readValueFromInstance, removeValueFromRenderState = _a.removeValueFromRenderState, sortNodePosition = _a.sortNodePosition, scrapeMotionValuesFromProps3 = _a.scrapeMotionValuesFromProps;
  return function(_a2, options) {
    var parent = _a2.parent, props = _a2.props, presenceId = _a2.presenceId, blockInitialAnimation = _a2.blockInitialAnimation, visualState = _a2.visualState, shouldReduceMotion = _a2.shouldReduceMotion;
    if (options === void 0) {
      options = {};
    }
    var isMounted = false;
    var latestValues = visualState.latestValues, renderState = visualState.renderState;
    var instance;
    var lifecycles = createLifecycles();
    var values = /* @__PURE__ */ new Map();
    var valueSubscriptions = /* @__PURE__ */ new Map();
    var prevMotionValues = {};
    var baseTarget = (0, import_tslib20.__assign)({}, latestValues);
    var removeFromVariantTree;
    function render() {
      if (!instance || !isMounted)
        return;
      triggerBuild();
      renderInstance(instance, renderState, props.style, element.projection);
    }
    function triggerBuild() {
      build(element, renderState, latestValues, options, props);
    }
    function update() {
      lifecycles.notifyUpdate(latestValues);
    }
    function bindToMotionValue(key2, value2) {
      var removeOnChange = value2.onChange(function(latestValue) {
        latestValues[key2] = latestValue;
        props.onUpdate && es_default.update(update, false, true);
      });
      var removeOnRenderRequest = value2.onRenderRequest(element.scheduleRender);
      valueSubscriptions.set(key2, function() {
        removeOnChange();
        removeOnRenderRequest();
      });
    }
    var initialMotionValues = scrapeMotionValuesFromProps3(props);
    for (var key in initialMotionValues) {
      var value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
    var isControllingVariants = checkIfControllingVariants(props);
    var isVariantNode = checkIfVariantNode(props);
    var element = (0, import_tslib20.__assign)((0, import_tslib20.__assign)({
      treeType,
      current: null,
      depth: parent ? parent.depth + 1 : 0,
      parent,
      children: /* @__PURE__ */ new Set(),
      presenceId,
      shouldReduceMotion,
      variantChildren: isVariantNode ? /* @__PURE__ */ new Set() : void 0,
      isVisible: void 0,
      manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
      blockInitialAnimation,
      isMounted: function() {
        return Boolean(instance);
      },
      mount: function(newInstance) {
        isMounted = true;
        instance = element.current = newInstance;
        if (element.projection) {
          element.projection.mount(newInstance);
        }
        if (isVariantNode && parent && !isControllingVariants) {
          removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
        }
        values.forEach(function(value2, key2) {
          return bindToMotionValue(key2, value2);
        });
        parent === null || parent === void 0 ? void 0 : parent.children.add(element);
        element.setProps(props);
      },
      unmount: function() {
        var _a3;
        (_a3 = element.projection) === null || _a3 === void 0 ? void 0 : _a3.unmount();
        cancelSync.update(update);
        cancelSync.render(render);
        valueSubscriptions.forEach(function(remove) {
          return remove();
        });
        removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
        parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
        lifecycles.clearAllListeners();
        instance = void 0;
        isMounted = false;
      },
      addVariantChild: function(child) {
        var _a3;
        var closestVariantNode = element.getClosestVariantNode();
        if (closestVariantNode) {
          (_a3 = closestVariantNode.variantChildren) === null || _a3 === void 0 ? void 0 : _a3.add(child);
          return function() {
            return closestVariantNode.variantChildren.delete(child);
          };
        }
      },
      sortNodePosition: function(other) {
        if (!sortNodePosition || treeType !== other.treeType)
          return 0;
        return sortNodePosition(element.getInstance(), other.getInstance());
      },
      getClosestVariantNode: function() {
        return isVariantNode ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode();
      },
      getLayoutId: function() {
        return props.layoutId;
      },
      getInstance: function() {
        return instance;
      },
      getStaticValue: function(key2) {
        return latestValues[key2];
      },
      setStaticValue: function(key2, value2) {
        return latestValues[key2] = value2;
      },
      getLatestValues: function() {
        return latestValues;
      },
      setVisibility: function(visibility) {
        if (element.isVisible === visibility)
          return;
        element.isVisible = visibility;
        element.scheduleRender();
      },
      makeTargetAnimatable: function(target, canMutate) {
        if (canMutate === void 0) {
          canMutate = true;
        }
        return makeTargetAnimatable(element, target, props, canMutate);
      },
      measureViewportBox: function() {
        return measureViewportBox2(instance, props);
      },
      addValue: function(key2, value2) {
        if (element.hasValue(key2))
          element.removeValue(key2);
        values.set(key2, value2);
        latestValues[key2] = value2.get();
        bindToMotionValue(key2, value2);
      },
      removeValue: function(key2) {
        var _a3;
        values.delete(key2);
        (_a3 = valueSubscriptions.get(key2)) === null || _a3 === void 0 ? void 0 : _a3();
        valueSubscriptions.delete(key2);
        delete latestValues[key2];
        removeValueFromRenderState(key2, renderState);
      },
      hasValue: function(key2) {
        return values.has(key2);
      },
      getValue: function(key2, defaultValue) {
        var value2 = values.get(key2);
        if (value2 === void 0 && defaultValue !== void 0) {
          value2 = motionValue(defaultValue);
          element.addValue(key2, value2);
        }
        return value2;
      },
      forEachValue: function(callback) {
        return values.forEach(callback);
      },
      readValue: function(key2) {
        var _a3;
        return (_a3 = latestValues[key2]) !== null && _a3 !== void 0 ? _a3 : readValueFromInstance(instance, key2, options);
      },
      setBaseTarget: function(key2, value2) {
        baseTarget[key2] = value2;
      },
      getBaseTarget: function(key2) {
        if (getBaseTarget) {
          var target = getBaseTarget(props, key2);
          if (target !== void 0 && !isMotionValue(target))
            return target;
        }
        return baseTarget[key2];
      }
    }, lifecycles), {
      build: function() {
        triggerBuild();
        return renderState;
      },
      scheduleRender: function() {
        es_default.render(render, false, true);
      },
      syncRender: render,
      setProps: function(newProps) {
        if (newProps.transformTemplate || props.transformTemplate) {
          element.scheduleRender();
        }
        props = newProps;
        lifecycles.updatePropListeners(newProps);
        prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps3(props), prevMotionValues);
      },
      getProps: function() {
        return props;
      },
      getVariant: function(name) {
        var _a3;
        return (_a3 = props.variants) === null || _a3 === void 0 ? void 0 : _a3[name];
      },
      getDefaultTransition: function() {
        return props.transition;
      },
      getTransformPagePoint: function() {
        return props.transformPagePoint;
      },
      getVariantContext: function(startAtParent) {
        if (startAtParent === void 0) {
          startAtParent = false;
        }
        if (startAtParent)
          return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
        if (!isControllingVariants) {
          var context_1 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
          if (props.initial !== void 0) {
            context_1.initial = props.initial;
          }
          return context_1;
        }
        var context = {};
        for (var i = 0; i < numVariantProps; i++) {
          var name_1 = variantProps[i];
          var prop = props[name_1];
          if (isVariantLabel(prop) || prop === false) {
            context[name_1] = prop;
          }
        }
        return context;
      }
    });
    return element;
  };
};
var variantProps = (0, import_tslib20.__spreadArray)(["initial"], (0, import_tslib20.__read)(variantPriorityOrder), false);
var numVariantProps = variantProps.length;

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/animate.mjs
init_define_process();
function animate2(from, to, transition) {
  if (transition === void 0) {
    transition = {};
  }
  var value = isMotionValue(from) ? from : motionValue(from);
  startAnimation("", value, to, transition);
  return {
    stop: function() {
      return value.stop();
    },
    isAnimating: function() {
      return value.isAnimating();
    }
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
init_define_process();
var compareByDepth = function(a2, b2) {
  return a2.depth - b2.depth;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = function() {
  function FlatTree2() {
    this.children = [];
    this.isDirty = false;
  }
  FlatTree2.prototype.add = function(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.remove = function(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  };
  FlatTree2.prototype.forEach = function(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  };
  return FlatTree2;
}();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/motion.mjs
init_define_process();
var import_tslib39 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/motion-proxy.mjs
init_define_process();
function createMotionProxy(createConfig) {
  function custom(Component, customMotionComponentConfig) {
    if (customMotionComponentConfig === void 0) {
      customMotionComponentConfig = {};
    }
    return createMotionComponent(createConfig(Component, customMotionComponentConfig));
  }
  if (typeof Proxy === "undefined") {
    return custom;
  }
  var componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    get: function(_target, key) {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
init_define_process();
var import_tslib26 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
init_define_process();
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view"
];

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component) {
  if (typeof Component !== "string" || Component.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) {
    return true;
  }
  return false;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
init_define_process();
var import_tslib25 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/use-props.mjs
init_define_process();
var import_tslib21 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
init_define_process();
function isForcedMotionValue(key, _a) {
  var layout = _a.layout, layoutId = _a.layoutId;
  return isTransformProp(key) || isTransformOriginProp(key) || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
init_define_process();
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
function buildTransform(_a, _b, transformIsDefault, transformTemplate) {
  var transform2 = _a.transform, transformKeys2 = _a.transformKeys;
  var _c = _b.enableHardwareAcceleration, enableHardwareAcceleration = _c === void 0 ? true : _c, _d = _b.allowTransformNone, allowTransformNone = _d === void 0 ? true : _d;
  var transformString = "";
  transformKeys2.sort(sortTransformProps);
  var transformHasZ = false;
  var numTransformKeys = transformKeys2.length;
  for (var i = 0; i < numTransformKeys; i++) {
    var key = transformKeys2[i];
    transformString += "".concat(translateAlias[key] || key, "(").concat(transform2[key], ") ");
    if (key === "z")
      transformHasZ = true;
  }
  if (!transformHasZ && enableHardwareAcceleration) {
    transformString += "translateZ(0)";
  } else {
    transformString = transformString.trim();
  }
  if (transformTemplate) {
    transformString = transformTemplate(transform2, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
function buildTransformOrigin(_a) {
  var _b = _a.originX, originX = _b === void 0 ? "50%" : _b, _c = _a.originY, originY = _c === void 0 ? "50%" : _c, _d = _a.originZ, originZ = _d === void 0 ? 0 : _d;
  return "".concat(originX, " ").concat(originY, " ").concat(originZ);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
init_define_process();
function isCSSVariable(key) {
  return key.startsWith("--");
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
init_define_process();
var getValueAsType = function(value, type) {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  var _a;
  var style2 = state.style, vars = state.vars, transform2 = state.transform, transformKeys2 = state.transformKeys, transformOrigin = state.transformOrigin;
  transformKeys2.length = 0;
  var hasTransform2 = false;
  var hasTransformOrigin = false;
  var transformIsNone = true;
  for (var key in latestValues) {
    var value = latestValues[key];
    if (isCSSVariable(key)) {
      vars[key] = value;
      continue;
    }
    var valueType = numberValueTypes[key];
    var valueAsType = getValueAsType(value, valueType);
    if (isTransformProp(key)) {
      hasTransform2 = true;
      transform2[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== ((_a = valueType.default) !== null && _a !== void 0 ? _a : 0))
        transformIsNone = false;
    } else if (isTransformOriginProp(key)) {
      transformOrigin[key] = valueAsType;
      hasTransformOrigin = true;
    } else {
      style2[key] = valueAsType;
    }
  }
  if (hasTransform2) {
    style2.transform = buildTransform(state, options, transformIsNone, transformTemplate);
  } else if (transformTemplate) {
    style2.transform = transformTemplate({}, "");
  } else if (!latestValues.transform && style2.transform) {
    style2.transform = "none";
  }
  if (hasTransformOrigin) {
    style2.transformOrigin = buildTransformOrigin(transformOrigin);
  }
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
init_define_process();
var createHtmlRenderState = function() {
  return {
    style: {},
    transform: {},
    transformKeys: [],
    transformOrigin: {},
    vars: {}
  };
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (var key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues(_a, visualState, isStatic) {
  var transformTemplate = _a.transformTemplate;
  return useMemo(function() {
    var state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    var vars = state.vars, style2 = state.style;
    return (0, import_tslib21.__assign)((0, import_tslib21.__assign)({}, vars), style2);
  }, [visualState]);
}
function useStyle(props, visualState, isStatic) {
  var styleProp = props.style || {};
  var style2 = {};
  copyRawValuesOnly(style2, styleProp, props);
  Object.assign(style2, useInitialMotionValues(props, visualState, isStatic));
  if (props.transformValues) {
    style2 = props.transformValues(style2);
  }
  return style2;
}
function useHTMLProps(props, visualState, isStatic) {
  var htmlProps = {};
  var style2 = useStyle(props, visualState, isStatic);
  if (Boolean(props.drag) && props.dragListener !== false) {
    htmlProps.draggable = false;
    style2.userSelect = style2.WebkitUserSelect = style2.WebkitTouchCallout = "none";
    style2.touchAction = props.drag === true ? "none" : "pan-".concat(props.drag === "x" ? "y" : "x");
  }
  htmlProps.style = style2;
  return htmlProps;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
init_define_process();
var import_tslib24 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
init_define_process();
var import_tslib22 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
init_define_process();
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  var pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  var pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return "".concat(pxOriginX, " ").concat(pxOriginY);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
init_define_process();
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length2, spacing, offset, useDashCase) {
  if (spacing === void 0) {
    spacing = 1;
  }
  if (offset === void 0) {
    offset = 0;
  }
  if (useDashCase === void 0) {
    useDashCase = true;
  }
  attrs.pathLength = 1;
  var keys2 = useDashCase ? dashKeys : camelKeys;
  attrs[keys2.offset] = px.transform(-offset);
  var pathLength = px.transform(length2);
  var pathSpacing = px.transform(spacing);
  attrs[keys2.array] = "".concat(pathLength, " ").concat(pathSpacing);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, _a, options, transformTemplate) {
  var attrX = _a.attrX, attrY = _a.attrY, originX = _a.originX, originY = _a.originY, pathLength = _a.pathLength, _b = _a.pathSpacing, pathSpacing = _b === void 0 ? 1 : _b, _c = _a.pathOffset, pathOffset = _c === void 0 ? 0 : _c, latest = (0, import_tslib22.__rest)(_a, ["attrX", "attrY", "originX", "originY", "pathLength", "pathSpacing", "pathOffset"]);
  buildHTMLStyles(state, latest, options, transformTemplate);
  state.attrs = state.style;
  state.style = {};
  var attrs = state.attrs, style2 = state.style, dimensions = state.dimensions;
  if (attrs.transform) {
    if (dimensions)
      style2.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style2.transform)) {
    style2.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
init_define_process();
var import_tslib23 = __toESM(require_tslib(), 1);
var createSvgRenderState = function() {
  return (0, import_tslib23.__assign)((0, import_tslib23.__assign)({}, createHtmlRenderState()), { attrs: {} });
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState) {
  var visualProps = useMemo(function() {
    var state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, props.transformTemplate);
    return (0, import_tslib24.__assign)((0, import_tslib24.__assign)({}, state.attrs), { style: (0, import_tslib24.__assign)({}, state.style) });
  }, [visualState]);
  if (props.style) {
    var rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = (0, import_tslib24.__assign)((0, import_tslib24.__assign)({}, rawStyles), visualProps.style);
  }
  return visualProps;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps) {
  if (forwardMotionProps === void 0) {
    forwardMotionProps = false;
  }
  var useRender = function(Component, props, projectionId, ref, _a, isStatic) {
    var latestValues = _a.latestValues;
    var useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
    var visualProps = useVisualProps(props, latestValues, isStatic);
    var filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
    var elementProps = (0, import_tslib25.__assign)((0, import_tslib25.__assign)((0, import_tslib25.__assign)({}, filteredProps), visualProps), { ref });
    if (projectionId) {
      elementProps["data-projection-id"] = projectionId;
    }
    return createElement(Component, elementProps);
  };
  return useRender;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
init_define_process();
var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = "$1-$2";
var camelToDash = function(str) {
  return str.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/render.mjs
init_define_process();
function renderHTML(element, _a, styleProp, projection) {
  var style2 = _a.style, vars = _a.vars;
  Object.assign(element.style, style2, projection && projection.getProjectionStyles(styleProp));
  for (var key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
init_define_process();
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength"
]);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (var key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
init_define_process();
function scrapeMotionValuesFromProps(props) {
  var style2 = props.style;
  var newValues = {};
  for (var key in style2) {
    if (isMotionValue(style2[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style2[key];
    }
  }
  return newValues;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props) {
  var newValues = scrapeMotionValuesFromProps(props);
  for (var key in props) {
    if (isMotionValue(props[key])) {
      var targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onMount: function(props, instance, _a) {
      var renderState = _a.renderState, latestValues = _a.latestValues;
      try {
        renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
      } catch (e) {
        renderState.dimensions = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      buildSVGAttrs(renderState, latestValues, { enableHardwareAcceleration: false }, props.transformTemplate);
      renderSVG(instance, renderState);
    }
  })
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/config-motion.mjs
init_define_process();
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
function createDomMotionConfig(Component, _a, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
  var _b = _a.forwardMotionProps, forwardMotionProps = _b === void 0 ? false : _b;
  var baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
  return (0, import_tslib26.__assign)((0, import_tslib26.__assign)({}, baseConfig), { preloadedFeatures, useRender: createUseRender(forwardMotionProps), createVisualElement, projectionNodeConstructor, Component });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/gestures.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
init_define_process();
function useFocusGesture(_a) {
  var whileFocus = _a.whileFocus, visualElement2 = _a.visualElement;
  var onFocus = function() {
    var _a2;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, true);
  };
  var onBlur = function() {
    var _a2;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Focus, false);
  };
  useDomEvent(visualElement2, "focus", whileFocus ? onFocus : void 0);
  useDomEvent(visualElement2, "blur", whileFocus ? onBlur : void 0);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
init_define_process();
function createHoverEvent(visualElement2, isActive, callback) {
  return function(event, info) {
    var _a;
    if (!isMouseEvent(event) || isDragActive())
      return;
    (_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Hover, isActive);
    callback === null || callback === void 0 ? void 0 : callback(event, info);
  };
}
function useHoverGesture(_a) {
  var onHoverStart = _a.onHoverStart, onHoverEnd = _a.onHoverEnd, whileHover = _a.whileHover, visualElement2 = _a.visualElement;
  usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0, { passive: !onHoverStart });
  usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0, { passive: !onHoverEnd });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs
init_define_process();
var isNodeOrChild = function(parent, child) {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
function useTapGesture(_a) {
  var onTap = _a.onTap, onTapStart = _a.onTapStart, onTapCancel = _a.onTapCancel, whileTap = _a.whileTap, visualElement2 = _a.visualElement;
  var hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  var isPressing = useRef(false);
  var cancelPointerEndListeners = useRef(null);
  var eventOptions = {
    passive: !(onTapStart || onTap || onTapCancel || onPointerDown)
  };
  function removePointerEndListener() {
    var _a2;
    (_a2 = cancelPointerEndListeners.current) === null || _a2 === void 0 ? void 0 : _a2.call(cancelPointerEndListeners);
    cancelPointerEndListeners.current = null;
  }
  function checkPointerEnd() {
    var _a2;
    removePointerEndListener();
    isPressing.current = false;
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info) : onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
  }
  function onPointerDown(event, info) {
    var _a2;
    removePointerEndListener();
    if (isPressing.current)
      return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp, eventOptions), addPointerEvent(window, "pointercancel", onPointerCancel, eventOptions));
    (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Tap, true);
    onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
  }
  usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0, eventOptions);
  useUnmountEffect(removePointerEndListener);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
init_define_process();
var import_tslib27 = __toESM(require_tslib(), 1);
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = function(entry) {
  var _a;
  (_a = observerCallbacks.get(entry.target)) === null || _a === void 0 ? void 0 : _a(entry);
};
var fireAllObserverCallbacks = function(entries) {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver(_a) {
  var root = _a.root, options = (0, import_tslib27.__rest)(_a, ["root"]);
  var lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  var rootObservers = observers.get(lookupRoot);
  var key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, (0, import_tslib27.__assign)({ root }, options));
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  var rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return function() {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
function useViewport(_a) {
  var visualElement2 = _a.visualElement, whileInView = _a.whileInView, onViewportEnter = _a.onViewportEnter, onViewportLeave = _a.onViewportLeave, _b = _a.viewport, viewport = _b === void 0 ? {} : _b;
  var state = useRef({
    hasEnteredView: false,
    isInView: false
  });
  var shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
  if (viewport.once && state.current.hasEnteredView)
    shouldObserve = false;
  var useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
  useObserver(shouldObserve, state.current, visualElement2, viewport);
}
var thresholdNames = {
  some: 0,
  all: 1
};
function useIntersectionObserver(shouldObserve, state, visualElement2, _a) {
  var root = _a.root, rootMargin = _a.margin, _b = _a.amount, amount = _b === void 0 ? "some" : _b, once = _a.once;
  useEffect(function() {
    if (!shouldObserve)
      return;
    var options = {
      root: root === null || root === void 0 ? void 0 : root.current,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    var intersectionCallback = function(entry) {
      var _a2;
      var isIntersecting = entry.isIntersecting;
      if (state.isInView === isIntersecting)
        return;
      state.isInView = isIntersecting;
      if (once && !isIntersecting && state.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        state.hasEnteredView = true;
      }
      (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.InView, isIntersecting);
      var props = visualElement2.getProps();
      var callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
      callback === null || callback === void 0 ? void 0 : callback(entry);
    };
    return observeIntersection(visualElement2.getInstance(), options, intersectionCallback);
  }, [shouldObserve, root, rootMargin, amount]);
}
function useMissingIntersectionObserver(shouldObserve, state, visualElement2, _a) {
  var _b = _a.fallback, fallback = _b === void 0 ? true : _b;
  useEffect(function() {
    if (!shouldObserve || !fallback)
      return;
    if (env !== "production") {
      warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
    }
    requestAnimationFrame(function() {
      var _a2;
      state.hasEnteredView = true;
      var onViewportEnter = visualElement2.getProps().onViewportEnter;
      onViewportEnter === null || onViewportEnter === void 0 ? void 0 : onViewportEnter(null);
      (_a2 = visualElement2.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.InView, true);
    });
  }, [shouldObserve]);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: makeRenderlessComponent(useViewport),
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/drag.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
init_define_process();
var import_tslib31 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/PanSession.mjs
init_define_process();
var import_tslib28 = __toESM(require_tslib(), 1);
var PanSession = function() {
  function PanSession2(event, handlers, _a) {
    var _b = _a === void 0 ? {} : _a, transformPagePoint = _b.transformPagePoint;
    var _this = this;
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = function() {
      if (!(_this.lastMoveEvent && _this.lastMoveEventInfo))
        return;
      var info2 = getPanInfo(_this.lastMoveEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null;
      var isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      var point3 = info2.point;
      var timestamp2 = getFrameData().timestamp;
      _this.history.push((0, import_tslib28.__assign)((0, import_tslib28.__assign)({}, point3), { timestamp: timestamp2 }));
      var _a2 = _this.handlers, onStart = _a2.onStart, onMove = _a2.onMove;
      if (!isPanStarted) {
        onStart && onStart(_this.lastMoveEvent, info2);
        _this.startEvent = _this.lastMoveEvent;
      }
      onMove && onMove(_this.lastMoveEvent, info2);
    };
    this.handlePointerMove = function(event2, info2) {
      _this.lastMoveEvent = event2;
      _this.lastMoveEventInfo = transformPoint(info2, _this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        _this.handlePointerUp(event2, info2);
        return;
      }
      es_default.update(_this.updatePoint, true);
    };
    this.handlePointerUp = function(event2, info2) {
      _this.end();
      var _a2 = _this.handlers, onEnd = _a2.onEnd, onSessionEnd = _a2.onSessionEnd;
      var panInfo = getPanInfo(transformPoint(info2, _this.transformPagePoint), _this.history);
      if (_this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    var info = extractEventInfo(event);
    var initialInfo = transformPoint(info, this.transformPagePoint);
    var point2 = initialInfo.point;
    var timestamp = getFrameData().timestamp;
    this.history = [(0, import_tslib28.__assign)((0, import_tslib28.__assign)({}, point2), { timestamp })];
    var onSessionStart = handlers.onSessionStart;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  PanSession2.prototype.updateHandlers = function(handlers) {
    this.handlers = handlers;
  };
  PanSession2.prototype.end = function() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  };
  return PanSession2;
}();
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a2, b2) {
  return { x: a2.x - b2.x, y: a2.y - b2.y };
}
function getPanInfo(_a, history) {
  var point2 = _a.point;
  return {
    point: point2,
    delta: subtractPoint(point2, lastDevicePoint(history)),
    offset: subtractPoint(point2, startDevicePoint(history)),
    velocity: getVelocity2(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity2(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  var time2 = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
init_define_process();
var import_tslib29 = __toESM(require_tslib(), 1);
function applyConstraints(point2, _a, elastic) {
  var min = _a.min, max = _a.max;
  if (min !== void 0 && point2 < min) {
    point2 = elastic ? mix(min, point2, elastic.min) : Math.max(point2, min);
  } else if (max !== void 0 && point2 > max) {
    point2 = elastic ? mix(max, point2, elastic.max) : Math.min(point2, max);
  }
  return point2;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, _a) {
  var top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  var _a;
  var min = constraintsAxis.min - layoutAxis.min;
  var max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    _a = (0, import_tslib29.__read)([max, min], 2), min = _a[0], max = _a[1];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  var origin = 0.5;
  var sourceLength = calcLength(source);
  var targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout, constraints) {
  var relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic) {
  if (dragElastic === void 0) {
    dragElastic = defaultElastic;
  }
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
init_define_process();
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/utils/measure.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
init_define_process();
function convertBoundingBoxToBox(_a) {
  var top = _a.top, left = _a.left, right = _a.right, bottom = _a.bottom;
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox(_a) {
  var x = _a.x, y = _a.y;
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point2, transformPoint2) {
  if (!transformPoint2)
    return point2;
  var topLeft = transformPoint2({ x: point2.left, y: point2.top });
  var bottomRight = transformPoint2({ x: point2.right, y: point2.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
init_define_process();
var import_tslib30 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
init_define_process();
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale(_a) {
  var scale2 = _a.scale, scaleX = _a.scaleX, scaleY = _a.scaleY;
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || hasTranslate(values.x) || hasTranslate(values.y) || values.z || values.rotate || values.rotateX || values.rotateY;
}
function hasTranslate(value) {
  return value && value !== "0%";
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point2, scale2, originPoint) {
  var distanceFromOrigin = point2 - originPoint;
  var scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point2, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, boxScale, originPoint);
  }
  return scalePoint(point2, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate, scale2, originPoint, boxScale) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, _a) {
  var x = _a.x, y = _a.y;
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition) {
  var _a, _b;
  if (isSharedTransition === void 0) {
    isSharedTransition = false;
  }
  var treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  var node;
  var delta;
  for (var i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    if (((_b = (_a = node.instance) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.display) === "contents")
      continue;
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, { x: -node.scroll.x, y: -node.scroll.y });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, transforms2, _a) {
  var _b = (0, import_tslib30.__read)(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  var axisOrigin = transforms2[originKey] !== void 0 ? transforms2[originKey] : 0.5;
  var originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms2[key], transforms2[scaleKey], originPoint, transforms2.scale);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function transformBox(box, transform2) {
  transformAxis(box.x, transform2, xKeys);
  transformAxis(box.y, transform2, yKeys);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  var viewportBox = measureViewportBox(element, transformPagePoint);
  var scroll2 = rootProjectionNode2.scroll;
  if (scroll2) {
    translateAxis(viewportBox.x, scroll2.x);
    translateAxis(viewportBox.y, scroll2.y);
  }
  return viewportBox;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = function() {
  function VisualElementDragControls2(visualElement2) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement2;
  }
  VisualElementDragControls2.prototype.start = function(originEvent, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.snapToCursor, snapToCursor = _c === void 0 ? false : _c;
    if (this.visualElement.isPresent === false)
      return;
    var onSessionStart = function(event) {
      _this.stopAnimation();
      if (snapToCursor) {
        _this.snapToCursor(extractEventInfo(event, "page").point);
      }
    };
    var onStart = function(event, info) {
      var _a2;
      var _b2 = _this.getProps(), drag2 = _b2.drag, dragPropagation = _b2.dragPropagation, onDragStart = _b2.onDragStart;
      if (drag2 && !dragPropagation) {
        if (_this.openGlobalLock)
          _this.openGlobalLock();
        _this.openGlobalLock = getGlobalLock(drag2);
        if (!_this.openGlobalLock)
          return;
      }
      _this.isDragging = true;
      _this.currentDirection = null;
      _this.resolveConstraints();
      if (_this.visualElement.projection) {
        _this.visualElement.projection.isAnimationBlocked = true;
        _this.visualElement.projection.target = void 0;
      }
      eachAxis(function(axis) {
        var _a3, _b3;
        var current = _this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          var measuredAxis = (_b3 = (_a3 = _this.visualElement.projection) === null || _a3 === void 0 ? void 0 : _a3.layout) === null || _b3 === void 0 ? void 0 : _b3.actual[axis];
          if (measuredAxis) {
            var length_1 = calcLength(measuredAxis);
            current = length_1 * (parseFloat(current) / 100);
          }
        }
        _this.originPoint[axis] = current;
      });
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
      (_a2 = _this.visualElement.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(AnimationType.Drag, true);
    };
    var onMove = function(event, info) {
      var _a2 = _this.getProps(), dragPropagation = _a2.dragPropagation, dragDirectionLock = _a2.dragDirectionLock, onDirectionLock = _a2.onDirectionLock, onDrag = _a2.onDrag;
      if (!dragPropagation && !_this.openGlobalLock)
        return;
      var offset = info.offset;
      if (dragDirectionLock && _this.currentDirection === null) {
        _this.currentDirection = getCurrentDirection(offset);
        if (_this.currentDirection !== null) {
          onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(_this.currentDirection);
        }
        return;
      }
      _this.updateAxis("x", info.point, offset);
      _this.updateAxis("y", info.point, offset);
      _this.visualElement.syncRender();
      onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
    };
    var onSessionEnd = function(event, info) {
      return _this.stop(event, info);
    };
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  };
  VisualElementDragControls2.prototype.stop = function(event, info) {
    var isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    var velocity = info.velocity;
    this.startAnimation(velocity);
    var onDragEnd = this.getProps().onDragEnd;
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
  };
  VisualElementDragControls2.prototype.cancel = function() {
    var _a, _b;
    this.isDragging = false;
    if (this.visualElement.projection) {
      this.visualElement.projection.isAnimationBlocked = false;
    }
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = void 0;
    var dragPropagation = this.getProps().dragPropagation;
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  };
  VisualElementDragControls2.prototype.updateAxis = function(axis, _point, offset) {
    var drag2 = this.getProps().drag;
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    var axisValue = this.getAxisMotionValue(axis);
    var next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  };
  VisualElementDragControls2.prototype.resolveConstraints = function() {
    var _this = this;
    var _a = this.getProps(), dragConstraints = _a.dragConstraints, dragElastic = _a.dragElastic;
    var layout = (this.visualElement.projection || {}).layout;
    var prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout) {
        this.constraints = calcRelativeConstraints(layout.actual, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
      eachAxis(function(axis) {
        if (_this.getAxisMotionValue(axis)) {
          _this.constraints[axis] = rebaseAxisConstraints(layout.actual[axis], _this.constraints[axis]);
        }
      });
    }
  };
  VisualElementDragControls2.prototype.resolveRefConstraints = function() {
    var _a = this.getProps(), constraints = _a.dragConstraints, onMeasureDragConstraints = _a.onMeasureDragConstraints;
    if (!constraints || !isRefObject(constraints))
      return false;
    var constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    var projection = this.visualElement.projection;
    if (!projection || !projection.layout)
      return false;
    var constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    var measuredConstraints = calcViewportConstraints(projection.layout.actual, constraintsBox);
    if (onMeasureDragConstraints) {
      var userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  };
  VisualElementDragControls2.prototype.startAnimation = function(velocity) {
    var _this = this;
    var _a = this.getProps(), drag2 = _a.drag, dragMomentum = _a.dragMomentum, dragElastic = _a.dragElastic, dragTransition = _a.dragTransition, dragSnapToOrigin = _a.dragSnapToOrigin, onDragTransitionEnd = _a.onDragTransitionEnd;
    var constraints = this.constraints || {};
    var momentumAnimations = eachAxis(function(axis) {
      var _a2;
      if (!shouldDrag(axis, drag2, _this.currentDirection)) {
        return;
      }
      var transition = (_a2 = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a2 !== void 0 ? _a2 : {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      var bounceStiffness = dragElastic ? 200 : 1e6;
      var bounceDamping = dragElastic ? 40 : 1e7;
      var inertia2 = (0, import_tslib31.__assign)((0, import_tslib31.__assign)({ type: "inertia", velocity: dragMomentum ? velocity[axis] : 0, bounceStiffness, bounceDamping, timeConstant: 750, restDelta: 1, restSpeed: 10 }, dragTransition), transition);
      return _this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  };
  VisualElementDragControls2.prototype.startAxisValueAnimation = function(axis, transition) {
    var axisValue = this.getAxisMotionValue(axis);
    return startAnimation(axis, axisValue, 0, transition);
  };
  VisualElementDragControls2.prototype.stopAnimation = function() {
    var _this = this;
    eachAxis(function(axis) {
      return _this.getAxisMotionValue(axis).stop();
    });
  };
  VisualElementDragControls2.prototype.getAxisMotionValue = function(axis) {
    var _a, _b;
    var dragKey = "_drag" + axis.toUpperCase();
    var externalMotionValue = this.visualElement.getProps()[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (_b = (_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) !== null && _b !== void 0 ? _b : 0);
  };
  VisualElementDragControls2.prototype.snapToCursor = function(point2) {
    var _this = this;
    eachAxis(function(axis) {
      var drag2 = _this.getProps().drag;
      if (!shouldDrag(axis, drag2, _this.currentDirection))
        return;
      var projection = _this.visualElement.projection;
      var axisValue = _this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        var _a = projection.layout.actual[axis], min = _a.min, max = _a.max;
        axisValue.set(point2[axis] - mix(min, max, 0.5));
      }
    });
  };
  VisualElementDragControls2.prototype.scalePositionWithinConstraints = function() {
    var _this = this;
    var _a;
    var _b = this.getProps(), drag2 = _b.drag, dragConstraints = _b.dragConstraints;
    var projection = this.visualElement.projection;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    var boxProgress = { x: 0, y: 0 };
    eachAxis(function(axis) {
      var axisValue = _this.getAxisMotionValue(axis);
      if (axisValue) {
        var latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, _this.constraints[axis]);
      }
    });
    var transformTemplate = this.visualElement.getProps().transformTemplate;
    this.visualElement.getInstance().style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis(function(axis) {
      if (!shouldDrag(axis, drag2, null))
        return;
      var axisValue = _this.getAxisMotionValue(axis);
      var _a2 = _this.constraints[axis], min = _a2.min, max = _a2.max;
      axisValue.set(mix(min, max, boxProgress[axis]));
    });
  };
  VisualElementDragControls2.prototype.addListeners = function() {
    var _this = this;
    var _a;
    elementDragControls.set(this.visualElement, this);
    var element = this.visualElement.getInstance();
    var stopPointerListener = addPointerEvent(element, "pointerdown", function(event) {
      var _a2 = _this.getProps(), drag2 = _a2.drag, _b = _a2.dragListener, dragListener = _b === void 0 ? true : _b;
      drag2 && dragListener && _this.start(event);
    });
    var measureDragConstraints = function() {
      var dragConstraints = _this.getProps().dragConstraints;
      if (isRefObject(dragConstraints)) {
        _this.constraints = _this.resolveRefConstraints();
      }
    };
    var projection = this.visualElement.projection;
    var stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    var stopResizeListener = addDomEvent(window, "resize", function() {
      return _this.scalePositionWithinConstraints();
    });
    var stopLayoutUpdateListener = projection.addEventListener("didUpdate", function(_a2) {
      var delta = _a2.delta, hasLayoutChanged = _a2.hasLayoutChanged;
      if (_this.isDragging && hasLayoutChanged) {
        eachAxis(function(axis) {
          var motionValue2 = _this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          _this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        _this.visualElement.syncRender();
      }
    });
    return function() {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
    };
  };
  VisualElementDragControls2.prototype.getProps = function() {
    var props = this.visualElement.getProps();
    var _a = props.drag, drag2 = _a === void 0 ? false : _a, _b = props.dragDirectionLock, dragDirectionLock = _b === void 0 ? false : _b, _c = props.dragPropagation, dragPropagation = _c === void 0 ? false : _c, _d = props.dragConstraints, dragConstraints = _d === void 0 ? false : _d, _e = props.dragElastic, dragElastic = _e === void 0 ? defaultElastic : _e, _f = props.dragMomentum, dragMomentum = _f === void 0 ? true : _f;
    return (0, import_tslib31.__assign)((0, import_tslib31.__assign)({}, props), { drag: drag2, dragDirectionLock, dragPropagation, dragConstraints, dragElastic, dragMomentum });
  };
  return VisualElementDragControls2;
}();
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold) {
  if (lockThreshold === void 0) {
    lockThreshold = 10;
  }
  var direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
function useDrag(props) {
  var groupDragControls = props.dragControls, visualElement2 = props.visualElement;
  var dragControls = useConstant(function() {
    return new VisualElementDragControls(visualElement2);
  });
  useEffect(function() {
    return groupDragControls && groupDragControls.subscribe(dragControls);
  }, [dragControls, groupDragControls]);
  useEffect(function() {
    return dragControls.addListeners();
  }, [dragControls]);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/use-pan-gesture.mjs
init_define_process();
function usePanGesture(_a) {
  var onPan = _a.onPan, onPanStart = _a.onPanStart, onPanEnd = _a.onPanEnd, onPanSessionStart = _a.onPanSessionStart, visualElement2 = _a.visualElement;
  var hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  var panSession = useRef(null);
  var transformPagePoint = useContext(MotionConfigContext).transformPagePoint;
  var handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function(event, info) {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  useEffect(function() {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });
  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint
    });
  }
  usePointerEvent(visualElement2, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect(function() {
    return panSession.current && panSession.current.end();
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/visual-element.mjs
init_define_process();
var import_tslib34 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
init_define_process();
var import_tslib32 = __toESM(require_tslib(), 1);
function isCSSVariable2(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  var match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  var _a = (0, import_tslib32.__read)(match, 3), token = _a[1], fallback = _a[2];
  return [token, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth) {
  if (depth === void 0) {
    depth = 1;
  }
  invariant(depth <= maxDepth, 'Max CSS variable fallback depth detected in property "'.concat(current, '". This may indicate a circular fallback dependency.'));
  var _a = (0, import_tslib32.__read)(parseCSSVariable(current), 2), token = _a[0], fallback = _a[1];
  if (!token)
    return;
  var resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable2(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
function resolveCSSVariables(visualElement2, _a, transitionEnd) {
  var _b;
  var target = (0, import_tslib32.__rest)(_a, []);
  var element = visualElement2.getInstance();
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = (0, import_tslib32.__assign)({}, transitionEnd);
  }
  visualElement2.forEachValue(function(value) {
    var current2 = value.get();
    if (!isCSSVariable2(current2))
      return;
    var resolved2 = getVariableValue(current2, element);
    if (resolved2)
      value.set(resolved2);
  });
  for (var key in target) {
    var current = target[key];
    if (!isCSSVariable2(current))
      continue;
    var resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd)
      (_b = transitionEnd[key]) !== null && _b !== void 0 ? _b : transitionEnd[key] = current;
  }
  return { target, transitionEnd };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
init_define_process();
var import_tslib33 = __toESM(require_tslib(), 1);
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  "x",
  "y"
]);
var isPositionalKey = function(key) {
  return positionalKeys.has(key);
};
var hasPositionalKey = function(target) {
  return Object.keys(target).some(isPositionalKey);
};
var setAndResetVelocity = function(value, to) {
  value.set(to, false);
  value.set(to);
};
var isNumOrPxType = function(v) {
  return v === number || v === px;
};
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = function(matrix, pos) {
  return parseFloat(matrix.split(", ")[pos]);
};
var getTranslateFromMatrix = function(pos2, pos3) {
  return function(_bbox, _a) {
    var transform2 = _a.transform;
    if (transform2 === "none" || !transform2)
      return 0;
    var matrix3d = transform2.match(/^matrix3d\((.+)\)$/);
    if (matrix3d) {
      return getPosFromMatrix(matrix3d[1], pos3);
    } else {
      var matrix = transform2.match(/^matrix\((.+)\)$/);
      if (matrix) {
        return getPosFromMatrix(matrix[1], pos2);
      } else {
        return 0;
      }
    }
  };
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformProps.filter(function(key) {
  return !transformKeys.has(key);
});
function removeNonTranslationalTransform(visualElement2) {
  var removedTransforms = [];
  nonTranslationalTransformKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement2.syncRender();
  return removedTransforms;
}
var positionalValues = {
  width: function(_a, _b) {
    var x = _a.x;
    var _c = _b.paddingLeft, paddingLeft = _c === void 0 ? "0" : _c, _d = _b.paddingRight, paddingRight = _d === void 0 ? "0" : _d;
    return x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight);
  },
  height: function(_a, _b) {
    var y = _a.y;
    var _c = _b.paddingTop, paddingTop = _c === void 0 ? "0" : _c, _d = _b.paddingBottom, paddingBottom = _d === void 0 ? "0" : _d;
    return y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom);
  },
  top: function(_bbox, _a) {
    var top = _a.top;
    return parseFloat(top);
  },
  left: function(_bbox, _a) {
    var left = _a.left;
    return parseFloat(left);
  },
  bottom: function(_a, _b) {
    var y = _a.y;
    var top = _b.top;
    return parseFloat(top) + (y.max - y.min);
  },
  right: function(_a, _b) {
    var x = _a.x;
    var left = _b.left;
    return parseFloat(left) + (x.max - x.min);
  },
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = function(target, visualElement2, changedKeys) {
  var originBbox = visualElement2.measureViewportBox();
  var element = visualElement2.getInstance();
  var elementComputedStyle = getComputedStyle(element);
  var display = elementComputedStyle.display;
  var origin = {};
  if (display === "none") {
    visualElement2.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach(function(key) {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement2.syncRender();
  var targetBbox = visualElement2.measureViewportBox();
  changedKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    setAndResetVelocity(value, origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
};
var checkAndConvertChangedValueTypes = function(visualElement2, target, origin, transitionEnd) {
  if (origin === void 0) {
    origin = {};
  }
  if (transitionEnd === void 0) {
    transitionEnd = {};
  }
  target = (0, import_tslib33.__assign)({}, target);
  transitionEnd = (0, import_tslib33.__assign)({}, transitionEnd);
  var targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  var removedTransformValues = [];
  var hasAttemptedToRemoveTransformValues = false;
  var changedValueTypeKeys = [];
  targetPositionalKeys.forEach(function(key) {
    var value = visualElement2.getValue(key);
    if (!visualElement2.hasValue(key))
      return;
    var from = origin[key];
    var fromType = findDimensionValueType(from);
    var to = target[key];
    var toType;
    if (isKeyframesTarget(to)) {
      var numKeyframes = to.length;
      var fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (var i = fromIndex; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
          invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          invariant(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        var current = value.get();
        if (typeof current === "string") {
          value.set(parseFloat(current));
        }
        if (typeof to === "string") {
          target[key] = parseFloat(to);
        } else if (Array.isArray(to) && toType === px) {
          target[key] = to.map(parseFloat);
        }
      } else if ((fromType === null || fromType === void 0 ? void 0 : fromType.transform) && (toType === null || toType === void 0 ? void 0 : toType.transform) && (from === 0 || to === 0)) {
        if (from === 0) {
          value.set(toType.transform(from));
        } else {
          target[key] = fromType.transform(to);
        }
      } else {
        if (!hasAttemptedToRemoveTransformValues) {
          removedTransformValues = removeNonTranslationalTransform(visualElement2);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    var scrollY_1 = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    var convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(function(_a) {
        var _b = (0, import_tslib33.__read)(_a, 2), key = _b[0], value = _b[1];
        visualElement2.getValue(key).set(value);
      });
    }
    visualElement2.syncRender();
    if (scrollY_1 !== null)
      window.scrollTo({ top: scrollY_1 });
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
};
function unitConversion(visualElement2, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
var parseDomVariant = function(visualElement2, target, origin, transitionEnd) {
  var resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement2, target, origin, transitionEnd);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/html/visual-element.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var htmlConfig = {
  treeType: "dom",
  readValueFromInstance: function(domElement, key) {
    if (isTransformProp(key)) {
      var defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      var computedStyle = getComputedStyle2(domElement);
      return (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
    }
  },
  sortNodePosition: function(a2, b2) {
    return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
  },
  getBaseTarget: function(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  },
  measureViewportBox: function(element, _a) {
    var transformPagePoint = _a.transformPagePoint;
    return measureViewportBox(element, transformPagePoint);
  },
  resetTransform: function(element, domElement, props) {
    var transformTemplate = props.transformTemplate;
    domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    element.scheduleRender();
  },
  restoreTransform: function(instance, mutableState) {
    instance.style.transform = mutableState.style.transform;
  },
  removeValueFromRenderState: function(key, _a) {
    var vars = _a.vars, style2 = _a.style;
    delete vars[key];
    delete style2[key];
  },
  makeTargetAnimatable: function(element, _a, _b, isMounted) {
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = (0, import_tslib34.__rest)(_a, ["transition", "transitionEnd"]);
    var transformValues = _b.transformValues;
    if (isMounted === void 0) {
      isMounted = true;
    }
    var origin = getOrigin(target, transition || {}, element);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(element, target, origin);
      var parsed = parseDomVariant(element, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return (0, import_tslib34.__assign)({ transition, transitionEnd }, target);
  },
  scrapeMotionValuesFromProps,
  build: function(element, renderState, latestValues, options, props) {
    if (element.isVisible !== void 0) {
      renderState.style.visibility = element.isVisible ? "visible" : "hidden";
    }
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  },
  render: renderHTML
};
var htmlVisualElement = visualElement(htmlConfig);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/svg/visual-element.mjs
init_define_process();
var import_tslib35 = __toESM(require_tslib(), 1);
var svgVisualElement = visualElement((0, import_tslib35.__assign)((0, import_tslib35.__assign)({}, htmlConfig), { getBaseTarget: function(props, key) {
  return props[key];
}, readValueFromInstance: function(domElement, key) {
  var _a;
  if (isTransformProp(key)) {
    return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
  }
  key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
  return domElement.getAttribute(key);
}, scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, build: function(_element, renderState, latestValues, options, props) {
  buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
}, render: renderSVG }));

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = function(Component, options) {
  return isSVGComponent(Component) ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
init_define_process();
var import_tslib36 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
init_define_process();
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: function(latest, node) {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    var x = pixelsToPercent(latest, node.target.x);
    var y = pixelsToPercent(latest, node.target.y);
    return "".concat(x, "% ").concat(y, "%");
  }
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
init_define_process();
var varToken = "_$css";
var correctBoxShadow = {
  correct: function(latest, _a) {
    var treeScale = _a.treeScale, projectionDelta = _a.projectionDelta;
    var original = latest;
    var containsCSSVariables = latest.includes("var(");
    var cssVariables = [];
    if (containsCSSVariables) {
      latest = latest.replace(cssVariableRegex, function(match) {
        cssVariables.push(match);
        return varToken;
      });
    }
    var shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    var template = complex.createTransformer(latest);
    var offset = typeof shadow[0] !== "number" ? 1 : 0;
    var xScale = projectionDelta.x.scale * treeScale.x;
    var yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    var averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    var output = template(shadow);
    if (containsCSSVariables) {
      var i_1 = 0;
      output = output.replace(varToken, function() {
        var cssVariable = cssVariables[i_1];
        i_1++;
        return cssVariable;
      });
    }
    return output;
  }
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = function(_super) {
  (0, import_tslib36.__extends)(MeasureLayoutWithContext2, _super);
  function MeasureLayoutWithContext2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MeasureLayoutWithContext2.prototype.componentDidMount = function() {
    var _this = this;
    var _a = this.props, visualElement2 = _a.visualElement, layoutGroup = _a.layoutGroup, switchLayoutGroup = _a.switchLayoutGroup, layoutId = _a.layoutId;
    var projection = visualElement2.projection;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.add(projection);
      if ((switchLayoutGroup === null || switchLayoutGroup === void 0 ? void 0 : switchLayoutGroup.register) && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", function() {
        _this.safeToRemove();
      });
      projection.setOptions((0, import_tslib36.__assign)((0, import_tslib36.__assign)({}, projection.options), { onExitComplete: function() {
        return _this.safeToRemove();
      } }));
    }
    globalProjectionState.hasEverUpdated = true;
  };
  MeasureLayoutWithContext2.prototype.getSnapshotBeforeUpdate = function(prevProps) {
    var _this = this;
    var _a = this.props, layoutDependency = _a.layoutDependency, visualElement2 = _a.visualElement, drag2 = _a.drag, isPresent2 = _a.isPresent;
    var projection = visualElement2.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent2;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent2) {
      if (isPresent2) {
        projection.promote();
      } else if (!projection.relegate()) {
        es_default.postRender(function() {
          var _a2;
          if (!((_a2 = projection.getStack()) === null || _a2 === void 0 ? void 0 : _a2.members.length)) {
            _this.safeToRemove();
          }
        });
      }
    }
    return null;
  };
  MeasureLayoutWithContext2.prototype.componentDidUpdate = function() {
    var projection = this.props.visualElement.projection;
    if (projection) {
      projection.root.didUpdate();
      if (!projection.currentAnimation && projection.isLead()) {
        this.safeToRemove();
      }
    }
  };
  MeasureLayoutWithContext2.prototype.componentWillUnmount = function() {
    var _a = this.props, visualElement2 = _a.visualElement, layoutGroup = _a.layoutGroup, promoteContext = _a.switchLayoutGroup;
    var projection = visualElement2.projection;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  };
  MeasureLayoutWithContext2.prototype.safeToRemove = function() {
    var safeToRemove = this.props.safeToRemove;
    safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
  };
  MeasureLayoutWithContext2.prototype.render = function() {
    return null;
  };
  return MeasureLayoutWithContext2;
}(react_default.Component);
function MeasureLayout(props) {
  var _a = (0, import_tslib36.__read)(usePresence(), 2), isPresent2 = _a[0], safeToRemove = _a[1];
  var layoutGroup = useContext(LayoutGroupContext);
  return react_default.createElement(MeasureLayoutWithContext, (0, import_tslib36.__assign)({}, props, { layoutGroup, switchLayoutGroup: useContext(SwitchLayoutGroupContext), isPresent: isPresent2, safeToRemove }));
}
var defaultScaleCorrectors = {
  borderRadius: (0, import_tslib36.__assign)((0, import_tslib36.__assign)({}, correctBorderRadius), { applyTo: [
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
  ] }),
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
var layoutFeatures = {
  measureLayout: MeasureLayout
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
init_define_process();
var import_tslib38 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
init_define_process();
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = function(value) {
  return typeof value === "string" ? parseFloat(value) : value;
};
var isPx = function(value) {
  return typeof value === "number" || px.test(value);
};
function mixValues(target, follow, lead, progress3, shouldCrossfadeOpacity, isOnlyMember) {
  var _a, _b, _c, _d;
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(
      0,
      (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1,
      easeCrossfadeIn(progress3)
    );
    target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress3));
  } else if (isOnlyMember) {
    target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress3);
  }
  for (var i = 0; i < numBorders; i++) {
    var borderLabel = "border".concat(borders[i], "Radius");
    var followRadius = getRadius(follow, borderLabel);
    var leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    var canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress3), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress3);
  }
}
function getRadius(values, radiusName) {
  var _a;
  return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
  return function(p2) {
    if (p2 < min)
      return 0;
    if (p2 > max)
      return 1;
    return easing(progress(min, max, p2));
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
init_define_process();
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
init_define_process();
var import_tslib37 = __toESM(require_tslib(), 1);
function removePointDelta(point2, translate, scale2, originPoint, boxScale) {
  point2 -= translate;
  point2 = scalePoint(point2, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, 1 / boxScale, originPoint);
  }
  return point2;
}
function removeAxisDelta(axis, translate, scale2, origin, boxScale, originAxis, sourceAxis) {
  if (translate === void 0) {
    translate = 0;
  }
  if (scale2 === void 0) {
    scale2 = 1;
  }
  if (origin === void 0) {
    origin = 0.5;
  }
  if (originAxis === void 0) {
    originAxis = axis;
  }
  if (sourceAxis === void 0) {
    sourceAxis = axis;
  }
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    var relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  var originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms2, _a, origin, sourceAxis) {
  var _b = (0, import_tslib37.__read)(_a, 3), key = _b[0], scaleKey = _b[1], originKey = _b[2];
  removeAxisDelta(axis, transforms2[key], transforms2[scaleKey], transforms2[originKey], transforms2.scale, origin, sourceAxis);
}
var xKeys2 = ["x", "scaleX", "originX"];
var yKeys2 = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms2, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms2, xKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
  removeAxisTransforms(box.y, transforms2, yKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
init_define_process();
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a2, b2) {
  return a2.x.min === b2.x.min && a2.x.max === b2.x.max && a2.y.min === b2.y.min && a2.y.max === b2.y.max;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/shared/stack.mjs
init_define_process();
var NodeStack = function() {
  function NodeStack2() {
    this.members = [];
  }
  NodeStack2.prototype.add = function(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  };
  NodeStack2.prototype.remove = function(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      var prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  };
  NodeStack2.prototype.relegate = function(node) {
    var indexOfNode = this.members.findIndex(function(member2) {
      return node === member2;
    });
    if (indexOfNode === 0)
      return false;
    var prevLead;
    for (var i = indexOfNode; i >= 0; i--) {
      var member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  };
  NodeStack2.prototype.promote = function(node, preserveFollowOpacity) {
    var _a;
    var prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
        node.snapshot.isShared = true;
      }
      if ((_a = node.root) === null || _a === void 0 ? void 0 : _a.isUpdating) {
        node.isLayoutDirty = true;
      }
      var crossfade = node.options.crossfade;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  };
  NodeStack2.prototype.exitAnimationComplete = function() {
    this.members.forEach(function(node) {
      var _a, _b, _c, _d, _e;
      (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
    });
  };
  NodeStack2.prototype.scheduleRender = function() {
    this.members.forEach(function(node) {
      node.instance && node.scheduleRender(false);
    });
  };
  NodeStack2.prototype.removeLeadSnapshot = function() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  };
  return NodeStack2;
}();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/styles/transform.mjs
init_define_process();
var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)";
function buildProjectionTransform(delta, treeScale, latestTransform) {
  var xTranslate = delta.x.translate / treeScale.x;
  var yTranslate = delta.y.translate / treeScale.y;
  var transform2 = "translate3d(".concat(xTranslate, "px, ").concat(yTranslate, "px, 0) ");
  transform2 += "scale(".concat(1 / treeScale.x, ", ").concat(1 / treeScale.y, ") ");
  if (latestTransform) {
    var rotate = latestTransform.rotate, rotateX = latestTransform.rotateX, rotateY = latestTransform.rotateY;
    if (rotate)
      transform2 += "rotate(".concat(rotate, "deg) ");
    if (rotateX)
      transform2 += "rotateX(".concat(rotateX, "deg) ");
    if (rotateY)
      transform2 += "rotateY(".concat(rotateY, "deg) ");
  }
  var elementScaleX = delta.x.scale * treeScale.x;
  var elementScaleY = delta.y.scale * treeScale.y;
  transform2 += "scale(".concat(elementScaleX, ", ").concat(elementScaleY, ")");
  return transform2 === identityProjection ? "none" : transform2;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var animationTarget = 1e3;
function createProjectionNode(_a) {
  var attachResizeListener = _a.attachResizeListener, defaultParent = _a.defaultParent, measureScroll = _a.measureScroll, checkIsScrollRoot = _a.checkIsScrollRoot, resetTransform = _a.resetTransform;
  return function() {
    function ProjectionNode(id3, latestValues, parent) {
      if (latestValues === void 0) {
        latestValues = {};
      }
      if (parent === void 0) {
        parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent();
      }
      var _this = this;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.potentialNodes = /* @__PURE__ */ new Map();
      this.checkUpdateFailed = function() {
        if (_this.isUpdating) {
          _this.isUpdating = false;
          _this.clearAllSnapshots();
        }
      };
      this.updateProjection = function() {
        _this.nodes.forEach(resolveTargetDelta);
        _this.nodes.forEach(calcProjection);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.id = id3;
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? (0, import_tslib38.__spreadArray)((0, import_tslib38.__spreadArray)([], (0, import_tslib38.__read)(parent.path), false), [parent], false) : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      id3 && this.root.registerPotentialNode(id3, this);
      for (var i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    ProjectionNode.prototype.addEventListener = function(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    };
    ProjectionNode.prototype.notifyListeners = function(name) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify.apply(subscriptionManager, (0, import_tslib38.__spreadArray)([], (0, import_tslib38.__read)(args), false));
    };
    ProjectionNode.prototype.hasListeners = function(name) {
      return this.eventHandlers.has(name);
    };
    ProjectionNode.prototype.registerPotentialNode = function(id3, node) {
      this.potentialNodes.set(id3, node);
    };
    ProjectionNode.prototype.mount = function(instance, isLayoutDirty) {
      var _this = this;
      var _a2;
      if (isLayoutDirty === void 0) {
        isLayoutDirty = false;
      }
      if (this.instance)
        return;
      this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
      this.instance = instance;
      var _b = this.options, layoutId = _b.layoutId, layout = _b.layout, visualElement2 = _b.visualElement;
      if (visualElement2 && !visualElement2.getInstance()) {
        visualElement2.mount(instance);
      }
      this.root.nodes.add(this);
      (_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.children.add(this);
      this.id && this.root.potentialNodes.delete(this.id);
      if (isLayoutDirty && (layout || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        var unblockTimeout_1;
        var resizeUnblockUpdate_1 = function() {
          return _this.root.updateBlockedByResize = false;
        };
        attachResizeListener(instance, function() {
          _this.root.updateBlockedByResize = true;
          clearTimeout(unblockTimeout_1);
          unblockTimeout_1 = window.setTimeout(resizeUnblockUpdate_1, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            _this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement2 && (layoutId || layout)) {
        this.addEventListener("didUpdate", function(_a3) {
          var _b2, _c, _d, _e, _f;
          var delta = _a3.delta, hasLayoutChanged = _a3.hasLayoutChanged, hasRelativeTargetChanged = _a3.hasRelativeTargetChanged, newLayout = _a3.layout;
          if (_this.isTreeAnimationBlocked()) {
            _this.target = void 0;
            _this.relativeTarget = void 0;
            return;
          }
          var layoutTransition = (_c = (_b2 = _this.options.transition) !== null && _b2 !== void 0 ? _b2 : visualElement2.getDefaultTransition()) !== null && _c !== void 0 ? _c : defaultLayoutTransition;
          var _g = visualElement2.getProps(), onLayoutAnimationStart = _g.onLayoutAnimationStart, onLayoutAnimationComplete = _g.onLayoutAnimationComplete;
          var targetChanged = !_this.targetLayout || !boxEquals(_this.targetLayout, newLayout) || hasRelativeTargetChanged;
          var hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (((_d = _this.resumeFrom) === null || _d === void 0 ? void 0 : _d.instance) || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !_this.currentAnimation)) {
            if (_this.resumeFrom) {
              _this.resumingFrom = _this.resumeFrom;
              _this.resumingFrom.resumingFrom = void 0;
            }
            _this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            var animationOptions = (0, import_tslib38.__assign)((0, import_tslib38.__assign)({}, getValueTransition(layoutTransition, "layout")), { onPlay: onLayoutAnimationStart, onComplete: onLayoutAnimationComplete });
            if (visualElement2.shouldReduceMotion) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            _this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged && _this.animationProgress === 0) {
              _this.finishAnimation();
            }
            _this.isLead() && ((_f = (_e = _this.options).onExitComplete) === null || _f === void 0 ? void 0 : _f.call(_e));
          }
          _this.targetLayout = newLayout;
        });
      }
    };
    ProjectionNode.prototype.unmount = function() {
      var _a2, _b;
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.remove(this);
      (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
      this.instance = void 0;
      cancelSync.preRender(this.updateProjection);
    };
    ProjectionNode.prototype.blockUpdate = function() {
      this.updateManuallyBlocked = true;
    };
    ProjectionNode.prototype.unblockUpdate = function() {
      this.updateManuallyBlocked = false;
    };
    ProjectionNode.prototype.isUpdateBlocked = function() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    };
    ProjectionNode.prototype.isTreeAnimationBlocked = function() {
      var _a2;
      return this.isAnimationBlocked || ((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isTreeAnimationBlocked()) || false;
    };
    ProjectionNode.prototype.startUpdate = function() {
      var _a2;
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      (_a2 = this.nodes) === null || _a2 === void 0 ? void 0 : _a2.forEach(resetRotation);
    };
    ProjectionNode.prototype.willUpdate = function(shouldNotifyListeners) {
      var _a2, _b, _c;
      if (shouldNotifyListeners === void 0) {
        shouldNotifyListeners = true;
      }
      if (this.root.isUpdateBlocked()) {
        (_b = (_a2 = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a2);
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (var i = 0; i < this.path.length; i++) {
        var node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll();
      }
      var _d = this.options, layoutId = _d.layoutId, layout = _d.layout;
      if (layoutId === void 0 && !layout)
        return;
      var transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
      this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    };
    ProjectionNode.prototype.didUpdate = function() {
      var updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating)
        return;
      this.isUpdating = false;
      if (this.potentialNodes.size) {
        this.potentialNodes.forEach(mountNodeEarly);
        this.potentialNodes.clear();
      }
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      flushSync.update();
      flushSync.preRender();
      flushSync.render();
    };
    ProjectionNode.prototype.clearAllSnapshots = function() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    };
    ProjectionNode.prototype.scheduleUpdateProjection = function() {
      es_default.preRender(this.updateProjection, false, true);
    };
    ProjectionNode.prototype.scheduleCheckAfterUnmount = function() {
      var _this = this;
      es_default.postRender(function() {
        if (_this.isLayoutDirty) {
          _this.root.didUpdate();
        } else {
          _this.root.checkUpdateFailed();
        }
      });
    };
    ProjectionNode.prototype.updateSnapshot = function() {
      if (this.snapshot || !this.instance)
        return;
      var measured = this.measure();
      var layout = this.removeTransform(this.removeElementScroll(measured));
      roundBox(layout);
      this.snapshot = {
        measured,
        layout,
        latestValues: {}
      };
    };
    ProjectionNode.prototype.updateLayout = function() {
      var _a2;
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (var i = 0; i < this.path.length; i++) {
          var node = this.path[i];
          node.updateScroll();
        }
      }
      var measured = this.measure();
      roundBox(measured);
      var prevLayout = this.layout;
      this.layout = {
        measured,
        actual: this.removeElementScroll(measured)
      };
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.actual);
      (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.notifyLayoutMeasure(this.layout.actual, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.actual);
    };
    ProjectionNode.prototype.updateScroll = function() {
      if (this.options.layoutScroll && this.instance) {
        this.isScrollRoot = checkIsScrollRoot(this.instance);
        this.scroll = measureScroll(this.instance);
      }
    };
    ProjectionNode.prototype.resetTransform = function() {
      var _a2;
      if (!resetTransform)
        return;
      var isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      var hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      var transformTemplate = (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.getProps().transformTemplate;
      var transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      var transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    };
    ProjectionNode.prototype.measure = function() {
      var visualElement2 = this.options.visualElement;
      if (!visualElement2)
        return createBox();
      var box = visualElement2.measureViewportBox();
      var scroll2 = this.root.scroll;
      if (scroll2) {
        translateAxis(box.x, scroll2.x);
        translateAxis(box.y, scroll2.y);
      }
      return box;
    };
    ProjectionNode.prototype.removeElementScroll = function(box) {
      var boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (var i = 0; i < this.path.length; i++) {
        var node = this.path[i];
        var scroll_1 = node.scroll, options = node.options, isScrollRoot = node.isScrollRoot;
        if (node !== this.root && scroll_1 && options.layoutScroll) {
          if (isScrollRoot) {
            copyBoxInto(boxWithoutScroll, box);
            var rootScroll = this.root.scroll;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll_1.x);
          translateAxis(boxWithoutScroll.y, scroll_1.y);
        }
      }
      return boxWithoutScroll;
    };
    ProjectionNode.prototype.applyTransform = function(box, transformOnly) {
      if (transformOnly === void 0) {
        transformOnly = false;
      }
      var withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (var i = 0; i < this.path.length; i++) {
        var node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.x,
            y: -node.scroll.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    };
    ProjectionNode.prototype.removeTransform = function(box) {
      var _a2;
      var boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (var i = 0; i < this.path.length; i++) {
        var node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        var sourceBox = createBox();
        var nodeBox = node.measure();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a2 = node.snapshot) === null || _a2 === void 0 ? void 0 : _a2.layout, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    };
    ProjectionNode.prototype.setTargetDelta = function(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
    };
    ProjectionNode.prototype.setOptions = function(options) {
      var _a2;
      this.options = (0, import_tslib38.__assign)((0, import_tslib38.__assign)((0, import_tslib38.__assign)({}, this.options), options), { crossfade: (_a2 = options.crossfade) !== null && _a2 !== void 0 ? _a2 : true });
    };
    ProjectionNode.prototype.clearMeasurements = function() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    };
    ProjectionNode.prototype.resolveTargetDelta = function() {
      var _a2;
      var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
      if (!this.layout || !(layout || layoutId))
        return;
      if (!this.targetDelta && !this.relativeTarget) {
        this.relativeParent = this.getClosestProjectingParent();
        if (this.relativeParent && this.relativeParent.layout) {
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.actual, this.relativeParent.layout.actual);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.target)) {
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.actual);
        } else {
          copyBoxInto(this.target, this.layout.actual);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.actual);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        this.relativeParent = this.getClosestProjectingParent();
        if (this.relativeParent && Boolean(this.relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !this.relativeParent.options.layoutScroll && this.relativeParent.target) {
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, this.relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        }
      }
    };
    ProjectionNode.prototype.getClosestProjectingParent = function() {
      if (!this.parent || hasTransform(this.parent.latestValues))
        return void 0;
      if ((this.parent.relativeTarget || this.parent.targetDelta) && this.parent.layout) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    };
    ProjectionNode.prototype.calcProjection = function() {
      var _a2;
      var _b = this.options, layout = _b.layout, layoutId = _b.layoutId;
      this.isTreeAnimating = Boolean(((_a2 = this.parent) === null || _a2 === void 0 ? void 0 : _a2.isTreeAnimating) || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout || layoutId))
        return;
      var lead = this.getLead();
      copyBoxInto(this.layoutCorrected, this.layout.actual);
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, Boolean(this.resumingFrom) || this !== lead);
      var target = lead.target;
      if (!target)
        return;
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      var prevTreeScaleX = this.treeScale.x;
      var prevTreeScaleY = this.treeScale.y;
      var prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
    };
    ProjectionNode.prototype.hide = function() {
      this.isVisible = false;
    };
    ProjectionNode.prototype.show = function() {
      this.isVisible = true;
    };
    ProjectionNode.prototype.scheduleRender = function(notifyAll2) {
      var _a2, _b, _c;
      if (notifyAll2 === void 0) {
        notifyAll2 = true;
      }
      (_b = (_a2 = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a2);
      notifyAll2 && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    };
    ProjectionNode.prototype.setAnimationOrigin = function(delta, hasOnlyRelativeTargetChanged) {
      var _this = this;
      var _a2;
      if (hasOnlyRelativeTargetChanged === void 0) {
        hasOnlyRelativeTargetChanged = false;
      }
      var snapshot = this.snapshot;
      var snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
      var mixedValues = (0, import_tslib38.__assign)({}, this.latestValues);
      var targetDelta = createDelta();
      this.relativeTarget = this.relativeTargetOrigin = void 0;
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      var relativeLayout = createBox();
      var isSharedLayoutAnimation = snapshot === null || snapshot === void 0 ? void 0 : snapshot.isShared;
      var isOnlyMember = (((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.members.length) || 0) <= 1;
      var shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      this.mixTargetDelta = function(latest) {
        var _a3;
        var progress3 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress3);
        mixAxisDelta(targetDelta.y, delta.y, progress3);
        _this.setTargetDelta(targetDelta);
        if (_this.relativeTarget && _this.relativeTargetOrigin && _this.layout && ((_a3 = _this.relativeParent) === null || _a3 === void 0 ? void 0 : _a3.layout)) {
          calcRelativePosition(relativeLayout, _this.layout.actual, _this.relativeParent.layout.actual);
          mixBox(_this.relativeTarget, _this.relativeTargetOrigin, relativeLayout, progress3);
        }
        if (isSharedLayoutAnimation) {
          _this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, _this.latestValues, progress3, shouldCrossfadeOpacity, isOnlyMember);
        }
        _this.root.scheduleUpdateProjection();
        _this.scheduleRender();
        _this.animationProgress = progress3;
      };
      this.mixTargetDelta(0);
    };
    ProjectionNode.prototype.startAnimation = function(options) {
      var _this = this;
      var _a2, _b;
      this.notifyListeners("animationStart");
      (_a2 = this.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
      if (this.resumingFrom) {
        (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
      }
      if (this.pendingAnimation) {
        cancelSync.update(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = es_default.update(function() {
        globalProjectionState.hasAnimatedSinceResize = true;
        _this.currentAnimation = animate2(0, animationTarget, (0, import_tslib38.__assign)((0, import_tslib38.__assign)({}, options), { onUpdate: function(latest) {
          var _a3;
          _this.mixTargetDelta(latest);
          (_a3 = options.onUpdate) === null || _a3 === void 0 ? void 0 : _a3.call(options, latest);
        }, onComplete: function() {
          var _a3;
          (_a3 = options.onComplete) === null || _a3 === void 0 ? void 0 : _a3.call(options);
          _this.completeAnimation();
        } }));
        if (_this.resumingFrom) {
          _this.resumingFrom.currentAnimation = _this.currentAnimation;
        }
        _this.pendingAnimation = void 0;
      });
    };
    ProjectionNode.prototype.completeAnimation = function() {
      var _a2;
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    };
    ProjectionNode.prototype.finishAnimation = function() {
      var _a2;
      if (this.currentAnimation) {
        (_a2 = this.mixTargetDelta) === null || _a2 === void 0 ? void 0 : _a2.call(this, animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    };
    ProjectionNode.prototype.applyTransformsToTarget = function() {
      var _a2 = this.getLead(), targetWithTransforms = _a2.targetWithTransforms, target = _a2.target, layout = _a2.layout, latestValues = _a2.latestValues;
      if (!targetWithTransforms || !target || !layout)
        return;
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    };
    ProjectionNode.prototype.registerSharedNode = function(layoutId, node) {
      var _a2, _b, _c;
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      var stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      node.promote({
        transition: (_a2 = node.options.initialPromotionConfig) === null || _a2 === void 0 ? void 0 : _a2.transition,
        preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node)
      });
    };
    ProjectionNode.prototype.isLead = function() {
      var stack = this.getStack();
      return stack ? stack.lead === this : true;
    };
    ProjectionNode.prototype.getLead = function() {
      var _a2;
      var layoutId = this.options.layoutId;
      return layoutId ? ((_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.lead) || this : this;
    };
    ProjectionNode.prototype.getPrevLead = function() {
      var _a2;
      var layoutId = this.options.layoutId;
      return layoutId ? (_a2 = this.getStack()) === null || _a2 === void 0 ? void 0 : _a2.prevLead : void 0;
    };
    ProjectionNode.prototype.getStack = function() {
      var layoutId = this.options.layoutId;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    };
    ProjectionNode.prototype.promote = function(_a2) {
      var _b = _a2 === void 0 ? {} : _a2, needsReset = _b.needsReset, transition = _b.transition, preserveFollowOpacity = _b.preserveFollowOpacity;
      var stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    };
    ProjectionNode.prototype.relegate = function() {
      var stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    };
    ProjectionNode.prototype.resetRotation = function() {
      var visualElement2 = this.options.visualElement;
      if (!visualElement2)
        return;
      var hasRotate = false;
      var resetValues = {};
      for (var i = 0; i < transformAxes.length; i++) {
        var axis = transformAxes[i];
        var key = "rotate" + axis;
        if (!visualElement2.getStaticValue(key)) {
          continue;
        }
        hasRotate = true;
        resetValues[key] = visualElement2.getStaticValue(key);
        visualElement2.setStaticValue(key, 0);
      }
      if (!hasRotate)
        return;
      visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.syncRender();
      for (var key in resetValues) {
        visualElement2.setStaticValue(key, resetValues[key]);
      }
      visualElement2.scheduleRender();
    };
    ProjectionNode.prototype.getProjectionStyles = function(styleProp) {
      var _a2, _b, _c, _d, _e, _f;
      if (styleProp === void 0) {
        styleProp = {};
      }
      var styles = {};
      if (!this.instance || this.isSVG)
        return styles;
      if (!this.isVisible) {
        return { visibility: "hidden" };
      } else {
        styles.visibility = "";
      }
      var transformTemplate = (_a2 = this.options.visualElement) === null || _a2 === void 0 ? void 0 : _a2.getProps().transformTemplate;
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      var lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        var emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = (_b = this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      var valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      var _g = this.projectionDelta, x = _g.x, y = _g.y;
      styles.transformOrigin = "".concat(x.origin * 100, "% ").concat(y.origin * 100, "% 0");
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_d = (_c = valuesToRender.opacity) !== null && _c !== void 0 ? _c : this.latestValues.opacity) !== null && _d !== void 0 ? _d : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? (_e = valuesToRender.opacity) !== null && _e !== void 0 ? _e : "" : (_f = valuesToRender.opacityExit) !== null && _f !== void 0 ? _f : 0;
      }
      for (var key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        var _h = scaleCorrectors[key], correct = _h.correct, applyTo = _h.applyTo;
        var corrected = correct(valuesToRender[key], lead);
        if (applyTo) {
          var num = applyTo.length;
          for (var i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          styles[key] = corrected;
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    };
    ProjectionNode.prototype.clearSnapshot = function() {
      this.resumeFrom = this.snapshot = void 0;
    };
    ProjectionNode.prototype.resetTree = function() {
      this.root.nodes.forEach(function(node) {
        var _a2;
        return (_a2 = node.currentAnimation) === null || _a2 === void 0 ? void 0 : _a2.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    };
    return ProjectionNode;
  }();
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a, _b, _c, _d;
  var snapshot = (_b = (_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) !== null && _b !== void 0 ? _b : node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    var _e = node.layout, layout_1 = _e.actual, measuredLayout = _e.measured;
    if (node.options.animationType === "size") {
      eachAxis(function(axis) {
        var axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
        var length2 = calcLength(axisSnapshot);
        axisSnapshot.min = layout_1[axis].min;
        axisSnapshot.max = axisSnapshot.min + length2;
      });
    } else if (node.options.animationType === "position") {
      eachAxis(function(axis) {
        var axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
        var length2 = calcLength(layout_1[axis]);
        axisSnapshot.max = axisSnapshot.min + length2;
      });
    }
    var layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout_1, snapshot.layout);
    var visualDelta = createDelta();
    if (snapshot.isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measured);
    } else {
      calcBoxDelta(visualDelta, layout_1, snapshot.layout);
    }
    var hasLayoutChanged = !isDeltaZero(layoutDelta);
    var hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      node.relativeParent = node.getClosestProjectingParent();
      if (node.relativeParent && !node.relativeParent.resumeFrom) {
        var _f = node.relativeParent, parentSnapshot = _f.snapshot, parentLayout = _f.layout;
        if (parentSnapshot && parentLayout) {
          var relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layout, parentSnapshot.layout);
          var relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout_1, parentLayout.actual);
          if (!boxEquals(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout_1,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    (_d = (_c = node.options).onExitComplete) === null || _d === void 0 ? void 0 : _d.call(_c);
  }
  node.options.transition = void 0;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function resetTransformStyle(node) {
  var visualElement2 = node.options.visualElement;
  if (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.getProps().onBeforeLayoutMeasure) {
    visualElement2.notifyBeforeLayoutMeasure();
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetRotation(node) {
  node.resetRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p2) {
  output.translate = mix(delta.translate, 0, p2);
  output.scale = mix(delta.scale, 1, p2);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p2) {
  output.min = mix(from.min, to.min, p2);
  output.max = mix(from.max, to.max, p2);
}
function mixBox(output, from, to, p2) {
  mixAxis(output.x, from.x, to.x, p2);
  mixAxis(output.y, from.y, to.y, p2);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function mountNodeEarly(node, id3) {
  var searchNode = node.root;
  for (var i = node.path.length - 1; i >= 0; i--) {
    if (Boolean(node.path[i].instance)) {
      searchNode = node.path[i];
      break;
    }
  }
  var searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
  var element = searchElement.querySelector('[data-projection-id="'.concat(id3, '"]'));
  if (element)
    node.mount(element, true);
}
function roundAxis(axis) {
  axis.min = Math.round(axis.min);
  axis.max = Math.round(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
init_define_process();
var DocumentProjectionNode = createProjectionNode({
  attachResizeListener: function(ref, notify2) {
    return addDomEvent(ref, "resize", notify2);
  },
  measureScroll: function() {
    return {
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop
    };
  },
  checkIsScrollRoot: function() {
    return true;
  }
});

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode({
  measureScroll: function(instance) {
    return {
      x: instance.scrollLeft,
      y: instance.scrollTop
    };
  },
  defaultParent: function() {
    if (!rootProjectionNode.current) {
      var documentNode = new DocumentProjectionNode(0, {});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: function(instance, value) {
    instance.style.transform = value !== null && value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: function(instance) {
    return Boolean(window.getComputedStyle(instance).position === "fixed");
  }
});

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/motion.mjs
var featureBundle = (0, import_tslib39.__assign)((0, import_tslib39.__assign)((0, import_tslib39.__assign)((0, import_tslib39.__assign)({}, animations), gestureAnimations), drag), layoutFeatures);
var motion = createMotionProxy(function(Component, config) {
  return createDomMotionConfig(Component, config, featureBundle, createDomVisualElement, HTMLProjectionNode);
});
function createDomMotionComponent(key) {
  return createMotionComponent(createDomMotionConfig(key, { forwardMotionProps: false }, featureBundle, createDomVisualElement, HTMLProjectionNode));
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/motion-minimal.mjs
init_define_process();
var m = createMotionProxy(createDomMotionConfig);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-force-update.mjs
init_define_process();
var import_tslib40 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-is-mounted.mjs
init_define_process();
function useIsMounted() {
  var isMounted = useRef(false);
  useIsomorphicLayoutEffect(function() {
    isMounted.current = true;
    return function() {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-force-update.mjs
function useForceUpdate() {
  var isMounted = useIsMounted();
  var _a = (0, import_tslib40.__read)(useState(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
  var forceRender = useCallback(function() {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  var deferredForceRender = useCallback(function() {
    return es_default.postRender(forceRender);
  }, [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
init_define_process();
var import_tslib42 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
init_define_process();
var import_tslib41 = __toESM(require_tslib(), 1);
var PresenceChild = function(_a) {
  var children = _a.children, initial = _a.initial, isPresent2 = _a.isPresent, onExitComplete = _a.onExitComplete, custom = _a.custom, presenceAffectsLayout = _a.presenceAffectsLayout;
  var presenceChildren = useConstant(newChildrenMap);
  var id3 = useId();
  var context = useMemo(
    function() {
      return {
        id: id3,
        initial,
        isPresent: isPresent2,
        custom,
        onExitComplete: function(childId) {
          var e_1, _a2;
          presenceChildren.set(childId, true);
          try {
            for (var _b = (0, import_tslib41.__values)(presenceChildren.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
              var isComplete = _c.value;
              if (!isComplete)
                return;
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a2 = _b.return))
                _a2.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete();
        },
        register: function(childId) {
          presenceChildren.set(childId, false);
          return function() {
            return presenceChildren.delete(childId);
          };
        }
      };
    },
    presenceAffectsLayout ? void 0 : [isPresent2]
  );
  useMemo(function() {
    presenceChildren.forEach(function(_, key) {
      return presenceChildren.set(key, false);
    });
  }, [isPresent2]);
  useEffect(function() {
    !isPresent2 && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
  }, [isPresent2]);
  return createElement(PresenceContext.Provider, { value: context }, children);
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var getChildKey = function(child) {
  return child.key || "";
};
function updateChildLookup(children, allChildren) {
  children.forEach(function(child) {
    var key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  var filtered = [];
  Children.forEach(children, function(child) {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
var AnimatePresence = function(_a) {
  var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
  var _d = (0, import_tslib42.__read)(useForceUpdate(), 1), forceRender = _d[0];
  var forceRenderLayoutGroup = useContext(LayoutGroupContext).forceRender;
  if (forceRenderLayoutGroup)
    forceRender = forceRenderLayoutGroup;
  var isMounted = useIsMounted();
  var filteredChildren = onlyElements(children);
  var childrenToRender = filteredChildren;
  var exiting = /* @__PURE__ */ new Set();
  var presentChildren = useRef(childrenToRender);
  var allChildren = useRef(/* @__PURE__ */ new Map()).current;
  var isInitialRender = useRef(true);
  useIsomorphicLayoutEffect(function() {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(function() {
    isInitialRender.current = true;
    allChildren.clear();
    exiting.clear();
  });
  if (isInitialRender.current) {
    return createElement(p, null, childrenToRender.map(function(child) {
      return createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout }, child);
    }));
  }
  childrenToRender = (0, import_tslib42.__spreadArray)([], (0, import_tslib42.__read)(childrenToRender), false);
  var presentKeys = presentChildren.current.map(getChildKey);
  var targetKeys = filteredChildren.map(getChildKey);
  var numPresent = presentKeys.length;
  for (var i = 0; i < numPresent; i++) {
    var key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    }
  }
  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  }
  exiting.forEach(function(key2) {
    if (targetKeys.indexOf(key2) !== -1)
      return;
    var child = allChildren.get(key2);
    if (!child)
      return;
    var insertionIndex = presentKeys.indexOf(key2);
    var onExit = function() {
      allChildren.delete(key2);
      exiting.delete(key2);
      var removeIndex = presentChildren.current.findIndex(function(presentChild) {
        return presentChild.key === key2;
      });
      presentChildren.current.splice(removeIndex, 1);
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        if (isMounted.current === false)
          return;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };
    childrenToRender.splice(insertionIndex, 0, createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout }, child));
  });
  childrenToRender = childrenToRender.map(function(child) {
    var key2 = child.key;
    return exiting.has(key2) ? child : createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout }, child);
  });
  if (env !== "production" && exitBeforeEnter && childrenToRender.length > 1) {
    console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.");
  }
  return createElement(p, null, exiting.size ? childrenToRender : childrenToRender.map(function(child) {
    return cloneElement(child);
  }));
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/DeprecatedLayoutGroupContext.mjs
init_define_process();
var DeprecatedLayoutGroupContext = createContext(null);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs
init_define_process();
var import_tslib43 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/node/group.mjs
init_define_process();
var notify = function(node) {
  return !node.isLayoutDirty && node.willUpdate(false);
};
function nodeGroup() {
  var nodes = /* @__PURE__ */ new Set();
  var subscriptions = /* @__PURE__ */ new WeakMap();
  var dirtyAll = function() {
    return nodes.forEach(notify);
  };
  return {
    add: function(node) {
      nodes.add(node);
      subscriptions.set(node, node.addEventListener("willUpdate", dirtyAll));
    },
    remove: function(node) {
      var _a;
      nodes.delete(node);
      (_a = subscriptions.get(node)) === null || _a === void 0 ? void 0 : _a();
      subscriptions.delete(node);
      dirtyAll();
    },
    dirty: dirtyAll
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs
var shouldInheritGroup = function(inherit) {
  return inherit === true;
};
var shouldInheritId = function(inherit) {
  return shouldInheritGroup(inherit === true) || inherit === "id";
};
var LayoutGroup = function(_a) {
  var _b, _c;
  var children = _a.children, id3 = _a.id, inheritId = _a.inheritId, _d = _a.inherit, inherit = _d === void 0 ? true : _d;
  if (inheritId !== void 0)
    inherit = inheritId;
  var layoutGroupContext = useContext(LayoutGroupContext);
  var deprecatedLayoutGroupContext = useContext(DeprecatedLayoutGroupContext);
  var _e = (0, import_tslib43.__read)(useForceUpdate(), 2), forceRender = _e[0], key = _e[1];
  var context = useRef(null);
  var upstreamId = (_b = layoutGroupContext.id) !== null && _b !== void 0 ? _b : deprecatedLayoutGroupContext;
  if (context.current === null) {
    if (shouldInheritId(inherit) && upstreamId) {
      id3 = id3 ? upstreamId + "-" + id3 : upstreamId;
    }
    context.current = {
      id: id3,
      group: shouldInheritGroup(inherit) ? (_c = layoutGroupContext === null || layoutGroupContext === void 0 ? void 0 : layoutGroupContext.group) !== null && _c !== void 0 ? _c : nodeGroup() : nodeGroup()
    };
  }
  var memoizedContext = useMemo(function() {
    return (0, import_tslib43.__assign)((0, import_tslib43.__assign)({}, context.current), { forceRender });
  }, [key]);
  return createElement(LayoutGroupContext.Provider, { value: memoizedContext }, children);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/AnimateSharedLayout.mjs
init_define_process();
var id2 = 0;
var AnimateSharedLayout = function(_a) {
  var children = _a.children;
  useEffect(function() {
    warning(false, "AnimateSharedLayout is deprecated: https://www.framer.com/docs/guide-upgrade/##shared-layout-animations");
  }, []);
  return createElement(LayoutGroup, { id: useConstant(function() {
    return "asl-".concat(id2++);
  }) }, children);
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs
init_define_process();
var import_tslib44 = __toESM(require_tslib(), 1);
function MotionConfig(_a) {
  var children = _a.children, isValidProp = _a.isValidProp, config = (0, import_tslib44.__rest)(_a, ["children", "isValidProp"]);
  isValidProp && loadExternalIsValidProp(isValidProp);
  config = (0, import_tslib44.__assign)((0, import_tslib44.__assign)({}, useContext(MotionConfigContext)), config);
  config.isStatic = useConstant(function() {
    return config.isStatic;
  });
  var context = useMemo(function() {
    return config;
  }, [JSON.stringify(config.transition), config.transformPagePoint, config.reducedMotion]);
  return createElement(MotionConfigContext.Provider, { value: context }, children);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/LazyMotion/index.mjs
init_define_process();
var import_tslib45 = __toESM(require_tslib(), 1);
function LazyMotion(_a) {
  var children = _a.children, features = _a.features, _b = _a.strict, strict = _b === void 0 ? false : _b;
  var _c = (0, import_tslib45.__read)(useState(!isLazyBundle(features)), 2), setIsLoaded = _c[1];
  var loadedRenderer = useRef(void 0);
  if (!isLazyBundle(features)) {
    var renderer = features.renderer, loadedFeatures = (0, import_tslib45.__rest)(features, ["renderer"]);
    loadedRenderer.current = renderer;
    loadFeatures(loadedFeatures);
  }
  useEffect(function() {
    if (isLazyBundle(features)) {
      features().then(function(_a2) {
        var renderer2 = _a2.renderer, loadedFeatures2 = (0, import_tslib45.__rest)(_a2, ["renderer"]);
        loadFeatures(loadedFeatures2);
        loadedRenderer.current = renderer2;
        setIsLoaded(true);
      });
    }
  }, []);
  return createElement(LazyContext.Provider, { value: { renderer: loadedRenderer.current, strict } }, children);
}
function isLazyBundle(features) {
  return typeof features === "function";
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-motion-value.mjs
init_define_process();
var import_tslib46 = __toESM(require_tslib(), 1);
function useMotionValue(initial) {
  var value = useConstant(function() {
    return motionValue(initial);
  });
  var isStatic = useContext(MotionConfigContext).isStatic;
  if (isStatic) {
    var _a = (0, import_tslib46.__read)(useState(initial), 2), setLatest_1 = _a[1];
    useEffect(function() {
      return value.onChange(setLatest_1);
    }, []);
  }
  return value;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/transform.mjs
init_define_process();
var import_tslib47 = __toESM(require_tslib(), 1);
var isCustomValueType = function(v) {
  return typeof v === "object" && v.mix;
};
var getMixer2 = function(v) {
  return isCustomValueType(v) ? v.mix : void 0;
};
function transform() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var useImmediate = !Array.isArray(args[0]);
  var argOffset = useImmediate ? 0 : -1;
  var inputValue = args[0 + argOffset];
  var inputRange = args[1 + argOffset];
  var outputRange = args[2 + argOffset];
  var options = args[3 + argOffset];
  var interpolator = interpolate(inputRange, outputRange, (0, import_tslib47.__assign)({ mixer: getMixer2(outputRange[0]) }, options));
  return useImmediate ? interpolator(inputValue) : interpolator;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-transform.mjs
init_define_process();
var import_tslib48 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-combine-values.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-on-change.mjs
init_define_process();
function useOnChange(value, callback) {
  useIsomorphicLayoutEffect(function() {
    if (isMotionValue(value))
      return value.onChange(callback);
  }, [callback]);
}
function useMultiOnChange(values, handler) {
  useIsomorphicLayoutEffect(function() {
    var subscriptions = values.map(function(value) {
      return value.onChange(handler);
    });
    return function() {
      return subscriptions.forEach(function(unsubscribe) {
        return unsubscribe();
      });
    };
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
  var value = useMotionValue(combineValues());
  var updateValue = function() {
    return value.set(combineValues());
  };
  updateValue();
  useMultiOnChange(values, function() {
    return es_default.update(updateValue, false, true);
  });
  return value;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-transform.mjs
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  var transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], function(_a) {
    var _b = (0, import_tslib48.__read)(_a, 1), latest = _b[0];
    return transformer(latest);
  });
}
function useListTransform(values, transformer) {
  var latest = useConstant(function() {
    return [];
  });
  return useCombineMotionValues(values, function() {
    latest.length = 0;
    var numValues = values.length;
    for (var i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/Reorder/index.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Group.mjs
init_define_process();
var import_tslib49 = __toESM(require_tslib(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/context/ReorderContext.mjs
init_define_process();
var ReorderContext = createContext(null);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/Reorder/utils/check-reorder.mjs
init_define_process();
function checkReorder(order3, value, offset, velocity) {
  if (!velocity)
    return order3;
  var index = order3.findIndex(function(item2) {
    return item2.value === value;
  });
  if (index === -1)
    return order3;
  var nextOffset = velocity > 0 ? 1 : -1;
  var nextItem = order3[index + nextOffset];
  if (!nextItem)
    return order3;
  var item = order3[index];
  var nextLayout = nextItem.layout;
  var nextItemCenter = mix(nextLayout.min, nextLayout.max, 0.5);
  if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) {
    return moveItem(order3, index, index + nextOffset);
  }
  return order3;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Group.mjs
function ReorderGroup(_a, externalRef) {
  var children = _a.children, _b = _a.as, as = _b === void 0 ? "ul" : _b, _c = _a.axis, axis = _c === void 0 ? "y" : _c, onReorder = _a.onReorder, values = _a.values, props = (0, import_tslib49.__rest)(_a, ["children", "as", "axis", "onReorder", "values"]);
  var Component = useConstant(function() {
    return motion(as);
  });
  var order3 = [];
  var isReordering = useRef(false);
  invariant(Boolean(values), "Reorder.Group must be provided a values prop");
  var context = {
    axis,
    registerItem: function(value, layout) {
      if (layout && order3.findIndex(function(entry) {
        return value === entry.value;
      }) === -1) {
        order3.push({ value, layout: layout[axis] });
        order3.sort(compareMin);
      }
    },
    updateOrder: function(id3, offset, velocity) {
      if (isReordering.current)
        return;
      var newOrder = checkReorder(order3, id3, offset, velocity);
      if (order3 !== newOrder) {
        isReordering.current = true;
        onReorder(newOrder.map(getValue).filter(function(value) {
          return values.indexOf(value) !== -1;
        }));
      }
    }
  };
  useEffect(function() {
    isReordering.current = false;
  });
  return createElement(
    Component,
    (0, import_tslib49.__assign)({}, props, { ref: externalRef }),
    createElement(ReorderContext.Provider, { value: context }, children)
  );
}
var Group = forwardRef(ReorderGroup);
function getValue(item) {
  return item.value;
}
function compareMin(a2, b2) {
  return a2.layout.min - b2.layout.min;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/Reorder/Item.mjs
init_define_process();
var import_tslib50 = __toESM(require_tslib(), 1);
function useDefaultMotionValue(value, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = 0;
  }
  return isMotionValue(value) ? value : useMotionValue(defaultValue);
}
function ReorderItem(_a, externalRef) {
  var children = _a.children, style2 = _a.style, value = _a.value, _b = _a.as, as = _b === void 0 ? "li" : _b, onDrag = _a.onDrag, _c = _a.layout, layout = _c === void 0 ? true : _c, props = (0, import_tslib50.__rest)(_a, ["children", "style", "value", "as", "onDrag", "layout"]);
  var Component = useConstant(function() {
    return motion(as);
  });
  var context = useContext(ReorderContext);
  var point2 = {
    x: useDefaultMotionValue(style2 === null || style2 === void 0 ? void 0 : style2.x),
    y: useDefaultMotionValue(style2 === null || style2 === void 0 ? void 0 : style2.y)
  };
  var zIndex = useTransform([point2.x, point2.y], function(_a2) {
    var _b2 = (0, import_tslib50.__read)(_a2, 2), latestX = _b2[0], latestY = _b2[1];
    return latestX || latestY ? 1 : "unset";
  });
  var measuredLayout = useRef(null);
  invariant(Boolean(context), "Reorder.Item must be a child of Reorder.Group");
  var _d = context, axis = _d.axis, registerItem = _d.registerItem, updateOrder = _d.updateOrder;
  useEffect(function() {
    registerItem(value, measuredLayout.current);
  }, [context]);
  return createElement(Component, (0, import_tslib50.__assign)({ drag: axis }, props, { dragSnapToOrigin: true, style: (0, import_tslib50.__assign)((0, import_tslib50.__assign)({}, style2), { x: point2.x, y: point2.y, zIndex }), layout, onDrag: function(event, gesturePoint) {
    var velocity = gesturePoint.velocity;
    velocity[axis] && updateOrder(value, point2[axis].get(), velocity[axis]);
    onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, gesturePoint);
  }, onLayoutMeasure: function(measured) {
    measuredLayout.current = measured;
  }, ref: externalRef }), children);
}
var Item = forwardRef(ReorderItem);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/components/Reorder/index.mjs
var Reorder = {
  Group,
  Item
};

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/features-animation.mjs
init_define_process();
var import_tslib51 = __toESM(require_tslib(), 1);
var domAnimation = (0, import_tslib51.__assign)((0, import_tslib51.__assign)({ renderer: createDomVisualElement }, animations), gestureAnimations);

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/render/dom/features-max.mjs
init_define_process();
var import_tslib52 = __toESM(require_tslib(), 1);
var domMax = (0, import_tslib52.__assign)((0, import_tslib52.__assign)((0, import_tslib52.__assign)((0, import_tslib52.__assign)({}, domAnimation), drag), layoutFeatures), { projectionNodeConstructor: HTMLProjectionNode });

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-motion-template.mjs
init_define_process();
function useMotionTemplate(fragments) {
  var values = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    values[_i - 1] = arguments[_i];
  }
  var numFragments = fragments.length;
  function buildValue() {
    var output = "";
    for (var i = 0; i < numFragments; i++) {
      output += fragments[i];
      var value = values[i];
      if (value)
        output += values[i].get();
    }
    return output;
  }
  return useCombineMotionValues(values, buildValue);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-spring.mjs
init_define_process();
var import_tslib53 = __toESM(require_tslib(), 1);
function useSpring(source, config) {
  if (config === void 0) {
    config = {};
  }
  var isStatic = useContext(MotionConfigContext).isStatic;
  var activeSpringAnimation = useRef(null);
  var value = useMotionValue(isMotionValue(source) ? source.get() : source);
  useMemo(function() {
    return value.attach(function(v, set) {
      if (isStatic)
        return set(v);
      if (activeSpringAnimation.current) {
        activeSpringAnimation.current.stop();
      }
      activeSpringAnimation.current = animate((0, import_tslib53.__assign)((0, import_tslib53.__assign)({ from: value.get(), to: v, velocity: value.getVelocity() }, config), { onUpdate: set }));
      return value.get();
    });
  }, [JSON.stringify(config)]);
  useOnChange(source, function(v) {
    return value.set(parseFloat(v));
  });
  return value;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-velocity.mjs
init_define_process();
function useVelocity(value) {
  var velocity = useMotionValue(value.getVelocity());
  useEffect(function() {
    return value.velocityUpdateSubscribers.add(function(newVelocity) {
      velocity.set(newVelocity);
    });
  }, [value]);
  return velocity;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-scroll.mjs
init_define_process();
var import_tslib58 = __toESM(require_tslib(), 1);

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/animate-style.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/data.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-types-npm-10.13.0-93a0581fca-9.zip/node_modules/@motionone/types/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-types-npm-10.13.0-93a0581fca-9.zip/node_modules/@motionone/types/dist/MotionValue.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/css-var.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/transforms.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/array.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/clamp.es.js
init_define_process();
var clamp3 = (min, max, v) => Math.min(Math.max(v, min), max);

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/defaults.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/easing.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-easing-list.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-number.es.js
init_define_process();
var isNumber = (value) => typeof value === "number";

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-easing-list.es.js
var isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/wrap.es.js
init_define_process();
var wrap2 = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/easing.es.js
function getEasingForSegment(easing, i) {
  return isEasingList(easing) ? easing[wrap2(0, easing.length, i)] : easing;
}

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/interpolate.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/mix.es.js
init_define_process();
var mix2 = (min, max, progress3) => -progress3 * min + progress3 * max + min;

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/noop.es.js
init_define_process();
var noopReturn = (v) => v;

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/offset.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/progress.es.js
init_define_process();
var progress2 = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/offset.es.js
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress2(0, remaining, i);
    offset.push(mix2(min, 1, offsetProgress));
  }
}
function defaultOffset2(length2) {
  const offset = [0];
  fillOffset(offset, length2 - 1);
  return offset;
}

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/interpolate.es.js
function interpolate2(output, input = defaultOffset2(output.length), easing = noopReturn) {
  const length2 = output.length;
  const remainder = length2 - input.length;
  remainder > 0 && fillOffset(input, remainder);
  return (t) => {
    let i = 0;
    for (; i < length2 - 2; i++) {
      if (t < input[i + 1])
        break;
    }
    let progressInRange = clamp3(0, 1, progress2(input[i], input[i + 1], t));
    const segmentEasing = getEasingForSegment(easing, i);
    progressInRange = segmentEasing(progressInRange);
    return mix2(output[i], output[i + 1], progressInRange);
  };
}

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-cubic-bezier.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-easing-generator.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-function.es.js
init_define_process();
var isFunction = (value) => typeof value === "function";

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/is-string.es.js
init_define_process();
var isString2 = (value) => typeof value === "string";

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/time.es.js
init_define_process();
var time = {
  ms: (seconds) => seconds * 1e3,
  s: (milliseconds) => milliseconds / 1e3
};

// ../../.yarn/global/cache/@motionone-utils-npm-10.13.1-dd28af78aa-9.zip/node_modules/@motionone/utils/dist/velocity.es.js
init_define_process();
function velocityPerSecond2(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/transforms.es.js
var axes = ["", "X", "Y", "Z"];
var order2 = ["translate", "scale", "rotate", "skew"];
var rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v) => v + "deg"
};
var baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v) => v + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
var transformDefinitions = /* @__PURE__ */ new Map();
var asTransformCssVar = (name) => `--motion-${name}`;
var transforms = ["x", "y", "z"];
order2.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
var transformLookup = new Set(transforms);

// ../../.yarn/global/cache/@motionone-animation-npm-10.13.1-ce14c8e487-9.zip/node_modules/@motionone/animation/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-animation-npm-10.13.1-ce14c8e487-9.zip/node_modules/@motionone/animation/dist/Animation.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-animation-npm-10.13.1-ce14c8e487-9.zip/node_modules/@motionone/animation/dist/utils/easing.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-easing-npm-10.13.1-0c2fb3f152-9.zip/node_modules/@motionone/easing/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-easing-npm-10.13.1-0c2fb3f152-9.zip/node_modules/@motionone/easing/dist/cubic-bezier.es.js
init_define_process();
var calcBezier2 = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision2 = 1e-7;
var subdivisionMaxIterations2 = 12;
function binarySubdivide2(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier2(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision2 && ++i < subdivisionMaxIterations2);
  return currentT;
}
function cubicBezier2(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide2(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier2(getTForX(t), mY1, mY2);
}

// ../../.yarn/global/cache/@motionone-easing-npm-10.13.1-0c2fb3f152-9.zip/node_modules/@motionone/easing/dist/steps.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-animation-npm-10.13.1-ce14c8e487-9.zip/node_modules/@motionone/animation/dist/utils/easing.es.js
var namedEasings = {
  ease: cubicBezier2(0.25, 0.1, 0.25, 1),
  "ease-in": cubicBezier2(0.42, 0, 1, 1),
  "ease-in-out": cubicBezier2(0.42, 0, 0.58, 1),
  "ease-out": cubicBezier2(0, 0, 0.58, 1)
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/easing.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js
init_define_process();
var testAnimation = (keyframes3, options) => document.createElement("div").animate(keyframes3, options);
var featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] });
    } catch (e) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e) {
      return false;
    }
    return true;
  }
};
var results = {};
var supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/style.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/options.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/resolve-elements.es.js
init_define_process();
function resolveElements(elements, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/controls.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/stagger.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/index.es.js
init_define_process();
var import_tslib54 = __toESM(require_tslib());

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/calc-time.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/edit.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/sort.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/spring/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/glide/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/utils/velocity.es.js
init_define_process();
var sampleT = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - sampleT, 0);
  return velocityPerSecond2(current - resolveValue(prevT), t - prevT);
}

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/spring/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/spring/defaults.es.js
init_define_process();
var defaults2 = {
  stiffness: 100,
  damping: 10,
  mass: 1
};

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/spring/utils.es.js
init_define_process();
var calcDampingRatio = (stiffness = defaults2.stiffness, damping = defaults2.damping, mass = defaults2.mass) => damping / (2 * Math.sqrt(stiffness * mass));

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/utils/has-reached-target.es.js
init_define_process();
function hasReachedTarget(origin, target, current) {
  return origin < target && current >= target || origin > target && current <= target;
}

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/spring/index.es.js
var spring2 = ({ stiffness = defaults2.stiffness, damping = defaults2.damping, mass = defaults2.mass, from = 0, to = 1, velocity = 0, restSpeed = 2, restDistance = 0.5 } = {}) => {
  velocity = velocity ? time.s(velocity) : 0;
  const state = {
    done: false,
    hasReachedTarget: false,
    current: from,
    target: to
  };
  const initialDelta = to - from;
  const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
  const dampingRatio = calcDampingRatio(stiffness, damping, mass);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    resolveSpring = (t) => to - Math.exp(-dampingRatio * undampedAngularFreq * t) * ((-velocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
  } else {
    resolveSpring = (t) => {
      return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (-velocity + undampedAngularFreq * initialDelta) * t);
    };
  }
  return (t) => {
    state.current = resolveSpring(t);
    const currentVelocity = t === 0 ? velocity : calcGeneratorVelocity(resolveSpring, t, state.current);
    const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
    const isBelowDisplacementThreshold = Math.abs(to - state.current) <= restDistance;
    state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
    state.hasReachedTarget = hasReachedTarget(from, to, state.current);
    return state;
  };
};

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/glide/index.es.js
var glide = ({ from = 0, velocity = 0, power = 0.8, decay: decay2 = 0.325, bounceDamping, bounceStiffness, changeTarget, min, max, restDistance = 0.5, restSpeed }) => {
  decay2 = time.ms(decay2);
  const state = {
    hasReachedTarget: false,
    done: false,
    current: from,
    target: from
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = from + amplitude;
  const target = changeTarget === void 0 ? ideal : changeTarget(ideal);
  state.target = target;
  if (target !== ideal)
    amplitude = target - from;
  const calcDelta = (t) => -amplitude * Math.exp(-t / decay2);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDistance;
    state.current = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.current))
      return;
    timeReachedBoundary = t;
    spring$1 = spring2({
      from: state.current,
      to: nearestBoundary(state.current),
      velocity: calcGeneratorVelocity(calcLatest, t, state.current),
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDistance,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return (t) => {
    let hasUpdatedFrame = false;
    if (!spring$1 && timeReachedBoundary === void 0) {
      hasUpdatedFrame = true;
      applyFriction(t);
      checkCatchBoundary(t);
    }
    if (timeReachedBoundary !== void 0 && t > timeReachedBoundary) {
      state.hasReachedTarget = true;
      return spring$1(t - timeReachedBoundary);
    } else {
      state.hasReachedTarget = false;
      !hasUpdatedFrame && applyFriction(t);
      return state;
    }
  };
};

// ../../.yarn/global/cache/@motionone-generators-npm-10.13.1-2385db2bb1-9.zip/node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.es.js
init_define_process();
var timeStep = 10;
var maxDuration2 = 1e4;
function pregenerateKeyframes(generator) {
  let overshootDuration = void 0;
  let timestamp = timeStep;
  let state = generator(0);
  const keyframes3 = [state.current];
  while (!state.done && timestamp < maxDuration2) {
    state = generator(timestamp);
    keyframes3.push(state.done ? state.target : state.current);
    if (overshootDuration === void 0 && state.hasReachedTarget) {
      overshootDuration = timestamp;
    }
    timestamp += timeStep;
  }
  const duration = timestamp - timeStep;
  if (keyframes3.length === 1)
    keyframes3.push(state.current);
  return {
    keyframes: keyframes3,
    duration: duration / 1e3,
    overshootDuration: (overshootDuration !== null && overshootDuration !== void 0 ? overshootDuration : duration) / 1e3
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/create-generator-easing.es.js
init_define_process();
function createGeneratorEasing(createGenerator) {
  const keyframesCache = /* @__PURE__ */ new WeakMap();
  return (options = {}) => {
    const generatorCache = /* @__PURE__ */ new Map();
    const getGenerator = (from = 0, to = 100, velocity = 0, isScale = false) => {
      const key = `${from}-${to}-${velocity}-${isScale}`;
      if (!generatorCache.has(key)) {
        generatorCache.set(key, createGenerator(Object.assign({
          from,
          to,
          velocity,
          restSpeed: isScale ? 0.05 : 2,
          restDistance: isScale ? 0.01 : 0.5
        }, options)));
      }
      return generatorCache.get(key);
    };
    const getKeyframes = (generator) => {
      if (!keyframesCache.has(generator)) {
        keyframesCache.set(generator, pregenerateKeyframes(generator));
      }
      return keyframesCache.get(generator);
    };
    return {
      createAnimation: (keyframes3, getOrigin2, canUseGenerator, name, motionValue2) => {
        var _a, _b;
        let settings;
        const numKeyframes = keyframes3.length;
        let shouldUseGenerator = canUseGenerator && numKeyframes <= 2 && keyframes3.every(isNumberOrNull);
        if (shouldUseGenerator) {
          const target = keyframes3[numKeyframes - 1];
          const unresolvedOrigin = numKeyframes === 1 ? null : keyframes3[0];
          let velocity = 0;
          let origin = 0;
          const prevGenerator = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.generator;
          if (prevGenerator) {
            const { animation, generatorStartTime } = motionValue2;
            const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
            const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
            const prevGeneratorCurrent = prevGenerator(currentTime).current;
            origin = (_a = unresolvedOrigin) !== null && _a !== void 0 ? _a : prevGeneratorCurrent;
            if (numKeyframes === 1 || numKeyframes === 2 && keyframes3[0] === null) {
              velocity = calcGeneratorVelocity((t) => prevGenerator(t).current, currentTime, prevGeneratorCurrent);
            }
          } else {
            origin = (_b = unresolvedOrigin) !== null && _b !== void 0 ? _b : parseFloat(getOrigin2());
          }
          const generator = getGenerator(origin, target, velocity, name === null || name === void 0 ? void 0 : name.includes("scale"));
          const keyframesMetadata = getKeyframes(generator);
          settings = Object.assign(Object.assign({}, keyframesMetadata), { easing: "linear" });
          if (motionValue2) {
            motionValue2.generator = generator;
            motionValue2.generatorStartTime = performance.now();
          }
        } else {
          const keyframesMetadata = getKeyframes(getGenerator(0, 100));
          settings = {
            easing: "ease",
            duration: keyframesMetadata.overshootDuration
          };
        }
        return settings;
      }
    };
  };
}
var isNumberOrNull = (value) => typeof value !== "string";

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/spring/index.es.js
var spring3 = createGeneratorEasing(spring2);

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/glide/index.es.js
init_define_process();
var glide2 = createGeneratorEasing(glide);

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/in-view.es.js
init_define_process();
var thresholds = {
  any: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
  if (typeof IntersectionObserver === "undefined") {
    return () => {
    };
  }
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (isFunction(newOnEnd)) {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer2.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer2 = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer2.observe(element));
  return () => observer2.disconnect();
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-element.es.js
init_define_process();
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var observer;
function getElementSize(target, borderBoxSize) {
  if (borderBoxSize) {
    const { inlineSize, blockSize } = borderBoxSize[0];
    return { width: inlineSize, height: blockSize };
  } else if (target instanceof SVGElement && "getBBox" in target) {
    return target.getBBox();
  } else {
    return {
      width: target.offsetWidth,
      height: target.offsetHeight
    };
  }
}
function notifyTarget({ target, contentRect, borderBoxSize }) {
  var _a;
  (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => {
    handler({
      target,
      contentSize: contentRect,
      get size() {
        return getElementSize(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined")
    return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer)
    createResizeObserver();
  const elements = resolveElements(target);
  elements.forEach((element) => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = /* @__PURE__ */ new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer === null || observer === void 0 ? void 0 : observer.observe(element);
  });
  return () => {
    elements.forEach((element) => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
      if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
        observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
      }
    });
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-window.es.js
init_define_process();
var windowCallbacks = /* @__PURE__ */ new Set();
var windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const info = {
      target: window,
      size,
      contentSize: size
    };
    windowCallbacks.forEach((callback) => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler)
    createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && windowResizeHandler) {
      windowResizeHandler = void 0;
    }
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/index.es.js
function resize(a2, b2) {
  return isFunction(a2) ? resizeWindow(a2) : resizeElement(a2, b2);
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/index.es.js
init_define_process();
var import_tslib55 = __toESM(require_tslib());

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/info.es.js
init_define_process();
var maxElapsed2 = 50;
var createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
var createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
var keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time2) {
  const axis = info[axisName];
  const { length: length2, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element["scroll" + position];
  axis.scrollLength = element["scroll" + length2] - element["client" + length2];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress2(0, axis.scrollLength, axis.current);
  const elapsed = time2 - prevTime;
  axis.velocity = elapsed > maxElapsed2 ? 0 : velocityPerSecond2(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time2) {
  updateAxisInfo(element, "x", info, time2);
  updateAxisInfo(element, "y", info, time2);
  info.time = time2;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.es.js
init_define_process();
function calcInset(element, container) {
  let inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (current instanceof HTMLElement) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current instanceof SVGGraphicsElement && "getBBox" in current) {
      const { top, left } = current.getBBox();
      inset.x += left;
      inset.y += top;
      while (current && current.tagName !== "svg") {
        current = current.parentNode;
      }
    }
  }
  return inset;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.es.js
init_define_process();
var ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.es.js
init_define_process();
var namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length2, inset = 0) {
  let delta = 0;
  if (namedEdges[edge] !== void 0) {
    edge = namedEdges[edge];
  }
  if (isString2(edge)) {
    const asNumber2 = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber2;
    } else if (edge.endsWith("%")) {
      edge = asNumber2 / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber2 / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber2 / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber2;
    }
  }
  if (isNumber(edge)) {
    delta = length2 * edge;
  }
  return inset + delta;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.es.js
var defaultOffset3 = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset3;
  let targetPoint = 0;
  let containerPoint = 0;
  if (isNumber(offset)) {
    offsetDefinition = [offset, offset];
  } else if (isString2(offset)) {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.es.js
var point = { x: 0, y: 0 };
function resolveOffsets(container, info, options) {
  let { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : { width: target.clientWidth, height: target.clientHeight };
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged2 = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged2 && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged2 = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged2) {
    info[axis].interpolate = interpolate2(defaultOffset2(numOffsets), info[axis].offset);
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = info[axis].interpolate(info[axis].current);
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.es.js
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node != container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  const axis = options.axis || "y";
  return {
    measure: () => measure(element, options.target, info),
    update: (time2) => {
      updateScrollInfo(element, info, time2);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: isFunction(onScroll) ? () => onScroll(info) : scrubAnimation(onScroll, info[axis])
  };
}
function scrubAnimation(controls, axisInfo) {
  controls.pause();
  controls.forEachNative((animation, { easing }) => {
    var _a, _b;
    if (animation.updateDuration) {
      if (!easing)
        animation.easing = noopReturn;
      animation.updateDuration(1);
    } else {
      const timingOptions = { duration: 1e3 };
      if (!easing)
        timingOptions.easing = "linear";
      (_b = (_a = animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming) === null || _b === void 0 ? void 0 : _b.call(_a, timingOptions);
    }
  });
  return () => {
    controls.currentTime = axisInfo.progress;
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/index.es.js
var scrollListeners = /* @__PURE__ */ new WeakMap();
var resizeListeners = /* @__PURE__ */ new WeakMap();
var onScrollHandlers = /* @__PURE__ */ new WeakMap();
var getEventTarget = (element) => element === document.documentElement ? window : element;
function scroll(onScroll, _a = {}) {
  var { container = document.documentElement } = _a, options = (0, import_tslib55.__rest)(_a, ["container"]);
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const listener2 = () => {
      const time2 = performance.now();
      for (const handler of containerHandlers)
        handler.measure();
      for (const handler of containerHandlers)
        handler.update(time2);
      for (const handler of containerHandlers)
        handler.notify();
    };
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2, { passive: true });
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2, { passive: true });
  }
  const listener = scrollListeners.get(container);
  const onLoadProcesss = requestAnimationFrame(listener);
  return () => {
    var _a2;
    if (typeof onScroll !== "function")
      onScroll.stop();
    cancelAnimationFrame(onLoadProcesss);
    const containerHandlers2 = onScrollHandlers.get(container);
    if (!containerHandlers2)
      return;
    containerHandlers2.delete(containerHandler);
    if (containerHandlers2.size)
      return;
    const listener2 = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (listener2) {
      getEventTarget(container).removeEventListener("scroll", listener2);
      (_a2 = resizeListeners.get(container)) === null || _a2 === void 0 ? void 0 : _a2();
      window.removeEventListener("resize", listener2);
    }
  };
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/index.es.js
init_define_process();
var import_tslib57 = __toESM(require_tslib());

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/has-changed.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/resolve-variant.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/is-variant.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/schedule.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/in-view.es.js
init_define_process();
var import_tslib56 = __toESM(require_tslib());

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/events.es.js
init_define_process();
function dispatchPointerEvent(element, name, event) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
}
function dispatchViewEvent(element, name, entry) {
  element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
}

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/in-view.es.js
var inView2 = {
  isActive: (options) => Boolean(options.inView),
  subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
    const { once } = inViewOptions, viewOptions = (0, import_tslib56.__rest)(inViewOptions, ["once"]);
    return inView(element, (enterEntry) => {
      enable();
      dispatchViewEvent(element, "viewenter", enterEntry);
      if (!once) {
        return (leaveEntry) => {
          disable();
          dispatchViewEvent(element, "viewleave", leaveEntry);
        };
      }
    }, viewOptions);
  }
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/hover.es.js
init_define_process();
var mouseEvent = (element, name, action) => (event) => {
  if (event.pointerType && event.pointerType !== "mouse")
    return;
  action();
  dispatchPointerEvent(element, name, event);
};
var hover = {
  isActive: (options) => Boolean(options.hover),
  subscribe: (element, { enable, disable }) => {
    const onEnter = mouseEvent(element, "hoverstart", enable);
    const onLeave = mouseEvent(element, "hoverend", disable);
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
    };
  }
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/press.es.js
init_define_process();
var press = {
  isActive: (options) => Boolean(options.press),
  subscribe: (element, { enable, disable }) => {
    const onPointerUp = (event) => {
      disable();
      dispatchPointerEvent(element, "pressend", event);
      window.removeEventListener("pointerup", onPointerUp);
    };
    const onPointerDown = (event) => {
      enable();
      dispatchPointerEvent(element, "pressstart", event);
      window.addEventListener("pointerup", onPointerUp);
    };
    element.addEventListener("pointerdown", onPointerDown);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }
};

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/index.es.js
var gestures = { inView: inView2, hover, press };
var stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-object.es.js
init_define_process();

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-string.es.js
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-scroll.mjs
var createScrollMotionValues = function() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0)
  };
};
function useScroll(_a) {
  if (_a === void 0) {
    _a = {};
  }
  var container = _a.container, target = _a.target, options = (0, import_tslib58.__rest)(_a, ["container", "target"]);
  var values = useConstant(createScrollMotionValues);
  useIsomorphicLayoutEffect(function() {
    return scroll(function(_a2) {
      var x = _a2.x, y = _a2.y;
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, (0, import_tslib58.__assign)((0, import_tslib58.__assign)({}, options), { container: (container === null || container === void 0 ? void 0 : container.current) || void 0, target: (target === null || target === void 0 ? void 0 : target.current) || void 0 }));
  }, []);
  return values;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/scroll/use-element-scroll.mjs
init_define_process();
function useElementScroll(ref) {
  warnOnce(false, "useElementScroll is deprecated. Convert to useScroll({ container: ref }).");
  return useScroll({ container: ref });
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/scroll/use-viewport-scroll.mjs
init_define_process();
function useViewportScroll() {
  warnOnce(false, "useViewportScroll is deprecated. Convert to useScroll().");
  return useScroll();
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-animation-frame.mjs
init_define_process();
function useAnimationFrame(callback) {
  var initialTimestamp = useRef(0);
  var isStatic = useContext(MotionConfigContext).isStatic;
  useEffect(function() {
    if (isStatic)
      return;
    var provideTimeSinceStart = function(_a) {
      var timestamp = _a.timestamp;
      if (!initialTimestamp.current)
        initialTimestamp.current = timestamp;
      callback(timestamp - initialTimestamp.current);
    };
    es_default.update(provideTimeSinceStart, true);
    return function() {
      return cancelSync.update(provideTimeSinceStart);
    };
  }, [callback]);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-time.mjs
init_define_process();
function useTime() {
  var time2 = useMotionValue(0);
  useAnimationFrame(function(t) {
    return time2.set(t);
  });
  return time2;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/animation-controls.mjs
init_define_process();
var import_tslib59 = __toESM(require_tslib(), 1);
function animationControls() {
  var hasMounted = false;
  var pendingAnimations = [];
  var subscribers = /* @__PURE__ */ new Set();
  var controls = {
    subscribe: function(visualElement2) {
      subscribers.add(visualElement2);
      return function() {
        return void subscribers.delete(visualElement2);
      };
    },
    start: function(definition, transitionOverride) {
      if (hasMounted) {
        var animations_1 = [];
        subscribers.forEach(function(visualElement2) {
          animations_1.push(animateVisualElement(visualElement2, definition, {
            transitionOverride
          }));
        });
        return Promise.all(animations_1);
      } else {
        return new Promise(function(resolve) {
          pendingAnimations.push({
            animation: [definition, transitionOverride],
            resolve
          });
        });
      }
    },
    set: function(definition) {
      invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
      return subscribers.forEach(function(visualElement2) {
        setValues(visualElement2, definition);
      });
    },
    stop: function() {
      subscribers.forEach(function(visualElement2) {
        stopAnimation(visualElement2);
      });
    },
    mount: function() {
      hasMounted = true;
      pendingAnimations.forEach(function(_a) {
        var animation = _a.animation, resolve = _a.resolve;
        controls.start.apply(controls, (0, import_tslib59.__spreadArray)([], (0, import_tslib59.__read)(animation), false)).then(resolve);
      });
      return function() {
        hasMounted = false;
        controls.stop();
      };
    }
  };
  return controls;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/use-animation.mjs
init_define_process();
function useAnimationControls() {
  var controls = useConstant(animationControls);
  useEffect(controls.mount, []);
  return controls;
}
var useAnimation = useAnimationControls;

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-cycle.mjs
init_define_process();
var import_tslib60 = __toESM(require_tslib(), 1);
function useCycle() {
  var items = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    items[_i] = arguments[_i];
  }
  var index = useRef(0);
  var _a = (0, import_tslib60.__read)(useState(items[index.current]), 2), item = _a[0], setItem = _a[1];
  var runCycle = useCallback(function(next) {
    index.current = typeof next !== "number" ? wrap(0, items.length, index.current + 1) : next;
    setItem(items[index.current]);
  }, (0, import_tslib60.__spreadArray)([items.length], (0, import_tslib60.__read)(items), false));
  return [item, runCycle];
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-in-view.mjs
init_define_process();
var import_tslib61 = __toESM(require_tslib(), 1);
function useInView(ref, _a) {
  var _b = _a === void 0 ? {} : _a, root = _b.root, margin = _b.margin, amount = _b.amount, _c = _b.once, once = _c === void 0 ? false : _c;
  var _d = (0, import_tslib61.__read)(useState(false), 2), isInView = _d[0], setInView = _d[1];
  useEffect(function() {
    var _a2;
    if (!ref.current || once && isInView)
      return;
    var onEnter = function() {
      setInView(true);
      return once ? void 0 : function() {
        return setInView(false);
      };
    };
    var options = {
      root: (_a2 = root === null || root === void 0 ? void 0 : root.current) !== null && _a2 !== void 0 ? _a2 : void 0,
      margin,
      amount: amount === "some" ? "any" : amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once]);
  return isInView;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag-controls.mjs
init_define_process();
var DragControls = function() {
  function DragControls2() {
    this.componentControls = /* @__PURE__ */ new Set();
  }
  DragControls2.prototype.subscribe = function(controls) {
    var _this = this;
    this.componentControls.add(controls);
    return function() {
      return _this.componentControls.delete(controls);
    };
  };
  DragControls2.prototype.start = function(event, options) {
    this.componentControls.forEach(function(controls) {
      controls.start(event.nativeEvent || event, options);
    });
  };
  return DragControls2;
}();
var createDragControls = function() {
  return new DragControls();
};
function useDragControls() {
  return useConstant(createDragControls);
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/use-instant-layout-transition.mjs
init_define_process();
function useInstantLayoutTransition() {
  return startTransition;
}
function startTransition(cb2) {
  if (!rootProjectionNode.current)
    return;
  rootProjectionNode.current.isUpdating = false;
  rootProjectionNode.current.blockUpdate();
  cb2 === null || cb2 === void 0 ? void 0 : cb2();
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/utils/use-instant-transition.mjs
init_define_process();
var import_tslib62 = __toESM(require_tslib(), 1);
function useInstantTransition() {
  var _a = (0, import_tslib62.__read)(useForceUpdate(), 2), forceUpdate = _a[0], forcedRenderCount = _a[1];
  var startInstantLayoutTransition = useInstantLayoutTransition();
  useEffect(function() {
    es_default.postRender(function() {
      return es_default.postRender(function() {
        return instantAnimationState.current = false;
      });
    });
  }, [forcedRenderCount]);
  return function(callback) {
    startInstantLayoutTransition(function() {
      instantAnimationState.current = true;
      forceUpdate();
      callback();
    });
  };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/projection/use-reset-projection.mjs
init_define_process();
function useResetProjection() {
  var reset = useCallback(function() {
    var root = rootProjectionNode.current;
    if (!root)
      return;
    root.resetTree();
  }, []);
  return reset;
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/animation/use-animated-state.mjs
init_define_process();
var import_tslib63 = __toESM(require_tslib(), 1);
var createObject = function() {
  return {};
};
var stateVisualElement = visualElement({
  build: function() {
  },
  measureViewportBox: createBox,
  resetTransform: function() {
  },
  restoreTransform: function() {
  },
  removeValueFromRenderState: function() {
  },
  render: function() {
  },
  scrapeMotionValuesFromProps: createObject,
  readValueFromInstance: function(_state, key, options) {
    return options.initialState[key] || 0;
  },
  makeTargetAnimatable: function(element, _a) {
    var transition = _a.transition, transitionEnd = _a.transitionEnd, target = (0, import_tslib63.__rest)(_a, ["transition", "transitionEnd"]);
    var origin = getOrigin(target, transition || {}, element);
    checkTargetForNewValues(element, target, origin);
    return (0, import_tslib63.__assign)({ transition, transitionEnd }, target);
  }
});
var useVisualState = makeUseVisualState({
  scrapeMotionValuesFromProps: createObject,
  createRenderState: createObject
});
function useAnimatedState(initialState) {
  var _a = (0, import_tslib63.__read)(useState(initialState), 2), animationState = _a[0], setAnimationState = _a[1];
  var visualState = useVisualState({}, false);
  var element = useConstant(function() {
    return stateVisualElement({ props: {}, visualState }, { initialState });
  });
  useEffect(function() {
    element.mount({});
    return element.unmount;
  }, [element]);
  useEffect(function() {
    element.setProps({
      onUpdate: function(v) {
        setAnimationState((0, import_tslib63.__assign)({}, v));
      }
    });
  }, [setAnimationState, element]);
  var startAnimation2 = useConstant(function() {
    return function(animationDefinition) {
      return animateVisualElement(element, animationDefinition);
    };
  });
  return [animationState, startAnimation2];
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/value/use-inverted-scale.mjs
init_define_process();
var maxScale = 1e5;
var invertScale = function(scale2) {
  return scale2 > 1e-3 ? 1 / scale2 : maxScale;
};
var hasWarned = false;
function useInvertedScale(scale2) {
  var parentScaleX = useMotionValue(1);
  var parentScaleY = useMotionValue(1);
  var visualElement2 = useVisualElementContext();
  invariant(!!(scale2 || visualElement2), "If no scale values are provided, useInvertedScale must be used within a child of another motion component.");
  warning(hasWarned, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead.");
  hasWarned = true;
  if (scale2) {
    parentScaleX = scale2.scaleX || parentScaleX;
    parentScaleY = scale2.scaleY || parentScaleY;
  } else if (visualElement2) {
    parentScaleX = visualElement2.getValue("scaleX", 1);
    parentScaleY = visualElement2.getValue("scaleY", 1);
  }
  var scaleX = useTransform(parentScaleX, invertScale);
  var scaleY = useTransform(parentScaleY, invertScale);
  return { scaleX, scaleY };
}

// ../../.yarn/__virtual__/framer-motion-virtual-e0877ceace/0/global/cache/framer-motion-npm-7.0.2-75d25ae3ef-9.zip/node_modules/framer-motion/dist/es/index.mjs
init_define_process();

export {
  MotionConfigContext,
  MotionContext,
  useVisualElementContext,
  PresenceContext,
  isBrowser,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  useReducedMotionConfig,
  LayoutGroupContext,
  SwitchLayoutGroupContext,
  createMotionComponent,
  addScaleCorrector,
  isMotionValue,
  isValidMotionProp,
  filterProps,
  resolveMotionValue,
  makeUseVisualState,
  AnimationType,
  useDomEvent,
  wrapHandler,
  addPointerEvent,
  isDragActive,
  useUnmountEffect,
  usePresence,
  useIsPresent,
  MotionValue,
  motionValue,
  checkTargetForNewValues,
  animateVisualElement,
  animations,
  calcLength,
  createBox,
  visualElement,
  animate2 as animate,
  FlatTree,
  motion,
  createDomMotionComponent,
  m,
  useForceUpdate,
  AnimatePresence,
  DeprecatedLayoutGroupContext,
  LayoutGroup,
  AnimateSharedLayout,
  MotionConfig,
  LazyMotion,
  useMotionValue,
  transform,
  useTransform,
  Reorder,
  domAnimation,
  domMax,
  useMotionTemplate,
  useSpring,
  useVelocity,
  useScroll,
  useElementScroll,
  useViewportScroll,
  useAnimationFrame,
  useTime,
  animationControls,
  useAnimationControls,
  useAnimation,
  useCycle,
  useInView,
  DragControls,
  useDragControls,
  useInstantLayoutTransition,
  useInstantTransition,
  useResetProjection,
  useAnimatedState,
  useInvertedScale
};
