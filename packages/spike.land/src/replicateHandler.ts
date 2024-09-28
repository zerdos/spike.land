import { md5 } from "@spike-land/code";
import Replicate from "replicate";
import Env from "./env";

interface InputDefaults {
  cfg: number;
  steps: number;
  prompt: string;
  aspect_ratio: string;
  output_format: "webp" | "png" | "jpeg";
  output_quality: number;
  negative_prompt: string;
  prompt_strength: number;
}

const INPUT_DEFAULTS: InputDefaults = {
  cfg: 3.5,
  steps: 28,
  prompt: "a photo of vibrant artistic graffiti on a wall saying \"SD3 medium\"",
  aspect_ratio: "16:9",
  output_format: "webp",
  output_quality: 90,
  negative_prompt: "",
  prompt_strength: 0.85,
};

const REPLICATE_MODEL = "black-forest-labs/flux-schnell";

export function parseInputFromUrl(url: string): InputDefaults {
  const urlParams = new URLSearchParams(atob(  new URL(url).pathname.split("/").pop()!   ));
  return Object.entries(INPUT_DEFAULTS).reduce((acc, [key, defaultValue]) => {
    const value = urlParams.get(key);
    if (value !== null) {
      Object.assign(acc, {
        [key]: typeof defaultValue === "number"
          ? Number(value)
          : value,
      });
    }
    return acc;
  }, { ...INPUT_DEFAULTS });
}

/**
 * Fetches an image from a URL, saves it to R2 storage, and returns it as a response.
 * @param imageUrl - The URL of the image to fetch.
 * @param env - The environment object containing R2 storage.
 * @param md5Prompt - The MD5 hash of the prompt, used as the storage key.
 * @param outputFormat - The desired output format of the image.
 * @param ctx - The execution context for background tasks.
 * @returns A Promise that resolves to a Response object containing the image.
 * @throws Error if the image fetch fails.
 */
async function fetchAndSaveImage(
  imageUrl: string,
  env: Env,
  md5Prompt: string,
  outputFormat: string,
  ctx: ExecutionContext,
): Promise<Response> {
  try {
    console.log(`Fetching image from: ${imageUrl}`);
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    // Clone the response for R2 storage
    const responseClone = response.clone();

    // Store the image in R2 as a background task
    ctx.waitUntil(
      (async () => {
        try {
          const arrayBuffer = await responseClone.arrayBuffer();
          await env.R2.put(md5Prompt, arrayBuffer);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Failed to store image in R2: ${error.message}`);
          }
        }
      })(),
    );

    // Prepare and return the response
    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type": `image/${outputFormat}`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in fetchAndSaveImage: ${error.message}`);
    }
    throw error;
  }
}

export async function handleReplicateRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  try {
    const input = parseInputFromUrl(request.url);
    const md5Prompt = md5("replicate salt " + JSON.stringify(input));

    const cacheKey = new Request(request.url, request);
    let resp = await caches.default.match(cacheKey);
    if (resp) return resp;
    

    const saved = await env.R2.get(md5Prompt);
    if (saved) {
      return new Response(saved.body, {
        headers: {
          "Content-Type": `image/${input.output_format}`,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    const replicate = new Replicate({ auth: env.REPLICATE_API_TOKEN });
    const imageU = await replicate.run(REPLICATE_MODEL, { input });

    const imageUrl = imageU.toString(); // Ensure it's a string

    if (typeof imageUrl !== "string" || !imageUrl) {
      console.error("Invalid image URL:", imageUrl);
      throw new Error("Invalid image URL from Replicate API" + imageUrl);
    }

    resp =  await fetchAndSaveImage(
      imageUrl,
      env,
      md5Prompt,
      input.output_format,
      ctx,
    )!;

    ctx.waitUntil(caches.default.put(cacheKey, resp.clone()));
    return resp;

  } catch (e: unknown) {
    console.error("Error in handleReplicateRequest:", e);
    return new Response(
      `Error: ${e instanceof Error ? e.message : "Unknown error"}`,
      { status: 500 },
    );
  }
}
