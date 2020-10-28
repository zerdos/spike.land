import * as React from "react";
import { startMonaco } from "@zedvision/smart-monaco-editor/lib/editor";

export const MonacoEditor: React.FC<
  { code: string; onChange: (code: string) => void }
> = ({ code, onChange }) => {
  React.useEffect(() => {
    startMonaco({ language: "html", code, onChange });
  });

  return <div
    style={{
      textAlign: "left",
      borderRadius: "50px",
      overflow: "hidden",
      opacity: 0.86,
      position: "relative",
      top: "-270px",
      height: "283px",
      width: "400px",
    }}
    id="container"
  />;
};
