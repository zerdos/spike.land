import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as monaco from "monaco-editor"


ReactDOM.render(
  <React.StrictMode>
    <div id="container" style={{width: 300, height: 300, display: "block"}}></div>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
)
monaco.editor.create(document.getElementById("container")!);

