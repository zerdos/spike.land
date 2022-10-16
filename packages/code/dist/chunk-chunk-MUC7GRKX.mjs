import {
  transform
} from "./chunk-chunk-KVSVLQ6C.mjs";
import {
  wait
} from "./chunk-chunk-XKQSAEYU.mjs";
import {
  applyPatch,
  hashCode,
  mST,
  makePatch,
  makePatchFrom,
  md5,
  onSessionUpdate,
  patchSync,
  require_lodash,
  startSession
} from "./chunk-chunk-FN4A4NOQ.mjs";
import {
  wrap
} from "./chunk-chunk-47JOSZAC.mjs";
import {
  Children,
  PureComponent,
  S2,
  Suspense,
  __commonJS as __commonJS2,
  __toCommonJS,
  __toESM as __toESM2,
  cloneElement2,
  createElement2,
  createPortal,
  createRef2,
  createRoot,
  emotionCache_default,
  export_CacheProvider,
  export_css,
  init_define_process as init_define_process2,
  init_react_preact,
  isValidElement2,
  lazy,
  p,
  react_preact_default,
  react_preact_exports,
  require_emotion_cache_cjs,
  require_emotion_element_b63ca7c6_cjs_dev,
  require_emotion_react_isolated_hnrs_cjs_dev,
  require_emotion_serialize_cjs,
  require_emotion_use_insertion_effect_with_fallbacks_cjs,
  require_emotion_utils_cjs,
  require_emotion_weak_memoize_cjs,
  require_extends,
  require_hoist_non_react_statics_cjs,
  useEffect,
  useMemo,
  useRef,
  useState
} from "./chunk-chunk-7DZNTTAW.mjs";
import {
  init_define_process
} from "./chunk-chunk-5VN25EFX.mjs";
import {
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-chunk-72WFF2DN.mjs";

// ../../.yarn/global/cache/qrious-npm-4.0.2-9d7db0e444-9.zip/node_modules/qrious/dist/qrious.js
var require_qrious = __commonJS({
  "../../.yarn/global/cache/qrious-npm-4.0.2-9d7db0e444-9.zip/node_modules/qrious/dist/qrious.js"(exports, module) {
    init_define_process();
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.QRious = factory();
    })(exports, function() {
      "use strict";
      var Constructor = function() {
      };
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var slice = Array.prototype.slice;
      function createObject(prototype, properties) {
        var result;
        if (typeof Object.create === "function") {
          result = Object.create(prototype);
        } else {
          Constructor.prototype = prototype;
          result = new Constructor();
          Constructor.prototype = null;
        }
        if (properties) {
          extendObject(true, result, properties);
        }
        return result;
      }
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
          constructor = function() {
            return superConstructor.apply(this, arguments);
          };
        }
        extendObject(false, constructor, superConstructor, statics);
        constructor.prototype = createObject(superConstructor.prototype, prototype);
        constructor.prototype.constructor = constructor;
        constructor.class_ = name || superConstructor.class_;
        constructor.super_ = superConstructor;
        return constructor;
      }
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
      var extend_1 = extend;
      function Nevis() {
      }
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
          var padding = qrious.padding || 0;
          var pixels = Math.floor((qrious.size - padding * 2) / frame.width);
          return Math.max(1, pixels);
        },
        getOffset: function(frame) {
          var qrious = this.qrious;
          var padding = qrious.padding;
          if (padding != null) {
            return padding;
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
        var width = this.width = 17 + 4 * this._version;
        this.buffer = Frame._createArray(width * width);
        this._ecc = Frame._createArray(dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2);
        this._mask = Frame._createArray((width * (width + 1) + 1) / 2);
        this._insertFinders();
        this._insertAlignments();
        this.buffer[8 + width * (width - 8)] = 1;
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
          var width = this.width;
          buffer[x + width * y] = 1;
          for (i = -2; i < 2; i++) {
            buffer[x + i + width * (y - 2)] = 1;
            buffer[x - 2 + width * (y + i + 1)] = 1;
            buffer[x + 2 + width * (y + i)] = 1;
            buffer[x + i + 1 + width * (y + 2)] = 1;
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
          var width = this.width;
          switch (mask) {
            case 0:
              for (y = 0; y < width; y++) {
                for (x = 0; x < width; x++) {
                  if (!(x + y & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 1:
              for (y = 0; y < width; y++) {
                for (x = 0; x < width; x++) {
                  if (!(y & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 2:
              for (y = 0; y < width; y++) {
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!r3x && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 3:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = r3y, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!r3x && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 4:
              for (y = 0; y < width; y++) {
                for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                    r3y = !r3y;
                  }
                  if (!r3y && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 5:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 6:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
                  }
                }
              }
              break;
            case 7:
              for (r3y = 0, y = 0; y < width; y++, r3y++) {
                if (r3y === 3) {
                  r3y = 0;
                }
                for (r3x = 0, x = 0; x < width; x++, r3x++) {
                  if (r3x === 3) {
                    r3x = 0;
                  }
                  if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) {
                    buffer[x + y * width] ^= 1;
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
          var b, b1, h2, x, y;
          var bad = 0;
          var badness = this._badness;
          var buffer = this.buffer;
          var width = this.width;
          for (y = 0; y < width - 1; y++) {
            for (x = 0; x < width - 1; x++) {
              if (buffer[x + width * y] && buffer[x + 1 + width * y] && buffer[x + width * (y + 1)] && buffer[x + 1 + width * (y + 1)] || !(buffer[x + width * y] || buffer[x + 1 + width * y] || buffer[x + width * (y + 1)] || buffer[x + 1 + width * (y + 1)])) {
                bad += Frame.N2;
              }
            }
          }
          var bw = 0;
          for (y = 0; y < width; y++) {
            h2 = 0;
            badness[0] = 0;
            for (b = 0, x = 0; x < width; x++) {
              b1 = buffer[x + width * y];
              if (b === b1) {
                badness[h2]++;
              } else {
                badness[++h2] = 1;
              }
              b = b1;
              bw += b ? 1 : -1;
            }
            bad += this._getBadness(h2);
          }
          if (bw < 0) {
            bw = -bw;
          }
          var count = 0;
          var big = bw;
          big += big << 2;
          big <<= 1;
          while (big > width * width) {
            big -= width * width;
            count++;
          }
          bad += count * Frame.N4;
          for (x = 0; x < width; x++) {
            h2 = 0;
            badness[0] = 0;
            for (b = 0, y = 0; y < width; y++) {
              b1 = buffer[x + width * y];
              if (b === b1) {
                badness[h2]++;
              } else {
                badness[++h2] = 1;
              }
              b = b1;
            }
            bad += this._getBadness(h2);
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
          var width = this.width;
          for (i = 0; i < 8; i++, mask >>= 1) {
            if (mask & 1) {
              buffer[width - 1 - i + width * 8] = 1;
              if (i < 6) {
                buffer[8 + width * i] = 1;
              } else {
                buffer[8 + width * (i + 1)] = 1;
              }
            }
          }
          for (i = 0; i < 7; i++, mask >>= 1) {
            if (mask & 1) {
              buffer[8 + width * (width - 7 + i)] = 1;
              if (i) {
                buffer[6 - i + width * 8] = 1;
              } else {
                buffer[7 + width * 8] = 1;
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
          var width = this.width;
          if (version > 1) {
            i = Alignment_1.BLOCK[version];
            y = width - 7;
            for (; ; ) {
              x = width - 7;
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
          var width = this.width;
          for (i = 0; i < 3; i++) {
            j = 0;
            y = 0;
            if (i === 1) {
              j = width - 7;
            }
            if (i === 2) {
              y = width - 7;
            }
            buffer[y + 3 + width * (j + 3)] = 1;
            for (x = 0; x < 6; x++) {
              buffer[y + x + width * j] = 1;
              buffer[y + width * (j + x + 1)] = 1;
              buffer[y + 6 + width * (j + x)] = 1;
              buffer[y + x + 1 + width * (j + 6)] = 1;
            }
            for (x = 1; x < 5; x++) {
              this._setMask(y + x, j + 1);
              this._setMask(y + 1, j + x + 1);
              this._setMask(y + 5, j + x);
              this._setMask(y + x + 1, j + 5);
            }
            for (x = 2; x < 4; x++) {
              buffer[y + x + width * (j + 2)] = 1;
              buffer[y + 2 + width * (j + x + 1)] = 1;
              buffer[y + 4 + width * (j + x)] = 1;
              buffer[y + x + 1 + width * (j + 4)] = 1;
            }
          }
        },
        _insertTimingGap: function() {
          var x, y;
          var width = this.width;
          for (y = 0; y < 7; y++) {
            this._setMask(7, y);
            this._setMask(width - 8, y);
            this._setMask(7, y + width - 7);
          }
          for (x = 0; x < 8; x++) {
            this._setMask(x, 7);
            this._setMask(x + width - 8, 7);
            this._setMask(x, width - 8);
          }
        },
        _insertTimingRowAndColumn: function() {
          var x;
          var buffer = this.buffer;
          var width = this.width;
          for (x = 0; x < width - 14; x++) {
            if (x & 1) {
              this._setMask(8 + x, 6);
              this._setMask(6, 8 + x);
            } else {
              buffer[8 + x + width * 6] = 1;
              buffer[6 + width * (8 + x)] = 1;
            }
          }
        },
        _insertVersion: function() {
          var i, j, x, y;
          var buffer = this.buffer;
          var version = this._version;
          var width = this.width;
          if (version > 6) {
            i = Version_1.BLOCK[version - 7];
            j = 17;
            for (x = 0; x < 6; x++) {
              for (y = 0; y < 3; y++, j--) {
                if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
                  buffer[5 - x + width * (2 - y + width - 11)] = 1;
                  buffer[2 - y + width - 11 + width * (5 - x)] = 1;
                } else {
                  this._setMask(5 - x, 2 - y + width - 11);
                  this._setMask(2 - y + width - 11, 5 - x);
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
          var width = this.width;
          var x = width - 1;
          var y = width - 1;
          var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
          for (i = 0; i < length; i++) {
            bit = this._stringBuffer[i];
            for (j = 0; j < 8; j++, bit <<= 1) {
              if (128 & bit) {
                this.buffer[x + width * y] = 1;
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
                  } else if (y !== width - 1) {
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
          var width = this.width;
          for (x = 0; x < 9; x++) {
            this._setMask(x, 8);
          }
          for (x = 0; x < 8; x++) {
            this._setMask(x + width - 8, 8);
            this._setMask(8, x);
          }
          for (y = 0; y < 7; y++) {
            this._setMask(8, y + width - 7);
          }
        },
        _setMask: function(x, y) {
          var bit = Frame._getMaskBit(x, y);
          this._mask[bit] = 1;
        },
        _syncMask: function() {
          var x, y;
          var width = this.width;
          for (y = 0; y < width; y++) {
            for (x = 0; x <= y; x++) {
              if (this.buffer[x + width * y]) {
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

// ../../.yarn/global/cache/xterm-npm-5.0.0-5ced0288cb-9.zip/node_modules/xterm/lib/xterm.js
var require_xterm = __commonJS({
  "../../.yarn/global/cache/xterm-npm-5.0.0-5ced0288cb-9.zip/node_modules/xterm/lib/xterm.js"(exports, module) {
    init_define_process();
    !function(e, t) {
      if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
      else if ("function" == typeof define && define.amd)
        define([], t);
      else {
        var i = t();
        for (var s in i)
          ("object" == typeof exports ? exports : e)[s] = i[s];
      }
    }(self, function() {
      return (() => {
        "use strict";
        var e = { 4567: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.AccessibilityManager = void 0;
          const s2 = i2(9042), r = i2(6114), n = i2(9924), o = i2(3656), a = i2(844), h2 = i2(5596), c = i2(9631);
          class l extends a.Disposable {
            constructor(e3, t3) {
              super(), this._terminal = e3, this._renderService = t3, this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityTreeRoot = document.createElement("div"), this._accessibilityTreeRoot.classList.add("xterm-accessibility"), this._accessibilityTreeRoot.tabIndex = 0, this._rowContainer = document.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
              for (let e4 = 0; e4 < this._terminal.rows; e4++)
                this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
              if (this._topBoundaryFocusListener = (e4) => this._onBoundaryFocus(e4, 0), this._bottomBoundaryFocusListener = (e4) => this._onBoundaryFocus(e4, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityTreeRoot.appendChild(this._rowContainer), this._renderRowsDebouncer = new n.TimeBasedDebouncer(this._renderRows.bind(this)), this._refreshRows(), this._liveRegion = document.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityTreeRoot.appendChild(this._liveRegion), !this._terminal.element)
                throw new Error("Cannot enable accessibility before Terminal.open");
              this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityTreeRoot), this.register(this._renderRowsDebouncer), this.register(this._terminal.onResize((e4) => this._onResize(e4.rows))), this.register(this._terminal.onRender((e4) => this._refreshRows(e4.start, e4.end))), this.register(this._terminal.onScroll(() => this._refreshRows())), this.register(this._terminal.onA11yChar((e4) => this._onChar(e4))), this.register(this._terminal.onLineFeed(() => this._onChar("\n"))), this.register(this._terminal.onA11yTab((e4) => this._onTab(e4))), this.register(this._terminal.onKey((e4) => this._onKey(e4.key))), this.register(this._terminal.onBlur(() => this._clearLiveRegion())), this.register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._screenDprMonitor = new h2.ScreenDprMonitor(window), this.register(this._screenDprMonitor), this._screenDprMonitor.setListener(() => this._refreshRowsDimensions()), this.register((0, o.addDisposableDomListener)(window, "resize", () => this._refreshRowsDimensions()));
            }
            dispose() {
              super.dispose(), (0, c.removeElementFromParent)(this._accessibilityTreeRoot), this._rowElements.length = 0;
            }
            _onBoundaryFocus(e3, t3) {
              const i3 = e3.target, s3 = this._rowElements[0 === t3 ? 1 : this._rowElements.length - 2];
              if (i3.getAttribute("aria-posinset") === (0 === t3 ? "1" : `${this._terminal.buffer.lines.length}`))
                return;
              if (e3.relatedTarget !== s3)
                return;
              let r2, n2;
              if (0 === t3 ? (r2 = i3, n2 = this._rowElements.pop(), this._rowContainer.removeChild(n2)) : (r2 = this._rowElements.shift(), n2 = i3, this._rowContainer.removeChild(r2)), r2.removeEventListener("focus", this._topBoundaryFocusListener), n2.removeEventListener("focus", this._bottomBoundaryFocusListener), 0 === t3) {
                const e4 = this._createAccessibilityTreeNode();
                this._rowElements.unshift(e4), this._rowContainer.insertAdjacentElement("afterbegin", e4);
              } else {
                const e4 = this._createAccessibilityTreeNode();
                this._rowElements.push(e4), this._rowContainer.appendChild(e4);
              }
              this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(0 === t3 ? -1 : 1), this._rowElements[0 === t3 ? 1 : this._rowElements.length - 2].focus(), e3.preventDefault(), e3.stopImmediatePropagation();
            }
            _onResize(e3) {
              this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
              for (let e4 = this._rowContainer.children.length; e4 < this._terminal.rows; e4++)
                this._rowElements[e4] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[e4]);
              for (; this._rowElements.length > e3; )
                this._rowContainer.removeChild(this._rowElements.pop());
              this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
            }
            _createAccessibilityTreeNode() {
              const e3 = document.createElement("div");
              return e3.setAttribute("role", "listitem"), e3.tabIndex = -1, this._refreshRowDimensions(e3), e3;
            }
            _onTab(e3) {
              for (let t3 = 0; t3 < e3; t3++)
                this._onChar(" ");
            }
            _onChar(e3) {
              this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e3 && (this._charsToAnnounce += e3) : this._charsToAnnounce += e3, "\n" === e3 && (this._liveRegionLineCount++, 21 === this._liveRegionLineCount && (this._liveRegion.textContent += s2.tooMuchOutput)), r.isMac && this._liveRegion.textContent && this._liveRegion.textContent.length > 0 && !this._liveRegion.parentNode && setTimeout(() => {
                this._accessibilityTreeRoot.appendChild(this._liveRegion);
              }, 0));
            }
            _clearLiveRegion() {
              this._liveRegion.textContent = "", this._liveRegionLineCount = 0, r.isMac && (0, c.removeElementFromParent)(this._liveRegion);
            }
            _onKey(e3) {
              this._clearLiveRegion(), this._charsToConsume.push(e3);
            }
            _refreshRows(e3, t3) {
              this._renderRowsDebouncer.refresh(e3, t3, this._terminal.rows);
            }
            _renderRows(e3, t3) {
              const i3 = this._terminal.buffer, s3 = i3.lines.length.toString();
              for (let r2 = e3; r2 <= t3; r2++) {
                const e4 = i3.translateBufferLineToString(i3.ydisp + r2, true), t4 = (i3.ydisp + r2 + 1).toString(), n2 = this._rowElements[r2];
                n2 && (0 === e4.length ? n2.innerText = "\xA0" : n2.textContent = e4, n2.setAttribute("aria-posinset", t4), n2.setAttribute("aria-setsize", s3));
              }
              this._announceCharacters();
            }
            _refreshRowsDimensions() {
              if (this._renderService.dimensions.actualCellHeight) {
                this._rowElements.length !== this._terminal.rows && this._onResize(this._terminal.rows);
                for (let e3 = 0; e3 < this._terminal.rows; e3++)
                  this._refreshRowDimensions(this._rowElements[e3]);
              }
            }
            _refreshRowDimensions(e3) {
              e3.style.height = `${this._renderService.dimensions.actualCellHeight}px`;
            }
            _announceCharacters() {
              0 !== this._charsToAnnounce.length && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
            }
          }
          t2.AccessibilityManager = l;
        }, 3614: (e2, t2) => {
          function i2(e3) {
            return e3.replace(/\r?\n/g, "\r");
          }
          function s2(e3, t3) {
            return t3 ? "\x1B[200~" + e3 + "\x1B[201~" : e3;
          }
          function r(e3, t3, r2) {
            e3 = s2(e3 = i2(e3), r2.decPrivateModes.bracketedPasteMode), r2.triggerDataEvent(e3, true), t3.value = "";
          }
          function n(e3, t3, i3) {
            const s3 = i3.getBoundingClientRect(), r2 = e3.clientX - s3.left - 10, n2 = e3.clientY - s3.top - 10;
            t3.style.width = "20px", t3.style.height = "20px", t3.style.left = `${r2}px`, t3.style.top = `${n2}px`, t3.style.zIndex = "1000", t3.focus();
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.rightClickHandler = t2.moveTextAreaUnderMouseCursor = t2.paste = t2.handlePasteEvent = t2.copyHandler = t2.bracketTextForPaste = t2.prepareTextForTerminal = void 0, t2.prepareTextForTerminal = i2, t2.bracketTextForPaste = s2, t2.copyHandler = function(e3, t3) {
            e3.clipboardData && e3.clipboardData.setData("text/plain", t3.selectionText), e3.preventDefault();
          }, t2.handlePasteEvent = function(e3, t3, i3) {
            e3.stopPropagation(), e3.clipboardData && r(e3.clipboardData.getData("text/plain"), t3, i3);
          }, t2.paste = r, t2.moveTextAreaUnderMouseCursor = n, t2.rightClickHandler = function(e3, t3, i3, s3, r2) {
            n(e3, t3, i3), r2 && s3.rightClickSelect(e3), t3.value = s3.selectionText, t3.select();
          };
        }, 7239: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorContrastCache = void 0;
          const s2 = i2(1505);
          t2.ColorContrastCache = class {
            constructor() {
              this._color = new s2.TwoKeyMap(), this._css = new s2.TwoKeyMap();
            }
            setCss(e3, t3, i3) {
              this._css.set(e3, t3, i3);
            }
            getCss(e3, t3) {
              return this._css.get(e3, t3);
            }
            setColor(e3, t3, i3) {
              this._color.set(e3, t3, i3);
            }
            getColor(e3, t3) {
              return this._color.get(e3, t3);
            }
            clear() {
              this._color.clear(), this._css.clear();
            }
          };
        }, 5680: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorManager = t2.DEFAULT_ANSI_COLORS = void 0;
          const s2 = i2(8055), r = i2(7239), n = s2.css.toColor("#ffffff"), o = s2.css.toColor("#000000"), a = s2.css.toColor("#ffffff"), h2 = s2.css.toColor("#000000"), c = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
          t2.DEFAULT_ANSI_COLORS = Object.freeze((() => {
            const e3 = [s2.css.toColor("#2e3436"), s2.css.toColor("#cc0000"), s2.css.toColor("#4e9a06"), s2.css.toColor("#c4a000"), s2.css.toColor("#3465a4"), s2.css.toColor("#75507b"), s2.css.toColor("#06989a"), s2.css.toColor("#d3d7cf"), s2.css.toColor("#555753"), s2.css.toColor("#ef2929"), s2.css.toColor("#8ae234"), s2.css.toColor("#fce94f"), s2.css.toColor("#729fcf"), s2.css.toColor("#ad7fa8"), s2.css.toColor("#34e2e2"), s2.css.toColor("#eeeeec")], t3 = [0, 95, 135, 175, 215, 255];
            for (let i3 = 0; i3 < 216; i3++) {
              const r2 = t3[i3 / 36 % 6 | 0], n2 = t3[i3 / 6 % 6 | 0], o2 = t3[i3 % 6];
              e3.push({ css: s2.channels.toCss(r2, n2, o2), rgba: s2.channels.toRgba(r2, n2, o2) });
            }
            for (let t4 = 0; t4 < 24; t4++) {
              const i3 = 8 + 10 * t4;
              e3.push({ css: s2.channels.toCss(i3, i3, i3), rgba: s2.channels.toRgba(i3, i3, i3) });
            }
            return e3;
          })()), t2.ColorManager = class {
            constructor(e3, i3) {
              this.allowTransparency = i3;
              const l = e3.createElement("canvas");
              l.width = 1, l.height = 1;
              const d = l.getContext("2d");
              if (!d)
                throw new Error("Could not get rendering context");
              this._ctx = d, this._ctx.globalCompositeOperation = "copy", this._litmusColor = this._ctx.createLinearGradient(0, 0, 1, 1), this._contrastCache = new r.ColorContrastCache(), this.colors = { foreground: n, background: o, cursor: a, cursorAccent: h2, selectionForeground: void 0, selectionBackgroundTransparent: c, selectionBackgroundOpaque: s2.color.blend(o, c), selectionInactiveBackgroundTransparent: c, selectionInactiveBackgroundOpaque: s2.color.blend(o, c), ansi: t2.DEFAULT_ANSI_COLORS.slice(), contrastCache: this._contrastCache }, this._updateRestoreColors();
            }
            onOptionsChange(e3, t3) {
              switch (e3) {
                case "minimumContrastRatio":
                  this._contrastCache.clear();
                  break;
                case "allowTransparency":
                  this.allowTransparency = t3;
              }
            }
            setTheme(e3 = {}) {
              this.colors.foreground = this._parseColor(e3.foreground, n), this.colors.background = this._parseColor(e3.background, o), this.colors.cursor = this._parseColor(e3.cursor, a, true), this.colors.cursorAccent = this._parseColor(e3.cursorAccent, h2, true), this.colors.selectionBackgroundTransparent = this._parseColor(e3.selectionBackground, c, true), this.colors.selectionBackgroundOpaque = s2.color.blend(this.colors.background, this.colors.selectionBackgroundTransparent), this.colors.selectionInactiveBackgroundTransparent = this._parseColor(e3.selectionInactiveBackground, this.colors.selectionBackgroundTransparent, true), this.colors.selectionInactiveBackgroundOpaque = s2.color.blend(this.colors.background, this.colors.selectionInactiveBackgroundTransparent);
              const i3 = { css: "", rgba: 0 };
              if (this.colors.selectionForeground = e3.selectionForeground ? this._parseColor(e3.selectionForeground, i3) : void 0, this.colors.selectionForeground === i3 && (this.colors.selectionForeground = void 0), s2.color.isOpaque(this.colors.selectionBackgroundTransparent)) {
                const e4 = 0.3;
                this.colors.selectionBackgroundTransparent = s2.color.opacity(this.colors.selectionBackgroundTransparent, e4);
              }
              if (s2.color.isOpaque(this.colors.selectionInactiveBackgroundTransparent)) {
                const e4 = 0.3;
                this.colors.selectionInactiveBackgroundTransparent = s2.color.opacity(this.colors.selectionInactiveBackgroundTransparent, e4);
              }
              if (this.colors.ansi = t2.DEFAULT_ANSI_COLORS.slice(), this.colors.ansi[0] = this._parseColor(e3.black, t2.DEFAULT_ANSI_COLORS[0]), this.colors.ansi[1] = this._parseColor(e3.red, t2.DEFAULT_ANSI_COLORS[1]), this.colors.ansi[2] = this._parseColor(e3.green, t2.DEFAULT_ANSI_COLORS[2]), this.colors.ansi[3] = this._parseColor(e3.yellow, t2.DEFAULT_ANSI_COLORS[3]), this.colors.ansi[4] = this._parseColor(e3.blue, t2.DEFAULT_ANSI_COLORS[4]), this.colors.ansi[5] = this._parseColor(e3.magenta, t2.DEFAULT_ANSI_COLORS[5]), this.colors.ansi[6] = this._parseColor(e3.cyan, t2.DEFAULT_ANSI_COLORS[6]), this.colors.ansi[7] = this._parseColor(e3.white, t2.DEFAULT_ANSI_COLORS[7]), this.colors.ansi[8] = this._parseColor(e3.brightBlack, t2.DEFAULT_ANSI_COLORS[8]), this.colors.ansi[9] = this._parseColor(e3.brightRed, t2.DEFAULT_ANSI_COLORS[9]), this.colors.ansi[10] = this._parseColor(e3.brightGreen, t2.DEFAULT_ANSI_COLORS[10]), this.colors.ansi[11] = this._parseColor(e3.brightYellow, t2.DEFAULT_ANSI_COLORS[11]), this.colors.ansi[12] = this._parseColor(e3.brightBlue, t2.DEFAULT_ANSI_COLORS[12]), this.colors.ansi[13] = this._parseColor(e3.brightMagenta, t2.DEFAULT_ANSI_COLORS[13]), this.colors.ansi[14] = this._parseColor(e3.brightCyan, t2.DEFAULT_ANSI_COLORS[14]), this.colors.ansi[15] = this._parseColor(e3.brightWhite, t2.DEFAULT_ANSI_COLORS[15]), e3.extendedAnsi) {
                const i4 = Math.min(this.colors.ansi.length - 16, e3.extendedAnsi.length);
                for (let s3 = 0; s3 < i4; s3++)
                  this.colors.ansi[s3 + 16] = this._parseColor(e3.extendedAnsi[s3], t2.DEFAULT_ANSI_COLORS[s3 + 16]);
              }
              this._contrastCache.clear(), this._updateRestoreColors();
            }
            restoreColor(e3) {
              if (void 0 !== e3)
                switch (e3) {
                  case 256:
                    this.colors.foreground = this._restoreColors.foreground;
                    break;
                  case 257:
                    this.colors.background = this._restoreColors.background;
                    break;
                  case 258:
                    this.colors.cursor = this._restoreColors.cursor;
                    break;
                  default:
                    this.colors.ansi[e3] = this._restoreColors.ansi[e3];
                }
              else
                for (let e4 = 0; e4 < this._restoreColors.ansi.length; ++e4)
                  this.colors.ansi[e4] = this._restoreColors.ansi[e4];
            }
            _updateRestoreColors() {
              this._restoreColors = { foreground: this.colors.foreground, background: this.colors.background, cursor: this.colors.cursor, ansi: this.colors.ansi.slice() };
            }
            _parseColor(e3, t3, i3 = this.allowTransparency) {
              if (void 0 === e3)
                return t3;
              if (this._ctx.fillStyle = this._litmusColor, this._ctx.fillStyle = e3, "string" != typeof this._ctx.fillStyle)
                return console.warn(`Color: ${e3} is invalid using fallback ${t3.css}`), t3;
              this._ctx.fillRect(0, 0, 1, 1);
              const r2 = this._ctx.getImageData(0, 0, 1, 1).data;
              if (255 !== r2[3]) {
                if (!i3)
                  return console.warn(`Color: ${e3} is using transparency, but allowTransparency is false. Using fallback ${t3.css}.`), t3;
                const [r3, n2, o2, a2] = this._ctx.fillStyle.substring(5, this._ctx.fillStyle.length - 1).split(",").map((e4) => Number(e4)), h3 = Math.round(255 * a2);
                return { rgba: s2.channels.toRgba(r3, n2, o2, h3), css: e3 };
              }
              return { css: this._ctx.fillStyle, rgba: s2.channels.toRgba(r2[0], r2[1], r2[2], r2[3]) };
            }
          };
        }, 9631: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.removeElementFromParent = void 0, t2.removeElementFromParent = function(...e3) {
            var t3;
            for (const i2 of e3)
              null === (t3 = null == i2 ? void 0 : i2.parentElement) || void 0 === t3 || t3.removeChild(i2);
          };
        }, 3656: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.addDisposableDomListener = void 0, t2.addDisposableDomListener = function(e3, t3, i2, s2) {
            e3.addEventListener(t3, i2, s2);
            let r = false;
            return { dispose: () => {
              r || (r = true, e3.removeEventListener(t3, i2, s2));
            } };
          };
        }, 6465: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.Linkifier2 = void 0;
          const n = i2(2585), o = i2(8460), a = i2(844), h2 = i2(3656);
          let c = class extends a.Disposable {
            constructor(e3) {
              super(), this._bufferService = e3, this._linkProviders = [], this._linkCacheDisposables = [], this._isMouseOut = true, this._activeLine = -1, this._onShowLinkUnderline = this.register(new o.EventEmitter()), this._onHideLinkUnderline = this.register(new o.EventEmitter()), this.register((0, a.getDisposeArrayDisposable)(this._linkCacheDisposables));
            }
            get currentLink() {
              return this._currentLink;
            }
            get onShowLinkUnderline() {
              return this._onShowLinkUnderline.event;
            }
            get onHideLinkUnderline() {
              return this._onHideLinkUnderline.event;
            }
            dispose() {
              super.dispose(), this._lastMouseEvent = void 0;
            }
            registerLinkProvider(e3) {
              return this._linkProviders.push(e3), { dispose: () => {
                const t3 = this._linkProviders.indexOf(e3);
                -1 !== t3 && this._linkProviders.splice(t3, 1);
              } };
            }
            attachToDom(e3, t3, i3) {
              this._element = e3, this._mouseService = t3, this._renderService = i3, this.register((0, h2.addDisposableDomListener)(this._element, "mouseleave", () => {
                this._isMouseOut = true, this._clearCurrentLink();
              })), this.register((0, h2.addDisposableDomListener)(this._element, "mousemove", this._onMouseMove.bind(this))), this.register((0, h2.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, h2.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
            }
            _onMouseMove(e3) {
              if (this._lastMouseEvent = e3, !this._element || !this._mouseService)
                return;
              const t3 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
              if (!t3)
                return;
              this._isMouseOut = false;
              const i3 = e3.composedPath();
              for (let e4 = 0; e4 < i3.length; e4++) {
                const t4 = i3[e4];
                if (t4.classList.contains("xterm"))
                  break;
                if (t4.classList.contains("xterm-hover"))
                  return;
              }
              this._lastBufferCell && t3.x === this._lastBufferCell.x && t3.y === this._lastBufferCell.y || (this._onHover(t3), this._lastBufferCell = t3);
            }
            _onHover(e3) {
              if (this._activeLine !== e3.y)
                return this._clearCurrentLink(), void this._askForLink(e3, false);
              this._currentLink && this._linkAtPosition(this._currentLink.link, e3) || (this._clearCurrentLink(), this._askForLink(e3, true));
            }
            _askForLink(e3, t3) {
              var i3, s3;
              this._activeProviderReplies && t3 || (null === (i3 = this._activeProviderReplies) || void 0 === i3 || i3.forEach((e4) => {
                null == e4 || e4.forEach((e5) => {
                  e5.link.dispose && e5.link.dispose();
                });
              }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e3.y);
              let r2 = false;
              for (const [i4, n2] of this._linkProviders.entries())
                t3 ? (null === (s3 = this._activeProviderReplies) || void 0 === s3 ? void 0 : s3.get(i4)) && (r2 = this._checkLinkProviderResult(i4, e3, r2)) : n2.provideLinks(e3.y, (t4) => {
                  var s4, n3;
                  if (this._isMouseOut)
                    return;
                  const o2 = null == t4 ? void 0 : t4.map((e4) => ({ link: e4 }));
                  null === (s4 = this._activeProviderReplies) || void 0 === s4 || s4.set(i4, o2), r2 = this._checkLinkProviderResult(i4, e3, r2), (null === (n3 = this._activeProviderReplies) || void 0 === n3 ? void 0 : n3.size) === this._linkProviders.length && this._removeIntersectingLinks(e3.y, this._activeProviderReplies);
                });
            }
            _removeIntersectingLinks(e3, t3) {
              const i3 = /* @__PURE__ */ new Set();
              for (let s3 = 0; s3 < t3.size; s3++) {
                const r2 = t3.get(s3);
                if (r2)
                  for (let t4 = 0; t4 < r2.length; t4++) {
                    const s4 = r2[t4], n2 = s4.link.range.start.y < e3 ? 0 : s4.link.range.start.x, o2 = s4.link.range.end.y > e3 ? this._bufferService.cols : s4.link.range.end.x;
                    for (let e4 = n2; e4 <= o2; e4++) {
                      if (i3.has(e4)) {
                        r2.splice(t4--, 1);
                        break;
                      }
                      i3.add(e4);
                    }
                  }
              }
            }
            _checkLinkProviderResult(e3, t3, i3) {
              var s3;
              if (!this._activeProviderReplies)
                return i3;
              const r2 = this._activeProviderReplies.get(e3);
              let n2 = false;
              for (let t4 = 0; t4 < e3; t4++)
                this._activeProviderReplies.has(t4) && !this._activeProviderReplies.get(t4) || (n2 = true);
              if (!n2 && r2) {
                const e4 = r2.find((e5) => this._linkAtPosition(e5.link, t3));
                e4 && (i3 = true, this._handleNewLink(e4));
              }
              if (this._activeProviderReplies.size === this._linkProviders.length && !i3)
                for (let e4 = 0; e4 < this._activeProviderReplies.size; e4++) {
                  const r3 = null === (s3 = this._activeProviderReplies.get(e4)) || void 0 === s3 ? void 0 : s3.find((e5) => this._linkAtPosition(e5.link, t3));
                  if (r3) {
                    i3 = true, this._handleNewLink(r3);
                    break;
                  }
                }
              return i3;
            }
            _handleMouseDown() {
              this._mouseDownLink = this._currentLink;
            }
            _handleMouseUp(e3) {
              if (!this._element || !this._mouseService || !this._currentLink)
                return;
              const t3 = this._positionFromMouseEvent(e3, this._element, this._mouseService);
              t3 && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, t3) && this._currentLink.link.activate(e3, this._currentLink.link.text);
            }
            _clearCurrentLink(e3, t3) {
              this._element && this._currentLink && this._lastMouseEvent && (!e3 || !t3 || this._currentLink.link.range.start.y >= e3 && this._currentLink.link.range.end.y <= t3) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, a.disposeArray)(this._linkCacheDisposables));
            }
            _handleNewLink(e3) {
              if (!this._element || !this._lastMouseEvent || !this._mouseService)
                return;
              const t3 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
              t3 && this._linkAtPosition(e3.link, t3) && (this._currentLink = e3, this._currentLink.state = { decorations: { underline: void 0 === e3.link.decorations || e3.link.decorations.underline, pointerCursor: void 0 === e3.link.decorations || e3.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e3.link, this._lastMouseEvent), e3.link.decorations = {}, Object.defineProperties(e3.link.decorations, { pointerCursor: { get: () => {
                var e4, t4;
                return null === (t4 = null === (e4 = this._currentLink) || void 0 === e4 ? void 0 : e4.state) || void 0 === t4 ? void 0 : t4.decorations.pointerCursor;
              }, set: (e4) => {
                var t4, i3;
                (null === (t4 = this._currentLink) || void 0 === t4 ? void 0 : t4.state) && this._currentLink.state.decorations.pointerCursor !== e4 && (this._currentLink.state.decorations.pointerCursor = e4, this._currentLink.state.isHovered && (null === (i3 = this._element) || void 0 === i3 || i3.classList.toggle("xterm-cursor-pointer", e4)));
              } }, underline: { get: () => {
                var e4, t4;
                return null === (t4 = null === (e4 = this._currentLink) || void 0 === e4 ? void 0 : e4.state) || void 0 === t4 ? void 0 : t4.decorations.underline;
              }, set: (t4) => {
                var i3, s3, r2;
                (null === (i3 = this._currentLink) || void 0 === i3 ? void 0 : i3.state) && (null === (r2 = null === (s3 = this._currentLink) || void 0 === s3 ? void 0 : s3.state) || void 0 === r2 ? void 0 : r2.decorations.underline) !== t4 && (this._currentLink.state.decorations.underline = t4, this._currentLink.state.isHovered && this._fireUnderlineEvent(e3.link, t4));
              } } }), this._renderService && this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((e4) => {
                const t4 = 0 === e4.start ? 0 : e4.start + 1 + this._bufferService.buffer.ydisp;
                this._clearCurrentLink(t4, e4.end + 1 + this._bufferService.buffer.ydisp);
              })));
            }
            _linkHover(e3, t3, i3) {
              var s3;
              (null === (s3 = this._currentLink) || void 0 === s3 ? void 0 : s3.state) && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t3, true), this._currentLink.state.decorations.pointerCursor && e3.classList.add("xterm-cursor-pointer")), t3.hover && t3.hover(i3, t3.text);
            }
            _fireUnderlineEvent(e3, t3) {
              const i3 = e3.range, s3 = this._bufferService.buffer.ydisp, r2 = this._createLinkUnderlineEvent(i3.start.x - 1, i3.start.y - s3 - 1, i3.end.x, i3.end.y - s3 - 1, void 0);
              (t3 ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(r2);
            }
            _linkLeave(e3, t3, i3) {
              var s3;
              (null === (s3 = this._currentLink) || void 0 === s3 ? void 0 : s3.state) && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(t3, false), this._currentLink.state.decorations.pointerCursor && e3.classList.remove("xterm-cursor-pointer")), t3.leave && t3.leave(i3, t3.text);
            }
            _linkAtPosition(e3, t3) {
              const i3 = e3.range.start.y === e3.range.end.y, s3 = e3.range.start.y < t3.y, r2 = e3.range.end.y > t3.y;
              return (i3 && e3.range.start.x <= t3.x && e3.range.end.x >= t3.x || s3 && e3.range.end.x >= t3.x || r2 && e3.range.start.x <= t3.x || s3 && r2) && e3.range.start.y <= t3.y && e3.range.end.y >= t3.y;
            }
            _positionFromMouseEvent(e3, t3, i3) {
              const s3 = i3.getCoords(e3, t3, this._bufferService.cols, this._bufferService.rows);
              if (s3)
                return { x: s3[0], y: s3[1] + this._bufferService.buffer.ydisp };
            }
            _createLinkUnderlineEvent(e3, t3, i3, s3, r2) {
              return { x1: e3, y1: t3, x2: i3, y2: s3, cols: this._bufferService.cols, fg: r2 };
            }
          };
          c = s2([r(0, n.IBufferService)], c), t2.Linkifier2 = c;
        }, 9042: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.tooMuchOutput = t2.promptLabel = void 0, t2.promptLabel = "Terminal input", t2.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
        }, 2962: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.OscLinkProvider = void 0;
          const n = i2(511), o = i2(2585);
          let a = class {
            constructor(e3, t3, i3) {
              this._bufferService = e3, this._optionsService = t3, this._oscLinkService = i3;
            }
            provideLinks(e3, t3) {
              var i3;
              const s3 = this._bufferService.buffer.lines.get(e3 - 1);
              if (!s3)
                return void t3(void 0);
              const r2 = [], o2 = this._optionsService.rawOptions.linkHandler, a2 = new n.CellData(), c = s3.getTrimmedLength();
              let l = -1, d = -1, _ = false;
              for (let t4 = 0; t4 < c; t4++)
                if (-1 !== d || s3.hasContent(t4)) {
                  if (s3.loadCell(t4, a2), a2.hasExtendedAttrs() && a2.extended.urlId) {
                    if (-1 === d) {
                      d = t4, l = a2.extended.urlId;
                      continue;
                    }
                    _ = a2.extended.urlId !== l;
                  } else
                    -1 !== d && (_ = true);
                  if (_ || -1 !== d && t4 === c - 1) {
                    const s4 = null === (i3 = this._oscLinkService.getLinkData(l)) || void 0 === i3 ? void 0 : i3.uri;
                    if (s4) {
                      const i4 = { start: { x: d + 1, y: e3 }, end: { x: t4 + (_ || t4 !== c - 1 ? 0 : 1), y: e3 } };
                      r2.push({ text: s4, range: i4, activate: (e4, t5) => o2 ? o2.activate(e4, t5, i4) : h2(0, t5), hover: (e4, t5) => {
                        var s5;
                        return null === (s5 = null == o2 ? void 0 : o2.hover) || void 0 === s5 ? void 0 : s5.call(o2, e4, t5, i4);
                      }, leave: (e4, t5) => {
                        var s5;
                        return null === (s5 = null == o2 ? void 0 : o2.leave) || void 0 === s5 ? void 0 : s5.call(o2, e4, t5, i4);
                      } });
                    }
                    _ = false, a2.hasExtendedAttrs() && a2.extended.urlId ? (d = t4, l = a2.extended.urlId) : (d = -1, l = -1);
                  }
                }
              t3(r2);
            }
          };
          function h2(e3, t3) {
            if (confirm(`Do you want to navigate to ${t3}?`)) {
              const e4 = window.open();
              if (e4) {
                try {
                  e4.opener = null;
                } catch (e5) {
                }
                e4.location.href = t3;
              } else
                console.warn("Opening link blocked as opener could not be cleared");
            }
          }
          a = s2([r(0, o.IBufferService), r(1, o.IOptionsService), r(2, o.IOscLinkService)], a), t2.OscLinkProvider = a;
        }, 6193: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.RenderDebouncer = void 0, t2.RenderDebouncer = class {
            constructor(e3, t3) {
              this._parentWindow = e3, this._renderCallback = t3, this._refreshCallbacks = [];
            }
            dispose() {
              this._animationFrame && (this._parentWindow.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
            }
            addRefreshCallback(e3) {
              return this._refreshCallbacks.push(e3), this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
            }
            refresh(e3, t3, i2) {
              this._rowCount = i2, e3 = void 0 !== e3 ? e3 : 0, t3 = void 0 !== t3 ? t3 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e3) : e3, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t3) : t3, this._animationFrame || (this._animationFrame = this._parentWindow.requestAnimationFrame(() => this._innerRefresh()));
            }
            _innerRefresh() {
              if (this._animationFrame = void 0, void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount)
                return void this._runRefreshCallbacks();
              const e3 = Math.max(this._rowStart, 0), t3 = Math.min(this._rowEnd, this._rowCount - 1);
              this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e3, t3), this._runRefreshCallbacks();
            }
            _runRefreshCallbacks() {
              for (const e3 of this._refreshCallbacks)
                e3(0);
              this._refreshCallbacks = [];
            }
          };
        }, 5596: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ScreenDprMonitor = void 0;
          const s2 = i2(844);
          class r extends s2.Disposable {
            constructor(e3) {
              super(), this._parentWindow = e3, this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio;
            }
            setListener(e3) {
              this._listener && this.clearListener(), this._listener = e3, this._outerListener = () => {
                this._listener && (this._listener(this._parentWindow.devicePixelRatio, this._currentDevicePixelRatio), this._updateDpr());
              }, this._updateDpr();
            }
            dispose() {
              super.dispose(), this.clearListener();
            }
            _updateDpr() {
              var e3;
              this._outerListener && (null === (e3 = this._resolutionMediaMatchList) || void 0 === e3 || e3.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
            }
            clearListener() {
              this._resolutionMediaMatchList && this._listener && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._listener = void 0, this._outerListener = void 0);
            }
          }
          t2.ScreenDprMonitor = r;
        }, 3236: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.Terminal = void 0;
          const s2 = i2(2950), r = i2(1680), n = i2(3614), o = i2(2584), a = i2(5435), h2 = i2(9312), c = i2(6114), l = i2(3656), d = i2(9042), _ = i2(4567), u = i2(1296), f = i2(7399), v = i2(8460), g = i2(8437), p2 = i2(5680), S = i2(3230), m3 = i2(4725), C = i2(428), b = i2(8934), y = i2(6465), w = i2(5114), E = i2(8969), L = i2(8055), R = i2(4269), k = i2(5941), D = i2(3107), A = i2(5744), x = i2(9074), B = i2(2585), T = i2(2962), M = "undefined" != typeof window ? window.document : null;
          class O extends E.CoreTerminal {
            constructor(e3 = {}) {
              super(e3), this.browser = c, this._keyDownHandled = false, this._keyDownSeen = false, this._keyPressHandled = false, this._unprocessedDeadKey = false, this._onCursorMove = new v.EventEmitter(), this._onKey = new v.EventEmitter(), this._onRender = new v.EventEmitter(), this._onSelectionChange = new v.EventEmitter(), this._onTitleChange = new v.EventEmitter(), this._onBell = new v.EventEmitter(), this._onFocus = new v.EventEmitter(), this._onBlur = new v.EventEmitter(), this._onA11yCharEmitter = new v.EventEmitter(), this._onA11yTabEmitter = new v.EventEmitter(), this._setup(), this.linkifier2 = this.register(this._instantiationService.createInstance(y.Linkifier2)), this.linkifier2.registerLinkProvider(this._instantiationService.createInstance(T.OscLinkProvider)), this._decorationService = this._instantiationService.createInstance(x.DecorationService), this._instantiationService.setService(B.IDecorationService, this._decorationService), this.register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this.register(this._inputHandler.onRequestRefreshRows((e4, t3) => this.refresh(e4, t3))), this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this.register(this._inputHandler.onRequestReset(() => this.reset())), this.register(this._inputHandler.onRequestWindowsOptionsReport((e4) => this._reportWindowsOptions(e4))), this.register(this._inputHandler.onColor((e4) => this._handleColorEvent(e4))), this.register((0, v.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, v.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, v.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, v.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize((e4) => this._afterResize(e4.cols, e4.rows)));
            }
            get onCursorMove() {
              return this._onCursorMove.event;
            }
            get onKey() {
              return this._onKey.event;
            }
            get onRender() {
              return this._onRender.event;
            }
            get onSelectionChange() {
              return this._onSelectionChange.event;
            }
            get onTitleChange() {
              return this._onTitleChange.event;
            }
            get onBell() {
              return this._onBell.event;
            }
            get onFocus() {
              return this._onFocus.event;
            }
            get onBlur() {
              return this._onBlur.event;
            }
            get onA11yChar() {
              return this._onA11yCharEmitter.event;
            }
            get onA11yTab() {
              return this._onA11yTabEmitter.event;
            }
            _handleColorEvent(e3) {
              var t3, i3;
              if (this._colorManager) {
                for (const t4 of e3) {
                  let e4, i4 = "";
                  switch (t4.index) {
                    case 256:
                      e4 = "foreground", i4 = "10";
                      break;
                    case 257:
                      e4 = "background", i4 = "11";
                      break;
                    case 258:
                      e4 = "cursor", i4 = "12";
                      break;
                    default:
                      e4 = "ansi", i4 = "4;" + t4.index;
                  }
                  switch (t4.type) {
                    case 0:
                      const s3 = L.color.toColorRGB("ansi" === e4 ? this._colorManager.colors.ansi[t4.index] : this._colorManager.colors[e4]);
                      this.coreService.triggerDataEvent(`${o.C0.ESC}]${i4};${(0, k.toRgbString)(s3)}${o.C1_ESCAPED.ST}`);
                      break;
                    case 1:
                      "ansi" === e4 ? this._colorManager.colors.ansi[t4.index] = L.rgba.toColor(...t4.color) : this._colorManager.colors[e4] = L.rgba.toColor(...t4.color);
                      break;
                    case 2:
                      this._colorManager.restoreColor(t4.index);
                  }
                }
                null === (t3 = this._renderService) || void 0 === t3 || t3.setColors(this._colorManager.colors), null === (i3 = this.viewport) || void 0 === i3 || i3.onThemeChange(this._colorManager.colors);
              }
            }
            dispose() {
              var e3, t3, i3;
              this._isDisposed || (super.dispose(), null === (e3 = this._renderService) || void 0 === e3 || e3.dispose(), this._customKeyEventHandler = void 0, this.write = () => {
              }, null === (i3 = null === (t3 = this.element) || void 0 === t3 ? void 0 : t3.parentNode) || void 0 === i3 || i3.removeChild(this.element));
            }
            _setup() {
              super._setup(), this._customKeyEventHandler = void 0;
            }
            get buffer() {
              return this.buffers.active;
            }
            focus() {
              this.textarea && this.textarea.focus({ preventScroll: true });
            }
            _updateOptions(e3) {
              var t3, i3, s3, r2;
              switch (super._updateOptions(e3), e3) {
                case "fontFamily":
                case "fontSize":
                  null === (t3 = this._renderService) || void 0 === t3 || t3.clear(), null === (i3 = this._charSizeService) || void 0 === i3 || i3.measure();
                  break;
                case "cursorBlink":
                case "cursorStyle":
                  this.refresh(this.buffer.y, this.buffer.y);
                  break;
                case "customGlyphs":
                case "drawBoldTextInBrightColors":
                case "letterSpacing":
                case "lineHeight":
                case "fontWeight":
                case "fontWeightBold":
                case "minimumContrastRatio":
                  this._renderService && (this._renderService.clear(), this._renderService.onResize(this.cols, this.rows), this.refresh(0, this.rows - 1));
                  break;
                case "scrollback":
                  null === (s3 = this.viewport) || void 0 === s3 || s3.syncScrollArea();
                  break;
                case "screenReaderMode":
                  this.optionsService.rawOptions.screenReaderMode ? !this._accessibilityManager && this._renderService && (this._accessibilityManager = new _.AccessibilityManager(this, this._renderService)) : (null === (r2 = this._accessibilityManager) || void 0 === r2 || r2.dispose(), this._accessibilityManager = void 0);
                  break;
                case "tabStopWidth":
                  this.buffers.setupTabStops();
                  break;
                case "theme":
                  this._setTheme(this.optionsService.rawOptions.theme);
              }
            }
            _onTextAreaFocus(e3) {
              this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(o.C0.ESC + "[I"), this.updateCursorStyle(e3), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
            }
            blur() {
              var e3;
              return null === (e3 = this.textarea) || void 0 === e3 ? void 0 : e3.blur();
            }
            _onTextAreaBlur() {
              this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(o.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
            }
            _syncTextArea() {
              if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService)
                return;
              const e3 = this.buffer.ybase + this.buffer.y, t3 = this.buffer.lines.get(e3);
              if (!t3)
                return;
              const i3 = Math.min(this.buffer.x, this.cols - 1), s3 = this._renderService.dimensions.actualCellHeight, r2 = t3.getWidth(i3), n2 = this._renderService.dimensions.actualCellWidth * r2, o2 = this.buffer.y * this._renderService.dimensions.actualCellHeight, a2 = i3 * this._renderService.dimensions.actualCellWidth;
              this.textarea.style.left = a2 + "px", this.textarea.style.top = o2 + "px", this.textarea.style.width = n2 + "px", this.textarea.style.height = s3 + "px", this.textarea.style.lineHeight = s3 + "px", this.textarea.style.zIndex = "-5";
            }
            _initGlobal() {
              this._bindKeys(), this.register((0, l.addDisposableDomListener)(this.element, "copy", (e4) => {
                this.hasSelection() && (0, n.copyHandler)(e4, this._selectionService);
              }));
              const e3 = (e4) => (0, n.handlePasteEvent)(e4, this.textarea, this.coreService);
              this.register((0, l.addDisposableDomListener)(this.textarea, "paste", e3)), this.register((0, l.addDisposableDomListener)(this.element, "paste", e3)), c.isFirefox ? this.register((0, l.addDisposableDomListener)(this.element, "mousedown", (e4) => {
                2 === e4.button && (0, n.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
              })) : this.register((0, l.addDisposableDomListener)(this.element, "contextmenu", (e4) => {
                (0, n.rightClickHandler)(e4, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
              })), c.isLinux && this.register((0, l.addDisposableDomListener)(this.element, "auxclick", (e4) => {
                1 === e4.button && (0, n.moveTextAreaUnderMouseCursor)(e4, this.textarea, this.screenElement);
              }));
            }
            _bindKeys() {
              this.register((0, l.addDisposableDomListener)(this.textarea, "keyup", (e3) => this._keyUp(e3), true)), this.register((0, l.addDisposableDomListener)(this.textarea, "keydown", (e3) => this._keyDown(e3), true)), this.register((0, l.addDisposableDomListener)(this.textarea, "keypress", (e3) => this._keyPress(e3), true)), this.register((0, l.addDisposableDomListener)(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this.register((0, l.addDisposableDomListener)(this.textarea, "compositionupdate", (e3) => this._compositionHelper.compositionupdate(e3))), this.register((0, l.addDisposableDomListener)(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this.register((0, l.addDisposableDomListener)(this.textarea, "input", (e3) => this._inputEvent(e3), true)), this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
            }
            open(e3) {
              var t3;
              if (!e3)
                throw new Error("Terminal requires a parent element.");
              e3.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this._document = e3.ownerDocument, this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), this.element.setAttribute("tabindex", "0"), e3.appendChild(this.element);
              const i3 = M.createDocumentFragment();
              this._viewportElement = M.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i3.appendChild(this._viewportElement), this._viewportScrollArea = M.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = M.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._helperContainer = M.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i3.appendChild(this.screenElement), this.textarea = M.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", d.promptLabel), this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this.register((0, l.addDisposableDomListener)(this.textarea, "focus", (e4) => this._onTextAreaFocus(e4))), this.register((0, l.addDisposableDomListener)(this.textarea, "blur", () => this._onTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._coreBrowserService = this._instantiationService.createInstance(w.CoreBrowserService, this.textarea, null !== (t3 = this._document.defaultView) && void 0 !== t3 ? t3 : window), this._instantiationService.setService(m3.ICoreBrowserService, this._coreBrowserService), this._charSizeService = this._instantiationService.createInstance(C.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(m3.ICharSizeService, this._charSizeService), this._theme = this.options.theme || this._theme, this._colorManager = new p2.ColorManager(M, this.options.allowTransparency), this.register(this.optionsService.onOptionChange((e4) => this._colorManager.onOptionsChange(e4, this.optionsService.rawOptions[e4]))), this._colorManager.setTheme(this._theme), this._characterJoinerService = this._instantiationService.createInstance(R.CharacterJoinerService), this._instantiationService.setService(m3.ICharacterJoinerService, this._characterJoinerService);
              const n2 = this._createRenderer();
              this._renderService = this.register(this._instantiationService.createInstance(S.RenderService, n2, this.rows, this.screenElement)), this._instantiationService.setService(m3.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange((e4) => this._onRender.fire(e4))), this.onResize((e4) => this._renderService.resize(e4.cols, e4.rows)), this._compositionView = M.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(s2.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this.element.appendChild(i3), this._mouseService = this._instantiationService.createInstance(b.MouseService), this._instantiationService.setService(m3.IMouseService, this._mouseService), this.viewport = this._instantiationService.createInstance(r.Viewport, (e4) => this.scrollLines(e4, true, 1), this._viewportElement, this._viewportScrollArea, this.element), this.viewport.onThemeChange(this._colorManager.colors), this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea())), this.register(this.viewport), this.register(this.onCursorMove(() => {
                this._renderService.onCursorMove(), this._syncTextArea();
              })), this.register(this.onResize(() => this._renderService.onResize(this.cols, this.rows))), this.register(this.onBlur(() => this._renderService.onBlur())), this.register(this.onFocus(() => this._renderService.onFocus())), this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea())), this._selectionService = this.register(this._instantiationService.createInstance(h2.SelectionService, this.element, this.screenElement, this.linkifier2)), this._instantiationService.setService(m3.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines((e4) => this.scrollLines(e4.amount, e4.suppressScrollEvent))), this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this.register(this._selectionService.onRequestRedraw((e4) => this._renderService.onSelectionChanged(e4.start, e4.end, e4.columnSelectMode))), this.register(this._selectionService.onLinuxMouseSelection((e4) => {
                this.textarea.value = e4, this.textarea.focus(), this.textarea.select();
              })), this.register(this._onScroll.event((e4) => {
                this.viewport.syncScrollArea(), this._selectionService.refresh();
              })), this.register((0, l.addDisposableDomListener)(this._viewportElement, "scroll", () => this._selectionService.refresh())), this.linkifier2.attachToDom(this.screenElement, this._mouseService, this._renderService), this.register(this._instantiationService.createInstance(D.BufferDecorationRenderer, this.screenElement)), this.register((0, l.addDisposableDomListener)(this.element, "mousedown", (e4) => this._selectionService.onMouseDown(e4))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager = new _.AccessibilityManager(this, this._renderService)), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(A.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onOptionChange(() => {
                !this._overviewRulerRenderer && this.options.overviewRulerWidth && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(A.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
              }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
            }
            _createRenderer() {
              return this._instantiationService.createInstance(u.DomRenderer, this._colorManager.colors, this.element, this.screenElement, this._viewportElement, this.linkifier2);
            }
            _setTheme(e3) {
              var t3, i3, s3;
              this._theme = e3, null === (t3 = this._colorManager) || void 0 === t3 || t3.setTheme(e3), null === (i3 = this._renderService) || void 0 === i3 || i3.setColors(this._colorManager.colors), null === (s3 = this.viewport) || void 0 === s3 || s3.onThemeChange(this._colorManager.colors);
            }
            bindMouse() {
              const e3 = this, t3 = this.element;
              function i3(t4) {
                const i4 = e3._mouseService.getMouseReportCoords(t4, e3.screenElement);
                if (!i4)
                  return false;
                let s4, r3;
                switch (t4.overrideType || t4.type) {
                  case "mousemove":
                    r3 = 32, void 0 === t4.buttons ? (s4 = 3, void 0 !== t4.button && (s4 = t4.button < 3 ? t4.button : 3)) : s4 = 1 & t4.buttons ? 0 : 4 & t4.buttons ? 1 : 2 & t4.buttons ? 2 : 3;
                    break;
                  case "mouseup":
                    r3 = 0, s4 = t4.button < 3 ? t4.button : 3;
                    break;
                  case "mousedown":
                    r3 = 1, s4 = t4.button < 3 ? t4.button : 3;
                    break;
                  case "wheel":
                    if (0 === e3.viewport.getLinesScrolled(t4))
                      return false;
                    r3 = t4.deltaY < 0 ? 0 : 1, s4 = 4;
                    break;
                  default:
                    return false;
                }
                return !(void 0 === r3 || void 0 === s4 || s4 > 4) && e3.coreMouseService.triggerMouseEvent({ col: i4.col, row: i4.row, x: i4.x, y: i4.y, button: s4, action: r3, ctrl: t4.ctrlKey, alt: t4.altKey, shift: t4.shiftKey });
              }
              const s3 = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, r2 = { mouseup: (e4) => (i3(e4), e4.buttons || (this._document.removeEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.removeEventListener("mousemove", s3.mousedrag)), this.cancel(e4)), wheel: (e4) => (i3(e4), this.cancel(e4, true)), mousedrag: (e4) => {
                e4.buttons && i3(e4);
              }, mousemove: (e4) => {
                e4.buttons || i3(e4);
              } };
              this.register(this.coreMouseService.onProtocolChange((e4) => {
                e4 ? ("debug" === this.optionsService.rawOptions.logLevel && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(e4)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & e4 ? s3.mousemove || (t3.addEventListener("mousemove", r2.mousemove), s3.mousemove = r2.mousemove) : (t3.removeEventListener("mousemove", s3.mousemove), s3.mousemove = null), 16 & e4 ? s3.wheel || (t3.addEventListener("wheel", r2.wheel, { passive: false }), s3.wheel = r2.wheel) : (t3.removeEventListener("wheel", s3.wheel), s3.wheel = null), 2 & e4 ? s3.mouseup || (s3.mouseup = r2.mouseup) : (this._document.removeEventListener("mouseup", s3.mouseup), s3.mouseup = null), 4 & e4 ? s3.mousedrag || (s3.mousedrag = r2.mousedrag) : (this._document.removeEventListener("mousemove", s3.mousedrag), s3.mousedrag = null);
              })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, l.addDisposableDomListener)(t3, "mousedown", (e4) => {
                if (e4.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(e4))
                  return i3(e4), s3.mouseup && this._document.addEventListener("mouseup", s3.mouseup), s3.mousedrag && this._document.addEventListener("mousemove", s3.mousedrag), this.cancel(e4);
              })), this.register((0, l.addDisposableDomListener)(t3, "wheel", (e4) => {
                if (!s3.wheel) {
                  if (!this.buffer.hasScrollback) {
                    const t4 = this.viewport.getLinesScrolled(e4);
                    if (0 === t4)
                      return;
                    const i4 = o.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (e4.deltaY < 0 ? "A" : "B");
                    let s4 = "";
                    for (let e5 = 0; e5 < Math.abs(t4); e5++)
                      s4 += i4;
                    return this.coreService.triggerDataEvent(s4, true), this.cancel(e4, true);
                  }
                  return this.viewport.onWheel(e4) ? this.cancel(e4) : void 0;
                }
              }, { passive: false })), this.register((0, l.addDisposableDomListener)(t3, "touchstart", (e4) => {
                if (!this.coreMouseService.areMouseEventsActive)
                  return this.viewport.onTouchStart(e4), this.cancel(e4);
              }, { passive: true })), this.register((0, l.addDisposableDomListener)(t3, "touchmove", (e4) => {
                if (!this.coreMouseService.areMouseEventsActive)
                  return this.viewport.onTouchMove(e4) ? void 0 : this.cancel(e4);
              }, { passive: false }));
            }
            refresh(e3, t3) {
              var i3;
              null === (i3 = this._renderService) || void 0 === i3 || i3.refreshRows(e3, t3);
            }
            updateCursorStyle(e3) {
              var t3;
              (null === (t3 = this._selectionService) || void 0 === t3 ? void 0 : t3.shouldColumnSelect(e3)) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
            }
            _showCursor() {
              this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
            }
            scrollLines(e3, t3, i3 = 0) {
              super.scrollLines(e3, t3, i3), this.refresh(0, this.rows - 1);
            }
            paste(e3) {
              (0, n.paste)(e3, this.textarea, this.coreService);
            }
            attachCustomKeyEventHandler(e3) {
              this._customKeyEventHandler = e3;
            }
            registerLinkProvider(e3) {
              return this.linkifier2.registerLinkProvider(e3);
            }
            registerCharacterJoiner(e3) {
              if (!this._characterJoinerService)
                throw new Error("Terminal must be opened first");
              const t3 = this._characterJoinerService.register(e3);
              return this.refresh(0, this.rows - 1), t3;
            }
            deregisterCharacterJoiner(e3) {
              if (!this._characterJoinerService)
                throw new Error("Terminal must be opened first");
              this._characterJoinerService.deregister(e3) && this.refresh(0, this.rows - 1);
            }
            get markers() {
              return this.buffer.markers;
            }
            addMarker(e3) {
              return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e3);
            }
            registerDecoration(e3) {
              return this._decorationService.registerDecoration(e3);
            }
            hasSelection() {
              return !!this._selectionService && this._selectionService.hasSelection;
            }
            select(e3, t3, i3) {
              this._selectionService.setSelection(e3, t3, i3);
            }
            getSelection() {
              return this._selectionService ? this._selectionService.selectionText : "";
            }
            getSelectionPosition() {
              if (this._selectionService && this._selectionService.hasSelection)
                return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
            }
            clearSelection() {
              var e3;
              null === (e3 = this._selectionService) || void 0 === e3 || e3.clearSelection();
            }
            selectAll() {
              var e3;
              null === (e3 = this._selectionService) || void 0 === e3 || e3.selectAll();
            }
            selectLines(e3, t3) {
              var i3;
              null === (i3 = this._selectionService) || void 0 === i3 || i3.selectLines(e3, t3);
            }
            _keyDown(e3) {
              if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && false === this._customKeyEventHandler(e3))
                return false;
              const t3 = this.browser.isMac && this.options.macOptionIsMeta && e3.altKey;
              if (!t3 && !this._compositionHelper.keydown(e3))
                return this.buffer.ybase !== this.buffer.ydisp && this._bufferService.scrollToBottom(), false;
              t3 || "Dead" !== e3.key && "AltGraph" !== e3.key || (this._unprocessedDeadKey = true);
              const i3 = (0, f.evaluateKeyboardEvent)(e3, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
              if (this.updateCursorStyle(e3), 3 === i3.type || 2 === i3.type) {
                const t4 = this.rows - 1;
                return this.scrollLines(2 === i3.type ? -t4 : t4), this.cancel(e3, true);
              }
              return 1 === i3.type && this.selectAll(), !!this._isThirdLevelShift(this.browser, e3) || (i3.cancel && this.cancel(e3, true), !i3.key || !!(e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && 1 === e3.key.length && e3.key.charCodeAt(0) >= 65 && e3.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = false, true) : (i3.key !== o.C0.ETX && i3.key !== o.C0.CR || (this.textarea.value = ""), this._onKey.fire({ key: i3.key, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(i3.key, true), this.optionsService.rawOptions.screenReaderMode ? void (this._keyDownHandled = true) : this.cancel(e3, true))));
            }
            _isThirdLevelShift(e3, t3) {
              const i3 = e3.isMac && !this.options.macOptionIsMeta && t3.altKey && !t3.ctrlKey && !t3.metaKey || e3.isWindows && t3.altKey && t3.ctrlKey && !t3.metaKey || e3.isWindows && t3.getModifierState("AltGraph");
              return "keypress" === t3.type ? i3 : i3 && (!t3.keyCode || t3.keyCode > 47);
            }
            _keyUp(e3) {
              this._keyDownSeen = false, this._customKeyEventHandler && false === this._customKeyEventHandler(e3) || (function(e4) {
                return 16 === e4.keyCode || 17 === e4.keyCode || 18 === e4.keyCode;
              }(e3) || this.focus(), this.updateCursorStyle(e3), this._keyPressHandled = false);
            }
            _keyPress(e3) {
              let t3;
              if (this._keyPressHandled = false, this._keyDownHandled)
                return false;
              if (this._customKeyEventHandler && false === this._customKeyEventHandler(e3))
                return false;
              if (this.cancel(e3), e3.charCode)
                t3 = e3.charCode;
              else if (null === e3.which || void 0 === e3.which)
                t3 = e3.keyCode;
              else {
                if (0 === e3.which || 0 === e3.charCode)
                  return false;
                t3 = e3.which;
              }
              return !(!t3 || (e3.altKey || e3.ctrlKey || e3.metaKey) && !this._isThirdLevelShift(this.browser, e3) || (t3 = String.fromCharCode(t3), this._onKey.fire({ key: t3, domEvent: e3 }), this._showCursor(), this.coreService.triggerDataEvent(t3, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, 0));
            }
            _inputEvent(e3) {
              if (e3.data && "insertText" === e3.inputType && (!e3.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
                if (this._keyPressHandled)
                  return false;
                this._unprocessedDeadKey = false;
                const t3 = e3.data;
                return this.coreService.triggerDataEvent(t3, true), this.cancel(e3), true;
              }
              return false;
            }
            resize(e3, t3) {
              e3 !== this.cols || t3 !== this.rows ? super.resize(e3, t3) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
            }
            _afterResize(e3, t3) {
              var i3, s3;
              null === (i3 = this._charSizeService) || void 0 === i3 || i3.measure(), null === (s3 = this.viewport) || void 0 === s3 || s3.syncScrollArea(true);
            }
            clear() {
              if (0 !== this.buffer.ybase || 0 !== this.buffer.y) {
                this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
                for (let e3 = 1; e3 < this.rows; e3++)
                  this.buffer.lines.push(this.buffer.getBlankLine(g.DEFAULT_ATTR_DATA));
                this.refresh(0, this.rows - 1), this._onScroll.fire({ position: this.buffer.ydisp, source: 0 });
              }
            }
            reset() {
              var e3, t3;
              this.options.rows = this.rows, this.options.cols = this.cols;
              const i3 = this._customKeyEventHandler;
              this._setup(), super.reset(), null === (e3 = this._selectionService) || void 0 === e3 || e3.reset(), this._decorationService.reset(), this._customKeyEventHandler = i3, this.refresh(0, this.rows - 1), null === (t3 = this.viewport) || void 0 === t3 || t3.syncScrollArea();
            }
            clearTextureAtlas() {
              var e3;
              null === (e3 = this._renderService) || void 0 === e3 || e3.clearTextureAtlas();
            }
            _reportFocus() {
              var e3;
              (null === (e3 = this.element) || void 0 === e3 ? void 0 : e3.classList.contains("focus")) ? this.coreService.triggerDataEvent(o.C0.ESC + "[I") : this.coreService.triggerDataEvent(o.C0.ESC + "[O");
            }
            _reportWindowsOptions(e3) {
              if (this._renderService)
                switch (e3) {
                  case a.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                    const e4 = this._renderService.dimensions.canvasWidth.toFixed(0), t3 = this._renderService.dimensions.canvasHeight.toFixed(0);
                    this.coreService.triggerDataEvent(`${o.C0.ESC}[4;${t3};${e4}t`);
                    break;
                  case a.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                    const i3 = this._renderService.dimensions.actualCellWidth.toFixed(0), s3 = this._renderService.dimensions.actualCellHeight.toFixed(0);
                    this.coreService.triggerDataEvent(`${o.C0.ESC}[6;${s3};${i3}t`);
                }
            }
            cancel(e3, t3) {
              if (this.options.cancelEvents || t3)
                return e3.preventDefault(), e3.stopPropagation(), false;
            }
          }
          t2.Terminal = O;
        }, 9924: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TimeBasedDebouncer = void 0, t2.TimeBasedDebouncer = class {
            constructor(e3, t3 = 1e3) {
              this._renderCallback = e3, this._debounceThresholdMS = t3, this._lastRefreshMs = 0, this._additionalRefreshRequested = false;
            }
            dispose() {
              this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
            }
            refresh(e3, t3, i2) {
              this._rowCount = i2, e3 = void 0 !== e3 ? e3 : 0, t3 = void 0 !== t3 ? t3 : this._rowCount - 1, this._rowStart = void 0 !== this._rowStart ? Math.min(this._rowStart, e3) : e3, this._rowEnd = void 0 !== this._rowEnd ? Math.max(this._rowEnd, t3) : t3;
              const s2 = Date.now();
              if (s2 - this._lastRefreshMs >= this._debounceThresholdMS)
                this._lastRefreshMs = s2, this._innerRefresh();
              else if (!this._additionalRefreshRequested) {
                const e4 = s2 - this._lastRefreshMs, t4 = this._debounceThresholdMS - e4;
                this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
                  this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
                }, t4);
              }
            }
            _innerRefresh() {
              if (void 0 === this._rowStart || void 0 === this._rowEnd || void 0 === this._rowCount)
                return;
              const e3 = Math.max(this._rowStart, 0), t3 = Math.min(this._rowEnd, this._rowCount - 1);
              this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(e3, t3);
            }
          };
        }, 1680: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.Viewport = void 0;
          const n = i2(844), o = i2(3656), a = i2(4725), h2 = i2(2585);
          let c = class extends n.Disposable {
            constructor(e3, t3, i3, s3, r2, n2, a2, h3, c2) {
              super(), this._scrollLines = e3, this._viewportElement = t3, this._scrollArea = i3, this._element = s3, this._bufferService = r2, this._optionsService = n2, this._charSizeService = a2, this._renderService = h3, this._coreBrowserService = c2, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentScaledCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = false, this._smoothScrollState = { startTime: 0, origin: -1, target: -1 }, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, o.addDisposableDomListener)(this._viewportElement, "scroll", this._onScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e4) => this._activeBuffer = e4.activeBuffer)), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange((e4) => this._renderDimensions = e4)), setTimeout(() => this.syncScrollArea(), 0);
            }
            onThemeChange(e3) {
              this._viewportElement.style.backgroundColor = e3.background.css;
            }
            _refresh(e3) {
              if (e3)
                return this._innerRefresh(), void (null !== this._refreshAnimationFrame && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
              null === this._refreshAnimationFrame && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
            }
            _innerRefresh() {
              if (this._charSizeService.height > 0) {
                this._currentRowHeight = this._renderService.dimensions.scaledCellHeight / this._coreBrowserService.dpr, this._currentScaledCellHeight = this._renderService.dimensions.scaledCellHeight, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
                const e4 = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderService.dimensions.canvasHeight);
                this._lastRecordedBufferHeight !== e4 && (this._lastRecordedBufferHeight = e4, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
              }
              const e3 = this._bufferService.buffer.ydisp * this._currentRowHeight;
              this._viewportElement.scrollTop !== e3 && (this._ignoreNextScrollEvent = true, this._viewportElement.scrollTop = e3), this._refreshAnimationFrame = null;
            }
            syncScrollArea(e3 = false) {
              if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length)
                return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(e3);
              this._lastRecordedViewportHeight === this._renderService.dimensions.canvasHeight && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.scaledCellHeight === this._currentScaledCellHeight || this._refresh(e3);
            }
            _onScroll(e3) {
              if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent)
                return;
              if (this._ignoreNextScrollEvent)
                return this._ignoreNextScrollEvent = false, void this._scrollLines(0);
              const t3 = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
              this._scrollLines(t3);
            }
            _smoothScroll() {
              if (this._isDisposed || -1 === this._smoothScrollState.origin || -1 === this._smoothScrollState.target)
                return;
              const e3 = this._smoothScrollPercent();
              this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(e3 * (this._smoothScrollState.target - this._smoothScrollState.origin)), e3 < 1 ? this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll()) : this._clearSmoothScrollState();
            }
            _smoothScrollPercent() {
              return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
            }
            _clearSmoothScrollState() {
              this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
            }
            _bubbleScroll(e3, t3) {
              const i3 = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
              return !(t3 < 0 && 0 !== this._viewportElement.scrollTop || t3 > 0 && i3 < this._lastRecordedBufferHeight) || (e3.cancelable && e3.preventDefault(), false);
            }
            onWheel(e3) {
              const t3 = this._getPixelsScrolled(e3);
              return 0 !== t3 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, -1 === this._smoothScrollState.target ? this._smoothScrollState.target = this._viewportElement.scrollTop + t3 : this._smoothScrollState.target += t3, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += t3, this._bubbleScroll(e3, t3));
            }
            _getPixelsScrolled(e3) {
              if (0 === e3.deltaY || e3.shiftKey)
                return 0;
              let t3 = this._applyScrollModifier(e3.deltaY, e3);
              return e3.deltaMode === WheelEvent.DOM_DELTA_LINE ? t3 *= this._currentRowHeight : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t3 *= this._currentRowHeight * this._bufferService.rows), t3;
            }
            getLinesScrolled(e3) {
              if (0 === e3.deltaY || e3.shiftKey)
                return 0;
              let t3 = this._applyScrollModifier(e3.deltaY, e3);
              return e3.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (t3 /= this._currentRowHeight + 0, this._wheelPartialScroll += t3, t3 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e3.deltaMode === WheelEvent.DOM_DELTA_PAGE && (t3 *= this._bufferService.rows), t3;
            }
            _applyScrollModifier(e3, t3) {
              const i3 = this._optionsService.rawOptions.fastScrollModifier;
              return "alt" === i3 && t3.altKey || "ctrl" === i3 && t3.ctrlKey || "shift" === i3 && t3.shiftKey ? e3 * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e3 * this._optionsService.rawOptions.scrollSensitivity;
            }
            onTouchStart(e3) {
              this._lastTouchY = e3.touches[0].pageY;
            }
            onTouchMove(e3) {
              const t3 = this._lastTouchY - e3.touches[0].pageY;
              return this._lastTouchY = e3.touches[0].pageY, 0 !== t3 && (this._viewportElement.scrollTop += t3, this._bubbleScroll(e3, t3));
            }
          };
          c = s2([r(4, h2.IBufferService), r(5, h2.IOptionsService), r(6, a.ICharSizeService), r(7, a.IRenderService), r(8, a.ICoreBrowserService)], c), t2.Viewport = c;
        }, 3107: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferDecorationRenderer = void 0;
          const n = i2(3656), o = i2(4725), a = i2(844), h2 = i2(2585);
          let c = class extends a.Disposable {
            constructor(e3, t3, i3, s3) {
              super(), this._screenElement = e3, this._bufferService = t3, this._decorationService = i3, this._renderService = s3, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = false, this._dimensionsChanged = false, this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this.register(this._renderService.onDimensionsChange(() => {
                this._dimensionsChanged = true, this._queueRefresh();
              })), this.register((0, n.addDisposableDomListener)(window, "resize", () => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
                this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
              })), this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this.register(this._decorationService.onDecorationRemoved((e4) => this._removeDecoration(e4)));
            }
            dispose() {
              this._container.remove(), this._decorationElements.clear(), super.dispose();
            }
            _queueRefresh() {
              void 0 === this._animationFrame && (this._animationFrame = this._renderService.addRefreshCallback(() => {
                this.refreshDecorations(), this._animationFrame = void 0;
              }));
            }
            refreshDecorations() {
              for (const e3 of this._decorationService.decorations)
                this._renderDecoration(e3);
              this._dimensionsChanged = false;
            }
            _renderDecoration(e3) {
              this._refreshStyle(e3), this._dimensionsChanged && this._refreshXPosition(e3);
            }
            _createElement(e3) {
              var t3;
              const i3 = document.createElement("div");
              i3.classList.add("xterm-decoration"), i3.style.width = `${Math.round((e3.options.width || 1) * this._renderService.dimensions.actualCellWidth)}px`, i3.style.height = (e3.options.height || 1) * this._renderService.dimensions.actualCellHeight + "px", i3.style.top = (e3.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.actualCellHeight + "px", i3.style.lineHeight = `${this._renderService.dimensions.actualCellHeight}px`;
              const s3 = null !== (t3 = e3.options.x) && void 0 !== t3 ? t3 : 0;
              return s3 && s3 > this._bufferService.cols && (i3.style.display = "none"), this._refreshXPosition(e3, i3), i3;
            }
            _refreshStyle(e3) {
              const t3 = e3.marker.line - this._bufferService.buffers.active.ydisp;
              if (t3 < 0 || t3 >= this._bufferService.rows)
                e3.element && (e3.element.style.display = "none", e3.onRenderEmitter.fire(e3.element));
              else {
                let i3 = this._decorationElements.get(e3);
                i3 || (e3.onDispose(() => this._removeDecoration(e3)), i3 = this._createElement(e3), e3.element = i3, this._decorationElements.set(e3, i3), this._container.appendChild(i3)), i3.style.top = t3 * this._renderService.dimensions.actualCellHeight + "px", i3.style.display = this._altBufferIsActive ? "none" : "block", e3.onRenderEmitter.fire(i3);
              }
            }
            _refreshXPosition(e3, t3 = e3.element) {
              var i3;
              if (!t3)
                return;
              const s3 = null !== (i3 = e3.options.x) && void 0 !== i3 ? i3 : 0;
              "right" === (e3.options.anchor || "left") ? t3.style.right = s3 ? s3 * this._renderService.dimensions.actualCellWidth + "px" : "" : t3.style.left = s3 ? s3 * this._renderService.dimensions.actualCellWidth + "px" : "";
            }
            _removeDecoration(e3) {
              var t3;
              null === (t3 = this._decorationElements.get(e3)) || void 0 === t3 || t3.remove(), this._decorationElements.delete(e3);
            }
          };
          c = s2([r(1, h2.IBufferService), r(2, h2.IDecorationService), r(3, o.IRenderService)], c), t2.BufferDecorationRenderer = c;
        }, 5871: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ColorZoneStore = void 0, t2.ColorZoneStore = class {
            constructor() {
              this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
            }
            get zones() {
              return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
            }
            clear() {
              this._zones.length = 0, this._zonePoolIndex = 0;
            }
            addDecoration(e3) {
              if (e3.options.overviewRulerOptions) {
                for (const t3 of this._zones)
                  if (t3.color === e3.options.overviewRulerOptions.color && t3.position === e3.options.overviewRulerOptions.position) {
                    if (this._lineIntersectsZone(t3, e3.marker.line))
                      return;
                    if (this._lineAdjacentToZone(t3, e3.marker.line, e3.options.overviewRulerOptions.position))
                      return void this._addLineToZone(t3, e3.marker.line);
                  }
                if (this._zonePoolIndex < this._zonePool.length)
                  return this._zonePool[this._zonePoolIndex].color = e3.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = e3.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = e3.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = e3.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
                this._zones.push({ color: e3.options.overviewRulerOptions.color, position: e3.options.overviewRulerOptions.position, startBufferLine: e3.marker.line, endBufferLine: e3.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
              }
            }
            setPadding(e3) {
              this._linePadding = e3;
            }
            _lineIntersectsZone(e3, t3) {
              return t3 >= e3.startBufferLine && t3 <= e3.endBufferLine;
            }
            _lineAdjacentToZone(e3, t3, i2) {
              return t3 >= e3.startBufferLine - this._linePadding[i2 || "full"] && t3 <= e3.endBufferLine + this._linePadding[i2 || "full"];
            }
            _addLineToZone(e3, t3) {
              e3.startBufferLine = Math.min(e3.startBufferLine, t3), e3.endBufferLine = Math.max(e3.endBufferLine, t3);
            }
          };
        }, 5744: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.OverviewRulerRenderer = void 0;
          const n = i2(5871), o = i2(3656), a = i2(4725), h2 = i2(844), c = i2(2585), l = { full: 0, left: 0, center: 0, right: 0 }, d = { full: 0, left: 0, center: 0, right: 0 }, _ = { full: 0, left: 0, center: 0, right: 0 };
          let u = class extends h2.Disposable {
            constructor(e3, t3, i3, s3, r2, o2, a2) {
              var h3;
              super(), this._viewportElement = e3, this._screenElement = t3, this._bufferService = i3, this._decorationService = s3, this._renderService = r2, this._optionsService = o2, this._coreBrowseService = a2, this._colorZoneStore = new n.ColorZoneStore(), this._shouldUpdateDimensions = true, this._shouldUpdateAnchor = true, this._lastKnownBufferLength = 0, this._canvas = document.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), null === (h3 = this._viewportElement.parentElement) || void 0 === h3 || h3.insertBefore(this._canvas, this._viewportElement);
              const c2 = this._canvas.getContext("2d");
              if (!c2)
                throw new Error("Ctx cannot be null");
              this._ctx = c2, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners();
            }
            get _width() {
              return this._optionsService.options.overviewRulerWidth || 0;
            }
            _registerDecorationListeners() {
              this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true)));
            }
            _registerBufferChangeListeners() {
              this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
                this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
              })), this.register(this._bufferService.onScroll(() => {
                this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
              }));
            }
            _registerDimensionChangeListeners() {
              this.register(this._renderService.onRender(() => {
                this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
              })), this.register(this._optionsService.onOptionChange((e3) => {
                "overviewRulerWidth" === e3 && this._queueRefresh(true);
              })), this.register((0, o.addDisposableDomListener)(this._coreBrowseService.window, "resize", () => {
                this._queueRefresh(true);
              })), this._queueRefresh(true);
            }
            dispose() {
              var e3;
              null === (e3 = this._canvas) || void 0 === e3 || e3.remove(), super.dispose();
            }
            _refreshDrawConstants() {
              const e3 = Math.floor(this._canvas.width / 3), t3 = Math.ceil(this._canvas.width / 3);
              d.full = this._canvas.width, d.left = e3, d.center = t3, d.right = e3, this._refreshDrawHeightConstants(), _.full = 0, _.left = 0, _.center = d.left, _.right = d.left + d.center;
            }
            _refreshDrawHeightConstants() {
              l.full = Math.round(2 * this._coreBrowseService.dpr);
              const e3 = this._canvas.height / this._bufferService.buffer.lines.length, t3 = Math.round(Math.max(Math.min(e3, 12), 6) * this._coreBrowseService.dpr);
              l.left = t3, l.center = t3, l.right = t3;
            }
            _refreshColorZonePadding() {
              this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * l.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
            }
            _refreshCanvasDimensions() {
              this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowseService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowseService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
            }
            _refreshDecorations() {
              this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
              for (const e4 of this._decorationService.decorations)
                this._colorZoneStore.addDecoration(e4);
              this._ctx.lineWidth = 1;
              const e3 = this._colorZoneStore.zones;
              for (const t3 of e3)
                "full" !== t3.position && this._renderColorZone(t3);
              for (const t3 of e3)
                "full" === t3.position && this._renderColorZone(t3);
              this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
            }
            _renderColorZone(e3) {
              this._ctx.fillStyle = e3.color, this._ctx.fillRect(_[e3.position || "full"], Math.round((this._canvas.height - 1) * (e3.startBufferLine / this._bufferService.buffers.active.lines.length) - l[e3.position || "full"] / 2), d[e3.position || "full"], Math.round((this._canvas.height - 1) * ((e3.endBufferLine - e3.startBufferLine) / this._bufferService.buffers.active.lines.length) + l[e3.position || "full"]));
            }
            _queueRefresh(e3, t3) {
              this._shouldUpdateDimensions = e3 || this._shouldUpdateDimensions, this._shouldUpdateAnchor = t3 || this._shouldUpdateAnchor, void 0 === this._animationFrame && (this._animationFrame = this._coreBrowseService.window.requestAnimationFrame(() => {
                this._refreshDecorations(), this._animationFrame = void 0;
              }));
            }
          };
          u = s2([r(2, c.IBufferService), r(3, c.IDecorationService), r(4, a.IRenderService), r(5, c.IOptionsService), r(6, a.ICoreBrowserService)], u), t2.OverviewRulerRenderer = u;
        }, 2950: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CompositionHelper = void 0;
          const n = i2(4725), o = i2(2585), a = i2(2584);
          let h2 = class {
            constructor(e3, t3, i3, s3, r2, n2) {
              this._textarea = e3, this._compositionView = t3, this._bufferService = i3, this._optionsService = s3, this._coreService = r2, this._renderService = n2, this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
            }
            get isComposing() {
              return this._isComposing;
            }
            compositionstart() {
              this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
            }
            compositionupdate(e3) {
              this._compositionView.textContent = e3.data, this.updateCompositionElements(), setTimeout(() => {
                this._compositionPosition.end = this._textarea.value.length;
              }, 0);
            }
            compositionend() {
              this._finalizeComposition(true);
            }
            keydown(e3) {
              if (this._isComposing || this._isSendingComposition) {
                if (229 === e3.keyCode)
                  return false;
                if (16 === e3.keyCode || 17 === e3.keyCode || 18 === e3.keyCode)
                  return false;
                this._finalizeComposition(false);
              }
              return 229 !== e3.keyCode || (this._handleAnyTextareaChanges(), false);
            }
            _finalizeComposition(e3) {
              if (this._compositionView.classList.remove("active"), this._isComposing = false, e3) {
                const e4 = { start: this._compositionPosition.start, end: this._compositionPosition.end };
                this._isSendingComposition = true, setTimeout(() => {
                  if (this._isSendingComposition) {
                    let t3;
                    this._isSendingComposition = false, e4.start += this._dataAlreadySent.length, t3 = this._isComposing ? this._textarea.value.substring(e4.start, e4.end) : this._textarea.value.substring(e4.start), t3.length > 0 && this._coreService.triggerDataEvent(t3, true);
                  }
                }, 0);
              } else {
                this._isSendingComposition = false;
                const e4 = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
                this._coreService.triggerDataEvent(e4, true);
              }
            }
            _handleAnyTextareaChanges() {
              const e3 = this._textarea.value;
              setTimeout(() => {
                if (!this._isComposing) {
                  const t3 = this._textarea.value, i3 = t3.replace(e3, "");
                  this._dataAlreadySent = i3, t3.length > e3.length ? this._coreService.triggerDataEvent(i3, true) : t3.length < e3.length ? this._coreService.triggerDataEvent(`${a.C0.DEL}`, true) : t3.length === e3.length && t3 !== e3 && this._coreService.triggerDataEvent(t3, true);
                }
              }, 0);
            }
            updateCompositionElements(e3) {
              if (this._isComposing) {
                if (this._bufferService.buffer.isCursorInViewport) {
                  const e4 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), t3 = this._renderService.dimensions.actualCellHeight, i3 = this._bufferService.buffer.y * this._renderService.dimensions.actualCellHeight, s3 = e4 * this._renderService.dimensions.actualCellWidth;
                  this._compositionView.style.left = s3 + "px", this._compositionView.style.top = i3 + "px", this._compositionView.style.height = t3 + "px", this._compositionView.style.lineHeight = t3 + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
                  const r2 = this._compositionView.getBoundingClientRect();
                  this._textarea.style.left = s3 + "px", this._textarea.style.top = i3 + "px", this._textarea.style.width = Math.max(r2.width, 1) + "px", this._textarea.style.height = Math.max(r2.height, 1) + "px", this._textarea.style.lineHeight = r2.height + "px";
                }
                e3 || setTimeout(() => this.updateCompositionElements(true), 0);
              }
            }
          };
          h2 = s2([r(2, o.IBufferService), r(3, o.IOptionsService), r(4, o.ICoreService), r(5, n.IRenderService)], h2), t2.CompositionHelper = h2;
        }, 9806: (e2, t2) => {
          function i2(e3, t3, i3) {
            const s2 = i3.getBoundingClientRect(), r = e3.getComputedStyle(i3), n = parseInt(r.getPropertyValue("padding-left")), o = parseInt(r.getPropertyValue("padding-top"));
            return [t3.clientX - s2.left - n, t3.clientY - s2.top - o];
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getCoords = t2.getCoordsRelativeToElement = void 0, t2.getCoordsRelativeToElement = i2, t2.getCoords = function(e3, t3, s2, r, n, o, a, h2, c) {
            if (!o)
              return;
            const l = i2(e3, t3, s2);
            return l ? (l[0] = Math.ceil((l[0] + (c ? a / 2 : 0)) / a), l[1] = Math.ceil(l[1] / h2), l[0] = Math.min(Math.max(l[0], 1), r + (c ? 1 : 0)), l[1] = Math.min(Math.max(l[1], 1), n), l) : void 0;
          };
        }, 9504: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.moveToCellSequence = void 0;
          const s2 = i2(2584);
          function r(e3, t3, i3, s3) {
            const r2 = e3 - n(i3, e3), a2 = t3 - n(i3, t3), l = Math.abs(r2 - a2) - function(e4, t4, i4) {
              let s4 = 0;
              const r3 = e4 - n(i4, e4), a3 = t4 - n(i4, t4);
              for (let n2 = 0; n2 < Math.abs(r3 - a3); n2++) {
                const a4 = "A" === o(e4, t4) ? -1 : 1, h3 = i4.buffer.lines.get(r3 + a4 * n2);
                (null == h3 ? void 0 : h3.isWrapped) && s4++;
              }
              return s4;
            }(e3, t3, i3);
            return c(l, h2(o(e3, t3), s3));
          }
          function n(e3, t3) {
            let i3 = 0, s3 = e3.buffer.lines.get(t3), r2 = null == s3 ? void 0 : s3.isWrapped;
            for (; r2 && t3 >= 0 && t3 < e3.rows; )
              i3++, s3 = e3.buffer.lines.get(--t3), r2 = null == s3 ? void 0 : s3.isWrapped;
            return i3;
          }
          function o(e3, t3) {
            return e3 > t3 ? "A" : "B";
          }
          function a(e3, t3, i3, s3, r2, n2) {
            let o2 = e3, a2 = t3, h3 = "";
            for (; o2 !== i3 || a2 !== s3; )
              o2 += r2 ? 1 : -1, r2 && o2 > n2.cols - 1 ? (h3 += n2.buffer.translateBufferLineToString(a2, false, e3, o2), o2 = 0, e3 = 0, a2++) : !r2 && o2 < 0 && (h3 += n2.buffer.translateBufferLineToString(a2, false, 0, e3 + 1), o2 = n2.cols - 1, e3 = o2, a2--);
            return h3 + n2.buffer.translateBufferLineToString(a2, false, e3, o2);
          }
          function h2(e3, t3) {
            const i3 = t3 ? "O" : "[";
            return s2.C0.ESC + i3 + e3;
          }
          function c(e3, t3) {
            e3 = Math.floor(e3);
            let i3 = "";
            for (let s3 = 0; s3 < e3; s3++)
              i3 += t3;
            return i3;
          }
          t2.moveToCellSequence = function(e3, t3, i3, s3) {
            const o2 = i3.buffer.x, l = i3.buffer.y;
            if (!i3.buffer.hasScrollback)
              return function(e4, t4, i4, s4, o3, l2) {
                return 0 === r(t4, s4, o3, l2).length ? "" : c(a(e4, t4, e4, t4 - n(o3, t4), false, o3).length, h2("D", l2));
              }(o2, l, 0, t3, i3, s3) + r(l, t3, i3, s3) + function(e4, t4, i4, s4, o3, l2) {
                let d2;
                d2 = r(t4, s4, o3, l2).length > 0 ? s4 - n(o3, s4) : t4;
                const _2 = s4, u = function(e5, t5, i5, s5, o4, a2) {
                  let h3;
                  return h3 = r(i5, s5, o4, a2).length > 0 ? s5 - n(o4, s5) : t5, e5 < i5 && h3 <= s5 || e5 >= i5 && h3 < s5 ? "C" : "D";
                }(e4, t4, i4, s4, o3, l2);
                return c(a(e4, d2, i4, _2, "C" === u, o3).length, h2(u, l2));
              }(o2, l, e3, t3, i3, s3);
            let d;
            if (l === t3)
              return d = o2 > e3 ? "D" : "C", c(Math.abs(o2 - e3), h2(d, s3));
            d = l > t3 ? "D" : "C";
            const _ = Math.abs(l - t3);
            return c(function(e4, t4) {
              return t4.cols - e4;
            }(l > t3 ? e3 : o2, i3) + (_ - 1) * i3.cols + 1 + ((l > t3 ? o2 : e3) - 1), h2(d, s3));
          };
        }, 8036: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TEXT_BASELINE = t2.DIM_OPACITY = t2.INVERTED_DEFAULT_COLOR = void 0;
          const s2 = i2(6114);
          t2.INVERTED_DEFAULT_COLOR = 257, t2.DIM_OPACITY = 0.5, t2.TEXT_BASELINE = s2.isFirefox || s2.isLegacyEdge ? "bottom" : "ideographic";
        }, 1752: (e2, t2) => {
          function i2(e3) {
            return 57508 <= e3 && e3 <= 57558;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.excludeFromContrastRatioDemands = t2.isRestrictedPowerlineGlyph = t2.isPowerlineGlyph = t2.throwIfFalsy = void 0, t2.throwIfFalsy = function(e3) {
            if (!e3)
              throw new Error("value must not be falsy");
            return e3;
          }, t2.isPowerlineGlyph = i2, t2.isRestrictedPowerlineGlyph = function(e3) {
            return 57520 <= e3 && e3 <= 57527;
          }, t2.excludeFromContrastRatioDemands = function(e3) {
            return i2(e3) || function(e4) {
              return 9472 <= e4 && e4 <= 9631;
            }(e3);
          };
        }, 1296: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DomRenderer = void 0;
          const n = i2(3787), o = i2(8036), a = i2(844), h2 = i2(4725), c = i2(2585), l = i2(8460), d = i2(8055), _ = i2(9631), u = "xterm-dom-renderer-owner-", f = "xterm-focus";
          let v = 1, g = class extends a.Disposable {
            constructor(e3, t3, i3, s3, r2, o2, a2, h3, c2, l2) {
              super(), this._colors = e3, this._element = t3, this._screenElement = i3, this._viewportElement = s3, this._linkifier2 = r2, this._charSizeService = a2, this._optionsService = h3, this._bufferService = c2, this._coreBrowserService = l2, this._terminalClass = v++, this._rowElements = [], this._rowContainer = document.createElement("div"), this._rowContainer.classList.add("xterm-rows"), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = document.createElement("div"), this._selectionContainer.classList.add("xterm-selection"), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = { scaledCharWidth: 0, scaledCharHeight: 0, scaledCellWidth: 0, scaledCellHeight: 0, scaledCharLeft: 0, scaledCharTop: 0, scaledCanvasWidth: 0, scaledCanvasHeight: 0, canvasWidth: 0, canvasHeight: 0, actualCellWidth: 0, actualCellHeight: 0 }, this._updateDimensions(), this._injectCss(), this._rowFactory = o2.createInstance(n.DomRendererRowFactory, document, this._colors), this._element.classList.add(u + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline((e4) => this._onLinkHover(e4))), this.register(this._linkifier2.onHideLinkUnderline((e4) => this._onLinkLeave(e4)));
            }
            get onRequestRedraw() {
              return new l.EventEmitter().event;
            }
            dispose() {
              this._element.classList.remove(u + this._terminalClass), (0, _.removeElementFromParent)(this._rowContainer, this._selectionContainer, this._themeStyleElement, this._dimensionsStyleElement), super.dispose();
            }
            _updateDimensions() {
              const e3 = this._coreBrowserService.dpr;
              this.dimensions.scaledCharWidth = this._charSizeService.width * e3, this.dimensions.scaledCharHeight = Math.ceil(this._charSizeService.height * e3), this.dimensions.scaledCellWidth = this.dimensions.scaledCharWidth + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.scaledCellHeight = Math.floor(this.dimensions.scaledCharHeight * this._optionsService.rawOptions.lineHeight), this.dimensions.scaledCharLeft = 0, this.dimensions.scaledCharTop = 0, this.dimensions.scaledCanvasWidth = this.dimensions.scaledCellWidth * this._bufferService.cols, this.dimensions.scaledCanvasHeight = this.dimensions.scaledCellHeight * this._bufferService.rows, this.dimensions.canvasWidth = Math.round(this.dimensions.scaledCanvasWidth / e3), this.dimensions.canvasHeight = Math.round(this.dimensions.scaledCanvasHeight / e3), this.dimensions.actualCellWidth = this.dimensions.canvasWidth / this._bufferService.cols, this.dimensions.actualCellHeight = this.dimensions.canvasHeight / this._bufferService.rows;
              for (const e4 of this._rowElements)
                e4.style.width = `${this.dimensions.canvasWidth}px`, e4.style.height = `${this.dimensions.actualCellHeight}px`, e4.style.lineHeight = `${this.dimensions.actualCellHeight}px`, e4.style.overflow = "hidden";
              this._dimensionsStyleElement || (this._dimensionsStyleElement = document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
              const t3 = `${this._terminalSelector} .xterm-rows span { display: inline-block; height: 100%; vertical-align: top; width: ${this.dimensions.actualCellWidth}px}`;
              this._dimensionsStyleElement.textContent = t3, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.canvasWidth}px`, this._screenElement.style.height = `${this.dimensions.canvasHeight}px`;
            }
            setColors(e3) {
              this._colors = e3, this._injectCss();
            }
            _injectCss() {
              this._themeStyleElement || (this._themeStyleElement = document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
              let e3 = `${this._terminalSelector} .xterm-rows { color: ${this._colors.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px;}`;
              e3 += `${this._terminalSelector} span:not(.${n.BOLD_CLASS}) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.${n.BOLD_CLASS} { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.${n.ITALIC_CLASS} { font-style: italic;}`, e3 += "@keyframes blink_box_shadow_" + this._terminalClass + " { 50% {  box-shadow: none; }}", e3 += "@keyframes blink_block_" + this._terminalClass + ` { 0% {  background-color: ${this._colors.cursor.css};  color: ${this._colors.cursorAccent.css}; } 50% {  background-color: ${this._colors.cursorAccent.css};  color: ${this._colors.cursor.css}; }}`, e3 += `${this._terminalSelector} .xterm-rows:not(.xterm-focus) .${n.CURSOR_CLASS}.${n.CURSOR_STYLE_BLOCK_CLASS} { outline: 1px solid ${this._colors.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .xterm-rows.xterm-focus .${n.CURSOR_CLASS}.${n.CURSOR_BLINK_CLASS}:not(.${n.CURSOR_STYLE_BLOCK_CLASS}) { animation: blink_box_shadow_` + this._terminalClass + ` 1s step-end infinite;}${this._terminalSelector} .xterm-rows.xterm-focus .${n.CURSOR_CLASS}.${n.CURSOR_BLINK_CLASS}.${n.CURSOR_STYLE_BLOCK_CLASS} { animation: blink_block_` + this._terminalClass + ` 1s step-end infinite;}${this._terminalSelector} .xterm-rows.xterm-focus .${n.CURSOR_CLASS}.${n.CURSOR_STYLE_BLOCK_CLASS} { background-color: ${this._colors.cursor.css}; color: ${this._colors.cursorAccent.css};}${this._terminalSelector} .xterm-rows .${n.CURSOR_CLASS}.${n.CURSOR_STYLE_BAR_CLASS} { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${this._colors.cursor.css} inset;}${this._terminalSelector} .xterm-rows .${n.CURSOR_CLASS}.${n.CURSOR_STYLE_UNDERLINE_CLASS} { box-shadow: 0 -1px 0 ${this._colors.cursor.css} inset;}`, e3 += `${this._terminalSelector} .xterm-selection { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .xterm-selection div { position: absolute; background-color: ${this._colors.selectionBackgroundOpaque.css};}${this._terminalSelector} .xterm-selection div { position: absolute; background-color: ${this._colors.selectionInactiveBackgroundOpaque.css};}`, this._colors.ansi.forEach((t3, i3) => {
                e3 += `${this._terminalSelector} .xterm-fg-${i3} { color: ${t3.css}; }${this._terminalSelector} .xterm-bg-${i3} { background-color: ${t3.css}; }`;
              }), e3 += `${this._terminalSelector} .xterm-fg-${o.INVERTED_DEFAULT_COLOR} { color: ${d.color.opaque(this._colors.background).css}; }${this._terminalSelector} .xterm-bg-${o.INVERTED_DEFAULT_COLOR} { background-color: ${this._colors.foreground.css}; }`, this._themeStyleElement.textContent = e3;
            }
            onDevicePixelRatioChange() {
              this._updateDimensions();
            }
            _refreshRowElements(e3, t3) {
              for (let e4 = this._rowElements.length; e4 <= t3; e4++) {
                const e5 = document.createElement("div");
                this._rowContainer.appendChild(e5), this._rowElements.push(e5);
              }
              for (; this._rowElements.length > t3; )
                this._rowContainer.removeChild(this._rowElements.pop());
            }
            onResize(e3, t3) {
              this._refreshRowElements(e3, t3), this._updateDimensions();
            }
            onCharSizeChanged() {
              this._updateDimensions();
            }
            onBlur() {
              this._rowContainer.classList.remove(f);
            }
            onFocus() {
              this._rowContainer.classList.add(f);
            }
            onSelectionChanged(e3, t3, i3) {
              for (; this._selectionContainer.children.length; )
                this._selectionContainer.removeChild(this._selectionContainer.children[0]);
              if (this._rowFactory.onSelectionChanged(e3, t3, i3), this.renderRows(0, this._bufferService.rows - 1), !e3 || !t3)
                return;
              const s3 = e3[1] - this._bufferService.buffer.ydisp, r2 = t3[1] - this._bufferService.buffer.ydisp, n2 = Math.max(s3, 0), o2 = Math.min(r2, this._bufferService.rows - 1);
              if (n2 >= this._bufferService.rows || o2 < 0)
                return;
              const a2 = document.createDocumentFragment();
              if (i3) {
                const i4 = e3[0] > t3[0];
                a2.appendChild(this._createSelectionElement(n2, i4 ? t3[0] : e3[0], i4 ? e3[0] : t3[0], o2 - n2 + 1));
              } else {
                const i4 = s3 === n2 ? e3[0] : 0, h3 = n2 === r2 ? t3[0] : this._bufferService.cols;
                a2.appendChild(this._createSelectionElement(n2, i4, h3));
                const c2 = o2 - n2 - 1;
                if (a2.appendChild(this._createSelectionElement(n2 + 1, 0, this._bufferService.cols, c2)), n2 !== o2) {
                  const e4 = r2 === o2 ? t3[0] : this._bufferService.cols;
                  a2.appendChild(this._createSelectionElement(o2, 0, e4));
                }
              }
              this._selectionContainer.appendChild(a2);
            }
            _createSelectionElement(e3, t3, i3, s3 = 1) {
              const r2 = document.createElement("div");
              return r2.style.height = s3 * this.dimensions.actualCellHeight + "px", r2.style.top = e3 * this.dimensions.actualCellHeight + "px", r2.style.left = t3 * this.dimensions.actualCellWidth + "px", r2.style.width = this.dimensions.actualCellWidth * (i3 - t3) + "px", r2;
            }
            onCursorMove() {
            }
            onOptionsChanged() {
              this._updateDimensions(), this._injectCss();
            }
            clear() {
              for (const e3 of this._rowElements)
                e3.innerText = "";
            }
            renderRows(e3, t3) {
              const i3 = this._bufferService.buffer.ybase + this._bufferService.buffer.y, s3 = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), r2 = this._optionsService.rawOptions.cursorBlink;
              for (let n2 = e3; n2 <= t3; n2++) {
                const e4 = this._rowElements[n2];
                e4.innerText = "";
                const t4 = n2 + this._bufferService.buffer.ydisp, o2 = this._bufferService.buffer.lines.get(t4), a2 = this._optionsService.rawOptions.cursorStyle;
                e4.appendChild(this._rowFactory.createRow(o2, t4, t4 === i3, a2, s3, r2, this.dimensions.actualCellWidth, this._bufferService.cols));
              }
            }
            get _terminalSelector() {
              return `.${u}${this._terminalClass}`;
            }
            _onLinkHover(e3) {
              this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, true);
            }
            _onLinkLeave(e3) {
              this._setCellUnderline(e3.x1, e3.x2, e3.y1, e3.y2, e3.cols, false);
            }
            _setCellUnderline(e3, t3, i3, s3, r2, n2) {
              for (; e3 !== t3 || i3 !== s3; ) {
                const t4 = this._rowElements[i3];
                if (!t4)
                  return;
                const s4 = t4.children[e3];
                s4 && (s4.style.textDecoration = n2 ? "underline" : "none"), ++e3 >= r2 && (e3 = 0, i3++);
              }
            }
          };
          g = s2([r(5, c.IInstantiationService), r(6, h2.ICharSizeService), r(7, c.IOptionsService), r(8, c.IBufferService), r(9, h2.ICoreBrowserService)], g), t2.DomRenderer = g;
        }, 3787: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DomRendererRowFactory = t2.CURSOR_STYLE_UNDERLINE_CLASS = t2.CURSOR_STYLE_BAR_CLASS = t2.CURSOR_STYLE_BLOCK_CLASS = t2.CURSOR_BLINK_CLASS = t2.CURSOR_CLASS = t2.STRIKETHROUGH_CLASS = t2.UNDERLINE_CLASS = t2.ITALIC_CLASS = t2.DIM_CLASS = t2.BOLD_CLASS = void 0;
          const n = i2(8036), o = i2(643), a = i2(511), h2 = i2(2585), c = i2(8055), l = i2(4725), d = i2(4269), _ = i2(1752), u = i2(3734);
          t2.BOLD_CLASS = "xterm-bold", t2.DIM_CLASS = "xterm-dim", t2.ITALIC_CLASS = "xterm-italic", t2.UNDERLINE_CLASS = "xterm-underline", t2.STRIKETHROUGH_CLASS = "xterm-strikethrough", t2.CURSOR_CLASS = "xterm-cursor", t2.CURSOR_BLINK_CLASS = "xterm-cursor-blink", t2.CURSOR_STYLE_BLOCK_CLASS = "xterm-cursor-block", t2.CURSOR_STYLE_BAR_CLASS = "xterm-cursor-bar", t2.CURSOR_STYLE_UNDERLINE_CLASS = "xterm-cursor-underline";
          let f = class {
            constructor(e3, t3, i3, s3, r2, n2, o2) {
              this._document = e3, this._colors = t3, this._characterJoinerService = i3, this._optionsService = s3, this._coreBrowserService = r2, this._coreService = n2, this._decorationService = o2, this._workCell = new a.CellData(), this._columnSelectMode = false;
            }
            setColors(e3) {
              this._colors = e3;
            }
            onSelectionChanged(e3, t3, i3) {
              this._selectionStart = e3, this._selectionEnd = t3, this._columnSelectMode = i3;
            }
            createRow(e3, i3, s3, r2, a2, h3, l2, _2) {
              const f2 = this._document.createDocumentFragment(), g = this._characterJoinerService.getJoinedCharacters(i3);
              let p2 = 0;
              for (let t3 = Math.min(e3.length, _2) - 1; t3 >= 0; t3--)
                if (e3.loadCell(t3, this._workCell).getCode() !== o.NULL_CELL_CODE || s3 && t3 === a2) {
                  p2 = t3 + 1;
                  break;
                }
              for (let _3 = 0; _3 < p2; _3++) {
                e3.loadCell(_3, this._workCell);
                let p3 = this._workCell.getWidth();
                if (0 === p3)
                  continue;
                let S = false, m3 = _3, C = this._workCell;
                if (g.length > 0 && _3 === g[0][0]) {
                  S = true;
                  const t3 = g.shift();
                  C = new d.JoinedCellData(this._workCell, e3.translateToString(true, t3[0], t3[1]), t3[1] - t3[0]), m3 = t3[1] - 1, p3 = C.getWidth();
                }
                const b = this._document.createElement("span");
                if (p3 > 1 && (b.style.width = l2 * p3 + "px"), S && (b.style.display = "inline", a2 >= _3 && a2 <= m3 && (a2 = _3)), !this._coreService.isCursorHidden && s3 && _3 === a2)
                  switch (b.classList.add(t2.CURSOR_CLASS), h3 && b.classList.add(t2.CURSOR_BLINK_CLASS), r2) {
                    case "bar":
                      b.classList.add(t2.CURSOR_STYLE_BAR_CLASS);
                      break;
                    case "underline":
                      b.classList.add(t2.CURSOR_STYLE_UNDERLINE_CLASS);
                      break;
                    default:
                      b.classList.add(t2.CURSOR_STYLE_BLOCK_CLASS);
                  }
                if (C.isBold() && b.classList.add(t2.BOLD_CLASS), C.isItalic() && b.classList.add(t2.ITALIC_CLASS), C.isDim() && b.classList.add(t2.DIM_CLASS), C.isInvisible() ? b.textContent = o.WHITESPACE_CELL_CHAR : b.textContent = C.getChars() || o.WHITESPACE_CELL_CHAR, C.isUnderline() && (b.classList.add(`${t2.UNDERLINE_CLASS}-${C.extended.underlineStyle}`), " " === b.textContent && (b.innerHTML = "&nbsp;"), !C.isUnderlineColorDefault()))
                  if (C.isUnderlineColorRGB())
                    b.style.textDecorationColor = `rgb(${u.AttributeData.toColorRGB(C.getUnderlineColor()).join(",")})`;
                  else {
                    let e4 = C.getUnderlineColor();
                    this._optionsService.rawOptions.drawBoldTextInBrightColors && C.isBold() && e4 < 8 && (e4 += 8), b.style.textDecorationColor = this._colors.ansi[e4].css;
                  }
                C.isStrikethrough() && b.classList.add(t2.STRIKETHROUGH_CLASS);
                let y = C.getFgColor(), w = C.getFgColorMode(), E = C.getBgColor(), L = C.getBgColorMode();
                const R = !!C.isInverse();
                if (R) {
                  const e4 = y;
                  y = E, E = e4;
                  const t3 = w;
                  w = L, L = t3;
                }
                let k, D, A = false;
                this._decorationService.forEachDecorationAtCell(_3, i3, void 0, (e4) => {
                  "top" !== e4.options.layer && A || (e4.backgroundColorRGB && (L = 50331648, E = e4.backgroundColorRGB.rgba >> 8 & 16777215, k = e4.backgroundColorRGB), e4.foregroundColorRGB && (w = 50331648, y = e4.foregroundColorRGB.rgba >> 8 & 16777215, D = e4.foregroundColorRGB), A = "top" === e4.options.layer);
                });
                const x = this._isCellInSelection(_3, i3);
                let B;
                switch (A || this._colors.selectionForeground && x && (w = 50331648, y = this._colors.selectionForeground.rgba >> 8 & 16777215, D = this._colors.selectionForeground), x && (k = this._coreBrowserService.isFocused ? this._colors.selectionBackgroundOpaque : this._colors.selectionInactiveBackgroundOpaque, A = true), A && b.classList.add("xterm-decoration-top"), L) {
                  case 16777216:
                  case 33554432:
                    B = this._colors.ansi[E], b.classList.add(`xterm-bg-${E}`);
                    break;
                  case 50331648:
                    B = c.rgba.toColor(E >> 16, E >> 8 & 255, 255 & E), this._addStyle(b, `background-color:#${v((E >>> 0).toString(16), "0", 6)}`);
                    break;
                  default:
                    R ? (B = this._colors.foreground, b.classList.add(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : B = this._colors.background;
                }
                switch (k || C.isDim() && (k = c.color.multiplyOpacity(B, 0.5)), w) {
                  case 16777216:
                  case 33554432:
                    C.isBold() && y < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (y += 8), this._applyMinimumContrast(b, B, this._colors.ansi[y], C, k, void 0) || b.classList.add(`xterm-fg-${y}`);
                    break;
                  case 50331648:
                    const e4 = c.rgba.toColor(y >> 16 & 255, y >> 8 & 255, 255 & y);
                    this._applyMinimumContrast(b, B, e4, C, k, D) || this._addStyle(b, `color:#${v(y.toString(16), "0", 6)}`);
                    break;
                  default:
                    this._applyMinimumContrast(b, B, this._colors.foreground, C, k, void 0) || R && b.classList.add(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
                }
                f2.appendChild(b), _3 = m3;
              }
              return f2;
            }
            _applyMinimumContrast(e3, t3, i3, s3, r2, n2) {
              if (1 === this._optionsService.rawOptions.minimumContrastRatio || (0, _.excludeFromContrastRatioDemands)(s3.getCode()))
                return false;
              let o2;
              return r2 || n2 || (o2 = this._colors.contrastCache.getColor(t3.rgba, i3.rgba)), void 0 === o2 && (o2 = c.color.ensureContrastRatio(r2 || t3, n2 || i3, this._optionsService.rawOptions.minimumContrastRatio), this._colors.contrastCache.setColor((r2 || t3).rgba, (n2 || i3).rgba, null != o2 ? o2 : null)), !!o2 && (this._addStyle(e3, `color:${o2.css}`), true);
            }
            _addStyle(e3, t3) {
              e3.setAttribute("style", `${e3.getAttribute("style") || ""}${t3};`);
            }
            _isCellInSelection(e3, t3) {
              const i3 = this._selectionStart, s3 = this._selectionEnd;
              return !(!i3 || !s3) && (this._columnSelectMode ? i3[0] <= s3[0] ? e3 >= i3[0] && t3 >= i3[1] && e3 < s3[0] && t3 <= s3[1] : e3 < i3[0] && t3 >= i3[1] && e3 >= s3[0] && t3 <= s3[1] : t3 > i3[1] && t3 < s3[1] || i3[1] === s3[1] && t3 === i3[1] && e3 >= i3[0] && e3 < s3[0] || i3[1] < s3[1] && t3 === s3[1] && e3 < s3[0] || i3[1] < s3[1] && t3 === i3[1] && e3 >= i3[0]);
            }
          };
          function v(e3, t3, i3) {
            for (; e3.length < i3; )
              e3 = t3 + e3;
            return e3;
          }
          f = s2([r(2, l.ICharacterJoinerService), r(3, h2.IOptionsService), r(4, l.ICoreBrowserService), r(5, h2.ICoreService), r(6, h2.IDecorationService)], f), t2.DomRendererRowFactory = f;
        }, 456: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SelectionModel = void 0, t2.SelectionModel = class {
            constructor(e3) {
              this._bufferService = e3, this.isSelectAllActive = false, this.selectionStartLength = 0;
            }
            clearSelection() {
              this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
            }
            get finalSelectionStart() {
              return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
            }
            get finalSelectionEnd() {
              if (this.isSelectAllActive)
                return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
              if (this.selectionStart) {
                if (!this.selectionEnd || this.areSelectionValuesReversed()) {
                  const e3 = this.selectionStart[0] + this.selectionStartLength;
                  return e3 > this._bufferService.cols ? e3 % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols) - 1] : [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [e3, this.selectionStart[1]];
                }
                if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
                  const e3 = this.selectionStart[0] + this.selectionStartLength;
                  return e3 > this._bufferService.cols ? [e3 % this._bufferService.cols, this.selectionStart[1] + Math.floor(e3 / this._bufferService.cols)] : [Math.max(e3, this.selectionEnd[0]), this.selectionEnd[1]];
                }
                return this.selectionEnd;
              }
            }
            areSelectionValuesReversed() {
              const e3 = this.selectionStart, t3 = this.selectionEnd;
              return !(!e3 || !t3) && (e3[1] > t3[1] || e3[1] === t3[1] && e3[0] > t3[0]);
            }
            onTrim(e3) {
              return this.selectionStart && (this.selectionStart[1] -= e3), this.selectionEnd && (this.selectionEnd[1] -= e3), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
            }
          };
        }, 428: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CharSizeService = void 0;
          const n = i2(2585), o = i2(8460);
          let a = class {
            constructor(e3, t3, i3) {
              this._optionsService = i3, this.width = 0, this.height = 0, this._onCharSizeChange = new o.EventEmitter(), this._measureStrategy = new h2(e3, t3, this._optionsService);
            }
            get hasValidSize() {
              return this.width > 0 && this.height > 0;
            }
            get onCharSizeChange() {
              return this._onCharSizeChange.event;
            }
            measure() {
              const e3 = this._measureStrategy.measure();
              e3.width === this.width && e3.height === this.height || (this.width = e3.width, this.height = e3.height, this._onCharSizeChange.fire());
            }
          };
          a = s2([r(2, n.IOptionsService)], a), t2.CharSizeService = a;
          class h2 {
            constructor(e3, t3, i3) {
              this._document = e3, this._parentElement = t3, this._optionsService = i3, this._result = { width: 0, height: 0 }, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W", this._measureElement.setAttribute("aria-hidden", "true"), this._parentElement.appendChild(this._measureElement);
            }
            measure() {
              this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`;
              const e3 = this._measureElement.getBoundingClientRect();
              return 0 !== e3.width && 0 !== e3.height && (this._result.width = e3.width, this._result.height = Math.ceil(e3.height)), this._result;
            }
          }
        }, 4269: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CharacterJoinerService = t2.JoinedCellData = void 0;
          const n = i2(3734), o = i2(643), a = i2(511), h2 = i2(2585);
          class c extends n.AttributeData {
            constructor(e3, t3, i3) {
              super(), this.content = 0, this.combinedData = "", this.fg = e3.fg, this.bg = e3.bg, this.combinedData = t3, this._width = i3;
            }
            isCombined() {
              return 2097152;
            }
            getWidth() {
              return this._width;
            }
            getChars() {
              return this.combinedData;
            }
            getCode() {
              return 2097151;
            }
            setFromCharData(e3) {
              throw new Error("not implemented");
            }
            getAsCharData() {
              return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
            }
          }
          t2.JoinedCellData = c;
          let l = class e3 {
            constructor(e4) {
              this._bufferService = e4, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new a.CellData();
            }
            register(e4) {
              const t3 = { id: this._nextCharacterJoinerId++, handler: e4 };
              return this._characterJoiners.push(t3), t3.id;
            }
            deregister(e4) {
              for (let t3 = 0; t3 < this._characterJoiners.length; t3++)
                if (this._characterJoiners[t3].id === e4)
                  return this._characterJoiners.splice(t3, 1), true;
              return false;
            }
            getJoinedCharacters(e4) {
              if (0 === this._characterJoiners.length)
                return [];
              const t3 = this._bufferService.buffer.lines.get(e4);
              if (!t3 || 0 === t3.length)
                return [];
              const i3 = [], s3 = t3.translateToString(true);
              let r2 = 0, n2 = 0, a2 = 0, h3 = t3.getFg(0), c2 = t3.getBg(0);
              for (let e5 = 0; e5 < t3.getTrimmedLength(); e5++)
                if (t3.loadCell(e5, this._workCell), 0 !== this._workCell.getWidth()) {
                  if (this._workCell.fg !== h3 || this._workCell.bg !== c2) {
                    if (e5 - r2 > 1) {
                      const e6 = this._getJoinedRanges(s3, a2, n2, t3, r2);
                      for (let t4 = 0; t4 < e6.length; t4++)
                        i3.push(e6[t4]);
                    }
                    r2 = e5, a2 = n2, h3 = this._workCell.fg, c2 = this._workCell.bg;
                  }
                  n2 += this._workCell.getChars().length || o.WHITESPACE_CELL_CHAR.length;
                }
              if (this._bufferService.cols - r2 > 1) {
                const e5 = this._getJoinedRanges(s3, a2, n2, t3, r2);
                for (let t4 = 0; t4 < e5.length; t4++)
                  i3.push(e5[t4]);
              }
              return i3;
            }
            _getJoinedRanges(t3, i3, s3, r2, n2) {
              const o2 = t3.substring(i3, s3);
              let a2 = [];
              try {
                a2 = this._characterJoiners[0].handler(o2);
              } catch (e4) {
                console.error(e4);
              }
              for (let t4 = 1; t4 < this._characterJoiners.length; t4++)
                try {
                  const i4 = this._characterJoiners[t4].handler(o2);
                  for (let t5 = 0; t5 < i4.length; t5++)
                    e3._mergeRanges(a2, i4[t5]);
                } catch (e4) {
                  console.error(e4);
                }
              return this._stringRangesToCellRanges(a2, r2, n2), a2;
            }
            _stringRangesToCellRanges(e4, t3, i3) {
              let s3 = 0, r2 = false, n2 = 0, a2 = e4[s3];
              if (a2) {
                for (let h3 = i3; h3 < this._bufferService.cols; h3++) {
                  const i4 = t3.getWidth(h3), c2 = t3.getString(h3).length || o.WHITESPACE_CELL_CHAR.length;
                  if (0 !== i4) {
                    if (!r2 && a2[0] <= n2 && (a2[0] = h3, r2 = true), a2[1] <= n2) {
                      if (a2[1] = h3, a2 = e4[++s3], !a2)
                        break;
                      a2[0] <= n2 ? (a2[0] = h3, r2 = true) : r2 = false;
                    }
                    n2 += c2;
                  }
                }
                a2 && (a2[1] = this._bufferService.cols);
              }
            }
            static _mergeRanges(e4, t3) {
              let i3 = false;
              for (let s3 = 0; s3 < e4.length; s3++) {
                const r2 = e4[s3];
                if (i3) {
                  if (t3[1] <= r2[0])
                    return e4[s3 - 1][1] = t3[1], e4;
                  if (t3[1] <= r2[1])
                    return e4[s3 - 1][1] = Math.max(t3[1], r2[1]), e4.splice(s3, 1), e4;
                  e4.splice(s3, 1), s3--;
                } else {
                  if (t3[1] <= r2[0])
                    return e4.splice(s3, 0, t3), e4;
                  if (t3[1] <= r2[1])
                    return r2[0] = Math.min(t3[0], r2[0]), e4;
                  t3[0] < r2[1] && (r2[0] = Math.min(t3[0], r2[0]), i3 = true);
                }
              }
              return i3 ? e4[e4.length - 1][1] = t3[1] : e4.push(t3), e4;
            }
          };
          l = s2([r(0, h2.IBufferService)], l), t2.CharacterJoinerService = l;
        }, 5114: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreBrowserService = void 0, t2.CoreBrowserService = class {
            constructor(e3, t3) {
              this._textarea = e3, this.window = t3;
            }
            get dpr() {
              return this.window.devicePixelRatio;
            }
            get isFocused() {
              return (this._textarea.getRootNode ? this._textarea.getRootNode() : this._textarea.ownerDocument).activeElement === this._textarea && this._textarea.ownerDocument.hasFocus();
            }
          };
        }, 8934: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MouseService = void 0;
          const n = i2(4725), o = i2(9806);
          let a = class {
            constructor(e3, t3) {
              this._renderService = e3, this._charSizeService = t3;
            }
            getCoords(e3, t3, i3, s3, r2) {
              return (0, o.getCoords)(window, e3, t3, i3, s3, this._charSizeService.hasValidSize, this._renderService.dimensions.actualCellWidth, this._renderService.dimensions.actualCellHeight, r2);
            }
            getMouseReportCoords(e3, t3) {
              const i3 = (0, o.getCoordsRelativeToElement)(window, e3, t3);
              if (!(!this._charSizeService.hasValidSize || i3[0] < 0 || i3[1] < 0 || i3[0] >= this._renderService.dimensions.canvasWidth || i3[1] >= this._renderService.dimensions.canvasHeight))
                return { col: Math.floor(i3[0] / this._renderService.dimensions.actualCellWidth), row: Math.floor(i3[1] / this._renderService.dimensions.actualCellHeight), x: Math.floor(i3[0]), y: Math.floor(i3[1]) };
            }
          };
          a = s2([r(0, n.IRenderService), r(1, n.ICharSizeService)], a), t2.MouseService = a;
        }, 3230: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.RenderService = void 0;
          const n = i2(6193), o = i2(8460), a = i2(844), h2 = i2(5596), c = i2(3656), l = i2(2585), d = i2(4725);
          let _ = class extends a.Disposable {
            constructor(e3, t3, i3, s3, r2, a2, l2, d2) {
              if (super(), this._renderer = e3, this._rowCount = t3, this._charSizeService = r2, this._isPaused = false, this._needsFullRefresh = false, this._isNextRenderRedrawOnly = true, this._needsSelectionRefresh = false, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = { start: void 0, end: void 0, columnSelectMode: false }, this._onDimensionsChange = new o.EventEmitter(), this._onRenderedViewportChange = new o.EventEmitter(), this._onRender = new o.EventEmitter(), this._onRefreshRequest = new o.EventEmitter(), this.register({ dispose: () => this._renderer.dispose() }), this._renderDebouncer = new n.RenderDebouncer(d2.window, (e4, t4) => this._renderRows(e4, t4)), this.register(this._renderDebouncer), this._screenDprMonitor = new h2.ScreenDprMonitor(d2.window), this._screenDprMonitor.setListener(() => this.onDevicePixelRatioChange()), this.register(this._screenDprMonitor), this.register(l2.onResize(() => this._fullRefresh())), this.register(l2.buffers.onBufferActivate(() => {
                var e4;
                return null === (e4 = this._renderer) || void 0 === e4 ? void 0 : e4.clear();
              })), this.register(s3.onOptionChange(() => this._handleOptionsChanged())), this.register(this._charSizeService.onCharSizeChange(() => this.onCharSizeChanged())), this.register(a2.onDecorationRegistered(() => this._fullRefresh())), this.register(a2.onDecorationRemoved(() => this._fullRefresh())), this._renderer.onRequestRedraw((e4) => this.refreshRows(e4.start, e4.end, true)), this.register((0, c.addDisposableDomListener)(d2.window, "resize", () => this.onDevicePixelRatioChange())), "IntersectionObserver" in d2.window) {
                const e4 = new d2.window.IntersectionObserver((e5) => this._onIntersectionChange(e5[e5.length - 1]), { threshold: 0 });
                e4.observe(i3), this.register({ dispose: () => e4.disconnect() });
              }
            }
            get onDimensionsChange() {
              return this._onDimensionsChange.event;
            }
            get onRenderedViewportChange() {
              return this._onRenderedViewportChange.event;
            }
            get onRender() {
              return this._onRender.event;
            }
            get onRefreshRequest() {
              return this._onRefreshRequest.event;
            }
            get dimensions() {
              return this._renderer.dimensions;
            }
            _onIntersectionChange(e3) {
              this._isPaused = void 0 === e3.isIntersecting ? 0 === e3.intersectionRatio : !e3.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
            }
            refreshRows(e3, t3, i3 = false) {
              this._isPaused ? this._needsFullRefresh = true : (i3 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e3, t3, this._rowCount));
            }
            _renderRows(e3, t3) {
              this._renderer.renderRows(e3, t3), this._needsSelectionRefresh && (this._renderer.onSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e3, end: t3 }), this._onRender.fire({ start: e3, end: t3 }), this._isNextRenderRedrawOnly = true;
            }
            resize(e3, t3) {
              this._rowCount = t3, this._fireOnCanvasResize();
            }
            _handleOptionsChanged() {
              this._renderer.onOptionsChanged(), this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize();
            }
            _fireOnCanvasResize() {
              this._renderer.dimensions.canvasWidth === this._canvasWidth && this._renderer.dimensions.canvasHeight === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.dimensions);
            }
            dispose() {
              super.dispose();
            }
            setRenderer(e3) {
              this._renderer.dispose(), this._renderer = e3, this._renderer.onRequestRedraw((e4) => this.refreshRows(e4.start, e4.end, true)), this._needsSelectionRefresh = true, this._fullRefresh();
            }
            addRefreshCallback(e3) {
              return this._renderDebouncer.addRefreshCallback(e3);
            }
            _fullRefresh() {
              this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
            }
            clearTextureAtlas() {
              var e3, t3;
              null === (t3 = null === (e3 = this._renderer) || void 0 === e3 ? void 0 : e3.clearTextureAtlas) || void 0 === t3 || t3.call(e3), this._fullRefresh();
            }
            setColors(e3) {
              this._renderer.setColors(e3), this._fullRefresh();
            }
            onDevicePixelRatioChange() {
              this._charSizeService.measure(), this._renderer.onDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1);
            }
            onResize(e3, t3) {
              this._renderer.onResize(e3, t3), this._fullRefresh();
            }
            onCharSizeChanged() {
              this._renderer.onCharSizeChanged();
            }
            onBlur() {
              this._renderer.onBlur();
            }
            onFocus() {
              this._renderer.onFocus();
            }
            onSelectionChanged(e3, t3, i3) {
              this._selectionState.start = e3, this._selectionState.end = t3, this._selectionState.columnSelectMode = i3, this._renderer.onSelectionChanged(e3, t3, i3);
            }
            onCursorMove() {
              this._renderer.onCursorMove();
            }
            clear() {
              this._renderer.clear();
            }
          };
          _ = s2([r(3, l.IOptionsService), r(4, d.ICharSizeService), r(5, l.IDecorationService), r(6, l.IBufferService), r(7, d.ICoreBrowserService)], _), t2.RenderService = _;
        }, 9312: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SelectionService = void 0;
          const n = i2(6114), o = i2(456), a = i2(511), h2 = i2(8460), c = i2(4725), l = i2(2585), d = i2(9806), _ = i2(9504), u = i2(844), f = i2(4841), v = String.fromCharCode(160), g = new RegExp(v, "g");
          let p2 = class extends u.Disposable {
            constructor(e3, t3, i3, s3, r2, n2, c2, l2, d2) {
              super(), this._element = e3, this._screenElement = t3, this._linkifier = i3, this._bufferService = s3, this._coreService = r2, this._mouseService = n2, this._optionsService = c2, this._renderService = l2, this._coreBrowserService = d2, this._dragScrollAmount = 0, this._enabled = true, this._workCell = new a.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = false, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new h2.EventEmitter()), this._onRedrawRequest = this.register(new h2.EventEmitter()), this._onSelectionChange = this.register(new h2.EventEmitter()), this._onRequestScrollLines = this.register(new h2.EventEmitter()), this._mouseMoveListener = (e4) => this._onMouseMove(e4), this._mouseUpListener = (e4) => this._onMouseUp(e4), this._coreService.onUserInput(() => {
                this.hasSelection && this.clearSelection();
              }), this._trimListener = this._bufferService.buffer.lines.onTrim((e4) => this._onTrim(e4)), this.register(this._bufferService.buffers.onBufferActivate((e4) => this._onBufferActivate(e4))), this.enable(), this._model = new o.SelectionModel(this._bufferService), this._activeSelectionMode = 0;
            }
            get onLinuxMouseSelection() {
              return this._onLinuxMouseSelection.event;
            }
            get onRequestRedraw() {
              return this._onRedrawRequest.event;
            }
            get onSelectionChange() {
              return this._onSelectionChange.event;
            }
            get onRequestScrollLines() {
              return this._onRequestScrollLines.event;
            }
            dispose() {
              this._removeMouseDownListeners();
            }
            reset() {
              this.clearSelection();
            }
            disable() {
              this.clearSelection(), this._enabled = false;
            }
            enable() {
              this._enabled = true;
            }
            get selectionStart() {
              return this._model.finalSelectionStart;
            }
            get selectionEnd() {
              return this._model.finalSelectionEnd;
            }
            get hasSelection() {
              const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd;
              return !(!e3 || !t3 || e3[0] === t3[0] && e3[1] === t3[1]);
            }
            get selectionText() {
              const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd;
              if (!e3 || !t3)
                return "";
              const i3 = this._bufferService.buffer, s3 = [];
              if (3 === this._activeSelectionMode) {
                if (e3[0] === t3[0])
                  return "";
                const r2 = e3[0] < t3[0] ? e3[0] : t3[0], n2 = e3[0] < t3[0] ? t3[0] : e3[0];
                for (let o2 = e3[1]; o2 <= t3[1]; o2++) {
                  const e4 = i3.translateBufferLineToString(o2, true, r2, n2);
                  s3.push(e4);
                }
              } else {
                const r2 = e3[1] === t3[1] ? t3[0] : void 0;
                s3.push(i3.translateBufferLineToString(e3[1], true, e3[0], r2));
                for (let r3 = e3[1] + 1; r3 <= t3[1] - 1; r3++) {
                  const e4 = i3.lines.get(r3), t4 = i3.translateBufferLineToString(r3, true);
                  (null == e4 ? void 0 : e4.isWrapped) ? s3[s3.length - 1] += t4 : s3.push(t4);
                }
                if (e3[1] !== t3[1]) {
                  const e4 = i3.lines.get(t3[1]), r3 = i3.translateBufferLineToString(t3[1], true, 0, t3[0]);
                  e4 && e4.isWrapped ? s3[s3.length - 1] += r3 : s3.push(r3);
                }
              }
              return s3.map((e4) => e4.replace(g, " ")).join(n.isWindows ? "\r\n" : "\n");
            }
            clearSelection() {
              this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
            }
            refresh(e3) {
              this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), n.isLinux && e3 && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
            }
            _refresh() {
              this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: 3 === this._activeSelectionMode });
            }
            _isClickInSelection(e3) {
              const t3 = this._getMouseBufferCoords(e3), i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
              return !!(i3 && s3 && t3) && this._areCoordsInSelection(t3, i3, s3);
            }
            isCellInSelection(e3, t3) {
              const i3 = this._model.finalSelectionStart, s3 = this._model.finalSelectionEnd;
              return !(!i3 || !s3) && this._areCoordsInSelection([e3, t3], i3, s3);
            }
            _areCoordsInSelection(e3, t3, i3) {
              return e3[1] > t3[1] && e3[1] < i3[1] || t3[1] === i3[1] && e3[1] === t3[1] && e3[0] >= t3[0] && e3[0] < i3[0] || t3[1] < i3[1] && e3[1] === i3[1] && e3[0] < i3[0] || t3[1] < i3[1] && e3[1] === t3[1] && e3[0] >= t3[0];
            }
            _selectWordAtCursor(e3, t3) {
              var i3, s3;
              const r2 = null === (s3 = null === (i3 = this._linkifier.currentLink) || void 0 === i3 ? void 0 : i3.link) || void 0 === s3 ? void 0 : s3.range;
              if (r2)
                return this._model.selectionStart = [r2.start.x - 1, r2.start.y - 1], this._model.selectionStartLength = (0, f.getRangeLength)(r2, this._bufferService.cols), this._model.selectionEnd = void 0, true;
              const n2 = this._getMouseBufferCoords(e3);
              return !!n2 && (this._selectWordAt(n2, t3), this._model.selectionEnd = void 0, true);
            }
            selectAll() {
              this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
            }
            selectLines(e3, t3) {
              this._model.clearSelection(), e3 = Math.max(e3, 0), t3 = Math.min(t3, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e3], this._model.selectionEnd = [this._bufferService.cols, t3], this.refresh(), this._onSelectionChange.fire();
            }
            _onTrim(e3) {
              this._model.onTrim(e3) && this.refresh();
            }
            _getMouseBufferCoords(e3) {
              const t3 = this._mouseService.getCoords(e3, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
              if (t3)
                return t3[0]--, t3[1]--, t3[1] += this._bufferService.buffer.ydisp, t3;
            }
            _getMouseEventScrollAmount(e3) {
              let t3 = (0, d.getCoordsRelativeToElement)(this._coreBrowserService.window, e3, this._screenElement)[1];
              const i3 = this._renderService.dimensions.canvasHeight;
              return t3 >= 0 && t3 <= i3 ? 0 : (t3 > i3 && (t3 -= i3), t3 = Math.min(Math.max(t3, -50), 50), t3 /= 50, t3 / Math.abs(t3) + Math.round(14 * t3));
            }
            shouldForceSelection(e3) {
              return n.isMac ? e3.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e3.shiftKey;
            }
            onMouseDown(e3) {
              if (this._mouseDownTimeStamp = e3.timeStamp, (2 !== e3.button || !this.hasSelection) && 0 === e3.button) {
                if (!this._enabled) {
                  if (!this.shouldForceSelection(e3))
                    return;
                  e3.stopPropagation();
                }
                e3.preventDefault(), this._dragScrollAmount = 0, this._enabled && e3.shiftKey ? this._onIncrementalClick(e3) : 1 === e3.detail ? this._onSingleClick(e3) : 2 === e3.detail ? this._onDoubleClick(e3) : 3 === e3.detail && this._onTripleClick(e3), this._addMouseDownListeners(), this.refresh(true);
              }
            }
            _addMouseDownListeners() {
              this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), 50);
            }
            _removeMouseDownListeners() {
              this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
            }
            _onIncrementalClick(e3) {
              this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e3));
            }
            _onSingleClick(e3) {
              if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e3) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e3), !this._model.selectionStart)
                return;
              this._model.selectionEnd = void 0;
              const t3 = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
              t3 && t3.length !== this._model.selectionStart[0] && 0 === t3.hasWidth(this._model.selectionStart[0]) && this._model.selectionStart[0]++;
            }
            _onDoubleClick(e3) {
              this._selectWordAtCursor(e3, true) && (this._activeSelectionMode = 1);
            }
            _onTripleClick(e3) {
              const t3 = this._getMouseBufferCoords(e3);
              t3 && (this._activeSelectionMode = 2, this._selectLineAt(t3[1]));
            }
            shouldColumnSelect(e3) {
              return e3.altKey && !(n.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
            }
            _onMouseMove(e3) {
              if (e3.stopImmediatePropagation(), !this._model.selectionStart)
                return;
              const t3 = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
              if (this._model.selectionEnd = this._getMouseBufferCoords(e3), !this._model.selectionEnd)
                return void this.refresh(true);
              2 === this._activeSelectionMode ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : 1 === this._activeSelectionMode && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e3), 3 !== this._activeSelectionMode && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
              const i3 = this._bufferService.buffer;
              if (this._model.selectionEnd[1] < i3.lines.length) {
                const e4 = i3.lines.get(this._model.selectionEnd[1]);
                e4 && 0 === e4.hasWidth(this._model.selectionEnd[0]) && this._model.selectionEnd[0]++;
              }
              t3 && t3[0] === this._model.selectionEnd[0] && t3[1] === this._model.selectionEnd[1] || this.refresh(true);
            }
            _dragScroll() {
              if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
                this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
                const e3 = this._bufferService.buffer;
                this._dragScrollAmount > 0 ? (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e3.ydisp + this._bufferService.rows, e3.lines.length - 1)) : (3 !== this._activeSelectionMode && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e3.ydisp), this.refresh();
              }
            }
            _onMouseUp(e3) {
              const t3 = e3.timeStamp - this._mouseDownTimeStamp;
              if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && t3 < 500 && e3.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
                if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
                  const t4 = this._mouseService.getCoords(e3, this._element, this._bufferService.cols, this._bufferService.rows, false);
                  if (t4 && void 0 !== t4[0] && void 0 !== t4[1]) {
                    const e4 = (0, _.moveToCellSequence)(t4[0] - 1, t4[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                    this._coreService.triggerDataEvent(e4, true);
                  }
                }
              } else
                this._fireEventIfSelectionChanged();
            }
            _fireEventIfSelectionChanged() {
              const e3 = this._model.finalSelectionStart, t3 = this._model.finalSelectionEnd, i3 = !(!e3 || !t3 || e3[0] === t3[0] && e3[1] === t3[1]);
              i3 ? e3 && t3 && (this._oldSelectionStart && this._oldSelectionEnd && e3[0] === this._oldSelectionStart[0] && e3[1] === this._oldSelectionStart[1] && t3[0] === this._oldSelectionEnd[0] && t3[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(e3, t3, i3)) : this._oldHasSelection && this._fireOnSelectionChange(e3, t3, i3);
            }
            _fireOnSelectionChange(e3, t3, i3) {
              this._oldSelectionStart = e3, this._oldSelectionEnd = t3, this._oldHasSelection = i3, this._onSelectionChange.fire();
            }
            _onBufferActivate(e3) {
              this.clearSelection(), this._trimListener.dispose(), this._trimListener = e3.activeBuffer.lines.onTrim((e4) => this._onTrim(e4));
            }
            _convertViewportColToCharacterIndex(e3, t3) {
              let i3 = t3[0];
              for (let s3 = 0; t3[0] >= s3; s3++) {
                const r2 = e3.loadCell(s3, this._workCell).getChars().length;
                0 === this._workCell.getWidth() ? i3-- : r2 > 1 && t3[0] !== s3 && (i3 += r2 - 1);
              }
              return i3;
            }
            setSelection(e3, t3, i3) {
              this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e3, t3], this._model.selectionStartLength = i3, this.refresh(), this._fireEventIfSelectionChanged();
            }
            rightClickSelect(e3) {
              this._isClickInSelection(e3) || (this._selectWordAtCursor(e3, false) && this.refresh(true), this._fireEventIfSelectionChanged());
            }
            _getWordAt(e3, t3, i3 = true, s3 = true) {
              if (e3[0] >= this._bufferService.cols)
                return;
              const r2 = this._bufferService.buffer, n2 = r2.lines.get(e3[1]);
              if (!n2)
                return;
              const o2 = r2.translateBufferLineToString(e3[1], false);
              let a2 = this._convertViewportColToCharacterIndex(n2, e3), h3 = a2;
              const c2 = e3[0] - a2;
              let l2 = 0, d2 = 0, _2 = 0, u2 = 0;
              if (" " === o2.charAt(a2)) {
                for (; a2 > 0 && " " === o2.charAt(a2 - 1); )
                  a2--;
                for (; h3 < o2.length && " " === o2.charAt(h3 + 1); )
                  h3++;
              } else {
                let t4 = e3[0], i4 = e3[0];
                0 === n2.getWidth(t4) && (l2++, t4--), 2 === n2.getWidth(i4) && (d2++, i4++);
                const s4 = n2.getString(i4).length;
                for (s4 > 1 && (u2 += s4 - 1, h3 += s4 - 1); t4 > 0 && a2 > 0 && !this._isCharWordSeparator(n2.loadCell(t4 - 1, this._workCell)); ) {
                  n2.loadCell(t4 - 1, this._workCell);
                  const e4 = this._workCell.getChars().length;
                  0 === this._workCell.getWidth() ? (l2++, t4--) : e4 > 1 && (_2 += e4 - 1, a2 -= e4 - 1), a2--, t4--;
                }
                for (; i4 < n2.length && h3 + 1 < o2.length && !this._isCharWordSeparator(n2.loadCell(i4 + 1, this._workCell)); ) {
                  n2.loadCell(i4 + 1, this._workCell);
                  const e4 = this._workCell.getChars().length;
                  2 === this._workCell.getWidth() ? (d2++, i4++) : e4 > 1 && (u2 += e4 - 1, h3 += e4 - 1), h3++, i4++;
                }
              }
              h3++;
              let f2 = a2 + c2 - l2 + _2, v2 = Math.min(this._bufferService.cols, h3 - a2 + l2 + d2 - _2 - u2);
              if (t3 || "" !== o2.slice(a2, h3).trim()) {
                if (i3 && 0 === f2 && 32 !== n2.getCodePoint(0)) {
                  const t4 = r2.lines.get(e3[1] - 1);
                  if (t4 && n2.isWrapped && 32 !== t4.getCodePoint(this._bufferService.cols - 1)) {
                    const t5 = this._getWordAt([this._bufferService.cols - 1, e3[1] - 1], false, true, false);
                    if (t5) {
                      const e4 = this._bufferService.cols - t5.start;
                      f2 -= e4, v2 += e4;
                    }
                  }
                }
                if (s3 && f2 + v2 === this._bufferService.cols && 32 !== n2.getCodePoint(this._bufferService.cols - 1)) {
                  const t4 = r2.lines.get(e3[1] + 1);
                  if ((null == t4 ? void 0 : t4.isWrapped) && 32 !== t4.getCodePoint(0)) {
                    const t5 = this._getWordAt([0, e3[1] + 1], false, false, true);
                    t5 && (v2 += t5.length);
                  }
                }
                return { start: f2, length: v2 };
              }
            }
            _selectWordAt(e3, t3) {
              const i3 = this._getWordAt(e3, t3);
              if (i3) {
                for (; i3.start < 0; )
                  i3.start += this._bufferService.cols, e3[1]--;
                this._model.selectionStart = [i3.start, e3[1]], this._model.selectionStartLength = i3.length;
              }
            }
            _selectToWordAt(e3) {
              const t3 = this._getWordAt(e3, true);
              if (t3) {
                let i3 = e3[1];
                for (; t3.start < 0; )
                  t3.start += this._bufferService.cols, i3--;
                if (!this._model.areSelectionValuesReversed())
                  for (; t3.start + t3.length > this._bufferService.cols; )
                    t3.length -= this._bufferService.cols, i3++;
                this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? t3.start : t3.start + t3.length, i3];
              }
            }
            _isCharWordSeparator(e3) {
              return 0 !== e3.getWidth() && this._optionsService.rawOptions.wordSeparator.indexOf(e3.getChars()) >= 0;
            }
            _selectLineAt(e3) {
              const t3 = this._bufferService.buffer.getWrappedRangeForLine(e3), i3 = { start: { x: 0, y: t3.first }, end: { x: this._bufferService.cols - 1, y: t3.last } };
              this._model.selectionStart = [0, t3.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, f.getRangeLength)(i3, this._bufferService.cols);
            }
          };
          p2 = s2([r(3, l.IBufferService), r(4, l.ICoreService), r(5, c.IMouseService), r(6, l.IOptionsService), r(7, c.IRenderService), r(8, c.ICoreBrowserService)], p2), t2.SelectionService = p2;
        }, 4725: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ICharacterJoinerService = t2.ISelectionService = t2.IRenderService = t2.IMouseService = t2.ICoreBrowserService = t2.ICharSizeService = void 0;
          const s2 = i2(8343);
          t2.ICharSizeService = (0, s2.createDecorator)("CharSizeService"), t2.ICoreBrowserService = (0, s2.createDecorator)("CoreBrowserService"), t2.IMouseService = (0, s2.createDecorator)("MouseService"), t2.IRenderService = (0, s2.createDecorator)("RenderService"), t2.ISelectionService = (0, s2.createDecorator)("SelectionService"), t2.ICharacterJoinerService = (0, s2.createDecorator)("CharacterJoinerService");
        }, 6349: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CircularList = void 0;
          const s2 = i2(8460);
          t2.CircularList = class {
            constructor(e3) {
              this._maxLength = e3, this.onDeleteEmitter = new s2.EventEmitter(), this.onInsertEmitter = new s2.EventEmitter(), this.onTrimEmitter = new s2.EventEmitter(), this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
            }
            get onDelete() {
              return this.onDeleteEmitter.event;
            }
            get onInsert() {
              return this.onInsertEmitter.event;
            }
            get onTrim() {
              return this.onTrimEmitter.event;
            }
            get maxLength() {
              return this._maxLength;
            }
            set maxLength(e3) {
              if (this._maxLength === e3)
                return;
              const t3 = new Array(e3);
              for (let i3 = 0; i3 < Math.min(e3, this.length); i3++)
                t3[i3] = this._array[this._getCyclicIndex(i3)];
              this._array = t3, this._maxLength = e3, this._startIndex = 0;
            }
            get length() {
              return this._length;
            }
            set length(e3) {
              if (e3 > this._length)
                for (let t3 = this._length; t3 < e3; t3++)
                  this._array[t3] = void 0;
              this._length = e3;
            }
            get(e3) {
              return this._array[this._getCyclicIndex(e3)];
            }
            set(e3, t3) {
              this._array[this._getCyclicIndex(e3)] = t3;
            }
            push(e3) {
              this._array[this._getCyclicIndex(this._length)] = e3, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
            }
            recycle() {
              if (this._length !== this._maxLength)
                throw new Error("Can only recycle when the buffer is full");
              return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
            }
            get isFull() {
              return this._length === this._maxLength;
            }
            pop() {
              return this._array[this._getCyclicIndex(this._length-- - 1)];
            }
            splice(e3, t3, ...i3) {
              if (t3) {
                for (let i4 = e3; i4 < this._length - t3; i4++)
                  this._array[this._getCyclicIndex(i4)] = this._array[this._getCyclicIndex(i4 + t3)];
                this._length -= t3, this.onDeleteEmitter.fire({ index: e3, amount: t3 });
              }
              for (let t4 = this._length - 1; t4 >= e3; t4--)
                this._array[this._getCyclicIndex(t4 + i3.length)] = this._array[this._getCyclicIndex(t4)];
              for (let t4 = 0; t4 < i3.length; t4++)
                this._array[this._getCyclicIndex(e3 + t4)] = i3[t4];
              if (i3.length && this.onInsertEmitter.fire({ index: e3, amount: i3.length }), this._length + i3.length > this._maxLength) {
                const e4 = this._length + i3.length - this._maxLength;
                this._startIndex += e4, this._length = this._maxLength, this.onTrimEmitter.fire(e4);
              } else
                this._length += i3.length;
            }
            trimStart(e3) {
              e3 > this._length && (e3 = this._length), this._startIndex += e3, this._length -= e3, this.onTrimEmitter.fire(e3);
            }
            shiftElements(e3, t3, i3) {
              if (!(t3 <= 0)) {
                if (e3 < 0 || e3 >= this._length)
                  throw new Error("start argument out of range");
                if (e3 + i3 < 0)
                  throw new Error("Cannot shift elements in list beyond index 0");
                if (i3 > 0) {
                  for (let s4 = t3 - 1; s4 >= 0; s4--)
                    this.set(e3 + s4 + i3, this.get(e3 + s4));
                  const s3 = e3 + t3 + i3 - this._length;
                  if (s3 > 0)
                    for (this._length += s3; this._length > this._maxLength; )
                      this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
                } else
                  for (let s3 = 0; s3 < t3; s3++)
                    this.set(e3 + s3 + i3, this.get(e3 + s3));
              }
            }
            _getCyclicIndex(e3) {
              return (this._startIndex + e3) % this._maxLength;
            }
          };
        }, 1439: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.clone = void 0, t2.clone = function e3(t3, i2 = 5) {
            if ("object" != typeof t3)
              return t3;
            const s2 = Array.isArray(t3) ? [] : {};
            for (const r in t3)
              s2[r] = i2 <= 1 ? t3[r] : t3[r] && e3(t3[r], i2 - 1);
            return s2;
          };
        }, 8055: (e2, t2) => {
          var i2, s2, r;
          function n(e3) {
            const t3 = e3.toString(16);
            return t3.length < 2 ? "0" + t3 : t3;
          }
          function o(e3, t3) {
            return e3 < t3 ? (t3 + 0.05) / (e3 + 0.05) : (e3 + 0.05) / (t3 + 0.05);
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.contrastRatio = t2.toPaddedHex = t2.rgba = t2.rgb = t2.css = t2.color = t2.channels = void 0, function(e3) {
            e3.toCss = function(e4, t3, i3, s3) {
              return void 0 !== s3 ? `#${n(e4)}${n(t3)}${n(i3)}${n(s3)}` : `#${n(e4)}${n(t3)}${n(i3)}`;
            }, e3.toRgba = function(e4, t3, i3, s3 = 255) {
              return (e4 << 24 | t3 << 16 | i3 << 8 | s3) >>> 0;
            };
          }(i2 = t2.channels || (t2.channels = {})), function(e3) {
            function t3(e4, t4) {
              const s3 = Math.round(255 * t4), [n2, o2, a] = r.toChannels(e4.rgba);
              return { css: i2.toCss(n2, o2, a, s3), rgba: i2.toRgba(n2, o2, a, s3) };
            }
            e3.blend = function(e4, t4) {
              const s3 = (255 & t4.rgba) / 255;
              if (1 === s3)
                return { css: t4.css, rgba: t4.rgba };
              const r2 = t4.rgba >> 24 & 255, n2 = t4.rgba >> 16 & 255, o2 = t4.rgba >> 8 & 255, a = e4.rgba >> 24 & 255, h2 = e4.rgba >> 16 & 255, c = e4.rgba >> 8 & 255, l = a + Math.round((r2 - a) * s3), d = h2 + Math.round((n2 - h2) * s3), _ = c + Math.round((o2 - c) * s3);
              return { css: i2.toCss(l, d, _), rgba: i2.toRgba(l, d, _) };
            }, e3.isOpaque = function(e4) {
              return 255 == (255 & e4.rgba);
            }, e3.ensureContrastRatio = function(e4, t4, i3) {
              const s3 = r.ensureContrastRatio(e4.rgba, t4.rgba, i3);
              if (s3)
                return r.toColor(s3 >> 24 & 255, s3 >> 16 & 255, s3 >> 8 & 255);
            }, e3.opaque = function(e4) {
              const t4 = (255 | e4.rgba) >>> 0, [s3, n2, o2] = r.toChannels(t4);
              return { css: i2.toCss(s3, n2, o2), rgba: t4 };
            }, e3.opacity = t3, e3.multiplyOpacity = function(e4, i3) {
              return t3(e4, (255 & e4.rgba) * i3 / 255);
            }, e3.toColorRGB = function(e4) {
              return [e4.rgba >> 24 & 255, e4.rgba >> 16 & 255, e4.rgba >> 8 & 255];
            };
          }(t2.color || (t2.color = {})), (t2.css || (t2.css = {})).toColor = function(e3) {
            if (e3.match(/#[0-9a-f]{3,8}/i))
              switch (e3.length) {
                case 4: {
                  const t4 = parseInt(e3.slice(1, 2).repeat(2), 16), i3 = parseInt(e3.slice(2, 3).repeat(2), 16), s3 = parseInt(e3.slice(3, 4).repeat(2), 16);
                  return r.toColor(t4, i3, s3);
                }
                case 5: {
                  const t4 = parseInt(e3.slice(1, 2).repeat(2), 16), i3 = parseInt(e3.slice(2, 3).repeat(2), 16), s3 = parseInt(e3.slice(3, 4).repeat(2), 16), n2 = parseInt(e3.slice(4, 5).repeat(2), 16);
                  return r.toColor(t4, i3, s3, n2);
                }
                case 7:
                  return { css: e3, rgba: (parseInt(e3.slice(1), 16) << 8 | 255) >>> 0 };
                case 9:
                  return { css: e3, rgba: parseInt(e3.slice(1), 16) >>> 0 };
              }
            const t3 = e3.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
            if (t3) {
              const e4 = parseInt(t3[1]), i3 = parseInt(t3[2]), s3 = parseInt(t3[3]), n2 = Math.round(255 * (void 0 === t3[5] ? 1 : parseFloat(t3[5])));
              return r.toColor(e4, i3, s3, n2);
            }
            throw new Error("css.toColor: Unsupported css format");
          }, function(e3) {
            function t3(e4, t4, i3) {
              const s3 = e4 / 255, r2 = t4 / 255, n2 = i3 / 255;
              return 0.2126 * (s3 <= 0.03928 ? s3 / 12.92 : Math.pow((s3 + 0.055) / 1.055, 2.4)) + 0.7152 * (r2 <= 0.03928 ? r2 / 12.92 : Math.pow((r2 + 0.055) / 1.055, 2.4)) + 0.0722 * (n2 <= 0.03928 ? n2 / 12.92 : Math.pow((n2 + 0.055) / 1.055, 2.4));
            }
            e3.relativeLuminance = function(e4) {
              return t3(e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4);
            }, e3.relativeLuminance2 = t3;
          }(s2 = t2.rgb || (t2.rgb = {})), function(e3) {
            function t3(e4, t4, i3) {
              const r3 = e4 >> 24 & 255, n2 = e4 >> 16 & 255, a = e4 >> 8 & 255;
              let h2 = t4 >> 24 & 255, c = t4 >> 16 & 255, l = t4 >> 8 & 255, d = o(s2.relativeLuminance2(h2, c, l), s2.relativeLuminance2(r3, n2, a));
              for (; d < i3 && (h2 > 0 || c > 0 || l > 0); )
                h2 -= Math.max(0, Math.ceil(0.1 * h2)), c -= Math.max(0, Math.ceil(0.1 * c)), l -= Math.max(0, Math.ceil(0.1 * l)), d = o(s2.relativeLuminance2(h2, c, l), s2.relativeLuminance2(r3, n2, a));
              return (h2 << 24 | c << 16 | l << 8 | 255) >>> 0;
            }
            function r2(e4, t4, i3) {
              const r3 = e4 >> 24 & 255, n2 = e4 >> 16 & 255, a = e4 >> 8 & 255;
              let h2 = t4 >> 24 & 255, c = t4 >> 16 & 255, l = t4 >> 8 & 255, d = o(s2.relativeLuminance2(h2, c, l), s2.relativeLuminance2(r3, n2, a));
              for (; d < i3 && (h2 < 255 || c < 255 || l < 255); )
                h2 = Math.min(255, h2 + Math.ceil(0.1 * (255 - h2))), c = Math.min(255, c + Math.ceil(0.1 * (255 - c))), l = Math.min(255, l + Math.ceil(0.1 * (255 - l))), d = o(s2.relativeLuminance2(h2, c, l), s2.relativeLuminance2(r3, n2, a));
              return (h2 << 24 | c << 16 | l << 8 | 255) >>> 0;
            }
            e3.ensureContrastRatio = function(e4, i3, n2) {
              const a = s2.relativeLuminance(e4 >> 8), h2 = s2.relativeLuminance(i3 >> 8);
              if (o(a, h2) < n2) {
                if (h2 < a) {
                  const h3 = t3(e4, i3, n2), c2 = o(a, s2.relativeLuminance(h3 >> 8));
                  if (c2 < n2) {
                    const t4 = r2(e4, i3, n2);
                    return c2 > o(a, s2.relativeLuminance(t4 >> 8)) ? h3 : t4;
                  }
                  return h3;
                }
                const c = r2(e4, i3, n2), l = o(a, s2.relativeLuminance(c >> 8));
                if (l < n2) {
                  const r3 = t3(e4, i3, n2);
                  return l > o(a, s2.relativeLuminance(r3 >> 8)) ? c : r3;
                }
                return c;
              }
            }, e3.reduceLuminance = t3, e3.increaseLuminance = r2, e3.toChannels = function(e4) {
              return [e4 >> 24 & 255, e4 >> 16 & 255, e4 >> 8 & 255, 255 & e4];
            }, e3.toColor = function(e4, t4, s3, r3) {
              return { css: i2.toCss(e4, t4, s3, r3), rgba: i2.toRgba(e4, t4, s3, r3) };
            };
          }(r = t2.rgba || (t2.rgba = {})), t2.toPaddedHex = n, t2.contrastRatio = o;
        }, 8969: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreTerminal = void 0;
          const s2 = i2(844), r = i2(2585), n = i2(4348), o = i2(7866), a = i2(744), h2 = i2(7302), c = i2(6975), l = i2(8460), d = i2(1753), _ = i2(3730), u = i2(1480), f = i2(7994), v = i2(9282), g = i2(5435), p2 = i2(5981), S = i2(2660);
          let m3 = false;
          class C extends s2.Disposable {
            constructor(e3) {
              super(), this._onBinary = new l.EventEmitter(), this._onData = new l.EventEmitter(), this._onLineFeed = new l.EventEmitter(), this._onResize = new l.EventEmitter(), this._onScroll = new l.EventEmitter(), this._onWriteParsed = new l.EventEmitter(), this._instantiationService = new n.InstantiationService(), this.optionsService = new h2.OptionsService(e3), this._instantiationService.setService(r.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(a.BufferService)), this._instantiationService.setService(r.IBufferService, this._bufferService), this._logService = this._instantiationService.createInstance(o.LogService), this._instantiationService.setService(r.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(c.CoreService, () => this.scrollToBottom())), this._instantiationService.setService(r.ICoreService, this.coreService), this.coreMouseService = this._instantiationService.createInstance(d.CoreMouseService), this._instantiationService.setService(r.ICoreMouseService, this.coreMouseService), this._dirtyRowService = this._instantiationService.createInstance(_.DirtyRowService), this._instantiationService.setService(r.IDirtyRowService, this._dirtyRowService), this.unicodeService = this._instantiationService.createInstance(u.UnicodeService), this._instantiationService.setService(r.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(f.CharsetService), this._instantiationService.setService(r.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(S.OscLinkService), this._instantiationService.setService(r.IOscLinkService, this._oscLinkService), this._inputHandler = new g.InputHandler(this._bufferService, this._charsetService, this.coreService, this._dirtyRowService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService), this.register((0, l.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, l.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, l.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, l.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.optionsService.onOptionChange((e4) => this._updateOptions(e4))), this.register(this._bufferService.onScroll((e4) => {
                this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._dirtyRowService.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
              })), this.register(this._inputHandler.onScroll((e4) => {
                this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._dirtyRowService.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
              })), this._writeBuffer = new p2.WriteBuffer((e4, t3) => this._inputHandler.parse(e4, t3)), this.register((0, l.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
            }
            get onBinary() {
              return this._onBinary.event;
            }
            get onData() {
              return this._onData.event;
            }
            get onLineFeed() {
              return this._onLineFeed.event;
            }
            get onResize() {
              return this._onResize.event;
            }
            get onWriteParsed() {
              return this._onWriteParsed.event;
            }
            get onScroll() {
              return this._onScrollApi || (this._onScrollApi = new l.EventEmitter(), this.register(this._onScroll.event((e3) => {
                var t3;
                null === (t3 = this._onScrollApi) || void 0 === t3 || t3.fire(e3.position);
              }))), this._onScrollApi.event;
            }
            get cols() {
              return this._bufferService.cols;
            }
            get rows() {
              return this._bufferService.rows;
            }
            get buffers() {
              return this._bufferService.buffers;
            }
            get options() {
              return this.optionsService.options;
            }
            set options(e3) {
              for (const t3 in e3)
                this.optionsService.options[t3] = e3[t3];
            }
            dispose() {
              var e3;
              this._isDisposed || (super.dispose(), null === (e3 = this._windowsMode) || void 0 === e3 || e3.dispose(), this._windowsMode = void 0);
            }
            write(e3, t3) {
              this._writeBuffer.write(e3, t3);
            }
            writeSync(e3, t3) {
              this._logService.logLevel <= r.LogLevelEnum.WARN && !m3 && (this._logService.warn("writeSync is unreliable and will be removed soon."), m3 = true), this._writeBuffer.writeSync(e3, t3);
            }
            resize(e3, t3) {
              isNaN(e3) || isNaN(t3) || (e3 = Math.max(e3, a.MINIMUM_COLS), t3 = Math.max(t3, a.MINIMUM_ROWS), this._bufferService.resize(e3, t3));
            }
            scroll(e3, t3 = false) {
              this._bufferService.scroll(e3, t3);
            }
            scrollLines(e3, t3, i3) {
              this._bufferService.scrollLines(e3, t3, i3);
            }
            scrollPages(e3) {
              this._bufferService.scrollPages(e3);
            }
            scrollToTop() {
              this._bufferService.scrollToTop();
            }
            scrollToBottom() {
              this._bufferService.scrollToBottom();
            }
            scrollToLine(e3) {
              this._bufferService.scrollToLine(e3);
            }
            registerEscHandler(e3, t3) {
              return this._inputHandler.registerEscHandler(e3, t3);
            }
            registerDcsHandler(e3, t3) {
              return this._inputHandler.registerDcsHandler(e3, t3);
            }
            registerCsiHandler(e3, t3) {
              return this._inputHandler.registerCsiHandler(e3, t3);
            }
            registerOscHandler(e3, t3) {
              return this._inputHandler.registerOscHandler(e3, t3);
            }
            _setup() {
              this.optionsService.rawOptions.windowsMode && this._enableWindowsMode();
            }
            reset() {
              this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
            }
            _updateOptions(e3) {
              var t3;
              switch (e3) {
                case "scrollback":
                  this.buffers.resize(this.cols, this.rows);
                  break;
                case "windowsMode":
                  this.optionsService.rawOptions.windowsMode ? this._enableWindowsMode() : (null === (t3 = this._windowsMode) || void 0 === t3 || t3.dispose(), this._windowsMode = void 0);
              }
            }
            _enableWindowsMode() {
              if (!this._windowsMode) {
                const e3 = [];
                e3.push(this.onLineFeed(v.updateWindowsModeWrappedState.bind(null, this._bufferService))), e3.push(this.registerCsiHandler({ final: "H" }, () => ((0, v.updateWindowsModeWrappedState)(this._bufferService), false))), this._windowsMode = { dispose: () => {
                  for (const t3 of e3)
                    t3.dispose();
                } };
              }
            }
          }
          t2.CoreTerminal = C;
        }, 8460: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.forwardEvent = t2.EventEmitter = void 0, t2.EventEmitter = class {
            constructor() {
              this._listeners = [], this._disposed = false;
            }
            get event() {
              return this._event || (this._event = (e3) => (this._listeners.push(e3), { dispose: () => {
                if (!this._disposed) {
                  for (let t3 = 0; t3 < this._listeners.length; t3++)
                    if (this._listeners[t3] === e3)
                      return void this._listeners.splice(t3, 1);
                }
              } })), this._event;
            }
            fire(e3, t3) {
              const i2 = [];
              for (let e4 = 0; e4 < this._listeners.length; e4++)
                i2.push(this._listeners[e4]);
              for (let s2 = 0; s2 < i2.length; s2++)
                i2[s2].call(void 0, e3, t3);
            }
            dispose() {
              this._listeners && (this._listeners.length = 0), this._disposed = true;
            }
          }, t2.forwardEvent = function(e3, t3) {
            return e3((e4) => t3.fire(e4));
          };
        }, 5435: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.InputHandler = t2.WindowsOptionsReportType = void 0;
          const s2 = i2(2584), r = i2(7116), n = i2(2015), o = i2(844), a = i2(482), h2 = i2(8437), c = i2(8460), l = i2(643), d = i2(511), _ = i2(3734), u = i2(2585), f = i2(6242), v = i2(6351), g = i2(5941), p2 = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, S = 131072;
          function m3(e3, t3) {
            if (e3 > 24)
              return t3.setWinLines || false;
            switch (e3) {
              case 1:
                return !!t3.restoreWin;
              case 2:
                return !!t3.minimizeWin;
              case 3:
                return !!t3.setWinPosition;
              case 4:
                return !!t3.setWinSizePixels;
              case 5:
                return !!t3.raiseWin;
              case 6:
                return !!t3.lowerWin;
              case 7:
                return !!t3.refreshWin;
              case 8:
                return !!t3.setWinSizeChars;
              case 9:
                return !!t3.maximizeWin;
              case 10:
                return !!t3.fullscreenWin;
              case 11:
                return !!t3.getWinState;
              case 13:
                return !!t3.getWinPosition;
              case 14:
                return !!t3.getWinSizePixels;
              case 15:
                return !!t3.getScreenSizePixels;
              case 16:
                return !!t3.getCellSizePixels;
              case 18:
                return !!t3.getWinSizeChars;
              case 19:
                return !!t3.getScreenSizeChars;
              case 20:
                return !!t3.getIconTitle;
              case 21:
                return !!t3.getWinTitle;
              case 22:
                return !!t3.pushTitle;
              case 23:
                return !!t3.popTitle;
              case 24:
                return !!t3.setWinLines;
            }
            return false;
          }
          var C;
          !function(e3) {
            e3[e3.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", e3[e3.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
          }(C = t2.WindowsOptionsReportType || (t2.WindowsOptionsReportType = {}));
          class b extends o.Disposable {
            constructor(e3, t3, i3, o2, l2, _2, u2, g2, p3, S3 = new n.EscapeSequenceParser()) {
              super(), this._bufferService = e3, this._charsetService = t3, this._coreService = i3, this._dirtyRowService = o2, this._logService = l2, this._optionsService = _2, this._oscLinkService = u2, this._coreMouseService = g2, this._unicodeService = p3, this._parser = S3, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new a.StringToUtf32(), this._utf8Decoder = new a.Utf8ToUtf32(), this._workCell = new d.CellData(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = h2.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = h2.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = new c.EventEmitter(), this._onRequestRefreshRows = new c.EventEmitter(), this._onRequestReset = new c.EventEmitter(), this._onRequestSendFocus = new c.EventEmitter(), this._onRequestSyncScrollBar = new c.EventEmitter(), this._onRequestWindowsOptionsReport = new c.EventEmitter(), this._onA11yChar = new c.EventEmitter(), this._onA11yTab = new c.EventEmitter(), this._onCursorMove = new c.EventEmitter(), this._onLineFeed = new c.EventEmitter(), this._onScroll = new c.EventEmitter(), this._onTitleChange = new c.EventEmitter(), this._onColor = new c.EventEmitter(), this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 }, this._specialColors = [256, 257, 258], this.register(this._parser), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((e4) => this._activeBuffer = e4.activeBuffer)), this._parser.setCsiHandlerFallback((e4, t4) => {
                this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(e4), params: t4.toArray() });
              }), this._parser.setEscHandlerFallback((e4) => {
                this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(e4) });
              }), this._parser.setExecuteHandlerFallback((e4) => {
                this._logService.debug("Unknown EXECUTE code: ", { code: e4 });
              }), this._parser.setOscHandlerFallback((e4, t4, i4) => {
                this._logService.debug("Unknown OSC code: ", { identifier: e4, action: t4, data: i4 });
              }), this._parser.setDcsHandlerFallback((e4, t4, i4) => {
                "HOOK" === t4 && (i4 = i4.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(e4), action: t4, payload: i4 });
              }), this._parser.setPrintHandler((e4, t4, i4) => this.print(e4, t4, i4)), this._parser.registerCsiHandler({ final: "@" }, (e4) => this.insertChars(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (e4) => this.scrollLeft(e4)), this._parser.registerCsiHandler({ final: "A" }, (e4) => this.cursorUp(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (e4) => this.scrollRight(e4)), this._parser.registerCsiHandler({ final: "B" }, (e4) => this.cursorDown(e4)), this._parser.registerCsiHandler({ final: "C" }, (e4) => this.cursorForward(e4)), this._parser.registerCsiHandler({ final: "D" }, (e4) => this.cursorBackward(e4)), this._parser.registerCsiHandler({ final: "E" }, (e4) => this.cursorNextLine(e4)), this._parser.registerCsiHandler({ final: "F" }, (e4) => this.cursorPrecedingLine(e4)), this._parser.registerCsiHandler({ final: "G" }, (e4) => this.cursorCharAbsolute(e4)), this._parser.registerCsiHandler({ final: "H" }, (e4) => this.cursorPosition(e4)), this._parser.registerCsiHandler({ final: "I" }, (e4) => this.cursorForwardTab(e4)), this._parser.registerCsiHandler({ final: "J" }, (e4) => this.eraseInDisplay(e4, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (e4) => this.eraseInDisplay(e4, true)), this._parser.registerCsiHandler({ final: "K" }, (e4) => this.eraseInLine(e4, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (e4) => this.eraseInLine(e4, true)), this._parser.registerCsiHandler({ final: "L" }, (e4) => this.insertLines(e4)), this._parser.registerCsiHandler({ final: "M" }, (e4) => this.deleteLines(e4)), this._parser.registerCsiHandler({ final: "P" }, (e4) => this.deleteChars(e4)), this._parser.registerCsiHandler({ final: "S" }, (e4) => this.scrollUp(e4)), this._parser.registerCsiHandler({ final: "T" }, (e4) => this.scrollDown(e4)), this._parser.registerCsiHandler({ final: "X" }, (e4) => this.eraseChars(e4)), this._parser.registerCsiHandler({ final: "Z" }, (e4) => this.cursorBackwardTab(e4)), this._parser.registerCsiHandler({ final: "`" }, (e4) => this.charPosAbsolute(e4)), this._parser.registerCsiHandler({ final: "a" }, (e4) => this.hPositionRelative(e4)), this._parser.registerCsiHandler({ final: "b" }, (e4) => this.repeatPrecedingCharacter(e4)), this._parser.registerCsiHandler({ final: "c" }, (e4) => this.sendDeviceAttributesPrimary(e4)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (e4) => this.sendDeviceAttributesSecondary(e4)), this._parser.registerCsiHandler({ final: "d" }, (e4) => this.linePosAbsolute(e4)), this._parser.registerCsiHandler({ final: "e" }, (e4) => this.vPositionRelative(e4)), this._parser.registerCsiHandler({ final: "f" }, (e4) => this.hVPosition(e4)), this._parser.registerCsiHandler({ final: "g" }, (e4) => this.tabClear(e4)), this._parser.registerCsiHandler({ final: "h" }, (e4) => this.setMode(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (e4) => this.setModePrivate(e4)), this._parser.registerCsiHandler({ final: "l" }, (e4) => this.resetMode(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (e4) => this.resetModePrivate(e4)), this._parser.registerCsiHandler({ final: "m" }, (e4) => this.charAttributes(e4)), this._parser.registerCsiHandler({ final: "n" }, (e4) => this.deviceStatus(e4)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (e4) => this.deviceStatusPrivate(e4)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (e4) => this.softReset(e4)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (e4) => this.setCursorStyle(e4)), this._parser.registerCsiHandler({ final: "r" }, (e4) => this.setScrollRegion(e4)), this._parser.registerCsiHandler({ final: "s" }, (e4) => this.saveCursor(e4)), this._parser.registerCsiHandler({ final: "t" }, (e4) => this.windowOptions(e4)), this._parser.registerCsiHandler({ final: "u" }, (e4) => this.restoreCursor(e4)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (e4) => this.insertColumns(e4)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (e4) => this.deleteColumns(e4)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (e4) => this.selectProtected(e4)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (e4) => this.requestMode(e4, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (e4) => this.requestMode(e4, false)), this._parser.setExecuteHandler(s2.C0.BEL, () => this.bell()), this._parser.setExecuteHandler(s2.C0.LF, () => this.lineFeed()), this._parser.setExecuteHandler(s2.C0.VT, () => this.lineFeed()), this._parser.setExecuteHandler(s2.C0.FF, () => this.lineFeed()), this._parser.setExecuteHandler(s2.C0.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(s2.C0.BS, () => this.backspace()), this._parser.setExecuteHandler(s2.C0.HT, () => this.tab()), this._parser.setExecuteHandler(s2.C0.SO, () => this.shiftOut()), this._parser.setExecuteHandler(s2.C0.SI, () => this.shiftIn()), this._parser.setExecuteHandler(s2.C1.IND, () => this.index()), this._parser.setExecuteHandler(s2.C1.NEL, () => this.nextLine()), this._parser.setExecuteHandler(s2.C1.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new f.OscHandler((e4) => (this.setTitle(e4), this.setIconName(e4), true))), this._parser.registerOscHandler(1, new f.OscHandler((e4) => this.setIconName(e4))), this._parser.registerOscHandler(2, new f.OscHandler((e4) => this.setTitle(e4))), this._parser.registerOscHandler(4, new f.OscHandler((e4) => this.setOrReportIndexedColor(e4))), this._parser.registerOscHandler(8, new f.OscHandler((e4) => this.setHyperlink(e4))), this._parser.registerOscHandler(10, new f.OscHandler((e4) => this.setOrReportFgColor(e4))), this._parser.registerOscHandler(11, new f.OscHandler((e4) => this.setOrReportBgColor(e4))), this._parser.registerOscHandler(12, new f.OscHandler((e4) => this.setOrReportCursorColor(e4))), this._parser.registerOscHandler(104, new f.OscHandler((e4) => this.restoreIndexedColor(e4))), this._parser.registerOscHandler(110, new f.OscHandler((e4) => this.restoreFgColor(e4))), this._parser.registerOscHandler(111, new f.OscHandler((e4) => this.restoreBgColor(e4))), this._parser.registerOscHandler(112, new f.OscHandler((e4) => this.restoreCursorColor(e4))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
              for (const e4 in r.CHARSETS)
                this._parser.registerEscHandler({ intermediates: "(", final: e4 }, () => this.selectCharset("(" + e4)), this._parser.registerEscHandler({ intermediates: ")", final: e4 }, () => this.selectCharset(")" + e4)), this._parser.registerEscHandler({ intermediates: "*", final: e4 }, () => this.selectCharset("*" + e4)), this._parser.registerEscHandler({ intermediates: "+", final: e4 }, () => this.selectCharset("+" + e4)), this._parser.registerEscHandler({ intermediates: "-", final: e4 }, () => this.selectCharset("-" + e4)), this._parser.registerEscHandler({ intermediates: ".", final: e4 }, () => this.selectCharset("." + e4)), this._parser.registerEscHandler({ intermediates: "/", final: e4 }, () => this.selectCharset("/" + e4));
              this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((e4) => (this._logService.error("Parsing error: ", e4), e4)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new v.DcsHandler((e4, t4) => this.requestStatusString(e4, t4)));
            }
            getAttrData() {
              return this._curAttrData;
            }
            get onRequestBell() {
              return this._onRequestBell.event;
            }
            get onRequestRefreshRows() {
              return this._onRequestRefreshRows.event;
            }
            get onRequestReset() {
              return this._onRequestReset.event;
            }
            get onRequestSendFocus() {
              return this._onRequestSendFocus.event;
            }
            get onRequestSyncScrollBar() {
              return this._onRequestSyncScrollBar.event;
            }
            get onRequestWindowsOptionsReport() {
              return this._onRequestWindowsOptionsReport.event;
            }
            get onA11yChar() {
              return this._onA11yChar.event;
            }
            get onA11yTab() {
              return this._onA11yTab.event;
            }
            get onCursorMove() {
              return this._onCursorMove.event;
            }
            get onLineFeed() {
              return this._onLineFeed.event;
            }
            get onScroll() {
              return this._onScroll.event;
            }
            get onTitleChange() {
              return this._onTitleChange.event;
            }
            get onColor() {
              return this._onColor.event;
            }
            dispose() {
              super.dispose();
            }
            _preserveStack(e3, t3, i3, s3) {
              this._parseStack.paused = true, this._parseStack.cursorStartX = e3, this._parseStack.cursorStartY = t3, this._parseStack.decodedLength = i3, this._parseStack.position = s3;
            }
            _logSlowResolvingAsync(e3) {
              this._logService.logLevel <= u.LogLevelEnum.WARN && Promise.race([e3, new Promise((e4, t3) => setTimeout(() => t3("#SLOW_TIMEOUT"), 5e3))]).catch((e4) => {
                if ("#SLOW_TIMEOUT" !== e4)
                  throw e4;
                console.warn("async parser handler taking longer than 5000 ms");
              });
            }
            parse(e3, t3) {
              let i3, s3 = this._activeBuffer.x, r2 = this._activeBuffer.y, n2 = 0;
              const o2 = this._parseStack.paused;
              if (o2) {
                if (i3 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, t3))
                  return this._logSlowResolvingAsync(i3), i3;
                s3 = this._parseStack.cursorStartX, r2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e3.length > S && (n2 = this._parseStack.position + S);
              }
              if (this._logService.logLevel <= u.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + ("string" == typeof e3 ? ` "${e3}"` : ` "${Array.prototype.map.call(e3, (e4) => String.fromCharCode(e4)).join("")}"`), "string" == typeof e3 ? e3.split("").map((e4) => e4.charCodeAt(0)) : e3), this._parseBuffer.length < e3.length && this._parseBuffer.length < S && (this._parseBuffer = new Uint32Array(Math.min(e3.length, S))), o2 || this._dirtyRowService.clearRange(), e3.length > S)
                for (let t4 = n2; t4 < e3.length; t4 += S) {
                  const n3 = t4 + S < e3.length ? t4 + S : e3.length, o3 = "string" == typeof e3 ? this._stringDecoder.decode(e3.substring(t4, n3), this._parseBuffer) : this._utf8Decoder.decode(e3.subarray(t4, n3), this._parseBuffer);
                  if (i3 = this._parser.parse(this._parseBuffer, o3))
                    return this._preserveStack(s3, r2, o3, t4), this._logSlowResolvingAsync(i3), i3;
                }
              else if (!o2) {
                const t4 = "string" == typeof e3 ? this._stringDecoder.decode(e3, this._parseBuffer) : this._utf8Decoder.decode(e3, this._parseBuffer);
                if (i3 = this._parser.parse(this._parseBuffer, t4))
                  return this._preserveStack(s3, r2, t4, 0), this._logSlowResolvingAsync(i3), i3;
              }
              this._activeBuffer.x === s3 && this._activeBuffer.y === r2 || this._onCursorMove.fire(), this._onRequestRefreshRows.fire(this._dirtyRowService.start, this._dirtyRowService.end);
            }
            print(e3, t3, i3) {
              let s3, r2;
              const n2 = this._charsetService.charset, o2 = this._optionsService.rawOptions.screenReaderMode, h3 = this._bufferService.cols, c2 = this._coreService.decPrivateModes.wraparound, d2 = this._coreService.modes.insertMode, _2 = this._curAttrData;
              let u2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
              this._dirtyRowService.markDirty(this._activeBuffer.y), this._activeBuffer.x && i3 - t3 > 0 && 2 === u2.getWidth(this._activeBuffer.x - 1) && u2.setCellFromCodePoint(this._activeBuffer.x - 1, 0, 1, _2.fg, _2.bg, _2.extended);
              for (let f2 = t3; f2 < i3; ++f2) {
                if (s3 = e3[f2], r2 = this._unicodeService.wcwidth(s3), s3 < 127 && n2) {
                  const e4 = n2[String.fromCharCode(s3)];
                  e4 && (s3 = e4.charCodeAt(0));
                }
                if (o2 && this._onA11yChar.fire((0, a.stringFromCodePoint)(s3)), void 0 !== this._currentLinkId && this._oscLinkService.addLineToLink(this._currentLinkId, this._activeBuffer.ybase + this._activeBuffer.y), r2 || !this._activeBuffer.x) {
                  if (this._activeBuffer.x + r2 - 1 >= h3) {
                    if (c2) {
                      for (; this._activeBuffer.x < h3; )
                        u2.setCellFromCodePoint(this._activeBuffer.x++, 0, 1, _2.fg, _2.bg, _2.extended);
                      this._activeBuffer.x = 0, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), u2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                    } else if (this._activeBuffer.x = h3 - 1, 2 === r2)
                      continue;
                  }
                  if (d2 && (u2.insertCells(this._activeBuffer.x, r2, this._activeBuffer.getNullCell(_2), _2), 2 === u2.getWidth(h3 - 1) && u2.setCellFromCodePoint(h3 - 1, l.NULL_CELL_CODE, l.NULL_CELL_WIDTH, _2.fg, _2.bg, _2.extended)), u2.setCellFromCodePoint(this._activeBuffer.x++, s3, r2, _2.fg, _2.bg, _2.extended), r2 > 0)
                    for (; --r2; )
                      u2.setCellFromCodePoint(this._activeBuffer.x++, 0, 0, _2.fg, _2.bg, _2.extended);
                } else
                  u2.getWidth(this._activeBuffer.x - 1) ? u2.addCodepointToCell(this._activeBuffer.x - 1, s3) : u2.addCodepointToCell(this._activeBuffer.x - 2, s3);
              }
              i3 - t3 > 0 && (u2.loadCell(this._activeBuffer.x - 1, this._workCell), 2 === this._workCell.getWidth() || this._workCell.getCode() > 65535 ? this._parser.precedingCodepoint = 0 : this._workCell.isCombined() ? this._parser.precedingCodepoint = this._workCell.getChars().charCodeAt(0) : this._parser.precedingCodepoint = this._workCell.content), this._activeBuffer.x < h3 && i3 - t3 > 0 && 0 === u2.getWidth(this._activeBuffer.x) && !u2.hasContent(this._activeBuffer.x) && u2.setCellFromCodePoint(this._activeBuffer.x, 0, 1, _2.fg, _2.bg, _2.extended), this._dirtyRowService.markDirty(this._activeBuffer.y);
            }
            registerCsiHandler(e3, t3) {
              return "t" !== e3.final || e3.prefix || e3.intermediates ? this._parser.registerCsiHandler(e3, t3) : this._parser.registerCsiHandler(e3, (e4) => !m3(e4.params[0], this._optionsService.rawOptions.windowOptions) || t3(e4));
            }
            registerDcsHandler(e3, t3) {
              return this._parser.registerDcsHandler(e3, new v.DcsHandler(t3));
            }
            registerEscHandler(e3, t3) {
              return this._parser.registerEscHandler(e3, t3);
            }
            registerOscHandler(e3, t3) {
              return this._parser.registerOscHandler(e3, new f.OscHandler(t3));
            }
            bell() {
              return this._onRequestBell.fire(), true;
            }
            lineFeed() {
              return this._dirtyRowService.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowService.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
            }
            carriageReturn() {
              return this._activeBuffer.x = 0, true;
            }
            backspace() {
              var e3;
              if (!this._coreService.decPrivateModes.reverseWraparound)
                return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
              if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0)
                this._activeBuffer.x--;
              else if (0 === this._activeBuffer.x && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && (null === (e3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)) || void 0 === e3 ? void 0 : e3.isWrapped)) {
                this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
                const e4 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                e4.hasWidth(this._activeBuffer.x) && !e4.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
              }
              return this._restrictCursor(), true;
            }
            tab() {
              if (this._activeBuffer.x >= this._bufferService.cols)
                return true;
              const e3 = this._activeBuffer.x;
              return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e3), true;
            }
            shiftOut() {
              return this._charsetService.setgLevel(1), true;
            }
            shiftIn() {
              return this._charsetService.setgLevel(0), true;
            }
            _restrictCursor(e3 = this._bufferService.cols - 1) {
              this._activeBuffer.x = Math.min(e3, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowService.markDirty(this._activeBuffer.y);
            }
            _setCursor(e3, t3) {
              this._dirtyRowService.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e3, this._activeBuffer.y = this._activeBuffer.scrollTop + t3) : (this._activeBuffer.x = e3, this._activeBuffer.y = t3), this._restrictCursor(), this._dirtyRowService.markDirty(this._activeBuffer.y);
            }
            _moveCursor(e3, t3) {
              this._restrictCursor(), this._setCursor(this._activeBuffer.x + e3, this._activeBuffer.y + t3);
            }
            cursorUp(e3) {
              const t3 = this._activeBuffer.y - this._activeBuffer.scrollTop;
              return t3 >= 0 ? this._moveCursor(0, -Math.min(t3, e3.params[0] || 1)) : this._moveCursor(0, -(e3.params[0] || 1)), true;
            }
            cursorDown(e3) {
              const t3 = this._activeBuffer.scrollBottom - this._activeBuffer.y;
              return t3 >= 0 ? this._moveCursor(0, Math.min(t3, e3.params[0] || 1)) : this._moveCursor(0, e3.params[0] || 1), true;
            }
            cursorForward(e3) {
              return this._moveCursor(e3.params[0] || 1, 0), true;
            }
            cursorBackward(e3) {
              return this._moveCursor(-(e3.params[0] || 1), 0), true;
            }
            cursorNextLine(e3) {
              return this.cursorDown(e3), this._activeBuffer.x = 0, true;
            }
            cursorPrecedingLine(e3) {
              return this.cursorUp(e3), this._activeBuffer.x = 0, true;
            }
            cursorCharAbsolute(e3) {
              return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
            }
            cursorPosition(e3) {
              return this._setCursor(e3.length >= 2 ? (e3.params[1] || 1) - 1 : 0, (e3.params[0] || 1) - 1), true;
            }
            charPosAbsolute(e3) {
              return this._setCursor((e3.params[0] || 1) - 1, this._activeBuffer.y), true;
            }
            hPositionRelative(e3) {
              return this._moveCursor(e3.params[0] || 1, 0), true;
            }
            linePosAbsolute(e3) {
              return this._setCursor(this._activeBuffer.x, (e3.params[0] || 1) - 1), true;
            }
            vPositionRelative(e3) {
              return this._moveCursor(0, e3.params[0] || 1), true;
            }
            hVPosition(e3) {
              return this.cursorPosition(e3), true;
            }
            tabClear(e3) {
              const t3 = e3.params[0];
              return 0 === t3 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : 3 === t3 && (this._activeBuffer.tabs = {}), true;
            }
            cursorForwardTab(e3) {
              if (this._activeBuffer.x >= this._bufferService.cols)
                return true;
              let t3 = e3.params[0] || 1;
              for (; t3--; )
                this._activeBuffer.x = this._activeBuffer.nextStop();
              return true;
            }
            cursorBackwardTab(e3) {
              if (this._activeBuffer.x >= this._bufferService.cols)
                return true;
              let t3 = e3.params[0] || 1;
              for (; t3--; )
                this._activeBuffer.x = this._activeBuffer.prevStop();
              return true;
            }
            selectProtected(e3) {
              const t3 = e3.params[0];
              return 1 === t3 && (this._curAttrData.bg |= 536870912), 2 !== t3 && 0 !== t3 || (this._curAttrData.bg &= -536870913), true;
            }
            _eraseInBufferLine(e3, t3, i3, s3 = false, r2 = false) {
              const n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
              n2.replaceCells(t3, i3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData(), r2), s3 && (n2.isWrapped = false);
            }
            _resetBufferLine(e3, t3 = false) {
              const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e3);
              i3.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), t3), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e3), i3.isWrapped = false;
            }
            eraseInDisplay(e3, t3 = false) {
              let i3;
              switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
                case 0:
                  for (i3 = this._activeBuffer.y, this._dirtyRowService.markDirty(i3), this._eraseInBufferLine(i3++, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t3); i3 < this._bufferService.rows; i3++)
                    this._resetBufferLine(i3, t3);
                  this._dirtyRowService.markDirty(i3);
                  break;
                case 1:
                  for (i3 = this._activeBuffer.y, this._dirtyRowService.markDirty(i3), this._eraseInBufferLine(i3, 0, this._activeBuffer.x + 1, true, t3), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(i3 + 1).isWrapped = false); i3--; )
                    this._resetBufferLine(i3, t3);
                  this._dirtyRowService.markDirty(0);
                  break;
                case 2:
                  for (i3 = this._bufferService.rows, this._dirtyRowService.markDirty(i3 - 1); i3--; )
                    this._resetBufferLine(i3, t3);
                  this._dirtyRowService.markDirty(0);
                  break;
                case 3:
                  const e4 = this._activeBuffer.lines.length - this._bufferService.rows;
                  e4 > 0 && (this._activeBuffer.lines.trimStart(e4), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - e4, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - e4, 0), this._onScroll.fire(0));
              }
              return true;
            }
            eraseInLine(e3, t3 = false) {
              switch (this._restrictCursor(this._bufferService.cols), e3.params[0]) {
                case 0:
                  this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, 0 === this._activeBuffer.x, t3);
                  break;
                case 1:
                  this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, t3);
                  break;
                case 2:
                  this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, t3);
              }
              return this._dirtyRowService.markDirty(this._activeBuffer.y), true;
            }
            insertLines(e3) {
              this._restrictCursor();
              let t3 = e3.params[0] || 1;
              if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
                return true;
              const i3 = this._activeBuffer.ybase + this._activeBuffer.y, s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, r2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3 + 1;
              for (; t3--; )
                this._activeBuffer.lines.splice(r2 - 1, 1), this._activeBuffer.lines.splice(i3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
            }
            deleteLines(e3) {
              this._restrictCursor();
              let t3 = e3.params[0] || 1;
              if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
                return true;
              const i3 = this._activeBuffer.ybase + this._activeBuffer.y;
              let s3;
              for (s3 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, s3 = this._bufferService.rows - 1 + this._activeBuffer.ybase - s3; t3--; )
                this._activeBuffer.lines.splice(i3, 1), this._activeBuffer.lines.splice(s3, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
            }
            insertChars(e3) {
              this._restrictCursor();
              const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
              return t3 && (t3.insertCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowService.markDirty(this._activeBuffer.y)), true;
            }
            deleteChars(e3) {
              this._restrictCursor();
              const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
              return t3 && (t3.deleteCells(this._activeBuffer.x, e3.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowService.markDirty(this._activeBuffer.y)), true;
            }
            scrollUp(e3) {
              let t3 = e3.params[0] || 1;
              for (; t3--; )
                this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
            }
            scrollDown(e3) {
              let t3 = e3.params[0] || 1;
              for (; t3--; )
                this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(h2.DEFAULT_ATTR_DATA));
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
            }
            scrollLeft(e3) {
              if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
                return true;
              const t3 = e3.params[0] || 1;
              for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
                const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
                i3.deleteCells(0, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
              }
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
            }
            scrollRight(e3) {
              if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
                return true;
              const t3 = e3.params[0] || 1;
              for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
                const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
                i3.insertCells(0, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
              }
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
            }
            insertColumns(e3) {
              if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
                return true;
              const t3 = e3.params[0] || 1;
              for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
                const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
                i3.insertCells(this._activeBuffer.x, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
              }
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
            }
            deleteColumns(e3) {
              if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop)
                return true;
              const t3 = e3.params[0] || 1;
              for (let e4 = this._activeBuffer.scrollTop; e4 <= this._activeBuffer.scrollBottom; ++e4) {
                const i3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e4);
                i3.deleteCells(this._activeBuffer.x, t3, this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), i3.isWrapped = false;
              }
              return this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
            }
            eraseChars(e3) {
              this._restrictCursor();
              const t3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
              return t3 && (t3.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e3.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData()), this._eraseAttrData()), this._dirtyRowService.markDirty(this._activeBuffer.y)), true;
            }
            repeatPrecedingCharacter(e3) {
              if (!this._parser.precedingCodepoint)
                return true;
              const t3 = e3.params[0] || 1, i3 = new Uint32Array(t3);
              for (let e4 = 0; e4 < t3; ++e4)
                i3[e4] = this._parser.precedingCodepoint;
              return this.print(i3, 0, i3.length), true;
            }
            sendDeviceAttributesPrimary(e3) {
              return e3.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(s2.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(s2.C0.ESC + "[?6c")), true;
            }
            sendDeviceAttributesSecondary(e3) {
              return e3.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(s2.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(s2.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e3.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(s2.C0.ESC + "[>83;40003;0c")), true;
            }
            _is(e3) {
              return 0 === (this._optionsService.rawOptions.termName + "").indexOf(e3);
            }
            setMode(e3) {
              for (let t3 = 0; t3 < e3.length; t3++)
                switch (e3.params[t3]) {
                  case 4:
                    this._coreService.modes.insertMode = true;
                    break;
                  case 20:
                    this._optionsService.options.convertEol = true;
                }
              return true;
            }
            setModePrivate(e3) {
              for (let t3 = 0; t3 < e3.length; t3++)
                switch (e3.params[t3]) {
                  case 1:
                    this._coreService.decPrivateModes.applicationCursorKeys = true;
                    break;
                  case 2:
                    this._charsetService.setgCharset(0, r.DEFAULT_CHARSET), this._charsetService.setgCharset(1, r.DEFAULT_CHARSET), this._charsetService.setgCharset(2, r.DEFAULT_CHARSET), this._charsetService.setgCharset(3, r.DEFAULT_CHARSET);
                    break;
                  case 3:
                    this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
                    break;
                  case 6:
                    this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
                    break;
                  case 7:
                    this._coreService.decPrivateModes.wraparound = true;
                    break;
                  case 12:
                    this._optionsService.options.cursorBlink = true;
                    break;
                  case 45:
                    this._coreService.decPrivateModes.reverseWraparound = true;
                    break;
                  case 66:
                    this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
                    break;
                  case 9:
                    this._coreMouseService.activeProtocol = "X10";
                    break;
                  case 1e3:
                    this._coreMouseService.activeProtocol = "VT200";
                    break;
                  case 1002:
                    this._coreMouseService.activeProtocol = "DRAG";
                    break;
                  case 1003:
                    this._coreMouseService.activeProtocol = "ANY";
                    break;
                  case 1004:
                    this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
                    break;
                  case 1005:
                    this._logService.debug("DECSET 1005 not supported (see #2507)");
                    break;
                  case 1006:
                    this._coreMouseService.activeEncoding = "SGR";
                    break;
                  case 1015:
                    this._logService.debug("DECSET 1015 not supported (see #2507)");
                    break;
                  case 1016:
                    this._coreMouseService.activeEncoding = "SGR_PIXELS";
                    break;
                  case 25:
                    this._coreService.isCursorHidden = false;
                    break;
                  case 1048:
                    this.saveCursor();
                    break;
                  case 1049:
                    this.saveCursor();
                  case 47:
                  case 1047:
                    this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                    break;
                  case 2004:
                    this._coreService.decPrivateModes.bracketedPasteMode = true;
                }
              return true;
            }
            resetMode(e3) {
              for (let t3 = 0; t3 < e3.length; t3++)
                switch (e3.params[t3]) {
                  case 4:
                    this._coreService.modes.insertMode = false;
                    break;
                  case 20:
                    this._optionsService.options.convertEol = false;
                }
              return true;
            }
            resetModePrivate(e3) {
              for (let t3 = 0; t3 < e3.length; t3++)
                switch (e3.params[t3]) {
                  case 1:
                    this._coreService.decPrivateModes.applicationCursorKeys = false;
                    break;
                  case 3:
                    this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
                    break;
                  case 6:
                    this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
                    break;
                  case 7:
                    this._coreService.decPrivateModes.wraparound = false;
                    break;
                  case 12:
                    this._optionsService.options.cursorBlink = false;
                    break;
                  case 45:
                    this._coreService.decPrivateModes.reverseWraparound = false;
                    break;
                  case 66:
                    this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
                    break;
                  case 9:
                  case 1e3:
                  case 1002:
                  case 1003:
                    this._coreMouseService.activeProtocol = "NONE";
                    break;
                  case 1004:
                    this._coreService.decPrivateModes.sendFocus = false;
                    break;
                  case 1005:
                    this._logService.debug("DECRST 1005 not supported (see #2507)");
                    break;
                  case 1006:
                  case 1016:
                    this._coreMouseService.activeEncoding = "DEFAULT";
                    break;
                  case 1015:
                    this._logService.debug("DECRST 1015 not supported (see #2507)");
                    break;
                  case 25:
                    this._coreService.isCursorHidden = true;
                    break;
                  case 1048:
                    this.restoreCursor();
                    break;
                  case 1049:
                  case 47:
                  case 1047:
                    this._bufferService.buffers.activateNormalBuffer(), 1049 === e3.params[t3] && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                    break;
                  case 2004:
                    this._coreService.decPrivateModes.bracketedPasteMode = false;
                }
              return true;
            }
            requestMode(e3, t3) {
              const i3 = this._coreService.decPrivateModes, { activeProtocol: r2, activeEncoding: n2 } = this._coreMouseService, o2 = this._coreService, { buffers: a2, cols: h3 } = this._bufferService, { active: c2, alt: l2 } = a2, d2 = this._optionsService.rawOptions, _2 = (e4) => e4 ? 1 : 2, u2 = e3.params[0];
              return f2 = u2, v2 = t3 ? 2 === u2 ? 3 : 4 === u2 ? _2(o2.modes.insertMode) : 12 === u2 ? 4 : 20 === u2 ? _2(d2.convertEol) : 0 : 1 === u2 ? _2(i3.applicationCursorKeys) : 3 === u2 ? d2.windowOptions.setWinLines ? 80 === h3 ? 2 : 132 === h3 ? 1 : 0 : 0 : 6 === u2 ? _2(i3.origin) : 7 === u2 ? _2(i3.wraparound) : 8 === u2 ? 3 : 9 === u2 ? _2("X10" === r2) : 12 === u2 ? _2(d2.cursorBlink) : 25 === u2 ? _2(!o2.isCursorHidden) : 45 === u2 ? _2(i3.reverseWraparound) : 66 === u2 ? _2(i3.applicationKeypad) : 1e3 === u2 ? _2("VT200" === r2) : 1002 === u2 ? _2("DRAG" === r2) : 1003 === u2 ? _2("ANY" === r2) : 1004 === u2 ? _2(i3.sendFocus) : 1005 === u2 ? 4 : 1006 === u2 ? _2("SGR" === n2) : 1015 === u2 ? 4 : 1016 === u2 ? _2("SGR_PIXELS" === n2) : 1048 === u2 ? 1 : 47 === u2 || 1047 === u2 || 1049 === u2 ? _2(c2 === l2) : 2004 === u2 ? _2(i3.bracketedPasteMode) : 0, o2.triggerDataEvent(`${s2.C0.ESC}[${t3 ? "" : "?"}${f2};${v2}$y`), true;
              var f2, v2;
            }
            _updateAttrColor(e3, t3, i3, s3, r2) {
              return 2 === t3 ? (e3 |= 50331648, e3 &= -16777216, e3 |= _.AttributeData.fromColorRGB([i3, s3, r2])) : 5 === t3 && (e3 &= -50331904, e3 |= 33554432 | 255 & i3), e3;
            }
            _extractColor(e3, t3, i3) {
              const s3 = [0, 0, -1, 0, 0, 0];
              let r2 = 0, n2 = 0;
              do {
                if (s3[n2 + r2] = e3.params[t3 + n2], e3.hasSubParams(t3 + n2)) {
                  const i4 = e3.getSubParams(t3 + n2);
                  let o2 = 0;
                  do {
                    5 === s3[1] && (r2 = 1), s3[n2 + o2 + 1 + r2] = i4[o2];
                  } while (++o2 < i4.length && o2 + n2 + 1 + r2 < s3.length);
                  break;
                }
                if (5 === s3[1] && n2 + r2 >= 2 || 2 === s3[1] && n2 + r2 >= 5)
                  break;
                s3[1] && (r2 = 1);
              } while (++n2 + t3 < e3.length && n2 + r2 < s3.length);
              for (let e4 = 2; e4 < s3.length; ++e4)
                -1 === s3[e4] && (s3[e4] = 0);
              switch (s3[0]) {
                case 38:
                  i3.fg = this._updateAttrColor(i3.fg, s3[1], s3[3], s3[4], s3[5]);
                  break;
                case 48:
                  i3.bg = this._updateAttrColor(i3.bg, s3[1], s3[3], s3[4], s3[5]);
                  break;
                case 58:
                  i3.extended = i3.extended.clone(), i3.extended.underlineColor = this._updateAttrColor(i3.extended.underlineColor, s3[1], s3[3], s3[4], s3[5]);
              }
              return n2;
            }
            _processUnderline(e3, t3) {
              t3.extended = t3.extended.clone(), (!~e3 || e3 > 5) && (e3 = 1), t3.extended.underlineStyle = e3, t3.fg |= 268435456, 0 === e3 && (t3.fg &= -268435457), t3.updateExtended();
            }
            charAttributes(e3) {
              if (1 === e3.length && 0 === e3.params[0])
                return this._curAttrData.fg = h2.DEFAULT_ATTR_DATA.fg, this._curAttrData.bg = h2.DEFAULT_ATTR_DATA.bg, true;
              const t3 = e3.length;
              let i3;
              const s3 = this._curAttrData;
              for (let r2 = 0; r2 < t3; r2++)
                i3 = e3.params[r2], i3 >= 30 && i3 <= 37 ? (s3.fg &= -50331904, s3.fg |= 16777216 | i3 - 30) : i3 >= 40 && i3 <= 47 ? (s3.bg &= -50331904, s3.bg |= 16777216 | i3 - 40) : i3 >= 90 && i3 <= 97 ? (s3.fg &= -50331904, s3.fg |= 16777224 | i3 - 90) : i3 >= 100 && i3 <= 107 ? (s3.bg &= -50331904, s3.bg |= 16777224 | i3 - 100) : 0 === i3 ? (s3.fg = h2.DEFAULT_ATTR_DATA.fg, s3.bg = h2.DEFAULT_ATTR_DATA.bg) : 1 === i3 ? s3.fg |= 134217728 : 3 === i3 ? s3.bg |= 67108864 : 4 === i3 ? (s3.fg |= 268435456, this._processUnderline(e3.hasSubParams(r2) ? e3.getSubParams(r2)[0] : 1, s3)) : 5 === i3 ? s3.fg |= 536870912 : 7 === i3 ? s3.fg |= 67108864 : 8 === i3 ? s3.fg |= 1073741824 : 9 === i3 ? s3.fg |= 2147483648 : 2 === i3 ? s3.bg |= 134217728 : 21 === i3 ? this._processUnderline(2, s3) : 22 === i3 ? (s3.fg &= -134217729, s3.bg &= -134217729) : 23 === i3 ? s3.bg &= -67108865 : 24 === i3 ? (s3.fg &= -268435457, this._processUnderline(0, s3)) : 25 === i3 ? s3.fg &= -536870913 : 27 === i3 ? s3.fg &= -67108865 : 28 === i3 ? s3.fg &= -1073741825 : 29 === i3 ? s3.fg &= 2147483647 : 39 === i3 ? (s3.fg &= -67108864, s3.fg |= 16777215 & h2.DEFAULT_ATTR_DATA.fg) : 49 === i3 ? (s3.bg &= -67108864, s3.bg |= 16777215 & h2.DEFAULT_ATTR_DATA.bg) : 38 === i3 || 48 === i3 || 58 === i3 ? r2 += this._extractColor(e3, r2, s3) : 59 === i3 ? (s3.extended = s3.extended.clone(), s3.extended.underlineColor = -1, s3.updateExtended()) : 100 === i3 ? (s3.fg &= -67108864, s3.fg |= 16777215 & h2.DEFAULT_ATTR_DATA.fg, s3.bg &= -67108864, s3.bg |= 16777215 & h2.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", i3);
              return true;
            }
            deviceStatus(e3) {
              switch (e3.params[0]) {
                case 5:
                  this._coreService.triggerDataEvent(`${s2.C0.ESC}[0n`);
                  break;
                case 6:
                  const e4 = this._activeBuffer.y + 1, t3 = this._activeBuffer.x + 1;
                  this._coreService.triggerDataEvent(`${s2.C0.ESC}[${e4};${t3}R`);
              }
              return true;
            }
            deviceStatusPrivate(e3) {
              if (6 === e3.params[0]) {
                const e4 = this._activeBuffer.y + 1, t3 = this._activeBuffer.x + 1;
                this._coreService.triggerDataEvent(`${s2.C0.ESC}[?${e4};${t3}R`);
              }
              return true;
            }
            softReset(e3) {
              return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = h2.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
            }
            setCursorStyle(e3) {
              const t3 = e3.params[0] || 1;
              switch (t3) {
                case 1:
                case 2:
                  this._optionsService.options.cursorStyle = "block";
                  break;
                case 3:
                case 4:
                  this._optionsService.options.cursorStyle = "underline";
                  break;
                case 5:
                case 6:
                  this._optionsService.options.cursorStyle = "bar";
              }
              const i3 = t3 % 2 == 1;
              return this._optionsService.options.cursorBlink = i3, true;
            }
            setScrollRegion(e3) {
              const t3 = e3.params[0] || 1;
              let i3;
              return (e3.length < 2 || (i3 = e3.params[1]) > this._bufferService.rows || 0 === i3) && (i3 = this._bufferService.rows), i3 > t3 && (this._activeBuffer.scrollTop = t3 - 1, this._activeBuffer.scrollBottom = i3 - 1, this._setCursor(0, 0)), true;
            }
            windowOptions(e3) {
              if (!m3(e3.params[0], this._optionsService.rawOptions.windowOptions))
                return true;
              const t3 = e3.length > 1 ? e3.params[1] : 0;
              switch (e3.params[0]) {
                case 14:
                  2 !== t3 && this._onRequestWindowsOptionsReport.fire(C.GET_WIN_SIZE_PIXELS);
                  break;
                case 16:
                  this._onRequestWindowsOptionsReport.fire(C.GET_CELL_SIZE_PIXELS);
                  break;
                case 18:
                  this._bufferService && this._coreService.triggerDataEvent(`${s2.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
                  break;
                case 22:
                  0 !== t3 && 2 !== t3 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), 0 !== t3 && 1 !== t3 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
                  break;
                case 23:
                  0 !== t3 && 2 !== t3 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), 0 !== t3 && 1 !== t3 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
              }
              return true;
            }
            saveCursor(e3) {
              return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
            }
            restoreCursor(e3) {
              return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
            }
            setTitle(e3) {
              return this._windowTitle = e3, this._onTitleChange.fire(e3), true;
            }
            setIconName(e3) {
              return this._iconName = e3, true;
            }
            setOrReportIndexedColor(e3) {
              const t3 = [], i3 = e3.split(";");
              for (; i3.length > 1; ) {
                const e4 = i3.shift(), s3 = i3.shift();
                if (/^\d+$/.exec(e4)) {
                  const i4 = parseInt(e4);
                  if (0 <= i4 && i4 < 256)
                    if ("?" === s3)
                      t3.push({ type: 0, index: i4 });
                    else {
                      const e5 = (0, g.parseColor)(s3);
                      e5 && t3.push({ type: 1, index: i4, color: e5 });
                    }
                }
              }
              return t3.length && this._onColor.fire(t3), true;
            }
            setHyperlink(e3) {
              const t3 = e3.split(";");
              return !(t3.length < 2) && (t3[1] ? this._createHyperlink(t3[0], t3[1]) : !t3[0] && this._finishHyperlink());
            }
            _createHyperlink(e3, t3) {
              void 0 !== this._currentLinkId && this._finishHyperlink();
              const i3 = e3.split(":");
              let s3;
              const r2 = i3.findIndex((e4) => e4.startsWith("id="));
              return -1 !== r2 && (s3 = i3[r2].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._currentLinkId = this._oscLinkService.registerLink({ id: s3, uri: t3 }), this._curAttrData.extended.urlId = this._currentLinkId, this._curAttrData.updateExtended(), true;
            }
            _finishHyperlink() {
              return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), this._currentLinkId = void 0, true;
            }
            _setOrReportSpecialColor(e3, t3) {
              const i3 = e3.split(";");
              for (let e4 = 0; e4 < i3.length && !(t3 >= this._specialColors.length); ++e4, ++t3)
                if ("?" === i3[e4])
                  this._onColor.fire([{ type: 0, index: this._specialColors[t3] }]);
                else {
                  const s3 = (0, g.parseColor)(i3[e4]);
                  s3 && this._onColor.fire([{ type: 1, index: this._specialColors[t3], color: s3 }]);
                }
              return true;
            }
            setOrReportFgColor(e3) {
              return this._setOrReportSpecialColor(e3, 0);
            }
            setOrReportBgColor(e3) {
              return this._setOrReportSpecialColor(e3, 1);
            }
            setOrReportCursorColor(e3) {
              return this._setOrReportSpecialColor(e3, 2);
            }
            restoreIndexedColor(e3) {
              if (!e3)
                return this._onColor.fire([{ type: 2 }]), true;
              const t3 = [], i3 = e3.split(";");
              for (let e4 = 0; e4 < i3.length; ++e4)
                if (/^\d+$/.exec(i3[e4])) {
                  const s3 = parseInt(i3[e4]);
                  0 <= s3 && s3 < 256 && t3.push({ type: 2, index: s3 });
                }
              return t3.length && this._onColor.fire(t3), true;
            }
            restoreFgColor(e3) {
              return this._onColor.fire([{ type: 2, index: 256 }]), true;
            }
            restoreBgColor(e3) {
              return this._onColor.fire([{ type: 2, index: 257 }]), true;
            }
            restoreCursorColor(e3) {
              return this._onColor.fire([{ type: 2, index: 258 }]), true;
            }
            nextLine() {
              return this._activeBuffer.x = 0, this.index(), true;
            }
            keypadApplicationMode() {
              return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
            }
            keypadNumericMode() {
              return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
            }
            selectDefaultCharset() {
              return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, r.DEFAULT_CHARSET), true;
            }
            selectCharset(e3) {
              return 2 !== e3.length ? (this.selectDefaultCharset(), true) : ("/" === e3[0] || this._charsetService.setgCharset(p2[e3[0]], r.CHARSETS[e3[1]] || r.DEFAULT_CHARSET), true);
            }
            index() {
              return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
            }
            tabSet() {
              return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
            }
            reverseIndex() {
              if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
                const e3 = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
                this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e3, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowService.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
              } else
                this._activeBuffer.y--, this._restrictCursor();
              return true;
            }
            fullReset() {
              return this._parser.reset(), this._onRequestReset.fire(), true;
            }
            reset() {
              this._curAttrData = h2.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = h2.DEFAULT_ATTR_DATA.clone();
            }
            _eraseAttrData() {
              return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
            }
            setgLevel(e3) {
              return this._charsetService.setgLevel(e3), true;
            }
            screenAlignmentPattern() {
              const e3 = new d.CellData();
              e3.content = 1 << 22 | "E".charCodeAt(0), e3.fg = this._curAttrData.fg, e3.bg = this._curAttrData.bg, this._setCursor(0, 0);
              for (let t3 = 0; t3 < this._bufferService.rows; ++t3) {
                const i3 = this._activeBuffer.ybase + this._activeBuffer.y + t3, s3 = this._activeBuffer.lines.get(i3);
                s3 && (s3.fill(e3), s3.isWrapped = false);
              }
              return this._dirtyRowService.markAllDirty(), this._setCursor(0, 0), true;
            }
            requestStatusString(e3, t3) {
              const i3 = this._bufferService.buffer, r2 = this._optionsService.rawOptions;
              return ((e4) => (this._coreService.triggerDataEvent(`${s2.C0.ESC}${e4}${s2.C0.ESC}\\`), true))('"q' === e3 ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : '"p' === e3 ? 'P1$r61;1"p' : "r" === e3 ? `P1$r${i3.scrollTop + 1};${i3.scrollBottom + 1}r` : "m" === e3 ? "P1$r0m" : " q" === e3 ? `P1$r${{ block: 2, underline: 4, bar: 6 }[r2.cursorStyle] - (r2.cursorBlink ? 1 : 0)} q` : "P0$r");
            }
          }
          t2.InputHandler = b;
        }, 844: (e2, t2) => {
          function i2(e3) {
            for (const t3 of e3)
              t3.dispose();
            e3.length = 0;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getDisposeArrayDisposable = t2.disposeArray = t2.toDisposable = t2.Disposable = void 0, t2.Disposable = class {
            constructor() {
              this._disposables = [], this._isDisposed = false;
            }
            dispose() {
              this._isDisposed = true;
              for (const e3 of this._disposables)
                e3.dispose();
              this._disposables.length = 0;
            }
            register(e3) {
              return this._disposables.push(e3), e3;
            }
            unregister(e3) {
              const t3 = this._disposables.indexOf(e3);
              -1 !== t3 && this._disposables.splice(t3, 1);
            }
          }, t2.toDisposable = function(e3) {
            return { dispose: e3 };
          }, t2.disposeArray = i2, t2.getDisposeArrayDisposable = function(e3) {
            return { dispose: () => i2(e3) };
          };
        }, 1505: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.FourKeyMap = t2.TwoKeyMap = void 0;
          class i2 {
            constructor() {
              this._data = {};
            }
            set(e3, t3, i3) {
              this._data[e3] || (this._data[e3] = {}), this._data[e3][t3] = i3;
            }
            get(e3, t3) {
              return this._data[e3] ? this._data[e3][t3] : void 0;
            }
            clear() {
              this._data = {};
            }
          }
          t2.TwoKeyMap = i2, t2.FourKeyMap = class {
            constructor() {
              this._data = new i2();
            }
            set(e3, t3, s2, r, n) {
              this._data.get(e3, t3) || this._data.set(e3, t3, new i2()), this._data.get(e3, t3).set(s2, r, n);
            }
            get(e3, t3, i3, s2) {
              var r;
              return null === (r = this._data.get(e3, t3)) || void 0 === r ? void 0 : r.get(i3, s2);
            }
            clear() {
              this._data.clear();
            }
          };
        }, 6114: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isLinux = t2.isWindows = t2.isIphone = t2.isIpad = t2.isMac = t2.isSafari = t2.isLegacyEdge = t2.isFirefox = void 0;
          const i2 = "undefined" == typeof navigator, s2 = i2 ? "node" : navigator.userAgent, r = i2 ? "node" : navigator.platform;
          t2.isFirefox = s2.includes("Firefox"), t2.isLegacyEdge = s2.includes("Edge"), t2.isSafari = /^((?!chrome|android).)*safari/i.test(s2), t2.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(r), t2.isIpad = "iPad" === r, t2.isIphone = "iPhone" === r, t2.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(r), t2.isLinux = r.indexOf("Linux") >= 0;
        }, 6106: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SortedList = void 0;
          let i2 = 0;
          t2.SortedList = class {
            constructor(e3) {
              this._getKey = e3, this._array = [];
            }
            clear() {
              this._array.length = 0;
            }
            insert(e3) {
              0 !== this._array.length ? (i2 = this._search(this._getKey(e3), 0, this._array.length - 1), this._array.splice(i2, 0, e3)) : this._array.push(e3);
            }
            delete(e3) {
              if (0 === this._array.length)
                return false;
              const t3 = this._getKey(e3);
              if (void 0 === t3)
                return false;
              if (i2 = this._search(t3, 0, this._array.length - 1), -1 === i2)
                return false;
              if (this._getKey(this._array[i2]) !== t3)
                return false;
              do {
                if (this._array[i2] === e3)
                  return this._array.splice(i2, 1), true;
              } while (++i2 < this._array.length && this._getKey(this._array[i2]) === t3);
              return false;
            }
            *getKeyIterator(e3) {
              if (0 !== this._array.length && (i2 = this._search(e3, 0, this._array.length - 1), !(i2 < 0 || i2 >= this._array.length) && this._getKey(this._array[i2]) === e3))
                do {
                  yield this._array[i2];
                } while (++i2 < this._array.length && this._getKey(this._array[i2]) === e3);
            }
            forEachByKey(e3, t3) {
              if (0 !== this._array.length && (i2 = this._search(e3, 0, this._array.length - 1), !(i2 < 0 || i2 >= this._array.length) && this._getKey(this._array[i2]) === e3))
                do {
                  t3(this._array[i2]);
                } while (++i2 < this._array.length && this._getKey(this._array[i2]) === e3);
            }
            values() {
              return this._array.values();
            }
            _search(e3, t3, i3) {
              if (i3 < t3)
                return t3;
              let s2 = Math.floor((t3 + i3) / 2);
              const r = this._getKey(this._array[s2]);
              if (r > e3)
                return this._search(e3, t3, s2 - 1);
              if (r < e3)
                return this._search(e3, s2 + 1, i3);
              for (; s2 > 0 && this._getKey(this._array[s2 - 1]) === e3; )
                s2--;
              return s2;
            }
          };
        }, 8273: (e2, t2) => {
          function i2(e3, t3, i3 = 0, s2 = e3.length) {
            if (i3 >= e3.length)
              return e3;
            i3 = (e3.length + i3) % e3.length, s2 = s2 >= e3.length ? e3.length : (e3.length + s2) % e3.length;
            for (let r = i3; r < s2; ++r)
              e3[r] = t3;
            return e3;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.concat = t2.fillFallback = t2.fill = void 0, t2.fill = function(e3, t3, s2, r) {
            return e3.fill ? e3.fill(t3, s2, r) : i2(e3, t3, s2, r);
          }, t2.fillFallback = i2, t2.concat = function(e3, t3) {
            const i3 = new e3.constructor(e3.length + t3.length);
            return i3.set(e3), i3.set(t3, e3.length), i3;
          };
        }, 9282: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.updateWindowsModeWrappedState = void 0;
          const s2 = i2(643);
          t2.updateWindowsModeWrappedState = function(e3) {
            const t3 = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y - 1), i3 = null == t3 ? void 0 : t3.get(e3.cols - 1), r = e3.buffer.lines.get(e3.buffer.ybase + e3.buffer.y);
            r && i3 && (r.isWrapped = i3[s2.CHAR_DATA_CODE_INDEX] !== s2.NULL_CELL_CODE && i3[s2.CHAR_DATA_CODE_INDEX] !== s2.WHITESPACE_CELL_CODE);
          };
        }, 3734: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ExtendedAttrs = t2.AttributeData = void 0;
          class i2 {
            constructor() {
              this.fg = 0, this.bg = 0, this.extended = new s2();
            }
            static toColorRGB(e3) {
              return [e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3];
            }
            static fromColorRGB(e3) {
              return (255 & e3[0]) << 16 | (255 & e3[1]) << 8 | 255 & e3[2];
            }
            clone() {
              const e3 = new i2();
              return e3.fg = this.fg, e3.bg = this.bg, e3.extended = this.extended.clone(), e3;
            }
            isInverse() {
              return 67108864 & this.fg;
            }
            isBold() {
              return 134217728 & this.fg;
            }
            isUnderline() {
              return this.hasExtendedAttrs() && 0 !== this.extended.underlineStyle ? 1 : 268435456 & this.fg;
            }
            isBlink() {
              return 536870912 & this.fg;
            }
            isInvisible() {
              return 1073741824 & this.fg;
            }
            isItalic() {
              return 67108864 & this.bg;
            }
            isDim() {
              return 134217728 & this.bg;
            }
            isStrikethrough() {
              return 2147483648 & this.fg;
            }
            isProtected() {
              return 536870912 & this.bg;
            }
            getFgColorMode() {
              return 50331648 & this.fg;
            }
            getBgColorMode() {
              return 50331648 & this.bg;
            }
            isFgRGB() {
              return 50331648 == (50331648 & this.fg);
            }
            isBgRGB() {
              return 50331648 == (50331648 & this.bg);
            }
            isFgPalette() {
              return 16777216 == (50331648 & this.fg) || 33554432 == (50331648 & this.fg);
            }
            isBgPalette() {
              return 16777216 == (50331648 & this.bg) || 33554432 == (50331648 & this.bg);
            }
            isFgDefault() {
              return 0 == (50331648 & this.fg);
            }
            isBgDefault() {
              return 0 == (50331648 & this.bg);
            }
            isAttributeDefault() {
              return 0 === this.fg && 0 === this.bg;
            }
            getFgColor() {
              switch (50331648 & this.fg) {
                case 16777216:
                case 33554432:
                  return 255 & this.fg;
                case 50331648:
                  return 16777215 & this.fg;
                default:
                  return -1;
              }
            }
            getBgColor() {
              switch (50331648 & this.bg) {
                case 16777216:
                case 33554432:
                  return 255 & this.bg;
                case 50331648:
                  return 16777215 & this.bg;
                default:
                  return -1;
              }
            }
            hasExtendedAttrs() {
              return 268435456 & this.bg;
            }
            updateExtended() {
              this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
            }
            getUnderlineColor() {
              if (268435456 & this.bg && ~this.extended.underlineColor)
                switch (50331648 & this.extended.underlineColor) {
                  case 16777216:
                  case 33554432:
                    return 255 & this.extended.underlineColor;
                  case 50331648:
                    return 16777215 & this.extended.underlineColor;
                  default:
                    return this.getFgColor();
                }
              return this.getFgColor();
            }
            getUnderlineColorMode() {
              return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
            }
            isUnderlineColorRGB() {
              return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 == (50331648 & this.extended.underlineColor) : this.isFgRGB();
            }
            isUnderlineColorPalette() {
              return 268435456 & this.bg && ~this.extended.underlineColor ? 16777216 == (50331648 & this.extended.underlineColor) || 33554432 == (50331648 & this.extended.underlineColor) : this.isFgPalette();
            }
            isUnderlineColorDefault() {
              return 268435456 & this.bg && ~this.extended.underlineColor ? 0 == (50331648 & this.extended.underlineColor) : this.isFgDefault();
            }
            getUnderlineStyle() {
              return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
            }
          }
          t2.AttributeData = i2;
          class s2 {
            constructor(e3 = 0, t3 = 0) {
              this._ext = 0, this._urlId = 0, this._ext = e3, this._urlId = t3;
            }
            get ext() {
              return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
            }
            set ext(e3) {
              this._ext = e3;
            }
            get underlineStyle() {
              return this._urlId ? 5 : (469762048 & this._ext) >> 26;
            }
            set underlineStyle(e3) {
              this._ext &= -469762049, this._ext |= e3 << 26 & 469762048;
            }
            get underlineColor() {
              return 67108863 & this._ext;
            }
            set underlineColor(e3) {
              this._ext &= -67108864, this._ext |= 67108863 & e3;
            }
            get urlId() {
              return this._urlId;
            }
            set urlId(e3) {
              this._urlId = e3;
            }
            clone() {
              return new s2(this._ext, this._urlId);
            }
            isEmpty() {
              return 0 === this.underlineStyle && 0 === this._urlId;
            }
          }
          t2.ExtendedAttrs = s2;
        }, 9092: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferStringIterator = t2.Buffer = t2.MAX_BUFFER_SIZE = void 0;
          const s2 = i2(6349), r = i2(8437), n = i2(511), o = i2(643), a = i2(4634), h2 = i2(4863), c = i2(7116), l = i2(3734);
          t2.MAX_BUFFER_SIZE = 4294967295, t2.Buffer = class {
            constructor(e3, t3, i3) {
              this._hasScrollback = e3, this._optionsService = t3, this._bufferService = i3, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = r.DEFAULT_ATTR_DATA.clone(), this.savedCharset = c.DEFAULT_CHARSET, this.markers = [], this._nullCell = n.CellData.fromCharData([0, o.NULL_CELL_CHAR, o.NULL_CELL_WIDTH, o.NULL_CELL_CODE]), this._whitespaceCell = n.CellData.fromCharData([0, o.WHITESPACE_CELL_CHAR, o.WHITESPACE_CELL_WIDTH, o.WHITESPACE_CELL_CODE]), this._isClearing = false, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
            }
            getNullCell(e3) {
              return e3 ? (this._nullCell.fg = e3.fg, this._nullCell.bg = e3.bg, this._nullCell.extended = e3.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new l.ExtendedAttrs()), this._nullCell;
            }
            getWhitespaceCell(e3) {
              return e3 ? (this._whitespaceCell.fg = e3.fg, this._whitespaceCell.bg = e3.bg, this._whitespaceCell.extended = e3.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new l.ExtendedAttrs()), this._whitespaceCell;
            }
            getBlankLine(e3, t3) {
              return new r.BufferLine(this._bufferService.cols, this.getNullCell(e3), t3);
            }
            get hasScrollback() {
              return this._hasScrollback && this.lines.maxLength > this._rows;
            }
            get isCursorInViewport() {
              const e3 = this.ybase + this.y - this.ydisp;
              return e3 >= 0 && e3 < this._rows;
            }
            _getCorrectBufferLength(e3) {
              if (!this._hasScrollback)
                return e3;
              const i3 = e3 + this._optionsService.rawOptions.scrollback;
              return i3 > t2.MAX_BUFFER_SIZE ? t2.MAX_BUFFER_SIZE : i3;
            }
            fillViewportRows(e3) {
              if (0 === this.lines.length) {
                void 0 === e3 && (e3 = r.DEFAULT_ATTR_DATA);
                let t3 = this._rows;
                for (; t3--; )
                  this.lines.push(this.getBlankLine(e3));
              }
            }
            clear() {
              this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new s2.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
            }
            resize(e3, t3) {
              const i3 = this.getNullCell(r.DEFAULT_ATTR_DATA), s3 = this._getCorrectBufferLength(t3);
              if (s3 > this.lines.maxLength && (this.lines.maxLength = s3), this.lines.length > 0) {
                if (this._cols < e3)
                  for (let t4 = 0; t4 < this.lines.length; t4++)
                    this.lines.get(t4).resize(e3, i3);
                let n2 = 0;
                if (this._rows < t3)
                  for (let s4 = this._rows; s4 < t3; s4++)
                    this.lines.length < t3 + this.ybase && (this._optionsService.rawOptions.windowsMode ? this.lines.push(new r.BufferLine(e3, i3)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + n2 + 1 ? (this.ybase--, n2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new r.BufferLine(e3, i3)));
                else
                  for (let e4 = this._rows; e4 > t3; e4--)
                    this.lines.length > t3 + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
                if (s3 < this.lines.maxLength) {
                  const e4 = this.lines.length - s3;
                  e4 > 0 && (this.lines.trimStart(e4), this.ybase = Math.max(this.ybase - e4, 0), this.ydisp = Math.max(this.ydisp - e4, 0), this.savedY = Math.max(this.savedY - e4, 0)), this.lines.maxLength = s3;
                }
                this.x = Math.min(this.x, e3 - 1), this.y = Math.min(this.y, t3 - 1), n2 && (this.y += n2), this.savedX = Math.min(this.savedX, e3 - 1), this.scrollTop = 0;
              }
              if (this.scrollBottom = t3 - 1, this._isReflowEnabled && (this._reflow(e3, t3), this._cols > e3))
                for (let t4 = 0; t4 < this.lines.length; t4++)
                  this.lines.get(t4).resize(e3, i3);
              this._cols = e3, this._rows = t3;
            }
            get _isReflowEnabled() {
              return this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
            }
            _reflow(e3, t3) {
              this._cols !== e3 && (e3 > this._cols ? this._reflowLarger(e3, t3) : this._reflowSmaller(e3, t3));
            }
            _reflowLarger(e3, t3) {
              const i3 = (0, a.reflowLargerGetLinesToRemove)(this.lines, this._cols, e3, this.ybase + this.y, this.getNullCell(r.DEFAULT_ATTR_DATA));
              if (i3.length > 0) {
                const s3 = (0, a.reflowLargerCreateNewLayout)(this.lines, i3);
                (0, a.reflowLargerApplyNewLayout)(this.lines, s3.layout), this._reflowLargerAdjustViewport(e3, t3, s3.countRemoved);
              }
            }
            _reflowLargerAdjustViewport(e3, t3, i3) {
              const s3 = this.getNullCell(r.DEFAULT_ATTR_DATA);
              let n2 = i3;
              for (; n2-- > 0; )
                0 === this.ybase ? (this.y > 0 && this.y--, this.lines.length < t3 && this.lines.push(new r.BufferLine(e3, s3))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
              this.savedY = Math.max(this.savedY - i3, 0);
            }
            _reflowSmaller(e3, t3) {
              const i3 = this.getNullCell(r.DEFAULT_ATTR_DATA), s3 = [];
              let n2 = 0;
              for (let o2 = this.lines.length - 1; o2 >= 0; o2--) {
                let h3 = this.lines.get(o2);
                if (!h3 || !h3.isWrapped && h3.getTrimmedLength() <= e3)
                  continue;
                const c2 = [h3];
                for (; h3.isWrapped && o2 > 0; )
                  h3 = this.lines.get(--o2), c2.unshift(h3);
                const l2 = this.ybase + this.y;
                if (l2 >= o2 && l2 < o2 + c2.length)
                  continue;
                const d2 = c2[c2.length - 1].getTrimmedLength(), _ = (0, a.reflowSmallerGetNewLineLengths)(c2, this._cols, e3), u = _.length - c2.length;
                let f;
                f = 0 === this.ybase && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + u) : Math.max(0, this.lines.length - this.lines.maxLength + u);
                const v = [];
                for (let e4 = 0; e4 < u; e4++) {
                  const e5 = this.getBlankLine(r.DEFAULT_ATTR_DATA, true);
                  v.push(e5);
                }
                v.length > 0 && (s3.push({ start: o2 + c2.length + n2, newLines: v }), n2 += v.length), c2.push(...v);
                let g = _.length - 1, p2 = _[g];
                0 === p2 && (g--, p2 = _[g]);
                let S = c2.length - u - 1, m3 = d2;
                for (; S >= 0; ) {
                  const e4 = Math.min(m3, p2);
                  if (void 0 === c2[g])
                    break;
                  if (c2[g].copyCellsFrom(c2[S], m3 - e4, p2 - e4, e4, true), p2 -= e4, 0 === p2 && (g--, p2 = _[g]), m3 -= e4, 0 === m3) {
                    S--;
                    const e5 = Math.max(S, 0);
                    m3 = (0, a.getWrappedLineTrimmedLength)(c2, e5, this._cols);
                  }
                }
                for (let t4 = 0; t4 < c2.length; t4++)
                  _[t4] < e3 && c2[t4].setCell(_[t4], i3);
                let C = u - f;
                for (; C-- > 0; )
                  0 === this.ybase ? this.y < t3 - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + n2) - t3 && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
                this.savedY = Math.min(this.savedY + u, this.ybase + t3 - 1);
              }
              if (s3.length > 0) {
                const e4 = [], t4 = [];
                for (let e5 = 0; e5 < this.lines.length; e5++)
                  t4.push(this.lines.get(e5));
                const i4 = this.lines.length;
                let r2 = i4 - 1, o2 = 0, a2 = s3[o2];
                this.lines.length = Math.min(this.lines.maxLength, this.lines.length + n2);
                let h3 = 0;
                for (let c3 = Math.min(this.lines.maxLength - 1, i4 + n2 - 1); c3 >= 0; c3--)
                  if (a2 && a2.start > r2 + h3) {
                    for (let e5 = a2.newLines.length - 1; e5 >= 0; e5--)
                      this.lines.set(c3--, a2.newLines[e5]);
                    c3++, e4.push({ index: r2 + 1, amount: a2.newLines.length }), h3 += a2.newLines.length, a2 = s3[++o2];
                  } else
                    this.lines.set(c3, t4[r2--]);
                let c2 = 0;
                for (let t5 = e4.length - 1; t5 >= 0; t5--)
                  e4[t5].index += c2, this.lines.onInsertEmitter.fire(e4[t5]), c2 += e4[t5].amount;
                const l2 = Math.max(0, i4 + n2 - this.lines.maxLength);
                l2 > 0 && this.lines.onTrimEmitter.fire(l2);
              }
            }
            stringIndexToBufferIndex(e3, t3, i3 = false) {
              for (; t3; ) {
                const s3 = this.lines.get(e3);
                if (!s3)
                  return [-1, -1];
                const r2 = i3 ? s3.getTrimmedLength() : s3.length;
                for (let i4 = 0; i4 < r2; ++i4)
                  if (s3.get(i4)[o.CHAR_DATA_WIDTH_INDEX] && (t3 -= s3.get(i4)[o.CHAR_DATA_CHAR_INDEX].length || 1), t3 < 0)
                    return [e3, i4];
                e3++;
              }
              return [e3, 0];
            }
            translateBufferLineToString(e3, t3, i3 = 0, s3) {
              const r2 = this.lines.get(e3);
              return r2 ? r2.translateToString(t3, i3, s3) : "";
            }
            getWrappedRangeForLine(e3) {
              let t3 = e3, i3 = e3;
              for (; t3 > 0 && this.lines.get(t3).isWrapped; )
                t3--;
              for (; i3 + 1 < this.lines.length && this.lines.get(i3 + 1).isWrapped; )
                i3++;
              return { first: t3, last: i3 };
            }
            setupTabStops(e3) {
              for (null != e3 ? this.tabs[e3] || (e3 = this.prevStop(e3)) : (this.tabs = {}, e3 = 0); e3 < this._cols; e3 += this._optionsService.rawOptions.tabStopWidth)
                this.tabs[e3] = true;
            }
            prevStop(e3) {
              for (null == e3 && (e3 = this.x); !this.tabs[--e3] && e3 > 0; )
                ;
              return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
            }
            nextStop(e3) {
              for (null == e3 && (e3 = this.x); !this.tabs[++e3] && e3 < this._cols; )
                ;
              return e3 >= this._cols ? this._cols - 1 : e3 < 0 ? 0 : e3;
            }
            clearMarkers(e3) {
              this._isClearing = true;
              for (let t3 = 0; t3 < this.markers.length; t3++)
                this.markers[t3].line === e3 && (this.markers[t3].dispose(), this.markers.splice(t3--, 1));
              this._isClearing = false;
            }
            clearAllMarkers() {
              this._isClearing = true;
              for (let e3 = 0; e3 < this.markers.length; e3++)
                this.markers[e3].dispose(), this.markers.splice(e3--, 1);
              this._isClearing = false;
            }
            addMarker(e3) {
              const t3 = new h2.Marker(e3);
              return this.markers.push(t3), t3.register(this.lines.onTrim((e4) => {
                t3.line -= e4, t3.line < 0 && t3.dispose();
              })), t3.register(this.lines.onInsert((e4) => {
                t3.line >= e4.index && (t3.line += e4.amount);
              })), t3.register(this.lines.onDelete((e4) => {
                t3.line >= e4.index && t3.line < e4.index + e4.amount && t3.dispose(), t3.line > e4.index && (t3.line -= e4.amount);
              })), t3.register(t3.onDispose(() => this._removeMarker(t3))), t3;
            }
            _removeMarker(e3) {
              this._isClearing || this.markers.splice(this.markers.indexOf(e3), 1);
            }
            iterator(e3, t3, i3, s3, r2) {
              return new d(this, e3, t3, i3, s3, r2);
            }
          };
          class d {
            constructor(e3, t3, i3 = 0, s3 = e3.lines.length, r2 = 0, n2 = 0) {
              this._buffer = e3, this._trimRight = t3, this._startIndex = i3, this._endIndex = s3, this._startOverscan = r2, this._endOverscan = n2, this._startIndex < 0 && (this._startIndex = 0), this._endIndex > this._buffer.lines.length && (this._endIndex = this._buffer.lines.length), this._current = this._startIndex;
            }
            hasNext() {
              return this._current < this._endIndex;
            }
            next() {
              const e3 = this._buffer.getWrappedRangeForLine(this._current);
              e3.first < this._startIndex - this._startOverscan && (e3.first = this._startIndex - this._startOverscan), e3.last > this._endIndex + this._endOverscan && (e3.last = this._endIndex + this._endOverscan), e3.first = Math.max(e3.first, 0), e3.last = Math.min(e3.last, this._buffer.lines.length);
              let t3 = "";
              for (let i3 = e3.first; i3 <= e3.last; ++i3)
                t3 += this._buffer.translateBufferLineToString(i3, this._trimRight);
              return this._current = e3.last + 1, { range: e3, content: t3 };
            }
          }
          t2.BufferStringIterator = d;
        }, 8437: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferLine = t2.DEFAULT_ATTR_DATA = void 0;
          const s2 = i2(482), r = i2(643), n = i2(511), o = i2(3734);
          t2.DEFAULT_ATTR_DATA = Object.freeze(new o.AttributeData());
          const a = { startIndex: 0 };
          class h2 {
            constructor(e3, t3, i3 = false) {
              this.isWrapped = i3, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * e3);
              const s3 = t3 || n.CellData.fromCharData([0, r.NULL_CELL_CHAR, r.NULL_CELL_WIDTH, r.NULL_CELL_CODE]);
              for (let t4 = 0; t4 < e3; ++t4)
                this.setCell(t4, s3);
              this.length = e3;
            }
            get(e3) {
              const t3 = this._data[3 * e3 + 0], i3 = 2097151 & t3;
              return [this._data[3 * e3 + 1], 2097152 & t3 ? this._combined[e3] : i3 ? (0, s2.stringFromCodePoint)(i3) : "", t3 >> 22, 2097152 & t3 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : i3];
            }
            set(e3, t3) {
              this._data[3 * e3 + 1] = t3[r.CHAR_DATA_ATTR_INDEX], t3[r.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[e3] = t3[1], this._data[3 * e3 + 0] = 2097152 | e3 | t3[r.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * e3 + 0] = t3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | t3[r.CHAR_DATA_WIDTH_INDEX] << 22;
            }
            getWidth(e3) {
              return this._data[3 * e3 + 0] >> 22;
            }
            hasWidth(e3) {
              return 12582912 & this._data[3 * e3 + 0];
            }
            getFg(e3) {
              return this._data[3 * e3 + 1];
            }
            getBg(e3) {
              return this._data[3 * e3 + 2];
            }
            hasContent(e3) {
              return 4194303 & this._data[3 * e3 + 0];
            }
            getCodePoint(e3) {
              const t3 = this._data[3 * e3 + 0];
              return 2097152 & t3 ? this._combined[e3].charCodeAt(this._combined[e3].length - 1) : 2097151 & t3;
            }
            isCombined(e3) {
              return 2097152 & this._data[3 * e3 + 0];
            }
            getString(e3) {
              const t3 = this._data[3 * e3 + 0];
              return 2097152 & t3 ? this._combined[e3] : 2097151 & t3 ? (0, s2.stringFromCodePoint)(2097151 & t3) : "";
            }
            isProtected(e3) {
              return 536870912 & this._data[3 * e3 + 2];
            }
            loadCell(e3, t3) {
              return a.startIndex = 3 * e3, t3.content = this._data[a.startIndex + 0], t3.fg = this._data[a.startIndex + 1], t3.bg = this._data[a.startIndex + 2], 2097152 & t3.content && (t3.combinedData = this._combined[e3]), 268435456 & t3.bg && (t3.extended = this._extendedAttrs[e3]), t3;
            }
            setCell(e3, t3) {
              2097152 & t3.content && (this._combined[e3] = t3.combinedData), 268435456 & t3.bg && (this._extendedAttrs[e3] = t3.extended), this._data[3 * e3 + 0] = t3.content, this._data[3 * e3 + 1] = t3.fg, this._data[3 * e3 + 2] = t3.bg;
            }
            setCellFromCodePoint(e3, t3, i3, s3, r2, n2) {
              268435456 & r2 && (this._extendedAttrs[e3] = n2), this._data[3 * e3 + 0] = t3 | i3 << 22, this._data[3 * e3 + 1] = s3, this._data[3 * e3 + 2] = r2;
            }
            addCodepointToCell(e3, t3) {
              let i3 = this._data[3 * e3 + 0];
              2097152 & i3 ? this._combined[e3] += (0, s2.stringFromCodePoint)(t3) : (2097151 & i3 ? (this._combined[e3] = (0, s2.stringFromCodePoint)(2097151 & i3) + (0, s2.stringFromCodePoint)(t3), i3 &= -2097152, i3 |= 2097152) : i3 = t3 | 1 << 22, this._data[3 * e3 + 0] = i3);
            }
            insertCells(e3, t3, i3, s3) {
              if ((e3 %= this.length) && 2 === this.getWidth(e3 - 1) && this.setCellFromCodePoint(e3 - 1, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs()), t3 < this.length - e3) {
                const s4 = new n.CellData();
                for (let i4 = this.length - e3 - t3 - 1; i4 >= 0; --i4)
                  this.setCell(e3 + t3 + i4, this.loadCell(e3 + i4, s4));
                for (let s5 = 0; s5 < t3; ++s5)
                  this.setCell(e3 + s5, i3);
              } else
                for (let t4 = e3; t4 < this.length; ++t4)
                  this.setCell(t4, i3);
              2 === this.getWidth(this.length - 1) && this.setCellFromCodePoint(this.length - 1, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs());
            }
            deleteCells(e3, t3, i3, s3) {
              if (e3 %= this.length, t3 < this.length - e3) {
                const s4 = new n.CellData();
                for (let i4 = 0; i4 < this.length - e3 - t3; ++i4)
                  this.setCell(e3 + i4, this.loadCell(e3 + t3 + i4, s4));
                for (let e4 = this.length - t3; e4 < this.length; ++e4)
                  this.setCell(e4, i3);
              } else
                for (let t4 = e3; t4 < this.length; ++t4)
                  this.setCell(t4, i3);
              e3 && 2 === this.getWidth(e3 - 1) && this.setCellFromCodePoint(e3 - 1, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs()), 0 !== this.getWidth(e3) || this.hasContent(e3) || this.setCellFromCodePoint(e3, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs());
            }
            replaceCells(e3, t3, i3, s3, r2 = false) {
              if (r2)
                for (e3 && 2 === this.getWidth(e3 - 1) && !this.isProtected(e3 - 1) && this.setCellFromCodePoint(e3 - 1, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs()), t3 < this.length && 2 === this.getWidth(t3 - 1) && !this.isProtected(t3) && this.setCellFromCodePoint(t3, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs()); e3 < t3 && e3 < this.length; )
                  this.isProtected(e3) || this.setCell(e3, i3), e3++;
              else
                for (e3 && 2 === this.getWidth(e3 - 1) && this.setCellFromCodePoint(e3 - 1, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs()), t3 < this.length && 2 === this.getWidth(t3 - 1) && this.setCellFromCodePoint(t3, 0, 1, (null == s3 ? void 0 : s3.fg) || 0, (null == s3 ? void 0 : s3.bg) || 0, (null == s3 ? void 0 : s3.extended) || new o.ExtendedAttrs()); e3 < t3 && e3 < this.length; )
                  this.setCell(e3++, i3);
            }
            resize(e3, t3) {
              if (e3 !== this.length) {
                if (e3 > this.length) {
                  const i3 = new Uint32Array(3 * e3);
                  this.length && (3 * e3 < this._data.length ? i3.set(this._data.subarray(0, 3 * e3)) : i3.set(this._data)), this._data = i3;
                  for (let i4 = this.length; i4 < e3; ++i4)
                    this.setCell(i4, t3);
                } else if (e3) {
                  const t4 = new Uint32Array(3 * e3);
                  t4.set(this._data.subarray(0, 3 * e3)), this._data = t4;
                  const i3 = Object.keys(this._combined);
                  for (let t5 = 0; t5 < i3.length; t5++) {
                    const s3 = parseInt(i3[t5], 10);
                    s3 >= e3 && delete this._combined[s3];
                  }
                } else
                  this._data = new Uint32Array(0), this._combined = {};
                this.length = e3;
              }
            }
            fill(e3, t3 = false) {
              if (t3)
                for (let t4 = 0; t4 < this.length; ++t4)
                  this.isProtected(t4) || this.setCell(t4, e3);
              else {
                this._combined = {}, this._extendedAttrs = {};
                for (let t4 = 0; t4 < this.length; ++t4)
                  this.setCell(t4, e3);
              }
            }
            copyFrom(e3) {
              this.length !== e3.length ? this._data = new Uint32Array(e3._data) : this._data.set(e3._data), this.length = e3.length, this._combined = {};
              for (const t3 in e3._combined)
                this._combined[t3] = e3._combined[t3];
              this._extendedAttrs = {};
              for (const t3 in e3._extendedAttrs)
                this._extendedAttrs[t3] = e3._extendedAttrs[t3];
              this.isWrapped = e3.isWrapped;
            }
            clone() {
              const e3 = new h2(0);
              e3._data = new Uint32Array(this._data), e3.length = this.length;
              for (const t3 in this._combined)
                e3._combined[t3] = this._combined[t3];
              for (const t3 in this._extendedAttrs)
                e3._extendedAttrs[t3] = this._extendedAttrs[t3];
              return e3.isWrapped = this.isWrapped, e3;
            }
            getTrimmedLength() {
              for (let e3 = this.length - 1; e3 >= 0; --e3)
                if (4194303 & this._data[3 * e3 + 0])
                  return e3 + (this._data[3 * e3 + 0] >> 22);
              return 0;
            }
            copyCellsFrom(e3, t3, i3, s3, r2) {
              const n2 = e3._data;
              if (r2)
                for (let r3 = s3 - 1; r3 >= 0; r3--) {
                  for (let e4 = 0; e4 < 3; e4++)
                    this._data[3 * (i3 + r3) + e4] = n2[3 * (t3 + r3) + e4];
                  268435456 & n2[3 * (t3 + r3) + 2] && (this._extendedAttrs[i3 + r3] = e3._extendedAttrs[t3 + r3]);
                }
              else
                for (let r3 = 0; r3 < s3; r3++) {
                  for (let e4 = 0; e4 < 3; e4++)
                    this._data[3 * (i3 + r3) + e4] = n2[3 * (t3 + r3) + e4];
                  268435456 & n2[3 * (t3 + r3) + 2] && (this._extendedAttrs[i3 + r3] = e3._extendedAttrs[t3 + r3]);
                }
              const o2 = Object.keys(e3._combined);
              for (let s4 = 0; s4 < o2.length; s4++) {
                const r3 = parseInt(o2[s4], 10);
                r3 >= t3 && (this._combined[r3 - t3 + i3] = e3._combined[r3]);
              }
            }
            translateToString(e3 = false, t3 = 0, i3 = this.length) {
              e3 && (i3 = Math.min(i3, this.getTrimmedLength()));
              let n2 = "";
              for (; t3 < i3; ) {
                const e4 = this._data[3 * t3 + 0], i4 = 2097151 & e4;
                n2 += 2097152 & e4 ? this._combined[t3] : i4 ? (0, s2.stringFromCodePoint)(i4) : r.WHITESPACE_CELL_CHAR, t3 += e4 >> 22 || 1;
              }
              return n2;
            }
          }
          t2.BufferLine = h2;
        }, 4841: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getRangeLength = void 0, t2.getRangeLength = function(e3, t3) {
            if (e3.start.y > e3.end.y)
              throw new Error(`Buffer range end (${e3.end.x}, ${e3.end.y}) cannot be before start (${e3.start.x}, ${e3.start.y})`);
            return t3 * (e3.end.y - e3.start.y) + (e3.end.x - e3.start.x + 1);
          };
        }, 4634: (e2, t2) => {
          function i2(e3, t3, i3) {
            if (t3 === e3.length - 1)
              return e3[t3].getTrimmedLength();
            const s2 = !e3[t3].hasContent(i3 - 1) && 1 === e3[t3].getWidth(i3 - 1), r = 2 === e3[t3 + 1].getWidth(0);
            return s2 && r ? i3 - 1 : i3;
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getWrappedLineTrimmedLength = t2.reflowSmallerGetNewLineLengths = t2.reflowLargerApplyNewLayout = t2.reflowLargerCreateNewLayout = t2.reflowLargerGetLinesToRemove = void 0, t2.reflowLargerGetLinesToRemove = function(e3, t3, s2, r, n) {
            const o = [];
            for (let a = 0; a < e3.length - 1; a++) {
              let h2 = a, c = e3.get(++h2);
              if (!c.isWrapped)
                continue;
              const l = [e3.get(a)];
              for (; h2 < e3.length && c.isWrapped; )
                l.push(c), c = e3.get(++h2);
              if (r >= a && r < h2) {
                a += l.length - 1;
                continue;
              }
              let d = 0, _ = i2(l, d, t3), u = 1, f = 0;
              for (; u < l.length; ) {
                const e4 = i2(l, u, t3), r2 = e4 - f, o2 = s2 - _, a2 = Math.min(r2, o2);
                l[d].copyCellsFrom(l[u], f, _, a2, false), _ += a2, _ === s2 && (d++, _ = 0), f += a2, f === e4 && (u++, f = 0), 0 === _ && 0 !== d && 2 === l[d - 1].getWidth(s2 - 1) && (l[d].copyCellsFrom(l[d - 1], s2 - 1, _++, 1, false), l[d - 1].setCell(s2 - 1, n));
              }
              l[d].replaceCells(_, s2, n);
              let v = 0;
              for (let e4 = l.length - 1; e4 > 0 && (e4 > d || 0 === l[e4].getTrimmedLength()); e4--)
                v++;
              v > 0 && (o.push(a + l.length - v), o.push(v)), a += l.length - 1;
            }
            return o;
          }, t2.reflowLargerCreateNewLayout = function(e3, t3) {
            const i3 = [];
            let s2 = 0, r = t3[s2], n = 0;
            for (let o = 0; o < e3.length; o++)
              if (r === o) {
                const i4 = t3[++s2];
                e3.onDeleteEmitter.fire({ index: o - n, amount: i4 }), o += i4 - 1, n += i4, r = t3[++s2];
              } else
                i3.push(o);
            return { layout: i3, countRemoved: n };
          }, t2.reflowLargerApplyNewLayout = function(e3, t3) {
            const i3 = [];
            for (let s2 = 0; s2 < t3.length; s2++)
              i3.push(e3.get(t3[s2]));
            for (let t4 = 0; t4 < i3.length; t4++)
              e3.set(t4, i3[t4]);
            e3.length = t3.length;
          }, t2.reflowSmallerGetNewLineLengths = function(e3, t3, s2) {
            const r = [], n = e3.map((s3, r2) => i2(e3, r2, t3)).reduce((e4, t4) => e4 + t4);
            let o = 0, a = 0, h2 = 0;
            for (; h2 < n; ) {
              if (n - h2 < s2) {
                r.push(n - h2);
                break;
              }
              o += s2;
              const c = i2(e3, a, t3);
              o > c && (o -= c, a++);
              const l = 2 === e3[a].getWidth(o - 1);
              l && o--;
              const d = l ? s2 - 1 : s2;
              r.push(d), h2 += d;
            }
            return r;
          }, t2.getWrappedLineTrimmedLength = i2;
        }, 5295: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferSet = void 0;
          const s2 = i2(9092), r = i2(8460), n = i2(844);
          class o extends n.Disposable {
            constructor(e3, t3) {
              super(), this._optionsService = e3, this._bufferService = t3, this._onBufferActivate = this.register(new r.EventEmitter()), this.reset();
            }
            get onBufferActivate() {
              return this._onBufferActivate.event;
            }
            reset() {
              this._normal = new s2.Buffer(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new s2.Buffer(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
            }
            get alt() {
              return this._alt;
            }
            get active() {
              return this._activeBuffer;
            }
            get normal() {
              return this._normal;
            }
            activateNormalBuffer() {
              this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
            }
            activateAltBuffer(e3) {
              this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e3), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
            }
            resize(e3, t3) {
              this._normal.resize(e3, t3), this._alt.resize(e3, t3);
            }
            setupTabStops(e3) {
              this._normal.setupTabStops(e3), this._alt.setupTabStops(e3);
            }
          }
          t2.BufferSet = o;
        }, 511: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CellData = void 0;
          const s2 = i2(482), r = i2(643), n = i2(3734);
          class o extends n.AttributeData {
            constructor() {
              super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs(), this.combinedData = "";
            }
            static fromCharData(e3) {
              const t3 = new o();
              return t3.setFromCharData(e3), t3;
            }
            isCombined() {
              return 2097152 & this.content;
            }
            getWidth() {
              return this.content >> 22;
            }
            getChars() {
              return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, s2.stringFromCodePoint)(2097151 & this.content) : "";
            }
            getCode() {
              return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
            }
            setFromCharData(e3) {
              this.fg = e3[r.CHAR_DATA_ATTR_INDEX], this.bg = 0;
              let t3 = false;
              if (e3[r.CHAR_DATA_CHAR_INDEX].length > 2)
                t3 = true;
              else if (2 === e3[r.CHAR_DATA_CHAR_INDEX].length) {
                const i3 = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
                if (55296 <= i3 && i3 <= 56319) {
                  const s3 = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                  56320 <= s3 && s3 <= 57343 ? this.content = 1024 * (i3 - 55296) + s3 - 56320 + 65536 | e3[r.CHAR_DATA_WIDTH_INDEX] << 22 : t3 = true;
                } else
                  t3 = true;
              } else
                this.content = e3[r.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | e3[r.CHAR_DATA_WIDTH_INDEX] << 22;
              t3 && (this.combinedData = e3[r.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | e3[r.CHAR_DATA_WIDTH_INDEX] << 22);
            }
            getAsCharData() {
              return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
            }
          }
          t2.CellData = o;
        }, 643: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.WHITESPACE_CELL_CODE = t2.WHITESPACE_CELL_WIDTH = t2.WHITESPACE_CELL_CHAR = t2.NULL_CELL_CODE = t2.NULL_CELL_WIDTH = t2.NULL_CELL_CHAR = t2.CHAR_DATA_CODE_INDEX = t2.CHAR_DATA_WIDTH_INDEX = t2.CHAR_DATA_CHAR_INDEX = t2.CHAR_DATA_ATTR_INDEX = t2.DEFAULT_EXT = t2.DEFAULT_ATTR = t2.DEFAULT_COLOR = void 0, t2.DEFAULT_COLOR = 256, t2.DEFAULT_ATTR = 256 | t2.DEFAULT_COLOR << 9, t2.DEFAULT_EXT = 0, t2.CHAR_DATA_ATTR_INDEX = 0, t2.CHAR_DATA_CHAR_INDEX = 1, t2.CHAR_DATA_WIDTH_INDEX = 2, t2.CHAR_DATA_CODE_INDEX = 3, t2.NULL_CELL_CHAR = "", t2.NULL_CELL_WIDTH = 1, t2.NULL_CELL_CODE = 0, t2.WHITESPACE_CELL_CHAR = " ", t2.WHITESPACE_CELL_WIDTH = 1, t2.WHITESPACE_CELL_CODE = 32;
        }, 4863: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.Marker = void 0;
          const s2 = i2(8460), r = i2(844);
          class n extends r.Disposable {
            constructor(e3) {
              super(), this.line = e3, this._id = n._nextId++, this.isDisposed = false, this._onDispose = new s2.EventEmitter();
            }
            get id() {
              return this._id;
            }
            get onDispose() {
              return this._onDispose.event;
            }
            dispose() {
              this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), super.dispose());
            }
          }
          t2.Marker = n, n._nextId = 1;
        }, 7116: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DEFAULT_CHARSET = t2.CHARSETS = void 0, t2.CHARSETS = {}, t2.DEFAULT_CHARSET = t2.CHARSETS.B, t2.CHARSETS[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" }, t2.CHARSETS.A = { "#": "\xA3" }, t2.CHARSETS.B = void 0, t2.CHARSETS[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" }, t2.CHARSETS.C = t2.CHARSETS[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" }, t2.CHARSETS.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" }, t2.CHARSETS.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" }, t2.CHARSETS.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" }, t2.CHARSETS.E = t2.CHARSETS[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" }, t2.CHARSETS.H = t2.CHARSETS[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, t2.CHARSETS["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
        }, 2584: (e2, t2) => {
          var i2, s2;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.C1_ESCAPED = t2.C1 = t2.C0 = void 0, function(e3) {
            e3.NUL = "\0", e3.SOH = "", e3.STX = "", e3.ETX = "", e3.EOT = "", e3.ENQ = "", e3.ACK = "", e3.BEL = "\x07", e3.BS = "\b", e3.HT = "	", e3.LF = "\n", e3.VT = "\v", e3.FF = "\f", e3.CR = "\r", e3.SO = "", e3.SI = "", e3.DLE = "", e3.DC1 = "", e3.DC2 = "", e3.DC3 = "", e3.DC4 = "", e3.NAK = "", e3.SYN = "", e3.ETB = "", e3.CAN = "", e3.EM = "", e3.SUB = "", e3.ESC = "\x1B", e3.FS = "", e3.GS = "", e3.RS = "", e3.US = "", e3.SP = " ", e3.DEL = "\x7F";
          }(i2 = t2.C0 || (t2.C0 = {})), (s2 = t2.C1 || (t2.C1 = {})).PAD = "\x80", s2.HOP = "\x81", s2.BPH = "\x82", s2.NBH = "\x83", s2.IND = "\x84", s2.NEL = "\x85", s2.SSA = "\x86", s2.ESA = "\x87", s2.HTS = "\x88", s2.HTJ = "\x89", s2.VTS = "\x8A", s2.PLD = "\x8B", s2.PLU = "\x8C", s2.RI = "\x8D", s2.SS2 = "\x8E", s2.SS3 = "\x8F", s2.DCS = "\x90", s2.PU1 = "\x91", s2.PU2 = "\x92", s2.STS = "\x93", s2.CCH = "\x94", s2.MW = "\x95", s2.SPA = "\x96", s2.EPA = "\x97", s2.SOS = "\x98", s2.SGCI = "\x99", s2.SCI = "\x9A", s2.CSI = "\x9B", s2.ST = "\x9C", s2.OSC = "\x9D", s2.PM = "\x9E", s2.APC = "\x9F", (t2.C1_ESCAPED || (t2.C1_ESCAPED = {})).ST = `${i2.ESC}\\`;
        }, 7399: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.evaluateKeyboardEvent = void 0;
          const s2 = i2(2584), r = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
          t2.evaluateKeyboardEvent = function(e3, t3, i3, n) {
            const o = { type: 0, cancel: false, key: void 0 }, a = (e3.shiftKey ? 1 : 0) | (e3.altKey ? 2 : 0) | (e3.ctrlKey ? 4 : 0) | (e3.metaKey ? 8 : 0);
            switch (e3.keyCode) {
              case 0:
                "UIKeyInputUpArrow" === e3.key ? o.key = t3 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A" : "UIKeyInputLeftArrow" === e3.key ? o.key = t3 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D" : "UIKeyInputRightArrow" === e3.key ? o.key = t3 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C" : "UIKeyInputDownArrow" === e3.key && (o.key = t3 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B");
                break;
              case 8:
                if (e3.altKey) {
                  o.key = s2.C0.ESC + s2.C0.DEL;
                  break;
                }
                o.key = s2.C0.DEL;
                break;
              case 9:
                if (e3.shiftKey) {
                  o.key = s2.C0.ESC + "[Z";
                  break;
                }
                o.key = s2.C0.HT, o.cancel = true;
                break;
              case 13:
                o.key = e3.altKey ? s2.C0.ESC + s2.C0.CR : s2.C0.CR, o.cancel = true;
                break;
              case 27:
                o.key = s2.C0.ESC, e3.altKey && (o.key = s2.C0.ESC + s2.C0.ESC), o.cancel = true;
                break;
              case 37:
                if (e3.metaKey)
                  break;
                a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "D", o.key === s2.C0.ESC + "[1;3D" && (o.key = s2.C0.ESC + (i3 ? "b" : "[1;5D"))) : o.key = t3 ? s2.C0.ESC + "OD" : s2.C0.ESC + "[D";
                break;
              case 39:
                if (e3.metaKey)
                  break;
                a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "C", o.key === s2.C0.ESC + "[1;3C" && (o.key = s2.C0.ESC + (i3 ? "f" : "[1;5C"))) : o.key = t3 ? s2.C0.ESC + "OC" : s2.C0.ESC + "[C";
                break;
              case 38:
                if (e3.metaKey)
                  break;
                a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "A", i3 || o.key !== s2.C0.ESC + "[1;3A" || (o.key = s2.C0.ESC + "[1;5A")) : o.key = t3 ? s2.C0.ESC + "OA" : s2.C0.ESC + "[A";
                break;
              case 40:
                if (e3.metaKey)
                  break;
                a ? (o.key = s2.C0.ESC + "[1;" + (a + 1) + "B", i3 || o.key !== s2.C0.ESC + "[1;3B" || (o.key = s2.C0.ESC + "[1;5B")) : o.key = t3 ? s2.C0.ESC + "OB" : s2.C0.ESC + "[B";
                break;
              case 45:
                e3.shiftKey || e3.ctrlKey || (o.key = s2.C0.ESC + "[2~");
                break;
              case 46:
                o.key = a ? s2.C0.ESC + "[3;" + (a + 1) + "~" : s2.C0.ESC + "[3~";
                break;
              case 36:
                o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "H" : t3 ? s2.C0.ESC + "OH" : s2.C0.ESC + "[H";
                break;
              case 35:
                o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "F" : t3 ? s2.C0.ESC + "OF" : s2.C0.ESC + "[F";
                break;
              case 33:
                e3.shiftKey ? o.type = 2 : e3.ctrlKey ? o.key = s2.C0.ESC + "[5;" + (a + 1) + "~" : o.key = s2.C0.ESC + "[5~";
                break;
              case 34:
                e3.shiftKey ? o.type = 3 : e3.ctrlKey ? o.key = s2.C0.ESC + "[6;" + (a + 1) + "~" : o.key = s2.C0.ESC + "[6~";
                break;
              case 112:
                o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "P" : s2.C0.ESC + "OP";
                break;
              case 113:
                o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "Q" : s2.C0.ESC + "OQ";
                break;
              case 114:
                o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "R" : s2.C0.ESC + "OR";
                break;
              case 115:
                o.key = a ? s2.C0.ESC + "[1;" + (a + 1) + "S" : s2.C0.ESC + "OS";
                break;
              case 116:
                o.key = a ? s2.C0.ESC + "[15;" + (a + 1) + "~" : s2.C0.ESC + "[15~";
                break;
              case 117:
                o.key = a ? s2.C0.ESC + "[17;" + (a + 1) + "~" : s2.C0.ESC + "[17~";
                break;
              case 118:
                o.key = a ? s2.C0.ESC + "[18;" + (a + 1) + "~" : s2.C0.ESC + "[18~";
                break;
              case 119:
                o.key = a ? s2.C0.ESC + "[19;" + (a + 1) + "~" : s2.C0.ESC + "[19~";
                break;
              case 120:
                o.key = a ? s2.C0.ESC + "[20;" + (a + 1) + "~" : s2.C0.ESC + "[20~";
                break;
              case 121:
                o.key = a ? s2.C0.ESC + "[21;" + (a + 1) + "~" : s2.C0.ESC + "[21~";
                break;
              case 122:
                o.key = a ? s2.C0.ESC + "[23;" + (a + 1) + "~" : s2.C0.ESC + "[23~";
                break;
              case 123:
                o.key = a ? s2.C0.ESC + "[24;" + (a + 1) + "~" : s2.C0.ESC + "[24~";
                break;
              default:
                if (!e3.ctrlKey || e3.shiftKey || e3.altKey || e3.metaKey)
                  if (i3 && !n || !e3.altKey || e3.metaKey)
                    !i3 || e3.altKey || e3.ctrlKey || e3.shiftKey || !e3.metaKey ? e3.key && !e3.ctrlKey && !e3.altKey && !e3.metaKey && e3.keyCode >= 48 && 1 === e3.key.length ? o.key = e3.key : e3.key && e3.ctrlKey && ("_" === e3.key && (o.key = s2.C0.US), "@" === e3.key && (o.key = s2.C0.NUL)) : 65 === e3.keyCode && (o.type = 1);
                  else {
                    const t4 = r[e3.keyCode], i4 = null == t4 ? void 0 : t4[e3.shiftKey ? 1 : 0];
                    if (i4)
                      o.key = s2.C0.ESC + i4;
                    else if (e3.keyCode >= 65 && e3.keyCode <= 90) {
                      const t5 = e3.ctrlKey ? e3.keyCode - 64 : e3.keyCode + 32;
                      let i5 = String.fromCharCode(t5);
                      e3.shiftKey && (i5 = i5.toUpperCase()), o.key = s2.C0.ESC + i5;
                    } else if ("Dead" === e3.key && e3.code.startsWith("Key")) {
                      let t5 = e3.code.slice(3, 4);
                      e3.shiftKey || (t5 = t5.toLowerCase()), o.key = s2.C0.ESC + t5, o.cancel = true;
                    }
                  }
                else
                  e3.keyCode >= 65 && e3.keyCode <= 90 ? o.key = String.fromCharCode(e3.keyCode - 64) : 32 === e3.keyCode ? o.key = s2.C0.NUL : e3.keyCode >= 51 && e3.keyCode <= 55 ? o.key = String.fromCharCode(e3.keyCode - 51 + 27) : 56 === e3.keyCode ? o.key = s2.C0.DEL : 219 === e3.keyCode ? o.key = s2.C0.ESC : 220 === e3.keyCode ? o.key = s2.C0.FS : 221 === e3.keyCode && (o.key = s2.C0.GS);
            }
            return o;
          };
        }, 482: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.Utf8ToUtf32 = t2.StringToUtf32 = t2.utf32ToString = t2.stringFromCodePoint = void 0, t2.stringFromCodePoint = function(e3) {
            return e3 > 65535 ? (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10)) + String.fromCharCode(e3 % 1024 + 56320)) : String.fromCharCode(e3);
          }, t2.utf32ToString = function(e3, t3 = 0, i2 = e3.length) {
            let s2 = "";
            for (let r = t3; r < i2; ++r) {
              let t4 = e3[r];
              t4 > 65535 ? (t4 -= 65536, s2 += String.fromCharCode(55296 + (t4 >> 10)) + String.fromCharCode(t4 % 1024 + 56320)) : s2 += String.fromCharCode(t4);
            }
            return s2;
          }, t2.StringToUtf32 = class {
            constructor() {
              this._interim = 0;
            }
            clear() {
              this._interim = 0;
            }
            decode(e3, t3) {
              const i2 = e3.length;
              if (!i2)
                return 0;
              let s2 = 0, r = 0;
              if (this._interim) {
                const i3 = e3.charCodeAt(r++);
                56320 <= i3 && i3 <= 57343 ? t3[s2++] = 1024 * (this._interim - 55296) + i3 - 56320 + 65536 : (t3[s2++] = this._interim, t3[s2++] = i3), this._interim = 0;
              }
              for (let n = r; n < i2; ++n) {
                const r2 = e3.charCodeAt(n);
                if (55296 <= r2 && r2 <= 56319) {
                  if (++n >= i2)
                    return this._interim = r2, s2;
                  const o = e3.charCodeAt(n);
                  56320 <= o && o <= 57343 ? t3[s2++] = 1024 * (r2 - 55296) + o - 56320 + 65536 : (t3[s2++] = r2, t3[s2++] = o);
                } else
                  65279 !== r2 && (t3[s2++] = r2);
              }
              return s2;
            }
          }, t2.Utf8ToUtf32 = class {
            constructor() {
              this.interim = new Uint8Array(3);
            }
            clear() {
              this.interim.fill(0);
            }
            decode(e3, t3) {
              const i2 = e3.length;
              if (!i2)
                return 0;
              let s2, r, n, o, a = 0, h2 = 0, c = 0;
              if (this.interim[0]) {
                let s3 = false, r2 = this.interim[0];
                r2 &= 192 == (224 & r2) ? 31 : 224 == (240 & r2) ? 15 : 7;
                let n2, o2 = 0;
                for (; (n2 = 63 & this.interim[++o2]) && o2 < 4; )
                  r2 <<= 6, r2 |= n2;
                const h3 = 192 == (224 & this.interim[0]) ? 2 : 224 == (240 & this.interim[0]) ? 3 : 4, l2 = h3 - o2;
                for (; c < l2; ) {
                  if (c >= i2)
                    return 0;
                  if (n2 = e3[c++], 128 != (192 & n2)) {
                    c--, s3 = true;
                    break;
                  }
                  this.interim[o2++] = n2, r2 <<= 6, r2 |= 63 & n2;
                }
                s3 || (2 === h3 ? r2 < 128 ? c-- : t3[a++] = r2 : 3 === h3 ? r2 < 2048 || r2 >= 55296 && r2 <= 57343 || 65279 === r2 || (t3[a++] = r2) : r2 < 65536 || r2 > 1114111 || (t3[a++] = r2)), this.interim.fill(0);
              }
              const l = i2 - 4;
              let d = c;
              for (; d < i2; ) {
                for (; !(!(d < l) || 128 & (s2 = e3[d]) || 128 & (r = e3[d + 1]) || 128 & (n = e3[d + 2]) || 128 & (o = e3[d + 3])); )
                  t3[a++] = s2, t3[a++] = r, t3[a++] = n, t3[a++] = o, d += 4;
                if (s2 = e3[d++], s2 < 128)
                  t3[a++] = s2;
                else if (192 == (224 & s2)) {
                  if (d >= i2)
                    return this.interim[0] = s2, a;
                  if (r = e3[d++], 128 != (192 & r)) {
                    d--;
                    continue;
                  }
                  if (h2 = (31 & s2) << 6 | 63 & r, h2 < 128) {
                    d--;
                    continue;
                  }
                  t3[a++] = h2;
                } else if (224 == (240 & s2)) {
                  if (d >= i2)
                    return this.interim[0] = s2, a;
                  if (r = e3[d++], 128 != (192 & r)) {
                    d--;
                    continue;
                  }
                  if (d >= i2)
                    return this.interim[0] = s2, this.interim[1] = r, a;
                  if (n = e3[d++], 128 != (192 & n)) {
                    d--;
                    continue;
                  }
                  if (h2 = (15 & s2) << 12 | (63 & r) << 6 | 63 & n, h2 < 2048 || h2 >= 55296 && h2 <= 57343 || 65279 === h2)
                    continue;
                  t3[a++] = h2;
                } else if (240 == (248 & s2)) {
                  if (d >= i2)
                    return this.interim[0] = s2, a;
                  if (r = e3[d++], 128 != (192 & r)) {
                    d--;
                    continue;
                  }
                  if (d >= i2)
                    return this.interim[0] = s2, this.interim[1] = r, a;
                  if (n = e3[d++], 128 != (192 & n)) {
                    d--;
                    continue;
                  }
                  if (d >= i2)
                    return this.interim[0] = s2, this.interim[1] = r, this.interim[2] = n, a;
                  if (o = e3[d++], 128 != (192 & o)) {
                    d--;
                    continue;
                  }
                  if (h2 = (7 & s2) << 18 | (63 & r) << 12 | (63 & n) << 6 | 63 & o, h2 < 65536 || h2 > 1114111)
                    continue;
                  t3[a++] = h2;
                }
              }
              return a;
            }
          };
        }, 225: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeV6 = void 0;
          const s2 = i2(8273), r = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], n = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
          let o;
          t2.UnicodeV6 = class {
            constructor() {
              if (this.version = "6", !o) {
                o = new Uint8Array(65536), (0, s2.fill)(o, 1), o[0] = 0, (0, s2.fill)(o, 0, 1, 32), (0, s2.fill)(o, 0, 127, 160), (0, s2.fill)(o, 2, 4352, 4448), o[9001] = 2, o[9002] = 2, (0, s2.fill)(o, 2, 11904, 42192), o[12351] = 1, (0, s2.fill)(o, 2, 44032, 55204), (0, s2.fill)(o, 2, 63744, 64256), (0, s2.fill)(o, 2, 65040, 65050), (0, s2.fill)(o, 2, 65072, 65136), (0, s2.fill)(o, 2, 65280, 65377), (0, s2.fill)(o, 2, 65504, 65511);
                for (let e3 = 0; e3 < r.length; ++e3)
                  (0, s2.fill)(o, 0, r[e3][0], r[e3][1] + 1);
              }
            }
            wcwidth(e3) {
              return e3 < 32 ? 0 : e3 < 127 ? 1 : e3 < 65536 ? o[e3] : function(e4, t3) {
                let i3, s3 = 0, r2 = t3.length - 1;
                if (e4 < t3[0][0] || e4 > t3[r2][1])
                  return false;
                for (; r2 >= s3; )
                  if (i3 = s3 + r2 >> 1, e4 > t3[i3][1])
                    s3 = i3 + 1;
                  else {
                    if (!(e4 < t3[i3][0]))
                      return true;
                    r2 = i3 - 1;
                  }
                return false;
              }(e3, n) ? 0 : e3 >= 131072 && e3 <= 196605 || e3 >= 196608 && e3 <= 262141 ? 2 : 1;
            }
          };
        }, 5981: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.WriteBuffer = void 0;
          const s2 = i2(8460), r = "undefined" == typeof queueMicrotask ? (e3) => {
            Promise.resolve().then(e3);
          } : queueMicrotask;
          t2.WriteBuffer = class {
            constructor(e3) {
              this._action = e3, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = false, this._syncCalls = 0, this._onWriteParsed = new s2.EventEmitter();
            }
            get onWriteParsed() {
              return this._onWriteParsed.event;
            }
            writeSync(e3, t3) {
              if (void 0 !== t3 && this._syncCalls > t3)
                return void (this._syncCalls = 0);
              if (this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting)
                return;
              let i3;
              for (this._isSyncWriting = true; i3 = this._writeBuffer.shift(); ) {
                this._action(i3);
                const e4 = this._callbacks.shift();
                e4 && e4();
              }
              this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
            }
            write(e3, t3) {
              if (this._pendingData > 5e7)
                throw new Error("write data discarded, use flow control to avoid losing data");
              this._writeBuffer.length || (this._bufferOffset = 0, setTimeout(() => this._innerWrite())), this._pendingData += e3.length, this._writeBuffer.push(e3), this._callbacks.push(t3);
            }
            _innerWrite(e3 = 0, t3 = true) {
              const i3 = e3 || Date.now();
              for (; this._writeBuffer.length > this._bufferOffset; ) {
                const e4 = this._writeBuffer[this._bufferOffset], s3 = this._action(e4, t3);
                if (s3) {
                  const e5 = (e6) => Date.now() - i3 >= 12 ? setTimeout(() => this._innerWrite(0, e6)) : this._innerWrite(i3, e6);
                  return void s3.catch((e6) => (r(() => {
                    throw e6;
                  }), Promise.resolve(false))).then(e5);
                }
                const n = this._callbacks[this._bufferOffset];
                if (n && n(), this._bufferOffset++, this._pendingData -= e4.length, Date.now() - i3 >= 12)
                  break;
              }
              this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
            }
          };
        }, 5941: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.toRgbString = t2.parseColor = void 0;
          const i2 = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, s2 = /^[\da-f]+$/;
          function r(e3, t3) {
            const i3 = e3.toString(16), s3 = i3.length < 2 ? "0" + i3 : i3;
            switch (t3) {
              case 4:
                return i3[0];
              case 8:
                return s3;
              case 12:
                return (s3 + s3).slice(0, 3);
              default:
                return s3 + s3;
            }
          }
          t2.parseColor = function(e3) {
            if (!e3)
              return;
            let t3 = e3.toLowerCase();
            if (0 === t3.indexOf("rgb:")) {
              t3 = t3.slice(4);
              const e4 = i2.exec(t3);
              if (e4) {
                const t4 = e4[1] ? 15 : e4[4] ? 255 : e4[7] ? 4095 : 65535;
                return [Math.round(parseInt(e4[1] || e4[4] || e4[7] || e4[10], 16) / t4 * 255), Math.round(parseInt(e4[2] || e4[5] || e4[8] || e4[11], 16) / t4 * 255), Math.round(parseInt(e4[3] || e4[6] || e4[9] || e4[12], 16) / t4 * 255)];
              }
            } else if (0 === t3.indexOf("#") && (t3 = t3.slice(1), s2.exec(t3) && [3, 6, 9, 12].includes(t3.length))) {
              const e4 = t3.length / 3, i3 = [0, 0, 0];
              for (let s3 = 0; s3 < 3; ++s3) {
                const r2 = parseInt(t3.slice(e4 * s3, e4 * s3 + e4), 16);
                i3[s3] = 1 === e4 ? r2 << 4 : 2 === e4 ? r2 : 3 === e4 ? r2 >> 4 : r2 >> 8;
              }
              return i3;
            }
          }, t2.toRgbString = function(e3, t3 = 16) {
            const [i3, s3, n] = e3;
            return `rgb:${r(i3, t3)}/${r(s3, t3)}/${r(n, t3)}`;
          };
        }, 5770: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PAYLOAD_LIMIT = void 0, t2.PAYLOAD_LIMIT = 1e7;
        }, 6351: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DcsHandler = t2.DcsParser = void 0;
          const s2 = i2(482), r = i2(8742), n = i2(5770), o = [];
          t2.DcsParser = class {
            constructor() {
              this._handlers = /* @__PURE__ */ Object.create(null), this._active = o, this._ident = 0, this._handlerFb = () => {
              }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
            }
            dispose() {
              this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
              }, this._active = o;
            }
            registerHandler(e3, t3) {
              void 0 === this._handlers[e3] && (this._handlers[e3] = []);
              const i3 = this._handlers[e3];
              return i3.push(t3), { dispose: () => {
                const e4 = i3.indexOf(t3);
                -1 !== e4 && i3.splice(e4, 1);
              } };
            }
            clearHandler(e3) {
              this._handlers[e3] && delete this._handlers[e3];
            }
            setHandlerFallback(e3) {
              this._handlerFb = e3;
            }
            reset() {
              if (this._active.length)
                for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e3 >= 0; --e3)
                  this._active[e3].unhook(false);
              this._stack.paused = false, this._active = o, this._ident = 0;
            }
            hook(e3, t3) {
              if (this.reset(), this._ident = e3, this._active = this._handlers[e3] || o, this._active.length)
                for (let e4 = this._active.length - 1; e4 >= 0; e4--)
                  this._active[e4].hook(t3);
              else
                this._handlerFb(this._ident, "HOOK", t3);
            }
            put(e3, t3, i3) {
              if (this._active.length)
                for (let s3 = this._active.length - 1; s3 >= 0; s3--)
                  this._active[s3].put(e3, t3, i3);
              else
                this._handlerFb(this._ident, "PUT", (0, s2.utf32ToString)(e3, t3, i3));
            }
            unhook(e3, t3 = true) {
              if (this._active.length) {
                let i3 = false, s3 = this._active.length - 1, r2 = false;
                if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t3, r2 = this._stack.fallThrough, this._stack.paused = false), !r2 && false === i3) {
                  for (; s3 >= 0 && (i3 = this._active[s3].unhook(e3), true !== i3); s3--)
                    if (i3 instanceof Promise)
                      return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
                  s3--;
                }
                for (; s3 >= 0; s3--)
                  if (i3 = this._active[s3].unhook(false), i3 instanceof Promise)
                    return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
              } else
                this._handlerFb(this._ident, "UNHOOK", e3);
              this._active = o, this._ident = 0;
            }
          };
          const a = new r.Params();
          a.addParam(0), t2.DcsHandler = class {
            constructor(e3) {
              this._handler = e3, this._data = "", this._params = a, this._hitLimit = false;
            }
            hook(e3) {
              this._params = e3.length > 1 || e3.params[0] ? e3.clone() : a, this._data = "", this._hitLimit = false;
            }
            put(e3, t3, i3) {
              this._hitLimit || (this._data += (0, s2.utf32ToString)(e3, t3, i3), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
            }
            unhook(e3) {
              let t3 = false;
              if (this._hitLimit)
                t3 = false;
              else if (e3 && (t3 = this._handler(this._data, this._params), t3 instanceof Promise))
                return t3.then((e4) => (this._params = a, this._data = "", this._hitLimit = false, e4));
              return this._params = a, this._data = "", this._hitLimit = false, t3;
            }
          };
        }, 2015: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.EscapeSequenceParser = t2.VT500_TRANSITION_TABLE = t2.TransitionTable = void 0;
          const s2 = i2(844), r = i2(8273), n = i2(8742), o = i2(6242), a = i2(6351);
          class h2 {
            constructor(e3) {
              this.table = new Uint8Array(e3);
            }
            setDefault(e3, t3) {
              (0, r.fill)(this.table, e3 << 4 | t3);
            }
            add(e3, t3, i3, s3) {
              this.table[t3 << 8 | e3] = i3 << 4 | s3;
            }
            addMany(e3, t3, i3, s3) {
              for (let r2 = 0; r2 < e3.length; r2++)
                this.table[t3 << 8 | e3[r2]] = i3 << 4 | s3;
            }
          }
          t2.TransitionTable = h2;
          const c = 160;
          t2.VT500_TRANSITION_TABLE = function() {
            const e3 = new h2(4095), t3 = Array.apply(null, Array(256)).map((e4, t4) => t4), i3 = (e4, i4) => t3.slice(e4, i4), s3 = i3(32, 127), r2 = i3(0, 24);
            r2.push(25), r2.push.apply(r2, i3(28, 32));
            const n2 = i3(0, 14);
            let o2;
            for (o2 in e3.setDefault(1, 0), e3.addMany(s3, 0, 2, 0), n2)
              e3.addMany([24, 26, 153, 154], o2, 3, 0), e3.addMany(i3(128, 144), o2, 3, 0), e3.addMany(i3(144, 152), o2, 3, 0), e3.add(156, o2, 0, 0), e3.add(27, o2, 11, 1), e3.add(157, o2, 4, 8), e3.addMany([152, 158, 159], o2, 0, 7), e3.add(155, o2, 11, 3), e3.add(144, o2, 11, 9);
            return e3.addMany(r2, 0, 3, 0), e3.addMany(r2, 1, 3, 1), e3.add(127, 1, 0, 1), e3.addMany(r2, 8, 0, 8), e3.addMany(r2, 3, 3, 3), e3.add(127, 3, 0, 3), e3.addMany(r2, 4, 3, 4), e3.add(127, 4, 0, 4), e3.addMany(r2, 6, 3, 6), e3.addMany(r2, 5, 3, 5), e3.add(127, 5, 0, 5), e3.addMany(r2, 2, 3, 2), e3.add(127, 2, 0, 2), e3.add(93, 1, 4, 8), e3.addMany(s3, 8, 5, 8), e3.add(127, 8, 5, 8), e3.addMany([156, 27, 24, 26, 7], 8, 6, 0), e3.addMany(i3(28, 32), 8, 0, 8), e3.addMany([88, 94, 95], 1, 0, 7), e3.addMany(s3, 7, 0, 7), e3.addMany(r2, 7, 0, 7), e3.add(156, 7, 0, 0), e3.add(127, 7, 0, 7), e3.add(91, 1, 11, 3), e3.addMany(i3(64, 127), 3, 7, 0), e3.addMany(i3(48, 60), 3, 8, 4), e3.addMany([60, 61, 62, 63], 3, 9, 4), e3.addMany(i3(48, 60), 4, 8, 4), e3.addMany(i3(64, 127), 4, 7, 0), e3.addMany([60, 61, 62, 63], 4, 0, 6), e3.addMany(i3(32, 64), 6, 0, 6), e3.add(127, 6, 0, 6), e3.addMany(i3(64, 127), 6, 0, 0), e3.addMany(i3(32, 48), 3, 9, 5), e3.addMany(i3(32, 48), 5, 9, 5), e3.addMany(i3(48, 64), 5, 0, 6), e3.addMany(i3(64, 127), 5, 7, 0), e3.addMany(i3(32, 48), 4, 9, 5), e3.addMany(i3(32, 48), 1, 9, 2), e3.addMany(i3(32, 48), 2, 9, 2), e3.addMany(i3(48, 127), 2, 10, 0), e3.addMany(i3(48, 80), 1, 10, 0), e3.addMany(i3(81, 88), 1, 10, 0), e3.addMany([89, 90, 92], 1, 10, 0), e3.addMany(i3(96, 127), 1, 10, 0), e3.add(80, 1, 11, 9), e3.addMany(r2, 9, 0, 9), e3.add(127, 9, 0, 9), e3.addMany(i3(28, 32), 9, 0, 9), e3.addMany(i3(32, 48), 9, 9, 12), e3.addMany(i3(48, 60), 9, 8, 10), e3.addMany([60, 61, 62, 63], 9, 9, 10), e3.addMany(r2, 11, 0, 11), e3.addMany(i3(32, 128), 11, 0, 11), e3.addMany(i3(28, 32), 11, 0, 11), e3.addMany(r2, 10, 0, 10), e3.add(127, 10, 0, 10), e3.addMany(i3(28, 32), 10, 0, 10), e3.addMany(i3(48, 60), 10, 8, 10), e3.addMany([60, 61, 62, 63], 10, 0, 11), e3.addMany(i3(32, 48), 10, 9, 12), e3.addMany(r2, 12, 0, 12), e3.add(127, 12, 0, 12), e3.addMany(i3(28, 32), 12, 0, 12), e3.addMany(i3(32, 48), 12, 9, 12), e3.addMany(i3(48, 64), 12, 0, 11), e3.addMany(i3(64, 127), 12, 12, 13), e3.addMany(i3(64, 127), 10, 12, 13), e3.addMany(i3(64, 127), 9, 12, 13), e3.addMany(r2, 13, 13, 13), e3.addMany(s3, 13, 13, 13), e3.add(127, 13, 0, 13), e3.addMany([27, 156, 24, 26], 13, 14, 0), e3.add(c, 0, 2, 0), e3.add(c, 8, 5, 8), e3.add(c, 6, 0, 6), e3.add(c, 11, 0, 11), e3.add(c, 13, 13, 13), e3;
          }();
          class l extends s2.Disposable {
            constructor(e3 = t2.VT500_TRANSITION_TABLE) {
              super(), this._transitions = e3, this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 }, this.initialState = 0, this.currentState = this.initialState, this._params = new n.Params(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0, this._printHandlerFb = (e4, t3, i3) => {
              }, this._executeHandlerFb = (e4) => {
              }, this._csiHandlerFb = (e4, t3) => {
              }, this._escHandlerFb = (e4) => {
              }, this._errorHandlerFb = (e4) => e4, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._oscParser = new o.OscParser(), this._dcsParser = new a.DcsParser(), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
            }
            _identifier(e3, t3 = [64, 126]) {
              let i3 = 0;
              if (e3.prefix) {
                if (e3.prefix.length > 1)
                  throw new Error("only one byte as prefix supported");
                if (i3 = e3.prefix.charCodeAt(0), i3 && 60 > i3 || i3 > 63)
                  throw new Error("prefix must be in range 0x3c .. 0x3f");
              }
              if (e3.intermediates) {
                if (e3.intermediates.length > 2)
                  throw new Error("only two bytes as intermediates are supported");
                for (let t4 = 0; t4 < e3.intermediates.length; ++t4) {
                  const s4 = e3.intermediates.charCodeAt(t4);
                  if (32 > s4 || s4 > 47)
                    throw new Error("intermediate must be in range 0x20 .. 0x2f");
                  i3 <<= 8, i3 |= s4;
                }
              }
              if (1 !== e3.final.length)
                throw new Error("final must be a single byte");
              const s3 = e3.final.charCodeAt(0);
              if (t3[0] > s3 || s3 > t3[1])
                throw new Error(`final must be in range ${t3[0]} .. ${t3[1]}`);
              return i3 <<= 8, i3 |= s3, i3;
            }
            identToString(e3) {
              const t3 = [];
              for (; e3; )
                t3.push(String.fromCharCode(255 & e3)), e3 >>= 8;
              return t3.reverse().join("");
            }
            dispose() {
              this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._oscParser.dispose(), this._dcsParser.dispose();
            }
            setPrintHandler(e3) {
              this._printHandler = e3;
            }
            clearPrintHandler() {
              this._printHandler = this._printHandlerFb;
            }
            registerEscHandler(e3, t3) {
              const i3 = this._identifier(e3, [48, 126]);
              void 0 === this._escHandlers[i3] && (this._escHandlers[i3] = []);
              const s3 = this._escHandlers[i3];
              return s3.push(t3), { dispose: () => {
                const e4 = s3.indexOf(t3);
                -1 !== e4 && s3.splice(e4, 1);
              } };
            }
            clearEscHandler(e3) {
              this._escHandlers[this._identifier(e3, [48, 126])] && delete this._escHandlers[this._identifier(e3, [48, 126])];
            }
            setEscHandlerFallback(e3) {
              this._escHandlerFb = e3;
            }
            setExecuteHandler(e3, t3) {
              this._executeHandlers[e3.charCodeAt(0)] = t3;
            }
            clearExecuteHandler(e3) {
              this._executeHandlers[e3.charCodeAt(0)] && delete this._executeHandlers[e3.charCodeAt(0)];
            }
            setExecuteHandlerFallback(e3) {
              this._executeHandlerFb = e3;
            }
            registerCsiHandler(e3, t3) {
              const i3 = this._identifier(e3);
              void 0 === this._csiHandlers[i3] && (this._csiHandlers[i3] = []);
              const s3 = this._csiHandlers[i3];
              return s3.push(t3), { dispose: () => {
                const e4 = s3.indexOf(t3);
                -1 !== e4 && s3.splice(e4, 1);
              } };
            }
            clearCsiHandler(e3) {
              this._csiHandlers[this._identifier(e3)] && delete this._csiHandlers[this._identifier(e3)];
            }
            setCsiHandlerFallback(e3) {
              this._csiHandlerFb = e3;
            }
            registerDcsHandler(e3, t3) {
              return this._dcsParser.registerHandler(this._identifier(e3), t3);
            }
            clearDcsHandler(e3) {
              this._dcsParser.clearHandler(this._identifier(e3));
            }
            setDcsHandlerFallback(e3) {
              this._dcsParser.setHandlerFallback(e3);
            }
            registerOscHandler(e3, t3) {
              return this._oscParser.registerHandler(e3, t3);
            }
            clearOscHandler(e3) {
              this._oscParser.clearHandler(e3);
            }
            setOscHandlerFallback(e3) {
              this._oscParser.setHandlerFallback(e3);
            }
            setErrorHandler(e3) {
              this._errorHandler = e3;
            }
            clearErrorHandler() {
              this._errorHandler = this._errorHandlerFb;
            }
            reset() {
              this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0, 0 !== this._parseStack.state && (this._parseStack.state = 2, this._parseStack.handlers = []);
            }
            _preserveStack(e3, t3, i3, s3, r2) {
              this._parseStack.state = e3, this._parseStack.handlers = t3, this._parseStack.handlerPos = i3, this._parseStack.transition = s3, this._parseStack.chunkPos = r2;
            }
            parse(e3, t3, i3) {
              let s3, r2 = 0, n2 = 0, o2 = 0;
              if (this._parseStack.state)
                if (2 === this._parseStack.state)
                  this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1;
                else {
                  if (void 0 === i3 || 1 === this._parseStack.state)
                    throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
                  const t4 = this._parseStack.handlers;
                  let n3 = this._parseStack.handlerPos - 1;
                  switch (this._parseStack.state) {
                    case 3:
                      if (false === i3 && n3 > -1) {
                        for (; n3 >= 0 && (s3 = t4[n3](this._params), true !== s3); n3--)
                          if (s3 instanceof Promise)
                            return this._parseStack.handlerPos = n3, s3;
                      }
                      this._parseStack.handlers = [];
                      break;
                    case 4:
                      if (false === i3 && n3 > -1) {
                        for (; n3 >= 0 && (s3 = t4[n3](), true !== s3); n3--)
                          if (s3 instanceof Promise)
                            return this._parseStack.handlerPos = n3, s3;
                      }
                      this._parseStack.handlers = [];
                      break;
                    case 6:
                      if (r2 = e3[this._parseStack.chunkPos], s3 = this._dcsParser.unhook(24 !== r2 && 26 !== r2, i3), s3)
                        return s3;
                      27 === r2 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                      break;
                    case 5:
                      if (r2 = e3[this._parseStack.chunkPos], s3 = this._oscParser.end(24 !== r2 && 26 !== r2, i3), s3)
                        return s3;
                      27 === r2 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                  }
                  this._parseStack.state = 0, o2 = this._parseStack.chunkPos + 1, this.precedingCodepoint = 0, this.currentState = 15 & this._parseStack.transition;
                }
              for (let i4 = o2; i4 < t3; ++i4) {
                switch (r2 = e3[i4], n2 = this._transitions.table[this.currentState << 8 | (r2 < 160 ? r2 : c)], n2 >> 4) {
                  case 2:
                    for (let s4 = i4 + 1; ; ++s4) {
                      if (s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < c) {
                        this._printHandler(e3, i4, s4), i4 = s4 - 1;
                        break;
                      }
                      if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < c) {
                        this._printHandler(e3, i4, s4), i4 = s4 - 1;
                        break;
                      }
                      if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < c) {
                        this._printHandler(e3, i4, s4), i4 = s4 - 1;
                        break;
                      }
                      if (++s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 126 && r2 < c) {
                        this._printHandler(e3, i4, s4), i4 = s4 - 1;
                        break;
                      }
                    }
                    break;
                  case 3:
                    this._executeHandlers[r2] ? this._executeHandlers[r2]() : this._executeHandlerFb(r2), this.precedingCodepoint = 0;
                    break;
                  case 0:
                    break;
                  case 1:
                    if (this._errorHandler({ position: i4, code: r2, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort)
                      return;
                    break;
                  case 7:
                    const o3 = this._csiHandlers[this._collect << 8 | r2];
                    let a2 = o3 ? o3.length - 1 : -1;
                    for (; a2 >= 0 && (s3 = o3[a2](this._params), true !== s3); a2--)
                      if (s3 instanceof Promise)
                        return this._preserveStack(3, o3, a2, n2, i4), s3;
                    a2 < 0 && this._csiHandlerFb(this._collect << 8 | r2, this._params), this.precedingCodepoint = 0;
                    break;
                  case 8:
                    do {
                      switch (r2) {
                        case 59:
                          this._params.addParam(0);
                          break;
                        case 58:
                          this._params.addSubParam(-1);
                          break;
                        default:
                          this._params.addDigit(r2 - 48);
                      }
                    } while (++i4 < t3 && (r2 = e3[i4]) > 47 && r2 < 60);
                    i4--;
                    break;
                  case 9:
                    this._collect <<= 8, this._collect |= r2;
                    break;
                  case 10:
                    const h3 = this._escHandlers[this._collect << 8 | r2];
                    let l2 = h3 ? h3.length - 1 : -1;
                    for (; l2 >= 0 && (s3 = h3[l2](), true !== s3); l2--)
                      if (s3 instanceof Promise)
                        return this._preserveStack(4, h3, l2, n2, i4), s3;
                    l2 < 0 && this._escHandlerFb(this._collect << 8 | r2), this.precedingCodepoint = 0;
                    break;
                  case 11:
                    this._params.reset(), this._params.addParam(0), this._collect = 0;
                    break;
                  case 12:
                    this._dcsParser.hook(this._collect << 8 | r2, this._params);
                    break;
                  case 13:
                    for (let s4 = i4 + 1; ; ++s4)
                      if (s4 >= t3 || 24 === (r2 = e3[s4]) || 26 === r2 || 27 === r2 || r2 > 127 && r2 < c) {
                        this._dcsParser.put(e3, i4, s4), i4 = s4 - 1;
                        break;
                      }
                    break;
                  case 14:
                    if (s3 = this._dcsParser.unhook(24 !== r2 && 26 !== r2), s3)
                      return this._preserveStack(6, [], 0, n2, i4), s3;
                    27 === r2 && (n2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0;
                    break;
                  case 4:
                    this._oscParser.start();
                    break;
                  case 5:
                    for (let s4 = i4 + 1; ; s4++)
                      if (s4 >= t3 || (r2 = e3[s4]) < 32 || r2 > 127 && r2 < c) {
                        this._oscParser.put(e3, i4, s4), i4 = s4 - 1;
                        break;
                      }
                    break;
                  case 6:
                    if (s3 = this._oscParser.end(24 !== r2 && 26 !== r2), s3)
                      return this._preserveStack(5, [], 0, n2, i4), s3;
                    27 === r2 && (n2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingCodepoint = 0;
                }
                this.currentState = 15 & n2;
              }
            }
          }
          t2.EscapeSequenceParser = l;
        }, 6242: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.OscHandler = t2.OscParser = void 0;
          const s2 = i2(5770), r = i2(482), n = [];
          t2.OscParser = class {
            constructor() {
              this._state = 0, this._active = n, this._id = -1, this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
              }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
            }
            registerHandler(e3, t3) {
              void 0 === this._handlers[e3] && (this._handlers[e3] = []);
              const i3 = this._handlers[e3];
              return i3.push(t3), { dispose: () => {
                const e4 = i3.indexOf(t3);
                -1 !== e4 && i3.splice(e4, 1);
              } };
            }
            clearHandler(e3) {
              this._handlers[e3] && delete this._handlers[e3];
            }
            setHandlerFallback(e3) {
              this._handlerFb = e3;
            }
            dispose() {
              this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
              }, this._active = n;
            }
            reset() {
              if (2 === this._state)
                for (let e3 = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; e3 >= 0; --e3)
                  this._active[e3].end(false);
              this._stack.paused = false, this._active = n, this._id = -1, this._state = 0;
            }
            _start() {
              if (this._active = this._handlers[this._id] || n, this._active.length)
                for (let e3 = this._active.length - 1; e3 >= 0; e3--)
                  this._active[e3].start();
              else
                this._handlerFb(this._id, "START");
            }
            _put(e3, t3, i3) {
              if (this._active.length)
                for (let s3 = this._active.length - 1; s3 >= 0; s3--)
                  this._active[s3].put(e3, t3, i3);
              else
                this._handlerFb(this._id, "PUT", (0, r.utf32ToString)(e3, t3, i3));
            }
            start() {
              this.reset(), this._state = 1;
            }
            put(e3, t3, i3) {
              if (3 !== this._state) {
                if (1 === this._state)
                  for (; t3 < i3; ) {
                    const i4 = e3[t3++];
                    if (59 === i4) {
                      this._state = 2, this._start();
                      break;
                    }
                    if (i4 < 48 || 57 < i4)
                      return void (this._state = 3);
                    -1 === this._id && (this._id = 0), this._id = 10 * this._id + i4 - 48;
                  }
                2 === this._state && i3 - t3 > 0 && this._put(e3, t3, i3);
              }
            }
            end(e3, t3 = true) {
              if (0 !== this._state) {
                if (3 !== this._state)
                  if (1 === this._state && this._start(), this._active.length) {
                    let i3 = false, s3 = this._active.length - 1, r2 = false;
                    if (this._stack.paused && (s3 = this._stack.loopPosition - 1, i3 = t3, r2 = this._stack.fallThrough, this._stack.paused = false), !r2 && false === i3) {
                      for (; s3 >= 0 && (i3 = this._active[s3].end(e3), true !== i3); s3--)
                        if (i3 instanceof Promise)
                          return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = false, i3;
                      s3--;
                    }
                    for (; s3 >= 0; s3--)
                      if (i3 = this._active[s3].end(false), i3 instanceof Promise)
                        return this._stack.paused = true, this._stack.loopPosition = s3, this._stack.fallThrough = true, i3;
                  } else
                    this._handlerFb(this._id, "END", e3);
                this._active = n, this._id = -1, this._state = 0;
              }
            }
          }, t2.OscHandler = class {
            constructor(e3) {
              this._handler = e3, this._data = "", this._hitLimit = false;
            }
            start() {
              this._data = "", this._hitLimit = false;
            }
            put(e3, t3, i3) {
              this._hitLimit || (this._data += (0, r.utf32ToString)(e3, t3, i3), this._data.length > s2.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
            }
            end(e3) {
              let t3 = false;
              if (this._hitLimit)
                t3 = false;
              else if (e3 && (t3 = this._handler(this._data), t3 instanceof Promise))
                return t3.then((e4) => (this._data = "", this._hitLimit = false, e4));
              return this._data = "", this._hitLimit = false, t3;
            }
          };
        }, 8742: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.Params = void 0;
          const i2 = 2147483647;
          class s2 {
            constructor(e3 = 32, t3 = 32) {
              if (this.maxLength = e3, this.maxSubParamsLength = t3, t3 > 256)
                throw new Error("maxSubParamsLength must not be greater than 256");
              this.params = new Int32Array(e3), this.length = 0, this._subParams = new Int32Array(t3), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(e3), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
            }
            static fromArray(e3) {
              const t3 = new s2();
              if (!e3.length)
                return t3;
              for (let i3 = Array.isArray(e3[0]) ? 1 : 0; i3 < e3.length; ++i3) {
                const s3 = e3[i3];
                if (Array.isArray(s3))
                  for (let e4 = 0; e4 < s3.length; ++e4)
                    t3.addSubParam(s3[e4]);
                else
                  t3.addParam(s3);
              }
              return t3;
            }
            clone() {
              const e3 = new s2(this.maxLength, this.maxSubParamsLength);
              return e3.params.set(this.params), e3.length = this.length, e3._subParams.set(this._subParams), e3._subParamsLength = this._subParamsLength, e3._subParamsIdx.set(this._subParamsIdx), e3._rejectDigits = this._rejectDigits, e3._rejectSubDigits = this._rejectSubDigits, e3._digitIsSub = this._digitIsSub, e3;
            }
            toArray() {
              const e3 = [];
              for (let t3 = 0; t3 < this.length; ++t3) {
                e3.push(this.params[t3]);
                const i3 = this._subParamsIdx[t3] >> 8, s3 = 255 & this._subParamsIdx[t3];
                s3 - i3 > 0 && e3.push(Array.prototype.slice.call(this._subParams, i3, s3));
              }
              return e3;
            }
            reset() {
              this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
            }
            addParam(e3) {
              if (this._digitIsSub = false, this.length >= this.maxLength)
                this._rejectDigits = true;
              else {
                if (e3 < -1)
                  throw new Error("values lesser than -1 are not allowed");
                this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = e3 > i2 ? i2 : e3;
              }
            }
            addSubParam(e3) {
              if (this._digitIsSub = true, this.length)
                if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength)
                  this._rejectSubDigits = true;
                else {
                  if (e3 < -1)
                    throw new Error("values lesser than -1 are not allowed");
                  this._subParams[this._subParamsLength++] = e3 > i2 ? i2 : e3, this._subParamsIdx[this.length - 1]++;
                }
            }
            hasSubParams(e3) {
              return (255 & this._subParamsIdx[e3]) - (this._subParamsIdx[e3] >> 8) > 0;
            }
            getSubParams(e3) {
              const t3 = this._subParamsIdx[e3] >> 8, i3 = 255 & this._subParamsIdx[e3];
              return i3 - t3 > 0 ? this._subParams.subarray(t3, i3) : null;
            }
            getSubParamsAll() {
              const e3 = {};
              for (let t3 = 0; t3 < this.length; ++t3) {
                const i3 = this._subParamsIdx[t3] >> 8, s3 = 255 & this._subParamsIdx[t3];
                s3 - i3 > 0 && (e3[t3] = this._subParams.slice(i3, s3));
              }
              return e3;
            }
            addDigit(e3) {
              let t3;
              if (this._rejectDigits || !(t3 = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits)
                return;
              const s3 = this._digitIsSub ? this._subParams : this.params, r = s3[t3 - 1];
              s3[t3 - 1] = ~r ? Math.min(10 * r + e3, i2) : e3;
            }
          }
          t2.Params = s2;
        }, 5741: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.AddonManager = void 0, t2.AddonManager = class {
            constructor() {
              this._addons = [];
            }
            dispose() {
              for (let e3 = this._addons.length - 1; e3 >= 0; e3--)
                this._addons[e3].instance.dispose();
            }
            loadAddon(e3, t3) {
              const i2 = { instance: t3, dispose: t3.dispose, isDisposed: false };
              this._addons.push(i2), t3.dispose = () => this._wrappedAddonDispose(i2), t3.activate(e3);
            }
            _wrappedAddonDispose(e3) {
              if (e3.isDisposed)
                return;
              let t3 = -1;
              for (let i2 = 0; i2 < this._addons.length; i2++)
                if (this._addons[i2] === e3) {
                  t3 = i2;
                  break;
                }
              if (-1 === t3)
                throw new Error("Could not dispose an addon that has not been loaded");
              e3.isDisposed = true, e3.dispose.apply(e3.instance), this._addons.splice(t3, 1);
            }
          };
        }, 8771: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferApiView = void 0;
          const s2 = i2(3785), r = i2(511);
          t2.BufferApiView = class {
            constructor(e3, t3) {
              this._buffer = e3, this.type = t3;
            }
            init(e3) {
              return this._buffer = e3, this;
            }
            get cursorY() {
              return this._buffer.y;
            }
            get cursorX() {
              return this._buffer.x;
            }
            get viewportY() {
              return this._buffer.ydisp;
            }
            get baseY() {
              return this._buffer.ybase;
            }
            get length() {
              return this._buffer.lines.length;
            }
            getLine(e3) {
              const t3 = this._buffer.lines.get(e3);
              if (t3)
                return new s2.BufferLineApiView(t3);
            }
            getNullCell() {
              return new r.CellData();
            }
          };
        }, 3785: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferLineApiView = void 0;
          const s2 = i2(511);
          t2.BufferLineApiView = class {
            constructor(e3) {
              this._line = e3;
            }
            get isWrapped() {
              return this._line.isWrapped;
            }
            get length() {
              return this._line.length;
            }
            getCell(e3, t3) {
              if (!(e3 < 0 || e3 >= this._line.length))
                return t3 ? (this._line.loadCell(e3, t3), t3) : this._line.loadCell(e3, new s2.CellData());
            }
            translateToString(e3, t3, i3) {
              return this._line.translateToString(e3, t3, i3);
            }
          };
        }, 8285: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferNamespaceApi = void 0;
          const s2 = i2(8771), r = i2(8460);
          t2.BufferNamespaceApi = class {
            constructor(e3) {
              this._core = e3, this._onBufferChange = new r.EventEmitter(), this._normal = new s2.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new s2.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
            }
            get onBufferChange() {
              return this._onBufferChange.event;
            }
            get active() {
              if (this._core.buffers.active === this._core.buffers.normal)
                return this.normal;
              if (this._core.buffers.active === this._core.buffers.alt)
                return this.alternate;
              throw new Error("Active buffer is neither normal nor alternate");
            }
            get normal() {
              return this._normal.init(this._core.buffers.normal);
            }
            get alternate() {
              return this._alternate.init(this._core.buffers.alt);
            }
          };
        }, 7975: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ParserApi = void 0, t2.ParserApi = class {
            constructor(e3) {
              this._core = e3;
            }
            registerCsiHandler(e3, t3) {
              return this._core.registerCsiHandler(e3, (e4) => t3(e4.toArray()));
            }
            addCsiHandler(e3, t3) {
              return this.registerCsiHandler(e3, t3);
            }
            registerDcsHandler(e3, t3) {
              return this._core.registerDcsHandler(e3, (e4, i2) => t3(e4, i2.toArray()));
            }
            addDcsHandler(e3, t3) {
              return this.registerDcsHandler(e3, t3);
            }
            registerEscHandler(e3, t3) {
              return this._core.registerEscHandler(e3, t3);
            }
            addEscHandler(e3, t3) {
              return this.registerEscHandler(e3, t3);
            }
            registerOscHandler(e3, t3) {
              return this._core.registerOscHandler(e3, t3);
            }
            addOscHandler(e3, t3) {
              return this.registerOscHandler(e3, t3);
            }
          };
        }, 7090: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeApi = void 0, t2.UnicodeApi = class {
            constructor(e3) {
              this._core = e3;
            }
            register(e3) {
              this._core.unicodeService.register(e3);
            }
            get versions() {
              return this._core.unicodeService.versions;
            }
            get activeVersion() {
              return this._core.unicodeService.activeVersion;
            }
            set activeVersion(e3) {
              this._core.unicodeService.activeVersion = e3;
            }
          };
        }, 744: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BufferService = t2.MINIMUM_ROWS = t2.MINIMUM_COLS = void 0;
          const n = i2(2585), o = i2(5295), a = i2(8460), h2 = i2(844);
          t2.MINIMUM_COLS = 2, t2.MINIMUM_ROWS = 1;
          let c = class extends h2.Disposable {
            constructor(e3) {
              super(), this.isUserScrolling = false, this._onResize = new a.EventEmitter(), this._onScroll = new a.EventEmitter(), this.cols = Math.max(e3.rawOptions.cols || 0, t2.MINIMUM_COLS), this.rows = Math.max(e3.rawOptions.rows || 0, t2.MINIMUM_ROWS), this.buffers = new o.BufferSet(e3, this);
            }
            get onResize() {
              return this._onResize.event;
            }
            get onScroll() {
              return this._onScroll.event;
            }
            get buffer() {
              return this.buffers.active;
            }
            dispose() {
              super.dispose(), this.buffers.dispose();
            }
            resize(e3, t3) {
              this.cols = e3, this.rows = t3, this.buffers.resize(e3, t3), this.buffers.setupTabStops(this.cols), this._onResize.fire({ cols: e3, rows: t3 });
            }
            reset() {
              this.buffers.reset(), this.isUserScrolling = false;
            }
            scroll(e3, t3 = false) {
              const i3 = this.buffer;
              let s3;
              s3 = this._cachedBlankLine, s3 && s3.length === this.cols && s3.getFg(0) === e3.fg && s3.getBg(0) === e3.bg || (s3 = i3.getBlankLine(e3, t3), this._cachedBlankLine = s3), s3.isWrapped = t3;
              const r2 = i3.ybase + i3.scrollTop, n2 = i3.ybase + i3.scrollBottom;
              if (0 === i3.scrollTop) {
                const e4 = i3.lines.isFull;
                n2 === i3.lines.length - 1 ? e4 ? i3.lines.recycle().copyFrom(s3) : i3.lines.push(s3.clone()) : i3.lines.splice(n2 + 1, 0, s3.clone()), e4 ? this.isUserScrolling && (i3.ydisp = Math.max(i3.ydisp - 1, 0)) : (i3.ybase++, this.isUserScrolling || i3.ydisp++);
              } else {
                const e4 = n2 - r2 + 1;
                i3.lines.shiftElements(r2 + 1, e4 - 1, -1), i3.lines.set(n2, s3.clone());
              }
              this.isUserScrolling || (i3.ydisp = i3.ybase), this._onScroll.fire(i3.ydisp);
            }
            scrollLines(e3, t3, i3) {
              const s3 = this.buffer;
              if (e3 < 0) {
                if (0 === s3.ydisp)
                  return;
                this.isUserScrolling = true;
              } else
                e3 + s3.ydisp >= s3.ybase && (this.isUserScrolling = false);
              const r2 = s3.ydisp;
              s3.ydisp = Math.max(Math.min(s3.ydisp + e3, s3.ybase), 0), r2 !== s3.ydisp && (t3 || this._onScroll.fire(s3.ydisp));
            }
            scrollPages(e3) {
              this.scrollLines(e3 * (this.rows - 1));
            }
            scrollToTop() {
              this.scrollLines(-this.buffer.ydisp);
            }
            scrollToBottom() {
              this.scrollLines(this.buffer.ybase - this.buffer.ydisp);
            }
            scrollToLine(e3) {
              const t3 = e3 - this.buffer.ydisp;
              0 !== t3 && this.scrollLines(t3);
            }
          };
          c = s2([r(0, n.IOptionsService)], c), t2.BufferService = c;
        }, 7994: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CharsetService = void 0, t2.CharsetService = class {
            constructor() {
              this.glevel = 0, this._charsets = [];
            }
            reset() {
              this.charset = void 0, this._charsets = [], this.glevel = 0;
            }
            setgLevel(e3) {
              this.glevel = e3, this.charset = this._charsets[e3];
            }
            setgCharset(e3, t3) {
              this._charsets[e3] = t3, this.glevel === e3 && (this.charset = t3);
            }
          };
        }, 1753: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreMouseService = void 0;
          const n = i2(2585), o = i2(8460), a = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (e3) => 4 !== e3.button && 1 === e3.action && (e3.ctrl = false, e3.alt = false, e3.shift = false, true) }, VT200: { events: 19, restrict: (e3) => 32 !== e3.action }, DRAG: { events: 23, restrict: (e3) => 32 !== e3.action || 3 !== e3.button }, ANY: { events: 31, restrict: (e3) => true } };
          function h2(e3, t3) {
            let i3 = (e3.ctrl ? 16 : 0) | (e3.shift ? 4 : 0) | (e3.alt ? 8 : 0);
            return 4 === e3.button ? (i3 |= 64, i3 |= e3.action) : (i3 |= 3 & e3.button, 4 & e3.button && (i3 |= 64), 8 & e3.button && (i3 |= 128), 32 === e3.action ? i3 |= 32 : 0 !== e3.action || t3 || (i3 |= 3)), i3;
          }
          const c = String.fromCharCode, l = { DEFAULT: (e3) => {
            const t3 = [h2(e3, false) + 32, e3.col + 32, e3.row + 32];
            return t3[0] > 255 || t3[1] > 255 || t3[2] > 255 ? "" : `\x1B[M${c(t3[0])}${c(t3[1])}${c(t3[2])}`;
          }, SGR: (e3) => {
            const t3 = 0 === e3.action && 4 !== e3.button ? "m" : "M";
            return `\x1B[<${h2(e3, true)};${e3.col};${e3.row}${t3}`;
          }, SGR_PIXELS: (e3) => {
            const t3 = 0 === e3.action && 4 !== e3.button ? "m" : "M";
            return `\x1B[<${h2(e3, true)};${e3.x};${e3.y}${t3}`;
          } };
          let d = class {
            constructor(e3, t3) {
              this._bufferService = e3, this._coreService = t3, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._onProtocolChange = new o.EventEmitter(), this._lastEvent = null;
              for (const e4 of Object.keys(a))
                this.addProtocol(e4, a[e4]);
              for (const e4 of Object.keys(l))
                this.addEncoding(e4, l[e4]);
              this.reset();
            }
            addProtocol(e3, t3) {
              this._protocols[e3] = t3;
            }
            addEncoding(e3, t3) {
              this._encodings[e3] = t3;
            }
            get activeProtocol() {
              return this._activeProtocol;
            }
            get areMouseEventsActive() {
              return 0 !== this._protocols[this._activeProtocol].events;
            }
            set activeProtocol(e3) {
              if (!this._protocols[e3])
                throw new Error(`unknown protocol "${e3}"`);
              this._activeProtocol = e3, this._onProtocolChange.fire(this._protocols[e3].events);
            }
            get activeEncoding() {
              return this._activeEncoding;
            }
            set activeEncoding(e3) {
              if (!this._encodings[e3])
                throw new Error(`unknown encoding "${e3}"`);
              this._activeEncoding = e3;
            }
            reset() {
              this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
            }
            get onProtocolChange() {
              return this._onProtocolChange.event;
            }
            triggerMouseEvent(e3) {
              if (e3.col < 0 || e3.col >= this._bufferService.cols || e3.row < 0 || e3.row >= this._bufferService.rows)
                return false;
              if (4 === e3.button && 32 === e3.action)
                return false;
              if (3 === e3.button && 32 !== e3.action)
                return false;
              if (4 !== e3.button && (2 === e3.action || 3 === e3.action))
                return false;
              if (e3.col++, e3.row++, 32 === e3.action && this._lastEvent && this._equalEvents(this._lastEvent, e3, "SGR_PIXELS" === this._activeEncoding))
                return false;
              if (!this._protocols[this._activeProtocol].restrict(e3))
                return false;
              const t3 = this._encodings[this._activeEncoding](e3);
              return t3 && ("DEFAULT" === this._activeEncoding ? this._coreService.triggerBinaryEvent(t3) : this._coreService.triggerDataEvent(t3, true)), this._lastEvent = e3, true;
            }
            explainEvents(e3) {
              return { down: !!(1 & e3), up: !!(2 & e3), drag: !!(4 & e3), move: !!(8 & e3), wheel: !!(16 & e3) };
            }
            _equalEvents(e3, t3, i3) {
              if (i3) {
                if (e3.x !== t3.x)
                  return false;
                if (e3.y !== t3.y)
                  return false;
              } else {
                if (e3.col !== t3.col)
                  return false;
                if (e3.row !== t3.row)
                  return false;
              }
              return e3.button === t3.button && e3.action === t3.action && e3.ctrl === t3.ctrl && e3.alt === t3.alt && e3.shift === t3.shift;
            }
          };
          d = s2([r(0, n.IBufferService), r(1, n.ICoreService)], d), t2.CoreMouseService = d;
        }, 6975: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.CoreService = void 0;
          const n = i2(2585), o = i2(8460), a = i2(1439), h2 = i2(844), c = Object.freeze({ insertMode: false }), l = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, origin: false, reverseWraparound: false, sendFocus: false, wraparound: true });
          let d = class extends h2.Disposable {
            constructor(e3, t3, i3, s3) {
              super(), this._bufferService = t3, this._logService = i3, this._optionsService = s3, this.isCursorInitialized = false, this.isCursorHidden = false, this._onData = this.register(new o.EventEmitter()), this._onUserInput = this.register(new o.EventEmitter()), this._onBinary = this.register(new o.EventEmitter()), this._scrollToBottom = e3, this.register({ dispose: () => this._scrollToBottom = void 0 }), this.modes = (0, a.clone)(c), this.decPrivateModes = (0, a.clone)(l);
            }
            get onData() {
              return this._onData.event;
            }
            get onUserInput() {
              return this._onUserInput.event;
            }
            get onBinary() {
              return this._onBinary.event;
            }
            reset() {
              this.modes = (0, a.clone)(c), this.decPrivateModes = (0, a.clone)(l);
            }
            triggerDataEvent(e3, t3 = false) {
              if (this._optionsService.rawOptions.disableStdin)
                return;
              const i3 = this._bufferService.buffer;
              i3.ybase !== i3.ydisp && this._scrollToBottom(), t3 && this._onUserInput.fire(), this._logService.debug(`sending data "${e3}"`, () => e3.split("").map((e4) => e4.charCodeAt(0))), this._onData.fire(e3);
            }
            triggerBinaryEvent(e3) {
              this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e3}"`, () => e3.split("").map((e4) => e4.charCodeAt(0))), this._onBinary.fire(e3));
            }
          };
          d = s2([r(1, n.IBufferService), r(2, n.ILogService), r(3, n.IOptionsService)], d), t2.CoreService = d;
        }, 9074: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DecorationService = void 0;
          const s2 = i2(8055), r = i2(8460), n = i2(844), o = i2(6106), a = { xmin: 0, xmax: 0 };
          class h2 extends n.Disposable {
            constructor() {
              super(...arguments), this._decorations = new o.SortedList((e3) => null == e3 ? void 0 : e3.marker.line), this._onDecorationRegistered = this.register(new r.EventEmitter()), this._onDecorationRemoved = this.register(new r.EventEmitter());
            }
            get onDecorationRegistered() {
              return this._onDecorationRegistered.event;
            }
            get onDecorationRemoved() {
              return this._onDecorationRemoved.event;
            }
            get decorations() {
              return this._decorations.values();
            }
            registerDecoration(e3) {
              if (e3.marker.isDisposed)
                return;
              const t3 = new c(e3);
              if (t3) {
                const e4 = t3.marker.onDispose(() => t3.dispose());
                t3.onDispose(() => {
                  t3 && (this._decorations.delete(t3) && this._onDecorationRemoved.fire(t3), e4.dispose());
                }), this._decorations.insert(t3), this._onDecorationRegistered.fire(t3);
              }
              return t3;
            }
            reset() {
              for (const e3 of this._decorations.values())
                e3.dispose();
              this._decorations.clear();
            }
            *getDecorationsAtCell(e3, t3, i3) {
              var s3, r2, n2;
              let o2 = 0, a2 = 0;
              for (const h3 of this._decorations.getKeyIterator(t3))
                o2 = null !== (s3 = h3.options.x) && void 0 !== s3 ? s3 : 0, a2 = o2 + (null !== (r2 = h3.options.width) && void 0 !== r2 ? r2 : 1), e3 >= o2 && e3 < a2 && (!i3 || (null !== (n2 = h3.options.layer) && void 0 !== n2 ? n2 : "bottom") === i3) && (yield h3);
            }
            forEachDecorationAtCell(e3, t3, i3, s3) {
              this._decorations.forEachByKey(t3, (t4) => {
                var r2, n2, o2;
                a.xmin = null !== (r2 = t4.options.x) && void 0 !== r2 ? r2 : 0, a.xmax = a.xmin + (null !== (n2 = t4.options.width) && void 0 !== n2 ? n2 : 1), e3 >= a.xmin && e3 < a.xmax && (!i3 || (null !== (o2 = t4.options.layer) && void 0 !== o2 ? o2 : "bottom") === i3) && s3(t4);
              });
            }
            dispose() {
              for (const e3 of this._decorations.values())
                this._onDecorationRemoved.fire(e3);
              this.reset();
            }
          }
          t2.DecorationService = h2;
          class c extends n.Disposable {
            constructor(e3) {
              super(), this.options = e3, this.isDisposed = false, this.onRenderEmitter = this.register(new r.EventEmitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new r.EventEmitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e3.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
            }
            get backgroundColorRGB() {
              return null === this._cachedBg && (this.options.backgroundColor ? this._cachedBg = s2.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
            }
            get foregroundColorRGB() {
              return null === this._cachedFg && (this.options.foregroundColor ? this._cachedFg = s2.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
            }
            dispose() {
              this._isDisposed || (this._isDisposed = true, this._onDispose.fire(), super.dispose());
            }
          }
        }, 3730: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a = e3.length - 1; a >= 0; a--)
                (r2 = e3[a]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DirtyRowService = void 0;
          const n = i2(2585);
          let o = class {
            constructor(e3) {
              this._bufferService = e3, this.clearRange();
            }
            get start() {
              return this._start;
            }
            get end() {
              return this._end;
            }
            clearRange() {
              this._start = this._bufferService.buffer.y, this._end = this._bufferService.buffer.y;
            }
            markDirty(e3) {
              e3 < this._start ? this._start = e3 : e3 > this._end && (this._end = e3);
            }
            markRangeDirty(e3, t3) {
              if (e3 > t3) {
                const i3 = e3;
                e3 = t3, t3 = i3;
              }
              e3 < this._start && (this._start = e3), t3 > this._end && (this._end = t3);
            }
            markAllDirty() {
              this.markRangeDirty(0, this._bufferService.rows - 1);
            }
          };
          o = s2([r(0, n.IBufferService)], o), t2.DirtyRowService = o;
        }, 4348: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.InstantiationService = t2.ServiceCollection = void 0;
          const s2 = i2(2585), r = i2(8343);
          class n {
            constructor(...e3) {
              this._entries = /* @__PURE__ */ new Map();
              for (const [t3, i3] of e3)
                this.set(t3, i3);
            }
            set(e3, t3) {
              const i3 = this._entries.get(e3);
              return this._entries.set(e3, t3), i3;
            }
            forEach(e3) {
              this._entries.forEach((t3, i3) => e3(i3, t3));
            }
            has(e3) {
              return this._entries.has(e3);
            }
            get(e3) {
              return this._entries.get(e3);
            }
          }
          t2.ServiceCollection = n, t2.InstantiationService = class {
            constructor() {
              this._services = new n(), this._services.set(s2.IInstantiationService, this);
            }
            setService(e3, t3) {
              this._services.set(e3, t3);
            }
            getService(e3) {
              return this._services.get(e3);
            }
            createInstance(e3, ...t3) {
              const i3 = (0, r.getServiceDependencies)(e3).sort((e4, t4) => e4.index - t4.index), s3 = [];
              for (const t4 of i3) {
                const i4 = this._services.get(t4.id);
                if (!i4)
                  throw new Error(`[createInstance] ${e3.name} depends on UNKNOWN service ${t4.id}.`);
                s3.push(i4);
              }
              const n2 = i3.length > 0 ? i3[0].index : t3.length;
              if (t3.length !== n2)
                throw new Error(`[createInstance] First service dependency of ${e3.name} at position ${n2 + 1} conflicts with ${t3.length} static arguments`);
              return new e3(...[...t3, ...s3]);
            }
          };
        }, 7866: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a2 = e3.length - 1; a2 >= 0; a2--)
                (r2 = e3[a2]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.LogService = void 0;
          const n = i2(2585), o = { debug: n.LogLevelEnum.DEBUG, info: n.LogLevelEnum.INFO, warn: n.LogLevelEnum.WARN, error: n.LogLevelEnum.ERROR, off: n.LogLevelEnum.OFF };
          let a = class {
            constructor(e3) {
              this._optionsService = e3, this.logLevel = n.LogLevelEnum.OFF, this._updateLogLevel(), this._optionsService.onOptionChange((e4) => {
                "logLevel" === e4 && this._updateLogLevel();
              });
            }
            _updateLogLevel() {
              this.logLevel = o[this._optionsService.rawOptions.logLevel];
            }
            _evalLazyOptionalParams(e3) {
              for (let t3 = 0; t3 < e3.length; t3++)
                "function" == typeof e3[t3] && (e3[t3] = e3[t3]());
            }
            _log(e3, t3, i3) {
              this._evalLazyOptionalParams(i3), e3.call(console, "xterm.js: " + t3, ...i3);
            }
            debug(e3, ...t3) {
              this.logLevel <= n.LogLevelEnum.DEBUG && this._log(console.log, e3, t3);
            }
            info(e3, ...t3) {
              this.logLevel <= n.LogLevelEnum.INFO && this._log(console.info, e3, t3);
            }
            warn(e3, ...t3) {
              this.logLevel <= n.LogLevelEnum.WARN && this._log(console.warn, e3, t3);
            }
            error(e3, ...t3) {
              this.logLevel <= n.LogLevelEnum.ERROR && this._log(console.error, e3, t3);
            }
          };
          a = s2([r(0, n.IOptionsService)], a), t2.LogService = a;
        }, 7302: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.OptionsService = t2.DEFAULT_OPTIONS = void 0;
          const s2 = i2(8460), r = i2(6114);
          t2.DEFAULT_OPTIONS = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, customGlyphs: true, drawBoldTextInBrightColors: true, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "courier-new, courier, monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", scrollback: 1e3, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, rightClickSelectsWord: r.isMac, windowOptions: {}, windowsMode: false, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRulerWidth: 0 };
          const n = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
          t2.OptionsService = class {
            constructor(e3) {
              this._onOptionChange = new s2.EventEmitter();
              const i3 = Object.assign({}, t2.DEFAULT_OPTIONS);
              for (const t3 in e3)
                if (t3 in i3)
                  try {
                    const s3 = e3[t3];
                    i3[t3] = this._sanitizeAndValidateOption(t3, s3);
                  } catch (e4) {
                    console.error(e4);
                  }
              this.rawOptions = i3, this.options = Object.assign({}, i3), this._setupOptions();
            }
            get onOptionChange() {
              return this._onOptionChange.event;
            }
            _setupOptions() {
              const e3 = (e4) => {
                if (!(e4 in t2.DEFAULT_OPTIONS))
                  throw new Error(`No option with key "${e4}"`);
                return this.rawOptions[e4];
              }, i3 = (e4, i4) => {
                if (!(e4 in t2.DEFAULT_OPTIONS))
                  throw new Error(`No option with key "${e4}"`);
                i4 = this._sanitizeAndValidateOption(e4, i4), this.rawOptions[e4] !== i4 && (this.rawOptions[e4] = i4, this._onOptionChange.fire(e4));
              };
              for (const t3 in this.rawOptions) {
                const s3 = { get: e3.bind(this, t3), set: i3.bind(this, t3) };
                Object.defineProperty(this.options, t3, s3);
              }
            }
            _sanitizeAndValidateOption(e3, i3) {
              switch (e3) {
                case "cursorStyle":
                  if (i3 || (i3 = t2.DEFAULT_OPTIONS[e3]), !function(e4) {
                    return "block" === e4 || "underline" === e4 || "bar" === e4;
                  }(i3))
                    throw new Error(`"${i3}" is not a valid value for ${e3}`);
                  break;
                case "wordSeparator":
                  i3 || (i3 = t2.DEFAULT_OPTIONS[e3]);
                  break;
                case "fontWeight":
                case "fontWeightBold":
                  if ("number" == typeof i3 && 1 <= i3 && i3 <= 1e3)
                    break;
                  i3 = n.includes(i3) ? i3 : t2.DEFAULT_OPTIONS[e3];
                  break;
                case "cursorWidth":
                  i3 = Math.floor(i3);
                case "lineHeight":
                case "tabStopWidth":
                  if (i3 < 1)
                    throw new Error(`${e3} cannot be less than 1, value: ${i3}`);
                  break;
                case "minimumContrastRatio":
                  i3 = Math.max(1, Math.min(21, Math.round(10 * i3) / 10));
                  break;
                case "scrollback":
                  if ((i3 = Math.min(i3, 4294967295)) < 0)
                    throw new Error(`${e3} cannot be less than 0, value: ${i3}`);
                  break;
                case "fastScrollSensitivity":
                case "scrollSensitivity":
                  if (i3 <= 0)
                    throw new Error(`${e3} cannot be less than or equal to 0, value: ${i3}`);
                case "rows":
                case "cols":
                  if (!i3 && 0 !== i3)
                    throw new Error(`${e3} must be numeric, value: ${i3}`);
              }
              return i3;
            }
          };
        }, 2660: function(e2, t2, i2) {
          var s2 = this && this.__decorate || function(e3, t3, i3, s3) {
            var r2, n2 = arguments.length, o2 = n2 < 3 ? t3 : null === s3 ? s3 = Object.getOwnPropertyDescriptor(t3, i3) : s3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
              o2 = Reflect.decorate(e3, t3, i3, s3);
            else
              for (var a = e3.length - 1; a >= 0; a--)
                (r2 = e3[a]) && (o2 = (n2 < 3 ? r2(o2) : n2 > 3 ? r2(t3, i3, o2) : r2(t3, i3)) || o2);
            return n2 > 3 && o2 && Object.defineProperty(t3, i3, o2), o2;
          }, r = this && this.__param || function(e3, t3) {
            return function(i3, s3) {
              t3(i3, s3, e3);
            };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.OscLinkService = void 0;
          const n = i2(2585);
          let o = class {
            constructor(e3) {
              this._bufferService = e3, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
            }
            registerLink(e3) {
              const t3 = this._bufferService.buffer;
              if (void 0 === e3.id) {
                const i4 = t3.addMarker(t3.ybase + t3.y), s4 = { data: e3, id: this._nextId++, lines: [i4] };
                return i4.onDispose(() => this._removeMarkerFromLink(s4, i4)), this._dataByLinkId.set(s4.id, s4), s4.id;
              }
              const i3 = e3, s3 = this._getEntryIdKey(i3), r2 = this._entriesWithId.get(s3);
              if (r2)
                return this.addLineToLink(r2.id, t3.ybase + t3.y), r2.id;
              const n2 = t3.addMarker(t3.ybase + t3.y), o2 = { id: this._nextId++, key: this._getEntryIdKey(i3), data: i3, lines: [n2] };
              return n2.onDispose(() => this._removeMarkerFromLink(o2, n2)), this._entriesWithId.set(o2.key, o2), this._dataByLinkId.set(o2.id, o2), o2.id;
            }
            addLineToLink(e3, t3) {
              const i3 = this._dataByLinkId.get(e3);
              if (i3 && i3.lines.every((e4) => e4.line !== t3)) {
                const e4 = this._bufferService.buffer.addMarker(t3);
                i3.lines.push(e4), e4.onDispose(() => this._removeMarkerFromLink(i3, e4));
              }
            }
            getLinkData(e3) {
              var t3;
              return null === (t3 = this._dataByLinkId.get(e3)) || void 0 === t3 ? void 0 : t3.data;
            }
            _getEntryIdKey(e3) {
              return `${e3.id};;${e3.uri}`;
            }
            _removeMarkerFromLink(e3, t3) {
              const i3 = e3.lines.indexOf(t3);
              -1 !== i3 && (e3.lines.splice(i3, 1), 0 === e3.lines.length && (void 0 !== e3.data.id && this._entriesWithId.delete(e3.key), this._dataByLinkId.delete(e3.id)));
            }
          };
          o = s2([r(0, n.IBufferService)], o), t2.OscLinkService = o;
        }, 8343: (e2, t2) => {
          function i2(e3, t3, i3) {
            t3.di$target === t3 ? t3.di$dependencies.push({ id: e3, index: i3 }) : (t3.di$dependencies = [{ id: e3, index: i3 }], t3.di$target = t3);
          }
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createDecorator = t2.getServiceDependencies = t2.serviceRegistry = void 0, t2.serviceRegistry = /* @__PURE__ */ new Map(), t2.getServiceDependencies = function(e3) {
            return e3.di$dependencies || [];
          }, t2.createDecorator = function(e3) {
            if (t2.serviceRegistry.has(e3))
              return t2.serviceRegistry.get(e3);
            const s2 = function(e4, t3, r) {
              if (3 !== arguments.length)
                throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
              i2(s2, e4, r);
            };
            return s2.toString = () => e3, t2.serviceRegistry.set(e3, s2), s2;
          };
        }, 2585: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.IDecorationService = t2.IUnicodeService = t2.IOscLinkService = t2.IOptionsService = t2.ILogService = t2.LogLevelEnum = t2.IInstantiationService = t2.IDirtyRowService = t2.ICharsetService = t2.ICoreService = t2.ICoreMouseService = t2.IBufferService = void 0;
          const s2 = i2(8343);
          var r;
          t2.IBufferService = (0, s2.createDecorator)("BufferService"), t2.ICoreMouseService = (0, s2.createDecorator)("CoreMouseService"), t2.ICoreService = (0, s2.createDecorator)("CoreService"), t2.ICharsetService = (0, s2.createDecorator)("CharsetService"), t2.IDirtyRowService = (0, s2.createDecorator)("DirtyRowService"), t2.IInstantiationService = (0, s2.createDecorator)("InstantiationService"), (r = t2.LogLevelEnum || (t2.LogLevelEnum = {}))[r.DEBUG = 0] = "DEBUG", r[r.INFO = 1] = "INFO", r[r.WARN = 2] = "WARN", r[r.ERROR = 3] = "ERROR", r[r.OFF = 4] = "OFF", t2.ILogService = (0, s2.createDecorator)("LogService"), t2.IOptionsService = (0, s2.createDecorator)("OptionsService"), t2.IOscLinkService = (0, s2.createDecorator)("OscLinkService"), t2.IUnicodeService = (0, s2.createDecorator)("UnicodeService"), t2.IDecorationService = (0, s2.createDecorator)("DecorationService");
        }, 1480: (e2, t2, i2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.UnicodeService = void 0;
          const s2 = i2(8460), r = i2(225);
          t2.UnicodeService = class {
            constructor() {
              this._providers = /* @__PURE__ */ Object.create(null), this._active = "", this._onChange = new s2.EventEmitter();
              const e3 = new r.UnicodeV6();
              this.register(e3), this._active = e3.version, this._activeProvider = e3;
            }
            get onChange() {
              return this._onChange.event;
            }
            get versions() {
              return Object.keys(this._providers);
            }
            get activeVersion() {
              return this._active;
            }
            set activeVersion(e3) {
              if (!this._providers[e3])
                throw new Error(`unknown Unicode version "${e3}"`);
              this._active = e3, this._activeProvider = this._providers[e3], this._onChange.fire(e3);
            }
            register(e3) {
              this._providers[e3.version] = e3;
            }
            wcwidth(e3) {
              return this._activeProvider.wcwidth(e3);
            }
            getStringCellWidth(e3) {
              let t3 = 0;
              const i3 = e3.length;
              for (let s3 = 0; s3 < i3; ++s3) {
                let r2 = e3.charCodeAt(s3);
                if (55296 <= r2 && r2 <= 56319) {
                  if (++s3 >= i3)
                    return t3 + this.wcwidth(r2);
                  const n = e3.charCodeAt(s3);
                  56320 <= n && n <= 57343 ? r2 = 1024 * (r2 - 55296) + n - 56320 + 65536 : t3 += this.wcwidth(n);
                }
                t3 += this.wcwidth(r2);
              }
              return t3;
            }
          };
        } }, t = {};
        function i(s2) {
          var r = t[s2];
          if (void 0 !== r)
            return r.exports;
          var n = t[s2] = { exports: {} };
          return e[s2].call(n.exports, n, n.exports, i), n.exports;
        }
        var s = {};
        return (() => {
          var e2 = s;
          Object.defineProperty(e2, "__esModule", { value: true }), e2.Terminal = void 0;
          const t2 = i(3236), r = i(9042), n = i(7975), o = i(7090), a = i(5741), h2 = i(8285), c = ["cols", "rows"];
          e2.Terminal = class {
            constructor(e3) {
              this._core = new t2.Terminal(e3), this._addonManager = new a.AddonManager(), this._publicOptions = Object.assign({}, this._core.options);
              const i2 = (e4) => this._core.options[e4], s2 = (e4, t3) => {
                this._checkReadonlyOptions(e4), this._core.options[e4] = t3;
              };
              for (const e4 in this._core.options) {
                const t3 = { get: i2.bind(this, e4), set: s2.bind(this, e4) };
                Object.defineProperty(this._publicOptions, e4, t3);
              }
            }
            _checkReadonlyOptions(e3) {
              if (c.includes(e3))
                throw new Error(`Option "${e3}" can only be set in the constructor`);
            }
            _checkProposedApi() {
              if (!this._core.optionsService.rawOptions.allowProposedApi)
                throw new Error("You must set the allowProposedApi option to true to use proposed API");
            }
            get onBell() {
              return this._core.onBell;
            }
            get onBinary() {
              return this._core.onBinary;
            }
            get onCursorMove() {
              return this._core.onCursorMove;
            }
            get onData() {
              return this._core.onData;
            }
            get onKey() {
              return this._core.onKey;
            }
            get onLineFeed() {
              return this._core.onLineFeed;
            }
            get onRender() {
              return this._core.onRender;
            }
            get onResize() {
              return this._core.onResize;
            }
            get onScroll() {
              return this._core.onScroll;
            }
            get onSelectionChange() {
              return this._core.onSelectionChange;
            }
            get onTitleChange() {
              return this._core.onTitleChange;
            }
            get onWriteParsed() {
              return this._core.onWriteParsed;
            }
            get element() {
              return this._core.element;
            }
            get parser() {
              return this._checkProposedApi(), this._parser || (this._parser = new n.ParserApi(this._core)), this._parser;
            }
            get unicode() {
              return this._checkProposedApi(), new o.UnicodeApi(this._core);
            }
            get textarea() {
              return this._core.textarea;
            }
            get rows() {
              return this._core.rows;
            }
            get cols() {
              return this._core.cols;
            }
            get buffer() {
              return this._checkProposedApi(), this._buffer || (this._buffer = new h2.BufferNamespaceApi(this._core)), this._buffer;
            }
            get markers() {
              return this._checkProposedApi(), this._core.markers;
            }
            get modes() {
              const e3 = this._core.coreService.decPrivateModes;
              let t3 = "none";
              switch (this._core.coreMouseService.activeProtocol) {
                case "X10":
                  t3 = "x10";
                  break;
                case "VT200":
                  t3 = "vt200";
                  break;
                case "DRAG":
                  t3 = "drag";
                  break;
                case "ANY":
                  t3 = "any";
              }
              return { applicationCursorKeysMode: e3.applicationCursorKeys, applicationKeypadMode: e3.applicationKeypad, bracketedPasteMode: e3.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: t3, originMode: e3.origin, reverseWraparoundMode: e3.reverseWraparound, sendFocusMode: e3.sendFocus, wraparoundMode: e3.wraparound };
            }
            get options() {
              return this._publicOptions;
            }
            set options(e3) {
              for (const t3 in e3)
                this._publicOptions[t3] = e3[t3];
            }
            blur() {
              this._core.blur();
            }
            focus() {
              this._core.focus();
            }
            resize(e3, t3) {
              this._verifyIntegers(e3, t3), this._core.resize(e3, t3);
            }
            open(e3) {
              this._core.open(e3);
            }
            attachCustomKeyEventHandler(e3) {
              this._core.attachCustomKeyEventHandler(e3);
            }
            registerLinkProvider(e3) {
              return this._checkProposedApi(), this._core.registerLinkProvider(e3);
            }
            registerCharacterJoiner(e3) {
              return this._checkProposedApi(), this._core.registerCharacterJoiner(e3);
            }
            deregisterCharacterJoiner(e3) {
              this._checkProposedApi(), this._core.deregisterCharacterJoiner(e3);
            }
            registerMarker(e3 = 0) {
              return this._verifyIntegers(e3), this._core.addMarker(e3);
            }
            registerDecoration(e3) {
              var t3, i2, s2;
              return this._checkProposedApi(), this._verifyPositiveIntegers(null !== (t3 = e3.x) && void 0 !== t3 ? t3 : 0, null !== (i2 = e3.width) && void 0 !== i2 ? i2 : 0, null !== (s2 = e3.height) && void 0 !== s2 ? s2 : 0), this._core.registerDecoration(e3);
            }
            hasSelection() {
              return this._core.hasSelection();
            }
            select(e3, t3, i2) {
              this._verifyIntegers(e3, t3, i2), this._core.select(e3, t3, i2);
            }
            getSelection() {
              return this._core.getSelection();
            }
            getSelectionPosition() {
              return this._core.getSelectionPosition();
            }
            clearSelection() {
              this._core.clearSelection();
            }
            selectAll() {
              this._core.selectAll();
            }
            selectLines(e3, t3) {
              this._verifyIntegers(e3, t3), this._core.selectLines(e3, t3);
            }
            dispose() {
              this._addonManager.dispose(), this._core.dispose();
            }
            scrollLines(e3) {
              this._verifyIntegers(e3), this._core.scrollLines(e3);
            }
            scrollPages(e3) {
              this._verifyIntegers(e3), this._core.scrollPages(e3);
            }
            scrollToTop() {
              this._core.scrollToTop();
            }
            scrollToBottom() {
              this._core.scrollToBottom();
            }
            scrollToLine(e3) {
              this._verifyIntegers(e3), this._core.scrollToLine(e3);
            }
            clear() {
              this._core.clear();
            }
            write(e3, t3) {
              this._core.write(e3, t3);
            }
            writeln(e3, t3) {
              this._core.write(e3), this._core.write("\r\n", t3);
            }
            paste(e3) {
              this._core.paste(e3);
            }
            refresh(e3, t3) {
              this._verifyIntegers(e3, t3), this._core.refresh(e3, t3);
            }
            reset() {
              this._core.reset();
            }
            clearTextureAtlas() {
              this._core.clearTextureAtlas();
            }
            loadAddon(e3) {
              return this._addonManager.loadAddon(this, e3);
            }
            static get strings() {
              return r;
            }
            _verifyIntegers(...e3) {
              for (const t3 of e3)
                if (t3 === 1 / 0 || isNaN(t3) || t3 % 1 != 0)
                  throw new Error("This API only accepts integers");
            }
            _verifyPositiveIntegers(...e3) {
              for (const t3 of e3)
                if (t3 && (t3 === 1 / 0 || isNaN(t3) || t3 % 1 != 0 || t3 < 0))
                  throw new Error("This API only accepts positive integers");
            }
          };
        })(), s;
      })();
    });
  }
});

// ../../.yarn/__virtual__/xterm-addon-fit-virtual-13b6623221/0/global/cache/xterm-addon-fit-npm-0.6.0-ff7ec8c164-9.zip/node_modules/xterm-addon-fit/lib/xterm-addon-fit.js
var require_xterm_addon_fit = __commonJS({
  "../../.yarn/__virtual__/xterm-addon-fit-virtual-13b6623221/0/global/cache/xterm-addon-fit-npm-0.6.0-ff7ec8c164-9.zip/node_modules/xterm-addon-fit/lib/xterm-addon-fit.js"(exports, module) {
    init_define_process();
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.FitAddon = t() : e.FitAddon = t();
    }(self, function() {
      return (() => {
        "use strict";
        var e = {};
        return (() => {
          var t = e;
          Object.defineProperty(t, "__esModule", { value: true }), t.FitAddon = void 0, t.FitAddon = class {
            constructor() {
            }
            activate(e2) {
              this._terminal = e2;
            }
            dispose() {
            }
            fit() {
              const e2 = this.proposeDimensions();
              if (!e2 || !this._terminal || isNaN(e2.cols) || isNaN(e2.rows))
                return;
              const t2 = this._terminal._core;
              this._terminal.rows === e2.rows && this._terminal.cols === e2.cols || (t2._renderService.clear(), this._terminal.resize(e2.cols, e2.rows));
            }
            proposeDimensions() {
              if (!this._terminal)
                return;
              if (!this._terminal.element || !this._terminal.element.parentElement)
                return;
              const e2 = this._terminal._core;
              if (0 === e2._renderService.dimensions.actualCellWidth || 0 === e2._renderService.dimensions.actualCellHeight)
                return;
              const t2 = 0 === this._terminal.options.scrollback ? 0 : e2.viewport.scrollBarWidth, r = window.getComputedStyle(this._terminal.element.parentElement), i = parseInt(r.getPropertyValue("height")), n = Math.max(0, parseInt(r.getPropertyValue("width"))), o = window.getComputedStyle(this._terminal.element), s = i - (parseInt(o.getPropertyValue("padding-top")) + parseInt(o.getPropertyValue("padding-bottom"))), a = n - (parseInt(o.getPropertyValue("padding-right")) + parseInt(o.getPropertyValue("padding-left"))) - t2;
              return { cols: Math.max(2, Math.floor(a / e2._renderService.dimensions.actualCellWidth)), rows: Math.max(1, Math.floor(s / e2._renderService.dimensions.actualCellHeight)) };
            }
          };
        })(), e;
      })();
    });
  }
});

// ../../.yarn/__virtual__/xterm-addon-serialize-virtual-f44aac55fb/0/global/cache/xterm-addon-serialize-npm-0.8.0-06e54c9bc9-9.zip/node_modules/xterm-addon-serialize/lib/xterm-addon-serialize.js
var require_xterm_addon_serialize = __commonJS({
  "../../.yarn/__virtual__/xterm-addon-serialize-virtual-f44aac55fb/0/global/cache/xterm-addon-serialize-npm-0.8.0-06e54c9bc9-9.zip/node_modules/xterm-addon-serialize/lib/xterm-addon-serialize.js"(exports, module) {
    init_define_process();
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.SerializeAddon = e() : t.SerializeAddon = e();
    }(exports, function() {
      return (() => {
        "use strict";
        var t = {};
        return (() => {
          var e = t;
          function s(t2, e2, s2) {
            return Math.max(e2, Math.min(t2, s2));
          }
          Object.defineProperty(e, "__esModule", { value: true }), e.HTMLSerializeHandler = e.SerializeAddon = void 0;
          class i {
            constructor(t2) {
              this._buffer = t2;
            }
            serialize(t2) {
              const e2 = this._buffer.getNullCell(), s2 = this._buffer.getNullCell();
              let i2 = e2;
              const r2 = t2.start.x, l2 = t2.end.x, o2 = t2.start.y, n2 = t2.end.y;
              this._beforeSerialize(l2 - r2, r2, l2);
              for (let h3 = r2; h3 <= l2; h3++) {
                const r3 = this._buffer.getLine(h3);
                if (r3) {
                  const l3 = h3 !== t2.start.x ? 0 : o2, u = h3 !== t2.end.x ? r3.length : n2;
                  for (let t3 = l3; t3 < u; t3++) {
                    const l4 = r3.getCell(t3, i2 === e2 ? s2 : e2);
                    l4 ? (this._nextCell(l4, i2, h3, t3), i2 = l4) : console.warn(`Can't get cell at row=${h3}, col=${t3}`);
                  }
                }
                this._rowEnd(h3, h3 === l2);
              }
              return this._afterSerialize(), this._serializeString();
            }
            _nextCell(t2, e2, s2, i2) {
            }
            _rowEnd(t2, e2) {
            }
            _beforeSerialize(t2, e2, s2) {
            }
            _afterSerialize() {
            }
            _serializeString() {
              return "";
            }
          }
          function r(t2, e2) {
            return t2.getFgColorMode() === e2.getFgColorMode() && t2.getFgColor() === e2.getFgColor();
          }
          function l(t2, e2) {
            return t2.getBgColorMode() === e2.getBgColorMode() && t2.getBgColor() === e2.getBgColor();
          }
          function o(t2, e2) {
            return t2.isInverse() === e2.isInverse() && t2.isBold() === e2.isBold() && t2.isUnderline() === e2.isUnderline() && t2.isBlink() === e2.isBlink() && t2.isInvisible() === e2.isInvisible() && t2.isItalic() === e2.isItalic() && t2.isDim() === e2.isDim() && t2.isStrikethrough() === e2.isStrikethrough();
          }
          class n extends i {
            constructor(t2, e2) {
              super(t2), this._terminal = e2, this._rowIndex = 0, this._allRows = new Array(), this._allRowSeparators = new Array(), this._currentRow = "", this._nullCellCount = 0, this._cursorStyle = this._buffer.getNullCell(), this._cursorStyleRow = 0, this._cursorStyleCol = 0, this._backgroundCell = this._buffer.getNullCell(), this._firstRow = 0, this._lastCursorRow = 0, this._lastCursorCol = 0, this._lastContentCursorRow = 0, this._lastContentCursorCol = 0, this._thisRowLastChar = this._buffer.getNullCell(), this._thisRowLastSecondChar = this._buffer.getNullCell(), this._nextRowFirstChar = this._buffer.getNullCell();
            }
            _beforeSerialize(t2, e2, s2) {
              this._allRows = new Array(t2), this._lastContentCursorRow = e2, this._lastCursorRow = e2, this._firstRow = e2;
            }
            _rowEnd(t2, e2) {
              var s2;
              this._nullCellCount > 0 && !l(this._cursorStyle, this._backgroundCell) && (this._currentRow += `\x1B[${this._nullCellCount}X`);
              let i2 = "";
              if (!e2) {
                t2 - this._firstRow >= this._terminal.rows && (null === (s2 = this._buffer.getLine(this._cursorStyleRow)) || void 0 === s2 || s2.getCell(this._cursorStyleCol, this._backgroundCell));
                const e3 = this._buffer.getLine(t2), r2 = this._buffer.getLine(t2 + 1);
                if (r2.isWrapped) {
                  i2 = "";
                  const s3 = e3.getCell(e3.length - 1, this._thisRowLastChar), o2 = e3.getCell(e3.length - 2, this._thisRowLastSecondChar), n2 = r2.getCell(0, this._nextRowFirstChar), h3 = n2.getWidth() > 1;
                  let u = false;
                  (n2.getChars() && h3 ? this._nullCellCount <= 1 : this._nullCellCount <= 0) && ((s3.getChars() || 0 === s3.getWidth()) && l(s3, n2) && (u = true), h3 && (o2.getChars() || 0 === o2.getWidth()) && l(s3, n2) && l(o2, n2) && (u = true)), u || (i2 = "-".repeat(this._nullCellCount + 1), i2 += "\x1B[1D\x1B[1X", this._nullCellCount > 0 && (i2 += "\x1B[A", i2 += `\x1B[${e3.length - this._nullCellCount}C`, i2 += `\x1B[${this._nullCellCount}X`, i2 += `\x1B[${e3.length - this._nullCellCount}D`, i2 += "\x1B[B"), this._lastContentCursorRow = t2 + 1, this._lastContentCursorCol = 0, this._lastCursorRow = t2 + 1, this._lastCursorCol = 0);
                } else
                  i2 = "\r\n", this._lastCursorRow = t2 + 1, this._lastCursorCol = 0;
              }
              this._allRows[this._rowIndex] = this._currentRow, this._allRowSeparators[this._rowIndex++] = i2, this._currentRow = "", this._nullCellCount = 0;
            }
            _diffStyle(t2, e2) {
              const s2 = [], i2 = !r(t2, e2), n2 = !l(t2, e2), h3 = !o(t2, e2);
              if (i2 || n2 || h3)
                if (t2.isAttributeDefault())
                  e2.isAttributeDefault() || s2.push(0);
                else {
                  if (i2) {
                    const e3 = t2.getFgColor();
                    t2.isFgRGB() ? s2.push(38, 2, e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3) : t2.isFgPalette() ? e3 >= 16 ? s2.push(38, 5, e3) : s2.push(8 & e3 ? 90 + (7 & e3) : 30 + (7 & e3)) : s2.push(39);
                  }
                  if (n2) {
                    const e3 = t2.getBgColor();
                    t2.isBgRGB() ? s2.push(48, 2, e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3) : t2.isBgPalette() ? e3 >= 16 ? s2.push(48, 5, e3) : s2.push(8 & e3 ? 100 + (7 & e3) : 40 + (7 & e3)) : s2.push(49);
                  }
                  h3 && (t2.isInverse() !== e2.isInverse() && s2.push(t2.isInverse() ? 7 : 27), t2.isBold() !== e2.isBold() && s2.push(t2.isBold() ? 1 : 22), t2.isUnderline() !== e2.isUnderline() && s2.push(t2.isUnderline() ? 4 : 24), t2.isBlink() !== e2.isBlink() && s2.push(t2.isBlink() ? 5 : 25), t2.isInvisible() !== e2.isInvisible() && s2.push(t2.isInvisible() ? 8 : 28), t2.isItalic() !== e2.isItalic() && s2.push(t2.isItalic() ? 3 : 23), t2.isDim() !== e2.isDim() && s2.push(t2.isDim() ? 2 : 22), t2.isStrikethrough() !== e2.isStrikethrough() && s2.push(t2.isStrikethrough() ? 9 : 29));
                }
              return s2;
            }
            _nextCell(t2, e2, s2, i2) {
              if (0 === t2.getWidth())
                return;
              const r2 = "" === t2.getChars(), o2 = this._diffStyle(t2, this._cursorStyle);
              if (r2 ? !l(this._cursorStyle, t2) : o2.length > 0) {
                this._nullCellCount > 0 && (l(this._cursorStyle, this._backgroundCell) || (this._currentRow += `\x1B[${this._nullCellCount}X`), this._currentRow += `\x1B[${this._nullCellCount}C`, this._nullCellCount = 0), this._lastContentCursorRow = this._lastCursorRow = s2, this._lastContentCursorCol = this._lastCursorCol = i2, this._currentRow += `\x1B[${o2.join(";")}m`;
                const t3 = this._buffer.getLine(s2);
                void 0 !== t3 && (t3.getCell(i2, this._cursorStyle), this._cursorStyleRow = s2, this._cursorStyleCol = i2);
              }
              r2 ? this._nullCellCount += t2.getWidth() : (this._nullCellCount > 0 && (l(this._cursorStyle, this._backgroundCell) || (this._currentRow += `\x1B[${this._nullCellCount}X`), this._currentRow += `\x1B[${this._nullCellCount}C`, this._nullCellCount = 0), this._currentRow += t2.getChars(), this._lastContentCursorRow = this._lastCursorRow = s2, this._lastContentCursorCol = this._lastCursorCol = i2 + t2.getWidth());
            }
            _serializeString() {
              let t2 = this._allRows.length;
              this._buffer.length - this._firstRow <= this._terminal.rows && (t2 = this._lastContentCursorRow + 1 - this._firstRow, this._lastCursorCol = this._lastContentCursorCol, this._lastCursorRow = this._lastContentCursorRow);
              let e2 = "";
              for (let s3 = 0; s3 < t2; s3++)
                e2 += this._allRows[s3], s3 + 1 < t2 && (e2 += this._allRowSeparators[s3]);
              const s2 = this._buffer.baseY + this._buffer.cursorY, i2 = this._buffer.cursorX;
              var r2;
              (s2 !== this._lastCursorRow || i2 !== this._lastCursorCol) && ((r2 = s2 - this._lastCursorRow) > 0 ? e2 += `\x1B[${r2}B` : r2 < 0 && (e2 += `\x1B[${-r2}A`), ((t3) => {
                t3 > 0 ? e2 += `\x1B[${t3}C` : t3 < 0 && (e2 += `\x1B[${-t3}D`);
              })(i2 - this._lastCursorCol));
              const l2 = this._terminal._core._inputHandler._curAttrData, o2 = this._diffStyle(l2, this._cursorStyle);
              return o2.length > 0 && (e2 += `\x1B[${o2.join(";")}m`), e2;
            }
          }
          e.SerializeAddon = class {
            constructor() {
            }
            activate(t2) {
              this._terminal = t2;
            }
            _serializeBuffer(t2, e2, i2) {
              const r2 = e2.length, l2 = new n(e2, t2), o2 = void 0 === i2 ? r2 : s(i2 + t2.rows, 0, r2);
              return l2.serialize({ start: { x: r2 - o2, y: 0 }, end: { x: r2 - 1, y: t2.cols } });
            }
            _serializeBufferAsHTML(t2, e2) {
              var i2, r2;
              const l2 = t2.buffer.active, o2 = new h2(l2, t2, e2);
              if (null === (i2 = e2.onlySelection) || void 0 === i2 || !i2) {
                const i3 = l2.length, r3 = e2.scrollback, n3 = void 0 === r3 ? i3 : s(r3 + t2.rows, 0, i3);
                return o2.serialize({ start: { x: i3 - n3, y: 0 }, end: { x: i3 - 1, y: t2.cols } });
              }
              const n2 = null === (r2 = this._terminal) || void 0 === r2 ? void 0 : r2.getSelectionPosition();
              return void 0 !== n2 ? o2.serialize({ start: { x: n2.start.y, y: n2.start.x }, end: { x: n2.end.y, y: n2.end.x } }) : "";
            }
            _serializeModes(t2) {
              let e2 = "";
              const s2 = t2.modes;
              if (s2.applicationCursorKeysMode && (e2 += "\x1B[?1h"), s2.applicationKeypadMode && (e2 += "\x1B[?66h"), s2.bracketedPasteMode && (e2 += "\x1B[?2004h"), s2.insertMode && (e2 += "\x1B[4h"), s2.originMode && (e2 += "\x1B[?6h"), s2.reverseWraparoundMode && (e2 += "\x1B[?45h"), s2.sendFocusMode && (e2 += "\x1B[?1004h"), false === s2.wraparoundMode && (e2 += "\x1B[?7l"), "none" !== s2.mouseTrackingMode)
                switch (s2.mouseTrackingMode) {
                  case "x10":
                    e2 += "\x1B[?9h";
                    break;
                  case "vt200":
                    e2 += "\x1B[?1000h";
                    break;
                  case "drag":
                    e2 += "\x1B[?1002h";
                    break;
                  case "any":
                    e2 += "\x1B[?1003h";
                }
              return e2;
            }
            serialize(t2) {
              if (!this._terminal)
                throw new Error("Cannot use addon until it has been loaded");
              let e2 = this._serializeBuffer(this._terminal, this._terminal.buffer.normal, null == t2 ? void 0 : t2.scrollback);
              return (null == t2 ? void 0 : t2.excludeAltBuffer) || "alternate" !== this._terminal.buffer.active.type || (e2 += `\x1B[?1049h\x1B[H${this._serializeBuffer(this._terminal, this._terminal.buffer.alternate, void 0)}`), (null == t2 ? void 0 : t2.excludeModes) || (e2 += this._serializeModes(this._terminal)), e2;
            }
            serializeAsHTML(t2) {
              if (!this._terminal)
                throw new Error("Cannot use addon until it has been loaded");
              return this._serializeBufferAsHTML(this._terminal, t2 || {});
            }
            dispose() {
            }
          };
          class h2 extends i {
            constructor(t2, e2, s2) {
              super(t2), this._terminal = e2, this._options = s2, this._currentRow = "", this._htmlContent = "", this._colors = e2._core._colorManager.colors;
            }
            _padStart(t2, e2, s2) {
              return e2 >>= 0, s2 = null != s2 ? s2 : " ", t2.length > e2 ? t2 : ((e2 -= t2.length) > s2.length && (s2 += s2.repeat(e2 / s2.length)), s2.slice(0, e2) + t2);
            }
            _beforeSerialize(t2, e2, s2) {
              var i2, r2, l2, o2, n2;
              this._htmlContent += "<html><body><!--StartFragment--><pre>";
              let h3 = "#000000", u = "#ffffff";
              null !== (i2 = this._options.includeGlobalBackground) && void 0 !== i2 && i2 && (h3 = null !== (l2 = null === (r2 = this._terminal.options.theme) || void 0 === r2 ? void 0 : r2.foreground) && void 0 !== l2 ? l2 : "#ffffff", u = null !== (n2 = null === (o2 = this._terminal.options.theme) || void 0 === o2 ? void 0 : o2.background) && void 0 !== n2 ? n2 : "#000000");
              const a = [];
              a.push("color: " + h3 + ";"), a.push("background-color: " + u + ";"), a.push("font-family: " + this._terminal.options.fontFamily + ";"), a.push("font-size: " + this._terminal.options.fontSize + "px;"), this._htmlContent += "<div style='" + a.join(" ") + "'>";
            }
            _afterSerialize() {
              this._htmlContent += "</div>", this._htmlContent += "</pre><!--EndFragment--></body></html>";
            }
            _rowEnd(t2, e2) {
              this._htmlContent += "<div><span>" + this._currentRow + "</span></div>", this._currentRow = "";
            }
            _getHexColor(t2, e2) {
              const s2 = e2 ? t2.getFgColor() : t2.getBgColor();
              return (e2 ? t2.isFgRGB() : t2.isBgRGB()) ? [s2 >> 16 & 255, s2 >> 8 & 255, 255 & s2].map((t3) => this._padStart(t3.toString(16), 2, "0")).join("") : (e2 ? t2.isFgPalette() : t2.isBgPalette()) ? this._colors.ansi[s2].css : void 0;
            }
            _diffStyle(t2, e2) {
              const s2 = [], i2 = !r(t2, e2), n2 = !l(t2, e2), h3 = !o(t2, e2);
              if (i2 || n2 || h3) {
                const e3 = this._getHexColor(t2, true);
                e3 && s2.push("color: " + e3 + ";");
                const i3 = this._getHexColor(t2, false);
                return i3 && s2.push("background-color: " + i3 + ";"), t2.isInverse() && s2.push("color: #000000; background-color: #BFBFBF;"), t2.isBold() && s2.push("font-weight: bold;"), t2.isUnderline() && s2.push("text-decoration: underline;"), t2.isBlink() && s2.push("text-decoration: blink;"), t2.isInvisible() && s2.push("visibility: hidden;"), t2.isItalic() && s2.push("font-style: italic;"), t2.isDim() && s2.push("opacity: 0.5;"), t2.isStrikethrough() && s2.push("text-decoration: line-through;"), s2;
              }
            }
            _nextCell(t2, e2, s2, i2) {
              if (0 === t2.getWidth())
                return;
              const r2 = "" === t2.getChars(), l2 = this._diffStyle(t2, e2);
              l2 && (this._currentRow += 0 === l2.length ? "</span><span>" : "</span><span style='" + l2.join(" ") + "'>"), this._currentRow += r2 ? " " : t2.getChars();
            }
            _serializeString() {
              return this._htmlContent;
            }
          }
          e.HTMLSerializeHandler = h2;
        })(), t;
      })();
    });
  }
});

// ../../.yarn/global/cache/is-callable-npm-1.2.7-808a303e61-9.zip/node_modules/is-callable/index.js
var require_is_callable = __commonJS({
  "../../.yarn/global/cache/is-callable-npm-1.2.7-808a303e61-9.zip/node_modules/is-callable/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var fnToStr = Function.prototype.toString;
    var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
    var badArrayLike;
    var isCallableMarker;
    if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
      try {
        badArrayLike = Object.defineProperty({}, "length", {
          get: function() {
            throw isCallableMarker;
          }
        });
        isCallableMarker = {};
        reflectApply(function() {
          throw 42;
        }, null, badArrayLike);
      } catch (_) {
        if (_ !== isCallableMarker) {
          reflectApply = null;
        }
      }
    } else {
      reflectApply = null;
    }
    var constructorRegex = /^\s*class\b/;
    var isES6ClassFn = function isES6ClassFunction(value) {
      try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
      } catch (e) {
        return false;
      }
    };
    var tryFunctionObject = function tryFunctionToStr(value) {
      try {
        if (isES6ClassFn(value)) {
          return false;
        }
        fnToStr.call(value);
        return true;
      } catch (e) {
        return false;
      }
    };
    var toStr = Object.prototype.toString;
    var objectClass = "[object Object]";
    var fnClass = "[object Function]";
    var genClass = "[object GeneratorFunction]";
    var ddaClass = "[object HTMLAllCollection]";
    var ddaClass2 = "[object HTML document.all class]";
    var ddaClass3 = "[object HTMLCollection]";
    var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
    var isIE68 = !(0 in [,]);
    var isDDA = function isDocumentDotAll() {
      return false;
    };
    if (typeof document === "object") {
      all = document.all;
      if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
          if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
            try {
              var str = toStr.call(value);
              return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
            } catch (e) {
            }
          }
          return false;
        };
      }
    }
    var all;
    module.exports = reflectApply ? function isCallable3(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      try {
        reflectApply(value, null, badArrayLike);
      } catch (e) {
        if (e !== isCallableMarker) {
          return false;
        }
      }
      return !isES6ClassFn(value) && tryFunctionObject(value);
    } : function isCallable3(value) {
      if (isDDA(value)) {
        return true;
      }
      if (!value) {
        return false;
      }
      if (typeof value !== "function" && typeof value !== "object") {
        return false;
      }
      if (hasToStringTag) {
        return tryFunctionObject(value);
      }
      if (isES6ClassFn(value)) {
        return false;
      }
      var strClass = toStr.call(value);
      if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
      }
      return tryFunctionObject(value);
    };
  }
});

// js/ws.ts
init_define_process();
var import_lodash = __toESM(require_lodash(), 1);

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
init_define_process();

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/utils.js
init_define_process();
function print(root, printNode = (n) => n.key) {
  var out = [];
  row(root, "", true, (v) => out.push(v), printNode);
  return out.join("");
}
function row(root, prefix, isTail, out, printNode) {
  if (root) {
    out(`${prefix}${isTail ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 "}${printNode(root)}
`);
    const indent = prefix + (isTail ? "    " : "\u2502   ");
    if (root.left)
      row(root.left, indent, false, out, printNode);
    if (root.right)
      row(root.right, indent, true, out, printNode);
  }
}
function isBalanced(root) {
  if (root === null)
    return true;
  var lh = height(root.left);
  var rh = height(root.right);
  if (Math.abs(lh - rh) <= 1 && isBalanced(root.left) && isBalanced(root.right))
    return true;
  return false;
}
function height(node) {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : 0;
}
function loadRecursive(parent, keys, values, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key = keys[middle];
    const data = values[middle];
    const node = { key, data, parent };
    node.left = loadRecursive(node, keys, values, start, middle);
    node.right = loadRecursive(node, keys, values, middle + 1, end);
    return node;
  }
  return null;
}
function markBalance(node) {
  if (node === null)
    return 0;
  const lh = markBalance(node.left);
  const rh = markBalance(node.right);
  node.balanceFactor = lh - rh;
  return Math.max(lh, rh) + 1;
}
function sort(keys, values, left, right, compare) {
  if (left >= right)
    return;
  const pivot = keys[left + right >> 1];
  let i = left - 1;
  let j = right + 1;
  while (true) {
    do
      i++;
    while (compare(keys[i], pivot) < 0);
    do
      j--;
    while (compare(keys[j], pivot) > 0);
    if (i >= j)
      break;
    let tmp = keys[i];
    keys[i] = keys[j];
    keys[j] = tmp;
    tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }
  sort(keys, values, left, j, compare);
  sort(keys, values, j + 1, right, compare);
}

// ../../.yarn/global/cache/avl-npm-1.5.3-ee43491243-9.zip/node_modules/avl/src/index.js
function DEFAULT_COMPARE(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
function rotateLeft(node) {
  var rightNode = node.right;
  node.right = rightNode.left;
  if (rightNode.left)
    rightNode.left.parent = node;
  rightNode.parent = node.parent;
  if (rightNode.parent) {
    if (rightNode.parent.left === node) {
      rightNode.parent.left = rightNode;
    } else {
      rightNode.parent.right = rightNode;
    }
  }
  node.parent = rightNode;
  rightNode.left = node;
  node.balanceFactor += 1;
  if (rightNode.balanceFactor < 0) {
    node.balanceFactor -= rightNode.balanceFactor;
  }
  rightNode.balanceFactor += 1;
  if (node.balanceFactor > 0) {
    rightNode.balanceFactor += node.balanceFactor;
  }
  return rightNode;
}
function rotateRight(node) {
  var leftNode = node.left;
  node.left = leftNode.right;
  if (node.left)
    node.left.parent = node;
  leftNode.parent = node.parent;
  if (leftNode.parent) {
    if (leftNode.parent.left === node) {
      leftNode.parent.left = leftNode;
    } else {
      leftNode.parent.right = leftNode;
    }
  }
  node.parent = leftNode;
  leftNode.right = node;
  node.balanceFactor -= 1;
  if (leftNode.balanceFactor > 0) {
    node.balanceFactor -= leftNode.balanceFactor;
  }
  leftNode.balanceFactor -= 1;
  if (node.balanceFactor < 0) {
    leftNode.balanceFactor += node.balanceFactor;
  }
  return leftNode;
}
var AVLTree = class {
  constructor(comparator, noDuplicates = false) {
    this._comparator = comparator || DEFAULT_COMPARE;
    this._root = null;
    this._size = 0;
    this._noDuplicates = !!noDuplicates;
  }
  destroy() {
    return this.clear();
  }
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }
  get size() {
    return this._size;
  }
  contains(key) {
    if (this._root) {
      var node = this._root;
      var comparator = this._comparator;
      while (node) {
        var cmp = comparator(key, node.key);
        if (cmp === 0)
          return true;
        else if (cmp < 0)
          node = node.left;
        else
          node = node.right;
      }
    }
    return false;
  }
  next(node) {
    var successor = node;
    if (successor) {
      if (successor.right) {
        successor = successor.right;
        while (successor.left)
          successor = successor.left;
      } else {
        successor = node.parent;
        while (successor && successor.right === node) {
          node = successor;
          successor = successor.parent;
        }
      }
    }
    return successor;
  }
  prev(node) {
    var predecessor = node;
    if (predecessor) {
      if (predecessor.left) {
        predecessor = predecessor.left;
        while (predecessor.right)
          predecessor = predecessor.right;
      } else {
        predecessor = node.parent;
        while (predecessor && predecessor.left === node) {
          node = predecessor;
          predecessor = predecessor.parent;
        }
      }
    }
    return predecessor;
  }
  forEach(callback) {
    var current = this._root;
    var s = [], done = false, i = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          callback(current, i++);
          current = current.right;
        } else
          done = true;
      }
    }
    return this;
  }
  range(low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root, cmp;
    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node))
            return this;
        }
        node = node.right;
      }
    }
    return this;
  }
  keys() {
    var current = this._root;
    var s = [], r = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.key);
          current = current.right;
        } else
          done = true;
      }
    }
    return r;
  }
  values() {
    var current = this._root;
    var s = [], r = [], done = false;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          r.push(current.data);
          current = current.right;
        } else
          done = true;
      }
    }
    return r;
  }
  at(index) {
    var current = this._root;
    var s = [], done = false, i = 0;
    while (!done) {
      if (current) {
        s.push(current);
        current = current.left;
      } else {
        if (s.length > 0) {
          current = s.pop();
          if (i === index)
            return current;
          i++;
          current = current.right;
        } else
          done = true;
      }
    }
    return null;
  }
  minNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node;
  }
  maxNode() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node;
  }
  min() {
    var node = this._root;
    if (!node)
      return null;
    while (node.left)
      node = node.left;
    return node.key;
  }
  max() {
    var node = this._root;
    if (!node)
      return null;
    while (node.right)
      node = node.right;
    return node.key;
  }
  isEmpty() {
    return !this._root;
  }
  pop() {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.left)
        node = node.left;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }
  popMax() {
    var node = this._root, returnValue = null;
    if (node) {
      while (node.right)
        node = node.right;
      returnValue = { key: node.key, data: node.data };
      this.remove(node.key);
    }
    return returnValue;
  }
  find(key) {
    var root = this._root;
    var subtree = root, cmp;
    var compare = this._comparator;
    while (subtree) {
      cmp = compare(key, subtree.key);
      if (cmp === 0)
        return subtree;
      else if (cmp < 0)
        subtree = subtree.left;
      else
        subtree = subtree.right;
    }
    return null;
  }
  insert(key, data) {
    if (!this._root) {
      this._root = {
        parent: null,
        left: null,
        right: null,
        balanceFactor: 0,
        key,
        data
      };
      this._size++;
      return this._root;
    }
    var compare = this._comparator;
    var node = this._root;
    var parent = null;
    var cmp = 0;
    if (this._noDuplicates) {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if (cmp === 0)
          return null;
        else if (cmp < 0)
          node = node.left;
        else
          node = node.right;
      }
    } else {
      while (node) {
        cmp = compare(key, node.key);
        parent = node;
        if (cmp <= 0)
          node = node.left;
        else
          node = node.right;
      }
    }
    var newNode = {
      left: null,
      right: null,
      balanceFactor: 0,
      parent,
      key,
      data
    };
    var newRoot;
    if (cmp <= 0)
      parent.left = newNode;
    else
      parent.right = newNode;
    while (parent) {
      cmp = compare(parent.key, key);
      if (cmp < 0)
        parent.balanceFactor -= 1;
      else
        parent.balanceFactor += 1;
      if (parent.balanceFactor === 0)
        break;
      else if (parent.balanceFactor < -1) {
        if (parent.right.balanceFactor === 1)
          rotateRight(parent.right);
        newRoot = rotateLeft(parent);
        if (parent === this._root)
          this._root = newRoot;
        break;
      } else if (parent.balanceFactor > 1) {
        if (parent.left.balanceFactor === -1)
          rotateLeft(parent.left);
        newRoot = rotateRight(parent);
        if (parent === this._root)
          this._root = newRoot;
        break;
      }
      parent = parent.parent;
    }
    this._size++;
    return newNode;
  }
  remove(key) {
    if (!this._root)
      return null;
    var node = this._root;
    var compare = this._comparator;
    var cmp = 0;
    while (node) {
      cmp = compare(key, node.key);
      if (cmp === 0)
        break;
      else if (cmp < 0)
        node = node.left;
      else
        node = node.right;
    }
    if (!node)
      return null;
    var returnValue = node.key;
    var max, min;
    if (node.left) {
      max = node.left;
      while (max.left || max.right) {
        while (max.right)
          max = max.right;
        node.key = max.key;
        node.data = max.data;
        if (max.left) {
          node = max;
          max = max.left;
        }
      }
      node.key = max.key;
      node.data = max.data;
      node = max;
    }
    if (node.right) {
      min = node.right;
      while (min.left || min.right) {
        while (min.left)
          min = min.left;
        node.key = min.key;
        node.data = min.data;
        if (min.right) {
          node = min;
          min = min.right;
        }
      }
      node.key = min.key;
      node.data = min.data;
      node = min;
    }
    var parent = node.parent;
    var pp = node;
    var newRoot;
    while (parent) {
      if (parent.left === pp)
        parent.balanceFactor -= 1;
      else
        parent.balanceFactor += 1;
      if (parent.balanceFactor < -1) {
        if (parent.right.balanceFactor === 1)
          rotateRight(parent.right);
        newRoot = rotateLeft(parent);
        if (parent === this._root)
          this._root = newRoot;
        parent = newRoot;
      } else if (parent.balanceFactor > 1) {
        if (parent.left.balanceFactor === -1)
          rotateLeft(parent.left);
        newRoot = rotateRight(parent);
        if (parent === this._root)
          this._root = newRoot;
        parent = newRoot;
      }
      if (parent.balanceFactor === -1 || parent.balanceFactor === 1)
        break;
      pp = parent;
      parent = parent.parent;
    }
    if (node.parent) {
      if (node.parent.left === node)
        node.parent.left = null;
      else
        node.parent.right = null;
    }
    if (node === this._root)
      this._root = null;
    this._size--;
    return returnValue;
  }
  load(keys = [], values = [], presort) {
    if (this._size !== 0)
      throw new Error("bulk-load: tree is not empty");
    const size = keys.length;
    if (presort)
      sort(keys, values, 0, size - 1, this._comparator);
    this._root = loadRecursive(null, keys, values, 0, size);
    markBalance(this._root);
    this._size = size;
    return this;
  }
  isBalanced() {
    return isBalanced(this._root);
  }
  toString(printNode) {
    return print(this._root, printNode);
  }
};
AVLTree.default = AVLTree;

// js/renderPreviewWindow.tsx
init_define_process();

// ../../.yarn/__virtual__/react-reverse-portal-virtual-1d0f51ed61/0/global/cache/react-reverse-portal-npm-2.1.1-e50ec91de3-9.zip/node_modules/react-reverse-portal/dist/web/index.js
init_define_process();
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p2 in b2)
        if (b2.hasOwnProperty(p2))
          d2[p2] = b2[p2];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var ELEMENT_TYPE_HTML = "html";
var ELEMENT_TYPE_SVG = "svg";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var validateElementType = function(domElement, elementType) {
  if (elementType === ELEMENT_TYPE_HTML) {
    return domElement instanceof HTMLElement;
  }
  if (elementType === ELEMENT_TYPE_SVG) {
    return domElement instanceof SVGElement;
  }
  throw new Error('Unrecognized element type "' + elementType + '" for validateElementType.');
};
var createPortalNode = function(elementType, options) {
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
};
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
  InPortal2.prototype.componentDidMount = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.componentDidUpdate = function() {
    this.addPropsChannel();
  };
  InPortal2.prototype.render = function() {
    var _this = this;
    var _a = this.props, children = _a.children, node = _a.node;
    return createPortal(Children.map(children, function(child) {
      if (!isValidElement2(child))
        return child;
      return cloneElement2(child, _this.state.nodeProps);
    }), node.element);
  };
  return InPortal2;
}(PureComponent);
var OutPortal = function(_super) {
  __extends(OutPortal2, _super);
  function OutPortal2(props) {
    var _this = _super.call(this, props) || this;
    _this.placeholderNode = createRef2();
    _this.passPropsThroughPortal();
    return _this;
  }
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
    return createElement2("div", { ref: this.placeholderNode });
  };
  return OutPortal2;
}(PureComponent);
var createHtmlPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_HTML);
var createSvgPortalNode = createPortalNode.bind(null, ELEMENT_TYPE_SVG);

// js/starter.tsx
init_define_process();

// js/DraggableWindow.tsx
init_define_process();
import { LazyMotion, m as m2, domMax } from "framer-motion";

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/md/index.esm.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/index.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconsManifest.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconBase.js
init_define_process();

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconContext.js
init_define_process();
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = react_preact_default.createContext && react_preact_default.createContext(DefaultContext);

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t[p2] = s[p2];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t[p2[i]] = s[p2[i]];
    }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return react_preact_default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return react_preact_default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className)
      className = conf.className;
    if (props.className)
      className = (className ? className + " " : "") + props.className;
    return react_preact_default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && react_preact_default.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? react_preact_default.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// ../../.yarn/__virtual__/react-icons-virtual-03002b44ac/0/global/cache/react-icons-npm-4.6.0-85b1c2c9bc-9.zip/node_modules/react-icons/md/index.esm.js
function MdQrCode(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 19h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2z" } }] })(props);
}
function MdPhoneAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" } }] })(props);
}
function MdTabletAndroid(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z" } }] })(props);
}
function MdTv(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" } }] })(props);
}
function MdFullscreen(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" } }] })(props);
}
function MdShare(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" } }] })(props);
}

// js/Qr.tsx
init_define_process();
import { motion as m } from "framer-motion";

// js/icons.tsx
init_define_process();

// dist/emotionJsxRuntime.mjs
init_define_process();
var require_emotion_react_jsx_runtime_cjs_dev = __commonJS2({
  "../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/0/global/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.dev.js"(exports) {
    "use strict";
    init_define_process2();
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
    function jsx2(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsx(type, props, key);
      }
      return ReactJSXRuntime.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    function jsxs2(type, props, key) {
      if (!emotionElement.hasOwnProperty.call(props, "css")) {
        return ReactJSXRuntime.jsxs(type, props, key);
      }
      return ReactJSXRuntime.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
    }
    exports.Fragment = Fragment2;
    exports.jsx = jsx2;
    exports.jsxs = jsxs2;
  }
});
var require_emotion_react_jsx_runtime_cjs = __commonJS2({
  "../../.yarn/__virtual__/@emotion-react-virtual-8e1a93edd4/0/global/cache/@emotion-react-npm-11.10.4-00a955a9fe-9.zip/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"(exports, module) {
    "use strict";
    init_define_process2();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_emotion_react_jsx_runtime_cjs_dev();
    }
  }
});
init_define_process2();
var import_jsx_runtime = __toESM2(require_emotion_react_jsx_runtime_cjs(), 1);
var export_Fragment = import_jsx_runtime.Fragment;
var export_jsx = import_jsx_runtime.jsx;
var export_jsxs = import_jsx_runtime.jsxs;

// js/icons.tsx
var Wrap = ({ children }) => export_jsx("span", {
  css: export_css`
font-size:20pt;
`,
  children
});
var QrCodeIcon = () => export_jsx(Wrap, {
  children: export_jsx(MdQrCode, {})
});
var Phone = () => export_jsx(Wrap, {
  children: export_jsx(MdPhoneAndroid, {})
});
var Share = () => export_jsx(Wrap, {
  children: export_jsx(MdShare, {})
});
var Tablet = () => export_jsx(Wrap, {
  children: export_jsx(MdTabletAndroid, {})
});
var Tv = () => export_jsx(Wrap, {
  children: export_jsx(MdTv, {})
});

// ../../.yarn/__virtual__/react-qrious-virtual-b90ac76f79/0/global/cache/react-qrious-npm-2.5.6-421c990834-9.zip/node_modules/react-qrious/lib/index.js
init_define_process();

// ../../.yarn/__virtual__/react-qrious-virtual-b90ac76f79/0/global/cache/react-qrious-npm-2.5.6-421c990834-9.zip/node_modules/react-qrious/lib/QRious.js
init_define_process();

// ../../.yarn/__virtual__/react-qrious-virtual-b90ac76f79/0/global/cache/react-qrious-npm-2.5.6-421c990834-9.zip/node_modules/react-qrious/lib/use-qrious.js
init_define_process();
var import_qrious = __toESM(require_qrious(), 1);
var useQrious = (options) => {
  const [qrious] = useState(() => new import_qrious.default(options));
  const [dataUrl, setDataUrl] = useState(() => qrious.toDataURL(options.mime));
  useEffect(() => {
    qrious.set(options);
    setDataUrl(qrious.toDataURL(options.mime));
  }, [options, qrious]);
  return [dataUrl, qrious];
};

// ../../.yarn/__virtual__/react-qrious-virtual-b90ac76f79/0/global/cache/react-qrious-npm-2.5.6-421c990834-9.zip/node_modules/react-qrious/lib/QRious.js
var QRious2 = (_a) => {
  var _b = _a, { background, backgroundAlpha, foreground, foregroundAlpha, level, mime, padding, value, size } = _b, props = __objRest(_b, ["background", "backgroundAlpha", "foreground", "foregroundAlpha", "level", "mime", "padding", "value", "size"]);
  const [dataUrl] = useQrious({
    background,
    backgroundAlpha,
    foreground,
    foregroundAlpha,
    level,
    mime,
    padding,
    size,
    value
  });
  return createElement2("img", __spreadProps(__spreadValues({}, props), {
    src: dataUrl
  }));
};

// js/mui.tsx
init_define_process();
var FabLazy = lazy(async () => import("./chunk-Fab-WCNHET7B.mjs"));
var Fab = (props) => export_jsx(Suspense, {
  fallback: export_jsx("div", {
    css: export_css`width: 28px; height:28px`
  }),
  children: export_jsx(FabLazy, __spreadValues({}, props))
});
var ToggleButtonLazy = lazy(async () => import("./chunk-ToggleButton-5PLX42D6.mjs"));
var ToggleButton = (props) => export_jsx(Suspense, {
  fallback: export_jsx("div", {
    css: export_css`width: 28px; height:28px`
  }),
  children: export_jsx(ToggleButtonLazy, __spreadValues({}, props))
});
var ToggleButtonGroupLazy = lazy(
  async () => import("./chunk-ToggleButtonGroup-MWLW72OL.mjs")
);
var ToggleButtonGroup = (props) => export_jsx(Suspense, {
  fallback: export_jsx("div", {
    css: export_css`width: 28px; height:28px`
  }),
  children: export_jsx(ToggleButtonGroupLazy, __spreadValues({}, props))
});

// js/Qr.tsx
var QRButton = ({ url }) => {
  const [showQR, setQR] = useState(false);
  return export_jsx(m.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: () => {
      setQR(!showQR);
    },
    css: export_css`
          margin-top: 12px;
          margin-bottom: 12px;
              `,
    children: showQR ? export_jsx(QRious2, {
      value: url || "/live/coder/public"
    }, url || origin + url) : export_jsx(Fab, {
      children: export_jsx(QrCodeIcon, {})
    })
  });
};

// js/DraggableWindow.tsx
var import_xterm = __toESM(require_xterm(), 1);
var import_xterm_addon_fit = __toESM(require_xterm_addon_fit(), 1);
var import_xterm_addon_serialize = __toESM(require_xterm_addon_serialize(), 1);
var serializeAddon = new import_xterm_addon_serialize.SerializeAddon();
var fitAddon = new import_xterm_addon_fit.FitAddon();
var origConsole = console.log;
var terminal = new import_xterm.Terminal({
  allowProposedApi: true,
  allowTransparency: true,
  altClickMovesCursor: true,
  scrollback: 0,
  convertEol: true,
  windowsMode: true
});
terminal.loadAddon(serializeAddon);
var termOff = () => console.log = origConsole;
Object.assign(terminal, { termOff });
terminal.loadAddon(fitAddon);
Object.assign(globalThis, { terminal });
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({
  children,
  room
}) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height2, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const videoRef = useRef(null);
  const scale = scaleRange / 100;
  const terminalRef = useRef(null);
  useEffect(() => {
    if (!(terminalRef == null ? void 0 : terminalRef.current))
      return;
    terminal.open(terminalRef.current);
    fitAddon.activate(terminal);
    fitAddon.fit();
    console.log = (...data) => {
      const params = data.map(
        (d) => typeof d === "object" ? JSON.stringify(d, null, 2) : d
      );
      terminal.write(params.join(" - ") + "\r\n");
      origConsole.apply(console, data);
    };
  }, [terminalRef]);
  useEffect(() => {
    const reveal = async () => {
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
    };
    reveal();
  }, []);
  const c = window.getComputedStyle(
    document.body,
    null
  ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 3).map((x) => Number(x) || "0").join(",");
  const [bgCV, setBG] = useState(c);
  useEffect(() => {
    setInterval(() => {
      const c2 = window.getComputedStyle(
        document.body,
        null
      ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 3).map((x) => Number(x) || "0").join(",");
      if (c2 !== bgCV)
        setBG(c2);
    }, 1e3 / 2);
  }, []);
  const [clients, setClients] = useState(Object.keys(sendChannel.rtcConns));
  useEffect(() => {
    setClients([...Object.keys(sendChannel.rtcConns)]);
  }, [sendChannel.webRtcArray.length, setClients]);
  return export_jsx(LazyMotion, {
    features: domMax,
    children: export_jsx(m2.div, {
      transition: { delay: 0, duration: 0.4 },
      initial: {
        top: 0,
        padding: 0,
        right: 0,
        borderRadius: 0
      },
      animate: {
        top: bottom,
        padding: 8,
        right,
        borderRadius: 16
      },
      css: export_css`
            touch-action: pinch-zoom;
            background-color: ${bg};
            backdrop-filter: blur(15px);
            z-index: 10;

            white-space: normal;
            position: fixed;
          `,
      drag: true,
      dragMomentum: false,
      dragConstraints: {
        left: 0,
        right: width - 20 - width / 6,
        bottom: innerHeight
      },
      dragElastic: 0.5,
      children: export_jsxs("div", {
        css: export_css` 
              display: flex;
              
                `,
        children: [
          export_jsxs("div", {
            css: export_css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `,
            children: [
              export_jsx(m2.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: { height: 0, width: 0 },
                animate: { height: "auto", width: "auto" },
                children: export_jsx(ToggleButtonGroup, {
                  value: scaleRange,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newScale) => {
                    newScale && changeScaleRange(newScale);
                  },
                  children: sizes.map((size, ind) => export_jsx(ToggleButton, {
                    value: size,
                    children: export_jsxs("span", {
                      css: export_css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `,
                      children: [
                        size,
                        "%"
                      ]
                    })
                  }, ind))
                })
              }),
              export_jsxs(m2.div, {
                transition: { delay: 0, duration: 0.4 },
                initial: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  borderRadius: 0
                },
                animate: {
                  width: width * scale / devicePixelRatio,
                  height: height2 * scale / devicePixelRatio,
                  borderRadius: 8
                },
                css: export_css`

                display: block;
                overflow: hidden;
                overflow-y: hidden;
            `,
                children: [
                  export_jsx(m2.div, {
                    transition: { delay: 0, duration: 0.4 },
                    initial: {
                      width: window.innerWidth,
                      height: window.innerHeight,
                      background: "rgba(0,0,0, 1)",
                      scale: 1
                    },
                    animate: {
                      background: "rgba(" + bgCV + ", 0.5)",
                      transformOrigin: "0px 0px",
                      width: width / devicePixelRatio,
                      height: height2 / devicePixelRatio,
                      scale: scaleRange / 100
                    },
                    "data-test-id": "z-body",
                    css: export_css`
                  overflow:overlay;
                  overflow-y: hidden;
              `,
                    children
                  }),
                  export_jsx("div", {
                    css: export_css`   
              position: relative;
              
              `,
                    children: export_jsx("div", {
                      css: export_css`
              height: 240px;
              width: ${width / devicePixelRatio}px;
              display: block;
              border-radius: 0 0 8px 8px;
              top: -240px;
              opacity: 0.5;
              background: rgba(84,24,24,.8);
              position: absolute;
              .xterm-helpers{
              }
              `,
                      children: export_jsx("div", {
                        ref: terminalRef
                      })
                    })
                  })
                ]
              }),
              export_jsx(m2.div, {
                transition: { delay: 0, duration: 0.4 },
                children: export_jsx(ToggleButtonGroup, {
                  value: width,
                  size: "small",
                  exclusive: true,
                  onChange: (_e, newSize) => {
                    if (newSize) {
                      setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
                      setWidth(newSize);
                    }
                  },
                  children: breakPoints.map((size, ind) => export_jsx(ToggleButton, {
                    value: size,
                    children: size === 680 ? export_jsx("span", {
                      css: export_css`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: export_jsx(Phone, {})
                    }) : size === 768 ? export_jsx("span", {
                      css: export_css`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                      children: export_jsx(Tablet, {})
                    }) : export_jsx("span", {
                      css: export_css`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `,
                      children: export_jsx(Tv, {})
                    })
                  }, ind))
                })
              })
            ]
          }),
          export_jsx(m2.div, {
            transition: { delay: 0, duration: 0.4 },
            initial: { height: 0, width: 0 },
            animate: { height: "100%", width: "auto" },
            children: export_jsxs("div", {
              css: export_css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
              children: [
                export_jsx(Fab, {
                  onClick: () => {
                    var _a;
                    (_a = document.querySelector("#root")) == null ? void 0 : _a.requestFullscreen();
                  },
                  children: export_jsx("span", {
                    css: export_css`
                font-size: 20pt;
              `,
                    children: export_jsx(MdFullscreen, {}, "fs")
                  })
                }, "fullscreen"),
                export_jsx(QRButton, {
                  url: location.origin + `/live/${room}/public`
                }),
                false,
                export_jsx(Fab, {
                  onClick: () => open(`/live/${room}/public`),
                  children: export_jsx(Share, {})
                }, "Share")
              ]
            })
          })
        ]
      })
    })
  });
};

// js/ErrorBoundary.tsx
init_define_process();
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
      return export_jsxs("div", {
        children: [
          export_jsx("h2", {
            children: "Something went wrong."
          }),
          export_jsxs("details", {
            style: { whiteSpace: "pre-wrap" },
            children: [
              this.state.error && this.state.error.toString(),
              export_jsx("br", {}),
              this.state.errorInfo.componentStack
            ]
          })
        ]
      });
    }
    return this.props.children || export_jsx(export_Fragment, {});
  }
};
var ErrorBoundary_default = ErrorBoundary;

// js/renderToString.tsx
init_define_process();
var import_is_callable = __toESM(require_is_callable(), 1);
var render = async (transpiled, codeSpace2) => {
  var _a;
  const md5hash = md5(transpiled).slice(0, 8);
  const App = await appFactory(transpiled);
  if ((0, import_is_callable.default)(App)) {
    const html = S2(export_jsx(App, {
      appId: `${codeSpace2}-${md5hash}`
    }));
    const css = mineFromCaches(md5hash, html);
    const globalCss = (_a = document.querySelector("style[data-emotion=z-global]")) == null ? void 0 : _a.innerHTML;
    return {
      html: `<style>${globalCss}</style>${html}`,
      css
    };
  } else
    return { html: null, css: null };
};
var renderFromString = (codeSpace2, hash) => {
  var _a, _b;
  const md5hash = md5(mST().transpiled).slice(0, 8);
  if (hash !== hashCode()) {
    return { html: null, css: null };
  }
  const html = (_a = document.getElementById(`${codeSpace2}-${md5hash}`)) == null ? void 0 : _a.innerHTML;
  const css = html ? extractCritical22(html) : "";
  const globalCss = (_b = document.querySelector("style[data-emotion=z-global]")) == null ? void 0 : _b.innerHTML;
  return {
    html: `<div id="${codeSpace2}-${md5hash}" style="height:100%">
      ${(globalCss ? `<style>${globalCss}</style>` : ``) + html}</div>`,
    css
  };
};
function mineFromCaches(md5Hash, html) {
  const keys = Object.keys(globalThis.eCaches[md5Hash].inserted);
  return Array.from(document.styleSheets).map((x) => x.cssRules).filter(
    (x) => x[0] && x[0].cssText
  ).map((x) => x[0].cssText).filter(
    (x) => keys.find((k) => x.includes(k))
  ).filter((x) => html.includes(x.slice(0, 11))).join(" ");
}
var extractCritical22 = (html) => {
  try {
    const rules = {};
    for (const i in document.styleSheets) {
      let yesFromNow = false;
      const styleSheet = document.styleSheets[i];
      if (styleSheet == null ? void 0 : styleSheet.cssRules) {
        for (const rule of Array.from(styleSheet.cssRules)) {
          if (yesFromNow || rule && rule.cssText && rule.cssText.startsWith(".z-")) {
            const selector = rule.cssText.slice(1, 9);
            const selectorText = selector;
            if (!rules[selector] && html.includes(selector) && !rule.cssText.slice(10).includes(".z-")) {
              yesFromNow = true;
              rules[selectorText] = rule.cssText;
            }
          }
        }
      }
    }
    return Object.keys(rules).map((r) => rules[r]).join(" ");
  } catch (e) {
    console.error("no css");
    return "";
  }
};

// js/starter.tsx
var import_is_callable2 = __toESM(require_is_callable(), 1);
if (!globalThis["apps"] || !globalThis["eCaches"]) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}
var { apps, eCaches } = globalThis || globalThis.apps;
var ishim;
async function importShim2(str) {
  if (ishim)
    return ishim(str);
  if (!document.scripts) {
    throw new Error("document.scripts");
  }
  const scripts = Array.from(document.scripts);
  const imap = scripts.find((s) => s.type === "importmap");
  if (!imap) {
    throw new Error("no imap");
  }
  await import("./chunk-es-module-shims-L6LQUUWN.mjs");
  await window.importShim.addImportMap(
    JSON.parse(
      imap.innerText
    )
  );
  ishim = window.importShim;
  return ishim(str);
}
var render2 = {};
var AutoUpdateApp = ({ hash, codeSpace: codeSpace2 }) => {
  const [md5Hash, setMdHash] = useState(md5(mST().transpiled).slice(0, 8));
  useEffect(() => {
    const newHash = md5(mST().transpiled).slice(0, 8);
    if (newHash !== md5Hash) {
      setMdHash(newHash);
    }
  }, [hash]);
  useEffect(() => {
    const newHash = md5(mST().transpiled).slice(0, 8);
    if (newHash !== md5Hash)
      return;
    if (!renderFromString)
      return;
    render2[md5Hash] = render2[md5Hash] || renderFromString(codeSpace2, hash);
    const { html, css } = render2[md5Hash];
    if (html && css) {
      patchSync(__spreadProps(__spreadValues({}, mST()), { html, css }));
    } else
      delete render2[md5Hash];
  }, [md5Hash]);
  const ref = useRef(null);
  const transpiled = mST().transpiled;
  const App = apps[md5(transpiled).slice(0, 8)];
  return export_jsx(export_CacheProvider, {
    value: emotionCache_default({ key: "x" }),
    children: export_jsx(ErrorBoundary_default, {
      ref,
      children: export_jsx(App, {
        appId: `${codeSpace2}-${md5Hash}`
      })
    }, md5Hash)
  });
};
async function appFactory(transpiled = "") {
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;
  const hash = md5(trp).slice(0, 8);
  if (!apps[hash]) {
    try {
      if (terminal && terminal.clear) {
        terminal.clear();
      }
      console.log(`i: ${mstI}: `);
      const App = (await importShim2(createJsBlob(trp))).default;
      if ((0, import_is_callable2.default)(App)) {
        const { CacheProvider, cache: createCache } = await importShim2("@emotion/react");
        eCaches[hash] = createCache({
          key: "z",
          speedy: true
        });
        apps[hash] = ({ appId }) => appId.includes(hash) ? export_jsx(CacheProvider, {
          value: eCaches[hash],
          children: export_jsx("div", {
            css: export_css`height: 100%;`,
            id: appId,
            children: export_jsx(App, {})
          })
        }) : null;
      } else
        throw new Error("the default export is not a function!");
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => export_jsxs("div", {
          css: export_css`
        background-color: orange;
        `,
          children: [
            export_jsx("h1", {
              children: "Syntax Error"
            }),
            export_jsxs("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            export_jsx("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
        apps[hash] = () => export_jsxs("div", {
          css: export_css`
						background-color: orange;
						`,
          children: [
            export_jsx("h1", {
              children: "Syntax Error"
            }),
            export_jsxs("h2", {
              children: [
                name,
                ": ",
                message
              ]
            }),
            export_jsx("p", {
              children: JSON.stringify({ err: error })
            })
          ]
        });
      } else {
        apps[hash] = () => export_jsx("div", {
          css: export_css`
        background-color: orange;
      `,
          children: export_jsxs("h1", {
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
function createJsBlob(code, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// js/Editor.tsx
init_define_process();

// js/runner.tsx
init_define_process();

// js/toUmd.ts
init_define_process();
var mod = {
  printR(name, included) {
    if (included[name])
      return "";
    included[name] = true;
    const current = mod.data[mod.hashMap[name]];
    const currentCode = current.code;
    if (!current.deps || !current.deps.length) {
      return currentCode;
    }
    const myDepts = [...current.deps];
    const depts = myDepts.map((n) => mod.printR(n, included)).join(" \n ");
    return depts + `
    
    ` + currentCode;
  },
  async toJs(name) {
    const js = mod.printR(name, {});
    const modZ = Object.keys(mod.data).map(
      (k) => [`"${mod.hashMap[k]}"`, k.replace(/[^a-f]/g, "")]
    ).map((x) => x[0] + ": " + x[1]).join(", \n ");
    const res = `
     ${js}
  function require(name){
    return ({${modZ}})[name];
  }
  globalThis.UMD_require = require;
  
     `;
    const { transform: transform2 } = await import("./chunk-esbuildEsm-DKBQXEW2.mjs");
    const t = await transform2(res, {
      format: "esm",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    const c = await transform2(t.code, {
      format: "iife",
      minify: true,
      keepNames: true,
      platform: "browser",
      treeShaking: true
    });
    return c.code;
  },
  hashMap: {},
  data: {}
};
var toUmd = async (source, name) => {
  const { transform: transform2 } = await import("./chunk-esbuildEsm-DKBQXEW2.mjs");
  const hash = md5(source);
  mod.hashMap = __spreadProps(__spreadValues({}, mod.hashMap), { [hash]: name, [name]: hash });
  if (!mod.data[hash]) {
    const transformed = await transform2(source, {
      format: "iife",
      keepNames: true,
      treeShaking: true,
      target: "es2018",
      loader: name.includes(".tsx") ? "tsx" : name.includes(".ts") ? "ts" : name.includes(".jsx") ? "jsx" : "js",
      globalName: hash.replace(/[^a-f]/g, "")
    });
    if (!transformed || !transformed.code) {
      console.log("transform result -code is empty");
      return;
    }
    mod.data = __spreadProps(__spreadValues({}, mod.data), {
      [hash]: __spreadProps(__spreadValues({}, transformed), {
        deps: findDeps(transformed.code)
      })
    });
    await Promise.all(mod.data[hash].deps.map(async (dep) => {
      if (mod.hashMap[dep]) {
        return;
      }
      const importMap = importShim.getImportMap();
      let url = "";
      let urlHash = "";
      if (importMap.imports[dep]) {
        url = importMap.imports[dep];
        urlHash = md5(dep);
      } else if (dep.startsWith("./")) {
        url = new URL(dep, location.origin).toString();
        urlHash = md5(dep);
      } else {
        try {
          url = await importShim.resolve(dep, name);
          urlHash = md5(dep);
        } catch (e) {
          console.error(`failed to resolve: ${dep}`);
          return;
        }
      }
      if (mod.hashMap[urlHash]) {
        return;
      }
      mod.hashMap[dep] = url;
      const source2 = await (await fetch(url)).text();
      return toUmd(source2, dep);
    }));
  }
  return mod;
};
var findDeps = (code) => {
  const regex = /require\("(.+?)"\)/gm;
  let m3;
  const deps = [];
  while ((m3 = regex.exec(code)) !== null) {
    if (m3.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    for (const [groupIndex, match] of m3.entries()) {
      if (groupIndex == 1) {
        deps.push(match);
      }
      console.log(`Found match, group ${groupIndex}: ${match}`);
    }
  }
  return deps;
};

// js/runner.tsx
var mod2 = {
  code: "",
  olderCode: ""
};
async function runner({ code, counter, codeSpace: codeSpace2 }) {
  mod2.code = code;
  const mst = mST();
  console.log(`${mst.i} => ${counter}`);
  if (counter < mst.i) {
    return;
  }
  setTimeout(() => {
    if (mod2.code === code && code !== mod2.olderCode) {
      runner({ code, counter, codeSpace: codeSpace2 });
    }
    mod2.olderCode = code;
  }, 1e3);
  try {
    const transpiled = await transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      minify: true,
      keepNames: true,
      tsconfigRaw: {
        compilerOptions: {
          jsx: "react-jsx",
          module: "ESNext",
          jsxFragmentFactory: "Fragment",
          jsxImportSource: "@emotion/react"
        }
      },
      target: "es2018"
    });
    const umdExp = async () => {
      console.log("to UMD");
      const UMD = await toUmd(transpiled.code, `${codeSpace2}.tsx`);
      console.log({ UMD });
      download("coder.js", await (UMD == null ? void 0 : UMD.toJs(`${codeSpace2}.tsx`)));
      function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
        );
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    };
    Object.assign(globalThis, { umdExp });
    const codeHash = md5(code).slice(0, 8);
    const transpiledCode = `${transpiled.code}//${codeHash}`;
    const { html, css } = await render(transpiledCode, codeSpace2);
    if (!html) {
      return;
    }
    patchSync(__spreadProps(__spreadValues({}, mST()), {
      code,
      i: counter,
      transpiled: transpiledCode,
      html,
      css
    }));
    let i = 60;
    while (!mST().css && counter === mST().i) {
      console.log("Oh, NO! Can't extract css, wait:", i);
      const { html: html2, css: css2 } = renderFromString(codeSpace2, hashCode());
      if (html2 && css2)
        patchSync(__spreadProps(__spreadValues({}, mST()), { html: html2, css: css2 }));
      else
        await wait(i);
      i = i * 2;
    }
    saveCode();
  } catch (error) {
    console.error({ error });
  } finally {
  }
}

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

// js/prettierJs.ts
init_define_process();
var prettierJs = async (code) => {
  const prettier = init();
  return prettier.prettierJs(code);
};
var _prettierJs = null;
var fallback = {
  prettierJs: async (code) => {
    const t0 = performance.now();
    _prettierJs = _prettierJs || (await import("./chunk-prettierEsm-L6G35TMS.mjs")).prettierJs;
    const t1 = performance.now();
    console.log(`importing took ${t1 - t0} milliseconds.`);
    const res = _prettierJs(code);
    const t2 = performance.now();
    console.log(`prettier took ${t2 - t1} milliseconds.`);
    return res;
  }
};
var _prettier = null;
function init() {
  if (_prettier)
    return _prettier;
  if (!supportsWorkerType())
    return _prettier = fallback;
  try {
    const worker = new SharedWorker(
      new URL("prettierWorker.mjs", location.origin),
      { type: "module" }
    );
    const wrapped = wrap(worker.port);
    return _prettier = wrapped;
  } catch (e) {
    return _prettier = fallback;
  }
}
function supportsWorkerType() {
  let supports = false;
  const tester = {
    get type() {
      supports = true;
      return "module";
    }
  };
  try {
    new Worker("blob://", tester);
  } finally {
    return supports;
  }
}

// js/Editor.tsx
var mod3 = {
  CH() {
  },
  getValue: async () => "",
  setValue: async (code) => {
    if (code.length < 10)
      console.log(code);
  },
  code: "",
  counter: 0,
  lastKeyDown: 0,
  codeToSet: ""
};
var Editor = ({ codeSpace: codeSpace2, assets }) => {
  const ref = useRef(null);
  const { i, code } = mST();
  const [
    mySession,
    changeContent
  ] = react_preact_default.useState({
    lastKeyDown: 0,
    myCode: code,
    counter: i,
    started: false,
    myId: "loading",
    onChange(_cb) {
    },
    engine: isMobile() ? "ace" : "monaco"
  });
  mod3.counter = mST().i;
  const {
    myCode,
    started,
    myId,
    engine,
    onChange
  } = mySession;
  mod3.code = myCode;
  react_preact_default.useEffect(() => {
    if (!(ref == null ? void 0 : ref.current)) {
      return;
    }
    const setMonaco = async () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.href = location.origin + "/" + assets["ws.css"];
      document.head.append(link);
      const { startMonaco } = await import("./chunk-startMonaco-UROPGN5J.mjs");
      const { model, getTypeScriptWorker, setValue: setMonValue } = await startMonaco(
        {
          container: ref.current,
          name: codeSpace2,
          code: mST().code
        }
      );
      const getValue = async () => {
        const code2 = await prettierJs(model.getValue());
        if (code2 === mod3.code)
          return code2;
        const counter = ++mod3.counter;
        mod3.code = code2;
        runner({ code: code2, counter, codeSpace: codeSpace2 });
        try {
          (async () => {
            const tsWorker = await (await getTypeScriptWorker())(
              model.uri
            );
            const diag = await tsWorker.getSemanticDiagnostics(
              location.origin + "/live/" + codeSpace2 + ".tsx"
            );
            if (diag.length) {
              console.log(diag.map((d) => d.messageText));
            }
          })();
        } catch (e) {
          console.error("ts diag error");
        }
        if (mod3.code !== code2)
          throw new Error("code just changed");
        return code2;
      };
      const setValue = async (_code) => {
        const i2 = mST().i;
        const code2 = await prettierJs(_code);
        if (code2.length < 10)
          return;
        if (code2 === await getValue())
          return;
        if (i2 <= mod3.counter)
          return;
        mod3.code = code2;
        mod3.counter = i2;
        setMonValue(code2);
        changeContent((ct) => __spreadProps(__spreadValues({}, ct), { myCode: mod3.code, counter: i2 }));
      };
      mod3.getValue = getValue;
      mod3.setValue = setValue;
      changeContent(__spreadProps(__spreadValues({}, mySession), {
        started: true,
        onChange: (cb) => model.onDidChangeContent(cb).dispose,
        myId: "editor"
      }));
    };
    const setAce = async () => {
      const { startAce } = await import("./chunk-startAce-2TJVEOC6.mjs");
      const editor = await startAce(mST().code);
      const getValue = async () => {
        const code2 = await prettierJs(editor.session.getValue());
        if (code2 === mod3.code)
          return mod3.code;
        const counter = ++mod3.counter;
        mod3.code = code2;
        runner({ code: code2, counter, codeSpace: codeSpace2 });
        return mod3.code;
      };
      const setValue = async (_code) => {
        const i2 = mST().i;
        const code2 = await prettierJs(_code);
        mod3.codeToSet = code2;
        if (code2.length < `export default ()=><></>`.length)
          return;
        if (code2 === await getValue())
          return;
        if (i2 == mod3.counter)
          return;
        mod3.code = code2;
        mod3.counter = i2;
        editor.session.setValue(code2);
        changeContent((ct) => __spreadProps(__spreadValues({}, ct), { myCode: mod3.code, counter: i2 }));
      };
      mod3.getValue = getValue;
      mod3.setValue = setValue;
      changeContent(__spreadProps(__spreadValues({}, mySession), {
        onChange(cb) {
          editor.session.on("change", cb);
          return () => {
            editor.session.off("change", cb);
          };
        },
        started: true,
        myId: "editor"
      }));
    };
    const loadEditors = () => engine === "monaco" ? setMonaco() : setAce();
    !started && loadEditors();
  }, [started, ref]);
  react_preact_default.useEffect(
    () => onChange(
      () => mod3.getValue().then(
        () => changeContent((x) => __spreadProps(__spreadValues({}, x), {
          counter: mod3.counter,
          myCode: mod3.code
        }))
      )
    ),
    [onChange, myCode, changeContent]
  );
  onSessionUpdate(() => {
    if (mod3.counter > mST().i) {
      return;
    }
    mod3.counter = mST().i;
    mod3.code = mST().code;
    mod3.setValue(mod3.code);
    changeContent((x) => __spreadProps(__spreadValues({}, x), {
      counter: mod3.counter,
      myCode: mod3.code
    }));
  }, "editor");
  return export_jsx("div", {
    onKeyDown: () => mod3.lastKeyDown = Date.now(),
    "data-test-id": myId,
    id: "editor",
    css: export_css`
        
            max-width: 640px;
            height: 100%;
            
            
        `,
    ref
  });
};

// js/renderPreviewWindow.tsx
var RainbowContainer = ({ children }) => export_jsx("div", {
  css: export_css`
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
});
var AppToRender = ({ codeSpace: codeSpace2, assets }) => {
  const currentHash = hashCode();
  const [hash, setHash] = useState(currentHash);
  const isStandalone = location.pathname.endsWith("public") || location.pathname.endsWith("hydrated");
  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory();
          setHash(newHash);
        } catch (error) {
          console.error({ e: error });
        }
      }
    }, "myApp");
  }, [hash, setHash]);
  const portalNode = useMemo(() => createHtmlPortalNode({
    attributes: { id: `root-${codeSpace2}`, style: "height: 100%" }
  }), []);
  return export_jsxs(p, {
    children: [
      export_jsx(InPortal, {
        node: portalNode,
        children: export_jsx(AutoUpdateApp, {
          hash,
          codeSpace: codeSpace2
        })
      }),
      isStandalone ? export_jsx(OutPortal, {
        node: portalNode
      }) : export_jsx(RainbowContainer, {
        children: export_jsxs(p, {
          children: [
            export_jsx(Editor, {
              codeSpace: codeSpace2,
              assets
            }),
            export_jsx(DraggableWindow, {
              hashCode: 0,
              room: codeSpace2,
              children: export_jsx(OutPortal, {
                node: portalNode
              })
            })
          ]
        })
      })
    ]
  });
};
var singleton = { started: false };
var renderPreviewWindow = ({ codeSpace: codeSpace2, assets }) => {
  if (singleton.started)
    return;
  singleton.started = true;
  const div = document.querySelector("#root");
  const root = createRoot(div);
  const cache = emotionCache_default({ key: "win" });
  console.log({ cache });
  root.render(
    export_jsx(p, {
      children: export_jsx(export_CacheProvider, {
        value: cache,
        children: export_jsx(AppToRender, {
          codeSpace: codeSpace2,
          assets
        })
      })
    })
  );
};

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
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
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

// js/ws.ts
var users = new AVLTree(
  (a, b) => a === b ? 0 : a < b ? 1 : -1,
  true
);
var webRtcArray = [];
var user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || v4()).slice(
  0,
  8
);
users.insert(user);
var rtcConns = {};
var bc;
var codeSpace;
var _hash = "";
var wsLastHashCode = 0;
var webRTCLastSeenHashCode = 0;
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws = null;
var sendWS;
var rejoined = false;
var tracks = {};
var sendChannel = {
  localStream: null,
  webRtcArray,
  tracks,
  user,
  rtcConns,
  send(data) {
    const messageString = JSON.stringify(__spreadProps(__spreadValues({}, data), {
      name: data.name || user
    }));
    webRtcArray.map((ch) => {
      try {
        if (ch.readyState !== "open") {
          return;
        }
        if (!data.target || ch.target === data.target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (error) {
      }
    });
  }
};
Object.assign(globalThis, { sendChannel });
var run = async (startState) => {
  const { assets, mST: mst, address } = startState;
  codeSpace = startState.codeSpace;
  bc = new BroadcastChannel(location.origin);
  if (location.pathname.endsWith("dehydrated")) {
    if (bc.onmessage = (event) => {
      if (event.data.codeSpace === codeSpace) {
        console.log(event.data);
      }
    }) {
      return;
    }
  }
  startSession(codeSpace, {
    name: user,
    state: mst
  }, location.origin);
  await appFactory(mst.transpiled);
  renderPreviewWindow({ codeSpace, assets });
  await join();
  bc = new BroadcastChannel(location.origin);
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user) {
      return;
    }
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
    () => {
      const sess = mST();
      const hash = md5(JSON.stringify(sess));
      if (hash === _hash)
        return;
      _hash = hash;
      bc.postMessage({
        ignoreUser: user,
        sess,
        codeSpace,
        address
      });
    },
    "broadcast"
  );
};
var intervalHandler = null;
async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;
    const newWs = await join();
    return newWs;
  }
  return ws;
}
var ignoreUsers = [];
function saveCode() {
  debouncedSyncWs();
  debouncedSyncRTC();
}
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
      if (wsLastHashCode === hashCode()) {
        return;
      }
      const sess = mST();
      const message = await makePatchFrom(
        wsLastHashCode,
        sess
      );
      if (!message) {
        return;
      }
      if (message.newHash !== hashCode()) {
        return;
      }
      const messageString = JSON.stringify(__spreadProps(__spreadValues({}, message), { name: user }));
      sendWS(messageString);
    } else {
      rejoined = false;
      await rejoin();
    }
  } catch (error) {
  }
}
var stopVideo = async () => {
  if (!sendChannel.localStream)
    return;
  sendChannel.localStream.getTracks().map((x) => x.stop());
};
var startVideo2 = async (vidElement) => {
  const mediaConstraints = {
    audio: true,
    video: true
  };
  const localStream = await navigator.mediaDevices.getUserMedia(
    mediaConstraints
  );
  vidElement.srcObject = localStream;
  localStream.getTracks().forEach(
    (track) => Object.keys(sendChannel.rtcConns).map((k) => {
      const datachannel = sendChannel.rtcConns[k];
      datachannel.addTrack(track);
      datachannel.ontrack = ({ track: track2, streams }) => tracks[k] = { track: track2, streams };
    })
  );
};
async function syncRTC() {
  try {
    if (Object.keys(rtcConns).length > 0) {
      if (webRTCLastSeenHashCode === hashCode()) {
        return;
      }
      const sess = mST();
      const message = webRTCLastSeenHashCode ? await makePatchFrom(
        webRTCLastSeenHashCode,
        sess
      ) : await makePatch(sess);
      if (message && message.patch) {
        sendChannel.send(message);
      }
    }
  } catch (error) {
  }
}
async function join() {
  if (ws !== null) {
    return ws;
  }
  rejoined = true;
  if (location.origin.includes("localhost")) {
    return;
  }
  const wsConnection = new WebSocket(
    `wss://${location.host}/live/` + codeSpace + "/websocket"
  );
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    ws = wsConnection;
    const mess = (data) => {
      try {
        ws && (ws == null ? void 0 : ws.send) && (ws == null ? void 0 : ws.send(data));
      } catch (e) {
        ws = null;
        rejoined = false;
        rejoin();
      }
    };
    sendWS = mess;
    const extendedWS = Object.assign(wsConnection, { hashCode: hashCode() });
    ws.addEventListener(
      "message",
      (message) => processWsMessage(message, "ws", extendedWS)
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
            wsConnection == null ? void 0 : wsConnection.send(
              JSON.stringify({
                name: user,
                timestamp: lastSeenTimestamp + diff
              })
            );
            return;
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
var h = {};
async function processWsMessage(event, source, conn) {
  if (ws == null) {
    return;
  }
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  processData(data, source, conn);
}
async function processData(data, source, conn) {
  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (data.hashCode || data.newHash && conn) {
    conn.hashCode = data.hashCode || data.newHash;
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
  if (ignoreUsers.includes(data.name)) {
    return;
  }
  if (data.newHash === hashCode()) {
    return;
  }
  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash) {
      return;
    }
    h[data.oldHash] = data.newHash;
  }
  if (data.newHash === hashCode()) {
    return;
  }
  (async () => {
    try {
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }
      if (data.type === "video-offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }
      if (data.type === "video-answer") {
        await handleChatAnswerMessage(data.answer, data.name);
        return;
      }
      if (data.name && data.name !== user && !rtcConns[data.name] && !ignoreUsers.includes(data.name)) {
        await createPeerConnection(data.name);
        return;
      }
    } catch (error) {
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
    if (rtcConns[target]) {
      return;
    }
    rtcConns[target] = new RTCPeerConnection(
      rcpOptions
    );
    rtcConns[target].onicecandidate = (event) => {
      if (event.candidate) {
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
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };
    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;
    rtcConns[target].ontrack = function({ track, streams }) {
      tracks[target] = { track, streams };
    };
    rtcConns[target].ondatachannel = (event) => {
      const rtc2 = event.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
      if (sendChannel && sendChannel.localStream && sendChannel.localStream.active) {
        sendChannel.localStream.getTracks().forEach((track) => {
          const datachannel = rtcConns[target];
          datachannel.addTrack(track);
          datachannel.ontrack = ({ track: track2, streams }) => tracks[target] = { track: track2, streams };
        });
      }
      rtc2.addEventListener(
        "message",
        async (message) => processWsMessage(
          message,
          "rtc",
          Object.assign(rtc2, { hashCode: hashCode() })
        )
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
    rtc.addEventListener("error", (error) => {
      console.log("xxxxxx-  Data Channel Error:", error);
    });
    rtc.addEventListener("open", () => {
      webRtcArray.push(rtc);
    });
    rtc.addEventListener("close", () => {
    });
    return rtcConns[target];
    function onReceiveChannelClosed() {
      rtcConns[target].close();
      delete rtcConns[target];
    }
    async function handleNegotiationNeededEvent() {
      try {
        const offer = await rtcConns[target].createOffer();
        if (rtcConns[target].signalingState != "stable") {
          return;
        }
        await rtcConns[target].setLocalDescription(offer);
        ws == null ? void 0 : ws.send(JSON.stringify({
          target,
          name: user,
          type: "video-offer",
          offer: rtcConns[target].localDescription
        }));
      } catch (e) {
      }
    }
    function handleICEConnectionStateChangeEvent() {
      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }
    function handleICEGatheringStateChangeEvent() {
    }
  }
  async function handleChatAnswerMessage(answer, target) {
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(
        answer
      )
    ).catch(console.error);
  }
  async function handleChatOffer(offer, target) {
    if (!rtcConns[target]) {
      createPeerConnection(target);
    }
    await rtcConns[target].setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answer = await rtcConns[target].createAnswer();
    await rtcConns[target].setLocalDescription(
      answer
    );
    ws == null ? void 0 : ws.send(JSON.stringify({
      target,
      name: user,
      type: "video-answer",
      answer
    }));
  }
}
var rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`
  }))
};
rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302"
}];
async function handleNewICECandidateMessage(init2, target) {
  const candidate = new RTCIceCandidate(init2);
  await rtcConns[target].addIceCandidate(candidate);
}
async function sw() {
  try {
    navigator.serviceWorker.onmessage = async (event) => {
      const serviceWorker = event.source;
      if (serviceWorker == null) {
        return;
      }
      switch (event.data.method) {
        case "ipfs-message-port":
          const channel = new MessageChannel();
          {
            serviceWorker.postMessage({
              method: "ipfs-message-port",
              id: event.data.id,
              port: channel.port2
            }, { transfer: [channel.port2] });
          }
      }
    };
    if (document.documentElement.dataset.viewer) {
      const load = async (path) => {
        const paths = path && path.split("/") || [];
        const protocol = paths[0] || "";
        switch (protocol) {
          case "ipfs":
          case "ipns": {
            document.body.innerHTML = `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
          }
        }
      };
      await load(location.pathname);
      return;
    }
  } catch (e) {
  }
}

export {
  sendChannel,
  run,
  saveCode,
  stopVideo,
  startVideo2 as startVideo,
  join,
  sw,
  render,
  renderFromString
};
