interface DebounceOptions {
  signal?: AbortSignal;
  edges?: Array<"leading" | "trailing">;
}

interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  schedule: () => void;
  cancel: () => void;
  flush: () => void;
}

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  debounceMs: number,
  { signal, edges }: DebounceOptions = {},
): DebouncedFunction<T> => {
  let pendingArgs: Parameters<T> | null = null;
  const leading = edges?.includes("leading") ?? false;
  const trailing = edges?.includes("trailing") ?? true;

  const invoke = function(this: unknown) {
    if (pendingArgs !== null) {
      func.apply(this, pendingArgs);
      pendingArgs = null;
    }
  };

  const onTimerEnd = function(this: unknown) {
    if (trailing) {
      invoke.call(this);
    }
    cancel();
  };

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const schedule = function(this: unknown) {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    const boundTimerEnd = onTimerEnd.bind(this);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      boundTimerEnd();
    }, debounceMs);
  };

  const cancelTimer = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const cancel = () => {
    cancelTimer();
    pendingArgs = null;
  };

  const flush = function(this: unknown) {
    cancelTimer();
    invoke.call(this);
  };

  function debounced(this: unknown, ...args: Parameters<T>): void {
    if (signal?.aborted) {
      return;
    }
    pendingArgs = args;
    const isFirstCall = timeoutId == null;
    schedule.call(this);
    if (leading && isFirstCall) {
      invoke.call(this);
    }
  }

  (debounced as DebouncedFunction<T>).schedule = schedule;
  (debounced as DebouncedFunction<T>).cancel = cancel;
  (debounced as DebouncedFunction<T>).flush = flush;

  signal?.addEventListener("abort", cancel, { once: true });

  return debounced as DebouncedFunction<T>;
};

export { type DebouncedFunction, type DebounceOptions };
