import type { ICode, ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { prettierToThrow } from "@/lib/shared";
import { tryCatch } from "@/lib/try-catch";
import { wait } from "@/lib/wait";
import { initializeMonaco } from "@/services/editorUtils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { EditorNode } from "./ErrorReminder";

/**
 * EditorProps now includes setIframeSrc, which allows the editor/code processor
 * to update the draggable window's iframe after a successful render.
 */
/**
 * EditorProps now includes replaceIframe, which allows the editor/code processor
 * to replace the draggable window's iframe DOM node after a successful render.
 */
interface EditorProps {
  codeSpace: string;
  cSess: ICode;
  /**
   * Optional callback to replace the preview iframe DOM node after rendering.
   * Passed down from AppToRender.
   */
  replaceIframe?: (newIframe: HTMLIFrameElement) => void;
}

export const Editor: React.FC<EditorProps> = (
  { codeSpace, cSess, replaceIframe },
) => {
  const { containerRef, editorState, setEditorState } = useEditorState();
  const { errorType, throttledTypeCheck } = useErrorHandling("monaco");
  const [session, setSession] = useState<ICodeSession | null>(null);
  const [lastHash, setLastHash] = useState<string>("");
  const controller = useRef(new AbortController());

  const processChange = useCallback(async (code: string) => {
    // Abort previous operation if any
    controller.current.abort();
    controller.current = new AbortController();
    const { signal } = controller.current;

    console.warn("[Editor] Formatting code with Prettier...");
    const { data: formatted, error } = await tryCatch(prettierToThrow({
      code,
      toThrow: true,
    }));

    if (error) {
      console.error("[Editor] Prettier error:", error);
      return;
    }
    console.warn("[Editor] Code formatted.");

    if (signal.aborted) return;

    const newHash = md5(formatted);
    const startSync = Date.now();

    // Prevent unnecessary updates
    if (newHash !== lastHash) {
      setLastHash(newHash);

      // Debounce state updates
      await wait(10);
      if (signal.aborted) return;

      setEditorState((prev) => ({ ...prev, code: formatted }));
      console.warn("[Editor] Saving code to session...");
      // Pass replaceIframe to cSess.setCode so the preview iframe DOM node can be replaced after rendering.
      const { data: newCode, error: saveError } = await tryCatch(
        cSess.setCode(formatted, false, replaceIframe),
      );
      if (saveError) {
        console.error("[Editor] Error saving code:", saveError);
        return;
      }
      if (newCode !== formatted) {
        console.info(
          "[Editor]:  The code might has just formatting or comments difference, rendered app not updated",
        );
        const { data: finalCode, error: saveError } = await tryCatch(
          cSess.setCode(formatted, true),
        );
        if (saveError) {
          console.error("[Editor] Error saving final code:", saveError);
          return;
        }
        if (finalCode !== formatted) {
          console.warn(
            "[Editor] Code was normalized by session storage on forced save. Updating to reflect session state.",
            { received: finalCode, sent: formatted },
          );
          // Update editorState and lastHash based on finalCode,
          // to align with what the session considers the true state.
          setEditorState((prev) => ({ ...prev, code: finalCode }));
          setLastHash(md5(finalCode));
          // No longer treating this as a fatal error, allowing the flow to continue.
          // The external update listener should handle syncing Monaco's display if cSess broadcasts finalCode.
        }
        // If finalCode === formatted, the forced save worked as expected.
        // lastHash is already md5(formatted) from the earlier setLastHash(newHash) call.
      }

      console.warn("[Editor] Code saved and propagated to session.");

      const { error: typeErrorError } = await tryCatch(throttledTypeCheck());
      if (typeErrorError) {
        console.error("[Editor] Type check error:", typeErrorError);
        // Do not block saving/processing on type errors
      }
    }

    // Update metrics
    const syncTime = Date.now() - startSync;
    lifetimeMetrics.current.longestSyncTime = Math.max(
      lifetimeMetrics.current.longestSyncTime,
      syncTime,
    );
    console.warn("[Editor] Code propagation complete.", {
      syncTime,
      codeLength: formatted.length,
      timestamp: new Date().toISOString(),
    });
  }, [
    cSess,
    lastHash,
    replaceIframe,
    throttledTypeCheck,
    setLastHash,
    setEditorState,
  ]);

  // Initialize session with optimized state tracking
  useEffect(() => {
    if (!cSess) {
      console.error("[Editor] Code session is null");
      return;
    }

    const sortSession = async () => {
      const { data: sortedSession, error } = await tryCatch(
        cSess.getSession(),
      );
      if (error) {
        console.error("[Editor] Error fetching session:", error);
        return;
      }
      if (!sortedSession) {
        console.error("[Editor] Sorted session is null");
        return;
      }
      setSession(sortedSession);
      setLastHash(md5(sortedSession.code));
    };
    sortSession();
  }, [cSess]);

  const handleContentChange = useCallback(async (newCode: string) => {
    if (!session) return;

    const now = Date.now();
    console.warn(
      "[Editor] Monaco editor change detected (button press or edit)",
      {
        codeLength: newCode.length,
        timestamp: new Date().toISOString(),
      },
    );

    await processChange(newCode);
    const time = Date.now() - now;
    console.debug("[Editor] Local change processed:", {
      time,
      codeLength: newCode.length,
      timestamp: new Date().toISOString(),
    });
  }, [session, processChange]);

  // Track external change metrics
  const externalMetrics = useRef({
    lastUpdateTime: 0,
    updateCount: 0,
    skippedCount: 0,
    lastLogTime: 0,
  });

  // Create refs at the component level, not inside hooks
  const externalUpdateState = useRef({
    isUpdating: false,
    pendingUpdate: null as string | null,
  });

  // Optimized external code change listener
  useEffect(() => {
    if (!editorState.started || !cSess || !cSess.sub || !session) return;

    const unsubscribe = cSess.sub(async (sess: ICodeSession) => {
      const now = Date.now();
      const newHash = md5(sess.code);

      // Skip if content hasn't changed
      if (newHash === lastHash || sess.code === editorState.code) {
        externalMetrics.current.skippedCount++;
        return;
      }

      // Metrics tracking
      const timeSinceLastUpdate = now - externalMetrics.current.lastUpdateTime;
      externalMetrics.current.lastUpdateTime = now;
      externalMetrics.current.updateCount++;

      if (now - externalMetrics.current.lastLogTime > 5000) {
        console.debug("[Editor] External update metrics:", {
          updateCount: externalMetrics.current.updateCount,
          skippedCount: externalMetrics.current.skippedCount,
          averageTimeBetweenUpdates: timeSinceLastUpdate,
          timestamp: new Date().toISOString(),
        });
        externalMetrics.current.lastLogTime = now;
        externalMetrics.current.updateCount = 0;
        externalMetrics.current.skippedCount = 0;
      }

      // Prevent recursive updates
      if (externalUpdateState.current.isUpdating) {
        externalUpdateState.current.pendingUpdate = sess.code;
        return;
      }

      const updateEditor = async (code: string) => {
        processChange(code);
        externalUpdateState.current.isUpdating = true;
        try {
          setLastHash(newHash);

          // Only update state if code actually changed
          if (code !== editorState.code && editorState.setValue) {
            const newState = { ...editorState, code };
            setEditorState(newState);

            // Debounce setValue to prevent rapid updates
            await wait(0);
            if (!externalUpdateState.current.isUpdating) return; // Check if still relevant

            editorState.setValue(code);

            const syncTime = Date.now() - now;
            lifetimeMetrics.current.longestSyncTime = Math.max(
              lifetimeMetrics.current.longestSyncTime,
              syncTime,
            );

            console.debug("[Editor] External sync completed:", {
              syncTime,
              codeLength: code.length,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("[Editor] Error updating editor value:", error);
        } finally {
          externalUpdateState.current.isUpdating = false;

          // Handle any pending updates
          if (externalUpdateState.current.pendingUpdate) {
            const nextUpdate = externalUpdateState.current.pendingUpdate;
            externalUpdateState.current.pendingUpdate = null;
            await updateEditor(nextUpdate);
          }
        }
      };

      await updateEditor(sess.code);
    });

    return () => {
      try {
        unsubscribe();
      } catch (error) {
        console.error("[Editor] Error unsubscribing:", error);
      }
    };
  }, [editorState, cSess, session, lastHash, setEditorState, processChange]);

  // Initialize the editor once containerRef is available and session is loaded
  useEffect(() => {
    const initEditor = async () => {
      // Add check for session existence here
      if (!session || !containerRef.current || editorState.started) return;

      try {
        console.debug("[Editor] Initializing editor", {
          codeSpace,
          containerRef: !!containerRef.current,
          sessionCodeLength: session.code.length, // Added for debugging
        });

        // Ensure container is valid
        if (!containerRef.current) {
          console.error("[Editor] Container ref is not available.");
          return;
        }

        const { data: editorInstance, error } = await tryCatch(
          initializeMonaco({
            container: containerRef.current,
            codeSpace,
            code: session.code,
            onChange: handleContentChange,
          }),
        );

        if (error) {
          console.error("[Editor] Initialization error:", error);
          // Potentially set an error state here for the UI
          return;
        }
        // Check if the returned instance and its setValue method are valid
        if (!editorInstance || typeof editorInstance.setValue !== "function") {
          console.error(
            "[Editor] Initialization failed: Invalid editor instance or setValue method.",
            editorInstance,
          );
          return;
        }

        setEditorState((prev) => ({
          ...prev,
          started: true,
          code: session.code,
          // Directly use the returned instance's methods
          setValue: editorInstance.setValue,
        }));

        // Run initial type check after editor is ready
        if (errorType) {
          await throttledTypeCheck();
        }

        console.debug("[Editor] Editor initialized successfully");
      } catch (error) {
        console.error("[Editor] Uncaught Initialization error:", error);
      }
    };

    initEditor();
    // Add session to the dependency array
  }, [
    session,
    codeSpace,
    editorState.started,
    errorType,
    throttledTypeCheck,
    containerRef,
    handleContentChange,
    setEditorState,
  ]); // Added session and other relevant dependencies

  // Track aggregate metrics across component lifetime
  const lifetimeMetrics = useRef({
    startTime: Date.now(),
    totalLocalChanges: 0,
    totalExternalChanges: 0,
    totalSkippedChanges: 0,
    longestSyncTime: 0,
  });

  // Monitor component cleanup and log final statistics
  useEffect(() => {
    const metrics = lifetimeMetrics.current;
    return () => {
      const duration = (Date.now() - metrics.startTime) / 1000;
      console.info("[Editor] Component lifetime metrics:", {
        durationSeconds: duration.toFixed(2),
        avgLocalChangesPerMinute: (metrics.totalLocalChanges / (duration / 60))
          .toFixed(2),
        avgExternalChangesPerMinute: (metrics.totalExternalChanges / (duration / 60))
          .toFixed(2),
        totalSkippedChanges: metrics.totalSkippedChanges,
        longestSyncTimeMs: metrics.longestSyncTime.toFixed(2),
        codeSpace,
      });
    };
  }, [codeSpace]);

  if (!session) return null;

  return (
    <div className="flex h-screen w-full max-w-[800px] overflow-hidden">
      <div className="flex-grow overflow-hidden">
        <EditorNode
          engine="monaco"
          errorType={errorType}
          containerRef={containerRef}
          codeSpace={codeSpace}
        />
      </div>
    </div>
  );
};
