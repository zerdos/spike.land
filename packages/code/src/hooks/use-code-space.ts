/**
 * Get code space from the given pathname
 */
export function getCodeSpace(pathname: string): string {
  const paths = pathname.split("/").slice(1);
  return paths[1] || "";
}
