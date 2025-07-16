import type { Code } from "./chatRoom";
import {
  AuthRoutes,
  CodeRoutes,
  DefaultRoutes,
  LiveRoutes,
  StorageRoutes,
  UtilityRoutes,
  WebsocketRoutes,
} from "./routes";

export interface AutoSaveEntry {
  timestamp: number;
  code: string;
}

export class RouteHandler {
  private codeRoutes: CodeRoutes;
  private websocketRoutes: WebsocketRoutes;
  private liveRoutes: LiveRoutes;
  private utilityRoutes: UtilityRoutes;
  private authRoutes: AuthRoutes;
  private storageRoutes: StorageRoutes;
  private defaultRoutes: DefaultRoutes;

  constructor(private code: Code) {
    // Initialize all route handlers
    this.codeRoutes = new CodeRoutes(code);
    this.websocketRoutes = new WebsocketRoutes(code);
    this.liveRoutes = new LiveRoutes(code);
    this.utilityRoutes = new UtilityRoutes(code);
    this.authRoutes = new AuthRoutes(code);
    this.storageRoutes = new StorageRoutes(code);
    this.defaultRoutes = new DefaultRoutes(code);
  }

  async handleRoute(
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    const routeHandler = this.getRouteHandler(path[0]);
    return routeHandler
      ? routeHandler(request, url, path)
      : new Response("Not found", { status: 404 });
  }

  private getRouteHandler(
    route: string,
  ): ((req: Request, url: URL, path: string[]) => Promise<Response>) | null {
    const routes: Record<
      string,
      (
        req: Request,
        url: URL,
        path: string[],
      ) => Promise<Response>
    > = {
      // WebSocket routes
      users: this.websocketRoutes.handleUsersRoute.bind(this.websocketRoutes),
      websocket: this.websocketRoutes.handleWebsocketRoute.bind(this.websocketRoutes),

      // Code routes
      code: this.codeRoutes.handleCodeRoute.bind(this.codeRoutes),
      "index.tsx": this.codeRoutes.handleCodeRoute.bind(this.codeRoutes),
      "session.json": this.codeRoutes.handleSessionRoute.bind(this.codeRoutes),
      "index.mjs": this.codeRoutes.handleJsRoute.bind(this.codeRoutes),
      "index.js": this.codeRoutes.handleJsRoute.bind(this.codeRoutes),
      "index.css": this.codeRoutes.handleCssRoute.bind(this.codeRoutes),
      js: this.codeRoutes.handleJsRoute.bind(this.codeRoutes),

      // Live routes
      lazy: this.liveRoutes.handleLazyRoute.bind(this.liveRoutes),
      live: this.liveRoutes.handleLiveRoute.bind(this.liveRoutes),
      "to-string.js": this.liveRoutes.handleRenderToStr.bind(this.liveRoutes),
      "wrapper.js": this.liveRoutes.handleWrapRoute.bind(this.liveRoutes),
      wrapped: this.liveRoutes.handleWrapHTMLRoute.bind(this.liveRoutes),
      screenshot: this.liveRoutes.handleScreenShotRoute.bind(this.liveRoutes),

      // Utility routes
      request: this.utilityRoutes.handleRequestRoute.bind(this.utilityRoutes),
      list: this.utilityRoutes.handleListRoute.bind(this.utilityRoutes),
      room: this.utilityRoutes.handleRoomRoute.bind(this.utilityRoutes),
      path: this.utilityRoutes.handlePathRoute.bind(this.utilityRoutes),
      env: this.utilityRoutes.handleEnvRoute.bind(this.utilityRoutes),

      // Auth routes
      my: this.authRoutes.handleMyCode.bind(this.authRoutes),

      // Storage routes
      hashCode: this.storageRoutes.handleHashCodeRoute.bind(this.storageRoutes),


      // Default routes
      "": this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      undefined: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      "null": this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      hydrated: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      worker: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      dehydrated: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      iframe: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      embed: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      public: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      htm: this.defaultRoutes.handleHtmlRoute.bind(this.defaultRoutes),
    };

    return routes[route] || null;
  }
}
