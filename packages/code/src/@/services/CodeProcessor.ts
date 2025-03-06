import type { ICodeSession } from "@/lib/interfaces";
import { formatCode, transpileCode } from "@/services/editorUtils";
import { RenderService } from "@/services/RenderService";
import type { IWebSocketManager, RunMessageResult } from "@/services/types";

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
    getSession: () => ICodeSession,
  ): Promise<ICodeSession | false> {
    if (signal.aborted) return false;
    try {
      const code = await this.formatCode(rawCode);
      if (signal.aborted) return false;

      if (code === getSession().code) {
        return getSession();
      }

      const transpiled = await this.transpileCode(code);
      if (signal.aborted) return false;
      if (getSession().transpiled === transpiled) {
        return getSession();
      }

      const processedSession = {
        html: getSession().html,
        css: getSession().css,
      };

      if (!skipRunning) {
        try {
          // Check if window.frames[0] exists and has webSocketManager
          if (window.frames[0] && "webSocketManager" in window.frames[0]) {
            const runResult = await (window.frames[0] as unknown as {
              webSocketManager: IWebSocketManager;
            }).webSocketManager.handleRunMessage(transpiled);

            if (!runResult) {
              return false;
            }

            if (runResult.html && runResult.html !== processedSession.html) {
              processedSession.html = runResult.html;
            }

            if (runResult.css && runResult.css !== processedSession.css) {
              processedSession.css = runResult.css;
            }
            return {
              ...getSession(),
              ...runResult,
              code,
              transpiled,
            };
          } else {
            console.warn("WebSocketManager not found in iframe. HTML and CSS will not be updated.");
            // Create a mock WebSocketManager to handle the run message
            const mockWebSocketManager: IWebSocketManager = {
              init: async () => {},
              handleRunMessage: async (transpiled: string) => {
                try {
                  const renderService = new RenderService(getSession().codeSpace);
                  return await renderService.handleRender(
                    await renderService.updateRenderedApp({ transpiled }),
                  );
                } catch (error) {
                  console.error("Error in mock handleRunMessage:", error);
                  return false;
                }
              },
              cleanup: () => {},
            };

            const runResult = await mockWebSocketManager.handleRunMessage(transpiled);

            if (!runResult) {
              return false;
            }

            if (runResult.html && runResult.html !== processedSession.html) {
              processedSession.html = runResult.html;
            }

            if (runResult.css && runResult.css !== processedSession.css) {
              processedSession.css = runResult.css;
            }
          }
        } catch (error) {
          console.error("Error running code:", error);
          return false;
        }
      }

      if (signal.aborted) {
        return false;
      }

      return {
        ...getSession(),
        ...processedSession,
        code,
        transpiled,
      };
    } catch (error) {
      console.error("Error processing code:", error);
      return false;
    }
  }

  private async formatCode(code: string): Promise<string> {
    try {
      return await formatCode(code);
    } catch (error) {
      console.error("Error formatting code:", { code });
      throw new Error(`Error formatting code: ${error}`);
    }
  }

  private async transpileCode(code: string): Promise<string> {
    try {
      const transpiled = await transpileCode(code);
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
      const renderedApp = await CodeProcessor.renderService.updateRenderedApp({
        transpiled,
      });
      const result = await CodeProcessor.renderService.handleRender(
        renderedApp,
      );

      if (!result) {
        throw new Error("Running code produced no output");
      }

      return {
        html: result.html || "<div></div>",
        css: result.css || "",
      };
    } catch (error) {
      console.error("Error running code:", { transpiled });
      throw new Error(`Error running code: ${error}`);
    }
  }
}
