import { interval } from "axax/esnext/interval";

export const dynamicImport = async(module: string)=> { 
    for await (const item of interval(100)) {
    const {importShims} = window;;

    if(importShims) {
        return importShims(module);
        break;         // stop the iterable
    }
}
}