/**
  * @param {{ document: Document; open: (url: string)=>void; }} _w
 */
export function run(mode: string | undefined, _w: {
    document: Document;
    open: (url: string) => void;
}): Promise<void>;
