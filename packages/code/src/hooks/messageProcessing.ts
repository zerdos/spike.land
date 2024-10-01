import { useCodeSpace } from "@/hooks/use-code-space";
import { messagesPush } from "@/lib/chat-utils";
import { ContextManager } from "@/lib/context-manager";
import type { ICode, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { updateSearchReplace } from "@/lib/shared";
import type { AIHandler } from "@src/AIHandler";
import { claudeRecovery } from "@src/config/aiConfig";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

/**
 * Creates a new message, optionally including images.
 */
export async function createNewMessage(
  images: ImageData[],
  claudeContent: string,
): Promise<Message> {
  const imagesContent: MessageContent = [];

  if (images && images.length > 0) {
    images.forEach((image) => {
      imagesContent.push({
        type: "image_url",
        image_url: {
          url: image.url,
        },
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
  prevCode?: string;
  startPos: number;
  chunLength: number;
  chunk: string;
  lastSuccessCut: number;
  hash: string;
}

/**
 * Processes messages with retries, handling assistant responses and updating code accordingly.
 */
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
  const contextManager = new ContextManager(useCodeSpace());

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const mod: Mod = { controller: new AbortController(), lastCode: cSess.session.code, actions: [] };

      Object.assign(globalThis, { BUILD_LOG: mod });
      // Add the user message to the messages array
      if (newUserMessage) {
        messages = messagesPush(messages, newUserMessage);
        setMessages([...messages]);
      }

      const onUpdate = createOnUpdateFunction(
        { setMessages, messages, cSess, contextManager, mod },
      );

      // Create a copy of the messages array to work with

      console.log(`Processing message (attempt ${retries + 1})`);

      const assistantMessage = await sendAssistantMessage(
        aiHandler,
        messages,
        onUpdate,
      );

      // Add the assistant message to the working messages array
      messages = messagesPush(messages, assistantMessage);

      // Update the state with all messages, including the new assistant message
      setMessages([...messages]);

      if (codeNow !== cSess.session.code) {
        const success = await trySetCode(cSess, cSess.session.code);
        if (success) return true;
      }

      const errorMessage = contextManager.getContext("errorLog");
      if (errorMessage) {
        const errorHandled = await handleErrorMessage(
          { errorMessage, codeNow, messages, aiHandler, setMessages, cSess, contextManager, mod },
        );
        if (errorHandled) return true;
      }

      retries++;
    } catch (error) {
      console.error(`Error processing message (attempt ${retries + 1}): ${error}`);
      retries++;
    }
  }

  return false;
}
/**
 * Attempts to set the code in the code session.
 */
async function trySetCode(cSess: ICode, code: string, skipRunning = false): Promise<boolean> {
  try {
    const success = await cSess.setCode(code, skipRunning);
    return !!success;
  } catch (error) {
    console.error(`Failed to set code: ${error}`);
    return false;
  }
}

/**
 * Creates an onUpdate function to handle assistant updates.
 */
function createOnUpdateFunction({
  setMessages,
  messages,
  cSess,
  contextManager,
  mod,
}: {
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  cSess: ICode;
  contextManager: ContextManager;
  mod: Mod;
}) {
  let instructions = "";
  let lastUpdateTime = 0;
  const updateInterval = 100; // Update UI every 100ms

  const updateState = () => {
    const now = Date.now();
    if (now - lastUpdateTime >= updateInterval) {
      messages = messagesPush(messages, {
        id: now.toString(),
        role: "assistant",
        content: instructions,
      });
      setMessages([...messages]);
      lastUpdateTime = now;
    }
  };

  return async (code: string) => {
    if (mod.controller.signal.aborted) {
      console.log("Aborted onUpdate before starting");
      return;
    }

    instructions = code;
    updateState();

    try {
      mod.controller.abort();
      mod.controller = new AbortController();
      const { signal } = mod.controller;

      await mutex.runExclusive(async () => {
        {
          if (signal.aborted) {
            console.log("Aborted onUpdate before updating");
            return;
          }
          try {
            let finished = false;

            while (!finished) {
              const startPos = mod.actions[mod.actions.length - 1]?.lastSuccessCut || 0;
              const DIFFs = mod.actions[mod.actions.length - 1]?.DIFFs || 0;
              const SKIP = mod.actions[mod.actions.length - 1]?.SKIP || 0;
              const TRIED = mod.actions[mod.actions.length - 1]?.TRIED || 0;

              const lastCode = mod.lastCode;
              const chunk = instructions.slice(startPos);

              const { result, len } = await updateSearchReplace({ instructions: chunk, code: lastCode });
              // chunk = chunk.slice(0, len);
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
                // console.table(mod.actions[mod.actions.length - 1]);
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
                console.table(mod.actions[mod.actions.length - 1]);

                trySetCode(cSess, mod.lastCode, true);
              }
            }
          } catch (error) {
            console.error("Error in throttledMutexOperation:", error);
            contextManager.updateContext("errorLog", (error as Error).message);
          }
        }
      });
    } catch (error) {
      console.error("Error in mutex operation:", error);
      contextManager.updateContext("errorLog", (error as Error).message);
    }
  };
}

/**
 * Sends a message to the assistant and handles fallback if necessary.
 */
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

    return assistantMessage;
  } catch (error) {
    console.error("Error in sendAssistantMessage:", error);
    throw error;
  }
}

/**
 * Handles error messages by sending a recovery message and processing the response.
 */
async function handleErrorMessage(
  {
    errorMessage,
    codeNow,
    messages,
    aiHandler,
    setMessages,
    cSess,
    contextManager,
    mod,
  }: {
    errorMessage: string;
    codeNow: string;
    messages: Message[];
    aiHandler: AIHandler;
    setMessages: (messages: Message[]) => void;
    cSess: ICode;
    contextManager: ContextManager;
    mod: Mod;
  },
): Promise<boolean> {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: claudeRecovery(codeNow, errorMessage),
  };

  // Create a new array with all existing messages plus the new user message
  messages = messagesPush(messages, userMessage);

  // Update the state with all messages, including the new user message
  setMessages([...messages]);

  const newOnUpdate = createOnUpdateFunction(
    { setMessages, messages, cSess, contextManager, mod },
  );

  const assistantMessage = await sendAssistantMessage(
    aiHandler,
    messages,
    newOnUpdate,
  );

  // Add the assistant message to the updated messages array
  messages = messagesPush(messages, assistantMessage);

  // Update the state with all messages, including the new assistant message
  setMessages([...messages]);

  //  const contentToProcess = extractTextContent(assistantMessage.content);

  //  const starterCode = await updateSearchReplace({ instructions: contentToProcess, code: codeNow });
  /// const success = await trySetCode(cSess, starterCode);
  const success = cSess.session.code !== codeNow;

  return success;
}
/**
 * Extracts text content from a message.
 */
function extractTextContent(
  content: string | Array<{ type: string; text?: string }>,
): string {
  if (typeof content === "string") {
    return content;
  }
  const textItem = content.find((item) => item.type === "text");
  return textItem?.text || "";
}
