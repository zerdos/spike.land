import { getCodeSpace } from "@/hooks/use-code-space";
import { DOMError, getErrorMessage, MessageHandlingError, WebSocketError } from "@/lib/errors";
import type { Message } from "@/lib/interfaces";
import { ROUTES } from "@/lib/routes";
import { tryCatch } from "@/lib/try-catch";
// import { init } from "@/lib/tw-dev-setup";
import { WebSocketEventType, WebSocketState } from "./enums";
import type {
  IWebSocketManager,
  MessageData,
  RunMessageResult,
  WebSocketConfig,
  WebSocketDependencies,
  WebSocketSubscription,
} from "./types";

const DEFAULT_CONFIG: Required<WebSocketConfig> = {
  maxRetries: 3,
  retryDelay: 1000,
  connectionTimeout: 5000,
};

/**
 * WebSocket manager for handling real-time code synchronization
 * and communication between client and server.
 */
export class WebSocketManager implements IWebSocketManager {
  private readonly codeSpace: string;
  private readonly dependencies: WebSocketDependencies;
  private readonly config: Required<WebSocketConfig>;
  private state = WebSocketState.DISCONNECTED;
  private retryCount = 0;
  private readonly subscriptions = new Set<WebSocketSubscription>();

  constructor(
    dependencies: WebSocketDependencies,
    config: WebSocketConfig = {},
  ) {
    this.codeSpace = getCodeSpace(location.pathname);
    this.dependencies = dependencies;
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Initialize service worker with delay
    setTimeout(() => {
      this.dependencies.serviceWorker.setup().catch(this.handleError);
    }, 0);
  }

  /**
   * Initializes the WebSocket connection and sets up message handlers
   * @throws {WebSocketError} If initialization fails
   */
  public async init(): Promise<void> {
    const initPromise = async () => {
      await this.initializeResources();
      await this.setupRouteHandlers();
    };
    const { error } = await tryCatch(initPromise());

    if (error) {
      this.handleError(error);
      console.error("WebSocket initialization error:", {
        error: getErrorMessage(error),
        state: this.state,
      });
      throw new WebSocketError(
        `Failed to initialize WebSocket: ${getErrorMessage(error)}`,
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Handles code transpilation and returns the rendered result
   * @param transpiled - Transpiled code to run
   * @returns Promise resolving to rendered HTML/CSS or false if failed
   */
  public async handleRunMessage(
    transpiled: string,
  ): Promise<RunMessageResult | false> {
    return this.dependencies.messageHandler.handleRunMessage(transpiled);
  }

  /**
   * Cleans up resources and event listeners
   */
  public cleanup(): void {
    // This method is synchronous and handles its own errors, so tryCatch is not directly applicable
    // unless we were to make it async, which doesn't seem necessary here.
    // The existing try/catch for synchronous error handling is appropriate.
    try {
      this.dependencies.messageHandler.cleanup();
      window.onmessage = null;
      this.unsubscribeAll();
    } catch (error) {
      this.handleError(error);
      throw new WebSocketError(`Cleanup failed: ${getErrorMessage(error)}`);
    }
  }

  /**
   * Initialize required resources
   * @private
   */
  private async initializeResources(): Promise<void> {
    // const { error } = await tryCatch(init()); // Assuming init() is async
    // if (error) {
    //   console.error("Resource initialization error:", error);
    //   // Continue execution as this is non-critical
    // } else {
    //   // console.warn("Resource loading complete"); // Changed to console.warn
    // }
  }

  /**
   * Set up route-specific handlers
   * @private
   */
  private async setupRouteHandlers(): Promise<void> {
    const currentPath = location.pathname;

    if (currentPath === ROUTES.LIVE(this.codeSpace)) {
      await this.handleLivePage();
    } else if (currentPath === ROUTES.LIVE_CMS(this.codeSpace)) {
      await this.handleLivePage();
    } else if (currentPath === ROUTES.DEHYDRATED(this.codeSpace)) {
      await this.handleDehydratedPage();
    } else {
      await this.handleDefaultPage();
    }
  }

  /**
   * Handle live page setup and initialization
   * @private
   */
  private async handleLivePage(): Promise<void> {
    const livePagePromise = async () => {
      await this.dependencies.sessionSynchronizer.init();

      // Subscribe to code session updates
      this.dependencies.sessionSynchronizer.subscribe((data: MessageData) => {
        console.warn("Code session update:", data); // Changed to console.warn
        // Additional live page specific handling can be added here
      });

      this.state = WebSocketState.CONNECTED;
    };

    const { error } = await tryCatch(livePagePromise());
    if (error) {
      this.handleError(error);
      throw new WebSocketError(
        `Failed to initialize live page: ${getErrorMessage(error)}`,
        error instanceof Error ? error : undefined,
      );
    }
  }

  /**
   * Handle dehydrated page rendering
   * @private
   */
  private async handleDehydratedPage(): Promise<void> {
    const handleDehydratedContent = (event: MessageEvent | Event): void => {
      if (!(event instanceof MessageEvent)) return;
      const { html, css } = event.data as MessageData;
      try {
        const embedElement = document.getElementById("embed");
        if (!embedElement) {
          throw new DOMError("Embed element not found", "embed");
        }

        embedElement.innerHTML = `
          <style type="text/css">${css}</style>
          <div>${html}</div>
        `;
      } catch (error) {
        this.handleError(error);
        if (error instanceof DOMError) {
          throw error;
        }
        throw new WebSocketError(
          `Failed to handle dehydrated content: ${getErrorMessage(error)}`,
        );
      }
    };

    this.subscribe(WebSocketEventType.MESSAGE, handleDehydratedContent);
  }

  /**
   * Handle default page message routing
   * @private
   */
  private async handleDefaultPage(): Promise<void> {
    const messageHandler = async (event: unknown): Promise<void> => {
      const data = (event as MessageEvent).data;
      const { error } = await tryCatch(this.dependencies.messageHandler.handleMessage(data));
      if (error) {
        this.handleError(error);
        // Decide if this should re-throw or just log.
        // For now, re-throwing to maintain original behavior.
        throw new MessageHandlingError("Failed to handle message", data);
      }
    };

    this.subscribe(
      WebSocketEventType.MESSAGE,
      messageHandler as (event: Event | MessageEvent<any>) => void,
    );

    // Set up window message handler
    window.onmessage = async (event: unknown): Promise<void> => {
      const { error } = await tryCatch(
        this.dependencies.messageHandler.handleMessage(event as Message),
      );
      if (error) {
        this.handleError(error);
        // Decide if this should re-throw or just log.
        throw new MessageHandlingError("Failed to handle window message", { event });
      }
    };
  }

  /**
   * Subscribe to WebSocket events
   * @private
   */
  private subscribe(
    type: WebSocketEventType,
    handler: (event: MessageEvent | Event) => void,
  ): () => void {
    const subscription: WebSocketSubscription = {
      type,
      handler,
      unsubscribe: () => this.subscriptions.delete(subscription),
    };
    this.subscriptions.add(subscription);
    return subscription.unsubscribe;
  }

  /**
   * Unsubscribe all event handlers
   * @private
   */
  private unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions.clear();
  }

  /**
   * Handle errors with proper logging and state management
   * @private
   */
  private readonly handleError = (error: unknown): void => {
    const errorMessage = getErrorMessage(error);
    console.error("WebSocket error:", errorMessage);
    this.state = WebSocketState.ERROR;

    // Implement retry logic for recoverable errors
    if (this.retryCount < this.config.maxRetries) {
      this.retryCount++;
      this.state = WebSocketState.RECONNECTING;
      setTimeout(() => {
        console.warn( // Changed to console.warn
          `Retrying connection (${this.retryCount}/${this.config.maxRetries})...`,
        );
        this.init().catch(console.error);
      }, this.config.retryDelay);
    }
  };
}
