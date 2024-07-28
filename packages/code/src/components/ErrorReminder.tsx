// src/components/ErrorReminder.tsx
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ErrorReminderProps {
  errorType: 'typescript' | 'prettier' | 'transpile' | 'render' | null;
}

const ErrorReminder: React.FC<ErrorReminderProps> = ({ errorType }) => {
  if (!errorType) return null;

  const errorMessages = {
    typescript: "There might be a TypeScript error in your code. Check the editor for more details.",
    prettier: "There was an issue formatting your code. It might contain syntax errors.",
    transpile: "Your code couldn't be transpiled. There might be a syntax or compilation error.",
    render: "The code was transpiled, but no HTML output was generated. Check your render function.",
  };

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Code Issue Detected</AlertTitle>
      <AlertDescription>{errorMessages[errorType]}</AlertDescription>
    </Alert>
  );
};

export default ErrorReminder;