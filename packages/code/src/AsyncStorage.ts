
//import "@babel/runtime/helpers/createClass";
//import { AsyncStorageBridge } from '@lepont/async-storage/bridge'

// import {useAsyncStorage} from '@react-native-community/async-storage'
// import { setItem, getItem } from '@lepont/async-storage'

// declare type AsyncStorageStat = {
//     setItem: (k: string, v: string) => Promise<void>;
//     getItem: (k: string) => Promise<string>;
// };

//export const bridge = AsyncStorageBridge(AsyncLocalStorage as unknown as AsyncStorageStat) ;

// const asyncStorage = useAsyncStorage("asyncStorage");

//export {AsyncLocalStorage}
export class AsyncLocalStorage {
    constructor() {
        return (globalThis as unknown as {asyncStorage: object}).asyncStorage;
    }
}

// export default AsyncStorage


//export {AsyncLocalStorage}
