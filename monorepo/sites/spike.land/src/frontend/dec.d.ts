declare module "*_MANIFEST" {
  const manifest: { [key: string]: string };
  export default manifest;
}

declare module "*.webp" {
  const url: string;
  export default url;
}
