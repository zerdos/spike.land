import type { IBroadcastChannelWrapper } from "../interfaces/IDependencyWrapper";
import { DependencyError } from "../interfaces/IDependencyWrapper";

/**
 * Adapter for BroadcastChannel to implement IBroadcastChannelWrapper interface
 * Provides error handling and standardized interface
 */
export class BroadcastChannelAdapter implements IBroadcastChannelWrapper {
  private readonly channel: BroadcastChannel;
  private readonly subscriptions = new Set<(event: MessageEvent) => void>();

  constructor(channelName: string) {
    try {
      this.channel = new BroadcastChannel(channelName);
      this.setupMessageHandler();
    } catch (error) {
      throw new DependencyError(
        `Failed to create BroadcastChannel: ${channelName}`,
        "BroadcastChannel",
        error,
      );
    }
  }

  async postMessage(message: unknown): Promise<void> {
    try {
      this.channel.postMessage(message);
    } catch (error) {
      throw new DependencyError(
        "Failed to post message to BroadcastChannel",
        "BroadcastChannel",
        error,
      );
    }
  }

  subscribe(handler: (event: MessageEvent) => void): () => void {
    this.subscriptions.add(handler);
    return () => {
      this.subscriptions.delete(handler);
    };
  }

  async close(): Promise<void> {
    try {
      this.subscriptions.clear();
      this.channel.close();
    } catch (error) {
      throw new DependencyError(
        "Failed to close BroadcastChannel",
        "BroadcastChannel",
        error,
      );
    }
  }

  private setupMessageHandler(): void {
    this.channel.onmessage = (event: MessageEvent) => {
      this.subscriptions.forEach((handler) => {
        try {
          handler(event);
        } catch (error) {
          // Log error but don't throw to prevent one handler from breaking others
          console.error("BroadcastChannel handler error:", error);
        }
      });
    };
  }
}

/**
 * Factory function to create BroadcastChannel adapter
 */
export function createBroadcastChannelAdapter(channelName: string): IBroadcastChannelWrapper {
  return new BroadcastChannelAdapter(channelName);
}
