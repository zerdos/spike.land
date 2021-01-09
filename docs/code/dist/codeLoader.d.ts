/**
 * @param {string} code
 */
export function transpile(code: string): Promise<any>;
/**
  * @param {{ document: Document; open: (url: string)=>void; }} _w
 */
export function run(mode: string | undefined, _w: {
    document: Document;
    open: (url: string) => void;
}, code?: string): Promise<void>;
