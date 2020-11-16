export const makeDraggable = async () => {
  const JSFrame = window["JSFrame"];

  const jsFrameNotFixed = new JSFrame({ fixed: false });
  jsFrameNotFixed.create({
    name: `Win0`,
    title: `Your page :)`,
    left: (window.innerWidth - 400) / 2,
    top: 20,
    width: 400,
    height: 320,
    appearanceName: "yosemite",
    html:
      `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" /><div style="color:black; font-size:16px; overflow: hidden" class="window-content">
    <div id="root"></div>
</div>`,
  }).show();
};
