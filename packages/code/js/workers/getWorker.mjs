import { wrap } from "comlink";

export const getWorker = (file) => {
  let workerSrc;
  let forceNormalWorker = false;
  const { pathname } = window.location;
  if (pathname.indexOf("/ipfs/") !== -1) {
    const cid = pathname.slice(6, 52);
    forceNormalWorker = true;
    workerSrc = `/ipfs/${cid}/js/workers/${file}`;
  } else if (location.origin !== "https://code.spike.land") {
    forceNormalWorker = true;
    workerSrc = window.URL.createObjectURL(
      new Blob([
        `self.importScripts("https://code.spike.land/workers/${file}");`,
      ]),
    );
  } else {
    workerSrc = `https://code.spike.land/workers/${file}`;
  }

  return {
    workerSrc,
    forceNormalWorker,
  };
};

const wrapped = {};
export const getWrapped = (file) => {
  if (wrapped[file]) return wrapped[file];

  let workerSrc;
  let forceNormalWorker = false;
  const { pathname } = window.location;
  if (pathname.indexOf("/ipfs/") !== -1) {
    const cid = pathname.slice(6, 52);
    forceNormalWorker = true;
    workerSrc = `/ipfs/${cid}/js/workers/${file}`;
  } else if (location.origin !== "https://code.spike.land") {
    forceNormalWorker = true;
    workerSrc = window.URL.createObjectURL(
      new Blob([
        `self.importScripts("https://code.spike.land/workers/${file}");`,
      ]),
    );
  } else {
    workerSrc = `https://code.spike.land/workers/${file}`;
  }

  wrapped[file] = wrapped[workerSrc] = wrapped[workerSrc] ||
    init(workerSrc, forceNormalWorker);

  return wrapped[workerSrc];
};

function init(workerSrc, forceNormalWorker) {
  if (forceNormalWorker || typeof SharedWorker === "undefined") {
    const worker = new Worker(workerSrc);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1,
    };

    worker.postMessage(msg, [port1]);

    return wrap(port2);
  }
  const worker = new SharedWorker(workerSrc);
  worker.port.start();

  return wrap(worker.port);
}
