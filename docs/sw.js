/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JJ5d");
/******/ })
/************************************************************************/
/******/ ({

/***/ "JJ5d":
/***/ (function(module, exports) {

// deno-lint-ignore-file
// @ts-ignore
importScripts("https://unpkg.com/workbox-sw@6.0.2/build/workbox-sw.js");// @ts-ignore
workbox.loadModule("workbox-strategies");// @ts-ignore
workbox.routing.registerRoute(/**
   * 
   * @param {{url: {origin: string}}} opts 
   */function(_ref){var url=_ref.url;return url.origin==="https://unpkg.com"||url.origin==="https://zed.vision"||url.origin==="https://code.zed.vision"||url.origin==="https://blog.zed.vision";},// @ts-ignore
new workbox.strategies.CacheFirst());// @ts-ignore
self.addEventListener("fetch",/**
 * @param {{ respondWith?: any; request?: any; }} event
 */function(event){var request=event.request;var url=request.url;if(!url.endsWith("sw.js")&&(url.endsWith(".js")||url.endsWith(".json")||url.endsWith(".map")||url.endsWith(".html")||url.endsWith(".woff")||url.endsWith(".jpg")||url.endsWith(".css")||url.endsWith(".png")||url.endsWith(".ts"))){console.log("workbox cache!",{url:url});// Using the previously-initialized strategies will work as expected.
// @ts-ignore
var cacheFirst=new workbox.strategies.CacheFirst();event.respondWith(cacheFirst.handle({event:event,request:request}));}if(url.indexOf("/ipfs/")!==-1){var _request=fetch(url.replace("blog.","").replace("code.",""));// @ts-ignore
var _cacheFirst=new workbox.strategies.CacheFirst();event.respondWith(_cacheFirst.handle({event:event,request:_request}));}});

/***/ })

/******/ });