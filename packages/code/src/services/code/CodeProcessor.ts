import {
  formatCode as formatCodeUtil,
  transpileCode as transpileCodeUtil,
} from "../../components/editorUtils";
import {  RunMessageResult } from "../websocket/types";
import { RenderService } from "../render/RenderService";

export class CodeProcessor {

  private static renderService: RenderService;

  constructor(codeSpace: string) {
    if (!CodeProcessor.renderService) {
      CodeProcessor.renderService = new RenderService(codeSpace);
    }
  }

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
          const res = await this.runCode(transpiledCode);
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

   async runCode(transpiled: string): Promise<RunMessageResult> {
    try {
      // Update the rendered app first
      const renderedApp = await CodeProcessor.renderService.updateRenderedApp({ transpiled });
      const result = await CodeProcessor.renderService.handleRender(renderedApp);
      
      if (!result) {
        throw new Error("Running code produced no output");
      }

      return {
        html: result.html || "<div></div>",
        css: result.css || ""
      };

    } catch (error) {
      console.error("Error running code:", { transpiled });
      throw new Error(`Error running code: ${error}`);
    }
  }
}
