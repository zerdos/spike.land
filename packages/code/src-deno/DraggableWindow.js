export const renderDraggableWindow = (motion, onShare) => {
  const [shareUrl, setShareUrl] = React.useState(false);
  const DraggableWindow = () => {
    return jsx(
      React.Fragment,
      null,
      jsx(
        motion.div,
        {
          css: `
            z-index:900;
            background: white;
            border: 2px solid white;
            border-radius: 0px 0px 12px 12px;
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
      height: 30px;
      background: burlywood;
    `,
          },
          shareUrl === false
            ? jsx("button", {
              css: `
              backgound: blue;
            `,
              onClick: async () => {
                const url = onShare();
                setShareUrl(url);
              },
            }, "SHARE")
            : shareUrl,
        ),
        jsx("div", {
          css: `  
      display: inline-block;
      min-width: 200px;
      padding: 30px;
      max-width: 600px;
      max-height: 800px;
      overflow-y: scroll;
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
