import type { BrowserWorker } from "@cloudflare/puppeteer";
import puppeteer, { Page as _Page } from "@cloudflare/puppeteer";

interface Env {
  MY_WORKER_BROWSER: Fetcher;
  BROWSER_KV_SPIKE_LAND: KVNamespace;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");
    // Optional parameters - currently unused but kept for future use
    // const top = searchParams.get("top");
    // const maxRetries = parseInt(searchParams.get("maxRetries") || "3");
    // const retryInterval = parseInt(searchParams.get("retryInterval") || "1000");

    if (url) {
      url = new URL(url).toString(); // normalize
      let img: ArrayBuffer | null = await env.BROWSER_KV_SPIKE_LAND.get(url, {
        type: "arrayBuffer",
      });

      if (img === null) {
        const browser = await puppeteer.launch(
          env.MY_WORKER_BROWSER as unknown as BrowserWorker,
        );
        const page = await browser.newPage();

        try {
          await page.goto(url);

          // Wait for a specific element that indicates your React app is fully loaded
          // Replace '#react-app-loaded' with an appropriate selector for your app
          // await waitForElement(page, "#root", maxRetries, retryInterval);

          // wait for 1 second
          // await new Promise(r => setTimeout(r, 1000));

          // if (top) {
          //   await page.evaluate((topValue) => {
          //     window.scrollBy({
          //       top: +topValue,
          //       behavior: "smooth",
          //     });
          //   }, top);
          //   await page.waitForTimeout(500); // Wait for scroll to complete
          // }

          img = await page.screenshot({
            type: "jpeg",
            fullPage: true,
            quality: 70,
            encoding: "binary",
          }) as unknown as ArrayBuffer;

          if (img) {
            ctx.waitUntil(
              env.BROWSER_KV_SPIKE_LAND.put(url, img, { expirationTtl: 60 }),
            );
          }
        } catch (error) {
          console.error("Error capturing screenshot:", error);
          return new Response("Error capturing screenshot", { status: 500 });
        } finally {
          ctx.waitUntil(browser.close());
        }
      }

      return new Response(img, {
        headers: { "content-type": "image/jpeg" },
      });
    } else {
      return new Response("Please add an ?url=https://example.com/ parameter");
    }
  },
} satisfies ExportedHandler<Env>;
