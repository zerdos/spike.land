// Core functionality
import chat from "./chat";

// Components
import { Code } from "./chatRoom";
import { CodeRateLimiter } from "./rateLimiter";
import { Users } from "./users";

// R2 functionality
import R2BucketHandler from "./r2bucket";

// Types
import type { ExportedHandler } from '@cloudflare/workers-types';
import type MyEnv from "./env";

// Main handler
const mainHandler: ExportedHandler<MyEnv> = {
  async fetch(request: Request, env: MyEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname.startsWith('/r2/')) {
      // Strip '/r2' from the pathname before passing to R2BucketHandler
      request = new Request(new URL(url.pathname.slice(3), url.origin), request);
      return R2BucketHandler.fetch(request, env, ctx);
    }
    
    // Default to chat handler
    return chat(request, env, ctx);
  }
};

export default mainHandler;
export { Code, CodeRateLimiter, Users, R2BucketHandler };
