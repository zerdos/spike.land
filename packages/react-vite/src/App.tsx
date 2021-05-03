/** @jsx jsx */

import {jsx } from '@emotion/react'

import {DraggableWindow} from "./DraggableWindow"

function App() {

  return (
        <DraggableWindow onShare={()=>{}} onRestore={()=>{}} session={{url:"", errorText:""}} />
  )
}

export default App
