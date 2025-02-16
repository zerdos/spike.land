import {  WebSocketPair } from "@cloudflare/workers-types";

function getWebSocketPair(): [WebSocket, WebSocket] {
  if (typeof WebSocketPair !== "undefined") {
    return new WebSocketPair() as [WebSocket, WebSocket];
  }
  const dummySocket = {
    accept: () => {},
    send: () => {},
    close: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    readyState: 0,
    url: "",
    serializeAttachment: () => {},
    deserializeAttachment: () => {},
    onopen: null,
    onmessage: null,
    onclose: null,
    onerror: null,
  } as unknown as WebSocket;
  return [dummySocket, dummySocket];
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
        console.log({ error: err.stack, message: err.message });
      }

      const pair = getWebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, { status: 101, webSocket: pair[0] });
    } else {
      let stack = "We have no idea what happened";

      if (err instanceof Error) {
        stack = err.stack || stack;
        console.log({ error: err.stack, message: err.message });
      }

      return new Response(stack, { status: 500 });
    }
  });
}
