export default function () {
  const editor = "11.3.0";
  const emotionRenderer = "11.4.7";

  const v = {
    ipfs: "0.52.3",
    workbox: "6.0.2",
    babel: "7.12.12",
    code: "11.4.19",
    DraggableWindow:
      "https://code.zed.vision/ipfs/QmPszD6UC3kYc3WRCttGFKqnqvSUvrSxvVbAouNRSQTsHF/app.js",
    emotionRenderer:
      `https://unpkg.com/@zedvision/emotion-react-renderer@${emotionRenderer}/dist/bundle.js`,
    shadb: "11.4.16",
    prettier: "2.2.1",
    editor:
      `https://unpkg.com/@zedvision/smart-monaco-editor@${editor}/dist/editor.js`,
    uuid: "8.3.2",
    comlink: "4.3.0",
  };

  return v;
}
