
export const getWorker = (file)=>{

let workerSrc;
let forceNormalWorker = false;
const { pathname } = window.location;
if (pathname.indexOf("/ipfs/") !== -1) {
  const cid = pathname.slice(6, 52);
  forceNormalWorker = true;
  workerSrc = `/ipfs/${cid}/js/workers/${file}`;
} else if (location.origin !== "https://code.zed.vision") {
  forceNormalWorker = true;
  workerSrc = window.URL.createObjectURL(new Blob([`self.importScripts("https://code.zed.vision/js/workers/${file}");`]));    
}else {
    workerSrc=`https://code.zed.vision/js/workers/${file}`;

}

    return {
        workerSrc,
        forceNormalWorker    
    }

}