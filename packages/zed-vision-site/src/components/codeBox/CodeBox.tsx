import * as React from "react";
import { startMonaco } from "@zedvision/smart-monaco-editor";
import { transform } from "../utils/babel.ts";
import { render } from "../utils/renderer.ts";
import { hash, unHash } from "../utils/sha.ts";
import { counterExample, defaultProps } from "./example.ts";
import {
  CodeContainer,
  ErrorContainer,
  Header,
  ResultContainer,
} from "./styledCodeBoxComps.tsx";
import { ITransformed, ResultComponent } from "./codeboxComponents.tsx";

export const CodeBox: React.FC<{
  live?: boolean;
  toRender?: boolean;
  className?: string;
  title?: string;
}> = ({ title, children }) => {
  const starterCode = children?.toString().trim() || counterExample;
  if (typeof window === "undefined") return <pre>Loading</pre>;

  const [{ events, hashArr }, changeProps] = React.useState({
    events: defaultProps.events,
    hashEvents: "",
    hashArr: [] as string[],
  });

  const [{ transformed, error }, changeWorkerRenderedComponent] = React
    .useState<
    { transformed: ITransformed[]; error: string }
  >({
    transformed: [],
    error: "",
  });

  const [code, changeCode] = React.useState(starterCode);

  const [editorAttached, setEditorAttached] = React.useState(false);

  React.useEffect(() => {
    async function transformCode(codeHash: string, errorMessage?: string) {
      if (errorMessage) {
        changeWorkerRenderedComponent((s) => ({ ...s, error: errorMessage }));
      }

      try {
        return transform(codeHash);
      } catch (e) {
        const errorMessage = await unHash(e);
        changeWorkerRenderedComponent((s) => ({ ...s, error: errorMessage }));

        return false;
      }
    }

    const runner = async (c: string) => {
      if (!editorAttached) {
        setEditorAttached(true);
        await startMonaco(
          {
            language: "typescript",
            code: c,
            onChange: (code: string) => changeCode(code),
          },
        );
      }
      const monaco = window["monaco"];

      const model = monaco.editor.getModel(
        "file:///main.tsx",
      );

      const tsWorker = await window["monaco"].languages.typescript
        .getTypeScriptWorker();
      const modelUri = model?.uri;
      if (!modelUri) return;

      const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics(
        "file:///main.tsx",
      );
      const comp = await (await tsWorker(modelUri))
        .getCompilerOptionsDiagnostics(
          "file:///main.tsx",
        );
      const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics(
        "file:///main.tsx",
      );

      const tsErrorMessageArr = [...diag, ...comp, ...syntax];

      const tsErrorMessage = tsErrorMessageArr.length === 0
        ? ""
        : tsErrorMessageArr[0].messageText.toString();

      const codeHash = await hash(c);
      const tHash = await transformCode(codeHash, tsErrorMessage);
      const hashArrValue = await hash({
        events: [defaultProps.events[0]],
      });

      if (!tHash || tsErrorMessage) return;

      const renderedHashContentHash = await render(tHash, hashArrValue);

      const renderedHashContent = (typeof renderedHashContentHash === "string")
        ? await unHash(renderedHashContentHash)
        : "<p>Error</p>";

      const prevIndex = transformed.findIndex((x) => x.hash === tHash);

      if (prevIndex > 0) {
        const t = [
          ...transformed.slice(
            prevIndex,
            transformed.length,
          ),
        ];
        if (t[0].code[0] !== codeHash) t[0].code = [codeHash, ...t[0].code];
        if (code === c) {
          changeWorkerRenderedComponent((s) => ({
            ...s,
            error: "",
            transformed: [...transformed.slice(prevIndex)],
          }));
        }
        return;
      }

      const rendered: string[] = [
        typeof renderedHashContent === "string"
          ? renderedHashContent
          : "<p>Error</p>",
      ];

      const renderedHash = await hash(rendered);
      if (code === c) {
        changeWorkerRenderedComponent((s) => (
          {
            ...s,
            error: "",
            transformed: [
              {
                hash: tHash,
                code: [codeHash],
                renderedHash: renderedHash,
                rendered,
              },
              ...(s.transformed),
            ],
          }
        ));

        hashArr.forEach((h, hashI) => {
          if (hashI > rendered.length) {
            hashArr.forEach(async (h, tk) => {
              const renderedHash = await render(tHash, h);

              if (typeof renderedHash === "string") {
                const renderHtml = await unHash(renderedHash);

                rendered[tk] = renderHtml;
                const renderedHashVal = rendered.length === hashArr.length
                  ? await hash(rendered)
                  : "";

                changeWorkerRenderedComponent((s) => {
                  s.transformed[0].rendered[tk] = renderHtml;
                  if (s.transformed[0].rendered.length === hashArr.length) {
                    s.transformed[0].renderedHash = renderedHashVal;
                  }
                  return s;
                });
              }
            });
          }
        });
      }
    };

    runner(code);
  }, [code]);

  React.useEffect(() => {
    if (events.length !== hashArr.length) return;

    hashArr.forEach((h, hashI) => {
      if (hashI > transformed[0].rendered.length) {
        transformed.forEach(async (t, tk) => {
          if (t.rendered.length < hashI) {
            const renderedHash = await render(t.hash, h);

            if (typeof renderedHash === "string") {
              const rendered = await unHash(renderedHash);
              const renderedCopy = [...t.rendered];
              renderedCopy[tk] = rendered;
              const renderedHashVal = await hash(renderedCopy);

              changeWorkerRenderedComponent((s) => {
                s.transformed[tk].rendered[hashI] = rendered;
                if (s.transformed[tk].rendered.length === hashArr.length) {
                  s.transformed[tk].renderedHash = renderedHashVal;
                }
                return s;
              });
            }
          }
        });
      }
    });
  }, [transformed.length]);

  React.useEffect(() => {
    if (
      events.length > hashArr.length ||
      events.length > transformed[0].rendered.length
    ) {
      events.forEach(async (v: unknown, k: number) => {
        if (k < hashArr.length) return;
        // changeProps((p)=>{p.hashArr[k] = p.hashArr[k] || p.hashArr[k-1]; return p;});
        const hashArrValue = await hash({
          events: events.slice(0, k),
        });
        const hashCopy = [...hashArrValue];
        hashCopy[k] = hashArrValue;
        const hashArrHash = await hash(hashCopy);
        changeProps((p) => {
          p.hashArr[k] = hashArrValue;

          p.hashEvents = hashArrHash;

          return p;
        });

        transformed.forEach(async (t, tk) => {
          if (t.rendered.length < k) {
            const renderedHash = await render(t.hash, hashArrValue);

            if (typeof renderedHash === "string") {
              const rendered = await unHash(renderedHash);
              const renderedCopy = [...t.rendered];
              renderedCopy[tk] = rendered;
              const renderedHashVal = await hash(renderedCopy);

              changeWorkerRenderedComponent((s) => {
                s.transformed[tk].rendered[k] = rendered;

                s.transformed[tk].renderedHash = renderedHashVal;
                return s;
              });
            }
          }
        });
      });
    }
  }, [events.length]);

  return <>
    {!!title && <Header>
      <span>{title}</span>
      <button
        onClick={async () => {
          const hash = transformed[0].code[0];
          const dataObj = {
            codeHash: hash,
            transpiledHash: transformed[0].hash,
            code: await unHash(
              transformed[0].code[0],
            ),
            transpiledCode: await unHash(
              transformed[0].hash,
            ),
          };

          const body = { results: [dataObj], errors: null, msg: "" };

          const request = new Request(
            "https://code.zed.vision",
            {
              body: JSON.stringify(body),
              method: "POST",
              headers: { "content-type": "application/json;charset=UTF-8" },
            },
          );
          //const response =
          await fetch(request);

          // console.log(response);
        }}
      >
        Save
      </button>
    </Header>}
    <CodeContainer id="container" />
    <CodeContainer style={{ display: "none" }} id="ace" />
    {error
      ? <ErrorContainer>
        <pre>
          {error.toString()}
        </pre>
        <button
          onClick={async () => {
            const code = await unHash(
              transformed[0].code[0],
            );
            const monacoEditor = monaco.editor.getModel(
              "file:///main.tsx",
            );
            monacoEditor.setValue(code);
            changeCode(code);
          }}
        >
          Restore to the last working version
        </button>
      </ErrorContainer>
      : transformed.length > 0
      ? <ResultContainer>
        <ResultComponent
          transformed={transformed}
          key={transformed[0].renderedHash}
          events={events}
          onEvent={(ev: string) => {
            changeProps((p) => ({
              ...p,
              events: [...p.events, ev],
            }));
          }}
        />
      </ResultContainer>
      : <></>}
  </>;
};
