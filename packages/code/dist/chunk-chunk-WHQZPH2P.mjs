import {
  applyPatch,
  hashCode,
  mST,
  makePatch,
  makePatchFrom,
  onSessionUpdate,
  patchSync,
  startSession
} from "./chunk-chunk-QQDDPDXJ.mjs";
import {
  LazyMotion,
  __rest,
  domAnimation,
  domMax,
  m
} from "./chunk-chunk-CNREOSRE.mjs";
import {
  _extends,
  require_emotion_cache_cjs,
  require_emotion_element_b63ca7c6_cjs_dev,
  require_emotion_memoize_cjs,
  require_emotion_react_cjs,
  require_emotion_react_isolated_hnrs_cjs_dev,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_extends,
  require_hoist_non_react_statics_cjs
} from "./chunk-chunk-SEOII4AH.mjs";
import {
  $,
  Children,
  PureComponent,
  cloneElement,
  createContext,
  createRef,
  createRoot,
  forwardRef,
  h,
  init_react_preact,
  isValidElement,
  memo,
  o,
  p,
  react_preact_default,
  react_preact_exports,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-HV73MJXZ.mjs";
import {
  __commonJS,
  __name,
  __toCommonJS,
  __toESM,
  define_process_default,
  init_define_process
} from "./chunk-chunk-S6BTEEN4.mjs";

// node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js
var require_emotion_react_jsx_runtime_cjs_dev = __commonJS({
  "node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    init_react_preact();
    require_emotion_cache_cjs();
    var emotionElement = require_emotion_element_b63ca7c6_cjs_dev();
    require_extends();
    require_emotion_weak_memoize_cjs();
    require_hoist_non_react_statics_cjs();
    require_emotion_react_isolated_hnrs_cjs_dev();
    require_emotion_utils_cjs();
    require_emotion_serialize_cjs();
    require_emotion_use_insertion_effect_with_fallbacks_cjs();
    var ReactJSXRuntime = (init_react_preact(), __toCommonJS(react_preact_exports));
    var Fragment2 = ReactJSXRuntime.Fragment;
    function jsx8(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsx(type, props, key);
      }
      return ReactJSXRuntime.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    __name(jsx8, "jsx");
    function jsxs5(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsxs(type, props, key);
      }
      return ReactJSXRuntime.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    __name(jsxs5, "jsxs");
    exports.Fragment = Fragment2;
    exports.jsx = jsx8;
    exports.jsxs = jsxs5;
  }
});

// node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js
var require_emotion_react_jsx_runtime_cjs = __commonJS({
  "node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_react_jsx_runtime_cjs_dev();
    }
  }
});

// node_modules/qrious/dist/qrious.js
var require_qrious = __commonJS({
  "node_modules/qrious/dist/qrious.js"(exports, module) {
    init_define_process();
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.QRious = factory();
    })(exports, function() {
      "use strict";
      var Constructor = /* @__PURE__ */ __name(function() {
      }, "Constructor");
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var slice = Array.prototype.slice;
      function createObject(prototype, properties2) {
        var result;
        if (typeof Object.create === "function") {
          result = Object.create(prototype);
        } else {
          Constructor.prototype = prototype;
          result = new Constructor();
          Constructor.prototype = null;
        }
        if (properties2) {
          extendObject(true, result, properties2);
        }
        return result;
      }
      __name(createObject, "createObject");
      function extend(name, constructor, prototype, statics) {
        var superConstructor = this;
        if (typeof name !== "string") {
          statics = prototype;
          prototype = constructor;
          constructor = name;
          name = null;
        }
        if (typeof constructor !== "function") {
          statics = prototype;
          prototype = constructor;
          constructor = /* @__PURE__ */ __name(function() {
            return superConstructor.apply(this, arguments);
          }, "constructor");
        }
        extendObject(false, constructor, superConstructor, statics);
        constructor.prototype = createObject(superConstructor.prototype, prototype);
        constructor.prototype.constructor = constructor;
        constructor.class_ = name || superConstructor.class_;
        constructor.super_ = superConstructor;
        return constructor;
      }
      __name(extend, "extend");
      function extendObject(own, target, sources) {
        sources = slice.call(arguments, 2);
        var property;
        var source;
        for (var i = 0, length = sources.length; i < length; i++) {
          source = sources[i];
          for (property in source) {
            if (!own || hasOwnProperty.call(source, property)) {
              target[property] = source[property];
            }
          }
        }
      }
      __name(extendObject, "extendObject");
      var extend_1 = extend;
      function Nevis() {
      }
      __name(Nevis, "Nevis");
      Nevis.class_ = "Nevis";
      Nevis.super_ = Object;
      Nevis.extend = extend_1;
      var nevis = Nevis;
      var lite = nevis;
      var Renderer = lite.extend(function(qrious, element, enabled) {
        this.qrious = qrious;
        this.element = element;
        this.element.qrious = qrious;
        this.enabled = Boolean(enabled);
      }, {
        draw: function(frame) {
        },
        getElement: function() {
          if (!this.enabled) {
            this.enabled = true;
            this.render();
          }
          return this.element;
        },
        getModuleSize: function(frame) {
          var qrious = this.qrious;
          var padding2 = qrious.padding || 0;
          var pixels = Math.floor((qrious.size - padding2 * 2) / frame.width);
          return Math.max(1, pixels);
        },
        getOffset: function(frame) {
          var qrious = this.qrious;
          var padding2 = qrious.padding;
          if (padding2 != null) {
            return padding2;
          }
          var moduleSize = this.getModuleSize(frame);
          var offset = Math.floor((qrious.size - moduleSize * frame.width) / 2);
          return Math.max(0, offset);
        },
        render: function(frame) {
          if (this.enabled) {
            this.resize();
            this.reset();
            this.draw(frame);
          }
        },
        reset: function() {
        },
        resize: function() {
        }
      });
      var Renderer_1 = Renderer;
      var CanvasRenderer = Renderer_1.extend({
        draw: function(frame) {
          var i, j;
          var qrious = this.qrious;
          var moduleSize = this.getModuleSize(frame);
          var offset = this.getOffset(frame);
          var context = this.element.getContext("2d");
          context.fillStyle = qrious.foreground;
          context.globalAlpha = qrious.foregroundAlpha;
          for (i = 0; i < frame.width; i++) {
            for (j = 0; j < frame.width; j++) {
              if (frame.buffer[j * frame.width + i]) {
                context.fillRect(moduleSize * i + offset, moduleSize * j + offset, moduleSize, moduleSize);
              }
            }
          }
        },
        reset: function() {
          var qrious = this.qrious;
          var context = this.element.getContext("2d");
          var size = qrious.size;
          context.lineWidth = 1;
          context.clearRect(0, 0, size, size);
          context.fillStyle = qrious.background;
          context.globalAlpha = qrious.backgroundAlpha;
          context.fillRect(0, 0, size, size);
        },
        resize: function() {
          var element = this.element;
          element.width = element.height = this.qrious.size;
        }
      });
      var CanvasRenderer_1 = CanvasRenderer;
      var Alignment = lite.extend(null, {
        BLOCK: [
          0,
          11,
          15,
          19,
          23,
          27,
          31,
          16,
          18,
          20,
          22,
          24,
          26,
          28,
          20,
          22,
          24,
          24,
          26,
          28,
          28,
          22,
          24,
          24,
          26,
          26,
          28,
          28,
          24,
          24,
          26,
          26,
          26,
          28,
          28,
          24,
          26,
          26,
          26,
          28,
          28
        ]
      });
      var Alignment_1 = Alignment;
      var ErrorCorrection = lite.extend(null, {
        BLOCKS: [
          1,
          0,
          19,
          7,
          1,
          0,
          16,
          10,
          1,
          0,
          13,
          13,
          1,
          0,
          9,
          17,
          1,
          0,
          34,
          10,
          1,
          0,
          28,
          16,
          1,
          0,
          22,
          22,
          1,
          0,
          16,
          28,
          1,
          0,
          55,
          15,
          1,
          0,
          44,
          26,
          2,
          0,
          17,
          18,
          2,
          0,
          13,
          22,
          1,
          0,
          80,
          20,
          2,
          0,
          32,
          18,
          2,
          0,
          24,
          26,
          4,
          0,
          9,
          16,
          1,
          0,
          108,
          26,
          2,
          0,
          43,
          24,
          2,
          2,
          15,
          18,
          2,
          2,
          11,
          22,
          2,
          0,
          68,
          18,
          4,
          0,
          27,
          16,
          4,
          0,
          19,
          24,
          4,
          0,
          15,
          28,
          2,
          0,
          78,
          20,
          4,
          0,
          31,
          18,
          2,
          4,
          14,
          18,
          4,
          1,
          13,
          26,
          2,
          0,
          97,
          24,
          2,
          2,
          38,
          22,
          4,
          2,
          18,
          22,
          4,
          2,
          14,
          26,
          2,
          0,
          116,
          30,
          3,
          2,
          36,
          22,
          4,
          4,
          16,
          20,
          4,
          4,
          12,
          24,
          2,
          2,
          68,
          18,
          4,
          1,
          43,
          26,
          6,
          2,
          19,
          24,
          6,
          2,
          15,
          28,
          4,
          0,
          81,
          20,
          1,
          4,
          50,
          30,
          4,
          4,
          22,
          28,
          3,
          8,
          12,
          24,
          2,
          2,
          92,
          24,
          6,
          2,
          36,
          22,
          4,
          6,
          20,
          26,
          7,
          4,
          14,
          28,
          4,
          0,
          107,
          26,
          8,
          1,
          37,
          22,
          8,
          4,
          20,
          24,
          12,
          4,
          11,
          22,
          3,
          1,
          115,
          30,
          4,
          5,
          40,
          24,
          11,
          5,
          16,
          20,
          11,
          5,
          12,
          24,
          5,
          1,
          87,
          22,
          5,
          5,
          41,
          24,
          5,
          7,
          24,
          30,
          11,
          7,
          12,
          24,
          5,
          1,
          98,
          24,
          7,
          3,
          45,
          28,
          15,
          2,
          19,
          24,
          3,
          13,
          15,
          30,
          1,
          5,
          107,
          28,
          10,
          1,
          46,
          28,
          1,
          15,
          22,
          28,
          2,
          17,
          14,
          28,
          5,
          1,
          120,
          30,
          9,
          4,
          43,
          26,
          17,
          1,
          22,
          28,
          2,
          19,
          14,
          28,
          3,
          4,
          113,
          28,
          3,
          11,
          44,
          26,
          17,
          4,
          21,
          26,
          9,
          16,
          13,
          26,
          3,
          5,
          107,
          28,
          3,
          13,
          41,
          26,
          15,
          5,
          24,
          30,
          15,
          10,
          15,
          28,
          4,
          4,
          116,
          28,
          17,
          0,
          42,
          26,
          17,
          6,
          22,
          28,
          19,
          6,
          16,
          30,
          2,
          7,
          111,
          28,
          17,
          0,
          46,
          28,
          7,
          16,
          24,
          30,
          34,
          0,
          13,
          24,
          4,
          5,
          121,
          30,
          4,
          14,
          47,
          28,
          11,
          14,
          24,
          30,
          16,
          14,
          15,
          30,
          6,
          4,
          117,
          30,
          6,
          14,
          45,
          28,
          11,
          16,
          24,
          30,
          30,
          2,
          16,
          30,
          8,
          4,
          106,
          26,
          8,
          13,
          47,
          28,
          7,
          22,
          24,
          30,
          22,
          13,
          15,
          30,
          10,
          2,
          114,
          28,
          19,
          4,
          46,
          28,
          28,
          6,
          22,
          28,
          33,
          4,
          16,
          30,
          8,
          4,
          122,
          30,
          22,
          3,
          45,
          28,
          8,
          26,
          23,
          30,
          12,
          28,
          15,
          30,
          3,
          10,
          117,
          30,
          3,
          23,
          45,
          28,
          4,
          31,
          24,
          30,
          11,
          31,
          15,
          30,
          7,
          7,
          116,
          30,
          21,
          7,
          45,
          28,
          1,
          37,
          23,
          30,
          19,
          26,
          15,
          30,
          5,
          10,
          115,
          30,
          19,
          10,
          47,
          28,
          15,
          25,
          24,
          30,
          23,
          25,
          15,
          30,
          13,
          3,
          115,
          30,
          2,
          29,
          46,
          28,
          42,
          1,
          24,
          30,
          23,
          28,
          15,
          30,
          17,
          0,
          115,
          30,
          10,
          23,
          46,
          28,
          10,
          35,
          24,
          30,
          19,
          35,
          15,
          30,
          17,
          1,
          115,
          30,
          14,
          21,
          46,
          28,
          29,
          19,
          24,
          30,
          11,
          46,
          15,
          30,
          13,
          6,
          115,
          30,
          14,
          23,
          46,
          28,
          44,
          7,
          24,
          30,
          59,
          1,
          16,
          30,
          12,
          7,
          121,
          30,
          12,
          26,
          47,
          28,
          39,
          14,
          24,
          30,
          22,
          41,
          15,
          30,
          6,
          14,
          121,
          30,
          6,
          34,
          47,
          28,
          46,
          10,
          24,
          30,
          2,
          64,
          15,
          30,
          17,
          4,
          122,
          30,
          29,
          14,
          46,
          28,
          49,
          10,
          24,
          30,
          24,
          46,
          15,
          30,
          4,
          18,
          122,
          30,
          13,
          32,
          46,
          28,
          48,
          14,
          24,
          30,
          42,
          32,
          15,
          30,
          20,
          4,
          117,
          30,
          40,
          7,
          47,
          28,
          43,
          22,
          24,
          30,
          10,
          67,
          15,
          30,
          19,
          6,
          118,
          30,
          18,
          31,
          47,
          28,
          34,
          34,
          24,
          30,
          20,
          61,
          15,
          30
        ],
        FINAL_FORMAT: [
          30660,
          29427,
          32170,
          30877,
          26159,
          25368,
          27713,
          26998,
          21522,
          20773,
          24188,
          23371,
          17913,
          16590,
          20375,
          19104,
          13663,
          12392,
          16177,
          14854,
          9396,
          8579,
          11994,
          11245,
          5769,
          5054,
          7399,
          6608,
          1890,
          597,
          3340,
          2107
        ],
        LEVELS: {
          L: 1,
          M: 2,
          Q: 3,
          H: 4
        }
      });
      var ErrorCorrection_1 = ErrorCorrection;
      var Galois = lite.extend(null, {
        EXPONENT: [
          1,
          2,
          4,
          8,
          16,
          32,
          64,
          128,
          29,
          58,
          116,
          232,
          205,
          135,
          19,
          38,
          76,
          152,
          45,
          90,
          180,
          117,
          234,
          201,
          143,
          3,
          6,
          12,
          24,
          48,
          96,
          192,
          157,
          39,
          78,
          156,
          37,
          74,
          148,
          53,
          106,
          212,
          181,
          119,
          238,
          193,
          159,
          35,
          70,
          140,
          5,
          10,
          20,
          40,
          80,
          160,
          93,
          186,
          105,
          210,
          185,
          111,
          222,
          161,
          95,
          190,
          97,
          194,
          153,
          47,
          94,
          188,
          101,
          202,
          137,
          15,
          30,
          60,
          120,
          240,
          253,
          231,
          211,
          187,
          107,
          214,
          177,
          127,
          254,
          225,
          223,
          163,
          91,
          182,
          113,
          226,
          217,
          175,
          67,
          134,
          17,
          34,
          68,
          136,
          13,
          26,
          52,
          104,
          208,
          189,
          103,
          206,
          129,
          31,
          62,
          124,
          248,
          237,
          199,
          147,
          59,
          118,
          236,
          197,
          151,
          51,
          102,
          204,
          133,
          23,
          46,
          92,
          184,
          109,
          218,
          169,
          79,
          158,
          33,
          66,
          132,
          21,
          42,
          84,
          168,
          77,
          154,
          41,
          82,
          164,
          85,
          170,
          73,
          146,
          57,
          114,
          228,
          213,
          183,
          115,
          230,
          209,
          191,
          99,
          198,
          145,
          63,
          126,
          252,
          229,
          215,
          179,
          123,
          246,
          241,
          255,
          227,
          219,
          171,
          75,
          150,
          49,
          98,
          196,
          149,
          55,
          110,
          220,
          165,
          87,
          174,
          65,
          130,
          25,
          50,
          100,
          200,
          141,
          7,
          14,
          28,
          56,
          112,
          224,
          221,
          167,
          83,
          166,
          81,
          162,
          89,
          178,
          121,
          242,
          249,
          239,
          195,
          155,
          43,
          86,
          172,
          69,
          138,
          9,
          18,
          36,
          72,
          144,
          61,
          122,
          244,
          245,
          247,
          243,
          251,
          235,
          203,
          139,
          11,
          22,
          44,
          88,
          176,
          125,
          250,
          233,
          207,
          131,
          27,
          54,
          108,
          216,
          173,
          71,
          142,
          0
        ],
        LOG: [
          255,
          0,
          1,
          25,
          2,
          50,
          26,
          198,
          3,
          223,
          51,
          238,
          27,
          104,
          199,
          75,
          4,
          100,
          224,
          14,
          52,
          141,
          239,
          129,
          28,
          193,
          105,
          248,
          200,
          8,
          76,
          113,
          5,
          138,
          101,
          47,
          225,
          36,
          15,
          33,
          53,
          147,
          142,
          218,
          240,
          18,
          130,
          69,
          29,
          181,
          194,
          125,
          106,
          39,
          249,
          185,
          201,
          154,
          9,
          120,
          77,
          228,
          114,
          166,
          6,
          191,
          139,
          98,
          102,
          221,
          48,
          253,
          226,
          152,
          37,
          179,
          16,
          145,
          34,
          136,
          54,
          208,
          148,
          206,
          143,
          150,
          219,
          189,
          241,
          210,
          19,
          92,
          131,
          56,
          70,
          64,
          30,
          66,
          182,
          163,
          195,
          72,
          126,
          110,
          107,
          58,
          40,
          84,
          250,
          133,
          186,
          61,
          202,
          94,
          155,
          159,
          10,
          21,
          121,
          43,
          78,
          212,
          229,
          172,
          115,
          243,
          167,
          87,
          7,
          112,
          192,
          247,
          140,
          128,
          99,
          13,
          103,
          74,
          222,
          237,
          49,
          197,
          254,
          24,
          227,
          165,
          153,
          119,
          38,
          184,
          180,
          124,
          17,
          68,
          146,
          217,
          35,
          32,
          137,
          46,
          55,
          63,
          209,
          91,
          149,
          188,
          207,
          205,
          144,
          135,
          151,
          178,
          220,
          252,
          190,
          97,
          242,
          86,
          211,
          171,
          20,
          42,
          93,
          158,
          132,
          60,
          57,
          83,
          71,
          109,
          65,
          162,
          31,
          45,
          67,
          216,
          183,
          123,
          164,
          118,
          196,
          23,
          73,
          236,
          127,
          12,
          111,
          246,
          108,
          161,
          59,
          82,
          41,
          157,
          85,
          170,
          251,
          96,
          134,
          177,
          187,
          204,
          62,
          90,
          203,
          89,
          95,
          176,
          156,
          169,
          160,
          81,
          11,
          245,
          22,
          235,
          122,
          117,
          44,
          215,
          79,
          174,
          213,
          233,
          230,
          231,
          173,
          232,
          116,
          214,
          244,
          234,
          168,
          80,
          88,
          175
        ]
      });
      var Galois_1 = Galois;
      var Version = lite.extend(null, {
        BLOCK: [
          3220,
          1468,
          2713,
          1235,
          3062,
          1890,
          2119,
          1549,
          2344,
          2936,
          1117,
          2583,
          1330,
          2470,
          1667,
          2249,
          2028,
          3780,
          481,
          4011,
          142,
          3098,
          831,
          3445,
          592,
          2517,
          1776,
          2234,
          1951,
          2827,
          1070,
          2660,
          1345,
          3177
        ]
      });
      var Version_1 = Version;
      var Frame = lite.extend(function(options) {
        var dataBlock, eccBlock, index2, neccBlock1, neccBlock2;
        var valueLength = options.value.length;
        this._badness = [];
        this._level = ErrorCorrection_1.LEVELS[options.level];
        this._polynomial = [];
        this._value = options.value;
        this._version = 0;
        this._stringBuffer = [];
        while (this._version < 40) {
          this._version++;
          index2 = (this._level - 1) * 4 + (this._version - 1) * 16;
          neccBlock1 = ErrorCorrection_1.BLOCKS[index2++];
          neccBlock2 = ErrorCorrection_1.BLOCKS[index2++];
          dataBlock = ErrorCorrection_1.BLOCKS[index2++];
          eccBlock = ErrorCorrection_1.BLOCKS[index2];
          index2 = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (this._version <= 9);
          if (valueLength <= index2) {
            break;
          }
        }
        this._dataBlock = dataBlock;
        this._eccBlock = eccBlock;
        this._neccBlock1 = neccBlock1;
        this._neccBlock2 = neccBlock2;
        var width2 = this.width = 17 + 4 * this._version;
        this.buffer = Frame._createArray(width2 * width2);
        this._ecc = Frame._createArray(dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2);
        this._mask = Frame._createArray((width2 * (width2 + 1) + 1) / 2);
        this._insertFinders();
        this._insertAlignments();
        this.buffer[8 + width2 * (width2 - 8)] = 1;
        this._insertTimingGap();
        this._reverseMask();
        this._insertTimingRowAndColumn();
        this._insertVersion();
        this._syncMask();
        this._convertBitStream(valueLength);
        this._calculatePolynomial();
        this._appendEccToData();
        this._interleaveBlocks();
        this._pack();
        this._finish();
      }, {
        _addAlignment: function(x, y) {
          var i;
          var buffer = this.buffer;
          var width2 = this.width;
          buffer[x + width2 * y] = 1;
          for (i = -2; i < 2; i++) {
            buffer[x + i + width2 * (y - 2)] = 1;
            buffer[x - 2 + width2 * (y + i + 1)] = 1;
            buffer[x + 2 + width2 * (y + i)] = 1;
            buffer[x + i + 1 + width2 * (y + 2)] = 1;
          }
          for (i = 0; i < 2; i++) {
            this._setMask(x - 1, y + i);
            this._setMask(x + 1, y - i);
            this._setMask(x - i, y - 1);
            this._setMask(x + i, y + 1);
          }
        },
        _appendData: function(data, dataLength, ecc, eccLength) {
          var bit, i, j;
          var polynomial = this._polynomial;
          var stringBuffer = this._stringBuffer;
          for (i = 0; i < eccLength; i++) {
            stringBuffer[ecc + i] = 0;
          }
          for (i = 0; i < dataLength; i++) {
            bit = Galois_1.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];
            if (bit !== 255) {
              for (j = 1; j < eccLength; j++) {
                stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^ Galois_1.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
              }
            } else {
              for (j = ecc; j < ecc + eccLength; j++) {
                stringBuffer[j] = stringBuffer[j + 1];
              }
            }
            stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois_1.EXPONENT[Frame._modN(bit + polynomial[0])];
          }
        },
        _appendEccToData: function() {
          var i;
          var data = 0;
          var dataBlock = this._dataBlock;
          var ecc = this._calculateMaxLength();
          var eccBlock = this._eccBlock;
          for (i = 0; i < this._neccBlock1; i++) {
            this._appendData(data, dataBlock, ecc, eccBlock);
            data += dataBlock;
            ecc += eccBlock;
          }
          for (i = 0; i < this._neccBlock2; i++) {
            this._appendData(data, dataBlock + 1, ecc, eccBlock);
            data += dataBlock + 1;
            ecc += eccBlock;
          }
        },
        _applyMask: function(mask) {
          var r3x, r3y, x, y;
          var buffer = this.buffer;
          var width2 = this.width;
          switch (mask) {
            case 0:
              for (y = 0; y < width2; y++) {
                for (x = 0; x < width2; x++) {
                  if (!(x + y & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 1:
              for (y = 0; y < width2; y++) {
                for (x = 0; x < width2; x++) {
                  if (!(y & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 2:
              for (y = 0; y < width2; y++) {
                for (r3x = 0, x = 0; x < width2; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!r3x && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 3:
              for (r3y = 0, y = 0; y < width2; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = r3y, x = 0; x < width2; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!r3x && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 4:
              for (y = 0; y < width2; y++) {
                for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width2; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                    r3y = !r3y;
                  }
                  if (!r3y && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 5:
              for (r3y = 0, y = 0; y < width2; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = 0, x = 0; x < width2; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 6:
              for (r3y = 0, y = 0; y < width2; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = 0, x = 0; x < width2; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
            case 7:
              for (r3y = 0, y = 0; y < width2; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = 0, x = 0; x < width2; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width2] ^= 1;
                  }
                }
              }
              break;
          }
        },
        _calculateMaxLength: function() {
          return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
        },
        _calculatePolynomial: function() {
          var i, j;
          var eccBlock = this._eccBlock;
          var polynomial = this._polynomial;
          polynomial[0] = 1;
          for (i = 0; i < eccBlock; i++) {
            polynomial[i + 1] = 1;
            for (j = i; j > 0; j--) {
              polynomial[j] = polynomial[j] ? polynomial[j - 1] ^ Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[j]] + i)] : polynomial[j - 1];
            }
            polynomial[0] = Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[0]] + i)];
          }
          for (i = 0; i <= eccBlock; i++) {
            polynomial[i] = Galois_1.LOG[polynomial[i]];
          }
        },
        _checkBadness: function() {
          var b, b1, h3, x, y;
          var bad = 0;
          var badness = this._badness;
          var buffer = this.buffer;
          var width2 = this.width;
          for (y = 0; y < width2 - 1; y++) {
            for (x = 0; x < width2 - 1; x++) {
              if (buffer[x + width2 * y] && buffer[x + 1 + width2 * y] && buffer[x + width2 * (y + 1)] && buffer[x + 1 + width2 * (y + 1)] || !(buffer[x + width2 * y] || buffer[x + 1 + width2 * y] || buffer[x + width2 * (y + 1)] || buffer[x + 1 + width2 * (y + 1)])) {
                bad += Frame.N2;
              }
            }
          }
          var bw = 0;
          for (y = 0; y < width2; y++) {
            h3 = 0;
            badness[0] = 0;
            for (b = 0, x = 0; x < width2; x++) {
              b1 = buffer[x + width2 * y];
              if (b === b1) {
                badness[h3]++;
              } else {
                badness[++h3] = 1;
              }
              b = b1;
              bw += b ? 1 : -1;
            }
            bad += this._getBadness(h3);
          }
          if (bw < 0) {
            bw = -bw;
          }
          var count = 0;
          var big = bw;
          big += big << 2;
          big <<= 1;
          while (big > width2 * width2) {
            big -= width2 * width2;
            count++;
          }
          bad += count * Frame.N4;
          for (x = 0; x < width2; x++) {
            h3 = 0;
            badness[0] = 0;
            for (b = 0, y = 0; y < width2; y++) {
              b1 = buffer[x + width2 * y];
              if (b === b1) {
                badness[h3]++;
              } else {
                badness[++h3] = 1;
              }
              b = b1;
            }
            bad += this._getBadness(h3);
          }
          return bad;
        },
        _convertBitStream: function(length) {
          var bit, i;
          var ecc = this._ecc;
          var version = this._version;
          for (i = 0; i < length; i++) {
            ecc[i] = this._value.charCodeAt(i);
          }
          var stringBuffer = this._stringBuffer = ecc.slice();
          var maxLength = this._calculateMaxLength();
          if (length >= maxLength - 2) {
            length = maxLength - 2;
            if (version > 9) {
              length--;
            }
          }
          var index2 = length;
          if (version > 9) {
            stringBuffer[index2 + 2] = 0;
            stringBuffer[index2 + 3] = 0;
            while (index2--) {
              bit = stringBuffer[index2];
              stringBuffer[index2 + 3] |= 255 & bit << 4;
              stringBuffer[index2 + 2] = bit >> 4;
            }
            stringBuffer[2] |= 255 & length << 4;
            stringBuffer[1] = length >> 4;
            stringBuffer[0] = 64 | length >> 12;
          } else {
            stringBuffer[index2 + 1] = 0;
            stringBuffer[index2 + 2] = 0;
            while (index2--) {
              bit = stringBuffer[index2];
              stringBuffer[index2 + 2] |= 255 & bit << 4;
              stringBuffer[index2 + 1] = bit >> 4;
            }
            stringBuffer[1] |= 255 & length << 4;
            stringBuffer[0] = 64 | length >> 4;
          }
          index2 = length + 3 - (version < 10);
          while (index2 < maxLength) {
            stringBuffer[index2++] = 236;
            stringBuffer[index2++] = 17;
          }
        },
        _getBadness: function(length) {
          var i;
          var badRuns = 0;
          var badness = this._badness;
          for (i = 0; i <= length; i++) {
            if (badness[i] >= 5) {
              badRuns += Frame.N1 + badness[i] - 5;
            }
          }
          for (i = 3; i < length - 1; i += 2) {
            if (badness[i - 2] === badness[i + 2] && badness[i + 2] === badness[i - 1] && badness[i - 1] === badness[i + 1] && badness[i - 1] * 3 === badness[i] && (badness[i - 3] === 0 || i + 3 > length || badness[i - 3] * 3 >= badness[i] * 4 || badness[i + 3] * 3 >= badness[i] * 4)) {
              badRuns += Frame.N3;
            }
          }
          return badRuns;
        },
        _finish: function() {
          this._stringBuffer = this.buffer.slice();
          var currentMask, i;
          var bit = 0;
          var mask = 3e4;
          for (i = 0; i < 8; i++) {
            this._applyMask(i);
            currentMask = this._checkBadness();
            if (currentMask < mask) {
              mask = currentMask;
              bit = i;
            }
            if (bit === 7) {
              break;
            }
            this.buffer = this._stringBuffer.slice();
          }
          if (bit !== i) {
            this._applyMask(bit);
          }
          mask = ErrorCorrection_1.FINAL_FORMAT[bit + (this._level - 1 << 3)];
          var buffer = this.buffer;
          var width2 = this.width;
          for (i = 0; i < 8; i++, mask >>= 1) {
            if (mask & 1) {
              buffer[width2 - 1 - i + width2 * 8] = 1;
              if (i < 6) {
                buffer[8 + width2 * i] = 1;
              } else {
                buffer[8 + width2 * (i + 1)] = 1;
              }
            }
          }
          for (i = 0; i < 7; i++, mask >>= 1) {
            if (mask & 1) {
              buffer[8 + width2 * (width2 - 7 + i)] = 1;
              if (i) {
                buffer[6 - i + width2 * 8] = 1;
              } else {
                buffer[7 + width2 * 8] = 1;
              }
            }
          }
        },
        _interleaveBlocks: function() {
          var i, j;
          var dataBlock = this._dataBlock;
          var ecc = this._ecc;
          var eccBlock = this._eccBlock;
          var k = 0;
          var maxLength = this._calculateMaxLength();
          var neccBlock1 = this._neccBlock1;
          var neccBlock2 = this._neccBlock2;
          var stringBuffer = this._stringBuffer;
          for (i = 0; i < dataBlock; i++) {
            for (j = 0; j < neccBlock1; j++) {
              ecc[k++] = stringBuffer[i + j * dataBlock];
            }
            for (j = 0; j < neccBlock2; j++) {
              ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
            }
          }
          for (j = 0; j < neccBlock2; j++) {
            ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
          }
          for (i = 0; i < eccBlock; i++) {
            for (j = 0; j < neccBlock1 + neccBlock2; j++) {
              ecc[k++] = stringBuffer[maxLength + i + j * eccBlock];
            }
          }
          this._stringBuffer = ecc;
        },
        _insertAlignments: function() {
          var i, x, y;
          var version = this._version;
          var width2 = this.width;
          if (version > 1) {
            i = Alignment_1.BLOCK[version];
            y = width2 - 7;
            for (; ; ) {
              x = width2 - 7;
              while (x > i - 3) {
                this._addAlignment(x, y);
                if (x < i) {
                  break;
                }
                x -= i;
              }
              if (y <= i + 9) {
                break;
              }
              y -= i;
              this._addAlignment(6, y);
              this._addAlignment(y, 6);
            }
          }
        },
        _insertFinders: function() {
          var i, j, x, y;
          var buffer = this.buffer;
          var width2 = this.width;
          for (i = 0; i < 3; i++) {
            j = 0;
            y = 0;
            if (i === 1) {
              j = width2 - 7;
            }
            if (i === 2) {
              y = width2 - 7;
            }
            buffer[y + 3 + width2 * (j + 3)] = 1;
            for (x = 0; x < 6; x++) {
              buffer[y + x + width2 * j] = 1;
              buffer[y + width2 * (j + x + 1)] = 1;
              buffer[y + 6 + width2 * (j + x)] = 1;
              buffer[y + x + 1 + width2 * (j + 6)] = 1;
            }
            for (x = 1; x < 5; x++) {
              this._setMask(y + x, j + 1);
              this._setMask(y + 1, j + x + 1);
              this._setMask(y + 5, j + x);
              this._setMask(y + x + 1, j + 5);
            }
            for (x = 2; x < 4; x++) {
              buffer[y + x + width2 * (j + 2)] = 1;
              buffer[y + 2 + width2 * (j + x + 1)] = 1;
              buffer[y + 4 + width2 * (j + x)] = 1;
              buffer[y + x + 1 + width2 * (j + 4)] = 1;
            }
          }
        },
        _insertTimingGap: function() {
          var x, y;
          var width2 = this.width;
          for (y = 0; y < 7; y++) {
            this._setMask(7, y);
            this._setMask(width2 - 8, y);
            this._setMask(7, y + width2 - 7);
          }
          for (x = 0; x < 8; x++) {
            this._setMask(x, 7);
            this._setMask(x + width2 - 8, 7);
            this._setMask(x, width2 - 8);
          }
        },
        _insertTimingRowAndColumn: function() {
          var x;
          var buffer = this.buffer;
          var width2 = this.width;
          for (x = 0; x < width2 - 14; x++) {
            if (x & 1) {
              this._setMask(8 + x, 6);
              this._setMask(6, 8 + x);
            } else {
              buffer[8 + x + width2 * 6] = 1;
              buffer[6 + width2 * (8 + x)] = 1;
            }
          }
        },
        _insertVersion: function() {
          var i, j, x, y;
          var buffer = this.buffer;
          var version = this._version;
          var width2 = this.width;
          if (version > 6) {
            i = Version_1.BLOCK[version - 7];
            j = 17;
            for (x = 0; x < 6; x++) {
              for (y = 0; y < 3; y++, j--) {
                if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
                  buffer[5 - x + width2 * (2 - y + width2 - 11)] = 1;
                  buffer[2 - y + width2 - 11 + width2 * (5 - x)] = 1;
                } else {
                  this._setMask(5 - x, 2 - y + width2 - 11);
                  this._setMask(2 - y + width2 - 11, 5 - x);
                }
              }
            }
          }
        },
        _isMasked: function(x, y) {
          var bit = Frame._getMaskBit(x, y);
          return this._mask[bit] === 1;
        },
        _pack: function() {
          var bit, i, j;
          var k = 1;
          var v = 1;
          var width2 = this.width;
          var x = width2 - 1;
          var y = width2 - 1;
          var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
          for (i = 0; i < length; i++) {
            bit = this._stringBuffer[i];
            for (j = 0; j < 8; j++, bit <<= 1) {
              if (128 & bit) {
                this.buffer[x + width2 * y] = 1;
              }
              do {
                if (v) {
                  x--;
                } else {
                  x++;
                  if (k) {
                    if (y !== 0) {
                      y--;
                    } else {
                      x -= 2;
                      k = !k;
                      if (x === 6) {
                        x--;
                        y = 9;
                      }
                    }
                  } else if (y !== width2 - 1) {
                    y++;
                  } else {
                    x -= 2;
                    k = !k;
                    if (x === 6) {
                      x--;
                      y -= 8;
                    }
                  }
                }
                v = !v;
              } while (this._isMasked(x, y));
            }
          }
        },
        _reverseMask: function() {
          var x, y;
          var width2 = this.width;
          for (x = 0; x < 9; x++) {
            this._setMask(x, 8);
          }
          for (x = 0; x < 8; x++) {
            this._setMask(x + width2 - 8, 8);
            this._setMask(8, x);
          }
          for (y = 0; y < 7; y++) {
            this._setMask(8, y + width2 - 7);
          }
        },
        _setMask: function(x, y) {
          var bit = Frame._getMaskBit(x, y);
          this._mask[bit] = 1;
        },
        _syncMask: function() {
          var x, y;
          var width2 = this.width;
          for (y = 0; y < width2; y++) {
            for (x = 0; x <= y; x++) {
              if (this.buffer[x + width2 * y]) {
                this._setMask(x, y);
              }
            }
          }
        }
      }, {
        _createArray: function(length) {
          var i;
          var array = [];
          for (i = 0; i < length; i++) {
            array[i] = 0;
          }
          return array;
        },
        _getMaskBit: function(x, y) {
          var bit;
          if (x > y) {
            bit = x;
            x = y;
            y = bit;
          }
          bit = y;
          bit += y * y;
          bit >>= 1;
          bit += x;
          return bit;
        },
        _modN: function(x) {
          while (x >= 255) {
            x -= 255;
            x = (x >> 8) + (x & 255);
          }
          return x;
        },
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      });
      var Frame_1 = Frame;
      var ImageRenderer = Renderer_1.extend({
        draw: function() {
          this.element.src = this.qrious.toDataURL();
        },
        reset: function() {
          this.element.src = "";
        },
        resize: function() {
          var element = this.element;
          element.width = element.height = this.qrious.size;
        }
      });
      var ImageRenderer_1 = ImageRenderer;
      var Option = lite.extend(function(name, modifiable, defaultValue, valueTransformer) {
        this.name = name;
        this.modifiable = Boolean(modifiable);
        this.defaultValue = defaultValue;
        this._valueTransformer = valueTransformer;
      }, {
        transform: function(value) {
          var transformer = this._valueTransformer;
          if (typeof transformer === "function") {
            return transformer(value, this);
          }
          return value;
        }
      });
      var Option_1 = Option;
      var Utilities = lite.extend(null, {
        abs: function(value) {
          return value != null ? Math.abs(value) : null;
        },
        hasOwn: function(object, name) {
          return Object.prototype.hasOwnProperty.call(object, name);
        },
        noop: function() {
        },
        toUpperCase: function(string) {
          return string != null ? string.toUpperCase() : null;
        }
      });
      var Utilities_1 = Utilities;
      var OptionManager = lite.extend(function(options) {
        this.options = {};
        options.forEach(function(option) {
          this.options[option.name] = option;
        }, this);
      }, {
        exists: function(name) {
          return this.options[name] != null;
        },
        get: function(name, target) {
          return OptionManager._get(this.options[name], target);
        },
        getAll: function(target) {
          var name;
          var options = this.options;
          var result = {};
          for (name in options) {
            if (Utilities_1.hasOwn(options, name)) {
              result[name] = OptionManager._get(options[name], target);
            }
          }
          return result;
        },
        init: function(options, target, changeHandler) {
          if (typeof changeHandler !== "function") {
            changeHandler = Utilities_1.noop;
          }
          var name, option;
          for (name in this.options) {
            if (Utilities_1.hasOwn(this.options, name)) {
              option = this.options[name];
              OptionManager._set(option, option.defaultValue, target);
              OptionManager._createAccessor(option, target, changeHandler);
            }
          }
          this._setAll(options, target, true);
        },
        set: function(name, value, target) {
          return this._set(name, value, target);
        },
        setAll: function(options, target) {
          return this._setAll(options, target);
        },
        _set: function(name, value, target, allowUnmodifiable) {
          var option = this.options[name];
          if (!option) {
            throw new Error("Invalid option: " + name);
          }
          if (!option.modifiable && !allowUnmodifiable) {
            throw new Error("Option cannot be modified: " + name);
          }
          return OptionManager._set(option, value, target);
        },
        _setAll: function(options, target, allowUnmodifiable) {
          if (!options) {
            return false;
          }
          var name;
          var changed = false;
          for (name in options) {
            if (Utilities_1.hasOwn(options, name) && this._set(name, options[name], target, allowUnmodifiable)) {
              changed = true;
            }
          }
          return changed;
        }
      }, {
        _createAccessor: function(option, target, changeHandler) {
          var descriptor = {
            get: function() {
              return OptionManager._get(option, target);
            }
          };
          if (option.modifiable) {
            descriptor.set = function(value) {
              if (OptionManager._set(option, value, target)) {
                changeHandler(value, option);
              }
            };
          }
          Object.defineProperty(target, option.name, descriptor);
        },
        _get: function(option, target) {
          return target["_" + option.name];
        },
        _set: function(option, value, target) {
          var fieldName = "_" + option.name;
          var oldValue = target[fieldName];
          var newValue = option.transform(value != null ? value : option.defaultValue);
          target[fieldName] = newValue;
          return newValue !== oldValue;
        }
      });
      var OptionManager_1 = OptionManager;
      var ServiceManager = lite.extend(function() {
        this._services = {};
      }, {
        getService: function(name) {
          var service = this._services[name];
          if (!service) {
            throw new Error("Service is not being managed with name: " + name);
          }
          return service;
        },
        setService: function(name, service) {
          if (this._services[name]) {
            throw new Error("Service is already managed with name: " + name);
          }
          if (service) {
            this._services[name] = service;
          }
        }
      });
      var ServiceManager_1 = ServiceManager;
      var optionManager = new OptionManager_1([
        new Option_1("background", true, "white"),
        new Option_1("backgroundAlpha", true, 1, Utilities_1.abs),
        new Option_1("element"),
        new Option_1("foreground", true, "black"),
        new Option_1("foregroundAlpha", true, 1, Utilities_1.abs),
        new Option_1("level", true, "L", Utilities_1.toUpperCase),
        new Option_1("mime", true, "image/png"),
        new Option_1("padding", true, null, Utilities_1.abs),
        new Option_1("size", true, 100, Utilities_1.abs),
        new Option_1("value", true, "")
      ]);
      var serviceManager = new ServiceManager_1();
      var QRious3 = lite.extend(function(options) {
        optionManager.init(options, this, this.update.bind(this));
        var element = optionManager.get("element", this);
        var elementService = serviceManager.getService("element");
        var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
        var image = element && elementService.isImage(element) ? element : elementService.createImage();
        this._canvasRenderer = new CanvasRenderer_1(this, canvas, true);
        this._imageRenderer = new ImageRenderer_1(this, image, image === element);
        this.update();
      }, {
        get: function() {
          return optionManager.getAll(this);
        },
        set: function(options) {
          if (optionManager.setAll(options, this)) {
            this.update();
          }
        },
        toDataURL: function(mime) {
          return this.canvas.toDataURL(mime || this.mime);
        },
        update: function() {
          var frame = new Frame_1({
            level: this.level,
            value: this.value
          });
          this._canvasRenderer.render(frame);
          this._imageRenderer.render(frame);
        }
      }, {
        use: function(service) {
          serviceManager.setService(service.getName(), service);
        }
      });
      Object.defineProperties(QRious3.prototype, {
        canvas: {
          get: function() {
            return this._canvasRenderer.getElement();
          }
        },
        image: {
          get: function() {
            return this._imageRenderer.getElement();
          }
        }
      });
      var QRious_1$2 = QRious3;
      var index = QRious_1$2;
      var Service = lite.extend({
        getName: function() {
        }
      });
      var Service_1 = Service;
      var ElementService = Service_1.extend({
        createCanvas: function() {
        },
        createImage: function() {
        },
        getName: function() {
          return "element";
        },
        isCanvas: function(element) {
        },
        isImage: function(element) {
        }
      });
      var ElementService_1 = ElementService;
      var BrowserElementService = ElementService_1.extend({
        createCanvas: function() {
          return document.createElement("canvas");
        },
        createImage: function() {
          return document.createElement("img");
        },
        isCanvas: function(element) {
          return element instanceof HTMLCanvasElement;
        },
        isImage: function(element) {
          return element instanceof HTMLImageElement;
        }
      });
      var BrowserElementService_1 = BrowserElementService;
      index.use(new BrowserElementService_1());
      var QRious_1 = index;
      return QRious_1;
    });
  }
});

// node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_define_process();
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        __name(isValidElementType, "isValidElementType");
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        __name(typeOf, "typeOf");
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef2 = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo2 = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        __name(isAsyncMode, "isAsyncMode");
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        __name(isConcurrentMode, "isConcurrentMode");
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        __name(isContextConsumer, "isContextConsumer");
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        __name(isContextProvider, "isContextProvider");
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        __name(isElement, "isElement");
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        __name(isForwardRef, "isForwardRef");
        function isFragment2(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        __name(isFragment2, "isFragment");
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        __name(isLazy, "isLazy");
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        __name(isMemo, "isMemo");
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        __name(isPortal, "isPortal");
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        __name(isProfiler, "isProfiler");
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        __name(isStrictMode, "isStrictMode");
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        __name(isSuspense, "isSuspense");
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef2;
        exports.Fragment = Fragment2;
        exports.Lazy = Lazy;
        exports.Memo = Memo2;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment2;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/prop-types/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/prop-types/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    __name(toObject, "toObject");
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    __name(shouldUseNative, "shouldUseNative");
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    init_define_process();
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    init_define_process();
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    init_define_process();
    var printWarning = /* @__PURE__ */ __name(function() {
    }, "printWarning");
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = /* @__PURE__ */ __name(function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      }, "printWarning");
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values3, location2, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values3, typeSpecName, componentName, location2, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location2 + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location2 + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    __name(checkPropTypes, "checkPropTypes");
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    init_define_process();
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = /* @__PURE__ */ __name(function() {
    }, "printWarning");
    if (true) {
      printWarning = /* @__PURE__ */ __name(function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      }, "printWarning");
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    __name(emptyFunctionThatReturnsNull, "emptyFunctionThatReturnsNull");
    module.exports = function(isValidElement2, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      __name(getIteratorFn, "getIteratorFn");
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      __name(is, "is");
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      __name(PropTypeError, "PropTypeError");
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate2) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location2, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location2 + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate2(props, propName, componentName, location2, propFullName);
          }
        }
        __name(checkType, "checkType");
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      __name(createChainableTypeChecker, "createChainableTypeChecker");
      function createPrimitiveTypeChecker(expectedType) {
        function validate2(props, propName, componentName, location2, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createPrimitiveTypeChecker, "createPrimitiveTypeChecker");
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      __name(createAnyTypeChecker, "createAnyTypeChecker");
      function createArrayOfTypeChecker(typeChecker) {
        function validate2(props, propName, componentName, location2, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location2, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createArrayOfTypeChecker, "createArrayOfTypeChecker");
      function createElementTypeChecker() {
        function validate2(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          if (!isValidElement2(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createElementTypeChecker, "createElementTypeChecker");
      function createElementTypeTypeChecker() {
        function validate2(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createElementTypeTypeChecker, "createElementTypeTypeChecker");
      function createInstanceTypeChecker(expectedClass) {
        function validate2(props, propName, componentName, location2, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createInstanceTypeChecker, "createInstanceTypeChecker");
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate2(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, /* @__PURE__ */ __name(function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          }, "replacer"));
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createEnumTypeChecker, "createEnumTypeChecker");
      function createObjectOfTypeChecker(typeChecker) {
        function validate2(props, propName, componentName, location2, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createObjectOfTypeChecker, "createObjectOfTypeChecker");
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate2(props, propName, componentName, location2, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location2, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createUnionTypeChecker, "createUnionTypeChecker");
      function createNodeChecker() {
        function validate2(props, propName, componentName, location2, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createNodeChecker, "createNodeChecker");
      function invalidValidatorError(componentName, location2, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location2 + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      __name(invalidValidatorError, "invalidValidatorError");
      function createShapeTypeChecker(shapeTypes) {
        function validate2(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createShapeTypeChecker, "createShapeTypeChecker");
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate2(props, propName, componentName, location2, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location2 + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location2, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location2 + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location2, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        __name(validate2, "validate");
        return createChainableTypeChecker(validate2);
      }
      __name(createStrictShapeTypeChecker, "createStrictShapeTypeChecker");
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement2(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      __name(isNode, "isNode");
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      __name(isSymbol, "isSymbol");
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      __name(getPropType, "getPropType");
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      __name(getPreciseType, "getPreciseType");
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      __name(getPostfixForTypeWarning, "getPostfixForTypeWarning");
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      __name(getClassName, "getClassName");
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    init_define_process();
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development2 = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    init_define_process();
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        __name(isValidElementType, "isValidElementType");
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        __name(typeOf, "typeOf");
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef2 = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo2 = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        __name(isAsyncMode, "isAsyncMode");
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        __name(isConcurrentMode, "isConcurrentMode");
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        __name(isContextConsumer, "isContextConsumer");
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        __name(isContextProvider, "isContextProvider");
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        __name(isElement, "isElement");
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        __name(isForwardRef, "isForwardRef");
        function isFragment2(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        __name(isFragment2, "isFragment");
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        __name(isLazy, "isLazy");
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        __name(isMemo, "isMemo");
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        __name(isPortal, "isPortal");
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        __name(isProfiler, "isProfiler");
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        __name(isStrictMode, "isStrictMode");
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        __name(isSuspense, "isSuspense");
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        __name(isSuspenseList, "isSuspenseList");
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef2;
        exports.Fragment = Fragment2;
        exports.Lazy = Lazy;
        exports.Memo = Memo2;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment2;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is2 = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development2();
    }
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.dev.js
var require_emotion_is_prop_valid_cjs_dev = __commonJS({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.dev.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var memoize2 = require_emotion_memoize_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    __name(_interopDefault, "_interopDefault");
    var memoize__default = /* @__PURE__ */ _interopDefault(memoize2);
    var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    var isPropValid = /* @__PURE__ */ memoize__default["default"](
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
    );
    exports.default = isPropValid;
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.js
var require_emotion_is_prop_valid_cjs = __commonJS({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_is_prop_valid_cjs_dev();
    }
  }
});

// node_modules/@emotion/styled/base/dist/emotion-styled-base.cjs.dev.js
var require_emotion_styled_base_cjs_dev = __commonJS({
  "node_modules/@emotion/styled/base/dist/emotion-styled-base.cjs.dev.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    var _extends2 = require_extends();
    var React = (init_react_preact(), __toCommonJS(react_preact_exports));
    var isPropValid = require_emotion_is_prop_valid_cjs();
    var react = require_emotion_react_cjs();
    var utils = require_emotion_utils_cjs();
    var serialize = require_emotion_serialize_cjs();
    var useInsertionEffectWithFallbacks = require_emotion_use_insertion_effect_with_fallbacks_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    __name(_interopDefault, "_interopDefault");
    var isPropValid__default = /* @__PURE__ */ _interopDefault(isPropValid);
    var testOmitPropsOnStringTag = isPropValid__default["default"];
    var testOmitPropsOnComponent = /* @__PURE__ */ __name(function testOmitPropsOnComponent2(key) {
      return key !== "theme";
    }, "testOmitPropsOnComponent");
    var getDefaultShouldForwardProp = /* @__PURE__ */ __name(function getDefaultShouldForwardProp2(tag) {
      return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
    }, "getDefaultShouldForwardProp");
    var composeShouldForwardProps = /* @__PURE__ */ __name(function composeShouldForwardProps2(tag, options, isReal) {
      var shouldForwardProp2;
      if (options) {
        var optionsShouldForwardProp = options.shouldForwardProp;
        shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
          return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
        } : optionsShouldForwardProp;
      }
      if (typeof shouldForwardProp2 !== "function" && isReal) {
        shouldForwardProp2 = tag.__emotion_forwardProp;
      }
      return shouldForwardProp2;
    }, "composeShouldForwardProps");
    var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    var isBrowser = typeof document !== "undefined";
    var Insertion = /* @__PURE__ */ __name(function Insertion2(_ref) {
      var cache = _ref.cache, serialized = _ref.serialized, isStringTag2 = _ref.isStringTag;
      utils.registerStyles(cache, serialized, isStringTag2);
      var rules = useInsertionEffectWithFallbacks.useInsertionEffectAlwaysWithSyncFallback(function() {
        return utils.insertStyles(cache, serialized, isStringTag2);
      });
      if (!isBrowser && rules !== void 0) {
        var _ref2;
        var serializedNames = serialized.name;
        var next = serialized.next;
        while (next !== void 0) {
          serializedNames += " " + next.name;
          next = next.next;
        }
        return /* @__PURE__ */ React.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref2.nonce = cache.sheet.nonce, _ref2));
      }
      return null;
    }, "Insertion");
    var createStyled2 = /* @__PURE__ */ __name(function createStyled3(tag, options) {
      if (true) {
        if (tag === void 0) {
          throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
        }
      }
      var isReal = tag.__emotion_real === tag;
      var baseTag = isReal && tag.__emotion_base || tag;
      var identifierName;
      var targetClassName;
      if (options !== void 0) {
        identifierName = options.label;
        targetClassName = options.target;
      }
      var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
      var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
      var shouldUseAs = !defaultShouldForwardProp("as");
      return function() {
        var args = arguments;
        var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
        if (identifierName !== void 0) {
          styles.push("label:" + identifierName + ";");
        }
        if (args[0] == null || args[0].raw === void 0) {
          styles.push.apply(styles, args);
        } else {
          if (args[0][0] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles.push(args[0][0]);
          var len = args.length;
          var i = 1;
          for (; i < len; i++) {
            if (args[0][i] === void 0) {
              console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
            }
            styles.push(args[i], args[0][i]);
          }
        }
        var Styled = react.withEmotionCache(function(props, cache, ref) {
          var FinalTag = shouldUseAs && props.as || baseTag;
          var className = "";
          var classInterpolations = [];
          var mergedProps = props;
          if (props.theme == null) {
            mergedProps = {};
            for (var key in props) {
              mergedProps[key] = props[key];
            }
            mergedProps.theme = React.useContext(react.ThemeContext);
          }
          if (typeof props.className === "string") {
            className = utils.getRegisteredStyles(cache.registered, classInterpolations, props.className);
          } else if (props.className != null) {
            className = props.className + " ";
          }
          var serialized = serialize.serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
          className += cache.key + "-" + serialized.name;
          if (targetClassName !== void 0) {
            className += " " + targetClassName;
          }
          var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
          var newProps = {};
          for (var _key in props) {
            if (shouldUseAs && _key === "as")
              continue;
            if (finalShouldForwardProp(_key)) {
              newProps[_key] = props[_key];
            }
          }
          newProps.className = className;
          newProps.ref = ref;
          return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Insertion, {
            cache,
            serialized,
            isStringTag: typeof FinalTag === "string"
          }), /* @__PURE__ */ React.createElement(FinalTag, newProps));
        });
        Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
        Styled.defaultProps = tag.defaultProps;
        Styled.__emotion_real = Styled;
        Styled.__emotion_base = baseTag;
        Styled.__emotion_styles = styles;
        Styled.__emotion_forwardProp = shouldForwardProp2;
        Object.defineProperty(Styled, "toString", {
          value: /* @__PURE__ */ __name(function value() {
            if (targetClassName === void 0 && true) {
              return "NO_COMPONENT_SELECTOR";
            }
            return "." + targetClassName;
          }, "value")
        });
        Styled.withComponent = function(nextTag, nextOptions) {
          return createStyled3(nextTag, _extends2({}, options, nextOptions, {
            shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
          })).apply(void 0, styles);
        };
        return Styled;
      };
    }, "createStyled");
    exports.default = createStyled2;
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.cjs.dev.js
var require_emotion_styled_cjs_dev = __commonJS({
  "node_modules/@emotion/styled/dist/emotion-styled.cjs.dev.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", { value: true });
    require_extends();
    init_react_preact();
    require_emotion_is_prop_valid_cjs();
    var base_dist_emotionStyledBase = require_emotion_styled_base_cjs_dev();
    require_emotion_react_cjs();
    require_emotion_utils_cjs();
    require_emotion_serialize_cjs();
    require_emotion_use_insertion_effect_with_fallbacks_cjs();
    var tags = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan"
    ];
    var newStyled = base_dist_emotionStyledBase["default"].bind();
    tags.forEach(function(tagName) {
      newStyled[tagName] = newStyled(tagName);
    });
    exports.default = newStyled;
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.cjs.js
var require_emotion_styled_cjs = __commonJS({
  "node_modules/@emotion/styled/dist/emotion-styled.cjs.js"(exports, module) {
    "use strict";
    init_define_process();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_styled_cjs_dev();
    }
  }
});

// node_modules/lodash.debounce/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.debounce/index.js"(exports, module) {
    init_define_process();
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof globalThis == "object" && globalThis && globalThis.Object === Object && globalThis;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = /* @__PURE__ */ __name(function() {
      return root.Date.now();
    }, "now");
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      __name(invokeFunc, "invokeFunc");
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      __name(leadingEdge, "leadingEdge");
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      __name(remainingWait, "remainingWait");
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      __name(shouldInvoke, "shouldInvoke");
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      __name(timerExpired, "timerExpired");
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      __name(trailingEdge, "trailingEdge");
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      __name(cancel, "cancel");
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      __name(flush, "flush");
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      __name(debounced, "debounced");
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    __name(debounce2, "debounce");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    module.exports = debounce2;
  }
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    init_define_process();
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    __name(getLens, "getLens");
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    __name(byteLength, "byteLength");
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    __name(_byteLength, "_byteLength");
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    __name(toByteArray, "toByteArray");
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    __name(tripletToBase64, "tripletToBase64");
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    __name(encodeChunk, "encodeChunk");
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
    __name(fromByteArray, "fromByteArray");
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    init_define_process();
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m2;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m2 = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m2 = m2 * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m2 ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m2 = m2 + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m2 * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m2, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m2 = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m2 = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m2 = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m2 & 255, i += d, m2 /= 256, mLen -= 8) {
      }
      e = e << mLen | m2;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    init_define_process();
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    __name(typedArraySupport, "typedArraySupport");
    Object.defineProperty(Buffer.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer.prototype);
      return buf;
    }
    __name(createBuffer, "createBuffer");
    function Buffer(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    __name(Buffer, "Buffer");
    Buffer.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    __name(from, "from");
    Buffer.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    __name(assertSize, "assertSize");
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    __name(alloc, "alloc");
    Buffer.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    __name(allocUnsafe, "allocUnsafe");
    Buffer.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    __name(fromString, "fromString");
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    __name(fromArrayLike, "fromArrayLike");
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    __name(fromArrayView, "fromArrayView");
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer.prototype);
      return buf;
    }
    __name(fromArrayBuffer, "fromArrayBuffer");
    function fromObject(obj) {
      if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    __name(fromObject, "fromObject");
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    __name(checked, "checked");
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer.alloc(+length);
    }
    __name(SlowBuffer, "SlowBuffer");
    Buffer.isBuffer = /* @__PURE__ */ __name(function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer.prototype;
    }, "isBuffer");
    Buffer.compare = /* @__PURE__ */ __name(function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer.from(b, b.offset, b.byteLength);
      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    }, "compare");
    Buffer.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    }, "isEncoding");
    Buffer.concat = /* @__PURE__ */ __name(function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer.isBuffer(buf))
              buf = Buffer.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    }, "concat");
    function byteLength(string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    __name(byteLength, "byteLength");
    Buffer.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    __name(slowToString, "slowToString");
    Buffer.prototype._isBuffer = true;
    function swap(b, n, m2) {
      const i = b[n];
      b[n] = b[m2];
      b[m2] = i;
    }
    __name(swap, "swap");
    Buffer.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    }, "swap16");
    Buffer.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    }, "swap32");
    Buffer.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    }, "swap64");
    Buffer.prototype.toString = /* @__PURE__ */ __name(function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    }, "toString");
    Buffer.prototype.toLocaleString = Buffer.prototype.toString;
    Buffer.prototype.equals = /* @__PURE__ */ __name(function equals(b) {
      if (!Buffer.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer.compare(this, b) === 0;
    }, "equals");
    Buffer.prototype.inspect = /* @__PURE__ */ __name(function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    }, "inspect");
    if (customInspectSymbol) {
      Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
    }
    Buffer.prototype.compare = /* @__PURE__ */ __name(function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
      }
      if (!Buffer.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    }, "compare");
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer.from(val, encoding);
      }
      if (Buffer.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    __name(bidirectionalIndexOf, "bidirectionalIndexOf");
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      __name(read, "read");
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    __name(arrayIndexOf, "arrayIndexOf");
    Buffer.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    }, "includes");
    Buffer.prototype.indexOf = /* @__PURE__ */ __name(function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    }, "indexOf");
    Buffer.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    }, "lastIndexOf");
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    __name(hexWrite, "hexWrite");
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    __name(utf8Write, "utf8Write");
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    __name(asciiWrite, "asciiWrite");
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    __name(base64Write, "base64Write");
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    __name(ucs2Write, "ucs2Write");
    Buffer.prototype.write = /* @__PURE__ */ __name(function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }, "write");
    Buffer.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    }, "toJSON");
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    __name(base64Slice, "base64Slice");
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    __name(utf8Slice, "utf8Slice");
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    __name(decodeCodePointsArray, "decodeCodePointsArray");
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    __name(asciiSlice, "asciiSlice");
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    __name(latin1Slice, "latin1Slice");
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    __name(hexSlice, "hexSlice");
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    __name(utf16leSlice, "utf16leSlice");
    Buffer.prototype.slice = /* @__PURE__ */ __name(function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer.prototype);
      return newBuf;
    }, "slice");
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    __name(checkOffset, "checkOffset");
    Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    }, "readUIntLE");
    Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    }, "readUIntBE");
    Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    }, "readUInt8");
    Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    }, "readUInt16LE");
    Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    }, "readUInt16BE");
    Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    }, "readUInt32LE");
    Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    }, "readUInt32BE");
    Buffer.prototype.readBigUInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    }, "readBigUInt64LE"));
    Buffer.prototype.readBigUInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    }, "readBigUInt64BE"));
    Buffer.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntLE");
    Buffer.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntBE");
    Buffer.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    }, "readInt8");
    Buffer.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16LE");
    Buffer.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16BE");
    Buffer.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    }, "readInt32LE");
    Buffer.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    }, "readInt32BE");
    Buffer.prototype.readBigInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    }, "readBigInt64LE"));
    Buffer.prototype.readBigInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    }, "readBigInt64BE"));
    Buffer.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    }, "readFloatLE");
    Buffer.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    }, "readFloatBE");
    Buffer.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    }, "readDoubleLE");
    Buffer.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    }, "readDoubleBE");
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    __name(checkInt, "checkInt");
    Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntLE");
    Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntBE");
    Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    }, "writeUInt8");
    Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeUInt16LE");
    Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeUInt16BE");
    Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    }, "writeUInt32LE");
    Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    }, "writeUInt32BE");
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    __name(wrtBigUInt64LE, "wrtBigUInt64LE");
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    __name(wrtBigUInt64BE, "wrtBigUInt64BE");
    Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64LE"));
    Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64BE"));
    Buffer.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntLE");
    Buffer.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntBE");
    Buffer.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    }, "writeInt8");
    Buffer.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeInt16LE");
    Buffer.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeInt16BE");
    Buffer.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    }, "writeInt32LE");
    Buffer.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    }, "writeInt32BE");
    Buffer.prototype.writeBigInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64LE"));
    Buffer.prototype.writeBigInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64BE"));
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    __name(checkIEEE754, "checkIEEE754");
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    __name(writeFloat, "writeFloat");
    Buffer.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    }, "writeFloatLE");
    Buffer.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    }, "writeFloatBE");
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    __name(writeDouble, "writeDouble");
    Buffer.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    }, "writeDoubleLE");
    Buffer.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }, "writeDoubleBE");
    Buffer.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
      if (!Buffer.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    }, "copy");
    Buffer.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    }, "fill");
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = /* @__PURE__ */ __name(class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      }, "NodeError");
    }
    __name(E, "E");
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    __name(addNumericalSeparator, "addNumericalSeparator");
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    __name(checkBounds, "checkBounds");
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    __name(checkIntBI, "checkIntBI");
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    __name(validateNumber, "validateNumber");
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    __name(boundsError, "boundsError");
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    __name(base64clean, "base64clean");
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    __name(utf8ToBytes, "utf8ToBytes");
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    __name(asciiToBytes, "asciiToBytes");
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    __name(utf16leToBytes, "utf16leToBytes");
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    __name(base64ToBytes, "base64ToBytes");
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    __name(blitBuffer, "blitBuffer");
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    __name(isInstance, "isInstance");
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    __name(numberIsNaN, "numberIsNaN");
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    __name(defineBigIntMethod, "defineBigIntMethod");
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
    __name(BufferBigIntNotDefined, "BufferBigIntNotDefined");
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    init_define_process();
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : /* @__PURE__ */ __name(function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    }, "ReflectApply");
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = /* @__PURE__ */ __name(function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      }, "ReflectOwnKeys");
    } else {
      ReflectOwnKeys = /* @__PURE__ */ __name(function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      }, "ReflectOwnKeys");
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    __name(ProcessEmitWarning, "ProcessEmitWarning");
    var NumberIsNaN = Number.isNaN || /* @__PURE__ */ __name(function NumberIsNaN2(value) {
      return value !== value;
    }, "NumberIsNaN");
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    __name(EventEmitter, "EventEmitter");
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    __name(checkListener, "checkListener");
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = /* @__PURE__ */ __name(function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    }, "setMaxListeners");
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    __name(_getMaxListeners, "_getMaxListeners");
    EventEmitter.prototype.getMaxListeners = /* @__PURE__ */ __name(function getMaxListeners() {
      return _getMaxListeners(this);
    }, "getMaxListeners");
    EventEmitter.prototype.emit = /* @__PURE__ */ __name(function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    }, "emit");
    function _addListener(target, type, listener, prepend) {
      var m2;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m2 = _getMaxListeners(target);
        if (m2 > 0 && existing.length > m2 && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    __name(_addListener, "_addListener");
    EventEmitter.prototype.addListener = /* @__PURE__ */ __name(function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    }, "addListener");
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = /* @__PURE__ */ __name(function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    }, "prependListener");
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    __name(onceWrapper, "onceWrapper");
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    __name(_onceWrap, "_onceWrap");
    EventEmitter.prototype.once = /* @__PURE__ */ __name(function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    }, "once");
    EventEmitter.prototype.prependOnceListener = /* @__PURE__ */ __name(function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    }, "prependOnceListener");
    EventEmitter.prototype.removeListener = /* @__PURE__ */ __name(function removeListener(type, listener) {
      var list, events, position2, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position2 = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position2 = i;
            break;
          }
        }
        if (position2 < 0)
          return this;
        if (position2 === 0)
          list.shift();
        else {
          spliceOne(list, position2);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    }, "removeListener");
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = /* @__PURE__ */ __name(function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    }, "removeAllListeners");
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    __name(_listeners, "_listeners");
    EventEmitter.prototype.listeners = /* @__PURE__ */ __name(function listeners(type) {
      return _listeners(this, type, true);
    }, "listeners");
    EventEmitter.prototype.rawListeners = /* @__PURE__ */ __name(function rawListeners(type) {
      return _listeners(this, type, false);
    }, "rawListeners");
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    __name(listenerCount, "listenerCount");
    EventEmitter.prototype.eventNames = /* @__PURE__ */ __name(function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    }, "eventNames");
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    __name(arrayClone, "arrayClone");
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    __name(spliceOne, "spliceOne");
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    __name(unwrapListeners, "unwrapListeners");
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        __name(errorListener, "errorListener");
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        __name(resolver, "resolver");
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    __name(once, "once");
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    __name(addErrorHandlerIfEventEmitter, "addErrorHandlerIfEventEmitter");
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, /* @__PURE__ */ __name(function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        }, "wrapListener"));
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
    __name(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    init_define_process();
    if (typeof Object.create === "function") {
      module.exports = /* @__PURE__ */ __name(function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      }, "inherits");
    } else {
      module.exports = /* @__PURE__ */ __name(function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = /* @__PURE__ */ __name(function() {
          }, "TempCtor");
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      }, "inherits");
    }
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/stream-browser.js
var require_stream_browser = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/stream-browser.js"(exports, module) {
    init_define_process();
    module.exports = require_events().EventEmitter;
  }
});

// (disabled):util
var require_util = __commonJS({
  "(disabled):util"() {
    init_define_process();
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
    "use strict";
    init_define_process();
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
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
    var _require = require_buffer();
    var Buffer = _require.Buffer;
    var _require2 = require_util();
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer.prototype.copy.call(src, target, offset);
    }
    __name(copyBuffer, "copyBuffer");
    module.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      __name(BufferList, "BufferList");
      _createClass(BufferList, [{
        key: "push",
        value: /* @__PURE__ */ __name(function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }, "push")
      }, {
        key: "unshift",
        value: /* @__PURE__ */ __name(function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }, "unshift")
      }, {
        key: "shift",
        value: /* @__PURE__ */ __name(function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }, "shift")
      }, {
        key: "clear",
        value: /* @__PURE__ */ __name(function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }, "clear")
      }, {
        key: "join",
        value: /* @__PURE__ */ __name(function join2(s) {
          if (this.length === 0)
            return "";
          var p2 = this.head;
          var ret = "" + p2.data;
          while (p2 = p2.next) {
            ret += s + p2.data;
          }
          return ret;
        }, "join")
      }, {
        key: "concat",
        value: /* @__PURE__ */ __name(function concat(n) {
          if (this.length === 0)
            return Buffer.alloc(0);
          var ret = Buffer.allocUnsafe(n >>> 0);
          var p2 = this.head;
          var i = 0;
          while (p2) {
            copyBuffer(p2.data, ret, i);
            i += p2.data.length;
            p2 = p2.next;
          }
          return ret;
        }, "concat")
      }, {
        key: "consume",
        value: /* @__PURE__ */ __name(function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }, "consume")
      }, {
        key: "first",
        value: /* @__PURE__ */ __name(function first() {
          return this.head.data;
        }, "first")
      }, {
        key: "_getString",
        value: /* @__PURE__ */ __name(function _getString(n) {
          var p2 = this.head;
          var c = 1;
          var ret = p2.data;
          n -= ret.length;
          while (p2 = p2.next) {
            var str = p2.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p2.next)
                  this.head = p2.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p2;
                p2.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }, "_getString")
      }, {
        key: "_getBuffer",
        value: /* @__PURE__ */ __name(function _getBuffer(n) {
          var ret = Buffer.allocUnsafe(n);
          var p2 = this.head;
          var c = 1;
          p2.data.copy(ret);
          n -= p2.data.length;
          while (p2 = p2.next) {
            var buf = p2.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p2.next)
                  this.head = p2.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p2;
                p2.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }, "_getBuffer")
      }, {
        key: custom,
        value: /* @__PURE__ */ __name(function value(_2, options) {
          return inspect(this, _objectSpread({}, options, {
            depth: 0,
            customInspect: false
          }));
        }, "value")
      }]);
      return BufferList;
    }();
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
    "use strict";
    init_define_process();
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            define_process_default.nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            define_process_default.nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            define_process_default.nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            define_process_default.nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            define_process_default.nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          define_process_default.nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          define_process_default.nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    __name(destroy, "destroy");
    function emitErrorAndCloseNT(self2, err) {
      emitErrorNT(self2, err);
      emitCloseNT(self2);
    }
    __name(emitErrorAndCloseNT, "emitErrorAndCloseNT");
    function emitCloseNT(self2) {
      if (self2._writableState && !self2._writableState.emitClose)
        return;
      if (self2._readableState && !self2._readableState.emitClose)
        return;
      self2.emit("close");
    }
    __name(emitCloseNT, "emitCloseNT");
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    __name(undestroy, "undestroy");
    function emitErrorNT(self2, err) {
      self2.emit("error", err);
    }
    __name(emitErrorNT, "emitErrorNT");
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    __name(errorOrDestroy, "errorOrDestroy");
    module.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/errors-browser.js
var require_errors_browser = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/errors-browser.js"(exports, module) {
    "use strict";
    init_define_process();
    function _inheritsLoose2(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    __name(_inheritsLoose2, "_inheritsLoose");
    var codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      __name(getMessage, "getMessage");
      var NodeError = /* @__PURE__ */ function(_Base) {
        _inheritsLoose2(NodeError2, _Base);
        function NodeError2(arg1, arg2, arg3) {
          return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
        }
        __name(NodeError2, "NodeError");
        return NodeError2;
      }(Base);
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    __name(createErrorType, "createErrorType");
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        var len = expected.length;
        expected = expected.map(function(i) {
          return String(i);
        });
        if (len > 2) {
          return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
        } else if (len === 2) {
          return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
        } else {
          return "of ".concat(thing, " ").concat(expected[0]);
        }
      } else {
        return "of ".concat(thing, " ").concat(String(expected));
      }
    }
    __name(oneOf, "oneOf");
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    __name(startsWith, "startsWith");
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    __name(endsWith, "endsWith");
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    __name(includes, "includes");
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      var determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      var msg;
      if (endsWith(name, " argument")) {
        msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      } else {
        var type = includes(name, ".") ? "property" : "argument";
        msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
      }
      msg += ". Received type ".concat(typeof actual);
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module.exports.codes = codes;
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
    "use strict";
    init_define_process();
    var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    __name(highWaterMarkFrom, "highWaterMarkFrom");
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    __name(getHighWaterMark, "getHighWaterMark");
    module.exports = {
      getHighWaterMark
    };
  }
});

// node_modules/util-deprecate/browser.js
var require_browser = __commonJS({
  "node_modules/util-deprecate/browser.js"(exports, module) {
    init_define_process();
    module.exports = deprecate;
    function deprecate(fn, msg) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg);
          } else if (config("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      __name(deprecated, "deprecated");
      return deprecated;
    }
    __name(deprecate, "deprecate");
    function config(name) {
      try {
        if (!globalThis.localStorage)
          return false;
      } catch (_2) {
        return false;
      }
      var val = globalThis.localStorage[name];
      if (null == val)
        return false;
      return String(val).toLowerCase() === "true";
    }
    __name(config, "config");
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    __name(CorkedRequest, "CorkedRequest");
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_browser()
    };
    var Stream = require_stream_browser();
    var Buffer = require_buffer().Buffer;
    var OurUint8Array = globalThis.Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer.from(chunk);
    }
    __name(_uint8ArrayToBuffer, "_uint8ArrayToBuffer");
    function _isUint8Array(obj) {
      return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    __name(_isUint8Array, "_isUint8Array");
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits_browser()(Writable, Stream);
    function nop() {
    }
    __name(nop, "nop");
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    __name(WritableState, "WritableState");
    WritableState.prototype.getBuffer = /* @__PURE__ */ __name(function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    }, "getBuffer");
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(/* @__PURE__ */ __name(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "writableStateBufferGetter"), "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_2) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: /* @__PURE__ */ __name(function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable)
            return false;
          return object && object._writableState instanceof WritableState;
        }, "value")
      });
    } else {
      realHasInstance = /* @__PURE__ */ __name(function realHasInstance2(object) {
        return object instanceof this;
      }, "realHasInstance");
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this))
        return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream.call(this);
    }
    __name(Writable, "Writable");
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      define_process_default.nextTick(cb, er);
    }
    __name(writeAfterEnd, "writeAfterEnd");
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        define_process_default.nextTick(cb, er);
        return false;
      }
      return true;
    }
    __name(validChunk, "validChunk");
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = /* @__PURE__ */ __name(function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    }, "setDefaultEncoding");
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._writableState && this._writableState.getBuffer();
      }, "get")
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }
      return chunk;
    }
    __name(decodeChunk, "decodeChunk");
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._writableState.highWaterMark;
      }, "get")
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    __name(writeOrBuffer, "writeOrBuffer");
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    __name(doWrite, "doWrite");
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        define_process_default.nextTick(cb, er);
        define_process_default.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    __name(onwriteError, "onwriteError");
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    __name(onwriteStateUpdate, "onwriteStateUpdate");
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          define_process_default.nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    __name(onwrite, "onwrite");
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    __name(afterWrite, "afterWrite");
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    __name(onwriteDrain, "onwriteDrain");
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    __name(clearBuffer, "clearBuffer");
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._writableState.length;
      }, "get")
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    __name(needFinish, "needFinish");
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    __name(callFinal, "callFinal");
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          define_process_default.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    __name(prefinish, "prefinish");
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    __name(finishMaybe, "finishMaybe");
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          define_process_default.nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    __name(endWritable, "endWritable");
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    __name(onCorkedFinish, "onCorkedFinish");
    Object.defineProperty(Writable.prototype, "destroyed", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      }, "get"),
      set: /* @__PURE__ */ __name(function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }, "set")
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
    "use strict";
    init_define_process();
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) {
        keys2.push(key);
      }
      return keys2;
    };
    module.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits_browser()(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    __name(Duplex, "Duplex");
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._writableState.highWaterMark;
      }, "get")
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._writableState && this._writableState.getBuffer();
      }, "get")
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._writableState.length;
      }, "get")
    });
    function onend() {
      if (this._writableState.ended)
        return;
      define_process_default.nextTick(onEndNT, this);
    }
    __name(onend, "onend");
    function onEndNT(self2) {
      self2.end();
    }
    __name(onEndNT, "onEndNT");
    Object.defineProperty(Duplex.prototype, "destroyed", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      }, "get"),
      set: /* @__PURE__ */ __name(function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }, "set")
    });
  }
});

// node_modules/string_decoder/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/string_decoder/node_modules/safe-buffer/index.js"(exports, module) {
    init_define_process();
    var buffer = require_buffer();
    var Buffer = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    __name(copyProps, "copyProps");
    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length);
    }
    __name(SafeBuffer, "SafeBuffer");
    SafeBuffer.prototype = Object.create(Buffer.prototype);
    copyProps(Buffer, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "node_modules/string_decoder/lib/string_decoder.js"(exports) {
    "use strict";
    init_define_process();
    var Buffer = require_safe_buffer().Buffer;
    var isEncoding = Buffer.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc)
        return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried)
              return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    __name(_normalizeEncoding, "_normalizeEncoding");
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    __name(normalizeEncoding, "normalizeEncoding");
    exports.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer.allocUnsafe(nb);
    }
    __name(StringDecoder, "StringDecoder");
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0)
        return "";
      var r2;
      var i;
      if (this.lastNeed) {
        r2 = this.fillLast(buf);
        if (r2 === void 0)
          return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length)
        return r2 ? r2 + this.text(buf, i) : this.text(buf, i);
      return r2 || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127)
        return 0;
      else if (byte >> 5 === 6)
        return 2;
      else if (byte >> 4 === 14)
        return 3;
      else if (byte >> 3 === 30)
        return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    __name(utf8CheckByte, "utf8CheckByte");
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i)
        return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2)
            nb = 0;
          else
            self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    __name(utf8CheckIncomplete, "utf8CheckIncomplete");
    function utf8CheckExtraBytes(self2, buf, p2) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    __name(utf8CheckExtraBytes, "utf8CheckExtraBytes");
    function utf8FillLast(buf) {
      var p2 = this.lastTotal - this.lastNeed;
      var r2 = utf8CheckExtraBytes(this, buf, p2);
      if (r2 !== void 0)
        return r2;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p2, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p2, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    __name(utf8FillLast, "utf8FillLast");
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed)
        return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    __name(utf8Text, "utf8Text");
    function utf8End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r2 + "\uFFFD";
      return r2;
    }
    __name(utf8End, "utf8End");
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r2 = buf.toString("utf16le", i);
        if (r2) {
          var c = r2.charCodeAt(r2.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r2.slice(0, -1);
          }
        }
        return r2;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    __name(utf16Text, "utf16Text");
    function utf16End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r2 + this.lastChar.toString("utf16le", 0, end);
      }
      return r2;
    }
    __name(utf16End, "utf16End");
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0)
        return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    __name(base64Text, "base64Text");
    function base64End(buf) {
      var r2 = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r2;
    }
    __name(base64End, "base64End");
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    __name(simpleWrite, "simpleWrite");
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
    __name(simpleEnd, "simpleEnd");
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
    "use strict";
    init_define_process();
    var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    __name(once, "once");
    function noop() {
    }
    __name(noop, "noop");
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    __name(isRequest, "isRequest");
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = /* @__PURE__ */ __name(function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      }, "onlegacyfinish");
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = /* @__PURE__ */ __name(function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      }, "onfinish");
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = /* @__PURE__ */ __name(function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      }, "onend");
      var onerror = /* @__PURE__ */ __name(function onerror2(err) {
        callback.call(stream, err);
      }, "onerror");
      var onclose = /* @__PURE__ */ __name(function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      }, "onclose");
      var onrequest = /* @__PURE__ */ __name(function onrequest2() {
        stream.req.on("finish", onfinish);
      }, "onrequest");
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    __name(eos, "eos");
    module.exports = eos;
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
    "use strict";
    init_define_process();
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    __name(_defineProperty, "_defineProperty");
    var finished = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    __name(createIterResult, "createIterResult");
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    __name(readAndResolve, "readAndResolve");
    function onReadable(iter) {
      define_process_default.nextTick(readAndResolve, iter);
    }
    __name(onReadable, "onReadable");
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    __name(wrapForNext, "wrapForNext");
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: /* @__PURE__ */ __name(function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            define_process_default.nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }, "next")
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", /* @__PURE__ */ __name(function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }, "_return")), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = /* @__PURE__ */ __name(function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: /* @__PURE__ */ __name(function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        }, "value"),
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    }, "createReadableStreamAsyncIterator");
    module.exports = createReadableStreamAsyncIterator;
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/from-browser.js
var require_from_browser = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/from-browser.js"(exports, module) {
    init_define_process();
    module.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require_events().EventEmitter;
    var EElistenerCount = /* @__PURE__ */ __name(function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    }, "EElistenerCount");
    var Stream = require_stream_browser();
    var Buffer = require_buffer().Buffer;
    var OurUint8Array = globalThis.Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer.from(chunk);
    }
    __name(_uint8ArrayToBuffer, "_uint8ArrayToBuffer");
    function _isUint8Array(obj) {
      return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    __name(_isUint8Array, "_isUint8Array");
    var debugUtil = require_util();
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = /* @__PURE__ */ __name(function debug2() {
      }, "debug");
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors_browser().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits_browser()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    __name(prependListener, "prependListener");
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    __name(ReadableState, "ReadableState");
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable))
        return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    __name(Readable, "Readable");
    Object.defineProperty(Readable.prototype, "destroyed", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      }, "get"),
      set: /* @__PURE__ */ __name(function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }, "set")
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    __name(readableAddChunk, "readableAddChunk");
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    __name(addChunk, "addChunk");
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    __name(chunkInvalid, "chunkInvalid");
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p2 = this._readableState.buffer.head;
      var content = "";
      while (p2 !== null) {
        content += decoder.write(p2.data);
        p2 = p2.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    __name(computeNewHighWaterMark, "computeNewHighWaterMark");
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n !== n) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length)
        return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    __name(howMuchToRead, "howMuchToRead");
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    __name(onEofChunk, "onEofChunk");
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        define_process_default.nextTick(emitReadable_, stream);
      }
    }
    __name(emitReadable, "emitReadable");
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    __name(emitReadable_, "emitReadable_");
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        define_process_default.nextTick(maybeReadMore_, stream, state);
      }
    }
    __name(maybeReadMore, "maybeReadMore");
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    __name(maybeReadMore_, "maybeReadMore_");
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== define_process_default.stdout && dest !== define_process_default.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        define_process_default.nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      __name(onunpipe, "onunpipe");
      function onend() {
        debug("onend");
        dest.end();
      }
      __name(onend, "onend");
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      __name(cleanup, "cleanup");
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      __name(ondata, "ondata");
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      __name(onerror, "onerror");
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      __name(onclose, "onclose");
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      __name(onfinish, "onfinish");
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      __name(unpipe, "unpipe");
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return /* @__PURE__ */ __name(function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      }, "pipeOnDrainFunctionResult");
    }
    __name(pipeOnDrain, "pipeOnDrain");
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
          dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
        }
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            define_process_default.nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        define_process_default.nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        define_process_default.nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self2) {
      var state = self2._readableState;
      state.readableListening = self2.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self2.listenerCount("data") > 0) {
        self2.resume();
      }
    }
    __name(updateReadableListening, "updateReadableListening");
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    __name(nReadingNextTick, "nReadingNextTick");
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        define_process_default.nextTick(resume_, stream, state);
      }
    }
    __name(resume, "resume");
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    __name(resume_, "resume_");
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
        ;
      }
    }
    __name(flow, "flow");
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = (/* @__PURE__ */ __name(function methodWrap(method) {
            return /* @__PURE__ */ __name(function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            }, "methodWrapReturnFunction");
          }, "methodWrap"))(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._readableState.highWaterMark;
      }, "get")
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._readableState && this._readableState.buffer;
      }, "get")
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._readableState.flowing;
      }, "get"),
      set: /* @__PURE__ */ __name(function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }, "set")
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      enumerable: false,
      get: /* @__PURE__ */ __name(function get() {
        return this._readableState.length;
      }, "get")
    });
    function fromList(n, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    __name(fromList, "fromList");
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        define_process_default.nextTick(endReadableNT, state, stream);
      }
    }
    __name(endReadable, "endReadable");
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    __name(endReadableNT, "endReadableNT");
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
    __name(indexOf, "indexOf");
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = Transform;
    var _require$codes = require_errors_browser().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits_browser()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    __name(afterTransform, "afterTransform");
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    __name(Transform, "Transform");
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    __name(prefinish, "prefinish");
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
    __name(done, "done");
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits_browser()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    __name(PassThrough, "PassThrough");
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
    "use strict";
    init_define_process();
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    __name(once, "once");
    var _require$codes = require_errors_browser().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err)
        throw err;
    }
    __name(noop, "noop");
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    __name(isRequest, "isRequest");
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0)
        eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isRequest(stream))
          return stream.abort();
        if (typeof stream.destroy === "function")
          return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    __name(destroyer, "destroyer");
    function call(fn) {
      fn();
    }
    __name(call, "call");
    function pipe(from, to) {
      return from.pipe(to);
    }
    __name(pipe, "pipe");
    function popCallback(streams) {
      if (!streams.length)
        return noop;
      if (typeof streams[streams.length - 1] !== "function")
        return noop;
      return streams.pop();
    }
    __name(popCallback, "popCallback");
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    __name(pipeline, "pipeline");
    module.exports = pipeline;
  }
});

// node_modules/stream-browserify/index.js
var require_stream_browserify = __commonJS({
  "node_modules/stream-browserify/index.js"(exports, module) {
    init_define_process();
    module.exports = Stream;
    var EE = require_events().EventEmitter;
    var inherits = require_inherits_browser();
    inherits(Stream, EE);
    Stream.Readable = require_stream_readable();
    Stream.Writable = require_stream_writable();
    Stream.Duplex = require_stream_duplex();
    Stream.Transform = require_stream_transform();
    Stream.PassThrough = require_stream_passthrough();
    Stream.finished = require_end_of_stream();
    Stream.pipeline = require_pipeline();
    Stream.Stream = Stream;
    function Stream() {
      EE.call(this);
    }
    __name(Stream, "Stream");
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }
      __name(ondata, "ondata");
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      __name(ondrain, "ondrain");
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      __name(onend, "onend");
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      __name(onclose, "onclose");
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      __name(onerror, "onerror");
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      __name(cleanup, "cleanup");
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  }
});

// js/ws.ts
init_define_process();

// js/renderPreviewWindow.tsx
init_define_process();
init_react_preact();
init_react_preact();

// node_modules/react-reverse-portal/dist/web/index.js
init_define_process();
init_react_preact();
init_react_preact();
var __extends = function() {
  var extendStatics = /* @__PURE__ */ __name(function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2)
        if (b2.hasOwnProperty(p2))
          d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  }, "extendStatics");
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    __name(__, "__");
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ELEMENT_TYPE_HTML = "html";
var ELEMENT_TYPE_SVG = "svg";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var validateElementType = /* @__PURE__ */ __name(function(domElement, elementType) {
  if (elementType === ELEMENT_TYPE_HTML) {
    return domElement instanceof HTMLElement;
  }
  if (elementType === ELEMENT_TYPE_SVG) {
    return domElement instanceof SVGElement;
  }
  throw new Error('Unrecognized element type "' + elementType + '" for validateElementType.');
}, "validateElementType");
var createPortalNode = /* @__PURE__ */ __name(function(elementType, options) {
  var initialProps = {};
  var parent;
  var lastPlaceholder;
  var element;
  if (elementType === ELEMENT_TYPE_HTML) {
    element = document.createElement("div");
  } else if (elementType === ELEMENT_TYPE_SVG) {
    element = document.createElementNS(SVG_NAMESPACE, "g");
  } else {
    throw new Error('Invalid element type "' + elementType + '" for createPortalNode: must be "html" or "svg".');
  }
  if (options && typeof options === "object") {
    for (var _i = 0, _a = Object.entries(options.attributes); _i < _a.length; _i++) {
      var _b = _a[_i], key = _b[0], value = _b[1];
      element.setAttribute(key, value);
    }
  }
  var portalNode = {
    element,
    elementType,
    setPortalProps: function(props) {
      initialProps = props;
    },
    getInitialPortalProps: function() {
      return initialProps;
    },
    mount: function(newParent, newPlaceholder) {
      if (newPlaceholder === lastPlaceholder) {
        return;
      }
      portalNode.unmount();
      if (newParent !== parent) {
        if (!validateElementType(newParent, elementType)) {
          throw new Error('Invalid element type for portal: "' + elementType + '" portalNodes must be used with ' + elementType + " elements, but OutPortal is within <" + newParent.tagName + ">.");
        }
      }
      newParent.replaceChild(portalNode.element, newPlaceholder);
      parent = newParent;
      lastPlaceholder = newPlaceholder;
    },
    unmount: function(expectedPlaceholder) {
      if (expectedPlaceholder && expectedPlaceholder !== lastPlaceholder) {
        return;
      }
      if (parent && lastPlaceholder) {
        parent.replaceChild(lastPlaceholder, portalNode.element);
        parent = void 0;
        lastPlaceholder = void 0;
      }
    }
  };
  return portalNode;
}, "createPortalNode");
var InPortal = function(_super) {
  __extends(InPortal2, _super);
  function InPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.addPropsChannel = function() {
      Object.assign(_this.props.node, {
        setPortalProps: function(props2) {
          _this.setState({ nodeProps: props2 });
        }
      });
    };
    _this.state = {
      nodeProps: _this.props.node.getInitialPortalProps()
    };
    return _this;
  }
  __name(InPortal2, "InPortal");
  InPortal2.prototype.componentDidMount = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.componentDidUpdate = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.render = function() {
    var _this = this;
    var _a = this.props, children = _a.children, node = _a.node;
    return $(Children.map(children, function(child) {
      if (!isValidElement(child))
        return child;
      return cloneElement(child, _this.state.nodeProps);
    }), node.element);
  };
  return InPortal2;
}(PureComponent);
var OutPortal = function(_super) {
  __extends(OutPortal2, _super);
  function OutPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.placeholderNode = createRef();
    _this.passPropsThroughPortal();
    return _this;
  }
  __name(OutPortal2, "OutPortal");
  OutPortal2.prototype.passPropsThroughPortal = function() {
    var propsForTarget = Object.assign({}, this.props, { node: void 0 });
    this.props.node.setPortalProps(propsForTarget);
  };
  OutPortal2.prototype.componentDidMount = function() {
    var node = this.props.node;
    this.currentPortalNode = node;
    var placeholder = this.placeholderNode.current;
    var parent = placeholder.parentNode;
    node.mount(parent, placeholder);
    this.passPropsThroughPortal();
  };
  OutPortal2.prototype.componentDidUpdate = function() {
    var node = this.props.node;
    if (this.currentPortalNode && node !== this.currentPortalNode) {
      this.currentPortalNode.unmount(this.placeholderNode.current);
      this.currentPortalNode.setPortalProps({});
      this.currentPortalNode = node;
    }
    var placeholder = this.placeholderNode.current;
    var parent = placeholder.parentNode;
    node.mount(parent, placeholder);
    this.passPropsThroughPortal();
  };
  OutPortal2.prototype.componentWillUnmount = function() {
    var node = this.props.node;
    node.unmount(this.placeholderNode.current);
    node.setPortalProps({});
  };
  OutPortal2.prototype.render = function() {
    return h("div", { ref: this.placeholderNode });
  };
  return OutPortal2;
}(PureComponent);
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);

// js/renderPreviewWindow.tsx
init_react_preact();

// js/starter.tsx
init_define_process();
var import_react2 = __toESM(require_emotion_react_cjs(), 1);

// js/ErrorBoundary.tsx
init_define_process();
init_react_preact();
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var ErrorBoundary = class extends react_preact_default.Component {
  constructor(props) {
    super(props);
    this.state = { error: void 0, errorInfo: void 0 };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.errorInfo) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
            children: "Something went wrong."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
            style: { whiteSpace: "pre-wrap" },
            children: [
              this.state.error && this.state.error.toString(),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
              this.state.errorInfo.componentStack
            ]
          })
        ]
      });
    }
    return this.props.children || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
  }
};
__name(ErrorBoundary, "ErrorBoundary");
var ErrorBoundary_default = ErrorBoundary;

// js/md5.js
init_define_process();
function md5(inputString) {
  var hc = "0123456789abcdef";
  function rh(n) {
    var j, s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
    }
    return s;
  }
  __name(rh, "rh");
  function ad(x2, y) {
    var l = (x2 & 65535) + (y & 65535);
    var m2 = (x2 >> 16) + (y >> 16) + (l >> 16);
    return m2 << 16 | l & 65535;
  }
  __name(ad, "ad");
  function rl(n, c2) {
    return n << c2 | n >>> 32 - c2;
  }
  __name(rl, "rl");
  function cm(q, a2, b2, x2, s, t) {
    return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
  }
  __name(cm, "cm");
  function ff(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
  }
  __name(ff, "ff");
  function gg(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
  }
  __name(gg, "gg");
  function hh(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
  }
  __name(hh, "hh");
  function ii(a2, b2, c2, d2, x2, s, t) {
    return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
  }
  __name(ii, "ii");
  function sb(x2) {
    var i2;
    var nblk = (x2.length + 8 >> 6) + 1;
    var blks = new Array(nblk * 16);
    for (i2 = 0; i2 < nblk * 16; i2++)
      blks[i2] = 0;
    for (i2 = 0; i2 < x2.length; i2++) {
      blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
    }
    blks[i2 >> 2] |= 128 << i2 % 4 * 8;
    blks[nblk * 16 - 2] = x2.length * 8;
    return blks;
  }
  __name(sb, "sb");
  var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}
__name(md5, "md5");

// js/starter.tsx
init_react_preact();

// node_modules/es-module-shims/dist/es-module-shims.js
init_define_process();
(function() {
  const hasWindow = typeof window !== "undefined";
  const hasDocument = typeof document !== "undefined";
  const noop = /* @__PURE__ */ __name(() => {
  }, "noop");
  const optionsScript = hasDocument ? document.querySelector("script[type=esms-options]") : void 0;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const skip = esmsInitOptions.skip ? new RegExp(esmsInitOptions.skip) : null;
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
  __name(globalHook, "globalHook");
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes("/") ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) : location.pathname}`;
  const createBlob = /* @__PURE__ */ __name((source, type = "text/javascript") => URL.createObjectURL(new Blob([source], { type })), "createBlob");
  const eoop = /* @__PURE__ */ __name((err) => setTimeout(() => {
    throw err;
  }), "eoop");
  const throwError = /* @__PURE__ */ __name((err) => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err);
  }, "throwError");
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : "";
  }
  __name(fromParent, "fromParent");
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }
  __name(setImportMapSrcOrLazy, "setImportMapSrcOrLazy");
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
    } catch (_2) {
      return false;
    }
  }
  __name(isURL, "isURL");
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  __name(resolveUrl, "resolveUrl");
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
  __name(resolveIfNotPlainOrUrl, "resolveIfNotPlainOrUrl");
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
  __name(resolveAndComposeImportMap, "resolveAndComposeImportMap");
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
  __name(getMatch, "getMatch");
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null)
        return;
      return pkg + id.slice(pkgName.length);
    }
  }
  __name(applyPackages, "applyPackages");
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
  __name(resolveImportMap, "resolveImportMap");
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p3 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p3, baseUrl2) || p3;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p3];
      if (typeof target !== "string")
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl2) || target, baseUrl2);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p3}" -> "${packages[p3]}" does not resolve`);
    }
  }
  __name(resolveAndComposePackages, "resolveAndComposePackages");
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
        dynamicImport = /* @__PURE__ */ __name((url, opts) => new Promise((resolve3, reject) => {
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
          __name(cb, "cb");
          document.head.appendChild(s3);
        }), "dynamicImport");
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
      __name(cb, "cb");
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
  let e, a, r2, i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function(e2, a2) {
    const r3 = e2.length;
    let i2 = 0;
    for (; i2 < r3; )
      a2[i2] = e2.charCodeAt(i2++);
  } : function(e2, a2) {
    const r3 = e2.length;
    let i2 = 0;
    for (; i2 < r3; ) {
      const r4 = e2.charCodeAt(i2);
      a2[i2++] = (255 & r4) << 8 | r4 >>> 8;
    }
  }, t = "xportmportlassetafromssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";
  let c$1, f, n;
  function parse(l2, k2 = "@") {
    c$1 = l2, f = k2;
    const u2 = 2 * c$1.length + (2 << 18);
    if (u2 > i || !e) {
      for (; u2 > i; )
        i *= 2;
      a = new ArrayBuffer(i), s(t, new Uint16Array(a, 16, 95)), e = function(e2, a2, r3) {
        ;
        var i2 = new e2.Int8Array(r3), s2 = new e2.Int16Array(r3), t2 = new e2.Int32Array(r3), c2 = new e2.Uint8Array(r3), f2 = new e2.Uint16Array(r3), n2 = 1008;
        function b2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r4 = 0, c3 = 0, b3 = 0, o4 = 0, w3 = 0;
          w3 = n2;
          n2 = n2 + 10240 | 0;
          i2[775] = 1;
          s2[385] = 0;
          s2[386] = 0;
          t2[62] = t2[2];
          i2[776] = 0;
          t2[61] = 0;
          i2[774] = 0;
          t2[63] = w3 + 2048;
          t2[64] = w3;
          i2[777] = 0;
          e3 = (t2[3] | 0) + -2 | 0;
          t2[65] = e3;
          a3 = e3 + (t2[59] << 1) | 0;
          t2[66] = a3;
          e:
            while (1) {
              r4 = e3 + 2 | 0;
              t2[65] = r4;
              if (e3 >>> 0 >= a3 >>> 0) {
                b3 = 18;
                break;
              }
              a:
                do {
                  switch (s2[r4 >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101: {
                      if ((((s2[386] | 0) == 0 ? F(r4) | 0 : 0) ? (m2(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (l3(), (i2[775] | 0) == 0) : 0) {
                        b3 = 9;
                        break e;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 105: {
                      if (F(r4) | 0 ? (m2(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
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
                t2[62] = t2[65];
              }
              e3 = t2[65] | 0;
              a3 = t2[66] | 0;
            }
          if ((b3 | 0) == 9) {
            e3 = t2[65] | 0;
            t2[62] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 16) {
            i2[775] = 0;
            t2[65] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 18)
            if (!(i2[774] | 0)) {
              e3 = r4;
              b3 = 19;
            } else
              e3 = 0;
          do {
            if ((b3 | 0) == 19) {
              e:
                while (1) {
                  a3 = e3 + 2 | 0;
                  t2[65] = a3;
                  c3 = a3;
                  if (e3 >>> 0 >= (t2[66] | 0) >>> 0) {
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
                          if (((s2[386] | 0) == 0 ? F(a3) | 0 : 0) ? (m2(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                            l3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 105: {
                          if (F(a3) | 0 ? (m2(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                            k3();
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 99: {
                          if ((F(a3) | 0 ? (m2(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? R(s2[e3 + 12 >> 1] | 0) | 0 : 0) {
                            i2[777] = 1;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 40: {
                          c3 = t2[63] | 0;
                          a3 = s2[386] | 0;
                          b3 = a3 & 65535;
                          t2[c3 + (b3 << 3) >> 2] = 1;
                          r4 = t2[62] | 0;
                          s2[386] = a3 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 3) + 4 >> 2] = r4;
                          b3 = 81;
                          break;
                        }
                        case 41: {
                          a3 = s2[386] | 0;
                          if (!(a3 << 16 >> 16)) {
                            b3 = 36;
                            break e;
                          }
                          a3 = a3 + -1 << 16 >> 16;
                          s2[386] = a3;
                          r4 = s2[385] | 0;
                          if (r4 << 16 >> 16 != 0 ? (o4 = t2[(t2[64] | 0) + ((r4 & 65535) + -1 << 2) >> 2] | 0, (t2[o4 + 20 >> 2] | 0) == (t2[(t2[63] | 0) + ((a3 & 65535) << 3) + 4 >> 2] | 0)) : 0) {
                            a3 = o4 + 4 | 0;
                            if (!(t2[a3 >> 2] | 0))
                              t2[a3 >> 2] = c3;
                            t2[o4 + 12 >> 2] = e3 + 4;
                            s2[385] = r4 + -1 << 16 >> 16;
                            b3 = 81;
                          } else
                            b3 = 81;
                          break;
                        }
                        case 123: {
                          b3 = t2[62] | 0;
                          c3 = t2[56] | 0;
                          e3 = b3;
                          do {
                            if ((s2[b3 >> 1] | 0) == 41 & (c3 | 0) != 0 ? (t2[c3 + 4 >> 2] | 0) == (b3 | 0) : 0) {
                              a3 = t2[57] | 0;
                              t2[56] = a3;
                              if (!a3) {
                                t2[52] = 0;
                                break;
                              } else {
                                t2[a3 + 28 >> 2] = 0;
                                break;
                              }
                            }
                          } while (0);
                          c3 = t2[63] | 0;
                          r4 = s2[386] | 0;
                          b3 = r4 & 65535;
                          t2[c3 + (b3 << 3) >> 2] = (i2[777] | 0) == 0 ? 2 : 6;
                          s2[386] = r4 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 3) + 4 >> 2] = e3;
                          i2[777] = 0;
                          b3 = 81;
                          break;
                        }
                        case 125: {
                          e3 = s2[386] | 0;
                          if (!(e3 << 16 >> 16)) {
                            b3 = 49;
                            break e;
                          }
                          c3 = t2[63] | 0;
                          b3 = e3 + -1 << 16 >> 16;
                          s2[386] = b3;
                          if ((t2[c3 + ((b3 & 65535) << 3) >> 2] | 0) == 4) {
                            h4();
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
                              e3 = t2[62] | 0;
                              c3 = s2[e3 >> 1] | 0;
                              r:
                                do {
                                  if (!(U(c3) | 0)) {
                                    switch (c3 << 16 >> 16) {
                                      case 41:
                                        if (z(t2[(t2[63] | 0) + (f2[386] << 3) + 4 >> 2] | 0) | 0) {
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
                                    a3 = t2[63] | 0;
                                    r4 = f2[386] | 0;
                                    if (!(p3(t2[a3 + (r4 << 3) + 4 >> 2] | 0) | 0) ? (t2[a3 + (r4 << 3) >> 2] | 0) != 6 : 0)
                                      b3 = 66;
                                    else
                                      b3 = 69;
                                  } else
                                    switch (c3 << 16 >> 16) {
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
                                      switch (c3 << 16 >> 16) {
                                        case 0: {
                                          b3 = 69;
                                          break r;
                                        }
                                        case 47: {
                                          if (i2[776] | 0) {
                                            b3 = 69;
                                            break r;
                                          }
                                          break;
                                        }
                                        default: {
                                        }
                                      }
                                      r4 = t2[3] | 0;
                                      a3 = c3;
                                      do {
                                        if (e3 >>> 0 <= r4 >>> 0)
                                          break;
                                        e3 = e3 + -2 | 0;
                                        t2[62] = e3;
                                        a3 = s2[e3 >> 1] | 0;
                                      } while (!(B(a3) | 0));
                                      if (D(a3) | 0) {
                                        do {
                                          if (e3 >>> 0 <= r4 >>> 0)
                                            break;
                                          e3 = e3 + -2 | 0;
                                          t2[62] = e3;
                                        } while (D(s2[e3 >> 1] | 0) | 0);
                                        if ($2(e3) | 0) {
                                          g();
                                          i2[776] = 0;
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
                              i2[776] = e3;
                              b3 = 81;
                              break a;
                            }
                          }
                        case 96: {
                          c3 = t2[63] | 0;
                          r4 = s2[386] | 0;
                          b3 = r4 & 65535;
                          t2[c3 + (b3 << 3) + 4 >> 2] = t2[62];
                          s2[386] = r4 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 3) >> 2] = 3;
                          h4();
                          b3 = 81;
                          break;
                        }
                        default:
                          b3 = 81;
                      }
                    } while (0);
                  if ((b3 | 0) == 81) {
                    b3 = 0;
                    t2[62] = t2[65];
                  }
                  e3 = t2[65] | 0;
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
                e3 = (i2[774] | 0) == 0 ? (s2[385] | s2[386]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);
          n2 = w3;
          return e3 | 0;
        }
        __name(b2, "b");
        function l3() {
          var e3 = 0, a3 = 0, r4 = 0, c3 = 0, f3 = 0, n3 = 0, b3 = 0;
          f3 = t2[65] | 0;
          n3 = t2[58] | 0;
          b3 = f3 + 12 | 0;
          t2[65] = b3;
          r4 = w2(1) | 0;
          e3 = t2[65] | 0;
          if (!((e3 | 0) == (b3 | 0) ? !(I(r4) | 0) : 0))
            c3 = 3;
          e:
            do {
              if ((c3 | 0) == 3) {
                a:
                  do {
                    switch (r4 << 16 >> 16) {
                      case 123: {
                        t2[65] = e3 + 2;
                        e3 = w2(1) | 0;
                        r4 = t2[65] | 0;
                        while (1) {
                          if (T(e3) | 0) {
                            d2(e3);
                            e3 = (t2[65] | 0) + 2 | 0;
                            t2[65] = e3;
                          } else {
                            P(e3) | 0;
                            e3 = t2[65] | 0;
                          }
                          w2(1) | 0;
                          e3 = v(r4, e3) | 0;
                          if (e3 << 16 >> 16 == 44) {
                            t2[65] = (t2[65] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          a3 = r4;
                          r4 = t2[65] | 0;
                          if (e3 << 16 >> 16 == 125) {
                            c3 = 15;
                            break;
                          }
                          if ((r4 | 0) == (a3 | 0)) {
                            c3 = 12;
                            break;
                          }
                          if (r4 >>> 0 > (t2[66] | 0) >>> 0) {
                            c3 = 14;
                            break;
                          }
                        }
                        if ((c3 | 0) == 12) {
                          Q();
                          break e;
                        } else if ((c3 | 0) == 14) {
                          Q();
                          break e;
                        } else if ((c3 | 0) == 15) {
                          t2[65] = r4 + 2;
                          break a;
                        }
                        break;
                      }
                      case 42: {
                        t2[65] = e3 + 2;
                        w2(1) | 0;
                        b3 = t2[65] | 0;
                        v(b3, b3) | 0;
                        break;
                      }
                      default: {
                        i2[775] = 0;
                        switch (r4 << 16 >> 16) {
                          case 100: {
                            O(e3, e3 + 14 | 0, 0, 0);
                            break e;
                          }
                          case 97: {
                            t2[65] = e3 + 10;
                            w2(1) | 0;
                            e3 = t2[65] | 0;
                            c3 = 20;
                            break;
                          }
                          case 102: {
                            c3 = 20;
                            break;
                          }
                          case 99: {
                            if ((m2(e3 + 2 | 0, 36, 8) | 0) == 0 ? (a3 = e3 + 10 | 0, B(s2[a3 >> 1] | 0) | 0) : 0) {
                              t2[65] = a3;
                              b3 = w2(1) | 0;
                              n3 = t2[65] | 0;
                              P(b3) | 0;
                              b3 = t2[65] | 0;
                              O(n3, b3, n3, b3);
                              t2[65] = (t2[65] | 0) + -2;
                              break e;
                            }
                            e3 = e3 + 4 | 0;
                            t2[65] = e3;
                            break;
                          }
                          case 108:
                          case 118:
                            break;
                          default:
                            break e;
                        }
                        if ((c3 | 0) == 20) {
                          t2[65] = e3 + 16;
                          e3 = w2(1) | 0;
                          if (e3 << 16 >> 16 == 42) {
                            t2[65] = (t2[65] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          n3 = t2[65] | 0;
                          P(e3) | 0;
                          b3 = t2[65] | 0;
                          O(n3, b3, n3, b3);
                          t2[65] = (t2[65] | 0) + -2;
                          break e;
                        }
                        e3 = e3 + 4 | 0;
                        t2[65] = e3;
                        i2[775] = 0;
                        r:
                          while (1) {
                            t2[65] = e3 + 2;
                            b3 = w2(1) | 0;
                            e3 = t2[65] | 0;
                            switch ((P(b3) | 0) << 16 >> 16) {
                              case 91:
                              case 123:
                                break r;
                              default: {
                              }
                            }
                            a3 = t2[65] | 0;
                            if ((a3 | 0) == (e3 | 0))
                              break e;
                            O(e3, a3, e3, a3);
                            if ((w2(1) | 0) << 16 >> 16 != 44)
                              break;
                            e3 = t2[65] | 0;
                          }
                        t2[65] = (t2[65] | 0) + -2;
                        break e;
                      }
                    }
                  } while (0);
                b3 = (w2(1) | 0) << 16 >> 16 == 102;
                e3 = t2[65] | 0;
                if (b3 ? (m2(e3 + 2 | 0, 52, 6) | 0) == 0 : 0) {
                  t2[65] = e3 + 8;
                  o3(f3, w2(1) | 0);
                  e3 = (n3 | 0) == 0 ? 212 : n3 + 16 | 0;
                  while (1) {
                    e3 = t2[e3 >> 2] | 0;
                    if (!e3)
                      break e;
                    t2[e3 + 12 >> 2] = 0;
                    t2[e3 + 8 >> 2] = 0;
                    e3 = e3 + 16 | 0;
                  }
                }
                t2[65] = e3 + -2;
              }
            } while (0);
          return;
        }
        __name(l3, "l");
        function k3() {
          var e3 = 0, a3 = 0, r4 = 0, c3 = 0, f3 = 0, n3 = 0;
          f3 = t2[65] | 0;
          a3 = f3 + 12 | 0;
          t2[65] = a3;
          e:
            do {
              switch ((w2(1) | 0) << 16 >> 16) {
                case 40: {
                  a3 = t2[63] | 0;
                  n3 = s2[386] | 0;
                  r4 = n3 & 65535;
                  t2[a3 + (r4 << 3) >> 2] = 5;
                  e3 = t2[65] | 0;
                  s2[386] = n3 + 1 << 16 >> 16;
                  t2[a3 + (r4 << 3) + 4 >> 2] = e3;
                  if ((s2[t2[62] >> 1] | 0) != 46) {
                    t2[65] = e3 + 2;
                    n3 = w2(1) | 0;
                    A(f3, t2[65] | 0, 0, e3);
                    a3 = t2[56] | 0;
                    r4 = t2[64] | 0;
                    f3 = s2[385] | 0;
                    s2[385] = f3 + 1 << 16 >> 16;
                    t2[r4 + ((f3 & 65535) << 2) >> 2] = a3;
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
                        t2[65] = (t2[65] | 0) + -2;
                        break e;
                      }
                    }
                    e3 = (t2[65] | 0) + 2 | 0;
                    t2[65] = e3;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 44: {
                        t2[65] = (t2[65] | 0) + 2;
                        w2(1) | 0;
                        f3 = t2[56] | 0;
                        t2[f3 + 4 >> 2] = e3;
                        n3 = t2[65] | 0;
                        t2[f3 + 16 >> 2] = n3;
                        i2[f3 + 24 >> 0] = 1;
                        t2[65] = n3 + -2;
                        break e;
                      }
                      case 41: {
                        s2[386] = (s2[386] | 0) + -1 << 16 >> 16;
                        n3 = t2[56] | 0;
                        t2[n3 + 4 >> 2] = e3;
                        t2[n3 + 12 >> 2] = (t2[65] | 0) + 2;
                        i2[n3 + 24 >> 0] = 1;
                        s2[385] = (s2[385] | 0) + -1 << 16 >> 16;
                        break e;
                      }
                      default: {
                        t2[65] = (t2[65] | 0) + -2;
                        break e;
                      }
                    }
                  }
                  break;
                }
                case 46: {
                  t2[65] = (t2[65] | 0) + 2;
                  if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = t2[65] | 0, (m2(e3 + 2 | 0, 44, 6) | 0) == 0) : 0) ? (s2[t2[62] >> 1] | 0) != 46 : 0)
                    A(f3, f3, e3 + 8 | 0, 2);
                  break;
                }
                case 42:
                case 39:
                case 34: {
                  c3 = 17;
                  break;
                }
                case 123: {
                  e3 = t2[65] | 0;
                  if (s2[386] | 0) {
                    t2[65] = e3 + -2;
                    break e;
                  }
                  while (1) {
                    if (e3 >>> 0 >= (t2[66] | 0) >>> 0)
                      break;
                    e3 = w2(1) | 0;
                    if (!(T(e3) | 0)) {
                      if (e3 << 16 >> 16 == 125) {
                        c3 = 32;
                        break;
                      }
                    } else
                      d2(e3);
                    e3 = (t2[65] | 0) + 2 | 0;
                    t2[65] = e3;
                  }
                  if ((c3 | 0) == 32)
                    t2[65] = (t2[65] | 0) + 2;
                  w2(1) | 0;
                  e3 = t2[65] | 0;
                  if (m2(e3, 50, 8) | 0) {
                    Q();
                    break e;
                  }
                  t2[65] = e3 + 8;
                  e3 = w2(1) | 0;
                  if (T(e3) | 0) {
                    o3(f3, e3);
                    break e;
                  } else {
                    Q();
                    break e;
                  }
                }
                default:
                  if ((t2[65] | 0) == (a3 | 0))
                    t2[65] = f3 + 10;
                  else
                    c3 = 17;
              }
            } while (0);
          do {
            if ((c3 | 0) == 17) {
              if (s2[386] | 0) {
                t2[65] = (t2[65] | 0) + -2;
                break;
              }
              e3 = t2[66] | 0;
              a3 = t2[65] | 0;
              while (1) {
                if (a3 >>> 0 >= e3 >>> 0) {
                  c3 = 24;
                  break;
                }
                r4 = s2[a3 >> 1] | 0;
                if (T(r4) | 0) {
                  c3 = 22;
                  break;
                }
                n3 = a3 + 2 | 0;
                t2[65] = n3;
                a3 = n3;
              }
              if ((c3 | 0) == 22) {
                o3(f3, r4);
                break;
              } else if ((c3 | 0) == 24) {
                Q();
                break;
              }
            }
          } while (0);
          return;
        }
        __name(k3, "k");
        function u3(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (s2[e3 >> 1] | 0) {
                case 100:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 105: {
                      e3 = S(e3 + -4 | 0, 68, 2) | 0;
                      break e;
                    }
                    case 108: {
                      e3 = S(e3 + -4 | 0, 72, 3) | 0;
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
                      e3 = S(e3 + -4 | 0, 78, 4) | 0;
                      break e;
                    }
                    case 117: {
                      e3 = S(e3 + -4 | 0, 86, 6) | 0;
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
                        e3 = S(e3 + -8 | 0, 98, 6) | 0;
                        break e;
                      }
                      case 112: {
                        e3 = S(e3 + -8 | 0, 110, 2) | 0;
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
                  e3 = S(e3 + -2 | 0, 114, 4) | 0;
                  break;
                }
                case 110: {
                  e3 = e3 + -2 | 0;
                  if (j(e3, 105) | 0)
                    e3 = 1;
                  else
                    e3 = S(e3, 122, 5) | 0;
                  break;
                }
                case 111: {
                  e3 = j(e3 + -2 | 0, 100) | 0;
                  break;
                }
                case 114: {
                  e3 = S(e3 + -2 | 0, 132, 7) | 0;
                  break;
                }
                case 116: {
                  e3 = S(e3 + -2 | 0, 146, 4) | 0;
                  break;
                }
                case 119:
                  switch (s2[e3 + -2 >> 1] | 0) {
                    case 101: {
                      e3 = j(e3 + -4 | 0, 110) | 0;
                      break e;
                    }
                    case 111: {
                      e3 = S(e3 + -4 | 0, 154, 3) | 0;
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
        __name(u3, "u");
        function o3(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r4 = 0, i3 = 0;
          r4 = (t2[65] | 0) + 2 | 0;
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
              A(e3, r4, t2[65] | 0, 1);
              t2[65] = (t2[65] | 0) + 2;
              i3 = (w2(0) | 0) << 16 >> 16 == 97;
              a3 = t2[65] | 0;
              if (i3 ? (m2(a3 + 2 | 0, 58, 10) | 0) == 0 : 0) {
                t2[65] = a3 + 12;
                if ((w2(1) | 0) << 16 >> 16 != 123) {
                  t2[65] = a3;
                  break;
                }
                e3 = t2[65] | 0;
                r4 = e3;
                e:
                  while (1) {
                    t2[65] = r4 + 2;
                    r4 = w2(1) | 0;
                    switch (r4 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        t2[65] = (t2[65] | 0) + 2;
                        r4 = w2(1) | 0;
                        break;
                      }
                      case 34: {
                        d2(34);
                        t2[65] = (t2[65] | 0) + 2;
                        r4 = w2(1) | 0;
                        break;
                      }
                      default:
                        r4 = P(r4) | 0;
                    }
                    if (r4 << 16 >> 16 != 58) {
                      i3 = 16;
                      break;
                    }
                    t2[65] = (t2[65] | 0) + 2;
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
                    t2[65] = (t2[65] | 0) + 2;
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
                    t2[65] = (t2[65] | 0) + 2;
                    if ((w2(1) | 0) << 16 >> 16 == 125) {
                      i3 = 25;
                      break;
                    }
                    r4 = t2[65] | 0;
                  }
                if ((i3 | 0) == 16) {
                  t2[65] = a3;
                  break;
                } else if ((i3 | 0) == 20) {
                  t2[65] = a3;
                  break;
                } else if ((i3 | 0) == 24) {
                  t2[65] = a3;
                  break;
                } else if ((i3 | 0) == 25) {
                  i3 = t2[56] | 0;
                  t2[i3 + 16 >> 2] = e3;
                  t2[i3 + 12 >> 2] = (t2[65] | 0) + 2;
                  break;
                }
              }
              t2[65] = a3 + -2;
            }
          } while (0);
          return;
        }
        __name(o3, "o");
        function h4() {
          var e3 = 0, a3 = 0, r4 = 0, i3 = 0;
          a3 = t2[66] | 0;
          r4 = t2[65] | 0;
          e:
            while (1) {
              e3 = r4 + 2 | 0;
              if (r4 >>> 0 >= a3 >>> 0) {
                a3 = 10;
                break;
              }
              switch (s2[e3 >> 1] | 0) {
                case 96: {
                  a3 = 7;
                  break e;
                }
                case 36: {
                  if ((s2[r4 + 4 >> 1] | 0) == 123) {
                    a3 = 6;
                    break e;
                  }
                  break;
                }
                case 92: {
                  e3 = r4 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              r4 = e3;
            }
          if ((a3 | 0) == 6) {
            e3 = r4 + 4 | 0;
            t2[65] = e3;
            a3 = t2[63] | 0;
            i3 = s2[386] | 0;
            r4 = i3 & 65535;
            t2[a3 + (r4 << 3) >> 2] = 4;
            s2[386] = i3 + 1 << 16 >> 16;
            t2[a3 + (r4 << 3) + 4 >> 2] = e3;
          } else if ((a3 | 0) == 7) {
            t2[65] = e3;
            r4 = t2[63] | 0;
            i3 = (s2[386] | 0) + -1 << 16 >> 16;
            s2[386] = i3;
            if ((t2[r4 + ((i3 & 65535) << 3) >> 2] | 0) != 3)
              Q();
          } else if ((a3 | 0) == 10) {
            t2[65] = e3;
            Q();
          }
          return;
        }
        __name(h4, "h");
        function w2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r4 = 0, i3 = 0;
          r4 = t2[65] | 0;
          e:
            do {
              a3 = s2[r4 >> 1] | 0;
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
                    switch (s2[r4 + 2 >> 1] | 0) {
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
              i3 = t2[65] | 0;
              r4 = i3 + 2 | 0;
              t2[65] = r4;
            } while (i3 >>> 0 < (t2[66] | 0) >>> 0);
          return a3 | 0;
        }
        __name(w2, "w");
        function d2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r4 = 0, i3 = 0, c3 = 0;
          c3 = t2[66] | 0;
          a3 = t2[65] | 0;
          while (1) {
            i3 = a3 + 2 | 0;
            if (a3 >>> 0 >= c3 >>> 0) {
              a3 = 9;
              break;
            }
            r4 = s2[i3 >> 1] | 0;
            if (r4 << 16 >> 16 == e3 << 16 >> 16) {
              a3 = 10;
              break;
            }
            if (r4 << 16 >> 16 == 92) {
              r4 = a3 + 4 | 0;
              if ((s2[r4 >> 1] | 0) == 13) {
                a3 = a3 + 6 | 0;
                a3 = (s2[a3 >> 1] | 0) == 10 ? a3 : r4;
              } else
                a3 = r4;
            } else if (X(r4) | 0) {
              a3 = 9;
              break;
            } else
              a3 = i3;
          }
          if ((a3 | 0) == 9) {
            t2[65] = i3;
            Q();
          } else if ((a3 | 0) == 10)
            t2[65] = i3;
          return;
        }
        __name(d2, "d");
        function v(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r4 = 0, i3 = 0, c3 = 0, f3 = 0;
          r4 = t2[65] | 0;
          i3 = s2[r4 >> 1] | 0;
          f3 = (e3 | 0) == (a3 | 0);
          c3 = f3 ? 0 : e3;
          f3 = f3 ? 0 : a3;
          if (i3 << 16 >> 16 == 97) {
            t2[65] = r4 + 4;
            r4 = w2(1) | 0;
            e3 = t2[65] | 0;
            if (T(r4) | 0) {
              d2(r4);
              a3 = (t2[65] | 0) + 2 | 0;
              t2[65] = a3;
            } else {
              P(r4) | 0;
              a3 = t2[65] | 0;
            }
            i3 = w2(1) | 0;
            r4 = t2[65] | 0;
          }
          if ((r4 | 0) != (e3 | 0))
            O(e3, a3, c3, f3);
          return i3 | 0;
        }
        __name(v, "v");
        function A(e3, a3, r4, s3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r4 = r4 | 0;
          s3 = s3 | 0;
          var c3 = 0, f3 = 0;
          c3 = t2[60] | 0;
          t2[60] = c3 + 32;
          f3 = t2[56] | 0;
          t2[((f3 | 0) == 0 ? 208 : f3 + 28 | 0) >> 2] = c3;
          t2[57] = f3;
          t2[56] = c3;
          t2[c3 + 8 >> 2] = e3;
          if (2 == (s3 | 0))
            e3 = r4;
          else
            e3 = 1 == (s3 | 0) ? r4 + 2 | 0 : 0;
          t2[c3 + 12 >> 2] = e3;
          t2[c3 >> 2] = a3;
          t2[c3 + 4 >> 2] = r4;
          t2[c3 + 16 >> 2] = 0;
          t2[c3 + 20 >> 2] = s3;
          i2[c3 + 24 >> 0] = 1 == (s3 | 0) & 1;
          t2[c3 + 28 >> 2] = 0;
          return;
        }
        __name(A, "A");
        function C() {
          var e3 = 0, a3 = 0, r4 = 0;
          r4 = t2[66] | 0;
          a3 = t2[65] | 0;
          e:
            while (1) {
              e3 = a3 + 2 | 0;
              if (a3 >>> 0 >= r4 >>> 0) {
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
            t2[65] = e3;
            Q();
            e3 = 0;
          } else if ((a3 | 0) == 7) {
            t2[65] = e3;
            e3 = 93;
          }
          return e3 | 0;
        }
        __name(C, "C");
        function g() {
          var e3 = 0, a3 = 0, r4 = 0;
          e:
            while (1) {
              e3 = t2[65] | 0;
              a3 = e3 + 2 | 0;
              t2[65] = a3;
              if (e3 >>> 0 >= (t2[66] | 0) >>> 0) {
                r4 = 7;
                break;
              }
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10: {
                  r4 = 7;
                  break e;
                }
                case 47:
                  break e;
                case 91: {
                  C() | 0;
                  break;
                }
                case 92: {
                  t2[65] = e3 + 4;
                  break;
                }
                default: {
                }
              }
            }
          if ((r4 | 0) == 7)
            Q();
          return;
        }
        __name(g, "g");
        function p3(e3) {
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
              e3 = S(e3 + -2 | 0, 180, 4) | 0;
              break;
            }
            case 121: {
              e3 = S(e3 + -2 | 0, 188, 6) | 0;
              break;
            }
            case 101: {
              e3 = S(e3 + -2 | 0, 200, 3) | 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        __name(p3, "p");
        function y(e3) {
          e3 = e3 | 0;
          var a3 = 0, r4 = 0, i3 = 0, c3 = 0, f3 = 0;
          c3 = (t2[65] | 0) + 2 | 0;
          t2[65] = c3;
          r4 = t2[66] | 0;
          while (1) {
            a3 = c3 + 2 | 0;
            if (c3 >>> 0 >= r4 >>> 0)
              break;
            i3 = s2[a3 >> 1] | 0;
            if (!e3 ? X(i3) | 0 : 0)
              break;
            if (i3 << 16 >> 16 == 42 ? (s2[c3 + 4 >> 1] | 0) == 47 : 0) {
              f3 = 8;
              break;
            }
            c3 = a3;
          }
          if ((f3 | 0) == 8) {
            t2[65] = a3;
            a3 = c3 + 4 | 0;
          }
          t2[65] = a3;
          return;
        }
        __name(y, "y");
        function m2(e3, a3, r4) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r4 = r4 | 0;
          var s3 = 0, t3 = 0;
          e:
            do {
              if (!r4)
                e3 = 0;
              else {
                while (1) {
                  s3 = i2[e3 >> 0] | 0;
                  t3 = i2[a3 >> 0] | 0;
                  if (s3 << 24 >> 24 != t3 << 24 >> 24)
                    break;
                  r4 = r4 + -1 | 0;
                  if (!r4) {
                    e3 = 0;
                    break e;
                  } else {
                    e3 = e3 + 1 | 0;
                    a3 = a3 + 1 | 0;
                  }
                }
                e3 = (s3 & 255) - (t3 & 255) | 0;
              }
            } while (0);
          return e3 | 0;
        }
        __name(m2, "m");
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
        __name(I, "I");
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
        __name(U, "U");
        function x(e3) {
          e3 = e3 | 0;
          var a3 = 0, r4 = 0, i3 = 0, c3 = 0;
          r4 = n2;
          n2 = n2 + 16 | 0;
          i3 = r4;
          t2[i3 >> 2] = 0;
          t2[59] = e3;
          a3 = t2[3] | 0;
          c3 = a3 + (e3 << 1) | 0;
          e3 = c3 + 2 | 0;
          s2[c3 >> 1] = 0;
          t2[i3 >> 2] = e3;
          t2[60] = e3;
          t2[52] = 0;
          t2[56] = 0;
          t2[54] = 0;
          t2[53] = 0;
          t2[58] = 0;
          t2[55] = 0;
          n2 = r4;
          return a3 | 0;
        }
        __name(x, "x");
        function S(e3, a3, r4) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r4 = r4 | 0;
          var i3 = 0, c3 = 0;
          i3 = e3 + (0 - r4 << 1) | 0;
          c3 = i3 + 2 | 0;
          e3 = t2[3] | 0;
          if (c3 >>> 0 >= e3 >>> 0 ? (m2(c3, a3, r4 << 1) | 0) == 0 : 0)
            if ((c3 | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = B(s2[i3 >> 1] | 0) | 0;
          else
            e3 = 0;
          return e3 | 0;
        }
        __name(S, "S");
        function O(e3, a3, r4, i3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r4 = r4 | 0;
          i3 = i3 | 0;
          var s3 = 0, c3 = 0;
          s3 = t2[60] | 0;
          t2[60] = s3 + 20;
          c3 = t2[58] | 0;
          t2[((c3 | 0) == 0 ? 212 : c3 + 16 | 0) >> 2] = s3;
          t2[58] = s3;
          t2[s3 >> 2] = e3;
          t2[s3 + 4 >> 2] = a3;
          t2[s3 + 8 >> 2] = r4;
          t2[s3 + 12 >> 2] = i3;
          t2[s3 + 16 >> 2] = 0;
          return;
        }
        __name(O, "O");
        function $2(e3) {
          e3 = e3 | 0;
          switch (s2[e3 >> 1] | 0) {
            case 107: {
              e3 = S(e3 + -2 | 0, 114, 4) | 0;
              break;
            }
            case 101: {
              if ((s2[e3 + -2 >> 1] | 0) == 117)
                e3 = S(e3 + -4 | 0, 86, 6) | 0;
              else
                e3 = 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        __name($2, "$");
        function j(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r4 = 0;
          r4 = t2[3] | 0;
          if (r4 >>> 0 <= e3 >>> 0 ? (s2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0)
            if ((r4 | 0) == (e3 | 0))
              r4 = 1;
            else
              r4 = B(s2[e3 + -2 >> 1] | 0) | 0;
          else
            r4 = 0;
          return r4 | 0;
        }
        __name(j, "j");
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
        __name(B, "B");
        function E() {
          var e3 = 0, a3 = 0, r4 = 0;
          e3 = t2[66] | 0;
          r4 = t2[65] | 0;
          e:
            while (1) {
              a3 = r4 + 2 | 0;
              if (r4 >>> 0 >= e3 >>> 0)
                break;
              switch (s2[a3 >> 1] | 0) {
                case 13:
                case 10:
                  break e;
                default:
                  r4 = a3;
              }
            }
          t2[65] = a3;
          return;
        }
        __name(E, "E");
        function P(e3) {
          e3 = e3 | 0;
          while (1) {
            if (R(e3) | 0)
              break;
            if (I(e3) | 0)
              break;
            e3 = (t2[65] | 0) + 2 | 0;
            t2[65] = e3;
            e3 = s2[e3 >> 1] | 0;
            if (!(e3 << 16 >> 16)) {
              e3 = 0;
              break;
            }
          }
          return e3 | 0;
        }
        __name(P, "P");
        function q() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 20 >> 2] | 0;
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
              e3 = e3 - (t2[3] | 0) >> 1;
          }
          return e3 | 0;
        }
        __name(q, "q");
        function z(e3) {
          e3 = e3 | 0;
          if (!(S(e3, 160, 5) | 0) ? !(S(e3, 170, 3) | 0) : 0)
            e3 = S(e3, 176, 2) | 0;
          else
            e3 = 1;
          return e3 | 0;
        }
        __name(z, "z");
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
        __name(D, "D");
        function F(e3) {
          e3 = e3 | 0;
          if ((t2[3] | 0) == (e3 | 0))
            e3 = 1;
          else
            e3 = B(s2[e3 + -2 >> 1] | 0) | 0;
          return e3 | 0;
        }
        __name(F, "F");
        function G() {
          var e3 = 0;
          e3 = t2[(t2[55] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        __name(G, "G");
        function H() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        __name(H, "H");
        function J() {
          var e3 = 0;
          e3 = t2[(t2[55] | 0) + 8 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        __name(J, "J");
        function K() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 16 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        __name(K, "K");
        function L() {
          var e3 = 0;
          e3 = t2[(t2[54] | 0) + 4 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        __name(L, "L");
        function M() {
          var e3 = 0;
          e3 = t2[54] | 0;
          e3 = t2[((e3 | 0) == 0 ? 208 : e3 + 28 | 0) >> 2] | 0;
          t2[54] = e3;
          return (e3 | 0) != 0 | 0;
        }
        __name(M, "M");
        function N() {
          var e3 = 0;
          e3 = t2[55] | 0;
          e3 = t2[((e3 | 0) == 0 ? 212 : e3 + 16 | 0) >> 2] | 0;
          t2[55] = e3;
          return (e3 | 0) != 0 | 0;
        }
        __name(N, "N");
        function Q() {
          i2[774] = 1;
          t2[61] = (t2[65] | 0) - (t2[3] | 0) >> 1;
          t2[65] = (t2[66] | 0) + 2;
          return;
        }
        __name(Q, "Q");
        function R(e3) {
          e3 = e3 | 0;
          return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
        }
        __name(R, "R");
        function T(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
        }
        __name(T, "T");
        function V() {
          return (t2[(t2[54] | 0) + 8 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        __name(V, "V");
        function W() {
          return (t2[(t2[55] | 0) + 4 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        __name(W, "W");
        function X(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
        }
        __name(X, "X");
        function Y() {
          return (t2[t2[54] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        __name(Y, "Y");
        function Z() {
          return (t2[t2[55] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        __name(Z, "Z");
        function _2() {
          return c2[(t2[54] | 0) + 24 >> 0] | 0 | 0;
        }
        __name(_2, "_");
        function ee(e3) {
          e3 = e3 | 0;
          t2[3] = e3;
          return;
        }
        __name(ee, "ee");
        function ae() {
          return (i2[775] | 0) != 0 | 0;
        }
        __name(ae, "ae");
        function re() {
          return t2[61] | 0;
        }
        __name(re, "re");
        function ie(e3) {
          e3 = e3 | 0;
          n2 = e3 + 992 + 15 & -16;
          return 992;
        }
        __name(ie, "ie");
        return { su: ie, ai: K, e: re, ee: W, ele: G, els: J, es: Z, f: ae, id: q, ie: L, ip: _2, is: Y, p: b2, re: N, ri: M, sa: x, se: H, ses: ee, ss: V };
      }("undefined" != typeof self ? self : globalThis, {}, a), r2 = e.su(i - (2 << 17));
    }
    const h3 = c$1.length + 1;
    e.ses(r2), e.sa(h3 - 1), s(c$1, new Uint16Array(a, r2, h3)), e.p() || (n = e.e(), o2());
    const w = [], d = [];
    for (; e.ri(); ) {
      const a2 = e.is(), r3 = e.ie(), i2 = e.ai(), s2 = e.id(), t2 = e.ss(), f2 = e.se();
      let n2;
      e.ip() && (n2 = b(-1 === s2 ? a2 : a2 + 1, c$1.charCodeAt(-1 === s2 ? a2 - 1 : a2))), w.push({ n: n2, s: a2, e: r3, ss: t2, se: f2, d: s2, a: i2 });
    }
    for (; e.re(); ) {
      const a2 = e.es(), r3 = e.ee(), i2 = e.els(), s2 = e.ele(), t2 = c$1.charCodeAt(a2), f2 = i2 >= 0 ? c$1.charCodeAt(i2) : -1;
      d.push({ s: a2, e: r3, ls: i2, le: s2, n: 34 === t2 || 39 === t2 ? b(a2 + 1, t2) : c$1.slice(a2, r3), ln: i2 < 0 ? void 0 : 34 === f2 || 39 === f2 ? b(i2 + 1, f2) : c$1.slice(i2, s2) });
    }
    return [w, d, !!e.f()];
  }
  __name(parse, "parse");
  function b(e2, a2) {
    n = e2;
    let r3 = "", i2 = n;
    for (; ; ) {
      n >= c$1.length && o2();
      const e3 = c$1.charCodeAt(n);
      if (e3 === a2)
        break;
      92 === e3 ? (r3 += c$1.slice(i2, n), r3 += l(), i2 = n) : (8232 === e3 || 8233 === e3 || u(e3) && o2(), ++n);
    }
    return r3 += c$1.slice(i2, n++), r3;
  }
  __name(b, "b");
  function l() {
    let e2 = c$1.charCodeAt(++n);
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
          123 === c$1.charCodeAt(n) ? (++n, e3 = k(c$1.indexOf("}", n) - n), ++n, e3 > 1114111 && o2()) : e3 = k(4);
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
        10 === c$1.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o2();
      default:
        if (e2 >= 48 && e2 <= 55) {
          let a2 = c$1.substr(n - 1, 3).match(/^[0-7]+/)[0], r3 = parseInt(a2, 8);
          return r3 > 255 && (a2 = a2.slice(0, -1), r3 = parseInt(a2, 8)), n += a2.length - 1, e2 = c$1.charCodeAt(n), "0" === a2 && 56 !== e2 && 57 !== e2 || o2(), String.fromCharCode(r3);
        }
        return u(e2) ? "" : String.fromCharCode(e2);
    }
  }
  __name(l, "l");
  function k(e2) {
    const a2 = n;
    let r3 = 0, i2 = 0;
    for (let a3 = 0; a3 < e2; ++a3, ++n) {
      let e3, s2 = c$1.charCodeAt(n);
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
        i2 = s2, r3 = 16 * r3 + e3;
      } else
        95 !== i2 && 0 !== a3 || o2(), i2 = s2;
    }
    return 95 !== i2 && n - a2 === e2 || o2(), r3;
  }
  __name(k, "k");
  function u(e2) {
    return 13 === e2 || 10 === e2;
  }
  __name(u, "u");
  function o2() {
    throw Object.assign(Error(`Parse error ${f}:${c$1.slice(0, n).split("\n").length}:${n - c$1.lastIndexOf("\n", n - 1)}`), { idx: n });
  }
  __name(o2, "o");
  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      b: !urlResolved && !isURL(id)
    };
  }
  __name(_resolve, "_resolve");
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
  __name(importShim2, "importShim");
  self.importShim = importShim2;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  __name(defaultResolve, "defaultResolve");
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  __name(throwUnresolved, "throwUnresolved");
  const resolveSync = /* @__PURE__ */ __name((id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  }, "resolveSync");
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  __name(metaResolve, "metaResolve");
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
  __name(loadAll, "loadAll");
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
          __name(readyListener, "readyListener");
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
  __name(topLevelLoad, "topLevelLoad");
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
    __name(cleanup, "cleanup");
  }
  __name(revokeObjectURLs, "revokeObjectURLs");
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  __name(urlJsString, "urlJsString");
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
      __name(pushStringTo, "pushStringTo");
      let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
      for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports) {
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
          if (cycleShell) {
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => {
                const q = depLoad.S[s2] === '"' || depLoad.S[s2] === "'";
                return `e$_${i2}=m${q ? `[` : "."}${depLoad.S.slice(s2, e2)}${q ? `]` : ""}`;
              }).join(",")}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_2, i2) => `e$_${i2}`).join(",")};` : ""}export {${depLoad.a[1].map(({ s: s2, e: e2 }, i2) => `e$_${i2} as ${depLoad.S.slice(s2, e2)}`).join(",")}}
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
  __name(resolveDeps, "resolveDeps");
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let p2 = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100)
      return new Promise((r3) => p2.push(r3));
  }
  __name(pushFetchPool, "pushFetchPool");
  function popFetchPool() {
    c--;
    if (p2.length)
      p2.shift()();
  }
  __name(popFetchPool, "popFetchPool");
  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue)
      await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    } catch (e2) {
      e2.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.
` + e2.message;
      throw e2;
    } finally {
      popFetchPool();
    }
    if (!res.ok)
      throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }
  __name(doFetch, "doFetch");
  async function fetchModule(url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get("content-type");
    if (jsContentType.test(contentType))
      return { r: res.url, s: await res.text(), t: "js" };
    else if (jsonContentType.test(contentType))
      return { r: res.url, s: `export default ${await res.text()}`, t: "json" };
    else if (cssContentType.test(contentType)) {
      return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
    } else
      throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }
  __name(fetchModule, "fetchModule");
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
        const { r: r3, b: b2 } = await resolve(n2, load.r || load.u);
        if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (skip && skip.test(r3))
          return { b: r3 };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        return getOrCreateLoad(r3, childFetchOpts, load.r).f;
      }))).filter((l2) => l2);
    });
    return load;
  }
  __name(getOrCreateLoad, "getOrCreateLoad");
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
  __name(processScriptsAndPreloads, "processScriptsAndPreloads");
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
  __name(getFetchOpts, "getFetchOpts");
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("DOMContentLoaded"));
  }
  __name(domContentLoadedCheck, "domContentLoadedCheck");
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
  __name(readyStateCompleteCheck, "readyStateCompleteCheck");
  const hasNext = /* @__PURE__ */ __name((script) => script.nextSibling || script.parentNode && hasNext(script.parentNode), "hasNext");
  const epCheck = /* @__PURE__ */ __name((script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute("noshim") !== null || !(script.ep = true), "epCheck");
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
  __name(processImportMap, "processImportMap");
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
  __name(processScript, "processScript");
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
  __name(processPreload, "processPreload");
})();

// js/starter.tsx
init_react_preact();

// js/renderToString.tsx
init_define_process();
var renderFromString = /* @__PURE__ */ __name((codeSpace2) => {
  var _a;
  const html = (_a = document.getElementById(`root-${codeSpace2}`)) == null ? void 0 : _a.innerHTML;
  const css7 = extractCritical22(html);
  return { html, css: css7 };
}, "renderFromString");
var extractCritical22 = /* @__PURE__ */ __name((html) => {
  try {
    const rules = {};
    for (let i in document.styleSheets) {
      const styleSheet = document.styleSheets[i];
      if (styleSheet == null ? void 0 : styleSheet.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          if (rule && rule.cssText && rule.cssText.slice(0, 5) === ".css-") {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector;
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".css-")) {
              rules[selectorText] = rule.cssText;
            }
          }
        });
      }
    }
    return Object.keys(rules).map((r2) => rules[r2]).join(" ");
  } catch (e) {
    console.error("no css");
    return "";
  }
}, "extractCritical22");

// js/starter.tsx
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
try {
  importShim.addImportMap(
    JSON.parse(
      [...Array.from(document.scripts)].find((s) => s.type === "importmap").innerText
    )
  );
} catch (e) {
  console.error("no importmap");
}
var apps = {};
var ErrorBoundaryJ = ErrorBoundary_default;
var AutoUpdateApp = /* @__PURE__ */ __name(({ hash, codeSpace: codeSpace2 }) => {
  useEffect(() => {
    patchSync({ ...mST(), ...renderFromString(codeSpace2) });
  }, [hash]);
  const ref = useRef(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled)];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ErrorBoundaryJ, {
    ref,
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(App, {})
  }, hash);
}, "AutoUpdateApp");
async function appFactory(transpiled = "") {
  const trp = transpiled.length ? transpiled : mST().transpiled;
  const hash = md5(trp);
  if (!apps[hash]) {
    try {
      apps[hash] = (await importShim(createJsBlob(trp))).default;
    } catch (err) {
      if (err instanceof SyntaxError) {
        const name = err.name;
        const message = err.message;
        apps[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
          css: import_react2.css`
        background-color: orange;
        `,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", {
              children: "Syntax Error"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", {
              children: JSON.stringify({ err })
            })
          ]
        });
      } else if (err instanceof Error) {
        const name = err.name;
        const message = err.message;
        apps[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
          css: import_react2.css`
        background-color: orange;
        `,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", {
              children: "Syntax Error"
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", {
              children: JSON.stringify({ err })
            })
          ]
        });
      } else {
        apps[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
          css: import_react2.css`
        background-color: orange;
      `,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h1", {
            children: [
              "Unknown Error: $",
              hash
            ]
          })
        });
      }
    }
  }
  return apps[hash];
}
__name(appFactory, "appFactory");
function createJsBlob(code) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript"
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}
__name(createJsBlob, "createJsBlob");

// js/renderPreviewWindow.tsx
var import_react19 = __toESM(require_emotion_react_cjs(), 1);

// js/DraggableWindow.tsx
init_define_process();
var import_react13 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

// js/Qr.tsx
init_define_process();
var import_react11 = __toESM(require_emotion_react_cjs(), 1);
init_react_preact();

// node_modules/react-qrious/lib/QRious.js
init_define_process();
init_react_preact();

// node_modules/react-qrious/lib/use-qrious.js
init_define_process();
var import_qrious = __toESM(require_qrious(), 1);
init_react_preact();
var useQrious = /* @__PURE__ */ __name((options) => {
  const [qrious] = useState(() => new import_qrious.default(options));
  const [dataUrl, setDataUrl] = useState(() => qrious.toDataURL(options.mime));
  useEffect(() => {
    qrious.set(options);
    setDataUrl(qrious.toDataURL(options.mime));
  }, [options, qrious]);
  return [dataUrl, qrious];
}, "useQrious");

// node_modules/react-qrious/lib/QRious.js
var QRious2 = /* @__PURE__ */ __name((_a) => {
  var { background, backgroundAlpha, foreground, foregroundAlpha, level, mime, padding: padding2, value, size } = _a, props = __rest(_a, ["background", "backgroundAlpha", "foreground", "foregroundAlpha", "level", "mime", "padding", "value", "size"]);
  const [dataUrl] = useQrious({
    background,
    backgroundAlpha,
    foreground,
    foregroundAlpha,
    level,
    mime,
    padding: padding2,
    size,
    value
  });
  return h("img", Object.assign(Object.assign({}, props), { src: dataUrl }));
}, "QRious");

// js/mui.tsx
init_define_process();

// node_modules/@mui/material/Fab/Fab.js
init_define_process();

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
init_define_process();
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

// node_modules/@mui/material/Fab/Fab.js
init_react_preact();
var import_prop_types8 = __toESM(require_prop_types());

// node_modules/clsx/dist/clsx.m.js
init_define_process();
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
__name(r, "r");
function clsx() {
  for (var e, t, f = 0, n = ""; f < arguments.length; )
    (e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
__name(clsx, "clsx");
var clsx_m_default = clsx;

// node_modules/@mui/base/index.js
init_define_process();

// node_modules/@mui/utils/esm/index.js
init_define_process();

// node_modules/@mui/utils/esm/chainPropTypes.js
init_define_process();
function chainPropTypes(propType1, propType2) {
  if (false) {
    return () => null;
  }
  return /* @__PURE__ */ __name(function validate2(...args) {
    return propType1(...args) || propType2(...args);
  }, "validate");
}
__name(chainPropTypes, "chainPropTypes");

// node_modules/@mui/utils/esm/deepmerge.js
init_define_process();
function isPlainObject(item) {
  return item !== null && typeof item === "object" && item.constructor === Object;
}
__name(isPlainObject, "isPlainObject");
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
__name(deepmerge, "deepmerge");

// node_modules/@mui/utils/esm/elementTypeAcceptingRef.js
init_define_process();
var import_prop_types = __toESM(require_prop_types());
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
__name(isClassComponent, "isClassComponent");
function elementTypeAcceptingRef(props, propName, componentName, location2, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location2} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
__name(elementTypeAcceptingRef, "elementTypeAcceptingRef");
var elementTypeAcceptingRef_default = chainPropTypes(import_prop_types.default.elementType, elementTypeAcceptingRef);

// node_modules/@mui/utils/esm/getDisplayName.js
init_define_process();
var import_react_is = __toESM(require_react_is2());
var fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn) {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || "";
}
__name(getFunctionName, "getFunctionName");
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
__name(getFunctionComponentName, "getFunctionComponentName");
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
__name(getWrappedName, "getWrappedName");
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case import_react_is.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case import_react_is.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
__name(getDisplayName, "getDisplayName");

// node_modules/@mui/utils/esm/refType.js
init_define_process();
var import_prop_types2 = __toESM(require_prop_types());
var refType = import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object]);
var refType_default = refType;

// node_modules/@mui/utils/esm/capitalize.js
init_define_process();
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(true ? `MUI: \`capitalize(string)\` expects a string argument.` : _formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
__name(capitalize, "capitalize");

// node_modules/@mui/utils/esm/setRef.js
init_define_process();
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
__name(setRef, "setRef");

// node_modules/@mui/utils/esm/useEnhancedEffect.js
init_define_process();
init_react_preact();
var useEnhancedEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// node_modules/@mui/utils/esm/useEventCallback.js
init_define_process();
init_react_preact();
function useEventCallback(fn) {
  const ref = useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return useCallback((...args) => (0, ref.current)(...args), []);
}
__name(useEventCallback, "useEventCallback");

// node_modules/@mui/utils/esm/useForkRef.js
init_define_process();
init_react_preact();
function useForkRef(refA, refB) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
__name(useForkRef, "useForkRef");

// node_modules/@mui/utils/esm/useIsFocusVisible.js
init_define_process();
init_react_preact();
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout;
var inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
__name(focusTriggersKeyboardModality, "focusTriggersKeyboardModality");
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
__name(handleKeyDown, "handleKeyDown");
function handlePointerDown() {
  hadKeyboardEvent = false;
}
__name(handlePointerDown, "handlePointerDown");
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
__name(handleVisibilityChange, "handleVisibilityChange");
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
__name(prepare, "prepare");
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
__name(isFocusVisible, "isFocusVisible");
function useIsFocusVisible() {
  const ref = useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  __name(handleBlurVisible, "handleBlurVisible");
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  __name(handleFocusVisible, "handleFocusVisible");
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
__name(useIsFocusVisible, "useIsFocusVisible");

// node_modules/@mui/utils/esm/resolveProps.js
init_define_process();
function resolveProps(defaultProps2, props) {
  const output = _extends({}, props);
  Object.keys(defaultProps2).forEach((propName) => {
    if (output[propName] === void 0) {
      output[propName] = defaultProps2[propName];
    }
  });
  return output;
}
__name(resolveProps, "resolveProps");

// node_modules/@mui/utils/esm/composeClasses/index.js
init_define_process();

// node_modules/@mui/utils/esm/composeClasses/composeClasses.js
init_define_process();
function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach(
    (slot) => {
      output[slot] = slots[slot].reduce((acc, key) => {
        if (key) {
          acc.push(getUtilityClass(key));
          if (classes && classes[key]) {
            acc.push(classes[key]);
          }
        }
        return acc;
      }, []).join(" ");
    }
  );
  return output;
}
__name(composeClasses, "composeClasses");

// node_modules/@mui/utils/esm/generateUtilityClass/index.js
init_define_process();

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
init_define_process();

// node_modules/@mui/utils/esm/ClassNameGenerator/index.js
init_define_process();

// node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
init_define_process();
var defaultGenerator = /* @__PURE__ */ __name((componentName) => componentName, "defaultGenerator");
var createClassNameGenerator = /* @__PURE__ */ __name(() => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
}, "createClassNameGenerator");
var ClassNameGenerator = createClassNameGenerator();
var ClassNameGenerator_default = ClassNameGenerator;

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
var globalStateClassesMapping = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  required: "required",
  selected: "selected"
};
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}
__name(generateUtilityClass, "generateUtilityClass");

// node_modules/@mui/utils/esm/generateUtilityClasses/index.js
init_define_process();

// node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
init_define_process();
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}
__name(generateUtilityClasses, "generateUtilityClasses");

// node_modules/@mui/base/composeClasses/index.js
init_define_process();

// node_modules/@mui/base/generateUtilityClasses/index.js
init_define_process();

// node_modules/@mui/base/generateUtilityClass/index.js
init_define_process();

// node_modules/@mui/material/ButtonBase/index.js
init_define_process();

// node_modules/@mui/material/ButtonBase/ButtonBase.js
init_define_process();
init_react_preact();
var import_prop_types7 = __toESM(require_prop_types());

// node_modules/@mui/material/styles/styled.js
init_define_process();

// node_modules/@mui/system/esm/index.js
init_define_process();

// node_modules/@mui/styled-engine/index.js
init_define_process();
var import_styled = __toESM(require_emotion_styled_cjs());
var import_react7 = __toESM(require_emotion_react_cjs());
function styled(tag, options) {
  const stylesFactory = (0, import_styled.default)(tag, options);
  if (true) {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles.some((style3) => style3 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}
__name(styled, "styled");
var internal_processStyles = /* @__PURE__ */ __name((tag, processor) => {
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
}, "internal_processStyles");

// node_modules/@mui/system/esm/borders.js
init_define_process();

// node_modules/@mui/system/esm/responsivePropType.js
init_define_process();
var import_prop_types3 = __toESM(require_prop_types());
var responsivePropType = true ? import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string, import_prop_types3.default.object, import_prop_types3.default.array]) : {};
var responsivePropType_default = responsivePropType;

// node_modules/@mui/system/esm/style.js
init_define_process();

// node_modules/@mui/system/esm/breakpoints.js
init_define_process();

// node_modules/@mui/system/esm/merge.js
init_define_process();
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
__name(merge, "merge");
var merge_default = merge;

// node_modules/@mui/system/esm/breakpoints.js
var values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};
var defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
__name(handleBreakpoints, "handleBreakpoints");
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
__name(createEmptyBreakpointObject, "createEmptyBreakpointObject");
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}
__name(removeUnusedBreakpoints, "removeUnusedBreakpoints");

// node_modules/@mui/system/esm/style.js
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
__name(getPath, "getPath");
function getValue(themeMapping, transform2, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform2) {
    value = transform2(value);
  }
  return value;
}
__name(getValue, "getValue");
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform2
  } = options;
  const fn = /* @__PURE__ */ __name((props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = /* @__PURE__ */ __name((propValueFinal) => {
      let value = getValue(themeMapping, transform2, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getValue(themeMapping, transform2, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    }, "styleFromPropValue");
    return handleBreakpoints(props, propValue, styleFromPropValue);
  }, "fn");
  fn.propTypes = true ? {
    [prop]: responsivePropType_default
  } : {};
  fn.filterProps = [prop];
  return fn;
}
__name(style, "style");
var style_default = style;

// node_modules/@mui/system/esm/compose.js
init_define_process();
function compose(...styles) {
  const handlers = styles.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn = /* @__PURE__ */ __name((props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  }, "fn");
  fn.propTypes = true ? styles.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn;
}
__name(compose, "compose");
var compose_default = compose;

// node_modules/@mui/system/esm/spacing.js
init_define_process();

// node_modules/@mui/system/esm/memoize.js
init_define_process();
function memoize(fn) {
  const cache = {};
  return (arg) => {
    if (cache[arg] === void 0) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}
__name(memoize, "memoize");

// node_modules/@mui/system/esm/spacing.js
var properties = {
  m: "margin",
  p: "padding"
};
var directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
var aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var getCssProperties = memoize((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a, b] = prop.split("");
  const property = properties[a];
  const direction = directions[b] || "";
  return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
});
var marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
var paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme, themeKey, false)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (true) {
        if (typeof abs !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (true) {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (true) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
__name(createUnaryUnit, "createUnaryUnit");
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
__name(createUnarySpacing, "createUnarySpacing");
function getValue2(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
__name(getValue2, "getValue");
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue2(transformer, propValue);
    return acc;
  }, {});
}
__name(getStyleFromPropValue, "getStyleFromPropValue");
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
__name(resolveCssProperty, "resolveCssProperty");
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
__name(style2, "style");
function margin(props) {
  return style2(props, marginKeys);
}
__name(margin, "margin");
margin.propTypes = true ? marginKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
margin.filterProps = marginKeys;
function padding(props) {
  return style2(props, paddingKeys);
}
__name(padding, "padding");
padding.propTypes = true ? paddingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
padding.filterProps = paddingKeys;
function spacing(props) {
  return style2(props, spacingKeys);
}
__name(spacing, "spacing");
spacing.propTypes = true ? spacingKeys.reduce((obj, key) => {
  obj[key] = responsivePropType_default;
  return obj;
}, {}) : {};
spacing.filterProps = spacingKeys;
var spacing_default = spacing;

// node_modules/@mui/system/esm/borders.js
function getBorder(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
__name(getBorder, "getBorder");
var border = style_default({
  prop: "border",
  themeKey: "borders",
  transform: getBorder
});
var borderTop = style_default({
  prop: "borderTop",
  themeKey: "borders",
  transform: getBorder
});
var borderRight = style_default({
  prop: "borderRight",
  themeKey: "borders",
  transform: getBorder
});
var borderBottom = style_default({
  prop: "borderBottom",
  themeKey: "borders",
  transform: getBorder
});
var borderLeft = style_default({
  prop: "borderLeft",
  themeKey: "borders",
  transform: getBorder
});
var borderColor = style_default({
  prop: "borderColor",
  themeKey: "palette"
});
var borderTopColor = style_default({
  prop: "borderTopColor",
  themeKey: "palette"
});
var borderRightColor = style_default({
  prop: "borderRightColor",
  themeKey: "palette"
});
var borderBottomColor = style_default({
  prop: "borderBottomColor",
  themeKey: "palette"
});
var borderLeftColor = style_default({
  prop: "borderLeftColor",
  themeKey: "palette"
});
var borderRadius = /* @__PURE__ */ __name((props) => {
  if (props.borderRadius !== void 0 && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
    const styleFromPropValue = /* @__PURE__ */ __name((propValue) => ({
      borderRadius: getValue2(transformer, propValue)
    }), "styleFromPropValue");
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
}, "borderRadius");
borderRadius.propTypes = true ? {
  borderRadius: responsivePropType_default
} : {};
borderRadius.filterProps = ["borderRadius"];
var borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
var borders_default = borders;

// node_modules/@mui/system/esm/display.js
init_define_process();
var displayPrint = style_default({
  prop: "displayPrint",
  cssProperty: false,
  transform: (value) => ({
    "@media print": {
      display: value
    }
  })
});
var displayRaw = style_default({
  prop: "display"
});
var overflow = style_default({
  prop: "overflow"
});
var textOverflow = style_default({
  prop: "textOverflow"
});
var visibility = style_default({
  prop: "visibility"
});
var whiteSpace = style_default({
  prop: "whiteSpace"
});
var display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);

// node_modules/@mui/system/esm/flexbox.js
init_define_process();
var flexBasis = style_default({
  prop: "flexBasis"
});
var flexDirection = style_default({
  prop: "flexDirection"
});
var flexWrap = style_default({
  prop: "flexWrap"
});
var justifyContent = style_default({
  prop: "justifyContent"
});
var alignItems = style_default({
  prop: "alignItems"
});
var alignContent = style_default({
  prop: "alignContent"
});
var order = style_default({
  prop: "order"
});
var flex = style_default({
  prop: "flex"
});
var flexGrow = style_default({
  prop: "flexGrow"
});
var flexShrink = style_default({
  prop: "flexShrink"
});
var alignSelf = style_default({
  prop: "alignSelf"
});
var justifyItems = style_default({
  prop: "justifyItems"
});
var justifySelf = style_default({
  prop: "justifySelf"
});
var flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var flexbox_default = flexbox;

// node_modules/@mui/system/esm/cssGrid.js
init_define_process();
var gap = /* @__PURE__ */ __name((props) => {
  if (props.gap !== void 0 && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
    const styleFromPropValue = /* @__PURE__ */ __name((propValue) => ({
      gap: getValue2(transformer, propValue)
    }), "styleFromPropValue");
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
}, "gap");
gap.propTypes = true ? {
  gap: responsivePropType_default
} : {};
gap.filterProps = ["gap"];
var columnGap = /* @__PURE__ */ __name((props) => {
  if (props.columnGap !== void 0 && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
    const styleFromPropValue = /* @__PURE__ */ __name((propValue) => ({
      columnGap: getValue2(transformer, propValue)
    }), "styleFromPropValue");
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
}, "columnGap");
columnGap.propTypes = true ? {
  columnGap: responsivePropType_default
} : {};
columnGap.filterProps = ["columnGap"];
var rowGap = /* @__PURE__ */ __name((props) => {
  if (props.rowGap !== void 0 && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
    const styleFromPropValue = /* @__PURE__ */ __name((propValue) => ({
      rowGap: getValue2(transformer, propValue)
    }), "styleFromPropValue");
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
}, "rowGap");
rowGap.propTypes = true ? {
  rowGap: responsivePropType_default
} : {};
rowGap.filterProps = ["rowGap"];
var gridColumn = style_default({
  prop: "gridColumn"
});
var gridRow = style_default({
  prop: "gridRow"
});
var gridAutoFlow = style_default({
  prop: "gridAutoFlow"
});
var gridAutoColumns = style_default({
  prop: "gridAutoColumns"
});
var gridAutoRows = style_default({
  prop: "gridAutoRows"
});
var gridTemplateColumns = style_default({
  prop: "gridTemplateColumns"
});
var gridTemplateRows = style_default({
  prop: "gridTemplateRows"
});
var gridTemplateAreas = style_default({
  prop: "gridTemplateAreas"
});
var gridArea = style_default({
  prop: "gridArea"
});
var grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var cssGrid_default = grid;

// node_modules/@mui/system/esm/palette.js
init_define_process();
var color = style_default({
  prop: "color",
  themeKey: "palette"
});
var bgcolor = style_default({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
});
var backgroundColor = style_default({
  prop: "backgroundColor",
  themeKey: "palette"
});
var palette = compose_default(color, bgcolor, backgroundColor);
var palette_default = palette;

// node_modules/@mui/system/esm/positions.js
init_define_process();
var position = style_default({
  prop: "position"
});
var zIndex = style_default({
  prop: "zIndex",
  themeKey: "zIndex"
});
var top = style_default({
  prop: "top"
});
var right = style_default({
  prop: "right"
});
var bottom = style_default({
  prop: "bottom"
});
var left = style_default({
  prop: "left"
});
var positions_default = compose_default(position, zIndex, top, right, bottom, left);

// node_modules/@mui/system/esm/shadows.js
init_define_process();
var boxShadow = style_default({
  prop: "boxShadow",
  themeKey: "shadows"
});
var shadows_default = boxShadow;

// node_modules/@mui/system/esm/sizing.js
init_define_process();
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
__name(transform, "transform");
var width = style_default({
  prop: "width",
  transform
});
var maxWidth = /* @__PURE__ */ __name((props) => {
  if (props.maxWidth !== void 0 && props.maxWidth !== null) {
    const styleFromPropValue = /* @__PURE__ */ __name((propValue) => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;
      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    }, "styleFromPropValue");
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
}, "maxWidth");
maxWidth.filterProps = ["maxWidth"];
var minWidth = style_default({
  prop: "minWidth",
  transform
});
var height = style_default({
  prop: "height",
  transform
});
var maxHeight = style_default({
  prop: "maxHeight",
  transform
});
var minHeight = style_default({
  prop: "minHeight",
  transform
});
var sizeWidth = style_default({
  prop: "size",
  cssProperty: "width",
  transform
});
var sizeHeight = style_default({
  prop: "size",
  cssProperty: "height",
  transform
});
var boxSizing = style_default({
  prop: "boxSizing"
});
var sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var sizing_default = sizing;

// node_modules/@mui/system/esm/typography.js
init_define_process();
var fontFamily = style_default({
  prop: "fontFamily",
  themeKey: "typography"
});
var fontSize = style_default({
  prop: "fontSize",
  themeKey: "typography"
});
var fontStyle = style_default({
  prop: "fontStyle",
  themeKey: "typography"
});
var fontWeight = style_default({
  prop: "fontWeight",
  themeKey: "typography"
});
var letterSpacing = style_default({
  prop: "letterSpacing"
});
var textTransform = style_default({
  prop: "textTransform"
});
var lineHeight = style_default({
  prop: "lineHeight"
});
var textAlign = style_default({
  prop: "textAlign"
});
var typographyVariant = style_default({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
var typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
var typography_default = typography;

// node_modules/@mui/system/esm/styleFunctionSx/index.js
init_define_process();

// node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
init_define_process();

// node_modules/@mui/system/esm/getThemeValue.js
init_define_process();
var filterPropsMapping = {
  borders: borders_default.filterProps,
  display: display_default.filterProps,
  flexbox: flexbox_default.filterProps,
  grid: cssGrid_default.filterProps,
  positions: positions_default.filterProps,
  palette: palette_default.filterProps,
  shadows: shadows_default.filterProps,
  sizing: sizing_default.filterProps,
  spacing: spacing_default.filterProps,
  typography: typography_default.filterProps
};
var styleFunctionMapping = {
  borders: borders_default,
  display: display_default,
  flexbox: flexbox_default,
  grid: cssGrid_default,
  positions: positions_default,
  palette: palette_default,
  shadows: shadows_default,
  sizing: sizing_default,
  spacing: spacing_default,
  typography: typography_default
};
var propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});

// node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
__name(objectsHaveSameKeys, "objectsHaveSameKeys");
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
__name(callIfFn, "callIfFn");
function unstable_createStyleFunctionSx(styleFunctionMapping2 = styleFunctionMapping) {
  const propToStyleFunction2 = Object.keys(styleFunctionMapping2).reduce((acc, styleFnName) => {
    styleFunctionMapping2[styleFnName].filterProps.forEach((propName) => {
      acc[propName] = styleFunctionMapping2[styleFnName];
    });
    return acc;
  }, {});
  function getThemeValue(prop, value, theme) {
    const inputProps = {
      [prop]: value,
      theme
    };
    const styleFunction = propToStyleFunction2[prop];
    return styleFunction ? styleFunction(inputProps) : {
      [prop]: value
    };
  }
  __name(getThemeValue, "getThemeValue");
  function styleFunctionSx2(props) {
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css7 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (propToStyleFunction2[styleKey]) {
              css7 = merge_default(css7, getThemeValue(styleKey, value, theme));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css7[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css7 = merge_default(css7, breakpointsValues);
              }
            }
          } else {
            css7 = merge_default(css7, getThemeValue(styleKey, value, theme));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css7);
    }
    __name(traverse, "traverse");
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  __name(styleFunctionSx2, "styleFunctionSx");
  return styleFunctionSx2;
}
__name(unstable_createStyleFunctionSx, "unstable_createStyleFunctionSx");
var styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ["sx"];
var styleFunctionSx_default = styleFunctionSx;

// node_modules/@mui/system/esm/useTheme.js
init_define_process();

// node_modules/@mui/system/esm/createTheme/index.js
init_define_process();

// node_modules/@mui/system/esm/createTheme/createTheme.js
init_define_process();

// node_modules/@mui/system/esm/createTheme/createBreakpoints.js
init_define_process();
var _excluded = ["values", "unit", "step"];
var sortBreakpointsValues = /* @__PURE__ */ __name((values3) => {
  const breakpointsAsArray = Object.keys(values3).map((key) => ({
    key,
    val: values3[key]
  })) || [];
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce((acc, obj) => {
    return _extends({}, acc, {
      [obj.key]: obj.val
    });
  }, {});
}, "sortBreakpointsValues");
function createBreakpoints(breakpoints) {
  const {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded);
  const sortedValues = sortBreakpointsValues(values3);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  __name(up, "up");
  function down(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  __name(down, "down");
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values3[start] === "number" ? values3[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys[endIndex]] === "number" ? values3[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  __name(between, "between");
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  __name(only, "only");
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  __name(not, "not");
  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}
__name(createBreakpoints, "createBreakpoints");

// node_modules/@mui/system/esm/createTheme/shape.js
init_define_process();
var shape = {
  borderRadius: 4
};
var shape_default = shape;

// node_modules/@mui/system/esm/createTheme/createSpacing.js
init_define_process();
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform2 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = /* @__PURE__ */ __name((...argsInput) => {
    if (true) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform2(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  }, "spacing");
  spacing2.mui = true;
  return spacing2;
}
__name(createSpacing, "createSpacing");

// node_modules/@mui/system/esm/createTheme/createTheme.js
var _excluded2 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded2);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape_default, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
__name(createTheme, "createTheme");
var createTheme_default = createTheme;

// node_modules/@mui/system/esm/useThemeWithoutDefault.js
init_define_process();

// node_modules/@mui/private-theming/index.js
init_define_process();

// node_modules/@mui/private-theming/useTheme/ThemeContext.js
init_define_process();
init_react_preact();
var ThemeContext2 = /* @__PURE__ */ createContext(null);
if (true) {
  ThemeContext2.displayName = "ThemeContext";
}
var ThemeContext_default = ThemeContext2;

// node_modules/@mui/private-theming/useTheme/index.js
init_define_process();

// node_modules/@mui/private-theming/useTheme/useTheme.js
init_define_process();
init_react_preact();
function useTheme() {
  const theme = useContext(ThemeContext_default);
  if (true) {
    useDebugValue(theme);
  }
  return theme;
}
__name(useTheme, "useTheme");

// node_modules/@mui/system/esm/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
__name(isObjectEmpty, "isObjectEmpty");
function useTheme2(defaultTheme2 = null) {
  const contextTheme = useTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme2 : contextTheme;
}
__name(useTheme2, "useTheme");
var useThemeWithoutDefault_default = useTheme2;

// node_modules/@mui/system/esm/useTheme.js
var systemDefaultTheme = createTheme_default();
function useTheme3(defaultTheme2 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme2);
}
__name(useTheme3, "useTheme");
var useTheme_default = useTheme3;

// node_modules/@mui/system/esm/createStyled.js
init_define_process();

// node_modules/@mui/system/esm/propsToClassKey.js
init_define_process();
var _excluded3 = ["variant"];
function isEmpty(string) {
  return string.length === 0;
}
__name(isEmpty, "isEmpty");
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}
__name(propsToClassKey, "propsToClassKey");

// node_modules/@mui/system/esm/createStyled.js
var _excluded4 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
var _excluded22 = ["theme"];
var _excluded32 = ["theme"];
function isEmpty2(obj) {
  return Object.keys(obj).length === 0;
}
__name(isEmpty2, "isEmpty");
function isStringTag(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96;
}
__name(isStringTag, "isStringTag");
var getStyleOverrides = /* @__PURE__ */ __name((name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }
  return null;
}, "getStyleOverrides");
var getVariantStyles = /* @__PURE__ */ __name((name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
}, "getVariantStyles");
var variantsResolver = /* @__PURE__ */ __name((props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
}, "variantsResolver");
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
__name(shouldForwardProp, "shouldForwardProp");
var systemDefaultTheme2 = createTheme_default();
var lowercaseFirstLetter = /* @__PURE__ */ __name((string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}, "lowercaseFirstLetter");
function createStyled(input = {}) {
  const {
    defaultTheme: defaultTheme2 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp = shouldForwardProp,
    styleFunctionSx: styleFunctionSx2 = styleFunctionSx_default
  } = input;
  const systemSx = /* @__PURE__ */ __name((props) => {
    const theme = isEmpty2(props.theme) ? defaultTheme2 : props.theme;
    return styleFunctionSx2(_extends({}, props, {
      theme
    }));
  }, "systemSx");
  systemSx.__mui_systemSx = true;
  return (tag, inputOptions = {}) => {
    internal_processStyles(tag, (styles) => styles.filter((style3) => !(style3 != null && style3.__mui_systemSx)));
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose(inputOptions, _excluded4);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    if (true) {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
      }
    }
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp;
    } else if (isStringTag(tag)) {
      shouldForwardPropOption = void 0;
    }
    const defaultStyledResolver = styled(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = /* @__PURE__ */ __name((styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded22);
          return stylesArg(_extends({
            theme: isEmpty2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty2(props.theme) ? defaultTheme2 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            const resolvedStyleOverrides = {};
            Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
              resolvedStyleOverrides[slotKey] = typeof slotStyle === "function" ? slotStyle(_extends({}, props, {
                theme
              })) : slotStyle;
            });
            return overridesResolver(props, resolvedStyleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty2(props.theme) ? defaultTheme2 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function" && styleArg.__emotion_real !== styleArg) {
        transformedStyleArg = /* @__PURE__ */ __name((_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, _excluded32);
          return styleArg(_extends({
            theme: isEmpty2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        }, "transformedStyleArg");
      }
      const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      if (true) {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${componentSlot || ""}`;
        }
        if (displayName === void 0) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }
      return Component;
    }, "muiStyledResolver");
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
}
__name(createStyled, "createStyled");

// node_modules/@mui/system/esm/useThemeProps/index.js
init_define_process();

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
init_define_process();

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
init_define_process();
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}
__name(getThemeProps, "getThemeProps");

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme2
}) {
  const theme = useTheme_default(defaultTheme2);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}
__name(useThemeProps, "useThemeProps");

// node_modules/@mui/system/esm/colorManipulator.js
init_define_process();
function clamp(value, min = 0, max = 1) {
  if (true) {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
__name(clamp, "clamp");
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
__name(hexToRgb, "hexToRgb");
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(true ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : _formatMuiErrorMessage(9, color2));
  }
  let values3 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values3 = values3.split(" ");
    colorSpace = values3.shift();
    if (values3.length === 4 && values3[3].charAt(0) === "/") {
      values3[3] = values3[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : _formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values3 = values3.split(",");
  }
  values3 = values3.map((value) => parseFloat(value));
  return {
    type,
    values: values3,
    colorSpace
  };
}
__name(decomposeColor, "decomposeColor");
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values3
  } = color2;
  if (type.indexOf("rgb") !== -1) {
    values3 = values3.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values3[1] = `${values3[1]}%`;
    values3[2] = `${values3[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values3 = `${colorSpace} ${values3.join(" ")}`;
  } else {
    values3 = `${values3.join(", ")}`;
  }
  return `${type}(${values3})`;
}
__name(recomposeColor, "recomposeColor");
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values3
  } = color2;
  const h3 = values3[0];
  const s = values3[1] / 100;
  const l = values3[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = /* @__PURE__ */ __name((n, k = (n + h3 / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1), "f");
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values3[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
__name(hslToRgb, "hslToRgb");
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
__name(getLuminance, "getLuminance");
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
__name(getContrastRatio, "getContrastRatio");
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clamp(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
__name(alpha, "alpha");
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
__name(darken, "darken");
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
__name(lighten, "lighten");

// node_modules/@mui/material/styles/defaultTheme.js
init_define_process();

// node_modules/@mui/material/styles/createTheme.js
init_define_process();

// node_modules/@mui/material/styles/createMixins.js
init_define_process();
function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
__name(createMixins, "createMixins");

// node_modules/@mui/material/styles/createPalette.js
init_define_process();

// node_modules/@mui/material/colors/common.js
init_define_process();
var common = {
  black: "#000",
  white: "#fff"
};
var common_default = common;

// node_modules/@mui/material/colors/grey.js
init_define_process();
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var grey_default = grey;

// node_modules/@mui/material/colors/purple.js
init_define_process();
var purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var purple_default = purple;

// node_modules/@mui/material/colors/red.js
init_define_process();
var red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var red_default = red;

// node_modules/@mui/material/colors/orange.js
init_define_process();
var orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var orange_default = orange;

// node_modules/@mui/material/colors/blue.js
init_define_process();
var blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var blue_default = blue;

// node_modules/@mui/material/colors/lightBlue.js
init_define_process();
var lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var lightBlue_default = lightBlue;

// node_modules/@mui/material/colors/green.js
init_define_process();
var green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var green_default = green;

// node_modules/@mui/material/styles/createPalette.js
var _excluded5 = ["mode", "contrastThreshold", "tonalOffset"];
var light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common_default.white,
    default: common_default.white
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var dark = {
  text: {
    primary: common_default.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: common_default.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
__name(addLightOrDark, "addLightOrDark");
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
__name(getDefaultPrimary, "getDefaultPrimary");
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
__name(getDefaultSecondary, "getDefaultSecondary");
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
__name(getDefaultError, "getDefaultError");
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
__name(getDefaultInfo, "getDefaultInfo");
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
__name(getDefaultSuccess, "getDefaultSuccess");
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    light: orange_default[500],
    dark: orange_default[900]
  };
}
__name(getDefaultWarning, "getDefaultWarning");
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded5);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  __name(getContrastText, "getContrastText");
  const augmentColor = /* @__PURE__ */ __name(({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : _formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : _formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  }, "augmentColor");
  const modes = {
    dark,
    light
  };
  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    common: _extends({}, common_default),
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "success"
    }),
    grey: grey_default,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}
__name(createPalette, "createPalette");

// node_modules/@mui/material/styles/createTypography.js
init_define_process();
var _excluded6 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
__name(round, "round");
var caseAllCaps = {
  textTransform: "uppercase"
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette2, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded6);
  if (true) {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = /* @__PURE__ */ __name((fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants), "buildVariant");
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}
__name(createTypography, "createTypography");

// node_modules/@mui/material/styles/shadows.js
init_define_process();
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
__name(createShadow, "createShadow");
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows_default2 = shadows;

// node_modules/@mui/material/styles/createTransitions.js
init_define_process();
var _excluded7 = ["duration", "easing", "delay"];
var easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
__name(formatMs, "formatMs");
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
__name(getAutoHeightDuration, "getAutoHeightDuration");
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = /* @__PURE__ */ __name((props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded7);
    if (true) {
      const isString = /* @__PURE__ */ __name((value) => typeof value === "string", "isString");
      const isNumber = /* @__PURE__ */ __name((value) => !isNaN(parseFloat(value)), "isNumber");
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  }, "create");
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
__name(createTransitions, "createTransitions");

// node_modules/@mui/material/styles/zIndex.js
init_define_process();
var zIndex2 = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex_default = zIndex2;

// node_modules/@mui/material/styles/createTheme.js
var _excluded8 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme2(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded8);
  if (options.vars) {
    throw new Error(true ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : _formatMuiErrorMessage(18));
  }
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = /* @__PURE__ */ __name((node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node[key] = {};
        }
      }
    }, "traverse");
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  return muiTheme;
}
__name(createTheme2, "createTheme");
var createTheme_default2 = createTheme2;

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme = createTheme_default2();
var defaultTheme_default = defaultTheme;

// node_modules/@mui/material/styles/styled.js
var rootShouldForwardProp = /* @__PURE__ */ __name((prop) => shouldForwardProp(prop) && prop !== "classes", "rootShouldForwardProp");
var styled2 = createStyled({
  defaultTheme: defaultTheme_default,
  rootShouldForwardProp
});
var styled_default = styled2;

// node_modules/@mui/material/styles/useThemeProps.js
init_define_process();
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default
  });
}
__name(useThemeProps2, "useThemeProps");

// node_modules/@mui/material/utils/useForkRef.js
init_define_process();
var useForkRef_default = useForkRef;

// node_modules/@mui/material/utils/useEventCallback.js
init_define_process();
var useEventCallback_default = useEventCallback;

// node_modules/@mui/material/utils/useIsFocusVisible.js
init_define_process();
var useIsFocusVisible_default = useIsFocusVisible;

// node_modules/@mui/material/ButtonBase/TouchRipple.js
init_define_process();
init_react_preact();
var import_prop_types6 = __toESM(require_prop_types());

// node_modules/react-transition-group/esm/index.js
init_define_process();

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
init_define_process();

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
init_define_process();
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ __name(function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  }, "_setPrototypeOf");
  return _setPrototypeOf(o2, p2);
}
__name(_setPrototypeOf, "_setPrototypeOf");

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
__name(_inheritsLoose, "_inheritsLoose");

// node_modules/react-transition-group/esm/TransitionGroupContext.js
init_define_process();
init_react_preact();
var TransitionGroupContext_default = react_preact_default.createContext(null);

// node_modules/react-transition-group/esm/TransitionGroup.js
init_define_process();

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
init_define_process();
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
__name(_assertThisInitialized, "_assertThisInitialized");

// node_modules/react-transition-group/esm/TransitionGroup.js
var import_prop_types4 = __toESM(require_prop_types());
init_react_preact();

// node_modules/react-transition-group/esm/utils/ChildMapping.js
init_define_process();
init_react_preact();
function getChildMapping(children, mapFn) {
  var mapper = /* @__PURE__ */ __name(function mapper2(child) {
    return mapFn && isValidElement(child) ? mapFn(child) : child;
  }, "mapper");
  var result = /* @__PURE__ */ Object.create(null);
  if (children)
    Children.map(children, function(c) {
      return c;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
__name(getChildMapping, "getChildMapping");
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  __name(getValueForKey, "getValueForKey");
  var nextKeysPending = /* @__PURE__ */ Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }
  return childMapping;
}
__name(mergeChildMappings, "mergeChildMappings");
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
__name(getProp, "getProp");
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
__name(getInitialChildMapping, "getInitialChildMapping");
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement(prevChild)) {
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
__name(getNextChildMapping, "getNextChildMapping");

// node_modules/react-transition-group/esm/TransitionGroup.js
var values2 = Object.values || function(obj) {
  return Object.keys(obj).map(function(k) {
    return obj[k];
  });
};
var defaultProps = {
  component: "div",
  childFactory: /* @__PURE__ */ __name(function childFactory(child) {
    return child;
  }, "childFactory")
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  __name(TransitionGroup2, "TransitionGroup");
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = /* @__PURE__ */ __name(function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  }, "componentDidMount");
  _proto.componentWillUnmount = /* @__PURE__ */ __name(function componentWillUnmount() {
    this.mounted = false;
  }, "componentWillUnmount");
  TransitionGroup2.getDerivedStateFromProps = /* @__PURE__ */ __name(function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  }, "getDerivedStateFromProps");
  _proto.handleExited = /* @__PURE__ */ __name(function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  }, "handleExited");
  _proto.render = /* @__PURE__ */ __name(function render() {
    var _this$props = this.props, Component = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component === null) {
      return /* @__PURE__ */ react_preact_default.createElement(TransitionGroupContext_default.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ react_preact_default.createElement(TransitionGroupContext_default.Provider, {
      value: contextValue
    }, /* @__PURE__ */ react_preact_default.createElement(Component, props, children));
  }, "render");
  return TransitionGroup2;
}(react_preact_default.Component);
TransitionGroup.propTypes = true ? {
  component: import_prop_types4.default.any,
  children: import_prop_types4.default.node,
  appear: import_prop_types4.default.bool,
  enter: import_prop_types4.default.bool,
  exit: import_prop_types4.default.bool,
  childFactory: import_prop_types4.default.func
} : {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup_default = TransitionGroup;

// node_modules/@mui/material/ButtonBase/Ripple.js
init_define_process();
init_react_preact();
var import_prop_types5 = __toESM(require_prop_types());
init_react_preact();
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited,
    timeout
  } = props;
  const [leaving, setLeaving] = useState(false);
  const rippleClassName = clsx_m_default(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = clsx_m_default(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  if (!inProp && !leaving) {
    setLeaving(true);
  }
  useEffect(() => {
    if (!inProp && onExited != null) {
      const timeoutId = setTimeout(onExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [onExited, inProp, timeout]);
  return /* @__PURE__ */ o("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /* @__PURE__ */ o("span", {
      className: childClassName
    })
  });
}
__name(Ripple, "Ripple");
true ? Ripple.propTypes = {
  classes: import_prop_types5.default.object.isRequired,
  className: import_prop_types5.default.string,
  in: import_prop_types5.default.bool,
  onExited: import_prop_types5.default.func,
  pulsate: import_prop_types5.default.bool,
  rippleSize: import_prop_types5.default.number,
  rippleX: import_prop_types5.default.number,
  rippleY: import_prop_types5.default.number,
  timeout: import_prop_types5.default.number.isRequired
} : void 0;
var Ripple_default = Ripple;

// node_modules/@mui/material/ButtonBase/touchRippleClasses.js
init_define_process();
var touchRippleClasses = generateUtilityClasses("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
var touchRippleClasses_default = touchRippleClasses;

// node_modules/@mui/material/ButtonBase/TouchRipple.js
init_react_preact();
var _excluded9 = ["center", "classes", "className"];
var _ = /* @__PURE__ */ __name((t) => t, "_");
var _t;
var _t2;
var _t3;
var _t4;
var DURATION = 550;
var DELAY_RIPPLE = 80;
var enterKeyframe = (0, import_react7.keyframes)(_t || (_t = _`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`));
var exitKeyframe = (0, import_react7.keyframes)(_t2 || (_t2 = _`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`));
var pulsateKeyframe = (0, import_react7.keyframes)(_t3 || (_t3 = _`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`));
var TouchRippleRoot = styled_default("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
});
var TouchRippleRipple = styled_default(Ripple_default, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})(_t4 || (_t4 = _`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`), touchRippleClasses_default.rippleVisible, enterKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.ripplePulsate, ({
  theme
}) => theme.transitions.duration.shorter, touchRippleClasses_default.child, touchRippleClasses_default.childLeaving, exitKeyframe, DURATION, ({
  theme
}) => theme.transitions.easing.easeInOut, touchRippleClasses_default.childPulsate, pulsateKeyframe, ({
  theme
}) => theme.transitions.easing.easeInOut);
var TouchRipple = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function TouchRipple2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiTouchRipple"
  });
  const {
    center: centerProp = false,
    classes = {},
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded9);
  const [ripples, setRipples] = useState([]);
  const nextKey = useRef(0);
  const rippleCallback = useRef(null);
  useEffect(() => {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  const ignoringMouseDown = useRef(false);
  const startTimer = useRef(null);
  const startTimerCommit = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    return () => {
      clearTimeout(startTimer.current);
    };
  }, []);
  const startCommit = useCallback((params) => {
    const {
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize,
      cb
    } = params;
    setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ o(TouchRippleRipple, {
      classes: {
        ripple: clsx_m_default(classes.ripple, touchRippleClasses_default.ripple),
        rippleVisible: clsx_m_default(classes.rippleVisible, touchRippleClasses_default.rippleVisible),
        ripplePulsate: clsx_m_default(classes.ripplePulsate, touchRippleClasses_default.ripplePulsate),
        child: clsx_m_default(classes.child, touchRippleClasses_default.child),
        childLeaving: clsx_m_default(classes.childLeaving, touchRippleClasses_default.childLeaving),
        childPulsate: clsx_m_default(classes.childPulsate, touchRippleClasses_default.childPulsate)
      },
      timeout: DURATION,
      pulsate: pulsate2,
      rippleX,
      rippleY,
      rippleSize
    }, nextKey.current)]);
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  const start = useCallback((event = {}, options = {}, cb) => {
    const {
      pulsate: pulsate2 = false,
      center = centerProp || options.pulsate,
      fakeElement = false
    } = options;
    if ((event == null ? void 0 : event.type) === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if ((event == null ? void 0 : event.type) === "touchstart") {
      ignoringMouseDown.current = true;
    }
    const element = fakeElement ? null : container.current;
    const rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let rippleX;
    let rippleY;
    let rippleSize;
    if (center || event === void 0 || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const {
        clientX,
        clientY
      } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }
    if (event != null && event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = () => {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.current = setTimeout(() => {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE);
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  const pulsate = useCallback(() => {
    start({}, {
      pulsate: true
    });
  }, [start]);
  const stop = useCallback((event, cb) => {
    clearTimeout(startTimer.current);
    if ((event == null ? void 0 : event.type) === "touchend" && startTimerCommit.current) {
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(() => {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples((oldRipples) => {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  useImperativeHandle(ref, () => ({
    pulsate,
    start,
    stop
  }), [pulsate, start, stop]);
  return /* @__PURE__ */ o(TouchRippleRoot, _extends({
    className: clsx_m_default(touchRippleClasses_default.root, classes.root, className),
    ref: container
  }, other, {
    children: /* @__PURE__ */ o(TransitionGroup_default, {
      component: null,
      exit: true,
      children: ripples
    })
  }));
}, "TouchRipple"));
true ? TouchRipple.propTypes = {
  center: import_prop_types6.default.bool,
  classes: import_prop_types6.default.object,
  className: import_prop_types6.default.string
} : void 0;
var TouchRipple_default = TouchRipple;

// node_modules/@mui/material/ButtonBase/buttonBaseClasses.js
init_define_process();
function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass("MuiButtonBase", slot);
}
__name(getButtonBaseUtilityClass, "getButtonBaseUtilityClass");
var buttonBaseClasses = generateUtilityClasses("MuiButtonBase", ["root", "disabled", "focusVisible"]);
var buttonBaseClasses_default = buttonBaseClasses;

// node_modules/@mui/material/ButtonBase/ButtonBase.js
init_react_preact();
init_react_preact();
var _excluded10 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "touchRippleRef", "type"];
var useUtilityClasses = /* @__PURE__ */ __name((ownerState) => {
  const {
    disabled,
    focusVisible,
    focusVisibleClassName,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
  };
  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);
  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }
  return composedClasses;
}, "useUtilityClasses");
var ButtonBaseRoot = styled_default("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
  },
  [`&.${buttonBaseClasses_default.disabled}`]: {
    pointerEvents: "none",
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
});
var ButtonBase = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function ButtonBase2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiButtonBase"
  });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = "button",
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    LinkComponent = "a",
    onBlur,
    onClick,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);
  const handleRippleRef = useForkRef_default(rippleRef, touchRippleRef);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible_default();
  const [focusVisible, setFocusVisible] = useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), []);
  const [mountedState, setMountedState] = useState(false);
  useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple && mountedState) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, mountedState]);
  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback_default((event) => {
      if (eventCallback) {
        eventCallback(event);
      }
      const ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  __name(useRippleHandler, "useRippleHandler");
  const handleMouseDown = useRippleHandler("start", onMouseDown);
  const handleContextMenu = useRippleHandler("stop", onContextMenu);
  const handleDragLeave = useRippleHandler("stop", onDragLeave);
  const handleMouseUp = useRippleHandler("stop", onMouseUp);
  const handleMouseLeave = useRippleHandler("stop", (event) => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler("start", onTouchStart);
  const handleTouchEnd = useRippleHandler("stop", onTouchEnd);
  const handleTouchMove = useRippleHandler("stop", onTouchMove);
  const handleBlur = useRippleHandler("stop", (event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  const handleFocus = useEventCallback_default((event) => {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  const isNonNativeButton = /* @__PURE__ */ __name(() => {
    const button = buttonRef.current;
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  }, "isNonNativeButton");
  const keydownRef = useRef(false);
  const handleKeyDown2 = useEventCallback_default((event) => {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  const handleKeyUp = useEventCallback_default((event) => {
    if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  let ComponentProp = component;
  if (ComponentProp === "button" && (other.href || other.to)) {
    ComponentProp = LinkComponent;
  }
  const buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type === void 0 ? "button" : type;
    buttonProps.disabled = disabled;
  } else {
    if (!other.href && !other.to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const handleOwnRef = useForkRef_default(focusVisibleRef, buttonRef);
  const handleRef = useForkRef_default(ref, handleOwnRef);
  if (true) {
    useEffect(() => {
      if (enableTouchRipple && !rippleRef.current) {
        console.error(["MUI: The `component` prop provided to ButtonBase is invalid.", "Please make sure the children prop is rendered in this custom component."].join("\n"));
      }
    }, [enableTouchRipple]);
  }
  const ownerState = _extends({}, props, {
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    tabIndex,
    focusVisible
  });
  const classes = useUtilityClasses(ownerState);
  return /* @__PURE__ */ o(ButtonBaseRoot, _extends({
    as: ComponentProp,
    className: clsx_m_default(classes.root, className),
    ownerState,
    onBlur: handleBlur,
    onClick,
    onContextMenu: handleContextMenu,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex,
    type
  }, buttonProps, other, {
    children: [children, enableTouchRipple ? /* @__PURE__ */ o(TouchRipple_default, _extends({
      ref: handleRippleRef,
      center: centerRipple
    }, TouchRippleProps)) : null]
  }));
}, "ButtonBase"));
true ? ButtonBase.propTypes = {
  action: refType_default,
  centerRipple: import_prop_types7.default.bool,
  children: import_prop_types7.default.node,
  classes: import_prop_types7.default.object,
  className: import_prop_types7.default.string,
  component: elementTypeAcceptingRef_default,
  disabled: import_prop_types7.default.bool,
  disableRipple: import_prop_types7.default.bool,
  disableTouchRipple: import_prop_types7.default.bool,
  focusRipple: import_prop_types7.default.bool,
  focusVisibleClassName: import_prop_types7.default.string,
  href: import_prop_types7.default.any,
  LinkComponent: import_prop_types7.default.elementType,
  onBlur: import_prop_types7.default.func,
  onClick: import_prop_types7.default.func,
  onContextMenu: import_prop_types7.default.func,
  onDragLeave: import_prop_types7.default.func,
  onFocus: import_prop_types7.default.func,
  onFocusVisible: import_prop_types7.default.func,
  onKeyDown: import_prop_types7.default.func,
  onKeyUp: import_prop_types7.default.func,
  onMouseDown: import_prop_types7.default.func,
  onMouseLeave: import_prop_types7.default.func,
  onMouseUp: import_prop_types7.default.func,
  onTouchEnd: import_prop_types7.default.func,
  onTouchMove: import_prop_types7.default.func,
  onTouchStart: import_prop_types7.default.func,
  sx: import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object, import_prop_types7.default.bool])), import_prop_types7.default.func, import_prop_types7.default.object]),
  tabIndex: import_prop_types7.default.number,
  TouchRippleProps: import_prop_types7.default.object,
  touchRippleRef: import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.shape({
    current: import_prop_types7.default.shape({
      pulsate: import_prop_types7.default.func.isRequired,
      start: import_prop_types7.default.func.isRequired,
      stop: import_prop_types7.default.func.isRequired
    })
  })]),
  type: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["button", "reset", "submit"]), import_prop_types7.default.string])
} : void 0;
var ButtonBase_default = ButtonBase;

// node_modules/@mui/material/utils/capitalize.js
init_define_process();
var capitalize_default = capitalize;

// node_modules/@mui/material/Fab/fabClasses.js
init_define_process();
function getFabUtilityClass(slot) {
  return generateUtilityClass("MuiFab", slot);
}
__name(getFabUtilityClass, "getFabUtilityClass");
var fabClasses = generateUtilityClasses("MuiFab", ["root", "primary", "secondary", "extended", "circular", "focusVisible", "disabled", "colorInherit", "sizeSmall", "sizeMedium", "sizeLarge", "info", "error", "warning", "success"]);
var fabClasses_default = fabClasses;

// node_modules/@mui/material/Fab/Fab.js
init_react_preact();
var _excluded11 = ["children", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"];
var useUtilityClasses2 = /* @__PURE__ */ __name((ownerState) => {
  const {
    color: color2,
    variant,
    classes,
    size
  } = ownerState;
  const slots = {
    root: ["root", variant, `size${capitalize_default(size)}`, color2 === "inherit" ? "colorInherit" : color2]
  };
  return composeClasses(slots, getFabUtilityClass, classes);
}, "useUtilityClasses");
var FabRoot = styled_default(ButtonBase_default, {
  name: "MuiFab",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`size${capitalize_default(ownerState.size)}`], ownerState.color === "inherit" && styles.colorInherit, styles[capitalize_default(ownerState.size)], styles[ownerState.color]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$getCon, _theme$palette;
  return _extends({}, theme.typography.button, {
    minHeight: 36,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
      duration: theme.transitions.duration.short
    }),
    borderRadius: "50%",
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    zIndex: (theme.vars || theme).zIndex.fab,
    boxShadow: (theme.vars || theme).shadows[6],
    "&:active": {
      boxShadow: (theme.vars || theme).shadows[12]
    },
    color: theme.vars ? theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    "&:hover": {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      "@media (hover: none)": {
        backgroundColor: (theme.vars || theme).palette.grey[300]
      },
      textDecoration: "none"
    },
    [`&.${fabClasses_default.focusVisible}`]: {
      boxShadow: (theme.vars || theme).shadows[6]
    },
    [`&.${fabClasses_default.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground
    }
  }, ownerState.size === "small" && {
    width: 40,
    height: 40
  }, ownerState.size === "medium" && {
    width: 48,
    height: 48
  }, ownerState.variant === "extended" && {
    borderRadius: 48 / 2,
    padding: "0 16px",
    width: "auto",
    minHeight: "auto",
    minWidth: 48,
    height: 48
  }, ownerState.variant === "extended" && ownerState.size === "small" && {
    width: "auto",
    padding: "0 8px",
    borderRadius: 34 / 2,
    minWidth: 34,
    height: 34
  }, ownerState.variant === "extended" && ownerState.size === "medium" && {
    width: "auto",
    padding: "0 16px",
    borderRadius: 40 / 2,
    minWidth: 40,
    height: 40
  }, ownerState.color === "inherit" && {
    color: "inherit"
  });
}, ({
  theme,
  ownerState
}) => _extends({}, ownerState.color !== "inherit" && ownerState.color !== "default" && (theme.vars || theme).palette[ownerState.color] != null && {
  color: (theme.vars || theme).palette[ownerState.color].contrastText,
  backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
  "&:hover": {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
    "@media (hover: none)": {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].main
    }
  }
}));
var Fab = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function Fab2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiFab"
  });
  const {
    children,
    className,
    color: color2 = "default",
    component = "button",
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = "large",
    variant = "circular"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant
  });
  const classes = useUtilityClasses2(ownerState);
  return /* @__PURE__ */ o(FabRoot, _extends({
    className: clsx_m_default(classes.root, className),
    component,
    disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx_m_default(classes.focusVisible, focusVisibleClassName),
    ownerState,
    ref
  }, other, {
    children
  }));
}, "Fab"));
true ? Fab.propTypes = {
  children: import_prop_types8.default.node,
  classes: import_prop_types8.default.object,
  className: import_prop_types8.default.string,
  color: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["default", "error", "info", "inherit", "primary", "secondary", "success", "warning"]), import_prop_types8.default.string]),
  component: import_prop_types8.default.elementType,
  disabled: import_prop_types8.default.bool,
  disableFocusRipple: import_prop_types8.default.bool,
  disableRipple: import_prop_types8.default.bool,
  focusVisibleClassName: import_prop_types8.default.string,
  href: import_prop_types8.default.string,
  size: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["small", "medium", "large"]), import_prop_types8.default.string]),
  sx: import_prop_types8.default.oneOfType([import_prop_types8.default.arrayOf(import_prop_types8.default.oneOfType([import_prop_types8.default.func, import_prop_types8.default.object, import_prop_types8.default.bool])), import_prop_types8.default.func, import_prop_types8.default.object]),
  variant: import_prop_types8.default.oneOfType([import_prop_types8.default.oneOf(["circular", "extended"]), import_prop_types8.default.string])
} : void 0;
var Fab_default = Fab;

// node_modules/@mui/material/styles/index.js
init_define_process();

// node_modules/@mui/material/utils/createSvgIcon.js
init_define_process();
init_react_preact();

// node_modules/@mui/material/SvgIcon/index.js
init_define_process();

// node_modules/@mui/material/SvgIcon/SvgIcon.js
init_define_process();
init_react_preact();
var import_prop_types9 = __toESM(require_prop_types());

// node_modules/@mui/material/SvgIcon/svgIconClasses.js
init_define_process();
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
__name(getSvgIconUtilityClass, "getSvgIconUtilityClass");
var svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);

// node_modules/@mui/material/SvgIcon/SvgIcon.js
init_react_preact();
init_react_preact();
var _excluded12 = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];
var useUtilityClasses3 = /* @__PURE__ */ __name((ownerState) => {
  const {
    color: color2,
    fontSize: fontSize2,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color2 !== "inherit" && `color${capitalize_default(color2)}`, `fontSize${capitalize_default(fontSize2)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
}, "useUtilityClasses");
var SvgIconRoot = styled_default("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`], styles[`fontSize${capitalize_default(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$transitions2$d, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _palette$ownerState$c, _palette, _palette$ownerState$c2, _palette2, _palette2$action, _palette3, _palette3$action;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fill: "currentColor",
    flexShrink: 0,
    transition: (_theme$transitions = theme.transitions) == null ? void 0 : (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, "fill", {
      duration: (_theme$transitions2 = theme.transitions) == null ? void 0 : (_theme$transitions2$d = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2$d.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((_theme$typography = theme.typography) == null ? void 0 : (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || "1.25rem",
      medium: ((_theme$typography2 = theme.typography) == null ? void 0 : (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || "1.5rem",
      large: ((_theme$typography3 = theme.typography) == null ? void 0 : (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || "2.1875"
    }[ownerState.fontSize],
    color: (_palette$ownerState$c = (_palette = (theme.vars || theme).palette) == null ? void 0 : (_palette$ownerState$c2 = _palette[ownerState.color]) == null ? void 0 : _palette$ownerState$c2.main) != null ? _palette$ownerState$c : {
      action: (_palette2 = (theme.vars || theme).palette) == null ? void 0 : (_palette2$action = _palette2.action) == null ? void 0 : _palette2$action.active,
      disabled: (_palette3 = (theme.vars || theme).palette) == null ? void 0 : (_palette3$action = _palette3.action) == null ? void 0 : _palette3$action.disabled,
      inherit: void 0
    }[ownerState.color]
  };
});
var SvgIcon = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function SvgIcon2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color: color2 = "inherit",
    component = "svg",
    fontSize: fontSize2 = "medium",
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = "0 0 24 24"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    fontSize: fontSize2,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox
  });
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses3(ownerState);
  return /* @__PURE__ */ o(SvgIconRoot, _extends({
    as: component,
    className: clsx_m_default(classes.root, className),
    ownerState,
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref
  }, more, other, {
    children: [children, titleAccess ? /* @__PURE__ */ o("title", {
      children: titleAccess
    }) : null]
  }));
}, "SvgIcon"));
true ? SvgIcon.propTypes = {
  children: import_prop_types9.default.node,
  classes: import_prop_types9.default.object,
  className: import_prop_types9.default.string,
  color: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types9.default.string]),
  component: import_prop_types9.default.elementType,
  fontSize: import_prop_types9.default.oneOfType([import_prop_types9.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types9.default.string]),
  htmlColor: import_prop_types9.default.string,
  inheritViewBox: import_prop_types9.default.bool,
  shapeRendering: import_prop_types9.default.string,
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object]),
  titleAccess: import_prop_types9.default.string,
  viewBox: import_prop_types9.default.string
} : void 0;
SvgIcon.muiName = "SvgIcon";
var SvgIcon_default = SvgIcon;

// node_modules/@mui/material/utils/createSvgIcon.js
init_react_preact();
function createSvgIcon(path, displayName) {
  const Component = /* @__PURE__ */ __name((props, ref) => /* @__PURE__ */ o(SvgIcon_default, _extends({
    "data-testid": `${displayName}Icon`,
    ref
  }, props, {
    children: path
  })), "Component");
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return /* @__PURE__ */ memo(/* @__PURE__ */ forwardRef(Component));
}
__name(createSvgIcon, "createSvgIcon");

// node_modules/@mui/material/ToggleButton/ToggleButton.js
init_define_process();
init_react_preact();
var import_prop_types10 = __toESM(require_prop_types());

// node_modules/@mui/material/ToggleButton/toggleButtonClasses.js
init_define_process();
function getToggleButtonUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButton", slot);
}
__name(getToggleButtonUtilityClass, "getToggleButtonUtilityClass");
var toggleButtonClasses = generateUtilityClasses("MuiToggleButton", ["root", "disabled", "selected", "standard", "primary", "secondary", "sizeSmall", "sizeMedium", "sizeLarge"]);
var toggleButtonClasses_default = toggleButtonClasses;

// node_modules/@mui/material/ToggleButton/ToggleButton.js
init_react_preact();
var _excluded13 = ["children", "className", "color", "disabled", "disableFocusRipple", "fullWidth", "onChange", "onClick", "selected", "size", "value"];
var useUtilityClasses4 = /* @__PURE__ */ __name((ownerState) => {
  const {
    classes,
    fullWidth,
    selected,
    disabled,
    size,
    color: color2
  } = ownerState;
  const slots = {
    root: ["root", selected && "selected", disabled && "disabled", fullWidth && "fullWidth", `size${capitalize_default(size)}`, color2]
  };
  return composeClasses(slots, getToggleButtonUtilityClass, classes);
}, "useUtilityClasses");
var ToggleButtonRoot = styled_default(ButtonBase_default, {
  name: "MuiToggleButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`size${capitalize_default(ownerState.size)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  let selectedColor = ownerState.color === "standard" ? theme.palette.text.primary : theme.palette[ownerState.color].main;
  let selectedColorChannel;
  if (theme.vars) {
    selectedColor = ownerState.color === "standard" ? theme.vars.palette.text.primary : theme.vars.palette[ownerState.color].main;
    selectedColorChannel = ownerState.color === "standard" ? theme.vars.palette.text.primaryChannel : theme.vars.palette[ownerState.color].mainChannel;
  }
  return _extends({}, theme.typography.button, {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 11,
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
    color: (theme.vars || theme).palette.action.active
  }, ownerState.fullWidth && {
    width: "100%"
  }, {
    [`&.${toggleButtonClasses_default.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    },
    [`&.${toggleButtonClasses_default.selected}`]: {
      color: selectedColor,
      backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(selectedColor, theme.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(selectedColor, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: theme.vars ? `rgba(${selectedColorChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(selectedColor, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, ownerState.size === "small" && {
    padding: 7,
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && {
    padding: 15,
    fontSize: theme.typography.pxToRem(15)
  });
});
var ToggleButton = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function ToggleButton2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiToggleButton"
  });
  const {
    children,
    className,
    color: color2 = "standard",
    disabled = false,
    disableFocusRipple = false,
    fullWidth = false,
    onChange,
    onClick,
    selected,
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const ownerState = _extends({}, props, {
    color: color2,
    disabled,
    disableFocusRipple,
    fullWidth,
    size
  });
  const classes = useUtilityClasses4(ownerState);
  const handleChange = /* @__PURE__ */ __name((event) => {
    if (onClick) {
      onClick(event, value);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (onChange) {
      onChange(event, value);
    }
  }, "handleChange");
  return /* @__PURE__ */ o(ToggleButtonRoot, _extends({
    className: clsx_m_default(classes.root, className),
    disabled,
    focusRipple: !disableFocusRipple,
    ref,
    onClick: handleChange,
    onChange,
    value,
    ownerState,
    "aria-pressed": selected
  }, other, {
    children
  }));
}, "ToggleButton"));
true ? ToggleButton.propTypes = {
  children: import_prop_types10.default.node,
  classes: import_prop_types10.default.object,
  className: import_prop_types10.default.string,
  color: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types10.default.string]),
  disabled: import_prop_types10.default.bool,
  disableFocusRipple: import_prop_types10.default.bool,
  disableRipple: import_prop_types10.default.bool,
  fullWidth: import_prop_types10.default.bool,
  onChange: import_prop_types10.default.func,
  onClick: import_prop_types10.default.func,
  selected: import_prop_types10.default.bool,
  size: import_prop_types10.default.oneOfType([import_prop_types10.default.oneOf(["small", "medium", "large"]), import_prop_types10.default.string]),
  sx: import_prop_types10.default.oneOfType([import_prop_types10.default.arrayOf(import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object, import_prop_types10.default.bool])), import_prop_types10.default.func, import_prop_types10.default.object]),
  value: import_prop_types10.default.any.isRequired
} : void 0;
var ToggleButton_default = ToggleButton;

// node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
init_define_process();
init_react_preact();
var import_react_is2 = __toESM(require_react_is2());
var import_prop_types11 = __toESM(require_prop_types());

// node_modules/@mui/material/ToggleButtonGroup/isValueSelected.js
init_define_process();
function isValueSelected(value, candidate) {
  if (candidate === void 0 || value === void 0) {
    return false;
  }
  if (Array.isArray(candidate)) {
    return candidate.indexOf(value) >= 0;
  }
  return value === candidate;
}
__name(isValueSelected, "isValueSelected");

// node_modules/@mui/material/ToggleButtonGroup/toggleButtonGroupClasses.js
init_define_process();
function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButtonGroup", slot);
}
__name(getToggleButtonGroupUtilityClass, "getToggleButtonGroupUtilityClass");
var toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", ["root", "selected", "vertical", "disabled", "grouped", "groupedHorizontal", "groupedVertical"]);
var toggleButtonGroupClasses_default = toggleButtonGroupClasses;

// node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
init_react_preact();
var _excluded14 = ["children", "className", "color", "disabled", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"];
var useUtilityClasses5 = /* @__PURE__ */ __name((ownerState) => {
  const {
    classes,
    orientation,
    fullWidth,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation === "vertical" && "vertical", fullWidth && "fullWidth"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`, disabled && "disabled"]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
}, "useUtilityClasses");
var ToggleButtonGroupRoot = styled_default("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles.grouped
    }, {
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.orientation)}`]
    }, styles.root, ownerState.orientation === "vertical" && styles.vertical, ownerState.fullWidth && styles.fullWidth];
  }
})(({
  ownerState,
  theme
}) => _extends({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.orientation === "vertical" && {
  flexDirection: "column"
}, ownerState.fullWidth && {
  width: "100%"
}, {
  [`& .${toggleButtonGroupClasses_default.grouped}`]: _extends({}, ownerState.orientation === "horizontal" ? {
    "&:not(:first-of-type)": {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    "&:not(:last-of-type)": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    "&:not(:first-of-type)": {
      marginTop: -1,
      borderTop: "1px solid transparent",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    "&:not(:last-of-type)": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
var ToggleButtonGroup = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name(function ToggleButtonGroup2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiToggleButtonGroup"
  });
  const {
    children,
    className,
    color: color2 = "standard",
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
  const ownerState = _extends({}, props, {
    disabled,
    fullWidth,
    orientation,
    size
  });
  const classes = useUtilityClasses5(ownerState);
  const handleChange = /* @__PURE__ */ __name((event, buttonValue) => {
    if (!onChange) {
      return;
    }
    const index = value && value.indexOf(buttonValue);
    let newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  }, "handleChange");
  const handleExclusiveChange = /* @__PURE__ */ __name((event, buttonValue) => {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  }, "handleExclusiveChange");
  return /* @__PURE__ */ o(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx_m_default(classes.root, className),
    ref,
    ownerState
  }, other, {
    children: Children.map(children, (child) => {
      if (!/* @__PURE__ */ isValidElement(child)) {
        return null;
      }
      if (true) {
        if ((0, import_react_is2.isFragment)(child)) {
          console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      return /* @__PURE__ */ cloneElement(child, {
        className: clsx_m_default(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === void 0 ? isValueSelected(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        fullWidth,
        color: child.props.color || color2,
        disabled: child.props.disabled || disabled
      });
    })
  }));
}, "ToggleButtonGroup"));
true ? ToggleButtonGroup.propTypes = {
  children: import_prop_types11.default.node,
  classes: import_prop_types11.default.object,
  className: import_prop_types11.default.string,
  color: import_prop_types11.default.oneOfType([import_prop_types11.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types11.default.string]),
  disabled: import_prop_types11.default.bool,
  exclusive: import_prop_types11.default.bool,
  fullWidth: import_prop_types11.default.bool,
  onChange: import_prop_types11.default.func,
  orientation: import_prop_types11.default.oneOf(["horizontal", "vertical"]),
  size: import_prop_types11.default.oneOfType([import_prop_types11.default.oneOf(["small", "medium", "large"]), import_prop_types11.default.string]),
  sx: import_prop_types11.default.oneOfType([import_prop_types11.default.arrayOf(import_prop_types11.default.oneOfType([import_prop_types11.default.func, import_prop_types11.default.object, import_prop_types11.default.bool])), import_prop_types11.default.func, import_prop_types11.default.object]),
  value: import_prop_types11.default.any
} : void 0;
var ToggleButtonGroup_default = ToggleButtonGroup;

// js/mui.tsx
var import_jsx_runtime13 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var FullscreenIcon = createSvgIcon(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
    d: "M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z"
  }),
  "Fullscreen"
);
var Phone = createSvgIcon(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
    d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
  }, "12"),
  "PhoneAndroid"
);
var Share = createSvgIcon(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
    d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
  }, "12"),
  "Share"
);
var Tablet = createSvgIcon(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
    d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
  }, "12"),
  "TabletAndroid"
);
var Tv = createSvgIcon(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
    d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
  }, "12"),
  "Tv"
);
var QrCode = createSvgIcon(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", {
    d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
  }, "12"),
  "QrCode"
);

// js/Qr.tsx
var import_jsx_runtime14 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var QR = /* @__PURE__ */ __name(({ url }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(QRious2, {
  value: url
}), "QR");
var QRButton = /* @__PURE__ */ __name(({ url }) => {
  const [showQR, setQR] = useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(LazyMotion, {
    features: domAnimation,
    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(m.div, {
      animate: {
        width: showQR ? 200 : 56,
        height: showQR ? 220 : 48
      },
      onClick: () => {
        setQR(!showQR);
      },
      css: import_react11.css`
          margin-top: 12px;
          margin-bottom: 12px;
              `,
      children: showQR ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(QR, {
        url: url || "/live/coder/public"
      }, url || "http://spike.land") : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Fab_default, {
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(QrCode, {})
      })
    })
  });
}, "QRButton");

// js/DraggableWindow.tsx
var import_jsx_runtime15 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var ToggleButtonGroup3 = ToggleButtonGroup_default;
var ToggleButton3 = ToggleButton_default;
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100, 150];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = /* @__PURE__ */ __name(({
  children,
  room,
  hashCode: hashCode2
}) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom: bottom2, right: right2 }, setPositions] = useState(startPositions);
  const [width2, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height2, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const scale = scaleRange / 100;
  useEffect(() => {
    const reveal = /* @__PURE__ */ __name(async () => {
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2
      });
      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }
      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(100);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(100);
      }
      setPositions({
        bottom: 20,
        right: 20
      });
    }, "reveal");
    reveal();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(LazyMotion, {
    features: domMax,
    children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(m.div, {
      transition: { delay: 0, duration: 0.4 },
      initial: {
        top: 0,
        padding: 0,
        right: 0,
        borderRadius: 0
      },
      animate: {
        top: bottom2,
        padding: 8,
        right: right2,
        borderRadius: 16
      },
      css: import_react13.css`
            background-color:${bg};
            backdrop-filter: blur(15px);
            z-index: 10;

            white-space: normal;
            position: fixed;
          `,
      drag: true,
      dragMomentum: false,
      dragConstraints: {
        left: 0,
        right: width2 - 20 - width2 / 6,
        bottom: innerHeight
      },
      dragElastic: 0.5,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", {
        css: import_react13.css` 
              display: flex;
              
                `,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", {
            css: import_react13.css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(m.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: { height: 0, width: 0 },
                animate: { height: "auto", width: "auto" },
                children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ToggleButtonGroup3, {
                  value: scaleRange,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newScale) => {
                    newScale && changeScaleRange(newScale);
                  },
                  children: sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ToggleButton3, {
                    value: size,
                    children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", {
                      css: import_react13.css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `,
                      children: [
                        size,
                        "%"
                      ]
                    })
                  }, size))
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(m.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  borderRadius: 0
                },
                animate: {
                  width: width2 * scale / devicePixelRatio,
                  height: height2 * scale / devicePixelRatio,
                  borderRadius: 8
                },
                css: import_react13.css`

                display: block;
                overflow: hidden;
                overflow-y: hidden;
            `,
                children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(m.div, {
                  transition: { delay: 0, duration: 0.4 },
                  initial: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    background: "rgba(0,0,0, 1)",
                    scale: 1
                  },
                  animate: {
                    background: "rgba(92,92,92, 0.5)",
                    transformOrigin: "0px 0px",
                    width: width2 / devicePixelRatio,
                    height: height2 / devicePixelRatio,
                    scale: scaleRange / 100
                  },
                  "data-test-id": "z-body",
                  css: import_react13.css`
                  overflow:overlay;
                  overflow-y: hidden;
              `,
                  children
                })
              }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(m.div, {
                transition: { delay: 0, duration: 0.4 },
                children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ToggleButtonGroup3, {
                  value: width2,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newSize) => {
                    if (newSize) {
                      setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                      setWidth(newSize);
                    }
                  },
                  children: breakPoints.map((size) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ToggleButton3, {
                    value: size,
                    children: size === 680 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Phone, {
                      css: import_react13.css`
                        color: ${width2 === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
                    }) : size === 768 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Tablet, {
                      css: import_react13.css`
                        color: ${width2 === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
                    }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Tv, {
                      css: import_react13.css`
                        color: ${width2 === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
                    })
                  }, `size-${size}`))
                })
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(m.div, {
            transition: { delay: 0, duration: 0.4 },
            initial: { height: 0, width: 0 },
            animate: { height: "100%", width: "auto" },
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", {
              css: import_react13.css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Fab_default, {
                  onClick: () => {
                    var _a;
                    (_a = document.getElementById("root")) == null ? void 0 : _a.requestFullscreen();
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(FullscreenIcon, {}, "fs")
                }, "fullscreen"),
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(QRButton, {
                  url: location.origin + `/live/${room}/public`
                }, `qr-${hashCode2}`),
                /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Fab_default, {
                  onClick: () => open(`/live/${room}/public`),
                  children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Share, {})
                }, "Share")
              ]
            })
          })
        ]
      })
    })
  });
}, "DraggableWindow");

// js/Editor.tsx
init_define_process();
init_react_preact();

// js/isMobile.mjs
init_define_process();
function isMobile() {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
      check = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
__name(isMobile, "isMobile");

// js/Editor.tsx
var import_react16 = __toESM(require_emotion_react_cjs(), 1);
var import_jsx_runtime16 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod = {
  CH: () => {
  },
  code: ""
};
var Editor = /* @__PURE__ */ __name(({ code, i, codeSpace: codeSpace2, assets }) => {
  const ref = useRef(null);
  const [
    mySession,
    changeContent
  ] = useState({
    myCode: code,
    counter: i,
    started: false,
    prettierJs: (code2) => code2 + "// " + Math.random(),
    runner: async ({ code: code2, counter: counter2, codeSpace: codeSpace3 }) => {
      const { runner: runner2 } = await import("./chunk-runner-LSIXOD6U.mjs");
      const { prettierJs: prettierJs2 } = await import("./chunk-prettierEsm-TOMNIK4R.mjs");
      runner2({ code: prettierJs2(code2), counter: counter2, codeSpace: codeSpace3 });
      changeContent((x) => ({
        ...x,
        runner: runner2,
        code: code2,
        counter: counter2,
        prettierJs: prettierJs2
      }));
    },
    myId: "loading",
    getValue: () => "",
    setValue: (_code) => {
    },
    onChange: (_cb) => {
    },
    engine: isMobile() ? "ace" : "monaco"
  });
  mod.CH = () => changeContent;
  const {
    counter,
    myCode,
    started,
    myId,
    runner,
    engine,
    prettierJs,
    getValue: getValue3,
    setValue,
    onChange
  } = mySession;
  mod.code = myCode;
  const lines = (code == null ? void 0 : code.split("\n").length) || 0;
  useEffect(() => {
    if (!(ref == null ? void 0 : ref.current))
      return;
    const setMonaco = /* @__PURE__ */ __name(async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/" + assets["ws.css"];
      document.head.appendChild(link);
      const { startMonaco } = await import("./chunk-startMonaco-MVWPC576.mjs");
      const { model, getTypeScriptWorker, setValue: setValue2 } = await startMonaco(
        {
          container: ref.current,
          name: codeSpace2,
          code: mST().code
        }
      );
      changeContent((x) => ({
        ...x,
        started: true,
        setValue: setValue2,
        getValue: () => {
          try {
            (async () => {
              const tsWorker = await (await getTypeScriptWorker())(
                model.uri
              );
              const diag = await tsWorker.getSemanticDiagnostics(
                location.origin + "/live/" + codeSpace2 + ".tsx"
              );
              console.log({ diag });
            })();
          } catch (e) {
            console.error("ts diag error");
          }
          return model.getValue();
        },
        onChange: (cb) => model.onDidChangeContent(cb).dispose,
        myId: "editor"
      }));
    }, "setMonaco");
    const setAce = /* @__PURE__ */ __name(async () => {
      const { startAce } = await import("./chunk-startAce-OVNPG4HQ.mjs");
      const editor = await startAce(mST().code);
      changeContent((x) => ({
        ...x,
        onChange: (cb) => {
          editor.session.on("change", cb);
          return () => editor.session.off("change", cb);
        },
        started: true,
        getValue: () => editor.session.getValue(),
        setValue: (code2) => editor.session.setValue(code2),
        myId: "editor"
      }));
    }, "setAce");
    const loadEditors = /* @__PURE__ */ __name(async () => {
      if (engine === "monaco") {
        await setMonaco();
      } else {
        await setAce();
      }
      runner({ code: code + " ", counter, codeSpace: codeSpace2 });
    }, "loadEditors");
    loadEditors();
  }, [started, ref]);
  useEffect(() => {
    if (!started)
      return;
    const lastCode = mod.code;
    let last = 0;
    const handler = setInterval(() => {
      const now = Date.now();
      if (now - last < 5e3)
        return;
      last = now;
      if (getValue3() !== lastCode) {
        const code2 = getValue3();
        if (code2 === mST().code || code2 === mod.code)
          return;
        changeContent((x) => ({ ...x, myCode: code2, i: i + 1 }));
        runner({ code: code2, counter, codeSpace: codeSpace2 });
      }
    }, 5e3);
    return () => clearInterval(handler);
  }, [changeContent, i, runner, prettierJs]);
  useEffect(() => {
    if (!started)
      return;
    if (i > counter) {
      changeContent((x) => ({ ...x, myCode: code, counter: i }));
      return;
    }
    const cb = /* @__PURE__ */ __name(async () => {
      const code2 = getValue3();
      const newCode = prettierJs(code2);
      if (newCode === mod.code)
        return;
      if (newCode === mST().code)
        return;
      try {
        changeContent((x) => ({
          ...x,
          counter: counter + 1,
          myCode: newCode
        }));
        await runner({ code: newCode, counter: counter + 1, codeSpace: codeSpace2 });
      } catch (err) {
        console.error({ err });
        console.error("restore editor");
      }
    }, "cb");
    return onChange(() => cb());
  }, [setValue, getValue3, onChange, counter, prettierJs, runner]);
  onSessionUpdate(() => {
    console.log("sessUP");
    const sess = mST();
    setTimeout(() => {
      if (sess.i <= counter) {
        return;
      }
      if (mST().i > sess.i)
        return;
      setValue(sess.code);
      if (mod.CH() !== changeContent) {
        const ch = mod.CH();
        ch((x) => ({
          ...x,
          myCode: sess.code,
          counter: sess.i
        }));
      }
      changeContent((x) => ({
        ...x,
        myCode: sess.code,
        counter: sess.i
      }));
    }, 300);
  }, "editor");
  return engine === "monaco" ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", {
    "data-test-id": myId,
    css: import_react16.css`
        
            max-width: 640px;
              height: ${60 + lines / 40 * 100}%;
            
        `,
    ref
  }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", {
    "data-test-id": myId,
    css: import_react16.css`
                margin: 0;
                position: absolute;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
              `,
    id: "editor",
    ref
  });
}, "Editor");

// js/renderPreviewWindow.tsx
var import_jsx_runtime17 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var RainbowContainer = /* @__PURE__ */ __name(({ children }) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", {
  css: import_react19.css`
height: 100%;
width: 100%;
background-blend-mode: overlay;
background:  repeating-radial-gradient(circle at bottom left, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
            #e87f24 0, #e87f24 22.2222222222%, 
            #dd6227 0, #dd6227 27.7777777778%,
             #dc4c27 0, #dc4c27 33.3333333333%, 
            #ca3435 0, #ca3435 38.8888888889%, 
            #b82841 0, #b82841 44.4444444444%, 
            #953751 0, #953751 50%, #364c88 0, 
            #364c88 55.5555555556%, #16599d 0, 
            #16599d 61.1111111111%, #02609e 0, 
            #02609e 66.6666666667%, #0073a9 0, 
            #0073a9 72.2222222222%, #008aa4 0, 
            #008aa4 77.7777777778%, #239a87 0, 
            #239a87 83.3333333333%, #7cba6d 0, 
            #7cba6d 88.8888888889%, #becc2f 0, 
            #becc2f 94.4444444444%, #e0d81d 0, 
            #e0d81d 100%), 
            repeating-radial-gradient(circle at bottom right, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
              #e87f24 0, #e87f24 22.2222222222%, 
              #dd6227 0, #dd6227 27.7777777778%, 
              #dc4c27 0, #dc4c27 33.3333333333%, 
              #ca3435 0, #ca3435 38.8888888889%, 
              #b82841 0, #b82841 44.4444444444%, 
              #953751 0, #953751 50%,
               #364c88 0, #364c88 55.5555555556%, 
               #16599d 0, #16599d 61.1111111111%, 
               #02609e 0, #02609e 66.6666666667%, 
               #0073a9 0, #0073a9 72.2222222222%, 
               #008aa4 0, #008aa4 77.7777777778%,
                #239a87 0, #239a87 83.3333333333%, 
                #7cba6d 0, #7cba6d 88.8888888889%, 
                #becc2f 0, #becc2f 94.4444444444%, 
                #e0d81d 0, #e0d81d 100%);
`,
  children
}), "RainbowContainer");
var AppToRender = /* @__PURE__ */ __name(({ codeSpace: codeSpace2, assets }) => {
  const [hash, setHash] = useState(() => hashCode());
  const [isStandalone, setIsStandalone] = useState(true);
  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory();
          setHash(newHash);
        } catch (e) {
          console.error({ e });
        }
      }
    }, "myApp");
  }, [hash, setHash]);
  useEffect(() => {
    setTimeout(() => {
      const isStandalone2 = location.pathname.endsWith("public") || location.pathname.endsWith("hydrated");
      setIsStandalone(isStandalone2);
    }, 800);
  }, []);
  const portalNode = useMemo(() => createHtmlPortalNode({
    attributes: { id: `root-${codeSpace2}`, style: "height: 100%" }
  }), []);
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(p, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(InPortal, {
        node: portalNode,
        children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AutoUpdateApp, {
          hash,
          codeSpace: codeSpace2
        })
      }),
      isStandalone ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(OutPortal, {
        node: portalNode
      }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(RainbowContainer, {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(OutPortal, {
            node: portalNode
          }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Editor, {
            code: mST().code,
            i: mST().i,
            codeSpace: codeSpace2,
            assets
          }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DraggableWindow, {
            hashCode: 0,
            room: codeSpace2,
            children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(OutPortal, {
              node: portalNode
            })
          })
        ]
      })
    ]
  });
}, "AppToRender");
var renderPreviewWindow = /* @__PURE__ */ __name(({ codeSpace: codeSpace2, assets }) => {
  const div = document.getElementById("root");
  const root = createRoot(div);
  root.render(
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(p, {
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(AppToRender, {
        codeSpace: codeSpace2,
        assets
      })
    })
  );
}, "renderPreviewWindow");

// js/ws.ts
var import_lodash = __toESM(require_lodash(), 1);

// js/uidV4.mjs
init_define_process();
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    }
  }
  return getRandomValues(rnds8);
}
__name(rng, "rng");
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
__name(validate, "validate");
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function stringify(array) {
  const offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const uuid = (byteToHex[array[offset + 0]] + byteToHex[array[offset + 1]] + byteToHex[array[offset + 2]] + byteToHex[array[offset + 3]] + "-" + byteToHex[array[offset + 4]] + byteToHex[array[offset + 5]] + "-" + byteToHex[array[offset + 6]] + byteToHex[array[offset + 7]] + "-" + byteToHex[array[offset + 8]] + byteToHex[array[offset + 9]] + "-" + byteToHex[array[offset + 10]] + byteToHex[array[offset + 11]] + byteToHex[array[offset + 12]] + byteToHex[array[offset + 13]] + byteToHex[array[offset + 14]] + byteToHex[array[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
__name(stringify, "stringify");
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}
__name(v4, "v4");

// js/ws.ts
Object.assign(globalThis, require_buffer());
Object.assign(globalThis, require_stream_browserify());
var webRtcArray = [];
var user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || v4()).slice(
  0,
  8
);
var rtcConns = {};
var bc;
var codeSpace;
var address;
var wsLastHashCode = 0;
var webRTCLastSeenHashCode = 0;
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws = null;
var sendWS;
var rejoined = false;
var sendChannel = {
  webRtcArray,
  rtcConns,
  send: (data) => {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user
    });
    webRtcArray.map((ch) => {
      try {
        console.log("WebRtc send", data, ch);
        if (ch.readyState !== "open")
          return;
        if (!target || ch.target === target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (e) {
        console.error("Error in broadcasting event", { e });
      }
    });
  }
};
var run = /* @__PURE__ */ __name(async (startState) => {
  codeSpace = startState.codeSpace;
  address = startState.address;
  startSession(codeSpace, {
    name: user,
    state: startState.mST
  }, location.origin);
  bc = new BroadcastChannel("spike.land");
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user)
      return;
    console.log({ event });
    if (event.data.codeSpace === codeSpace && event.data.address && !address) {
      ws == null ? void 0 : ws.send(JSON.stringify({ codeSpace, address: event.data.address }));
    }
    if (event.data.ignoreUser) {
      !ignoreUsers.includes(event.data.ignoreUser) && ignoreUsers.push(event.data.ignoreUser);
    }
    if (event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code) {
      const messageData = await makePatch(event.data.sess);
      await applyPatch(messageData);
    }
  };
  onSessionUpdate(
    (_f, messageData) => bc.postMessage({
      ignoreUser: user,
      sess: mST(),
      codeSpace,
      address,
      messageData
    }),
    "broadcast"
  );
  await appFactory(startState.mST.transpiled);
  renderPreviewWindow(startState);
  join();
}, "run");
var intervalHandler = null;
async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;
    const newWs = await join();
    return newWs;
  }
  return ws;
}
__name(rejoin, "rejoin");
var ignoreUsers = [];
function saveCode() {
  debouncedSyncWs();
  debouncedSyncRTC();
}
__name(saveCode, "saveCode");
var debouncedSyncRTC = (0, import_lodash.default)(syncRTC, 100, {
  trailing: true,
  leading: true,
  maxWait: 500
});
var debouncedSyncWs = (0, import_lodash.default)(syncWS, 1200, {
  trailing: true,
  leading: true,
  maxWait: 2500
});
async function syncWS() {
  try {
    if (ws) {
      if (wsLastHashCode === hashCode())
        return;
      const sess = mST();
      console.log({ wsLastHashCode });
      const message = await makePatchFrom(
        wsLastHashCode,
        sess
      );
      if (!message)
        return;
      if (message.newHash !== hashCode()) {
        console.error("NEW hash is not even hashCode", hashCode());
        return;
      }
      const messageString = JSON.stringify({ ...message, name: user });
      sendWS(messageString);
    } else {
      rejoined = false;
      await rejoin();
    }
  } catch (e) {
    console.error("error 2", { e });
  }
}
__name(syncWS, "syncWS");
async function syncRTC() {
  try {
    if (Object.keys(rtcConns).length > 0) {
      if (webRTCLastSeenHashCode === hashCode())
        return;
      const sess = mST();
      console.log({ wsLastHashCode });
      const message = webRTCLastSeenHashCode ? await makePatchFrom(
        webRTCLastSeenHashCode,
        sess
      ) : await makePatch(sess);
      if (message && message.patch) {
        console.log("sendRTC");
        sendChannel.send(message);
      }
    }
  } catch (e) {
    console.error("Error sending RTC...", { e });
  }
}
__name(syncRTC, "syncRTC");
async function join() {
  if (ws !== null)
    return ws;
  rejoined = true;
  console.log("WS connect!");
  if (location.host.includes("localhost"))
    return;
  const wsConnection = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket"
  );
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    console.log("NEW WS CONNECTION");
    ws = wsConnection;
    const mess = /* @__PURE__ */ __name((data) => {
      try {
        ws && (ws == null ? void 0 : ws.send) && (ws == null ? void 0 : ws.send(data));
      } catch (e) {
        ws = null;
        rejoined = false;
        rejoin();
      }
    }, "mess");
    sendWS = mess;
    ws.addEventListener(
      "message",
      (message) => processWsMessage(message, "ws")
    );
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff = now - lastSeenNow;
      if (diff > 4e4) {
        try {
          if (wsConnection.readyState === wsConnection.OPEN) {
            return wsConnection == null ? void 0 : wsConnection.send(
              JSON.stringify({
                name: user,
                timestamp: lastSeenTimestamp + diff
              })
            );
          }
          rejoined = false;
          rejoin();
        } catch (e) {
          rejoined = false;
          rejoin();
        }
      }
    }, 3e4);
    wsConnection.send(JSON.stringify({ name: user }));
    return wsConnection;
  });
  return wsConnection;
}
__name(join, "join");
var h2 = {};
async function processWsMessage(event, source) {
  if (ws == null)
    return;
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  processData(data, source);
}
__name(processWsMessage, "processWsMessage");
async function processData(data, source) {
  console.log("ws", data.name, data.oldHash, data.newHash);
  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (source === "ws" && data.hashCode) {
    wsLastHashCode = data.hashCode;
  }
  if (source === "rtc" && data.hashCode || data.newHash) {
    webRTCLastSeenHashCode = data.hashCode || data.newHash;
  }
  if (ignoreUsers.includes(data.name))
    return;
  if (data.newHash === hashCode())
    return;
  if (data.oldHash && data.newHash) {
    if (h2[data.oldHash] && h2[data.oldHash] === data.newHash)
      return;
    h2[data.oldHash] = data.newHash;
  }
  if (data.newHash === hashCode())
    return;
  (async () => {
    try {
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }
      if (data.type === "offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }
      if (data.type === "answer") {
        await handleChatAnswerMessage(data.answer, data.name);
        return;
      }
      if (data.name && data.name !== user && !rtcConns[data.name]) {
        await createPeerConnection(data.name);
        return;
      }
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
    }
  })();
  if (data.patch && data.name !== user) {
    if (data.newHash === hashCode()) {
      return;
    }
    await applyPatch(data);
    if (data.newHash === hashCode()) {
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }
      return;
    } else {
      console.log("error -sending on sendChannel");
    }
    return;
  }
  if (data.patch && data.name === user) {
    wsLastHashCode = data.newHash;
    return;
  }
  if (data.name === user) {
    return;
  }
  if (wsLastHashCode !== hashCode()) {
  }
  function createPeerConnection(target) {
    log(`Setting up a connection with ${target}`);
    if (rtcConns[target]) {
      log(`Aborting, since we have connection with this ${target}`);
      return;
    }
    rtcConns[target] = new RTCPeerConnection(
      rcpOptions
    );
    rtcConns[target].onicecandidate = (event) => {
      if (event.candidate) {
        log("*** Outgoing ICE candidate: " + event.candidate);
        ws == null ? void 0 : ws.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event.candidate.toJSON()
        }));
      }
    };
    rtcConns[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    rtcConns[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    rtcConns[target].onsignalingstatechange = () => {
      log(
        "*** rtcConns[target].signalingState  changed to: " + rtcConns[target].signalingState
      );
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };
    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;
    rtcConns[target].ontrack = (ev) => console.log(ev);
    rtcConns[target].ondatachannel = (event) => {
      console.log("Receive Channel Callback");
      const rtc2 = event.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
      rtc2.addEventListener(
        "message",
        (message) => processWsMessage(message, "rtc")
      );
      const rtcWithTarget = Object.assign(rtc2, { target });
      webRtcArray.push(rtcWithTarget);
    };
    const dataChannelOptions = {
      ordered: true,
      reliable: true,
      maxPacketLifeTime: 3e3
    };
    const rtc = Object.assign(
      rtcConns[target].createDataChannel(
        target,
        dataChannelOptions
      ),
      { target }
    );
    rtc.binaryType = "arraybuffer";
    rtc.addEventListener("message", (message) => {
      console.log("***********RTC***", { msg: message });
      const data2 = JSON.parse(message.data);
      if (data2 && data2.hashCode) {
        webRTCLastSeenHashCode = data2.hashCode;
      }
      if (data2 && data2.newHash) {
        webRTCLastSeenHashCode = data2.newHash;
      }
      return processWsMessage(message, "rtc");
    });
    rtc.addEventListener("error", (error) => {
      console.log("xxxxxx-  Data Channel Error:", error);
    });
    rtc.addEventListener("open", () => {
      console.log("@@@@@@@@RTC IS OPEN&&&&&&&&");
      webRtcArray.push(rtc);
    });
    rtc.addEventListener("close", () => {
      console.log("xxxxxxxx- The Data Channel is Closed");
    });
    return rtcConns[target];
    function onReceiveChannelClosed() {
      console.log("Receive channel is closed");
      rtcConns[target].close();
      delete rtcConns[target];
      console.log("Closed remote peer connection");
    }
    __name(onReceiveChannelClosed, "onReceiveChannelClosed");
    async function handleNegotiationNeededEvent() {
      log("*** Negotiation needed");
      try {
        log("---> Creating offer");
        const offer = await rtcConns[target].createOffer();
        if (rtcConns[target].signalingState != "stable") {
          log("The connection isn't stable yet; postponing...");
          return;
        }
        log("---> Setting local description to the offer");
        await rtcConns[target].setLocalDescription(offer);
        log("---> Sending the offer to the remote peer");
        ws == null ? void 0 : ws.send(JSON.stringify({
          target,
          name: user,
          type: "offer",
          offer: rtcConns[target].localDescription
        }));
      } catch (e) {
        log(
          "*** The following error occurred while handling the negotiationneeded event:"
        );
      }
    }
    __name(handleNegotiationNeededEvent, "handleNegotiationNeededEvent");
    function handleICEConnectionStateChangeEvent() {
      log(
        "*** ICE connection state changed to " + rtcConns[target].iceConnectionState
      );
      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }
    __name(handleICEConnectionStateChangeEvent, "handleICEConnectionStateChangeEvent");
    function handleICEGatheringStateChangeEvent() {
      log(
        "*** rtcConns[target].iceGatheringState changed to: " + rtcConns[target].iceGatheringState
      );
    }
    __name(handleICEGatheringStateChangeEvent, "handleICEGatheringStateChangeEvent");
  }
  __name(createPeerConnection, "createPeerConnection");
  async function handleChatAnswerMessage(answer, target) {
    log("*** Call recipient has accepted our call");
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(
        answer
      )
    ).catch(console.error);
  }
  __name(handleChatAnswerMessage, "handleChatAnswerMessage");
  async function handleChatOffer(offer, target) {
    if (!rtcConns[target])
      createPeerConnection(target);
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    log("---> Creating and sending answer to caller");
    const answer = await rtcConns[target].createAnswer();
    await rtcConns[target].setLocalDescription(
      answer
    );
    ws == null ? void 0 : ws.send(JSON.stringify({
      target,
      name: user,
      type: "answer",
      answer
    }));
  }
  __name(handleChatOffer, "handleChatOffer");
}
__name(processData, "processData");
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
__name(log, "log");
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
__name(log_error, "log_error");
var rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`
  }))
};
rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302"
}];
async function handleNewICECandidateMessage(init, target) {
  log(
    "*** Adding received ICE candidate: " + JSON.stringify(init)
  );
  const candidate = new RTCIceCandidate(init);
  console.log(rtcConns[target]);
  await rtcConns[target].addIceCandidate(candidate);
}
__name(handleNewICECandidateMessage, "handleNewICECandidateMessage");
async function sw() {
  try {
    navigator.serviceWorker.onmessage = async (event) => {
      const serviceWorker = event.source;
      if (serviceWorker == null)
        return;
      switch (event.data.method) {
        case "ipfs-message-port":
          console.log("Message port request");
          const channel = new MessageChannel();
          return serviceWorker.postMessage({
            method: "ipfs-message-port",
            id: event.data.id,
            port: channel.port2
          }, { transfer: [channel.port2] });
      }
    };
    if (document.documentElement.dataset.viewer) {
      const load = /* @__PURE__ */ __name(async (path) => {
        const paths = path && path.split("/") || [];
        const protocol = paths[0] || "";
        switch (protocol) {
          case "ipfs":
          case "ipns": {
            document.body.innerHTML = `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
          }
        }
      }, "load");
      return load(location.pathname);
    }
  } catch (e) {
    console.log("ipfs load error");
  }
}
__name(sw, "sw");

export {
  run,
  saveCode,
  join,
  sw
};
