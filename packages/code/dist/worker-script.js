var SHATEST;
var API_KEY;
const corsHeaders = {
    "Access-Control-Allow-Origin": "https://zed.vision",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
function handleOptions(request) {
    const headers = request.headers;
    let respHeaders = {
        ...headers,
        ...corsHeaders,
        "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
    };
    return new Response(request.body, {
        headers: respHeaders
    });
}
async function handleCloudRequest(request) {
    if (request.method === "GET") {
        const url = new URL(request.url);
        if (request.url.includes("?h")) {
            const hash = url.searchParams.get("h");
            if (hash !== null) {
                const jsonStream = await SHATEST.get(hash, "stream");
                if (jsonStream !== null) {
                    return new Response(jsonStream, {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": "text/html; charset=UTF-8"
                        }
                    });
                }
            }
        }
        if (request.url.includes("?r")) {
            const hash = url.searchParams.get("r");
            if (hash !== null) {
                const jsonStream = await SHATEST.get(hash, "stream");
                if (jsonStream !== null) {
                    return new Response(jsonStream, {
                        headers: {
                            ...corsHeaders,
                            "Content-Type": "text/html; charset=UTF-8"
                        }
                    });
                }
            }
        }
        const path = request.url;
        const maybeRoute = path.split("/").pop();
        return new Response(maybeRoute, {
            headers: {
                ...corsHeaders,
                "Content-Type": "text/html; charset=UTF-8"
            }
        });
        const hash = await SHATEST.get(maybeRoute);
        if (hash !== null) {
            const jsonStream = await SHATEST.get(hash, "stream");
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
        const psk = request.headers.get("API_KEY");
        if (psk) {
            if (psk !== API_KEY) {
                return new Response("Sorry, you have supplied an invalid key.", {
                    status: 403,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "text/html; charset=UTF-8"
                    }
                });
            }
            const { prefix , loginHash  } = await request.json();
            if (loginHash) {
                await SHATEST.put("LOGIN", loginHash);
            }
            const value = await SHATEST.list({
                prefix,
                limit: 100
            });
            return new Response(JSON.stringify(value), {
                headers: {
                    ...corsHeaders,
                    "content-type": "application/json;charset=UTF-8"
                }
            });
        }
        const myBuffer = await request.arrayBuffer();
        const myDigest = await crypto.subtle.digest({
            name: "SHA-256"
        }, myBuffer);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hash = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
        ).join("");
        const smallerKey = hash.substring(0, 8);
        await SHATEST.put(smallerKey, myBuffer);
        return new Response(JSON.stringify({
            hash: smallerKey
        }), {
            headers: {
                ...corsHeaders,
                "content-type": "application/json;charset=UTF-8"
            }
        });
    }
    return handleOptions(request);
}
addEventListener("fetch", (event)=>{
    event.respondWith(handleCloudRequest(event.request));
});
