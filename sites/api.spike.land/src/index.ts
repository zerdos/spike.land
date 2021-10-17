export default {
    async fetch(request, env) {
      try {
        return new Response(`Hello. ${request}`);
      } catch (e) {
        return new Response(e.message);
      }
    },
  };
  