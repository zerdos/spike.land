import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as monaco from "monaco-editor"


ReactDOM.render(
  <React.StrictMode>
    <div id="container"></div>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
)
monaco.editor.create(document.getElementById("container")!);

