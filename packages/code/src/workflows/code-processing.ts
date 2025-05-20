import { md5 } from "@/lib/md5";
import { metrics } from "@/lib/metrics";
import { DEFAULT_RETURN_MODIFIED_CODE } from "../config/workflow-config";
import { hashCache } from "./caching";
import { shouldReturnFullCode } from "./tools/utils/code-utils";

/**
 * Attempts to extract code from a JSON string
 */
export const tryExtractCodeFromJson = (jsonString: string): string | null => {
  try {
    const content = JSON.parse(jsonString);
    // Check if content has code property with string value
    if (content?.code && typeof content.code === "string") {
      return content.code;
    }
    // If no code but has hash, return null to keep previous code
    if (!content?.code && content?.hash) {
      return null;
    }
  } catch (e) {
    // Silently fail on JSON parse errors
  }
  return null;
};

/**
 * Determines whether to return modified code based on tool calls
 */
export const determineReturnModifiedCode = (
  toolCalls: Array<{ name: string; args?: unknown; }>,
  code: string,
): boolean => {
  for (const toolCall of toolCalls) {
    // Handle both code_modification and replace_in_file tools
    if (
      (toolCall.name === "code_modification" ||
        toolCall.name === "replace_in_file") &&
      toolCall.args
    ) {
      try {
        const args = typeof toolCall.args === "string"
          ? JSON.parse(toolCall.args)
          : toolCall.args;

        // Log the tool call for debugging
        console.warn(`Determining returnModifiedCode for ${toolCall.name}:`, {
          toolName: toolCall.name,
          argsKeys: Object.keys(args || {}),
        });

        // For code_modification tool
        if (toolCall.name === "code_modification" && args.instructions) {
          return shouldReturnFullCode(args.instructions, code);
        }

        // For replace_in_file tool
        if (toolCall.name === "replace_in_file" && args.diff) {
          return shouldReturnFullCode(args.diff, code);
        }
      } catch (e) {
        console.warn(`Failed to parse tool call args for ${toolCall.name}:`, e);
      }
    }
  }

  console.warn(
    "Using default return modified code setting:",
    DEFAULT_RETURN_MODIFIED_CODE,
  );
  return DEFAULT_RETURN_MODIFIED_CODE;
};

/**
 * Gets a hash for the given code, using cache when available
 */
export const getHashWithCache = (
  code: string,
  operationName = "hash.calculation",
): string => {
  const cacheKey = code;
  const cachedHash = hashCache.get(cacheKey)?.value;

  if (cachedHash) {
    metrics.recordOperation("hash.cache.hit", 0);
    return cachedHash;
  }

  const hashStart = Date.now();
  const hash = md5(code);
  const hashDuration = Date.now() - hashStart;
  metrics.recordOperation(operationName, hashDuration);
  hashCache.set(cacheKey, { value: hash });

  return hash;
};
