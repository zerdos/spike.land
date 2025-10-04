import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Custom performance hooks for optimization
 */

// Hook for debouncing expensive operations
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for throttling function calls
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      return callback(...args);
    }

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      lastRun.current = Date.now();
      callback(...args);
    }, delay - (now - lastRun.current));
  }, [callback, delay]) as T;
}

// Hook for caching expensive computations
interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache size
}

export function useCache<K, V>(
  keyGenerator: (key: K) => string,
  options: CacheOptions = {}
): {
  get: (key: K) => V | undefined;
  set: (key: K, value: V) => void;
  clear: () => void;
  size: number;
} {
  const { ttl = 5 * 60 * 1000, maxSize = 100 } = options; // Default 5 min TTL, max 100 items
  const cache = useRef<Map<string, { value: V; timestamp: number; }>>(new Map());

  const get = useCallback((key: K): V | undefined => {
    const cacheKey = keyGenerator(key);
    const cached = cache.current.get(cacheKey);

    if (!cached) return undefined;

    const now = Date.now();
    if (ttl && now - cached.timestamp > ttl) {
      cache.current.delete(cacheKey);
      return undefined;
    }

    return cached.value;
  }, [keyGenerator, ttl]);

  const set = useCallback((key: K, value: V) => {
    const cacheKey = keyGenerator(key);

    // Implement LRU if max size reached
    if (cache.current.size >= maxSize && !cache.current.has(cacheKey)) {
      const firstKey = cache.current.keys().next().value;
      if (firstKey) cache.current.delete(firstKey);
    }

    cache.current.set(cacheKey, {
      value,
      timestamp: Date.now(),
    });
  }, [keyGenerator, maxSize]);

  const clear = useCallback(() => {
    cache.current.clear();
  }, []);

  const size = cache.current.size;

  return { get, set, clear, size };
}

// Hook for lazy loading with intersection observer
export function useLazyLoad(
  threshold = 0.1,
  rootMargin = "100px"
): {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
} {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isIntersecting };
}

// Hook for optimized list rendering with virtualization
interface VirtualListOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualList<T>(
  items: T[],
  options: VirtualListOptions
): {
  visibleItems: T[];
  totalHeight: number;
  offsetY: number;
  handleScroll: (scrollTop: number) => void;
} {
  const { itemHeight, containerHeight, overscan = 3 } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const calculations = useMemo(() => {
    const totalHeight = items.length * itemHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length,
      startIndex + visibleCount + 2 * overscan
    );
    const offsetY = startIndex * itemHeight;
    const visibleItems = items.slice(startIndex, endIndex);

    return {
      visibleItems,
      totalHeight,
      offsetY,
    };
  }, [items, itemHeight, containerHeight, overscan, scrollTop]);

  const handleScroll = useCallback((newScrollTop: number) => {
    setScrollTop(newScrollTop);
  }, []);

  return {
    ...calculations,
    handleScroll,
  };
}

// Hook for request animation frame
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  deps: React.DependencyList = []
): void {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callbackRef.current(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}

// Hook for monitoring component render performance
export function useRenderMonitor(componentName: string): void {
  const renderCount = useRef(0);
  const renderStartTime = useRef<number | undefined>(undefined);

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    renderCount.current++;
    const renderEndTime = performance.now();
    const renderTime = renderStartTime.current
      ? renderEndTime - renderStartTime.current
      : 0;

    if (process.env["NODE_ENV"] === "development") {
      console.log(
        `[Performance] ${componentName} rendered (${renderCount.current}x) in ${renderTime.toFixed(2)}ms`
      );
    }
  });
}

// Hook for prefetching resources
export function usePrefetch(urls: string[]): void {
  useEffect(() => {
    urls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = url;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    });
  }, [urls]);
}

// Hook for detecting slow network
export function useNetworkSpeed(): "fast" | "slow" | "unknown" {
  const [speed, setSpeed] = useState<"fast" | "slow" | "unknown">("unknown");

  useEffect(() => {
    if ("connection" in navigator) {
      const connection = (navigator as Record<string, unknown>)["connection"] as {
        effectiveType?: string;
        addEventListener: (event: string, handler: () => void) => void;
        removeEventListener: (event: string, handler: () => void) => void;
      };

      const updateSpeed = () => {
        if (connection.effectiveType === "4g") {
          setSpeed("fast");
        } else if (connection.effectiveType === "3g" || connection.effectiveType === "2g") {
          setSpeed("slow");
        } else {
          setSpeed("unknown");
        }
      };

      updateSpeed();
      connection.addEventListener("change", updateSpeed);

      return () => {
        connection.removeEventListener("change", updateSpeed);
      };
    }
    return undefined;
  }, []);

  return speed;
}