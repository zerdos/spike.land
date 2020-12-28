export const renderDraggableWindow = async ({ onShare }, src) => {
    const { renderEmotion, jsx, React, motion } = await import(src);
    const DraggableWindow = ({ onShare }) => jsx(React.Fragment, {}, jsx(motion.div, {
        css: `
              right: 20px;
              top: 20px;
              position: fixed;
              z-index: 900;
             border-radius: 8px;
            `,
        dragElastic: 0.5,
        dragMomentum: false,
        drag: true,
    }, jsx("div", {
        css: `
        display: block;
        width: auto;
        text-align: right;
        background: linear-gradient(0deg, darkred, red);
      `,
    }, jsx("button", {
        css: `
            div:before{
              content: “ ”;
              background: inherit; 
              position: absolute;
              left: 0;
              right: 0;
              top: 0; 
              bottom: 0;
              box-shadow: inset 0 0 0 3000px rgba(255,255,255,0.3);
              filter: blur(10px);
             }
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
    }, "🌎 SHARE")), jsx("div", {
        id: "zbody"
    })));
    const element = window.document.createElement("div");
    window.document.body.appendChild(element);
    renderEmotion(DraggableWindow({
        onShare,
    }), element);
};
