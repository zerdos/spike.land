import type { ICode, ICodeSession } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { prettierToThrow } from "@/lib/shared";
import { wait } from "@/lib/wait";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";
import { initializeMonaco } from "./editorUtils";
import { EditorNode } from "./ErrorReminder";

interface EditorProps {
  codeSpace: string;
  cSess: ICode;
}

export const Editor: React.FC<EditorProps> = ({ codeSpace, cSess }) => {
  const { containerRef, editorState, setEditorState } = useEditorState();
  const { errorType, throttledTypeCheck } = useErrorHandling("monaco");
  const [session, setSession] = useState<ICodeSession | null>(null);
  const [lastHash, setLastHash] = useState<string>("");
  const controller = useRef(new AbortController());

  // Initialize session with optimized state tracking
  useEffect(() => {
    cSess.getSession().then((initialSession) => {
      setSession(initialSession);
      setLastHash(md5(initialSession.code));
    });
  }, [cSess]);

  const initializeEditor = useMemo(() => initializeMonaco, []);

  // Track performance metrics
  const metrics = useRef({
    lastChangeTime: 0,
    changeCount: 0,
    skippedCount: 0,
    lastLogTime: 0,
  });

  const isProcessingChange = useRef(false);
  const pendingChange = useRef<string | null>(null);

  const handleContentChange = useCallback(
    async (newCode: string) => {
      if (!session) return;

      const now = performance.now();
      metrics.current.lastChangeTime = now;
      metrics.current.changeCount++;

      // If already processing a change, queue this one
      if (isProcessingChange.current) {
        pendingChange.current = newCode;
        return;
      }

      const processChange = async (code: string) => {
        isProcessingChange.current = true;

        try {
          // Abort previous operation if any
          controller.current.abort();
          controller.current = new AbortController();
          const { signal } = controller.current;

          const formatted = await prettierToThrow({
            code,
            toThrow: false,
          });

          if (signal.aborted) return;

          const newHash = md5(formatted);
          const startSync = performance.now();

          // Prevent unnecessary updates
          if (newHash !== lastHash) {
            setLastHash(newHash);
            
            // Debounce state updates
            await wait(0);
            if (signal.aborted) return;
            
            setEditorState((prev) => ({ ...prev, code: formatted }));
            await cSess.setCode(formatted);
            await throttledTypeCheck();
          }

          // Update metrics
          const syncTime = performance.now() - startSync;
          lifetimeMetrics.current.longestSyncTime = Math.max(
            lifetimeMetrics.current.longestSyncTime,
            syncTime,
          );

          if (now - metrics.current.lastLogTime > 5000) {
            console.debug("[Editor] Performance metrics:", {
              changeCount: metrics.current.changeCount,
              skippedCount: metrics.current.skippedCount,
              syncTime,
              timestamp: new Date().toISOString(),
            });
            metrics.current.lastLogTime = now;
            metrics.current.changeCount = 0;
            metrics.current.skippedCount = 0;
          }
        } catch (e) {
          console.error("Content change error:", e);
        } finally {
          isProcessingChange.current = false;
          
          // Process any pending change
          if (pendingChange.current !== null) {
            const nextChange = pendingChange.current;
            pendingChange.current = null;
            await processChange(nextChange);
          }
        }
      };

      await processChange(newCode);
    },
    [cSess, session, lastHash, setEditorState, throttledTypeCheck],
  );

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
    pendingUpdate: null as string | null
  });

  // Optimized external code change listener
  useEffect(() => {
    if (!editorState.started || !cSess || !cSess.sub || !session) return;

    const unsubscribe = cSess.sub(async (sess: ICodeSession) => {
      const now = performance.now();
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
            
            const syncTime = performance.now() - now;
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
  }, [editorState, cSess, session, lastHash, setEditorState]);

  // Initialize the editor once containerRef is available
  useEffect(() => {
    const initEditor = async () => {
      if (!session || !containerRef.current || editorState.started) return;

      try {
        console.debug("[Editor] Initializing editor", {
          codeSpace,
          containerRef: !!containerRef.current,
        });

        const { setValue } = await initializeEditor({
          container: containerRef.current,
          codeSpace,
          code: session.code,
          onChange: handleContentChange,
        });

        setEditorState((prev) => ({
          ...prev,
          started: true,
          code: session.code,
          setValue,
        }));

        // Run initial type check after editor is ready
        if (errorType) {
          await throttledTypeCheck();
        }

        console.debug("[Editor] Editor initialized successfully");
      } catch (error) {
        console.error("[Editor] Initialization error:", error);
      }
    };

    initEditor();
  }, [
    containerRef,
    editorState.started,
    setEditorState,
    initializeEditor,
    codeSpace,
    session,
    handleContentChange,
    errorType,
    throttledTypeCheck,
  ]);

  // Track aggregate metrics across component lifetime
  const lifetimeMetrics = useRef({
    startTime: performance.now(),
    totalLocalChanges: 0,
    totalExternalChanges: 0,
    totalSkippedChanges: 0,
    longestSyncTime: 0,
  });

  // Monitor component cleanup and log final statistics
  useEffect(() => {
    return () => {
      const duration = (performance.now() - lifetimeMetrics.current.startTime) /
        1000;
      console.info("[Editor] Component lifetime metrics:", {
        durationSeconds: duration.toFixed(2),
        avgLocalChangesPerMinute: (lifetimeMetrics.current.totalLocalChanges / (duration / 60))
          .toFixed(2),
        avgExternalChangesPerMinute:
          (lifetimeMetrics.current.totalExternalChanges / (duration / 60))
            .toFixed(2),
        totalSkippedChanges: lifetimeMetrics.current.totalSkippedChanges,
        longestSyncTimeMs: lifetimeMetrics.current.longestSyncTime.toFixed(2),
        codeSpace,
      });
    };
  }, [codeSpace]);

  // Consolidated cleanup and metrics tracking
  useEffect(() => {
    // Set up metrics update interval
    const metricsInterval = setInterval(() => {
      // Update local metrics
      lifetimeMetrics.current.totalLocalChanges += metrics.current.changeCount;
      lifetimeMetrics.current.totalSkippedChanges += metrics.current.skippedCount;

      // Update external metrics
      lifetimeMetrics.current.totalExternalChanges += externalMetrics.current.updateCount;
      lifetimeMetrics.current.totalSkippedChanges += externalMetrics.current.skippedCount;

      // Reset current counters after capturing their values
      metrics.current.changeCount = 0;
      metrics.current.skippedCount = 0;
      externalMetrics.current.updateCount = 0;
      externalMetrics.current.skippedCount = 0;
    }, 5000);

    return () => {
      // Clear interval
      clearInterval(metricsInterval);

      // Abort any pending operations
      controller.current.abort();

      // Final metrics capture
      metrics.current.changeCount = 0;
      metrics.current.skippedCount = 0;
      externalMetrics.current.updateCount = 0;
      externalMetrics.current.skippedCount = 0;

      // Log cleanup
      console.debug("[Editor] Component cleanup completed", {
        codeSpace,
        timestamp: new Date().toISOString(),
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
