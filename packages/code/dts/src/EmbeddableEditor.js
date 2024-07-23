import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { AlertCircle, Download, ExternalLink, Maximize, Moon, QrCode, Sun } from "lucide-react";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
const EmbeddableEditor = () => {
  const [code, setCode] = useState("// Your code here");
  const [output, setOutput] = useState("");
  const [error, seterror] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    try {
      const result = eval(code);
      setOutput(String(result));
      seterror(null);
    } catch (err) {
      seterror(err.message);
    }
  }, [code]);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };
  const generateQRCode = () => {
    console.log("Generating QR Code");
  };
  const openInNewWindow = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <body>
          <div id="root"></div>
          <script>
            ${code}
          </script>
        </body>
      </html>
    `);
  };
  const downloadApp = () => {
    const element = document.createElement("a");
    const file = new Blob([`
      <html>
        <body>
          <div id="root"></div>
          <script>
            ${code}
          </script>
        </body>
      </html>
    `], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "app.html";
    document.body.appendChild(element);
    element.click();
  };
  return (_jsxs("div", {
    className: `h-screen flex ${isDarkMode ? "dark" : ""}`,
    children: [
      _jsx("div", {
        className: "w-1/2 h-full bg-gray-100 dark:bg-gray-800 p-4",
        children: _jsx("div", { children: "MONACOMONACO" }),
      }),
      _jsxs("div", {
        className: "w-1/2 h-full flex flex-col",
        children: [
          _jsxs("div", {
            className: "flex justify-end p-2 bg-gray-200 dark:bg-gray-700",
            children: [
              _jsx(Button, {
                onClick: () => setIsDarkMode(!isDarkMode),
                variant: "ghost",
                size: "icon",
                children: isDarkMode ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }),
              }),
              _jsx(Button, {
                onClick: toggleFullScreen,
                variant: "ghost",
                size: "icon",
                children: _jsx(Maximize, { className: "h-4 w-4" }),
              }),
              _jsx(Button, {
                onClick: generateQRCode,
                variant: "ghost",
                size: "icon",
                children: _jsx(QrCode, { className: "h-4 w-4" }),
              }),
              _jsx(Button, {
                onClick: openInNewWindow,
                variant: "ghost",
                size: "icon",
                children: _jsx(ExternalLink, { className: "h-4 w-4" }),
              }),
              _jsx(Button, {
                onClick: downloadApp,
                variant: "ghost",
                size: "icon",
                children: _jsx(Download, { className: "h-4 w-4" }),
              }),
            ],
          }),
          _jsx(Resizable, {
            defaultSize: { width: "100%", height: "50%" },
            minHeight: "20%",
            maxHeight: "80%",
            enable: {
              top: true,
              right: false,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            },
            children: _jsxs("div", {
              className: "bg-white dark:bg-gray-900 p-4 h-full overflow-auto",
              children: [
                _jsx("h2", { className: "text-xl font-bold mb-2 dark:text-white", children: "Output" }),
                _jsx("pre", { className: "bg-gray-100 dark:bg-gray-800 p-2 rounded", children: output }),
              ],
            }),
          }),
          _jsx("div", {
            className: "flex-grow bg-gray-50 dark:bg-gray-900 p-4 overflow-auto",
            children: error
              && (_jsxs(Alert, {
                variant: "destructive",
                children: [
                  _jsx(AlertCircle, { className: "h-4 w-4" }),
                  _jsx(AlertTitle, { children: "Error" }),
                  _jsx(AlertDescription, { children: error }),
                ],
              })),
          }),
        ],
      }),
    ],
  }));
};
export default EmbeddableEditor;
