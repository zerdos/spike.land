import React from "react";

import { counterExample } from "./example";
import { Header } from "./styledCodeBoxComps";

export const CodeBox: React.FC<{
  live?: boolean;
  toRender?: boolean;
  className?: string;
  title?: string;
}> = ({ title, children }) => {
  const starterCode = children?.toString().trim() || counterExample;
  if (typeof window === "undefined") return <pre>Loading</pre>;

  React.useEffect(() => {
    async function start() {
      const { run } = await new Function(
        `return import("https://blog.zed.vision/code/src/codeLoader.js")`,
      )();

      run("embedded", window, starterCode);
    }

    if (typeof window !== undefined) start();
  }, []);

  return <>
    {!!title && <Header>
      <span>{title}</span>
      <button>
        Save
      </button>
    </Header>}
    
    <div
      style={{width:"100%", height: "600px", position: "relative"}}
    >
      <div style={{width:"100%", height: "100%"}} id="editor">

      </div>
      <div id="preview"></div>
    </div>
    
  </>
};
