import {
  require_dist,
  require_is_prop_valid_browser_cjs,
  require_tslib
} from "./chunk-chunk-D72R3LWS.mjs";
import {
  require_react
} from "./chunk-chunk-BH3GJV4T.mjs";
import {
  __commonJS,
  __name,
  define_process_default,
  init_define_process
} from "./chunk-chunk-CIPP7HWN.mjs";

// ../../node_modules/style-value-types/dist/valueTypes.cjs.js
var require_valueTypes_cjs = __commonJS({
  "../../node_modules/style-value-types/dist/valueTypes.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var clamp = /* @__PURE__ */ __name((min, max) => (v) => Math.max(Math.min(v, max), min), "clamp");
    var sanitize = /* @__PURE__ */ __name((v) => v % 1 ? Number(v.toFixed(5)) : v, "sanitize");
    var floatRegex = /(-)?([\d]*\.?[\d])+/g;
    var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
    var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
    function isString(v) {
      return typeof v === "string";
    }
    __name(isString, "isString");
    var number = {
      test: (v) => typeof v === "number",
      parse: parseFloat,
      transform: (v) => v
    };
    var alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
    var scale = Object.assign(Object.assign({}, number), { default: 1 });
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
    var isColorString = /* @__PURE__ */ __name((type, testProp) => (v) => {
      return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
    }, "isColorString");
    var splitColor = /* @__PURE__ */ __name((aName, bName, cName) => (v) => {
      if (!isString(v))
        return v;
      const [a, b, c, alpha2] = v.match(floatRegex);
      return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
      };
    }, "splitColor");
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
    __name(parseHex, "parseHex");
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

// ../../node_modules/framesync/dist/framesync.cjs.js
var require_framesync_cjs = __commonJS({
  "../../node_modules/framesync/dist/framesync.cjs.js"(exports) {
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
    __name(createRenderStep, "createRenderStep");
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
    exports.cancelSync = cancelSync;
    exports.default = sync;
    exports.flushSync = flushSync;
    exports.getFrameData = getFrameData;
  }
});

// ../../node_modules/popmotion/dist/popmotion.cjs.js
var require_popmotion_cjs = __commonJS({
  "../../node_modules/popmotion/dist/popmotion.cjs.js"(exports) {
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
    __name(_interopDefaultLegacy, "_interopDefaultLegacy");
    var sync__default = /* @__PURE__ */ _interopDefaultLegacy(sync);
    var clamp = /* @__PURE__ */ __name((min, max, v) => Math.min(Math.max(v, min), max), "clamp");
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
    var progress = /* @__PURE__ */ __name((from, to, value) => {
      const toFromDifference = to - from;
      return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    }, "progress");
    var mix = /* @__PURE__ */ __name((from, to, progress2) => -progress2 * from + progress2 * to + from, "mix");
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
    __name(hslaToRgba, "hslaToRgba");
    var mixLinearColor = /* @__PURE__ */ __name((from, to, v) => {
      const fromExpo = from * from;
      const toExpo = to * to;
      return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
    }, "mixLinearColor");
    var colorTypes = [styleValueTypes.hex, styleValueTypes.rgba, styleValueTypes.hsla];
    var getColorType = /* @__PURE__ */ __name((v) => colorTypes.find((type) => type.test(v)), "getColorType");
    var notAnimatable = /* @__PURE__ */ __name((color) => `'${color}' is not an animatable color. Use the equivalent color code instead.`, "notAnimatable");
    var mixColor = /* @__PURE__ */ __name((from, to) => {
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
    }, "mixColor");
    var zeroPoint = {
      x: 0,
      y: 0,
      z: 0
    };
    var isNum = /* @__PURE__ */ __name((v) => typeof v === "number", "isNum");
    var combineFunctions = /* @__PURE__ */ __name((a2, b2) => (v) => b2(a2(v)), "combineFunctions");
    var pipe = /* @__PURE__ */ __name((...transformers) => transformers.reduce(combineFunctions), "pipe");
    function getMixer(origin, target) {
      if (isNum(origin)) {
        return (v) => mix(origin, target, v);
      } else if (styleValueTypes.color.test(origin)) {
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
    __name(analyse, "analyse");
    var mixComplex = /* @__PURE__ */ __name((origin, target) => {
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
    }, "mixComplex");
    var mixNumber = /* @__PURE__ */ __name((from, to) => (p) => mix(from, to, p), "mixNumber");
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
    __name(interpolate, "interpolate");
    var reverseEasing = /* @__PURE__ */ __name((easing) => (p) => 1 - easing(1 - p), "reverseEasing");
    var mirrorEasing = /* @__PURE__ */ __name((easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2, "mirrorEasing");
    var createExpoIn = /* @__PURE__ */ __name((power) => (p) => Math.pow(p, power), "createExpoIn");
    var createBackIn = /* @__PURE__ */ __name((power) => (p) => p * p * ((power + 1) * p - power), "createBackIn");
    var createAnticipate = /* @__PURE__ */ __name((power) => {
      const backEasing = createBackIn(power);
      return (p) => (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
    }, "createAnticipate");
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
    var framesync = /* @__PURE__ */ __name((update) => {
      const passTimestamp = /* @__PURE__ */ __name(({ delta }) => update(delta), "passTimestamp");
      return {
        start: () => sync__default["default"].update(passTimestamp, true),
        stop: () => sync.cancelSync.update(passTimestamp)
      };
    }, "framesync");
    function animate2(_a) {
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
    __name(animate2, "animate");
    function velocityPerSecond(velocity, frameDuration) {
      return frameDuration ? velocity * (1e3 / frameDuration) : 0;
    }
    __name(velocityPerSecond, "velocityPerSecond");
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
      function startAnimation(options) {
        currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
        currentAnimation = animate2(Object.assign(Object.assign({}, options), {
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
      __name(startAnimation, "startAnimation");
      function startSpring(options) {
        startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
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
          velocity = velocityPerSecond(v - prev, sync.getFrameData().delta);
          if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
            startSpring({ from: v, to: boundary, velocity });
          }
        }, "checkBoundary");
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
    __name(inertia, "inertia");
    var radiansToDegrees = /* @__PURE__ */ __name((radians) => radians * 180 / Math.PI, "radiansToDegrees");
    var angle = /* @__PURE__ */ __name((a2, b2 = zeroPoint) => radiansToDegrees(Math.atan2(b2.y - a2.y, b2.x - a2.x)), "angle");
    var applyOffset = /* @__PURE__ */ __name((from, to) => {
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
    }, "applyOffset");
    var identity = /* @__PURE__ */ __name((v) => v, "identity");
    var createAttractor = /* @__PURE__ */ __name((alterDisplacement = identity) => (constant, origin, v) => {
      const displacement = origin - v;
      const springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
      return displacement <= 0 ? origin + springModifiedDisplacement : origin - springModifiedDisplacement;
    }, "createAttractor");
    var attract = createAttractor();
    var attractExpo = createAttractor(Math.sqrt);
    var degreesToRadians = /* @__PURE__ */ __name((degrees) => degrees * Math.PI / 180, "degreesToRadians");
    var isPoint = /* @__PURE__ */ __name((point) => point.hasOwnProperty("x") && point.hasOwnProperty("y"), "isPoint");
    var isPoint3D = /* @__PURE__ */ __name((point) => isPoint(point) && point.hasOwnProperty("z"), "isPoint3D");
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
    var pointFromVector = /* @__PURE__ */ __name((origin, angle2, distance2) => {
      angle2 = degreesToRadians(angle2);
      return {
        x: distance2 * Math.cos(angle2) + origin.x,
        y: distance2 * Math.sin(angle2) + origin.y
      };
    }, "pointFromVector");
    var toDecimal = /* @__PURE__ */ __name((num, precision = 2) => {
      precision = Math.pow(10, precision);
      return Math.round(num * precision) / precision;
    }, "toDecimal");
    var smoothFrame = /* @__PURE__ */ __name((prevValue, nextValue, duration, smoothing = 0) => toDecimal(prevValue + duration * (nextValue - prevValue) / Math.max(smoothing, duration)), "smoothFrame");
    var smooth = /* @__PURE__ */ __name((strength = 50) => {
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
    }, "smooth");
    var snap = /* @__PURE__ */ __name((points) => {
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
    }, "snap");
    function velocityPerFrame(xps, frameDuration) {
      return xps / (1e3 / frameDuration);
    }
    __name(velocityPerFrame, "velocityPerFrame");
    var wrap = /* @__PURE__ */ __name((min, max, v) => {
      const rangeSize = max - min;
      return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
    }, "wrap");
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
    var steps = /* @__PURE__ */ __name((steps2, direction = "end") => (progress2) => {
      progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
      const expanded = progress2 * steps2;
      const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
      return clamp(0, 1, rounded / steps2);
    }, "steps");
    exports.angle = angle;
    exports.animate = animate2;
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

// ../../node_modules/@motionone/types/dist/MotionValue.cjs.js
var require_MotionValue_cjs = __commonJS({
  "../../node_modules/@motionone/types/dist/MotionValue.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MotionValue2 = class {
      setAnimation(animation) {
        this.animation = animation;
        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
        });
      }
      clearAnimation() {
        this.animation = this.generator = void 0;
      }
    };
    __name(MotionValue2, "MotionValue");
    exports.MotionValue = MotionValue2;
  }
});

// ../../node_modules/@motionone/types/dist/index.cjs.js
var require_index_cjs = __commonJS({
  "../../node_modules/@motionone/types/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MotionValue2 = require_MotionValue_cjs();
    exports.MotionValue = MotionValue2.MotionValue;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/data.cjs.js
var require_data_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/data.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var types = require_index_cjs();
    var data = /* @__PURE__ */ new WeakMap();
    function getAnimationData(element) {
      if (!data.has(element)) {
        data.set(element, {
          transforms: [],
          values: /* @__PURE__ */ new Map()
        });
      }
      return data.get(element);
    }
    __name(getAnimationData, "getAnimationData");
    function getMotionValue(motionValues, name) {
      if (!motionValues.has(name)) {
        motionValues.set(name, new types.MotionValue());
      }
      return motionValues.get(name);
    }
    __name(getMotionValue, "getMotionValue");
    exports.getAnimationData = getAnimationData;
    exports.getMotionValue = getMotionValue;
  }
});

// ../../node_modules/@motionone/utils/dist/array.cjs.js
var require_array_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/array.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function addUniqueItem(array, item) {
      array.indexOf(item) === -1 && array.push(item);
    }
    __name(addUniqueItem, "addUniqueItem");
    function removeItem(arr, item) {
      const index = arr.indexOf(item);
      index > -1 && arr.splice(index, 1);
    }
    __name(removeItem, "removeItem");
    exports.addUniqueItem = addUniqueItem;
    exports.removeItem = removeItem;
  }
});

// ../../node_modules/@motionone/utils/dist/clamp.cjs.js
var require_clamp_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/clamp.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var clamp = /* @__PURE__ */ __name((min, max, v) => Math.min(Math.max(v, min), max), "clamp");
    exports.clamp = clamp;
  }
});

// ../../node_modules/@motionone/utils/dist/defaults.cjs.js
var require_defaults_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/defaults.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaults = {
      duration: 0.3,
      delay: 0,
      endDelay: 0,
      repeat: 0,
      easing: "ease"
    };
    exports.defaults = defaults;
  }
});

// ../../node_modules/@motionone/utils/dist/is-number.cjs.js
var require_is_number_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/is-number.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isNumber = /* @__PURE__ */ __name((value) => typeof value === "number", "isNumber");
    exports.isNumber = isNumber;
  }
});

// ../../node_modules/@motionone/utils/dist/is-easing-list.cjs.js
var require_is_easing_list_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/is-easing-list.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isNumber = require_is_number_cjs();
    var isEasingList = /* @__PURE__ */ __name((easing) => Array.isArray(easing) && !isNumber.isNumber(easing[0]), "isEasingList");
    exports.isEasingList = isEasingList;
  }
});

// ../../node_modules/@motionone/utils/dist/wrap.cjs.js
var require_wrap_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/wrap.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var wrap = /* @__PURE__ */ __name((min, max, v) => {
      const rangeSize = max - min;
      return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
    }, "wrap");
    exports.wrap = wrap;
  }
});

// ../../node_modules/@motionone/utils/dist/easing.cjs.js
var require_easing_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isEasingList = require_is_easing_list_cjs();
    var wrap = require_wrap_cjs();
    function getEasingForSegment(easing, i) {
      return isEasingList.isEasingList(easing) ? easing[wrap.wrap(0, easing.length, i)] : easing;
    }
    __name(getEasingForSegment, "getEasingForSegment");
    exports.getEasingForSegment = getEasingForSegment;
  }
});

// ../../node_modules/@motionone/utils/dist/mix.cjs.js
var require_mix_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/mix.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var mix = /* @__PURE__ */ __name((min, max, progress) => -progress * min + progress * max + min, "mix");
    exports.mix = mix;
  }
});

// ../../node_modules/@motionone/utils/dist/noop.cjs.js
var require_noop_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/noop.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var noop = /* @__PURE__ */ __name(() => {
    }, "noop");
    var noopReturn = /* @__PURE__ */ __name((v) => v, "noopReturn");
    exports.noop = noop;
    exports.noopReturn = noopReturn;
  }
});

// ../../node_modules/@motionone/utils/dist/progress.cjs.js
var require_progress_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/progress.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var progress = /* @__PURE__ */ __name((min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min), "progress");
    exports.progress = progress;
  }
});

// ../../node_modules/@motionone/utils/dist/offset.cjs.js
var require_offset_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/offset.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var mix = require_mix_cjs();
    var progress = require_progress_cjs();
    function fillOffset(offset, remaining) {
      const min = offset[offset.length - 1];
      for (let i = 1; i <= remaining; i++) {
        const offsetProgress = progress.progress(0, remaining, i);
        offset.push(mix.mix(min, 1, offsetProgress));
      }
    }
    __name(fillOffset, "fillOffset");
    function defaultOffset(length2) {
      const offset = [0];
      fillOffset(offset, length2 - 1);
      return offset;
    }
    __name(defaultOffset, "defaultOffset");
    exports.defaultOffset = defaultOffset;
    exports.fillOffset = fillOffset;
  }
});

// ../../node_modules/@motionone/utils/dist/interpolate.cjs.js
var require_interpolate_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/interpolate.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var mix = require_mix_cjs();
    var noop = require_noop_cjs();
    var offset = require_offset_cjs();
    var progress = require_progress_cjs();
    var easing = require_easing_cjs();
    var clamp = require_clamp_cjs();
    function interpolate(output, input = offset.defaultOffset(output.length), easing$1 = noop.noopReturn) {
      const length2 = output.length;
      const remainder = length2 - input.length;
      remainder > 0 && offset.fillOffset(input, remainder);
      return (t) => {
        let i = 0;
        for (; i < length2 - 2; i++) {
          if (t < input[i + 1])
            break;
        }
        let progressInRange = clamp.clamp(0, 1, progress.progress(input[i], input[i + 1], t));
        const segmentEasing = easing.getEasingForSegment(easing$1, i);
        progressInRange = segmentEasing(progressInRange);
        return mix.mix(output[i], output[i + 1], progressInRange);
      };
    }
    __name(interpolate, "interpolate");
    exports.interpolate = interpolate;
  }
});

// ../../node_modules/@motionone/utils/dist/is-cubic-bezier.cjs.js
var require_is_cubic_bezier_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/is-cubic-bezier.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isNumber = require_is_number_cjs();
    var isCubicBezier = /* @__PURE__ */ __name((easing) => Array.isArray(easing) && isNumber.isNumber(easing[0]), "isCubicBezier");
    exports.isCubicBezier = isCubicBezier;
  }
});

// ../../node_modules/@motionone/utils/dist/is-easing-generator.cjs.js
var require_is_easing_generator_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/is-easing-generator.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isEasingGenerator = /* @__PURE__ */ __name((easing) => typeof easing === "object" && Boolean(easing.createAnimation), "isEasingGenerator");
    exports.isEasingGenerator = isEasingGenerator;
  }
});

// ../../node_modules/@motionone/utils/dist/is-function.cjs.js
var require_is_function_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/is-function.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isFunction = /* @__PURE__ */ __name((value) => typeof value === "function", "isFunction");
    exports.isFunction = isFunction;
  }
});

// ../../node_modules/@motionone/utils/dist/is-string.cjs.js
var require_is_string_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/is-string.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isString = /* @__PURE__ */ __name((value) => typeof value === "string", "isString");
    exports.isString = isString;
  }
});

// ../../node_modules/@motionone/utils/dist/time.cjs.js
var require_time_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/time.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var time = {
      ms: (seconds) => seconds * 1e3,
      s: (milliseconds) => milliseconds / 1e3
    };
    exports.time = time;
  }
});

// ../../node_modules/@motionone/utils/dist/velocity.cjs.js
var require_velocity_cjs = __commonJS({
  "../../node_modules/@motionone/utils/dist/velocity.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function velocityPerSecond(velocity, frameDuration) {
      return frameDuration ? velocity * (1e3 / frameDuration) : 0;
    }
    __name(velocityPerSecond, "velocityPerSecond");
    exports.velocityPerSecond = velocityPerSecond;
  }
});

// ../../node_modules/@motionone/utils/dist/index.cjs.js
var require_index_cjs2 = __commonJS({
  "../../node_modules/@motionone/utils/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var array = require_array_cjs();
    var clamp = require_clamp_cjs();
    var defaults = require_defaults_cjs();
    var easing = require_easing_cjs();
    var interpolate = require_interpolate_cjs();
    var isCubicBezier = require_is_cubic_bezier_cjs();
    var isEasingGenerator = require_is_easing_generator_cjs();
    var isEasingList = require_is_easing_list_cjs();
    var isFunction = require_is_function_cjs();
    var isNumber = require_is_number_cjs();
    var isString = require_is_string_cjs();
    var mix = require_mix_cjs();
    var noop = require_noop_cjs();
    var offset = require_offset_cjs();
    var progress = require_progress_cjs();
    var time = require_time_cjs();
    var velocity = require_velocity_cjs();
    var wrap = require_wrap_cjs();
    exports.addUniqueItem = array.addUniqueItem;
    exports.removeItem = array.removeItem;
    exports.clamp = clamp.clamp;
    exports.defaults = defaults.defaults;
    exports.getEasingForSegment = easing.getEasingForSegment;
    exports.interpolate = interpolate.interpolate;
    exports.isCubicBezier = isCubicBezier.isCubicBezier;
    exports.isEasingGenerator = isEasingGenerator.isEasingGenerator;
    exports.isEasingList = isEasingList.isEasingList;
    exports.isFunction = isFunction.isFunction;
    exports.isNumber = isNumber.isNumber;
    exports.isString = isString.isString;
    exports.mix = mix.mix;
    exports.noop = noop.noop;
    exports.noopReturn = noop.noopReturn;
    exports.defaultOffset = offset.defaultOffset;
    exports.fillOffset = offset.fillOffset;
    exports.progress = progress.progress;
    exports.time = time.time;
    exports.velocityPerSecond = velocity.velocityPerSecond;
    exports.wrap = wrap.wrap;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/transforms.cjs.js
var require_transforms_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/transforms.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var data = require_data_cjs();
    var axes = ["", "X", "Y", "Z"];
    var order = ["translate", "scale", "rotate", "skew"];
    var transformAlias = {
      x: "translateX",
      y: "translateY",
      z: "translateZ"
    };
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
        toDefaultUnit: utils.noopReturn
      },
      skew: rotation
    };
    var transformDefinitions = /* @__PURE__ */ new Map();
    var asTransformCssVar = /* @__PURE__ */ __name((name) => `--motion-${name}`, "asTransformCssVar");
    var transforms = ["x", "y", "z"];
    order.forEach((name) => {
      axes.forEach((axis) => {
        transforms.push(name + axis);
        transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
      });
    });
    var compareTransformOrder = /* @__PURE__ */ __name((a, b) => transforms.indexOf(a) - transforms.indexOf(b), "compareTransformOrder");
    var transformLookup = new Set(transforms);
    var isTransform = /* @__PURE__ */ __name((name) => transformLookup.has(name), "isTransform");
    var addTransformToElement = /* @__PURE__ */ __name((element, name) => {
      if (transformAlias[name])
        name = transformAlias[name];
      const { transforms: transforms2 } = data.getAnimationData(element);
      utils.addUniqueItem(transforms2, name);
      element.style.transform = buildTransformTemplate(transforms2);
    }, "addTransformToElement");
    var buildTransformTemplate = /* @__PURE__ */ __name((transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim(), "buildTransformTemplate");
    var transformListToString = /* @__PURE__ */ __name((template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`, "transformListToString");
    exports.addTransformToElement = addTransformToElement;
    exports.asTransformCssVar = asTransformCssVar;
    exports.axes = axes;
    exports.buildTransformTemplate = buildTransformTemplate;
    exports.compareTransformOrder = compareTransformOrder;
    exports.isTransform = isTransform;
    exports.transformAlias = transformAlias;
    exports.transformDefinitions = transformDefinitions;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/css-var.cjs.js
var require_css_var_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/css-var.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var transforms = require_transforms_cjs();
    var isCssVar = /* @__PURE__ */ __name((name) => name.startsWith("--"), "isCssVar");
    var registeredProperties = /* @__PURE__ */ new Set();
    function registerCssVariable(name) {
      if (registeredProperties.has(name))
        return;
      registeredProperties.add(name);
      try {
        const { syntax, initialValue } = transforms.transformDefinitions.has(name) ? transforms.transformDefinitions.get(name) : {};
        CSS.registerProperty({
          name,
          inherits: false,
          syntax,
          initialValue
        });
      } catch (e) {
      }
    }
    __name(registerCssVariable, "registerCssVariable");
    exports.isCssVar = isCssVar;
    exports.registerCssVariable = registerCssVariable;
    exports.registeredProperties = registeredProperties;
  }
});

// ../../node_modules/@motionone/easing/dist/cubic-bezier.cjs.js
var require_cubic_bezier_cjs = __commonJS({
  "../../node_modules/@motionone/easing/dist/cubic-bezier.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var calcBezier = /* @__PURE__ */ __name((t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t, "calcBezier");
    var subdivisionPrecision = 1e-7;
    var subdivisionMaxIterations = 12;
    function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
      let currentX;
      let currentT;
      let i = 0;
      do {
        currentT = lowerBound + (upperBound - lowerBound) / 2;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0) {
          upperBound = currentT;
        } else {
          lowerBound = currentT;
        }
      } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
      return currentT;
    }
    __name(binarySubdivide, "binarySubdivide");
    function cubicBezier(mX1, mY1, mX2, mY2) {
      if (mX1 === mY1 && mX2 === mY2)
        return utils.noopReturn;
      const getTForX = /* @__PURE__ */ __name((aX) => binarySubdivide(aX, 0, 1, mX1, mX2), "getTForX");
      return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
    }
    __name(cubicBezier, "cubicBezier");
    exports.cubicBezier = cubicBezier;
  }
});

// ../../node_modules/@motionone/easing/dist/steps.cjs.js
var require_steps_cjs = __commonJS({
  "../../node_modules/@motionone/easing/dist/steps.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var steps = /* @__PURE__ */ __name((steps2, direction = "end") => (progress) => {
      progress = direction === "end" ? Math.min(progress, 0.999) : Math.max(progress, 1e-3);
      const expanded = progress * steps2;
      const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
      return utils.clamp(0, 1, rounded / steps2);
    }, "steps");
    exports.steps = steps;
  }
});

// ../../node_modules/@motionone/easing/dist/index.cjs.js
var require_index_cjs3 = __commonJS({
  "../../node_modules/@motionone/easing/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cubicBezier = require_cubic_bezier_cjs();
    var steps = require_steps_cjs();
    exports.cubicBezier = cubicBezier.cubicBezier;
    exports.steps = steps.steps;
  }
});

// ../../node_modules/@motionone/animation/dist/utils/easing.cjs.js
var require_easing_cjs2 = __commonJS({
  "../../node_modules/@motionone/animation/dist/utils/easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var easing = require_index_cjs3();
    var utils = require_index_cjs2();
    var namedEasings = {
      ease: easing.cubicBezier(0.25, 0.1, 0.25, 1),
      "ease-in": easing.cubicBezier(0.42, 0, 1, 1),
      "ease-in-out": easing.cubicBezier(0.42, 0, 0.58, 1),
      "ease-out": easing.cubicBezier(0, 0, 0.58, 1)
    };
    var functionArgsRegex = /\((.*?)\)/;
    function getEasingFunction(definition) {
      if (utils.isFunction(definition))
        return definition;
      if (utils.isCubicBezier(definition))
        return easing.cubicBezier(...definition);
      if (namedEasings[definition])
        return namedEasings[definition];
      if (definition.startsWith("steps")) {
        const args = functionArgsRegex.exec(definition);
        if (args) {
          const argsArray = args[1].split(",");
          return easing.steps(parseFloat(argsArray[0]), argsArray[1].trim());
        }
      }
      return utils.noopReturn;
    }
    __name(getEasingFunction, "getEasingFunction");
    exports.getEasingFunction = getEasingFunction;
  }
});

// ../../node_modules/@motionone/animation/dist/Animation.cjs.js
var require_Animation_cjs = __commonJS({
  "../../node_modules/@motionone/animation/dist/Animation.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var easing = require_easing_cjs2();
    var Animation = class {
      constructor(output, keyframes = [0, 1], { easing: easing$1, duration: initialDuration = utils.defaults.duration, delay: delay2 = utils.defaults.delay, endDelay = utils.defaults.endDelay, repeat = utils.defaults.repeat, offset, direction = "normal" } = {}) {
        this.startTime = null;
        this.rate = 1;
        this.t = 0;
        this.cancelTimestamp = null;
        this.easing = utils.noopReturn;
        this.duration = 0;
        this.totalDuration = 0;
        this.repeat = 0;
        this.playState = "idle";
        this.finished = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        easing$1 = easing$1 || utils.defaults.easing;
        if (utils.isEasingGenerator(easing$1)) {
          const custom = easing$1.createAnimation(keyframes);
          easing$1 = custom.easing;
          keyframes = custom.keyframes || keyframes;
          initialDuration = custom.duration || initialDuration;
        }
        this.repeat = repeat;
        this.easing = utils.isEasingList(easing$1) ? utils.noopReturn : easing.getEasingFunction(easing$1);
        this.updateDuration(initialDuration);
        const interpolate = utils.interpolate(keyframes, offset, utils.isEasingList(easing$1) ? easing$1.map(easing.getEasingFunction) : utils.noopReturn);
        this.tick = (timestamp) => {
          var _a;
          delay2 = delay2;
          let t = 0;
          if (this.pauseTime !== void 0) {
            t = this.pauseTime;
          } else {
            t = (timestamp - this.startTime) * this.rate;
          }
          this.t = t;
          t /= 1e3;
          t = Math.max(t - delay2, 0);
          if (this.playState === "finished" && this.pauseTime === void 0) {
            t = this.totalDuration;
          }
          const progress = t / this.duration;
          let currentIteration = Math.floor(progress);
          let iterationProgress = progress % 1;
          if (!iterationProgress && progress >= 1) {
            iterationProgress = 1;
          }
          iterationProgress === 1 && currentIteration--;
          const iterationIsOdd = currentIteration % 2;
          if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
            iterationProgress = 1 - iterationProgress;
          }
          const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
          const latest = interpolate(this.easing(p));
          output(latest);
          const isAnimationFinished = this.pauseTime === void 0 && (this.playState === "finished" || t >= this.totalDuration + endDelay);
          if (isAnimationFinished) {
            this.playState = "finished";
            (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
          } else if (this.playState !== "idle") {
            this.frameRequestId = requestAnimationFrame(this.tick);
          }
        };
        this.play();
      }
      play() {
        const now = performance.now();
        this.playState = "running";
        if (this.pauseTime !== void 0) {
          this.startTime = now - this.pauseTime;
        } else if (!this.startTime) {
          this.startTime = now;
        }
        this.cancelTimestamp = this.startTime;
        this.pauseTime = void 0;
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
      pause() {
        this.playState = "paused";
        this.pauseTime = this.t;
      }
      finish() {
        this.playState = "finished";
        this.tick(0);
      }
      stop() {
        var _a;
        this.playState = "idle";
        if (this.frameRequestId !== void 0) {
          cancelAnimationFrame(this.frameRequestId);
        }
        (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
      }
      cancel() {
        this.stop();
        this.tick(this.cancelTimestamp);
      }
      reverse() {
        this.rate *= -1;
      }
      commitStyles() {
      }
      updateDuration(duration) {
        this.duration = duration;
        this.totalDuration = duration * (this.repeat + 1);
      }
      get currentTime() {
        return this.t;
      }
      set currentTime(t) {
        if (this.pauseTime !== void 0 || this.rate === 0) {
          this.pauseTime = t;
        } else {
          this.startTime = performance.now() - t / this.rate;
        }
      }
      get playbackRate() {
        return this.rate;
      }
      set playbackRate(rate) {
        this.rate = rate;
      }
    };
    __name(Animation, "Animation");
    exports.Animation = Animation;
  }
});

// ../../node_modules/@motionone/animation/dist/index.cjs.js
var require_index_cjs4 = __commonJS({
  "../../node_modules/@motionone/animation/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Animation = require_Animation_cjs();
    var easing = require_easing_cjs2();
    exports.Animation = Animation.Animation;
    exports.getEasingFunction = easing.getEasingFunction;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/feature-detection.cjs.js
var require_feature_detection_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/feature-detection.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var testAnimation = /* @__PURE__ */ __name((keyframes, options) => document.createElement("div").animate(keyframes, options), "testAnimation");
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
    exports.supports = supports;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/easing.cjs.js
var require_easing_cjs3 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var featureDetection = require_feature_detection_cjs();
    var resolution = 0.015;
    var generateLinearEasingPoints = /* @__PURE__ */ __name((easing, duration) => {
      let points = "";
      const numPoints = Math.round(duration / resolution);
      for (let i = 0; i < numPoints; i++) {
        points += easing(utils.progress(0, numPoints - 1, i)) + ", ";
      }
      return points.substring(0, points.length - 2);
    }, "generateLinearEasingPoints");
    var convertEasing = /* @__PURE__ */ __name((easing, duration) => {
      if (utils.isFunction(easing)) {
        return featureDetection.supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : utils.defaults.easing;
      } else {
        return utils.isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
      }
    }, "convertEasing");
    var cubicBezierAsString = /* @__PURE__ */ __name(([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`, "cubicBezierAsString");
    exports.convertEasing = convertEasing;
    exports.cubicBezierAsString = cubicBezierAsString;
    exports.generateLinearEasingPoints = generateLinearEasingPoints;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/keyframes.cjs.js
var require_keyframes_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/keyframes.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function hydrateKeyframes(keyframes, readInitialValue) {
      for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] === null) {
          keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
        }
      }
      return keyframes;
    }
    __name(hydrateKeyframes, "hydrateKeyframes");
    var keyframesList = /* @__PURE__ */ __name((keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes], "keyframesList");
    exports.hydrateKeyframes = hydrateKeyframes;
    exports.keyframesList = keyframesList;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/get-style-name.cjs.js
var require_get_style_name_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/get-style-name.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var transforms = require_transforms_cjs();
    function getStyleName(key) {
      if (transforms.transformAlias[key])
        key = transforms.transformAlias[key];
      return transforms.isTransform(key) ? transforms.asTransformCssVar(key) : key;
    }
    __name(getStyleName, "getStyleName");
    exports.getStyleName = getStyleName;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/style.cjs.js
var require_style_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/style.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cssVar = require_css_var_cjs();
    var getStyleName = require_get_style_name_cjs();
    var transforms = require_transforms_cjs();
    var style = {
      get: (element, name) => {
        name = getStyleName.getStyleName(name);
        let value = cssVar.isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
        if (!value && value !== 0) {
          const definition = transforms.transformDefinitions.get(name);
          if (definition)
            value = definition.initialValue;
        }
        return value;
      },
      set: (element, name, value) => {
        name = getStyleName.getStyleName(name);
        if (cssVar.isCssVar(name)) {
          element.style.setProperty(name, value);
        } else {
          element.style[name] = value;
        }
      }
    };
    exports.style = style;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/stop-animation.cjs.js
var require_stop_animation_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/stop-animation.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function stopAnimation(animation, needsCommit = true) {
      if (!animation || animation.playState === "finished")
        return;
      try {
        if (animation.stop) {
          animation.stop();
        } else {
          needsCommit && animation.commitStyles();
          animation.cancel();
        }
      } catch (e) {
      }
    }
    __name(stopAnimation, "stopAnimation");
    exports.stopAnimation = stopAnimation;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/animate-style.cjs.js
var require_animate_style_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/animate-style.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var data = require_data_cjs();
    var cssVar = require_css_var_cjs();
    var animation = require_index_cjs4();
    var utils = require_index_cjs2();
    var transforms = require_transforms_cjs();
    var easing = require_easing_cjs3();
    var featureDetection = require_feature_detection_cjs();
    var keyframes = require_keyframes_cjs();
    var style = require_style_cjs();
    var getStyleName = require_get_style_name_cjs();
    var stopAnimation = require_stop_animation_cjs();
    function getDevToolsRecord() {
      return window.__MOTION_DEV_TOOLS_RECORD;
    }
    __name(getDevToolsRecord, "getDevToolsRecord");
    function animateStyle(element, key, keyframesDefinition, options = {}) {
      const record = getDevToolsRecord();
      const isRecording = options.record !== false && record;
      let animation$1;
      let { duration = utils.defaults.duration, delay: delay2 = utils.defaults.delay, endDelay = utils.defaults.endDelay, repeat = utils.defaults.repeat, easing: easing$1 = utils.defaults.easing, direction, offset, allowWebkitAcceleration = false } = options;
      const data$1 = data.getAnimationData(element);
      const valueIsTransform = transforms.isTransform(key);
      let canAnimateNatively = featureDetection.supports.waapi();
      valueIsTransform && transforms.addTransformToElement(element, key);
      const name = getStyleName.getStyleName(key);
      const motionValue2 = data.getMotionValue(data$1.values, name);
      const definition = transforms.transformDefinitions.get(name);
      stopAnimation.stopAnimation(motionValue2.animation, !(utils.isEasingGenerator(easing$1) && motionValue2.generator) && options.record !== false);
      return () => {
        const readInitialValue = /* @__PURE__ */ __name(() => {
          var _a, _b;
          return (_b = (_a = style.style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
        }, "readInitialValue");
        let keyframes$1 = keyframes.hydrateKeyframes(keyframes.keyframesList(keyframesDefinition), readInitialValue);
        if (utils.isEasingGenerator(easing$1)) {
          const custom = easing$1.createAnimation(keyframes$1, readInitialValue, valueIsTransform, name, motionValue2);
          easing$1 = custom.easing;
          if (custom.keyframes !== void 0)
            keyframes$1 = custom.keyframes;
          if (custom.duration !== void 0)
            duration = custom.duration;
        }
        if (cssVar.isCssVar(name)) {
          if (featureDetection.supports.cssRegisterProperty()) {
            cssVar.registerCssVariable(name);
          } else {
            canAnimateNatively = false;
          }
        }
        if (valueIsTransform && !featureDetection.supports.linearEasing() && (utils.isFunction(easing$1) || utils.isEasingList(easing$1) && easing$1.some(utils.isFunction))) {
          canAnimateNatively = false;
        }
        if (canAnimateNatively) {
          if (definition) {
            keyframes$1 = keyframes$1.map((value) => utils.isNumber(value) ? definition.toDefaultUnit(value) : value);
          }
          if (keyframes$1.length === 1 && (!featureDetection.supports.partialKeyframes() || isRecording)) {
            keyframes$1.unshift(readInitialValue());
          }
          const animationOptions = {
            delay: utils.time.ms(delay2),
            duration: utils.time.ms(duration),
            endDelay: utils.time.ms(endDelay),
            easing: !utils.isEasingList(easing$1) ? easing.convertEasing(easing$1, duration) : void 0,
            direction,
            iterations: repeat + 1,
            fill: "both"
          };
          animation$1 = element.animate({
            [name]: keyframes$1,
            offset,
            easing: utils.isEasingList(easing$1) ? easing$1.map((thisEasing) => easing.convertEasing(thisEasing, duration)) : void 0
          }, animationOptions);
          if (!animation$1.finished) {
            animation$1.finished = new Promise((resolve, reject) => {
              animation$1.onfinish = resolve;
              animation$1.oncancel = reject;
            });
          }
          const target = keyframes$1[keyframes$1.length - 1];
          animation$1.finished.then(() => {
            style.style.set(element, name, target);
            animation$1.cancel();
          }).catch(utils.noop);
          if (!allowWebkitAcceleration)
            animation$1.playbackRate = 1.000001;
        } else if (valueIsTransform) {
          keyframes$1 = keyframes$1.map((value) => typeof value === "string" ? parseFloat(value) : value);
          if (keyframes$1.length === 1) {
            keyframes$1.unshift(parseFloat(readInitialValue()));
          }
          const render = /* @__PURE__ */ __name((latest) => {
            if (definition)
              latest = definition.toDefaultUnit(latest);
            style.style.set(element, name, latest);
          }, "render");
          animation$1 = new animation.Animation(render, keyframes$1, Object.assign(Object.assign({}, options), {
            duration,
            easing: easing$1
          }));
        } else {
          const target = keyframes$1[keyframes$1.length - 1];
          style.style.set(element, name, definition && utils.isNumber(target) ? definition.toDefaultUnit(target) : target);
        }
        if (isRecording) {
          record(element, key, keyframes$1, {
            duration,
            delay: delay2,
            easing: easing$1,
            repeat,
            offset
          }, "motion-one");
        }
        motionValue2.setAnimation(animation$1);
        return animation$1;
      };
    }
    __name(animateStyle, "animateStyle");
    exports.animateStyle = animateStyle;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/options.cjs.js
var require_options_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/options.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var getOptions = /* @__PURE__ */ __name((options, key) => options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options), "getOptions");
    exports.getOptions = getOptions;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/utils/resolve-elements.cjs.js
var require_resolve_elements_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/utils/resolve-elements.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
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
    __name(resolveElements, "resolveElements");
    exports.resolveElements = resolveElements;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/controls.cjs.js
var require_controls_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/controls.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var stopAnimation = require_stop_animation_cjs();
    var createAnimation = /* @__PURE__ */ __name((factory) => factory(), "createAnimation");
    var withControls = /* @__PURE__ */ __name((animationFactory, options, duration = utils.defaults.duration) => {
      return new Proxy({
        animations: animationFactory.map(createAnimation).filter(Boolean),
        duration,
        options
      }, controls);
    }, "withControls");
    var getActiveAnimation = /* @__PURE__ */ __name((state) => state.animations[0], "getActiveAnimation");
    var controls = {
      get: (target, key) => {
        const activeAnimation = getActiveAnimation(target);
        switch (key) {
          case "duration":
            return target.duration;
          case "currentTime":
            return utils.time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
          case "playbackRate":
          case "playState":
            return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
          case "finished":
            if (!target.finished) {
              target.finished = Promise.all(target.animations.map(selectFinished)).catch(utils.noop);
            }
            return target.finished;
          case "stop":
            return () => {
              target.animations.forEach((animation) => stopAnimation.stopAnimation(animation));
            };
          case "forEachNative":
            return (callback) => {
              target.animations.forEach((animation) => callback(animation, target));
            };
          default:
            return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? void 0 : () => target.animations.forEach((animation) => animation[key]());
        }
      },
      set: (target, key, value) => {
        switch (key) {
          case "currentTime":
            value = utils.time.ms(value);
          case "currentTime":
          case "playbackRate":
            for (let i = 0; i < target.animations.length; i++) {
              target.animations[i][key] = value;
            }
            return true;
        }
        return false;
      }
    };
    var selectFinished = /* @__PURE__ */ __name((animation) => animation.finished, "selectFinished");
    exports.controls = controls;
    exports.withControls = withControls;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/utils/stagger.cjs.js
var require_stagger_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/utils/stagger.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var animation = require_index_cjs4();
    function stagger(duration = 0.1, { start = 0, from = 0, easing } = {}) {
      return (i, total) => {
        const fromIndex = utils.isNumber(from) ? from : getFromIndex(from, total);
        const distance = Math.abs(fromIndex - i);
        let delay2 = duration * distance;
        if (easing) {
          const maxDelay = total * duration;
          const easingFunction = animation.getEasingFunction(easing);
          delay2 = easingFunction(delay2 / maxDelay) * maxDelay;
        }
        return start + delay2;
      };
    }
    __name(stagger, "stagger");
    function getFromIndex(from, total) {
      if (from === "first") {
        return 0;
      } else {
        const lastIndex = total - 1;
        return from === "last" ? lastIndex : lastIndex / 2;
      }
    }
    __name(getFromIndex, "getFromIndex");
    function resolveOption(option, i, total) {
      return utils.isFunction(option) ? option(i, total) : option;
    }
    __name(resolveOption, "resolveOption");
    exports.getFromIndex = getFromIndex;
    exports.resolveOption = resolveOption;
    exports.stagger = stagger;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/index.cjs.js
var require_index_cjs5 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var animateStyle = require_animate_style_cjs();
    var options = require_options_cjs();
    var resolveElements = require_resolve_elements_cjs();
    var controls = require_controls_cjs();
    var stagger = require_stagger_cjs();
    function animate2(elements, keyframes, options$1 = {}) {
      elements = resolveElements.resolveElements(elements);
      const numElements = elements.length;
      const animationFactories = [];
      for (let i = 0; i < numElements; i++) {
        const element = elements[i];
        for (const key in keyframes) {
          const valueOptions = options.getOptions(options$1, key);
          valueOptions.delay = stagger.resolveOption(valueOptions.delay, i, numElements);
          const animation = animateStyle.animateStyle(element, key, keyframes[key], valueOptions);
          animationFactories.push(animation);
        }
      }
      return controls.withControls(
        animationFactories,
        options$1,
        options$1.duration
      );
    }
    __name(animate2, "animate");
    exports.animate = animate2;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/node_modules/tslib/tslib.js
var require_tslib2 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/node_modules/tslib/tslib.js"(exports, module) {
    init_define_process();
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __classPrivateFieldIn;
    var __createBinding;
    (function(factory) {
      var root = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports2) {
          factory(createExporter(root, createExporter(exports2)));
        });
      } else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports2, previous) {
        if (exports2 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports2, "__esModule", { value: true });
          } else {
            exports2.__esModule = true;
          }
        }
        return function(id, v) {
          return exports2[id] = previous ? previous(id, v) : v;
        };
      }
      __name(createExporter, "createExporter");
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = /* @__PURE__ */ __name(function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      }, "__extends");
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest = /* @__PURE__ */ __name(function(s, e) {
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
      }, "__rest");
      __decorate = /* @__PURE__ */ __name(function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      }, "__decorate");
      __param = /* @__PURE__ */ __name(function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      }, "__param");
      __metadata = /* @__PURE__ */ __name(function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      }, "__metadata");
      __awaiter = /* @__PURE__ */ __name(function(thisArg, _arguments, P, generator) {
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
      }, "__awaiter");
      __generator = /* @__PURE__ */ __name(function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        __name(verb, "verb");
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (g && (g = 0, op[0] && (_ = 0)), _)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
        __name(step, "step");
      }, "__generator");
      __exportStar = /* @__PURE__ */ __name(function(m2, o) {
        for (var p in m2)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m2, p);
      }, "__exportStar");
      __createBinding = Object.create ? function(o, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m2, k);
        if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m2[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m2[k];
      };
      __values = /* @__PURE__ */ __name(function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m2 = s && o[s], i = 0;
        if (m2)
          return m2.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }, "__values");
      __read = /* @__PURE__ */ __name(function(o, n) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m2)
          return o;
        var i = m2.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m2 = i["return"]))
              m2.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      }, "__read");
      __spread = /* @__PURE__ */ __name(function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      }, "__spread");
      __spreadArrays = /* @__PURE__ */ __name(function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      }, "__spreadArrays");
      __spreadArray = /* @__PURE__ */ __name(function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      }, "__spreadArray");
      __await = /* @__PURE__ */ __name(function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      }, "__await");
      __asyncGenerator = /* @__PURE__ */ __name(function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i;
        function verb(n) {
          if (g[n])
            i[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        __name(verb, "verb");
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        __name(resume, "resume");
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        __name(step, "step");
        function fulfill(value) {
          resume("next", value);
        }
        __name(fulfill, "fulfill");
        function reject(value) {
          resume("throw", value);
        }
        __name(reject, "reject");
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
        __name(settle, "settle");
      }, "__asyncGenerator");
      __asyncDelegator = /* @__PURE__ */ __name(function(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function(e) {
          throw e;
        }), verb("return"), i[Symbol.iterator] = function() {
          return this;
        }, i;
        function verb(n, f) {
          i[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
          } : f;
        }
        __name(verb, "verb");
      }, "__asyncDelegator");
      __asyncValues = /* @__PURE__ */ __name(function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m2 = o[Symbol.asyncIterator], i;
        return m2 ? m2.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        __name(verb, "verb");
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
        __name(settle, "settle");
      }, "__asyncValues");
      __makeTemplateObject = /* @__PURE__ */ __name(function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      }, "__makeTemplateObject");
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = /* @__PURE__ */ __name(function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      }, "__importStar");
      __importDefault = /* @__PURE__ */ __name(function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      }, "__importDefault");
      __classPrivateFieldGet = /* @__PURE__ */ __name(function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      }, "__classPrivateFieldGet");
      __classPrivateFieldSet = /* @__PURE__ */ __name(function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      }, "__classPrivateFieldSet");
      __classPrivateFieldIn = /* @__PURE__ */ __name(function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      }, "__classPrivateFieldIn");
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn);
    });
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/utils/calc-time.cjs.js
var require_calc_time_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/utils/calc-time.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    function calcNextTime(current, next, prev, labels) {
      var _a;
      if (utils.isNumber(next)) {
        return next;
      } else if (next.startsWith("-") || next.startsWith("+")) {
        return Math.max(0, current + parseFloat(next));
      } else if (next === "<") {
        return prev;
      } else {
        return (_a = labels.get(next)) !== null && _a !== void 0 ? _a : current;
      }
    }
    __name(calcNextTime, "calcNextTime");
    exports.calcNextTime = calcNextTime;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/utils/edit.cjs.js
var require_edit_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/utils/edit.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    function eraseKeyframes(sequence, startTime, endTime) {
      for (let i = 0; i < sequence.length; i++) {
        const keyframe = sequence[i];
        if (keyframe.at > startTime && keyframe.at < endTime) {
          utils.removeItem(sequence, keyframe);
          i--;
        }
      }
    }
    __name(eraseKeyframes, "eraseKeyframes");
    function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
      eraseKeyframes(sequence, startTime, endTime);
      for (let i = 0; i < keyframes.length; i++) {
        sequence.push({
          value: keyframes[i],
          at: utils.mix(startTime, endTime, offset[i]),
          easing: utils.getEasingForSegment(easing, i)
        });
      }
    }
    __name(addKeyframes, "addKeyframes");
    exports.addKeyframes = addKeyframes;
    exports.eraseKeyframes = eraseKeyframes;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/utils/sort.cjs.js
var require_sort_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/utils/sort.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function compareByTime(a, b) {
      if (a.at === b.at) {
        return a.value === null ? 1 : -1;
      } else {
        return a.at - b.at;
      }
    }
    __name(compareByTime, "compareByTime");
    exports.compareByTime = compareByTime;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/index.cjs.js
var require_index_cjs6 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/timeline/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib2();
    var heyListen = require_dist();
    var utils = require_index_cjs2();
    var stagger = require_stagger_cjs();
    var animateStyle = require_animate_style_cjs();
    var controls = require_controls_cjs();
    var keyframes = require_keyframes_cjs();
    var options = require_options_cjs();
    var resolveElements = require_resolve_elements_cjs();
    var transforms = require_transforms_cjs();
    var calcTime = require_calc_time_cjs();
    var edit = require_edit_cjs();
    var sort = require_sort_cjs();
    function timeline(definition, options2 = {}) {
      var _a;
      const animationDefinitions = createAnimationsFromTimeline(definition, options2);
      const animationFactories = animationDefinitions.map((definition2) => animateStyle.animateStyle(...definition2)).filter(Boolean);
      return controls.withControls(
        animationFactories,
        options2,
        (_a = animationDefinitions[0]) === null || _a === void 0 ? void 0 : _a[3].duration
      );
    }
    __name(timeline, "timeline");
    function createAnimationsFromTimeline(definition, _a = {}) {
      var { defaultOptions = {} } = _a, timelineOptions = tslib.__rest(_a, ["defaultOptions"]);
      const animationDefinitions = [];
      const elementSequences = /* @__PURE__ */ new Map();
      const elementCache = {};
      const timeLabels = /* @__PURE__ */ new Map();
      let prevTime = 0;
      let currentTime = 0;
      let totalDuration = 0;
      for (let i = 0; i < definition.length; i++) {
        const segment = definition[i];
        if (utils.isString(segment)) {
          timeLabels.set(segment, currentTime);
          continue;
        } else if (!Array.isArray(segment)) {
          timeLabels.set(segment.name, calcTime.calcNextTime(currentTime, segment.at, prevTime, timeLabels));
          continue;
        }
        const [elementDefinition, keyframes$1, options$1 = {}] = segment;
        if (options$1.at !== void 0) {
          currentTime = calcTime.calcNextTime(currentTime, options$1.at, prevTime, timeLabels);
        }
        let maxDuration = 0;
        const elements = resolveElements.resolveElements(elementDefinition, elementCache);
        const numElements = elements.length;
        for (let elementIndex = 0; elementIndex < numElements; elementIndex++) {
          const element = elements[elementIndex];
          const elementSequence = getElementSequence(element, elementSequences);
          for (const key in keyframes$1) {
            const valueSequence = getValueSequence(key, elementSequence);
            let valueKeyframes = keyframes.keyframesList(keyframes$1[key]);
            const valueOptions = options.getOptions(options$1, key);
            let { duration = defaultOptions.duration || utils.defaults.duration, easing = defaultOptions.easing || utils.defaults.easing } = valueOptions;
            if (utils.isEasingGenerator(easing)) {
              const valueIsTransform = transforms.isTransform(key);
              heyListen.invariant(valueKeyframes.length === 2 || !valueIsTransform, "spring must be provided 2 keyframes within timeline");
              const custom = easing.createAnimation(
                valueKeyframes,
                () => "0",
                valueIsTransform
              );
              easing = custom.easing;
              if (custom.keyframes !== void 0)
                valueKeyframes = custom.keyframes;
              if (custom.duration !== void 0)
                duration = custom.duration;
            }
            const delay2 = stagger.resolveOption(options$1.delay, elementIndex, numElements) || 0;
            const startTime = currentTime + delay2;
            const targetTime = startTime + duration;
            let { offset = utils.defaultOffset(valueKeyframes.length) } = valueOptions;
            if (offset.length === 1 && offset[0] === 0) {
              offset[1] = 1;
            }
            const remainder = length - valueKeyframes.length;
            remainder > 0 && utils.fillOffset(offset, remainder);
            valueKeyframes.length === 1 && valueKeyframes.unshift(null);
            edit.addKeyframes(valueSequence, valueKeyframes, easing, offset, startTime, targetTime);
            maxDuration = Math.max(delay2 + duration, maxDuration);
            totalDuration = Math.max(targetTime, totalDuration);
          }
        }
        prevTime = currentTime;
        currentTime += maxDuration;
      }
      elementSequences.forEach((valueSequences, element) => {
        for (const key in valueSequences) {
          const valueSequence = valueSequences[key];
          valueSequence.sort(sort.compareByTime);
          const keyframes2 = [];
          const valueOffset = [];
          const valueEasing = [];
          for (let i = 0; i < valueSequence.length; i++) {
            const { at, value, easing } = valueSequence[i];
            keyframes2.push(value);
            valueOffset.push(utils.progress(0, totalDuration, at));
            valueEasing.push(easing || utils.defaults.easing);
          }
          if (valueOffset[0] !== 0) {
            valueOffset.unshift(0);
            keyframes2.unshift(keyframes2[0]);
            valueEasing.unshift("linear");
          }
          if (valueOffset[valueOffset.length - 1] !== 1) {
            valueOffset.push(1);
            keyframes2.push(null);
          }
          animationDefinitions.push([
            element,
            key,
            keyframes2,
            Object.assign(Object.assign(Object.assign({}, defaultOptions), { duration: totalDuration, easing: valueEasing, offset: valueOffset }), timelineOptions)
          ]);
        }
      });
      return animationDefinitions;
    }
    __name(createAnimationsFromTimeline, "createAnimationsFromTimeline");
    function getElementSequence(element, sequences) {
      !sequences.has(element) && sequences.set(element, {});
      return sequences.get(element);
    }
    __name(getElementSequence, "getElementSequence");
    function getValueSequence(name, sequences) {
      if (!sequences[name])
        sequences[name] = [];
      return sequences[name];
    }
    __name(getValueSequence, "getValueSequence");
    exports.createAnimationsFromTimeline = createAnimationsFromTimeline;
    exports.timeline = timeline;
  }
});

// ../../node_modules/@motionone/generators/dist/utils/velocity.cjs.js
var require_velocity_cjs2 = __commonJS({
  "../../node_modules/@motionone/generators/dist/utils/velocity.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var sampleT = 5;
    function calcGeneratorVelocity(resolveValue, t, current) {
      const prevT = Math.max(t - sampleT, 0);
      return utils.velocityPerSecond(current - resolveValue(prevT), t - prevT);
    }
    __name(calcGeneratorVelocity, "calcGeneratorVelocity");
    exports.calcGeneratorVelocity = calcGeneratorVelocity;
  }
});

// ../../node_modules/@motionone/generators/dist/spring/defaults.cjs.js
var require_defaults_cjs2 = __commonJS({
  "../../node_modules/@motionone/generators/dist/spring/defaults.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaults = {
      stiffness: 100,
      damping: 10,
      mass: 1
    };
    exports.defaults = defaults;
  }
});

// ../../node_modules/@motionone/generators/dist/spring/utils.cjs.js
var require_utils_cjs = __commonJS({
  "../../node_modules/@motionone/generators/dist/spring/utils.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaults = require_defaults_cjs2();
    var calcDampingRatio = /* @__PURE__ */ __name((stiffness = defaults.defaults.stiffness, damping = defaults.defaults.damping, mass = defaults.defaults.mass) => damping / (2 * Math.sqrt(stiffness * mass)), "calcDampingRatio");
    exports.calcDampingRatio = calcDampingRatio;
  }
});

// ../../node_modules/@motionone/generators/dist/utils/has-reached-target.cjs.js
var require_has_reached_target_cjs = __commonJS({
  "../../node_modules/@motionone/generators/dist/utils/has-reached-target.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function hasReachedTarget(origin, target, current) {
      return origin < target && current >= target || origin > target && current <= target;
    }
    __name(hasReachedTarget, "hasReachedTarget");
    exports.hasReachedTarget = hasReachedTarget;
  }
});

// ../../node_modules/@motionone/generators/dist/spring/index.cjs.js
var require_index_cjs7 = __commonJS({
  "../../node_modules/@motionone/generators/dist/spring/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var defaults = require_defaults_cjs2();
    var utils$1 = require_utils_cjs();
    var hasReachedTarget = require_has_reached_target_cjs();
    var velocity = require_velocity_cjs2();
    var spring = /* @__PURE__ */ __name(({ stiffness = defaults.defaults.stiffness, damping = defaults.defaults.damping, mass = defaults.defaults.mass, from = 0, to = 1, velocity: velocity$1 = 0, restSpeed = 2, restDistance = 0.5 } = {}) => {
      velocity$1 = velocity$1 ? utils.time.s(velocity$1) : 0;
      const state = {
        done: false,
        hasReachedTarget: false,
        current: from,
        target: to
      };
      const initialDelta = to - from;
      const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
      const dampingRatio = utils$1.calcDampingRatio(stiffness, damping, mass);
      let resolveSpring;
      if (dampingRatio < 1) {
        const angularFreq = undampedAngularFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
        resolveSpring = /* @__PURE__ */ __name((t) => to - Math.exp(-dampingRatio * undampedAngularFreq * t) * ((-velocity$1 + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t)), "resolveSpring");
      } else {
        resolveSpring = /* @__PURE__ */ __name((t) => {
          return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (-velocity$1 + undampedAngularFreq * initialDelta) * t);
        }, "resolveSpring");
      }
      return (t) => {
        state.current = resolveSpring(t);
        const currentVelocity = t === 0 ? velocity$1 : velocity.calcGeneratorVelocity(resolveSpring, t, state.current);
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(to - state.current) <= restDistance;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
        state.hasReachedTarget = hasReachedTarget.hasReachedTarget(from, to, state.current);
        return state;
      };
    }, "spring");
    exports.spring = spring;
  }
});

// ../../node_modules/@motionone/generators/dist/glide/index.cjs.js
var require_index_cjs8 = __commonJS({
  "../../node_modules/@motionone/generators/dist/glide/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var velocity = require_velocity_cjs2();
    var index = require_index_cjs7();
    var glide = /* @__PURE__ */ __name(({ from = 0, velocity: velocity$1 = 0, power = 0.8, decay = 0.325, bounceDamping, bounceStiffness, changeTarget, min, max, restDistance = 0.5, restSpeed }) => {
      decay = utils.time.ms(decay);
      const state = {
        hasReachedTarget: false,
        done: false,
        current: from,
        target: from
      };
      const isOutOfBounds = /* @__PURE__ */ __name((v) => min !== void 0 && v < min || max !== void 0 && v > max, "isOutOfBounds");
      const nearestBoundary = /* @__PURE__ */ __name((v) => {
        if (min === void 0)
          return max;
        if (max === void 0)
          return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
      }, "nearestBoundary");
      let amplitude = power * velocity$1;
      const ideal = from + amplitude;
      const target = changeTarget === void 0 ? ideal : changeTarget(ideal);
      state.target = target;
      if (target !== ideal)
        amplitude = target - from;
      const calcDelta = /* @__PURE__ */ __name((t) => -amplitude * Math.exp(-t / decay), "calcDelta");
      const calcLatest = /* @__PURE__ */ __name((t) => target + calcDelta(t), "calcLatest");
      const applyFriction = /* @__PURE__ */ __name((t) => {
        const delta = calcDelta(t);
        const latest = calcLatest(t);
        state.done = Math.abs(delta) <= restDistance;
        state.current = state.done ? target : latest;
      }, "applyFriction");
      let timeReachedBoundary;
      let spring;
      const checkCatchBoundary = /* @__PURE__ */ __name((t) => {
        if (!isOutOfBounds(state.current))
          return;
        timeReachedBoundary = t;
        spring = index.spring({
          from: state.current,
          to: nearestBoundary(state.current),
          velocity: velocity.calcGeneratorVelocity(calcLatest, t, state.current),
          damping: bounceDamping,
          stiffness: bounceStiffness,
          restDistance,
          restSpeed
        });
      }, "checkCatchBoundary");
      checkCatchBoundary(0);
      return (t) => {
        let hasUpdatedFrame = false;
        if (!spring && timeReachedBoundary === void 0) {
          hasUpdatedFrame = true;
          applyFriction(t);
          checkCatchBoundary(t);
        }
        if (timeReachedBoundary !== void 0 && t > timeReachedBoundary) {
          state.hasReachedTarget = true;
          return spring(t - timeReachedBoundary);
        } else {
          state.hasReachedTarget = false;
          !hasUpdatedFrame && applyFriction(t);
          return state;
        }
      };
    }, "glide");
    exports.glide = glide;
  }
});

// ../../node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.cjs.js
var require_pregenerate_keyframes_cjs = __commonJS({
  "../../node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var timeStep = 10;
    var maxDuration = 1e4;
    function pregenerateKeyframes(generator, toUnit = utils.noopReturn) {
      let overshootDuration = void 0;
      let timestamp = timeStep;
      let state = generator(0);
      const keyframes = [toUnit(state.current)];
      while (!state.done && timestamp < maxDuration) {
        state = generator(timestamp);
        keyframes.push(toUnit(state.done ? state.target : state.current));
        if (overshootDuration === void 0 && state.hasReachedTarget) {
          overshootDuration = timestamp;
        }
        timestamp += timeStep;
      }
      const duration = timestamp - timeStep;
      if (keyframes.length === 1)
        keyframes.push(state.current);
      return {
        keyframes,
        duration: duration / 1e3,
        overshootDuration: (overshootDuration !== null && overshootDuration !== void 0 ? overshootDuration : duration) / 1e3
      };
    }
    __name(pregenerateKeyframes, "pregenerateKeyframes");
    exports.pregenerateKeyframes = pregenerateKeyframes;
  }
});

// ../../node_modules/@motionone/generators/dist/index.cjs.js
var require_index_cjs9 = __commonJS({
  "../../node_modules/@motionone/generators/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var index = require_index_cjs8();
    var index$1 = require_index_cjs7();
    var pregenerateKeyframes = require_pregenerate_keyframes_cjs();
    var velocity = require_velocity_cjs2();
    exports.glide = index.glide;
    exports.spring = index$1.spring;
    exports.pregenerateKeyframes = pregenerateKeyframes.pregenerateKeyframes;
    exports.calcGeneratorVelocity = velocity.calcGeneratorVelocity;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/easing/create-generator-easing.cjs.js
var require_create_generator_easing_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/easing/create-generator-easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var generators = require_index_cjs9();
    function createGeneratorEasing(createGenerator) {
      const keyframesCache = /* @__PURE__ */ new WeakMap();
      return (options = {}) => {
        const generatorCache = /* @__PURE__ */ new Map();
        const getGenerator = /* @__PURE__ */ __name((from = 0, to = 100, velocity = 0, isScale = false) => {
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
        }, "getGenerator");
        const getKeyframes = /* @__PURE__ */ __name((generator) => {
          if (!keyframesCache.has(generator)) {
            keyframesCache.set(generator, generators.pregenerateKeyframes(generator));
          }
          return keyframesCache.get(generator);
        }, "getKeyframes");
        return {
          createAnimation: (keyframes, getOrigin, canUseGenerator, name, motionValue2) => {
            var _a, _b;
            let settings;
            const numKeyframes = keyframes.length;
            let shouldUseGenerator = canUseGenerator && numKeyframes <= 2 && keyframes.every(isNumberOrNull);
            if (shouldUseGenerator) {
              const target = keyframes[numKeyframes - 1];
              const unresolvedOrigin = numKeyframes === 1 ? null : keyframes[0];
              let velocity = 0;
              let origin = 0;
              const prevGenerator = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.generator;
              if (prevGenerator) {
                const { animation, generatorStartTime } = motionValue2;
                const startTime = (animation === null || animation === void 0 ? void 0 : animation.startTime) || generatorStartTime || 0;
                const currentTime = (animation === null || animation === void 0 ? void 0 : animation.currentTime) || performance.now() - startTime;
                const prevGeneratorCurrent = prevGenerator(currentTime).current;
                origin = (_a = unresolvedOrigin) !== null && _a !== void 0 ? _a : prevGeneratorCurrent;
                if (numKeyframes === 1 || numKeyframes === 2 && keyframes[0] === null) {
                  velocity = generators.calcGeneratorVelocity((t) => prevGenerator(t).current, currentTime, prevGeneratorCurrent);
                }
              } else {
                origin = (_b = unresolvedOrigin) !== null && _b !== void 0 ? _b : parseFloat(getOrigin());
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
    __name(createGeneratorEasing, "createGeneratorEasing");
    var isNumberOrNull = /* @__PURE__ */ __name((value) => typeof value !== "string", "isNumberOrNull");
    exports.createGeneratorEasing = createGeneratorEasing;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/easing/spring/index.cjs.js
var require_index_cjs10 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/easing/spring/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var generators = require_index_cjs9();
    var createGeneratorEasing = require_create_generator_easing_cjs();
    var spring = createGeneratorEasing.createGeneratorEasing(generators.spring);
    exports.spring = spring;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/easing/glide/index.cjs.js
var require_index_cjs11 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/easing/glide/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var generators = require_index_cjs9();
    var createGeneratorEasing = require_create_generator_easing_cjs();
    var glide = createGeneratorEasing.createGeneratorEasing(generators.glide);
    exports.glide = glide;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/in-view.cjs.js
var require_in_view_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/in-view.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolveElements = require_resolve_elements_cjs();
    var utils = require_index_cjs2();
    var thresholds = {
      any: 0,
      all: 1
    };
    function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
      if (typeof IntersectionObserver === "undefined") {
        return () => {
        };
      }
      const elements = resolveElements.resolveElements(elementOrSelector);
      const activeIntersections = /* @__PURE__ */ new WeakMap();
      const onIntersectionChange = /* @__PURE__ */ __name((entries) => {
        entries.forEach((entry) => {
          const onEnd = activeIntersections.get(entry.target);
          if (entry.isIntersecting === Boolean(onEnd))
            return;
          if (entry.isIntersecting) {
            const newOnEnd = onStart(entry);
            if (utils.isFunction(newOnEnd)) {
              activeIntersections.set(entry.target, newOnEnd);
            } else {
              observer.unobserve(entry.target);
            }
          } else if (onEnd) {
            onEnd(entry);
            activeIntersections.delete(entry.target);
          }
        });
      }, "onIntersectionChange");
      const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount]
      });
      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }
    __name(inView, "inView");
    exports.inView = inView;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/resize/handle-element.cjs.js
var require_handle_element_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/resize/handle-element.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolveElements = require_resolve_elements_cjs();
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
    __name(getElementSize, "getElementSize");
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
    __name(notifyTarget, "notifyTarget");
    function notifyAll(entries) {
      entries.forEach(notifyTarget);
    }
    __name(notifyAll, "notifyAll");
    function createResizeObserver() {
      if (typeof ResizeObserver === "undefined")
        return;
      observer = new ResizeObserver(notifyAll);
    }
    __name(createResizeObserver, "createResizeObserver");
    function resizeElement(target, handler) {
      if (!observer)
        createResizeObserver();
      const elements = resolveElements.resolveElements(target);
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
    __name(resizeElement, "resizeElement");
    exports.resizeElement = resizeElement;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/resize/handle-window.cjs.js
var require_handle_window_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/resize/handle-window.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var windowCallbacks = /* @__PURE__ */ new Set();
    var windowResizeHandler;
    function createWindowResizeHandler() {
      windowResizeHandler = /* @__PURE__ */ __name(() => {
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
      }, "windowResizeHandler");
      window.addEventListener("resize", windowResizeHandler);
    }
    __name(createWindowResizeHandler, "createWindowResizeHandler");
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
    __name(resizeWindow, "resizeWindow");
    exports.resizeWindow = resizeWindow;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/resize/index.cjs.js
var require_index_cjs12 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/resize/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var handleElement = require_handle_element_cjs();
    var handleWindow = require_handle_window_cjs();
    var utils = require_index_cjs2();
    function resize(a, b) {
      return utils.isFunction(a) ? handleWindow.resizeWindow(a) : handleElement.resizeElement(a, b);
    }
    __name(resize, "resize");
    exports.resize = resize;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/info.cjs.js
var require_info_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/info.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var maxElapsed = 50;
    var createAxisInfo = /* @__PURE__ */ __name(() => ({
      current: 0,
      offset: [],
      progress: 0,
      scrollLength: 0,
      targetOffset: 0,
      targetLength: 0,
      containerLength: 0,
      velocity: 0
    }), "createAxisInfo");
    var createScrollInfo = /* @__PURE__ */ __name(() => ({
      time: 0,
      x: createAxisInfo(),
      y: createAxisInfo()
    }), "createScrollInfo");
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
    function updateAxisInfo(element, axisName, info, time) {
      const axis = info[axisName];
      const { length: length2, position } = keys[axisName];
      const prev = axis.current;
      const prevTime = info.time;
      axis.current = element["scroll" + position];
      axis.scrollLength = element["scroll" + length2] - element["client" + length2];
      axis.offset.length = 0;
      axis.offset[0] = 0;
      axis.offset[1] = axis.scrollLength;
      axis.progress = utils.progress(0, axis.scrollLength, axis.current);
      const elapsed = time - prevTime;
      axis.velocity = elapsed > maxElapsed ? 0 : utils.velocityPerSecond(axis.current - prev, elapsed);
    }
    __name(updateAxisInfo, "updateAxisInfo");
    function updateScrollInfo(element, info, time) {
      updateAxisInfo(element, "x", info, time);
      updateAxisInfo(element, "y", info, time);
      info.time = time;
    }
    __name(updateScrollInfo, "updateScrollInfo");
    exports.createScrollInfo = createScrollInfo;
    exports.updateScrollInfo = updateScrollInfo;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.cjs.js
var require_inset_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
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
    __name(calcInset, "calcInset");
    exports.calcInset = calcInset;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.cjs.js
var require_presets_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.ScrollOffset = ScrollOffset;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.cjs.js
var require_edge_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
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
      if (utils.isString(edge)) {
        const asNumber = parseFloat(edge);
        if (edge.endsWith("px")) {
          delta = asNumber;
        } else if (edge.endsWith("%")) {
          edge = asNumber / 100;
        } else if (edge.endsWith("vw")) {
          delta = asNumber / 100 * document.documentElement.clientWidth;
        } else if (edge.endsWith("vh")) {
          delta = asNumber / 100 * document.documentElement.clientHeight;
        } else {
          edge = asNumber;
        }
      }
      if (utils.isNumber(edge)) {
        delta = length2 * edge;
      }
      return inset + delta;
    }
    __name(resolveEdge, "resolveEdge");
    exports.namedEdges = namedEdges;
    exports.resolveEdge = resolveEdge;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.cjs.js
var require_offset_cjs2 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var edge = require_edge_cjs();
    var defaultOffset = [0, 0];
    function resolveOffset(offset, containerLength, targetLength, targetInset) {
      let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
      let targetPoint = 0;
      let containerPoint = 0;
      if (utils.isNumber(offset)) {
        offsetDefinition = [offset, offset];
      } else if (utils.isString(offset)) {
        offset = offset.trim();
        if (offset.includes(" ")) {
          offsetDefinition = offset.split(" ");
        } else {
          offsetDefinition = [offset, edge.namedEdges[offset] ? offset : `0`];
        }
      }
      targetPoint = edge.resolveEdge(offsetDefinition[0], targetLength, targetInset);
      containerPoint = edge.resolveEdge(offsetDefinition[1], containerLength);
      return targetPoint - containerPoint;
    }
    __name(resolveOffset, "resolveOffset");
    exports.resolveOffset = resolveOffset;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.cjs.js
var require_index_cjs13 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var inset = require_inset_cjs();
    var presets = require_presets_cjs();
    var offset = require_offset_cjs2();
    var point = { x: 0, y: 0 };
    function resolveOffsets(container, info, options) {
      let { offset: offsetDefinition = presets.ScrollOffset.All } = options;
      const { target = container, axis = "y" } = options;
      const lengthLabel = axis === "y" ? "height" : "width";
      const inset$1 = target !== container ? inset.calcInset(target, container) : point;
      const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : { width: target.clientWidth, height: target.clientHeight };
      const containerSize = {
        width: container.clientWidth,
        height: container.clientHeight
      };
      info[axis].offset.length = 0;
      let hasChanged = !info[axis].interpolate;
      const numOffsets = offsetDefinition.length;
      for (let i = 0; i < numOffsets; i++) {
        const offset$1 = offset.resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset$1[axis]);
        if (!hasChanged && offset$1 !== info[axis].interpolatorOffsets[i]) {
          hasChanged = true;
        }
        info[axis].offset[i] = offset$1;
      }
      if (hasChanged) {
        info[axis].interpolate = utils.interpolate(utils.defaultOffset(numOffsets), info[axis].offset);
        info[axis].interpolatorOffsets = [...info[axis].offset];
      }
      info[axis].progress = info[axis].interpolate(info[axis].current);
    }
    __name(resolveOffsets, "resolveOffsets");
    exports.resolveOffsets = resolveOffsets;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.cjs.js
var require_on_scroll_handler_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var info = require_info_cjs();
    var index = require_index_cjs13();
    function measure(container, target = container, info2) {
      info2.x.targetOffset = 0;
      info2.y.targetOffset = 0;
      if (target !== container) {
        let node = target;
        while (node && node != container) {
          info2.x.targetOffset += node.offsetLeft;
          info2.y.targetOffset += node.offsetTop;
          node = node.offsetParent;
        }
      }
      info2.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
      info2.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
      info2.x.containerLength = container.clientWidth;
      info2.y.containerLength = container.clientHeight;
    }
    __name(measure, "measure");
    function createOnScrollHandler(element, onScroll, info$1, options = {}) {
      const axis = options.axis || "y";
      return {
        measure: () => measure(element, options.target, info$1),
        update: (time) => {
          info.updateScrollInfo(element, info$1, time);
          if (options.offset || options.target) {
            index.resolveOffsets(element, info$1, options);
          }
        },
        notify: utils.isFunction(onScroll) ? () => onScroll(info$1) : scrubAnimation(onScroll, info$1[axis])
      };
    }
    __name(createOnScrollHandler, "createOnScrollHandler");
    function scrubAnimation(controls, axisInfo) {
      controls.pause();
      controls.forEachNative((animation, { easing }) => {
        var _a, _b;
        if (animation.updateDuration) {
          if (!easing)
            animation.easing = utils.noopReturn;
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
    __name(scrubAnimation, "scrubAnimation");
    exports.createOnScrollHandler = createOnScrollHandler;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/index.cjs.js
var require_index_cjs14 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/gestures/scroll/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib2();
    var index = require_index_cjs12();
    var info = require_info_cjs();
    var onScrollHandler = require_on_scroll_handler_cjs();
    var scrollListeners = /* @__PURE__ */ new WeakMap();
    var resizeListeners = /* @__PURE__ */ new WeakMap();
    var onScrollHandlers = /* @__PURE__ */ new WeakMap();
    var getEventTarget = /* @__PURE__ */ __name((element) => element === document.documentElement ? window : element, "getEventTarget");
    function scroll(onScroll, _a = {}) {
      var { container = document.documentElement } = _a, options = tslib.__rest(_a, ["container"]);
      let containerHandlers = onScrollHandlers.get(container);
      if (!containerHandlers) {
        containerHandlers = /* @__PURE__ */ new Set();
        onScrollHandlers.set(container, containerHandlers);
      }
      const info$1 = info.createScrollInfo();
      const containerHandler = onScrollHandler.createOnScrollHandler(container, onScroll, info$1, options);
      containerHandlers.add(containerHandler);
      if (!scrollListeners.has(container)) {
        const listener2 = /* @__PURE__ */ __name(() => {
          const time = performance.now();
          for (const handler of containerHandlers)
            handler.measure();
          for (const handler of containerHandlers)
            handler.update(time);
          for (const handler of containerHandlers)
            handler.notify();
        }, "listener");
        scrollListeners.set(container, listener2);
        const target = getEventTarget(container);
        window.addEventListener("resize", listener2, { passive: true });
        if (container !== document.documentElement) {
          resizeListeners.set(container, index.resize(container, listener2));
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
    __name(scroll, "scroll");
    exports.scroll = scroll;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/has-changed.cjs.js
var require_has_changed_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/has-changed.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function hasChanged(a, b) {
      if (typeof a !== typeof b)
        return true;
      if (Array.isArray(a) && Array.isArray(b))
        return !shallowCompare(a, b);
      return a !== b;
    }
    __name(hasChanged, "hasChanged");
    function shallowCompare(next, prev) {
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
    exports.hasChanged = hasChanged;
    exports.shallowCompare = shallowCompare;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/is-variant.cjs.js
var require_is_variant_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/is-variant.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function isVariant(definition) {
      return typeof definition === "object";
    }
    __name(isVariant, "isVariant");
    exports.isVariant = isVariant;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/resolve-variant.cjs.js
var require_resolve_variant_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/resolve-variant.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isVariant = require_is_variant_cjs();
    function resolveVariant(definition, variants) {
      if (isVariant.isVariant(definition)) {
        return definition;
      } else if (definition && variants) {
        return variants[definition];
      }
    }
    __name(resolveVariant, "resolveVariant");
    exports.resolveVariant = resolveVariant;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/schedule.cjs.js
var require_schedule_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/schedule.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var scheduled = void 0;
    function processScheduledAnimations() {
      if (!scheduled)
        return;
      const generators = scheduled.sort(compareByDepth).map(fireAnimateUpdates);
      generators.forEach(fireNext);
      generators.forEach(fireNext);
      scheduled = void 0;
    }
    __name(processScheduledAnimations, "processScheduledAnimations");
    function scheduleAnimation(state) {
      if (!scheduled) {
        scheduled = [state];
        requestAnimationFrame(processScheduledAnimations);
      } else {
        utils.addUniqueItem(scheduled, state);
      }
    }
    __name(scheduleAnimation, "scheduleAnimation");
    function unscheduleAnimation(state) {
      scheduled && utils.removeItem(scheduled, state);
    }
    __name(unscheduleAnimation, "unscheduleAnimation");
    var compareByDepth = /* @__PURE__ */ __name((a, b) => a.getDepth() - b.getDepth(), "compareByDepth");
    var fireAnimateUpdates = /* @__PURE__ */ __name((state) => state.animateUpdates(), "fireAnimateUpdates");
    var fireNext = /* @__PURE__ */ __name((iterator) => iterator.next(), "fireNext");
    exports.scheduleAnimation = scheduleAnimation;
    exports.unscheduleAnimation = unscheduleAnimation;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/events.cjs.js
var require_events_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/utils/events.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var motionEvent = /* @__PURE__ */ __name((name, target) => new CustomEvent(name, { detail: { target } }), "motionEvent");
    function dispatchPointerEvent(element, name, event) {
      element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
    }
    __name(dispatchPointerEvent, "dispatchPointerEvent");
    function dispatchViewEvent(element, name, entry) {
      element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
    }
    __name(dispatchViewEvent, "dispatchViewEvent");
    exports.dispatchPointerEvent = dispatchPointerEvent;
    exports.dispatchViewEvent = dispatchViewEvent;
    exports.motionEvent = motionEvent;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/gestures/in-view.cjs.js
var require_in_view_cjs2 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/gestures/in-view.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib2();
    var events = require_events_cjs();
    var inView$1 = require_in_view_cjs();
    var inView = {
      isActive: (options) => Boolean(options.inView),
      subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
        const { once } = inViewOptions, viewOptions = tslib.__rest(inViewOptions, ["once"]);
        return inView$1.inView(element, (enterEntry) => {
          enable();
          events.dispatchViewEvent(element, "viewenter", enterEntry);
          if (!once) {
            return (leaveEntry) => {
              disable();
              events.dispatchViewEvent(element, "viewleave", leaveEntry);
            };
          }
        }, viewOptions);
      }
    };
    exports.inView = inView;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/gestures/hover.cjs.js
var require_hover_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/gestures/hover.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var events = require_events_cjs();
    var mouseEvent = /* @__PURE__ */ __name((element, name, action) => (event) => {
      if (event.pointerType && event.pointerType !== "mouse")
        return;
      action();
      events.dispatchPointerEvent(element, name, event);
    }, "mouseEvent");
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
    exports.hover = hover;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/gestures/press.cjs.js
var require_press_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/gestures/press.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var events = require_events_cjs();
    var press = {
      isActive: (options) => Boolean(options.press),
      subscribe: (element, { enable, disable }) => {
        const onPointerUp = /* @__PURE__ */ __name((event) => {
          disable();
          events.dispatchPointerEvent(element, "pressend", event);
          window.removeEventListener("pointerup", onPointerUp);
        }, "onPointerUp");
        const onPointerDown = /* @__PURE__ */ __name((event) => {
          enable();
          events.dispatchPointerEvent(element, "pressstart", event);
          window.addEventListener("pointerup", onPointerUp);
        }, "onPointerDown");
        element.addEventListener("pointerdown", onPointerDown);
        return () => {
          element.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointerup", onPointerUp);
        };
      }
    };
    exports.press = press;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/index.cjs.js
var require_index_cjs15 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/state/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib2();
    var heyListen = require_dist();
    var utils = require_index_cjs2();
    var animateStyle = require_animate_style_cjs();
    var style = require_style_cjs();
    var options = require_options_cjs();
    var hasChanged = require_has_changed_cjs();
    var resolveVariant = require_resolve_variant_cjs();
    var schedule = require_schedule_cjs();
    var inView = require_in_view_cjs2();
    var hover = require_hover_cjs();
    var press = require_press_cjs();
    var events = require_events_cjs();
    var gestures = { inView: inView.inView, hover: hover.hover, press: press.press };
    var stateTypes = ["initial", "animate", ...Object.keys(gestures), "exit"];
    var mountedStates = /* @__PURE__ */ new WeakMap();
    function createMotionState(options$1 = {}, parent) {
      let element;
      let depth = parent ? parent.getDepth() + 1 : 0;
      const activeStates = { initial: true, animate: true };
      const gestureSubscriptions = {};
      const context = {};
      for (const name of stateTypes) {
        context[name] = typeof options$1[name] === "string" ? options$1[name] : parent === null || parent === void 0 ? void 0 : parent.getContext()[name];
      }
      const initialVariantSource = options$1.initial === false ? "animate" : "initial";
      let _a = resolveVariant.resolveVariant(options$1[initialVariantSource] || context[initialVariantSource], options$1.variants) || {}, target = tslib.__rest(_a, ["transition"]);
      const baseTarget = Object.assign({}, target);
      function* animateUpdates() {
        var _a2, _b;
        const prevTarget = target;
        target = {};
        const animationOptions = {};
        for (const name of stateTypes) {
          if (!activeStates[name])
            continue;
          const variant = resolveVariant.resolveVariant(options$1[name]);
          if (!variant)
            continue;
          for (const key in variant) {
            if (key === "transition")
              continue;
            target[key] = variant[key];
            animationOptions[key] = options.getOptions((_b = (_a2 = variant.transition) !== null && _a2 !== void 0 ? _a2 : options$1.transition) !== null && _b !== void 0 ? _b : {}, key);
          }
        }
        const allTargetKeys = /* @__PURE__ */ new Set([
          ...Object.keys(target),
          ...Object.keys(prevTarget)
        ]);
        const animationFactories = [];
        allTargetKeys.forEach((key) => {
          var _a3;
          if (target[key] === void 0) {
            target[key] = baseTarget[key];
          }
          if (hasChanged.hasChanged(prevTarget[key], target[key])) {
            (_a3 = baseTarget[key]) !== null && _a3 !== void 0 ? _a3 : baseTarget[key] = style.style.get(element, key);
            animationFactories.push(animateStyle.animateStyle(element, key, target[key], animationOptions[key]));
          }
        });
        yield;
        const animations2 = animationFactories.map((factory) => factory()).filter(Boolean);
        if (!animations2.length)
          return;
        const animationTarget = target;
        element.dispatchEvent(events.motionEvent("motionstart", animationTarget));
        Promise.all(animations2.map((animation) => animation.finished)).then(() => {
          element.dispatchEvent(events.motionEvent("motioncomplete", animationTarget));
        }).catch(utils.noop);
      }
      __name(animateUpdates, "animateUpdates");
      const setGesture = /* @__PURE__ */ __name((name, isActive) => () => {
        activeStates[name] = isActive;
        schedule.scheduleAnimation(state);
      }, "setGesture");
      const updateGestureSubscriptions = /* @__PURE__ */ __name(() => {
        for (const name in gestures) {
          const isGestureActive = gestures[name].isActive(options$1);
          const remove = gestureSubscriptions[name];
          if (isGestureActive && !remove) {
            gestureSubscriptions[name] = gestures[name].subscribe(element, {
              enable: setGesture(name, true),
              disable: setGesture(name, false)
            }, options$1);
          } else if (!isGestureActive && remove) {
            remove();
            delete gestureSubscriptions[name];
          }
        }
      }, "updateGestureSubscriptions");
      const state = {
        update: (newOptions) => {
          if (!element)
            return;
          options$1 = newOptions;
          updateGestureSubscriptions();
          schedule.scheduleAnimation(state);
        },
        setActive: (name, isActive) => {
          if (!element)
            return;
          activeStates[name] = isActive;
          schedule.scheduleAnimation(state);
        },
        animateUpdates,
        getDepth: () => depth,
        getTarget: () => target,
        getOptions: () => options$1,
        getContext: () => context,
        mount: (newElement) => {
          heyListen.invariant(Boolean(newElement), "Animation state must be mounted with valid Element");
          element = newElement;
          mountedStates.set(element, state);
          updateGestureSubscriptions();
          return () => {
            mountedStates.delete(element);
            schedule.unscheduleAnimation(state);
            for (const key in gestureSubscriptions) {
              gestureSubscriptions[key]();
            }
          };
        },
        isMounted: () => Boolean(element)
      };
      return state;
    }
    __name(createMotionState, "createMotionState");
    exports.createMotionState = createMotionState;
    exports.mountedStates = mountedStates;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/style-object.cjs.js
var require_style_object_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/style-object.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var transforms = require_transforms_cjs();
    function createStyles(keyframes) {
      const initialKeyframes = {};
      const transformKeys = [];
      for (let key in keyframes) {
        const value = keyframes[key];
        if (transforms.isTransform(key)) {
          if (transforms.transformAlias[key])
            key = transforms.transformAlias[key];
          transformKeys.push(key);
          key = transforms.asTransformCssVar(key);
        }
        let initialKeyframe = Array.isArray(value) ? value[0] : value;
        const definition = transforms.transformDefinitions.get(key);
        if (definition) {
          initialKeyframe = utils.isNumber(value) ? definition.toDefaultUnit(value) : value;
        }
        initialKeyframes[key] = initialKeyframe;
      }
      if (transformKeys.length) {
        initialKeyframes.transform = transforms.buildTransformTemplate(transformKeys);
      }
      return initialKeyframes;
    }
    __name(createStyles, "createStyles");
    exports.createStyles = createStyles;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/style-string.cjs.js
var require_style_string_cjs = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/animate/utils/style-string.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var styleObject = require_style_object_cjs();
    var camelLetterToPipeLetter = /* @__PURE__ */ __name((letter) => `-${letter.toLowerCase()}`, "camelLetterToPipeLetter");
    var camelToPipeCase = /* @__PURE__ */ __name((str) => str.replace(/[A-Z]/g, camelLetterToPipeLetter), "camelToPipeCase");
    function createStyleString(target = {}) {
      const styles = styleObject.createStyles(target);
      let style = "";
      for (const key in styles) {
        style += key.startsWith("--") ? key : camelToPipeCase(key);
        style += `: ${styles[key]}; `;
      }
      return style;
    }
    __name(createStyleString, "createStyleString");
    exports.createStyleString = createStyleString;
  }
});

// ../../node_modules/framer-motion/node_modules/@motionone/dom/dist/index.cjs.js
var require_index_cjs16 = __commonJS({
  "../../node_modules/framer-motion/node_modules/@motionone/dom/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var index = require_index_cjs5();
    var animateStyle = require_animate_style_cjs();
    var index$1 = require_index_cjs6();
    var stagger = require_stagger_cjs();
    var index$2 = require_index_cjs10();
    var index$3 = require_index_cjs11();
    var style = require_style_cjs();
    var inView = require_in_view_cjs();
    var index$5 = require_index_cjs12();
    var index$6 = require_index_cjs14();
    var presets = require_presets_cjs();
    var controls = require_controls_cjs();
    var data = require_data_cjs();
    var getStyleName = require_get_style_name_cjs();
    var index$4 = require_index_cjs15();
    var styleObject = require_style_object_cjs();
    var styleString = require_style_string_cjs();
    exports.animate = index.animate;
    exports.animateStyle = animateStyle.animateStyle;
    exports.timeline = index$1.timeline;
    exports.stagger = stagger.stagger;
    exports.spring = index$2.spring;
    exports.glide = index$3.glide;
    exports.style = style.style;
    exports.inView = inView.inView;
    exports.resize = index$5.resize;
    exports.scroll = index$6.scroll;
    exports.ScrollOffset = presets.ScrollOffset;
    exports.withControls = controls.withControls;
    exports.getAnimationData = data.getAnimationData;
    exports.getStyleName = getStyleName.getStyleName;
    exports.createMotionState = index$4.createMotionState;
    exports.mountedStates = index$4.mountedStates;
    exports.createStyles = styleObject.createStyles;
    exports.createStyleString = styleString.createStyleString;
  }
});

// ../../node_modules/framer-motion/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../node_modules/framer-motion/dist/cjs/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    var styleValueTypes = require_valueTypes_cjs();
    var popmotion = require_popmotion_cjs();
    var heyListen = require_dist();
    var sync = require_framesync_cjs();
    var dom = require_index_cjs16();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    __name(_interopDefaultLegacy, "_interopDefaultLegacy");
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
    __name(_interopNamespace, "_interopNamespace");
    var React__default = /* @__PURE__ */ _interopDefaultLegacy(React);
    var React__namespace = /* @__PURE__ */ _interopNamespace(React);
    var sync__default = /* @__PURE__ */ _interopDefaultLegacy(sync);
    var MotionConfigContext2 = React.createContext({
      transformPagePoint: (p) => p,
      isStatic: false,
      reducedMotion: "never"
    });
    var MotionContext2 = React.createContext({});
    function useVisualElementContext2() {
      return React.useContext(MotionContext2).visualElement;
    }
    __name(useVisualElementContext2, "useVisualElementContext");
    var PresenceContext2 = React.createContext(null);
    var isBrowser2 = typeof document !== "undefined";
    var useIsomorphicLayoutEffect2 = isBrowser2 ? React.useLayoutEffect : React.useEffect;
    var LazyContext = React.createContext({ strict: false });
    function useVisualElement(Component, visualState, props, createVisualElement) {
      const parent = useVisualElementContext2();
      const lazyContext = React.useContext(LazyContext);
      const presenceContext = React.useContext(PresenceContext2);
      const reducedMotionConfig = React.useContext(MotionConfigContext2).reducedMotion;
      const visualElementRef = React.useRef();
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
      useIsomorphicLayoutEffect2(() => {
        visualElement2 && visualElement2.render();
      });
      React.useEffect(() => {
        if (visualElement2 && visualElement2.animationState) {
          visualElement2.animationState.animateChanges();
        }
      });
      useIsomorphicLayoutEffect2(() => () => visualElement2 && visualElement2.notify("Unmount"), []);
      return visualElement2;
    }
    __name(useVisualElement, "useVisualElement");
    function isRefObject(ref) {
      return typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
    }
    __name(isRefObject, "isRefObject");
    function useMotionRef(visualState, visualElement2, externalRef) {
      return React.useCallback(
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
    __name(useMotionRef, "useMotionRef");
    function isVariantLabel(v) {
      return typeof v === "string" || Array.isArray(v);
    }
    __name(isVariantLabel, "isVariantLabel");
    function isAnimationControls(v) {
      return typeof v === "object" && typeof v.start === "function";
    }
    __name(isAnimationControls, "isAnimationControls");
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
    __name(isControllingVariants, "isControllingVariants");
    function isVariantNode(props) {
      return Boolean(isControllingVariants(props) || props.variants);
    }
    __name(isVariantNode, "isVariantNode");
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
    function useCreateMotionContext(props) {
      const { initial, animate: animate3 } = getCurrentTreeVariants(props, React.useContext(MotionContext2));
      return React.useMemo(() => ({ initial, animate: animate3 }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate3)]);
    }
    __name(useCreateMotionContext, "useCreateMotionContext");
    function variantLabelsAsDependency(prop) {
      return Array.isArray(prop) ? prop.join(" ") : prop;
    }
    __name(variantLabelsAsDependency, "variantLabelsAsDependency");
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
    function useConstant(init) {
      const ref = React.useRef(null);
      if (ref.current === null) {
        ref.current = init();
      }
      return ref.current;
    }
    __name(useConstant, "useConstant");
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
    __name(useProjectionId, "useProjectionId");
    var LayoutGroupContext2 = React.createContext({});
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
    __name(VisualElementHandler, "VisualElementHandler");
    var SwitchLayoutGroupContext2 = React.createContext({});
    var motionComponentSymbol = Symbol.for("motionComponentSymbol");
    function createMotionComponent2({ preloadedFeatures, createVisualElement, projectionNodeConstructor, useRender, useVisualState: useVisualState2, Component }) {
      preloadedFeatures && loadFeatures(preloadedFeatures);
      function MotionComponent(props, externalRef) {
        const configAndProps = {
          ...React.useContext(MotionConfigContext2),
          ...props,
          layoutId: useLayoutId(props)
        };
        const { isStatic } = configAndProps;
        let features = null;
        const context = useCreateMotionContext(props);
        const projectionId = isStatic ? void 0 : useProjectionId();
        const visualState = useVisualState2(props, isStatic);
        if (!isStatic && isBrowser2) {
          context.visualElement = useVisualElement(Component, visualState, configAndProps, createVisualElement);
          const lazyStrictMode = React.useContext(LazyContext).strict;
          const initialLayoutGroupConfig = React.useContext(SwitchLayoutGroupContext2);
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
          React__namespace.createElement(MotionContext2.Provider, { value: context }, useRender(Component, props, projectionId, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement))
        );
      }
      __name(MotionComponent, "MotionComponent");
      const ForwardRefComponent = React.forwardRef(MotionComponent);
      ForwardRefComponent[motionComponentSymbol] = Component;
      return ForwardRefComponent;
    }
    __name(createMotionComponent2, "createMotionComponent");
    function useLayoutId({ layoutId }) {
      const layoutGroupId = React.useContext(LayoutGroupContext2).id;
      return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
    }
    __name(useLayoutId, "useLayoutId");
    function createMotionProxy(createConfig) {
      function custom(Component, customMotionComponentConfig = {}) {
        return createMotionComponent2(createConfig(Component, customMotionComponentConfig));
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
    __name(isSVGComponent, "isSVGComponent");
    var scaleCorrectors = {};
    function addScaleCorrector2(correctors) {
      Object.assign(scaleCorrectors, correctors);
    }
    __name(addScaleCorrector2, "addScaleCorrector");
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
    __name(isForcedMotionValue, "isForcedMotionValue");
    var isMotionValue2 = /* @__PURE__ */ __name((value) => !!(value === null || value === void 0 ? void 0 : value.getVelocity), "isMotionValue");
    var translateAlias = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective"
    };
    var sortTransformProps = /* @__PURE__ */ __name((a, b) => transformPropOrder.indexOf(a) - transformPropOrder.indexOf(b), "sortTransformProps");
    function buildTransform2({ transform: transform3, transformKeys: transformKeys2 }, { enableHardwareAcceleration = true, allowTransformNone = true }, transformIsDefault, transformTemplate) {
      let transformString = "";
      transformKeys2.sort(sortTransformProps);
      for (const key of transformKeys2) {
        transformString += `${translateAlias[key] || key}(${transform3[key]}) `;
      }
      if (enableHardwareAcceleration && !transform3.z) {
        transformString += "translateZ(0)";
      }
      transformString = transformString.trim();
      if (transformTemplate) {
        transformString = transformTemplate(transform3, transformIsDefault ? "" : transformString);
      } else if (allowTransformNone && transformIsDefault) {
        transformString = "none";
      }
      return transformString;
    }
    __name(buildTransform2, "buildTransform");
    function isCSSVariable$1(key) {
      return key.startsWith("--");
    }
    __name(isCSSVariable$1, "isCSSVariable$1");
    var getValueAsType = /* @__PURE__ */ __name((value, type) => {
      return type && typeof value === "number" ? type.transform(value) : value;
    }, "getValueAsType");
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
      const { style, vars, transform: transform3, transformKeys: transformKeys2, transformOrigin } = state;
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
          transform3[key] = valueAsType;
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
          style.transform = buildTransform2(state, options, transformIsNone, transformTemplate);
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
    var createHtmlRenderState = /* @__PURE__ */ __name(() => ({
      style: {},
      transform: {},
      transformKeys: [],
      transformOrigin: {},
      vars: {}
    }), "createHtmlRenderState");
    function copyRawValuesOnly(target, source, props) {
      for (const key in source) {
        if (!isMotionValue2(source[key]) && !isForcedMotionValue(key, props)) {
          target[key] = source[key];
        }
      }
    }
    __name(copyRawValuesOnly, "copyRawValuesOnly");
    function useInitialMotionValues({ transformTemplate }, visualState, isStatic) {
      return React.useMemo(() => {
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
    function isValidMotionProp2(key) {
      return validMotionProps.has(key);
    }
    __name(isValidMotionProp2, "isValidMotionProp");
    var shouldForward = /* @__PURE__ */ __name((key) => !isValidMotionProp2(key), "shouldForward");
    function loadExternalIsValidProp(isValidProp) {
      if (!isValidProp)
        return;
      shouldForward = /* @__PURE__ */ __name((key) => key.startsWith("on") ? !isValidMotionProp2(key) : isValidProp(key), "shouldForward");
    }
    __name(loadExternalIsValidProp, "loadExternalIsValidProp");
    try {
      loadExternalIsValidProp(require_is_prop_valid_browser_cjs().default);
    } catch (_a) {
    }
    function filterProps2(props, isDom, forwardMotionProps) {
      const filteredProps = {};
      for (const key in props) {
        if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp2(key) || !isDom && !isValidMotionProp2(key) || props["draggable"] && key.startsWith("onDrag")) {
          filteredProps[key] = props[key];
        }
      }
      return filteredProps;
    }
    __name(filterProps2, "filterProps");
    function calcOrigin$1(origin, offset, size) {
      return typeof origin === "string" ? origin : styleValueTypes.px.transform(offset + size * origin);
    }
    __name(calcOrigin$1, "calcOrigin$1");
    function calcSVGTransformOrigin(dimensions, originX, originY) {
      const pxOriginX = calcOrigin$1(originX, dimensions.x, dimensions.width);
      const pxOriginY = calcOrigin$1(originY, dimensions.y, dimensions.height);
      return `${pxOriginX} ${pxOriginY}`;
    }
    __name(calcSVGTransformOrigin, "calcSVGTransformOrigin");
    var dashKeys = {
      offset: "stroke-dashoffset",
      array: "stroke-dasharray"
    };
    var camelKeys = {
      offset: "strokeDashoffset",
      array: "strokeDasharray"
    };
    function buildSVGPath(attrs, length2, spacing = 1, offset = 0, useDashCase = true) {
      attrs.pathLength = 1;
      const keys = useDashCase ? dashKeys : camelKeys;
      attrs[keys.offset] = styleValueTypes.px.transform(-offset);
      const pathLength = styleValueTypes.px.transform(length2);
      const pathSpacing = styleValueTypes.px.transform(spacing);
      attrs[keys.array] = `${pathLength} ${pathSpacing}`;
    }
    __name(buildSVGPath, "buildSVGPath");
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
    var createSvgRenderState = /* @__PURE__ */ __name(() => ({
      ...createHtmlRenderState(),
      attrs: {}
    }), "createSvgRenderState");
    function useSVGProps(props, visualState) {
      const visualProps = React.useMemo(() => {
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
    function createUseRender(forwardMotionProps = false) {
      const useRender = /* @__PURE__ */ __name((Component, props, projectionId, ref, { latestValues }, isStatic) => {
        const useVisualProps = isSVGComponent(Component) ? useSVGProps : useHTMLProps;
        const visualProps = useVisualProps(props, latestValues, isStatic);
        const filteredProps = filterProps2(props, typeof Component === "string", forwardMotionProps);
        const elementProps = {
          ...filteredProps,
          ...visualProps,
          ref
        };
        if (projectionId) {
          elementProps["data-projection-id"] = projectionId;
        }
        return React.createElement(Component, elementProps);
      }, "useRender");
      return useRender;
    }
    __name(createUseRender, "createUseRender");
    var camelToDash = /* @__PURE__ */ __name((str) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), "camelToDash");
    function renderHTML(element, { style, vars }, styleProp, projection) {
      Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
      for (const key in vars) {
        element.style.setProperty(key, vars[key]);
      }
    }
    __name(renderHTML, "renderHTML");
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
    __name(renderSVG, "renderSVG");
    function scrapeMotionValuesFromProps$1(props) {
      const { style } = props;
      const newValues = {};
      for (const key in style) {
        if (isMotionValue2(style[key]) || isForcedMotionValue(key, props)) {
          newValues[key] = style[key];
        }
      }
      return newValues;
    }
    __name(scrapeMotionValuesFromProps$1, "scrapeMotionValuesFromProps$1");
    function scrapeMotionValuesFromProps(props) {
      const newValues = scrapeMotionValuesFromProps$1(props);
      for (const key in props) {
        if (isMotionValue2(props[key])) {
          const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
          newValues[targetKey] = props[key];
        }
      }
      return newValues;
    }
    __name(scrapeMotionValuesFromProps, "scrapeMotionValuesFromProps");
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
    var isKeyframesTarget = /* @__PURE__ */ __name((v) => {
      return Array.isArray(v);
    }, "isKeyframesTarget");
    var isCustomValue = /* @__PURE__ */ __name((v) => {
      return Boolean(v && typeof v === "object" && v.mix && v.toValue);
    }, "isCustomValue");
    var resolveFinalValueInKeyframes = /* @__PURE__ */ __name((v) => {
      return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
    }, "resolveFinalValueInKeyframes");
    function resolveMotionValue2(value) {
      const unwrappedValue = isMotionValue2(value) ? value.get() : value;
      return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
    }
    __name(resolveMotionValue2, "resolveMotionValue");
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
    __name(makeState, "makeState");
    var makeUseVisualState2 = /* @__PURE__ */ __name((config) => (props, isStatic) => {
      const context = React.useContext(MotionContext2);
      const presenceContext = React.useContext(PresenceContext2);
      const make = /* @__PURE__ */ __name(() => makeState(config, props, context, presenceContext), "make");
      return isStatic ? make() : useConstant(make);
    }, "makeUseVisualState");
    function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
      const values = {};
      const motionValues = scrapeMotionValues(props);
      for (const key in motionValues) {
        values[key] = resolveMotionValue2(motionValues[key]);
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
    var svgMotionConfig = {
      useVisualState: makeUseVisualState2({
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
      useVisualState: makeUseVisualState2({
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
    __name(createDomMotionConfig, "createDomMotionConfig");
    exports.AnimationType = void 0;
    (function(AnimationType2) {
      AnimationType2["Animate"] = "animate";
      AnimationType2["Hover"] = "whileHover";
      AnimationType2["Tap"] = "whileTap";
      AnimationType2["Drag"] = "whileDrag";
      AnimationType2["Focus"] = "whileFocus";
      AnimationType2["InView"] = "whileInView";
      AnimationType2["Exit"] = "exit";
    })(exports.AnimationType || (exports.AnimationType = {}));
    function addDomEvent(target, eventName, handler, options = { passive: true }) {
      target.addEventListener(eventName, handler, options);
      return () => target.removeEventListener(eventName, handler);
    }
    __name(addDomEvent, "addDomEvent");
    function useDomEvent2(ref, eventName, handler, options) {
      React.useEffect(() => {
        const element = ref.current;
        if (handler && element) {
          return addDomEvent(element, eventName, handler, options);
        }
      }, [ref, eventName, handler, options]);
    }
    __name(useDomEvent2, "useDomEvent");
    function useFocusGesture({ whileFocus, visualElement: visualElement2 }) {
      const { animationState } = visualElement2;
      const onFocus = /* @__PURE__ */ __name(() => {
        animationState && animationState.setActive(exports.AnimationType.Focus, true);
      }, "onFocus");
      const onBlur = /* @__PURE__ */ __name(() => {
        animationState && animationState.setActive(exports.AnimationType.Focus, false);
      }, "onBlur");
      useDomEvent2(visualElement2, "focus", whileFocus ? onFocus : void 0);
      useDomEvent2(visualElement2, "blur", whileFocus ? onBlur : void 0);
    }
    __name(useFocusGesture, "useFocusGesture");
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
    var wrapHandler2 = /* @__PURE__ */ __name((handler, shouldFilterPrimaryPointer = false) => {
      const listener = /* @__PURE__ */ __name((event) => handler(event, extractEventInfo(event)), "listener");
      return shouldFilterPrimaryPointer ? filterPrimaryPointer(listener) : listener;
    }, "wrapHandler");
    var supportsPointerEvents = /* @__PURE__ */ __name(() => isBrowser2 && window.onpointerdown === null, "supportsPointerEvents");
    var supportsTouchEvents = /* @__PURE__ */ __name(() => isBrowser2 && window.ontouchstart === null, "supportsTouchEvents");
    var supportsMouseEvents = /* @__PURE__ */ __name(() => isBrowser2 && window.onmousedown === null, "supportsMouseEvents");
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
    function addPointerEvent2(target, eventName, handler, options) {
      return addDomEvent(target, getPointerEventName(eventName), wrapHandler2(handler, eventName === "pointerdown"), options);
    }
    __name(addPointerEvent2, "addPointerEvent");
    function usePointerEvent(ref, eventName, handler, options) {
      return useDomEvent2(ref, getPointerEventName(eventName), handler && wrapHandler2(handler, eventName === "pointerdown"), options);
    }
    __name(usePointerEvent, "usePointerEvent");
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
    function isDragActive2() {
      const openGestureLock = getGlobalLock(true);
      if (!openGestureLock)
        return true;
      openGestureLock();
      return false;
    }
    __name(isDragActive2, "isDragActive");
    function createHoverEvent(visualElement2, isActive, callback) {
      return (event, info) => {
        if (!isMouseEvent(event) || isDragActive2())
          return;
        if (visualElement2.animationState) {
          visualElement2.animationState.setActive(exports.AnimationType.Hover, isActive);
        }
        callback && callback(event, info);
      };
    }
    __name(createHoverEvent, "createHoverEvent");
    function useHoverGesture({ onHoverStart, onHoverEnd, whileHover, visualElement: visualElement2 }) {
      usePointerEvent(visualElement2, "pointerenter", onHoverStart || whileHover ? createHoverEvent(visualElement2, true, onHoverStart) : void 0, { passive: !onHoverStart });
      usePointerEvent(visualElement2, "pointerleave", onHoverEnd || whileHover ? createHoverEvent(visualElement2, false, onHoverEnd) : void 0, { passive: !onHoverEnd });
    }
    __name(useHoverGesture, "useHoverGesture");
    var isNodeOrChild = /* @__PURE__ */ __name((parent, child) => {
      if (!child) {
        return false;
      } else if (parent === child) {
        return true;
      } else {
        return isNodeOrChild(parent, child.parentElement);
      }
    }, "isNodeOrChild");
    function useUnmountEffect2(callback) {
      return React.useEffect(() => () => callback(), []);
    }
    __name(useUnmountEffect2, "useUnmountEffect");
    function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, visualElement: visualElement2 }) {
      const hasPressListeners = onTap || onTapStart || onTapCancel || whileTap;
      const isPressing = React.useRef(false);
      const cancelPointerEndListeners = React.useRef(null);
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
        visualElement2.animationState && visualElement2.animationState.setActive(exports.AnimationType.Tap, false);
        return !isDragActive2();
      }
      __name(checkPointerEnd, "checkPointerEnd");
      function onPointerUp(event, info) {
        if (!checkPointerEnd())
          return;
        !isNodeOrChild(visualElement2.current, event.target) ? onTapCancel && onTapCancel(event, info) : onTap && onTap(event, info);
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
        cancelPointerEndListeners.current = popmotion.pipe(addPointerEvent2(window, "pointerup", onPointerUp, eventOptions), addPointerEvent2(window, "pointercancel", onPointerCancel, eventOptions));
        visualElement2.animationState && visualElement2.animationState.setActive(exports.AnimationType.Tap, true);
        onTapStart && onTapStart(event, info);
      }
      __name(onPointerDown, "onPointerDown");
      usePointerEvent(visualElement2, "pointerdown", hasPressListeners ? onPointerDown : void 0, eventOptions);
      useUnmountEffect2(removePointerEndListener);
    }
    __name(useTapGesture, "useTapGesture");
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
    __name(warnOnce, "warnOnce");
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
    function useViewport({ visualElement: visualElement2, whileInView, onViewportEnter, onViewportLeave, viewport = {} }) {
      const state = React.useRef({
        hasEnteredView: false,
        isInView: false
      });
      let shouldObserve = Boolean(whileInView || onViewportEnter || onViewportLeave);
      if (viewport.once && state.current.hasEnteredView)
        shouldObserve = false;
      const useObserver = typeof IntersectionObserver === "undefined" ? useMissingIntersectionObserver : useIntersectionObserver;
      useObserver(shouldObserve, state.current, visualElement2, viewport);
    }
    __name(useViewport, "useViewport");
    var thresholdNames = {
      some: 0,
      all: 1
    };
    function useIntersectionObserver(shouldObserve, state, visualElement2, { root, margin: rootMargin, amount = "some", once }) {
      React.useEffect(() => {
        if (!shouldObserve || !visualElement2.current)
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
          if (visualElement2.animationState) {
            visualElement2.animationState.setActive(exports.AnimationType.InView, isIntersecting);
          }
          const props = visualElement2.getProps();
          const callback = isIntersecting ? props.onViewportEnter : props.onViewportLeave;
          callback && callback(entry);
        }, "intersectionCallback");
        return observeIntersection(visualElement2.current, options, intersectionCallback);
      }, [shouldObserve, root, rootMargin, amount]);
    }
    __name(useIntersectionObserver, "useIntersectionObserver");
    function useMissingIntersectionObserver(shouldObserve, state, visualElement2, { fallback = true }) {
      React.useEffect(() => {
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
    __name(useMissingIntersectionObserver, "useMissingIntersectionObserver");
    var makeRenderlessComponent = /* @__PURE__ */ __name((hook) => (props) => {
      hook(props);
      return null;
    }, "makeRenderlessComponent");
    var gestureAnimations = {
      inView: makeRenderlessComponent(useViewport),
      tap: makeRenderlessComponent(useTapGesture),
      focus: makeRenderlessComponent(useFocusGesture),
      hover: makeRenderlessComponent(useHoverGesture)
    };
    function usePresence2() {
      const context = React.useContext(PresenceContext2);
      if (context === null)
        return [true, null];
      const { isPresent: isPresent2, onExitComplete, register } = context;
      const id2 = React.useId();
      React.useEffect(() => register(id2), []);
      const safeToRemove = /* @__PURE__ */ __name(() => onExitComplete && onExitComplete(id2), "safeToRemove");
      return !isPresent2 && onExitComplete ? [false, safeToRemove] : [true];
    }
    __name(usePresence2, "usePresence");
    function useIsPresent2() {
      return isPresent(React.useContext(PresenceContext2));
    }
    __name(useIsPresent2, "useIsPresent");
    function isPresent(context) {
      return context === null ? true : context.isPresent;
    }
    __name(isPresent, "isPresent");
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
    var secondsToMilliseconds = /* @__PURE__ */ __name((seconds) => seconds * 1e3, "secondsToMilliseconds");
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
    var easingDefinitionToFunction = /* @__PURE__ */ __name((definition) => {
      if (Array.isArray(definition)) {
        heyListen.invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
        const [x1, y1, x2, y2] = definition;
        return popmotion.cubicBezier(x1, y1, x2, y2);
      } else if (typeof definition === "string") {
        heyListen.invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
        return easingLookup[definition];
      }
      return definition;
    }, "easingDefinitionToFunction");
    var isEasingArray = /* @__PURE__ */ __name((ease) => {
      return Array.isArray(ease) && typeof ease[0] !== "number";
    }, "isEasingArray");
    var isAnimatable = /* @__PURE__ */ __name((key, value) => {
      if (key === "zIndex")
        return false;
      if (typeof value === "number" || Array.isArray(value))
        return true;
      if (typeof value === "string" && styleValueTypes.complex.test(value) && !value.startsWith("url(")) {
        return true;
      }
      return false;
    }, "isAnimatable");
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
    var keyframes = /* @__PURE__ */ __name((values) => ({
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
        transitionFactory = keyframes;
      } else {
        transitionFactory = defaultTransitions[valueKey] || defaultTransitions.default;
      }
      return { to, ...transitionFactory(to) };
    }, "getDefaultTransition");
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
    var getDefaultValueType = /* @__PURE__ */ __name((key) => defaultValueTypes[key], "getDefaultValueType");
    function getAnimatableNone(key, value) {
      var _a;
      let defaultValueType = getDefaultValueType(key);
      if (defaultValueType !== styleValueTypes.filter)
        defaultValueType = styleValueTypes.complex;
      return (_a = defaultValueType.getAnimatableNone) === null || _a === void 0 ? void 0 : _a.call(defaultValueType, value);
    }
    __name(getAnimatableNone, "getAnimatableNone");
    var instantAnimationState = {
      current: false
    };
    function delay2(callback, timeout) {
      const start = performance.now();
      const checkElapsed = /* @__PURE__ */ __name(({ timestamp }) => {
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
          sync.cancelSync.read(checkElapsed);
          callback(elapsed - timeout);
        }
      }, "checkElapsed");
      sync__default["default"].read(checkElapsed, true);
      return () => sync.cancelSync.read(checkElapsed);
    }
    __name(delay2, "delay");
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
      return typeof potentialUnitType === "number" ? 0 : getAnimatableNone("", potentialUnitType);
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
          cancelDelay = delay2(start, secondsToMilliseconds(delayBy));
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
    var isNumericalString = /* @__PURE__ */ __name((v) => /^\-?\d*\.?\d+$/.test(v), "isNumericalString");
    var isZeroValueString = /* @__PURE__ */ __name((v) => /^0[^.\s]+$/.test(v), "isZeroValueString");
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
    function moveItem([...arr], fromIndex, toIndex) {
      const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
      if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
      }
      return arr;
    }
    __name(moveItem, "moveItem");
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
    __name(SubscriptionManager, "SubscriptionManager");
    var isFloat = /* @__PURE__ */ __name((value) => {
      return !isNaN(parseFloat(value));
    }, "isFloat");
    var MotionValue2 = class {
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
    __name(MotionValue2, "MotionValue");
    function motionValue2(init) {
      return new MotionValue2(init);
    }
    __name(motionValue2, "motionValue");
    var testValueType = /* @__PURE__ */ __name((v) => (type) => type.test(v), "testValueType");
    var auto = {
      test: (v) => v === "auto",
      parse: (v) => v
    };
    var dimensionValueTypes = [styleValueTypes.number, styleValueTypes.px, styleValueTypes.percent, styleValueTypes.degrees, styleValueTypes.vw, styleValueTypes.vh, auto];
    var findDimensionValueType = /* @__PURE__ */ __name((v) => dimensionValueTypes.find(testValueType(v)), "findDimensionValueType");
    var valueTypes = [...dimensionValueTypes, styleValueTypes.color, styleValueTypes.complex];
    var findValueType = /* @__PURE__ */ __name((v) => valueTypes.find(testValueType(v)), "findValueType");
    function getCurrent(visualElement2) {
      const current = {};
      visualElement2.values.forEach((value, key) => current[key] = value.get());
      return current;
    }
    __name(getCurrent, "getCurrent");
    function getVelocity$1(visualElement2) {
      const velocity = {};
      visualElement2.values.forEach((value, key) => velocity[key] = value.getVelocity());
      return velocity;
    }
    __name(getVelocity$1, "getVelocity$1");
    function resolveVariant(visualElement2, definition, custom) {
      const props = visualElement2.getProps();
      return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, getCurrent(visualElement2), getVelocity$1(visualElement2));
    }
    __name(resolveVariant, "resolveVariant");
    function setMotionValue(visualElement2, key, value) {
      if (visualElement2.hasValue(key)) {
        visualElement2.getValue(key).set(value);
      } else {
        visualElement2.addValue(key, motionValue2(value));
      }
    }
    __name(setMotionValue, "setMotionValue");
    function setTarget(visualElement2, definition) {
      const resolved = resolveVariant(visualElement2, definition);
      let { transitionEnd = {}, transition = {}, ...target } = resolved ? visualElement2.makeTargetAnimatable(resolved, false) : {};
      target = { ...target, ...transitionEnd };
      for (const key in target) {
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement2, key, value);
      }
    }
    __name(setTarget, "setTarget");
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
    __name(setVariants, "setVariants");
    function setValues(visualElement2, definition) {
      if (Array.isArray(definition)) {
        return setVariants(visualElement2, definition);
      } else if (typeof definition === "string") {
        return setVariants(visualElement2, [definition]);
      } else {
        setTarget(visualElement2, definition);
      }
    }
    __name(setValues, "setValues");
    function checkTargetForNewValues2(visualElement2, target, origin) {
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
        visualElement2.addValue(key, motionValue2(value));
        if (origin[key] === void 0) {
          origin[key] = value;
        }
        if (value !== null)
          visualElement2.setBaseTarget(key, value);
      }
    }
    __name(checkTargetForNewValues2, "checkTargetForNewValues");
    function getOriginFromTransition(key, transition) {
      if (!transition)
        return;
      const valueTransition = transition[key] || transition["default"] || transition;
      return valueTransition.from;
    }
    __name(getOriginFromTransition, "getOriginFromTransition");
    function getOrigin(target, transition, visualElement2) {
      var _a;
      const origin = {};
      for (const key in target) {
        const transitionOrigin = getOriginFromTransition(key, transition);
        origin[key] = transitionOrigin !== void 0 ? transitionOrigin : (_a = visualElement2.getValue(key)) === null || _a === void 0 ? void 0 : _a.get();
      }
      return origin;
    }
    __name(getOrigin, "getOrigin");
    function isWillChangeMotionValue(value) {
      return Boolean(isMotionValue2(value) && value.add);
    }
    __name(isWillChangeMotionValue, "isWillChangeMotionValue");
    function animateVisualElement2(visualElement2, definition, options = {}) {
      visualElement2.notify("AnimationStart", definition);
      let animation;
      if (Array.isArray(definition)) {
        const animations3 = definition.map((variant) => animateVariant(visualElement2, variant, options));
        animation = Promise.all(animations3);
      } else if (typeof definition === "string") {
        animation = animateVariant(visualElement2, definition, options);
      } else {
        const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement2, definition, options.custom) : definition;
        animation = animateTarget(visualElement2, resolvedDefinition, options);
      }
      return animation.then(() => visualElement2.notify("AnimationComplete", definition));
    }
    __name(animateVisualElement2, "animateVisualElement");
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
    __name(animateVariant, "animateVariant");
    function animateTarget(visualElement2, definition, { delay: delay3 = 0, transitionOverride, type } = {}) {
      var _a;
      let { transition = visualElement2.getDefaultTransition(), transitionEnd, ...target } = visualElement2.makeTargetAnimatable(definition);
      const willChange = visualElement2.getValue("willChange");
      if (transitionOverride)
        transition = transitionOverride;
      const animations3 = [];
      const animationTypeState = type && ((_a = visualElement2.animationState) === null || _a === void 0 ? void 0 : _a.getState()[type]);
      for (const key in target) {
        const value = visualElement2.getValue(key);
        const valueTarget = target[key];
        if (!value || valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
          continue;
        }
        let valueTransition = { delay: delay3, ...transition };
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
        animations3.push(animation);
      }
      return Promise.all(animations3).then(() => {
        transitionEnd && setTarget(visualElement2, transitionEnd);
      });
    }
    __name(animateTarget, "animateTarget");
    function animateChildren(visualElement2, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
      const animations3 = [];
      const maxStaggerDuration = (visualElement2.variantChildren.size - 1) * staggerChildren;
      const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
      Array.from(visualElement2.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
        animations3.push(animateVariant(child, variant, {
          ...options,
          delay: delayChildren + generateStaggerDuration(i)
        }).then(() => child.notify("AnimationComplete", variant)));
      });
      return Promise.all(animations3);
    }
    __name(animateChildren, "animateChildren");
    function stopAnimation(visualElement2) {
      visualElement2.values.forEach((value) => value.stop());
    }
    __name(stopAnimation, "stopAnimation");
    function sortByTreeOrder(a, b) {
      return a.sortNodePosition(b);
    }
    __name(sortByTreeOrder, "sortByTreeOrder");
    function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
      const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
      needsAnimating[key] = false;
      return shouldBlock;
    }
    __name(shouldBlockAnimation, "shouldBlockAnimation");
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
      return (animations3) => Promise.all(animations3.map(({ animation, options }) => animateVisualElement2(visualElement2, animation, options)));
    }
    __name(animateList, "animateList");
    function createAnimationState(visualElement2) {
      let animate3 = animateList(visualElement2);
      const state = createState();
      let isInitialRender = true;
      const buildResolvedTypeValues = /* @__PURE__ */ __name((acc, definition) => {
        const resolved = resolveVariant(visualElement2, definition);
        if (resolved) {
          const { transition, transitionEnd, ...target } = resolved;
          acc = { ...acc, ...target, ...transitionEnd };
        }
        return acc;
      }, "buildResolvedTypeValues");
      function setAnimateFunction(makeAnimator) {
        animate3 = makeAnimator(visualElement2);
      }
      __name(setAnimateFunction, "setAnimateFunction");
      function animateChanges(options, changedActiveType) {
        var _a;
        const props = visualElement2.getProps();
        const context = visualElement2.getVariantContext(true) || {};
        const animations3 = [];
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
          if (isInitialRender && visualElement2.blockInitialAnimation) {
            shouldAnimateType = false;
          }
          if (shouldAnimateType && !isInherited) {
            animations3.push(...definitionList.map((animation) => ({
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
          animations3.push({ animation: fallbackAnimation });
        }
        let shouldAnimate = Boolean(animations3.length);
        if (isInitialRender && props.initial === false && !visualElement2.manuallyAnimateOnMount) {
          shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate3(animations3) : Promise.resolve();
      }
      __name(animateChanges, "animateChanges");
      function setActive(type, isActive, options) {
        var _a;
        if (state[type].isActive === isActive)
          return Promise.resolve();
        (_a = visualElement2.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
          var _a2;
          return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
        });
        state[type].isActive = isActive;
        const animations3 = animateChanges(options, type);
        for (const key in state) {
          state[key].protectedKeys = {};
        }
        return animations3;
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
        [exports.AnimationType.Animate]: createTypeState(true),
        [exports.AnimationType.InView]: createTypeState(),
        [exports.AnimationType.Hover]: createTypeState(),
        [exports.AnimationType.Tap]: createTypeState(),
        [exports.AnimationType.Drag]: createTypeState(),
        [exports.AnimationType.Focus]: createTypeState(),
        [exports.AnimationType.Exit]: createTypeState()
      };
    }
    __name(createState, "createState");
    var animations2 = {
      animation: makeRenderlessComponent(({ visualElement: visualElement2, animate: animate3 }) => {
        visualElement2.animationState || (visualElement2.animationState = createAnimationState(visualElement2));
        if (isAnimationControls(animate3)) {
          React.useEffect(() => animate3.subscribe(visualElement2), [animate3]);
        }
      }),
      exit: makeRenderlessComponent((props) => {
        const { custom, visualElement: visualElement2 } = props;
        const [isPresent2, safeToRemove] = usePresence2();
        const presenceContext = React.useContext(PresenceContext2);
        React.useEffect(() => {
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
        this.removeListeners = popmotion.pipe(addPointerEvent2(window, "pointermove", this.handlePointerMove), addPointerEvent2(window, "pointerup", this.handlePointerUp), addPointerEvent2(window, "pointercancel", this.handlePointerUp));
      }
      updateHandlers(handlers) {
        this.handlers = handlers;
      }
      end() {
        this.removeListeners && this.removeListeners();
        sync.cancelSync.update(this.updatePoint);
      }
    };
    __name(PanSession, "PanSession");
    function transformPoint(info, transformPagePoint) {
      return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
    }
    __name(transformPoint, "transformPoint");
    function subtractPoint(a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }
    __name(subtractPoint, "subtractPoint");
    function getPanInfo({ point }, history) {
      return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity(history, 0.1)
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
    __name(getVelocity, "getVelocity");
    function calcLength2(axis) {
      return axis.max - axis.min;
    }
    __name(calcLength2, "calcLength");
    function isNear(value, target = 0, maxDistance = 0.01) {
      return popmotion.distance(value, target) < maxDistance;
    }
    __name(isNear, "isNear");
    function calcAxisDelta(delta, source, target, origin = 0.5) {
      delta.origin = origin;
      delta.originPoint = popmotion.mix(source.min, source.max, delta.origin);
      delta.scale = calcLength2(target) / calcLength2(source);
      if (isNear(delta.scale, 1, 1e-4) || isNaN(delta.scale))
        delta.scale = 1;
      delta.translate = popmotion.mix(target.min, target.max, delta.origin) - delta.originPoint;
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
      target.max = target.min + calcLength2(relative);
    }
    __name(calcRelativeAxis, "calcRelativeAxis");
    function calcRelativeBox(target, relative, parent) {
      calcRelativeAxis(target.x, relative.x, parent.x);
      calcRelativeAxis(target.y, relative.y, parent.y);
    }
    __name(calcRelativeBox, "calcRelativeBox");
    function calcRelativeAxisPosition(target, layout, parent) {
      target.min = layout.min - parent.min;
      target.max = target.min + calcLength2(layout);
    }
    __name(calcRelativeAxisPosition, "calcRelativeAxisPosition");
    function calcRelativePosition(target, layout, parent) {
      calcRelativeAxisPosition(target.x, layout.x, parent.x);
      calcRelativeAxisPosition(target.y, layout.y, parent.y);
    }
    __name(calcRelativePosition, "calcRelativePosition");
    function applyConstraints(point, { min, max }, elastic) {
      if (min !== void 0 && point < min) {
        point = elastic ? popmotion.mix(min, point, elastic.min) : Math.max(point, min);
      } else if (max !== void 0 && point > max) {
        point = elastic ? popmotion.mix(max, point, elastic.max) : Math.min(point, max);
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
    function calcOrigin(source, target) {
      let origin = 0.5;
      const sourceLength = calcLength2(source);
      const targetLength = calcLength2(target);
      if (targetLength > sourceLength) {
        origin = popmotion.progress(target.min, target.max - sourceLength, source.min);
      } else if (sourceLength > targetLength) {
        origin = popmotion.progress(source.min, source.max - targetLength, target.min);
      }
      return popmotion.clamp(0, 1, origin);
    }
    __name(calcOrigin, "calcOrigin");
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
    var createBox2 = /* @__PURE__ */ __name(() => ({
      x: createAxis(),
      y: createAxis()
    }), "createBox");
    function eachAxis(callback) {
      return [callback("x"), callback("y")];
    }
    __name(eachAxis, "eachAxis");
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
    function isIdentityScale(scale) {
      return scale === void 0 || scale === 1;
    }
    __name(isIdentityScale, "isIdentityScale");
    function hasScale({ scale, scaleX, scaleY }) {
      return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
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
    function scalePoint(point, scale, originPoint) {
      const distanceFromOrigin = point - originPoint;
      const scaled = scale * distanceFromOrigin;
      return originPoint + scaled;
    }
    __name(scalePoint, "scalePoint");
    function applyPointDelta(point, translate, scale, originPoint, boxScale) {
      if (boxScale !== void 0) {
        point = scalePoint(point, boxScale, originPoint);
      }
      return scalePoint(point, scale, originPoint) + translate;
    }
    __name(applyPointDelta, "applyPointDelta");
    function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
      axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
      axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
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
    function translateAxis(axis, distance) {
      axis.min = axis.min + distance;
      axis.max = axis.max + distance;
    }
    __name(translateAxis, "translateAxis");
    function transformAxis(axis, transforms, [key, scaleKey, originKey]) {
      const axisOrigin = transforms[originKey] !== void 0 ? transforms[originKey] : 0.5;
      const originPoint = popmotion.mix(axis.min, axis.max, axisOrigin);
      applyAxisDelta(axis, transforms[key], transforms[scaleKey], originPoint, transforms.scale);
    }
    __name(transformAxis, "transformAxis");
    var xKeys$1 = ["x", "scaleX", "originX"];
    var yKeys$1 = ["y", "scaleY", "originY"];
    function transformBox(box, transform3) {
      transformAxis(box.x, transform3, xKeys$1);
      transformAxis(box.y, transform3, yKeys$1);
    }
    __name(transformBox, "transformBox");
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
    var elementDragControls = /* @__PURE__ */ new WeakMap();
    var VisualElementDragControls = class {
      constructor(visualElement2) {
        this.openGlobalLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = { x: 0, y: 0 };
        this.constraints = false;
        this.hasMutatedConstraints = false;
        this.elastic = createBox2();
        this.visualElement = visualElement2;
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
            if (styleValueTypes.percent.test(current)) {
              const measuredAxis = (_b = (_a2 = this.visualElement.projection) === null || _a2 === void 0 ? void 0 : _a2.layout) === null || _b === void 0 ? void 0 : _b.layoutBox[axis];
              if (measuredAxis) {
                const length2 = calcLength2(measuredAxis);
                current = length2 * (parseFloat(current) / 100);
              }
            }
            this.originPoint[axis] = current;
          });
          onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(event, info);
          (_a = this.visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive(exports.AnimationType.Drag, true);
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
        heyListen.invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
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
            const { min, max } = projection.layout.layoutBox[axis];
            axisValue.set(point[axis] - popmotion.mix(min, max, 0.5));
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
            boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
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
          axisValue.set(popmotion.mix(min, max, boxProgress[axis]));
        });
      }
      addListeners() {
        var _a;
        if (!this.visualElement.current)
          return;
        elementDragControls.set(this.visualElement, this);
        const element = this.visualElement.current;
        const stopPointerListener = addPointerEvent2(element, "pointerdown", (event) => {
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
              const motionValue3 = this.getAxisMotionValue(axis);
              if (!motionValue3)
                return;
              this.originPoint[axis] += delta[axis].translate;
              motionValue3.set(motionValue3.get() + delta[axis].translate);
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
    function useDrag(props) {
      const { dragControls: groupDragControls, visualElement: visualElement2 } = props;
      const dragControls = useConstant(() => new VisualElementDragControls(visualElement2));
      React.useEffect(() => groupDragControls && groupDragControls.subscribe(dragControls), [dragControls, groupDragControls]);
      React.useEffect(() => dragControls.addListeners(), [dragControls]);
    }
    __name(useDrag, "useDrag");
    function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart, visualElement: visualElement2 }) {
      const hasPanEvents = onPan || onPanStart || onPanEnd || onPanSessionStart;
      const panSession = React.useRef(null);
      const { transformPagePoint } = React.useContext(MotionConfigContext2);
      const handlers = {
        onSessionStart: onPanSessionStart,
        onStart: onPanStart,
        onMove: onPan,
        onEnd: (event, info) => {
          panSession.current = null;
          onPanEnd && onPanEnd(event, info);
        }
      };
      React.useEffect(() => {
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
      usePointerEvent(visualElement2, "pointerdown", hasPanEvents && onPointerDown);
      useUnmountEffect2(() => panSession.current && panSession.current.end());
    }
    __name(usePanGesture, "usePanGesture");
    var drag = {
      pan: makeRenderlessComponent(usePanGesture),
      drag: makeRenderlessComponent(useDrag)
    };
    function isCSSVariable(value) {
      return typeof value === "string" && value.startsWith("var(--");
    }
    __name(isCSSVariable, "isCSSVariable");
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
    __name(getVariableValue, "getVariableValue");
    function resolveCSSVariables(visualElement2, { ...target }, transitionEnd) {
      const element = visualElement2.current;
      if (!(element instanceof Element))
        return { target, transitionEnd };
      if (transitionEnd) {
        transitionEnd = { ...transitionEnd };
      }
      visualElement2.values.forEach((value) => {
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
    __name(resolveCSSVariables, "resolveCSSVariables");
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
    var isNumOrPxType = /* @__PURE__ */ __name((v) => v === styleValueTypes.number || v === styleValueTypes.px, "isNumOrPxType");
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
    var getTranslateFromMatrix = /* @__PURE__ */ __name((pos2, pos3) => (_bbox, { transform: transform3 }) => {
      if (transform3 === "none" || !transform3)
        return 0;
      const matrix3d = transform3.match(/^matrix3d\((.+)\)$/);
      if (matrix3d) {
        return getPosFromMatrix(matrix3d[1], pos3);
      } else {
        const matrix = transform3.match(/^matrix\((.+)\)$/);
        if (matrix) {
          return getPosFromMatrix(matrix[1], pos2);
        } else {
          return 0;
        }
      }
    }, "getTranslateFromMatrix");
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
        visualElement2.render();
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
    var convertChangedValueTypes = /* @__PURE__ */ __name((target, visualElement2, changedKeys) => {
      const originBbox = visualElement2.measureViewportBox();
      const element = visualElement2.current;
      const elementComputedStyle = getComputedStyle(element);
      const { display } = elementComputedStyle;
      const origin = {};
      if (display === "none") {
        visualElement2.setStaticValue("display", target.display || "block");
      }
      changedKeys.forEach((key) => {
        origin[key] = positionalValues[key](originBbox, elementComputedStyle);
      });
      visualElement2.render();
      const targetBbox = visualElement2.measureViewportBox();
      changedKeys.forEach((key) => {
        const value = visualElement2.getValue(key);
        setAndResetVelocity(value, origin[key]);
        target[key] = positionalValues[key](targetBbox, elementComputedStyle);
      });
      return target;
    }, "convertChangedValueTypes");
    var checkAndConvertChangedValueTypes = /* @__PURE__ */ __name((visualElement2, target, origin = {}, transitionEnd = {}) => {
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
        visualElement2.render();
        if (isBrowser2 && scrollY !== null) {
          window.scrollTo({ top: scrollY });
        }
        return { target: convertedTarget, transitionEnd };
      } else {
        return { target, transitionEnd };
      }
    }, "checkAndConvertChangedValueTypes");
    function unitConversion(visualElement2, target, origin, transitionEnd) {
      return hasPositionalKey(target) ? checkAndConvertChangedValueTypes(visualElement2, target, origin, transitionEnd) : { target, transitionEnd };
    }
    __name(unitConversion, "unitConversion");
    var parseDomVariant = /* @__PURE__ */ __name((visualElement2, target, origin, transitionEnd) => {
      const resolved = resolveCSSVariables(visualElement2, target, transitionEnd);
      target = resolved.target;
      transitionEnd = resolved.transitionEnd;
      return unitConversion(visualElement2, target, origin, transitionEnd);
    }, "parseDomVariant");
    var prefersReducedMotion = { current: null };
    var hasReducedMotionListener = { current: false };
    function initPrefersReducedMotion() {
      hasReducedMotionListener.current = true;
      if (!isBrowser2)
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
    function updateMotionValuesFromProps(element, next, prev) {
      const { willChange } = next;
      for (const key in next) {
        const nextValue = next[key];
        const prevValue = prev[key];
        if (isMotionValue2(nextValue)) {
          element.addValue(key, nextValue);
          if (isWillChangeMotionValue(willChange)) {
            willChange.add(key);
          }
          if (true) {
            warnOnce(nextValue.version === "7.6.7", `Attempting to mix Framer Motion versions ${nextValue.version} with 7.6.7 may not work as expected.`);
          }
        } else if (isMotionValue2(prevValue)) {
          element.addValue(key, motionValue2(nextValue));
          if (isWillChangeMotionValue(willChange)) {
            willChange.remove(key);
          }
        } else if (prevValue !== nextValue) {
          if (element.hasValue(key)) {
            const existingValue = element.getValue(key);
            !existingValue.hasAnimated && existingValue.set(nextValue);
          } else {
            const latestValue = element.getStaticValue(key);
            element.addValue(key, motionValue2(latestValue !== void 0 ? latestValue : nextValue));
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
        this.scheduleRender = () => sync__default["default"].render(this.render, false, true);
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
          if (latestValues[key] !== void 0 && isMotionValue2(value)) {
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
        sync.cancelSync.update(this.notifyUpdate);
        sync.cancelSync.render(this.render);
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
          this.props.onUpdate && sync__default["default"].update(this.notifyUpdate, false, true);
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
          heyListen.invariant(false, "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.");
        }
        for (let i = 0; i < numFeatures; i++) {
          const name = featureNames[i];
          const { isEnabled, Component } = featureDefinitions[name];
          if (isEnabled(renderedProps) && Component) {
            features.push(React.createElement(Component, {
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
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox2();
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
          const name = variantProps[i];
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
          value = motionValue2(defaultValue);
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
        if (target !== void 0 && !isMotionValue2(target))
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
    var variantProps = ["initial", ...variantPriorityOrder];
    var numVariantProps = variantProps.length;
    var DOMVisualElement = class extends VisualElement {
      sortInstanceNodePosition(a, b) {
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
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
          checkTargetForNewValues2(this, target, origin);
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
    function getComputedStyle$1(element) {
      return window.getComputedStyle(element);
    }
    __name(getComputedStyle$1, "getComputedStyle$1");
    var HTMLVisualElement = class extends DOMVisualElement {
      readValueFromInstance(instance, key) {
        if (transformProps.has(key)) {
          const defaultType = getDefaultValueType(key);
          return defaultType ? defaultType.default || 0 : 0;
        } else {
          const computedStyle = getComputedStyle$1(instance);
          const value = (isCSSVariable$1(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
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
        return scrapeMotionValuesFromProps$1(props);
      }
      renderInstance(instance, renderState, styleProp, projection) {
        renderHTML(instance, renderState, styleProp, projection);
      }
    };
    __name(HTMLVisualElement, "HTMLVisualElement");
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
        return createBox2();
      }
      scrapeMotionValuesFromProps(props) {
        return scrapeMotionValuesFromProps(props);
      }
      build(renderState, latestValues, options, props) {
        buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
      }
      renderInstance(instance, renderState, styleProp, projection) {
        renderSVG(instance, renderState, styleProp, projection);
      }
    };
    __name(SVGVisualElement, "SVGVisualElement");
    var createDomVisualElement = /* @__PURE__ */ __name((Component, options) => {
      return isSVGComponent(Component) ? new SVGVisualElement(options, { enableHardwareAcceleration: false }) : new HTMLVisualElement(options, { enableHardwareAcceleration: true });
    }, "createDomVisualElement");
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
        addScaleCorrector2(defaultScaleCorrectors);
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
    __name(MeasureLayoutWithContext, "MeasureLayoutWithContext");
    function MeasureLayout(props) {
      const [isPresent2, safeToRemove] = usePresence2();
      const layoutGroup = React.useContext(LayoutGroupContext2);
      return React__default["default"].createElement(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: React.useContext(SwitchLayoutGroupContext2), isPresent: isPresent2, safeToRemove });
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
    var layoutFeatures = {
      measureLayout: MeasureLayout
    };
    function animate2(from, to, transition = {}) {
      const value = isMotionValue2(from) ? from : motionValue2(from);
      startAnimation("", value, to, transition);
      return {
        stop: () => value.stop(),
        isAnimating: () => value.isAnimating()
      };
    }
    __name(animate2, "animate");
    var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
    var numBorders = borders.length;
    var asNumber = /* @__PURE__ */ __name((value) => typeof value === "string" ? parseFloat(value) : value, "asNumber");
    var isPx = /* @__PURE__ */ __name((value) => typeof value === "number" || styleValueTypes.px.test(value), "isPx");
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
    __name(mixValues, "mixValues");
    function getRadius(values, radiusName) {
      var _a;
      return (_a = values[radiusName]) !== null && _a !== void 0 ? _a : values.borderRadius;
    }
    __name(getRadius, "getRadius");
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
    __name(compress, "compress");
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
    function removePointDelta(point, translate, scale, originPoint, boxScale) {
      point -= translate;
      point = scalePoint(point, 1 / scale, originPoint);
      if (boxScale !== void 0) {
        point = scalePoint(point, 1 / boxScale, originPoint);
      }
      return point;
    }
    __name(removePointDelta, "removePointDelta");
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
    __name(removeAxisDelta, "removeAxisDelta");
    function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
      removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
    }
    __name(removeAxisTransforms, "removeAxisTransforms");
    var xKeys = ["x", "scaleX", "originX"];
    var yKeys = ["y", "scaleY", "originY"];
    function removeBoxTransforms(box, transforms, originBox, sourceBox) {
      removeAxisTransforms(box.x, transforms, xKeys, originBox === null || originBox === void 0 ? void 0 : originBox.x, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.x);
      removeAxisTransforms(box.y, transforms, yKeys, originBox === null || originBox === void 0 ? void 0 : originBox.y, sourceBox === null || sourceBox === void 0 ? void 0 : sourceBox.y);
    }
    __name(removeBoxTransforms, "removeBoxTransforms");
    function isAxisDeltaZero(delta) {
      return delta.translate === 0 && delta.scale === 1;
    }
    __name(isAxisDeltaZero, "isAxisDeltaZero");
    function isDeltaZero(delta) {
      return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
    }
    __name(isDeltaZero, "isDeltaZero");
    function boxEquals(a, b) {
      return a.x.min === b.x.min && a.x.max === b.x.max && a.y.min === b.y.min && a.y.max === b.y.max;
    }
    __name(boxEquals, "boxEquals");
    function aspectRatio(box) {
      return calcLength2(box.x) / calcLength2(box.y);
    }
    __name(aspectRatio, "aspectRatio");
    function isCloseTo(a, b, max = 0.1) {
      return popmotion.distance(a, b) <= max;
    }
    __name(isCloseTo, "isCloseTo");
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
    var identityProjection = "translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)";
    function buildProjectionTransform(delta, treeScale, latestTransform) {
      const xTranslate = delta.x.translate / treeScale.x;
      const yTranslate = delta.y.translate / treeScale.y;
      let transform3 = `translate3d(${xTranslate}px, ${yTranslate}px, 0) `;
      transform3 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
      if (latestTransform) {
        const { rotate, rotateX, rotateY } = latestTransform;
        if (rotate)
          transform3 += `rotate(${rotate}deg) `;
        if (rotateX)
          transform3 += `rotateX(${rotateX}deg) `;
        if (rotateY)
          transform3 += `rotateY(${rotateY}deg) `;
      }
      const elementScaleX = delta.x.scale * treeScale.x;
      const elementScaleY = delta.y.scale * treeScale.y;
      transform3 += `scale(${elementScaleX}, ${elementScaleY})`;
      return transform3 === identityProjection ? "none" : transform3;
    }
    __name(buildProjectionTransform, "buildProjectionTransform");
    var compareByDepth = /* @__PURE__ */ __name((a, b) => a.depth - b.depth, "compareByDepth");
    var FlatTree2 = class {
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
    __name(FlatTree2, "FlatTree");
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
            this.nodes = new FlatTree2();
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
          if (visualElement2 && !visualElement2.current) {
            visualElement2.mount(instance);
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
              cancelDelay = delay2(resizeUnblockUpdate, 250);
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
          this.layoutCorrected = createBox2();
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
          const { visualElement: visualElement2 } = this.options;
          if (!visualElement2)
            return createBox2();
          const box = visualElement2.measureViewportBox();
          const { scroll } = this.root;
          if (scroll) {
            translateAxis(box.x, scroll.x);
            translateAxis(box.y, scroll.y);
          }
          return box;
        }
        removeElementScroll(box) {
          const boxWithoutScroll = createBox2();
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
          const withTransforms = createBox2();
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
          const boxWithoutTransform = createBox2();
          copyBoxInto(boxWithoutTransform, box);
          for (let i = 0; i < this.path.length; i++) {
            const node = this.path[i];
            if (!node.instance)
              continue;
            if (!hasTransform(node.latestValues))
              continue;
            hasScale(node.latestValues) && node.updateSnapshot();
            const sourceBox = createBox2();
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
              this.relativeTarget = createBox2();
              this.relativeTargetOrigin = createBox2();
              calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
              copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
            } else {
              this.relativeParent = this.relativeTarget = void 0;
            }
          }
          if (!this.relativeTarget && !this.targetDelta)
            return;
          if (!this.target) {
            this.target = createBox2();
            this.targetWithTransforms = createBox2();
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
              this.relativeTarget = createBox2();
              this.relativeTargetOrigin = createBox2();
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
          const relativeLayout = createBox2();
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
              calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
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
            target = this.target || createBox2();
            const xLength = calcLength2(this.layout.layoutBox.x);
            target.x.min = lead.target.x.min;
            target.x.max = target.x.min + xLength;
            const yLength = calcLength2(this.layout.layoutBox.y);
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
          visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.render();
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
            styles.pointerEvents = resolveMotionValue2(styleProp.pointerEvents) || "";
            styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
            return styles;
          }
          const lead = this.getLead();
          if (!this.projectionDelta || !this.layout || !lead.target) {
            const emptyStyles = {};
            if (this.options.layoutId) {
              emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
              emptyStyles.pointerEvents = resolveMotionValue2(styleProp.pointerEvents) || "";
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
            styles.pointerEvents = lead === this ? resolveMotionValue2(styleProp.pointerEvents) || "" : "none";
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
            const length2 = calcLength2(axisSnapshot);
            axisSnapshot.min = layout[axis].min;
            axisSnapshot.max = axisSnapshot.min + length2;
          });
        } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
          eachAxis((axis) => {
            const axisSnapshot = snapshot.isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
            const length2 = calcLength2(layout[axis]);
            axisSnapshot.max = axisSnapshot.min + length2;
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
              const relativeSnapshot = createBox2();
              calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
              const relativeLayout = createBox2();
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
      const { visualElement: visualElement2 } = node.options;
      if (visualElement2 === null || visualElement2 === void 0 ? void 0 : visualElement2.getProps().onBeforeLayoutMeasure) {
        visualElement2.notify("BeforeLayoutMeasure");
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
      output.translate = popmotion.mix(delta.translate, 0, p);
      output.scale = popmotion.mix(delta.scale, 1, p);
      output.origin = delta.origin;
      output.originPoint = delta.originPoint;
    }
    __name(mixAxisDelta, "mixAxisDelta");
    function mixAxis(output, from, to, p) {
      output.min = popmotion.mix(from.min, to.min, p);
      output.max = popmotion.mix(from.max, to.max, p);
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
      ...animations2,
      ...gestureAnimations,
      ...drag,
      ...layoutFeatures
    };
    var motion2 = /* @__PURE__ */ createMotionProxy((Component, config) => createDomMotionConfig(Component, config, featureBundle, createDomVisualElement, HTMLProjectionNode));
    function createDomMotionComponent2(key) {
      return createMotionComponent2(createDomMotionConfig(key, { forwardMotionProps: false }, featureBundle, createDomVisualElement, HTMLProjectionNode));
    }
    __name(createDomMotionComponent2, "createDomMotionComponent");
    var m2 = createMotionProxy(createDomMotionConfig);
    function useIsMounted() {
      const isMounted = React.useRef(false);
      useIsomorphicLayoutEffect2(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);
      return isMounted;
    }
    __name(useIsMounted, "useIsMounted");
    function useForceUpdate2() {
      const isMounted = useIsMounted();
      const [forcedRenderCount, setForcedRenderCount] = React.useState(0);
      const forceRender = React.useCallback(() => {
        isMounted.current && setForcedRenderCount(forcedRenderCount + 1);
      }, [forcedRenderCount]);
      const deferredForceRender = React.useCallback(() => sync__default["default"].postRender(forceRender), [forceRender]);
      return [deferredForceRender, forcedRenderCount];
    }
    __name(useForceUpdate2, "useForceUpdate");
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
    __name(PopChildMeasure, "PopChildMeasure");
    function PopChild({ children, isPresent: isPresent2 }) {
      const id2 = React.useId();
      const ref = React.useRef(null);
      const size = React.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0
      });
      React.useInsertionEffect(() => {
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
    __name(PopChild, "PopChild");
    var PresenceChild = /* @__PURE__ */ __name(({ children, initial, isPresent: isPresent2, onExitComplete, custom, presenceAffectsLayout, mode }) => {
      const presenceChildren = useConstant(newChildrenMap);
      const id2 = React.useId();
      const context = React.useMemo(
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
      React.useMemo(() => {
        presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
      }, [isPresent2]);
      React__namespace.useEffect(() => {
        !isPresent2 && !presenceChildren.size && onExitComplete && onExitComplete();
      }, [isPresent2]);
      if (mode === "popLayout") {
        children = React__namespace.createElement(PopChild, { isPresent: isPresent2 }, children);
      }
      return React__namespace.createElement(PresenceContext2.Provider, { value: context }, children);
    }, "PresenceChild");
    function newChildrenMap() {
      return /* @__PURE__ */ new Map();
    }
    __name(newChildrenMap, "newChildrenMap");
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
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child))
          filtered.push(child);
      });
      return filtered;
    }
    __name(onlyElements, "onlyElements");
    var AnimatePresence2 = /* @__PURE__ */ __name(({ children, custom, initial = true, onExitComplete, exitBeforeEnter, presenceAffectsLayout = true, mode = "sync" }) => {
      if (exitBeforeEnter) {
        mode = "wait";
        warnOnce(false, "Replace exitBeforeEnter with mode='wait'");
      }
      let [forceRender] = useForceUpdate2();
      const forceRenderLayoutGroup = React.useContext(LayoutGroupContext2).forceRender;
      if (forceRenderLayoutGroup)
        forceRender = forceRenderLayoutGroup;
      const isMounted = useIsMounted();
      const filteredChildren = onlyElements(children);
      let childrenToRender = filteredChildren;
      const exiting = /* @__PURE__ */ new Set();
      const presentChildren = React.useRef(childrenToRender);
      const allChildren = React.useRef(/* @__PURE__ */ new Map()).current;
      const isInitialRender = React.useRef(true);
      useIsomorphicLayoutEffect2(() => {
        isInitialRender.current = false;
        updateChildLookup(filteredChildren, allChildren);
        presentChildren.current = childrenToRender;
      });
      useUnmountEffect2(() => {
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
        childrenToRender.splice(insertionIndex, 0, React__namespace.createElement(PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom, presenceAffectsLayout, mode }, child));
      });
      childrenToRender = childrenToRender.map((child) => {
        const key = child.key;
        return exiting.has(key) ? child : React__namespace.createElement(PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout, mode }, child);
      });
      if (env !== "production" && mode === "wait" && childrenToRender.length > 1) {
        console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
      }
      return React__namespace.createElement(React__namespace.Fragment, null, exiting.size ? childrenToRender : childrenToRender.map((child) => React.cloneElement(child)));
    }, "AnimatePresence");
    var DeprecatedLayoutGroupContext2 = React.createContext(null);
    var notify = /* @__PURE__ */ __name((node) => !node.isLayoutDirty && node.willUpdate(false), "notify");
    function nodeGroup() {
      const nodes = /* @__PURE__ */ new Set();
      const subscriptions = /* @__PURE__ */ new WeakMap();
      const dirtyAll = /* @__PURE__ */ __name(() => nodes.forEach(notify), "dirtyAll");
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
    __name(nodeGroup, "nodeGroup");
    var shouldInheritGroup = /* @__PURE__ */ __name((inherit) => inherit === true, "shouldInheritGroup");
    var shouldInheritId = /* @__PURE__ */ __name((inherit) => shouldInheritGroup(inherit === true) || inherit === "id", "shouldInheritId");
    var LayoutGroup2 = /* @__PURE__ */ __name(({ children, id: id2, inheritId, inherit = true }) => {
      if (inheritId !== void 0)
        inherit = inheritId;
      const layoutGroupContext = React.useContext(LayoutGroupContext2);
      const deprecatedLayoutGroupContext = React.useContext(DeprecatedLayoutGroupContext2);
      const [forceRender, key] = useForceUpdate2();
      const context = React.useRef(null);
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
      const memoizedContext = React.useMemo(() => ({ ...context.current, forceRender }), [key]);
      return React__namespace.createElement(LayoutGroupContext2.Provider, { value: memoizedContext }, children);
    }, "LayoutGroup");
    var id = 0;
    var AnimateSharedLayout2 = /* @__PURE__ */ __name(({ children }) => {
      React__namespace.useEffect(() => {
        heyListen.warning(false, "AnimateSharedLayout is deprecated: https://www.framer.com/docs/guide-upgrade/##shared-layout-animations");
      }, []);
      return React__namespace.createElement(LayoutGroup2, { id: useConstant(() => `asl-${id++}`) }, children);
    }, "AnimateSharedLayout");
    function MotionConfig2({ children, isValidProp, ...config }) {
      isValidProp && loadExternalIsValidProp(isValidProp);
      config = { ...React.useContext(MotionConfigContext2), ...config };
      config.isStatic = useConstant(() => config.isStatic);
      const context = React.useMemo(() => config, [JSON.stringify(config.transition), config.transformPagePoint, config.reducedMotion]);
      return React__namespace.createElement(MotionConfigContext2.Provider, { value: context }, children);
    }
    __name(MotionConfig2, "MotionConfig");
    function LazyMotion2({ children, features, strict = false }) {
      const [, setIsLoaded] = React.useState(!isLazyBundle(features));
      const loadedRenderer = React.useRef(void 0);
      if (!isLazyBundle(features)) {
        const { renderer, ...loadedFeatures } = features;
        loadedRenderer.current = renderer;
        loadFeatures(loadedFeatures);
      }
      React.useEffect(() => {
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
    __name(LazyMotion2, "LazyMotion");
    function isLazyBundle(features) {
      return typeof features === "function";
    }
    __name(isLazyBundle, "isLazyBundle");
    var ReorderContext = React.createContext(null);
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
    __name(checkReorder, "checkReorder");
    function ReorderGroup({ children, as = "ul", axis = "y", onReorder, values, ...props }, externalRef) {
      const Component = useConstant(() => motion2(as));
      const order = [];
      const isReordering = React.useRef(false);
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
      React.useEffect(() => {
        isReordering.current = false;
      });
      return React__namespace.createElement(
        Component,
        { ...props, ref: externalRef },
        React__namespace.createElement(ReorderContext.Provider, { value: context }, children)
      );
    }
    __name(ReorderGroup, "ReorderGroup");
    var Group = React.forwardRef(ReorderGroup);
    function getValue(item) {
      return item.value;
    }
    __name(getValue, "getValue");
    function compareMin(a, b) {
      return a.layout.min - b.layout.min;
    }
    __name(compareMin, "compareMin");
    function useMotionValue2(initial) {
      const value = useConstant(() => motionValue2(initial));
      const { isStatic } = React.useContext(MotionConfigContext2);
      if (isStatic) {
        const [, setLatest] = React.useState(initial);
        React.useEffect(() => value.onChange(setLatest), []);
      }
      return value;
    }
    __name(useMotionValue2, "useMotionValue");
    var isCustomValueType = /* @__PURE__ */ __name((v) => {
      return typeof v === "object" && v.mix;
    }, "isCustomValueType");
    var getMixer = /* @__PURE__ */ __name((v) => isCustomValueType(v) ? v.mix : void 0, "getMixer");
    function transform2(...args) {
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
    __name(transform2, "transform");
    function useOnChange(value, callback) {
      useIsomorphicLayoutEffect2(() => {
        if (isMotionValue2(value))
          return value.onChange(callback);
      }, [callback]);
    }
    __name(useOnChange, "useOnChange");
    function useMultiOnChange(values, handler, cleanup) {
      useIsomorphicLayoutEffect2(() => {
        const subscriptions = values.map((value) => value.onChange(handler));
        return () => {
          subscriptions.forEach((unsubscribe) => unsubscribe());
          cleanup();
        };
      });
    }
    __name(useMultiOnChange, "useMultiOnChange");
    function useCombineMotionValues(values, combineValues) {
      const value = useMotionValue2(combineValues());
      const updateValue = /* @__PURE__ */ __name(() => value.set(combineValues()), "updateValue");
      updateValue();
      useMultiOnChange(values, () => sync__default["default"].update(updateValue, false, true), () => sync.cancelSync.update(updateValue));
      return value;
    }
    __name(useCombineMotionValues, "useCombineMotionValues");
    function useTransform2(input, inputRangeOrTransformer, outputRange, options) {
      const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform2(inputRangeOrTransformer, outputRange, options);
      return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
    }
    __name(useTransform2, "useTransform");
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
    __name(useListTransform, "useListTransform");
    function useDefaultMotionValue(value, defaultValue = 0) {
      return isMotionValue2(value) ? value : useMotionValue2(defaultValue);
    }
    __name(useDefaultMotionValue, "useDefaultMotionValue");
    function ReorderItem({ children, style = {}, value, as = "li", onDrag, layout = true, ...props }, externalRef) {
      const Component = useConstant(() => motion2(as));
      const context = React.useContext(ReorderContext);
      const point = {
        x: useDefaultMotionValue(style.x),
        y: useDefaultMotionValue(style.y)
      };
      const zIndex = useTransform2([point.x, point.y], ([latestX, latestY]) => latestX || latestY ? 1 : "unset");
      const measuredLayout = React.useRef(null);
      heyListen.invariant(Boolean(context), "Reorder.Item must be a child of Reorder.Group");
      const { axis, registerItem, updateOrder } = context;
      React.useEffect(() => {
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
    __name(ReorderItem, "ReorderItem");
    var Item = React.forwardRef(ReorderItem);
    var Reorder2 = {
      Group,
      Item
    };
    var domAnimation2 = {
      renderer: createDomVisualElement,
      ...animations2,
      ...gestureAnimations
    };
    var domMax2 = {
      ...domAnimation2,
      ...drag,
      ...layoutFeatures,
      projectionNodeConstructor: HTMLProjectionNode
    };
    function useMotionTemplate2(fragments, ...values) {
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
      __name(buildValue, "buildValue");
      return useCombineMotionValues(values, buildValue);
    }
    __name(useMotionTemplate2, "useMotionTemplate");
    function useSpring2(source, config = {}) {
      const { isStatic } = React.useContext(MotionConfigContext2);
      const activeSpringAnimation = React.useRef(null);
      const value = useMotionValue2(isMotionValue2(source) ? source.get() : source);
      React.useMemo(() => {
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
    __name(useSpring2, "useSpring");
    function useVelocity2(value) {
      const velocity = useMotionValue2(value.getVelocity());
      React.useEffect(() => {
        return value.velocityUpdateSubscribers.add((newVelocity) => {
          velocity.set(newVelocity);
        });
      }, [value]);
      return velocity;
    }
    __name(useVelocity2, "useVelocity");
    var createScrollMotionValues = /* @__PURE__ */ __name(() => ({
      scrollX: motionValue2(0),
      scrollY: motionValue2(0),
      scrollXProgress: motionValue2(0),
      scrollYProgress: motionValue2(0)
    }), "createScrollMotionValues");
    function useScroll2({ container, target, layoutEffect = true, ...options } = {}) {
      const values = useConstant(createScrollMotionValues);
      const useLifecycleEffect = layoutEffect ? useIsomorphicLayoutEffect2 : React.useEffect;
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
    __name(useScroll2, "useScroll");
    function useElementScroll2(ref) {
      warnOnce(false, "useElementScroll is deprecated. Convert to useScroll({ container: ref }).");
      return useScroll2({ container: ref });
    }
    __name(useElementScroll2, "useElementScroll");
    function useViewportScroll2() {
      warnOnce(false, "useViewportScroll is deprecated. Convert to useScroll().");
      return useScroll2();
    }
    __name(useViewportScroll2, "useViewportScroll");
    function useAnimationFrame2(callback) {
      const initialTimestamp = React.useRef(0);
      const { isStatic } = React.useContext(MotionConfigContext2);
      React.useEffect(() => {
        if (isStatic)
          return;
        const provideTimeSinceStart = /* @__PURE__ */ __name(({ timestamp, delta }) => {
          if (!initialTimestamp.current)
            initialTimestamp.current = timestamp;
          callback(timestamp - initialTimestamp.current, delta);
        }, "provideTimeSinceStart");
        sync__default["default"].update(provideTimeSinceStart, true);
        return () => sync.cancelSync.update(provideTimeSinceStart);
      }, [callback]);
    }
    __name(useAnimationFrame2, "useAnimationFrame");
    function useTime2() {
      const time = useMotionValue2(0);
      useAnimationFrame2((t) => time.set(t));
      return time;
    }
    __name(useTime2, "useTime");
    var WillChangeMotionValue = class extends MotionValue2 {
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
    __name(WillChangeMotionValue, "WillChangeMotionValue");
    function useWillChange2() {
      return useConstant(() => new WillChangeMotionValue("auto"));
    }
    __name(useWillChange2, "useWillChange");
    function useReducedMotion2() {
      !hasReducedMotionListener.current && initPrefersReducedMotion();
      const [shouldReduceMotion] = React.useState(prefersReducedMotion.current);
      return shouldReduceMotion;
    }
    __name(useReducedMotion2, "useReducedMotion");
    function useReducedMotionConfig2() {
      const reducedMotionPreference = useReducedMotion2();
      const { reducedMotion } = React.useContext(MotionConfigContext2);
      if (reducedMotion === "never") {
        return false;
      } else if (reducedMotion === "always") {
        return true;
      } else {
        return reducedMotionPreference;
      }
    }
    __name(useReducedMotionConfig2, "useReducedMotionConfig");
    function animationControls2() {
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
            const animations3 = [];
            subscribers.forEach((visualElement2) => {
              animations3.push(animateVisualElement2(visualElement2, definition, {
                transitionOverride
              }));
            });
            return Promise.all(animations3);
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
    __name(animationControls2, "animationControls");
    function useAnimationControls2() {
      const controls = useConstant(animationControls2);
      React.useEffect(controls.mount, []);
      return controls;
    }
    __name(useAnimationControls2, "useAnimationControls");
    var useAnimation2 = useAnimationControls2;
    function useCycle2(...items) {
      const index = React.useRef(0);
      const [item, setItem] = React.useState(items[index.current]);
      const runCycle = React.useCallback(
        (next) => {
          index.current = typeof next !== "number" ? popmotion.wrap(0, items.length, index.current + 1) : next;
          setItem(items[index.current]);
        },
        [items.length, ...items]
      );
      return [item, runCycle];
    }
    __name(useCycle2, "useCycle");
    function useInView2(ref, { root, margin, amount, once = false } = {}) {
      const [isInView, setInView] = React.useState(false);
      React.useEffect(() => {
        if (!ref.current || once && isInView)
          return;
        const onEnter = /* @__PURE__ */ __name(() => {
          setInView(true);
          return once ? void 0 : () => setInView(false);
        }, "onEnter");
        const options = {
          root: root && root.current || void 0,
          margin,
          amount: amount === "some" ? "any" : amount
        };
        return dom.inView(ref.current, onEnter, options);
      }, [root, ref, margin, once]);
      return isInView;
    }
    __name(useInView2, "useInView");
    var DragControls2 = class {
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
    __name(DragControls2, "DragControls");
    var createDragControls = /* @__PURE__ */ __name(() => new DragControls2(), "createDragControls");
    function useDragControls2() {
      return useConstant(createDragControls);
    }
    __name(useDragControls2, "useDragControls");
    function isMotionComponent2(component) {
      return component !== null && typeof component === "object" && motionComponentSymbol in component;
    }
    __name(isMotionComponent2, "isMotionComponent");
    function unwrapMotionComponent2(component) {
      if (isMotionComponent2(component)) {
        return component[motionComponentSymbol];
      }
      return void 0;
    }
    __name(unwrapMotionComponent2, "unwrapMotionComponent");
    function useInstantLayoutTransition2() {
      return startTransition;
    }
    __name(useInstantLayoutTransition2, "useInstantLayoutTransition");
    function startTransition(callback) {
      if (!rootProjectionNode.current)
        return;
      rootProjectionNode.current.isUpdating = false;
      rootProjectionNode.current.blockUpdate();
      callback && callback();
    }
    __name(startTransition, "startTransition");
    function useInstantTransition2() {
      const [forceUpdate, forcedRenderCount] = useForceUpdate2();
      const startInstantLayoutTransition = useInstantLayoutTransition2();
      React.useEffect(() => {
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
    __name(useInstantTransition2, "useInstantTransition");
    function useResetProjection2() {
      const reset = React__namespace.useCallback(() => {
        const root = rootProjectionNode.current;
        if (!root)
          return;
        root.resetTree();
      }, []);
      return reset;
    }
    __name(useResetProjection2, "useResetProjection");
    var createObject = /* @__PURE__ */ __name(() => ({}), "createObject");
    var StateVisualElement = class extends VisualElement {
      build() {
      }
      measureInstanceViewportBox() {
        return createBox2();
      }
      resetTransform() {
      }
      restoreTransform() {
      }
      removeValueFromRenderState() {
      }
      renderInstance() {
      }
      scrapeMotionValuesFromProps() {
        return createObject();
      }
      getBaseTargetFromProps() {
        return void 0;
      }
      readValueFromInstance(_state, key, options) {
        return options.initialState[key] || 0;
      }
      sortInstanceNodePosition() {
        return 0;
      }
      makeTargetAnimatableFromInstance({ transition, transitionEnd, ...target }) {
        const origin = getOrigin(target, transition || {}, this);
        checkTargetForNewValues2(this, target, origin);
        return { transition, transitionEnd, ...target };
      }
    };
    __name(StateVisualElement, "StateVisualElement");
    var useVisualState = makeUseVisualState2({
      scrapeMotionValuesFromProps: createObject,
      createRenderState: createObject
    });
    function useAnimatedState(initialState) {
      const [animationState, setAnimationState] = React.useState(initialState);
      const visualState = useVisualState({}, false);
      const element = useConstant(() => {
        return new StateVisualElement({ props: {}, visualState }, { initialState });
      });
      React.useEffect(() => {
        element.mount({});
        return () => element.unmount();
      }, [element]);
      React.useEffect(() => {
        element.setProps({
          onUpdate: (v) => {
            setAnimationState({ ...v });
          }
        });
      }, [setAnimationState, element]);
      const startAnimation2 = useConstant(() => (animationDefinition) => {
        return animateVisualElement2(element, animationDefinition);
      });
      return [animationState, startAnimation2];
    }
    __name(useAnimatedState, "useAnimatedState");
    var maxScale = 1e5;
    var invertScale = /* @__PURE__ */ __name((scale) => scale > 1e-3 ? 1 / scale : maxScale, "invertScale");
    var hasWarned = false;
    function useInvertedScale(scale) {
      let parentScaleX = useMotionValue2(1);
      let parentScaleY = useMotionValue2(1);
      const visualElement2 = useVisualElementContext2();
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
      const scaleX = useTransform2(parentScaleX, invertScale);
      const scaleY = useTransform2(parentScaleY, invertScale);
      return { scaleX, scaleY };
    }
    __name(useInvertedScale, "useInvertedScale");
    exports.AnimatePresence = AnimatePresence2;
    exports.AnimateSharedLayout = AnimateSharedLayout2;
    exports.DeprecatedLayoutGroupContext = DeprecatedLayoutGroupContext2;
    exports.DragControls = DragControls2;
    exports.FlatTree = FlatTree2;
    exports.LayoutGroup = LayoutGroup2;
    exports.LayoutGroupContext = LayoutGroupContext2;
    exports.LazyMotion = LazyMotion2;
    exports.MotionConfig = MotionConfig2;
    exports.MotionConfigContext = MotionConfigContext2;
    exports.MotionContext = MotionContext2;
    exports.MotionValue = MotionValue2;
    exports.PresenceContext = PresenceContext2;
    exports.Reorder = Reorder2;
    exports.SwitchLayoutGroupContext = SwitchLayoutGroupContext2;
    exports.VisualElement = VisualElement;
    exports.addPointerEvent = addPointerEvent2;
    exports.addScaleCorrector = addScaleCorrector2;
    exports.animate = animate2;
    exports.animateVisualElement = animateVisualElement2;
    exports.animationControls = animationControls2;
    exports.animations = animations2;
    exports.buildTransform = buildTransform2;
    exports.calcLength = calcLength2;
    exports.checkTargetForNewValues = checkTargetForNewValues2;
    exports.createBox = createBox2;
    exports.createDomMotionComponent = createDomMotionComponent2;
    exports.createMotionComponent = createMotionComponent2;
    exports.delay = delay2;
    exports.domAnimation = domAnimation2;
    exports.domMax = domMax2;
    exports.filterProps = filterProps2;
    exports.isBrowser = isBrowser2;
    exports.isDragActive = isDragActive2;
    exports.isMotionComponent = isMotionComponent2;
    exports.isMotionValue = isMotionValue2;
    exports.isValidMotionProp = isValidMotionProp2;
    exports.m = m2;
    exports.makeUseVisualState = makeUseVisualState2;
    exports.motion = motion2;
    exports.motionValue = motionValue2;
    exports.resolveMotionValue = resolveMotionValue2;
    exports.transform = transform2;
    exports.unwrapMotionComponent = unwrapMotionComponent2;
    exports.useAnimation = useAnimation2;
    exports.useAnimationControls = useAnimationControls2;
    exports.useAnimationFrame = useAnimationFrame2;
    exports.useCycle = useCycle2;
    exports.useDeprecatedAnimatedState = useAnimatedState;
    exports.useDeprecatedInvertedScale = useInvertedScale;
    exports.useDomEvent = useDomEvent2;
    exports.useDragControls = useDragControls2;
    exports.useElementScroll = useElementScroll2;
    exports.useForceUpdate = useForceUpdate2;
    exports.useInView = useInView2;
    exports.useInstantLayoutTransition = useInstantLayoutTransition2;
    exports.useInstantTransition = useInstantTransition2;
    exports.useIsPresent = useIsPresent2;
    exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect2;
    exports.useMotionTemplate = useMotionTemplate2;
    exports.useMotionValue = useMotionValue2;
    exports.usePresence = usePresence2;
    exports.useReducedMotion = useReducedMotion2;
    exports.useReducedMotionConfig = useReducedMotionConfig2;
    exports.useResetProjection = useResetProjection2;
    exports.useScroll = useScroll2;
    exports.useSpring = useSpring2;
    exports.useTime = useTime2;
    exports.useTransform = useTransform2;
    exports.useUnmountEffect = useUnmountEffect2;
    exports.useVelocity = useVelocity2;
    exports.useViewportScroll = useViewportScroll2;
    exports.useVisualElementContext = useVisualElementContext2;
    exports.useWillChange = useWillChange2;
    exports.wrapHandler = wrapHandler2;
  }
});

// js/motion.ts
init_define_process();
globalThis.FramerMotion = globalThis.FramerMotion || require_cjs();
var fm = globalThis.FramerMotion;
var { createDomMotionComponent, motion } = fm;
var { m } = fm;
var { AnimatePresence } = fm;
var { AnimateSharedLayout } = fm;
var { MotionConfig } = fm;
var { LazyMotion } = fm;
var { LayoutGroup } = fm;
var { Reorder } = fm;
var { domAnimation } = fm;
var { domMax } = fm;
var { useMotionValue } = fm;
var { useMotionTemplate } = fm;
var { MotionValue, motionValue } = fm;
var { resolveMotionValue } = fm;
var { useTransform } = fm;
var { useSpring } = fm;
var { useVelocity } = fm;
var { useScroll } = fm;
var { useElementScroll } = fm;
var { useViewportScroll } = fm;
var { useTime } = fm;
var { useWillChange } = fm;
var { useReducedMotion } = fm;
var { useReducedMotionConfig } = fm;
var { animationControls } = fm;
var { useAnimation, useAnimationControls } = fm;
var { useAnimationFrame } = fm;
var { animate } = fm;
var { animateVisualElement } = fm;
var { useCycle } = fm;
var { transform } = fm;
var { isValidMotionProp } = fm;
var { useIsPresent, usePresence } = fm;
var { useInView } = fm;
var { DragControls, useDragControls } = fm;
var { useDomEvent } = fm;
var { createMotionComponent } = fm;
var { isMotionComponent } = fm;
var { unwrapMotionComponent } = fm;
var { visualElement } = fm;
var { addScaleCorrector } = fm;
var { useInstantTransition } = fm;
var { useInstantLayoutTransition } = fm;
var { useResetProjection } = fm;
var { buildTransform } = fm;
var { delay } = fm;
var { MotionContext, useVisualElementContext } = fm;
var { MotionConfigContext } = fm;
var { PresenceContext } = fm;
var { LayoutGroupContext } = fm;
var { DeprecatedLayoutGroupContext } = fm;
var { SwitchLayoutGroupContext } = fm;
var { FlatTree } = fm;
var { useDeprecatedAnimatedState } = fm;
var { useDeprecatedInvertedScale } = fm;
var { AnimationType } = fm;
var { animations } = fm;
var { checkTargetForNewValues } = fm;
var { createBox } = fm;
var { calcLength } = fm;
var { filterProps } = fm;
var { makeUseVisualState } = fm;
var { isDragActive } = fm;
var { addPointerEvent } = fm;
var { wrapHandler } = fm;
var { isMotionValue } = fm;
var { isBrowser } = fm;
var { useUnmountEffect } = fm;
var { useIsomorphicLayoutEffect } = fm;
var { useForceUpdate } = fm;
var motion_default = fm;
export {
  AnimatePresence,
  AnimateSharedLayout,
  AnimationType,
  DeprecatedLayoutGroupContext,
  DragControls,
  FlatTree,
  LayoutGroup,
  LayoutGroupContext,
  LazyMotion,
  MotionConfig,
  MotionConfigContext,
  MotionContext,
  MotionValue,
  PresenceContext,
  Reorder,
  SwitchLayoutGroupContext,
  addPointerEvent,
  addScaleCorrector,
  animate,
  animateVisualElement,
  animationControls,
  animations,
  buildTransform,
  calcLength,
  checkTargetForNewValues,
  createBox,
  createDomMotionComponent,
  createMotionComponent,
  motion_default as default,
  delay,
  domAnimation,
  domMax,
  filterProps,
  isBrowser,
  isDragActive,
  isMotionComponent,
  isMotionValue,
  isValidMotionProp,
  m,
  makeUseVisualState,
  motion,
  motionValue,
  resolveMotionValue,
  transform,
  unwrapMotionComponent,
  useAnimation,
  useAnimationControls,
  useAnimationFrame,
  useCycle,
  useDeprecatedAnimatedState,
  useDeprecatedInvertedScale,
  useDomEvent,
  useDragControls,
  useElementScroll,
  useForceUpdate,
  useInView,
  useInstantLayoutTransition,
  useInstantTransition,
  useIsPresent,
  useIsomorphicLayoutEffect,
  useMotionTemplate,
  useMotionValue,
  usePresence,
  useReducedMotion,
  useReducedMotionConfig,
  useResetProjection,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  useUnmountEffect,
  useVelocity,
  useViewportScroll,
  useVisualElementContext,
  useWillChange,
  visualElement,
  wrapHandler
};
