function b() {
}
b.prototype = {
  diff: function (n, r) {
    var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      s = t.callback;
    typeof t == "function" && (s = t, t = {}), this.options = t;
    var i = this;
    function l(d) {
      return s
        ? (setTimeout(function () {
          s(void 0, d);
        }, 0),
          !0)
        : d;
    }
    n = this.castInput(n),
      r = this.castInput(r),
      n = this.removeEmpty(this.tokenize(n)),
      r = this.removeEmpty(this.tokenize(r));
    var f = r.length,
      a = n.length,
      o = 1,
      p = f + a,
      c = [
        {
          newPos: -1,
          components: [],
        },
      ],
      u = this.extractCommon(c[0], r, n, 0);
    if (c[0].newPos + 1 >= f && u + 1 >= a) {
      return l([
        {
          value: this.join(r),
          count: r.length,
        },
      ]);
    }
    function v() {
      for (var d = -1 * o; d <= o; d += 2) {
        var w = void 0, y = c[d - 1], L = c[d + 1], x = (L ? L.newPos : 0) - d;
        y && (c[d - 1] = void 0);
        var g = y && y.newPos + 1 < f, F = L && 0 <= x && x < a;
        if (!g && !F) {
          c[d] = void 0;
          continue;
        }
        if (
          !g || F && y.newPos < L.newPos
            ? (w = le(L), i.pushComponent(w.components, void 0, !0))
            : (w = y, w.newPos++, i.pushComponent(w.components, !0, void 0)),
            x = i.extractCommon(w, r, n, d),
            w.newPos + 1 >= f && x + 1 >= a
        ) {
          return l(se(i, w.components, r, n, i.useLongestToken));
        }
        c[d] = w;
      }
      o++;
    }
    if (s) {
      (function d() {
        setTimeout(function () {
          if (o > p) return s();
          v() || d();
        }, 0);
      })();
    } else {
      for (; o <= p;) {
        var h = v();
        if (h) return h;
      }
    }
  },
  pushComponent: function (n, r, t) {
    var s = n[n.length - 1];
    s && s.added === r && s.removed === t
      ? n[n.length - 1] = {
        count: s.count + 1,
        added: r,
        removed: t,
      }
      : n.push({
        count: 1,
        added: r,
        removed: t,
      });
  },
  extractCommon: function (n, r, t, s) {
    for (
      var i = r.length, l = t.length, f = n.newPos, a = f - s, o = 0;
      f + 1 < i && a + 1 < l && this.equals(r[f + 1], t[a + 1]);
    ) {
      f++, a++, o++;
    }
    return o && n.components.push({
      count: o,
    }),
      n.newPos = f,
      a;
  },
  equals: function (n, r) {
    return this.options.comparator
      ? this.options.comparator(n, r)
      : n === r ||
        this.options.ignoreCase && n.toLowerCase() === r.toLowerCase();
  },
  removeEmpty: function (n) {
    for (var r = [], t = 0; t < n.length; t++) n[t] && r.push(n[t]);
    return r;
  },
  castInput: function (n) {
    return n;
  },
  tokenize: function (n) {
    return n.split("");
  },
  join: function (n) {
    return n.join("");
  },
};
function se(e, n, r, t, s) {
  for (var i = 0, l = n.length, f = 0, a = 0; i < l; i++) {
    var o = n[i];
    if (o.removed) {
      if (
        o.value = e.join(t.slice(a, a + o.count)),
          a += o.count,
          i && n[i - 1].added
      ) {
        var c = n[i - 1];
        n[i - 1] = n[i], n[i] = c;
      }
    } else {
      if (!o.added && s) {
        var p = r.slice(f, f + o.count);
        p = p.map(function (v, h) {
          var d = t[a + h];
          return d.length > v.length ? d : v;
        }), o.value = e.join(p);
      } else o.value = e.join(r.slice(f, f + o.count));
      f += o.count, o.added || (a += o.count);
    }
  }
  var u = n[l - 1];
  return l > 1 && typeof u.value == "string" && (u.added || u.removed) &&
    e.equals("", u.value) && (n[l - 2].value += u.value, n.pop()),
    n;
}
function le(e) {
  return {
    newPos: e.newPos,
    components: e.components.slice(0),
  };
}
var fe = new b();
function oe(e, n, r) {
  return fe.diff(e, n, r);
}
var Y = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
  K = /\S/,
  j = new b();
j.equals = function (e, n) {
  return this.options.ignoreCase && (e = e.toLowerCase(), n = n.toLowerCase()),
    e === n || this.options.ignoreWhitespace && !K.test(e) && !K.test(n);
},
  j.tokenize = function (e) {
    for (
      var n = e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), r = 0;
      r < n.length - 1;
      r++
    ) {
      !n[r + 1] && n[r + 2] && Y.test(n[r]) && Y.test(n[r + 2]) &&
        (n[r] += n[r + 2], n.splice(r + 1, 2), r--);
    }
    return n;
  };
var U = new b();
U.tokenize = function (e) {
  var n = [], r = e.split(/(\n|\r\n)/);
  r[r.length - 1] || r.pop();
  for (var t = 0; t < r.length; t++) {
    var s = r[t];
    t % 2 && !this.options.newlineIsToken
      ? n[n.length - 1] += s
      : (this.options.ignoreWhitespace && (s = s.trim()), n.push(s));
  }
  return n;
};
var ae = new b();
ae.tokenize = function (e) {
  return e.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var de = new b();
de.tokenize = function (e) {
  return e.split(/([{}:;,]|\s+)/);
};
function W(e) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
    ? W = function (n) {
      return typeof n;
    }
    : W = function (n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol &&
          n !== Symbol.prototype
        ? "symbol"
        : typeof n;
    },
    W(e);
}
var ge = Object.prototype.toString, q = new b();
q.useLongestToken = !0,
  q.tokenize = U.tokenize,
  q.castInput = function (e) {
    var n = this.options,
      r = n.undefinedReplacement,
      t = n.stringifyReplacer,
      s = t === void 0
        ? function (i, l) {
          return typeof l == "undefined" ? r : l;
        }
        : t;
    return typeof e == "string" ? e
    : JSON.stringify(Z(e, null, null, s), s, "  ");
  },
  q.equals = function (e, n) {
    return b.prototype.equals.call(
      q,
      e.replace(/,([\r\n])/g, "$1"),
      n.replace(/,([\r\n])/g, "$1"),
    );
  };
function Z(e, n, r, t, s) {
  n = n || [], r = r || [], t && (e = t(s, e));
  var i;
  for (i = 0; i < n.length; i += 1) if (n[i] === e) return r[i];
  var l;
  if (ge.call(e) === "[object Array]") {
    for (
      n.push(e), l = new Array(e.length), r.push(l), i = 0; i < e.length; i += 1
    ) {
      l[i] = Z(e[i], n, r, t, s);
    }
    return n.pop(), r.pop(), l;
  }
  if (e && e.toJSON && (e = e.toJSON()), W(e) === "object" && e !== null) {
    n.push(e), l = {}, r.push(l);
    var f = [], a;
    for (a in e) e.hasOwnProperty(a) && f.push(a);
    for (f.sort(), i = 0; i < f.length; i += 1) {
      a = f[i], l[a] = Z(e[a], n, r, t, a);
    }
    n.pop(), r.pop();
  } else l = e;
  return l;
}
var B = new b();
B.tokenize = function (e) {
  return e.slice();
},
  B.join = B.removeEmpty = function (e) {
    return e;
  };
const sha256 = async (x) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ).slice(0, 4),
  ).map((b1) => ("00" + b1.toString(16)).slice(-2)).join("");
const diff = async (str1, str2) => {
  const sha1Str1 = sha256(str1);
  const res = oe(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x) => x.added ? x.value : x.removed ? -x.count : x.count),
  };
};
const isDiff = (str) => {
  if (str.length < 10) {
    return false;
  }
  const isKey = [
    ...str.slice(0, 8),
  ].filter((x) => x < "0" || x > "f").length === 0;
  const maybeInst = str.slice(8);
  if (
    isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
  ) {
    try {
      return JSON.parse(maybeInst).length > 1;
    } catch (_a) {
      return false;
    }
  }
  return false;
};
const assemble = (oldValue, instructions) => {
  const instArr = JSON.parse(instructions);
  let old = oldValue.slice();
  let ret = "";
  instArr.forEach((element) => {
    if (Number(element) === element) {
      const absNum = Math.abs(element);
      const currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) {
        ret += String(currentString);
      }
    } else {
      ret += String(element);
    }
  });
  return ret;
};
const getDbObj = (db) => {
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        data = await db.get(key);
        if (!data) {
          return null;
        }
      } catch (_) {
        return null;
      }
      if (format === "json") {
        try {
          const json = JSON.parse(data);
          return json;
        } catch (_a) {
          return data;
        }
      }
      const allData = await data;
      if (format === "string") {
        if (typeof allData === "string" && format === "string") {
          const text = allData;
          if (isDiff(text)) {
            const keyOfDiff = text.slice(0, 8);
            const instructions = text.slice(8);
            const oldValue = await dbObj.get(keyOfDiff);
            return assemble(oldValue, instructions);
          }
          return allData;
        }
        return new TextDecoder().decode(allData);
      }
      return data;
    },
    async put(key, val) {
      let prev;
      try {
        const oldKey = await dbObj.get(key);
        if (
          typeof oldKey === "string" && typeof val === "string" &&
          oldKey.length === 8 && oldKey !== val
        ) {
          const actualValue = await dbObj.get(val);
          const prevValue = await dbObj.get(oldKey);
          if (typeof prevValue === "string") {
            const prevSha = await sha256(prevValue);
            if (prevSha === oldKey) {
              const diffObj = await diff(actualValue, prevValue);
              const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
              await dbObj.put(prevSha, diffAsStr);
            }
          }
        }
      } catch (_a) {
        prev = "";
      }
      if (prev !== "" && val === prev) {
        return val;
      }
      let str;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      } else {
        str = val;
      }
      return await db.put(key, str);
    },
    async delete(key) {
      return await db.delete(key);
    },
    async clear() {
      return await db.clear();
    },
    async keys() {
      return await db.getAllKeys();
    },
  };
  return dbObj;
};
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};
function json(resp) {
  return new Response(JSON.stringify(resp), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
function text(resp) {
  return new Response(resp, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}
function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    const respHeaders = {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers",
      ),
    };
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: corsHeaders["Access-Control-Allow-Methods"],
      },
    });
  }
}
async function handleAdmin(request, searchParams, pathname, SHAKV) {
  if (pathname === "/keys/") {
    const prefix = searchParams.get("prefix");
    const value = await SHAKV.list({
      prefix,
    });
    return json(value);
  }
  if (pathname === "/keys/delete/") {
    const hash = searchParams.get("hash");
    const value = await SHAKV.delete(hash);
    return json(value);
  }
  return json({
    error: "not implemented",
  });
}
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues =
      typeof crypto !== "undefined" && crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto) ||
      typeof msCrypto !== "undefined" &&
        typeof msCrypto.getRandomValues === "function" &&
        msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    }
  }
  return getRandomValues(rnds8);
}
const __default =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : 0;
  var uuid =
    (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] +
      byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" +
      byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" +
      byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" +
      byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" +
      byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] +
      byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] +
      byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}
const v41 = () => v4();
const publicIpfsGateways = [
  "https://ipfs.io/ipfs/:hash",
  "https://dweb.link/ipfs/:hash",
  "https://gateway.ipfs.io/ipfs/:hash",
  "https://ipfs.infura.io/ipfs/:hash",
  "https://ninetailed.ninja/ipfs/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.sloppyta.co/ipfs/:hash",
  "https://ipfs.greyh.at/ipfs/:hash",
  "https://jorropo.ovh/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://gateway.temporal.cloud/ipfs/:hash",
  "https://ipfs.runfission.com/ipfs/:hash",
  "https://trusti.id/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
  "https://ipfs.ink/ipfs/:hash",
  "https://gateway.ravenland.org/ipfs/:hash",
  "https://ipfs.smartsignature.io/ipfs/:hash",
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://ipfs.mttk.net/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://ipfs.jbb.one/ipfs/:hash",
  "https://jacl.tech/ipfs/:hash",
  "https://ipfs.k1ic.com/ipfs/:hash",
  "https://ipfs.drink.cafe/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://gw.ipfspin.com/ipfs/:hash",
  "https://ipfs.denarius.io/ipfs/:hash",
];
function raceToSuccess(promises) {
  let numRejected = 0;
  return new Promise((resolve, reject) =>
    promises.forEach((promise) =>
      promise.then(resolve).catch(() => {
        if ((++numRejected) === promises.length) reject();
      })
    )
  );
}
var SHAKV;
var USERS;
var LOGS;
var SIGNALS;
var USERKEYS;
var API_KEY;
let now = 0;
function log(message, data = {}) {
  now = now || Date.now();
  const [hour, minute] = new Date().toLocaleTimeString("en-US").split(/:| /);
  return LOGS.put(
    String(2000000000000 - now++),
    JSON.stringify({
      message,
      time: `${hour}:${minute}`,
      data,
    }),
    {
      expirationTtl: 86400 * 7,
    },
  );
}
async function handleCloudRequest(request) {
  const { country, colo } = request.cf || {
    country: "",
    colo: "",
  };
  const url = new URL(request.url);
  const { searchParams, pathname } = url;
  const psk = String(request.headers.get("API_KEY") || "");
  await log("request", {
    searchParams,
    pathname,
    country,
    colo,
  });
  if (request.method === "GET" && psk && psk == API_KEY) {
    return handleAdmin(request, searchParams, pathname, SHAKV);
  } else if (request.method === "GET") {
    if (pathname === "/robots.txt") {
      return text("User-agent: * Disallow: /");
    }
    if (pathname.slice(0, 7) === "/signal") {
      const cid = searchParams.get("cid") || "";
      const signal = searchParams.get("signal") || "";
      const key = searchParams.get("key") || "";
      if (cid.length === 46 && signal.length === 8) {
        await SIGNALS.put(signal, cid, {
          expirationTtl: 86400 * 7,
        });
        return json({
          success: true,
        });
      } else if (signal.length === 8) {
        const msg = await SIGNALS.get(signal);
        if (msg === null) return text("404");
        return text(msg);
      }
      return text("error....");
    }
    if (pathname === "/connect") {
      if (searchParams.get("key")) {
        const key = searchParams.get("key");
        const tokenKey = key.slice(0, 8);
        const userIdKey = key.slice(8, 16);
        const pass = key.slice(16, 24);
        const tokenPassUserId = key.slice(24, 32);
        const checkTokenPassUserId = await sha256(tokenKey + userIdKey);
        if (
          !tokenKey || !userIdKey || !pass ||
          checkTokenPassUserId !== tokenPassUserId
        ) {
          return json({
            error: "auth error",
          });
        }
        const uuid = await USERKEYS.get(userIdKey);
        if (uuid === null) {
          return json({
            error: 401,
          });
        }
        const tokenUuid = await USERKEYS.get(tokenKey);
        if (tokenUuid === null) {
          return json({
            error: 404,
            message: "token not found",
          });
        }
        const checkPass = await sha256(tokenKey + uuid);
        const checkPassToken = await sha256(tokenUuid + uuid);
        if (checkPass === pass) {
          await USERS.put(
            tokenUuid,
            JSON.stringify({
              uuid,
              connected: userIdKey,
            }),
            {
              expirationTtl: 60,
            },
          );
          return json({
            success: true,
          });
        } else if (checkPassToken === pass) {
          return json({
            success: true,
          });
        }
        return json({
          error: 401,
        });
      }
    }
    if (pathname === "/check") {
      const key = searchParams.get("key");
      if (key === null) return new Response("500");
      const waitForChange = async () => {
        const uuid = await USERKEYS.get(key);
        if (!uuid) return null;
        const data = await USERS.get(uuid, "json");
        if (!data || data.connected) {
          return data;
        }
        return new Promise((resolve) => {
          const clear = setInterval(async () => {
            const data1 = await USERS.get(uuid, "json");
            if (!data1 || data1.connected) {
              clearInterval(clear);
              resolve(data1);
            }
          }, 1000);
        });
      };
      const data = await waitForChange();
      return json({
        expired: data === null,
      });
    }
    if (pathname === "/register") {
      const uuid = v41();
      const uuidHash = await sha256(uuid);
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          uuidHash,
          registered: Date.now(),
          country,
          colo,
        }),
      );
      await log("register", {
        uuidHash,
      });
      await USERKEYS.put(uuidHash, uuid);
      return json({
        uuid,
      });
    }
    if (pathname === "/token") {
      const uuid = v41();
      const uuidHash = await sha256(uuid);
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          registered: Date.now(),
          country,
          colo,
        }),
        {
          expirationTtl: 60,
        },
      );
      await USERKEYS.put(uuidHash, uuid, {
        expirationTtl: 60,
      });
      return json({
        uuid,
        key: uuidHash,
      });
    }
    if (pathname === "/create-project") {
      const uuidHash = request.headers.get("TOKEN");
      const uuid = v41();
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          registered: Date.now(),
          country,
          colo,
        }),
      );
      return json({
        uuid,
      });
    }
    const maybeRoute = pathname.substr(1);
    const isKey = [
          ...maybeRoute,
        ].filter((x) => x < "0" || x > "f").length === 0 &&
      maybeRoute.length === 8;
    if (maybeRoute && isKey) {
      return Response.redirect(
        `https://code.zed.vision/?signalToQr=${maybeRoute}`,
        307,
      );
    }
    if (pathname.slice(0, 6) === "/ipfs/") {
      const cache = caches.default;
      let response = await cache.match(request);
      if (!response) {
        const random5GatewaysFetch = publicIpfsGateways.sort(() =>
          0.5 - Math.random()
        ).slice(0, 8).map((gw) => gw.replace("/ipfs/:hash", pathname)).map((
          x,
        ) =>
          fetch(x).then((res) =>
            res.status === 200 ? res : (() => {
              throw new Error("Not found");
            })()
          )
        );
        try {
          response = await raceToSuccess(random5GatewaysFetch);
          if (typeof response === "undefined") return text("Please try again");
          await cache.put(request, response.clone());
        } catch {
          return text("please try again");
        }
      }
      if (response.status > 399) {
        response = new Response(response.statusText, {
          status: response.status,
        });
      }
      return response;
    }
    if (pathname === "/") {
      return Response.redirect(
        "https://code.zed.vision/ipfs/QmZHkLVcsmBrrEuYjNUNDSmcNjZcjZPnkyLwLjk5oa9wF5/",
        302,
      );
    }
    if (pathname === "/code" || pathname === "/code/") {
      return Response.redirect(`https://code.zed.vision`, 302);
    }
    return text(pathname);
  } else if (request.method === "POST") {
    const zkey = String(request.headers.get("ZKEY") || "");
    const sha = zkey.slice(0, 8);
    const uKey = zkey.slice(8, 16);
    const gKey = zkey.slice(16, 24);
    const proofKey = zkey.slice(24, 32);
    if (!sha || !uKey || !gKey || !proofKey) {
      return json({
        error: 401,
        "message": "not matching keys",
      });
    }
    const checkGkey = await sha256(sha + uKey);
    if (checkGkey !== gKey) {
      return json({
        error: 401,
        "message": "content and userkeys are not a pain",
      });
    }
    const myBuffer = await request.arrayBuffer();
    const hash = await sha256(myBuffer);
    const smallerKey = hash.substring(0, 8);
    if (smallerKey !== sha) {
      return json({
        error: 401,
        message:
          `body hash not matching with the sent hash: ${smallerKey} -- ${zkey}`,
      });
    }
    const uuid = await USERKEYS.get(uKey);
    if (!uuid) {
      return json({
        error: 500,
        message: "user not found",
      });
    }
    const checkProofKey = await sha256(sha + uuid);
    if (checkProofKey !== proofKey) {
      return json({
        error: 401,
        message: "user not verified",
      });
    }
    await log("new html", {
      sha,
      uKey,
    });
    const maybeRoute = pathname.substr(1);
    await SHAKV.put(smallerKey, myBuffer);
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = await shaDB.put(maybeRoute, smallerKey);
    }
    return json({
      hash: smallerKey,
    });
  }
  return new Response("404");
}
addEventListener("fetch", (event) => {
  if (event.request.method === "OPTIONS") {
    event.respondWith(handleOptions(event.request));
  } else {
    event.respondWith(handleCloudRequest(event.request));
  }
});
