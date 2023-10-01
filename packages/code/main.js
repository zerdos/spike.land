var work = require("webworkify");

var w = work(require("./myworker.js"));
w.addEventListener("message", function(ev) {
  console.log(ev.data);
});

w.postMessage(4);
