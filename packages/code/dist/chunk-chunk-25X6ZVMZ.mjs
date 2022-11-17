import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-5IILXD2Q.mjs";
import {
  require_dist,
  require_is_prop_valid_browser_cjs,
  require_tslib
} from "./chunk-chunk-GGQHJ3NU.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-LCSH5MSR.mjs";
import {
  Children,
  Component,
  Fragment,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  forwardRef,
  init_reactMod,
  isValidElement,
  lazy,
  reactMod_default,
  useCallback,
  useContext,
  useEffect,
  useId,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-X33UIKCE.mjs";
import {
  __name,
  __toESM,
  define_process_default,
  init_define_process
} from "./chunk-chunk-4FHARZBR.mjs";

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/motion.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/index.mjs
init_define_process();
init_reactMod();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
init_define_process();
init_reactMod();
var MotionConfigContext = createContext({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
init_define_process();
init_reactMod();
var MotionContext = createContext({});
function useVisualElementContext() {
  return useContext(MotionContext).visualElement;
}
__name(useVisualElementContext, "useVisualElementContext");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/PresenceContext.mjs
init_define_process();
init_reactMod();
var PresenceContext = createContext(null);

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/is-browser.mjs
init_define_process();
var isBrowser = typeof document !== "undefined";

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/LazyContext.mjs
init_define_process();
init_reactMod();
var LazyContext = createContext({ strict: false });

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component2, visualState, props, createVisualElement) {
  const parent = useVisualElementContext();
  const lazyContext = useContext(LazyContext);
  const presenceContext = useContext(PresenceContext);
  const reducedMotionConfig = useContext(MotionConfigContext).reducedMotion;
  const visualElementRef = useRef();
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props,
      presenceId: presenceContext ? presenceContext.id : void 0,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  useIsomorphicLayoutEffect(() => {
    visualElement && visualElement.render();
  });
  useEffect(() => {
    if (visualElement && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  useIsomorphicLayoutEffect(() => () => visualElement && visualElement.notify("Unmount"), []);
  return visualElement;
}
__name(useVisualElement, "useVisualElement");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
init_define_process();
function isRefObject(ref) {
  return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
__name(isRefObject, "isRefObject");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  return useCallback(
    (instance) => {
      instance && visualState.mount && visualState.mount(instance);
      if (visualElement) {
        instance ? visualElement.mount(instance) : visualElement.unmount();
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    [visualElement]
  );
}
__name(useMotionRef, "useMotionRef");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
init_define_process();
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}
__name(isVariantLabel, "isVariantLabel");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
init_define_process();
function isAnimationControls(v) {
  return typeof v === "object" && typeof v.start === "function";
}
__name(isAnimationControls, "isAnimationControls");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
var variantProps = [
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileDrag",
  "whileTap",
  "whileFocus",
  "whileInView"
];
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
__name(isControllingVariants, "isControllingVariants");
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}
__name(isVariantNode, "isVariantNode");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate: animate3 } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate3) ? animate3 : void 0
    };
  }
  return props.inherit !== false ? context : {};
}
__name(getCurrentTreeVariants, "getCurrentTreeVariants");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate: animate3 } = getCurrentTreeVariants(props, useContext(MotionContext));
  return useMemo(() => ({ initial, animate: animate3 }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate3)]);
}
__name(useCreateMotionContext, "useCreateMotionContext");
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}
__name(variantLabelsAsDependency, "variantLabelsAsDependency");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/definitions.mjs
init_define_process();
var createDefinition = /* @__PURE__ */ __name((propNames) => ({
  isEnabled: (props) => propNames.some((name) => !!props[name])
}), "createDefinition");
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

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/load-features.mjs
init_define_process();
function loadFeatures(features) {
  for (const key in features) {
    if (key === "projectionNodeConstructor") {
      featureDefinitions.projectionNodeConstructor = features[key];
    } else {
      featureDefinitions[key].Component = features[key];
    }
  }
}
__name(loadFeatures, "loadFeatures");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/id.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-constant.mjs
init_define_process();
init_reactMod();
function useConstant(init) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}
__name(useConstant, "useConstant");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/state.mjs
init_define_process();
var globalProjectionState = {
  hasAnimatedSinceResize: true,
  hasEverUpdated: false
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/id.mjs
var id = 1;
function useProjectionId() {
  return useConstant(() => {
    if (globalProjectionState.hasEverUpdated) {
      return id++;
    }
  });
}
__name(useProjectionId, "useProjectionId");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
init_define_process();
init_reactMod();
var LayoutGroupContext = createContext({});

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/VisualElementHandler.mjs
init_define_process();
init_reactMod();
var VisualElementHandler = class extends reactMod_default.Component {
  getSnapshotBeforeUpdate() {
    const { visualElement, props } = this.props;
    if (visualElement)
      visualElement.setProps(props);
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
__name(VisualElementHandler, "VisualElementHandler");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
init_define_process();
init_reactMod();
var SwitchLayoutGroupContext = createContext({});

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
init_define_process();
var motionComponentSymbol = Symbol.for("motionComponentSymbol");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/index.mjs
function createMotionComponent({ preloadedFeatures, createVisualElement, projectionNodeConstructor, useRender, useVisualState, Component: Component2 }) {
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    const configAndProps = {
      ...useContext(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    let features = null;
    const context = useCreateMotionContext(props);
    const projectionId = isStatic ? void 0 : useProjectionId();
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      context.visualElement = useVisualElement(Component2, visualState, configAndProps, createVisualElement);
      const lazyStrictMode = useContext(LazyContext).strict;
      const initialLayoutGroupConfig = useContext(SwitchLayoutGroupContext);
      if (context.visualElement) {
        features = context.visualElement.loadFeatures(
          configAndProps,
          lazyStrictMode,
          preloadedFeatures,
          projectionId,
          projectionNodeConstructor || featureDefinitions.projectionNodeConstructor,
          initialLayoutGroupConfig
        );
      }
    }
    return createElement(
      VisualElementHandler,
      { visualElement: context.visualElement, props: configAndProps },
      features,
      createElement(MotionContext.Provider, { value: context }, useRender(Component2, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement))
    );
  }
  __name(MotionComponent, "MotionComponent");
  const ForwardRefComponent = forwardRef(MotionComponent);
  ForwardRefComponent[motionComponentSymbol] = Component2;
  return ForwardRefComponent;
}
__name(createMotionComponent, "createMotionComponent");
function useLayoutId({ layoutId }) {
  const layoutGroupId = useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
__name(useLayoutId, "useLayoutId");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/motion-proxy.mjs
init_define_process();
function createMotionProxy(createConfig) {
  function custom(Component2, customMotionComponentConfig = {}) {
    return createMotionComponent(createConfig(Component2, customMotionComponentConfig));
  }
  __name(custom, "custom");
  if (typeof Proxy === "undefined") {
    return custom;
  }
  const componentCache = /* @__PURE__ */ new Map();
  return new Proxy(custom, {
    get: (_target, key) => {
      if (!componentCache.has(key)) {
        componentCache.set(key, custom(key));
      }
      return componentCache.get(key);
    }
  });
}
__name(createMotionProxy, "createMotionProxy");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
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

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component2) {
  if (typeof Component2 !== "string" || Component2.includes("-")) {
    return false;
  } else if (lowercaseSVGElements.indexOf(Component2) > -1 || /[A-Z]/.test(Component2)) {
    return true;
  }
  return false;
}
__name(isSVGComponent, "isSVGComponent");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/use-props.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
init_define_process();
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  Object.assign(scaleCorrectors, correctors);
}
__name(addScaleCorrector, "addScaleCorrector");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/transform.mjs
init_define_process();
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = new Set(transformPropOrder);

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}
__name(isForcedMotionValue, "isForcedMotionValue");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
init_define_process();
var isMotionValue = /* @__PURE__ */ __name((value) => !!(value === null || value === void 0 ? void 0 : value.getVelocity), "isMotionValue");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
init_define_process();
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var sortTransformProps = /* @__PURE__ */ __name((a2, b2) => transformPropOrder.indexOf(a2) - transformPropOrder.indexOf(b2), "sortTransformProps");
function buildTransform({ transform, transformKeys: transformKeys2 }, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
  let transformString = "";
  transformKeys2.sort(sortTransformProps);
  for (const key of transformKeys2) {
    transformString += `${translateAlias[key] || key}(${transform[key]}) `;
  }
  if (enableHardwareAcceleration && !transform.z) {
    transformString += "translateZ(0)";
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (allowTransformNone && transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}
__name(buildTransform, "buildTransform");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
init_define_process();
function isCSSVariable(key) {
  return key.startsWith("--");
}
__name(isCSSVariable, "isCSSVariable");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
init_define_process();
var getValueAsType = /* @__PURE__ */ __name((value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
}, "getValueAsType");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/numbers/index.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/utils.mjs
init_define_process();
var clamp = /* @__PURE__ */ __name((min, max) => (v) => Math.max(Math.min(v, max), min), "clamp");
var sanitize = /* @__PURE__ */ __name((v) => v % 1 ? Number(v.toFixed(5)) : v, "sanitize");
var floatRegex = /(-)?([\d]*\.?[\d])+/g;
var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function isString(v) {
  return typeof v === "string";
}
__name(isString, "isString");

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
var scale = Object.assign(Object.assign({}, number), { default: 1 });

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/numbers/units.mjs
init_define_process();
var createUnitType = /* @__PURE__ */ __name((unit) => ({
  test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
}), "createUnitType");
var degrees = createUnitType("deg");
var percent = createUnitType("%");
var px = createUnitType("px");
var vh = createUnitType("vh");
var vw = createUnitType("vw");
var progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/hsla.mjs
init_define_process();

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/utils.mjs
init_define_process();
var isColorString = /* @__PURE__ */ __name((type, testProp) => (v) => {
  return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
}, "isColorString");
var splitColor = /* @__PURE__ */ __name((aName, bName, cName) => (v) => {
  if (!isString(v))
    return v;
  const [a2, b2, c2, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a2),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
}, "splitColor");

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/hsla.mjs
var hsla = {
  test: isColorString("hsl", "hue"),
  parse: splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/rgba.mjs
init_define_process();
var clampRgbUnit = clamp(0, 255);
var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
var rgba = {
  test: isColorString("rgb", "red"),
  parse: splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/hex.mjs
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
__name(parseHex, "parseHex");
var hex = {
  test: isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/color/index.mjs
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

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/complex/index.mjs
init_define_process();
var colorToken = "${c}";
var numberToken = "${n}";
function test(v) {
  var _a, _b, _c, _d;
  return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
}
__name(test, "test");
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
__name(analyse, "analyse");
function parse(v) {
  return analyse(v).values;
}
__name(parse, "parse");
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
__name(createTransformer, "createTransformer");
var convertNumbersToZero = /* @__PURE__ */ __name((v) => typeof v === "number" ? 0 : v, "convertNumbersToZero");
function getAnimatableNone(v) {
  const parsed = parse(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
__name(getAnimatableNone, "getAnimatableNone");
var complex = { test, parse, createTransformer, getAnimatableNone };

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/es/complex/filter.mjs
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
__name(applyDefaultFilter, "applyDefaultFilter");
var functionRegex = /([a-z-]*)\(.*?\)/g;
var filter = Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
  const functions = v.match(functionRegex);
  return functions ? functions.map(applyDefaultFilter).join(" ") : v;
} });

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
init_define_process();
var int = {
  ...number,
  transform: Math.round
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
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

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, options, transformTemplate) {
  const { style, vars, transform, transformKeys: transformKeys2, transformOrigin } = state;
  transformKeys2.length = 0;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  let transformIsNone = true;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (isCSSVariable(key)) {
      vars[key] = value;
      continue;
    }
    const valueType = numberValueTypes[key];
    const valueAsType = getValueAsType(value, valueType);
    if (transformProps.has(key)) {
      hasTransform2 = true;
      transform[key] = valueAsType;
      transformKeys2.push(key);
      if (!transformIsNone)
        continue;
      if (value !== (valueType.default || 0))
        transformIsNone = false;
    } else if (key.startsWith("origin")) {
      hasTransformOrigin = true;
      transformOrigin[key] = valueAsType;
    } else {
      style[key] = valueAsType;
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(state, options, transformIsNone, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}
__name(buildHTMLStyles, "buildHTMLStyles");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
init_define_process();
var createHtmlRenderState = /* @__PURE__ */ __name(() => ({
  style: {},
  transform: {},
  transformKeys: [],
  transformOrigin: {},
  vars: {}
}), "createHtmlRenderState");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
__name(copyRawValuesOnly, "copyRawValuesOnly");
function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
  return useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
__name(useInitialMotionValues, "useInitialMotionValues");
function useStyle(props, visualState, isStatic) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
  return props.transformValues ? props.transformValues(style) : style;
}
__name(useStyle, "useStyle");
function useHTMLProps(props, visualState, isStatic) {
  const htmlProps = {};
  const style = useStyle(props, visualState, isStatic);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  htmlProps.style = style;
  return htmlProps;
}
__name(useHTMLProps, "useHTMLProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
init_define_process();
var animationProps = [
  "animate",
  "exit",
  "variants",
  "whileHover",
  "whileTap",
  "whileFocus",
  "whileDrag",
  "whileInView"
];
var tapProps = ["whileTap", "onTap", "onTapStart", "onTapCancel"];
var panProps = ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"];
var inViewProps = [
  "whileInView",
  "onViewportEnter",
  "onViewportLeave",
  "viewport"
];
var validMotionProps = /* @__PURE__ */ new Set([
  "initial",
  "style",
  "values",
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
  "onHoverStart",
  "onHoverEnd",
  "layoutScroll",
  ...inViewProps,
  ...tapProps,
  ...animationProps,
  ...panProps
]);
function isValidMotionProp(key) {
  return validMotionProps.has(key);
}
__name(isValidMotionProp, "isValidMotionProp");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = /* @__PURE__ */ __name((key) => !isValidMotionProp(key), "shouldForward");
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = /* @__PURE__ */ __name((key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key), "shouldForward");
}
__name(loadExternalIsValidProp, "loadExternalIsValidProp");
try {
  loadExternalIsValidProp(require_is_prop_valid_browser_cjs().default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}
__name(filterProps, "filterProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
init_define_process();
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
__name(calcOrigin, "calcOrigin");
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}
__name(calcSVGTransformOrigin, "calcSVGTransformOrigin");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
init_define_process();
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}
__name(buildSVGPath, "buildSVGPath");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, {
  attrX,
  attrY,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  ...latest
}, options, transformTemplate) {
  buildHTMLStyles(state, latest, options, transformTemplate);
  state.attrs = state.style;
  state.style = {};
  const { attrs, style, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}
__name(buildSVGAttrs, "buildSVGAttrs");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
init_define_process();
var createSvgRenderState = /* @__PURE__ */ __name(() => ({
  ...createHtmlRenderState(),
  attrs: {}
}), "createSvgRenderState");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState) {
  const visualProps = useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, { enableHardwareAcceleration: false }, props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}
__name(useSVGProps, "useSVGProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = false) {
  const useRender = /* @__PURE__ */ __name((Component2, props, projectionId, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic);
    const filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps);
    const elementProps = {
      ...filteredProps,
      ...visualProps,
      ref
    };
    if (projectionId) {
      elementProps["data-projection-id"] = projectionId;
    }
    return createElement(Component2, elementProps);
  }, "useRender");
  return useRender;
}
__name(createUseRender, "createUseRender");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
init_define_process();
var camelToDash = /* @__PURE__ */ __name((str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), "camelToDash");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/render.mjs
init_define_process();
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}
__name(renderHTML, "renderHTML");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
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

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}
__name(renderSVG, "renderSVG");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
init_define_process();
function scrapeMotionValuesFromProps(props) {
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}
__name(scrapeMotionValuesFromProps, "scrapeMotionValuesFromProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props) {
  const newValues = scrapeMotionValuesFromProps(props);
  for (const key in props) {
    if (isMotionValue(props[key])) {
      const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}
__name(scrapeMotionValuesFromProps2, "scrapeMotionValuesFromProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
init_define_process();
function resolveVariantFromProps(props, definition, custom, currentValues = {}, currentVelocity = {}) {
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    definition = definition(custom !== void 0 ? custom : props.custom, currentValues, currentVelocity);
  }
  return definition;
}
__name(resolveVariantFromProps, "resolveVariantFromProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/resolve-value.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
init_define_process();
var isKeyframesTarget = /* @__PURE__ */ __name((v) => {
  return Array.isArray(v);
}, "isKeyframesTarget");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = /* @__PURE__ */ __name((v) => {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
}, "isCustomValue");
var resolveFinalValueInKeyframes = /* @__PURE__ */ __name((v) => {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
}, "resolveFinalValueInKeyframes");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}
__name(resolveMotionValue, "resolveMotionValue");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState, onMount }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onMount) {
    state.mount = (instance) => onMount(props, instance, state);
  }
  return state;
}
__name(makeState, "makeState");
var makeUseVisualState = /* @__PURE__ */ __name((config) => (props, isStatic) => {
  const context = useContext(MotionContext);
  const presenceContext = useContext(PresenceContext);
  const make = /* @__PURE__ */ __name(() => makeState(config, props, context, presenceContext), "make");
  return isStatic ? make() : useConstant(make);
}, "makeUseVisualState");
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props);
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate: animate3 } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate3 === void 0)
      animate3 = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate3 : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    list.forEach((definition) => {
      const resolved = resolveVariantFromProps(props, definition);
      if (!resolved)
        return;
      const { transitionEnd, transition, ...target } = resolved;
      for (const key in target) {
        let valueTarget = target[key];
        if (Array.isArray(valueTarget)) {
          const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
          valueTarget = valueTarget[index];
        }
        if (valueTarget !== null) {
          values[key] = valueTarget;
        }
      }
      for (const key in transitionEnd)
        values[key] = transitionEnd[key];
    });
  }
  return values;
}
__name(makeLatestValues, "makeLatestValues");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onMount: (props, instance, { renderState, latestValues }) => {
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

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/config-motion.mjs
init_define_process();
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/create-config.mjs
function createDomMotionConfig(Component2, { forwardMotionProps = false }, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
  const baseConfig = isSVGComponent(Component2) ? svgMotionConfig : htmlMotionConfig;
  return {
    ...baseConfig,
    preloadedFeatures,
    useRender: createUseRender(forwardMotionProps),
    createVisualElement,
    projectionNodeConstructor,
    Component: Component2
  };
}
__name(createDomMotionConfig, "createDomMotionConfig");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/gestures.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/types.mjs
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

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/events/use-dom-event.mjs
init_define_process();
init_reactMod();
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
__name(addDomEvent, "addDomEvent");
function useDomEvent(ref, eventName, handler, options) {
  useEffect(() => {
    const element = ref.current;
    if (handler && element) {
      return addDomEvent(element, eventName, handler, options);
    }
  }, [ref, eventName, handler, options]);
}
__name(useDomEvent, "useDomEvent");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-focus-gesture.mjs
function useFocusGesture({ whileFocus, visualElement }) {
  const { animationState } = visualElement;
  const onFocus = /* @__PURE__ */ __name(() => {
    animationState && animationState.setActive(AnimationType.Focus, true);
  }, "onFocus");
  const onBlur = /* @__PURE__ */ __name(() => {
    animationState && animationState.setActive(AnimationType.Focus, false);
  }, "onBlur");
  useDomEvent(visualElement, "focus", whileFocus ? onFocus : void 0);
  useDomEvent(visualElement, "blur", whileFocus ? onBlur : void 0);
}
__name(useFocusGesture, "useFocusGesture");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/utils/event-type.mjs
init_define_process();
function isMouseEvent(event) {
  if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
    return !!(event.pointerType === "mouse");
  }
  return event instanceof MouseEvent;
}
__name(isMouseEvent, "isMouseEvent");
function isTouchEvent(event) {
  const hasTouches = !!event.touches;
  return hasTouches;
}
__name(isTouchEvent, "isTouchEvent");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/events/event-info.mjs
init_define_process();
function filterPrimaryPointer(eventHandler) {
  return (event) => {
    const isMouseEvent2 = event instanceof MouseEvent;
    const isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
    if (isPrimaryPointer) {
      eventHandler(event);
    }
  };
}
__name(filterPrimaryPointer, "filterPrimaryPointer");
var defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType = "page") {
  const primaryTouch = e.touches[0] || e.changedTouches[0];
  const point = primaryTouch || defaultPagePoint;
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
__name(pointFromTouch, "pointFromTouch");
function pointFromMouse(point, pointType = "page") {
  return {
    x: point[pointType + "X"],
    y: point[pointType + "Y"]
  };
}
__name(pointFromMouse, "pointFromMouse");
function extractEventInfo(event, pointType = "page") {
  return {
    point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
  };
}
__name(extractEventInfo, "extractEventInfo");
var wrapHandler = /* @__PURE__ */ __name((handler, shouldFilterPrimaryPointer = false) => {
  const listener = /* @__PURE__ */ __name((event) => handler(event, extractEventInfo(event)), "listener");
  return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
}, "wrapHandler");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/events/utils.mjs
init_define_process();
var supportsPointerEvents = /* @__PURE__ */ __name(() => isBrowser && window.onpointerdown === null, "supportsPointerEvents");
var supportsTouchEvents = /* @__PURE__ */ __name(() => isBrowser && window.ontouchstart === null, "supportsTouchEvents");
var supportsMouseEvents = /* @__PURE__ */ __name(() => isBrowser && window.onmousedown === null, "supportsMouseEvents");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/events/use-pointer-event.mjs
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
__name(getPointerEventName, "getPointerEventName");
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, getPointerEventName(eventName), wrapHandler(handler, eventName === "pointerdown"), options);
}
__name(addPointerEvent, "addPointerEvent");
function usePointerEvent(ref, eventName, handler, options) {
  return useDomEvent(ref, getPointerEventName(eventName), handler && wrapHandler(handler, eventName === "pointerdown"), options);
}
__name(usePointerEvent, "usePointerEvent");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/lock.mjs
init_define_process();
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = /* @__PURE__ */ __name(() => {
      lock = null;
    }, "openLock");
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
__name(createLock, "createLock");
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag2) {
  let lock = false;
  if (drag2 === "y") {
    lock = globalVerticalLock();
  } else if (drag2 === "x") {
    lock = globalHorizontalLock();
  } else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) {
      lock = /* @__PURE__ */ __name(() => {
        openHorizontal();
        openVertical();
      }, "lock");
    } else {
      if (openHorizontal)
        openHorizontal();
      if (openVertical)
        openVertical();
    }
  }
  return lock;
}
__name(getGlobalLock, "getGlobalLock");
function isDragActive() {
  const openGestureLock = getGlobalLock(true);
  if (!openGestureLock)
    return true;
  openGestureLock();
  return false;
}
__name(isDragActive, "isDragActive");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-hover-gesture.mjs
function createHoverEvent(visualElement, isActive, callback) {
  return (event, info) => {
    if (!isMouseEvent(event) || isDragActive())
      return;
    if (visualElement.animationState) {
      visualElement.animationState.setActive(AnimationType.Hover, isActive);
    }
    callback && callback(event, info);
  };
}
__name(createHoverEvent, "createHoverEvent");
function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement }) {
  usePointerEvent(visualElement, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement, true, onHoverStart) : void 0, { passive: !onHoverStart });
  usePointerEvent(visualElement, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement, false, onHoverEnd) : void 0, { passive: !onHoverEnd });
}
__name(useHoverGesture, "useHoverGesture");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/utils/is-node-or-child.mjs
init_define_process();
var isNodeOrChild = /* @__PURE__ */ __name((parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
}, "isNodeOrChild");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-unmount-effect.mjs
init_define_process();
init_reactMod();
function useUnmountEffect(callback) {
  return useEffect(() => () => callback(), []);
}
__name(useUnmountEffect, "useUnmountEffect");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/index.mjs
init_define_process();

// ../../.yarn/global/cache/tslib-npm-2.4.0-9cb6dc5030-9.zip/node_modules/tslib/modules/index.js
init_define_process();
var import_tslib = __toESM(require_tslib(), 1);
var {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __exportStar,
  __createBinding,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn
} = import_tslib.default;

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/spring.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
init_define_process();
var import_hey_listen = __toESM(require_dist(), 1);

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/clamp.mjs
init_define_process();
var clamp2 = /* @__PURE__ */ __name((min, max, v) => Math.min(Math.max(v, min), max), "clamp");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
var safeMin = 1e-3;
var minDuration = 0.01;
var maxDuration = 10;
var minDamping = 0.05;
var maxDamping = 1;
function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
  let envelope;
  let derivative;
  (0, import_hey_listen.warning)(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp2(minDamping, maxDamping, dampingRatio);
  duration = clamp2(minDuration, maxDuration, duration / 1e3);
  if (dampingRatio < 1) {
    envelope = /* @__PURE__ */ __name((undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a2 = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a2 / b2 * c2;
    }, "envelope");
    derivative = /* @__PURE__ */ __name((undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    }, "derivative");
  } else {
    envelope = /* @__PURE__ */ __name((undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a2 * b2;
    }, "envelope");
    derivative = /* @__PURE__ */ __name((undampedFreq2) => {
      const a2 = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a2 * b2;
    }, "derivative");
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
__name(findSpring, "findSpring");
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
__name(approximateRoot, "approximateRoot");
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
__name(calcAngularFreq, "calcAngularFreq");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/spring.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
__name(isSpringType, "isSpringType");
function getSpringOptions(options) {
  let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    const derived = findSpring(options);
    springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
    springOptions.isResolvedFromDuration = true;
  }
  return springOptions;
}
__name(getSpringOptions, "getSpringOptions");
function spring(_a) {
  var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
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
      resolveSpring = /* @__PURE__ */ __name((t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      }, "resolveSpring");
      resolveVelocity = /* @__PURE__ */ __name((t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
      }, "resolveVelocity");
    } else if (dampingRatio === 1) {
      resolveSpring = /* @__PURE__ */ __name((t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t), "resolveSpring");
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = /* @__PURE__ */ __name((t) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
        const freqForT = Math.min(dampedAngularFreq * t, 300);
        return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      }, "resolveSpring");
    }
  }
  __name(createSpring, "createSpring");
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
__name(spring, "spring");
spring.needsInterpolation = (a2, b2) => typeof a2 === "string" || typeof b2 === "string";
var zero = /* @__PURE__ */ __name((_t) => 0, "zero");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/interpolate.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/progress.mjs
init_define_process();
var progress = /* @__PURE__ */ __name((from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
}, "progress");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix.mjs
init_define_process();
var mix = /* @__PURE__ */ __name((from, to, progress2) => -progress2 * from + progress2 * to + from, "mix");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-color.mjs
init_define_process();
var import_hey_listen2 = __toESM(require_dist(), 1);

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
init_define_process();
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
__name(hueToRgb, "hueToRgb");
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
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}
__name(hslaToRgba, "hslaToRgba");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-color.mjs
var mixLinearColor = /* @__PURE__ */ __name((from, to, v) => {
  const fromExpo = from * from;
  const toExpo = to * to;
  return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
}, "mixLinearColor");
var colorTypes = [hex, rgba, hsla];
var getColorType = /* @__PURE__ */ __name((v) => colorTypes.find((type) => type.test(v)), "getColorType");
var notAnimatable = /* @__PURE__ */ __name((color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`, "notAnimatable");
var mixColor = /* @__PURE__ */ __name((from, to) => {
  let fromColorType = getColorType(from);
  let toColorType = getColorType(to);
  (0, import_hey_listen2.invariant)(!!fromColorType, notAnimatable(from));
  (0, import_hey_listen2.invariant)(!!toColorType, notAnimatable(to));
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
}, "mixColor");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-complex.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/inc.mjs
init_define_process();
var isNum = /* @__PURE__ */ __name((v) => typeof v === "number", "isNum");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/pipe.mjs
init_define_process();
var combineFunctions = /* @__PURE__ */ __name((a2, b2) => (v) => b2(a2(v)), "combineFunctions");
var pipe = /* @__PURE__ */ __name((...transformers) => transformers.reduce(combineFunctions), "pipe");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/mix-complex.mjs
var import_hey_listen3 = __toESM(require_dist(), 1);
function getMixer(origin, target) {
  if (isNum(origin)) {
    return (v) => mix(origin, target, v);
  } else if (color.test(origin)) {
    return mixColor(origin, target);
  } else {
    return mixComplex(origin, target);
  }
}
__name(getMixer, "getMixer");
var mixArray = /* @__PURE__ */ __name((from, to) => {
  const output = [...from];
  const numValues = output.length;
  const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
  return (v) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](v);
    }
    return output;
  };
}, "mixArray");
var mixObject = /* @__PURE__ */ __name((origin, target) => {
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
}, "mixObject");
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
__name(analyse2, "analyse");
var mixComplex = /* @__PURE__ */ __name((origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyse2(origin);
  const targetStats = analyse2(target);
  const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
  if (canInterpolate) {
    return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
  } else {
    (0, import_hey_listen3.warning)(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return (p) => `${p > 0 ? target : origin}`;
  }
}, "mixComplex");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/interpolate.mjs
var import_hey_listen4 = __toESM(require_dist(), 1);
var mixNumber = /* @__PURE__ */ __name((from, to) => (p) => mix(from, to, p), "mixNumber");
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
__name(detectMixerFactory, "detectMixerFactory");
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
__name(createMixers, "createMixers");
function fastInterpolate([from, to], [mixer]) {
  return (v) => mixer(progress(from, to, v));
}
__name(fastInterpolate, "fastInterpolate");
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
__name(slowInterpolate, "slowInterpolate");
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
  const inputLength = input.length;
  (0, import_hey_listen4.invariant)(inputLength === output.length, "Both input and output ranges must be the same length");
  (0, import_hey_listen4.invariant)(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
  if (input[0] > input[inputLength - 1]) {
    input = [].concat(input);
    output = [].concat(output);
    input.reverse();
    output.reverse();
  }
  const mixers = createMixers(output, ease, mixer);
  const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
  return isClamp ? (v) => interpolator(clamp2(input[0], input[inputLength - 1], v)) : interpolator;
}
__name(interpolate, "interpolate");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/index.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/utils.mjs
init_define_process();
var reverseEasing = /* @__PURE__ */ __name((easing) => (p) => 1 - easing(1 - p), "reverseEasing");
var mirrorEasing = /* @__PURE__ */ __name((easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2, "mirrorEasing");
var createExpoIn = /* @__PURE__ */ __name((power) => (p) => Math.pow(p, power), "createExpoIn");
var createBackIn = /* @__PURE__ */ __name((power) => (p) => p * p * ((power + 1) * p - power), "createBackIn");
var createAnticipate = /* @__PURE__ */ __name((power) => {
  const backEasing = createBackIn(power);
  return (p) => (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
}, "createAnticipate");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/index.mjs
var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
var BOUNCE_FIRST_THRESHOLD = 4 / 11;
var BOUNCE_SECOND_THRESHOLD = 8 / 11;
var BOUNCE_THIRD_THRESHOLD = 9 / 10;
var linear = /* @__PURE__ */ __name((p) => p, "linear");
var easeIn = createExpoIn(2);
var easeOut = reverseEasing(easeIn);
var easeInOut = mirrorEasing(easeIn);
var circIn = /* @__PURE__ */ __name((p) => 1 - Math.sin(Math.acos(p)), "circIn");
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circOut);
var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
var backOut = reverseEasing(backIn);
var backInOut = mirrorEasing(backIn);
var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
var ca = 4356 / 361;
var cb = 35442 / 1805;
var cc = 16061 / 1805;
var bounceOut = /* @__PURE__ */ __name((p) => {
  if (p === 1 || p === 0)
    return p;
  const p2 = p * p;
  return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
}, "bounceOut");
var bounceIn = reverseEasing(bounceOut);
var bounceInOut = /* @__PURE__ */ __name((p) => p < 0.5 ? 0.5 * (1 - bounceOut(1 - p * 2)) : 0.5 * bounceOut(p * 2 - 1) + 0.5, "bounceInOut");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
__name(defaultEasing, "defaultEasing");
function defaultOffset(values) {
  const numValues = values.length;
  return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
__name(defaultOffset, "defaultOffset");
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}
__name(convertOffsetToTimes, "convertOffsetToTimes");
function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
  const state = { done: false, value: from };
  const values = Array.isArray(to) ? to : [from, to];
  const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
  function createInterpolator() {
    return interpolate(times, values, {
      ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
    });
  }
  __name(createInterpolator, "createInterpolator");
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
__name(keyframes, "keyframes");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/generators/decay.mjs
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
__name(decay, "decay");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
var types = { keyframes, spring, decay };
function detectAnimationFromOptions(config) {
  if (Array.isArray(config.to)) {
    return keyframes;
  } else if (types[config.type]) {
    return types[config.type];
  }
  const keys = new Set(Object.keys(config));
  if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
    return keyframes;
  } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
    return spring;
  }
  return keyframes;
}
__name(detectAnimationFromOptions, "detectAnimationFromOptions");

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/index.mjs
init_define_process();

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/on-next-frame.mjs
init_define_process();
var defaultTimestep = 1 / 60 * 1e3;
var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/create-render-step.mjs
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
__name(createRenderStep, "createRenderStep");

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/es/index.mjs
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
var processStep = /* @__PURE__ */ __name((stepId) => steps[stepId].process(frame), "processStep");
var processFrame = /* @__PURE__ */ __name((timestamp) => {
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
}, "processFrame");
var startLoop = /* @__PURE__ */ __name(() => {
  runNextFrame = true;
  useDefaultElapsed = true;
  if (!isProcessing)
    onNextFrame(processFrame);
}, "startLoop");
var getFrameData = /* @__PURE__ */ __name(() => frame, "getFrameData");
var es_default = sync;

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
init_define_process();
function loopElapsed(elapsed, duration, delay2 = 0) {
  return elapsed - duration - delay2;
}
__name(loopElapsed, "loopElapsed");
function reverseElapsed(elapsed, duration, delay2 = 0, isForwardPlayback = true) {
  return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay2) : duration - (elapsed - duration) + delay2;
}
__name(reverseElapsed, "reverseElapsed");
function hasRepeatDelayElapsed(elapsed, duration, delay2, isForwardPlayback) {
  return isForwardPlayback ? elapsed >= duration + delay2 : elapsed <= -delay2;
}
__name(hasRepeatDelayElapsed, "hasRepeatDelayElapsed");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/index.mjs
var framesync = /* @__PURE__ */ __name((update) => {
  const passTimestamp = /* @__PURE__ */ __name(({ delta }) => update(delta), "passTimestamp");
  return {
    start: () => es_default.update(passTimestamp, true),
    stop: () => cancelSync.update(passTimestamp)
  };
}, "framesync");
function animate(_a) {
  var _b, _c;
  var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
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
  __name(repeat, "repeat");
  function complete() {
    driverControls.stop();
    onComplete && onComplete();
  }
  __name(complete, "complete");
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
  __name(update, "update");
  function play() {
    onPlay === null || onPlay === void 0 ? void 0 : onPlay();
    driverControls = driver(update);
    driverControls.start();
  }
  __name(play, "play");
  autoplay && play();
  return {
    stop: () => {
      onStop === null || onStop === void 0 ? void 0 : onStop();
      driverControls.stop();
    }
  };
}
__name(animate, "animate");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/inertia.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
init_define_process();
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}
__name(velocityPerSecond, "velocityPerSecond");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/animations/inertia.mjs
function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
  let currentAnimation;
  function isOutOfBounds(v) {
    return min !== void 0 && v < min || max !== void 0 && v > max;
  }
  __name(isOutOfBounds, "isOutOfBounds");
  function boundaryNearest(v) {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  }
  __name(boundaryNearest, "boundaryNearest");
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
  __name(startAnimation2, "startAnimation");
  function startSpring(options) {
    startAnimation2(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
  }
  __name(startSpring, "startSpring");
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
    const checkBoundary = /* @__PURE__ */ __name((v) => {
      prev = current;
      current = v;
      velocity = velocityPerSecond(v - prev, getFrameData().delta);
      if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
        startSpring({ from: v, to: boundary, velocity });
      }
    }, "checkBoundary");
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
__name(inertia, "inertia");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/distance.mjs
init_define_process();

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/is-point.mjs
init_define_process();
var isPoint = /* @__PURE__ */ __name((point) => point.hasOwnProperty("x") && point.hasOwnProperty("y"), "isPoint");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/is-point-3d.mjs
init_define_process();
var isPoint3D = /* @__PURE__ */ __name((point) => isPoint(point) && point.hasOwnProperty("z"), "isPoint3D");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/utils/distance.mjs
var distance1D = /* @__PURE__ */ __name((a2, b2) => Math.abs(a2 - b2), "distance1D");
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
__name(distance, "distance");

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/es/easing/cubic-bezier.mjs
init_define_process();
var a = /* @__PURE__ */ __name((a1, a2) => 1 - 3 * a2 + 3 * a1, "a");
var b = /* @__PURE__ */ __name((a1, a2) => 3 * a2 - 6 * a1, "b");
var c = /* @__PURE__ */ __name((a1) => 3 * a1, "c");
var calcBezier = /* @__PURE__ */ __name((t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t, "calcBezier");
var getSlope = /* @__PURE__ */ __name((t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1), "getSlope");
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
__name(binarySubdivide, "binarySubdivide");
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
__name(newtonRaphsonIterate, "newtonRaphsonIterate");
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
  __name(getTForX, "getTForX");
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
__name(cubicBezier, "cubicBezier");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-tap-gesture.mjs
function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, visualElement }) {
  const hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
  const isPressing = useRef(false);
  const cancelPointerEndListeners = useRef(null);
  const eventOptions = {
    passive: !(onTapStart || onTap || onTapCancel || onPointerDown)
  };
  function removePointerEndListener() {
    cancelPointerEndListeners.current && cancelPointerEndListeners.current();
    cancelPointerEndListeners.current = null;
  }
  __name(removePointerEndListener, "removePointerEndListener");
  function checkPointerEnd() {
    removePointerEndListener();
    isPressing.current = false;
    visualElement.animationState && visualElement.animationState.setActive(AnimationType.Tap, false);
    return !isDragActive();
  }
  __name(checkPointerEnd, "checkPointerEnd");
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    !isNodeOrChild(visualElement.current, event.target) ? onTapCancel && onTapCancel(event, info) : onTap && onTap(event, info);
  }
  __name(onPointerUp, "onPointerUp");
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel && onTapCancel(event, info);
  }
  __name(onPointerCancel, "onPointerCancel");
  function onPointerDown(event, info) {
    removePointerEndListener();
    if (isPressing.current)
      return;
    isPressing.current = true;
    cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp, eventOptions), addPointerEvent(window, "pointercancel", onPointerCancel, eventOptions));
    visualElement.animationState && visualElement.animationState.setActive(AnimationType.Tap, true);
    onTapStart && onTapStart(event, info);
  }
  __name(onPointerDown, "onPointerDown");
  usePointerEvent(visualElement, "pointerdown", hasPressListeners ? onPointerDown : void 0, eventOptions);
  useUnmountEffect(removePointerEndListener);
}
__name(useTapGesture, "useTapGesture");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/process.mjs
init_define_process();
var defaultEnvironment = "production";
var env = typeof define_process_default === "undefined" || define_process_default.env === void 0 ? defaultEnvironment : "development";

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/warn-once.mjs
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
__name(warnOnce, "warnOnce");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
init_define_process();
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = /* @__PURE__ */ __name((entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
}, "fireObserverCallback");
var fireAllObserverCallbacks = /* @__PURE__ */ __name((entries) => {
  entries.forEach(fireObserverCallback);
}, "fireAllObserverCallbacks");
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
__name(initIntersectionObserver, "initIntersectionObserver");
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}
__name(observeIntersection, "observeIntersection");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/viewport/use-viewport.mjs
function useViewport({ visualElement, whileInView, onViewportEnter, onViewportLeave, viewport = {} }) {
  const state = useRef({
    hasEnteredView: false,
    isInView: false
  });
  let shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
  if (viewport.once && state.current.hasEnteredView)
    shouldObserve = false;
  const useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
  useObserver(shouldObserve, state.current, visualElement, viewport);
}
__name(useViewport, "useViewport");
var thresholdNames = {
  some: 0,
  all: 1
};
function useIntersectionObserver(shouldObserve, state, visualElement, { root, margin: rootMargin, amount = "some", once }) {
  useEffect(() => {
    if (!shouldObserve || !visualElement.current)
      return;
    const options = {
      root: root === null || root === void 0 ? void 0 : root.current,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const intersectionCallback = /* @__PURE__ */ __name((entry) => {
      const { isIntersecting } = entry;
      if (state.isInView === isIntersecting)
        return;
      state.isInView = isIntersecting;
      if (once && !isIntersecting && state.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        state.hasEnteredView = true;
      }
      if (visualElement.animationState) {
        visualElement.animationState.setActive(AnimationType.InView, isIntersecting);
      }
      const props = visualElement.getProps();
      const callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
      callback && callback(entry);
    }, "intersectionCallback");
    return observeIntersection(visualElement.current, options, intersectionCallback);
  }, [shouldObserve, root, rootMargin, amount]);
}
__name(useIntersectionObserver, "useIntersectionObserver");
function useMissingIntersectionObserver(shouldObserve, state, visualElement, { fallback = true }) {
  useEffect(() => {
    if (!shouldObserve || !fallback)
      return;
    if (env !== "production") {
      warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
    }
    requestAnimationFrame(() => {
      state.hasEnteredView = true;
      const { onViewportEnter } = visualElement.getProps();
      onViewportEnter && onViewportEnter(null);
      if (visualElement.animationState) {
        visualElement.animationState.setActive(AnimationType.InView, true);
      }
    });
  }, [shouldObserve]);
}
__name(useMissingIntersectionObserver, "useMissingIntersectionObserver");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/utils/make-renderless-component.mjs
init_define_process();
var makeRenderlessComponent = /* @__PURE__ */ __name((hook) => (props) => {
  hook(props);
  return null;
}, "makeRenderlessComponent");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: makeRenderlessComponent(useViewport),
  tap: makeRenderlessComponent(useTapGesture),
  focus: makeRenderlessComponent(useFocusGesture),
  hover: makeRenderlessComponent(useHoverGesture)
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/animations.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
init_define_process();
init_reactMod();
function usePresence() {
  const context = useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id2 = useId();
  useEffect(() => register(id2), []);
  const safeToRemove = /* @__PURE__ */ __name(() => onExitComplete && onExitComplete(id2), "safeToRemove");
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
__name(usePresence, "usePresence");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
init_define_process();
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}
__name(shallowCompare, "shallowCompare");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/animation.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/time-conversion.mjs
init_define_process();
var secondsToMilliseconds = /* @__PURE__ */ __name((seconds) => seconds * 1e3, "secondsToMilliseconds");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/easing.mjs
init_define_process();
var import_hey_listen5 = __toESM(require_dist(), 1);
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
var easingDefinitionToFunction = /* @__PURE__ */ __name((definition) => {
  if (Array.isArray(definition)) {
    (0, import_hey_listen5.invariant)(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    (0, import_hey_listen5.invariant)(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
}, "easingDefinitionToFunction");
var isEasingArray = /* @__PURE__ */ __name((ease) => {
  return Array.isArray(ease) && typeof ease[0] !== "number";
}, "isEasingArray");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
init_define_process();
var isAnimatable = /* @__PURE__ */ __name((key, value) => {
  if (key === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && complex.test(value) && !value.startsWith("url(")) {
    return true;
  }
  return false;
}, "isAnimatable");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
init_define_process();
var underDampedSpring = /* @__PURE__ */ __name(() => ({
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}), "underDampedSpring");
var criticallyDampedSpring = /* @__PURE__ */ __name((to) => ({
  type: "spring",
  stiffness: 550,
  damping: to === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), "criticallyDampedSpring");
var linearTween = /* @__PURE__ */ __name(() => ({
  type: "keyframes",
  ease: "linear",
  duration: 0.3
}), "linearTween");
var keyframes2 = /* @__PURE__ */ __name((values) => ({
  type: "keyframes",
  duration: 0.8,
  values
}), "keyframes");
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
var getDefaultTransition = /* @__PURE__ */ __name((valueKey, to) => {
  let transitionFactory;
  if (isKeyframesTarget(to)) {
    transitionFactory = keyframes2;
  } else {
    transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
  }
  return { to, ...transitionFactory(to) };
}, "getDefaultTransition");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
var import_hey_listen6 = __toESM(require_dist(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
init_define_process();
var defaultValueTypes = {
  ...numberValueTypes,
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
};
var getDefaultValueType = /* @__PURE__ */ __name((key) => defaultValueTypes[key], "getDefaultValueType");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  var _a;
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
}
__name(getAnimatableNone2, "getAnimatableNone");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
init_define_process();
var instantAnimationState = {
  current: false
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/delay.mjs
init_define_process();
function delay(callback, timeout) {
  const start = performance.now();
  const checkElapsed = /* @__PURE__ */ __name(({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelSync.read(checkElapsed);
      callback(elapsed - timeout);
    }
  }, "checkElapsed");
  es_default.read(checkElapsed, true);
  return () => cancelSync.read(checkElapsed);
}
__name(delay, "delay");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/utils/transitions.mjs
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, ...transition }) {
  return !!Object.keys(transition).length;
}
__name(isTransitionDefined, "isTransitionDefined");
var legacyRepeatWarning = false;
function convertTransitionToAnimationOptions({ ease, times, yoyo, flip, loop, ...transition }) {
  const options = { ...transition };
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
    (0, import_hey_listen6.warning)(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
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
__name(convertTransitionToAnimationOptions, "convertTransitionToAnimationOptions");
function getDelayFromTransition(transition, key) {
  var _a, _b;
  const valueTransition = getValueTransition(transition, key) || {};
  return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
__name(getDelayFromTransition, "getDelayFromTransition");
function hydrateKeyframes(options) {
  if (Array.isArray(options.to) && options.to[0] === null) {
    options.to = [...options.to];
    options.to[0] = options.from;
  }
  return options;
}
__name(hydrateKeyframes, "hydrateKeyframes");
function getPopmotionAnimationOptions(transition, options, key) {
  if (Array.isArray(options.to) && transition.duration === void 0) {
    transition.duration = 0.8;
  }
  hydrateKeyframes(options);
  if (!isTransitionDefined(transition)) {
    transition = {
      ...transition,
      ...getDefaultTransition(key, options.to)
    };
  }
  return {
    ...options,
    ...convertTransitionToAnimationOptions(transition)
  };
}
__name(getPopmotionAnimationOptions, "getPopmotionAnimationOptions");
function getAnimation(key, value, target, transition, onComplete) {
  const valueTransition = getValueTransition(transition, key) || {};
  let origin = valueTransition.from !== void 0 ? valueTransition.from : value.get();
  const isTargetAnimatable = isAnimatable(key, target);
  if (origin === "none" && isTargetAnimatable && typeof target === "string") {
    origin = getAnimatableNone2(key, target);
  } else if (isZero(origin) && typeof target === "string") {
    origin = getZeroUnit(target);
  } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
    target = getZeroUnit(origin);
  }
  const isOriginAnimatable = isAnimatable(key, origin);
  (0, import_hey_listen6.warning)(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${key} from "${origin}" to "${target}". ${origin} is not an animatable value - to enable this animation set ${origin} to a value animatable to ${target} via the \`style\` property.`);
  function start() {
    const options = {
      from: origin,
      to: target,
      velocity: value.getVelocity(),
      onComplete,
      onUpdate: (v) => value.set(v)
    };
    return valueTransition.type === "inertia" || valueTransition.type === "decay" ? inertia({ ...options, ...valueTransition }) : animate({
      ...getPopmotionAnimationOptions(valueTransition, options, key),
      onUpdate: (v) => {
        options.onUpdate(v);
        valueTransition.onUpdate && valueTransition.onUpdate(v);
      },
      onComplete: () => {
        options.onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      }
    });
  }
  __name(start, "start");
  function set() {
    const finalTarget = resolveFinalValueInKeyframes(target);
    value.set(finalTarget);
    onComplete();
    valueTransition.onUpdate && valueTransition.onUpdate(finalTarget);
    valueTransition.onComplete && valueTransition.onComplete();
    return { stop: () => {
    } };
  }
  __name(set, "set");
  return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
}
__name(getAnimation, "getAnimation");
function isZero(value) {
  return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
}
__name(isZero, "isZero");
function getZeroUnit(potentialUnitType) {
  return typeof potentialUnitType === "number" ? 0 : getAnimatableNone2("", potentialUnitType);
}
__name(getZeroUnit, "getZeroUnit");
function getValueTransition(transition, key) {
  return transition[key] || transition["default"] || transition;
}
__name(getValueTransition, "getValueTransition");
function startAnimation(key, value, target, transition = {}) {
  if (instantAnimationState.current) {
    transition = { type: false };
  }
  return value.start((onComplete) => {
    let controls;
    const animation = getAnimation(key, value, target, transition, onComplete);
    const delayBy = getDelayFromTransition(transition, key);
    const start = /* @__PURE__ */ __name(() => controls = animation(), "start");
    let cancelDelay;
    if (delayBy) {
      cancelDelay = delay(start, secondsToMilliseconds(delayBy));
    } else {
      start();
    }
    return () => {
      cancelDelay && cancelDelay();
      controls && controls.stop();
    };
  });
}
__name(startAnimation, "startAnimation");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/setters.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
init_define_process();
var isNumericalString = /* @__PURE__ */ __name((v) => /^\-?\d*\.?\d+$/.test(v), "isNumericalString");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
init_define_process();
var isZeroValueString = /* @__PURE__ */ __name((v) => /^0[^.\s]+$/.test(v), "isZeroValueString");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/value/index.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/array.mjs
init_define_process();
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
__name(addUniqueItem, "addUniqueItem");
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}
__name(removeItem, "removeItem");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a2, b2, c2) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a2, b2, c2);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a2, b2, c2);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};
__name(SubscriptionManager, "SubscriptionManager");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/value/index.mjs
var isFloat = /* @__PURE__ */ __name((value) => {
  return !isNaN(parseFloat(value));
}, "isFloat");
var MotionValue = class {
  constructor(init) {
    this.version = "7.6.7";
    this.timeDelta = 0;
    this.lastUpdated = 0;
    this.updateSubscribers = new SubscriptionManager();
    this.velocityUpdateSubscribers = new SubscriptionManager();
    this.renderSubscribers = new SubscriptionManager();
    this.canTrackVelocity = false;
    this.updateAndNotify = (v, render = true) => {
      this.prev = this.current;
      this.current = v;
      const { delta, timestamp } = getFrameData();
      if (this.lastUpdated !== timestamp) {
        this.timeDelta = delta;
        this.lastUpdated = timestamp;
        es_default.postRender(this.scheduleVelocityCheck);
      }
      if (this.prev !== this.current) {
        this.updateSubscribers.notify(this.current);
      }
      if (this.velocityUpdateSubscribers.getSize()) {
        this.velocityUpdateSubscribers.notify(this.getVelocity());
      }
      if (render) {
        this.renderSubscribers.notify(this.current);
      }
    };
    this.scheduleVelocityCheck = () => es_default.postRender(this.velocityCheck);
    this.velocityCheck = ({ timestamp }) => {
      if (timestamp !== this.lastUpdated) {
        this.prev = this.current;
        this.velocityUpdateSubscribers.notify(this.getVelocity());
      }
    };
    this.hasAnimated = false;
    this.prev = this.current = init;
    this.canTrackVelocity = isFloat(this.current);
  }
  onChange(subscription) {
    return this.updateSubscribers.add(subscription);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  onRenderRequest(subscription) {
    subscription(this.get());
    return this.renderSubscribers.add(subscription);
  }
  attach(passiveEffect) {
    this.passiveEffect = passiveEffect;
  }
  set(v, render = true) {
    if (!render || !this.passiveEffect) {
      this.updateAndNotify(v, render);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity ? velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
  }
  start(animation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.stopAnimation = animation(resolve);
    }).then(() => this.clearAnimation());
  }
  stop() {
    if (this.stopAnimation)
      this.stopAnimation();
    this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.updateSubscribers.clear();
    this.renderSubscribers.clear();
    this.stop();
  }
};
__name(MotionValue, "MotionValue");
function motionValue(init) {
  return new MotionValue(init);
}
__name(motionValue, "motionValue");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
init_define_process();
var testValueType = /* @__PURE__ */ __name((v) => (type) => type.test(v), "testValueType");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
init_define_process();
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = /* @__PURE__ */ __name((v) => dimensionValueTypes.find(testValueType(v)), "findDimensionValueType");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = /* @__PURE__ */ __name((v) => valueTypes.find(testValueType(v)), "findValueType");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
init_define_process();
function getCurrent(visualElement) {
  const current = {};
  visualElement.values.forEach((value, key) => current[key] = value.get());
  return current;
}
__name(getCurrent, "getCurrent");
function getVelocity(visualElement) {
  const velocity = {};
  visualElement.values.forEach((value, key) => velocity[key] = value.getVelocity());
  return velocity;
}
__name(getVelocity, "getVelocity");
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement), getVelocity(visualElement));
}
__name(resolveVariant, "resolveVariant");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
__name(setMotionValue, "setMotionValue");
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement.makeTargetAnimatable(resolved, false) : {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}
__name(setTarget, "setTarget");
function checkTargetForNewValues(visualElement, target, origin) {
  var _a, _b;
  const newValueKeys = Object.keys(target).filter((key) => !visualElement.hasValue(key));
  const numNewValues = newValueKeys.length;
  if (!numNewValues)
    return;
  for (let i = 0; i < numNewValues; i++) {
    const key = newValueKeys[i];
    const targetValue = target[key];
    let value = null;
    if (Array.isArray(targetValue)) {
      value = targetValue[0];
    }
    if (value === null) {
      value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
    }
    if (value === void 0 || value === null)
      continue;
    if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
      value = parseFloat(value);
    } else if (!findValueType(value) && complex.test(targetValue)) {
      value = getAnimatableNone2(key, targetValue);
    }
    visualElement.addValue(key, motionValue(value));
    if (origin[key] === void 0) {
      origin[key] = value;
    }
    if (value !== null)
      visualElement.setBaseTarget(key, value);
  }
}
__name(checkTargetForNewValues, "checkTargetForNewValues");
function getOriginFromTransition(key, transition) {
  if (!transition)
    return;
  const valueTransition = transition[key] || transition["default"] || transition;
  return valueTransition.from;
}
__name(getOriginFromTransition, "getOriginFromTransition");
function getOrigin(target, transition, visualElement) {
  var _a;
  const origin = {};
  for (const key in target) {
    const transitionOrigin = getOriginFromTransition(key, transition);
    origin[key] = transitionOrigin !== void 0 ? transitionOrigin : (_a = visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.get();
  }
  return origin;
}
__name(getOrigin, "getOrigin");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
init_define_process();
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}
__name(isWillChangeMotionValue, "isWillChangeMotionValue");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/animation.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = animateTarget(visualElement, resolvedDefinition, options);
  }
  return animation.then(() => visualElement.notify("AnimationComplete", definition));
}
__name(animateVisualElement, "animateVisualElement");
function animateVariant(visualElement, variant, options = {}) {
  var _a;
  const resolved = resolveVariant(visualElement, variant, options.custom);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation2 = resolved ? () => animateTarget(visualElement, resolved, options) : () => Promise.resolve();
  const getChildAnimations = ((_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2];
    return first().then(last);
  } else {
    return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
  }
}
__name(animateVariant, "animateVariant");
function animateTarget(visualElement, definition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  var _a;
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = visualElement.makeTargetAnimatable(definition);
  const willChange = visualElement.getValue("willChange");
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && ((_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.getState()[type]);
  for (const key in target) {
    const value = visualElement.getValue(key);
    const valueTarget = target[key];
    if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    let valueTransition = { delay: delay2, ...transition };
    if (visualElement.shouldReduceMotion && transformProps.has(key)) {
      valueTransition = {
        ...valueTransition,
        type: false,
        delay: 0
      };
    }
    let animation = startAnimation(key, value, valueTarget, valueTransition);
    if (isWillChangeMotionValue(willChange)) {
      willChange.add(key);
      animation = animation.then(() => willChange.remove(key));
    }
    animations2.push(animation);
  }
  return Promise.all(animations2).then(() => {
    transitionEnd && setTarget(visualElement, transitionEnd);
  });
}
__name(animateTarget, "animateTarget");
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
__name(animateChildren, "animateChildren");
function sortByTreeOrder(a2, b2) {
  return a2.sortNodePosition(b2);
}
__name(sortByTreeOrder, "sortByTreeOrder");
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
__name(shouldBlockAnimation, "shouldBlockAnimation");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var variantPriorityOrder = [
  AnimationType.Animate,
  AnimationType.InView,
  AnimationType.Focus,
  AnimationType.Hover,
  AnimationType.Tap,
  AnimationType.Drag,
  AnimationType.Exit
];
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
__name(animateList, "animateList");
function createAnimationState(visualElement) {
  let animate3 = animateList(visualElement);
  const state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = /* @__PURE__ */ __name((acc, definition) => {
    const resolved = resolveVariant(visualElement, definition);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  }, "buildResolvedTypeValues");
  function setAnimateFunction(makeAnimator) {
    animate3 = makeAnimator(visualElement);
  }
  __name(setAnimateFunction, "setAnimateFunction");
  function animateChanges(options, changedActiveType) {
    var _a;
    const props = visualElement.getProps();
    const context = visualElement.getVariantContext(true) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = (_a = props[type]) !== null && _a !== void 0 ? _a : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues, {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = /* @__PURE__ */ __name((key) => {
        shouldAnimateType = true;
        removedKeys.delete(key);
        typeState.needsAnimating[key] = true;
      }, "markToAnimate");
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
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
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      if (shouldAnimateType && !isInherited) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type, ...options }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        if (fallbackTarget !== void 0) {
          fallbackAnimation[key] = fallbackTarget;
        }
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && props.initial === false && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate3(animations2) : Promise.resolve();
  }
  __name(animateChanges, "animateChanges");
  function setActive(type, isActive, options) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(options, type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  __name(setActive, "setActive");
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state
  };
}
__name(createAnimationState, "createAnimationState");
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
__name(checkVariantsDidChange, "checkVariantsDidChange");
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
__name(createTypeState, "createTypeState");
function createState() {
  return {
    [AnimationType.Animate]: createTypeState(true),
    [AnimationType.InView]: createTypeState(),
    [AnimationType.Hover]: createTypeState(),
    [AnimationType.Tap]: createTypeState(),
    [AnimationType.Drag]: createTypeState(),
    [AnimationType.Focus]: createTypeState(),
    [AnimationType.Exit]: createTypeState()
  };
}
__name(createState, "createState");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: makeRenderlessComponent(({ visualElement, animate: animate3 }) => {
    visualElement.animationState || (visualElement.animationState = createAnimationState(visualElement));
    if (isAnimationControls(animate3)) {
      useEffect(() => animate3.subscribe(visualElement), [animate3]);
    }
  }),
  exit: makeRenderlessComponent((props) => {
    const { custom, visualElement } = props;
    const [isPresent, safeToRemove] = usePresence();
    const presenceContext = useContext(PresenceContext);
    useEffect(() => {
      visualElement.isPresent = isPresent;
      const animation = visualElement.animationState && visualElement.animationState.setActive(AnimationType.Exit, !isPresent, {
        custom: presenceContext && presenceContext.custom || custom
      });
      if (animation && !isPresent) {
        animation.then(safeToRemove);
      }
    }, [isPresent]);
  })
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/drag.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
init_define_process();
var import_hey_listen7 = __toESM(require_dist(), 1);

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/PanSession.mjs
init_define_process();
var PanSession = class {
  constructor(event, handlers, { transformPagePoint } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = getFrameData();
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      if (isMouseEvent(event2) && event2.buttons === 0) {
        this.handlePointerUp(event2, info2);
        return;
      }
      es_default.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd } = this.handlers;
      const panInfo = getPanInfo(transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (isTouchEvent(event) && event.touches.length > 1)
      return;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = getFrameData();
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelSync.update(this.updatePoint);
  }
};
__name(PanSession, "PanSession");
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
__name(transformPoint, "transformPoint");
function subtractPoint(a2, b2) {
  return { x: a2.x - b2.x, y: a2.y - b2.y };
}
__name(subtractPoint, "subtractPoint");
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity2(history, 0.1)
  };
}
__name(getPanInfo, "getPanInfo");
function startDevicePoint(history) {
  return history[0];
}
__name(startDevicePoint, "startDevicePoint");
function lastDevicePoint(history) {
  return history[history.length - 1];
}
__name(lastDevicePoint, "lastDevicePoint");
function getVelocity2(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
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
  const time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1e3;
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
__name(getVelocity2, "getVelocity");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
init_define_process();
function calcLength(axis) {
  return axis.max - axis.min;
}
__name(calcLength, "calcLength");
function isNear(value, target = 0, maxDistance = 0.01) {
  return distance(value, target) < maxDistance;
}
__name(isNear, "isNear");
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mix(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
    delta.scale = 1;
  delta.translate = mix(target.min, target.max, delta.origin) - delta.originPoint;
  if (isNear(delta.translate) || isNaN(delta.translate))
    delta.translate = 0;
}
__name(calcAxisDelta, "calcAxisDelta");
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin === null || origin === void 0 ? void 0 : origin.originX);
  calcAxisDelta(delta.y, source.y, target.y, origin === null || origin === void 0 ? void 0 : origin.originY);
}
__name(calcBoxDelta, "calcBoxDelta");
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
__name(calcRelativeAxis, "calcRelativeAxis");
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
__name(calcRelativeBox, "calcRelativeBox");
function calcRelativeAxisPosition(target, layout, parent) {
  target.min = layout.min - parent.min;
  target.max = target.min + calcLength(layout);
}
__name(calcRelativeAxisPosition, "calcRelativeAxisPosition");
function calcRelativePosition(target, layout, parent) {
  calcRelativeAxisPosition(target.x, layout.x, parent.x);
  calcRelativeAxisPosition(target.y, layout.y, parent.y);
}
__name(calcRelativePosition, "calcRelativePosition");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mix(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mix(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
__name(applyConstraints, "applyConstraints");
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
__name(calcRelativeAxisConstraints, "calcRelativeAxisConstraints");
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
__name(calcRelativeConstraints, "calcRelativeConstraints");
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
__name(calcViewportAxisConstraints, "calcViewportAxisConstraints");
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
__name(calcViewportConstraints, "calcViewportConstraints");
function calcOrigin2(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp2(0, 1, origin);
}
__name(calcOrigin2, "calcOrigin");
function rebaseAxisConstraints(layout, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout.min;
  }
  return relativeConstraints;
}
__name(rebaseAxisConstraints, "rebaseAxisConstraints");
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
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
__name(resolveDragElastic, "resolveDragElastic");
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
__name(resolveAxisElastic, "resolveAxisElastic");
function resolvePointElastic(dragElastic, label) {
  var _a;
  return typeof dragElastic === "number" ? dragElastic : (_a = dragElastic[label]) !== null && _a !== void 0 ? _a : 0;
}
__name(resolvePointElastic, "resolvePointElastic");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/models.mjs
init_define_process();
var createAxisDelta = /* @__PURE__ */ __name(() => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), "createAxisDelta");
var createDelta = /* @__PURE__ */ __name(() => ({
  x: createAxisDelta(),
  y: createAxisDelta()
}), "createDelta");
var createAxis = /* @__PURE__ */ __name(() => ({ min: 0, max: 0 }), "createAxis");
var createBox = /* @__PURE__ */ __name(() => ({
  x: createAxis(),
  y: createAxis()
}), "createBox");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
init_define_process();
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}
__name(eachAxis, "eachAxis");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/utils/measure.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
init_define_process();
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
__name(convertBoundingBoxToBox, "convertBoundingBoxToBox");
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
__name(convertBoxToBoundingBox, "convertBoxToBoundingBox");
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}
__name(transformBoxPoints, "transformBoxPoints");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
init_define_process();
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
__name(isIdentityScale, "isIdentityScale");
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
__name(hasScale, "hasScale");
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
}
__name(hasTransform, "hasTransform");
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
__name(has2DTranslate, "has2DTranslate");
function is2DTranslate(value) {
  return value && value !== "0%";
}
__name(is2DTranslate, "is2DTranslate");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
__name(scalePoint, "scalePoint");
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
__name(applyPointDelta, "applyPointDelta");
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
__name(applyAxisDelta, "applyAxisDelta");
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
__name(applyBoxDelta, "applyBoxDelta");
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  var _a, _b;
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
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
__name(applyTreeDeltas, "applyTreeDeltas");
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
__name(translateAxis, "translateAxis");
function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
  const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
  const originPoint = mix(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
}
__name(transformAxis, "transformAxis");
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function transformBox(box, transform) {
  transformAxis(box.x, transform, xKeys);
  transformAxis(box.y, transform, yKeys);
}
__name(transformBox, "transformBox");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
__name(measureViewportBox, "measureViewportBox");
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode2;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.x);
    translateAxis(viewportBox.y, scroll.y);
  }
  return viewportBox;
}
__name(measurePageBox, "measurePageBox");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    if (this.visualElement.isPresent === false)
      return;
    const onSessionStart = /* @__PURE__ */ __name((event) => {
      this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event, "page").point);
      }
    }, "onSessionStart");
    const onStart = /* @__PURE__ */ __name((event, info) => {
      var _a;
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openGlobalLock)
          this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag2);
        if (!this.openGlobalLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        var _a2, _b;
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const measuredAxis = (_b = (_a2 = this.visualElement.projection) === null || _a2 === void 0 ? void 0 : _a2.layout) === null || _b === void 0 ? void 0 : _b.layoutBox[axis];
          if (measuredAxis) {
            const length = calcLength(measuredAxis);
            current = length * (parseFloat(current) / 100);
          }
        }
        this.originPoint[axis] = current;
      });
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
      (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(AnimationType.Drag, true);
    }, "onStart");
    const onMove = /* @__PURE__ */ __name((event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock === null || onDirectionLock === void 0 ? void 0 : onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
    }, "onMove");
    const onSessionEnd = /* @__PURE__ */ __name((event, info) => this.stop(event, info), "onSessionEnd");
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd
    }, { transformPagePoint: this.visualElement.getTransformPagePoint() });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(event, info);
  }
  cancel() {
    var _a, _b;
    this.isDragging = false;
    if (this.visualElement.projection) {
      this.visualElement.projection.isAnimationBlocked = false;
    }
    (_a = this.panSession) === null || _a === void 0 ? void 0 : _a.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(AnimationType.Drag, false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const { layout } = this.visualElement.projection || {};
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout) {
        this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    (0, import_hey_listen7.invariant)(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      var _a;
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = (_a = constraints === null || constraints === void 0 ? void 0 : constraints[axis]) !== null && _a !== void 0 ? _a : {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    return startAnimation(axis, axisValue, 0, transition);
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  getAxisMotionValue(axis) {
    var _a, _b;
    const dragKey = "_drag" + axis.toUpperCase();
    const externalMotionValue = this.visualElement.getProps()[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (_b = (_a = this.visualElement.getProps().initial) === null || _a === void 0 ? void 0 : _a[axis]) !== null && _b !== void 0 ? _b : 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mix(min, max, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    var _a;
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mix(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    var _a;
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = /* @__PURE__ */ __name(() => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints)) {
        this.constraints = this.resolveRefConstraints();
      }
    }, "measureDragConstraints");
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
      projection.updateLayout();
    }
    measureDragConstraints();
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", ({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    });
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener === null || stopLayoutUpdateListener === void 0 ? void 0 : stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
__name(VisualElementDragControls, "VisualElementDragControls");
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
__name(shouldDrag, "shouldDrag");
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
__name(getCurrentDirection, "getCurrentDirection");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/drag/use-drag.mjs
function useDrag(props) {
  const { dragControls: groupDragControls, visualElement } = props;
  const dragControls = useConstant(() => new VisualElementDragControls(visualElement));
  useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
  useEffect(() => dragControls.addListeners(), [dragControls]);
}
__name(useDrag, "useDrag");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/gestures/use-pan-gesture.mjs
init_define_process();
init_reactMod();
function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement }) {
  const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
  const panSession = useRef(null);
  const { transformPagePoint } = useContext(MotionConfigContext);
  const handlers = {
    onSessionStart: onPanSessionStart,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: (event, info) => {
      panSession.current = null;
      onPanEnd && onPanEnd(event, info);
    }
  };
  useEffect(() => {
    if (panSession.current !== null) {
      panSession.current.updateHandlers(handlers);
    }
  });
  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, {
      transformPagePoint
    });
  }
  __name(onPointerDown, "onPointerDown");
  usePointerEvent(visualElement, "pointerdown", hasPanEvents && onPointerDown);
  useUnmountEffect(() => panSession.current && panSession.current.end());
}
__name(usePanGesture, "usePanGesture");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: makeRenderlessComponent(usePanGesture),
  drag: makeRenderlessComponent(useDrag)
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
init_define_process();
var import_hey_listen8 = __toESM(require_dist(), 1);
function isCSSVariable2(value) {
  return typeof value === "string" && value.startsWith("var(--");
}
__name(isCSSVariable2, "isCSSVariable");
var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function parseCSSVariable(current) {
  const match = cssVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token, fallback] = match;
  return [token, fallback];
}
__name(parseCSSVariable, "parseCSSVariable");
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  (0, import_hey_listen8.invariant)(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    return resolved.trim();
  } else if (isCSSVariable2(fallback)) {
    return getVariableValue(fallback, element, depth + 1);
  } else {
    return fallback;
  }
}
__name(getVariableValue, "getVariableValue");
function resolveCSSVariables(visualElement, { ...target }, transitionEnd) {
  const element = visualElement.current;
  if (!(element instanceof Element))
    return { target, transitionEnd };
  if (transitionEnd) {
    transitionEnd = { ...transitionEnd };
  }
  visualElement.values.forEach((value) => {
    const current = value.get();
    if (!isCSSVariable2(current))
      return;
    const resolved = getVariableValue(current, element);
    if (resolved)
      value.set(resolved);
  });
  for (const key in target) {
    const current = target[key];
    if (!isCSSVariable2(current))
      continue;
    const resolved = getVariableValue(current, element);
    if (!resolved)
      continue;
    target[key] = resolved;
    if (transitionEnd && transitionEnd[key] === void 0) {
      transitionEnd[key] = current;
    }
  }
  return { target, transitionEnd };
}
__name(resolveCSSVariables, "resolveCSSVariables");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
init_define_process();
var import_hey_listen9 = __toESM(require_dist(), 1);
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
var isPositionalKey = /* @__PURE__ */ __name((key) => positionalKeys.has(key), "isPositionalKey");
var hasPositionalKey = /* @__PURE__ */ __name((target) => {
  return Object.keys(target).some(isPositionalKey);
}, "hasPositionalKey");
var setAndResetVelocity = /* @__PURE__ */ __name((value, to) => {
  value.set(to, false);
  value.set(to);
}, "setAndResetVelocity");
var isNumOrPxType = /* @__PURE__ */ __name((v) => v === number || v === px, "isNumOrPxType");
var BoundingBoxDimension;
(function(BoundingBoxDimension2) {
  BoundingBoxDimension2["width"] = "width";
  BoundingBoxDimension2["height"] = "height";
  BoundingBoxDimension2["left"] = "left";
  BoundingBoxDimension2["right"] = "right";
  BoundingBoxDimension2["top"] = "top";
  BoundingBoxDimension2["bottom"] = "bottom";
})(BoundingBoxDimension || (BoundingBoxDimension = {}));
var getPosFromMatrix = /* @__PURE__ */ __name((matrix, pos) => parseFloat(matrix.split(", ")[pos]), "getPosFromMatrix");
var getTranslateFromMatrix = /* @__PURE__ */ __name((pos2, pos3) => (_bbox, { transform }) => {
  if (transform === "none" || !transform)
    return 0;
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
}, "getTranslateFromMatrix");
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  if (removedTransforms.length)
    visualElement.render();
  return removedTransforms;
}
__name(removeNonTranslationalTransform, "removeNonTranslationalTransform");
var positionalValues = {
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
var convertChangedValueTypes = /* @__PURE__ */ __name((target, visualElement, changedKeys) => {
  const originBbox = visualElement.measureViewportBox();
  const element = visualElement.current;
  const elementComputedStyle = getComputedStyle(element);
  const { display } = elementComputedStyle;
  const origin = {};
  if (display === "none") {
    visualElement.setStaticValue("display", target.display || "block");
  }
  changedKeys.forEach((key) => {
    origin[key] = positionalValues[key](originBbox, elementComputedStyle);
  });
  visualElement.render();
  const targetBbox = visualElement.measureViewportBox();
  changedKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    setAndResetVelocity(value, origin[key]);
    target[key] = positionalValues[key](targetBbox, elementComputedStyle);
  });
  return target;
}, "convertChangedValueTypes");
var checkAndConvertChangedValueTypes = /* @__PURE__ */ __name((visualElement, target, origin = {}, transitionEnd = {}) => {
  target = { ...target };
  transitionEnd = { ...transitionEnd };
  const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
  let removedTransformValues = [];
  let hasAttemptedToRemoveTransformValues = false;
  const changedValueTypeKeys = [];
  targetPositionalKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (!visualElement.hasValue(key))
      return;
    let from = origin[key];
    let fromType = findDimensionValueType(from);
    const to = target[key];
    let toType;
    if (isKeyframesTarget(to)) {
      const numKeyframes = to.length;
      const fromIndex = to[0] === null ? 1 : 0;
      from = to[fromIndex];
      fromType = findDimensionValueType(from);
      for (let i = fromIndex; i < numKeyframes; i++) {
        if (!toType) {
          toType = findDimensionValueType(to[i]);
          (0, import_hey_listen9.invariant)(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
        } else {
          (0, import_hey_listen9.invariant)(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
        }
      }
    } else {
      toType = findDimensionValueType(to);
    }
    if (fromType !== toType) {
      if (isNumOrPxType(fromType) && isNumOrPxType(toType)) {
        const current = value.get();
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
          removedTransformValues = removeNonTranslationalTransform(visualElement);
          hasAttemptedToRemoveTransformValues = true;
        }
        changedValueTypeKeys.push(key);
        transitionEnd[key] = transitionEnd[key] !== void 0 ? transitionEnd[key] : target[key];
        setAndResetVelocity(value, to);
      }
    }
  });
  if (changedValueTypeKeys.length) {
    const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
    const convertedTarget = convertChangedValueTypes(target, visualElement, changedValueTypeKeys);
    if (removedTransformValues.length) {
      removedTransformValues.forEach(([key, value]) => {
        visualElement.getValue(key).set(value);
      });
    }
    visualElement.render();
    if (isBrowser && scrollY !== null) {
      window.scrollTo({ top: scrollY });
    }
    return { target: convertedTarget, transitionEnd };
  } else {
    return { target, transitionEnd };
  }
}, "checkAndConvertChangedValueTypes");
function unitConversion(visualElement, target, origin, transitionEnd) {
  return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement, target, origin, transitionEnd) : { target, transitionEnd };
}
__name(unitConversion, "unitConversion");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/utils/parse-dom-variant.mjs
var parseDomVariant = /* @__PURE__ */ __name((visualElement, target, origin, transitionEnd) => {
  const resolved = resolveCSSVariables(visualElement, target, transitionEnd);
  target = resolved.target;
  transitionEnd = resolved.transitionEnd;
  return unitConversion(visualElement, target, origin, transitionEnd);
}, "parseDomVariant");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/VisualElement.mjs
init_define_process();
var import_hey_listen10 = __toESM(require_dist(), 1);
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
init_define_process();
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = /* @__PURE__ */ __name(() => prefersReducedMotion.current = motionMediaQuery.matches, "setReducedMotionPreferences");
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}
__name(initPrefersReducedMotion, "initPrefersReducedMotion");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
init_define_process();
function updateMotionValuesFromProps(element, next, prev) {
  const { willChange } = next;
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (isWillChangeMotionValue(willChange)) {
        willChange.add(key);
      }
      if (true) {
        warnOnce(nextValue.version === "7.6.7", `Attempting to mix Framer Motion versions ${nextValue.version} with 7.6.7 may not work as expected.`);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue));
      if (isWillChangeMotionValue(willChange)) {
        willChange.remove(key);
      }
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        !existingValue.hasAnimated && existingValue.set(nextValue);
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}
__name(updateMotionValuesFromProps, "updateMotionValuesFromProps");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/VisualElement.mjs
var featureNames = Object.keys(featureDefinitions);
var numFeatures = featureNames.length;
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "Unmount",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var VisualElement = class {
  constructor({ parent, props, reducedMotionConfig, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.isPresent = true;
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.scheduleRender = () => es_default.render(this.render, false, true);
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
        if (isWillChangeMotionValue(willChange)) {
          willChange.add(key);
        }
      }
    }
  }
  scrapeMotionValuesFromProps(_props) {
    return {};
  }
  mount(instance) {
    var _a;
    this.current = instance;
    if (this.projection) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (this.parent)
      this.parent.children.add(this);
    this.setProps(this.props);
  }
  unmount() {
    var _a, _b, _c;
    (_a = this.projection) === null || _a === void 0 ? void 0 : _a.unmount();
    cancelSync.update(this.notifyUpdate);
    cancelSync.render(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    (_b = this.removeFromVariantTree) === null || _b === void 0 ? void 0 : _b.call(this);
    (_c = this.parent) === null || _c === void 0 ? void 0 : _c.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    const removeOnChange = value.onChange((latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && es_default.update(this.notifyUpdate, false, true);
    });
    const removeOnRenderRequest = value.onRenderRequest(this.scheduleRender);
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type)
      return 0;
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  loadFeatures(renderedProps, isStrict, preloadedFeatures, projectionId, ProjectionNodeConstructor, initialLayoutGroupConfig) {
    const features = [];
    if (env !== "production" && preloadedFeatures && isStrict) {
      (0, import_hey_listen10.invariant)(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
    }
    for (let i = 0; i < numFeatures; i++) {
      const name = featureNames[i];
      const { isEnabled, Component: Component2 } = featureDefinitions[name];
      if (isEnabled(renderedProps) && Component2) {
        features.push(createElement(Component2, {
          key: name,
          ...renderedProps,
          visualElement: this
        }));
      }
    }
    if (!this.projection && ProjectionNodeConstructor) {
      this.projection = new ProjectionNodeConstructor(projectionId, this.latestValues, this.parent && this.parent.projection);
      const { layoutId, layout, drag: drag2, dragConstraints, layoutScroll } = renderedProps;
      this.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
        visualElement: this,
        scheduleRender: () => this.scheduleRender(),
        animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig: initialLayoutGroupConfig,
        layoutScroll
      });
    }
    return features;
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.options, this.props);
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  makeTargetAnimatable(target, canMutate = true) {
    return this.makeTargetAnimatableFromInstance(target, this.props, canMutate);
  }
  setProps(props) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.props = props;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listener = props["on" + key];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props), this.prevMotionValues);
  }
  getProps() {
    return this.props;
  }
  getVariant(name) {
    var _a;
    return (_a = this.props.variants) === null || _a === void 0 ? void 0 : _a[name];
  }
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    var _a;
    return this.isVariantNode ? this : (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getClosestVariantNode();
  }
  getVariantContext(startAtParent = false) {
    var _a, _b;
    if (startAtParent)
      return (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getVariantContext();
    if (!this.isControllingVariants) {
      const context2 = ((_b = this.parent) === null || _b === void 0 ? void 0 : _b.getVariantContext()) || {};
      if (this.props.initial !== void 0) {
        context2.initial = this.props.initial;
      }
      return context2;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
      const name = variantProps2[i];
      const prop = this.props[name];
      if (isVariantLabel(prop) || prop === false) {
        context[name] = prop;
      }
    }
    return context;
  }
  addVariantChild(child) {
    var _a;
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  addValue(key, value) {
    if (this.hasValue(key))
      this.removeValue(key);
    this.values.set(key, value);
    this.latestValues[key] = value.get();
    this.bindToMotionValue(key, value);
  }
  removeValue(key) {
    var _a;
    this.values.delete(key);
    (_a = this.valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
    this.valueSubscriptions.delete(key);
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue);
      this.addValue(key, value);
    }
    return value;
  }
  readValue(key) {
    return this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.readValueFromInstance(this.current, key, this.options);
  }
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  getBaseTarget(key) {
    var _a;
    const { initial } = this.props;
    const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a = resolveVariantFromProps(this.props, initial)) === null || _a === void 0 ? void 0 : _a[key] : void 0;
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    var _a;
    (_a = this.events[eventName]) === null || _a === void 0 ? void 0 : _a.notify(...args);
  }
};
__name(VisualElement, "VisualElement");
var variantProps2 = ["initial", ...variantPriorityOrder];
var numVariantProps = variantProps2.length;

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  sortInstanceNodePosition(a2, b2) {
    return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    var _a;
    return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  makeTargetAnimatableFromInstance({ transition, transitionEnd, ...target }, { transformValues }, isMounted) {
    let origin = getOrigin(target, transition || {}, this);
    if (transformValues) {
      if (transitionEnd)
        transitionEnd = transformValues(transitionEnd);
      if (target)
        target = transformValues(target);
      if (origin)
        origin = transformValues(origin);
    }
    if (isMounted) {
      checkTargetForNewValues(this, target, origin);
      const parsed = parseDomVariant(this, target, origin, transitionEnd);
      transitionEnd = parsed.transitionEnd;
      target = parsed.target;
    }
    return {
      transition,
      transitionEnd,
      ...target
    };
  }
};
__name(DOMVisualElement, "DOMVisualElement");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
__name(getComputedStyle2, "getComputedStyle");
var HTMLVisualElement = class extends DOMVisualElement {
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariable(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, options, props) {
    buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props) {
    return scrapeMotionValuesFromProps(props);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderHTML(instance, renderState, styleProp, projection);
  }
};
__name(HTMLVisualElement, "HTMLVisualElement");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
init_define_process();
var SVGVisualElement = class extends DOMVisualElement {
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    var _a;
    if (transformProps.has(key)) {
      return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  scrapeMotionValuesFromProps(props) {
    return scrapeMotionValuesFromProps2(props);
  }
  build(renderState, latestValues, options, props) {
    buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
};
__name(SVGVisualElement, "SVGVisualElement");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = /* @__PURE__ */ __name((Component2, options) => {
  return isSVGComponent(Component2) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
}, "createDomVisualElement");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
init_define_process();
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
__name(pixelsToPercent, "pixelsToPercent");
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
init_define_process();
var varToken = "_$css";
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const containsCSSVariables = latest.includes("var(");
    const cssVariables = [];
    if (containsCSSVariables) {
      latest = latest.replace(cssVariableRegex, (match) => {
        cssVariables.push(match);
        return varToken;
      });
    }
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mix(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    let output = template(shadow);
    if (containsCSSVariables) {
      let i = 0;
      output = output.replace(varToken, () => {
        const cssVariable = cssVariables[i];
        i++;
        return cssVariable;
      });
    }
    return output;
  }
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = class extends reactMod_default.Component {
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        es_default.postRender(() => {
          var _a;
          if (!((_a = projection.getStack()) === null || _a === void 0 ? void 0 : _a.members.length)) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      if (!projection.currentAnimation && projection.isLead()) {
        this.safeToRemove();
      }
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup === null || layoutGroup === void 0 ? void 0 : layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext === null || promoteContext === void 0 ? void 0 : promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove === null || safeToRemove === void 0 ? void 0 : safeToRemove();
  }
  render() {
    return null;
  }
};
__name(MeasureLayoutWithContext, "MeasureLayoutWithContext");
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = useContext(LayoutGroupContext);
  return reactMod_default.createElement(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: useContext(SwitchLayoutGroupContext), isPresent, safeToRemove });
}
__name(MeasureLayout, "MeasureLayout");
var defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/motion/features/layout/index.mjs
var layoutFeatures = {
  measureLayout: MeasureLayout
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/animation/animate.mjs
init_define_process();
function animate2(from, to, transition = {}) {
  const value = isMotionValue(from) ? from : motionValue(from);
  startAnimation("", value, to, transition);
  return {
    stop: () => value.stop(),
    isAnimating: () => value.isAnimating()
  };
}
__name(animate2, "animate");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
init_define_process();
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = /* @__PURE__ */ __name((value) => typeof value === "string" ? parseFloat(value) : value, "asNumber");
var isPx = /* @__PURE__ */ __name((value) => typeof value === "number" || px.test(value), "isPx");
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  var _a, _b, _c, _d;
  if (shouldCrossfadeOpacity) {
    target.opacity = mix(
      0,
      (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mix(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mix(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
__name(mixValues, "mixValues");
function getRadius(values, radiusName) {
  var _a;
  return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
}
__name(getRadius, "getRadius");
var easeCrossfadeIn = compress(0, 0.5, circOut);
var easeCrossfadeOut = compress(0.5, 0.95, linear);
function compress(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(progress(min, max, p));
  };
}
__name(compress, "compress");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
init_define_process();
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
__name(copyAxisInto, "copyAxisInto");
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
__name(copyBoxInto, "copyBoxInto");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
init_define_process();
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
__name(removePointDelta, "removePointDelta");
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mix(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mix(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
__name(removeAxisDelta, "removeAxisDelta");
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
__name(removeAxisTransforms, "removeAxisTransforms");
var xKeys2 = ["x", "scaleX", "originX"];
var yKeys2 = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
  removeAxisTransforms(box.y, transforms, yKeys2, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
}
__name(removeBoxTransforms, "removeBoxTransforms");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
init_define_process();
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
__name(isAxisDeltaZero, "isAxisDeltaZero");
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
__name(isDeltaZero, "isDeltaZero");
function boxEquals(a2, b2) {
  return a2.x.min === b2.x.min && a2.x.max === b2.x.max && a2.y.min === b2.y.min && a2.y.max === b2.y.max;
}
__name(boxEquals, "boxEquals");
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
__name(aspectRatio, "aspectRatio");
function isCloseTo(a2, b2, max = 0.1) {
  return distance(a2, b2) <= max;
}
__name(isCloseTo, "isCloseTo");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/shared/stack.mjs
init_define_process();
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
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
  }
  promote(node, preserveFollowOpacity) {
    var _a;
    const prevLead = this.lead;
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
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      var _a, _b, _c, _d, _e;
      (_b = (_a = node.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_e = (_c = node.resumingFrom) === null || _c === void 0 ? void 0 : (_d = _c.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d);
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};
__name(NodeStack, "NodeStack");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/styles/transform.mjs
init_define_process();
var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)";
function buildProjectionTransform(delta, treeScale, latestTransform) {
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  let transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
  transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  if (latestTransform) {
    const { rotate, rotateX, rotateY } = latestTransform;
    if (rotate)
      transform += `rotate(${rotate}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  transform += `scale(${elementScaleX}, ${elementScaleY})`;
  return transform === identityProjection ? "none" : transform;
}
__name(buildProjectionTransform, "buildProjectionTransform");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
init_define_process();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
init_define_process();
var compareByDepth = /* @__PURE__ */ __name((a2, b2) => a2.depth - b2.depth, "compareByDepth");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};
__name(FlatTree, "FlatTree");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var transformAxes = ["", "X", "Y", "Z"];
var animationTarget = 1e3;
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return /* @__PURE__ */ __name(class ProjectionNode {
    constructor(elementId, latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
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
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
      };
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.elementId = elementId;
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      elementId && this.root.registerPotentialNode(elementId, this);
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager === null || subscriptionManager === void 0 ? void 0 : subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    registerPotentialNode(id2, node) {
      this.potentialNodes.set(id2, node);
    }
    mount(instance, isLayoutDirty = false) {
      var _a;
      if (this.instance)
        return;
      this.isSVG = instance instanceof SVGElement && instance.tagName !== "svg";
      this.instance = instance;
      const { layoutId, layout, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      (_a = this.parent) === null || _a === void 0 ? void 0 : _a.children.add(this);
      this.elementId && this.root.potentialNodes.delete(this.elementId);
      if (isLayoutDirty && (layout || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = /* @__PURE__ */ __name(() => this.root.updateBlockedByResize = false, "resizeUnblockUpdate");
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
          var _a2, _b, _c, _d, _e;
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = (_b = (_a2 = this.options.transition) !== null && _a2 !== void 0 ? _a2 : visualElement.getDefaultTransition()) !== null && _b !== void 0 ? _b : defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const targetChanged = !this.targetLayout || !boxEquals(this.targetLayout, newLayout) || hasRelativeTargetChanged;
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeTargetChanged;
          if (((_c = this.resumeFrom) === null || _c === void 0 ? void 0 : _c.instance) || hasOnlyRelativeTargetChanged || hasLayoutChanged && (targetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged && this.animationProgress === 0) {
              finishAnimation(this);
            }
            this.isLead() && ((_e = (_d = this.options).onExitComplete) === null || _e === void 0 ? void 0 : _e.call(_d));
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      var _a, _b;
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.remove(this);
      (_b = this.parent) === null || _b === void 0 ? void 0 : _b.children.delete(this);
      this.instance = void 0;
      cancelSync.preRender(this.updateProjection);
    }
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      var _a;
      return this.isAnimationBlocked || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimationBlocked()) || false;
    }
    startUpdate() {
      var _a;
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      (_a = this.nodes) === null || _a === void 0 ? void 0 : _a.forEach(resetRotation);
    }
    willUpdate(shouldNotifyListeners = true) {
      var _a, _b, _c;
      if (this.root.isUpdateBlocked()) {
        (_b = (_a = this.options).onExitComplete) === null || _b === void 0 ? void 0 : _b.call(_a);
        return;
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll();
      }
      const { layoutId, layout } = this.options;
      if (layoutId === void 0 && !layout)
        return;
      const transformTemplate = (_c = this.options.visualElement) === null || _c === void 0 ? void 0 : _c.getProps().transformTemplate;
      this.prevTransformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    didUpdate() {
      const updateWasBlocked = this.isUpdateBlocked();
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
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      es_default.preRender(this.updateProjection, false, true);
    }
    scheduleCheckAfterUnmount() {
      es_default.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
    }
    updateLayout() {
      var _a;
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.notify("LayoutMeasure", this.layout.layoutBox, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.layoutBox);
    }
    updateScroll() {
      if (this.options.layoutScroll && this.instance) {
        this.isScrollRoot = checkIsScrollRoot(this.instance);
        this.scroll = measureScroll(this.instance);
      }
    }
    resetTransform() {
      var _a;
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
      const transformTemplateValue = transformTemplate === null || transformTemplate === void 0 ? void 0 : transformTemplate(this.latestValues, "");
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        measuredBox: pageBox,
        layoutBox,
        latestValues: {}
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const { scroll } = this.root;
      if (scroll) {
        translateAxis(box.x, scroll.x);
        translateAxis(box.y, scroll.y);
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll, options, isScrollRoot } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (isScrollRoot) {
            copyBoxInto(boxWithoutScroll, box);
            const { scroll: rootScroll } = this.root;
            if (rootScroll) {
              translateAxis(boxWithoutScroll.x, -rootScroll.x);
              translateAxis(boxWithoutScroll.y, -rootScroll.y);
            }
          }
          translateAxis(boxWithoutScroll.x, scroll.x);
          translateAxis(boxWithoutScroll.y, scroll.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
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
    }
    removeTransform(box) {
      var _a;
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a = node.snapshot) === null || _a === void 0 ? void 0 : _a.layoutBox, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    resolveTargetDelta() {
      var _a;
      const { layout, layoutId } = this.options;
      if (!this.layout || !(layout || layoutId))
        return;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout) {
          this.relativeParent = relativeParent;
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.target)) {
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target) {
          this.relativeParent = relativeParent;
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues))
        return void 0;
      if ((this.parent.relativeTarget || this.parent.targetDelta) && this.parent.layout) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    calcProjection() {
      var _a;
      const { layout, layoutId } = this.options;
      this.isTreeAnimating = Boolean(((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isTreeAnimating) || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout || layoutId))
        return;
      const lead = this.getLead();
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, Boolean(this.resumingFrom) || this !== lead);
      const { target } = lead;
      if (!target)
        return;
      if (!this.projectionDelta) {
        this.projectionDelta = createDelta();
        this.projectionDeltaWithTransform = createDelta();
      }
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      const prevProjectionTransform = this.projectionTransform;
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      this.projectionTransform = buildProjectionTransform(this.projectionDelta, this.treeScale);
      if (this.projectionTransform !== prevProjectionTransform || this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll = true) {
      var _a, _b, _c;
      (_b = (_a = this.options).scheduleRender) === null || _b === void 0 ? void 0 : _b.call(_a);
      notifyAll && ((_c = this.getStack()) === null || _c === void 0 ? void 0 : _c.scheduleRender());
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      var _a;
      const snapshot = this.snapshot;
      const snapshotLatestValues = (snapshot === null || snapshot === void 0 ? void 0 : snapshot.latestValues) || {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      this.relativeTarget = this.relativeTargetOrigin = void 0;
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const isSharedLayoutAnimation = snapshot === null || snapshot === void 0 ? void 0 : snapshot.isShared;
      const isOnlyMember = (((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.members.length) || 0) <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      this.mixTargetDelta = (latest) => {
        var _a2;
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.layout)) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(0);
    }
    startAnimation(options) {
      var _a, _b;
      this.notifyListeners("animationStart");
      (_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      if (this.resumingFrom) {
        (_b = this.resumingFrom.currentAnimation) === null || _b === void 0 ? void 0 : _b.stop();
      }
      if (this.pendingAnimation) {
        cancelSync.update(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = es_default.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.currentAnimation = animate2(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            var _a2;
            this.mixTargetDelta(latest);
            (_a2 = options.onUpdate) === null || _a2 === void 0 ? void 0 : _a2.call(options, latest);
          },
          onComplete: () => {
            var _a2;
            (_a2 = options.onComplete) === null || _a2 === void 0 ? void 0 : _a2.call(options);
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      var _a;
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      var _a;
      if (this.currentAnimation) {
        (_a = this.mixTargetDelta) === null || _a === void 0 ? void 0 : _a.call(this, animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout)
        return;
      if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      var _a, _b, _c;
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      node.promote({
        transition: (_a = node.options.initialPromotionConfig) === null || _a === void 0 ? void 0 : _a.transition,
        preserveFollowOpacity: (_c = (_b = node.options.initialPromotionConfig) === null || _b === void 0 ? void 0 : _b.shouldPreserveFollowOpacity) === null || _c === void 0 ? void 0 : _c.call(_b, node)
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
    }
    getPrevLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasRotate = false;
      const resetValues = {};
      for (let i = 0; i < transformAxes.length; i++) {
        const axis = transformAxes[i];
        const key = "rotate" + axis;
        if (!visualElement.getStaticValue(key)) {
          continue;
        }
        hasRotate = true;
        resetValues[key] = visualElement.getStaticValue(key);
        visualElement.setStaticValue(key, 0);
      }
      if (!hasRotate)
        return;
      visualElement === null || visualElement === void 0 ? void 0 : visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp = {}) {
      var _a, _b, _c;
      const styles = {};
      if (!this.instance || this.isSVG)
        return styles;
      if (!this.isVisible) {
        return { visibility: "hidden" };
      } else {
        styles.visibility = "";
      }
      const transformTemplate = (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.getProps().transformTemplate;
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_c = (_b = valuesToRender.opacity) !== null && _b !== void 0 ? _b : this.latestValues.opacity) !== null && _c !== void 0 ? _c : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo } = scaleCorrectors[key];
        const corrected = correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
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
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  }, "ProjectionNode");
}
__name(createProjectionNode, "createProjectionNode");
function updateLayout(node) {
  node.updateLayout();
}
__name(updateLayout, "updateLayout");
function notifyLayoutUpdate(node) {
  var _a, _b, _c;
  const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = snapshot.isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
      eachAxis((axis) => {
        const axisSnapshot = snapshot.isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (snapshot.isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeTargetChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout, parentLayout.layoutBox);
          if (!boxEquals(relativeSnapshot, relativeLayout)) {
            hasRelativeTargetChanged = true;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeTargetChanged
    });
  } else if (node.isLead()) {
    (_c = (_b = node.options).onExitComplete) === null || _c === void 0 ? void 0 : _c.call(_b);
  }
  node.options.transition = void 0;
}
__name(notifyLayoutUpdate, "notifyLayoutUpdate");
function clearSnapshot(node) {
  node.clearSnapshot();
}
__name(clearSnapshot, "clearSnapshot");
function clearMeasurements(node) {
  node.clearMeasurements();
}
__name(clearMeasurements, "clearMeasurements");
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement === null || visualElement === void 0 ? void 0 : visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
__name(resetTransformStyle, "resetTransformStyle");
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
}
__name(finishAnimation, "finishAnimation");
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
__name(resolveTargetDelta, "resolveTargetDelta");
function calcProjection(node) {
  node.calcProjection();
}
__name(calcProjection, "calcProjection");
function resetRotation(node) {
  node.resetRotation();
}
__name(resetRotation, "resetRotation");
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
__name(removeLeadSnapshots, "removeLeadSnapshots");
function mixAxisDelta(output, delta, p) {
  output.translate = mix(delta.translate, 0, p);
  output.scale = mix(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
__name(mixAxisDelta, "mixAxisDelta");
function mixAxis(output, from, to, p) {
  output.min = mix(from.min, to.min, p);
  output.max = mix(from.max, to.max, p);
}
__name(mixAxis, "mixAxis");
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
__name(mixBox, "mixBox");
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
__name(hasOpacityCrossfade, "hasOpacityCrossfade");
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
function mountNodeEarly(node, id2) {
  let searchNode = node.root;
  for (let i = node.path.length - 1; i >= 0; i--) {
    if (Boolean(node.path[i].instance)) {
      searchNode = node.path[i];
      break;
    }
  }
  const searchElement = searchNode && searchNode !== node.root ? searchNode.instance : document;
  const element = searchElement.querySelector(`[data-projection-id="${id2}"]`);
  if (element)
    node.mount(element, true);
}
__name(mountNodeEarly, "mountNodeEarly");
function roundAxis(axis) {
  axis.min = Math.round(axis.min);
  axis.max = Math.round(axis.max);
}
__name(roundAxis, "roundAxis");
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
__name(roundBox, "roundBox");
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
  return animationType === "position" || animationType === "preserve-aspect" && !isCloseTo(aspectRatio(snapshot), aspectRatio(layout), 0.2);
}
__name(shouldAnimatePositionOnly, "shouldAnimatePositionOnly");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
init_define_process();
var DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode(0, {});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/motion.mjs
var featureBundle = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layoutFeatures
};
var motion = /* @__PURE__ */ createMotionProxy((Component2, config) => createDomMotionConfig(Component2, config, featureBundle, createDomVisualElement, HTMLProjectionNode));

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/motion-minimal.mjs
init_define_process();
var m = createMotionProxy(createDomMotionConfig);

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
init_define_process();
init_reactMod();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-force-update.mjs
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-is-mounted.mjs
init_define_process();
init_reactMod();
function useIsMounted() {
  const isMounted = useRef(false);
  useIsomorphicLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
__name(useIsMounted, "useIsMounted");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/utils/use-force-update.mjs
function useForceUpdate() {
  const isMounted = useIsMounted();
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(() => {
    isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
  }, [forcedRenderCount]);
  const deferredForceRender = useCallback(() => es_default.postRender(forceRender), [forceRender]);
  return [deferredForceRender, forcedRenderCount];
}
__name(useForceUpdate, "useForceUpdate");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
init_define_process();
init_reactMod();
init_reactMod();

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
init_define_process();
init_reactMod();
init_reactMod();
var PopChildMeasure = class extends Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent) {
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
    }
    return null;
  }
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
__name(PopChildMeasure, "PopChildMeasure");
function PopChild({ children, isPresent }) {
  const id2 = useId();
  const ref = useRef(null);
  const size = useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0
  });
  useInsertionEffect(() => {
    const { width, height, top, left } = size.current;
    if (isPresent || !ref.current || !width || !height)
      return;
    ref.current.dataset.motionPopId = id2;
    const style = document.createElement("style");
    document.head.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id2}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            top: ${top}px !important;
            left: ${left}px !important;
          }
        `);
    }
    return () => {
      document.head.removeChild(style);
    };
  }, [isPresent]);
  return createElement(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size }, cloneElement(children, { ref }));
}
__name(PopChild, "PopChild");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = /* @__PURE__ */ __name(({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id2 = useId();
  const context = useMemo(
    () => ({
      id: id2,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    }),
    presenceAffectsLayout ? void 0 : [isPresent]
  );
  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  if (mode === "popLayout") {
    children = createElement(PopChild, { isPresent }, children);
  }
  return createElement(PresenceContext.Provider, { value: context }, children);
}, "PresenceChild");
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
__name(newChildrenMap, "newChildrenMap");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var getChildKey = /* @__PURE__ */ __name((child) => child.key || "", "getChildKey");
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
__name(updateChildLookup, "updateChildLookup");
function onlyElements(children) {
  const filtered = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
__name(onlyElements, "onlyElements");
var AnimatePresence = /* @__PURE__ */ __name(({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
  if (exitBeforeEnter) {
    mode = "wait";
    warnOnce(false, "Replace exitBeforeEnter with mode='wait'");
  }
  let [forceRender] = useForceUpdate();
  const forceRenderLayoutGroup = useContext(LayoutGroupContext).forceRender;
  if (forceRenderLayoutGroup)
    forceRender = forceRenderLayoutGroup;
  const isMounted = useIsMounted();
  const filteredChildren = onlyElements(children);
  let childrenToRender = filteredChildren;
  const exiting = /* @__PURE__ */ new Set();
  const presentChildren = useRef(childrenToRender);
  const allChildren = useRef(/* @__PURE__ */ new Map()).current;
  const isInitialRender = useRef(true);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    updateChildLookup(filteredChildren, allChildren);
    presentChildren.current = childrenToRender;
  });
  useUnmountEffect(() => {
    isInitialRender.current = true;
    allChildren.clear();
    exiting.clear();
  });
  if (isInitialRender.current) {
    return createElement(Fragment, null, childrenToRender.map((child) => createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout, mode }, child)));
  }
  childrenToRender = [...childrenToRender];
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);
  const numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    }
  }
  if (mode === "wait" && exiting.size) {
    childrenToRender = [];
  }
  exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1)
      return;
    const child = allChildren.get(key);
    if (!child)
      return;
    const insertionIndex = presentKeys.indexOf(key);
    const onExit = /* @__PURE__ */ __name(() => {
      allChildren.delete(key);
      exiting.delete(key);
      const removeIndex = presentChildren.current.findIndex((presentChild) => presentChild.key === key);
      presentChildren.current.splice(removeIndex, 1);
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        if (isMounted.current === false)
          return;
        forceRender();
        onExitComplete && onExitComplete();
      }
    }, "onExit");
    childrenToRender.splice(insertionIndex, 0, createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode }, child));
  });
  childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exiting.has(key) ? child : createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout, mode }, child);
  });
  if (env !== "production" && mode === "wait" && childrenToRender.length > 1) {
    console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  }
  return createElement(Fragment, null, exiting.size ? childrenToRender : childrenToRender.map((child) => cloneElement(child)));
}, "AnimatePresence");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs
init_define_process();
init_reactMod();
init_reactMod();
function MotionConfig({ children, isValidProp, ...config }) {
  isValidProp && loadExternalIsValidProp(isValidProp);
  config = { ...useContext(MotionConfigContext), ...config };
  config.isStatic = useConstant(() => config.isStatic);
  const context = useMemo(() => config, [JSON.stringify(config.transition), config.transformPagePoint, config.reducedMotion]);
  return createElement(MotionConfigContext.Provider, { value: context }, children);
}
__name(MotionConfig, "MotionConfig");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/components/LazyMotion/index.mjs
init_define_process();
init_reactMod();
init_reactMod();
function LazyMotion({ children, features, strict = false }) {
  const [, setIsLoaded] = useState(!isLazyBundle(features));
  const loadedRenderer = useRef(void 0);
  if (!isLazyBundle(features)) {
    const { renderer, ...loadedFeatures } = features;
    loadedRenderer.current = renderer;
    loadFeatures(loadedFeatures);
  }
  useEffect(() => {
    if (isLazyBundle(features)) {
      features().then(({ renderer, ...loadedFeatures }) => {
        loadFeatures(loadedFeatures);
        loadedRenderer.current = renderer;
        setIsLoaded(true);
      });
    }
  }, []);
  return createElement(LazyContext.Provider, { value: { renderer: loadedRenderer.current, strict } }, children);
}
__name(LazyMotion, "LazyMotion");
function isLazyBundle(features) {
  return typeof features === "function";
}
__name(isLazyBundle, "isLazyBundle");

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/features-animation.mjs
init_define_process();
var domAnimation = {
  renderer: createDomVisualElement,
  ...animations,
  ...gestureAnimations
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/render/dom/features-max.mjs
init_define_process();
var domMax = {
  ...domAnimation,
  ...drag,
  ...layoutFeatures,
  projectionNodeConstructor: HTMLProjectionNode
};

// ../../.yarn/__virtual__/framer-motion-virtual-548be56b4a/0/global/cache/framer-motion-npm-7.6.7-869904e6f3-9.zip/node_modules/framer-motion/dist/es/index.mjs
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/md/index.esm.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/index.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconsManifest.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconBase.js
init_define_process();
init_reactMod();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconContext.js
init_define_process();
init_reactMod();
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = reactMod_default.createContext && reactMod_default.createContext(DefaultContext);

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconBase.js
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
var __rest2 = function(s, e) {
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
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return reactMod_default.createElement(node.tag, __assign2({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
__name(Tree2Element, "Tree2Element");
function GenIcon(data) {
  return function(props) {
    return reactMod_default.createElement(IconBase, __assign2({
      attr: __assign2({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
__name(GenIcon, "GenIcon");
function IconBase(props) {
  var elem = /* @__PURE__ */ __name(function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest2(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return reactMod_default.createElement("svg", __assign2({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign2(__assign2({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && reactMod_default.createElement("title", null, title), props.children);
  }, "elem");
  return IconContext !== void 0 ? reactMod_default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
__name(IconBase, "IconBase");

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/md/index.esm.js
function MdQrCode(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z" } }] })(props);
}
__name(MdQrCode, "MdQrCode");
function MdPhoneAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" } }] })(props);
}
__name(MdPhoneAndroid, "MdPhoneAndroid");
function MdTabletAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" } }] })(props);
}
__name(MdTabletAndroid, "MdTabletAndroid");
function MdTv(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" } }] })(props);
}
__name(MdTv, "MdTv");
function MdFullscreen(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" } }] })(props);
}
__name(MdFullscreen, "MdFullscreen");
function MdShare(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" } }] })(props);
}
__name(MdShare, "MdShare");

// js/icons.tsx
init_define_process();
var import_react37 = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var Wrap = /* @__PURE__ */ __name(({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
  css: import_react37.css`
font-size:20pt;
`,
  children
}), "Wrap");
var QrCodeIcon = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdQrCode, {})
}), "QrCodeIcon");
var Phone = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPhoneAndroid, {})
}), "Phone");
var Share = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdShare, {})
}), "Share");
var Tablet = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTabletAndroid, {})
}), "Tablet");
var Tv = /* @__PURE__ */ __name(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTv, {})
}), "Tv");

// js/mui.tsx
init_define_process();
var import_react38 = __toESM(require_emotion_react_cjs(), 1);
init_reactMod();
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var FabLazy = lazy(async () => import("./chunk-Fab-CM5IYTYH.mjs"));
var Fab = /* @__PURE__ */ __name((props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Suspense, {
  fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    css: import_react38.css`width: 28px; height:28px`
  }),
  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FabLazy, {
    ...props
  })
}), "Fab");
var ToggleButtonLazy = lazy(async () => import("./chunk-ToggleButton-S7BITK5T.mjs"));
var ToggleButton = /* @__PURE__ */ __name((props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Suspense, {
  fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    css: import_react38.css`width: 28px; height:28px`
  }),
  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButtonLazy, {
    ...props
  })
}), "ToggleButton");
var ToggleButtonGroupLazy = lazy(async () => import("./chunk-ToggleButtonGroup-M67G63XS.mjs"));
var ToggleButtonGroup = /* @__PURE__ */ __name((props) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Suspense, {
  fallback: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    css: import_react38.css`width: 28px; height:28px`
  }),
  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButtonGroupLazy, {
    ...props
  })
}), "ToggleButtonGroup");

export {
  motion,
  m,
  AnimatePresence,
  MotionConfig,
  LazyMotion,
  domAnimation,
  domMax,
  MdFullscreen,
  QrCodeIcon,
  Phone,
  Share,
  Tablet,
  Tv,
  Fab,
  ToggleButton,
  ToggleButtonGroup
};
