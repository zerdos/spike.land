export async function handleErrors(request, func) {
    try {
        return await func();
    }
    catch (err) {
        if (request.headers.get("Upgrade") === "websocket") {
            // Annoyingly, if we return an HTTP error in response to a WebSocket request, Chrome devtools
            // won't show us the response body! So... let's send a WebSocket response with an error
            // frame instead.
            let stack = null;
            if (err instanceof Error) {
                stack = err.stack;
                console.log({ error: err.stack, message: err.message });
            }
            let pair = new WebSocketPair();
            pair[1].accept();
            pair[1].send(JSON.stringify({ error: stack }));
            pair[1].close(1011, "Uncaught exception during session setup");
            return new Response(null, { status: 101, webSocket: pair[0] });
        }
        else {
            let stack = "We have no idea what happened";
            if (err instanceof Error) {
                stack = err.stack || stack;
                console.log({ error: err.stack, message: err.message });
            }
            return new Response(stack, { status: 500 });
        }
    }
}
//# sourceMappingURL=handleErrors.js.map