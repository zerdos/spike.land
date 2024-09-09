import Anthropic from "@anthropic-ai/sdk";
import { MessageParam, TextDelta } from "@anthropic-ai/sdk/resources/messages";
import type { Stream } from "@anthropic-ai/sdk/streaming";
import Env from "./env";
import { handleCORS, readRequestBody } from "./utils";
import type { Message, MessageContent } from "@spike-land/code";
import {handleCMSIndexRequest} from "./chat";

function base64Encode(buf: ArrayBuffer) {
  let string = '';
  (new Uint8Array(buf)).forEach(
    (byte) => { string += String.fromCharCode(byte) }
  )
  return btoa(string)
}

interface RequestBody {
  stream?: boolean;
  system?: string;
  messages: Message[];
}

export async function handleAnthropicRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) {
  handleCORS(request);

  const body = JSON.parse(await readRequestBody(request)) as RequestBody;
  const bodyMessages =  [
    {
      "role": "user",
      "content": [
        {
          "type": "image_url",
          "image_url": {
            "url": "https://testing.spike.land/my-cms/feWWXXbV/screenshot-zoli-ecqgkcca.jpeg"
          }
        },
        {
          "type": "text",
          "text": "Hey,\nYou are an AI assistant for an online code editor, \nhelping with React components. \n\nYou got this starter code file to work with:\n\n```tsx\n\n// zoli-ecqgkcca\n\nimport { motion } from \"framer-motion\";\n\nexport default () => {\n  // No state or functions needed for this version\n\n  const variants = {\n    initial: { scale: 1 },\n    animate: {\n      scale: [1, 1.05, 1],\n      transition: {\n        duration: 5,\n        repeat: Infinity,\n        ease: \"easeInOut\",\n      },\n    },\n    hover: {\n      scale: 1.1,\n      transition: { duration: 0.3 },\n    },\n  };\n\n  return (\n    <header className='min-h-[10vh] flex flex-col justify-center items-center text-center text-gray-800 bg-gradient-to-br from-blue-300 to-cyan-200 p-8'>\n      <motion.div\n        variants={variants}\n        initial='initial'\n        animate='animate'\n        whileHover='hover'>\n        <div className='text-[calc(20px+20vmin)] mb-10'>🌈🌈🌈🌈🌈🌈🌈🌈</div>\n      </motion.div>\n      <motion.div\n        initial={{ opacity: 0, y: 20 }}\n        animate={{ opacity: 1, y: 0 }}\n        transition={{ delay: 0.5 }}\n        className='max-w-3xl mb-10 text-base sm:text-lg leading-relaxed p-8 bg-white bg-opacity-80 rounded-lg shadow-lg prose prose-lg'>\n        <h2 className='text-3xl sm:text-4xl mb-6 text-gray-800 font-bold'>\n          The Magic of Rainbows\n        </h2>\n        <p>\n          Rainbows are one of nature's most spectacular displays, captivating humans for\n          millennia with their vibrant arcs of color. These ethereal phenomena occur when\n          sunlight interacts with water droplets in the atmosphere, creating a prism\n          effect that separates white light into its component colors. The result is a\n          breathtaking display of red, orange, yellow, green, blue, indigo, and violet –\n          the familiar ROYGBIV sequence.\n        </p>\n        <p>\n          Beyond their scientific explanation, rainbows hold deep cultural and symbolic\n          significance across the world. They often represent hope, promise, and new\n          beginnings. In many mythologies, rainbows are seen as bridges between the\n          earthly and divine realms. Today, the rainbow flag stands as a powerful symbol\n          of diversity, inclusivity, and pride for the LGBTQ+ community.\n        </p>\n        <p>\n          Whether viewed as a meteorological marvel or a symbol of unity, rainbows\n          continue to inspire wonder and joy, reminding us of the beauty and diversity\n          that surrounds us in nature and in our global community.\n        </p>\n      </motion.div>\n\n      <footer className='mt-8 text-sm text-gray-600'>\n        Created with 💖 by [Your Name]\n      </footer>\n    </header>\n  );\n};\n\n```\n\nIf the user provides you with specific instructions, you must modify the code using the following format:\n\nYou must modify the code using string replace tools. The sting replace block is applied on the whole code. \nThe format is as follows:\n<<<<<<< SEARCH\n[Original code to be replaced]\n=======\n[New code to replace the original]\n>>>>>>> REPLACE\n\nThis format helps to clearly identify the changes to be made.\nApart from the change blocks, use markdown format.\n\nTo generate images (from a prompt): \n\n```tsx\nimport { ImageLoader } from '@/components/ui/image-loader';\n\nfunction MyComponent() { return ( <ImageLoader prompt=\"A beautiful sunset over the ocean\" aspect_ratio=\"16:9\"/> ); }\n```\nall the aspect ratios are supported:\nconst RESOLUTION = {\n  \"9:21\": [640, 1536],\n  \"9:16\": [768, 1344],\n  \"16:9\": [896, 1584],\n  \"16:10\": [896, 1408],\n  \"5:4\": [1088, 896],\n  \"4:5\": [896, 1088],\n  \"2:3\": [832, 1216],\n  \"3:2\": [1216, 832],\n  \"1:1\": [1024, 1024],\n};\n\n\n\nAlso, the block will be executed one by one, so you can't use the the replaced block in the next search block.\n\n\nReact component guidelines:\n- Components should be default export JSX\n- Styling options: @emotion/react, Tailwind CSS, shadcn-ui, or other npm packages\n\n\nResponse format:\n1. List each change separately\n2. Provide only the code snippets being modified or added\n3. Explain the purpose of each change\n4. Suggest any improvements or alternatives\n5. Don't include installation instructions or package.json modifications\n\nAlways focus on concise, targeted updates rather than full file replacements.\n\nThe user's first message follows:\njust 1 rainbow please"
        }
      ]
    }
  ];
  const messages = await Promise.all(bodyMessages.map(async (message: Message) => {
    const content: MessageContent = message.content;
    if (typeof content === "string") {
      return message;
    }

    const processedContent = await Promise.all(message.content.map(async (content: MessageContent) => {
      if (content.type !== "image_url") {
        return content;
      }


        const url = content.image_url.url;
        const response = await handleCMSIndexRequest(new Request(url), env);

        const data = base64Encode(await response.arrayBuffer());

        return {
          type: "image",
          source: {
            type: "base64",
            media_type: response.headers.get("Content-Type") || "image/jpeg",
            data
          }
         
        };

    }));

    return {
      ...message,
      content: processedContent
    };
  }));

  const anthropic = new Anthropic({
    baseURL: "https://gateway.ai.cloudflare.com/v1/1f98921051196545ebe79a450d3c71ed/z1/anthropic",
    apiKey: env.ANTHROPIC_API_KEY,
  });

  const conf = {
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 2 * 4096,
    temperature: 0.1,
    stream: true,
    ...body,
    messages,
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

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const textEncoder = new TextEncoder();

  ctx.waitUntil((async () => {
    try {
      const stream = await anthropic.messages.create(conf) as Stream<
        Anthropic.Messages.RawMessageStreamEvent
      >;

      for await (const part of stream) {
        if (part.type === "content_block_start" || part.type === "content_block_delta") {
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

function preprocessMessages(body: RequestBody): RequestBody {
  const processedBody: RequestBody = { ...body, messages: [...body.messages] };

  if (processedBody.messages.length > 0) {
    const firstMessage = processedBody.messages[0];
    if (firstMessage.role !== "user") {
      processedBody.system = getSystemMessage(firstMessage);
      processedBody.messages.shift();
    } else if (Array.isArray(firstMessage.content)) {
      const systemContent = firstMessage.content.find(c => c.type === "text" && c.text.startsWith("Human:")) as {
        text: string;
      } | undefined;
      if (systemContent) {
        processedBody.system = systemContent.text.replace("Human:", "").trim();
        firstMessage.content = firstMessage.content.filter(c => c !== systemContent);
      }
    }
  }

  return processedBody;
}

function getSystemMessage(message: MessageParam): string {
  if (typeof message.content === "string") {
    return message.content;
  } else if (Array.isArray(message.content)) {
    const textContent = message.content.find(c => c.type === "text");
    return textContent ? textContent.text : "";
  }
  return "";
}
