import { messagesPush, updateSearchReplace } from "@/lib/chat-utils";
import { SEARCH_REPLACE_MARKERS } from "@/lib/chat-utils";
import { ICode, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import type { CodeModification } from "@/types/chat-langchain";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

function createErrorResponse(
  currentCode: string,
  errorMessage: string,
  p0: string,
  additionalProps: Record<string, unknown> = {},
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
      if (documentHash !== currentHash) {
        return createErrorResponse(
          currentCode,
          "Document hash mismatch. Code has been modified outside this session.",
          "documentHash",
          { currentHash },
        );
      }

      if (!instructions?.length || !instructions.every(i => i.search && i.replace)) {
        return createErrorResponse(
          currentCode,
          "Invalid instructions format. Expected array of {search, replace} objects.",
          "",
        );
      }

      let modifiedCode = currentCode;
      const validationErrors: string[] = [];

      // Process each regex instruction
      for (const [index, { search, replace }] of instructions.entries()) {
        if (!search.trim() || !replace.trim()) {
          validationErrors.push(`Instruction ${index + 1}: Empty search/replace pattern`);
          continue;
        }

        try {
          // Parse regex pattern with optional flags
          const regexLiteralMatch = search.match(/^\/(.*)\/([gimuy]*)$/);
          let regex: RegExp;

          if (regexLiteralMatch) {
            const [, pattern, flags = ""] = regexLiteralMatch;
            const normalizedFlags = flags.includes("g") ? flags : flags + "g";
            regex = new RegExp(pattern, normalizedFlags);
          } else {
            // Default to case-sensitive global regex
            regex = new RegExp(search, "g");
          }

          // Apply replacement
          const newCode = modifiedCode.replace(regex, replace);
          if (newCode === modifiedCode) {
            validationErrors.push(`Pattern ${index + 1}: '${search}' not found`);
          }
          modifiedCode = newCode;
        } catch (error) {
          validationErrors.push(
            `Invalid regex '${search}': ${error instanceof Error ? error.message : error}`,
          );
        }
      }

      if (validationErrors.length > 0) {
        return createErrorResponse(
          currentCode,
          `Validation errors:\n${validationErrors.join("\n")}`,
          "regexError",
          { modifiedCode },
        );
      }

      if (modifiedCode === currentCode) {
        return createErrorResponse(
          currentCode,
          "No changes detected. Regex patterns did not match any content.",
          "noMatches",
        );
      }

      // Save AI message with original instructions
      const instructionsStr = instructions
        .map(({ search, replace }) => `
          ${SEARCH_REPLACE_MARKERS.SEARCH_START}
          ${search}
          ${SEARCH_REPLACE_MARKERS.SEPARATOR}
          ${replace}
          ${SEARCH_REPLACE_MARKERS.REPLACE_END}
        `)
        .join("\n");

      await cSess.setMessages(
        messagesPush(cSess.getMessages(), {
          id: Date.now().toString(),
          role: "assistant",
          content: instructionsStr,
        }),
      );

      await cSess.setCode(modifiedCode);

      return {
        documentHash: md5(modifiedCode),
        code: returnModifiedCode ? modifiedCode : undefined,
      };
    } catch (error) {
      return createErrorResponse(
        currentCode,
        error instanceof Error ? error.message : "Code modification failed",
        "",
        { stack: error instanceof Error ? error.stack : undefined },
      );
    }
  },
  {
    name: "code_modification",
    description: [
      "Performs code modifications using REGEX SEARCH/REPLACE patterns.",
      "REQUIRES: Array of {search (regex), replace} instructions,",
      "documentHash for version control, and optional returnModifiedCode flag.",
      "Regex format: /pattern/flags (e.g. '/\\bfoo\\b/gi' for whole-word foo, case-insensitive)",
      "Example input: {",
      "  instructions: [{search: '/foo/g', replace: 'bar'}],",
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
              .describe("Regex pattern (use /pattern/flags format for best results)"),
            replace: z
              .string()
              .describe("Replacement text (can use regex capture groups like $1)"),
          }),
        )
        .min(1)
        .max(4)
        .describe("Array of regex search/replace instructions"),
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