/* eslint-env browser */

const nodeTiming = {};

function timerify<T>(fn: T): T {
  return fn;
}

function measure(
  name: string,
  startMark: string,
  endMark: string,
): PerformanceMeasure {
  try {
    return performance.measure(name, startMark, endMark);
  } catch (error: unknown) {
    // Handle case where browsers will throw when `startMark` does not exist, while Node.js defaults to 0
    if (
      error instanceof Error &&
      error.message.indexOf(`The mark '${startMark}' does not exist`) !== -1
    ) {
      return performance.measure(name, "", endMark);
    }
    throw error;
  }
}

export const performance = {
  clearMarks: globalThis.performance.clearMarks.bind(globalThis.performance),
  mark: globalThis.performance.mark.bind(globalThis.performance),
  measure: measure,
  now: globalThis.performance.now.bind(globalThis.performance),
  nodeTiming: nodeTiming,
  timeOrigin: globalThis.performance.timeOrigin,
  timerify: timerify,
};

export const PerformanceObserver = globalThis.PerformanceObserver;
