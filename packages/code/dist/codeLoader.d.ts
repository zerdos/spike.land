/**
 * @param {{ document: Document; open: (url: string)=>void; }} _w
 */
export function run(mode: string | undefined, _w: {
    document: Document;
    open: (url: string) => void;
}): Promise<void>;
export const versions: {
    ipfs: string;
    babel: string;
    code: string;
    emotionRenderer: string;
    shadb: string;
    prettier: string;
    editor: string;
    diff: string;
    sha256: string;
    uuid: string;
    comlink: string;
};
