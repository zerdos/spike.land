import type { Code } from "../chatRoom";

export class WebsocketRoutes {
  constructor(private code: Code) {}

  async handleWebsocketRoute(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected websocket", { status: 400 });
    }

    const pair = new WebSocketPair();
    await this.code.wsHandler.handleWebsocketSession(pair[1]);
    return new Response(null, {
      status: 101,
      statusText: "Switching Protocols",
      webSocket: pair[0],
    });
  }

  async handleUsersRoute(
    _request: Request,
    url: URL,
  ): Promise<Response> {
    const codeSpace = url.searchParams.get("room");
    const activeUsers = this.code.wsHandler.getActiveUsers(codeSpace || "");

    return new Response(JSON.stringify({ users: activeUsers }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  }
}
