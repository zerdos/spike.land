function h() {
}
h.prototype = {
  diff: function (e, t) {
    var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      u = o.callback;
    typeof o == "function" && (u = o, o = {}), this.options = o;
    var r = this;
    function s(l) {
      return u
        ? (setTimeout(function () {
          u(void 0, l);
        }, 0),
          !0)
        : l;
    }
    e = this.castInput(e),
      t = this.castInput(t),
      e = this.removeEmpty(this.tokenize(e)),
      t = this.removeEmpty(this.tokenize(t));
    var p = t.length,
      i = e.length,
      f = 1,
      d = p + i,
      c = [
        {
          newPos: -1,
          components: [],
        },
      ],
      a = this.extractCommon(c[0], t, e, 0);
    if (c[0].newPos + 1 >= p && a + 1 >= i) {
      return s([
        {
          value: this.join(t),
          count: t.length,
        },
      ]);
    }
    function w() {
      for (var l = -1 * f; l <= f; l += 2) {
        var v = void 0, y = c[l - 1], C = c[l + 1], z = (C ? C.newPos : 0) - l;
        y && (c[l - 1] = void 0);
        var g = y && y.newPos + 1 < p, q = C && 0 <= z && z < i;
        if (!g && !q) {
          c[l] = void 0;
          continue;
        }
        if (
          !g || q && y.newPos < C.newPos
            ? (v = N(C), r.pushComponent(v.components, void 0, !0))
            : (v = y, v.newPos++, r.pushComponent(v.components, !0, void 0)),
            z = r.extractCommon(v, t, e, l),
            v.newPos + 1 >= p && z + 1 >= i
        ) {
          return s(F(r, v.components, t, e, r.useLongestToken));
        }
        c[l] = v;
      }
      f++;
    }
    if (u) {
      (function l() {
        setTimeout(function () {
          if (f > d) return u();
          w() || l();
        }, 0);
      })();
    } else {
      for (; f <= d;) {
        var L = w();
        if (L) return L;
      }
    }
  },
  pushComponent: function (e, t, o) {
    var u = e[e.length - 1];
    u && u.added === t && u.removed === o
      ? e[e.length - 1] = {
        count: u.count + 1,
        added: t,
        removed: o,
      }
      : e.push({
        count: 1,
        added: t,
        removed: o,
      });
  },
  extractCommon: function (e, t, o, u) {
    for (
      var r = t.length, s = o.length, p = e.newPos, i = p - u, f = 0;
      p + 1 < r && i + 1 < s && this.equals(t[p + 1], o[i + 1]);
    ) {
      p++, i++, f++;
    }
    return f && e.components.push({
      count: f,
    }),
      e.newPos = p,
      i;
  },
  equals: function (e, t) {
    return this.options.comparator
      ? this.options.comparator(e, t)
      : e === t ||
        this.options.ignoreCase && e.toLowerCase() === t.toLowerCase();
  },
  removeEmpty: function (e) {
    for (var t = [], o = 0; o < e.length; o++) e[o] && t.push(e[o]);
    return t;
  },
  castInput: function (e) {
    return e;
  },
  tokenize: function (e) {
    return e.split("");
  },
  join: function (e) {
    return e.join("");
  },
};
function F(n, e, t, o, u) {
  for (var r = 0, s = e.length, p = 0, i = 0; r < s; r++) {
    var f = e[r];
    if (f.removed) {
      if (
        f.value = n.join(o.slice(i, i + f.count)),
          i += f.count,
          r && e[r - 1].added
      ) {
        var c = e[r - 1];
        e[r - 1] = e[r], e[r] = c;
      }
    } else {
      if (!f.added && u) {
        var d = t.slice(p, p + f.count);
        d = d.map(function (w, L) {
          var l = o[i + L];
          return l.length > w.length ? l : w;
        }), f.value = n.join(d);
      } else f.value = n.join(t.slice(p, p + f.count));
      p += f.count, f.added || (i += f.count);
    }
  }
  var a = e[s - 1];
  return s > 1 && typeof a.value == "string" && (a.added || a.removed) &&
    n.equals("", a.value) && (e[s - 2].value += a.value, e.pop()),
    e;
}
function N(n) {
  return {
    newPos: n.newPos,
    components: n.components.slice(0),
  };
}
var W = new h();
function A(n, e, t) {
  return W.diff(n, e, t);
}
var $ = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
  I = /\S/,
  O = new h();
O.equals = function (n, e) {
  return this.options.ignoreCase && (n = n.toLowerCase(), e = e.toLowerCase()),
    n === e || this.options.ignoreWhitespace && !I.test(n) && !I.test(e);
},
  O.tokenize = function (n) {
    for (
      var e = n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0;
      t < e.length - 1;
      t++
    ) {
      !e[t + 1] && e[t + 2] && $.test(e[t]) && $.test(e[t + 2]) &&
        (e[t] += e[t + 2], e.splice(t + 1, 2), t--);
    }
    return e;
  };
var T = new h();
T.tokenize = function (n) {
  var e = [], t = n.split(/(\n|\r\n)/);
  t[t.length - 1] || t.pop();
  for (var o = 0; o < t.length; o++) {
    var u = t[o];
    o % 2 && !this.options.newlineIsToken
      ? e[e.length - 1] += u
      : (this.options.ignoreWhitespace && (u = u.trim()), e.push(u));
  }
  return e;
};
var J = new h();
J.tokenize = function (n) {
  return n.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var R = new h();
R.tokenize = function (n) {
  return n.split(/([{}:;,]|\s+)/);
};
function x(n) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
    ? x = function (e) {
      return typeof e;
    }
    : x = function (e) {
      return e && typeof Symbol == "function" && e.constructor === Symbol &&
          e !== Symbol.prototype
        ? "symbol"
        : typeof e;
    },
    x(n);
}
var V = Object.prototype.toString, m = new h();
m.useLongestToken = !0,
  m.tokenize = T.tokenize,
  m.castInput = function (n) {
    var e = this.options,
      t = e.undefinedReplacement,
      o = e.stringifyReplacer,
      u = o === void 0
        ? function (r, s) {
          return typeof s == "undefined" ? t : s;
        }
        : o;
    return typeof n == "string" ? n
    : JSON.stringify(D(n, null, null, u), u, "  ");
  },
  m.equals = function (n, e) {
    return h.prototype.equals.call(
      m,
      n.replace(/,([\r\n])/g, "$1"),
      e.replace(/,([\r\n])/g, "$1"),
    );
  };
function D(n, e, t, o, u) {
  e = e || [], t = t || [], o && (n = o(u, n));
  var r;
  for (r = 0; r < e.length; r += 1) if (e[r] === n) return t[r];
  var s;
  if (V.call(n) === "[object Array]") {
    for (
      e.push(n), s = new Array(n.length), t.push(s), r = 0; r < n.length; r += 1
    ) {
      s[r] = D(n[r], e, t, o, u);
    }
    return e.pop(), t.pop(), s;
  }
  if (n && n.toJSON && (n = n.toJSON()), x(n) === "object" && n !== null) {
    e.push(n), s = {}, t.push(s);
    var p = [], i;
    for (i in n) n.hasOwnProperty(i) && p.push(i);
    for (p.sort(), r = 0; r < p.length; r += 1) {
      i = p[r], s[i] = D(n[i], e, t, o, i);
    }
    e.pop(), t.pop();
  } else s = n;
  return s;
}
var E = new h();
E.tokenize = function (n) {
  return n.slice();
},
  E.join = E.removeEmpty = function (n) {
    return n;
  };
const sha256 = async (x1) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x1 === "string" ? new TextEncoder().encode(x1) : x1,
      ),
    ).slice(0, 4),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
const diff = async (str1, str2) => {
  const sha1Str1 = sha256(str1);
  const res = A(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x1) => x1.added ? x1.value : x1.removed ? -x1.count : x1.count),
  };
};
const isDiff = (str) => {
  if (str.length < 10) {
    return false;
  }
  const isKey = [
    ...str.slice(0, 8),
  ].filter((x1) => x1 < "0" || x1 > "f").length === 0;
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
        ].filter((x1) => x1 < "0" || x1 > "f").length === 0 &&
      maybeRoute.length === 8;
    if (maybeRoute && isKey) {
      return Response.redirect(
        `https://code.zed-vision.workers.dev/?signalToQr=${maybeRoute}`,
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
          x1,
        ) =>
          fetch(x1).then((res) =>
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
        "https://code.zed-vision.workers.dev/ipfs/QmZHkLVcsmBrrEuYjNUNDSmcNjZcjZPnkyLwLjk5oa9wF5/",
        302,
      );
    }
    if (pathname === "/code" || pathname === "/code/") {
      return Response.redirect(`https://code.zed-vision.workers.dev`, 302);
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
