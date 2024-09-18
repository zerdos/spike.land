import { editor } from "@/external/monaco-editor";
import { useThrottle } from "@uidotdev/usehooks";
import React, { memo, useEffect, useRef } from "react";

interface DiffEditorProps {
  original: string;
  modified: string;
  language?: string;
  readOnly?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

const minHeight = 100;
const maxHeight = window.innerHeight - 200;

const calculateHeight = (text: string) => {
  const lines = text.split(/\r\n|\r|\n/).length +1 ;
  return Math.min(maxHeight, Math.max(minHeight, lines * 19));
};


export const DiffEditor: React.FC<DiffEditorProps> = memo(({
  original: _original = "",
  modified: _modified = "",
  language = "text/plain",
  readOnly = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diffEditorRef = useRef<editor.IStandaloneDiffEditor | null>(null);
  
  const original = useThrottle(_original, 200);
  const modified = useThrottle(_modified, 200);

  const editorHeight =Math.max(calculateHeight(original), calculateHeight(modified));



  useEffect(() => {
    if (containerRef.current && !diffEditorRef.current) {

      const shadowRoot = containerRef.current.attachShadow({
        mode: 'closed'
      });
  
      const innerContainer = document.createElement('div');
        shadowRoot.appendChild(innerContainer);
        innerContainer.style.width = containerRef.current.getClientRects()[0].width + 'px';
        innerContainer.style.height =  containerRef.current.getClientRects()[0].height + 'px';
  
        const monacoInnerStyle = (globalThis as unknown as {monacoInnerStyle: HTMLStyleElement }).monacoInnerStyle || document.createElement('style');

        if (!monacoInnerStyle.innerText) {
          monacoInnerStyle.innerText = "/*monaco-editor?bundle&css*/";
          fetch("/*monaco-editor?bundle&css").then(x=>x.text()).then(x=>monacoInnerStyle.innerText =x)
        }
        shadowRoot.appendChild(monacoInnerStyle);

      const diffEditor = editor.createDiffEditor(innerContainer, {
        diffAlgorithm: "advanced",
        readOnly,
        diffWordWrap: "on",
        wordWrap: "on",
        wordWrapColumn: 80,
        padding: { top: 20, bottom: 20 },
        automaticLayout: false,
        onlyShowAccessibleDiffViewer: false,
        hideUnchangedRegions: {
          enabled: false,
        },
        lineNumbers: "off",
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        renderSideBySide: false,
        renderOverviewRuler: false,
        theme: "vs-dark",
      });

      diffEditor.setModel({
        original: editor.createModel(original, language),
        modified: editor.createModel(modified, language),
      });
      

      diffEditorRef.current = diffEditor;
      diffEditor.layout();
    }

    return () => {
      if (diffEditorRef.current) {
        
        const diffModels = diffEditorRef.current.getModel();
        diffEditorRef.current.dispose();
        if (diffModels) {
          diffModels.original.dispose();
          diffModels.modified.dispose();
        }
        diffEditorRef.current = null;

      
      }
    };
  }, [language, readOnly]); // Only run when language or readOnly changes

  useEffect(()=> {
    if (diffEditorRef.current) {
      const diffModels = diffEditorRef.current.getModel();
      if (diffModels) {
        if (diffModels.original.getValue() !== original) {
          diffModels.original.setValue(original);
          diffEditorRef.current.layout();
        }

        if (diffModels.modified.getValue() !== modified) {
          diffModels.modified.setValue(modified);
          diffEditorRef.current.layout();
        }
        diffEditorRef.current.layout({
          height: editorHeight,
          width: containerRef.current?.clientWidth || 0,
        });

      }
      }}, [original, modified]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: `${editorHeight}px`,
        maxHeight: `${maxHeight}px`,
        minHeight: `${minHeight}px`,
        border: "1px solid #ccc",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    />
  );
});

DiffEditor.displayName = "DiffEditor";

export default DiffEditor;