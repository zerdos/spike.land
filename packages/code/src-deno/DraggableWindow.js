export const renderDraggableWindow = (motion, onShare) => {
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
            left: -200,
            right: window.innerWidth - 200,
            bottom: window.innerHeight + 200,
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
              color: white;
              cursor: pointer;
              font-weight: bold;
              font-family: Roboto;
              padding: 8px 16px;
              outline: none;
              box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
              border: none;
              border-radius: 0px 8px 0px 0px;
            `,
            onClick: () => onShare(),
          }, "🌎 SHARE"),
        ),
        jsx("div", {
          css: `  
      display: inline-block;
      min-width: 200px;
      padding: 30px;
      max-width: 600px;
      margin-bottom: -4px;
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

  ReactDOM.render(
    jsx(DraggableWindow),
    document.getElementById("dragabbleWindow"),
  );
};
