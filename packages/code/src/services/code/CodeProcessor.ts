import {
  formatCode as formatCodeUtil,
  runCode,
  transpileCode as transpileCodeUtil,
} from "../../components/editorUtils";
import { RunMessageResult } from "../websocket/types";

export class CodeProcessor {
  /**
   * Formats and transpiles the code (optionally runs it),
   * then returns updated session info or false on failure.
   */
  async process(
    rawCode: string,
    skipRunning: boolean,
    signal: AbortSignal,
  ): Promise<RunMessageResult | false> {
    try {
      const formattedCode = await this.formatCode(rawCode);
      if (signal.aborted) return false;

      const transpiledCode = await this.transpileCode(formattedCode);
      if (signal.aborted) return false;

      let html = "<div></div>";
      let css = "";

      if (!skipRunning) {
        try {
          const res = await CodeProcessor.runCode(transpiledCode);
          if (signal.aborted) return false;

          html = res.html || "<div></div>";
          css = res.css || "";
        } catch (error) {
          console.error("Error running code:", error);
        }
      }

      if (signal.aborted) return false;

      return {
        html,
        css,
      };
    } catch (error) {
      console.error("Error processing code:", error);
      return false;
    }
  }

  private async formatCode(code: string): Promise<string> {
    try {
      return await formatCodeUtil(code);
    } catch (error) {
      console.error("Error formatting code:", { code });
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string): Promise<string> {
    try {
      const transpiled = await transpileCodeUtil(code);
      if (!transpiled) {
        console.log("Error Transpiled code:", { code });
        throw new Error("Transpilation resulted in empty output");
      }
      return transpiled;
    } catch (error) {
      console.log("Error Transpiled code:", { code });
      throw new Error(`Error transpiling code: ${error}`);
    }
  }

  static async runCode(code: string): Promise<RunMessageResult> {
    try {
      const result = await runCode(code);
      if (!result) {
        throw new Error("Running code produced no output");
      }
      return result;
    } catch (error) {
      console.error("Error running code:", { code });
      throw new Error(`Error running code: ${error}`);
    }
  }
}
