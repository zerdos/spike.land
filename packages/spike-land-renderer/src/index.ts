import puppeteer, { BrowserWorker } from "@cloudflare/puppeteer";

interface Env {
  MY_WORKER_BROWSER: Fetcher;
  BROWSER_KV_SPIKE_LAND: KVNamespace;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");
    let sleep = searchParams.get("sleep");
    let top = searchParams.get("top");

    // let scrollTop	= searchParams.get("scrollTop");

    let img: ArrayBuffer | null = null;
    if (url) {
      url = new URL(url).toString(); // normalize
      img = await env.BROWSER_KV_SPIKE_LAND.get(url, { type: "arrayBuffer" });
      if (img === null) {
        const browser = await puppeteer.launch(
          env.MY_WORKER_BROWSER as unknown as BrowserWorker,
        );
        const page = await browser.newPage();
        await page.goto(url);
        await page.waitForNetworkIdle();
        await wait(100);
        //        await wait(sleep ? parseInt(sleep) ?? 0 : 1000);

        if (top) {
          await page.evaluate(() => {
            window.scrollBy({
              top: +top,
              behavior: "smooth",
            });
          });
        }

        img = (await page.screenshot({ type: "jpeg" })) as Buffer;
        await env.BROWSER_KV_SPIKE_LAND.put(url, img, {
          expirationTtl: 60,
        });
        await browser.close();
      }
      return new Response(img, {
        headers: {
          "content-type": "image/jpeg",
        },
      });
    } else {
      return new Response(
        "Please add an ?url=https://example.com/ parameter",
      );
    }
  },
} satisfies ExportedHandler<Env>;

export async function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}
