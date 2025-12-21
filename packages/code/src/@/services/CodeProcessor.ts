import type { CompilationState } from "../../components/CompilationIndicator";
import { getInitialDarkMode } from "@/hooks/use-dark-mode";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import type { ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { tryCatch } from "@/lib/try-catch";
import { formatCode, transpileCode } from "@/services/editorUtils";
import { RenderService } from "@/services/RenderService";
import type { RunMessageResult } from "@/services/types";

/** Timeout for individual iframe rendering operations (milliseconds) */
const RENDER_OPERATION_TIMEOUT_MS = 2000;

/** Timeout for the entire code processing operation (milliseconds) */
const OVERALL_PROCESS_TIMEOUT_MS = 5000;

/**
 * Processes user code through formatting, transpilation, and rendering stages.
 *
 * The CodeProcessor orchestrates the complete code execution pipeline:
 * 1. Formats code for consistency
 * 2. Transpiles TypeScript/JSX to JavaScript
 * 3. Executes code in a sandboxed iframe
 * 4. Extracts rendered HTML and CSS
 *
 * It manages state transitions through a CompilationState callback and supports
 * cancellation via AbortSignal for responsive UX.
 *
 * @example
 * ```typescript
 * const processor = new CodeProcessor("my-code-space");
 * const result = await processor.process(
 *   "const App = () => <div>Hello</div>",
 *   false,
 *   abortSignal,
 *   getSession,
 *   replaceIframe,
 *   onStateChange
 * );
 * if (result) {
 *   console.log(result.html); // Rendered output
 * }
 * ```
 */
export class CodeProcessor {
  /** Singleton RenderService instance shared across all CodeProcessor instances */
  private static renderService: RenderService;

  /**
   * Creates a new CodeProcessor instance.
   *
   * @param codeSpace - Identifier for the code execution space/session
   */
  constructor(codeSpace: string) {
    if (!CodeProcessor.renderService) {
      CodeProcessor.renderService = new RenderService(codeSpace);
    }
  }

  /**
   * Processes code through formatting, transpilation, and optional rendering.
   *
   * Orchestrates the complete code processing pipeline:
   * - Stage 1: Format code for consistency
   * - Stage 2: Transpile TypeScript/JSX to JavaScript
   * - Stage 3: Execute in iframe and capture rendered HTML/CSS (if not skipped)
   *
   * Supports cancellation via AbortSignal and reports state changes through callback.
   * Returns false if any stage fails or processing is aborted.
   *
   * @param rawCode - The raw source code to process
   * @param skipRunning - If true, skips rendering/execution step; only formats and transpiles
   * @param signal - AbortSignal for cancelling the operation
   * @param getSession - Callback to retrieve the current code session
   * @param replaceIframe - Optional callback to replace the preview iframe DOM element
   * @param onStateChange - Optional callback invoked with state transitions
   *   (idle -> formatting -> transpiling -> rendering -> ready/error)
   *
   * @returns Updated ICodeSession with code, transpiled, html, and css; or false on failure/abort
   *
   * @throws Indirectly handles errors (logs them) and returns false rather than throwing
   */
  async process(
    rawCode: string,
    skipRunning: boolean,
    signal: AbortSignal,
    getSession: () => ICodeSession,
    replaceIframe?: (newIframe: HTMLIFrameElement) => void,
    onStateChange?: (state: CompilationState) => void,
  ): Promise<ICodeSession | false> {
    const origin = window.location.origin;
    if (signal.aborted) return false;

    // Formatting stage
    onStateChange?.("formatting");
    const { data: code, error: formatError } = await tryCatch(
      this.formatCode(rawCode),
    );

    if (signal.aborted) {
      return false;
    }

    if (formatError) {
      console.error("Error formatting code:", formatError);
      onStateChange?.("error");
      return false;
    }

    if (code === getSession()?.code) {
      onStateChange?.("ready");
      return getSession();
    }

    // Transpiling stage
    onStateChange?.("transpiling");
    const { data: transpiled, error: transpileError } = await tryCatch(
      this.transpileCode(code),
    );
    if (signal.aborted || transpileError) {
      if (transpileError) {
        console.error("Error transpiling code:", transpileError);
        onStateChange?.("error");
      }
      return false;
    }

    if (getSession().transpiled === transpiled) {
      onStateChange?.("ready");
      return getSession();
    }

    const processedSession = {
      code,
      transpiled,
    };

    if (!skipRunning) {
      // Rendering stage
      onStateChange?.("rendering");
      // Call the helper method to handle iframe execution.
      // Pass processedSession so it can be updated with html and css.
      const executionSuccessful = await this._handleCodeExecutionInIframe(
        transpiled,
        origin,
        replaceIframe,
        processedSession,
      );
      if (!executionSuccessful) {
        // If iframe execution failed, an error would have been logged by the helper.
        // Return false to indicate overall processing failure.
        onStateChange?.("error");
        return false;
      }
    }

    if (signal.aborted) {
      return false;
    }

    onStateChange?.("ready");
    return {
      ...getSession(),
      ...processedSession,
      code,
      transpiled,
    };
  }

  /**
   * Executes transpiled code in a sandboxed iframe and captures rendered output.
   *
   * Creates an iframe with the transpiled code, waits for rendering to complete,
   * and extracts the rendered HTML and CSS. Updates processedSession with results.
   *
   * The iframe communicates via postMessage to send back rendering results with
   * a requestId (md5 hash of transpiled code) to match results to requests.
   *
   * @param transpiled - The transpiled JavaScript code to execute
   * @param origin - The window origin for proper import path resolution
   * @param replaceIframe - Optional callback to replace the preview iframe element
   * @param processedSession - Session object to mutate with html and css results
   *
   * @returns true if iframe execution succeeded; false if it failed, timed out, or was aborted
   *
   * @private
   */
  private async _handleCodeExecutionInIframe(
    transpiled: string,
    origin: string,
    replaceIframe: ((newIframe: HTMLIFrameElement) => void) | undefined,
    processedSession: {
      code: string;
      transpiled: string;
      html?: string;
      css?: string;
    },
  ): Promise<boolean> {
    try {
      // The cleanupPreviousRender was commented out. If uncommented,
      // its purpose is to ensure that any previous rendering iframe and its associated
      // message listener are removed before starting a new render. This prevents
      // multiple iframes from existing or old listeners from incorrectly processing messages.
      // this.cleanupPreviousRender();

      // Create a Blob URL for the transpiled JavaScript code.
      // This is necessary to import the code as a module in the sandboxed iframe.
      // The importMapReplace function ensures that import paths are correctly resolved
      // according to the project's import map.
      const { data: blobUrlForTranspiledCode, error: blobError } = await tryCatch(
        Promise.resolve(URL.createObjectURL(
          new Blob([
            importMapReplace(transpiled.split("importMapReplace").join(""))
              .split(
                `from "/`,
              ).join(
                `from "${origin}/`,
              ),
          ], { type: "application/javascript" }),
        )),
      );

      if (blobError) {
        console.error("Error creating blob URL:", blobError);
        return false;
      }
      const isDarkMode = getInitialDarkMode();

      // Create an iframe which renders the transpiled code
      const iframeSource = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
            rel="stylesheet"
          />
          <style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            html,body,#embed {
              isolation: isolate;
              height: 100vh; /* Fallback for browsers that don't support dvh/svh */
              height: 100dvh; /* Use dynamic viewport height */
              height: 100svh; /* Use static viewport height */
              font-family: "Roboto Flex", sans-serif;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: ${isDarkMode ? "#1e1e1e" : "#ffffff"};
              color: ${isDarkMode ? "#ffffff" : "#000000"};
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
             window.parent.postMessage({ type: "rendered", iteration: iteration, requestId: "${
        md5(transpiled)
      }", data: { html, css } }, "*");
           });
           }
           );

          
          /*
           * The script inside the iframe imports the transpiled code (App) from the Blob URL.
           * It then uses \`renderApp\` (imported from an mjs bundle) to render the App.
           * A loop \`while (renderedApp.rootElement.innerHTML === "" && iteration < 100)\`
           * waits for the app to render something into the #embed div, with a timeout (100 iterations * 1ms wait).
           * Once rendered, it extracts HTML and CSS using \`toHtmlAndCss\` and posts it back to the parent window
           * using \`window.parent.postMessage\`. The \`requestId\` (md5 of transpiled code) ensures the parent
           * window can match this message to the correct render operation.
           */
          </script>
        </body>
        </html>`;

      // If a `replaceIframe` callback is provided (e.g., by DraggableWindow),
      // it's used to directly replace the preview iframe's DOM node. This allows
      // for a more seamless update of the preview.
      if (replaceIframe) {
        const newIframe = document.createElement("iframe");
        newIframe.srcdoc = iframeSource;
        newIframe.title = "Live preview";
        newIframe.className = "w-full h-full border-0";
        replaceIframe(newIframe);
      } else {
        // Fallback: If no `replaceIframe` callback is given, a hidden iframe is created
        // and appended to the body. This might be for older implementations or specific
        // use cases where direct DOM replacement isn't desired/possible.
        const iframe = document.createElement("iframe");
        // this.currentIframe = iframe;
        iframe.style.display = "none"; // Hidden as it's only for code execution and message passing
        document.body.appendChild(iframe);
        iframe.srcdoc = iframeSource;
      }

      // This Promise waits for the 'rendered' message from the iframe.
      // It sets up a message listener that filters for messages with the correct
      // type ('rendered') and requestId (matching the md5 of the transpiled code).
      // This ensures that we only process the result of the current render operation.
      const renderPromise = new Promise<void>((resolve, reject) => {
        const messageHandler = (event: MessageEvent) => {
          // Check if the message is from our iframe and matches the current render request
          if (
            event.data.type === "rendered" &&
            event.data.requestId === md5(transpiled)
          ) {
            try {
              const iteration = event.data.iteration;
              const { html, css } = event.data.data;
              console.warn(`Rendered in ${iteration} iterations`); // Changed to warn
              if (!html) {
                reject(new Error("Render produced empty HTML"));
                return;
              }
              Object.assign(processedSession, { html, css });
              console.warn("Processed session:", processedSession); // Changed to warn
              resolve();
            } catch (error) {
              reject(
                new Error(
                  `Error processing render result: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                ),
              );
            }
          }
        };

        // Store reference to the message handler so it can be removed later if needed (e.g., in cleanupPreviousRender)
        // this.currentMessageHandler = messageHandler;
        window.addEventListener("message", messageHandler);

        // Timeout for the iframe rendering operation. If the iframe doesn't post back
        // the 'rendered' message within RENDER_OPERATION_TIMEOUT_MS, this promise rejects.
        setTimeout(() => {
          reject(
            new Error(
              `Render timeout - iframe didn't respond within ${RENDER_OPERATION_TIMEOUT_MS}ms`,
            ),
          );
        }, RENDER_OPERATION_TIMEOUT_MS);
      });

      // Overall timeout for the entire `process` step (including iframe rendering).
      // This acts as a safety net to prevent the process from hanging indefinitely.
      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              `Process timeout - operation took longer than ${OVERALL_PROCESS_TIMEOUT_MS}ms`,
            ),
          );
        }, OVERALL_PROCESS_TIMEOUT_MS);
      });

      // Race the `renderPromise` (waiting for iframe message) against the `timeoutPromise`.
      // The first one to resolve or reject determines the outcome.
      const { error: raceError } = await tryCatch(
        Promise.race([renderPromise, timeoutPromise]),
      );

      if (raceError) {
        console.error(
          "Error during rendering (race condition or timeout):",
          raceError,
        );
        // If cleanupPreviousRender were active, it would be called here to remove the failed iframe/listener.
        // this.cleanupPreviousRender();
        return false;
      }

      // If rendering was successful and didn't timeout:
      // If cleanupPreviousRender were active, it would be called here to clean up the successful render's iframe/listener
      // if this instance of CodeProcessor is designed to only manage one render at a time.
      // this.cleanupPreviousRender();
    } catch (error) {
      // Catch any other errors that might occur during the try block (e.g., iframe creation issues).
      // If cleanupPreviousRender were active, it would be called here.
      // this.cleanupPreviousRender();
      console.error("Error running code in iframe (outer try-catch):", error);
      return false; // Indicate failure
    }
    // } // This was an extra closing brace from the original refactor attempt, removing it.
    return true; // Indicates success
  }

  /**
   * Formats code for consistency using the project's formatter.
   *
   * @param code - The raw code to format
   *
   * @returns The formatted code
   *
   * @throws Error if formatting fails or returns no data
   *
   * @private
   */
  private async formatCode(code: string): Promise<string> {
    const { data, error } = await tryCatch(formatCode(code));

    if (error) {
      console.error("Error formatting code:", { code, error }); // Added error to log
      throw new Error(
        `Error formatting code: ${error?.message || String(error)}`,
      );
    }
    if (!data) { // Added check for null/undefined data
      console.error("Formatting code returned no data", { code });
      throw new Error("Formatting code returned no data");
    }
    return data;
  }

  /**
   * Transpiles TypeScript/JSX code to plain JavaScript.
   *
   * @param code - The formatted code to transpile
   *
   * @returns The transpiled JavaScript code
   *
   * @throws Error if transpilation fails or produces empty output
   *
   * @private
   */
  private async transpileCode(code: string): Promise<string> {
    const { data: transpiled, error } = await tryCatch(transpileCode(code));

    if (error) {
      console.error("Error Transpiled code:", { code, error }); // Changed to console.error and added error
      throw new Error(
        `Error transpiling code: ${error?.message || String(error)}`,
      );
    }

    if (!transpiled) {
      console.error(
        "Error Transpiled code: Transpilation resulted in empty output",
        { code },
      ); // Changed to console.error
      throw new Error("Transpilation resulted in empty output");
    }

    return transpiled;
  }

  /**
   * Re-renders the app using transpiled code without formatting or transpiling.
   *
   * Used when transpiled code is received from the server and only re-rendering
   * is needed to update the preview. Skips formatting and transpilation steps.
   *
   * @param transpiled - The already-transpiled JavaScript code to execute
   * @param signal - AbortSignal for cancelling the operation
   * @param getSession - Callback to retrieve the current code session
   * @param replaceIframe - Optional callback to replace the preview iframe DOM element
   *
   * @returns Updated ICodeSession with rendered html and css; or false on failure/abort
   */
  async reRenderFromTranspiled(
    transpiled: string,
    signal: AbortSignal,
    getSession: () => ICodeSession,
    replaceIframe?: (newIframe: HTMLIFrameElement) => void,
  ): Promise<ICodeSession | false> {
    console.warn("🔄 CodeProcessor.reRenderFromTranspiled called");

    const origin = window.location.origin;
    if (signal.aborted) return false;

    // Skip formatting and transpiling, go directly to rendering
    const processedSession = {
      code: getSession().code,
      transpiled: transpiled,
    };

    const executionSuccessful = await this._handleCodeExecutionInIframe(
      transpiled,
      origin,
      replaceIframe,
      processedSession,
    );

    if (!executionSuccessful) {
      console.error("❌ Re-render execution failed");
      return false;
    }

    if (signal.aborted) {
      return false;
    }

    console.warn(
      "✅ CodeProcessor.reRenderFromTranspiled completed successfully",
    );

    return {
      ...getSession(),
      ...processedSession,
      transpiled,
    };
  }

  /**
   * Runs transpiled code and captures the rendered output.
   *
   * Updates the RenderService with new transpiled code and extracts the resulting
   * HTML and CSS from the rendered component tree.
   *
   * @param transpiled - The transpiled JavaScript code to execute
   *
   * @returns Object containing rendered html and css strings
   *
   * @throws Error if rendering fails or produces no output
   */
  async runCode(transpiled: string): Promise<RunMessageResult> {
    // Update the rendered app first
    const { data: renderedApp, error: updateError } = await tryCatch(
      CodeProcessor.renderService.updateRenderedApp({
        transpiled,
      }),
    );

    if (updateError) {
      console.error("Error updating rendered app:", { transpiled });
      throw new Error(`Error updating rendered app: ${String(updateError)}`);
    }

    const { data: result, error: renderError } = await tryCatch(
      CodeProcessor.renderService.handleRender(renderedApp),
    );

    if (renderError) {
      console.error("Error handling render:", { transpiled });
      throw new Error(`Error handling render: ${String(renderError)}`);
    }

    if (!result) {
      throw new Error("Running code produced no output");
    }

    return {
      html: result.html || "<div></div>",
      css: result.css || "",
    };
  }
}
