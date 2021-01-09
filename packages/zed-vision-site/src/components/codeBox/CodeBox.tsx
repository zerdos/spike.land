import React from "react";

import { counterExample } from "./example";
import { Header } from "./styledCodeBoxComps";

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
        `return import("https://blog.zed.vision/code/src/codeLoader.js")`,
      )();

      run("embedded", window, starterCode);
    }

    start();
  }, []);

  return <div>
    {!!title && <Header>
      <span>{title}</span>
      <button>
        Save
      </button>
    </Header>}

    <div style={{ position: "relative" }}>
      <div style={{ height: "0px" }} id="preview" />

      <div style={{ width: "100%", height: "600px" }} id="editor" />
    </div>
  </div>;
};
