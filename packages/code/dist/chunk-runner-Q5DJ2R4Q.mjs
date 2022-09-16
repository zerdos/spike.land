import {
  saveCode
} from "./chunk-chunk-KFLXVM2W.mjs";
import {
  mST,
  patchSync
} from "./chunk-chunk-QQDDPDXJ.mjs";
import "./chunk-chunk-2XW4MZ4U.mjs";
import "./chunk-chunk-SEOII4AH.mjs";
import "./chunk-chunk-HV73MJXZ.mjs";
import {
  __commonJS,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-S6BTEEN4.mjs";

// node_modules/esbuild-wasm/lib/browser.js
var require_browser = __commonJS({
  "node_modules/esbuild-wasm/lib/browser.js"(exports, module) {
    init_define_process();
    ((module2) => {
      "use strict";
      var __defProp = Object.defineProperty;
      var __defProps = Object.defineProperties;
      var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
      var __getOwnPropNames = Object.getOwnPropertyNames;
      var __getOwnPropSymbols = Object.getOwnPropertySymbols;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __propIsEnum = Object.prototype.propertyIsEnumerable;
      var __defNormalProp = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
      var __spreadValues = /* @__PURE__ */ __name((a, b) => {
        for (var prop in b || (b = {}))
          if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        if (__getOwnPropSymbols)
          for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop))
              __defNormalProp(a, prop, b[prop]);
          }
        return a;
      }, "__spreadValues");
      var __spreadProps = /* @__PURE__ */ __name((a, b) => __defProps(a, __getOwnPropDescs(b)), "__spreadProps");
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
      var __toCommonJS = /* @__PURE__ */ __name((mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2), "__toCommonJS");
      var __async = /* @__PURE__ */ __name((__this, __arguments, generator) => {
        return new Promise((resolve, reject) => {
          var fulfilled = /* @__PURE__ */ __name((value) => {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }, "fulfilled");
          var rejected = /* @__PURE__ */ __name((value) => {
            try {
              step(generator.throw(value));
            } catch (e) {
              reject(e);
            }
          }, "rejected");
          var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
          step((generator = generator.apply(__this, __arguments)).next());
        });
      }, "__async");
      var browser_exports = {};
      __export(browser_exports, {
        analyzeMetafile: () => analyzeMetafile,
        analyzeMetafileSync: () => analyzeMetafileSync,
        build: () => build,
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
              for (let i = 0; i < count; i++) {
                value2.push(visit());
              }
              return value2;
            }
            case 6: {
              let count = bb.read32();
              let value2 = {};
              for (let i = 0; i < count; i++) {
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
        let worker = getFlag(options, keys, "worker", mustBeBoolean);
        checkForInvalidFlags(options, keys, "in initialize() call");
        return {
          wasmURL,
          wasmModule,
          worker
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
        let jsx = getFlag(options, keys, "jsx", mustBeString);
        let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
        let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
        let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
        let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
        let define = getFlag(options, keys, "define", mustBeObject);
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
        if (jsx)
          flags.push(`--jsx=${jsx}`);
        if (jsxFactory)
          flags.push(`--jsx-factory=${jsxFactory}`);
        if (jsxFragment)
          flags.push(`--jsx-fragment=${jsxFragment}`);
        if (jsxImportSource)
          flags.push(`--jsx-import-source=${jsxImportSource}`);
        if (jsxDev)
          flags.push(`--jsx-dev`);
        if (define) {
          for (let key in define) {
            if (key.indexOf("=") >= 0)
              throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${define[key]}`);
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
        let responseCallbacks = /* @__PURE__ */ new Map();
        let pluginCallbacks = /* @__PURE__ */ new Map();
        let watchCallbacks = /* @__PURE__ */ new Map();
        let serveCallbacks = /* @__PURE__ */ new Map();
        let closeData = null;
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
          closeData = { reason: error ? ": " + (error.message || error) : "" };
          const text = "The service was stopped" + closeData.reason;
          for (let callback of responseCallbacks.values()) {
            callback(text, null);
          }
          responseCallbacks.clear();
          for (let callbacks of serveCallbacks.values()) {
            callbacks.onWait(text);
          }
          serveCallbacks.clear();
          for (let callback of watchCallbacks.values()) {
            try {
              callback(new Error(text), null);
            } catch (e) {
              console.error(e);
            }
          }
          watchCallbacks.clear();
        }, "afterClose");
        let sendRequest = /* @__PURE__ */ __name((refs, value, callback) => {
          if (closeData)
            return callback("The service is no longer running" + closeData.reason, null);
          let id = nextRequestID++;
          responseCallbacks.set(id, (error, response) => {
            try {
              callback(error, response);
            } finally {
              if (refs)
                refs.unref();
            }
          });
          if (refs)
            refs.ref();
          streamIn.writeToStdin(encodePacket({ id, isRequest: true, value }));
        }, "sendRequest");
        let sendResponse = /* @__PURE__ */ __name((id, value) => {
          if (closeData)
            throw new Error("The service is no longer running" + closeData.reason);
          streamIn.writeToStdin(encodePacket({ id, isRequest: false, value }));
        }, "sendResponse");
        let handleRequest = /* @__PURE__ */ __name((id, request) => __async(this, null, function* () {
          try {
            switch (request.command) {
              case "ping": {
                sendResponse(id, {});
                break;
              }
              case "on-start": {
                let callback = pluginCallbacks.get(request.key);
                if (!callback)
                  sendResponse(id, {});
                else
                  sendResponse(id, yield callback(request));
                break;
              }
              case "on-resolve": {
                let callback = pluginCallbacks.get(request.key);
                if (!callback)
                  sendResponse(id, {});
                else
                  sendResponse(id, yield callback(request));
                break;
              }
              case "on-load": {
                let callback = pluginCallbacks.get(request.key);
                if (!callback)
                  sendResponse(id, {});
                else
                  sendResponse(id, yield callback(request));
                break;
              }
              case "serve-request": {
                let callbacks = serveCallbacks.get(request.key);
                if (callbacks && callbacks.onRequest)
                  callbacks.onRequest(request.args);
                sendResponse(id, {});
                break;
              }
              case "serve-wait": {
                let callbacks = serveCallbacks.get(request.key);
                if (callbacks)
                  callbacks.onWait(request.error);
                sendResponse(id, {});
                break;
              }
              case "watch-rebuild": {
                let callback = watchCallbacks.get(request.key);
                try {
                  if (callback)
                    callback(null, request.args);
                } catch (err) {
                  console.error(err);
                }
                sendResponse(id, {});
                break;
              }
              default:
                throw new Error(`Invalid command: ` + request.command);
            }
          } catch (e) {
            sendResponse(id, { errors: [extractErrorMessageV8(e, streamIn, null, void 0, "")] });
          }
        }), "handleRequest");
        let isFirstPacket = true;
        let handleIncomingPacket = /* @__PURE__ */ __name((bytes) => {
          if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== "0.15.7") {
              throw new Error(`Cannot start service: Host version "${"0.15.7"}" does not match binary version ${JSON.stringify(binaryVersion)}`);
            }
            return;
          }
          let packet = decodePacket(bytes);
          if (packet.isRequest) {
            handleRequest(packet.id, packet.value);
          } else {
            let callback = responseCallbacks.get(packet.id);
            responseCallbacks.delete(packet.id);
            if (packet.value.error)
              callback(packet.value.error, {});
            else
              callback(null, packet.value);
          }
        }, "handleIncomingPacket");
        let handlePlugins = /* @__PURE__ */ __name((initialOptions, plugins, buildKey, stash, refs) => __async(this, null, function* () {
          let onStartCallbacks = [];
          let onEndCallbacks = [];
          let onResolveCallbacks = {};
          let onLoadCallbacks = {};
          let nextCallbackID = 0;
          let i = 0;
          let requestPlugins = [];
          let isSetupDone = false;
          plugins = [...plugins];
          for (let item of plugins) {
            let keys = {};
            if (typeof item !== "object")
              throw new Error(`Plugin at index ${i} must be an object`);
            const name = getFlag(item, keys, "name", mustBeString);
            if (typeof name !== "string" || name === "")
              throw new Error(`Plugin at index ${i} is missing a name`);
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
              i++;
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
                    request.pluginData = stash.store(pluginData);
                  sendRequest(refs, request, (error, response) => {
                    if (error !== null)
                      reject(new Error(error));
                    else
                      resolve2({
                        errors: replaceDetailsInMessages(response.errors, stash),
                        warnings: replaceDetailsInMessages(response.warnings, stash),
                        path: response.path,
                        external: response.external,
                        sideEffects: response.sideEffects,
                        namespace: response.namespace,
                        suffix: response.suffix,
                        pluginData: stash.load(response.pluginData)
                      });
                  });
                });
              }, "resolve");
              let promise = setup({
                initialOptions,
                resolve,
                onStart(callback2) {
                  let registeredText = `This error came from the "onStart" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                  onStartCallbacks.push({ name, callback: callback2, note: registeredNote });
                },
                onEnd(callback2) {
                  let registeredText = `This error came from the "onEnd" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                  onEndCallbacks.push({ name, callback: callback2, note: registeredNote });
                },
                onResolve(options, callback2) {
                  let registeredText = `This error came from the "onResolve" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                  let keys2 = {};
                  let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                  let namespace = getFlag(options, keys2, "namespace", mustBeString);
                  checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${JSON.stringify(name)}`);
                  if (filter == null)
                    throw new Error(`onResolve() call is missing a filter`);
                  let id = nextCallbackID++;
                  onResolveCallbacks[id] = { name, callback: callback2, note: registeredNote };
                  plugin.onResolve.push({ id, filter: filter.source, namespace: namespace || "" });
                },
                onLoad(options, callback2) {
                  let registeredText = `This error came from the "onLoad" callback registered here:`;
                  let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                  let keys2 = {};
                  let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                  let namespace = getFlag(options, keys2, "namespace", mustBeString);
                  checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${JSON.stringify(name)}`);
                  if (filter == null)
                    throw new Error(`onLoad() call is missing a filter`);
                  let id = nextCallbackID++;
                  onLoadCallbacks[id] = { name, callback: callback2, note: registeredNote };
                  plugin.onLoad.push({ id, filter: filter.source, namespace: namespace || "" });
                },
                esbuild: streamIn.esbuild
              });
              if (promise)
                yield promise;
              requestPlugins.push(plugin);
            } catch (e) {
              return { ok: false, error: e, pluginName: name };
            }
          }
          const callback = /* @__PURE__ */ __name((request) => __async(this, null, function* () {
            switch (request.command) {
              case "on-start": {
                let response = { errors: [], warnings: [] };
                yield Promise.all(onStartCallbacks.map((_0) => __async(this, [_0], function* ({ name, callback: callback2, note }) {
                  try {
                    let result = yield callback2();
                    if (result != null) {
                      if (typeof result !== "object")
                        throw new Error(`Expected onStart() callback in plugin ${JSON.stringify(name)} to return an object`);
                      let keys = {};
                      let errors = getFlag(result, keys, "errors", mustBeArray);
                      let warnings = getFlag(result, keys, "warnings", mustBeArray);
                      checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${JSON.stringify(name)}`);
                      if (errors != null)
                        response.errors.push(...sanitizeMessages(errors, "errors", stash, name));
                      if (warnings != null)
                        response.warnings.push(...sanitizeMessages(warnings, "warnings", stash, name));
                    }
                  } catch (e) {
                    response.errors.push(extractErrorMessageV8(e, streamIn, stash, note && note(), name));
                  }
                })));
                return response;
              }
              case "on-resolve": {
                let response = {}, name = "", callback2, note;
                for (let id of request.ids) {
                  try {
                    ({ name, callback: callback2, note } = onResolveCallbacks[id]);
                    let result = yield callback2({
                      path: request.path,
                      importer: request.importer,
                      namespace: request.namespace,
                      resolveDir: request.resolveDir,
                      kind: request.kind,
                      pluginData: stash.load(request.pluginData)
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
                      response.id = id;
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
                        response.pluginData = stash.store(pluginData);
                      if (errors != null)
                        response.errors = sanitizeMessages(errors, "errors", stash, name);
                      if (warnings != null)
                        response.warnings = sanitizeMessages(warnings, "warnings", stash, name);
                      if (watchFiles != null)
                        response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                      if (watchDirs != null)
                        response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                      break;
                    }
                  } catch (e) {
                    return { id, errors: [extractErrorMessageV8(e, streamIn, stash, note && note(), name)] };
                  }
                }
                return response;
              }
              case "on-load": {
                let response = {}, name = "", callback2, note;
                for (let id of request.ids) {
                  try {
                    ({ name, callback: callback2, note } = onLoadCallbacks[id]);
                    let result = yield callback2({
                      path: request.path,
                      namespace: request.namespace,
                      suffix: request.suffix,
                      pluginData: stash.load(request.pluginData)
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
                      response.id = id;
                      if (pluginName != null)
                        response.pluginName = pluginName;
                      if (contents instanceof Uint8Array)
                        response.contents = contents;
                      else if (contents != null)
                        response.contents = encodeUTF8(contents);
                      if (resolveDir != null)
                        response.resolveDir = resolveDir;
                      if (pluginData != null)
                        response.pluginData = stash.store(pluginData);
                      if (loader != null)
                        response.loader = loader;
                      if (errors != null)
                        response.errors = sanitizeMessages(errors, "errors", stash, name);
                      if (warnings != null)
                        response.warnings = sanitizeMessages(warnings, "warnings", stash, name);
                      if (watchFiles != null)
                        response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                      if (watchDirs != null)
                        response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                      break;
                    }
                  } catch (e) {
                    return { id, errors: [extractErrorMessageV8(e, streamIn, stash, note && note(), name)] };
                  }
                }
                return response;
              }
              default:
                throw new Error(`Invalid command: ` + request.command);
            }
          }), "callback");
          let runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => done(), "runOnEndCallbacks");
          if (onEndCallbacks.length > 0) {
            runOnEndCallbacks = /* @__PURE__ */ __name((result, logPluginError, done) => {
              (() => __async(this, null, function* () {
                for (const { name, callback: callback2, note } of onEndCallbacks) {
                  try {
                    yield callback2(result);
                  } catch (e) {
                    result.errors.push(yield new Promise((resolve) => logPluginError(e, name, note && note(), resolve)));
                  }
                }
              }))().then(done);
            }, "runOnEndCallbacks");
          }
          isSetupDone = true;
          let refCount = 0;
          return {
            ok: true,
            requestPlugins,
            runOnEndCallbacks,
            pluginRefs: {
              ref() {
                if (++refCount === 1)
                  pluginCallbacks.set(buildKey, callback);
              },
              unref() {
                if (--refCount === 0)
                  pluginCallbacks.delete(buildKey);
              }
            }
          };
        }), "handlePlugins");
        let buildServeData = /* @__PURE__ */ __name((refs, options, request, key) => {
          let keys = {};
          let port = getFlag(options, keys, "port", mustBeInteger);
          let host = getFlag(options, keys, "host", mustBeString);
          let servedir = getFlag(options, keys, "servedir", mustBeString);
          let onRequest = getFlag(options, keys, "onRequest", mustBeFunction);
          let onWait;
          let wait = new Promise((resolve, reject) => {
            onWait = /* @__PURE__ */ __name((error) => {
              serveCallbacks.delete(key);
              if (error !== null)
                reject(new Error(error));
              else
                resolve();
            }, "onWait");
          });
          request.serve = {};
          checkForInvalidFlags(options, keys, `in serve() call`);
          if (port !== void 0)
            request.serve.port = port;
          if (host !== void 0)
            request.serve.host = host;
          if (servedir !== void 0)
            request.serve.servedir = servedir;
          serveCallbacks.set(key, {
            onRequest,
            onWait
          });
          return {
            wait,
            stop() {
              sendRequest(refs, { command: "serve-stop", key }, () => {
              });
            }
          };
        }, "buildServeData");
        const buildLogLevelDefault = "warning";
        const transformLogLevelDefault = "silent";
        let buildOrServe = /* @__PURE__ */ __name((args) => {
          let key = nextBuildKey++;
          const details = createObjectStash();
          let plugins;
          let { refs, options, isTTY, callback } = args;
          if (typeof options === "object") {
            let value = options.plugins;
            if (value !== void 0) {
              if (!Array.isArray(value))
                throw new Error(`"plugins" must be an array`);
              plugins = value;
            }
          }
          let logPluginError = /* @__PURE__ */ __name((e, pluginName, note, done) => {
            let flags = [];
            try {
              pushLogFlags(flags, options, {}, isTTY, buildLogLevelDefault);
            } catch (e2) {
            }
            const message = extractErrorMessageV8(e, streamIn, details, note, pluginName);
            sendRequest(refs, { command: "error", flags, error: message }, () => {
              message.detail = details.load(message.detail);
              done(message);
            });
          }, "logPluginError");
          let handleError = /* @__PURE__ */ __name((e, pluginName) => {
            logPluginError(e, pluginName, void 0, (error) => {
              callback(failureErrorWithLog("Build failed", [error], []), null);
            });
          }, "handleError");
          if (plugins && plugins.length > 0) {
            if (streamIn.isSync)
              return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
            handlePlugins(options, plugins, key, details, refs).then(
              (result) => {
                if (!result.ok) {
                  handleError(result.error, result.pluginName);
                } else {
                  try {
                    buildOrServeContinue(__spreadProps(__spreadValues({}, args), {
                      key,
                      details,
                      logPluginError,
                      requestPlugins: result.requestPlugins,
                      runOnEndCallbacks: result.runOnEndCallbacks,
                      pluginRefs: result.pluginRefs
                    }));
                  } catch (e) {
                    handleError(e, "");
                  }
                }
              },
              (e) => handleError(e, "")
            );
          } else {
            try {
              buildOrServeContinue(__spreadProps(__spreadValues({}, args), {
                key,
                details,
                logPluginError,
                requestPlugins: null,
                runOnEndCallbacks: (result, logPluginError2, done) => done(),
                pluginRefs: null
              }));
            } catch (e) {
              handleError(e, "");
            }
          }
        }, "buildOrServe");
        let buildOrServeContinue = /* @__PURE__ */ __name(({
          callName,
          refs: callerRefs,
          serveOptions,
          options,
          isTTY,
          defaultWD,
          callback,
          key,
          details,
          logPluginError,
          requestPlugins,
          runOnEndCallbacks,
          pluginRefs
        }) => {
          const refs = {
            ref() {
              if (pluginRefs)
                pluginRefs.ref();
              if (callerRefs)
                callerRefs.ref();
            },
            unref() {
              if (pluginRefs)
                pluginRefs.unref();
              if (callerRefs)
                callerRefs.unref();
            }
          };
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
            key,
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
          let serve2 = serveOptions && buildServeData(refs, serveOptions, request, key);
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
                    if (isDisposed || closeData)
                      throw new Error("Cannot rebuild");
                    sendRequest(
                      refs,
                      { command: "rebuild", key },
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
                    sendRequest(refs, { command: "rebuild-dispose", key }, () => {
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
                    watchCallbacks.delete(key);
                    sendRequest(refs, { command: "watch-stop", key }, () => {
                    });
                    refs.unref();
                  }, "stop");
                  if (watch) {
                    watchCallbacks.set(key, (serviceStopError, watchResponse) => {
                      if (serviceStopError) {
                        if (watch.onRebuild)
                          watch.onRebuild(serviceStopError, null);
                        return;
                      }
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
                        if (watchResponse.rebuildID !== void 0)
                          result2.rebuild = rebuild;
                        result2.stop = stop;
                        if (watch.onRebuild)
                          watch.onRebuild(null, result2);
                      });
                    });
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
        }, "buildOrServeContinue");
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
            } catch (e) {
              let flags = [];
              try {
                pushLogFlags(flags, options, {}, isTTY, transformLogLevelDefault);
              } catch (e2) {
              }
              const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
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
      function extractCallerV8(e, streamIn, ident) {
        let note;
        let tried = false;
        return () => {
          if (tried)
            return note;
          tried = true;
          try {
            let lines = (e.stack + "").split("\n");
            lines.splice(1, 1);
            let location2 = parseStackLinesV8(streamIn, lines, ident);
            if (location2) {
              note = { text: e.message, location: location2 };
              return note;
            }
          } catch (e2) {
          }
        };
      }
      __name(extractCallerV8, "extractCallerV8");
      function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
        let text = "Internal error";
        let location2 = null;
        try {
          text = (e && e.message || e) + "";
        } catch (e2) {
        }
        try {
          location2 = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
        } catch (e2) {
        }
        return { id: "", pluginName, text, location: location2, notes: note ? [note] : [], detail: stash ? stash.store(e) : -1 };
      }
      __name(extractErrorMessageV8, "extractErrorMessageV8");
      function parseStackLinesV8(streamIn, lines, ident) {
        let at = "    at ";
        if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
          for (let i = 1; i < lines.length; i++) {
            let line = lines[i];
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
                } catch (e) {
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
        let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
          if (i === limit)
            return "\n...";
          if (!e.location)
            return `
error: ${e.text}`;
          let { file, line, column } = e.location;
          let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
          return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
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
      var version = "0.15.7";
      var build = /* @__PURE__ */ __name((options) => ensureServiceIsRunning().build(options), "build");
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
        let worker;
        if (useWorker) {
          let blob = new Blob([`onmessage=${'((postMessage) => {\n      // Copyright 2018 The Go Authors. All rights reserved.\n      // Use of this source code is governed by a BSD-style\n      // license that can be found in the LICENSE file.\n      var __async = (__this, __arguments, generator) => {\n        return new Promise((resolve, reject) => {\n          var fulfilled = (value) => {\n            try {\n              step(generator.next(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var rejected = (value) => {\n            try {\n              step(generator.throw(value));\n            } catch (e) {\n              reject(e);\n            }\n          };\n          var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);\n          step((generator = generator.apply(__this, __arguments)).next());\n        });\n      };\n      let onmessage;\n      let globalThis = {};\n      for (let o = self; o; o = Object.getPrototypeOf(o))\n        for (let k of Object.getOwnPropertyNames(o))\n          if (!(k in globalThis))\n            Object.defineProperty(globalThis, k, { get: () => self[k] });\n      "use strict";\n      (() => {\n        const enosys = () => {\n          const err = new Error("not implemented");\n          err.code = "ENOSYS";\n          return err;\n        };\n        if (!globalThis.fs) {\n          let outputBuf = "";\n          globalThis.fs = {\n            constants: { O_WRONLY: -1, O_RDWR: -1, O_CREAT: -1, O_TRUNC: -1, O_APPEND: -1, O_EXCL: -1 },\n            writeSync(fd, buf) {\n              outputBuf += decoder.decode(buf);\n              const nl = outputBuf.lastIndexOf("\\n");\n              if (nl != -1) {\n                console.log(outputBuf.substr(0, nl));\n                outputBuf = outputBuf.substr(nl + 1);\n              }\n              return buf.length;\n            },\n            write(fd, buf, offset, length, position, callback) {\n              if (offset !== 0 || length !== buf.length || position !== null) {\n                callback(enosys());\n                return;\n              }\n              const n = this.writeSync(fd, buf);\n              callback(null, n);\n            },\n            chmod(path, mode, callback) {\n              callback(enosys());\n            },\n            chown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            close(fd, callback) {\n              callback(enosys());\n            },\n            fchmod(fd, mode, callback) {\n              callback(enosys());\n            },\n            fchown(fd, uid, gid, callback) {\n              callback(enosys());\n            },\n            fstat(fd, callback) {\n              callback(enosys());\n            },\n            fsync(fd, callback) {\n              callback(null);\n            },\n            ftruncate(fd, length, callback) {\n              callback(enosys());\n            },\n            lchown(path, uid, gid, callback) {\n              callback(enosys());\n            },\n            link(path, link, callback) {\n              callback(enosys());\n            },\n            lstat(path, callback) {\n              callback(enosys());\n            },\n            mkdir(path, perm, callback) {\n              callback(enosys());\n            },\n            open(path, flags, mode, callback) {\n              callback(enosys());\n            },\n            read(fd, buffer, offset, length, position, callback) {\n              callback(enosys());\n            },\n            readdir(path, callback) {\n              callback(enosys());\n            },\n            readlink(path, callback) {\n              callback(enosys());\n            },\n            rename(from, to, callback) {\n              callback(enosys());\n            },\n            rmdir(path, callback) {\n              callback(enosys());\n            },\n            stat(path, callback) {\n              callback(enosys());\n            },\n            symlink(path, link, callback) {\n              callback(enosys());\n            },\n            truncate(path, length, callback) {\n              callback(enosys());\n            },\n            unlink(path, callback) {\n              callback(enosys());\n            },\n            utimes(path, atime, mtime, callback) {\n              callback(enosys());\n            }\n          };\n        }\n        if (!globalThis.process) {\n          globalThis.process = {\n            getuid() {\n              return -1;\n            },\n            getgid() {\n              return -1;\n            },\n            geteuid() {\n              return -1;\n            },\n            getegid() {\n              return -1;\n            },\n            getgroups() {\n              throw enosys();\n            },\n            pid: -1,\n            ppid: -1,\n            umask() {\n              throw enosys();\n            },\n            cwd() {\n              throw enosys();\n            },\n            chdir() {\n              throw enosys();\n            }\n          };\n        }\n        if (!globalThis.crypto) {\n          throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");\n        }\n        if (!globalThis.performance) {\n          throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");\n        }\n        if (!globalThis.TextEncoder) {\n          throw new Error("globalThis.TextEncoder is not available, polyfill required");\n        }\n        if (!globalThis.TextDecoder) {\n          throw new Error("globalThis.TextDecoder is not available, polyfill required");\n        }\n        const encoder = new TextEncoder("utf-8");\n        const decoder = new TextDecoder("utf-8");\n        globalThis.Go = class {\n          constructor() {\n            this.argv = ["js"];\n            this.env = {};\n            this.exit = (code) => {\n              if (code !== 0) {\n                console.warn("exit code:", code);\n              }\n            };\n            this._exitPromise = new Promise((resolve) => {\n              this._resolveExitPromise = resolve;\n            });\n            this._pendingEvent = null;\n            this._scheduledTimeouts = /* @__PURE__ */ new Map();\n            this._nextCallbackTimeoutID = 1;\n            const setInt64 = (addr, v) => {\n              this.mem.setUint32(addr + 0, v, true);\n              this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);\n            };\n            const getInt64 = (addr) => {\n              const low = this.mem.getUint32(addr + 0, true);\n              const high = this.mem.getInt32(addr + 4, true);\n              return low + high * 4294967296;\n            };\n            const loadValue = (addr) => {\n              const f = this.mem.getFloat64(addr, true);\n              if (f === 0) {\n                return void 0;\n              }\n              if (!isNaN(f)) {\n                return f;\n              }\n              const id = this.mem.getUint32(addr, true);\n              return this._values[id];\n            };\n            const storeValue = (addr, v) => {\n              const nanHead = 2146959360;\n              if (typeof v === "number" && v !== 0) {\n                if (isNaN(v)) {\n                  this.mem.setUint32(addr + 4, nanHead, true);\n                  this.mem.setUint32(addr, 0, true);\n                  return;\n                }\n                this.mem.setFloat64(addr, v, true);\n                return;\n              }\n              if (v === void 0) {\n                this.mem.setFloat64(addr, 0, true);\n                return;\n              }\n              let id = this._ids.get(v);\n              if (id === void 0) {\n                id = this._idPool.pop();\n                if (id === void 0) {\n                  id = this._values.length;\n                }\n                this._values[id] = v;\n                this._goRefCounts[id] = 0;\n                this._ids.set(v, id);\n              }\n              this._goRefCounts[id]++;\n              let typeFlag = 0;\n              switch (typeof v) {\n                case "object":\n                  if (v !== null) {\n                    typeFlag = 1;\n                  }\n                  break;\n                case "string":\n                  typeFlag = 2;\n                  break;\n                case "symbol":\n                  typeFlag = 3;\n                  break;\n                case "function":\n                  typeFlag = 4;\n                  break;\n              }\n              this.mem.setUint32(addr + 4, nanHead | typeFlag, true);\n              this.mem.setUint32(addr, id, true);\n            };\n            const loadSlice = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return new Uint8Array(this._inst.exports.mem.buffer, array, len);\n            };\n            const loadSliceOfValues = (addr) => {\n              const array = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              const a = new Array(len);\n              for (let i = 0; i < len; i++) {\n                a[i] = loadValue(array + i * 8);\n              }\n              return a;\n            };\n            const loadString = (addr) => {\n              const saddr = getInt64(addr + 0);\n              const len = getInt64(addr + 8);\n              return decoder.decode(new DataView(this._inst.exports.mem.buffer, saddr, len));\n            };\n            const timeOrigin = Date.now() - performance.now();\n            this.importObject = {\n              go: {\n                "runtime.wasmExit": (sp) => {\n                  sp >>>= 0;\n                  const code = this.mem.getInt32(sp + 8, true);\n                  this.exited = true;\n                  delete this._inst;\n                  delete this._values;\n                  delete this._goRefCounts;\n                  delete this._ids;\n                  delete this._idPool;\n                  this.exit(code);\n                },\n                "runtime.wasmWrite": (sp) => {\n                  sp >>>= 0;\n                  const fd = getInt64(sp + 8);\n                  const p = getInt64(sp + 16);\n                  const n = this.mem.getInt32(sp + 24, true);\n                  globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));\n                },\n                "runtime.resetMemoryDataView": (sp) => {\n                  sp >>>= 0;\n                  this.mem = new DataView(this._inst.exports.mem.buffer);\n                },\n                "runtime.nanotime1": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 8, (timeOrigin + performance.now()) * 1e6);\n                },\n                "runtime.walltime": (sp) => {\n                  sp >>>= 0;\n                  const msec = new Date().getTime();\n                  setInt64(sp + 8, msec / 1e3);\n                  this.mem.setInt32(sp + 16, msec % 1e3 * 1e6, true);\n                },\n                "runtime.scheduleTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this._nextCallbackTimeoutID;\n                  this._nextCallbackTimeoutID++;\n                  this._scheduledTimeouts.set(id, setTimeout(\n                    () => {\n                      this._resume();\n                      while (this._scheduledTimeouts.has(id)) {\n                        console.warn("scheduleTimeoutEvent: missed timeout event");\n                        this._resume();\n                      }\n                    },\n                    getInt64(sp + 8) + 1\n                  ));\n                  this.mem.setInt32(sp + 16, id, true);\n                },\n                "runtime.clearTimeoutEvent": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getInt32(sp + 8, true);\n                  clearTimeout(this._scheduledTimeouts.get(id));\n                  this._scheduledTimeouts.delete(id);\n                },\n                "runtime.getRandomData": (sp) => {\n                  sp >>>= 0;\n                  crypto.getRandomValues(loadSlice(sp + 8));\n                },\n                "syscall/js.finalizeRef": (sp) => {\n                  sp >>>= 0;\n                  const id = this.mem.getUint32(sp + 8, true);\n                  this._goRefCounts[id]--;\n                  if (this._goRefCounts[id] === 0) {\n                    const v = this._values[id];\n                    this._values[id] = null;\n                    this._ids.delete(v);\n                    this._idPool.push(id);\n                  }\n                },\n                "syscall/js.stringVal": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, loadString(sp + 8));\n                },\n                "syscall/js.valueGet": (sp) => {\n                  sp >>>= 0;\n                  const result = Reflect.get(loadValue(sp + 8), loadString(sp + 16));\n                  sp = this._inst.exports.getsp() >>> 0;\n                  storeValue(sp + 32, result);\n                },\n                "syscall/js.valueSet": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), loadString(sp + 16), loadValue(sp + 32));\n                },\n                "syscall/js.valueDelete": (sp) => {\n                  sp >>>= 0;\n                  Reflect.deleteProperty(loadValue(sp + 8), loadString(sp + 16));\n                },\n                "syscall/js.valueIndex": (sp) => {\n                  sp >>>= 0;\n                  storeValue(sp + 24, Reflect.get(loadValue(sp + 8), getInt64(sp + 16)));\n                },\n                "syscall/js.valueSetIndex": (sp) => {\n                  sp >>>= 0;\n                  Reflect.set(loadValue(sp + 8), getInt64(sp + 16), loadValue(sp + 24));\n                },\n                "syscall/js.valueCall": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const m = Reflect.get(v, loadString(sp + 16));\n                    const args = loadSliceOfValues(sp + 32);\n                    const result = Reflect.apply(m, v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, result);\n                    this.mem.setUint8(sp + 64, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 56, err);\n                    this.mem.setUint8(sp + 64, 0);\n                  }\n                },\n                "syscall/js.valueInvoke": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.apply(v, void 0, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueNew": (sp) => {\n                  sp >>>= 0;\n                  try {\n                    const v = loadValue(sp + 8);\n                    const args = loadSliceOfValues(sp + 16);\n                    const result = Reflect.construct(v, args);\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, result);\n                    this.mem.setUint8(sp + 48, 1);\n                  } catch (err) {\n                    sp = this._inst.exports.getsp() >>> 0;\n                    storeValue(sp + 40, err);\n                    this.mem.setUint8(sp + 48, 0);\n                  }\n                },\n                "syscall/js.valueLength": (sp) => {\n                  sp >>>= 0;\n                  setInt64(sp + 16, parseInt(loadValue(sp + 8).length));\n                },\n                "syscall/js.valuePrepareString": (sp) => {\n                  sp >>>= 0;\n                  const str = encoder.encode(String(loadValue(sp + 8)));\n                  storeValue(sp + 16, str);\n                  setInt64(sp + 24, str.length);\n                },\n                "syscall/js.valueLoadString": (sp) => {\n                  sp >>>= 0;\n                  const str = loadValue(sp + 8);\n                  loadSlice(sp + 16).set(str);\n                },\n                "syscall/js.valueInstanceOf": (sp) => {\n                  sp >>>= 0;\n                  this.mem.setUint8(sp + 24, loadValue(sp + 8) instanceof loadValue(sp + 16) ? 1 : 0);\n                },\n                "syscall/js.copyBytesToGo": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadSlice(sp + 8);\n                  const src = loadValue(sp + 32);\n                  if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "syscall/js.copyBytesToJS": (sp) => {\n                  sp >>>= 0;\n                  const dst = loadValue(sp + 8);\n                  const src = loadSlice(sp + 16);\n                  if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) {\n                    this.mem.setUint8(sp + 48, 0);\n                    return;\n                  }\n                  const toCopy = src.subarray(0, dst.length);\n                  dst.set(toCopy);\n                  setInt64(sp + 40, toCopy.length);\n                  this.mem.setUint8(sp + 48, 1);\n                },\n                "debug": (value) => {\n                  console.log(value);\n                }\n              }\n            };\n          }\n          run(instance) {\n            return __async(this, null, function* () {\n              if (!(instance instanceof WebAssembly.Instance)) {\n                throw new Error("Go.run: WebAssembly.Instance expected");\n              }\n              this._inst = instance;\n              this.mem = new DataView(this._inst.exports.mem.buffer);\n              this._values = [\n                NaN,\n                0,\n                null,\n                true,\n                false,\n                globalThis,\n                this\n              ];\n              this._goRefCounts = new Array(this._values.length).fill(Infinity);\n              this._ids = /* @__PURE__ */ new Map([\n                [0, 1],\n                [null, 2],\n                [true, 3],\n                [false, 4],\n                [globalThis, 5],\n                [this, 6]\n              ]);\n              this._idPool = [];\n              this.exited = false;\n              let offset = 4096;\n              const strPtr = (str) => {\n                const ptr = offset;\n                const bytes = encoder.encode(str + "\\0");\n                new Uint8Array(this.mem.buffer, offset, bytes.length).set(bytes);\n                offset += bytes.length;\n                if (offset % 8 !== 0) {\n                  offset += 8 - offset % 8;\n                }\n                return ptr;\n              };\n              const argc = this.argv.length;\n              const argvPtrs = [];\n              this.argv.forEach((arg) => {\n                argvPtrs.push(strPtr(arg));\n              });\n              argvPtrs.push(0);\n              const keys = Object.keys(this.env).sort();\n              keys.forEach((key) => {\n                argvPtrs.push(strPtr(`${key}=${this.env[key]}`));\n              });\n              argvPtrs.push(0);\n              const argv = offset;\n              argvPtrs.forEach((ptr) => {\n                this.mem.setUint32(offset, ptr, true);\n                this.mem.setUint32(offset + 4, 0, true);\n                offset += 8;\n              });\n              const wasmMinDataAddr = 4096 + 8192;\n              if (offset >= wasmMinDataAddr) {\n                throw new Error("total length of command line and environment variables exceeds limit");\n              }\n              this._inst.exports.run(argc, argv);\n              if (this.exited) {\n                this._resolveExitPromise();\n              }\n              yield this._exitPromise;\n            });\n          }\n          _resume() {\n            if (this.exited) {\n              throw new Error("Go program has already exited");\n            }\n            this._inst.exports.resume();\n            if (this.exited) {\n              this._resolveExitPromise();\n            }\n          }\n          _makeFuncWrapper(id) {\n            const go = this;\n            return function() {\n              const event = { id, this: this, args: arguments };\n              go._pendingEvent = event;\n              go._resume();\n              return event.result;\n            };\n          }\n        };\n      })();\n      onmessage = ({ data: wasm }) => {\n        let decoder = new TextDecoder();\n        let fs = globalThis.fs;\n        let stderr = "";\n        fs.writeSync = (fd, buffer) => {\n          if (fd === 1) {\n            postMessage(buffer);\n          } else if (fd === 2) {\n            stderr += decoder.decode(buffer);\n            let parts = stderr.split("\\n");\n            if (parts.length > 1)\n              console.log(parts.slice(0, -1).join("\\n"));\n            stderr = parts[parts.length - 1];\n          } else {\n            throw new Error("Bad write");\n          }\n          return buffer.length;\n        };\n        let stdin = [];\n        let resumeStdin;\n        let stdinPos = 0;\n        onmessage = ({ data }) => {\n          if (data.length > 0) {\n            stdin.push(data);\n            if (resumeStdin)\n              resumeStdin();\n          }\n        };\n        fs.read = (fd, buffer, offset, length, position, callback) => {\n          if (fd !== 0 || offset !== 0 || length !== buffer.length || position !== null) {\n            throw new Error("Bad read");\n          }\n          if (stdin.length === 0) {\n            resumeStdin = () => fs.read(fd, buffer, offset, length, position, callback);\n            return;\n          }\n          let first = stdin[0];\n          let count = Math.max(0, Math.min(length, first.length - stdinPos));\n          buffer.set(first.subarray(stdinPos, stdinPos + count), offset);\n          stdinPos += count;\n          if (stdinPos === first.length) {\n            stdin.shift();\n            stdinPos = 0;\n          }\n          callback(null, count);\n        };\n        let go = new globalThis.Go();\n        go.argv = ["", `--service=${"0.15.7"}`];\n        if (wasm instanceof WebAssembly.Module) {\n          WebAssembly.instantiate(wasm, go.importObject).then((instance) => go.run(instance));\n        } else {\n          WebAssembly.instantiate(wasm, go.importObject).then(({ instance }) => go.run(instance));\n        }\n      };\n      return (m) => onmessage(m);\n    })'}(postMessage)`], { type: "text/javascript" });
          worker = new Worker(URL.createObjectURL(blob));
        } else {
          let onmessage = ((postMessage) => {
            var __async2 = /* @__PURE__ */ __name((__this, __arguments, generator) => {
              return new Promise((resolve, reject) => {
                var fulfilled = /* @__PURE__ */ __name((value) => {
                  try {
                    step(generator.next(value));
                  } catch (e) {
                    reject(e);
                  }
                }, "fulfilled");
                var rejected = /* @__PURE__ */ __name((value) => {
                  try {
                    step(generator.throw(value));
                  } catch (e) {
                    reject(e);
                  }
                }, "rejected");
                var step = /* @__PURE__ */ __name((x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected), "step");
                step((generator = generator.apply(__this, __arguments)).next());
              });
            }, "__async");
            let onmessage2;
            let globalThis = {};
            for (let o = self; o; o = Object.getPrototypeOf(o))
              for (let k of Object.getOwnPropertyNames(o))
                if (!(k in globalThis))
                  Object.defineProperty(globalThis, k, { get: () => self[k] });
            "use strict";
            (() => {
              const enosys = /* @__PURE__ */ __name(() => {
                const err = new Error("not implemented");
                err.code = "ENOSYS";
                return err;
              }, "enosys");
              if (!globalThis.fs) {
                let outputBuf = "";
                globalThis.fs = {
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
                    const n = this.writeSync(fd, buf);
                    callback(null, n);
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
              if (!globalThis.process) {
                globalThis.process = {
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
              if (!globalThis.crypto) {
                throw new Error("globalThis.crypto is not available, polyfill required (crypto.getRandomValues only)");
              }
              if (!globalThis.performance) {
                throw new Error("globalThis.performance is not available, polyfill required (performance.now only)");
              }
              if (!globalThis.TextEncoder) {
                throw new Error("globalThis.TextEncoder is not available, polyfill required");
              }
              if (!globalThis.TextDecoder) {
                throw new Error("globalThis.TextDecoder is not available, polyfill required");
              }
              const encoder = new TextEncoder("utf-8");
              const decoder = new TextDecoder("utf-8");
              globalThis.Go = class {
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
                  const setInt64 = /* @__PURE__ */ __name((addr, v) => {
                    this.mem.setUint32(addr + 0, v, true);
                    this.mem.setUint32(addr + 4, Math.floor(v / 4294967296), true);
                  }, "setInt64");
                  const getInt64 = /* @__PURE__ */ __name((addr) => {
                    const low = this.mem.getUint32(addr + 0, true);
                    const high = this.mem.getInt32(addr + 4, true);
                    return low + high * 4294967296;
                  }, "getInt64");
                  const loadValue = /* @__PURE__ */ __name((addr) => {
                    const f = this.mem.getFloat64(addr, true);
                    if (f === 0) {
                      return void 0;
                    }
                    if (!isNaN(f)) {
                      return f;
                    }
                    const id = this.mem.getUint32(addr, true);
                    return this._values[id];
                  }, "loadValue");
                  const storeValue = /* @__PURE__ */ __name((addr, v) => {
                    const nanHead = 2146959360;
                    if (typeof v === "number" && v !== 0) {
                      if (isNaN(v)) {
                        this.mem.setUint32(addr + 4, nanHead, true);
                        this.mem.setUint32(addr, 0, true);
                        return;
                      }
                      this.mem.setFloat64(addr, v, true);
                      return;
                    }
                    if (v === void 0) {
                      this.mem.setFloat64(addr, 0, true);
                      return;
                    }
                    let id = this._ids.get(v);
                    if (id === void 0) {
                      id = this._idPool.pop();
                      if (id === void 0) {
                        id = this._values.length;
                      }
                      this._values[id] = v;
                      this._goRefCounts[id] = 0;
                      this._ids.set(v, id);
                    }
                    this._goRefCounts[id]++;
                    let typeFlag = 0;
                    switch (typeof v) {
                      case "object":
                        if (v !== null) {
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
                    const a = new Array(len);
                    for (let i = 0; i < len; i++) {
                      a[i] = loadValue(array + i * 8);
                    }
                    return a;
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
                        const p = getInt64(sp + 16);
                        const n = this.mem.getInt32(sp + 24, true);
                        globalThis.fs.writeSync(fd, new Uint8Array(this._inst.exports.mem.buffer, p, n));
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
                          const v = this._values[id];
                          this._values[id] = null;
                          this._ids.delete(v);
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
                          const v = loadValue(sp + 8);
                          const m = Reflect.get(v, loadString(sp + 16));
                          const args = loadSliceOfValues(sp + 32);
                          const result = Reflect.apply(m, v, args);
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
                          const v = loadValue(sp + 8);
                          const args = loadSliceOfValues(sp + 16);
                          const result = Reflect.apply(v, void 0, args);
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
                          const v = loadValue(sp + 8);
                          const args = loadSliceOfValues(sp + 16);
                          const result = Reflect.construct(v, args);
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
                      globalThis,
                      this
                    ];
                    this._goRefCounts = new Array(this._values.length).fill(Infinity);
                    this._ids = /* @__PURE__ */ new Map([
                      [0, 1],
                      [null, 2],
                      [true, 3],
                      [false, 4],
                      [globalThis, 5],
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
              let fs = globalThis.fs;
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
              let go = new globalThis.Go();
              go.argv = ["", `--service=${"0.15.7"}`];
              if (wasm2 instanceof WebAssembly.Module) {
                WebAssembly.instantiate(wasm2, go.importObject).then((instance) => go.run(instance));
              } else {
                WebAssembly.instantiate(wasm2, go.importObject).then(({ instance }) => go.run(instance));
              }
            }, "onmessage");
            return (m) => onmessage2(m);
          })((data) => worker.onmessage({ data }));
          worker = {
            onmessage: null,
            postMessage: (data) => setTimeout(() => onmessage({ data })),
            terminate() {
            }
          };
        }
        worker.postMessage(wasm);
        worker.onmessage = ({ data }) => readFromStdout(data);
        let { readFromStdout, service } = createChannel({
          writeToStdin(bytes) {
            worker.postMessage(bytes);
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
              readFile(_, callback) {
                callback(new Error("Internal error"), null);
              },
              writeFile(_, callback) {
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
    })(typeof module === "object" ? module : { set exports(x) {
      (typeof self !== "undefined" ? self : this).esbuild = x;
    } });
  }
});

// js/runner.tsx
init_define_process();

// js/esbuildEsm.ts
init_define_process();

// node_modules/async-mutex/index.mjs
init_define_process();
var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
var E_ALREADY_LOCKED = new Error("mutex already locked");
var E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
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
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
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

// js/esbuildEsm.ts
var import_esbuild_wasm = __toESM(require_browser(), 1);

// node_modules/esbuild-wasm/esbuild.wasm
var esbuild_default = "./chunk-esbuild-ZTDJQG3V.wasm";

// js/esbuildEsm.ts
var initFinished = false;
var esbuild = {
  transform: new Mutex().runExclusive(() => import_esbuild_wasm.transform)
};
var init = /* @__PURE__ */ __name(async () => {
  try {
    if (initFinished === true)
      return esbuild;
    initFinished = initFinished || new Promise((resolve) => {
      (0, import_esbuild_wasm.initialize)(
        {
          wasmURL: new URL(esbuild_default, location.origin).toString()
        }
      ).then(() => resolve(true));
    });
    if (await initFinished === true)
      return esbuild;
    throw new Error("esbuild couldn't initialize");
  } catch (e) {
    throw new Error("esbuild couldn't initialize");
  } finally {
    if (await initFinished === true)
      return esbuild;
    throw new Error("esbuild couldn't initialize");
  }
}, "init");

// js/runner.tsx
var mod = {
  i: 0,
  esbuild: init()
};
var esb = (async () => ({ transform: await (await mod.esbuild).transform }))();
async function runner({ code, counter }) {
  const esbuild2 = await esb;
  patchSync({ ...mST(), code, i: counter });
  try {
    const transpiled = await esbuild2.transform(code, {
      loader: "tsx",
      format: "esm",
      treeShaking: true,
      tsconfigRaw: {
        "compilerOptions": {
          "jsx": "react-jsx",
          "module": "es2022",
          "jsxFragmentFactory": "Fragment",
          "jsxImportSource": "@emotion/react"
        }
      },
      target: "es2021"
    });
    patchSync({ ...mST(), transpiled: transpiled.code });
    if (transpiled.code.length > 0) {
      try {
        saveCode();
      } catch (error) {
        console.error("EXCEPTION");
        console.error(error);
      }
    }
  } catch (error) {
    console.error({ error });
  }
}
__name(runner, "runner");
export {
  runner
};
