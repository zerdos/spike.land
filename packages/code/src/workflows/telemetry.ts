/**
 * Simple telemetry module for tracking workflow performance and events
 */

interface TelemetryEvent {
  name: string;
  data: Record<string, unknown>;
  timestamp: number;
}

interface Timer {
  startTime: number;
}

class Telemetry {
  private timers = new Map<string, Timer>();
  private events: TelemetryEvent[] = [];

  startTimer(name: string): void {
    this.timers.set(name, {
      startTime: Date.now(),
    });
  }

  stopTimer(name: string, data?: Record<string, unknown>): number {
    const timer = this.timers.get(name);
    if (!timer) {
      console.warn(`Timer "${name}" not found`);
      return 0;
    }

    const duration = Date.now() - timer.startTime;
    this.timers.delete(name);

    this.trackEvent(`${name}.completed`, {
      ...data,
      duration,
    });

    return duration;
  }

  trackEvent(name: string, data?: Record<string, unknown>): void {
    const event: TelemetryEvent = {
      name,
      data: data ?? {},
      timestamp: Date.now(),
    };

    this.events.push(event);

    // Log to console in development
    if (process.env['NODE_ENV'] === 'development') {
      console.debug(`[Telemetry] ${name}`, data);
    }

    // Keep only the last 1000 events to prevent memory leaks
    if (this.events.length > 1000) {
      this.events.splice(0, this.events.length - 1000);
    }
  }

  trackError(name: string, error: Error, data?: Record<string, unknown>): void {
    this.trackEvent(`${name}.error`, {
      ...data,
      error: error.message,
      stack: error.stack,
    });
  }

  getEvents(): TelemetryEvent[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events.length = 0;
  }

  getActiveTimers(): string[] {
    return Array.from(this.timers.keys());
  }
}

// Export a singleton instance
export const telemetry = new Telemetry();