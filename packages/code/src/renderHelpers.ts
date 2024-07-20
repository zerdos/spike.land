
import { CacheProvider } from "./emotion";
import createCache from "./emotionCache";
import { createRoot } from "./reactDomClient";

import {render} from "./render";

const codeSpace = getCodeSpace();




export { createCache, createRoot, CacheProvider };
export const renderApp = ()=>{
    let root = document.getElementById("root")!;
    if (!root) {
        root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);
        
    }
    render(
      document.getElementById(`root`)!,
      codeSpace,
    );
}


function getCodeSpace() {
    return location.pathname.slice(1).split("/")[1];
  }
  