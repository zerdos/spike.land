export function makeResponse(object: R2ObjectBody | undefined, key: string) {
  const headers = new Headers();

  if (object && object.writeHttpMetadata) {
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
  }

  headers.set("Cache-Control", "public, max-age=31536000");
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Cross-Origin-Embedder-Policy", "require-corp");

  const mimeTypes: { [key: string]: string } = {
    '.js': 'application/javascript; charset=UTF-8',
    '.mjs': 'application/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.html': 'text/html; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'font/eot',
    '.otf': 'font/otf',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo',
    '.wmv': 'video/x-ms-wmv',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.flac': 'audio/flac',
    '.aac': 'audio/aac',
  };

  const extension = key.slice(key.lastIndexOf('.')).toLowerCase();
  const contentType = mimeTypes[extension] || 'application/octet-stream';
  headers.set('Content-Type', contentType);

  const body = object?.body || '';
  return new Response(body, { headers });
}