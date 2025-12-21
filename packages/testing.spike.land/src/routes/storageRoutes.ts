import type { Code } from "../chatRoom";

export class StorageRoutes {
  constructor(private code: Code) {}

  async handleHashCodeRoute(
    _request: Request,
    _url: URL,
    path: string[],
  ): Promise<Response> {
    const hashCode = String(Number(path[1]));
    const patch = await this.code.getState().storage.get<
      { patch: string; oldHash: number; }
    >(hashCode, {
      allowConcurrency: true,
    });

    return new Response(JSON.stringify(patch || {}), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
  }
}
