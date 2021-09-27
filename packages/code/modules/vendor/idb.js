const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
        IDBDatabase,
        IDBObjectStore,
        IDBIndex,
        IDBCursor,
        IDBTransaction,
    ]);
}
function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey,
    ]);
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener("success", success);
            request.removeEventListener("error", error);
        };
        const success = () => {
            resolve(wrap1(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener("success", success);
        request.addEventListener("error", error);
    });
    promise.then((value) => {
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
    }).catch(() => {
    });
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener("complete", complete);
            tx.removeEventListener("error", error);
            tx.removeEventListener("abort", error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException("AbortError", "AbortError"));
            unlisten();
        };
        tx.addEventListener("complete", complete);
        tx.addEventListener("error", error);
        tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            if (prop === "done")
                return transactionDoneMap.get(target);
            if (prop === "objectStoreNames") {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            if (prop === "store") {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        return wrap1(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction &&
        !("objectStoreNames" in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap1(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [
                storeNames,
            ]);
            return wrap1(tx);
        };
    }
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            func.apply(unwrap1(this), args);
            return wrap1(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        return wrap1(func.apply(unwrap1(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === "function")
        return wrapFunction(value);
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes())) {
        return new Proxy(value, idbProxyTraps);
    }
    return value;
}
function wrap1(value) {
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap1 = (value) => reverseTransformCache.get(value);
export { unwrap1 as unwrap, wrap1 as wrap };
function openDB1(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap1(request);
    if (upgrade) {
        request.addEventListener("upgradeneeded", (event) => {
            upgrade(wrap1(request.result), event.oldVersion, event.newVersion, wrap1(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener("blocked", () => blocked());
    openPromise.then((db) => {
        if (terminated)
            db.addEventListener("close", () => terminated());
        if (blocking)
            db.addEventListener("versionchange", () => blocking());
    }).catch(() => {
    });
    return openPromise;
}
function deleteDB1(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener("blocked", () => blocked());
    return wrap1(request).then(() => undefined);
}
const readMethods = [
    "get",
    "getKey",
    "getAll",
    "getAllKeys",
    "count",
];
const writeMethods = [
    "put",
    "add",
    "delete",
    "clear",
];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) &&
        typeof prop === "string")) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));
export { deleteDB1 as deleteDB, openDB1 as openDB };
