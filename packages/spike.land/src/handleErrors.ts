import type { Request as WRequest, WebSocket } from "@cloudflare/workers-types";

export async function handleErrors(
  request: WRequest<unknown, CfProperties<unknown>>,
  cb: () => Promise<Response>,
) {
  try {
    return await cb();
  } catch (err) {
    if (request.headers.get("Upgrade") === "websocket") {
      let stack: string | undefined = "";

      if (err instanceof Error) {
        stack = err.stack;
        console.log({ error: err.stack, message: err.message });
      }

      const pair = new WebSocketPair();
      (pair[1] as unknown as WebSocket).accept();
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
  }
}

// export async function handleErrors(
//   request: Request<unknown>,
//   func: () => Promise<Response>,
// ) {
//   try {
//     return await func();
//   } catch (err) {
//     if (request.headers.get("Upgrade") === "websocket") {
//       // Annoyingly, if we return an HTTP error in response to a WebSocket request, Chrome devtools
//       // won't show us the response body! So... let's send a WebSocket response with an error
//       // frame instead.

//       let stack = null;

//       if (err instanceof Error) {
//         stack = err.stack;
//         console.log({ error: err.stack, message: err.message });
//       }

//       const pair = new WebSocketPair();
//       pair[1].accept();
//       pair[1].send(JSON.stringify({ error: stack }));
//       pair[1].close(1011, "Uncaught exception during session setup");
//       return new Response(null, { status: 101, webSocket: pair[0] });
//     } else {
//       let stack = "We have no idea what happened";

//       if (err instanceof Error) {
//         stack = err.stack || stack;
//         console.log({ error: err.stack, message: err.message });
//       }

//       return new Response(stack, { status: 500 });
//     }
//   }
// }
