import { updateSearchReplace } from "@/lib/chat-utils";
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
  const content: any[] = [];

  if (images && images.length > 0) {
    images.forEach((image) => {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: image.type,
          data: image.data.split(",")[1], // Remove the "data:image/jpeg;base64," prefix
        },
      });
    });
  }

  content.push({ type: "text", text: claudeContent?.trim() || "" });

  return {
    id: Date.now().toString(),
    role: "user",
    content,
  };
}

function extractTextContent(content: string | Array<{ type: string; text?: string }>): string {
  if (typeof content === "string") {
    return content;
  }
  const textItem = content.find(item => item.type === "text");
  return textItem?.text || "";
}

async function retryWithGpt4(
  aiHandler: AIHandler,
  updatedMessages: Message[],
  onUpdate: (code: string) => Promise<void>,
): Promise<Message> {
  return await aiHandler.sendToGpt4o(updatedMessages, onUpdate);
}

export async function processMessage(
  aiHandler: AIHandler,
  cSess: ICode,
  updatedMessages: Message[],
  codeNow: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  saveMessages: (newMessages: Message[]) => void,
  mutex: Mutex,
): Promise<boolean> {
  const sentMessages = [...updatedMessages];
  let preUpdates = { last: -1, lastCode: codeNow, count: 0 };

  const onUpdate = createOnUpdateFunction(sentMessages, preUpdates, mutex, setMessages, cSess);

  try {
    let assistantMessage = await aiHandler.sendToAnthropic(updatedMessages, onUpdate);

    if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
      throw new Error("Invalid assistant message content type");
    }

    const contentToProcess = extractTextContent(assistantMessage.content);

    if (contentToProcess.includes("An error occurred while processing")) {
      await cSess.setCode(codeNow);
      assistantMessage = await retryWithGpt4(aiHandler, updatedMessages, onUpdate);
    }

    updatedMessages.push(assistantMessage);
    saveMessages(updatedMessages);

    const starterCode = updateSearchReplace(contentToProcess, codeNow);

    if (starterCode !== codeNow) {
      const success = await trySetCode(cSess, starterCode);
      if (success) return true;

      // If setting the code fails, try again with a new message
      const userMessage = await createNewMessage([], claudeRevery(starterCode));
      const newMessages = [...updatedMessages, userMessage];
      const newOnUpdate = createOnUpdateFunction(newMessages, preUpdates, mutex, setMessages, cSess);

      assistantMessage = await aiHandler.sendToAnthropic(newMessages, newOnUpdate);

      if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
        throw new Error("Invalid assistant message content type in retry");
      }

      const newContentToProcess = extractTextContent(assistantMessage.content);

      if (newContentToProcess.includes("An error occurred while processing")) {
        await cSess.setCode(codeNow);
        assistantMessage = await retryWithGpt4(aiHandler, newMessages, newOnUpdate);
      }

      updatedMessages.push(assistantMessage);
      saveMessages(updatedMessages);

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
  preUpdates: any,
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: ICode,
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

export function handleError(updatedMessages: Message[], setMessages: (newMessages: Message[]) => void) {
  updatedMessages.push({
    id: Date.now().toString(),
    role: "assistant",
    content: "Sorry, there was an error processing your request. Please try again or rephrase your input.",
  });
  setMessages(updatedMessages);
}
