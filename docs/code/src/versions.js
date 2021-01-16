function versions() {
  const shadb = "11.10.0";
  const editor = "11.10.0";
  const ipfsClient = "11.10.4";
  const emotionRenderer = "11.10.0";

  const v = {
    shadb,
    ipfsClient:
      `https://unpkg.com/@zedvision/ipfs@${ipfsClient}/dist/ipfs.client.js`,
    workbox: "6.0.2",
    babel: "7.12.12",
    prettier: "2.2.1",
    uuid: "8.3.2",
    comlink: "4.3.0",
    editor:
      `https://unpkg.com/@zedvision/smart-monaco-editor@${editor}/dist/editor.js`,
    emotionRenderer:
      `https://unpkg.com/@zedvision/emotion-react-renderer@${emotionRenderer}/dist/bundle.js`,
    workerPrefix: window.location.hostname === "blog.zed.vision"
      ? `https://blog.zed.vision/code/src/workers`
      : window.location.hostname === "[::1]"
      ? `${location.href}src/workers`
      : `${location.origin}/src/workers`,
  };

  return v;
}

export const v = versions();
export default versions;
