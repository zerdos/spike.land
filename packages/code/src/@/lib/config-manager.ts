interface Config {
  swVersion: string;
  [key: string]: unknown;
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config = {
    swVersion: "1.0.0",
  };

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async getConfig(): Promise<Config> {
    return this.config;
  }

  setConfig(config: Partial<Config>): void {
    this.config = { ...this.config, ...config };
  }
}
