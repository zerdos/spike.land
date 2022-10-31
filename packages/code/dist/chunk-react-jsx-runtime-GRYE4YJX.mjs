import {
  require_dist,
  require_index_cjs,
  require_is_prop_valid_browser_cjs,
  require_tslib
} from "./chunk-chunk-MULVYL3L.mjs";
import {
  require_client,
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-NCUMYE5D.mjs";
import {
  require_emotion_styled_cjs
} from "./chunk-chunk-UWD3WOSR.mjs";
import {
  require_emotion_cache_cjs,
  require_emotion_react_cjs,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-chunk-5SVJH34K.mjs";
import {
  __commonJS,
  define_process_default,
  init_define_process
} from "./chunk-chunk-AIJYQNQW.mjs";

// ../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/valueTypes.cjs.js
var require_valueTypes_cjs = __commonJS({
  "../../.yarn/global/cache/style-value-types-npm-5.1.2-f9d7bb50ee-9.zip/node_modules/style-value-types/dist/valueTypes.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
    var sanitize = (v) => v % 1 ? Number(v.toFixed(5)) : v;
    var floatRegex = /(-)?([\d]*\.?[\d])+/g;
    var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
    var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
    function isString(v) {
      return typeof v === "string";
    }
    var number = {
      test: (v) => typeof v === "number",
      parse: parseFloat,
      transform: (v) => v
    };
    var alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
    var scale = Object.assign(Object.assign({}, number), { default: 1 });
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
    var isColorString = (type, testProp) => (v) => {
      return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
    };
    var splitColor = (aName, bName, cName) => (v) => {
      if (!isString(v))
        return v;
      const [a, b, c, alpha2] = v.match(floatRegex);
      return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
      };
    };
    var hsla = {
      test: isColorString("hsl", "hue"),
      parse: splitColor("hue", "saturation", "lightness"),
      transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
      }
    };
    var clampRgbUnit = clamp(0, 255);
    var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
    var rgba = {
      test: isColorString("rgb", "red"),
      parse: splitColor("red", "green", "blue"),
      transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
    };
    function parseHex(v) {
      let r = "";
      let g = "";
      let b = "";
      let a = "";
      if (v.length > 5) {
        r = v.substr(1, 2);
        g = v.substr(3, 2);
        b = v.substr(5, 2);
        a = v.substr(7, 2);
      } else {
        r = v.substr(1, 1);
        g = v.substr(2, 1);
        b = v.substr(3, 1);
        a = v.substr(4, 1);
        r += r;
        g += g;
        b += b;
        a += a;
      }
      return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1
      };
    }
    var hex = {
      test: isColorString("#"),
      parse: parseHex,
      transform: rgba.transform
    };
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
    exports.alpha = alpha;
    exports.color = color;
    exports.complex = complex;
    exports.degrees = degrees;
    exports.filter = filter;
    exports.hex = hex;
    exports.hsla = hsla;
    exports.number = number;
    exports.percent = percent;
    exports.progressPercentage = progressPercentage;
    exports.px = px;
    exports.rgbUnit = rgbUnit;
    exports.rgba = rgba;
    exports.scale = scale;
    exports.vh = vh;
    exports.vw = vw;
  }
});

// ../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/framesync.cjs.js
var require_framesync_cjs = __commonJS({
  "../../.yarn/global/cache/framesync-npm-6.1.2-3eeffdf40f-9.zip/node_modules/framesync/dist/framesync.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultTimestep = 1 / 60 * 1e3;
    var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
    var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);
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
    exports.cancelSync = cancelSync;
    exports.default = sync;
    exports.flushSync = flushSync;
    exports.getFrameData = getFrameData;
  }
});

// ../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/popmotion.cjs.js
var require_popmotion_cjs = __commonJS({
  "../../.yarn/global/cache/popmotion-npm-11.0.5-3c551ada08-9.zip/node_modules/popmotion/dist/popmotion.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib();
    var heyListen = require_dist();
    var styleValueTypes = require_valueTypes_cjs();
    var sync = require_framesync_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var sync__default = _interopDefaultLegacy(sync);
    var clamp = (min, max, v) => Math.min(Math.max(v, min), max);
    var safeMin = 1e-3;
    var minDuration = 0.01;
    var maxDuration = 10;
    var minDamping = 0.05;
    var maxDamping = 1;
    function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
      let envelope;
      let derivative;
      heyListen.warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
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
    var durationKeys = ["duration", "bounce"];
    var physicsKeys = ["stiffness", "damping", "mass"];
    function isSpringType(options, keys) {
      return keys.some((key) => options[key] !== void 0);
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
      var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = tslib.__rest(_a, ["from", "to", "restSpeed", "restDelta"]);
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
    var progress = (from, to, value) => {
      const toFromDifference = to - from;
      return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    };
    var mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;
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
    function hslaToRgba({ hue, saturation, lightness, alpha }) {
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
        alpha
      };
    }
    var mixLinearColor = (from, to, v) => {
      const fromExpo = from * from;
      const toExpo = to * to;
      return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
    };
    var colorTypes = [styleValueTypes.hex, styleValueTypes.rgba, styleValueTypes.hsla];
    var getColorType = (v) => colorTypes.find((type) => type.test(v));
    var notAnimatable = (color) => `'${color}' is not an animatable color. Use the equivalent color code instead.`;
    var mixColor = (from, to) => {
      let fromColorType = getColorType(from);
      let toColorType = getColorType(to);
      heyListen.invariant(!!fromColorType, notAnimatable(from));
      heyListen.invariant(!!toColorType, notAnimatable(to));
      let fromColor = fromColorType.parse(from);
      let toColor = toColorType.parse(to);
      if (fromColorType === styleValueTypes.hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = styleValueTypes.rgba;
      }
      if (toColorType === styleValueTypes.hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = styleValueTypes.rgba;
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
    var zeroPoint = {
      x: 0,
      y: 0,
      z: 0
    };
    var isNum = (v) => typeof v === "number";
    var combineFunctions = (a2, b2) => (v) => b2(a2(v));
    var pipe = (...transformers) => transformers.reduce(combineFunctions);
    function getMixer(origin, target) {
      if (isNum(origin)) {
        return (v) => mix(origin, target, v);
      } else if (styleValueTypes.color.test(origin)) {
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
    function analyse(value) {
      const parsed = styleValueTypes.complex.parse(value);
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
      const template = styleValueTypes.complex.createTransformer(target);
      const originStats = analyse(origin);
      const targetStats = analyse(target);
      const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
      if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
      } else {
        heyListen.warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p) => `${p > 0 ? target : origin}`;
      }
    };
    var mixNumber = (from, to) => (p) => mix(from, to, p);
    function detectMixerFactory(v) {
      if (typeof v === "number") {
        return mixNumber;
      } else if (typeof v === "string") {
        if (styleValueTypes.color.test(v)) {
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
      heyListen.invariant(inputLength === output.length, "Both input and output ranges must be the same length");
      heyListen.invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
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
    var reverseEasing = (easing) => (p) => 1 - easing(1 - p);
    var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
    var createExpoIn = (power) => (p) => Math.pow(p, power);
    var createBackIn = (power) => (p) => p * p * ((power + 1) * p - power);
    var createAnticipate = (power) => {
      const backEasing = createBackIn(power);
      return (p) => (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    };
    var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
    var BOUNCE_FIRST_THRESHOLD = 4 / 11;
    var BOUNCE_SECOND_THRESHOLD = 8 / 11;
    var BOUNCE_THIRD_THRESHOLD = 9 / 10;
    var linear = (p) => p;
    var easeIn = createExpoIn(2);
    var easeOut = reverseEasing(easeIn);
    var easeInOut = mirrorEasing(easeIn);
    var circIn = (p) => 1 - Math.sin(Math.acos(p));
    var circOut = reverseEasing(circIn);
    var circInOut = mirrorEasing(circOut);
    var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
    var backOut = reverseEasing(backIn);
    var backInOut = mirrorEasing(backIn);
    var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
    var ca = 4356 / 361;
    var cb = 35442 / 1805;
    var cc = 16061 / 1805;
    var bounceOut = (p) => {
      if (p === 1 || p === 0)
        return p;
      const p2 = p * p;
      return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
    };
    var bounceIn = reverseEasing(bounceOut);
    var bounceInOut = (p) => p < 0.5 ? 0.5 * (1 - bounceOut(1 - p * 2)) : 0.5 * bounceOut(p * 2 - 1) + 0.5;
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
    function loopElapsed(elapsed, duration, delay = 0) {
      return elapsed - duration - delay;
    }
    function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
      return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
    }
    function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
      return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
    }
    var framesync = (update) => {
      const passTimestamp = ({ delta }) => update(delta);
      return {
        start: () => sync__default["default"].update(passTimestamp, true),
        stop: () => sync.cancelSync.update(passTimestamp)
      };
    };
    function animate(_a) {
      var _b, _c;
      var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = tslib.__rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
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
    function velocityPerSecond(velocity, frameDuration) {
      return frameDuration ? velocity * (1e3 / frameDuration) : 0;
    }
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
      function startAnimation(options) {
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
        startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
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
          velocity = velocityPerSecond(v - prev, sync.getFrameData().delta);
          if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
            startSpring({ from: v, to: boundary, velocity });
          }
        };
        startAnimation({
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
    var radiansToDegrees = (radians) => radians * 180 / Math.PI;
    var angle = (a2, b2 = zeroPoint) => radiansToDegrees(Math.atan2(b2.y - a2.y, b2.x - a2.x));
    var applyOffset = (from, to) => {
      let hasReceivedFrom = true;
      if (to === void 0) {
        to = from;
        hasReceivedFrom = false;
      }
      return (v) => {
        if (hasReceivedFrom) {
          return v - from + to;
        } else {
          from = v;
          hasReceivedFrom = true;
          return to;
        }
      };
    };
    var identity = (v) => v;
    var createAttractor = (alterDisplacement = identity) => (constant, origin, v) => {
      const displacement = origin - v;
      const springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
      return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
    };
    var attract = createAttractor();
    var attractExpo = createAttractor(Math.sqrt);
    var degreesToRadians = (degrees) => degrees * Math.PI / 180;
    var isPoint = (point) => point.hasOwnProperty("x") && point.hasOwnProperty("y");
    var isPoint3D = (point) => isPoint(point) && point.hasOwnProperty("z");
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
    var pointFromVector = (origin, angle2, distance2) => {
      angle2 = degreesToRadians(angle2);
      return {
        x: distance2 * Math.cos(angle2) + origin.x,
        y: distance2 * Math.sin(angle2) + origin.y
      };
    };
    var toDecimal = (num, precision = 2) => {
      precision = Math.pow(10, precision);
      return Math.round(num * precision) / precision;
    };
    var smoothFrame = (prevValue, nextValue, duration, smoothing = 0) => toDecimal(prevValue + duration * (nextValue - prevValue) / Math.max(smoothing, duration));
    var smooth = (strength = 50) => {
      let previousValue = 0;
      let lastUpdated = 0;
      return (v) => {
        const currentFramestamp = sync.getFrameData().timestamp;
        const timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
        const newValue = timeDelta ? smoothFrame(previousValue, v, timeDelta, strength) : previousValue;
        lastUpdated = currentFramestamp;
        previousValue = newValue;
        return newValue;
      };
    };
    var snap = (points) => {
      if (typeof points === "number") {
        return (v) => Math.round(v / points) * points;
      } else {
        let i = 0;
        const numPoints = points.length;
        return (v) => {
          let lastDistance = Math.abs(points[0] - v);
          for (i = 1; i < numPoints; i++) {
            const point = points[i];
            const distance2 = Math.abs(point - v);
            if (distance2 === 0)
              return point;
            if (distance2 > lastDistance)
              return points[i - 1];
            if (i === numPoints - 1)
              return point;
            lastDistance = distance2;
          }
        };
      }
    };
    function velocityPerFrame(xps, frameDuration) {
      return xps / (1e3 / frameDuration);
    }
    var wrap = (min, max, v) => {
      const rangeSize = max - min;
      return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
    };
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
    var steps = (steps2, direction = "end") => (progress2) => {
      progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
      const expanded = progress2 * steps2;
      const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
      return clamp(0, 1, rounded / steps2);
    };
    exports.angle = angle;
    exports.animate = animate;
    exports.anticipate = anticipate;
    exports.applyOffset = applyOffset;
    exports.attract = attract;
    exports.attractExpo = attractExpo;
    exports.backIn = backIn;
    exports.backInOut = backInOut;
    exports.backOut = backOut;
    exports.bounceIn = bounceIn;
    exports.bounceInOut = bounceInOut;
    exports.bounceOut = bounceOut;
    exports.circIn = circIn;
    exports.circInOut = circInOut;
    exports.circOut = circOut;
    exports.clamp = clamp;
    exports.createAnticipate = createAnticipate;
    exports.createAttractor = createAttractor;
    exports.createBackIn = createBackIn;
    exports.createExpoIn = createExpoIn;
    exports.cubicBezier = cubicBezier;
    exports.decay = decay;
    exports.degreesToRadians = degreesToRadians;
    exports.distance = distance;
    exports.easeIn = easeIn;
    exports.easeInOut = easeInOut;
    exports.easeOut = easeOut;
    exports.inertia = inertia;
    exports.interpolate = interpolate;
    exports.isPoint = isPoint;
    exports.isPoint3D = isPoint3D;
    exports.keyframes = keyframes;
    exports.linear = linear;
    exports.mirrorEasing = mirrorEasing;
    exports.mix = mix;
    exports.mixColor = mixColor;
    exports.mixComplex = mixComplex;
    exports.pipe = pipe;
    exports.pointFromVector = pointFromVector;
    exports.progress = progress;
    exports.radiansToDegrees = radiansToDegrees;
    exports.reverseEasing = reverseEasing;
    exports.smooth = smooth;
    exports.smoothFrame = smoothFrame;
    exports.snap = snap;
    exports.spring = spring;
    exports.steps = steps;
    exports.toDecimal = toDecimal;
    exports.velocityPerFrame = velocityPerFrame;
    exports.velocityPerSecond = velocityPerSecond;
    exports.wrap = wrap;
  }
});

// ../../.yarn/__virtual__/framer-motion-virtual-f2663e67ae/0/global/cache/framer-motion-npm-7.6.2-cc6e4732fc-9.zip/node_modules/framer-motion/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../.yarn/__virtual__/framer-motion-virtual-f2663e67ae/0/global/cache/framer-motion-npm-7.6.2-cc6e4732fc-9.zip/node_modules/framer-motion/dist/cjs/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React2 = require_react();
    var styleValueTypes = require_valueTypes_cjs();
    var popmotion = require_popmotion_cjs();
    var heyListen = require_dist();
    var sync = require_framesync_cjs();
    var dom = require_index_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__default = _interopDefaultLegacy(React2);
    var React__namespace = _interopNamespace(React2);
    var sync__default = _interopDefaultLegacy(sync);
    var MotionConfigContext = React2.createContext({
      transformPagePoint: (p) => p,
      isStatic: false,
      reducedMotion: "never"
    });
    var MotionContext = React2.createContext({});
    function useVisualElementContext() {
      return React2.useContext(MotionContext).visualElement;
    }
    var PresenceContext = React2.createContext(null);
    var isBrowser = typeof document !== "undefined";
    var useIsomorphicLayoutEffect = isBrowser ? React2.useLayoutEffect : React2.useEffect;
    var LazyContext = React2.createContext({ strict: false });
    function useVisualElement(Component, visualState, props, createVisualElement) {
      const parent = useVisualElementContext();
      const lazyContext = React2.useContext(LazyContext);
      const presenceContext = React2.useContext(PresenceContext);
      const reducedMotionConfig = React2.useContext(MotionConfigContext).reducedMotion;
      const visualElementRef = React2.useRef(void 0);
      createVisualElement = createVisualElement || lazyContext.renderer;
      if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
          visualState,
          parent,
          props,
          presenceId: presenceContext ? presenceContext.id : void 0,
          blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
          reducedMotionConfig
        });
      }
      const visualElement2 = visualElementRef.current;
      useIsomorphicLayoutEffect(() => {
        visualElement2 && visualElement2.syncRender();
      });
      React2.useEffect(() => {
        if (visualElement2 && visualElement2.animationState) {
          visualElement2.animationState.animateChanges();
        }
      });
      useIsomorphicLayoutEffect(() => () => visualElement2 && visualElement2.notifyUnmount(), []);
      return visualElement2;
    }
    function isRefObject(ref) {
      return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
    }
    function useMotionRef(visualState, visualElement2, externalRef) {
      return React2.useCallback(
        (instance) => {
          instance && visualState.mount && visualState.mount(instance);
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
    function isVariantLabel(v) {
      return typeof v === "string" || Array.isArray(v);
    }
    function isAnimationControls(v) {
      return typeof v === "object" && typeof v.start === "function";
    }
    var variantProps$1 = [
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
      return isAnimationControls(props.animate) || variantProps$1.some((name) => isVariantLabel(props[name]));
    }
    function isVariantNode(props) {
      return Boolean(isControllingVariants(props) || props.variants);
    }
    function getCurrentTreeVariants(props, context) {
      if (isControllingVariants(props)) {
        const { initial, animate: animate2 } = props;
        return {
          initial: initial === false || isVariantLabel(initial) ? initial : void 0,
          animate: isVariantLabel(animate2) ? animate2 : void 0
        };
      }
      return props.inherit !== false ? context : {};
    }
    function useCreateMotionContext(props) {
      const { initial, animate: animate2 } = getCurrentTreeVariants(props, React2.useContext(MotionContext));
      return React2.useMemo(() => ({ initial, animate: animate2 }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate2)]);
    }
    function variantLabelsAsDependency(prop) {
      return Array.isArray(prop) ? prop.join(" ") : prop;
    }
    var createDefinition = (propNames) => ({
      isEnabled: (props) => propNames.some((name) => !!props[name])
    });
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
      for (const key in features) {
        if (key === "projectionNodeConstructor") {
          featureDefinitions.projectionNodeConstructor = features[key];
        } else {
          featureDefinitions[key].Component = features[key];
        }
      }
    }
    function useConstant(init) {
      const ref = React2.useRef(null);
      if (ref.current === null) {
        ref.current = init();
      }
      return ref.current;
    }
    var globalProjectionState = {
      hasAnimatedSinceResize: true,
      hasEverUpdated: false
    };
    var id$1 = 1;
    function useProjectionId() {
      return useConstant(() => {
        if (globalProjectionState.hasEverUpdated) {
          return id$1++;
        }
      });
    }
    var LayoutGroupContext = React2.createContext({});
    var VisualElementHandler = class extends React__default["default"].Component {
      getSnapshotBeforeUpdate() {
        const { visualElement: visualElement2, props } = this.props;
        if (visualElement2)
          visualElement2.setProps(props);
        return null;
      }
      componentDidUpdate() {
      }
      render() {
        return this.props.children;
      }
    };
    var SwitchLayoutGroupContext = React2.createContext({});
    var motionComponentSymbol = Symbol.for("motionComponentSymbol");
    function createMotionComponent({ preloadedFeatures, createVisualElement, projectionNodeConstructor, useRender, useVisualState: useVisualState2, Component }) {
      preloadedFeatures && loadFeatures(preloadedFeatures);
      function MotionComponent(props, externalRef) {
        const configAndProps = {
          ...React2.useContext(MotionConfigContext),
          ...props,
          layoutId: useLayoutId(props)
        };
        const { isStatic } = configAndProps;
        let features = null;
        const context = useCreateMotionContext(props);
        const projectionId = isStatic ? void 0 : useProjectionId();
        const visualState = useVisualState2(props, isStatic);
        if (!isStatic && isBrowser) {
          context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
          const lazyStrictMode = React2.useContext(LazyContext).strict;
          const initialLayoutGroupConfig = React2.useContext(SwitchLayoutGroupContext);
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
        return React__namespace.createElement(
          VisualElementHandler,
          { visualElement: context.visualElement, props: configAndProps },
          features,
          React__namespace.createElement(MotionContext.Provider, { value: context }, useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement))
        );
      }
      const ForwardRefComponent = React2.forwardRef(MotionComponent);
      ForwardRefComponent[motionComponentSymbol] = Component;
      return ForwardRefComponent;
    }
    function useLayoutId({ layoutId }) {
      const layoutGroupId = React2.useContext(LayoutGroupContext).id;
      return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
    }
    function createMotionProxy(createConfig) {
      function custom(Component, customMotionComponentConfig = {}) {
        return createMotionComponent(createConfig(Component, customMotionComponentConfig));
      }
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
    function isSVGComponent(Component) {
      if (typeof Component !== "string" || Component.includes("-")) {
        return false;
      } else if (lowercaseSVGElements.indexOf(Component) > -1 || /[A-Z]/.test(Component)) {
        return true;
      }
      return false;
    }
    var scaleCorrectors = {};
    function addScaleCorrector(correctors) {
      Object.assign(scaleCorrectors, correctors);
    }
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
    function isForcedMotionValue(key, { layout, layoutId }) {
      return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
    }
    var isMotionValue = (value) => !!(value === null || value === void 0 ? void 0 : value.getVelocity);
    var translateAlias = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective"
    };
    var sortTransformProps = (a, b) => transformPropOrder.indexOf(a) - transformPropOrder.indexOf(b);
    function buildTransform({ transform: transform2, transformKeys: transformKeys2 }, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
      let transformString = "";
      transformKeys2.sort(sortTransformProps);
      for (const key of transformKeys2) {
        transformString += `${translateAlias[key] || key}(${transform2[key]}) `;
      }
      if (enableHardwareAcceleration && !transform2.z) {
        transformString += "translateZ(0)";
      }
      transformString = transformString.trim();
      if (transformTemplate) {
        transformString = transformTemplate(transform2, transformIsDefault ? "" : transformString);
      } else if (allowTransformNone && transformIsDefault) {
        transformString = "none";
      }
      return transformString;
    }
    function isCSSVariable$1(key) {
      return key.startsWith("--");
    }
    var getValueAsType = (value, type) => {
      return type && typeof value === "number" ? type.transform(value) : value;
    };
    var int = {
      ...styleValueTypes.number,
      transform: Math.round
    };
    var numberValueTypes = {
      borderWidth: styleValueTypes.px,
      borderTopWidth: styleValueTypes.px,
      borderRightWidth: styleValueTypes.px,
      borderBottomWidth: styleValueTypes.px,
      borderLeftWidth: styleValueTypes.px,
      borderRadius: styleValueTypes.px,
      radius: styleValueTypes.px,
      borderTopLeftRadius: styleValueTypes.px,
      borderTopRightRadius: styleValueTypes.px,
      borderBottomRightRadius: styleValueTypes.px,
      borderBottomLeftRadius: styleValueTypes.px,
      width: styleValueTypes.px,
      maxWidth: styleValueTypes.px,
      height: styleValueTypes.px,
      maxHeight: styleValueTypes.px,
      size: styleValueTypes.px,
      top: styleValueTypes.px,
      right: styleValueTypes.px,
      bottom: styleValueTypes.px,
      left: styleValueTypes.px,
      padding: styleValueTypes.px,
      paddingTop: styleValueTypes.px,
      paddingRight: styleValueTypes.px,
      paddingBottom: styleValueTypes.px,
      paddingLeft: styleValueTypes.px,
      margin: styleValueTypes.px,
      marginTop: styleValueTypes.px,
      marginRight: styleValueTypes.px,
      marginBottom: styleValueTypes.px,
      marginLeft: styleValueTypes.px,
      rotate: styleValueTypes.degrees,
      rotateX: styleValueTypes.degrees,
      rotateY: styleValueTypes.degrees,
      rotateZ: styleValueTypes.degrees,
      scale: styleValueTypes.scale,
      scaleX: styleValueTypes.scale,
      scaleY: styleValueTypes.scale,
      scaleZ: styleValueTypes.scale,
      skew: styleValueTypes.degrees,
      skewX: styleValueTypes.degrees,
      skewY: styleValueTypes.degrees,
      distance: styleValueTypes.px,
      translateX: styleValueTypes.px,
      translateY: styleValueTypes.px,
      translateZ: styleValueTypes.px,
      x: styleValueTypes.px,
      y: styleValueTypes.px,
      z: styleValueTypes.px,
      perspective: styleValueTypes.px,
      transformPerspective: styleValueTypes.px,
      opacity: styleValueTypes.alpha,
      originX: styleValueTypes.progressPercentage,
      originY: styleValueTypes.progressPercentage,
      originZ: styleValueTypes.px,
      zIndex: int,
      fillOpacity: styleValueTypes.alpha,
      strokeOpacity: styleValueTypes.alpha,
      numOctaves: int
    };
    function buildHTMLStyles(state, latestValues, options, transformTemplate) {
      const { style, vars, transform: transform2, transformKeys: transformKeys2, transformOrigin } = state;
      transformKeys2.length = 0;
      let hasTransform2 = false;
      let hasTransformOrigin = false;
      let transformIsNone = true;
      for (const key in latestValues) {
        const value = latestValues[key];
        if (isCSSVariable$1(key)) {
          vars[key] = value;
          continue;
        }
        const valueType = numberValueTypes[key];
        const valueAsType = getValueAsType(value, valueType);
        if (transformProps.has(key)) {
          hasTransform2 = true;
          transform2[key] = valueAsType;
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
    var createHtmlRenderState = () => ({
      style: {},
      transform: {},
      transformKeys: [],
      transformOrigin: {},
      vars: {}
    });
    function copyRawValuesOnly(target, source, props) {
      for (const key in source) {
        if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
          target[key] = source[key];
        }
      }
    }
    function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
      return React2.useMemo(() => {
        const state = createHtmlRenderState();
        buildHTMLStyles(state, visualState, { enableHardwareAcceleration: !isStatic }, transformTemplate);
        return Object.assign({}, state.vars, state.style);
      }, [visualState]);
    }
    function useStyle(props, visualState, isStatic) {
      const styleProp = props.style || {};
      const style = {};
      copyRawValuesOnly(style, styleProp, props);
      Object.assign(style, useInitialMotionValues(props, visualState, isStatic));
      return props.transformValues ? props.transformValues(style) : style;
    }
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
    var shouldForward = (key) => !isValidMotionProp(key);
    function loadExternalIsValidProp(isValidProp) {
      if (!isValidProp)
        return;
      shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
    }
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
    function calcOrigin$1(origin, offset, size) {
      return typeof origin === "string" ? origin : styleValueTypes.px.transform(offset + size * origin);
    }
    function calcSVGTransformOrigin(dimensions, originX, originY) {
      const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
      const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
      return `${pxOriginX} ${pxOriginY}`;
    }
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
      attrs[keys.offset] = styleValueTypes.px.transform(-offset);
      const pathLength = styleValueTypes.px.transform(length);
      const pathSpacing = styleValueTypes.px.transform(spacing);
      attrs[keys.array] = `${pathLength} ${pathSpacing}`;
    }
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
    var createSvgRenderState = () => ({
      ...createHtmlRenderState(),
      attrs: {}
    });
    function useSVGProps(props, visualState) {
      const visualProps = React2.useMemo(() => {
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
    function createUseRender(forwardMotionProps = false) {
      const useRender = (Component, props, projectionId, ref, { latestValues }, isStatic) => {
        const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
        const visualProps = useVisualProps(props, latestValues, isStatic);
        const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
        const elementProps = {
          ...filteredProps,
          ...visualProps,
          ref
        };
        if (projectionId) {
          elementProps["data-projection-id"] = projectionId;
        }
        return React2.createElement(Component, elementProps);
      };
      return useRender;
    }
    var camelToDash = (str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    function renderHTML(element, { style, vars }, styleProp, projection) {
      Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
      for (const key in vars) {
        element.style.setProperty(key, vars[key]);
      }
    }
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
    function renderSVG(element, renderState, _styleProp, projection) {
      renderHTML(element, renderState, void 0, projection);
      for (const key in renderState.attrs) {
        element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
      }
    }
    function scrapeMotionValuesFromProps$1(props) {
      const { style } = props;
      const newValues = {};
      for (const key in style) {
        if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
          newValues[key] = style[key];
        }
      }
      return newValues;
    }
    function scrapeMotionValuesFromProps(props) {
      const newValues = scrapeMotionValuesFromProps$1(props);
      for (const key in props) {
        if (isMotionValue(props[key])) {
          const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
          newValues[targetKey] = props[key];
        }
      }
      return newValues;
    }
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
    var isKeyframesTarget = (v) => {
      return Array.isArray(v);
    };
    var isCustomValue = (v) => {
      return Boolean(v && typeof v === "object" && v.mix && v.toValue);
    };
    var resolveFinalValueInKeyframes = (v) => {
      return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
    };
    function resolveMotionValue(value) {
      const unwrappedValue = isMotionValue(value) ? value.get() : value;
      return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
    }
    function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2, createRenderState, onMount }, props, context, presenceContext) {
      const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps2),
        renderState: createRenderState()
      };
      if (onMount) {
        state.mount = (instance) => onMount(props, instance, state);
      }
      return state;
    }
    var makeUseVisualState = (config) => (props, isStatic) => {
      const context = React2.useContext(MotionContext);
      const presenceContext = React2.useContext(PresenceContext);
      const make = () => makeState(config, props, context, presenceContext);
      return isStatic ? make() : useConstant(make);
    };
    function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
      const values = {};
      const motionValues = scrapeMotionValues(props);
      for (const key in motionValues) {
        values[key] = resolveMotionValue(motionValues[key]);
      }
      let { initial, animate: animate2 } = props;
      const isControllingVariants$1 = isControllingVariants(props);
      const isVariantNode$1 = isVariantNode(props);
      if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
        if (initial === void 0)
          initial = context.initial;
        if (animate2 === void 0)
          animate2 = context.animate;
      }
      let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
      isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
      const variantToSet = isInitialAnimationBlocked ? animate2 : initial;
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
    var svgMotionConfig = {
      useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps,
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
    var htmlMotionConfig = {
      useVisualState: makeUseVisualState({
        scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
        createRenderState: createHtmlRenderState
      })
    };
    function createDomMotionConfig(Component, { forwardMotionProps = false }, preloadedFeatures, createVisualElement, projectionNodeConstructor) {
      const baseConfig = isSVGComponent(Component) ? svgMotionConfig : htmlMotionConfig;
      return {
        ...baseConfig,
        preloadedFeatures,
        useRender: createUseRender(forwardMotionProps),
        createVisualElement,
        projectionNodeConstructor,
        Component
      };
    }
    exports.AnimationType = void 0;
    (function(AnimationType) {
      AnimationType["Animate"] = "animate";
      AnimationType["Hover"] = "whileHover";
      AnimationType["Tap"] = "whileTap";
      AnimationType["Drag"] = "whileDrag";
      AnimationType["Focus"] = "whileFocus";
      AnimationType["InView"] = "whileInView";
      AnimationType["Exit"] = "exit";
    })(exports.AnimationType || (exports.AnimationType = {}));
    function addDomEvent(target, eventName, handler, options = { passive: true }) {
      target.addEventListener(eventName, handler, options);
      return () => target.removeEventListener(eventName, handler);
    }
    function useDomEvent(ref, eventName, handler, options) {
      React2.useEffect(() => {
        const element = ref.current;
        if (handler && element) {
          return addDomEvent(element, eventName, handler, options);
        }
      }, [ref, eventName, handler, options]);
    }
    function useFocusGesture({ whileFocus, visualElement: visualElement2 }) {
      const { animationState } = visualElement2;
      const onFocus = () => {
        animationState && animationState.setActive(exports.AnimationType.Focus, true);
      };
      const onBlur = () => {
        animationState && animationState.setActive(exports.AnimationType.Focus, false);
      };
      useDomEvent(visualElement2, "focus", whileFocus ? onFocus : void 0);
      useDomEvent(visualElement2, "blur", whileFocus ? onBlur : void 0);
    }
    function isMouseEvent(event) {
      if (typeof PointerEvent !== "undefined" && event instanceof PointerEvent) {
        return !!(event.pointerType === "mouse");
      }
      return event instanceof MouseEvent;
    }
    function isTouchEvent(event) {
      const hasTouches = !!event.touches;
      return hasTouches;
    }
    function filterPrimaryPointer(eventHandler) {
      return (event) => {
        const isMouseEvent2 = event instanceof MouseEvent;
        const isPrimaryPointer = !isMouseEvent2 || isMouseEvent2 && event.button === 0;
        if (isPrimaryPointer) {
          eventHandler(event);
        }
      };
    }
    var defaultPagePoint = { pageX: 0, pageY: 0 };
    function pointFromTouch(e, pointType = "page") {
      const primaryTouch = e.touches[0] || e.changedTouches[0];
      const point = primaryTouch || defaultPagePoint;
      return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"]
      };
    }
    function pointFromMouse(point, pointType = "page") {
      return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"]
      };
    }
    function extractEventInfo(event, pointType = "page") {
      return {
        point: isTouchEvent(event) ? pointFromTouch(event, pointType) : pointFromMouse(event, pointType)
      };
    }
    var wrapHandler = (handler, shouldFilterPrimaryPointer = false) => {
      const listener = (event) => handler(event, extractEventInfo(event));
      return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
    };
    var supportsPointerEvents = () => isBrowser && window.onpointerdown === null;
    var supportsTouchEvents = () => isBrowser && window.ontouchstart === null;
    var supportsMouseEvents = () => isBrowser && window.onmousedown === null;
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
    function createLock(name) {
      let lock = null;
      return () => {
        const openLock = () => {
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
      let lock = false;
      if (drag2 === "y") {
        lock = globalVerticalLock();
      } else if (drag2 === "x") {
        lock = globalHorizontalLock();
      } else {
        const openHorizontal = globalHorizontalLock();
        const openVertical = globalVerticalLock();
        if (openHorizontal && openVertical) {
          lock = () => {
            openHorizontal();
            openVertical();
          };
        } else {
          if (openHorizontal)
            openHorizontal();
          if (openVertical)
            openVertical();
        }
      }
      return lock;
    }
    function isDragActive() {
      const openGestureLock = getGlobalLock(true);
      if (!openGestureLock)
        return true;
      openGestureLock();
      return false;
    }
    function createHoverEvent(visualElement2, isActive, callback) {
      return (event, info) => {
        if (!isMouseEvent(event) || isDragActive())
          return;
        if (visualElement2.animationState) {
          visualElement2.animationState.setActive(exports.AnimationType.Hover, isActive);
        }
        callback && callback(event, info);
      };
    }
    function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement: visualElement2 }) {
      usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0, { passive: !onHoverStart });
      usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0, { passive: !onHoverEnd });
    }
    var isNodeOrChild = (parent, child) => {
      if (!child) {
        return false;
      } else if (parent === child) {
        return true;
      } else {
        return isNodeOrChild(parent, child.parentElement);
      }
    };
    function useUnmountEffect(callback) {
      return React2.useEffect(() => () => callback(), []);
    }
    function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, visualElement: visualElement2 }) {
      const hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
      const isPressing = React2.useRef(false);
      const cancelPointerEndListeners = React2.useRef(null);
      const eventOptions = {
        passive: !(onTapStart || onTap || onTapCancel || onPointerDown)
      };
      function removePointerEndListener() {
        cancelPointerEndListeners.current && cancelPointerEndListeners.current();
        cancelPointerEndListeners.current = null;
      }
      function checkPointerEnd() {
        removePointerEndListener();
        isPressing.current = false;
        visualElement2.animationState && visualElement2.animationState.setActive(exports.AnimationType.Tap, false);
        return !isDragActive();
      }
      function onPointerUp(event, info) {
        if (!checkPointerEnd())
          return;
        !isNodeOrChild(visualElement2.getInstance(), event.target) ? onTapCancel && onTapCancel(event, info) : onTap && onTap(event, info);
      }
      function onPointerCancel(event, info) {
        if (!checkPointerEnd())
          return;
        onTapCancel && onTapCancel(event, info);
      }
      function onPointerDown(event, info) {
        removePointerEndListener();
        if (isPressing.current)
          return;
        isPressing.current = true;
        cancelPointerEndListeners.current = popmotion.pipe(addPointerEvent(window, "pointerup", onPointerUp, eventOptions), addPointerEvent(window, "pointercancel", onPointerCancel, eventOptions));
        visualElement2.animationState && visualElement2.animationState.setActive(exports.AnimationType.Tap, true);
        onTapStart && onTapStart(event, info);
      }
      usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0, eventOptions);
      useUnmountEffect(removePointerEndListener);
    }
    var defaultEnvironment = "production";
    var env = typeof define_process_default === "undefined" || define_process_default.env === void 0 ? defaultEnvironment : "development";
    var warned = /* @__PURE__ */ new Set();
    function warnOnce(condition, message, element) {
      if (condition || warned.has(message))
        return;
      console.warn(message);
      if (element)
        console.warn(element);
      warned.add(message);
    }
    var observerCallbacks = /* @__PURE__ */ new WeakMap();
    var observers = /* @__PURE__ */ new WeakMap();
    var fireObserverCallback = (entry) => {
      const callback = observerCallbacks.get(entry.target);
      callback && callback(entry);
    };
    var fireAllObserverCallbacks = (entries) => {
      entries.forEach(fireObserverCallback);
    };
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
    function observeIntersection(element, options, callback) {
      const rootInteresectionObserver = initIntersectionObserver(options);
      observerCallbacks.set(element, callback);
      rootInteresectionObserver.observe(element);
      return () => {
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
      };
    }
    function useViewport({ visualElement: visualElement2, whileInView, onViewportEnter, onViewportLeave, viewport = {} }) {
      const state = React2.useRef({
        hasEnteredView: false,
        isInView: false
      });
      let shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
      if (viewport.once && state.current.hasEnteredView)
        shouldObserve = false;
      const useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
      useObserver(shouldObserve, state.current, visualElement2, viewport);
    }
    var thresholdNames = {
      some: 0,
      all: 1
    };
    function useIntersectionObserver(shouldObserve, state, visualElement2, { root, margin: rootMargin, amount = "some", once }) {
      React2.useEffect(() => {
        if (!shouldObserve)
          return;
        const options = {
          root: root === null || root === void 0 ? void 0 : root.current,
          rootMargin,
          threshold: typeof amount === "number" ? amount : thresholdNames[amount]
        };
        const intersectionCallback = (entry) => {
          const { isIntersecting } = entry;
          if (state.isInView === isIntersecting)
            return;
          state.isInView = isIntersecting;
          if (once && !isIntersecting && state.hasEnteredView) {
            return;
          } else if (isIntersecting) {
            state.hasEnteredView = true;
          }
          if (visualElement2.animationState) {
            visualElement2.animationState.setActive(exports.AnimationType.InView, isIntersecting);
          }
          const props = visualElement2.getProps();
          const callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
          callback && callback(entry);
        };
        return observeIntersection(visualElement2.getInstance(), options, intersectionCallback);
      }, [shouldObserve, root, rootMargin, amount]);
    }
    function useMissingIntersectionObserver(shouldObserve, state, visualElement2, { fallback = true }) {
      React2.useEffect(() => {
        if (!shouldObserve || !fallback)
          return;
        if (env !== "production") {
          warnOnce(false, "IntersectionObserver not available on this device. whileInView animations will trigger on mount.");
        }
        requestAnimationFrame(() => {
          state.hasEnteredView = true;
          const { onViewportEnter } = visualElement2.getProps();
          onViewportEnter && onViewportEnter(null);
          if (visualElement2.animationState) {
            visualElement2.animationState.setActive(exports.AnimationType.InView, true);
          }
        });
      }, [shouldObserve]);
    }
    var makeRenderlessComponent = (hook) => (props) => {
      hook(props);
      return null;
    };
    var gestureAnimations = {
      inView: makeRenderlessComponent(useViewport),
      tap: makeRenderlessComponent(useTapGesture),
      focus: makeRenderlessComponent(useFocusGesture),
      hover: makeRenderlessComponent(useHoverGesture)
    };
    function usePresence() {
      const context = React2.useContext(PresenceContext);
      if (context === null)
        return [true, null];
      const { isPresent: isPresent2, onExitComplete, register } = context;
      const id2 = React2.useId();
      React2.useEffect(() => register(id2), []);
      const safeToRemove = () => onExitComplete && onExitComplete(id2);
      return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
    }
    function useIsPresent() {
      return isPresent(React2.useContext(PresenceContext));
    }
    function isPresent(context) {
      return context === null ? true : context.isPresent;
    }
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
    var secondsToMilliseconds = (seconds) => seconds * 1e3;
    var easingLookup = {
      linear: popmotion.linear,
      easeIn: popmotion.easeIn,
      easeInOut: popmotion.easeInOut,
      easeOut: popmotion.easeOut,
      circIn: popmotion.circIn,
      circInOut: popmotion.circInOut,
      circOut: popmotion.circOut,
      backIn: popmotion.backIn,
      backInOut: popmotion.backInOut,
      backOut: popmotion.backOut,
      anticipate: popmotion.anticipate,
      bounceIn: popmotion.bounceIn,
      bounceInOut: popmotion.bounceInOut,
      bounceOut: popmotion.bounceOut
    };
    var easingDefinitionToFunction = (definition) => {
      if (Array.isArray(definition)) {
        heyListen.invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
        const [x1, y1, x2, y2] = definition;
        return popmotion.cubicBezier(x1, y1, x2, y2);
      } else if (typeof definition === "string") {
        heyListen.invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
        return easingLookup[definition];
      }
      return definition;
    };
    var isEasingArray = (ease) => {
      return Array.isArray(ease) && typeof ease[0] !== "number";
    };
    var isAnimatable = (key, value) => {
      if (key === "zIndex")
        return false;
      if (typeof value === "number" || Array.isArray(value))
        return true;
      if (typeof value === "string" && styleValueTypes.complex.test(value) && !value.startsWith("url(")) {
        return true;
      }
      return false;
    };
    var underDampedSpring = () => ({
      type: "spring",
      stiffness: 500,
      damping: 25,
      restSpeed: 10
    });
    var criticallyDampedSpring = (to) => ({
      type: "spring",
      stiffness: 550,
      damping: to === 0 ? 2 * Math.sqrt(550) : 30,
      restSpeed: 10
    });
    var linearTween = () => ({
      type: "keyframes",
      ease: "linear",
      duration: 0.3
    });
    var keyframes = (values) => ({
      type: "keyframes",
      duration: 0.8,
      values
    });
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
    var getDefaultTransition = (valueKey, to) => {
      let transitionFactory;
      if (isKeyframesTarget(to)) {
        transitionFactory = keyframes;
      } else {
        transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
      }
      return { to, ...transitionFactory(to) };
    };
    var defaultValueTypes = {
      ...numberValueTypes,
      color: styleValueTypes.color,
      backgroundColor: styleValueTypes.color,
      outlineColor: styleValueTypes.color,
      fill: styleValueTypes.color,
      stroke: styleValueTypes.color,
      borderColor: styleValueTypes.color,
      borderTopColor: styleValueTypes.color,
      borderRightColor: styleValueTypes.color,
      borderBottomColor: styleValueTypes.color,
      borderLeftColor: styleValueTypes.color,
      filter: styleValueTypes.filter,
      WebkitFilter: styleValueTypes.filter
    };
    var getDefaultValueType = (key) => defaultValueTypes[key];
    function getAnimatableNone(key, value) {
      var _a;
      let defaultValueType = getDefaultValueType(key);
      if (defaultValueType !== styleValueTypes.filter)
        defaultValueType = styleValueTypes.complex;
      return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
    }
    var instantAnimationState = {
      current: false
    };
    function delay(callback, timeout) {
      const start = performance.now();
      const checkElapsed = ({ timestamp }) => {
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
          sync.cancelSync.read(checkElapsed);
          callback(elapsed - timeout);
        }
      };
      sync__default["default"].read(checkElapsed, true);
      return () => sync.cancelSync.read(checkElapsed);
    }
    function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, ...transition }) {
      return !!Object.keys(transition).length;
    }
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
        heyListen.warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
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
      const valueTransition = getValueTransition(transition, key) || {};
      return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
    }
    function hydrateKeyframes(options) {
      if (Array.isArray(options.to) && options.to[0] === null) {
        options.to = [...options.to];
        options.to[0] = options.from;
      }
      return options;
    }
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
    function getAnimation(key, value, target, transition, onComplete) {
      const valueTransition = getValueTransition(transition, key) || {};
      let origin = valueTransition.from !== void 0 ? valueTransition.from : value.get();
      const isTargetAnimatable = isAnimatable(key, target);
      if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        origin = getAnimatableNone(key, target);
      } else if (isZero(origin) && typeof target === "string") {
        origin = getZeroUnit(target);
      } else if (!Array.isArray(target) && isZero(target) && typeof origin === "string") {
        target = getZeroUnit(origin);
      }
      const isOriginAnimatable = isAnimatable(key, origin);
      heyListen.warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${key} from "${origin}" to "${target}". ${origin} is not an animatable value - to enable this animation set ${origin} to a value animatable to ${target} via the \`style\` property.`);
      function start() {
        const options = {
          from: origin,
          to: target,
          velocity: value.getVelocity(),
          onComplete,
          onUpdate: (v) => value.set(v)
        };
        return valueTransition.type === "inertia" || valueTransition.type === "decay" ? popmotion.inertia({ ...options, ...valueTransition }) : popmotion.animate({
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
      function set() {
        const finalTarget = resolveFinalValueInKeyframes(target);
        value.set(finalTarget);
        onComplete();
        valueTransition.onUpdate && valueTransition.onUpdate(finalTarget);
        valueTransition.onComplete && valueTransition.onComplete();
        return { stop: () => {
        } };
      }
      return !isOriginAnimatable || !isTargetAnimatable || valueTransition.type === false ? set : start;
    }
    function isZero(value) {
      return value === 0 || typeof value === "string" && parseFloat(value) === 0 && value.indexOf(" ") === -1;
    }
    function getZeroUnit(potentialUnitType) {
      return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
    }
    function getValueTransition(transition, key) {
      return transition[key] || transition["default"] || transition;
    }
    function startAnimation(key, value, target, transition = {}) {
      if (instantAnimationState.current) {
        transition = { type: false };
      }
      return value.start((onComplete) => {
        let controls;
        const animation = getAnimation(key, value, target, transition, onComplete);
        const delayBy = getDelayFromTransition(transition, key);
        const start = () => controls = animation();
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
    var isNumericalString = (v) => /^\-?\d*\.?\d+$/.test(v);
    var isZeroValueString = (v) => /^0[^.\s]+$/.test(v);
    function addUniqueItem(arr, item) {
      if (arr.indexOf(item) === -1)
        arr.push(item);
    }
    function removeItem(arr, item) {
      const index = arr.indexOf(item);
      if (index > -1)
        arr.splice(index, 1);
    }
    function moveItem([...arr], fromIndex, toIndex) {
      const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
      if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
      }
      return arr;
    }
    var SubscriptionManager = class {
      constructor() {
        this.subscriptions = [];
      }
      add(handler) {
        addUniqueItem(this.subscriptions, handler);
        return () => removeItem(this.subscriptions, handler);
      }
      notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
          return;
        if (numSubscriptions === 1) {
          this.subscriptions[0](a, b, c);
        } else {
          for (let i = 0; i < numSubscriptions; i++) {
            const handler = this.subscriptions[i];
            handler && handler(a, b, c);
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
    var isFloat = (value) => {
      return !isNaN(parseFloat(value));
    };
    var MotionValue = class {
      constructor(init) {
        this.version = "7.6.2";
        this.timeDelta = 0;
        this.lastUpdated = 0;
        this.updateSubscribers = new SubscriptionManager();
        this.velocityUpdateSubscribers = new SubscriptionManager();
        this.renderSubscribers = new SubscriptionManager();
        this.canTrackVelocity = false;
        this.updateAndNotify = (v, render = true) => {
          this.prev = this.current;
          this.current = v;
          const { delta, timestamp } = sync.getFrameData();
          if (this.lastUpdated !== timestamp) {
            this.timeDelta = delta;
            this.lastUpdated = timestamp;
            sync__default["default"].postRender(this.scheduleVelocityCheck);
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
        this.scheduleVelocityCheck = () => sync__default["default"].postRender(this.velocityCheck);
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
        return this.canTrackVelocity ? popmotion.velocityPerSecond(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta) : 0;
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
    function motionValue(init) {
      return new MotionValue(init);
    }
    var testValueType = (v) => (type) => type.test(v);
    var auto = {
      test: (v) => v === "auto",
      parse: (v) => v
    };
    var dimensionValueTypes = [styleValueTypes.number, styleValueTypes.px, styleValueTypes.percent, styleValueTypes.degrees, styleValueTypes.vw, styleValueTypes.vh, auto];
    var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));
    var valueTypes = [...dimensionValueTypes, styleValueTypes.color, styleValueTypes.complex];
    var findValueType = (v) => valueTypes.find(testValueType(v));
    function getCurrent(visualElement2) {
      const current = {};
      visualElement2.forEachValue((value, key) => current[key] = value.get());
      return current;
    }
    function getVelocity$1(visualElement2) {
      const velocity = {};
      visualElement2.forEachValue((value, key) => velocity[key] = value.getVelocity());
      return velocity;
    }
    function resolveVariant(visualElement2, definition, custom) {
      const props = visualElement2.getProps();
      return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity$1(visualElement2));
    }
    function setMotionValue(visualElement2, key, value) {
      if (visualElement2.hasValue(key)) {
        visualElement2.getValue(key).set(value);
      } else {
        visualElement2.addValue(key, motionValue(value));
      }
    }
    function setTarget(visualElement2, definition) {
      const resolved = resolveVariant(visualElement2, definition);
      let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {};
      target = { ...target, ...transitionEnd };
      for (const key in target) {
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement2, key, value);
      }
    }
    function setVariants(visualElement2, variantLabels) {
      const reversedLabels = [...variantLabels].reverse();
      reversedLabels.forEach((key) => {
        var _a;
        const variant = visualElement2.getVariant(key);
        variant && setTarget(visualElement2, variant);
        (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
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
      var _a, _b;
      const newValueKeys = Object.keys(target).filter((key) => !visualElement2.hasValue(key));
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
          value = (_b = (_a = origin[key]) !== null && _a !== void 0 ? _a : visualElement2.readValue(key)) !== null && _b !== void 0 ? _b : target[key];
        }
        if (value === void 0 || value === null)
          continue;
        if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
          value = parseFloat(value);
        } else if (!findValueType(value) && styleValueTypes.complex.test(targetValue)) {
          value = getAnimatableNone(key, targetValue);
        }
        visualElement2.addValue(key, motionValue(value));
        if (origin[key] === void 0) {
          origin[key] = value;
        }
        visualElement2.setBaseTarget(key, value);
      }
    }
    function getOriginFromTransition(key, transition) {
      if (!transition)
        return;
      const valueTransition = transition[key] || transition["default"] || transition;
      return valueTransition.from;
    }
    function getOrigin(target, transition, visualElement2) {
      var _a;
      const origin = {};
      for (const key in target) {
        const transitionOrigin = getOriginFromTransition(key, transition);
        origin[key] = transitionOrigin !== void 0 ? transitionOrigin : (_a = visualElement2.getValue(key)) === null || _a === void 0 ? void 0 : _a.get();
      }
      return origin;
    }
    function isWillChangeMotionValue(value) {
      return Boolean(isMotionValue(value) && value.add);
    }
    function animateVisualElement(visualElement2, definition, options = {}) {
      visualElement2.notifyAnimationStart(definition);
      let animation;
      if (Array.isArray(definition)) {
        const animations2 = definition.map((variant) => animateVariant(visualElement2, variant, options));
        animation = Promise.all(animations2);
      } else if (typeof definition === "string") {
        animation = animateVariant(visualElement2, definition, options);
      } else {
        const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
        animation = animateTarget(visualElement2, resolvedDefinition, options);
      }
      return animation.then(() => visualElement2.notifyAnimationComplete(definition));
    }
    function animateVariant(visualElement2, variant, options = {}) {
      var _a;
      const resolved = resolveVariant(visualElement2, variant, options.custom);
      let { transition = visualElement2.getDefaultTransition() || {} } = resolved || {};
      if (options.transitionOverride) {
        transition = options.transitionOverride;
      }
      const getAnimation2 = resolved ? () => animateTarget(visualElement2, resolved, options) : () => Promise.resolve();
      const getChildAnimations = ((_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.size) ? (forwardDelay = 0) => {
        const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
        return animateChildren(visualElement2, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
      } : () => Promise.resolve();
      const { when } = transition;
      if (when) {
        const [first, last] = when === "beforeChildren" ? [getAnimation2, getChildAnimations] : [getChildAnimations, getAnimation2];
        return first().then(last);
      } else {
        return Promise.all([getAnimation2(), getChildAnimations(options.delay)]);
      }
    }
    function animateTarget(visualElement2, definition, { delay: delay2 = 0, transitionOverride, type } = {}) {
      var _a;
      let { transition = visualElement2.getDefaultTransition(), transitionEnd, ...target } = visualElement2.makeTargetAnimatable(definition);
      const willChange = visualElement2.getValue("willChange");
      if (transitionOverride)
        transition = transitionOverride;
      const animations2 = [];
      const animationTypeState = type && ((_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.getState()[type]);
      for (const key in target) {
        const value = visualElement2.getValue(key);
        const valueTarget = target[key];
        if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
          continue;
        }
        let valueTransition = { delay: delay2, ...transition };
        if (visualElement2.shouldReduceMotion && transformProps.has(key)) {
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
        transitionEnd && setTarget(visualElement2, transitionEnd);
      });
    }
    function animateChildren(visualElement2, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
      const animations2 = [];
      const maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
      const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
      Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
        animations2.push(animateVariant(child, variant, {
          ...options,
          delay: delayChildren + generateStaggerDuration(i)
        }).then(() => child.notifyAnimationComplete(variant)));
      });
      return Promise.all(animations2);
    }
    function stopAnimation(visualElement2) {
      visualElement2.forEachValue((value) => value.stop());
    }
    function sortByTreeOrder(a, b) {
      return a.sortNodePosition(b);
    }
    function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
      const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
      needsAnimating[key] = false;
      return shouldBlock;
    }
    var variantPriorityOrder = [
      exports.AnimationType.Animate,
      exports.AnimationType.InView,
      exports.AnimationType.Focus,
      exports.AnimationType.Hover,
      exports.AnimationType.Tap,
      exports.AnimationType.Drag,
      exports.AnimationType.Exit
    ];
    var reversePriorityOrder = [...variantPriorityOrder].reverse();
    var numAnimationTypes = variantPriorityOrder.length;
    function animateList(visualElement2) {
      return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement2, animation, options)));
    }
    function createAnimationState(visualElement2) {
      let animate2 = animateList(visualElement2);
      const state = createState();
      let isInitialRender = true;
      const buildResolvedTypeValues = (acc, definition) => {
        const resolved = resolveVariant(visualElement2, definition);
        if (resolved) {
          const { transition, transitionEnd, ...target } = resolved;
          acc = { ...acc, ...target, ...transitionEnd };
        }
        return acc;
      };
      function setAnimateFunction(makeAnimator) {
        animate2 = makeAnimator(visualElement2);
      }
      function animateChanges(options, changedActiveType) {
        var _a;
        const props = visualElement2.getProps();
        const context = visualElement2.getVariantContext(true) || {};
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
          if (isInherited && isInitialRender && visualElement2.manuallyAnimateOnMount) {
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
          const markToAnimate = (key) => {
            shouldAnimateType = true;
            removedKeys.delete(key);
            typeState.needsAnimating[key] = true;
          };
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
          if (isInitialRender && visualElement2.blockInitialAnimation) {
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
            const fallbackTarget = visualElement2.getBaseTarget(key);
            if (fallbackTarget !== void 0) {
              fallbackAnimation[key] = fallbackTarget;
            }
          });
          animations2.push({ animation: fallbackAnimation });
        }
        let shouldAnimate = Boolean(animations2.length);
        if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
          shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate2(animations2) : Promise.resolve();
      }
      function setActive(type, isActive, options) {
        var _a;
        if (state[type].isActive === isActive)
          return Promise.resolve();
        (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
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
      return {
        animateChanges,
        setActive,
        setAnimateFunction,
        getState: () => state
      };
    }
    function checkVariantsDidChange(prev, next) {
      if (typeof next === "string") {
        return next !== prev;
      } else if (Array.isArray(next)) {
        return !shallowCompare(next, prev);
      }
      return false;
    }
    function createTypeState(isActive = false) {
      return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
      };
    }
    function createState() {
      return {
        [exports.AnimationType.Animate]: createTypeState(true),
        [exports.AnimationType.InView]: createTypeState(),
        [exports.AnimationType.Hover]: createTypeState(),
        [exports.AnimationType.Tap]: createTypeState(),
        [exports.AnimationType.Drag]: createTypeState(),
        [exports.AnimationType.Focus]: createTypeState(),
        [exports.AnimationType.Exit]: createTypeState()
      };
    }
    var animations = {
      animation: makeRenderlessComponent(({ visualElement: visualElement2, animate: animate2 }) => {
        visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
        if (isAnimationControls(animate2)) {
          React2.useEffect(() => animate2.subscribe(visualElement2), [animate2]);
        }
      }),
      exit: makeRenderlessComponent((props) => {
        const { custom, visualElement: visualElement2 } = props;
        const [isPresent2, safeToRemove] = usePresence();
        const presenceContext = React2.useContext(PresenceContext);
        React2.useEffect(() => {
          visualElement2.isPresent = isPresent2;
          const animation = visualElement2.animationState && visualElement2.animationState.setActive(exports.AnimationType.Exit, !isPresent2, {
            custom: presenceContext && presenceContext.custom || custom
          });
          if (animation && !isPresent2) {
            animation.then(safeToRemove);
          }
        }, [isPresent2]);
      })
    };
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
          const isDistancePastThreshold = popmotion.distance(info2.offset, { x: 0, y: 0 }) >= 3;
          if (!isPanStarted && !isDistancePastThreshold)
            return;
          const { point: point2 } = info2;
          const { timestamp: timestamp2 } = sync.getFrameData();
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
          sync__default["default"].update(this.updatePoint, true);
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
        const { timestamp } = sync.getFrameData();
        this.history = [{ ...point, timestamp }];
        const { onSessionStart } = handlers;
        onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
        this.removeListeners = popmotion.pipe(addPointerEvent(window, "pointermove", this.handlePointerMove), addPointerEvent(window, "pointerup", this.handlePointerUp), addPointerEvent(window, "pointercancel", this.handlePointerUp));
      }
      updateHandlers(handlers) {
        this.handlers = handlers;
      }
      end() {
        this.removeListeners && this.removeListeners();
        sync.cancelSync.update(this.updatePoint);
      }
    };
    function transformPoint(info, transformPagePoint) {
      return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
    }
    function subtractPoint(a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }
    function getPanInfo({ point }, history) {
      return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity(history, 0.1)
      };
    }
    function startDevicePoint(history) {
      return history[0];
    }
    function lastDevicePoint(history) {
      return history[history.length - 1];
    }
    function getVelocity(history, timeDelta) {
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
    function calcLength(axis) {
      return axis.max - axis.min;
    }
    function isNear(value, target = 0, maxDistance = 0.01) {
      return popmotion.distance(value, target) < maxDistance;
    }
    function calcAxisDelta(delta, source, target, origin = 0.5) {
      delta.origin = origin;
      delta.originPoint = popmotion.mix(source.min, source.max, delta.origin);
      delta.scale = calcLength(target) / calcLength(source);
      if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
        delta.scale = 1;
      delta.translate = popmotion.mix(target.min, target.max, delta.origin) - delta.originPoint;
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
    function applyConstraints(point, { min, max }, elastic) {
      if (min !== void 0 && point < min) {
        point = elastic ? popmotion.mix(min, point, elastic.min) : Math.max(point, min);
      } else if (max !== void 0 && point > max) {
        point = elastic ? popmotion.mix(max, point, elastic.max) : Math.min(point, max);
      }
      return point;
    }
    function calcRelativeAxisConstraints(axis, min, max) {
      return {
        min: min !== void 0 ? axis.min + min : void 0,
        max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
      };
    }
    function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
      return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
      };
    }
    function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
      let min = constraintsAxis.min - layoutAxis.min;
      let max = constraintsAxis.max - layoutAxis.max;
      if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
        [min, max] = [max, min];
      }
      return { min, max };
    }
    function calcViewportConstraints(layoutBox, constraintsBox) {
      return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
      };
    }
    function calcOrigin(source, target) {
      let origin = 0.5;
      const sourceLength = calcLength(source);
      const targetLength = calcLength(target);
      if (targetLength > sourceLength) {
        origin = popmotion.progress(target.min, target.max - sourceLength, source.min);
      } else if (sourceLength > targetLength) {
        origin = popmotion.progress(source.min, source.max - targetLength, target.min);
      }
      return popmotion.clamp(0, 1, origin);
    }
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
    var createAxisDelta = () => ({
      translate: 0,
      scale: 1,
      origin: 0,
      originPoint: 0
    });
    var createDelta = () => ({
      x: createAxisDelta(),
      y: createAxisDelta()
    });
    var createAxis = () => ({ min: 0, max: 0 });
    var createBox = () => ({
      x: createAxis(),
      y: createAxis()
    });
    function eachAxis(callback) {
      return [callback("x"), callback("y")];
    }
    function convertBoundingBoxToBox({ top, left, right, bottom }) {
      return {
        x: { min: left, max: right },
        y: { min: top, max: bottom }
      };
    }
    function convertBoxToBoundingBox({ x, y }) {
      return { top: y.min, right: x.max, bottom: y.max, left: x.min };
    }
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
    function isIdentityScale(scale) {
      return scale === void 0 || scale === 1;
    }
    function hasScale({ scale, scaleX, scaleY }) {
      return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
    }
    function hasTransform(values) {
      return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY;
    }
    function has2DTranslate(values) {
      return is2DTranslate(values.x) || is2DTranslate(values.y);
    }
    function is2DTranslate(value) {
      return value && value !== "0%";
    }
    function scalePoint(point, scale, originPoint) {
      const distanceFromOrigin = point - originPoint;
      const scaled = scale * distanceFromOrigin;
      return originPoint + scaled;
    }
    function applyPointDelta(point, translate, scale, originPoint, boxScale) {
      if (boxScale !== void 0) {
        point = scalePoint(point, boxScale, originPoint);
      }
      return scalePoint(point, scale, originPoint) + translate;
    }
    function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
      axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
      axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
    }
    function applyBoxDelta(box, { x, y }) {
      applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
      applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
    }
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
    function translateAxis(axis, distance) {
      axis.min = axis.min + distance;
      axis.max = axis.max + distance;
    }
    function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
      const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
      const originPoint = popmotion.mix(axis.min, axis.max, axisOrigin);
      applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
    }
    var xKeys$1 = ["x", "scaleX", "originX"];
    var yKeys$1 = ["y", "scaleY", "originY"];
    function transformBox(box, transform2) {
      transformAxis(box.x, transform2, xKeys$1);
      transformAxis(box.y, transform2, yKeys$1);
    }
    function measureViewportBox(instance, transformPoint2) {
      return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
    }
    function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
      const viewportBox = measureViewportBox(element, transformPagePoint);
      const { scroll } = rootProjectionNode2;
      if (scroll) {
        translateAxis(viewportBox.x, scroll.x);
        translateAxis(viewportBox.y, scroll.y);
      }
      return viewportBox;
    }
    var elementDragControls = /* @__PURE__ */ new WeakMap();
    var VisualElementDragControls = class {
      constructor(visualElement2) {
        this.openGlobalLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = { x: 0, y: 0 };
        this.constraints = false;
        this.hasMutatedConstraints = false;
        this.elastic = createBox();
        this.visualElement = visualElement2;
      }
      start(originEvent, { snapToCursor = false } = {}) {
        if (this.visualElement.isPresent === false)
          return;
        const onSessionStart = (event) => {
          this.stopAnimation();
          if (snapToCursor) {
            this.snapToCursor(extractEventInfo(event, "page").point);
          }
        };
        const onStart = (event, info) => {
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
            if (styleValueTypes.percent.test(current)) {
              const measuredAxis = (_b = (_a2 = this.visualElement.projection) === null || _a2 === void 0 ? void 0 : _a2.layout) === null || _b === void 0 ? void 0 : _b.actual[axis];
              if (measuredAxis) {
                const length = calcLength(measuredAxis);
                current = length * (parseFloat(current) / 100);
              }
            }
            this.originPoint[axis] = current;
          });
          onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
          (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(exports.AnimationType.Drag, true);
        };
        const onMove = (event, info) => {
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
          this.visualElement.syncRender();
          onDrag === null || onDrag === void 0 ? void 0 : onDrag(event, info);
        };
        const onSessionEnd = (event, info) => this.stop(event, info);
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
        (_b = this.visualElement.animationState) === null || _b === void 0 ? void 0 : _b.setActive(exports.AnimationType.Drag, false);
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
            this.constraints = calcRelativeConstraints(layout.actual, dragConstraints);
          } else {
            this.constraints = false;
          }
        }
        this.elastic = resolveDragElastic(dragElastic);
        if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) {
          eachAxis((axis) => {
            if (this.getAxisMotionValue(axis)) {
              this.constraints[axis] = rebaseAxisConstraints(layout.actual[axis], this.constraints[axis]);
            }
          });
        }
      }
      resolveRefConstraints() {
        const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
        if (!constraints || !isRefObject(constraints))
          return false;
        const constraintsElement = constraints.current;
        heyListen.invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        const { projection } = this.visualElement;
        if (!projection || !projection.layout)
          return false;
        const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        let measuredConstraints = calcViewportConstraints(projection.layout.actual, constraintsBox);
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
          const inertia = {
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
          return this.startAxisValueAnimation(axis, inertia);
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
            const { min, max } = projection.layout.actual[axis];
            axisValue.set(point[axis] - popmotion.mix(min, max, 0.5));
          }
        });
      }
      scalePositionWithinConstraints() {
        var _a;
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
            boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
          }
        });
        const { transformTemplate } = this.visualElement.getProps();
        this.visualElement.getInstance().style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        (_a = projection.root) === null || _a === void 0 ? void 0 : _a.updateScroll();
        projection.updateLayout();
        this.resolveConstraints();
        eachAxis((axis) => {
          if (!shouldDrag(axis, drag2, null))
            return;
          const axisValue = this.getAxisMotionValue(axis);
          const { min, max } = this.constraints[axis];
          axisValue.set(popmotion.mix(min, max, boxProgress[axis]));
        });
      }
      addListeners() {
        var _a;
        elementDragControls.set(this.visualElement, this);
        const element = this.visualElement.getInstance();
        const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
          const { drag: drag2, dragListener = true } = this.getProps();
          drag2 && dragListener && this.start(event);
        });
        const measureDragConstraints = () => {
          const { dragConstraints } = this.getProps();
          if (isRefObject(dragConstraints)) {
            this.constraints = this.resolveRefConstraints();
          }
        };
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
            this.visualElement.syncRender();
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
    function shouldDrag(direction, drag2, currentDirection) {
      return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
    }
    function getCurrentDirection(offset, lockThreshold = 10) {
      let direction = null;
      if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
      } else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
      }
      return direction;
    }
    function useDrag(props) {
      const { dragControls: groupDragControls, visualElement: visualElement2 } = props;
      const dragControls = useConstant(() => new VisualElementDragControls(visualElement2));
      React2.useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
      React2.useEffect(() => dragControls.addListeners(), [dragControls]);
    }
    function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement: visualElement2 }) {
      const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
      const panSession = React2.useRef(null);
      const { transformPagePoint } = React2.useContext(MotionConfigContext);
      const handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
          panSession.current = null;
          onPanEnd && onPanEnd(event, info);
        }
      };
      React2.useEffect(() => {
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
      useUnmountEffect(() => panSession.current && panSession.current.end());
    }
    var drag = {
      pan: makeRenderlessComponent(usePanGesture),
      drag: makeRenderlessComponent(useDrag)
    };
    var prefersReducedMotion = { current: null };
    var hasReducedMotionListener = { current: false };
    function initPrefersReducedMotion() {
      hasReducedMotionListener.current = true;
      if (!isBrowser)
        return;
      if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
        motionMediaQuery.addListener(setReducedMotionPreferences);
        setReducedMotionPreferences();
      } else {
        prefersReducedMotion.current = false;
      }
    }
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
      const managers = names.map(() => new SubscriptionManager());
      const propSubscriptions = {};
      const lifecycles = {
        clearAllListeners: () => managers.forEach((manager) => manager.clear()),
        updatePropListeners: (props) => {
          names.forEach((name) => {
            var _a;
            const on = "on" + name;
            const propListener = props[on];
            (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
            if (propListener) {
              propSubscriptions[name] = lifecycles[on](propListener);
            }
          });
        }
      };
      managers.forEach((manager, i) => {
        lifecycles["on" + names[i]] = (handler) => manager.add(handler);
        lifecycles["notify" + names[i]] = (...args) => manager.notify(...args);
      });
      return lifecycles;
    }
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
            warnOnce(nextValue.version === "7.6.2", `Attempting to mix Framer Motion versions ${nextValue.version} with 7.6.2 may not work as expected.`);
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
    var featureNames = Object.keys(featureDefinitions);
    var numFeatures = featureNames.length;
    var visualElement = ({ treeType = "", build, getBaseTarget, makeTargetAnimatable, measureViewportBox: measureViewportBox2, render: renderInstance, readValueFromInstance, removeValueFromRenderState, sortNodePosition, scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2 }) => ({ parent, props, presenceId, blockInitialAnimation, visualState, reducedMotionConfig }, options = {}) => {
      let isMounted = false;
      const { latestValues, renderState } = visualState;
      let instance;
      const lifecycles = createLifecycles();
      const values = /* @__PURE__ */ new Map();
      const valueSubscriptions = /* @__PURE__ */ new Map();
      let prevMotionValues = {};
      const baseTarget = {
        ...latestValues
      };
      const initialValues = props.initial ? { ...latestValues } : {};
      let removeFromVariantTree;
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
      function bindToMotionValue(key, value) {
        const removeOnChange = value.onChange((latestValue) => {
          latestValues[key] = latestValue;
          props.onUpdate && sync__default["default"].update(update, false, true);
        });
        const removeOnRenderRequest = value.onRenderRequest(element.scheduleRender);
        valueSubscriptions.set(key, () => {
          removeOnChange();
          removeOnRenderRequest();
        });
      }
      const { willChange, ...initialMotionValues } = scrapeMotionValuesFromProps2(props);
      for (const key in initialMotionValues) {
        const value = initialMotionValues[key];
        if (latestValues[key] !== void 0 && isMotionValue(value)) {
          value.set(latestValues[key], false);
          if (isWillChangeMotionValue(willChange)) {
            willChange.add(key);
          }
        }
      }
      if (props.values) {
        for (const key in props.values) {
          const value = props.values[key];
          if (latestValues[key] !== void 0 && isMotionValue(value)) {
            value.set(latestValues[key]);
          }
        }
      }
      const isControllingVariants$1 = isControllingVariants(props);
      const isVariantNode$1 = isVariantNode(props);
      const element = {
        treeType,
        current: null,
        depth: parent ? parent.depth + 1 : 0,
        parent,
        children: /* @__PURE__ */ new Set(),
        presenceId,
        shouldReduceMotion: null,
        variantChildren: isVariantNode$1 ? /* @__PURE__ */ new Set() : void 0,
        isVisible: void 0,
        manuallyAnimateOnMount: Boolean(parent === null || parent === void 0 ? void 0 : parent.isMounted()),
        blockInitialAnimation,
        isMounted: () => Boolean(instance),
        mount(newInstance) {
          isMounted = true;
          instance = element.current = newInstance;
          if (element.projection) {
            element.projection.mount(newInstance);
          }
          if (isVariantNode$1 && parent && !isControllingVariants$1) {
            removeFromVariantTree = parent === null || parent === void 0 ? void 0 : parent.addVariantChild(element);
          }
          values.forEach((value, key) => bindToMotionValue(key, value));
          if (!hasReducedMotionListener.current) {
            initPrefersReducedMotion();
          }
          element.shouldReduceMotion = reducedMotionConfig === "never" ? false : reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
          parent === null || parent === void 0 ? void 0 : parent.children.add(element);
          element.setProps(props);
        },
        unmount() {
          var _a;
          (_a = element.projection) === null || _a === void 0 ? void 0 : _a.unmount();
          sync.cancelSync.update(update);
          sync.cancelSync.render(render);
          valueSubscriptions.forEach((remove) => remove());
          removeFromVariantTree === null || removeFromVariantTree === void 0 ? void 0 : removeFromVariantTree();
          parent === null || parent === void 0 ? void 0 : parent.children.delete(element);
          lifecycles.clearAllListeners();
          instance = void 0;
          isMounted = false;
        },
        loadFeatures(renderedProps, isStrict, preloadedFeatures, projectionId, ProjectionNodeConstructor, initialLayoutGroupConfig) {
          const features = [];
          if (env !== "production" && preloadedFeatures && isStrict) {
            heyListen.invariant(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
          }
          for (let i = 0; i < numFeatures; i++) {
            const name = featureNames[i];
            const { isEnabled, Component } = featureDefinitions[name];
            if (isEnabled(renderedProps) && Component) {
              features.push(React2.createElement(Component, {
                key: name,
                ...renderedProps,
                visualElement: element
              }));
            }
          }
          if (!element.projection && ProjectionNodeConstructor) {
            element.projection = new ProjectionNodeConstructor(projectionId, element.getLatestValues(), parent && parent.projection);
            const { layoutId, layout, drag: drag2, dragConstraints, layoutScroll } = renderedProps;
            element.projection.setOptions({
              layoutId,
              layout,
              alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
              visualElement: element,
              scheduleRender: () => element.scheduleRender(),
              animationType: typeof layout === "string" ? layout : "both",
              initialPromotionConfig: initialLayoutGroupConfig,
              layoutScroll
            });
          }
          return features;
        },
        addVariantChild(child) {
          var _a;
          const closestVariantNode = element.getClosestVariantNode();
          if (closestVariantNode) {
            (_a = closestVariantNode.variantChildren) === null || _a === void 0 ? void 0 : _a.add(child);
            return () => closestVariantNode.variantChildren.delete(child);
          }
        },
        sortNodePosition(other) {
          if (!sortNodePosition || treeType !== other.treeType)
            return 0;
          return sortNodePosition(element.getInstance(), other.getInstance());
        },
        getClosestVariantNode: () => isVariantNode$1 ? element : parent === null || parent === void 0 ? void 0 : parent.getClosestVariantNode(),
        getLayoutId: () => props.layoutId,
        getInstance: () => instance,
        getStaticValue: (key) => latestValues[key],
        setStaticValue: (key, value) => latestValues[key] = value,
        getLatestValues: () => latestValues,
        setVisibility(visibility) {
          if (element.isVisible === visibility)
            return;
          element.isVisible = visibility;
          element.scheduleRender();
        },
        makeTargetAnimatable(target, canMutate = true) {
          return makeTargetAnimatable(element, target, props, canMutate);
        },
        measureViewportBox() {
          return measureViewportBox2(instance, props);
        },
        addValue(key, value) {
          if (element.hasValue(key))
            element.removeValue(key);
          values.set(key, value);
          latestValues[key] = value.get();
          bindToMotionValue(key, value);
        },
        removeValue(key) {
          var _a;
          values.delete(key);
          (_a = valueSubscriptions.get(key)) === null || _a === void 0 ? void 0 : _a();
          valueSubscriptions.delete(key);
          delete latestValues[key];
          removeValueFromRenderState(key, renderState);
        },
        hasValue: (key) => values.has(key),
        getValue(key, defaultValue) {
          if (props.values && props.values[key]) {
            return props.values[key];
          }
          let value = values.get(key);
          if (value === void 0 && defaultValue !== void 0) {
            value = motionValue(defaultValue);
            element.addValue(key, value);
          }
          return value;
        },
        forEachValue: (callback) => values.forEach(callback),
        readValue: (key) => latestValues[key] !== void 0 ? latestValues[key] : readValueFromInstance(instance, key, options),
        setBaseTarget(key, value) {
          baseTarget[key] = value;
        },
        getBaseTarget(key) {
          var _a;
          const { initial } = props;
          const valueFromInitial = typeof initial === "string" || typeof initial === "object" ? (_a = resolveVariantFromProps(props, initial)) === null || _a === void 0 ? void 0 : _a[key] : void 0;
          if (initial && valueFromInitial !== void 0) {
            return valueFromInitial;
          }
          if (getBaseTarget) {
            const target = getBaseTarget(props, key);
            if (target !== void 0 && !isMotionValue(target))
              return target;
          }
          return initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : baseTarget[key];
        },
        ...lifecycles,
        build() {
          triggerBuild();
          return renderState;
        },
        scheduleRender() {
          sync__default["default"].render(render, false, true);
        },
        syncRender: render,
        setProps(newProps) {
          if (newProps.transformTemplate || props.transformTemplate) {
            element.scheduleRender();
          }
          props = newProps;
          lifecycles.updatePropListeners(newProps);
          prevMotionValues = updateMotionValuesFromProps(element, scrapeMotionValuesFromProps2(props), prevMotionValues);
        },
        getProps: () => props,
        getVariant: (name) => {
          var _a;
          return (_a = props.variants) === null || _a === void 0 ? void 0 : _a[name];
        },
        getDefaultTransition: () => props.transition,
        getTransformPagePoint: () => {
          return props.transformPagePoint;
        },
        getVariantContext(startAtParent = false) {
          if (startAtParent)
            return parent === null || parent === void 0 ? void 0 : parent.getVariantContext();
          if (!isControllingVariants$1) {
            const context2 = (parent === null || parent === void 0 ? void 0 : parent.getVariantContext()) || {};
            if (props.initial !== void 0) {
              context2.initial = props.initial;
            }
            return context2;
          }
          const context = {};
          for (let i = 0; i < numVariantProps; i++) {
            const name = variantProps[i];
            const prop = props[name];
            if (isVariantLabel(prop) || prop === false) {
              context[name] = prop;
            }
          }
          return context;
        }
      };
      return element;
    };
    var variantProps = ["initial", ...variantPriorityOrder];
    var numVariantProps = variantProps.length;
    function isCSSVariable(value) {
      return typeof value === "string" && value.startsWith("var(--");
    }
    var cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
    function parseCSSVariable(current) {
      const match = cssVariableRegex.exec(current);
      if (!match)
        return [,];
      const [, token, fallback] = match;
      return [token, fallback];
    }
    var maxDepth = 4;
    function getVariableValue(current, element, depth = 1) {
      heyListen.invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
      const [token, fallback] = parseCSSVariable(current);
      if (!token)
        return;
      const resolved = window.getComputedStyle(element).getPropertyValue(token);
      if (resolved) {
        return resolved.trim();
      } else if (isCSSVariable(fallback)) {
        return getVariableValue(fallback, element, depth + 1);
      } else {
        return fallback;
      }
    }
    function resolveCSSVariables(visualElement2, { ...target }, transitionEnd) {
      const element = visualElement2.getInstance();
      if (!(element instanceof Element))
        return { target, transitionEnd };
      if (transitionEnd) {
        transitionEnd = { ...transitionEnd };
      }
      visualElement2.forEachValue((value) => {
        const current = value.get();
        if (!isCSSVariable(current))
          return;
        const resolved = getVariableValue(current, element);
        if (resolved)
          value.set(resolved);
      });
      for (const key in target) {
        const current = target[key];
        if (!isCSSVariable(current))
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
    var isPositionalKey = (key) => positionalKeys.has(key);
    var hasPositionalKey = (target) => {
      return Object.keys(target).some(isPositionalKey);
    };
    var setAndResetVelocity = (value, to) => {
      value.set(to, false);
      value.set(to);
    };
    var isNumOrPxType = (v) => v === styleValueTypes.number || v === styleValueTypes.px;
    var BoundingBoxDimension;
    (function(BoundingBoxDimension2) {
      BoundingBoxDimension2["width"] = "width";
      BoundingBoxDimension2["height"] = "height";
      BoundingBoxDimension2["left"] = "left";
      BoundingBoxDimension2["right"] = "right";
      BoundingBoxDimension2["top"] = "top";
      BoundingBoxDimension2["bottom"] = "bottom";
    })(BoundingBoxDimension || (BoundingBoxDimension = {}));
    var getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
    var getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform: transform2 }) => {
      if (transform2 === "none" || !transform2)
        return 0;
      const matrix3d = transform2.match(/^matrix3d\((.+)\)$/);
      if (matrix3d) {
        return getPosFromMatrix(matrix3d[1], pos3);
      } else {
        const matrix = transform2.match(/^matrix\((.+)\)$/);
        if (matrix) {
          return getPosFromMatrix(matrix[1], pos2);
        } else {
          return 0;
        }
      }
    };
    var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
    var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
    function removeNonTranslationalTransform(visualElement2) {
      const removedTransforms = [];
      nonTranslationalTransformKeys.forEach((key) => {
        const value = visualElement2.getValue(key);
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
      width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
      height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
      top: (_bbox, { top }) => parseFloat(top),
      left: (_bbox, { left }) => parseFloat(left),
      bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
      right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
      x: getTranslateFromMatrix(4, 13),
      y: getTranslateFromMatrix(5, 14)
    };
    var convertChangedValueTypes = (target, visualElement2, changedKeys) => {
      const originBbox = visualElement2.measureViewportBox();
      const element = visualElement2.getInstance();
      const elementComputedStyle = getComputedStyle(element);
      const { display } = elementComputedStyle;
      const origin = {};
      if (display === "none") {
        visualElement2.setStaticValue("display", target.display || "block");
      }
      changedKeys.forEach((key) => {
        origin[key] = positionalValues[key](originBbox, elementComputedStyle);
      });
      visualElement2.syncRender();
      const targetBbox = visualElement2.measureViewportBox();
      changedKeys.forEach((key) => {
        const value = visualElement2.getValue(key);
        setAndResetVelocity(value, origin[key]);
        target[key] = positionalValues[key](targetBbox, elementComputedStyle);
      });
      return target;
    };
    var checkAndConvertChangedValueTypes = (visualElement2, target, origin = {}, transitionEnd = {}) => {
      target = { ...target };
      transitionEnd = { ...transitionEnd };
      const targetPositionalKeys = Object.keys(target).filter(isPositionalKey);
      let removedTransformValues = [];
      let hasAttemptedToRemoveTransformValues = false;
      const changedValueTypeKeys = [];
      targetPositionalKeys.forEach((key) => {
        const value = visualElement2.getValue(key);
        if (!visualElement2.hasValue(key))
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
              heyListen.invariant(toType === fromType || isNumOrPxType(fromType) && isNumOrPxType(toType), "Keyframes must be of the same dimension as the current value");
            } else {
              heyListen.invariant(findDimensionValueType(to[i]) === toType, "All keyframes must be of the same type");
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
            } else if (Array.isArray(to) && toType === styleValueTypes.px) {
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
        const scrollY = changedValueTypeKeys.indexOf("height") >= 0 ? window.pageYOffset : null;
        const convertedTarget = convertChangedValueTypes(target, visualElement2, changedValueTypeKeys);
        if (removedTransformValues.length) {
          removedTransformValues.forEach(([key, value]) => {
            visualElement2.getValue(key).set(value);
          });
        }
        visualElement2.syncRender();
        if (isBrowser && scrollY !== null) {
          window.scrollTo({ top: scrollY });
        }
        return { target: convertedTarget, transitionEnd };
      } else {
        return { target, transitionEnd };
      }
    };
    function unitConversion(visualElement2, target, origin, transitionEnd) {
      return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
    }
    var parseDomVariant = (visualElement2, target, origin, transitionEnd) => {
      const resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
      target = resolved.target;
      transitionEnd = resolved.transitionEnd;
      return unitConversion(visualElement2, target, origin, transitionEnd);
    };
    function getComputedStyle$1(element) {
      return window.getComputedStyle(element);
    }
    var htmlConfig = {
      treeType: "dom",
      readValueFromInstance(domElement, key) {
        if (transformProps.has(key)) {
          const defaultType = getDefaultValueType(key);
          return defaultType ? defaultType.default || 0 : 0;
        } else {
          const computedStyle = getComputedStyle$1(domElement);
          const value = (isCSSVariable$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
          return typeof value === "string" ? value.trim() : value;
        }
      },
      sortNodePosition(a, b) {
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
      },
      getBaseTarget(props, key) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
      },
      measureViewportBox(element, { transformPagePoint }) {
        return measureViewportBox(element, transformPagePoint);
      },
      resetTransform(element, domElement, props) {
        const { transformTemplate } = props;
        domElement.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
        element.scheduleRender();
      },
      restoreTransform(instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
      },
      removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
      },
      makeTargetAnimatable(element, { transition, transitionEnd, ...target }, { transformValues }, isMounted = true) {
        let origin = getOrigin(target, transition || {}, element);
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
          const parsed = parseDomVariant(element, target, origin, transitionEnd);
          transitionEnd = parsed.transitionEnd;
          target = parsed.target;
        }
        return {
          transition,
          transitionEnd,
          ...target
        };
      },
      scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
      build(element, renderState, latestValues, options, props) {
        if (element.isVisible !== void 0) {
          renderState.style.visibility = element.isVisible ? "visible" : "hidden";
        }
        buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
      },
      render: renderHTML
    };
    var htmlVisualElement = visualElement(htmlConfig);
    var svgVisualElement = visualElement({
      ...htmlConfig,
      getBaseTarget(props, key) {
        return props[key];
      },
      readValueFromInstance(domElement, key) {
        var _a;
        if (transformProps.has(key)) {
          return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
        }
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return domElement.getAttribute(key);
      },
      scrapeMotionValuesFromProps,
      build(_element, renderState, latestValues, options, props) {
        buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
      },
      render: renderSVG
    });
    var createDomVisualElement = (Component, options) => {
      return isSVGComponent(Component) ? svgVisualElement(options, { enableHardwareAcceleration: false }) : htmlVisualElement(options, { enableHardwareAcceleration: true });
    };
    function pixelsToPercent(pixels, axis) {
      if (axis.max === axis.min)
        return 0;
      return pixels / (axis.max - axis.min) * 100;
    }
    var correctBorderRadius = {
      correct: (latest, node) => {
        if (!node.target)
          return latest;
        if (typeof latest === "string") {
          if (styleValueTypes.px.test(latest)) {
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
        const shadow = styleValueTypes.complex.parse(latest);
        if (shadow.length > 5)
          return original;
        const template = styleValueTypes.complex.createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        const averageScale = popmotion.mix(xScale, yScale, 0.5);
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
    var MeasureLayoutWithContext = class extends React__default["default"].Component {
      componentDidMount() {
        const { visualElement: visualElement2, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        const { projection } = visualElement2;
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
        const { layoutDependency, visualElement: visualElement2, drag: drag2, isPresent: isPresent2 } = this.props;
        const projection = visualElement2.projection;
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
            sync__default["default"].postRender(() => {
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
        const { visualElement: visualElement2, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
        const { projection } = visualElement2;
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
    function MeasureLayout(props) {
      const [isPresent2, safeToRemove] = usePresence();
      const layoutGroup = React2.useContext(LayoutGroupContext);
      return React__default["default"].createElement(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: React2.useContext(SwitchLayoutGroupContext), isPresent: isPresent2, safeToRemove });
    }
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
    var layoutFeatures = {
      measureLayout: MeasureLayout
    };
    function animate(from, to, transition = {}) {
      const value = isMotionValue(from) ? from : motionValue(from);
      startAnimation("", value, to, transition);
      return {
        stop: () => value.stop(),
        isAnimating: () => value.isAnimating()
      };
    }
    var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
    var numBorders = borders.length;
    var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
    var isPx = (value) => typeof value === "number" || styleValueTypes.px.test(value);
    function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
      var _a, _b, _c, _d;
      if (shouldCrossfadeOpacity) {
        target.opacity = popmotion.mix(
          0,
          (_a = lead.opacity) !== null && _a !== void 0 ? _a : 1,
          easeCrossfadeIn(progress)
        );
        target.opacityExit = popmotion.mix((_b = follow.opacity) !== null && _b !== void 0 ? _b : 1, 0, easeCrossfadeOut(progress));
      } else if (isOnlyMember) {
        target.opacity = popmotion.mix((_c = follow.opacity) !== null && _c !== void 0 ? _c : 1, (_d = lead.opacity) !== null && _d !== void 0 ? _d : 1, progress);
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
          target[borderLabel] = Math.max(popmotion.mix(asNumber(followRadius), asNumber(leadRadius), progress), 0);
          if (styleValueTypes.percent.test(leadRadius) || styleValueTypes.percent.test(followRadius)) {
            target[borderLabel] += "%";
          }
        } else {
          target[borderLabel] = leadRadius;
        }
      }
      if (follow.rotate || lead.rotate) {
        target.rotate = popmotion.mix(follow.rotate || 0, lead.rotate || 0, progress);
      }
    }
    function getRadius(values, radiusName) {
      var _a;
      return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
    }
    var easeCrossfadeIn = compress(0, 0.5, popmotion.circOut);
    var easeCrossfadeOut = compress(0.5, 0.95, popmotion.linear);
    function compress(min, max, easing) {
      return (p) => {
        if (p < min)
          return 0;
        if (p > max)
          return 1;
        return easing(popmotion.progress(min, max, p));
      };
    }
    function copyAxisInto(axis, originAxis) {
      axis.min = originAxis.min;
      axis.max = originAxis.max;
    }
    function copyBoxInto(box, originBox) {
      copyAxisInto(box.x, originBox.x);
      copyAxisInto(box.y, originBox.y);
    }
    function removePointDelta(point, translate, scale, originPoint, boxScale) {
      point -= translate;
      point = scalePoint(point, 1 / scale, originPoint);
      if (boxScale !== void 0) {
        point = scalePoint(point, 1 / boxScale, originPoint);
      }
      return point;
    }
    function removeAxisDelta(axis, translate = 0, scale = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
      if (styleValueTypes.percent.test(translate)) {
        translate = parseFloat(translate);
        const relativeProgress = popmotion.mix(sourceAxis.min, sourceAxis.max, translate / 100);
        translate = relativeProgress - sourceAxis.min;
      }
      if (typeof translate !== "number")
        return;
      let originPoint = popmotion.mix(originAxis.min, originAxis.max, origin);
      if (axis === originAxis)
        originPoint -= translate;
      axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
      axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
    }
    function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
      removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
    }
    var xKeys = ["x", "scaleX", "originX"];
    var yKeys = ["y", "scaleY", "originY"];
    function removeBoxTransforms(box, transforms, originBox, sourceBox) {
      removeAxisTransforms(box.x, transforms, xKeys, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
      removeAxisTransforms(box.y, transforms, yKeys, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
    }
    function isAxisDeltaZero(delta) {
      return delta.translate === 0 && delta.scale === 1;
    }
    function isDeltaZero(delta) {
      return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
    }
    function boxEquals(a, b) {
      return a.x.min === b.x.min && a.x.max === b.x.max && a.y.min === b.y.min && a.y.max === b.y.max;
    }
    function aspectRatio(box) {
      return calcLength(box.x) / calcLength(box.y);
    }
    function isCloseTo(a, b, max = 0.1) {
      return popmotion.distance(a, b) <= max;
    }
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
    var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)";
    function buildProjectionTransform(delta, treeScale, latestTransform) {
      const xTranslate = delta.x.translate / treeScale.x;
      const yTranslate = delta.y.translate / treeScale.y;
      let transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
      transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
      if (latestTransform) {
        const { rotate, rotateX, rotateY } = latestTransform;
        if (rotate)
          transform2 += `rotate(${rotate}deg) `;
        if (rotateX)
          transform2 += `rotateX(${rotateX}deg) `;
        if (rotateY)
          transform2 += `rotateY(${rotateY}deg) `;
      }
      const elementScaleX = delta.x.scale * treeScale.x;
      const elementScaleY = delta.y.scale * treeScale.y;
      transform2 += `scale(${elementScaleX}, ${elementScaleY})`;
      return transform2 === identityProjection ? "none" : transform2;
    }
    var compareByDepth = (a, b) => a.depth - b.depth;
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
    var transformAxes = ["", "X", "Y", "Z"];
    var animationTarget = 1e3;
    function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
      return class ProjectionNode {
        constructor(id2, latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
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
          this.id = id2;
          this.latestValues = latestValues;
          this.root = parent ? parent.root || parent : this;
          this.path = parent ? [...parent.path, parent] : [];
          this.parent = parent;
          this.depth = parent ? parent.depth + 1 : 0;
          id2 && this.root.registerPotentialNode(id2, this);
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
          const { layoutId, layout, visualElement: visualElement2 } = this.options;
          if (visualElement2 && !visualElement2.getInstance()) {
            visualElement2.mount(instance);
          }
          this.root.nodes.add(this);
          (_a = this.parent) === null || _a === void 0 ? void 0 : _a.children.add(this);
          this.id && this.root.potentialNodes.delete(this.id);
          if (isLayoutDirty && (layout || layoutId)) {
            this.isLayoutDirty = true;
          }
          if (attachResizeListener) {
            let cancelDelay;
            const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
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
          if (this.options.animate !== false && visualElement2 && (layoutId || layout)) {
            this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeTargetChanged, layout: newLayout }) => {
              var _a2, _b, _c, _d, _e;
              if (this.isTreeAnimationBlocked()) {
                this.target = void 0;
                this.relativeTarget = void 0;
                return;
              }
              const layoutTransition = (_b = (_a2 = this.options.transition) !== null && _a2 !== void 0 ? _a2 : visualElement2.getDefaultTransition()) !== null && _b !== void 0 ? _b : defaultLayoutTransition;
              const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement2.getProps();
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
                if (visualElement2.shouldReduceMotion) {
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
          sync.cancelSync.preRender(this.updateProjection);
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
          sync.flushSync.update();
          sync.flushSync.preRender();
          sync.flushSync.render();
        }
        clearAllSnapshots() {
          this.nodes.forEach(clearSnapshot);
          this.sharedNodes.forEach(removeLeadSnapshots);
        }
        scheduleUpdateProjection() {
          sync__default["default"].preRender(this.updateProjection, false, true);
        }
        scheduleCheckAfterUnmount() {
          sync__default["default"].postRender(() => {
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
          const measured = this.measure();
          const layout = this.removeTransform(this.removeElementScroll(measured));
          roundBox(layout);
          this.snapshot = {
            measured,
            layout,
            latestValues: {}
          };
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
          const measured = this.measure();
          roundBox(measured);
          const prevLayout = this.layout;
          this.layout = {
            measured,
            actual: this.removeElementScroll(measured)
          };
          this.layoutCorrected = createBox();
          this.isLayoutDirty = false;
          this.projectionDelta = void 0;
          this.notifyListeners("measure", this.layout.actual);
          (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.notifyLayoutMeasure(this.layout.actual, prevLayout === null || prevLayout === void 0 ? void 0 : prevLayout.actual);
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
        measure() {
          const { visualElement: visualElement2 } = this.options;
          if (!visualElement2)
            return createBox();
          const box = visualElement2.measureViewportBox();
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
            const nodeBox = node.measure();
            copyBoxInto(sourceBox, nodeBox);
            removeBoxTransforms(boxWithoutTransform, node.latestValues, (_a = node.snapshot) === null || _a === void 0 ? void 0 : _a.layout, sourceBox);
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
          if (this.relativeTarget && this.relativeTargetOrigin && ((_a = this.relativeParent) === null || _a === void 0 ? void 0 : _a.target)) {
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
          copyBoxInto(this.layoutCorrected, this.layout.actual);
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
            const progress = latest / 1e3;
            mixAxisDelta(targetDelta.x, delta.x, progress);
            mixAxisDelta(targetDelta.y, delta.y, progress);
            this.setTargetDelta(targetDelta);
            if (this.relativeTarget && this.relativeTargetOrigin && this.layout && ((_a2 = this.relativeParent) === null || _a2 === void 0 ? void 0 : _a2.layout)) {
              calcRelativePosition(relativeLayout, this.layout.actual, this.relativeParent.layout.actual);
              mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
            }
            if (isSharedLayoutAnimation) {
              this.animationValues = mixedValues;
              mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
            }
            this.root.scheduleUpdateProjection();
            this.scheduleRender();
            this.animationProgress = progress;
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
            sync.cancelSync.update(this.pendingAnimation);
            this.pendingAnimation = void 0;
          }
          this.pendingAnimation = sync__default["default"].update(() => {
            globalProjectionState.hasAnimatedSinceResize = true;
            this.currentAnimation = animate(0, animationTarget, {
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
          if (this !== lead && this.layout && layout && shouldAnimatePositionOnly(this.options.animationType, this.layout.actual, layout.actual)) {
            target = this.target || createBox();
            const xLength = calcLength(this.layout.actual.x);
            target.x.min = lead.target.x.min;
            target.x.max = target.x.min + xLength;
            const yLength = calcLength(this.layout.actual.y);
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
          const { visualElement: visualElement2 } = this.options;
          if (!visualElement2)
            return;
          let hasRotate = false;
          const resetValues = {};
          for (let i = 0; i < transformAxes.length; i++) {
            const axis = transformAxes[i];
            const key = "rotate" + axis;
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
          for (const key in resetValues) {
            visualElement2.setStaticValue(key, resetValues[key]);
          }
          visualElement2.scheduleRender();
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
      };
    }
    function updateLayout(node) {
      node.updateLayout();
    }
    function notifyLayoutUpdate(node) {
      var _a, _b, _c;
      const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
      if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
        const { actual: layout, measured: measuredLayout } = node.layout;
        const { animationType } = node.options;
        if (animationType === "size") {
          eachAxis((axis) => {
            const axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
            const length = calcLength(axisSnapshot);
            axisSnapshot.min = layout[axis].min;
            axisSnapshot.max = axisSnapshot.min + length;
          });
        } else if (shouldAnimatePositionOnly(animationType, snapshot.layout, layout)) {
          eachAxis((axis) => {
            const axisSnapshot = snapshot.isShared ? snapshot.measured[axis] : snapshot.layout[axis];
            const length = calcLength(layout[axis]);
            axisSnapshot.max = axisSnapshot.min + length;
          });
        }
        const layoutDelta = createDelta();
        calcBoxDelta(layoutDelta, layout, snapshot.layout);
        const visualDelta = createDelta();
        if (snapshot.isShared) {
          calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measured);
        } else {
          calcBoxDelta(visualDelta, layout, snapshot.layout);
        }
        const hasLayoutChanged = !isDeltaZero(layoutDelta);
        let hasRelativeTargetChanged = false;
        if (!node.resumeFrom) {
          node.relativeParent = node.getClosestProjectingParent();
          if (node.relativeParent && !node.relativeParent.resumeFrom) {
            const { snapshot: parentSnapshot, layout: parentLayout } = node.relativeParent;
            if (parentSnapshot && parentLayout) {
              const relativeSnapshot = createBox();
              calcRelativePosition(relativeSnapshot, snapshot.layout, parentSnapshot.layout);
              const relativeLayout = createBox();
              calcRelativePosition(relativeLayout, layout, parentLayout.actual);
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
    function clearSnapshot(node) {
      node.clearSnapshot();
    }
    function clearMeasurements(node) {
      node.clearMeasurements();
    }
    function resetTransformStyle(node) {
      const { visualElement: visualElement2 } = node.options;
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
    function mixAxisDelta(output, delta, p) {
      output.translate = popmotion.mix(delta.translate, 0, p);
      output.scale = popmotion.mix(delta.scale, 1, p);
      output.origin = delta.origin;
      output.originPoint = delta.originPoint;
    }
    function mixAxis(output, from, to, p) {
      output.min = popmotion.mix(from.min, to.min, p);
      output.max = popmotion.mix(from.max, to.max, p);
    }
    function mixBox(output, from, to, p) {
      mixAxis(output.x, from.x, to.x, p);
      mixAxis(output.y, from.y, to.y, p);
    }
    function hasOpacityCrossfade(node) {
      return node.animationValues && node.animationValues.opacityExit !== void 0;
    }
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
    function roundAxis(axis) {
      axis.min = Math.round(axis.min);
      axis.max = Math.round(axis.max);
    }
    function roundBox(box) {
      roundAxis(box.x);
      roundAxis(box.y);
    }
    function shouldAnimatePositionOnly(animationType, snapshot, layout) {
      return animationType === "position" || animationType === "preserve-aspect" && !isCloseTo(aspectRatio(snapshot), aspectRatio(layout), 0.2);
    }
    var DocumentProjectionNode = createProjectionNode({
      attachResizeListener: (ref, notify2) => addDomEvent(ref, "resize", notify2),
      measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
      }),
      checkIsScrollRoot: () => true
    });
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
    var featureBundle = {
      ...animations,
      ...gestureAnimations,
      ...drag,
      ...layoutFeatures
    };
    var motion = createMotionProxy((Component, config) => createDomMotionConfig(Component, config, featureBundle, createDomVisualElement, HTMLProjectionNode));
    function createDomMotionComponent(key) {
      return createMotionComponent(createDomMotionConfig(key, { forwardMotionProps: false }, featureBundle, createDomVisualElement, HTMLProjectionNode));
    }
    var m = createMotionProxy(createDomMotionConfig);
    function useIsMounted() {
      const isMounted = React2.useRef(false);
      useIsomorphicLayoutEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);
      return isMounted;
    }
    function useForceUpdate() {
      const isMounted = useIsMounted();
      const [forcedRenderCount, setForcedRenderCount] = React2.useState(0);
      const forceRender = React2.useCallback(() => {
        isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
      }, [forcedRenderCount]);
      const deferredForceRender = React2.useCallback(() => sync__default["default"].postRender(forceRender), [forceRender]);
      return [deferredForceRender, forcedRenderCount];
    }
    var PopChildMeasure = class extends React__namespace.Component {
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
    function PopChild({ children, isPresent: isPresent2 }) {
      const id2 = React2.useId();
      const ref = React2.useRef(null);
      const size = React2.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0
      });
      React2.useInsertionEffect(() => {
        const { width, height, top, left } = size.current;
        if (isPresent2 || !ref.current || !width || !height)
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
      }, [isPresent2]);
      return React__namespace.createElement(PopChildMeasure, { isPresent: isPresent2, childRef: ref, sizeRef: size }, React__namespace.cloneElement(children, { ref }));
    }
    var PresenceChild = ({ children, initial, isPresent: isPresent2, onExitComplete, custom, presenceAffectsLayout, mode }) => {
      const presenceChildren = useConstant(newChildrenMap);
      const id2 = React2.useId();
      const context = React2.useMemo(
        () => ({
          id: id2,
          initial,
          isPresent: isPresent2,
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
        presenceAffectsLayout ? void 0 : [isPresent2]
      );
      React2.useMemo(() => {
        presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
      }, [isPresent2]);
      React__namespace.useEffect(() => {
        !isPresent2 && !presenceChildren.size && onExitComplete && onExitComplete();
      }, [isPresent2]);
      if (mode === "popLayout") {
        children = React__namespace.createElement(PopChild, { isPresent: isPresent2 }, children);
      }
      return React__namespace.createElement(PresenceContext.Provider, { value: context }, children);
    };
    function newChildrenMap() {
      return /* @__PURE__ */ new Map();
    }
    var getChildKey = (child) => child.key || "";
    function updateChildLookup(children, allChildren) {
      children.forEach((child) => {
        const key = getChildKey(child);
        allChildren.set(key, child);
      });
    }
    function onlyElements(children) {
      const filtered = [];
      React2.Children.forEach(children, (child) => {
        if (React2.isValidElement(child))
          filtered.push(child);
      });
      return filtered;
    }
    var AnimatePresence = ({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
      if (exitBeforeEnter) {
        mode = "wait";
        warnOnce(false, "Replace exitBeforeEnter with mode='wait'");
      }
      let [forceRender] = useForceUpdate();
      const forceRenderLayoutGroup = React2.useContext(LayoutGroupContext).forceRender;
      if (forceRenderLayoutGroup)
        forceRender = forceRenderLayoutGroup;
      const isMounted = useIsMounted();
      const filteredChildren = onlyElements(children);
      let childrenToRender = filteredChildren;
      const exiting = /* @__PURE__ */ new Set();
      const presentChildren = React2.useRef(childrenToRender);
      const allChildren = React2.useRef(/* @__PURE__ */ new Map()).current;
      const isInitialRender = React2.useRef(true);
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
        return React__namespace.createElement(React__namespace.Fragment, null, childrenToRender.map((child) => React__namespace.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? void 0 : false, presenceAffectsLayout, mode }, child)));
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
        const onExit = () => {
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
        };
        childrenToRender.splice(insertionIndex, 0, React__namespace.createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode }, child));
      });
      childrenToRender = childrenToRender.map((child) => {
        const key = child.key;
        return exiting.has(key) ? child : React__namespace.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout, mode }, child);
      });
      if (env !== "production" && mode === "wait" && childrenToRender.length > 1) {
        console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
      }
      return React__namespace.createElement(React__namespace.Fragment, null, exiting.size ? childrenToRender : childrenToRender.map((child) => React2.cloneElement(child)));
    };
    var DeprecatedLayoutGroupContext = React2.createContext(null);
    var notify = (node) => !node.isLayoutDirty && node.willUpdate(false);
    function nodeGroup() {
      const nodes = /* @__PURE__ */ new Set();
      const subscriptions = /* @__PURE__ */ new WeakMap();
      const dirtyAll = () => nodes.forEach(notify);
      return {
        add: (node) => {
          nodes.add(node);
          subscriptions.set(node, node.addEventListener("willUpdate", dirtyAll));
        },
        remove: (node) => {
          var _a;
          nodes.delete(node);
          (_a = subscriptions.get(node)) === null || _a === void 0 ? void 0 : _a();
          subscriptions.delete(node);
          dirtyAll();
        },
        dirty: dirtyAll
      };
    }
    var shouldInheritGroup = (inherit) => inherit === true;
    var shouldInheritId = (inherit) => shouldInheritGroup(inherit === true) || inherit === "id";
    var LayoutGroup = ({ children, id: id2, inheritId, inherit = true }) => {
      if (inheritId !== void 0)
        inherit = inheritId;
      const layoutGroupContext = React2.useContext(LayoutGroupContext);
      const deprecatedLayoutGroupContext = React2.useContext(DeprecatedLayoutGroupContext);
      const [forceRender, key] = useForceUpdate();
      const context = React2.useRef(null);
      const upstreamId = layoutGroupContext.id || deprecatedLayoutGroupContext;
      if (context.current === null) {
        if (shouldInheritId(inherit) && upstreamId) {
          id2 = id2 ? upstreamId + "-" + id2 : upstreamId;
        }
        context.current = {
          id: id2,
          group: shouldInheritGroup(inherit) ? layoutGroupContext.group || nodeGroup() : nodeGroup()
        };
      }
      const memoizedContext = React2.useMemo(() => ({ ...context.current, forceRender }), [key]);
      return React__namespace.createElement(LayoutGroupContext.Provider, { value: memoizedContext }, children);
    };
    var id = 0;
    var AnimateSharedLayout = ({ children }) => {
      React__namespace.useEffect(() => {
        heyListen.warning(false, "AnimateSharedLayout is deprecated: https://www.framer.com/docs/guide-upgrade/##shared-layout-animations");
      }, []);
      return React__namespace.createElement(LayoutGroup, { id: useConstant(() => `asl-${id++}`) }, children);
    };
    function MotionConfig({ children, isValidProp, ...config }) {
      isValidProp && loadExternalIsValidProp(isValidProp);
      config = { ...React2.useContext(MotionConfigContext), ...config };
      config.isStatic = useConstant(() => config.isStatic);
      const context = React2.useMemo(() => config, [JSON.stringify(config.transition), config.transformPagePoint, config.reducedMotion]);
      return React__namespace.createElement(MotionConfigContext.Provider, { value: context }, children);
    }
    function LazyMotion({ children, features, strict = false }) {
      const [, setIsLoaded] = React2.useState(!isLazyBundle(features));
      const loadedRenderer = React2.useRef(void 0);
      if (!isLazyBundle(features)) {
        const { renderer, ...loadedFeatures } = features;
        loadedRenderer.current = renderer;
        loadFeatures(loadedFeatures);
      }
      React2.useEffect(() => {
        if (isLazyBundle(features)) {
          features().then(({ renderer, ...loadedFeatures }) => {
            loadFeatures(loadedFeatures);
            loadedRenderer.current = renderer;
            setIsLoaded(true);
          });
        }
      }, []);
      return React__namespace.createElement(LazyContext.Provider, { value: { renderer: loadedRenderer.current, strict } }, children);
    }
    function isLazyBundle(features) {
      return typeof features === "function";
    }
    var ReorderContext = React2.createContext(null);
    function checkReorder(order, value, offset, velocity) {
      if (!velocity)
        return order;
      const index = order.findIndex((item2) => item2.value === value);
      if (index === -1)
        return order;
      const nextOffset = velocity > 0 ? 1 : -1;
      const nextItem = order[index + nextOffset];
      if (!nextItem)
        return order;
      const item = order[index];
      const nextLayout = nextItem.layout;
      const nextItemCenter = popmotion.mix(nextLayout.min, nextLayout.max, 0.5);
      if (nextOffset === 1 && item.layout.max + offset > nextItemCenter || nextOffset === -1 && item.layout.min + offset < nextItemCenter) {
        return moveItem(order, index, index + nextOffset);
      }
      return order;
    }
    function ReorderGroup({ children, as = "ul", axis = "y", onReorder, values, ...props }, externalRef) {
      const Component = useConstant(() => motion(as));
      const order = [];
      const isReordering = React2.useRef(false);
      heyListen.invariant(Boolean(values), "Reorder.Group must be provided a values prop");
      const context = {
        axis,
        registerItem: (value, layout) => {
          if (layout && order.findIndex((entry) => value === entry.value) === -1) {
            order.push({ value, layout: layout[axis] });
            order.sort(compareMin);
          }
        },
        updateOrder: (id2, offset, velocity) => {
          if (isReordering.current)
            return;
          const newOrder = checkReorder(order, id2, offset, velocity);
          if (order !== newOrder) {
            isReordering.current = true;
            onReorder(newOrder.map(getValue).filter((value) => values.indexOf(value) !== -1));
          }
        }
      };
      React2.useEffect(() => {
        isReordering.current = false;
      });
      return React__namespace.createElement(
        Component,
        { ...props, ref: externalRef },
        React__namespace.createElement(ReorderContext.Provider, { value: context }, children)
      );
    }
    var Group = React2.forwardRef(ReorderGroup);
    function getValue(item) {
      return item.value;
    }
    function compareMin(a, b) {
      return a.layout.min - b.layout.min;
    }
    function useMotionValue(initial) {
      const value = useConstant(() => motionValue(initial));
      const { isStatic } = React2.useContext(MotionConfigContext);
      if (isStatic) {
        const [, setLatest] = React2.useState(initial);
        React2.useEffect(() => value.onChange(setLatest), []);
      }
      return value;
    }
    var isCustomValueType = (v) => {
      return typeof v === "object" && v.mix;
    };
    var getMixer = (v) => isCustomValueType(v) ? v.mix : void 0;
    function transform(...args) {
      const useImmediate = !Array.isArray(args[0]);
      const argOffset = useImmediate ? 0 : -1;
      const inputValue = args[0 + argOffset];
      const inputRange = args[1 + argOffset];
      const outputRange = args[2 + argOffset];
      const options = args[3 + argOffset];
      const interpolator = popmotion.interpolate(inputRange, outputRange, {
        mixer: getMixer(outputRange[0]),
        ...options
      });
      return useImmediate ? interpolator(inputValue) : interpolator;
    }
    function useOnChange(value, callback) {
      useIsomorphicLayoutEffect(() => {
        if (isMotionValue(value))
          return value.onChange(callback);
      }, [callback]);
    }
    function useMultiOnChange(values, handler, cleanup) {
      useIsomorphicLayoutEffect(() => {
        const subscriptions = values.map((value) => value.onChange(handler));
        return () => {
          subscriptions.forEach((unsubscribe) => unsubscribe());
          cleanup();
        };
      });
    }
    function useCombineMotionValues(values, combineValues) {
      const value = useMotionValue(combineValues());
      const updateValue = () => value.set(combineValues());
      updateValue();
      useMultiOnChange(values, () => sync__default["default"].update(updateValue, false, true), () => sync.cancelSync.update(updateValue));
      return value;
    }
    function useTransform(input, inputRangeOrTransformer, outputRange, options) {
      const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
      return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
    }
    function useListTransform(values, transformer) {
      const latest = useConstant(() => []);
      return useCombineMotionValues(values, () => {
        latest.length = 0;
        const numValues = values.length;
        for (let i = 0; i < numValues; i++) {
          latest[i] = values[i].get();
        }
        return transformer(latest);
      });
    }
    function useDefaultMotionValue(value, defaultValue = 0) {
      return isMotionValue(value) ? value : useMotionValue(defaultValue);
    }
    function ReorderItem({ children, style = {}, value, as = "li", onDrag, layout = true, ...props }, externalRef) {
      const Component = useConstant(() => motion(as));
      const context = React2.useContext(ReorderContext);
      const point = {
        x: useDefaultMotionValue(style.x),
        y: useDefaultMotionValue(style.y)
      };
      const zIndex = useTransform([point.x, point.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
      const measuredLayout = React2.useRef(null);
      heyListen.invariant(Boolean(context), "Reorder.Item must be a child of Reorder.Group");
      const { axis, registerItem, updateOrder } = context;
      React2.useEffect(() => {
        registerItem(value, measuredLayout.current);
      }, [context]);
      return React__namespace.createElement(Component, { drag: axis, ...props, dragSnapToOrigin: true, style: { ...style, x: point.x, y: point.y, zIndex }, layout, onDrag: (event, gesturePoint) => {
        const { velocity } = gesturePoint;
        velocity[axis] && updateOrder(value, point[axis].get(), velocity[axis]);
        onDrag && onDrag(event, gesturePoint);
      }, onLayoutMeasure: (measured) => {
        measuredLayout.current = measured;
      }, ref: externalRef }, children);
    }
    var Item = React2.forwardRef(ReorderItem);
    var Reorder = {
      Group,
      Item
    };
    var domAnimation = {
      renderer: createDomVisualElement,
      ...animations,
      ...gestureAnimations
    };
    var domMax = {
      ...domAnimation,
      ...drag,
      ...layoutFeatures,
      projectionNodeConstructor: HTMLProjectionNode
    };
    function useMotionTemplate(fragments, ...values) {
      const numFragments = fragments.length;
      function buildValue() {
        let output = ``;
        for (let i = 0; i < numFragments; i++) {
          output += fragments[i];
          const value = values[i];
          if (value)
            output += values[i].get();
        }
        return output;
      }
      return useCombineMotionValues(values, buildValue);
    }
    function useSpring(source, config = {}) {
      const { isStatic } = React2.useContext(MotionConfigContext);
      const activeSpringAnimation = React2.useRef(null);
      const value = useMotionValue(isMotionValue(source) ? source.get() : source);
      React2.useMemo(() => {
        return value.attach((v, set) => {
          if (isStatic)
            return set(v);
          if (activeSpringAnimation.current) {
            activeSpringAnimation.current.stop();
          }
          activeSpringAnimation.current = popmotion.animate({
            from: value.get(),
            to: v,
            velocity: value.getVelocity(),
            ...config,
            onUpdate: set
          });
          return value.get();
        });
      }, [JSON.stringify(config)]);
      useOnChange(source, (v) => value.set(parseFloat(v)));
      return value;
    }
    function useVelocity(value) {
      const velocity = useMotionValue(value.getVelocity());
      React2.useEffect(() => {
        return value.velocityUpdateSubscribers.add((newVelocity) => {
          velocity.set(newVelocity);
        });
      }, [value]);
      return velocity;
    }
    var createScrollMotionValues = () => ({
      scrollX: motionValue(0),
      scrollY: motionValue(0),
      scrollXProgress: motionValue(0),
      scrollYProgress: motionValue(0)
    });
    function useScroll({ container, target, layoutEffect = true, ...options } = {}) {
      const values = useConstant(createScrollMotionValues);
      const useLifecycleEffect = layoutEffect ? useIsomorphicLayoutEffect : React2.useEffect;
      useLifecycleEffect(() => {
        return dom.scroll(({ x, y }) => {
          values.scrollX.set(x.current);
          values.scrollXProgress.set(x.progress);
          values.scrollY.set(y.current);
          values.scrollYProgress.set(y.progress);
        }, {
          ...options,
          container: (container === null || container === void 0 ? void 0 : container.current) || void 0,
          target: (target === null || target === void 0 ? void 0 : target.current) || void 0
        });
      }, []);
      return values;
    }
    function useElementScroll(ref) {
      warnOnce(false, "useElementScroll is deprecated. Convert to useScroll({ container: ref }).");
      return useScroll({ container: ref });
    }
    function useViewportScroll() {
      warnOnce(false, "useViewportScroll is deprecated. Convert to useScroll().");
      return useScroll();
    }
    function useAnimationFrame(callback) {
      const initialTimestamp = React2.useRef(0);
      const { isStatic } = React2.useContext(MotionConfigContext);
      React2.useEffect(() => {
        if (isStatic)
          return;
        const provideTimeSinceStart = ({ timestamp, delta }) => {
          if (!initialTimestamp.current)
            initialTimestamp.current = timestamp;
          callback(timestamp - initialTimestamp.current, delta);
        };
        sync__default["default"].update(provideTimeSinceStart, true);
        return () => sync.cancelSync.update(provideTimeSinceStart);
      }, [callback]);
    }
    function useTime() {
      const time = useMotionValue(0);
      useAnimationFrame((t) => time.set(t));
      return time;
    }
    var WillChangeMotionValue = class extends MotionValue {
      constructor() {
        super(...arguments);
        this.members = [];
        this.transforms = /* @__PURE__ */ new Set();
      }
      add(name) {
        let memberName;
        if (transformProps.has(name)) {
          this.transforms.add(name);
          memberName = "transform";
        } else if (!name.startsWith("origin") && !isCSSVariable$1(name) && name !== "willChange") {
          memberName = camelToDash(name);
        }
        if (memberName) {
          addUniqueItem(this.members, memberName);
          this.update();
        }
      }
      remove(name) {
        if (transformProps.has(name)) {
          this.transforms.delete(name);
          if (!this.transforms.size) {
            removeItem(this.members, "transform");
          }
        } else {
          removeItem(this.members, camelToDash(name));
        }
        this.update();
      }
      update() {
        this.set(this.members.length ? this.members.join(", ") : "auto");
      }
    };
    function useWillChange() {
      return useConstant(() => new WillChangeMotionValue("auto"));
    }
    function useReducedMotion() {
      !hasReducedMotionListener.current && initPrefersReducedMotion();
      const [shouldReduceMotion] = React2.useState(prefersReducedMotion.current);
      return shouldReduceMotion;
    }
    function useReducedMotionConfig() {
      const reducedMotionPreference = useReducedMotion();
      const { reducedMotion } = React2.useContext(MotionConfigContext);
      if (reducedMotion === "never") {
        return false;
      } else if (reducedMotion === "always") {
        return true;
      } else {
        return reducedMotionPreference;
      }
    }
    function animationControls() {
      let hasMounted = false;
      const pendingAnimations = [];
      const subscribers = /* @__PURE__ */ new Set();
      const controls = {
        subscribe(visualElement2) {
          subscribers.add(visualElement2);
          return () => void subscribers.delete(visualElement2);
        },
        start(definition, transitionOverride) {
          if (hasMounted) {
            const animations2 = [];
            subscribers.forEach((visualElement2) => {
              animations2.push(animateVisualElement(visualElement2, definition, {
                transitionOverride
              }));
            });
            return Promise.all(animations2);
          } else {
            return new Promise((resolve) => {
              pendingAnimations.push({
                animation: [definition, transitionOverride],
                resolve
              });
            });
          }
        },
        set(definition) {
          heyListen.invariant(hasMounted, "controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.");
          return subscribers.forEach((visualElement2) => {
            setValues(visualElement2, definition);
          });
        },
        stop() {
          subscribers.forEach((visualElement2) => {
            stopAnimation(visualElement2);
          });
        },
        mount() {
          hasMounted = true;
          pendingAnimations.forEach(({ animation, resolve }) => {
            controls.start(...animation).then(resolve);
          });
          return () => {
            hasMounted = false;
            controls.stop();
          };
        }
      };
      return controls;
    }
    function useAnimationControls() {
      const controls = useConstant(animationControls);
      React2.useEffect(controls.mount, []);
      return controls;
    }
    var useAnimation = useAnimationControls;
    function useCycle(...items) {
      const index = React2.useRef(0);
      const [item, setItem] = React2.useState(items[index.current]);
      const runCycle = React2.useCallback(
        (next) => {
          index.current = typeof next !== "number" ? popmotion.wrap(0, items.length, index.current + 1) : next;
          setItem(items[index.current]);
        },
        [items.length, ...items]
      );
      return [item, runCycle];
    }
    function useInView(ref, { root, margin, amount, once = false } = {}) {
      const [isInView, setInView] = React2.useState(false);
      React2.useEffect(() => {
        if (!ref.current || once && isInView)
          return;
        const onEnter = () => {
          setInView(true);
          return once ? void 0 : () => setInView(false);
        };
        const options = {
          root: root && root.current || void 0,
          margin,
          amount: amount === "some" ? "any" : amount
        };
        return dom.inView(ref.current, onEnter, options);
      }, [root, ref, margin, once]);
      return isInView;
    }
    var DragControls = class {
      constructor() {
        this.componentControls = /* @__PURE__ */ new Set();
      }
      subscribe(controls) {
        this.componentControls.add(controls);
        return () => this.componentControls.delete(controls);
      }
      start(event, options) {
        this.componentControls.forEach((controls) => {
          controls.start(event.nativeEvent || event, options);
        });
      }
    };
    var createDragControls = () => new DragControls();
    function useDragControls() {
      return useConstant(createDragControls);
    }
    function isMotionComponent(component) {
      return component !== null && typeof component === "object" && motionComponentSymbol in component;
    }
    function unwrapMotionComponent(component) {
      if (isMotionComponent(component)) {
        return component[motionComponentSymbol];
      }
      return void 0;
    }
    function useInstantLayoutTransition() {
      return startTransition;
    }
    function startTransition(callback) {
      if (!rootProjectionNode.current)
        return;
      rootProjectionNode.current.isUpdating = false;
      rootProjectionNode.current.blockUpdate();
      callback && callback();
    }
    function useInstantTransition() {
      const [forceUpdate, forcedRenderCount] = useForceUpdate();
      const startInstantLayoutTransition = useInstantLayoutTransition();
      React2.useEffect(() => {
        sync__default["default"].postRender(() => sync__default["default"].postRender(() => instantAnimationState.current = false));
      }, [forcedRenderCount]);
      return (callback) => {
        startInstantLayoutTransition(() => {
          instantAnimationState.current = true;
          forceUpdate();
          callback();
        });
      };
    }
    function useResetProjection() {
      const reset = React__namespace.useCallback(() => {
        const root = rootProjectionNode.current;
        if (!root)
          return;
        root.resetTree();
      }, []);
      return reset;
    }
    var createObject = () => ({});
    var stateVisualElement = visualElement({
      build() {
      },
      measureViewportBox: createBox,
      resetTransform() {
      },
      restoreTransform() {
      },
      removeValueFromRenderState() {
      },
      render() {
      },
      scrapeMotionValuesFromProps: createObject,
      readValueFromInstance(_state, key, options) {
        return options.initialState[key] || 0;
      },
      makeTargetAnimatable(element, { transition, transitionEnd, ...target }) {
        const origin = getOrigin(target, transition || {}, element);
        checkTargetForNewValues(element, target, origin);
        return { transition, transitionEnd, ...target };
      }
    });
    var useVisualState = makeUseVisualState({
      scrapeMotionValuesFromProps: createObject,
      createRenderState: createObject
    });
    function useAnimatedState(initialState) {
      const [animationState, setAnimationState] = React2.useState(initialState);
      const visualState = useVisualState({}, false);
      const element = useConstant(() => stateVisualElement({ props: {}, visualState }, { initialState }));
      React2.useEffect(() => {
        element.mount({});
        return element.unmount;
      }, [element]);
      React2.useEffect(() => {
        element.setProps({
          onUpdate: (v) => {
            setAnimationState({ ...v });
          }
        });
      }, [setAnimationState, element]);
      const startAnimation2 = useConstant(() => (animationDefinition) => {
        return animateVisualElement(element, animationDefinition);
      });
      return [animationState, startAnimation2];
    }
    var maxScale = 1e5;
    var invertScale = (scale) => scale > 1e-3 ? 1 / scale : maxScale;
    var hasWarned = false;
    function useInvertedScale(scale) {
      let parentScaleX = useMotionValue(1);
      let parentScaleY = useMotionValue(1);
      const visualElement2 = useVisualElementContext();
      heyListen.invariant(!!(scale || visualElement2), "If no scale values are provided, useInvertedScale must be used within a child of another motion component.");
      heyListen.warning(hasWarned, "useInvertedScale is deprecated and will be removed in 3.0. Use the layout prop instead.");
      hasWarned = true;
      if (scale) {
        parentScaleX = scale.scaleX || parentScaleX;
        parentScaleY = scale.scaleY || parentScaleY;
      } else if (visualElement2) {
        parentScaleX = visualElement2.getValue("scaleX", 1);
        parentScaleY = visualElement2.getValue("scaleY", 1);
      }
      const scaleX = useTransform(parentScaleX, invertScale);
      const scaleY = useTransform(parentScaleY, invertScale);
      return { scaleX, scaleY };
    }
    exports.AnimatePresence = AnimatePresence;
    exports.AnimateSharedLayout = AnimateSharedLayout;
    exports.DeprecatedLayoutGroupContext = DeprecatedLayoutGroupContext;
    exports.DragControls = DragControls;
    exports.FlatTree = FlatTree;
    exports.LayoutGroup = LayoutGroup;
    exports.LayoutGroupContext = LayoutGroupContext;
    exports.LazyMotion = LazyMotion;
    exports.MotionConfig = MotionConfig;
    exports.MotionConfigContext = MotionConfigContext;
    exports.MotionContext = MotionContext;
    exports.MotionValue = MotionValue;
    exports.PresenceContext = PresenceContext;
    exports.Reorder = Reorder;
    exports.SwitchLayoutGroupContext = SwitchLayoutGroupContext;
    exports.addPointerEvent = addPointerEvent;
    exports.addScaleCorrector = addScaleCorrector;
    exports.animate = animate;
    exports.animateVisualElement = animateVisualElement;
    exports.animationControls = animationControls;
    exports.animations = animations;
    exports.calcLength = calcLength;
    exports.checkTargetForNewValues = checkTargetForNewValues;
    exports.createBox = createBox;
    exports.createDomMotionComponent = createDomMotionComponent;
    exports.createMotionComponent = createMotionComponent;
    exports.delay = delay;
    exports.domAnimation = domAnimation;
    exports.domMax = domMax;
    exports.filterProps = filterProps;
    exports.isBrowser = isBrowser;
    exports.isDragActive = isDragActive;
    exports.isMotionComponent = isMotionComponent;
    exports.isMotionValue = isMotionValue;
    exports.isValidMotionProp = isValidMotionProp;
    exports.m = m;
    exports.makeUseVisualState = makeUseVisualState;
    exports.motion = motion;
    exports.motionValue = motionValue;
    exports.resolveMotionValue = resolveMotionValue;
    exports.transform = transform;
    exports.unwrapMotionComponent = unwrapMotionComponent;
    exports.useAnimation = useAnimation;
    exports.useAnimationControls = useAnimationControls;
    exports.useAnimationFrame = useAnimationFrame;
    exports.useCycle = useCycle;
    exports.useDeprecatedAnimatedState = useAnimatedState;
    exports.useDeprecatedInvertedScale = useInvertedScale;
    exports.useDomEvent = useDomEvent;
    exports.useDragControls = useDragControls;
    exports.useElementScroll = useElementScroll;
    exports.useForceUpdate = useForceUpdate;
    exports.useInView = useInView;
    exports.useInstantLayoutTransition = useInstantLayoutTransition;
    exports.useInstantTransition = useInstantTransition;
    exports.useIsPresent = useIsPresent;
    exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
    exports.useMotionTemplate = useMotionTemplate;
    exports.useMotionValue = useMotionValue;
    exports.usePresence = usePresence;
    exports.useReducedMotion = useReducedMotion;
    exports.useReducedMotionConfig = useReducedMotionConfig;
    exports.useResetProjection = useResetProjection;
    exports.useScroll = useScroll;
    exports.useSpring = useSpring;
    exports.useTime = useTime;
    exports.useTransform = useTransform;
    exports.useUnmountEffect = useUnmountEffect;
    exports.useVelocity = useVelocity;
    exports.useViewportScroll = useViewportScroll;
    exports.useVisualElementContext = useVisualElementContext;
    exports.useWillChange = useWillChange;
    exports.visualElement = visualElement;
    exports.wrapHandler = wrapHandler;
  }
});

// js/react-jsx-runtime.ts
init_define_process();

// ../../.yarn/global/cache/es-module-shims-npm-1.6.2-15ec69049d-9.zip/node_modules/es-module-shims/dist/es-module-shims.js
init_define_process();
(function() {
  const hasWindow = typeof window !== "undefined";
  const hasDocument = typeof document !== "undefined";
  const noop = () => {
  };
  const optionsScript = hasDocument ? document.querySelector("script[type=esms-options]") : void 0;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector("script[nonce]");
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log("%c^^ Module TypeError above is polyfilled and can be ignored ^^", "font-weight:900;color:#391");
  };
  const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;
  function globalHook(name) {
    return typeof name === "string" ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes("/") ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) : location.pathname}`;
  const createBlob = (source, type = "text/javascript") => URL.createObjectURL(new Blob([source], { type }));
  let { skip } = esmsInitOptions;
  if (Array.isArray(skip)) {
    const l2 = skip.map((s2) => new URL(s2, baseUrl).href);
    skip = (s2) => l2.some((i2) => i2[i2.length - 1] === "/" && s2.startsWith(i2) || s2 === i2);
  } else if (typeof skip === "string") {
    const r2 = new RegExp(skip);
    skip = (s2) => r2.test(s2);
  }
  const eoop = (err) => setTimeout(() => {
    throw err;
  });
  const throwError = (err) => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err);
  };
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : "";
  }
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }
  if (!shimMode) {
    if (document.querySelectorAll("script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]").length) {
      shimMode = true;
    } else {
      let seenScript = false;
      for (const script of document.querySelectorAll("script[type=module],script[type=importmap]")) {
        if (!seenScript) {
          if (script.type === "module" && !script.ep)
            seenScript = true;
        } else if (script.type === "importmap" && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }
  const backslashRegEx = /\\/g;
  function isURL(url) {
    if (url.indexOf(":") === -1)
      return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    const hIdx = parentUrl.indexOf("#"), qIdx = parentUrl.indexOf("?");
    if (hIdx + qIdx > -2)
      parentUrl = parentUrl.slice(0, hIdx === -1 ? qIdx : qIdx === -1 || qIdx > hIdx ? hIdx : qIdx);
    if (relUrl.indexOf("\\") !== -1)
      relUrl = relUrl.replace(backslashRegEx, "/");
    if (relUrl[0] === "/" && relUrl[1] === "/") {
      return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === "/") {
        if (parentProtocol !== "file:") {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf("/") + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
      }
      if (relUrl[0] === "/")
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
      const segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;
      for (let i2 = 0; i2 < segmented.length; i2++) {
        if (segmentIndex !== -1) {
          if (segmented[i2] === "/") {
            output.push(segmented.slice(segmentIndex, i2 + 1));
            segmentIndex = -1;
          }
          continue;
        } else if (segmented[i2] === ".") {
          if (segmented[i2 + 1] === "." && (segmented[i2 + 2] === "/" || i2 + 2 === segmented.length)) {
            output.pop();
            i2 += 2;
            continue;
          } else if (segmented[i2 + 1] === "/" || i2 + 1 === segmented.length) {
            i2 += 1;
            continue;
          }
        }
        while (segmented[i2] === "/")
          i2++;
        segmentIndex = i2;
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveAndComposeImportMap(json, baseUrl2, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes) };
    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl2, parentMap);
    if (json.scopes)
      for (let s2 in json.scopes) {
        const resolvedScope = resolveUrl(s2, baseUrl2);
        resolveAndComposePackages(json.scopes[s2], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
      }
    return outMap;
  }
  function getMatch(path, matchObj) {
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
  }
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null)
        return;
      return pkg + id.slice(pkgName.length);
    }
  }
  function resolveImportMap(importMap2, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap2.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap2.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), importMap2.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap2.imports) || resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain;
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p2 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p2];
      if (typeof target !== "string")
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl2) || target, baseUrl2);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p2}" -> "${packages[p2]}" does not resolve`);
    }
  }
  let dynamicImport = !hasDocument && (0, eval)("u=>import(u)");
  let supportsDynamicImport;
  const dynamicImportCheck = hasDocument && new Promise((resolve2) => {
    const s2 = Object.assign(document.createElement("script"), {
      src: createBlob("self._d=u=>import(u)"),
      ep: true
    });
    s2.setAttribute("nonce", nonce);
    s2.addEventListener("load", () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener("error", (_err) => err = _err);
        dynamicImport = (url, opts) => new Promise((resolve3, reject) => {
          const s3 = Object.assign(document.createElement("script"), {
            type: "module",
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = void 0;
          s3.ep = true;
          if (nonce)
            s3.setAttribute("nonce", nonce);
          s3.addEventListener("error", cb);
          s3.addEventListener("load", cb);
          function cb(_err) {
            document.head.removeChild(s3);
            if (self._esmsi) {
              resolve3(self._esmsi, baseUrl);
              self._esmsi = void 0;
            } else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s3.src}).`));
              err = void 0;
            }
          }
          document.head.appendChild(s3);
        });
      }
      document.head.removeChild(s2);
      delete self._d;
      resolve2();
    });
    document.head.appendChild(s2);
  });
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  let supportsImportMaps = hasDocument && HTMLScriptElement.supports ? HTMLScriptElement.supports("importmap") : false;
  let supportsImportMeta = supportsImportMaps;
  const importMetaCheck = "import.meta";
  const cssModulesCheck = `import"x"assert{type:"css"}`;
  const jsonModulesCheck = `import"x"assert{type:"json"}`;
  const featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport || supportsImportMaps && !cssModulesEnabled && !jsonModulesEnabled)
      return;
    if (!hasDocument)
      return Promise.all([
        supportsImportMaps || dynamicImport(createBlob(importMetaCheck)).then(() => supportsImportMeta = true, noop),
        cssModulesEnabled && dynamicImport(createBlob(cssModulesCheck.replace("x", createBlob("", "text/css")))).then(() => supportsCssAssertions = true, noop),
        jsonModulesEnabled && dynamicImport(createBlob(jsonModulescheck.replace("x", createBlob("{}", "text/json")))).then(() => supportsJsonAssertions = true, noop)
      ]);
    return new Promise((resolve2) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("nonce", nonce);
      function cb({ data: [a2, b2, c2, d] }) {
        supportsImportMaps = a2;
        supportsImportMeta = b2;
        supportsCssAssertions = c2;
        supportsJsonAssertions = d;
        resolve2();
        document.head.removeChild(iframe);
        window.removeEventListener("message", cb, false);
      }
      window.addEventListener("message", cb, false);
      const importMapTest = `<script nonce=${nonce || ""}>b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${supportsImportMaps ? "true,true" : `'x',b('${importMetaCheck}')`}, ${cssModulesEnabled ? `b('${cssModulesCheck}'.replace('x',b('','text/css')))` : "false"}, ${jsonModulesEnabled ? `b('${jsonModulesCheck}'.replace('x',b('{}','text/json')))` : "false"}].map(x =>typeof x==='string'?import(x).then(x =>!!x,()=>false):x)).then(a=>parent.postMessage(a,'*'))<${""}/script>`;
      iframe.onload = () => {
        const doc = iframe.contentDocument;
        if (doc && doc.head.childNodes.length === 0) {
          const s2 = doc.createElement("script");
          if (nonce)
            s2.setAttribute("nonce", nonce);
          s2.innerHTML = importMapTest.slice(15 + (nonce ? nonce.length : 0), -9);
          doc.head.appendChild(s2);
        }
      };
      document.head.appendChild(iframe);
      if ("srcdoc" in iframe)
        iframe.srcdoc = importMapTest;
      else
        iframe.contentDocument.write(importMapTest);
    });
  });
  let e, a, r, i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; )
      a2[i2] = e2.charCodeAt(i2++);
  } : function(e2, a2) {
    const r2 = e2.length;
    let i2 = 0;
    for (; i2 < r2; ) {
      const r3 = e2.charCodeAt(i2);
      a2[i2++] = (255 & r3) << 8 | r3 >>> 8;
    }
  }, f = "xportmportlassetafromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";
  let t, c$1, n;
  function parse(l2, k2 = "@") {
    t = l2, c$1 = k2;
    const u2 = 2 * t.length + (2 << 18);
    if (u2 > i || !e) {
      for (; u2 > i; )
        i *= 2;
      a = new ArrayBuffer(i), s(f, new Uint16Array(a, 16, 106)), e = function(e2, a2, r2) {
        ;
        var i2 = new e2.Int8Array(r2), s2 = new e2.Int16Array(r2), f2 = new e2.Int32Array(r2), t2 = new e2.Uint8Array(r2), c2 = new e2.Uint16Array(r2), n2 = 1024;
        function b2() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, b3 = 0, o3 = 0, w3 = 0;
          w3 = n2;
          n2 = n2 + 10240 | 0;
          i2[795] = 1;
          s2[395] = 0;
          s2[396] = 0;
          f2[67] = f2[2];
          i2[796] = 0;
          f2[66] = 0;
          i2[794] = 0;
          f2[68] = w3 + 2048;
          f2[69] = w3;
          i2[797] = 0;
          e3 = (f2[3] | 0) + -2 | 0;
          f2[70] = e3;
          a3 = e3 + (f2[64] << 1) | 0;
          f2[71] = a3;
          e:
            while (1) {
              r3 = e3 + 2 | 0;
              f2[70] = r3;
              if (e3 >>> 0 >= a3 >>> 0) {
                b3 = 18;
                break;
              }
              a:
                do {
                  switch (s2[r3 >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101: {
                      if ((((s2[396] | 0) == 0 ? F(r3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (l3(), (i2[795] | 0) == 0) : 0) {
                        b3 = 9;
                        break e;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 105: {
                      if (F(r3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                        k3();
                        b3 = 17;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 59: {
                      b3 = 17;
                      break;
                    }
                    case 47:
                      switch (s2[e3 + 4 >> 1] | 0) {
                        case 47: {
                          E();
                          break a;
                        }
                        case 42: {
                          y(1);
                          break a;
                        }
                        default: {
                          b3 = 16;
                          break e;
                        }
                      }
                    default: {
                      b3 = 16;
                      break e;
                    }
                  }
                } while (0);
              if ((b3 | 0) == 17) {
                b3 = 0;
                f2[67] = f2[70];
              }
              e3 = f2[70] | 0;
              a3 = f2[71] | 0;
            }
          if ((b3 | 0) == 9) {
            e3 = f2[70] | 0;
            f2[67] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 16) {
            i2[795] = 0;
            f2[70] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 18)
            if (!(i2[794] | 0)) {
              e3 = r3;
              b3 = 19;
            } else
              e3 = 0;
          do {
            if ((b3 | 0) == 19) {
              e:
                while (1) {
                  a3 = e3 + 2 | 0;
                  f2[70] = a3;
                  t3 = a3;
                  if (e3 >>> 0 >= (f2[71] | 0) >>> 0) {
                    b3 = 82;
                    break;
                  }
                  a:
                    do {
                      switch (s2[a3 >> 1] | 0) {
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 32:
                          break;
                        case 101: {
                          if (((s2[396] | 0) == 0 ? F(a3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                            l3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 105: {
                          if (F(a3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                            k3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 99: {
                          if ((F(a3) | 0 ? (m(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? R(s2[e3 + 12 >> 1] | 0) | 0 : 0) {
                            i2[797] = 1;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 40: {
                          t3 = f2[68] | 0;
                          a3 = s2[396] | 0;
                          b3 = a3 & 65535;
                          f2[t3 + (b3 << 3) >> 2] = 1;
                          r3 = f2[67] | 0;
                          s2[396] = a3 + 1 << 16 >> 16;
                          f2[t3 + (b3 << 3) + 4 >> 2] = r3;
                          b3 = 81;
                          break;
                        }
                        case 41: {
                          a3 = s2[396] | 0;
                          if (!(a3 << 16 >> 16)) {
                            b3 = 36;
                            break e;
                          }
                          a3 = a3 + -1 << 16 >> 16;
                          s2[396] = a3;
                          r3 = s2[395] | 0;
                          if (r3 << 16 >> 16 != 0 ? (o3 = f2[(f2[69] | 0) + ((r3 & 65535) + -1 << 2) >> 2] | 0, (f2[o3 + 20 >> 2] | 0) == (f2[(f2[68] | 0) + ((a3 & 65535) << 3) + 4 >> 2] | 0)) : 0) {
                            a3 = o3 + 4 | 0;
                            if (!(f2[a3 >> 2] | 0))
                              f2[a3 >> 2] = t3;
                            f2[o3 + 12 >> 2] = e3 + 4;
                            s2[395] = r3 + -1 << 16 >> 16;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 123: {
                          b3 = f2[67] | 0;
                          t3 = f2[61] | 0;
                          e3 = b3;
                          do {
                            if ((s2[b3 >> 1] | 0) == 41 & (t3 | 0) != 0 ? (f2[t3 + 4 >> 2] | 0) == (b3 | 0) : 0) {
                              a3 = f2[62] | 0;
                              f2[61] = a3;
                              if (!a3) {
                                f2[57] = 0;
                                break;
                              } else {
                                f2[a3 + 28 >> 2] = 0;
                                break;
                              }
                            }
                          } while (0);
                          t3 = f2[68] | 0;
                          r3 = s2[396] | 0;
                          b3 = r3 & 65535;
                          f2[t3 + (b3 << 3) >> 2] = (i2[797] | 0) == 0 ? 2 : 6;
                          s2[396] = r3 + 1 << 16 >> 16;
                          f2[t3 + (b3 << 3) + 4 >> 2] = e3;
                          i2[797] = 0;
                          b3 = 81;
                          break;
                        }
                        case 125: {
                          e3 = s2[396] | 0;
                          if (!(e3 << 16 >> 16)) {
                            b3 = 49;
                            break e;
                          }
                          t3 = f2[68] | 0;
                          b3 = e3 + -1 << 16 >> 16;
                          s2[396] = b3;
                          if ((f2[t3 + ((b3 & 65535) << 3) >> 2] | 0) == 4) {
                            h2();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 39: {
                          d2(39);
                          b3 = 81;
                          break;
                        }
                        case 34: {
                          d2(34);
                          b3 = 81;
                          break;
                        }
                        case 47:
                          switch (s2[e3 + 4 >> 1] | 0) {
                            case 47: {
                              E();
                              break a;
                            }
                            case 42: {
                              y(1);
                              break a;
                            }
                            default: {
                              e3 = f2[67] | 0;
                              t3 = s2[e3 >> 1] | 0;
                              r:
                                do {
                                  if (!(U(t3) | 0)) {
                                    switch (t3 << 16 >> 16) {
                                      case 41:
                                        if (z(f2[(f2[68] | 0) + (c2[396] << 3) + 4 >> 2] | 0) | 0) {
                                          b3 = 69;
                                          break r;
                                        } else {
                                          b3 = 66;
                                          break r;
                                        }
                                      case 125:
                                        break;
                                      default: {
                                        b3 = 66;
                                        break r;
                                      }
                                    }
                                    a3 = f2[68] | 0;
                                    r3 = c2[396] | 0;
                                    if (!(p2(f2[a3 + (r3 << 3) + 4 >> 2] | 0) | 0) ? (f2[a3 + (r3 << 3) >> 2] | 0) != 6 : 0)
                                      b3 = 66;
                                    else
                                      b3 = 69;
                                  } else
                                    switch (t3 << 16 >> 16) {
                                      case 46:
                                        if (((s2[e3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      case 43:
                                        if ((s2[e3 + -2 >> 1] | 0) == 43) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      case 45:
                                        if ((s2[e3 + -2 >> 1] | 0) == 45) {
                                          b3 = 66;
                                          break r;
                                        } else {
                                          b3 = 69;
                                          break r;
                                        }
                                      default: {
                                        b3 = 69;
                                        break r;
                                      }
                                    }
                                } while (0);
                              r:
                                do {
                                  if ((b3 | 0) == 66) {
                                    b3 = 0;
                                    if (!(u3(e3) | 0)) {
                                      switch (t3 << 16 >> 16) {
                                        case 0: {
                                          b3 = 69;
                                          break r;
                                        }
                                        case 47: {
                                          if (i2[796] | 0) {
                                            b3 = 69;
                                            break r;
                                          }
                                          break;
                                        }
                                        default: {
                                        }
                                      }
                                      r3 = f2[3] | 0;
                                      a3 = t3;
                                      do {
                                        if (e3 >>> 0 <= r3 >>> 0)
                                          break;
                                        e3 = e3 + -2 | 0;
                                        f2[67] = e3;
                                        a3 = s2[e3 >> 1] | 0;
                                      } while (!(B(a3) | 0));
                                      if (D(a3) | 0) {
                                        do {
                                          if (e3 >>> 0 <= r3 >>> 0)
                                            break;
                                          e3 = e3 + -2 | 0;
                                          f2[67] = e3;
                                        } while (D(s2[e3 >> 1] | 0) | 0);
                                        if ($(e3) | 0) {
                                          g();
                                          i2[796] = 0;
                                          b3 = 81;
                                          break a;
                                        } else
                                          e3 = 1;
                                      } else
                                        e3 = 1;
                                    } else
                                      b3 = 69;
                                  }
                                } while (0);
                              if ((b3 | 0) == 69) {
                                g();
                                e3 = 0;
                              }
                              i2[796] = e3;
                              b3 = 81;
                              break a;
                            }
                          }
                        case 96: {
                          t3 = f2[68] | 0;
                          r3 = s2[396] | 0;
                          b3 = r3 & 65535;
                          f2[t3 + (b3 << 3) + 4 >> 2] = f2[67];
                          s2[396] = r3 + 1 << 16 >> 16;
                          f2[t3 + (b3 << 3) >> 2] = 3;
                          h2();
                          b3 = 81;
                          break;
                        }
                        default:
                          b3 = 81;
                      }
                    } while (0);
                  if ((b3 | 0) == 81) {
                    b3 = 0;
                    f2[67] = f2[70];
                  }
                  e3 = f2[70] | 0;
                }
              if ((b3 | 0) == 36) {
                Q();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 49) {
                Q();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 82) {
                e3 = (i2[794] | 0) == 0 ? (s2[395] | s2[396]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);
          n2 = w3;
          return e3 | 0;
        }
        function l3() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, n3 = 0, b3 = 0, l4 = 0, k4 = 0;
          c3 = f2[70] | 0;
          n3 = f2[63] | 0;
          k4 = c3 + 12 | 0;
          f2[70] = k4;
          r3 = w2(1) | 0;
          e3 = f2[70] | 0;
          if (!((e3 | 0) == (k4 | 0) ? !(I(r3) | 0) : 0))
            b3 = 3;
          e:
            do {
              if ((b3 | 0) == 3) {
                a:
                  do {
                    switch (r3 << 16 >> 16) {
                      case 123: {
                        f2[70] = e3 + 2;
                        e3 = w2(1) | 0;
                        r3 = f2[70] | 0;
                        while (1) {
                          if (T(e3) | 0) {
                            d2(e3);
                            e3 = (f2[70] | 0) + 2 | 0;
                            f2[70] = e3;
                          } else {
                            P(e3) | 0;
                            e3 = f2[70] | 0;
                          }
                          w2(1) | 0;
                          e3 = v(r3, e3) | 0;
                          if (e3 << 16 >> 16 == 44) {
                            f2[70] = (f2[70] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          a3 = r3;
                          r3 = f2[70] | 0;
                          if (e3 << 16 >> 16 == 125) {
                            b3 = 15;
                            break;
                          }
                          if ((r3 | 0) == (a3 | 0)) {
                            b3 = 12;
                            break;
                          }
                          if (r3 >>> 0 > (f2[71] | 0) >>> 0) {
                            b3 = 14;
                            break;
                          }
                        }
                        if ((b3 | 0) == 12) {
                          Q();
                          break e;
                        } else if ((b3 | 0) == 14) {
                          Q();
                          break e;
                        } else if ((b3 | 0) == 15) {
                          f2[70] = r3 + 2;
                          break a;
                        }
                        break;
                      }
                      case 42: {
                        f2[70] = e3 + 2;
                        w2(1) | 0;
                        k4 = f2[70] | 0;
                        v(k4, k4) | 0;
                        break;
                      }
                      default: {
                        i2[795] = 0;
                        switch (r3 << 16 >> 16) {
                          case 100: {
                            c3 = e3 + 14 | 0;
                            f2[70] = c3;
                            a3 = w2(1) | 0;
                            if (a3 << 16 >> 16 == 97) {
                              a3 = f2[70] | 0;
                              if ((F(a3) | 0 ? (m(a3 + 2 | 0, 58, 8) | 0) == 0 : 0) ? (t3 = a3 + 10 | 0, D(s2[t3 >> 1] | 0) | 0) : 0) {
                                f2[70] = t3;
                                a3 = w2(0) | 0;
                                b3 = 23;
                              } else
                                a3 = 97;
                            } else
                              b3 = 23;
                            r:
                              do {
                                if ((b3 | 0) == 23) {
                                  if (a3 << 16 >> 16 == 102) {
                                    a3 = f2[70] | 0;
                                    if (!(F(a3) | 0)) {
                                      a3 = 102;
                                      break;
                                    }
                                    if (m(a3 + 2 | 0, 66, 14) | 0) {
                                      a3 = 102;
                                      break;
                                    }
                                    r3 = a3 + 16 | 0;
                                    a3 = s2[r3 >> 1] | 0;
                                    if (!(R(a3) | 0))
                                      switch (a3 << 16 >> 16) {
                                        case 40:
                                        case 42:
                                          break;
                                        default: {
                                          a3 = 102;
                                          break r;
                                        }
                                      }
                                    f2[70] = r3;
                                    a3 = w2(1) | 0;
                                    if (a3 << 16 >> 16 == 42) {
                                      f2[70] = (f2[70] | 0) + 2;
                                      a3 = w2(1) | 0;
                                    }
                                    if (a3 << 16 >> 16 == 40) {
                                      O(e3, c3, 0, 0);
                                      f2[70] = c3;
                                      break e;
                                    }
                                  }
                                  if (a3 << 16 >> 16 == 99) {
                                    a3 = f2[70] | 0;
                                    if ((F(a3) | 0 ? (m(a3 + 2 | 0, 36, 8) | 0) == 0 : 0) ? (l4 = a3 + 10 | 0, k4 = s2[l4 >> 1] | 0, R(k4) | 0 | k4 << 16 >> 16 == 123) : 0) {
                                      f2[70] = l4;
                                      a3 = w2(1) | 0;
                                      if (a3 << 16 >> 16 == 123) {
                                        O(e3, c3, 0, 0);
                                        f2[70] = c3;
                                        break e;
                                      }
                                    } else
                                      a3 = 99;
                                  }
                                }
                              } while (0);
                            k4 = f2[70] | 0;
                            P(a3) | 0;
                            O(e3, c3, k4, f2[70] | 0);
                            f2[70] = c3;
                            break e;
                          }
                          case 97: {
                            f2[70] = e3 + 10;
                            w2(1) | 0;
                            e3 = f2[70] | 0;
                            b3 = 40;
                            break;
                          }
                          case 102: {
                            b3 = 40;
                            break;
                          }
                          case 99: {
                            if ((m(e3 + 2 | 0, 36, 8) | 0) == 0 ? (a3 = e3 + 10 | 0, B(s2[a3 >> 1] | 0) | 0) : 0) {
                              f2[70] = a3;
                              k4 = w2(1) | 0;
                              l4 = f2[70] | 0;
                              P(k4) | 0;
                              k4 = f2[70] | 0;
                              O(l4, k4, l4, k4);
                              f2[70] = (f2[70] | 0) + -2;
                              break e;
                            }
                            e3 = e3 + 4 | 0;
                            f2[70] = e3;
                            break;
                          }
                          case 108:
                          case 118:
                            break;
                          default:
                            break e;
                        }
                        if ((b3 | 0) == 40) {
                          f2[70] = e3 + 16;
                          e3 = w2(1) | 0;
                          if (e3 << 16 >> 16 == 42) {
                            f2[70] = (f2[70] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          l4 = f2[70] | 0;
                          P(e3) | 0;
                          k4 = f2[70] | 0;
                          O(l4, k4, l4, k4);
                          f2[70] = (f2[70] | 0) + -2;
                          break e;
                        }
                        e3 = e3 + 4 | 0;
                        f2[70] = e3;
                        i2[795] = 0;
                        r:
                          while (1) {
                            f2[70] = e3 + 2;
                            k4 = w2(1) | 0;
                            e3 = f2[70] | 0;
                            switch ((P(k4) | 0) << 16 >> 16) {
                              case 91:
                              case 123:
                                break r;
                              default: {
                              }
                            }
                            a3 = f2[70] | 0;
                            if ((a3 | 0) == (e3 | 0))
                              break e;
                            O(e3, a3, e3, a3);
                            if ((w2(1) | 0) << 16 >> 16 != 44)
                              break;
                            e3 = f2[70] | 0;
                          }
                        f2[70] = (f2[70] | 0) + -2;
                        break e;
                      }
                    }
                  } while (0);
                k4 = (w2(1) | 0) << 16 >> 16 == 102;
                e3 = f2[70] | 0;
                if (k4 ? (m(e3 + 2 | 0, 52, 6) | 0) == 0 : 0) {
                  f2[70] = e3 + 8;
                  o2(c3, w2(1) | 0);
                  e3 = (n3 | 0) == 0 ? 232 : n3 + 16 | 0;
                  while (1) {
                    e3 = f2[e3 >> 2] | 0;
                    if (!e3)
                      break e;
                    f2[e3 + 12 >> 2] = 0;
                    f2[e3 + 8 >> 2] = 0;
                    e3 = e3 + 16 | 0;
                  }
                }
                f2[70] = e3 + -2;
              }
            } while (0);
          return;
        }
        function k3() {
          var e3 = 0, a3 = 0, r3 = 0, t3 = 0, c3 = 0, n3 = 0;
          c3 = f2[70] | 0;
          a3 = c3 + 12 | 0;
          f2[70] = a3;
          e:
            do {
              switch ((w2(1) | 0) << 16 >> 16) {
                case 40: {
                  a3 = f2[68] | 0;
                  n3 = s2[396] | 0;
                  r3 = n3 & 65535;
                  f2[a3 + (r3 << 3) >> 2] = 5;
                  e3 = f2[70] | 0;
                  s2[396] = n3 + 1 << 16 >> 16;
                  f2[a3 + (r3 << 3) + 4 >> 2] = e3;
                  if ((s2[f2[67] >> 1] | 0) != 46) {
                    f2[70] = e3 + 2;
                    n3 = w2(1) | 0;
                    A(c3, f2[70] | 0, 0, e3);
                    a3 = f2[61] | 0;
                    r3 = f2[69] | 0;
                    c3 = s2[395] | 0;
                    s2[395] = c3 + 1 << 16 >> 16;
                    f2[r3 + ((c3 & 65535) << 2) >> 2] = a3;
                    switch (n3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        f2[70] = (f2[70] | 0) + -2;
                        break e;
                      }
                    }
                    e3 = (f2[70] | 0) + 2 | 0;
                    f2[70] = e3;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 44: {
                        f2[70] = (f2[70] | 0) + 2;
                        w2(1) | 0;
                        c3 = f2[61] | 0;
                        f2[c3 + 4 >> 2] = e3;
                        n3 = f2[70] | 0;
                        f2[c3 + 16 >> 2] = n3;
                        i2[c3 + 24 >> 0] = 1;
                        f2[70] = n3 + -2;
                        break e;
                      }
                      case 41: {
                        s2[396] = (s2[396] | 0) + -1 << 16 >> 16;
                        n3 = f2[61] | 0;
                        f2[n3 + 4 >> 2] = e3;
                        f2[n3 + 12 >> 2] = (f2[70] | 0) + 2;
                        i2[n3 + 24 >> 0] = 1;
                        s2[395] = (s2[395] | 0) + -1 << 16 >> 16;
                        break e;
                      }
                      default: {
                        f2[70] = (f2[70] | 0) + -2;
                        break e;
                      }
                    }
                  }
                  break;
                }
                case 46: {
                  f2[70] = (f2[70] | 0) + 2;
                  if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = f2[70] | 0, (m(e3 + 2 | 0, 44, 6) | 0) == 0) : 0) ? (s2[f2[67] >> 1] | 0) != 46 : 0)
                    A(c3, c3, e3 + 8 | 0, 2);
                  break;
                }
                case 42:
                case 39:
                case 34: {
                  t3 = 17;
                  break;
                }
                case 123: {
                  e3 = f2[70] | 0;
                  if (s2[396] | 0) {
                    f2[70] = e3 + -2;
                    break e;
                  }
                  while (1) {
                    if (e3 >>> 0 >= (f2[71] | 0) >>> 0)
                      break;
                    e3 = w2(1) | 0;
                    if (!(T(e3) | 0)) {
                      if (e3 << 16 >> 16 == 125) {
                        t3 = 32;
                        break;
                      }
                    } else
                      d2(e3);
                    e3 = (f2[70] | 0) + 2 | 0;
                    f2[70] = e3;
                  }
                  if ((t3 | 0) == 32)
                    f2[70] = (f2[70] | 0) + 2;
                  w2(1) | 0;
                  e3 = f2[70] | 0;
                  if (m(e3, 50, 8) | 0) {
                    Q();
                    break e;
                  }
                  f2[70] = e3 + 8;
                  e3 = w2(1) | 0;
                  if (T(e3) | 0) {
                    o2(c3, e3);
                    break e;
                  } else {
                    Q();
                    break e;
                  }
                }
                default:
                  if ((f2[70] | 0) == (a3 | 0))
                    f2[70] = c3 + 10;
                  else
                    t3 = 17;
              }
            } while (0);
          do {
            if ((t3 | 0) == 17) {
              if (s2[396] | 0) {
                f2[70] = (f2[70] | 0) + -2;
                break;
              }
              e3 = f2[71] | 0;
              a3 = f2[70] | 0;
              while (1) {
                if (a3 >>> 0 >= e3 >>> 0) {
                  t3 = 24;
                  break;
                }
                r3 = s2[a3 >> 1] | 0;
                if (T(r3) | 0) {
                  t3 = 22;
                  break;
                }
                n3 = a3 + 2 | 0;
                f2[70] = n3;
                a3 = n3;
              }
              if ((t3 | 0) == 22) {
                o2(c3, r3);
                break;
              } else if ((t3 | 0) == 24) {
                Q();
                break;
              }
            }
          } while (0);
          return;
        }
        function u3(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (s2[e3 >> 1] | 0) {
                case 100:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 105: {
                      e3 = S(e3 + -4 | 0, 90, 2) | 0;
                      break e;
                    }
                    case 108: {
                      e3 = S(e3 + -4 | 0, 94, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 101:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 115:
                      switch (s2[e3 + -4 >> 1] | 0) {
                        case 108: {
                          e3 = j(e3 + -6 | 0, 101) | 0;
                          break e;
                        }
                        case 97: {
                          e3 = j(e3 + -6 | 0, 99) | 0;
                          break e;
                        }
                        default: {
                          e3 = 0;
                          break e;
                        }
                      }
                    case 116: {
                      e3 = S(e3 + -4 | 0, 100, 4) | 0;
                      break e;
                    }
                    case 117: {
                      e3 = S(e3 + -4 | 0, 108, 6) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 102: {
                  if ((s2[e3 + -2 >> 1] | 0) == 111 ? (s2[e3 + -4 >> 1] | 0) == 101 : 0)
                    switch (s2[e3 + -6 >> 1] | 0) {
                      case 99: {
                        e3 = S(e3 + -8 | 0, 120, 6) | 0;
                        break e;
                      }
                      case 112: {
                        e3 = S(e3 + -8 | 0, 132, 2) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  else
                    e3 = 0;
                  break;
                }
                case 107: {
                  e3 = S(e3 + -2 | 0, 136, 4) | 0;
                  break;
                }
                case 110: {
                  e3 = e3 + -2 | 0;
                  if (j(e3, 105) | 0)
                    e3 = 1;
                  else
                    e3 = S(e3, 144, 5) | 0;
                  break;
                }
                case 111: {
                  e3 = j(e3 + -2 | 0, 100) | 0;
                  break;
                }
                case 114: {
                  e3 = S(e3 + -2 | 0, 154, 7) | 0;
                  break;
                }
                case 116: {
                  e3 = S(e3 + -2 | 0, 168, 4) | 0;
                  break;
                }
                case 119:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 101: {
                      e3 = j(e3 + -4 | 0, 110) | 0;
                      break e;
                    }
                    case 111: {
                      e3 = S(e3 + -4 | 0, 176, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                default:
                  e3 = 0;
              }
            } while (0);
          return e3 | 0;
        }
        function o2(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0;
          r3 = (f2[70] | 0) + 2 | 0;
          switch (a3 << 16 >> 16) {
            case 39: {
              d2(39);
              i3 = 5;
              break;
            }
            case 34: {
              d2(34);
              i3 = 5;
              break;
            }
            default:
              Q();
          }
          do {
            if ((i3 | 0) == 5) {
              A(e3, r3, f2[70] | 0, 1);
              f2[70] = (f2[70] | 0) + 2;
              i3 = (w2(0) | 0) << 16 >> 16 == 97;
              a3 = f2[70] | 0;
              if (i3 ? (m(a3 + 2 | 0, 80, 10) | 0) == 0 : 0) {
                f2[70] = a3 + 12;
                if ((w2(1) | 0) << 16 >> 16 != 123) {
                  f2[70] = a3;
                  break;
                }
                e3 = f2[70] | 0;
                r3 = e3;
                e:
                  while (1) {
                    f2[70] = r3 + 2;
                    r3 = w2(1) | 0;
                    switch (r3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        f2[70] = (f2[70] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      case 34: {
                        d2(34);
                        f2[70] = (f2[70] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      default:
                        r3 = P(r3) | 0;
                    }
                    if (r3 << 16 >> 16 != 58) {
                      i3 = 16;
                      break;
                    }
                    f2[70] = (f2[70] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        i3 = 20;
                        break e;
                      }
                    }
                    f2[70] = (f2[70] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 125: {
                        i3 = 25;
                        break e;
                      }
                      case 44:
                        break;
                      default: {
                        i3 = 24;
                        break e;
                      }
                    }
                    f2[70] = (f2[70] | 0) + 2;
                    if ((w2(1) | 0) << 16 >> 16 == 125) {
                      i3 = 25;
                      break;
                    }
                    r3 = f2[70] | 0;
                  }
                if ((i3 | 0) == 16) {
                  f2[70] = a3;
                  break;
                } else if ((i3 | 0) == 20) {
                  f2[70] = a3;
                  break;
                } else if ((i3 | 0) == 24) {
                  f2[70] = a3;
                  break;
                } else if ((i3 | 0) == 25) {
                  i3 = f2[61] | 0;
                  f2[i3 + 16 >> 2] = e3;
                  f2[i3 + 12 >> 2] = (f2[70] | 0) + 2;
                  break;
                }
              }
              f2[70] = a3 + -2;
            }
          } while (0);
          return;
        }
        function h2() {
          var e3 = 0, a3 = 0, r3 = 0, i3 = 0;
          a3 = f2[71] | 0;
          r3 = f2[70] | 0;
          e:
            while (1) {
              e3 = r3 + 2 | 0;
              if (r3 >>> 0 >= a3 >>> 0) {
                a3 = 10;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 96: {
                  a3 = 7;
                  break e;
                }
                case 36: {
                  if ((s2[r3 + 4 >> 1] | 0) == 123) {
                    a3 = 6;
                    break e;
                  }
                  break;
                }
                case 92: {
                  e3 = r3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              r3 = e3;
            }
          if ((a3 | 0) == 6) {
            e3 = r3 + 4 | 0;
            f2[70] = e3;
            a3 = f2[68] | 0;
            i3 = s2[396] | 0;
            r3 = i3 & 65535;
            f2[a3 + (r3 << 3) >> 2] = 4;
            s2[396] = i3 + 1 << 16 >> 16;
            f2[a3 + (r3 << 3) + 4 >> 2] = e3;
          } else if ((a3 | 0) == 7) {
            f2[70] = e3;
            r3 = f2[68] | 0;
            i3 = (s2[396] | 0) + -1 << 16 >> 16;
            s2[396] = i3;
            if ((f2[r3 + ((i3 & 65535) << 3) >> 2] | 0) != 3)
              Q();
          } else if ((a3 | 0) == 10) {
            f2[70] = e3;
            Q();
          }
          return;
        }
        function w2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0;
          r3 = f2[70] | 0;
          e:
            do {
              a3 = s2[r3 >> 1] | 0;
              a:
                do {
                  if (a3 << 16 >> 16 != 47)
                    if (e3)
                      if (R(a3) | 0)
                        break;
                      else
                        break e;
                    else if (D(a3) | 0)
                      break;
                    else
                      break e;
                  else
                    switch (s2[r3 + 2 >> 1] | 0) {
                      case 47: {
                        E();
                        break a;
                      }
                      case 42: {
                        y(e3);
                        break a;
                      }
                      default: {
                        a3 = 47;
                        break e;
                      }
                    }
                } while (0);
              i3 = f2[70] | 0;
              r3 = i3 + 2 | 0;
              f2[70] = r3;
            } while (i3 >>> 0 < (f2[71] | 0) >>> 0);
          return a3 | 0;
        }
        function d2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0;
          t3 = f2[71] | 0;
          a3 = f2[70] | 0;
          while (1) {
            i3 = a3 + 2 | 0;
            if (a3 >>> 0 >= t3 >>> 0) {
              a3 = 9;
              break;
            }
            r3 = s2[i3 >> 1] | 0;
            if (r3 << 16 >> 16 == e3 << 16 >> 16) {
              a3 = 10;
              break;
            }
            if (r3 << 16 >> 16 == 92) {
              r3 = a3 + 4 | 0;
              if ((s2[r3 >> 1] | 0) == 13) {
                a3 = a3 + 6 | 0;
                a3 = (s2[a3 >> 1] | 0) == 10 ? a3 : r3;
              } else
                a3 = r3;
            } else if (X(r3) | 0) {
              a3 = 9;
              break;
            } else
              a3 = i3;
          }
          if ((a3 | 0) == 9) {
            f2[70] = i3;
            Q();
          } else if ((a3 | 0) == 10)
            f2[70] = i3;
          return;
        }
        function v(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, i3 = 0, t3 = 0, c3 = 0;
          r3 = f2[70] | 0;
          i3 = s2[r3 >> 1] | 0;
          c3 = (e3 | 0) == (a3 | 0);
          t3 = c3 ? 0 : e3;
          c3 = c3 ? 0 : a3;
          if (i3 << 16 >> 16 == 97) {
            f2[70] = r3 + 4;
            r3 = w2(1) | 0;
            e3 = f2[70] | 0;
            if (T(r3) | 0) {
              d2(r3);
              a3 = (f2[70] | 0) + 2 | 0;
              f2[70] = a3;
            } else {
              P(r3) | 0;
              a3 = f2[70] | 0;
            }
            i3 = w2(1) | 0;
            r3 = f2[70] | 0;
          }
          if ((r3 | 0) != (e3 | 0))
            O(e3, a3, t3, c3);
          return i3 | 0;
        }
        function A(e3, a3, r3, s3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          s3 = s3 | 0;
          var t3 = 0, c3 = 0;
          t3 = f2[65] | 0;
          f2[65] = t3 + 32;
          c3 = f2[61] | 0;
          f2[((c3 | 0) == 0 ? 228 : c3 + 28 | 0) >> 2] = t3;
          f2[62] = c3;
          f2[61] = t3;
          f2[t3 + 8 >> 2] = e3;
          if (2 == (s3 | 0))
            e3 = r3;
          else
            e3 = 1 == (s3 | 0) ? r3 + 2 | 0 : 0;
          f2[t3 + 12 >> 2] = e3;
          f2[t3 >> 2] = a3;
          f2[t3 + 4 >> 2] = r3;
          f2[t3 + 16 >> 2] = 0;
          f2[t3 + 20 >> 2] = s3;
          i2[t3 + 24 >> 0] = 1 == (s3 | 0) & 1;
          f2[t3 + 28 >> 2] = 0;
          return;
        }
        function C() {
          var e3 = 0, a3 = 0, r3 = 0;
          r3 = f2[71] | 0;
          a3 = f2[70] | 0;
          e:
            while (1) {
              e3 = a3 + 2 | 0;
              if (a3 >>> 0 >= r3 >>> 0) {
                a3 = 6;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 13:
                case 10: {
                  a3 = 6;
                  break e;
                }
                case 93: {
                  a3 = 7;
                  break e;
                }
                case 92: {
                  e3 = a3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              a3 = e3;
            }
          if ((a3 | 0) == 6) {
            f2[70] = e3;
            Q();
            e3 = 0;
          } else if ((a3 | 0) == 7) {
            f2[70] = e3;
            e3 = 93;
          }
          return e3 | 0;
        }
        function g() {
          var e3 = 0, a3 = 0, r3 = 0;
          e:
            while (1) {
              e3 = f2[70] | 0;
              a3 = e3 + 2 | 0;
              f2[70] = a3;
              if (e3 >>> 0 >= (f2[71] | 0) >>> 0) {
                r3 = 7;
                break;
              }
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10: {
                  r3 = 7;
                  break e;
                }
                case 47:
                  break e;
                case 91: {
                  C() | 0;
                  break;
                }
                case 92: {
                  f2[70] = e3 + 4;
                  break;
                }
                default: {
                }
              }
            }
          if ((r3 | 0) == 7)
            Q();
          return;
        }
        function p2(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 62: {
              e3 = (s2[e3 + -2 >> 1] | 0) == 61;
              break;
            }
            case 41:
            case 59: {
              e3 = 1;
              break;
            }
            case 104: {
              e3 = S(e3 + -2 | 0, 202, 4) | 0;
              break;
            }
            case 121: {
              e3 = S(e3 + -2 | 0, 210, 6) | 0;
              break;
            }
            case 101: {
              e3 = S(e3 + -2 | 0, 222, 3) | 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function y(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0, c3 = 0;
          t3 = (f2[70] | 0) + 2 | 0;
          f2[70] = t3;
          r3 = f2[71] | 0;
          while (1) {
            a3 = t3 + 2 | 0;
            if (t3 >>> 0 >= r3 >>> 0)
              break;
            i3 = s2[a3 >> 1] | 0;
            if (!e3 ? X(i3) | 0 : 0)
              break;
            if (i3 << 16 >> 16 == 42 ? (s2[t3 + 4 >> 1] | 0) == 47 : 0) {
              c3 = 8;
              break;
            }
            t3 = a3;
          }
          if ((c3 | 0) == 8) {
            f2[70] = a3;
            a3 = t3 + 4 | 0;
          }
          f2[70] = a3;
          return;
        }
        function m(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var s3 = 0, f3 = 0;
          e:
            do {
              if (!r3)
                e3 = 0;
              else {
                while (1) {
                  s3 = i2[e3 >> 0] | 0;
                  f3 = i2[a3 >> 0] | 0;
                  if (s3 << 24 >> 24 != f3 << 24 >> 24)
                    break;
                  r3 = r3 + -1 | 0;
                  if (!r3) {
                    e3 = 0;
                    break e;
                  } else {
                    e3 = e3 + 1 | 0;
                    a3 = a3 + 1 | 0;
                  }
                }
                e3 = (s3 & 255) - (f3 & 255) | 0;
              }
            } while (0);
          return e3 | 0;
        }
        function I(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33: {
                  e3 = 1;
                  break;
                }
                default:
                  if ((e3 & -8) << 16 >> 16 == 40 | (e3 + -58 & 65535) < 6)
                    e3 = 1;
                  else {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 93:
                      case 94: {
                        e3 = 1;
                        break e;
                      }
                      default: {
                      }
                    }
                    e3 = (e3 + -123 & 65535) < 4;
                  }
              }
            } while (0);
          return e3 | 0;
        }
        function U(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33:
                  break;
                default:
                  if (!((e3 + -58 & 65535) < 6 | (e3 + -40 & 65535) < 7 & e3 << 16 >> 16 != 41)) {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 94:
                        break e;
                      default: {
                      }
                    }
                    return e3 << 16 >> 16 != 125 & (e3 + -123 & 65535) < 4 | 0;
                  }
              }
            } while (0);
          return 1;
        }
        function x(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, i3 = 0, t3 = 0;
          r3 = n2;
          n2 = n2 + 16 | 0;
          i3 = r3;
          f2[i3 >> 2] = 0;
          f2[64] = e3;
          a3 = f2[3] | 0;
          t3 = a3 + (e3 << 1) | 0;
          e3 = t3 + 2 | 0;
          s2[t3 >> 1] = 0;
          f2[i3 >> 2] = e3;
          f2[65] = e3;
          f2[57] = 0;
          f2[61] = 0;
          f2[59] = 0;
          f2[58] = 0;
          f2[63] = 0;
          f2[60] = 0;
          n2 = r3;
          return a3 | 0;
        }
        function S(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var i3 = 0, t3 = 0;
          i3 = e3 + (0 - r3 << 1) | 0;
          t3 = i3 + 2 | 0;
          e3 = f2[3] | 0;
          if (t3 >>> 0 >= e3 >>> 0 ? (m(t3, a3, r3 << 1) | 0) == 0 : 0)
            if ((t3 | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = B(s2[i3 >> 1] | 0) | 0;
          else
            e3 = 0;
          return e3 | 0;
        }
        function O(e3, a3, r3, i3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          i3 = i3 | 0;
          var s3 = 0, t3 = 0;
          s3 = f2[65] | 0;
          f2[65] = s3 + 20;
          t3 = f2[63] | 0;
          f2[((t3 | 0) == 0 ? 232 : t3 + 16 | 0) >> 2] = s3;
          f2[63] = s3;
          f2[s3 >> 2] = e3;
          f2[s3 + 4 >> 2] = a3;
          f2[s3 + 8 >> 2] = r3;
          f2[s3 + 12 >> 2] = i3;
          f2[s3 + 16 >> 2] = 0;
          return;
        }
        function $(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 107: {
              e3 = S(e3 + -2 | 0, 136, 4) | 0;
              break;
            }
            case 101: {
              if ((s2[e3 + -2 >> 1] | 0) == 117)
                e3 = S(e3 + -4 | 0, 108, 6) | 0;
              else
                e3 = 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function j(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0;
          r3 = f2[3] | 0;
          if (r3 >>> 0 <= e3 >>> 0 ? (s2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0)
            if ((r3 | 0) == (e3 | 0))
              r3 = 1;
            else
              r3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          else
            r3 = 0;
          return r3 | 0;
        }
        function B(e3) {
          e3 = e3 | 0;
          e:
            do {
              if ((e3 + -9 & 65535) < 5)
                e3 = 1;
              else {
                switch (e3 << 16 >> 16) {
                  case 32:
                  case 160: {
                    e3 = 1;
                    break e;
                  }
                  default: {
                  }
                }
                e3 = e3 << 16 >> 16 != 46 & (I(e3) | 0);
              }
            } while (0);
          return e3 | 0;
        }
        function E() {
          var e3 = 0, a3 = 0, r3 = 0;
          e3 = f2[71] | 0;
          r3 = f2[70] | 0;
          e:
            while (1) {
              a3 = r3 + 2 | 0;
              if (r3 >>> 0 >= e3 >>> 0)
                break;
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10:
                  break e;
                default:
                  r3 = a3;
              }
            }
          f2[70] = a3;
          return;
        }
        function P(e3) {
          e3 = e3 | 0;
          while (1) {
            if (R(e3) | 0)
              break;
            if (I(e3) | 0)
              break;
            e3 = (f2[70] | 0) + 2 | 0;
            f2[70] = e3;
            e3 = s2[e3 >> 1] | 0;
            if (!(e3 << 16 >> 16)) {
              e3 = 0;
              break;
            }
          }
          return e3 | 0;
        }
        function q() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 20 >> 2] | 0;
          switch (e3 | 0) {
            case 1: {
              e3 = -1;
              break;
            }
            case 2: {
              e3 = -2;
              break;
            }
            default:
              e3 = e3 - (f2[3] | 0) >> 1;
          }
          return e3 | 0;
        }
        function z(e3) {
          e3 = e3 | 0;
          if (!(S(e3, 182, 5) | 0) ? !(S(e3, 192, 3) | 0) : 0)
            e3 = S(e3, 198, 2) | 0;
          else
            e3 = 1;
          return e3 | 0;
        }
        function D(e3) {
          e3 = e3 | 0;
          switch (e3 << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9: {
              e3 = 1;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function F(e3) {
          e3 = e3 | 0;
          if ((f2[3] | 0) == (e3 | 0))
            e3 = 1;
          else
            e3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          return e3 | 0;
        }
        function G() {
          var e3 = 0;
          e3 = f2[(f2[60] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function H() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function J() {
          var e3 = 0;
          e3 = f2[(f2[60] | 0) + 8 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function K() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 16 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function L() {
          var e3 = 0;
          e3 = f2[(f2[59] | 0) + 4 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (f2[3] | 0) >> 1;
          return e3 | 0;
        }
        function M() {
          var e3 = 0;
          e3 = f2[59] | 0;
          e3 = f2[((e3 | 0) == 0 ? 228 : e3 + 28 | 0) >> 2] | 0;
          f2[59] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function N() {
          var e3 = 0;
          e3 = f2[60] | 0;
          e3 = f2[((e3 | 0) == 0 ? 232 : e3 + 16 | 0) >> 2] | 0;
          f2[60] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function Q() {
          i2[794] = 1;
          f2[66] = (f2[70] | 0) - (f2[3] | 0) >> 1;
          f2[70] = (f2[71] | 0) + 2;
          return;
        }
        function R(e3) {
          e3 = e3 | 0;
          return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
        }
        function T(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
        }
        function V() {
          return (f2[(f2[59] | 0) + 8 >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function W() {
          return (f2[(f2[60] | 0) + 4 >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function X(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
        }
        function Y() {
          return (f2[f2[59] >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function Z() {
          return (f2[f2[60] >> 2] | 0) - (f2[3] | 0) >> 1 | 0;
        }
        function _() {
          return t2[(f2[59] | 0) + 24 >> 0] | 0 | 0;
        }
        function ee(e3) {
          e3 = e3 | 0;
          f2[3] = e3;
          return;
        }
        function ae() {
          return (i2[795] | 0) != 0 | 0;
        }
        function re() {
          return f2[66] | 0;
        }
        function ie(e3) {
          e3 = e3 | 0;
          n2 = e3 + 992 + 15 & -16;
          return 992;
        }
        return { su: ie, ai: K, e: re, ee: W, ele: G, els: J, es: Z, f: ae, id: q, ie: L, ip: _, is: Y, p: b2, re: N, ri: M, sa: x, se: H, ses: ee, ss: V };
      }("undefined" != typeof self ? self : globalThis, {}, a), r = e.su(i - (2 << 17));
    }
    const h = t.length + 1;
    e.ses(r), e.sa(h - 1), s(t, new Uint16Array(a, r, h)), e.p() || (n = e.e(), o());
    const w = [], d = [];
    for (; e.ri(); ) {
      const a2 = e.is(), r2 = e.ie(), i2 = e.ai(), s2 = e.id(), f2 = e.ss(), c2 = e.se();
      let n2;
      e.ip() && (n2 = b(-1 === s2 ? a2 : a2 + 1, t.charCodeAt(-1 === s2 ? a2 - 1 : a2))), w.push({ n: n2, s: a2, e: r2, ss: f2, se: c2, d: s2, a: i2 });
    }
    for (; e.re(); ) {
      const a2 = e.es(), r2 = e.ee(), i2 = e.els(), s2 = e.ele(), f2 = t.charCodeAt(a2), c2 = i2 >= 0 ? t.charCodeAt(i2) : -1;
      d.push({ s: a2, e: r2, ls: i2, le: s2, n: 34 === f2 || 39 === f2 ? b(a2 + 1, f2) : t.slice(a2, r2), ln: i2 < 0 ? void 0 : 34 === c2 || 39 === c2 ? b(i2 + 1, c2) : t.slice(i2, s2) });
    }
    return [w, d, !!e.f()];
  }
  function b(e2, a2) {
    n = e2;
    let r2 = "", i2 = n;
    for (; ; ) {
      n >= t.length && o();
      const e3 = t.charCodeAt(n);
      if (e3 === a2)
        break;
      92 === e3 ? (r2 += t.slice(i2, n), r2 += l(), i2 = n) : (8232 === e3 || 8233 === e3 || u(e3) && o(), ++n);
    }
    return r2 += t.slice(i2, n++), r2;
  }
  function l() {
    let e2 = t.charCodeAt(++n);
    switch (++n, e2) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(k(2));
      case 117:
        return function() {
          let e3;
          123 === t.charCodeAt(n) ? (++n, e3 = k(t.indexOf("}", n) - n), ++n, e3 > 1114111 && o()) : e3 = k(4);
          return e3 <= 65535 ? String.fromCharCode(e3) : (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10), 56320 + (1023 & e3)));
        }();
      case 116:
        return "	";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        10 === t.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o();
      default:
        if (e2 >= 48 && e2 <= 55) {
          let a2 = t.substr(n - 1, 3).match(/^[0-7]+/)[0], r2 = parseInt(a2, 8);
          return r2 > 255 && (a2 = a2.slice(0, -1), r2 = parseInt(a2, 8)), n += a2.length - 1, e2 = t.charCodeAt(n), "0" === a2 && 56 !== e2 && 57 !== e2 || o(), String.fromCharCode(r2);
        }
        return u(e2) ? "" : String.fromCharCode(e2);
    }
  }
  function k(e2) {
    const a2 = n;
    let r2 = 0, i2 = 0;
    for (let a3 = 0; a3 < e2; ++a3, ++n) {
      let e3, s2 = t.charCodeAt(n);
      if (95 !== s2) {
        if (s2 >= 97)
          e3 = s2 - 97 + 10;
        else if (s2 >= 65)
          e3 = s2 - 65 + 10;
        else {
          if (!(s2 >= 48 && s2 <= 57))
            break;
          e3 = s2 - 48;
        }
        if (e3 >= 16)
          break;
        i2 = s2, r2 = 16 * r2 + e3;
      } else
        95 !== i2 && 0 !== a3 || o(), i2 = s2;
    }
    return 95 !== i2 && n - a2 === e2 || o(), r2;
  }
  function u(e2) {
    return 13 === e2 || 10 === e2;
  }
  function o() {
    throw Object.assign(Error(`Parse error ${c$1}:${t.slice(0, n).split("\n").length}:${n - t.lastIndexOf("\n", n - 1)}`), { idx: n });
  }
  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      b: !urlResolved && !isURL(id)
    };
  }
  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve);
    if (result && result.then)
      result = await result;
    return result ? { r: result, b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id) } : _resolve(id, parentUrl);
  } : _resolve;
  async function importShim2(id, ...args) {
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== "string")
      parentUrl = baseUrl;
    await initPromise;
    if (importHook)
      await importHook(id, typeof args[1] !== "string" ? args[1] : {}, parentUrl);
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument)
        processScriptsAndPreloads(true);
      if (!shimMode)
        acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, { credentials: "same-origin" });
  }
  self.importShim = importShim2;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  importShim2.resolve = resolveSync;
  importShim2.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim2.addImportMap = (importMapIn) => {
    if (!shimMode)
      throw new Error("Unsupported in polyfill mode.");
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };
  const registry = importShim2._r = {};
  async function loadAll(load, seen) {
    if (load.b || seen[load.u])
      return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map((dep) => loadAll(dep, seen)));
    if (!load.n)
      load.n = load.d.some((dep) => dep.n);
  }
  let importMap = { imports: {}, scopes: {} };
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && true;
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || ((type) => type === "classic" || type === "module");
        HTMLScriptElement.supports = (type) => type === "importmap" || supports(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type !== "childList")
              continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === "SCRIPT") {
                if (node.type === (shimMode ? "module-shim" : "module"))
                  processScript(node, true);
                if (node.type === (shimMode ? "importmap-shim" : "importmap"))
                  processImportMap(node, true);
              } else if (node.tagName === "LINK" && node.rel === (shimMode ? "modulepreload-shim" : "modulepreload")) {
                processPreload(node);
              }
            }
          }
        }).observe(document, { childList: true, subtree: true });
        processScriptsAndPreloads();
        if (document.readyState === "complete") {
          readyStateCompleteCheck();
        } else {
          async function readyListener() {
            await initPromise;
            processScriptsAndPreloads();
            if (document.readyState === "complete") {
              readyStateCompleteCheck();
              document.removeEventListener("readystatechange", readyListener);
            }
          }
          document.addEventListener("readystatechange", readyListener);
        }
      }
    }
    return void 0;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise2) {
    if (!shimMode)
      acceptingImportMaps = false;
    await initPromise;
    await importMapPromise;
    if (importHook)
      await importHook(url, typeof fetchOpts !== "string" ? fetchOpts : {}, "");
    if (!shimMode && baselinePassthrough) {
      if (nativelyLoaded)
        return null;
      await lastStaticLoadPromise2;
      return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
    }
    const load = getOrCreateLoad(url, fetchOpts, null, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = void 0;
    resolveDeps(load, seen);
    await lastStaticLoadPromise2;
    if (source && !shimMode && !load.n && true) {
      const module2 = await dynamicImport(createBlob(source), { errUrl: source });
      if (revokeBlobURLs)
        revokeObjectURLs(Object.keys(seen));
      return module2;
    }
    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }
    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, { errUrl: load.u });
    if (load.s)
      (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs)
      revokeObjectURLs(Object.keys(seen));
    return module;
  }
  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength)
        return;
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load)
          URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  let lastLoad;
  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;
    for (const dep of load.d)
      resolveDeps(dep, seen);
    const [imports, exports] = load.a;
    const source = load.S;
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
    if (!imports.length) {
      resolvedSource += source;
    } else {
      let pushStringTo = function(originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }
        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      };
      let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
      for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports) {
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
          if (cycleShell) {
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => {
                const q = depLoad.S[s2] === '"' || depLoad.S[s2] === "'";
                return `e$_${i2}=m${q ? `[` : "."}${depLoad.S.slice(s2, e2)}${q ? `]` : ""}`;
              }).join(",")}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i2) => `e$_${i2}`).join(",")};` : ""}export {${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => `e$_${i2} as ${depLoad.S.slice(s2, e2)}`).join(",")}}
//# sourceURL=${depLoad.r}?cycle`);
            }
          }
          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;
          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = void 0;
          }
          lastIndex = statementEnd;
        } else if (dynamicImportIndex === -2) {
          load.m = { url: load.r, resolve: metaResolve };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        } else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      }
      if (load.s)
        resolvedSource += `
;import{u$_}from'${load.s}';try{u$_({${exports.filter((e2) => e2.ln).map(({ s: s2, e: e2, ln }) => `${source.slice(s2, e2)}: ${ln}`).join(",")}})}catch(_){};
`;
      pushStringTo(source.length);
    }
    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL)
      resolvedSource += "\n//# sourceURL=" + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = void 0;
  }
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let p = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100)
      return new Promise((r2) => p.push(r2));
  }
  function popFetchPool() {
    c--;
    if (p.length)
      p.shift()();
  }
  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue)
      await poolQueue;
    try {
      var res2 = await fetchHook(url, fetchOpts);
    } catch (e2) {
      e2.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.
` + e2.message;
      throw e2;
    } finally {
      popFetchPool();
    }
    if (!res2.ok)
      throw Error(`${res2.status} ${res2.statusText} ${res2.url}${fromParent(parent)}`);
    return res2;
  }
  async function fetchModule(url, fetchOpts, parent) {
    const res2 = await doFetch(url, fetchOpts, parent);
    const contentType = res2.headers.get("content-type");
    if (jsContentType.test(contentType))
      return { r: res2.url, s: await res2.text(), t: "js" };
    else if (jsonContentType.test(contentType))
      return { r: res2.url, s: `export default ${await res2.text()}`, t: "json" };
    else if (cssContentType.test(contentType)) {
      return { r: res2.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res2.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
    } else
      throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }
  function getOrCreateLoad(url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source)
      return load;
    load = {
      u: url,
      r: source ? url : void 0,
      f: void 0,
      S: void 0,
      L: void 0,
      a: void 0,
      d: void 0,
      b: void 0,
      s: void 0,
      n: false,
      t: null,
      m: null
    };
    if (registry[url]) {
      let i2 = 0;
      while (registry[load.u + ++i2])
        ;
      load.u += i2;
    }
    registry[load.u] = load;
    load.f = (async () => {
      if (!source) {
        let t2;
        ({ r: load.r, s: source, t: t2 } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));
        if (t2 && !shimMode) {
          if (t2 === "css" && !cssModulesEnabled || t2 === "json" && !jsonModulesEnabled)
            throw Error(`${t2}-modules require <script type="esms-options">{ "polyfillEnable": ["${t2}-modules"] }<${""}/script>`);
          if (t2 === "css" && !supportsCssAssertions || t2 === "json" && !supportsJsonAssertions)
            load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      } catch (e2) {
        throwError(e2);
        load.a = [[], [], false];
      }
      load.S = source;
      return load;
    })();
    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({ n: n2, d }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta)
          load.n = true;
        if (d !== -1 || !n2)
          return;
        const { r: r2, b: b2 } = await resolve(n2, load.r || load.u);
        if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (d !== -1)
          return;
        if (skip && skip(r2))
          return { b: r2 };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        return getOrCreateLoad(r2, childFetchOpts, load.r).f;
      }))).filter((l2) => l2);
    });
    return load;
  }
  function processScriptsAndPreloads(mapsOnly = false) {
    if (!mapsOnly)
      for (const link of document.querySelectorAll(shimMode ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]"))
        processPreload(link);
    for (const script of document.querySelectorAll(shimMode ? "script[type=importmap-shim]" : "script[type=importmap]"))
      processImportMap(script);
    if (!mapsOnly)
      for (const script of document.querySelectorAll(shimMode ? "script[type=module-shim]" : "script[type=module]"))
        processScript(script);
  }
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("DOMContentLoaded"));
  }
  if (hasDocument) {
    document.addEventListener("DOMContentLoaded", async () => {
      await initPromise;
      if (shimMode || !baselinePassthrough)
        domContentLoadedCheck();
    });
  }
  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("readystatechange"));
  }
  const hasNext = (script) => script.nextSibling || script.parentNode && hasNext(script.parentNode);
  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute("noshim") !== null || !(script.ep = true);
  function processImportMap(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready))
      return;
    if (script.src) {
      if (!shimMode)
        return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch((e2) => {
        console.log(e2);
        if (e2 instanceof SyntaxError)
          e2 = new Error(`Unable to parse import map ${e2.message} in: ${script.src || script.innerHTML}`);
        throwError(e2);
      });
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }
  function processScript(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready))
      return;
    const isBlockingReadyScript = script.getAttribute("async") === null && readyStateCompleteCnt > 0;
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript)
      readyStateCompleteCnt++;
    if (isDomContentLoadedScript)
      domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (isBlockingReadyScript)
      lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript)
      loadPromise.then(domContentLoadedCheck);
  }
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();

// js/importmap.json
var importmap_default = {
  imports: {
    "framer-motion": "/motion.mjs",
    "@emotion/react": "/emotion.mjs",
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    react: "/reactMod.mjs",
    "react-dom": "/reactMod.mjs",
    "react-dom/client": "/reactMod.mjs"
  }
};

// js/react-jsx-runtime.ts
var imp = { ...importmap_default.imports };
var res = {};
Object.keys(imp).map((k) => Object.assign(res, { [k]: location.origin + imp[k] }));
importShim.addImportMap({ imports: res });
var runtime = () => {
  if (globalThis.React)
    return;
  const React2 = require_react();
  Object.assign(globalThis, { React: React2 });
  const ReactDOM2 = require_react_dom();
  Object.assign(globalThis, { ReactDOM: ReactDOM2 });
  const ReactDOMClient2 = require_client();
  Object.assign(globalThis, { ReactDOMClient: ReactDOMClient2 });
  const ReactJSXRuntime2 = require_jsx_runtime();
  Object.assign(globalThis, { ReactJSXRuntime: ReactJSXRuntime2 });
  const emotionReact2 = require_emotion_react_cjs();
  Object.assign(globalThis, { emotionReact: emotionReact2 });
  const emotionReactJsxRuntime2 = require_emotion_react_jsx_runtime_cjs();
  Object.assign(globalThis, { emotionReactJsxRuntime: emotionReactJsxRuntime2 });
  emotionReactJsxRuntime2.emotionJsx = emotionReactJsxRuntime2.jsx;
  const createEmotionCache2 = require_emotion_cache_cjs().default;
  Object.assign(globalThis, { createEmotionCache: createEmotionCache2 });
  const styled2 = require_emotion_styled_cjs().default;
  Object.assign(globalThis, { styled: styled2 });
  emotionReactJsxRuntime2.jsx = function() {
    const props = arguments[1];
    if (Object.hasOwn(props, "css") && typeof props.css === "string") {
      props.css = emotionReact2.css`${props.css}`;
    }
    return emotionReactJsxRuntime2.emotionJsx.apply(
      emotionReactJsxRuntime2,
      arguments
    );
  };
  const FramerMotion2 = require_cjs();
  Object.assign(globalThis, { FramerMotion: FramerMotion2 });
};
runtime();
var {
  React,
  ReactDOM,
  ReactDOMClient,
  ReactJSXRuntime,
  emotionReact,
  emotionReactJsxRuntime,
  ReactDOMServer,
  createEmotionCache,
  styled,
  FramerMotion
} = globalThis;
var mapTable = {
  "react": React,
  "react-dom": ReactDOM,
  "react-dom/client": ReactDOMClient,
  "@emotion/react": emotionReact,
  "@emotion/styled": styled,
  "@emotion/cache": createEmotionCache,
  "@emotion/react/jsx-runtime": emotionReactJsxRuntime,
  "react/jsx-runtime": ReactJSXRuntime,
  "react-dom/server": ReactDOMServer,
  "framer-motion": FramerMotion
};
globalThis.requireLoading = [];
var requireUmd = (pkg) => {
  if (mapTable[pkg])
    return mapTable[pkg];
  if (window[pkg])
    return window[pkg];
  if (globalThis[pkg])
    return globalThis[pkg];
  if (apps[pkg])
    return apps[pkg];
  if (pkg.includes(`spike.land/live`))
    return React.lazy(() => importShim(pkg));
};
Object.assign(globalThis, { require: requireUmd });
export {
  FramerMotion,
  React,
  ReactDOM,
  ReactDOMClient,
  ReactDOMServer,
  ReactJSXRuntime,
  createEmotionCache,
  emotionReact,
  emotionReactJsxRuntime,
  styled
};
