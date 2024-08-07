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

  const body = JSON.parse(await readRequestBody(request)) as {
    messages: MessageParam[];
  };

  const anthropic = new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY,
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const textEncoder = new TextEncoder();

  const conf = {
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 4096,
    temperature: 0,
    stream: true,
    ...body,
  };

  if (conf.stream === false) {
    const response = await anthropic.messages.create(conf);
    return new Response(JSON.stringify(response), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  ctx.waitUntil((async () => {
    try {
      const stream = await anthropic.messages.create(conf);

      for await (const part of stream) {
        if (
          part.type === "content_block_start"
          || part.type === "content_block_delta"
        ) {
          const text = "delta" in part ? (part.delta as TextDelta).text : "";
          writer.write(textEncoder.encode(text || ""));
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
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
