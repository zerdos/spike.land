import debounce from "lodash/debounce";
import { Message } from "./types/Message";
import { anthropic, gptSystem, reminder } from "./config/aiConfig";
import { prettierToThrow } from "./utils/codeFormatter";
import { AIService } from "./services/AIService";
import { LocalStorageService } from "./services/LocalStorageService";

const codeSpace = location.pathname.slice(1).split("/")[1];

const localStorageService = new LocalStorageService(codeSpace);
const aiService = new AIService(localStorageService);

export const sendToAnthropic = async (messages: Message[]): Promise<Message> => {
  return aiService.sendToAnthropic(messages);
};

export const continueWithOpenAI = async (
  fullResponse: string,
  codeNow: string,
  nextCounter: number,
  onCodeUpdate: (code: string) => void,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setAICode: (code: string) => void,
  isRetry = false,
): Promise<string | void> => {
  return aiService.continueWithOpenAI(
    fullResponse,
    codeNow,
    nextCounter,
    onCodeUpdate,
    setMessages,
    setAICode,
    isRetry
  );
};

export const prepareClaudeContent = (
  content: string,
  messages: Message[],
  codeNow: string,
  codeSpace: string,
): string => {
  return aiService.prepareClaudeContent(content, messages, codeNow, codeSpace);
};
