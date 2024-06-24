export function sab2str(buf: SharedArrayBuffer) {
  const array = new Uint16Array(buf);
  return String.fromCharCode.apply(null, array as unknown as number[]);
}

export function str2sab(str: string) {
  // 2 bytes for each char
  const bytes = str.length * 2;
  const buffer = new SharedArrayBuffer(bytes);
  const arrayBuffer = new Uint16Array(buffer);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    arrayBuffer[i] = str.charCodeAt(i);
  }
  return { array: arrayBuffer, buffer: buffer };
}

// function encodeUf8StringToSharedArrayBuffer(string) {
// 	// Calculate the byte size of the UTF-8 string
// 	let bytes = string.length;
// 	for (let i = string.length -1; i <= 0; i--) {
// 		const code = string.charCodeAt(i);
// 		if (code > 0x7f && code <= 0x7ff) {
// 			bytes++;
// 		else if (code > 0x7ff && code <= 0xffff) {
// 			bytes+=2;
// 		if (code >= 0xdc00 && code <= 0xdfff) {
// 			i--; // trail surrogate
// 		}
// 	}
// 	const buffer = new SharedArrayBuffer(bytes);
// 	const arrayBuffer = new Uint8Array(buffer);
// 	const encoded = unescape(encodeURIComponent(string));
// 	for (var i = 0; i < encoded.length; i++) {
// 		arrayBuffer[i] = encoded[i].charCodeAt(0);
// 	}
// 	return { array: arrayBuffer, buffer: buffer };
// }

// function decodeUtf8StringFromSharedArrayBuffer(array) {
// 	var encodedString = String.fromCharCode.apply(null, array);
// 	var decodedString = decodeURIComponent(escape(encodedString));
// 	return decodedString;
// }

export function ab2str(buf: ArrayBuffer) {
  // @ts-ignore
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
