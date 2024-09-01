import type { AIHandler } from "@src/AIHandler";
import { ICode } from "@src/cSess.interface";
import type { Mutex } from "async-mutex";
import { Message } from "../types/Message";
import { updateSearchReplace } from "../utils/chatUtils";

export async function createNewMessage(
  screenshot: string,
  claudeContent: string,
): Promise<Message> {
  if (screenshot) {
    return {
      id: Date.now().toString(),
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: screenshot.slice(23),
          },
        },
        { type: "text", text: claudeContent?.trim() || "" },
      ],
    };
  }
  return {
    id: Date.now().toString(),
    role: "user",
    content: claudeContent?.trim() || "",
  };
}

export async function processMessage(
  aiHandler: AIHandler,
  cSess: ICode,
  updatedMessages: Message[],
  codeNow: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setAICode: React.Dispatch<React.SetStateAction<string>>,
  saveMessages: (newMessages: Message[]) => void,
  mutex: Mutex,
) {
  const sentMessages = [...updatedMessages];
  let preUpdates = { last: -1, lastCode: codeNow, count: 0 };

  const onUpdate = createOnUpdateFunction(sentMessages, preUpdates, mutex, setMessages, cSess);

  let assistantMessage = await aiHandler.sendToAnthropic(
    updatedMessages,
    onUpdate,
  );

  if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
    throw new Error("Invalid assistant message content");
  }

  if (
    typeof assistantMessage.content === "string"
    && assistantMessage.content.includes("An error occurred while processing")
  ) {
    await cSess.setCode(codeNow);
    assistantMessage = await aiHandler.sendToGpt4o(
      updatedMessages,
      onUpdate,
    );
  }

  updatedMessages.push(assistantMessage);
  saveMessages(updatedMessages);

  const contentToProcess = Array.isArray(assistantMessage.content)
    ? assistantMessage.content.find(item => item.type === "text")?.text || ""
    : assistantMessage.content;

  const starterCode = updateSearchReplace(contentToProcess, codeNow);

  let success = false;
  try {
    if (starterCode !== codeNow) {
      success = !!await cSess.setCode(starterCode);
      if (!success) {
        await aiHandler.continueWithOpenAI(
          `Please try to fix it.`,
          starterCode,
          setMessages,
          setAICode,
        );
      }
    }
  } catch (error) {
    await aiHandler.continueWithOpenAI(
      `Please try to fix it.`,
      starterCode,
      setMessages,
      setAICode,
    );
  }
}

function createOnUpdateFunction(
  sentMessages: Message[],
  preUpdates: any,
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  cSess: any, // Add cSess as a parameter
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
            await cSess.setCode(lastCode);
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
    content: "Sorry, there was an error processing your request.",
  });
  setMessages(updatedMessages);
}
