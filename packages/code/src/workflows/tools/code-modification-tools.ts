import { updateSearchReplace } from "@/lib/chat-utils";
import { SEARCH_REPLACE_MARKERS } from "@/lib/chat-utils";
import type { ICode, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tool } from "@langchain/core/tools";
import type { CodeModification } from "../chat-langchain";

import { z } from "zod";

// Error response helper remains the same
function createErrorResponse(
  currentCode: string,
  errorMessage: string,
  additionalProps: Record<string, unknown> = {},
) {
  return {
    code: currentCode,
    error: errorMessage,
    currentFileContent: currentCode,
    hash: md5(currentCode),
    ...additionalProps,
  };
}

// Improved code modification tool
export const codeModificationTool = tool(
  async (
    { instructions, hash, returnModifiedCode = false }: { // Fixed default value
      instructions: string;
      hash: string;
      returnModifiedCode?: boolean;
    },
  ): Promise<CodeModification> => {
    const cSess = (globalThis as unknown as { cSess: ICode; }).cSess;

    const currentCode = await cSess.getCode();
    const currentHash = md5(currentCode);

    // Enhanced hash validation
    if (hash && hash !== currentHash) {
      return createErrorResponse(
        currentCode,
        "Document modified since last hash. Refresh and try again.",
        { hash: currentHash },
      );
    }

    try {
      // Save the AI message with code modification instructions
      const messages = cSess.getMessages();
      const lastMessage = messages[messages.length - 1];

      // If the last message is from the user, add a new AI message
      if (lastMessage && lastMessage.role === "user") {
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: instructions,
        };
        cSess.addMessage(aiMessage);
      } // If the last message is from the AI, update it with the instructions
      else if (lastMessage && lastMessage.role === "assistant") {
        // First remove all messages
        cSess.removeMessages();

        // Then add each message up to the last one
        for (let i = 0; i < messages.length - 1; i++) {
          cSess.addMessage(messages[i]);
        }

        // Finally add the updated message
        cSess.addMessage({
          ...lastMessage,
          content: instructions,
        });
      }

      // Use single modification method
      const modifiedCode = updateSearchReplace(instructions, currentCode);

      // Validate changes
      if (modifiedCode === currentCode) {
        const sampleSearch = instructions.slice(0, 50);
        return createErrorResponse(
          currentCode,
          `No changes detected. Search content not found: "${sampleSearch}..."`,
        );
      }

      // Set code and handle errors
      await cSess.setCode(modifiedCode);

      return {
        hash: md5(modifiedCode),
        code: returnModifiedCode ? modifiedCode : undefined,
      };
    } catch (error) {
      return createErrorResponse(
        currentCode,
        error instanceof Error ? error.message : "Code modification failed",
        { stack: error instanceof Error ? error.stack : undefined },
      );
    }
  },
  {
    name: "code_modification",
    description: "Optimized code modification tool with precise SEARCH/REPLACE handling",
    schema: z.object({
      instructions: z.string().describe(
        `${SEARCH_REPLACE_MARKERS.SEARCH_START}
      Search content (whitespace-insensitive)
      ${SEARCH_REPLACE_MARKERS.SEPARATOR}
      Replace content (whitespace-insensitive)
      ${SEARCH_REPLACE_MARKERS.REPLACE_END}
      
      ... add more search/replace patterns blocks if needed


      `,
      ),
      hash: z.string().describe(
        "MD5 hash of current document for version validation",
      ),
      returnModifiedCode: z.boolean().optional().default(false).describe(
        "Return full modified code (false for hash-only response)",
      ),
    }),
  },
);
