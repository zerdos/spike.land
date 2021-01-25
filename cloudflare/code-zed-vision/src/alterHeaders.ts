import { shasums } from "./shasums";

export async function alterHeaders(response: Response, pathname: string) {
  const arrBuff = await response!.clone().arrayBuffer();
  ///@ts-ignore
  const sha = shasums[pathname];
  const shaCalculated = await sha256(arrBuff);

  const resp = new Response(arrBuff, response);
  //  const respCID = await getCID(arrBuff);

  if (sha) {
    resp.headers.set("x-sha256", sha);
  }
  resp.headers.set("x-calc-sha256", shaCalculated);
  resp.headers.set("access-control-allow-origin", "*");
  resp.headers.set(
    "access-control-allow-methods",
    "GET,HEAD,POST,OPTIONS",
  );
  resp.headers.delete("access-control-max-age");
  resp.headers.delete("content-security-policy");
  resp.headers.delete("feature-policy");
  resp.headers.set("cache-control", "public, max-age=604800, immutable");
  resp.headers.delete("access-control-expose-headers");
  resp.headers.delete("expect-ct");
  resp.headers.delete("report-to");
  resp.headers.delete("nel");

  resp.headers.delete("server");
  resp.headers.delete("strict-transport-security");
  resp.headers.delete("accept-ranges");
  resp.headers.delete("strict-transport-security");
  resp.headers.delete("X-Frame-Options");
  resp.headers.delete("x-content-type-options");
  if (pathname.endsWith(".mjs") || pathname.endsWith(".js")) {
    resp.headers.delete("content-type");
    resp.headers.set(
      "content-type",
      "text/javascript;charset=UTF-8",
    );
  } else if (pathname.endsWith(".css")) {
    resp.headers.delete("content-type");
    resp.headers.set(
      "content-type",
      "text/css;charset=UTF-8",
    );
  } else if (pathname.endsWith(".jpg")) {
    resp.headers.delete("content-type");
    resp.headers.set("content-type", "image/jpeg");
  } else if (pathname.indexOf(".") === -1 || pathname.endsWith(".html")) {
    resp.headers.delete("content-type"),
      resp.headers.set(
        "content-type",
        "text/html;charset=UTF-8",
      );
  }

  return new Response(arrBuff, {
    headers: resp.headers,
  });
}

export const sha256 = async (x: ArrayBuffer | string) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
