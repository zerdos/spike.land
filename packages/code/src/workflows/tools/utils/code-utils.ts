import { updateSearchReplace } from "@/lib/chat-utils";
import { md5 } from "@/lib/md5";
import {
  COMPLEX_CHANGE_THRESHOLD,
  SIGNIFICANT_CHANGE_RATIO,
  SMALL_FILE_THRESHOLD,
} from "../../../config/workflow-config";

import type { CodeChangeMetrics } from "../../workflow";

/**
 * Verify code integrity using document hash
 */
export const verifyCodeIntegrity = (
  code: string,
  expectedHash: string,
): boolean => {
  const actualHash = md5(code);
  if (actualHash !== expectedHash) {
    console.error(`Hash mismatch! Expected ${expectedHash} got ${actualHash}`);
    return false;
  }
  return true;
};

/**
 * Determines if a code modification should return the full code
 * based on the size and complexity of the changes
 */
export const shouldReturnFullCode = (
  instructions: string,
  currentCode: string,
): boolean => {
  // Always return full code for small files or undefined input
  if (!currentCode || currentCode.length < SMALL_FILE_THRESHOLD) return true;
  if (!instructions) return true;

  // Return full code for complex instructions
  if (instructions.length > COMPLEX_CHANGE_THRESHOLD) return true;

  // Check the size of potential changes
  const modifiedCode = updateSearchReplace(instructions, currentCode);
  if (modifiedCode === currentCode) return true;

  // Calculate change ratio
  const changeSize = Math.abs(modifiedCode.length - currentCode.length);
  const changeRatio = changeSize / currentCode.length;

  return changeRatio > SIGNIFICANT_CHANGE_RATIO;
};
/**
 * Calculate changes between original and modified code
 */
export const calculateCodeChanges = (
  original: string,
  modified: string,
): CodeChangeMetrics => {
  const sizeChange = modified.length - original.length;
  const originalLines = original.split("\n");
  const modifiedLines = modified.split("\n");

  let changedLines = 0;
  const minLength = Math.min(originalLines.length, modifiedLines.length);

  for (let i = 0; i < minLength; i++) {
    if (originalLines[i] !== modifiedLines[i]) {
      changedLines++;
    }
  }

  changedLines += Math.abs(originalLines.length - modifiedLines.length);
  const tokenSavings = Math.floor(modified.length / 4);

  return {
    sizeChange,
    lineCount: {
      original: originalLines.length,
      modified: modifiedLines.length,
    },
    changedLines,
    tokenSavings,
  };
};

/**
 * Log code changes with detailed metrics
 */
export const logCodeChanges = (
  initialCode: string,
  finalCode: string,
): void => {
  if (initialCode === finalCode) return;

  const hash = md5(initialCode);
  const finalHash = md5(finalCode);
  const changes = calculateCodeChanges(initialCode, finalCode);

  console.warn("Code modified successfully", {
    changes,
    hash,
    finalHash,
    hashChanged: hash !== finalHash,
  });

  if (
    Math.abs(changes.sizeChange) > 100 ||
    Math.abs(changes.lineCount.modified - changes.lineCount.original) > 10
  ) {
    console.warn("Significant code changes detected:", {
      sizeChangePct: ((changes.sizeChange / initialCode.length) * 100).toFixed(2) + "%",
      lineChangePct: (((changes.lineCount.modified - changes.lineCount.original) /
        changes.lineCount.original) * 100).toFixed(2) + "%",
    });
  }
};

/**
 * Estimate token savings for a given code string
 */
export const estimateTokenSavings = (code: string): number => {
  if (!code) return 0;
  // Rough estimate: 1 token ≈ 4 characters
  return Math.floor(code.length / 4);
};
