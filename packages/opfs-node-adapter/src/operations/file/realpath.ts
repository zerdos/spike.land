export async function realpath(
  path: string,
  _options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
): Promise<string> {
  let normalized = path.startsWith("/") ? path : `/${path}`;
  normalized = normalized.replace(/\/+/g, "/");
  if (normalized !== "/" && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}
