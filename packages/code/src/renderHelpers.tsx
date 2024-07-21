
import { CacheProvider } from "./emotion";
import createCache from "./emotionCache";
import { createRoot } from "./reactDomClient";

const codeSpace = getCodeSpace();;




export { createCache, createRoot, CacheProvider };

export const renderApp = async ()=>{
  
    let root = document.getElementById("root")!;
    if (!root) {
        root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);
        
    }
    const App  = (await import(`/live/${codeSpace}/index.mjs`)).default;
    const rRoot = createRoot(root);
    const cache = createCache({ key: "css", speedy: false });
  
    rRoot.render(
      <CacheProvider value={cache}>
       <App
              width={ window.innerWidth}
              height={ window.innerHeight}
              top={ 0}
              left={ 0}
            />
      </CacheProvider>);

}


function getCodeSpace() {
    return location.pathname.slice(1).split("/")[1];
  }
  