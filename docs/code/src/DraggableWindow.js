export default async ({ ReactDOM, React, jsx, onShare }) => {
  // const Motion = await import(
  //   "https://cdn.skypack.dev/framer-motion"
  // );

  // const {motion} = Motion;

  const DraggableWindow = ({ onShare }) => {
    return jsx(
      React.Fragment,
      {},
      jsx(
        "div",
        {
          css: `
              background: red;
              border: 4px solid red;
              border-radius: 8px;
            `,
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
          id: "zbody",
        }),
      ),
    );
  };

  ReactDOM.render(
    jsx(DraggableWindow, {
      onShare,
    }),
    window.document.getElementById("dragabbleWindow"),
  );
};
