var SHATEST;
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
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
                            "content-type": "text/javascript"
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
                            "content-type": "text/html"
                        }
                    });
                }
            }
        }
        return Response.redirect("https://zed.vision/code", 301);
    } else if (request.method === "POST") {
        const data = await request.json();
        const myBuffer = new TextEncoder().encode(JSON.stringify(data));
        const myDigest = await crypto.subtle.digest({
            name: "SHA-256"
        }, myBuffer);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hash = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
        ).join("");
        const smallerKey = hash.substring(0, 8);
        await SHATEST.put(smallerKey, myBuffer);
        const resp = new Response(`{"hash":"${smallerKey}"}`);
        resp.headers.append("Access-Control-Allow-Origin", "*");
        resp.headers.append("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
        resp.headers.append("Access-Control-Max-Age", "86400");
        return resp;
    }
    return handleOptions(request);
}
function handleOptions(request) {
    const headers = request.headers;
    let respHeaders;
    return new Response(request.body, {
        headers: {
            ...headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
self.runner = self.runner || "worker-cf";
addEventListener("fetch", (event)=>{
    if (self.runner !== "worker-cf") return;
    event.respondWith(handleCloudRequest(event.request));
});
