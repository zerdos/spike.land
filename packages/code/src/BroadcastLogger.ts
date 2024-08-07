// BroadcastLogger.js

export class BroadcastLogger {
  constructor() {
    this.originalConsole = window.console;
    this.logs = [];
  }

  log(...args) {
    const decoratedLog = this.decorateLog("log", ...args);
    this.broadcast(decoratedLog);
    this.originalConsole.log(...args);
  }

  table(...args) {
    const decoratedLog = this.decorateLog("table", ...args);
    this.broadcast(decoratedLog);
    this.originalConsole.table(...args);
  }

  info(...args) {
    const decoratedLog = this.decorateLog("info", ...args);
    this.broadcast(decoratedLog);
    this.originalConsole.info(...args);
  }

  warn(...args) {
    const decoratedLog = this.decorateLog("warn", ...args);
    this.broadcast(decoratedLog);
    this.originalConsole.warn(...args);
  }

  error(...args) {
    const decoratedLog = this.decorateLog("error", ...args);
    this.broadcast(decoratedLog);
    this.originalConsole.error(...args);
  }

  decorateLog(type, ...args) {
    const timestamp = new Date().toISOString();
    const url = window.location.href;
    return {
      type,
      timestamp,
      url,
      message: args.map((arg) => typeof arg === "object" ? JSON.stringify(arg) : String(arg)).join(" "),
    };
  }

  broadcast(log) {
    // Here you would implement the logic to broadcast the log to other terminals
    // For demonstration, we'll just add it to the logs array
    this.originalConsole[log.type](log.message);
    this.logs.push(log);

    // Example: If you're using WebSockets, you might send the log like this:
    // if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    //   this.socket.send(JSON.stringify(log));
    // }
  }

  install() {
    window.console = this;
  }

  uninstall() {
    window.console = this.originalConsole;
  }
}

// Create and install the BroadcastLogger

// Export the instance for external use if needed
export default () => (new BroadcastLogger("console-chaπnel")).install();
