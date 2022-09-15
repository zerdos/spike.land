import {
  __commonJS,
  __esm,
  __export,
  __name,
  __toESM,
  init_define_process
} from "./chunk-chunk-S6BTEEN4.mjs";

// ../../node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "../../node_modules/base64-js/index.js"(exports) {
    "use strict";
    init_define_process();
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i4 = 0, len = code.length; i4 < len; ++i4) {
      lookup[i4] = code[i4];
      revLookup[code.charCodeAt(i4)] = i4;
    }
    var i4;
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
      var i5;
      for (i5 = 0; i5 < len2; i5 += 4) {
        tmp = revLookup[b64.charCodeAt(i5)] << 18 | revLookup[b64.charCodeAt(i5 + 1)] << 12 | revLookup[b64.charCodeAt(i5 + 2)] << 6 | revLookup[b64.charCodeAt(i5 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i5)] << 2 | revLookup[b64.charCodeAt(i5 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i5)] << 10 | revLookup[b64.charCodeAt(i5 + 1)] << 4 | revLookup[b64.charCodeAt(i5 + 2)] >> 2;
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
      for (var i5 = start; i5 < end; i5 += 3) {
        tmp = (uint8[i5] << 16 & 16711680) + (uint8[i5 + 1] << 8 & 65280) + (uint8[i5 + 2] & 255);
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
      for (var i5 = 0, len22 = len2 - extraBytes; i5 < len22; i5 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i5, i5 + maxChunkLength > len22 ? len22 : i5 + maxChunkLength));
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

// ../../node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "../../node_modules/ieee754/index.js"(exports) {
    init_define_process();
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e4, m4;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i4 = isLE ? nBytes - 1 : 0;
      var d4 = isLE ? -1 : 1;
      var s4 = buffer[offset + i4];
      i4 += d4;
      e4 = s4 & (1 << -nBits) - 1;
      s4 >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e4 = e4 * 256 + buffer[offset + i4], i4 += d4, nBits -= 8) {
      }
      m4 = e4 & (1 << -nBits) - 1;
      e4 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m4 = m4 * 256 + buffer[offset + i4], i4 += d4, nBits -= 8) {
      }
      if (e4 === 0) {
        e4 = 1 - eBias;
      } else if (e4 === eMax) {
        return m4 ? NaN : (s4 ? -1 : 1) * Infinity;
      } else {
        m4 = m4 + Math.pow(2, mLen);
        e4 = e4 - eBias;
      }
      return (s4 ? -1 : 1) * m4 * Math.pow(2, e4 - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e4, m4, c4;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i4 = isLE ? 0 : nBytes - 1;
      var d4 = isLE ? 1 : -1;
      var s4 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m4 = isNaN(value) ? 1 : 0;
        e4 = eMax;
      } else {
        e4 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c4 = Math.pow(2, -e4)) < 1) {
          e4--;
          c4 *= 2;
        }
        if (e4 + eBias >= 1) {
          value += rt / c4;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c4 >= 2) {
          e4++;
          c4 /= 2;
        }
        if (e4 + eBias >= eMax) {
          m4 = 0;
          e4 = eMax;
        } else if (e4 + eBias >= 1) {
          m4 = (value * c4 - 1) * Math.pow(2, mLen);
          e4 = e4 + eBias;
        } else {
          m4 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e4 = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i4] = m4 & 255, i4 += d4, m4 /= 256, mLen -= 8) {
      }
      e4 = e4 << mLen | m4;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i4] = e4 & 255, i4 += d4, e4 /= 256, eLen -= 8) {
      }
      buffer[offset + i4 - d4] |= s4 * 128;
    };
  }
});

// ../../node_modules/buffer/index.js
var require_buffer = __commonJS({
  "../../node_modules/buffer/index.js"(exports) {
    "use strict";
    init_define_process();
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
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
      } catch (e4) {
        return false;
      }
    }
    __name(typedArraySupport, "typedArraySupport");
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    __name(createBuffer, "createBuffer");
    function Buffer2(arg, encodingOrOffset, length) {
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
    __name(Buffer2, "Buffer");
    Buffer2.poolSize = 8192;
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
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b4 = fromObject(value);
      if (b4)
        return b4;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    __name(from, "from");
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
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
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    __name(allocUnsafe, "allocUnsafe");
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
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
      for (let i4 = 0; i4 < length; i4 += 1) {
        buf[i4] = array[i4] & 255;
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
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    __name(fromArrayBuffer, "fromArrayBuffer");
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
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
      return Buffer2.alloc(+length);
    }
    __name(SlowBuffer, "SlowBuffer");
    Buffer2.isBuffer = /* @__PURE__ */ __name(function isBuffer(b4) {
      return b4 != null && b4._isBuffer === true && b4 !== Buffer2.prototype;
    }, "isBuffer");
    Buffer2.compare = /* @__PURE__ */ __name(function compare(a4, b4) {
      if (isInstance(a4, Uint8Array))
        a4 = Buffer2.from(a4, a4.offset, a4.byteLength);
      if (isInstance(b4, Uint8Array))
        b4 = Buffer2.from(b4, b4.offset, b4.byteLength);
      if (!Buffer2.isBuffer(a4) || !Buffer2.isBuffer(b4)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a4 === b4)
        return 0;
      let x5 = a4.length;
      let y4 = b4.length;
      for (let i4 = 0, len = Math.min(x5, y4); i4 < len; ++i4) {
        if (a4[i4] !== b4[i4]) {
          x5 = a4[i4];
          y4 = b4[i4];
          break;
        }
      }
      if (x5 < y4)
        return -1;
      if (y4 < x5)
        return 1;
      return 0;
    }, "compare");
    Buffer2.isEncoding = /* @__PURE__ */ __name(function isEncoding(encoding) {
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
    Buffer2.concat = /* @__PURE__ */ __name(function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i4;
      if (length === void 0) {
        length = 0;
        for (i4 = 0; i4 < list.length; ++i4) {
          length += list[i4].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i4 = 0; i4 < list.length; ++i4) {
        let buf = list[i4];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    }, "concat");
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
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
    Buffer2.byteLength = byteLength;
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
    Buffer2.prototype._isBuffer = true;
    function swap(b4, n3, m4) {
      const i4 = b4[n3];
      b4[n3] = b4[m4];
      b4[m4] = i4;
    }
    __name(swap, "swap");
    Buffer2.prototype.swap16 = /* @__PURE__ */ __name(function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i4 = 0; i4 < len; i4 += 2) {
        swap(this, i4, i4 + 1);
      }
      return this;
    }, "swap16");
    Buffer2.prototype.swap32 = /* @__PURE__ */ __name(function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i4 = 0; i4 < len; i4 += 4) {
        swap(this, i4, i4 + 3);
        swap(this, i4 + 1, i4 + 2);
      }
      return this;
    }, "swap32");
    Buffer2.prototype.swap64 = /* @__PURE__ */ __name(function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i4 = 0; i4 < len; i4 += 8) {
        swap(this, i4, i4 + 7);
        swap(this, i4 + 1, i4 + 6);
        swap(this, i4 + 2, i4 + 5);
        swap(this, i4 + 3, i4 + 4);
      }
      return this;
    }, "swap64");
    Buffer2.prototype.toString = /* @__PURE__ */ __name(function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    }, "toString");
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = /* @__PURE__ */ __name(function equals(b4) {
      if (!Buffer2.isBuffer(b4))
        throw new TypeError("Argument must be a Buffer");
      if (this === b4)
        return true;
      return Buffer2.compare(this, b4) === 0;
    }, "equals");
    Buffer2.prototype.inspect = /* @__PURE__ */ __name(function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    }, "inspect");
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = /* @__PURE__ */ __name(function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
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
      let x5 = thisEnd - thisStart;
      let y4 = end - start;
      const len = Math.min(x5, y4);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i4 = 0; i4 < len; ++i4) {
        if (thisCopy[i4] !== targetCopy[i4]) {
          x5 = thisCopy[i4];
          y4 = targetCopy[i4];
          break;
        }
      }
      if (x5 < y4)
        return -1;
      if (y4 < x5)
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
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
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
      function read(buf, i5) {
        if (indexSize === 1) {
          return buf[i5];
        } else {
          return buf.readUInt16BE(i5 * indexSize);
        }
      }
      __name(read, "read");
      let i4;
      if (dir) {
        let foundIndex = -1;
        for (i4 = byteOffset; i4 < arrLength; i4++) {
          if (read(arr, i4) === read(val, foundIndex === -1 ? 0 : i4 - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i4;
            if (i4 - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i4 -= i4 - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i4 = byteOffset; i4 >= 0; i4--) {
          let found = true;
          for (let j5 = 0; j5 < valLength; j5++) {
            if (read(arr, i4 + j5) !== read(val, j5)) {
              found = false;
              break;
            }
          }
          if (found)
            return i4;
        }
      }
      return -1;
    }
    __name(arrayIndexOf, "arrayIndexOf");
    Buffer2.prototype.includes = /* @__PURE__ */ __name(function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    }, "includes");
    Buffer2.prototype.indexOf = /* @__PURE__ */ __name(function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    }, "indexOf");
    Buffer2.prototype.lastIndexOf = /* @__PURE__ */ __name(function lastIndexOf(val, byteOffset, encoding) {
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
      let i4;
      for (i4 = 0; i4 < length; ++i4) {
        const parsed = parseInt(string.substr(i4 * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i4;
        buf[offset + i4] = parsed;
      }
      return i4;
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
    Buffer2.prototype.write = /* @__PURE__ */ __name(function write(string, offset, length, encoding) {
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
    Buffer2.prototype.toJSON = /* @__PURE__ */ __name(function toJSON() {
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
      let i4 = start;
      while (i4 < end) {
        const firstByte = buf[i4];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i4 + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i4 + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i4 + 1];
              thirdByte = buf[i4 + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i4 + 1];
              thirdByte = buf[i4 + 2];
              fourthByte = buf[i4 + 3];
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
        i4 += bytesPerSequence;
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
      let i4 = 0;
      while (i4 < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i4, i4 += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    __name(decodeCodePointsArray, "decodeCodePointsArray");
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i4 = start; i4 < end; ++i4) {
        ret += String.fromCharCode(buf[i4] & 127);
      }
      return ret;
    }
    __name(asciiSlice, "asciiSlice");
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i4 = start; i4 < end; ++i4) {
        ret += String.fromCharCode(buf[i4]);
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
      for (let i4 = start; i4 < end; ++i4) {
        out += hexSliceLookupTable[buf[i4]];
      }
      return out;
    }
    __name(hexSlice, "hexSlice");
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i4 = 0; i4 < bytes.length - 1; i4 += 2) {
        res += String.fromCharCode(bytes[i4] + bytes[i4 + 1] * 256);
      }
      return res;
    }
    __name(utf16leSlice, "utf16leSlice");
    Buffer2.prototype.slice = /* @__PURE__ */ __name(function slice(start, end) {
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
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    }, "slice");
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    __name(checkOffset, "checkOffset");
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = /* @__PURE__ */ __name(function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i4 = 0;
      while (++i4 < byteLength2 && (mul *= 256)) {
        val += this[offset + i4] * mul;
      }
      return val;
    }, "readUIntLE");
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = /* @__PURE__ */ __name(function readUIntBE(offset, byteLength2, noAssert) {
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
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = /* @__PURE__ */ __name(function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    }, "readUInt8");
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = /* @__PURE__ */ __name(function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    }, "readUInt16LE");
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = /* @__PURE__ */ __name(function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    }, "readUInt16BE");
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = /* @__PURE__ */ __name(function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    }, "readUInt32LE");
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = /* @__PURE__ */ __name(function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    }, "readUInt32BE");
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigUInt64LE(offset) {
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
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigUInt64BE(offset) {
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
    Buffer2.prototype.readIntLE = /* @__PURE__ */ __name(function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i4 = 0;
      while (++i4 < byteLength2 && (mul *= 256)) {
        val += this[offset + i4] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntLE");
    Buffer2.prototype.readIntBE = /* @__PURE__ */ __name(function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i4 = byteLength2;
      let mul = 1;
      let val = this[offset + --i4];
      while (i4 > 0 && (mul *= 256)) {
        val += this[offset + --i4] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    }, "readIntBE");
    Buffer2.prototype.readInt8 = /* @__PURE__ */ __name(function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    }, "readInt8");
    Buffer2.prototype.readInt16LE = /* @__PURE__ */ __name(function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16LE");
    Buffer2.prototype.readInt16BE = /* @__PURE__ */ __name(function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    }, "readInt16BE");
    Buffer2.prototype.readInt32LE = /* @__PURE__ */ __name(function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    }, "readInt32LE");
    Buffer2.prototype.readInt32BE = /* @__PURE__ */ __name(function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    }, "readInt32BE");
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigInt64LE(offset) {
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
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function readBigInt64BE(offset) {
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
    Buffer2.prototype.readFloatLE = /* @__PURE__ */ __name(function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    }, "readFloatLE");
    Buffer2.prototype.readFloatBE = /* @__PURE__ */ __name(function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    }, "readFloatBE");
    Buffer2.prototype.readDoubleLE = /* @__PURE__ */ __name(function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    }, "readDoubleLE");
    Buffer2.prototype.readDoubleBE = /* @__PURE__ */ __name(function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    }, "readDoubleBE");
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    __name(checkInt, "checkInt");
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = /* @__PURE__ */ __name(function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i4 = 0;
      this[offset] = value & 255;
      while (++i4 < byteLength2 && (mul *= 256)) {
        this[offset + i4] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntLE");
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = /* @__PURE__ */ __name(function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i4 = byteLength2 - 1;
      let mul = 1;
      this[offset + i4] = value & 255;
      while (--i4 >= 0 && (mul *= 256)) {
        this[offset + i4] = value / mul & 255;
      }
      return offset + byteLength2;
    }, "writeUIntBE");
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = /* @__PURE__ */ __name(function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    }, "writeUInt8");
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = /* @__PURE__ */ __name(function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeUInt16LE");
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = /* @__PURE__ */ __name(function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeUInt16BE");
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = /* @__PURE__ */ __name(function writeUInt32LE(value, offset, noAssert) {
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
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = /* @__PURE__ */ __name(function writeUInt32BE(value, offset, noAssert) {
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
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64LE"));
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    }, "writeBigUInt64BE"));
    Buffer2.prototype.writeIntLE = /* @__PURE__ */ __name(function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i4 = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i4 < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i4 - 1] !== 0) {
          sub = 1;
        }
        this[offset + i4] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntLE");
    Buffer2.prototype.writeIntBE = /* @__PURE__ */ __name(function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i4 = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i4] = value & 255;
      while (--i4 >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i4 + 1] !== 0) {
          sub = 1;
        }
        this[offset + i4] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    }, "writeIntBE");
    Buffer2.prototype.writeInt8 = /* @__PURE__ */ __name(function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    }, "writeInt8");
    Buffer2.prototype.writeInt16LE = /* @__PURE__ */ __name(function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    }, "writeInt16LE");
    Buffer2.prototype.writeInt16BE = /* @__PURE__ */ __name(function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    }, "writeInt16BE");
    Buffer2.prototype.writeInt32LE = /* @__PURE__ */ __name(function writeInt32LE(value, offset, noAssert) {
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
    Buffer2.prototype.writeInt32BE = /* @__PURE__ */ __name(function writeInt32BE(value, offset, noAssert) {
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
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    }, "writeBigInt64LE"));
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(/* @__PURE__ */ __name(function writeBigInt64BE(value, offset = 0) {
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
    Buffer2.prototype.writeFloatLE = /* @__PURE__ */ __name(function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    }, "writeFloatLE");
    Buffer2.prototype.writeFloatBE = /* @__PURE__ */ __name(function writeFloatBE(value, offset, noAssert) {
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
    Buffer2.prototype.writeDoubleLE = /* @__PURE__ */ __name(function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    }, "writeDoubleLE");
    Buffer2.prototype.writeDoubleBE = /* @__PURE__ */ __name(function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }, "writeDoubleBE");
    Buffer2.prototype.copy = /* @__PURE__ */ __name(function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
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
    Buffer2.prototype.fill = /* @__PURE__ */ __name(function fill(val, start, end, encoding) {
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
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
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
      let i4;
      if (typeof val === "number") {
        for (i4 = start; i4 < end; ++i4) {
          this[i4] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i4 = 0; i4 < end - start; ++i4) {
          this[i4 + start] = bytes[i4 % len];
        }
      }
      return this;
    }, "fill");
    var errors = {};
    function E2(sym, getMessage, Base) {
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
    __name(E2, "E");
    E2(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E2(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E2(
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
      let i4 = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i4 >= start + 4; i4 -= 3) {
        res = `_${val.slice(i4 - 3, i4)}${res}`;
      }
      return `${val.slice(0, i4)}${res}`;
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
        const n3 = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n3} and < 2${n3} ** ${(byteLength2 + 1) * 8}${n3}`;
          } else {
            range = `>= -(2${n3} ** ${(byteLength2 + 1) * 8 - 1}${n3}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n3}`;
          }
        } else {
          range = `>= ${min}${n3} and <= ${max}${n3}`;
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
      for (let i4 = 0; i4 < length; ++i4) {
        codePoint = string.charCodeAt(i4);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i4 + 1 === length) {
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
      for (let i4 = 0; i4 < str.length; ++i4) {
        byteArray.push(str.charCodeAt(i4) & 255);
      }
      return byteArray;
    }
    __name(asciiToBytes, "asciiToBytes");
    function utf16leToBytes(str, units) {
      let c4, hi, lo;
      const byteArray = [];
      for (let i4 = 0; i4 < str.length; ++i4) {
        if ((units -= 2) < 0)
          break;
        c4 = str.charCodeAt(i4);
        hi = c4 >> 8;
        lo = c4 % 256;
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
      let i4;
      for (i4 = 0; i4 < length; ++i4) {
        if (i4 + offset >= dst.length || i4 >= src.length)
          break;
        dst[i4 + offset] = src[i4];
      }
      return i4;
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
      for (let i4 = 0; i4 < 16; ++i4) {
        const i16 = i4 * 16;
        for (let j5 = 0; j5 < 16; ++j5) {
          table[i16 + j5] = alphabet[i4] + alphabet[j5];
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

// node_modules/preact/dist/preact.module.js
var preact_module_exports = {};
__export(preact_module_exports, {
  Component: () => d,
  Fragment: () => p,
  cloneElement: () => q,
  createContext: () => B,
  createElement: () => h,
  createRef: () => y,
  h: () => h,
  hydrate: () => S,
  isValidElement: () => i,
  options: () => l,
  render: () => P,
  toChildArray: () => x
});
function s(n3, l4) {
  for (var u4 in l4)
    n3[u4] = l4[u4];
  return n3;
}
function a(n3) {
  var l4 = n3.parentNode;
  l4 && l4.removeChild(n3);
}
function h(l4, u4, i4) {
  var t3, o5, r4, f4 = {};
  for (r4 in u4)
    "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o5 = u4[r4] : f4[r4] = u4[r4];
  if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
    for (r4 in l4.defaultProps)
      void 0 === f4[r4] && (f4[r4] = l4.defaultProps[r4]);
  return v(l4, f4, t3, o5, null);
}
function v(n3, i4, t3, o5, r4) {
  var f4 = { type: n3, props: i4, key: t3, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r4 ? ++u : r4 };
  return null == r4 && null != l.vnode && l.vnode(f4), f4;
}
function y() {
  return { current: null };
}
function p(n3) {
  return n3.children;
}
function d(n3, l4) {
  this.props = n3, this.context = l4;
}
function _(n3, l4) {
  if (null == l4)
    return n3.__ ? _(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
  for (var u4; l4 < n3.__k.length; l4++)
    if (null != (u4 = n3.__k[l4]) && null != u4.__e)
      return u4.__e;
  return "function" == typeof n3.type ? _(n3) : null;
}
function k(n3) {
  var l4, u4;
  if (null != (n3 = n3.__) && null != n3.__c) {
    for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
        n3.__e = n3.__c.base = u4.__e;
        break;
      }
    return k(n3);
  }
}
function b(n3) {
  (!n3.__d && (n3.__d = true) && t.push(n3) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || setTimeout)(g);
}
function g() {
  for (var n3; g.__r = t.length; )
    n3 = t.sort(function(n4, l4) {
      return n4.__v.__b - l4.__v.__b;
    }), t = [], n3.some(function(n4) {
      var l4, u4, i4, t3, o5, r4;
      n4.__d && (o5 = (t3 = (l4 = n4).__v).__e, (r4 = l4.__P) && (u4 = [], (i4 = s({}, t3)).__v = t3.__v + 1, j(r4, t3, i4, l4.__n, void 0 !== r4.ownerSVGElement, null != t3.__h ? [o5] : null, u4, null == o5 ? _(t3) : o5, t3.__h), z(u4, t3), t3.__e != o5 && k(t3)));
    });
}
function w(n3, l4, u4, i4, t3, o5, r4, c4, s4, a4) {
  var h4, y4, d4, k5, b4, g5, w5, x5 = i4 && i4.__k || e, C4 = x5.length;
  for (u4.__k = [], h4 = 0; h4 < l4.length; h4++)
    if (null != (k5 = u4.__k[h4] = null == (k5 = l4[h4]) || "boolean" == typeof k5 ? null : "string" == typeof k5 || "number" == typeof k5 || "bigint" == typeof k5 ? v(null, k5, null, null, k5) : Array.isArray(k5) ? v(p, { children: k5 }, null, null, null) : k5.__b > 0 ? v(k5.type, k5.props, k5.key, null, k5.__v) : k5)) {
      if (k5.__ = u4, k5.__b = u4.__b + 1, null === (d4 = x5[h4]) || d4 && k5.key == d4.key && k5.type === d4.type)
        x5[h4] = void 0;
      else
        for (y4 = 0; y4 < C4; y4++) {
          if ((d4 = x5[y4]) && k5.key == d4.key && k5.type === d4.type) {
            x5[y4] = void 0;
            break;
          }
          d4 = null;
        }
      j(n3, k5, d4 = d4 || f, t3, o5, r4, c4, s4, a4), b4 = k5.__e, (y4 = k5.ref) && d4.ref != y4 && (w5 || (w5 = []), d4.ref && w5.push(d4.ref, null, k5), w5.push(y4, k5.__c || b4, k5)), null != b4 ? (null == g5 && (g5 = b4), "function" == typeof k5.type && k5.__k === d4.__k ? k5.__d = s4 = m(k5, s4, n3) : s4 = A(n3, k5, d4, x5, b4, s4), "function" == typeof u4.type && (u4.__d = s4)) : s4 && d4.__e == s4 && s4.parentNode != n3 && (s4 = _(d4));
    }
  for (u4.__e = g5, h4 = C4; h4--; )
    null != x5[h4] && ("function" == typeof u4.type && null != x5[h4].__e && x5[h4].__e == u4.__d && (u4.__d = _(i4, h4 + 1)), N(x5[h4], x5[h4]));
  if (w5)
    for (h4 = 0; h4 < w5.length; h4++)
      M(w5[h4], w5[++h4], w5[++h4]);
}
function m(n3, l4, u4) {
  for (var i4, t3 = n3.__k, o5 = 0; t3 && o5 < t3.length; o5++)
    (i4 = t3[o5]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? m(i4, l4, u4) : A(u4, i4, i4, t3, i4.__e, l4));
  return l4;
}
function x(n3, l4) {
  return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
    x(n4, l4);
  }) : l4.push(n3)), l4;
}
function A(n3, l4, u4, i4, t3, o5) {
  var r4, f4, e4;
  if (void 0 !== l4.__d)
    r4 = l4.__d, l4.__d = void 0;
  else if (null == u4 || t3 != o5 || null == t3.parentNode)
    n:
      if (null == o5 || o5.parentNode !== n3)
        n3.appendChild(t3), r4 = null;
      else {
        for (f4 = o5, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 2)
          if (f4 == t3)
            break n;
        n3.insertBefore(t3, o5), r4 = o5;
      }
  return void 0 !== r4 ? r4 : t3.nextSibling;
}
function C(n3, l4, u4, i4, t3) {
  var o5;
  for (o5 in u4)
    "children" === o5 || "key" === o5 || o5 in l4 || H(n3, o5, null, u4[o5], i4);
  for (o5 in l4)
    t3 && "function" != typeof l4[o5] || "children" === o5 || "key" === o5 || "value" === o5 || "checked" === o5 || u4[o5] === l4[o5] || H(n3, o5, l4[o5], u4[o5], i4);
}
function $(n3, l4, u4) {
  "-" === l4[0] ? n3.setProperty(l4, u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || c.test(l4) ? u4 : u4 + "px";
}
function H(n3, l4, u4, i4, t3) {
  var o5;
  n:
    if ("style" === l4)
      if ("string" == typeof u4)
        n3.style.cssText = u4;
      else {
        if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
          for (l4 in i4)
            u4 && l4 in u4 || $(n3.style, l4, "");
        if (u4)
          for (l4 in u4)
            i4 && u4[l4] === i4[l4] || $(n3.style, l4, u4[l4]);
      }
    else if ("o" === l4[0] && "n" === l4[1])
      o5 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + o5] = u4, u4 ? i4 || n3.addEventListener(l4, o5 ? T : I, o5) : n3.removeEventListener(l4, o5 ? T : I, o5);
    else if ("dangerouslySetInnerHTML" !== l4) {
      if (t3)
        l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n3)
        try {
          n3[l4] = null == u4 ? "" : u4;
          break n;
        } catch (n4) {
        }
      "function" == typeof u4 || (null != u4 && (false !== u4 || "a" === l4[0] && "r" === l4[1]) ? n3.setAttribute(l4, u4) : n3.removeAttribute(l4));
    }
}
function I(n3) {
  this.l[n3.type + false](l.event ? l.event(n3) : n3);
}
function T(n3) {
  this.l[n3.type + true](l.event ? l.event(n3) : n3);
}
function j(n3, u4, i4, t3, o5, r4, f4, e4, c4) {
  var a4, h4, v4, y4, _5, k5, b4, g5, m4, x5, A4, C4, $3, H3 = u4.type;
  if (void 0 !== u4.constructor)
    return null;
  null != i4.__h && (c4 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, r4 = [e4]), (a4 = l.__b) && a4(u4);
  try {
    n:
      if ("function" == typeof H3) {
        if (g5 = u4.props, m4 = (a4 = H3.contextType) && t3[a4.__c], x5 = a4 ? m4 ? m4.props.value : a4.__ : t3, i4.__c ? b4 = (h4 = u4.__c = i4.__c).__ = h4.__E : ("prototype" in H3 && H3.prototype.render ? u4.__c = h4 = new H3(g5, x5) : (u4.__c = h4 = new d(g5, x5), h4.constructor = H3, h4.render = O), m4 && m4.sub(h4), h4.props = g5, h4.state || (h4.state = {}), h4.context = x5, h4.__n = t3, v4 = h4.__d = true, h4.__h = []), null == h4.__s && (h4.__s = h4.state), null != H3.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = s({}, h4.__s)), s(h4.__s, H3.getDerivedStateFromProps(g5, h4.__s))), y4 = h4.props, _5 = h4.state, v4)
          null == H3.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
        else {
          if (null == H3.getDerivedStateFromProps && g5 !== y4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(g5, x5), !h4.__e && null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(g5, h4.__s, x5) || u4.__v === i4.__v) {
            h4.props = g5, h4.state = h4.__s, u4.__v !== i4.__v && (h4.__d = false), h4.__v = u4, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
              n4 && (n4.__ = u4);
            }), h4.__h.length && f4.push(h4);
            break n;
          }
          null != h4.componentWillUpdate && h4.componentWillUpdate(g5, h4.__s, x5), null != h4.componentDidUpdate && h4.__h.push(function() {
            h4.componentDidUpdate(y4, _5, k5);
          });
        }
        if (h4.context = x5, h4.props = g5, h4.__v = u4, h4.__P = n3, A4 = l.__r, C4 = 0, "prototype" in H3 && H3.prototype.render)
          h4.state = h4.__s, h4.__d = false, A4 && A4(u4), a4 = h4.render(h4.props, h4.state, h4.context);
        else
          do {
            h4.__d = false, A4 && A4(u4), a4 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
          } while (h4.__d && ++C4 < 25);
        h4.state = h4.__s, null != h4.getChildContext && (t3 = s(s({}, t3), h4.getChildContext())), v4 || null == h4.getSnapshotBeforeUpdate || (k5 = h4.getSnapshotBeforeUpdate(y4, _5)), $3 = null != a4 && a4.type === p && null == a4.key ? a4.props.children : a4, w(n3, Array.isArray($3) ? $3 : [$3], u4, i4, t3, o5, r4, f4, e4, c4), h4.base = u4.__e, u4.__h = null, h4.__h.length && f4.push(h4), b4 && (h4.__E = h4.__ = null), h4.__e = false;
      } else
        null == r4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = L(i4.__e, u4, i4, t3, o5, r4, f4, c4);
    (a4 = l.diffed) && a4(u4);
  } catch (n4) {
    u4.__v = null, (c4 || null != r4) && (u4.__e = e4, u4.__h = !!c4, r4[r4.indexOf(e4)] = null), l.__e(n4, u4, i4);
  }
}
function z(n3, u4) {
  l.__c && l.__c(u4, n3), n3.some(function(u5) {
    try {
      n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
        n4.call(u5);
      });
    } catch (n4) {
      l.__e(n4, u5.__v);
    }
  });
}
function L(l4, u4, i4, t3, o5, r4, e4, c4) {
  var s4, h4, v4, y4 = i4.props, p4 = u4.props, d4 = u4.type, k5 = 0;
  if ("svg" === d4 && (o5 = true), null != r4) {
    for (; k5 < r4.length; k5++)
      if ((s4 = r4[k5]) && "setAttribute" in s4 == !!d4 && (d4 ? s4.localName === d4 : 3 === s4.nodeType)) {
        l4 = s4, r4[k5] = null;
        break;
      }
  }
  if (null == l4) {
    if (null === d4)
      return document.createTextNode(p4);
    l4 = o5 ? document.createElementNS("http://www.w3.org/2000/svg", d4) : document.createElement(d4, p4.is && p4), r4 = null, c4 = false;
  }
  if (null === d4)
    y4 === p4 || c4 && l4.data === p4 || (l4.data = p4);
  else {
    if (r4 = r4 && n.call(l4.childNodes), h4 = (y4 = i4.props || f).dangerouslySetInnerHTML, v4 = p4.dangerouslySetInnerHTML, !c4) {
      if (null != r4)
        for (y4 = {}, k5 = 0; k5 < l4.attributes.length; k5++)
          y4[l4.attributes[k5].name] = l4.attributes[k5].value;
      (v4 || h4) && (v4 && (h4 && v4.__html == h4.__html || v4.__html === l4.innerHTML) || (l4.innerHTML = v4 && v4.__html || ""));
    }
    if (C(l4, p4, y4, o5, c4), v4)
      u4.__k = [];
    else if (k5 = u4.props.children, w(l4, Array.isArray(k5) ? k5 : [k5], u4, i4, t3, o5 && "foreignObject" !== d4, r4, e4, r4 ? r4[0] : i4.__k && _(i4, 0), c4), null != r4)
      for (k5 = r4.length; k5--; )
        null != r4[k5] && a(r4[k5]);
    c4 || ("value" in p4 && void 0 !== (k5 = p4.value) && (k5 !== l4.value || "progress" === d4 && !k5 || "option" === d4 && k5 !== y4.value) && H(l4, "value", k5, y4.value, false), "checked" in p4 && void 0 !== (k5 = p4.checked) && k5 !== l4.checked && H(l4, "checked", k5, y4.checked, false));
  }
  return l4;
}
function M(n3, u4, i4) {
  try {
    "function" == typeof n3 ? n3(u4) : n3.current = u4;
  } catch (n4) {
    l.__e(n4, i4);
  }
}
function N(n3, u4, i4) {
  var t3, o5;
  if (l.unmount && l.unmount(n3), (t3 = n3.ref) && (t3.current && t3.current !== n3.__e || M(t3, null, u4)), null != (t3 = n3.__c)) {
    if (t3.componentWillUnmount)
      try {
        t3.componentWillUnmount();
      } catch (n4) {
        l.__e(n4, u4);
      }
    t3.base = t3.__P = null;
  }
  if (t3 = n3.__k)
    for (o5 = 0; o5 < t3.length; o5++)
      t3[o5] && N(t3[o5], u4, "function" != typeof n3.type);
  i4 || null == n3.__e || a(n3.__e), n3.__e = n3.__d = void 0;
}
function O(n3, l4, u4) {
  return this.constructor(n3, u4);
}
function P(u4, i4, t3) {
  var o5, r4, e4;
  l.__ && l.__(u4, i4), r4 = (o5 = "function" == typeof t3) ? null : t3 && t3.__k || i4.__k, e4 = [], j(i4, u4 = (!o5 && t3 || i4).__k = h(p, null, [u4]), r4 || f, f, void 0 !== i4.ownerSVGElement, !o5 && t3 ? [t3] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, e4, !o5 && t3 ? t3 : r4 ? r4.__e : i4.firstChild, o5), z(e4, u4);
}
function S(n3, l4) {
  P(n3, l4, S);
}
function q(l4, u4, i4) {
  var t3, o5, r4, f4 = s({}, l4.props);
  for (r4 in u4)
    "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o5 = u4[r4] : f4[r4] = u4[r4];
  return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), v(l4.type, f4, t3 || l4.key, o5 || l4.ref, null);
}
function B(n3, l4) {
  var u4 = { __c: l4 = "__cC" + r++, __: n3, Consumer: function(n4, l5) {
    return n4.children(l5);
  }, Provider: function(n4) {
    var u5, i4;
    return this.getChildContext || (u5 = [], (i4 = {})[l4] = this, this.getChildContext = function() {
      return i4;
    }, this.shouldComponentUpdate = function(n5) {
      this.props.value !== n5.value && u5.some(b);
    }, this.sub = function(n5) {
      u5.push(n5);
      var l5 = n5.componentWillUnmount;
      n5.componentWillUnmount = function() {
        u5.splice(u5.indexOf(n5), 1), l5 && l5.call(n5);
      };
    }), n4.children;
  } };
  return u4.Provider.__ = u4.Consumer.contextType = u4;
}
var n, l, u, i, t, o, r, f, e, c;
var init_preact_module = __esm({
  "node_modules/preact/dist/preact.module.js"() {
    init_define_process();
    f = {};
    e = [];
    c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    __name(s, "s");
    __name(a, "a");
    __name(h, "h");
    __name(v, "v");
    __name(y, "y");
    __name(p, "p");
    __name(d, "d");
    __name(_, "_");
    __name(k, "k");
    __name(b, "b");
    __name(g, "g");
    __name(w, "w");
    __name(m, "m");
    __name(x, "x");
    __name(A, "A");
    __name(C, "C");
    __name($, "$");
    __name(H, "H");
    __name(I, "I");
    __name(T, "T");
    __name(j, "j");
    __name(z, "z");
    __name(L, "L");
    __name(M, "M");
    __name(N, "N");
    __name(O, "O");
    __name(P, "P");
    __name(S, "S");
    __name(q, "q");
    __name(B, "B");
    n = e.slice, l = { __e: function(n3, l4, u4, i4) {
      for (var t3, o5, r4; l4 = l4.__; )
        if ((t3 = l4.__c) && !t3.__)
          try {
            if ((o5 = t3.constructor) && null != o5.getDerivedStateFromError && (t3.setState(o5.getDerivedStateFromError(n3)), r4 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n3, i4 || {}), r4 = t3.__d), r4)
              return t3.__E = t3;
          } catch (l5) {
            n3 = l5;
          }
      throw n3;
    } }, u = 0, i = /* @__PURE__ */ __name(function(n3) {
      return null != n3 && void 0 === n3.constructor;
    }, "i"), d.prototype.setState = function(n3, l4) {
      var u4;
      u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = s({}, this.state), "function" == typeof n3 && (n3 = n3(s({}, u4), this.props)), n3 && s(u4, n3), null != n3 && this.__v && (l4 && this.__h.push(l4), b(this));
    }, d.prototype.forceUpdate = function(n3) {
      this.__v && (this.__e = true, n3 && this.__h.push(n3), b(this));
    }, d.prototype.render = p, t = [], g.__r = 0, r = 0;
  }
});

// node_modules/preact/hooks/dist/hooks.module.js
function d2(t3, u4) {
  l.__h && l.__h(r2, t3, o2 || u4), o2 = 0;
  var i4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return t3 >= i4.__.length && i4.__.push({ __V: f2 }), i4.__[t3];
}
function p2(n3) {
  return o2 = 1, y2(z2, n3);
}
function y2(n3, u4, i4) {
  var o5 = d2(t2++, 2);
  if (o5.t = n3, !o5.__c && (o5.__ = [i4 ? i4(u4) : z2(void 0, u4), function(n4) {
    var t3 = o5.__N ? o5.__N[0] : o5.__[0], r4 = o5.t(t3, n4);
    t3 !== r4 && (o5.__N = [r4, o5.__[1]], o5.__c.setState({}));
  }], o5.__c = r2, !r2.u)) {
    r2.u = true;
    var c4 = r2.shouldComponentUpdate;
    r2.shouldComponentUpdate = function(n4, t3, r4) {
      if (!o5.__c.__H)
        return true;
      var u5 = o5.__c.__H.__.filter(function(n5) {
        return n5.__c;
      });
      if (u5.every(function(n5) {
        return !n5.__N;
      }))
        return !c4 || c4.call(this, n4, t3, r4);
      var i5 = false;
      return u5.forEach(function(n5) {
        if (n5.__N) {
          var t4 = n5.__[0];
          n5.__ = n5.__N, n5.__N = void 0, t4 !== n5.__[0] && (i5 = true);
        }
      }), !!i5 && (!c4 || c4.call(this, n4, t3, r4));
    };
  }
  return o5.__N || o5.__;
}
function h2(u4, i4) {
  var o5 = d2(t2++, 3);
  !l.__s && w2(o5.__H, i4) && (o5.__ = u4, o5.i = i4, r2.__H.__h.push(o5));
}
function s2(u4, i4) {
  var o5 = d2(t2++, 4);
  !l.__s && w2(o5.__H, i4) && (o5.__ = u4, o5.i = i4, r2.__h.push(o5));
}
function _2(n3) {
  return o2 = 5, F(function() {
    return { current: n3 };
  }, []);
}
function A2(n3, t3, r4) {
  o2 = 6, s2(function() {
    return "function" == typeof n3 ? (n3(t3()), function() {
      return n3(null);
    }) : n3 ? (n3.current = t3(), function() {
      return n3.current = null;
    }) : void 0;
  }, null == r4 ? r4 : r4.concat(n3));
}
function F(n3, r4) {
  var u4 = d2(t2++, 7);
  return w2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
}
function T2(n3, t3) {
  return o2 = 8, F(function() {
    return n3;
  }, t3);
}
function q2(n3) {
  var u4 = r2.context[n3.__c], i4 = d2(t2++, 9);
  return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
}
function x2(t3, r4) {
  l.useDebugValue && l.useDebugValue(r4 ? r4(t3) : t3);
}
function b2() {
  for (var t3; t3 = c2.shift(); )
    if (t3.__P && t3.__H)
      try {
        t3.__H.__h.forEach(j2), t3.__H.__h.forEach(k2), t3.__H.__h = [];
      } catch (r4) {
        t3.__H.__h = [], l.__e(r4, t3.__v);
      }
}
function j2(n3) {
  var t3 = r2, u4 = n3.__c;
  "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t3;
}
function k2(n3) {
  var t3 = r2;
  n3.__c = n3.__(), r2 = t3;
}
function w2(n3, t3) {
  return !n3 || n3.length !== t3.length || t3.some(function(t4, r4) {
    return t4 !== n3[r4];
  });
}
function z2(n3, t3) {
  return "function" == typeof t3 ? t3(n3) : t3;
}
var t2, r2, u2, i2, o2, c2, f2, e2, a2, v2, l2, m2, g2;
var init_hooks_module = __esm({
  "node_modules/preact/hooks/dist/hooks.module.js"() {
    init_define_process();
    init_preact_module();
    o2 = 0;
    c2 = [];
    f2 = [];
    e2 = l.__b;
    a2 = l.__r;
    v2 = l.diffed;
    l2 = l.__c;
    m2 = l.unmount;
    __name(d2, "d");
    __name(p2, "p");
    __name(y2, "y");
    __name(h2, "h");
    __name(s2, "s");
    __name(_2, "_");
    __name(A2, "A");
    __name(F, "F");
    __name(T2, "T");
    __name(q2, "q");
    __name(x2, "x");
    __name(b2, "b");
    l.__b = function(n3) {
      r2 = null, e2 && e2(n3);
    }, l.__r = function(n3) {
      a2 && a2(n3), t2 = 0;
      var i4 = (r2 = n3.__c).__H;
      i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
        n4.__N && (n4.__ = n4.__N), n4.__V = f2, n4.__N = n4.i = void 0;
      })) : (i4.__h.forEach(j2), i4.__h.forEach(k2), i4.__h = [])), u2 = r2;
    }, l.diffed = function(t3) {
      v2 && v2(t3);
      var o5 = t3.__c;
      o5 && o5.__H && (o5.__H.__h.length && (1 !== c2.push(o5) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || function(n3) {
        var t4, r4 = /* @__PURE__ */ __name(function() {
          clearTimeout(u4), g2 && cancelAnimationFrame(t4), setTimeout(n3);
        }, "r"), u4 = setTimeout(r4, 100);
        g2 && (t4 = requestAnimationFrame(r4));
      })(b2)), o5.__H.__.forEach(function(n3) {
        n3.i && (n3.__H = n3.i), n3.__V !== f2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = f2;
      })), u2 = r2 = null;
    }, l.__c = function(t3, r4) {
      r4.some(function(t4) {
        try {
          t4.__h.forEach(j2), t4.__h = t4.__h.filter(function(n3) {
            return !n3.__ || k2(n3);
          });
        } catch (u4) {
          r4.some(function(n3) {
            n3.__h && (n3.__h = []);
          }), r4 = [], l.__e(u4, t4.__v);
        }
      }), l2 && l2(t3, r4);
    }, l.unmount = function(t3) {
      m2 && m2(t3);
      var r4, u4 = t3.__c;
      u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
        try {
          j2(n3);
        } catch (n4) {
          r4 = n4;
        }
      }), r4 && l.__e(r4, u4.__v));
    };
    g2 = "function" == typeof requestAnimationFrame;
    __name(j2, "j");
    __name(k2, "k");
    __name(w2, "w");
    __name(z2, "z");
  }
});

// node_modules/preact/compat/dist/compat.module.js
function S2(n3, t3) {
  for (var e4 in t3)
    n3[e4] = t3[e4];
  return n3;
}
function g3(n3, t3) {
  for (var e4 in n3)
    if ("__source" !== e4 && !(e4 in t3))
      return true;
  for (var r4 in t3)
    if ("__source" !== r4 && n3[r4] !== t3[r4])
      return true;
  return false;
}
function C2(n3) {
  this.props = n3;
}
function E(n3, t3) {
  function e4(n4) {
    var e5 = this.props.ref, r5 = e5 == n4.ref;
    return !r5 && e5 && (e5.call ? e5(null) : e5.current = null), t3 ? !t3(this.props, n4) || !r5 : g3(this.props, n4);
  }
  __name(e4, "e");
  function r4(t4) {
    return this.shouldComponentUpdate = e4, h(n3, t4);
  }
  __name(r4, "r");
  return r4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", r4.prototype.isReactComponent = true, r4.__f = true, r4;
}
function R(n3) {
  function t3(t4) {
    var e4 = S2({}, t4);
    return delete e4.ref, n3(e4, t4.ref || null);
  }
  __name(t3, "t");
  return t3.$$typeof = x3, t3.render = t3, t3.prototype.isReactComponent = t3.__f = true, t3.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t3;
}
function T3() {
  this.__u = 0, this.t = null, this.__b = null;
}
function L2(n3) {
  var t3 = n3.__.__c;
  return t3 && t3.__a && t3.__a(n3);
}
function U(n3) {
  var t3, e4, r4;
  function u4(u5) {
    if (t3 || (t3 = n3()).then(function(n4) {
      e4 = n4.default || n4;
    }, function(n4) {
      r4 = n4;
    }), r4)
      throw r4;
    if (!e4)
      throw t3;
    return h(e4, u5);
  }
  __name(u4, "u");
  return u4.displayName = "Lazy", u4.__f = true, u4;
}
function D() {
  this.u = null, this.o = null;
}
function I2(n3) {
  return this.getChildContext = function() {
    return n3.context;
  }, n3.children;
}
function M2(n3) {
  var t3 = this, e4 = n3.i;
  t3.componentWillUnmount = function() {
    P(null, t3.l), t3.l = null, t3.i = null;
  }, t3.i && t3.i !== e4 && t3.componentWillUnmount(), n3.__v ? (t3.l || (t3.i = e4, t3.l = { nodeType: 1, parentNode: e4, childNodes: [], appendChild: function(n4) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, insertBefore: function(n4, e5) {
    this.childNodes.push(n4), t3.i.appendChild(n4);
  }, removeChild: function(n4) {
    this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), t3.i.removeChild(n4);
  } }), P(h(I2, { context: t3.context }, n3.__v), t3.l)) : t3.l && t3.componentWillUnmount();
}
function V(n3, t3) {
  var e4 = h(M2, { __v: n3, i: t3 });
  return e4.containerInfo = t3, e4;
}
function z3(n3, t3, e4) {
  return null == t3.__k && (t3.textContent = ""), P(n3, t3), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
}
function B2(n3, t3, e4) {
  return S(n3, t3), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
}
function Z() {
}
function Y() {
  return this.cancelBubble;
}
function q3() {
  return this.defaultPrevented;
}
function tn(n3) {
  return h.bind(null, n3);
}
function en(n3) {
  return !!n3 && n3.$$typeof === W;
}
function rn(n3) {
  return en(n3) ? q.apply(null, arguments) : n3;
}
function un(n3) {
  return !!n3.__k && (P(null, n3), true);
}
function on(n3) {
  return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
}
function an(n3) {
  n3();
}
function sn(n3) {
  return n3;
}
function hn() {
  return [false, an];
}
function dn(t3, u4) {
  var o5 = u4(), i4 = p2({ s: { __: o5, h: u4 } }), l4 = i4[0].s, c4 = i4[1];
  return s2(function() {
    l4.__ = o5, l4.h = u4, l4.__ !== u4() && c4({ s: l4 });
  }, [t3, o5, u4]), h2(function() {
    return l4.__ !== l4.h() && c4({ s: l4 }), t3(function() {
      l4.__ !== l4.h() && c4({ s: l4 });
    });
  }, [t3]), o5;
}
var w3, x3, N2, k3, A3, O2, F2, W, P2, $2, j3, H2, G, J, K, Q, X, ln, cn, compat_module_default;
var init_compat_module = __esm({
  "node_modules/preact/compat/dist/compat.module.js"() {
    init_define_process();
    init_hooks_module();
    init_hooks_module();
    init_preact_module();
    init_preact_module();
    __name(S2, "S");
    __name(g3, "g");
    __name(C2, "C");
    __name(E, "E");
    (C2.prototype = new d()).isPureReactComponent = true, C2.prototype.shouldComponentUpdate = function(n3, t3) {
      return g3(this.props, n3) || g3(this.state, t3);
    };
    w3 = l.__b;
    l.__b = function(n3) {
      n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), w3 && w3(n3);
    };
    x3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    __name(R, "R");
    N2 = /* @__PURE__ */ __name(function(n3, t3) {
      return null == n3 ? null : x(x(n3).map(t3));
    }, "N");
    k3 = { map: N2, forEach: N2, count: function(n3) {
      return n3 ? x(n3).length : 0;
    }, only: function(n3) {
      var t3 = x(n3);
      if (1 !== t3.length)
        throw "Children.only";
      return t3[0];
    }, toArray: x };
    A3 = l.__e;
    l.__e = function(n3, t3, e4, r4) {
      if (n3.then) {
        for (var u4, o5 = t3; o5 = o5.__; )
          if ((u4 = o5.__c) && u4.__c)
            return null == t3.__e && (t3.__e = e4.__e, t3.__k = e4.__k), u4.__c(n3, t3);
      }
      A3(n3, t3, e4, r4);
    };
    O2 = l.unmount;
    __name(T3, "T");
    __name(L2, "L");
    __name(U, "U");
    __name(D, "D");
    l.unmount = function(n3) {
      var t3 = n3.__c;
      t3 && t3.__R && t3.__R(), t3 && true === n3.__h && (n3.type = null), O2 && O2(n3);
    }, (T3.prototype = new d()).__c = function(n3, t3) {
      var e4 = t3.__c, r4 = this;
      null == r4.t && (r4.t = []), r4.t.push(e4);
      var u4 = L2(r4.__v), o5 = false, i4 = /* @__PURE__ */ __name(function() {
        o5 || (o5 = true, e4.__R = null, u4 ? u4(l4) : l4());
      }, "i");
      e4.__R = i4;
      var l4 = /* @__PURE__ */ __name(function() {
        if (!--r4.__u) {
          if (r4.state.__a) {
            var n4 = r4.state.__a;
            r4.__v.__k[0] = (/* @__PURE__ */ __name(function n5(t5, e5, r5) {
              return t5 && (t5.__v = null, t5.__k = t5.__k && t5.__k.map(function(t6) {
                return n5(t6, e5, r5);
              }), t5.__c && t5.__c.__P === e5 && (t5.__e && r5.insertBefore(t5.__e, t5.__d), t5.__c.__e = true, t5.__c.__P = r5)), t5;
            }, "n"))(n4, n4.__c.__P, n4.__c.__O);
          }
          var t4;
          for (r4.setState({ __a: r4.__b = null }); t4 = r4.t.pop(); )
            t4.forceUpdate();
        }
      }, "l"), c4 = true === t3.__h;
      r4.__u++ || c4 || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n3.then(i4, i4);
    }, T3.prototype.componentWillUnmount = function() {
      this.t = [];
    }, T3.prototype.render = function(n3, t3) {
      if (this.__b) {
        if (this.__v.__k) {
          var e4 = document.createElement("div"), r4 = this.__v.__k[0].__c;
          this.__v.__k[0] = (/* @__PURE__ */ __name(function n4(t4, e5, r5) {
            return t4 && (t4.__c && t4.__c.__H && (t4.__c.__H.__.forEach(function(n5) {
              "function" == typeof n5.__c && n5.__c();
            }), t4.__c.__H = null), null != (t4 = S2({}, t4)).__c && (t4.__c.__P === r5 && (t4.__c.__P = e5), t4.__c = null), t4.__k = t4.__k && t4.__k.map(function(t5) {
              return n4(t5, e5, r5);
            })), t4;
          }, "n"))(this.__b, e4, r4.__O = r4.__P);
        }
        this.__b = null;
      }
      var u4 = t3.__a && h(p, null, n3.fallback);
      return u4 && (u4.__h = null), [h(p, null, t3.__a ? null : n3.children), u4];
    };
    F2 = /* @__PURE__ */ __name(function(n3, t3, e4) {
      if (++e4[1] === e4[0] && n3.o.delete(t3), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
        for (e4 = n3.u; e4; ) {
          for (; e4.length > 3; )
            e4.pop()();
          if (e4[1] < e4[0])
            break;
          n3.u = e4 = e4[2];
        }
    }, "F");
    __name(I2, "I");
    __name(M2, "M");
    __name(V, "V");
    (D.prototype = new d()).__a = function(n3) {
      var t3 = this, e4 = L2(t3.__v), r4 = t3.o.get(n3);
      return r4[0]++, function(u4) {
        var o5 = /* @__PURE__ */ __name(function() {
          t3.props.revealOrder ? (r4.push(u4), F2(t3, n3, r4)) : u4();
        }, "o");
        e4 ? e4(o5) : o5();
      };
    }, D.prototype.render = function(n3) {
      this.u = null, this.o = /* @__PURE__ */ new Map();
      var t3 = x(n3.children);
      n3.revealOrder && "b" === n3.revealOrder[0] && t3.reverse();
      for (var e4 = t3.length; e4--; )
        this.o.set(t3[e4], this.u = [1, 0, this.u]);
      return n3.children;
    }, D.prototype.componentDidUpdate = D.prototype.componentDidMount = function() {
      var n3 = this;
      this.o.forEach(function(t3, e4) {
        F2(n3, e4, t3);
      });
    };
    W = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
    P2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
    $2 = "undefined" != typeof document;
    j3 = /* @__PURE__ */ __name(function(n3) {
      return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
    }, "j");
    __name(z3, "z");
    __name(B2, "B");
    d.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n3) {
      Object.defineProperty(d.prototype, n3, { configurable: true, get: function() {
        return this["UNSAFE_" + n3];
      }, set: function(t3) {
        Object.defineProperty(this, n3, { configurable: true, writable: true, value: t3 });
      } });
    });
    H2 = l.event;
    __name(Z, "Z");
    __name(Y, "Y");
    __name(q3, "q");
    l.event = function(n3) {
      return H2 && (n3 = H2(n3)), n3.persist = Z, n3.isPropagationStopped = Y, n3.isDefaultPrevented = q3, n3.nativeEvent = n3;
    };
    J = { configurable: true, get: function() {
      return this.class;
    } };
    K = l.vnode;
    l.vnode = function(n3) {
      var t3 = n3.type, e4 = n3.props, r4 = e4;
      if ("string" == typeof t3) {
        var u4 = -1 === t3.indexOf("-");
        for (var o5 in r4 = {}, e4) {
          var i4 = e4[o5];
          $2 && "children" === o5 && "noscript" === t3 || "value" === o5 && "defaultValue" in e4 && null == i4 || ("defaultValue" === o5 && "value" in e4 && null == e4.value ? o5 = "value" : "download" === o5 && true === i4 ? i4 = "" : /ondoubleclick/i.test(o5) ? o5 = "ondblclick" : /^onchange(textarea|input)/i.test(o5 + t3) && !j3(e4.type) ? o5 = "oninput" : /^onfocus$/i.test(o5) ? o5 = "onfocusin" : /^onblur$/i.test(o5) ? o5 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o5) ? o5 = o5.toLowerCase() : u4 && P2.test(o5) ? o5 = o5.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === i4 && (i4 = void 0), /^oninput$/i.test(o5) && (o5 = o5.toLowerCase(), r4[o5] && (o5 = "oninputCapture")), r4[o5] = i4);
        }
        "select" == t3 && r4.multiple && Array.isArray(r4.value) && (r4.value = x(e4.children).forEach(function(n4) {
          n4.props.selected = -1 != r4.value.indexOf(n4.props.value);
        })), "select" == t3 && null != r4.defaultValue && (r4.value = x(e4.children).forEach(function(n4) {
          n4.props.selected = r4.multiple ? -1 != r4.defaultValue.indexOf(n4.props.value) : r4.defaultValue == n4.props.value;
        })), n3.props = r4, e4.class != e4.className && (J.enumerable = "className" in e4, null != e4.className && (r4.class = e4.className), Object.defineProperty(r4, "className", J));
      }
      n3.$$typeof = W, K && K(n3);
    };
    Q = l.__r;
    l.__r = function(n3) {
      Q && Q(n3), G = n3.__c;
    };
    X = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
      return G.__n[n3.__c].props.value;
    } } } };
    __name(tn, "tn");
    __name(en, "en");
    __name(rn, "rn");
    __name(un, "un");
    __name(on, "on");
    ln = /* @__PURE__ */ __name(function(n3, t3) {
      return n3(t3);
    }, "ln");
    cn = /* @__PURE__ */ __name(function(n3, t3) {
      return n3(t3);
    }, "cn");
    __name(an, "an");
    __name(sn, "sn");
    __name(hn, "hn");
    __name(dn, "dn");
    compat_module_default = { useState: p2, useReducer: y2, useEffect: h2, useLayoutEffect: s2, useInsertionEffect: s2, useTransition: hn, useDeferredValue: sn, useSyncExternalStore: dn, startTransition: an, useRef: _2, useImperativeHandle: A2, useMemo: F, useCallback: T2, useContext: q2, useDebugValue: x2, version: "17.0.2", Children: k3, render: z3, hydrate: B2, unmountComponentAtNode: un, createPortal: V, createElement: h, createContext: B, createFactory: tn, cloneElement: rn, createRef: y, Fragment: p, isValidElement: en, findDOMNode: on, Component: d, PureComponent: C2, memo: E, forwardRef: R, flushSync: cn, unstable_batchedUpdates: ln, StrictMode: p, Suspense: T3, SuspenseList: D, lazy: U, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X };
  }
});

// node_modules/preact/compat/client.mjs
function createRoot(container) {
  return {
    render(children) {
      z3(children, container);
    },
    unmount() {
      un(container);
    }
  };
}
function hydrateRoot(container, children) {
  B2(children, container);
  return createRoot(container);
}
var init_client = __esm({
  "node_modules/preact/compat/client.mjs"() {
    init_define_process();
    init_compat_module();
    __name(createRoot, "createRoot");
    __name(hydrateRoot, "hydrateRoot");
  }
});

// node_modules/preact-render-to-string/dist/index.mjs
function l3(e4) {
  if (false === a3.test(e4 += ""))
    return e4;
  for (var t3 = 0, r4 = 0, n3 = "", o5 = ""; r4 < e4.length; r4++) {
    switch (e4.charCodeAt(r4)) {
      case 34:
        o5 = "&quot;";
        break;
      case 38:
        o5 = "&amp;";
        break;
      case 60:
        o5 = "&lt;";
        break;
      default:
        continue;
    }
    r4 !== t3 && (n3 += e4.slice(t3, r4)), n3 += o5, t3 = r4 + 1;
  }
  return r4 !== t3 && (n3 += e4.slice(t3, r4)), n3;
}
function p3(e4) {
  var t3 = "";
  for (var n3 in e4) {
    var o5 = e4[n3];
    null != o5 && "" !== o5 && (t3 && (t3 += " "), t3 += "-" == n3[0] ? n3 : c3[n3] || (c3[n3] = n3.replace(u3, "-$1").toLowerCase()), t3 = "number" == typeof o5 && false === r3.test(n3) ? t3 + ": " + o5 + "px;" : t3 + ": " + o5 + ";");
  }
  return t3 || void 0;
}
function _3(e4, t3) {
  return Array.isArray(t3) ? t3.reduce(_3, e4) : null != t3 && false !== t3 && e4.push(t3), e4;
}
function d3() {
  this.__d = true;
}
function v3(e4, t3) {
  return { __v: e4, context: t3, props: e4.props, setState: d3, forceUpdate: d3, __d: true, __h: [] };
}
function h3(e4, t3) {
  var r4 = e4.contextType, n3 = r4 && t3[r4.__c];
  return null != r4 ? n3 ? n3.props.value : r4.__ : t3;
}
function y3(r4, a4, c4, u4, d4, m4) {
  if (null == r4 || "boolean" == typeof r4)
    return "";
  if ("object" != typeof r4)
    return l3(r4);
  var b4 = c4.pretty, x5 = b4 && "string" == typeof b4 ? b4 : "	";
  if (Array.isArray(r4)) {
    for (var k5 = "", S4 = 0; S4 < r4.length; S4++)
      b4 && S4 > 0 && (k5 += "\n"), k5 += y3(r4[S4], a4, c4, u4, d4, m4);
    return k5;
  }
  var w5, C4 = r4.type, O4 = r4.props, j5 = false;
  if ("function" == typeof C4) {
    if (j5 = true, !c4.shallow || !u4 && false !== c4.renderRootComponent) {
      if (C4 === p) {
        var A4 = [];
        return _3(A4, r4.props.children), y3(A4, a4, c4, false !== c4.shallowHighOrder, d4, m4);
      }
      var F3, H3 = r4.__c = v3(r4, a4);
      l.__b && l.__b(r4);
      var M3 = l.__r;
      if (C4.prototype && "function" == typeof C4.prototype.render) {
        var L3 = h3(C4, a4);
        (H3 = r4.__c = new C4(O4, L3)).__v = r4, H3._dirty = H3.__d = true, H3.props = O4, null == H3.state && (H3.state = {}), null == H3._nextState && null == H3.__s && (H3._nextState = H3.__s = H3.state), H3.context = L3, C4.getDerivedStateFromProps ? H3.state = Object.assign({}, H3.state, C4.getDerivedStateFromProps(H3.props, H3.state)) : H3.componentWillMount && (H3.componentWillMount(), H3.state = H3._nextState !== H3.state ? H3._nextState : H3.__s !== H3.state ? H3.__s : H3.state), M3 && M3(r4), F3 = H3.render(H3.props, H3.state, H3.context);
      } else
        for (var T4 = h3(C4, a4), E2 = 0; H3.__d && E2++ < 25; )
          H3.__d = false, M3 && M3(r4), F3 = C4.call(r4.__c, O4, T4);
      return H3.getChildContext && (a4 = Object.assign({}, a4, H3.getChildContext())), l.diffed && l.diffed(r4), y3(F3, a4, c4, false !== c4.shallowHighOrder, d4, m4);
    }
    C4 = (w5 = C4).displayName || w5 !== Function && w5.name || function(e4) {
      var t3 = (Function.prototype.toString.call(e4).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t3) {
        for (var r5 = -1, n3 = g4.length; n3--; )
          if (g4[n3] === e4) {
            r5 = n3;
            break;
          }
        r5 < 0 && (r5 = g4.push(e4) - 1), t3 = "UnnamedComponent" + r5;
      }
      return t3;
    }(w5);
  }
  var $3, D2, N3 = "<" + C4;
  if (O4) {
    var P3 = Object.keys(O4);
    c4 && true === c4.sortAttributes && P3.sort();
    for (var W2 = 0; W2 < P3.length; W2++) {
      var I3 = P3[W2], R2 = O4[I3];
      if ("children" !== I3) {
        if (!o3.test(I3) && (c4 && c4.allAttributes || "key" !== I3 && "ref" !== I3 && "__self" !== I3 && "__source" !== I3)) {
          if ("defaultValue" === I3)
            I3 = "value";
          else if ("defaultChecked" === I3)
            I3 = "checked";
          else if ("defaultSelected" === I3)
            I3 = "selected";
          else if ("className" === I3) {
            if (void 0 !== O4.class)
              continue;
            I3 = "class";
          } else
            d4 && i3.test(I3) && (I3 = I3.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I3) {
            if (O4.for)
              continue;
            I3 = "for";
          }
          "style" === I3 && R2 && "object" == typeof R2 && (R2 = p3(R2)), "a" === I3[0] && "r" === I3[1] && "boolean" == typeof R2 && (R2 = String(R2));
          var U2 = c4.attributeHook && c4.attributeHook(I3, R2, a4, c4, j5);
          if (U2 || "" === U2)
            N3 += U2;
          else if ("dangerouslySetInnerHTML" === I3)
            D2 = R2 && R2.__html;
          else if ("textarea" === C4 && "value" === I3)
            $3 = R2;
          else if ((R2 || 0 === R2 || "" === R2) && "function" != typeof R2) {
            if (!(true !== R2 && "" !== R2 || (R2 = I3, c4 && c4.xml))) {
              N3 = N3 + " " + I3;
              continue;
            }
            if ("value" === I3) {
              if ("select" === C4) {
                m4 = R2;
                continue;
              }
              "option" === C4 && m4 == R2 && void 0 === O4.selected && (N3 += " selected");
            }
            N3 = N3 + " " + I3 + '="' + l3(R2) + '"';
          }
        }
      } else
        $3 = R2;
    }
  }
  if (b4) {
    var V2 = N3.replace(/\n\s*/, " ");
    V2 === N3 || ~V2.indexOf("\n") ? b4 && ~N3.indexOf("\n") && (N3 += "\n") : N3 = V2;
  }
  if (N3 += ">", o3.test(C4))
    throw new Error(C4 + " is not a valid HTML tag name in " + N3);
  var q4, z4 = n2.test(C4) || c4.voidElements && c4.voidElements.test(C4), Z2 = [];
  if (D2)
    b4 && f3(D2) && (D2 = "\n" + x5 + s3(D2, x5)), N3 += D2;
  else if (null != $3 && _3(q4 = [], $3).length) {
    for (var B3 = b4 && ~N3.indexOf("\n"), G2 = false, J2 = 0; J2 < q4.length; J2++) {
      var K2 = q4[J2];
      if (null != K2 && false !== K2) {
        var Q2 = y3(K2, a4, c4, true, "svg" === C4 || "foreignObject" !== C4 && d4, m4);
        if (b4 && !B3 && f3(Q2) && (B3 = true), Q2)
          if (b4) {
            var X2 = Q2.length > 0 && "<" != Q2[0];
            G2 && X2 ? Z2[Z2.length - 1] += Q2 : Z2.push(Q2), G2 = X2;
          } else
            Z2.push(Q2);
      }
    }
    if (b4 && B3)
      for (var Y2 = Z2.length; Y2--; )
        Z2[Y2] = "\n" + x5 + s3(Z2[Y2], x5);
  }
  if (Z2.length || D2)
    N3 += Z2.join("");
  else if (c4 && c4.xml)
    return N3.substring(0, N3.length - 1) + " />";
  return !z4 || q4 || D2 ? (b4 && ~N3.indexOf("\n") && (N3 += "\n"), N3 = N3 + "</" + C4 + ">") : N3 = N3.replace(/>$/, " />"), N3;
}
function k4(e4, r4, n3) {
  r4 = r4 || {};
  var o5, i4 = l.__s;
  return l.__s = true, o5 = n3 && (n3.pretty || n3.voidElements || n3.sortAttributes || n3.shallow || n3.allAttributes || n3.xml || n3.attributeHook) ? y3(e4, r4, n3) : j4(e4, r4, false, void 0), l.__c && l.__c(e4, x4), l.__s = i4, x4.length = 0, o5;
}
function S3(e4, t3) {
  return "className" === e4 ? "class" : "htmlFor" === e4 ? "for" : "defaultValue" === e4 ? "value" : "defaultChecked" === e4 ? "checked" : "defaultSelected" === e4 ? "selected" : t3 && i3.test(e4) ? e4.toLowerCase().replace(/^xlink:?/, "xlink:") : e4;
}
function w4(e4, t3) {
  return "style" === e4 && null != t3 && "object" == typeof t3 ? p3(t3) : "a" === e4[0] && "r" === e4[1] && "boolean" == typeof t3 ? String(t3) : t3;
}
function j4(r4, i4, a4, s4) {
  if (null == r4 || true === r4 || false === r4 || "" === r4)
    return "";
  if ("object" != typeof r4)
    return l3(r4);
  if (C3(r4)) {
    for (var f4 = "", c4 = 0; c4 < r4.length; c4++)
      f4 += j4(r4[c4], i4, a4, s4);
    return f4;
  }
  l.__b && l.__b(r4);
  var u4 = r4.type, p4 = r4.props;
  if ("function" == typeof u4) {
    if (u4 === p)
      return j4(r4.props.children, i4, a4, s4);
    var _5;
    _5 = u4.prototype && "function" == typeof u4.prototype.render ? function(e4, r5) {
      var n3 = e4.type, o5 = h3(n3, r5), i5 = new n3(e4.props, o5);
      e4.__c = i5, i5.__v = e4, i5.__d = true, i5.props = e4.props, null == i5.state && (i5.state = {}), null == i5.__s && (i5.__s = i5.state), i5.context = o5, n3.getDerivedStateFromProps ? i5.state = O3({}, i5.state, n3.getDerivedStateFromProps(i5.props, i5.state)) : i5.componentWillMount && (i5.componentWillMount(), i5.state = i5.__s !== i5.state ? i5.__s : i5.state);
      var a5 = l.__r;
      return a5 && a5(e4), i5.render(i5.props, i5.state, i5.context);
    }(r4, i4) : function(e4, r5) {
      var n3, o5 = v3(e4, r5), i5 = h3(e4.type, r5);
      e4.__c = o5;
      for (var a5 = l.__r, l4 = 0; o5.__d && l4++ < 25; )
        o5.__d = false, a5 && a5(e4), n3 = e4.type.call(o5, e4.props, i5);
      return n3;
    }(r4, i4);
    var d4 = r4.__c;
    d4.getChildContext && (i4 = O3({}, i4, d4.getChildContext()));
    var g5 = j4(_5, i4, a4, s4);
    return l.diffed && l.diffed(r4), g5;
  }
  var y4, m4, b4 = "<";
  if (b4 += u4, p4)
    for (var x5 in y4 = p4.children, p4) {
      var k5 = p4[x5];
      if (!("key" === x5 || "ref" === x5 || "__self" === x5 || "__source" === x5 || "children" === x5 || "className" === x5 && "class" in p4 || "htmlFor" === x5 && "for" in p4 || o3.test(x5))) {
        if (k5 = w4(x5 = S3(x5, a4), k5), "dangerouslySetInnerHTML" === x5)
          m4 = k5 && k5.__html;
        else if ("textarea" === u4 && "value" === x5)
          y4 = k5;
        else if ((k5 || 0 === k5 || "" === k5) && "function" != typeof k5) {
          if (true === k5 || "" === k5) {
            k5 = x5, b4 = b4 + " " + x5;
            continue;
          }
          if ("value" === x5) {
            if ("select" === u4) {
              s4 = k5;
              continue;
            }
            "option" !== u4 || s4 != k5 || "selected" in p4 || (b4 += " selected");
          }
          b4 = b4 + " " + x5 + '="' + l3(k5) + '"';
        }
      }
    }
  var A4 = b4;
  if (b4 += ">", o3.test(u4))
    throw new Error(u4 + " is not a valid HTML tag name in " + b4);
  var F3 = "", H3 = false;
  if (m4)
    F3 += m4, H3 = true;
  else if ("string" == typeof y4)
    F3 += l3(y4), H3 = true;
  else if (C3(y4))
    for (var M3 = 0; M3 < y4.length; M3++) {
      var L3 = y4[M3];
      if (null != L3 && false !== L3) {
        var T4 = j4(L3, i4, "svg" === u4 || "foreignObject" !== u4 && a4, s4);
        T4 && (F3 += T4, H3 = true);
      }
    }
  else if (null != y4 && false !== y4 && true !== y4) {
    var E2 = j4(y4, i4, "svg" === u4 || "foreignObject" !== u4 && a4, s4);
    E2 && (F3 += E2, H3 = true);
  }
  if (l.diffed && l.diffed(r4), H3)
    b4 += F3;
  else if (n2.test(u4))
    return A4 + " />";
  return b4 + "</" + u4 + ">";
}
var r3, n2, o3, i3, a3, s3, f3, c3, u3, g4, m3, b3, x4, C3, O3;
var init_dist = __esm({
  "node_modules/preact-render-to-string/dist/index.mjs"() {
    init_define_process();
    init_preact_module();
    r3 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
    n2 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
    o3 = /[\s\n\\/='"\0<>]/;
    i3 = /^xlink:?./;
    a3 = /["&<]/;
    __name(l3, "l");
    s3 = /* @__PURE__ */ __name(function(e4, t3) {
      return String(e4).replace(/(\n+)/g, "$1" + (t3 || "	"));
    }, "s");
    f3 = /* @__PURE__ */ __name(function(e4, t3, r4) {
      return String(e4).length > (t3 || 40) || !r4 && -1 !== String(e4).indexOf("\n") || -1 !== String(e4).indexOf("<");
    }, "f");
    c3 = {};
    u3 = /([A-Z])/g;
    __name(p3, "p");
    __name(_3, "_");
    __name(d3, "d");
    __name(v3, "v");
    __name(h3, "h");
    g4 = [];
    __name(y3, "y");
    m3 = { shallow: true };
    k4.render = k4;
    b3 = /* @__PURE__ */ __name(function(e4, t3) {
      return k4(e4, t3, m3);
    }, "b");
    x4 = [];
    __name(k4, "k");
    __name(S3, "S");
    __name(w4, "w");
    C3 = Array.isArray;
    O3 = Object.assign;
    __name(j4, "j");
    k4.shallowRender = b3;
  }
});

// node_modules/preact/compat/server.browser.js
var init_server_browser = __esm({
  "node_modules/preact/compat/server.browser.js"() {
    init_define_process();
    init_dist();
  }
});

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
function e3(_5, e4, n3, t3, f4) {
  var l4, s4, u4 = {};
  for (s4 in e4)
    "ref" == s4 ? l4 = e4[s4] : u4[s4] = e4[s4];
  var a4 = { type: _5, props: u4, key: n3, ref: l4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --o4, __source: f4, __self: t3 };
  if ("function" == typeof _5 && (l4 = _5.defaultProps))
    for (s4 in l4)
      void 0 === u4[s4] && (u4[s4] = l4[s4]);
  return l.vnode && l.vnode(a4), a4;
}
var o4;
var init_jsxRuntime_module = __esm({
  "node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js"() {
    init_define_process();
    init_preact_module();
    init_preact_module();
    o4 = 0;
    __name(e3, "e");
  }
});

// js/react-preact.ts
var react_preact_exports = {};
__export(react_preact_exports, {
  Children: () => Children,
  Component: () => Component,
  Fragment: () => p,
  PureComponent: () => PureComponent,
  StrictMode: () => StrictMode,
  Suspense: () => Suspense,
  SuspenseList: () => D,
  cloneElement: () => cloneElement,
  createClass: () => createClass,
  createContext: () => createContext,
  createElement: () => h,
  createFactory: () => createFactory,
  createPortal: () => V,
  createRef: () => createRef,
  createRoot: () => createRoot,
  default: () => react_preact_default,
  findDOMNode: () => on,
  forwardRef: () => forwardRef,
  hydrate: () => hydrate,
  hydrateRoot: () => hydrateRoot,
  isValidElement: () => isValidElement,
  jsx: () => e3,
  jsxDEV: () => e3,
  jsxs: () => e3,
  lazy: () => lazy,
  memo: () => memo,
  render: () => render,
  renderToString: () => k4,
  shallowRender: () => b3,
  unmountComponentAtNode: () => unmountComponentAtNode,
  unstable_batchedUpdates: () => unstable_batchedUpdates,
  useCallback: () => useCallback,
  useContext: () => useContext,
  useDebugValue: () => useDebugValue,
  useEffect: () => useEffect,
  useId: () => useId,
  useImperativeHandle: () => useImperativeHandle,
  useInsertionEffect: () => useInsertionEffect,
  useLayoutEffect: () => useLayoutEffect,
  useMemo: () => useMemo,
  useReducer: () => useReducer,
  useRef: () => useRef,
  useState: () => useState,
  version: () => version
});
var import_buffer, React, createContext, hydrate, render, unmountComponentAtNode, react_preact_default, cloneElement, createFactory, useInsertionEffect, unstable_batchedUpdates, createRef, useCallback, useContext, useDebugValue, isValidElement, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, createClass, useState, lazy, Suspense, StrictMode, useId, forwardRef, memo, Children, PureComponent, Component, version;
var init_react_preact = __esm({
  "js/react-preact.ts"() {
    init_define_process();
    import_buffer = __toESM(require_buffer(), 1);
    init_client();
    init_server_browser();
    init_preact_module();
    init_preact_module();
    init_dist();
    init_compat_module();
    init_compat_module();
    init_jsxRuntime_module();
    React = window.React = window.React || { ...preact_module_exports, ...compat_module_default, createPortal: V, SuspenseList: D, findDOMNode: on };
    ({ createContext } = React);
    ({ hydrate, render, unmountComponentAtNode } = React);
    react_preact_default = React;
    ({
      cloneElement,
      createFactory,
      useInsertionEffect,
      unstable_batchedUpdates,
      createRef,
      useCallback,
      useContext,
      useDebugValue,
      isValidElement,
      useEffect,
      useImperativeHandle,
      useLayoutEffect,
      useMemo,
      useReducer,
      useRef,
      createClass,
      useState,
      lazy,
      Suspense,
      StrictMode,
      useId,
      forwardRef,
      memo,
      Children,
      PureComponent,
      Component,
      version
    } = React);
    globalThis.Buffer = import_buffer.Buffer;
  }
});

export {
  h,
  p,
  D,
  V,
  on,
  createRoot,
  hydrateRoot,
  b3 as b,
  k4 as k,
  e3 as e,
  createContext,
  hydrate,
  render,
  unmountComponentAtNode,
  react_preact_default,
  cloneElement,
  createFactory,
  useInsertionEffect,
  unstable_batchedUpdates,
  createRef,
  useCallback,
  useContext,
  useDebugValue,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  createClass,
  useState,
  lazy,
  Suspense,
  StrictMode,
  useId,
  forwardRef,
  memo,
  Children,
  PureComponent,
  Component,
  version,
  react_preact_exports,
  init_react_preact
};
