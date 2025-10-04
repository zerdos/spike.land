import puppeteer from "@cloudflare/puppeteer";
export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");
    if (url) {
      url = new URL(url).toString(); // normalize
      let img = await env.BROWSER_KV_SPIKE_LAND.get(url, {
        type: "arrayBuffer",
      });
      if (img === null) {
        const browser = await puppeteer.launch(env.MY_WORKER_BROWSER);
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
          });
          ctx.waitUntil(
            env.BROWSER_KV_SPIKE_LAND.put(url, img, { expirationTtl: 60 }),
          );
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
};
