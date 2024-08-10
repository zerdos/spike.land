import { md5 } from "./md5";

let stringHelia: {
  helia: any;
  fs: any;
  str: any;
} = {
  helia: null,
  fs: null,
  str: null,
};

const init = async () => {
  if (stringHelia.fs === null) {
    const { createHelia } = await import("helia");
    // import { json } from "@helia/json";
    const { strings } = await import("@helia/strings");

    const { unixfs } = await import("@helia/unixfs");

    const helia = await createHelia();

    const fs = unixfs(helia);
    const str = strings(helia);
    stringHelia = { helia, fs, str };
    return stringHelia;
  }
  // remove the extra closing curly brace
  return stringHelia;
};

export const uploadToHelia = async (html: string) => {
  const { str: j } = await init();

  // const data = await j.get(
  //   "bagaaierabw33wjyjh5k6j5xhkjtqpwzfrqqf5t2wxinojxnadgtw36wdcdea"
  // );
  // console.log(data);
  const myImmutableAddress = await j.add(html);
  console.log(myImmutableAddress);
  console.log(myImmutableAddress.toString());

  // globalThis.myImmutableAddress = myImmutableAddress;

  // console.log(myImmutableAddress);
  // globalThis.myImmutableAddress = myImmutableAddress;
  // return myImmutableAddress;
  myImmutableAddress.toString();
};

export const downloadFromHelia = async (address: string) => {
  const { CID } = await import("multiformats/cid");
  const { str: j } = await init();

  const addr = CID.parse(address);
  const data = await j.get(addr);
  console.log(data);
};

export const addFile = async (content: Uint8Array, path: string) => {
  const { fs } = await init();
  // create an empty dir and a file, then add the file to the dir
  const emptyDirCid = await fs.addDirectory();
  // const fileCid = await fs.addBytes(content);
  const updateDirCid = await fs.cp(content, emptyDirCid, path);

  // or doing the same thing as a stream
  // for await (const entry of fs.addAll([{
  //     path,
  //     content
  //   }])) {
  //     console.info(entry)
  //   }
  console.log(updateDirCid);
  return updateDirCid;
};

export const bundleAndUpload = async (codeSpace: string) => {
  const { useDownload } = await import("./hooks/useDownload");

  const str = await useDownload(codeSpace, true)();

  const md = md5(str!);

  fetch(`/my-cms/${md}/${codeSpace}.html`, {
    method: "PUT",
    headers: {
      "Content-Type": "text/html",
    },
    body: str,
  });
  console.log(`${window.location.origin}/my-cms/${md}/${codeSpace}.html`);

  const textEncoder = new TextEncoder();
  const content = textEncoder.encode(str);

  await addFile(content, "index.html");
};
