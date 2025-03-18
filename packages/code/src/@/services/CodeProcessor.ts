
import { importMapReplace, importMap } from "@/lib/importmap-utils";
import type { ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { formatCode, transpileCode } from "@/services/editorUtils";
import { RenderService } from "@/services/RenderService";
import type {  RunMessageResult } from "@/services/types";

export class CodeProcessor {
  private static renderService: RenderService;
  private currentIframe: HTMLIFrameElement | null = null;
  private currentMessageHandler: ((event: MessageEvent) => void) | null = null;

  constructor(codeSpace: string) {
    if (!CodeProcessor.renderService) {
      CodeProcessor.renderService = new RenderService(codeSpace);
    }
  }

  private cleanupPreviousRender() {
    // Remove any previous iframe and event listener to prevent old values from resolving
    if (this.currentIframe && this.currentIframe.parentNode) {
      this.currentIframe.parentNode.removeChild(this.currentIframe);
      this.currentIframe = null;
    }
    
    if (this.currentMessageHandler) {
      window.removeEventListener("message", this.currentMessageHandler);
      this.currentMessageHandler = null;
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
    const origin = window.location.origin;
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
        code,
        transpiled,
      };
      
 
      if (!skipRunning) {
        try {
          // Clean up any existing render process
          // this.cleanupPreviousRender();

          const blobUrlForTranspiledCode = URL.createObjectURL(
                    new Blob([
                      importMapReplace(transpiled.split("importMapReplace").join("")).split(
                        `from "/`,
                      ).join(
                        `from "${origin}/`,
                      ),
                    ], { type: "application/javascript" }),
                  );
          // Create an iframe which renders the transpiled code
          
          const iframeSource = `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
            <style>
              body {
                margin: 0;
                padding: 0;
              }
            </style>
            <script src="${origin}/@/workers/tw.worker.js"></script>
            <script type="importmap">
              ${JSON.stringify(importMap)}
            </script>
          </head>
          <body>
            <div id="embed"></div>
            <script type="module">
             import App from "${blobUrlForTranspiledCode}";
             import { renderApp } from "${origin}/@/lib/render-app.mjs";
             import { wait } from "${origin}/@/lib/wait.mjs";

                           let iteration = 0;

             renderApp({App:App}).then( async(renderedApp) => {

             while (renderedApp.rootElement.innerHTML === "" && iteration < 100) {
              iteration++;
            await wait(1);
            }

              renderedApp.toHtmlAndCss(renderedApp).then(({ html, css }) => {
               window.parent.postMessage({ type: "rendered", iteration: iteration, requestId: "${md5(transpiled)}", data: { html, css } }, "*");
             });
             }
             );

            

            </script>
          </body>
          </html>`;
          // Create and store iframe reference
          const iframe = document.createElement("iframe");
          this.currentIframe = iframe;
          iframe.style.display = "none";
          document.body.appendChild(iframe);
          iframe.srcdoc = iframeSource;
          
          // Create a Promise for handling the render result
          const renderPromise = new Promise<void>((resolve, reject) => {
            const messageHandler = (event: MessageEvent) => {
              if (event.data.type === "rendered" && event.data.requestId === md5(transpiled)) {
                try {
                  const iteration = event.data.iteration;
                  const { html, css } = event.data.data;
                  console.log(`Rendered in ${iteration} iterations`);
                  if (!html) {
                    reject(new Error("Render produced empty HTML"));
                    return;
                  }
                  Object.assign(processedSession, { html, css });
                  console.log("Processed session:", processedSession);
                  resolve();
                } catch (error) {
                  reject(new Error(`Error processing render result: ${error}`));
                }
              }
            };
            
            // Store reference to the message handler for cleanup
            this.currentMessageHandler = messageHandler;
            window.addEventListener("message", messageHandler);
            
            // First timeout for render operation (2 seconds)
            setTimeout(() => {
              reject(new Error("Render timeout - iframe didn't respond within 2 seconds"));
            }, 2000);
          });
          
          // Second timeout for overall process (5 seconds)
          const timeoutPromise = new Promise<void>((_, reject) => {
            setTimeout(() => {
              reject(new Error("Process timeout - operation took longer than 5 seconds"));
            }, 5000);
          });
          
          // Race the render against both timeouts
          await Promise.race([renderPromise, timeoutPromise]);
          
          // Clean up after successful render
          // this.cleanupPreviousRender();
        } catch (error) {
          // Clean up on error
          // this.cleanupPreviousRender();
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
