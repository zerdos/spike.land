import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { run } from "./codeLoader";

run("window");

// ReactDOM.render(
//   <React.StrictMode>
//     <div id="container" style={{width: 300, height: 300, display: "block"}}></div>
//     <App />

//   </React.StrictMode>,
//   document.getElementById('root')
// )
// startMonaco({
//   onChange: (_srt)=>{},
//   code: ";a",
//   language: 'typescript',
//   container: document.getElementById("container")!,
//   options: {
//     gylph: false
//   }
// })
