import React, { memo, useCallback, useMemo } from "react";

/**
 * Collection of memoized components for better performance
 */

// Memoized ActionButtons component
interface ActionButtonsProps {
  onSave?: () => void;
  onRun?: () => void;
  onFormat?: () => void;
  onShare?: () => void;
  disabled?: boolean;
}

export const MemoizedActionButtons = memo<ActionButtonsProps>(
  ({ onSave, onRun, onFormat, onShare, disabled = false }) => {
    // Memoize callbacks to prevent unnecessary re-renders
    const handleSave = useCallback(() => onSave?.(), [onSave]);
    const handleRun = useCallback(() => onRun?.(), [onRun]);
    const handleFormat = useCallback(() => onFormat?.(), [onFormat]);
    const handleShare = useCallback(() => onShare?.(), [onShare]);

    return (
      <div className="flex gap-2 p-2">
        <button
          onClick={handleSave}
          disabled={disabled}
          className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={handleRun}
          disabled={disabled}
          className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 disabled:opacity-50"
        >
          Run
        </button>
        <button
          onClick={handleFormat}
          disabled={disabled}
          className="px-3 py-1 bg-accent text-accent-foreground rounded hover:bg-accent/90 disabled:opacity-50"
        >
          Format
        </button>
        <button
          onClick={handleShare}
          disabled={disabled}
          className="px-3 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/90 disabled:opacity-50"
        >
          Share
        </button>
      </div>
    );
  }
);

MemoizedActionButtons.displayName = "MemoizedActionButtons";

// Memoized ContentWrapper component
interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const MemoizedContentWrapper = memo<ContentWrapperProps>(
  ({ children, className = "", style = {} }) => {
    // Memoize style object to prevent unnecessary re-renders
    const memoizedStyle = useMemo(() => ({
      ...style,
      transition: "all 0.3s ease",
    }), [style]);

    return (
      <div
        className={`content-wrapper ${className}`}
        style={memoizedStyle}
      >
        {children}
      </div>
    );
  }
);

MemoizedContentWrapper.displayName = "MemoizedContentWrapper";

// Memoized ScaledContent component
interface ScaledContentProps {
  children: React.ReactNode;
  scale?: number;
  minScale?: number;
  maxScale?: number;
}

export const MemoizedScaledContent = memo<ScaledContentProps>(
  ({ children, scale = 1, minScale = 0.5, maxScale = 2 }) => {
    // Calculate bounded scale value
    const boundedScale = useMemo(() =>
      Math.max(minScale, Math.min(maxScale, scale)),
      [scale, minScale, maxScale]
    );

    // Memoize transform style
    const transformStyle = useMemo(() => ({
      transform: `scale(${boundedScale})`,
      transformOrigin: "top left",
      transition: "transform 0.2s ease",
    }), [boundedScale]);

    return (
      <div className="scaled-content-container" style={{ overflow: "hidden" }}>
        <div style={transformStyle}>
          {children}
        </div>
      </div>
    );
  }
);

MemoizedScaledContent.displayName = "MemoizedScaledContent";

// Memoized ErrorReminder component
interface ErrorReminderProps {
  error?: string | null;
  onDismiss?: () => void;
}

export const MemoizedErrorReminder = memo<ErrorReminderProps>(
  ({ error, onDismiss }) => {
    const handleDismiss = useCallback(() => {
      onDismiss?.();
    }, [onDismiss]);

    if (!error) return null;

    return (
      <div className="fixed bottom-4 right-4 max-w-md p-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg animate-in slide-in-from-bottom">
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm">{error}</p>
          <button
            onClick={handleDismiss}
            className="text-destructive-foreground/70 hover:text-destructive-foreground"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      </div>
    );
  }
);

MemoizedErrorReminder.displayName = "MemoizedErrorReminder";

// Memoized HistoryItem component
interface HistoryItemProps {
  id: string;
  timestamp: Date;
  code: string;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

export const MemoizedHistoryItem = memo<HistoryItemProps>(
  ({ id, timestamp, code, onClick, isSelected = false }) => {
    const handleClick = useCallback(() => {
      onClick?.(id);
    }, [onClick, id]);

    // Format timestamp once
    const formattedTime = useMemo(() =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(timestamp),
      [timestamp]
    );

    // Truncate code preview
    const codePreview = useMemo(() => {
      const maxLength = 100;
      return code.length > maxLength
        ? `${code.substring(0, maxLength)}...`
        : code;
    }, [code]);

    return (
      <div
        onClick={handleClick}
        className={`p-3 cursor-pointer rounded transition-colors ${
          isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted"
        } border`}
      >
        <div className="text-xs text-muted-foreground mb-1">{formattedTime}</div>
        <div className="text-sm font-mono truncate">{codePreview}</div>
      </div>
    );
  }
);

MemoizedHistoryItem.displayName = "MemoizedHistoryItem";

// Export a hook for using memoized callbacks
export const useMemoizedCallbacks = (callbacks: Record<string, () => void>) => {
  return useMemo(() => {
    // Just return the callbacks wrapped in an object
    // The actual memoization should be done by the caller using useCallback
    return callbacks;
  }, [callbacks]);
};