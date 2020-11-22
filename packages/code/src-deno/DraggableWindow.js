export const renderDraggableWindow = (motion) => {
  const DraggableWindow = () => {
    return jsx(
      React.Fragment,
      null,
      jsx(motion.div, {
        css: `
            z-index:900;
            margin: 2rem;
            display: inline-block;
            min-width: 200px;
            background: white;
            border: 4px dotted red;
            border-radius: 30px;
            padding: 2rem;
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
      }, jsx("div", { id: "root" })),
    );
  };

  ReactDOM.render(
    jsx(DraggableWindow),
    document.getElementById("dragabbleWindow"),
  );
};
