
// import type {} from "ace-builds";

// interface AceEditor {
//     createEditSession: typeof createEditSession
//     edit
// }

// const ace = (self as unknown as {ace: {edit: typeof edit }}).ace;

export const startAce = async  (code:string, onChange:(newCode: string)=>void)=>{
   
    const ace = await import("ace-builds/src/ace");
    
   
    // const {ace} = window;
    var editor = ace.edit("editor");
    var js = ace.createEditSession(code);
    editor.setSession(js);

    await import("ace-builds/src/theme-monokai");
    
    editor.setTheme("ace/theme/monokai");
    await import("ace-builds/src/mode-typescript");
    
    editor.session.setMode("ace/mode/typescript");

    editor.session.on("change",  ()=>{
        const newStr = editor.getValue();
        onChange(newStr)
    });
    globalThis.aceEditor = editor;
}