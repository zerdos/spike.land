// import React from "react";
import ReactDOM from "react-dom";

import { baberTransform } from "./babel.mjs";
import { jsx } from "@emotion/react";


export const restart = async (code, target) => {
    const session = window.sess || {};
    window.sess = session
    const transpiled = await baberTransform(code);
    return await restartX(transpiled, target, session.counter, session);
  
  
    
  


  async function getReactChild(transpiled, mode = "window") {
    const codeToHydrate = mode === "window"
      ? transpiled.replace("body{", "#zbody{")
      : transpiled;
  
    const objUrl = createJsBlob(
      codeToHydrate,
    );
  
    const mod = (await import(objUrl));
    URL.revokeObjectURL(objUrl);
  
    return jsx(mod.default);
  }
  
  async function restartX(transpiled, target, counter, session) {
    if (session.i > counter) return false;

    if (session.actualT === transpiled) return false;
    session.actualT = transpiled;

    // const codeHash = await Hash.of(code);

    session.html = "";
    session.transpiled = "";
    let hadError = false;
    if (typeof transpiled !== "string" || transpiled === "") {
      // console.log(transpiled.error);
      hadError = true;
      return hadError;
    }

    let children;
    try {
      children = await getReactChild(transpiled);
    } catch (error) {
      console.error({ error, message: "error in rendering" });
      return false;
    }

    // session.unmount = render(Element(), root);
    const zbody = target || document.createElement("div");
    // if (!zbody) {
    //   zbody = document.createElement('div');
    //   document.body.appendChild(zbody);

    // }

    ReactDOM.render(children, zbody);

    // zbody && zbody.children[0].replaceWith(root);
    session.div = zbody;
    if (zbody.innerHTML) {
      session.transpiled = transpiled;
      session.html = zbody.innerHTML;
      session.children = children;
      session.setChild((c) => [...c, session.children]);
    }
    return !zbody.innerHTML;
  }

};

/**
 * @param {BlobPart} code
 */
 function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}
