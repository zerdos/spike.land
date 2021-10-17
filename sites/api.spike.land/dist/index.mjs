// src/index.ts
var src_default = {
  async fetch(request, env) {
    try {
      return new Response("Ello ");
    } catch (e) {
      return new Response(e.message);
    }
  }
};
export {
  src_default as default
};
