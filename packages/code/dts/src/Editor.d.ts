interface EditorProps {
    codeSpace: string;
    onCodeUpdate: (newCode: string) => void;
}
export interface EditorRef {
    setValue: (code: string) => void;
}
declare const Editor: import("react").ForwardRefExoticComponent<EditorProps & import("react").RefAttributes<EditorRef>>;
export default Editor;
