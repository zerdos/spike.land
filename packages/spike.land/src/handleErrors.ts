function getWebSocketPair(): [WebSocket, WebSocket] {
  const dummyPair = new WebSocketPair();
  return [dummyPair[0], dummyPair[1]];
}

export function handleErrors(
  request: Request,
  cb: () => Promise<Response>,
): Promise<Response> {
  return cb().catch((err: unknown) => {
    if (request.headers.get("Upgrade") === "websocket") {
      let stack: string | undefined = "We have no idea what happened";

      if (err instanceof Error) {
        stack = err.stack;
        console.warn({ error: err.stack, message: err.message });
      }

      const pair = getWebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, {
        status: 101,
        webSocket: pair[0],
      } as { status: number; webSocket: WebSocket; });
    } else {
      let stack = "We have no idea what happened";

      if (err instanceof Error) {
        stack = err.stack || stack;
        console.warn({ error: err.stack, message: err.message });
      }

      return new Response(stack, { status: 500 });
    }
  });
}

export { getWebSocketPair };
