import type { Code } from "./chatRoom";
import {
  AiRoutes,
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
  private aiRoutes: AiRoutes;

  constructor(private code: Code) {
    // Initialize all route handlers
    this.codeRoutes = new CodeRoutes(this.code);
    this.websocketRoutes = new WebsocketRoutes(this.code);
    this.liveRoutes = new LiveRoutes(this.code);
    this.utilityRoutes = new UtilityRoutes(this.code);
    this.authRoutes = new AuthRoutes(this.code);
    this.storageRoutes = new StorageRoutes(this.code);
    this.defaultRoutes = new DefaultRoutes(this.code);
    this.aiRoutes = new AiRoutes(this.code);
  }

  async handleRoute(
    request: Request,
    url: URL,
    path: string[],
  ): Promise<Response> {
    const firstPath = path[0];
    if (!firstPath) {
      return new Response("Not found", { status: 404 });
    }
    const routeHandler = this.getRouteHandler(firstPath);
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
      websocket: this.websocketRoutes.handleWebsocketRoute.bind(
        this.websocketRoutes,
      ),

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

      // AI routes
      messages: this.aiRoutes.handleMessagesRoute.bind(this.aiRoutes),

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
      dehydrated: this.defaultRoutes.handleDefaultRoute.bind(
        this.defaultRoutes,
      ),
      iframe: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      embed: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      public: this.defaultRoutes.handleDefaultRoute.bind(this.defaultRoutes),
      htm: this.defaultRoutes.handleHtmlRoute.bind(this.defaultRoutes),
    };

    return routes[route] || null;
  }
}
