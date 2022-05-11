declare module "__STATIC_CONTENT_MANIFEST" {
    const manifest: {[key: string]: string};
    const manifestJSON=  JSON.stringify(manifest);
    export default manifestJSON;
  }