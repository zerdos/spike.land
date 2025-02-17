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
    cSess.getSession().then(initialSession => {
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

  const handleContentChange = useCallback(
    async (newCode: string) => {
      if (!session || newCode === editorState.code) {
        metrics.current.skippedCount++;
        return;
      }

      const now = performance.now();
      const timeSinceLastChange = now - metrics.current.lastChangeTime;
      metrics.current.lastChangeTime = now;
      metrics.current.changeCount++;

      // Log metrics every 5 seconds
      if (now - metrics.current.lastLogTime > 5000) {
        console.debug("[Editor] Performance metrics:", {
          changeCount: metrics.current.changeCount,
          skippedCount: metrics.current.skippedCount,
          averageTimeBetweenChanges: timeSinceLastChange,
          timestamp: new Date().toISOString(),
        });
        metrics.current.lastLogTime = now;
        metrics.current.changeCount = 0;
        metrics.current.skippedCount = 0;
      }

      controller.current.abort();
      controller.current = new AbortController();
      const { signal } = controller.current;

      try {
        const newHash = md5(newCode);
        if (newHash === lastHash) {
          metrics.current.skippedCount++;
          return;
        }

        const formatted = await prettierToThrow({
          code: newCode,
          toThrow: false,
        });

        if (signal.aborted) return;

        const startSync = performance.now();
        setLastHash(md5(formatted));
        await cSess.setCode(formatted);
        await throttledTypeCheck();

        const syncTime = performance.now() - startSync;
        lifetimeMetrics.current.longestSyncTime = Math.max(
          lifetimeMetrics.current.longestSyncTime,
          syncTime,
        );

        console.debug("[Editor] Sync completed:", {
          syncTime,
          codeLength: formatted.length,
          timestamp: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Content change error:", e);
      }
    },
    [cSess, editorState.code, throttledTypeCheck, session, lastHash],
  );

  // Track external change metrics
  const externalMetrics = useRef({
    lastUpdateTime: 0,
    updateCount: 0,
    skippedCount: 0,
    lastLogTime: 0,
  });

  // Optimized external code change listener
  useEffect(() => {
    if (!editorState.started || !cSess || !cSess.sub || !session) return;

    const unsubscribe = cSess.sub(async (sess: ICodeSession) => {
      const now = performance.now();
      const newHash = md5(sess.code);

      if (newHash === lastHash || sess.code === editorState.code) {
        externalMetrics.current.skippedCount++;
        return;
      }

      const timeSinceLastUpdate = now - externalMetrics.current.lastUpdateTime;
      externalMetrics.current.lastUpdateTime = now;
      externalMetrics.current.updateCount++;

      // Log external change metrics every 5 seconds
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

      // Debounce external changes
      const startSync = performance.now();
      await wait(500);

      setLastHash(newHash);
      setEditorState((prev) => ({ ...prev, code: sess.code }));
      editorState.setValue(sess.code);

      const syncTime = performance.now() - startSync;
      lifetimeMetrics.current.longestSyncTime = Math.max(
        lifetimeMetrics.current.longestSyncTime,
        syncTime,
      );

      console.debug("[Editor] External sync completed:", {
        syncTime,
        codeLength: sess.code.length,
        timestamp: new Date().toISOString(),
      });
    });

    return () => unsubscribe();
  }, [editorState.started, session, lastHash]);

  // Initialize the editor once containerRef is available
  useEffect(() => {
    if (!session) return;

    // Validate if we need to run type checks again
    if (errorType) throttledTypeCheck();

    // Exit early if we already started or no container to render into
    if (containerRef.current === null || editorState.started) return;

    (async () => {
      const { setValue } = await initializeEditor({
        container: containerRef.current!,
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
    })();
  }, [
    errorType,
    throttledTypeCheck,
    containerRef,
    editorState.started,
    setEditorState,
    initializeEditor,
    codeSpace,
    session,
    handleContentChange,
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
      const duration = (performance.now() - lifetimeMetrics.current.startTime) / 1000;
      console.info("[Editor] Component lifetime metrics:", {
        durationSeconds: duration.toFixed(2),
        avgLocalChangesPerMinute: (lifetimeMetrics.current.totalLocalChanges / (duration / 60))
          .toFixed(2),
        avgExternalChangesPerMinute:
          (lifetimeMetrics.current.totalExternalChanges / (duration / 60)).toFixed(2),
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
