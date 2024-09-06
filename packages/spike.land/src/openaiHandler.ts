import { OpenAI } from "openai";
import Env from "./env";
import { handleCORS, readRequestBody } from "./utils";

interface MessageParam {
  role:  "user" | "assistant";
  content: string;
}

export async function handleGPT4Request(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  handleCORS(request);

  const body = JSON.parse(await readRequestBody(request)) as {
    model: string;
    messages: MessageParam[];
    file?: File; // To handle file uploads
  };

  const openai = new OpenAI({
    baseURL: "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/openai",
    apiKey: env.OPENAI_API_KEY,
  });

  if (body.model === "whisper-1") {
    const transcription = await openai.audio.transcriptions.create({
      file: body.file!,
      model: "whisper-1",
      language: "en-GB",
    });

    return new Response(JSON.stringify(transcription), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const textEncoder = new TextEncoder();

  ctx.waitUntil((async () => {
    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        ...body,
      });

      for await (const part of stream) {
        if (part.choices && part.choices[0] && part.choices[0].delta) {
          const text = part.choices[0].delta.content || "";
          writer.write(textEncoder.encode(text));
        }
      }
    } catch (error) {
      console.error("Error:", error);
      writer.write(
        textEncoder.encode("An error occurred while processing your request."),
      );
    } finally {
      await writer.close();
    }
  })());

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
