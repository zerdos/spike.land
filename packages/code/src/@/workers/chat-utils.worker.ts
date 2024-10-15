import { messagesPush, replaceFirstCodeMod as up } from "@/lib/chat-utils";
import type { HandleSendMessageProps, ImageData, Message, MessageContent } from "@/lib/interfaces";

import { md5 } from "@/lib/md5";
import { Mutex } from "async-mutex";

import { AIHandler } from "../../AIHandler";

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";

const broadcastChannelsByCodeSpace: Record<string, BroadcastChannel> = {};

interface Mod {
  controller: AbortController;
  lastCode: string;
  lastError: string;
  instructions: string;
  actions: Action[];
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

class ChatHandler {
  private mod: Mod;
  private mutex = new Mutex();
  private BC: BroadcastChannel;
  private lastCode: string;
  private messages: Message[];
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
    this.mod = {
      controller: new AbortController(),
      lastCode: code,
      lastError: "",
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

    this.setIsStreaming = (isStreaming: boolean) => this.BC.postMessage({ isStreaming });
    this.setMessages = (_messages: Message[]) => {
      const md5Messages = md5(JSON.stringify(_messages));
      if (md5Messages !== md5(JSON.stringify(this.messages))) {
        this.messages = _messages;
        this.BC.postMessage({ messages: this.messages });
      }
    };

    this.aiHandler = new AIHandler(this.setIsStreaming, codeSpace);
  }

  async handleMessage({
    prompt,
    images,
  }: {
    prompt: string;
    images: ImageData[];
  }) {
    this.BC.postMessage({ isStreaming: true });
    this.mod.instructions = "";

    // this.BC.onmessage = (event) => {

    //   if (event.data.chunk) {
    //     this.mod.instructions += event.data.chunk;
    //     this.updateCode();
    //   }
    // }

    try {
      if (!prompt.trim()) return;

      const claudeContent = this.aiHandler.prepareClaudeContent(
        prompt,
        this.messages,
        this.code,
        this.codeSpace,
      );
      const newUserMessage = await ChatHandler.createNewMessage(
        images,
        claudeContent,
      );
      this.setMessages(messagesPush(this.messages, newUserMessage));
      this.processMessage();
    } catch (e) {
      console.error("Error in handleMessage:", e);
    } finally {
      this.BC.postMessage({ isStreaming: false });
    }
  }

  static async createNewMessage(
    images: ImageData[],
    claudeContent: string,
  ): Promise<Message> {
    const imagesContent: MessageContent = images.map((image) => ({
      type: "image_url",
      image_url: { url: image.url },
    }));

    if (imagesContent.length > 0) {
      imagesContent.push({
        type: "text",
        text: claudeContent.trim() || "",
      });
    }

    return {
      id: Date.now().toString(),
      role: "user",
      content: imagesContent.length > 0 ? imagesContent : claudeContent,
    };
  }

  private async processMessage(): Promise<boolean> {
    const maxRetries = 3;
    let retries = 0;

    this.mod.lastCode = this.code;

    while (retries < maxRetries) {
      if (this.mod.lastError) {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: `I'm sorry, I might have made a mistake. Can you please try again?
error:
\`\`\`error
${this.mod.lastError}
\`\`\`

last code after applying your instructions: 
          
\`\`\`typescript
${this.mod.lastCode}
\`\`\`
          `,
        };
        this.setMessages(messagesPush(this.messages, userMessage));
        this.mod.lastError = "";
        this.mod.instructions = "";
      }
      try {
        this.mod.actions = [];

        const assistantMessage = await this.sendAssistantMessage(
          (chunk: string) => this.onUpdate(chunk),
        );

        this.setMessages(messagesPush(this.messages, assistantMessage));

        await this.updateCode();

        if (typeof this.mod.lastCode !== "string") {
          console.error("Invalid mod.lastCode type:", typeof this.mod.lastCode);
          this.mod.lastCode = this.code;
        }

        if (this.mod.lastCode !== this.code && !this.mod.lastError) {
          return true;
        }

        retries++;
      } catch (error) {
        console.error(
          `Error processing message (attempt ${retries + 1}):`,
          error,
        );
        retries++;
      }
    }

    console.log("Failed to process message after max retries");
    return false;
  }

  private async updateCode() {
    this.mod.controller.abort();
    this.mod.controller = new AbortController();
    const { signal } = this.mod.controller;

    return this.mutex.runExclusive(async () => {
      if (signal.aborted) {
        console.log("Aborted onUpdate before starting");
        return;
      }

      try {
        let iterationCount = 0;
        const maxIterations = 20;

        while (iterationCount < maxIterations) {
          if (signal.aborted) {
            console.log("Aborted onUpdate before updating");
            return;
          }

          iterationCount++;
          const { startPos, DIFFs, SKIP, TRIED } = this.getLastActionInfo();

          const instructions = this.mod.instructions;

          const chunk = instructions.slice(startPos);

          if (chunk.length === 0) break;

          const { result, len } = await ChatHandler.updateSearchReplace({
            instructions: chunk,
            code: this.mod.lastCode,
          });

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
                prettierJs: ({ code, toThrow }: {
                  code: string;
                  toThrow: boolean;
                }) => Promise<string>;
              }).prettierJs({ code: this.mod.lastCode, toThrow: true });

              const transpiled = await (globalThis as unknown as {
                transpile: ({ code, originToUse }: {
                  code: string;
                  originToUse: string;
                }) => Promise<string>;
              }).transpile({ code: formatted, originToUse: location.origin });

              this.BC.postMessage({ code: formatted, transpiled });
            } catch (error) {
              if (error instanceof Error) {
                this.mod.lastError = error.message;
              } else {
                this.mod.lastError = JSON.stringify(error);
              }
              console.error("Error in updateCode:", error);
            }

            if (iterationCount >= maxIterations) {
              console.warn("Reached maximum iterations, forcing finish");
              break;
            }
          }

          console.log("Finished iteration", iterationCount);
          console.log("current code", this.mod.lastCode);
        }
      } catch (error) {
        console.error("Error in updateCode:", error);
      }
    });
  }

  private onUpdate(chunk: string) {
    this.BC.postMessage({ chunk });
    this.mod.instructions += chunk;
    this.updateCode();
  }

  private getLastActionInfo() {
    const lastAction = this.mod.actions[this.mod.actions.length - 1];
    return {
      startPos: lastAction?.lastSuccessCut || 0,
      DIFFs: lastAction?.DIFFs || 0,
      SKIP: lastAction?.SKIP || 0,
      TRIED: lastAction?.TRIED || 0,
    };
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
  }) {
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

  private async sendAssistantMessage(
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    try {
      let assistantMessage = await this.aiHandler.sendToAnthropic(
        this.messages,
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
        throw new Error("Invalid assistant message content type");
      }

      const contentToProcess = this.extractTextContent(
        assistantMessage.content,
      );

      if (
        contentToProcess.includes("An error occurred while processing")
      ) {
        console.log("Falling back to GPT-4");
        assistantMessage = await this.aiHandler.sendToGpt4o(
          this.messages,
          onUpdate,
        );
      }

      return assistantMessage;
    } catch (error) {
      console.error("Error in sendAssistantMessage:", error);
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
  }): Promise<{ result: string; len: number; }> {
    if (instructions.length === 0) return { result: code, len: 0 };

    const searchIndex = instructions.indexOf(SEARCH);
    const replaceIndex = instructions.indexOf(REPLACE);

    if (searchIndex !== -1 && replaceIndex === -1) {
      const rAll = up(instructions, code);
      if (rAll !== code) {
        const rAllWithExtra = up(instructions + "\nfoo doo baf   ", code);
        if (rAll !== rAllWithExtra) {
          return { result: rAll, len: instructions.length };
        }
      }
      return { result: code, len: 0 };
    }

    if (replaceIndex !== -1) {
      const trimmedInstructions = instructions.slice(
        0,
        replaceIndex + REPLACE.length,
      );
      return {
        result: up(trimmedInstructions, code),
        len: trimmedInstructions.length,
      };
    }

    const rAll = up(instructions, code);
    if (rAll === code) return { result: rAll, len: instructions.length };

    let jump = 1;
    while (
      jump < instructions.length &&
      up(instructions.slice(0, jump), code) === code
    ) {
      jump *= 2;
    }

    let low = jump / 2;
    let high = Math.min(jump, instructions.length);

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (code === up(instructions.slice(0, mid), code)) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return { result: up(instructions.slice(0, low), code), len: low };
  }
}

export const createNewMessage = ChatHandler.createNewMessage;

export const updateSearchReplace = ChatHandler.updateSearchReplace;

export async function handleSendMessage({
  messages = [],
  codeSpace,
  prompt,
  images,
  code,
}: HandleSendMessageProps) {
  const chatHandler = new ChatHandler({ messages, codeSpace, code });
  await chatHandler.handleMessage({ prompt, images });
}

Object.assign(globalThis, { handleSendMessage });
console.log("chat-utils.worker.ts initialization complete");
