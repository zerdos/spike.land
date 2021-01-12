(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "yTfI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getIpfs", function() { return /* binding */ getIpfs; });

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("VtSi");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /home/zed/z/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("3yYM");

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("QsI/");

// CONCATENATED MODULE: ../code/dist/importScript.js
/**
 *
 * @param {string} src
 * @param {*} res
 */var importScript=function importScript(src,res){if(res===void 0){res=[];}var prefix=src.slice(0,8);// if (prefix === "https://") {
return window.document.head.querySelector("script[src=\""+src+"\"]")||new Promise(function(resolve,reject){var s=window.document.createElement("script");s.src=src;// s.async = "async";
// s.type = "application/javascript";
s.onload=function(){if(res.length===0){resolve(window);}var ret={};res.forEach(// deno-lint-ignore ban-ts-comment
//@ts-ignore
function(x){return Object.assign(ret,window[x]);});resolve(ret);};s.onerror=reject;window.document.head.appendChild(s);});// }
};/**
 *
 * @param {string} src
 * @param {string} cssId
 */var importCss=function importCss(src,cssId){if(!window.document.getElementById(cssId)){var head=window.document.getElementsByTagName("head")[0];var link=window.document.createElement("link");link.id=cssId;link.rel="stylesheet";link.type="text/css";link.href=src;link.media="all";head.appendChild(link);}return true;};
// CONCATENATED MODULE: ../code/dist/ipfsClient.js
//@ts-ignore
var ipfs;var getIpfs=/*#__PURE__*/function(){var _ref=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(){var _yield$importScript,IpfsMessagePortClient,workerSrc,worker,_worker,_MessageChannel,port1,port2;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!ipfs){_context.next=2;break;}return _context.abrupt("return",ipfs);case 2:_context.next=4;return importScript("https://unpkg.com/ipfs-message-port-client@0.4.3/dist/index.min.js");case 4:_yield$importScript=_context.sent;IpfsMessagePortClient=_yield$importScript.IpfsMessagePortClient;workerSrc=window.location.hostname==="blog.zed.vision"?"https://blog.zed.vision/code/src/ipfsWorker.js":window.location.hostname==="[::1]"?location.href+"src/ipfsWorker.js":location.origin+"/src/ipfsWorker.js";if(typeof SharedWorker!=="undefined"){worker=new SharedWorker(workerSrc);ipfs=IpfsMessagePortClient.from(worker.port);}else{_worker=new Worker(workerSrc);_MessageChannel=new MessageChannel(),port1=_MessageChannel.port1,port2=_MessageChannel.port2;port1.onmessage=function(e){_worker.postMessage(e.data,[e.data]);};_worker.onmessage=function(e){port1.postMessage(e.data,[e.data]);};ipfs=IpfsMessagePortClient.from(port2);}return _context.abrupt("return",ipfs);case 9:case"end":return _context.stop();}}},_callee);}));return function getIpfs(){return _ref.apply(this,arguments);};}();

/***/ })

}]);
//# sourceMappingURL=16-40f3e483eaead5aa6d88.js.map