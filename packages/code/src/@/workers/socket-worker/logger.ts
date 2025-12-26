export interface LogConfig {
  debug: boolean;
  info: boolean;
  warn: boolean;
  log: boolean;
}

export const LOG_CONFIG: LogConfig = {
  debug: true,
  info: true,
  warn: true,
  log: true,
};

export const logger = {
  debug: (message: string, ...args: unknown[]) => {
    if (LOG_CONFIG.debug) {
      console.warn(`[SocketWorker][DEBUG] ${message}`, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (LOG_CONFIG.info) {
      console.warn(`[SocketWorker][INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (LOG_CONFIG.warn) {
      console.warn(`[SocketWorker][WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[SocketWorker][ERROR] ${message}`, ...args);
  },
  log: (message: string, startTime: number) => {
    if (LOG_CONFIG.log) {
      const duration = Date.now() - startTime;
      console.warn(`[SocketWorker][log] ${message} (${duration.toFixed(2)}ms)`);
    }
  },
};
