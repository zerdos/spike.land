"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target, mod2));

  // <define:process>
  var init_define_process = __esm({
    "<define:process>"() {
    }
  });

  // ../../node_modules/browser-readablestream-to-it/index.js
  var require_browser_readablestream_to_it = __commonJS({
    "../../node_modules/browser-readablestream-to-it/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      async function* browserReadableStreamToIt(stream, options = {}) {
        const reader = stream.getReader();
        try {
          while (true) {
            const result = await reader.read();
            if (result.done) {
              return;
            }
            yield result.value;
          }
        } finally {
          if (options.preventCancel !== true) {
            reader.cancel();
          }
          reader.releaseLock();
        }
      }
      module2.exports = browserReadableStreamToIt;
    }
  });

  // ../../node_modules/err-code/index.js
  var require_err_code = __commonJS({
    "../../node_modules/err-code/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      function assign(obj, props) {
        for (const key in props) {
          Object.defineProperty(obj, key, {
            value: props[key],
            enumerable: true,
            configurable: true
          });
        }
        return obj;
      }
      function createError2(err, code, props) {
        if (!err || typeof err === "string") {
          throw new TypeError("Please pass an Error to err-code");
        }
        if (!props) {
          props = {};
        }
        if (typeof code === "object") {
          props = code;
          code = "";
        }
        if (code) {
          props.code = code;
        }
        try {
          return assign(err, props);
        } catch (_) {
          props.message = err.message;
          props.stack = err.stack;
          const ErrClass = function() {
          };
          ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
          const output = assign(new ErrClass(), props);
          return output;
        }
      }
      module2.exports = createError2;
    }
  });

  // ../../node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "../../node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(function executor(resolve2, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve2.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }
  });

  // ../../node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "../../node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      init_define_process();
      var base64 = exports2;
      base64.length = function length2(string) {
        var p = string.length;
        if (!p)
          return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      base64.encode = function encode3(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode5(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }
  });

  // ../../node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "../../node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    }
  });

  // ../../node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "../../node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined")
          (function() {
            var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
            function writeFloat_f32_cpy(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
            }
            function writeFloat_f32_rev(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[3];
              buf[pos + 1] = f8b[2];
              buf[pos + 2] = f8b[1];
              buf[pos + 3] = f8b[0];
            }
            exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
            exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
            function readFloat_f32_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              return f32[0];
            }
            function readFloat_f32_rev(buf, pos) {
              f8b[3] = buf[pos];
              f8b[2] = buf[pos + 1];
              f8b[1] = buf[pos + 2];
              f8b[0] = buf[pos + 3];
              return f32[0];
            }
            exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
            exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
          })();
        else
          (function() {
            function writeFloat_ieee754(writeUint, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign)
                val = -val;
              if (val === 0)
                writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
              else if (isNaN(val))
                writeUint(2143289344, buf, pos);
              else if (val > 34028234663852886e22)
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
              else if (val < 11754943508222875e-54)
                writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
              else {
                var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
              }
            }
            exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
            exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
            function readFloat_ieee754(readUint, buf, pos) {
              var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
              return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
            }
            exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
            exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
          })();
        if (typeof Float64Array !== "undefined")
          (function() {
            var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
            function writeDouble_f64_cpy(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
              buf[pos + 4] = f8b[4];
              buf[pos + 5] = f8b[5];
              buf[pos + 6] = f8b[6];
              buf[pos + 7] = f8b[7];
            }
            function writeDouble_f64_rev(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[7];
              buf[pos + 1] = f8b[6];
              buf[pos + 2] = f8b[5];
              buf[pos + 3] = f8b[4];
              buf[pos + 4] = f8b[3];
              buf[pos + 5] = f8b[2];
              buf[pos + 6] = f8b[1];
              buf[pos + 7] = f8b[0];
            }
            exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
            exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
            function readDouble_f64_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              f8b[4] = buf[pos + 4];
              f8b[5] = buf[pos + 5];
              f8b[6] = buf[pos + 6];
              f8b[7] = buf[pos + 7];
              return f64[0];
            }
            function readDouble_f64_rev(buf, pos) {
              f8b[7] = buf[pos];
              f8b[6] = buf[pos + 1];
              f8b[5] = buf[pos + 2];
              f8b[4] = buf[pos + 3];
              f8b[3] = buf[pos + 4];
              f8b[2] = buf[pos + 5];
              f8b[1] = buf[pos + 6];
              f8b[0] = buf[pos + 7];
              return f64[0];
            }
            exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
            exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
          })();
        else
          (function() {
            function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign)
                val = -val;
              if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
              } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
              } else if (val > 17976931348623157e292) {
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
              } else {
                var mantissa;
                if (val < 22250738585072014e-324) {
                  mantissa = val / 5e-324;
                  writeUint(mantissa >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                  var exponent = Math.floor(Math.log(val) / Math.LN2);
                  if (exponent === 1024)
                    exponent = 1023;
                  mantissa = val * Math.pow(2, -exponent);
                  writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
              }
            }
            exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
            exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
            function readDouble_ieee754(readUint, off0, off1, buf, pos) {
              var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
              var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
              return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
            }
            exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
            exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
          })();
        return exports3;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // ../../node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "../../node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      init_define_process();
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e) {
        }
        return null;
      }
    }
  });

  // ../../node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "../../node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      init_define_process();
      var utf8 = exports2;
      utf8.length = function utf8_length(string) {
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i = 0, t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128)
            chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
          else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // ../../node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "../../node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // ../../node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "../../node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from2(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length2() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }
  });

  // ../../node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "../../node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      init_define_process();
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof self !== "undefined" && self && self.process && self.process.versions && self.process.versions.node);
      util.global = util.isNode && self || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : [];
      util.emptyObject = Object.freeze ? Object.freeze({}) : {};
      util.isInteger = Number.isInteger || function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : null;
        } catch (e) {
          return null;
        }
      }();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      function merge(dst, src2, ifNotSet) {
        for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src2[keys[i]];
        return dst;
      }
      util.merge = merge;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge(this, properties);
        }
        (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
        Object.defineProperty(CustomError.prototype, "name", { get: function() {
          return name;
        } });
        CustomError.prototype.toString = function toString() {
          return this.name + ": " + this.message;
        };
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        };
      };
    }
  });

  // ../../node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "../../node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create2 = function create3() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create2();
      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
          buf[pos + i] = val[i];
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create2();
        BufferWriter._configure();
      };
    }
  });

  // ../../node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "../../node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        } : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else
            for (var i = 0; i < val.length; )
              buf[pos++] = val[i++];
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    }
  });

  // ../../node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "../../node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      } : function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      };
      var create2 = function create3() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create2();
      Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
      Reader.prototype.uint32 = function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      }();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length2 = this.uint32(), start = this.pos, end = this.pos + length2;
        if (end > this.len)
          throw indexOutOfRange(this, length2);
        this.pos += length2;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length2) {
        if (typeof length2 === "number") {
          if (this.pos + length2 > this.len)
            throw indexOutOfRange(this, length2);
          this.pos += length2;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create2();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : "toNumber";
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // ../../node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "../../node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      BufferReader._configure();
    }
  });

  // ../../node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "../../node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = Service2;
      var util = require_minimal();
      (Service2.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service2;
      function Service2(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service2.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(true);
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          });
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service2.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // ../../node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "../../node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      init_define_process();
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // ../../node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "../../node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = {};
    }
  });

  // ../../node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "../../node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      init_define_process();
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure();
    }
  });

  // ../../node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "../../node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      init_define_process();
      module2.exports = require_index_minimal();
    }
  });

  // ../../node_modules/it-peekable/index.js
  var require_it_peekable = __commonJS({
    "../../node_modules/it-peekable/index.js"(exports2, module2) {
      "use strict";
      init_define_process();
      function peekableIterator(iterable) {
        const [iterator, symbol] = iterable[Symbol.asyncIterator] ? [iterable[Symbol.asyncIterator](), Symbol.asyncIterator] : [iterable[Symbol.iterator](), Symbol.iterator];
        const queue = [];
        return {
          peek: () => {
            return iterator.next();
          },
          push: (value) => {
            queue.push(value);
          },
          next: () => {
            if (queue.length) {
              return {
                done: false,
                value: queue.shift()
              };
            }
            return iterator.next();
          },
          [symbol]() {
            return this;
          }
        };
      }
      module2.exports = peekableIterator;
    }
  });

  // ../../node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "../../node_modules/lodash/isObject.js"(exports2, module2) {
      init_define_process();
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module2.exports = isObject;
    }
  });

  // ../../node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "../../node_modules/lodash/_freeGlobal.js"(exports2, module2) {
      init_define_process();
      var freeGlobal = typeof self == "object" && self && self.Object === Object && self;
      module2.exports = freeGlobal;
    }
  });

  // ../../node_modules/lodash/_root.js
  var require_root = __commonJS({
    "../../node_modules/lodash/_root.js"(exports2, module2) {
      init_define_process();
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module2.exports = root;
    }
  });

  // ../../node_modules/lodash/now.js
  var require_now = __commonJS({
    "../../node_modules/lodash/now.js"(exports2, module2) {
      init_define_process();
      var root = require_root();
      var now = function() {
        return root.Date.now();
      };
      module2.exports = now;
    }
  });

  // ../../node_modules/lodash/_trimmedEndIndex.js
  var require_trimmedEndIndex = __commonJS({
    "../../node_modules/lodash/_trimmedEndIndex.js"(exports2, module2) {
      init_define_process();
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      module2.exports = trimmedEndIndex;
    }
  });

  // ../../node_modules/lodash/_baseTrim.js
  var require_baseTrim = __commonJS({
    "../../node_modules/lodash/_baseTrim.js"(exports2, module2) {
      init_define_process();
      var trimmedEndIndex = require_trimmedEndIndex();
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      module2.exports = baseTrim;
    }
  });

  // ../../node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "../../node_modules/lodash/_Symbol.js"(exports2, module2) {
      init_define_process();
      var root = require_root();
      var Symbol2 = root.Symbol;
      module2.exports = Symbol2;
    }
  });

  // ../../node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "../../node_modules/lodash/_getRawTag.js"(exports2, module2) {
      init_define_process();
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module2.exports = getRawTag;
    }
  });

  // ../../node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "../../node_modules/lodash/_objectToString.js"(exports2, module2) {
      init_define_process();
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module2.exports = objectToString;
    }
  });

  // ../../node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "../../node_modules/lodash/_baseGetTag.js"(exports2, module2) {
      init_define_process();
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module2.exports = baseGetTag;
    }
  });

  // ../../node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "../../node_modules/lodash/isObjectLike.js"(exports2, module2) {
      init_define_process();
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module2.exports = isObjectLike;
    }
  });

  // ../../node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "../../node_modules/lodash/isSymbol.js"(exports2, module2) {
      init_define_process();
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module2.exports = isSymbol;
    }
  });

  // ../../node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS({
    "../../node_modules/lodash/toNumber.js"(exports2, module2) {
      init_define_process();
      var baseTrim = require_baseTrim();
      var isObject = require_isObject();
      var isSymbol = require_isSymbol();
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
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
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module2.exports = toNumber;
    }
  });

  // ../../node_modules/lodash/debounce.js
  var require_debounce = __commonJS({
    "../../node_modules/lodash/debounce.js"(exports2, module2) {
      init_define_process();
      var isObject = require_isObject();
      var now = require_now();
      var toNumber = require_toNumber();
      var FUNC_ERROR_TEXT = "Expected a function";
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      function debounce2(func, wait2, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait2 = toNumber(wait2) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait2) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait2);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait2 - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait2 || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
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
              clearTimeout(timerId);
              timerId = setTimeout(timerExpired, wait2);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait2);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      module2.exports = debounce2;
    }
  });

  // ../../node_modules/lodash/throttle.js
  var require_throttle = __commonJS({
    "../../node_modules/lodash/throttle.js"(exports2, module2) {
      init_define_process();
      var debounce2 = require_debounce();
      var isObject = require_isObject();
      var FUNC_ERROR_TEXT = "Expected a function";
      function throttle2(func, wait2, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce2(func, wait2, {
          "leading": leading,
          "maxWait": wait2,
          "trailing": trailing
        });
      }
      module2.exports = throttle2;
    }
  });

  // (disabled):os
  var require_os = __commonJS({
    "(disabled):os"() {
      init_define_process();
    }
  });

  // sw.mjs
  init_define_process();

  // service/util.js
  init_define_process();
  var selectClient = async (target, scoreClient = scoreWindowClient) => {
    const controlled = await getWindowClients(target);
    const [best] = controlled.sort((a, b) => scoreClient(b) - scoreClient(a));
    if (best && best.visibilityState === "visible") {
      return best;
    } else {
      const clients = await getWindowClients(target, true);
      const [best2] = clients.sort((a, b) => scoreClient(b) - scoreClient(a));
      if (best2) {
        return best2;
      } else {
        throw new Error("No viable client can be found");
      }
    }
  };
  var scoreWindowClient = ({ frameType, type, focused, visibilityState }) => {
    const top = frameType === "nested" ? 0 : 1;
    const typeScore = type === "window" ? 1 : 0;
    const visibiltyScore = visibilityState === "visible" ? 1 : 0;
    const focusScore = focused ? 2 : 1;
    return typeScore * focusScore * visibiltyScore * top;
  };
  var getWindowClients = async (target, includeUncontrolled = false) => {
    const clients = await target.clients.matchAll({
      type: "window",
      includeUncontrolled
    });
    return clients;
  };
  var defer = () => {
    const controller = {};
    controller.promise = new Promise((resolve2, reject) => {
      controller.resolve = resolve2;
      controller.reject = reject;
    });
    return controller;
  };
  var toReadableStream = (source) => {
    const iterator = source[Symbol.asyncIterator]();
    return new ReadableStream({
      async pull(controller) {
        try {
          const chunk = await iterator.next();
          if (chunk.done) {
            controller.close();
          } else {
            controller.enqueue(chunk.value);
          }
        } catch (error) {
          controller.error(error);
        }
      },
      cancel(reason) {
        if (source.return) {
          source.return(reason);
        }
      }
    });
  };

  // ../../node_modules/ipfs-message-port-client/src/index.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-client/src/client/transport.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-protocol/src/error.js
  init_define_process();
  var encodeError = (error) => {
    const { name, message, stack, code, detail } = error;
    return { name, message, stack, code, detail };
  };
  var decodeError = (error) => {
    if (error instanceof Error) {
      return error;
    } else {
      const { name, message, stack, code } = error;
      return Object.assign(createError(name, message), { name, stack, code });
    }
  };
  var createError = (name, message) => {
    switch (name) {
      case "RangeError": {
        return new RangeError(message);
      }
      case "ReferenceError": {
        return ReferenceError(message);
      }
      case "SyntaxError": {
        return new SyntaxError(message);
      }
      case "TypeError": {
        return new TypeError(message);
      }
      case "URIError": {
        return new URIError(message);
      }
      default: {
        return new Error(message);
      }
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/client/error.js
  init_define_process();
  var TimeoutError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };
  var AbortError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };
  var DisconnectError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/client/transport.js
  var MessageTransport = class {
    constructor(port) {
      this.port = null;
      this.id = Math.random().toString(32).slice(2);
      this.nextID = 0;
      this.queries = /* @__PURE__ */ Object.create(null);
      if (port) {
        this.connect(port);
      }
    }
    execute(query) {
      const id = `${this.id}@${this.nextID++}`;
      this.queries[id] = query;
      if (query.timeout > 0 && query.timeout < Infinity) {
        query.timerID = setTimeout(MessageTransport.timeout, query.timeout, this, id);
      }
      if (query.signal) {
        query.signal.addEventListener("abort", () => this.abort(id), {
          once: true
        });
      }
      if (this.port) {
        MessageTransport.postQuery(this.port, id, query);
      }
      return query.result;
    }
    connect(port) {
      if (this.port) {
        throw new Error("Transport is already open");
      } else {
        this.port = port;
        this.port.addEventListener("message", this);
        this.port.start();
        for (const [id, query] of Object.entries(this.queries)) {
          MessageTransport.postQuery(port, id, query);
        }
      }
    }
    disconnect() {
      const error = new DisconnectError();
      for (const [id, query] of Object.entries(this.queries)) {
        query.fail(error);
        this.abort(id);
      }
      if (this.port) {
        this.port.removeEventListener("message", this);
        this.port.close();
      }
    }
    static timeout(self2, id) {
      const { queries } = self2;
      const query = queries[id];
      if (query) {
        delete queries[id];
        query.fail(new TimeoutError("request timed out"));
        if (self2.port) {
          self2.port.postMessage({ type: "abort", id });
        }
      }
    }
    abort(id) {
      const { queries } = this;
      const query = queries[id];
      if (query) {
        delete queries[id];
        query.fail(new AbortError());
        if (this.port) {
          this.port.postMessage({ type: "abort", id });
        }
        if (query.timerID != null) {
          clearTimeout(query.timerID);
        }
      }
    }
    static postQuery(port, id, query) {
      port.postMessage({
        type: "query",
        namespace: query.namespace,
        method: query.method,
        id,
        input: query.toJSON()
      }, query.transfer());
    }
    handleEvent(event) {
      const { id, result } = event.data;
      const query = this.queries[id];
      if (query) {
        delete this.queries[id];
        if (result.ok) {
          query.succeed(result.value);
        } else {
          query.fail(decodeError(result.error));
        }
        if (query.timerID != null) {
          clearTimeout(query.timerID);
        }
      }
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/block.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-client/src/client.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-client/src/client/service.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-client/src/client/query.js
  init_define_process();
  var Query = class {
    constructor(namespace, method, input) {
      this.result = new Promise((resolve2, reject) => {
        this.succeed = resolve2;
        this.fail = reject;
        this.signal = input.signal;
        this.input = input;
        this.namespace = namespace;
        this.method = method;
        this.timeout = input.timeout == null ? Infinity : input.timeout;
        this.timerID = null;
      });
    }
    toJSON() {
      return this.input;
    }
    transfer() {
      return this.input.transfer;
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/client/service.js
  var Service = class {
    constructor(namespace, methods, transport) {
      this.transport = transport;
      const api = this;
      for (const method of methods) {
        api[method] = (input) => this.transport.execute(new Query(namespace, method.toString(), input));
      }
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/client.js
  var Client = class {
    constructor(namespace, methods, transport) {
      this.remote = new Service(namespace, methods, transport);
    }
  };

  // ../../node_modules/ipfs-message-port-protocol/src/cid.js
  init_define_process();

  // ../../node_modules/multiformats/esm/src/cid.js
  init_define_process();

  // ../../node_modules/multiformats/esm/src/varint.js
  init_define_process();

  // ../../node_modules/multiformats/esm/vendor/varint.js
  init_define_process();
  var encode_1 = encode;
  var MSB = 128;
  var REST = 127;
  var MSBALL = ~REST;
  var INT = Math.pow(2, 31);
  function encode(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
      out[offset++] = num & 255 | MSB;
      num /= 128;
    }
    while (num & MSBALL) {
      out[offset++] = num & 255 | MSB;
      num >>>= 7;
    }
    out[offset] = num | 0;
    encode.bytes = offset - oldOffset + 1;
    return out;
  }
  var decode = read;
  var MSB$1 = 128;
  var REST$1 = 127;
  function read(buf, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
    do {
      if (counter >= l) {
        read.bytes = 0;
        throw new RangeError("Could not decode varint");
      }
      b = buf[counter++];
      res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
  }
  var N1 = Math.pow(2, 7);
  var N2 = Math.pow(2, 14);
  var N3 = Math.pow(2, 21);
  var N4 = Math.pow(2, 28);
  var N5 = Math.pow(2, 35);
  var N6 = Math.pow(2, 42);
  var N7 = Math.pow(2, 49);
  var N8 = Math.pow(2, 56);
  var N9 = Math.pow(2, 63);
  var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
  };
  var varint = {
    encode: encode_1,
    decode,
    encodingLength: length
  };
  var _brrp_varint = varint;
  var varint_default = _brrp_varint;

  // ../../node_modules/multiformats/esm/src/varint.js
  var decode2 = (data) => {
    const code = varint_default.decode(data);
    return [
      code,
      varint_default.decode.bytes
    ];
  };
  var encodeTo = (int, target, offset = 0) => {
    varint_default.encode(int, target, offset);
    return target;
  };
  var encodingLength = (int) => {
    return varint_default.encodingLength(int);
  };

  // ../../node_modules/multiformats/esm/src/hashes/digest.js
  init_define_process();

  // ../../node_modules/multiformats/esm/src/bytes.js
  init_define_process();
  var empty = new Uint8Array(0);
  var equals = (aa, bb) => {
    if (aa === bb)
      return true;
    if (aa.byteLength !== bb.byteLength) {
      return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
      if (aa[ii] !== bb[ii]) {
        return false;
      }
    }
    return true;
  };
  var coerce = (o) => {
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
      return o;
    if (o instanceof ArrayBuffer)
      return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error("Unknown type, must be binary type");
  };

  // ../../node_modules/multiformats/esm/src/hashes/digest.js
  var create = (code, digest) => {
    const size = digest.byteLength;
    const sizeOffset = encodingLength(code);
    const digestOffset = sizeOffset + encodingLength(size);
    const bytes = new Uint8Array(digestOffset + size);
    encodeTo(code, bytes, 0);
    encodeTo(size, bytes, sizeOffset);
    bytes.set(digest, digestOffset);
    return new Digest(code, size, digest, bytes);
  };
  var decode3 = (multihash) => {
    const bytes = coerce(multihash);
    const [code, sizeOffset] = decode2(bytes);
    const [size, digestOffset] = decode2(bytes.subarray(sizeOffset));
    const digest = bytes.subarray(sizeOffset + digestOffset);
    if (digest.byteLength !== size) {
      throw new Error("Incorrect length");
    }
    return new Digest(code, size, digest, bytes);
  };
  var equals2 = (a, b) => {
    if (a === b) {
      return true;
    } else {
      return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
    }
  };
  var Digest = class {
    constructor(code, size, digest, bytes) {
      this.code = code;
      this.size = size;
      this.digest = digest;
      this.bytes = bytes;
    }
  };

  // ../../node_modules/multiformats/esm/src/bases/base58.js
  init_define_process();

  // ../../node_modules/multiformats/esm/src/bases/base.js
  init_define_process();

  // ../../node_modules/multiformats/esm/vendor/base-x.js
  init_define_process();
  function base(ALPHABET, name) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long");
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous");
      }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode3(source) {
      if (source instanceof Uint8Array)
        ;
      else if (ArrayBuffer.isView(source)) {
        source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
      } else if (Array.isArray(source)) {
        source = Uint8Array.from(source);
      }
      if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (source.length === 0) {
        return "";
      }
      var zeroes = 0;
      var length2 = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
      var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
      var b58 = new Uint8Array(size);
      while (pbegin !== pend) {
        var carry = source[pbegin];
        var i2 = 0;
        for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
          carry += 256 * b58[it1] >>> 0;
          b58[it1] = carry % BASE >>> 0;
          carry = carry / BASE >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length2 = i2;
        pbegin++;
      }
      var it2 = size - length2;
      while (it2 !== size && b58[it2] === 0) {
        it2++;
      }
      var str = LEADER.repeat(zeroes);
      for (; it2 < size; ++it2) {
        str += ALPHABET.charAt(b58[it2]);
      }
      return str;
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String");
      }
      if (source.length === 0) {
        return new Uint8Array();
      }
      var psz = 0;
      if (source[psz] === " ") {
        return;
      }
      var zeroes = 0;
      var length2 = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
      var size = (source.length - psz) * FACTOR + 1 >>> 0;
      var b256 = new Uint8Array(size);
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)];
        if (carry === 255) {
          return;
        }
        var i2 = 0;
        for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
          carry += BASE * b256[it3] >>> 0;
          b256[it3] = carry % 256 >>> 0;
          carry = carry / 256 >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length2 = i2;
        psz++;
      }
      if (source[psz] === " ") {
        return;
      }
      var it4 = size - length2;
      while (it4 !== size && b256[it4] === 0) {
        it4++;
      }
      var vch = new Uint8Array(zeroes + (size - it4));
      var j2 = zeroes;
      while (it4 !== size) {
        vch[j2++] = b256[it4++];
      }
      return vch;
    }
    function decode5(string) {
      var buffer = decodeUnsafe(string);
      if (buffer) {
        return buffer;
      }
      throw new Error(`Non-${name} character`);
    }
    return {
      encode: encode3,
      decodeUnsafe,
      decode: decode5
    };
  }
  var src = base;
  var _brrp__multiformats_scope_baseX = src;
  var base_x_default = _brrp__multiformats_scope_baseX;

  // ../../node_modules/multiformats/esm/src/bases/base.js
  var Encoder = class {
    constructor(name, prefix, baseEncode) {
      this.name = name;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
    }
    encode(bytes) {
      if (bytes instanceof Uint8Array) {
        return `${this.prefix}${this.baseEncode(bytes)}`;
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };
  var Decoder = class {
    constructor(name, prefix, baseDecode) {
      this.name = name;
      this.prefix = prefix;
      if (prefix.codePointAt(0) === void 0) {
        throw new Error("Invalid prefix character");
      }
      this.prefixCodePoint = prefix.codePointAt(0);
      this.baseDecode = baseDecode;
    }
    decode(text) {
      if (typeof text === "string") {
        if (text.codePointAt(0) !== this.prefixCodePoint) {
          throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        }
        return this.baseDecode(text.slice(this.prefix.length));
      } else {
        throw Error("Can only multibase decode strings");
      }
    }
    or(decoder) {
      return or(this, decoder);
    }
  };
  var ComposedDecoder = class {
    constructor(decoders) {
      this.decoders = decoders;
    }
    or(decoder) {
      return or(this, decoder);
    }
    decode(input) {
      const prefix = input[0];
      const decoder = this.decoders[prefix];
      if (decoder) {
        return decoder.decode(input);
      } else {
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    }
  };
  var or = (left, right) => new ComposedDecoder({
    ...left.decoders || { [left.prefix]: left },
    ...right.decoders || { [right.prefix]: right }
  });
  var Codec = class {
    constructor(name, prefix, baseEncode, baseDecode) {
      this.name = name;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
      this.baseDecode = baseDecode;
      this.encoder = new Encoder(name, prefix, baseEncode);
      this.decoder = new Decoder(name, prefix, baseDecode);
    }
    encode(input) {
      return this.encoder.encode(input);
    }
    decode(input) {
      return this.decoder.decode(input);
    }
  };
  var from = ({ name, prefix, encode: encode3, decode: decode5 }) => new Codec(name, prefix, encode3, decode5);
  var baseX = ({ prefix, name, alphabet }) => {
    const { encode: encode3, decode: decode5 } = base_x_default(alphabet, name);
    return from({
      prefix,
      name,
      encode: encode3,
      decode: (text) => coerce(decode5(text))
    });
  };
  var decode4 = (string, alphabet, bitsPerChar, name) => {
    const codes = {};
    for (let i = 0; i < alphabet.length; ++i) {
      codes[alphabet[i]] = i;
    }
    let end = string.length;
    while (string[end - 1] === "=") {
      --end;
    }
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
      const value = codes[string[i]];
      if (value === void 0) {
        throw new SyntaxError(`Non-${name} character`);
      }
      buffer = buffer << bitsPerChar | value;
      bits += bitsPerChar;
      if (bits >= 8) {
        bits -= 8;
        out[written++] = 255 & buffer >> bits;
      }
    }
    if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
      throw new SyntaxError("Unexpected end of data");
    }
    return out;
  };
  var encode2 = (data, alphabet, bitsPerChar) => {
    const pad = alphabet[alphabet.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer = 0;
    for (let i = 0; i < data.length; ++i) {
      buffer = buffer << 8 | data[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        out += alphabet[mask & buffer >> bits];
      }
    }
    if (bits) {
      out += alphabet[mask & buffer << bitsPerChar - bits];
    }
    if (pad) {
      while (out.length * bitsPerChar & 7) {
        out += "=";
      }
    }
    return out;
  };
  var rfc4648 = ({ name, prefix, bitsPerChar, alphabet }) => {
    return from({
      prefix,
      name,
      encode(input) {
        return encode2(input, alphabet, bitsPerChar);
      },
      decode(input) {
        return decode4(input, alphabet, bitsPerChar, name);
      }
    });
  };

  // ../../node_modules/multiformats/esm/src/bases/base58.js
  var base58btc = baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  });
  var base58flickr = baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  });

  // ../../node_modules/multiformats/esm/src/bases/base32.js
  init_define_process();
  var base32 = rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  });
  var base32upper = rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  });
  var base32pad = rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  });
  var base32padupper = rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  });
  var base32hex = rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  });
  var base32hexupper = rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  });
  var base32hexpad = rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  });
  var base32hexpadupper = rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  });
  var base32z = rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  });

  // ../../node_modules/multiformats/esm/src/cid.js
  var CID = class {
    constructor(version2, code, multihash, bytes) {
      this.code = code;
      this.version = version2;
      this.multihash = multihash;
      this.bytes = bytes;
      this.byteOffset = bytes.byteOffset;
      this.byteLength = bytes.byteLength;
      this.asCID = this;
      this._baseCache = /* @__PURE__ */ new Map();
      Object.defineProperties(this, {
        byteOffset: hidden,
        byteLength: hidden,
        code: readonly,
        version: readonly,
        multihash: readonly,
        bytes: readonly,
        _baseCache: hidden,
        asCID: hidden
      });
    }
    toV0() {
      switch (this.version) {
        case 0: {
          return this;
        }
        default: {
          const { code, multihash } = this;
          if (code !== DAG_PB_CODE) {
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          }
          if (multihash.code !== SHA_256_CODE) {
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          }
          return CID.createV0(multihash);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code, digest } = this.multihash;
          const multihash = create(code, digest);
          return CID.createV1(this.code, multihash);
        }
        case 1: {
          return this;
        }
        default: {
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
      }
    }
    equals(other) {
      return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
    }
    toString(base2) {
      const { bytes, version: version2, _baseCache } = this;
      switch (version2) {
        case 0:
          return toStringV0(bytes, _baseCache, base2 || base58btc.encoder);
        default:
          return toStringV1(bytes, _baseCache, base2 || base32.encoder);
      }
    }
    toJSON() {
      return {
        code: this.code,
        version: this.version,
        hash: this.multihash.bytes
      };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(value) {
      deprecate(/^0\.0/, IS_CID_DEPRECATION);
      return !!(value && (value[cidSymbol] || value.asCID === value));
    }
    get toBaseEncodedString() {
      throw new Error("Deprecated, use .toString()");
    }
    get codec() {
      throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
      throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
      throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
      throw new Error('"prefix" property is deprecated');
    }
    static asCID(value) {
      if (value instanceof CID) {
        return value;
      } else if (value != null && value.asCID === value) {
        const { version: version2, code, multihash, bytes } = value;
        return new CID(version2, code, multihash, bytes || encodeCID(version2, code, multihash.bytes));
      } else if (value != null && value[cidSymbol] === true) {
        const { version: version2, multihash, code } = value;
        const digest = decode3(multihash);
        return CID.create(version2, code, digest);
      } else {
        return null;
      }
    }
    static create(version2, code, digest) {
      if (typeof code !== "number") {
        throw new Error("String codecs are no longer supported");
      }
      switch (version2) {
        case 0: {
          if (code !== DAG_PB_CODE) {
            throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
          } else {
            return new CID(version2, code, digest, digest.bytes);
          }
        }
        case 1: {
          const bytes = encodeCID(version2, code, digest.bytes);
          return new CID(version2, code, digest, bytes);
        }
        default: {
          throw new Error("Invalid version");
        }
      }
    }
    static createV0(digest) {
      return CID.create(0, DAG_PB_CODE, digest);
    }
    static createV1(code, digest) {
      return CID.create(1, code, digest);
    }
    static decode(bytes) {
      const [cid, remainder] = CID.decodeFirst(bytes);
      if (remainder.length) {
        throw new Error("Incorrect length");
      }
      return cid;
    }
    static decodeFirst(bytes) {
      const specs = CID.inspectBytes(bytes);
      const prefixSize = specs.size - specs.multihashSize;
      const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
      if (multihashBytes.byteLength !== specs.multihashSize) {
        throw new Error("Incorrect length");
      }
      const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
      const digest = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
      const cid = specs.version === 0 ? CID.createV0(digest) : CID.createV1(specs.codec, digest);
      return [
        cid,
        bytes.subarray(specs.size)
      ];
    }
    static inspectBytes(initialBytes) {
      let offset = 0;
      const next = () => {
        const [i, length2] = decode2(initialBytes.subarray(offset));
        offset += length2;
        return i;
      };
      let version2 = next();
      let codec = DAG_PB_CODE;
      if (version2 === 18) {
        version2 = 0;
        offset = 0;
      } else if (version2 === 1) {
        codec = next();
      }
      if (version2 !== 0 && version2 !== 1) {
        throw new RangeError(`Invalid CID version ${version2}`);
      }
      const prefixSize = offset;
      const multihashCode = next();
      const digestSize = next();
      const size = offset + digestSize;
      const multihashSize = size - prefixSize;
      return {
        version: version2,
        codec,
        multihashCode,
        digestSize,
        multihashSize,
        size
      };
    }
    static parse(source, base2) {
      const [prefix, bytes] = parseCIDtoBytes(source, base2);
      const cid = CID.decode(bytes);
      cid._baseCache.set(prefix, source);
      return cid;
    }
  };
  var parseCIDtoBytes = (source, base2) => {
    switch (source[0]) {
      case "Q": {
        const decoder = base2 || base58btc;
        return [
          base58btc.prefix,
          decoder.decode(`${base58btc.prefix}${source}`)
        ];
      }
      case base58btc.prefix: {
        const decoder = base2 || base58btc;
        return [
          base58btc.prefix,
          decoder.decode(source)
        ];
      }
      case base32.prefix: {
        const decoder = base2 || base32;
        return [
          base32.prefix,
          decoder.decode(source)
        ];
      }
      default: {
        if (base2 == null) {
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        }
        return [
          source[0],
          base2.decode(source)
        ];
      }
    }
  };
  var toStringV0 = (bytes, cache2, base2) => {
    const { prefix } = base2;
    if (prefix !== base58btc.prefix) {
      throw Error(`Cannot string encode V0 in ${base2.name} encoding`);
    }
    const cid = cache2.get(prefix);
    if (cid == null) {
      const cid2 = base2.encode(bytes).slice(1);
      cache2.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var toStringV1 = (bytes, cache2, base2) => {
    const { prefix } = base2;
    const cid = cache2.get(prefix);
    if (cid == null) {
      const cid2 = base2.encode(bytes);
      cache2.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var DAG_PB_CODE = 112;
  var SHA_256_CODE = 18;
  var encodeCID = (version2, code, multihash) => {
    const codeOffset = encodingLength(version2);
    const hashOffset = codeOffset + encodingLength(code);
    const bytes = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo(version2, bytes, 0);
    encodeTo(code, bytes, codeOffset);
    bytes.set(multihash, hashOffset);
    return bytes;
  };
  var cidSymbol = Symbol.for("@ipld/js-cid/CID");
  var readonly = {
    writable: false,
    configurable: false,
    enumerable: true
  };
  var hidden = {
    writable: false,
    enumerable: false,
    configurable: false
  };
  var version = "0.0.0-dev";
  var deprecate = (range, message) => {
    if (range.test(version)) {
      console.warn(message);
    } else {
      throw new Error(message);
    }
  };
  var IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;

  // ../../node_modules/ipfs-message-port-protocol/src/cid.js
  var encodeCID2 = (cid, transfer) => {
    if (transfer) {
      transfer.add(cid.multihash.bytes.buffer);
    }
    return cid;
  };
  var decodeCID = (encodedCID) => {
    const cid = encodedCID;
    if (!cid._baseCache) {
      Object.defineProperty(cid, "_baseCache", {
        value: /* @__PURE__ */ new Map()
      });
    }
    if (!cid.asCID) {
      Object.defineProperty(cid, "asCID", {
        get: () => cid
      });
    }
    Object.setPrototypeOf(cid.multihash.digest, Uint8Array.prototype);
    Object.setPrototypeOf(cid.multihash.bytes, Uint8Array.prototype);
    Object.setPrototypeOf(cid.bytes, Uint8Array.prototype);
    Object.setPrototypeOf(cid, CID.prototype);
    Object.defineProperty(cid, Symbol.for("@ipld/js-cid/CID"), { value: true });
    return cid;
  };

  // ../../node_modules/ipfs-message-port-protocol/src/block.js
  init_define_process();
  var encodeBlock = (data, transfer) => {
    if (transfer) {
      transfer.add(data.buffer);
    }
    return data;
  };

  // ../../node_modules/ipfs-message-port-client/src/block.js
  var BlockClient = class extends Client {
    constructor(transport) {
      super("block", ["put", "get", "rm", "stat"], transport);
    }
  };
  BlockClient.prototype.get = async function get(cid, options = {}) {
    const { transfer } = options;
    const { block } = await this.remote.get({
      ...options,
      cid: encodeCID2(cid, transfer)
    });
    return block;
  };
  BlockClient.prototype.put = async function put(block, options = {}) {
    const { transfer } = options;
    delete options.progress;
    const result = await this.remote.put({
      ...options,
      block: block instanceof Uint8Array ? block : encodeBlock(block, transfer)
    });
    return decodeCID(result.cid);
  };
  BlockClient.prototype.rm = async function* rm(cids, options = {}) {
    const { transfer } = options;
    const entries = await this.remote.rm({
      ...options,
      cids: Array.isArray(cids) ? cids.map((cid) => encodeCID2(cid, transfer)) : [encodeCID2(cids, transfer)]
    });
    yield* entries.map(decodeRmEntry);
  };
  BlockClient.prototype.stat = async function stat(cid, options = {}) {
    const { transfer } = options;
    const result = await this.remote.stat({
      ...options,
      cid: encodeCID2(cid, transfer)
    });
    return { ...result, cid: decodeCID(result.cid) };
  };
  var decodeRmEntry = (entry) => {
    const cid = decodeCID(entry.cid);
    if (entry.error) {
      return { cid, error: decodeError(entry.error) };
    } else {
      return { cid };
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/dag.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-protocol/src/dag.js
  init_define_process();
  var decodeNode = ({ dagNode, cids }) => {
    for (const cid of cids) {
      decodeCID(cid);
    }
    return dagNode;
  };
  var encodeNode = (dagNode, transfer) => {
    const cids = [];
    collectNode(dagNode, cids, transfer);
    return { dagNode, cids };
  };
  var collectNode = (value, cids, transfer) => {
    if (value != null && typeof value === "object") {
      const cid = CID.asCID(value);
      if (cid) {
        cids.push(cid);
        encodeCID2(cid, transfer);
      } else if (value instanceof ArrayBuffer) {
        if (transfer) {
          transfer.add(value);
        }
      } else if (ArrayBuffer.isView(value)) {
        if (transfer) {
          transfer.add(value.buffer);
        }
      } else if (Array.isArray(value)) {
        for (const member of value) {
          collectNode(member, cids, transfer);
        }
      } else {
        for (const member of Object.values(value)) {
          collectNode(member, cids, transfer);
        }
      }
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/dag.js
  var DAGClient = class extends Client {
    constructor(transport) {
      super("dag", ["put", "get", "resolve"], transport);
    }
  };
  DAGClient.prototype.put = async function put2(dagNode, options = {}) {
    const encodedCID = await this.remote.put({
      ...options,
      dagNode: encodeNode(dagNode, options.transfer)
    });
    return decodeCID(encodedCID);
  };
  DAGClient.prototype.get = async function get2(cid, options = {}) {
    const { value, remainderPath } = await this.remote.get({
      ...options,
      cid: encodeCID2(cid, options.transfer)
    });
    return { value: decodeNode(value), remainderPath };
  };
  DAGClient.prototype.resolve = async function resolve(cid, options = {}) {
    const { cid: encodedCID, remainderPath } = await this.remote.resolve({
      ...options,
      cid: encodeCIDOrPath(cid, options.transfer)
    });
    return { cid: decodeCID(encodedCID), remainderPath };
  };
  var encodeCIDOrPath = (input, transfer) => {
    if (typeof input === "string") {
      return input;
    } else {
      return encodeCID2(input, transfer);
    }
  };

  // ../../node_modules/ipfs-message-port-client/src/core.js
  init_define_process();

  // ../../node_modules/ipfs-message-port-protocol/src/core.js
  init_define_process();
  var decodeIterable = async function* ({ port }, decode5) {
    let receive = (_data) => {
    };
    const wait2 = () => new Promise((resolve2) => receive = resolve2);
    const next = () => {
      port.postMessage({ method: "next" });
      return wait2();
    };
    port.onmessage = (event) => receive(event.data);
    let isDone = false;
    try {
      while (!isDone) {
        const { done, value, error } = await next();
        isDone = done;
        if (error != null) {
          throw decodeError(error);
        } else if (value != null) {
          yield decode5(value);
        }
      }
    } finally {
      if (!isDone) {
        port.postMessage({ method: "return" });
      }
      port.close();
    }
  };
  var encodeIterable = (iterable, encode3, transfer) => {
    const { port1: port, port2: remote } = new MessageChannel();
    const iterator = toIterator(iterable);
    const itemTransfer = /* @__PURE__ */ new Set();
    port.onmessage = async ({ data: { method } }) => {
      switch (method) {
        case "next": {
          try {
            const { done, value } = await iterator.next();
            if (done) {
              port.postMessage({ type: "next", done: true });
              port.close();
            } else {
              itemTransfer.clear();
              const encodedValue = encode3(value, itemTransfer);
              postMessage(port, {
                type: "next",
                done: false,
                value: encodedValue
              }, itemTransfer);
            }
          } catch (error) {
            port.postMessage({
              type: "throw",
              error: encodeError(error)
            });
            port.close();
          }
          break;
        }
        case "return": {
          port.close();
          if (iterator.return) {
            iterator.return();
          }
          break;
        }
        default: {
          break;
        }
      }
    };
    port.start();
    transfer.add(remote);
    return { type: "RemoteIterable", port: remote };
  };
  var toIterator = (iterable) => {
    if (iterable != null) {
      if (typeof iterable[Symbol.asyncIterator] === "function") {
        return iterable[Symbol.asyncIterator]();
      }
      if (typeof iterable[Symbol.iterator] === "function") {
        return iterable[Symbol.iterator]();
      }
    }
    throw TypeError("Value must be async or sync iterable");
  };
  var encodeCallback = (callback, transfer) => {
    const { port1: port, port2: remote } = new MessageChannel();
    port.onmessage = ({ data }) => callback.apply(null, data);
    transfer.add(remote);
    return { type: "RemoteCallback", port: remote };
  };
  var postMessage = (port, message, transfer) => port.postMessage(message, transfer);

  // ../../node_modules/ipfs-message-port-client/src/core.js
  var import_browser_readablestream_to_it = __toESM(require_browser_readablestream_to_it(), 1);

  // ../../node_modules/ipfs-unixfs/esm/src/index.js
  init_define_process();
  var import_err_code = __toESM(require_err_code(), 1);

  // ../../node_modules/ipfs-unixfs/esm/src/unixfs.js
  init_define_process();
  var import_minimal = __toESM(require_minimal2(), 1);
  var $Reader = import_minimal.default.Reader;
  var $Writer = import_minimal.default.Writer;
  var $util = import_minimal.default.util;
  var $root = import_minimal.default.roots["ipfs-unixfs"] || (import_minimal.default.roots["ipfs-unixfs"] = {});
  var Data = $root.Data = (() => {
    function Data2(p) {
      this.blocksizes = [];
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null)
            this[ks[i]] = p[ks[i]];
      }
    }
    Data2.prototype.Type = 0;
    Data2.prototype.Data = $util.newBuffer([]);
    Data2.prototype.filesize = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    Data2.prototype.blocksizes = $util.emptyArray;
    Data2.prototype.hashType = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    Data2.prototype.fanout = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    Data2.prototype.mode = 0;
    Data2.prototype.mtime = null;
    Data2.encode = function encode3(m, w) {
      if (!w)
        w = $Writer.create();
      w.uint32(8).int32(m.Type);
      if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
        w.uint32(18).bytes(m.Data);
      if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
        w.uint32(24).uint64(m.filesize);
      if (m.blocksizes != null && m.blocksizes.length) {
        for (var i = 0; i < m.blocksizes.length; ++i)
          w.uint32(32).uint64(m.blocksizes[i]);
      }
      if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
        w.uint32(40).uint64(m.hashType);
      if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
        w.uint32(48).uint64(m.fanout);
      if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
        w.uint32(56).uint32(m.mode);
      if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
        $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
      return w;
    };
    Data2.decode = function decode5(r, l) {
      if (!(r instanceof $Reader))
        r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l, m = new $root.Data();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.Type = r.int32();
            break;
          case 2:
            m.Data = r.bytes();
            break;
          case 3:
            m.filesize = r.uint64();
            break;
          case 4:
            if (!(m.blocksizes && m.blocksizes.length))
              m.blocksizes = [];
            if ((t & 7) === 2) {
              var c2 = r.uint32() + r.pos;
              while (r.pos < c2)
                m.blocksizes.push(r.uint64());
            } else
              m.blocksizes.push(r.uint64());
            break;
          case 5:
            m.hashType = r.uint64();
            break;
          case 6:
            m.fanout = r.uint64();
            break;
          case 7:
            m.mode = r.uint32();
            break;
          case 8:
            m.mtime = $root.UnixTime.decode(r, r.uint32());
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      if (!m.hasOwnProperty("Type"))
        throw $util.ProtocolError("missing required 'Type'", { instance: m });
      return m;
    };
    Data2.fromObject = function fromObject(d) {
      if (d instanceof $root.Data)
        return d;
      var m = new $root.Data();
      switch (d.Type) {
        case "Raw":
        case 0:
          m.Type = 0;
          break;
        case "Directory":
        case 1:
          m.Type = 1;
          break;
        case "File":
        case 2:
          m.Type = 2;
          break;
        case "Metadata":
        case 3:
          m.Type = 3;
          break;
        case "Symlink":
        case 4:
          m.Type = 4;
          break;
        case "HAMTShard":
        case 5:
          m.Type = 5;
          break;
      }
      if (d.Data != null) {
        if (typeof d.Data === "string")
          $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
        else if (d.Data.length)
          m.Data = d.Data;
      }
      if (d.filesize != null) {
        if ($util.Long)
          (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
        else if (typeof d.filesize === "string")
          m.filesize = parseInt(d.filesize, 10);
        else if (typeof d.filesize === "number")
          m.filesize = d.filesize;
        else if (typeof d.filesize === "object")
          m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
      }
      if (d.blocksizes) {
        if (!Array.isArray(d.blocksizes))
          throw TypeError(".Data.blocksizes: array expected");
        m.blocksizes = [];
        for (var i = 0; i < d.blocksizes.length; ++i) {
          if ($util.Long)
            (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
          else if (typeof d.blocksizes[i] === "string")
            m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
          else if (typeof d.blocksizes[i] === "number")
            m.blocksizes[i] = d.blocksizes[i];
          else if (typeof d.blocksizes[i] === "object")
            m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
        }
      }
      if (d.hashType != null) {
        if ($util.Long)
          (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
        else if (typeof d.hashType === "string")
          m.hashType = parseInt(d.hashType, 10);
        else if (typeof d.hashType === "number")
          m.hashType = d.hashType;
        else if (typeof d.hashType === "object")
          m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
      }
      if (d.fanout != null) {
        if ($util.Long)
          (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
        else if (typeof d.fanout === "string")
          m.fanout = parseInt(d.fanout, 10);
        else if (typeof d.fanout === "number")
          m.fanout = d.fanout;
        else if (typeof d.fanout === "object")
          m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
      }
      if (d.mode != null) {
        m.mode = d.mode >>> 0;
      }
      if (d.mtime != null) {
        if (typeof d.mtime !== "object")
          throw TypeError(".Data.mtime: object expected");
        m.mtime = $root.UnixTime.fromObject(d.mtime);
      }
      return m;
    };
    Data2.toObject = function toObject(m, o) {
      if (!o)
        o = {};
      var d = {};
      if (o.arrays || o.defaults) {
        d.blocksizes = [];
      }
      if (o.defaults) {
        d.Type = o.enums === String ? "Raw" : 0;
        if (o.bytes === String)
          d.Data = "";
        else {
          d.Data = [];
          if (o.bytes !== Array)
            d.Data = $util.newBuffer(d.Data);
        }
        if ($util.Long) {
          var n = new $util.Long(0, 0, true);
          d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
        } else
          d.filesize = o.longs === String ? "0" : 0;
        if ($util.Long) {
          var n = new $util.Long(0, 0, true);
          d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
        } else
          d.hashType = o.longs === String ? "0" : 0;
        if ($util.Long) {
          var n = new $util.Long(0, 0, true);
          d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
        } else
          d.fanout = o.longs === String ? "0" : 0;
        d.mode = 0;
        d.mtime = null;
      }
      if (m.Type != null && m.hasOwnProperty("Type")) {
        d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
      }
      if (m.Data != null && m.hasOwnProperty("Data")) {
        d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
      }
      if (m.filesize != null && m.hasOwnProperty("filesize")) {
        if (typeof m.filesize === "number")
          d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
        else
          d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
      }
      if (m.blocksizes && m.blocksizes.length) {
        d.blocksizes = [];
        for (var j = 0; j < m.blocksizes.length; ++j) {
          if (typeof m.blocksizes[j] === "number")
            d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
          else
            d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
        }
      }
      if (m.hashType != null && m.hasOwnProperty("hashType")) {
        if (typeof m.hashType === "number")
          d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
        else
          d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
      }
      if (m.fanout != null && m.hasOwnProperty("fanout")) {
        if (typeof m.fanout === "number")
          d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
        else
          d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
      }
      if (m.mode != null && m.hasOwnProperty("mode")) {
        d.mode = m.mode;
      }
      if (m.mtime != null && m.hasOwnProperty("mtime")) {
        d.mtime = $root.UnixTime.toObject(m.mtime, o);
      }
      return d;
    };
    Data2.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, import_minimal.default.util.toJSONOptions);
    };
    Data2.DataType = function() {
      const valuesById = {}, values = Object.create(valuesById);
      values[valuesById[0] = "Raw"] = 0;
      values[valuesById[1] = "Directory"] = 1;
      values[valuesById[2] = "File"] = 2;
      values[valuesById[3] = "Metadata"] = 3;
      values[valuesById[4] = "Symlink"] = 4;
      values[valuesById[5] = "HAMTShard"] = 5;
      return values;
    }();
    return Data2;
  })();
  var UnixTime = $root.UnixTime = (() => {
    function UnixTime2(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null)
            this[ks[i]] = p[ks[i]];
      }
    }
    UnixTime2.prototype.Seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    UnixTime2.prototype.FractionalNanoseconds = 0;
    UnixTime2.encode = function encode3(m, w) {
      if (!w)
        w = $Writer.create();
      w.uint32(8).int64(m.Seconds);
      if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
        w.uint32(21).fixed32(m.FractionalNanoseconds);
      return w;
    };
    UnixTime2.decode = function decode5(r, l) {
      if (!(r instanceof $Reader))
        r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l, m = new $root.UnixTime();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.Seconds = r.int64();
            break;
          case 2:
            m.FractionalNanoseconds = r.fixed32();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      if (!m.hasOwnProperty("Seconds"))
        throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
      return m;
    };
    UnixTime2.fromObject = function fromObject(d) {
      if (d instanceof $root.UnixTime)
        return d;
      var m = new $root.UnixTime();
      if (d.Seconds != null) {
        if ($util.Long)
          (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
        else if (typeof d.Seconds === "string")
          m.Seconds = parseInt(d.Seconds, 10);
        else if (typeof d.Seconds === "number")
          m.Seconds = d.Seconds;
        else if (typeof d.Seconds === "object")
          m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
      }
      if (d.FractionalNanoseconds != null) {
        m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
      }
      return m;
    };
    UnixTime2.toObject = function toObject(m, o) {
      if (!o)
        o = {};
      var d = {};
      if (o.defaults) {
        if ($util.Long) {
          var n = new $util.Long(0, 0, false);
          d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
        } else
          d.Seconds = o.longs === String ? "0" : 0;
        d.FractionalNanoseconds = 0;
      }
      if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
        if (typeof m.Seconds === "number")
          d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
        else
          d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
      }
      if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
        d.FractionalNanoseconds = m.FractionalNanoseconds;
      }
      return d;
    };
    UnixTime2.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, import_minimal.default.util.toJSONOptions);
    };
    return UnixTime2;
  })();
  var Metadata = $root.Metadata = (() => {
    function Metadata2(p) {
      if (p) {
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
          if (p[ks[i]] != null)
            this[ks[i]] = p[ks[i]];
      }
    }
    Metadata2.prototype.MimeType = "";
    Metadata2.encode = function encode3(m, w) {
      if (!w)
        w = $Writer.create();
      if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
        w.uint32(10).string(m.MimeType);
      return w;
    };
    Metadata2.decode = function decode5(r, l) {
      if (!(r instanceof $Reader))
        r = $Reader.create(r);
      var c = l === void 0 ? r.len : r.pos + l, m = new $root.Metadata();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.MimeType = r.string();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    Metadata2.fromObject = function fromObject(d) {
      if (d instanceof $root.Metadata)
        return d;
      var m = new $root.Metadata();
      if (d.MimeType != null) {
        m.MimeType = String(d.MimeType);
      }
      return m;
    };
    Metadata2.toObject = function toObject(m, o) {
      if (!o)
        o = {};
      var d = {};
      if (o.defaults) {
        d.MimeType = "";
      }
      if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
        d.MimeType = m.MimeType;
      }
      return d;
    };
    Metadata2.prototype.toJSON = function toJSON() {
      return this.constructor.toObject(this, import_minimal.default.util.toJSONOptions);
    };
    return Metadata2;
  })();

  // ../../node_modules/ipfs-unixfs/esm/src/index.js
  var DEFAULT_FILE_MODE = parseInt("0644", 8);
  var DEFAULT_DIRECTORY_MODE = parseInt("0755", 8);
  function parseMode(mode) {
    if (mode == null) {
      return void 0;
    }
    if (typeof mode === "number") {
      return mode & 4095;
    }
    mode = mode.toString();
    if (mode.substring(0, 1) === "0") {
      return parseInt(mode, 8) & 4095;
    }
    return parseInt(mode, 10) & 4095;
  }
  function parseMtime(input) {
    if (input == null) {
      return void 0;
    }
    let mtime;
    if (input.secs != null) {
      mtime = {
        secs: input.secs,
        nsecs: input.nsecs
      };
    }
    if (input.Seconds != null) {
      mtime = {
        secs: input.Seconds,
        nsecs: input.FractionalNanoseconds
      };
    }
    if (Array.isArray(input)) {
      mtime = {
        secs: input[0],
        nsecs: input[1]
      };
    }
    if (input instanceof Date) {
      const ms = input.getTime();
      const secs = Math.floor(ms / 1e3);
      mtime = {
        secs,
        nsecs: (ms - secs * 1e3) * 1e3
      };
    }
    if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
      return void 0;
    }
    if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
      throw (0, import_err_code.default)(new Error("mtime-nsecs must be within the range [0,999999999]"), "ERR_INVALID_MTIME_NSECS");
    }
    return mtime;
  }

  // ../../node_modules/ipfs-message-port-client/src/core.js
  var import_it_peekable = __toESM(require_it_peekable(), 1);
  var import_err_code2 = __toESM(require_err_code(), 1);
  var CoreClient = class extends Client {
    constructor(transport) {
      super("core", ["add", "addAll", "cat", "ls"], transport);
    }
  };
  CoreClient.prototype.addAll = async function* addAll(input, options = {}) {
    const { timeout, signal } = options;
    const transfer = options.transfer || /* @__PURE__ */ new Set();
    const progressCallback = options.progress ? encodeCallback(options.progress, transfer) : void 0;
    const result = await this.remote.addAll({
      ...options,
      input: encodeAddAllInput(input, transfer),
      progress: void 0,
      progressCallback,
      transfer,
      timeout,
      signal
    });
    yield* decodeIterable(result.data, decodeAddedData);
  };
  CoreClient.prototype.add = async function add(input, options = {}) {
    const { timeout, signal } = options;
    const transfer = options.transfer || /* @__PURE__ */ new Set();
    const progressCallback = options.progress ? encodeCallback(options.progress, transfer) : void 0;
    const result = await this.remote.add({
      ...options,
      input: await encodeAddInput(input, transfer),
      progress: void 0,
      progressCallback,
      transfer,
      timeout,
      signal
    });
    return decodeAddedData(result.data);
  };
  CoreClient.prototype.cat = async function* cat(inputPath, options = {}) {
    const cid = CID.asCID(inputPath);
    const input = cid ? encodeCID2(cid) : inputPath;
    const result = await this.remote.cat({ ...options, path: input });
    yield* decodeIterable(result.data, identity);
  };
  CoreClient.prototype.ls = async function* ls(inputPath, options = {}) {
    const cid = CID.asCID(inputPath);
    const input = cid ? encodeCID2(cid) : inputPath;
    const result = await this.remote.ls({ ...options, path: input });
    yield* decodeIterable(result.data, decodeLsEntry);
  };
  var decodeAddedData = ({ path, cid, mode, mtime, size }) => {
    return {
      path,
      cid: decodeCID(cid),
      mode,
      mtime,
      size
    };
  };
  var decodeLsEntry = ({ name, path, size, cid, type, mode, mtime }) => ({
    cid: decodeCID(cid),
    type,
    name,
    path,
    mode,
    mtime,
    size
  });
  var identity = (v) => v;
  var encodeAddInput = async (input, transfer) => {
    if (input instanceof Blob) {
      return input;
    } else if (typeof input === "string") {
      return input;
    } else if (input instanceof ArrayBuffer) {
      return input;
    } else if (ArrayBuffer.isView(input)) {
      return input;
    } else {
      const iterable = asIterable(input);
      if (iterable) {
        return encodeIterable(await ensureIsByteStream(iterable), encodeIterableContent, transfer);
      }
      const asyncIterable = asAsyncIterable(input);
      if (asyncIterable) {
        return encodeIterable(await ensureIsByteStream(asyncIterable), encodeAsyncIterableContent, transfer);
      }
      const readableStream = asReadableStream(input);
      if (readableStream) {
        return encodeIterable(await ensureIsByteStream((0, import_browser_readablestream_to_it.default)(readableStream)), encodeAsyncIterableContent, transfer);
      }
      const file = asFileObject(input);
      if (file) {
        return encodeFileObject(file, transfer);
      }
      throw TypeError("Unexpected input: " + typeof input);
    }
  };
  var encodeAddAllInput = (input, transfer) => {
    const iterable = asIterable(input);
    if (iterable) {
      return encodeIterable(iterable, encodeIterableContent, transfer);
    }
    const asyncIterable = asAsyncIterable(input);
    if (asyncIterable) {
      return encodeIterable(asyncIterable, encodeAsyncIterableContent, transfer);
    }
    const readableStream = asReadableStream(input);
    if (readableStream) {
      return encodeIterable((0, import_browser_readablestream_to_it.default)(readableStream), encodeAsyncIterableContent, transfer);
    }
    throw TypeError("Unexpected input: " + typeof input);
  };
  var encodeAsyncIterableContent = (content, transfer) => {
    if (content instanceof ArrayBuffer) {
      return content;
    } else if (ArrayBuffer.isView(content)) {
      return content;
    } else if (content instanceof Blob) {
      return { path: "", content };
    } else if (typeof content === "string") {
      return { path: "", content };
    } else {
      const file = asFileObject(content);
      if (file) {
        return encodeFileObject(file, transfer);
      } else {
        throw TypeError("Unexpected input: " + typeof content);
      }
    }
  };
  var encodeIterableContent = (content, transfer) => {
    if (typeof content === "number") {
      throw TypeError("Iterable of numbers is not supported");
    } else if (content instanceof ArrayBuffer) {
      return content;
    } else if (ArrayBuffer.isView(content)) {
      return content;
    } else if (content instanceof Blob) {
      return { path: "", content };
    } else if (typeof content === "string") {
      return { path: "", content };
    } else {
      const file = asFileObject(content);
      if (file) {
        return encodeFileObject(file, transfer);
      } else {
        throw TypeError("Unexpected input: " + typeof content);
      }
    }
  };
  var encodeFileObject = ({ path, mode, mtime, content }, transfer) => {
    const output = {
      path,
      mode: parseMode(mode),
      mtime: parseMtime(mtime)
    };
    if (content) {
      output.content = encodeFileContent(content, transfer);
    }
    return output;
  };
  var encodeFileContent = (content, transfer) => {
    if (content == null) {
      return "";
    } else if (content instanceof ArrayBuffer || ArrayBuffer.isView(content)) {
      return content;
    } else if (content instanceof Blob) {
      return content;
    } else if (typeof content === "string") {
      return content;
    } else {
      const iterable = asIterable(content);
      if (iterable) {
        return encodeIterable(iterable, encodeIterableContent, transfer);
      }
      const asyncIterable = asAsyncIterable(content);
      if (asyncIterable) {
        return encodeIterable(asyncIterable, encodeAsyncIterableContent, transfer);
      }
      const readableStream = asReadableStream(content);
      if (readableStream) {
        return encodeIterable((0, import_browser_readablestream_to_it.default)(readableStream), encodeAsyncIterableContent, transfer);
      }
      throw TypeError("Unexpected input: " + typeof content);
    }
  };
  var asIterable = (input) => {
    const object = input;
    if (object && typeof object[Symbol.iterator] === "function") {
      return object;
    } else {
      return null;
    }
  };
  var asAsyncIterable = (input) => {
    const object = input;
    if (object && typeof object[Symbol.asyncIterator] === "function") {
      return object;
    } else {
      return null;
    }
  };
  var asReadableStream = (input) => {
    if (input && typeof input.getReader === "function") {
      return input;
    } else {
      return null;
    }
  };
  var asFileObject = (input) => {
    if (typeof input === "object" && (input.path || input.content)) {
      return input;
    } else {
      return null;
    }
  };
  var ensureIsByteStream = async (input) => {
    const peekable = (0, import_it_peekable.default)(input);
    const { value, done } = await peekable.peek();
    if (done) {
      return [];
    }
    peekable.push(value);
    if (Number.isInteger(value) || isBytes(value) || typeof value === "string" || value instanceof String) {
      return peekable;
    }
    throw (0, import_err_code2.default)(new Error("Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead"), "ERR_UNEXPECTED_INPUT");
  };
  function isBytes(obj) {
    return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer;
  }

  // ../../node_modules/ipfs-message-port-client/src/files.js
  init_define_process();
  var FilesClient = class extends Client {
    constructor(transport) {
      super("files", ["stat"], transport);
    }
  };
  FilesClient.prototype.stat = async function stat2(pathOrCID, options = {}) {
    const { size, hash, withLocal, timeout, signal } = options;
    const { stat: stat3 } = await this.remote.stat({
      path: encodeLocation(pathOrCID),
      size,
      hash,
      withLocal,
      timeout,
      signal
    });
    return decodeStat(stat3);
  };
  var encodeLocation = (pathOrCID) => {
    const cid = CID.asCID(pathOrCID);
    return cid ? `/ipfs/${pathOrCID.toString()}` : pathOrCID.toString();
  };
  var decodeStat = (data) => {
    return { ...data, cid: decodeCID(data.cid) };
  };

  // ../../node_modules/ipfs-message-port-client/src/index.js
  var IPFSClient = class extends CoreClient {
    constructor(transport) {
      super(transport);
      this.transport = transport;
      this.dag = new DAGClient(this.transport);
      this.files = new FilesClient(this.transport);
      this.block = new BlockClient(this.transport);
    }
    static attach(self2, port) {
      self2.transport.connect(port);
    }
    static detached() {
      return new IPFSClient(new MessageTransport(void 0));
    }
    static from(port) {
      return new IPFSClient(new MessageTransport(port));
    }
  };

  // sw.mjs
  var import_throttle = __toESM(require_throttle(), 1);
  var import_debounce = __toESM(require_debounce(), 1);

  // ../../node_modules/p-map/index.js
  init_define_process();

  // ../../node_modules/p-map/node_modules/aggregate-error/index.js
  init_define_process();

  // ../../node_modules/p-map/node_modules/indent-string/index.js
  init_define_process();
  function indentString(string, count = 1, options = {}) {
    const {
      indent = " ",
      includeEmptyLines = false
    } = options;
    if (typeof string !== "string") {
      throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof string}\``);
    }
    if (typeof count !== "number") {
      throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
    }
    if (count < 0) {
      throw new RangeError(`Expected \`count\` to be at least 0, got \`${count}\``);
    }
    if (typeof indent !== "string") {
      throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``);
    }
    if (count === 0) {
      return string;
    }
    const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
    return string.replace(regex, indent.repeat(count));
  }

  // ../../node_modules/p-map/node_modules/clean-stack/index.js
  init_define_process();
  var import_os = __toESM(require_os(), 1);

  // ../../node_modules/p-map/node_modules/escape-string-regexp/index.js
  init_define_process();
  function escapeStringRegexp(string) {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  // ../../node_modules/p-map/node_modules/clean-stack/index.js
  var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
  var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
  var homeDir = typeof import_os.default.homedir === "undefined" ? "" : import_os.default.homedir().replace(/\\/g, "/");
  function cleanStack(stack, { pretty = false, basePath } = {}) {
    const basePathRegex = basePath && new RegExp(`(at | \\()${escapeStringRegexp(basePath.replace(/\\/g, "/"))}`, "g");
    if (typeof stack !== "string") {
      return void 0;
    }
    return stack.replace(/\\/g, "/").split("\n").filter((line) => {
      const pathMatches = line.match(extractPathRegex);
      if (pathMatches === null || !pathMatches[1]) {
        return true;
      }
      const match = pathMatches[1];
      if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar") || match.includes("node_modules/electron/dist/resources/electron.asar") || match.includes("node_modules/electron/dist/resources/default_app.asar")) {
        return false;
      }
      return !pathRegex.test(match);
    }).filter((line) => line.trim() !== "").map((line) => {
      if (basePathRegex) {
        line = line.replace(basePathRegex, "$1");
      }
      if (pretty) {
        line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
      }
      return line;
    }).join("\n");
  }

  // ../../node_modules/p-map/node_modules/aggregate-error/index.js
  var cleanInternalStack = (stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
  var AggregateError = class extends Error {
    #errors;
    name = "AggregateError";
    constructor(errors) {
      if (!Array.isArray(errors)) {
        throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
      }
      errors = errors.map((error) => {
        if (error instanceof Error) {
          return error;
        }
        if (error !== null && typeof error === "object") {
          return Object.assign(new Error(error.message), error);
        }
        return new Error(error);
      });
      let message = errors.map((error) => {
        return typeof error.stack === "string" && error.stack.length > 0 ? cleanInternalStack(cleanStack(error.stack)) : String(error);
      }).join("\n");
      message = "\n" + indentString(message, 4);
      super(message);
      this.#errors = errors;
    }
    get errors() {
      return this.#errors.slice();
    }
  };

  // ../../node_modules/p-map/index.js
  var AbortError2 = class extends Error {
    constructor(message) {
      super();
      this.name = "AbortError";
      this.message = message;
    }
  };
  var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError2(errorMessage) : new DOMException(errorMessage);
  var getAbortedReason = (signal) => {
    const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
    return reason instanceof Error ? reason : getDOMException(reason);
  };
  async function pMap(iterable, mapper2, {
    concurrency = Number.POSITIVE_INFINITY,
    stopOnError = true,
    signal
  } = {}) {
    return new Promise((resolve2, reject_) => {
      if (iterable[Symbol.iterator] === void 0 && iterable[Symbol.asyncIterator] === void 0) {
        throw new TypeError(`Expected \`input\` to be either an \`Iterable\` or \`AsyncIterable\`, got (${typeof iterable})`);
      }
      if (typeof mapper2 !== "function") {
        throw new TypeError("Mapper function is required");
      }
      if (!((Number.isSafeInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency >= 1)) {
        throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
      }
      const result = [];
      const errors = [];
      const skippedIndexesMap = /* @__PURE__ */ new Map();
      let isRejected = false;
      let isResolved = false;
      let isIterableDone = false;
      let resolvingCount = 0;
      let currentIndex = 0;
      const iterator = iterable[Symbol.iterator] === void 0 ? iterable[Symbol.asyncIterator]() : iterable[Symbol.iterator]();
      const reject = (reason) => {
        isRejected = true;
        isResolved = true;
        reject_(reason);
      };
      if (signal) {
        if (signal.aborted) {
          reject(getAbortedReason(signal));
        }
        signal.addEventListener("abort", () => {
          reject(getAbortedReason(signal));
        });
      }
      const next = async () => {
        if (isResolved) {
          return;
        }
        const nextItem = await iterator.next();
        const index = currentIndex;
        currentIndex++;
        if (nextItem.done) {
          isIterableDone = true;
          if (resolvingCount === 0 && !isResolved) {
            if (!stopOnError && errors.length > 0) {
              reject(new AggregateError(errors));
              return;
            }
            isResolved = true;
            if (skippedIndexesMap.size === 0) {
              resolve2(result);
              return;
            }
            const pureResult = [];
            for (const [index2, value] of result.entries()) {
              if (skippedIndexesMap.get(index2) === pMapSkip) {
                continue;
              }
              pureResult.push(value);
            }
            resolve2(pureResult);
          }
          return;
        }
        resolvingCount++;
        (async () => {
          try {
            const element = await nextItem.value;
            if (isResolved) {
              return;
            }
            const value = await mapper2(element, index);
            if (value === pMapSkip) {
              skippedIndexesMap.set(index, value);
            }
            result[index] = value;
            resolvingCount--;
            await next();
          } catch (error) {
            if (stopOnError) {
              reject(error);
            } else {
              errors.push(error);
              resolvingCount--;
              try {
                await next();
              } catch (error2) {
                reject(error2);
              }
            }
          }
        })();
      };
      (async () => {
        for (let index = 0; index < concurrency; index++) {
          try {
            await next();
          } catch (error) {
            reject(error);
            break;
          }
          if (isIterableDone || isRejected) {
            break;
          }
        }
      })();
    });
  }
  var pMapSkip = Symbol("skip");

  // sw.mjs
  var oninstall = async (event) => {
    event.waitUntil(event.target.skipWaiting());
  };
  var cache = {};
  var hashResp = {};
  async function update() {
    const filesResp = await fetch("/files.json");
    const files = await filesResp.json();
    if (files) {
      cache = files;
    }
  }
  var updateCacheNOW = (0, import_debounce.default)(update, 500);
  var updateCache = (0, import_throttle.default)(update, 6e4);
  var onactivate = async (event) => {
    event.waitUntil(event.target.clients.claim());
  };
  var mapper = async (name) => {
    const withHash = cache[name];
    if (hashResp[withHash] && hashResp[withHash].ok) {
      const resp = await fetch(new URL(withHash, location.origin));
      if (resp.ok) {
        const blob = await resp.blob();
        hashResp[withHash] = new Response(blob, {
          url: new URL(name, location.origin)
        });
      }
    }
  };
  function onPeriodicSync(event) {
    if (event.tag == "get-latest-news") {
      event.waitUntil((async () => {
        await update();
        await pMap(Object.keys(cache), mapper, { concurrency: 2 });
      })());
    }
  }
  async function wait(delay) {
    return new Promise((resolve2) => {
      setTimeout(() => {
        resolve2();
      }, delay);
    });
  }
  var onfetch = (event) => {
    updateCache();
    const url = new URL(event.request.url);
    const loc = url.pathname.slice(1);
    if (cache[loc]) {
      return event.respondWith((async () => {
        if (!hashResp[cache[loc]]) {
          let resp = await fetch(new URL(cache[loc], location.origin));
          if (!resp.ok) {
            updateCacheNOW();
            await wait(1e3);
            resp = await fetch(new URL(cache[loc], location.origin));
          }
          if (!resp.ok)
            return resp.clone();
          const blob = await resp.blob();
          hashResp[cache[loc]] = new Response(blob, {
            request: event.request,
            url: event.request.url
          });
        }
        return hashResp[cache[loc]].clone();
      })());
    }
    try {
      switch (url.origin) {
        case location.origin: {
          const paths = url.pathname.split("/");
          if (paths.length > 2) {
            const protocol = paths[1];
            switch (protocol) {
              case "ipfs":
              case "ipns": {
                return event.respondWith(fetchViewer(url));
              }
              case "view": {
                console.log("VIEW! Fetching the content: " + url.pathname.slice(protocol.length + 1));
                return fetchContent({
                  event,
                  path: url.pathname.slice(protocol.length + 1)
                });
              }
              default:
                return event.respondWith(fetch(event.request).catch((e) => console.log({ url, event })));
            }
          }
        }
        default:
          try {
            const req = event.request.clone();
            return event.respondWith(fetch(req).catch((e) => console.log({ url, req })));
          } catch (err2) {
            console.log({ err2 });
            console.error(url);
          }
      }
    } catch (err) {
      console.log(err);
      console.error(url);
    }
  };
  var fetchViewer = async (url) => {
    const body = new Blob([`<html lang="en">
<head>
  <title>${url.pathname}</title>
</head>
<body>
<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${url.pathname}"></iframe>  
  <script type="module" src="/js/ws.mjs"><\/script>
  </body>
</html>
`], { type: "text/html" });
    return new Response(body, {
      status: 200
    });
  };
  var fetchContent = async ({ event, path }) => {
    const [, protocol] = path.split("/");
    switch (protocol) {
      case "ipns":
        return event.respondWith(fetchIPNSContent({
          event,
          path
        }));
      case "ipfs":
        return event.respondWith(fetchIPFSContent({
          event,
          path
        }));
      default:
        const response = await unsupportedProtocol(protocol);
        return event.respondWith(response);
    }
  };
  var fetchIPNSContent = async ({}) => {
    return new Response(`<html>
  <body>
    <h1>IPNS protocol support is not implemented</h1>
    <p>It is left as an excercise to the viewer</p>
  </body>
</html>`, {
      statusText: "IPNS support is not implemented",
      status: 502
    });
  };
  var fetchIPFSContent = async ({ event, path }) => {
    console.log("IPFS");
    const ipfs = await createIPFSClient(event);
    console.log({ ipfs });
    try {
      const stat3 = await ipfs.files.stat(path);
      switch (stat3.type) {
        case "file": {
          return await fetchIPFSFile(ipfs, path);
        }
        case "directory": {
          if (!path.endsWith("/")) {
            return Response.redirect(`${event.request.url}/`);
          } else {
            const index = `${path}index.html`;
            const stat4 = await ipfs.files.stat(index).catch(() => ({
              type: null
            }));
            return stat4.type === "file" ? fetchIPFSFile(ipfs, index) : await fetchIPFSDirectory(ipfs, path);
          }
        }
        default: {
          return Response.redirect(`https://explore.ipld.io/#/explore${path}`);
        }
      }
    } catch (err3) {
      console.error({ err3 });
      if (!(err3 && err3.message))
        return;
      const { message } = err3;
      if (message.startsWith("no link named") || message.includes("does not exist")) {
        return new Response(message, {
          statusText: message,
          status: 404
        });
      }
      if (message.includes("invalid")) {
        return new Response(message, {
          statusText: message,
          status: 400
        });
      }
      return new Response(message, {
        statusText: message,
        status: 500
      });
    }
  };
  var fetchIPFSFile = async (ipfs, path) => {
    const content = ipfs.cat(path);
    const body = toReadableStream(content);
    const contentType = path.endsWith(".svg") ? { "content-type": "image/svg+xml" } : null;
    return new Response(body, {
      status: 200,
      headers: {
        ...contentType
      }
    });
  };
  var fetchIPFSDirectory = async (ipfs, path) => {
    return new Response(toReadableStream(renderDirectory(ipfs, path)), {
      headers: {
        "content-type": "text/html"
      },
      status: 200
    });
  };
  var renderDirectory = async function* (ipfs, path, limit = 64) {
    const encoder = new TextEncoder();
    yield encoder.encode(`<html><h3>Index of ${path}<h3><ul>`);
    for await (const entry of ipfs.ls(path)) {
      yield encoder.encode(renderDirectoryEntry(path, entry));
      if (--limit < 0) {
        break;
      }
    }
    yield encoder.encode(`</ul>${limit < 0 ? PAGINATION_NOTE : ""}</html>`);
  };
  var PAGINATION_NOTE = "<h2>Directory has too many entries</h2><p><mark>Implementing a pagination is left as an excercise to the viewer</mark></p></h2>";
  var renderDirectoryEntry = (base2, entry) => `<li>
  <div class="type-${entry.type}"><a href="/view${base2}${entry.name}">${entry.name}<a></div>
  <small>${entry.cid.toString()}</small>
  <details><pre>${JSON.stringify(entry, null, 2)}</pre></details>
</li>`;
  var unsupportedProtocol = async (protocol) => {
    return new Response(`<html>
    <body>
      <h1>Protocol ${protocol} is not supported</h1>
    </body>
</html>`, {
      statusText: `Unsupported protocol ${protocol}`,
      status: 405
    });
  };
  var createIPFSClient = async (context) => {
    console.log("SELECTING  THE CLIENT");
    const client = await selectClient(context.target);
    console.log("The client is...", client);
    const port = await requestIPFSPort(client);
    console.log("The port is:", port);
    return IPFSClient.from(port);
  };
  var portRequests = {};
  var requestIPFSPort = (client) => {
    const request = portRequests[client.id];
    if (request == null) {
      const request2 = defer();
      portRequests[client.id] = request2;
      client.postMessage({
        method: "ipfs-message-port",
        id: client.id
      });
      return request2.promise;
    } else {
      return request.promise;
    }
  };
  var onmessage = ({ data }) => {
    if (data) {
      const request = portRequests[data.id];
      if (request != null) {
        delete portRequests[data.id];
        if (data.port instanceof MessagePort) {
          request.resolve(data.port);
        } else {
          request.reject(new Error(data.error));
        }
      }
    }
  };
  var setup = (self2) => {
    self2.oninstall = oninstall;
    self2.onactivate = onactivate;
    self2.onfetch = onfetch;
    self2.onmessage = onmessage;
    self2.onperiodicsync = onPeriodicSync;
  };
  setup(self);
})();
