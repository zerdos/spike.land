import { Moon, Play, RotateCcw, Share2, Sun } from "lucide-react";
import { Resizable } from "re-resizable";
import React, { FC, useEffect, useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

export const EnhancedEmbeddableEditor: FC = () => {
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
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    localStorage.setItem("editorCode", code);
  }, [code]);

  const handleCodeChange = (newCode: string) => {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <div style={styles.toolbar}>
        <button onClick={handleReset} css={buttonStyle}>
          <RotateCcw size={16} />
        </button>
        <button onClick={handleShare} css={buttonStyle}>
          <Share2 size={16} />
        </button>
        <button onClick={toggleTheme} css={buttonStyle}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
      <div css={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <LiveProvider code={code} noInline={true} theme={theme === "dark" ? undefined : githubLight}>
          <Resizable
            size={{ width: editorWidth, height: "100%" }}
            onResizeStop={(_e, _direction, _ref, d) => {
              setEditorWidth(editorWidth + d.width);
            }}
            minWidth="30%"
            maxWidth="70%"
          >
            <LiveEditor
              onChange={handleCodeChange}
              style={styles.editor}
            />
          </Resizable>
          <div css={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <LiveError css={{ padding: "10px", color: "#ff5555", fontFamily: "sans-serif" }} />
            <LivePreview style={styles.preview} />
          </div>
        </LiveProvider>
      </div>
    </div>
  );
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
