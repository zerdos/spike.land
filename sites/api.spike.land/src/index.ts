export default {
  async fetch(request: Request, env: EventInit) {
    try {
      return new Response(`Hello. ${request.url.toString()}`);
    } catch (Error) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error)}`);
    }
  },
};
