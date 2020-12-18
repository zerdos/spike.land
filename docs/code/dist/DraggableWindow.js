export async function renderDraggableWindow({ onShare }) {
  const { importScript } = await import("./importScript.js");
  const { getDepts } = await import("./templates.js");

  const debts = getDepts("framer-motion");

  for (let i = 0; i < debts.length; i++) {
    await importScript(debts[i]);
  }

  Object.assign(window, emotionReact);
  let styled = window["emotionStyled"];
  let DefaultElement;

  const { jsx, React } = window;

  const { motion } = window.Motion;

  const DraggableWindow = () => {
    return jsx(
      React.Fragment,
      null,
      jsx(
        motion.div,
        {
          css: `
            background: red;
            border: 4px solid red;
            border-radius: 8px;
          `,
          animate: {
            scale: 1,
            top: 1,
            left: 600,
          },
          dragElastic: 0.5,
          dragMomentum: false,
          initial: {
            top: 1,
            left: 0,
            scale: 0.7,
          },
          transition: {
            duration: 0.5,
          },
          drag: true,
          dragConstraints: {
            left: -window.innerWidth + 200,
            right: 0,
            bottom: window.innerHeight - 200,
            top: 0,
          },
        },
        jsx(
          "div",
          {
            css: `
      display: block;
      with: 100%;
      text-align: right;
      background: linear-gradient(0deg, darkred, red);
    `,
          },
          jsx("button", {
            css: `
              background: darkred;
              margin-top: -4px;
              margin-right: -4px;
              color: white;
              cursor: pointer;
              font-weight: bold;
              font-family: Roboto;
              padding: 8px 16px;
              outline: none;
              border: none;
              border-radius: 0px 8px 0px 0px;
            `,
            onClick: () => onShare(),
          }, "🌎 SHARE"),
        ),
        jsx("div", {
          css: `  
      min-width: 200px;
      padding: 30px;
      max-width: 600px;
      background: white;
      max-height: 800px;
      border-radius: 0px 0px 8px 8px;
      overflow-y: overlay;
    `,
          id: "root",
        }),
      ),
    );
  };
  const html = ReactDOMServer.renderToString(jsx(DraggableWindow));
  document.getElementById("dragabbleWindow").innerHTML = html;

  await importScript(
    "https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js",
  );

  ReactDOM.hydrate(
    jsx(DraggableWindow),
    document.getElementById("dragabbleWindow"),
  );
}
