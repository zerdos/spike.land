import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { renderToReadableStream } from "react-dom/server";
export const renderToStream = async (codeSpace) => {
    const App = (await import(`${location.origin}/live/${codeSpace}/index.js`)).default;
    let controller = new AbortController();
    let didError = false;
    try {
        let stream = await renderToReadableStream(_jsx("html", { children: _jsx("body", { children: _jsx(App, {}) }) }), {
            signal: controller.signal,
            onError(error) {
                didError = true;
                console.error(error);
            },
        });
        return new Response(stream, {
            status: didError ? 500 : 200,
            headers: { "Content-Type": "text/html" },
        });
    }
    catch (error) {
        return new Response("<!doctype html><p>Loading...</p><script src=\"clientrender.js\"></script>", {
            status: 500,
            headers: { "Content-Type": "text/html" },
        });
    }
};
