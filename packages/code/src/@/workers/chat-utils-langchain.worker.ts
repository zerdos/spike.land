import { replaceFirstCodeMod } from "@/lib/chat-utils";
import { ChatAnthropic } from "@langchain/anthropic";
import type { BaseMessage } from "@langchain/core/messages";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import type { StateGraphArgs } from "@langchain/langgraph";
import { StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Global type declarations
declare global {
  interface Window {
    currentFile?: {
      content: string;
      path: string;
    };
  }
  var currentFile: Window['currentFile'];
}

// Types
interface AgentState {
  messages: BaseMessage[];
  code: string;
  lastError: string;
  isStreaming: boolean;
  debugLogs: string[];
}

interface CodeModification {
  code: string;
  error: string;
  retryCount?: number;
  currentFileContent?: string;
  searchContent?: string;
  blockNumber?: number;
  totalBlocks?: number;
}

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";
const SEPARATOR = "=======";

// Tools
const codeModificationTool = tool(
  async (
    { instructions }: { instructions: string; },
    config?: Record<string, any>
  ): Promise<CodeModification> => {
    // Try to get content from either globalThis.currentFile or the state
    let currentCode = globalThis.currentFile?.content || (config?.state as AgentState)?.code || "";
    
    // If no current file content, return early with helpful error
    if (!currentCode) {
      return {
        code: "",
        error: "No current file content available. Make sure code is provided in the workflow state or current file.",
        currentFileContent: "",
      };
    }

    try {
      if (instructions.length === 0) {
        return {
          code: currentCode,
          error: "Instructions required - provide search/replace blocks",
          currentFileContent: currentCode
        };
      }

      const searchIndex = instructions.indexOf(SEARCH);
      const replaceIndex = instructions.indexOf(REPLACE);
      const separatorIndex = instructions.indexOf(SEPARATOR);

      if (searchIndex === -1 || replaceIndex === -1 || separatorIndex === -1) {
        return {
          code: currentCode,
          error: "Invalid format. Each block must include <<<<<<< SEARCH, =======, and >>>>>>> REPLACE",
          currentFileContent: currentCode
        };
      }

      let retryCount = 0;
      let result = currentCode;
      const maxRetries = 3;

      // Extract all search/replace blocks for error reporting
      const blocks = instructions.split(SEARCH).slice(1);
      const searchBlocks = blocks.map(block => {
        const [search] = block.split(SEPARATOR);
        return search.trim();
      });

      // For error reporting, track which block we're trying
      let currentBlockIndex = 0;
      const totalBlocks = searchBlocks.length;

      do {
        const newResult = replaceFirstCodeMod(instructions, result);
        if (newResult !== result) {
          result = newResult;
          currentBlockIndex++;
          retryCount = 0;
          
          // If we've processed all blocks successfully, we're done
          if (currentBlockIndex >= totalBlocks) {
            break;
          }
          continue;
        }
        retryCount++;

        if (retryCount === 1) {
          return {
            code: currentCode,
            error: `Block ${currentBlockIndex + 1}/${totalBlocks} not found exactly as specified. Compare your SEARCH block with current file content:`,
            retryCount,
            currentFileContent: currentCode,
            searchContent: searchBlocks[currentBlockIndex],
            blockNumber: currentBlockIndex + 1,
            totalBlocks
          };
        }
      } while (retryCount < maxRetries);

      if (result === currentCode) {
        return {
          code: currentCode,
          error: `Failed to apply block ${currentBlockIndex + 1}/${totalBlocks} after ${retryCount} attempts. Verify the search content matches exactly:`,
          retryCount,
          currentFileContent: currentCode,
          searchContent: searchBlocks[currentBlockIndex],
          blockNumber: currentBlockIndex + 1,
          totalBlocks
        };
      }

      return { code: result, error: "", retryCount };
    } catch (error) {
      return {
        code: currentCode,
        error: error instanceof Error ? error.message : "Unknown error in code modification",
        currentFileContent: currentCode
      };
    }
  },
  {
    name: "code_modification",
    description: `Modifies code by applying search/replace patterns. Uses current file content as base for modifications. Supports multiple search/replace blocks for coordinated changes.

Required format for instructions parameter (can include multiple blocks):
<<<<<<< SEARCH
[exact content to find]
=======
[new content to replace with]
>>>>>>> REPLACE

Critical rules:
1. SEARCH content must match EXACTLY (character-for-character):
   - Match all whitespace, indentation, and line endings
   - Include all relevant context (imports, full function definitions, etc.)
   - Don't truncate or modify the content you're searching for

2. Common mistakes to avoid:
   - Missing imports or context needed for the changes
   - Not including enough surrounding code for unique matches
   - Incorrect indentation or line endings
   - Partial line matches (always include complete lines)

3. When modification fails:
   - Tool indicates which block failed (e.g. "Block 2/3 failed")
   - Returns current file content and failing block content
   - Compare your SEARCH block carefully with the file content
   - Add necessary imports or context
   - Ensure formatting matches exactly

4. Multiple block handling:
   - Blocks are processed in order they appear
   - Each block must match and apply successfully
   - Later blocks operate on the result of earlier blocks
   - If any block fails, the tool reports which one

Examples for different code styles:

1. Adding a field to a class:
<<<<<<< SEARCH
class UserManager {
  private users: { id: number; name: string; }[] = [];
}
=======
class UserManager {
  private users: { id: number; name: string; password: string; }[] = [];
}
>>>>>>> REPLACE

2. Modifying a class method:
<<<<<<< SEARCH
  addUser(name: string) {
    const user = { id: this.nextId++, name };
    this.users.push(user);
    return user;
  }
=======
  async addUser(name: string, password: string) {
    const hashedPassword = await hash(password, 10);
    const user = { id: this.nextId++, name, password: hashedPassword };
    this.users.push(user);
    return user;
  }
>>>>>>> REPLACE

3. Adding imports:
<<<<<<< SEARCH
class UserManager {
=======
import { hash } from 'bcrypt';

class UserManager {
>>>>>>> REPLACE

4. Updating interfaces/types:
<<<<<<< SEARCH
interface User {
  id: string;
  name: string;
}
=======
interface User {
  id: string;
  name: string;
  password: string;
}
>>>>>>> REPLACE`,
    schema: z.object({
      instructions: z.string().describe("Search/replace blocks following the required format. Each block must contain <<<<<<< SEARCH, =======, and >>>>>>> REPLACE. SEARCH content must match the file exactly."),
    }),
  },
);

const codeFormattingTool = tool(
  async ({ code }: { code: string; }): Promise<{ code: string; error: string; }> => {
    try {
      const formatted = await (globalThis as unknown as {
        prettierJs: ({ code, toThrow }: { code: string; toThrow: boolean; }) => Promise<string>;
      }).prettierJs({ code, toThrow: true });

      const transpiled = await (globalThis as unknown as {
        transpile: (
          { code, originToUse }: { code: string; originToUse: string; },
        ) => Promise<string>;
      }).transpile({ code: formatted, originToUse: location.origin });

      return { code: formatted, error: "" };
    } catch (error) {
      return {
        code,
        error: error instanceof Error ? error.message : "Unknown error in formatting",
      };
    }
  },
  {
    name: "code_formatting",
    description: "Formats and transpiles code",
    schema: z.object({
      code: z.string().describe("The code to format"),
    }),
  },
);

const broadcastTool = tool(
  async (input: { channel: string; data?: any; }): Promise<void> => {
    const bc = new BroadcastChannel(input.channel);
    if (input.data !== undefined) {
      bc.postMessage(input.data);
    }
  },
  {
    name: "broadcast",
    description: "Broadcasts messages through BroadcastChannel",
    schema: z.object({
      channel: z.string().describe("The channel to broadcast on"),
      data: z.any().optional().describe("The data to broadcast"),
    }),
  },
);

// Workflow setup
const createWorkflow = async (initialState: Partial<AgentState>) => {
  const graphState: StateGraphArgs<AgentState>["channels"] = {
    messages: {
      reducer: (prev: BaseMessage[], next: BaseMessage[]) => prev.concat(next),
    },
    code: {
      reducer: (_prev: string, next: string) => next,
    },
    lastError: {
      reducer: (_prev: string, next: string) => next,
    },
    isStreaming: {
      reducer: (_prev: boolean, next: boolean) => next,
    },
    debugLogs: {
      reducer: (prev: string[], next: string[]) => [...prev, ...next],
    },
  };

  const tools = [codeModificationTool, codeFormattingTool, broadcastTool];
  const toolNode = new ToolNode(tools);

  const model = new ChatAnthropic({
    model: "claude-3-5-sonnet-20241022",
    anthropicApiKey: "DUMMY_API_KEY",
    streaming: false,
    anthropicApiUrl: location.origin + "/api/anthropic",
    temperature: 0,
  }).bindTools(tools);

  const shouldContinue = (state: AgentState): "process" | "tools" | "end" => {
    if (state.lastError) {
      return "process";
    }
    const lastMessage = state.messages[state.messages.length - 1] as AIMessage;
    return lastMessage.tool_calls?.length ? "tools" : "end";
  };

  const processMessage = async (state: AgentState): Promise<Partial<AgentState>> => {
    const response = await model.invoke(state.messages);
    return {
      messages: [
        new AIMessage({
          content: response.content,
          tool_calls: response.tool_calls,
          additional_kwargs: response.additional_kwargs,
        }),
      ],
      isStreaming: true,
    };
  };

  const workflow = new StateGraph<AgentState>({ channels: graphState })
    .addNode("process", processMessage)
    .addNode("tools", toolNode)
    .addEdge("__start__", "process")
    .addConditionalEdges("process", shouldContinue, {
      process: "process",
      tools: "tools",
      end: "__end__",
    })
    .addEdge("tools", "process");

  const app = workflow.compile({ checkpointer: new MemorySaver() });

  return {
    invoke: async (prompt: string) => {
      // Initialize state with code that tools can access
      const state: AgentState = {
        messages: [new HumanMessage(prompt)],
        code: initialState.code || "",
        lastError: "",
        isStreaming: false,
        debugLogs: [],
        ...initialState,
      };

      // Make code available to tools
      globalThis.currentFile = {
        content: state.code,
        path: "current-file"
      };

      const finalState = await app.invoke(state, {
        configurable: { thread_id: uuidv4() },
      });
      
      return finalState;
    },
  };
};

export { createWorkflow };
Object.assign(globalThis, { createWorkflow });
