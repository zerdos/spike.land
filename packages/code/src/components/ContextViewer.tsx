import type { ProjectContext } from "@/lib/context-manager";
import React, { useEffect, useState } from "react";
import { useContext } from "../hooks/useContext";

interface ContextViewerProps {
  codeSpace: string;
}

export const ContextViewer: React.FC<ContextViewerProps> = ({ codeSpace }) => {
  const { getFullContext, updateContext } = useContext(codeSpace);
  const [context, setContext] = useState<ProjectContext>(getFullContext());

  useEffect(() => {
    setContext(getFullContext());
  }, [getFullContext]);

  const handleChange = (key: string & keyof ProjectContext, value: string) => {
    updateContext(key, value);
    setContext((prevContext) => ({ ...prevContext, [key]: value }));
  };

  return (
    <div className="context-viewer">
      <h2>Project Context</h2>
      {(Object.keys(context) as Array<string & keyof ProjectContext>).map((
        key,
      ) => (
        <div key={key} className="context-item">
          <label htmlFor={key}>{key}:</label>
          <textarea
            id={key}
            value={context[key] as string}
            onChange={(e) => handleChange(key, e.target.value)}
            rows={3}
          />
        </div>
      ))}
    </div>
  );
};
