import {
  require_client
} from "./chunk-chunk-FFMS35Y7.mjs";
import {
  emotionCache_default
} from "./chunk-chunk-TIL35SAU.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-RNJNNLQS.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-NFYMKIWC.mjs";
import {
  hashCode,
  mST,
  md5,
  onSessionUpdate,
  patchSync,
  require_lodash,
  resetCSS
} from "./chunk-chunk-MIF2TXG6.mjs";
import {
  require_react
} from "./chunk-chunk-UX3KX3KY.mjs";
import {
  __commonJS,
  __name,
  __require,
  __toESM,
  init_define_process
} from "./chunk-chunk-A3E5PINE.mjs";

// ../../.yarn/global/cache/esbuild-wasm-npm-0.15.16-c2c146172f-9.zip/node_modules/esbuild-wasm/lib/browser.js
var require_browser = __commonJS({
  "../../.yarn/global/cache/esbuild-wasm-npm-0.15.16-c2c146172f-9.zip/node_modules/esbuild-wasm/lib/browser.js"(exports, module) {
    init_define_process();
    ((module2) => {
      "use strict";
      var __defProp = Object.defineProperty;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames = Object.getOwnPropertyNames;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __export = /* @__PURE__ */ __name((target, all) => {
        for (var name in all)
          __defProp(target, name, { get: all[name], enumerable: true });
      }, "__export");
      var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames(from))
            if (!__hasOwnProp.call(to, key) && key !== except)
              __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
        }
        return to;
      }, "__copyProps");
      var __toCommonJS = /* @__PURE__ */ __name((mod4) => __copyProps(__defProp({}, "__esModule", { value: true }), mod4), "__toCommonJS");
      var __async = /* @__PURE__ */ __name((__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = /* @__PURE__ */ __name((value) => {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }, "fulfilled");
          var rejected = /* @__PURE__ */ __name((value) => {
            try {
              step(generator.throw(value));
            } catch (e2) {
              reject(e2);
            }
          }, "rejected");
          var step = /* @__PURE__ */ __name((x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected), "step");
          step((generator = generator.apply(__this, __arguments)).next());
        });
      }, "__async");
      var browser_exports = {};
      __export(browser_exports, {
        analyzeMetafile: () => analyzeMetafile,
        analyzeMetafileSync: () => analyzeMetafileSync,
        build: () => build2,
        buildSync: () => buildSync,
        default: () => browser_default,
        formatMessages: () => formatMessages,
        formatMessagesSync: () => formatMessagesSync,
        initialize: () => initialize2,
        serve: () => serve,
        transform: () => transform2,
        transformSync: () => transformSync,
        version: () => version
      });
      module2.exports = __toCommonJS(browser_exports);
      function encodePacket(packet) {
        let visit = /* @__PURE__ */ __name((value) => {
          if (value === null) {
            bb.write8(0);
          } else if (typeof value === "boolean") {
            bb.write8(1);
            bb.write8(+value);
          } else if (typeof value === "number") {
            bb.write8(2);
            bb.write32(value | 0);
          } else if (typeof value === "string") {
            bb.write8(3);
            bb.write(encodeUTF8(value));
          } else if (value instanceof Uint8Array) {
            bb.write8(4);
            bb.write(value);
          } else if (value instanceof Array) {
            bb.write8(5);
            bb.write32(value.length);
            for (let item of value) {
              visit(item);
            }
          } else {
            let keys = Object.keys(value);
            bb.write8(6);
            bb.write32(keys.length);
            for (let key of keys) {
              bb.write(encodeUTF8(key));
              visit(value[key]);
            }
          }
        }, "visit");
        let bb = new ByteBuffer();
        bb.write32(0);
        bb.write32(packet.id << 1 | +!packet.isRequest);
        visit(packet.value);
        writeUInt32LE(bb.buf, bb.len - 4, 0);
        return bb.buf.subarray(0, bb.len);
      }
      __name(encodePacket, "encodePacket");
      function decodePacket(bytes) {
        let visit = /* @__PURE__ */ __name(() => {
          switch (bb.read8()) {
            case 0:
              return null;
            case 1:
              return !!bb.read8();
            case 2:
              return bb.read32();
            case 3:
              return decodeUTF8(bb.read());
            case 4:
              return bb.read();
            case 5: {
              let count = bb.read32();
              let value2 = [];
              for (let i2 = 0; i2 < count; i2++) {
                value2.push(visit());
              }
              return value2;
            }
            case 6: {
              let count = bb.read32();
              let value2 = {};
              for (let i2 = 0; i2 < count; i2++) {
                value2[decodeUTF8(bb.read())] = visit();
              }
              return value2;
            }
            default:
              throw new Error("Invalid packet");
          }
        }, "visit");
        let bb = new ByteBuffer(bytes);
        let id = bb.read32();
        let isRequest = (id & 1) === 0;
        id >>>= 1;
        let value = visit();
        if (bb.ptr !== bytes.length) {
          throw new Error("Invalid packet");
        }
        return { id, isRequest, value };
      }
      __name(decodePacket, "decodePacket");
      var ByteBuffer = /* @__PURE__ */ __name(class {
        constructor(buf = new Uint8Array(1024)) {
          this.buf = buf;
          this.len = 0;
          this.ptr = 0;
        }
        _write(delta) {
          if (this.len + delta > this.buf.length) {
            let clone = new Uint8Array((this.len + delta) * 2);
            clone.set(this.buf);
            this.buf = clone;
          }
          this.len += delta;
          return this.len - delta;
        }
        write8(value) {
          let offset = this._write(1);
          this.buf[offset] = value;
        }
        write32(value) {
          let offset = this._write(4);
          writeUInt32LE(this.buf, value, offset);
        }
        write(bytes) {
          let offset = this._write(4 + bytes.length);
          writeUInt32LE(this.buf, bytes.length, offset);
          this.buf.set(bytes, offset + 4);
        }
        _read(delta) {
          if (this.ptr + delta > this.buf.length) {
            throw new Error("Invalid packet");
          }
          this.ptr += delta;
          return this.ptr - delta;
        }
        read8() {
          return this.buf[this._read(1)];
        }
        read32() {
          return readUInt32LE(this.buf, this._read(4));
        }
        read() {
          let length = this.read32();
          let bytes = new Uint8Array(length);
          let ptr = this._read(bytes.length);
          bytes.set(this.buf.subarray(ptr, ptr + length));
          return bytes;
        }
      }, "ByteBuffer");
      var encodeUTF8;
      var decodeUTF8;
      if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
        let encoder = new TextEncoder();
        let decoder = new TextDecoder();
        encodeUTF8 = /* @__PURE__ */ __name((text) => encoder.encode(text), "encodeUTF8");
        decodeUTF8 = /* @__PURE__ */ __name((bytes) => decoder.decode(bytes), "decodeUTF8");
      } else if (typeof Buffer !== "undefined") {
        encodeUTF8 = /* @__PURE__ */ __name((text) => {
          let buffer = Buffer.from(text);
          if (!(buffer instanceof Uint8Array)) {
            buffer = new Uint8Array(buffer);
          }
          return buffer;
        }, "encodeUTF8");
        decodeUTF8 = /* @__PURE__ */ __name((bytes) => {
          let { buffer, byteOffset, byteLength } = bytes;
          return Buffer.from(buffer, byteOffset, byteLength).toString();
        }, "decodeUTF8");
      } else {
        throw new Error("No UTF-8 codec found");
      }
      function readUInt32LE(buffer, offset) {
        return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
      }
      __name(readUInt32LE, "readUInt32LE");
      function writeUInt32LE(buffer, value, offset) {
        buffer[offset++] = value;
        buffer[offset++] = value >> 8;
        buffer[offset++] = value >> 16;
        buffer[offset++] = value >> 24;
      }
      __name(writeUInt32LE, "writeUInt32LE");
      var buildLogLevelDefault = "warning";
      var transformLogLevelDefault = "silent";
      function validateTarget(target) {
        target += "";
        if (target.indexOf(",") >= 0)
          throw new Error(`Invalid target: ${target}`);
        return target;
      }
      __name(validateTarget, "validateTarget");
      var canBeAnything = /* @__PURE__ */ __name(() => null, "canBeAnything");
      var mustBeBoolean = /* @__PURE__ */ __name((value) => typeof value === "boolean" ? null : "a boolean", "mustBeBoolean");
      var mustBeBooleanOrObject = /* @__PURE__ */ __name((value) => typeof value === "boolean" || typeof value === "object" && !Array.isArray(value) ? null : "a boolean or an object", "mustBeBooleanOrObject");
      var mustBeString = /* @__PURE__ */ __name((value) => typeof value === "string" ? null : "a string", "mustBeString");
      var mustBeRegExp = /* @__PURE__ */ __name((value) => value instanceof RegExp ? null : "a RegExp object", "mustBeRegExp");
      var mustBeInteger = /* @__PURE__ */ __name((value) => typeof value === "number" && value === (value | 0) ? null : "an integer", "mustBeInteger");
      var mustBeFunction = /* @__PURE__ */ __name((value) => typeof value === "function" ? null : "a function", "mustBeFunction");
      var mustBeArray = /* @__PURE__ */ __name((value) => Array.isArray(value) ? null : "an array", "mustBeArray");
      var mustBeObject = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object", "mustBeObject");
      var mustBeWebAssemblyModule = /* @__PURE__ */ __name((value) => value instanceof WebAssembly.Module ? null : "a WebAssembly.Module", "mustBeWebAssemblyModule");
      var mustBeArrayOrRecord = /* @__PURE__ */ __name((value) => typeof value === "object" && value !== null ? null : "an array or an object", "mustBeArrayOrRecord");
      var mustBeObjectOrNull = /* @__PURE__ */ __name((value) => typeof value === "object" && !Array.isArray(value) ? null : "an object or null", "mustBeObjectOrNull");
      var mustBeStringOrBoolean = /* @__PURE__ */ __name((value) => typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean", "mustBeStringOrBoolean");
      var mustBeStringOrObject = /* @__PURE__ */ __name((value) => typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object", "mustBeStringOrObject");
      var mustBeStringOrArray = /* @__PURE__ */ __name((value) => typeof value === "string" || Array.isArray(value) ? null : "a string or an array", "mustBeStringOrArray");
      var mustBeStringOrUint8Array = /* @__PURE__ */ __name((value) => typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array", "mustBeStringOrUint8Array");
      function getFlag(object, keys, key, mustBeFn) {
        let value = object[key];
        keys[key + ""] = true;
        if (value === void 0)
          return void 0;
        let mustBe = mustBeFn(value);
        if (mustBe !== null)
          throw new Error(`"${key}" must be ${mustBe}`);
        return value;
      }
      __name(getFlag, "getFlag");
      function checkForInvalidFlags(object, keys, where) {
        for (let key in object) {
          if (!(key in keys)) {
            throw new Error(`Invalid option ${where}: "${key}"`);
          }
        }
      }
      __name(checkForInvalidFlags, "checkForInvalidFlags");
      function validateInitializeOptions(options) {
        let keys = /* @__PURE__ */ Object.create(null);
        let wasmURL = getFlag(options, keys, "wasmURL", mustBeString);
        let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
        let worker2 = getFlag(options, keys, "worker", mustBeBoolean);
        checkForInvalidFlags(options, keys, "in initialize() call");
        return {
          wasmURL,
          wasmModule,
          worker: worker2
        };
      }
      __name(validateInitializeOptions, "validateInitializeOptions");
      function validateMangleCache(mangleCache) {
        let validated;
        if (mangleCache !== void 0) {
          validated = /* @__PURE__ */ Object.create(null);
          for (let key of Object.keys(mangleCache)) {
            let value = mangleCache[key];
            if (typeof value === "string" || value === false) {
              validated[key] = value;
            } else {
              throw new Error(`Expected ${JSON.stringify(key)} in mangle cache to map to either a string or false`);
            }
          }
        }
        return validated;
      }
      __name(validateMangleCache, "validateMangleCache");
      function pushLogFlags(flags, options, keys, isTTY, logLevelDefault) {
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let logLevel = getFlag(options, keys, "logLevel", mustBeString);
        let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
        if (color !== void 0)
          flags.push(`--color=${color}`);
        else if (isTTY)
          flags.push(`--color=true`);
        flags.push(`--log-level=${logLevel || logLevelDefault}`);
        flags.push(`--log-limit=${logLimit || 0}`);
      }
      __name(pushLogFlags, "pushLogFlags");
      function pushCommonFlags(flags, options, keys) {
        let legalComments = getFlag(options, keys, "legalComments", mustBeString);
        let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
        let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
        let target = getFlag(options, keys, "target", mustBeStringOrArray);
        let format = getFlag(options, keys, "format", mustBeString);
        let globalName = getFlag(options, keys, "globalName", mustBeString);
        let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
        let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
        let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
        let minify = getFlag(options, keys, "minify", mustBeBoolean);
        let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
        let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
        let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
        let drop = getFlag(options, keys, "drop", mustBeArray);
        let charset = getFlag(options, keys, "charset", mustBeString);
        let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
        let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
        let jsx3 = getFlag(options, keys, "jsx", mustBeString);
        let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
        let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
        let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
        let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
        let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
        let define3 = getFlag(options, keys, "define", mustBeObject);
        let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
        let supported = getFlag(options, keys, "supported", mustBeObject);
        let pure = getFlag(options, keys, "pure", mustBeArray);
        let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
        let platform = getFlag(options, keys, "platform", mustBeString);
        if (legalComments)
          flags.push(`--legal-comments=${legalComments}`);
        if (sourceRoot !== void 0)
          flags.push(`--source-root=${sourceRoot}`);
        if (sourcesContent !== void 0)
          flags.push(`--sources-content=${sourcesContent}`);
        if (target) {
          if (Array.isArray(target))
            flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
          else
            flags.push(`--target=${validateTarget(target)}`);
        }
        if (format)
          flags.push(`--format=${format}`);
        if (globalName)
          flags.push(`--global-name=${globalName}`);
        if (platform)
          flags.push(`--platform=${platform}`);
        if (minify)
          flags.push("--minify");
        if (minifySyntax)
          flags.push("--minify-syntax");
        if (minifyWhitespace)
          flags.push("--minify-whitespace");
        if (minifyIdentifiers)
          flags.push("--minify-identifiers");
        if (charset)
          flags.push(`--charset=${charset}`);
        if (treeShaking !== void 0)
          flags.push(`--tree-shaking=${treeShaking}`);
        if (ignoreAnnotations)
          flags.push(`--ignore-annotations`);
        if (drop)
          for (let what of drop)
            flags.push(`--drop:${what}`);
        if (mangleProps)
          flags.push(`--mangle-props=${mangleProps.source}`);
        if (reserveProps)
          flags.push(`--reserve-props=${reserveProps.source}`);
        if (mangleQuoted !== void 0)
          flags.push(`--mangle-quoted=${mangleQuoted}`);
        if (jsx3)
          flags.push(`--jsx=${jsx3}`);
        if (jsxFactory)
          flags.push(`--jsx-factory=${jsxFactory}`);
        if (jsxFragment)
          flags.push(`--jsx-fragment=${jsxFragment}`);
        if (jsxImportSource)
          flags.push(`--jsx-import-source=${jsxImportSource}`);
        if (jsxDev)
          flags.push(`--jsx-dev`);
        if (jsxSideEffects)
          flags.push(`--jsx-side-effects`);
        if (define3) {
          for (let key in define3) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${define3[key]}`);
          }
        }
        if (logOverride) {
          for (let key in logOverride) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid log override: ${key}`);
            flags.push(`--log-override:${key}=${logOverride[key]}`);
          }
        }
        if (supported) {
          for (let key in supported) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid supported: ${key}`);
            flags.push(`--supported:${key}=${supported[key]}`);
          }
        }
        if (pure)
          for (let fn of pure)
            flags.push(`--pure:${fn}`);
        if (keepNames)
          flags.push(`--keep-names`);
      }
      __name(pushCommonFlags, "pushCommonFlags");
      function flagsForBuildOptions(callName, options, isTTY, logLevelDefault, writeDefault) {
        var _a;
        let flags = [];
        let entries = [];
        let keys = /* @__PURE__ */ Object.create(null);
        let stdinContents = null;
        let stdinResolveDir = null;
        let watchMode = null;
        pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
        pushCommonFlags(flags, options, keys);
        let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
        let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
        let watch = getFlag(options, keys, "watch", mustBeBooleanOrObject);
        let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
        let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
        let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
        let outfile = getFlag(options, keys, "outfile", mustBeString);
        let outdir = getFlag(options, keys, "outdir", mustBeString);
        let outbase = getFlag(options, keys, "outbase", mustBeString);
        let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
        let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
        let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
        let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
        let conditions = getFlag(options, keys, "conditions", mustBeArray);
        let external = getFlag(options, keys, "external", mustBeArray);
        let alias = getFlag(options, keys, "alias", mustBeObject);
        let loader = getFlag(options, keys, "loader", mustBeObject);
        let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
        let publicPath = getFlag(options, keys, "publicPath", mustBeString);
        let entryNames = getFlag(options, keys, "entryNames", mustBeString);
        let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
        let assetNames = getFlag(options, keys, "assetNames", mustBeString);
        let inject = getFlag(options, keys, "inject", mustBeArray);
        let banner = getFlag(options, keys, "banner", mustBeObject);
        let footer = getFlag(options, keys, "footer", mustBeObject);
        let entryPoints = getFlag(options, keys, "entryPoints", mustBeArrayOrRecord);
        let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
        let stdin = getFlag(options, keys, "stdin", mustBeObject);
        let write = (_a = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a : writeDefault;
        let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
        let incremental = getFlag(options, keys, "incremental", mustBeBoolean) === true;
        let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
        keys.plugins = true;
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        if (sourcemap)
          flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
        if (bundle)
          flags.push("--bundle");
        if (allowOverwrite)
          flags.push("--allow-overwrite");
        if (watch) {
          flags.push("--watch");
          if (typeof watch === "boolean") {
            watchMode = {};
          } else {
            let watchKeys = /* @__PURE__ */ Object.create(null);
            let onRebuild = getFlag(watch, watchKeys, "onRebuild", mustBeFunction);
            checkForInvalidFlags(watch, watchKeys, `on "watch" in ${callName}() call`);
            watchMode = { onRebuild };
          }
        }
        if (splitting)
          flags.push("--splitting");
        if (preserveSymlinks)
          flags.push("--preserve-symlinks");
        if (metafile)
          flags.push(`--metafile`);
        if (outfile)
          flags.push(`--outfile=${outfile}`);
        if (outdir)
          flags.push(`--outdir=${outdir}`);
        if (outbase)
          flags.push(`--outbase=${outbase}`);
        if (tsconfig)
          flags.push(`--tsconfig=${tsconfig}`);
        if (resolveExtensions) {
          let values = [];
          for (let value of resolveExtensions) {
            value += "";
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid resolve extension: ${value}`);
            values.push(value);
          }
          flags.push(`--resolve-extensions=${values.join(",")}`);
        }
        if (publicPath)
          flags.push(`--public-path=${publicPath}`);
        if (entryNames)
          flags.push(`--entry-names=${entryNames}`);
        if (chunkNames)
          flags.push(`--chunk-names=${chunkNames}`);
        if (assetNames)
          flags.push(`--asset-names=${assetNames}`);
        if (mainFields) {
          let values = [];
          for (let value of mainFields) {
            value += "";
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid main field: ${value}`);
            values.push(value);
          }
          flags.push(`--main-fields=${values.join(",")}`);
        }
        if (conditions) {
          let values = [];
          for (let value of conditions) {
            value += "";
            if (value.indexOf(",") >= 0)
              throw new Error(`Invalid condition: ${value}`);
            values.push(value);
          }
          flags.push(`--conditions=${values.join(",")}`);
        }
        if (external)
          for (let name of external)
            flags.push(`--external:${name}`);
        if (alias) {
          for (let old in alias) {
            if (old.indexOf("=") >= 0)
              throw new Error(`Invalid package name in alias: ${old}`);
            flags.push(`--alias:${old}=${alias[old]}`);
          }
        }
        if (banner) {
          for (let type in banner) {
            if (type.indexOf("=") >= 0)
              throw new Error(`Invalid banner file type: ${type}`);
            flags.push(`--banner:${type}=${banner[type]}`);
          }
        }
        if (footer) {
          for (let type in footer) {
            if (type.indexOf("=") >= 0)
              throw new Error(`Invalid footer file type: ${type}`);
            flags.push(`--footer:${type}=${footer[type]}`);
          }
        }
        if (inject)
          for (let path of inject)
            flags.push(`--inject:${path}`);
        if (loader) {
          for (let ext in loader) {
            if (ext.indexOf("=") >= 0)
              throw new Error(`Invalid loader extension: ${ext}`);
            flags.push(`--loader:${ext}=${loader[ext]}`);
          }
        }
        if (outExtension) {
          for (let ext in outExtension) {
            if (ext.indexOf("=") >= 0)
              throw new Error(`Invalid out extension: ${ext}`);
            flags.push(`--out-extension:${ext}=${outExtension[ext]}`);
          }
        }
        if (entryPoints) {
          if (Array.isArray(entryPoints)) {
            for (let entryPoint of entryPoints) {
              entries.push(["", entryPoint + ""]);
            }
          } else {
            for (let [key, value] of Object.entries(entryPoints)) {
              entries.push([key + "", value + ""]);
            }
          }
        }
        if (stdin) {
          let stdinKeys = /* @__PURE__ */ Object.create(null);
          let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
          let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
          let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
          let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
          checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
          if (sourcefile)
            flags.push(`--sourcefile=${sourcefile}`);
          if (loader2)
            flags.push(`--loader=${loader2}`);
          if (resolveDir)
            stdinResolveDir = resolveDir + "";
          if (typeof contents === "string")
            stdinContents = encodeUTF8(contents);
          else if (contents instanceof Uint8Array)
            stdinContents = contents;
        }
        let nodePaths = [];
        if (nodePathsInput) {
          for (let value of nodePathsInput) {
            value += "";
            nodePaths.push(value);
          }
        }
        return {
          entries,
          flags,
          write,
          stdinContents,
          stdinResolveDir,
          absWorkingDir,
          incremental,
          nodePaths,
          watch: watchMode,
          mangleCache: validateMangleCache(mangleCache)
        };
      }
      __name(flagsForBuildOptions, "flagsForBuildOptions");
      function flagsForTransformOptions(callName, options, isTTY, logLevelDefault) {
        let flags = [];
        let keys = /* @__PURE__ */ Object.create(null);
        pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
        pushCommonFlags(flags, options, keys);
        let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
        let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
        let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
        let loader = getFlag(options, keys, "loader", mustBeString);
        let banner = getFlag(options, keys, "banner", mustBeString);
        let footer = getFlag(options, keys, "footer", mustBeString);
        let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        if (sourcemap)
          flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
        if (tsconfigRaw)
          flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
        if (sourcefile)
          flags.push(`--sourcefile=${sourcefile}`);
        if (loader)
          flags.push(`--loader=${loader}`);
        if (banner)
          flags.push(`--banner=${banner}`);
        if (footer)
          flags.push(`--footer=${footer}`);
        return {
          flags,
          mangleCache: validateMangleCache(mangleCache)
        };
      }
      __name(flagsForTransformOptions, "flagsForTransformOptions");
      function createChannel(streamIn) {
        const requestCallbacksByKey = {};
        const closeData = { didClose: false, reason: "" };
        let responseCallbacks = {};
        let nextRequestID = 0;
        let nextBuildKey = 0;
        let stdout = new Uint8Array(16 * 1024);
        let stdoutUsed = 0;
        let readFromStdout = /* @__PURE__ */ __name((chunk) => {
          let limit = stdoutUsed + chunk.length;
          if (limit > stdout.length) {
            let swap = new Uint8Array(limit * 2);
            swap.set(stdout);
            stdout = swap;
          }
          stdout.set(chunk, stdoutUsed);
          stdoutUsed += chunk.length;
          let offset = 0;
          while (offset + 4 <= stdoutUsed) {
            let length = readUInt32LE(stdout, offset);
            if (offset + 4 + length > stdoutUsed) {
              break;
            }
            offset += 4;
            handleIncomingPacket(stdout.subarray(offset, offset + length));
            offset += length;
          }
          if (offset > 0) {
            stdout.copyWithin(0, offset, stdoutUsed);
            stdoutUsed -= offset;
          }
        }, "readFromStdout");
        let afterClose = /* @__PURE__ */ __name((error) => {
          closeData.didClose = true;
          if (error)
            closeData.reason = ": " + (error.message || error);
          const text = "The service was stopped" + closeData.reason;
          for (let id in responseCallbacks) {
            responseCallbacks[id](text, null);
          }
          responseCallbacks = {};
        }, "afterClose");
        let sendRequest = /* @__PURE__ */ __name((refs, value, callback) => {
          if (closeData.didClose)
            return callback("The service is no longer running" + closeData.reason, null);
          let id = nextRequestID++;
          responseCallbacks[id] = (error, response) => {
            try {
              callback(error, response);
            } finally {
              if (refs)
                refs.unref();
            }
          };
          if (refs)
            refs.ref();
          streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
        }, "sendRequest");
        let sendResponse = /* @__PURE__ */ __name((id, value) => {
          if (closeData.didClose)
            throw new Error("The service is no longer running" + closeData.reason);
          streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
        }, "sendResponse");
        let handleRequest = /* @__PURE__ */ __name((id, request) => __async(this, null, function* () {
          try {
            if (request.command === "ping") {
              sendResponse(id, {});
              return;
            }
            if (typeof request.key === "number") {
              const requestCallbacks = requestCallbacksByKey[request.key];
              if (requestCallbacks) {
                const callback = requestCallbacks[request.command];
                if (callback) {
                  yield callback(id, request);
                  return;
                }
              }
            }
            throw new Error(`Invalid command: ` + request.command);
          } catch (e2) {
            sendResponse(id, { errors: [extractErrorMessageV8(e2, streamIn, null, void 0, "")] });
          }
        }), "handleRequest");
        let isFirstPacket = true;
        let handleIncomingPacket = /* @__PURE__ */ __name((bytes) => {
          if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== "0.15.16") {
              throw new Error(`Cannot start service: Host version "${"0.15.16"}" does not match binary version ${JSON.stringify(binaryVersion)}`);
            }
            return;
          }
          let packet = decodePacket(bytes);
          if (packet.isRequest) {
            handleRequest(packet.id, packet.value);
          } else {
            let callback = responseCallbacks[packet.id];
            delete responseCallbacks[packet.id];
            if (packet.value.error)
              callback(packet.value.error, {});
            else
              callback(null, packet.value);
          }
        }, "handleIncomingPacket");
        let buildOrServe = /* @__PURE__ */ __name(({ callName, refs, serveOptions, options, isTTY, defaultWD, callback }) => {
          let refCount = 0;
          const buildKey = nextBuildKey++;
          const requestCallbacks = {};
          const buildRefs = {
            ref() {
              if (++refCount === 1) {
                if (refs)
                  refs.ref();
              }
            },
            unref() {
              if (--refCount === 0) {
                delete requestCallbacksByKey[buildKey];
                if (refs)
                  refs.unref();
              }
            }
          };
          requestCallbacksByKey[buildKey] = requestCallbacks;
          buildRefs.ref();
          buildOrServeImpl(
            callName,
            buildKey,
            sendRequest,
            sendResponse,
            buildRefs,
            streamIn,
            requestCallbacks,
            options,
            serveOptions,
            isTTY,
            defaultWD,
            closeData,
            (err, res) => {
              try {
                callback(err, res);
              } finally {
                buildRefs.unref();
              }
            }
          );
        }, "buildOrServe");
        let transform22 = /* @__PURE__ */ __name(({ callName, refs, input, options, isTTY, fs, callback }) => {
          const details = createObjectStash();
          let start = /* @__PURE__ */ __name((inputPath) => {
            try {
              if (typeof input !== "string" && !(input instanceof Uint8Array))
                throw new Error('The input to "transform" must be a string or a Uint8Array');
              let {
                flags,
                mangleCache
              } = flagsForTransformOptions(callName, options, isTTY, transformLogLevelDefault);
              let request = {
                command: "transform",
                flags,
                inputFS: inputPath !== null,
                input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
              };
              if (mangleCache)
                request.mangleCache = mangleCache;
              sendRequest(refs, request, (error, response) => {
                if (error)
                  return callback(new Error(error), null);
                let errors = replaceDetailsInMessages(response.errors, details);
                let warnings = replaceDetailsInMessages(response.warnings, details);
                let outstanding = 1;
                let next = /* @__PURE__ */ __name(() => {
                  if (--outstanding === 0) {
                    let result = { warnings, code: response.code, map: response.map };
                    if (response.mangleCache)
                      result.mangleCache = response == null ? void 0 : response.mangleCache;
                    callback(null, result);
                  }
                }, "next");
                if (errors.length > 0)
                  return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                if (response.codeFS) {
                  outstanding++;
                  fs.readFile(response.code, (err, contents) => {
                    if (err !== null) {
                      callback(err, null);
                    } else {
                      response.code = contents;
                      next();
                    }
                  });
                }
                if (response.mapFS) {
                  outstanding++;
                  fs.readFile(response.map, (err, contents) => {
                    if (err !== null) {
                      callback(err, null);
                    } else {
                      response.map = contents;
                      next();
                    }
                  });
                }
                next();
              });
            } catch (e2) {
              let flags = [];
              try {
                pushLogFlags(flags, options, {}, isTTY, transformLogLevelDefault);
              } catch (e22) {
              }
              const error = extractErrorMessageV8(e2, streamIn, details, void 0, "");
              sendRequest(refs, { command: "error", flags, error }, () => {
                error.detail = details.load(error.detail);
                callback(failureErrorWithLog("Transform failed", [error], []), null);
              });
            }
          }, "start");
          if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
            let next = start;
            start = /* @__PURE__ */ __name(() => fs.writeFile(input, next), "start");
          }
          start(null);
        }, "transform2");
        let formatMessages2 = /* @__PURE__ */ __name(({ callName, refs, messages, options, callback }) => {
          let result = sanitizeMessages(messages, "messages", null, "");
          if (!options)
            throw new Error(`Missing second argument in ${callName}() call`);
          let keys = {};
          let kind = getFlag(options, keys, "kind", mustBeString);
          let color = getFlag(options, keys, "color", mustBeBoolean);
          let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
          checkForInvalidFlags(options, keys, `in ${callName}() call`);
          if (kind === void 0)
            throw new Error(`Missing "kind" in ${callName}() call`);
          if (kind !== "error" && kind !== "warning")
            throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
          let request = {
            command: "format-msgs",
            messages: result,
            isWarning: kind === "warning"
          };
          if (color !== void 0)
            request.color = color;
          if (terminalWidth !== void 0)
            request.terminalWidth = terminalWidth;
          sendRequest(refs, request, (error, response) => {
            if (error)
              return callback(new Error(error), null);
            callback(null, response.messages);
          });
        }, "formatMessages2");
        let analyzeMetafile2 = /* @__PURE__ */ __name(({ callName, refs, metafile, options, callback }) => {
          if (options === void 0)
            options = {};
          let keys = {};
          let color = getFlag(options, keys, "color", mustBeBoolean);
          let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
          checkForInvalidFlags(options, keys, `in ${callName}() call`);
          let request = {
            command: "analyze-metafile",
            metafile
          };
          if (color !== void 0)
            request.color = color;
          if (verbose !== void 0)
            request.verbose = verbose;
          sendRequest(refs, request, (error, response) => {
            if (error)
              return callback(new Error(error), null);
            callback(null, response.result);
          });
        }, "analyzeMetafile2");
        return {
          readFromStdout,
          afterClose,
          service: {
            buildOrServe,
            transform: transform22,
            formatMessages: formatMessages2,
            analyzeMetafile: analyzeMetafile2
          }
        };
      }
      __name(createChannel, "createChannel");
      function buildOrServeImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, serveOptions, isTTY, defaultWD, closeData, callback) {
        const details = createObjectStash();
        const logPluginError = /* @__PURE__ */ __name((e2, pluginName, note, done) => {
          const flags = [];
          try {
            pushLogFlags(flags, options, {}, isTTY, buildLogLevelDefault);
          } catch (e22) {
          }
          const message = extractErrorMessageV8(e2, streamIn, details, note, pluginName);
          sendRequest(refs, { command: "error", flags, error: message }, () => {
            message.detail = details.load(message.detail);
            done(message);
          });
        }, "logPluginError");
        const handleError = /* @__PURE__ */ __name((e2, pluginName) => {
          logPluginError(e2, pluginName, void 0, (error) => {
            callback(failureErrorWithLog("Build failed", [error], []), null);
          });
        }, "handleError");
        let plugins;
        if (typeof options === "object") {
          const value = options.plugins;
          if (value !== void 0) {
            if (!Array.isArray(value))
              throw new Error(`"plugins" must be an array`);
            plugins = value;
          }
        }
        if (plugins && plugins.length > 0) {
          if (streamIn.isSync) {
            handleError(new Error("Cannot use plugins in synchronous API calls"), "");
            return;
          }
          handlePlugins(
            buildKey,
            sendRequest,
            sendResponse,
            refs,
            streamIn,
            requestCallbacks,
            options,
            plugins,
            details
          ).then(
            (result) => {
              if (!result.ok) {
                handleError(result.error, result.pluginName);
                return;
              }
              try {
                buildOrServeContinue(result.requestPlugins, result.runOnEndCallbacks);
              } catch (e2) {
                handleError(e2, "");
              }
            },
            (e2) => handleError(e2, "")
          );
          return;
        }
        try {
          buildOrServeContinue(null, (result, logPluginError2, done) => done());
        } catch (e2) {
          handleError(e2, "");
        }
        function buildOrServeContinue(requestPlugins, runOnEndCallbacks) {
          let writeDefault = !streamIn.isWriteUnavailable;
          let {
            entries,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir,
            incremental,
            nodePaths,
            watch,
            mangleCache
          } = flagsForBuildOptions(callName, options, isTTY, buildLogLevelDefault, writeDefault);
          let request = {
            command: "build",
            key: buildKey,
            entries,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir: absWorkingDir || defaultWD,
            incremental,
            nodePaths
          };
          if (requestPlugins)
            request.plugins = requestPlugins;
          if (mangleCache)
            request.mangleCache = mangleCache;
          let serve2 = serveOptions && buildServeData(buildKey, sendRequest, sendResponse, refs, requestCallbacks, serveOptions, request);
          let rebuild;
          let stop;
          let copyResponseToResult = /* @__PURE__ */ __name((response, result) => {
            if (response.outputFiles)
              result.outputFiles = response.outputFiles.map(convertOutputFiles);
            if (response.metafile)
              result.metafile = JSON.parse(response.metafile);
            if (response.mangleCache)
              result.mangleCache = response.mangleCache;
            if (response.writeToStdout !== void 0)
              console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
          }, "copyResponseToResult");
          let buildResponseToResult = /* @__PURE__ */ __name((response, callback2) => {
            let result = {
              errors: replaceDetailsInMessages(response.errors, details),
              warnings: replaceDetailsInMessages(response.warnings, details)
            };
            copyResponseToResult(response, result);
            runOnEndCallbacks(result, logPluginError, () => {
              if (result.errors.length > 0) {
                return callback2(failureErrorWithLog("Build failed", result.errors, result.warnings), null);
              }
              if (response.rebuild) {
                if (!rebuild) {
                  let isDisposed = false;
                  rebuild = /* @__PURE__ */ __name(() => new Promise((resolve, reject) => {
                    if (isDisposed || closeData.didClose)
                      throw new Error("Cannot rebuild");
                    sendRequest(
                      refs,
                      { command: "rebuild", key: buildKey },
                      (error2, response2) => {
                        if (error2) {
                          const message = { id: "", pluginName: "", text: error2, location: null, notes: [], detail: void 0 };
                          return callback2(failureErrorWithLog("Build failed", [message], []), null);
                        }
                        buildResponseToResult(response2, (error3, result3) => {
                          if (error3)
                            reject(error3);
                          else
                            resolve(result3);
                        });
                      }
                    );
                  }), "rebuild");
                  refs.ref();
                  rebuild.dispose = () => {
                    if (isDisposed)
                      return;
                    isDisposed = true;
                    sendRequest(refs, { command: "rebuild-dispose", key: buildKey }, () => {
                    });
                    refs.unref();
                  };
                }
                result.rebuild = rebuild;
              }
              if (response.watch) {
                if (!stop) {
                  let isStopped = false;
                  refs.ref();
                  stop = /* @__PURE__ */ __name(() => {
                    if (isStopped)
                      return;
                    isStopped = true;
                    delete requestCallbacks["watch-rebuild"];
                    sendRequest(refs, { command: "watch-stop", key: buildKey }, () => {
                    });
                    refs.unref();
                  }, "stop");
                  if (watch) {
                    requestCallbacks["watch-rebuild"] = (id, request2) => {
                      try {
                        let watchResponse = request2.args;
                        let result2 = {
                          errors: replaceDetailsInMessages(watchResponse.errors, details),
                          warnings: replaceDetailsInMessages(watchResponse.warnings, details)
                        };
                        copyResponseToResult(watchResponse, result2);
                        runOnEndCallbacks(result2, logPluginError, () => {
                          if (result2.errors.length > 0) {
                            if (watch.onRebuild)
                              watch.onRebuild(failureErrorWithLog("Build failed", result2.errors, result2.warnings), null);
                            return;
                          }
                          result2.stop = stop;
                          if (watch.onRebuild)
                            watch.onRebuild(null, result2);
                        });
                      } catch (err) {
                        console.error(err);
                      }
                      sendResponse(id, {});
                    };
                  }
                }
                result.stop = stop;
              }
              callback2(null, result);
            });
          }, "buildResponseToResult");
          if (write && streamIn.isWriteUnavailable)
            throw new Error(`The "write" option is unavailable in this environment`);
          if (incremental && streamIn.isSync)
            throw new Error(`Cannot use "incremental" with a synchronous build`);
          if (watch && streamIn.isSync)
            throw new Error(`Cannot use "watch" with a synchronous build`);
          sendRequest(refs, request, (error, response) => {
            if (error)
              return callback(new Error(error), null);
            if (serve2) {
              let serveResponse = response;
              let isStopped = false;
              refs.ref();
              let result = {
                port: serveResponse.port,
                host: serveResponse.host,
                wait: serve2.wait,
                stop() {
                  if (isStopped)
                    return;
                  isStopped = true;
                  serve2.stop();
                  refs.unref();
                }
              };
              refs.ref();
              serve2.wait.then(refs.unref, refs.unref);
              return callback(null, result);
            }
            return buildResponseToResult(response, callback);
          });
        }
        __name(buildOrServeContinue, "buildOrServeContinue");
      }
      __name(buildOrServeImpl, "buildOrServeImpl");
      var buildServeData = /* @__PURE__ */ __name((buildKey, sendRequest, sendResponse, refs, requestCallbacks, options, request) => {
        let keys = {};
        let port = getFlag(options, keys, "port", mustBeInteger);
        let host = getFlag(options, keys, "host", mustBeString);
        let servedir = getFlag(options, keys, "servedir", mustBeString);
        let onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
        let wait2 = new Promise((resolve, reject) => {
          requestCallbacks["serve-wait"] = (id, request2) => {
            if (request2.error !== null)
              reject(new Error(request2.error));
            else
              resolve();
            sendResponse(id, {});
          };
        });
        request.serve = {};
        checkForInvalidFlags(options, keys, `in serve() call`);
        if (port !== void 0)
          request.serve.port = port;
        if (host !== void 0)
          request.serve.host = host;
        if (servedir !== void 0)
          request.serve.servedir = servedir;
        requestCallbacks["serve-request"] = (id, request2) => {
          if (onRequest)
            onRequest(request2.args);
          sendResponse(id, {});
        };
        return {
          wait: wait2,
          stop() {
            sendRequest(refs, { command: "serve-stop", key: buildKey }, () => {
            });
          }
        };
      }, "buildServeData");
      var handlePlugins = /* @__PURE__ */ __name((buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details) => __async(void 0, null, function* () {
        let onStartCallbacks = [];
        let onEndCallbacks = [];
        let onResolveCallbacks = {};
        let onLoadCallbacks = {};
        let nextCallbackID = 0;
        let i2 = 0;
        let requestPlugins = [];
        let isSetupDone = false;
        plugins = [...plugins];
        for (let item of plugins) {
          let keys = {};
          if (typeof item !== "object")
            throw new Error(`Plugin at index ${i2} must be an object`);
          const name = getFlag(item, keys, "name", mustBeString);
          if (typeof name !== "string" || name === "")
            throw new Error(`Plugin at index ${i2} is missing a name`);
          try {
            let setup = getFlag(item, keys, "setup", mustBeFunction);
            if (typeof setup !== "function")
              throw new Error(`Plugin is missing a setup function`);
            checkForInvalidFlags(item, keys, `on plugin ${JSON.stringify(name)}`);
            let plugin = {
              name,
              onResolve: [],
              onLoad: []
            };
            i2++;
            let resolve = /* @__PURE__ */ __name((path, options = {}) => {
              if (!isSetupDone)
                throw new Error('Cannot call "resolve" before plugin setup has completed');
              if (typeof path !== "string")
                throw new Error(`The path to resolve must be a string`);
              let keys2 = /* @__PURE__ */ Object.create(null);
              let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
              let importer = getFlag(options, keys2, "importer", mustBeString);
              let namespace = getFlag(options, keys2, "namespace", mustBeString);
              let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
              let kind = getFlag(options, keys2, "kind", mustBeString);
              let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
              checkForInvalidFlags(options, keys2, "in resolve() call");
              return new Promise((resolve2, reject) => {
                const request = {
                  command: "resolve",
                  path,
                  key: buildKey,
                  pluginName: name
                };
                if (pluginName != null)
                  request.pluginName = pluginName;
                if (importer != null)
                  request.importer = importer;
                if (namespace != null)
                  request.namespace = namespace;
                if (resolveDir != null)
                  request.resolveDir = resolveDir;
                if (kind != null)
                  request.kind = kind;
                if (pluginData != null)
                  request.pluginData = details.store(pluginData);
                sendRequest(refs, request, (error, response) => {
                  if (error !== null)
                    reject(new Error(error));
                  else
                    resolve2({
                      errors: replaceDetailsInMessages(response.errors, details),
                      warnings: replaceDetailsInMessages(response.warnings, details),
                      path: response.path,
                      external: response.external,
                      sideEffects: response.sideEffects,
                      namespace: response.namespace,
                      suffix: response.suffix,
                      pluginData: details.load(response.pluginData)
                    });
                });
              });
            }, "resolve");
            let promise = setup({
              initialOptions,
              resolve,
              onStart(callback) {
                let registeredText = `This error came from the "onStart" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                onStartCallbacks.push({ name, callback, note: registeredNote });
              },
              onEnd(callback) {
                let registeredText = `This error came from the "onEnd" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                onEndCallbacks.push({ name, callback, note: registeredNote });
              },
              onResolve(options, callback) {
                let registeredText = `This error came from the "onResolve" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                let keys2 = {};
                let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${JSON.stringify(name)}`);
                if (filter == null)
                  throw new Error(`onResolve() call is missing a filter`);
                let id = nextCallbackID++;
                onResolveCallbacks[id] = { name, callback, note: registeredNote };
                plugin.onResolve.push({ id, filter: filter.source, namespace: namespace || "" });
              },
              onLoad(options, callback) {
                let registeredText = `This error came from the "onLoad" callback registered here:`;
                let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                let keys2 = {};
                let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${JSON.stringify(name)}`);
                if (filter == null)
                  throw new Error(`onLoad() call is missing a filter`);
                let id = nextCallbackID++;
                onLoadCallbacks[id] = { name, callback, note: registeredNote };
                plugin.onLoad.push({ id, filter: filter.source, namespace: namespace || "" });
              },
              esbuild: streamIn.esbuild
            });
            if (promise)
              yield promise;
            requestPlugins.push(plugin);
          } catch (e2) {
            return { ok: false, error: e2, pluginName: name };
          }
        }
        requestCallbacks["on-start"] = (id, request) => __async(void 0, null, function* () {
          let response = { errors: [], warnings: [] };
          yield Promise.all(onStartCallbacks.map((_0) => __async(void 0, [_0], function* ({ name, callback, note }) {
            try {
              let result = yield callback();
              if (result != null) {
                if (typeof result !== "object")
                  throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(name)} to return an object`);
                let keys = {};
                let errors = getFlag(result, keys, "errors", mustBeArray);
                let warnings = getFlag(result, keys, "warnings", mustBeArray);
                checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${JSON.stringify(name)}`);
                if (errors != null)
                  response.errors.push(...sanitizeMessages(errors, "errors", details, name));
                if (warnings != null)
                  response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name));
              }
            } catch (e2) {
              response.errors.push(extractErrorMessageV8(e2, streamIn, details, note && note(), name));
            }
          })));
          sendResponse(id, response);
        });
        requestCallbacks["on-resolve"] = (id, request) => __async(void 0, null, function* () {
          let response = {}, name = "", callback, note;
          for (let id2 of request.ids) {
            try {
              ({ name, callback, note } = onResolveCallbacks[id2]);
              let result = yield callback({
                path: request.path,
                importer: request.importer,
                namespace: request.namespace,
                resolveDir: request.resolveDir,
                kind: request.kind,
                pluginData: details.load(request.pluginData)
              });
              if (result != null) {
                if (typeof result !== "object")
                  throw new Error(`Expected onResolve() callback in plugin ${JSON.stringify(name)} to return an object`);
                let keys = {};
                let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                let path = getFlag(result, keys, "path", mustBeString);
                let namespace = getFlag(result, keys, "namespace", mustBeString);
                let suffix = getFlag(result, keys, "suffix", mustBeString);
                let external = getFlag(result, keys, "external", mustBeBoolean);
                let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
                let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                let errors = getFlag(result, keys, "errors", mustBeArray);
                let warnings = getFlag(result, keys, "warnings", mustBeArray);
                let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${JSON.stringify(name)}`);
                response.id = id2;
                if (pluginName != null)
                  response.pluginName = pluginName;
                if (path != null)
                  response.path = path;
                if (namespace != null)
                  response.namespace = namespace;
                if (suffix != null)
                  response.suffix = suffix;
                if (external != null)
                  response.external = external;
                if (sideEffects != null)
                  response.sideEffects = sideEffects;
                if (pluginData != null)
                  response.pluginData = details.store(pluginData);
                if (errors != null)
                  response.errors = sanitizeMessages(errors, "errors", details, name);
                if (warnings != null)
                  response.warnings = sanitizeMessages(warnings, "warnings", details, name);
                if (watchFiles != null)
                  response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                if (watchDirs != null)
                  response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                break;
              }
            } catch (e2) {
              response = { id: id2, errors: [extractErrorMessageV8(e2, streamIn, details, note && note(), name)] };
              break;
            }
          }
          sendResponse(id, response);
        });
        requestCallbacks["on-load"] = (id, request) => __async(void 0, null, function* () {
          let response = {}, name = "", callback, note;
          for (let id2 of request.ids) {
            try {
              ({ name, callback, note } = onLoadCallbacks[id2]);
              let result = yield callback({
                path: request.path,
                namespace: request.namespace,
                suffix: request.suffix,
                pluginData: details.load(request.pluginData)
              });
              if (result != null) {
                if (typeof result !== "object")
                  throw new Error(`Expected onLoad() callback in plugin ${JSON.stringify(name)} to return an object`);
                let keys = {};
                let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                let loader = getFlag(result, keys, "loader", mustBeString);
                let errors = getFlag(result, keys, "errors", mustBeArray);
                let warnings = getFlag(result, keys, "warnings", mustBeArray);
                let watchFiles = getFlag(result, keys, "watchFiles", mustBeArray);
                let watchDirs = getFlag(result, keys, "watchDirs", mustBeArray);
                checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${JSON.stringify(name)}`);
                response.id = id2;
                if (pluginName != null)
                  response.pluginName = pluginName;
                if (contents instanceof Uint8Array)
                  response.contents = contents;
                else if (contents != null)
                  response.contents = encodeUTF8(contents);
                if (resolveDir != null)
                  response.resolveDir = resolveDir;
                if (pluginData != null)
                  response.pluginData = details.store(pluginData);
                if (loader != null)
                  response.loader = loader;
                if (errors != null)
                  response.errors = sanitizeMessages(errors, "errors", details, name);
                if (warnings != null)
                  response.warnings = sanitizeMessages(warnings, "warnings", details, name);
                if (watchFiles != null)
                  response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                if (watchDirs != null)
                  response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                break;
              }
            } catch (e2) {
              response = { id: id2, errors: [extractErrorMessageV8(e2, streamIn, details, note && note(), name)] };
              break;
            }
          }
          sendResponse(id, response);
        });
        let runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => done(), "runOnEndCallbacks");
        if (onEndCallbacks.length > 0) {
          runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => {
            (() => __async(void 0, null, function* () {
              for (const { name, callback, note } of onEndCallbacks) {
                try {
                  yield callback(result);
                } catch (e2) {
                  result.errors.push(yield new Promise((resolve) => logPluginError(e2, name, note && note(), resolve)));
                }
              }
            }))().then(done);
          }, "runOnEndCallbacks");
        }
        isSetupDone = true;
        return {
          ok: true,
          requestPlugins,
          runOnEndCallbacks
        };
      }), "handlePlugins");
      function createObjectStash() {
        const map = /* @__PURE__ */ new Map();
        let nextID = 0;
        return {
          load(id) {
            return map.get(id);
          },
          store(value) {
            if (value === void 0)
              return -1;
            const id = nextID++;
            map.set(id, value);
            return id;
          }
        };
      }
      __name(createObjectStash, "createObjectStash");
      function extractCallerV8(e2, streamIn, ident) {
        let note;
        let tried = false;
        return () => {
          if (tried)
            return note;
          tried = true;
          try {
            let lines = (e2.stack + "").split("\n");
            lines.splice(1, 1);
            let location2 = parseStackLinesV8(streamIn, lines, ident);
            if (location2) {
              note = { text: e2.message, location: location2 };
              return note;
            }
          } catch (e22) {
          }
        };
      }
      __name(extractCallerV8, "extractCallerV8");
      function extractErrorMessageV8(e2, streamIn, stash, note, pluginName) {
        let text = "Internal error";
        let location2 = null;
        try {
          text = (e2 && e2.message || e2) + "";
        } catch (e22) {
        }
        try {
          location2 = parseStackLinesV8(streamIn, (e2.stack + "").split("\n"), "");
        } catch (e22) {
        }
        return { id: "", pluginName, text, location: location2, notes: note ? [note] : [], detail: stash ? stash.store(e2) : -1 };
      }
      __name(extractErrorMessageV8, "extractErrorMessageV8");
      function parseStackLinesV8(streamIn, lines, ident) {
        let at = "    at ";
        if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
          for (let i2 = 1; i2 < lines.length; i2++) {
            let line = lines[i2];
            if (!line.startsWith(at))
              continue;
            line = line.slice(at.length);
            while (true) {
              let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
              if (match) {
                line = match[1];
                continue;
              }
              match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
              if (match) {
                line = match[1];
                continue;
              }
              match = /^(\S+):(\d+):(\d+)$/.exec(line);
              if (match) {
                let contents;
                try {
                  contents = streamIn.readFileSync(match[1], "utf8");
                } catch (e2) {
                  break;
                }
                let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
                let column = +match[3] - 1;
                let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
                return {
                  file: match[1],
                  namespace: "file",
                  line: +match[2],
                  column: encodeUTF8(lineText.slice(0, column)).length,
                  length: encodeUTF8(lineText.slice(column, column + length)).length,
                  lineText: lineText + "\n" + lines.slice(1).join("\n"),
                  suggestion: ""
                };
              }
              break;
            }
          }
        }
        return null;
      }
      __name(parseStackLinesV8, "parseStackLinesV8");
      function failureErrorWithLog(text, errors, warnings) {
        let limit = 5;
        let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e2, i2) => {
          if (i2 === limit)
            return "\n...";
          if (!e2.location)
            return `
error: ${e2.text}`;
          let { file, line, column } = e2.location;
          let pluginText = e2.pluginName ? `[plugin: ${e2.pluginName}] ` : "";
          return `
${file}:${line}:${column}: ERROR: ${pluginText}${e2.text}`;
        }).join("");
        let error = new Error(`${text}${summary}`);
        error.errors = errors;
        error.warnings = warnings;
        return error;
      }
      __name(failureErrorWithLog, "failureErrorWithLog");
      function replaceDetailsInMessages(messages, stash) {
        for (const message of messages) {
          message.detail = stash.load(message.detail);
        }
        return messages;
      }
      __name(replaceDetailsInMessages, "replaceDetailsInMessages");
      function sanitizeLocation(location2, where) {
        if (location2 == null)
          return null;
        let keys = {};
        let file = getFlag(location2, keys, "file", mustBeString);
        let namespace = getFlag(location2, keys, "namespace", mustBeString);
        let line = getFlag(location2, keys, "line", mustBeInteger);
        let column = getFlag(location2, keys, "column", mustBeInteger);
        let length = getFlag(location2, keys, "length", mustBeInteger);
        let lineText = getFlag(location2, keys, "lineText", mustBeString);
        let suggestion = getFlag(location2, keys, "suggestion", mustBeString);
        checkForInvalidFlags(location2, keys, where);
        return {
          file: file || "",
          namespace: namespace || "",
          line: line || 0,
          column: column || 0,
          length: length || 0,
          lineText: lineText || "",
          suggestion: suggestion || ""
        };
      }
      __name(sanitizeLocation, "sanitizeLocation");
      function sanitizeMessages(messages, property, stash, fallbackPluginName) {
        let messagesClone = [];
        let index = 0;
        for (const message of messages) {
          let keys = {};
          let id = getFlag(message, keys, "id", mustBeString);
          let pluginName = getFlag(message, keys, "pluginName", mustBeString);
          let text = getFlag(message, keys, "text", mustBeString);
          let location2 = getFlag(message, keys, "location", mustBeObjectOrNull);
          let notes = getFlag(message, keys, "notes", mustBeArray);
          let detail = getFlag(message, keys, "detail", canBeAnything);
          let where = `in element ${index} of "${property}"`;
          checkForInvalidFlags(message, keys, where);
          let notesClone = [];
          if (notes) {
            for (const note of notes) {
              let noteKeys = {};
              let noteText = getFlag(note, noteKeys, "text", mustBeString);
              let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
              checkForInvalidFlags(note, noteKeys, where);
              notesClone.push({
                text: noteText || "",
                location: sanitizeLocation(noteLocation, where)
              });
            }
          }
          messagesClone.push({
            id: id || "",
            pluginName: pluginName || fallbackPluginName,
            text: text || "",
            location: sanitizeLocation(location2, where),
            notes: notesClone,
            detail: stash ? stash.store(detail) : -1
          });
          index++;
        }
        return messagesClone;
      }
      __name(sanitizeMessages, "sanitizeMessages");
      function sanitizeStringArray(values, property) {
        const result = [];
        for (const value of values) {
          if (typeof value !== "string")
            throw new Error(`${JSON.stringify(property)} must be an array of strings`);
          result.push(value);
        }
        return result;
      }
      __name(sanitizeStringArray, "sanitizeStringArray");
      function convertOutputFiles({ path, contents }) {
        let text = null;
        return {
          path,
          contents,
          get text() {
            const binary = this.contents;
            if (text === null || binary !== contents) {
              contents = binary;
              text = decodeUTF8(binary);
            }
            return text;
          }
        };
      }
      __name(convertOutputFiles, "convertOutputFiles");
      var version = "0.15.16";
      var build2 = /* @__PURE__ */ __name((options) => ensureServiceIsRunning().build(options), "build");
      var serve = /* @__PURE__ */ __name(() => {
        throw new Error(`The "serve" API only works in node`);
      }, "serve");
      var transform2 = /* @__PURE__ */ __name((input, options) => ensureServiceIsRunning().transform(input, options), "transform");
      var formatMessages = /* @__PURE__ */ __name((messages, options) => ensureServiceIsRunning().formatMessages(messages, options), "formatMessages");
      var analyzeMetafile = /* @__PURE__ */ __name((metafile, options) => ensureServiceIsRunning().analyzeMetafile(metafile, options), "analyzeMetafile");
      var buildSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "buildSync" API only works in node`);
      }, "buildSync");
      var transformSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "transformSync" API only works in node`);
      }, "transformSync");
      var formatMessagesSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "formatMessagesSync" API only works in node`);
      }, "formatMessagesSync");
      var analyzeMetafileSync = /* @__PURE__ */ __name(() => {
        throw new Error(`The "analyzeMetafileSync" API only works in node`);
      }, "analyzeMetafileSync");
      var initializePromise;
      var longLivedService;
      var ensureServiceIsRunning = /* @__PURE__ */ __name(() => {
        if (longLivedService)
          return longLivedService;
        if (initializePromise)
          throw new Error('You need to wait for the promise returned from "initialize" to be resolved before calling this');
        throw new Error('You need to call "initialize" before calling this');
      }, "ensureServiceIsRunning");
      var initialize2 = /* @__PURE__ */ __name((options) => {
        options = validateInitializeOptions(options || {});
        let wasmURL = options.wasmURL;
        let wasmModule = options.wasmModule;
        let useWorker = options.worker !== false;
        if (!wasmURL && !wasmModule)
          throw new Error('Must provide either the "wasmURL" option or the "wasmModule" option');
        if (initializePromise)
          throw new Error('Cannot call "initialize" more than once');
        initializePromise = startRunningService(wasmURL || "", wasmModule, useWorker);
        initializePromise.catch(() => {
          initializePromise = void 0;
        });
        return initializePromise;
      }, "initialize");
      var startRunningService = /* @__PURE__ */ __name((wasmURL, wasmModule, useWorker) => __async(void 0, null, function* () {
        let wasm;
        if (wasmModule) {
          wasm = wasmModule;
        } else {
          let res = yield fetch(wasmURL);
          if (!res.ok)
            throw new Error(`Failed to download ${JSON.stringify(wasmURL)}`);
          wasm = yield res.arrayBuffer();
        }
        let worker2;
        if (useWorker) {
          let blob = new Blob([`onmessage=${'((postMessage) => {\n      // Copyright 2018 The Go Authors. All rights reserved.\n      // Use of this source code is governed by a BSD-style\n      // license that can be found in the LICENSE file.\n      var __async = (__this, __arguments, generator) => {\n        return new Promise((resolve, reject) => {\n          var fulfilled = (value) => {\n            try {\n              step(generator.next(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var rejected = (value) => {\n            try {\n              step(generator.throw(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n          step((generator = generator.apply(__this, __arguments)).next());\n        });\n      };\n      let onmessage;\n      let globalThis = {};\n      for (let o = self; o; o = Object.getPrototypeOf(o))\n        for (let k of Object.getOwnPropertyNames(o))\n          if (!(k in globalThis))\n            Object.defineProperty(globalThis, k, { get: () => self[k] });\n      "use strict";\n      (() => {\n        const enosys = () => {\n          const err = new Error("not implemented");\n          err.code = "ENOSYS";\n          return err;\n        };\n        if (!globalThis.fs) {\n          let outputBuf = "";\n          globalThis.fs = {\n            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },\n            writeSync(fd, buf) {\n              outputBuf += decoder.decode(buf);\n              const nl = outputBuf.lastIndexOf("\\n");\n              if (nl != -1) {\n                console.log(outputBuf.substr(0, nl));\n                outputBuf = outputBuf.substr(nl + 1);\n              }\n              return buf.length;\n            },\n            write(fd, buf, offset, length, position, callback) {\n              if (offset !== 0 || length !== buf.length || position !== null) {\n                callback(enosys());\n                return;\n              }\n              const n = this.writeSync(fd, buf);\n              callback(null, n);\n            },\n            chmod(path, mode, callback) {\n              callback(enosys());\n            },\n            chown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            close(fd, callback) {\n              callback(enosys());\n            },\n            fchmod(fd, mode, callback) {\n              callback(enosys());\n            },\n            fchown(fd, uid, gid, callback) {\n              callback(enosys());\n            },\n            fstat(fd, callback) {\n              callback(enosys());\n            },\n            fsync(fd, callback) {\n              callback(null);\n            },\n            ftruncate(fd, length, callback) {\n              callback(enosys());\n            },\n            lchown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            link(path, link, callback) {\n              callback(enosys());\n            },\n            lstat(path, callback) {\n              callback(enosys());\n            },\n            mkdir(path, perm, callback) {\n              callback(enosys());\n            },\n            open(path, flags, mode, callback) {\n              callback(enosys());\n            },\n            read(fd, buffer, offset, length, position, callback) {\n              callback(enosys());\n            },\n            readdir(path, callback) {\n              callback(enosys());\n            },\n            readlink(path, callback) {\n              callback(enosys());\n            },\n            rename(from, to, callback) {\n              callback(enosys());\n            },\n            rmdir(path, callback) {\n              callback(enosys());\n            },\n            stat(path, callback) {\n              callback(enosys());\n            },\n            symlink(path, link, callback) {\n              callback(enosys());\n            },\n            truncate(path, length, callback) {\n              callback(enosys());\n            },\n            unlink(path, callback) {\n              callback(enosys());\n            },\n            utimes(path, atime, mtime, callback) {\n              callback(enosys());\n            }\n          };\n        }\n        if (!globalThis.process) {\n          globalThis.process = {\n            getuid() {\n              return -1;\n            },\n            getgid() {\n              return -1;\n            },\n            geteuid() {\n              return -1;\n            },\n            getegid() {\n              return -1;\n            },\n            getgroups() {\n              throw enosys();\n            },\n            pid: -1,\n            ppid: -1,\n            umask() {\n              throw enosys();\n            },\n            cwd() {\n              throw enosys();\n            },\n            chdir() {\n              throw enosys();\n            }\n          };\n        }\n        if (!globalThis.crypto) {\n          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");\n        }\n        if (!globalThis.performance) {\n          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");\n        }\n        if (!globalThis.TextEncoder) {\n          throw new Error("globalThis.TextEncoder is not available, polyfill required");\n        }\n        if (!globalThis.TextDecoder) {\n          throw new Error("globalThis.TextDecoder is not available, polyfill required");\n        }\n        const encoder = new TextEncoder("utf-8");\n        const decoder = new TextDecoder("utf-8");\n        globalThis.Go = class {\n          constructor() {\n            this.argv = ["js"];\n            this.env = {};\n            this.exit = (code) => {\n              if (code !== 0) {\n                console.warn("exit code:", code);\n              }\n            };\n            this._exitPromise = new Promise((resolve) => {\n              this._resolveExitPromise = resolve;\n            });\n            this._pendingEvent = null;\n            this._scheduledTimeouts = /* @__PURE__ */ new Map();\n            this._nextCallbackTimeoutID = 1;\n            const setInt64 = (addr, v) => {\n              this.mem.setUint32(addr + 0, v, true);\n              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);\n            };\n            const getInt64 = (addr) => {\n              const low = this.mem.getUint32(addr + 0, true);\n              const high = this.mem.getInt32(addr + 4, true);\n              return low + high * 4294967296;\n            };\n            const loadValue = (addr) => {\n              const f = this.mem.getFloat64(addr, true);\n              if (f === 0) {\n                return void 0;\n              }\n              if (!isNaN(f)) {\n                return f;\n              }\n              const id = this.mem.getUint32(addr, true);\n              return this._values[id];\n            };\n            const storeValue = (addr, v) => {\n              const nanHead = 2146959360;\n              if (typeof v === "number" && v !== 0) {\n                if (isNaN(v)) {\n                  this.mem.setUint32(addr + 4, nanHead, true);\n                  this.mem.setUint32(addr, 0, true);\n                  return;\n                }\n                this.mem.setFloat64(addr, v, true);\n                return;\n              }\n              if (v === void 0) {\n                this.mem.setFloat64(addr, 0, true);\n                return;\n              }\n              let id = this._ids.get(v);\n              if (id === void 0) {\n                id = this._idPool.pop();\n                if (id === void 0) {\n                  id = this._values.length;\n                }\n                this._values[id] = v;\n                this._goRefCounts[id] = 0;\n                this._ids.set(v, id);\n              }\n              this._goRefCounts[id]++;\n              let typeFlag = 0;\n              switch (typeof v) {\n                case "object":\n                  if (v !== null) {\n                    typeFlag = 1;\n                  }\n                  break;\n                case "string":\n                  typeFlag = 2;\n                  break;\n                case "symbol":\n                  typeFlag = 3;\n                  break;\n                case "function":\n                  typeFlag = 4;\n                  break;\n              }\n              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);\n              this.mem.setUint32(addr, id, true);\n            };\n            const loadSlice = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return new Uint8Array(this._inst.exports.mem.buffer, array, len);\n            };\n            const loadSliceOfValues = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              const a = new Array(len);\n              for (let i = 0; i < len; i++) {\n                a[i] = loadValue(array + i * 8);\n              }\n              return a;\n            };\n            const loadString = (addr) => {\n              const saddr = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));\n            };\n            const timeOrigin = Date.now() - performance.now();\n            this.importObject = {\n              go: {\n                "runtime.wasmExit": (sp) => {\n                  sp >>>= 0;\n                  const code = this.mem.getInt32(sp + 8, true);\n                  this.exited = true;\n                  delete this._inst;\n                  delete this._values;\n                  delete this._goRefCounts;\n                  delete this._ids;\n                  delete this._idPool;\n                  this.exit(code);\n                },\n                "runtime.wasmWrite": (sp) => {\n                  sp >>>= 0;\n                  const fd = getInt64(sp + 8);\n                  const p = getInt64(sp + 16);\n                  const n = this.mem.getInt32(sp + 24, true);\n                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));\n                },\n                "runtime.resetMemoryDataView": (sp) => {\n                  sp >>>= 0;\n                  this.mem = new DataView(this._inst.exports.mem.buffer);\n                },\n                "runtime.nanotime1": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);\n                },\n                "runtime.walltime": (sp) => {\n                  sp >>>= 0;\n                  const msec = new Date().getTime();\n                  setInt64(sp + 8, msec / 1e3);\n                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);\n                },\n                "runtime.scheduleTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this._nextCallbackTimeoutID;\n                  this._nextCallbackTimeoutID++;\n                  this._scheduledTimeouts.set(id, setTimeout(\n                    () => {\n                      this._resume();\n                      while (this._scheduledTimeouts.has(id)) {\n                        console.warn("scheduleTimeoutEvent: missed timeout event");\n                        this._resume();\n                      }\n                    },\n                    getInt64(sp + 8) + 1\n                  ));\n                  this.mem.setInt32(sp + 16, id, true);\n                },\n                "runtime.clearTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getInt32(sp + 8, true);\n                  clearTimeout(this._scheduledTimeouts.get(id));\n                  this._scheduledTimeouts.delete(id);\n                },\n                "runtime.getRandomData": (sp) => {\n                  sp >>>= 0;\n                  crypto.getRandomValues(loadSlice(sp + 8));\n                },\n                "syscall/js.finalizeRef": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getUint32(sp + 8, true);\n                  this._goRefCounts[id]--;\n                  if (this._goRefCounts[id] === 0) {\n                    const v = this._values[id];\n                    this._values[id] = null;\n                    this._ids.delete(v);\n                    this._idPool.push(id);\n                  }\n                },\n                "syscall/js.stringVal": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, loadString(sp + 8));\n                },\n                "syscall/js.valueGet": (sp) => {\n                  sp >>>= 0;\n                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));\n                  sp = this._inst.exports.getsp() >>> 0;\n                  storeValue(sp + 32, result);\n                },\n                "syscall/js.valueSet": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));\n                },\n                "syscall/js.valueDelete": (sp) => {\n                  sp >>>= 0;\n                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));\n                },\n                "syscall/js.valueIndex": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));\n                },\n                "syscall/js.valueSetIndex": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));\n                },\n                "syscall/js.valueCall": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const m = Reflect.get(v, loadString(sp + 16));\n                    const args = loadSliceOfValues(sp + 32);\n                    const result = Reflect.apply(m, v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, result);\n                    this.mem.setUint8(sp + 64, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, err);\n                    this.mem.setUint8(sp + 64, 0);\n                  }\n                },\n                "syscall/js.valueInvoke": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.apply(v, void 0, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueNew": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.construct(v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueLength": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));\n                },\n                "syscall/js.valuePrepareString": (sp) => {\n                  sp >>>= 0;\n                  const str = encoder.encode(String(loadValue(sp + 8)));\n                  storeValue(sp + 16, str);\n                  setInt64(sp + 24, str.length);\n                },\n                "syscall/js.valueLoadString": (sp) => {\n                  sp >>>= 0;\n                  const str = loadValue(sp + 8);\n                  loadSlice(sp + 16).set(str);\n                },\n                "syscall/js.valueInstanceOf": (sp) => {\n                  sp >>>= 0;\n                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);\n                },\n                "syscall/js.copyBytesToGo": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadSlice(sp + 8);\n                  const src = loadValue(sp + 32);\n                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "syscall/js.copyBytesToJS": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadValue(sp + 8);\n                  const src = loadSlice(sp + 16);\n                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "debug": (value) => {\n                  console.log(value);\n                }\n              }\n            };\n          }\n          run(instance) {\n            return __async(this, null, function* () {\n              if (!(instance instanceof WebAssembly.Instance)) {\n                throw new Error("Go.run: WebAssembly.Instance expected");\n              }\n              this._inst = instance;\n              this.mem = new DataView(this._inst.exports.mem.buffer);\n              this._values = [\n                NaN,\n                0,\n                null,\n                true,\n                false,\n                globalThis,\n                this\n              ];\n              this._goRefCounts = new Array(this._values.length).fill(Infinity);\n              this._ids = /* @__PURE__ */ new Map([\n                [0, 1],\n                [null, 2],\n                [true, 3],\n                [false, 4],\n                [globalThis, 5],\n                [this, 6]\n              ]);\n              this._idPool = [];\n              this.exited = false;\n              let offset = 4096;\n              const strPtr = (str) => {\n                const ptr = offset;\n                const bytes = encoder.encode(str + "\\0");\n                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);\n                offset += bytes.length;\n                if (offset % 8 !== 0) {\n                  offset += 8 - offset % 8;\n                }\n                return ptr;\n              };\n              const argc = this.argv.length;\n              const argvPtrs = [];\n              this.argv.forEach((arg) => {\n                argvPtrs.push(strPtr(arg));\n              });\n              argvPtrs.push(0);\n              const keys = Object.keys(this.env).sort();\n              keys.forEach((key) => {\n                argvPtrs.push(strPtr(`${key}=${this.env[key]}`));\n              });\n              argvPtrs.push(0);\n              const argv = offset;\n              argvPtrs.forEach((ptr) => {\n                this.mem.setUint32(offset, ptr, true);\n                this.mem.setUint32(offset + 4, 0, true);\n                offset += 8;\n              });\n              const wasmMinDataAddr = 4096 + 8192;\n              if (offset >= wasmMinDataAddr) {\n                throw new Error("total length of command line and environment variables exceeds limit");\n              }\n              this._inst.exports.run(argc, argv);\n              if (this.exited) {\n                this._resolveExitPromise();\n              }\n              yield this._exitPromise;\n            });\n          }\n          _resume() {\n            if (this.exited) {\n              throw new Error("Go program has already exited");\n            }\n            this._inst.exports.resume();\n            if (this.exited) {\n              this._resolveExitPromise();\n            }\n          }\n          _makeFuncWrapper(id) {\n            const go = this;\n            return function() {\n              const event = { id, this: this, args: arguments };\n              go._pendingEvent = event;\n              go._resume();\n              return event.result;\n            };\n          }\n        };\n      })();\n      onmessage = ({ data: wasm }) => {\n        let decoder = new TextDecoder();\n        let fs = globalThis.fs;\n        let stderr = "";\n        fs.writeSync = (fd, buffer) => {\n          if (fd === 1) {\n            postMessage(buffer);\n          } else if (fd === 2) {\n            stderr += decoder.decode(buffer);\n            let parts = stderr.split("\\n");\n            if (parts.length > 1)\n              console.log(parts.slice(0, -1).join("\\n"));\n            stderr = parts[parts.length - 1];\n          } else {\n            throw new Error("Bad write");\n          }\n          return buffer.length;\n        };\n        let stdin = [];\n        let resumeStdin;\n        let stdinPos = 0;\n        onmessage = ({ data }) => {\n          if (data.length > 0) {\n            stdin.push(data);\n            if (resumeStdin)\n              resumeStdin();\n          }\n        };\n        fs.read = (fd, buffer, offset, length, position, callback) => {\n          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {\n            throw new Error("Bad read");\n          }\n          if (stdin.length === 0) {\n            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);\n            return;\n          }\n          let first = stdin[0];\n          let count = Math.max(0, Math.min(length, first.length - stdinPos));\n          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);\n          stdinPos += count;\n          if (stdinPos === first.length) {\n            stdin.shift();\n            stdinPos = 0;\n          }\n          callback(null, count);\n        };\n        let go = new globalThis.Go();\n        go.argv = ["", `--service=${"0.15.16"}`];\n        if (wasm instanceof WebAssembly.Module) {\n          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));\n        } else {\n          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));\n        }\n      };\n      return (m) => onmessage(m);\n    })'}(postMessage)`], { type: "text/javascript" });
          worker2 = new Worker(URL.createObjectURL(blob));
        } else {
          let onmessage = ((postMessage) => {
            var __async2 = /* @__PURE__ */ __name((__this, __arguments, generator) => {
              return new Promise((resolve, reject) => {
                var fulfilled = /* @__PURE__ */ __name((value) => {
                  try {
                    step(generator.next(value));
                  } catch (e2) {
                    reject(e2);
                  }
                }, "fulfilled");
                var rejected = /* @__PURE__ */ __name((value) => {
                  try {
                    step(generator.throw(value));
                  } catch (e2) {
                    reject(e2);
                  }
                }, "rejected");
                var step = /* @__PURE__ */ __name((x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected), "step");
                step((generator = generator.apply(__this, __arguments)).next());
              });
            }, "__async");
            let onmessage2;
            let globalThis2 = {};
            for (let o2 = self; o2; o2 = Object.getPrototypeOf(o2))
              for (let k2 of Object.getOwnPropertyNames(o2))
                if (!(k2 in globalThis2))
                  Object.defineProperty(globalThis2, k2, { get: () => self[k2] });
            "use strict";
            (() => {
              const enosys = /* @__PURE__ */ __name(() => {
                const err = new Error("not implemented");
                err.code = "ENOSYS";
                return err;
              }, "enosys");
              if (!globalThis2.fs) {
                let outputBuf = "";
                globalThis2.fs = {
                  constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },
                  writeSync(fd, buf) {
                    outputBuf += decoder.decode(buf);
                    const nl = outputBuf.lastIndexOf("\n");
                    if (nl != -1) {
                      console.log(outputBuf.substr(0, nl));
                      outputBuf = outputBuf.substr(nl + 1);
                    }
                    return buf.length;
                  },
                  write(fd, buf, offset, length, position, callback) {
                    if (offset !== 0 || length !== buf.length || position !== null) {
                      callback(enosys());
                      return;
                    }
                    const n2 = this.writeSync(fd, buf);
                    callback(null, n2);
                  },
                  chmod(path, mode, callback) {
                    callback(enosys());
                  },
                  chown(path, uid, gid, callback) {
                    callback(enosys());
                  },
                  close(fd, callback) {
                    callback(enosys());
                  },
                  fchmod(fd, mode, callback) {
                    callback(enosys());
                  },
                  fchown(fd, uid, gid, callback) {
                    callback(enosys());
                  },
                  fstat(fd, callback) {
                    callback(enosys());
                  },
                  fsync(fd, callback) {
                    callback(null);
                  },
                  ftruncate(fd, length, callback) {
                    callback(enosys());
                  },
                  lchown(path, uid, gid, callback) {
                    callback(enosys());
                  },
                  link(path, link, callback) {
                    callback(enosys());
                  },
                  lstat(path, callback) {
                    callback(enosys());
                  },
                  mkdir(path, perm, callback) {
                    callback(enosys());
                  },
                  open(path, flags, mode, callback) {
                    callback(enosys());
                  },
                  read(fd, buffer, offset, length, position, callback) {
                    callback(enosys());
                  },
                  readdir(path, callback) {
                    callback(enosys());
                  },
                  readlink(path, callback) {
                    callback(enosys());
                  },
                  rename(from, to, callback) {
                    callback(enosys());
                  },
                  rmdir(path, callback) {
                    callback(enosys());
                  },
                  stat(path, callback) {
                    callback(enosys());
                  },
                  symlink(path, link, callback) {
                    callback(enosys());
                  },
                  truncate(path, length, callback) {
                    callback(enosys());
                  },
                  unlink(path, callback) {
                    callback(enosys());
                  },
                  utimes(path, atime, mtime, callback) {
                    callback(enosys());
                  }
                };
              }
              if (!globalThis2.process) {
                globalThis2.process = {
                  getuid() {
                    return -1;
                  },
                  getgid() {
                    return -1;
                  },
                  geteuid() {
                    return -1;
                  },
                  getegid() {
                    return -1;
                  },
                  getgroups() {
                    throw enosys();
                  },
                  pid: -1,
                  ppid: -1,
                  umask() {
                    throw enosys();
                  },
                  cwd() {
                    throw enosys();
                  },
                  chdir() {
                    throw enosys();
                  }
                };
              }
              if (!globalThis2.crypto) {
                throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
              }
              if (!globalThis2.performance) {
                throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
              }
              if (!globalThis2.TextEncoder) {
                throw new Error("globalThis.TextEncoder is not available, polyfill required");
              }
              if (!globalThis2.TextDecoder) {
                throw new Error("globalThis.TextDecoder is not available, polyfill required");
              }
              const encoder = new TextEncoder("utf-8");
              const decoder = new TextDecoder("utf-8");
              globalThis2.Go = class {
                constructor() {
                  this.argv = ["js"];
                  this.env = {};
                  this.exit = (code) => {
                    if (code !== 0) {
                      console.warn("exit code:", code);
                    }
                  };
                  this._exitPromise = new Promise((resolve) => {
                    this._resolveExitPromise = resolve;
                  });
                  this._pendingEvent = null;
                  this._scheduledTimeouts = /* @__PURE__ */ new Map();
                  this._nextCallbackTimeoutID = 1;
                  const setInt64 = /* @__PURE__ */ __name((addr, v2) => {
                    this.mem.setUint32(addr + 0, v2, true);
                    this.mem.setUint32(addr + 4, Math.floor(v2 / 4294967296), true);
                  }, "setInt64");
                  const getInt64 = /* @__PURE__ */ __name((addr) => {
                    const low = this.mem.getUint32(addr + 0, true);
                    const high = this.mem.getInt32(addr + 4, true);
                    return low + high * 4294967296;
                  }, "getInt64");
                  const loadValue = /* @__PURE__ */ __name((addr) => {
                    const f2 = this.mem.getFloat64(addr, true);
                    if (f2 === 0) {
                      return void 0;
                    }
                    if (!isNaN(f2)) {
                      return f2;
                    }
                    const id = this.mem.getUint32(addr, true);
                    return this._values[id];
                  }, "loadValue");
                  const storeValue = /* @__PURE__ */ __name((addr, v2) => {
                    const nanHead = 2146959360;
                    if (typeof v2 === "number" && v2 !== 0) {
                      if (isNaN(v2)) {
                        this.mem.setUint32(addr + 4, nanHead, true);
                        this.mem.setUint32(addr, 0, true);
                        return;
                      }
                      this.mem.setFloat64(addr, v2, true);
                      return;
                    }
                    if (v2 === void 0) {
                      this.mem.setFloat64(addr, 0, true);
                      return;
                    }
                    let id = this._ids.get(v2);
                    if (id === void 0) {
                      id = this._idPool.pop();
                      if (id === void 0) {
                        id = this._values.length;
                      }
                      this._values[id] = v2;
                      this._goRefCounts[id] = 0;
                      this._ids.set(v2, id);
                    }
                    this._goRefCounts[id]++;
                    let typeFlag = 0;
                    switch (typeof v2) {
                      case "object":
                        if (v2 !== null) {
                          typeFlag = 1;
                        }
                        break;
                      case "string":
                        typeFlag = 2;
                        break;
                      case "symbol":
                        typeFlag = 3;
                        break;
                      case "function":
                        typeFlag = 4;
                        break;
                    }
                    this.mem.setUint32(addr + 4, nanHead | typeFlag, true);
                    this.mem.setUint32(addr, id, true);
                  }, "storeValue");
                  const loadSlice = /* @__PURE__ */ __name((addr) => {
                    const array = getInt64(addr + 0);
                    const len = getInt64(addr + 8);
                    return new Uint8Array(this._inst.exports.mem.buffer, array, len);
                  }, "loadSlice");
                  const loadSliceOfValues = /* @__PURE__ */ __name((addr) => {
                    const array = getInt64(addr + 0);
                    const len = getInt64(addr + 8);
                    const a2 = new Array(len);
                    for (let i2 = 0; i2 < len; i2++) {
                      a2[i2] = loadValue(array + i2 * 8);
                    }
                    return a2;
                  }, "loadSliceOfValues");
                  const loadString = /* @__PURE__ */ __name((addr) => {
                    const saddr = getInt64(addr + 0);
                    const len = getInt64(addr + 8);
                    return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));
                  }, "loadString");
                  const timeOrigin = Date.now() - performance.now();
                  this.importObject = {
                    go: {
                      "runtime.wasmExit": (sp) => {
                        sp >>>= 0;
                        const code = this.mem.getInt32(sp + 8, true);
                        this.exited = true;
                        delete this._inst;
                        delete this._values;
                        delete this._goRefCounts;
                        delete this._ids;
                        delete this._idPool;
                        this.exit(code);
                      },
                      "runtime.wasmWrite": (sp) => {
                        sp >>>= 0;
                        const fd = getInt64(sp + 8);
                        const p2 = getInt64(sp + 16);
                        const n2 = this.mem.getInt32(sp + 24, true);
                        globalThis2.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p2, n2));
                      },
                      "runtime.resetMemoryDataView": (sp) => {
                        sp >>>= 0;
                        this.mem = new DataView(this._inst.exports.mem.buffer);
                      },
                      "runtime.nanotime1": (sp) => {
                        sp >>>= 0;
                        setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);
                      },
                      "runtime.walltime": (sp) => {
                        sp >>>= 0;
                        const msec = new Date().getTime();
                        setInt64(sp + 8, msec / 1e3);
                        this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);
                      },
                      "runtime.scheduleTimeoutEvent": (sp) => {
                        sp >>>= 0;
                        const id = this._nextCallbackTimeoutID;
                        this._nextCallbackTimeoutID++;
                        this._scheduledTimeouts.set(id, setTimeout(
                          () => {
                            this._resume();
                            while (this._scheduledTimeouts.has(id)) {
                              console.warn("scheduleTimeoutEvent: missed timeout event");
                              this._resume();
                            }
                          },
                          getInt64(sp + 8) + 1
                        ));
                        this.mem.setInt32(sp + 16, id, true);
                      },
                      "runtime.clearTimeoutEvent": (sp) => {
                        sp >>>= 0;
                        const id = this.mem.getInt32(sp + 8, true);
                        clearTimeout(this._scheduledTimeouts.get(id));
                        this._scheduledTimeouts.delete(id);
                      },
                      "runtime.getRandomData": (sp) => {
                        sp >>>= 0;
                        crypto.getRandomValues(loadSlice(sp + 8));
                      },
                      "syscall/js.finalizeRef": (sp) => {
                        sp >>>= 0;
                        const id = this.mem.getUint32(sp + 8, true);
                        this._goRefCounts[id]--;
                        if (this._goRefCounts[id] === 0) {
                          const v2 = this._values[id];
                          this._values[id] = null;
                          this._ids.delete(v2);
                          this._idPool.push(id);
                        }
                      },
                      "syscall/js.stringVal": (sp) => {
                        sp >>>= 0;
                        storeValue(sp + 24, loadString(sp + 8));
                      },
                      "syscall/js.valueGet": (sp) => {
                        sp >>>= 0;
                        const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));
                        sp = this._inst.exports.getsp() >>> 0;
                        storeValue(sp + 32, result);
                      },
                      "syscall/js.valueSet": (sp) => {
                        sp >>>= 0;
                        Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));
                      },
                      "syscall/js.valueDelete": (sp) => {
                        sp >>>= 0;
                        Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));
                      },
                      "syscall/js.valueIndex": (sp) => {
                        sp >>>= 0;
                        storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));
                      },
                      "syscall/js.valueSetIndex": (sp) => {
                        sp >>>= 0;
                        Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));
                      },
                      "syscall/js.valueCall": (sp) => {
                        sp >>>= 0;
                        try {
                          const v2 = loadValue(sp + 8);
                          const m2 = Reflect.get(v2, loadString(sp + 16));
                          const args = loadSliceOfValues(sp + 32);
                          const result = Reflect.apply(m2, v2, args);
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 56, result);
                          this.mem.setUint8(sp + 64, 1);
                        } catch (err) {
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 56, err);
                          this.mem.setUint8(sp + 64, 0);
                        }
                      },
                      "syscall/js.valueInvoke": (sp) => {
                        sp >>>= 0;
                        try {
                          const v2 = loadValue(sp + 8);
                          const args = loadSliceOfValues(sp + 16);
                          const result = Reflect.apply(v2, void 0, args);
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 40, result);
                          this.mem.setUint8(sp + 48, 1);
                        } catch (err) {
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 40, err);
                          this.mem.setUint8(sp + 48, 0);
                        }
                      },
                      "syscall/js.valueNew": (sp) => {
                        sp >>>= 0;
                        try {
                          const v2 = loadValue(sp + 8);
                          const args = loadSliceOfValues(sp + 16);
                          const result = Reflect.construct(v2, args);
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 40, result);
                          this.mem.setUint8(sp + 48, 1);
                        } catch (err) {
                          sp = this._inst.exports.getsp() >>> 0;
                          storeValue(sp + 40, err);
                          this.mem.setUint8(sp + 48, 0);
                        }
                      },
                      "syscall/js.valueLength": (sp) => {
                        sp >>>= 0;
                        setInt64(sp + 16, parseInt(loadValue(sp + 8).length));
                      },
                      "syscall/js.valuePrepareString": (sp) => {
                        sp >>>= 0;
                        const str = encoder.encode(String(loadValue(sp + 8)));
                        storeValue(sp + 16, str);
                        setInt64(sp + 24, str.length);
                      },
                      "syscall/js.valueLoadString": (sp) => {
                        sp >>>= 0;
                        const str = loadValue(sp + 8);
                        loadSlice(sp + 16).set(str);
                      },
                      "syscall/js.valueInstanceOf": (sp) => {
                        sp >>>= 0;
                        this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);
                      },
                      "syscall/js.copyBytesToGo": (sp) => {
                        sp >>>= 0;
                        const dst = loadSlice(sp + 8);
                        const src = loadValue(sp + 32);
                        if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {
                          this.mem.setUint8(sp + 48, 0);
                          return;
                        }
                        const toCopy = src.subarray(0, dst.length);
                        dst.set(toCopy);
                        setInt64(sp + 40, toCopy.length);
                        this.mem.setUint8(sp + 48, 1);
                      },
                      "syscall/js.copyBytesToJS": (sp) => {
                        sp >>>= 0;
                        const dst = loadValue(sp + 8);
                        const src = loadSlice(sp + 16);
                        if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {
                          this.mem.setUint8(sp + 48, 0);
                          return;
                        }
                        const toCopy = src.subarray(0, dst.length);
                        dst.set(toCopy);
                        setInt64(sp + 40, toCopy.length);
                        this.mem.setUint8(sp + 48, 1);
                      },
                      "debug": (value) => {
                        console.log(value);
                      }
                    }
                  };
                }
                run(instance) {
                  return __async2(this, null, function* () {
                    if (!(instance instanceof WebAssembly.Instance)) {
                      throw new Error("Go.run: WebAssembly.Instance expected");
                    }
                    this._inst = instance;
                    this.mem = new DataView(this._inst.exports.mem.buffer);
                    this._values = [
                      NaN,
                      0,
                      null,
                      true,
                      false,
                      globalThis2,
                      this
                    ];
                    this._goRefCounts = new Array(this._values.length).fill(Infinity);
                    this._ids = /* @__PURE__ */ new Map([
                      [0, 1],
                      [null, 2],
                      [true, 3],
                      [false, 4],
                      [globalThis2, 5],
                      [this, 6]
                    ]);
                    this._idPool = [];
                    this.exited = false;
                    let offset = 4096;
                    const strPtr = /* @__PURE__ */ __name((str) => {
                      const ptr = offset;
                      const bytes = encoder.encode(str + "\0");
                      new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);
                      offset += bytes.length;
                      if (offset % 8 !== 0) {
                        offset += 8 - offset % 8;
                      }
                      return ptr;
                    }, "strPtr");
                    const argc = this.argv.length;
                    const argvPtrs = [];
                    this.argv.forEach((arg) => {
                      argvPtrs.push(strPtr(arg));
                    });
                    argvPtrs.push(0);
                    const keys = Object.keys(this.env).sort();
                    keys.forEach((key) => {
                      argvPtrs.push(strPtr(`${key}=${this.env[key]}`));
                    });
                    argvPtrs.push(0);
                    const argv = offset;
                    argvPtrs.forEach((ptr) => {
                      this.mem.setUint32(offset, ptr, true);
                      this.mem.setUint32(offset + 4, 0, true);
                      offset += 8;
                    });
                    const wasmMinDataAddr = 4096 + 8192;
                    if (offset >= wasmMinDataAddr) {
                      throw new Error("total length of command line and environment variables exceeds limit");
                    }
                    this._inst.exports.run(argc, argv);
                    if (this.exited) {
                      this._resolveExitPromise();
                    }
                    yield this._exitPromise;
                  });
                }
                _resume() {
                  if (this.exited) {
                    throw new Error("Go program has already exited");
                  }
                  this._inst.exports.resume();
                  if (this.exited) {
                    this._resolveExitPromise();
                  }
                }
                _makeFuncWrapper(id) {
                  const go = this;
                  return function() {
                    const event = { id, this: this, args: arguments };
                    go._pendingEvent = event;
                    go._resume();
                    return event.result;
                  };
                }
              };
            })();
            onmessage2 = /* @__PURE__ */ __name(({ data: wasm2 }) => {
              let decoder = new TextDecoder();
              let fs = globalThis2.fs;
              let stderr = "";
              fs.writeSync = (fd, buffer) => {
                if (fd === 1) {
                  postMessage(buffer);
                } else if (fd === 2) {
                  stderr += decoder.decode(buffer);
                  let parts = stderr.split("\n");
                  if (parts.length > 1)
                    console.log(parts.slice(0, -1).join("\n"));
                  stderr = parts[parts.length - 1];
                } else {
                  throw new Error("Bad write");
                }
                return buffer.length;
              };
              let stdin = [];
              let resumeStdin;
              let stdinPos = 0;
              onmessage2 = /* @__PURE__ */ __name(({ data }) => {
                if (data.length > 0) {
                  stdin.push(data);
                  if (resumeStdin)
                    resumeStdin();
                }
              }, "onmessage");
              fs.read = (fd, buffer, offset, length, position, callback) => {
                if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {
                  throw new Error("Bad read");
                }
                if (stdin.length === 0) {
                  resumeStdin = /* @__PURE__ */ __name(() => fs.read(fd, buffer, offset, length, position, callback), "resumeStdin");
                  return;
                }
                let first = stdin[0];
                let count = Math.max(0, Math.min(length, first.length - stdinPos));
                buffer.set(first.subarray(stdinPos, stdinPos + count), offset);
                stdinPos += count;
                if (stdinPos === first.length) {
                  stdin.shift();
                  stdinPos = 0;
                }
                callback(null, count);
              };
              let go = new globalThis2.Go();
              go.argv = ["", `--service=${"0.15.16"}`];
              if (wasm2 instanceof WebAssembly.Module) {
                WebAssembly.instantiate(wasm2, go.importObject).then((instance) => go.run(instance));
              } else {
                WebAssembly.instantiate(wasm2, go.importObject).then(({ instance }) => go.run(instance));
              }
            }, "onmessage");
            return (m2) => onmessage2(m2);
          })((data) => worker2.onmessage({ data }));
          worker2 = {
            onmessage: null,
            postMessage: (data) => setTimeout(() => onmessage({ data })),
            terminate() {
            }
          };
        }
        worker2.postMessage(wasm);
        worker2.onmessage = ({ data }) => readFromStdout(data);
        let { readFromStdout, service } = createChannel({
          writeToStdin(bytes) {
            worker2.postMessage(bytes);
          },
          isSync: false,
          isWriteUnavailable: true,
          esbuild: browser_exports
        });
        longLivedService = {
          build: (options) => new Promise((resolve, reject) => service.buildOrServe({
            callName: "build",
            refs: null,
            serveOptions: null,
            options,
            isTTY: false,
            defaultWD: "/",
            callback: (err, res) => err ? reject(err) : resolve(res)
          })),
          transform: (input, options) => new Promise((resolve, reject) => service.transform({
            callName: "transform",
            refs: null,
            input,
            options: options || {},
            isTTY: false,
            fs: {
              readFile(_2, callback) {
                callback(new Error("Internal error"), null);
              },
              writeFile(_2, callback) {
                callback(null);
              }
            },
            callback: (err, res) => err ? reject(err) : resolve(res)
          })),
          formatMessages: (messages, options) => new Promise((resolve, reject) => service.formatMessages({
            callName: "formatMessages",
            refs: null,
            messages,
            options,
            callback: (err, res) => err ? reject(err) : resolve(res)
          })),
          analyzeMetafile: (metafile, options) => new Promise((resolve, reject) => service.analyzeMetafile({
            callName: "analyzeMetafile",
            refs: null,
            metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
            options,
            callback: (err, res) => err ? reject(err) : resolve(res)
          }))
        };
      }), "startRunningService");
      var browser_default = browser_exports;
    })(typeof module === "object" ? module : { set exports(x2) {
      (typeof self !== "undefined" ? self : this).esbuild = x2;
    } });
  }
});

// ../../.yarn/global/cache/localforage-npm-1.10.0-cf9ea9a436-9.zip/node_modules/localforage/dist/localforage.js
var require_localforage = __commonJS({
  "../../.yarn/global/cache/localforage-npm-1.10.0-cf9ea9a436-9.zip/node_modules/localforage/dist/localforage.js"(exports, module) {
    init_define_process();
    (function(f2) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f2();
      } else if (typeof define === "function" && define.amd) {
        define([], f2);
      } else {
        var g2;
        if (typeof window !== "undefined") {
          g2 = window;
        } else if (typeof globalThis !== "undefined") {
          g2 = globalThis;
        } else if (typeof self !== "undefined") {
          g2 = self;
        } else {
          g2 = this;
        }
        g2.localforage = f2();
      }
    })(function() {
      var define3, module2, exports2;
      return (/* @__PURE__ */ __name(function e2(t2, n2, r2) {
        function s2(o3, u2) {
          if (!n2[o3]) {
            if (!t2[o3]) {
              var a2 = typeof __require == "function" && __require;
              if (!u2 && a2)
                return a2(o3, true);
              if (i2)
                return i2(o3, true);
              var f2 = new Error("Cannot find module '" + o3 + "'");
              throw f2.code = "MODULE_NOT_FOUND", f2;
            }
            var l2 = n2[o3] = { exports: {} };
            t2[o3][0].call(l2.exports, function(e3) {
              var n3 = t2[o3][1][e3];
              return s2(n3 ? n3 : e3);
            }, l2, l2.exports, e2, t2, n2, r2);
          }
          return n2[o3].exports;
        }
        __name(s2, "s");
        var i2 = typeof __require == "function" && __require;
        for (var o2 = 0; o2 < r2.length; o2++)
          s2(r2[o2]);
        return s2;
      }, "e"))({ 1: [function(_dereq_, module3, exports3) {
        (function(global2) {
          "use strict";
          var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
          var scheduleDrain;
          {
            if (Mutation) {
              var called = 0;
              var observer = new Mutation(nextTick);
              var element = global2.document.createTextNode("");
              observer.observe(element, {
                characterData: true
              });
              scheduleDrain = /* @__PURE__ */ __name(function() {
                element.data = called = ++called % 2;
              }, "scheduleDrain");
            } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
              var channel = new global2.MessageChannel();
              channel.port1.onmessage = nextTick;
              scheduleDrain = /* @__PURE__ */ __name(function() {
                channel.port2.postMessage(0);
              }, "scheduleDrain");
            } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
              scheduleDrain = /* @__PURE__ */ __name(function() {
                var scriptEl = global2.document.createElement("script");
                scriptEl.onreadystatechange = function() {
                  nextTick();
                  scriptEl.onreadystatechange = null;
                  scriptEl.parentNode.removeChild(scriptEl);
                  scriptEl = null;
                };
                global2.document.documentElement.appendChild(scriptEl);
              }, "scheduleDrain");
            } else {
              scheduleDrain = /* @__PURE__ */ __name(function() {
                setTimeout(nextTick, 0);
              }, "scheduleDrain");
            }
          }
          var draining;
          var queue = [];
          function nextTick() {
            draining = true;
            var i2, oldQueue;
            var len = queue.length;
            while (len) {
              oldQueue = queue;
              queue = [];
              i2 = -1;
              while (++i2 < len) {
                oldQueue[i2]();
              }
              len = queue.length;
            }
            draining = false;
          }
          __name(nextTick, "nextTick");
          module3.exports = immediate;
          function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
              scheduleDrain();
            }
          }
          __name(immediate, "immediate");
        }).call(this, typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}], 2: [function(_dereq_, module3, exports3) {
        "use strict";
        var immediate = _dereq_(1);
        function INTERNAL() {
        }
        __name(INTERNAL, "INTERNAL");
        var handlers = {};
        var REJECTED = ["REJECTED"];
        var FULFILLED = ["FULFILLED"];
        var PENDING = ["PENDING"];
        module3.exports = Promise2;
        function Promise2(resolver) {
          if (typeof resolver !== "function") {
            throw new TypeError("resolver must be a function");
          }
          this.state = PENDING;
          this.queue = [];
          this.outcome = void 0;
          if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver);
          }
        }
        __name(Promise2, "Promise");
        Promise2.prototype["catch"] = function(onRejected) {
          return this.then(null, onRejected);
        };
        Promise2.prototype.then = function(onFulfilled, onRejected) {
          if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
            return this;
          }
          var promise = new this.constructor(INTERNAL);
          if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
            unwrap(promise, resolver, this.outcome);
          } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
          }
          return promise;
        };
        function QueueItem(promise, onFulfilled, onRejected) {
          this.promise = promise;
          if (typeof onFulfilled === "function") {
            this.onFulfilled = onFulfilled;
            this.callFulfilled = this.otherCallFulfilled;
          }
          if (typeof onRejected === "function") {
            this.onRejected = onRejected;
            this.callRejected = this.otherCallRejected;
          }
        }
        __name(QueueItem, "QueueItem");
        QueueItem.prototype.callFulfilled = function(value) {
          handlers.resolve(this.promise, value);
        };
        QueueItem.prototype.otherCallFulfilled = function(value) {
          unwrap(this.promise, this.onFulfilled, value);
        };
        QueueItem.prototype.callRejected = function(value) {
          handlers.reject(this.promise, value);
        };
        QueueItem.prototype.otherCallRejected = function(value) {
          unwrap(this.promise, this.onRejected, value);
        };
        function unwrap(promise, func, value) {
          immediate(function() {
            var returnValue;
            try {
              returnValue = func(value);
            } catch (e2) {
              return handlers.reject(promise, e2);
            }
            if (returnValue === promise) {
              handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
            } else {
              handlers.resolve(promise, returnValue);
            }
          });
        }
        __name(unwrap, "unwrap");
        handlers.resolve = function(self2, value) {
          var result = tryCatch(getThen, value);
          if (result.status === "error") {
            return handlers.reject(self2, result.value);
          }
          var thenable = result.value;
          if (thenable) {
            safelyResolveThenable(self2, thenable);
          } else {
            self2.state = FULFILLED;
            self2.outcome = value;
            var i2 = -1;
            var len = self2.queue.length;
            while (++i2 < len) {
              self2.queue[i2].callFulfilled(value);
            }
          }
          return self2;
        };
        handlers.reject = function(self2, error) {
          self2.state = REJECTED;
          self2.outcome = error;
          var i2 = -1;
          var len = self2.queue.length;
          while (++i2 < len) {
            self2.queue[i2].callRejected(error);
          }
          return self2;
        };
        function getThen(obj) {
          var then = obj && obj.then;
          if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
            return /* @__PURE__ */ __name(function appyThen() {
              then.apply(obj, arguments);
            }, "appyThen");
          }
        }
        __name(getThen, "getThen");
        function safelyResolveThenable(self2, thenable) {
          var called = false;
          function onError(value) {
            if (called) {
              return;
            }
            called = true;
            handlers.reject(self2, value);
          }
          __name(onError, "onError");
          function onSuccess(value) {
            if (called) {
              return;
            }
            called = true;
            handlers.resolve(self2, value);
          }
          __name(onSuccess, "onSuccess");
          function tryToUnwrap() {
            thenable(onSuccess, onError);
          }
          __name(tryToUnwrap, "tryToUnwrap");
          var result = tryCatch(tryToUnwrap);
          if (result.status === "error") {
            onError(result.value);
          }
        }
        __name(safelyResolveThenable, "safelyResolveThenable");
        function tryCatch(func, value) {
          var out = {};
          try {
            out.value = func(value);
            out.status = "success";
          } catch (e2) {
            out.status = "error";
            out.value = e2;
          }
          return out;
        }
        __name(tryCatch, "tryCatch");
        Promise2.resolve = resolve;
        function resolve(value) {
          if (value instanceof this) {
            return value;
          }
          return handlers.resolve(new this(INTERNAL), value);
        }
        __name(resolve, "resolve");
        Promise2.reject = reject;
        function reject(reason) {
          var promise = new this(INTERNAL);
          return handlers.reject(promise, reason);
        }
        __name(reject, "reject");
        Promise2.all = all;
        function all(iterable) {
          var self2 = this;
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"));
          }
          var len = iterable.length;
          var called = false;
          if (!len) {
            return this.resolve([]);
          }
          var values = new Array(len);
          var resolved = 0;
          var i2 = -1;
          var promise = new this(INTERNAL);
          while (++i2 < len) {
            allResolver(iterable[i2], i2);
          }
          return promise;
          function allResolver(value, i3) {
            self2.resolve(value).then(resolveFromAll, function(error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
            function resolveFromAll(outValue) {
              values[i3] = outValue;
              if (++resolved === len && !called) {
                called = true;
                handlers.resolve(promise, values);
              }
            }
            __name(resolveFromAll, "resolveFromAll");
          }
          __name(allResolver, "allResolver");
        }
        __name(all, "all");
        Promise2.race = race;
        function race(iterable) {
          var self2 = this;
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"));
          }
          var len = iterable.length;
          var called = false;
          if (!len) {
            return this.resolve([]);
          }
          var i2 = -1;
          var promise = new this(INTERNAL);
          while (++i2 < len) {
            resolver(iterable[i2]);
          }
          return promise;
          function resolver(value) {
            self2.resolve(value).then(function(response) {
              if (!called) {
                called = true;
                handlers.resolve(promise, response);
              }
            }, function(error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
          }
          __name(resolver, "resolver");
        }
        __name(race, "race");
      }, { "1": 1 }], 3: [function(_dereq_, module3, exports3) {
        (function(global2) {
          "use strict";
          if (typeof global2.Promise !== "function") {
            global2.Promise = _dereq_(2);
          }
        }).call(this, typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, { "2": 2 }], 4: [function(_dereq_, module3, exports3) {
        "use strict";
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
          return typeof obj;
        } : function(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        __name(_classCallCheck, "_classCallCheck");
        function getIDB() {
          try {
            if (typeof indexedDB !== "undefined") {
              return indexedDB;
            }
            if (typeof webkitIndexedDB !== "undefined") {
              return webkitIndexedDB;
            }
            if (typeof mozIndexedDB !== "undefined") {
              return mozIndexedDB;
            }
            if (typeof OIndexedDB !== "undefined") {
              return OIndexedDB;
            }
            if (typeof msIndexedDB !== "undefined") {
              return msIndexedDB;
            }
          } catch (e2) {
            return;
          }
        }
        __name(getIDB, "getIDB");
        var idb = getIDB();
        function isIndexedDBValid() {
          try {
            if (!idb || !idb.open) {
              return false;
            }
            var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
            var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
            return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined";
          } catch (e2) {
            return false;
          }
        }
        __name(isIndexedDBValid, "isIndexedDBValid");
        function createBlob(parts, properties) {
          parts = parts || [];
          properties = properties || {};
          try {
            return new Blob(parts, properties);
          } catch (e2) {
            if (e2.name !== "TypeError") {
              throw e2;
            }
            var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
            var builder = new Builder();
            for (var i2 = 0; i2 < parts.length; i2 += 1) {
              builder.append(parts[i2]);
            }
            return builder.getBlob(properties.type);
          }
        }
        __name(createBlob, "createBlob");
        if (typeof Promise === "undefined") {
          _dereq_(3);
        }
        var Promise$1 = Promise;
        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function(result) {
              callback(null, result);
            }, function(error) {
              callback(error);
            });
          }
        }
        __name(executeCallback, "executeCallback");
        function executeTwoCallbacks(promise, callback, errorCallback) {
          if (typeof callback === "function") {
            promise.then(callback);
          }
          if (typeof errorCallback === "function") {
            promise["catch"](errorCallback);
          }
        }
        __name(executeTwoCallbacks, "executeTwoCallbacks");
        function normalizeKey(key2) {
          if (typeof key2 !== "string") {
            console.warn(key2 + " used as a key, but it is not a string.");
            key2 = String(key2);
          }
          return key2;
        }
        __name(normalizeKey, "normalizeKey");
        function getCallback() {
          if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
            return arguments[arguments.length - 1];
          }
        }
        __name(getCallback, "getCallback");
        var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
        var supportsBlobs = void 0;
        var dbContexts = {};
        var toString = Object.prototype.toString;
        var READ_ONLY = "readonly";
        var READ_WRITE = "readwrite";
        function _binStringToArrayBuffer(bin) {
          var length2 = bin.length;
          var buf = new ArrayBuffer(length2);
          var arr = new Uint8Array(buf);
          for (var i2 = 0; i2 < length2; i2++) {
            arr[i2] = bin.charCodeAt(i2);
          }
          return buf;
        }
        __name(_binStringToArrayBuffer, "_binStringToArrayBuffer");
        function _checkBlobSupportWithoutCaching(idb2) {
          return new Promise$1(function(resolve) {
            var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
            var blob = createBlob([""]);
            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
            txn.onabort = function(e2) {
              e2.preventDefault();
              e2.stopPropagation();
              resolve(false);
            };
            txn.oncomplete = function() {
              var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
              var matchedEdge = navigator.userAgent.match(/Edge\//);
              resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
          })["catch"](function() {
            return false;
          });
        }
        __name(_checkBlobSupportWithoutCaching, "_checkBlobSupportWithoutCaching");
        function _checkBlobSupport(idb2) {
          if (typeof supportsBlobs === "boolean") {
            return Promise$1.resolve(supportsBlobs);
          }
          return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }
        __name(_checkBlobSupport, "_checkBlobSupport");
        function _deferReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = {};
          deferredOperation.promise = new Promise$1(function(resolve, reject) {
            deferredOperation.resolve = resolve;
            deferredOperation.reject = reject;
          });
          dbContext.deferredOperations.push(deferredOperation);
          if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
          } else {
            dbContext.dbReady = dbContext.dbReady.then(function() {
              return deferredOperation.promise;
            });
          }
        }
        __name(_deferReadiness, "_deferReadiness");
        function _advanceReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = dbContext.deferredOperations.pop();
          if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
          }
        }
        __name(_advanceReadiness, "_advanceReadiness");
        function _rejectReadiness(dbInfo, err) {
          var dbContext = dbContexts[dbInfo.name];
          var deferredOperation = dbContext.deferredOperations.pop();
          if (deferredOperation) {
            deferredOperation.reject(err);
            return deferredOperation.promise;
          }
        }
        __name(_rejectReadiness, "_rejectReadiness");
        function _getConnection(dbInfo, upgradeNeeded) {
          return new Promise$1(function(resolve, reject) {
            dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
            if (dbInfo.db) {
              if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
              } else {
                return resolve(dbInfo.db);
              }
            }
            var dbArgs = [dbInfo.name];
            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }
            var openreq = idb.open.apply(idb, dbArgs);
            if (upgradeNeeded) {
              openreq.onupgradeneeded = function(e2) {
                var db = openreq.result;
                try {
                  db.createObjectStore(dbInfo.storeName);
                  if (e2.oldVersion <= 1) {
                    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                  }
                } catch (ex) {
                  if (ex.name === "ConstraintError") {
                    console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e2.oldVersion + " to version " + e2.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }
            openreq.onerror = function(e2) {
              e2.preventDefault();
              reject(openreq.error);
            };
            openreq.onsuccess = function() {
              var db = openreq.result;
              db.onversionchange = function(e2) {
                e2.target.close();
              };
              resolve(db);
              _advanceReadiness(dbInfo);
            };
          });
        }
        __name(_getConnection, "_getConnection");
        function _getOriginalConnection(dbInfo) {
          return _getConnection(dbInfo, false);
        }
        __name(_getOriginalConnection, "_getOriginalConnection");
        function _getUpgradedConnection(dbInfo) {
          return _getConnection(dbInfo, true);
        }
        __name(_getUpgradedConnection, "_getUpgradedConnection");
        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }
          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;
          if (isDowngrade) {
            if (dbInfo.version !== defaultVersion) {
              console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
            }
            dbInfo.version = dbInfo.db.version;
          }
          if (isUpgrade || isNewStore) {
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;
              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }
            return true;
          }
          return false;
        }
        __name(_isUpgradeNeeded, "_isUpgradeNeeded");
        function _encodeBlob(blob) {
          return new Promise$1(function(resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onloadend = function(e2) {
              var base64 = btoa(e2.target.result || "");
              resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };
            reader.readAsBinaryString(blob);
          });
        }
        __name(_encodeBlob, "_encodeBlob");
        function _decodeBlob(encodedBlob) {
          var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
          return createBlob([arrayBuff], { type: encodedBlob.type });
        }
        __name(_decodeBlob, "_decodeBlob");
        function _isEncodedBlob(value) {
          return value && value.__local_forage_encoded_blob;
        }
        __name(_isEncodedBlob, "_isEncodedBlob");
        function _fullyReady(callback) {
          var self2 = this;
          var promise = self2._initReady().then(function() {
            var dbContext = dbContexts[self2._dbInfo.name];
            if (dbContext && dbContext.dbReady) {
              return dbContext.dbReady;
            }
          });
          executeTwoCallbacks(promise, callback, callback);
          return promise;
        }
        __name(_fullyReady, "_fullyReady");
        function _tryReconnect(dbInfo) {
          _deferReadiness(dbInfo);
          var dbContext = dbContexts[dbInfo.name];
          var forages = dbContext.forages;
          for (var i2 = 0; i2 < forages.length; i2++) {
            var forage = forages[i2];
            if (forage._dbInfo.db) {
              forage._dbInfo.db.close();
              forage._dbInfo.db = null;
            }
          }
          dbInfo.db = null;
          return _getOriginalConnection(dbInfo).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo)) {
              return _getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            for (var i3 = 0; i3 < forages.length; i3++) {
              forages[i3]._dbInfo.db = db;
            }
          })["catch"](function(err) {
            _rejectReadiness(dbInfo, err);
            throw err;
          });
        }
        __name(_tryReconnect, "_tryReconnect");
        function createTransaction(dbInfo, mode, callback, retries) {
          if (retries === void 0) {
            retries = 1;
          }
          try {
            var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
            callback(null, tx);
          } catch (err) {
            if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
              return Promise$1.resolve().then(function() {
                if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                  if (dbInfo.db) {
                    dbInfo.version = dbInfo.db.version + 1;
                  }
                  return _getUpgradedConnection(dbInfo);
                }
              }).then(function() {
                return _tryReconnect(dbInfo).then(function() {
                  createTransaction(dbInfo, mode, callback, retries - 1);
                });
              })["catch"](callback);
            }
            callback(err);
          }
        }
        __name(createTransaction, "createTransaction");
        function createDbContext() {
          return {
            forages: [],
            db: null,
            dbReady: null,
            deferredOperations: []
          };
        }
        __name(createDbContext, "createDbContext");
        function _initStorage(options) {
          var self2 = this;
          var dbInfo = {
            db: null
          };
          if (options) {
            for (var i2 in options) {
              dbInfo[i2] = options[i2];
            }
          }
          var dbContext = dbContexts[dbInfo.name];
          if (!dbContext) {
            dbContext = createDbContext();
            dbContexts[dbInfo.name] = dbContext;
          }
          dbContext.forages.push(self2);
          if (!self2._initReady) {
            self2._initReady = self2.ready;
            self2.ready = _fullyReady;
          }
          var initPromises = [];
          function ignoreErrors() {
            return Promise$1.resolve();
          }
          __name(ignoreErrors, "ignoreErrors");
          for (var j2 = 0; j2 < dbContext.forages.length; j2++) {
            var forage = dbContext.forages[j2];
            if (forage !== self2) {
              initPromises.push(forage._initReady()["catch"](ignoreErrors));
            }
          }
          var forages = dbContext.forages.slice(0);
          return Promise$1.all(initPromises).then(function() {
            dbInfo.db = dbContext.db;
            return _getOriginalConnection(dbInfo);
          }).then(function(db) {
            dbInfo.db = db;
            if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
              return _getUpgradedConnection(dbInfo);
            }
            return db;
          }).then(function(db) {
            dbInfo.db = dbContext.db = db;
            self2._dbInfo = dbInfo;
            for (var k2 = 0; k2 < forages.length; k2++) {
              var forage2 = forages[k2];
              if (forage2 !== self2) {
                forage2._dbInfo.db = dbInfo.db;
                forage2._dbInfo.version = dbInfo.version;
              }
            }
          });
        }
        __name(_initStorage, "_initStorage");
        function getItem(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.get(key2);
                  req.onsuccess = function() {
                    var value = req.result;
                    if (value === void 0) {
                      value = null;
                    }
                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }
                    resolve(value);
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(getItem, "getItem");
        function iterate(iterator, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.openCursor();
                  var iterationNumber = 1;
                  req.onsuccess = function() {
                    var cursor = req.result;
                    if (cursor) {
                      var value = cursor.value;
                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }
                      var result = iterator(value, cursor.key, iterationNumber++);
                      if (result !== void 0) {
                        resolve(result);
                      } else {
                        cursor["continue"]();
                      }
                    } else {
                      resolve();
                    }
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(iterate, "iterate");
        function setItem(key2, value, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve, reject) {
            var dbInfo;
            self2.ready().then(function() {
              dbInfo = self2._dbInfo;
              if (toString.call(value) === "[object Blob]") {
                return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                  if (blobSupport) {
                    return value;
                  }
                  return _encodeBlob(value);
                });
              }
              return value;
            }).then(function(value2) {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  if (value2 === null) {
                    value2 = void 0;
                  }
                  var req = store.put(value2, key2);
                  transaction.oncomplete = function() {
                    if (value2 === void 0) {
                      value2 = null;
                    }
                    resolve(value2);
                  };
                  transaction.onabort = transaction.onerror = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(setItem, "setItem");
        function removeItem(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store["delete"](key2);
                  transaction.oncomplete = function() {
                    resolve();
                  };
                  transaction.onerror = function() {
                    reject(req.error);
                  };
                  transaction.onabort = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(removeItem, "removeItem");
        function clear(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.clear();
                  transaction.oncomplete = function() {
                    resolve();
                  };
                  transaction.onabort = transaction.onerror = function() {
                    var err2 = req.error ? req.error : req.transaction.error;
                    reject(err2);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(clear, "clear");
        function length(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.count();
                  req.onsuccess = function() {
                    resolve(req.result);
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(length, "length");
        function key(n2, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            if (n2 < 0) {
              resolve(null);
              return;
            }
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var advanced = false;
                  var req = store.openKeyCursor();
                  req.onsuccess = function() {
                    var cursor = req.result;
                    if (!cursor) {
                      resolve(null);
                      return;
                    }
                    if (n2 === 0) {
                      resolve(cursor.key);
                    } else {
                      if (!advanced) {
                        advanced = true;
                        cursor.advance(n2);
                      } else {
                        resolve(cursor.key);
                      }
                    }
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(key, "key");
        function keys(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
                if (err) {
                  return reject(err);
                }
                try {
                  var store = transaction.objectStore(self2._dbInfo.storeName);
                  var req = store.openKeyCursor();
                  var keys2 = [];
                  req.onsuccess = function() {
                    var cursor = req.result;
                    if (!cursor) {
                      resolve(keys2);
                      return;
                    }
                    keys2.push(cursor.key);
                    cursor["continue"]();
                  };
                  req.onerror = function() {
                    reject(req.error);
                  };
                } catch (e2) {
                  reject(e2);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(keys, "keys");
        function dropInstance(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$1.reject("Invalid arguments");
          } else {
            var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
            var dbPromise = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db) {
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              dbContext.db = db;
              for (var i2 = 0; i2 < forages.length; i2++) {
                forages[i2]._dbInfo.db = db;
              }
              return db;
            });
            if (!options.storeName) {
              promise = dbPromise.then(function(db) {
                _deferReadiness(options);
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();
                for (var i2 = 0; i2 < forages.length; i2++) {
                  var forage = forages[i2];
                  forage._dbInfo.db = null;
                }
                var dropDBPromise = new Promise$1(function(resolve, reject) {
                  var req = idb.deleteDatabase(options.name);
                  req.onerror = function() {
                    var db2 = req.result;
                    if (db2) {
                      db2.close();
                    }
                    reject(req.error);
                  };
                  req.onblocked = function() {
                    console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                  };
                  req.onsuccess = function() {
                    var db2 = req.result;
                    if (db2) {
                      db2.close();
                    }
                    resolve(db2);
                  };
                });
                return dropDBPromise.then(function(db2) {
                  dbContext.db = db2;
                  for (var i3 = 0; i3 < forages.length; i3++) {
                    var _forage = forages[i3];
                    _advanceReadiness(_forage._dbInfo);
                  }
                })["catch"](function(err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                  });
                  throw err;
                });
              });
            } else {
              promise = dbPromise.then(function(db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                  return;
                }
                var newVersion = db.version + 1;
                _deferReadiness(options);
                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();
                for (var i2 = 0; i2 < forages.length; i2++) {
                  var forage = forages[i2];
                  forage._dbInfo.db = null;
                  forage._dbInfo.version = newVersion;
                }
                var dropObjectPromise = new Promise$1(function(resolve, reject) {
                  var req = idb.open(options.name, newVersion);
                  req.onerror = function(err) {
                    var db2 = req.result;
                    db2.close();
                    reject(err);
                  };
                  req.onupgradeneeded = function() {
                    var db2 = req.result;
                    db2.deleteObjectStore(options.storeName);
                  };
                  req.onsuccess = function() {
                    var db2 = req.result;
                    db2.close();
                    resolve(db2);
                  };
                });
                return dropObjectPromise.then(function(db2) {
                  dbContext.db = db2;
                  for (var j2 = 0; j2 < forages.length; j2++) {
                    var _forage2 = forages[j2];
                    _forage2._dbInfo.db = db2;
                    _advanceReadiness(_forage2._dbInfo);
                  }
                })["catch"](function(err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                  });
                  throw err;
                });
              });
            }
          }
          executeCallback(promise, callback);
          return promise;
        }
        __name(dropInstance, "dropInstance");
        var asyncStorage = {
          _driver: "asyncStorage",
          _initStorage,
          _support: isIndexedDBValid(),
          iterate,
          getItem,
          setItem,
          removeItem,
          clear,
          length,
          key,
          keys,
          dropInstance
        };
        function isWebSQLValid() {
          return typeof openDatabase === "function";
        }
        __name(isWebSQLValid, "isWebSQLValid");
        var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var BLOB_TYPE_PREFIX = "~~local_forage_type~";
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
        var SERIALIZED_MARKER = "__lfsc__:";
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
        var TYPE_ARRAYBUFFER = "arbf";
        var TYPE_BLOB = "blob";
        var TYPE_INT8ARRAY = "si08";
        var TYPE_UINT8ARRAY = "ui08";
        var TYPE_UINT8CLAMPEDARRAY = "uic8";
        var TYPE_INT16ARRAY = "si16";
        var TYPE_INT32ARRAY = "si32";
        var TYPE_UINT16ARRAY = "ur16";
        var TYPE_UINT32ARRAY = "ui32";
        var TYPE_FLOAT32ARRAY = "fl32";
        var TYPE_FLOAT64ARRAY = "fl64";
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var toString$1 = Object.prototype.toString;
        function stringToBuffer(serializedString) {
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i2;
          var p2 = 0;
          var encoded1, encoded2, encoded3, encoded4;
          if (serializedString[serializedString.length - 1] === "=") {
            bufferLength--;
            if (serializedString[serializedString.length - 2] === "=") {
              bufferLength--;
            }
          }
          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);
          for (i2 = 0; i2 < len; i2 += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i2]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i2 + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i2 + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i2 + 3]);
            bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        }
        __name(stringToBuffer, "stringToBuffer");
        function bufferToString(buffer) {
          var bytes = new Uint8Array(buffer);
          var base64String = "";
          var i2;
          for (i2 = 0; i2 < bytes.length; i2 += 3) {
            base64String += BASE_CHARS[bytes[i2] >> 2];
            base64String += BASE_CHARS[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
            base64String += BASE_CHARS[bytes[i2 + 2] & 63];
          }
          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + "=";
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + "==";
          }
          return base64String;
        }
        __name(bufferToString, "bufferToString");
        function serialize(value, callback) {
          var valueType = "";
          if (value) {
            valueType = toString$1.call(value);
          }
          if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
            var buffer;
            var marker = SERIALIZED_MARKER;
            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;
              if (valueType === "[object Int8Array]") {
                marker += TYPE_INT8ARRAY;
              } else if (valueType === "[object Uint8Array]") {
                marker += TYPE_UINT8ARRAY;
              } else if (valueType === "[object Uint8ClampedArray]") {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueType === "[object Int16Array]") {
                marker += TYPE_INT16ARRAY;
              } else if (valueType === "[object Uint16Array]") {
                marker += TYPE_UINT16ARRAY;
              } else if (valueType === "[object Int32Array]") {
                marker += TYPE_INT32ARRAY;
              } else if (valueType === "[object Uint32Array]") {
                marker += TYPE_UINT32ARRAY;
              } else if (valueType === "[object Float32Array]") {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueType === "[object Float64Array]") {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error("Failed to get type for BinaryArray"));
              }
            }
            callback(marker + bufferToString(buffer));
          } else if (valueType === "[object Blob]") {
            var fileReader = new FileReader();
            fileReader.onload = function() {
              var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };
            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e2) {
              console.error("Couldn't convert value into a JSON string: ", value);
              callback(null, e2);
            }
          }
        }
        __name(serialize, "serialize");
        function deserialize(value) {
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          }
          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType;
          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }
          var buffer = stringToBuffer(serializedString);
          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;
            case TYPE_BLOB:
              return createBlob([buffer], { type: blobType });
            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);
            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);
            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);
            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);
            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);
            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);
            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);
            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);
            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);
            default:
              throw new Error("Unkown type: " + type);
          }
        }
        __name(deserialize, "deserialize");
        var localforageSerializer = {
          serialize,
          deserialize,
          stringToBuffer,
          bufferToString
        };
        function createDbTable(t2, dbInfo, callback, errorCallback) {
          t2.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
        }
        __name(createDbTable, "createDbTable");
        function _initStorage$1(options) {
          var self2 = this;
          var dbInfo = {
            db: null
          };
          if (options) {
            for (var i2 in options) {
              dbInfo[i2] = typeof options[i2] !== "string" ? options[i2].toString() : options[i2];
            }
          }
          var dbInfoPromise = new Promise$1(function(resolve, reject) {
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e2) {
              return reject(e2);
            }
            dbInfo.db.transaction(function(t2) {
              createDbTable(t2, dbInfo, function() {
                self2._dbInfo = dbInfo;
                resolve();
              }, function(t3, error) {
                reject(error);
              });
            }, reject);
          });
          dbInfo.serializer = localforageSerializer;
          return dbInfoPromise;
        }
        __name(_initStorage$1, "_initStorage$1");
        function tryExecuteSql(t2, dbInfo, sqlStatement, args, callback, errorCallback) {
          t2.executeSql(sqlStatement, args, callback, function(t3, error) {
            if (error.code === error.SYNTAX_ERR) {
              t3.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t4, results) {
                if (!results.rows.length) {
                  createDbTable(t4, dbInfo, function() {
                    t4.executeSql(sqlStatement, args, callback, errorCallback);
                  }, errorCallback);
                } else {
                  errorCallback(t4, error);
                }
              }, errorCallback);
            } else {
              errorCallback(t3, error);
            }
          }, errorCallback);
        }
        __name(tryExecuteSql, "tryExecuteSql");
        function getItem$1(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t3, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }
                  resolve(result);
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(getItem$1, "getItem$1");
        function iterate$1(iterator, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t3, results) {
                  var rows = results.rows;
                  var length2 = rows.length;
                  for (var i2 = 0; i2 < length2; i2++) {
                    var item = rows.item(i2);
                    var result = item.value;
                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }
                    result = iterator(result, item.key, i2 + 1);
                    if (result !== void 0) {
                      resolve(result);
                      return;
                    }
                  }
                  resolve();
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(iterate$1, "iterate$1");
        function _setItem(key2, value, callback, retriesLeft) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              if (value === void 0) {
                value = null;
              }
              var originalValue = value;
              var dbInfo = self2._dbInfo;
              dbInfo.serializer.serialize(value, function(value2, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function(t2) {
                    tryExecuteSql(t2, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                      resolve(originalValue);
                    }, function(t3, error2) {
                      reject(error2);
                    });
                  }, function(sqlError) {
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      if (retriesLeft > 0) {
                        resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                        return;
                      }
                      reject(sqlError);
                    }
                  });
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(_setItem, "_setItem");
        function setItem$1(key2, value, callback) {
          return _setItem.apply(this, [key2, value, callback, 1]);
        }
        __name(setItem$1, "setItem$1");
        function removeItem$1(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                  resolve();
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(removeItem$1, "removeItem$1");
        function clear$1(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                  resolve();
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(clear$1, "clear$1");
        function length$1(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t3, results) {
                  var result = results.rows.item(0).c;
                  resolve(result);
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(length$1, "length$1");
        function key$1(n2, callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n2 + 1], function(t3, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve(result);
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(key$1, "key$1");
        function keys$1(callback) {
          var self2 = this;
          var promise = new Promise$1(function(resolve, reject) {
            self2.ready().then(function() {
              var dbInfo = self2._dbInfo;
              dbInfo.db.transaction(function(t2) {
                tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t3, results) {
                  var keys2 = [];
                  for (var i2 = 0; i2 < results.rows.length; i2++) {
                    keys2.push(results.rows.item(i2).key);
                  }
                  resolve(keys2);
                }, function(t3, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(keys$1, "keys$1");
        function getAllStoreNames(db) {
          return new Promise$1(function(resolve, reject) {
            db.transaction(function(t2) {
              t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t3, results) {
                var storeNames = [];
                for (var i2 = 0; i2 < results.rows.length; i2++) {
                  storeNames.push(results.rows.item(i2).name);
                }
                resolve({
                  db,
                  storeNames
                });
              }, function(t3, error) {
                reject(error);
              });
            }, function(sqlError) {
              reject(sqlError);
            });
          });
        }
        __name(getAllStoreNames, "getAllStoreNames");
        function dropInstance$1(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$1.reject("Invalid arguments");
          } else {
            promise = new Promise$1(function(resolve) {
              var db;
              if (options.name === currentConfig.name) {
                db = self2._dbInfo.db;
              } else {
                db = openDatabase(options.name, "", "", 0);
              }
              if (!options.storeName) {
                resolve(getAllStoreNames(db));
              } else {
                resolve({
                  db,
                  storeNames: [options.storeName]
                });
              }
            }).then(function(operationInfo) {
              return new Promise$1(function(resolve, reject) {
                operationInfo.db.transaction(function(t2) {
                  function dropTable(storeName) {
                    return new Promise$1(function(resolve2, reject2) {
                      t2.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                        resolve2();
                      }, function(t3, error) {
                        reject2(error);
                      });
                    });
                  }
                  __name(dropTable, "dropTable");
                  var operations = [];
                  for (var i2 = 0, len = operationInfo.storeNames.length; i2 < len; i2++) {
                    operations.push(dropTable(operationInfo.storeNames[i2]));
                  }
                  Promise$1.all(operations).then(function() {
                    resolve();
                  })["catch"](function(e2) {
                    reject(e2);
                  });
                }, function(sqlError) {
                  reject(sqlError);
                });
              });
            });
          }
          executeCallback(promise, callback);
          return promise;
        }
        __name(dropInstance$1, "dropInstance$1");
        var webSQLStorage = {
          _driver: "webSQLStorage",
          _initStorage: _initStorage$1,
          _support: isWebSQLValid(),
          iterate: iterate$1,
          getItem: getItem$1,
          setItem: setItem$1,
          removeItem: removeItem$1,
          clear: clear$1,
          length: length$1,
          key: key$1,
          keys: keys$1,
          dropInstance: dropInstance$1
        };
        function isLocalStorageValid() {
          try {
            return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem;
          } catch (e2) {
            return false;
          }
        }
        __name(isLocalStorageValid, "isLocalStorageValid");
        function _getKeyPrefix(options, defaultConfig) {
          var keyPrefix = options.name + "/";
          if (options.storeName !== defaultConfig.storeName) {
            keyPrefix += options.storeName + "/";
          }
          return keyPrefix;
        }
        __name(_getKeyPrefix, "_getKeyPrefix");
        function checkIfLocalStorageThrows() {
          var localStorageTestKey = "_localforage_support_test";
          try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);
            return false;
          } catch (e2) {
            return true;
          }
        }
        __name(checkIfLocalStorageThrows, "checkIfLocalStorageThrows");
        function _isLocalStorageUsable() {
          return !checkIfLocalStorageThrows() || localStorage.length > 0;
        }
        __name(_isLocalStorageUsable, "_isLocalStorageUsable");
        function _initStorage$2(options) {
          var self2 = this;
          var dbInfo = {};
          if (options) {
            for (var i2 in options) {
              dbInfo[i2] = options[i2];
            }
          }
          dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
          if (!_isLocalStorageUsable()) {
            return Promise$1.reject();
          }
          self2._dbInfo = dbInfo;
          dbInfo.serializer = localforageSerializer;
          return Promise$1.resolve();
        }
        __name(_initStorage$2, "_initStorage$2");
        function clear$2(callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var keyPrefix = self2._dbInfo.keyPrefix;
            for (var i2 = localStorage.length - 1; i2 >= 0; i2--) {
              var key2 = localStorage.key(i2);
              if (key2.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key2);
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(clear$2, "clear$2");
        function getItem$2(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key2);
            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }
            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(getItem$2, "getItem$2");
        function iterate$2(iterator, callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length2 = localStorage.length;
            var iterationNumber = 1;
            for (var i2 = 0; i2 < length2; i2++) {
              var key2 = localStorage.key(i2);
              if (key2.indexOf(keyPrefix) !== 0) {
                continue;
              }
              var value = localStorage.getItem(key2);
              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }
              value = iterator(value, key2.substring(keyPrefixLength), iterationNumber++);
              if (value !== void 0) {
                return value;
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(iterate$2, "iterate$2");
        function key$2(n2, callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var result;
            try {
              result = localStorage.key(n2);
            } catch (error) {
              result = null;
            }
            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }
            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(key$2, "key$2");
        function keys$2(callback) {
          var self2 = this;
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            var length2 = localStorage.length;
            var keys2 = [];
            for (var i2 = 0; i2 < length2; i2++) {
              var itemKey = localStorage.key(i2);
              if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys2.push(itemKey.substring(dbInfo.keyPrefix.length));
              }
            }
            return keys2;
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(keys$2, "keys$2");
        function length$2(callback) {
          var self2 = this;
          var promise = self2.keys().then(function(keys2) {
            return keys2.length;
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(length$2, "length$2");
        function removeItem$2(key2, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key2);
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(removeItem$2, "removeItem$2");
        function setItem$2(key2, value, callback) {
          var self2 = this;
          key2 = normalizeKey(key2);
          var promise = self2.ready().then(function() {
            if (value === void 0) {
              value = null;
            }
            var originalValue = value;
            return new Promise$1(function(resolve, reject) {
              var dbInfo = self2._dbInfo;
              dbInfo.serializer.serialize(value, function(value2, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                    resolve(originalValue);
                  } catch (e2) {
                    if (e2.name === "QuotaExceededError" || e2.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                      reject(e2);
                    }
                    reject(e2);
                  }
                }
              });
            });
          });
          executeCallback(promise, callback);
          return promise;
        }
        __name(setItem$2, "setItem$2");
        function dropInstance$2(options, callback) {
          callback = getCallback.apply(this, arguments);
          options = typeof options !== "function" && options || {};
          if (!options.name) {
            var currentConfig = this.config();
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }
          var self2 = this;
          var promise;
          if (!options.name) {
            promise = Promise$1.reject("Invalid arguments");
          } else {
            promise = new Promise$1(function(resolve) {
              if (!options.storeName) {
                resolve(options.name + "/");
              } else {
                resolve(_getKeyPrefix(options, self2._defaultConfig));
              }
            }).then(function(keyPrefix) {
              for (var i2 = localStorage.length - 1; i2 >= 0; i2--) {
                var key2 = localStorage.key(i2);
                if (key2.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key2);
                }
              }
            });
          }
          executeCallback(promise, callback);
          return promise;
        }
        __name(dropInstance$2, "dropInstance$2");
        var localStorageWrapper = {
          _driver: "localStorageWrapper",
          _initStorage: _initStorage$2,
          _support: isLocalStorageValid(),
          iterate: iterate$2,
          getItem: getItem$2,
          setItem: setItem$2,
          removeItem: removeItem$2,
          clear: clear$2,
          length: length$2,
          key: key$2,
          keys: keys$2,
          dropInstance: dropInstance$2
        };
        var sameValue = /* @__PURE__ */ __name(function sameValue2(x2, y2) {
          return x2 === y2 || typeof x2 === "number" && typeof y2 === "number" && isNaN(x2) && isNaN(y2);
        }, "sameValue");
        var includes = /* @__PURE__ */ __name(function includes2(array, searchElement) {
          var len = array.length;
          var i2 = 0;
          while (i2 < len) {
            if (sameValue(array[i2], searchElement)) {
              return true;
            }
            i2++;
          }
          return false;
        }, "includes");
        var isArray = Array.isArray || function(arg) {
          return Object.prototype.toString.call(arg) === "[object Array]";
        };
        var DefinedDrivers = {};
        var DriverSupport = {};
        var DefaultDrivers = {
          INDEXEDDB: asyncStorage,
          WEBSQL: webSQLStorage,
          LOCALSTORAGE: localStorageWrapper
        };
        var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
        var OptionalDriverMethods = ["dropInstance"];
        var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
        var DefaultConfig = {
          description: "",
          driver: DefaultDriverOrder.slice(),
          name: "localforage",
          size: 4980736,
          storeName: "keyvaluepairs",
          version: 1
        };
        function callWhenReady(localForageInstance, libraryMethod) {
          localForageInstance[libraryMethod] = function() {
            var _args = arguments;
            return localForageInstance.ready().then(function() {
              return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
          };
        }
        __name(callWhenReady, "callWhenReady");
        function extend() {
          for (var i2 = 1; i2 < arguments.length; i2++) {
            var arg = arguments[i2];
            if (arg) {
              for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                  if (isArray(arg[_key])) {
                    arguments[0][_key] = arg[_key].slice();
                  } else {
                    arguments[0][_key] = arg[_key];
                  }
                }
              }
            }
          }
          return arguments[0];
        }
        __name(extend, "extend");
        var LocalForage = function() {
          function LocalForage2(options) {
            _classCallCheck(this, LocalForage2);
            for (var driverTypeKey in DefaultDrivers) {
              if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;
                if (!DefinedDrivers[driverName]) {
                  this.defineDriver(driver);
                }
              }
            }
            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;
            this._wrapLibraryMethodsWithReady();
            this.setDriver(this._config.driver)["catch"](function() {
            });
          }
          __name(LocalForage2, "LocalForage");
          LocalForage2.prototype.config = /* @__PURE__ */ __name(function config(options) {
            if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
              if (this._ready) {
                return new Error("Can't call config() after localforage has been used.");
              }
              for (var i2 in options) {
                if (i2 === "storeName") {
                  options[i2] = options[i2].replace(/\W/g, "_");
                }
                if (i2 === "version" && typeof options[i2] !== "number") {
                  return new Error("Database version must be a number.");
                }
                this._config[i2] = options[i2];
              }
              if ("driver" in options && options.driver) {
                return this.setDriver(this._config.driver);
              }
              return true;
            } else if (typeof options === "string") {
              return this._config[options];
            } else {
              return this._config;
            }
          }, "config");
          LocalForage2.prototype.defineDriver = /* @__PURE__ */ __name(function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$1(function(resolve, reject) {
              try {
                var driverName = driverObject._driver;
                var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                if (!driverObject._driver) {
                  reject(complianceError);
                  return;
                }
                var driverMethods = LibraryMethods.concat("_initStorage");
                for (var i2 = 0, len = driverMethods.length; i2 < len; i2++) {
                  var driverMethodName = driverMethods[i2];
                  var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                  if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                    reject(complianceError);
                    return;
                  }
                }
                var configureMissingMethods = /* @__PURE__ */ __name(function configureMissingMethods2() {
                  var methodNotImplementedFactory = /* @__PURE__ */ __name(function methodNotImplementedFactory2(methodName) {
                    return function() {
                      var error = new Error("Method " + methodName + " is not implemented by the current driver");
                      var promise2 = Promise$1.reject(error);
                      executeCallback(promise2, arguments[arguments.length - 1]);
                      return promise2;
                    };
                  }, "methodNotImplementedFactory");
                  for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                    var optionalDriverMethod = OptionalDriverMethods[_i];
                    if (!driverObject[optionalDriverMethod]) {
                      driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                    }
                  }
                }, "configureMissingMethods");
                configureMissingMethods();
                var setDriverSupport = /* @__PURE__ */ __name(function setDriverSupport2(support) {
                  if (DefinedDrivers[driverName]) {
                    console.info("Redefining LocalForage driver: " + driverName);
                  }
                  DefinedDrivers[driverName] = driverObject;
                  DriverSupport[driverName] = support;
                  resolve();
                }, "setDriverSupport");
                if ("_support" in driverObject) {
                  if (driverObject._support && typeof driverObject._support === "function") {
                    driverObject._support().then(setDriverSupport, reject);
                  } else {
                    setDriverSupport(!!driverObject._support);
                  }
                } else {
                  setDriverSupport(true);
                }
              } catch (e2) {
                reject(e2);
              }
            });
            executeTwoCallbacks(promise, callback, errorCallback);
            return promise;
          }, "defineDriver");
          LocalForage2.prototype.driver = /* @__PURE__ */ __name(function driver() {
            return this._driver || null;
          }, "driver");
          LocalForage2.prototype.getDriver = /* @__PURE__ */ __name(function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
            executeTwoCallbacks(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
          }, "getDriver");
          LocalForage2.prototype.getSerializer = /* @__PURE__ */ __name(function getSerializer(callback) {
            var serializerPromise = Promise$1.resolve(localforageSerializer);
            executeTwoCallbacks(serializerPromise, callback);
            return serializerPromise;
          }, "getSerializer");
          LocalForage2.prototype.ready = /* @__PURE__ */ __name(function ready(callback) {
            var self2 = this;
            var promise = self2._driverSet.then(function() {
              if (self2._ready === null) {
                self2._ready = self2._initDriver();
              }
              return self2._ready;
            });
            executeTwoCallbacks(promise, callback, callback);
            return promise;
          }, "ready");
          LocalForage2.prototype.setDriver = /* @__PURE__ */ __name(function setDriver(drivers, callback, errorCallback) {
            var self2 = this;
            if (!isArray(drivers)) {
              drivers = [drivers];
            }
            var supportedDrivers = this._getSupportedDrivers(drivers);
            function setDriverToConfig() {
              self2._config.driver = self2.driver();
            }
            __name(setDriverToConfig, "setDriverToConfig");
            function extendSelfWithDriver(driver) {
              self2._extend(driver);
              setDriverToConfig();
              self2._ready = self2._initStorage(self2._config);
              return self2._ready;
            }
            __name(extendSelfWithDriver, "extendSelfWithDriver");
            function initDriver(supportedDrivers2) {
              return function() {
                var currentDriverIndex = 0;
                function driverPromiseLoop() {
                  while (currentDriverIndex < supportedDrivers2.length) {
                    var driverName = supportedDrivers2[currentDriverIndex];
                    currentDriverIndex++;
                    self2._dbInfo = null;
                    self2._ready = null;
                    return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                  }
                  setDriverToConfig();
                  var error = new Error("No available storage method found.");
                  self2._driverSet = Promise$1.reject(error);
                  return self2._driverSet;
                }
                __name(driverPromiseLoop, "driverPromiseLoop");
                return driverPromiseLoop();
              };
            }
            __name(initDriver, "initDriver");
            var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
              return Promise$1.resolve();
            }) : Promise$1.resolve();
            this._driverSet = oldDriverSetDone.then(function() {
              var driverName = supportedDrivers[0];
              self2._dbInfo = null;
              self2._ready = null;
              return self2.getDriver(driverName).then(function(driver) {
                self2._driver = driver._driver;
                setDriverToConfig();
                self2._wrapLibraryMethodsWithReady();
                self2._initDriver = initDriver(supportedDrivers);
              });
            })["catch"](function() {
              setDriverToConfig();
              var error = new Error("No available storage method found.");
              self2._driverSet = Promise$1.reject(error);
              return self2._driverSet;
            });
            executeTwoCallbacks(this._driverSet, callback, errorCallback);
            return this._driverSet;
          }, "setDriver");
          LocalForage2.prototype.supports = /* @__PURE__ */ __name(function supports(driverName) {
            return !!DriverSupport[driverName];
          }, "supports");
          LocalForage2.prototype._extend = /* @__PURE__ */ __name(function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
          }, "_extend");
          LocalForage2.prototype._getSupportedDrivers = /* @__PURE__ */ __name(function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];
            for (var i2 = 0, len = drivers.length; i2 < len; i2++) {
              var driverName = drivers[i2];
              if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
              }
            }
            return supportedDrivers;
          }, "_getSupportedDrivers");
          LocalForage2.prototype._wrapLibraryMethodsWithReady = /* @__PURE__ */ __name(function _wrapLibraryMethodsWithReady() {
            for (var i2 = 0, len = LibraryMethods.length; i2 < len; i2++) {
              callWhenReady(this, LibraryMethods[i2]);
            }
          }, "_wrapLibraryMethodsWithReady");
          LocalForage2.prototype.createInstance = /* @__PURE__ */ __name(function createInstance(options) {
            return new LocalForage2(options);
          }, "createInstance");
          return LocalForage2;
        }();
        var localforage_js = new LocalForage();
        module3.exports = localforage_js;
      }, { "3": 3 }] }, {}, [4])(4);
    });
  }
});

// js/starter.tsx
init_define_process();
var import_react = __toESM(require_react(), 1);
var import_react2 = __toESM(require_emotion_react_cjs(), 1);

// ../../.yarn/global/cache/async-mutex-npm-0.4.0-f5a25d4255-9.zip/node_modules/async-mutex/index.mjs
init_define_process();
var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
var E_ALREADY_LOCKED = new Error("mutex already locked");
var E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var Semaphore = class {
  constructor(_value, _cancelError = E_CANCELED) {
    this._value = _value;
    this._cancelError = _cancelError;
    this._weightedQueues = [];
    this._weightedWaiters = [];
  }
  acquire(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve, reject) => {
      if (!this._weightedQueues[weight - 1])
        this._weightedQueues[weight - 1] = [];
      this._weightedQueues[weight - 1].push({ resolve, reject });
      this._dispatch();
    });
  }
  runExclusive(callback, weight = 1) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire(weight);
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve) => {
      if (!this._weightedWaiters[weight - 1])
        this._weightedWaiters[weight - 1] = [];
      this._weightedWaiters[weight - 1].push(resolve);
      this._dispatch();
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
    this._dispatch();
  }
  release(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    this._value += weight;
    this._dispatch();
  }
  cancel() {
    this._weightedQueues.forEach((queue) => queue.forEach((entry) => entry.reject(this._cancelError)));
    this._weightedQueues = [];
  }
  _dispatch() {
    var _a;
    for (let weight = this._value; weight > 0; weight--) {
      const queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
      if (!queueEntry)
        continue;
      const previousValue = this._value;
      const previousWeight = weight;
      this._value -= weight;
      weight = this._value + 1;
      queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
    }
    this._drainUnlockWaiters();
  }
  _newReleaser(weight) {
    let called = false;
    return () => {
      if (called)
        return;
      called = true;
      this.release(weight);
    };
  }
  _drainUnlockWaiters() {
    for (let weight = this._value; weight > 0; weight--) {
      if (!this._weightedWaiters[weight - 1])
        continue;
      this._weightedWaiters[weight - 1].forEach((waiter) => waiter());
      this._weightedWaiters[weight - 1] = [];
    }
  }
};
__name(Semaphore, "Semaphore");
var __awaiter$1 = function(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
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
var Mutex = class {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const [, releaser] = yield this._semaphore.acquire();
      return releaser;
    });
  }
  runExclusive(callback) {
    return this._semaphore.runExclusive(() => callback());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    if (this._semaphore.isLocked())
      this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};
__name(Mutex, "Mutex");

// ../../.yarn/global/cache/@ampproject-worker-dom-npm-0.34.0-cfc9652499-9.zip/node_modules/@ampproject/worker-dom/dist/main.mjs
init_define_process();
var e = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(8);
  return { execute: (e3, r3, s3) => (o2 && s3 && (e3 = t2.getNode(e3[r3 + 1])) && (s3 = e3.transferControlToOffscreen(), n2.messageToWorker({ 12: 9, 13: [e3._index_], 38: s3 }, [s3])), r3 + 2) };
}, "e");
var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var n = /* @__PURE__ */ __name((e2, t2) => Array.prototype.forEach.call(e2, t2), "n");
var r = class {
  constructor(e2, t2) {
    this.nodes = this.count = this.stringContext = this.baseElement = void 0, this.createNodes = (e3, t3) => {
      let n2 = (e3 = new Uint16Array(e3)).length;
      for (let s2 = 0; s2 < n2; s2 += 5) {
        var r2 = void 0;
        if (3 === e3[s2 + 1])
          r2 = document.createTextNode(this.stringContext.get(e3[s2 + 3]));
        else if (8 === e3[s2 + 1])
          r2 = document.createComment(this.stringContext.get(e3[s2 + 3]));
        else if (11 === e3[s2 + 1])
          r2 = document.createDocumentFragment();
        else if (r2 = this.stringContext.get(e3[s2 + 2]), r2 = 0 !== e3[s2 + 4] ? document.createElementNS(this.stringContext.get(e3[s2 + 4]), r2) : document.createElement(r2), t3 && !t3.sanitize(r2))
          continue;
        this.storeNode(r2, e3[s2]);
      }
    }, this.getNode = (e3) => (e3 = this.nodes.get(e3)) && "BODY" === e3.nodeName ? this.baseElement : e3, this.storeNodes = (e3) => {
      this.storeNode(e3, ++this.count), n(e3.childNodes, (e4) => this.storeNodes(e4));
    }, this.count = 2, this.stringContext = e2, this.nodes = /* @__PURE__ */ new Map([[1, t2], [2, t2]]), this.baseElement = t2, t2._index_ = 2, n(t2.childNodes, (e3) => this.storeNodes(e3));
  }
  storeNode(e2, t2) {
    e2._index_ = t2, this.nodes.set(t2, e2);
  }
};
__name(r, "r");
var s = /* @__PURE__ */ new Map();
var o = /* @__PURE__ */ __name((e2, t2) => {
  t2 && "value" in t2 && null === t2.oninput && (t2.oninput = () => l(e2, t2));
}, "o");
var i = /* @__PURE__ */ __name((e2, t2) => {
  t2 && "value" in t2 && !s.get(t2) && (new MutationObserver((t3) => t3.map((t4) => l(e2, t4.target))).observe(t2, { attributes: true }), s.set(t2, true));
}, "i");
var l = /* @__PURE__ */ __name((e2, t2) => e2.messageToWorker({ 12: 4, 40: { 7: t2._index_, 21: t2.value } }), "l");
var u = /* @__PURE__ */ __name((e2) => Object.values(e2).map((e3) => [e3.identifier, e3.screenX, e3.screenY, e3.clientX, e3.clientY, e3.pageX, e3.pageY, e3.target._index_]), "u");
var a = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const a2 = [], c2 = s2.executorsAllowed.includes(4);
  let d2 = [window.innerWidth, window.innerHeight];
  const h2 = /* @__PURE__ */ __name((e3, t3) => (r3) => {
    t3 && r3.preventDefault();
    var s3 = r3.currentTarget;
    if (s3 && "value" in s3)
      l(n2, r3.currentTarget);
    else if ("resize" === r3.type) {
      const { innerWidth: e4, innerHeight: t4 } = window;
      if (d2[0] === e4 && d2[1] === t4)
        return;
      d2 = [window.innerWidth, window.innerHeight], n2.messageToWorker({ 12: 5, 40: d2 });
    }
    n2.messageToWorker({ 12: 1, 39: { 7: e3, 25: r3.bubbles, 26: r3.cancelable, 27: r3.cancelBubble, 28: [r3.currentTarget._index_ || 0], 29: r3.defaultPrevented, 30: r3.eventPhase, 31: r3.isTrusted, 32: r3.returnValue, 13: [r3.target._index_ || 0], 33: r3.timeStamp, 12: r3.type, 35: "keyCode" in r3 ? r3.keyCode : void 0, 60: "pageX" in r3 ? r3.pageX : void 0, 61: "pageY" in r3 ? r3.pageY : void 0, 65: "offsetX" in r3 ? r3.offsetX : void 0, 66: "offsetY" in r3 ? r3.offsetY : void 0, 62: "touches" in r3 ? u(r3.touches) : void 0, 63: "changedTouches" in r3 ? u(r3.changedTouches) : void 0 } });
  }, "h");
  return { execute(r3, s3, l2) {
    var u2 = r3[s3 + 2];
    const d3 = s3 + 4 + 2 * u2;
    if (u2 = s3 + 4 + 6 * r3[s3 + 3] + 2 * u2, c2 && l2 && (l2 = t2.getNode(r3[s3 + 1]))) {
      let c3 = s3 + 4;
      for (; c3 < u2; ) {
        const u3 = c3 <= d3;
        e: {
          s3 = l2;
          var g2 = u3, f2 = r3, p2 = c3;
          const d4 = e2.get(f2[p2]), m2 = f2[p2 + 1];
          if (s3 === t2.baseElement) {
            g2 ? addEventListener(d4, a2[m2] = h2(1, !!f2[p2 + 5])) : removeEventListener(d4, a2[m2]);
            break e;
          }
          let w2 = null !== s3.oninput;
          const x2 = "change" === d4;
          g2 ? (x2 && (w2 = true, s3.onchange = null), s3.addEventListener(d4, a2[m2] = h2(s3._index_, !!f2[p2 + 5]))) : (x2 && (w2 = false), s3.removeEventListener(d4, a2[m2])), s3 && "value" in s3 && (w2 || o(n2, s3), i(n2, s3));
        }
        c3 += u3 ? 2 : 6;
      }
    }
    return u2;
  } };
}, "a");
var c = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(5);
  return { execute: (e3, r3, s3) => (o2 && s3 && (e3 = t2.getNode(e3[r3 + 1])) && (s3 = e3.getBoundingClientRect(), n2.messageToWorker({ 12: 6, 13: [e3._index_], 38: [s3.top, s3.right, s3.bottom, s3.left, s3.width, s3.height] })), r3 + 2) };
}, "c");
var d = /* @__PURE__ */ __name((e2, { getNode: t2 }, n2, r2, s2) => {
  const l2 = s2.executorsAllowed.includes(2);
  return { execute(e3, r3, s3) {
    const u2 = e3[r3 + 4], a2 = e3[r3 + 5];
    if (l2 && s3) {
      const s4 = t2(e3[r3 + 1]);
      s4 && (0 < a2 && e3.slice(r3 + 6 + u2, r3 + 6 + u2 + a2).forEach((e4) => {
        (e4 = t2(e4)) && e4.remove();
      }), 0 < u2 && e3.slice(r3 + 6, r3 + 6 + u2).forEach((l3) => {
        const u3 = e3[r3 + 2];
        (l3 = t2(l3)) && (s4.insertBefore(l3, u3 && t2(u3) || null), o(n2, l3), i(n2, l3));
      }));
    }
    return r3 + 6 + u2 + a2;
  } };
}, "d");
var h = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(0);
  return { execute(n3, r3, i2) {
    if (o2 && i2) {
      i2 = t2.getNode(n3[r3 + 1]);
      const o3 = e2.get(n3[r3 + 2]);
      n3 = 0 !== (n3 = n3[r3 + 4]) ? e2.get(n3 - 1) : null, i2 && null != o3 && (s2.sanitizer ? s2.sanitizer.setAttribute(i2, o3, n3) : null == n3 ? i2.removeAttribute(o3) : i2.setAttribute(o3, n3));
    }
    return r3 + 5;
  } };
}, "h");
var g = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(1);
  return { execute: (n3, r3, s3) => (o2 && s3 && (s3 = t2.getNode(n3[r3 + 1]), n3 = n3[r3 + 2], s3 && n3 && (s3.textContent = e2.get(n3))), r3 + 3) };
}, "g");
var f = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(3);
  return { execute(n3, r3, i2) {
    if (o2 && i2) {
      i2 = t2.getNode(n3[r3 + 1]);
      const o3 = e2.get(n3[r3 + 2]);
      {
        const t3 = n3[r3 + 4];
        n3 = 1 === n3[r3 + 3] ? 1 === t3 : 0 !== t3 ? e2.get(t3) : null;
      }
      i2 && o3 && null != n3 && (s2.sanitizer ? s2.sanitizer.setProperty(i2, o3, String(n3)) : i2[o3] = n3);
    }
    return r3 + 5;
  } };
}, "f");
var p = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(6);
  let i2, l2 = 0;
  return { execute(e3, t3, n3) {
    if (o2 && n3 && s2.longTask)
      if (6 === e3[t3]) {
        if (l2++, !i2) {
          const e4 = new Promise((e5) => i2 = e5);
          Promise.resolve().then(() => s2.longTask && s2.longTask(e4));
        }
      } else
        7 === e3[t3] && (l2--, i2 && 0 >= l2 && (i2(), i2 = null, l2 = 0));
    return t3 + 2;
  }, get active() {
    return null !== i2;
  } };
}, "p");
var m = new Float32Array(1);
var w = new Uint16Array(m.buffer);
function x(e2, t2, n2, r2, s2, o2) {
  let i2 = [];
  for (let u2 = 0; u2 < n2; u2++)
    switch (e2[t2++]) {
      case 1:
        i2.push(e2[t2++]);
        break;
      case 2:
        w[0] = e2[t2++], w[1] = e2[t2++], i2.push(m[0]);
        break;
      case 3:
        i2.push(r2.get(e2[t2++]));
        break;
      case 4:
        var l2 = e2[t2++];
        t2 = x(e2, t2, l2, r2, s2, o2), i2.push(t2.args), t2 = t2.offset;
        break;
      case 5:
        if (!o2)
          throw Error("objectContext not provided.");
        i2.push(o2.get(e2[t2++]));
        break;
      case 6:
        l2 = s2.getNode(e2[t2++]), i2.push(l2.getContext("2d"));
        break;
      case 7:
        i2.push(s2.getNode(e2[t2++]));
        break;
      default:
        throw Error("Cannot deserialize argument.");
    }
  return { args: i2, offset: t2 };
}
__name(x, "x");
var v = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(9);
  return { execute(n3, s3, i2) {
    const l2 = e2.get(n3[s3 + 1]), u2 = n3[s3 + 2], { offset: a2, args: c2 } = x(n3, s3 + 3, 1, e2, t2, r2);
    s3 = c2[0];
    const { offset: d2, args: h2 } = x(n3, a2, u2, e2, t2, r2);
    return o2 && i2 && (b(s3, l2) ? s3[l2] = h2[0] : s3[l2](...h2)), d2;
  } };
}, "v");
function b(e2, t2) {
  if (!e2)
    throw Error(`Property ${t2} does not exist on ${e2}.`);
  let n2 = Object.getOwnPropertyDescriptor(e2, t2);
  return void 0 !== n2 ? "set" in n2 : b(Object.getPrototypeOf(e2), t2);
}
__name(b, "b");
var k = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(10);
  if (!r2)
    throw Error("objectContext is not defined.");
  return { execute(n3, s3, i2) {
    const l2 = e2.get(n3[s3 + 1]), u2 = n3[s3 + 2], a2 = n3[s3 + 3], { offset: c2, args: d2 } = x(n3, s3 + 4, 1, e2, t2, r2);
    s3 = d2[0];
    const { offset: h2, args: g2 } = x(n3, c2, a2, e2, t2, r2);
    return o2 && i2 && "new" !== l2 && r2.store(u2, s3[l2](...g2)), h2;
  } };
}, "k");
var y = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(11);
  return { execute: (e3, r3, s3) => (o2 && s3 && (s3 = t2.getNode(e3[r3 + 1])) && self.createImageBitmap(s3).then((t3) => {
    n2.messageToWorker({ 12: 10, 73: e3[r3 + 2], 38: t3 }, [t3]);
  }), r3 + 3) };
}, "y");
var N = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(12);
  return { execute(t3, r3, i2) {
    if (o2 && i2) {
      i2 = t3[r3 + 1];
      var l2 = t3[r3 + 2], u2 = t3[r3 + 3];
      const o3 = t3[r3 + 4];
      if (t3 = 0 < u2 ? e2.get(u2 - 1) : "", u2 = 0 < o3 ? e2.get(o3 - 1) : null, 1 === i2)
        ((e3, t4) => {
          s2.sanitizer && 2 === e3 && s2.sanitizer.getStorage(e3, t4).then((r4) => {
            n2.messageToWorker({ 12: 11, 74: t4, 75: e3, 21: r4 });
          });
        })(l2, t3);
      else if (2 === i2)
        if (i2 = l2, l2 = t3, t3 = u2, s2.sanitizer)
          s2.sanitizer.setStorage(i2, l2, t3);
        else {
          let e3;
          if (0 === i2 ? e3 = window.localStorage : 1 === i2 && (e3 = window.sessionStorage), e3)
            if (null == l2) {
              if (null != t3)
                throw Error("Unexpected storage operation.");
              e3.clear();
            } else
              null == t3 ? e3.removeItem(l2) : e3.setItem(l2, t3);
        }
    }
    return r3 + 5;
  } };
}, "N");
var C = 0;
var A = {};
var O = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(13);
  return { execute(t3, n3) {
    if (o2) {
      const r3 = t3[n3 + 1], s3 = t3[n3 + 2];
      t3 = t3[n3 + 3], t3 = e2.hasIndex(t3) ? JSON.parse(e2.get(t3)) : void 0, 1 === r3 ? A[s3].resolve(t3) : A[s3].reject(t3), delete A[s3];
    }
    return n3 + 4;
  } };
}, "O");
var _ = /* @__PURE__ */ __name((e2, t2, n2, r2, s2) => {
  const o2 = s2.executorsAllowed.includes(14);
  return { execute: (e3, n3, r3) => (o2 && r3 && (e3 = t2.getNode(e3[n3 + 1])) && e3.scrollIntoView(), n3 + 2) };
}, "_");
var E = class {
  constructor(t2, n2, r2, s2, o2) {
    this.nodeContext = this.stringContext = void 0, this.mutationQueue = [], this.pendingMutations = false, this.executors = this.sanitizer = this.mutationPumpFunction = void 0, this.syncFlush = (e2 = true) => {
      let t3 = [];
      return this.mutationQueue.forEach((n3) => {
        let r3 = n3.length, s3 = 0;
        for (; s3 < r3; ) {
          let r4 = n3[s3];
          var o3;
          if (!(o3 = e2)) {
            e:
              switch (r4) {
                case 4:
                case 5:
                case 6:
                case 7:
                case 12:
                case 8:
                case 13:
                  o3 = false;
                  break e;
                default:
                  o3 = true;
              }
            o3 = !o3;
          }
          o3 || t3.push(r4), s3 = this.executors[r4].execute(n3, s3, o3);
        }
      }), this.mutationQueue = [], this.pendingMutations = false, t3;
    }, this.stringContext = t2, this.nodeContext = n2, this.sanitizer = s2.sanitizer, this.mutationPumpFunction = s2.mutationPump, n2 = p.apply(null, t2 = [t2, n2, r2, o2, s2]), this.executors = { 2: d.apply(null, t2), 0: h.apply(null, t2), 1: g.apply(null, t2), 3: f.apply(null, t2), 4: a.apply(null, t2), 5: c.apply(null, t2), 6: n2, 7: n2, 8: e.apply(null, t2), 9: v.apply(null, t2), 10: k.apply(null, t2), 11: y.apply(null, t2), 12: N.apply(null, t2), 13: O.apply(null, t2), 14: _.apply(null, t2) };
  }
  mutate(e2, t2, n2, r2) {
    this.stringContext.storeValues(n2), this.nodeContext.createNodes(t2, this.sanitizer), this.mutationQueue = this.mutationQueue.concat(r2), this.pendingMutations || (this.pendingMutations = true, this.mutationPumpFunction(this.syncFlush, e2));
  }
};
__name(E, "E");
var T = class {
  constructor() {
    this.strings = [];
  }
  get(e2) {
    return this.strings[e2] || "";
  }
  hasIndex(e2) {
    return void 0 !== this.strings[e2];
  }
  store(e2) {
    return this.strings.push(e2), this.strings.length - 1;
  }
  storeValues(e2) {
    e2.forEach((e3) => this.store(e3));
  }
};
__name(T, "T");
var M = [8, 3];
function S(e2, t2, n2, r2) {
  var s2 = [].slice.call(e2.childNodes).filter(n2);
  return s2 = { 7: e2._index_, 11: 0, 0: e2.nodeType, 1: t2(e2.localName || e2.nodeName), 4: s2.map((e3) => S(e3, t2, n2, r2)), 2: [].map.call(e2.attributes || [], (e3) => [t2(e3.namespaceURI || "null"), t2(e3.name), t2(e3.value)]) }, null != e2.namespaceURI && (s2[6] = t2(e2.namespaceURI)), M.includes(e2.nodeType) && null !== e2.textContent && (s2[5] = t2(e2.textContent)), o(r2, e2), i(r2, e2), s2;
}
__name(S, "S");
var U = class {
  constructor(e2, t2, n2, r2, s2) {
    this[55] = void 0, this.nodeContext = t2, this.config = s2;
    let { skeleton: o2, strings: i2 } = function(e3, t3, n3) {
      t3 = t3.hydrateFilter || (() => true);
      let r3 = [], s3 = /* @__PURE__ */ new Map();
      return { skeleton: S(e3, (e4) => {
        if (s3.has(e4))
          return s3.get(e4);
        const t4 = r3.length;
        return s3.set(e4, t4), r3.push(e4), t4;
      }, t3, n3), strings: r3 };
    }(e2, s2, this);
    t2 = [];
    let l2 = [], u2 = W("localStorage"), a2 = W("sessionStorage");
    for (let n3 in e2.style)
      t2.push(n3);
    for (let t3 in e2)
      t3.startsWith("on") && l2.push(t3);
    n2 = `'use strict';(function(){${n2}self['window']=self;var workerDOM=WorkerThread.workerDOM;WorkerThread.hydrate(workerDOM.document,${JSON.stringify(i2)},${JSON.stringify(o2)},${JSON.stringify(t2)},${JSON.stringify(l2)},[${window.innerWidth},${window.innerHeight}],${JSON.stringify(u2)},${JSON.stringify(a2)});workerDOM.document[59](this);Object.assign(self,workerDOM);}).call(self);${r2}//# sourceURL=${encodeURI(s2.authorURL)}`, s2.sandbox || (this[55] = new Worker(URL.createObjectURL(new Blob([n2])))), s2.onCreateWorker && s2.onCreateWorker(e2, i2, o2, t2);
  }
  ready() {
    return this.worker.readyPromise || Promise.resolve();
  }
  get worker() {
    return this[55];
  }
  messageToWorker(e2, t2) {
    this.config.onSendMessage && this.config.onSendMessage(e2), this.worker.postMessage(e2, t2 || []);
  }
};
__name(U, "U");
function W(e2, t2) {
  try {
    return t2 ? { storage: t2.getStorage("localStorage" == e2 ? 0 : 1), errorMsg: null } : { storage: window[e2], errorMsg: null };
  } catch (e3) {
    return { errorMsg: e3.message, storage: null };
  }
}
__name(W, "W");
var P = class {
  constructor() {
    this.objects = void 0, this.objects = /* @__PURE__ */ new Map();
  }
  store(e2, t2) {
    this.objects.set(e2, t2);
  }
  get(e2) {
    let t2 = this.objects.get(e2);
    if (t2)
      return t2;
    throw Error("Object with id (" + e2 + ") does not exist.");
  }
};
__name(P, "P");
var L = class {
  constructor(e2, t2) {
    this.workerContext_ = e2, this.config = t2;
  }
  callFunction(e2, ...t2) {
    if (!this.config.executorsAllowed.includes(13))
      throw Error(`[worker-dom]: Error calling ${e2}. You must enable the FUNCTION_CALL executor within the config.`);
    let { promise: n2, index: r2 } = function() {
      let e3, t3, n3 = new Promise((n4, r4) => {
        e3 = n4, t3 = r4;
      });
      C >= Number.MAX_VALUE && (C = 0);
      let r3 = C++;
      return A[r3] = { promise: n3, resolve: e3, reject: t3 }, { promise: n3, index: r3 };
    }();
    return e2 = { 12: 12, 77: e2, 78: JSON.stringify(t2), 7: r2 }, this.workerContext_.messageToWorker(e2), n2;
  }
  set onerror(e2) {
    this.workerContext_.worker.onerror = e2;
  }
  terminate() {
    this.workerContext_.worker.terminate();
  }
};
__name(L, "L");
var R = [3, 2];
function j(e2, n2) {
  return function(e3, n3, s2) {
    var o2 = n3.dataset.shadowDom;
    if ("open" === o2 || "closed" === o2) {
      o2 = n3.attachShadow({ mode: o2 });
      let e4 = n3.cloneNode(true);
      o2.appendChild(e4), n3 = e4;
    }
    let i2 = new T(), l2 = new P(), u2 = new r(i2, n3), a2 = function(e4) {
      return Object.assign({}, { mutationPump: requestAnimationFrame.bind(null), executorsAllowed: t }, e4);
    }(s2);
    return e3.then(([e4, t2]) => {
      if (e4 && t2 && s2.authorURL) {
        let r2 = new U(n3, u2, e4, t2, a2), o3 = new E(i2, u2, r2, a2, l2);
        return r2.worker.onmessage = (e5) => {
          let { data: t3 } = e5;
          R.includes(t3[12]) && (o3.mutate(t3[54], t3[37], t3[41], new Uint16Array(t3[36])), s2.onReceiveMessage) && s2.onReceiveMessage(e5);
        }, r2.ready().then(() => new L(r2, a2));
      }
      return null;
    });
  }(Promise.all([fetch(n2.domURL).then((e3) => e3.text()), fetch(n2.authorURL).then((e3) => e3.text())]), e2, n2);
}
__name(j, "j");
function upgradeElement(e2, t2) {
  let n2 = e2.getAttribute("src");
  return n2 ? j(e2, { authorURL: n2, domURL: t2 }) : Promise.resolve(null);
}
__name(upgradeElement, "upgradeElement");

// js/esbuildEsm.ts
init_define_process();
var import_esbuild_wasm = __toESM(require_browser(), 1);

// ../../.yarn/global/cache/esbuild-wasm-npm-0.15.16-c2c146172f-9.zip/node_modules/esbuild-wasm/esbuild.wasm
var esbuild_default = "./chunk-esbuild-LYOCB4YY.wasm";

// js/fetchPlugin.tsx
init_define_process();

// js/runner.tsx
init_define_process();
var import_lodash = __toESM(require_lodash(), 1);

// js/renderToString.tsx
init_define_process();
var import_client = __toESM(require_client(), 1);

// js/wait.ts
init_define_process();
async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}
__name(wait, "wait");

// js/renderToString.tsx
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var mod = {
  md5Hash: "",
  wait: 1,
  res: null,
  codeSpace: "",
  waitForDiv: async (md5Hash) => {
    if (mod.md5Hash !== md5Hash)
      return "";
    if (!mod.res?.innerHTML)
      await waitForAnimation();
    mod.wait *= 2;
    await wait(mod.wait);
    if (!mod.res?.innerHTML.includes(md5Hash)) {
      await waitForAnimation();
    }
    const html = mod.res?.innerHTML;
    if (html?.includes(md5Hash) && mod.res?.firstElementChild?.innerHTML !== "")
      return html;
    mod.wait = mod.wait * 2;
    return await mod.waitForDiv(md5Hash);
  },
  setApp: (md5Hash) => {
    const rootDiv = document.createElement("div");
    rootDiv.style.visibility = "hidden";
    rootDiv.style.position = "absolute";
    const root = (0, import_client.createRoot)(rootDiv);
    const App = apps[md5Hash];
    mod.md5Hash = md5Hash;
    mod.res = rootDiv;
    root.render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, { appId: `${mod.codeSpace}-${md5Hash}` }));
    return () => {
      root.unmount();
      rootDiv.remove();
    };
  }
};
var render = /* @__PURE__ */ __name(async (transpiled, codeSpace2) => {
  mod.codeSpace = codeSpace2;
  const md5hash = md5(transpiled);
  if (!apps[md5hash])
    await appFactory(transpiled);
  mod.wait = 1;
  const cleanup = mod.setApp(
    md5hash
  );
  try {
    const html = await mod.waitForDiv(md5hash);
    if (!html)
      return { html: null, css: null };
    const css2 = mineFromCaches(eCaches[md5hash]);
    const globalCss = document.querySelector(
      `style[data-emotion=${eCaches[md5hash].key}-global]`
    )?.innerHTML;
    return {
      html,
      css: globalCss ? globalCss + " " + css2 : css2
    };
  } finally {
    cleanup();
  }
}, "render");
function mineFromCaches(cache) {
  const key = cache.key;
  try {
    return Array.from(document.querySelectorAll(`style[data-emotion="${cache.key}"]`)).map((x2) => x2.textContent).join(
      "\n"
    );
  } catch {
    return Array.from(document.styleSheets).map((x2) => {
      try {
        return x2.cssRules[0];
      } catch {
        return null;
      }
    }).filter((x2) => x2 && x2.selectorText && x2.selectorText.indexOf(key) !== -1).map((x2) => x2.cssText).join("\n");
  }
}
__name(mineFromCaches, "mineFromCaches");
var waitForAnimation = /* @__PURE__ */ __name(() => {
  let animationFrame;
  console.log("wait for animation");
  const animated = new Promise((resolve) => animationFrame = resolve);
  requestAnimationFrame(() => animationFrame(true));
  return animated;
}, "waitForAnimation");

// js/toUmd.ts
init_define_process();

// js/importmap.json
var imports = {
  "framer-motion": "/motion.mjs",
  "@emotion/react": "/emotion.mjs",
  "@emotion/cache": "/emotionCache.mjs",
  "@emotion/styled": "/emotionStyled.mjs",
  "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
  react: "/reactMod.mjs",
  "react/jsx-runtime": "/jsx.mjs",
  "react-dom": "/reactDom.mjs",
  "react-dom/client": "/reactDomClient.mjs",
  "react-error-boundary": "/reactMod.mjs"
};
var importmap_default = {
  imports
};

// js/toUmd.ts
var import_localforage = __toESM(require_localforage(), 1);
var fileCache = import_localforage.default.createInstance({
  name: "filecache"
});
var imp = { ...importmap_default.imports };
var importMasRes = {};
Object.keys(imp).map((k2) => Object.assign(importMasRes, { [k2]: location.origin + imp[k2] }));
var mod2 = {
  printR(name, included) {
    if (included[mod2.hashMap[name]])
      return "";
    included[mod2.hashMap[name]] = true;
    const current = mod2.data[mod2.hashMap[name]];
    if (!current)
      console.error(name + " is missing!");
    const currentCode = current.code;
    if (!current.deps || !current.deps.length) {
      return currentCode;
    }
    const myDepts = [...current.deps];
    const depts = myDepts.map((name2) => mod2.printR(name2, included)).join(
      " \n "
    );
    return depts + `
    
    ` + currentCode;
  },
  toJs: async (name) => {
    const js = mod2.printR(name, {});
    let reverseMap = {};
    Object.keys(mod2.hashMap).forEach((key) => reverseMap = { ...reverseMap, [mod2.hashMap[key]]: key });
    let modZ = {};
    Object.keys(mod2.data).forEach((k2) => modZ = { ...modZ, [reverseMap[k2]]: k2 });
    Object.keys(importMasRes).forEach((k2) => modZ = { ...modZ, [k2]: "getName(`" + importMasRes[k2] + "`)" });
    const res = `
     ${js}




  
  function require(name){


      const importmap = ${JSON.stringify(importmap_default.imports)};
      const uName = new URL(name, location.origin).toString();    
      const urlName = new URL(name+"/index.js", location.origin).toString();
      if (globalThis.globalNames[name]) return  globalThis.globalNames[name];     
      
      if (globalThis.globalNames[uName]) return  globalThis.globalNames[uName];     

      if (globalThis.globalNames[urlName]) return  globalThis.globalNames[urlName];
      if (importmap[name]) return require(importmap[name])      
      if (!name.includes("/npm:")){
      const npmUrl = new URL('/npm:*'+name+"?bundle&external=@emotion/*,react*,react ", location.origin).toString()
      return require(npmUrl);
    }
  }`;
    return res;
  },
  last: 0,
  hashMap: {},
  data: {}
};
var findDeps = /* @__PURE__ */ __name((code) => {
  const regex = /require\("(.+?)"\)/gm;
  let m2;
  const deps = [];
  while ((m2 = regex.exec(code)) !== null) {
    if (m2.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    for (const [groupIndex, match] of m2.entries()) {
      if (groupIndex == 1) {
        deps.push(match);
      }
    }
  }
  return deps;
}, "findDeps");
var toUmd = /* @__PURE__ */ __name(async (source, name) => {
  const hash = md5(source);
  mod2.hashMap = { ...mod2.hashMap, [name]: hash };
  if (mod2.data[hash])
    return mod2;
  try {
    mod2.data[hash] = {
      code: (await initAndTransform(source, {
        format: "iife",
        keepNames: true,
        treeShaking: true,
        platform: "browser",
        ignoreAnnotations: true,
        target: "es2021",
        define: {
          "globalThis.workerDom": JSON.stringify(true),
          "process.env.NODE_ENV": `"development"`,
          "process.env.NODE_DEBUG": JSON.stringify(false),
          "process.browser": JSON.stringify(true),
          "process.env.DEBUG": JSON.stringify(false),
          "isBrowser": JSON.stringify(true),
          "isJest": JSON.stringify(false),
          "process.env.version": '"1.1.1"',
          global: "globalThis",
          "process.env.DUMP_SESSION_KEYS": JSON.stringify(false)
        },
        loader: "ts",
        globalName: hash
      })).code,
      deps: []
    };
  } catch {
    mod2.data[hash] = {
      code: (await initAndTransform(source, {
        format: "iife",
        keepNames: true,
        treeShaking: true,
        define: {
          "globalThis.workerDom": JSON.stringify(true),
          "process.env.NODE_ENV": `"development"`,
          "process.env.NODE_DEBUG": JSON.stringify(false),
          "process.browser": JSON.stringify(true),
          "process.env.DEBUG": JSON.stringify(false),
          "isBrowser": JSON.stringify(true),
          "isJest": JSON.stringify(false),
          "process.env.version": '"1.1.1"',
          global: "globalThis",
          "process.env.DUMP_SESSION_KEYS": JSON.stringify(false)
        },
        ignoreAnnotations: true,
        target: "es2022",
        tsconfigRaw: {
          compilerOptions: {
            jsx: "react-jsx",
            useDefineForClassFields: false,
            jsxImportSource: "@emotion/react"
          }
        },
        loader: "tsx",
        globalName: hash
      })).code,
      deps: []
    };
  }
  mod2.data[hash].code = mod2.data[hash].code + `
  
  globalThis.globalNames = globalThis.globalNames || {};
  globalThis.globalNames["${name}"] =  ${hash}  ;`;
  mod2.data[hash].deps = findDeps(mod2.data[hash].code).map((dep) => importShim.resolve(dep, name));
  await Promise.all(
    mod2.data[hash].deps.map(
      (depUrl) => fetch_or_die(depUrl).then((content) => toUmd(content, depUrl).then(async (mod4) => await mod4))
    )
  );
  return mod2;
}, "toUmd");
var urls = {};
var fetch_or_die = /* @__PURE__ */ __name(async (url) => {
  if (url.includes(`/live/`))
    return await fetch(url).then((res) => res.text());
  if (urls[url])
    return urls[url];
  const cached = await fileCache.getItem(url);
  if (cached)
    return cached;
  urls[url] = urls[url] || await fetch(url).then((res) => res.text());
  await fileCache.setItem(url, urls[url]);
  return urls[url];
}, "fetch_or_die");

// js/runner.tsx
Object.assign(globalThis, { transform: initAndTransform, build, toUmd });
var debouncedSync = (0, import_lodash.default)(patchSync, 200, {
  leading: true,
  trailing: true,
  maxWait: 800
});
var counterMax = mST().i;
var IIFE = {};
var esmTransform = /* @__PURE__ */ __name(async (code) => {
  const transpiled = await initAndTransform(code, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        useDefineForClassFields: false,
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react"
      }
    },
    target: "es2022"
  });
  Object.assign(IIFE, { [md5(transpiled.code)]: md5(code) });
  return transpiled.code;
}, "esmTransform");
async function runner({ code, counter, codeSpace: codeSpace2 }) {
  if (counter <= counterMax)
    return;
  counterMax = counter;
  try {
    const transpiledCode = await esmTransform(code);
    const { html, css: css2 } = await render(transpiledCode, codeSpace2);
    console.log({ html, css: css2 });
    if (!html || !css2) {
      return;
    }
    debouncedSync({
      ...mST(),
      code,
      i: counter,
      transpiled: transpiledCode,
      html,
      css: css2
    });
  } catch (error) {
    console.error({ error });
  } finally {
  }
}
__name(runner, "runner");

// js/fetchPlugin.tsx
var fetchCache = await caches.open("fetchcache");
var fetchPlugin = {
  name: "http",
  setup(build2) {
    build2.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      path: importShim.resolve(args.path, args.importer),
      namespace: "http-url"
    }));
    build2.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      const getRequest = /* @__PURE__ */ __name(async (req2) => {
        let response = await fetchCache.match(req2);
        if (response)
          return response;
        response = await fetch(req2);
        if (!response || !response.ok)
          return response;
        response = new Response(response.body, response);
        await fetchCache.put(req2, response.clone());
        return response;
      }, "getRequest");
      const req = new Request(args.path);
      let contents = await getRequest(req).then((x2) => x2.text());
      if (args.path.indexOf(".tsx") !== -1)
        contents = await esmTransform(contents);
      return { contents };
    });
  }
};

// js/unpkg-path-plugin.tsx
init_define_process();
var esbuild = __toESM(require_browser(), 1);
var unpkgPathPlugin = {
  name: "unpkg-path-plugin",
  setup(build2) {
    build2.onResolve({ filter: /^\.+\// }, (args) => {
      const url = new URL(args.path, location.origin).toString();
      return {
        path: url,
        namespace: "http-url"
      };
    });
    build2.onResolve({ filter: /^\[a-z]+\// }, (args) => {
      if (args.path.indexOf(location.origin) !== -1) {
        return {
          namespace: "http-url",
          path: args.path
        };
      }
      return {
        path: `${location.origin}/npm:/${args.path}`,
        namespace: "http-url"
      };
    });
  }
};

// js/esbuildEsm.ts
var mod3 = {
  init: false,
  initialize: () => {
    if (mod3.init !== false)
      return mod3.init;
    const wasmURL = new URL(esbuild_default, location.origin).toString();
    mod3.init = (0, import_esbuild_wasm.initialize)({
      wasmURL
    }).then(() => mod3.init = true);
    return mod3.init;
  }
};
var initAndTransform = /* @__PURE__ */ __name(async (code, opts) => {
  const initFinished = mod3.initialize();
  if (initFinished !== true)
    await initFinished;
  const transformed = await (0, import_esbuild_wasm.transform)(code, { ...opts, define: { ...define2, ...opts?.define ? opts.define : {} } });
  const trp = importMapReplace(transformed.code);
  const res = { code: `/*${md5(code)}*/` + trp + `/*${mST().i}*/` };
  return res;
}, "initAndTransform");
var define2 = {
  "process.env.NODE_ENV": `"production"`,
  "process.env.NODE_DEBUG": JSON.stringify(false),
  "process.browser": JSON.stringify(true),
  "process.env.DEBUG": JSON.stringify(false),
  "isBrowser": JSON.stringify(true),
  "isJest": JSON.stringify(false),
  "process.env.version": '"1.1.1"',
  global: "globalThis",
  "WORKER_DOM_DEBUG": JSON.stringify(false),
  "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
  process: JSON.stringify({
    env: {
      NODE_ENV: `production`,
      browser: true,
      NODE_DEBUG: false,
      DEBUG: false,
      isBrowser: true
    },
    browser: true
  })
};
var build = /* @__PURE__ */ __name(async (codeSpace2, i2) => {
  const initFinished = mod3.initialize();
  if (initFinished !== true)
    await initFinished;
  const defaultOpts = {
    bundle: true,
    loader: {
      ".js": "tsx",
      ".css": "css"
    },
    write: false,
    format: "iife",
    entryPoints: [`./live/${codeSpace2}/render.tsx/${i2}`],
    define: define2,
    tsconfig: "./tsconfig.json",
    plugins: [unpkgPathPlugin, fetchPlugin]
  };
  const b2 = await (0, import_esbuild_wasm.build)(defaultOpts);
  console.log(b2.outputFiles);
  return b2.outputFiles[0].text;
}, "build");
function importMapReplace(codeInp) {
  const items = Object.keys(imports);
  let returnStr = codeInp;
  items.map((lib) => {
    const uri = new URL(imports[lib], location.origin).toString();
    returnStr = returnStr.replaceAll(
      ` from "${lib}"`,
      ` from "${uri}"`
    ).replaceAll(
      ` from './`,
      ` from 'https://${location.host}/live/`
    );
  });
  return returnStr;
}
__name(importMapReplace, "importMapReplace");

// js/starter.tsx
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
function createHTML(code, fileName = "index.html") {
  const file = new File([code], fileName, {
    type: "text/html",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}
__name(createHTML, "createHTML");
var modz = {};
var abortz = {};
var codeSpace = location.pathname.slice(1).split("/")[1];
var mutex = new Mutex();
var createIframe = /* @__PURE__ */ __name(async (cs, counter) => {
  await mutex.runExclusive(async () => {
    if (abortz[cs])
      abortz[cs]();
    const controller2 = new AbortController();
    const { signal } = controller2;
    abortz[cs] = () => controller2.abort();
    if (modz[`${cs}-${counter}`])
      return modz[`${cs}-${counter}`];
    return modz[`${cs}-${counter}`] = new Promise(async (res) => {
      if (modz[cs] !== null && modz[cs] > counter)
        return;
      modz[cs] = counter;
      let MST;
      if (cs === codeSpace)
        MST = mST();
      else {
        const I = counter || mST().i;
        MST = (await importShim(`/live/${cs}/mST.mjs?${I}`)).mST;
      }
      if (signal.aborted)
        return;
      if (modz[cs] !== counter)
        return;
      const { html, css: css2, i: i2 } = MST;
      let code = createJsBlob(``);
      if (signal.aborted)
        return;
      let iSRC = /* @__PURE__ */ __name(() => createHTML(`
  <html> 
  <head>
  <style>
  html, body{
    height: 100%;
  }
  ${resetCSS}
  ${css2}</style>
  <script defer src="${code}"><\/script> 
  </head>
  <body>
  <div id="root-${cs}" data-i="${i2}" style="height: 100%;">${html}</div>
  </body>
  
  </html>`), "iSRC");
      if (signal.aborted)
        return;
      if (modz[cs] !== counter)
        return;
      let iframe;
      const setIframe = /* @__PURE__ */ __name(() => {
        if (signal.aborted)
          return;
        if (iframe)
          iframe.remove();
        iframe = document.createElement("iframe");
        iframe.src = iSRC();
        iframe.setAttribute("data-coder", cs);
        iframe.style.height = "100%";
        iframe.setAttribute("id", `coder-${cs}`);
        iframe.style.border = "none";
        iframe.style.width = "100%";
        const zBody = document.getElementById("z-body");
        if (signal.aborted)
          return;
        if (zBody) {
          zBody.innerHTML = "";
          zBody.appendChild(iframe);
        }
        return iframe;
      }, "setIframe");
      if (signal.aborted)
        return;
      iframe = setIframe();
      res(iframe);
      requestAnimationFrame(
        () => !signal.aborted && build(cs, i2).then((x2) => {
          if (modz[cs] === i2)
            code = createJsBlob(x2);
        }).then(() => !signal.aborted && setIframe())
      );
      return iframe;
    });
  });
}, "createIframe");
var worker;
var div;
var parent;
var lastH = "";
var lastSuccessful = "";
async function runInWorker(nameSpace, _parent) {
  lastH = hashCode();
  console.log(`last hash: ${lastH}`);
  await mutex.runExclusive(async () => {
    const current = hashCode();
    if (lastH !== hashCode()) {
      console.log(`skipping old build hash: ${lastH}`);
      return;
    }
    if (current === lastSuccessful) {
      console.log(`skipping build since it is the latest successful: ${current}`);
      return;
    }
    parent = _parent || parent || document.getElementById("root");
    if (div)
      div.remove();
    div = await moveToWorker(nameSpace, parent);
    div.setAttribute("data-shadow-dom", "open");
    const w2 = await upgradeElement(div, "/node_modules/@ampproject/worker-dom@0.34.0/dist/worker/worker.js");
    if (w2 === null)
      throw new Error("No worker");
    worker = w2;
    lastSuccessful = current;
  });
}
__name(runInWorker, "runInWorker");
var bc = new BroadcastChannel(location.origin);
bc.onmessage = (event) => {
  const nameSpace = location.pathname.slice(1).split("/")[1];
  if (event.data.codeSpace === nameSpace) {
    createIframe(nameSpace, mST().i);
  }
};
async function moveToWorker(nameSpace, parent2) {
  const { html, css: css2, i: i2, transpiled } = nameSpace === codeSpace ? mST() : (await import(`${location.origin}/live/${codeSpace}/mST.mjs`)).mST;
  const div2 = document.createElement("div");
  div2.style.height = "100%";
  parent2.innerHTML = `<style>${resetCSS} ${css2}</style>${html}`;
  parent2.appendChild(div2);
  const js = await build(codeSpace, i2);
  const src = createJsBlob(js);
  div2.setAttribute("src", src);
  return div2;
}
__name(moveToWorker, "moveToWorker");
Object.assign(globalThis, { md5 });
var myApps = {};
var myAppCounters = {};
var controller;
onSessionUpdate(() => {
  if (controller)
    controller.abort("new i");
}, "abort");
var importIt = /* @__PURE__ */ __name(async (url) => {
  let waitingTime = 100;
  let App;
  const urlARR = url.split("/");
  const naked = +(urlARR.pop() || 0);
  const nUrl = urlARR.join("/");
  myAppCounters[nUrl] = myAppCounters[nUrl] || naked;
  while (true) {
    const betterNaked = naked < myAppCounters[nUrl] ? myAppCounters[nUrl] : naked;
    const url2 = [...urlARR, betterNaked].join("/");
    try {
      try {
        let controller2 = new AbortController();
        const signal = controller2.signal;
        let resp = await fetch(url2, { signal });
        if (resp.ok) {
          try {
            App = (await importShim(url2)).default;
            return { App, url: resp.url };
          } catch {
            const trp = await resp.text();
            try {
              App = (await import(createJsBlob(trp))).default;
            } catch {
              console.error("something went nuts");
              App = (await importShim(createJsBlob(trp))).default;
            }
            myApps[nUrl] = App;
            return { App, url: resp.url };
          }
        }
      } catch (err) {
        console.error({ err });
        console.error(
          err && err?.message || "error has been thrown"
        );
      }
    } catch {
      console.error("bad something happened;");
    } finally {
      await wait(waitingTime *= 2);
    }
  }
}, "importIt");
if (!Object.hasOwn(globalThis, "apps")) {
  Object.assign(globalThis, { apps: {}, eCaches: {} });
}
var { apps: apps2, eCaches: eCaches2 } = globalThis;
function AutoUpdateApp({ codeSpace: codeSpace2 }) {
  (0, import_react.useEffect)(() => {
    createIframe(codeSpace2, mST().i);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {});
}
__name(AutoUpdateApp, "AutoUpdateApp");
async function appFactory(transpiled = "") {
  const { transpiled: mstTranspiled, i: mstI } = mST();
  const trp = transpiled.length > 0 ? transpiled : mstTranspiled;
  const hash = md5(trp);
  if (!apps2[hash] || !eCaches2[hash]) {
    try {
      eCaches2[hash] = eCaches2[hash] || emotionCache_default({
        key: hash,
        speedy: false
      });
      eCaches2[hash].compat = void 0;
      console.log(`i: ${mstI}: `);
      let mod4;
      try {
        mod4 = await importShim(createJsBlob(trp));
      } catch {
        mod4 = new Function(trp + ` return ${trp.slice(2, 10)}`)();
      }
      const App = mod4.default;
      apps2[hash] = ({ appId }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { height: 100 + "%" }, id: appId, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.CacheProvider, { value: eCaches2[hash], children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(App, {}) }, hash) }, hash);
    } catch (error) {
      if (error instanceof SyntaxError) {
        const name = error.name;
        const message = error.message;
        apps2[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { css: import_react2.css`background-color: orange;`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "Syntax Error" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: hash }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", { children: [
            name,
            ": ",
            message
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: JSON.stringify({ err: error }) })
        ] });
      } else if (error instanceof Error) {
        const name = error.name;
        const message = error.message;
        apps2[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { css: import_react2.css`background-color: orange;`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { children: "Syntax Error" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h2", { children: [
            name,
            ": ",
            message
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: JSON.stringify({ err: error }) })
        ] });
      } else {
        apps2[hash] = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { css: import_react2.css`background-color: orange;`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h1", { children: [
          "Unknown Error: $",
          hash
        ] }) });
      }
    }
    if (transpiled !== "")
      return apps2[hash];
  }
  return apps2[hash];
}
__name(appFactory, "appFactory");
function createJsBlob(code, fileName = "index.mjs") {
  const file = new File([code], fileName, {
    type: "application/javascript",
    lastModified: Date.now()
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}
__name(createJsBlob, "createJsBlob");

export {
  wait,
  runner,
  createHTML,
  createIframe,
  runInWorker,
  importIt,
  apps2 as apps,
  eCaches2 as eCaches,
  AutoUpdateApp,
  appFactory,
  createJsBlob
};
