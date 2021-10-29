import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Hello World!GET  - 481ms
app.use(async (ctx) => {

    const {url} = ctx.request;
    console.log(`fetch: https://code.spike.land/${url.pathname}`)
    const resp = await fetch(`https://code.spike.land/${url.pathname}`, {method: ctx.request.method});

    const respBack = resp.clone();


    ctx.response.body = respBack.body;
    ctx.response.headers = new Headers(respBack.headers);
});

await app.listen({ port: 8000 });
