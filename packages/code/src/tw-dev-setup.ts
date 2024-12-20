interface ResourceLoader {
  init(): Promise<boolean>;
}

class ResourceLoaderImpl implements ResourceLoader {
  private static readonly IFRAME_PATH = "/iframe";
  private static readonly JS_PATH = "/assets/tw-chunk-4a7018.js";

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
    const pathname = window.location.pathname;

    return pathname.endsWith(ResourceLoaderImpl.IFRAME_PATH);
  }

  private async loadResources(): Promise<void> {
    this.removeAllStyleBlocks();
    const { origin } = window.location;
    await this.loadScript(`${origin}${ResourceLoaderImpl.JS_PATH}`);
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Script load failed: ${src}`));
      document.head.appendChild(script);
    });
  }

  private removeAllStyleBlocks(): void {
    document.querySelectorAll("head > style").forEach((block) => block.remove());
  }
}

// Singleton instance
export const resourceLoader = new ResourceLoaderImpl();
export const init = () => resourceLoader.init();
