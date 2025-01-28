import { debounce, type DebouncedFunction, type DebounceOptions } from "@/utils/debounce";

interface ThrottleOptions extends Omit<DebounceOptions, "edges"> {
  edges?: Array<"leading" | "trailing">;
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  throttleMs: number | undefined,
  { signal, edges = ["leading", "trailing"] }: ThrottleOptions = {},
): DebouncedFunction<T> {
  let pendingAt: number | null = null;
  const debounced = debounce(func, throttleMs, { signal, edges });

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
