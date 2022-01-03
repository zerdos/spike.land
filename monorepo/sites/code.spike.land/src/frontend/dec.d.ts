declare module "ipfs-only-hash" {
  export default ({
    of: (content: string) => Promise<string>(content) as Promise<string>,
  });
}
declare module "textdiff-patch" {
  export default (old: string, delta: Object[]) => string as string;
}
