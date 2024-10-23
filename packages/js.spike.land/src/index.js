import { build, transpile, wasmFile as wasmModule, } from "@spike-npm-land/code/src/transpile";
Object.assign(globalThis, {
    performance: {
        now: () => Date.now(),
    },
});
const initAndTransform = (code, origin) => transpile(code, origin, wasmModule);
const handleGetRequest = async (codeSpace, origin) => {
    try {
        const results = await build({
            codeSpace,
            origin,
            format: "esm",
            splitting: false,
            external: ["/*"],
            wasmModule,
        });
        if (!results) {
            return new Response("No results", { status: 404 });
        }
        if (typeof results === "string") {
            return new Response(results, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/javascript",
                    "cache-control": "no-cache",
                },
            });
        }
        return new Response(JSON.stringify(results), {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
        });
    }
    catch (e) {
        const error = e;
        return new Response(error.message, { status: 500 });
    }
};
const handlePostRequest = async (request) => {
    const respText = await initAndTransform(await request.text(), request.headers.get("TR_ORIGIN"));
    if (typeof respText === "string") {
        return new Response(respText, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/javascript",
                "cache-control": "no-cache",
            },
        });
    }
    const error = respText.error;
    return new Response(error.message || "Unknown error", { status: 500 });
};
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const params = url.searchParams;
        const codeSpace = params.get("codeSpace") || "empty";
        const codeEnv = params.get("origin");
        const origin = codeEnv === "testing"
            ? "https://testing.spike.land"
            : "https://spike.land";
        if (request.method === "GET") {
            return handleGetRequest(codeSpace, origin);
        }
        if (request.method === "POST") {
            return handlePostRequest(request);
        }
        return new Response("Method not allowed. Try POST or GET.", {
            status: 405,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
            },
        });
    },
};
