import type { IStorageWrapper } from "../interfaces/IDependencyWrapper";
import { DependencyError } from "../interfaces/IDependencyWrapper";

/**
 * Adapter for localStorage to implement IStorageWrapper interface
 * Provides error handling and async interface
 */
export class LocalStorageAdapter implements IStorageWrapper {
  constructor(private readonly storage: Storage = localStorage) {}

  async getItem(key: string): Promise<string | null> {
    try {
      return this.storage.getItem(key);
    } catch (error) {
      throw new DependencyError(
        `Failed to get item from storage: ${key}`,
        "localStorage",
        error,
      );
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      this.storage.setItem(key, value);
    } catch (error) {
      throw new DependencyError(
        `Failed to set item in storage: ${key}`,
        "localStorage",
        error,
      );
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      throw new DependencyError(
        `Failed to remove item from storage: ${key}`,
        "localStorage",
        error,
      );
    }
  }

  async clear(): Promise<void> {
    try {
      this.storage.clear();
    } catch (error) {
      throw new DependencyError(
        "Failed to clear storage",
        "localStorage",
        error,
      );
    }
  }
}

/**
 * Factory function to create storage adapter
 */
export function createStorageAdapter(storage?: Storage): IStorageWrapper {
  return new LocalStorageAdapter(storage);
}
