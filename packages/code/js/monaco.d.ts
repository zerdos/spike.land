import { ExecSyncOptionsWithStringEncoding } from "child_process";
import * as monaco from "monaco-editor";
import type { FC, ReactElement, ReactNode } from "react";
import type { Root } from "react-dom/client";
import type { ICodeSession } from "./session";

declare module "preact/compat/server.*";

declare global {
  var appRoot: Root;
  var setValue: (code: string, i: number, force: boolean) => void;
  var prettierJs: (code: string) => Promise<string>;

  var editable: boolean;
  // let MonacoEnvironment: monaco.Environment;
  var editor: ReturnType<typeof monaco.editor.create>;
  var model: monaco.editor.IModel;
  var App: ReactElement;
  var appFactory: (transpiled: string, html: string) => void;
  var transpiled: string;
  var notify: () => void;
  var startState: ICodeSession;
  var polyfilling: () => void;
  var currentTarget: HTMLDivElement;
  var codeSpace: string;
  var address: string;
  var apps: { [key: string]: ReactElement };
  var aceEditor: monaco.editor.IModel;
  var rtcConns: { [target: string]: RTCPeerConnection };
  var draggableWindow: number;
  var setCh: React.Dispatch<
    React.SetStateAction<
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
      | null
      | undefined
    >
  >;
}
