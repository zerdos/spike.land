import * as React from "react";

import logo from "./logo.svg";
import "./App.css";
import { MonacoEditor } from "./MonacoEditor";
import { getCodeTemplate } from "./getCodeTemplate";

function App() {
  const [code, changeCode] = React.useState(getCodeTemplate());

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <img src={logo} alt="logo" />
          <MonacoEditor onChange={changeCode} code={code} />
        </div>
      </header>
      <footer dangerouslySetInnerHTML={{ __html: code }}></footer>
    </div>
  );
}

export default App;
