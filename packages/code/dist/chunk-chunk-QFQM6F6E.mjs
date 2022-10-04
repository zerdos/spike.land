import {
  __commonJS,
  __esm,
  __export,
  init_define_process
} from "./chunk-chunk-2QDYJ352.mjs";

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
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
  function encode5(source) {
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
  function decode6(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src, _brrp__multiformats_scope_baseX, base_x_default;
var init_base_x = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/vendor/base-x.js"() {
    init_define_process();
    src = base;
    _brrp__multiformats_scope_baseX = src;
    base_x_default = _brrp__multiformats_scope_baseX;
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bytes.js
var empty, equals, coerce, fromString, toString;
var init_bytes = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bytes.js"() {
    init_define_process();
    empty = new Uint8Array(0);
    equals = (aa, bb) => {
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
    coerce = (o) => {
      if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
        return o;
      if (o instanceof ArrayBuffer)
        return new Uint8Array(o);
      if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
      }
      throw new Error("Unknown type, must be binary type");
    };
    fromString = (str) => new TextEncoder().encode(str);
    toString = (b) => new TextDecoder().decode(b);
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base.js
var Encoder, Decoder, ComposedDecoder, or, Codec, from, baseX, decode, encode, rfc4648;
var init_base = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base.js"() {
    init_define_process();
    init_base_x();
    init_bytes();
    Encoder = class {
      constructor(name2, prefix, baseEncode) {
        this.name = name2;
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
    Decoder = class {
      constructor(name2, prefix, baseDecode) {
        this.name = name2;
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
    ComposedDecoder = class {
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
    or = (left, right) => new ComposedDecoder({
      ...left.decoders || { [left.prefix]: left },
      ...right.decoders || { [right.prefix]: right }
    });
    Codec = class {
      constructor(name2, prefix, baseEncode, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name2, prefix, baseEncode);
        this.decoder = new Decoder(name2, prefix, baseDecode);
      }
      encode(input) {
        return this.encoder.encode(input);
      }
      decode(input) {
        return this.decoder.decode(input);
      }
    };
    from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
    baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
      const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
      return from({
        prefix,
        name: name2,
        encode: encode5,
        decode: (text) => coerce(decode6(text))
      });
    };
    decode = (string2, alphabet2, bitsPerChar, name2) => {
      const codes = {};
      for (let i = 0; i < alphabet2.length; ++i) {
        codes[alphabet2[i]] = i;
      }
      let end = string2.length;
      while (string2[end - 1] === "=") {
        --end;
      }
      const out = new Uint8Array(end * bitsPerChar / 8 | 0);
      let bits = 0;
      let buffer = 0;
      let written = 0;
      for (let i = 0; i < end; ++i) {
        const value = codes[string2[i]];
        if (value === void 0) {
          throw new SyntaxError(`Non-${name2} character`);
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
    encode = (data, alphabet2, bitsPerChar) => {
      const pad = alphabet2[alphabet2.length - 1] === "=";
      const mask = (1 << bitsPerChar) - 1;
      let out = "";
      let bits = 0;
      let buffer = 0;
      for (let i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | data[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          out += alphabet2[mask & buffer >> bits];
        }
      }
      if (bits) {
        out += alphabet2[mask & buffer << bitsPerChar - bits];
      }
      if (pad) {
        while (out.length * bitsPerChar & 7) {
          out += "=";
        }
      }
      return out;
    };
    rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
      return from({
        prefix,
        name: name2,
        encode(input) {
          return encode(input, alphabet2, bitsPerChar);
        },
        decode(input) {
          return decode(input, alphabet2, bitsPerChar, name2);
        }
      });
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity;
var init_identity = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/identity.js"() {
    init_define_process();
    init_base();
    init_bytes();
    identity = from({
      prefix: "\0",
      name: "identity",
      encode: (buf) => toString(buf),
      decode: (str) => fromString(str)
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2;
var init_base2 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base2.js"() {
    init_define_process();
    init_base();
    base2 = rfc4648({
      prefix: "0",
      name: "base2",
      alphabet: "01",
      bitsPerChar: 1
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8;
var init_base8 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base8.js"() {
    init_define_process();
    init_base();
    base8 = rfc4648({
      prefix: "7",
      name: "base8",
      alphabet: "01234567",
      bitsPerChar: 3
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10;
var init_base10 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base10.js"() {
    init_define_process();
    init_base();
    base10 = baseX({
      prefix: "9",
      name: "base10",
      alphabet: "0123456789"
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16, base16upper;
var init_base16 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base16.js"() {
    init_define_process();
    init_base();
    base16 = rfc4648({
      prefix: "f",
      name: "base16",
      alphabet: "0123456789abcdef",
      bitsPerChar: 4
    });
    base16upper = rfc4648({
      prefix: "F",
      name: "base16upper",
      alphabet: "0123456789ABCDEF",
      bitsPerChar: 4
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32, base32upper, base32pad, base32padupper, base32hex, base32hexupper, base32hexpad, base32hexpadupper, base32z;
var init_base32 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base32.js"() {
    init_define_process();
    init_base();
    base32 = rfc4648({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5
    });
    base32upper = rfc4648({
      prefix: "B",
      name: "base32upper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bitsPerChar: 5
    });
    base32pad = rfc4648({
      prefix: "c",
      name: "base32pad",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
      bitsPerChar: 5
    });
    base32padupper = rfc4648({
      prefix: "C",
      name: "base32padupper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
      bitsPerChar: 5
    });
    base32hex = rfc4648({
      prefix: "v",
      name: "base32hex",
      alphabet: "0123456789abcdefghijklmnopqrstuv",
      bitsPerChar: 5
    });
    base32hexupper = rfc4648({
      prefix: "V",
      name: "base32hexupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bitsPerChar: 5
    });
    base32hexpad = rfc4648({
      prefix: "t",
      name: "base32hexpad",
      alphabet: "0123456789abcdefghijklmnopqrstuv=",
      bitsPerChar: 5
    });
    base32hexpadupper = rfc4648({
      prefix: "T",
      name: "base32hexpadupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
      bitsPerChar: 5
    });
    base32z = rfc4648({
      prefix: "h",
      name: "base32z",
      alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
      bitsPerChar: 5
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36, base36upper;
var init_base36 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base36.js"() {
    init_define_process();
    init_base();
    base36 = baseX({
      prefix: "k",
      name: "base36",
      alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
    });
    base36upper = baseX({
      prefix: "K",
      name: "base36upper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc, base58flickr;
var init_base58 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base58.js"() {
    init_define_process();
    init_base();
    base58btc = baseX({
      name: "base58btc",
      prefix: "z",
      alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    });
    base58flickr = baseX({
      name: "base58flickr",
      prefix: "Z",
      alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64, base64pad, base64url, base64urlpad;
var init_base64 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base64.js"() {
    init_define_process();
    init_base();
    base64 = rfc4648({
      prefix: "m",
      name: "base64",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bitsPerChar: 6
    });
    base64pad = rfc4648({
      prefix: "M",
      name: "base64pad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      bitsPerChar: 6
    });
    base64url = rfc4648({
      prefix: "u",
      name: "base64url",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bitsPerChar: 6
    });
    base64urlpad = rfc4648({
      prefix: "U",
      name: "base64urlpad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
      bitsPerChar: 6
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
function encode2(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var alphabet, alphabetBytesToChars, alphabetCharsToBytes, base256emoji;
var init_base256emoji = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/bases/base256emoji.js"() {
    init_define_process();
    init_base();
    alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
    alphabetBytesToChars = alphabet.reduce((p, c, i) => {
      p[i] = c;
      return p;
    }, []);
    alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
      p[c.codePointAt(0)] = i;
      return p;
    }, []);
    base256emoji = from({
      prefix: "\u{1F680}",
      name: "base256emoji",
      encode: encode2,
      decode: decode2
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/vendor/varint.js
function encode3(num, out, offset) {
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
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
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
var encode_1, MSB, REST, MSBALL, INT, decode3, MSB$1, REST$1, N1, N2, N3, N4, N5, N6, N7, N8, N9, length, varint, _brrp_varint, varint_default;
var init_varint = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/vendor/varint.js"() {
    init_define_process();
    encode_1 = encode3;
    MSB = 128;
    REST = 127;
    MSBALL = ~REST;
    INT = Math.pow(2, 31);
    decode3 = read;
    MSB$1 = 128;
    REST$1 = 127;
    N1 = Math.pow(2, 7);
    N2 = Math.pow(2, 14);
    N3 = Math.pow(2, 21);
    N4 = Math.pow(2, 28);
    N5 = Math.pow(2, 35);
    N6 = Math.pow(2, 42);
    N7 = Math.pow(2, 49);
    N8 = Math.pow(2, 56);
    N9 = Math.pow(2, 63);
    length = function(value) {
      return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
    };
    varint = {
      encode: encode_1,
      decode: decode3,
      encodingLength: length
    };
    _brrp_varint = varint;
    varint_default = _brrp_varint;
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/varint.js
var decode4, encodeTo, encodingLength;
var init_varint2 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/varint.js"() {
    init_define_process();
    init_varint();
    decode4 = (data, offset = 0) => {
      const code2 = varint_default.decode(data, offset);
      return [
        code2,
        varint_default.decode.bytes
      ];
    };
    encodeTo = (int, target, offset = 0) => {
      varint_default.encode(int, target, offset);
      return target;
    };
    encodingLength = (int) => {
      return varint_default.encodingLength(int);
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/digest.js
var create, decode5, equals2, Digest;
var init_digest = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/digest.js"() {
    init_define_process();
    init_bytes();
    init_varint2();
    create = (code2, digest2) => {
      const size = digest2.byteLength;
      const sizeOffset = encodingLength(code2);
      const digestOffset = sizeOffset + encodingLength(size);
      const bytes = new Uint8Array(digestOffset + size);
      encodeTo(code2, bytes, 0);
      encodeTo(size, bytes, sizeOffset);
      bytes.set(digest2, digestOffset);
      return new Digest(code2, size, digest2, bytes);
    };
    decode5 = (multihash) => {
      const bytes = coerce(multihash);
      const [code2, sizeOffset] = decode4(bytes);
      const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
      const digest2 = bytes.subarray(sizeOffset + digestOffset);
      if (digest2.byteLength !== size) {
        throw new Error("Incorrect length");
      }
      return new Digest(code2, size, digest2, bytes);
    };
    equals2 = (a, b) => {
      if (a === b) {
        return true;
      } else {
        return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
      }
    };
    Digest = class {
      constructor(code2, size, digest2, bytes) {
        this.code = code2;
        this.size = size;
        this.digest = digest2;
        this.bytes = bytes;
      }
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/hasher.js
var from2, Hasher;
var init_hasher = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/hasher.js"() {
    init_define_process();
    init_digest();
    from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
    Hasher = class {
      constructor(name2, code2, encode5) {
        this.name = name2;
        this.code = code2;
        this.encode = encode5;
      }
      digest(input) {
        if (input instanceof Uint8Array) {
          const result = this.encode(input);
          return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
var sha, sha256, sha512;
var init_sha2_browser = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/sha2-browser.js"() {
    init_define_process();
    init_hasher();
    sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
    sha256 = from2({
      name: "sha2-256",
      code: 18,
      encode: sha("SHA-256")
    });
    sha512 = from2({
      name: "sha2-512",
      code: 19,
      encode: sha("SHA-512")
    });
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code, name, encode4, digest, identity2;
var init_identity2 = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/hashes/identity.js"() {
    init_define_process();
    init_bytes();
    init_digest();
    code = 0;
    name = "identity";
    encode4 = coerce;
    digest = (input) => create(code, encode4(input));
    identity2 = {
      code,
      name,
      encode: encode4,
      digest
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/codecs/raw.js
var init_raw = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/codecs/raw.js"() {
    init_define_process();
    init_bytes();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/codecs/json.js
var textEncoder, textDecoder;
var init_json = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/codecs/json.js"() {
    init_define_process();
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/cid.js
var CID, parseCIDtoBytes, toStringV0, toStringV1, DAG_PB_CODE, SHA_256_CODE, encodeCID, cidSymbol, readonly, hidden, version, deprecate, IS_CID_DEPRECATION;
var init_cid = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/cid.js"() {
    init_define_process();
    init_varint2();
    init_digest();
    init_base58();
    init_base32();
    init_bytes();
    CID = class {
      constructor(version2, code2, multihash, bytes) {
        this.code = code2;
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
            const { code: code2, multihash } = this;
            if (code2 !== DAG_PB_CODE) {
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
            const { code: code2, digest: digest2 } = this.multihash;
            const multihash = create(code2, digest2);
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
      toString(base3) {
        const { bytes, version: version2, _baseCache } = this;
        switch (version2) {
          case 0:
            return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
          default:
            return toStringV1(bytes, _baseCache, base3 || base32.encoder);
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
          const { version: version2, code: code2, multihash, bytes } = value;
          return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
          const { version: version2, multihash, code: code2 } = value;
          const digest2 = decode5(multihash);
          return CID.create(version2, code2, digest2);
        } else {
          return null;
        }
      }
      static create(version2, code2, digest2) {
        if (typeof code2 !== "number") {
          throw new Error("String codecs are no longer supported");
        }
        switch (version2) {
          case 0: {
            if (code2 !== DAG_PB_CODE) {
              throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
            } else {
              return new CID(version2, code2, digest2, digest2.bytes);
            }
          }
          case 1: {
            const bytes = encodeCID(version2, code2, digest2.bytes);
            return new CID(version2, code2, digest2, bytes);
          }
          default: {
            throw new Error("Invalid version");
          }
        }
      }
      static createV0(digest2) {
        return CID.create(0, DAG_PB_CODE, digest2);
      }
      static createV1(code2, digest2) {
        return CID.create(1, code2, digest2);
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
        const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
        return [
          cid,
          bytes.subarray(specs.size)
        ];
      }
      static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
          const [i, length2] = decode4(initialBytes.subarray(offset));
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
      static parse(source, base3) {
        const [prefix, bytes] = parseCIDtoBytes(source, base3);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
      }
    };
    parseCIDtoBytes = (source, base3) => {
      switch (source[0]) {
        case "Q": {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(`${base58btc.prefix}${source}`)
          ];
        }
        case base58btc.prefix: {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(source)
          ];
        }
        case base32.prefix: {
          const decoder = base3 || base32;
          return [
            base32.prefix,
            decoder.decode(source)
          ];
        }
        default: {
          if (base3 == null) {
            throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
          }
          return [
            source[0],
            base3.decode(source)
          ];
        }
      }
    };
    toStringV0 = (bytes, cache, base3) => {
      const { prefix } = base3;
      if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
      }
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes).slice(1);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    toStringV1 = (bytes, cache, base3) => {
      const { prefix } = base3;
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    DAG_PB_CODE = 112;
    SHA_256_CODE = 18;
    encodeCID = (version2, code2, multihash) => {
      const codeOffset = encodingLength(version2);
      const hashOffset = codeOffset + encodingLength(code2);
      const bytes = new Uint8Array(hashOffset + multihash.byteLength);
      encodeTo(version2, bytes, 0);
      encodeTo(code2, bytes, codeOffset);
      bytes.set(multihash, hashOffset);
      return bytes;
    };
    cidSymbol = Symbol.for("@ipld/js-cid/CID");
    readonly = {
      writable: false,
      configurable: false,
      enumerable: true
    };
    hidden = {
      writable: false,
      enumerable: false,
      configurable: false
    };
    version = "0.0.0-dev";
    deprecate = (range, message) => {
      if (range.test(version)) {
        console.warn(message);
      } else {
        throw new Error(message);
      }
    };
    IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
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
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/index.js
var init_src = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/index.js"() {
    init_define_process();
    init_cid();
    init_varint2();
    init_bytes();
    init_hasher();
    init_digest();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/basics.js
var bases, hashes;
var init_basics = __esm({
  "../../../../../Users/z/.yarn/berry/cache/multiformats-npm-9.9.0-73ec9f8079-9.zip/node_modules/multiformats/esm/src/basics.js"() {
    init_define_process();
    init_identity();
    init_base2();
    init_base8();
    init_base10();
    init_base16();
    init_base32();
    init_base36();
    init_base58();
    init_base64();
    init_base256emoji();
    init_sha2_browser();
    init_identity2();
    init_raw();
    init_json();
    init_src();
    bases = {
      ...identity_exports,
      ...base2_exports,
      ...base8_exports,
      ...base10_exports,
      ...base16_exports,
      ...base32_exports,
      ...base36_exports,
      ...base58_exports,
      ...base64_exports,
      ...base256emoji_exports
    };
    hashes = {
      ...sha2_browser_exports,
      ...identity_exports2
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/alloc.js
function alloc(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) {
    return globalThis.Buffer.alloc(size);
  }
  return new Uint8Array(size);
}
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size);
  }
  return new Uint8Array(size);
}
var init_alloc = __esm({
  "../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/alloc.js"() {
    init_define_process();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string, ascii, BASES, bases_default;
var init_bases = __esm({
  "../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/util/bases.js"() {
    init_define_process();
    init_basics();
    init_alloc();
    string = createCodec("utf8", "u", (buf) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf);
    }, (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    });
    ascii = createCodec("ascii", "a", (buf) => {
      let string2 = "a";
      for (let i = 0; i < buf.length; i++) {
        string2 += String.fromCharCode(buf[i]);
      }
      return string2;
    }, (str) => {
      str = str.substring(1);
      const buf = allocUnsafe(str.length);
      for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    });
    BASES = {
      utf8: string,
      "utf-8": string,
      hex: bases.base16,
      latin1: ascii,
      ascii,
      binary: ascii,
      ...bases
    };
    bases_default = BASES;
  }
});

// ../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/to-string.js
var to_string_exports = {};
__export(to_string_exports, {
  toString: () => toString2
});
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
var init_to_string = __esm({
  "../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/to-string.js"() {
    init_define_process();
    init_bases();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/err-code-npm-3.0.1-3a0dc5fc51-9.zip/node_modules/err-code/index.js
var require_err_code = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/err-code-npm-3.0.1-3a0dc5fc51-9.zip/node_modules/err-code/index.js"(exports, module) {
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
    function createError(err, code2, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code2 === "object") {
        props = code2;
        code2 = "";
      }
      if (code2) {
        props.code = code2;
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
    module.exports = createError;
  }
});

// ../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/encode.js
var require_encode = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/encode.js"(exports, module) {
    init_define_process();
    module.exports = encode5;
    var MSB2 = 128;
    var REST2 = 127;
    var MSBALL2 = ~REST2;
    var INT2 = Math.pow(2, 31);
    function encode5(num, out, offset) {
      if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
        encode5.bytes = 0;
        throw new RangeError("Could not encode varint");
      }
      out = out || [];
      offset = offset || 0;
      var oldOffset = offset;
      while (num >= INT2) {
        out[offset++] = num & 255 | MSB2;
        num /= 128;
      }
      while (num & MSBALL2) {
        out[offset++] = num & 255 | MSB2;
        num >>>= 7;
      }
      out[offset] = num | 0;
      encode5.bytes = offset - oldOffset + 1;
      return out;
    }
  }
});

// ../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/decode.js
var require_decode = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/decode.js"(exports, module) {
    init_define_process();
    module.exports = read2;
    var MSB2 = 128;
    var REST2 = 127;
    function read2(buf, offset) {
      var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
      do {
        if (counter >= l || shift > 49) {
          read2.bytes = 0;
          throw new RangeError("Could not decode varint");
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST2) << shift : (b & REST2) * Math.pow(2, shift);
        shift += 7;
      } while (b >= MSB2);
      read2.bytes = counter - offset;
      return res;
    }
  }
});

// ../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/length.js
var require_length = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/length.js"(exports, module) {
    init_define_process();
    var N12 = Math.pow(2, 7);
    var N22 = Math.pow(2, 14);
    var N32 = Math.pow(2, 21);
    var N42 = Math.pow(2, 28);
    var N52 = Math.pow(2, 35);
    var N62 = Math.pow(2, 42);
    var N72 = Math.pow(2, 49);
    var N82 = Math.pow(2, 56);
    var N92 = Math.pow(2, 63);
    module.exports = function(value) {
      return value < N12 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N42 ? 4 : value < N52 ? 5 : value < N62 ? 6 : value < N72 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/index.js
var require_varint = __commonJS({
  "../../../../../Users/z/.yarn/berry/cache/varint-npm-6.0.0-a638e8f225-9.zip/node_modules/varint/index.js"(exports, module) {
    init_define_process();
    module.exports = {
      encode: require_encode(),
      decode: require_decode(),
      encodingLength: require_length()
    };
  }
});

// ../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/concat.js
var concat_exports = {};
__export(concat_exports, {
  concat: () => concat
});
function concat(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
var init_concat = __esm({
  "../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/concat.js"() {
    init_define_process();
    init_alloc();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/equals.js
var equals_exports = {};
__export(equals_exports, {
  equals: () => equals3
});
function equals3(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_equals = __esm({
  "../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/equals.js"() {
    init_define_process();
  }
});

// ../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/from-string.js
var from_string_exports = {};
__export(from_string_exports, {
  fromString: () => fromString2
});
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
var init_from_string = __esm({
  "../../../../../Users/z/.yarn/berry/cache/uint8arrays-npm-3.1.0-cd35ea0b8f-9.zip/node_modules/uint8arrays/esm/src/from-string.js"() {
    init_define_process();
    init_bases();
  }
});

export {
  base58btc,
  init_base58,
  base32,
  init_base32,
  base64,
  init_base64,
  require_err_code,
  create,
  decode5 as decode,
  init_digest,
  sha256,
  init_sha2_browser,
  identity2 as identity,
  init_identity2 as init_identity,
  CID,
  init_cid,
  bases,
  init_basics,
  alloc,
  allocUnsafe,
  init_alloc,
  toString2 as toString,
  to_string_exports,
  init_to_string,
  require_varint,
  fromString2 as fromString,
  from_string_exports,
  init_from_string,
  concat,
  concat_exports,
  init_concat,
  equals3 as equals,
  equals_exports,
  init_equals
};
