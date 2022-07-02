
// import {mST} from "./mST" assert {type: "json"}

import("./js/ws.ts").then(({run})=>{
// const {codeSpace} = window;

const {codeSpace, mST} = window;

if (mST) return run(mST);

fetch(`/live/${codeSpace}/mST`)
  .then((resp) => resp.json())
  .then(sess=>Object.assign(window, sess))
  .then(({mST}) => run(mST))
  .then(()=>console.log("All good!"))
  .catch((err)=>console.error(err))
  .finally(()=>console.log("finally!"));
})
