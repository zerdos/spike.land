import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Moon, RotateCcw, Share2, Sun } from "lucide-react";
import { themes } from "prism-react-renderer";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
export const EnhancedEmbeddableEditor = () => {
    const [code, setCode] = useState(() => {
        const savedCode = localStorage.getItem("editorCode");
        return savedCode || `
// Edit this code!
function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Hello, World!</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}

render(<App />);
    `;
    });
    const [editorWidth, setEditorWidth] = useState("50%");
    const [theme, setTheme] = useState("dark");
    useEffect(() => {
        localStorage.setItem("editorCode", code);
    }, [code]);
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    const handleReset = () => {
        setCode(`
// Edit this code!
function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Hello, World!</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}

render(<App />);
    `);
    };
    const handleShare = () => {
        const encodedCode = encodeURIComponent(code);
        const shareableUrl = `${window.location.origin}?code=${encodedCode}`;
        alert(`Share this URL: ${shareableUrl}`);
    };
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            color: theme === "dark" ? "#fff" : "#000",
        },
        toolbar: {
            padding: "10px",
            backgroundColor: theme === "dark" ? "#252525" : "#f0f0f0",
            display: "flex",
            justifyContent: "flex-end",
        },
        editor: {
            fontFamily: "\"Fira code\", \"Fira Mono\", monospace",
            fontSize: 14,
            height: "100%",
            overflow: "auto",
        },
        preview: {
            flex: 1,
            overflow: "auto",
            padding: "20px",
            backgroundColor: theme === "dark" ? "#2d2d2d" : "#f8f8f8",
        },
    };
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            color: theme === "dark" ? "#fff" : "#000",
        }, children: [_jsxs("div", { style: styles.toolbar, children: [_jsx("button", { onClick: handleReset, css: buttonStyle, children: _jsx(RotateCcw, { size: 16 }) }), _jsx("button", { onClick: handleShare, css: buttonStyle, children: _jsx(Share2, { size: 16 }) }), _jsx("button", { onClick: toggleTheme, css: buttonStyle, children: theme === "dark" ? _jsx(Sun, { size: 16 }) : _jsx(Moon, { size: 16 }) })] }), _jsx("div", { css: { display: "flex", flex: 1, overflow: "hidden" }, children: _jsxs(LiveProvider, { code: code, noInline: true, theme: theme === "dark" ? undefined : themes.github, children: [_jsx(Resizable, { size: { width: editorWidth, height: "100%" }, onResizeStop: (_e, _direction, _ref, d) => {
                                setEditorWidth(editorWidth + d.width);
                            }, minWidth: "30%", maxWidth: "70%", children: _jsx(LiveEditor, { onChange: handleCodeChange, style: styles.editor }) }), _jsxs("div", { css: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }, children: [_jsx(LiveError, { css: { padding: "10px", color: "#ff5555", fontFamily: "sans-serif" } }), _jsx(LivePreview, { style: styles.preview })] })] }) })] }));
};
const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    marginLeft: "10px",
    padding: "5px",
    transition: "color 0.3s ease",
    "&:hover": {
        color: "#61dafb",
    },
};
export default EnhancedEmbeddableEditor;
