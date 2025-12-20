import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ChevronDown, ChevronUp, X } from "@/external/lucide-react";
import { ContextManager } from "@/lib/context-manager";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useErrorEffect } from "../hooks/useErrorEffect";
import type { DetailedDiagnostic, ErrorType } from "../hooks/useErrorHandling";
import { errorMessages } from "./ErrorMessages";

interface EditorNodeProps {
  engine: "monaco" | "ace";
  errorType: ErrorType;
  containerRef: React.Ref<HTMLDivElement>;
  codeSpace: string;
  diagnostics?: DetailedDiagnostic[];
  onErrorClick?: (line: number, column: number) => void;
}

export const EditorNode: React.FC<EditorNodeProps> = ({
  errorType,
  containerRef,
  codeSpace,
  diagnostics = [],
  onErrorClick,
}) => {
  const [errorHeight, setErrorHeight] = useState(0);

  return (
    <div className="w-full h-full flex flex-col">
      <ErrorReminder
        errorType={errorType}
        onHeightChange={setErrorHeight}
        codeSpace={codeSpace}
        diagnostics={diagnostics}
        onErrorClick={onErrorClick}
      />
      <motion.div
        className="flex-grow relative"
        animate={{ marginTop: errorHeight }}
        transition={{ duration: 0.3 }}
      >
        <div
          data-testid="editor-container"
          ref={containerRef}
          className="absolute inset-0"
        />
      </motion.div>
    </div>
  );
};

interface ErrorReminderProps {
  errorType: ErrorType;
  onHeightChange: (height: number) => void;
  codeSpace: string;
  diagnostics?: DetailedDiagnostic[];
  onErrorClick?: ((line: number, column: number) => void) | undefined;
}

export const ErrorReminder: React.FC<ErrorReminderProps> = ({
  errorType,
  onHeightChange,
  codeSpace,
  diagnostics = [],
  onErrorClick,
}) => {
  const [showError, setShowError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const contextManager = new ContextManager(codeSpace);
  useErrorEffect(errorType, codeSpace, contextManager, setShowError);

  const errorLog = contextManager.getContext("errorLog");

  // Filter diagnostics by severity
  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");
  const hasDetailedDiagnostics = diagnostics.length > 0;

  const handleDiagnosticClick = (diagnostic: DetailedDiagnostic) => {
    if (onErrorClick) {
      onErrorClick(diagnostic.line, diagnostic.column);
    }
  };

  const getSeverityColor = (severity: "error" | "warning" | "info") => {
    switch (severity) {
      case "error":
        return "text-red-600 bg-red-50 border-red-200 hover:bg-red-100";
      case "warning":
        return "text-yellow-700 bg-yellow-50 border-yellow-200 hover:bg-yellow-100";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100";
    }
  };

  const getSeverityIcon = (severity: "error" | "warning" | "info") => {
    const baseClass = "h-4 w-4 flex-shrink-0";
    switch (severity) {
      case "error":
        return <AlertCircle className={cn(baseClass, "text-red-500")} />;
      case "warning":
        return <AlertCircle className={cn(baseClass, "text-yellow-500")} />;
      default:
        return <AlertCircle className={cn(baseClass, "text-blue-500")} />;
    }
  };

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => onHeightChange(0)}
    >
      {showError && errorType && (
        <motion.div
          className="absolute top-0 left-0 right-0 z-50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onUpdate={(latest) => {
            if (typeof latest["height"] === "number") {
              onHeightChange(latest["height"]);
            }
          }}
        >
          <Card
            className={cn("mb-4 border-l-4", {
              "border-l-red-500": errorType === "typescript" ||
                errorType === "transpile",
              "border-l-yellow-500": errorType === "prettier",
              "border-l-orange-500": errorType === "render",
            })}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center text-lg font-semibold">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Code Issue Detected
                {hasDetailedDiagnostics && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({errors.length} error{errors.length !== 1 ? "s" : ""}, {warnings.length} warning{warnings.length !== 1 ? "s" : ""})
                  </span>
                )}
              </CardTitle>
              <div className="flex items-center gap-1">
                {hasDetailedDiagnostics && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-8 w-8 p-0"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowError(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {hasDetailedDiagnostics ? (
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ScrollArea className="max-h-[200px]">
                        <div className="space-y-2">
                          {diagnostics.map((diagnostic, index) => (
                            <button
                              key={index}
                              onClick={() => handleDiagnosticClick(diagnostic)}
                              className={cn(
                                "w-full text-left p-2 rounded border transition-colors cursor-pointer",
                                getSeverityColor(diagnostic.severity),
                                onErrorClick && "hover:shadow-sm",
                              )}
                              title={onErrorClick ? `Click to go to line ${diagnostic.line}:${diagnostic.column}` : undefined}
                            >
                              <div className="flex items-start gap-2">
                                {getSeverityIcon(diagnostic.severity)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-xs font-medium">
                                      Ln {diagnostic.line}, Col {diagnostic.column}
                                    </span>
                                    {diagnostic.code && (
                                      <span className="text-xs opacity-60">
                                        TS{diagnostic.code}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm break-words">
                                    {diagnostic.message}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <Alert
                  variant="destructive"
                  className="mb-4 bg-red-50 text-red-800 border-red-200"
                >
                  <AlertTitle>{errorMessages[errorType]}</AlertTitle>
                  {errorLog && (
                    <AlertDescription>
                      <h4 className="font-semibold text-sm">Error Log:</h4>
                      <ScrollArea className="h-[100px]">
                        <pre className="text-xs font-mono whitespace-pre-wrap text-gray-700">
                          {errorLog.split("\n").map((log: string, index: number) => (
                            <div key={index} className="mb-1">
                              {log}
                            </div>
                          ))}
                        </pre>
                      </ScrollArea>
                    </AlertDescription>
                  )}
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
