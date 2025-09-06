import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";
import type { FC } from "react";

interface ToolCallProps {
  name: string;
  args?: Record<string, unknown>;
  result?: unknown;
  isExecuting?: boolean;
  className?: string;
}

export const ToolCall: FC<ToolCallProps> = ({
  name,
  args,
  result,
  isExecuting = false,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "border border-border/50 rounded-lg overflow-hidden my-2",
        className,
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
      >
        {isExpanded
          ? <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
          : <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />}
        <WrenchIcon className="w-4 h-4 text-primary" />
        <span className="font-mono text-sm font-medium">{name}</span>
        {isExecuting && (
          <span className="ml-auto text-xs text-muted-foreground animate-pulse">
            Executing...
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-border/50">
          {args && Object.keys(args).length > 0 && (
            <div className="px-3 py-2 border-b border-border/50">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Parameters
              </div>
              <pre className="text-xs font-mono bg-muted/20 rounded p-2 overflow-x-auto">
                {JSON.stringify(args, null, 2)}
              </pre>
            </div>
          )}

          {result !== undefined && (
            <div className="px-3 py-2">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Result
              </div>
              <pre className="text-xs font-mono bg-muted/20 rounded p-2 overflow-x-auto max-h-48 overflow-y-auto">
                {typeof result === "string"
                  ? result
                  : JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Component to group multiple consecutive tool calls
export const ToolCallGroup: FC<{ children: React.ReactNode; }> = ({ children }) => {
  return (
    <div className="rounded-lg border border-border/50 bg-muted/10 p-2 my-2">
      <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
        <WrenchIcon className="w-3 h-3" />
        Tool Calls
      </div>
      {children}
    </div>
  );
};
