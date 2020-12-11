import { json } from "./utils/handleOptions.ts";
export async function handleAdmin(
  request: Request,
  searchParams: URLSearchParams,
  pathname: string,
  SHAKV: KVNamespace
) {
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
    return json({error: "not implemented"});

}
