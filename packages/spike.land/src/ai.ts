import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai-edge";

import type { Request as WRequest } from "@cloudflare/workers-types";
import Env from "./env";

// Create an OpenAI API client (that's edge friendly!)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function handleAiFetchApi(
  path: string[],
  request: WRequest,
  env: Env,
) {
  if (path[0] !== "generate" && path[0] !== "chat") new Response("401", { status: 401 });
  const config = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(config);

  if (request.method === "POST") {
    const { messages } = await request.json<{ messages: ChatCompletionRequestMessage[] }>();
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new Response(stream);
  }

  return new Response("401", { status: 401 });
}

async function handleMainFetch(
  request: WRequest<unknown, CfProperties<unknown>>,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.slice(1).split("/");

  return handleAiFetchApi(path, request, env);
}

const api: ExportedHandler<Env> = {};
api.fetch = handleMainFetch;
