const sha256 = async (x) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ).slice(0, 4),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
const getDbObj = (dbPromise, isIdb = false) => {
  const sha2561 = async (x) =>
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          typeof x === "string" ? new TextEncoder().encode(x) : x,
        ),
      ).slice(0, 4),
    ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        if (isIdb) {
          data = await (await dbPromise).get("codeStore", key);
        } else {
          data = await dbPromise.get(key);
        }
        if (!data) return null;
      } catch (_) {
        return null;
      }
      if (format === "json") {
        return JSON.parse(data);
      }
      if (format === "string") {
        const allData = await data;
        if (typeof allData === "string" && format === "string") {
          const text = allData;
          if (isDiff(allData)) {
            const keyOfDiff = allData.slice(0, 8);
            const instructions = allData.slice(8);
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
            const prevSha = await sha2561(prevValue);
            if (prevSha === oldKey) {
              const diffObj = await diff(actualValue, prevValue);
              const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
              dbObj.put(prevSha, diffAsStr);
            }
          }
        }
      } catch {
        prev = "";
      }
      if (prev !== "" && val === prev) return val;
      let str;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      } else {
        str = val;
      }
      if (isIdb) {
        return (await dbPromise).put("codeStore", str, key);
      } else {
        return await dbPromise.put(key, str);
      }
    },
    async delete(key) {
      return (await dbPromise).delete("codeStore", key);
    },
    async clear() {
      return (await dbPromise).clear("codeStore");
    },
    async keys() {
      return (await dbPromise).getAllKeys("codeStore");
    },
  };
  return dbObj;
};
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
const __default1 =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default1.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0
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
var SHAKV;
var USERS;
var LOGS;
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
function js(resp) {
  return new Response(resp, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/javascript;charset=UTF-8",
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
async function handleAdmin(request, searchParams, pathname, SHAKV1) {
  if (pathname === "/keys/") {
    const prefix = searchParams.get("prefix");
    const value = await SHAKV1.list({
      prefix,
    });
    return json(value);
  }
  if (pathname === "/keys/delete/") {
    const hash = searchParams.get("hash");
    const value = await SHAKV1.delete(hash);
    return json(value);
  }
  return json({
    error: "not implemented",
  });
}
const v4 = () => gen();
async function handleCloudRequest(request) {
  const { country, colo } = request.cf || {
    country: "",
    colo: "",
  };
  const url = new URL(request.url);
  const { searchParams, pathname } = url;
  const psk = String(request.headers.get("API_KEY") || "");
  log("request", {
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
      const uuid = v4();
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
      const uuid = v4();
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
      const uuid = v4();
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
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = await shaDB.get(maybeRoute);
      if (result !== null) {
        if (result.indexOf("export") === 0) return js(result);
        return text(result);
      }
    }
    return Response.redirect("https://zed.vision/code", 301);
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
const gen = __default2;
const __default2 = __default2;
const __default2 = __default2;
