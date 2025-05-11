export class KVLogger {
  private prefix: string;
  private store: KVNamespace;

  constructor(prefix: string, store: KVNamespace) {
    this.prefix = prefix;
    this.store = store;
  }

  async log(
    message: string,
    level: "info" | "warn" | "error" = "info",
  ): Promise<void> {
    const timestamp = new Date();
    const kv = this.store;
    const dateString = timestamp.toISOString().split("T")[0]; // YYYY-MM-DD
    const timeString = timestamp.toISOString().split("T")[1].split(".")[0]; // HH:MM:SS
    const key = `${this.prefix}:${dateString}:${timeString}`;
    const value = JSON.stringify({ level, message });

    try {
      await kv.put(key, value);
      console.warn(`Log entry saved: ${key}`);
    } catch (error) {
      console.error("Failed to save log entry:", error);
    }
  }

  async getLogs(
    date: string,
  ): Promise<Array<{ timestamp: string; level: string; message: string; }>> {
    const pattern = `${this.prefix}:${date}:*`;
    const kv = this.store;

    try {
      const { keys } = await kv.list<string>({ prefix: pattern });
      const logEntries = await Promise.all(
        keys.map(async (key) => {
          const value = await kv.get(key.name);
          const [, , hours, minutes, seconds] = key.name.split(/[:.]/);
          const timeString = `${hours}:${minutes}:${seconds}`;
          const { level, message } = JSON.parse(value as string);
          return { timestamp: `${date}T${timeString}`, level, message };
        }),
      );

      return logEntries.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    } catch (error) {
      console.error("Failed to retrieve logs:", error);
      return [];
    }
  }
}

// // Example usage
// async function exampleUsage() {
//   const logger = new KVLogger('myapp');

//   // Logging examples
//   await logger.log('Application started', 'info');
//   await logger.log('Warning: Low memory', 'warn');
//   await logger.log('Error: Database connection failed', 'error');

//   // Retrieving logs for a specific date
//   const today = new Date().toISOString().split('T')[0];
//   const logs = await logger.getLogs(today);
//   console.warn('Today\'s logs:', logs);
// }

// exampleUsage();
