/**
 * Performance monitoring and budgets configuration
 */

// Bundle size budgets
export const BUNDLE_SIZE_BUDGETS = {
  // Main app bundle
  main: {
    maxSize: 200_000, // 200KB
    warnSize: 150_000, // 150KB
  },
  // Monaco editor bundle
  monacoEditor: {
    maxSize: 2_000_000, // 2MB
    warnSize: 1_500_000, // 1.5MB
  },
  // Vendor bundles
  vendorReact: {
    maxSize: 150_000, // 150KB
    warnSize: 100_000, // 100KB
  },
  vendorUI: {
    maxSize: 300_000, // 300KB
    warnSize: 250_000, // 250KB
  },
  vendorAI: {
    maxSize: 500_000, // 500KB
    warnSize: 400_000, // 400KB
  },
  // Total bundle size
  total: {
    maxSize: 5_000_000, // 5MB
    warnSize: 4_000_000, // 4MB
  },
};

// Performance metrics targets
export const PERFORMANCE_TARGETS = {
  // Core Web Vitals
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)

  // Custom metrics
  editorLoadTime: 3000, // Monaco editor load time (ms)
  initialBundleLoadTime: 2000, // Initial JS bundle load time (ms)
  routeTransitionTime: 200, // Route transition time (ms)
};

// Resource hints configuration
export const RESOURCE_HINTS = {
  preconnect: [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ],
  dns_prefetch: [
    "https://cdn.jsdelivr.net",
    "https://unpkg.com",
  ],
  preload: [
    // Critical fonts
    { href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossorigin: true },
    // Critical CSS
    { href: "/assets/css/critical.css", as: "style" },
  ],
  prefetch: [
    // Monaco Editor chunks (prefetch for better performance when needed)
    "/assets/js/monaco-editor-[hash].js",
  ],
};

// Performance observer configuration
export const setupPerformanceObserver = () => {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return;
  }

  // Log performance metrics
  const logMetric = (name: string, value: number, rating?: string) => {
    const color = rating === "good" ? "green" : rating === "needs-improvement" ? "orange" : "red";
    console.log(
      `%c[Performance] ${name}: ${value.toFixed(2)}${rating ? ` (${rating})` : ""}`,
      `color: ${color}; font-weight: bold;`
    );
  };

  // Observe Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (!lastEntry) return;
      const value = lastEntry.startTime;
      const rating = value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
      logMetric("LCP", value, rating);
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch (_e) {
    console.warn("LCP observer not supported");
  }

  // Observe First Input Delay
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if ("processingStart" in entry && "startTime" in entry) {
          const value = (entry as PerformanceEntry & { processingStart: number; }).processingStart - entry.startTime;
          const rating = value <= 100 ? "good" : value <= 300 ? "needs-improvement" : "poor";
          logMetric("FID", value, rating);
        }
      });
    });
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch (_e) {
    console.warn("FID observer not supported");
  }

  // Observe Cumulative Layout Shift
  let clsValue = 0;
  const clsEntries: PerformanceEntry[] = [];

  try {
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if ("value" in entry && !((entry as PerformanceEntry & { hadRecentInput?: boolean; }).hadRecentInput)) {
          clsValue += (entry as PerformanceEntry & { value: number; }).value;
          clsEntries.push(entry);
        }
      });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // Log CLS when the page is hidden
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        const rating = clsValue <= 0.1 ? "good" : clsValue <= 0.25 ? "needs-improvement" : "poor";
        logMetric("CLS", clsValue, rating);
      }
    });
  } catch (_e) {
    console.warn("CLS observer not supported");
  }

  // Log navigation timing metrics
  window.addEventListener("load", () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigation) {
        logMetric("DNS", navigation.domainLookupEnd - navigation.domainLookupStart);
        logMetric("TCP", navigation.connectEnd - navigation.connectStart);
        logMetric("TTFB", navigation.responseStart - navigation.requestStart);
        logMetric("Response", navigation.responseEnd - navigation.responseStart);
        logMetric("DOM Processing", navigation.domComplete - navigation.responseEnd);
        logMetric("Load Complete", navigation.loadEventEnd - navigation.fetchStart);
      }
    }, 0);
  });
};

// Resource loading optimization
export const optimizeResourceLoading = () => {
  if (typeof document === "undefined") {
    return;
  }

  // Add resource hints to document head
  const head = document.head;

  // Add preconnect hints
  RESOURCE_HINTS.preconnect.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    head.appendChild(link);
  });

  // Add DNS prefetch hints
  RESOURCE_HINTS.dns_prefetch.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = href;
    head.appendChild(link);
  });

  // Add preload hints
  RESOURCE_HINTS.preload.forEach((hint) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = hint.href;
    link.as = hint.as;
    if (hint.type) link.type = hint.type;
    if (hint.crossorigin) link.crossOrigin = "anonymous";
    head.appendChild(link);
  });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window !== "undefined") {
    setupPerformanceObserver();
    optimizeResourceLoading();

    // Log initial metrics
    console.log("%c[Performance] Monitoring initialized", "color: blue; font-weight: bold;");
    console.log("Bundle size budgets:", BUNDLE_SIZE_BUDGETS);
    console.log("Performance targets:", PERFORMANCE_TARGETS);
  }
};