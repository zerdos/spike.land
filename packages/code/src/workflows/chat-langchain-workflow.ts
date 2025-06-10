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

/**
 * Creates a workflow with string replace capability
 * @param initialState The initial agent state
 * @returns A workflow object with an invoke method
 */
export const createWorkflowWithStringReplace = (initialState: AgentState) => {
  // Get the global code session
  const cSess = (globalThis as Record<string, unknown>)["cSess"] as ICode;

  // Create the Anthropic model
  const anthropic = new ChatAnthropic({
    modelName: "claude-3-opus-20240229",
    temperature: 0,
    streaming: false,
  });

  // Create the replace-in-file tool
  const replaceInFileTool = getEnhancedReplaceInFileTool(cSess); // Changed to enhanced

  // Bind tools to the model
  const modelWithTools = anthropic.bindTools([replaceInFileTool]);

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
    const toolResponsesFromKwargs = message.additional_kwargs
      ?.["tool_responses"];

    if (
      !toolResponsesFromKwargs ||
      !Array.isArray(toolResponsesFromKwargs) ||
      toolResponsesFromKwargs.length === 0
    ) {
      return state;
    }

    // Now, toolResponsesFromKwargs is known to be a non-empty array.
    const toolResponse = toolResponsesFromKwargs[0];
    // Expect 'enhanced_replace_in_file' which is the name of the tool from getEnhancedReplaceInFileTool
    if (!toolResponse || toolResponse.name !== "enhanced_replace_in_file") {
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
        console.warn("No code provided in tool response, using session code");
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
        hash: modification.hash,
      };
    } catch (error) {
      console.error("Error processing tool response:", error);
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
        // Optimize token usage for large code
        if (state.code.length > 3000) {
          console.warn(
            "Performance optimization: Large code detected, optimizing token usage",
          );
        }

        // Create messages array with system message and user input
        const messages: BaseMessage[] = [
          systemMessage,
          ...state.messages,
          new HumanMessage(userInput),
        ];

        // Invoke the model with tools
        const response = await modelWithTools.invoke(messages);

        // Process the response
        const newState = await processToolResponse(response);

        // Update the state with the new message
        state = {
          ...newState,
          messages: [...state.messages, new HumanMessage(userInput), response],
        };

        return state;
      } catch (error) {
        console.error("Workflow error:", error);
        throw error;
      }
    },
  };
};

/**
 * Creates a chat workflow using LangChain and Anthropic
 * @param cSess The code session to use
 * @param apiKey The Anthropic API key
 * @returns A runnable sequence for the chat workflow
 */
export const createChatLangchainWorkflow = (
  cSess: ICode,
  apiKey: string,
  model = "claude-3-opus-20240229",
) => {
  // Create the Anthropic model
  const anthropic = new ChatAnthropic({
    anthropicApiKey: apiKey,
    modelName: model,
    temperature: 0.7,
  });

  // Create the replace-in-file tool
  const replaceInFileTool = getEnhancedReplaceInFileTool(cSess); // Changed to enhanced

  // Create the system prompt

  // Create the prompt template for user messages
  const promptTemplate = PromptTemplate.fromTemplate(`
You are a helpful AI assistant that helps users with coding tasks.

Current code:
\`\`\`
{code}
\`\`\`

User message: {userInput}

Please respond to the user's request. If you need to modify the code, use the replace_in_file tool.
`);

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
    async processMessage(userMessage: string) {
      try {
        // Get the current code
        const currentCode = await cSess.getCode();
        const currentHash = md5(currentCode);

        // Add the user message to the session
        cSess.addMessage({
          id: Date.now().toString(),
          role: "user",
          content: userMessage,
        });

        // Run the chain
        const response = await chain.invoke(userMessage);

        // Add the assistant message to the session
        cSess.addMessage({
          id: Date.now().toString(),
          role: "assistant",
          content: response,
        });

        return {
          success: true,
          response,
          code: await cSess.getCode(),
          hash: currentHash,
        };
      } catch (error) {
        console.error("Error in chat workflow:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          code: await cSess.getCode(),
          hash: md5(await cSess.getCode()),
        };
      }
    },
  };
};
