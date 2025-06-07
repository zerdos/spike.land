/**
 * Types for telemetry events
 */
export interface TelemetryEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  measurements?: Record<string, number>;
  timestamp: Date;
}

export interface TelemetryOptions {
  enabled?: boolean;
  debug?: boolean;
  flushInterval?: number;
}

/**
 * Telemetry system for tracking workflow performance and debugging
 */
export class Telemetry {
  private static instance: Telemetry;
  private events: TelemetryEvent[] = [];
  private timers = new Map<string, number>();
  private options: TelemetryOptions;

  private constructor(options: TelemetryOptions = {}) {
    this.options = {
      enabled: true,
      debug: false,
      flushInterval: 60000, // 1 minute
      ...options,
    };

    if (this.options.flushInterval) {
      setInterval(() => this.flush(), this.options.flushInterval);
    }
  }

  public static getInstance(options?: TelemetryOptions): Telemetry {
    if (!Telemetry.instance) {
      Telemetry.instance = new Telemetry(options);
    }
    return Telemetry.instance;
  }

  public trackEvent(
    name: string,
    properties?: Record<string, string | number | boolean>,
    measurements?: Record<string, number>,
  ): void {
    if (!this.options.enabled) return;

    const event: TelemetryEvent = {
      name,
      properties: properties || {},
      measurements: measurements || {},
      timestamp: new Date(),
    };

    this.events.push(event);

    if (this.options.debug) {
      console.debug("[Telemetry]", event);
    }
  }

  public startTimer(name: string): void {
    this.timers.set(name, Date.now());
  }

  public stopTimer(
    name: string,
    properties?: Record<string, string | number | boolean>,
  ): number | undefined {
    const start = this.timers.get(name);
    if (start) {
      const duration = Date.now() - start;
      this.timers.delete(name);

      this.trackEvent(
        `${name}.duration`,
        { ...properties, durationMs: duration.toFixed(2) },
        { duration },
      );

      return duration;
    }
    return undefined;
  }

  public flush(): TelemetryEvent[] {
    if (this.events.length === 0) return [];

    // In a real implementation, you would send these events to your telemetry service
    // For now, we'll just log them in debug mode and return them
    if (this.options.debug) {
      console.debug("[Telemetry] Flushing events:", this.events);
    }

    const events = [...this.events];
    this.events = [];
    return events;
  }

  /**
   * Track error events with context
   */
  public trackError(
    error: Error,
    properties?: Record<string, string | number | boolean>,
  ): void {
    const errorProperties: Record<string, string | number | boolean> = {
      ...properties,
      errorName: error.name,
      errorMessage: error.message,
      stackTrace: error.stack || "No stack trace available",
    };

    this.trackEvent("error", errorProperties);
  }

  /**
   * Track workflow progress
   */
  public trackProgress(
    stage: string,
    percent: number,
    details?: Record<string, string | number | boolean>,
  ): void {
    this.trackEvent("workflow.progress", {
      ...details,
      stage,
      percent: percent.toFixed(2),
    });
  }

  /**
   * Track code modifications
   */
  public trackCodeModification(
    type: "create" | "update" | "delete",
    details: {
      filePath: string;
      linesChanged?: number;
      bytesChanged?: number;
    },
  ): void {
    this.trackEvent("code.modification", {
      type,
      ...details,
    });
  }

  /**
   * Track model interactions
   */
  public trackModelInteraction(
    details: {
      model: string;
      promptTokens: number;
      completionTokens: number;
      duration: number;
      success: boolean;
      error?: string;
    },
  ): void {
    this.trackEvent("model.interaction", {
      ...details,
      totalTokens: details.promptTokens + details.completionTokens,
    });
  }

  /**
   * Track cache operations
   */
  public trackCacheOperation(
    operation: "hit" | "miss" | "set",
    cacheType: string,
    details?: Record<string, string | number | boolean>,
  ): void {
    this.trackEvent("cache.operation", {
      operation,
      cacheType,
      ...details,
    });
  }
}

// Export singleton instance
export const telemetry = Telemetry.getInstance();
