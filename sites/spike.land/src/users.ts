import type { CodeEnv } from "./env.ts";

export class Users {
  async fetch(_request: Request, _env: CodeEnv, _ctx: ExecutionContext) {
    return new Response("OKi");
  }
}
