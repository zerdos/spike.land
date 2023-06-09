import { withESMWorker } from "esm-worker";

// // extend the `Env` interface
// declare global {
//   interface Env {
//     // your custom env vars
//     // your other vars in `wrangler.toml` ...
//   }
// }

export default withESMWorker((req, env, ctx) => {
  const { url } = ctx;

  // your routes override esm.sh routes
  if (url.pathname === "/") {
    // using a custom homepage
    return new Response("<h1>Welcome to use esm.sh!</h1>", {
      headers: { "Content-Type": "text/html" },
    });

    // using cache
    return ctx.withCache(() =>
      new Response("Boom!", {
        headers: { "Cache-Control": "public; max-age=600" },
      })
    );
  }
});
