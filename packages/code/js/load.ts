import { run } from "./ws";

export default async () => {
  const codeSpace = location.pathname.slice(1).split("/")[1];

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
};
