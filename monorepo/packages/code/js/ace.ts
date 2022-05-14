

export const startAce = async  (code:string, onChange:(newCode: string)=>void)=>{
    await import("ace-builds/src/ace")
    
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