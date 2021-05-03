import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/app'


ReactDOM.render(
  <React.StrictMode>
    <div id="container" style={{width: 300, height: 300, display: "block"}}></div>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
)