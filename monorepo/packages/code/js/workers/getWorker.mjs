import { wrap } from "comlink";

export const getWorker = (file) => {
  let workerSrc;
  let forceNormalWorker = false;
  const { pathname } = window.location;
  if (pathname.includes("/ipfs/")) {
    const cid = pathname.slice(6, 52);
    forceNormalWorker = true;
    workerSrc = `/ipfs/${cid}/js/workers/${file}`;
  } else if (location.origin !== "https://spike.land") {
    forceNormalWorker = true;
    workerSrc = window.URL.createObjectURL(
      new Blob([
        `self.importScripts("https://spike.land/workers/${file}");`,
      ]),
    );
  } else {
    workerSrc = `/workers/${file}`;
  }

  return {
    workerSrc,
    forceNormalWorker,
  };
};

const wrapped = {};
export const getWrapped = (file) => {
  if (wrapped[file]) {
    return wrapped[file];
  }

  let workerSrc;
  let forceNormalWorker = false;
  const { pathname } = window.location;
  if (pathname.includes("/ipfs/")) {
    const cid = pathname.slice(6, 52);
    forceNormalWorker = true;
    workerSrc = `/ipfs/${cid}/js/workers/${file}`;
  } else if (location.origin !== "https://spike.land") {
    forceNormalWorker = true;
    workerSrc = window.URL.createObjectURL(
      new Blob([
        `self.importScripts("https://spike.land/workers/${file}");`,
      ]),
    );
  } else {
    workerSrc = `https://spike.land/workers/${file}`;
  }

  wrapped[file] = wrapped[workerSrc] = wrapped[workerSrc] ||
    init(workerSrc, forceNormalWorker);

  return wrapped[workerSrc];
};

function init(workerSrc, forceNormalWorker) {
  if (forceNormalWorker || typeof SharedWorker === "undefined") {
    const worker = new Worker(workerSrc);
    const { port1, port2 } = new MessageChannel();
    const message = {
      comlinkInit: true,
      port: port1,
    };

    worker.postMessage(message, [port1]);

    return wrap(port2);
  }

  const worker = new SharedWorker(workerSrc);
  worker.port.start();

  return wrap(worker.port);
}
