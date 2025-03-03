import { Config } from "../../types/service-worker";
import { CacheUtils } from "./cache-utils";

export class ConfigManager {
  private static instance: ConfigManager;
  private currentConfig: Config | null = null;
  private configPromise: Promise<Config> | null = null;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async getConfig(): Promise<Config> {
    if (this.currentConfig && Date.now() <= this.currentConfig.validUntil) {
      return this.currentConfig;
    }

    if (!this.configPromise) {
      this.configPromise = this.fetchConfig();
    }

    this.currentConfig = await this.configPromise;
    this.configPromise = null;
    return this.currentConfig;
  }

  private async fetchConfig(): Promise<Config> {
    try {
      const response = await CacheUtils.retry(async () => {
        const res = await fetch("/sw-config.json");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res;
      });

      const config = await response.json() as Config;
      return config;
    } catch (error) {
      console.error("Failed to fetch configuration:", error);
      return {
        killSwitch: true,
        version: "",
        swVersion: "",
        validUntil: 0,
      };
    }
  }
}
