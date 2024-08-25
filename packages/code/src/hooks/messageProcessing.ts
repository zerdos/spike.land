import { AIHandler } from "@src/AIHandler";
import { runner } from "@src/services/runner";
import { Mutex } from "async-mutex";
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
  updatedMessages: Message[],
  codeNow: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setAICode: React.Dispatch<React.SetStateAction<string>>,
  saveMessages: (newMessages: Message[]) => void,
  mutex: Mutex,
) {
  const sentMessages = [...updatedMessages];
  let preUpdates = { last: -1, lastCode: codeNow, count: 0 };

  const onUpdate = createOnUpdateFunction(sentMessages, preUpdates, mutex, setMessages);

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
    await runner(codeNow);
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
  if (starterCode !== codeNow) {
    runner(starterCode);
  } else {
    await aiHandler.continueWithOpenAI(
      contentToProcess,
      codeNow,
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
            await runner(lastCode);
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

export function handleError(updatedMessages: Message[], saveMessages: (newMessages: Message[]) => void) {
  updatedMessages.push({
    id: Date.now().toString(),
    role: "assistant",
    content: "Sorry, there was an error processing your request.",
  });
  saveMessages(updatedMessages);
}
