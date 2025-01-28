/// <reference lib="webworker" />

// Types and interfaces for service worker
export interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  swVersion: string;
  files: Record<string, string>;
  fileCacheName: string;
}

export interface Config {
  killSwitch: boolean;
  version: string;
  swVersion: string;
  validUntil: number;
}
