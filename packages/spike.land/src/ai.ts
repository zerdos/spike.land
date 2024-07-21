// import { OpenAIStream, StreamingTextResponse } from "ai";
// import OpenAI from "./";
//
import Env from "./env";

// Create an OpenAI API client (that's edge friendly!)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function handleAiFetchApi(
  path: string[],
  request: Request,
  _env: Env,
) {
  if (path[0] !== "generate" && path[0] !== "chat") {
    new Response("401", { status: 401 });
  }

  const openai = new OpenAIApi({
    apiKey: _env.OPENAI_API_KEY,
  });

  if (request.method === "POST") {
    const { messages } = await request.json<
      { messages: ChatCompletionRequestMessage[] }
    >();
    const response = await openai.chat.completions.create ({
      model: "gpt-4o-mini",
      stream: true,
      messages,
    });
    // Convert the response into a friendly text-stream
    // const stream = openai.createTextStream(response);
    // Respond with the stream
    return response;
  }

  return new Response("401", { status: 401 });
}

async function handleMainFetch(
  request: Request,
  env: Env,
): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.slice(1).split("/");

  return handleAiFetchApi(path, request, env);
}

const api: ExportedHandler<Env> = {};
api.fetch = handleMainFetch;
