import isOdd from "is-odd";

// In order for the workers runtime to find the class that implements
// our Durable Object namespace, we must export it from the root module.
export { Counter } from "./counter";

export default {
  async fetch(request: Request, env: string) {
    try {
      return await handleRequest(request, env);
    } catch (Error) {
      return new Response((Error as {message?: string}).message);
    }
  },
};

async function handleRequest(request, env) {
  let url = new URL(request.url);
  let pathname = url.pathname;
  let id = env.COUNTER.idFromName(pathname.substring(1, 3));
  let obj = env.COUNTER.get(id);
  let resp = await obj.fetch(request.url);

  let count = parseInt(await resp.text());
  let wasOdd = isOdd(Number(count)) ? "is odd" : "is even";

  return new Response(`${count} ${wasOdd}`);
}
