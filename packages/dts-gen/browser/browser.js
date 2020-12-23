"use strict";
exports.__esModule = true;
var guess = require("../lib");
(function () {
  "use strict";
  var css =
    "position: fixed;\n\tdisplay: inline-block;\n\tleft: 10%;\n\ttop: 10%;\n\twidth: auto;\n\theight: auto;\n\tpadding: 2em;\n\tmargin-left: auto;\n\tmargin-right: auto;\n\tborder: solid black 2px;\n\tz-index: 100000;\n\tbackground-color: #294E80;\n    color: white;\n\ttext-align: center;";
  var displayWindow = document.createElement("div");
  displayWindow.setAttribute("id", "tsguess-window");
  displayWindow.setAttribute("style", css);
  displayWindow.innerHTML =
    '\n\t\t<div>tsguess Browser Type Guesser</div>\n\t\t  <div style="font-family: monospace; text-align: left">\n            <form onsubmit="return false;">\n              <input type="text" length="40" id="tsguess-input" placeholder="Enter any JavaScript identifier or expression" />\n              <input type="submit" value="Generate" default id="tsguess-generate"  />\n            </form>\n\t\t  </div>\n\t\t  <textarea id="tsguess-output" style="font-family: monospace; align: center; border: solid black 2px;" rows="40" cols="120" placeholder="Generated .d.ts content will appear here"></textarea>\n        </div>\n\t';
  window.setTimeout(function () {
    var button = document.getElementById("tsguess-generate");
    var input = document.getElementById("tsguess-input");
    var output = document.getElementById("tsguess-output");
    button.addEventListener("click", function () {
      output.value = guess.generateIdentifierDeclarationFile(
        input.value,
        eval(input.value),
      );
    });
    window["infer"] = function (name) {
      input.value = name;
      button.click();
    };
  }, 10);
  document.body.appendChild(displayWindow);
})();
