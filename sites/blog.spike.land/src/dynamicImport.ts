import { wait } from "axax/esnext/wait";


const moduleCache = {};

export const dynamicImport = async(moduleName: string)=> { 
    if (moduleCache[moduleName]) return moduleCache[moduleName];
    let i =0;
    while(i++<100){

    
    if(window.importShim) {
        const {importShim} = window;

        return moduleCache[moduleName] = await importShim(moduleName);;
    }

    console.log(`lets delay ${i*50} ms`)
    await wait(i*50);

}}

