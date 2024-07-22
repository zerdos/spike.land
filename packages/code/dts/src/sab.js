export function sab2str(buf) {
    const array = new Uint16Array(buf);
    return String.fromCharCode.apply(null, array);
}
export function str2sab(str) {
    const bytes = str.length * 2;
    const buffer = new SharedArrayBuffer(bytes);
    const arrayBuffer = new Uint16Array(buffer);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        arrayBuffer[i] = str.charCodeAt(i);
    }
    return { array: arrayBuffer, buffer: buffer };
}
export function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
export function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
