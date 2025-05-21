import { getCodeSpace } from "@/hooks/use-code-space";
import { getCodeSession } from "@/lib/code-session";
import type { ICode } from "@/lib/interfaces";
// import { init } from "@/lib/tw-dev-setup";
import { tryCatch } from "@/lib/try-catch";
import { main } from "@/lib/ws";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";

// Centralized type definitions
export interface AppContext {
  codeSpace: string;
  cSess: ICode;
  AppComponent: React.FC<AppComponentProps>;
}

export interface AppComponentProps {
  codeSpace: string;
  cSess: ICode;
}

/**
 * Initializes the application environment
 * Loads modules that should be available globally
 */
export const initializeAppEnvironment = async (): Promise<void> => {
  const [
    { enhancedFetch },
    { useArchive, useSpeedy },
  ] = await Promise.all([
    import("@/lib/enhanced-fetch"),
    import("@/lib/use-archive"),
  ]);

  // Make utilities available globally for debugging and development
  Object.assign(globalThis, {
    enhancedFetch,
    useArchive,
    useSpeedy,
  });

  console.warn("App environment initialized successfully");
};

/**
 * Initializes a WebSocket connection for the specified code space
 */
export const initializeWebSocket = async (codeSpace: string): Promise<void> => {
  if (!codeSpace) {
    throw new Error(
      "Cannot initialize WebSocket: codeSpace is null or undefined",
    );
  }

  const wsPromise = main(codeSpace);
  const { error: wsError } = await tryCatch(wsPromise);

  if (wsError) {
    console.error("WebSocket initialization failed:", wsError);
    throw wsError;
  }
  console.warn(`WebSocket initialized for code space: ${codeSpace}`);
};

/**
 * Loads the application for a given code space
 * This handles initialization of all required components and sessions
 */
export const loadApp = async (pathname: string): Promise<AppContext | null> => {
  const codeSpace = getCodeSpace(pathname);

  if (!codeSpace) {
    console.error("Cannot load app: Invalid codeSpace from pathname", pathname);
    return null;
  }

  const loadPromise = async () => {
    // Initialize tailwind
    // await init();

    // Get code session
    const { data: cSess, error: sessionError } = await tryCatch(
      getCodeSession(codeSpace),
    );
    if (sessionError) {
      console.error("Error getting code session:", sessionError);
      throw sessionError; // Propagate error to be caught by outer tryCatch
    }
    if (!cSess) {
      throw new Error("Failed to get code session (cSess is null).");
    }

    // Load the app component dynamically
    const { AppToRender } = await import("./AppToRender");

    // Initialize app environment
    await initializeAppEnvironment();

    return {
      codeSpace,
      cSess,
      AppComponent: AppToRender,
    };
  };

  const { data: appContext, error: loadAppError } = await tryCatch(
    loadPromise(),
  );

  if (loadAppError) {
    console.error("Error loading app:", loadAppError);
    return null;
  }
  return appContext;
};

/**
 * Initializes a session synchronizer for the given code space and session
 */
export const initializeSessionSync = async (
  codeSpace: string,
  cSess: ICode,
): Promise<() => void> => {
  // Make cSess available globally for debugging
  Object.assign(globalThis, { cSess });

  // Initialize session synchronizer
  const sessionSync = new SessionSynchronizer(codeSpace);
  await sessionSync.init(await cSess.getSession());

  // Return the unsubscribe function
  return sessionSync.subscribe((sess) => {
    cSess.setSession(sess);
    // Note: setState callback would be handled by the component
  });
};

/**
 * Utility to check if a route should initialize WebSocket
 */
export const shouldInitWebSocket = (
  pathname: string,
  codeSpace: string | null,
): boolean => {
  if (!pathname || !codeSpace) return false;
  return pathname === `/live/${codeSpace}`;
};
