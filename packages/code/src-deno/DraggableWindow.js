export const renderDraggableWindow = (motion) => {
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
            border: 2px solid red;
            
            border-radius: 0px 0px 12px 12px;
            padding: 1rem;
          `,
          animate: {
            scale: 1,
          },
          initial: {
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
        jsx("div", {
          css: `
      display: inline-block;
      min-width: 200px;
      scroll-vert
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
