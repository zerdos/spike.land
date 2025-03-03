import { DEFAULT_RETURN_MODIFIED_CODE } from "@/config/workflow-config";
import { md5 } from "@/lib/md5";
import { shouldReturnFullCode } from "@/tools/utils/code-utils";
import { hashCache } from "../../lib/caching";
import { metrics } from "../../lib/metrics";

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
    if (toolCall.name === "code_modification" && toolCall.args) {
      try {
        const args = typeof toolCall.args === "string"
          ? JSON.parse(toolCall.args)
          : toolCall.args;

        if (args.instructions) {
          return shouldReturnFullCode(args.instructions, code);
        }
      } catch (e) {
        console.warn("Failed to parse tool call args", e);
      }
    }
  }
  return DEFAULT_RETURN_MODIFIED_CODE;
};

/**
 * Gets a hash for the given code, using cache when available
 */
export const getHashWithCache = (code: string, operationName = "hash.calculation"): string => {
  const cacheKey = code;
  const cachedHash = hashCache.get(cacheKey);

  if (cachedHash) {
    metrics.recordOperation("hash.cache.hit", 0);
    return cachedHash;
  }

  const hashStart = performance.now();
  const hash = md5(code);
  const hashDuration = performance.now() - hashStart;
  metrics.recordOperation(operationName, hashDuration);
  hashCache.set(cacheKey, hash);

  return hash;
};
