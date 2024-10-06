import { replaceFirstCodeMod as up } from "@/lib/chat-utils";
import { messagesPush } from "@/lib/chat-utils";
import { ContextManager } from "@/lib/context-manager";
import type { ICode, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import type { prettierJs } from "@/lib/prettier";
import type { transpile } from "@/lib/transpile";
import { AIHandler } from "@src/AIHandler";
import { claudeRecovery } from "@src/config/aiConfig";

import { Mutex } from "async-mutex";
import { throttle } from "es-toolkit";
import { CodeSessionBC } from "../../services/CodeSessionBc";

const handleSendMessage = async (
  { messages, codeSpace, prompt, images }: {
    messages: Message[];
    codeSpace: string;
    prompt: string;
    images: ImageData[];
  },
) => {
  const BC = new BroadcastChannel(`${codeSpace}-chat`);

  BC.postMessage({ isStreaming: true });

  const setMessages = (_messages: Message[]) => {
    messages = _messages;
    BC.postMessage({ messages });
    return messages;
  };

  const cSess = new CodeSessionBC(codeSpace);
  const extendedBcSess = {
    ...cSess,
    setCode: async (rawCode: string, skipRunning = false) => {
      if (skipRunning) {
        const formatted = await m.prettierJs({ code: rawCode, toThrow: true });
        const transpiled = await m.transpile({ code: formatted, originToUse: location.origin })!;
        if (typeof transpiled !== "string") {
          return false;
        }

        cSess.setCodeAndTranspiled({ formatted, transpiled });
        return true;
      } else BC.postMessage({ code: rawCode });
      return true;
    },
  };

  await cSess.init();

  const setIsStreaming = (isStreaming: boolean) => BC.postMessage({ isStreaming });
  const aiHandler = new AIHandler(setIsStreaming, codeSpace);

  if (!prompt.trim()) return;

  const claudeContent = aiHandler.prepareClaudeContent(
    prompt,
    messages,
    cSess.session!.code,
    codeSpace,
  );
  const newUserMessage = await createNewMessage(images, claudeContent);
  messages = messagesPush(messages, newUserMessage);
  BC.postMessage({ message: newUserMessage });

  try {
    const success = await processMessage({
      aiHandler,
      cSess: extendedBcSess as unknown as ICode,
      codeNow: cSess.session!.code,
      messages,
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
};

const mutex = new Mutex();

console.log("Initializing message processing module");

export async function createNewMessage(
  images: ImageData[],
  claudeContent: string,
): Promise<Message> {
  console.log("Creating new message", { imageCount: images.length, contentLength: claudeContent.length });
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

const mod: Mod = { controller: new AbortController(), lastCode: "", actions: [] };

export async function processMessage(
  { aiHandler, cSess, codeNow, messages, setMessages, newUserMessage }: {
    aiHandler: AIHandler;
    cSess: ICode;
    codeNow: string;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    newUserMessage: Message;
  },
): Promise<boolean> {
  console.log("Processing message", { codeLength: codeNow.length, messageCount: messages.length });
  const contextManager = new ContextManager(cSess.session.codeSpace);

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      mod.lastCode = await cSess.getCode();
      mod.actions = [];

      Object.assign(globalThis, { BUILD_LOG: mod });
      if (newUserMessage) {
        messages = messagesPush(messages, newUserMessage);
        setMessages([...messages]);
      }

      const onUpdate = createOnUpdateFunction({ setMessages, messages, cSess, contextManager });
      const throttledOnUpdate = throttle((instructions: string) => onUpdate(instructions), 100, {
        edges: ["trailing"],
      });

      console.log(`Processing message (attempt ${retries + 1})`);

      const assistantMessage = await sendAssistantMessage(
        aiHandler,
        messages,
        throttledOnUpdate as unknown as (code: string) => Promise<void>,
      );

      messages = messagesPush(messages, assistantMessage);
      setMessages([...messages]);

      const last = await onUpdate(assistantMessage.content as string);
      if (last) {
        console.log("Last code", last);
        const success = await trySetCode(cSess, last);
        if (success) {
          return true;
        }
      }

      const errorMessage = contextManager.getContext("errorLog");
      if (errorMessage) {
        console.log("Error detected, attempting to handle", { errorMessage });
        const errorHandled = await handleErrorMessage(
          { errorMessage, codeNow, messages, aiHandler, setMessages, cSess, contextManager },
        );
        if (errorHandled) {
          console.log("Error handled successfully");
          return true;
        }
      }

      retries++;
    } catch (error) {
      console.error(`Error processing message (attempt ${retries + 1}):`, error);
      retries++;
    }
  }

  console.log("Failed to process message after max retries");
  return false;
}

async function trySetCode(cSess: ICode, code: string, skipRunning = false): Promise<boolean> {
  try {
    console.log("Attempting to set code", { codeLength: code.length, skipRunning });
    if (mod.lastCode === await cSess.getCode()) return true;
    const success = await cSess.setCode(code, skipRunning);
    return !!success;
  } catch (error) {
    console.error("Failed to set code:", error);
    return false;
  }
}

function createOnUpdateFunction({
  setMessages,
  messages,
  cSess,
}: {
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  cSess: ICode;
  contextManager: ContextManager;
}) {
  return async (instructions: string) => {
    updateMessagesFromInstructions(instructions, messages, setMessages, messagesPush);

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
          const maxIterations = 1000;

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

            console.log("Processing chunk", { startPos, chunkLength: chunk.length });

            if (chunk.length === 0) {
              finished = true;
              break;
            }

            const { result, len, formatted, transpiled } = await updateSearchReplace({
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
              console.log("Skipped chunk", { startPos, chunkLength: chunk.length });

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
            if (formatted && transpiled) {
              cSess.setCodeAndTranspiled({
                formatted,
                transpiled,
              });
            }
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

    if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
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

async function handleErrorMessage(
  {
    errorMessage,
    codeNow,
    messages,
    aiHandler,
    setMessages,
    cSess,
    contextManager,
  }: {
    errorMessage: string;
    codeNow: string;
    messages: Message[];
    aiHandler: AIHandler;
    setMessages: (messages: Message[]) => void;
    cSess: ICode;
    contextManager: ContextManager;
  },
): Promise<boolean> {
  console.log("Handling error message", { errorMessageLength: errorMessage.length });
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: claudeRecovery(codeNow, errorMessage),
  };

  messages = messagesPush(messages, userMessage);
  setMessages([...messages]);

  const newOnUpdate = createOnUpdateFunction(
    { setMessages, messages, cSess, contextManager },
  );

  const throttledOnUpdate = throttle((instructions: string) => newOnUpdate(instructions), 100, { edges: ["trailing"] });

  const assistantMessage = await sendAssistantMessage(
    aiHandler,
    messages,
    throttledOnUpdate as unknown as (code: string) => Promise<void>,
  );

  messages = messagesPush(messages, assistantMessage);
  setMessages([...messages]);

  await newOnUpdate(assistantMessage.content as string);

  const success = await cSess.setCode(mod.lastCode);
  console.log("Error handling result:", success);

  return !!success;
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
  console.log("Updating messages from instructions", { instructionsLength: instructions.length });

  messages = messagesPush(messages, {
    id: Date.now().toString(),
    role: "assistant",
    content: instructions,
  } as Message);

  setMessages([...messages]);
}

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";

const m = globalThis as unknown as { transpile: typeof transpile; prettierJs: typeof prettierJs };

// Debug function
const debug = (message: string, ...args: unknown[]) => {
  console.log(`[DEBUG] ${message}`, ...args);
};

const ups = async (
  { instructions, code }: { instructions: string; code: string },
): Promise<{ result: string; transpiled?: string; len: number }> => {
  debug("Function called with instructions length:", instructions.length);
  debug("Code length:", code.length);

  if (instructions.includes(SEARCH) && !instructions.includes(REPLACE)) {
    debug("SEARCH found without REPLACE");
    const rAll = up(instructions, code);
    const rAllWithExtra = up(instructions + "\nfooo dooo baf   ", code);

    if (code === rAll || rAll !== rAllWithExtra) {
      debug("Replace block not finished");
      return { result: code, len: 0 };
    }

    debug("Replace block finished");
    return { result: rAll, len: instructions.length };
  }

  if (instructions.includes(REPLACE)) {
    debug("REPLACE found");
    const trimmedInstructions = instructions.slice(0, instructions.indexOf(REPLACE) + REPLACE.length);
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
  let low = 0;
  let high = instructions.length;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    debug("Binary search - low:", low, "high:", high, "mid:", mid);
    if (code === up(instructions.slice(0, mid), code)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  const len = high + 1;
  const rMin = up(instructions.slice(0, len), code);
  debug("Minimum instructions length found:", len);

  return { result: rMin, len };
};

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
): Promise<{ result: string; transpiled?: string; formatted?: string; len: number }> => {
  const { result, len } = await ups({ instructions, code });

  if (result === code) {
    debug("No changes in code");
    return { result, len };
  }
  if (len === 0) {
    throw new Error("Replace block not finished");
  }

  const formatted = await m.prettierJs({ code: result, toThrow: true });
  const transpiled = await m.transpile({ code: formatted, originToUse: location.origin });

  if (typeof transpiled !== "string" || typeof formatted !== "string") {
    return {
      result: code,
      len: 0,
    };
  }

  return { result, formatted, transpiled, len };
};

Object.assign(globalThis, { handleSendMessage });
debug("chat-utils.worker.ts initialization complete");
