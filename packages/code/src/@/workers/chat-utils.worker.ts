import { messagesPush, replaceFirstCodeMod } from "@/lib/chat-utils";
import type { HandleSendMessageProps, ImageData, Message, MessageContent } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { wait } from "@/lib/wait";
import { Mutex } from "async-mutex";
import { v4 as uuidv4 } from "uuid";
import { AIHandler } from "../../AIHandler";

const SEARCH_ARROWS = "<<<<<<<";
const SEARCH = "<<<<<<< SEARCH";
const REPLACE_ARROWS = ">>>>>>>";
const REPLACE = ">>>>>>> REPLACE";

interface DebugInfo {
  logs: Array<string | Message>;
  addLog: (message: string | Message, data?: Record<string, unknown>) => void;
}

const debugInfo: DebugInfo = {
  logs: [],
  addLog: (message: string | Message, data?: Record<string, unknown>) => {
    if (typeof message === "string") {
      const logEntry = data
        ? `${message} - ${JSON.stringify(data)}`
        : message;
      debugInfo.logs.push(logEntry);
    } else {
      debugInfo.logs.push(message);
    }
  },
};
Object.assign(globalThis, { debugInfo });
const broadcastChannelsByCodeSpace: Record<string, BroadcastChannel> = {};

interface Mod {
  controller: AbortController;
  lastCode: string;
  lastError: string;
  instructions: string;
  actions: Action[];
  errors: string[];
}

interface Action {
  TRIED: number;
  SKIP: number;
  DIFFs: number;
  chars: number;
  type: string;
  lastCode?: string;
  startPos: number;
  chunkLength: number;
  chunk: string;
  lastSuccessCut: number;
  hash: string;
}

export class ChatHandler {
  private mod: Mod;
  private mutex = new Mutex();
  public BC: BroadcastChannel;
  private lastCode: string;
  public messages: Message[];
  private codeSpace: string;
  private code: string;
  private aiHandler: AIHandler;
  private setIsStreaming: (isStreaming: boolean) => void;
  private setMessages: (messages: Message[]) => void;

  constructor({
    messages,
    codeSpace,
    code,
  }: {
    messages: Message[];
    codeSpace: string;
    code: string;
  }) {
    debugInfo.addLog("Initializing ChatHandler", {
      codeSpace,
      messagesCount: messages.length,
    });

    this.mod = {
      controller: new AbortController(),
      lastCode: code,
      lastError: "",
      errors: [],
      instructions: "",
      actions: [],
    };

    this.codeSpace = codeSpace;
    this.code = code;
    this.messages = messages;

    this.BC = broadcastChannelsByCodeSpace[codeSpace] ||
      new BroadcastChannel(`${codeSpace}-chat`);
    broadcastChannelsByCodeSpace[codeSpace] = this.BC;
    this.lastCode = code;

    this.setIsStreaming = (isStreaming: boolean) => {
      this.BC.postMessage({ isStreaming });
      self.postMessage({ isStreaming });
    };
    this.setMessages = (newMessages: Message[]) => {
      this.messages = [...newMessages];
      const messageUpdate = { messages: this.messages };
      this.BC.postMessage(messageUpdate);
      self.postMessage(messageUpdate);
    };

    this.aiHandler = new AIHandler(this.setIsStreaming);
  }

  // In the handleMessage method of ChatHandler class:
  async handleMessage({ prompt, images }: { prompt: string; images: ImageData[] }): Promise<void> {
    debugInfo.addLog("Starting handleMessage", {
      promptLength: prompt.length,
      imagesCount: images.length,
    });

    this.mod.instructions = "";

    if (!prompt.trim()) {
      debugInfo.addLog("Empty prompt received, returning");
      return;
    }

    try {
      try {
        const claudeContent = await this.aiHandler.prepareClaudeContent(
          prompt,
          this.messages,
          this.code,
          this.codeSpace,
        );

        const newUserMessage = await ChatHandler.createNewMessage(
          images,
          claudeContent,
        );

        const newMessages = messagesPush(this.messages, {
          id: uuidv4(),
          role: "user",
          content: newUserMessage.content,
        });

        const currentMessages = messagesPush(newMessages, {
          id: uuidv4(),
          role: "assistant",
          content: "",
        });

        this.setMessages(currentMessages);
        await this.processMessage();
      } catch (error) {
        debugInfo.addLog("Test error in AIHandler");
        debugInfo.addLog("Fatal error in handleSendMessage: " + (error instanceof Error ? error.message : String(error)));
        // Add return to exit the function and prevent further execution
        return;
      }
    } catch (error) {
      debugInfo.addLog("Test error in AIHandler");
      debugInfo.addLog("Fatal error in handleSendMessage: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      const finalState = {
        isStreaming: false,
        messages: this.messages,
        debugInfo: [...debugInfo.logs],
      };
      this.BC.postMessage(finalState);
      self.postMessage(finalState);
    }
  }

  
  private onUpdate(chunk: string): void {
    const updateObj = { chunk };
    this.BC.postMessage(updateObj);
    self.postMessage(updateObj);
    this.messages[this.messages.length - 1].content += chunk;
    this.mod.instructions += chunk;

    this.updateCode();
  }

  private getLastActionInfo(): { startPos: number; DIFFs: number; SKIP: number; TRIED: number; } {
    const lastAction = this.mod.actions[this.mod.actions.length - 1];
    return {
      startPos: lastAction?.lastSuccessCut || 0,
      DIFFs: lastAction?.DIFFs || 0,
      SKIP: lastAction?.SKIP || 0,
      TRIED: lastAction?.TRIED || 0,
    };
  }

  static async createNewMessage(
    images: ImageData[],
    claudeContent: string,
  ): Promise<Message> {
    const imagesContent = images.map((image) => ({
      type: "image_url" as const,
      image_url: { url: image.url }
    }));

    const content: MessageContent = imagesContent.length > 0
      ? [...imagesContent, { type: "text" as const, text: claudeContent.trim() || "" }]
      : claudeContent;

    return {
      id: uuidv4(),
      role: "user",
      content,
    };
  }

  private async processMessage(): Promise<boolean> {
    const maxRetries = 3;
    let retries = 0;

    this.mod.lastCode = this.code;
    debugInfo.addLog("Starting processMessage", { maxRetries });

    this.BC.postMessage({ isStreaming: true });
    self.postMessage({ isStreaming: true });

    try {
      while (retries < maxRetries) {
        if (this.mod.lastError || this.mod.errors.length > 0) {
          debugInfo.addLog("Processing error encountered", {
            lastError: this.mod.lastError,
            errors: this.mod.errors,
          });

          const errorMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: `I'm sorry, I might have made a mistake. Can you please try again?
error:
\`\`\`error
${this.mod.lastError}
${this.mod.errors.join("\n")}
\`\`\`

last code after applying your instructions: 
          
\`\`\`typescript
${this.mod.lastCode}
\`\`\`
          `,
          };

          const currentMessages = [...this.messages];
          const updatedMessages = messagesPush(currentMessages, errorMessage);
          this.setMessages(updatedMessages);

          this.mod.lastError = "";
          this.mod.errors = [];
          this.mod.instructions = "";
        }

        this.mod.actions = [];

        const assistantMessage = await this.sendAssistantMessage(
          this.onUpdate.bind(this),
        );

        const newMessages = messagesPush(this.messages, assistantMessage);
        this.setMessages(newMessages);

        await this.updateCode();

        if (typeof this.mod.lastCode !== "string") {
          const error = `Invalid mod.lastCode type: ${typeof this.mod.lastCode}`;
          debugInfo.addLog(error);
          console.error(error);
          this.mod.lastCode = this.code;
        }

        if (
          this.mod.lastCode !== this.code && !this.mod.lastError &&
          this.mod.errors.length === 0
        ) {
          debugInfo.addLog("Message processed successfully");
          return true;
        }

        retries++;
        debugInfo.addLog("Retrying message processing", { attempt: retries });
      }

      debugInfo.addLog("Failed to process message after max retries");
      console.log("Failed to process message after max retries");
      return false;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      debugInfo.addLog("Error in processMessage", { error: errorMsg });
      console.error("Error in processMessage:", error);
      return false;
    }
  }

  private updateModActions({
    result,
    len,
    startPos,
    DIFFs,
    SKIP,
    TRIED,
    chunk,
    instructions,
  }: {
    result: string;
    len: number;
    startPos: number;
    DIFFs: number;
    SKIP: number;
    TRIED: number;
    chunk: string;
    instructions: string;
  }): void {
    if (this.mod.lastCode === result) {
      this.mod.actions.push({
        TRIED: TRIED + 1,
        SKIP: SKIP + 1,
        DIFFs,
        chars: instructions.length,
        type: "skip",
        startPos,
        chunkLength: chunk.length,
        chunk,
        lastSuccessCut: startPos,
        hash: md5(this.mod.lastCode),
      });
    } else {
      this.mod.lastCode = result;
      this.mod.actions.push({
        TRIED: TRIED + 1,
        SKIP,
        DIFFs: DIFFs + 1,
        chars: instructions.length,
        type: "updated",
        startPos,
        chunkLength: len,
        chunk: chunk.slice(0, len),
        lastSuccessCut: len + startPos,
        hash: md5(this.mod.lastCode),
      });
    }
  }

  private async updateCode(): Promise<void> {
    this.mod.controller.abort();
    this.mod.controller = new AbortController();
    const { signal } = this.mod.controller;

    return this.mutex.runExclusive(async () => {
      if (signal.aborted) {
        debugInfo.addLog("Aborted onUpdate before starting");
        console.log("Aborted onUpdate before starting");
        return;
      }

      try {
        let iterationCount = 0;
        const maxIterations = 20;

        while (iterationCount < maxIterations) {
          if (signal.aborted) {
            debugInfo.addLog("Aborted onUpdate before updating");
            console.log("Aborted onUpdate before updating");
            return;
          }

          iterationCount++;
          const { startPos, DIFFs, SKIP, TRIED } = this.getLastActionInfo();

          const instructions = this.mod.instructions;
          const chunk = instructions.slice(startPos);

          if (chunk.length === 0) break;

          const { result, len, error } = await ChatHandler.updateSearchReplace({
            instructions: chunk,
            code: this.mod.lastCode,
          });

          if (error) {
            debugInfo.addLog("Error in updateSearchReplace", { error });
            this.mod.errors.push(error);
          }

          this.updateModActions({
            result,
            len,
            startPos,
            DIFFs,
            SKIP,
            TRIED,
            chunk,
            instructions,
          });

          if (this.mod.lastCode !== this.lastCode) {
            this.lastCode = this.mod.lastCode;

            try {
              const formatted = await (globalThis as unknown as {
                prettierJs: ({ code, toThrow }: { code: string; toThrow: boolean; }) => Promise<string>;
              }).prettierJs({ code: this.mod.lastCode, toThrow: true });

              const transpiled = await (globalThis as unknown as {
                transpile: ({ code, originToUse }: { code: string; originToUse: string; }) => Promise<string>;
              }).transpile({ code: formatted, originToUse: location.origin });

              this.mod.lastError = "";
              const update = { code: formatted, transpiled };
              this.BC.postMessage(update);
              self.postMessage(update);
              debugInfo.addLog("Code successfully formatted and transpiled");
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              debugInfo.addLog("Error in code formatting/transpilation", { error: errorMsg });
              if (error instanceof Error) {
                this.mod.lastError = error.message;
              } else {
                this.mod.lastError = JSON.stringify(error);
              }
              console.error("Error in updateCode:", error);
            } finally {
              await wait(200);
            }
          }

          if (iterationCount >= maxIterations) {
            debugInfo.addLog("Reached maximum iterations, forcing finish", { iterationCount });
            console.warn("Reached maximum iterations, forcing finish");
            break;
          }
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        debugInfo.addLog("Error in updateCode", { error: errorMsg });
        console.error("Error in updateCode:", error);
      }
    });
  }

  private async sendAssistantMessage(
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    try {
      debugInfo.addLog("Sending assistant message");
      const lastMessage = this.messages[this.messages.length - 1];
      const oldMessages = this.messages.slice(0, -1);

      let assistantMessage = await this.aiHandler.sendToAnthropic(
        lastMessage.role === "assistant" ? oldMessages : this.messages,
        onUpdate,
      );

      if (typeof assistantMessage === "string") {
        assistantMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content: assistantMessage,
        };
        return assistantMessage;
      }

      if (
        typeof assistantMessage.content !== "string" &&
        !Array.isArray(assistantMessage.content)
      ) {
        const error = "Invalid assistant message content type";
        debugInfo.addLog(error);
        throw new Error(error);
      }

      const contentToProcess = this.extractTextContent(assistantMessage.content);

      if (contentToProcess.includes("An error occurred while processing")) {
        debugInfo.addLog("Falling back to GPT-4");
        console.log("Falling back to GPT-4");
        assistantMessage = await this.aiHandler.sendToGpt4o(this.messages, onUpdate);
      }

      return assistantMessage;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      debugInfo.addLog("Error in handleMessage", { error: errorMsg });
      console.error("Error in handleMessage:", error);
      throw error;
    }
  }

  private extractTextContent(
    content: string | Array<{ type: string; text?: string; }>,
  ): string {
    if (typeof content === "string") return content;
    const textItem = content.find((item) => item.type === "text");
    return textItem?.text || "";
  }

  static async updateSearchReplace({
    instructions,
    code,
  }: {
    instructions: string;
    code: string;
  }): Promise<{ result: string; len: number; error: string; }> {
    if (instructions.length === 0) return { result: code, len: 0, error: "" };
    instructions = instructions.split(SEARCH).join(SEARCH_ARROWS).split(SEARCH_ARROWS).join(SEARCH)
      .split(REPLACE).join(REPLACE_ARROWS).split(REPLACE_ARROWS).join(REPLACE);

    const searchIndex = instructions.indexOf(SEARCH);
    const replaceIndex = instructions.indexOf(REPLACE);

    if (searchIndex !== -1 && replaceIndex === -1) {
      const rAll = replaceFirstCodeMod(instructions, code);
      if (rAll !== code) {
        const rAllWithExtra = replaceFirstCodeMod(instructions + "\nfoo doo baf   ", code);
        if (rAll !== rAllWithExtra) {
          return { result: rAll, len: instructions.length, error: "" };
        }
      }
      return {
        result: code,
        len: 0,
        error: "",
      };
    }

    if (replaceIndex !== -1) {
      const trimmedInstructions = instructions.slice(0, replaceIndex + REPLACE.length);
      const result = replaceFirstCodeMod(trimmedInstructions, code);
      if (result === code) {
        return {
          result: code,
          len: trimmedInstructions.length,
          error: `couldn't apply the search/replace blocks :( \n ${instructions}`,
        };
      }
      debugInfo.addLog("Applied search/replace blocks", { code, result, instructions });
      return {
        result: replaceFirstCodeMod(trimmedInstructions, code),
        len: trimmedInstructions.length,
        error: "",
      };
    }

    const rAll = replaceFirstCodeMod(instructions, code);
    if (rAll === code) {
      return { result: rAll, len: instructions.length, error: "" };
    }

    let jump = 1;
    while (jump < instructions.length && replaceFirstCodeMod(instructions.slice(0, jump), code) === code) {
      jump *= 2;
    }

    let low = jump / 2;
    let high = Math.min(jump, instructions.length);

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (code === replaceFirstCodeMod(instructions.slice(0, mid), code)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    const trimmedInstructions = instructions.slice(0, low);
    const result = replaceFirstCodeMod(instructions.slice(0, low), code);
    debugInfo.addLog("Applied search/replace blocks", { code, result, instructions: trimmedInstructions });
    return {
      result: replaceFirstCodeMod(instructions.slice(0, low), code),
      len: low,
      error: "",
    };
  }
}

export const createNewMessage = ChatHandler.createNewMessage;
export const updateSearchReplace = ChatHandler.updateSearchReplace;

export async function handleSendMessage({
  messages,
  codeSpace,
  prompt,
  images,
  code,
}: HandleSendMessageProps) {
  debugInfo.logs = [];
  debugInfo.addLog("Starting handleSendMessage", {
    messagesCount: messages.length,
    codeSpace,
    promptLength: prompt?.length,
    imagesCount: images?.length,
  });
  messages.forEach(msg => debugInfo.logs.push(msg));

  const chatHandler = new ChatHandler({ messages, codeSpace, code });

  try {
    await chatHandler.handleMessage({ prompt, images });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    debugInfo.addLog("Fatal error in handleSendMessage:", { error: errorMsg });
    console.error("Fatal error in handleSendMessage:", error);
  } finally {
    const finalState = {
      isStreaming: false,
      messages: chatHandler.messages,
      debugInfo: [...debugInfo.logs],
    };
    chatHandler.BC.postMessage(finalState);
    self.postMessage(finalState);
  }

  return debugInfo.logs;
}

Object.assign(globalThis, { handleSendMessage });
console.log("chat-utils.worker.ts initialization complete");
