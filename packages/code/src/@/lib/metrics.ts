/**
 * Workflow metrics collector
 */
interface OperationMetrics {
  count: number;
  totalTime: number;
  avgTime: number;
  min: number;
  max: number;
  errors: number;
}

export class WorkflowMetrics {
  private static instance: WorkflowMetrics;
  private data: Record<string, OperationMetrics> = {};

  private constructor() {}

  public static getInstance(): WorkflowMetrics {
    if (!WorkflowMetrics.instance) {
      WorkflowMetrics.instance = new WorkflowMetrics();
    }
    return WorkflowMetrics.instance;
  }

  /**
   * Record a workflow operation
   */
  public recordOperation(
    name: string,
    durationMs: number,
    isError = false,
  ): void {
    if (!this.data[name]) {
      this.data[name] = {
        count: 0,
        totalTime: 0,
        avgTime: 0,
        min: durationMs,
        max: durationMs,
        errors: 0,
      };
    }

    const stats = this.data[name];
    stats.count++;
    stats.totalTime += durationMs;
    stats.avgTime = stats.totalTime / stats.count;
    stats.min = Math.min(stats.min, durationMs);
    stats.max = Math.max(stats.max, durationMs);

    if (isError) {
      stats.errors++;
    }
  }

  /**
   * Get metrics for a specific operation
   */
  public getMetrics(name: string): OperationMetrics | null {
    return this.data[name] || null;
  }

  /**
   * Get metrics summary
   */
  public getSummary() {
    const summary: Record<string, {
      operationCount: number;
      avgDurationMs: number;
      successRate: string;
      p95LatencyMs?: number;
    }> = {};

    for (const [name, stats] of Object.entries(this.data)) {
      summary[name] = {
        operationCount: stats.count,
        avgDurationMs: Math.round(stats.avgTime),
        successRate: `${((stats.count - stats.errors) / stats.count * 100).toFixed(1)}%`,
      };
    }

    return summary;
  }

  /**
   * Get performance report
   */
  public getPerformanceReport(): string {
    let report = "=== Workflow Performance Report ===\n\n";

    for (const [name, metrics] of Object.entries(this.getSummary())) {
      report += `${name}:\n`;
      report += `  Operations: ${metrics.operationCount}\n`;
      report += `  Avg Duration: ${metrics.avgDurationMs}ms\n`;
      report += `  Success Rate: ${metrics.successRate}\n\n`;
    }

    return report;
  }

  /**
   * Reset all metrics
   */
  public reset(): void {
    this.data = {};
  }
}

// Export singleton instance
export const metrics = WorkflowMetrics.getInstance();

/**
 * Performance measurement method decorator factory
 */
export function measure(operationName: string) {
  return function measureDecorator(
    _target: Record<string, unknown>,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    // Preserve the original method type
    descriptor.value = function wrapped(this: unknown, ...args: unknown[]) {
      const start = Date.now();
      const result = originalMethod.apply(this, args);

      // Handle both async and sync methods
      if (result instanceof Promise) {
        return result.then((value) => {
          const duration = Date.now() - start;
          metrics.recordOperation(operationName, duration);
          return value;
        }).catch((error) => {
          const duration = Date.now() - start;
          metrics.recordOperation(operationName, duration, true);
          throw error;
        });
      }

      const duration = Date.now() - start;
      metrics.recordOperation(operationName, duration);
      return result;
    };

    // Preserve method properties
    Object.defineProperty(descriptor.value, "name", {
      value: `${operationName}::${originalMethod.name}`,
      configurable: true,
    });

    return descriptor;
  };
}

/**
 * Cache hit rate metrics
 */
export class CacheMetrics {
  private hits = 0;
  private misses = 0;

  public recordHit(): void {
    this.hits++;
  }

  public recordMiss(): void {
    this.misses++;
  }

  public getHitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }

  public getStats() {
    const total = this.hits + this.misses;
    const hitRate = this.getHitRate();
    return {
      hits: this.hits,
      misses: this.misses,
      total,
      hitRate: `${(hitRate * 100).toFixed(1)}%`,
    };
  }

  public reset(): void {
    this.hits = 0;
    this.misses = 0;
  }
}

// Export cache metrics instances
export const hashCacheMetrics = new CacheMetrics();
export const toolResponseCacheMetrics = new CacheMetrics();
export const codeAnalysisCacheMetrics = new CacheMetrics();
