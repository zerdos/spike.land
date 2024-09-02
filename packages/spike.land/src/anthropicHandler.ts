import Anthropic from "@anthropic-ai/sdk";
import { MessageParam, TextDelta } from "@anthropic-ai/sdk/resources/messages";
import type { Stream } from "@anthropic-ai/sdk/streaming";
import Env from "./env";
import { handleCORS, readRequestBody } from "./utils";

export async function handleAnthropicRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  handleCORS(request);

  const body = JSON.parse(await readRequestBody(request)) as {
    stream?: boolean;
    system?: string;
    messages: MessageParam[];
  };

  const anthropic = new Anthropic({
    baseURL:
      "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/anthropic",
    apiKey: env.ANTHROPIC_API_KEY,
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const textEncoder = new TextEncoder();

  if (!(body.messages[0].role === "user" || body.messages[0].role === "assistant")) {
    const system = body.messages[0].content;
    if (typeof system === "string") {
      body.system = system;
      body.messages.shift();
    } else {
      body.system = system.find(s => s.type === "text")?.text;
      body.messages[0].role = "user";
      body.messages[0].content = system.filter(s =>
        s.type !== "text" || s.text !== body.system
      );
      const userMessage = body.messages[1];
      const userMessageContent = userMessage.content;
      if (typeof userMessageContent === "string") {
        body.messages[0].content.push({ type: "text", text: userMessageContent });
      } else {
        body.messages[0].content.push(...userMessageContent);
      }

      body.messages.splice(1, 1);
    }
  }

  const conf = {
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 2 * 4096,
    temperature: 0.1,
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
      const stream = await anthropic.messages.create(conf) as Stream<
        Anthropic.Messages.RawMessageStreamEvent
      >;

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
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
