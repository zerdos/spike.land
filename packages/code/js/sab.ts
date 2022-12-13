export function sab2str(buf: SharedArrayBuffer) {
  // @ts-ignore
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function str2sab(str: string) {
  var buf = new SharedArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
