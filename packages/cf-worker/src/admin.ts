import { json } from "./utils/handleOptions.ts";

var API_KEY: string;
var SHAKV: KVNamespace;

export async function handleAdmin(
  request: Request,
  searchParams: URLSearchParams,
  pathname: string,
  psk: string,
) {
  if (request.method === "GET" && psk && psk === API_KEY) {
    if (pathname === "/keys/") {
      const prefix = searchParams.get("prefix")!;
      const value = await SHAKV.list({ prefix });
      return json(value);
    }
    if (pathname === "/keys/delete/") {
      const hash = searchParams.get("hash")!;
      const value = await SHAKV.delete(hash)!;

      return json(value);
    }
  }
  return json({ error: "not found" });
}
