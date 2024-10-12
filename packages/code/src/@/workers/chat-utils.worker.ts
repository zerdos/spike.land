import { messagesPush, replaceFirstCodeMod as up } from "@/lib/chat-utils";
import type { HandleSendMessageProps, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { AIHandler } from "@src/AIHandler";
import { Mutex } from "async-mutex";
import { throttle } from "es-toolkit";

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";

const broadcastChannelsByCodeSpace: Record<string, BroadcastChannel> = {};

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

const mutex = new Mutex();

const debug = (message: string, ...args: unknown[]) => {
  console.log(`[DEBUG] ${message}`, ...args);
};

const handleSendMessage = async ({ messages = [], codeSpace, prompt, images, code }: HandleSendMessageProps) => {
  const BC = broadcastChannelsByCodeSpace[codeSpace] || new BroadcastChannel(`${codeSpace}-chat`);
  broadcastChannelsByCodeSpace[codeSpace] = BC;

  const setIsStreaming = (isStreaming: boolean) => BC.postMessage({ isStreaming });
  const setMessages = (_messages: Message[]) => {
    messages = _messages;
    BC.postMessage({ messages });
    return messages;
  };

  BC.postMessage({ isStreaming: true });

  try {
    const aiHandler = new AIHandler(setIsStreaming, codeSpace);

    if (!prompt.trim()) return;

    const claudeContent = aiHandler.prepareClaudeContent(prompt, messages, code, codeSpace);
    const newUserMessage = await createNewMessage(images, claudeContent);
    messages = messagesPush(messages, newUserMessage);
    setMessages([...messages]);

    await processMessage({ aiHandler, code, messages, codeSpace, setMessages, newUserMessage });
  } catch (e) {
    console.error("Error in handleSendMessage:", e);
  } finally {
    BC.postMessage({ isStreaming: false });
  }
};

async function createNewMessage(images: ImageData[], claudeContent: string): Promise<Message> {
  const imagesContent: MessageContent = images.map(image => ({
    type: "image_url",
    image_url: { url: image.url },
  }));

  if (imagesContent.length > 0) {
    imagesContent.push({ type: "text", text: claudeContent.trim() || "" });
  }

  return {
    id: Date.now().toString(),
    role: "user",
    content: imagesContent.length > 0 ? imagesContent : claudeContent,
  };
}

async function processMessage({ aiHandler, code, messages, setMessages, newUserMessage, codeSpace }: {
  aiHandler: AIHandler;
  code: string;
  codeSpace: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  newUserMessage: Message;
}): Promise<boolean> {
  const maxRetries = 3;
  let retries = 0;

  mod.lastCode = code;

  while (retries < maxRetries) {
    try {
      mod.actions = [];

      messages = messagesPush(messages, newUserMessage);
      setMessages([...messages]);

      const onUpdate = createOnUpdateFunction({ setMessages, messages, BC: broadcastChannelsByCodeSpace[codeSpace] });
      const throttledOnUpdate = throttle(
        async (instructions: string) => {
          await onUpdate(instructions);
        },
        500,
        { edges: ["trailing"] },
      );

      const assistantMessage = await sendAssistantMessage(
        aiHandler,
        messages,
        throttledOnUpdate as unknown as typeof onUpdate,
      );
      messages = messagesPush(messages, assistantMessage);
      setMessages([...messages]);

      // await onUpdate(assistantMessage.content as string);

      if (typeof mod.lastCode !== "string") {
        console.error("Invalid mod.lastCode type:", typeof mod.lastCode);
        mod.lastCode = code; // Reset to original code if invalid
      }

      if (mod.lastCode === code) {
        return true;
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

function createOnUpdateFunction({ setMessages, messages, BC }: {
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  BC: BroadcastChannel;
}): (instructions: string) => Promise<void> {
  return async (instructions: string) => {
    updateMessagesFromInstructions(instructions, messages, setMessages);

    if (mod.controller.signal.aborted) {
      console.log("Aborted onUpdate before starting");
      return;
    }

    mod.controller.abort();
    mod.controller = new AbortController();
    const { signal } = mod.controller;

    return await mutex.runExclusive(async () => {
      try {
        let iterationCount = 0;
        const maxIterations = 20;

        while (iterationCount < maxIterations) {
          if (signal.aborted) {
            console.log("Aborted onUpdate before updating");
            return;
          }

          iterationCount++;
          const { startPos, DIFFs, SKIP, TRIED } = getLastActionInfo();
          const chunk = instructions.slice(startPos);

          if (chunk.length === 0) break;

          const { result, len } = await updateSearchReplace({ instructions: chunk, code: mod.lastCode });

          updateModActions({ result, len, startPos, DIFFs, SKIP, TRIED, chunk, instructions });

          if (iterationCount >= maxIterations) {
            console.warn("Reached maximum iterations, forcing finish");
            break;
          }
        }

        console.log("Finished iteration", iterationCount);
        console.log("current code", mod.lastCode);
        BC.postMessage({ code: mod.lastCode });
      } catch (error) {
        console.error("Error in throttledMutexOperation:", error);
      }
    });
  };
}

function getLastActionInfo() {
  const lastAction = mod.actions[mod.actions.length - 1];
  return {
    startPos: lastAction?.lastSuccessCut || 0,
    DIFFs: lastAction?.DIFFs || 0,
    SKIP: lastAction?.SKIP || 0,
    TRIED: lastAction?.TRIED || 0,
  };
}

function updateModActions({ result, len, startPos, DIFFs, SKIP, TRIED, chunk, instructions }: {
  result: string;
  len: number;
  startPos: number;
  DIFFs: number;
  SKIP: number;
  TRIED: number;
  chunk: string;
  instructions: string;
}) {
  if (mod.lastCode === result) {
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
      hash: md5(mod.lastCode),
    });
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
  }
}

async function sendAssistantMessage(
  aiHandler: AIHandler,
  messages: Message[],
  onUpdate: (code: string) => Promise<void>,
): Promise<Message> {
  try {
    let assistantMessage = await aiHandler.sendToAnthropic(messages, onUpdate);

    if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
      throw new Error("Invalid assistant message content type");
    }

    const contentToProcess = extractTextContent(assistantMessage.content);

    if (contentToProcess.includes("An error occurred while processing")) {
      console.log("Falling back to GPT-4");
      assistantMessage = await aiHandler.sendToGpt4o(messages, onUpdate);
    }

    return assistantMessage as Message;
  } catch (error) {
    console.error("Error in sendAssistantMessage:", error);
    throw error;
  }
}

function extractTextContent(content: string | Array<{ type: string; text?: string }>): string {
  if (typeof content === "string") return content;
  const textItem = content.find((item) => item.type === "text");
  return textItem?.text || "";
}

function updateMessagesFromInstructions(
  instructions: string,
  messages: Message[],
  setMessages: (messages: Message[]) => void,
) {
  messages = messagesPush(messages, {
    id: Date.now().toString(),
    role: "assistant",
    content: instructions,
  } as Message);

  setMessages([...messages]);
}

const ups = async (
  { instructions, code }: { instructions: string; code: string },
): Promise<{ result: string; len: number }> => {
  if (instructions.length === 0) return { result: code, len: 0 };

  const searchIndex = instructions.indexOf(SEARCH);
  const replaceIndex = instructions.indexOf(REPLACE);

  if (searchIndex !== -1 && replaceIndex === -1) {
    const rAll = up(instructions, code);
    if (rAll !== code) {
      const rAllWithExtra = up(instructions + "\nfoo doo baf   ", code);
      if (rAll !== rAllWithExtra) return { result: rAll, len: instructions.length };
    }
    return { result: code, len: 0 };
  }

  if (replaceIndex !== -1) {
    const trimmedInstructions = instructions.slice(0, replaceIndex + REPLACE.length);
    return { result: up(trimmedInstructions, code), len: trimmedInstructions.length };
  }

  const rAll = up(instructions, code);
  if (rAll === code) return { result: rAll, len: instructions.length };

  let jump = 1;
  while (jump < instructions.length && up(instructions.slice(0, jump), code) === code) {
    jump *= 2;
  }

  let low = jump / 2;
  let high = Math.min(jump, instructions.length);

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (code === up(instructions.slice(0, mid), code)) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return { result: up(instructions.slice(0, low), code), len: low };
};

export const updateSearchReplace = ups;

Object.assign(globalThis, { handleSendMessage });
debug("chat-utils.worker.ts initialization complete");
