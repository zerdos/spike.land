export const getWorker = (file: string) => {
  let workerSrc;
  let forceNormalWorker = false;
  const { pathname } = window.location;
  if (pathname.indexOf("/ipfs/") !== -1) {
    const cid = pathname.slice(6, 52);
    forceNormalWorker = true;
    workerSrc = `/ipfs/${cid}/js/workers/${file}`;
  } else if (location.origin !== "https://spike.land") {
    forceNormalWorker = true;
    workerSrc = window.URL.createObjectURL(
      new Blob([
        `self.importScripts("https://spike.land/js/workers/${file}");`,
      ]),
    );
  } else {
    workerSrc = `https://spike.land/js/workers/${file}`;
  }

  return {
    workerSrc,
    forceNormalWorker,
  };
};
