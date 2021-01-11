function versions() {
  const code = "11.7.0";
  const shadb = "11.4.16";
  const editor = "11.6.16";
  const emotionRenderer = "11.6.16";

  const v = {
    code,
    shadb,
    ipfs: "0.52.3",
    workbox: "6.0.2",
    babel: "7.12.12",
    prettier: "2.2.1",
    uuid: "8.3.2",
    comlink: "4.3.0",
    editor:
      `https://unpkg.com/@zedvision/smart-monaco-editor@${editor}/dist/editor.js`,
    emotionRenderer:
      `https://unpkg.com/@zedvision/emotion-react-renderer@${emotionRenderer}/dist/bundle.js`,
  };

  return v;
}

export const v = versions();
export default versions;
