declare global {
  var setValue: (code: string, i: number, force: boolean) => void;
  var prettierJs: (code: string) => Promise<string>;

  var editable: boolean;
  // let MonacoEnvironment: monaco.Environment;
  var appFactory: (transpiled: string, html: string) => void;
  var transpiled: string;
  var notify: () => void;
  var polyfilling: () => void;
  var currentTarget: HTMLDivElement;
  var codeSpace: string;
  var address: string;
  var rtcConns: { [target: string]: RTCPeerConnection };
  var draggableWindow: number;
  var setCh: React.Dispatch<React.SetStateAction<FC<{}>[]>>;
}
