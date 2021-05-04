export async function openWindows() {
    const { WindowManager } = await import(
      "simple-window-manager"
    );
    const wm = new WindowManager({ backgroundWindow: "green" });
  
    wm.snap(false);
  
    const win = wm.createWindow(
      {
        titlebarHeight: "42px",
        width: 720,
        closable: false,
        borderRadius: "0px",
        backgroundWindow: "#1e1e1e",
        height: 800,
        title: "app.tsx",
      },
    );
  
    win.content.innerHTML =
      `<div style="min-height: 20px;  min-width: 600px; height: ${
        isMobile() ? "2000px" : "calc(100% - 25px);"
      }; width:100%; display: block;" id="editor"></div>`;
  
    if (!isMobile()) {
      try {
        const element = window.document.querySelector(
          "body > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > section",
        );
        if (element !== null) {
          // deno-lint-ignore ban-ts-comment
          //@ts-ignore
          element.style.overflow = "";
        }
      } catch (e) {
        console.error({ e });
      }
    }
    (function (global) {
      if (typeof (global) === "undefined") {
        throw new Error("window is undefined");
      }
  
      var _hash = "!";
      var noBackPlease = function () {
        global.location.href += "#";
  
        // Making sure we have the fruit available for juice (^__^)
        global.setTimeout(function () {
          global.location.href += "!";
        }, 50);
      };
  
      global.onhashchange = function () {
        if (global.location.hash !== _hash) {
          global.location.hash = _hash;
        }
      };
  
      global.onload = function () {
        noBackPlease();
  
        // Disables backspace on page except on input fields and textarea..
        document.body.onkeydown = function (e) {
            //@ts-ignore
          var elm = e.target.nodeName.toLowerCase();
          if (e.which === 8 && (elm !== "input" && elm !== "textarea")) {
            e.preventDefault();
          }
          // Stopping the event bubbling up the DOM tree...
          e.stopPropagation();
        };
      };
    })(window);
  }
  
  function isMobile() {
    if (typeof window === "undefined") {
      return false;
    }
  
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(
        window.navigator.userAgent,
      );
  }
  