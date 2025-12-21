import {
  messagesPush as _messagesPush,
  SEARCH_REPLACE_MARKERS as _SEARCH_REPLACE_MARKERS,
  updateSearchReplace as _updateSearchReplace,
} from "@/lib/chat-utils";
import type { ICode } from "@/lib/interfaces";
import { Message as _Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
// import { tool } from "@langchain/core/tools"; // @langchain/core not available
import type { CodeModification } from "../chat-langchain";

import { z } from "zod";

// Simple tool interface since @langchain/core is not available
interface Tool<TInput, TOutput> {
  name: string;
  description: string;
  schema: z.ZodSchema<TInput>;
  execute: (args: TInput) => Promise<TOutput>;
}

function createTool<TInput, TOutput>(
  fn: (args: TInput) => Promise<TOutput>,
  options: {
    name: string;
    description: string;
    schema: z.ZodSchema<unknown>;
  },
): Tool<TInput, TOutput> {
  return {
    name: options.name,
    description: options.description,
    schema: options.schema as z.ZodSchema<TInput>,
    execute: fn,
  };
}

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

export const getRegexReplaceTool = createTool(
  async (args: {
    instructions: Array<{ search: string; replace: string; }>;
    hash: string;
    returnModifiedCode: boolean;
  }): Promise<CodeModification> => {
    const { instructions, hash, returnModifiedCode } = args;
    const cSess = (globalThis as unknown as { cSess: ICode; }).cSess;
    const currentCode = await cSess.getCode();
    const currentHash = md5(currentCode);

    try {
      if (hash !== currentHash) {
        return createErrorResponse(
          currentCode,
          "Document hash mismatch. Code has been modified outside this session.",
          { currentHash },
        );
      }

      if (
        !instructions?.length ||
        !instructions.every((i) => i.search && i.replace)
      ) {
        return createErrorResponse(
          currentCode,
          "Invalid instructions format. Expected array of {search, replace} objects.",
        );
      }

      let modifiedCode = currentCode;
      const validationErrors: string[] = [];

      // Process each regex instruction
      for (const [index, { search, replace }] of instructions.entries()) {
        if (!search.trim() || !replace.trim()) {
          validationErrors.push(
            `Instruction ${index + 1}: Empty search/replace pattern`,
          );
          continue;
        }

        try {
          // Parse regex pattern with optional flags
          const regexLiteralMatch = search.match(/^\/(.*)\/([gimuy]*)$/);
          let regex: RegExp;

          if (regexLiteralMatch) {
            const pattern = regexLiteralMatch[1];
            const flags = regexLiteralMatch[2];
            const safeFlags = flags || "";
            const normalizedFlags = safeFlags.includes("g") ? safeFlags : safeFlags + "g";
            if (pattern) {
              regex = new RegExp(pattern, normalizedFlags);
            } else {
              regex = new RegExp(search, "g");
            }
          } else {
            // Default to case-sensitive global regex
            regex = new RegExp(search, "g");
          }

          // Apply replacement
          const newCode = modifiedCode.replace(regex, replace);
          if (newCode === modifiedCode) {
            validationErrors.push(
              `Pattern ${index + 1}: '${search}' not found`,
            );
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
          { modifiedCode },
        );
      }

      if (modifiedCode === currentCode) {
        return createErrorResponse(
          currentCode,
          "No changes detected. Regex patterns did not match any content.",
        );
      }

      await cSess.setCode(modifiedCode);

      const veryNewCode = await cSess.getCode();

      if (veryNewCode === currentCode) {
        return createErrorResponse(
          currentCode,
          "No changes detected. Code remains unchanged.",
        );
      }

      const result: CodeModification = {
        hash: md5(veryNewCode),
      };

      if (returnModifiedCode) {
        result.code = veryNewCode;
      }

      return result;
    } catch (error) {
      return createErrorResponse(
        currentCode,
        error instanceof Error ? error.message : "Code modification failed",
        { stack: error instanceof Error ? error.stack : undefined },
      );
    }
  },
  {
    name: "regex_replace",
    description: [
      "Performs code modifications using REGEX SEARCH/REPLACE patterns.",
      "REQUIRES: Array of {search (regex), replace} instructions,",
      "hash for version control, and optional returnModifiedCode flag.",
      "Regex format: /pattern/flags (e.g. '/\\bfoo\\b/gi' for whole-word foo, case-insensitive)",
      "Example input: {",
      "  instructions: [{search: '/foo/g', replace: 'bar'}],",
      "  hash: 'ef873ade',",
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
              .describe(
                "Regex pattern (use /pattern/flags format for best results)",
              ),
            replace: z
              .string()
              .describe(
                "Replacement text (can use regex capture groups like $1)",
              ),
          }),
        )
        .min(1)
        .max(4)
        .describe("Array of regex search/replace instructions"),
      hash: z
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
