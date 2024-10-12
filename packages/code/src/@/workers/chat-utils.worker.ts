import { replaceFirstCodeMod as up } from "@/lib/chat-utils";
import { messagesPush } from "@/lib/chat-utils";
// import { ContextManager } from "@/lib/context-manager";
import type { HandleSendMessageProps, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
// import type { prettierJs } from "@/lib/prettier";
// import type { transpile } from "@/lib/transpile";
import { AIHandler } from "@src/AIHandler";
// import { claudeRecovery } from "@src/config/aiConfig";

import { Mutex } from "async-mutex";
import { throttle } from "es-toolkit";
// import { CodeSessionBC } from "../../services/CodeSessionBc";

const broadcastChannelsByCodeSpace: Record<string, BroadcastChannel> = {};

const handleSendMessage = async (
  { messages = [], codeSpace, prompt, images, code }: HandleSendMessageProps,
) => {
  let BC = broadcastChannelsByCodeSpace[codeSpace];

  if (!BC) {
    BC = new BroadcastChannel(`${codeSpace}-chat`);
    broadcastChannelsByCodeSpace[codeSpace] = BC;
  }

  BC.postMessage({ isStreaming: true });

  const setIsStreaming = (isStreaming: boolean) => BC.postMessage({ isStreaming });

  const setMessages = (_messages: Message[]) => {
    messages = _messages;
    BC.postMessage({ messages });
    return messages;
  };

  try {
    // const cSess = new CodeSessionBC(codeSpace);
    // await cSess.init();

    // const extendedBcSess = {
    //   ...cSess,
    //   setCodeAndTranspiled: async (
    //     { formatted, transpiled }: { formatted: string; transpiled: string },
    //   ) => cSess.setCodeAndTranspiled({ formatted, transpiled }),
    //   init: () => cSess.init(),
    //   session: cSess.session!,
    //   getCode: () => cSess.getCode(),
    //   setCode: async (rawCode: string, skipRunning = false) => {
    //     if (skipRunning) {
    //       const formatted = await m.prettierJs({
    //         code: rawCode,
    //         toThrow: true,
    //       });
    //       const transpiled = await m.transpile({
    //         code: formatted,
    //         originToUse: location.origin,
    //       })!;
    //       if (typeof transpiled !== "string") {
    //         return false;
    //       }

    //       cSess.setCodeAndTranspiled({ formatted, transpiled });
    //       return true;
    //     } else BC.postMessage({ code: rawCode });
    //     return true;
    //   },
    // };

    const aiHandler = new AIHandler(setIsStreaming, codeSpace);

    if (!prompt.trim()) return;

    const claudeContent = aiHandler.prepareClaudeContent(
      prompt,
      messages,
      code,
      codeSpace,
    );
    const newUserMessage = await createNewMessage(images, claudeContent);
    messages = messagesPush(messages, newUserMessage);
    setMessages([...messages]);

    try {
      const success = await processMessage({
        aiHandler,
        codeNow: code,
        messages,
        codeSpace,
        setMessages,
        newUserMessage,
      });

      if (success) {
        return;
      }
    } catch (error) {
      console.error("Error processing request:", error);

      const sorry: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again or rephrase your input.",
      };
      messages = messagesPush(messages, sorry);
      setMessages([...messages]);
    }
  } catch (e) {
    console.log(e);
  } finally {
    BC.postMessage({ isStreaming: false });
  }
};

const mutex = new Mutex();

console.log("Initializing message processing module");

export async function createNewMessage(
  images: ImageData[],
  claudeContent: string,
): Promise<Message> {
  console.log("Creating new message", {
    imageCount: images.length,
    contentLength: claudeContent.length,
  });
  const imagesContent: MessageContent = [];

  if (images && images.length > 0) {
    images.forEach((image) => {
      imagesContent.push({
        type: "image_url",
        image_url: { url: image.url },
      });
    });
    imagesContent.push({ type: "text", text: claudeContent.trim() || "" });
  }

  return {
    id: Date.now().toString(),
    role: "user",
    content: imagesContent.length > 0 ? imagesContent : claudeContent,
  };
}

interface Mod {
  controller: AbortController;
  lastCode: string;
  actions: Array<Action>;
}

interface Action {
  TRIED: number;
  SKIP: number;
  DIFFs: number;
  chars: number;
  type: string;
  lastCode?: string;
  startPos: number;
  chunkLength: number;
  chunk: string;
  lastSuccessCut: number;
  hash: string;
}

const mod: Mod = {
  controller: new AbortController(),
  lastCode: "",
  actions: [],
};

export async function processMessage(
  { aiHandler, codeNow, messages, setMessages, newUserMessage, codeSpace }: {
    aiHandler: AIHandler;
    codeNow: string;
    codeSpace: string;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    newUserMessage: Message;
  },
): Promise<boolean> {
  console.log("Processing message", {
    codeLength: codeNow.length,
    messageCount: messages.length,
  });
  // const contextManager = new ContextManager(codeSpace);

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      mod.lastCode = codeNow;
      mod.actions = [];

      Object.assign(globalThis, { BUILD_LOG: mod });
      if (newUserMessage) {
        messages = messagesPush(messages, newUserMessage);
        setMessages([...messages]);
      }

      const onUpdate = createOnUpdateFunction({
        setMessages,
        messages,
        BC: broadcastChannelsByCodeSpace[codeSpace],
      });

      const throttledOnUpdate = throttle(
        (instructions: string) => onUpdate(instructions),
        500,
        {
          edges: ["trailing"],
        },
      );

      console.log(`Processing message (attempt ${retries + 1})`);

      const assistantMessage = await sendAssistantMessage(
        aiHandler,
        messages,
        throttledOnUpdate as unknown as (code: string) => Promise<void>,
      );

      messages = messagesPush(messages, assistantMessage);
      setMessages([...messages]);

      const last = await onUpdate(assistantMessage.content as string);
      if (last && last !== codeNow) {
        console.log("Last code", last);

        broadcastChannelsByCodeSpace[codeSpace].postMessage({ code: last });
        return true;
      }

      // const errorMessage = contextManager.getContext("errorLog");
      // if (errorMessage) {
      //   console.log("Error detected, attempting to handle", { errorMessage });
      //   const errorHandled = await handleErrorMessage(
      //     {
      //       errorMessage,
      //       codeNow,
      //       messages,
      //       aiHandler,
      //       setMessages,
      //       contextManager,
      //     },
      //   );
      //   if (errorHandled) {
      //     console.log("Error handled successfully");
      //     return true;
      //   }
      // }

      retries++;
    } catch (error) {
      console.error(
        `Error processing message (attempt ${retries + 1}):`,
        error,
      );
      retries++;
    }
  }

  console.log("Failed to process message after max retries");
  return false;
}

function createOnUpdateFunction({
  setMessages,
  messages,
  // cSess,
  // contextManager,
  BC,
}: {
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  // cSess: ICode;
  // contextManager: ContextManager;
  BC: BroadcastChannel;
}) {
  return async (instructions: string) => {
    updateMessagesFromInstructions(
      instructions,
      messages,
      setMessages,
      messagesPush,
    );

    if (mod.controller.signal.aborted) {
      console.log("Aborted onUpdate before starting");
      return mod.lastCode;
    }

    try {
      mod.controller.abort();
      mod.controller = new AbortController();
      const { signal } = mod.controller;

      return await mutex.runExclusive(async () => {
        try {
          let finished = false;
          let iterationCount = 0;
          const maxIterations = 20;

          while (!finished && iterationCount < maxIterations) {
            if (signal.aborted) {
              console.log("Aborted onUpdate before updating");
              return;
            }
            console.log("Starting iteration", iterationCount);
            iterationCount++;
            const startPos = mod.actions[mod.actions.length - 1]?.lastSuccessCut || 0;
            const DIFFs = mod.actions[mod.actions.length - 1]?.DIFFs || 0;
            const SKIP = mod.actions[mod.actions.length - 1]?.SKIP || 0;
            const TRIED = mod.actions[mod.actions.length - 1]?.TRIED || 0;

            const lastCode = mod.lastCode;
            const chunk = instructions.slice(startPos);

            console.log("Processing chunk", {
              startPos,
              chunkLength: chunk.length,
            });

            if (chunk.length === 0) {
              finished = true;
              break;
            }

            const { result, len } = await updateSearchReplace({
              instructions: chunk,
              code: lastCode,
            });

            if (lastCode === result) {
              mod.actions.push({
                TRIED: TRIED + 1,
                SKIP: SKIP + 1,
                DIFFs,
                chars: instructions.length,
                type: "skip",
                startPos,
                chunkLength: chunk.length,
                chunk,
                lastSuccessCut: startPos,
                hash: md5(lastCode),
              });
              console.log("Skipped chunk", {
                startPos,
                chunkLength: chunk.length,
              });

              // If no changes were made, move to the next chunk
              mod.lastCode = lastCode;
              finished = startPos + chunk.length >= instructions.length;
            } else {
              mod.lastCode = result;
              mod.actions.push({
                TRIED: TRIED + 1,
                SKIP,
                DIFFs: DIFFs + 1,
                chars: instructions.length,
                type: "updated",
                startPos,
                chunkLength: len,
                chunk: chunk.slice(0, len),
                lastSuccessCut: len + startPos,
                hash: md5(mod.lastCode),
              });
              console.log("Updated chunk", { startPos, chunkLength: len });
            }

            BC.postMessage({ code: mod.lastCode });

            // if (formatted && transpiled) {
            //   cSess.setCodeAndTranspiled({
            //     formatted,
            //     transpiled,
            //   });
            // }
          }

          if (iterationCount >= maxIterations) {
            console.warn("Reached maximum iterations, forcing finish");
          }
          return mod.lastCode;
        } catch (error) {
          console.error("Error in throttledMutexOperation:", error);

          return mod.lastCode;
        }
      });
    } catch (error) {
      console.error("Error in mutex operation:", error);
      return mod.lastCode;
    }
  };
}

async function sendAssistantMessage(
  aiHandler: AIHandler,
  messages: Message[],
  onUpdate: (code: string) => Promise<void>,
): Promise<Message> {
  try {
    console.log("Sending message to assistant");
    let assistantMessage = await aiHandler.sendToAnthropic(messages, onUpdate);

    if (
      typeof assistantMessage.content !== "string"
      && !Array.isArray(assistantMessage.content)
    ) {
      throw new Error("Invalid assistant message content type");
    }

    const contentToProcess = extractTextContent(assistantMessage.content);

    if (contentToProcess.includes("An error occurred while processing")) {
      console.log("Falling back to GPT-4");
      assistantMessage = await aiHandler.sendToGpt4o(messages, onUpdate);
    }

    return assistantMessage;
  } catch (error) {
    console.error("Error in sendAssistantMessage:", error);
    throw error;
  }
}

function extractTextContent(
  content: string | Array<{ type: string; text?: string }>,
): string {
  if (typeof content === "string") {
    return content;
  }
  const textItem = content.find((item) => item.type === "text");
  return textItem?.text || "";
}

console.log("Message processing module initialized");
function updateMessagesFromInstructions(
  instructions: string,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
  messagesPush: (messages: Message[], message: Message) => Message[],
) {
  console.log("Updating messages from instructions", {
    instructionsLength: instructions.length,
  });

  messages = messagesPush(messages, {
    id: Date.now().toString(),
    role: "assistant",
    content: instructions,
  } as Message);

  setMessages([...messages]);
}

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";

// const m = globalThis as unknown as {
//   transpile: typeof transpile;
//   prettierJs: typeof prettierJs;
// };

// Debug function
const debug = (message: string, ...args: unknown[]) => {
  console.log(`[DEBUG] ${message}`, ...args);
};

const ups = async (
  { instructions, code }: { instructions: string; code: string },
): Promise<{ result: string; transpiled?: string; len: number }> => {
  debug("Function called with instructions length:", instructions.length);
  debug("Code length:", code.length);

  // Early return if instructions are empty
  if (instructions.length === 0) {
    return { result: code, len: 0 };
  }

  const searchIndex = instructions.indexOf(SEARCH);
  const replaceIndex = instructions.indexOf(REPLACE);

  if (searchIndex !== -1 && replaceIndex === -1) {
    debug("SEARCH found without REPLACE");
    const rAll = up(instructions, code);

    // Only perform the extra check if rAll is different from code
    if (rAll !== code) {
      const rAllWithExtra = up(instructions + "\nfoo doo baf   ", code);
      if (rAll !== rAllWithExtra) {
        debug("Replace block finished");
        return { result: rAll, len: instructions.length };
      }
    }

    debug("Replace block not finished");
    return { result: code, len: 0 };
  }

  if (replaceIndex !== -1) {
    debug("REPLACE found");
    const trimmedInstructions = instructions.slice(0, replaceIndex + REPLACE.length);
    const rAll = up(trimmedInstructions, code);
    debug("Trimmed instructions length:", trimmedInstructions.length);
    return { result: rAll, len: trimmedInstructions.length };
  }

  const rAll = up(instructions, code);
  if (rAll === code) {
    debug("No changes in code");
    return { result: rAll, len: instructions.length };
  }

  debug("Searching for minimum instructions to change code");

  // Use exponential search followed by binary search
  let jump = 1;
  while (jump < instructions.length && up(instructions.slice(0, jump), code) === code) {
    jump *= 2;
  }

  let low = jump / 2;
  let high = Math.min(jump, instructions.length);

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    debug("Binary search - low:", low, "high:", high, "mid:", mid);
    if (code === up(instructions.slice(0, mid), code)) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  const len = low;
  const rMin = up(instructions.slice(0, len), code);
  debug("Minimum instructions length found:", len);

  return { result: rMin, len };
};

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
) => ups({ instructions, code });

// if (result === code) {
//   debug("No changes in code");
//   return { result, len };
// }
// if (len === 0) {
//   throw new Error("Replace block not finished");
// }

// // Lazy load prettier and transpile functions
// if (!m.prettierJs) {
//   m.prettierJs = (await import(`@/lib/prettier`)).prettierJs;
// }
// if (!m.transpile) {
//   m.transpile = async ({ code }: { code: string; originToUse: string }) => code;
// }

// // Use Promise.all to run formatting and transpilation concurrently
// const [formatted, transpiled] = await Promise.all([
//   m.prettierJs({ code: result, toThrow: true }),
//   m.transpile({
//     code: result, // Use result instead of formatted to start transpilation immediately
//     originToUse: location.origin,
//   }),
// ]);

// if (typeof transpiled !== "string" || typeof formatted !== "string") {
//   return { result: code, len: 0 };
// }

// return { result, formatted, transpiled, len };
// };

Object.assign(globalThis, { handleSendMessage });
debug("chat-utils.worker.ts initialization complete");
