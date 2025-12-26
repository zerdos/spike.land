import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { ChatAnthropic } from "@langchain/anthropic";
import type { AIMessage, BaseMessage } from "@langchain/core/messages";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { getSystemPrompt } from "../config/system-prompts";
import type { AgentState, CodeModification } from "./chat-langchain";
import { getEnhancedReplaceInFileTool } from "./tools/enhanced-replace-in-file";
import {
  DEFAULT_WORKFLOW_CONFIG,
  hasToolResponses,
  isEnhancedReplaceToolResponse,
  type ModelWithTools,
  type TypedAIMessage,
  type WorkflowConfig,
} from "./types/langchain-types";

/**
 * Interface for global code session access
 * This provides type-safe access to the global cSess variable
 */
interface GlobalWithCodeSession {
  cSess?: ICode;
}

/**
 * Gets the code session from global scope with type safety
 * @returns The code session or undefined if not available
 */
function getGlobalCodeSession(): ICode | undefined {
  return (globalThis as GlobalWithCodeSession).cSess;
}

/**
 * Creates a workflow with string replace capability
 * @param initialState The initial agent state
 * @param config Optional workflow configuration
 * @returns A workflow object with an invoke method
 */
export const createWorkflowWithStringReplace = (
  initialState: AgentState,
  config: Partial<WorkflowConfig> = {},
) => {
  const workflowConfig = { ...DEFAULT_WORKFLOW_CONFIG, ...config };

  // Get the global code session
  const cSess = getGlobalCodeSession();
  if (!cSess) {
    throw new Error("Global code session (cSess) is not available");
  }

  // Create the Anthropic model
  const anthropic = new ChatAnthropic({
    modelName: workflowConfig.modelName,
    temperature: workflowConfig.temperature,
    streaming: workflowConfig.streaming,
  });

  // Create the replace-in-file tool
  const replaceInFileTool = getEnhancedReplaceInFileTool(cSess);

  // Bind tools to the model
  const modelWithTools = anthropic.bindTools([replaceInFileTool]) as ModelWithTools;

  // Create the system prompt
  const systemPrompt = getSystemPrompt();
  const systemMessage = new SystemMessage(systemPrompt);

  // Initialize the state
  let state = { ...initialState };

  // Verify code integrity
  const verifyCodeIntegrity = (code: string, hash: string): boolean => {
    const currentHash = md5(code);
    if (currentHash !== hash) {
      console.error(
        `Code integrity violation: hash mismatch. Expected ${hash}, got ${currentHash}`,
      );
      return false;
    }
    return true;
  };

  // Process tool responses
  const processToolResponse = async (
    message: AIMessage,
  ): Promise<AgentState> => {
    const typedMessage = message as TypedAIMessage;
    const additionalKwargs = typedMessage.additional_kwargs;

    if (!hasToolResponses(additionalKwargs)) {
      return state;
    }

    const toolResponse = additionalKwargs.tool_responses[0];
    if (!toolResponse || !isEnhancedReplaceToolResponse(toolResponse)) {
      return state;
    }

    try {
      const modification = JSON.parse(toolResponse.content) as CodeModification;

      if (typeof modification === "string") {
        return {
          ...state,
          code: modification,
          hash: md5(modification),
        };
      }

      if (modification.error) {
        console.error(`Code modification error: ${modification.error}`);
        throw new Error(modification.error);
      }

      // If code is not provided, use the current code from the session
      if (!modification.code) {
        const sessionCode = await cSess.getCode();
        return {
          ...state,
          code: sessionCode,
          hash: modification.hash || md5(sessionCode),
        };
      }

      return {
        ...state,
        code: modification.code,
        hash: modification.hash ?? md5(modification.code),
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error processing tool response:", errorMessage);
      throw error;
    }
  };

  // Return the workflow object
  return {
    async invoke(userInput: string): Promise<AgentState> {
      // Verify code integrity before proceeding
      if (!verifyCodeIntegrity(state.code, state.hash)) {
        throw new Error("Code integrity violation: hash mismatch");
      }

      try {
        // Create messages array with system message and user input
        const messages = [
          systemMessage,
          ...state.messages,
          new HumanMessage(userInput),
        ] as BaseMessage[];

        // Invoke the model with tools
        const response = await modelWithTools.invoke(messages);

        // Process the response
        const newState = await processToolResponse(response);

        // Update the state with the new message
        state = {
          ...newState,
          messages: [
            ...state.messages,
            new HumanMessage(userInput),
            response,
          ] as typeof state.messages,
        };

        return state;
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Workflow error:", errorMessage);
        throw error;
      }
    },
  };
};

/**
 * Result of a chat workflow message processing
 */
export interface ChatWorkflowResult {
  success: boolean;
  response?: string;
  error?: string;
  code: string;
  hash: string;
}

/**
 * Creates a chat workflow using LangChain and Anthropic
 * @param cSess The code session to use
 * @param apiKey The Anthropic API key
 * @param model The model name to use (defaults to claude-sonnet-4-20250514)
 * @returns A runnable sequence for the chat workflow
 */
export const createChatLangchainWorkflow = (
  cSess: ICode,
  apiKey: string,
  model = DEFAULT_WORKFLOW_CONFIG.modelName,
) => {
  // Create the Anthropic model
  const anthropic = new ChatAnthropic({
    anthropicApiKey: apiKey,
    modelName: model,
    temperature: 0.7,
  });

  // Create the replace-in-file tool
  const replaceInFileTool = getEnhancedReplaceInFileTool(cSess);

  // Create the prompt template for user messages
  const promptTemplate = new PromptTemplate({
    template: `You are a helpful AI assistant that helps users with coding tasks.

Current code:
\`\`\`
{code}
\`\`\`

User message: {userInput}

Please respond to the user's request. If you need to modify the code, use the replace_in_file tool.`,
    inputVariables: ["code", "userInput"],
  });

  // Create the runnable sequence
  const chain = RunnableSequence.from([
    {
      userInput: (input: string) => input,
      code: async () => await cSess.getCode(),
    },
    promptTemplate,
    anthropic,
    new StringOutputParser(),
  ]);

  // Return the chain with the tool
  return {
    chain,
    tools: [replaceInFileTool],
    async processMessage(userMessage: string): Promise<ChatWorkflowResult> {
      try {
        // Get the current code
        const currentCode = await cSess.getCode();
        const currentHash = md5(currentCode);

        // Run the chain
        const response = await chain.invoke(userMessage);

        return {
          success: true,
          response: String(response),
          code: await cSess.getCode(),
          hash: currentHash,
        };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Error in chat workflow:", errorMessage);
        return {
          success: false,
          error: errorMessage,
          code: await cSess.getCode(),
          hash: md5(await cSess.getCode()),
        };
      }
    },
  };
};
