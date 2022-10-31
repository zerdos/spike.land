import {
  __commonJS,
  init_define_process
} from "./chunk-chunk-AIJYQNQW.mjs";

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

// ../../.yarn/global/cache/hey-listen-npm-1.0.8-adb7dae9da-9.zip/node_modules/hey-listen/dist/index.js
var require_dist = __commonJS({
  "../../.yarn/global/cache/hey-listen-npm-1.0.8-adb7dae9da-9.zip/node_modules/hey-listen/dist/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.warning = function() {
    };
    exports.invariant = function() {
    };
    if (true) {
      exports.warning = function(check, message) {
        if (!check && typeof console !== "undefined") {
          console.warn(message);
        }
      };
      exports.invariant = function(check, message) {
        if (!check) {
          throw new Error(message);
        }
      };
    }
  }
});

// ../../.yarn/global/cache/@motionone-types-npm-10.14.0-209a936e66-9.zip/node_modules/@motionone/types/dist/MotionValue.cjs.js
var require_MotionValue_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-types-npm-10.14.0-209a936e66-9.zip/node_modules/@motionone/types/dist/MotionValue.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MotionValue = class {
      setAnimation(animation) {
        this.animation = animation;
        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
        });
      }
      clearAnimation() {
        this.animation = this.generator = void 0;
      }
    };
    exports.MotionValue = MotionValue;
  }
});

// ../../.yarn/global/cache/@motionone-types-npm-10.14.0-209a936e66-9.zip/node_modules/@motionone/types/dist/index.cjs.js
var require_index_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-types-npm-10.14.0-209a936e66-9.zip/node_modules/@motionone/types/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var MotionValue = require_MotionValue_cjs();
    exports.MotionValue = MotionValue.MotionValue;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/data.cjs.js
var require_data_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/data.cjs.js"(exports) {
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
    function getMotionValue(motionValues, name) {
      if (!motionValues.has(name)) {
        motionValues.set(name, new types.MotionValue());
      }
      return motionValues.get(name);
    }
    exports.getAnimationData = getAnimationData;
    exports.getMotionValue = getMotionValue;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/array.cjs.js
var require_array_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/array.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function addUniqueItem(array, item) {
      array.indexOf(item) === -1 && array.push(item);
    }
    function removeItem(arr, item) {
      const index = arr.indexOf(item);
      index > -1 && arr.splice(index, 1);
    }
    exports.addUniqueItem = addUniqueItem;
    exports.removeItem = removeItem;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/clamp.cjs.js
var require_clamp_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/clamp.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var clamp = (min, max, v) => Math.min(Math.max(v, min), max);
    exports.clamp = clamp;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/defaults.cjs.js
var require_defaults_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/defaults.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-number.cjs.js
var require_is_number_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-number.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isNumber = (value) => typeof value === "number";
    exports.isNumber = isNumber;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-list.cjs.js
var require_is_easing_list_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-list.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isNumber = require_is_number_cjs();
    var isEasingList = (easing) => Array.isArray(easing) && !isNumber.isNumber(easing[0]);
    exports.isEasingList = isEasingList;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/wrap.cjs.js
var require_wrap_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/wrap.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var wrap = (min, max, v) => {
      const rangeSize = max - min;
      return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
    };
    exports.wrap = wrap;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/easing.cjs.js
var require_easing_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isEasingList = require_is_easing_list_cjs();
    var wrap = require_wrap_cjs();
    function getEasingForSegment(easing, i) {
      return isEasingList.isEasingList(easing) ? easing[wrap.wrap(0, easing.length, i)] : easing;
    }
    exports.getEasingForSegment = getEasingForSegment;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/mix.cjs.js
var require_mix_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/mix.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var mix = (min, max, progress) => -progress * min + progress * max + min;
    exports.mix = mix;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/noop.cjs.js
var require_noop_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/noop.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var noop = () => {
    };
    var noopReturn = (v) => v;
    exports.noop = noop;
    exports.noopReturn = noopReturn;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/progress.cjs.js
var require_progress_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/progress.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);
    exports.progress = progress;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/offset.cjs.js
var require_offset_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/offset.cjs.js"(exports) {
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
    function defaultOffset(length2) {
      const offset = [0];
      fillOffset(offset, length2 - 1);
      return offset;
    }
    exports.defaultOffset = defaultOffset;
    exports.fillOffset = fillOffset;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/interpolate.cjs.js
var require_interpolate_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/interpolate.cjs.js"(exports) {
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
    exports.interpolate = interpolate;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-cubic-bezier.cjs.js
var require_is_cubic_bezier_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-cubic-bezier.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isNumber = require_is_number_cjs();
    var isCubicBezier = (easing) => Array.isArray(easing) && isNumber.isNumber(easing[0]);
    exports.isCubicBezier = isCubicBezier;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-generator.cjs.js
var require_is_easing_generator_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-easing-generator.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isEasingGenerator = (easing) => typeof easing === "object" && Boolean(easing.createAnimation);
    exports.isEasingGenerator = isEasingGenerator;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-function.cjs.js
var require_is_function_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-function.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isFunction = (value) => typeof value === "function";
    exports.isFunction = isFunction;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-string.cjs.js
var require_is_string_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/is-string.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var isString = (value) => typeof value === "string";
    exports.isString = isString;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/time.cjs.js
var require_time_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/time.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/velocity.cjs.js
var require_velocity_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/velocity.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function velocityPerSecond(velocity, frameDuration) {
      return frameDuration ? velocity * (1e3 / frameDuration) : 0;
    }
    exports.velocityPerSecond = velocityPerSecond;
  }
});

// ../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/index.cjs.js
var require_index_cjs2 = __commonJS({
  "../../.yarn/global/cache/@motionone-utils-npm-10.14.0-0281934633-9.zip/node_modules/@motionone/utils/dist/index.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/transforms.cjs.js
var require_transforms_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/transforms.cjs.js"(exports) {
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
    var asTransformCssVar = (name) => `--motion-${name}`;
    var transforms = ["x", "y", "z"];
    order.forEach((name) => {
      axes.forEach((axis) => {
        transforms.push(name + axis);
        transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
      });
    });
    var compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
    var transformLookup = new Set(transforms);
    var isTransform = (name) => transformLookup.has(name);
    var addTransformToElement = (element, name) => {
      if (transformAlias[name])
        name = transformAlias[name];
      const { transforms: transforms2 } = data.getAnimationData(element);
      utils.addUniqueItem(transforms2, name);
      element.style.transform = buildTransformTemplate(transforms2);
    };
    var buildTransformTemplate = (transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
    var transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/css-var.cjs.js
var require_css_var_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/css-var.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var transforms = require_transforms_cjs();
    var isCssVar = (name) => name.startsWith("--");
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
    exports.isCssVar = isCssVar;
    exports.registerCssVariable = registerCssVariable;
    exports.registeredProperties = registeredProperties;
  }
});

// ../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/cubic-bezier.cjs.js
var require_cubic_bezier_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/cubic-bezier.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
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
    function cubicBezier(mX1, mY1, mX2, mY2) {
      if (mX1 === mY1 && mX2 === mY2)
        return utils.noopReturn;
      const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
      return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
    }
    exports.cubicBezier = cubicBezier;
  }
});

// ../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/steps.cjs.js
var require_steps_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/steps.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var steps = (steps2, direction = "end") => (progress) => {
      progress = direction === "end" ? Math.min(progress, 0.999) : Math.max(progress, 1e-3);
      const expanded = progress * steps2;
      const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
      return utils.clamp(0, 1, rounded / steps2);
    };
    exports.steps = steps;
  }
});

// ../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/index.cjs.js
var require_index_cjs3 = __commonJS({
  "../../.yarn/global/cache/@motionone-easing-npm-10.14.0-97af278bce-9.zip/node_modules/@motionone/easing/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var cubicBezier = require_cubic_bezier_cjs();
    var steps = require_steps_cjs();
    exports.cubicBezier = cubicBezier.cubicBezier;
    exports.steps = steps.steps;
  }
});

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/utils/easing.cjs.js
var require_easing_cjs2 = __commonJS({
  "../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/utils/easing.cjs.js"(exports) {
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
    exports.getEasingFunction = getEasingFunction;
  }
});

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/Animation.cjs.js
var require_Animation_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/Animation.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var easing = require_easing_cjs2();
    var Animation = class {
      constructor(output, keyframes = [0, 1], { easing: easing$1, duration: initialDuration = utils.defaults.duration, delay = utils.defaults.delay, endDelay = utils.defaults.endDelay, repeat = utils.defaults.repeat, offset, direction = "normal" } = {}) {
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
          delay = delay;
          let t = 0;
          if (this.pauseTime !== void 0) {
            t = this.pauseTime;
          } else {
            t = (timestamp - this.startTime) * this.rate;
          }
          this.t = t;
          t /= 1e3;
          t = Math.max(t - delay, 0);
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
    exports.Animation = Animation;
  }
});

// ../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/index.cjs.js
var require_index_cjs4 = __commonJS({
  "../../.yarn/global/cache/@motionone-animation-npm-10.14.0-26ae26acd7-9.zip/node_modules/@motionone/animation/dist/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var Animation = require_Animation_cjs();
    var easing = require_easing_cjs2();
    exports.Animation = Animation.Animation;
    exports.getEasingFunction = easing.getEasingFunction;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/feature-detection.cjs.js
var require_feature_detection_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/feature-detection.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/easing.cjs.js
var require_easing_cjs3 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var featureDetection = require_feature_detection_cjs();
    var resolution = 0.015;
    var generateLinearEasingPoints = (easing, duration) => {
      let points = "";
      const numPoints = Math.round(duration / resolution);
      for (let i = 0; i < numPoints; i++) {
        points += easing(utils.progress(0, numPoints - 1, i)) + ", ";
      }
      return points.substring(0, points.length - 2);
    };
    var convertEasing = (easing, duration) => {
      if (utils.isFunction(easing)) {
        return featureDetection.supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : utils.defaults.easing;
      } else {
        return utils.isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
      }
    };
    var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
    exports.convertEasing = convertEasing;
    exports.cubicBezierAsString = cubicBezierAsString;
    exports.generateLinearEasingPoints = generateLinearEasingPoints;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/keyframes.cjs.js
var require_keyframes_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/keyframes.cjs.js"(exports) {
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
    var keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];
    exports.hydrateKeyframes = hydrateKeyframes;
    exports.keyframesList = keyframesList;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/get-style-name.cjs.js
var require_get_style_name_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/get-style-name.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var transforms = require_transforms_cjs();
    function getStyleName(key) {
      if (transforms.transformAlias[key])
        key = transforms.transformAlias[key];
      return transforms.isTransform(key) ? transforms.asTransformCssVar(key) : key;
    }
    exports.getStyleName = getStyleName;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/style.cjs.js
var require_style_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/style.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/stop-animation.cjs.js
var require_stop_animation_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/stop-animation.cjs.js"(exports) {
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
    exports.stopAnimation = stopAnimation;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/animate-style.cjs.js
var require_animate_style_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/animate-style.cjs.js"(exports) {
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
    function animateStyle(element, key, keyframesDefinition, options = {}) {
      const record = getDevToolsRecord();
      const isRecording = options.record !== false && record;
      let animation$1;
      let { duration = utils.defaults.duration, delay = utils.defaults.delay, endDelay = utils.defaults.endDelay, repeat = utils.defaults.repeat, easing: easing$1 = utils.defaults.easing, direction, offset, allowWebkitAcceleration = false } = options;
      const data$1 = data.getAnimationData(element);
      const valueIsTransform = transforms.isTransform(key);
      let canAnimateNatively = featureDetection.supports.waapi();
      valueIsTransform && transforms.addTransformToElement(element, key);
      const name = getStyleName.getStyleName(key);
      const motionValue = data.getMotionValue(data$1.values, name);
      const definition = transforms.transformDefinitions.get(name);
      stopAnimation.stopAnimation(motionValue.animation, !(utils.isEasingGenerator(easing$1) && motionValue.generator) && options.record !== false);
      return () => {
        const readInitialValue = () => {
          var _a, _b;
          return (_b = (_a = style.style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
        };
        let keyframes$1 = keyframes.hydrateKeyframes(keyframes.keyframesList(keyframesDefinition), readInitialValue);
        if (utils.isEasingGenerator(easing$1)) {
          const custom = easing$1.createAnimation(keyframes$1, readInitialValue, valueIsTransform, name, motionValue);
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
            delay: utils.time.ms(delay),
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
          const render = (latest) => {
            if (definition)
              latest = definition.toDefaultUnit(latest);
            style.style.set(element, name, latest);
          };
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
            delay,
            easing: easing$1,
            repeat,
            offset
          }, "motion-one");
        }
        motionValue.setAnimation(animation$1);
        return animation$1;
      };
    }
    exports.animateStyle = animateStyle;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/options.cjs.js
var require_options_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/options.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var getOptions = (options, key) => options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);
    exports.getOptions = getOptions;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/resolve-elements.cjs.js
var require_resolve_elements_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/resolve-elements.cjs.js"(exports) {
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
    exports.resolveElements = resolveElements;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/controls.cjs.js
var require_controls_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/controls.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var stopAnimation = require_stop_animation_cjs();
    var createAnimation = (factory) => factory();
    var withControls = (animationFactory, options, duration = utils.defaults.duration) => {
      return new Proxy({
        animations: animationFactory.map(createAnimation).filter(Boolean),
        duration,
        options
      }, controls);
    };
    var getActiveAnimation = (state) => state.animations[0];
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
    var selectFinished = (animation) => animation.finished;
    exports.controls = controls;
    exports.withControls = withControls;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/stagger.cjs.js
var require_stagger_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/utils/stagger.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var animation = require_index_cjs4();
    function stagger(duration = 0.1, { start = 0, from = 0, easing } = {}) {
      return (i, total) => {
        const fromIndex = utils.isNumber(from) ? from : getFromIndex(from, total);
        const distance = Math.abs(fromIndex - i);
        let delay = duration * distance;
        if (easing) {
          const maxDelay = total * duration;
          const easingFunction = animation.getEasingFunction(easing);
          delay = easingFunction(delay / maxDelay) * maxDelay;
        }
        return start + delay;
      };
    }
    function getFromIndex(from, total) {
      if (from === "first") {
        return 0;
      } else {
        const lastIndex = total - 1;
        return from === "last" ? lastIndex : lastIndex / 2;
      }
    }
    function resolveOption(option, i, total) {
      return utils.isFunction(option) ? option(i, total) : option;
    }
    exports.getFromIndex = getFromIndex;
    exports.resolveOption = resolveOption;
    exports.stagger = stagger;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/index.cjs.js
var require_index_cjs5 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var animateStyle = require_animate_style_cjs();
    var options = require_options_cjs();
    var resolveElements = require_resolve_elements_cjs();
    var controls = require_controls_cjs();
    var stagger = require_stagger_cjs();
    function animate(elements, keyframes, options$1 = {}) {
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
    exports.animate = animate;
  }
});

// ../../.yarn/global/cache/tslib-npm-2.4.0-9cb6dc5030-9.zip/node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "../../.yarn/global/cache/tslib-npm-2.4.0-9cb6dc5030-9.zip/node_modules/tslib/tslib.js"(exports, module) {
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
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      __rest = function(s, e) {
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
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
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
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
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
      };
      __exportStar = function(m, o) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m, p);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      };
      __values = function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
          return m.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i >= o.length)
                o = void 0;
              return { value: o && o[i++], done: !o };
            }
          };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
          s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
        return r;
      };
      __spreadArray = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
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
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e) {
            settle(q[0][3], e);
          }
        }
        function step(r) {
          r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f, v) {
          if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
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
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
          return this;
        }, i);
        function verb(n) {
          i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
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
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet = function(receiver, state, kind, f) {
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldIn = function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      };
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/calc-time.cjs.js
var require_calc_time_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/calc-time.cjs.js"(exports) {
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
    exports.calcNextTime = calcNextTime;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/edit.cjs.js
var require_edit_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/edit.cjs.js"(exports) {
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
    exports.addKeyframes = addKeyframes;
    exports.eraseKeyframes = eraseKeyframes;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/sort.cjs.js
var require_sort_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/utils/sort.cjs.js"(exports) {
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
    exports.compareByTime = compareByTime;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/index.cjs.js
var require_index_cjs6 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/timeline/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib();
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
            const delay = stagger.resolveOption(options$1.delay, elementIndex, numElements) || 0;
            const startTime = currentTime + delay;
            const targetTime = startTime + duration;
            let { offset = utils.defaultOffset(valueKeyframes.length) } = valueOptions;
            if (offset.length === 1 && offset[0] === 0) {
              offset[1] = 1;
            }
            const remainder = length - valueKeyframes.length;
            remainder > 0 && utils.fillOffset(offset, remainder);
            valueKeyframes.length === 1 && valueKeyframes.unshift(null);
            edit.addKeyframes(valueSequence, valueKeyframes, easing, offset, startTime, targetTime);
            maxDuration = Math.max(delay + duration, maxDuration);
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
    function getElementSequence(element, sequences) {
      !sequences.has(element) && sequences.set(element, {});
      return sequences.get(element);
    }
    function getValueSequence(name, sequences) {
      if (!sequences[name])
        sequences[name] = [];
      return sequences[name];
    }
    exports.createAnimationsFromTimeline = createAnimationsFromTimeline;
    exports.timeline = timeline;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/velocity.cjs.js
var require_velocity_cjs2 = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/velocity.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var sampleT = 5;
    function calcGeneratorVelocity(resolveValue, t, current) {
      const prevT = Math.max(t - sampleT, 0);
      return utils.velocityPerSecond(current - resolveValue(prevT), t - prevT);
    }
    exports.calcGeneratorVelocity = calcGeneratorVelocity;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/defaults.cjs.js
var require_defaults_cjs2 = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/defaults.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/utils.cjs.js
var require_utils_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/utils.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaults = require_defaults_cjs2();
    var calcDampingRatio = (stiffness = defaults.defaults.stiffness, damping = defaults.defaults.damping, mass = defaults.defaults.mass) => damping / (2 * Math.sqrt(stiffness * mass));
    exports.calcDampingRatio = calcDampingRatio;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/has-reached-target.cjs.js
var require_has_reached_target_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/has-reached-target.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function hasReachedTarget(origin, target, current) {
      return origin < target && current >= target || origin > target && current <= target;
    }
    exports.hasReachedTarget = hasReachedTarget;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/index.cjs.js
var require_index_cjs7 = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/spring/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var defaults = require_defaults_cjs2();
    var utils$1 = require_utils_cjs();
    var hasReachedTarget = require_has_reached_target_cjs();
    var velocity = require_velocity_cjs2();
    var spring = ({ stiffness = defaults.defaults.stiffness, damping = defaults.defaults.damping, mass = defaults.defaults.mass, from = 0, to = 1, velocity: velocity$1 = 0, restSpeed = 2, restDistance = 0.5 } = {}) => {
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
        resolveSpring = (t) => to - Math.exp(-dampingRatio * undampedAngularFreq * t) * ((-velocity$1 + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
      } else {
        resolveSpring = (t) => {
          return to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (-velocity$1 + undampedAngularFreq * initialDelta) * t);
        };
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
    };
    exports.spring = spring;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/glide/index.cjs.js
var require_index_cjs8 = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/glide/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var velocity = require_velocity_cjs2();
    var index = require_index_cjs7();
    var glide = ({ from = 0, velocity: velocity$1 = 0, power = 0.8, decay = 0.325, bounceDamping, bounceStiffness, changeTarget, min, max, restDistance = 0.5, restSpeed }) => {
      decay = utils.time.ms(decay);
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
      let amplitude = power * velocity$1;
      const ideal = from + amplitude;
      const target = changeTarget === void 0 ? ideal : changeTarget(ideal);
      state.target = target;
      if (target !== ideal)
        amplitude = target - from;
      const calcDelta = (t) => -amplitude * Math.exp(-t / decay);
      const calcLatest = (t) => target + calcDelta(t);
      const applyFriction = (t) => {
        const delta = calcDelta(t);
        const latest = calcLatest(t);
        state.done = Math.abs(delta) <= restDistance;
        state.current = state.done ? target : latest;
      };
      let timeReachedBoundary;
      let spring;
      const checkCatchBoundary = (t) => {
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
      };
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
    };
    exports.glide = glide;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.cjs.js
var require_pregenerate_keyframes_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/utils/pregenerate-keyframes.cjs.js"(exports) {
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
    exports.pregenerateKeyframes = pregenerateKeyframes;
  }
});

// ../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/index.cjs.js
var require_index_cjs9 = __commonJS({
  "../../.yarn/global/cache/@motionone-generators-npm-10.14.0-ffd261b86d-9.zip/node_modules/@motionone/generators/dist/index.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/create-generator-easing.cjs.js
var require_create_generator_easing_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/create-generator-easing.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var generators = require_index_cjs9();
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
            keyframesCache.set(generator, generators.pregenerateKeyframes(generator));
          }
          return keyframesCache.get(generator);
        };
        return {
          createAnimation: (keyframes, getOrigin, canUseGenerator, name, motionValue) => {
            var _a, _b;
            let settings;
            const numKeyframes = keyframes.length;
            let shouldUseGenerator = canUseGenerator && numKeyframes <= 2 && keyframes.every(isNumberOrNull);
            if (shouldUseGenerator) {
              const target = keyframes[numKeyframes - 1];
              const unresolvedOrigin = numKeyframes === 1 ? null : keyframes[0];
              let velocity = 0;
              let origin = 0;
              const prevGenerator = motionValue === null || motionValue === void 0 ? void 0 : motionValue.generator;
              if (prevGenerator) {
                const { animation, generatorStartTime } = motionValue;
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
              if (motionValue) {
                motionValue.generator = generator;
                motionValue.generatorStartTime = performance.now();
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
    exports.createGeneratorEasing = createGeneratorEasing;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/spring/index.cjs.js
var require_index_cjs10 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/spring/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var generators = require_index_cjs9();
    var createGeneratorEasing = require_create_generator_easing_cjs();
    var spring = createGeneratorEasing.createGeneratorEasing(generators.spring);
    exports.spring = spring;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/glide/index.cjs.js
var require_index_cjs11 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/easing/glide/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var generators = require_index_cjs9();
    var createGeneratorEasing = require_create_generator_easing_cjs();
    var glide = createGeneratorEasing.createGeneratorEasing(generators.glide);
    exports.glide = glide;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/in-view.cjs.js
var require_in_view_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/in-view.cjs.js"(exports) {
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
      const onIntersectionChange = (entries) => {
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
      };
      const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount]
      });
      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }
    exports.inView = inView;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-element.cjs.js
var require_handle_element_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-element.cjs.js"(exports) {
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
    exports.resizeElement = resizeElement;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-window.cjs.js
var require_handle_window_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/handle-window.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.resizeWindow = resizeWindow;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/index.cjs.js
var require_index_cjs12 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/resize/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var handleElement = require_handle_element_cjs();
    var handleWindow = require_handle_window_cjs();
    var utils = require_index_cjs2();
    function resize(a, b) {
      return utils.isFunction(a) ? handleWindow.resizeWindow(a) : handleElement.resizeElement(a, b);
    }
    exports.resize = resize;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/info.cjs.js
var require_info_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/info.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_index_cjs2();
    var maxElapsed = 50;
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
    function updateScrollInfo(element, info, time) {
      updateAxisInfo(element, "x", info, time);
      updateAxisInfo(element, "y", info, time);
      info.time = time;
    }
    exports.createScrollInfo = createScrollInfo;
    exports.updateScrollInfo = updateScrollInfo;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.cjs.js
var require_inset_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/inset.cjs.js"(exports) {
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
    exports.calcInset = calcInset;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.cjs.js
var require_presets_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/presets.cjs.js"(exports) {
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.cjs.js
var require_edge_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/edge.cjs.js"(exports) {
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
    exports.namedEdges = namedEdges;
    exports.resolveEdge = resolveEdge;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.cjs.js
var require_offset_cjs2 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/offset.cjs.js"(exports) {
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
    exports.resolveOffset = resolveOffset;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.cjs.js
var require_index_cjs13 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/offsets/index.cjs.js"(exports) {
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
    exports.resolveOffsets = resolveOffsets;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.cjs.js
var require_on_scroll_handler_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/on-scroll-handler.cjs.js"(exports) {
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
    exports.createOnScrollHandler = createOnScrollHandler;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/index.cjs.js
var require_index_cjs14 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/gestures/scroll/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib();
    var index = require_index_cjs12();
    var info = require_info_cjs();
    var onScrollHandler = require_on_scroll_handler_cjs();
    var scrollListeners = /* @__PURE__ */ new WeakMap();
    var resizeListeners = /* @__PURE__ */ new WeakMap();
    var onScrollHandlers = /* @__PURE__ */ new WeakMap();
    var getEventTarget = (element) => element === document.documentElement ? window : element;
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
        const listener2 = () => {
          const time = performance.now();
          for (const handler of containerHandlers)
            handler.measure();
          for (const handler of containerHandlers)
            handler.update(time);
          for (const handler of containerHandlers)
            handler.notify();
        };
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
    exports.scroll = scroll;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/has-changed.cjs.js
var require_has_changed_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/has-changed.cjs.js"(exports) {
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
    exports.hasChanged = hasChanged;
    exports.shallowCompare = shallowCompare;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/is-variant.cjs.js
var require_is_variant_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/is-variant.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    function isVariant(definition) {
      return typeof definition === "object";
    }
    exports.isVariant = isVariant;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/resolve-variant.cjs.js
var require_resolve_variant_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/resolve-variant.cjs.js"(exports) {
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
    exports.resolveVariant = resolveVariant;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/schedule.cjs.js
var require_schedule_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/schedule.cjs.js"(exports) {
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
    function scheduleAnimation(state) {
      if (!scheduled) {
        scheduled = [state];
        requestAnimationFrame(processScheduledAnimations);
      } else {
        utils.addUniqueItem(scheduled, state);
      }
    }
    function unscheduleAnimation(state) {
      scheduled && utils.removeItem(scheduled, state);
    }
    var compareByDepth = (a, b) => a.getDepth() - b.getDepth();
    var fireAnimateUpdates = (state) => state.animateUpdates();
    var fireNext = (iterator) => iterator.next();
    exports.scheduleAnimation = scheduleAnimation;
    exports.unscheduleAnimation = unscheduleAnimation;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/events.cjs.js
var require_events_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/utils/events.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var motionEvent = (name, target) => new CustomEvent(name, { detail: { target } });
    function dispatchPointerEvent(element, name, event) {
      element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
    }
    function dispatchViewEvent(element, name, entry) {
      element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
    }
    exports.dispatchPointerEvent = dispatchPointerEvent;
    exports.dispatchViewEvent = dispatchViewEvent;
    exports.motionEvent = motionEvent;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/in-view.cjs.js
var require_in_view_cjs2 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/in-view.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib();
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/hover.cjs.js
var require_hover_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/hover.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var events = require_events_cjs();
    var mouseEvent = (element, name, action) => (event) => {
      if (event.pointerType && event.pointerType !== "mouse")
        return;
      action();
      events.dispatchPointerEvent(element, name, event);
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
    exports.hover = hover;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/press.cjs.js
var require_press_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/gestures/press.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var events = require_events_cjs();
    var press = {
      isActive: (options) => Boolean(options.press),
      subscribe: (element, { enable, disable }) => {
        const onPointerUp = (event) => {
          disable();
          events.dispatchPointerEvent(element, "pressend", event);
          window.removeEventListener("pointerup", onPointerUp);
        };
        const onPointerDown = (event) => {
          enable();
          events.dispatchPointerEvent(element, "pressstart", event);
          window.addEventListener("pointerup", onPointerUp);
        };
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

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/index.cjs.js
var require_index_cjs15 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/state/index.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require_tslib();
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
        const animations = animationFactories.map((factory) => factory()).filter(Boolean);
        if (!animations.length)
          return;
        const animationTarget = target;
        element.dispatchEvent(events.motionEvent("motionstart", animationTarget));
        Promise.all(animations.map((animation) => animation.finished)).then(() => {
          element.dispatchEvent(events.motionEvent("motioncomplete", animationTarget));
        }).catch(utils.noop);
      }
      const setGesture = (name, isActive) => () => {
        activeStates[name] = isActive;
        schedule.scheduleAnimation(state);
      };
      const updateGestureSubscriptions = () => {
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
      };
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
    exports.createMotionState = createMotionState;
    exports.mountedStates = mountedStates;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-object.cjs.js
var require_style_object_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-object.cjs.js"(exports) {
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
    exports.createStyles = createStyles;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-string.cjs.js
var require_style_string_cjs = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/animate/utils/style-string.cjs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var styleObject = require_style_object_cjs();
    var camelLetterToPipeLetter = (letter) => `-${letter.toLowerCase()}`;
    var camelToPipeCase = (str) => str.replace(/[A-Z]/g, camelLetterToPipeLetter);
    function createStyleString(target = {}) {
      const styles = styleObject.createStyles(target);
      let style = "";
      for (const key in styles) {
        style += key.startsWith("--") ? key : camelToPipeCase(key);
        style += `: ${styles[key]}; `;
      }
      return style;
    }
    exports.createStyleString = createStyleString;
  }
});

// ../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/index.cjs.js
var require_index_cjs16 = __commonJS({
  "../../.yarn/global/cache/@motionone-dom-npm-10.13.1-2b54608f7c-9.zip/node_modules/@motionone/dom/dist/index.cjs.js"(exports) {
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

export {
  require_is_prop_valid_browser_cjs,
  require_tslib,
  require_dist,
  require_index_cjs16 as require_index_cjs
};
