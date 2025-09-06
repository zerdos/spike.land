import { md5 } from "@/lib/md5";

import type { AIMessage } from "@langchain/core/messages";
import type { AgentState, ToolResponseMetadata } from "../../chat-langchain";
import { estimateTokenSavings } from "./code-utils";

/**
 * Extract hash and other metadata from tool response
 * Enhanced to handle cases where code might not be returned to save tokens
 */
export const extractToolResponseMetadata = (
  response: AIMessage,
  currentState: AgentState,
): ToolResponseMetadata => {
  const metadata: ToolResponseMetadata = {
    hash: currentState.hash,
    modifiedCodeHash: undefined,
    compilationError: undefined,
    codeWasReturned: false,
  };

  // Check if there are tool responses in the additional_kwargs
  const responseData = response as unknown as Record<string, unknown>;
  if (
    responseData['additional_kwargs'] &&
    typeof responseData['additional_kwargs'] === "object" &&
    responseData['additional_kwargs'] !== null &&
    "tool_responses" in (responseData['additional_kwargs'] as Record<string, unknown>) &&
    Array.isArray((responseData['additional_kwargs'] as Record<string, unknown>)['tool_responses'])
  ) {
    // Look for hash in tool responses
    const toolResponses = (responseData['additional_kwargs'] as Record<string, unknown>)['tool_responses'] as Array<unknown>;
    for (const toolResponse of toolResponses) {
      if (
        typeof toolResponse === "object" &&
        toolResponse !== null &&
        "name" in toolResponse &&
        (toolResponse.name === "code_modification" ||
          toolResponse.name === "replace_in_file") &&
        "content" in toolResponse
      ) {
        let content: Record<string, unknown> = {};

        // Parse content if it's a string
        if (typeof toolResponse.content === "string") {
          try {
            content = JSON.parse(toolResponse.content);
          } catch (e) {
            console.warn("Failed to parse tool response content", e);
            continue;
          }
        } else if (
          typeof toolResponse.content === "object" &&
          toolResponse.content !== null
        ) {
          content = toolResponse.content as Record<string, unknown>;
        } else {
          continue;
        }

        // Extract metadata from content
        if ("hash" in content && typeof content['hash'] === "string") {
          metadata.hash = content['hash'];
        }

        if (
          "modifiedCodeHash" in content &&
          typeof content['modifiedCodeHash'] === "string"
        ) {
          metadata.modifiedCodeHash = content['modifiedCodeHash'];
        }

        if (
          "error" in content && typeof content['error'] === "string" &&
          content['error'].includes("failed to compile")
        ) {
          metadata.compilationError = content['error'];
        }

        // Check if code was returned in the response
        metadata.codeWasReturned = "code" in content &&
          content['code'] !== undefined;

        break;
      }
    }
  }

  return metadata;
};

/**
 * Update tool calls with returnModifiedCode parameter based on code analysis
 */
export const updateToolCallsWithCodeFlag = (
  toolCalls: Array<Record<string, unknown>>,
  returnModifiedCode: boolean,
): Array<Record<string, unknown>> => {
  return toolCalls.map((toolCall) => {
    // Handle both code_modification and replace_in_file tools
    if (
      (toolCall['name'] === "code_modification" ||
        toolCall['name'] === "replace_in_file") &&
      toolCall['args']
    ) {
      try {
        const args = typeof toolCall['args'] === "string"
          ? JSON.parse(toolCall['args'])
          : toolCall['args'];

        // Log the tool call for debugging
        console.warn(`Updating tool call for ${toolCall['name']}:`, {
          toolName: toolCall['name'],
          originalArgs: JSON.stringify(args).substring(0, 100) + "...",
          returnModifiedCode,
        });

        return {
          ...toolCall,
          args: {
            ...args,
            returnModifiedCode,
          },
        };
      } catch (e) {
        console.warn(
          `Failed to update tool call args for ${toolCall['name']}:`,
          e,
        );
        return toolCall;
      }
    }
    return toolCall;
  });
};

/**
 * Process the response when code was not returned in the tool response
 * @param hash The hash of the code to retrieve
 * @param state The current agent state
 * @param codeSession Optional code session to use for retrieving code
 * @returns The retrieved code or undefined
 */
export const handleMissingCodeResponse = async (
  hash: string,
  state: AgentState,
  codeSession?: { getCode: () => Promise<string>; },
): Promise<string | undefined> => {
  if (!hash || hash === state.hash) {
    return undefined;
  }

  try {
    let latestCode: string;

    // If a code session is provided, use it to get the code
    if (codeSession && typeof codeSession.getCode === "function") {
      latestCode = await codeSession.getCode();
    } else {
      // No code session available, use the current state code as a fallback
      console.warn("No code session available, using current state code");
      return state.code;
    }

    // Verify the hash matches
    const latestHash = md5(latestCode);
    if (latestHash === hash) {
      console.warn("Retrieved latest code from session using hash");

      // Log token savings
      const tokenSavings = estimateTokenSavings(latestCode);
      console.warn(
        `Token optimization: Saved approximately ${tokenSavings} tokens by not returning code`,
      );

      return latestCode;
    }

    console.warn("Hash mismatch", {
      expectedHash: hash,
      actualHash: latestHash,
    });
  } catch (error) {
    // Log error but don't throw - just return undefined
    console.warn("Failed to retrieve code", error);
  }

  return undefined;
};
