(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "7jdZ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/forkMe-1a2bcb7dd2c870c3afe5d50466500c18.png";

/***/ }),

/***/ "QeBL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
var taggedTemplateLiteralLoose = __webpack_require__("fhSp");

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__("VtSi");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: /home/zed/z/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("3yYM");

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("QsI/");

// EXTERNAL MODULE: /home/zed/z/node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__("f7k3");

// EXTERNAL MODULE: /home/zed/z/node_modules/react/index.js
var react = __webpack_require__("ERkP");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__("Wbzz");

// EXTERNAL MODULE: ./src/components/bio.tsx
var bio = __webpack_require__("IgZc");

// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__("9Dj+");

// EXTERNAL MODULE: ./src/components/seo.tsx
var seo = __webpack_require__("H8eV");

// CONCATENATED MODULE: ./src/components/code/getUser.ts



var shaDB = {
  get: function () {
    var _get = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(key, type) {
      var _yield$import, getDB, db;

      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(null, "4gTr"));

            case 2:
              _yield$import = _context.sent;
              getDB = _yield$import.getDB;
              _context.next = 6;
              return getDB("shaDB");

            case 6:
              _context.t0 = _context.sent;
              _context.next = 9;
              return (0, _context.t0)();

            case 9:
              db = _context.sent;
              return _context.abrupt("return", db.get(key, type));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function get(_x, _x2) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  put: function () {
    var _put = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(key, value) {
      var _yield$import2, getDB, db;

      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(null, "4gTr"));

            case 2:
              _yield$import2 = _context2.sent;
              getDB = _yield$import2.getDB;
              _context2.next = 6;
              return getDB("shaDB");

            case 6:
              _context2.t0 = _context2.sent;
              _context2.next = 9;
              return (0, _context2.t0)();

            case 9:
              db = _context2.sent;
              return _context2.abrupt("return", db.put(key, value));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function put(_x3, _x4) {
      return _put.apply(this, arguments);
    }

    return put;
  }()
};
function getUserId() {
  return _getUserId.apply(this, arguments);
}

function _getUserId() {
  _getUserId = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
    var uuid, resp, data;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(typeof window === "undefined")) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", "");

          case 2:
            _context3.next = 4;
            return shaDB.get("uuid", "string");

          case 4:
            uuid = _context3.sent;

            if (uuid) {
              _context3.next = 15;
              break;
            }

            _context3.next = 8;
            return fetch("https://zed.vision/register");

          case 8:
            resp = _context3.sent;
            _context3.next = 11;
            return resp.json();

          case 11:
            data = _context3.sent;
            _context3.next = 14;
            return shaDB.put("uuid", data.uuid);

          case 14:
            return _context3.abrupt("return", data.uuid);

          case 15:
            return _context3.abrupt("return", uuid);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getUserId.apply(this, arguments);
}
// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__("cINY");

// EXTERNAL MODULE: /home/zed/z/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("zjfJ");

// CONCATENATED MODULE: ../code/dist/versions.js
function versions(){var code="11.6.13";var shadb="11.4.16";var editor="11.6.3";var emotionRenderer="11.6.3";var v={code:code,shadb:shadb,ipfs:"0.52.3",workbox:"6.0.2",babel:"7.12.12",prettier:"2.2.1",uuid:"8.3.2",comlink:"4.3.0",editor:"https://unpkg.com/@zedvision/smart-monaco-editor@"+editor+"/dist/editor.js",emotionRenderer:"https://unpkg.com/@zedvision/emotion-react-renderer@"+emotionRenderer+"/dist/bundle.js"};return v;}var v=versions();/* harmony default export */ var dist_versions = (versions);
// CONCATENATED MODULE: ../code/dist/hash.js
var hash_v=dist_versions();/**
 *
 * @param {string} cid
 */var feedTheCache=function feedTheCache(cid){return console.log(cid);};// fetch(`https://code.zed.vision/ipfs/${cid}`).then((resp) => resp.text()).then(
//   console.log,
// );
/**
 * @param {string | any[]} data
 */var half=function half(data){var halfLength=(data.length-data.length%2)/2;if(data.slice(0,halfLength-1)===data.slice(halfLength+1,2*halfLength)){return data.slice(0,halfLength);}// console.log({
//   slice1: data.slice(0, halfLength) ,
//   slice2: data.slice(halfLength-1, 2 * halfLength-1)
// })
return data;};/** @type {null | {add: (data: string)=>Promise<string>}} */var ipfsClient=null;function getClient(){return _getClient.apply(this,arguments);}/**
 * @param {any} data
 * @param {any} onlyHash
 */function _getClient(){_getClient=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee5(){return regenerator_default.a.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:if(!ipfsClient){_context5.next=2;break;}return _context5.abrupt("return",ipfsClient);case 2:_context5.next=4;return new Function(window.location.hostname==="[::1]"?"return import(\"./ipfsKV.js\")":"return import(\"https://blog.zed.vision/code/src/ipfsKV.js\")")();case 4:_context5.next=6;return _context5.sent.getIpfsClient();case 6:ipfsClient=_context5.sent;return _context5.abrupt("return",ipfsClient);case 8:case"end":return _context5.stop();}}},_callee5);}));return _getClient.apply(this,arguments);}var hash=/*#__PURE__*/function(){var _ref=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee(data,onlyHash){var client,noisyHashes,res;return regenerator_default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return getClient();case 2:client=_context.sent;if(!(client===null)){_context.next=5;break;}return _context.abrupt("return",{success:false});case 5:_context.t0=Promise;_context.next=8;return client.add(""+data,{onlyHash:onlyHash});case 8:_context.t1=_context.sent;_context.t2=[_context.t1];_context.next=12;return _context.t0.all.call(_context.t0,_context.t2);case 12:noisyHashes=_context.sent;if(onlyHash){_context.next=16;break;}_context.next=16;return Promise.all(noisyHashes.map(feedTheCache));case 16:if(!onlyHash){_context.next=21;break;}_context.next=19;return Promise.all(noisyHashes.map(function(cid){return getHash(cid,20000).then(function(x){return{success:x===data};});}));case 19:res=_context.sent;return _context.abrupt("return",res[0]);case 21:return _context.abrupt("return",{success:true});case 22:case"end":return _context.stop();}}},_callee);}));return function hash(_x,_x2){return _ref.apply(this,arguments);};}();/**
 * @param {string} cid
 * @param {number|undefined} _timeOut
 */var getHash=/*#__PURE__*/function(){var _ref2=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee2(cid,_timeOut){var timeout,client,data;return regenerator_default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:timeout=_timeOut||20000;_context2.prev=1;_context2.next=4;return getClient();case 4:client=_context2.sent;if(!(client===null)){_context2.next=7;break;}return _context2.abrupt("return",{success:false});case 7:_context2.next=9;return client.cat(cid,{timeout:timeout});case 9:data=_context2.sent;if(!(typeof data==="string")){_context2.next=12;break;}return _context2.abrupt("return",half(data));case 12:console.error({data:data});_context2.next=18;break;case 15:_context2.prev=15;_context2.t0=_context2["catch"](1);console.log({e:_context2.t0});case 18:case"end":return _context2.stop();}}},_callee2,null,[[1,15]]);}));return function getHash(_x3,_x4){return _ref2.apply(this,arguments);};}();/**
 * @param {string} signal => Promise<{success: boolean}>
 */var waitForSignal=function waitForSignal(signal){return hash(signal,true).catch(function(){return{success:false};});};/**
 * @param {string} signal => Promise<{success: boolean}>
 */var sendSignal=function sendSignal(signal){return hash(signal,false);};/**
 * @param {string} url
 */var waitForSignalAndJump=/*#__PURE__*/function(){var _ref3=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee3(url){var _yield$waitForSignal,success;return regenerator_default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.prev=0;_context3.next=3;return waitForSignal(url);case 3:_yield$waitForSignal=_context3.sent;success=_yield$waitForSignal.success;if(success){window.location.href=url;}_context3.next=11;break;case 8:_context3.prev=8;_context3.t0=_context3["catch"](0);console.log({msg:"SignalAndJump error",e:_context3.t0});case 11:_context3.prev=11;console.log({msg:"SignalAndJump Final"});return _context3.finish(11);case 14:case"end":return _context3.stop();}}},_callee3,null,[[0,8,11,14]]);}));return function waitForSignalAndJump(_x5){return _ref3.apply(this,arguments);};}();/**
 * @param {{signal: string, onSignal: ()=>any, onError?: ()=>any, onExpired?: ()=>any }} opts
 */var waitForSignalAndRun=/*#__PURE__*/function(){var _ref5=Object(asyncToGenerator["a" /* default */])(/*#__PURE__*/regenerator_default.a.mark(function _callee4(_ref4){var signal,onSignal,onError,onExpired,_yield$waitForSignal2,success;return regenerator_default.a.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:signal=_ref4.signal,onSignal=_ref4.onSignal,onError=_ref4.onError,onExpired=_ref4.onExpired;_context4.prev=1;_context4.next=4;return waitForSignal(signal);case 4:_yield$waitForSignal2=_context4.sent;success=_yield$waitForSignal2.success;if(!success){_context4.next=10;break;}if(!(typeof onSignal==="function")){_context4.next=9;break;}return _context4.abrupt("return",onSignal());case 9:return _context4.abrupt("return",0);case 10:return _context4.abrupt("return",1);case 13:_context4.prev=13;_context4.t0=_context4["catch"](1);if(!(typeof onError==="function")){_context4.next=17;break;}return _context4.abrupt("return",onError());case 17:return _context4.abrupt("return",1);case 18:_context4.prev=18;if(!(typeof onExpired==="function")){_context4.next=21;break;}return _context4.abrupt("return",onExpired());case 21:return _context4.abrupt("return",-1);case 23:case"end":return _context4.stop();}}},_callee4,null,[[1,13,18,23]]);}));return function waitForSignalAndRun(_x6){return _ref5.apply(this,arguments);};}();
// CONCATENATED MODULE: ../qrious/dist/qrious.esm.js
var c=function c(i,e){return function(){return e||(e={exports:{}},i(e.exports,e)),e.exports;};};var E=c(function(t0,O){"use strict";var w=function w(){},le=Object.prototype.hasOwnProperty,ve=Array.prototype.slice;function de(i,e){var t;return typeof Object.create=="function"?t=Object.create(i):(w.prototype=i,t=new w(),w.prototype=null),e&&N(!0,t,e),t;}function _e(i,e,t,r){var x=this;return typeof i!="string"&&(r=t,t=e,e=i,i=null),typeof e!="function"&&(r=t,t=e,e=function e(){return x.apply(this,arguments);}),N(!1,e,x,r),e.prototype=de(x.prototype,t),e.prototype.constructor=e,e.class_=i||x.class_,e.super_=x,e;}function N(i,e,t){t=ve.call(arguments,2);for(var r,x,s=0,a=t.length;s<a;s++){x=t[s];for(r in x){(!i||le.call(x,r))&&(e[r]=x[r]);}}}O.exports=_e;});var S=c(function(r0,A){"use strict";var be=E();function k(){}k.class_="Nevis";k.super_=Object;k.extend=be;A.exports=k;});var u=c(function(x0,y){"use strict";y.exports=S();});var B=c(function(s0,C){"use strict";var me=u(),ke=me.extend(function(i,e,t){this.qrious=i,this.element=e,this.element.qrious=i,this.enabled=Boolean(t);},{draw:function draw(i){},getElement:function getElement(){return this.enabled||(this.enabled=!0,this.render()),this.element;},getModuleSize:function getModuleSize(i){var e=this.qrious,t=e.padding||0,r=Math.floor((e.size-t*2)/i.width);return Math.max(1,r);},getOffset:function getOffset(i){var e=this.qrious,t=e.padding;if(t!=null)return t;var r=this.getModuleSize(i),x=Math.floor((e.size-r*i.width)/2);return Math.max(0,x);},render:function render(i){this.enabled&&(this.resize(),this.reset(),this.draw(i));},reset:function reset(){},resize:function resize(){}});C.exports=ke;});var L=c(function(a0,R){"use strict";var pe=B(),ge=pe.extend({draw:function draw(i){var e,t,r=this.qrious,x=this.getModuleSize(i),s=this.getOffset(i),a=this.element.getContext("2d");for(a.fillStyle=r.foreground,a.globalAlpha=r.foregroundAlpha,e=0;e<i.width;e++){for(t=0;t<i.width;t++){i.buffer[t*i.width+e]&&a.fillRect(x*e+s,x*t+s,x,x);}}},reset:function reset(){var i=this.qrious,e=this.element.getContext("2d"),t=i.size;e.lineWidth=1,e.clearRect(0,0,t,t),e.fillStyle=i.background,e.globalAlpha=i.backgroundAlpha,e.fillRect(0,0,t,t);},resize:function resize(){var i=this.element;i.width=i.height=this.qrious.size;}});R.exports=ge;});var j=c(function(n0,T){"use strict";var we=u(),Be=we.extend(null,{BLOCK:[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28]});T.exports=Be;});var I=c(function(f0,z){"use strict";var Me=u(),qe=Me.extend(null,{BLOCKS:[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],FINAL_FORMAT:[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,6608,1890,597,3340,2107],LEVELS:{L:1,M:2,Q:3,H:4}});z.exports=qe;});var V=c(function(c0,P){"use strict";var Oe=u(),Ne=Oe.extend(null,{EXPONENT:[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],LOG:[255,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175]});P.exports=Ne;});var G=c(function(o0,U){"use strict";var Ee=u(),Ae=Ee.extend(null,{BLOCK:[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177]});U.exports=Ae;});var K=c(function(u0,F){"use strict";var Se=u(),ye=j(),_=I(),v=V(),Ce=G(),o=Se.extend(function(i){var e,t,r,x,s,a=i.value.length;for(this._badness=[],this._level=_.LEVELS[i.level],this._polynomial=[],this._value=i.value,this._version=0,this._stringBuffer=[];this._version<40&&(this._version++,r=(this._level-1)*4+(this._version-1)*16,x=_.BLOCKS[r++],s=_.BLOCKS[r++],e=_.BLOCKS[r++],t=_.BLOCKS[r],r=e*(x+s)+s-3+(this._version<=9),!(a<=r));){;}this._dataBlock=e,this._eccBlock=t,this._neccBlock1=x,this._neccBlock2=s;var n=this.width=17+4*this._version;this.buffer=o._createArray(n*n),this._ecc=o._createArray(e+(e+t)*(x+s)+s),this._mask=o._createArray((n*(n+1)+1)/2),this._insertFinders(),this._insertAlignments(),this.buffer[8+n*(n-8)]=1,this._insertTimingGap(),this._reverseMask(),this._insertTimingRowAndColumn(),this._insertVersion(),this._syncMask(),this._convertBitStream(a),this._calculatePolynomial(),this._appendEccToData(),this._interleaveBlocks(),this._pack(),this._finish();},{_addAlignment:function _addAlignment(i,e){var t,r=this.buffer,x=this.width;for(r[i+x*e]=1,t=-2;t<2;t++){r[i+t+x*(e-2)]=1,r[i-2+x*(e+t+1)]=1,r[i+2+x*(e+t)]=1,r[i+t+1+x*(e+2)]=1;}for(t=0;t<2;t++){this._setMask(i-1,e+t),this._setMask(i+1,e-t),this._setMask(i-t,e-1),this._setMask(i+t,e+1);}},_appendData:function _appendData(i,e,t,r){var x,s,a,n=this._polynomial,f=this._stringBuffer;for(s=0;s<r;s++){f[t+s]=0;}for(s=0;s<e;s++){if(x=v.LOG[f[i+s]^f[t]],x!==255)for(a=1;a<r;a++){f[t+a-1]=f[t+a]^v.EXPONENT[o._modN(x+n[r-a])];}else for(a=t;a<t+r;a++){f[a]=f[a+1];}f[t+r-1]=x===255?0:v.EXPONENT[o._modN(x+n[0])];}},_appendEccToData:function _appendEccToData(){var i,e=0,t=this._dataBlock,r=this._calculateMaxLength(),x=this._eccBlock;for(i=0;i<this._neccBlock1;i++){this._appendData(e,t,r,x),e+=t,r+=x;}for(i=0;i<this._neccBlock2;i++){this._appendData(e,t+1,r,x),e+=t+1,r+=x;}},_applyMask:function _applyMask(i){var e,t,r,x,s=this.buffer,a=this.width;switch(i){case 0:for(x=0;x<a;x++){for(r=0;r<a;r++){!(r+x&1)&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 1:for(x=0;x<a;x++){for(r=0;r<a;r++){!(x&1)&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 2:for(x=0;x<a;x++){for(e=0,r=0;r<a;r++,e++){e===3&&(e=0),!e&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 3:for(t=0,x=0;x<a;x++,t++){for(t===3&&(t=0),e=t,r=0;r<a;r++,e++){e===3&&(e=0),!e&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 4:for(x=0;x<a;x++){for(e=0,t=x>>1&1,r=0;r<a;r++,e++){e===3&&(e=0,t=!t),!t&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 5:for(t=0,x=0;x<a;x++,t++){for(t===3&&(t=0),e=0,r=0;r<a;r++,e++){e===3&&(e=0),!((r&x&1)+!(!e|!t))&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 6:for(t=0,x=0;x<a;x++,t++){for(t===3&&(t=0),e=0,r=0;r<a;r++,e++){e===3&&(e=0),!((r&x&1)+(e&&e===t)&1)&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;case 7:for(t=0,x=0;x<a;x++,t++){for(t===3&&(t=0),e=0,r=0;r<a;r++,e++){e===3&&(e=0),!((e&&e===t)+(r+x&1)&1)&&!this._isMasked(r,x)&&(s[r+x*a]^=1);}}break;}},_calculateMaxLength:function _calculateMaxLength(){return this._dataBlock*(this._neccBlock1+this._neccBlock2)+this._neccBlock2;},_calculatePolynomial:function _calculatePolynomial(){var i,e,t=this._eccBlock,r=this._polynomial;for(r[0]=1,i=0;i<t;i++){for(r[i+1]=1,e=i;e>0;e--){r[e]=r[e]?r[e-1]^v.EXPONENT[o._modN(v.LOG[r[e]]+i)]:r[e-1];}r[0]=v.EXPONENT[o._modN(v.LOG[r[0]]+i)];}for(i=0;i<=t;i++){r[i]=v.LOG[r[i]];}},_checkBadness:function _checkBadness(){var i,e,t,r,x,s=0,a=this._badness,n=this.buffer,f=this.width;for(x=0;x<f-1;x++){for(r=0;r<f-1;r++){(n[r+f*x]&&n[r+1+f*x]&&n[r+f*(x+1)]&&n[r+1+f*(x+1)]||!(n[r+f*x]||n[r+1+f*x]||n[r+f*(x+1)]||n[r+1+f*(x+1)]))&&(s+=o.N2);}}var h=0;for(x=0;x<f;x++){for(t=0,a[0]=0,i=0,r=0;r<f;r++){e=n[r+f*x],i===e?a[t]++:a[++t]=1,i=e,h+=i?1:-1;}s+=this._getBadness(t);}h<0&&(h=-h);var q=0,b=h;for(b+=b<<2,b<<=1;b>f*f;){b-=f*f,q++;}for(s+=q*o.N4,r=0;r<f;r++){for(t=0,a[0]=0,i=0,x=0;x<f;x++){e=n[r+f*x],i===e?a[t]++:a[++t]=1,i=e;}s+=this._getBadness(t);}return s;},_convertBitStream:function _convertBitStream(i){var e,t,r=this._ecc,x=this._version;for(t=0;t<i;t++){r[t]=this._value.charCodeAt(t);}var s=this._stringBuffer=r.slice(),a=this._calculateMaxLength();i>=a-2&&(i=a-2,x>9&&i--);var n=i;if(x>9){for(s[n+2]=0,s[n+3]=0;n--;){e=s[n],s[n+3]|=255&e<<4,s[n+2]=e>>4;}s[2]|=255&i<<4,s[1]=i>>4,s[0]=64|i>>12;}else{for(s[n+1]=0,s[n+2]=0;n--;){e=s[n],s[n+2]|=255&e<<4,s[n+1]=e>>4;}s[1]|=255&i<<4,s[0]=64|i>>4;}for(n=i+3-(x<10);n<a;){s[n++]=236,s[n++]=17;}},_getBadness:function _getBadness(i){var e,t=0,r=this._badness;for(e=0;e<=i;e++){r[e]>=5&&(t+=o.N1+r[e]-5);}for(e=3;e<i-1;e+=2){r[e-2]===r[e+2]&&r[e+2]===r[e-1]&&r[e-1]===r[e+1]&&r[e-1]*3===r[e]&&(r[e-3]===0||e+3>i||r[e-3]*3>=r[e]*4||r[e+3]*3>=r[e]*4)&&(t+=o.N3);}return t;},_finish:function _finish(){this._stringBuffer=this.buffer.slice();var i,e,t=0,r=3e4;for(e=0;e<8&&(this._applyMask(e),i=this._checkBadness(),i<r&&(r=i,t=e),t!==7);e++){this.buffer=this._stringBuffer.slice();}t!==e&&this._applyMask(t),r=_.FINAL_FORMAT[t+(this._level-1<<3)];var x=this.buffer,s=this.width;for(e=0;e<8;e++,r>>=1){r&1&&(x[s-1-e+s*8]=1,e<6?x[8+s*e]=1:x[8+s*(e+1)]=1);}for(e=0;e<7;e++,r>>=1){r&1&&(x[8+s*(s-7+e)]=1,e?x[6-e+s*8]=1:x[7+s*8]=1);}},_interleaveBlocks:function _interleaveBlocks(){var i,e,t=this._dataBlock,r=this._ecc,x=this._eccBlock,s=0,a=this._calculateMaxLength(),n=this._neccBlock1,f=this._neccBlock2,h=this._stringBuffer;for(i=0;i<t;i++){for(e=0;e<n;e++){r[s++]=h[i+e*t];}for(e=0;e<f;e++){r[s++]=h[n*t+i+e*(t+1)];}}for(e=0;e<f;e++){r[s++]=h[n*t+i+e*(t+1)];}for(i=0;i<x;i++){for(e=0;e<n+f;e++){r[s++]=h[a+i+e*x];}}this._stringBuffer=r;},_insertAlignments:function _insertAlignments(){var i,e,t,r=this._version,x=this.width;if(r>1)for(i=ye.BLOCK[r],t=x-7;;){for(e=x-7;e>i-3&&(this._addAlignment(e,t),!(e<i));){e-=i;}if(t<=i+9)break;t-=i,this._addAlignment(6,t),this._addAlignment(t,6);}},_insertFinders:function _insertFinders(){var i,e,t,r,x=this.buffer,s=this.width;for(i=0;i<3;i++){for(e=0,r=0,i===1&&(e=s-7),i===2&&(r=s-7),x[r+3+s*(e+3)]=1,t=0;t<6;t++){x[r+t+s*e]=1,x[r+s*(e+t+1)]=1,x[r+6+s*(e+t)]=1,x[r+t+1+s*(e+6)]=1;}for(t=1;t<5;t++){this._setMask(r+t,e+1),this._setMask(r+1,e+t+1),this._setMask(r+5,e+t),this._setMask(r+t+1,e+5);}for(t=2;t<4;t++){x[r+t+s*(e+2)]=1,x[r+2+s*(e+t+1)]=1,x[r+4+s*(e+t)]=1,x[r+t+1+s*(e+4)]=1;}}},_insertTimingGap:function _insertTimingGap(){var i,e,t=this.width;for(e=0;e<7;e++){this._setMask(7,e),this._setMask(t-8,e),this._setMask(7,e+t-7);}for(i=0;i<8;i++){this._setMask(i,7),this._setMask(i+t-8,7),this._setMask(i,t-8);}},_insertTimingRowAndColumn:function _insertTimingRowAndColumn(){var i,e=this.buffer,t=this.width;for(i=0;i<t-14;i++){i&1?(this._setMask(8+i,6),this._setMask(6,8+i)):(e[8+i+t*6]=1,e[6+t*(8+i)]=1);}},_insertVersion:function _insertVersion(){var i,e,t,r,x=this.buffer,s=this._version,a=this.width;if(s>6)for(i=Ce.BLOCK[s-7],e=17,t=0;t<6;t++){for(r=0;r<3;r++,e--){1&(e>11?s>>e-12:i>>e)?(x[5-t+a*(2-r+a-11)]=1,x[2-r+a-11+a*(5-t)]=1):(this._setMask(5-t,2-r+a-11),this._setMask(2-r+a-11,5-t));}}},_isMasked:function _isMasked(i,e){var t=o._getMaskBit(i,e);return this._mask[t]===1;},_pack:function _pack(){var i,e,t,r=1,x=1,s=this.width,a=s-1,n=s-1,f=(this._dataBlock+this._eccBlock)*(this._neccBlock1+this._neccBlock2)+this._neccBlock2;for(e=0;e<f;e++){for(i=this._stringBuffer[e],t=0;t<8;t++,i<<=1){128&i&&(this.buffer[a+s*n]=1);do{x?a--:(a++,r?n!==0?n--:(a-=2,r=!r,a===6&&(a--,n=9)):n!==s-1?n++:(a-=2,r=!r,a===6&&(a--,n-=8))),x=!x;}while(this._isMasked(a,n));}}},_reverseMask:function _reverseMask(){var i,e,t=this.width;for(i=0;i<9;i++){this._setMask(i,8);}for(i=0;i<8;i++){this._setMask(i+t-8,8),this._setMask(8,i);}for(e=0;e<7;e++){this._setMask(8,e+t-7);}},_setMask:function _setMask(i,e){var t=o._getMaskBit(i,e);this._mask[t]=1;},_syncMask:function _syncMask(){var i,e,t=this.width;for(e=0;e<t;e++){for(i=0;i<=e;i++){this.buffer[i+t*e]&&this._setMask(i,e);}}}},{_createArray:function _createArray(i){var e,t=[];for(e=0;e<i;e++){t[e]=0;}return t;},_getMaskBit:function _getMaskBit(i,e){var t;return i>e&&(t=i,i=e,e=t),t=e,t+=e*e,t>>=1,t+=i,t;},_modN:function _modN(i){for(;i>=255;){i-=255,i=(i>>8)+(i&255);}return i;},N1:3,N2:3,N3:40,N4:10});F.exports=o;});var X=c(function(h0,D){"use strict";var Re=B(),Le=Re.extend({draw:function draw(){this.element.src=this.qrious.toDataURL();},reset:function reset(){this.element.src="";},resize:function resize(){var i=this.element;i.width=i.height=this.qrious.size;}});D.exports=Le;});var H=c(function(l0,Q){"use strict";var Te=u(),je=Te.extend(function(i,e,t,r){this.name=i,this.modifiable=Boolean(e),this.defaultValue=t,this._valueTransformer=r;},{transform:function transform(i){var e=this._valueTransformer;return typeof e=="function"?e(i,this):i;}});Q.exports=je;});var M=c(function(v0,W){"use strict";var ze=u(),Ie=ze.extend(null,{abs:function abs(i){return i!=null?Math.abs(i):null;},hasOwn:function hasOwn(i,e){return Object.prototype.hasOwnProperty.call(i,e);},noop:function noop(){},toUpperCase:function toUpperCase(i){return i!=null?i.toUpperCase():null;}});W.exports=Ie;});var Y=c(function(d0,J){"use strict";var Pe=u(),p=M(),d=Pe.extend(function(i){this.options={},i.forEach(function(e){this.options[e.name]=e;},this);},{exists:function exists(i){return this.options[i]!=null;},get:function get(i,e){return d._get(this.options[i],e);},getAll:function getAll(i){var e,t=this.options,r={};for(e in t){p.hasOwn(t,e)&&(r[e]=d._get(t[e],i));}return r;},init:function init(i,e,t){typeof t!="function"&&(t=p.noop);var r,x;for(r in this.options){p.hasOwn(this.options,r)&&(x=this.options[r],d._set(x,x.defaultValue,e),d._createAccessor(x,e,t));}this._setAll(i,e,!0);},set:function set(i,e,t){return this._set(i,e,t);},setAll:function setAll(i,e){return this._setAll(i,e);},_set:function _set(i,e,t,r){var x=this.options[i];if(!x)throw new Error("Invalid option: "+i);if(!x.modifiable&&!r)throw new Error("Option cannot be modified: "+i);return d._set(x,e,t);},_setAll:function _setAll(i,e,t){if(!i)return!1;var r,x=!1;for(r in i){p.hasOwn(i,r)&&this._set(r,i[r],e,t)&&(x=!0);}return x;}},{_createAccessor:function _createAccessor(i,e,t){var r={get:function get(){return d._get(i,e);}};i.modifiable&&(r.set=function(x){d._set(i,x,e)&&t(x,i);}),Object.defineProperty(e,i.name,r);},_get:function _get(i,e){return e["_"+i.name];},_set:function _set(i,e,t){var r="_"+i.name,x=t[r],s=i.transform(e!=null?e:i.defaultValue);return t[r]=s,s!==x;}});J.exports=d;});var $=c(function(_0,Z){"use strict";var Ve=u(),Ue=Ve.extend(function(){this._services={};},{getService:function getService(i){var e=this._services[i];if(!e)throw new Error("Service is not being managed with name: "+i);return e;},setService:function setService(i,e){if(this._services[i])throw new Error("Service is already managed with name: "+i);e&&(this._services[i]=e);}});Z.exports=Ue;});var re=c(function(b0,ee){"use strict";var Ge=u(),Fe=L(),Ke=K(),De=X(),l=H(),Xe=Y(),Qe=$(),m=M(),g=new Xe([new l("background",!0,"white"),new l("backgroundAlpha",!0,1,m.abs),new l("element"),new l("foreground",!0,"black"),new l("foregroundAlpha",!0,1,m.abs),new l("level",!0,"L",m.toUpperCase),new l("mime",!0,"image/png"),new l("padding",!0,null,m.abs),new l("size",!0,100,m.abs),new l("value",!0,"")]),ie=new Qe(),te=Ge.extend(function(i){g.init(i,this,this.update.bind(this));var e=g.get("element",this),t=ie.getService("element"),r=e&&t.isCanvas(e)?e:t.createCanvas(),x=e&&t.isImage(e)?e:t.createImage();this._canvasRenderer=new Fe(this,r,!0),this._imageRenderer=new De(this,x,x===e),this.update();},{get:function get(){return g.getAll(this);},set:function set(i){g.setAll(i,this)&&this.update();},toDataURL:function toDataURL(i){return this.canvas.toDataURL(i||this.mime);},update:function update(){var i=new Ke({level:this.level,value:this.value});this._canvasRenderer.render(i),this._imageRenderer.render(i);}},{use:function use(i){ie.setService(i.getName(),i);}});Object.defineProperties(te.prototype,{canvas:{get:function get(){return this._canvasRenderer.getElement();}},image:{get:function get(){return this._imageRenderer.getElement();}}});ee.exports=te;});var se=c(function(m0,xe){"use strict";xe.exports=re();});var ne=c(function(k0,ae){"use strict";var He=u(),We=He.extend({getName:function getName(){}});ae.exports=We;});var ce=c(function(p0,fe){"use strict";var Je=ne(),Ye=Je.extend({createCanvas:function createCanvas(){},createImage:function createImage(){},getName:function getName(){return"element";},isCanvas:function isCanvas(i){},isImage:function isImage(i){}});fe.exports=Ye;});var ue=c(function(g0,oe){"use strict";var Ze=ce(),$e=Ze.extend({createCanvas:function createCanvas(){return document.createElement("canvas");},createImage:function createImage(){return document.createElement("img");},isCanvas:function isCanvas(i){return i instanceof HTMLCanvasElement;},isImage:function isImage(i){return i instanceof HTMLImageElement;}});oe.exports=$e;});"use strict";var he=se(),e0=ue();he.use(new e0());
// CONCATENATED MODULE: ./src/components/utils/sha256/sha256.ts



function sha256(_x) {
  return _sha.apply(this, arguments);
}

function _sha() {
  _sha = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(message) {
    var msgBuffer, hashBuffer, hashArray, hashHex;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            msgBuffer = new TextEncoder().encode(message);
            _context.next = 3;
            return crypto.subtle.digest("SHA-256", msgBuffer);

          case 3:
            hashBuffer = _context.sent;
            hashArray = Array.from(new Uint8Array(hashBuffer)); // convert bytes to hex string

            hashHex = hashArray.map(function (b) {
              return ("00" + b.toString(16)).slice(-2);
            }).join("");
            return _context.abrupt("return", hashHex);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sha.apply(this, arguments);
}
// EXTERNAL MODULE: /home/zed/z/node_modules/normalize.css/normalize.css
var normalize = __webpack_require__("16WD");

// CONCATENATED MODULE: ./src/components/code/Qr.tsx






function _templateObject3() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n        \n            width: ", "px; \n            height: ", "px; \n            padding: 0px; \n            margin: 10px;      \n          \n              \n          @keyframes spincube {\n            from,to {\n              transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);\n            }\n            16% {\n              transform: rotateY(-90deg);\n            }\n            33% {\n              transform: rotateY(-90deg) rotateZ(90deg);\n            }\n            50% {\n              transform: rotateY(-180deg) rotateZ(90deg);\n            }\n            66% {\n              transform: rotateY(-270deg) rotateX(90deg);\n            }\n            83% {\n              transform: rotateX(90deg);\n            }\n          }\n\n            .cubespinner {\n\n              animation-name: spincube;\n              animation-timing-function: cubic-bezier(.57,-0.6,0,1.03);\n              animation-iteration-count: infinite;\n              animation-duration: 20s;\n\n              transform-style: preserve-3d;\n\n              transform-origin: ", "px ", "px 0;\n            }\n\n            .cubespinner div {\n              position: absolute;\n              width: ", "px;\n              height: ", "px;\n              border: 0;\n              background: rgba(255,255,255,0.8);\n              box-shadow: inset 0 0 20px rgba(255,0,0,0.6);\n              line-height: 80px;\n              vertical-align: middle;\n              text-align: center;\n              font-size: 80px;\n            }\n\n            .cubespinner .face1 {\n              transform: translateZ(", "px);\n            }\n            .cubespinner .face2 {\n              transform: rotateY(90deg) translateZ(", "px);\n            }\n            .cubespinner .face3 {\n              transform: rotateY(90deg) rotateX(90deg) translateZ(", "px);\n            }\n            .cubespinner .face4 {\n              transform: rotateY(180deg) rotateZ(90deg) translateZ(", "px);\n            }\n            .cubespinner .face5 {\n              transform: rotateY(-90deg) rotateZ(90deg) translateZ(", "px);\n            }\n            .cubespinner .face6 {\n              transform: rotateX(-90deg) translateZ(", "px);\n            }\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])([" \n      color: #333;\n      border-radius: 18px;\n      padding: 0px;\n      background: rgba( 0, 0, 25, 0.4 );\n      border: solid 1px rgba(24,24,24,0.7);\n      background-clip: padding-box;\n      backdrop-filter: blur(10px ); display: inline-block; "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["\n      margin: 24px;\n      text-align: center;\n      box-sizing: inherit; }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


/** @jsx jsx */






var Qr_Qr = function Qr(_ref) {
  var color = _ref.color;
  var side1 = react_default.a.useRef(null);
  var side2 = react_default.a.useRef(null);
  var side3 = react_default.a.useRef(null);
  var side4 = react_default.a.useRef(null);
  var side5 = react_default.a.useRef(null);
  var side6 = react_default.a.useRef(null);

  var _React$useState = react_default.a.useState(100),
      retry = _React$useState[0],
      setRetry = _React$useState[1];

  var _React$useState2 = react_default.a.useState(""),
      lastUrl = _React$useState2[0],
      setUrl = _React$useState2[1];

  react_default.a.useEffect(function () {
    var connect = /*#__PURE__*/function () {
      var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var qr1, qr2, qr3, qr4, qr5, qr6, secret, key, url, options;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                qr1 = null;
                qr2 = null;
                qr3 = null;
                qr4 = null;
                qr5 = null;
                qr6 = null; // const req = await fetch("https://zed.vision/token");
                // const data = await req.json();
                // const key = data.key;

                secret = Math.random() + "-" + Math.random() + "-" + Math.random();
                _context.next = 9;
                return sha256(secret);

              case 9:
                key = _context.sent.slice(0, 8);
                // const key = "12345678";
                lastUrl && waitForSignalAndRun({
                  signal: lastUrl,
                  onSignal: function onSignal() {
                    console.log("signal Received", {
                      lastUrl: lastUrl
                    });
                    window.location.href = lastUrl;
                  },
                  onError: function onError() {
                    console.log("Error while waiting for the signal", {
                      lastUrl: lastUrl
                    });
                  },
                  onExpired: function onExpired() {
                    console.log("expired", {
                      lastUrl: lastUrl
                    });
                  }
                });
                url = "https://zed.vision/" + key;
                options = {
                  element: side1.current,
                  size: 220,
                  foregroundAlpha: 0.9,
                  foreground: "red",
                  padding: 10,
                  background: "black",
                  value: url
                };

                if (qr1 === null) {
                  qr1 = new he(options);
                  qr2 = new he(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#FFA52C",
                    element: side2.current
                  }));
                  qr3 = new he(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "yellow",
                    element: side3.current
                  }));
                  qr4 = new he(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#35CB4A",
                    element: side4.current
                  }));
                  qr5 = new he(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#3C99DC",
                    element: side5.current
                  }));
                  qr6 = new he(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#DF3BCF",
                    element: side6.current
                  }));
                }

                if (qr1.get().value !== url) {
                  qr1.set(options);
                  qr2.set(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#FFA52C",
                    element: side2.current
                  }));
                  qr3.set(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "yellow",
                    element: side3.current
                  }));
                  qr4.set(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#35CB4A",
                    element: side4.current
                  }));
                  qr5.set(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#3C99DC",
                    element: side5.current
                  }));
                  qr6.set(_objectSpread(_objectSpread({}, options), {}, {
                    foreground: "#DF3BCF",
                    element: side6.current
                  }));
                }

                setTimeout(function () {
                  return setRetry(function (x) {
                    return x - 1;
                  });
                }, 20000);
                setUrl(url); // const toCheck = await hash(url, true);

                waitForSignalAndRun({
                  signal: url,
                  onSignal: function onSignal() {
                    console.log("signal received", {
                      url: url
                    });
                    window.location.href = url;
                  },
                  onError: function onError() {
                    console.log("Error while waiting for the signal", {
                      url: url
                    });
                  },
                  onExpired: function onExpired() {
                    console.log("expired", {
                      url: url
                    });
                  }
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function connect() {
        return _ref2.apply(this, arguments);
      };
    }();

    if (typeof window !== "undefined" && retry > 0) connect();
  }, [retry]);
  return Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    onClick: function onClick() {
      return window.open(lastUrl);
    },
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject())
  }, Object(emotion_react_browser_esm["c" /* jsx */])(Qr_Cube, {
    size: 220,
    sides: [Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
      ref: side1
    }), Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
      ref: side2
    }), Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
      ref: side3
    }), Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
      ref: side4
    }), Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
      ref: side5
    }), Object(emotion_react_browser_esm["c" /* jsx */])("canvas", {
      ref: side6
    })]
  }));
}; //@ts-ignore

var Qr_Cube = function Cube(_ref3) {
  var sides = _ref3.sides,
      size = _ref3.size;
  return Object(emotion_react_browser_esm["c" /* jsx */])("section", {
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject2())
  }, Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "stage",
    css: Object(emotion_react_browser_esm["b" /* css */])(_templateObject3(), size, size, size / 2, size / 2, size, size, size / 2, size / 2, size / 2, size / 2, size / 2, size / 2)
  }, Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "cubespinner"
  }, Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "face1"
  }, sides[0]), Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "face2"
  }, sides[1]), Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "face3"
  }, sides[2]), Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "face4"
  }, sides[3]), Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "face5"
  }, sides[4]), Object(emotion_react_browser_esm["c" /* jsx */])("div", {
    className: "face6"
  }, sides[5]))), Object(emotion_react_browser_esm["c" /* jsx */])("h3", {
    css: "font-size: 24px; color:white; font-family: Roboto; padding: 10px 0 0 0"
  }, "Scan to connect!"));
};
// EXTERNAL MODULE: ./assets/forkMe.png
var forkMe = __webpack_require__("7jdZ");
var forkMe_default = /*#__PURE__*/__webpack_require__.n(forkMe);

// CONCATENATED MODULE: ./src/pages/index.tsx





function pages_templateObject() {
  var data = Object(taggedTemplateLiteralLoose["a" /* default */])(["  \n                      margin-bottom: ", ";\n                      "]);

  pages_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/** @jsx jsx */











var isMobile = function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};

var pages_BlogIndex = function BlogIndex(_ref) {
  var data = _ref.data;
  var edges = data.allMdx.edges;
  react["useEffect"](function () {
    if (typeof window !== "undefined") {
      var install = /*#__PURE__*/function () {
        var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
          return regenerator_default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = console;
                  _context.next = 3;
                  return getUserId();

                case 3:
                  _context.t1 = _context.sent;

                  _context.t0.log.call(_context.t0, _context.t1);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function install() {
          return _ref2.apply(this, arguments);
        };
      }();

      install(); // registerSW();
    }
  }, []);
  return Object(emotion_react_browser_esm["c" /* jsx */])(layout["a" /* Layout */], null, Object(emotion_react_browser_esm["c" /* jsx */])(seo["a" /* SEO */], {
    title: "This is Zed."
  }), isMobile() === false ? Object(emotion_react_browser_esm["c" /* jsx */])("h1", null, "Link your mobile with this code: ", Object(emotion_react_browser_esm["c" /* jsx */])(Qr_Qr, null)) : Object(emotion_react_browser_esm["c" /* jsx */])("h1", null, "This is my blog."), Object(emotion_react_browser_esm["c" /* jsx */])("a", {
    href: "https://github.com/zed-vision/monorepo"
  }, Object(emotion_react_browser_esm["c" /* jsx */])("img", {
    loading: "lazy",
    width: "149",
    height: "149",
    src: forkMe_default.a,
    style: {
      position: "absolute",
      top: 0,
      right: 0
    },
    alt: "Fork me on GitHub"
  })), edges.map(function (_ref3) {
    var node = _ref3.node;
    var title = node.frontmatter.title || node.fields.slug;
    return Object(emotion_react_browser_esm["c" /* jsx */])("article", {
      key: node.fields.slug
    }, Object(emotion_react_browser_esm["c" /* jsx */])("header", null, Object(emotion_react_browser_esm["c" /* jsx */])("h3", {
      css: Object(emotion_react_browser_esm["b" /* css */])(pages_templateObject(), Object(typography["a" /* rhythm */])(1 / 4))
    }, Object(emotion_react_browser_esm["c" /* jsx */])(gatsby_browser_entry["Link"], {
      to: node.fields.slug
    }, title)), Object(emotion_react_browser_esm["c" /* jsx */])("small", null, node.frontmatter.date)), Object(emotion_react_browser_esm["c" /* jsx */])("section", null, Object(emotion_react_browser_esm["c" /* jsx */])("p", {
      dangerouslySetInnerHTML: {
        __html: node.frontmatter.description || node.excerpt
      }
    })));
  }), Object(emotion_react_browser_esm["c" /* jsx */])(bio["a" /* Bio */], null));
};

/* harmony default export */ var pages = __webpack_exports__["default"] = (pages_BlogIndex);
var pageQuery = "497448492";

/***/ })

}]);