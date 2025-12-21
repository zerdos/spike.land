export function makeResponse(object: R2ObjectBody | undefined, key: string) {
  const headers = new Headers();

  if (object && object.writeHttpMetadata) {
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
  }

  headers.set("Cache-Control", "public, max-age=31536000");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  headers.set(
    "Content-Type",
    (key.endsWith("js") || key.endsWith("mjs"))
      ? "application/javascript; charset=UTF-8"
      : key.endsWith("css")
      ? "text/css; charset=UTF-8"
      : key.endsWith("html")
      ? "text/html; charset=UTF-8"
      : key.endsWith("json")
      ? "application/json; charset=UTF-8"
      : key.endsWith("ttf")
      ? "font/ttf"
      : key.endsWith("woff")
      ? "font/woff"
      : key.endsWith("woff2")
      ? "font/woff2"
      : key.endsWith("eot")
      ? "font/eot"
      : key.endsWith("otf")
      ? "font/otf"
      : key.endsWith("png")
      ? "image/png"
      : key.endsWith("pdf")
      ? "application/pdf"
      : key.endsWith("gif")
      ? "image/gif"
      : key.endsWith("webp")
      ? "image/webp"
      : key.endsWith("jpg") || key.endsWith("jpeg")
      ? "image/jpeg"
      : key.endsWith("svg")
      ? "image/svg+xml"
      : key.endsWith("mp4")
      ? "video/mp4"
      : key.endsWith("webm")
      ? "video/webm"
      : key.endsWith("mov")
      ? "video/quicktime"
      : key.endsWith("avi")
      ? "video/x-msvideo"
      : key.endsWith("wmv")
      ? "video/x-ms-wmv"
      : key.endsWith("mp3")
      ? "audio/mpeg"
      : key.endsWith("wav")
      ? "audio/wav"
      : key.endsWith("ogg")
      ? "audio/ogg"
      : key.endsWith("flac")
      ? "audio/flac"
      : key.endsWith("aac")
      ? "audio/aac"
      : "application/javascript; charset=UTF-8",
  );

  return new Response(object?.body || null, { headers });
}
