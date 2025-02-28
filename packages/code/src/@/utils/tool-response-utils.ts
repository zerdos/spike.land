import { AIMessage } from "@langchain/core/messages";
import { AgentState } from "@/types/chat-langchain";
import { ToolResponseMetadata } from "@/types/workflow";
import { md5 } from "@/lib/md5";
import { estimateTokenSavings } from "./code-utils";

/**
 * Extract documentHash and other metadata from tool response
 * Enhanced to handle cases where code might not be returned to save tokens
 */
export const extractToolResponseMetadata = (
  response: AIMessage,
  currentState: AgentState,
): ToolResponseMetadata => {
  const metadata: ToolResponseMetadata = {
    documentHash: currentState.documentHash,
    modifiedCodeHash: undefined,
    compilationError: undefined,
    codeWasReturned: false,
  };

  // Check if there are tool responses in the additional_kwargs
  if (
    response.additional_kwargs &&
    "tool_responses" in response.additional_kwargs &&
    Array.isArray(response.additional_kwargs.tool_responses)
  ) {
    // Look for documentHash in tool responses
    const toolResponses = response.additional_kwargs.tool_responses;
    for (const toolResponse of toolResponses) {
      if (
        typeof toolResponse === "object" &&
        toolResponse !== null &&
        "name" in toolResponse &&
        toolResponse.name === "code_modification" &&
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
        } else if (typeof toolResponse.content === "object" && toolResponse.content !== null) {
          content = toolResponse.content as Record<string, unknown>;
        } else {
          continue;
        }

        // Extract metadata from content
        if ("documentHash" in content && typeof content.documentHash === "string") {
          metadata.documentHash = content.documentHash;
        }

        if ("modifiedCodeHash" in content && typeof content.modifiedCodeHash === "string") {
          metadata.modifiedCodeHash = content.modifiedCodeHash;
        }

        if (
          "error" in content && typeof content.error === "string" &&
          content.error.includes("failed to compile")
        ) {
          metadata.compilationError = content.error;
        }

        // Check if code was returned in the response
        metadata.codeWasReturned = "code" in content && content.code !== undefined;

        break;
      }
    }
  }

  return metadata;
};

/**
 * Update tool calls with returnModifiedCode parameter based on code analysis
 */
export const updateToolCallsWithCodeFlag = (toolCalls: Array<any>, returnModifiedCode: boolean): Array<any> => {
  return toolCalls.map(toolCall => {
    if (toolCall.name === "code_modification" && toolCall.args) {
      try {
        const args = typeof toolCall.args === "string"
          ? JSON.parse(toolCall.args)
          : toolCall.args;

        return {
          ...toolCall,
          args: {
            ...args,
            returnModifiedCode,
          },
        };
      } catch (e) {
        console.warn("Failed to update tool call args", e);
        return toolCall;
      }
    }
    return toolCall;
  });
};

/**
 * Process the response when code was not returned in the tool response
 */
export const handleMissingCodeResponse = async (
  documentHash: string,
  state: AgentState,
): Promise<string | undefined> => {
  if (!documentHash || documentHash === state.documentHash) {
    return undefined;
  }

  try {
    // Get the latest code from the session
    const latestCode = await (globalThis as unknown as {
      cSess: { getCode: () => Promise<string>; };
    }).cSess.getCode();

    // Verify the hash matches
    const latestHash = md5(latestCode);
    if (latestHash === documentHash) {
      console.log("Retrieved latest code from session using documentHash");

      // Log token savings
      const tokenSavings = estimateTokenSavings(latestCode);
      console.log(`Token optimization: Saved approximately ${tokenSavings} tokens by not returning code`);

      return latestCode;
    }

    console.warn("Hash mismatch", {
      expectedHash: documentHash,
      actualHash: latestHash,
    });
  } catch (error) {
    console.error("Failed to retrieve code", error);
  }

  return undefined;
};
