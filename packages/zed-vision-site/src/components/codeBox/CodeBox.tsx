import { css, jsx } from "@emotion/react";

/** @jsx jsx */
import { FC, useEffect } from "react";

export const CodeBox: FC<{
  live?: boolean;
  toRender?: boolean;
  className?: string;
  title?: string;
}> = ({ title, children }) => {
  const starterCode = children?.toString().trim();
  if (typeof window === "undefined") return <pre>Loading</pre>;

  useEffect(() => {
    async function start() {
      const { run } = await new Function(
        `return import("https://unpkg.com/@zedvision/code/src/codeLoader.js")`,
      )();

      run("embedded", window, starterCode);
    }

    start();
  }, []);

  return <div>
    {!!title && <div
      css={css`
            background: #3f51b5;
            font-family: "Roboto";
            margin: 0;
            padding: 10px 20px 10px;
            color: white;
        `}
    >
      <span>{title}</span>
      <button>
        Save
      </button>
    </div>}

    <div style={{ position: "relative" }}>
      <div style={{ height: "0px" }} id="preview" />

      <div style={{ width: "100%", height: "600px" }} id="editor" />
    </div>
  </div>;
};
