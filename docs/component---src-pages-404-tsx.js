(this["webpackJsonp"] = this["webpackJsonp"] || []).push([[7],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_layout_tsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _components_seo_tsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _components_code_hash_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(45);








/* harmony default export */ __webpack_exports__["default"] = (function () {
  var pathname = "";

  if (typeof window !== "undefined") {
    pathname = new URL(location.href).pathname.substr(1);
  }

  var isKey = function isKey(str) {
    return Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(str.slice(1, 9)).filter(function (x) {
      return x < "0" || x > "f";
    }).length === 0;
  };

  var needToCheck = pathname.length === 8 && isKey(pathname);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(false),
      is404 = _React$useState[0],
      set404 = _React$useState[1];

  react__WEBPACK_IMPORTED_MODULE_4___default.a.useEffect(function () {
    console.log("We use effect");

    var runner = /*#__PURE__*/function () {
      var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var cid;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("we use run");
                _context.prev = 1;
                console.log("we use try"); // console.log(pathname);
                // const key = pathname;
                // const uuid = await getUserId();
                // console.log(uuid);
                // const uuidHash = (await sha256(uuid)).substring(0, 8);
                // console.log(uuidHash);
                // const checkKeyUuid = (await sha256(key + uuid)).substring(0, 8);
                // const checkHashUuidHash = (await sha256(key + uuidHash)).substring(
                //   0,
                //   8,
                // );
                // console.log({
                //   key,
                //   uuidHash,
                //   checkKeyUuid,
                //   checkHashUuidHash,
                // });
                // const response = await fetch(
                //   `https://zed.vision/connect?key=${key}${uuidHash}${checkKeyUuid}${checkHashUuidHash}`,
                // );
                // const data: { success: boolean } = await response.json();

                console.log("ipvs story");
                _context.next = 6;
                return Object(_components_code_hash_js__WEBPACK_IMPORTED_MODULE_7__[/* hash */ "b"])(location.href, false);

              case 6:
                cid = _context.sent;
                console.log({
                  cid: cid
                });

                if (cid) {
                  location.href = "https://zed.vision/ipfs/" + cid[0];
                } else {
                  set404(true);
                }

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                console.log("we catching");
                set404(true);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11]]);
      }));

      return function runner() {
        return _ref.apply(this, arguments);
      };
    }();

    if (typeof window !== "undefined") {
      if (needToCheck) runner();else set404("No need to do a hash check");
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, is404 === true && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_layout_tsx__WEBPACK_IMPORTED_MODULE_5__[/* Layout */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_seo_tsx__WEBPACK_IMPORTED_MODULE_6__[/* SEO */ "a"], {
    title: "404: Not Found"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1", null, "This page is not a page: ", pathname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", null, "Let's say, its a 404 page. ", is404, ".")), is404 === false && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", null));
});

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getHash; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
var ipfsClient=null;var half=function half(data){var halfLength=(data.length-data.length%2)/2;if(data.slice(0,halfLength)===data.slice(halfLength-1,2*halfLength-1)){return data.slice(0,halfLength);}// console.log({
//   slice1: data.slice(0, halfLength) ,
//   slice2: data.slice(halfLength-1, 2 * halfLength-1)
// })
return data;};function getClient(){return _getClient.apply(this,arguments);}function _getClient(){_getClient=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(){return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(!ipfsClient){_context3.next=2;break;}return _context3.abrupt("return",ipfsClient);case 2:_context3.next=4;return new Function("return import(\"https://unpkg.com/@zedvision/code@11.1.5/src/ipfsKV.js\")")();case 4:_context3.next=6;return _context3.sent.getIpfsClient();case 6:ipfsClient=_context3.sent;return _context3.abrupt("return",ipfsClient);case 8:case"end":return _context3.stop();}}},_callee3);}));return _getClient.apply(this,arguments);}var hash=/*#__PURE__*/function(){var _ref=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(data,onlyHash){var client;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return getClient();case 2:client=_context.sent;_context.t0=Promise;_context.next=6;return client.add(data,{onlyHash:onlyHash});case 6:_context.t1=_context.sent;_context.next=9;return client.add(data+"N"+data,{onlyHash:onlyHash});case 9:_context.t2=_context.sent;_context.next=12;return client.add(data+"O"+data,{onlyHash:onlyHash});case 12:_context.t3=_context.sent;_context.next=15;return client.add(data+"I"+data,{onlyHash:onlyHash});case 15:_context.t4=_context.sent;_context.next=18;return client.add(data+"S"+data,{onlyHash:onlyHash});case 18:_context.t5=_context.sent;_context.next=21;return client.add(data+"E"+data,{onlyHash:onlyHash});case 21:_context.t6=_context.sent;_context.next=24;return client.add(data+"!"+data,{onlyHash:onlyHash});case 24:_context.t7=_context.sent;_context.t8=[_context.t1,_context.t2,_context.t3,_context.t4,_context.t5,_context.t6,_context.t7];_context.next=28;return _context.t0.all.call(_context.t0,_context.t8);case 28:return _context.abrupt("return",_context.sent);case 29:case"end":return _context.stop();}}},_callee);}));return function hash(_x,_x2){return _ref.apply(this,arguments);};}();var getHash=/*#__PURE__*/function(){var _ref2=Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(cid,timeout){var client,data;return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.next=2;return getClient();case 2:client=_context2.sent;_context2.next=5;return client.get(cid,timeout);case 5:data=_context2.sent;return _context2.abrupt("return",half(data));case 7:case"end":return _context2.stop();}}},_callee2);}));return function getHash(_x3,_x4){return _ref2.apply(this,arguments);};}();

/***/ })

}]);