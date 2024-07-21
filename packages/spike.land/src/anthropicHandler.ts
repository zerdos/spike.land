import Anthropic from "@anthropic-ai/sdk";
import { MessageParam, TextDelta } from "@anthropic-ai/sdk/resources/messages";
import Env from "./env";
import { handleCORS, readRequestBody } from "./utils";

export async function handleAnthropicRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  handleCORS(request);

  const body = JSON.parse(await readRequestBody(request)) as { messages: MessageParam[] };

  const anthropic = new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY,
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const textEncoder = new TextEncoder();

  ctx.waitUntil((async () => {
    try {
      const stream = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
        temperature: 0,
        messages: body.messages,
        stream: true,
      });

      for await (const part of stream) {
        if (part.type === "content_block_start" || part.type === "content_block_delta") {
          const text = "delta" in part ? (part.delta as TextDelta).text : "";
          writer.write(textEncoder.encode(text || ""));
        }
      }
    } catch (error) {
      console.error("Error:", error);
      writer.write(textEncoder.encode("An error occurred while processing your request."));
    } finally {
      await writer.close();
    }
  })());

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
