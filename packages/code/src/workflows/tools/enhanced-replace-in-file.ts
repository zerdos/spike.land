import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { z } from "zod";
import type { CodeModification } from "../chat-langchain";
import { shouldReturnFullCode, verifyCodeIntegrity } from "./utils/code-utils";

// Simple tool interface since @langchain/core is not available
export interface Tool<TInput, TOutput> {
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
): CodeModification {
  return {
    code: currentCode,
    error: errorMessage,
    currentFileContent: currentCode,
    hash: md5(currentCode),
    ...additionalProps,
  };
}

export const getEnhancedReplaceInFileTool = (codeSession: ICode) =>
  createTool(
    async (args: {
      searchReplace: Array<{ search: string; replace: string; }>;
      hash: string;
      returnModifiedCode: boolean;
      instructions: string;
    }): Promise<CodeModification> => {
      const { searchReplace, hash, returnModifiedCode, instructions } = args;
      try {
        const currentCode = await codeSession.getCode();
        const currentHash = md5(currentCode);

        // Verify code integrity
        if (!verifyCodeIntegrity(currentCode, hash)) {
          return createErrorResponse(
            currentCode,
            "Document hash mismatch. Code has been modified outside this session.",
            { currentHash },
          );
        }

        let modifiedCode = currentCode;
        const validationErrors: string[] = [];

        // Apply search/replace operations
        for (const { search, replace } of searchReplace) {
          if (!search) {
            validationErrors.push("Search pattern cannot be empty");
            continue;
          }

          try {
            // Handle both string and regex patterns
            if (search.startsWith("/") && search.lastIndexOf("/") > 0) {
              // Regex pattern
              const lastSlashIndex = search.lastIndexOf("/");
              const pattern = search.slice(1, lastSlashIndex);
              const flags = search.slice(lastSlashIndex + 1);
              const regex = new RegExp(pattern, flags);

              if (!modifiedCode.match(regex)) {
                validationErrors.push(`Pattern not found: ${search}`);
                continue;
              }

              modifiedCode = modifiedCode.replace(regex, replace);
            } else {
              // String search
              if (!modifiedCode.includes(search)) {
                validationErrors.push(`Search text not found: "${search}"`);
                continue;
              }

              modifiedCode = modifiedCode.replace(
                new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
                replace,
              );
            }
          } catch (error) {
            validationErrors.push(
              `Invalid regex pattern "${search}": ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
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
            "No changes detected. Search patterns did not match any content.",
          );
        }

        // Update code in session
        await codeSession.setCode(modifiedCode);
        const finalCode = await codeSession.getCode();
        const finalHash = md5(finalCode);

        // Determine if we should return the full code
        const shouldReturn = returnModifiedCode ??
          (instructions ? shouldReturnFullCode(instructions, finalCode) : false);

        const result: CodeModification = {
          hash: finalHash,
        };

        if (shouldReturn) {
          result.code = finalCode;
          result.currentFileContent = finalCode;
        }

        return result;
      } catch (error) {
        const currentCode = await codeSession.getCode().catch(() => "");
        return createErrorResponse(
          currentCode,
          error instanceof Error ? error.message : "Code modification failed",
          { stack: error instanceof Error ? error.stack : undefined },
        );
      }
    },
    {
      name: "enhanced_replace_in_file",
      description: [
        "Enhanced file modification tool with string/regex search and replace.",
        "Supports both literal string matching and regex patterns.",
        "Automatically determines whether to return full code based on complexity.",
        "REQUIRES: Array of {search, replace} instructions and hash for version control.",
        "Optional: returnModifiedCode flag and instructions for context.",
        "Example: {",
        "  searchReplace: [{search: 'oldText', replace: 'newText'}],",
        "  hash: 'ef873ade',",
        "  returnModifiedCode: false,",
        "  instructions: 'Update variable names'",
        "}",
      ].join("\n"),
      schema: z.object({
        searchReplace: z
          .array(
            z.object({
              search: z
                .string()
                .min(1)
                .describe("Text to search for (literal string or /regex/flags format)"),
              replace: z
                .string()
                .describe("Replacement text (supports regex capture groups like $1)"),
            }),
          )
          .min(1)
          .max(10)
          .describe("Array of search/replace operations to perform"),
        hash: z
          .string()
          .length(8)
          .describe("Hash of current document for version validation"),
        returnModifiedCode: z
          .boolean()
          .default(false)
          .describe("Force return full modified code when true"),
        instructions: z
          .string()
          .default("")
          .describe("Context about the modifications for intelligent code return decisions"),
      }),
    },
  );
