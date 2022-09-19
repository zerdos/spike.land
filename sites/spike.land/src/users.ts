import type { CodeEnv } from "./env.ts";

export class Users {
  async fetch(_request: Request, _env: CodeEnv ) {
    return new Response("OKi");
  }
}
