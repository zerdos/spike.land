import React from "react";

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
      const { run } = await new Function(
        `return import("https://code.zed.vision/js/codeLoader.mjs")`,
      )();

      run("embedded", window, starterCode);
    }

    start();
  }, []);

  return <div>
    {!!title &&
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

            monaco.editor.getModel("file:///main.tsx").setValue(starterCode);
          }}
        >
          Reset
        </button>
      </div>}

    <div style={{ position: "relative" }}>
      <div style={{ width: "100%", height: "70vh" }} id="editor" />
      <div style={{ height: "0px" }} id="preview" />
    </div>
  </div>;
};
