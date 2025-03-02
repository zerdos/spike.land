import { messagesPush, updateSearchReplace } from "@/lib/chat-utils";
import { SEARCH_REPLACE_MARKERS } from "@/lib/chat-utils";
import { ICode, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import type { CodeModification } from "@/types/chat-langchain";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

function createErrorResponse(
currentCode: string, errorMessage: string, p0: string, additionalProps: Record<string, unknown> = {},
) {
  return {
    code: currentCode,
    error: errorMessage,
    currentFileContent: currentCode,
    documentHash: md5(currentCode),
    ...additionalProps,
  };
}

export const codeModificationTool = tool(
  async ({
    instructions,
    documentHash,
    returnModifiedCode = false,
  }: {
    instructions: Array<{ search: string; replace: string }>;
    documentHash: string;
    returnModifiedCode?: boolean;
  }): Promise<CodeModification> => {
    const cSess = (globalThis as unknown as { cSess: ICode }).cSess;
    const currentCode = await cSess.getCode();
    const currentHash = md5(currentCode);

    try {

      // Validate document hash first
      if (documentHash !== currentHash) {
        return createErrorResponse(
          currentCode,
          "Document modified since last hash. Refresh and try again.",
          currentCode,
          documentHash
        );
      }

      // Validate instructions format
      if (!instructions?.length || !instructions.every(i => i.search && i.replace)) {
        return createErrorResponse(
          currentCode,
          "Invalid instructions format. Expected array of {search, replace} objects.",
        );
      }

      // Create instruction string with validation
      const instructionsStr = instructions
        .map(({ search, replace }) => {
          if (!search.trim() || !replace.trim()) {
            throw new Error("Empty search/replace pattern detected");
          }
          return `
            ${SEARCH_REPLACE_MARKERS.SEARCH_START} 
            ${search}
            ${SEARCH_REPLACE_MARKERS.SEPARATOR}
            ${replace}
            ${SEARCH_REPLACE_MARKERS.REPLACE_END}
          `;
        })
        .join("\n");

      // Save AI message with instructions
      await cSess.setMessages(
        messagesPush(cSess.getMessages(), {
          id: Date.now().toString(),
          role: "assistant",
          content: instructionsStr,
        }),
      );

      // Apply modifications
      const modifiedCode = updateSearchReplace(instructionsStr, currentCode);

      // Verify changes
      if (modifiedCode === currentCode) {
        const sampleSearches = instructions
          .slice(0, 3)
          .map(i => `"${i.search}"`)
          .join(", ");
        return createErrorResponse(
          currentCode,
          `No changes detected. Search patterns not found: ${sampleSearches}...`,
        );
      }

      // Update code state
      await cSess.setCode(modifiedCode);

      return {
        documentHash: md5(modifiedCode),
        code: returnModifiedCode ? modifiedCode : undefined,
      };
    } catch (error) {
     
      return createErrorResponse(
        currentCode: currentCode,
        error instanceof Error ? error.message : "Code modification failed",
        { stack: error instanceof Error ? error.stack : undefined },
      );
    }
  },
  {
    name: "code_modification",
    description: [
      "Performs code modifications using SEARCH/REPLACE patterns.",
      "REQUIRES: Array of {search, replace} instructions,",
      "documentHash for version control, and optional returnModifiedCode flag.",
      "Example input: {",
      "  instructions: [{search: 'foo', replace: 'bar'}],",
      "  documentHash: 'ef873ade',",
      "  returnModifiedCode: false",
      "}",
    ].join("\n"),
    schema: z.object({
      instructions: z
        .array(
          z.object({
            search: z
              .string()
              .min(1)
              .describe("Search pattern to find in code (whitespace-insensitive)"),
            replace: z
              .string()
              .describe("Replacement text for matched search patterns"),
          }),
        )
        .min(1)
        .describe("Array of search/replace instruction objects"),
      documentHash: z
        .string()
        .length(8)
        .describe("Hash of current document for version validation"),
      returnModifiedCode: z
        .boolean()
        .optional()
        .default(false)
        .describe("Return full modified code when true"),
    }),
  },
);