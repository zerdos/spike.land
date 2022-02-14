declare module "textdiff-patch" {
  export default (old: string, delta: Object[]) => string as string;
}

declare module "*.webp" {
  const url: string;
  export default url;
}