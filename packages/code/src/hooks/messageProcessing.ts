import { useCodeSpace } from "@/hooks/use-code-space";
import { messagesPush } from "@/lib/chat-utils";
import { ContextManager } from "@/lib/context-manager";
import type { ICode, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { updateSearchReplace } from "@/lib/shared";
import type { AIHandler } from "@src/AIHandler";
import { claudeRecovery } from "@src/config/aiConfig";
import { Mutex } from "async-mutex";
import { throttle } from "es-toolkit";

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
  chunLength: number;
  chunk: string;
  lastSuccessCut: number;
  hash: string;
}

const mod = {
  controller: new AbortController(),
  lastCode: "",
  actions: [],
} as Mod;

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
  const contextManager = new ContextManager(useCodeSpace());

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // const mod: Mod = { controller: new AbortController(), lastCode: cSess.session.code, actions: [] };od
      mod.lastCode = cSess.session.code;
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
        throttledOnUpdate as unknown as typeof onUpdate,
      );

      messages = messagesPush(messages, assistantMessage);
      setMessages([...messages]);

      await onUpdate(assistantMessage.content as string);

      if (mod.lastCode === cSess.session.code && codeNow !== cSess.session.code) {
        return true;
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
  contextManager,
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
      return;
    }

    try {
      mod.controller.abort();
      mod.controller = new AbortController();
      const { signal } = mod.controller;

      return await mutex.runExclusive(async () => {
        try {
          let finished = false;
          let iterationCount = 0;
          const maxIterations = 1000; // Prevent infinite loop

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

            const { result, len } = await updateSearchReplace({ instructions: chunk, code: lastCode });
            mod.lastCode = result;

            if (len === 0) {
              finished = true;
              mod.actions.push({
                TRIED: TRIED + 1,
                SKIP: SKIP + 1,
                DIFFs,
                chars: instructions.length,
                type: "skip",
                startPos,
                chunLength: chunk.length,
                chunk,
                lastSuccessCut: startPos,
                hash: md5(lastCode),
              });
              console.log("Skipped chunk", { startPos, chunkLength: chunk.length });
            } else {
              mod.actions.push({
                TRIED: TRIED + 1,
                SKIP,
                DIFFs: DIFFs + 1,
                chars: instructions.length,
                type: "updated",
                startPos,
                chunLength: len,
                chunk: chunk.slice(0, len),
                lastSuccessCut: len + startPos,
                hash: md5(mod.lastCode),
              });
              console.log("Updated chunk", { startPos, chunkLength: len });
              if (lastCode !== mod.lastCode) {
                await trySetCode(cSess, mod.lastCode);
              }
            }
          }

          if (iterationCount >= maxIterations) {
            console.warn("Reached maximum iterations, forcing finish");
          }
        } catch (error) {
          console.error("Error in throttledMutexOperation:", error);
          contextManager.updateContext("errorLog", (error as Error).message);
        }
      });
    } catch (error) {
      console.error("Error in mutex operation:", error);
      contextManager.updateContext("errorLog", (error as Error).message);
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
    throttledOnUpdate as unknown as typeof newOnUpdate,
  );

  messages = messagesPush(messages, assistantMessage);
  setMessages([...messages]);

  await newOnUpdate(assistantMessage.content as string);

  const success = cSess.session.code === mod.lastCode;
  console.log("Error handling result:", success);

  return success;
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
