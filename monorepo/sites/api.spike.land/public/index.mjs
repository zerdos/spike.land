// src/index.ts
var src_default = {
  async fetch(request, env) {
    try {
      return new Response(`Hello. ${request.url.toString()}`);
    } catch (Error) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
    }
  }
};
export {
  src_default as default
};
