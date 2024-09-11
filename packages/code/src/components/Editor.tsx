import React, { useEffect, useRef, useState } from "react";
import { md5 } from "@/lib/md5";
import { cn } from "@/lib/utils";
import { ICode } from "@src/cSess.interface";
import { ICodeSession } from "@/lib/interfaces";
import { useAutoSave } from "../hooks/autoSave";
import { initializeAce, initializeMonaco, useEditorState, useErrorHandling } from "./editorUtils";
import { EditorNode } from "./ErrorReminder";
import { ContextViewer } from "./ContextViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sidebar } from "lucide-react";

interface EditorProps {
  codeSpace: string;
  cSess: ICode;
  readOnly?: boolean;
}

export const Editor: React.FC<EditorProps> = ({ codeSpace, cSess }) => {
  const [showContext, setShowContext] = useState(false);
  const { containerRef, engine, editorState, setEditorState } = useEditorState();
  const { error, onError } = useErrorHandling();
  const [errorType, setError] = useState(error);
  const [currentCode, setCurrentCode] = useState("");

  const mod = useRef({
    i: 0,
    code: "",
    html: "",
    cssIds: "",
    md5Ids: [] as string[],
    controller: new AbortController(),
  });

  useAutoSave({
    key: `editor_${codeSpace}`,
    data: { code: currentCode, i: mod.current.i },
    debounceMs: 60000,
  });

  const handleContentChange = async (newCode: string) => {
    console.log("Content change", mod.current.i, md5(newCode));

    if (newCode.includes("/** invalid")) return;

    const formattedCode = await cSess.setCode(newCode);

    if (typeof formattedCode === "string") {
      mod.current.md5Ids.push(md5(formattedCode));
      mod.current.code = formattedCode;
    }
  };

  useEffect(() => {
    onError((error: string | null) => {
      setError(error);
    });

    if (editorState.started && !editorState.sub) {
      const handleBroadcastMessage = async ({ data }: { data: ICodeSession }) => {
        if (data.code === mod.current.code) return;
        if (data.code === currentCode) return;

        const md5Code = md5(data.code);

        if (mod.current.md5Ids.includes(md5Code)) return;
        mod.current.md5Ids.push(md5Code);
        mod.current.md5Ids = mod.current.md5Ids.slice(-10);

        mod.current.controller.abort();
        mod.current.controller = new AbortController();
        const { signal } = mod.current.controller;

        if (signal.aborted) return;
        mod.current.code = data.code;
        setCurrentCode(data.code);
        console.log("Set new code to editor", md5Code);
        editorState.setValue(data.code);
      };

      cSess.sub((sess: ICodeSession) => handleBroadcastMessage({ data: sess }));

      setEditorState(e => ({ ...e, sub: true }));
      return;
    }

    const initializeEditor = async () => {
      mod.current.i = Number(cSess.session.i);
      mod.current.code = cSess.session.code;
      setCurrentCode(cSess.session.code);

      if (!containerRef || !containerRef.current) return;

      const editorModule = await (engine === "monaco"
        ? initializeMonaco(containerRef.current, codeSpace, mod.current.code, handleContentChange)
        : initializeAce(containerRef.current, mod.current.code, handleContentChange));

      console.log("Editor initialized", mod.current.i);
      setEditorState({
        ...editorState,
        started: true,
        code: mod.current.code,
        setValue: (code: string) => editorModule.setValue(code),
      });
    };

    initializeEditor();
  }, [editorState.started, codeSpace, engine, containerRef, setEditorState]);

  return (
    <div className="flex h-screen w-full max-w-[800px] overflow-hidden">
      <Card className={cn(
        "transition-all duration-300 ease-in-out",
        showContext ? "w-64" : "w-12"
      )}>
        <CardContent className="p-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowContext(!showContext)}
            className="mb-4 w-full"
          >
            <Sidebar className={cn(
              "h-4 w-4 transition-all",
              showContext && "rotate-180"
            )} />
          </Button>
          {showContext && (
            <div className="overflow-y-auto h-[calc(100vh-64px)]">
              <ContextViewer codeSpace={codeSpace} />
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex-grow overflow-hidden">
        <EditorNode
          engine={engine as "monaco" | "ace"}
          errorType={errorType as "typescript" | "prettier" | "transpile" | "render" | null}
          containerRef={containerRef}
          codeSpace={codeSpace}
        />
      </div>
    </div>
  );
};