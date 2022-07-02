import { run  } from "./js/ws.ts";
// import {mST} from "./mST" assert {type: "json"}



(()=>{
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
})()
