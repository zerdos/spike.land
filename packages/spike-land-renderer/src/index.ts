import type { BrowserWorker } from "@cloudflare/puppeteer";
import puppeteer from "@cloudflare/puppeteer";

/**
 * Environment bindings for the spike-land-renderer worker.
 * @public
 */
export interface Env {
  /** Browser binding for Puppeteer - compatible with BrowserWorker interface */
  MY_WORKER_BROWSER: BrowserWorker;
  /** KV namespace for caching rendered screenshots */
  BROWSER_KV_SPIKE_LAND: KVNamespace;
}

/**
 * Type guard to check if an error has a message property.
 * @param error - The unknown error to check
 * @returns True if the error has a string message property
 */
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
}

/**
 * Extracts a human-readable error message from an unknown error.
 * @param error - The unknown error to extract a message from
 * @returns A string representation of the error
 */
function getErrorMessage(error: unknown): string {
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return String(error);
}

/**
 * Cloudflare Worker fetch handler for the spike-land-renderer service.
 *
 * This worker captures full-page screenshots of websites using Puppeteer
 * running in Cloudflare's Browser Rendering API. Screenshots are cached
 * in KV storage for 60 seconds to reduce browser launches.
 *
 * @param request - The incoming HTTP request
 * @param env - Worker environment bindings (browser and KV)
 * @param ctx - Execution context for background tasks
 * @returns A Response containing the JPEG screenshot or an error message
 *
 * @example
 * ```
 * GET /?url=https://example.com/
 * ```
 *
 * @remarks
 * The worker accepts a `url` query parameter specifying the target URL to capture.
 * If no URL is provided, returns instructions for usage.
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { searchParams } = new URL(request.url);
    let url = searchParams.get("url");

    if (url) {
      url = new URL(url).toString(); // normalize
      let img: ArrayBuffer | null = await env.BROWSER_KV_SPIKE_LAND.get(url, {
        type: "arrayBuffer",
      });

      if (img === null) {
        const browser = await puppeteer.launch(env.MY_WORKER_BROWSER);
        const page = await browser.newPage();

        try {
          await page.goto(url);

          const screenshotBuffer = await page.screenshot({
            type: "jpeg",
            fullPage: true,
            quality: 70,
            encoding: "binary",
          });

          // Convert Buffer to ArrayBuffer for KV storage
          // Use Uint8Array.from to create a clean copy that's guaranteed to be an ArrayBuffer
          const uint8Array = new Uint8Array(screenshotBuffer);
          img = uint8Array.buffer as ArrayBuffer;

          if (img) {
            ctx.waitUntil(
              env.BROWSER_KV_SPIKE_LAND.put(url, img, { expirationTtl: 60 }),
            );
          }
        } catch (error: unknown) {
          const errorMessage = getErrorMessage(error);
          console.error("Error capturing screenshot:", errorMessage);
          return new Response(`Error capturing screenshot: ${errorMessage}`, { status: 500 });
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
