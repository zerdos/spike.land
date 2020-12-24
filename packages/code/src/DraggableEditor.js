export async function renderDraggableEditor() {
  const { JSFrame } = await import(
    "https://unpkg.com/@zedvision/jsframe@10.12.34/dist/jsframe.min.esm.js"
  );

JSFrame.create({
    name: `Win`,
    title: ``,
    width: (window.innerWidth / 2) - 40,
    height: 700,
    minWidth: 300,
    minHeight: 300,
    appearanceName: "material",
    appearanceParam: {
      titleBar: {
        color: "white",
        height: 40,
        background: "#1e1e1e",
      },
    },
    style: {
      backgroundColor: "rgba(255,255,255,0.8)",
      overflow: "auto",
    },
    html: '<div id="container" />',
  });
  // const root = document.createElement("div");

  // root.setAttribute("id", "container")
  JSFrame.setPosition(window.innerWidth - 32, 32, "RIGHT_TOP");
  JSFrame.setControl({
    maximizeButton: "maximizeButton",
    demaximizeButton: "restoreButton",
    minimizeButton: "minimizeButton",
    deminimizeButton: "deminimizeButton",
    hideButton: "closeButton",
    animation: true,
    animationDuration: 150,
  });
  JSFrame.control.on("hid", (frame, info) => {
    JSFrame.closeFrame();
  });

  //Callback when calling after mazimization
  JSFrame.control.on("maximized", (frame, info) => {
    JSFrame.showToast({
      text: "Maximized",
    });
  });
  JSFrame.control.on("demaximized", (frame, info) => {
  });
  JSFrame.control.on("minimized", (frame, info) => {
  });
  JSFrame.control.on("dminimized", (frame, info) => {
  JSFrame.show();
  // document.querySelector("iframe").replaceWith(root);

  return frame;
}
