const mime = require('mime');

console.log(mime.getType('txt'));               // ⇨ 'text/plain'             
console.log(mime.getExtension('text/plain'));   // ⇨ 'txt'