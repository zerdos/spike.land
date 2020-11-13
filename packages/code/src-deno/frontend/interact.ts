import { importScript } from "./importScript.ts";

export const makeDraggable = async () => {
  await importScript(
    "https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js",
  );

  const JSFrame = window["JSFrame"];
  const jsFrame = new JSFrame();

  const frame = jsFrame.create({
    name: `Root`,
    title: `React Component`,
    left: 20,
    top: 100,
    width: 400,
    height: 320,
    minWidth: 200,
    minHeight: 110,
    appearanceName: "yosemite",
    appearanceParam: {
      titleBar: {
        greenButton: "fullscreen", //'maximize' icon or 'fullscreen' icon
      },
    },
    html: '<div  style="font-size:16px"><div id=root></div></div>',
  }).show();

  //You can automatically set the actions that are typically expected
  // when you press a button like maximize or minimize or something on title bar
  frame.setControl({
    maximizeButton: "zoomButton",
    maximizeParam: {
      fullScreen: true, // true:maximized without title bar,false:maximized with title bar
      restoreKey: "Escape", //Set key code from https://www.w3.org/TR/uievents-code/#keyboard-key-codes
    },
    demaximizeButton: "dezoomButton",
    deminimizeButton: "deminimizeButton",
    hideButton: "minimizeButton",
    hideParam: {
      align: "ABSOLUTE", //ABSOLUTE:If you want the window to disappear after transitioning to the position you specified
      offset: {
        x: 100,
        y: 500, // specify window vanishing point
      },
      duration: 300,
    },
    dehideParam: {
      duration: 300,
    },
    styleDisplay: "inline",
    animation: true,
    animationDuration: 100, //The whole animation duration(millisec)
  });
  frame.control.on("maximized", (frame, info) => {
    console.log("'maximized' event fired.The window was maximized.");
    // const HTML =
    //   '<div id="bg" style="">Double click here or press "Escape" to restore.</div>';
    // frame.setHTML(HTML);
    frame.on("#bg", "dblclick", function (_frame, e) {
      _frame.control.doCommand("restore");
    });
  });
  frame.control.on("demaximized", (frame, info) => {
    console.log(
      "'demaximized' event fired.The window is now back to its original size from its maximized state.",
    );
    // frame.setHTML(null);
  });
  frame.control.on("hid", (frame, info) => {
    console.log("'hid' event fired.The window was hidden.");
  });
  frame.control.on("dehided", (frame, info) => {
    console.log("'dehided' event fired.A hidden window has appeared.");
  });
};
