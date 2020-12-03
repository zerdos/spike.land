import {useEffect, FC} from "react";

export const MonacoEditor: FC<
  { code: string; onChange: (code: string) => void }
> = ({ code, onChange }) => {
  useEffect(() => {
    (async () => {
      const { startMonaco } = await (await Function(
        "return import('https://unpkg.com/@zedvision/smart-monaco-editor/lib/editor.js')",
      ))();

      startMonaco({ language: "typescript", code, onChange });
    })();
  }, []);

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
