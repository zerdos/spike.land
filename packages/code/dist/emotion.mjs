import {
  require_emotion_styled_cjs
} from "./chunk-chunk-LNOAV67P.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-BVCMLDRQ.mjs";
import "./chunk-chunk-VMDOMYJI.mjs";
import {
  createContext,
  h,
  init_react_preact,
  p,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from "./chunk-chunk-4OMMVWMA.mjs";
import {
  init_define_process
} from "./chunk-chunk-QTIR5YHF.mjs";
import {
  __toESM
} from "./chunk-chunk-477FBAEY.mjs";

// js/emotion.ts
init_define_process();
var import_react4 = __toESM(require_emotion_react_cjs(), 1);

// ../../.yarn/__virtual__/@xstyled-emotion-virtual-265ce3e174/4/Users/z/.yarn/berry/cache/@xstyled-emotion-npm-3.7.0-0de45c419c-9.zip/node_modules/@xstyled/emotion/dist/index.mjs
init_define_process();
init_react_preact();
var import_react2 = __toESM(require_emotion_react_cjs(), 1);
var import_react3 = __toESM(require_emotion_react_cjs(), 1);

// ../../../../../Users/z/.yarn/berry/cache/@xstyled-core-npm-3.7.0-1d4c584725-9.zip/node_modules/@xstyled/core/dist/index.mjs
init_define_process();
init_react_preact();
init_react_preact();

// ../../../../../Users/z/.yarn/berry/cache/@xstyled-system-npm-3.7.0-22bc1e357e-9.zip/node_modules/@xstyled/system/dist/index.mjs
init_define_process();

// ../../../../../Users/z/.yarn/berry/cache/@xstyled-util-npm-3.7.0-a706674a15-9.zip/node_modules/@xstyled/util/dist/index.mjs
init_define_process();
var DEV = true;
var specialProperties = ["__proto__", "constructor", "prototype"];
var is = (n) => n !== void 0 && n !== null;
var num = (n) => typeof n === "number" && !Number.isNaN(n);
var string = (n) => typeof n === "string" && n !== "";
var obj = (n) => typeof n === "object" && n !== null;
var func = (n) => typeof n === "function";
var negative = (n) => num(n) && n < 0;
var get = (from, path) => {
  const paths = String(path).split(".");
  const pathsLength = paths.length;
  let result = from;
  for (let i = 0; i < pathsLength; i += 1) {
    if (!is(result))
      return result;
    const path2 = paths[i];
    result = is(result[path2]) ? result[path2] : void 0;
  }
  return result;
};
var assign = (target, source) => {
  if (!is(source))
    return target;
  for (const key in source) {
    if (specialProperties.indexOf(key) !== -1) {
      continue;
    }
    target[key] = source[key];
  }
  return target;
};
var merge = (target, source) => {
  if (!is(source))
    return target;
  for (const key in source) {
    if (specialProperties.indexOf(key) !== -1) {
      continue;
    }
    if (obj(target[key])) {
      target[key] = merge(assign({}, target[key]), source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};
var warn = (condition, message) => {
  if (DEV) {
    if (!condition && console.error) {
      console.error(message);
    }
  }
};
function cascade(value, arg) {
  if (typeof value === "function") {
    return cascade(value(arg), arg);
  }
  return value;
}
var getThemeValue = (props, path, initial = props.theme) => cascade(get(initial, path), props);
function flattenDown(array, result) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (Array.isArray(value)) {
      flattenDown(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}
function flatten(array) {
  return flattenDown(array, []);
}

// ../../../../../Users/z/.yarn/berry/cache/@xstyled-system-npm-3.7.0-22bc1e357e-9.zip/node_modules/@xstyled/system/dist/index.mjs
var __pow = Math.pow;
var round = (value) => Math.round(value * __pow(10, 4)) / __pow(10, 4);
var unit = (unit2) => (value) => num(value) && value !== 0 ? `${value}${unit2}` : value;
var ms = unit("ms");
var px$1 = unit("px");
var deg = unit("deg");
var pxToRem = (value, { rootFontSize = 16 } = {}) => round(value / rootFontSize);
var rpx = (value, options) => {
  if (!string(value) || value.length < 4)
    return value;
  const unit2 = value.slice(-3);
  if (unit2 !== "rpx")
    return value;
  const n = Number(value.slice(0, value.length - 3));
  if (n === 0)
    return 0;
  return `${pxToRem(n, options)}rem`;
};
var percent = (n) => num(n) && n !== 0 && n >= -1 && n <= 1 ? `${round(n * 100)}%` : n;
var transformNegative = (_, { rawValue, variants, props }) => {
  if (string(rawValue)) {
    const neg = rawValue.startsWith("-");
    const abs = neg ? rawValue.substr(1) : rawValue;
    const varVal = getThemeValue(props, abs, variants);
    const value = string(varVal) || num(varVal) ? varVal : abs;
    return neg ? `-${value}` : value;
  }
  if (num(rawValue)) {
    const neg = negative(rawValue);
    const abs = Math.abs(rawValue);
    const varVal = variants ? variants[abs] : void 0;
    if (string(varVal))
      return neg ? `-${varVal}` : varVal;
    const value = num(varVal) ? varVal : abs;
    return neg ? value * -1 : value;
  }
  return void 0;
};
var mediaMinWidth = (value) => value ? `@media (min-width: ${value})` : null;
var getBreakpointMin = (screens, key) => {
  const value = screens[key];
  return value === 0 ? null : px$1(value);
};
var getBreakpointMax = (screens, key) => {
  const value = screens[key];
  return value === 0 ? null : px$1(value - 0.02);
};
var __defProp$6 = Object.defineProperty;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj2, key, value) => key in obj2 ? __defProp$6(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var getScreens = (props) => {
  return props.theme && props.theme.screens ? props.theme.screens : {};
};
var getStates = (props) => {
  return props.theme && props.theme.states ? props.theme.states : {};
};
var getVariants = (props) => {
  const screens = getScreens(props);
  const states = getStates(props);
  const medias = {};
  for (const value in screens) {
    medias[value] = mediaMinWidth(getBreakpointMin(screens, value));
  }
  const variants = __spreadValues$6(__spreadValues$6({}, medias), states);
  for (const [value, selector] of Object.entries(variants)) {
    if (selector && selector.startsWith("@")) {
      delete variants[value];
      variants[value] = selector;
    }
  }
  return variants;
};
var getCachedVariants = (props, cache) => {
  if (cache.has("_variants"))
    return cache.get("_variants");
  const states = getVariants(props);
  cache.set("_variants", states);
  return states;
};
var cacheSupported = typeof Map !== "undefined" && typeof WeakMap !== "undefined";
var caches = cacheSupported ? /* @__PURE__ */ new WeakMap() : null;
var isCacheDisabled = (theme) => {
  var _a;
  return ((_a = theme == null ? void 0 : theme.xstyled) == null ? void 0 : _a.cache) === false;
};
var getThemeCache = (theme) => {
  const cacheDisabled = isCacheDisabled(theme);
  if (cacheDisabled)
    return null;
  if (caches === null)
    return null;
  if (caches.has(theme))
    return caches.get(theme) || null;
  const cache = {};
  caches.set(theme, cache);
  return cache;
};
var noopCache = {
  has: () => false,
  set: () => void 0,
  get: () => void 0
};
var getCache = (theme, namespace) => {
  if (!theme)
    return noopCache;
  const cache = getThemeCache(theme);
  if (!cache || !theme)
    return noopCache;
  cache[namespace] = cache[namespace] || /* @__PURE__ */ new Map();
  return cache[namespace];
};
var __defProp$5 = Object.defineProperty;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj2, key, value) => key in obj2 ? __defProp$5(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var themeGetterId = 0;
var SPLITTERS = {
  shorthand: [/\s+/, " "],
  multiple: [/\s*,\s*/, ","]
};
var splitValue = (splitter, transform2) => (value) => value.split(splitter[0]).map(transform2).join(splitter[1]);
var themeGetter = ({
  name,
  transform: defaultTransform,
  key,
  compose: compose2,
  shorthand,
  multiple
}) => {
  const id = themeGetterId++;
  const getter = (value, defaultValue) => (props) => {
    let res = value;
    if (!string(value) && !num(value) && value !== true) {
      return res;
    }
    const cacheKey = `${typeof value}-${value}-${defaultValue}`;
    const cache = getCache(props.theme, `__themeGetter${id}`);
    if (cache.has(cacheKey))
      return cache.get(cacheKey);
    const getValue = (value2) => {
      const localDefaultValue = is(defaultValue) ? defaultValue : value2;
      let res2 = value2;
      const variants = is(key) ? getThemeValue(props, key) : null;
      if (is(variants)) {
        const path = value2 === true ? "default" : string(value2) || num(value2) ? value2 : null;
        if (is(path)) {
          const fromTheme = getThemeValue(props, path, variants);
          res2 = Array.isArray(fromTheme) ? fromTheme.join(",") : fromTheme;
        }
      }
      let rawValue = value2;
      if (!is(res2)) {
        rawValue = localDefaultValue;
        res2 = localDefaultValue;
      }
      const transform2 = (name && props.theme && props.theme.transformers ? props.theme.transformers[name] : null) || defaultTransform;
      if (transform2) {
        res2 = transform2(res2, {
          rawValue,
          variants,
          props
        });
      }
      return compose2 ? compose2(res2)(props) : res2;
    };
    if ((shorthand || multiple) && string(value)) {
      let transform2 = getValue;
      if (shorthand)
        transform2 = splitValue(SPLITTERS.shorthand, transform2);
      if (multiple)
        transform2 = splitValue(SPLITTERS.multiple, transform2);
      res = transform2(value);
    } else {
      res = getValue(value);
    }
    cache.set(cacheKey, res);
    return res;
  };
  getter.meta = { name, transform: defaultTransform };
  return getter;
};
var createStyleGenerator = ({
  getStyle,
  props,
  cssGetters = {},
  generators
}) => {
  const generator = getStyle;
  generator.meta = {
    props,
    cssGetters,
    getStyle: generator,
    generators
  };
  generator.apply = (values) => ({ theme }) => generator(__spreadValues$5({ theme }, values));
  return generator;
};
var reduceVariants = (props, values, getStyle) => {
  const cache = getCache(props.theme, "__variants");
  const variants = getCachedVariants(props, cache);
  let styles = {};
  for (const value in values) {
    const style2 = getStyle(values[value]);
    if (style2 === null)
      continue;
    const state = value in variants ? variants[value] : value;
    if (state === void 0)
      continue;
    if (state === null) {
      styles = merge(styles, style2);
    } else {
      styles[state] = styles[state] ? assign(styles[state], style2) : style2;
    }
  }
  return styles;
};
var getStyleFactory = (prop, mixin, themeGet) => {
  return (props) => {
    const fromValue = (value2) => {
      if (!is(value2))
        return null;
      if (obj(value2))
        return reduceVariants(props, value2, fromValue);
      return cascade(mixin(themeGet ? themeGet(value2)(props) : value2), props);
    };
    const value = props[prop];
    if (!is(value))
      return null;
    const cache = getCache(props.theme, prop);
    const key = obj(value) ? JSON.stringify(value) : value;
    if (cache.has(key))
      return cache.get(key);
    const style2 = fromValue(value);
    cache.set(key, style2);
    return style2;
  };
};
var indexGeneratorsByProp = (generators) => {
  const index = {};
  for (let i = 0; i < generators.length; i++) {
    const style2 = generators[i];
    if (style2 && style2.meta) {
      for (let j = 0; j < style2.meta.props.length; j++) {
        const prop = style2.meta.props[j];
        index[prop] = style2;
      }
    }
  }
  return index;
};
var sortStyles = (styles, variants) => {
  for (const key in variants) {
    const variant = variants[key];
    const style2 = styles[variant];
    if (!style2)
      continue;
    delete styles[variant];
    styles[variant] = style2;
  }
  return styles;
};
function compose(...generators) {
  let flatGenerators = [];
  generators.forEach((gen) => {
    warn(Boolean(gen), `Undefined generator in "compose" method`);
    if (!gen)
      return;
    if (gen.meta.generators) {
      flatGenerators = [...flatGenerators, ...gen.meta.generators];
    } else {
      flatGenerators.push(gen);
    }
  });
  const generatorsByProp = indexGeneratorsByProp(flatGenerators);
  const getStyle = (props2, sort = true) => {
    const styles = {};
    let merged;
    for (const key in props2) {
      const generator = generatorsByProp[key];
      if (generator) {
        const style2 = generator.meta.getStyle(props2, false);
        merge(styles, style2);
        merged = true;
      }
    }
    if (!merged || !sort)
      return styles;
    const medias = getCachedVariants(props2, getCache(props2.theme, "__states"));
    return sortStyles(styles, medias);
  };
  const props = [];
  const cssGetters = {};
  for (let i = 0; i < flatGenerators.length; i++) {
    const generator = flatGenerators[i];
    props.push(...generator.meta.props);
    Object.assign(cssGetters, generator.meta.cssGetters);
  }
  return createStyleGenerator({ getStyle, props, cssGetters, generators });
}
var getMixinFromCSSProperties = (properties) => (value) => {
  if (string(properties))
    return { [properties]: value };
  const style2 = {};
  for (const key in properties) {
    style2[properties[key]] = value;
  }
  return style2;
};
var getMixinFromCSSOption = (css3) => {
  if (func(css3))
    return css3;
  return getMixinFromCSSProperties(css3);
};
var dasherize = (key) => key.replace(/[A-Z]/g, "-$&").toLowerCase();
var style = ({
  prop,
  css: css3,
  themeGet,
  key,
  transform: transform2,
  cssProps: cssPropsOption
}) => {
  const getter = themeGet || (key || transform2 ? themeGetter({ key, transform: transform2 }) : void 0);
  const cssProps = cssPropsOption || (string(css3) ? [css3] : Array.isArray(css3) ? css3 : string(prop) ? [prop] : Array.isArray(prop) ? prop : []);
  if (Array.isArray(prop)) {
    const mixin2 = css3 ? getMixinFromCSSOption(css3) : css3;
    const generators2 = prop.map(
      (prop2) => style({ prop: prop2, css: mixin2, cssProps, themeGet: getter })
    );
    return compose(...generators2);
  }
  const props = [prop];
  const mixin = getMixinFromCSSOption(css3 || props);
  const generators = [];
  const getStyle = getStyleFactory(prop, mixin, getter);
  const cssGetters = getter ? cssProps.reduce((getters, cssProp) => {
    getters[dasherize(cssProp)] = getter;
    return getters;
  }, {}) : {};
  const generator = createStyleGenerator({ getStyle, props, cssGetters });
  generators.push(generator);
  return compose(...generators);
};
var getPx = themeGetter({
  name: "px",
  transform: (value, { props }) => {
    var _a, _b, _c;
    const rootFontSize = (_c = (_b = (_a = props == null ? void 0 : props.theme) == null ? void 0 : _a.settings) == null ? void 0 : _b.rootFontSize) != null ? _c : void 0;
    const num2 = Number(value);
    return px$1(rpx(Number.isNaN(num2) ? value : num2, { rootFontSize }));
  }
});
var getDuration = themeGetter({
  name: "duration",
  key: "durations",
  transform: (value) => {
    const num2 = Number(value);
    return ms(Number.isNaN(num2) ? value : num2);
  }
});
var getAngle = themeGetter({
  name: "angle",
  transform: (value) => {
    const num2 = Number(value);
    return deg(Number.isNaN(num2) ? value : num2);
  }
});
var getPercent = themeGetter({
  name: "percent",
  compose: getPx,
  transform: percent
});
var getTransition = themeGetter({
  name: "transition",
  key: "transitions"
});
var getTransitionProperty = themeGetter({
  name: "transitionProperty",
  key: "transitionProperties"
});
var getTimingFunction = themeGetter({
  name: "timingFunction",
  key: "timingFunctions"
});
var transition = style({
  prop: "transition",
  themeGet: getTransition
});
var transitionProperty = style({
  prop: "transitionProperty",
  themeGet: getTransitionProperty
});
var transitionDuration = style({
  prop: "transitionDuration",
  themeGet: getDuration
});
var transitionTimingFunction = style({
  prop: "transitionTimingFunction",
  themeGet: getTimingFunction
});
var transitionDelay = style({
  prop: "transitionDelay",
  themeGet: getDuration
});
var transitions$1 = compose(
  transition,
  transitionProperty,
  transitionDuration,
  transitionTimingFunction,
  transitionDelay
);
var getAnimation = themeGetter({
  name: "animation",
  key: "animations"
});
var animation = style({
  prop: "animation",
  themeGet: getAnimation
});
var animationDuration = style({
  prop: "animationDuration",
  themeGet: getDuration
});
var animationTimingFunction = style({
  prop: "animationTimingFunction",
  themeGet: getTimingFunction
});
var animations = compose(
  animation,
  animationDuration,
  animationTimingFunction
);
var getColor = themeGetter({
  name: "color",
  key: "colors"
});
var gradientBackgrounds = {
  "gradient-to-t": "linear-gradient(to top, var(--x-gradient-stops))",
  "gradient-to-tr": "linear-gradient(to top right, var(--x-gradient-stops))",
  "gradient-to-r": "linear-gradient(to right, var(--x-gradient-stops))",
  "gradient-to-br": "linear-gradient(to bottom right, var(--x-gradient-stops))",
  "gradient-to-b": "linear-gradient(to bottom, var(--x-gradient-stops))",
  "gradient-to-bl": "linear-gradient(to bottom left, var(--x-gradient-stops))",
  "gradient-to-l": "linear-gradient(to left, var(--x-gradient-stops))",
  "gradient-to-tl": "linear-gradient(to top left, var(--x-gradient-stops))"
};
var background = style({
  prop: "background",
  css: (value) => ({
    background: gradientBackgrounds[value] || value
  })
});
var backgroundColor = style({
  prop: ["backgroundColor", "bg"],
  css: "backgroundColor",
  themeGet: getColor
});
var backgroundImage = style({
  prop: "backgroundImage",
  css: (value) => ({
    backgroundImage: gradientBackgrounds[value] || value
  })
});
var backgroundSize = style({
  prop: "backgroundSize"
});
var backgroundPosition = style({
  prop: "backgroundPosition"
});
var backgroundRepeat = style({
  prop: "backgroundRepeat"
});
var backgroundAttachment = style({
  prop: "backgroundAttachment"
});
var backgroundClip = style({
  prop: "backgroundClip",
  css: ["backgroundClip", "-webkitBackgroundClip"]
});
var gradientFrom = style({
  prop: "gradientFrom",
  themeGet: getColor,
  css: (value) => {
    return {
      "--x-gradient-from": value,
      "--x-gradient-stops": "var(--x-gradient-from), var(--x-gradient-to, transparent)"
    };
  }
});
var gradientVia = style({
  prop: "gradientVia",
  themeGet: getColor,
  css: (value) => ({
    "--x-gradient-stops": `var(--x-gradient-from), ${value}, var(--x-gradient-to, transparent)`
  })
});
var gradientTo = style({
  prop: "gradientTo",
  themeGet: getColor,
  css: "--x-gradient-to"
});
var backgrounds = compose(
  background,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  backgroundAttachment,
  backgroundClip,
  gradientFrom,
  gradientVia,
  gradientTo
);
var getBorder = themeGetter({
  name: "border",
  key: "borders",
  transform: (value) => {
    const num2 = Number(value);
    return num2 > 0 ? `${px$1(num2)} solid` : value;
  }
});
var getBorderWidth = themeGetter({
  name: "borderWidth",
  key: "borderWidths",
  compose: getPx,
  shorthand: true
});
var getBorderColor = themeGetter({
  name: "borderColor",
  compose: getColor,
  shorthand: true
});
var getBorderStyle = themeGetter({
  name: "borderStyle",
  key: "borderStyles"
});
var border = style({
  prop: "border",
  themeGet: getBorder
});
var borderTop = style({
  prop: "borderTop",
  themeGet: getBorder
});
var borderRight = style({
  prop: "borderRight",
  themeGet: getBorder
});
var borderBottom = style({
  prop: "borderBottom",
  themeGet: getBorder
});
var borderLeft = style({
  prop: "borderLeft",
  themeGet: getBorder
});
var borderColor = style({
  prop: "borderColor",
  themeGet: getBorderColor
});
var borderTopColor = style({
  prop: "borderTopColor",
  themeGet: getColor
});
var borderRightColor = style({
  prop: "borderRightColor",
  themeGet: getColor
});
var borderBottomColor = style({
  prop: "borderBottomColor",
  themeGet: getColor
});
var borderLeftColor = style({
  prop: "borderLeftColor",
  themeGet: getColor
});
var borderWidth = style({
  prop: "borderWidth",
  themeGet: getBorderWidth
});
var borderTopWidth = style({
  prop: "borderTopWidth",
  themeGet: getBorderWidth
});
var borderRightWidth = style({
  prop: "borderRightWidth",
  themeGet: getBorderWidth
});
var borderBottomWidth = style({
  prop: "borderBottomWidth",
  themeGet: getBorderWidth
});
var borderLeftWidth = style({
  prop: "borderLeftWidth",
  themeGet: getBorderWidth
});
var borderStyle = style({
  prop: "borderStyle",
  themeGet: getBorderStyle,
  cssProps: [
    "borderStyle",
    "borderTopStyle",
    "borderRightStyle",
    "borderBottomStyle",
    "borderLeftStyle"
  ]
});
var borderTopStyle = style({
  prop: "borderTopStyle",
  themeGet: getBorderStyle
});
var borderRightStyle = style({
  prop: "borderRightStyle",
  themeGet: getBorderStyle
});
var borderBottomStyle = style({
  prop: "borderBottomStyle",
  themeGet: getBorderStyle
});
var borderLeftStyle = style({
  prop: "borderLeftStyle",
  themeGet: getBorderStyle
});
var outline = style({
  prop: "outline",
  themeGet: getBorder
});
var outlineColor = style({
  prop: "outlineColor",
  themeGet: getColor
});
var outlineWidth = style({
  prop: "outlineWidth",
  themeGet: getBorderWidth
});
var outlineStyle = style({
  prop: "outlineStyle",
  themeGet: getBorderStyle
});
var outlineOffset = style({
  prop: "outlineOffset",
  themeGet: getBorderWidth
});
var getRadius = themeGetter({
  name: "radius",
  key: "radii",
  compose: getPx,
  shorthand: true
});
var borderRadius = style({
  prop: "borderRadius",
  themeGet: getRadius,
  cssProps: [
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomRightRadius",
    "borderBottomLeftRadius"
  ]
});
var divideSelector = `& > :not([hidden]) ~ :not([hidden])`;
var divideY = style({
  prop: "divideY",
  themeGet: getBorderWidth,
  css: (value) => {
    const v = value === true ? 1 : value;
    return {
      [divideSelector]: {
        "--x-divide-y-reverse": 0,
        borderTopWidth: `calc(${v} * calc(1 - var(--x-divide-y-reverse)))`,
        borderBottomWidth: `calc(${v} * var(--x-divide-y-reverse))`
      }
    };
  }
});
var divideX = style({
  prop: "divideX",
  themeGet: getBorderWidth,
  css: (value) => {
    const v = value === true ? 1 : value;
    return {
      [divideSelector]: {
        "--x-divide-x-reverse": 0,
        borderRightWidth: `calc(${v} * var(--x-divide-x-reverse))`,
        borderLeftWidth: `calc(${v} * calc(1 - var(--x-divide-x-reverse)))`
      }
    };
  }
});
var divideXReverse = style({
  prop: "divideXReverse",
  css: () => ({
    [divideSelector]: {
      "--x-divide-x-reverse": "1"
    }
  })
});
var divideYReverse = style({
  prop: "divideYReverse",
  css: () => ({
    [divideSelector]: {
      "--x-divide-y-reverse": "1"
    }
  })
});
var divideColor = style({
  prop: "divideColor",
  themeGet: getColor,
  css: (value) => ({
    [divideSelector]: {
      borderColor: value
    }
  })
});
var divideStyle = style({
  prop: "divideStyle",
  themeGet: getBorderStyle,
  css: (value) => ({
    [divideSelector]: {
      borderStyle: value
    }
  })
});
var getRingWidth = themeGetter({
  name: "ringWidth",
  key: "ringWidths",
  compose: getPx
});
var ring = style({
  prop: "ring",
  themeGet: getRingWidth,
  css: (value) => ({
    "--x-ring-shadow": `var(--x-ring-inset, /*!*/ /*!*/) 0 0 0 ${value} var(--x-ring-color)`,
    boxShadow: "var(--x-ring-shadow, 0 0 #0000), var(--x-shadow, 0 0 #0000)"
  })
});
var ringInset = style({
  prop: "ringInset",
  css: () => ({ "--x-ring-inset": "inset" })
});
var ringColor = style({
  prop: "ringColor",
  themeGet: getColor,
  css: (value) => ({ "--x-ring-color": value })
});
var borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderWidth,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderStyle,
  borderTopStyle,
  borderRightStyle,
  borderBottomStyle,
  borderLeftStyle,
  borderRadius,
  outline,
  outlineColor,
  outlineWidth,
  outlineStyle,
  outlineOffset,
  divideX,
  divideY,
  divideXReverse,
  divideYReverse,
  divideColor,
  divideStyle,
  ring,
  ringInset,
  ringColor
);
var getShadow = themeGetter({
  name: "shadow",
  key: "shadows",
  multiple: true
});
var opacity = style({
  prop: "opacity"
});
var boxShadow = style({
  prop: "boxShadow",
  themeGet: getShadow,
  css: (value) => ({
    "--x-shadow": value,
    boxShadow: "var(--x-ring-shadow, 0 0 #0000), var(--x-shadow)"
  })
});
var textShadow = style({
  prop: "textShadow",
  themeGet: getShadow
});
var effects = compose(opacity, boxShadow, textShadow);
var __defProp$4 = Object.defineProperty;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj2, key, value) => key in obj2 ? __defProp$4(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var row = style({
  prop: "row",
  css: () => ({
    boxSizing: "border-box",
    flexGrow: 1,
    flexWrap: "wrap",
    display: "flex"
  })
});
var getColStyle = (props, size) => {
  if (!is(size))
    return null;
  if (size === true) {
    return {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: "100%"
    };
  }
  if (size === "auto") {
    return {
      flex: `0 0 auto`,
      maxWidth: "none",
      width: "auto"
    };
  }
  const sizeWidth = getPercent(size)(props);
  return {
    flex: `0 0 ${sizeWidth}`,
    maxWidth: sizeWidth
  };
};
var col = createStyleGenerator({
  getStyle: (props) => {
    const value = props.col;
    const common = {
      boxSizing: "border-box",
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: "100%"
    };
    if (obj(value)) {
      const breakpointsStyle = reduceVariants(
        props,
        value,
        (v) => getColStyle(props, v)
      );
      return __spreadValues$4(__spreadValues$4({}, common), breakpointsStyle);
    }
    return __spreadValues$4(__spreadValues$4({}, common), getColStyle(props, value));
  },
  props: ["col"]
});
var flexboxGrids = compose(row, col);
var __defProp$3 = Object.defineProperty;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj2, key, value) => key in obj2 ? __defProp$3(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var display = style({
  prop: "display"
});
var float = style({
  prop: "float"
});
var boxSizing = style({
  prop: "boxSizing"
});
var container = createStyleGenerator({
  getStyle: (props) => {
    if (!props.container)
      return null;
    const breakpoints = getScreens(props);
    let styles = reduceVariants(
      props,
      breakpoints,
      (v) => v !== 0 ? { maxWidth: v } : {}
    );
    if (obj(props.container)) {
      styles = reduceVariants(props, props.container, () => styles);
    }
    return __spreadValues$3({
      width: "100%"
    }, styles);
  },
  props: ["container"]
});
var overflow = style({
  prop: "overflow"
});
var overflowX = style({
  prop: "overflowX"
});
var overflowY = style({
  prop: "overflowY"
});
var getZIndex = themeGetter({
  name: "zIndex",
  key: "zIndices"
});
var zIndex = style({
  prop: "zIndex",
  themeGet: getZIndex
});
var position = style({
  prop: "position"
});
var getInset = themeGetter({
  name: "inset",
  key: "inset",
  compose: getPx,
  transform: transformNegative
});
var top = style({
  prop: "top",
  themeGet: getInset
});
var right = style({
  prop: "right",
  themeGet: getInset
});
var bottom = style({
  prop: "bottom",
  themeGet: getInset
});
var left = style({
  prop: "left",
  themeGet: getInset
});
var visibility = style({
  prop: "visibility"
});
var overscrollBehavior = style({
  prop: "overscrollBehavior"
});
var objectFit = style({
  prop: "objectFit"
});
var layout = compose(
  boxSizing,
  display,
  float,
  container,
  overflow,
  overflowX,
  overflowY,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  visibility,
  overscrollBehavior,
  objectFit
);
var alignItems = style({
  prop: "alignItems"
});
var alignContent = style({
  prop: "alignContent"
});
var justifyContent = style({
  prop: "justifyContent"
});
var justifyItems = style({
  prop: "justifyItems"
});
var flexWrap = style({
  prop: "flexWrap"
});
var flexGrow = style({
  prop: "flexGrow"
});
var flexShrink = style({
  prop: "flexShrink"
});
var flexBasis = style({
  prop: "flexBasis",
  themeGet: getPercent
});
var flexDirection = style({
  prop: "flexDirection"
});
var flex = style({
  prop: "flex"
});
var justifySelf = style({
  prop: "justifySelf"
});
var alignSelf = style({
  prop: "alignSelf"
});
var order = style({
  prop: "order"
});
var flexboxes = compose(
  display,
  alignItems,
  alignContent,
  justifyContent,
  justifyItems,
  flexWrap,
  flexBasis,
  flexShrink,
  flexGrow,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order
);
var getSpace = themeGetter({
  name: "space",
  key: "space",
  compose: getPx,
  shorthand: true,
  transform: transformNegative
});
var margin = style({
  prop: ["margin", "m"],
  themeGet: getSpace,
  css: "margin"
});
var marginTop = style({
  prop: ["marginTop", "mt"],
  themeGet: getSpace,
  css: "marginTop"
});
var marginRight = style({
  prop: ["marginRight", "mr"],
  themeGet: getSpace,
  css: "marginRight"
});
var marginBottom = style({
  prop: ["marginBottom", "mb"],
  themeGet: getSpace,
  css: "marginBottom"
});
var marginLeft = style({
  prop: ["marginLeft", "ml"],
  themeGet: getSpace,
  css: "marginLeft"
});
var mx = style({
  prop: "mx",
  themeGet: getSpace,
  css: ["marginRight", "marginLeft"]
});
var my = style({
  prop: "my",
  themeGet: getSpace,
  css: ["marginTop", "marginBottom"]
});
var padding = style({
  prop: ["padding", "p"],
  themeGet: getSpace,
  css: "padding"
});
var paddingTop = style({
  prop: ["paddingTop", "pt"],
  themeGet: getSpace,
  css: "paddingTop"
});
var paddingRight = style({
  prop: ["paddingRight", "pr"],
  themeGet: getSpace,
  css: "paddingRight"
});
var paddingBottom = style({
  prop: ["paddingBottom", "pb"],
  themeGet: getSpace,
  css: "paddingBottom"
});
var paddingLeft = style({
  prop: ["paddingLeft", "pl"],
  themeGet: getSpace,
  css: "paddingLeft"
});
var px = style({
  prop: "px",
  themeGet: getSpace,
  css: ["paddingRight", "paddingLeft"]
});
var py = style({
  prop: "py",
  themeGet: getSpace,
  css: ["paddingTop", "paddingBottom"]
});
var spaceY = style({
  prop: "spaceY",
  themeGet: getSpace,
  css: (value) => ({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--x-space-y-reverse": 0,
      marginTop: `calc(${value} * calc(1 - var(--x-space-y-reverse)))`,
      marginBottom: `calc(${value} * var(--x-space-y-reverse))`
    }
  })
});
var spaceX = style({
  prop: "spaceX",
  themeGet: getSpace,
  css: (value) => ({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--x-space-x-reverse": 0,
      marginRight: `calc(${value} * var(--x-space-x-reverse))`,
      marginLeft: `calc(${value} * calc(1 - var(--x-space-x-reverse)))`
    }
  })
});
var spaceXReverse = style({
  prop: "spaceXReverse",
  css: () => ({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--x-space-x-reverse": "1"
    }
  })
});
var spaceYReverse = style({
  prop: "spaceYReverse",
  css: () => ({
    "& > :not([hidden]) ~ :not([hidden])": {
      "--x-space-y-reverse": "1"
    }
  })
});
var space$1 = compose(
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  mx,
  my,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  px,
  py,
  spaceX,
  spaceY,
  spaceXReverse,
  spaceYReverse
);
var gap = style({
  prop: "gap",
  themeGet: getSpace
});
var columnGap = style({
  prop: "columnGap",
  themeGet: getSpace
});
var rowGap = style({
  prop: "rowGap",
  themeGet: getSpace
});
var gridColumn = style({
  prop: "gridColumn"
});
var gridRow = style({
  prop: "gridRow"
});
var gridAutoFlow = style({
  prop: "gridAutoFlow"
});
var gridAutoColumns = style({
  prop: "gridAutoColumns"
});
var gridAutoRows = style({
  prop: "gridAutoRows"
});
var gridTemplateColumns = style({
  prop: "gridTemplateColumns",
  key: "gridTemplateColumns"
});
var gridTemplateRows = style({
  prop: "gridTemplateRows",
  key: "gridTemplateRows"
});
var gridTemplateAreas = style({
  prop: "gridTemplateAreas"
});
var gridArea = style({
  prop: "gridArea"
});
var grids = compose(
  gap,
  columnGap,
  rowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea
);
var appearance = style({
  prop: "appearance"
});
var cursor = style({
  prop: "cursor"
});
var pointerEvents = style({
  prop: "pointerEvents"
});
var resize = style({
  prop: "resize"
});
var userSelect = style({
  prop: "userSelect"
});
var interactivity = compose(
  appearance,
  cursor,
  pointerEvents,
  resize,
  userSelect
);
var getSize = themeGetter({
  name: "size",
  key: "sizes",
  compose: getPercent
});
var width = style({
  prop: "w",
  themeGet: getSize,
  css: "width"
});
var height = style({
  prop: "h",
  themeGet: getSize,
  css: "height"
});
var maxWidth = style({
  prop: ["maxWidth", "maxW"],
  themeGet: getSize,
  css: "maxWidth"
});
var maxHeight = style({
  prop: ["maxHeight", "maxH"],
  themeGet: getSize,
  css: "maxHeight"
});
var minWidth = style({
  prop: ["minWidth", "minW"],
  themeGet: getSize,
  css: "minWidth"
});
var minHeight = style({
  prop: ["minHeight", "minH"],
  themeGet: getSize,
  css: "minHeight"
});
var maskSize = style({
  prop: "maskSize",
  themeGet: themeGetter({
    name: "size",
    key: "sizes",
    compose: getPercent,
    multiple: true,
    shorthand: true
  })
});
var sizing = compose(
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  maskSize
);
var fill = style({
  prop: "fill",
  themeGet: getColor
});
var stroke = style({
  prop: "stroke",
  themeGet: getColor
});
var svg = compose(fill, stroke);
var borderCollapse = style({
  prop: "borderCollapse"
});
var tableLayout = style({
  prop: "tableLayout"
});
var tables = compose(borderCollapse, tableLayout);
var getTransform = themeGetter({
  name: "transform",
  key: "transforms"
});
var transform = style({
  prop: "transform",
  themeGet: getTransform,
  css: (value) => {
    if (value === true) {
      return {
        "--x-translate-x": 0,
        "--x-translate-y": 0,
        "--x-rotate": 0,
        "--x-skew-x": 0,
        "--x-skew-y": 0,
        "--x-scale-x": "1",
        "--x-scale-y": "1",
        transform: "translate3d(var(--x-translate-x), var(--x-translate-y), 0) rotate(var(--x-rotate)) skewX(var(--x-skew-x)) skewY(var(--x-skew-y)) scaleX(var(--x-scale-x)) scaleY(var(--x-scale-y))"
      };
    }
    return { transform: value };
  }
});
var transformOrigin = style({
  prop: "transformOrigin"
});
var translateX = style({
  prop: "translateX",
  themeGet: getSpace,
  css: "--x-translate-x"
});
var translateY = style({
  prop: "translateY",
  themeGet: getSpace,
  css: "--x-translate-y"
});
var rotate = style({
  prop: "rotate",
  themeGet: getAngle,
  css: "--x-rotate"
});
var skewX = style({
  prop: "skewX",
  themeGet: getAngle,
  css: "--x-skew-x"
});
var skewY = style({
  prop: "skewY",
  themeGet: getAngle,
  css: "--x-skew-y"
});
var scale = style({
  prop: "scale",
  transform: (v) => String(v),
  css: ["--x-scale-x", "--x-scale-y"]
});
var scaleX = style({
  prop: "scaleX",
  transform: (v) => String(v),
  css: "--x-scale-x"
});
var scaleY = style({
  prop: "scaleY",
  transform: (v) => String(v),
  css: "--x-scale-y"
});
var transforms = compose(
  transform,
  transformOrigin,
  translateX,
  translateY,
  rotate,
  skewX,
  skewY,
  scale,
  scaleX,
  scaleY
);
var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj2, key, value) => key in obj2 ? __defProp$2(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var getFont = themeGetter({ name: "font", key: "fonts" });
var getLineHeight = themeGetter({
  name: "lineHeight",
  key: "lineHeights",
  transform: (value, { props }) => {
    var _a, _b, _c;
    const rootFontSize = (_c = (_b = (_a = props == null ? void 0 : props.theme) == null ? void 0 : _a.settings) == null ? void 0 : _b.rootFontSize) != null ? _c : void 0;
    return rpx(value, { rootFontSize });
  }
});
var getFontWeight = themeGetter({
  name: "fontWeight",
  key: "fontWeights"
});
var getLetterSpacing = themeGetter({
  name: "letterSpacing",
  key: "letterSpacings",
  compose: getPx
});
var getFontSize = themeGetter({
  name: "fontSize",
  key: "fontSizes",
  compose: getPx
});
var fontFamily = style({
  prop: "fontFamily",
  themeGet: getFont
});
var fontSize = style({
  prop: "fontSize",
  themeGet: getFontSize
});
var lineHeight = style({
  prop: "lineHeight",
  themeGet: getLineHeight
});
var fontWeight = style({
  prop: "fontWeight",
  themeGet: getFontWeight
});
var fontStyle = style({
  prop: "fontStyle"
});
var letterSpacing = style({
  prop: "letterSpacing",
  themeGet: getLetterSpacing
});
var color = style({
  prop: "color",
  themeGet: getColor
});
var textTransform = style({
  prop: "textTransform"
});
var textDecoration = style({
  prop: "textDecoration"
});
var textAlign = style({
  prop: "textAlign"
});
var verticalAlign = style({
  prop: "verticalAlign"
});
var whiteSpace = style({
  prop: "whiteSpace"
});
var textOverflow = style({
  prop: "textOverflow"
});
var listStyleType = style({
  prop: "listStyleType"
});
var listStylePosition = style({
  prop: "listStylePosition"
});
var all = compose(
  space$1,
  fontFamily,
  fontSize,
  fontStyle,
  lineHeight,
  fontWeight,
  textAlign,
  letterSpacing,
  color,
  textTransform,
  textDecoration,
  verticalAlign,
  whiteSpace,
  textOverflow,
  listStyleType,
  listStylePosition
);
var text = style({
  prop: "text",
  key: "texts",
  css: (value) => ({ theme }) => all(__spreadProps$1(__spreadValues$2({}, value), { theme }))
});
var typography = compose(all, text);
var system = compose(
  animations,
  backgrounds,
  borders,
  effects,
  flexboxGrids,
  flexboxes,
  grids,
  interactivity,
  layout,
  sizing,
  space$1,
  svg,
  tables,
  transforms,
  transitions$1,
  typography
);
var th = (path, defaultValue) => (props) => {
  const value = getThemeValue(props, path);
  if (is(value))
    return value;
  if (is(defaultValue))
    return defaultValue;
  return path;
};
[
  getAngle,
  getAnimation,
  getBorder,
  getBorderColor,
  getBorderStyle,
  getBorderWidth,
  getColor,
  getDuration,
  getFont,
  getFontSize,
  getFontWeight,
  getInset,
  getLetterSpacing,
  getLineHeight,
  getPercent,
  getPx,
  getRadius,
  getRingWidth,
  getShadow,
  getSize,
  getSpace,
  getTimingFunction,
  getTransform,
  getTransition,
  getTransitionProperty,
  getZIndex
].forEach((themeGetter2) => {
  th[themeGetter2.meta.name] = themeGetter2;
});
var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj2, key, value) => key in obj2 ? __defProp$1(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var defaultAlphaVariants = [
  0,
  5,
  10,
  20,
  25,
  30,
  40,
  50,
  60,
  70,
  75,
  80,
  90,
  95,
  100
];
var generateHexAlphaVariants = (colors2, variants = defaultAlphaVariants) => {
  const transform2 = (value, variant) => `${value}${Math.round(variant / 100 * 255).toString(16).padStart(2, "0")}`;
  const alphaColors = Object.keys(colors2).reduce((obj2, key) => {
    variants.forEach((variant) => {
      const value = colors2[key];
      const variantKey = `${key}-a${variant}`;
      obj2[variantKey] = string(value) ? transform2(value, variant) : generateHexAlphaVariants(value, variants);
    });
    return obj2;
  }, {});
  return __spreadValues$1(__spreadValues$1({}, colors2), alphaColors);
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var space = {
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem"
};
var timingFunctions = {
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var transitionProperties = {
  default: [
    "background-color",
    "border-color",
    "color",
    "fill",
    "stroke",
    "opacity",
    "box-shadow",
    "transform"
  ],
  colors: ["background-color", "border-color", "color", "fill", "stroke"],
  opacity: ["opacity"],
  shadow: ["box-shadow"],
  transform: ["transform"]
};
var transitions = Object.keys(
  transitionProperties
).reduce((obj2, key) => {
  obj2[key] = transitionProperties[key].map((property) => `${property} ${timingFunctions["ease-in-out"]} 150ms`).join(",");
  return obj2;
}, {});
var colors = {
  black: "#000000",
  white: "#ffffff",
  "blue-gray-50": "#f8fafc",
  "blue-gray-100": "#f1f5f9",
  "blue-gray-200": "#e2e8f0",
  "blue-gray-300": "#cbd5e1",
  "blue-gray-400": "#94a3b8",
  "blue-gray-500": "#64748b",
  "blue-gray-600": "#475569",
  "blue-gray-700": "#334155",
  "blue-gray-800": "#1e293b",
  "blue-gray-900": "#0f172a",
  "cool-gray-50": "#f9fafb",
  "cool-gray-100": "#f3f4f6",
  "cool-gray-200": "#e5e7eb",
  "cool-gray-300": "#d1d5db",
  "cool-gray-400": "#9ca3af",
  "cool-gray-500": "#6b7280",
  "cool-gray-600": "#4b5563",
  "cool-gray-700": "#374151",
  "cool-gray-800": "#1f2937",
  "cool-gray-900": "#111827",
  "gray-50": "#fafafa",
  "gray-100": "#f4f4f5",
  "gray-200": "#e4e4e7",
  "gray-300": "#d4d4d8",
  "gray-400": "#a1a1aa",
  "gray-500": "#71717a",
  "gray-600": "#52525b",
  "gray-700": "#3f3f46",
  "gray-800": "#27272a",
  "gray-900": "#18181b",
  "true-gray-50": "#fafafa",
  "true-gray-100": "#f5f5f5",
  "true-gray-200": "#e5e5e5",
  "true-gray-300": "#d4d4d4",
  "true-gray-400": "#a3a3a3",
  "true-gray-500": "#737373",
  "true-gray-600": "#525252",
  "true-gray-700": "#404040",
  "true-gray-800": "#262626",
  "true-gray-900": "#171717",
  "warm-gray-50": "#fafaf9",
  "warm-gray-100": "#f5f5f4",
  "warm-gray-200": "#e7e5e4",
  "warm-gray-300": "#d6d3d1",
  "warm-gray-400": "#a8a29e",
  "warm-gray-500": "#78716c",
  "warm-gray-600": "#57534e",
  "warm-gray-700": "#44403c",
  "warm-gray-800": "#292524",
  "warm-gray-900": "#1c1917",
  "red-50": "#fef2f2",
  "red-100": "#fee2e2",
  "red-200": "#fecaca",
  "red-300": "#fca5a5",
  "red-400": "#f87171",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "red-700": "#b91c1c",
  "red-800": "#991b1b",
  "red-900": "#7f1d1d",
  "orange-50": "#fff7ed",
  "orange-100": "#ffedd5",
  "orange-200": "#fed7aa",
  "orange-300": "#fdba74",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "orange-800": "#9a3412",
  "orange-900": "#7c2d12",
  "amber-50": "#fffbeb",
  "amber-100": "#fef3c7",
  "amber-200": "#fde68a",
  "amber-300": "#fcd34d",
  "amber-400": "#fbbf24",
  "amber-500": "#f59e0b",
  "amber-600": "#d97706",
  "amber-700": "#b45309",
  "amber-800": "#92400e",
  "amber-900": "#78350f",
  "yellow-50": "#fefce8",
  "yellow-100": "#fef9c3",
  "yellow-200": "#fef08a",
  "yellow-300": "#fde047",
  "yellow-400": "#facc15",
  "yellow-500": "#eab308",
  "yellow-600": "#ca8a04",
  "yellow-700": "#a16207",
  "yellow-800": "#854d0e",
  "yellow-900": "#713f12",
  "lime-50": "#f7fee7",
  "lime-100": "#ecfccb",
  "lime-200": "#d9f99d",
  "lime-300": "#bef264",
  "lime-400": "#a3e635",
  "lime-500": "#84cc16",
  "lime-600": "#65a30d",
  "lime-700": "#4d7c0f",
  "lime-800": "#3f6212",
  "lime-900": "#365314",
  "green-50": "#f0fdf4",
  "green-100": "#dcfce7",
  "green-200": "#bbf7d0",
  "green-300": "#86efac",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "green-800": "#166534",
  "green-900": "#14532d",
  "emerald-50": "#ecfdf5",
  "emerald-100": "#d1fae5",
  "emerald-200": "#a7f3d0",
  "emerald-300": "#6ee7b7",
  "emerald-400": "#34d399",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "emerald-700": "#047857",
  "emerald-800": "#065f46",
  "emerald-900": "#064e3b",
  "teal-50": "#f0fdfa",
  "teal-100": "#ccfbf1",
  "teal-200": "#99f6e4",
  "teal-300": "#5eead4",
  "teal-400": "#2dd4bf",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "teal-700": "#0f766e",
  "teal-800": "#115e59",
  "teal-900": "#134e4a",
  "cyan-50": "#ecfeff",
  "cyan-100": "#cffafe",
  "cyan-200": "#a5f3fc",
  "cyan-300": "#67e8f9",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "cyan-600": "#0891b2",
  "cyan-700": "#0e7490",
  "cyan-800": "#155e75",
  "cyan-900": "#164e63",
  "light-blue-50": "#f0f9ff",
  "light-blue-100": "#e0f2fe",
  "light-blue-200": "#bae6fd",
  "light-blue-300": "#7dd3fc",
  "light-blue-400": "#38bdf8",
  "light-blue-500": "#0ea5e9",
  "light-blue-600": "#0284c7",
  "light-blue-700": "#0369a1",
  "light-blue-800": "#075985",
  "light-blue-900": "#0c4a6e",
  "blue-50": "#eff6ff",
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "blue-300": "#93c5fd",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "blue-900": "#1e3a8a",
  "indigo-50": "#eef2ff",
  "indigo-100": "#e0e7ff",
  "indigo-200": "#c7d2fe",
  "indigo-300": "#a5b4fc",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "indigo-700": "#4338ca",
  "indigo-800": "#3730a3",
  "indigo-900": "#312e81",
  "violet-50": "#f5f3ff",
  "violet-100": "#ede9fe",
  "violet-200": "#ddd6fe",
  "violet-300": "#c4b5fd",
  "violet-400": "#a78bfa",
  "violet-500": "#8b5cf6",
  "violet-600": "#7c3aed",
  "violet-700": "#6d28d9",
  "violet-800": "#5b21b6",
  "violet-900": "#4c1d95",
  "purple-50": "#faf5ff",
  "purple-100": "#f3e8ff",
  "purple-200": "#e9d5ff",
  "purple-300": "#d8b4fe",
  "purple-400": "#c084fc",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7e22ce",
  "purple-800": "#6b21a8",
  "purple-900": "#581c87",
  "fuchsia-50": "#fdf4ff",
  "fuchsia-100": "#fae8ff",
  "fuchsia-200": "#f5d0fe",
  "fuchsia-300": "#f0abfc",
  "fuchsia-400": "#e879f9",
  "fuchsia-500": "#d946ef",
  "fuchsia-600": "#c026d3",
  "fuchsia-700": "#a21caf",
  "fuchsia-800": "#86198f",
  "fuchsia-900": "#701a75",
  "pink-50": "#fdf2f8",
  "pink-100": "#fce7f3",
  "pink-200": "#fbcfe8",
  "pink-300": "#f9a8d4",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
  "pink-700": "#be185d",
  "pink-800": "#9d174d",
  "pink-900": "#831843",
  "rose-50": "#fff1f2",
  "rose-100": "#ffe4e6",
  "rose-200": "#fecdd3",
  "rose-300": "#fda4af",
  "rose-400": "#fb7185",
  "rose-500": "#f43f5e",
  "rose-600": "#e11d48",
  "rose-700": "#be123c",
  "rose-800": "#9f1239",
  "rose-900": "#881337"
};
var fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  default: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem"
};
var texts = Object.keys(fontSizes).reduce(
  (texts2, key) => {
    texts2[key] = { fontSize: key, lineHeight: key };
    return texts2;
  },
  {}
);
var defaultTheme = {
  colors: generateHexAlphaVariants(colors),
  space,
  screens: {
    _: 0,
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  },
  durations: {
    instant: "100ms",
    "fast-in": "250ms",
    "fast-out": "200ms",
    "slow-in": "300ms",
    "slow-out": "250ms"
  },
  sizes: __spreadProps(__spreadValues({}, space), {
    0.5: void 0,
    1: void 0,
    "0.5s": space[0.5],
    "1s": space[1],
    full: "100%",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem"
  }),
  radii: {
    none: "0",
    sm: "0.125rem",
    default: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px"
  },
  shadows: {
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.5)"
  },
  fontSizes,
  fontWeights: {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  fonts: {
    mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
    serif: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
    sans: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    xs: "1rem",
    sm: "1.25rem",
    default: "1.5rem",
    lg: "1.75rem",
    xl: "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "4xl": "2.5rem",
    "5xl": 1,
    "6xl": 1,
    "7xl": 1,
    "8xl": 1,
    "9xl": 1
  },
  gridTemplateColumns: {
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    5: "repeat(5, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))",
    7: "repeat(7, minmax(0, 1fr))",
    8: "repeat(8, minmax(0, 1fr))",
    9: "repeat(9, minmax(0, 1fr))",
    10: "repeat(10, minmax(0, 1fr))",
    11: "repeat(11, minmax(0, 1fr))",
    12: "repeat(12, minmax(0, 1fr))"
  },
  gridTemplateRows: {
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    5: "repeat(5, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))"
  },
  borderWidths: {
    default: 1
  },
  ringWidths: {
    default: 3
  },
  borders: {
    default: "1px solid transparent"
  },
  texts,
  transitions,
  transitionProperties,
  timingFunctions,
  animations: {
    spin: "x-spin 1s linear infinite",
    ping: "x-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "x-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "x-bounce 1s infinite"
  },
  states: {
    _: null,
    motionSafe: "@media (prefers-reduced-motion: no-preference)",
    motionReduce: "@media (prefers-reduced-motion: reduce)",
    first: "&:first-child",
    last: "&:last-child",
    odd: "&:odd",
    even: "&:even",
    visited: "&:visited",
    checked: "&:checked",
    focusWithin: "&:focus-within",
    hover: "&:hover",
    focus: "&:focus",
    focusVisible: "&:focus-visible",
    active: "&:active",
    disabled: "&:disabled, &[aria-disabled=true]",
    placeholder: "&::placeholder"
  },
  xstyled: {
    cache: true
  }
};

// ../../../../../Users/z/.yarn/berry/cache/@xstyled-core-npm-3.7.0-1d4c584725-9.zip/node_modules/@xstyled/core/dist/index.mjs
var join = (...args) => args.filter(Boolean).join(".");
var toVarName = (key) => `--${key.replace(/\./g, "-")}`;
var toVarValue = (key, value) => `var(${toVarName(key)}, ${value})`;
var toProp = (key, value) => `${key}: ${value};`;
function toCustomPropertiesReferences(values, theme, keys = Object.keys(values), parent) {
  const next = Array.isArray(values) ? [] : {};
  for (const i in keys) {
    const key = keys[i];
    const value = values[key];
    const name = join(parent, key);
    if (obj(value)) {
      next[key] = toCustomPropertiesReferences(
        value,
        theme,
        Object.keys(value),
        name
      );
      continue;
    }
    if (string(value)) {
      next[key] = toVarValue(name, value);
      continue;
    }
    if (func(value)) {
      next[key] = toVarValue(name, cascade(value, { theme }));
      continue;
    }
  }
  return next;
}
function toCustomPropertiesDeclarations(values, theme, keys = Object.keys(values), parent, state = { value: "" }) {
  for (const i in keys) {
    const key = keys[i];
    const value = values[key];
    const name = join(parent, key);
    if (obj(value)) {
      toCustomPropertiesDeclarations(
        value,
        theme,
        Object.keys(value),
        name,
        state
      );
      continue;
    }
    if (string(value)) {
      state.value += toProp(toVarName(name), value);
      continue;
    }
    if (func(value)) {
      state.value += toProp(toVarName(name), cascade(value, { theme }));
      continue;
    }
  }
  return state.value;
}
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj2, key, value) => key in obj2 ? __defProp2(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var STORAGE_KEY = "xstyled-color-mode";
var isLocalStorageAvailable = typeof window !== "undefined" && (() => {
  try {
    const key = "xstyled-test-key";
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
})();
var storage = isLocalStorageAvailable ? {
  get: () => window.localStorage.getItem(STORAGE_KEY),
  set: (value) => {
    window.localStorage.setItem(STORAGE_KEY, value);
  },
  clear: () => window.localStorage.removeItem(STORAGE_KEY)
} : {
  get: () => null,
  set: () => {
  },
  clear: () => {
  }
};
var COLOR_MODE_CLASS_PREFIX = "xstyled-color-mode-";
var getColorModeClassName = (mode) => `${COLOR_MODE_CLASS_PREFIX}${mode}`;
var XSTYLED_COLORS_PREFIX = "xstyled-colors";
var SYSTEM_MODES = ["light", "dark"];
function getModeTheme(theme, mode) {
  return __spreadProps2(__spreadValues2({}, theme), {
    colors: __spreadValues2(__spreadValues2({}, theme.colors), theme.colors.modes[mode])
  });
}
var getMediaQuery = (query) => `@media ${query}`;
var getColorModeQuery = (mode) => `(prefers-color-scheme: ${mode})`;
function checkHasColorModes(theme) {
  return Boolean(theme && theme.colors && theme.colors.modes);
}
function checkHasCustomPropertiesEnabled(theme) {
  return Boolean(
    theme && (theme.useCustomProperties === void 0 || theme.useCustomProperties)
  );
}
function checkHasMediaQueryEnabled(theme) {
  return Boolean(
    theme && (theme.useColorSchemeMediaQuery === void 0 || theme.useColorSchemeMediaQuery)
  );
}
function getInitialColorModeName(theme) {
  return theme.initialColorModeName || "default";
}
function getDefaultColorModeName(theme) {
  return theme.defaultColorModeName || getInitialColorModeName(theme);
}
function getUsedColorKeys(modes) {
  let keys = [];
  for (const key in modes) {
    keys = [...keys, ...Object.keys(modes[key])];
  }
  return keys;
}
function createColorStyles(theme, { targetSelector = "body" } = {}) {
  if (!checkHasColorModes(theme))
    return null;
  const _a = theme.colors, { modes } = _a, colors2 = __objRest(_a, ["modes"]);
  const colorKeys = getUsedColorKeys(modes);
  let styles = toCustomPropertiesDeclarations(
    colors2,
    theme,
    colorKeys,
    XSTYLED_COLORS_PREFIX
  );
  function getModePropertiesDeclarations(mode) {
    const modeTheme = getModeTheme(theme, mode);
    const _a2 = modeTheme.colors, { modes: modes2 } = _a2, colors22 = __objRest(_a2, ["modes"]);
    return toCustomPropertiesDeclarations(
      __spreadValues2(__spreadValues2({}, colors22), modes2[mode]),
      modeTheme,
      colorKeys,
      XSTYLED_COLORS_PREFIX
    );
  }
  if (theme.useColorSchemeMediaQuery !== false) {
    SYSTEM_MODES.forEach((mode) => {
      if (modes[mode]) {
        const mediaQuery = getMediaQuery(getColorModeQuery(mode));
        styles += `${mediaQuery}{${getModePropertiesDeclarations(mode)}}`;
      }
    });
  }
  const initialModeName = getInitialColorModeName(theme);
  [initialModeName, ...Object.keys(modes)].forEach((mode) => {
    const key = `&.${getColorModeClassName(mode)}`;
    styles += `${key}{${getModePropertiesDeclarations(mode)}}`;
  });
  return `${targetSelector}{${styles}}`;
}
function getSystemModeMql(mode) {
  if (typeof window === "undefined" || window.matchMedia === void 0) {
    return null;
  }
  const query = getColorModeQuery(mode);
  return window.matchMedia(query);
}
function useSystemMode(theme) {
  const configs = useMemo(() => {
    if (!checkHasMediaQueryEnabled(theme))
      return [];
    return SYSTEM_MODES.map((mode) => {
      if (!checkHasColorModes(theme))
        return null;
      if (!theme.colors.modes[mode])
        return null;
      const mql = getSystemModeMql(mode);
      return mql ? { mode, mql } : null;
    }).filter(Boolean);
  }, [theme]);
  const [systemMode, setSystemMode] = useState(() => {
    const config = configs.find((config2) => config2.mql.matches);
    return config ? config.mode : null;
  });
  useEffect(() => {
    const cleans = configs.map(({ mode, mql }) => {
      const handler = ({ matches }) => {
        if (matches) {
          setSystemMode(mode);
        } else {
          setSystemMode((previousMode) => previousMode === mode ? null : mode);
        }
      };
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    });
    return () => cleans.forEach((clean) => clean());
  });
  return systemMode;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function useColorModeState(theme, { target } = {}) {
  const systemMode = useSystemMode(theme);
  const defaultColorMode = getDefaultColorModeName(theme);
  const initialColorMode = getInitialColorModeName(theme);
  const [mode, setMode] = useState(() => {
    if (!checkHasColorModes(theme))
      return null;
    return defaultColorMode;
  });
  const customPropertiesEnabled = checkHasCustomPropertiesEnabled(theme);
  const manuallySetMode = useCallback((value) => {
    setMode(value || null);
    if (value) {
      storage.set(value);
    } else {
      storage.clear();
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (!checkHasColorModes(theme))
      return;
    const storedMode = storage.get();
    const initialMode = storedMode || systemMode || defaultColorMode;
    if (mode !== initialMode) {
      setMode(storedMode || systemMode || defaultColorMode);
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    const storedMode = storage.get();
    if (storedMode)
      return;
    const targetMode = systemMode || defaultColorMode;
    if (targetMode === mode)
      return;
    setMode(targetMode);
  }, [mode, systemMode, defaultColorMode]);
  useIsomorphicLayoutEffect(() => {
    if (!mode)
      return void 0;
    if (!customPropertiesEnabled)
      return void 0;
    const stored = storage.get();
    const initial = initialColorMode !== mode;
    if (!stored && !initial)
      return void 0;
    const className = getColorModeClassName(mode);
    const usedTarget = target || document.body;
    usedTarget.classList.add(className);
    return () => {
      usedTarget.classList.remove(className);
    };
  }, [customPropertiesEnabled, target, mode, initialColorMode]);
  return [mode, manuallySetMode];
}
function useColorModeTheme(theme, mode) {
  const [initialMode] = useState(mode);
  const customPropertiesTheme = useMemo(() => {
    if (!initialMode)
      return null;
    if (!checkHasCustomPropertiesEnabled(theme))
      return null;
    if (!checkHasColorModes(theme))
      return theme;
    const _a = theme.colors, { modes } = _a, colors2 = __objRest(_a, ["modes"]);
    const colorKeys = getUsedColorKeys(modes);
    return __spreadProps2(__spreadValues2({}, theme), {
      colors: __spreadProps2(__spreadValues2(__spreadValues2({}, colors2), toCustomPropertiesReferences(
        colors2,
        theme,
        colorKeys,
        XSTYLED_COLORS_PREFIX
      )), {
        modes
      }),
      __rawColors: theme.colors
    });
  }, [initialMode, theme]);
  const swapModeTheme = useMemo(() => {
    if (!mode)
      return null;
    if (checkHasCustomPropertiesEnabled(theme))
      return null;
    if (!checkHasColorModes(theme))
      return theme;
    if (mode === getInitialColorModeName(theme)) {
      return __spreadProps2(__spreadValues2({}, theme), { __colorMode: mode });
    }
    return __spreadProps2(__spreadValues2({}, theme), {
      colors: __spreadValues2(__spreadValues2({}, theme.colors), theme.colors.modes[mode]),
      __colorMode: mode,
      __rawColors: theme.colors
    });
  }, [theme, mode]);
  return customPropertiesTheme || swapModeTheme;
}
var ColorModeContext = createContext(null);
function createColorModeProvider({
  ThemeContext: ThemeContext3,
  ThemeProvider: ThemeProvider3,
  ColorModeStyle: ColorModeStyle2
}) {
  function ColorModeProvider2({
    children,
    target,
    targetSelector
  }) {
    const theme = useContext(ThemeContext3);
    if (!theme) {
      throw new Error(
        "[ColorModeProvider] requires ThemeProvider upper in the tree"
      );
    }
    const colorState = useColorModeState(theme, { target });
    const colorModeTheme = useColorModeTheme(theme, colorState[0]);
    return h(p, null, h(ColorModeStyle2, {
      targetSelector
    }), h(ThemeProvider3, {
      theme: colorModeTheme
    }, h(ColorModeContext.Provider, {
      value: colorState
    }, children)));
  }
  return ColorModeProvider2;
}
function createBox() {
  return [`&&{`, system, `}`];
}
createBox.meta = system.meta;
var getMediaWidth = (getBreakpointBound) => (value) => (props) => {
  const v = getBreakpointBound(getScreens(props), value);
  return v === null ? "0" : v || value;
};
var mediaGetters = {
  "min-width": getMediaWidth(getBreakpointMin),
  "max-width": getMediaWidth(getBreakpointMax)
};
var PROP_CHAR = `[-\\w]`;
var VALUE_CHAR = `(?:\\\\[\\s\\S]|[^\\\\;{}])`;
var PROP_PATT = `(${PROP_CHAR}+)(\\s*:\\s*)(?=\\S)(${VALUE_CHAR}*?)(\\s*!important)?(\\s*;)`;
var MEDIA_CHAR = `[^{]`;
var MEDIA_PATT = `(@media\\b\\s*)(?=\\S)(${MEDIA_CHAR}+?)(\\s*\\{)`;
var MATCH_REGEXP = new RegExp(`(?:${PROP_PATT}|${MEDIA_PATT})`, `g`);
var QUERY_REGEXP = new RegExp(
  `(\\(\\s*)(${PROP_CHAR}+)(\\s*:\\s*)([^\\)]*?)(\\s*\\))`,
  `g`
);
var mediaTransform = (rawValue) => {
  let matches;
  let lastIndex = 0;
  const values = [];
  while (matches = QUERY_REGEXP.exec(rawValue)) {
    const [, open, prop, colon, value, close] = matches;
    const getter = mediaGetters[prop];
    if (getter) {
      values.push(rawValue.slice(lastIndex, matches.index));
      values.push(
        (p2) => `${open}${prop}${colon}${getter(value)(p2)}${close}`
      );
      lastIndex = matches.index + matches[0].length;
    }
  }
  values.push(rawValue.slice(lastIndex, rawValue.length));
  return values;
};
var createTransform = (generator) => (rawValue) => {
  if (typeof rawValue !== "string")
    return rawValue;
  let matches;
  let lastIndex = 0;
  const values = [];
  while (matches = MATCH_REGEXP.exec(rawValue)) {
    const [, prop, colon, value, imp, semi, media, query, brace] = matches;
    if (media) {
      values.push(rawValue.slice(lastIndex, matches.index));
      values.push(media);
      mediaTransform(query).forEach((v) => values.push(v));
      values.push(brace);
      lastIndex = matches.index + matches[0].length;
    } else {
      const getter = generator.meta.cssGetters[prop];
      if (getter) {
        values.push(rawValue.slice(lastIndex, matches.index));
        values.push(
          (p2) => `${prop}${colon}${getter(value)(p2)}${imp || ""}${semi}`
        );
        lastIndex = matches.index + matches[0].length;
      }
    }
  }
  values.push(rawValue.slice(lastIndex, rawValue.length));
  return values;
};
var createUseGetter = (getter, useTheme3) => (value, defaultValue) => {
  const theme = useTheme3();
  return useMemo(
    () => getter(value, defaultValue)({ theme }),
    [value, defaultValue, theme]
  );
};

// ../../.yarn/__virtual__/@xstyled-emotion-virtual-265ce3e174/4/Users/z/.yarn/berry/cache/@xstyled-emotion-npm-3.7.0-0de45c419c-9.zip/node_modules/@xstyled/emotion/dist/index.mjs
var import_styled = __toESM(require_emotion_styled_cjs(), 1);
function ColorModeStyle({ targetSelector }) {
  const colorModeStyles = useCallback(
    (theme) => createColorStyles(theme, { targetSelector }),
    [targetSelector]
  );
  return h(import_react2.Global, {
    styles: colorModeStyles
  });
}
var ColorModeProvider = createColorModeProvider({
  ThemeContext: import_react2.ThemeContext,
  ThemeProvider: import_react2.ThemeProvider,
  ColorModeStyle
});
var useTh = createUseGetter(th, import_react2.useTheme);
var useAngle = createUseGetter(th.angle, import_react2.useTheme);
var useAnimation = createUseGetter(th.animation, import_react2.useTheme);
var useBorder = createUseGetter(th.border, import_react2.useTheme);
var useBorderColor = createUseGetter(th.borderColor, import_react2.useTheme);
var useBorderStyle = createUseGetter(th.borderStyle, import_react2.useTheme);
var useBorderWidth = createUseGetter(th.borderWidth, import_react2.useTheme);
var useColor = createUseGetter(th.color, import_react2.useTheme);
var useDuration = createUseGetter(th.duration, import_react2.useTheme);
var useFont = createUseGetter(th.font, import_react2.useTheme);
var useFontSize = createUseGetter(th.fontSize, import_react2.useTheme);
var useFontWeight = createUseGetter(th.fontWeight, import_react2.useTheme);
var useInset = createUseGetter(th.inset, import_react2.useTheme);
var useLetterSpacing = createUseGetter(th.letterSpacing, import_react2.useTheme);
var useLineHeight = createUseGetter(th.lineHeight, import_react2.useTheme);
var usePercent = createUseGetter(th.percent, import_react2.useTheme);
var usePx = createUseGetter(th.px, import_react2.useTheme);
var useRadius = createUseGetter(th.radius, import_react2.useTheme);
var useRingWidth = createUseGetter(th.ringWidth, import_react2.useTheme);
var useShadow = createUseGetter(th.shadow, import_react2.useTheme);
var useSize = createUseGetter(th.size, import_react2.useTheme);
var useSpace = createUseGetter(th.space, import_react2.useTheme);
var useTimingFunction = createUseGetter(th.timingFunction, import_react2.useTheme);
var useTransform = createUseGetter(th.transform, import_react2.useTheme);
var useTransition = createUseGetter(th.transition, import_react2.useTheme);
var useTransitionProperty = createUseGetter(
  th.transitionProperty,
  import_react2.useTheme
);
var useZIndex = createUseGetter(th.zIndex, import_react2.useTheme);
var __defProp$32 = Object.defineProperty;
var __defProps$12 = Object.defineProperties;
var __getOwnPropDescs$12 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$32 = Object.getOwnPropertySymbols;
var __hasOwnProp$32 = Object.prototype.hasOwnProperty;
var __propIsEnum$32 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$32 = (obj2, key, value) => key in obj2 ? __defProp$32(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$32 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$32.call(b, prop))
      __defNormalProp$32(a, prop, b[prop]);
  if (__getOwnPropSymbols$32)
    for (var prop of __getOwnPropSymbols$32(b)) {
      if (__propIsEnum$32.call(b, prop))
        __defNormalProp$32(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$12 = (a, b) => __defProps$12(a, __getOwnPropDescs$12(b));
var styleToString = (style2, props) => {
  if (Array.isArray(style2))
    return style2.reduce((str, style22) => str + styleToString(style22, props), "");
  if (typeof style2 === "function")
    return styleToString(style2(props), props);
  return style2;
};
var createCssFunction = (generator) => {
  const transform2 = createTransform(generator);
  return (strings, ...rawArgs) => {
    return (props) => {
      const emCssArgs = typeof strings === "function" ? (0, import_react2.css)(strings(props)) : (0, import_react2.css)(
        strings,
        ...rawArgs.map((arg) => {
          if (typeof arg === "function")
            return arg(props);
          return arg;
        })
      );
      return __spreadProps$12(__spreadValues$32({}, emCssArgs), {
        styles: styleToString(transform2(emCssArgs.styles), props)
      });
    };
  };
};
var emStyled = typeof import_styled.default === "function" ? import_styled.default : import_styled.default.default;
var __defProp$22 = Object.defineProperty;
var __getOwnPropSymbols$22 = Object.getOwnPropertySymbols;
var __hasOwnProp$22 = Object.prototype.hasOwnProperty;
var __propIsEnum$22 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$22 = (obj2, key, value) => key in obj2 ? __defProp$22(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$22 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$22.call(b, prop))
      __defNormalProp$22(a, prop, b[prop]);
  if (__getOwnPropSymbols$22)
    for (var prop of __getOwnPropSymbols$22(b)) {
      if (__propIsEnum$22.call(b, prop))
        __defNormalProp$22(a, prop, b[prop]);
    }
  return a;
};
var flattenArgs = (arg, props) => {
  if (typeof arg === "function")
    return flattenArgs(arg(props), props);
  if (Array.isArray(arg))
    return arg.map((arg2) => flattenArgs(arg2, props));
  return arg;
};
var getCreateStyle = (baseCreateStyle, css3, generator) => {
  if (!generator) {
    return (strings, ...args) => baseCreateStyle(
      (props) => css3(strings, ...flattenArgs(args, props))(props)
    );
  }
  return (strings, ...args) => {
    if (Array.isArray(strings)) {
      strings = [...strings, "\n"];
    }
    args = [...args, generator];
    return baseCreateStyle(
      (props) => css3(strings, ...flattenArgs(args, props))(props)
    );
  };
};
var createShouldForwardProp = (generator) => {
  const propSet = new Set(generator.meta.props);
  return (prop) => prop !== "as" && !prop.startsWith("$") && !propSet.has(prop);
};
var createBaseStyled = (css3, generator) => {
  const defaultOptions = generator ? {
    shouldForwardProp: createShouldForwardProp(generator)
  } : {};
  return (component, options) => getCreateStyle(
    emStyled(component, __spreadValues$22(__spreadValues$22({}, defaultOptions), options)),
    css3,
    generator
  );
};
var createStyled = (generator) => {
  const css3 = createCssFunction(generator);
  const styled2 = createBaseStyled(css3);
  const xstyled = createBaseStyled(css3, generator);
  styled2.box = xstyled("div");
  Object.keys(emStyled).forEach((key) => {
    styled2[key] = styled2(key);
    styled2[`${key}Box`] = xstyled(key);
  });
  return styled2;
};
var createX = (generator) => {
  const styled2 = createBaseStyled(createCssFunction(generator), generator);
  const x2 = {};
  Object.keys(emStyled).forEach((tag) => {
    x2[tag] = styled2(tag)``;
  });
  return x2;
};
var __defProp$12 = Object.defineProperty;
var __getOwnPropSymbols$12 = Object.getOwnPropertySymbols;
var __hasOwnProp$12 = Object.prototype.hasOwnProperty;
var __propIsEnum$12 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$12 = (obj2, key, value) => key in obj2 ? __defProp$12(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues$12 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$12.call(b, prop))
      __defNormalProp$12(a, prop, b[prop]);
  if (__getOwnPropSymbols$12)
    for (var prop of __getOwnPropSymbols$12(b)) {
      if (__propIsEnum$12.call(b, prop))
        __defNormalProp$12(a, prop, b[prop]);
    }
  return a;
};
var createCreateGlobalStyle = (generator) => {
  const css3 = createCssFunction(generator);
  return (...styles) => {
    const GlobalStyle = (props) => {
      const theme = (0, import_react2.useTheme)();
      return h(import_react2.Global, {
        styles: css3(...styles)(__spreadValues$12({ theme }, props))
      });
    };
    GlobalStyle.displayName = "GlobalStyle";
    return GlobalStyle;
  };
};
var createCx = (generator) => {
  const css3 = createCssFunction(generator);
  return (styles) => {
    if (string(styles))
      return styles;
    return (theme) => {
      const p2 = { theme };
      const parseStyle = (style2) => {
        if (typeof style2 === "object") {
          style2 = css3(style2);
        }
        return cascade(style2, p2);
      };
      if (Array.isArray(styles)) {
        return flatten(styles).map(parseStyle);
      }
      return parseStyle(styles);
    };
  };
};
var __defProp3 = Object.defineProperty;
var __defProps3 = Object.defineProperties;
var __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj2, key, value) => key in obj2 ? __defProp3(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps3 = (a, b) => __defProps3(a, __getOwnPropDescs3(b));
var createJsx = (generator) => {
  const cx2 = createCx(generator);
  return function jsx3(type, props, ...children) {
    if (props == null || !Object.prototype.hasOwnProperty.call(props, "css")) {
      return h.apply(void 0, arguments, ...children);
    }
    return (0, import_react2.jsx)(type, __spreadProps3(__spreadValues3({}, props), { css: cx2(props.css) }), ...children);
  };
};
var createCss = (generator) => {
  return {
    css: createCssFunction(generator),
    x: createX(generator),
    styled: createStyled(generator),
    createGlobalStyle: createCreateGlobalStyle(generator),
    cx: createCx(generator),
    jsx: createJsx(generator)
  };
};
var { css, styled, x, createGlobalStyle, cx, jsx } = createCss(system);
var export_Global = import_react4.Global;
var export_css = import_react4.css;
var export_jsx = import_react4.jsx;
export {
  export_Global as Global,
  export_css as css,
  export_jsx as jsx,
  x
};
