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
        "type": "image_url",
        "image_url": {
          "url": image.url,
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

// async function retryWithGpt4(
//   aiHandler: AIHandler,
//   updatedMessages: Message[],
//   onUpdate: (code: string) => Promise<void>,
// ): Promise<Message> {
//   return await aiHandler.sendToGpt4o(updatedMessages, onUpdate);
// }

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

  const onUpdate = createOnUpdateFunction(sentMessages, mutex, setMessages, cSess, contextManager);

  try {
    let assistantMessage = await aiHandler.sendToAnthropic(updatedMessages, onUpdate);

    if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
      throw new Error("Invalid assistant message content type");
    }

    const contentToProcess = extractTextContent(assistantMessage.content);

    if (contentToProcess.includes("An error occurred while processing")) {
      await cSess.setCode(codeNow);
      assistantMessage = await aiHandler.sendToGpt4o(updatedMessages, onUpdate);
    }

    sentMessages.push(assistantMessage);
    saveMessages(sentMessages);

    // contextManager.updateContext("currentTask", extractCurrentTask(contentToProcess));
    // contextManager.updateContext("codeStructure", extractCodeStructure(contentToProcess));

    let starterCode = await updateSearchReplace(contentToProcess, codeNow);

    if (starterCode !== codeNow) {
      let retries = 3;
      while (retries > 0) {
        const success = await trySetCode(cSess, starterCode);
        if (success) return true;

        const errorMessage = contextManager.getContext("errorLog");
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: claudeRecovery(starterCode, errorMessage),
        };

        sentMessages.push(userMessage);
        const newOnUpdate = createOnUpdateFunction(sentMessages, mutex, setMessages, cSess, contextManager);

        assistantMessage = await aiHandler.sendToAnthropic(sentMessages, newOnUpdate);

        if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
          throw new Error("Invalid assistant message content in retry");
        }

        const newContentToProcess = extractTextContent(assistantMessage.content);

        if (newContentToProcess.includes("An error occurred while processing")) {
          await cSess.setCode(codeNow);
          assistantMessage = await aiHandler.sendToGpt4o(sentMessages, newOnUpdate);
        }

        sentMessages.push(assistantMessage);
        saveMessages(sentMessages);

        contextManager.updateContext("currentTask", extractCurrentTask(newContentToProcess));
        contextManager.updateContext("codeStructure", extractCodeStructure(newContentToProcess));

        starterCode = await updateSearchReplace(newContentToProcess, starterCode);
        retries--;
      }
    }

    try {
      const finalSuccess = await trySetCode(cSess, starterCode);
      if (finalSuccess) return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      contextManager.updateContext("errorLog", errorMessage);
      throw new Error(`Failed to set code after multiple attempts. Last error: ${errorMessage}`);
    }
  } catch (error) {
    return false;
  }
  return false;
}

async function trySetCode(cSess: ICode, code: string): Promise<boolean> {
  const result = await cSess.setCode(code);
  if (!result) {
    throw new Error("Failed to set code");
  }
  return true;
}

function createOnUpdateFunction(
  sentMessages: Message[],
  // preUpdates: { last: number; lastCode: string; count: number },
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: ICode,
  contextManager: ReturnType<typeof createContextManager>,
) {
  let controller = new AbortController();

  return async (code: string) => {
    controller.abort();
    controller = new AbortController();
    const { signal } = controller;

    setMessages([...sentMessages, {
      id: Date.now().toString(),
      role: "assistant",
      content: code,
    }]);

    await mutex.runExclusive(async () => {
      if (signal.aborted) return;
      const lastCode = await updateSearchReplace(code, cSess.session.code);

      if (signal.aborted) return;
      const success = await trySetCode(cSess, lastCode);
      contextManager.updateContext("currentDraft", success ? "" : lastCode);
    });
  };
}

function extractCurrentTask(aiResponse: string): string {
  const taskMatch = aiResponse.match(/Current task: (.*)/);
  return taskMatch ? taskMatch[1] : "";
}

function extractCodeStructure(code: string): string {
  const lines = code.split("\n");
  const structure = lines.filter(line => line.trim().startsWith("function") || line.trim().startsWith("class")).join(
    "\n",
  );
  return structure || "No clear structure detected";
}

function extractTextContent(content: string | Array<{ type: string; text?: string }>): string {
  if (typeof content === "string") {
    return content;
  }
  const textItem = content.find(item => item.type === "text");
  return textItem?.text || "";
}
