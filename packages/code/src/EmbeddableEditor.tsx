import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Resizable } from 're-resizable';
import { Play, RotateCcw, Share2 } from 'lucide-react';

const EmbeddableEditor = () => {
  const [code, setCode] = useState(`
// Edit this code!
function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Hello, World!</h1>
      <p>Start editing to see some magic happen!</p>
    </div>
  );
}
  `);

  const [editorWidth, setEditorWidth] = useState('50%');

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
    `);
  };

  const handleShare = () => {
    // Implement sharing functionality here
    alert('Sharing functionality to be implemented');
  };

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#1e1e1e',
      color: '#fff',
    }}>
      <div css={{
        padding: '10px',
        backgroundColor: '#252525',
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <button onClick={handleReset} css={buttonStyle}><RotateCcw size={16} /></button>
        <button onClick={handleShare} css={buttonStyle}><Share2 size={16} /></button>
      </div>
      <div css={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LiveProvider code={code} noInline={true}>
          <Resizable
            size={{ width: editorWidth, height: '100%' }}
            onResizeStop={(e, direction, ref, d) => {
              setEditorWidth(ref.style.width);
            }}
            minWidth="30%"
            maxWidth="70%"
          >
            <LiveEditor 
              onChange={handleCodeChange}
              css={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                height: '100%',
                overflow: 'auto',
              }}
            />
          </Resizable>
          <div css={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <LiveError css={{ padding: '10px', color: '#ff5555', fontFamily: 'sans-serif' }}/>
            <LivePreview css={{ flex: 1, overflow: 'auto', padding: '20px' }}/>
          </div>
        </LiveProvider>
      </div>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  marginLeft: '10px',
  padding: '5px',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#61dafb',
  },
};

export default EmbeddableEditor;