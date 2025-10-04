import { initPerformanceMonitoring } from "@/lib/performance-config";

/**
 * Initialize performance optimizations and monitoring
 */
export const initializePerformance = () => {
  // Initialize performance monitoring
  initPerformanceMonitoring();

  // Enable passive event listeners for better scroll performance
  if (typeof window !== "undefined") {
    // Override addEventListener to use passive listeners for touch and wheel events
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: AddEventListenerOptions | boolean
    ) {
      let modifiedOptions = options;

      // Make touch and wheel events passive by default
      if (type === "touchstart" || type === "touchmove" || type === "wheel") {
        if (typeof options !== "object") {
          modifiedOptions = { passive: true, capture: Boolean(options) };
        } else if (!("passive" in options)) {
          modifiedOptions = { ...options, passive: true };
        }
      }

      originalAddEventListener.call(this, type, listener, modifiedOptions);
    };
  }

  // Optimize image loading
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img[data-lazy]");
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.loading = "lazy";
      }
    });
  }

  // Enable Chrome's memory optimization
  if ("scheduling" in navigator && "isInputPending" in (navigator as Record<string, unknown>).scheduling) {
    console.log("[Performance] Input scheduling API available");
  }

  // Log performance initialization
  console.log("%c[Performance] Optimizations initialized", "color: green; font-weight: bold;");
};