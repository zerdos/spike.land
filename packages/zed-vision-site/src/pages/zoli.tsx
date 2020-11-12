import * as React from "react";
import styled from "@emotion/styled";
import { hash, unHash } from "../components/utils/sha";
import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";
import ReactDiffViewer from "react-diff-viewer";
import format from "html-format";
import { startMonaco } from "@zedvision/smart-monaco-editor";

const Wrapper: React.FC<
  {
    code: string;
    message?: string;
    renderHash?: string;
    innerHTML: string;
    defaultProps: Props;
    onEvent: (action: string) => void;
  }
> = (
  {
    code,
    innerHTML,
    renderHash,
    message,
    defaultProps,
    onEvent,
  },
) => {
  if (!code || !renderHash) {
    return <div>Loading</div>;
  }
  // <Counter
  //   startState={{ counter: 0 }}
  //   events={[]}
  //   onEvent={(e) => {
  //     console.log(e);
  //   }}
  // />;

  const getComponent = (code: string, props: Props) => {
    // console.log()''

    try {
      const componentFactory = new Function(
        "props",
        "React",
        `try{${code}; return Counter(props)}catch(e){console.log(e); return ()=>React.createElement("div", null, "Error in render")}`,
      );

      const Component: React.FC<Props> = (props) =>
        componentFactory({ ...props, onEvent }, React);
      return Component;
    } catch (e) {
      console.log("ERROR", e);
      return null;
    }
  };

  const Component = getComponent(code, defaultProps);

  return <div>
    {Component &&
      <Component
        events={defaultProps.events}
        onEvent={onEvent}
      />}
    <pre>{message}</pre>
  </div>;
};

const ContainerFullWidth = styled.div`
width: 40%; 
float:left;
`;

const ContainerLeftFloat = styled.div`
width: 100;
`;

const StyledContainer = styled.div`
  background: white;
  padding: 12px;
  width: 200px;
  height: 100px;
  margin: auto;
  display: block;
  border: 2px solid red;
`;

const counter = `
import * as React from "react";

const defaultState = {
  counter: 0,
};
type DState = typeof defaultState;

const actions: {
  [key: string]: (s: DState) => DState;
} = {
  "reset": (s) => ({ ...s, ...defaultState }),
  "+1": (s) => ({ ...s, counter: s.counter + 1 }),
  "-1": (s) => ({ ...s, counter: s.counter - 1 }),
};

type ActionType = keyof typeof actions;

interface Props {
  events: string[];
  onEvent: (str: string) => void;
}

export const Counter: React.FC<Props> = (
  { events, onEvent },
) => {
  const calculatedState = events.reduce(
    (prevValue, currentValue) => actions[currentValue](prevValue),
    {} as unknown as DState,
  ) as DState;

  const [state, setState] = React.useState({ calculatedState, events });

  return <div>
    <button {...update("-1")}>-</button>
    {calculatedState.counter}
    <button {...update("+1")}>+</button>
  </div>;

  function update(action: ActionType) {
    return {
      "data-onclick": String(action),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onEvent(String(action));
        setState(
          { ...state, events: [...state.events, String(action)] },
        );
      },
    };
  }
};
`;

let monaco = false;

interface Props {
  events: string[];
  onEvent?: (action: string, hash: string) => void;
}

const defaultProps: Props = {
  events: new Array(8).fill("+1"),
};

export default function Page() {
  if (typeof window === "undefined") return <div>Loading</div>;

  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      isError: false,
      code: counter,
      transformedCode: ``,
      mainCode: counter,
      mainCodeHash: "",
      devCodeHash: "",
      defaultProps,
      defaultStateHash: ``,
      codeHash: ``,
      transformedMainCode: ``,
      transformedHash: ``,
      transformedMainHash: ``,
      renderedHash: ``,
      renderedContent: ``,
      renderedMainHash: ``,
      renderedContentMain: ``,
    },
  );
  const [code, changeCode] = React.useState(counter);

  React.useEffect(() => {
    const runner = async () => {
      if (!monaco) {
        monaco = true;

        startMonaco(
          {
            language: "typescript",
            code,
            onChange: (code: string) => changeCode(code),
          },
        );
      }

      const runnerHash = await hash(renderedComponent);
      const devCodeHash = await hash(code);
      const codeHash = devCodeHash;
      const mainCode = renderedComponent.mainCode
        ? renderedComponent.mainCode
        : code;
      const mainCodeHash = renderedComponent.mainCodeHash
        ? renderedComponent.mainCodeHash
        : devCodeHash;

      const transformedHash = await transform(codeHash);
      const transformedMainHash = await transform(mainCodeHash);
      const defaultStateHash = await hash(renderedComponent.defaultProps);
      if (!transformedHash) {
        changeWorkerRenderedComponent({ ...renderedComponent, isError: true });
        return;
      }
      const transformedCode = await unHash(transformedHash);

      const transformedMainCode = await unHash(transformedMainHash);

      const renderedHash = await render(transformedHash, defaultStateHash);
      const renderedMainHash = await render(
        transformedMainHash,
        defaultStateHash,
      ) as string;

      if (typeof renderedHash !== "string") return;

      const renderedContent = await unHash(renderedHash);
      const renderedContentMain = await unHash(renderedMainHash);

      const runnerHash2 = await hash(renderedComponent);

      if (runnerHash === runnerHash2) {
        changeWorkerRenderedComponent(
          {
            ...renderedComponent,
            code,
            devCodeHash,
            mainCode,
            mainCodeHash,
            codeHash,
            transformedHash,
            transformedMainCode,
            transformedMainHash,
            transformedCode,
            defaultStateHash,
            renderedHash,
            renderedContent,
            renderedMainHash,
            renderedContentMain,
          },
        );
      }
    };
    runner();
  }, [code, renderedComponent.defaultProps]);

  const isChangeAvailable = renderedComponent.renderedContent &&
    renderedComponent.renderedMainHash !== renderedComponent.renderedHash;

  const isError = !renderedComponent.renderedContent;
  // const highlightSyntax = (str: string) =>
  //   <pre
  //     style={{ display: "inline" }}
  //     dangerouslySetInnerHTML={{
  //       __html: Prism.highlight((str), Prism.languages["html"], "html"),
  //     }}
  //   />;

  const onEvent = (action: string) =>
    changeWorkerRenderedComponent(
      {
        ...renderedComponent,
        defaultProps: {
          ...renderedComponent.defaultProps,
          events: [...renderedComponent.defaultProps.events, action],
        },
      },
    );

  return <ContainerFullWidth>
    <ContainerLeftFloat>
      <div
        id="container"
        style={{ width: "100%", height: "100%" }}
      />
    </ContainerLeftFloat>
    <ContainerLeftFloat>
      {isError && <h1>Error</h1>}
      {!isChangeAvailable && <div>
        <h4>Result</h4>
        <StyledContainer>
          <Wrapper
            key={renderedComponent.codeHash}
            renderHash={renderedComponent.renderedHash}
            code={renderedComponent.transformedCode}
            innerHTML={renderedComponent.renderedContent}
            defaultProps={{
              ...renderedComponent.defaultProps,
            }}
            onEvent={onEvent}
          />
        </StyledContainer>
        <pre>
          {`

        codeHash      ${renderedComponent.codeHash}
        renderedHash      ${renderedComponent.renderedHash}
        
        events        ${renderedComponent.defaultProps.events}
        eventsHash   ${renderedComponent.defaultStateHash}
                  `}
        </pre>
      </div>}

      {isChangeAvailable && <div>
        {/* <MyComponent /> */}

        <ReactDiffViewer
          oldValue={format(renderedComponent.renderedContent)}
          newValue={format(renderedComponent.renderedContentMain)}
          showDiffOnly={true}
          useDarkTheme={true}
          // renderContent={highlightSyntax}
          leftTitle={<>
            <StyledContainer>
              <Wrapper
                key={renderedComponent.codeHash}
                renderHash={renderedComponent.renderedHash}
                innerHTML={renderedComponent.renderedContent}
                code={renderedComponent.transformedCode}
                defaultProps={{
                  ...renderedComponent.defaultProps,
                }}
                onEvent={onEvent}
              />
            </StyledContainer>
            <pre>
              {`
            codeHash         ${renderedComponent.codeHash}
            events           ${renderedComponent.defaultProps.events}
            eventsHash       ${renderedComponent.defaultStateHash}
                      `}
            </pre>
            <button
              onClick={() =>
                changeWorkerRenderedComponent(
                  {
                    ...renderedComponent,
                    mainCodeHash: renderedComponent.codeHash,
                    renderedContentMain: renderedComponent.renderedContent,
                    renderedMainHash: renderedComponent.renderedHash,
                  },
                )}
            >
              Save change - as main code
            </button>
          </>}
          rightTitle={<>
            <div>
              <StyledContainer>
                <Wrapper
                  key={renderedComponent.mainCodeHash}
                  code={renderedComponent.transformedMainCode}
                  innerHTML={renderedComponent.renderedContentMain}
                  renderHash={renderedComponent.renderedMainHash}
                  defaultProps={renderedComponent.defaultProps}
                  onEvent={onEvent}
                />
              </StyledContainer>
              <pre>
                {`
            codeHash      ${renderedComponent.mainCodeHash}
            events        ${renderedComponent.defaultProps.events}
            eventsHash   ${renderedComponent.defaultStateHash}
                      `}
              </pre>
            </div>
            <button
              onClick={() => {
                changeCode(renderedComponent.mainCode);
                changeWorkerRenderedComponent({
                  ...renderedComponent,
                  code: renderedComponent.mainCode,
                });
              }}
            >
              Restore the the code to this version
            </button>
          </>}
          hideLineNumbers={true}
          splitView={true}
        />
      </div>}

      <div
        id="player"
        style={{
          display: "block",
          width: "200px",
          height: "200px",
          background: "red",
        }}
      >
      </div>
    </ContainerLeftFloat>
    {/* <div css={css`clear:both`} /> */}
  </ContainerFullWidth>;
}
