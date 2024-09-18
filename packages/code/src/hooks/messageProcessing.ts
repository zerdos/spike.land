import { createContextManager } from "@/lib/context-manager";
import { ICode, ImageData, Message } from "@/lib/interfaces";
import { updateSearchReplace } from "@/lib/shared";
import type { AIHandler } from "@src/AIHandler";
import { claudeRecovery } from "@src/config/aiConfig";
import type { Mutex } from "async-mutex";

export async function createNewMessage(
  images: ImageData[],
  claudeContent: string,
): Promise<Message> {
  const imagesContent: any[] = [];

  if (images && images.length > 0) {
    images.forEach((image) => {
      imagesContent.push({
        type: "image_url",
        image_url: {
          url: image.url,
        },
      });
    });
    imagesContent.push({ type: "text", text: claudeContent?.trim() || "" });
  }

  return {
    id: Date.now().toString(),
    role: "user",
    content: imagesContent.length > 0 ? imagesContent : claudeContent,
  };
}

export async function processMessage(
  aiHandler: AIHandler,
  cSess: ICode,
  updatedMessages: Message[],
  codeNow: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  saveMessages: (newMessages: Message[]) => void,
  mutex: Mutex,
  codeSpace: string,
): Promise<boolean> {
  const contextManager = createContextManager(codeSpace);
  let sentMessages = [...updatedMessages];

  const onUpdate = createOnUpdateFunction(
    sentMessages,
    mutex,
    setMessages,
    cSess,
    contextManager,
  );

  try {
    console.log("Processing message");
    let assistantMessage = await sendAssistantMessage(
      aiHandler,
      updatedMessages,
      onUpdate,
    );

    sentMessages.push(assistantMessage);
    saveMessages(sentMessages);

    let contentToProcess = extractTextContent(assistantMessage.content);

    let starterCode = await updateSearchReplace(contentToProcess, codeNow);

    if (starterCode === codeNow) {
      let retries = 3;
      while (retries > 0) {
        if (starterCode !== codeNow) {
          const success = await trySetCode(cSess, starterCode);
          if (success) return true;
        }

        const errorMessage = contextManager.getContext("errorLog");
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: claudeRecovery(starterCode, errorMessage),
        };

        sentMessages.push(userMessage);

        const newOnUpdate = createOnUpdateFunction(
          sentMessages,
          mutex,
          setMessages,
          cSess,
          contextManager,
        );

        assistantMessage = await sendAssistantMessage(
          aiHandler,
          sentMessages,
          newOnUpdate,
        );

        sentMessages.push(assistantMessage);
        saveMessages(sentMessages);

        contentToProcess = extractTextContent(assistantMessage.content);

        starterCode = await updateSearchReplace(contentToProcess, starterCode);
        retries--;
      }
    }

    const finalSuccess = await trySetCode(cSess, starterCode);
    return finalSuccess;
  } catch (error) {
    console.error(`Error processing message: ${error}`);
    return false;
  }
}

async function trySetCode(cSess: ICode, code: string): Promise<boolean> {
  try {
    const result = await cSess.setCode(code);
    return !!result;
  } catch (error) {
    console.error(`Failed to set code: ${error}`);
    return false;
  }
}

function createOnUpdateFunction(
  sentMessages: Message[],
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: ICode,
  contextManager: ReturnType<typeof createContextManager>,
) {
  return async (code: string) => {
    setMessages([
      ...sentMessages,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: code,
      },
    ]);

    await mutex.runExclusive(async () => {
      const lastCode = await updateSearchReplace(code, cSess.session.code);
      const success = await trySetCode(cSess, lastCode);
      contextManager.updateContext("currentDraft", success ? "" : lastCode);
    });
  };
}

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

function extractTextContent(
  content: string | Array<{ type: string; text?: string }>,
): string {
  if (typeof content === "string") {
    return content;
  }
  const textItem = content.find((item) => item.type === "text");
  return textItem?.text || "";
}
