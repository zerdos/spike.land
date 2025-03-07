import type { RunMessageResult } from "@/services/types";

export interface ICodeProcessor {
  /**
   * Processes the code by formatting, transpiling, and optionally running it
   * @param rawCode The code to process
   * @param skipRunning Whether to skip the code execution step
   * @param signal AbortSignal for cancellation
   * @returns Updated session data or false if processing failed
   */
  process(
    rawCode: string,
    skipRunning: boolean,
    signal: AbortSignal,
  ): Promise<RunMessageResult | false>;

  runCode(code: string): Promise<RunMessageResult>;
}
