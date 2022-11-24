// import "./react-jsx-runtime

const codeSpace = location.pathname.slice(1).split("/")[1];

async function start() {
  const { run } = await importShim<
    { run: (t: any) => void },
    { run: (t: any) => void }
  >(`${location.origin}/ws.mjs`);
  const {
    mST,
    address,
  } = await import(`${location.origin}/live/${codeSpace}/mST.mjs`);

  run({
    mST,
    dry: false,
    codeSpace,
    address,
  });
}
start();

export { codeSpace };
