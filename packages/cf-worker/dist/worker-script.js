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
var SHAKV;
var USERS;
var API_KEY;
const corsHeaders = {
    "Access-Control-Allow-Origin": "https://zed.vision",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
async function handleCloudRequest(request) {
    const psk = String(request.headers.get("API_KEY") || "");
    const url = new URL(request.url);
    const { searchParams , pathname  } = url;
    if (request.method === "GET" && psk && psk === API_KEY) {
        if (pathname === "/keys/") {
            const prefix = searchParams.get("prefix");
            const value = await SHAKV.list({
                prefix
            });
            return new Response(JSON.stringify(value), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        if (pathname === "/keys/delete/") {
            const hash = searchParams.get("hash");
            const value = await SHAKV.delete(hash);
            return new Response(JSON.stringify(value), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
    }
    if (request.method === "GET") {
        const hash = searchParams.get("h");
        if (pathname === "/robots.txt") {
            return new Response("User-agent: * Disallow: /", {
                headers: {
                    ...corsHeaders,
                    "content-type": "text/html;charset=UTF-8"
                }
            });
        }
        if (pathname === "/connect") {
            const uuid = v4();
            await USERS.put(uuid, JSON.stringify({
                uuid,
                registered: Date.now(),
                cf: request.cf
            }, {
                expirationTtl: 60
            }));
            return new Response(JSON.stringify({
                uuid
            }), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        if (pathname === "/register") {
            const uuid = v4();
            await USERS.put(uuid, JSON.stringify({
                uuid,
                registered: Date.now(),
                cf: request.cf
            }));
            return new Response(JSON.stringify({
                uuid
            }), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        if (hash) {
            const jsonStream = await SHAKV.get(hash, "stream");
            if (jsonStream === null) {
                return new Response(JSON.stringify({
                    error: "Not found"
                }), {
                    headers: {
                        ...corsHeaders,
                        "content-type": "application/json;charset=UTF-8"
                    }
                });
            }
            return new Response(jsonStream, {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        const pageHash = url.searchParams.get("r");
        if (pageHash) {
            const jsonStream = await SHAKV.get(pageHash, "stream");
            if (jsonStream !== null) {
                return new Response(jsonStream, {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "text/html; charset=UTF-8"
                    }
                });
            }
        }
        const maybeRoute = pathname.substr(1);
        if (maybeRoute) {
            const jsonStream = await SHAKV.get(maybeRoute, "stream");
            if (jsonStream !== null) {
                return new Response(jsonStream, {
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "text/html; charset=UTF-8"
                    }
                });
            }
        }
        return Response.redirect("https://zed.vision/code", 301);
    } else if (request.method === "POST") {
        const myBuffer = await request.arrayBuffer();
        const hash = await arrBuffSha256(myBuffer);
        const smallerKey = hash.substring(0, 8);
        await SHAKV.put(smallerKey, myBuffer);
        return new Response(JSON.stringify({
            hash: smallerKey
        }), {
            headers: {
                ...corsHeaders,
                "content-type": "application/json;charset=UTF-8"
            }
        });
    }
    return new Response(request.body, {
        headers: {
            ...request.headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
addEventListener("fetch", (event)=>{
    event.respondWith(handleCloudRequest(event.request));
});
