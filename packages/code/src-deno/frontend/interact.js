import { importScript } from "./importScript.js";

export const makeDraggable = async () => {
  // const JSFrame = await import(
  //   "https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js"
  // );
  await importScript(
    "https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js",
  );

  return new Promise((resolve) => {
    setTimeout(
      () => {
        const JSFrame = window["JSFrame"];

        const jsFrame = new JSFrame(
          { horizontalAlign: "left", verticalAlign: "top" },
        );

        const frame = jsFrame.create({
          name: `Win2`,
          title: `Z`,
          left: (window.innerWidth - window.innerWidth * 0.7) / 2,
          top: 20,
          width: window.innerWidth * 0.7,
          height: 320,
          minWidth: 300,
          minHeight: 200,
          appearanceName: "material",
          appearanceParam: {
            border: {
              shadow: "2px 2px 10px  rgba(0, 0, 0, 0.5)",
              width: 0,
              radius: 6,
            },
            titleBar: {
              color: "white",
              fontSize: "20px",
              background: "#b22",
              leftMargin: 40,
              height: 30,
              fontSize: 20,
              buttonWidth: 36,
              buttonHeight: 16,
              buttonColor: "white",
              fontWeight: "bolder",
              buttons: [
                {
                  fa: "fas fa-times",
                  name: "closeButton",
                  visible: true,
                },
                {
                  fa: "fas fa-expand-arrows-alt",
                  name: "maximizeButton",
                  visible: true,
                },
                {
                  fa: "fas fa-compress-arrows-alt",
                  name: "minimizedButton",
                  visible: false,
                },
              ],
              buttonsOnLeft: [
                {
                  //Set font-awesome fonts(https://fontawesome.com/icons?d=gallery&m=free)
                  fa: "fas fa-bars",
                  name: "menu",
                  visible: true,
                  childMenuHTML: '<div class="list-group">' +
                    '  <div name="menu1" class="list-group-item list-group-item-action py-2">Menu Item 01</div>' +
                    '  <div name="menu2" class="list-group-item list-group-item-action py-2">Menu Item 02</div>' +
                    '  <div name="menu3" class="list-group-item list-group-item-action py-2">Menu Item 03</div>' +
                    "</div>",
                  childMenuWidth: 300,
                },
              ],
            },
          },
          style: {
            backgroundColor: "rgba(198,198,198,0.8)",
            fontSize: "1rem",
            overflow: "hidden",
            width: "100%",
          },

          html: `<div id="root"></div>`,
        }).show();

        frame.setControl({
          maximizeButton: "maximizeButton",
          demaximizeButton: "restoreButton",
          minimizeButton: "minimizeButton",
          deminimizeButton: "deminimizeButton",
          hideButton: "closeButton",
          animation: true,
          animationDuration: 150,
          maximizeWithoutTitleBar: true,
          restoreKey: "Escape",
        });
        frame.control.on("hid", (frame, info) => {
          frame.closeFrame();
        });

        frame.control.on("maximized", (frame, info) => {
          jsFrame.showToast({
            text: 'Press "ESC" to minimize.',
            align: "center",
          });
        });
        frame.control.on("demaximized", (frame, info) => {
        });

        frame.on("menu", "click", (_frame, evt, info) => {
          const name = evt.target.getAttribute("name");

          if (name && name.startsWith("menu")) {
            alert(name + " clicked");
          }
        });

        resolve();
      },
    );
  });
};
