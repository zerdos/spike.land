async function arrBuffSha256(msgBuffer) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
    ).join("");
    return hashHex;
}
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
        if (!getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
    }
    return getRandomValues(rnds8);
}
const __default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
    return typeof uuid === 'string' && __default.test(uuid);
}
var byteToHex = [];
for(var i = 0; i < 256; ++i){
    byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
function v4(options, buf, offset) {
    options = options || {
    };
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
        offset = offset || 0;
        for(var i1 = 0; i1 < 16; ++i1){
            buf[offset + i1] = rnds[i1];
        }
        return buf;
    }
    return stringify(rnds);
}
const v41 = ()=>v4()
;
var SHAKV;
var USERS;
var API_KEY;
const corsHeaders = {
    "Access-Control-Allow-Origin": "https://zed.vision",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
function json(resp) {
    return new Response(JSON.stringify(resp), {
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json;charset=UTF-8"
        }
    });
}
function text(resp) {
    return new Response(resp, {
        headers: {
            ...corsHeaders,
            "Content-Type": "text/html;charset=UTF-8"
        }
    });
}
function handleOptions(request) {
    const headers = request.headers;
    if (headers.get("Origin") !== null && headers.get("Access-Control-Request-Method") !== null && headers.get("Access-Control-Request-Headers") !== null) {
        const respHeaders = {
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        };
        return new Response(null, {
            headers: respHeaders
        });
    } else {
        return new Response(null, {
            headers: {
                Allow: corsHeaders["Access-Control-Allow-Methods"]
            }
        });
    }
}
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashHex = await arrBuffSha256(msgBuffer);
    return hashHex.substr(0, 8);
}
async function handleAdmin(request, searchParams, pathname, SHAKV1) {
    if (pathname === "/keys/") {
        const prefix = searchParams.get("prefix");
        const value = await SHAKV1.list({
            prefix
        });
        return json(value);
    }
    if (pathname === "/keys/delete/") {
        const hash = searchParams.get("hash");
        const value = await SHAKV1.delete(hash);
        return json(value);
    }
}
async function handleCloudRequest(request) {
    const url = new URL(request.url);
    const { searchParams , pathname  } = url;
    const psk = String(request.headers.get("API_KEY") || "");
    if (request.method === "GET" && psk && psk == API_KEY) {
        return handleAdmin(request, searchParams, pathname, SHAKV);
    } else if (request.method === "GET") {
        if (pathname === "/robots.txt") {
            return text("User-agent: * Disallow: /");
        }
        if (pathname === "/connect") {
            const uuid = searchParams.get("uuid") || v41();
            const key = await sha256(uuid);
            await SHAKV.put(key, JSON.stringify({
                uuid,
                connected: searchParams.get("uuid")
            }), {
                expirationTtl: 60
            });
            return json({
                uuid: key
            });
        }
        if (pathname === "/check") {
            const uuid = searchParams.get("uuid");
            if (uuid === null) return new Response("500");
            const waitForChange = async ()=>{
                const data = await SHAKV.get(uuid, "json");
                if (!data || data.connected) {
                    return data;
                }
                return new Promise((resolve)=>{
                    const clear = setInterval(async ()=>{
                        const data1 = await SHAKV.get(uuid, "json");
                        if (!data1 || data1.connected) {
                            clearInterval(clear);
                            resolve(data1);
                        }
                    }, 1000);
                });
            };
            const data = await waitForChange();
            return json({
                expired: data === null
            });
        }
        if (pathname === "/register") {
            const uuid = v41();
            await USERS.put(uuid, JSON.stringify({
                uuid,
                registered: Date.now(),
                cf: request.cf
            }));
            return json({
                uuid
            });
        }
        const maybeRoute = pathname.substr(1);
        if (maybeRoute) {
            const jsonStream = await SHAKV.get(maybeRoute, "stream");
            if (jsonStream !== null) {
                return text(jsonStream);
            }
        }
        return Response.redirect("https://zed.vision/code", 301);
    } else if (request.method === "POST") {
        const myBuffer = await request.arrayBuffer();
        const hash = await arrBuffSha256(myBuffer);
        const smallerKey = hash.substring(0, 8);
        await SHAKV.put(smallerKey, myBuffer);
        return json({
            hash: smallerKey
        });
    }
    return new Response("404");
}
addEventListener("fetch", (event)=>{
    if (event.request.method === "OPTIONS") {
        event.respondWith(handleOptions(event.request));
    } else {
        event.respondWith(handleCloudRequest(event.request));
    }
});
