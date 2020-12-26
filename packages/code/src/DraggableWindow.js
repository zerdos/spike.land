export const renderDraggableWindow = async ({ onShare }, src) => {
  const { renderEmotion, jsx, React, motion } = await import(
    src
  );

  const DraggableWindow = ({ onShare }) =>
    jsx(
      React.Fragment,
      {},
      jsx(
        motion.div,
        {
          css: `
              background: red;
              border: 4px solid red;
              border-radius: 8px;
            `,

          dragElastic: 0.5,
          dragMomentum: false,
            drag: true
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

  renderEmotion(
    DraggableWindow({
      onShare,
    }),
    window.document.getElementById("dragabbleWindow"),
  );
};
