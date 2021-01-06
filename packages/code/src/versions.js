export default function () {
  const editor = "11.3.0";
  const emotionRenderer = "11.4.7";

  const v = {
    ipfs: "0.52.3",
    workbox: "6.0.2",
    babel: "7.12.12",
    code: "11.4.11",
    emotionRenderer:
      `https://unpkg.com/@zedvision/emotion-react-renderer@${emotionRenderer}/dist/bundle.js`,
    shadb: "11.4.5",
    prettier: "2.2.1",
    editor:
      `https://unpkg.com/@zedvision/smart-monaco-editor@${editor}/dist/editor.js`,
    diff: "11.4.3",
    sha256: "11.0.5",
    uuid: "8.3.2",
    comlink: "4.3.0",
  };

  return v;
}
