import { createContextManager } from "@/lib/context-manager";
import { ICode, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { updateSearchReplace } from "@/lib/shared";
import type { AIHandler } from "@src/AIHandler";
import { claudeRecovery } from "@src/config/aiConfig";
import type { Mutex } from "async-mutex";
import { debounce } from "es-toolkit";

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

/**
 * Processes messages with retries, handling assistant responses and updating code accordingly.
 */
export async function processMessage(
  aiHandler: AIHandler,
  cSess: ICode,
  codeNow: string,
  updatedMessages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  saveMessages: (newMessages: Message[]) => void,
  mutex: Mutex,
  codeSpace: string,
): Promise<boolean> {
  const contextManager = createContextManager(codeSpace);
  const sentMessages = [...updatedMessages];
  const maxRetries = 3;
  let retries = 0;
  const mod = { controller: new AbortController() };

  const onUpdate = createOnUpdateFunction(
    sentMessages,
    mutex,
    setMessages,
    cSess,
    contextManager,
    codeNow,
    mod,
  );

  while (retries < maxRetries) {
    try {
      console.log(`Processing message (attempt ${retries + 1})`);

      let assistantMessage = await sendAssistantMessage(
        aiHandler,
        sentMessages,
        onUpdate,
      );

      mod.controller.abort();

      sentMessages.push(assistantMessage);
      saveMessages(sentMessages);

      const success = await processAssistantMessage(
        assistantMessage,
        codeNow,
        cSess,
      );

      if (success) return true;

      const errorMessage = contextManager.getContext("errorLog");
      if (errorMessage) {
        const errorHandled = await handleErrorMessage(
          errorMessage,
          codeNow,
          sentMessages,
          aiHandler,
          mutex,
          setMessages,
          cSess,
          contextManager,
          mod,
        );
        if (errorHandled) return true;
      }

      retries++;
    } catch (error) {
      console.error(`Error processing message (attempt ${retries + 1}): ${error}`);
      retries++;
    }
  }

  console.error("Max retries reached. Failed to process message.");
  return false;
}

/**
 * Attempts to set the code in the code session.
 */
async function trySetCode(cSess: ICode, code: string): Promise<boolean> {
  try {
    const success = await cSess.setCode(code);
    return !!success;
  } catch (error) {
    console.error(`Failed to set code: ${error}`);
    return false;
  }
}

/**
 * Creates an onUpdate function to handle assistant updates.
 */
function createOnUpdateFunction(
  sentMessages: Message[],
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: ICode,
  contextManager: ReturnType<typeof createContextManager>,
  startCode: string,
  mod: { controller: AbortController },
) {
  let accumulatedCode = "";
  let rafId: number | null = null;

  const updateState = () => {
    setMessages([
      ...sentMessages,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: accumulatedCode,
      },
    ]);
    rafId = null;
  };

  const debouncedMutexOperation = debounce(async () => {
    if (mod.controller.signal.aborted) {
      console.log("Aborted onUpdate inside mutex");
      return;
    }

    const lastCode = await updateSearchReplace(accumulatedCode, startCode);
    const lastReplaceModeIsOn = await updateSearchReplace(accumulatedCode + " \nfoo \n", startCode);

    if (lastCode !== lastReplaceModeIsOn) {
      return;
    }

    if (mod.controller.signal.aborted) {
      console.log("Aborted onUpdate before trySetCode");
      return;
    }

    const success = await trySetCode(cSess, lastCode);
    contextManager.updateContext("currentDraft", success ? "" : lastCode);
  }, 100);

  return async (code: string) => {
    if (mod.controller.signal.aborted) {
      console.log("Aborted onUpdate before starting");
      return;
    }

    accumulatedCode = code;

    if (!rafId) {
      rafId = requestAnimationFrame(updateState);
    }

    await mutex.runExclusive(debouncedMutexOperation);
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
  let assistantMessage = await aiHandler.sendToAnthropic(messages, onUpdate);

  if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
    throw new Error("Invalid assistant message content type");
  }

  const contentToProcess = extractTextContent(assistantMessage.content);

  if (contentToProcess.includes("An error occurred while processing")) {
    assistantMessage = await aiHandler.sendToGpt4o(messages, onUpdate);
  }

  return assistantMessage;
}

/**
 * Processes the assistant's message to update the code.
 */
async function processAssistantMessage(
  assistantMessage: Message,
  codeNow: string,
  cSess: ICode,
): Promise<boolean> {
  let contentToProcess = extractTextContent(assistantMessage.content);

  const starterCode1 = await updateSearchReplace(contentToProcess, codeNow);
  const starterCode2 = await updateSearchReplace(contentToProcess + `\n foo \n`, codeNow);

  let starterCode = starterCode1 !== starterCode2 ? codeNow : starterCode1;

  if (starterCode !== codeNow) {
    const success = await trySetCode(cSess, starterCode);
    if (success) return true;
  }

  return false;
}

/**
 * Handles error messages by sending a recovery message and processing the response.
 */
async function handleErrorMessage(
  errorMessage: string,
  codeNow: string,
  sentMessages: Message[],
  aiHandler: AIHandler,
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: ICode,
  contextManager: ReturnType<typeof createContextManager>,
  mod: { controller: AbortController },
): Promise<boolean> {
  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: claudeRecovery(codeNow, errorMessage),
  };

  sentMessages.push(userMessage);

  const newOnUpdate = createOnUpdateFunction(
    sentMessages,
    mutex,
    setMessages,
    cSess,
    contextManager,
    codeNow,
    mod,
  );

  let assistantMessage = await sendAssistantMessage(
    aiHandler,
    sentMessages,
    newOnUpdate,
  );

  mod.controller.abort();

  setMessages([...sentMessages, assistantMessage]);

  let contentToProcess = extractTextContent(assistantMessage.content);

  const starterCode = await updateSearchReplace(contentToProcess, codeNow);
  const success = await trySetCode(cSess, starterCode);

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
