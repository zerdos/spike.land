import Env from "./env";
import { md5 } from "@spike-land/code";
import Replicate from "replicate";

interface InputDefaults {
    cfg: number;
    steps: number;
    prompt: string;
    aspect_ratio: string;
    output_format: 'webp' | 'png' | 'jpeg';
    output_quality: number;
    negative_prompt: string;
    prompt_strength: number;
}

const INPUT_DEFAULTS: InputDefaults = {
    cfg: 3.5,
    steps: 28,
    prompt: 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"',
    aspect_ratio: "16:9",
    output_format: "webp",
    output_quality: 90,
    negative_prompt: "",
    prompt_strength: 0.85
};

const REPLICATE_MODEL = "black-forest-labs/flux-pro";

function parseInputFromUrl(url: string): InputDefaults {
    const urlParams = new URL(url).searchParams;
    return Object.entries(INPUT_DEFAULTS).reduce((acc, [key, defaultValue]) => {
        const value = urlParams.get(key);
        if (value !== null) {
            acc[key as keyof InputDefaults] = typeof defaultValue === 'number' ? Number(value) : value;
        }
        return acc;
    }, {...INPUT_DEFAULTS});
}

async function fetchAndSaveImage(imageUrl: string, env: Env, md5Prompt: string, outputFormat: string): Promise<Response> {
    console.log('Fetching image from:', imageUrl);
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
        console.error('Image fetch failed:', response.status, response.statusText);
        throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    await env.R2.put(md5Prompt, response.clone().body);
    
    return new Response(response.body, {
        headers: {
            "Content-Type": `image/${outputFormat}`,
            "Access-Control-Allow-Origin": "*",
        },
    });
}

export async function handleReplicateRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
        const input = parseInputFromUrl(request.url);
        const md5Prompt = md5('replicate salt ' + JSON.stringify(input));

        const saved = await env.R2.get(md5Prompt);
        if (saved) {
            return new Response(saved.body, {
                headers: {
                    "Content-Type": `image/${input.output_format}`,
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        const replicate = new Replicate({ auth: env.REPLICATE_API_TOKEN });
        const imageUrl = await replicate.run(REPLICATE_MODEL, { input });

        if (typeof imageUrl !== 'string' || !imageUrl) {
            console.error('Invalid image URL:', imageUrl);
            throw new Error('Invalid image URL from Replicate API');
        }

        return await fetchAndSaveImage(imageUrl, env, md5Prompt, input.output_format);
    } catch (e: unknown) {
        console.error('Error in handleReplicateRequest:', e);
        return new Response(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`, { status: 500 });
    }
}