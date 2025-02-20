import OpenAI from "openai";
import type { ChatCompletionCreateParamsStreaming } from "openai/resources/chat/completions";
import type Env from "./env";
import { KVLogger } from "./Logs";
import { handleCORS, readRequestBody } from "./utils";

interface MessageParam {
  role: "user" | "assistant";
  content: string;
}

export async function handleGPT4Request(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  handleCORS(request);
  const logger = new KVLogger("ai", env.KV);

  const body = await readRequestBody(request) as {
    model: string;
    messages: MessageParam[];
    input?: string;
    prompt?: string;
    speed?: number;
    voice?: string;

    // base64 encoded file
    file?: File;
  };

  const openai = new OpenAI({
    baseURL: "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/openai",
    // baseURL: "https://api.openai.com/v1",
    apiKey: env.OPENAI_API_KEY,
  });

  if (body.model === "tts-1" || body.model === "tts-1-hd") {
    try {
      const validVoices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
      const voice = validVoices.includes(body.voice ?? "")
        ? body.voice as "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"
        : "alloy";

      const params = {
        model: body.model,
        voice,
        input: body.input || "Hello, how are you?",
        response_format: "mp3" as const,
        speed: body.speed || 1,
      };

      const speechResponse = await openai.audio.speech.create(params);

      // Ensure speechResponse has arrayBuffer method
      if (typeof speechResponse.arrayBuffer !== "function") {
        throw new Error("Invalid speech response");
      }

      // Convert the ReadableStream to ArrayBuffer
      const arrayBuffer = await speechResponse.arrayBuffer();

      // Return the audio file
      return new Response(arrayBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.error("Error in TTS:", error);
      return new Response(
        JSON.stringify({ error: "TTS processing failed" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  }

  try {
    // Handle whisper transcription requests
    if (body.model === "whisper-1") {
      if (!body.file) {
        return new Response(
          JSON.stringify({ error: "No audio file provided" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      const transcription = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: body.file,
        response_format: "text",
        ...(body.prompt ? { prompt: body.prompt! } : {}),
      });

      return new Response(JSON.stringify({ text: transcription }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error) {
    console.error("Error in whisper transcription:", error);
    return new Response(
      JSON.stringify({ error: "Whisper processing failed" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const textEncoder = new TextEncoder();

    const conf: ChatCompletionCreateParamsStreaming = {
      stream: true,
      model: body.model || "gpt-4o-mini", // Use the model from body, or fallback to 'gpt-4o-mini'
      messages: body.messages,
    };

    let answer = "";
    ctx.waitUntil((async () => {
      try {
        const stream = await openai.chat.completions.create(conf);

        if (!stream[Symbol.asyncIterator]) {
          throw new Error("Stream is not iterable");
        }

        for await (const part of stream) {
          if (part.choices && part.choices[0] && part.choices[0].delta) {
            const text = part.choices[0].delta.content || "";
            await writer.write(textEncoder.encode(text));
            answer += text;
          }
        }
      } catch (error) {
        console.error("Error:", error);
        await writer.write(
          textEncoder.encode("An error occurred while processing your request."),
        );
      } finally {
        await writer.close();
        await logger.log(JSON.stringify({
          conf,
          answer,
        }));
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
  } catch (error) {
    console.error("Error in chat completion:", error);
    const errorDetails = error instanceof Error
      ? {
        message: error.message,
        stack: error.stack,
      }
      : {
        message: "Unknown error occurred",
        stack: null,
      };

    return new Response(
      JSON.stringify({
        error: "Chat completion failed",
        details: errorDetails,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}
