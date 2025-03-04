interface ResourceLoader {
  init(): Promise<boolean>;
}

class ResourceLoaderImpl implements ResourceLoader {
  private static readonly IFRAME_PATH = "/iframe";

  private static initialized = false;

  async init(): Promise<boolean> {
    if (ResourceLoaderImpl.initialized) {
      return true;
    }

    const shouldLoad = this.shouldLoadResources();
    if (!shouldLoad) {
      return true;
    }

    try {
      await this.loadResources();
      ResourceLoaderImpl.initialized = true;
      return true;
    } catch (error) {
      console.error("Failed to load resources:", error);
      // Throw error to allow proper error handling by calling code
      throw new Error(
        `Resource loading failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  private shouldLoadResources(): boolean {
    const pathname = location.pathname;

    return pathname.endsWith(ResourceLoaderImpl.IFRAME_PATH);
  }

  private async loadResources(): Promise<void> {
    this.removeAllStyleBlocks();
    await import("@/workers/tw.worker");
  }

  private removeAllStyleBlocks(): void {
    document.querySelectorAll("head > style").forEach((block) => block.remove());
  }
}

// Singleton instance
export const resourceLoader = new ResourceLoaderImpl();
export const init = () => resourceLoader.init();
