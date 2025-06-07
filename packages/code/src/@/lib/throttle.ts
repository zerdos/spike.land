import { debounce, type DebouncedFunction, type DebounceOptions } from "@/lib/debounce";

interface ThrottleOptions extends Omit<DebounceOptions, "edges"> {
  edges?: Array<"leading" | "trailing">;
}

function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  throttleMs: number | undefined,
  { signal, edges = ["leading", "trailing"] }: ThrottleOptions = {},
): DebouncedFunction<T> {
  let pendingAt: number | null = null;
  const options = { edges, signal } as DebounceOptions;
  const debounced = debounce(func, throttleMs || 0, options);

  function throttled(this: unknown, ...args: Parameters<T>): void {
    if (pendingAt == null) {
      pendingAt = Date.now();
    } else {
      if (Date.now() - pendingAt >= (throttleMs ?? 0)) {
        pendingAt = Date.now();
        debounced.cancel();
        debounced.apply(this, args);
      }
    }
    debounced.apply(this, args);
  }

  (throttled as DebouncedFunction<T>).cancel = debounced.cancel;
  (throttled as DebouncedFunction<T>).flush = debounced.flush;
  (throttled as DebouncedFunction<T>).schedule = () => {}; // No-op for compatibility

  return throttled as DebouncedFunction<T>;
}

export { throttle, type ThrottleOptions };
