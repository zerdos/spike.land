import type { Code } from "../chatRoom";
import type Env from "../env";
import { GetHandler } from "../handlers/getHandler";
import { PostHandler } from "../handlers/postHandler";
import { StorageService } from "../services/storageService";
import { PREFLIGHT_CORS_HEADERS } from "../types/aiRoutes";

export class AiRoutes {
  private env: Env;
  private storageService: StorageService;
  private getHandler: GetHandler;
  private postHandler: PostHandler;

  constructor(private code: Code) {
    this.env = this.code.getEnv();
    this.storageService = new StorageService(this.env);
    this.getHandler = new GetHandler(this.storageService);
    this.postHandler = new PostHandler(this.code, this.env);
  }


 
  async handleMessagesRoute(
    request: Request,
    url: URL,
    _path: string[],
  ): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: PREFLIGHT_CORS_HEADERS,
      });
    }

    const codeSpace = this.code.getSession().codeSpace;

    // GET: Return all messages and the complete request body
    if (request.method === "GET") {
      return await this.getHandler.handle(codeSpace);
    }

    // POST: Add a new message and call AI with MCP tools
    if (request.method === "POST") {
      return this.postHandler.handle(request, url);
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

}
