import type { CodeEnv } from "./env";

export class Users {
  async fetch(_request: Request, _env: CodeEnv) {
    return new Response("OKi");
  }
}
