export function readFileSync(
  filePath: string,
  _options?: { encoding?: BufferEncoding; flag?: string } | BufferEncoding,
): string {
  const globalFiles = globalThis as unknown as Record<string, string>;
  return Object.hasOwn(globalFiles, filePath) ? (globalFiles[filePath] || "") : "";
}
