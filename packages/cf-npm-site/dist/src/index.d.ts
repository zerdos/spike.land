/// <reference types="@cloudflare/workers-types" />
export default function (packageName: string, version: string, serveDir?: string): (request: Request, env: EventInit) => Promise<Response>;
