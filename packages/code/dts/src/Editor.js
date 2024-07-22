import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { isMobile } from "./isMobile.mjs";
import { runner } from "./runner";
import { prettier } from "./shared";
const codeSpace = location.pathname.slice(1).split("/")[1];
const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
const mod = {
    i: 0,
    code: "",
    controller: new AbortController(),
};
const Editor = ({ codeSpace }) => {
    const ref = useRef(null);
    const engine = isMobile() ? "ace" : "monaco";
    const [editorState, setEditorState] = useState({
        i: globalThis.cSess.session.i,
        code: globalThis.cSess.session.code,
        started: false,
        setValue: (_code) => { },
    });
    useEffect(() => {
        if (editorState.started)
            return;
        const initializeEditor = async () => {
            if (!ref.current)
                return;
            mod.i = Number(globalThis.cSess.session.i);
            mod.code = globalThis.cSess.session.code;
            const container = ref.current;
            if (!container)
                return;
            const editorModule = await (engine === "monaco"
                ? initializeMonaco(container, codeSpace, mod.code)
                : initializeAce(container, mod.code));
            setEditorState({
                ...editorState,
                started: true,
                code: mod.code,
                setValue: editorModule.setValue,
            });
        };
        initializeEditor();
    }, [editorState.started, ref]);
    const handleContentChange = async (_code) => {
        const formattedCode = await prettier(_code);
        if (mod.code === formattedCode)
            return;
        mod.i += 1;
        mod.code = formattedCode;
        mod.controller.abort();
        mod.controller = new AbortController();
        const { signal } = mod.controller;
        runner({ code: mod.code, counter: mod.i, codeSpace, signal });
    };
    BC.onmessage = ({ data }) => {
        if (!data.i || !data.code || data.code === mod.code)
            return;
        mod.i = Number(data.i);
        mod.code = data.code;
        setEditorState({ ...editorState, ...mod });
        editorState.setValue(mod.code);
        const { signal } = mod.controller;
        runner({ ...mod, counter: mod.i, codeSpace, signal });
    };
    const EditorNode = (_jsx("div", { "data-test-id": "editor", ref: ref, css: css `
        ${engine === "ace" ? "" : `
          border-right: 4px dashed gray;
          border-bottom: 4px dashed gray;
        `}
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      ` }));
    if (engine === "ace")
        return EditorNode;
    return (_jsx(Rnd, { enableResizing: true, disableDragging: true, minWidth: 800, minHeight: "100vh", bounds: "body", allowAnyClick: true, lockAspectRatio: false, enable: {
            top: false,
            bottom: true,
            right: true,
            left: false,
        }, defaultSize: {
            width: "800px",
            height: "100vh",
        }, children: EditorNode }));
    async function initializeMonaco(container, codeSpace, code) {
        const style = document.createElement("style");
        style.innerHTML = `@import url("${location.origin}/startMonaco.css");`;
        document.head.appendChild(style);
        const { startMonaco } = await import("./startMonaco");
        return await startMonaco({
            container,
            codeSpace,
            code,
            onChange: handleContentChange,
        });
    }
    async function initializeAce(container, code) {
        const { startAce } = await import("./startAce");
        return await startAce(code, handleContentChange, container);
    }
};
export default Editor;
