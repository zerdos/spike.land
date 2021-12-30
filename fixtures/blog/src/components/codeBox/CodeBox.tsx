import React from "react";
import { dynamicImport } from "../../dynamicImport";
export const CodeBox: React.FC<{
  live?: boolean;
  toRender?: boolean;
  className?: string;
  title?: string;
}> = ({ title, children }) => {
  const starterCode = children?.toString().trim();
  if (typeof window === "undefined") return <pre>Loading</pre>;

  React.useEffect(() => {
    async function start() {
      const { startFromCode } = await dynamicImport(
        "https://code.spike.land/dist/quickerStart.bundle.mjs",
      );
      startFromCode({ mode: "embedded", code: starterCode });
    }

    start();
  }, []);

  return (
    <div>
      {!!title &&
        (
          <div
            style={{
              background: "#3f51b5",
              fontFamily: "Roboto",
              margin: 0,
              padding: "10px 20px 10px",
              color: "white",
            }}
          >
            <span>{title}</span>
            <button
              onClick={() => {
                //@ts-ignore
                const { monaco } = window;

                monaco.editor.getModel("/index.ts").setValue(
                  starterCode,
                );
              }}
            >
              Reset
            </button>
          </div>
        )}

      <div style={{ position: "relative" }}>
        <div style={{ width: "100%", height: "70vh" }} id="editor" />
        <div style={{ height: "0px" }} id="preview" />
      </div>
    </div>
  );
};
