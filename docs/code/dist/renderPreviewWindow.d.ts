/**
 * @param {string} mode
 * @param {{ unmount?: () => void; hydrated?: boolean; preRendered?: boolean; lastErrors?: number; rootElement?: null; div: any; HTML: any; devtoolHash?: string; ipfs?: number; transpiled: any; code: any; }} session
 * @param {{ (url: string): void; (arg0: string): void; }} open
 * @param {{ code?: string; shadb?: string; ipfs?: string; workbox?: string; babel?: string; prettier?: string; uuid?: string; comlink?: string; editor?: string; DraggableWindow: any; emotionRenderer?: string; }} v
 * @param {(arg0: any, arg1: HTMLDivElement) => void} renderEmotion
 * @param {(arg0: any, arg1: { onShare: () => Promise<void>; }) => any} jsx
 */
export function renderPreviewWindow(mode: string, session: {
    unmount?: () => void;
    hydrated?: boolean;
    preRendered?: boolean;
    lastErrors?: number;
    rootElement?: null;
    div: any;
    HTML: any;
    devtoolHash?: string;
    ipfs?: number;
    transpiled: any;
    code: any;
}, open: {
    (url: string): void;
    (arg0: string): void;
}, v: {
    code?: string;
    shadb?: string;
    ipfs?: string;
    workbox?: string;
    babel?: string;
    prettier?: string;
    uuid?: string;
    comlink?: string;
    editor?: string;
    DraggableWindow: any;
    emotionRenderer?: string;
}, renderEmotion: (arg0: any, arg1: HTMLDivElement) => void, jsx: (arg0: any, arg1: {
    onShare: () => Promise<void>;
}) => any): Promise<void>;
