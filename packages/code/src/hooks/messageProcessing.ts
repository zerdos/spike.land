import { updateSearchReplace } from "@/lib/chat-utils";
import { createContextManager } from "@/lib/context-manager";
import { ImageData } from "@/lib/interfaces";
import { Message } from "@/lib/interfaces";
import type { AIHandler } from "@src/AIHandler";
import { claudeRevery } from "@src/config/aiConfig";
import { ICode } from "@src/cSess.interface";
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
  const sentMessages = [...updatedMessages];
  let preUpdates = { last: -1, lastCode: codeNow, count: 0 };

  const onUpdate = createOnUpdateFunction(sentMessages, preUpdates, mutex, setMessages, cSess, contextManager);

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

    updatedMessages.push(assistantMessage);
    saveMessages(updatedMessages);

    // Update context based on AI response
    contextManager.updateContext("currentTask", extractCurrentTask(contentToProcess));
    contextManager.updateContext("codeStructure", extractCodeStructure(contentToProcess));

    const starterCode = updateSearchReplace(contentToProcess, codeNow);

    if (starterCode !== codeNow) {
      const success = await trySetCode(cSess, starterCode);
      if (success) return true;

      // If setting the code fails, try again with a new message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: claudeRevery(starterCode),
      };
      const newMessages = [...updatedMessages, userMessage];
      const newOnUpdate = createOnUpdateFunction(newMessages, preUpdates, mutex, setMessages, cSess, contextManager);

      assistantMessage = await aiHandler.sendToAnthropic(newMessages, newOnUpdate);

      if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
        throw new Error("Invalid assistant message content type in retry");
      }

      const newContentToProcess = extractTextContent(assistantMessage.content);

      if (newContentToProcess.includes("An error occurred while processing")) {
        await cSess.setCode(codeNow);
        assistantMessage = await aiHandler.sendToGpt4o(newMessages, newOnUpdate);
      }

      updatedMessages.push(assistantMessage);
      saveMessages(updatedMessages);

      // Update context based on new AI response
      contextManager.updateContext("currentTask", extractCurrentTask(newContentToProcess));
      contextManager.updateContext("codeStructure", extractCodeStructure(newContentToProcess));

      const secondGuess = updateSearchReplace(newContentToProcess, codeNow);

      const secondSuccess = await trySetCode(cSess, secondGuess);
      if (secondSuccess) return true;

      throw new Error("Failed to set code after multiple attempts");
    }

    return true;
  } catch (error) {
    console.error("Error in processMessage:", error);
    return false;
  }
}

async function trySetCode(cSess: ICode, code: string): Promise<boolean> {
  try {
    const result = await cSess.setCode(code);
    return !!result;
  } catch (error) {
    console.error("Error setting code:", error);
    return false;
  }
}

function createOnUpdateFunction(
  sentMessages: Message[],
  preUpdates: { last: number; lastCode: string; count: number },
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: ICode,
  contextManager: ReturnType<typeof createContextManager>,
) {
  return async (code: string) => {
    await mutex.runExclusive(async () => {
      const lastChunk = code.slice(preUpdates.last + 1);
      if (lastChunk.includes(">>>>>>> REPLACE")) {
        const nextStr = code.slice(preUpdates.last + 1);
        preUpdates.last = lastChunk.indexOf(">>>>>>> REPLACE") + preUpdates.last + 17;
        const lastCode = updateSearchReplace(nextStr, preUpdates.lastCode);

        if (lastCode !== preUpdates.lastCode) {
          preUpdates.lastCode = lastCode;
          preUpdates.count += 1;
          try {
            await trySetCode(cSess, lastCode);
            // Update context with new code structure
            contextManager.updateContext("codeStructure", extractCodeStructure(lastCode));
          } catch (error) {
            console.error("Error in runner:", error);
          }
        }
      }

      setMessages([...sentMessages, {
        id: Date.now().toString(),
        role: "assistant",
        content: code,
      }]);
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
