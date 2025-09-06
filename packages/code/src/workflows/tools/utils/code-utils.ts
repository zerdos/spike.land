import { md5 } from "@/lib/md5";

// Configuration constants for code analysis
export const SMALL_FILE_THRESHOLD = 1000;
export const COMPLEX_CHANGE_THRESHOLD = 500;
export const SIGNIFICANT_CHANGE_RATIO = 0.3;

export interface CodeChangeMetrics {
  sizeChange: number;
  lineCount: {
    original: number;
    modified: number;
  };
  changedLines: number;
}

/**
 * Verify code integrity by comparing hash
 */
export const verifyCodeIntegrity = (code: string, hash: string): boolean => {
  if (!code || !hash) {
    return false;
  }
  
  const calculatedHash = md5(code);
  return calculatedHash === hash;
};

/**
 * Calculate metrics about code changes
 */
export const calculateCodeChanges = (oldCode: string, newCode: string): CodeChangeMetrics => {
  const oldLines = oldCode ? oldCode.split('\n') : [''];
  const newLines = newCode ? newCode.split('\n') : [''];
  
  // Calculate size change
  const sizeChange = newCode.length - oldCode.length;
  
  // Count changed lines (simplified diff)
  let changedLines = 0;
  const maxLines = Math.max(oldLines.length, newLines.length);
  
  for (let i = 0; i < maxLines; i++) {
    const oldLine = i < oldLines.length ? oldLines[i] : '';
    const newLine = i < newLines.length ? newLines[i] : '';
    
    if (oldLine !== newLine) {
      changedLines++;
    }
  }
  
  return {
    sizeChange,
    lineCount: {
      original: oldLines.length,
      modified: newLines.length,
    },
    changedLines,
  };
};

/**
 * Log code changes to console for debugging
 */
export const logCodeChanges = (oldCode: string, newCode: string): void => {
  const metrics = calculateCodeChanges(oldCode, newCode);
  
  if (metrics.changedLines > 0) {
    console.warn("Code modified successfully", {
      sizeChange: metrics.sizeChange,
      originalLines: metrics.lineCount.original,
      modifiedLines: metrics.lineCount.modified,
      changedLines: metrics.changedLines,
    });
  }
};

/**
 * Determine if full code should be returned based on size and complexity
 */
export const shouldReturnFullCode = (instructions: string, code: string): boolean => {
  // For small files, always return full code
  if (code.length < SMALL_FILE_THRESHOLD) {
    return true;
  }
  
  // For complex changes (long instructions), return full code
  if (instructions.length > COMPLEX_CHANGE_THRESHOLD) {
    return true;
  }
  
  return false;
};

/**
 * Estimate token savings by not returning code
 */
export const estimateTokenSavings = (code: string | null | undefined): number => {
  if (!code || typeof code !== 'string') {
    return 0;
  }
  
  // Rough approximation: 1 token per 4 characters
  return Math.floor(code.length / 4);
};