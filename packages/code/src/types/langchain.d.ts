// Module declarations for LangChain packages to fix TypeScript import errors

declare module "@langchain/anthropic" {
  export class ChatAnthropic {
    constructor(options: {
      modelName?: string;
      temperature?: number;
      streaming?: boolean;
      [key: string]: unknown;
    });
    bindTools(tools: unknown[]): unknown;
  }
}

declare module "@langchain/core/messages" {
  export interface BaseMessage {
    content: string;
    [key: string]: unknown;
  }

  export class AIMessage implements BaseMessage {
    content: string;
    role: "assistant";
    constructor(content: string);
  }

  export class HumanMessage implements BaseMessage {
    content: string;
    constructor(content: string);
  }

  export class SystemMessage implements BaseMessage {
    content: string;
    constructor(content: string);
  }
}

declare module "@langchain/core/output_parsers" {
  export class StringOutputParser {
    parse(text: string): string;
  }
}

declare module "@langchain/core/prompts" {
  export class PromptTemplate {
    constructor(options: { template: string; inputVariables: string[]; });
    format(values: Record<string, unknown>): string;
  }
}

declare module "@langchain/core/runnables" {
  export class RunnableSequence {
    static from(steps: unknown[]): RunnableSequence;
    invoke(input: unknown): Promise<unknown>;
  }
}
