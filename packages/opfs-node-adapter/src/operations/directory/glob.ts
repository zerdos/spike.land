export async function glob(
  _pattern: string | string[],
  _options?: {
    cwd?: string;
    exclude?: (path: string) => boolean;
    withFileTypes?: boolean;
  },
): Promise<string[]> {
  throw new Error("OPFS adapter: glob is not implemented yet");
}
