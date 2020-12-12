/*! jsframe v8.4.0 Copyright (c) 2007-2020 Tom Misawa */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@riversun/event-emitter/lib/event-emitter.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@riversun/event-emitter/lib/event-emitter.js ***!
  \***********************************************************************/
/***/ (function(module) {

/*! event-emitter(https://github.com/riversun/event-emitter) v1.5.0 Copyright (c) 2020 riversun.org@gmail.com */
!function(e,t){ true?module.exports=t():0}(this,(function(){return(()=>{"use strict";var e={561:(e,t,n)=>{function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var s,u=e[Symbol.iterator]();!(r=(s=u.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(i)throw o}}return n}(e,t)||o(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,u=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return u=e.done,e},e:function(e){c=!0,s=e},f:function(){try{u||null==n.return||n.return()}finally{if(c)throw s}}}}function o(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function a(e,t,n){return t&&c(e.prototype,t),n&&c(e,n),e}n.d(t,{default:()=>l});var l=function(){function e(t){if(u(this,e),this.onListeners=new Map,this.onlyListeners=new Map,t){var n,r=i(t);try{for(r.s();!(n=r.n()).done;){var o=n.value,s=new f;this.onListeners.set(o,s)}}catch(e){r.e(e)}finally{r.f()}}this.childEventEmitters=[],this.onIntercepterFuncs={}}return a(e,[{key:"on",value:function(e,t){var n=this.onListeners.get(e);if(n||(n=new f,this.onListeners.set(e,n)),n.addListenerFunc(t),this.onIntercepterFuncs)for(var i=0,o=Object.entries(this.onIntercepterFuncs);i<o.length;i++){var s=r(o[i],2),u=s[0];(0,s[1])({eventType:e,func:t,onIntercepterFuncname:u})}}},{key:"removeListener",value:function(e,t){var n=this.onListeners.get(e);n&&n.removeListener(t)}},{key:"only",value:function(e,t,n){var r=this.onlyListeners.get(e);r||(r=new h,this.onlyListeners.set(e,r)),r.putListenerFunc(t,n)}},{key:"pipe",value:function(e){this.childEventEmitters.push(e)}},{key:"emit",value:function(e,t){var n=this.onListeners.get(e);n&&(t.eventType=e,n.callListenerFunc(t));var r=this.onlyListeners.get(e);r&&(t.eventType=e,r.callListenerFunc(t));var o,s=i(this.childEventEmitters);try{for(s.s();!(o=s.n()).done;){o.value.emit(e,t)}}catch(e){s.e(e)}finally{s.f()}}},{key:"getAllListeners",value:function(){var e={};this.onListeners.forEach((function(t,n){var r=n,i=t.getAllListeners();e[r]||(e[r]={}),e[r].listeners=i}));var t,n=0,r=i(this.childEventEmitters);try{for(r.s();!(t=r.n()).done;){t.value.onListeners.forEach((function(t,r){var i=r,o=t.getAllListeners();e[i]||(e[i]={}),e[i].childEventEmitters||(e[i].childEventEmitters=[]),e[i].childEventEmitters.push({childEmitterIdx:n,listeners:o})})),n++}}catch(e){r.e(e)}finally{r.f()}return e}},{key:"hasListenerFuncs",value:function(e){if(this.onListeners.has(e)){var t=this.onListeners.get(e);if(t&&t.hasListenerFunc())return!0}var n,r=i(this.childEventEmitters);try{for(r.s();!(n=r.n()).done;){if(n.value.hasListenerFuncs(e))return!0}}catch(e){r.e(e)}finally{r.f()}return!1}},{key:"clearAll",value:function(){var e,t=i(this.onListeners.values());try{for(t.s();!(e=t.n()).done;){e.value.clearAll()}}catch(e){t.e(e)}finally{t.f()}this.onListeners.clear();var n,r=i(this.onlyListeners.values());try{for(r.s();!(n=r.n()).done;){n.value.clearAll()}}catch(e){r.e(e)}finally{r.f()}this.onlyListeners.clear(),this.childEventEmitters=[]}},{key:"addOnIntercepterFunc",value:function(e,t){if(this.onIntercepterFuncs[e])throw Error('Always registered intercepter func "'.concat(e,'".'));this.onIntercepterFuncs[e]=t}},{key:"removeOnIntercepterFunc",value:function(e){delete this.onIntercepterFuncs[e]}},{key:"getAllOnIntercepterFuncs",value:function(){for(var e=[],t=0,n=Object.entries(this.onIntercepterFuncs);t<n.length;t++){var i=r(n[t],2),o=i[0],s=i[1];e.push({funcName:o,func:s})}return e}}]),e}(),f=function(){function e(){u(this,e),this.listenerFuncs=[]}return a(e,[{key:"clearAll",value:function(){this.listenerFuncs=[]}},{key:"getAllListeners",value:function(){return this.listenerFuncs}},{key:"hasListenerFunc",value:function(){return this.listenerFuncs.length>0}},{key:"addListenerFunc",value:function(e){this.listenerFuncs.push(e)}},{key:"callListenerFunc",value:function(e){var t,n=i(this.listenerFuncs);try{for(n.s();!(t=n.n()).done;){var r=t.value;if("Function"!==this.typeOf(r))throw Error('[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"'.concat(r,'".Check args of #only method or #on method.'));r(e)}}catch(e){n.e(e)}finally{n.f()}}},{key:"removeListener",value:function(e){this.removeArrayItemOnce(this.listenerFuncs,e)}},{key:"removeArrayItemOnce",value:function(e,t){var n=e.indexOf(t);return n>-1&&e.splice(n,1),e}},{key:"typeOf",value:function(e){return Object.prototype.toString.call(e).slice(8,-1)}}]),e}(),h=function(){function e(){u(this,e),this.listenerFuncMap=new Map}return a(e,[{key:"clearAll",value:function(){this.listenerFuncMap.clear()}},{key:"hasListenerFunc",value:function(e){return this.listenerFuncMap.has(e)}},{key:"putListenerFunc",value:function(e,t){this.listenerFuncMap.set(e,t)}},{key:"callListenerFunc",value:function(e){var t,n=i(this.listenerFuncMap.values());try{for(n.s();!(t=n.n()).done;){var r=t.value;if("Function"!==this.typeOf(r))throw Error('[@riversun/event-emitter] listenerFunction you set is not a function. listenerFunction:"'.concat(r,'".Check args of #only method or #on method.'));r(e)}}catch(e){n.e(e)}finally{n.f()}}},{key:"typeOf",value:function(e){return Object.prototype.toString.call(e).slice(8,-1)}}]),e}()}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}return n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(561)})().default}));

/***/ }),

/***/ "../../node_modules/event-listener-helper/lib/event-listener-helper.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/event-listener-helper/lib/event-listener-helper.js ***!
  \*****************************************************************************/
/***/ (function(module) {

/*! event-listener-helper(https://github.com/riversun/event-listener-helper) v1.1.2 Copyright (c) 2020 riversun.org@gmail.com */
!function(e,t){ true?module.exports=t():0}(this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return n}(e,t)||a(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=a(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return s=e.done,e},e:function(e){l=!0,o=e},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw o}}}}function a(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.r(t),n.d(t,"default",(function(){return u}));var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.evTargetListenersMap=new Map,this.listenerNum=0}var t,n,a;return t=e,(n=[{key:"addEventListener",value:function(e,t,n,r){var i=this,o=null;if(r&&(o=this._cloneJson(r)),arguments.length>4)throw Error("Too many arguments. Number of arguments can be specified 4.");this._checkTypeOfOptions(o);var a=null;o&&o.listenerName&&(a=o.listenerName);var s=null;o&&o.once&&(delete o.once,o.callbackOnce=!0,s=function(r){n(r),i.removeEventListener(e,t,null,o)});var l={listenerName:null,success:!0};s?e.addEventListener(t,s,o):e.addEventListener(t,n,o);var u=this.evTargetListenersMap.get(e);u||(u=new Map,this.evTargetListenersMap.set(e,u));var c=u.get(t);if(c||(c=new Map,u.set(t,c)),null!==a){if(c.has(a))throw Error('The listenerName "'.concat(a,'" is already used for the specified event type ').concat(t));c.set(a,{listener:n,onceListener:s,options:o}),l.listenerName=a}else{var f="listener-".concat(this.listenerNum);o||(o={}),o.listenerName=f,c.set(f,{listener:n,onceListener:s,options:o}),l.listenerName=f,this.listenerNum+=1}return l}},{key:"removeEventListener",value:function(e,t,n,r){if(arguments.length<3)throw Error("Three or four arguments are required.");if("Function"!==this.typeOf(n)&&"Null"!==this.typeOf(n))throw Error('Type of 3rd arg should be a "Function" or "Null".');this._checkTypeOfOptions(r);var i=null;r&&r.listenerName&&(i=r.listenerName);var o={success:!1,message:"unknown error"},a=this.evTargetListenersMap.get(e);if(!a)return o.message="DOM element ".concat(e,"(id=").concat(e.id,") doesn't have any listeners."),o;var s=a.get(t);if(!s)return o.message="DOM element ".concat(e,"(id=").concat(e.id,") doesn't have \"").concat(t,'" listeners.'),o;if(i){var l=s.get(i);if(!l)return o.message="DOM element ".concat(e,"(id=").concat(e.id,") doesn't have \"").concat(t,'" listener "').concat(i,'"'),o;s.delete(i),l.options&&l.options.callbackOnce?e.removeEventListener(t,l.onceListener,l.options):e.removeEventListener(t,l.listener,l.options),o.success=!0}else if(!i){if(!n)return o.message="options.listenerName is not found",o;var u="listener",c=n,f=this._searchKeyInValueContent(s,u,c);if(f){var v=s.get(f),y=v.onceListener,p=v.options;s.delete(f),y?e.removeEventListener(t,y,p):e.removeEventListener(t,n,p),o.success=!0}else o.success=!1,o.message="Specified listener could not be deleted from DOM element ".concat(e,"(id=").concat(e.id,").\n        Since the specified listener is not registered as an event listener,\n        it may have been registered outside of event-listener-helper.")}return o}},{key:"getEventListeners",value:function(e,t){return e?t?this._getEventListenersWith2Args(e,t):this._getEventListenersWith1Arg(e):[]}},{key:"getAllEventListeners",value:function(){var e=this,t=new Map;return this.evTargetListenersMap.forEach((function(n,r){var i=r,a=e._getEventListenersWith1Arg(i),s=new Map;t.set(i,s);var l,u=o(a);try{for(u.s();!(l=u.n()).done;){var c=l.value;s.set(c.eventType,c.listeners)}}catch(e){u.e(e)}finally{u.f()}})),t}},{key:"_getEventListenersWith1Arg",value:function(e){var t=[],n=this.evTargetListenersMap.get(e);if(!n)return t;var r,a=o(n);try{for(a.s();!(r=a.n()).done;){var s,l=i(r.value,2),u=l[0],c=l[1],f=[],v=o(c.values());try{for(v.s();!(s=v.n()).done;){var y=s.value;f.push(this._getFrozenListenerDef(y))}}catch(e){v.e(e)}finally{v.f()}f.length>0&&t.push({eventType:u,listeners:f})}}catch(e){a.e(e)}finally{a.f()}return t}},{key:"_getEventListenersWith2Args",value:function(e,t){if(2!==arguments.length)throw Error("Only two arguments can be specified");var n=[],r=this.evTargetListenersMap.get(e);if(!r)return n;var i=r.get(t);if(!i)return n;var a,s=o(i.values());try{for(s.s();!(a=s.n()).done;){var l=a.value,u=this._getFrozenListenerDef(l);n.push(u)}}catch(e){s.e(e)}finally{s.f()}return n}},{key:"getEventListener",value:function(e,t,n){if(3!==arguments.length)throw Error("Only 3 arguments can be specified");var r=this.evTargetListenersMap.get(e);if(!r)return null;var i=r.get(t);if(!i)return null;var o=i.get(n),a=this._getFrozenListenerDef(o);return a}},{key:"hasEventListeners",value:function(e,t){if(2!==arguments.length)throw Error("Only two arguments can be specified");var n=this.evTargetListenersMap.get(e);if(!n)return!1;var r=n.get(t);return!(!r||0===r.size)}},{key:"hasEventListener",value:function(e,t,n){if(3!==arguments.length)throw Error("Only 3 arguments can be specified");var r=this.evTargetListenersMap.get(e);if(!r)return!1;var i=r.get(t);if(!i)return!1;var o=i.get(n);return!!o}},{key:"_getFrozenListenerDef",value:function(e){if(!e)return null;var t={},n=null,r=e.options;return r&&(n={},t.options=n,r.capture&&(n.capture=r.capture),r.callbackOnce&&(n.once=r.callbackOnce),r.listenerName&&(n.listenerName=r.listenerName)),t.listener=e.listener,Object.freeze(n),Object.freeze(t),t}},{key:"clearAllEventListeners",value:function(){var e,t=o(this.getAllEventTargets());try{for(t.s();!(e=t.n()).done;){var n=e.value;this.clearEventListeners(n)}}catch(e){t.e(e)}finally{t.f()}}},{key:"clearEventListeners",value:function(e,t){if(!e)throw Error("At least the EventTarget must be specified as an argument");var n=this.getEventListeners(e,t);if(t){if(t){var r,i=o(n);try{for(i.s();!(r=i.n()).done;){var a=r.value;this.removeEventListener(e,t,null,a.options)}}catch(e){i.e(e)}finally{i.f()}}}else{var s,l=o(n);try{for(l.s();!(s=l.n()).done;){var u,c=s.value,f=c.eventType,v=o(c.listeners);try{for(v.s();!(u=v.n()).done;){var y=u.value.options;this.removeEventListener(e,f,null,y)}}catch(e){v.e(e)}finally{v.f()}}}catch(e){l.e(e)}finally{l.f()}}}},{key:"clearEventListener",value:function(e,t,n){var r=this.getEventListener(e,t,n);r&&r.options&&this.removeEventListener(e,t,null,r.options)}},{key:"getAllEventTargets",value:function(){return Array.from(this.evTargetListenersMap.keys())}},{key:"searchEventListenersByName",value:function(e){var t,n=[],r=o(this.getAllEventTargets());try{for(r.s();!(t=r.n()).done;){var i,a=t.value,s=this.evTargetListenersMap.get(a),l=o(s.keys());try{for(l.s();!(i=l.n()).done;){var u=i.value,c=s.get(u),f=this._getFrozenListenerDef(c.get(e));f&&n.push(f)}}catch(e){l.e(e)}finally{l.f()}}}catch(e){r.e(e)}finally{r.f()}return n}},{key:"_searchKeyInValueContent",value:function(e,t,n){var r,a=o(e);try{for(a.s();!(r=a.n()).done;){var s=i(r.value,2),l=s[0];if(s[1][t]===n)return l}}catch(e){a.e(e)}finally{a.f()}return null}},{key:"_checkTypeOfOptions",value:function(e){if("object"!==r(e)&&void 0!==e)throw"boolean"==typeof e?new Error("Type of boolean is not accepted as the fourth argument you specify.\n      If you want to enable useCapture, specify {capture: true} as the fourth parameter instead."):new Error("Type of ".concat(r(e)," is not accepted as the fourth argument you specify.\n      If you want to specify options, specify an object like {capture: true, listenerName:'my-listener-01'}."))}},{key:"_cloneJson",value:function(e){return JSON.parse(JSON.stringify(e))}},{key:"typeOf",value:function(e){return Object.prototype.toString.call(e).slice(8,-1)}}])&&l(t.prototype,n),a&&l(t,a),e}()}]).default}));

/***/ }),

/***/ "../../node_modules/merge-deeply/lib/merge-deeply.js":
/*!***********************************************************!*\
  !*** ../../node_modules/merge-deeply/lib/merge-deeply.js ***!
  \***********************************************************/
/***/ (function(module) {

/*! merge-deeply v3.0.0 Copyright (c) 2019-2020 riversun.org@gmail.com */
!function(e,r){ true?module.exports=r():0}(this,(function(){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";function n(e,r){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=a(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,c=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return u=e.done,e},e:function(e){c=!0,i=e},f:function(){try{u||null==t.return||t.return()}finally{if(c)throw i}}}}function o(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||a(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],n=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return t}(e,r)||a(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(e,r):void 0}}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,r,t){var a=function(e){return e&&"object"===c(e)&&!Array.isArray(e)},u=t&&t.concatArray,l=t.isCloneMode,y={};t&&t.assignToObject&&(y=t.assignToObject,t.assignToObject=null);var s,b,p,d=null;if(d=y===e?e:Object.assign(y,e),a(e)&&a(r))for(var m=0,j=Object.entries(r);m<j.length;m++){var v=i(j[m],2),g=v[0],h=v[1],O=e[g];if(u&&Array.isArray(h)&&Array.isArray(O)&&r!==e)d[g]=O.concat.apply(O,o(h));else if(a(h)&&Object.prototype.hasOwnProperty.call(e,g))d[g]=f(O,h,t);else{var A=h;if(l&&Array.isArray(h)){var S,w=[],x=n(h);try{for(x.s();!(S=x.n()).done;){var T=S.value,P=JSON.parse(JSON.stringify(T));w.push(P)}}catch(e){x.e(e)}finally{x.f()}A=w}Object.assign(d,(p=A,(b=g)in(s={})?Object.defineProperty(s,b,{value:p,enumerable:!0,configurable:!0,writable:!0}):s[b]=p,s))}}return d}function l(e){var r=null,t=null,n=e.op;if(!n)throw Error('The initialization property "op" cannot be omitted. "merge","overwrite-merge","clone" can be specified.');var o="merge"===n,i="clone"===n,a="overwrite-merge"===n;if(o){if(r=e.object1,t=e.object2,!r||!t)throw Error("object1 or object2 is not specified.")}else if(a){if(r=e.object1,t=e.object2,!r||!t)throw Error("object1 or object2 is not specified.");if(0===Object.keys(t).length)return null}else{if(!i)throw Error('An invalid "op" property value "'.concat(n,'" has been specified.'));r=e.object1,t={}}var u,c=Object.create(Object.getPrototypeOf(r)),l=null,y=(u=r,Object.getPrototypeOf(u)!==Object.prototype);return o&&y||i?(f(r,r,{assignToObject:c,concatArray:e&&e.concatArray,isCloneMode:i}),l=c):l={},f(i?l:r,t,{assignToObject:a?r:l,concatArray:e&&e.concatArray}),l}t.r(r),t.d(r,"default",(function(){return l}))}]).default}));

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jsframe-titlebar-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-titlebar-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-modal-window-background {\n    background: rgba(0, 0, 0, 0.6);\n    height: 100%;\n    widdth: 100%\n}", "",{"version":3,"sources":["webpack://./src/JSFrame.css"],"names":[],"mappings":"AAAA;IACI,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI;gCAC4B;IAC5B,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,8BAA8B;IAC9B,YAAY;IACZ;AACJ","sourcesContent":[".jsframe-titlebar-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-titlebar-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-modal-window-background {\n    background: rgba(0, 0, 0, 0.6);\n    height: 100%;\n    widdth: 100%\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jsframe-preset-style-material-default {\n    background: black;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-material-focused {\n    background: black;\n    border-top-left-radius: 36px;\n    border-top-right-radius: 36px;\n}\n", "",{"version":3,"sources":["webpack://./src/presets/appearance/PresetStyleMaterial.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,4BAA4B;IAC5B,6BAA6B;AACjC","sourcesContent":[".jsframe-preset-style-material-default {\n    background: black;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-material-focused {\n    background: black;\n    border-top-left-radius: 36px;\n    border-top-right-radius: 36px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css ***!
  \*******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jsframe-preset-style-popup-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-popup-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n", "",{"version":3,"sources":["webpack://./src/presets/appearance/PresetStylePopup.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC","sourcesContent":[".jsframe-preset-style-popup-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-popup-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jsframe-preset-style-redstone-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-redstone-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n", "",{"version":3,"sources":["webpack://./src/presets/appearance/PresetStyleRedstone.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI,iBAAiB;IACjB,2BAA2B;IAC3B,4BAA4B;AAChC","sourcesContent":[".jsframe-preset-style-redstone-default {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n\n.jsframe-preset-style-redstone-focused {\n    background: white;\n    border-top-left-radius: 0px;\n    border-top-right-radius: 0px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css ***!
  \**********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".jsframe-preset-style-yosemite-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-yosemite-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n", "",{"version":3,"sources":["webpack://./src/presets/appearance/PresetStyleYosemite.css"],"names":[],"mappings":"AAAA;IACI,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;IACI;gCAC4B;IAC5B,+GAA+G;IAC/G,0DAA0D;IAC1D,uDAAuD;IACvD,kDAAkD;IAClD,2BAA2B;IAC3B,4BAA4B;AAChC","sourcesContent":[".jsframe-preset-style-yosemite-default {\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #f5f5f5, color-stop(1.0, #f8f7f2)));\n    background: -webkit-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: -moz-linear-gradient(top, #f5f5f5, #f8f7f2);\n    background: linear-gradient(top, #f5f5f5, #f8f7f2);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.jsframe-preset-style-yosemite-focused {\n    /* (c)2015 Johannes Jakob\n       Made with <3 in Germany */\n    background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #ebebeb, color-stop(1.0, #d5d5d5)));\n    background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: -moz-linear-gradient(top, #ebebeb, #d5d5d5);\n    background: linear-gradient(top, #ebebeb, #d5d5d5);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./src/JSFrame.css":
/*!*************************!*\
  !*** ./src/JSFrame.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_JSFrame_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./JSFrame.css */ "./node_modules/css-loader/dist/cjs.js!./src/JSFrame.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_JSFrame_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_JSFrame_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/presets/appearance/PresetStyleMaterial.css":
/*!********************************************************!*\
  !*** ./src/presets/appearance/PresetStyleMaterial.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStyleMaterial_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStyleMaterial.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleMaterial.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_PresetStyleMaterial_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_PresetStyleMaterial_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/presets/appearance/PresetStylePopup.css":
/*!*****************************************************!*\
  !*** ./src/presets/appearance/PresetStylePopup.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStylePopup_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStylePopup.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStylePopup.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_PresetStylePopup_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_PresetStylePopup_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/presets/appearance/PresetStyleRedstone.css":
/*!********************************************************!*\
  !*** ./src/presets/appearance/PresetStyleRedstone.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStyleRedstone_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStyleRedstone.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleRedstone.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_PresetStyleRedstone_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_PresetStyleRedstone_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./src/presets/appearance/PresetStyleYosemite.css":
/*!********************************************************!*\
  !*** ./src/presets/appearance/PresetStyleYosemite.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_PresetStyleYosemite_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./PresetStyleYosemite.css */ "./node_modules/css-loader/dist/cjs.js!./src/presets/appearance/PresetStyleYosemite.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_PresetStyleYosemite_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_PresetStyleYosemite_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/CCommon.js":
/*!************************!*\
  !*** ./src/CCommon.js ***!
  \************************/
/***/ ((module) => {

CALIGN = {};

CALIGN.LEFT_TOP = "LEFT_TOP";
CALIGN.HCENTER_TOP = "CENTER_TOP";
CALIGN.RIGHT_TOP = "RIGHT_TOP";
CALIGN.LEFT_VCENTER = "LEFT_CENTER";
CALIGN.HCENTER_VCENTER = "CENTER_CENTER";
CALIGN.CENTER = CALIGN.HCENTER_VCENTER;
CALIGN.RIGHT_VCENTER = "RIGHT_CENTER";
CALIGN.LEFT_BOTTOM = "LEFT_BOTTOM";
CALIGN.HCENTER_BOTTOM = "CENTER_BOTTOM";
CALIGN.RIGHT_BOTTOM = "RIGHT_BOTTOM";

module.exports = CALIGN;


/***/ }),

/***/ "./src/JSFrame.js":
/*!************************!*\
  !*** ./src/JSFrame.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! ./JSFrame.css */ "./src/JSFrame.css");
var EventEmitter = __webpack_require__(/*! @riversun/event-emitter */ "../../node_modules/@riversun/event-emitter/lib/event-emitter.js");
var CALIGN = __webpack_require__(/*! ./CCommon.js */ "./src/CCommon.js");
var WindowEventHelper = __webpack_require__(/*! ./utils/WindowEventHelper.js */ "./src/utils/WindowEventHelper.js");
var inherit = __webpack_require__(/*! ./utils/Inherit.js */ "./src/utils/Inherit.js");
var CFrameAppearance = __webpack_require__(/*! ./appearance/CFrameAppearance.js */ "./src/appearance/CFrameAppearance.js");
var CDomPartsBuilder = __webpack_require__(/*! ./appearance/CDomPartsBuilder.js */ "./src/appearance/CDomPartsBuilder.js");
var CSimpleLayoutAnimator = __webpack_require__(/*! ./utils/CSimpleLayoutAnimator.js */ "./src/utils/CSimpleLayoutAnimator.js");
var EventListenerHelper = __webpack_require__(/*! event-listener-helper */ "../../node_modules/event-listener-helper/lib/event-listener-helper.js");

//If you don't want to bundle preset styles in JsFrame.js ,comment out below.
var presetStyles = {
  "yosemite": __webpack_require__(/*! ./presets/appearance/PresetStyleYosemite.js */ "./src/presets/appearance/PresetStyleYosemite.js"),
  "redstone": __webpack_require__(/*! ./presets/appearance/PresetStyleRedstone.js */ "./src/presets/appearance/PresetStyleRedstone.js"),
  "popup": __webpack_require__(/*! ./presets/appearance/PresetStylePopup.js */ "./src/presets/appearance/PresetStylePopup.js"),
  "toast": __webpack_require__(/*! ./presets/appearance/PresetStyleToast.js */ "./src/presets/appearance/PresetStyleToast.js"),
  "material": __webpack_require__(/*! ./presets/appearance/PresetStyleMaterial.js */ "./src/presets/appearance/PresetStyleMaterial.js"),
};

var presetWindows = {
  "yosemite": __webpack_require__(/*! ./presets/window/PresetWindowYosemite.js */ "./src/presets/window/PresetWindowYosemite.js"),
};

var DEF = {};

// true:Support mouse on mouse-enabled devices
var MOUSE_ENABLED = true;

// true:Support touch on touch-enabled devices
var TOUCH_ENABLED = true;

//true:Allow the window to be moved only in the case of one finger
// (the window cannot be moved in the case of two or more fingers)
var TOUCH_MOVE_ONLY_WITH_ONE_FINGER = true;

/**
 * DEFINITIONS
 */
DEF.CBEAN = {};
DEF.CBEAN.HTML_ELEMENT = "span";
DEF.CBEAN.HTML_ELEMENT_ID_PREFIX = "htmlElement_";
DEF.CBEAN.TYPE_NAME = "bean";

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * CBeanFrame Class<p>
 * The smallest window. It is responsible for basic processing only.
 *
 * @param beanId id of this small window
 * @param left
 * @param top
 * @param width
 * @param height
 * @param zindex
 * @constructor
 */
function CBeanFrame(
  beanId,
  left,
  top,
  width,
  height,
  zindex,
  w_border_width,
  appearance,
) {
  var me = this;

  me.movable = true;

  //fields
  me.id = beanId;
  me.property = {};

  me.extra = {};

  me.parentCanvas = null;
  me.htmlElement = null;

  me.pullUpDisabled = false;
  if (appearance) {
    me.pullUpDisabled = appearance.pullUpDisabled;
  }

  //initialize
  me.htmlElement = document.createElement(DEF.CBEAN.HTML_ELEMENT);
  me.htmlElement.id = DEF.CBEAN.HTML_ELEMENT_ID_PREFIX + beanId;
  me.htmlElement.style.position = "absolute";
  me.htmlElement.style.left = parseInt(left, 10) + "px";
  me.htmlElement.style.top = parseInt(top, 10) + "px";
  me.htmlElement.style.width = parseInt(width, 10) + "px";
  me.htmlElement.style.height = parseInt(height, 10) + "px";

  //Zindex may become 'undefined' in some cases.
  if (zindex !== null) {
    me.htmlElement.style.zIndex = zindex;
  }
  me.htmlElement.style.borderColor = "#000000";

  //If I set a larger font size, width and height of window will be affected....
  me.htmlElement.style.fontSize = "1px";

  //Refer parents to each other.(sougo-sansho)
  me.htmlElement.parent = me;

  if (MOUSE_ENABLED) {
    //Note that 'mouseDown' is mapped to 'onmousedown' of htmlElement,
    //so when 'onmouseDown' fires ,the 'this' will indicate 'htmlElement'
    me.htmlElement.onmousedown = me.onmouseDown;
  }

  if (TOUCH_ENABLED) {
    if ("ontouchstart" in window) {
      var funcOnTouchStart = function (evt) {
        // The "mousedown" event happens right after "touchstart" event,
        // but I don't call #preventdefault because #preventdefault prevents "onclick".
        // So, perform #preventdefault only for "touchmove"
        evt.preventDefault();
        me.onmouseDown.bind(this)(evt);
      };
      me.htmlElement.ontouchstart = funcOnTouchStart;
    }
  }

  //Type name of this class
  me.htmlElement.typeName = DEF.CBEAN.TYPE_NAME;

  //Special field indicating usage of this class
  me.htmlElement.usage = "nothing";

  //Whether it can move outside the frame(waku).
  me.htmlElement.isRangeLimited = false;

  //Movement magnification in the X direction
  //(If it is 0, it can not move in the X direction.)
  me.htmlElement.argX = 1;

  //Movement magnification in Y direction
  // (If it is 0, it can not move in Y direction)
  me.htmlElement.argY = 1;
  me.externalAreaClickedListener = null;

  me.onMoveListener = null;
}

CBeanFrame.prototype.getWindowType = function () {
  return "CBeanFrame";
};

CBeanFrame.prototype.setOnMoveListener = function (listener) {
  var me = this;
  me.onMoveListener = listener;
};
CBeanFrame.prototype._onMove = function (e) {
  var me = this;
  if (me.onMoveListener) {
    me.onMoveListener(e);
  }
};

/**
 * Set whether the frame can be moved while dragging with the mouse
 * @param enabled
 */
CBeanFrame.prototype.setMovable = function (enabled) {
  var me = this;

  if (enabled) {
    me.htmlElement.argX = 1;
    me.htmlElement.argY = 1;
  } else {
    me.htmlElement.argX = 0;
    me.htmlElement.argY = 0;
  }

  me.movable = enabled;

  return me;
};

CBeanFrame.prototype.setParentCanvas = function (parentCanvas) {
  var me = this;
  me.parentCanvas = parentCanvas;
  me.htmlElement.parentCanvas = me.parentCanvas;
  return me;
};
CBeanFrame.prototype.setOnExternalAreaClickedListener = function (listener) {
  var me = this;
  me.externalAreaClickedListener = listener;
  return me;
};
CBeanFrame.prototype.onBodyClicked = function (e) {
  var me = this;

  var clickX = e.pageX;
  var clickY = e.pageY;

  var left = parseInt(me.htmlElement.style.left);
  var top = parseInt(me.htmlElement.style.top);
  var width = parseInt(me.htmlElement.style.width);
  var height = parseInt(me.htmlElement.style.height);

  if (
    left < clickX && clickX < (left + width) && top < clickY &&
    (clickY < top + height)
  ) {
    //- clicked internal area of this frame
  } else {
    //- clicked external area of this frame
    if (me.externalAreaClickedListener) {
      me.externalAreaClickedListener();
    }
  }
};
CBeanFrame.prototype.onmouseDown = function (evt) {
  // Typically, if you mouse down on the title portion, the onmousedown fires to move the window.
  // Mousing down the bottom of the window, the left side of the window,
  // or the bottom of the window will fire the onmouseDown of the window itself (CBeanFrame)
  // as well as the onmouseDown of the CMarkerWindow for resizing.
  // Each mousedown element is set to a currentObject as being selected,
  // whether it's a window or a marker.

  // this means htmlElement of CBeanFrame object
  var refHtmlElement = this;

  var e = evt;

  if (TOUCH_ENABLED) {
    if (evt.type === "touchstart") {
      var changedTouches = evt.changedTouches;
      if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
        var touches = evt.touches;
        if (touches.length === 1) {
          e = changedTouches[0];
        } else {
          return true;
        }
      } else {
        e = changedTouches[0];
      }
    }
  }

  //Retrieve CBeanFrame object itself
  var refCBeanFrame = refHtmlElement.parent;

  if (e.button == 0 || evt.type === "touchstart") {
    // for modal background window
    if (refCBeanFrame.pullUpDisabled) {
      return false;
    } else {
      // Set the current CBeanFrame to be selected(=currentObject) among other CBeanFrames in the parent canvas.
      refHtmlElement.parentCanvas.currentObject = refHtmlElement;

      // Bring the current bean to the top
      refHtmlElement.parentCanvas.pullUp(refCBeanFrame.id);
    }
  } else if (e.button == 2) {
    return false;
  }

  if (refHtmlElement.parentCanvas.currentObject) {
    refHtmlElement.parentCanvas.offsetX = e.pageX -
      parseInt(refHtmlElement.parentCanvas.currentObject.style.left, 10);
    refHtmlElement.parentCanvas.offsetY = e.pageY -
      parseInt(refHtmlElement.parentCanvas.currentObject.style.top, 10);
  }

  return false;
};
/**
 * End of CBeanFrame Class <p>
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

DEF.CANVAS = {};
DEF.CANVAS.HTML_ELEMENT = "div";
DEF.CANVAS.WIDTH_ADJUST_20180722 = 2;
DEF.CANVAS.HEIGHT_ADJUST_20180722 = 3;

/**
 * CCanvas class
 * A canvas is a place where windows are arranged, where you can drag and move freely.
 *
 * @param parentElement
 * @param canvasId
 * @param left
 * @param top
 * @param width
 * @param height
 * @constructor
 */
function CCanvas(parentElement, canvasId, left, top, width, height) {
  //Event data to be transmitted
  function EventData() {
    this.x = 0;
    this.y = 0;
    this.screenX = 0;
    this.screenY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.isMoved = false;
    this.targetTypeName = null;
    this.targetUsage = null;
    this.targetObject = null;
  }

  var me = this;

  me.enablePullUp = true; // true:Pull-up sorting to bring the window to the forefront by clicking to get focus.
  me.currentObject = null;
  me.onTopObject = null;
  me.offsetX = 0;
  me.offsetY = 0;

  //Object which generated 'mouseDown' event at the very beginning(ichiban-saisho)
  me.mouseDownSource = null;

  me.id = canvasId;
  me.canvasElement = null;
  me.parentElement = parentElement;
  me.beanList = new Array();

  me.beanIdName = {}; //key:beanId value:beanName
  me.beanNameId = {}; //key:beanName value:beanId

  me.eventData = new EventData();

  me.baseZIndex = 0;
  me.setBaseZIndex = function (baseZIndex) {
    me.baseZIndex = baseZIndex;
  };
  me.getBaseZIndex = function () {
    return me.baseZIndex;
  };

  me.canvasElement = document.createElement(DEF.CANVAS.HTML_ELEMENT);

  me.canvasElement.style.zIndex = 2000;
  me.canvasElement.id = me.id;
  me.canvasElement.style.boxSizing = "border-box";
  me.canvasElement.style.position = "absolute";
  me.canvasElement.style.left = parseInt(left) + "px";
  me.canvasElement.style.top = parseInt(top) + "px";
  //Added an adjustment value.Because transparent part appears at the bottom of the screen,
  me.canvasElement.style.width =
    (parseInt(width) + DEF.CANVAS.WIDTH_ADJUST_20180722) + "px";
  me.canvasElement.style.height =
    (parseInt(height) + DEF.CANVAS.HEIGHT_ADJUST_20180722) + "px";
  me.canvasElement.style.backgroundColor = "transparent";
  me.canvasElement.style.borderStyle = "none";
  me.canvasElement.style.margin = "0px";
  me.canvasElement.style.borderWidth = "0px";
  me.canvasElement.style.borderColor = "transparent";

  //Add the Canvas's html element into the canvas's parent html element
  me.parentElement.appendChild(me.canvasElement);
}

CCanvas.prototype.mouseMove = function (evt) {
  var me = this;
  var e = evt;
  if (TOUCH_ENABLED) {
    if (evt.type === "touchmove") {
      var changedTouches = evt.changedTouches;
      if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
        var touches = evt.touches;
        if (touches.length === 1) {
          e = changedTouches[0];
        } else {
          return true;
        }
      } else {
        e = changedTouches[0];
      }
    }
  }
  if (me.currentObject) {
    //eventData.isMoved=true;The presence of event data means that it has moved.
    me.eventData.targetTypeName = me.currentObject.typeName;
    me.eventData.targetUsage = me.currentObject.usage;
    me.eventData.targetObject = me.currentObject;

    //Even when obj is not being dragged, mouse coordinates are used here because they are needed.
    var newObjLeftPx = e.pageX - me.offsetX;
    var newObjTopPx = e.pageY - me.offsetY;

    var absoluteMouseX = e.pageX;
    var absoluteMouseY = e.pageY;

    //Take the snapshot before updating the location.
    var oldObjLeftPx = me.currentObject.style.left;
    var oldObjTopPx = me.currentObject.style.top;

    //When the mouse cursor goes out of range,
    //the addition in the X direction and Y direction (delta X, delta Y) is set to zero.
    //this.left=Cavas's left side edge, this.top=Canvas's top side edge.
    var tmpLeft = parseInt(newObjLeftPx, 10);
    var tmpTop = parseInt(newObjTopPx, 10);

    var tmpRight = tmpLeft + parseInt(me.currentObject.style.width, 10);
    var tmpBottom = tmpTop + parseInt(me.currentObject.style.height, 10);

    var styleWidth = parseInt(me.canvasElement.style.width, 10);
    var styleHeight = parseInt(me.canvasElement.style.height, 10);

    var deltaX = 0;
    var deltaY = 0;

    if (
      me.currentObject.isRangeLimited == true &&
      (tmpLeft <= 0 || tmpRight > styleWidth || tmpTop <= 0 ||
        tmpBottom > styleHeight)
    ) {
      deltaX = 0;
      deltaY = 0;
    } else {
      deltaX = (parseInt(newObjLeftPx, 10) - parseInt(oldObjLeftPx, 10));
      deltaY = (parseInt(newObjTopPx, 10) - parseInt(oldObjTopPx, 10));
      me.currentObject.style.left = (parseInt(me.currentObject.style.left) +
        deltaX * me.currentObject.argX) + "px";
      me.currentObject.style.top = (parseInt(me.currentObject.style.top) +
        deltaY * me.currentObject.argY) + "px";

      var parentObject = me.currentObject.parent;
      if (parentObject && parentObject._onMove) {
        parentObject._onMove();
      }
    }
    me.eventData.deltaX = deltaX;
    me.eventData.deltaY = deltaY;

    return me.eventData;
  }
  //Returns null if none of the objects are clicked and the only mouse just moves.
  return null;
};

CCanvas.prototype.mouseUp = function (e) {
  var me = this;
  me.currentObject = null;
  me.mouseDownSource = null;
};

//Bring the object in front
CCanvas.prototype.pullUp = function (targetBeanId) {
  var me = this;

  var tmpBeanArray = [];

  var beanList = me.beanList;

  for (var i in beanList) {
    tmpBeanArray.push(beanList[i]);
  }

  //Bring the target object in front and set zindex to 1.
  var targetBean = beanList[targetBeanId];

  if (me.enablePullUp) {
    me.pullUpSort(targetBean, tmpBeanArray, me.baseZIndex);
  }

  //Remember the top object
  me.onTopObject = targetBean;
};

//Calculate the front / back information of the window accurately.
CCanvas.prototype.pullUpSort = function (pullupObject, objectArray, baseIndex) {
  var me = this;

  //Increase the index number of the target object
  pullupObject.htmlElement.style.zIndex = objectArray.length + baseIndex;

  //sort by index
  objectArray.sort(function (b, a) {
    return -parseInt(b.htmlElement.style.zIndex, 10) +
      parseInt(a.htmlElement.style.zIndex, 10);
  });

  //Redefine number of the index
  for (var i in objectArray) {
    objectArray[i].htmlElement.style.zIndex = (objectArray.length - 1) - i +
      baseIndex;
  }
};

/**
 * remove the bean object
 * @param beanId
 */
CCanvas.prototype.removeBean = function (beanId) {
  var me = this;

  //Retrieve the target beanFrame
  var beanList = me.beanList;
  var targetBean = beanList[beanId];

  //Remove bean's htmlElement from canvasElement
  me.canvasElement.removeChild(targetBean.htmlElement);

  //Delete the bean object in the associative array.
  delete beanList[beanId];
};

/**
 * Add bean into this canvas
 * @param bean
 */
CCanvas.prototype.addBean = function (bean) {
  var me = this;

  var beanList = me.beanList;

  var beanIdName = me.beanIdName; //key:beanId value:beanName
  var beanNameId = me.beanNameId; //key:beanName value:beanId

  beanList[bean.id] = bean;

  if (bean.property.name) {
    beanNameId[bean.property.name] = bean.id;
    beanIdName[bean.id] = bean.property.name;
  }

  //In this usage case the 'length' property is invalid ..
  var num = 0;

  for (var j in beanList) {
    num++;
  }

  //Set zIndex so that what you add later will come up.
  bean.htmlElement.style.zIndex = num + me.baseZIndex;

  //On the bean side, specify the parent of the bean to me.
  bean.setParentCanvas(me);

  this.canvasElement.appendChild(bean.htmlElement);
};

CCanvas.prototype.getParentElement = function () {
  var me = this;
  return me.parentElement;
};

/**
 * End of canvas class
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

DEF.CFRAME = {};
DEF.CFRAME.CANVAS_ELEMENT_BGCOLOR = "transparent";
DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX =
  "window__modal_window_background_";

inherit(CFrame, CBeanFrame);

/**
 * CFrame class
 * <p>
 * This class represents a window whose size can be changed ,
 * can move freely on the screen,
 * can have a title bar,
 *
 * @param windowId
 * @param w_left
 * @param w_top
 * @param w_width
 * @param w_height
 * @param zindex
 * @param w_border_width
 * @param appearance
 * @constructor
 */
function CFrame(
  windowId,
  w_left,
  w_top,
  w_width,
  w_height,
  zindex,
  w_border_width,
  appearance,
) {
  var me = this;

  //call constructor of superclass
  CFrame.superConstructor.call(
    this,
    windowId,
    w_left,
    w_top,
    w_width,
    w_height,
    zindex,
    w_border_width,
    appearance,
  );

  me.anchor = CALIGN.LEFT_TOP;

  me.showTitleBar = appearance.showTitleBar;

  me.canvasNetHeight = null;
  me.canvasNetWidth = null;
  me.frameHeightAdjust = appearance.frameHeightAdjust;

  me.frameComponentMap = {};

  //initialize the field
  me.canvas = null;

  //canvas id
  me.myCanvasId = null;

  //Buttons to be placed on the screen (positioning same as the close button)
  me.floatingButton = null;

  me.titleBarClassNameDefault = "jsframe-titlebar-default"; // DEF.CFRAME.TITLE_BAR_CLASS_DEFAULT;
  me.titleBarClassNameFocused = "jsframe-titlebar-focused"; //DEF.CFRAME.TITLE_BAR_CLASS_FOCUSED;

  //height of titlebar
  me.titleBarHeight = appearance.titleBarHeight;

  me.titleBarCaption = appearance.titleBarCaption;
  me.titleBarCaptionLeftMargin = appearance.titleBarCaptionLeftMargin;
  me.titleBarCaptionFontSize = appearance.titleBarCaptionFontSize;
  me.titleBarCaptionFontWeight = appearance.titleBarCaptionFontWeight;
  me.titleBarBorderBottomDefault = appearance.titleBarBorderBottomDefault;
  me.titleBarBorderBottomFocused = appearance.titleBarBorderBottomFocused;
  me.titleBarCaptionTextShadow = appearance.titleBarCaptionTextShadow;
  me.titleBarCaptionTextAlign = appearance.titleBarCaptionTextAlign;

  //Title bar width adjustment value
  me.titleAdjustWidth = 2;

  me.windowId = windowId;

  me.exBorderWidth = 0;

  me.myCanvasId = windowId + "_canvas";

  //img element for icon placed on the left-top
  var appIcon = document.createElement("img");
  //		appIcon.src='img/ico_app_file16.gif';

  //url of icon image
  appIcon.src = "";
  appIcon.style.position = "absolute";
  appIcon.style.left = "2px";
  appIcon.style.top = "2px";
  appIcon.style.width = "16px";
  appIcon.style.height = "16px";
  appIcon.style.visibility = "hidden";

  //The title bar must be on the front of the canvas.
  me.titleBar = document.createElement("div");

  me.titleBar.className = "jsframetitlebar";

  if (me.showTitleBar) {
    me.titleBar.id = windowId + "_title";
    me.titleBar.style.position = "absolute";
    me.titleBar.style.boxSizing = "border-box";
    me.titleBar.style.top = "0px";
    me.titleBar.style.left = "0px";
    me.titleBar.style.width =
      (w_width - me.titleAdjustWidth + DEF.CANVAS.WIDTH_ADJUST_20180722) + "px";
    me.titleBar.style.userSelect = "none";

    if (me.titleBarHeight) {
      var titleBarAdjust = 0;

      if (me.titleBarBorderBottomDefault) {
        titleBarAdjust = 0;
      }

      me.titleBar.style.height = (parseInt(me.titleBarHeight, 10) + 0) + "px";
    }

    if (me.titleBarColorDefault) {
      me.titleBar.style.background = me.titleBarColorDefault;
    }
    me.titleBar.style.zIndex = 0;

    me.titleBar.style.color = me.titleBarCaptionColorDefault;
    me.titleBar.style.fontSize = me.titleBarCaptionFontSize;
    me.titleBar.style.fontWeight = me.titleBarCaptionFontWeight;
    me.titleBar.style.textShadow = me.titleBarCaptionTextShadow;
    me.titleBar.style.textAlign = me.titleBarCaptionTextAlign;
    // me.titleBar.style.textShadow = "0 1px 0 rgba(255,255,255,.7)";
    // me.titleBar.style.textAlign = 'center';

    me.titleBar.style.lineHeight = me.titleBar.style.height;

    me.titleBar.style.borderBottom = me.titleBarBorderBottomDefault;
    //me.titleBar.style.boxShadow = '0 1px 0 rgba(255,255,255,0.5)';

    //Set not to display overflow character string
    me.titleBar.style.overflow = "hidden";

    var titleBarText = document.createTextNode("");

    //'span' to store text
    var titleBarTextSpan = document.createElement("span");

    titleBarTextSpan.id = me.id + "_titleBarText";
    if (me.titleBarCaptionLeftMargin != null) {
      titleBarTextSpan.style.position = "absolute";
      titleBarTextSpan.style.left = parseInt(me.titleBarCaptionLeftMargin, 10) +
        "px";
    } else {
      titleBarTextSpan.style.position = "absolute";
      titleBarTextSpan.style.left = "0px";
      titleBarTextSpan.style.right = "0px";
    }
    titleBarTextSpan.style.top = "0px";
    titleBarTextSpan.appendChild(titleBarText);
    me.titleBar.appendChild(titleBarTextSpan);

    //Discontinue appicon(20061011)
    //me.titleBar.appendChild(appIcon);
  }

  me.htmlElement.appendChild(me.titleBar);

  //Set Canvas throughout the window

  //parseInt(me.titleBar.style.height);//me.titleBarHeight);
  var canvasMoreHeight = parseInt(me.titleBarHeight, 10) - titleBarAdjust;
  var canvasMoreSpacing = parseInt(me.titleAdjustWidth, 10);

  if (me.showTitleBar) {
  } else {
    canvasMoreHeight = 0;
    canvasMoreSpacing = 0;
    titleBarAdjust = 0;
  }

  me.canvasNetWidth = w_width - canvasMoreSpacing;
  me.canvasNetHeight = w_height - canvasMoreHeight - canvasMoreSpacing - 1 -
    titleBarAdjust + me.frameHeightAdjust;

  //Change the style of htmlElement of CFrame (CBean).
  me.htmlElement.style.cursor = "move";

  //Create a canvas
  me.canvas = new CCanvas(
    me.htmlElement,
    me.myCanvasId,
    0,
    canvasMoreHeight,
    w_width - canvasMoreSpacing,
    w_height - canvasMoreHeight - canvasMoreSpacing,
  );

  me.canvas.enablePullUp = false;
  me.canvas.canvasElement.style.backgroundColor =
    DEF.CFRAME.CANVAS_ELEMENT_BGCOLOR;
  me.canvas.canvasElement.style.cursor = "default";

  if (MOUSE_ENABLED) {
    //Handling the omousedown event that occurred in Canvas which is a child element of CFrame
    me.canvas.canvasElement.onmousedown = me.canvasMouseDown;
  }

  if (TOUCH_ENABLED) {
    if ("ontouchstart" in window) {
      var funcOnTouchStart = function (evt) {
        // The "mousedown" event happens right after "touchstart" event,
        // but I don't call #preventdefault because #preventdefault prevents "onclick" (like button on titlebar).
        // So, perform #preventdefault only for "touchmove"
        // evt.preventDefault();
        var touchStartEvent = evt.changedTouches[0];
        me.canvasMouseDown.bind(this)(touchStartEvent);
      };
      me.canvas.canvasElement.ontouchstart = funcOnTouchStart;
    }
  }

  //Set the canvas as a reference to the parent of the canvas html element canvasElement.
  me.canvas.canvasElement.parentCFrame = me;

  var tmpCanvasWidth = parseInt(me.canvas.canvasElement.style.width, 10);
  var tmpCanvasHeight = parseInt(me.canvas.canvasElement.style.height, 10);

  var markerWidth = appearance.resizeAreaWidth;
  var markerHeight = appearance.resizeAreaHeight;

  //Offset from marker edge
  var edgeMargin = appearance.resizeAreaOffset;
  var markerZIndex = 0;

  var colorRD, colorDD, colorRR;

  if (appearance.resizeAreaVisible) {
    colorRD = "rgba(255, 0, 0, 0.5)";
    colorDD = "rgba(0, 0, 255, 0.5)";
    colorRR = "rgba(0, 255, 0, 0.5)";
  }

  //Lower right(R-D)
  var markerRD = new CMarkerWindow(
    me.myCanvasId + "_RD",
    tmpCanvasWidth + edgeMargin,
    tmpCanvasHeight + edgeMargin,
    markerWidth,
    markerHeight,
    markerZIndex,
    "RD",
    colorRD,
  );

  markerRD.htmlElement.style.cursor = "se-resize"; //nw-resize';

  //Since only the deltaX and deltaY are acquired and the movement of the marker itself is
  // performed by CFrame_resize, the movement coefficient of the marker itself is set to 0.
  markerRD.htmlElement.argX = 0;
  markerRD.htmlElement.argY = 0;

  //Bottom(D-D)
  var markerDD = new CMarkerWindow(
    me.myCanvasId + "_DD",
    0,
    tmpCanvasHeight + edgeMargin,
    tmpCanvasWidth + edgeMargin,
    markerHeight,
    markerZIndex,
    "DD",
    colorDD,
  );

  markerDD.htmlElement.style.cursor = "n-resize";

  //Since only the deltaX and deltaY are acquired and the movement of the marker itself is
  // performed by CFrame_resize, the movement coefficient of the marker itself is set to 0.
  markerDD.htmlElement.argX = 0;
  markerDD.htmlElement.argY = 0;

  //Right(R-R)
  var markerRR = new CMarkerWindow(
    me.myCanvasId + "_RR",
    tmpCanvasWidth + edgeMargin,
    0,
    markerWidth,
    tmpCanvasHeight + edgeMargin,
    markerZIndex,
    "RR",
    colorRR,
  );

  markerRR.htmlElement.style.cursor = "w-resize";

  //Since only the deltaX and deltaY are acquired and the movement of the marker itself is
  // performed by CFrame_resize, the movement coefficient of the marker itself is set to 0.
  markerRR.htmlElement.argY = 0;
  markerRR.htmlElement.argX = 0;

  //Add size change marker to canvas.
  me.canvas.addBean(markerRD);
  me.canvas.addBean(markerDD);
  me.canvas.addBean(markerRR);

  //Method to remove size change marker (can not resize)
  me.removeMarkers = function () {
    me.canvas.removeBean(markerRD.id);
    me.canvas.removeBean(markerDD.id);
    me.canvas.removeBean(markerRR.id);
    me.htmlElement.style.cursor = "default";
  };

  me.removeMarkers2 = function () {
    me.canvas.removeBean(markerRD.id);
    me.canvas.removeBean(markerDD.id);
    me.canvas.removeBean(markerRR.id);
  };
  me.enableMarkers = function (enabled) {
    if (enabled) {
      markerRD.htmlElement.style.display = "flex";
      markerDD.htmlElement.style.display = "flex";
      markerRR.htmlElement.style.display = "flex";
      markerRD.htmlElement.style.cursor = "se-resize";
      markerDD.htmlElement.style.cursor = "n-resize";
      markerRR.htmlElement.style.cursor = "w-resize";
    } else {
      markerRD.htmlElement.style.display = "none";
      markerDD.htmlElement.style.display = "none";
      markerRR.htmlElement.style.display = "none";
    }
    // me.canvas.removeBean(markerRD.id);
    // me.canvas.removeBean(markerDD.id);
    // me.canvas.removeBean(markerRR.id);
  };

  for (var idx in appearance.frameComponents) {
    var frameComponent = appearance.frameComponents[idx];
    frameComponent.setFrame(me);

    //if frameComponent has special name 'closeButton', it will act as a close button.
    if ("closeButton" == frameComponent.id) {
      frameComponent.htmlElement.onclick = me.close;
    }

    // Handle child menu open/close
    var frameComponentHasChildMenu = frameComponent.htmlElement.querySelector(
      ".jsframe-child-menu",
    );
    if (frameComponentHasChildMenu) {
      me.eventListenerHelper.addEventListener(
        frameComponent.htmlElement,
        "click",
        function (e) {
          var frameComponentId = e.target.getAttribute("component-id");

          // Close all frame component's childmenu once because other frame component's childmenu may be open.
          // If {exceptFrameComponentId:[frameComponentId]} is specified for the argument,
          // the child menu will not be closed.
          me.hideFrameComponentChildMenus(
            { exceptFrameComponentId: frameComponentId },
          );

          if (frameComponentId) {
            var frameComponentHtmlElement = me.getFrameComponentElement(
              frameComponentId,
            );
            var frameComponentChildMenu = frameComponentHtmlElement
              .querySelector(".jsframe-child-menu");
            if (frameComponentChildMenu) {
              // By making the display a table,
              // the width of the childMenu can be accurately reflected.
              // (flex does not set the width correctly.)
              if (frameComponentChildMenu.style.display == "table") {
                frameComponentChildMenu.style.display = "none";
              } else {
                frameComponentChildMenu.style.display = "table";
              }
            } else {
              console.error(
                "frameComponent child menu isnt found. frameComponentId=" +
                  frameComponentId,
              );
            }
          }
        },
        { listenerName: "frame-component_child-menu-listener" },
      );
    }

    me.addFrameComponent(frameComponent);
  } // /add frameComponents[end]

  //override the field
  me.htmlElement.style.backgroundColor = "transparent";

  me.htmlElement.oncontextmenu = this.contextMenu;

  //The policy of Border drawing seems to be different between IE and FF.
  var caribVal = 0;

  me.caribValue = caribVal;

  if (me.exBorderWidth) {
    me.htmlElement.style.borderWidth = me.exBorderWidth + "px";
  }
  me.htmlElement.style.width =
    (parseInt(me.htmlElement.style.width, 10) - caribVal) + "px";
  me.htmlElement.style.height =
    (parseInt(me.htmlElement.style.height, 10) - caribVal + 1) + "px";
  me.htmlElement.typeName = "cwindow";
  me.htmlElement.overflow = "auto";
  me.htmlElement.style.boxSizing = "content-box";

  if (appearance.frameBorderStyle) {
    me.htmlElement.style.borderStyle = appearance.frameBorderStyle;
  }

  if (appearance.frameBoxShadow) {
    me.htmlElement.style.boxShadow = appearance.frameBoxShadow;
  }

  //TODO deprecation(because CIfFrame is extended this operation)
  if (parseInt(appearance.frameBorderWidthDefault, 10) >= 0) {
    me.htmlElement.style.borderWidth = appearance.frameBorderWidthDefault;
    me.htmlElement.style.borderColor = appearance.frameBorderColorDefault;
  }
  if (parseInt(appearance.frameBorderRadius, 10) >= 0) {
    me.htmlElement.style.borderRadius = appearance.frameBorderRadius;
  }

  me.onCloseFrameListener = null;
}

CFrame.prototype.setTitleBarClassName = function (
  classNameForDefault,
  classNameForFocused,
) {
  var me = this;
  if (classNameForDefault) {
    me.titleBarClassNameDefault = classNameForDefault;
    me.titleBarClassNameFocused = classNameForDefault;
  }
  if (classNameForFocused) {
    me.titleBarClassNameFocused = classNameForFocused;
  }
  return me;
};
/**
 * Add frameComponent(Wrapped DOM element like 'div' to display above the frame) to frame
 * @param frameComponent
 */
CFrame.prototype.addFrameComponent = function (frameComponent) {
  var me = this;

  me.frameComponentMap[frameComponent.id] = frameComponent;
  me.canvas.canvasElement.appendChild(frameComponent.htmlElement);
  return me;
};

/**
 * Get stored frame component by id
 * @param frameComponent
 */
CFrame.prototype.getFrameComponentElement = function (id) {
  var me = this;
  if (me.frameComponentMap[id]) {
    return me.frameComponentMap[id].htmlElement;
  } else {
    return null;
  }
};

CFrame.prototype.removeFrameComponentById = function (frameComponentId) {
  var me = this;

  var frameComponent = me.frameComponentMap[frameComponentId];

  me.canvas.canvasElement.removeChild(frameComponent.htmlElement);
  delete me.frameComponentMap[frameComponentId];
};

CFrame.prototype.showFrameComponent = function (frameComponentId, display) {
  var me = this;
  var comp = me.getFrameComponentElement(frameComponentId);
  if (comp) {
    if (display) {
      comp.style.display = display;
    } else {
      comp.style.display = "flex";
    }
  }
  return me;
};

CFrame.prototype.hideFrameComponent = function (frameComponentId) {
  var me = this;
  var comp = me.getFrameComponentElement(frameComponentId);
  if (comp) {
    comp.style.display = "none";
  }
  return me;
};

CFrame.prototype.hideAllVisibleFrameComponents = function () {
  var me = this;

  var compMap = me.frameComponentMap;
  for (var key in compMap) {
    if (compMap.hasOwnProperty(key)) {
      var comp = compMap[key].htmlElement;
      if (comp.style.display === "none") {
        comp._alreadyNone = true;
      }
      comp.style.display = "none";
    }
  }
};
CFrame.prototype.showAllVisibleFrameComponents = function () {
  var me = this;
  var compMap = me.frameComponentMap;
  for (var key in compMap) {
    if (compMap.hasOwnProperty(key)) {
      var comp = compMap[key].htmlElement;
      if (comp._alreadyNone) {
        comp._alreadyNone = null;
      } else {
        comp.style.display = "flex";
      }
    }
  }
};

/**
 * Close all childMenu
 If {exceptFrameComponentId:[frameComponentId]} is specified for the argument,
 the child menu will not be closed.

 * @param opt
 */
CFrame.prototype.hideFrameComponentChildMenus = function (opt) {
  var me = this;

  var compMap = me.frameComponentMap;
  for (var frameComponentId in compMap) {
    if (compMap.hasOwnProperty(frameComponentId)) {
      if (opt && opt.exceptFrameComponentId) {
        if (frameComponentId === opt.exceptFrameComponentId) {
          continue;
        }
      }
      var comp = compMap[frameComponentId];
      if (comp.childMenu) {
        comp.childMenu.style.display = "none";
      }
    }
  }
};

CFrame.prototype.setTitle = function (str) {
  var me = this;
  me.title = str;
  if (me.showTitleBar) {
    var textNode = document.createTextNode(str);
    //firstChildのfirstChildがspan
    me.titleBar.firstChild.replaceChild(
      textNode,
      me.titleBar.firstChild.firstChild,
    );
  }
  return me;
};

CFrame.prototype.resize = function (
  deltaLeft,
  deltaTop,
  deltaWidth,
  deltaHeight,
) {
  var me = this;

  var tmpLeft = parseInt(me.htmlElement.style.left, 10);
  var tmpTop = parseInt(me.htmlElement.style.top, 10);
  var tmpWidth = parseInt(me.htmlElement.style.width, 10);
  var tmpHeight = parseInt(me.htmlElement.style.height, 10);

  me.htmlElement.style.left = parseInt(tmpLeft + deltaLeft, 10) + "px";
  me.htmlElement.style.top = parseInt(tmpTop + deltaTop, 10) + "px";

  me.htmlElement.style.width = parseInt(tmpWidth + deltaWidth, 10) + "px";
  me.htmlElement.style.height = parseInt(tmpHeight + deltaHeight, 10) + "px";

  var tmpCanvasWidth = parseInt(me.canvas.canvasElement.style.width, 10);
  var tmpCanvasHeight = parseInt(me.canvas.canvasElement.style.height, 10);

  //Since canvasElement is a (0, 0) relative coordinate with respect to the parent element,
  // so it is not necessary to change left and top.
  me.canvas.canvasElement.style.width = (tmpCanvasWidth + deltaWidth) + "px";
  me.canvas.canvasElement.style.height = (tmpCanvasHeight + deltaHeight) + "px";

  if (me.showTitleBar) {
    //Change the size of the title bar. TitleAdjustWidth etc.
    //The reason why you do not have to use titleAdjustWidth is because
    // these scaling are done with differences (deltaX, deltaY).
    //Therefore, if you adjust with the titleAdjustWidth as
    // the initial value, the other will stretch relative.
    //You do not think you can use ifDelta
    me.titleBar.style.width = (tmpCanvasWidth + deltaWidth) + "px";
  } else {
  }

  for (var beanName in me.canvas.beanList) {
    var tmpBean = me.canvas.beanList[beanName];

    if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
      if (tmpBean.htmlElement.usage == "RD") {
        //Move the size change lower right(RD) marker according to the amount of movement.
        tmpBean.htmlElement.style.left =
          (parseInt(tmpBean.htmlElement.style.left, 10) + deltaWidth) + "px";
        tmpBean.htmlElement.style.top =
          (parseInt(tmpBean.htmlElement.style.top, 10) + deltaHeight) + "px";
      } else if (tmpBean.htmlElement.usage == "DD") {
        //Move the size change lower marker according to the movement amount.
        // Do not move left.Only the width wil increase or decrease.
        tmpBean.htmlElement.style.width =
          (parseInt(tmpBean.htmlElement.style.width, 10) + deltaWidth) + "px";
        tmpBean.htmlElement.style.top =
          (parseInt(tmpBean.htmlElement.style.top, 10) + deltaHeight) + "px";
      } else if (tmpBean.htmlElement.usage == "RR") {
        //Move the size change right marker according to the movement amount
        //Do not move top,Only the height will increase or decrease.
        tmpBean.htmlElement.style.left =
          (parseInt(tmpBean.htmlElement.style.left, 10) + deltaWidth) + "px";
        tmpBean.htmlElement.style.height =
          (parseInt(tmpBean.htmlElement.style.height, 10) + deltaHeight) + "px";
      }
    }
  }
};

CFrame.prototype.canvasMouseDown = function (e) {
  var me = this;

  //Mousedown processing of CFrame.canvas

  //'This' in this method indicates 'Cwindow.canvas.canvasElement'.
  if (this.parentCFrame.parentCanvas.mouseDownSource == null) {
    this.parentCFrame.parentCanvas.mouseDownSource = "childcanvas";
  }
};
CFrame.prototype.mouseUp = function (e) {
  this.canvas.mouseUp(e);
};

CFrame.prototype.close = function (e) {
  var me = this;
  //Close processing of CFrame from CloseButton

  var parentCanvas = this.parentObject.parentCanvas;
  var cframeObj = this.parentObject;

  console.log(
    'CFrame#close "' + cframeObj.title + "(@" + cframeObj.getName() + ")" +
      '" @' + cframeObj.windowId,
  );

  var windowId = cframeObj.id;
  cframeObj.closeInternally(e, parentCanvas, windowId);
};

CFrame.prototype.closeFrame = function (e) {
  //Close processing of CFrame
  var me = this;

  console.log(
    'CFrame#closeFrame "' + me.title + "(" + me.getName() + ")" + '" @' +
      me.windowId,
  );

  var parentCanvas = this.parentCanvas;
  me.closeInternally(e, parentCanvas, me.windowId);
};

CFrame.prototype.closeInternally = function (e, parentCanvas, windowId) {
  var me = this;

  if (!parentCanvas) {
    console.error("Window(" + windowId + ") may have been closed");
    return;
  }
  parentCanvas.removeBean(windowId);

  //added for modal window
  if (me.modalBackgroundWindowId) {
    parentCanvas.removeBean(me.modalBackgroundWindowId);
    me.modalBackgroundWindowId = null;
  }

  if (me.onCloseFrameListener) {
    me.onCloseFrameListener(me);
  }
};

CFrame.prototype.setOnCloseFrameListener = function (listener) {
  var me = this;
  me.onCloseFrameListener = listener;
};

CFrame.prototype.contextMenu = function () {
  //If you issue the right-click menu in the window, set the source to CFrame.
  var contextMenuSource = "CFrame";
  return false;
};

CFrame.prototype.setTitleBarTextColor = function (str) {
  var me = this;
  me.titleBar.style.color = str;
};

/**
 * Set window position with anchor
 * @param {number} x
 * @param {number} y
 * @param {string} anchor anchor means the position of the window with respect to which the position is specified.<br>
 *   The following values can be specified for the anchor
 LEFT_TOP
 CENTER_TOP
 RIGHT_TOP
 LEFT_CENTER
 CENTER_CENTER
 RIGHT_CENTER
 LEFT_BOTTOM
 CENTER_BOTTOM
 RIGHT_BOTTOM
 * @returns {CFrame}
 */
CFrame.prototype.setPosition = function (x, y, anchor) {
  var me = this;

  var frameWidth = me.getWidth();
  var frameHeight = me.getHeight();

  me._setPositionInternally(x, y, anchor, frameWidth, frameHeight);

  return me;
};
CFrame.prototype._setPositionInternally = function (
  x,
  y,
  anchor,
  frameWidth,
  frameHeight,
) {
  var me = this;

  if (anchor) {
    me.anchor = anchor;
  }

  if (!anchor || CALIGN.LEFT_TOP == anchor) {
    me.htmlElement.style.left = x + "px";
    me.htmlElement.style.top = y + "px";
  } else if (CALIGN.HCENTER_TOP == anchor) {
    me.htmlElement.style.left = (-frameWidth / 2 + x) + "px";
    me.htmlElement.style.top = y + "px";
  } else if (CALIGN.RIGHT_TOP == anchor) {
    me.htmlElement.style.left = (-frameWidth + x) + "px";
    me.htmlElement.style.top = y + "px";
  } else if (CALIGN.LEFT_VCENTER == anchor) {
    me.htmlElement.style.left = x + "px";
    me.htmlElement.style.top = (-frameHeight / 2 + y) + "px";
  } else if (CALIGN.HCENTER_VCENTER == anchor) {
    me.htmlElement.style.left = (-frameWidth / 2 + x) + "px";
    me.htmlElement.style.top = (-frameHeight / 2 + y) + "px";
  } else if (CALIGN.RIGHT_VCENTER == anchor) {
    me.htmlElement.style.left = (-frameWidth + x) + "px";
    me.htmlElement.style.top = (-frameHeight / 2 + y) + "px";
  } else if (CALIGN.LEFT_BOTTOM == anchor) {
    me.htmlElement.style.left = x + "px";
    me.htmlElement.style.top = (-frameHeight + y) + "px";
  } else if (CALIGN.HCENTER_BOTTOM == anchor) {
    me.htmlElement.style.left = (-frameWidth / 2 + x) + "px";
    me.htmlElement.style.top = (-frameHeight + y) + "px";
  } else if (CALIGN.RIGHT_BOTTOM == anchor) {
    me.htmlElement.style.left = (-frameWidth + x) + "px";
    me.htmlElement.style.top = (-frameHeight + y) + "px";
  }
};

/**
 * Returns relative position with anchor
 * @returns {{x: *, y: *, anchor: *}}
 */
CFrame.prototype.getPosition = function () {
  var me = this;
  var frameWidth = me.getWidth();
  var frameHeight = me.getHeight();
  var x;
  var y;
  var anchor = me.anchor;
  if (!anchor || CALIGN.LEFT_TOP == anchor) {
    x = parseInt(me.htmlElement.style.left, 10);
    y = parseInt(me.htmlElement.style.top, 10);
  } else if (CALIGN.HCENTER_TOP == anchor) {
    x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
    y = parseInt(me.htmlElement.style.top, 10);
  } else if (CALIGN.RIGHT_TOP == anchor) {
    x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
    y = parseInt(me.htmlElement.style.top, 10);
  } else if (CALIGN.LEFT_VCENTER == anchor) {
    x = parseInt(me.htmlElement.style.left, 10);
    y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
  } else if (CALIGN.HCENTER_VCENTER == anchor) {
    x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
    y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
  } else if (CALIGN.RIGHT_VCENTER == anchor) {
    x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
    y = parseInt(me.htmlElement.style.top, 10) + frameHeight / 2;
  } else if (CALIGN.LEFT_BOTTOM == anchor) {
    x = parseInt(me.htmlElement.style.left, 10);
    y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
  } else if (CALIGN.HCENTER_BOTTOM == anchor) {
    x = parseInt(me.htmlElement.style.left, 10) + frameWidth / 2;
    y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
  } else if (CALIGN.RIGHT_BOTTOM == anchor) {
    x = parseInt(me.htmlElement.style.left, 10) + frameWidth;
    y = parseInt(me.htmlElement.style.top, 10) + frameHeight;
  }
  return { x: x, y: y, anchor: anchor };
};

CFrame.prototype.getLeft = function () {
  var me = this;
  return parseInt(me.htmlElement.style.left, 10);
};

CFrame.prototype.getTop = function () {
  var me = this;
  return parseInt(me.htmlElement.style.top, 10);
};
CFrame.prototype.getWidth = function () {
  var me = this;
  return parseInt(me.htmlElement.style.width, 10);
};
CFrame.prototype.getHeight = function () {
  var me = this;
  return parseInt(me.htmlElement.style.height, 10);
};

CFrame.prototype.getSize = function () {
  var me = this;
  return { width: me.getWidth(), height: me.getHeight() };
};

CFrame.prototype.setSize = function (width, height, force) {
  var me = this;

  var byUser = true;

  if (force) {
    byUser = false;
  }

  //call CIFrame#resize instead of CFrame#resize
  me.resize(0, 0, width - me.getWidth(), height - me.getHeight(), byUser);
  return me;
};

CFrame.prototype.getWindowId = function () {
  var me = this;
  return me.windowId;
};

CFrame.prototype.getName = function () {
  var me = this;
  return me.property.name;
};

CFrame.prototype.setName = function (name) {
  var me = this;
  me.property.name = name;
};
/**
 * end of CFrame class
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

inherit(CIfFrame, CFrame);

/**
 * CIfFrame class
 * Extension class with contents frame of CFrame as iframe
 * @param windowId
 * @param appearance
 * @constructor
 */
function CIfFrame(windowId, left, top, width, height, appearance) {
  var wleft = left;
  var wtop = top;
  var wwidth = width;
  var wheight = height;
  var zindex = appearance.zindex;
  var wborderwidth = null;

  var me = this;

  this.jsFrame = null;
  this.control = null;

  this.minFrameWidth = 128;
  this.minWindowHeight = 32;

  this.eventListenerHelper = new EventListenerHelper();

  /**
   * If this value is true, the focus will move when tapping the iframe area,
   * but if the window do not have the focus, you can not click on the element in the iframe.
   */
  this.overrayTransparentScreenEnabled = false;

  /**
   *  Only in the case of resizing a transparent screen can be displayed on the iframe
   *  and the size can be adjusted smoothly.
   *  true is recommended.
   */
  //Change history
  //20181226
  //Changed to false.
  // So it becomes necessary to click twice to react when you call the #setSize,I changed the value to false.
  //20181231
  //I found the way that iframe will be changed the size smoothly.so the final answer is true.
  this.overrayTransparentScreenOnResize = true;

  this.titleBarColorFocused = appearance.titleBarColorFocused;

  this.titleBarColorDefault = appearance.titleBarColorDefault;

  this.titleBarCaptionColorDefault = appearance.titleBarCaptionColorDefault;
  this.titleBarCaptionColorFocused = appearance.titleBarCaptionColorFocused;

  //call super constructor
  CIfFrame.superConstructor.call(
    me,
    windowId,
    wleft,
    wtop,
    wwidth,
    wheight,
    zindex,
    wborderwidth,
    appearance,
  );

  //border color
  me.frameBorderColorDefault = appearance.frameBorderColorDefault;
  me.frameBorderColorFocused = appearance.frameBorderColorFocused;

  //border width
  me.frameBorderWidthDefault = appearance.frameBorderWidthDefault;
  me.frameBorderWidthFocused = appearance.frameBorderWidthFocused;

  me.iframe = null;

  //Offset value for width adjustment of iframe
  me.ifDelta = 0;

  me.resizable = true;

  me.onMouseMoveOnIframe = null;
  me.onMouseUpOnIframe = null;

  me._hasFocus = false;

  me._hasFocusTime = 0;

  me.htmlElement.typeName = "cifwindow";

  //name of iframe
  var exIframeName = "riversun_" + windowId;

  me.dframe = document.createElement("div");

  me.iframe = document.createElement("iframe");

  me.iframe.name = exIframeName;

  me.iframe.id = exIframeName;

  me.iframe.frameBorder = "0";
  //me.iframe.scrolling = 'no';

  me.iframe.zIndex = -1;

  //Allow transparent of iframe background.
  me.iframe.allowTransparency = "true";
  me.iframe.width = me.canvasNetWidth - me.ifDelta + 0;
  me.iframe.height = me.canvasNetHeight - me.ifDelta + 0;

  me.showTitleBar = appearance.showTitleBar;

  me.getFrameInnerBorderRadius = appearance.getFrameInnerBorderRadius;

  me.frameBorderRadius = appearance.frameBorderRadius;

  me.adjustFrameBorderRadius();

  me.useIframe = false;

  me.canvas.canvasElement.appendChild(me.iframe);

  me.canvas.canvasElement.appendChild(me.dframe);

  this.setUseIframe = function (useIframe) {
    me.useIframe = useIframe;
    me.iframe.style.visibility = "hidden";
    me.iframe.style.position = "absolute";
    me.iframe.style.left = "0px";
    me.iframe.style.top = "0px";
    me.iframe.style.width = "100%";
    me.iframe.style.height = "100%";

    me.dframe.style.visibility = "hidden";
    me.dframe.style.position = "absolute";
    me.dframe.style.left = "0px";
    me.dframe.style.boxSizing = "content-box";

    me.dframe.style.top = "0px";
    me.dframe.style.width = "100%";
    me.dframe.style.height = "100%";
    //me.dframe.style.borderStyle="solid";
    me.dframe.style.backgroundColor = "white";

    if (useIframe) {
      me.iframe.style.visibility = "visible";
      me.dframe.style.visibility = "hidden";
    } else {
      me.iframe.style.visibility = "hidden";
      me.dframe.style.visibility = "visible";
    }
  };

  me.setUseIframe(appearance.useIframe);

  // If it is IE, set the canvasElement of the canvas which is the parent of the iframe to transparent.

  if (
    me.overrayTransparentScreenEnabled || me.overrayTransparentScreenOnResize
  ) {
    //Create a transparent screen.
    me.transparence = document.createElement("span");
    // me.transparence.style.backgroundImage = 'url(img/img_baron_tp.gif)';

    me.transparence.style.position = "absolute";
    me.transparence.style.left = "0px";
    me.transparence.style.top = "0px";

    //Transparent screen is 0px when creating window
    me.transparence.style.width = "0px";
    me.transparence.style.height = "0px";

    me.transparence.style.zIndex = 4;
    me.transparence.style.borderWidth = "0px";
    me.transparence.style.borderColor = "#ff00ee";
    me.transparence.style.borderStyle = "none";
    me.transparence.style.cursor = "default";

    me.transparence.style.pointerEvents = "none";
    me.canvas.canvasElement.style.backgroundColor =
      appearance.frameBackgroundColor;

    me.canvas.canvasElement.appendChild(me.transparence);
  }

  me.eventEmitter = new EventEmitter();

  me.appearance = appearance;
}

CIfFrame.prototype.getFrameView = function () {
  var me = this;
  return me.dframe;
};

CIfFrame.prototype.getFrameAppearance = function () {
  var me = this;
  return me.appearance;
};

CIfFrame.prototype.setHTML = function (html) {
  var me = this;
  me.dframe.innerHTML = html;
};
CIfFrame.prototype.setFrameInFrame = function (enabled) {
  // Why i had to (bother to:) ) make a setFrameInFrame
  // The element specified at the top of the content of the parent window (for example, div element)
  // may NOT be able to get the resize event using addEventListener.
  // Therefore, when the resize event issued by jsFrame in the parent window occurs,
  // its custom attribute (WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR) is attached
  // to the element at the top of the parent window content
  // and it is captured by the mutationObserver on the child window side.

  var me = this;

  var contentsEle = me.dframe ? me.dframe.firstChild : null;

  if (contentsEle) {
    // polyfill for #now
    if (!Date.now) {
      Date.now = function now() {
        return new Date().getTime();
      };
    }
    if (enabled) {
      me.eventEmitter.only("resize", "fif-listener", function () {
        contentsEle.setAttribute(
          WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
          Date.now(),
        );
      });
    } else {
      contentsEle.removeAttribute(
        WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR,
      );
      me.eventEmitter.only("resize", "fif-listener", function () {
        // do nothing
      });
    }
  }
};
/**
 * Find DOM Element in the frame by querySelector<br>
 *  Examples<br>
 *      frame.$("#my_id_name");
 *      frame.$(".my_class_name");
 *      frame.$("div>img");
 *      frame.$("input[type='submit]");
 * @param {string} q selector query
 * @returns {Node}
 */
CIfFrame.prototype.$ = function (q) {
  var me = this;

  if (me.useIframe) {
    var docInIframe = me.iframe.contentWindow.document;
    return docInIframe.querySelector(q);
  } else {
    return me.dframe.querySelector(q);
  }
};

/**
 * Sets an event listener for the window itself or elements in the contents of the window.
 It is possible to register multiple listeners to the same event type.

 * @param {string} id
 If the "id" is prefixed with "#",
 an event listener can be set to a DOM element (eventTarget) identified by the id in the content.<br>
 This is the same behavior as the usual eventTarget#addEventListener.<br>
 <br>
 In addition to the DOM element in the content, the following special names are reserved for the "id"<br>
 "closeButton" ... close button.<br>
 "minimizeButton" ... Minimize Button<br>
 "zoomButton"...zoom button.<br>
 "restoreButton" ... the button that restores the window size.<br>
 "deminimizeButton" ... the button to return from the minimized state.<br>
 <br>
 You can also receive events such as window resizing, moving, and focusing.
 In this case, specify the following as "id"<br>
 "frame" or "window".<br>
 <br>
 You can specify a frameComponent name that is uniquely defined by addFrameComponent.
 (Generic buttons such as closeButton are one of the frame components.
 * @param {string} eventType The element in the content (HTML) of a window whose "id" starts with "#"
 * can be the same as the eventType(https://developer.mozilla.org/en-US/docs/Web/API/Event/type) used by the normal addEventListener.<br>
 <br>
 If the "id" is a frame or a window, the following can be used<br>
 "move"... When a window is moved, it fires.<br>
 "resize"... Fires when the window is resized.<br>
 "focus"... "focus" means got focus. It fires when the window is in focus.<br>
 "blur"... "blur" means lost focus.It fires when the window loses focus.<br>
 <br>
 * @param {function} callbackFunc
 */
CIfFrame.prototype.on = function (id, eventType, callbackFunc) {
  var me = this;
  var component = me.getFrameComponentElement(id);

  // if id indicates frame component like CTextButton,CImageButton
  if (component) {
    //Since we want to specify only one handler for frame components at the same time,
    // use eventListenerHelper instead of an event listener
    me.eventListenerHelper.addEventListener(component, eventType, function (e) {
      callbackFunc(me, e, {
        type: "frameComponent",
        id: id,
        eventType: eventType,
        //child: childMenuEle
      });
    }, { listenerName: "frame-component-listener" });
  }

  if (id === "frame" || id === "window") {
    if (eventType === "move" && !me.eventEmitter.hasListenerFuncs("move")) {
      me.setOnMoveListener(function (e) {
        //refCIfFrame.eventEmitter.emit('resize',);
        me.eventEmitter.emit("move", me._getCurrentSizePos());
      });
    }

    me.eventEmitter.on(eventType, callbackFunc);
  }

  // DOM element in iframe or DOM element on dframe
  var domElement = me.$(id);

  if (domElement) {
    if (
      me.eventListenerHelper.hasEventListener(
        domElement,
        eventType,
        "frame-dom-listener",
      )
    ) {
      me.eventListenerHelper.removeEventListener(
        domElement,
        eventType,
        null,
        { listenerName: "frame-dom-listener" },
      );
    }
    me.eventListenerHelper.addEventListener(
      domElement,
      eventType,
      function (e) {
        callbackFunc(me, e, {
          type: "dom",
          id: id,
          eventType: eventType,
        });
      },
      { listenerName: "frame-dom-listener" },
    );
  }

  // Search DOM element on frameComponent
  if (!domElement) {
    var domElementOnCanvasElement = me.canvas.canvasElement.querySelector(id);
    if (domElementOnCanvasElement) {
      domElementOnCanvasElement.addEventListener(eventType, function (e) {
        callbackFunc(me, e, {
          type: "dom",
          id: id,
          eventType: eventType,
        });
      });
    }
  }
};

CIfFrame.prototype.adjustFrameBorderRadius = function () {
  var me = this;

  if (parseInt(me.frameBorderRadius, 10) > 0) {
    var borderData = me.getFrameInnerBorderRadius(me, me._hasFocus);
    var frameAppearance = borderData.frameAppearance;
    var innerBorderRadius = borderData.innerBorderRadius;
    var titleBarHeight = parseInt(frameAppearance.titleBarHeight, 10);

    if (me.showTitleBar) {
      //title bar exists
      me.canvas.canvasElement.style.borderBottomRightRadius = innerBorderRadius;
      me.canvas.canvasElement.style.borderBottomLeftRadius = innerBorderRadius;
      me.iframe.style.borderBottomRightRadius = innerBorderRadius;
      me.iframe.style.borderBottomLeftRadius = innerBorderRadius;

      me.titleBar.style.borderTopLeftRadius = innerBorderRadius;
      me.titleBar.style.borderTopRightRadius = innerBorderRadius;
    } else {
      //title bar not exits
      me.canvas.canvasElement.style.borderRadius = innerBorderRadius;
      me.iframe.style.borderRadius = innerBorderRadius;
    }

    if (me.dframe) {
      if (titleBarHeight === 0) {
        if (!me.dframe.style.borderTopRightRadius) {
          me.dframe.style.borderTopRightRadius = innerBorderRadius;
        }
        if (!me.dframe.style.borderTopLeftRadius) {
          me.dframe.style.borderTopLeftRadius = innerBorderRadius;
        }
      }
      me.dframe.style.borderBottomRightRadius = innerBorderRadius;
      me.dframe.style.borderBottomLeftRadius = innerBorderRadius;
    }
  }
};

CIfFrame.prototype.handleReleasingFocus = function (e) {
  var me = this;

  var focused = me._hasFocus;

  me._hasFocus = false;

  //update style class
  me.titleBar.className = me.titleBarClassNameDefault;

  if (me.titleBarColorDefault) {
    me.titleBar.style.background = me.titleBarColorDefault;
  }
  me.titleBar.style.color = me.titleBarCaptionColorDefault;

  //border color
  if (me.frameBorderColorDefault) {
    me.htmlElement.style.borderColor = me.frameBorderColorDefault;
  }

  //border width
  if (me.frameBorderWidthDefault) {
    me.htmlElement.style.borderWidth = me.frameBorderWidthDefault;
    me.adjustFrameBorderRadius();
  }

  if (me.htmlElement.typeName == "cifwindow") {
    if (me.overrayTransparentScreenEnabled) {
      me.transparence.style.width = parseInt(me.iframe.width, 10) + "px";
      me.transparence.style.height = parseInt(me.iframe.height, 10) + "px";
    }
  }

  //handling for child frameComponents
  for (var frameComponentId in me.frameComponentMap) {
    var frameComponent = me.frameComponentMap[frameComponentId];
    frameComponent.handleReleasingFocus();
  }

  //border bottom
  if (me.titleBarBorderBottomDefault) {
    me.titleBar.style.borderBottom = me.titleBarBorderBottomDefault;
  }

  if (focused) {
    me.eventEmitter.emit("blur", { target: me });
  }

  return me;
};

CIfFrame.prototype.handleTakingFocus = function (e) {
  var me = this;
  var focused = me._hasFocus;
  me._hasFocus = true;
  me._hasFocus = Date.now();

  if (me.overrayTransparentScreenEnabled) {
    //close transparence screen
    me.transparence.style.width = "0px";
    me.transparence.style.height = "0px";
  }

  //update style class
  me.titleBar.className = me.titleBarClassNameFocused;

  if (me.titleBarColorFocused) {
    me.titleBar.style.background = me.titleBarColorFocused;
  }
  me.titleBar.style.color = me.titleBarCaptionColorFocused;

  //border color
  if (me.frameBorderColorFocused) {
    me.htmlElement.style.borderColor = me.frameBorderColorFocused;
  }

  //border width
  if (me.frameBorderWidthFocused) {
    me.htmlElement.style.borderWidth = me.frameBorderWidthFocused;
    me.adjustFrameBorderRadius();
  }

  //border bottom
  if (me.titleBarBorderBottomFocused) {
    me.titleBar.style.borderBottom = me.titleBarBorderBottomFocused;
  }

  //handling for child frameComponents
  for (var frameComponentId in me.frameComponentMap) {
    var frameComponent = me.frameComponentMap[frameComponentId];
    frameComponent.handleTakingFocus();
  }

  if (!focused) {
    me.eventEmitter.emit("focus", { target: me });
  }

  return me;
};

CFrame.prototype.show = function (model) {
  var me = this;
  //me.htmlElement.style.visibility = 'visible';
  me.htmlElement.style.display = "flex"; //hidden';

  if (model && model.requestFocus == false) {
  } else {
    me.requestFocus();
  }
  return me;
};

CFrame.prototype.showModal = function (onCloseListener) {
  var me = this;

  var appearance = new CFrameAppearance();
  appearance.showTitleBar = true;
  appearance.showCloseButton = false;
  appearance.frameBorderRadius = "0px";
  appearance.frameBorderStyle = "none";
  appearance.frameBorderWidthDefault = "0px";
  appearance.frameBorderWidthFocused = "0px";
  appearance.frameBoxShadow = null;
  appearance.frameBackgroundColor = "transparent";
  appearance.frameComponents = [];
  appearance.frameHeightAdjust = 0;
  appearance.titleBarHeight = "0px";
  appearance.titleBarBorderBottomFocused = null;
  appearance.titleBarCaptionLeftMargin = "0px";

  appearance.onInitialize = function () {
  };

  //added for modal window
  appearance.pullUpDisabled = true;

  var windowManager = me.parentCanvas;

  var modalBackgroundWindowId = DEF.CFRAME.MODAL_BACKGROUND_FRAME_ID_PREFIX +
    me.id;

  //create background window for preventing click background
  var modalBackgroundFrame = new CIfFrame(
    modalBackgroundWindowId,
    0,
    0,
    1,
    1,
    appearance,
  );
  modalBackgroundFrame.setSize(window.innerWidth, window.innerHeight, true);
  modalBackgroundFrame.setResizable(false);

  window.addEventListener("resize", function () {
    modalBackgroundFrame.setSize(window.innerWidth, window.innerHeight, true);
  });

  //remember id of modal background frame
  me.modalBackgroundWindowId = modalBackgroundWindowId;

  // if (properties && properties.windowName) {
  //     frame.setName(properties.windowName);
  // }

  modalBackgroundFrame.hide();
  windowManager.addWindow(modalBackgroundFrame);

  modalBackgroundFrame.setTitle("").getFrameView().innerHTML =
    '<div class="jsframe-modal-window-background"></div>';
  modalBackgroundFrame.getFrameView().style.backgroundColor = "rgba(0,0,0,0.0)";
  modalBackgroundFrame.show();

  me.show();

  if (onCloseListener) {
    me.setOnCloseFrameListener(onCloseListener);
  }
};
CFrame.prototype.getWindowManager = function () {
  var me = this;
  return me.parentCanvas;
};

CIfFrame.prototype.hide = function () {
  var me = this;
  //  me.htmlElement.style.visibility = 'hidden';
  me.htmlElement.style.display = "none"; //hidden';
  return me;
};

//Overriding CBeanFrame.prototype.onmouseDown
CIfFrame.prototype.onmouseDown = function (e) {
  var refHtmlElement = this;

  //Do not select it when dragging by the mouse.
  document.body.ondrag = function () {
    return false;
  };
  // document.body.onselectstart = function () {
  //     return false;
  // };

  //Override decorator with onmouseDown of parent class
  refHtmlElement.decorator = CFrame.prototype.onmouseDown;
  refHtmlElement.decorator(e);

  //Deploy a transparent screen.
  // Since mouseDown is pointed to this.htmlElement.onmousedown in the CBean class,
  // this 'this' will indicate this.htmlElement.
  //In other words,
  //if you want to refer 'CIfFrame',you need to specify 'this.parent.'
  //See CBeanFrame class, you can find 'this.htmlElement.parent = this'
  var refCIfFrame = refHtmlElement.parent;

  var refCWindowManager = refHtmlElement.parentCanvas;

  //When somewhere window(CFrame,CIfFrame) fires 'mouseDown',
  // Close all transparency screens so that the mouse cursor can pass over any iFrame
  for (var windowId in refCWindowManager.beanList) {
    var objCIfFrame = refCWindowManager.beanList[windowId];
    if (windowId == refCIfFrame.getWindowId()) {
      //skip
    } else {
      objCIfFrame.handleReleasingFocus();
    }
  }

  refCIfFrame.handleTakingFocus();
};

CIfFrame.prototype.mouseUp = function (e) {
  var refCIfFrame = this;

  if (
    refCIfFrame.overrayTransparentScreenEnabled ||
    refCIfFrame.overrayTransparentScreenOnResize
  ) {
    if (refCIfFrame.parentCanvas.onTopObject == refCIfFrame) {
      //Minimize the window at the front.
      refCIfFrame.transparence.style.width = "0px";
      refCIfFrame.transparence.style.height = "0px";
    } else {
      //The window which is not the at the front expands the screen so that it can respond to clicks.

      if (refCIfFrame.overrayTransparentScreenEnabled) {
        refCIfFrame.transparence.style.width =
          parseInt(refCIfFrame.iframe.width) + "px";
        refCIfFrame.transparence.style.height =
          parseInt(refCIfFrame.iframe.height) + "px";
      }
    }
  }

  refCIfFrame.decorator = CFrame.prototype.mouseUp;
  refCIfFrame.decorator(e);

  //Cancel selecting "Do not select when dragging mouse while releasing button" is canceled
  document.body.ondrag = null;
  document.body.onselectstart = null;

  //Disable when stopping moving.(Enable transparent window only when moving.)
  //This will work smoothly even with iframe content
  refCIfFrame.transparence.style.pointerEvents = "none";
};

CIfFrame.prototype.setMinFrameSize = function (width, height) {
  var me = this;
  me.minFrameWidth = width;
  me.minWindowHeight = height;
};

CIfFrame.prototype.resize = function (
  deltaLeft,
  deltaTop,
  deltaWidth,
  deltaHeight,
  byUser,
) {
  var refCIfFrame = this;

  if (!refCIfFrame.resizable && byUser) {
    return null;
  }

  var prevSize = refCIfFrame.getSize();

  //Resize processing should be overridden directly rather than adopting a decorator pattern because it has better performance.
  var tmpLeft = parseInt(refCIfFrame.htmlElement.style.left, 10);
  var tmpTop = parseInt(refCIfFrame.htmlElement.style.top, 10);
  var tmpWidth = parseInt(refCIfFrame.htmlElement.style.width, 10);
  var tmpHeight = parseInt(refCIfFrame.htmlElement.style.height, 10);

  //Important logic to handle the minimum of Window well
  if (
    byUser &&
    (tmpWidth + deltaWidth < refCIfFrame.minFrameWidth & deltaWidth < 0)
  ) {
    //Minimum adjustment of width
    refCIfFrame.htmlElement.style.width = tmpWidth + "px";
    deltaWidth = 0;
  }

  if (
    byUser &&
    (tmpHeight + deltaHeight < refCIfFrame.minWindowHeight & deltaHeight < 0)
  ) {
    //Minimum adjustment of height
    refCIfFrame.htmlElement.style.height = tmpHeight + "px";
    deltaHeight = 0;
  }
  refCIfFrame.htmlElement.style.left = (tmpLeft + deltaLeft) + "px";
  refCIfFrame.htmlElement.style.top = (tmpTop + deltaTop) + "px";
  refCIfFrame.htmlElement.style.width = (tmpWidth + deltaWidth) + "px";
  refCIfFrame.htmlElement.style.height = (tmpHeight + deltaHeight) + "px";

  var tmpCanvasWidth = parseInt(
    refCIfFrame.canvas.canvasElement.style.width,
    10,
  );
  var tmpCanvasHeight = parseInt(
    refCIfFrame.canvas.canvasElement.style.height,
    10,
  );

  //Since canvasElement is a (0, 0) relative coordinate with respect
  // to the parent element, it is not necessary to change left and top.
  refCIfFrame.canvas.canvasElement.style.width = (tmpCanvasWidth + deltaWidth) +
    "px";
  refCIfFrame.canvas.canvasElement.style.height =
    (tmpCanvasHeight + deltaHeight) + "px";

  //Change the size of the title bar. TitleAdjustWidth etc.
  // The reason why you do not have to use titleAdjustWidth is
  // because these scaling are done with differences (deltaX, deltaY).
  //Therefore, if you adjust with the titleAdjustWidth
  // as the initial value, the other will stretch relative.
  refCIfFrame.titleBar.style.width =
    (tmpCanvasWidth - refCIfFrame.ifDelta + deltaWidth + 0) + "px";

  //Image resizing for iframe that is the child element of canvas
  refCIfFrame.iframe.width =
    (tmpCanvasWidth - refCIfFrame.ifDelta + deltaWidth + 0) + "px";
  refCIfFrame.iframe.height =
    (tmpCanvasHeight - refCIfFrame.ifDelta + deltaHeight +
      refCIfFrame.frameHeightAdjust) + "px";

  if (
    refCIfFrame.overrayTransparentScreenEnabled ||
    refCIfFrame.overrayTransparentScreenOnResize
  ) {
    //Deploy a transparent screen.
    refCIfFrame.transparence.style.width = parseInt(refCIfFrame.iframe.width) +
      "px";
    refCIfFrame.transparence.style.height =
      parseInt(refCIfFrame.iframe.height) + "px";
  }

  //move frameComponent(like closeButton) corresponding to moving window edge for resize
  for (var frameComponentId in refCIfFrame.frameComponentMap) {
    var frameComponent = refCIfFrame.frameComponentMap[frameComponentId];
    //update alignment of frameComponent corresponding to moving window edge for resize
    frameComponent.updateAlign();
  }

  for (var beanName in refCIfFrame.canvas.beanList) {
    var tmpBean = refCIfFrame.canvas.beanList[beanName];

    if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
      if (tmpBean.htmlElement.usage == "RD") {
        tmpBean.htmlElement.style.left =
          (parseInt(tmpBean.htmlElement.style.left) + deltaWidth) + "px";
        tmpBean.htmlElement.style.top =
          (parseInt(tmpBean.htmlElement.style.top) + deltaHeight) + "px";
      } else if (tmpBean.htmlElement.usage == "DD") {
        tmpBean.htmlElement.style.width =
          (parseInt(tmpBean.htmlElement.style.width) + deltaWidth) + "px";
        tmpBean.htmlElement.style.top =
          (parseInt(tmpBean.htmlElement.style.top) + deltaHeight) + "px";
      } else if (tmpBean.htmlElement.usage == "RR") {
        tmpBean.htmlElement.style.left =
          (parseInt(tmpBean.htmlElement.style.left) + deltaWidth) + "px";
        tmpBean.htmlElement.style.height =
          (parseInt(tmpBean.htmlElement.style.height) + deltaHeight) + "px";
      }
    }
  }

  var crrSize = refCIfFrame.getSize();
  if (prevSize.width !== crrSize.width || prevSize.height !== crrSize.height) {
    refCIfFrame.eventEmitter.emit("resize", refCIfFrame._getCurrentSizePos());
  }
}; //resize

CIfFrame.prototype._getCurrentSizePos = function () {
  var me = this;
  var crrSize = me.getSize();
  var crrPos = me.getPosition();
  return { target: me, pos: crrPos, size: crrSize };
};

CIfFrame.prototype.resizeDirect = function (width, height, byUser) {
  var refCIfFrame = this;

  if (!refCIfFrame.resizable && byUser) {
    return null;
  }

  refCIfFrame.htmlElement.style.width = width + "px";
  refCIfFrame.htmlElement.style.height = height + "px";

  var tmpCanvasWidth = parseInt(refCIfFrame.canvas.canvasElement.style.width);
  var tmpCanvasHeight = parseInt(refCIfFrame.canvas.canvasElement.style.height);

  //Since canvasElement is a (0, 0) relative coordinate with respect
  // to the parent element, it is not necessary to change left and top.
  refCIfFrame.canvas.canvasElement.style.width = width + "px";
  refCIfFrame.canvas.canvasElement.style.height =
    (height - refCIfFrame.titleBar.style.height) + "px";

  //Change the size of the title bar. TitleAdjustWidth etc.
  // The reason why you do not have to use titleAdjustWidth is
  // because these scaling are done with differences (deltaX, deltaY).
  //Therefore, if you adjust with the titleAdjustWidth
  // as the initial value, the other will stretch relative.
  refCIfFrame.titleBar.style.width = (width - refCIfFrame.ifDelta) + "px";

  //Image resizing for iframe that is the child element of canvas
  refCIfFrame.iframe.width = width - refCIfFrame.ifDelta + "px";
  refCIfFrame.iframe.height = height - refCIfFrame.ifDelta +
    refCIfFrame.frameHeightAdjust + "px";

  if (
    refCIfFrame.overrayTransparentScreenEnabled ||
    refCIfFrame.overrayTransparentScreenOnResize
  ) {
    //Deploy a transparent screen.
    refCIfFrame.transparence.style.width = parseInt(refCIfFrame.iframe.width) +
      "px";
    refCIfFrame.transparence.style.height =
      parseInt(refCIfFrame.iframe.height) + "px";
  }

  //move frameComponent(like closeButton) corresponding to moving window edge for resize
  for (var frameComponentId in refCIfFrame.frameComponentMap) {
    var frameComponent = refCIfFrame.frameComponentMap[frameComponentId];
    //update alignment of frameComponent corresponding to moving window edge for resize
    frameComponent.updateAlign();
  }

  for (var beanName in refCIfFrame.canvas.beanList) {
    var tmpBean = refCIfFrame.canvas.beanList[beanName];

    if (tmpBean.htmlElement.typeName == "cmarkerwindow") {
      if (tmpBean.htmlElement.usage == "RD") {
        tmpBean.htmlElement.style.left = width + "px"; // parseInt(tmpBean.htmlElement.style.left) + deltaWidth + 'px';
        tmpBean.htmlElement.style.top = height + "px"; //parseInt(tmpBean.htmlElement.style.top) + deltaHeight + 'px';
      } else if (tmpBean.htmlElement.usage == "DD") {
        tmpBean.htmlElement.style.width = width + "px";
        tmpBean.htmlElement.style.top = height + "px"; //heightparseInt(tmpBean.htmlElement.style.top) + deltaHeight + 'px';
      } else if (tmpBean.htmlElement.usage == "RR") {
        tmpBean.htmlElement.style.left = width + "px"; //+parseInt(tmpBean.htmlElement.style.left) + deltaWidth + 'px';
        tmpBean.htmlElement.style.height = height + "px";
      }
    }
  }
}; //resize

/**
 * Focus on this frame
 */
CIfFrame.prototype.requestFocus = function () {
  var me = this;

  var beanList = me.parentCanvas.beanList;

  for (var windowId in beanList) {
    var tmpIfWindow = beanList[windowId];

    //If it's my own window, minimize the transparent screen and change the color of the title bar.
    if (windowId == me.getWindowId()) {
      //if this frame is a target frame
      tmpIfWindow.handleTakingFocus();
    } else {
      //if this frame is NOT a target frame
      tmpIfWindow.handleReleasingFocus();
    }
  }

  me.parentCanvas.pullUp(me.id);
};

/**
 * URL for iframe
 * @param url
 */
CIfFrame.prototype.setUrl = function (url) {
  var me = this;

  return new Promise(function (resolve, reject) {
    if (url) {
      me.setUseIframe(true);
    } else {
      me.setUseIframe(false);
      resolve();
    }

    me.iframe.src = url;

    me.iframe.onload = function () {
      var funcOnMouseMove = function (e) {
        var clientX = e.pageX;
        var clientY = e.pageY;

        if (TOUCH_ENABLED) {
          if (e.type === "touchmove") {
            var changedTouches = e.changedTouches;
            if (TOUCH_MOVE_ONLY_WITH_ONE_FINGER) {
              var touches = e.touches;
              if (touches.length === 1) {
                clientX = changedTouches[0].pageX;
                clientY = changedTouches[0].pageY;
              } else {
                return true;
              }
            } else {
              clientX = changedTouches[0].pageX;
              clientY = changedTouches[0].pageY;
            }
          }
        }
        var frameLeft = me.getLeft();
        var frameTop = me.getTop();
        var eventFromIframe = document.createEvent("MouseEvents");
        // Processing to make it look like mouse move even if you are moving by touch
        eventFromIframe.initMouseEvent(
          "mousemove",
          true,
          false,
          window,
          e.detail,
          e.screenX,
          e.screenY,
          (clientX + frameLeft),
          (clientY + frameTop),
          e.ctrlKey,
          e.altKey,
          e.shiftKey,
          e.metaKey,
          e.button,
          null,
        );

        //smooth dragging during iframe mode
        me.parentCanvas.windowMouseMove(eventFromIframe);

        if (me.onMouseMoveOnIframe) {
          me.onMouseMoveOnIframe(eventFromIframe);
        }
      };
      me.iframe.contentWindow.document.onmousemove = funcOnMouseMove;
      me.iframe.contentWindow.document.ontouchmove = funcOnMouseMove;

      //mouse up
      var funcOnMouseUp = function (e) {
        var clientX = e.pageX;
        var clientY = e.pageY;

        if (TOUCH_ENABLED) {
          if (e.type === "touchend") {
            var changedTouches = e.changedTouches;
            clientX = changedTouches[0].pageX;
            clientY = changedTouches[0].pageY;
          }
        }
        var frameLeft = me.getLeft();
        var frameTop = me.getTop();
        var eventFromIframe = document.createEvent("MouseEvents");
        // Processing to make it look like mouse up even if you mouseup by touch
        eventFromIframe.initMouseEvent(
          "mouseup",
          true,
          false,
          window,
          e.detail,
          e.screenX,
          e.screenY,
          (clientX + frameLeft),
          (clientY + frameTop),
          e.ctrlKey,
          e.altKey,
          e.shiftKey,
          e.metaKey,
          e.button,
          null,
        );

        //smooth dragging during iframe mode
        me.parentCanvas.windowMouseUp(eventFromIframe);

        if (me.onMouseUpOnIframe) {
          me.onMouseUpOnIframe(eventFromIframe);
        }
      };
      me.iframe.contentWindow.document.onmouseup = funcOnMouseUp;
      me.iframe.contentWindow.document.ontouchend = funcOnMouseUp;

      resolve(me, me.iframe.contentWindow.document);
    };
  });
};

/**
 * Returns DOM-document of iframe
 * @returns {*|HTMLDocument}
 */
CIfFrame.prototype.getIfDocument = function () {
  var me = this;
  return me.iframe.contentWindow.document;
};

CIfFrame.prototype.setScrolling = function (str) {
  var me = this;
  me.iframe.scrolling = str;
};

CIfFrame.prototype.getScrolling = function (str) {
  var me = this;
  return me.iframe.scrolling;
};

CIfFrame.prototype.setResizable = function (enabled) {
  var me = this;
  me.resizable = enabled;
  me.enableMarkers(enabled);
  return me;
};

CIfFrame.prototype.setControl = function (model) {
  var me = this;

  if (model) {
    model.frame = me;
    me.control = me.jsFrame.createWindowEventHelper(model);
    me.control.setupDefaultEvents();
  }
};

/**
 * end of CIFrame class
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

inherit(CWindowManager, CCanvas);

/**
 * CWindowManager class
 * <p>
 * A canvas class that displays multiple frames. Handle events on the window to coordinate multiple windows<br>
 *
 * @param parentElement
 * @param canvasId
 * @param left
 * @param top
 * @param width
 * @param height
 * @constructor
 */
function CWindowManager(parentElement, canvasId, left, top, width, height) {
  CWindowManager.superConstructor.call(
    this,
    parentElement,
    canvasId,
    left,
    top,
    width,
    height,
  );
  var me = this;
  // document.body.addEventListener('click', function(evt) {
  document.addEventListener("click", function (evt) {
    for (var windowId in me.beanList) {
      var beanFrame = me.beanList[windowId];
      beanFrame.onBodyClicked(evt);
    }
  });
}

CWindowManager.prototype.getWindow = function (windowId) {
  var me = this;
  return me.beanList[windowId];
};

//Wrapping the 'addBean' of the parent class
CWindowManager.prototype.addWindow = function (window) {
  var me = this;

  var windowId = window.getWindowId();
  var name = window.getName();
  me.beanIdName[windowId] = name;
  me.beanNameId[name] = windowId;

  me.addBean(window);
};

//if contains window named specified name
CWindowManager.prototype.containsWindowName = function (name) {
  var me = this;

  var windowId = me.beanNameId[name];

  if (windowId) {
    return true;
  }
  return false;
};

CWindowManager.prototype.getWindowByName = function (name) {
  var me = this;
  var windowId = me.beanNameId[name];

  if (windowId) {
    return me.getWindow(windowId);
  } else {
    return null;
  }
};

//Wrapping the 'mouseMove' method of the parent class
CWindowManager.prototype.windowMouseMove = function (e) {
  var me = this;
  if (me.currentObject == null) {
    return null;
  }

  var childWindowMoved = false;

  //Loop processing of each CWindow held by CWindowManager
  var beanList = me.beanList;

  for (var windowId in beanList) {
    var targetWindow = beanList[windowId];

    //Since this 'mouseMove' is canvas of CWindow's 'mouseMove',so do move CBeanFrames in the canvas.
    var eventData = targetWindow.canvas.mouseMove(e);

    //Whether any one of the beans in the Canvas has moved or not.
    //Yes.(When it moves), eventData is set.
    //NO. If it does not move it is set to null.
    childWindowMoved = childWindowMoved | (eventData != null);
    if (eventData != null) {
      //If it is the marker for resizing
      if (eventData.targetTypeName == "cmarkerwindow") {
        var targetObject = eventData.targetObject;

        //Enable transparent window only when moving.
        //This will work smoothly even with iframe content
        targetWindow.transparence.style.pointerEvents = "auto";

        if (targetObject.usage == "RD") {
          targetWindow.resize(0, 0, eventData.deltaX, eventData.deltaY, true);
        } else if (targetObject.usage == "DD") {
          targetWindow.resize(0, 0, 0, eventData.deltaY, true);
        } else if (targetObject.usage == "RR") {
          targetWindow.resize(0, 0, eventData.deltaX, 0, true);
        }
      }
    }
  }

  //If any one of the beans in the Canvas has moved.Do not do 'Cwindow's mouseMove'
  if (!childWindowMoved && this.mouseDownSource != "childcanvas") {
    //Moving logic for CWindow which is holded by CWindowManager as a child window.
    me.mouseMove(e);
  }
};

//Wrapping the method 'mouseUp' of the parent class
CWindowManager.prototype.windowMouseUp = function (e) {
  var me = this;

  //run 'mouseUp' of parent class
  me.mouseUp(e);

  var beanList = me.beanList;

  for (var windowId in beanList) {
    var objWindow = beanList[windowId];

    //run CWindow's 'mouseUp'(it's child window).
    objWindow.mouseUp(e);
  }
};

/**
 * (override CCanvas.removeBean)
 * @param windowId
 */
CWindowManager.prototype.removeBean = function (windowId) {
  var me = this;

  //Retrieve the target beanFrame
  var beanList = me.beanList;
  var targetBean = beanList[windowId];

  if (targetBean == null) {
    return;
  }

  var removeTargetBeanHasFocus = targetBean._hasFocus;

  //Remove bean's htmlElement from canvasElement
  me.canvasElement.removeChild(targetBean.htmlElement);

  //Delete the bean object in the associative array.
  delete beanList[windowId];

  var beanName = me.beanIdName[windowId];
  if (beanName) {
    //-if bean name exist
    delete me.beanIdName[windowId];
    delete me.beanNameId[beanName];
  }

  //focus on last focused window after removing
  var maxFocusTime = 0;
  var lastFocusedFrame = null;

  if (removeTargetBeanHasFocus) {
    for (var windowId in beanList) {
      var frame = beanList[windowId];

      //pullUpDisabled=true means that the frame is modal background window
      if (maxFocusTime <= frame._hasFocusTime && !frame.pullUpDisabled) {
        maxFocusTime = frame._hasFocusTime;

        lastFocusedFrame = frame;
      }
    }
    if (lastFocusedFrame) {
      lastFocusedFrame.requestFocus();
    }
  }

  targetBean.parentCanvas = null;
};
/**
 * end of CWindowManager class
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

inherit(CMarkerWindow, CBeanFrame);

/**
 * CMarkerWindow class
 * @param windowId
 * @param left
 * @param top
 * @param width
 * @param height
 * @param zindex
 * @param usage
 * @constructor
 */
function CMarkerWindow(
  windowId,
  left,
  top,
  width,
  height,
  zindex,
  usage,
  color,
) {
  var me = this;

  CMarkerWindow.superConstructor.call(
    this,
    windowId,
    left,
    top,
    width,
    height,
    zindex,
    usage,
  );

  me.htmlElement.typeName = "cmarkerwindow";
  me.htmlElement.usage = usage;
  me.htmlElement.isRangeLimited = false;
  me.htmlElement.style.borderStyle = "none";
  me.htmlElement.style.zIndex = 1;
  if (color) {
    me.htmlElement.style.background = color;
  }
  //me.pullUpDisabled = true;

  me.getWindowType = function () {
    return "CMarkerWindow";
  };
}

/**
 * End of CMarkerWindow class
 * @constructor
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * FrameManager class
 * @constructor
 */
function JSFrame(model) {
  var me = this;

  var parentElement = null;

  // Frames will be fixed(Frames keep staying in the same place) even if the user scrolls the browser.
  me.isWindowManagerFixed = true; //default is true.

  //Initialization parameter check

  if (model && model.fixed == false) {
    me.isWindowManagerFixed = false;
  }

  if (model && model.parentElement) {
    parentElement = model.parentElement;
  }

  me.hAlign = "left";
  me.vAlign = "top";

  if (model && model.horizontalAlign) {
    me.hAlign = model.horizontalAlign;
  }

  if (model && model.verticalAlign) {
    me.vAlign = model.verticalAlign;
  }

  me.pullToRefresh = false;
  if (model && typeof model.pullToRefresh === "boolean") {
    me.pullToRefresh = model.pullToRefresh;
  }

  me.touchActionManipulation = true;
  if (model && typeof model.touchActionManipulation === "boolean") {
    me.touchActionManipulation = model.touchActionManipulation;
  }

  if (!parentElement) {
    if (me.isWindowManagerFixed) {
      var topParentDiv = document.createElement("div");
      topParentDiv.id = "jsFrame_fixed_" + me.generateUUID();
      topParentDiv.setAttribute(
        "style",
        "position:fixed;" + me.hAlign + ":0px;" + me.vAlign +
          ":0px;margin:0px;padding:0px;",
      );
      document.body.appendChild(topParentDiv);
      parentElement = topParentDiv;
    } else {
      var topParentDiv = document.createElement("div");
      topParentDiv.id = "jsFrame_absolute_" + me.generateUUID();
      topParentDiv.setAttribute(
        "style",
        "position:absolute;" + me.hAlign + ":0px;" + me.vAlign +
          ":0px;margin:0px;padding:0px;",
      );
      document.body.appendChild(topParentDiv);
      parentElement = topParentDiv;
    }
  } else {
    if (me.isWindowManagerFixed) {
      //parentElement set
      var topParentDiv = document.createElement("div");
      topParentDiv.id = "jsFrame_fixed_" + me.generateUUID();
      topParentDiv.setAttribute(
        "style",
        "position:fixed;" + me.hAlign + ":0px;" + me.vAlign +
          ":0px;margin:0px;padding:0px;",
      );
      parentElement.appendChild(topParentDiv);
    } else {
      var topParentDiv = document.createElement("div");
      topParentDiv.id = "jsFrame_absolute_" + me.generateUUID();
      topParentDiv.setAttribute(
        "style",
        "position:absolute;" + me.hAlign + ":0px;" + me.vAlign +
          ":0px;margin:0px;padding:0px;",
      );
      parentElement.appendChild(topParentDiv);
    }
  }

  if (MOUSE_ENABLED) {
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mousemove", mouseMove);
  }

  if (TOUCH_ENABLED) {
    if ("ontouchend" in window) {
      var funcOnTouchEnd = function (evt) {
        // The "mouseup" event happens right after "touchend" event,
        // but I don't call #preventdefault because #preventdefault prevents "onclick".
        // So, perform #preventdefault only for "touchmove"
        // evt.preventDefault();
        mouseUp.bind(this)(evt);
      };
      document.addEventListener("touchend", funcOnTouchEnd);
    }

    if ("ontouchmove" in window) {
      // To remove the 300ms tap delay between touchend and click,
      // To disable double-tap to zoom
      if (me.touchActionManipulation) {
        me.doEnableTouchActionManipulation();
      }

      if (!me.pullToRefresh) {
        // The Android version of Chrome has a feature that refreshes the page by sliding downward
        // while touching on the screen, but when this feature is enabled, the downward movement of the window is inhibited,
        // so this feature can be explicitly turned off.
        me.doDisablePullToRefresh();
      }

      var funcOnTouchMove = function (evt) {
        // Call #preventDefault to prevent simultaneous ignition of mousemove
        evt.preventDefault();
        mouseMove.bind(this)(evt);
      };
      document.addEventListener("touchmove", funcOnTouchMove);
    }
  }

  me.windowManager = new CWindowManager(
    parentElement,
    "windowManager_" + me.generateUUID(),
    0,
    0,
    0,
    0,
  );
  //me.windowManager = new CWindowManager(document.body, 'windowManager_' + me.generateUUID(), 0, 0, 0, 0);
  me.domPartsBuilder = null;

  function mouseUp(e) {
    me.windowManager.windowMouseUp(e);
  }

  function mouseMove(e) {
    me.windowManager.windowMouseMove(e);
  }
}

JSFrame.prototype.doEnableTouchActionManipulation = function () {
  var bodyStyle = document.documentElement.getAttribute("style");
  if (!bodyStyle) {
    bodyStyle = "";
  } else {
    if (!bodyStyle.endsWith(";")) {
      bodyStyle += ";";
    }
  }
  if (bodyStyle.indexOf("touch-action") === -1) {
    bodyStyle += "-ms-touch-action: manipulation;touch-action: manipulation;";
    document.documentElement.setAttribute("style", bodyStyle);
  }
};

JSFrame.prototype.doDisablePullToRefresh = function () {
  var bodyStyle = document.body.getAttribute("style");
  if (!bodyStyle) {
    bodyStyle = "";
  } else {
    if (!bodyStyle.endsWith(";")) {
      bodyStyle += ";";
    }
  }
  if (bodyStyle.indexOf("overscroll-behavior-y") === -1) {
    bodyStyle += "overscroll-behavior-y: contain;";
    document.body.setAttribute("style", bodyStyle);
  }
};
JSFrame.prototype.getDomPartsBuilder = function () {
  var me = this;

  if (!me.domPartsBuilder) {
    me.domPartsBuilder = new CDomPartsBuilder();
  }
  return me.domPartsBuilder;
};

JSFrame.prototype.create = function (model) {
  var me = this;

  var properties = {};
  properties.name = model.name;
  var title = model.title;
  var left = model.left;
  var top = model.top;
  var width = model.width;
  var height = model.height;
  var appearance = model.appearance;
  var presetWindowName = model.preset;
  var presetWindowParam = model.presetParam;
  var appearanceName = model.appearanceName;
  var appearanceParam = model.appearanceParam;
  var style = model.style;

  var minWidth = model.minWidth;
  var minHeight = model.minHeight;

  var html = model.html;
  var resizable = model.resizable;
  var movable = model.movable;
  var url = model.url;
  var urlLoaded = model.urlLoaded;

  var presetParam = model.presetParam;
  var presetWindow;

  if (presetWindowName) {
    var presetWindowObj = this.getPresetWindow(presetWindowName);
    presetWindow = presetWindowObj.getPresetWindow(presetParam);
    appearance = this.createPresetStyle(
      presetWindow.appearanceName,
      { appearanceParam: presetWindow.appearanceParam },
    );
  } else if (appearanceName) {
    appearance = this.createPresetStyle(
      appearanceName,
      { appearanceParam: appearanceParam },
    );
  }

  if (model.clientHeight) {
    var windowTitleBarHeight = parseInt(appearance.titleBarHeight || 0) -
      appearance.frameHeightAdjust;
    height = model.clientHeight + windowTitleBarHeight;
  }

  var frame = this.createFrame(
    left,
    top,
    width,
    height,
    appearance,
    properties,
  );

  if (title) {
    frame.setTitle(title);
  }

  if (html) {
    frame.setHTML(html);
  }
  if (url) {
    var urlPromise = frame.setUrl(url);
    if (urlLoaded) {
      urlPromise.then(urlLoaded);
    }
  }
  if (resizable == false) {
    frame.setResizable(false);
  }
  if (movable == false) {
    frame.setMovable(false);
  }

  if (minWidth && minHeight) {
    frame.minFrameWidth = minWidth;
  }
  if (minHeight) {
    frame.minWindowHeight = minHeight;

    if (model.clientHeight) {
      frame.minWindowHeight = minHeight + windowTitleBarHeight;
    }
  }

  if (style) {
    var frameView = frame.getFrameView();

    for (var name in style) {
      if (style.hasOwnProperty(name)) {
        frameView.style[name] = style[name];
      }
    }
  }

  if (presetWindow) {
    presetWindow.setupPresetWindow(frame);
  }

  return frame;
};

/**
 * Create a new window
 *
 * @returns {CIfFrame}
 */
JSFrame.prototype.createFrame = function (
  left,
  top,
  width,
  height,
  appearance,
  properties,
) {
  var me = this;

  if (!appearance) {
    appearance = me.createFrameAppearance();
  }

  appearance.initialize();

  var windowId = "window_" + me.generateUUID();

  if (!left) {
    left = 0;
  }
  if (!top) {
    top = 0;
  }
  if (!width) {
    width = 128;
  }
  if (!height) {
    height = 128;
  }

  var frame = new CIfFrame(windowId, left, top, width, height, appearance);

  //experimental
  frame.jsFrame = me;

  if (properties && properties.name) {
    frame.setName(properties.name);
  }
  frame.hide();

  me.windowManager.addWindow(frame);

  // getTitleBarStyle is deprecated
  if (appearance.getTitleBarStyle) {
    var titleBarStyle = appearance.getTitleBarStyle();
    if (titleBarStyle) {
      frame.setTitleBarClassName(
        titleBarStyle.titleBarClassNameDefault,
        titleBarStyle.titleBarClassNameFocused,
      );
    }
  } else if (
    appearance.titleBarClassNameDefault && appearance.titleBarClassNameFocused
  ) {
    frame.setTitleBarClassName(
      appearance.titleBarClassNameDefault,
      appearance.titleBarClassNameFocused,
    );
  } else if (appearance.titleBarClassNameDefault) {
    frame.setTitleBarClassName(
      appearance.titleBarClassNameDefault,
      appearance.titleBarClassNameDefault,
    );
  }

  return frame;
};

JSFrame.prototype.containsWindowName = function (windowName) {
  var me = this;
  return me.windowManager.containsWindowName(windowName);
};

JSFrame.prototype.getWindowByName = function (windowName) {
  var me = this;
  return me.windowManager.getWindowByName(windowName);
};

JSFrame.prototype.generateUUID = function () {
  var unixTime = Date.now();

  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (unixTime + Math.random() * 16) % 16 | 0;
      unixTime = Math.floor(unixTime / 16);
      return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
    },
  );
  return uuid;
};

JSFrame.prototype.createFrameAppearance = function () {
  return new CFrameAppearance();
};

JSFrame.prototype.createAnimator = function () {
  return new CSimpleLayoutAnimator();
};

/**
 * Helper class for maximizing and minimizing windows(frames) and handling animations accordingly
 */
JSFrame.prototype.createWindowEventHelper = function (model) {
  var me = this;

  if (!model) {
    model = {};
  }

  model.verticalAlign = me.vAlign;
  model.horizontalAlign = me.hAlign;

  var wndEventHelper = new WindowEventHelper(model);
  return wndEventHelper;
};

JSFrame.prototype.getPresetWindow = function (presetName, param) {
  if (presetWindows[presetName]) {
    var presetObj = presetWindows[presetName];
    return presetObj;
  } else {
    return null;
  }
};
JSFrame.prototype.createPresetStyle = function (presetName, param) {
  var me = this;
  var apr = me.createFrameAppearance();
  if (param && param.focusedFrameOnly) {
    apr.focusedFrameOnly = param.focusedFrameOnly;
  }

  if (presetStyles[presetName]) {
    var styleObj = presetStyles[presetName];
    var appearanceParam = null;

    if (param && param.appearanceParam) {
      appearanceParam = param.appearanceParam;
    }

    return styleObj.getStyle(apr, appearanceParam);
  }

  console.error('[JSFrame] Preset appearance "' + presetName + '" not found.');
  return apr;
};

JSFrame.prototype.showToast = function (model) {
  if (!model) {
    return;
  }

  var me = this;
  var toastHeight = 60;
  var toastWidth = 260;
  var openCloseDurationMs = 300;
  var stayDurationMs = 1000;
  var startY = window.innerHeight - 10 - toastHeight / 2;
  var endY = window.innerHeight - 20 - toastHeight / 2;
  var myHtml = "";
  var showButton = false;
  var style = {
    borderRadius: "10px",
    background: "rgba(0,0,0,0.8)",
  };

  if (model.style) {
    style = model.style;
  }
  if (model.height) {
    toastHeight = model.height;
  }
  if (model.width) {
    toastWidth = model.width;
  }
  if (model.duration) {
    stayDurationMs = model.duration;
  }
  if (model.align) {
    if (model.align == "top") {
      startY = 10 + toastHeight / 2;
      endY = 20 + toastHeight / 2;
    } else if (model.align == "center") {
      startY = window.innerHeight / 2;
      endY = window.innerHeight / 2;
    } else {
      //bottom
    }
  }
  if (model.html) {
    myHtml = model.html;
  }
  if (model.text) {
    myHtml = model.text;
  }
  if (model.closeButton == true) {
    showButton = true;
  } else {
    showButton = false;
  }

  var apr = me.createPresetStyle("toast");

  if (style.borderRadius) {
    apr.frameBorderRadius = style.borderRadius;
  }

  if (model.closeButtonColor) {
    apr.captionClor = model.closeButtonColor;
  }

  var frame = me.create({
    name: "toast_" + me.generateUUID(),
    width: toastWidth,
    height: toastHeight,
    movable: false,
    resizable: false,
    appearance: apr,
    style: style,
    html:
      '<div id="my_element" style="box-sizing:border-box;display: flex;justify-content: center;align-items: center;padding:10px;font-size:16px;color:darkgray;height:' +
      (toastHeight) + 'px">' +
      myHtml +
      "</div>",
  });

  if (showButton) {
  } else {
    frame.hideFrameComponent("closeButton");
  }

  var requestFocusAfterAnimation = false;

  var startX = window.innerWidth / 2;

  if (me.hAlign == "right") {
    startX = -startX; // -500;
  }

  if (me.vAlign == "bottom") {
    startY = startY - window.innerHeight;
    endY = endY - window.innerHeight;
  }

  var animator = me.createAnimator();
  animator.set(frame)
    .setDuration(openCloseDurationMs)
    .fromPosition(startX, startY, "CENTER_CENTER")
    .toPosition(startX, endY, "CENTER_CENTER")
    .toAlpha(1.0)
    .fromAlpha(0.0)
    .start(0, requestFocusAfterAnimation)
    .then(function (animatorObj) {
      return animatorObj
        .setDuration(openCloseDurationMs)
        .fromPosition(startX, endY, "CENTER_CENTER")
        .toPosition(startX, startY, "CENTER_CENTER")
        .fromAlpha(1.0)
        .toAlpha(0.5)
        .start(stayDurationMs, requestFocusAfterAnimation);
    })
    .then(function (animatorObj) {
      var _frame = animatorObj.get();
      _frame.closeFrame();
    });
};

/**
 * end of FrameManager class
 */

Object.freeze(DEF);

module.exports = JSFrame;


/***/ }),

/***/ "./src/appearance/CButtonAppearance.js":
/*!*********************************************!*\
  !*** ./src/appearance/CButtonAppearance.js ***!
  \*********************************************/
/***/ ((module) => {

function CTextButtonAppearance() {
  var crossMark0 = "\u274c";

  this.size = 14;
  this.width = null;
  this.height = null;

  //border
  this.borderRadius = 2;
  this.borderWidth = 0;
  this.borderColorDefault = "#aaaaaa";
  this.borderColorFocused = this.borderColorDefault;
  this.borderColorHovered = null;
  this.borderColorPressed = this.borderColorDefault;

  this.borderStyleDefault = "solid";
  this.borderStyleFocused = this.borderStyleDefault;
  this.borderStyleHovered = null;
  this.borderStylePressed = this.borderStyleDefault;

  this.backgroundBoxShadow = null;

  //background
  this.backgroundColorDefault = "transparent";
  this.backgroundColorFocused = this.backgroundColorDefault;
  this.backgroundColorHovered = null;
  this.backgroundColorPressed = this.backgroundColorDefault;

  //caption
  this.caption = null;
  this.captionColorDefault = "white";
  this.captionColorFocused = this.captionColorDefault;
  this.captionColorHovered = null;
  this.captionColorPressed = this.captionColorDefault;
  this.captionShiftYpx = 0;
  this.captionFontRatio = 1.0;
}
module.exports = CTextButtonAppearance;


/***/ }),

/***/ "./src/appearance/CChildMenuAppearance.js":
/*!************************************************!*\
  !*** ./src/appearance/CChildMenuAppearance.js ***!
  \************************************************/
/***/ ((module) => {

function CChildMenuAppearance(model) {
  this.childMenuHTML = "";
  this.childMenuWidth = 0;
  this.childMenuAlign = "LEFT"; // off set position from parent frameComponent "LEFT" "RIGHT" "CENTER"
  this.yOffset = 0;
  this.xOffset = 0;
}

module.exports = CChildMenuAppearance;


/***/ }),

/***/ "./src/appearance/CDomPartsBuilder.js":
/*!********************************************!*\
  !*** ./src/appearance/CDomPartsBuilder.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mergeDeeply = __webpack_require__(/*! merge-deeply */ "../../node_modules/merge-deeply/lib/merge-deeply.js");
var CTextButtonAppearance = __webpack_require__(/*! ./CButtonAppearance.js */ "./src/appearance/CButtonAppearance.js");
var CImageButtonAppearance = __webpack_require__(/*! ./CImageButtonAppearance.js */ "./src/appearance/CImageButtonAppearance.js");
var CChildMenuAppearance = __webpack_require__(/*! ./CChildMenuAppearance.js */ "./src/appearance/CChildMenuAppearance.js");

/**
 * CDomPartsBuilder class
 * Easy to build a beautiful or typical dom parts(htmlElement)
 * @constructor
 */
function CDomPartsBuilder() {
}

CDomPartsBuilder.prototype.buildChildMenuAppearance = function (
  frameAppearance,
) {
  return new CChildMenuAppearance(frameAppearance);
};
CDomPartsBuilder.prototype.buildTextButtonAppearance = function (src) {
  if (src) {
    var result = mergeDeeply({ op: "clone", object1: src, concatArray: true });
    return result;
  } else {
    return new CTextButtonAppearance();
  }
};
CDomPartsBuilder.prototype.buildImageButtonAppearance = function (src) {
  if (src) {
    var clonedImageButtonAppearance = mergeDeeply(
      { op: "clone", object1: src },
    );
    return clonedImageButtonAppearance;
  } else {
    return new CImageButtonAppearance();
  }
};

CDomPartsBuilder.prototype.buildButton = function (btnAppearance) {
  var me = this;
  return me.buildTextButton(btnAppearance);
};

CDomPartsBuilder.prototype.appendChildMenuTo = function (
  childMenuAppearance,
  parentEle,
) {
  var me = this;
  var ndiv = document.createElement("div");
  ndiv.classList.add("jsframe-child-menu");
  ndiv.innerHTML = childMenuAppearance.childMenuHTML;
  ndiv.style.position = "absolute";
  ndiv.style.pointerEvents = "none";
  ndiv.style.width = childMenuAppearance.childMenuWidth + "px";
  // ndiv.style.top = childMenuAppearance.childMenuTop + 'px';
  // ndiv.style.left = childMenuAppearance.childMenuLeft + 'px';
  ndiv.style.display = "none";

  var posX = childMenuAppearance.xOffset;
  var posY = parseInt(parentEle.style.height, 10) +
    childMenuAppearance.yOffset + 2;

  if (childMenuAppearance.childMenuAlign === "LEFT") {
    ndiv.style.left = posX + "px";
  } else if (childMenuAppearance.childMenuAlign === "RIGHT") {
    ndiv.style.right = posX + "px";
  } else if (childMenuAppearance.childMenuAlign === "CENTER") {
    posX = -childMenuAppearance.childMenuWidth / 2 +
      parseInt(parentEle.style.height, 10) / 2;
    ndiv.style.left = posX + "px";
  }
  ndiv.style.top = posY + "px";

  // ndiv.style.pointerEvents is none to avoid referring clicks to extra areas.
  // But we want its children to be responsive, so we set pointerEvents to auto
  ndiv.firstChild.style.pointerEvents = "auto";

  parentEle.appendChild(ndiv);
  //return ndiv;
};

/**
 * Creates an actual DOM element from the specified appearance
 * @param btnAppearance
 * @returns {HTMLDivElement}
 */
CDomPartsBuilder.prototype.buildTextButton = function (btnAppearance) {
  var size = btnAppearance.size;
  var width = size;
  var height = size;

  if (btnAppearance.width != null) {
    width = btnAppearance.width;
  }

  if (btnAppearance.height != null) {
    height = btnAppearance.height;
  }

  var divElement = document.createElement("div");

  //border
  var borderWidth = btnAppearance.borderWidth;
  var borderRadius = btnAppearance.borderRadius;

  var borderColorDefault = btnAppearance.borderColorDefault;
  var borderColorFocused = btnAppearance.borderColorFocused;
  var borderColorHovered = btnAppearance.borderColorHovered;
  var borderColorPressed = btnAppearance.borderColorPressed;

  var borderStyleDefault = btnAppearance.borderStyleDefault;
  var borderStyleFocused = btnAppearance.borderStyleFocused;
  var borderStyleHovered = btnAppearance.borderStyleHovered;
  var borderStylePressed = btnAppearance.borderStylePressed;

  //background
  var backgroundColorDefault = btnAppearance.backgroundColorDefault;
  var backgroundColorFocused = btnAppearance.backgroundColorFocused;
  var backgroundColorHovered = btnAppearance.backgroundColorHovered;
  var backgroundColorPressed = btnAppearance.backgroundColorPressed;

  var backgroundBoxShadow = btnAppearance.backgroundBoxShadow;

  var fa = btnAppearance.fa;

  //caption
  var caption = btnAppearance.caption;
  var btnImageDefault = btnAppearance.imageDefault;
  var btnImageFocused = btnAppearance.imageFocused;
  var btnImageHovered = btnAppearance.imageHovered;
  var btnImagePressed = btnAppearance.imagePressed;

  //prevent to catch mouse events
  if (btnImageDefault) {
    btnImageDefault.style.pointerEvents = "none";
  }
  if (btnImageFocused) {
    btnImageFocused.style.pointerEvents = "none";
  }
  if (btnImageHovered) {
    btnImageHovered.style.pointerEvents = "none";
  }
  if (btnImagePressed) {
    btnImagePressed.style.pointerEvents = "none";
  }

  var _captionColorDefault = btnAppearance.captionColorDefault;
  var captionColorFocused = btnAppearance.captionColorFocused;
  var captionColorHovered = btnAppearance.captionColorHovered;
  var captionColorPressed = btnAppearance.captionColorPressed;

  var captionShiftYpx = btnAppearance.captionShiftYpx;
  var captionFontRatio = btnAppearance.captionFontRatio;

  //Set whether parent frame has focus or not internally
  divElement._hasFrameFocus = false;

  //Set whether mouse is pressing or not internally.
  divElement._isMouseDown = false;

  divElement.style.position = "absolute";

  divElement.style.top = "0px";
  divElement.style.left = "0px";
  divElement.style.width = (width) + "px";
  divElement.style.height = (height) + "px";

  if (btnAppearance.cursor) {
    divElement.style.cursor = btnAppearance.cursor;
  } else {
    divElement.style.cursor = "pointer";
  }
  divElement.style.margin = "0px";
  divElement.style.padding = "0px";
  //added for preventing bootstrap.css pollution
  divElement.style.boxSizing = "content-box";
  divElement.style.fontFamily = "sans-serif";

  divElement.onmousedown = function (e) {
    divElement._isMouseDown = true;
    divElement._handleFocusDrawing("onmousedown");
  };

  divElement.onmouseout = function (e) {
    divElement._isMouseDown = false;
    divElement._handleFocusDrawing("onmouseout");
  };

  divElement.onmouseover = function (e) {
    divElement._handleHoverDrawing();
  };

  divElement.onmouseup = function (e) {
    divElement._isMouseDown = false;
    divElement._handleFocusDrawing("onmouseup");
  };

  /**
   * The parent notifies that the parent's frame got focus
   */
  divElement._onTakeFocus = function () {
    divElement._hasFrameFocus = true;
    divElement._handleFocusDrawing("_onTakeFocus");
  };

  /**
   * The parent notifies that the parent's frame has lost focus
   */
  divElement._onReleaseFocus = function () {
    divElement._hasFrameFocus = false;
    divElement._handleFocusDrawing("_onReleaseFocus");
  };

  /**
   *  To handle 2x2 matrix.
   *  (_hasFrameFocus true/false x _isMouseDown true/false)
   */
  divElement._handleFocusDrawing = function (evtName) {
    if (divElement._hasFrameFocus) {
      //When this element has focus

      if (divElement._isMouseDown) {
        //border
        divElement.style.borderColor = borderColorPressed;
        divElement.style.borderStyle = borderStylePressed;

        //background
        divElement.style.backgroundColor = backgroundColorPressed;

        //caption
        divElement.style.color = captionColorPressed;

        if (btnImagePressed) {
          // divElement.innerHTML = '';
          // divElement.appendChild(btnImagePressed);
          updateImage(btnImagePressed, divElement);
        }
      } else {
        //border
        divElement.style.borderColor = borderColorFocused;
        divElement.style.borderStyle = borderStyleFocused;

        //background
        divElement.style.backgroundColor = backgroundColorFocused;

        //caption
        divElement.style.color = captionColorFocused;

        if (btnImageFocused) {
          // divElement.innerHTML = '';
          // divElement.appendChild(btnImageFocused);
          updateImage(btnImageFocused, divElement);
        }
      }
    } else {
      //When this element doesn't have focus
      if (divElement._isMouseDown) {
        //border
        divElement.style.borderColor = borderColorPressed;
        divElement.style.borderStyle = borderStylePressed;

        //background
        divElement.style.backgroundColor = backgroundColorPressed;

        //caption
        divElement.style.color = captionColorPressed;

        if (btnImagePressed) {
          // divElement.innerHTML = '';
          // divElement.appendChild(btnImagePressed);
          updateImage(btnImagePressed, divElement);
        }
      } else {
        //border
        divElement.style.borderColor = borderColorDefault;
        divElement.style.borderStyle = borderStyleDefault;

        //background
        divElement.style.backgroundColor = backgroundColorDefault;

        //caption
        divElement.style.color = _captionColorDefault;

        if (btnImageDefault) {
          // divElement.innerHTML = '';
          // divElement.appendChild(btnImageDefault);
          updateImage(btnImageDefault, divElement);
        }
      }
    }
  };

  divElement._handleHoverDrawing = function () {
    if (divElement._hasFrameFocus) {
      //When this element has focus
    } else {
      //When this element doesn't have focus
    }
    //border
    if (borderColorHovered) {
      divElement.style.borderColor = borderColorHovered;
    }
    if (borderStyleHovered) {
      divElement.style.borderStyle = borderStyleHovered;
    }

    //background
    if (backgroundColorHovered) {
      divElement.style.backgroundColor = backgroundColorHovered;
    }

    if (captionColorHovered) {
      //caption
      divElement.style.color = captionColorHovered;
    }
    if (btnImageHovered) {
      // divElement.innerHTML = '';
      // divElement.appendChild(btnImageHovered);
      updateImage(btnImageHovered, divElement);
    }
  };
  divElement.style.padding = "0px";

  divElement.style.textAlign = "center";
  divElement.style.fontSize = (height * captionFontRatio) + "px";

  divElement.style.lineHeight = (height) + "px";

  divElement.style.borderWidth = "1px";

  if (borderWidth != null) {
    divElement.style.borderWidth = borderWidth + "px";
  }

  if (backgroundBoxShadow != null) {
    divElement.style.boxShadow = backgroundBoxShadow;
  }

  divElement.style.borderRadius =
    (borderRadius + parseInt(divElement.style.borderWidth)) + "px";

  var childMode = true;

  if (childMode && btnImageDefault) {
    // divElement.innerHTML = '';
    // divElement.appendChild(btnImageDefault);
    updateImage(btnImageDefault, divElement);
  } else if (childMode && caption) {
    var span = document.createElement("span");
    //span.style.position='absolute';
    span.style.width = "100%";
    span.style.marginTop = captionShiftYpx + "px";
    span.style.display = "inline-block";
    span.style.textAlign = "center";
    span.style.fontFamily = "sans-serif";
    span.appendChild(document.createTextNode(caption));
    divElement.appendChild(span);
  } else if (childMode && fa) {
    var span = document.createElement("span");
    span.style.pointerEvents = "none";
    span.style.width = "100%";
    span.style.marginTop = captionShiftYpx + "px";
    span.style.display = "inline-block";
    span.style.textAlign = "center";
    span.style.fontFamily = "sans-serif";
    span.innerHTML = '<i class="' + fa + '"></i>';
    divElement.appendChild(span);
  } else if (!childMode && caption) {
    divElement.style.paddingTop = captionShiftYpx + "px";
    divElement.appendChild(document.createTextNode(caption));
  }

  divElement._handleFocusDrawing();
  return divElement;
};

// Don't use innerHTML='' because there may be a child below this 'img' element.
// A child that may be a child is a childMenu.
function updateImage(image, parentElement) {
  var imgs = parentElement.querySelectorAll("img");
  if (parentElement.firstChild) {
    parentElement.insertBefore(image, parentElement.firstChild);
  } else {
    parentElement.appendChild(image);
  }
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (image !== img) {
      parentElement.removeChild(img);
    }
  }
}

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 * end of CDomPartsBuilder class
 */
module.exports = CDomPartsBuilder;


/***/ }),

/***/ "./src/appearance/CFrameAppearance.js":
/*!********************************************!*\
  !*** ./src/appearance/CFrameAppearance.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var CDomPartsBuilder = __webpack_require__(/*! ./CDomPartsBuilder.js */ "./src/appearance/CDomPartsBuilder.js");
var CFrameComponent = __webpack_require__(/*! ./CFrameComponent.js */ "./src/appearance/CFrameComponent.js");

/**
 * CFrameAppearance class<br>
 * Appearance Model Class for Frame
 *
 */
function CFrameAppearance() {
  var me = this;

  this.showTitleBar = true;
  this.showCloseButton = true;
  this.titleBarCaption = "";
  this.titleBarCaptionFontSize = "12px";
  this.titleBarCaptionFontWeight = "bold";
  this.titleBarHeight = "24px";
  this.useIframe = false;
  this.useFrame = true;

  this.titleBarClassNameDefault = null;
  this.titleBarClassNameFocused = null;

  this.setUseIFrame = function (value) {
    me.useIframe = value;
    me.useFrame = !value;
    return me;
  };

  /**
   * The position from the left side of the caption. If this value is null, caption will be centered.
   */
  this.titleBarCaptionLeftMargin = "5px";

  this.titleBarColorDefault = null;
  this.titleBarColorFocused = null;
  this.titleBarCaptionColorDefault = "";
  this.titleBarCaptionColorFocused = "";
  this.titleBarCaptionTextShadow = "0 1px 0 rgba(255,255,255,.7)";
  this.titleBarCaptionTextAlign = "center";

  this.titleBarBorderBottomDefault = "1px solid rgba(0,0,0,0.2)";
  this.titleBarBorderBottomFocused = null;

  this.frameBorderRadius = "6px";

  this.frameBorderWidthDefault = "1px";
  this.frameBorderWidthFocused = this.frameBorderWidthDefault;

  this.frameBorderColorDefault = "rgba(1, 1, 1, 0.2)";
  this.frameBorderColorFocused = this.frameBorderColorDefault;

  this.frameBorderStyle = "solid";
  this.frameBoxShadow = "2px 3px 16px rgba(0,0,0,.6)";
  this.frameBackgroundColor = "transparent";

  this._partsBuilder = null;

  this.frameComponents = [];

  this.frameHeightAdjust = 1;

  this.resizeAreaWidth = 20;
  this.resizeAreaHeight = 20;
  this.resizeAreaOffset = 0;
  this.resizeAreaVisible = false;

  this.getFrameInnerBorderRadius = function (ref, hasFocus) {
    if (!ref) {
      return null;
    }
    if (hasFocus) {
      return {
        frameAppearance: me,
        innerBorderRadius: (parseInt(ref.frameBorderRadius, 10) -
          parseInt(ref.frameBorderWidthFocused, 10)) + "px",
      };
    }
    return {
      frameAppearance: me,
      innerBorderRadius: (parseInt(ref.frameBorderRadius, 10) -
        parseInt(ref.frameBorderWidthDefault, 10)) + "px",
    };
  };

  this.onInitialize = function () {
    //Add close button if needed
    if (me.showCloseButton) {
      var partsBuilder = me.getPartsBuilder(),
        crossMark0 = "\u274c",
        crossMark1 = "\u2716",
        crossMark2 = "\u274e";

      var btnAppearance = partsBuilder.buildTextButtonAppearance();

      btnAppearance.size = 14;
      btnAppearance.captionShiftYpx = 0;
      btnAppearance.captionFontRatio = 1.0;
      btnAppearance.borderRadius = 2;
      btnAppearance.backgroundColorPressed = "transparent";
      btnAppearance.backgroundColorDefault = "transparent";
      btnAppearance.caption = crossMark1;

      btnAppearance.captionColorDefault = "gray";
      btnAppearance.captionColorFocused = "gray";
      btnAppearance.captionColorHovered = "silver";
      btnAppearance.captionColorPressed = "black";

      btnAppearance.borderWidth = 0;
      btnAppearance.borderColorDefault = "#aaaaaa";
      btnAppearance.borderStyle = "solid";

      var closeBtnEle = partsBuilder.buildTextButton(btnAppearance);
      var eleLeft = -10;
      var eleTop = -18;
      var eleAlign = "RIGHT_TOP";

      //closeButton is a special name
      var frameComponent = me.addFrameComponent(
        "closeButton",
        closeBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );
    }
  };

  this.onTitleBarStyleInitialize = function () {
  };
}

CFrameAppearance.prototype.getPartsBuilder = function () {
  var me = this;
  if (me._partsBuilder === null) {
    me._partsBuilder = new CDomPartsBuilder();
  }
  return me._partsBuilder;
};
CFrameAppearance.prototype.initialize = function () {
  var me = this;
  me.onInitialize();
};

/**
 *  Add FrameComponent into frame
 *  FrameComponent is attached to Frame and it moves with Frame.
 *
 * @param id
 * @param myDomElement DOM element.
 * @param x  Relative x coodinate from the snap position specified by alignment
 * @param y  Relative y coodinate from the snap position specified by alignment
 * @param align 'LEFT_TOP' 'CENTER_TOP' 'RIGHT_TOP' 'LEFT_CENTER' 'CENTER_CENTER' 'RIGHT_CENTER' 'LEFT_BOTTOM' 'CENTER_BOTTOM' 'RIGHT_BOTTOM'
 * @returns {CFrameComponent}
 *
 */
CFrameAppearance.prototype.addFrameComponent = function (
  id,
  myDomElement,
  x,
  y,
  align,
  extra,
) {
  //(id, frame, htmlElement, x, y, align)
  var frameComponent = new CFrameComponent(
    id,
    myDomElement,
    x,
    y,
    align,
    extra,
  );

  if (myDomElement._onTakeFocus && myDomElement._onReleaseFocus) {
    //if this DOM element has special method for focus
    //set focus callback
    frameComponent.setFocusCallback(
      myDomElement._onTakeFocus,
      myDomElement._onReleaseFocus,
    );
  }

  this.frameComponents.push(frameComponent);

  return frameComponent;
};

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

/**
 *  End of CFrameAppearance class
 */
module.exports = CFrameAppearance;


/***/ }),

/***/ "./src/appearance/CFrameComponent.js":
/*!*******************************************!*\
  !*** ./src/appearance/CFrameComponent.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * CFrameComponent class
 * <p>
 * Wrapped DOM element like 'div' to display above the frame<br>
 *
 * ex.An object such as closeButton
 *
 * @param id
 * @param frame
 * @param htmlElement DOM-element
 * @param x relative x-position in the frame respect to align
 * @param y relative y-position in the frame respect to align
 * @param align relative alignment in the frame
 * @constructor
 */
function CFrameComponent(id, htmlElement, x, y, align, extra) {
  var me = this;

  me.id = id;
  me.x = x;
  me.y = y;
  me.frame = null;

  me._focusTakingCallabck = null;
  me._focusReleasingCallabck = null;

  if (align) {
    me.frameComponentAlign = align;
  } else {
    me.frameComponentAlign = CALIGN.LEFT_TOP;
  }
  me.htmlElement = htmlElement;
  me.htmlElement.style.zIndex = 50;
  me.htmlElement.setAttribute("component-id", id);

  if (extra && extra.childMenu) {
    me.childMenu = extra.childMenu;
  } else if (htmlElement.querySelector(".jsframe-child-menu")) {
    me.childMenu = htmlElement.querySelector(".jsframe-child-menu");
  }
}

CFrameComponent.prototype.setFocusCallback = function (
  focusTakingCallback,
  focusReleasingCallback,
) {
  var me = this;
  me._focusTakingCallabck = focusTakingCallback;
  me._focusReleasingCallabck = focusReleasingCallback;
};

/**
 * Set parent frame of this frameComponent
 * @param frame
 */
CFrameComponent.prototype.setFrame = function (frame) {
  var me = this;

  me.frame = frame;
  me.htmlElement.parentObject = frame;
  me.updateAlign();
};

/**
 * Place the FrameComponent relative to the parent's frame.
 * Relocate relative to parent frame when window resize event occurs
 */
CFrameComponent.prototype.updateAlign = function () {
  var me = this;

  var frameComponentAlign = me.frameComponentAlign;

  var frame = me.frame;
  var eleStyle = me.htmlElement.style;
  eleStyle.userSelect = "none";

  var x = me.x;
  var y = me.y;

  var frameWidth = frame.getWidth();
  var frameHeight = frame.getHeight();
  var eleStyleWidth = eleStyle.width;
  var eleStyleHeight = eleStyle.height;

  if (CALIGN.LEFT_TOP == frameComponentAlign) {
    eleStyle.left = x + "px";
    eleStyle.top = y + "px";
  } else if (CALIGN.HCENTER_TOP == frameComponentAlign) {
    eleStyle.left =
      (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) + "px";
    eleStyle.top = y + "px";
  } else if (CALIGN.RIGHT_TOP == frameComponentAlign) {
    eleStyle.left = (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
    eleStyle.top = y + "px";
  } else if (CALIGN.LEFT_VCENTER == frameComponentAlign) {
    eleStyle.left = x + "px";
    eleStyle.top =
      (parseInt(frameHeight) / 2 - parseInt(eleStyleHeight) / 2 + y) + "px";
  } else if (CALIGN.HCENTER_VCENTER == frameComponentAlign) {
    eleStyle.left =
      (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) + "px";
    eleStyle.top =
      (parseInt(frameHeight) / 2 - parseInt(eleStyleHeight) / 2 + y) + "px";
  } else if (CALIGN.RIGHT_VCENTER == frameComponentAlign) {
    eleStyle.left = (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
    eleStyle.top =
      (parseInt(frameHeight) / 2 - parseInt(eleStyleHeight) / 2 + y) + "px";
  } else if (CALIGN.LEFT_BOTTOM == frameComponentAlign) {
    eleStyle.left = x + "px";
    eleStyle.top = (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) +
      "px";
  } else if (CALIGN.HCENTER_BOTTOM == frameComponentAlign) {
    eleStyle.left =
      (parseInt(frameWidth) / 2 - parseInt(eleStyleWidth) / 2 + x) + "px";
    eleStyle.top = (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) +
      "px";
  } else if (CALIGN.RIGHT_BOTTOM == frameComponentAlign) {
    eleStyle.left = (parseInt(frameWidth) - parseInt(eleStyleWidth) + x) + "px";
    eleStyle.top = (parseInt(frameHeight) - parseInt(eleStyleHeight) + y) +
      "px";
  }
};

CFrameComponent.prototype.handleTakingFocus = function () {
  var me = this;
  if (me._focusTakingCallabck) {
    me._focusTakingCallabck();
  }
};

CFrameComponent.prototype.handleReleasingFocus = function () {
  var me = this;
  if (me._focusReleasingCallabck) {
    me._focusReleasingCallabck();
  }
};

/**
 * end of CFrameComponent class
 */

module.exports = CFrameComponent;


/***/ }),

/***/ "./src/appearance/CImageButtonAppearance.js":
/*!**************************************************!*\
  !*** ./src/appearance/CImageButtonAppearance.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var inherit = __webpack_require__(/*! ../utils/Inherit.js */ "./src/utils/Inherit.js");
var CTextButtonAppearance = __webpack_require__(/*! ./CButtonAppearance.js */ "./src/appearance/CButtonAppearance.js");

inherit(CImageButtonAppearance, CTextButtonAppearance);

function CImageButtonAppearance() {
  this.imageDefault = null;
  this.imageHovered = null;
  this.imagePressed = null;
  this.imageFocused = null;

  this.imageStore = {};
}

CImageButtonAppearance.prototype._setImage = function (src, width, height) {
  var me = this;

  var storedImgEle = me.imageStore[src];

  if (storedImgEle) {
    return storedImgEle;
  } else {
    var imgEle = document.createElement("img");
    imgEle.src = src;
    if (width && height) {
      var imgWidth = width;
      var imgHeight = height;
      var imgStyle = "margin:0px;padding:0px;width:" + imgWidth + "px;height:" +
        imgHeight + "px";
      imgEle.setAttribute("style", imgStyle);
    }
    me.imageStore[src] = imgEle;

    return imgEle;
  }
};
CImageButtonAppearance.prototype.setSrc = function (model) {
  var me = this;
  if (model.default) {
    me.imageDefault = me._setImage(model.default, model.width, model.height);
  }
  if (model.hovered) {
    me.imageHovered = me._setImage(model.hovered, model.width, model.height);
  }
  if (model.pressed) {
    me.imagePressed = me._setImage(model.pressed, model.width, model.height);
  }
  if (model.focused) {
    me.imageFocused = me._setImage(model.focused, model.width, model.height);
  }
};

module.exports = CImageButtonAppearance;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//export { default as JSFrame } from './JSFrame.js';
module.exports = {
  JSFrame: __webpack_require__(/*! ./JSFrame */ "./src/JSFrame.js"),
};


/***/ }),

/***/ "./src/presets/appearance/PresetStyleMaterial.js":
/*!*******************************************************!*\
  !*** ./src/presets/appearance/PresetStyleMaterial.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./PresetStyleMaterial.css */ "./src/presets/appearance/PresetStyleMaterial.css");
var ObjectAssigner = __webpack_require__(/*! ../../utils/ObjectAssigner.js */ "./src/utils/ObjectAssigner.js");

function getStyle(fApr, userParam) {
  var srcParam = {
    border: {
      color: "transparent",
      width: 0,
      radius: 6,
    },
    control: {
      maximizeWithoutTitleBar: false,
      restoreKey: "Escape",
    },
    titleBar: {
      color: "white",
      background: "black",
      leftMargin: 20,
      height: 30,
      fontSize: 12,
      buttonWidth: 36,
      buttonHeight: 16,
      buttonColor: "white",
      buttons: [
        {
          fa: "fas fa-times",
          name: "closeButton",
          visible: true,
        },
        {
          fa: "far fa-window-maximize",
          name: "maximizeButton",
          visible: true,
        },
        {
          fa: "far fa-window-restore",
          name: "restoreButton",
          visible: false,
        },
        {
          fa: "far fa-window-minimize",
          name: "minimizeButton",
          visible: true,
        },
        {
          fa: "fas fa-caret-up",
          name: "deminimizeButton",
          visible: false,
        },
      ],
      buttonsOnLeft: [],
    },
  };

  var param = srcParam;

  if (userParam) {
    //param=Object.assign({},srcParam, userParam);
    ObjectAssigner.objectAssign(srcParam, userParam);
  }

  fApr.showTitleBar = true;
  fApr.showCloseButton = true;

  fApr.titleBarCaptionFontSize = param.titleBar.fontSize + "px"; //'12px';
  fApr.titleBarCaptionFontWeight = "normal";
  fApr.titleBarCaptionLeftMargin = param.titleBar.leftMargin + "px";
  fApr.titleBarCaptionColorDefault = param.titleBar.color;
  fApr.titleBarCaptionColorFocused = param.titleBar.color;
  fApr.titleBarCaptionTextShadow = null;
  fApr.titleBarCaptionTextAlign = "left";

  fApr.titleBarHeight = param.titleBar.height + "px"; // '50px';

  fApr.titleBarColorDefault = param.titleBar.background;
  fApr.titleBarColorFocused = param.titleBar.background;

  fApr.titleBarBorderBottomDefault = "solid 0px #aaaaaa";
  fApr.titleBarBorderBottomFocused = "solid 0px #1883d7";

  fApr.frameBorderRadius = param.border.radius + "px"; // '6px';

  //border width
  fApr.frameBorderWidthDefault = param.border.width + "px";
  fApr.frameBorderWidthFocused = param.border.width + "px";

  //border color
  fApr.frameBorderColorDefault = param.border.color;
  fApr.frameBorderColorFocused = param.border.color;

  fApr.frameBorderStyle = "solid";

  //window shadow
  fApr.frameBoxShadow = param.border.shadow; //'2px 2px 10px  rgba(0, 0, 0, 0.5)';

  fApr.frameBackgroundColor = "transparent";

  fApr.frameComponents = new Array();

  fApr.frameHeightAdjust = 0; //default is 1

  fApr.getTitleBarStyle = function () {
    if (fApr.focusedFrameOnly) {
      return {
        titleBarClassNameDefault: " ",
        titleBarClassNameFocused: " ",
      };
    } else {
      return {
        titleBarClassNameDefault: " ",
        titleBarClassNameFocused: " ",
      };
    }
  };

  fApr.onInitialize = function () {
    alignButtons(fApr, param, false);
    alignButtons(fApr, param, true);
  };

  //

  return fApr;
}

function alignButtons(fApr, param, fromLeft) {
  var partsBuilder = fApr.getPartsBuilder();
  var rbtX = 0;
  var buttons;

  if (fromLeft) {
    buttons = param.titleBar.buttonsOnLeft;
  } else {
    buttons = param.titleBar.buttons;
  }

  for (var rbtIdx in buttons) {
    var rbtSrc = buttons[rbtIdx];

    var rbt = partsBuilder.buildTextButtonAppearance();

    //caption
    rbt.fa = rbtSrc.fa;

    rbt.width = param.titleBar.buttonWidth;
    rbt.height = param.titleBar.buttonHeight;

    rbt.borderRadius = 0;
    rbt.borderWidth = 0;

    rbt.borderColorDefault = "#c6c6c6";
    rbt.borderColorFocused = "#fc615c";
    rbt.borderColorHovered = rbt.borderColorFocused;
    rbt.borderColorPressed = "#e64842";

    rbt.borderStyleDefault = "solid";
    rbt.borderStyleFocused = rbt.borderStyleDefault;
    rbt.borderStyleHovered = rbt.borderStyleDefault;
    rbt.borderStylePressed = rbt.borderStyleDefault;

    //background
    rbt.backgroundColorDefault = "transparent";
    rbt.backgroundColorFocused = "transparent";
    rbt.backgroundColorHovered = "transparent";
    rbt.backgroundColorPressed = "transparent";

    var colors = getSubColor(param.titleBar.buttonColor);
    rbt.captionColorDefault = param.titleBar.buttonColor;
    rbt.captionColorFocused = param.titleBar.buttonColor;
    rbt.captionColorHovered = colors.hovered;
    rbt.captionColorPressed = colors.pressed;

    rbt.captionShiftYpx = 0;
    rbt.captionFontRatio = 1;

    var rbtEle = partsBuilder.buildTextButton(rbt);

    if (rbtSrc.visible) {
      rbtEle.style.display = "flex";
    } else {
      if (fromLeft) {
        rbtX -= param.titleBar.buttonWidth;
      } else {
        rbtX += param.titleBar.buttonWidth;
      }
      rbtEle.style.display = "none";
    }

    var titleBarHeight = parseInt(fApr.titleBarHeight);

    var rbtEleLeft = rbtX;

    //compute vertical center

    var rbtEleTop = -titleBarHeight + (titleBarHeight - rbt.height) / 2;

    var rbtEleAlign;
    if (fromLeft) {
      rbtEleAlign = "LEFT_TOP";
    } else {
      rbtEleAlign = "RIGHT_TOP";
    }

    var ndiv;
    if (rbtSrc.childMenuHTML) {
      ndiv = document.createElement("div");
      ndiv.id = rbtSrc.name + "_child_menu";

      ndiv.innerHTML = rbtSrc.childMenuHTML;
      ndiv.style.position = "absolute";
      ndiv.style.width = (rbtSrc.childMenuWidth ? rbtSrc.childMenuWidth : 200) +
        "px";
      ndiv.style.top = (parseInt(rbtEle.style.top, 10) +
        parseInt(rbtEle.style.height, 10) / 2 + titleBarHeight / 2) + "px";
      ndiv.style.left = rbtEle.style.left;
      ndiv.style.display = "none";

      rbtEle.appendChild(ndiv);
    }

    fApr.addFrameComponent(
      rbtSrc.name,
      rbtEle,
      rbtEleLeft,
      rbtEleTop,
      rbtEleAlign,
      { childMenu: ndiv },
    );

    if (fromLeft) {
      rbtX += param.titleBar.buttonWidth;
    } else {
      rbtX += -param.titleBar.buttonWidth;
    }
  }
}

function getSubColor(color) {
  var canvas = document.createElement("canvas");
  canvas.height = 1;
  canvas.width = 1;
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  var colorData = ctx.getImageData(0, 0, 1, 1).data;

  var r = colorData[0];
  var g = colorData[1];
  var b = colorData[2];
  var alpha = colorData[3] / 255;
  var alpha2 = alpha * 0.85;
  var alpha3 = alpha * 0.75;

  var ret = "rgb(" + r + "," + g + "," + b + "," + alpha2 + ")";
  var ret2 = "rgb(" + r + "," + g + "," + b + "," + alpha2 + ")";
  var ret3 = "rgb(" + r + "," + g + "," + b + "," + alpha3 + ")";
  return { src: ret, hovered: ret2, pressed: ret3 };
}

module.exports.getStyle = getStyle;


/***/ }),

/***/ "./src/presets/appearance/PresetStylePopup.js":
/*!****************************************************!*\
  !*** ./src/presets/appearance/PresetStylePopup.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./PresetStylePopup.css */ "./src/presets/appearance/PresetStylePopup.css");

function getStyle(fApr) {
  fApr.showTitleBar = false;
  fApr.showCloseButton = true;

  fApr.titleBarCaptionFontSize = "12px";
  fApr.titleBarCaptionFontWeight = "normal";
  fApr.titleBarCaptionLeftMargin = "10px";
  fApr.titleBarCaptionColorDefault = "#4d494d";
  fApr.titleBarCaptionColorFocused = "#4d494d";

  fApr.titleBarHeight = "5px";

  fApr.titleBarColorDefault = "white";
  fApr.titleBarColorFocused = "white";

  fApr.titleBarBorderBottomDefault = null;
  fApr.titleBarBorderBottomFocused = null;

  fApr.frameBorderRadius = "6px";

  //border width
  fApr.frameBorderWidthDefault = "1px";
  fApr.frameBorderWidthFocused = "1px";

  //border color
  fApr.frameBorderColorDefault = "#aaaaaa";
  fApr.frameBorderColorFocused = "#aaaaaa";

  fApr.frameBorderStyle = "solid";

  //window shadow
  fApr.frameBoxShadow = "2px 2px 5px  rgba(0, 0, 0, 0.5)";

  fApr.frameBackgroundColor = "white";

  fApr.frameComponents = new Array();

  //adjustment value
  fApr.frameHeightAdjust = 2; //default is 1
  fApr.getTitleBarStyle = function () {
    if (fApr.focusedFrameOnly) {
      return {
        titleBarClassNameDefault: "jsframe-preset-style-popup-focused",
        titleBarClassNameFocused: "jsframe-preset-style-popup-focused",
      };
    } else {
      return {
        titleBarClassNameDefault: "jsframe-preset-style-popup-default",
        titleBarClassNameFocused: "jsframe-preset-style-popup-focused",
      };
    }
  };
  fApr.onInitialize = function () {
    var partsBuilder = fApr.getPartsBuilder();

    //configure close button appearance[begin]//////////////

    var crossMark0 = "\u274c";
    var crossMark1 = "\u2716";
    var crossMark2 = "\u274e";
    var CROSS_MARK = crossMark1;

    var cbApr = partsBuilder.buildTextButtonAppearance();

    cbApr.width = 20;
    cbApr.height = 20;

    cbApr.borderRadius = 10;
    cbApr.borderWidth = 1;

    cbApr.borderColorDefault = "#cccccc";
    cbApr.borderColorFocused = "#cccccc";
    cbApr.borderColorHovered = "#dddddd";
    cbApr.borderColorPressed = "#eeeeee";

    cbApr.borderStyleDefault = "solid";
    cbApr.borderStyleFocused = cbApr.borderStyleDefault;
    cbApr.borderStyleHovered = cbApr.borderStyleDefault;
    cbApr.borderStylePressed = cbApr.borderStyleDefault;

    //background
    cbApr.backgroundColorDefault = "white";
    cbApr.backgroundColorFocused = "white";
    cbApr.backgroundColorHovered = "#eeeeee";
    cbApr.backgroundColorPressed = "#dddddd";

    cbApr.backgroundBoxShadow = "2px 2px 5px  rgba(0, 0, 0, 0.5)";

    //caption
    cbApr.caption = CROSS_MARK;

    cbApr.captionColorDefault = "black";
    cbApr.captionColorFocused = "black";
    cbApr.captionColorHovered = "white";
    cbApr.captionColorPressed = "white";

    cbApr.captionShiftYpx = 1;
    cbApr.captionFontRatio = 0.6;

    var closeBtnEle = partsBuilder.buildTextButton(cbApr);
    var eleLeft = 10;
    var eleTop = -6 - parseInt(fApr.titleBarHeight);
    var eleAlign = "RIGHT_TOP";

    // 'closeButton' is a special name
    fApr.addFrameComponent(
      "closeButton",
      closeBtnEle,
      eleLeft,
      eleTop,
      eleAlign,
    );

    //configure close button appearance[end]//////////////
  };
  //

  return fApr;
}

module.exports.getStyle = getStyle;


/***/ }),

/***/ "./src/presets/appearance/PresetStyleRedstone.js":
/*!*******************************************************!*\
  !*** ./src/presets/appearance/PresetStyleRedstone.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./PresetStyleRedstone.css */ "./src/presets/appearance/PresetStyleRedstone.css");

function getStyle(fApr) {
  fApr.showTitleBar = true;
  fApr.showCloseButton = true;

  fApr.titleBarCaptionFontSize = "12px";
  fApr.titleBarCaptionFontWeight = "normal";
  fApr.titleBarCaptionLeftMargin = "10px";
  fApr.titleBarCaptionColorDefault = "#9b9a9b";
  fApr.titleBarCaptionColorFocused = "#4d494d";

  fApr.titleBarHeight = "30px";

  fApr.titleBarColorDefault = null;
  fApr.titleBarColorFocused = null;

  fApr.titleBarBorderBottomDefault = "solid 1px #aaaaaa";
  fApr.titleBarBorderBottomFocused = "solid 1px #1883d7";

  fApr.frameBorderRadius = "0px";

  //border width
  fApr.frameBorderWidthDefault = "1px";
  fApr.frameBorderWidthFocused = "1px";

  //border color
  fApr.frameBorderColorDefault = "#aaaaaa";
  fApr.frameBorderColorFocused = "#1883d7";

  fApr.frameBorderStyle = "solid";

  //window shadow
  fApr.frameBoxShadow = null;

  fApr.frameBackgroundColor = "transparent";

  fApr.frameComponents = new Array();

  //adjustment value
  fApr.frameHeightAdjust = 0; //default is 1

  fApr.getTitleBarStyle = function () {
    if (fApr.focusedFrameOnly) {
      return {
        titleBarClassNameDefault: "jsframe-preset-style-redstone-focused",
        titleBarClassNameFocused: "jsframe-preset-style-redstone-focused",
      };
    } else {
      return {
        titleBarClassNameDefault: "jsframe-preset-style-redstone-default",
        titleBarClassNameFocused: "jsframe-preset-style-redstone-focused",
      };
    }
  };

  fApr.onInitialize = function () {
    var partsBuilder = fApr.getPartsBuilder();

    {
      //configure close button appearance[begin]//////////////

      var CROSS_MARK = "\u2573";

      var cbApr = partsBuilder.buildTextButtonAppearance();

      cbApr.width = 45;
      cbApr.height = 28;

      cbApr.borderRadius = 0;
      cbApr.borderWidth = 0;

      cbApr.borderColorDefault = "#c6c6c6";
      cbApr.borderColorFocused = "#fc615c";
      cbApr.borderColorHovered = cbApr.borderColorFocused;
      cbApr.borderColorPressed = "#e64842";

      cbApr.borderStyleDefault = "solid";
      cbApr.borderStyleFocused = cbApr.borderStyleDefault;
      cbApr.borderStyleHovered = cbApr.borderStyleDefault;
      cbApr.borderStylePressed = cbApr.borderStyleDefault;

      //background
      cbApr.backgroundColorDefault = "white";
      cbApr.backgroundColorFocused = "white";
      cbApr.backgroundColorHovered = "#e81123";
      cbApr.backgroundColorPressed = "#f1707a";

      //caption
      cbApr.caption = CROSS_MARK;

      cbApr.captionColorDefault = "#9b9a9b";
      cbApr.captionColorFocused = "black";
      cbApr.captionColorHovered = "white";
      cbApr.captionColorPressed = "white";

      cbApr.captionShiftYpx = 1;
      cbApr.captionFontRatio = 0.6;

      var closeBtnEle = partsBuilder.buildTextButton(cbApr);
      var eleLeft = 0;
      var eleTop = -parseInt(fApr.titleBarHeight);
      var eleAlign = "RIGHT_TOP";

      // 'closeButton' is a special name
      fApr.addFrameComponent(
        "closeButton",
        closeBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //configure close button appearance[end]//////////////
    }

    {
      //configure close button appearance[begin]//////////////

      var MAXIMIZE_MARK = "\u2610";

      var maxApr = partsBuilder.buildTextButtonAppearance();

      maxApr.width = 45;
      maxApr.height = 28;

      maxApr.borderRadius = 0;
      maxApr.borderWidth = 0;

      maxApr.borderColorDefault = "#c6c6c6";
      maxApr.borderColorFocused = "#fc615c";
      maxApr.borderColorHovered = maxApr.borderColorFocused;
      maxApr.borderColorPressed = "#e64842";

      maxApr.borderStyleDefault = "solid";
      maxApr.borderStyleFocused = maxApr.borderStyleDefault;
      maxApr.borderStyleHovered = maxApr.borderStyleDefault;
      maxApr.borderStylePressed = maxApr.borderStyleDefault;

      //background
      maxApr.backgroundColorDefault = "white";
      maxApr.backgroundColorFocused = "white";
      maxApr.backgroundColorHovered = "#e5e5e5";
      maxApr.backgroundColorPressed = "#cccccc";

      //caption
      maxApr.caption = MAXIMIZE_MARK;

      maxApr.captionColorDefault = "#9b9a9b";
      maxApr.captionColorFocused = "black";
      maxApr.captionColorHovered = "black";
      maxApr.captionColorPressed = "black";

      maxApr.captionShiftYpx = 1;
      maxApr.captionFontRatio = 0.55;

      var maxBtnEle = partsBuilder.buildTextButton(maxApr);
      var eleLeft = -46;
      var eleTop = -parseInt(fApr.titleBarHeight);
      var eleAlign = "RIGHT_TOP";

      // 'closeButton' is a special name
      fApr.addFrameComponent(
        "maximizeButton",
        maxBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //configure close button appearance[end]//////////////
    }

    {
      //configure close button appearance[begin]//////////////

      var MINIMIZE_MARK = "\uff3f";

      var minApr = partsBuilder.buildTextButtonAppearance();

      minApr.width = 45;
      minApr.height = 28;

      minApr.borderRadius = 0;
      minApr.borderWidth = 0;

      minApr.borderColorDefault = "#c6c6c6";
      minApr.borderColorFocused = "#fc615c";
      minApr.borderColorHovered = minApr.borderColorFocused;
      minApr.borderColorPressed = "#e64842";

      minApr.borderStyleDefault = "solid";
      minApr.borderStyleFocused = minApr.borderStyleDefault;
      minApr.borderStyleHovered = minApr.borderStyleDefault;
      minApr.borderStylePressed = minApr.borderStyleDefault;

      //background
      minApr.backgroundColorDefault = "white";
      minApr.backgroundColorFocused = "white";
      minApr.backgroundColorHovered = "#e5e5e5";
      minApr.backgroundColorPressed = "#cccccc";

      //caption
      minApr.caption = MINIMIZE_MARK;

      minApr.captionColorDefault = "#9b9a9b";
      minApr.captionColorFocused = "black";
      minApr.captionColorHovered = "black";
      minApr.captionColorPressed = "black";

      minApr.captionShiftYpx = -2;
      minApr.captionFontRatio = 0.3;

      var minBtnEle = partsBuilder.buildTextButton(minApr);
      var eleLeft = -92;
      var eleTop = -parseInt(fApr.titleBarHeight);
      var eleAlign = "RIGHT_TOP";

      // 'closeButton' is a special name
      fApr.addFrameComponent(
        "minimizeButton",
        minBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //configure close button appearance[end]//////////////
    }
    {
      //configure close button appearance[begin]//////////////

      var deminApr = partsBuilder.buildTextButtonAppearance();

      deminApr.width = 45;
      deminApr.height = 28;

      deminApr.borderRadius = 0;
      deminApr.borderWidth = 0;

      deminApr.borderColorDefault = "#c6c6c6";
      deminApr.borderColorFocused = "#fc615c";
      deminApr.borderColorHovered = deminApr.borderColorFocused;
      deminApr.borderColorPressed = "#e64842";

      deminApr.borderStyleDefault = "solid";
      deminApr.borderStyleFocused = deminApr.borderStyleDefault;
      deminApr.borderStyleHovered = deminApr.borderStyleDefault;
      deminApr.borderStylePressed = deminApr.borderStyleDefault;

      //background
      deminApr.backgroundColorDefault = "white";
      deminApr.backgroundColorFocused = "white";
      deminApr.backgroundColorHovered = "#e5e5e5";
      deminApr.backgroundColorPressed = "#cccccc";

      //caption
      deminApr.caption = "\u25A3";

      deminApr.captionColorDefault = "#9b9a9b";
      deminApr.captionColorFocused = "black";
      deminApr.captionColorHovered = "black";
      deminApr.captionColorPressed = "black";

      deminApr.captionShiftYpx = 1;
      deminApr.captionFontRatio = 0.6;

      var deminBtnEle = partsBuilder.buildTextButton(deminApr);
      var eleLeft = -92;
      var eleTop = -parseInt(fApr.titleBarHeight);
      var eleAlign = "RIGHT_TOP";

      deminBtnEle.style.display = "none";

      // 'closeButton' is a special name
      fApr.addFrameComponent(
        "deminimizeButton",
        deminBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //configure close button appearance[end]//////////////
    }
    {
      //configure close button appearance[begin]//////////////

      var RESTORE_MARK = "\u274F";

      var rbApr = partsBuilder.buildTextButtonAppearance();

      rbApr.width = 45;
      rbApr.height = 28;

      rbApr.borderRadius = 0;
      rbApr.borderWidth = 0;

      rbApr.borderColorDefault = "#c6c6c6";
      rbApr.borderColorFocused = "#fc615c";
      rbApr.borderColorHovered = rbApr.borderColorFocused;
      rbApr.borderColorPressed = "#e64842";

      rbApr.borderStyleDefault = "solid";
      rbApr.borderStyleFocused = rbApr.borderStyleDefault;
      rbApr.borderStyleHovered = rbApr.borderStyleDefault;
      rbApr.borderStylePressed = rbApr.borderStyleDefault;

      //background
      rbApr.backgroundColorDefault = "white";
      rbApr.backgroundColorFocused = "white";
      rbApr.backgroundColorHovered = "#e5e5e5";
      rbApr.backgroundColorPressed = "#cccccc";

      //caption
      rbApr.caption = RESTORE_MARK;

      rbApr.captionColorDefault = "#9b9a9b";
      rbApr.captionColorFocused = "black";
      rbApr.captionColorHovered = "black";
      rbApr.captionColorPressed = "black";

      rbApr.captionShiftYpx = 1;
      rbApr.captionFontRatio = 0.55;

      var restoreBtnEle = partsBuilder.buildTextButton(rbApr);
      var eleLeft = -46;
      var eleTop = -parseInt(fApr.titleBarHeight);
      var eleAlign = "RIGHT_TOP";

      restoreBtnEle.style.display = "none";

      // 'closeButton' is a special name
      fApr.addFrameComponent(
        "restoreButton",
        restoreBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //configure close button appearance[end]//////////////
    }
  };
  //

  return fApr;
}

module.exports.getStyle = getStyle;


/***/ }),

/***/ "./src/presets/appearance/PresetStyleToast.js":
/*!****************************************************!*\
  !*** ./src/presets/appearance/PresetStyleToast.js ***!
  \****************************************************/
/***/ ((module) => {

function getStyle(fApr) {
  fApr.showTitleBar = false;
  fApr.showCloseButton = true;

  fApr.titleBarCaptionFontSize = "0px";
  fApr.titleBarCaptionFontWeight = "normal";
  fApr.titleBarCaptionLeftMargin = "0px";
  fApr.titleBarCaptionColorDefault = "transparent";
  fApr.titleBarCaptionColorFocused = "transparent";

  fApr.titleBarHeight = "0px";

  fApr.titleBarColorDefault = "transparent";
  fApr.titleBarColorFocused = "transparent";

  fApr.titleBarBorderBottomDefault = null;
  fApr.titleBarBorderBottomFocused = null;

  fApr.frameBorderRadius = "10px";

  //border width
  fApr.frameBorderWidthDefault = "0px";
  fApr.frameBorderWidthFocused = "0px";

  //border color
  fApr.frameBorderColorDefault = "transparent";
  fApr.frameBorderColorFocused = "transparent";
  fApr.frameBorderStyle = "solid";
  fApr.frameBoxShadow = "2px 2px 15px  rgba(0, 0, 0, 0.5)";
  fApr.frameBackgroundColor = "transparent";

  fApr.frameComponents = [];
  fApr.frameHeightAdjust = 1; //default is 1

  fApr.captionClor = "darkgray";

  fApr.pullUpDisabled = false;

  fApr.getTitleBarStyle = function () {
    if (fApr.focusedFrameOnly) {
      return {
        titleBarClassNameDefault: " ",
        titleBarClassNameFocused: " ",
      };
    } else {
      return {
        titleBarClassNameDefault: " ",
        titleBarClassNameFocused: " ",
      };
    }
  };

  fApr.onInitialize = function () {
    var partsBuilder = fApr.getPartsBuilder();

    //configure close button appearance[begin]//////////////

    var crossMark0 = "\u274c";
    var crossMark1 = "\u2716";
    var crossMark2 = "\u274e";
    var CROSS_MARK = crossMark1;

    var cbApr = partsBuilder.buildTextButtonAppearance();

    cbApr.width = 20;
    cbApr.height = 20;

    cbApr.borderRadius = 10;
    cbApr.borderWidth = 0;

    cbApr.borderColorDefault = "#cccccc";
    cbApr.borderColorFocused = "#cccccc";
    cbApr.borderColorHovered = "#dddddd";
    cbApr.borderColorPressed = "#eeeeee";

    cbApr.borderStyleDefault = "solid";
    cbApr.borderStyleFocused = cbApr.borderStyleDefault;
    cbApr.borderStyleHovered = cbApr.borderStyleDefault;
    cbApr.borderStylePressed = cbApr.borderStyleDefault;

    //background
    cbApr.backgroundColorDefault = "transparent";
    cbApr.backgroundColorFocused = "transparent";
    cbApr.backgroundColorHovered = "transparent";
    cbApr.backgroundColorPressed = "transparent";

    cbApr.backgroundBoxShadow = null; // '2px 2px 5px  rgba(0, 0, 0, 0.5)';

    //caption
    cbApr.caption = CROSS_MARK;

    cbApr.captionColorDefault = fApr.captionClor;
    cbApr.captionColorFocused = fApr.captionClor;
    cbApr.captionColorHovered = fApr.captionClor;
    cbApr.captionColorPressed = fApr.captionClor;

    cbApr.captionShiftYpx = 1;
    cbApr.captionFontRatio = 0.6;

    var closeBtnEle = partsBuilder.buildTextButton(cbApr);
    var eleLeft = -6;
    var eleTop = 3;
    var eleAlign = "RIGHT_TOP";

    // 'closeButton' is a special name
    fApr.addFrameComponent(
      "closeButton",
      closeBtnEle,
      eleLeft,
      eleTop,
      eleAlign,
    );

    //configure close button appearance[end]//////////////
  };
  //

  return fApr;
}

module.exports.getStyle = getStyle;


/***/ }),

/***/ "./src/presets/appearance/PresetStyleYosemite.js":
/*!*******************************************************!*\
  !*** ./src/presets/appearance/PresetStyleYosemite.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! ./PresetStyleYosemite.css */ "./src/presets/appearance/PresetStyleYosemite.css");
var ObjectAssigner = __webpack_require__(/*! ../../utils/ObjectAssigner.js */ "./src/utils/ObjectAssigner.js");

function getStyle(fApr, userParam) {
  var srcParam = {
    titleBar: {
      greenButton: "maximize", //'maximize' or 'fullscreen'
    },
  };

  var param = srcParam;

  if (userParam) {
    //param=Object.assign({},srcParam, userParam);
    ObjectAssigner.objectAssign(srcParam, userParam);
  }

  fApr.showTitleBar = true;
  fApr.showCloseButton = true;

  fApr.titleBarCaptionFontSize = "11px";
  fApr.titleBarCaptionFontWeight = "normal";
  fApr.titleBarCaptionLeftMargin = null;
  fApr.titleBarCaptionColorDefault = "#4d494d";
  fApr.titleBarCaptionColorFocused = "#4d494d";

  fApr.titleBarHeight = "26px";

  fApr.titleBarColorDefault = null;
  fApr.titleBarColorFocused = null;

  fApr.titleBarBorderBottomDefault = "1px solid #b1aeb1";
  fApr.titleBarBorderBottomFocused = fApr.titleBarBorderBottomDefault;

  fApr.frameBorderRadius = "6px";

  //border width
  fApr.frameBorderWidthDefault = "1px";
  fApr.frameBorderWidthFocused = "1px";

  //border color
  fApr.frameBorderColorDefault = "#acacac";
  fApr.frameBorderColorFocused = "#acacac";

  fApr.frameBorderStyle = "solid";

  //window shadow
  fApr.frameBoxShadow = "0px 0px 20px rgba(0, 0, 0, 0.3)";

  fApr.frameBackgroundColor = "transparent";

  fApr.frameComponents = new Array();

  fApr.getTitleBarStyle = function () {
    if (fApr.focusedFrameOnly) {
      return {
        titleBarClassNameDefault: "jsframe-preset-style-yosemite-focused",
        titleBarClassNameFocused: "jsframe-preset-style-yosemite-focused",
      };
    } else {
      return {
        titleBarClassNameDefault: "jsframe-preset-style-yosemite-default",
        titleBarClassNameFocused: "jsframe-preset-style-yosemite-focused",
      };
    }
  };

  fApr.onInitialize = function () {
    var partsBuilder = fApr.getPartsBuilder();

    var img_data_close_hovered =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAWElEQVQoU2NkIBIwEqmOAa6wgZWlH6Sp4fefQjCNxkdRyMjAUPCf4f8CkEJGBsaE/wwME2AaUaxuYGWeD1IAUgjS0PD7byLMaaQrBLmJKKuJ9gyhYCI6HAGlFDALf9s7eQAAAABJRU5ErkJggg==";
    var img_data_maximize_hovered =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVElEQVQoU2NkIBIwoqvjixFoAIl9WvIBTMMAhkLeGP79IMnPSz46kq8QZN1/hv/2IBMYGRgMQPR/BoYLED7jQZAzwFYTrRDZLdRxI7KJRAcPrvAHAATYKgvLH0fAAAAAAElFTkSuQmCC";
    if (param.titleBar.greenButton === "fullscreen") {
      img_data_maximize_hovered =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAZElEQVQoU2NkIBIwEqmOAUWhQIKAwL8///czMDAYwAz4tOQjWA1cIUjRhwUfPqArxlDIF8N/nomF0RFdMTaF/xkYGC6gK/605KMhitV8MfwghSCAohhkAy6FKIphniIvePCFKQDzGzsLS+7n2AAAAABJRU5ErkJggg==";
    }
    var img_data_demaximize_hovered =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAiUlEQVQoU2NkwAIEogQMPiz7cAFZihGbQt4Y/v0MjIwLPy/+sAAmj1MhIwODw39GxkSYYrwKQabBFGNVyBfL1///P6MBzFrmf4yFjCCH/2X63w93C+P/C58WfypEdzvYRN5YgQTG///ng61iYDjweclHR6wKkRUTVAhTzPD/fzxeE2FWYQtskBwAKwQ7tVjAL4MAAAAASUVORK5CYII=";
    var img_data_minimize_hovered =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMUlEQVQoU2NkIBIwEqmOgUYKa7w4Ghj+M9hjdQYjw8GWbT8awFYTrZAYD9HIM8RYDQBsEAwLkq4IAgAAAABJRU5ErkJggg==";
    var img_data_1dot_transparent =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=";
    var img_width = 10;
    var img_height = 10;
    var img_style = "margin:0px;padding:0px;width:" + img_width + "px;height:" +
      img_height + "px";

    var imageMaximize = document.createElement("img");
    imageMaximize.src = img_data_maximize_hovered;
    imageMaximize.setAttribute("style", img_style);

    var imageDemaximize = document.createElement("img");
    imageDemaximize.src = img_data_demaximize_hovered;
    imageDemaximize.setAttribute("style", img_style);

    // var imageFullScreen = document.createElement('img');
    // imageFullScreen.src = img_data_maximize_hovered;
    // imageFullScreen.setAttribute('style', img_style);

    var imageMinimize = document.createElement("img");
    imageMinimize.src = img_data_minimize_hovered;
    imageMinimize.setAttribute("style", img_style);

    var imageClose = document.createElement("img");
    imageClose.src = img_data_close_hovered;
    imageClose.setAttribute("style", img_style);

    var imgTransparent = document.createElement("img");
    imgTransparent.src = img_data_1dot_transparent;
    imgTransparent.setAttribute(
      "style",
      "margin:0px;padding:0px;width:6px;height:6px",
    );

    {
      //configure close button appearance[begin]//////////////

      var cbApr = partsBuilder.buildImageButtonAppearance();
      cbApr.imageDefault = imgTransparent;
      cbApr.imageHovered = imageClose;
      cbApr.imagePressed = imageClose;
      cbApr.imageFocused = imgTransparent;
      cbApr.size = 10;

      cbApr.borderRadius = 5;
      cbApr.borderWidth = 1;

      cbApr.borderColorDefault = "#c6c6c6";
      cbApr.borderColorFocused = "#d3524e";
      cbApr.borderColorHovered = cbApr.borderColorFocused;
      cbApr.borderColorPressed = "#e64842";

      cbApr.borderStyleDefault = "solid";
      cbApr.borderStyleFocused = cbApr.borderStyleDefault;
      cbApr.borderStyleHovered = cbApr.borderStyleDefault;
      cbApr.borderStylePressed = cbApr.borderStyleDefault;

      //background
      cbApr.backgroundColorDefault = "#d0d0d0";
      cbApr.backgroundColorFocused = "#fc615c";
      cbApr.backgroundColorHovered = cbApr.backgroundColorFocused;
      cbApr.backgroundColorPressed = cbApr.backgroundColorDefault;
      cbApr.setSrc({
        default: img_data_1dot_transparent,
        focused: img_data_1dot_transparent,
        hovered: img_data_close_hovered,
        pressed: img_data_close_hovered,
      });

      var closeBtnEle = partsBuilder.buildButton(cbApr);
      var eleLeft = 8;
      var eleTop = -19;
      var eleAlign = "LEFT_TOP";

      // 'closeButton' is a special name
      fApr.addFrameComponent(
        param.closeButtonName || "closeButton",
        closeBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //prepare [minimize button]
      var minBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
      minBtnApr.borderColorDefault = "#c6c6c6";
      minBtnApr.borderColorFocused = "#e6b347";
      minBtnApr.borderColorHovered = minBtnApr.borderColorFocused;
      minBtnApr.borderColorPressed = "#e1a12d";
      minBtnApr.backgroundColorDefault = "#d0d0d0";
      minBtnApr.backgroundColorFocused = "#fdbe40";
      minBtnApr.backgroundColorHovered = minBtnApr.backgroundColorFocused;
      minBtnApr.backgroundColorPressed = minBtnApr.backgroundColorDefault;
      minBtnApr.imageDefault = imgTransparent;
      minBtnApr.imageHovered = imageMinimize;
      minBtnApr.imagePressed = imageMinimize;
      minBtnApr.imageFocused = imgTransparent;

      var minBtnEle = partsBuilder.buildButton(minBtnApr);
      var deminimizeBtnEle = partsBuilder.buildButton(minBtnApr);
      deminimizeBtnEle.style.display = "none";
      var eleLeft = 28;
      var eleTop = -19;
      var eleAlign = "LEFT_TOP";
      fApr.addFrameComponent(
        "minimizeButton",
        minBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );
      fApr.addFrameComponent(
        "deminimizeButton",
        deminimizeBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      // prepare [maximize button]
      //configure zoom button appearance[begin]//////////////
      var maxBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
      maxBtnApr.borderColorDefault = "#c6c6c6";
      maxBtnApr.borderColorFocused = "#67b657";
      maxBtnApr.borderColorHovered = maxBtnApr.borderColorFocused;
      maxBtnApr.borderColorPressed = "#00af38";
      maxBtnApr.backgroundColorDefault = "#d0d0d0";
      maxBtnApr.backgroundColorFocused = "#34ca49";
      maxBtnApr.backgroundColorHovered = maxBtnApr.backgroundColorFocused;
      maxBtnApr.backgroundColorPressed = maxBtnApr.backgroundColorDefault;
      maxBtnApr.imageDefault = imgTransparent;
      maxBtnApr.imageHovered = imageMaximize;
      maxBtnApr.imagePressed = imageMaximize;
      maxBtnApr.imageFocused = imgTransparent;

      var zoomBtnEle = partsBuilder.buildButton(maxBtnApr);

      var demaxBtnApr = partsBuilder.buildImageButtonAppearance(cbApr);
      demaxBtnApr.borderColorDefault = "#c6c6c6";
      demaxBtnApr.borderColorFocused = "#67b657";
      demaxBtnApr.borderColorHovered = demaxBtnApr.borderColorFocused;
      demaxBtnApr.borderColorPressed = "#00af38";
      demaxBtnApr.backgroundColorDefault = "#d0d0d0";
      demaxBtnApr.backgroundColorFocused = "#34ca49";
      demaxBtnApr.backgroundColorHovered = demaxBtnApr.backgroundColorFocused;
      demaxBtnApr.backgroundColorPressed = demaxBtnApr.backgroundColorDefault;
      demaxBtnApr.imageDefault = imgTransparent;
      demaxBtnApr.imageHovered = imageDemaximize;
      demaxBtnApr.imagePressed = imageDemaximize;
      demaxBtnApr.imageFocused = imgTransparent;
      var demaxBtnEle = partsBuilder.buildButton(demaxBtnApr);
      demaxBtnEle.style.display = "none";

      var eleLeft = 48;
      var eleTop = -19;
      var eleAlign = "LEFT_TOP";

      fApr.addFrameComponent(
        "dezoomButton",
        demaxBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );
      fApr.addFrameComponent(
        "zoomButton",
        zoomBtnEle,
        eleLeft,
        eleTop,
        eleAlign,
      );

      //configure zoom button appearance[end]//////////////
    }
    //
  };
  //

  return fApr;
}

module.exports.getStyle = getStyle;


/***/ }),

/***/ "./src/presets/window/PresetWindowYosemite.js":
/*!****************************************************!*\
  !*** ./src/presets/window/PresetWindowYosemite.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mergeDeeply = __webpack_require__(/*! merge-deeply */ "../../node_modules/merge-deeply/lib/merge-deeply.js");

function getPreset(param) {
  var result = {};
  result.appearanceName = "yosemite";
  result.appearanceParam = {};

  var presetParam = {};

  if (param) {
    presetParam = param;
  }

  var isFullScreen = presetParam.maximizeButtonBehavior === "fullscreen";
  var minimizeButton = presetParam.minimizeButtonBehavior === "minimize"
    ? "minimizeButton"
    : null;
  var hideButton1 = presetParam.minimizeButtonBehavior === "hide"
    ? "minimizeButton"
    : null;
  var hideButton2 = presetParam.closeButtonBehavior === "hide"
    ? "custom-close-button"
    : null;
  var windowControlParam = presetParam.control;

  var closeButtonNameByCloseButtonBehavior = hideButton2;
  var closeButtonName = presetParam.closeButtonName;

  if (isFullScreen) {
    result.appearanceParam.titleBar = {
      greenButton: "fullscreen", //'maximize' icon or 'fullscreen' icon
    };
  }
  // Set this to 'closeButton' to automatically close when clicking
  result.appearanceParam.closeButtonName =
    closeButtonNameByCloseButtonBehavior || closeButtonName || "closeButton";

  result.setupPresetWindow = function (frame) {
    var defaultWindowControlParam = {
      maximizeButton: "zoomButton",
      maximizeParam: {
        fullScreen: isFullScreen, // true:maximized without title bar,false:maximized with title bar
        restoreKey: "Escape", //Set key code from https://www.w3.org/TR/uievents-code/#keyboard-key-codes
      },

      demaximizeButton: "dezoomButton",
      deminimizeButton: "deminimizeButton",
      minimizeButton: minimizeButton,
      hideButtons: [hideButton1, hideButton2],
      hideParam: {
        align: "CENTER_CENTER", //ABSOLUTE:If you want the window to disappear after transitioning to the position you specified

        duration: 300,
      },
      dehideParam: {
        duration: 300,
      },
      styleDisplay: "inline",
      animation: true,
      animationDuration: 100, //The whole animation duration(millisec)
    };

    if (windowControlParam) {
      mergeDeeply(
        {
          op: "overwrite-merge",
          object1: defaultWindowControlParam,
          object2: windowControlParam,
        },
      );
    }

    frame.setControl(defaultWindowControlParam);
  };
  return result;
}

module.exports.getPresetWindow = getPreset;


/***/ }),

/***/ "./src/utils/CSimpleLayoutAnimator.js":
/*!********************************************!*\
  !*** ./src/utils/CSimpleLayoutAnimator.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var CTimer = __webpack_require__(/*! ./CTimer.js */ "./src/utils/CTimer.js");

/**
 * CSimpleLayoutAnimator class
 * Class for moving animation · scaling animation of frame.
 * <p>
 * @constructor
 */
function CSimpleLayoutAnimator() {
  this.fps = 30;
  this.durationMillis = 200;
  this.targetFrame = null;

  this._crrAlpha = 1.0;
  this._toAlpha = 1.0;

  //current width/height
  this._crrWidth = 0;
  this._crrHeight = 0;
  this._toWidth = 0;
  this._toHeight = 0;

  //current position(x,y)
  //this._crrX = 0;
  //this._crrY = 0;
  this._toX = 0;
  this._toY = 0;

  this.pinnedAnimationEnabled = false;
  this._pinX = 0;
  this._pinY = 0;
  this._pinAnchor = null;
}

/**
 * Set CIFrame object to be resized
 * @param ciframe
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.set = function (ciframe) {
  var me = this;
  me.targetFrame = ciframe;

  me.fromWidth(ciframe.getWidth());
  me.fromHeight(ciframe.getHeight());

  me.toWidth(ciframe.getWidth());
  me.toHeight(ciframe.getHeight());

  var crrPos = ciframe.getPosition();

  me.fromPosition(crrPos.x, crrPos.y, crrPos.anchor);

  return me;
};

/**
 * Get CIFrame object
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.get = function () {
  var me = this;
  return me.targetFrame;
};

/**
 * Set animation duration time millis
 * @param durationMillis
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.setDuration = function (durationMillis) {
  var me = this;

  me.durationMillis = durationMillis;
  return me;
};

/**
 * Set expected FPS
 * @param fps
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.setFPS = function (fps) {
  var me = this;
  me.fps = fps;
  return me;
};

/**
 * Set PIN position
 * @param x
 * @param y
 * @param anchor Position where animation starts from.Expected parameters as follows.
 'LEFT_TOP':Default.Specify the position starting from the upper left.
 'CENTER_TOP'
 'RIGHT_TOP'
 'LEFT_CENTER'
 'CENTER_CENTER'
 'RIGHT_CENTER'
 'LEFT_BOTTOM'
 'CENTER_BOTTOM'
 'RIGHT_BOTTOM'
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.fromPosition = function (x, y, anchor) {
  var me = this;
  me.pinnedAnimationEnabled = true;

  me._pinX = x;
  me._pinY = y;

  me.toPosition(x, y);

  if (anchor) {
    me._pinAnchor = anchor;
  }
  return me;
};
/**
 * Set resizeFrom width
 * @param fromWidth
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.fromWidth = function (fromWidth) {
  var me = this;
  me._crrWidth = fromWidth;

  return me;
};

/**
 * Set resizeFrom height
 * @param fromHeight
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.fromHeight = function (fromHeight) {
  var me = this;
  me._crrHeight = fromHeight;

  return me;
};

/**
 * Set resizeTo width
 * @param toWidth
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.toWidth = function (toWidth) {
  var me = this;
  me._toWidth = toWidth;

  return me;
};

/**
 * Set resizeTo height
 * @param toHeight
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.toHeight = function (toHeight) {
  var me = this;
  me._toHeight = toHeight;
  return me;
};

/**
 * Set from alpha
 * @param fromAlpha
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.fromAlpha = function (fromAlpha) {
  var me = this;
  me._crrAlpha = fromAlpha;

  return me;
};

/**
 * Set to alpha
 * @param toAlpha
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.toAlpha = function (toAlpha) {
  var me = this;
  me._toAlpha = toAlpha;

  return me;
};

/**
 * Get CIFrame object
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.ease = function (ease) {
  var me = this;
  me._ease = ease;
  return me;
};

/**
 * Set move to position
 * @param x
 * @param y
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.toPosition = function (x, y) {
  var me = this;
  me._toX = x;
  me._toY = y;
  return me;
};

/**
 * Set move to x
 * @param x
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.toX = function (x) {
  var me = this;
  me._toX = x;
  return me;
};

/**
 * Set move to y
 * @param t
 * @returns {*}
 */
CSimpleLayoutAnimator.prototype.toY = function (t) {
  var me = this;
  me._toY = t;
  return me;
};

CSimpleLayoutAnimator.prototype.start = function (
  waitMillis,
  requestFocusEnabled,
) {
  var me = this;

  var fromWidth = me._crrWidth;
  var fromHeight = me._crrHeight;

  var fromX = me._pinX;
  var fromY = me._pinY;

  var fromAlpha = me._crrAlpha;

  return new Promise(function (resolve, reject) {
    var numOfSteps = parseInt(me.fps * (me.durationMillis / 1000));
    if (numOfSteps == 0) {
      numOfSteps = 1;
    }

    var deltaWidth = (me._toWidth - fromWidth) / numOfSteps;
    var deltaHeight = (me._toHeight - fromHeight) / numOfSteps;

    var deltaX = (me._toX - fromX) / numOfSteps;
    var deltaY = (me._toY - fromY) / numOfSteps;

    var deltaAlpha = (me._toAlpha - fromAlpha) / numOfSteps;
    if (me._ease) {
      deltaAlpha = deltaAlpha / 1.24;
    }

    var unitMillis = me.durationMillis / numOfSteps;

    var idx = 0;

    function loop() {
      var timer = new CTimer();

      timer.setIntervalMillis(unitMillis);

      timer.setCallback(function (timer) {
        if (idx == numOfSteps) {
          var _width = me._toWidth;
          var _height = me._toHeight;

          var _x = fromX + deltaX * idx;
          var _y = fromY + deltaY * idx;

          var _alpha = me._toAlpha;

          if (me.pinnedAnimationEnabled) {
            //me.targetFrame._setPositionInternally(me._pinX, me._pinY, me._pinAnchor, _width, _height);

            me.targetFrame._setPositionInternally(
              _x,
              _y,
              me._pinAnchor,
              _width,
              _height,
            );
          }

          if (me.targetFrame.htmlElement.style) {
            me.targetFrame.htmlElement.style.opacity = _alpha;
          }

          //me.targetFrame.resizeDirect(_width, _height,false);
          me.targetFrame.setSize(_width, _height, true);

          me._crrWidth = _width;
          me._crrHeight = _height;

          me._pinX = _x;
          me._pinY = _y;
        }

        if (idx == (numOfSteps + 1)) {
          //Stop timer after last draw update.
          timer.stopTimer();

          if (me.targetFrame.htmlElement.style) {
            me.targetFrame.htmlElement.style.opacity = me._toAlpha;
          }
          resolve(me);
          return;
        }

        var _width = fromWidth + deltaWidth * idx;
        var _height = fromHeight + deltaHeight * idx;

        var _x = fromX + deltaX * idx;
        var _y = fromY + deltaY * idx;

        var _alpha = fromAlpha + deltaAlpha * idx;

        if (me.pinnedAnimationEnabled) {
          //me.targetFrame._setPositionInternally(me._pinX, me._pinY, me._pinAnchor, _width, _height);
          me.targetFrame._setPositionInternally(
            _x,
            _y,
            me._pinAnchor,
            _width,
            _height,
          );
        }

        if (me.targetFrame.htmlElement.style) {
          me.targetFrame.htmlElement.style.opacity = _alpha;
        }

        //me.targetFrame.resizeDirect(_width, _height,false);
        me.targetFrame.setSize(_width, _height, true);

        if (idx == 0) {
          //check window existence
          var wmgr = me.targetFrame.parentCanvas;
          if (wmgr) {
            var _targetFrame = wmgr.getWindow(me.targetFrame.id);
            if (_targetFrame) {
              me.targetFrame.show({ requestFocus: requestFocusEnabled });
            } else {
              //the target window must be deleted.
            }
          }
        }

        idx++;
      });

      timer.startTimer();
    }

    if (waitMillis) {
      var waiter = new CTimer();
      waiter.setIntervalMillis(waitMillis);
      waiter.setCallback(function (_timer) {
        _timer.stopTimer();

        loop();
      });
      waiter.startTimer();
    } else {
      loop();
    }
  });
}; //start

/**
 * end of CSimpleLayoutAnimator class
 */
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

module.exports = CSimpleLayoutAnimator;


/***/ }),

/***/ "./src/utils/CTimer.js":
/*!*****************************!*\
  !*** ./src/utils/CTimer.js ***!
  \*****************************/
/***/ ((module) => {

/**
 * CTimer class<br>
 *
 * How to use:
 *  var timer = new CTimer();
 *    var value = 0;
 *
 *    timer.setCallback(function (timerObj) {
 *        value++;
 *        console.log(value);
 *        if (value == 100) {
 *            timerObj.stopTimer();
 *        }
 *    });
 *    timer.setIntervalMillis(100);
 *    timer.startTimer();
 *
 * @author Tom Misawa (riversun.org@gmail.com)
 */
var CTimer = (function () {
  function CTimer() {
    var me = this;

    me._timerId = null;
    me._isRunning = false;
    me._timerInterval = 0;

    me._internalCallback = _internalCallback;
    me._timerMethod = null;

    function _internalCallback() {
      if (me._timerMethod) {
        me._timerMethod(me);
      }
      if (me._isRunning) {
        clearTimeout(me._timerId);
        me._timerId = setTimeout(me._internalCallback, me._timerInterval);
      }
    }
  }

  CTimer.prototype.setCallback = function (callback_func) {
    var me = this;
    me._timerMethod = callback_func;
    return me;
  };

  CTimer.prototype.setIntervalMillis = function (interval) {
    var me = this;
    me._timerInterval = interval;
    return me;
  };

  CTimer.prototype.stopTimer = function () {
    var me = this;
    me._isRunning = false;
    return me;
  };

  CTimer.prototype.startTimer = function () {
    var me = this;
    if (me._timerInterval > 0) {
      me._timerId = setTimeout(me._internalCallback, me._timerInterval);
      me._isRunning = true;
    }
    return me;
  };

  return CTimer;
})();
/**
 * end of CTimer class
 */
//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
module.exports = CTimer;


/***/ }),

/***/ "./src/utils/Inherit.js":
/*!******************************!*\
  !*** ./src/utils/Inherit.js ***!
  \******************************/
/***/ ((module) => {

/**
 * Inheritance function
 *
 * @param subClass
 * @param baseClass
 */
function inherit(subClass, baseClass) {
  function clazz() {
  }

  clazz.prototype = baseClass.prototype;
  subClass.prototype = new clazz();

  subClass.prototype.constructor = subClass;
  subClass.superConstructor = baseClass;
  subClass.superClass = baseClass.prototype;
}

/**
 * End of inheritance function
 */

//+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

module.exports = inherit;


/***/ }),

/***/ "./src/utils/ObjectAssigner.js":
/*!*************************************!*\
  !*** ./src/utils/ObjectAssigner.js ***!
  \*************************************/
/***/ ((module) => {

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (obj) {
      return typeof obj;
    }
    : function (obj) {
      return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function isObject(item) {
  return (
    item &&
    (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" &&
    !Array.isArray(item)
  );
}

function objectAssign(target) {
  for (
    var _len = arguments.length,
      sources = Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) return target;
  var source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
        objectAssign(target[key], source[key]);
      } else {
        Object.assign(target, _defineProperty({}, key, source[key]));
      }
    }
  }
  return objectAssign.apply(undefined, [target].concat(sources));
}

module.exports.objectAssign = objectAssign;


/***/ }),

/***/ "./src/utils/WindowEventHelper.js":
/*!****************************************!*\
  !*** ./src/utils/WindowEventHelper.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var CSimpleLayoutAnimator = __webpack_require__(/*! ./CSimpleLayoutAnimator.js */ "./src/utils/CSimpleLayoutAnimator.js");
var CALIGN = __webpack_require__(/*! ../CCommon.js */ "./src/CCommon.js");
var mergeDeeply = __webpack_require__(/*! merge-deeply */ "../../node_modules/merge-deeply/lib/merge-deeply.js");
var EventListenerHelper = __webpack_require__(/*! event-listener-helper */ "../../node_modules/event-listener-helper/lib/event-listener-helper.js");

function WindowEventHelper(model) {
  this.eventListenerHelper = new EventListenerHelper();
  this.windowMode = "default";
  this.styleDisplay = "flex";
  this.horizontalAlign = "left";
  this.verticalAlign = "top";

  this.keyListener = null;

  this.minimizeButton = null;
  this.maximizeButton = null;
  this.demaximizeButton = null;
  this.deminimizeButton = null;

  this.opts = model;

  this.isWindowManagerFixed = model.frame.jsFrame.isWindowManagerFixed;

  if (model.styleDisplay) {
    this.styleDisplay = model.styleDisplay;
  }
  if (model.minimizeButton) {
    this.minimizeButton = model.minimizeButton;
  }
  if (model.deminimizeButton) {
    this.deminimizeButton = model.deminimizeButton;
  }
  if (model.maximizeButton) {
    this.maximizeButton = model.maximizeButton;
  }
  if (model.demaximizeButton) {
    this.demaximizeButton = model.demaximizeButton;
  }

  if (model.hideButton) {
    this.hideButton = model.hideButton;
  }
  if (model.hideButtons) {
    this.hideButtons = model.hideButtons;
  }

  this.maximizeParam = model.maximizeParam;
  this.demaximizeParam = model.demaximizeParam;
  this.minimizeParam = model.minimizeParam;
  this.deminimizeParam = model.deminimizeParam;
  this.hideParam = model.hideParam;
  this.dehideParam = model.dehideParam;

  if (model.horizontalAlign) {
    this.horizontalAlign = model.horizontalAlign;
  }
  if (model.verticalAlign) {
    this.verticalAlign = model.verticalAlign;
  }

  this.animationEnabled = false;
  this.animationDuration = 100;
  this.frame = model.frame;
  this.hideFrameBorder = true;
  this.hideTitleBar = true;

  this.restoreKey = null;
  this.restoreDuration = null;
  this.restoreCallback = null;

  this.statsStore = {};

  if (model.animation) {
    this.animationEnabled = model.animation;
  }
  if (model.animationDuration) {
    this.animationDuration = model.animationDuration;
  }
  this.eventListeners = {};

  //If the user changes the window size when the window is maximized state,
  // adjust the size so that window looks maximized.
  this.resizeListener = this.handleOnResize.bind(this);

  if (this.maximizeParam && this.maximizeParam.matchParent) {
    this.resizeListener = this.handleOnVirtualResize.bind(this);
  }
}

WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR = "__jsframe-mp-marker";

WindowEventHelper.prototype.on = function (eventType, callback) {
  var me = this;
  me.eventListeners[eventType] = callback;
};

//---------------------------------------------------------------------------------------------------------------------
WindowEventHelper.prototype.doMaximize = function (model) {
  var me = this;

  if (me.windowMode === "hid") {
    throw Error(
      "[JSrame] It is not possible to change directly from the hid state to the maximized state",
    );
    return;
  }

  if (me.windowMode === "maximized" || me.windowMode === "maximizing") {
    // If it's already 'maximized' status, it doesn't do anything.
    return;
  }

  me.windowMode = "maximizing";

  var frame = me.frame;

  if (model && model.matchParent) {
    // The div element does not issue the resize event. Furthermore,
    // div is specified as 100%, so style.width is always 100%.
    // So I want to get the clientWidth but I can't get it with mutationObserver.
    // Therefore, we adopt a mechanism to catch the parent window
    // resize event and change the attribute of the parent window content
    // by differentiation to catch it.
    var windowManager = frame.getWindowManager();
    var parentElement = windowManager.getParentElement();

    if (!me.matchParentResizeObserver) {
      var matchParentResizeObserver = new MutationObserver(function () {
        // console.log("on virtual resize");
        me.resizeListener();
      });
      matchParentResizeObserver.observe(parentElement, {
        attributeFilter: [WindowEventHelper.MATCH_PARENT_CHANGE_MARKER_ATTR],
        attributes: true,
      });
      me.matchParentResizeObserver = matchParentResizeObserver;
    }
  } //set onresize listener
  //window.addEventListener('resize', me.resizeListener);
  else if (
    !me.eventListenerHelper.hasEventListener(
      window,
      "resize",
      "window-resize-listener",
    )
  ) {
    me.eventListenerHelper.addEventListener(
      window,
      "resize",
      me.resizeListener,
      { listenerName: "window-resize-listener" },
    );
  }

  //Remember the status of the window before maximizing the window size
  me.saveCurrentWindowStats("maximize_mode");

  me.hideTitleBar = model ? model.fullScreen : false;

  if (me.hideTitleBar) {
    //Hide only the currently visible FrameComponent
    //ウィンドウのモードを変更する前の今の状態で可視状態にあるフレームコンポーネント（閉じるボタン類）を不可視にする
    //(タイトルバー非表示の場合には最大化するときのアニメーションでフレームコンポーネントを見せないようにする)
    frame.hideAllVisibleFrameComponents();

    //またhideAllVisibleFrameComponentを実施するときに、個別のhideFrameComponentやshowFrameComponentを実行すると
    //管理ステートが破綻するため、タイトルバー非表示の場合はどうせ操作できないということもあり
    //hideFrameComponent や showFrameComponentは実行しない
  } else {
    //Process required for maximization
    if (me.maximizeButton) {
      frame.hideFrameComponent(me.maximizeButton);
    }
    if (me.demaximizeButton) {
      frame.showFrameComponent(me.demaximizeButton, me.styleDisplay);
    }
  }

  frame.setMovable(false);
  frame.setResizable(false);

  if (model && model.restoreKey) {
    me.restoreKey = model.restoreKey;
  }
  if (model && model.restoreDuration) {
    me.restoreDuration = model.restoreDuration;
  }
  if (model && model.restoreCallback) {
    me.restoreCallback = model.restoreCallback;
  }
  //Render maximization itself
  me.renderMaximizedMode({
    animation: me.animationEnabled,
    callback: (model && model.callback) ? model.callback : null, //set maximized finished callback
    duration: (model && model.duration) ? model.duration : null,
    matchParent: (model && model.matchParent) ? model.matchParent : false,
  });
};

/**
 * Render window as a maximized mode( full screen )
 */
WindowEventHelper.prototype.renderMaximizedMode = function (model) {
  var me = this;
  var frame = me.frame;
  var from = me.loadWindowStats("maximize_mode");

  var _toX = 0;
  var _toY = 0;
  var _toWidth = 0;
  var _toHeight = 0;

  //compute position and size[begin]
  if (me.hideTitleBar) {
    _toX = 0;
    _toY = -from.titleBarHeight;
  }

  var parentWidth = window.innerWidth;
  var parentHeight = window.innerHeight;

  if (model.matchParent) {
    // If matchParent is specified
    // When maximizing, use the size of parentElement specified at initialization
    // ParentlElement is often used only for adjusting the display order.
    // Therefore, only if matchParent is specified, match the size of parentElement
    var windowManager = frame.getWindowManager();
    var parentElement = windowManager.getParentElement();
    parentWidth = parentElement.clientWidth;
    parentHeight = parentElement.clientHeight;
  }

  if (me.hideFrameBorder) {
    _toWidth = parentWidth;
    _toHeight = parentHeight + (me.hideTitleBar ? from.titleBarHeight : 0);
  } else {
    _toWidth = parentWidth - from.frameBorderWidthDefault * 2;
    _toHeight = parentHeight - from.frameBorderWidthDefault * 2 +
      (me.hideTitleBar ? from.titleBarHeight : 0);
  }
  //compute position and size[end]

  if (me.horizontalAlign == "right") {
    _toX = -_toWidth;
  }
  if (me.verticalAlign == "bottom") {
    _toY = -_toHeight;
  }

  //render position and size[begin]
  var funcDoRender = function (opt) {
    var disableCallback = opt && opt.disableCallback;

    frame.setPosition(_toX, _toY);

    if (me.hideFrameBorder) {
      frame.frameBorderWidthDefault = 0;
      frame.frameBorderWidthFocused = 0;
      frame.htmlElement.style.borderWidth = "0px";
    }
    frame.setSize(_toWidth, _toHeight, true);

    if (disableCallback) {
      return;
    }

    if (me.hideTitleBar) {
      // when full screen mode(means hidden title bar)

      if (me.restoreKey) {
        me.keyListener = function (event) {
          if (event.code === me.restoreKey) {
            me.doCommand("restore");
          }
        };
      }
      window.addEventListener("keydown", me.keyListener);

      //add keylistener for inside the iframe
      if (frame.iframe) {
        frame.iframe.contentWindow.addEventListener("keydown", me.keyListener);
      }
    }

    me.windowMode = "maximized";

    if (model && model.callback) {
      model.callback(me.frame, { eventType: "maximized" });
    }
    if (me.eventListeners["maximized"]) {
      me.eventListeners["maximized"](me.frame, { eventType: "maximized" });
    }
  }; // end of funcDoRender

  if (model && model.animation) {
    me.animateFrame({
      frame: frame,
      from: from,
      to: {
        left: _toX,
        top: _toY,
        width: _toWidth,
        height: _toHeight,
      },
      duration: model.duration ? model.duration : me.animationDuration,
      callback: funcDoRender,
    });
  } else {
    if (model && model.caller === "handleOnResize") {
      funcDoRender({ disableCallback: true });
    } else {
      funcDoRender();
    }
  }
  //render position and size[end]
};

WindowEventHelper.prototype.getWindowMode = function () {
  return this.windowMode;
};
/**
 * Restore window from maximized mode
 */
WindowEventHelper.prototype.doDemaximize = function (model) {
  var me = this;
  var frame = me.frame;

  if (me.windowMode === "hid") {
    //console.error('demaximize(=recovery from maximized) cannot be performed in hid state.');
    throw Error(
      "[JSFrame] demaximize(=recovery from maximized) cannot be performed in hid state.",
    );
    return;
  }

  if (!me.hasWindowStats("maximize_mode")) {
    return;
  }

  if (me.hideTitleBar) {
  } else {
    if (me.maximizeButton) {
      frame.showFrameComponent(me.maximizeButton, me.styleDisplay);
    }
    if (me.demaximizeButton) {
      frame.hideFrameComponent(me.demaximizeButton);
    }
  }

  me.restoreWindow({
    restorePosition: true,
    restoreMode: "maximize_mode",
    animation: me.animationEnabled,
    callback: (model && model.callback) ? model.callback : null,
    forceShowFrameComponents: (me.animationEnabled && me.hideTitleBar),
    duration: (model && model.duration) ? model.duration : null,
    eventType: "demaximized",
  });
};

/**
 * Called when changing the window size by user operation in maximized mode
 */
WindowEventHelper.prototype.handleOnResize = function () {
  var me = this;
  me.renderMaximizedMode({
    caller: "handleOnResize",
    //matchParent: true
  });
};
WindowEventHelper.prototype.handleOnVirtualResize = function () {
  var me = this;
  me.renderMaximizedMode({
    caller: "handleOnResize",
    matchParent: true,
  });
};

//---------------------------------------------------------------------------------------------------------------------

/**
 * Make window minimized mode
 */
WindowEventHelper.prototype.doMinimize = function (model) {
  var me = this;

  if (me.windowMode === "minimized" || me.windowMode === "minimizing") {
    // If it's already 'minimized' status, it doesn't do anything.
    return;
  }

  me.windowMode = "minimizing";

  var frame = me.frame;

  //Remember the stats of the window before maximizing the window
  me.saveCurrentWindowStats("minimize_mode");

  frame.setResizable(false);

  me.renderMinimizedMode({
    animation: me.animationEnabled,
    callback: (model && model.callback) ? model.callback : null,
    duration: (model && model.duration) ? model.duration : null,
    toWidth: (model && model.toWidth) ? model.toWidth : null,
  });
};

/**
 * Render window as minimized mode
 */
WindowEventHelper.prototype.renderMinimizedMode = function (model) {
  var me = this;
  var frame = me.frame;
  var ri = me.loadWindowStats("minimize_mode");

  var from = me.getCurrentWindowStats();
  var to = me.getCurrentWindowStats();

  to.height = ri.titleBarHeight;
  if (model && model.toWidth) {
    to.width = model.toWidth;
  }

  var funcDoRender = function () {
    var forceSetSize = true;
    frame.setSize(to.width, to.height, forceSetSize);

    me.windowMode = "minimized";

    if (me.minimizeButton) {
      frame.hideFrameComponent(me.minimizeButton);
    }

    if (me.deminimizeButton) {
      frame.showFrameComponent(me.deminimizeButton, me.styleDisplay);
    }

    if (model.callback) {
      model.callback(me.frame, { eventType: "minimized" });
    }
    if (me.eventListeners["minimized"]) {
      me.eventListeners["minimized"](me.frame, { eventType: "minimized" });
    }
  };

  if (model && model.animation) {
    me.animateFrame({
      toAlpha: 1.0,
      duration: model.duration ? model.duration : me.animationDuration,
      frame: frame,
      from: from,
      to: to,
      callback: funcDoRender,
    });
  } else {
    funcDoRender();
  }
};

/**
 * Restore window from minimized mode
 */
WindowEventHelper.prototype.doDeminimize = function (model) {
  var me = this;

  var frame = me.frame;

  if (!me.hasWindowStats("minimize_mode")) {
    return;
  }

  if (me.minimizeButton) {
    frame.showFrameComponent(me.minimizeButton, me.styleDisplay);
  }
  if (me.deminimizeButton) {
    frame.hideFrameComponent(me.deminimizeButton);
  }

  me.restoreWindow(
    {
      restorePosition: false,
      restoreMode: "minimize_mode",
      animation: me.animationEnabled,
      duration: (model && model.duration) ? model.duration : null,
      callback: (model && model.callback) ? model.callback : null,
      eventType: "deminimized",
    },
  );
};

//---------------------------------------------------------------------------------------------------------------------
/**
 * Make window hidden mode
 */
WindowEventHelper.prototype.doHide = function (model) {
  var me = this;

  if (me.windowMode === "hid" || me.windowMode === "hiding") {
    // If it's already 'hid' status, it doesn't do anything.
    return;
  }

  me.windowMode = "hiding";

  var frame = me.frame;

  //Remember the stats of the window before maximizing the window
  me.saveCurrentWindowStats("hide_mode");

  frame.setResizable(false);

  var arg = {
    //    silent: model.silent,
    animation: me.animationEnabled,
    // duration: (model && model.duration) ? model.duration : null,
    // callback: (model && model.callback) ? model.callback : null,
    // align: (model && model.align) ? model.align : null,
    // offset: (model && model.align) ? model.offset : null,
  };
  if (model) {
    mergeDeeply({ op: "overwrite-merge", object1: arg, object2: model });
  }
  me.renderHideMode(arg);
};

/**
 * Render window as hidden mode
 */
WindowEventHelper.prototype.renderHideMode = function (model) {
  var me = this;
  var frame = me.frame;
  var ri = me.loadWindowStats("hide_mode");

  var from = me.getCurrentWindowStats();

  var offset = { x: 0, y: 0 };
  var toElement = model.toElement;

  if (model.offset) {
    offset = model.offset;
  }

  var left = 0;
  var top = 0;
  {
    var align = (model && model.align) ? model.align : "LEFT_TOP";

    if (!align || CALIGN.LEFT_TOP == align) {
      left = from.left;
      top = from.top;
    } else if (CALIGN.HCENTER_TOP == align) {
      left = from.left + from.width / 2;
      top = from.top;
    } else if (CALIGN.RIGHT_TOP == align) {
      left = from.left + from.width;
      top = from.top;
    } else if (CALIGN.LEFT_VCENTER == align) {
      left = from.left;
      top = from.top + from.height / 2;
    } else if (CALIGN.HCENTER_VCENTER == align) {
      left = from.left + from.width / 2;
      top = from.top + from.height / 2;
    } else if (CALIGN.RIGHT_VCENTER == align) {
      left = from.left + from.width;
      top = from.top + from.height / 2;
    } else if (CALIGN.LEFT_BOTTOM == align) {
      left = from.left;
      top = from.top + from.height;
    } else if (CALIGN.HCENTER_BOTTOM == align) {
      left = from.left + from.width / 2;
      top = from.top + from.height;
    } else if (CALIGN.RIGHT_BOTTOM == align) {
      left = from.left + from.width;
      top = from.top + from.height;
    } else if ("ABSOLUTE" == align) {
      if (toElement) {
        var elementRect = toElement.getBoundingClientRect();
        if (me.isWindowManagerFixed) {
          left = elementRect.left;
          top = elementRect.top;
        } else {
          left = elementRect.left + window.pageXOffset;
          top = elementRect.top + window.pageYOffset;
        }
      } else {
        left = offset.x;
        top = offset.y;
      }
    }
  }

  var to = {
    left: left,
    top: top,
    width: 0,
    //minimum height must be titleBarHeight
    height: ri.titleBarHeight,
  };

  var funcDoRender = function () {
    var forceSetSize = true;
    frame.setSize(to.width, to.height, forceSetSize);
    //frame.hide();

    me.windowMode = "hid";

    if (model && model.callback) {
      model.callback(me.frame, { eventType: "hid" });
    }
    if (me.eventListeners["hid"]) {
      me.eventListeners["hid"](me.frame, { eventType: "hid" });
    }
  };

  //Hide only the currently visible FrameComponent
  frame.hideAllVisibleFrameComponents();

  if (model && model.animation) {
    me.animateFrame({
      fromAlpha: model.silent ? 0 : 1.0,
      toAlpha: 0,
      ease: true,
      duration: model.duration ? model.duration : me.animationDuration,
      frame: frame,
      from: from,
      to: to,
      callback: funcDoRender,
    });
  } else {
    funcDoRender();
  }
};

/**
 * Restore window from hided mode
 */
WindowEventHelper.prototype.doDehide = function (model) {
  var me = this;
  var frame = me.frame;

  if (!me.hasWindowStats("hide_mode")) {
    return;
  }

  me.restoreWindow(
    {
      duration: (model && model.duration) ? model.duration : null,
      restorePosition: true,
      restoreMode: "hide_mode",
      animation: me.animationEnabled,
      forceShowFrameComponents: true,
      callback: (model && model.callback) ? model.callback : null,
      eventType: "dehided",
    },
  );
};
//---------------------------------------------------------------------------------------------------------------------
WindowEventHelper.prototype.loadWindowStats = function (storeKeyName) {
  var me = this;
  return me.statsStore[storeKeyName];
};

/**
 * Remember the status of the window before maximizing or minimizing the window size
 * @param storeKeyName
 * @returns {boolean} Returns true if the status of the window has been updated or is a new status.
 * Returns false if the status has not been updated.
 */
WindowEventHelper.prototype.saveCurrentWindowStats = function (storeKeyName) {
  var me = this;

  var crrWindowStats = me.getCurrentWindowStats();

  if (me.hasWindowStats(storeKeyName)) {
    var storedStats = me.loadWindowStats(storeKeyName);
    var isWindowStatsUpdated = !me.windowStatsEquals(
      crrWindowStats,
      storedStats,
    );

    if (isWindowStatsUpdated) {
      me.statsStore[storeKeyName] = crrWindowStats;
    }

    return isWindowStatsUpdated;
  } else {
    me.statsStore[storeKeyName] = crrWindowStats;
    return true;
  }
};

WindowEventHelper.prototype.windowStatsEquals = function (
  windowStats1,
  windowStats2,
) {
  if (windowStats1 && windowStats2) {
    var result = JSON.stringify(windowStats1) === JSON.stringify(windowStats2);
    return result;
  } else {
    return false;
  }
};

WindowEventHelper.prototype.clearWindowStats = function (storeKeyName) {
  var me = this;
  me.statsStore[storeKeyName] = null;
};

WindowEventHelper.prototype.hasWindowStats = function (storeKeyName) {
  var me = this;
  return me.statsStore[storeKeyName];
};

WindowEventHelper.prototype.getCurrentWindowStats = function () {
  var me = this;
  var frame = me.frame;

  //Acquire window's stats
  var __titleBarHeight = parseInt(frame.titleBar.style.height, 10);
  var __frameBorderWidthDefault = frame.frameBorderWidthDefault; // parseInt(frame.htmlElement.style.borderWidth, 10);
  var __frameBorderWidthFocused = frame.frameBorderWidthFocused;
  var __left = frame.getLeft();
  var __top = frame.getTop();
  var __width = frame.getWidth();
  var __height = frame.getHeight();
  var __resizable = frame.resizable;
  var __movable = frame.movable;

  return {
    left: __left,
    top: __top,
    width: __width,
    height: __height,
    titleBarHeight: __titleBarHeight,
    frameBorderWidthDefault: __frameBorderWidthDefault,
    frameBorderWidthFocused: __frameBorderWidthFocused,
    resizable: __resizable,
    movable: __movable,
  };
};

/**
 * Restore the state of the window
 * @param model
 */
WindowEventHelper.prototype.restoreWindow = function (model) {
  var me = this;
  var frame = me.frame;
  var to = me.loadWindowStats(model.restoreMode);
  //現在の状態を一時保存する
  //me.saveCurrentWindowStats('temp');
  var crr = me.getCurrentWindowStats(); //loadWindowStats('temp');

  //以下の3つは、ボーダーを太さを変更するためのものだが
  // funcDoRender内で処理してしまうとアニメーション中にはボーダーが描かれなくなる
  //アニメーション中にはボーダーは復活していたほうが自然なのでfuncDoRender外で実行する
  frame.frameBorderWidthDefault = to.frameBorderWidthDefault;
  frame.frameBorderWidthFocused = to.frameBorderWidthFocused;
  frame.htmlElement.style.borderWidth = frame.frameBorderWidthFocused;

  var funcDoRender = function () {
    if (model && model.restorePosition == false) {
      //位置の移動を伴わない場合（最小化から戻すときなど)
      to.left = crr.left;
      to.top = crr.top;
    }

    frame.setPosition(to.left, to.top);

    var force = true;
    frame.setSize(to.width, to.height, force);

    frame.setResizable(to.resizable);
    frame.setMovable(to.movable);

    me.clearWindowStats(model.restoreMode);

    if (me.keyListener) {
      //タイトルバー無し最大化状態から戻すためのキーリスナーは削除する

      window.removeEventListener("keydown", me.keyListener);
      if (frame.iframe) {
        frame.iframe.contentWindow.removeEventListener(
          "keydown",
          me.keyListener,
        );
      }
      me.keyListener = null;
    }

    me.windowMode = "default";

    if (model && model.forceShowFrameComponents) {
      //ウィンドウのモード変更前に可視状態にあったフレームコンポーネント（閉じるボタン類）を可視状態にする
      frame.showAllVisibleFrameComponents();
    }

    frame.show();

    var eventType = "restored";
    if (model && model.eventType) {
      eventType = model.eventType;
    }

    if (model && model.callback) {
      model.callback(
        me.frame,
        { eventType: eventType },
      );
    }
    if (me.eventListeners[eventType]) {
      me.eventListeners[eventType](me.frame, { eventType: eventType });
    }
  };

  if (model && model.animation) {
    me.animateFrame({
      duration: model.duration ? model.duration : me.animationDuration,
      frame: frame,
      fromAlpha: 0,
      toAlpha: 1,
      from: crr,
      to: to,
      callback: funcDoRender,
    });
  } else {
    funcDoRender();
  }

  //window.removeEventListener('resize', me.resizeListener);
  me.eventListenerHelper.removeEventListener(
    window,
    "resize",
    me.resizeListener,
  );
  if (me.matchParentResizeObserver) {
    me.matchParentResizeObserver.disconnect();
    me.matchParentResizeObserver = null;
  }
};

WindowEventHelper.prototype.animateFrame = function (model) {
  var me = this;
  var needRequestFocusAfterAnimation = false;

  var fromAlpha = !isNaN(model.fromAlpha) ? model.fromAlpha : 1.0;

  var from = model.from;
  var to = model.to;

  var animator = new CSimpleLayoutAnimator();

  animator.set(model.frame)
    .setDuration(model.duration ? model.duration : me.animationDuration)
    .fromPosition(from.left, from.top, "LEFT_TOP")
    .toPosition(to.left, to.top, "LEFT_TOP")
    .fromWidth(from.width)
    .fromHeight(from.height)
    .toWidth(to.width)
    .toHeight(to.height)
    .fromAlpha(fromAlpha)
    .toAlpha((model.toAlpha == 0) ? 0 : 1.0)
    .ease(model.ease)
    .start(0, needRequestFocusAfterAnimation)
    .then(function (animatorObj) {
      model["callback"]();
    });
};

/**
 * Perform complex windowing with simple commands
 * @param cmd
 * @param opt
 */
WindowEventHelper.prototype.doCommand = function (cmd, opt) {
  var me = this;

  if (cmd === "maximize") {
    me._defaultFunctionMaximize(me.frame);
  }
  if (cmd === "demaximize") {
    me._defaultFunctionDemaximize(me.frame);
  }
  if (cmd === "restore") {
    me._defaultFunctionRestoreFromFullscreen(me.frame);
  }
  if (cmd === "minimize") {
    me._defaultFunctionMinimize(me.frame);
  }
  if (cmd === "deminimize") {
    me._defaultFunctionDeminimize(me.frame);
  }
  if (cmd === "hide") {
    me._defaultFunctionHide(me.frame);
  }
  if (cmd === "dehide") {
    me._defaultFunctionDehide(me.frame);
  }
};

WindowEventHelper.prototype._defaultFunctionMaximize = function (_frame, evt) {
  var me = this;
  var model = me.opts;

  var param = {
    // DEPRECATED: maximizeWithoutTitleBar is deprecated
    // USE maximizeParam.fullScreen
    fullScreen: (model.maximizeWithoutTitleBar === true) ? true : false,

    // DEPRECATED: model.restoreKey is deprecated
    // USE maximizeParam.restoreKey

    // If you want to use the key input instead of the title bar,
    // you can specify the key because it is not possible
    // to recover with the button when hiding the title bar.
    restoreKey: model.restoreKey ? model.restoreKey : "Escape",

    // DEPRECATED: model.restoreDuration is deprecated
    // USE maximizeParam.restoreDuration
    restoreDuration: model.restoreDuration,
  };

  if (this.maximizeParam) {
    // write maximizeParam into param
    mergeDeeply(
      { op: "overwrite-merge", object1: param, object2: this.maximizeParam },
    );
  }

  //ウィンドウを最大化する
  _frame.control.doMaximize(param);
};

WindowEventHelper.prototype._defaultFunctionDemaximize = function (
  _frame,
  evt,
) {
  _frame.control.doDemaximize(
    {},
  );
};

WindowEventHelper.prototype._defaultFunctionRestoreFromFullscreen = function (
  _frame,
  evt,
) {
  var me = this;
  _frame.control.doDemaximize({
    duration: me.restoreDuration ? me.restoreDuration : null,
    callback: me.restoreCallback ? me.restoreCallback : null,
  });
};

WindowEventHelper.prototype._defaultFunctionMinimize = function (_frame, evt) {
  //'minimizeButton'が押されたときに、最小化したい場合
  _frame.control.doMinimize(this.minimizeParam);
};

WindowEventHelper.prototype._defaultFunctionDeminimize = function (
  _frame,
  evt,
) {
  _frame.control.doDeminimize(this.deminimizeParam);
};

WindowEventHelper.prototype._defaultFunctionHide = function (_frame, evt) {
  var param = {
    align: "CENTER_BOTTOM",
  };
  if (this.hideParam) {
    param = this.hideParam;
  }
  _frame.control.doHide(param);
};

WindowEventHelper.prototype._defaultFunctionDehide = function (_frame, evt) {
  var me = this;
  _frame.control.doDehide(me.dehideParam);
};

WindowEventHelper.prototype.setupDefaultEvents = function () {
  var me = this;

  if (me.maximizeButton) {
    //イベントはオーバーライドされる
    me.frame.on(
      me.maximizeButton,
      "click",
      me._defaultFunctionMaximize.bind(me),
    );
  }

  if (me.demaximizeButton) {
    me.frame.on(
      me.demaximizeButton,
      "click",
      me._defaultFunctionDemaximize.bind(me),
    );
  }

  if (me.minimizeButton) {
    me.frame.on(
      me.minimizeButton,
      "click",
      me._defaultFunctionMinimize.bind(me),
    );
  }

  if (me.deminimizeButton) {
    me.frame.on(
      me.deminimizeButton,
      "click",
      me._defaultFunctionDeminimize.bind(me),
    );
  }

  if (me.hideButton) {
    me.frame.on(me.hideButton, "click", me._defaultFunctionHide.bind(me));
  }

  if (me.hideButtons) {
    for (var key in me.hideButtons) {
      var hideButton = me.hideButtons[key];
      if (hideButton) {
        me.frame.on(hideButton, "click", me._defaultFunctionHide.bind(me));
      }
    }
  }
};

module.exports = WindowEventHelper;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.js");
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uLi9ub2RlX21vZHVsZXMvQHJpdmVyc3VuL2V2ZW50LWVtaXR0ZXIvbGliL2V2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4uL25vZGVfbW9kdWxlcy9ldmVudC1saXN0ZW5lci1oZWxwZXIvbGliL2V2ZW50LWxpc3RlbmVyLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi4vbm9kZV9tb2R1bGVzL21lcmdlLWRlZXBseS9saWIvbWVyZ2UtZGVlcGx5LmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9KU0ZyYW1lLmNzcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlTWF0ZXJpYWwuY3NzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVQb3B1cC5jc3MiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVJlZHN0b25lLmNzcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlWW9zZW1pdGUuY3NzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL0pTRnJhbWUuY3NzPzZiZWQiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzcz9iM2U5Iiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVQb3B1cC5jc3M/OGE3OCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlUmVkc3RvbmUuY3NzPzZkYmQiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVlvc2VtaXRlLmNzcz9jZWM1Iiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvQ0NvbW1vbi5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvSlNGcmFtZS5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvYXBwZWFyYW5jZS9DQnV0dG9uQXBwZWFyYW5jZS5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvYXBwZWFyYW5jZS9DQ2hpbGRNZW51QXBwZWFyYW5jZS5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvYXBwZWFyYW5jZS9DRG9tUGFydHNCdWlsZGVyLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9hcHBlYXJhbmNlL0NGcmFtZUFwcGVhcmFuY2UuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL2FwcGVhcmFuY2UvQ0ZyYW1lQ29tcG9uZW50LmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9hcHBlYXJhbmNlL0NJbWFnZUJ1dHRvbkFwcGVhcmFuY2UuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVNYXRlcmlhbC5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlUG9wdXAuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVJlZHN0b25lLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVUb2FzdC5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlWW9zZW1pdGUuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3ByZXNldHMvd2luZG93L1ByZXNldFdpbmRvd1lvc2VtaXRlLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS8uL3NyYy91dGlscy9DU2ltcGxlTGF5b3V0QW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3V0aWxzL0NUaW1lci5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvdXRpbHMvSW5oZXJpdC5qcyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvLi9zcmMvdXRpbHMvT2JqZWN0QXNzaWduZXIuanMiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lLy4vc3JjL3V0aWxzL1dpbmRvd0V2ZW50SGVscGVyLmpzIiwid2VicGFjazovL0B6ZWR2aXNpb24vanNmcmFtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vQHplZHZpc2lvbi9qc2ZyYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AemVkdmlzaW9uL2pzZnJhbWUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7O0FDVkE7QUFDQSxlQUFlLEtBQWlELG9CQUFvQixDQUFzSSxDQUFDLGtCQUFrQixZQUFZLGFBQWEsT0FBTyxjQUFjLGdCQUFnQixtQkFBbUIsNkJBQTZCLG1CQUFtQixzRUFBc0UsNEJBQTRCLElBQUksaUNBQWlDLDJEQUEyRCxPQUFPLFNBQVMsU0FBUyxRQUFRLElBQUksOEJBQThCLFFBQVEsY0FBYyxTQUFTLDBCQUEwQixpS0FBaUssR0FBRyxnQkFBZ0IsTUFBTSx5REFBeUQsZ0VBQWdFLFNBQVMsdUJBQXVCLE9BQU8saUJBQWlCLG9CQUFvQixRQUFRLEVBQUUsc0JBQXNCLGVBQWUsUUFBUSxNQUFNLDZKQUE2SixnQkFBZ0IsT0FBTyxhQUFhLHVCQUF1QixjQUFjLGVBQWUsa0JBQWtCLGVBQWUsU0FBUyxjQUFjLElBQUksOEJBQThCLFFBQVEsZ0JBQWdCLGdCQUFnQixNQUFNLG9DQUFvQyxvREFBb0QsZ0xBQWdMLGdCQUFnQixvQ0FBb0MsMkJBQTJCLElBQUksY0FBYyxTQUFTLGdCQUFnQiw4RUFBOEUsZ0JBQWdCLFlBQVksV0FBVyxLQUFLLFdBQVcsK0dBQStHLGtCQUFrQix1Q0FBdUMsT0FBTyxjQUFjLEVBQUUsaUJBQWlCLGNBQWMsb0VBQW9FLGFBQWEsSUFBSSxVQUFVLGdCQUFnQixFQUFFLHNCQUFzQiwyQkFBMkIsU0FBUyxPQUFPLFFBQVEsT0FBTyxzREFBc0QsYUFBYSw2QkFBNkIsOEJBQThCLDZJQUE2SSxXQUFXLEtBQUssdUJBQXVCLFVBQVUsMkNBQTJDLElBQUksRUFBRSx5Q0FBeUMsOEJBQThCLHdCQUF3QixFQUFFLGlDQUFpQyxnQ0FBZ0MsaUVBQWlFLEVBQUUsNkJBQTZCLGlDQUFpQyxFQUFFLCtCQUErQiw4QkFBOEIseUNBQXlDLGdDQUFnQyx5Q0FBeUMsbUNBQW1DLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxtQkFBbUIsU0FBUyxPQUFPLFFBQVEsUUFBUSxFQUFFLHVDQUF1QyxTQUFTLHdDQUF3Qyw4QkFBOEIsY0FBYyxtQkFBbUIsR0FBRyx1Q0FBdUMsSUFBSSxVQUFVLGdCQUFnQixFQUFFLDJDQUEyQyw4QkFBOEIsY0FBYyxzRkFBc0YsOEJBQThCLEVBQUUsUUFBUSxTQUFTLE9BQU8sUUFBUSxNQUFNLFVBQVUsRUFBRSx5Q0FBeUMsNEJBQTRCLDhCQUE4QixtQ0FBbUMsbUNBQW1DLElBQUksVUFBVSxnQkFBZ0IsRUFBRSx5Q0FBeUMsU0FBUyxPQUFPLFFBQVEsTUFBTSxVQUFVLEVBQUUsZ0NBQWdDLHFDQUFxQyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsb0JBQW9CLFNBQVMsT0FBTyxRQUFRLE1BQU0seUJBQXlCLHVDQUF1QyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsb0JBQW9CLFNBQVMsT0FBTyxRQUFRLE1BQU0sdURBQXVELEVBQUUsK0NBQStDLGlHQUFpRyw4QkFBOEIsRUFBRSxnREFBZ0QsbUNBQW1DLEVBQUUsZ0RBQWdELDJEQUEyRCxXQUFXLEtBQUssOEJBQThCLFFBQVEsa0JBQWtCLEVBQUUsVUFBVSxLQUFLLGdCQUFnQixhQUFhLGdDQUFnQyxhQUFhLGdDQUFnQyx1QkFBdUIsRUFBRSx1Q0FBdUMsMkJBQTJCLEVBQUUsdUNBQXVDLG9DQUFvQyxFQUFFLHdDQUF3Qyw0QkFBNEIsRUFBRSx5Q0FBeUMsOEJBQThCLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxjQUFjLCtMQUErTCxNQUFNLFNBQVMsT0FBTyxRQUFRLFFBQVEsRUFBRSx1Q0FBdUMsZ0RBQWdELEVBQUUsOENBQThDLG1CQUFtQiw4QkFBOEIsRUFBRSwrQkFBK0Isc0RBQXNELEtBQUssZ0JBQWdCLGFBQWEsdUNBQXVDLGFBQWEsZ0NBQWdDLDhCQUE4QixFQUFFLHdDQUF3QyxvQ0FBb0MsRUFBRSwwQ0FBMEMsK0JBQStCLEVBQUUseUNBQXlDLHlDQUF5QyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsY0FBYywrTEFBK0wsTUFBTSxTQUFTLE9BQU8sUUFBUSxRQUFRLEVBQUUsK0JBQStCLHNEQUFzRCxLQUFLLElBQUksTUFBTSxjQUFjLDRCQUE0QixZQUFZLFlBQVkscUNBQXFDLG1CQUFtQiwrREFBK0QsdUJBQXVCLEVBQUUsNkRBQTZELFlBQVksRzs7Ozs7Ozs7OztBQ0RyME47QUFDQSxlQUFlLEtBQWlELG9CQUFvQixDQUEySixDQUFDLGtCQUFrQixtQkFBbUIsU0FBUyxjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsdUNBQXVDLHFDQUFxQyxvQkFBb0IsRUFBRSxpQkFBaUIsNEZBQTRGLGVBQWUsd0NBQXdDLFNBQVMsRUFBRSxtQkFBbUIsOEJBQThCLHFEQUFxRCwwQkFBMEIsNkNBQTZDLHNCQUFzQiw2REFBNkQsWUFBWSxlQUFlLFNBQVMsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELGtCQUFrQixrQkFBa0IsZUFBZSxpQkFBaUIsYUFBYSxjQUFjLGlGQUFpRixnQkFBZ0IsYUFBYSxvR0FBb0csS0FBSyxnQkFBZ0IsbUJBQW1CLDZCQUE2QixtQkFBbUIsc0VBQXNFLDRCQUE0QixJQUFJLGlDQUFpQywyREFBMkQsT0FBTyxTQUFTLFNBQVMsUUFBUSxJQUFJLDhCQUE4QixRQUFRLGNBQWMsU0FBUywwQkFBMEIsaUtBQWlLLEdBQUcsZ0JBQWdCLE1BQU0seURBQXlELGdFQUFnRSxTQUFTLHVCQUF1QixPQUFPLGlCQUFpQixvQkFBb0IsUUFBUSxFQUFFLHNCQUFzQixlQUFlLFFBQVEsTUFBTSw2SkFBNkosZ0JBQWdCLE9BQU8sYUFBYSx1QkFBdUIsY0FBYyxlQUFlLGtCQUFrQixlQUFlLFNBQVMsY0FBYyxJQUFJLDhCQUE4QixRQUFRLGdCQUFnQixnQkFBZ0IsTUFBTSxvQ0FBb0Msb0RBQW9ELGdMQUFnTCxnQkFBZ0Isb0NBQW9DLDJCQUEyQixJQUFJLGNBQWMsU0FBUyxnQkFBZ0IsWUFBWSxXQUFXLEtBQUssV0FBVywrR0FBK0csbUNBQW1DLFNBQVMsR0FBRyxpQkFBaUIsYUFBYSxlQUFlLDhFQUE4RSw4REFBOEQsVUFBVSxnQkFBZ0IsK0NBQStDLGtCQUFrQiwySEFBMkgsNEJBQTRCLFdBQVcsc0NBQXNDLFdBQVcsMERBQTBELHVDQUF1QyxFQUFFLE9BQU8sOEJBQThCLHNEQUFzRCx1Q0FBdUMsa0RBQWtELGVBQWUsdUNBQXVDLG9IQUFvSCxTQUFTLG9DQUFvQyxtQkFBbUIsS0FBSywyQ0FBMkMsUUFBUSw0QkFBNEIsb0NBQW9DLHVDQUF1QyxVQUFVLEVBQUUsa0RBQWtELDJFQUEyRSx5SEFBeUgsNEJBQTRCLFdBQVcsc0NBQXNDLE9BQU8sbUNBQW1DLG9DQUFvQyxzR0FBc0csZUFBZSxtSEFBbUgsTUFBTSxlQUFlLGlJQUFpSSwySkFBMkosWUFBWSw2REFBNkQsNERBQTRELE1BQU0sNENBQTRDLHFGQUFxRixnUkFBZ1IsVUFBVSxFQUFFLDRDQUE0Qyx3RkFBd0YsRUFBRSw0Q0FBNEMscUJBQXFCLHdEQUF3RCxvREFBb0QsV0FBVyxhQUFhLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxjQUFjLGdDQUFnQyxTQUFTLE9BQU8sUUFBUSxPQUFPLE1BQU0sRUFBRSxtREFBbUQsNENBQTRDLGVBQWUsYUFBYSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsd0RBQXdELElBQUksVUFBVSxnQkFBZ0IsRUFBRSxjQUFjLHVDQUF1QyxTQUFTLE9BQU8sUUFBUSxNQUFNLG9CQUFvQix3QkFBd0IsR0FBRyxTQUFTLE9BQU8sUUFBUSxNQUFNLFVBQVUsRUFBRSxzREFBc0QsMkVBQTJFLDRDQUE0QyxlQUFlLGVBQWUsZUFBZSxzQkFBc0IsSUFBSSxVQUFVLGdCQUFnQixFQUFFLDhDQUE4QyxXQUFXLFNBQVMsT0FBTyxRQUFRLE1BQU0sVUFBVSxFQUFFLDZDQUE2Qyx5RUFBeUUsdUNBQXVDLGtCQUFrQixlQUFlLGtCQUFrQiwrQ0FBK0MsVUFBVSxFQUFFLDRDQUE0QywyRUFBMkUsdUNBQXVDLGVBQWUsZUFBZSx5QkFBeUIsRUFBRSw2Q0FBNkMseUVBQXlFLHVDQUF1QyxlQUFlLGVBQWUsZUFBZSxlQUFlLFdBQVcsRUFBRSw4Q0FBOEMsa0JBQWtCLFFBQVEsb0JBQW9CLGVBQWUsa01BQWtNLEVBQUUsOENBQThDLHFDQUFxQyxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsY0FBYyw2QkFBNkIsU0FBUyxPQUFPLFFBQVEsUUFBUSxFQUFFLDhDQUE4QywrRUFBK0Usa0NBQWtDLE1BQU0sTUFBTSxhQUFhLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxjQUFjLDhDQUE4QyxTQUFTLE9BQU8sUUFBUSxRQUFRLEtBQUssYUFBYSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsK0NBQStDLElBQUksVUFBVSxnQkFBZ0IsRUFBRSxzQkFBc0Isc0NBQXNDLFNBQVMsT0FBTyxRQUFRLFFBQVEsU0FBUyxPQUFPLFFBQVEsU0FBUyxFQUFFLCtDQUErQyxtQ0FBbUMsNERBQTRELEVBQUUsMENBQTBDLHFEQUFxRCxFQUFFLG1EQUFtRCwwQ0FBMEMsSUFBSSxVQUFVLGdCQUFnQixFQUFFLGlFQUFpRSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsZ0VBQWdFLGNBQWMsU0FBUyxPQUFPLFFBQVEsUUFBUSxTQUFTLE9BQU8sUUFBUSxNQUFNLFVBQVUsRUFBRSxxREFBcUQsYUFBYSxJQUFJLFVBQVUsZ0JBQWdCLEVBQUUsMEJBQTBCLHlCQUF5QixTQUFTLE9BQU8sUUFBUSxNQUFNLGFBQWEsRUFBRSw0Q0FBNEMseUxBQXlMLGNBQWMsMExBQTBMLDZDQUE2QyxNQUFNLEVBQUUsbUNBQW1DLHNDQUFzQyxFQUFFLCtCQUErQixzREFBc0QsaUNBQWlDLEdBQUcsV0FBVyxHOzs7Ozs7Ozs7O0FDRC9zVTtBQUNBLGVBQWUsS0FBaUQsb0JBQW9CLENBQW1JLENBQUMsa0JBQWtCLG1CQUFtQixTQUFTLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCx1Q0FBdUMscUNBQXFDLG9CQUFvQixFQUFFLGlCQUFpQiw0RkFBNEYsZUFBZSx3Q0FBd0MsU0FBUyxFQUFFLG1CQUFtQiw4QkFBOEIscURBQXFELDBCQUEwQiw2Q0FBNkMsc0JBQXNCLDZEQUE2RCxZQUFZLGVBQWUsU0FBUyxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsa0JBQWtCLGtCQUFrQixlQUFlLGlCQUFpQixhQUFhLGdCQUFnQixNQUFNLHlEQUF5RCxnRUFBZ0UsU0FBUyx1QkFBdUIsT0FBTyxpQkFBaUIsb0JBQW9CLFFBQVEsRUFBRSxzQkFBc0IsZUFBZSxRQUFRLE1BQU0sNkpBQTZKLGdCQUFnQixPQUFPLGFBQWEsdUJBQXVCLGNBQWMsZUFBZSxrQkFBa0IsZUFBZSxTQUFTLGNBQWMsSUFBSSw4QkFBOEIsUUFBUSxnQkFBZ0IsY0FBYyxtQkFBbUIsZ0NBQWdDLGlCQUFpQixpRkFBaUYsc0JBQXNCLDRKQUE0SixHQUFHLGdCQUFnQixtQkFBbUIsNkJBQTZCLG1CQUFtQixzRUFBc0UsNEJBQTRCLElBQUksaUNBQWlDLDJEQUEyRCxPQUFPLFNBQVMsU0FBUyxRQUFRLElBQUksOEJBQThCLFFBQVEsY0FBYyxTQUFTLDBCQUEwQixpS0FBaUssR0FBRyxnQkFBZ0IsTUFBTSxvQ0FBb0Msb0RBQW9ELGdMQUFnTCxnQkFBZ0Isb0NBQW9DLDJCQUEyQixJQUFJLGNBQWMsU0FBUyxjQUFjLGlGQUFpRixnQkFBZ0IsYUFBYSxvR0FBb0csS0FBSyxrQkFBa0Isa0JBQWtCLDZDQUE2Qyx5Q0FBeUMsZ0VBQWdFLGlCQUFpQiwyRUFBMkUsV0FBVyxLQUFLLHFDQUFxQyw0RUFBNEUsc0VBQXNFLEtBQUssUUFBUSx3QkFBd0Isa0JBQWtCLElBQUksVUFBVSxnQkFBZ0IsRUFBRSw4Q0FBOEMsV0FBVyxTQUFTLE9BQU8sUUFBUSxNQUFNLElBQUksaUNBQWlDLDZCQUE2QixrREFBa0QsY0FBYyxTQUFTLGNBQWMseUJBQXlCLDZIQUE2SCx3REFBd0QsTUFBTSxzRkFBc0YsV0FBVyxzRkFBc0YseUNBQXlDLEtBQUssd0ZBQXdGLGlCQUFpQiwyR0FBMkcsdUJBQXVCLDREQUE0RCxXQUFXLFlBQVksa0RBQWtELElBQUksbUNBQW1DLFNBQVMsR0FBRyxXQUFXLEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEejhKO0FBQ3NIO0FBQzdCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyx3R0FBcUM7QUFDL0Y7QUFDQSxxRUFBcUUsc0hBQXNILGlFQUFpRSw4REFBOEQseURBQXlELGtDQUFrQyxtQ0FBbUMsR0FBRywrQkFBK0Isd0xBQXdMLGlFQUFpRSw4REFBOEQseURBQXlELGtDQUFrQyxtQ0FBbUMsR0FBRyxzQ0FBc0MscUNBQXFDLG1CQUFtQixxQkFBcUIsT0FBTyxrRkFBa0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssT0FBTyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLEtBQUssb0RBQW9ELHNIQUFzSCxpRUFBaUUsOERBQThELHlEQUF5RCxrQ0FBa0MsbUNBQW1DLEdBQUcsK0JBQStCLHdMQUF3TCxpRUFBaUUsOERBQThELHlEQUF5RCxrQ0FBa0MsbUNBQW1DLEdBQUcsc0NBQXNDLHFDQUFxQyxtQkFBbUIscUJBQXFCLG1CQUFtQjtBQUNoMEU7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdkM7QUFDNEg7QUFDN0I7QUFDL0YsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLGtGQUFrRix3QkFBd0Isa0NBQWtDLG1DQUFtQyxHQUFHLDRDQUE0Qyx3QkFBd0IsbUNBQW1DLG9DQUFvQyxHQUFHLFNBQVMsaUhBQWlILFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxrRUFBa0Usd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyw0Q0FBNEMsd0JBQXdCLG1DQUFtQyxvQ0FBb0MsR0FBRyxxQkFBcUI7QUFDdjFCO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQzRIO0FBQzdCO0FBQy9GLDhCQUE4QixtRkFBMkIsQ0FBQyx3R0FBcUM7QUFDL0Y7QUFDQSwrRUFBK0Usd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyx5Q0FBeUMsd0JBQXdCLGtDQUFrQyxtQ0FBbUMsR0FBRyxTQUFTLDhHQUE4RyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsK0RBQStELHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcseUNBQXlDLHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcscUJBQXFCO0FBQ3AwQjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1B2QztBQUM0SDtBQUM3QjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsd0dBQXFDO0FBQy9GO0FBQ0Esa0ZBQWtGLHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcsNENBQTRDLHdCQUF3QixrQ0FBa0MsbUNBQW1DLEdBQUcsU0FBUyxpSEFBaUgsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGtFQUFrRSx3QkFBd0Isa0NBQWtDLG1DQUFtQyxHQUFHLDRDQUE0Qyx3QkFBd0Isa0NBQWtDLG1DQUFtQyxHQUFHLHFCQUFxQjtBQUNuMUI7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQdkM7QUFDNEg7QUFDN0I7QUFDL0YsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLGtGQUFrRixzSEFBc0gsaUVBQWlFLDhEQUE4RCx5REFBeUQsa0NBQWtDLG1DQUFtQyxHQUFHLDRDQUE0Qyx3TEFBd0wsaUVBQWlFLDhEQUE4RCx5REFBeUQsa0NBQWtDLG1DQUFtQyxHQUFHLFNBQVMsaUhBQWlILFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxLQUFLLE9BQU8sYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsa0VBQWtFLHNIQUFzSCxpRUFBaUUsOERBQThELHlEQUF5RCxrQ0FBa0MsbUNBQW1DLEdBQUcsNENBQTRDLHdMQUF3TCxpRUFBaUUsOERBQThELHlEQUF5RCxrQ0FBa0MsbUNBQW1DLEdBQUcscUJBQXFCO0FBQzFvRTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxxQkFBcUI7QUFDakU7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHFCQUFxQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDakVhOztBQUViLGlDQUFpQywySEFBMkg7O0FBRTVKLDZCQUE2QixrS0FBa0s7O0FBRS9MLGlEQUFpRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNELGtIQUFrSDs7QUFFOVosc0NBQXNDLHVEQUF1RCx1Q0FBdUMsU0FBUyxPQUFPLGtCQUFrQixFQUFFLGFBQWE7O0FBRXJMLHdDQUF3QyxnRkFBZ0YsZUFBZSxlQUFlLGdCQUFnQixvQkFBb0IsTUFBTSwwQ0FBMEMsK0JBQStCLGFBQWEscUJBQXFCLG1DQUFtQyxFQUFFLEVBQUUsY0FBYyxXQUFXLFVBQVUsRUFBRSxVQUFVLE1BQU0saURBQWlELEVBQUUsVUFBVSxrQkFBa0IsRUFBRSxFQUFFLGFBQWE7O0FBRXZlLCtCQUErQixvQ0FBb0M7O0FBRW5FO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0J5RjtBQUN6RixZQUF5Rjs7QUFFekY7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMscUZBQU87Ozs7QUFJeEIsaUVBQWUsNEZBQWMsTUFBTSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaNEQ7QUFDL0YsWUFBMkc7O0FBRTNHOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLGlHQUFPOzs7O0FBSXhCLGlFQUFlLHdHQUFjLE1BQU0sRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWjREO0FBQy9GLFlBQXdHOztBQUV4Rzs7QUFFQTtBQUNBOztBQUVBLGFBQWEsMEdBQUcsQ0FBQyw4RkFBTzs7OztBQUl4QixpRUFBZSxxR0FBYyxNQUFNLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1o0RDtBQUMvRixZQUEyRzs7QUFFM0c7O0FBRUE7QUFDQTs7QUFFQSxhQUFhLDBHQUFHLENBQUMsaUdBQU87Ozs7QUFJeEIsaUVBQWUsd0dBQWMsTUFBTSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaNEQ7QUFDL0YsWUFBMkc7O0FBRTNHOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSwwR0FBRyxDQUFDLGlHQUFPOzs7O0FBSXhCLGlFQUFlLHdHQUFjLE1BQU0sRTs7Ozs7Ozs7Ozs7QUNadEI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RDs7QUFFdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHdCQUF3QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRW5GO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLHFFQUFxRSxxQkFBcUIsYUFBYTs7QUFFdkc7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxHQUFHOztBQUVIOzs7QUFHQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQkFBb0IsNkJBQTZCO0FBQ2pEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7O0FDNVFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixtQkFBTyxDQUFDLHdDQUFlO0FBQ3ZCLG1CQUFtQixtQkFBTyxDQUFDLGdHQUF5QjtBQUNwRCxhQUFhLG1CQUFPLENBQUMsc0NBQWM7QUFDbkMsd0JBQXdCLG1CQUFPLENBQUMsc0VBQThCO0FBQzlELGNBQWMsbUJBQU8sQ0FBQyxrREFBb0I7QUFDMUMsdUJBQXVCLG1CQUFPLENBQUMsOEVBQWtDO0FBQ2pFLHVCQUF1QixtQkFBTyxDQUFDLDhFQUFrQztBQUNqRSw0QkFBNEIsbUJBQU8sQ0FBQyw4RUFBa0M7QUFDdEUsMEJBQTBCLG1CQUFPLENBQUMsb0dBQXVCOztBQUV6RDtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLG9HQUE2QztBQUNuRSxjQUFjLG1CQUFPLENBQUMsb0dBQTZDO0FBQ25FLFdBQVcsbUJBQU8sQ0FBQyw4RkFBMEM7QUFDN0QsV0FBVyxtQkFBTyxDQUFDLDhGQUEwQztBQUM3RCxjQUFjLG1CQUFPLENBQUMsb0dBQTZDO0FBQ25FOztBQUVBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLDhGQUEwQztBQUNoRTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQixxQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQ0FBaUM7QUFDakMsaUNBQWlDOztBQUVqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyREFBMkQ7QUFDM0QsMkRBQTJEOztBQUUzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtEQUFrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDBDQUEwQztBQUMzRDtBQUNBO0FBQ0EsYUFBYSwyQ0FBMkM7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVMsc0RBQXNEO0FBQy9EO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLDBDQUEwQztBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLLEdBQUcsMkNBQTJDO0FBQ25EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMscUNBQXFDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxPQUFPLHFDQUFxQztBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLGFBQWE7QUFDL0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsYUFBYTtBQUNoRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxPQUFPO0FBQ1A7QUFDQSxzREFBc0Q7QUFDdEQsT0FBTztBQUNQLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxpQ0FBaUM7O0FBRWpDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUMsZ0JBQWdCLFdBQVcsWUFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pELGdCQUFnQixXQUFXLFlBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QyxnQkFBZ0IsV0FBVyxZQUFZO0FBQ3ZDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pELGdCQUFnQixXQUFXLFlBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDJCQUEyQjtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sZ0RBQWdEO0FBQ3ZEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxPQUFPLG1DQUFtQztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxjQUFjLHdCQUF3QixvQkFBb0IsYUFBYSxlQUFlLGVBQWU7QUFDOUo7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7O0FDL3dHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1JBLGtCQUFrQixtQkFBTyxDQUFDLHlFQUFjO0FBQ3hDLDRCQUE0QixtQkFBTyxDQUFDLHFFQUF3QjtBQUM1RCw2QkFBNkIsbUJBQU8sQ0FBQywrRUFBNkI7QUFDbEUsMkJBQTJCLG1CQUFPLENBQUMsMkVBQTJCOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwrQ0FBK0M7QUFDN0U7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0QkFBNEI7QUFDbkM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzdZQSx1QkFBdUIsbUJBQU8sQ0FBQyxtRUFBdUI7QUFDdEQsc0JBQXNCLG1CQUFPLENBQUMsaUVBQXNCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzdJQSxjQUFjLG1CQUFPLENBQUMsbURBQXFCO0FBQzNDLDRCQUE0QixtQkFBTyxDQUFDLHFFQUF3Qjs7QUFFNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFlBQVkseUJBQXlCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNwREEsVUFBVSxxQkFBcUI7QUFDL0I7QUFDQSxXQUFXLG1CQUFPLENBQUMsbUNBQVc7QUFDOUI7Ozs7Ozs7Ozs7O0FDSEEsbUJBQU8sQ0FBQyxtRkFBMkI7QUFDbkMscUJBQXFCLG1CQUFPLENBQUMsb0VBQStCOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxREFBcUQ7O0FBRXJEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0Q0FBNEM7O0FBRTVDOztBQUVBOztBQUVBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxrQkFBa0I7QUFDekI7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUEsdUJBQXVCOzs7Ozs7Ozs7OztBQ25RdkIsbUJBQU8sQ0FBQyw2RUFBd0I7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCOzs7Ozs7Ozs7OztBQzFIdkIsbUJBQU8sQ0FBQyxtRkFBMkI7O0FBRW5DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDN1Z2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZCQUE2Qjs7QUFFN0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUJBQXVCOzs7Ozs7Ozs7OztBQ3hIdkIsbUJBQU8sQ0FBQyxtRkFBMkI7QUFDbkMscUJBQXFCLG1CQUFPLENBQUMsb0VBQStCOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGdDQUFnQyxZQUFZLDBCQUEwQjtBQUN0RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVksVUFBVTtBQUN4Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDdlF2QixrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBYzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCOzs7Ozs7Ozs7OztBQzdFOUIsYUFBYSxtQkFBTyxDQUFDLDBDQUFhOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG9DQUFvQztBQUN2RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDbFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRSxTQUFTO0FBQzNFO0FBQ0EsT0FBTztBQUNQLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjs7Ozs7Ozs7Ozs7O0FDL0RkOztBQUViLDRCQUE0QixtQkFBTyxDQUFDLHdFQUE0QjtBQUNoRSxhQUFhLG1CQUFPLENBQUMsdUNBQWU7QUFDcEMsa0JBQWtCLG1CQUFPLENBQUMseUVBQWM7QUFDeEMsMEJBQTBCLG1CQUFPLENBQUMsb0dBQXVCOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLHlDQUF5QztBQUNoRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQWdDLHlCQUF5QjtBQUN6RDtBQUNBO0FBQ0EsZ0RBQWdELHlCQUF5QjtBQUN6RTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyx5QkFBeUI7QUFDekQ7QUFDQTtBQUNBLGdEQUFnRCx5QkFBeUI7QUFDekU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQXNEO0FBQ3ZFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBLDBDQUEwQyxtQkFBbUI7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUyx1QkFBdUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsOENBQThDLHVCQUF1QjtBQUNyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxxRUFBcUU7QUFDNUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztVQ3pnQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoianNmcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIvKiEgZXZlbnQtZW1pdHRlcihodHRwczovL2dpdGh1Yi5jb20vcml2ZXJzdW4vZXZlbnQtZW1pdHRlcikgdjEuNS4wIENvcHlyaWdodCAoYykgMjAyMCByaXZlcnN1bi5vcmdAZ21haWwuY29tICovXG4hZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcIkV2ZW50RW1pdHRlclwiLFtdLHQpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuRXZlbnRFbWl0dGVyPXQoKTplLkV2ZW50RW1pdHRlcj10KCl9KHRoaXMsKGZ1bmN0aW9uKCl7cmV0dXJuKCgpPT57XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9ezU2MTooZSx0LG4pPT57ZnVuY3Rpb24gcihlLHQpe3JldHVybiBmdW5jdGlvbihlKXtpZihBcnJheS5pc0FycmF5KGUpKXJldHVybiBlfShlKXx8ZnVuY3Rpb24oZSx0KXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgU3ltYm9sfHwhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoZSkpKXJldHVybjt2YXIgbj1bXSxyPSEwLGk9ITEsbz12b2lkIDA7dHJ5e2Zvcih2YXIgcyx1PWVbU3ltYm9sLml0ZXJhdG9yXSgpOyEocj0ocz11Lm5leHQoKSkuZG9uZSkmJihuLnB1c2gocy52YWx1ZSksIXR8fG4ubGVuZ3RoIT09dCk7cj0hMCk7fWNhdGNoKGUpe2k9ITAsbz1lfWZpbmFsbHl7dHJ5e3J8fG51bGw9PXUucmV0dXJufHx1LnJldHVybigpfWZpbmFsbHl7aWYoaSl0aHJvdyBvfX1yZXR1cm4gbn0oZSx0KXx8byhlLHQpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9KCl9ZnVuY3Rpb24gaShlLHQpe3ZhciBuO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBTeW1ib2x8fG51bGw9PWVbU3ltYm9sLml0ZXJhdG9yXSl7aWYoQXJyYXkuaXNBcnJheShlKXx8KG49byhlKSl8fHQmJmUmJlwibnVtYmVyXCI9PXR5cGVvZiBlLmxlbmd0aCl7biYmKGU9bik7dmFyIHI9MCxpPWZ1bmN0aW9uKCl7fTtyZXR1cm57czppLG46ZnVuY3Rpb24oKXtyZXR1cm4gcj49ZS5sZW5ndGg/e2RvbmU6ITB9Ontkb25lOiExLHZhbHVlOmVbcisrXX19LGU6ZnVuY3Rpb24oZSl7dGhyb3cgZX0sZjppfX10aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIil9dmFyIHMsdT0hMCxjPSExO3JldHVybntzOmZ1bmN0aW9uKCl7bj1lW1N5bWJvbC5pdGVyYXRvcl0oKX0sbjpmdW5jdGlvbigpe3ZhciBlPW4ubmV4dCgpO3JldHVybiB1PWUuZG9uZSxlfSxlOmZ1bmN0aW9uKGUpe2M9ITAscz1lfSxmOmZ1bmN0aW9uKCl7dHJ5e3V8fG51bGw9PW4ucmV0dXJufHxuLnJldHVybigpfWZpbmFsbHl7aWYoYyl0aHJvdyBzfX19fWZ1bmN0aW9uIG8oZSx0KXtpZihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlyZXR1cm4gcyhlLHQpO3ZhciBuPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LC0xKTtyZXR1cm5cIk9iamVjdFwiPT09biYmZS5jb25zdHJ1Y3RvciYmKG49ZS5jb25zdHJ1Y3Rvci5uYW1lKSxcIk1hcFwiPT09bnx8XCJTZXRcIj09PW4/QXJyYXkuZnJvbShlKTpcIkFyZ3VtZW50c1wiPT09bnx8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3Qobik/cyhlLHQpOnZvaWQgMH19ZnVuY3Rpb24gcyhlLHQpeyhudWxsPT10fHx0PmUubGVuZ3RoKSYmKHQ9ZS5sZW5ndGgpO2Zvcih2YXIgbj0wLHI9bmV3IEFycmF5KHQpO248dDtuKyspcltuXT1lW25dO3JldHVybiByfWZ1bmN0aW9uIHUoZSx0KXtpZighKGUgaW5zdGFuY2VvZiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfWZ1bmN0aW9uIGMoZSx0KXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIHI9dFtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsci5rZXkscil9fWZ1bmN0aW9uIGEoZSx0LG4pe3JldHVybiB0JiZjKGUucHJvdG90eXBlLHQpLG4mJmMoZSxuKSxlfW4uZCh0LHtkZWZhdWx0OigpPT5sfSk7dmFyIGw9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe2lmKHUodGhpcyxlKSx0aGlzLm9uTGlzdGVuZXJzPW5ldyBNYXAsdGhpcy5vbmx5TGlzdGVuZXJzPW5ldyBNYXAsdCl7dmFyIG4scj1pKHQpO3RyeXtmb3Ioci5zKCk7IShuPXIubigpKS5kb25lOyl7dmFyIG89bi52YWx1ZSxzPW5ldyBmO3RoaXMub25MaXN0ZW5lcnMuc2V0KG8scyl9fWNhdGNoKGUpe3IuZShlKX1maW5hbGx5e3IuZigpfX10aGlzLmNoaWxkRXZlbnRFbWl0dGVycz1bXSx0aGlzLm9uSW50ZXJjZXB0ZXJGdW5jcz17fX1yZXR1cm4gYShlLFt7a2V5Olwib25cIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMub25MaXN0ZW5lcnMuZ2V0KGUpO2lmKG58fChuPW5ldyBmLHRoaXMub25MaXN0ZW5lcnMuc2V0KGUsbikpLG4uYWRkTGlzdGVuZXJGdW5jKHQpLHRoaXMub25JbnRlcmNlcHRlckZ1bmNzKWZvcih2YXIgaT0wLG89T2JqZWN0LmVudHJpZXModGhpcy5vbkludGVyY2VwdGVyRnVuY3MpO2k8by5sZW5ndGg7aSsrKXt2YXIgcz1yKG9baV0sMiksdT1zWzBdOygwLHNbMV0pKHtldmVudFR5cGU6ZSxmdW5jOnQsb25JbnRlcmNlcHRlckZ1bmNuYW1lOnV9KX19fSx7a2V5OlwicmVtb3ZlTGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMub25MaXN0ZW5lcnMuZ2V0KGUpO24mJm4ucmVtb3ZlTGlzdGVuZXIodCl9fSx7a2V5Olwib25seVwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcj10aGlzLm9ubHlMaXN0ZW5lcnMuZ2V0KGUpO3J8fChyPW5ldyBoLHRoaXMub25seUxpc3RlbmVycy5zZXQoZSxyKSksci5wdXRMaXN0ZW5lckZ1bmModCxuKX19LHtrZXk6XCJwaXBlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jaGlsZEV2ZW50RW1pdHRlcnMucHVzaChlKX19LHtrZXk6XCJlbWl0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLm9uTGlzdGVuZXJzLmdldChlKTtuJiYodC5ldmVudFR5cGU9ZSxuLmNhbGxMaXN0ZW5lckZ1bmModCkpO3ZhciByPXRoaXMub25seUxpc3RlbmVycy5nZXQoZSk7ciYmKHQuZXZlbnRUeXBlPWUsci5jYWxsTGlzdGVuZXJGdW5jKHQpKTt2YXIgbyxzPWkodGhpcy5jaGlsZEV2ZW50RW1pdHRlcnMpO3RyeXtmb3Iocy5zKCk7IShvPXMubigpKS5kb25lOyl7by52YWx1ZS5lbWl0KGUsdCl9fWNhdGNoKGUpe3MuZShlKX1maW5hbGx5e3MuZigpfX19LHtrZXk6XCJnZXRBbGxMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXt9O3RoaXMub25MaXN0ZW5lcnMuZm9yRWFjaCgoZnVuY3Rpb24odCxuKXt2YXIgcj1uLGk9dC5nZXRBbGxMaXN0ZW5lcnMoKTtlW3JdfHwoZVtyXT17fSksZVtyXS5saXN0ZW5lcnM9aX0pKTt2YXIgdCxuPTAscj1pKHRoaXMuY2hpbGRFdmVudEVtaXR0ZXJzKTt0cnl7Zm9yKHIucygpOyEodD1yLm4oKSkuZG9uZTspe3QudmFsdWUub25MaXN0ZW5lcnMuZm9yRWFjaCgoZnVuY3Rpb24odCxyKXt2YXIgaT1yLG89dC5nZXRBbGxMaXN0ZW5lcnMoKTtlW2ldfHwoZVtpXT17fSksZVtpXS5jaGlsZEV2ZW50RW1pdHRlcnN8fChlW2ldLmNoaWxkRXZlbnRFbWl0dGVycz1bXSksZVtpXS5jaGlsZEV2ZW50RW1pdHRlcnMucHVzaCh7Y2hpbGRFbWl0dGVySWR4Om4sbGlzdGVuZXJzOm99KX0pKSxuKyt9fWNhdGNoKGUpe3IuZShlKX1maW5hbGx5e3IuZigpfXJldHVybiBlfX0se2tleTpcImhhc0xpc3RlbmVyRnVuY3NcIix2YWx1ZTpmdW5jdGlvbihlKXtpZih0aGlzLm9uTGlzdGVuZXJzLmhhcyhlKSl7dmFyIHQ9dGhpcy5vbkxpc3RlbmVycy5nZXQoZSk7aWYodCYmdC5oYXNMaXN0ZW5lckZ1bmMoKSlyZXR1cm4hMH12YXIgbixyPWkodGhpcy5jaGlsZEV2ZW50RW1pdHRlcnMpO3RyeXtmb3Ioci5zKCk7IShuPXIubigpKS5kb25lOyl7aWYobi52YWx1ZS5oYXNMaXN0ZW5lckZ1bmNzKGUpKXJldHVybiEwfX1jYXRjaChlKXtyLmUoZSl9ZmluYWxseXtyLmYoKX1yZXR1cm4hMX19LHtrZXk6XCJjbGVhckFsbFwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIGUsdD1pKHRoaXMub25MaXN0ZW5lcnMudmFsdWVzKCkpO3RyeXtmb3IodC5zKCk7IShlPXQubigpKS5kb25lOyl7ZS52YWx1ZS5jbGVhckFsbCgpfX1jYXRjaChlKXt0LmUoZSl9ZmluYWxseXt0LmYoKX10aGlzLm9uTGlzdGVuZXJzLmNsZWFyKCk7dmFyIG4scj1pKHRoaXMub25seUxpc3RlbmVycy52YWx1ZXMoKSk7dHJ5e2ZvcihyLnMoKTshKG49ci5uKCkpLmRvbmU7KXtuLnZhbHVlLmNsZWFyQWxsKCl9fWNhdGNoKGUpe3IuZShlKX1maW5hbGx5e3IuZigpfXRoaXMub25seUxpc3RlbmVycy5jbGVhcigpLHRoaXMuY2hpbGRFdmVudEVtaXR0ZXJzPVtdfX0se2tleTpcImFkZE9uSW50ZXJjZXB0ZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtpZih0aGlzLm9uSW50ZXJjZXB0ZXJGdW5jc1tlXSl0aHJvdyBFcnJvcignQWx3YXlzIHJlZ2lzdGVyZWQgaW50ZXJjZXB0ZXIgZnVuYyBcIicuY29uY2F0KGUsJ1wiLicpKTt0aGlzLm9uSW50ZXJjZXB0ZXJGdW5jc1tlXT10fX0se2tleTpcInJlbW92ZU9uSW50ZXJjZXB0ZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSl7ZGVsZXRlIHRoaXMub25JbnRlcmNlcHRlckZ1bmNzW2VdfX0se2tleTpcImdldEFsbE9uSW50ZXJjZXB0ZXJGdW5jc1wiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPVtdLHQ9MCxuPU9iamVjdC5lbnRyaWVzKHRoaXMub25JbnRlcmNlcHRlckZ1bmNzKTt0PG4ubGVuZ3RoO3QrKyl7dmFyIGk9cihuW3RdLDIpLG89aVswXSxzPWlbMV07ZS5wdXNoKHtmdW5jTmFtZTpvLGZ1bmM6c30pfXJldHVybiBlfX1dKSxlfSgpLGY9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7dSh0aGlzLGUpLHRoaXMubGlzdGVuZXJGdW5jcz1bXX1yZXR1cm4gYShlLFt7a2V5OlwiY2xlYXJBbGxcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMubGlzdGVuZXJGdW5jcz1bXX19LHtrZXk6XCJnZXRBbGxMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxpc3RlbmVyRnVuY3N9fSx7a2V5OlwiaGFzTGlzdGVuZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5saXN0ZW5lckZ1bmNzLmxlbmd0aD4wfX0se2tleTpcImFkZExpc3RlbmVyRnVuY1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMubGlzdGVuZXJGdW5jcy5wdXNoKGUpfX0se2tleTpcImNhbGxMaXN0ZW5lckZ1bmNcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdCxuPWkodGhpcy5saXN0ZW5lckZ1bmNzKTt0cnl7Zm9yKG4ucygpOyEodD1uLm4oKSkuZG9uZTspe3ZhciByPXQudmFsdWU7aWYoXCJGdW5jdGlvblwiIT09dGhpcy50eXBlT2YocikpdGhyb3cgRXJyb3IoJ1tAcml2ZXJzdW4vZXZlbnQtZW1pdHRlcl0gbGlzdGVuZXJGdW5jdGlvbiB5b3Ugc2V0IGlzIG5vdCBhIGZ1bmN0aW9uLiBsaXN0ZW5lckZ1bmN0aW9uOlwiJy5jb25jYXQociwnXCIuQ2hlY2sgYXJncyBvZiAjb25seSBtZXRob2Qgb3IgI29uIG1ldGhvZC4nKSk7cihlKX19Y2F0Y2goZSl7bi5lKGUpfWZpbmFsbHl7bi5mKCl9fX0se2tleTpcInJlbW92ZUxpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5yZW1vdmVBcnJheUl0ZW1PbmNlKHRoaXMubGlzdGVuZXJGdW5jcyxlKX19LHtrZXk6XCJyZW1vdmVBcnJheUl0ZW1PbmNlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj1lLmluZGV4T2YodCk7cmV0dXJuIG4+LTEmJmUuc3BsaWNlKG4sMSksZX19LHtrZXk6XCJ0eXBlT2ZcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpLnNsaWNlKDgsLTEpfX1dKSxlfSgpLGg9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7dSh0aGlzLGUpLHRoaXMubGlzdGVuZXJGdW5jTWFwPW5ldyBNYXB9cmV0dXJuIGEoZSxbe2tleTpcImNsZWFyQWxsXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmxpc3RlbmVyRnVuY01hcC5jbGVhcigpfX0se2tleTpcImhhc0xpc3RlbmVyRnVuY1wiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmxpc3RlbmVyRnVuY01hcC5oYXMoZSl9fSx7a2V5OlwicHV0TGlzdGVuZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt0aGlzLmxpc3RlbmVyRnVuY01hcC5zZXQoZSx0KX19LHtrZXk6XCJjYWxsTGlzdGVuZXJGdW5jXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQsbj1pKHRoaXMubGlzdGVuZXJGdW5jTWFwLnZhbHVlcygpKTt0cnl7Zm9yKG4ucygpOyEodD1uLm4oKSkuZG9uZTspe3ZhciByPXQudmFsdWU7aWYoXCJGdW5jdGlvblwiIT09dGhpcy50eXBlT2YocikpdGhyb3cgRXJyb3IoJ1tAcml2ZXJzdW4vZXZlbnQtZW1pdHRlcl0gbGlzdGVuZXJGdW5jdGlvbiB5b3Ugc2V0IGlzIG5vdCBhIGZ1bmN0aW9uLiBsaXN0ZW5lckZ1bmN0aW9uOlwiJy5jb25jYXQociwnXCIuQ2hlY2sgYXJncyBvZiAjb25seSBtZXRob2Qgb3IgI29uIG1ldGhvZC4nKSk7cihlKX19Y2F0Y2goZSl7bi5lKGUpfWZpbmFsbHl7bi5mKCl9fX0se2tleTpcInR5cGVPZlwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkuc2xpY2UoOCwtMSl9fV0pLGV9KCl9fSx0PXt9O2Z1bmN0aW9uIG4ocil7aWYodFtyXSlyZXR1cm4gdFtyXS5leHBvcnRzO3ZhciBpPXRbcl09e2V4cG9ydHM6e319O3JldHVybiBlW3JdKGksaS5leHBvcnRzLG4pLGkuZXhwb3J0c31yZXR1cm4gbi5kPShlLHQpPT57Zm9yKHZhciByIGluIHQpbi5vKHQscikmJiFuLm8oZSxyKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUscix7ZW51bWVyYWJsZTohMCxnZXQ6dFtyXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpLG4oNTYxKX0pKCkuZGVmYXVsdH0pKTsiLCIvKiEgZXZlbnQtbGlzdGVuZXItaGVscGVyKGh0dHBzOi8vZ2l0aHViLmNvbS9yaXZlcnN1bi9ldmVudC1saXN0ZW5lci1oZWxwZXIpIHYxLjEuMiBDb3B5cmlnaHQgKGMpIDIwMjAgcml2ZXJzdW4ub3JnQGdtYWlsLmNvbSAqL1xuIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoXCJFdmVudExpc3RlbmVySGVscGVyXCIsW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5FdmVudExpc3RlbmVySGVscGVyPXQoKTplLkV2ZW50TGlzdGVuZXJIZWxwZXI9dCgpfSh0aGlzLChmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgdD17fTtmdW5jdGlvbiBuKHIpe2lmKHRbcl0pcmV0dXJuIHRbcl0uZXhwb3J0czt2YXIgaT10W3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKGkuZXhwb3J0cyxpLGkuZXhwb3J0cyxuKSxpLmw9ITAsaS5leHBvcnRzfXJldHVybiBuLm09ZSxuLmM9dCxuLmQ9ZnVuY3Rpb24oZSx0LHIpe24ubyhlLHQpfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSx0LHtlbnVtZXJhYmxlOiEwLGdldDpyfSl9LG4ucj1mdW5jdGlvbihlKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6XCJNb2R1bGVcIn0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSxuLnQ9ZnVuY3Rpb24oZSx0KXtpZigxJnQmJihlPW4oZSkpLDgmdClyZXR1cm4gZTtpZig0JnQmJlwib2JqZWN0XCI9PXR5cGVvZiBlJiZlJiZlLl9fZXNNb2R1bGUpcmV0dXJuIGU7dmFyIHI9T2JqZWN0LmNyZWF0ZShudWxsKTtpZihuLnIociksT2JqZWN0LmRlZmluZVByb3BlcnR5KHIsXCJkZWZhdWx0XCIse2VudW1lcmFibGU6ITAsdmFsdWU6ZX0pLDImdCYmXCJzdHJpbmdcIiE9dHlwZW9mIGUpZm9yKHZhciBpIGluIGUpbi5kKHIsaSxmdW5jdGlvbih0KXtyZXR1cm4gZVt0XX0uYmluZChudWxsLGkpKTtyZXR1cm4gcn0sbi5uPWZ1bmN0aW9uKGUpe3ZhciB0PWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiBuLmQodCxcImFcIix0KSx0fSxuLm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LG4ucD1cIi9cIixuKG4ucz0wKX0oW2Z1bmN0aW9uKGUsdCxuKXtlLmV4cG9ydHM9bigxKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7cmV0dXJuKHI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0pKGUpfWZ1bmN0aW9uIGkoZSx0KXtyZXR1cm4gZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gZX0oZSl8fGZ1bmN0aW9uKGUsdCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFN5bWJvbHx8IShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpKSlyZXR1cm47dmFyIG49W10scj0hMCxpPSExLG89dm9pZCAwO3RyeXtmb3IodmFyIGEscz1lW1N5bWJvbC5pdGVyYXRvcl0oKTshKHI9KGE9cy5uZXh0KCkpLmRvbmUpJiYobi5wdXNoKGEudmFsdWUpLCF0fHxuLmxlbmd0aCE9PXQpO3I9ITApO31jYXRjaChlKXtpPSEwLG89ZX1maW5hbGx5e3RyeXtyfHxudWxsPT1zLnJldHVybnx8cy5yZXR1cm4oKX1maW5hbGx5e2lmKGkpdGhyb3cgb319cmV0dXJuIG59KGUsdCl8fGEoZSx0KXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfSgpfWZ1bmN0aW9uIG8oZSx0KXt2YXIgbjtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgU3ltYm9sfHxudWxsPT1lW1N5bWJvbC5pdGVyYXRvcl0pe2lmKEFycmF5LmlzQXJyYXkoZSl8fChuPWEoZSkpfHx0JiZlJiZcIm51bWJlclwiPT10eXBlb2YgZS5sZW5ndGgpe24mJihlPW4pO3ZhciByPTAsaT1mdW5jdGlvbigpe307cmV0dXJue3M6aSxuOmZ1bmN0aW9uKCl7cmV0dXJuIHI+PWUubGVuZ3RoP3tkb25lOiEwfTp7ZG9uZTohMSx2YWx1ZTplW3IrK119fSxlOmZ1bmN0aW9uKGUpe3Rocm93IGV9LGY6aX19dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfXZhciBvLHM9ITAsbD0hMTtyZXR1cm57czpmdW5jdGlvbigpe249ZVtTeW1ib2wuaXRlcmF0b3JdKCl9LG46ZnVuY3Rpb24oKXt2YXIgZT1uLm5leHQoKTtyZXR1cm4gcz1lLmRvbmUsZX0sZTpmdW5jdGlvbihlKXtsPSEwLG89ZX0sZjpmdW5jdGlvbigpe3RyeXtzfHxudWxsPT1uLnJldHVybnx8bi5yZXR1cm4oKX1maW5hbGx5e2lmKGwpdGhyb3cgb319fX1mdW5jdGlvbiBhKGUsdCl7aWYoZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuIHMoZSx0KTt2YXIgbj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkuc2xpY2UoOCwtMSk7cmV0dXJuXCJPYmplY3RcIj09PW4mJmUuY29uc3RydWN0b3ImJihuPWUuY29uc3RydWN0b3IubmFtZSksXCJNYXBcIj09PW58fFwiU2V0XCI9PT1uP0FycmF5LmZyb20oZSk6XCJBcmd1bWVudHNcIj09PW58fC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pP3MoZSx0KTp2b2lkIDB9fWZ1bmN0aW9uIHMoZSx0KXsobnVsbD09dHx8dD5lLmxlbmd0aCkmJih0PWUubGVuZ3RoKTtmb3IodmFyIG49MCxyPW5ldyBBcnJheSh0KTtuPHQ7bisrKXJbbl09ZVtuXTtyZXR1cm4gcn1mdW5jdGlvbiBsKGUsdCl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLHIua2V5LHIpfX1uLnIodCksbi5kKHQsXCJkZWZhdWx0XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHV9KSk7dmFyIHU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7IWZ1bmN0aW9uKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxlKSx0aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwPW5ldyBNYXAsdGhpcy5saXN0ZW5lck51bT0wfXZhciB0LG4sYTtyZXR1cm4gdD1lLChuPVt7a2V5OlwiYWRkRXZlbnRMaXN0ZW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuLHIpe3ZhciBpPXRoaXMsbz1udWxsO2lmKHImJihvPXRoaXMuX2Nsb25lSnNvbihyKSksYXJndW1lbnRzLmxlbmd0aD40KXRocm93IEVycm9yKFwiVG9vIG1hbnkgYXJndW1lbnRzLiBOdW1iZXIgb2YgYXJndW1lbnRzIGNhbiBiZSBzcGVjaWZpZWQgNC5cIik7dGhpcy5fY2hlY2tUeXBlT2ZPcHRpb25zKG8pO3ZhciBhPW51bGw7byYmby5saXN0ZW5lck5hbWUmJihhPW8ubGlzdGVuZXJOYW1lKTt2YXIgcz1udWxsO28mJm8ub25jZSYmKGRlbGV0ZSBvLm9uY2Usby5jYWxsYmFja09uY2U9ITAscz1mdW5jdGlvbihyKXtuKHIpLGkucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQsbnVsbCxvKX0pO3ZhciBsPXtsaXN0ZW5lck5hbWU6bnVsbCxzdWNjZXNzOiEwfTtzP2UuYWRkRXZlbnRMaXN0ZW5lcih0LHMsbyk6ZS5hZGRFdmVudExpc3RlbmVyKHQsbixvKTt2YXIgdT10aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmdldChlKTt1fHwodT1uZXcgTWFwLHRoaXMuZXZUYXJnZXRMaXN0ZW5lcnNNYXAuc2V0KGUsdSkpO3ZhciBjPXUuZ2V0KHQpO2lmKGN8fChjPW5ldyBNYXAsdS5zZXQodCxjKSksbnVsbCE9PWEpe2lmKGMuaGFzKGEpKXRocm93IEVycm9yKCdUaGUgbGlzdGVuZXJOYW1lIFwiJy5jb25jYXQoYSwnXCIgaXMgYWxyZWFkeSB1c2VkIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50IHR5cGUgJykuY29uY2F0KHQpKTtjLnNldChhLHtsaXN0ZW5lcjpuLG9uY2VMaXN0ZW5lcjpzLG9wdGlvbnM6b30pLGwubGlzdGVuZXJOYW1lPWF9ZWxzZXt2YXIgZj1cImxpc3RlbmVyLVwiLmNvbmNhdCh0aGlzLmxpc3RlbmVyTnVtKTtvfHwobz17fSksby5saXN0ZW5lck5hbWU9ZixjLnNldChmLHtsaXN0ZW5lcjpuLG9uY2VMaXN0ZW5lcjpzLG9wdGlvbnM6b30pLGwubGlzdGVuZXJOYW1lPWYsdGhpcy5saXN0ZW5lck51bSs9MX1yZXR1cm4gbH19LHtrZXk6XCJyZW1vdmVFdmVudExpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4scil7aWYoYXJndW1lbnRzLmxlbmd0aDwzKXRocm93IEVycm9yKFwiVGhyZWUgb3IgZm91ciBhcmd1bWVudHMgYXJlIHJlcXVpcmVkLlwiKTtpZihcIkZ1bmN0aW9uXCIhPT10aGlzLnR5cGVPZihuKSYmXCJOdWxsXCIhPT10aGlzLnR5cGVPZihuKSl0aHJvdyBFcnJvcignVHlwZSBvZiAzcmQgYXJnIHNob3VsZCBiZSBhIFwiRnVuY3Rpb25cIiBvciBcIk51bGxcIi4nKTt0aGlzLl9jaGVja1R5cGVPZk9wdGlvbnMocik7dmFyIGk9bnVsbDtyJiZyLmxpc3RlbmVyTmFtZSYmKGk9ci5saXN0ZW5lck5hbWUpO3ZhciBvPXtzdWNjZXNzOiExLG1lc3NhZ2U6XCJ1bmtub3duIGVycm9yXCJ9LGE9dGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5nZXQoZSk7aWYoIWEpcmV0dXJuIG8ubWVzc2FnZT1cIkRPTSBlbGVtZW50IFwiLmNvbmNhdChlLFwiKGlkPVwiKS5jb25jYXQoZS5pZCxcIikgZG9lc24ndCBoYXZlIGFueSBsaXN0ZW5lcnMuXCIpLG87dmFyIHM9YS5nZXQodCk7aWYoIXMpcmV0dXJuIG8ubWVzc2FnZT1cIkRPTSBlbGVtZW50IFwiLmNvbmNhdChlLFwiKGlkPVwiKS5jb25jYXQoZS5pZCxcIikgZG9lc24ndCBoYXZlIFxcXCJcIikuY29uY2F0KHQsJ1wiIGxpc3RlbmVycy4nKSxvO2lmKGkpe3ZhciBsPXMuZ2V0KGkpO2lmKCFsKXJldHVybiBvLm1lc3NhZ2U9XCJET00gZWxlbWVudCBcIi5jb25jYXQoZSxcIihpZD1cIikuY29uY2F0KGUuaWQsXCIpIGRvZXNuJ3QgaGF2ZSBcXFwiXCIpLmNvbmNhdCh0LCdcIiBsaXN0ZW5lciBcIicpLmNvbmNhdChpLCdcIicpLG87cy5kZWxldGUoaSksbC5vcHRpb25zJiZsLm9wdGlvbnMuY2FsbGJhY2tPbmNlP2UucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LGwub25jZUxpc3RlbmVyLGwub3B0aW9ucyk6ZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsbC5saXN0ZW5lcixsLm9wdGlvbnMpLG8uc3VjY2Vzcz0hMH1lbHNlIGlmKCFpKXtpZighbilyZXR1cm4gby5tZXNzYWdlPVwib3B0aW9ucy5saXN0ZW5lck5hbWUgaXMgbm90IGZvdW5kXCIsbzt2YXIgdT1cImxpc3RlbmVyXCIsYz1uLGY9dGhpcy5fc2VhcmNoS2V5SW5WYWx1ZUNvbnRlbnQocyx1LGMpO2lmKGYpe3ZhciB2PXMuZ2V0KGYpLHk9di5vbmNlTGlzdGVuZXIscD12Lm9wdGlvbnM7cy5kZWxldGUoZikseT9lLnJlbW92ZUV2ZW50TGlzdGVuZXIodCx5LHApOmUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LG4scCksby5zdWNjZXNzPSEwfWVsc2Ugby5zdWNjZXNzPSExLG8ubWVzc2FnZT1cIlNwZWNpZmllZCBsaXN0ZW5lciBjb3VsZCBub3QgYmUgZGVsZXRlZCBmcm9tIERPTSBlbGVtZW50IFwiLmNvbmNhdChlLFwiKGlkPVwiKS5jb25jYXQoZS5pZCxcIikuXFxuICAgICAgICBTaW5jZSB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyIGlzIG5vdCByZWdpc3RlcmVkIGFzIGFuIGV2ZW50IGxpc3RlbmVyLFxcbiAgICAgICAgaXQgbWF5IGhhdmUgYmVlbiByZWdpc3RlcmVkIG91dHNpZGUgb2YgZXZlbnQtbGlzdGVuZXItaGVscGVyLlwiKX1yZXR1cm4gb319LHtrZXk6XCJnZXRFdmVudExpc3RlbmVyc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU/dD90aGlzLl9nZXRFdmVudExpc3RlbmVyc1dpdGgyQXJncyhlLHQpOnRoaXMuX2dldEV2ZW50TGlzdGVuZXJzV2l0aDFBcmcoZSk6W119fSx7a2V5OlwiZ2V0QWxsRXZlbnRMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1uZXcgTWFwO3JldHVybiB0aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmZvckVhY2goKGZ1bmN0aW9uKG4scil7dmFyIGk9cixhPWUuX2dldEV2ZW50TGlzdGVuZXJzV2l0aDFBcmcoaSkscz1uZXcgTWFwO3Quc2V0KGkscyk7dmFyIGwsdT1vKGEpO3RyeXtmb3IodS5zKCk7IShsPXUubigpKS5kb25lOyl7dmFyIGM9bC52YWx1ZTtzLnNldChjLmV2ZW50VHlwZSxjLmxpc3RlbmVycyl9fWNhdGNoKGUpe3UuZShlKX1maW5hbGx5e3UuZigpfX0pKSx0fX0se2tleTpcIl9nZXRFdmVudExpc3RlbmVyc1dpdGgxQXJnXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dmFyIHQ9W10sbj10aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmdldChlKTtpZighbilyZXR1cm4gdDt2YXIgcixhPW8obik7dHJ5e2ZvcihhLnMoKTshKHI9YS5uKCkpLmRvbmU7KXt2YXIgcyxsPWkoci52YWx1ZSwyKSx1PWxbMF0sYz1sWzFdLGY9W10sdj1vKGMudmFsdWVzKCkpO3RyeXtmb3Iodi5zKCk7IShzPXYubigpKS5kb25lOyl7dmFyIHk9cy52YWx1ZTtmLnB1c2godGhpcy5fZ2V0RnJvemVuTGlzdGVuZXJEZWYoeSkpfX1jYXRjaChlKXt2LmUoZSl9ZmluYWxseXt2LmYoKX1mLmxlbmd0aD4wJiZ0LnB1c2goe2V2ZW50VHlwZTp1LGxpc3RlbmVyczpmfSl9fWNhdGNoKGUpe2EuZShlKX1maW5hbGx5e2EuZigpfXJldHVybiB0fX0se2tleTpcIl9nZXRFdmVudExpc3RlbmVyc1dpdGgyQXJnc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7aWYoMiE9PWFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgRXJyb3IoXCJPbmx5IHR3byBhcmd1bWVudHMgY2FuIGJlIHNwZWNpZmllZFwiKTt2YXIgbj1bXSxyPXRoaXMuZXZUYXJnZXRMaXN0ZW5lcnNNYXAuZ2V0KGUpO2lmKCFyKXJldHVybiBuO3ZhciBpPXIuZ2V0KHQpO2lmKCFpKXJldHVybiBuO3ZhciBhLHM9byhpLnZhbHVlcygpKTt0cnl7Zm9yKHMucygpOyEoYT1zLm4oKSkuZG9uZTspe3ZhciBsPWEudmFsdWUsdT10aGlzLl9nZXRGcm96ZW5MaXN0ZW5lckRlZihsKTtuLnB1c2godSl9fWNhdGNoKGUpe3MuZShlKX1maW5hbGx5e3MuZigpfXJldHVybiBufX0se2tleTpcImdldEV2ZW50TGlzdGVuZXJcIix2YWx1ZTpmdW5jdGlvbihlLHQsbil7aWYoMyE9PWFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgRXJyb3IoXCJPbmx5IDMgYXJndW1lbnRzIGNhbiBiZSBzcGVjaWZpZWRcIik7dmFyIHI9dGhpcy5ldlRhcmdldExpc3RlbmVyc01hcC5nZXQoZSk7aWYoIXIpcmV0dXJuIG51bGw7dmFyIGk9ci5nZXQodCk7aWYoIWkpcmV0dXJuIG51bGw7dmFyIG89aS5nZXQobiksYT10aGlzLl9nZXRGcm96ZW5MaXN0ZW5lckRlZihvKTtyZXR1cm4gYX19LHtrZXk6XCJoYXNFdmVudExpc3RlbmVyc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7aWYoMiE9PWFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgRXJyb3IoXCJPbmx5IHR3byBhcmd1bWVudHMgY2FuIGJlIHNwZWNpZmllZFwiKTt2YXIgbj10aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmdldChlKTtpZighbilyZXR1cm4hMTt2YXIgcj1uLmdldCh0KTtyZXR1cm4hKCFyfHwwPT09ci5zaXplKX19LHtrZXk6XCJoYXNFdmVudExpc3RlbmVyXCIsdmFsdWU6ZnVuY3Rpb24oZSx0LG4pe2lmKDMhPT1hcmd1bWVudHMubGVuZ3RoKXRocm93IEVycm9yKFwiT25seSAzIGFyZ3VtZW50cyBjYW4gYmUgc3BlY2lmaWVkXCIpO3ZhciByPXRoaXMuZXZUYXJnZXRMaXN0ZW5lcnNNYXAuZ2V0KGUpO2lmKCFyKXJldHVybiExO3ZhciBpPXIuZ2V0KHQpO2lmKCFpKXJldHVybiExO3ZhciBvPWkuZ2V0KG4pO3JldHVybiEhb319LHtrZXk6XCJfZ2V0RnJvemVuTGlzdGVuZXJEZWZcIix2YWx1ZTpmdW5jdGlvbihlKXtpZighZSlyZXR1cm4gbnVsbDt2YXIgdD17fSxuPW51bGwscj1lLm9wdGlvbnM7cmV0dXJuIHImJihuPXt9LHQub3B0aW9ucz1uLHIuY2FwdHVyZSYmKG4uY2FwdHVyZT1yLmNhcHR1cmUpLHIuY2FsbGJhY2tPbmNlJiYobi5vbmNlPXIuY2FsbGJhY2tPbmNlKSxyLmxpc3RlbmVyTmFtZSYmKG4ubGlzdGVuZXJOYW1lPXIubGlzdGVuZXJOYW1lKSksdC5saXN0ZW5lcj1lLmxpc3RlbmVyLE9iamVjdC5mcmVlemUobiksT2JqZWN0LmZyZWV6ZSh0KSx0fX0se2tleTpcImNsZWFyQWxsRXZlbnRMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciBlLHQ9byh0aGlzLmdldEFsbEV2ZW50VGFyZ2V0cygpKTt0cnl7Zm9yKHQucygpOyEoZT10Lm4oKSkuZG9uZTspe3ZhciBuPWUudmFsdWU7dGhpcy5jbGVhckV2ZW50TGlzdGVuZXJzKG4pfX1jYXRjaChlKXt0LmUoZSl9ZmluYWxseXt0LmYoKX19fSx7a2V5OlwiY2xlYXJFdmVudExpc3RlbmVyc1wiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7aWYoIWUpdGhyb3cgRXJyb3IoXCJBdCBsZWFzdCB0aGUgRXZlbnRUYXJnZXQgbXVzdCBiZSBzcGVjaWZpZWQgYXMgYW4gYXJndW1lbnRcIik7dmFyIG49dGhpcy5nZXRFdmVudExpc3RlbmVycyhlLHQpO2lmKHQpe2lmKHQpe3ZhciByLGk9byhuKTt0cnl7Zm9yKGkucygpOyEocj1pLm4oKSkuZG9uZTspe3ZhciBhPXIudmFsdWU7dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGUsdCxudWxsLGEub3B0aW9ucyl9fWNhdGNoKGUpe2kuZShlKX1maW5hbGx5e2kuZigpfX19ZWxzZXt2YXIgcyxsPW8obik7dHJ5e2ZvcihsLnMoKTshKHM9bC5uKCkpLmRvbmU7KXt2YXIgdSxjPXMudmFsdWUsZj1jLmV2ZW50VHlwZSx2PW8oYy5saXN0ZW5lcnMpO3RyeXtmb3Iodi5zKCk7ISh1PXYubigpKS5kb25lOyl7dmFyIHk9dS52YWx1ZS5vcHRpb25zO3RoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLGYsbnVsbCx5KX19Y2F0Y2goZSl7di5lKGUpfWZpbmFsbHl7di5mKCl9fX1jYXRjaChlKXtsLmUoZSl9ZmluYWxseXtsLmYoKX19fX0se2tleTpcImNsZWFyRXZlbnRMaXN0ZW5lclwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcj10aGlzLmdldEV2ZW50TGlzdGVuZXIoZSx0LG4pO3ImJnIub3B0aW9ucyYmdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGUsdCxudWxsLHIub3B0aW9ucyl9fSx7a2V5OlwiZ2V0QWxsRXZlbnRUYXJnZXRzXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmV2VGFyZ2V0TGlzdGVuZXJzTWFwLmtleXMoKSl9fSx7a2V5Olwic2VhcmNoRXZlbnRMaXN0ZW5lcnNCeU5hbWVcIix2YWx1ZTpmdW5jdGlvbihlKXt2YXIgdCxuPVtdLHI9byh0aGlzLmdldEFsbEV2ZW50VGFyZ2V0cygpKTt0cnl7Zm9yKHIucygpOyEodD1yLm4oKSkuZG9uZTspe3ZhciBpLGE9dC52YWx1ZSxzPXRoaXMuZXZUYXJnZXRMaXN0ZW5lcnNNYXAuZ2V0KGEpLGw9byhzLmtleXMoKSk7dHJ5e2ZvcihsLnMoKTshKGk9bC5uKCkpLmRvbmU7KXt2YXIgdT1pLnZhbHVlLGM9cy5nZXQodSksZj10aGlzLl9nZXRGcm96ZW5MaXN0ZW5lckRlZihjLmdldChlKSk7ZiYmbi5wdXNoKGYpfX1jYXRjaChlKXtsLmUoZSl9ZmluYWxseXtsLmYoKX19fWNhdGNoKGUpe3IuZShlKX1maW5hbGx5e3IuZigpfXJldHVybiBufX0se2tleTpcIl9zZWFyY2hLZXlJblZhbHVlQ29udGVudFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxuKXt2YXIgcixhPW8oZSk7dHJ5e2ZvcihhLnMoKTshKHI9YS5uKCkpLmRvbmU7KXt2YXIgcz1pKHIudmFsdWUsMiksbD1zWzBdO2lmKHNbMV1bdF09PT1uKXJldHVybiBsfX1jYXRjaChlKXthLmUoZSl9ZmluYWxseXthLmYoKX1yZXR1cm4gbnVsbH19LHtrZXk6XCJfY2hlY2tUeXBlT2ZPcHRpb25zXCIsdmFsdWU6ZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIiE9PXIoZSkmJnZvaWQgMCE9PWUpdGhyb3dcImJvb2xlYW5cIj09dHlwZW9mIGU/bmV3IEVycm9yKFwiVHlwZSBvZiBib29sZWFuIGlzIG5vdCBhY2NlcHRlZCBhcyB0aGUgZm91cnRoIGFyZ3VtZW50IHlvdSBzcGVjaWZ5LlxcbiAgICAgIElmIHlvdSB3YW50IHRvIGVuYWJsZSB1c2VDYXB0dXJlLCBzcGVjaWZ5IHtjYXB0dXJlOiB0cnVlfSBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciBpbnN0ZWFkLlwiKTpuZXcgRXJyb3IoXCJUeXBlIG9mIFwiLmNvbmNhdChyKGUpLFwiIGlzIG5vdCBhY2NlcHRlZCBhcyB0aGUgZm91cnRoIGFyZ3VtZW50IHlvdSBzcGVjaWZ5LlxcbiAgICAgIElmIHlvdSB3YW50IHRvIHNwZWNpZnkgb3B0aW9ucywgc3BlY2lmeSBhbiBvYmplY3QgbGlrZSB7Y2FwdHVyZTogdHJ1ZSwgbGlzdGVuZXJOYW1lOidteS1saXN0ZW5lci0wMSd9LlwiKSl9fSx7a2V5OlwiX2Nsb25lSnNvblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGUpKX19LHtrZXk6XCJ0eXBlT2ZcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpLnNsaWNlKDgsLTEpfX1dKSYmbCh0LnByb3RvdHlwZSxuKSxhJiZsKHQsYSksZX0oKX1dKS5kZWZhdWx0fSkpOyIsIi8qISBtZXJnZS1kZWVwbHkgdjMuMC4wIENvcHlyaWdodCAoYykgMjAxOS0yMDIwIHJpdmVyc3VuLm9yZ0BnbWFpbC5jb20gKi9cbiFmdW5jdGlvbihlLHIpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXIoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFwibWVyZ2VEZWVwbHlcIixbXSxyKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLm1lcmdlRGVlcGx5PXIoKTplLm1lcmdlRGVlcGx5PXIoKX0odGhpcywoZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHI9e307ZnVuY3Rpb24gdChuKXtpZihyW25dKXJldHVybiByW25dLmV4cG9ydHM7dmFyIG89cltuXT17aTpuLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbbl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c31yZXR1cm4gdC5tPWUsdC5jPXIsdC5kPWZ1bmN0aW9uKGUscixuKXt0Lm8oZSxyKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUscix7ZW51bWVyYWJsZTohMCxnZXQ6bn0pfSx0LnI9ZnVuY3Rpb24oZSl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sdC50PWZ1bmN0aW9uKGUscil7aWYoMSZyJiYoZT10KGUpKSw4JnIpcmV0dXJuIGU7aWYoNCZyJiZcIm9iamVjdFwiPT10eXBlb2YgZSYmZSYmZS5fX2VzTW9kdWxlKXJldHVybiBlO3ZhciBuPU9iamVjdC5jcmVhdGUobnVsbCk7aWYodC5yKG4pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOmV9KSwyJnImJlwic3RyaW5nXCIhPXR5cGVvZiBlKWZvcih2YXIgbyBpbiBlKXQuZChuLG8sZnVuY3Rpb24ocil7cmV0dXJuIGVbcl19LmJpbmQobnVsbCxvKSk7cmV0dXJuIG59LHQubj1mdW5jdGlvbihlKXt2YXIgcj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKHIsXCJhXCIscikscn0sdC5vPWZ1bmN0aW9uKGUscil7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHIpfSx0LnA9XCIvXCIsdCh0LnM9MCl9KFtmdW5jdGlvbihlLHIsdCl7ZS5leHBvcnRzPXQoMSl9LGZ1bmN0aW9uKGUscix0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUscil7dmFyIHQ7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFN5bWJvbHx8bnVsbD09ZVtTeW1ib2wuaXRlcmF0b3JdKXtpZihBcnJheS5pc0FycmF5KGUpfHwodD1hKGUpKXx8ciYmZSYmXCJudW1iZXJcIj09dHlwZW9mIGUubGVuZ3RoKXt0JiYoZT10KTt2YXIgbj0wLG89ZnVuY3Rpb24oKXt9O3JldHVybntzOm8sbjpmdW5jdGlvbigpe3JldHVybiBuPj1lLmxlbmd0aD97ZG9uZTohMH06e2RvbmU6ITEsdmFsdWU6ZVtuKytdfX0sZTpmdW5jdGlvbihlKXt0aHJvdyBlfSxmOm99fXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKX12YXIgaSx1PSEwLGM9ITE7cmV0dXJue3M6ZnVuY3Rpb24oKXt0PWVbU3ltYm9sLml0ZXJhdG9yXSgpfSxuOmZ1bmN0aW9uKCl7dmFyIGU9dC5uZXh0KCk7cmV0dXJuIHU9ZS5kb25lLGV9LGU6ZnVuY3Rpb24oZSl7Yz0hMCxpPWV9LGY6ZnVuY3Rpb24oKXt0cnl7dXx8bnVsbD09dC5yZXR1cm58fHQucmV0dXJuKCl9ZmluYWxseXtpZihjKXRocm93IGl9fX19ZnVuY3Rpb24gbyhlKXtyZXR1cm4gZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gdShlKX0oZSl8fGZ1bmN0aW9uKGUpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoZSkpcmV0dXJuIEFycmF5LmZyb20oZSl9KGUpfHxhKGUpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfSgpfWZ1bmN0aW9uIGkoZSxyKXtyZXR1cm4gZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gZX0oZSl8fGZ1bmN0aW9uKGUscil7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFN5bWJvbHx8IShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpKSlyZXR1cm47dmFyIHQ9W10sbj0hMCxvPSExLGk9dm9pZCAwO3RyeXtmb3IodmFyIGEsdT1lW1N5bWJvbC5pdGVyYXRvcl0oKTshKG49KGE9dS5uZXh0KCkpLmRvbmUpJiYodC5wdXNoKGEudmFsdWUpLCFyfHx0Lmxlbmd0aCE9PXIpO249ITApO31jYXRjaChlKXtvPSEwLGk9ZX1maW5hbGx5e3RyeXtufHxudWxsPT11LnJldHVybnx8dS5yZXR1cm4oKX1maW5hbGx5e2lmKG8pdGhyb3cgaX19cmV0dXJuIHR9KGUscil8fGEoZSxyKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfSgpfWZ1bmN0aW9uIGEoZSxyKXtpZihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlyZXR1cm4gdShlLHIpO3ZhciB0PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKS5zbGljZSg4LC0xKTtyZXR1cm5cIk9iamVjdFwiPT09dCYmZS5jb25zdHJ1Y3RvciYmKHQ9ZS5jb25zdHJ1Y3Rvci5uYW1lKSxcIk1hcFwiPT09dHx8XCJTZXRcIj09PXQ/QXJyYXkuZnJvbShlKTpcIkFyZ3VtZW50c1wiPT09dHx8L14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QodCk/dShlLHIpOnZvaWQgMH19ZnVuY3Rpb24gdShlLHIpeyhudWxsPT1yfHxyPmUubGVuZ3RoKSYmKHI9ZS5sZW5ndGgpO2Zvcih2YXIgdD0wLG49bmV3IEFycmF5KHIpO3Q8cjt0Kyspblt0XT1lW3RdO3JldHVybiBufWZ1bmN0aW9uIGMoZSl7cmV0dXJuKGM9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0pKGUpfWZ1bmN0aW9uIGYoZSxyLHQpe3ZhciBhPWZ1bmN0aW9uKGUpe3JldHVybiBlJiZcIm9iamVjdFwiPT09YyhlKSYmIUFycmF5LmlzQXJyYXkoZSl9LHU9dCYmdC5jb25jYXRBcnJheSxsPXQuaXNDbG9uZU1vZGUseT17fTt0JiZ0LmFzc2lnblRvT2JqZWN0JiYoeT10LmFzc2lnblRvT2JqZWN0LHQuYXNzaWduVG9PYmplY3Q9bnVsbCk7dmFyIHMsYixwLGQ9bnVsbDtpZihkPXk9PT1lP2U6T2JqZWN0LmFzc2lnbih5LGUpLGEoZSkmJmEocikpZm9yKHZhciBtPTAsaj1PYmplY3QuZW50cmllcyhyKTttPGoubGVuZ3RoO20rKyl7dmFyIHY9aShqW21dLDIpLGc9dlswXSxoPXZbMV0sTz1lW2ddO2lmKHUmJkFycmF5LmlzQXJyYXkoaCkmJkFycmF5LmlzQXJyYXkoTykmJnIhPT1lKWRbZ109Ty5jb25jYXQuYXBwbHkoTyxvKGgpKTtlbHNlIGlmKGEoaCkmJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLGcpKWRbZ109ZihPLGgsdCk7ZWxzZXt2YXIgQT1oO2lmKGwmJkFycmF5LmlzQXJyYXkoaCkpe3ZhciBTLHc9W10seD1uKGgpO3RyeXtmb3IoeC5zKCk7IShTPXgubigpKS5kb25lOyl7dmFyIFQ9Uy52YWx1ZSxQPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoVCkpO3cucHVzaChQKX19Y2F0Y2goZSl7eC5lKGUpfWZpbmFsbHl7eC5mKCl9QT13fU9iamVjdC5hc3NpZ24oZCwocD1BLChiPWcpaW4ocz17fSk/T2JqZWN0LmRlZmluZVByb3BlcnR5KHMsYix7dmFsdWU6cCxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnNbYl09cCxzKSl9fXJldHVybiBkfWZ1bmN0aW9uIGwoZSl7dmFyIHI9bnVsbCx0PW51bGwsbj1lLm9wO2lmKCFuKXRocm93IEVycm9yKCdUaGUgaW5pdGlhbGl6YXRpb24gcHJvcGVydHkgXCJvcFwiIGNhbm5vdCBiZSBvbWl0dGVkLiBcIm1lcmdlXCIsXCJvdmVyd3JpdGUtbWVyZ2VcIixcImNsb25lXCIgY2FuIGJlIHNwZWNpZmllZC4nKTt2YXIgbz1cIm1lcmdlXCI9PT1uLGk9XCJjbG9uZVwiPT09bixhPVwib3ZlcndyaXRlLW1lcmdlXCI9PT1uO2lmKG8pe2lmKHI9ZS5vYmplY3QxLHQ9ZS5vYmplY3QyLCFyfHwhdCl0aHJvdyBFcnJvcihcIm9iamVjdDEgb3Igb2JqZWN0MiBpcyBub3Qgc3BlY2lmaWVkLlwiKX1lbHNlIGlmKGEpe2lmKHI9ZS5vYmplY3QxLHQ9ZS5vYmplY3QyLCFyfHwhdCl0aHJvdyBFcnJvcihcIm9iamVjdDEgb3Igb2JqZWN0MiBpcyBub3Qgc3BlY2lmaWVkLlwiKTtpZigwPT09T2JqZWN0LmtleXModCkubGVuZ3RoKXJldHVybiBudWxsfWVsc2V7aWYoIWkpdGhyb3cgRXJyb3IoJ0FuIGludmFsaWQgXCJvcFwiIHByb3BlcnR5IHZhbHVlIFwiJy5jb25jYXQobiwnXCIgaGFzIGJlZW4gc3BlY2lmaWVkLicpKTtyPWUub2JqZWN0MSx0PXt9fXZhciB1LGM9T2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YocikpLGw9bnVsbCx5PSh1PXIsT2JqZWN0LmdldFByb3RvdHlwZU9mKHUpIT09T2JqZWN0LnByb3RvdHlwZSk7cmV0dXJuIG8mJnl8fGk/KGYocixyLHthc3NpZ25Ub09iamVjdDpjLGNvbmNhdEFycmF5OmUmJmUuY29uY2F0QXJyYXksaXNDbG9uZU1vZGU6aX0pLGw9Yyk6bD17fSxmKGk/bDpyLHQse2Fzc2lnblRvT2JqZWN0OmE/cjpsLGNvbmNhdEFycmF5OmUmJmUuY29uY2F0QXJyYXl9KSxsfXQucihyKSx0LmQocixcImRlZmF1bHRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gbH0pKX1dKS5kZWZhdWx0fSkpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmpzZnJhbWUtdGl0bGViYXItZGVmYXVsdCB7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGNvbG9yLXN0b3AoMC4wLCAjZjVmNWY1LCBjb2xvci1zdG9wKDEuMCwgI2Y4ZjdmMikpKTtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXG59XFxuXFxuLmpzZnJhbWUtdGl0bGViYXItZm9jdXNlZCB7XFxuICAgIC8qIChjKTIwMTUgSm9oYW5uZXMgSmFrb2JcXG4gICAgICAgTWFkZSB3aXRoIDwzIGluIEdlcm1hbnkgKi9cXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNlYmViZWIsIGNvbG9yLXN0b3AoMS4wLCAjZDVkNWQ1KSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZWJlYmViLCAjZDVkNWQ1KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1tb2RhbC13aW5kb3ctYmFja2dyb3VuZCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWRkdGg6IDEwMCVcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL0pTRnJhbWUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSTtnQ0FDNEI7SUFDNUIsK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaO0FBQ0pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtdGl0bGViYXItZGVmYXVsdCB7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtZ3JhZGllbnQobGluZWFyLCBsZWZ0IHRvcCwgbGVmdCBib3R0b20sIGNvbG9yLXN0b3AoMC4wLCAjZjVmNWY1LCBjb2xvci1zdG9wKDEuMCwgI2Y4ZjdmMikpKTtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDZweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDZweDtcXG59XFxuXFxuLmpzZnJhbWUtdGl0bGViYXItZm9jdXNlZCB7XFxuICAgIC8qIChjKTIwMTUgSm9oYW5uZXMgSmFrb2JcXG4gICAgICAgTWFkZSB3aXRoIDwzIGluIEdlcm1hbnkgKi9cXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNlYmViZWIsIGNvbG9yLXN0b3AoMS4wLCAjZDVkNWQ1KSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZWJlYmViLCAjZDVkNWQ1KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1tb2RhbC13aW5kb3ctYmFja2dyb3VuZCB7XFxuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICB3aWRkdGg6IDEwMCVcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLW1hdGVyaWFsLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtbWF0ZXJpYWwtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzZweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZU1hdGVyaWFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDRCQUE0QjtJQUM1Qiw2QkFBNkI7QUFDakNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLW1hdGVyaWFsLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtbWF0ZXJpYWwtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAzNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMzZweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtcG9wdXAtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVQb3B1cC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0FBQ2hDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5qc2ZyYW1lLXByZXNldC1zdHlsZS1wb3B1cC1kZWZhdWx0IHtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDBweDtcXG59XFxuXFxuLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWZvY3VzZWQge1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuanNmcmFtZS1wcmVzZXQtc3R5bGUtcmVkc3RvbmUtZGVmYXVsdCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XFxufVxcblxcbi5qc2ZyYW1lLXByZXNldC1zdHlsZS1yZWRzdG9uZS1mb2N1c2VkIHtcXG4gICAgYmFja2dyb3VuZDogd2hpdGU7XFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDBweDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDBweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3ByZXNldHMvYXBwZWFyYW5jZS9QcmVzZXRTdHlsZVJlZHN0b25lLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsNEJBQTRCO0FBQ2hDOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXJlZHN0b25lLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMHB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMHB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUtcmVkc3RvbmUtZm9jdXNlZCB7XFxuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwcHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5qc2ZyYW1lLXByZXNldC1zdHlsZS15b3NlbWl0ZS1kZWZhdWx0IHtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNmNWY1ZjUsIGNvbG9yLXN0b3AoMS4wLCAjZjhmN2YyKSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNmNWY1ZjUsICNmOGY3ZjIpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNmNWY1ZjUsICNmOGY3ZjIpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZjVmNWY1LCAjZjhmN2YyKTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cXG4uanNmcmFtZS1wcmVzZXQtc3R5bGUteW9zZW1pdGUtZm9jdXNlZCB7XFxuICAgIC8qIChjKTIwMTUgSm9oYW5uZXMgSmFrb2JcXG4gICAgICAgTWFkZSB3aXRoIDwzIGluIEdlcm1hbnkgKi9cXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgY29sb3Itc3RvcCgwLjAsICNlYmViZWIsIGNvbG9yLXN0b3AoMS4wLCAjZDVkNWQ1KSkpO1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG9wLCAjZWJlYmViLCAjZDVkNWQ1KTtcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNnB4O1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNnB4O1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvcHJlc2V0cy9hcHBlYXJhbmNlL1ByZXNldFN0eWxlWW9zZW1pdGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaEM7O0FBRUE7SUFDSTtnQ0FDNEI7SUFDNUIsK0dBQStHO0lBQy9HLDBEQUEwRDtJQUMxRCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELDJCQUEyQjtJQUMzQiw0QkFBNEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmpzZnJhbWUtcHJlc2V0LXN0eWxlLXlvc2VtaXRlLWRlZmF1bHQge1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBjb2xvci1zdG9wKDAuMCwgI2Y1ZjVmNSwgY29sb3Itc3RvcCgxLjAsICNmOGY3ZjIpKSk7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2Y1ZjVmNSwgI2Y4ZjdmMik7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICNmNWY1ZjUsICNmOGY3ZjIpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxufVxcblxcbi5qc2ZyYW1lLXByZXNldC1zdHlsZS15b3NlbWl0ZS1mb2N1c2VkIHtcXG4gICAgLyogKGMpMjAxNSBKb2hhbm5lcyBKYWtvYlxcbiAgICAgICBNYWRlIHdpdGggPDMgaW4gR2VybWFueSAqL1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBjb2xvci1zdG9wKDAuMCwgI2ViZWJlYiwgY29sb3Itc3RvcCgxLjAsICNkNWQ1ZDUpKSk7XFxuICAgIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ViZWJlYiwgI2Q1ZDVkNSk7XFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgI2ViZWJlYiwgI2Q1ZDVkNSk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICNlYmViZWIsICNkNWQ1ZDUpO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA2cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA2cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAodHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgJycpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn07IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9KU0ZyYW1lLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vUHJlc2V0U3R5bGVNYXRlcmlhbC5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1ByZXNldFN0eWxlUG9wdXAuY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiaW1wb3J0IGFwaSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgICAgICAgaW1wb3J0IGNvbnRlbnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9QcmVzZXRTdHlsZVJlZHN0b25lLmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vUHJlc2V0U3R5bGVZb3NlbWl0ZS5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIkNBTElHTiA9IHt9O1xuXG5DQUxJR04uTEVGVF9UT1AgPSBcIkxFRlRfVE9QXCI7XG5DQUxJR04uSENFTlRFUl9UT1AgPSBcIkNFTlRFUl9UT1BcIjtcbkNBTElHTi5SSUdIVF9UT1AgPSBcIlJJR0hUX1RPUFwiO1xuQ0FMSUdOLkxFRlRfVkNFTlRFUiA9IFwiTEVGVF9DRU5URVJcIjtcbkNBTElHTi5IQ0VOVEVSX1ZDRU5URVIgPSBcIkNFTlRFUl9DRU5URVJcIjtcbkNBTElHTi5DRU5URVIgPSBDQUxJR04uSENFTlRFUl9WQ0VOVEVSO1xuQ0FMSUdOLlJJR0hUX1ZDRU5URVIgPSBcIlJJR0hUX0NFTlRFUlwiO1xuQ0FMSUdOLkxFRlRfQk9UVE9NID0gXCJMRUZUX0JPVFRPTVwiO1xuQ0FMSUdOLkhDRU5URVJfQk9UVE9NID0gXCJDRU5URVJfQk9UVE9NXCI7XG5DQUxJR04uUklHSFRfQk9UVE9NID0gXCJSSUdIVF9CT1RUT01cIjtcblxubW9kdWxlLmV4cG9ydHMgPSBDQUxJR047XG4iLCJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcIi4vSlNGcmFtZS5jc3NcIik7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIkByaXZlcnN1bi9ldmVudC1lbWl0dGVyXCIpO1xudmFyIENBTElHTiA9IHJlcXVpcmUoXCIuL0NDb21tb24uanNcIik7XG52YXIgV2luZG93RXZlbnRIZWxwZXIgPSByZXF1aXJlKFwiLi91dGlscy9XaW5kb3dFdmVudEhlbHBlci5qc1wiKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZShcIi4vdXRpbHMvSW5oZXJpdC5qc1wiKTtcbnZhciBDRnJhbWVBcHBlYXJhbmNlID0gcmVxdWlyZShcIi4vYXBwZWFyYW5jZS9DRnJhbWVBcHBlYXJhbmNlLmpzXCIpO1xudmFyIENEb21QYXJ0c0J1aWxkZXIgPSByZXF1aXJlKFwiLi9hcHBlYXJhbmNlL0NEb21QYXJ0c0J1aWxkZXIuanNcIik7XG52YXIgQ1NpbXBsZUxheW91dEFuaW1hdG9yID0gcmVxdWlyZShcIi4vdXRpbHMvQ1NpbXBsZUxheW91dEFuaW1hdG9yLmpzXCIpO1xudmFyIEV2ZW50TGlzdGVuZXJIZWxwZXIgPSByZXF1aXJlKFwiZXZlbnQtbGlzdGVuZXItaGVscGVyXCIpO1xuXG4vL0lmIHlvdSBkb24ndCB3YW50IHRvIGJ1bmRsZSBwcmVzZXQgc3R5bGVzIGluIEpzRnJhbWUuanMgLGNvbW1lbnQgb3V0IGJlbG93LlxudmFyIHByZXNldFN0eWxlcyA9IHtcbiAgXCJ5b3NlbWl0ZVwiOiByZXF1aXJlKFwiLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVZb3NlbWl0ZS5qc1wiKSxcbiAgXCJyZWRzdG9uZVwiOiByZXF1aXJlKFwiLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVSZWRzdG9uZS5qc1wiKSxcbiAgXCJwb3B1cFwiOiByZXF1aXJlKFwiLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVQb3B1cC5qc1wiKSxcbiAgXCJ0b2FzdFwiOiByZXF1aXJlKFwiLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVUb2FzdC5qc1wiKSxcbiAgXCJtYXRlcmlhbFwiOiByZXF1aXJlKFwiLi9wcmVzZXRzL2FwcGVhcmFuY2UvUHJlc2V0U3R5bGVNYXRlcmlhbC5qc1wiKSxcbn07XG5cbnZhciBwcmVzZXRXaW5kb3dzID0ge1xuICBcInlvc2VtaXRlXCI6IHJlcXVpcmUoXCIuL3ByZXNldHMvd2luZG93L1ByZXNldFdpbmRvd1lvc2VtaXRlLmpzXCIpLFxufTtcblxudmFyIERFRiA9IHt9O1xuXG4vLyB0cnVlOlN1cHBvcnQgbW91c2Ugb24gbW91c2UtZW5hYmxlZCBkZXZpY2VzXG52YXIgTU9VU0VfRU5BQkxFRCA9IHRydWU7XG5cbi8vIHRydWU6U3VwcG9ydCB0b3VjaCBvbiB0b3VjaC1lbmFibGVkIGRldmljZXNcbnZhciBUT1VDSF9FTkFCTEVEID0gdHJ1ZTtcblxuLy90cnVlOkFsbG93IHRoZSB3aW5kb3cgdG8gYmUgbW92ZWQgb25seSBpbiB0aGUgY2FzZSBvZiBvbmUgZmluZ2VyXG4vLyAodGhlIHdpbmRvdyBjYW5ub3QgYmUgbW92ZWQgaW4gdGhlIGNhc2Ugb2YgdHdvIG9yIG1vcmUgZmluZ2VycylcbnZhciBUT1VDSF9NT1ZFX09OTFlfV0lUSF9PTkVfRklOR0VSID0gdHJ1ZTtcblxuLyoqXG4gKiBERUZJTklUSU9OU1xuICovXG5ERUYuQ0JFQU4gPSB7fTtcbkRFRi5DQkVBTi5IVE1MX0VMRU1FTlQgPSBcInNwYW5cIjtcbkRFRi5DQkVBTi5IVE1MX0VMRU1FTlRfSURfUFJFRklYID0gXCJodG1sRWxlbWVudF9cIjtcbkRFRi5DQkVBTi5UWVBFX05BTUUgPSBcImJlYW5cIjtcblxuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cbi8qKlxuICogQ0JlYW5GcmFtZSBDbGFzczxwPlxuICogVGhlIHNtYWxsZXN0IHdpbmRvdy4gSXQgaXMgcmVzcG9uc2libGUgZm9yIGJhc2ljIHByb2Nlc3Npbmcgb25seS5cbiAqXG4gKiBAcGFyYW0gYmVhbklkIGlkIG9mIHRoaXMgc21hbGwgd2luZG93XG4gKiBAcGFyYW0gbGVmdFxuICogQHBhcmFtIHRvcFxuICogQHBhcmFtIHdpZHRoXG4gKiBAcGFyYW0gaGVpZ2h0XG4gKiBAcGFyYW0gemluZGV4XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ0JlYW5GcmFtZShcbiAgYmVhbklkLFxuICBsZWZ0LFxuICB0b3AsXG4gIHdpZHRoLFxuICBoZWlnaHQsXG4gIHppbmRleCxcbiAgd19ib3JkZXJfd2lkdGgsXG4gIGFwcGVhcmFuY2UsXG4pIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5tb3ZhYmxlID0gdHJ1ZTtcblxuICAvL2ZpZWxkc1xuICBtZS5pZCA9IGJlYW5JZDtcbiAgbWUucHJvcGVydHkgPSB7fTtcblxuICBtZS5leHRyYSA9IHt9O1xuXG4gIG1lLnBhcmVudENhbnZhcyA9IG51bGw7XG4gIG1lLmh0bWxFbGVtZW50ID0gbnVsbDtcblxuICBtZS5wdWxsVXBEaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoYXBwZWFyYW5jZSkge1xuICAgIG1lLnB1bGxVcERpc2FibGVkID0gYXBwZWFyYW5jZS5wdWxsVXBEaXNhYmxlZDtcbiAgfVxuXG4gIC8vaW5pdGlhbGl6ZVxuICBtZS5odG1sRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoREVGLkNCRUFOLkhUTUxfRUxFTUVOVCk7XG4gIG1lLmh0bWxFbGVtZW50LmlkID0gREVGLkNCRUFOLkhUTUxfRUxFTUVOVF9JRF9QUkVGSVggKyBiZWFuSWQ7XG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQobGVmdCwgMTApICsgXCJweFwiO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS50b3AgPSBwYXJzZUludCh0b3AsIDEwKSArIFwicHhcIjtcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSBwYXJzZUludCh3aWR0aCwgMTApICsgXCJweFwiO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBwYXJzZUludChoZWlnaHQsIDEwKSArIFwicHhcIjtcblxuICAvL1ppbmRleCBtYXkgYmVjb21lICd1bmRlZmluZWQnIGluIHNvbWUgY2FzZXMuXG4gIGlmICh6aW5kZXggIT09IG51bGwpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSB6aW5kZXg7XG4gIH1cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBcIiMwMDAwMDBcIjtcblxuICAvL0lmIEkgc2V0IGEgbGFyZ2VyIGZvbnQgc2l6ZSwgd2lkdGggYW5kIGhlaWdodCBvZiB3aW5kb3cgd2lsbCBiZSBhZmZlY3RlZC4uLi5cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIjFweFwiO1xuXG4gIC8vUmVmZXIgcGFyZW50cyB0byBlYWNoIG90aGVyLihzb3Vnby1zYW5zaG8pXG4gIG1lLmh0bWxFbGVtZW50LnBhcmVudCA9IG1lO1xuXG4gIGlmIChNT1VTRV9FTkFCTEVEKSB7XG4gICAgLy9Ob3RlIHRoYXQgJ21vdXNlRG93bicgaXMgbWFwcGVkIHRvICdvbm1vdXNlZG93bicgb2YgaHRtbEVsZW1lbnQsXG4gICAgLy9zbyB3aGVuICdvbm1vdXNlRG93bicgZmlyZXMgLHRoZSAndGhpcycgd2lsbCBpbmRpY2F0ZSAnaHRtbEVsZW1lbnQnXG4gICAgbWUuaHRtbEVsZW1lbnQub25tb3VzZWRvd24gPSBtZS5vbm1vdXNlRG93bjtcbiAgfVxuXG4gIGlmIChUT1VDSF9FTkFCTEVEKSB7XG4gICAgaWYgKFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93KSB7XG4gICAgICB2YXIgZnVuY09uVG91Y2hTdGFydCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgLy8gVGhlIFwibW91c2Vkb3duXCIgZXZlbnQgaGFwcGVucyByaWdodCBhZnRlciBcInRvdWNoc3RhcnRcIiBldmVudCxcbiAgICAgICAgLy8gYnV0IEkgZG9uJ3QgY2FsbCAjcHJldmVudGRlZmF1bHQgYmVjYXVzZSAjcHJldmVudGRlZmF1bHQgcHJldmVudHMgXCJvbmNsaWNrXCIuXG4gICAgICAgIC8vIFNvLCBwZXJmb3JtICNwcmV2ZW50ZGVmYXVsdCBvbmx5IGZvciBcInRvdWNobW92ZVwiXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBtZS5vbm1vdXNlRG93bi5iaW5kKHRoaXMpKGV2dCk7XG4gICAgICB9O1xuICAgICAgbWUuaHRtbEVsZW1lbnQub250b3VjaHN0YXJ0ID0gZnVuY09uVG91Y2hTdGFydDtcbiAgICB9XG4gIH1cblxuICAvL1R5cGUgbmFtZSBvZiB0aGlzIGNsYXNzXG4gIG1lLmh0bWxFbGVtZW50LnR5cGVOYW1lID0gREVGLkNCRUFOLlRZUEVfTkFNRTtcblxuICAvL1NwZWNpYWwgZmllbGQgaW5kaWNhdGluZyB1c2FnZSBvZiB0aGlzIGNsYXNzXG4gIG1lLmh0bWxFbGVtZW50LnVzYWdlID0gXCJub3RoaW5nXCI7XG5cbiAgLy9XaGV0aGVyIGl0IGNhbiBtb3ZlIG91dHNpZGUgdGhlIGZyYW1lKHdha3UpLlxuICBtZS5odG1sRWxlbWVudC5pc1JhbmdlTGltaXRlZCA9IGZhbHNlO1xuXG4gIC8vTW92ZW1lbnQgbWFnbmlmaWNhdGlvbiBpbiB0aGUgWCBkaXJlY3Rpb25cbiAgLy8oSWYgaXQgaXMgMCwgaXQgY2FuIG5vdCBtb3ZlIGluIHRoZSBYIGRpcmVjdGlvbi4pXG4gIG1lLmh0bWxFbGVtZW50LmFyZ1ggPSAxO1xuXG4gIC8vTW92ZW1lbnQgbWFnbmlmaWNhdGlvbiBpbiBZIGRpcmVjdGlvblxuICAvLyAoSWYgaXQgaXMgMCwgaXQgY2FuIG5vdCBtb3ZlIGluIFkgZGlyZWN0aW9uKVxuICBtZS5odG1sRWxlbWVudC5hcmdZID0gMTtcbiAgbWUuZXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyID0gbnVsbDtcblxuICBtZS5vbk1vdmVMaXN0ZW5lciA9IG51bGw7XG59XG5cbkNCZWFuRnJhbWUucHJvdG90eXBlLmdldFdpbmRvd1R5cGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBcIkNCZWFuRnJhbWVcIjtcbn07XG5cbkNCZWFuRnJhbWUucHJvdG90eXBlLnNldE9uTW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLm9uTW92ZUxpc3RlbmVyID0gbGlzdGVuZXI7XG59O1xuQ0JlYW5GcmFtZS5wcm90b3R5cGUuX29uTW92ZSA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChtZS5vbk1vdmVMaXN0ZW5lcikge1xuICAgIG1lLm9uTW92ZUxpc3RlbmVyKGUpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldCB3aGV0aGVyIHRoZSBmcmFtZSBjYW4gYmUgbW92ZWQgd2hpbGUgZHJhZ2dpbmcgd2l0aCB0aGUgbW91c2VcbiAqIEBwYXJhbSBlbmFibGVkXG4gKi9cbkNCZWFuRnJhbWUucHJvdG90eXBlLnNldE1vdmFibGUgPSBmdW5jdGlvbiAoZW5hYmxlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmIChlbmFibGVkKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWCA9IDE7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWSA9IDE7XG4gIH0gZWxzZSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWCA9IDA7XG4gICAgbWUuaHRtbEVsZW1lbnQuYXJnWSA9IDA7XG4gIH1cblxuICBtZS5tb3ZhYmxlID0gZW5hYmxlZDtcblxuICByZXR1cm4gbWU7XG59O1xuXG5DQmVhbkZyYW1lLnByb3RvdHlwZS5zZXRQYXJlbnRDYW52YXMgPSBmdW5jdGlvbiAocGFyZW50Q2FudmFzKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnBhcmVudENhbnZhcyA9IHBhcmVudENhbnZhcztcbiAgbWUuaHRtbEVsZW1lbnQucGFyZW50Q2FudmFzID0gbWUucGFyZW50Q2FudmFzO1xuICByZXR1cm4gbWU7XG59O1xuQ0JlYW5GcmFtZS5wcm90b3R5cGUuc2V0T25FeHRlcm5hbEFyZWFDbGlja2VkTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuZXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHJldHVybiBtZTtcbn07XG5DQmVhbkZyYW1lLnByb3RvdHlwZS5vbkJvZHlDbGlja2VkID0gZnVuY3Rpb24gKGUpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgY2xpY2tYID0gZS5wYWdlWDtcbiAgdmFyIGNsaWNrWSA9IGUucGFnZVk7XG5cbiAgdmFyIGxlZnQgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0KTtcbiAgdmFyIHRvcCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCk7XG4gIHZhciB3aWR0aCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoKTtcbiAgdmFyIGhlaWdodCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCk7XG5cbiAgaWYgKFxuICAgIGxlZnQgPCBjbGlja1ggJiYgY2xpY2tYIDwgKGxlZnQgKyB3aWR0aCkgJiYgdG9wIDwgY2xpY2tZICYmXG4gICAgKGNsaWNrWSA8IHRvcCArIGhlaWdodClcbiAgKSB7XG4gICAgLy8tIGNsaWNrZWQgaW50ZXJuYWwgYXJlYSBvZiB0aGlzIGZyYW1lXG4gIH0gZWxzZSB7XG4gICAgLy8tIGNsaWNrZWQgZXh0ZXJuYWwgYXJlYSBvZiB0aGlzIGZyYW1lXG4gICAgaWYgKG1lLmV4dGVybmFsQXJlYUNsaWNrZWRMaXN0ZW5lcikge1xuICAgICAgbWUuZXh0ZXJuYWxBcmVhQ2xpY2tlZExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG59O1xuQ0JlYW5GcmFtZS5wcm90b3R5cGUub25tb3VzZURvd24gPSBmdW5jdGlvbiAoZXZ0KSB7XG4gIC8vIFR5cGljYWxseSwgaWYgeW91IG1vdXNlIGRvd24gb24gdGhlIHRpdGxlIHBvcnRpb24sIHRoZSBvbm1vdXNlZG93biBmaXJlcyB0byBtb3ZlIHRoZSB3aW5kb3cuXG4gIC8vIE1vdXNpbmcgZG93biB0aGUgYm90dG9tIG9mIHRoZSB3aW5kb3csIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHdpbmRvdyxcbiAgLy8gb3IgdGhlIGJvdHRvbSBvZiB0aGUgd2luZG93IHdpbGwgZmlyZSB0aGUgb25tb3VzZURvd24gb2YgdGhlIHdpbmRvdyBpdHNlbGYgKENCZWFuRnJhbWUpXG4gIC8vIGFzIHdlbGwgYXMgdGhlIG9ubW91c2VEb3duIG9mIHRoZSBDTWFya2VyV2luZG93IGZvciByZXNpemluZy5cbiAgLy8gRWFjaCBtb3VzZWRvd24gZWxlbWVudCBpcyBzZXQgdG8gYSBjdXJyZW50T2JqZWN0IGFzIGJlaW5nIHNlbGVjdGVkLFxuICAvLyB3aGV0aGVyIGl0J3MgYSB3aW5kb3cgb3IgYSBtYXJrZXIuXG5cbiAgLy8gdGhpcyBtZWFucyBodG1sRWxlbWVudCBvZiBDQmVhbkZyYW1lIG9iamVjdFxuICB2YXIgcmVmSHRtbEVsZW1lbnQgPSB0aGlzO1xuXG4gIHZhciBlID0gZXZ0O1xuXG4gIGlmIChUT1VDSF9FTkFCTEVEKSB7XG4gICAgaWYgKGV2dC50eXBlID09PSBcInRvdWNoc3RhcnRcIikge1xuICAgICAgdmFyIGNoYW5nZWRUb3VjaGVzID0gZXZ0LmNoYW5nZWRUb3VjaGVzO1xuICAgICAgaWYgKFRPVUNIX01PVkVfT05MWV9XSVRIX09ORV9GSU5HRVIpIHtcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBldnQudG91Y2hlcztcbiAgICAgICAgaWYgKHRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZSA9IGNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlID0gY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9SZXRyaWV2ZSBDQmVhbkZyYW1lIG9iamVjdCBpdHNlbGZcbiAgdmFyIHJlZkNCZWFuRnJhbWUgPSByZWZIdG1sRWxlbWVudC5wYXJlbnQ7XG5cbiAgaWYgKGUuYnV0dG9uID09IDAgfHwgZXZ0LnR5cGUgPT09IFwidG91Y2hzdGFydFwiKSB7XG4gICAgLy8gZm9yIG1vZGFsIGJhY2tncm91bmQgd2luZG93XG4gICAgaWYgKHJlZkNCZWFuRnJhbWUucHVsbFVwRGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0IHRoZSBjdXJyZW50IENCZWFuRnJhbWUgdG8gYmUgc2VsZWN0ZWQoPWN1cnJlbnRPYmplY3QpIGFtb25nIG90aGVyIENCZWFuRnJhbWVzIGluIHRoZSBwYXJlbnQgY2FudmFzLlxuICAgICAgcmVmSHRtbEVsZW1lbnQucGFyZW50Q2FudmFzLmN1cnJlbnRPYmplY3QgPSByZWZIdG1sRWxlbWVudDtcblxuICAgICAgLy8gQnJpbmcgdGhlIGN1cnJlbnQgYmVhbiB0byB0aGUgdG9wXG4gICAgICByZWZIdG1sRWxlbWVudC5wYXJlbnRDYW52YXMucHVsbFVwKHJlZkNCZWFuRnJhbWUuaWQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlLmJ1dHRvbiA9PSAyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHJlZkh0bWxFbGVtZW50LnBhcmVudENhbnZhcy5jdXJyZW50T2JqZWN0KSB7XG4gICAgcmVmSHRtbEVsZW1lbnQucGFyZW50Q2FudmFzLm9mZnNldFggPSBlLnBhZ2VYIC1cbiAgICAgIHBhcnNlSW50KHJlZkh0bWxFbGVtZW50LnBhcmVudENhbnZhcy5jdXJyZW50T2JqZWN0LnN0eWxlLmxlZnQsIDEwKTtcbiAgICByZWZIdG1sRWxlbWVudC5wYXJlbnRDYW52YXMub2Zmc2V0WSA9IGUucGFnZVkgLVxuICAgICAgcGFyc2VJbnQocmVmSHRtbEVsZW1lbnQucGFyZW50Q2FudmFzLmN1cnJlbnRPYmplY3Quc3R5bGUudG9wLCAxMCk7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuLyoqXG4gKiBFbmQgb2YgQ0JlYW5GcmFtZSBDbGFzcyA8cD5cbiAqL1xuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuREVGLkNBTlZBUyA9IHt9O1xuREVGLkNBTlZBUy5IVE1MX0VMRU1FTlQgPSBcImRpdlwiO1xuREVGLkNBTlZBUy5XSURUSF9BREpVU1RfMjAxODA3MjIgPSAyO1xuREVGLkNBTlZBUy5IRUlHSFRfQURKVVNUXzIwMTgwNzIyID0gMztcblxuLyoqXG4gKiBDQ2FudmFzIGNsYXNzXG4gKiBBIGNhbnZhcyBpcyBhIHBsYWNlIHdoZXJlIHdpbmRvd3MgYXJlIGFycmFuZ2VkLCB3aGVyZSB5b3UgY2FuIGRyYWcgYW5kIG1vdmUgZnJlZWx5LlxuICpcbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50XG4gKiBAcGFyYW0gY2FudmFzSWRcbiAqIEBwYXJhbSBsZWZ0XG4gKiBAcGFyYW0gdG9wXG4gKiBAcGFyYW0gd2lkdGhcbiAqIEBwYXJhbSBoZWlnaHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDQ2FudmFzKHBhcmVudEVsZW1lbnQsIGNhbnZhc0lkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpIHtcbiAgLy9FdmVudCBkYXRhIHRvIGJlIHRyYW5zbWl0dGVkXG4gIGZ1bmN0aW9uIEV2ZW50RGF0YSgpIHtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gICAgdGhpcy5zY3JlZW5YID0gMDtcbiAgICB0aGlzLnNjcmVlblkgPSAwO1xuICAgIHRoaXMuZGVsdGFYID0gMDtcbiAgICB0aGlzLmRlbHRhWSA9IDA7XG4gICAgdGhpcy5pc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy50YXJnZXRUeXBlTmFtZSA9IG51bGw7XG4gICAgdGhpcy50YXJnZXRVc2FnZSA9IG51bGw7XG4gICAgdGhpcy50YXJnZXRPYmplY3QgPSBudWxsO1xuICB9XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5lbmFibGVQdWxsVXAgPSB0cnVlOyAvLyB0cnVlOlB1bGwtdXAgc29ydGluZyB0byBicmluZyB0aGUgd2luZG93IHRvIHRoZSBmb3JlZnJvbnQgYnkgY2xpY2tpbmcgdG8gZ2V0IGZvY3VzLlxuICBtZS5jdXJyZW50T2JqZWN0ID0gbnVsbDtcbiAgbWUub25Ub3BPYmplY3QgPSBudWxsO1xuICBtZS5vZmZzZXRYID0gMDtcbiAgbWUub2Zmc2V0WSA9IDA7XG5cbiAgLy9PYmplY3Qgd2hpY2ggZ2VuZXJhdGVkICdtb3VzZURvd24nIGV2ZW50IGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyhpY2hpYmFuLXNhaXNobylcbiAgbWUubW91c2VEb3duU291cmNlID0gbnVsbDtcblxuICBtZS5pZCA9IGNhbnZhc0lkO1xuICBtZS5jYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgbWUucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQ7XG4gIG1lLmJlYW5MaXN0ID0gbmV3IEFycmF5KCk7XG5cbiAgbWUuYmVhbklkTmFtZSA9IHt9OyAvL2tleTpiZWFuSWQgdmFsdWU6YmVhbk5hbWVcbiAgbWUuYmVhbk5hbWVJZCA9IHt9OyAvL2tleTpiZWFuTmFtZSB2YWx1ZTpiZWFuSWRcblxuICBtZS5ldmVudERhdGEgPSBuZXcgRXZlbnREYXRhKCk7XG5cbiAgbWUuYmFzZVpJbmRleCA9IDA7XG4gIG1lLnNldEJhc2VaSW5kZXggPSBmdW5jdGlvbiAoYmFzZVpJbmRleCkge1xuICAgIG1lLmJhc2VaSW5kZXggPSBiYXNlWkluZGV4O1xuICB9O1xuICBtZS5nZXRCYXNlWkluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtZS5iYXNlWkluZGV4O1xuICB9O1xuXG4gIG1lLmNhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KERFRi5DQU5WQVMuSFRNTF9FTEVNRU5UKTtcblxuICBtZS5jYW52YXNFbGVtZW50LnN0eWxlLnpJbmRleCA9IDIwMDA7XG4gIG1lLmNhbnZhc0VsZW1lbnQuaWQgPSBtZS5pZDtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQobGVmdCkgKyBcInB4XCI7XG4gIG1lLmNhbnZhc0VsZW1lbnQuc3R5bGUudG9wID0gcGFyc2VJbnQodG9wKSArIFwicHhcIjtcbiAgLy9BZGRlZCBhbiBhZGp1c3RtZW50IHZhbHVlLkJlY2F1c2UgdHJhbnNwYXJlbnQgcGFydCBhcHBlYXJzIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbixcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9XG4gICAgKHBhcnNlSW50KHdpZHRoKSArIERFRi5DQU5WQVMuV0lEVEhfQURKVVNUXzIwMTgwNzIyKSArIFwicHhcIjtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPVxuICAgIChwYXJzZUludChoZWlnaHQpICsgREVGLkNBTlZBUy5IRUlHSFRfQURKVVNUXzIwMTgwNzIyKSArIFwicHhcIjtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7XG4gIG1lLmNhbnZhc0VsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBcIm5vbmVcIjtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjBweFwiO1xuICBtZS5jYW52YXNFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gXCIwcHhcIjtcbiAgbWUuY2FudmFzRWxlbWVudC5zdHlsZS5ib3JkZXJDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcblxuICAvL0FkZCB0aGUgQ2FudmFzJ3MgaHRtbCBlbGVtZW50IGludG8gdGhlIGNhbnZhcydzIHBhcmVudCBodG1sIGVsZW1lbnRcbiAgbWUucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChtZS5jYW52YXNFbGVtZW50KTtcbn1cblxuQ0NhbnZhcy5wcm90b3R5cGUubW91c2VNb3ZlID0gZnVuY3Rpb24gKGV2dCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgZSA9IGV2dDtcbiAgaWYgKFRPVUNIX0VOQUJMRUQpIHtcbiAgICBpZiAoZXZ0LnR5cGUgPT09IFwidG91Y2htb3ZlXCIpIHtcbiAgICAgIHZhciBjaGFuZ2VkVG91Y2hlcyA9IGV2dC5jaGFuZ2VkVG91Y2hlcztcbiAgICAgIGlmIChUT1VDSF9NT1ZFX09OTFlfV0lUSF9PTkVfRklOR0VSKSB7XG4gICAgICAgIHZhciB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgIGlmICh0b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGUgPSBjaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZSA9IGNoYW5nZWRUb3VjaGVzWzBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAobWUuY3VycmVudE9iamVjdCkge1xuICAgIC8vZXZlbnREYXRhLmlzTW92ZWQ9dHJ1ZTtUaGUgcHJlc2VuY2Ugb2YgZXZlbnQgZGF0YSBtZWFucyB0aGF0IGl0IGhhcyBtb3ZlZC5cbiAgICBtZS5ldmVudERhdGEudGFyZ2V0VHlwZU5hbWUgPSBtZS5jdXJyZW50T2JqZWN0LnR5cGVOYW1lO1xuICAgIG1lLmV2ZW50RGF0YS50YXJnZXRVc2FnZSA9IG1lLmN1cnJlbnRPYmplY3QudXNhZ2U7XG4gICAgbWUuZXZlbnREYXRhLnRhcmdldE9iamVjdCA9IG1lLmN1cnJlbnRPYmplY3Q7XG5cbiAgICAvL0V2ZW4gd2hlbiBvYmogaXMgbm90IGJlaW5nIGRyYWdnZWQsIG1vdXNlIGNvb3JkaW5hdGVzIGFyZSB1c2VkIGhlcmUgYmVjYXVzZSB0aGV5IGFyZSBuZWVkZWQuXG4gICAgdmFyIG5ld09iakxlZnRQeCA9IGUucGFnZVggLSBtZS5vZmZzZXRYO1xuICAgIHZhciBuZXdPYmpUb3BQeCA9IGUucGFnZVkgLSBtZS5vZmZzZXRZO1xuXG4gICAgdmFyIGFic29sdXRlTW91c2VYID0gZS5wYWdlWDtcbiAgICB2YXIgYWJzb2x1dGVNb3VzZVkgPSBlLnBhZ2VZO1xuXG4gICAgLy9UYWtlIHRoZSBzbmFwc2hvdCBiZWZvcmUgdXBkYXRpbmcgdGhlIGxvY2F0aW9uLlxuICAgIHZhciBvbGRPYmpMZWZ0UHggPSBtZS5jdXJyZW50T2JqZWN0LnN0eWxlLmxlZnQ7XG4gICAgdmFyIG9sZE9ialRvcFB4ID0gbWUuY3VycmVudE9iamVjdC5zdHlsZS50b3A7XG5cbiAgICAvL1doZW4gdGhlIG1vdXNlIGN1cnNvciBnb2VzIG91dCBvZiByYW5nZSxcbiAgICAvL3RoZSBhZGRpdGlvbiBpbiB0aGUgWCBkaXJlY3Rpb24gYW5kIFkgZGlyZWN0aW9uIChkZWx0YSBYLCBkZWx0YSBZKSBpcyBzZXQgdG8gemVyby5cbiAgICAvL3RoaXMubGVmdD1DYXZhcydzIGxlZnQgc2lkZSBlZGdlLCB0aGlzLnRvcD1DYW52YXMncyB0b3Agc2lkZSBlZGdlLlxuICAgIHZhciB0bXBMZWZ0ID0gcGFyc2VJbnQobmV3T2JqTGVmdFB4LCAxMCk7XG4gICAgdmFyIHRtcFRvcCA9IHBhcnNlSW50KG5ld09ialRvcFB4LCAxMCk7XG5cbiAgICB2YXIgdG1wUmlnaHQgPSB0bXBMZWZ0ICsgcGFyc2VJbnQobWUuY3VycmVudE9iamVjdC5zdHlsZS53aWR0aCwgMTApO1xuICAgIHZhciB0bXBCb3R0b20gPSB0bXBUb3AgKyBwYXJzZUludChtZS5jdXJyZW50T2JqZWN0LnN0eWxlLmhlaWdodCwgMTApO1xuXG4gICAgdmFyIHN0eWxlV2lkdGggPSBwYXJzZUludChtZS5jYW52YXNFbGVtZW50LnN0eWxlLndpZHRoLCAxMCk7XG4gICAgdmFyIHN0eWxlSGVpZ2h0ID0gcGFyc2VJbnQobWUuY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQsIDEwKTtcblxuICAgIHZhciBkZWx0YVggPSAwO1xuICAgIHZhciBkZWx0YVkgPSAwO1xuXG4gICAgaWYgKFxuICAgICAgbWUuY3VycmVudE9iamVjdC5pc1JhbmdlTGltaXRlZCA9PSB0cnVlICYmXG4gICAgICAodG1wTGVmdCA8PSAwIHx8IHRtcFJpZ2h0ID4gc3R5bGVXaWR0aCB8fCB0bXBUb3AgPD0gMCB8fFxuICAgICAgICB0bXBCb3R0b20gPiBzdHlsZUhlaWdodClcbiAgICApIHtcbiAgICAgIGRlbHRhWCA9IDA7XG4gICAgICBkZWx0YVkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWx0YVggPSAocGFyc2VJbnQobmV3T2JqTGVmdFB4LCAxMCkgLSBwYXJzZUludChvbGRPYmpMZWZ0UHgsIDEwKSk7XG4gICAgICBkZWx0YVkgPSAocGFyc2VJbnQobmV3T2JqVG9wUHgsIDEwKSAtIHBhcnNlSW50KG9sZE9ialRvcFB4LCAxMCkpO1xuICAgICAgbWUuY3VycmVudE9iamVjdC5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KG1lLmN1cnJlbnRPYmplY3Quc3R5bGUubGVmdCkgK1xuICAgICAgICBkZWx0YVggKiBtZS5jdXJyZW50T2JqZWN0LmFyZ1gpICsgXCJweFwiO1xuICAgICAgbWUuY3VycmVudE9iamVjdC5zdHlsZS50b3AgPSAocGFyc2VJbnQobWUuY3VycmVudE9iamVjdC5zdHlsZS50b3ApICtcbiAgICAgICAgZGVsdGFZICogbWUuY3VycmVudE9iamVjdC5hcmdZKSArIFwicHhcIjtcblxuICAgICAgdmFyIHBhcmVudE9iamVjdCA9IG1lLmN1cnJlbnRPYmplY3QucGFyZW50O1xuICAgICAgaWYgKHBhcmVudE9iamVjdCAmJiBwYXJlbnRPYmplY3QuX29uTW92ZSkge1xuICAgICAgICBwYXJlbnRPYmplY3QuX29uTW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBtZS5ldmVudERhdGEuZGVsdGFYID0gZGVsdGFYO1xuICAgIG1lLmV2ZW50RGF0YS5kZWx0YVkgPSBkZWx0YVk7XG5cbiAgICByZXR1cm4gbWUuZXZlbnREYXRhO1xuICB9XG4gIC8vUmV0dXJucyBudWxsIGlmIG5vbmUgb2YgdGhlIG9iamVjdHMgYXJlIGNsaWNrZWQgYW5kIHRoZSBvbmx5IG1vdXNlIGp1c3QgbW92ZXMuXG4gIHJldHVybiBudWxsO1xufTtcblxuQ0NhbnZhcy5wcm90b3R5cGUubW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLmN1cnJlbnRPYmplY3QgPSBudWxsO1xuICBtZS5tb3VzZURvd25Tb3VyY2UgPSBudWxsO1xufTtcblxuLy9CcmluZyB0aGUgb2JqZWN0IGluIGZyb250XG5DQ2FudmFzLnByb3RvdHlwZS5wdWxsVXAgPSBmdW5jdGlvbiAodGFyZ2V0QmVhbklkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIHRtcEJlYW5BcnJheSA9IFtdO1xuXG4gIHZhciBiZWFuTGlzdCA9IG1lLmJlYW5MaXN0O1xuXG4gIGZvciAodmFyIGkgaW4gYmVhbkxpc3QpIHtcbiAgICB0bXBCZWFuQXJyYXkucHVzaChiZWFuTGlzdFtpXSk7XG4gIH1cblxuICAvL0JyaW5nIHRoZSB0YXJnZXQgb2JqZWN0IGluIGZyb250IGFuZCBzZXQgemluZGV4IHRvIDEuXG4gIHZhciB0YXJnZXRCZWFuID0gYmVhbkxpc3RbdGFyZ2V0QmVhbklkXTtcblxuICBpZiAobWUuZW5hYmxlUHVsbFVwKSB7XG4gICAgbWUucHVsbFVwU29ydCh0YXJnZXRCZWFuLCB0bXBCZWFuQXJyYXksIG1lLmJhc2VaSW5kZXgpO1xuICB9XG5cbiAgLy9SZW1lbWJlciB0aGUgdG9wIG9iamVjdFxuICBtZS5vblRvcE9iamVjdCA9IHRhcmdldEJlYW47XG59O1xuXG4vL0NhbGN1bGF0ZSB0aGUgZnJvbnQgLyBiYWNrIGluZm9ybWF0aW9uIG9mIHRoZSB3aW5kb3cgYWNjdXJhdGVseS5cbkNDYW52YXMucHJvdG90eXBlLnB1bGxVcFNvcnQgPSBmdW5jdGlvbiAocHVsbHVwT2JqZWN0LCBvYmplY3RBcnJheSwgYmFzZUluZGV4KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9JbmNyZWFzZSB0aGUgaW5kZXggbnVtYmVyIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIHB1bGx1cE9iamVjdC5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSBvYmplY3RBcnJheS5sZW5ndGggKyBiYXNlSW5kZXg7XG5cbiAgLy9zb3J0IGJ5IGluZGV4XG4gIG9iamVjdEFycmF5LnNvcnQoZnVuY3Rpb24gKGIsIGEpIHtcbiAgICByZXR1cm4gLXBhcnNlSW50KGIuaHRtbEVsZW1lbnQuc3R5bGUuekluZGV4LCAxMCkgK1xuICAgICAgcGFyc2VJbnQoYS5odG1sRWxlbWVudC5zdHlsZS56SW5kZXgsIDEwKTtcbiAgfSk7XG5cbiAgLy9SZWRlZmluZSBudW1iZXIgb2YgdGhlIGluZGV4XG4gIGZvciAodmFyIGkgaW4gb2JqZWN0QXJyYXkpIHtcbiAgICBvYmplY3RBcnJheVtpXS5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSAob2JqZWN0QXJyYXkubGVuZ3RoIC0gMSkgLSBpICtcbiAgICAgIGJhc2VJbmRleDtcbiAgfVxufTtcblxuLyoqXG4gKiByZW1vdmUgdGhlIGJlYW4gb2JqZWN0XG4gKiBAcGFyYW0gYmVhbklkXG4gKi9cbkNDYW52YXMucHJvdG90eXBlLnJlbW92ZUJlYW4gPSBmdW5jdGlvbiAoYmVhbklkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9SZXRyaWV2ZSB0aGUgdGFyZ2V0IGJlYW5GcmFtZVxuICB2YXIgYmVhbkxpc3QgPSBtZS5iZWFuTGlzdDtcbiAgdmFyIHRhcmdldEJlYW4gPSBiZWFuTGlzdFtiZWFuSWRdO1xuXG4gIC8vUmVtb3ZlIGJlYW4ncyBodG1sRWxlbWVudCBmcm9tIGNhbnZhc0VsZW1lbnRcbiAgbWUuY2FudmFzRWxlbWVudC5yZW1vdmVDaGlsZCh0YXJnZXRCZWFuLmh0bWxFbGVtZW50KTtcblxuICAvL0RlbGV0ZSB0aGUgYmVhbiBvYmplY3QgaW4gdGhlIGFzc29jaWF0aXZlIGFycmF5LlxuICBkZWxldGUgYmVhbkxpc3RbYmVhbklkXTtcbn07XG5cbi8qKlxuICogQWRkIGJlYW4gaW50byB0aGlzIGNhbnZhc1xuICogQHBhcmFtIGJlYW5cbiAqL1xuQ0NhbnZhcy5wcm90b3R5cGUuYWRkQmVhbiA9IGZ1bmN0aW9uIChiZWFuKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGJlYW5MaXN0ID0gbWUuYmVhbkxpc3Q7XG5cbiAgdmFyIGJlYW5JZE5hbWUgPSBtZS5iZWFuSWROYW1lOyAvL2tleTpiZWFuSWQgdmFsdWU6YmVhbk5hbWVcbiAgdmFyIGJlYW5OYW1lSWQgPSBtZS5iZWFuTmFtZUlkOyAvL2tleTpiZWFuTmFtZSB2YWx1ZTpiZWFuSWRcblxuICBiZWFuTGlzdFtiZWFuLmlkXSA9IGJlYW47XG5cbiAgaWYgKGJlYW4ucHJvcGVydHkubmFtZSkge1xuICAgIGJlYW5OYW1lSWRbYmVhbi5wcm9wZXJ0eS5uYW1lXSA9IGJlYW4uaWQ7XG4gICAgYmVhbklkTmFtZVtiZWFuLmlkXSA9IGJlYW4ucHJvcGVydHkubmFtZTtcbiAgfVxuXG4gIC8vSW4gdGhpcyB1c2FnZSBjYXNlIHRoZSAnbGVuZ3RoJyBwcm9wZXJ0eSBpcyBpbnZhbGlkIC4uXG4gIHZhciBudW0gPSAwO1xuXG4gIGZvciAodmFyIGogaW4gYmVhbkxpc3QpIHtcbiAgICBudW0rKztcbiAgfVxuXG4gIC8vU2V0IHpJbmRleCBzbyB0aGF0IHdoYXQgeW91IGFkZCBsYXRlciB3aWxsIGNvbWUgdXAuXG4gIGJlYW4uaHRtbEVsZW1lbnQuc3R5bGUuekluZGV4ID0gbnVtICsgbWUuYmFzZVpJbmRleDtcblxuICAvL09uIHRoZSBiZWFuIHNpZGUsIHNwZWNpZnkgdGhlIHBhcmVudCBvZiB0aGUgYmVhbiB0byBtZS5cbiAgYmVhbi5zZXRQYXJlbnRDYW52YXMobWUpO1xuXG4gIHRoaXMuY2FudmFzRWxlbWVudC5hcHBlbmRDaGlsZChiZWFuLmh0bWxFbGVtZW50KTtcbn07XG5cbkNDYW52YXMucHJvdG90eXBlLmdldFBhcmVudEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5wYXJlbnRFbGVtZW50O1xufTtcblxuLyoqXG4gKiBFbmQgb2YgY2FudmFzIGNsYXNzXG4gKi9cblxuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cbkRFRi5DRlJBTUUgPSB7fTtcbkRFRi5DRlJBTUUuQ0FOVkFTX0VMRU1FTlRfQkdDT0xPUiA9IFwidHJhbnNwYXJlbnRcIjtcbkRFRi5DRlJBTUUuTU9EQUxfQkFDS0dST1VORF9GUkFNRV9JRF9QUkVGSVggPVxuICBcIndpbmRvd19fbW9kYWxfd2luZG93X2JhY2tncm91bmRfXCI7XG5cbmluaGVyaXQoQ0ZyYW1lLCBDQmVhbkZyYW1lKTtcblxuLyoqXG4gKiBDRnJhbWUgY2xhc3NcbiAqIDxwPlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgd2luZG93IHdob3NlIHNpemUgY2FuIGJlIGNoYW5nZWQgLFxuICogY2FuIG1vdmUgZnJlZWx5IG9uIHRoZSBzY3JlZW4sXG4gKiBjYW4gaGF2ZSBhIHRpdGxlIGJhcixcbiAqXG4gKiBAcGFyYW0gd2luZG93SWRcbiAqIEBwYXJhbSB3X2xlZnRcbiAqIEBwYXJhbSB3X3RvcFxuICogQHBhcmFtIHdfd2lkdGhcbiAqIEBwYXJhbSB3X2hlaWdodFxuICogQHBhcmFtIHppbmRleFxuICogQHBhcmFtIHdfYm9yZGVyX3dpZHRoXG4gKiBAcGFyYW0gYXBwZWFyYW5jZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENGcmFtZShcbiAgd2luZG93SWQsXG4gIHdfbGVmdCxcbiAgd190b3AsXG4gIHdfd2lkdGgsXG4gIHdfaGVpZ2h0LFxuICB6aW5kZXgsXG4gIHdfYm9yZGVyX3dpZHRoLFxuICBhcHBlYXJhbmNlLFxuKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9jYWxsIGNvbnN0cnVjdG9yIG9mIHN1cGVyY2xhc3NcbiAgQ0ZyYW1lLnN1cGVyQ29uc3RydWN0b3IuY2FsbChcbiAgICB0aGlzLFxuICAgIHdpbmRvd0lkLFxuICAgIHdfbGVmdCxcbiAgICB3X3RvcCxcbiAgICB3X3dpZHRoLFxuICAgIHdfaGVpZ2h0LFxuICAgIHppbmRleCxcbiAgICB3X2JvcmRlcl93aWR0aCxcbiAgICBhcHBlYXJhbmNlLFxuICApO1xuXG4gIG1lLmFuY2hvciA9IENBTElHTi5MRUZUX1RPUDtcblxuICBtZS5zaG93VGl0bGVCYXIgPSBhcHBlYXJhbmNlLnNob3dUaXRsZUJhcjtcblxuICBtZS5jYW52YXNOZXRIZWlnaHQgPSBudWxsO1xuICBtZS5jYW52YXNOZXRXaWR0aCA9IG51bGw7XG4gIG1lLmZyYW1lSGVpZ2h0QWRqdXN0ID0gYXBwZWFyYW5jZS5mcmFtZUhlaWdodEFkanVzdDtcblxuICBtZS5mcmFtZUNvbXBvbmVudE1hcCA9IHt9O1xuXG4gIC8vaW5pdGlhbGl6ZSB0aGUgZmllbGRcbiAgbWUuY2FudmFzID0gbnVsbDtcblxuICAvL2NhbnZhcyBpZFxuICBtZS5teUNhbnZhc0lkID0gbnVsbDtcblxuICAvL0J1dHRvbnMgdG8gYmUgcGxhY2VkIG9uIHRoZSBzY3JlZW4gKHBvc2l0aW9uaW5nIHNhbWUgYXMgdGhlIGNsb3NlIGJ1dHRvbilcbiAgbWUuZmxvYXRpbmdCdXR0b24gPSBudWxsO1xuXG4gIG1lLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCA9IFwianNmcmFtZS10aXRsZWJhci1kZWZhdWx0XCI7IC8vIERFRi5DRlJBTUUuVElUTEVfQkFSX0NMQVNTX0RFRkFVTFQ7XG4gIG1lLnRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZCA9IFwianNmcmFtZS10aXRsZWJhci1mb2N1c2VkXCI7IC8vREVGLkNGUkFNRS5USVRMRV9CQVJfQ0xBU1NfRk9DVVNFRDtcblxuICAvL2hlaWdodCBvZiB0aXRsZWJhclxuICBtZS50aXRsZUJhckhlaWdodCA9IGFwcGVhcmFuY2UudGl0bGVCYXJIZWlnaHQ7XG5cbiAgbWUudGl0bGVCYXJDYXB0aW9uID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb247XG4gIG1lLnRpdGxlQmFyQ2FwdGlvbkxlZnRNYXJnaW4gPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ2FwdGlvbkxlZnRNYXJnaW47XG4gIG1lLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb25Gb250U2l6ZTtcbiAgbWUudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodCA9IGFwcGVhcmFuY2UudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodDtcbiAgbWUudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gYXBwZWFyYW5jZS50aXRsZUJhckJvcmRlckJvdHRvbURlZmF1bHQ7XG4gIG1lLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IGFwcGVhcmFuY2UudGl0bGVCYXJCb3JkZXJCb3R0b21Gb2N1c2VkO1xuICBtZS50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93ID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93O1xuICBtZS50aXRsZUJhckNhcHRpb25UZXh0QWxpZ24gPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ2FwdGlvblRleHRBbGlnbjtcblxuICAvL1RpdGxlIGJhciB3aWR0aCBhZGp1c3RtZW50IHZhbHVlXG4gIG1lLnRpdGxlQWRqdXN0V2lkdGggPSAyO1xuXG4gIG1lLndpbmRvd0lkID0gd2luZG93SWQ7XG5cbiAgbWUuZXhCb3JkZXJXaWR0aCA9IDA7XG5cbiAgbWUubXlDYW52YXNJZCA9IHdpbmRvd0lkICsgXCJfY2FudmFzXCI7XG5cbiAgLy9pbWcgZWxlbWVudCBmb3IgaWNvbiBwbGFjZWQgb24gdGhlIGxlZnQtdG9wXG4gIHZhciBhcHBJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgLy9cdFx0YXBwSWNvbi5zcmM9J2ltZy9pY29fYXBwX2ZpbGUxNi5naWYnO1xuXG4gIC8vdXJsIG9mIGljb24gaW1hZ2VcbiAgYXBwSWNvbi5zcmMgPSBcIlwiO1xuICBhcHBJY29uLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICBhcHBJY29uLnN0eWxlLmxlZnQgPSBcIjJweFwiO1xuICBhcHBJY29uLnN0eWxlLnRvcCA9IFwiMnB4XCI7XG4gIGFwcEljb24uc3R5bGUud2lkdGggPSBcIjE2cHhcIjtcbiAgYXBwSWNvbi5zdHlsZS5oZWlnaHQgPSBcIjE2cHhcIjtcbiAgYXBwSWNvbi5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcblxuICAvL1RoZSB0aXRsZSBiYXIgbXVzdCBiZSBvbiB0aGUgZnJvbnQgb2YgdGhlIGNhbnZhcy5cbiAgbWUudGl0bGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIG1lLnRpdGxlQmFyLmNsYXNzTmFtZSA9IFwianNmcmFtZXRpdGxlYmFyXCI7XG5cbiAgaWYgKG1lLnNob3dUaXRsZUJhcikge1xuICAgIG1lLnRpdGxlQmFyLmlkID0gd2luZG93SWQgKyBcIl90aXRsZVwiO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJveFNpemluZyA9IFwiYm9yZGVyLWJveFwiO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUud2lkdGggPVxuICAgICAgKHdfd2lkdGggLSBtZS50aXRsZUFkanVzdFdpZHRoICsgREVGLkNBTlZBUy5XSURUSF9BREpVU1RfMjAxODA3MjIpICsgXCJweFwiO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnVzZXJTZWxlY3QgPSBcIm5vbmVcIjtcblxuICAgIGlmIChtZS50aXRsZUJhckhlaWdodCkge1xuICAgICAgdmFyIHRpdGxlQmFyQWRqdXN0ID0gMDtcblxuICAgICAgaWYgKG1lLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdCkge1xuICAgICAgICB0aXRsZUJhckFkanVzdCA9IDA7XG4gICAgICB9XG5cbiAgICAgIG1lLnRpdGxlQmFyLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChtZS50aXRsZUJhckhlaWdodCwgMTApICsgMCkgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgaWYgKG1lLnRpdGxlQmFyQ29sb3JEZWZhdWx0KSB7XG4gICAgICBtZS50aXRsZUJhci5zdHlsZS5iYWNrZ3JvdW5kID0gbWUudGl0bGVCYXJDb2xvckRlZmF1bHQ7XG4gICAgfVxuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnpJbmRleCA9IDA7XG5cbiAgICBtZS50aXRsZUJhci5zdHlsZS5jb2xvciA9IG1lLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdDtcbiAgICBtZS50aXRsZUJhci5zdHlsZS5mb250U2l6ZSA9IG1lLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplO1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmZvbnRXZWlnaHQgPSBtZS50aXRsZUJhckNhcHRpb25Gb250V2VpZ2h0O1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnRleHRTaGFkb3cgPSBtZS50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93O1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLnRleHRBbGlnbiA9IG1lLnRpdGxlQmFyQ2FwdGlvblRleHRBbGlnbjtcbiAgICAvLyBtZS50aXRsZUJhci5zdHlsZS50ZXh0U2hhZG93ID0gXCIwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjcpXCI7XG4gICAgLy8gbWUudGl0bGVCYXIuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG5cbiAgICBtZS50aXRsZUJhci5zdHlsZS5saW5lSGVpZ2h0ID0gbWUudGl0bGVCYXIuc3R5bGUuaGVpZ2h0O1xuXG4gICAgbWUudGl0bGVCYXIuc3R5bGUuYm9yZGVyQm90dG9tID0gbWUudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0O1xuICAgIC8vbWUudGl0bGVCYXIuc3R5bGUuYm94U2hhZG93ID0gJzAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjUpJztcblxuICAgIC8vU2V0IG5vdCB0byBkaXNwbGF5IG92ZXJmbG93IGNoYXJhY3RlciBzdHJpbmdcbiAgICBtZS50aXRsZUJhci5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICB2YXIgdGl0bGVCYXJUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG5cbiAgICAvLydzcGFuJyB0byBzdG9yZSB0ZXh0XG4gICAgdmFyIHRpdGxlQmFyVGV4dFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuICAgIHRpdGxlQmFyVGV4dFNwYW4uaWQgPSBtZS5pZCArIFwiX3RpdGxlQmFyVGV4dFwiO1xuICAgIGlmIChtZS50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luICE9IG51bGwpIHtcbiAgICAgIHRpdGxlQmFyVGV4dFNwYW4uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICB0aXRsZUJhclRleHRTcGFuLnN0eWxlLmxlZnQgPSBwYXJzZUludChtZS50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luLCAxMCkgK1xuICAgICAgICBcInB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlQmFyVGV4dFNwYW4uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICB0aXRsZUJhclRleHRTcGFuLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgdGl0bGVCYXJUZXh0U3Bhbi5zdHlsZS5yaWdodCA9IFwiMHB4XCI7XG4gICAgfVxuICAgIHRpdGxlQmFyVGV4dFNwYW4uc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICB0aXRsZUJhclRleHRTcGFuLmFwcGVuZENoaWxkKHRpdGxlQmFyVGV4dCk7XG4gICAgbWUudGl0bGVCYXIuYXBwZW5kQ2hpbGQodGl0bGVCYXJUZXh0U3Bhbik7XG5cbiAgICAvL0Rpc2NvbnRpbnVlIGFwcGljb24oMjAwNjEwMTEpXG4gICAgLy9tZS50aXRsZUJhci5hcHBlbmRDaGlsZChhcHBJY29uKTtcbiAgfVxuXG4gIG1lLmh0bWxFbGVtZW50LmFwcGVuZENoaWxkKG1lLnRpdGxlQmFyKTtcblxuICAvL1NldCBDYW52YXMgdGhyb3VnaG91dCB0aGUgd2luZG93XG5cbiAgLy9wYXJzZUludChtZS50aXRsZUJhci5zdHlsZS5oZWlnaHQpOy8vbWUudGl0bGVCYXJIZWlnaHQpO1xuICB2YXIgY2FudmFzTW9yZUhlaWdodCA9IHBhcnNlSW50KG1lLnRpdGxlQmFySGVpZ2h0LCAxMCkgLSB0aXRsZUJhckFkanVzdDtcbiAgdmFyIGNhbnZhc01vcmVTcGFjaW5nID0gcGFyc2VJbnQobWUudGl0bGVBZGp1c3RXaWR0aCwgMTApO1xuXG4gIGlmIChtZS5zaG93VGl0bGVCYXIpIHtcbiAgfSBlbHNlIHtcbiAgICBjYW52YXNNb3JlSGVpZ2h0ID0gMDtcbiAgICBjYW52YXNNb3JlU3BhY2luZyA9IDA7XG4gICAgdGl0bGVCYXJBZGp1c3QgPSAwO1xuICB9XG5cbiAgbWUuY2FudmFzTmV0V2lkdGggPSB3X3dpZHRoIC0gY2FudmFzTW9yZVNwYWNpbmc7XG4gIG1lLmNhbnZhc05ldEhlaWdodCA9IHdfaGVpZ2h0IC0gY2FudmFzTW9yZUhlaWdodCAtIGNhbnZhc01vcmVTcGFjaW5nIC0gMSAtXG4gICAgdGl0bGVCYXJBZGp1c3QgKyBtZS5mcmFtZUhlaWdodEFkanVzdDtcblxuICAvL0NoYW5nZSB0aGUgc3R5bGUgb2YgaHRtbEVsZW1lbnQgb2YgQ0ZyYW1lIChDQmVhbikuXG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwibW92ZVwiO1xuXG4gIC8vQ3JlYXRlIGEgY2FudmFzXG4gIG1lLmNhbnZhcyA9IG5ldyBDQ2FudmFzKFxuICAgIG1lLmh0bWxFbGVtZW50LFxuICAgIG1lLm15Q2FudmFzSWQsXG4gICAgMCxcbiAgICBjYW52YXNNb3JlSGVpZ2h0LFxuICAgIHdfd2lkdGggLSBjYW52YXNNb3JlU3BhY2luZyxcbiAgICB3X2hlaWdodCAtIGNhbnZhc01vcmVIZWlnaHQgLSBjYW52YXNNb3JlU3BhY2luZyxcbiAgKTtcblxuICBtZS5jYW52YXMuZW5hYmxlUHVsbFVwID0gZmFsc2U7XG4gIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgREVGLkNGUkFNRS5DQU5WQVNfRUxFTUVOVF9CR0NPTE9SO1xuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcblxuICBpZiAoTU9VU0VfRU5BQkxFRCkge1xuICAgIC8vSGFuZGxpbmcgdGhlIG9tb3VzZWRvd24gZXZlbnQgdGhhdCBvY2N1cnJlZCBpbiBDYW52YXMgd2hpY2ggaXMgYSBjaGlsZCBlbGVtZW50IG9mIENGcmFtZVxuICAgIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50Lm9ubW91c2Vkb3duID0gbWUuY2FudmFzTW91c2VEb3duO1xuICB9XG5cbiAgaWYgKFRPVUNIX0VOQUJMRUQpIHtcbiAgICBpZiAoXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cpIHtcbiAgICAgIHZhciBmdW5jT25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBUaGUgXCJtb3VzZWRvd25cIiBldmVudCBoYXBwZW5zIHJpZ2h0IGFmdGVyIFwidG91Y2hzdGFydFwiIGV2ZW50LFxuICAgICAgICAvLyBidXQgSSBkb24ndCBjYWxsICNwcmV2ZW50ZGVmYXVsdCBiZWNhdXNlICNwcmV2ZW50ZGVmYXVsdCBwcmV2ZW50cyBcIm9uY2xpY2tcIiAobGlrZSBidXR0b24gb24gdGl0bGViYXIpLlxuICAgICAgICAvLyBTbywgcGVyZm9ybSAjcHJldmVudGRlZmF1bHQgb25seSBmb3IgXCJ0b3VjaG1vdmVcIlxuICAgICAgICAvLyBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHRvdWNoU3RhcnRFdmVudCA9IGV2dC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICAgICAgbWUuY2FudmFzTW91c2VEb3duLmJpbmQodGhpcykodG91Y2hTdGFydEV2ZW50KTtcbiAgICAgIH07XG4gICAgICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5vbnRvdWNoc3RhcnQgPSBmdW5jT25Ub3VjaFN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIC8vU2V0IHRoZSBjYW52YXMgYXMgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBvZiB0aGUgY2FudmFzIGh0bWwgZWxlbWVudCBjYW52YXNFbGVtZW50LlxuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5wYXJlbnRDRnJhbWUgPSBtZTtcblxuICB2YXIgdG1wQ2FudmFzV2lkdGggPSBwYXJzZUludChtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCwgMTApO1xuICB2YXIgdG1wQ2FudmFzSGVpZ2h0ID0gcGFyc2VJbnQobWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgdmFyIG1hcmtlcldpZHRoID0gYXBwZWFyYW5jZS5yZXNpemVBcmVhV2lkdGg7XG4gIHZhciBtYXJrZXJIZWlnaHQgPSBhcHBlYXJhbmNlLnJlc2l6ZUFyZWFIZWlnaHQ7XG5cbiAgLy9PZmZzZXQgZnJvbSBtYXJrZXIgZWRnZVxuICB2YXIgZWRnZU1hcmdpbiA9IGFwcGVhcmFuY2UucmVzaXplQXJlYU9mZnNldDtcbiAgdmFyIG1hcmtlclpJbmRleCA9IDA7XG5cbiAgdmFyIGNvbG9yUkQsIGNvbG9yREQsIGNvbG9yUlI7XG5cbiAgaWYgKGFwcGVhcmFuY2UucmVzaXplQXJlYVZpc2libGUpIHtcbiAgICBjb2xvclJEID0gXCJyZ2JhKDI1NSwgMCwgMCwgMC41KVwiO1xuICAgIGNvbG9yREQgPSBcInJnYmEoMCwgMCwgMjU1LCAwLjUpXCI7XG4gICAgY29sb3JSUiA9IFwicmdiYSgwLCAyNTUsIDAsIDAuNSlcIjtcbiAgfVxuXG4gIC8vTG93ZXIgcmlnaHQoUi1EKVxuICB2YXIgbWFya2VyUkQgPSBuZXcgQ01hcmtlcldpbmRvdyhcbiAgICBtZS5teUNhbnZhc0lkICsgXCJfUkRcIixcbiAgICB0bXBDYW52YXNXaWR0aCArIGVkZ2VNYXJnaW4sXG4gICAgdG1wQ2FudmFzSGVpZ2h0ICsgZWRnZU1hcmdpbixcbiAgICBtYXJrZXJXaWR0aCxcbiAgICBtYXJrZXJIZWlnaHQsXG4gICAgbWFya2VyWkluZGV4LFxuICAgIFwiUkRcIixcbiAgICBjb2xvclJELFxuICApO1xuXG4gIG1hcmtlclJELmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwic2UtcmVzaXplXCI7IC8vbnctcmVzaXplJztcblxuICAvL1NpbmNlIG9ubHkgdGhlIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBhY3F1aXJlZCBhbmQgdGhlIG1vdmVtZW50IG9mIHRoZSBtYXJrZXIgaXRzZWxmIGlzXG4gIC8vIHBlcmZvcm1lZCBieSBDRnJhbWVfcmVzaXplLCB0aGUgbW92ZW1lbnQgY29lZmZpY2llbnQgb2YgdGhlIG1hcmtlciBpdHNlbGYgaXMgc2V0IHRvIDAuXG4gIG1hcmtlclJELmh0bWxFbGVtZW50LmFyZ1ggPSAwO1xuICBtYXJrZXJSRC5odG1sRWxlbWVudC5hcmdZID0gMDtcblxuICAvL0JvdHRvbShELUQpXG4gIHZhciBtYXJrZXJERCA9IG5ldyBDTWFya2VyV2luZG93KFxuICAgIG1lLm15Q2FudmFzSWQgKyBcIl9ERFwiLFxuICAgIDAsXG4gICAgdG1wQ2FudmFzSGVpZ2h0ICsgZWRnZU1hcmdpbixcbiAgICB0bXBDYW52YXNXaWR0aCArIGVkZ2VNYXJnaW4sXG4gICAgbWFya2VySGVpZ2h0LFxuICAgIG1hcmtlclpJbmRleCxcbiAgICBcIkREXCIsXG4gICAgY29sb3JERCxcbiAgKTtcblxuICBtYXJrZXJERC5odG1sRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcIm4tcmVzaXplXCI7XG5cbiAgLy9TaW5jZSBvbmx5IHRoZSBkZWx0YVggYW5kIGRlbHRhWSBhcmUgYWNxdWlyZWQgYW5kIHRoZSBtb3ZlbWVudCBvZiB0aGUgbWFya2VyIGl0c2VsZiBpc1xuICAvLyBwZXJmb3JtZWQgYnkgQ0ZyYW1lX3Jlc2l6ZSwgdGhlIG1vdmVtZW50IGNvZWZmaWNpZW50IG9mIHRoZSBtYXJrZXIgaXRzZWxmIGlzIHNldCB0byAwLlxuICBtYXJrZXJERC5odG1sRWxlbWVudC5hcmdYID0gMDtcbiAgbWFya2VyREQuaHRtbEVsZW1lbnQuYXJnWSA9IDA7XG5cbiAgLy9SaWdodChSLVIpXG4gIHZhciBtYXJrZXJSUiA9IG5ldyBDTWFya2VyV2luZG93KFxuICAgIG1lLm15Q2FudmFzSWQgKyBcIl9SUlwiLFxuICAgIHRtcENhbnZhc1dpZHRoICsgZWRnZU1hcmdpbixcbiAgICAwLFxuICAgIG1hcmtlcldpZHRoLFxuICAgIHRtcENhbnZhc0hlaWdodCArIGVkZ2VNYXJnaW4sXG4gICAgbWFya2VyWkluZGV4LFxuICAgIFwiUlJcIixcbiAgICBjb2xvclJSLFxuICApO1xuXG4gIG1hcmtlclJSLmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwidy1yZXNpemVcIjtcblxuICAvL1NpbmNlIG9ubHkgdGhlIGRlbHRhWCBhbmQgZGVsdGFZIGFyZSBhY3F1aXJlZCBhbmQgdGhlIG1vdmVtZW50IG9mIHRoZSBtYXJrZXIgaXRzZWxmIGlzXG4gIC8vIHBlcmZvcm1lZCBieSBDRnJhbWVfcmVzaXplLCB0aGUgbW92ZW1lbnQgY29lZmZpY2llbnQgb2YgdGhlIG1hcmtlciBpdHNlbGYgaXMgc2V0IHRvIDAuXG4gIG1hcmtlclJSLmh0bWxFbGVtZW50LmFyZ1kgPSAwO1xuICBtYXJrZXJSUi5odG1sRWxlbWVudC5hcmdYID0gMDtcblxuICAvL0FkZCBzaXplIGNoYW5nZSBtYXJrZXIgdG8gY2FudmFzLlxuICBtZS5jYW52YXMuYWRkQmVhbihtYXJrZXJSRCk7XG4gIG1lLmNhbnZhcy5hZGRCZWFuKG1hcmtlckREKTtcbiAgbWUuY2FudmFzLmFkZEJlYW4obWFya2VyUlIpO1xuXG4gIC8vTWV0aG9kIHRvIHJlbW92ZSBzaXplIGNoYW5nZSBtYXJrZXIgKGNhbiBub3QgcmVzaXplKVxuICBtZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIG1lLmNhbnZhcy5yZW1vdmVCZWFuKG1hcmtlclJELmlkKTtcbiAgICBtZS5jYW52YXMucmVtb3ZlQmVhbihtYXJrZXJERC5pZCk7XG4gICAgbWUuY2FudmFzLnJlbW92ZUJlYW4obWFya2VyUlIuaWQpO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuICB9O1xuXG4gIG1lLnJlbW92ZU1hcmtlcnMyID0gZnVuY3Rpb24gKCkge1xuICAgIG1lLmNhbnZhcy5yZW1vdmVCZWFuKG1hcmtlclJELmlkKTtcbiAgICBtZS5jYW52YXMucmVtb3ZlQmVhbihtYXJrZXJERC5pZCk7XG4gICAgbWUuY2FudmFzLnJlbW92ZUJlYW4obWFya2VyUlIuaWQpO1xuICB9O1xuICBtZS5lbmFibGVNYXJrZXJzID0gZnVuY3Rpb24gKGVuYWJsZWQpIHtcbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgbWFya2VyUkQuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgbWFya2VyREQuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgbWFya2VyUlIuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgbWFya2VyUkQuaHRtbEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJzZS1yZXNpemVcIjtcbiAgICAgIG1hcmtlckRELmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwibi1yZXNpemVcIjtcbiAgICAgIG1hcmtlclJSLmh0bWxFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwidy1yZXNpemVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFya2VyUkQuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgbWFya2VyREQuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgbWFya2VyUlIuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICAvLyBtZS5jYW52YXMucmVtb3ZlQmVhbihtYXJrZXJSRC5pZCk7XG4gICAgLy8gbWUuY2FudmFzLnJlbW92ZUJlYW4obWFya2VyREQuaWQpO1xuICAgIC8vIG1lLmNhbnZhcy5yZW1vdmVCZWFuKG1hcmtlclJSLmlkKTtcbiAgfTtcblxuICBmb3IgKHZhciBpZHggaW4gYXBwZWFyYW5jZS5mcmFtZUNvbXBvbmVudHMpIHtcbiAgICB2YXIgZnJhbWVDb21wb25lbnQgPSBhcHBlYXJhbmNlLmZyYW1lQ29tcG9uZW50c1tpZHhdO1xuICAgIGZyYW1lQ29tcG9uZW50LnNldEZyYW1lKG1lKTtcblxuICAgIC8vaWYgZnJhbWVDb21wb25lbnQgaGFzIHNwZWNpYWwgbmFtZSAnY2xvc2VCdXR0b24nLCBpdCB3aWxsIGFjdCBhcyBhIGNsb3NlIGJ1dHRvbi5cbiAgICBpZiAoXCJjbG9zZUJ1dHRvblwiID09IGZyYW1lQ29tcG9uZW50LmlkKSB7XG4gICAgICBmcmFtZUNvbXBvbmVudC5odG1sRWxlbWVudC5vbmNsaWNrID0gbWUuY2xvc2U7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGNoaWxkIG1lbnUgb3Blbi9jbG9zZVxuICAgIHZhciBmcmFtZUNvbXBvbmVudEhhc0NoaWxkTWVudSA9IGZyYW1lQ29tcG9uZW50Lmh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5qc2ZyYW1lLWNoaWxkLW1lbnVcIixcbiAgICApO1xuICAgIGlmIChmcmFtZUNvbXBvbmVudEhhc0NoaWxkTWVudSkge1xuICAgICAgbWUuZXZlbnRMaXN0ZW5lckhlbHBlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBmcmFtZUNvbXBvbmVudC5odG1sRWxlbWVudCxcbiAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHZhciBmcmFtZUNvbXBvbmVudElkID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY29tcG9uZW50LWlkXCIpO1xuXG4gICAgICAgICAgLy8gQ2xvc2UgYWxsIGZyYW1lIGNvbXBvbmVudCdzIGNoaWxkbWVudSBvbmNlIGJlY2F1c2Ugb3RoZXIgZnJhbWUgY29tcG9uZW50J3MgY2hpbGRtZW51IG1heSBiZSBvcGVuLlxuICAgICAgICAgIC8vIElmIHtleGNlcHRGcmFtZUNvbXBvbmVudElkOltmcmFtZUNvbXBvbmVudElkXX0gaXMgc3BlY2lmaWVkIGZvciB0aGUgYXJndW1lbnQsXG4gICAgICAgICAgLy8gdGhlIGNoaWxkIG1lbnUgd2lsbCBub3QgYmUgY2xvc2VkLlxuICAgICAgICAgIG1lLmhpZGVGcmFtZUNvbXBvbmVudENoaWxkTWVudXMoXG4gICAgICAgICAgICB7IGV4Y2VwdEZyYW1lQ29tcG9uZW50SWQ6IGZyYW1lQ29tcG9uZW50SWQgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGZyYW1lQ29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgIHZhciBmcmFtZUNvbXBvbmVudEh0bWxFbGVtZW50ID0gbWUuZ2V0RnJhbWVDb21wb25lbnRFbGVtZW50KFxuICAgICAgICAgICAgICBmcmFtZUNvbXBvbmVudElkLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHZhciBmcmFtZUNvbXBvbmVudENoaWxkTWVudSA9IGZyYW1lQ29tcG9uZW50SHRtbEVsZW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuanNmcmFtZS1jaGlsZC1tZW51XCIpO1xuICAgICAgICAgICAgaWYgKGZyYW1lQ29tcG9uZW50Q2hpbGRNZW51KSB7XG4gICAgICAgICAgICAgIC8vIEJ5IG1ha2luZyB0aGUgZGlzcGxheSBhIHRhYmxlLFxuICAgICAgICAgICAgICAvLyB0aGUgd2lkdGggb2YgdGhlIGNoaWxkTWVudSBjYW4gYmUgYWNjdXJhdGVseSByZWZsZWN0ZWQuXG4gICAgICAgICAgICAgIC8vIChmbGV4IGRvZXMgbm90IHNldCB0aGUgd2lkdGggY29ycmVjdGx5LilcbiAgICAgICAgICAgICAgaWYgKGZyYW1lQ29tcG9uZW50Q2hpbGRNZW51LnN0eWxlLmRpc3BsYXkgPT0gXCJ0YWJsZVwiKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVDb21wb25lbnRDaGlsZE1lbnUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyYW1lQ29tcG9uZW50Q2hpbGRNZW51LnN0eWxlLmRpc3BsYXkgPSBcInRhYmxlXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJmcmFtZUNvbXBvbmVudCBjaGlsZCBtZW51IGlzbnQgZm91bmQuIGZyYW1lQ29tcG9uZW50SWQ9XCIgK1xuICAgICAgICAgICAgICAgICAgZnJhbWVDb21wb25lbnRJZCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgbGlzdGVuZXJOYW1lOiBcImZyYW1lLWNvbXBvbmVudF9jaGlsZC1tZW51LWxpc3RlbmVyXCIgfSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbWUuYWRkRnJhbWVDb21wb25lbnQoZnJhbWVDb21wb25lbnQpO1xuICB9IC8vIC9hZGQgZnJhbWVDb21wb25lbnRzW2VuZF1cblxuICAvL292ZXJyaWRlIHRoZSBmaWVsZFxuICBtZS5odG1sRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7XG5cbiAgbWUuaHRtbEVsZW1lbnQub25jb250ZXh0bWVudSA9IHRoaXMuY29udGV4dE1lbnU7XG5cbiAgLy9UaGUgcG9saWN5IG9mIEJvcmRlciBkcmF3aW5nIHNlZW1zIHRvIGJlIGRpZmZlcmVudCBiZXR3ZWVuIElFIGFuZCBGRi5cbiAgdmFyIGNhcmliVmFsID0gMDtcblxuICBtZS5jYXJpYlZhbHVlID0gY2FyaWJWYWw7XG5cbiAgaWYgKG1lLmV4Qm9yZGVyV2lkdGgpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9IG1lLmV4Qm9yZGVyV2lkdGggKyBcInB4XCI7XG4gIH1cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPVxuICAgIChwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCwgMTApIC0gY2FyaWJWYWwpICsgXCJweFwiO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPVxuICAgIChwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQsIDEwKSAtIGNhcmliVmFsICsgMSkgKyBcInB4XCI7XG4gIG1lLmh0bWxFbGVtZW50LnR5cGVOYW1lID0gXCJjd2luZG93XCI7XG4gIG1lLmh0bWxFbGVtZW50Lm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJveFNpemluZyA9IFwiY29udGVudC1ib3hcIjtcblxuICBpZiAoYXBwZWFyYW5jZS5mcmFtZUJvcmRlclN0eWxlKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyU3R5bGU7XG4gIH1cblxuICBpZiAoYXBwZWFyYW5jZS5mcmFtZUJveFNoYWRvdykge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJveFNoYWRvdyA9IGFwcGVhcmFuY2UuZnJhbWVCb3hTaGFkb3c7XG4gIH1cblxuICAvL1RPRE8gZGVwcmVjYXRpb24oYmVjYXVzZSBDSWZGcmFtZSBpcyBleHRlbmRlZCB0aGlzIG9wZXJhdGlvbilcbiAgaWYgKHBhcnNlSW50KGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQsIDEwKSA+PSAwKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0O1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gYXBwZWFyYW5jZS5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdDtcbiAgfVxuICBpZiAocGFyc2VJbnQoYXBwZWFyYW5jZS5mcmFtZUJvcmRlclJhZGl1cywgMTApID49IDApIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyUmFkaXVzO1xuICB9XG5cbiAgbWUub25DbG9zZUZyYW1lTGlzdGVuZXIgPSBudWxsO1xufVxuXG5DRnJhbWUucHJvdG90eXBlLnNldFRpdGxlQmFyQ2xhc3NOYW1lID0gZnVuY3Rpb24gKFxuICBjbGFzc05hbWVGb3JEZWZhdWx0LFxuICBjbGFzc05hbWVGb3JGb2N1c2VkLFxuKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChjbGFzc05hbWVGb3JEZWZhdWx0KSB7XG4gICAgbWUudGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0ID0gY2xhc3NOYW1lRm9yRGVmYXVsdDtcbiAgICBtZS50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQgPSBjbGFzc05hbWVGb3JEZWZhdWx0O1xuICB9XG4gIGlmIChjbGFzc05hbWVGb3JGb2N1c2VkKSB7XG4gICAgbWUudGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkID0gY2xhc3NOYW1lRm9yRm9jdXNlZDtcbiAgfVxuICByZXR1cm4gbWU7XG59O1xuLyoqXG4gKiBBZGQgZnJhbWVDb21wb25lbnQoV3JhcHBlZCBET00gZWxlbWVudCBsaWtlICdkaXYnIHRvIGRpc3BsYXkgYWJvdmUgdGhlIGZyYW1lKSB0byBmcmFtZVxuICogQHBhcmFtIGZyYW1lQ29tcG9uZW50XG4gKi9cbkNGcmFtZS5wcm90b3R5cGUuYWRkRnJhbWVDb21wb25lbnQgPSBmdW5jdGlvbiAoZnJhbWVDb21wb25lbnQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5mcmFtZUNvbXBvbmVudE1hcFtmcmFtZUNvbXBvbmVudC5pZF0gPSBmcmFtZUNvbXBvbmVudDtcbiAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuYXBwZW5kQ2hpbGQoZnJhbWVDb21wb25lbnQuaHRtbEVsZW1lbnQpO1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIEdldCBzdG9yZWQgZnJhbWUgY29tcG9uZW50IGJ5IGlkXG4gKiBAcGFyYW0gZnJhbWVDb21wb25lbnRcbiAqL1xuQ0ZyYW1lLnByb3RvdHlwZS5nZXRGcmFtZUNvbXBvbmVudEVsZW1lbnQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKG1lLmZyYW1lQ29tcG9uZW50TWFwW2lkXSkge1xuICAgIHJldHVybiBtZS5mcmFtZUNvbXBvbmVudE1hcFtpZF0uaHRtbEVsZW1lbnQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbkNGcmFtZS5wcm90b3R5cGUucmVtb3ZlRnJhbWVDb21wb25lbnRCeUlkID0gZnVuY3Rpb24gKGZyYW1lQ29tcG9uZW50SWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJhbWVDb21wb25lbnQgPSBtZS5mcmFtZUNvbXBvbmVudE1hcFtmcmFtZUNvbXBvbmVudElkXTtcblxuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5yZW1vdmVDaGlsZChmcmFtZUNvbXBvbmVudC5odG1sRWxlbWVudCk7XG4gIGRlbGV0ZSBtZS5mcmFtZUNvbXBvbmVudE1hcFtmcmFtZUNvbXBvbmVudElkXTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuc2hvd0ZyYW1lQ29tcG9uZW50ID0gZnVuY3Rpb24gKGZyYW1lQ29tcG9uZW50SWQsIGRpc3BsYXkpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGNvbXAgPSBtZS5nZXRGcmFtZUNvbXBvbmVudEVsZW1lbnQoZnJhbWVDb21wb25lbnRJZCk7XG4gIGlmIChjb21wKSB7XG4gICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgIGNvbXAuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXAuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWU7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmhpZGVGcmFtZUNvbXBvbmVudCA9IGZ1bmN0aW9uIChmcmFtZUNvbXBvbmVudElkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBjb21wID0gbWUuZ2V0RnJhbWVDb21wb25lbnRFbGVtZW50KGZyYW1lQ29tcG9uZW50SWQpO1xuICBpZiAoY29tcCkge1xuICAgIGNvbXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG4gIHJldHVybiBtZTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuaGlkZUFsbFZpc2libGVGcmFtZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGNvbXBNYXAgPSBtZS5mcmFtZUNvbXBvbmVudE1hcDtcbiAgZm9yICh2YXIga2V5IGluIGNvbXBNYXApIHtcbiAgICBpZiAoY29tcE1hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YXIgY29tcCA9IGNvbXBNYXBba2V5XS5odG1sRWxlbWVudDtcbiAgICAgIGlmIChjb21wLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgIGNvbXAuX2FscmVhZHlOb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfVxufTtcbkNGcmFtZS5wcm90b3R5cGUuc2hvd0FsbFZpc2libGVGcmFtZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBjb21wTWFwID0gbWUuZnJhbWVDb21wb25lbnRNYXA7XG4gIGZvciAodmFyIGtleSBpbiBjb21wTWFwKSB7XG4gICAgaWYgKGNvbXBNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdmFyIGNvbXAgPSBjb21wTWFwW2tleV0uaHRtbEVsZW1lbnQ7XG4gICAgICBpZiAoY29tcC5fYWxyZWFkeU5vbmUpIHtcbiAgICAgICAgY29tcC5fYWxyZWFkeU5vbmUgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENsb3NlIGFsbCBjaGlsZE1lbnVcbiBJZiB7ZXhjZXB0RnJhbWVDb21wb25lbnRJZDpbZnJhbWVDb21wb25lbnRJZF19IGlzIHNwZWNpZmllZCBmb3IgdGhlIGFyZ3VtZW50LFxuIHRoZSBjaGlsZCBtZW51IHdpbGwgbm90IGJlIGNsb3NlZC5cblxuICogQHBhcmFtIG9wdFxuICovXG5DRnJhbWUucHJvdG90eXBlLmhpZGVGcmFtZUNvbXBvbmVudENoaWxkTWVudXMgPSBmdW5jdGlvbiAob3B0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGNvbXBNYXAgPSBtZS5mcmFtZUNvbXBvbmVudE1hcDtcbiAgZm9yICh2YXIgZnJhbWVDb21wb25lbnRJZCBpbiBjb21wTWFwKSB7XG4gICAgaWYgKGNvbXBNYXAuaGFzT3duUHJvcGVydHkoZnJhbWVDb21wb25lbnRJZCkpIHtcbiAgICAgIGlmIChvcHQgJiYgb3B0LmV4Y2VwdEZyYW1lQ29tcG9uZW50SWQpIHtcbiAgICAgICAgaWYgKGZyYW1lQ29tcG9uZW50SWQgPT09IG9wdC5leGNlcHRGcmFtZUNvbXBvbmVudElkKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjb21wID0gY29tcE1hcFtmcmFtZUNvbXBvbmVudElkXTtcbiAgICAgIGlmIChjb21wLmNoaWxkTWVudSkge1xuICAgICAgICBjb21wLmNoaWxkTWVudS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLnNldFRpdGxlID0gZnVuY3Rpb24gKHN0cikge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS50aXRsZSA9IHN0cjtcbiAgaWYgKG1lLnNob3dUaXRsZUJhcikge1xuICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cik7XG4gICAgLy9maXJzdENoaWxk44GuZmlyc3RDaGlsZOOBjHNwYW5cbiAgICBtZS50aXRsZUJhci5maXJzdENoaWxkLnJlcGxhY2VDaGlsZChcbiAgICAgIHRleHROb2RlLFxuICAgICAgbWUudGl0bGVCYXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIG1lO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoXG4gIGRlbHRhTGVmdCxcbiAgZGVsdGFUb3AsXG4gIGRlbHRhV2lkdGgsXG4gIGRlbHRhSGVpZ2h0LFxuKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIHRtcExlZnQgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XG4gIHZhciB0bXBUb3AgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKTtcbiAgdmFyIHRtcFdpZHRoID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGgsIDEwKTtcbiAgdmFyIHRtcEhlaWdodCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCwgMTApO1xuXG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSBwYXJzZUludCh0bXBMZWZ0ICsgZGVsdGFMZWZ0LCAxMCkgKyBcInB4XCI7XG4gIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9IHBhcnNlSW50KHRtcFRvcCArIGRlbHRhVG9wLCAxMCkgKyBcInB4XCI7XG5cbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSBwYXJzZUludCh0bXBXaWR0aCArIGRlbHRhV2lkdGgsIDEwKSArIFwicHhcIjtcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gcGFyc2VJbnQodG1wSGVpZ2h0ICsgZGVsdGFIZWlnaHQsIDEwKSArIFwicHhcIjtcblxuICB2YXIgdG1wQ2FudmFzV2lkdGggPSBwYXJzZUludChtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCwgMTApO1xuICB2YXIgdG1wQ2FudmFzSGVpZ2h0ID0gcGFyc2VJbnQobWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgLy9TaW5jZSBjYW52YXNFbGVtZW50IGlzIGEgKDAsIDApIHJlbGF0aXZlIGNvb3JkaW5hdGUgd2l0aCByZXNwZWN0IHRvIHRoZSBwYXJlbnQgZWxlbWVudCxcbiAgLy8gc28gaXQgaXMgbm90IG5lY2Vzc2FyeSB0byBjaGFuZ2UgbGVmdCBhbmQgdG9wLlxuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9ICh0bXBDYW52YXNXaWR0aCArIGRlbHRhV2lkdGgpICsgXCJweFwiO1xuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAodG1wQ2FudmFzSGVpZ2h0ICsgZGVsdGFIZWlnaHQpICsgXCJweFwiO1xuXG4gIGlmIChtZS5zaG93VGl0bGVCYXIpIHtcbiAgICAvL0NoYW5nZSB0aGUgc2l6ZSBvZiB0aGUgdGl0bGUgYmFyLiBUaXRsZUFkanVzdFdpZHRoIGV0Yy5cbiAgICAvL1RoZSByZWFzb24gd2h5IHlvdSBkbyBub3QgaGF2ZSB0byB1c2UgdGl0bGVBZGp1c3RXaWR0aCBpcyBiZWNhdXNlXG4gICAgLy8gdGhlc2Ugc2NhbGluZyBhcmUgZG9uZSB3aXRoIGRpZmZlcmVuY2VzIChkZWx0YVgsIGRlbHRhWSkuXG4gICAgLy9UaGVyZWZvcmUsIGlmIHlvdSBhZGp1c3Qgd2l0aCB0aGUgdGl0bGVBZGp1c3RXaWR0aCBhc1xuICAgIC8vIHRoZSBpbml0aWFsIHZhbHVlLCB0aGUgb3RoZXIgd2lsbCBzdHJldGNoIHJlbGF0aXZlLlxuICAgIC8vWW91IGRvIG5vdCB0aGluayB5b3UgY2FuIHVzZSBpZkRlbHRhXG4gICAgbWUudGl0bGVCYXIuc3R5bGUud2lkdGggPSAodG1wQ2FudmFzV2lkdGggKyBkZWx0YVdpZHRoKSArIFwicHhcIjtcbiAgfSBlbHNlIHtcbiAgfVxuXG4gIGZvciAodmFyIGJlYW5OYW1lIGluIG1lLmNhbnZhcy5iZWFuTGlzdCkge1xuICAgIHZhciB0bXBCZWFuID0gbWUuY2FudmFzLmJlYW5MaXN0W2JlYW5OYW1lXTtcblxuICAgIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnR5cGVOYW1lID09IFwiY21hcmtlcndpbmRvd1wiKSB7XG4gICAgICBpZiAodG1wQmVhbi5odG1sRWxlbWVudC51c2FnZSA9PSBcIlJEXCIpIHtcbiAgICAgICAgLy9Nb3ZlIHRoZSBzaXplIGNoYW5nZSBsb3dlciByaWdodChSRCkgbWFya2VyIGFjY29yZGluZyB0byB0aGUgYW1vdW50IG9mIG1vdmVtZW50LlxuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPVxuICAgICAgICAgIChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGRlbHRhV2lkdGgpICsgXCJweFwiO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBkZWx0YUhlaWdodCkgKyBcInB4XCI7XG4gICAgICB9IGVsc2UgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gXCJERFwiKSB7XG4gICAgICAgIC8vTW92ZSB0aGUgc2l6ZSBjaGFuZ2UgbG93ZXIgbWFya2VyIGFjY29yZGluZyB0byB0aGUgbW92ZW1lbnQgYW1vdW50LlxuICAgICAgICAvLyBEbyBub3QgbW92ZSBsZWZ0Lk9ubHkgdGhlIHdpZHRoIHdpbCBpbmNyZWFzZSBvciBkZWNyZWFzZS5cbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUud2lkdGgsIDEwKSArIGRlbHRhV2lkdGgpICsgXCJweFwiO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBkZWx0YUhlaWdodCkgKyBcInB4XCI7XG4gICAgICB9IGVsc2UgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gXCJSUlwiKSB7XG4gICAgICAgIC8vTW92ZSB0aGUgc2l6ZSBjaGFuZ2UgcmlnaHQgbWFya2VyIGFjY29yZGluZyB0byB0aGUgbW92ZW1lbnQgYW1vdW50XG4gICAgICAgIC8vRG8gbm90IG1vdmUgdG9wLE9ubHkgdGhlIGhlaWdodCB3aWxsIGluY3JlYXNlIG9yIGRlY3JlYXNlLlxuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPVxuICAgICAgICAgIChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGRlbHRhV2lkdGgpICsgXCJweFwiO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCkgKyBkZWx0YUhlaWdodCkgKyBcInB4XCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmNhbnZhc01vdXNlRG93biA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9Nb3VzZWRvd24gcHJvY2Vzc2luZyBvZiBDRnJhbWUuY2FudmFzXG5cbiAgLy8nVGhpcycgaW4gdGhpcyBtZXRob2QgaW5kaWNhdGVzICdDd2luZG93LmNhbnZhcy5jYW52YXNFbGVtZW50Jy5cbiAgaWYgKHRoaXMucGFyZW50Q0ZyYW1lLnBhcmVudENhbnZhcy5tb3VzZURvd25Tb3VyY2UgPT0gbnVsbCkge1xuICAgIHRoaXMucGFyZW50Q0ZyYW1lLnBhcmVudENhbnZhcy5tb3VzZURvd25Tb3VyY2UgPSBcImNoaWxkY2FudmFzXCI7XG4gIH1cbn07XG5DRnJhbWUucHJvdG90eXBlLm1vdXNlVXAgPSBmdW5jdGlvbiAoZSkge1xuICB0aGlzLmNhbnZhcy5tb3VzZVVwKGUpO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIC8vQ2xvc2UgcHJvY2Vzc2luZyBvZiBDRnJhbWUgZnJvbSBDbG9zZUJ1dHRvblxuXG4gIHZhciBwYXJlbnRDYW52YXMgPSB0aGlzLnBhcmVudE9iamVjdC5wYXJlbnRDYW52YXM7XG4gIHZhciBjZnJhbWVPYmogPSB0aGlzLnBhcmVudE9iamVjdDtcblxuICBjb25zb2xlLmxvZyhcbiAgICAnQ0ZyYW1lI2Nsb3NlIFwiJyArIGNmcmFtZU9iai50aXRsZSArIFwiKEBcIiArIGNmcmFtZU9iai5nZXROYW1lKCkgKyBcIilcIiArXG4gICAgICAnXCIgQCcgKyBjZnJhbWVPYmoud2luZG93SWQsXG4gICk7XG5cbiAgdmFyIHdpbmRvd0lkID0gY2ZyYW1lT2JqLmlkO1xuICBjZnJhbWVPYmouY2xvc2VJbnRlcm5hbGx5KGUsIHBhcmVudENhbnZhcywgd2luZG93SWQpO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5jbG9zZUZyYW1lID0gZnVuY3Rpb24gKGUpIHtcbiAgLy9DbG9zZSBwcm9jZXNzaW5nIG9mIENGcmFtZVxuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGNvbnNvbGUubG9nKFxuICAgICdDRnJhbWUjY2xvc2VGcmFtZSBcIicgKyBtZS50aXRsZSArIFwiKFwiICsgbWUuZ2V0TmFtZSgpICsgXCIpXCIgKyAnXCIgQCcgK1xuICAgICAgbWUud2luZG93SWQsXG4gICk7XG5cbiAgdmFyIHBhcmVudENhbnZhcyA9IHRoaXMucGFyZW50Q2FudmFzO1xuICBtZS5jbG9zZUludGVybmFsbHkoZSwgcGFyZW50Q2FudmFzLCBtZS53aW5kb3dJZCk7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmNsb3NlSW50ZXJuYWxseSA9IGZ1bmN0aW9uIChlLCBwYXJlbnRDYW52YXMsIHdpbmRvd0lkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKCFwYXJlbnRDYW52YXMpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiV2luZG93KFwiICsgd2luZG93SWQgKyBcIikgbWF5IGhhdmUgYmVlbiBjbG9zZWRcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIHBhcmVudENhbnZhcy5yZW1vdmVCZWFuKHdpbmRvd0lkKTtcblxuICAvL2FkZGVkIGZvciBtb2RhbCB3aW5kb3dcbiAgaWYgKG1lLm1vZGFsQmFja2dyb3VuZFdpbmRvd0lkKSB7XG4gICAgcGFyZW50Q2FudmFzLnJlbW92ZUJlYW4obWUubW9kYWxCYWNrZ3JvdW5kV2luZG93SWQpO1xuICAgIG1lLm1vZGFsQmFja2dyb3VuZFdpbmRvd0lkID0gbnVsbDtcbiAgfVxuXG4gIGlmIChtZS5vbkNsb3NlRnJhbWVMaXN0ZW5lcikge1xuICAgIG1lLm9uQ2xvc2VGcmFtZUxpc3RlbmVyKG1lKTtcbiAgfVxufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5zZXRPbkNsb3NlRnJhbWVMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5vbkNsb3NlRnJhbWVMaXN0ZW5lciA9IGxpc3RlbmVyO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5jb250ZXh0TWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgLy9JZiB5b3UgaXNzdWUgdGhlIHJpZ2h0LWNsaWNrIG1lbnUgaW4gdGhlIHdpbmRvdywgc2V0IHRoZSBzb3VyY2UgdG8gQ0ZyYW1lLlxuICB2YXIgY29udGV4dE1lbnVTb3VyY2UgPSBcIkNGcmFtZVwiO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLnNldFRpdGxlQmFyVGV4dENvbG9yID0gZnVuY3Rpb24gKHN0cikge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS50aXRsZUJhci5zdHlsZS5jb2xvciA9IHN0cjtcbn07XG5cbi8qKlxuICogU2V0IHdpbmRvdyBwb3NpdGlvbiB3aXRoIGFuY2hvclxuICogQHBhcmFtIHtudW1iZXJ9IHhcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gKiBAcGFyYW0ge3N0cmluZ30gYW5jaG9yIGFuY2hvciBtZWFucyB0aGUgcG9zaXRpb24gb2YgdGhlIHdpbmRvdyB3aXRoIHJlc3BlY3QgdG8gd2hpY2ggdGhlIHBvc2l0aW9uIGlzIHNwZWNpZmllZC48YnI+XG4gKiAgIFRoZSBmb2xsb3dpbmcgdmFsdWVzIGNhbiBiZSBzcGVjaWZpZWQgZm9yIHRoZSBhbmNob3JcbiBMRUZUX1RPUFxuIENFTlRFUl9UT1BcbiBSSUdIVF9UT1BcbiBMRUZUX0NFTlRFUlxuIENFTlRFUl9DRU5URVJcbiBSSUdIVF9DRU5URVJcbiBMRUZUX0JPVFRPTVxuIENFTlRFUl9CT1RUT01cbiBSSUdIVF9CT1RUT01cbiAqIEByZXR1cm5zIHtDRnJhbWV9XG4gKi9cbkNGcmFtZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoeCwgeSwgYW5jaG9yKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGZyYW1lV2lkdGggPSBtZS5nZXRXaWR0aCgpO1xuICB2YXIgZnJhbWVIZWlnaHQgPSBtZS5nZXRIZWlnaHQoKTtcblxuICBtZS5fc2V0UG9zaXRpb25JbnRlcm5hbGx5KHgsIHksIGFuY2hvciwgZnJhbWVXaWR0aCwgZnJhbWVIZWlnaHQpO1xuXG4gIHJldHVybiBtZTtcbn07XG5DRnJhbWUucHJvdG90eXBlLl9zZXRQb3NpdGlvbkludGVybmFsbHkgPSBmdW5jdGlvbiAoXG4gIHgsXG4gIHksXG4gIGFuY2hvcixcbiAgZnJhbWVXaWR0aCxcbiAgZnJhbWVIZWlnaHQsXG4pIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAoYW5jaG9yKSB7XG4gICAgbWUuYW5jaG9yID0gYW5jaG9yO1xuICB9XG5cbiAgaWYgKCFhbmNob3IgfHwgQ0FMSUdOLkxFRlRfVE9QID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSB4ICsgXCJweFwiO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9IHkgKyBcInB4XCI7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfVE9QID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAoLWZyYW1lV2lkdGggLyAyICsgeCkgKyBcInB4XCI7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0geSArIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVE9QID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAoLWZyYW1lV2lkdGggKyB4KSArIFwicHhcIjtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS50b3AgPSB5ICsgXCJweFwiO1xuICB9IGVsc2UgaWYgKENBTElHTi5MRUZUX1ZDRU5URVIgPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyBcInB4XCI7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKC1mcmFtZUhlaWdodCAvIDIgKyB5KSArIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9WQ0VOVEVSID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAoLWZyYW1lV2lkdGggLyAyICsgeCkgKyBcInB4XCI7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKC1mcmFtZUhlaWdodCAvIDIgKyB5KSArIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVkNFTlRFUiA9PSBhbmNob3IpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gKC1mcmFtZVdpZHRoICsgeCkgKyBcInB4XCI7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKC1mcmFtZUhlaWdodCAvIDIgKyB5KSArIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9CT1RUT00gPT0gYW5jaG9yKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9IHggKyBcInB4XCI7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wID0gKC1mcmFtZUhlaWdodCArIHkpICsgXCJweFwiO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX0JPVFRPTSA9PSBhbmNob3IpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID0gKC1mcmFtZVdpZHRoIC8gMiArIHgpICsgXCJweFwiO1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9ICgtZnJhbWVIZWlnaHQgKyB5KSArIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfQk9UVE9NID09IGFuY2hvcikge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAoLWZyYW1lV2lkdGggKyB4KSArIFwicHhcIjtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS50b3AgPSAoLWZyYW1lSGVpZ2h0ICsgeSkgKyBcInB4XCI7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyByZWxhdGl2ZSBwb3NpdGlvbiB3aXRoIGFuY2hvclxuICogQHJldHVybnMge3t4OiAqLCB5OiAqLCBhbmNob3I6ICp9fVxuICovXG5DRnJhbWUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgZnJhbWVXaWR0aCA9IG1lLmdldFdpZHRoKCk7XG4gIHZhciBmcmFtZUhlaWdodCA9IG1lLmdldEhlaWdodCgpO1xuICB2YXIgeDtcbiAgdmFyIHk7XG4gIHZhciBhbmNob3IgPSBtZS5hbmNob3I7XG4gIGlmICghYW5jaG9yIHx8IENBTElHTi5MRUZUX1RPUCA9PSBhbmNob3IpIHtcbiAgICB4ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCwgMTApO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKTtcbiAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9UT1AgPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGZyYW1lV2lkdGggLyAyO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKTtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVE9QID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCkgKyBmcmFtZVdpZHRoO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKTtcbiAgfSBlbHNlIGlmIChDQUxJR04uTEVGVF9WQ0VOVEVSID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApICsgZnJhbWVIZWlnaHQgLyAyO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX1ZDRU5URVIgPT0gYW5jaG9yKSB7XG4gICAgeCA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKSArIGZyYW1lV2lkdGggLyAyO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKSArIGZyYW1lSGVpZ2h0IC8gMjtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVkNFTlRFUiA9PSBhbmNob3IpIHtcbiAgICB4ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUubGVmdCwgMTApICsgZnJhbWVXaWR0aDtcbiAgICB5ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBmcmFtZUhlaWdodCAvIDI7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkxFRlRfQk9UVE9NID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XG4gICAgeSA9IHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApICsgZnJhbWVIZWlnaHQ7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfQk9UVE9NID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCkgKyBmcmFtZVdpZHRoIC8gMjtcbiAgICB5ID0gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUudG9wLCAxMCkgKyBmcmFtZUhlaWdodDtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfQk9UVE9NID09IGFuY2hvcikge1xuICAgIHggPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCkgKyBmcmFtZVdpZHRoO1xuICAgIHkgPSBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS50b3AsIDEwKSArIGZyYW1lSGVpZ2h0O1xuICB9XG4gIHJldHVybiB7IHg6IHgsIHk6IHksIGFuY2hvcjogYW5jaG9yIH07XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmdldExlZnQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS5sZWZ0LCAxMCk7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmdldFRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIHBhcnNlSW50KG1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApO1xufTtcbkNGcmFtZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBwYXJzZUludChtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCwgMTApO1xufTtcbkNGcmFtZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gcGFyc2VJbnQobWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiB7IHdpZHRoOiBtZS5nZXRXaWR0aCgpLCBoZWlnaHQ6IG1lLmdldEhlaWdodCgpIH07XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgZm9yY2UpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgYnlVc2VyID0gdHJ1ZTtcblxuICBpZiAoZm9yY2UpIHtcbiAgICBieVVzZXIgPSBmYWxzZTtcbiAgfVxuXG4gIC8vY2FsbCBDSUZyYW1lI3Jlc2l6ZSBpbnN0ZWFkIG9mIENGcmFtZSNyZXNpemVcbiAgbWUucmVzaXplKDAsIDAsIHdpZHRoIC0gbWUuZ2V0V2lkdGgoKSwgaGVpZ2h0IC0gbWUuZ2V0SGVpZ2h0KCksIGJ5VXNlcik7XG4gIHJldHVybiBtZTtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuZ2V0V2luZG93SWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS53aW5kb3dJZDtcbn07XG5cbkNGcmFtZS5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLnByb3BlcnR5Lm5hbWU7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLnNldE5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5wcm9wZXJ0eS5uYW1lID0gbmFtZTtcbn07XG4vKipcbiAqIGVuZCBvZiBDRnJhbWUgY2xhc3NcbiAqL1xuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuaW5oZXJpdChDSWZGcmFtZSwgQ0ZyYW1lKTtcblxuLyoqXG4gKiBDSWZGcmFtZSBjbGFzc1xuICogRXh0ZW5zaW9uIGNsYXNzIHdpdGggY29udGVudHMgZnJhbWUgb2YgQ0ZyYW1lIGFzIGlmcmFtZVxuICogQHBhcmFtIHdpbmRvd0lkXG4gKiBAcGFyYW0gYXBwZWFyYW5jZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENJZkZyYW1lKHdpbmRvd0lkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIGFwcGVhcmFuY2UpIHtcbiAgdmFyIHdsZWZ0ID0gbGVmdDtcbiAgdmFyIHd0b3AgPSB0b3A7XG4gIHZhciB3d2lkdGggPSB3aWR0aDtcbiAgdmFyIHdoZWlnaHQgPSBoZWlnaHQ7XG4gIHZhciB6aW5kZXggPSBhcHBlYXJhbmNlLnppbmRleDtcbiAgdmFyIHdib3JkZXJ3aWR0aCA9IG51bGw7XG5cbiAgdmFyIG1lID0gdGhpcztcblxuICB0aGlzLmpzRnJhbWUgPSBudWxsO1xuICB0aGlzLmNvbnRyb2wgPSBudWxsO1xuXG4gIHRoaXMubWluRnJhbWVXaWR0aCA9IDEyODtcbiAgdGhpcy5taW5XaW5kb3dIZWlnaHQgPSAzMjtcblxuICB0aGlzLmV2ZW50TGlzdGVuZXJIZWxwZXIgPSBuZXcgRXZlbnRMaXN0ZW5lckhlbHBlcigpO1xuXG4gIC8qKlxuICAgKiBJZiB0aGlzIHZhbHVlIGlzIHRydWUsIHRoZSBmb2N1cyB3aWxsIG1vdmUgd2hlbiB0YXBwaW5nIHRoZSBpZnJhbWUgYXJlYSxcbiAgICogYnV0IGlmIHRoZSB3aW5kb3cgZG8gbm90IGhhdmUgdGhlIGZvY3VzLCB5b3UgY2FuIG5vdCBjbGljayBvbiB0aGUgZWxlbWVudCBpbiB0aGUgaWZyYW1lLlxuICAgKi9cbiAgdGhpcy5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5FbmFibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqICBPbmx5IGluIHRoZSBjYXNlIG9mIHJlc2l6aW5nIGEgdHJhbnNwYXJlbnQgc2NyZWVuIGNhbiBiZSBkaXNwbGF5ZWQgb24gdGhlIGlmcmFtZVxuICAgKiAgYW5kIHRoZSBzaXplIGNhbiBiZSBhZGp1c3RlZCBzbW9vdGhseS5cbiAgICogIHRydWUgaXMgcmVjb21tZW5kZWQuXG4gICAqL1xuICAvL0NoYW5nZSBoaXN0b3J5XG4gIC8vMjAxODEyMjZcbiAgLy9DaGFuZ2VkIHRvIGZhbHNlLlxuICAvLyBTbyBpdCBiZWNvbWVzIG5lY2Vzc2FyeSB0byBjbGljayB0d2ljZSB0byByZWFjdCB3aGVuIHlvdSBjYWxsIHRoZSAjc2V0U2l6ZSxJIGNoYW5nZWQgdGhlIHZhbHVlIHRvIGZhbHNlLlxuICAvLzIwMTgxMjMxXG4gIC8vSSBmb3VuZCB0aGUgd2F5IHRoYXQgaWZyYW1lIHdpbGwgYmUgY2hhbmdlZCB0aGUgc2l6ZSBzbW9vdGhseS5zbyB0aGUgZmluYWwgYW5zd2VyIGlzIHRydWUuXG4gIHRoaXMub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuT25SZXNpemUgPSB0cnVlO1xuXG4gIHRoaXMudGl0bGVCYXJDb2xvckZvY3VzZWQgPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ29sb3JGb2N1c2VkO1xuXG4gIHRoaXMudGl0bGVCYXJDb2xvckRlZmF1bHQgPSBhcHBlYXJhbmNlLnRpdGxlQmFyQ29sb3JEZWZhdWx0O1xuXG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uQ29sb3JEZWZhdWx0ID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb25Db2xvckRlZmF1bHQ7XG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uQ29sb3JGb2N1c2VkID0gYXBwZWFyYW5jZS50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQ7XG5cbiAgLy9jYWxsIHN1cGVyIGNvbnN0cnVjdG9yXG4gIENJZkZyYW1lLnN1cGVyQ29uc3RydWN0b3IuY2FsbChcbiAgICBtZSxcbiAgICB3aW5kb3dJZCxcbiAgICB3bGVmdCxcbiAgICB3dG9wLFxuICAgIHd3aWR0aCxcbiAgICB3aGVpZ2h0LFxuICAgIHppbmRleCxcbiAgICB3Ym9yZGVyd2lkdGgsXG4gICAgYXBwZWFyYW5jZSxcbiAgKTtcblxuICAvL2JvcmRlciBjb2xvclxuICBtZS5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdCA9IGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQ7XG4gIG1lLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gYXBwZWFyYW5jZS5mcmFtZUJvcmRlckNvbG9yRm9jdXNlZDtcblxuICAvL2JvcmRlciB3aWR0aFxuICBtZS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ7XG4gIG1lLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkID0gYXBwZWFyYW5jZS5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZDtcblxuICBtZS5pZnJhbWUgPSBudWxsO1xuXG4gIC8vT2Zmc2V0IHZhbHVlIGZvciB3aWR0aCBhZGp1c3RtZW50IG9mIGlmcmFtZVxuICBtZS5pZkRlbHRhID0gMDtcblxuICBtZS5yZXNpemFibGUgPSB0cnVlO1xuXG4gIG1lLm9uTW91c2VNb3ZlT25JZnJhbWUgPSBudWxsO1xuICBtZS5vbk1vdXNlVXBPbklmcmFtZSA9IG51bGw7XG5cbiAgbWUuX2hhc0ZvY3VzID0gZmFsc2U7XG5cbiAgbWUuX2hhc0ZvY3VzVGltZSA9IDA7XG5cbiAgbWUuaHRtbEVsZW1lbnQudHlwZU5hbWUgPSBcImNpZndpbmRvd1wiO1xuXG4gIC8vbmFtZSBvZiBpZnJhbWVcbiAgdmFyIGV4SWZyYW1lTmFtZSA9IFwicml2ZXJzdW5fXCIgKyB3aW5kb3dJZDtcblxuICBtZS5kZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIG1lLmlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XG5cbiAgbWUuaWZyYW1lLm5hbWUgPSBleElmcmFtZU5hbWU7XG5cbiAgbWUuaWZyYW1lLmlkID0gZXhJZnJhbWVOYW1lO1xuXG4gIG1lLmlmcmFtZS5mcmFtZUJvcmRlciA9IFwiMFwiO1xuICAvL21lLmlmcmFtZS5zY3JvbGxpbmcgPSAnbm8nO1xuXG4gIG1lLmlmcmFtZS56SW5kZXggPSAtMTtcblxuICAvL0FsbG93IHRyYW5zcGFyZW50IG9mIGlmcmFtZSBiYWNrZ3JvdW5kLlxuICBtZS5pZnJhbWUuYWxsb3dUcmFuc3BhcmVuY3kgPSBcInRydWVcIjtcbiAgbWUuaWZyYW1lLndpZHRoID0gbWUuY2FudmFzTmV0V2lkdGggLSBtZS5pZkRlbHRhICsgMDtcbiAgbWUuaWZyYW1lLmhlaWdodCA9IG1lLmNhbnZhc05ldEhlaWdodCAtIG1lLmlmRGVsdGEgKyAwO1xuXG4gIG1lLnNob3dUaXRsZUJhciA9IGFwcGVhcmFuY2Uuc2hvd1RpdGxlQmFyO1xuXG4gIG1lLmdldEZyYW1lSW5uZXJCb3JkZXJSYWRpdXMgPSBhcHBlYXJhbmNlLmdldEZyYW1lSW5uZXJCb3JkZXJSYWRpdXM7XG5cbiAgbWUuZnJhbWVCb3JkZXJSYWRpdXMgPSBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyUmFkaXVzO1xuXG4gIG1lLmFkanVzdEZyYW1lQm9yZGVyUmFkaXVzKCk7XG5cbiAgbWUudXNlSWZyYW1lID0gZmFsc2U7XG5cbiAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuYXBwZW5kQ2hpbGQobWUuaWZyYW1lKTtcblxuICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5hcHBlbmRDaGlsZChtZS5kZnJhbWUpO1xuXG4gIHRoaXMuc2V0VXNlSWZyYW1lID0gZnVuY3Rpb24gKHVzZUlmcmFtZSkge1xuICAgIG1lLnVzZUlmcmFtZSA9IHVzZUlmcmFtZTtcbiAgICBtZS5pZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgbWUuaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIG1lLmlmcmFtZS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICBtZS5pZnJhbWUuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICBtZS5pZnJhbWUuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICBtZS5pZnJhbWUuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cbiAgICBtZS5kZnJhbWUuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgbWUuZGZyYW1lLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIG1lLmRmcmFtZS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICBtZS5kZnJhbWUuc3R5bGUuYm94U2l6aW5nID0gXCJjb250ZW50LWJveFwiO1xuXG4gICAgbWUuZGZyYW1lLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgbWUuZGZyYW1lLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgbWUuZGZyYW1lLnN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgIC8vbWUuZGZyYW1lLnN0eWxlLmJvcmRlclN0eWxlPVwic29saWRcIjtcbiAgICBtZS5kZnJhbWUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuXG4gICAgaWYgKHVzZUlmcmFtZSkge1xuICAgICAgbWUuaWZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgIG1lLmRmcmFtZS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgbWUuaWZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgbWUuZGZyYW1lLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICB9XG4gIH07XG5cbiAgbWUuc2V0VXNlSWZyYW1lKGFwcGVhcmFuY2UudXNlSWZyYW1lKTtcblxuICAvLyBJZiBpdCBpcyBJRSwgc2V0IHRoZSBjYW52YXNFbGVtZW50IG9mIHRoZSBjYW52YXMgd2hpY2ggaXMgdGhlIHBhcmVudCBvZiB0aGUgaWZyYW1lIHRvIHRyYW5zcGFyZW50LlxuXG4gIGlmIChcbiAgICBtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5FbmFibGVkIHx8IG1lLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbk9uUmVzaXplXG4gICkge1xuICAgIC8vQ3JlYXRlIGEgdHJhbnNwYXJlbnQgc2NyZWVuLlxuICAgIG1lLnRyYW5zcGFyZW5jZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIC8vIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKGltZy9pbWdfYmFyb25fdHAuZ2lmKSc7XG5cbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS50b3AgPSBcIjBweFwiO1xuXG4gICAgLy9UcmFuc3BhcmVudCBzY3JlZW4gaXMgMHB4IHdoZW4gY3JlYXRpbmcgd2luZG93XG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLndpZHRoID0gXCIwcHhcIjtcbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcblxuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS56SW5kZXggPSA0O1xuICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS5ib3JkZXJXaWR0aCA9IFwiMHB4XCI7XG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmJvcmRlckNvbG9yID0gXCIjZmYwMGVlXCI7XG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmJvcmRlclN0eWxlID0gXCJub25lXCI7XG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xuXG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgYXBwZWFyYW5jZS5mcmFtZUJhY2tncm91bmRDb2xvcjtcblxuICAgIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LmFwcGVuZENoaWxkKG1lLnRyYW5zcGFyZW5jZSk7XG4gIH1cblxuICBtZS5ldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbWUuYXBwZWFyYW5jZSA9IGFwcGVhcmFuY2U7XG59XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5nZXRGcmFtZVZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5kZnJhbWU7XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuZ2V0RnJhbWVBcHBlYXJhbmNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gbWUuYXBwZWFyYW5jZTtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5zZXRIVE1MID0gZnVuY3Rpb24gKGh0bWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuZGZyYW1lLmlubmVySFRNTCA9IGh0bWw7XG59O1xuQ0lmRnJhbWUucHJvdG90eXBlLnNldEZyYW1lSW5GcmFtZSA9IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gIC8vIFdoeSBpIGhhZCB0byAoYm90aGVyIHRvOikgKSBtYWtlIGEgc2V0RnJhbWVJbkZyYW1lXG4gIC8vIFRoZSBlbGVtZW50IHNwZWNpZmllZCBhdCB0aGUgdG9wIG9mIHRoZSBjb250ZW50IG9mIHRoZSBwYXJlbnQgd2luZG93IChmb3IgZXhhbXBsZSwgZGl2IGVsZW1lbnQpXG4gIC8vIG1heSBOT1QgYmUgYWJsZSB0byBnZXQgdGhlIHJlc2l6ZSBldmVudCB1c2luZyBhZGRFdmVudExpc3RlbmVyLlxuICAvLyBUaGVyZWZvcmUsIHdoZW4gdGhlIHJlc2l6ZSBldmVudCBpc3N1ZWQgYnkganNGcmFtZSBpbiB0aGUgcGFyZW50IHdpbmRvdyBvY2N1cnMsXG4gIC8vIGl0cyBjdXN0b20gYXR0cmlidXRlIChXaW5kb3dFdmVudEhlbHBlci5NQVRDSF9QQVJFTlRfQ0hBTkdFX01BUktFUl9BVFRSKSBpcyBhdHRhY2hlZFxuICAvLyB0byB0aGUgZWxlbWVudCBhdCB0aGUgdG9wIG9mIHRoZSBwYXJlbnQgd2luZG93IGNvbnRlbnRcbiAgLy8gYW5kIGl0IGlzIGNhcHR1cmVkIGJ5IHRoZSBtdXRhdGlvbk9ic2VydmVyIG9uIHRoZSBjaGlsZCB3aW5kb3cgc2lkZS5cblxuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBjb250ZW50c0VsZSA9IG1lLmRmcmFtZSA/IG1lLmRmcmFtZS5maXJzdENoaWxkIDogbnVsbDtcblxuICBpZiAoY29udGVudHNFbGUpIHtcbiAgICAvLyBwb2x5ZmlsbCBmb3IgI25vd1xuICAgIGlmICghRGF0ZS5ub3cpIHtcbiAgICAgIERhdGUubm93ID0gZnVuY3Rpb24gbm93KCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgbWUuZXZlbnRFbWl0dGVyLm9ubHkoXCJyZXNpemVcIiwgXCJmaWYtbGlzdGVuZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250ZW50c0VsZS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgV2luZG93RXZlbnRIZWxwZXIuTUFUQ0hfUEFSRU5UX0NIQU5HRV9NQVJLRVJfQVRUUixcbiAgICAgICAgICBEYXRlLm5vdygpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnRzRWxlLnJlbW92ZUF0dHJpYnV0ZShcbiAgICAgICAgV2luZG93RXZlbnRIZWxwZXIuTUFUQ0hfUEFSRU5UX0NIQU5HRV9NQVJLRVJfQVRUUixcbiAgICAgICk7XG4gICAgICBtZS5ldmVudEVtaXR0ZXIub25seShcInJlc2l6ZVwiLCBcImZpZi1saXN0ZW5lclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcbi8qKlxuICogRmluZCBET00gRWxlbWVudCBpbiB0aGUgZnJhbWUgYnkgcXVlcnlTZWxlY3Rvcjxicj5cbiAqICBFeGFtcGxlczxicj5cbiAqICAgICAgZnJhbWUuJChcIiNteV9pZF9uYW1lXCIpO1xuICogICAgICBmcmFtZS4kKFwiLm15X2NsYXNzX25hbWVcIik7XG4gKiAgICAgIGZyYW1lLiQoXCJkaXY+aW1nXCIpO1xuICogICAgICBmcmFtZS4kKFwiaW5wdXRbdHlwZT0nc3VibWl0XVwiKTtcbiAqIEBwYXJhbSB7c3RyaW5nfSBxIHNlbGVjdG9yIHF1ZXJ5XG4gKiBAcmV0dXJucyB7Tm9kZX1cbiAqL1xuQ0lmRnJhbWUucHJvdG90eXBlLiQgPSBmdW5jdGlvbiAocSkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmIChtZS51c2VJZnJhbWUpIHtcbiAgICB2YXIgZG9jSW5JZnJhbWUgPSBtZS5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgICByZXR1cm4gZG9jSW5JZnJhbWUucXVlcnlTZWxlY3RvcihxKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWUuZGZyYW1lLnF1ZXJ5U2VsZWN0b3IocSk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0cyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHdpbmRvdyBpdHNlbGYgb3IgZWxlbWVudHMgaW4gdGhlIGNvbnRlbnRzIG9mIHRoZSB3aW5kb3cuXG4gSXQgaXMgcG9zc2libGUgdG8gcmVnaXN0ZXIgbXVsdGlwbGUgbGlzdGVuZXJzIHRvIHRoZSBzYW1lIGV2ZW50IHR5cGUuXG5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuIElmIHRoZSBcImlkXCIgaXMgcHJlZml4ZWQgd2l0aCBcIiNcIixcbiBhbiBldmVudCBsaXN0ZW5lciBjYW4gYmUgc2V0IHRvIGEgRE9NIGVsZW1lbnQgKGV2ZW50VGFyZ2V0KSBpZGVudGlmaWVkIGJ5IHRoZSBpZCBpbiB0aGUgY29udGVudC48YnI+XG4gVGhpcyBpcyB0aGUgc2FtZSBiZWhhdmlvciBhcyB0aGUgdXN1YWwgZXZlbnRUYXJnZXQjYWRkRXZlbnRMaXN0ZW5lci48YnI+XG4gPGJyPlxuIEluIGFkZGl0aW9uIHRvIHRoZSBET00gZWxlbWVudCBpbiB0aGUgY29udGVudCwgdGhlIGZvbGxvd2luZyBzcGVjaWFsIG5hbWVzIGFyZSByZXNlcnZlZCBmb3IgdGhlIFwiaWRcIjxicj5cbiBcImNsb3NlQnV0dG9uXCIgLi4uIGNsb3NlIGJ1dHRvbi48YnI+XG4gXCJtaW5pbWl6ZUJ1dHRvblwiIC4uLiBNaW5pbWl6ZSBCdXR0b248YnI+XG4gXCJ6b29tQnV0dG9uXCIuLi56b29tIGJ1dHRvbi48YnI+XG4gXCJyZXN0b3JlQnV0dG9uXCIgLi4uIHRoZSBidXR0b24gdGhhdCByZXN0b3JlcyB0aGUgd2luZG93IHNpemUuPGJyPlxuIFwiZGVtaW5pbWl6ZUJ1dHRvblwiIC4uLiB0aGUgYnV0dG9uIHRvIHJldHVybiBmcm9tIHRoZSBtaW5pbWl6ZWQgc3RhdGUuPGJyPlxuIDxicj5cbiBZb3UgY2FuIGFsc28gcmVjZWl2ZSBldmVudHMgc3VjaCBhcyB3aW5kb3cgcmVzaXppbmcsIG1vdmluZywgYW5kIGZvY3VzaW5nLlxuIEluIHRoaXMgY2FzZSwgc3BlY2lmeSB0aGUgZm9sbG93aW5nIGFzIFwiaWRcIjxicj5cbiBcImZyYW1lXCIgb3IgXCJ3aW5kb3dcIi48YnI+XG4gPGJyPlxuIFlvdSBjYW4gc3BlY2lmeSBhIGZyYW1lQ29tcG9uZW50IG5hbWUgdGhhdCBpcyB1bmlxdWVseSBkZWZpbmVkIGJ5IGFkZEZyYW1lQ29tcG9uZW50LlxuIChHZW5lcmljIGJ1dHRvbnMgc3VjaCBhcyBjbG9zZUJ1dHRvbiBhcmUgb25lIG9mIHRoZSBmcmFtZSBjb21wb25lbnRzLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSBUaGUgZWxlbWVudCBpbiB0aGUgY29udGVudCAoSFRNTCkgb2YgYSB3aW5kb3cgd2hvc2UgXCJpZFwiIHN0YXJ0cyB3aXRoIFwiI1wiXG4gKiBjYW4gYmUgdGhlIHNhbWUgYXMgdGhlIGV2ZW50VHlwZShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnQvdHlwZSkgdXNlZCBieSB0aGUgbm9ybWFsIGFkZEV2ZW50TGlzdGVuZXIuPGJyPlxuIDxicj5cbiBJZiB0aGUgXCJpZFwiIGlzIGEgZnJhbWUgb3IgYSB3aW5kb3csIHRoZSBmb2xsb3dpbmcgY2FuIGJlIHVzZWQ8YnI+XG4gXCJtb3ZlXCIuLi4gV2hlbiBhIHdpbmRvdyBpcyBtb3ZlZCwgaXQgZmlyZXMuPGJyPlxuIFwicmVzaXplXCIuLi4gRmlyZXMgd2hlbiB0aGUgd2luZG93IGlzIHJlc2l6ZWQuPGJyPlxuIFwiZm9jdXNcIi4uLiBcImZvY3VzXCIgbWVhbnMgZ290IGZvY3VzLiBJdCBmaXJlcyB3aGVuIHRoZSB3aW5kb3cgaXMgaW4gZm9jdXMuPGJyPlxuIFwiYmx1clwiLi4uIFwiYmx1clwiIG1lYW5zIGxvc3QgZm9jdXMuSXQgZmlyZXMgd2hlbiB0aGUgd2luZG93IGxvc2VzIGZvY3VzLjxicj5cbiA8YnI+XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja0Z1bmNcbiAqL1xuQ0lmRnJhbWUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGlkLCBldmVudFR5cGUsIGNhbGxiYWNrRnVuYykge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgY29tcG9uZW50ID0gbWUuZ2V0RnJhbWVDb21wb25lbnRFbGVtZW50KGlkKTtcblxuICAvLyBpZiBpZCBpbmRpY2F0ZXMgZnJhbWUgY29tcG9uZW50IGxpa2UgQ1RleHRCdXR0b24sQ0ltYWdlQnV0dG9uXG4gIGlmIChjb21wb25lbnQpIHtcbiAgICAvL1NpbmNlIHdlIHdhbnQgdG8gc3BlY2lmeSBvbmx5IG9uZSBoYW5kbGVyIGZvciBmcmFtZSBjb21wb25lbnRzIGF0IHRoZSBzYW1lIHRpbWUsXG4gICAgLy8gdXNlIGV2ZW50TGlzdGVuZXJIZWxwZXIgaW5zdGVhZCBvZiBhbiBldmVudCBsaXN0ZW5lclxuICAgIG1lLmV2ZW50TGlzdGVuZXJIZWxwZXIuYWRkRXZlbnRMaXN0ZW5lcihjb21wb25lbnQsIGV2ZW50VHlwZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNhbGxiYWNrRnVuYyhtZSwgZSwge1xuICAgICAgICB0eXBlOiBcImZyYW1lQ29tcG9uZW50XCIsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUsXG4gICAgICAgIC8vY2hpbGQ6IGNoaWxkTWVudUVsZVxuICAgICAgfSk7XG4gICAgfSwgeyBsaXN0ZW5lck5hbWU6IFwiZnJhbWUtY29tcG9uZW50LWxpc3RlbmVyXCIgfSk7XG4gIH1cblxuICBpZiAoaWQgPT09IFwiZnJhbWVcIiB8fCBpZCA9PT0gXCJ3aW5kb3dcIikge1xuICAgIGlmIChldmVudFR5cGUgPT09IFwibW92ZVwiICYmICFtZS5ldmVudEVtaXR0ZXIuaGFzTGlzdGVuZXJGdW5jcyhcIm1vdmVcIikpIHtcbiAgICAgIG1lLnNldE9uTW92ZUxpc3RlbmVyKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vcmVmQ0lmRnJhbWUuZXZlbnRFbWl0dGVyLmVtaXQoJ3Jlc2l6ZScsKTtcbiAgICAgICAgbWUuZXZlbnRFbWl0dGVyLmVtaXQoXCJtb3ZlXCIsIG1lLl9nZXRDdXJyZW50U2l6ZVBvcygpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG1lLmV2ZW50RW1pdHRlci5vbihldmVudFR5cGUsIGNhbGxiYWNrRnVuYyk7XG4gIH1cblxuICAvLyBET00gZWxlbWVudCBpbiBpZnJhbWUgb3IgRE9NIGVsZW1lbnQgb24gZGZyYW1lXG4gIHZhciBkb21FbGVtZW50ID0gbWUuJChpZCk7XG5cbiAgaWYgKGRvbUVsZW1lbnQpIHtcbiAgICBpZiAoXG4gICAgICBtZS5ldmVudExpc3RlbmVySGVscGVyLmhhc0V2ZW50TGlzdGVuZXIoXG4gICAgICAgIGRvbUVsZW1lbnQsXG4gICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgXCJmcmFtZS1kb20tbGlzdGVuZXJcIixcbiAgICAgIClcbiAgICApIHtcbiAgICAgIG1lLmV2ZW50TGlzdGVuZXJIZWxwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgZG9tRWxlbWVudCxcbiAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICBudWxsLFxuICAgICAgICB7IGxpc3RlbmVyTmFtZTogXCJmcmFtZS1kb20tbGlzdGVuZXJcIiB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgbWUuZXZlbnRMaXN0ZW5lckhlbHBlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgZG9tRWxlbWVudCxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNhbGxiYWNrRnVuYyhtZSwgZSwge1xuICAgICAgICAgIHR5cGU6IFwiZG9tXCIsXG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB7IGxpc3RlbmVyTmFtZTogXCJmcmFtZS1kb20tbGlzdGVuZXJcIiB9LFxuICAgICk7XG4gIH1cblxuICAvLyBTZWFyY2ggRE9NIGVsZW1lbnQgb24gZnJhbWVDb21wb25lbnRcbiAgaWYgKCFkb21FbGVtZW50KSB7XG4gICAgdmFyIGRvbUVsZW1lbnRPbkNhbnZhc0VsZW1lbnQgPSBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcbiAgICBpZiAoZG9tRWxlbWVudE9uQ2FudmFzRWxlbWVudCkge1xuICAgICAgZG9tRWxlbWVudE9uQ2FudmFzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY2FsbGJhY2tGdW5jKG1lLCBlLCB7XG4gICAgICAgICAgdHlwZTogXCJkb21cIixcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuYWRqdXN0RnJhbWVCb3JkZXJSYWRpdXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKHBhcnNlSW50KG1lLmZyYW1lQm9yZGVyUmFkaXVzLCAxMCkgPiAwKSB7XG4gICAgdmFyIGJvcmRlckRhdGEgPSBtZS5nZXRGcmFtZUlubmVyQm9yZGVyUmFkaXVzKG1lLCBtZS5faGFzRm9jdXMpO1xuICAgIHZhciBmcmFtZUFwcGVhcmFuY2UgPSBib3JkZXJEYXRhLmZyYW1lQXBwZWFyYW5jZTtcbiAgICB2YXIgaW5uZXJCb3JkZXJSYWRpdXMgPSBib3JkZXJEYXRhLmlubmVyQm9yZGVyUmFkaXVzO1xuICAgIHZhciB0aXRsZUJhckhlaWdodCA9IHBhcnNlSW50KGZyYW1lQXBwZWFyYW5jZS50aXRsZUJhckhlaWdodCwgMTApO1xuXG4gICAgaWYgKG1lLnNob3dUaXRsZUJhcikge1xuICAgICAgLy90aXRsZSBiYXIgZXhpc3RzXG4gICAgICBtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5ib3JkZXJCb3R0b21SaWdodFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgICAgbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuYm9yZGVyQm90dG9tTGVmdFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgICAgbWUuaWZyYW1lLnN0eWxlLmJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgICBtZS5pZnJhbWUuc3R5bGUuYm9yZGVyQm90dG9tTGVmdFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuXG4gICAgICBtZS50aXRsZUJhci5zdHlsZS5ib3JkZXJUb3BMZWZ0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgICBtZS50aXRsZUJhci5zdHlsZS5ib3JkZXJUb3BSaWdodFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3RpdGxlIGJhciBub3QgZXhpdHNcbiAgICAgIG1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgICAgbWUuaWZyYW1lLnN0eWxlLmJvcmRlclJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgIH1cblxuICAgIGlmIChtZS5kZnJhbWUpIHtcbiAgICAgIGlmICh0aXRsZUJhckhlaWdodCA9PT0gMCkge1xuICAgICAgICBpZiAoIW1lLmRmcmFtZS5zdHlsZS5ib3JkZXJUb3BSaWdodFJhZGl1cykge1xuICAgICAgICAgIG1lLmRmcmFtZS5zdHlsZS5ib3JkZXJUb3BSaWdodFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWUuZGZyYW1lLnN0eWxlLmJvcmRlclRvcExlZnRSYWRpdXMpIHtcbiAgICAgICAgICBtZS5kZnJhbWUuc3R5bGUuYm9yZGVyVG9wTGVmdFJhZGl1cyA9IGlubmVyQm9yZGVyUmFkaXVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtZS5kZnJhbWUuc3R5bGUuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXMgPSBpbm5lckJvcmRlclJhZGl1cztcbiAgICAgIG1lLmRmcmFtZS5zdHlsZS5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzID0gaW5uZXJCb3JkZXJSYWRpdXM7XG4gICAgfVxuICB9XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuaGFuZGxlUmVsZWFzaW5nRm9jdXMgPSBmdW5jdGlvbiAoZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBmb2N1c2VkID0gbWUuX2hhc0ZvY3VzO1xuXG4gIG1lLl9oYXNGb2N1cyA9IGZhbHNlO1xuXG4gIC8vdXBkYXRlIHN0eWxlIGNsYXNzXG4gIG1lLnRpdGxlQmFyLmNsYXNzTmFtZSA9IG1lLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDtcblxuICBpZiAobWUudGl0bGVCYXJDb2xvckRlZmF1bHQpIHtcbiAgICBtZS50aXRsZUJhci5zdHlsZS5iYWNrZ3JvdW5kID0gbWUudGl0bGVCYXJDb2xvckRlZmF1bHQ7XG4gIH1cbiAgbWUudGl0bGVCYXIuc3R5bGUuY29sb3IgPSBtZS50aXRsZUJhckNhcHRpb25Db2xvckRlZmF1bHQ7XG5cbiAgLy9ib3JkZXIgY29sb3JcbiAgaWYgKG1lLmZyYW1lQm9yZGVyQ29sb3JEZWZhdWx0KSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBtZS5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdDtcbiAgfVxuXG4gIC8vYm9yZGVyIHdpZHRoXG4gIGlmIChtZS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCkge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gbWUuZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ7XG4gICAgbWUuYWRqdXN0RnJhbWVCb3JkZXJSYWRpdXMoKTtcbiAgfVxuXG4gIGlmIChtZS5odG1sRWxlbWVudC50eXBlTmFtZSA9PSBcImNpZndpbmRvd1wiKSB7XG4gICAgaWYgKG1lLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbkVuYWJsZWQpIHtcbiAgICAgIG1lLnRyYW5zcGFyZW5jZS5zdHlsZS53aWR0aCA9IHBhcnNlSW50KG1lLmlmcmFtZS53aWR0aCwgMTApICsgXCJweFwiO1xuICAgICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLmhlaWdodCA9IHBhcnNlSW50KG1lLmlmcmFtZS5oZWlnaHQsIDEwKSArIFwicHhcIjtcbiAgICB9XG4gIH1cblxuICAvL2hhbmRsaW5nIGZvciBjaGlsZCBmcmFtZUNvbXBvbmVudHNcbiAgZm9yICh2YXIgZnJhbWVDb21wb25lbnRJZCBpbiBtZS5mcmFtZUNvbXBvbmVudE1hcCkge1xuICAgIHZhciBmcmFtZUNvbXBvbmVudCA9IG1lLmZyYW1lQ29tcG9uZW50TWFwW2ZyYW1lQ29tcG9uZW50SWRdO1xuICAgIGZyYW1lQ29tcG9uZW50LmhhbmRsZVJlbGVhc2luZ0ZvY3VzKCk7XG4gIH1cblxuICAvL2JvcmRlciBib3R0b21cbiAgaWYgKG1lLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdCkge1xuICAgIG1lLnRpdGxlQmFyLnN0eWxlLmJvcmRlckJvdHRvbSA9IG1lLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdDtcbiAgfVxuXG4gIGlmIChmb2N1c2VkKSB7XG4gICAgbWUuZXZlbnRFbWl0dGVyLmVtaXQoXCJibHVyXCIsIHsgdGFyZ2V0OiBtZSB9KTtcbiAgfVxuXG4gIHJldHVybiBtZTtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5oYW5kbGVUYWtpbmdGb2N1cyA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmb2N1c2VkID0gbWUuX2hhc0ZvY3VzO1xuICBtZS5faGFzRm9jdXMgPSB0cnVlO1xuICBtZS5faGFzRm9jdXMgPSBEYXRlLm5vdygpO1xuXG4gIGlmIChtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5FbmFibGVkKSB7XG4gICAgLy9jbG9zZSB0cmFuc3BhcmVuY2Ugc2NyZWVuXG4gICAgbWUudHJhbnNwYXJlbmNlLnN0eWxlLndpZHRoID0gXCIwcHhcIjtcbiAgICBtZS50cmFuc3BhcmVuY2Uuc3R5bGUuaGVpZ2h0ID0gXCIwcHhcIjtcbiAgfVxuXG4gIC8vdXBkYXRlIHN0eWxlIGNsYXNzXG4gIG1lLnRpdGxlQmFyLmNsYXNzTmFtZSA9IG1lLnRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDtcblxuICBpZiAobWUudGl0bGVCYXJDb2xvckZvY3VzZWQpIHtcbiAgICBtZS50aXRsZUJhci5zdHlsZS5iYWNrZ3JvdW5kID0gbWUudGl0bGVCYXJDb2xvckZvY3VzZWQ7XG4gIH1cbiAgbWUudGl0bGVCYXIuc3R5bGUuY29sb3IgPSBtZS50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQ7XG5cbiAgLy9ib3JkZXIgY29sb3JcbiAgaWYgKG1lLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkKSB7XG4gICAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBtZS5mcmFtZUJvcmRlckNvbG9yRm9jdXNlZDtcbiAgfVxuXG4gIC8vYm9yZGVyIHdpZHRoXG4gIGlmIChtZS5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCkge1xuICAgIG1lLmh0bWxFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gbWUuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQ7XG4gICAgbWUuYWRqdXN0RnJhbWVCb3JkZXJSYWRpdXMoKTtcbiAgfVxuXG4gIC8vYm9yZGVyIGJvdHRvbVxuICBpZiAobWUudGl0bGVCYXJCb3JkZXJCb3R0b21Gb2N1c2VkKSB7XG4gICAgbWUudGl0bGVCYXIuc3R5bGUuYm9yZGVyQm90dG9tID0gbWUudGl0bGVCYXJCb3JkZXJCb3R0b21Gb2N1c2VkO1xuICB9XG5cbiAgLy9oYW5kbGluZyBmb3IgY2hpbGQgZnJhbWVDb21wb25lbnRzXG4gIGZvciAodmFyIGZyYW1lQ29tcG9uZW50SWQgaW4gbWUuZnJhbWVDb21wb25lbnRNYXApIHtcbiAgICB2YXIgZnJhbWVDb21wb25lbnQgPSBtZS5mcmFtZUNvbXBvbmVudE1hcFtmcmFtZUNvbXBvbmVudElkXTtcbiAgICBmcmFtZUNvbXBvbmVudC5oYW5kbGVUYWtpbmdGb2N1cygpO1xuICB9XG5cbiAgaWYgKCFmb2N1c2VkKSB7XG4gICAgbWUuZXZlbnRFbWl0dGVyLmVtaXQoXCJmb2N1c1wiLCB7IHRhcmdldDogbWUgfSk7XG4gIH1cblxuICByZXR1cm4gbWU7XG59O1xuXG5DRnJhbWUucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgLy9tZS5odG1sRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7IC8vaGlkZGVuJztcblxuICBpZiAobW9kZWwgJiYgbW9kZWwucmVxdWVzdEZvY3VzID09IGZhbHNlKSB7XG4gIH0gZWxzZSB7XG4gICAgbWUucmVxdWVzdEZvY3VzKCk7XG4gIH1cbiAgcmV0dXJuIG1lO1xufTtcblxuQ0ZyYW1lLnByb3RvdHlwZS5zaG93TW9kYWwgPSBmdW5jdGlvbiAob25DbG9zZUxpc3RlbmVyKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGFwcGVhcmFuY2UgPSBuZXcgQ0ZyYW1lQXBwZWFyYW5jZSgpO1xuICBhcHBlYXJhbmNlLnNob3dUaXRsZUJhciA9IHRydWU7XG4gIGFwcGVhcmFuY2Uuc2hvd0Nsb3NlQnV0dG9uID0gZmFsc2U7XG4gIGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJSYWRpdXMgPSBcIjBweFwiO1xuICBhcHBlYXJhbmNlLmZyYW1lQm9yZGVyU3R5bGUgPSBcIm5vbmVcIjtcbiAgYXBwZWFyYW5jZS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IFwiMHB4XCI7XG4gIGFwcGVhcmFuY2UuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSBcIjBweFwiO1xuICBhcHBlYXJhbmNlLmZyYW1lQm94U2hhZG93ID0gbnVsbDtcbiAgYXBwZWFyYW5jZS5mcmFtZUJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcbiAgYXBwZWFyYW5jZS5mcmFtZUNvbXBvbmVudHMgPSBbXTtcbiAgYXBwZWFyYW5jZS5mcmFtZUhlaWdodEFkanVzdCA9IDA7XG4gIGFwcGVhcmFuY2UudGl0bGVCYXJIZWlnaHQgPSBcIjBweFwiO1xuICBhcHBlYXJhbmNlLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IG51bGw7XG4gIGFwcGVhcmFuY2UudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9IFwiMHB4XCI7XG5cbiAgYXBwZWFyYW5jZS5vbkluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgLy9hZGRlZCBmb3IgbW9kYWwgd2luZG93XG4gIGFwcGVhcmFuY2UucHVsbFVwRGlzYWJsZWQgPSB0cnVlO1xuXG4gIHZhciB3aW5kb3dNYW5hZ2VyID0gbWUucGFyZW50Q2FudmFzO1xuXG4gIHZhciBtb2RhbEJhY2tncm91bmRXaW5kb3dJZCA9IERFRi5DRlJBTUUuTU9EQUxfQkFDS0dST1VORF9GUkFNRV9JRF9QUkVGSVggK1xuICAgIG1lLmlkO1xuXG4gIC8vY3JlYXRlIGJhY2tncm91bmQgd2luZG93IGZvciBwcmV2ZW50aW5nIGNsaWNrIGJhY2tncm91bmRcbiAgdmFyIG1vZGFsQmFja2dyb3VuZEZyYW1lID0gbmV3IENJZkZyYW1lKFxuICAgIG1vZGFsQmFja2dyb3VuZFdpbmRvd0lkLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDEsXG4gICAgYXBwZWFyYW5jZSxcbiAgKTtcbiAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB0cnVlKTtcbiAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0UmVzaXphYmxlKGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWxCYWNrZ3JvdW5kRnJhbWUuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0LCB0cnVlKTtcbiAgfSk7XG5cbiAgLy9yZW1lbWJlciBpZCBvZiBtb2RhbCBiYWNrZ3JvdW5kIGZyYW1lXG4gIG1lLm1vZGFsQmFja2dyb3VuZFdpbmRvd0lkID0gbW9kYWxCYWNrZ3JvdW5kV2luZG93SWQ7XG5cbiAgLy8gaWYgKHByb3BlcnRpZXMgJiYgcHJvcGVydGllcy53aW5kb3dOYW1lKSB7XG4gIC8vICAgICBmcmFtZS5zZXROYW1lKHByb3BlcnRpZXMud2luZG93TmFtZSk7XG4gIC8vIH1cblxuICBtb2RhbEJhY2tncm91bmRGcmFtZS5oaWRlKCk7XG4gIHdpbmRvd01hbmFnZXIuYWRkV2luZG93KG1vZGFsQmFja2dyb3VuZEZyYW1lKTtcblxuICBtb2RhbEJhY2tncm91bmRGcmFtZS5zZXRUaXRsZShcIlwiKS5nZXRGcmFtZVZpZXcoKS5pbm5lckhUTUwgPVxuICAgICc8ZGl2IGNsYXNzPVwianNmcmFtZS1tb2RhbC13aW5kb3ctYmFja2dyb3VuZFwiPjwvZGl2Pic7XG4gIG1vZGFsQmFja2dyb3VuZEZyYW1lLmdldEZyYW1lVmlldygpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjApXCI7XG4gIG1vZGFsQmFja2dyb3VuZEZyYW1lLnNob3coKTtcblxuICBtZS5zaG93KCk7XG5cbiAgaWYgKG9uQ2xvc2VMaXN0ZW5lcikge1xuICAgIG1lLnNldE9uQ2xvc2VGcmFtZUxpc3RlbmVyKG9uQ2xvc2VMaXN0ZW5lcik7XG4gIH1cbn07XG5DRnJhbWUucHJvdG90eXBlLmdldFdpbmRvd01hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5wYXJlbnRDYW52YXM7XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgLy8gIG1lLmh0bWxFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyAvL2hpZGRlbic7XG4gIHJldHVybiBtZTtcbn07XG5cbi8vT3ZlcnJpZGluZyBDQmVhbkZyYW1lLnByb3RvdHlwZS5vbm1vdXNlRG93blxuQ0lmRnJhbWUucHJvdG90eXBlLm9ubW91c2VEb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgdmFyIHJlZkh0bWxFbGVtZW50ID0gdGhpcztcblxuICAvL0RvIG5vdCBzZWxlY3QgaXQgd2hlbiBkcmFnZ2luZyBieSB0aGUgbW91c2UuXG4gIGRvY3VtZW50LmJvZHkub25kcmFnID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgLy8gZG9jdW1lbnQuYm9keS5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAvLyB9O1xuXG4gIC8vT3ZlcnJpZGUgZGVjb3JhdG9yIHdpdGggb25tb3VzZURvd24gb2YgcGFyZW50IGNsYXNzXG4gIHJlZkh0bWxFbGVtZW50LmRlY29yYXRvciA9IENGcmFtZS5wcm90b3R5cGUub25tb3VzZURvd247XG4gIHJlZkh0bWxFbGVtZW50LmRlY29yYXRvcihlKTtcblxuICAvL0RlcGxveSBhIHRyYW5zcGFyZW50IHNjcmVlbi5cbiAgLy8gU2luY2UgbW91c2VEb3duIGlzIHBvaW50ZWQgdG8gdGhpcy5odG1sRWxlbWVudC5vbm1vdXNlZG93biBpbiB0aGUgQ0JlYW4gY2xhc3MsXG4gIC8vIHRoaXMgJ3RoaXMnIHdpbGwgaW5kaWNhdGUgdGhpcy5odG1sRWxlbWVudC5cbiAgLy9JbiBvdGhlciB3b3JkcyxcbiAgLy9pZiB5b3Ugd2FudCB0byByZWZlciAnQ0lmRnJhbWUnLHlvdSBuZWVkIHRvIHNwZWNpZnkgJ3RoaXMucGFyZW50LidcbiAgLy9TZWUgQ0JlYW5GcmFtZSBjbGFzcywgeW91IGNhbiBmaW5kICd0aGlzLmh0bWxFbGVtZW50LnBhcmVudCA9IHRoaXMnXG4gIHZhciByZWZDSWZGcmFtZSA9IHJlZkh0bWxFbGVtZW50LnBhcmVudDtcblxuICB2YXIgcmVmQ1dpbmRvd01hbmFnZXIgPSByZWZIdG1sRWxlbWVudC5wYXJlbnRDYW52YXM7XG5cbiAgLy9XaGVuIHNvbWV3aGVyZSB3aW5kb3coQ0ZyYW1lLENJZkZyYW1lKSBmaXJlcyAnbW91c2VEb3duJyxcbiAgLy8gQ2xvc2UgYWxsIHRyYW5zcGFyZW5jeSBzY3JlZW5zIHNvIHRoYXQgdGhlIG1vdXNlIGN1cnNvciBjYW4gcGFzcyBvdmVyIGFueSBpRnJhbWVcbiAgZm9yICh2YXIgd2luZG93SWQgaW4gcmVmQ1dpbmRvd01hbmFnZXIuYmVhbkxpc3QpIHtcbiAgICB2YXIgb2JqQ0lmRnJhbWUgPSByZWZDV2luZG93TWFuYWdlci5iZWFuTGlzdFt3aW5kb3dJZF07XG4gICAgaWYgKHdpbmRvd0lkID09IHJlZkNJZkZyYW1lLmdldFdpbmRvd0lkKCkpIHtcbiAgICAgIC8vc2tpcFxuICAgIH0gZWxzZSB7XG4gICAgICBvYmpDSWZGcmFtZS5oYW5kbGVSZWxlYXNpbmdGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHJlZkNJZkZyYW1lLmhhbmRsZVRha2luZ0ZvY3VzKCk7XG59O1xuXG5DSWZGcmFtZS5wcm90b3R5cGUubW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciByZWZDSWZGcmFtZSA9IHRoaXM7XG5cbiAgaWYgKFxuICAgIHJlZkNJZkZyYW1lLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbkVuYWJsZWQgfHxcbiAgICByZWZDSWZGcmFtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5PblJlc2l6ZVxuICApIHtcbiAgICBpZiAocmVmQ0lmRnJhbWUucGFyZW50Q2FudmFzLm9uVG9wT2JqZWN0ID09IHJlZkNJZkZyYW1lKSB7XG4gICAgICAvL01pbmltaXplIHRoZSB3aW5kb3cgYXQgdGhlIGZyb250LlxuICAgICAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLndpZHRoID0gXCIwcHhcIjtcbiAgICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS5oZWlnaHQgPSBcIjBweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL1RoZSB3aW5kb3cgd2hpY2ggaXMgbm90IHRoZSBhdCB0aGUgZnJvbnQgZXhwYW5kcyB0aGUgc2NyZWVuIHNvIHRoYXQgaXQgY2FuIHJlc3BvbmQgdG8gY2xpY2tzLlxuXG4gICAgICBpZiAocmVmQ0lmRnJhbWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuRW5hYmxlZCkge1xuICAgICAgICByZWZDSWZGcmFtZS50cmFuc3BhcmVuY2Uuc3R5bGUud2lkdGggPVxuICAgICAgICAgIHBhcnNlSW50KHJlZkNJZkZyYW1lLmlmcmFtZS53aWR0aCkgKyBcInB4XCI7XG4gICAgICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS5oZWlnaHQgPVxuICAgICAgICAgIHBhcnNlSW50KHJlZkNJZkZyYW1lLmlmcmFtZS5oZWlnaHQpICsgXCJweFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZkNJZkZyYW1lLmRlY29yYXRvciA9IENGcmFtZS5wcm90b3R5cGUubW91c2VVcDtcbiAgcmVmQ0lmRnJhbWUuZGVjb3JhdG9yKGUpO1xuXG4gIC8vQ2FuY2VsIHNlbGVjdGluZyBcIkRvIG5vdCBzZWxlY3Qgd2hlbiBkcmFnZ2luZyBtb3VzZSB3aGlsZSByZWxlYXNpbmcgYnV0dG9uXCIgaXMgY2FuY2VsZWRcbiAgZG9jdW1lbnQuYm9keS5vbmRyYWcgPSBudWxsO1xuICBkb2N1bWVudC5ib2R5Lm9uc2VsZWN0c3RhcnQgPSBudWxsO1xuXG4gIC8vRGlzYWJsZSB3aGVuIHN0b3BwaW5nIG1vdmluZy4oRW5hYmxlIHRyYW5zcGFyZW50IHdpbmRvdyBvbmx5IHdoZW4gbW92aW5nLilcbiAgLy9UaGlzIHdpbGwgd29yayBzbW9vdGhseSBldmVuIHdpdGggaWZyYW1lIGNvbnRlbnRcbiAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5zZXRNaW5GcmFtZVNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5taW5GcmFtZVdpZHRoID0gd2lkdGg7XG4gIG1lLm1pbldpbmRvd0hlaWdodCA9IGhlaWdodDtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoXG4gIGRlbHRhTGVmdCxcbiAgZGVsdGFUb3AsXG4gIGRlbHRhV2lkdGgsXG4gIGRlbHRhSGVpZ2h0LFxuICBieVVzZXIsXG4pIHtcbiAgdmFyIHJlZkNJZkZyYW1lID0gdGhpcztcblxuICBpZiAoIXJlZkNJZkZyYW1lLnJlc2l6YWJsZSAmJiBieVVzZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBwcmV2U2l6ZSA9IHJlZkNJZkZyYW1lLmdldFNpemUoKTtcblxuICAvL1Jlc2l6ZSBwcm9jZXNzaW5nIHNob3VsZCBiZSBvdmVycmlkZGVuIGRpcmVjdGx5IHJhdGhlciB0aGFuIGFkb3B0aW5nIGEgZGVjb3JhdG9yIHBhdHRlcm4gYmVjYXVzZSBpdCBoYXMgYmV0dGVyIHBlcmZvcm1hbmNlLlxuICB2YXIgdG1wTGVmdCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQsIDEwKTtcbiAgdmFyIHRtcFRvcCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCwgMTApO1xuICB2YXIgdG1wV2lkdGggPSBwYXJzZUludChyZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCwgMTApO1xuICB2YXIgdG1wSGVpZ2h0ID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0LCAxMCk7XG5cbiAgLy9JbXBvcnRhbnQgbG9naWMgdG8gaGFuZGxlIHRoZSBtaW5pbXVtIG9mIFdpbmRvdyB3ZWxsXG4gIGlmIChcbiAgICBieVVzZXIgJiZcbiAgICAodG1wV2lkdGggKyBkZWx0YVdpZHRoIDwgcmVmQ0lmRnJhbWUubWluRnJhbWVXaWR0aCAmIGRlbHRhV2lkdGggPCAwKVxuICApIHtcbiAgICAvL01pbmltdW0gYWRqdXN0bWVudCBvZiB3aWR0aFxuICAgIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoID0gdG1wV2lkdGggKyBcInB4XCI7XG4gICAgZGVsdGFXaWR0aCA9IDA7XG4gIH1cblxuICBpZiAoXG4gICAgYnlVc2VyICYmXG4gICAgKHRtcEhlaWdodCArIGRlbHRhSGVpZ2h0IDwgcmVmQ0lmRnJhbWUubWluV2luZG93SGVpZ2h0ICYgZGVsdGFIZWlnaHQgPCAwKVxuICApIHtcbiAgICAvL01pbmltdW0gYWRqdXN0bWVudCBvZiBoZWlnaHRcbiAgICByZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0bXBIZWlnaHQgKyBcInB4XCI7XG4gICAgZGVsdGFIZWlnaHQgPSAwO1xuICB9XG4gIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSAodG1wTGVmdCArIGRlbHRhTGVmdCkgKyBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9ICh0bXBUb3AgKyBkZWx0YVRvcCkgKyBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoID0gKHRtcFdpZHRoICsgZGVsdGFXaWR0aCkgKyBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9ICh0bXBIZWlnaHQgKyBkZWx0YUhlaWdodCkgKyBcInB4XCI7XG5cbiAgdmFyIHRtcENhbnZhc1dpZHRoID0gcGFyc2VJbnQoXG4gICAgcmVmQ0lmRnJhbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGgsXG4gICAgMTAsXG4gICk7XG4gIHZhciB0bXBDYW52YXNIZWlnaHQgPSBwYXJzZUludChcbiAgICByZWZDSWZGcmFtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS5oZWlnaHQsXG4gICAgMTAsXG4gICk7XG5cbiAgLy9TaW5jZSBjYW52YXNFbGVtZW50IGlzIGEgKDAsIDApIHJlbGF0aXZlIGNvb3JkaW5hdGUgd2l0aCByZXNwZWN0XG4gIC8vIHRvIHRoZSBwYXJlbnQgZWxlbWVudCwgaXQgaXMgbm90IG5lY2Vzc2FyeSB0byBjaGFuZ2UgbGVmdCBhbmQgdG9wLlxuICByZWZDSWZGcmFtZS5jYW52YXMuY2FudmFzRWxlbWVudC5zdHlsZS53aWR0aCA9ICh0bXBDYW52YXNXaWR0aCArIGRlbHRhV2lkdGgpICtcbiAgICBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCA9XG4gICAgKHRtcENhbnZhc0hlaWdodCArIGRlbHRhSGVpZ2h0KSArIFwicHhcIjtcblxuICAvL0NoYW5nZSB0aGUgc2l6ZSBvZiB0aGUgdGl0bGUgYmFyLiBUaXRsZUFkanVzdFdpZHRoIGV0Yy5cbiAgLy8gVGhlIHJlYXNvbiB3aHkgeW91IGRvIG5vdCBoYXZlIHRvIHVzZSB0aXRsZUFkanVzdFdpZHRoIGlzXG4gIC8vIGJlY2F1c2UgdGhlc2Ugc2NhbGluZyBhcmUgZG9uZSB3aXRoIGRpZmZlcmVuY2VzIChkZWx0YVgsIGRlbHRhWSkuXG4gIC8vVGhlcmVmb3JlLCBpZiB5b3UgYWRqdXN0IHdpdGggdGhlIHRpdGxlQWRqdXN0V2lkdGhcbiAgLy8gYXMgdGhlIGluaXRpYWwgdmFsdWUsIHRoZSBvdGhlciB3aWxsIHN0cmV0Y2ggcmVsYXRpdmUuXG4gIHJlZkNJZkZyYW1lLnRpdGxlQmFyLnN0eWxlLndpZHRoID1cbiAgICAodG1wQ2FudmFzV2lkdGggLSByZWZDSWZGcmFtZS5pZkRlbHRhICsgZGVsdGFXaWR0aCArIDApICsgXCJweFwiO1xuXG4gIC8vSW1hZ2UgcmVzaXppbmcgZm9yIGlmcmFtZSB0aGF0IGlzIHRoZSBjaGlsZCBlbGVtZW50IG9mIGNhbnZhc1xuICByZWZDSWZGcmFtZS5pZnJhbWUud2lkdGggPVxuICAgICh0bXBDYW52YXNXaWR0aCAtIHJlZkNJZkZyYW1lLmlmRGVsdGEgKyBkZWx0YVdpZHRoICsgMCkgKyBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmlmcmFtZS5oZWlnaHQgPVxuICAgICh0bXBDYW52YXNIZWlnaHQgLSByZWZDSWZGcmFtZS5pZkRlbHRhICsgZGVsdGFIZWlnaHQgK1xuICAgICAgcmVmQ0lmRnJhbWUuZnJhbWVIZWlnaHRBZGp1c3QpICsgXCJweFwiO1xuXG4gIGlmIChcbiAgICByZWZDSWZGcmFtZS5vdmVycmF5VHJhbnNwYXJlbnRTY3JlZW5FbmFibGVkIHx8XG4gICAgcmVmQ0lmRnJhbWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuT25SZXNpemVcbiAgKSB7XG4gICAgLy9EZXBsb3kgYSB0cmFuc3BhcmVudCBzY3JlZW4uXG4gICAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLndpZHRoID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuaWZyYW1lLndpZHRoKSArXG4gICAgICBcInB4XCI7XG4gICAgcmVmQ0lmRnJhbWUudHJhbnNwYXJlbmNlLnN0eWxlLmhlaWdodCA9XG4gICAgICBwYXJzZUludChyZWZDSWZGcmFtZS5pZnJhbWUuaGVpZ2h0KSArIFwicHhcIjtcbiAgfVxuXG4gIC8vbW92ZSBmcmFtZUNvbXBvbmVudChsaWtlIGNsb3NlQnV0dG9uKSBjb3JyZXNwb25kaW5nIHRvIG1vdmluZyB3aW5kb3cgZWRnZSBmb3IgcmVzaXplXG4gIGZvciAodmFyIGZyYW1lQ29tcG9uZW50SWQgaW4gcmVmQ0lmRnJhbWUuZnJhbWVDb21wb25lbnRNYXApIHtcbiAgICB2YXIgZnJhbWVDb21wb25lbnQgPSByZWZDSWZGcmFtZS5mcmFtZUNvbXBvbmVudE1hcFtmcmFtZUNvbXBvbmVudElkXTtcbiAgICAvL3VwZGF0ZSBhbGlnbm1lbnQgb2YgZnJhbWVDb21wb25lbnQgY29ycmVzcG9uZGluZyB0byBtb3Zpbmcgd2luZG93IGVkZ2UgZm9yIHJlc2l6ZVxuICAgIGZyYW1lQ29tcG9uZW50LnVwZGF0ZUFsaWduKCk7XG4gIH1cblxuICBmb3IgKHZhciBiZWFuTmFtZSBpbiByZWZDSWZGcmFtZS5jYW52YXMuYmVhbkxpc3QpIHtcbiAgICB2YXIgdG1wQmVhbiA9IHJlZkNJZkZyYW1lLmNhbnZhcy5iZWFuTGlzdFtiZWFuTmFtZV07XG5cbiAgICBpZiAodG1wQmVhbi5odG1sRWxlbWVudC50eXBlTmFtZSA9PSBcImNtYXJrZXJ3aW5kb3dcIikge1xuICAgICAgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gXCJSRFwiKSB7XG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUubGVmdCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUubGVmdCkgKyBkZWx0YVdpZHRoKSArIFwicHhcIjtcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3AgPVxuICAgICAgICAgIChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCkgKyBkZWx0YUhlaWdodCkgKyBcInB4XCI7XG4gICAgICB9IGVsc2UgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gXCJERFwiKSB7XG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPVxuICAgICAgICAgIChwYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLndpZHRoKSArIGRlbHRhV2lkdGgpICsgXCJweFwiO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUudG9wKSArIGRlbHRhSGVpZ2h0KSArIFwicHhcIjtcbiAgICAgIH0gZWxzZSBpZiAodG1wQmVhbi5odG1sRWxlbWVudC51c2FnZSA9PSBcIlJSXCIpIHtcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0ID1cbiAgICAgICAgICAocGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0KSArIGRlbHRhV2lkdGgpICsgXCJweFwiO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9XG4gICAgICAgICAgKHBhcnNlSW50KHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUuaGVpZ2h0KSArIGRlbHRhSGVpZ2h0KSArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgY3JyU2l6ZSA9IHJlZkNJZkZyYW1lLmdldFNpemUoKTtcbiAgaWYgKHByZXZTaXplLndpZHRoICE9PSBjcnJTaXplLndpZHRoIHx8IHByZXZTaXplLmhlaWdodCAhPT0gY3JyU2l6ZS5oZWlnaHQpIHtcbiAgICByZWZDSWZGcmFtZS5ldmVudEVtaXR0ZXIuZW1pdChcInJlc2l6ZVwiLCByZWZDSWZGcmFtZS5fZ2V0Q3VycmVudFNpemVQb3MoKSk7XG4gIH1cbn07IC8vcmVzaXplXG5cbkNJZkZyYW1lLnByb3RvdHlwZS5fZ2V0Q3VycmVudFNpemVQb3MgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBjcnJTaXplID0gbWUuZ2V0U2l6ZSgpO1xuICB2YXIgY3JyUG9zID0gbWUuZ2V0UG9zaXRpb24oKTtcbiAgcmV0dXJuIHsgdGFyZ2V0OiBtZSwgcG9zOiBjcnJQb3MsIHNpemU6IGNyclNpemUgfTtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5yZXNpemVEaXJlY3QgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgYnlVc2VyKSB7XG4gIHZhciByZWZDSWZGcmFtZSA9IHRoaXM7XG5cbiAgaWYgKCFyZWZDSWZGcmFtZS5yZXNpemFibGUgJiYgYnlVc2VyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICByZWZDSWZGcmFtZS5odG1sRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG5cbiAgdmFyIHRtcENhbnZhc1dpZHRoID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUud2lkdGgpO1xuICB2YXIgdG1wQ2FudmFzSGVpZ2h0ID0gcGFyc2VJbnQocmVmQ0lmRnJhbWUuY2FudmFzLmNhbnZhc0VsZW1lbnQuc3R5bGUuaGVpZ2h0KTtcblxuICAvL1NpbmNlIGNhbnZhc0VsZW1lbnQgaXMgYSAoMCwgMCkgcmVsYXRpdmUgY29vcmRpbmF0ZSB3aXRoIHJlc3BlY3RcbiAgLy8gdG8gdGhlIHBhcmVudCBlbGVtZW50LCBpdCBpcyBub3QgbmVjZXNzYXJ5IHRvIGNoYW5nZSBsZWZ0IGFuZCB0b3AuXG4gIHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmNhbnZhcy5jYW52YXNFbGVtZW50LnN0eWxlLmhlaWdodCA9XG4gICAgKGhlaWdodCAtIHJlZkNJZkZyYW1lLnRpdGxlQmFyLnN0eWxlLmhlaWdodCkgKyBcInB4XCI7XG5cbiAgLy9DaGFuZ2UgdGhlIHNpemUgb2YgdGhlIHRpdGxlIGJhci4gVGl0bGVBZGp1c3RXaWR0aCBldGMuXG4gIC8vIFRoZSByZWFzb24gd2h5IHlvdSBkbyBub3QgaGF2ZSB0byB1c2UgdGl0bGVBZGp1c3RXaWR0aCBpc1xuICAvLyBiZWNhdXNlIHRoZXNlIHNjYWxpbmcgYXJlIGRvbmUgd2l0aCBkaWZmZXJlbmNlcyAoZGVsdGFYLCBkZWx0YVkpLlxuICAvL1RoZXJlZm9yZSwgaWYgeW91IGFkanVzdCB3aXRoIHRoZSB0aXRsZUFkanVzdFdpZHRoXG4gIC8vIGFzIHRoZSBpbml0aWFsIHZhbHVlLCB0aGUgb3RoZXIgd2lsbCBzdHJldGNoIHJlbGF0aXZlLlxuICByZWZDSWZGcmFtZS50aXRsZUJhci5zdHlsZS53aWR0aCA9ICh3aWR0aCAtIHJlZkNJZkZyYW1lLmlmRGVsdGEpICsgXCJweFwiO1xuXG4gIC8vSW1hZ2UgcmVzaXppbmcgZm9yIGlmcmFtZSB0aGF0IGlzIHRoZSBjaGlsZCBlbGVtZW50IG9mIGNhbnZhc1xuICByZWZDSWZGcmFtZS5pZnJhbWUud2lkdGggPSB3aWR0aCAtIHJlZkNJZkZyYW1lLmlmRGVsdGEgKyBcInB4XCI7XG4gIHJlZkNJZkZyYW1lLmlmcmFtZS5oZWlnaHQgPSBoZWlnaHQgLSByZWZDSWZGcmFtZS5pZkRlbHRhICtcbiAgICByZWZDSWZGcmFtZS5mcmFtZUhlaWdodEFkanVzdCArIFwicHhcIjtcblxuICBpZiAoXG4gICAgcmVmQ0lmRnJhbWUub3ZlcnJheVRyYW5zcGFyZW50U2NyZWVuRW5hYmxlZCB8fFxuICAgIHJlZkNJZkZyYW1lLm92ZXJyYXlUcmFuc3BhcmVudFNjcmVlbk9uUmVzaXplXG4gICkge1xuICAgIC8vRGVwbG95IGEgdHJhbnNwYXJlbnQgc2NyZWVuLlxuICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS53aWR0aCA9IHBhcnNlSW50KHJlZkNJZkZyYW1lLmlmcmFtZS53aWR0aCkgK1xuICAgICAgXCJweFwiO1xuICAgIHJlZkNJZkZyYW1lLnRyYW5zcGFyZW5jZS5zdHlsZS5oZWlnaHQgPVxuICAgICAgcGFyc2VJbnQocmVmQ0lmRnJhbWUuaWZyYW1lLmhlaWdodCkgKyBcInB4XCI7XG4gIH1cblxuICAvL21vdmUgZnJhbWVDb21wb25lbnQobGlrZSBjbG9zZUJ1dHRvbikgY29ycmVzcG9uZGluZyB0byBtb3Zpbmcgd2luZG93IGVkZ2UgZm9yIHJlc2l6ZVxuICBmb3IgKHZhciBmcmFtZUNvbXBvbmVudElkIGluIHJlZkNJZkZyYW1lLmZyYW1lQ29tcG9uZW50TWFwKSB7XG4gICAgdmFyIGZyYW1lQ29tcG9uZW50ID0gcmVmQ0lmRnJhbWUuZnJhbWVDb21wb25lbnRNYXBbZnJhbWVDb21wb25lbnRJZF07XG4gICAgLy91cGRhdGUgYWxpZ25tZW50IG9mIGZyYW1lQ29tcG9uZW50IGNvcnJlc3BvbmRpbmcgdG8gbW92aW5nIHdpbmRvdyBlZGdlIGZvciByZXNpemVcbiAgICBmcmFtZUNvbXBvbmVudC51cGRhdGVBbGlnbigpO1xuICB9XG5cbiAgZm9yICh2YXIgYmVhbk5hbWUgaW4gcmVmQ0lmRnJhbWUuY2FudmFzLmJlYW5MaXN0KSB7XG4gICAgdmFyIHRtcEJlYW4gPSByZWZDSWZGcmFtZS5jYW52YXMuYmVhbkxpc3RbYmVhbk5hbWVdO1xuXG4gICAgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudHlwZU5hbWUgPT0gXCJjbWFya2Vyd2luZG93XCIpIHtcbiAgICAgIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnVzYWdlID09IFwiUkRcIikge1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSB3aWR0aCArIFwicHhcIjsgLy8gcGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0KSArIGRlbHRhV2lkdGggKyAncHgnO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCA9IGhlaWdodCArIFwicHhcIjsgLy9wYXJzZUludCh0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLnRvcCkgKyBkZWx0YUhlaWdodCArICdweCc7XG4gICAgICB9IGVsc2UgaWYgKHRtcEJlYW4uaHRtbEVsZW1lbnQudXNhZ2UgPT0gXCJERFwiKSB7XG4gICAgICAgIHRtcEJlYW4uaHRtbEVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICAgICAgdG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3AgPSBoZWlnaHQgKyBcInB4XCI7IC8vaGVpZ2h0cGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS50b3ApICsgZGVsdGFIZWlnaHQgKyAncHgnO1xuICAgICAgfSBlbHNlIGlmICh0bXBCZWFuLmh0bWxFbGVtZW50LnVzYWdlID09IFwiUlJcIikge1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmxlZnQgPSB3aWR0aCArIFwicHhcIjsgLy8rcGFyc2VJbnQodG1wQmVhbi5odG1sRWxlbWVudC5zdHlsZS5sZWZ0KSArIGRlbHRhV2lkdGggKyAncHgnO1xuICAgICAgICB0bXBCZWFuLmh0bWxFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07IC8vcmVzaXplXG5cbi8qKlxuICogRm9jdXMgb24gdGhpcyBmcmFtZVxuICovXG5DSWZGcmFtZS5wcm90b3R5cGUucmVxdWVzdEZvY3VzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBiZWFuTGlzdCA9IG1lLnBhcmVudENhbnZhcy5iZWFuTGlzdDtcblxuICBmb3IgKHZhciB3aW5kb3dJZCBpbiBiZWFuTGlzdCkge1xuICAgIHZhciB0bXBJZldpbmRvdyA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuICAgIC8vSWYgaXQncyBteSBvd24gd2luZG93LCBtaW5pbWl6ZSB0aGUgdHJhbnNwYXJlbnQgc2NyZWVuIGFuZCBjaGFuZ2UgdGhlIGNvbG9yIG9mIHRoZSB0aXRsZSBiYXIuXG4gICAgaWYgKHdpbmRvd0lkID09IG1lLmdldFdpbmRvd0lkKCkpIHtcbiAgICAgIC8vaWYgdGhpcyBmcmFtZSBpcyBhIHRhcmdldCBmcmFtZVxuICAgICAgdG1wSWZXaW5kb3cuaGFuZGxlVGFraW5nRm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9pZiB0aGlzIGZyYW1lIGlzIE5PVCBhIHRhcmdldCBmcmFtZVxuICAgICAgdG1wSWZXaW5kb3cuaGFuZGxlUmVsZWFzaW5nRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBtZS5wYXJlbnRDYW52YXMucHVsbFVwKG1lLmlkKTtcbn07XG5cbi8qKlxuICogVVJMIGZvciBpZnJhbWVcbiAqIEBwYXJhbSB1cmxcbiAqL1xuQ0lmRnJhbWUucHJvdG90eXBlLnNldFVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIG1lLnNldFVzZUlmcmFtZSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWUuc2V0VXNlSWZyYW1lKGZhbHNlKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBtZS5pZnJhbWUuc3JjID0gdXJsO1xuXG4gICAgbWUuaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBmdW5jT25Nb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgY2xpZW50WCA9IGUucGFnZVg7XG4gICAgICAgIHZhciBjbGllbnRZID0gZS5wYWdlWTtcblxuICAgICAgICBpZiAoVE9VQ0hfRU5BQkxFRCkge1xuICAgICAgICAgIGlmIChlLnR5cGUgPT09IFwidG91Y2htb3ZlXCIpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkVG91Y2hlcyA9IGUuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgICAgICBpZiAoVE9VQ0hfTU9WRV9PTkxZX1dJVEhfT05FX0ZJTkdFUikge1xuICAgICAgICAgICAgICB2YXIgdG91Y2hlcyA9IGUudG91Y2hlcztcbiAgICAgICAgICAgICAgaWYgKHRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY2xpZW50WCA9IGNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgICAgIGNsaWVudFkgPSBjaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2xpZW50WCA9IGNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICAgICAgICBjbGllbnRZID0gY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmcmFtZUxlZnQgPSBtZS5nZXRMZWZ0KCk7XG4gICAgICAgIHZhciBmcmFtZVRvcCA9IG1lLmdldFRvcCgpO1xuICAgICAgICB2YXIgZXZlbnRGcm9tSWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtcbiAgICAgICAgLy8gUHJvY2Vzc2luZyB0byBtYWtlIGl0IGxvb2sgbGlrZSBtb3VzZSBtb3ZlIGV2ZW4gaWYgeW91IGFyZSBtb3ZpbmcgYnkgdG91Y2hcbiAgICAgICAgZXZlbnRGcm9tSWZyYW1lLmluaXRNb3VzZUV2ZW50KFxuICAgICAgICAgIFwibW91c2Vtb3ZlXCIsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICB3aW5kb3csXG4gICAgICAgICAgZS5kZXRhaWwsXG4gICAgICAgICAgZS5zY3JlZW5YLFxuICAgICAgICAgIGUuc2NyZWVuWSxcbiAgICAgICAgICAoY2xpZW50WCArIGZyYW1lTGVmdCksXG4gICAgICAgICAgKGNsaWVudFkgKyBmcmFtZVRvcCksXG4gICAgICAgICAgZS5jdHJsS2V5LFxuICAgICAgICAgIGUuYWx0S2V5LFxuICAgICAgICAgIGUuc2hpZnRLZXksXG4gICAgICAgICAgZS5tZXRhS2V5LFxuICAgICAgICAgIGUuYnV0dG9uLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy9zbW9vdGggZHJhZ2dpbmcgZHVyaW5nIGlmcmFtZSBtb2RlXG4gICAgICAgIG1lLnBhcmVudENhbnZhcy53aW5kb3dNb3VzZU1vdmUoZXZlbnRGcm9tSWZyYW1lKTtcblxuICAgICAgICBpZiAobWUub25Nb3VzZU1vdmVPbklmcmFtZSkge1xuICAgICAgICAgIG1lLm9uTW91c2VNb3ZlT25JZnJhbWUoZXZlbnRGcm9tSWZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG1lLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gZnVuY09uTW91c2VNb3ZlO1xuICAgICAgbWUuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQub250b3VjaG1vdmUgPSBmdW5jT25Nb3VzZU1vdmU7XG5cbiAgICAgIC8vbW91c2UgdXBcbiAgICAgIHZhciBmdW5jT25Nb3VzZVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGNsaWVudFggPSBlLnBhZ2VYO1xuICAgICAgICB2YXIgY2xpZW50WSA9IGUucGFnZVk7XG5cbiAgICAgICAgaWYgKFRPVUNIX0VOQUJMRUQpIHtcbiAgICAgICAgICBpZiAoZS50eXBlID09PSBcInRvdWNoZW5kXCIpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkVG91Y2hlcyA9IGUuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgICAgICBjbGllbnRYID0gY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgICBjbGllbnRZID0gY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmcmFtZUxlZnQgPSBtZS5nZXRMZWZ0KCk7XG4gICAgICAgIHZhciBmcmFtZVRvcCA9IG1lLmdldFRvcCgpO1xuICAgICAgICB2YXIgZXZlbnRGcm9tSWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtcbiAgICAgICAgLy8gUHJvY2Vzc2luZyB0byBtYWtlIGl0IGxvb2sgbGlrZSBtb3VzZSB1cCBldmVuIGlmIHlvdSBtb3VzZXVwIGJ5IHRvdWNoXG4gICAgICAgIGV2ZW50RnJvbUlmcmFtZS5pbml0TW91c2VFdmVudChcbiAgICAgICAgICBcIm1vdXNldXBcIixcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIHdpbmRvdyxcbiAgICAgICAgICBlLmRldGFpbCxcbiAgICAgICAgICBlLnNjcmVlblgsXG4gICAgICAgICAgZS5zY3JlZW5ZLFxuICAgICAgICAgIChjbGllbnRYICsgZnJhbWVMZWZ0KSxcbiAgICAgICAgICAoY2xpZW50WSArIGZyYW1lVG9wKSxcbiAgICAgICAgICBlLmN0cmxLZXksXG4gICAgICAgICAgZS5hbHRLZXksXG4gICAgICAgICAgZS5zaGlmdEtleSxcbiAgICAgICAgICBlLm1ldGFLZXksXG4gICAgICAgICAgZS5idXR0b24sXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgKTtcblxuICAgICAgICAvL3Ntb290aCBkcmFnZ2luZyBkdXJpbmcgaWZyYW1lIG1vZGVcbiAgICAgICAgbWUucGFyZW50Q2FudmFzLndpbmRvd01vdXNlVXAoZXZlbnRGcm9tSWZyYW1lKTtcblxuICAgICAgICBpZiAobWUub25Nb3VzZVVwT25JZnJhbWUpIHtcbiAgICAgICAgICBtZS5vbk1vdXNlVXBPbklmcmFtZShldmVudEZyb21JZnJhbWUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbWUuaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQub25tb3VzZXVwID0gZnVuY09uTW91c2VVcDtcbiAgICAgIG1lLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50Lm9udG91Y2hlbmQgPSBmdW5jT25Nb3VzZVVwO1xuXG4gICAgICByZXNvbHZlKG1lLCBtZS5pZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudCk7XG4gICAgfTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgRE9NLWRvY3VtZW50IG9mIGlmcmFtZVxuICogQHJldHVybnMgeyp8SFRNTERvY3VtZW50fVxuICovXG5DSWZGcmFtZS5wcm90b3R5cGUuZ2V0SWZEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLmlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xufTtcblxuQ0lmRnJhbWUucHJvdG90eXBlLnNldFNjcm9sbGluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuaWZyYW1lLnNjcm9sbGluZyA9IHN0cjtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5nZXRTY3JvbGxpbmcgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5pZnJhbWUuc2Nyb2xsaW5nO1xufTtcblxuQ0lmRnJhbWUucHJvdG90eXBlLnNldFJlc2l6YWJsZSA9IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnJlc2l6YWJsZSA9IGVuYWJsZWQ7XG4gIG1lLmVuYWJsZU1hcmtlcnMoZW5hYmxlZCk7XG4gIHJldHVybiBtZTtcbn07XG5cbkNJZkZyYW1lLnByb3RvdHlwZS5zZXRDb250cm9sID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKG1vZGVsKSB7XG4gICAgbW9kZWwuZnJhbWUgPSBtZTtcbiAgICBtZS5jb250cm9sID0gbWUuanNGcmFtZS5jcmVhdGVXaW5kb3dFdmVudEhlbHBlcihtb2RlbCk7XG4gICAgbWUuY29udHJvbC5zZXR1cERlZmF1bHRFdmVudHMoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBlbmQgb2YgQ0lGcmFtZSBjbGFzc1xuICovXG5cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxuXG5pbmhlcml0KENXaW5kb3dNYW5hZ2VyLCBDQ2FudmFzKTtcblxuLyoqXG4gKiBDV2luZG93TWFuYWdlciBjbGFzc1xuICogPHA+XG4gKiBBIGNhbnZhcyBjbGFzcyB0aGF0IGRpc3BsYXlzIG11bHRpcGxlIGZyYW1lcy4gSGFuZGxlIGV2ZW50cyBvbiB0aGUgd2luZG93IHRvIGNvb3JkaW5hdGUgbXVsdGlwbGUgd2luZG93czxicj5cbiAqXG4gKiBAcGFyYW0gcGFyZW50RWxlbWVudFxuICogQHBhcmFtIGNhbnZhc0lkXG4gKiBAcGFyYW0gbGVmdFxuICogQHBhcmFtIHRvcFxuICogQHBhcmFtIHdpZHRoXG4gKiBAcGFyYW0gaGVpZ2h0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ1dpbmRvd01hbmFnZXIocGFyZW50RWxlbWVudCwgY2FudmFzSWQsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCkge1xuICBDV2luZG93TWFuYWdlci5zdXBlckNvbnN0cnVjdG9yLmNhbGwoXG4gICAgdGhpcyxcbiAgICBwYXJlbnRFbGVtZW50LFxuICAgIGNhbnZhc0lkLFxuICAgIGxlZnQsXG4gICAgdG9wLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgKTtcbiAgdmFyIG1lID0gdGhpcztcbiAgLy8gZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2dCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgIGZvciAodmFyIHdpbmRvd0lkIGluIG1lLmJlYW5MaXN0KSB7XG4gICAgICB2YXIgYmVhbkZyYW1lID0gbWUuYmVhbkxpc3Rbd2luZG93SWRdO1xuICAgICAgYmVhbkZyYW1lLm9uQm9keUNsaWNrZWQoZXZ0KTtcbiAgICB9XG4gIH0pO1xufVxuXG5DV2luZG93TWFuYWdlci5wcm90b3R5cGUuZ2V0V2luZG93ID0gZnVuY3Rpb24gKHdpbmRvd0lkKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5iZWFuTGlzdFt3aW5kb3dJZF07XG59O1xuXG4vL1dyYXBwaW5nIHRoZSAnYWRkQmVhbicgb2YgdGhlIHBhcmVudCBjbGFzc1xuQ1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmFkZFdpbmRvdyA9IGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgd2luZG93SWQgPSB3aW5kb3cuZ2V0V2luZG93SWQoKTtcbiAgdmFyIG5hbWUgPSB3aW5kb3cuZ2V0TmFtZSgpO1xuICBtZS5iZWFuSWROYW1lW3dpbmRvd0lkXSA9IG5hbWU7XG4gIG1lLmJlYW5OYW1lSWRbbmFtZV0gPSB3aW5kb3dJZDtcblxuICBtZS5hZGRCZWFuKHdpbmRvdyk7XG59O1xuXG4vL2lmIGNvbnRhaW5zIHdpbmRvdyBuYW1lZCBzcGVjaWZpZWQgbmFtZVxuQ1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmNvbnRhaW5zV2luZG93TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIHdpbmRvd0lkID0gbWUuYmVhbk5hbWVJZFtuYW1lXTtcblxuICBpZiAod2luZG93SWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5DV2luZG93TWFuYWdlci5wcm90b3R5cGUuZ2V0V2luZG93QnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIHdpbmRvd0lkID0gbWUuYmVhbk5hbWVJZFtuYW1lXTtcblxuICBpZiAod2luZG93SWQpIHtcbiAgICByZXR1cm4gbWUuZ2V0V2luZG93KHdpbmRvd0lkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuLy9XcmFwcGluZyB0aGUgJ21vdXNlTW92ZScgbWV0aG9kIG9mIHRoZSBwYXJlbnQgY2xhc3NcbkNXaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS53aW5kb3dNb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAobWUuY3VycmVudE9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgY2hpbGRXaW5kb3dNb3ZlZCA9IGZhbHNlO1xuXG4gIC8vTG9vcCBwcm9jZXNzaW5nIG9mIGVhY2ggQ1dpbmRvdyBoZWxkIGJ5IENXaW5kb3dNYW5hZ2VyXG4gIHZhciBiZWFuTGlzdCA9IG1lLmJlYW5MaXN0O1xuXG4gIGZvciAodmFyIHdpbmRvd0lkIGluIGJlYW5MaXN0KSB7XG4gICAgdmFyIHRhcmdldFdpbmRvdyA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuICAgIC8vU2luY2UgdGhpcyAnbW91c2VNb3ZlJyBpcyBjYW52YXMgb2YgQ1dpbmRvdydzICdtb3VzZU1vdmUnLHNvIGRvIG1vdmUgQ0JlYW5GcmFtZXMgaW4gdGhlIGNhbnZhcy5cbiAgICB2YXIgZXZlbnREYXRhID0gdGFyZ2V0V2luZG93LmNhbnZhcy5tb3VzZU1vdmUoZSk7XG5cbiAgICAvL1doZXRoZXIgYW55IG9uZSBvZiB0aGUgYmVhbnMgaW4gdGhlIENhbnZhcyBoYXMgbW92ZWQgb3Igbm90LlxuICAgIC8vWWVzLihXaGVuIGl0IG1vdmVzKSwgZXZlbnREYXRhIGlzIHNldC5cbiAgICAvL05PLiBJZiBpdCBkb2VzIG5vdCBtb3ZlIGl0IGlzIHNldCB0byBudWxsLlxuICAgIGNoaWxkV2luZG93TW92ZWQgPSBjaGlsZFdpbmRvd01vdmVkIHwgKGV2ZW50RGF0YSAhPSBudWxsKTtcbiAgICBpZiAoZXZlbnREYXRhICE9IG51bGwpIHtcbiAgICAgIC8vSWYgaXQgaXMgdGhlIG1hcmtlciBmb3IgcmVzaXppbmdcbiAgICAgIGlmIChldmVudERhdGEudGFyZ2V0VHlwZU5hbWUgPT0gXCJjbWFya2Vyd2luZG93XCIpIHtcbiAgICAgICAgdmFyIHRhcmdldE9iamVjdCA9IGV2ZW50RGF0YS50YXJnZXRPYmplY3Q7XG5cbiAgICAgICAgLy9FbmFibGUgdHJhbnNwYXJlbnQgd2luZG93IG9ubHkgd2hlbiBtb3ZpbmcuXG4gICAgICAgIC8vVGhpcyB3aWxsIHdvcmsgc21vb3RobHkgZXZlbiB3aXRoIGlmcmFtZSBjb250ZW50XG4gICAgICAgIHRhcmdldFdpbmRvdy50cmFuc3BhcmVuY2Uuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuXG4gICAgICAgIGlmICh0YXJnZXRPYmplY3QudXNhZ2UgPT0gXCJSRFwiKSB7XG4gICAgICAgICAgdGFyZ2V0V2luZG93LnJlc2l6ZSgwLCAwLCBldmVudERhdGEuZGVsdGFYLCBldmVudERhdGEuZGVsdGFZLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRPYmplY3QudXNhZ2UgPT0gXCJERFwiKSB7XG4gICAgICAgICAgdGFyZ2V0V2luZG93LnJlc2l6ZSgwLCAwLCAwLCBldmVudERhdGEuZGVsdGFZLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRPYmplY3QudXNhZ2UgPT0gXCJSUlwiKSB7XG4gICAgICAgICAgdGFyZ2V0V2luZG93LnJlc2l6ZSgwLCAwLCBldmVudERhdGEuZGVsdGFYLCAwLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vSWYgYW55IG9uZSBvZiB0aGUgYmVhbnMgaW4gdGhlIENhbnZhcyBoYXMgbW92ZWQuRG8gbm90IGRvICdDd2luZG93J3MgbW91c2VNb3ZlJ1xuICBpZiAoIWNoaWxkV2luZG93TW92ZWQgJiYgdGhpcy5tb3VzZURvd25Tb3VyY2UgIT0gXCJjaGlsZGNhbnZhc1wiKSB7XG4gICAgLy9Nb3ZpbmcgbG9naWMgZm9yIENXaW5kb3cgd2hpY2ggaXMgaG9sZGVkIGJ5IENXaW5kb3dNYW5hZ2VyIGFzIGEgY2hpbGQgd2luZG93LlxuICAgIG1lLm1vdXNlTW92ZShlKTtcbiAgfVxufTtcblxuLy9XcmFwcGluZyB0aGUgbWV0aG9kICdtb3VzZVVwJyBvZiB0aGUgcGFyZW50IGNsYXNzXG5DV2luZG93TWFuYWdlci5wcm90b3R5cGUud2luZG93TW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgLy9ydW4gJ21vdXNlVXAnIG9mIHBhcmVudCBjbGFzc1xuICBtZS5tb3VzZVVwKGUpO1xuXG4gIHZhciBiZWFuTGlzdCA9IG1lLmJlYW5MaXN0O1xuXG4gIGZvciAodmFyIHdpbmRvd0lkIGluIGJlYW5MaXN0KSB7XG4gICAgdmFyIG9ialdpbmRvdyA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuICAgIC8vcnVuIENXaW5kb3cncyAnbW91c2VVcCcoaXQncyBjaGlsZCB3aW5kb3cpLlxuICAgIG9ialdpbmRvdy5tb3VzZVVwKGUpO1xuICB9XG59O1xuXG4vKipcbiAqIChvdmVycmlkZSBDQ2FudmFzLnJlbW92ZUJlYW4pXG4gKiBAcGFyYW0gd2luZG93SWRcbiAqL1xuQ1dpbmRvd01hbmFnZXIucHJvdG90eXBlLnJlbW92ZUJlYW4gPSBmdW5jdGlvbiAod2luZG93SWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvL1JldHJpZXZlIHRoZSB0YXJnZXQgYmVhbkZyYW1lXG4gIHZhciBiZWFuTGlzdCA9IG1lLmJlYW5MaXN0O1xuICB2YXIgdGFyZ2V0QmVhbiA9IGJlYW5MaXN0W3dpbmRvd0lkXTtcblxuICBpZiAodGFyZ2V0QmVhbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHJlbW92ZVRhcmdldEJlYW5IYXNGb2N1cyA9IHRhcmdldEJlYW4uX2hhc0ZvY3VzO1xuXG4gIC8vUmVtb3ZlIGJlYW4ncyBodG1sRWxlbWVudCBmcm9tIGNhbnZhc0VsZW1lbnRcbiAgbWUuY2FudmFzRWxlbWVudC5yZW1vdmVDaGlsZCh0YXJnZXRCZWFuLmh0bWxFbGVtZW50KTtcblxuICAvL0RlbGV0ZSB0aGUgYmVhbiBvYmplY3QgaW4gdGhlIGFzc29jaWF0aXZlIGFycmF5LlxuICBkZWxldGUgYmVhbkxpc3Rbd2luZG93SWRdO1xuXG4gIHZhciBiZWFuTmFtZSA9IG1lLmJlYW5JZE5hbWVbd2luZG93SWRdO1xuICBpZiAoYmVhbk5hbWUpIHtcbiAgICAvLy1pZiBiZWFuIG5hbWUgZXhpc3RcbiAgICBkZWxldGUgbWUuYmVhbklkTmFtZVt3aW5kb3dJZF07XG4gICAgZGVsZXRlIG1lLmJlYW5OYW1lSWRbYmVhbk5hbWVdO1xuICB9XG5cbiAgLy9mb2N1cyBvbiBsYXN0IGZvY3VzZWQgd2luZG93IGFmdGVyIHJlbW92aW5nXG4gIHZhciBtYXhGb2N1c1RpbWUgPSAwO1xuICB2YXIgbGFzdEZvY3VzZWRGcmFtZSA9IG51bGw7XG5cbiAgaWYgKHJlbW92ZVRhcmdldEJlYW5IYXNGb2N1cykge1xuICAgIGZvciAodmFyIHdpbmRvd0lkIGluIGJlYW5MaXN0KSB7XG4gICAgICB2YXIgZnJhbWUgPSBiZWFuTGlzdFt3aW5kb3dJZF07XG5cbiAgICAgIC8vcHVsbFVwRGlzYWJsZWQ9dHJ1ZSBtZWFucyB0aGF0IHRoZSBmcmFtZSBpcyBtb2RhbCBiYWNrZ3JvdW5kIHdpbmRvd1xuICAgICAgaWYgKG1heEZvY3VzVGltZSA8PSBmcmFtZS5faGFzRm9jdXNUaW1lICYmICFmcmFtZS5wdWxsVXBEaXNhYmxlZCkge1xuICAgICAgICBtYXhGb2N1c1RpbWUgPSBmcmFtZS5faGFzRm9jdXNUaW1lO1xuXG4gICAgICAgIGxhc3RGb2N1c2VkRnJhbWUgPSBmcmFtZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhc3RGb2N1c2VkRnJhbWUpIHtcbiAgICAgIGxhc3RGb2N1c2VkRnJhbWUucmVxdWVzdEZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgdGFyZ2V0QmVhbi5wYXJlbnRDYW52YXMgPSBudWxsO1xufTtcbi8qKlxuICogZW5kIG9mIENXaW5kb3dNYW5hZ2VyIGNsYXNzXG4gKi9cblxuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cbmluaGVyaXQoQ01hcmtlcldpbmRvdywgQ0JlYW5GcmFtZSk7XG5cbi8qKlxuICogQ01hcmtlcldpbmRvdyBjbGFzc1xuICogQHBhcmFtIHdpbmRvd0lkXG4gKiBAcGFyYW0gbGVmdFxuICogQHBhcmFtIHRvcFxuICogQHBhcmFtIHdpZHRoXG4gKiBAcGFyYW0gaGVpZ2h0XG4gKiBAcGFyYW0gemluZGV4XG4gKiBAcGFyYW0gdXNhZ2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDTWFya2VyV2luZG93KFxuICB3aW5kb3dJZCxcbiAgbGVmdCxcbiAgdG9wLFxuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICB6aW5kZXgsXG4gIHVzYWdlLFxuICBjb2xvcixcbikge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIENNYXJrZXJXaW5kb3cuc3VwZXJDb25zdHJ1Y3Rvci5jYWxsKFxuICAgIHRoaXMsXG4gICAgd2luZG93SWQsXG4gICAgbGVmdCxcbiAgICB0b3AsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHppbmRleCxcbiAgICB1c2FnZSxcbiAgKTtcblxuICBtZS5odG1sRWxlbWVudC50eXBlTmFtZSA9IFwiY21hcmtlcndpbmRvd1wiO1xuICBtZS5odG1sRWxlbWVudC51c2FnZSA9IHVzYWdlO1xuICBtZS5odG1sRWxlbWVudC5pc1JhbmdlTGltaXRlZCA9IGZhbHNlO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJTdHlsZSA9IFwibm9uZVwiO1xuICBtZS5odG1sRWxlbWVudC5zdHlsZS56SW5kZXggPSAxO1xuICBpZiAoY29sb3IpIHtcbiAgICBtZS5odG1sRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3I7XG4gIH1cbiAgLy9tZS5wdWxsVXBEaXNhYmxlZCA9IHRydWU7XG5cbiAgbWUuZ2V0V2luZG93VHlwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJDTWFya2VyV2luZG93XCI7XG4gIH07XG59XG5cbi8qKlxuICogRW5kIG9mIENNYXJrZXJXaW5kb3cgY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxuXG4vKipcbiAqIEZyYW1lTWFuYWdlciBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEpTRnJhbWUobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgcGFyZW50RWxlbWVudCA9IG51bGw7XG5cbiAgLy8gRnJhbWVzIHdpbGwgYmUgZml4ZWQoRnJhbWVzIGtlZXAgc3RheWluZyBpbiB0aGUgc2FtZSBwbGFjZSkgZXZlbiBpZiB0aGUgdXNlciBzY3JvbGxzIHRoZSBicm93c2VyLlxuICBtZS5pc1dpbmRvd01hbmFnZXJGaXhlZCA9IHRydWU7IC8vZGVmYXVsdCBpcyB0cnVlLlxuXG4gIC8vSW5pdGlhbGl6YXRpb24gcGFyYW1ldGVyIGNoZWNrXG5cbiAgaWYgKG1vZGVsICYmIG1vZGVsLmZpeGVkID09IGZhbHNlKSB7XG4gICAgbWUuaXNXaW5kb3dNYW5hZ2VyRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgcGFyZW50RWxlbWVudCA9IG1vZGVsLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBtZS5oQWxpZ24gPSBcImxlZnRcIjtcbiAgbWUudkFsaWduID0gXCJ0b3BcIjtcblxuICBpZiAobW9kZWwgJiYgbW9kZWwuaG9yaXpvbnRhbEFsaWduKSB7XG4gICAgbWUuaEFsaWduID0gbW9kZWwuaG9yaXpvbnRhbEFsaWduO1xuICB9XG5cbiAgaWYgKG1vZGVsICYmIG1vZGVsLnZlcnRpY2FsQWxpZ24pIHtcbiAgICBtZS52QWxpZ24gPSBtb2RlbC52ZXJ0aWNhbEFsaWduO1xuICB9XG5cbiAgbWUucHVsbFRvUmVmcmVzaCA9IGZhbHNlO1xuICBpZiAobW9kZWwgJiYgdHlwZW9mIG1vZGVsLnB1bGxUb1JlZnJlc2ggPT09IFwiYm9vbGVhblwiKSB7XG4gICAgbWUucHVsbFRvUmVmcmVzaCA9IG1vZGVsLnB1bGxUb1JlZnJlc2g7XG4gIH1cblxuICBtZS50b3VjaEFjdGlvbk1hbmlwdWxhdGlvbiA9IHRydWU7XG4gIGlmIChtb2RlbCAmJiB0eXBlb2YgbW9kZWwudG91Y2hBY3Rpb25NYW5pcHVsYXRpb24gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgbWUudG91Y2hBY3Rpb25NYW5pcHVsYXRpb24gPSBtb2RlbC50b3VjaEFjdGlvbk1hbmlwdWxhdGlvbjtcbiAgfVxuXG4gIGlmICghcGFyZW50RWxlbWVudCkge1xuICAgIGlmIChtZS5pc1dpbmRvd01hbmFnZXJGaXhlZCkge1xuICAgICAgdmFyIHRvcFBhcmVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0b3BQYXJlbnREaXYuaWQgPSBcImpzRnJhbWVfZml4ZWRfXCIgKyBtZS5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgIHRvcFBhcmVudERpdi5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwic3R5bGVcIixcbiAgICAgICAgXCJwb3NpdGlvbjpmaXhlZDtcIiArIG1lLmhBbGlnbiArIFwiOjBweDtcIiArIG1lLnZBbGlnbiArXG4gICAgICAgICAgXCI6MHB4O21hcmdpbjowcHg7cGFkZGluZzowcHg7XCIsXG4gICAgICApO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b3BQYXJlbnREaXYpO1xuICAgICAgcGFyZW50RWxlbWVudCA9IHRvcFBhcmVudERpdjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRvcFBhcmVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0b3BQYXJlbnREaXYuaWQgPSBcImpzRnJhbWVfYWJzb2x1dGVfXCIgKyBtZS5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgIHRvcFBhcmVudERpdi5zZXRBdHRyaWJ1dGUoXG4gICAgICAgIFwic3R5bGVcIixcbiAgICAgICAgXCJwb3NpdGlvbjphYnNvbHV0ZTtcIiArIG1lLmhBbGlnbiArIFwiOjBweDtcIiArIG1lLnZBbGlnbiArXG4gICAgICAgICAgXCI6MHB4O21hcmdpbjowcHg7cGFkZGluZzowcHg7XCIsXG4gICAgICApO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b3BQYXJlbnREaXYpO1xuICAgICAgcGFyZW50RWxlbWVudCA9IHRvcFBhcmVudERpdjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG1lLmlzV2luZG93TWFuYWdlckZpeGVkKSB7XG4gICAgICAvL3BhcmVudEVsZW1lbnQgc2V0XG4gICAgICB2YXIgdG9wUGFyZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvcFBhcmVudERpdi5pZCA9IFwianNGcmFtZV9maXhlZF9cIiArIG1lLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgdG9wUGFyZW50RGl2LnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJzdHlsZVwiLFxuICAgICAgICBcInBvc2l0aW9uOmZpeGVkO1wiICsgbWUuaEFsaWduICsgXCI6MHB4O1wiICsgbWUudkFsaWduICtcbiAgICAgICAgICBcIjowcHg7bWFyZ2luOjBweDtwYWRkaW5nOjBweDtcIixcbiAgICAgICk7XG4gICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRvcFBhcmVudERpdik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0b3BQYXJlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9wUGFyZW50RGl2LmlkID0gXCJqc0ZyYW1lX2Fic29sdXRlX1wiICsgbWUuZ2VuZXJhdGVVVUlEKCk7XG4gICAgICB0b3BQYXJlbnREaXYuc2V0QXR0cmlidXRlKFxuICAgICAgICBcInN0eWxlXCIsXG4gICAgICAgIFwicG9zaXRpb246YWJzb2x1dGU7XCIgKyBtZS5oQWxpZ24gKyBcIjowcHg7XCIgKyBtZS52QWxpZ24gK1xuICAgICAgICAgIFwiOjBweDttYXJnaW46MHB4O3BhZGRpbmc6MHB4O1wiLFxuICAgICAgKTtcbiAgICAgIHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodG9wUGFyZW50RGl2KTtcbiAgICB9XG4gIH1cblxuICBpZiAoTU9VU0VfRU5BQkxFRCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlKTtcbiAgfVxuXG4gIGlmIChUT1VDSF9FTkFCTEVEKSB7XG4gICAgaWYgKFwib250b3VjaGVuZFwiIGluIHdpbmRvdykge1xuICAgICAgdmFyIGZ1bmNPblRvdWNoRW5kID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBUaGUgXCJtb3VzZXVwXCIgZXZlbnQgaGFwcGVucyByaWdodCBhZnRlciBcInRvdWNoZW5kXCIgZXZlbnQsXG4gICAgICAgIC8vIGJ1dCBJIGRvbid0IGNhbGwgI3ByZXZlbnRkZWZhdWx0IGJlY2F1c2UgI3ByZXZlbnRkZWZhdWx0IHByZXZlbnRzIFwib25jbGlja1wiLlxuICAgICAgICAvLyBTbywgcGVyZm9ybSAjcHJldmVudGRlZmF1bHQgb25seSBmb3IgXCJ0b3VjaG1vdmVcIlxuICAgICAgICAvLyBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbW91c2VVcC5iaW5kKHRoaXMpKGV2dCk7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGZ1bmNPblRvdWNoRW5kKTtcbiAgICB9XG5cbiAgICBpZiAoXCJvbnRvdWNobW92ZVwiIGluIHdpbmRvdykge1xuICAgICAgLy8gVG8gcmVtb3ZlIHRoZSAzMDBtcyB0YXAgZGVsYXkgYmV0d2VlbiB0b3VjaGVuZCBhbmQgY2xpY2ssXG4gICAgICAvLyBUbyBkaXNhYmxlIGRvdWJsZS10YXAgdG8gem9vbVxuICAgICAgaWYgKG1lLnRvdWNoQWN0aW9uTWFuaXB1bGF0aW9uKSB7XG4gICAgICAgIG1lLmRvRW5hYmxlVG91Y2hBY3Rpb25NYW5pcHVsYXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtZS5wdWxsVG9SZWZyZXNoKSB7XG4gICAgICAgIC8vIFRoZSBBbmRyb2lkIHZlcnNpb24gb2YgQ2hyb21lIGhhcyBhIGZlYXR1cmUgdGhhdCByZWZyZXNoZXMgdGhlIHBhZ2UgYnkgc2xpZGluZyBkb3dud2FyZFxuICAgICAgICAvLyB3aGlsZSB0b3VjaGluZyBvbiB0aGUgc2NyZWVuLCBidXQgd2hlbiB0aGlzIGZlYXR1cmUgaXMgZW5hYmxlZCwgdGhlIGRvd253YXJkIG1vdmVtZW50IG9mIHRoZSB3aW5kb3cgaXMgaW5oaWJpdGVkLFxuICAgICAgICAvLyBzbyB0aGlzIGZlYXR1cmUgY2FuIGJlIGV4cGxpY2l0bHkgdHVybmVkIG9mZi5cbiAgICAgICAgbWUuZG9EaXNhYmxlUHVsbFRvUmVmcmVzaCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZnVuY09uVG91Y2hNb3ZlID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAvLyBDYWxsICNwcmV2ZW50RGVmYXVsdCB0byBwcmV2ZW50IHNpbXVsdGFuZW91cyBpZ25pdGlvbiBvZiBtb3VzZW1vdmVcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG1vdXNlTW92ZS5iaW5kKHRoaXMpKGV2dCk7XG4gICAgICB9O1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBmdW5jT25Ub3VjaE1vdmUpO1xuICAgIH1cbiAgfVxuXG4gIG1lLndpbmRvd01hbmFnZXIgPSBuZXcgQ1dpbmRvd01hbmFnZXIoXG4gICAgcGFyZW50RWxlbWVudCxcbiAgICBcIndpbmRvd01hbmFnZXJfXCIgKyBtZS5nZW5lcmF0ZVVVSUQoKSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICApO1xuICAvL21lLndpbmRvd01hbmFnZXIgPSBuZXcgQ1dpbmRvd01hbmFnZXIoZG9jdW1lbnQuYm9keSwgJ3dpbmRvd01hbmFnZXJfJyArIG1lLmdlbmVyYXRlVVVJRCgpLCAwLCAwLCAwLCAwKTtcbiAgbWUuZG9tUGFydHNCdWlsZGVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBtb3VzZVVwKGUpIHtcbiAgICBtZS53aW5kb3dNYW5hZ2VyLndpbmRvd01vdXNlVXAoZSk7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZU1vdmUoZSkge1xuICAgIG1lLndpbmRvd01hbmFnZXIud2luZG93TW91c2VNb3ZlKGUpO1xuICB9XG59XG5cbkpTRnJhbWUucHJvdG90eXBlLmRvRW5hYmxlVG91Y2hBY3Rpb25NYW5pcHVsYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBib2R5U3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwic3R5bGVcIik7XG4gIGlmICghYm9keVN0eWxlKSB7XG4gICAgYm9keVN0eWxlID0gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWJvZHlTdHlsZS5lbmRzV2l0aChcIjtcIikpIHtcbiAgICAgIGJvZHlTdHlsZSArPSBcIjtcIjtcbiAgICB9XG4gIH1cbiAgaWYgKGJvZHlTdHlsZS5pbmRleE9mKFwidG91Y2gtYWN0aW9uXCIpID09PSAtMSkge1xuICAgIGJvZHlTdHlsZSArPSBcIi1tcy10b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjt0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcIjtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgYm9keVN0eWxlKTtcbiAgfVxufTtcblxuSlNGcmFtZS5wcm90b3R5cGUuZG9EaXNhYmxlUHVsbFRvUmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKFwic3R5bGVcIik7XG4gIGlmICghYm9keVN0eWxlKSB7XG4gICAgYm9keVN0eWxlID0gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWJvZHlTdHlsZS5lbmRzV2l0aChcIjtcIikpIHtcbiAgICAgIGJvZHlTdHlsZSArPSBcIjtcIjtcbiAgICB9XG4gIH1cbiAgaWYgKGJvZHlTdHlsZS5pbmRleE9mKFwib3ZlcnNjcm9sbC1iZWhhdmlvci15XCIpID09PSAtMSkge1xuICAgIGJvZHlTdHlsZSArPSBcIm92ZXJzY3JvbGwtYmVoYXZpb3IteTogY29udGFpbjtcIjtcbiAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGJvZHlTdHlsZSk7XG4gIH1cbn07XG5KU0ZyYW1lLnByb3RvdHlwZS5nZXREb21QYXJ0c0J1aWxkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKCFtZS5kb21QYXJ0c0J1aWxkZXIpIHtcbiAgICBtZS5kb21QYXJ0c0J1aWxkZXIgPSBuZXcgQ0RvbVBhcnRzQnVpbGRlcigpO1xuICB9XG4gIHJldHVybiBtZS5kb21QYXJ0c0J1aWxkZXI7XG59O1xuXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgcHJvcGVydGllcyA9IHt9O1xuICBwcm9wZXJ0aWVzLm5hbWUgPSBtb2RlbC5uYW1lO1xuICB2YXIgdGl0bGUgPSBtb2RlbC50aXRsZTtcbiAgdmFyIGxlZnQgPSBtb2RlbC5sZWZ0O1xuICB2YXIgdG9wID0gbW9kZWwudG9wO1xuICB2YXIgd2lkdGggPSBtb2RlbC53aWR0aDtcbiAgdmFyIGhlaWdodCA9IG1vZGVsLmhlaWdodDtcbiAgdmFyIGFwcGVhcmFuY2UgPSBtb2RlbC5hcHBlYXJhbmNlO1xuICB2YXIgcHJlc2V0V2luZG93TmFtZSA9IG1vZGVsLnByZXNldDtcbiAgdmFyIHByZXNldFdpbmRvd1BhcmFtID0gbW9kZWwucHJlc2V0UGFyYW07XG4gIHZhciBhcHBlYXJhbmNlTmFtZSA9IG1vZGVsLmFwcGVhcmFuY2VOYW1lO1xuICB2YXIgYXBwZWFyYW5jZVBhcmFtID0gbW9kZWwuYXBwZWFyYW5jZVBhcmFtO1xuICB2YXIgc3R5bGUgPSBtb2RlbC5zdHlsZTtcblxuICB2YXIgbWluV2lkdGggPSBtb2RlbC5taW5XaWR0aDtcbiAgdmFyIG1pbkhlaWdodCA9IG1vZGVsLm1pbkhlaWdodDtcblxuICB2YXIgaHRtbCA9IG1vZGVsLmh0bWw7XG4gIHZhciByZXNpemFibGUgPSBtb2RlbC5yZXNpemFibGU7XG4gIHZhciBtb3ZhYmxlID0gbW9kZWwubW92YWJsZTtcbiAgdmFyIHVybCA9IG1vZGVsLnVybDtcbiAgdmFyIHVybExvYWRlZCA9IG1vZGVsLnVybExvYWRlZDtcblxuICB2YXIgcHJlc2V0UGFyYW0gPSBtb2RlbC5wcmVzZXRQYXJhbTtcbiAgdmFyIHByZXNldFdpbmRvdztcblxuICBpZiAocHJlc2V0V2luZG93TmFtZSkge1xuICAgIHZhciBwcmVzZXRXaW5kb3dPYmogPSB0aGlzLmdldFByZXNldFdpbmRvdyhwcmVzZXRXaW5kb3dOYW1lKTtcbiAgICBwcmVzZXRXaW5kb3cgPSBwcmVzZXRXaW5kb3dPYmouZ2V0UHJlc2V0V2luZG93KHByZXNldFBhcmFtKTtcbiAgICBhcHBlYXJhbmNlID0gdGhpcy5jcmVhdGVQcmVzZXRTdHlsZShcbiAgICAgIHByZXNldFdpbmRvdy5hcHBlYXJhbmNlTmFtZSxcbiAgICAgIHsgYXBwZWFyYW5jZVBhcmFtOiBwcmVzZXRXaW5kb3cuYXBwZWFyYW5jZVBhcmFtIH0sXG4gICAgKTtcbiAgfSBlbHNlIGlmIChhcHBlYXJhbmNlTmFtZSkge1xuICAgIGFwcGVhcmFuY2UgPSB0aGlzLmNyZWF0ZVByZXNldFN0eWxlKFxuICAgICAgYXBwZWFyYW5jZU5hbWUsXG4gICAgICB7IGFwcGVhcmFuY2VQYXJhbTogYXBwZWFyYW5jZVBhcmFtIH0sXG4gICAgKTtcbiAgfVxuXG4gIGlmIChtb2RlbC5jbGllbnRIZWlnaHQpIHtcbiAgICB2YXIgd2luZG93VGl0bGVCYXJIZWlnaHQgPSBwYXJzZUludChhcHBlYXJhbmNlLnRpdGxlQmFySGVpZ2h0IHx8IDApIC1cbiAgICAgIGFwcGVhcmFuY2UuZnJhbWVIZWlnaHRBZGp1c3Q7XG4gICAgaGVpZ2h0ID0gbW9kZWwuY2xpZW50SGVpZ2h0ICsgd2luZG93VGl0bGVCYXJIZWlnaHQ7XG4gIH1cblxuICB2YXIgZnJhbWUgPSB0aGlzLmNyZWF0ZUZyYW1lKFxuICAgIGxlZnQsXG4gICAgdG9wLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBhcHBlYXJhbmNlLFxuICAgIHByb3BlcnRpZXMsXG4gICk7XG5cbiAgaWYgKHRpdGxlKSB7XG4gICAgZnJhbWUuc2V0VGl0bGUodGl0bGUpO1xuICB9XG5cbiAgaWYgKGh0bWwpIHtcbiAgICBmcmFtZS5zZXRIVE1MKGh0bWwpO1xuICB9XG4gIGlmICh1cmwpIHtcbiAgICB2YXIgdXJsUHJvbWlzZSA9IGZyYW1lLnNldFVybCh1cmwpO1xuICAgIGlmICh1cmxMb2FkZWQpIHtcbiAgICAgIHVybFByb21pc2UudGhlbih1cmxMb2FkZWQpO1xuICAgIH1cbiAgfVxuICBpZiAocmVzaXphYmxlID09IGZhbHNlKSB7XG4gICAgZnJhbWUuc2V0UmVzaXphYmxlKGZhbHNlKTtcbiAgfVxuICBpZiAobW92YWJsZSA9PSBmYWxzZSkge1xuICAgIGZyYW1lLnNldE1vdmFibGUoZmFsc2UpO1xuICB9XG5cbiAgaWYgKG1pbldpZHRoICYmIG1pbkhlaWdodCkge1xuICAgIGZyYW1lLm1pbkZyYW1lV2lkdGggPSBtaW5XaWR0aDtcbiAgfVxuICBpZiAobWluSGVpZ2h0KSB7XG4gICAgZnJhbWUubWluV2luZG93SGVpZ2h0ID0gbWluSGVpZ2h0O1xuXG4gICAgaWYgKG1vZGVsLmNsaWVudEhlaWdodCkge1xuICAgICAgZnJhbWUubWluV2luZG93SGVpZ2h0ID0gbWluSGVpZ2h0ICsgd2luZG93VGl0bGVCYXJIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgdmFyIGZyYW1lVmlldyA9IGZyYW1lLmdldEZyYW1lVmlldygpO1xuXG4gICAgZm9yICh2YXIgbmFtZSBpbiBzdHlsZSkge1xuICAgICAgaWYgKHN0eWxlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGZyYW1lVmlldy5zdHlsZVtuYW1lXSA9IHN0eWxlW25hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChwcmVzZXRXaW5kb3cpIHtcbiAgICBwcmVzZXRXaW5kb3cuc2V0dXBQcmVzZXRXaW5kb3coZnJhbWUpO1xuICB9XG5cbiAgcmV0dXJuIGZyYW1lO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgd2luZG93XG4gKlxuICogQHJldHVybnMge0NJZkZyYW1lfVxuICovXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGVGcmFtZSA9IGZ1bmN0aW9uIChcbiAgbGVmdCxcbiAgdG9wLFxuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICBhcHBlYXJhbmNlLFxuICBwcm9wZXJ0aWVzLFxuKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKCFhcHBlYXJhbmNlKSB7XG4gICAgYXBwZWFyYW5jZSA9IG1lLmNyZWF0ZUZyYW1lQXBwZWFyYW5jZSgpO1xuICB9XG5cbiAgYXBwZWFyYW5jZS5pbml0aWFsaXplKCk7XG5cbiAgdmFyIHdpbmRvd0lkID0gXCJ3aW5kb3dfXCIgKyBtZS5nZW5lcmF0ZVVVSUQoKTtcblxuICBpZiAoIWxlZnQpIHtcbiAgICBsZWZ0ID0gMDtcbiAgfVxuICBpZiAoIXRvcCkge1xuICAgIHRvcCA9IDA7XG4gIH1cbiAgaWYgKCF3aWR0aCkge1xuICAgIHdpZHRoID0gMTI4O1xuICB9XG4gIGlmICghaGVpZ2h0KSB7XG4gICAgaGVpZ2h0ID0gMTI4O1xuICB9XG5cbiAgdmFyIGZyYW1lID0gbmV3IENJZkZyYW1lKHdpbmRvd0lkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIGFwcGVhcmFuY2UpO1xuXG4gIC8vZXhwZXJpbWVudGFsXG4gIGZyYW1lLmpzRnJhbWUgPSBtZTtcblxuICBpZiAocHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLm5hbWUpIHtcbiAgICBmcmFtZS5zZXROYW1lKHByb3BlcnRpZXMubmFtZSk7XG4gIH1cbiAgZnJhbWUuaGlkZSgpO1xuXG4gIG1lLndpbmRvd01hbmFnZXIuYWRkV2luZG93KGZyYW1lKTtcblxuICAvLyBnZXRUaXRsZUJhclN0eWxlIGlzIGRlcHJlY2F0ZWRcbiAgaWYgKGFwcGVhcmFuY2UuZ2V0VGl0bGVCYXJTdHlsZSkge1xuICAgIHZhciB0aXRsZUJhclN0eWxlID0gYXBwZWFyYW5jZS5nZXRUaXRsZUJhclN0eWxlKCk7XG4gICAgaWYgKHRpdGxlQmFyU3R5bGUpIHtcbiAgICAgIGZyYW1lLnNldFRpdGxlQmFyQ2xhc3NOYW1lKFxuICAgICAgICB0aXRsZUJhclN0eWxlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCxcbiAgICAgICAgdGl0bGVCYXJTdHlsZS50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQsXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcbiAgICBhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCAmJiBhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZFxuICApIHtcbiAgICBmcmFtZS5zZXRUaXRsZUJhckNsYXNzTmFtZShcbiAgICAgIGFwcGVhcmFuY2UudGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0LFxuICAgICAgYXBwZWFyYW5jZS50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQsXG4gICAgKTtcbiAgfSBlbHNlIGlmIChhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCkge1xuICAgIGZyYW1lLnNldFRpdGxlQmFyQ2xhc3NOYW1lKFxuICAgICAgYXBwZWFyYW5jZS50aXRsZUJhckNsYXNzTmFtZURlZmF1bHQsXG4gICAgICBhcHBlYXJhbmNlLnRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdCxcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGZyYW1lO1xufTtcblxuSlNGcmFtZS5wcm90b3R5cGUuY29udGFpbnNXaW5kb3dOYW1lID0gZnVuY3Rpb24gKHdpbmRvd05hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLndpbmRvd01hbmFnZXIuY29udGFpbnNXaW5kb3dOYW1lKHdpbmRvd05hbWUpO1xufTtcblxuSlNGcmFtZS5wcm90b3R5cGUuZ2V0V2luZG93QnlOYW1lID0gZnVuY3Rpb24gKHdpbmRvd05hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLndpbmRvd01hbmFnZXIuZ2V0V2luZG93QnlOYW1lKHdpbmRvd05hbWUpO1xufTtcblxuSlNGcmFtZS5wcm90b3R5cGUuZ2VuZXJhdGVVVUlEID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdW5peFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gIHZhciB1dWlkID0gXCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKFxuICAgIC9beHldL2csXG4gICAgZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciByID0gKHVuaXhUaW1lICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgIHVuaXhUaW1lID0gTWF0aC5mbG9vcih1bml4VGltZSAvIDE2KTtcbiAgICAgIHJldHVybiAoYyA9PSBcInhcIiA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcbiAgICB9LFxuICApO1xuICByZXR1cm4gdXVpZDtcbn07XG5cbkpTRnJhbWUucHJvdG90eXBlLmNyZWF0ZUZyYW1lQXBwZWFyYW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBDRnJhbWVBcHBlYXJhbmNlKCk7XG59O1xuXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGVBbmltYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBDU2ltcGxlTGF5b3V0QW5pbWF0b3IoKTtcbn07XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciBtYXhpbWl6aW5nIGFuZCBtaW5pbWl6aW5nIHdpbmRvd3MoZnJhbWVzKSBhbmQgaGFuZGxpbmcgYW5pbWF0aW9ucyBhY2NvcmRpbmdseVxuICovXG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGVXaW5kb3dFdmVudEhlbHBlciA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmICghbW9kZWwpIHtcbiAgICBtb2RlbCA9IHt9O1xuICB9XG5cbiAgbW9kZWwudmVydGljYWxBbGlnbiA9IG1lLnZBbGlnbjtcbiAgbW9kZWwuaG9yaXpvbnRhbEFsaWduID0gbWUuaEFsaWduO1xuXG4gIHZhciB3bmRFdmVudEhlbHBlciA9IG5ldyBXaW5kb3dFdmVudEhlbHBlcihtb2RlbCk7XG4gIHJldHVybiB3bmRFdmVudEhlbHBlcjtcbn07XG5cbkpTRnJhbWUucHJvdG90eXBlLmdldFByZXNldFdpbmRvdyA9IGZ1bmN0aW9uIChwcmVzZXROYW1lLCBwYXJhbSkge1xuICBpZiAocHJlc2V0V2luZG93c1twcmVzZXROYW1lXSkge1xuICAgIHZhciBwcmVzZXRPYmogPSBwcmVzZXRXaW5kb3dzW3ByZXNldE5hbWVdO1xuICAgIHJldHVybiBwcmVzZXRPYmo7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5KU0ZyYW1lLnByb3RvdHlwZS5jcmVhdGVQcmVzZXRTdHlsZSA9IGZ1bmN0aW9uIChwcmVzZXROYW1lLCBwYXJhbSkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgYXByID0gbWUuY3JlYXRlRnJhbWVBcHBlYXJhbmNlKCk7XG4gIGlmIChwYXJhbSAmJiBwYXJhbS5mb2N1c2VkRnJhbWVPbmx5KSB7XG4gICAgYXByLmZvY3VzZWRGcmFtZU9ubHkgPSBwYXJhbS5mb2N1c2VkRnJhbWVPbmx5O1xuICB9XG5cbiAgaWYgKHByZXNldFN0eWxlc1twcmVzZXROYW1lXSkge1xuICAgIHZhciBzdHlsZU9iaiA9IHByZXNldFN0eWxlc1twcmVzZXROYW1lXTtcbiAgICB2YXIgYXBwZWFyYW5jZVBhcmFtID0gbnVsbDtcblxuICAgIGlmIChwYXJhbSAmJiBwYXJhbS5hcHBlYXJhbmNlUGFyYW0pIHtcbiAgICAgIGFwcGVhcmFuY2VQYXJhbSA9IHBhcmFtLmFwcGVhcmFuY2VQYXJhbTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVPYmouZ2V0U3R5bGUoYXByLCBhcHBlYXJhbmNlUGFyYW0pO1xuICB9XG5cbiAgY29uc29sZS5lcnJvcignW0pTRnJhbWVdIFByZXNldCBhcHBlYXJhbmNlIFwiJyArIHByZXNldE5hbWUgKyAnXCIgbm90IGZvdW5kLicpO1xuICByZXR1cm4gYXByO1xufTtcblxuSlNGcmFtZS5wcm90b3R5cGUuc2hvd1RvYXN0ID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gIGlmICghbW9kZWwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgdG9hc3RIZWlnaHQgPSA2MDtcbiAgdmFyIHRvYXN0V2lkdGggPSAyNjA7XG4gIHZhciBvcGVuQ2xvc2VEdXJhdGlvbk1zID0gMzAwO1xuICB2YXIgc3RheUR1cmF0aW9uTXMgPSAxMDAwO1xuICB2YXIgc3RhcnRZID0gd2luZG93LmlubmVySGVpZ2h0IC0gMTAgLSB0b2FzdEhlaWdodCAvIDI7XG4gIHZhciBlbmRZID0gd2luZG93LmlubmVySGVpZ2h0IC0gMjAgLSB0b2FzdEhlaWdodCAvIDI7XG4gIHZhciBteUh0bWwgPSBcIlwiO1xuICB2YXIgc2hvd0J1dHRvbiA9IGZhbHNlO1xuICB2YXIgc3R5bGUgPSB7XG4gICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC44KVwiLFxuICB9O1xuXG4gIGlmIChtb2RlbC5zdHlsZSkge1xuICAgIHN0eWxlID0gbW9kZWwuc3R5bGU7XG4gIH1cbiAgaWYgKG1vZGVsLmhlaWdodCkge1xuICAgIHRvYXN0SGVpZ2h0ID0gbW9kZWwuaGVpZ2h0O1xuICB9XG4gIGlmIChtb2RlbC53aWR0aCkge1xuICAgIHRvYXN0V2lkdGggPSBtb2RlbC53aWR0aDtcbiAgfVxuICBpZiAobW9kZWwuZHVyYXRpb24pIHtcbiAgICBzdGF5RHVyYXRpb25NcyA9IG1vZGVsLmR1cmF0aW9uO1xuICB9XG4gIGlmIChtb2RlbC5hbGlnbikge1xuICAgIGlmIChtb2RlbC5hbGlnbiA9PSBcInRvcFwiKSB7XG4gICAgICBzdGFydFkgPSAxMCArIHRvYXN0SGVpZ2h0IC8gMjtcbiAgICAgIGVuZFkgPSAyMCArIHRvYXN0SGVpZ2h0IC8gMjtcbiAgICB9IGVsc2UgaWYgKG1vZGVsLmFsaWduID09IFwiY2VudGVyXCIpIHtcbiAgICAgIHN0YXJ0WSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG4gICAgICBlbmRZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9ib3R0b21cbiAgICB9XG4gIH1cbiAgaWYgKG1vZGVsLmh0bWwpIHtcbiAgICBteUh0bWwgPSBtb2RlbC5odG1sO1xuICB9XG4gIGlmIChtb2RlbC50ZXh0KSB7XG4gICAgbXlIdG1sID0gbW9kZWwudGV4dDtcbiAgfVxuICBpZiAobW9kZWwuY2xvc2VCdXR0b24gPT0gdHJ1ZSkge1xuICAgIHNob3dCdXR0b24gPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHNob3dCdXR0b24gPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBhcHIgPSBtZS5jcmVhdGVQcmVzZXRTdHlsZShcInRvYXN0XCIpO1xuXG4gIGlmIChzdHlsZS5ib3JkZXJSYWRpdXMpIHtcbiAgICBhcHIuZnJhbWVCb3JkZXJSYWRpdXMgPSBzdHlsZS5ib3JkZXJSYWRpdXM7XG4gIH1cblxuICBpZiAobW9kZWwuY2xvc2VCdXR0b25Db2xvcikge1xuICAgIGFwci5jYXB0aW9uQ2xvciA9IG1vZGVsLmNsb3NlQnV0dG9uQ29sb3I7XG4gIH1cblxuICB2YXIgZnJhbWUgPSBtZS5jcmVhdGUoe1xuICAgIG5hbWU6IFwidG9hc3RfXCIgKyBtZS5nZW5lcmF0ZVVVSUQoKSxcbiAgICB3aWR0aDogdG9hc3RXaWR0aCxcbiAgICBoZWlnaHQ6IHRvYXN0SGVpZ2h0LFxuICAgIG1vdmFibGU6IGZhbHNlLFxuICAgIHJlc2l6YWJsZTogZmFsc2UsXG4gICAgYXBwZWFyYW5jZTogYXByLFxuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBodG1sOlxuICAgICAgJzxkaXYgaWQ9XCJteV9lbGVtZW50XCIgc3R5bGU9XCJib3gtc2l6aW5nOmJvcmRlci1ib3g7ZGlzcGxheTogZmxleDtqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjthbGlnbi1pdGVtczogY2VudGVyO3BhZGRpbmc6MTBweDtmb250LXNpemU6MTZweDtjb2xvcjpkYXJrZ3JheTtoZWlnaHQ6JyArXG4gICAgICAodG9hc3RIZWlnaHQpICsgJ3B4XCI+JyArXG4gICAgICBteUh0bWwgK1xuICAgICAgXCI8L2Rpdj5cIixcbiAgfSk7XG5cbiAgaWYgKHNob3dCdXR0b24pIHtcbiAgfSBlbHNlIHtcbiAgICBmcmFtZS5oaWRlRnJhbWVDb21wb25lbnQoXCJjbG9zZUJ1dHRvblwiKTtcbiAgfVxuXG4gIHZhciByZXF1ZXN0Rm9jdXNBZnRlckFuaW1hdGlvbiA9IGZhbHNlO1xuXG4gIHZhciBzdGFydFggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG5cbiAgaWYgKG1lLmhBbGlnbiA9PSBcInJpZ2h0XCIpIHtcbiAgICBzdGFydFggPSAtc3RhcnRYOyAvLyAtNTAwO1xuICB9XG5cbiAgaWYgKG1lLnZBbGlnbiA9PSBcImJvdHRvbVwiKSB7XG4gICAgc3RhcnRZID0gc3RhcnRZIC0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGVuZFkgPSBlbmRZIC0gd2luZG93LmlubmVySGVpZ2h0O1xuICB9XG5cbiAgdmFyIGFuaW1hdG9yID0gbWUuY3JlYXRlQW5pbWF0b3IoKTtcbiAgYW5pbWF0b3Iuc2V0KGZyYW1lKVxuICAgIC5zZXREdXJhdGlvbihvcGVuQ2xvc2VEdXJhdGlvbk1zKVxuICAgIC5mcm9tUG9zaXRpb24oc3RhcnRYLCBzdGFydFksIFwiQ0VOVEVSX0NFTlRFUlwiKVxuICAgIC50b1Bvc2l0aW9uKHN0YXJ0WCwgZW5kWSwgXCJDRU5URVJfQ0VOVEVSXCIpXG4gICAgLnRvQWxwaGEoMS4wKVxuICAgIC5mcm9tQWxwaGEoMC4wKVxuICAgIC5zdGFydCgwLCByZXF1ZXN0Rm9jdXNBZnRlckFuaW1hdGlvbilcbiAgICAudGhlbihmdW5jdGlvbiAoYW5pbWF0b3JPYmopIHtcbiAgICAgIHJldHVybiBhbmltYXRvck9ialxuICAgICAgICAuc2V0RHVyYXRpb24ob3BlbkNsb3NlRHVyYXRpb25NcylcbiAgICAgICAgLmZyb21Qb3NpdGlvbihzdGFydFgsIGVuZFksIFwiQ0VOVEVSX0NFTlRFUlwiKVxuICAgICAgICAudG9Qb3NpdGlvbihzdGFydFgsIHN0YXJ0WSwgXCJDRU5URVJfQ0VOVEVSXCIpXG4gICAgICAgIC5mcm9tQWxwaGEoMS4wKVxuICAgICAgICAudG9BbHBoYSgwLjUpXG4gICAgICAgIC5zdGFydChzdGF5RHVyYXRpb25NcywgcmVxdWVzdEZvY3VzQWZ0ZXJBbmltYXRpb24pO1xuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKGFuaW1hdG9yT2JqKSB7XG4gICAgICB2YXIgX2ZyYW1lID0gYW5pbWF0b3JPYmouZ2V0KCk7XG4gICAgICBfZnJhbWUuY2xvc2VGcmFtZSgpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBlbmQgb2YgRnJhbWVNYW5hZ2VyIGNsYXNzXG4gKi9cblxuT2JqZWN0LmZyZWV6ZShERUYpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEpTRnJhbWU7XG4iLCJmdW5jdGlvbiBDVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKSB7XG4gIHZhciBjcm9zc01hcmswID0gXCJcXHUyNzRjXCI7XG5cbiAgdGhpcy5zaXplID0gMTQ7XG4gIHRoaXMud2lkdGggPSBudWxsO1xuICB0aGlzLmhlaWdodCA9IG51bGw7XG5cbiAgLy9ib3JkZXJcbiAgdGhpcy5ib3JkZXJSYWRpdXMgPSAyO1xuICB0aGlzLmJvcmRlcldpZHRoID0gMDtcbiAgdGhpcy5ib3JkZXJDb2xvckRlZmF1bHQgPSBcIiNhYWFhYWFcIjtcbiAgdGhpcy5ib3JkZXJDb2xvckZvY3VzZWQgPSB0aGlzLmJvcmRlckNvbG9yRGVmYXVsdDtcbiAgdGhpcy5ib3JkZXJDb2xvckhvdmVyZWQgPSBudWxsO1xuICB0aGlzLmJvcmRlckNvbG9yUHJlc3NlZCA9IHRoaXMuYm9yZGVyQ29sb3JEZWZhdWx0O1xuXG4gIHRoaXMuYm9yZGVyU3R5bGVEZWZhdWx0ID0gXCJzb2xpZFwiO1xuICB0aGlzLmJvcmRlclN0eWxlRm9jdXNlZCA9IHRoaXMuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICB0aGlzLmJvcmRlclN0eWxlSG92ZXJlZCA9IG51bGw7XG4gIHRoaXMuYm9yZGVyU3R5bGVQcmVzc2VkID0gdGhpcy5ib3JkZXJTdHlsZURlZmF1bHQ7XG5cbiAgdGhpcy5iYWNrZ3JvdW5kQm94U2hhZG93ID0gbnVsbDtcblxuICAvL2JhY2tncm91bmRcbiAgdGhpcy5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gXCJ0cmFuc3BhcmVudFwiO1xuICB0aGlzLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSB0aGlzLmJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG4gIHRoaXMuYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9IG51bGw7XG4gIHRoaXMuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IHRoaXMuYmFja2dyb3VuZENvbG9yRGVmYXVsdDtcblxuICAvL2NhcHRpb25cbiAgdGhpcy5jYXB0aW9uID0gbnVsbDtcbiAgdGhpcy5jYXB0aW9uQ29sb3JEZWZhdWx0ID0gXCJ3aGl0ZVwiO1xuICB0aGlzLmNhcHRpb25Db2xvckZvY3VzZWQgPSB0aGlzLmNhcHRpb25Db2xvckRlZmF1bHQ7XG4gIHRoaXMuY2FwdGlvbkNvbG9ySG92ZXJlZCA9IG51bGw7XG4gIHRoaXMuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IHRoaXMuY2FwdGlvbkNvbG9yRGVmYXVsdDtcbiAgdGhpcy5jYXB0aW9uU2hpZnRZcHggPSAwO1xuICB0aGlzLmNhcHRpb25Gb250UmF0aW8gPSAxLjA7XG59XG5tb2R1bGUuZXhwb3J0cyA9IENUZXh0QnV0dG9uQXBwZWFyYW5jZTtcbiIsImZ1bmN0aW9uIENDaGlsZE1lbnVBcHBlYXJhbmNlKG1vZGVsKSB7XG4gIHRoaXMuY2hpbGRNZW51SFRNTCA9IFwiXCI7XG4gIHRoaXMuY2hpbGRNZW51V2lkdGggPSAwO1xuICB0aGlzLmNoaWxkTWVudUFsaWduID0gXCJMRUZUXCI7IC8vIG9mZiBzZXQgcG9zaXRpb24gZnJvbSBwYXJlbnQgZnJhbWVDb21wb25lbnQgXCJMRUZUXCIgXCJSSUdIVFwiIFwiQ0VOVEVSXCJcbiAgdGhpcy55T2Zmc2V0ID0gMDtcbiAgdGhpcy54T2Zmc2V0ID0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDQ2hpbGRNZW51QXBwZWFyYW5jZTtcbiIsInZhciBtZXJnZURlZXBseSA9IHJlcXVpcmUoXCJtZXJnZS1kZWVwbHlcIik7XG52YXIgQ1RleHRCdXR0b25BcHBlYXJhbmNlID0gcmVxdWlyZShcIi4vQ0J1dHRvbkFwcGVhcmFuY2UuanNcIik7XG52YXIgQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZSA9IHJlcXVpcmUoXCIuL0NJbWFnZUJ1dHRvbkFwcGVhcmFuY2UuanNcIik7XG52YXIgQ0NoaWxkTWVudUFwcGVhcmFuY2UgPSByZXF1aXJlKFwiLi9DQ2hpbGRNZW51QXBwZWFyYW5jZS5qc1wiKTtcblxuLyoqXG4gKiBDRG9tUGFydHNCdWlsZGVyIGNsYXNzXG4gKiBFYXN5IHRvIGJ1aWxkIGEgYmVhdXRpZnVsIG9yIHR5cGljYWwgZG9tIHBhcnRzKGh0bWxFbGVtZW50KVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENEb21QYXJ0c0J1aWxkZXIoKSB7XG59XG5cbkNEb21QYXJ0c0J1aWxkZXIucHJvdG90eXBlLmJ1aWxkQ2hpbGRNZW51QXBwZWFyYW5jZSA9IGZ1bmN0aW9uIChcbiAgZnJhbWVBcHBlYXJhbmNlLFxuKSB7XG4gIHJldHVybiBuZXcgQ0NoaWxkTWVudUFwcGVhcmFuY2UoZnJhbWVBcHBlYXJhbmNlKTtcbn07XG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZFRleHRCdXR0b25BcHBlYXJhbmNlID0gZnVuY3Rpb24gKHNyYykge1xuICBpZiAoc3JjKSB7XG4gICAgdmFyIHJlc3VsdCA9IG1lcmdlRGVlcGx5KHsgb3A6IFwiY2xvbmVcIiwgb2JqZWN0MTogc3JjLCBjb25jYXRBcnJheTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ1RleHRCdXR0b25BcHBlYXJhbmNlKCk7XG4gIH1cbn07XG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZEltYWdlQnV0dG9uQXBwZWFyYW5jZSA9IGZ1bmN0aW9uIChzcmMpIHtcbiAgaWYgKHNyYykge1xuICAgIHZhciBjbG9uZWRJbWFnZUJ1dHRvbkFwcGVhcmFuY2UgPSBtZXJnZURlZXBseShcbiAgICAgIHsgb3A6IFwiY2xvbmVcIiwgb2JqZWN0MTogc3JjIH0sXG4gICAgKTtcbiAgICByZXR1cm4gY2xvbmVkSW1hZ2VCdXR0b25BcHBlYXJhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZSgpO1xuICB9XG59O1xuXG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5idWlsZEJ1dHRvbiA9IGZ1bmN0aW9uIChidG5BcHBlYXJhbmNlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHJldHVybiBtZS5idWlsZFRleHRCdXR0b24oYnRuQXBwZWFyYW5jZSk7XG59O1xuXG5DRG9tUGFydHNCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmRDaGlsZE1lbnVUbyA9IGZ1bmN0aW9uIChcbiAgY2hpbGRNZW51QXBwZWFyYW5jZSxcbiAgcGFyZW50RWxlLFxuKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBuZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmRpdi5jbGFzc0xpc3QuYWRkKFwianNmcmFtZS1jaGlsZC1tZW51XCIpO1xuICBuZGl2LmlubmVySFRNTCA9IGNoaWxkTWVudUFwcGVhcmFuY2UuY2hpbGRNZW51SFRNTDtcbiAgbmRpdi5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgbmRpdi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gIG5kaXYuc3R5bGUud2lkdGggPSBjaGlsZE1lbnVBcHBlYXJhbmNlLmNoaWxkTWVudVdpZHRoICsgXCJweFwiO1xuICAvLyBuZGl2LnN0eWxlLnRvcCA9IGNoaWxkTWVudUFwcGVhcmFuY2UuY2hpbGRNZW51VG9wICsgJ3B4JztcbiAgLy8gbmRpdi5zdHlsZS5sZWZ0ID0gY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVMZWZ0ICsgJ3B4JztcbiAgbmRpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgdmFyIHBvc1ggPSBjaGlsZE1lbnVBcHBlYXJhbmNlLnhPZmZzZXQ7XG4gIHZhciBwb3NZID0gcGFyc2VJbnQocGFyZW50RWxlLnN0eWxlLmhlaWdodCwgMTApICtcbiAgICBjaGlsZE1lbnVBcHBlYXJhbmNlLnlPZmZzZXQgKyAyO1xuXG4gIGlmIChjaGlsZE1lbnVBcHBlYXJhbmNlLmNoaWxkTWVudUFsaWduID09PSBcIkxFRlRcIikge1xuICAgIG5kaXYuc3R5bGUubGVmdCA9IHBvc1ggKyBcInB4XCI7XG4gIH0gZWxzZSBpZiAoY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVBbGlnbiA9PT0gXCJSSUdIVFwiKSB7XG4gICAgbmRpdi5zdHlsZS5yaWdodCA9IHBvc1ggKyBcInB4XCI7XG4gIH0gZWxzZSBpZiAoY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVBbGlnbiA9PT0gXCJDRU5URVJcIikge1xuICAgIHBvc1ggPSAtY2hpbGRNZW51QXBwZWFyYW5jZS5jaGlsZE1lbnVXaWR0aCAvIDIgK1xuICAgICAgcGFyc2VJbnQocGFyZW50RWxlLnN0eWxlLmhlaWdodCwgMTApIC8gMjtcbiAgICBuZGl2LnN0eWxlLmxlZnQgPSBwb3NYICsgXCJweFwiO1xuICB9XG4gIG5kaXYuc3R5bGUudG9wID0gcG9zWSArIFwicHhcIjtcblxuICAvLyBuZGl2LnN0eWxlLnBvaW50ZXJFdmVudHMgaXMgbm9uZSB0byBhdm9pZCByZWZlcnJpbmcgY2xpY2tzIHRvIGV4dHJhIGFyZWFzLlxuICAvLyBCdXQgd2Ugd2FudCBpdHMgY2hpbGRyZW4gdG8gYmUgcmVzcG9uc2l2ZSwgc28gd2Ugc2V0IHBvaW50ZXJFdmVudHMgdG8gYXV0b1xuICBuZGl2LmZpcnN0Q2hpbGQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuXG4gIHBhcmVudEVsZS5hcHBlbmRDaGlsZChuZGl2KTtcbiAgLy9yZXR1cm4gbmRpdjtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhY3R1YWwgRE9NIGVsZW1lbnQgZnJvbSB0aGUgc3BlY2lmaWVkIGFwcGVhcmFuY2VcbiAqIEBwYXJhbSBidG5BcHBlYXJhbmNlXG4gKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9XG4gKi9cbkNEb21QYXJ0c0J1aWxkZXIucHJvdG90eXBlLmJ1aWxkVGV4dEJ1dHRvbiA9IGZ1bmN0aW9uIChidG5BcHBlYXJhbmNlKSB7XG4gIHZhciBzaXplID0gYnRuQXBwZWFyYW5jZS5zaXplO1xuICB2YXIgd2lkdGggPSBzaXplO1xuICB2YXIgaGVpZ2h0ID0gc2l6ZTtcblxuICBpZiAoYnRuQXBwZWFyYW5jZS53aWR0aCAhPSBudWxsKSB7XG4gICAgd2lkdGggPSBidG5BcHBlYXJhbmNlLndpZHRoO1xuICB9XG5cbiAgaWYgKGJ0bkFwcGVhcmFuY2UuaGVpZ2h0ICE9IG51bGwpIHtcbiAgICBoZWlnaHQgPSBidG5BcHBlYXJhbmNlLmhlaWdodDtcbiAgfVxuXG4gIHZhciBkaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAvL2JvcmRlclxuICB2YXIgYm9yZGVyV2lkdGggPSBidG5BcHBlYXJhbmNlLmJvcmRlcldpZHRoO1xuICB2YXIgYm9yZGVyUmFkaXVzID0gYnRuQXBwZWFyYW5jZS5ib3JkZXJSYWRpdXM7XG5cbiAgdmFyIGJvcmRlckNvbG9yRGVmYXVsdCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyQ29sb3JEZWZhdWx0O1xuICB2YXIgYm9yZGVyQ29sb3JGb2N1c2VkID0gYnRuQXBwZWFyYW5jZS5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gIHZhciBib3JkZXJDb2xvckhvdmVyZWQgPSBidG5BcHBlYXJhbmNlLmJvcmRlckNvbG9ySG92ZXJlZDtcbiAgdmFyIGJvcmRlckNvbG9yUHJlc3NlZCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyQ29sb3JQcmVzc2VkO1xuXG4gIHZhciBib3JkZXJTdHlsZURlZmF1bHQgPSBidG5BcHBlYXJhbmNlLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgdmFyIGJvcmRlclN0eWxlRm9jdXNlZCA9IGJ0bkFwcGVhcmFuY2UuYm9yZGVyU3R5bGVGb2N1c2VkO1xuICB2YXIgYm9yZGVyU3R5bGVIb3ZlcmVkID0gYnRuQXBwZWFyYW5jZS5ib3JkZXJTdHlsZUhvdmVyZWQ7XG4gIHZhciBib3JkZXJTdHlsZVByZXNzZWQgPSBidG5BcHBlYXJhbmNlLmJvcmRlclN0eWxlUHJlc3NlZDtcblxuICAvL2JhY2tncm91bmRcbiAgdmFyIGJhY2tncm91bmRDb2xvckRlZmF1bHQgPSBidG5BcHBlYXJhbmNlLmJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG4gIHZhciBiYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gYnRuQXBwZWFyYW5jZS5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkO1xuICB2YXIgYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9IGJ0bkFwcGVhcmFuY2UuYmFja2dyb3VuZENvbG9ySG92ZXJlZDtcbiAgdmFyIGJhY2tncm91bmRDb2xvclByZXNzZWQgPSBidG5BcHBlYXJhbmNlLmJhY2tncm91bmRDb2xvclByZXNzZWQ7XG5cbiAgdmFyIGJhY2tncm91bmRCb3hTaGFkb3cgPSBidG5BcHBlYXJhbmNlLmJhY2tncm91bmRCb3hTaGFkb3c7XG5cbiAgdmFyIGZhID0gYnRuQXBwZWFyYW5jZS5mYTtcblxuICAvL2NhcHRpb25cbiAgdmFyIGNhcHRpb24gPSBidG5BcHBlYXJhbmNlLmNhcHRpb247XG4gIHZhciBidG5JbWFnZURlZmF1bHQgPSBidG5BcHBlYXJhbmNlLmltYWdlRGVmYXVsdDtcbiAgdmFyIGJ0bkltYWdlRm9jdXNlZCA9IGJ0bkFwcGVhcmFuY2UuaW1hZ2VGb2N1c2VkO1xuICB2YXIgYnRuSW1hZ2VIb3ZlcmVkID0gYnRuQXBwZWFyYW5jZS5pbWFnZUhvdmVyZWQ7XG4gIHZhciBidG5JbWFnZVByZXNzZWQgPSBidG5BcHBlYXJhbmNlLmltYWdlUHJlc3NlZDtcblxuICAvL3ByZXZlbnQgdG8gY2F0Y2ggbW91c2UgZXZlbnRzXG4gIGlmIChidG5JbWFnZURlZmF1bHQpIHtcbiAgICBidG5JbWFnZURlZmF1bHQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICB9XG4gIGlmIChidG5JbWFnZUZvY3VzZWQpIHtcbiAgICBidG5JbWFnZUZvY3VzZWQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICB9XG4gIGlmIChidG5JbWFnZUhvdmVyZWQpIHtcbiAgICBidG5JbWFnZUhvdmVyZWQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICB9XG4gIGlmIChidG5JbWFnZVByZXNzZWQpIHtcbiAgICBidG5JbWFnZVByZXNzZWQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICB9XG5cbiAgdmFyIF9jYXB0aW9uQ29sb3JEZWZhdWx0ID0gYnRuQXBwZWFyYW5jZS5jYXB0aW9uQ29sb3JEZWZhdWx0O1xuICB2YXIgY2FwdGlvbkNvbG9yRm9jdXNlZCA9IGJ0bkFwcGVhcmFuY2UuY2FwdGlvbkNvbG9yRm9jdXNlZDtcbiAgdmFyIGNhcHRpb25Db2xvckhvdmVyZWQgPSBidG5BcHBlYXJhbmNlLmNhcHRpb25Db2xvckhvdmVyZWQ7XG4gIHZhciBjYXB0aW9uQ29sb3JQcmVzc2VkID0gYnRuQXBwZWFyYW5jZS5jYXB0aW9uQ29sb3JQcmVzc2VkO1xuXG4gIHZhciBjYXB0aW9uU2hpZnRZcHggPSBidG5BcHBlYXJhbmNlLmNhcHRpb25TaGlmdFlweDtcbiAgdmFyIGNhcHRpb25Gb250UmF0aW8gPSBidG5BcHBlYXJhbmNlLmNhcHRpb25Gb250UmF0aW87XG5cbiAgLy9TZXQgd2hldGhlciBwYXJlbnQgZnJhbWUgaGFzIGZvY3VzIG9yIG5vdCBpbnRlcm5hbGx5XG4gIGRpdkVsZW1lbnQuX2hhc0ZyYW1lRm9jdXMgPSBmYWxzZTtcblxuICAvL1NldCB3aGV0aGVyIG1vdXNlIGlzIHByZXNzaW5nIG9yIG5vdCBpbnRlcm5hbGx5LlxuICBkaXZFbGVtZW50Ll9pc01vdXNlRG93biA9IGZhbHNlO1xuXG4gIGRpdkVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cbiAgZGl2RWxlbWVudC5zdHlsZS50b3AgPSBcIjBweFwiO1xuICBkaXZFbGVtZW50LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICBkaXZFbGVtZW50LnN0eWxlLndpZHRoID0gKHdpZHRoKSArIFwicHhcIjtcbiAgZGl2RWxlbWVudC5zdHlsZS5oZWlnaHQgPSAoaGVpZ2h0KSArIFwicHhcIjtcblxuICBpZiAoYnRuQXBwZWFyYW5jZS5jdXJzb3IpIHtcbiAgICBkaXZFbGVtZW50LnN0eWxlLmN1cnNvciA9IGJ0bkFwcGVhcmFuY2UuY3Vyc29yO1xuICB9IGVsc2Uge1xuICAgIGRpdkVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gIH1cbiAgZGl2RWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjBweFwiO1xuICBkaXZFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xuICAvL2FkZGVkIGZvciBwcmV2ZW50aW5nIGJvb3RzdHJhcC5jc3MgcG9sbHV0aW9uXG4gIGRpdkVsZW1lbnQuc3R5bGUuYm94U2l6aW5nID0gXCJjb250ZW50LWJveFwiO1xuICBkaXZFbGVtZW50LnN0eWxlLmZvbnRGYW1pbHkgPSBcInNhbnMtc2VyaWZcIjtcblxuICBkaXZFbGVtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICBkaXZFbGVtZW50Ll9pc01vdXNlRG93biA9IHRydWU7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nKFwib25tb3VzZWRvd25cIik7XG4gIH07XG5cbiAgZGl2RWxlbWVudC5vbm1vdXNlb3V0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICBkaXZFbGVtZW50Ll9pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIGRpdkVsZW1lbnQuX2hhbmRsZUZvY3VzRHJhd2luZyhcIm9ubW91c2VvdXRcIik7XG4gIH07XG5cbiAgZGl2RWxlbWVudC5vbm1vdXNlb3ZlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlSG92ZXJEcmF3aW5nKCk7XG4gIH07XG5cbiAgZGl2RWxlbWVudC5vbm1vdXNldXAgPSBmdW5jdGlvbiAoZSkge1xuICAgIGRpdkVsZW1lbnQuX2lzTW91c2VEb3duID0gZmFsc2U7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nKFwib25tb3VzZXVwXCIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyZW50IG5vdGlmaWVzIHRoYXQgdGhlIHBhcmVudCdzIGZyYW1lIGdvdCBmb2N1c1xuICAgKi9cbiAgZGl2RWxlbWVudC5fb25UYWtlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgZGl2RWxlbWVudC5faGFzRnJhbWVGb2N1cyA9IHRydWU7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nKFwiX29uVGFrZUZvY3VzXCIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyZW50IG5vdGlmaWVzIHRoYXQgdGhlIHBhcmVudCdzIGZyYW1lIGhhcyBsb3N0IGZvY3VzXG4gICAqL1xuICBkaXZFbGVtZW50Ll9vblJlbGVhc2VGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBkaXZFbGVtZW50Ll9oYXNGcmFtZUZvY3VzID0gZmFsc2U7XG4gICAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nKFwiX29uUmVsZWFzZUZvY3VzXCIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAgVG8gaGFuZGxlIDJ4MiBtYXRyaXguXG4gICAqICAoX2hhc0ZyYW1lRm9jdXMgdHJ1ZS9mYWxzZSB4IF9pc01vdXNlRG93biB0cnVlL2ZhbHNlKVxuICAgKi9cbiAgZGl2RWxlbWVudC5faGFuZGxlRm9jdXNEcmF3aW5nID0gZnVuY3Rpb24gKGV2dE5hbWUpIHtcbiAgICBpZiAoZGl2RWxlbWVudC5faGFzRnJhbWVGb2N1cykge1xuICAgICAgLy9XaGVuIHRoaXMgZWxlbWVudCBoYXMgZm9jdXNcblxuICAgICAgaWYgKGRpdkVsZW1lbnQuX2lzTW91c2VEb3duKSB7XG4gICAgICAgIC8vYm9yZGVyXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvclByZXNzZWQ7XG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJTdHlsZVByZXNzZWQ7XG5cbiAgICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yUHJlc3NlZDtcblxuICAgICAgICAvL2NhcHRpb25cbiAgICAgICAgZGl2RWxlbWVudC5zdHlsZS5jb2xvciA9IGNhcHRpb25Db2xvclByZXNzZWQ7XG5cbiAgICAgICAgaWYgKGJ0bkltYWdlUHJlc3NlZCkge1xuICAgICAgICAgIC8vIGRpdkVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidG5JbWFnZVByZXNzZWQpO1xuICAgICAgICAgIHVwZGF0ZUltYWdlKGJ0bkltYWdlUHJlc3NlZCwgZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vYm9yZGVyXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSBib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyU3R5bGUgPSBib3JkZXJTdHlsZUZvY3VzZWQ7XG5cbiAgICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yRm9jdXNlZDtcblxuICAgICAgICAvL2NhcHRpb25cbiAgICAgICAgZGl2RWxlbWVudC5zdHlsZS5jb2xvciA9IGNhcHRpb25Db2xvckZvY3VzZWQ7XG5cbiAgICAgICAgaWYgKGJ0bkltYWdlRm9jdXNlZCkge1xuICAgICAgICAgIC8vIGRpdkVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidG5JbWFnZUZvY3VzZWQpO1xuICAgICAgICAgIHVwZGF0ZUltYWdlKGJ0bkltYWdlRm9jdXNlZCwgZGl2RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9XaGVuIHRoaXMgZWxlbWVudCBkb2Vzbid0IGhhdmUgZm9jdXNcbiAgICAgIGlmIChkaXZFbGVtZW50Ll9pc01vdXNlRG93bikge1xuICAgICAgICAvL2JvcmRlclxuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVyQ29sb3JQcmVzc2VkO1xuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlclN0eWxlID0gYm9yZGVyU3R5bGVQcmVzc2VkO1xuXG4gICAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvclByZXNzZWQ7XG5cbiAgICAgICAgLy9jYXB0aW9uXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuY29sb3IgPSBjYXB0aW9uQ29sb3JQcmVzc2VkO1xuXG4gICAgICAgIGlmIChidG5JbWFnZVByZXNzZWQpIHtcbiAgICAgICAgICAvLyBkaXZFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIC8vIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoYnRuSW1hZ2VQcmVzc2VkKTtcbiAgICAgICAgICB1cGRhdGVJbWFnZShidG5JbWFnZVByZXNzZWQsIGRpdkVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2JvcmRlclxuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlckNvbG9yID0gYm9yZGVyQ29sb3JEZWZhdWx0O1xuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJvcmRlclN0eWxlID0gYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgICBkaXZFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG5cbiAgICAgICAgLy9jYXB0aW9uXG4gICAgICAgIGRpdkVsZW1lbnQuc3R5bGUuY29sb3IgPSBfY2FwdGlvbkNvbG9yRGVmYXVsdDtcblxuICAgICAgICBpZiAoYnRuSW1hZ2VEZWZhdWx0KSB7XG4gICAgICAgICAgLy8gZGl2RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAvLyBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGJ0bkltYWdlRGVmYXVsdCk7XG4gICAgICAgICAgdXBkYXRlSW1hZ2UoYnRuSW1hZ2VEZWZhdWx0LCBkaXZFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBkaXZFbGVtZW50Ll9oYW5kbGVIb3ZlckRyYXdpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRpdkVsZW1lbnQuX2hhc0ZyYW1lRm9jdXMpIHtcbiAgICAgIC8vV2hlbiB0aGlzIGVsZW1lbnQgaGFzIGZvY3VzXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vV2hlbiB0aGlzIGVsZW1lbnQgZG9lc24ndCBoYXZlIGZvY3VzXG4gICAgfVxuICAgIC8vYm9yZGVyXG4gICAgaWYgKGJvcmRlckNvbG9ySG92ZXJlZCkge1xuICAgICAgZGl2RWxlbWVudC5zdHlsZS5ib3JkZXJDb2xvciA9IGJvcmRlckNvbG9ySG92ZXJlZDtcbiAgICB9XG4gICAgaWYgKGJvcmRlclN0eWxlSG92ZXJlZCkge1xuICAgICAgZGl2RWxlbWVudC5zdHlsZS5ib3JkZXJTdHlsZSA9IGJvcmRlclN0eWxlSG92ZXJlZDtcbiAgICB9XG5cbiAgICAvL2JhY2tncm91bmRcbiAgICBpZiAoYmFja2dyb3VuZENvbG9ySG92ZXJlZCkge1xuICAgICAgZGl2RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkO1xuICAgIH1cblxuICAgIGlmIChjYXB0aW9uQ29sb3JIb3ZlcmVkKSB7XG4gICAgICAvL2NhcHRpb25cbiAgICAgIGRpdkVsZW1lbnQuc3R5bGUuY29sb3IgPSBjYXB0aW9uQ29sb3JIb3ZlcmVkO1xuICAgIH1cbiAgICBpZiAoYnRuSW1hZ2VIb3ZlcmVkKSB7XG4gICAgICAvLyBkaXZFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgLy8gZGl2RWxlbWVudC5hcHBlbmRDaGlsZChidG5JbWFnZUhvdmVyZWQpO1xuICAgICAgdXBkYXRlSW1hZ2UoYnRuSW1hZ2VIb3ZlcmVkLCBkaXZFbGVtZW50KTtcbiAgICB9XG4gIH07XG4gIGRpdkVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiMHB4XCI7XG5cbiAgZGl2RWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICBkaXZFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gKGhlaWdodCAqIGNhcHRpb25Gb250UmF0aW8pICsgXCJweFwiO1xuXG4gIGRpdkVsZW1lbnQuc3R5bGUubGluZUhlaWdodCA9IChoZWlnaHQpICsgXCJweFwiO1xuXG4gIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyV2lkdGggPSBcIjFweFwiO1xuXG4gIGlmIChib3JkZXJXaWR0aCAhPSBudWxsKSB7XG4gICAgZGl2RWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoICsgXCJweFwiO1xuICB9XG5cbiAgaWYgKGJhY2tncm91bmRCb3hTaGFkb3cgIT0gbnVsbCkge1xuICAgIGRpdkVsZW1lbnQuc3R5bGUuYm94U2hhZG93ID0gYmFja2dyb3VuZEJveFNoYWRvdztcbiAgfVxuXG4gIGRpdkVsZW1lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID1cbiAgICAoYm9yZGVyUmFkaXVzICsgcGFyc2VJbnQoZGl2RWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCkpICsgXCJweFwiO1xuXG4gIHZhciBjaGlsZE1vZGUgPSB0cnVlO1xuXG4gIGlmIChjaGlsZE1vZGUgJiYgYnRuSW1hZ2VEZWZhdWx0KSB7XG4gICAgLy8gZGl2RWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAvLyBkaXZFbGVtZW50LmFwcGVuZENoaWxkKGJ0bkltYWdlRGVmYXVsdCk7XG4gICAgdXBkYXRlSW1hZ2UoYnRuSW1hZ2VEZWZhdWx0LCBkaXZFbGVtZW50KTtcbiAgfSBlbHNlIGlmIChjaGlsZE1vZGUgJiYgY2FwdGlvbikge1xuICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgLy9zcGFuLnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSc7XG4gICAgc3Bhbi5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgIHNwYW4uc3R5bGUubWFyZ2luVG9wID0gY2FwdGlvblNoaWZ0WXB4ICsgXCJweFwiO1xuICAgIHNwYW4uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lLWJsb2NrXCI7XG4gICAgc3Bhbi5zdHlsZS50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgIHNwYW4uc3R5bGUuZm9udEZhbWlseSA9IFwic2Fucy1zZXJpZlwiO1xuICAgIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2FwdGlvbikpO1xuICAgIGRpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gIH0gZWxzZSBpZiAoY2hpbGRNb2RlICYmIGZhKSB7XG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBzcGFuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICBzcGFuLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgc3Bhbi5zdHlsZS5tYXJnaW5Ub3AgPSBjYXB0aW9uU2hpZnRZcHggKyBcInB4XCI7XG4gICAgc3Bhbi5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICBzcGFuLnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgc3Bhbi5zdHlsZS5mb250RmFtaWx5ID0gXCJzYW5zLXNlcmlmXCI7XG4gICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCInICsgZmEgKyAnXCI+PC9pPic7XG4gICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgfSBlbHNlIGlmICghY2hpbGRNb2RlICYmIGNhcHRpb24pIHtcbiAgICBkaXZFbGVtZW50LnN0eWxlLnBhZGRpbmdUb3AgPSBjYXB0aW9uU2hpZnRZcHggKyBcInB4XCI7XG4gICAgZGl2RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjYXB0aW9uKSk7XG4gIH1cblxuICBkaXZFbGVtZW50Ll9oYW5kbGVGb2N1c0RyYXdpbmcoKTtcbiAgcmV0dXJuIGRpdkVsZW1lbnQ7XG59O1xuXG4vLyBEb24ndCB1c2UgaW5uZXJIVE1MPScnIGJlY2F1c2UgdGhlcmUgbWF5IGJlIGEgY2hpbGQgYmVsb3cgdGhpcyAnaW1nJyBlbGVtZW50LlxuLy8gQSBjaGlsZCB0aGF0IG1heSBiZSBhIGNoaWxkIGlzIGEgY2hpbGRNZW51LlxuZnVuY3Rpb24gdXBkYXRlSW1hZ2UoaW1hZ2UsIHBhcmVudEVsZW1lbnQpIHtcbiAgdmFyIGltZ3MgPSBwYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIik7XG4gIGlmIChwYXJlbnRFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShpbWFnZSwgcGFyZW50RWxlbWVudC5maXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW1nID0gaW1nc1tpXTtcbiAgICBpZiAoaW1hZ2UgIT09IGltZykge1xuICAgICAgcGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChpbWcpO1xuICAgIH1cbiAgfVxufVxuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxuLyoqXG4gKiBlbmQgb2YgQ0RvbVBhcnRzQnVpbGRlciBjbGFzc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IENEb21QYXJ0c0J1aWxkZXI7XG4iLCJ2YXIgQ0RvbVBhcnRzQnVpbGRlciA9IHJlcXVpcmUoXCIuL0NEb21QYXJ0c0J1aWxkZXIuanNcIik7XG52YXIgQ0ZyYW1lQ29tcG9uZW50ID0gcmVxdWlyZShcIi4vQ0ZyYW1lQ29tcG9uZW50LmpzXCIpO1xuXG4vKipcbiAqIENGcmFtZUFwcGVhcmFuY2UgY2xhc3M8YnI+XG4gKiBBcHBlYXJhbmNlIE1vZGVsIENsYXNzIGZvciBGcmFtZVxuICpcbiAqL1xuZnVuY3Rpb24gQ0ZyYW1lQXBwZWFyYW5jZSgpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB0aGlzLnNob3dUaXRsZUJhciA9IHRydWU7XG4gIHRoaXMuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcbiAgdGhpcy50aXRsZUJhckNhcHRpb24gPSBcIlwiO1xuICB0aGlzLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gXCIxMnB4XCI7XG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodCA9IFwiYm9sZFwiO1xuICB0aGlzLnRpdGxlQmFySGVpZ2h0ID0gXCIyNHB4XCI7XG4gIHRoaXMudXNlSWZyYW1lID0gZmFsc2U7XG4gIHRoaXMudXNlRnJhbWUgPSB0cnVlO1xuXG4gIHRoaXMudGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0ID0gbnVsbDtcbiAgdGhpcy50aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQgPSBudWxsO1xuXG4gIHRoaXMuc2V0VXNlSUZyYW1lID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgbWUudXNlSWZyYW1lID0gdmFsdWU7XG4gICAgbWUudXNlRnJhbWUgPSAhdmFsdWU7XG4gICAgcmV0dXJuIG1lO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gZnJvbSB0aGUgbGVmdCBzaWRlIG9mIHRoZSBjYXB0aW9uLiBJZiB0aGlzIHZhbHVlIGlzIG51bGwsIGNhcHRpb24gd2lsbCBiZSBjZW50ZXJlZC5cbiAgICovXG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9IFwiNXB4XCI7XG5cbiAgdGhpcy50aXRsZUJhckNvbG9yRGVmYXVsdCA9IG51bGw7XG4gIHRoaXMudGl0bGVCYXJDb2xvckZvY3VzZWQgPSBudWxsO1xuICB0aGlzLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdCA9IFwiXCI7XG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uQ29sb3JGb2N1c2VkID0gXCJcIjtcbiAgdGhpcy50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93ID0gXCIwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjcpXCI7XG4gIHRoaXMudGl0bGVCYXJDYXB0aW9uVGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuICB0aGlzLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdCA9IFwiMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4yKVwiO1xuICB0aGlzLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IG51bGw7XG5cbiAgdGhpcy5mcmFtZUJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG5cbiAgdGhpcy5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IFwiMXB4XCI7XG4gIHRoaXMuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSB0aGlzLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0O1xuXG4gIHRoaXMuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQgPSBcInJnYmEoMSwgMSwgMSwgMC4yKVwiO1xuICB0aGlzLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gdGhpcy5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdDtcblxuICB0aGlzLmZyYW1lQm9yZGVyU3R5bGUgPSBcInNvbGlkXCI7XG4gIHRoaXMuZnJhbWVCb3hTaGFkb3cgPSBcIjJweCAzcHggMTZweCByZ2JhKDAsMCwwLC42KVwiO1xuICB0aGlzLmZyYW1lQmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xuXG4gIHRoaXMuX3BhcnRzQnVpbGRlciA9IG51bGw7XG5cbiAgdGhpcy5mcmFtZUNvbXBvbmVudHMgPSBbXTtcblxuICB0aGlzLmZyYW1lSGVpZ2h0QWRqdXN0ID0gMTtcblxuICB0aGlzLnJlc2l6ZUFyZWFXaWR0aCA9IDIwO1xuICB0aGlzLnJlc2l6ZUFyZWFIZWlnaHQgPSAyMDtcbiAgdGhpcy5yZXNpemVBcmVhT2Zmc2V0ID0gMDtcbiAgdGhpcy5yZXNpemVBcmVhVmlzaWJsZSA9IGZhbHNlO1xuXG4gIHRoaXMuZ2V0RnJhbWVJbm5lckJvcmRlclJhZGl1cyA9IGZ1bmN0aW9uIChyZWYsIGhhc0ZvY3VzKSB7XG4gICAgaWYgKCFyZWYpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaGFzRm9jdXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZyYW1lQXBwZWFyYW5jZTogbWUsXG4gICAgICAgIGlubmVyQm9yZGVyUmFkaXVzOiAocGFyc2VJbnQocmVmLmZyYW1lQm9yZGVyUmFkaXVzLCAxMCkgLVxuICAgICAgICAgIHBhcnNlSW50KHJlZi5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCwgMTApKSArIFwicHhcIixcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBmcmFtZUFwcGVhcmFuY2U6IG1lLFxuICAgICAgaW5uZXJCb3JkZXJSYWRpdXM6IChwYXJzZUludChyZWYuZnJhbWVCb3JkZXJSYWRpdXMsIDEwKSAtXG4gICAgICAgIHBhcnNlSW50KHJlZi5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCwgMTApKSArIFwicHhcIixcbiAgICB9O1xuICB9O1xuXG4gIHRoaXMub25Jbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIC8vQWRkIGNsb3NlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICBpZiAobWUuc2hvd0Nsb3NlQnV0dG9uKSB7XG4gICAgICB2YXIgcGFydHNCdWlsZGVyID0gbWUuZ2V0UGFydHNCdWlsZGVyKCksXG4gICAgICAgIGNyb3NzTWFyazAgPSBcIlxcdTI3NGNcIixcbiAgICAgICAgY3Jvc3NNYXJrMSA9IFwiXFx1MjcxNlwiLFxuICAgICAgICBjcm9zc01hcmsyID0gXCJcXHUyNzRlXCI7XG5cbiAgICAgIHZhciBidG5BcHBlYXJhbmNlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKTtcblxuICAgICAgYnRuQXBwZWFyYW5jZS5zaXplID0gMTQ7XG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb25TaGlmdFlweCA9IDA7XG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb25Gb250UmF0aW8gPSAxLjA7XG4gICAgICBidG5BcHBlYXJhbmNlLmJvcmRlclJhZGl1cyA9IDI7XG4gICAgICBidG5BcHBlYXJhbmNlLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgICBidG5BcHBlYXJhbmNlLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb24gPSBjcm9zc01hcmsxO1xuXG4gICAgICBidG5BcHBlYXJhbmNlLmNhcHRpb25Db2xvckRlZmF1bHQgPSBcImdyYXlcIjtcbiAgICAgIGJ0bkFwcGVhcmFuY2UuY2FwdGlvbkNvbG9yRm9jdXNlZCA9IFwiZ3JheVwiO1xuICAgICAgYnRuQXBwZWFyYW5jZS5jYXB0aW9uQ29sb3JIb3ZlcmVkID0gXCJzaWx2ZXJcIjtcbiAgICAgIGJ0bkFwcGVhcmFuY2UuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IFwiYmxhY2tcIjtcblxuICAgICAgYnRuQXBwZWFyYW5jZS5ib3JkZXJXaWR0aCA9IDA7XG4gICAgICBidG5BcHBlYXJhbmNlLmJvcmRlckNvbG9yRGVmYXVsdCA9IFwiI2FhYWFhYVwiO1xuICAgICAgYnRuQXBwZWFyYW5jZS5ib3JkZXJTdHlsZSA9IFwic29saWRcIjtcblxuICAgICAgdmFyIGNsb3NlQnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbihidG5BcHBlYXJhbmNlKTtcbiAgICAgIHZhciBlbGVMZWZ0ID0gLTEwO1xuICAgICAgdmFyIGVsZVRvcCA9IC0xODtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiUklHSFRfVE9QXCI7XG5cbiAgICAgIC8vY2xvc2VCdXR0b24gaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIHZhciBmcmFtZUNvbXBvbmVudCA9IG1lLmFkZEZyYW1lQ29tcG9uZW50KFxuICAgICAgICBcImNsb3NlQnV0dG9uXCIsXG4gICAgICAgIGNsb3NlQnRuRWxlLFxuICAgICAgICBlbGVMZWZ0LFxuICAgICAgICBlbGVUb3AsXG4gICAgICAgIGVsZUFsaWduLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5vblRpdGxlQmFyU3R5bGVJbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICB9O1xufVxuXG5DRnJhbWVBcHBlYXJhbmNlLnByb3RvdHlwZS5nZXRQYXJ0c0J1aWxkZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIGlmIChtZS5fcGFydHNCdWlsZGVyID09PSBudWxsKSB7XG4gICAgbWUuX3BhcnRzQnVpbGRlciA9IG5ldyBDRG9tUGFydHNCdWlsZGVyKCk7XG4gIH1cbiAgcmV0dXJuIG1lLl9wYXJ0c0J1aWxkZXI7XG59O1xuQ0ZyYW1lQXBwZWFyYW5jZS5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUub25Jbml0aWFsaXplKCk7XG59O1xuXG4vKipcbiAqICBBZGQgRnJhbWVDb21wb25lbnQgaW50byBmcmFtZVxuICogIEZyYW1lQ29tcG9uZW50IGlzIGF0dGFjaGVkIHRvIEZyYW1lIGFuZCBpdCBtb3ZlcyB3aXRoIEZyYW1lLlxuICpcbiAqIEBwYXJhbSBpZFxuICogQHBhcmFtIG15RG9tRWxlbWVudCBET00gZWxlbWVudC5cbiAqIEBwYXJhbSB4ICBSZWxhdGl2ZSB4IGNvb2RpbmF0ZSBmcm9tIHRoZSBzbmFwIHBvc2l0aW9uIHNwZWNpZmllZCBieSBhbGlnbm1lbnRcbiAqIEBwYXJhbSB5ICBSZWxhdGl2ZSB5IGNvb2RpbmF0ZSBmcm9tIHRoZSBzbmFwIHBvc2l0aW9uIHNwZWNpZmllZCBieSBhbGlnbm1lbnRcbiAqIEBwYXJhbSBhbGlnbiAnTEVGVF9UT1AnICdDRU5URVJfVE9QJyAnUklHSFRfVE9QJyAnTEVGVF9DRU5URVInICdDRU5URVJfQ0VOVEVSJyAnUklHSFRfQ0VOVEVSJyAnTEVGVF9CT1RUT00nICdDRU5URVJfQk9UVE9NJyAnUklHSFRfQk9UVE9NJ1xuICogQHJldHVybnMge0NGcmFtZUNvbXBvbmVudH1cbiAqXG4gKi9cbkNGcmFtZUFwcGVhcmFuY2UucHJvdG90eXBlLmFkZEZyYW1lQ29tcG9uZW50ID0gZnVuY3Rpb24gKFxuICBpZCxcbiAgbXlEb21FbGVtZW50LFxuICB4LFxuICB5LFxuICBhbGlnbixcbiAgZXh0cmEsXG4pIHtcbiAgLy8oaWQsIGZyYW1lLCBodG1sRWxlbWVudCwgeCwgeSwgYWxpZ24pXG4gIHZhciBmcmFtZUNvbXBvbmVudCA9IG5ldyBDRnJhbWVDb21wb25lbnQoXG4gICAgaWQsXG4gICAgbXlEb21FbGVtZW50LFxuICAgIHgsXG4gICAgeSxcbiAgICBhbGlnbixcbiAgICBleHRyYSxcbiAgKTtcblxuICBpZiAobXlEb21FbGVtZW50Ll9vblRha2VGb2N1cyAmJiBteURvbUVsZW1lbnQuX29uUmVsZWFzZUZvY3VzKSB7XG4gICAgLy9pZiB0aGlzIERPTSBlbGVtZW50IGhhcyBzcGVjaWFsIG1ldGhvZCBmb3IgZm9jdXNcbiAgICAvL3NldCBmb2N1cyBjYWxsYmFja1xuICAgIGZyYW1lQ29tcG9uZW50LnNldEZvY3VzQ2FsbGJhY2soXG4gICAgICBteURvbUVsZW1lbnQuX29uVGFrZUZvY3VzLFxuICAgICAgbXlEb21FbGVtZW50Ll9vblJlbGVhc2VGb2N1cyxcbiAgICApO1xuICB9XG5cbiAgdGhpcy5mcmFtZUNvbXBvbmVudHMucHVzaChmcmFtZUNvbXBvbmVudCk7XG5cbiAgcmV0dXJuIGZyYW1lQ29tcG9uZW50O1xufTtcblxuLy8rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstXG5cbi8qKlxuICogIEVuZCBvZiBDRnJhbWVBcHBlYXJhbmNlIGNsYXNzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gQ0ZyYW1lQXBwZWFyYW5jZTtcbiIsIi8qKlxuICogQ0ZyYW1lQ29tcG9uZW50IGNsYXNzXG4gKiA8cD5cbiAqIFdyYXBwZWQgRE9NIGVsZW1lbnQgbGlrZSAnZGl2JyB0byBkaXNwbGF5IGFib3ZlIHRoZSBmcmFtZTxicj5cbiAqXG4gKiBleC5BbiBvYmplY3Qgc3VjaCBhcyBjbG9zZUJ1dHRvblxuICpcbiAqIEBwYXJhbSBpZFxuICogQHBhcmFtIGZyYW1lXG4gKiBAcGFyYW0gaHRtbEVsZW1lbnQgRE9NLWVsZW1lbnRcbiAqIEBwYXJhbSB4IHJlbGF0aXZlIHgtcG9zaXRpb24gaW4gdGhlIGZyYW1lIHJlc3BlY3QgdG8gYWxpZ25cbiAqIEBwYXJhbSB5IHJlbGF0aXZlIHktcG9zaXRpb24gaW4gdGhlIGZyYW1lIHJlc3BlY3QgdG8gYWxpZ25cbiAqIEBwYXJhbSBhbGlnbiByZWxhdGl2ZSBhbGlnbm1lbnQgaW4gdGhlIGZyYW1lXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ0ZyYW1lQ29tcG9uZW50KGlkLCBodG1sRWxlbWVudCwgeCwgeSwgYWxpZ24sIGV4dHJhKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgbWUuaWQgPSBpZDtcbiAgbWUueCA9IHg7XG4gIG1lLnkgPSB5O1xuICBtZS5mcmFtZSA9IG51bGw7XG5cbiAgbWUuX2ZvY3VzVGFraW5nQ2FsbGFiY2sgPSBudWxsO1xuICBtZS5fZm9jdXNSZWxlYXNpbmdDYWxsYWJjayA9IG51bGw7XG5cbiAgaWYgKGFsaWduKSB7XG4gICAgbWUuZnJhbWVDb21wb25lbnRBbGlnbiA9IGFsaWduO1xuICB9IGVsc2Uge1xuICAgIG1lLmZyYW1lQ29tcG9uZW50QWxpZ24gPSBDQUxJR04uTEVGVF9UT1A7XG4gIH1cbiAgbWUuaHRtbEVsZW1lbnQgPSBodG1sRWxlbWVudDtcbiAgbWUuaHRtbEVsZW1lbnQuc3R5bGUuekluZGV4ID0gNTA7XG4gIG1lLmh0bWxFbGVtZW50LnNldEF0dHJpYnV0ZShcImNvbXBvbmVudC1pZFwiLCBpZCk7XG5cbiAgaWYgKGV4dHJhICYmIGV4dHJhLmNoaWxkTWVudSkge1xuICAgIG1lLmNoaWxkTWVudSA9IGV4dHJhLmNoaWxkTWVudTtcbiAgfSBlbHNlIGlmIChodG1sRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzZnJhbWUtY2hpbGQtbWVudVwiKSkge1xuICAgIG1lLmNoaWxkTWVudSA9IGh0bWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanNmcmFtZS1jaGlsZC1tZW51XCIpO1xuICB9XG59XG5cbkNGcmFtZUNvbXBvbmVudC5wcm90b3R5cGUuc2V0Rm9jdXNDYWxsYmFjayA9IGZ1bmN0aW9uIChcbiAgZm9jdXNUYWtpbmdDYWxsYmFjayxcbiAgZm9jdXNSZWxlYXNpbmdDYWxsYmFjayxcbikge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5fZm9jdXNUYWtpbmdDYWxsYWJjayA9IGZvY3VzVGFraW5nQ2FsbGJhY2s7XG4gIG1lLl9mb2N1c1JlbGVhc2luZ0NhbGxhYmNrID0gZm9jdXNSZWxlYXNpbmdDYWxsYmFjaztcbn07XG5cbi8qKlxuICogU2V0IHBhcmVudCBmcmFtZSBvZiB0aGlzIGZyYW1lQ29tcG9uZW50XG4gKiBAcGFyYW0gZnJhbWVcbiAqL1xuQ0ZyYW1lQ29tcG9uZW50LnByb3RvdHlwZS5zZXRGcmFtZSA9IGZ1bmN0aW9uIChmcmFtZSkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIG1lLmZyYW1lID0gZnJhbWU7XG4gIG1lLmh0bWxFbGVtZW50LnBhcmVudE9iamVjdCA9IGZyYW1lO1xuICBtZS51cGRhdGVBbGlnbigpO1xufTtcblxuLyoqXG4gKiBQbGFjZSB0aGUgRnJhbWVDb21wb25lbnQgcmVsYXRpdmUgdG8gdGhlIHBhcmVudCdzIGZyYW1lLlxuICogUmVsb2NhdGUgcmVsYXRpdmUgdG8gcGFyZW50IGZyYW1lIHdoZW4gd2luZG93IHJlc2l6ZSBldmVudCBvY2N1cnNcbiAqL1xuQ0ZyYW1lQ29tcG9uZW50LnByb3RvdHlwZS51cGRhdGVBbGlnbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJhbWVDb21wb25lbnRBbGlnbiA9IG1lLmZyYW1lQ29tcG9uZW50QWxpZ247XG5cbiAgdmFyIGZyYW1lID0gbWUuZnJhbWU7XG4gIHZhciBlbGVTdHlsZSA9IG1lLmh0bWxFbGVtZW50LnN0eWxlO1xuICBlbGVTdHlsZS51c2VyU2VsZWN0ID0gXCJub25lXCI7XG5cbiAgdmFyIHggPSBtZS54O1xuICB2YXIgeSA9IG1lLnk7XG5cbiAgdmFyIGZyYW1lV2lkdGggPSBmcmFtZS5nZXRXaWR0aCgpO1xuICB2YXIgZnJhbWVIZWlnaHQgPSBmcmFtZS5nZXRIZWlnaHQoKTtcbiAgdmFyIGVsZVN0eWxlV2lkdGggPSBlbGVTdHlsZS53aWR0aDtcbiAgdmFyIGVsZVN0eWxlSGVpZ2h0ID0gZWxlU3R5bGUuaGVpZ2h0O1xuXG4gIGlmIChDQUxJR04uTEVGVF9UT1AgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSB4ICsgXCJweFwiO1xuICAgIGVsZVN0eWxlLnRvcCA9IHkgKyBcInB4XCI7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfVE9QID09IGZyYW1lQ29tcG9uZW50QWxpZ24pIHtcbiAgICBlbGVTdHlsZS5sZWZ0ID1cbiAgICAgIChwYXJzZUludChmcmFtZVdpZHRoKSAvIDIgLSBwYXJzZUludChlbGVTdHlsZVdpZHRoKSAvIDIgKyB4KSArIFwicHhcIjtcbiAgICBlbGVTdHlsZS50b3AgPSB5ICsgXCJweFwiO1xuICB9IGVsc2UgaWYgKENBTElHTi5SSUdIVF9UT1AgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPSAocGFyc2VJbnQoZnJhbWVXaWR0aCkgLSBwYXJzZUludChlbGVTdHlsZVdpZHRoKSArIHgpICsgXCJweFwiO1xuICAgIGVsZVN0eWxlLnRvcCA9IHkgKyBcInB4XCI7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLkxFRlRfVkNFTlRFUiA9PSBmcmFtZUNvbXBvbmVudEFsaWduKSB7XG4gICAgZWxlU3R5bGUubGVmdCA9IHggKyBcInB4XCI7XG4gICAgZWxlU3R5bGUudG9wID1cbiAgICAgIChwYXJzZUludChmcmFtZUhlaWdodCkgLyAyIC0gcGFyc2VJbnQoZWxlU3R5bGVIZWlnaHQpIC8gMiArIHkpICsgXCJweFwiO1xuICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX1ZDRU5URVIgPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPVxuICAgICAgKHBhcnNlSW50KGZyYW1lV2lkdGgpIC8gMiAtIHBhcnNlSW50KGVsZVN0eWxlV2lkdGgpIC8gMiArIHgpICsgXCJweFwiO1xuICAgIGVsZVN0eWxlLnRvcCA9XG4gICAgICAocGFyc2VJbnQoZnJhbWVIZWlnaHQpIC8gMiAtIHBhcnNlSW50KGVsZVN0eWxlSGVpZ2h0KSAvIDIgKyB5KSArIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVkNFTlRFUiA9PSBmcmFtZUNvbXBvbmVudEFsaWduKSB7XG4gICAgZWxlU3R5bGUubGVmdCA9IChwYXJzZUludChmcmFtZVdpZHRoKSAtIHBhcnNlSW50KGVsZVN0eWxlV2lkdGgpICsgeCkgKyBcInB4XCI7XG4gICAgZWxlU3R5bGUudG9wID1cbiAgICAgIChwYXJzZUludChmcmFtZUhlaWdodCkgLyAyIC0gcGFyc2VJbnQoZWxlU3R5bGVIZWlnaHQpIC8gMiArIHkpICsgXCJweFwiO1xuICB9IGVsc2UgaWYgKENBTElHTi5MRUZUX0JPVFRPTSA9PSBmcmFtZUNvbXBvbmVudEFsaWduKSB7XG4gICAgZWxlU3R5bGUubGVmdCA9IHggKyBcInB4XCI7XG4gICAgZWxlU3R5bGUudG9wID0gKHBhcnNlSW50KGZyYW1lSGVpZ2h0KSAtIHBhcnNlSW50KGVsZVN0eWxlSGVpZ2h0KSArIHkpICtcbiAgICAgIFwicHhcIjtcbiAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9CT1RUT00gPT0gZnJhbWVDb21wb25lbnRBbGlnbikge1xuICAgIGVsZVN0eWxlLmxlZnQgPVxuICAgICAgKHBhcnNlSW50KGZyYW1lV2lkdGgpIC8gMiAtIHBhcnNlSW50KGVsZVN0eWxlV2lkdGgpIC8gMiArIHgpICsgXCJweFwiO1xuICAgIGVsZVN0eWxlLnRvcCA9IChwYXJzZUludChmcmFtZUhlaWdodCkgLSBwYXJzZUludChlbGVTdHlsZUhlaWdodCkgKyB5KSArXG4gICAgICBcInB4XCI7XG4gIH0gZWxzZSBpZiAoQ0FMSUdOLlJJR0hUX0JPVFRPTSA9PSBmcmFtZUNvbXBvbmVudEFsaWduKSB7XG4gICAgZWxlU3R5bGUubGVmdCA9IChwYXJzZUludChmcmFtZVdpZHRoKSAtIHBhcnNlSW50KGVsZVN0eWxlV2lkdGgpICsgeCkgKyBcInB4XCI7XG4gICAgZWxlU3R5bGUudG9wID0gKHBhcnNlSW50KGZyYW1lSGVpZ2h0KSAtIHBhcnNlSW50KGVsZVN0eWxlSGVpZ2h0KSArIHkpICtcbiAgICAgIFwicHhcIjtcbiAgfVxufTtcblxuQ0ZyYW1lQ29tcG9uZW50LnByb3RvdHlwZS5oYW5kbGVUYWtpbmdGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKG1lLl9mb2N1c1Rha2luZ0NhbGxhYmNrKSB7XG4gICAgbWUuX2ZvY3VzVGFraW5nQ2FsbGFiY2soKTtcbiAgfVxufTtcblxuQ0ZyYW1lQ29tcG9uZW50LnByb3RvdHlwZS5oYW5kbGVSZWxlYXNpbmdGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgaWYgKG1lLl9mb2N1c1JlbGVhc2luZ0NhbGxhYmNrKSB7XG4gICAgbWUuX2ZvY3VzUmVsZWFzaW5nQ2FsbGFiY2soKTtcbiAgfVxufTtcblxuLyoqXG4gKiBlbmQgb2YgQ0ZyYW1lQ29tcG9uZW50IGNsYXNzXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBDRnJhbWVDb21wb25lbnQ7XG4iLCJ2YXIgaW5oZXJpdCA9IHJlcXVpcmUoXCIuLi91dGlscy9Jbmhlcml0LmpzXCIpO1xudmFyIENUZXh0QnV0dG9uQXBwZWFyYW5jZSA9IHJlcXVpcmUoXCIuL0NCdXR0b25BcHBlYXJhbmNlLmpzXCIpO1xuXG5pbmhlcml0KENJbWFnZUJ1dHRvbkFwcGVhcmFuY2UsIENUZXh0QnV0dG9uQXBwZWFyYW5jZSk7XG5cbmZ1bmN0aW9uIENJbWFnZUJ1dHRvbkFwcGVhcmFuY2UoKSB7XG4gIHRoaXMuaW1hZ2VEZWZhdWx0ID0gbnVsbDtcbiAgdGhpcy5pbWFnZUhvdmVyZWQgPSBudWxsO1xuICB0aGlzLmltYWdlUHJlc3NlZCA9IG51bGw7XG4gIHRoaXMuaW1hZ2VGb2N1c2VkID0gbnVsbDtcblxuICB0aGlzLmltYWdlU3RvcmUgPSB7fTtcbn1cblxuQ0ltYWdlQnV0dG9uQXBwZWFyYW5jZS5wcm90b3R5cGUuX3NldEltYWdlID0gZnVuY3Rpb24gKHNyYywgd2lkdGgsIGhlaWdodCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIHZhciBzdG9yZWRJbWdFbGUgPSBtZS5pbWFnZVN0b3JlW3NyY107XG5cbiAgaWYgKHN0b3JlZEltZ0VsZSkge1xuICAgIHJldHVybiBzdG9yZWRJbWdFbGU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGltZ0VsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1nRWxlLnNyYyA9IHNyYztcbiAgICBpZiAod2lkdGggJiYgaGVpZ2h0KSB7XG4gICAgICB2YXIgaW1nV2lkdGggPSB3aWR0aDtcbiAgICAgIHZhciBpbWdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICB2YXIgaW1nU3R5bGUgPSBcIm1hcmdpbjowcHg7cGFkZGluZzowcHg7d2lkdGg6XCIgKyBpbWdXaWR0aCArIFwicHg7aGVpZ2h0OlwiICtcbiAgICAgICAgaW1nSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgaW1nRWxlLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGltZ1N0eWxlKTtcbiAgICB9XG4gICAgbWUuaW1hZ2VTdG9yZVtzcmNdID0gaW1nRWxlO1xuXG4gICAgcmV0dXJuIGltZ0VsZTtcbiAgfVxufTtcbkNJbWFnZUJ1dHRvbkFwcGVhcmFuY2UucHJvdG90eXBlLnNldFNyYyA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBpZiAobW9kZWwuZGVmYXVsdCkge1xuICAgIG1lLmltYWdlRGVmYXVsdCA9IG1lLl9zZXRJbWFnZShtb2RlbC5kZWZhdWx0LCBtb2RlbC53aWR0aCwgbW9kZWwuaGVpZ2h0KTtcbiAgfVxuICBpZiAobW9kZWwuaG92ZXJlZCkge1xuICAgIG1lLmltYWdlSG92ZXJlZCA9IG1lLl9zZXRJbWFnZShtb2RlbC5ob3ZlcmVkLCBtb2RlbC53aWR0aCwgbW9kZWwuaGVpZ2h0KTtcbiAgfVxuICBpZiAobW9kZWwucHJlc3NlZCkge1xuICAgIG1lLmltYWdlUHJlc3NlZCA9IG1lLl9zZXRJbWFnZShtb2RlbC5wcmVzc2VkLCBtb2RlbC53aWR0aCwgbW9kZWwuaGVpZ2h0KTtcbiAgfVxuICBpZiAobW9kZWwuZm9jdXNlZCkge1xuICAgIG1lLmltYWdlRm9jdXNlZCA9IG1lLl9zZXRJbWFnZShtb2RlbC5mb2N1c2VkLCBtb2RlbC53aWR0aCwgbW9kZWwuaGVpZ2h0KTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDSW1hZ2VCdXR0b25BcHBlYXJhbmNlO1xuIiwiLy9leHBvcnQgeyBkZWZhdWx0IGFzIEpTRnJhbWUgfSBmcm9tICcuL0pTRnJhbWUuanMnO1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEpTRnJhbWU6IHJlcXVpcmUoXCIuL0pTRnJhbWVcIiksXG59O1xuIiwicmVxdWlyZShcIi4vUHJlc2V0U3R5bGVNYXRlcmlhbC5jc3NcIik7XG52YXIgT2JqZWN0QXNzaWduZXIgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvT2JqZWN0QXNzaWduZXIuanNcIik7XG5cbmZ1bmN0aW9uIGdldFN0eWxlKGZBcHIsIHVzZXJQYXJhbSkge1xuICB2YXIgc3JjUGFyYW0gPSB7XG4gICAgYm9yZGVyOiB7XG4gICAgICBjb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICByYWRpdXM6IDYsXG4gICAgfSxcbiAgICBjb250cm9sOiB7XG4gICAgICBtYXhpbWl6ZVdpdGhvdXRUaXRsZUJhcjogZmFsc2UsXG4gICAgICByZXN0b3JlS2V5OiBcIkVzY2FwZVwiLFxuICAgIH0sXG4gICAgdGl0bGVCYXI6IHtcbiAgICAgIGNvbG9yOiBcIndoaXRlXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcImJsYWNrXCIsXG4gICAgICBsZWZ0TWFyZ2luOiAyMCxcbiAgICAgIGhlaWdodDogMzAsXG4gICAgICBmb250U2l6ZTogMTIsXG4gICAgICBidXR0b25XaWR0aDogMzYsXG4gICAgICBidXR0b25IZWlnaHQ6IDE2LFxuICAgICAgYnV0dG9uQ29sb3I6IFwid2hpdGVcIixcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZhOiBcImZhcyBmYS10aW1lc1wiLFxuICAgICAgICAgIG5hbWU6IFwiY2xvc2VCdXR0b25cIixcbiAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmE6IFwiZmFyIGZhLXdpbmRvdy1tYXhpbWl6ZVwiLFxuICAgICAgICAgIG5hbWU6IFwibWF4aW1pemVCdXR0b25cIixcbiAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmE6IFwiZmFyIGZhLXdpbmRvdy1yZXN0b3JlXCIsXG4gICAgICAgICAgbmFtZTogXCJyZXN0b3JlQnV0dG9uXCIsXG4gICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmYTogXCJmYXIgZmEtd2luZG93LW1pbmltaXplXCIsXG4gICAgICAgICAgbmFtZTogXCJtaW5pbWl6ZUJ1dHRvblwiLFxuICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmYTogXCJmYXMgZmEtY2FyZXQtdXBcIixcbiAgICAgICAgICBuYW1lOiBcImRlbWluaW1pemVCdXR0b25cIixcbiAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBidXR0b25zT25MZWZ0OiBbXSxcbiAgICB9LFxuICB9O1xuXG4gIHZhciBwYXJhbSA9IHNyY1BhcmFtO1xuXG4gIGlmICh1c2VyUGFyYW0pIHtcbiAgICAvL3BhcmFtPU9iamVjdC5hc3NpZ24oe30sc3JjUGFyYW0sIHVzZXJQYXJhbSk7XG4gICAgT2JqZWN0QXNzaWduZXIub2JqZWN0QXNzaWduKHNyY1BhcmFtLCB1c2VyUGFyYW0pO1xuICB9XG5cbiAgZkFwci5zaG93VGl0bGVCYXIgPSB0cnVlO1xuICBmQXByLnNob3dDbG9zZUJ1dHRvbiA9IHRydWU7XG5cbiAgZkFwci50aXRsZUJhckNhcHRpb25Gb250U2l6ZSA9IHBhcmFtLnRpdGxlQmFyLmZvbnRTaXplICsgXCJweFwiOyAvLycxMnB4JztcbiAgZkFwci50aXRsZUJhckNhcHRpb25Gb250V2VpZ2h0ID0gXCJub3JtYWxcIjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luID0gcGFyYW0udGl0bGVCYXIubGVmdE1hcmdpbiArIFwicHhcIjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25Db2xvckRlZmF1bHQgPSBwYXJhbS50aXRsZUJhci5jb2xvcjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQgPSBwYXJhbS50aXRsZUJhci5jb2xvcjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25UZXh0U2hhZG93ID0gbnVsbDtcbiAgZkFwci50aXRsZUJhckNhcHRpb25UZXh0QWxpZ24gPSBcImxlZnRcIjtcblxuICBmQXByLnRpdGxlQmFySGVpZ2h0ID0gcGFyYW0udGl0bGVCYXIuaGVpZ2h0ICsgXCJweFwiOyAvLyAnNTBweCc7XG5cbiAgZkFwci50aXRsZUJhckNvbG9yRGVmYXVsdCA9IHBhcmFtLnRpdGxlQmFyLmJhY2tncm91bmQ7XG4gIGZBcHIudGl0bGVCYXJDb2xvckZvY3VzZWQgPSBwYXJhbS50aXRsZUJhci5iYWNrZ3JvdW5kO1xuXG4gIGZBcHIudGl0bGVCYXJCb3JkZXJCb3R0b21EZWZhdWx0ID0gXCJzb2xpZCAwcHggI2FhYWFhYVwiO1xuICBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IFwic29saWQgMHB4ICMxODgzZDdcIjtcblxuICBmQXByLmZyYW1lQm9yZGVyUmFkaXVzID0gcGFyYW0uYm9yZGVyLnJhZGl1cyArIFwicHhcIjsgLy8gJzZweCc7XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IHBhcmFtLmJvcmRlci53aWR0aCArIFwicHhcIjtcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCA9IHBhcmFtLmJvcmRlci53aWR0aCArIFwicHhcIjtcblxuICAvL2JvcmRlciBjb2xvclxuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JEZWZhdWx0ID0gcGFyYW0uYm9yZGVyLmNvbG9yO1xuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gcGFyYW0uYm9yZGVyLmNvbG9yO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJTdHlsZSA9IFwic29saWRcIjtcblxuICAvL3dpbmRvdyBzaGFkb3dcbiAgZkFwci5mcmFtZUJveFNoYWRvdyA9IHBhcmFtLmJvcmRlci5zaGFkb3c7IC8vJzJweCAycHggMTBweCAgcmdiYSgwLCAwLCAwLCAwLjUpJztcblxuICBmQXByLmZyYW1lQmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xuXG4gIGZBcHIuZnJhbWVDb21wb25lbnRzID0gbmV3IEFycmF5KCk7XG5cbiAgZkFwci5mcmFtZUhlaWdodEFkanVzdCA9IDA7IC8vZGVmYXVsdCBpcyAxXG5cbiAgZkFwci5nZXRUaXRsZUJhclN0eWxlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmQXByLmZvY3VzZWRGcmFtZU9ubHkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDogXCIgXCIsXG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDogXCIgXCIsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6IFwiIFwiLFxuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQ6IFwiIFwiLFxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgZkFwci5vbkluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgYWxpZ25CdXR0b25zKGZBcHIsIHBhcmFtLCBmYWxzZSk7XG4gICAgYWxpZ25CdXR0b25zKGZBcHIsIHBhcmFtLCB0cnVlKTtcbiAgfTtcblxuICAvL1xuXG4gIHJldHVybiBmQXByO1xufVxuXG5mdW5jdGlvbiBhbGlnbkJ1dHRvbnMoZkFwciwgcGFyYW0sIGZyb21MZWZ0KSB7XG4gIHZhciBwYXJ0c0J1aWxkZXIgPSBmQXByLmdldFBhcnRzQnVpbGRlcigpO1xuICB2YXIgcmJ0WCA9IDA7XG4gIHZhciBidXR0b25zO1xuXG4gIGlmIChmcm9tTGVmdCkge1xuICAgIGJ1dHRvbnMgPSBwYXJhbS50aXRsZUJhci5idXR0b25zT25MZWZ0O1xuICB9IGVsc2Uge1xuICAgIGJ1dHRvbnMgPSBwYXJhbS50aXRsZUJhci5idXR0b25zO1xuICB9XG5cbiAgZm9yICh2YXIgcmJ0SWR4IGluIGJ1dHRvbnMpIHtcbiAgICB2YXIgcmJ0U3JjID0gYnV0dG9uc1tyYnRJZHhdO1xuXG4gICAgdmFyIHJidCA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b25BcHBlYXJhbmNlKCk7XG5cbiAgICAvL2NhcHRpb25cbiAgICByYnQuZmEgPSByYnRTcmMuZmE7XG5cbiAgICByYnQud2lkdGggPSBwYXJhbS50aXRsZUJhci5idXR0b25XaWR0aDtcbiAgICByYnQuaGVpZ2h0ID0gcGFyYW0udGl0bGVCYXIuYnV0dG9uSGVpZ2h0O1xuXG4gICAgcmJ0LmJvcmRlclJhZGl1cyA9IDA7XG4gICAgcmJ0LmJvcmRlcldpZHRoID0gMDtcblxuICAgIHJidC5ib3JkZXJDb2xvckRlZmF1bHQgPSBcIiNjNmM2YzZcIjtcbiAgICByYnQuYm9yZGVyQ29sb3JGb2N1c2VkID0gXCIjZmM2MTVjXCI7XG4gICAgcmJ0LmJvcmRlckNvbG9ySG92ZXJlZCA9IHJidC5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgcmJ0LmJvcmRlckNvbG9yUHJlc3NlZCA9IFwiI2U2NDg0MlwiO1xuXG4gICAgcmJ0LmJvcmRlclN0eWxlRGVmYXVsdCA9IFwic29saWRcIjtcbiAgICByYnQuYm9yZGVyU3R5bGVGb2N1c2VkID0gcmJ0LmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICByYnQuYm9yZGVyU3R5bGVIb3ZlcmVkID0gcmJ0LmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICByYnQuYm9yZGVyU3R5bGVQcmVzc2VkID0gcmJ0LmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgIC8vYmFja2dyb3VuZFxuICAgIHJidC5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIHJidC5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIHJidC5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIHJidC5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gXCJ0cmFuc3BhcmVudFwiO1xuXG4gICAgdmFyIGNvbG9ycyA9IGdldFN1YkNvbG9yKHBhcmFtLnRpdGxlQmFyLmJ1dHRvbkNvbG9yKTtcbiAgICByYnQuY2FwdGlvbkNvbG9yRGVmYXVsdCA9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbkNvbG9yO1xuICAgIHJidC5jYXB0aW9uQ29sb3JGb2N1c2VkID0gcGFyYW0udGl0bGVCYXIuYnV0dG9uQ29sb3I7XG4gICAgcmJ0LmNhcHRpb25Db2xvckhvdmVyZWQgPSBjb2xvcnMuaG92ZXJlZDtcbiAgICByYnQuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IGNvbG9ycy5wcmVzc2VkO1xuXG4gICAgcmJ0LmNhcHRpb25TaGlmdFlweCA9IDA7XG4gICAgcmJ0LmNhcHRpb25Gb250UmF0aW8gPSAxO1xuXG4gICAgdmFyIHJidEVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24ocmJ0KTtcblxuICAgIGlmIChyYnRTcmMudmlzaWJsZSkge1xuICAgICAgcmJ0RWxlLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZyb21MZWZ0KSB7XG4gICAgICAgIHJidFggLT0gcGFyYW0udGl0bGVCYXIuYnV0dG9uV2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYnRYICs9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbldpZHRoO1xuICAgICAgfVxuICAgICAgcmJ0RWxlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG5cbiAgICB2YXIgdGl0bGVCYXJIZWlnaHQgPSBwYXJzZUludChmQXByLnRpdGxlQmFySGVpZ2h0KTtcblxuICAgIHZhciByYnRFbGVMZWZ0ID0gcmJ0WDtcblxuICAgIC8vY29tcHV0ZSB2ZXJ0aWNhbCBjZW50ZXJcblxuICAgIHZhciByYnRFbGVUb3AgPSAtdGl0bGVCYXJIZWlnaHQgKyAodGl0bGVCYXJIZWlnaHQgLSByYnQuaGVpZ2h0KSAvIDI7XG5cbiAgICB2YXIgcmJ0RWxlQWxpZ247XG4gICAgaWYgKGZyb21MZWZ0KSB7XG4gICAgICByYnRFbGVBbGlnbiA9IFwiTEVGVF9UT1BcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmJ0RWxlQWxpZ24gPSBcIlJJR0hUX1RPUFwiO1xuICAgIH1cblxuICAgIHZhciBuZGl2O1xuICAgIGlmIChyYnRTcmMuY2hpbGRNZW51SFRNTCkge1xuICAgICAgbmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBuZGl2LmlkID0gcmJ0U3JjLm5hbWUgKyBcIl9jaGlsZF9tZW51XCI7XG5cbiAgICAgIG5kaXYuaW5uZXJIVE1MID0gcmJ0U3JjLmNoaWxkTWVudUhUTUw7XG4gICAgICBuZGl2LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgbmRpdi5zdHlsZS53aWR0aCA9IChyYnRTcmMuY2hpbGRNZW51V2lkdGggPyByYnRTcmMuY2hpbGRNZW51V2lkdGggOiAyMDApICtcbiAgICAgICAgXCJweFwiO1xuICAgICAgbmRpdi5zdHlsZS50b3AgPSAocGFyc2VJbnQocmJ0RWxlLnN0eWxlLnRvcCwgMTApICtcbiAgICAgICAgcGFyc2VJbnQocmJ0RWxlLnN0eWxlLmhlaWdodCwgMTApIC8gMiArIHRpdGxlQmFySGVpZ2h0IC8gMikgKyBcInB4XCI7XG4gICAgICBuZGl2LnN0eWxlLmxlZnQgPSByYnRFbGUuc3R5bGUubGVmdDtcbiAgICAgIG5kaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICByYnRFbGUuYXBwZW5kQ2hpbGQobmRpdik7XG4gICAgfVxuXG4gICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudChcbiAgICAgIHJidFNyYy5uYW1lLFxuICAgICAgcmJ0RWxlLFxuICAgICAgcmJ0RWxlTGVmdCxcbiAgICAgIHJidEVsZVRvcCxcbiAgICAgIHJidEVsZUFsaWduLFxuICAgICAgeyBjaGlsZE1lbnU6IG5kaXYgfSxcbiAgICApO1xuXG4gICAgaWYgKGZyb21MZWZ0KSB7XG4gICAgICByYnRYICs9IHBhcmFtLnRpdGxlQmFyLmJ1dHRvbldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByYnRYICs9IC1wYXJhbS50aXRsZUJhci5idXR0b25XaWR0aDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U3ViQ29sb3IoY29sb3IpIHtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy5oZWlnaHQgPSAxO1xuICBjYW52YXMud2lkdGggPSAxO1xuICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICBjdHguZmlsbFJlY3QoMCwgMCwgMSwgMSk7XG4gIHZhciBjb2xvckRhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpLmRhdGE7XG5cbiAgdmFyIHIgPSBjb2xvckRhdGFbMF07XG4gIHZhciBnID0gY29sb3JEYXRhWzFdO1xuICB2YXIgYiA9IGNvbG9yRGF0YVsyXTtcbiAgdmFyIGFscGhhID0gY29sb3JEYXRhWzNdIC8gMjU1O1xuICB2YXIgYWxwaGEyID0gYWxwaGEgKiAwLjg1O1xuICB2YXIgYWxwaGEzID0gYWxwaGEgKiAwLjc1O1xuXG4gIHZhciByZXQgPSBcInJnYihcIiArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyBcIixcIiArIGFscGhhMiArIFwiKVwiO1xuICB2YXIgcmV0MiA9IFwicmdiKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiLFwiICsgYWxwaGEyICsgXCIpXCI7XG4gIHZhciByZXQzID0gXCJyZ2IoXCIgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgXCIsXCIgKyBhbHBoYTMgKyBcIilcIjtcbiAgcmV0dXJuIHsgc3JjOiByZXQsIGhvdmVyZWQ6IHJldDIsIHByZXNzZWQ6IHJldDMgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0U3R5bGUgPSBnZXRTdHlsZTtcbiIsInJlcXVpcmUoXCIuL1ByZXNldFN0eWxlUG9wdXAuY3NzXCIpO1xuXG5mdW5jdGlvbiBnZXRTdHlsZShmQXByKSB7XG4gIGZBcHIuc2hvd1RpdGxlQmFyID0gZmFsc2U7XG4gIGZBcHIuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcblxuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gXCIxMnB4XCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodCA9IFwibm9ybWFsXCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9IFwiMTBweFwiO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdCA9IFwiIzRkNDk0ZFwiO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRm9jdXNlZCA9IFwiIzRkNDk0ZFwiO1xuXG4gIGZBcHIudGl0bGVCYXJIZWlnaHQgPSBcIjVweFwiO1xuXG4gIGZBcHIudGl0bGVCYXJDb2xvckRlZmF1bHQgPSBcIndoaXRlXCI7XG4gIGZBcHIudGl0bGVCYXJDb2xvckZvY3VzZWQgPSBcIndoaXRlXCI7XG5cbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbURlZmF1bHQgPSBudWxsO1xuICBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRm9jdXNlZCA9IG51bGw7XG5cbiAgZkFwci5mcmFtZUJvcmRlclJhZGl1cyA9IFwiNnB4XCI7XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IFwiMXB4XCI7XG4gIGZBcHIuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSBcIjFweFwiO1xuXG4gIC8vYm9yZGVyIGNvbG9yXG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQgPSBcIiNhYWFhYWFcIjtcbiAgZkFwci5mcmFtZUJvcmRlckNvbG9yRm9jdXNlZCA9IFwiI2FhYWFhYVwiO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJTdHlsZSA9IFwic29saWRcIjtcblxuICAvL3dpbmRvdyBzaGFkb3dcbiAgZkFwci5mcmFtZUJveFNoYWRvdyA9IFwiMnB4IDJweCA1cHggIHJnYmEoMCwgMCwgMCwgMC41KVwiO1xuXG4gIGZBcHIuZnJhbWVCYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCI7XG5cbiAgZkFwci5mcmFtZUNvbXBvbmVudHMgPSBuZXcgQXJyYXkoKTtcblxuICAvL2FkanVzdG1lbnQgdmFsdWVcbiAgZkFwci5mcmFtZUhlaWdodEFkanVzdCA9IDI7IC8vZGVmYXVsdCBpcyAxXG4gIGZBcHIuZ2V0VGl0bGVCYXJTdHlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZkFwci5mb2N1c2VkRnJhbWVPbmx5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6IFwianNmcmFtZS1wcmVzZXQtc3R5bGUtcG9wdXAtZm9jdXNlZFwiLFxuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQ6IFwianNmcmFtZS1wcmVzZXQtc3R5bGUtcG9wdXAtZm9jdXNlZFwiLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiBcImpzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWRlZmF1bHRcIixcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiBcImpzZnJhbWUtcHJlc2V0LXN0eWxlLXBvcHVwLWZvY3VzZWRcIixcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICBmQXByLm9uSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFydHNCdWlsZGVyID0gZkFwci5nZXRQYXJ0c0J1aWxkZXIoKTtcblxuICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICB2YXIgY3Jvc3NNYXJrMCA9IFwiXFx1Mjc0Y1wiO1xuICAgIHZhciBjcm9zc01hcmsxID0gXCJcXHUyNzE2XCI7XG4gICAgdmFyIGNyb3NzTWFyazIgPSBcIlxcdTI3NGVcIjtcbiAgICB2YXIgQ1JPU1NfTUFSSyA9IGNyb3NzTWFyazE7XG5cbiAgICB2YXIgY2JBcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgY2JBcHIud2lkdGggPSAyMDtcbiAgICBjYkFwci5oZWlnaHQgPSAyMDtcblxuICAgIGNiQXByLmJvcmRlclJhZGl1cyA9IDEwO1xuICAgIGNiQXByLmJvcmRlcldpZHRoID0gMTtcblxuICAgIGNiQXByLmJvcmRlckNvbG9yRGVmYXVsdCA9IFwiI2NjY2NjY1wiO1xuICAgIGNiQXByLmJvcmRlckNvbG9yRm9jdXNlZCA9IFwiI2NjY2NjY1wiO1xuICAgIGNiQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IFwiI2RkZGRkZFwiO1xuICAgIGNiQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9IFwiI2VlZWVlZVwiO1xuXG4gICAgY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gXCJzb2xpZFwiO1xuICAgIGNiQXByLmJvcmRlclN0eWxlRm9jdXNlZCA9IGNiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICBjYkFwci5ib3JkZXJTdHlsZUhvdmVyZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgY2JBcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgLy9iYWNrZ3JvdW5kXG4gICAgY2JBcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IFwid2hpdGVcIjtcbiAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gXCJ3aGl0ZVwiO1xuICAgIGNiQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBcIiNlZWVlZWVcIjtcbiAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gXCIjZGRkZGRkXCI7XG5cbiAgICBjYkFwci5iYWNrZ3JvdW5kQm94U2hhZG93ID0gXCIycHggMnB4IDVweCAgcmdiYSgwLCAwLCAwLCAwLjUpXCI7XG5cbiAgICAvL2NhcHRpb25cbiAgICBjYkFwci5jYXB0aW9uID0gQ1JPU1NfTUFSSztcblxuICAgIGNiQXByLmNhcHRpb25Db2xvckRlZmF1bHQgPSBcImJsYWNrXCI7XG4gICAgY2JBcHIuY2FwdGlvbkNvbG9yRm9jdXNlZCA9IFwiYmxhY2tcIjtcbiAgICBjYkFwci5jYXB0aW9uQ29sb3JIb3ZlcmVkID0gXCJ3aGl0ZVwiO1xuICAgIGNiQXByLmNhcHRpb25Db2xvclByZXNzZWQgPSBcIndoaXRlXCI7XG5cbiAgICBjYkFwci5jYXB0aW9uU2hpZnRZcHggPSAxO1xuICAgIGNiQXByLmNhcHRpb25Gb250UmF0aW8gPSAwLjY7XG5cbiAgICB2YXIgY2xvc2VCdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uKGNiQXByKTtcbiAgICB2YXIgZWxlTGVmdCA9IDEwO1xuICAgIHZhciBlbGVUb3AgPSAtNiAtIHBhcnNlSW50KGZBcHIudGl0bGVCYXJIZWlnaHQpO1xuICAgIHZhciBlbGVBbGlnbiA9IFwiUklHSFRfVE9QXCI7XG5cbiAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudChcbiAgICAgIFwiY2xvc2VCdXR0b25cIixcbiAgICAgIGNsb3NlQnRuRWxlLFxuICAgICAgZWxlTGVmdCxcbiAgICAgIGVsZVRvcCxcbiAgICAgIGVsZUFsaWduLFxuICAgICk7XG5cbiAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtlbmRdLy8vLy8vLy8vLy8vLy9cbiAgfTtcbiAgLy9cblxuICByZXR1cm4gZkFwcjtcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0U3R5bGUgPSBnZXRTdHlsZTtcbiIsInJlcXVpcmUoXCIuL1ByZXNldFN0eWxlUmVkc3RvbmUuY3NzXCIpO1xuXG5mdW5jdGlvbiBnZXRTdHlsZShmQXByKSB7XG4gIGZBcHIuc2hvd1RpdGxlQmFyID0gdHJ1ZTtcbiAgZkFwci5zaG93Q2xvc2VCdXR0b24gPSB0cnVlO1xuXG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFNpemUgPSBcIjEycHhcIjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25Gb250V2VpZ2h0ID0gXCJub3JtYWxcIjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25MZWZ0TWFyZ2luID0gXCIxMHB4XCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JEZWZhdWx0ID0gXCIjOWI5YTliXCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JGb2N1c2VkID0gXCIjNGQ0OTRkXCI7XG5cbiAgZkFwci50aXRsZUJhckhlaWdodCA9IFwiMzBweFwiO1xuXG4gIGZBcHIudGl0bGVCYXJDb2xvckRlZmF1bHQgPSBudWxsO1xuICBmQXByLnRpdGxlQmFyQ29sb3JGb2N1c2VkID0gbnVsbDtcblxuICBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdCA9IFwic29saWQgMXB4ICNhYWFhYWFcIjtcbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQgPSBcInNvbGlkIDFweCAjMTg4M2Q3XCI7XG5cbiAgZkFwci5mcmFtZUJvcmRlclJhZGl1cyA9IFwiMHB4XCI7XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IFwiMXB4XCI7XG4gIGZBcHIuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSBcIjFweFwiO1xuXG4gIC8vYm9yZGVyIGNvbG9yXG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQgPSBcIiNhYWFhYWFcIjtcbiAgZkFwci5mcmFtZUJvcmRlckNvbG9yRm9jdXNlZCA9IFwiIzE4ODNkN1wiO1xuXG4gIGZBcHIuZnJhbWVCb3JkZXJTdHlsZSA9IFwic29saWRcIjtcblxuICAvL3dpbmRvdyBzaGFkb3dcbiAgZkFwci5mcmFtZUJveFNoYWRvdyA9IG51bGw7XG5cbiAgZkFwci5mcmFtZUJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcblxuICBmQXByLmZyYW1lQ29tcG9uZW50cyA9IG5ldyBBcnJheSgpO1xuXG4gIC8vYWRqdXN0bWVudCB2YWx1ZVxuICBmQXByLmZyYW1lSGVpZ2h0QWRqdXN0ID0gMDsgLy9kZWZhdWx0IGlzIDFcblxuICBmQXByLmdldFRpdGxlQmFyU3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGZBcHIuZm9jdXNlZEZyYW1lT25seSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiBcImpzZnJhbWUtcHJlc2V0LXN0eWxlLXJlZHN0b25lLWZvY3VzZWRcIixcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiBcImpzZnJhbWUtcHJlc2V0LXN0eWxlLXJlZHN0b25lLWZvY3VzZWRcIixcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDogXCJqc2ZyYW1lLXByZXNldC1zdHlsZS1yZWRzdG9uZS1kZWZhdWx0XCIsXG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDogXCJqc2ZyYW1lLXByZXNldC1zdHlsZS1yZWRzdG9uZS1mb2N1c2VkXCIsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICBmQXByLm9uSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFydHNCdWlsZGVyID0gZkFwci5nZXRQYXJ0c0J1aWxkZXIoKTtcblxuICAgIHtcbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIHZhciBDUk9TU19NQVJLID0gXCJcXHUyNTczXCI7XG5cbiAgICAgIHZhciBjYkFwciA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b25BcHBlYXJhbmNlKCk7XG5cbiAgICAgIGNiQXByLndpZHRoID0gNDU7XG4gICAgICBjYkFwci5oZWlnaHQgPSAyODtcblxuICAgICAgY2JBcHIuYm9yZGVyUmFkaXVzID0gMDtcbiAgICAgIGNiQXByLmJvcmRlcldpZHRoID0gMDtcblxuICAgICAgY2JBcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gXCIjYzZjNmM2XCI7XG4gICAgICBjYkFwci5ib3JkZXJDb2xvckZvY3VzZWQgPSBcIiNmYzYxNWNcIjtcbiAgICAgIGNiQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IGNiQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIGNiQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9IFwiI2U2NDg0MlwiO1xuXG4gICAgICBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQgPSBcInNvbGlkXCI7XG4gICAgICBjYkFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBjYkFwci5ib3JkZXJTdHlsZUhvdmVyZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBjYkFwci5ib3JkZXJTdHlsZVByZXNzZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG5cbiAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgY2JBcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IFwid2hpdGVcIjtcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSBcIndoaXRlXCI7XG4gICAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gXCIjZTgxMTIzXCI7XG4gICAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gXCIjZjE3MDdhXCI7XG5cbiAgICAgIC8vY2FwdGlvblxuICAgICAgY2JBcHIuY2FwdGlvbiA9IENST1NTX01BUks7XG5cbiAgICAgIGNiQXByLmNhcHRpb25Db2xvckRlZmF1bHQgPSBcIiM5YjlhOWJcIjtcbiAgICAgIGNiQXByLmNhcHRpb25Db2xvckZvY3VzZWQgPSBcImJsYWNrXCI7XG4gICAgICBjYkFwci5jYXB0aW9uQ29sb3JIb3ZlcmVkID0gXCJ3aGl0ZVwiO1xuICAgICAgY2JBcHIuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IFwid2hpdGVcIjtcblxuICAgICAgY2JBcHIuY2FwdGlvblNoaWZ0WXB4ID0gMTtcbiAgICAgIGNiQXByLmNhcHRpb25Gb250UmF0aW8gPSAwLjY7XG5cbiAgICAgIHZhciBjbG9zZUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24oY2JBcHIpO1xuICAgICAgdmFyIGVsZUxlZnQgPSAwO1xuICAgICAgdmFyIGVsZVRvcCA9IC1wYXJzZUludChmQXByLnRpdGxlQmFySGVpZ2h0KTtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiUklHSFRfVE9QXCI7XG5cbiAgICAgIC8vICdjbG9zZUJ1dHRvbicgaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoXG4gICAgICAgIFwiY2xvc2VCdXR0b25cIixcbiAgICAgICAgY2xvc2VCdG5FbGUsXG4gICAgICAgIGVsZUxlZnQsXG4gICAgICAgIGVsZVRvcCxcbiAgICAgICAgZWxlQWxpZ24sXG4gICAgICApO1xuXG4gICAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtlbmRdLy8vLy8vLy8vLy8vLy9cbiAgICB9XG5cbiAgICB7XG4gICAgICAvL2NvbmZpZ3VyZSBjbG9zZSBidXR0b24gYXBwZWFyYW5jZVtiZWdpbl0vLy8vLy8vLy8vLy8vL1xuXG4gICAgICB2YXIgTUFYSU1JWkVfTUFSSyA9IFwiXFx1MjYxMFwiO1xuXG4gICAgICB2YXIgbWF4QXByID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKTtcblxuICAgICAgbWF4QXByLndpZHRoID0gNDU7XG4gICAgICBtYXhBcHIuaGVpZ2h0ID0gMjg7XG5cbiAgICAgIG1heEFwci5ib3JkZXJSYWRpdXMgPSAwO1xuICAgICAgbWF4QXByLmJvcmRlcldpZHRoID0gMDtcblxuICAgICAgbWF4QXByLmJvcmRlckNvbG9yRGVmYXVsdCA9IFwiI2M2YzZjNlwiO1xuICAgICAgbWF4QXByLmJvcmRlckNvbG9yRm9jdXNlZCA9IFwiI2ZjNjE1Y1wiO1xuICAgICAgbWF4QXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IG1heEFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBtYXhBcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gXCIjZTY0ODQyXCI7XG5cbiAgICAgIG1heEFwci5ib3JkZXJTdHlsZURlZmF1bHQgPSBcInNvbGlkXCI7XG4gICAgICBtYXhBcHIuYm9yZGVyU3R5bGVGb2N1c2VkID0gbWF4QXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICAgIG1heEFwci5ib3JkZXJTdHlsZUhvdmVyZWQgPSBtYXhBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgbWF4QXByLmJvcmRlclN0eWxlUHJlc3NlZCA9IG1heEFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG5cbiAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgbWF4QXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSBcIndoaXRlXCI7XG4gICAgICBtYXhBcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9IFwid2hpdGVcIjtcbiAgICAgIG1heEFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gXCIjZTVlNWU1XCI7XG4gICAgICBtYXhBcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IFwiI2NjY2NjY1wiO1xuXG4gICAgICAvL2NhcHRpb25cbiAgICAgIG1heEFwci5jYXB0aW9uID0gTUFYSU1JWkVfTUFSSztcblxuICAgICAgbWF4QXByLmNhcHRpb25Db2xvckRlZmF1bHQgPSBcIiM5YjlhOWJcIjtcbiAgICAgIG1heEFwci5jYXB0aW9uQ29sb3JGb2N1c2VkID0gXCJibGFja1wiO1xuICAgICAgbWF4QXByLmNhcHRpb25Db2xvckhvdmVyZWQgPSBcImJsYWNrXCI7XG4gICAgICBtYXhBcHIuY2FwdGlvbkNvbG9yUHJlc3NlZCA9IFwiYmxhY2tcIjtcblxuICAgICAgbWF4QXByLmNhcHRpb25TaGlmdFlweCA9IDE7XG4gICAgICBtYXhBcHIuY2FwdGlvbkZvbnRSYXRpbyA9IDAuNTU7XG5cbiAgICAgIHZhciBtYXhCdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uKG1heEFwcik7XG4gICAgICB2YXIgZWxlTGVmdCA9IC00NjtcbiAgICAgIHZhciBlbGVUb3AgPSAtcGFyc2VJbnQoZkFwci50aXRsZUJhckhlaWdodCk7XG4gICAgICB2YXIgZWxlQWxpZ24gPSBcIlJJR0hUX1RPUFwiO1xuXG4gICAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgICBmQXByLmFkZEZyYW1lQ29tcG9uZW50KFxuICAgICAgICBcIm1heGltaXplQnV0dG9uXCIsXG4gICAgICAgIG1heEJ0bkVsZSxcbiAgICAgICAgZWxlTGVmdCxcbiAgICAgICAgZWxlVG9wLFxuICAgICAgICBlbGVBbGlnbixcbiAgICAgICk7XG5cbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2VuZF0vLy8vLy8vLy8vLy8vL1xuICAgIH1cblxuICAgIHtcbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIHZhciBNSU5JTUlaRV9NQVJLID0gXCJcXHVmZjNmXCI7XG5cbiAgICAgIHZhciBtaW5BcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgICBtaW5BcHIud2lkdGggPSA0NTtcbiAgICAgIG1pbkFwci5oZWlnaHQgPSAyODtcblxuICAgICAgbWluQXByLmJvcmRlclJhZGl1cyA9IDA7XG4gICAgICBtaW5BcHIuYm9yZGVyV2lkdGggPSAwO1xuXG4gICAgICBtaW5BcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gXCIjYzZjNmM2XCI7XG4gICAgICBtaW5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gXCIjZmM2MTVjXCI7XG4gICAgICBtaW5BcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gbWluQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIG1pbkFwci5ib3JkZXJDb2xvclByZXNzZWQgPSBcIiNlNjQ4NDJcIjtcblxuICAgICAgbWluQXByLmJvcmRlclN0eWxlRGVmYXVsdCA9IFwic29saWRcIjtcbiAgICAgIG1pbkFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBtaW5BcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgbWluQXByLmJvcmRlclN0eWxlSG92ZXJlZCA9IG1pbkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBtaW5BcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gbWluQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICBtaW5BcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IFwid2hpdGVcIjtcbiAgICAgIG1pbkFwci5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gXCJ3aGl0ZVwiO1xuICAgICAgbWluQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBcIiNlNWU1ZTVcIjtcbiAgICAgIG1pbkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gXCIjY2NjY2NjXCI7XG5cbiAgICAgIC8vY2FwdGlvblxuICAgICAgbWluQXByLmNhcHRpb24gPSBNSU5JTUlaRV9NQVJLO1xuXG4gICAgICBtaW5BcHIuY2FwdGlvbkNvbG9yRGVmYXVsdCA9IFwiIzliOWE5YlwiO1xuICAgICAgbWluQXByLmNhcHRpb25Db2xvckZvY3VzZWQgPSBcImJsYWNrXCI7XG4gICAgICBtaW5BcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9IFwiYmxhY2tcIjtcbiAgICAgIG1pbkFwci5jYXB0aW9uQ29sb3JQcmVzc2VkID0gXCJibGFja1wiO1xuXG4gICAgICBtaW5BcHIuY2FwdGlvblNoaWZ0WXB4ID0gLTI7XG4gICAgICBtaW5BcHIuY2FwdGlvbkZvbnRSYXRpbyA9IDAuMztcblxuICAgICAgdmFyIG1pbkJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b24obWluQXByKTtcbiAgICAgIHZhciBlbGVMZWZ0ID0gLTkyO1xuICAgICAgdmFyIGVsZVRvcCA9IC1wYXJzZUludChmQXByLnRpdGxlQmFySGVpZ2h0KTtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiUklHSFRfVE9QXCI7XG5cbiAgICAgIC8vICdjbG9zZUJ1dHRvbicgaXMgYSBzcGVjaWFsIG5hbWVcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoXG4gICAgICAgIFwibWluaW1pemVCdXR0b25cIixcbiAgICAgICAgbWluQnRuRWxlLFxuICAgICAgICBlbGVMZWZ0LFxuICAgICAgICBlbGVUb3AsXG4gICAgICAgIGVsZUFsaWduLFxuICAgICAgKTtcblxuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbZW5kXS8vLy8vLy8vLy8vLy8vXG4gICAgfVxuICAgIHtcbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIHZhciBkZW1pbkFwciA9IHBhcnRzQnVpbGRlci5idWlsZFRleHRCdXR0b25BcHBlYXJhbmNlKCk7XG5cbiAgICAgIGRlbWluQXByLndpZHRoID0gNDU7XG4gICAgICBkZW1pbkFwci5oZWlnaHQgPSAyODtcblxuICAgICAgZGVtaW5BcHIuYm9yZGVyUmFkaXVzID0gMDtcbiAgICAgIGRlbWluQXByLmJvcmRlcldpZHRoID0gMDtcblxuICAgICAgZGVtaW5BcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gXCIjYzZjNmM2XCI7XG4gICAgICBkZW1pbkFwci5ib3JkZXJDb2xvckZvY3VzZWQgPSBcIiNmYzYxNWNcIjtcbiAgICAgIGRlbWluQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IGRlbWluQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIGRlbWluQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9IFwiI2U2NDg0MlwiO1xuXG4gICAgICBkZW1pbkFwci5ib3JkZXJTdHlsZURlZmF1bHQgPSBcInNvbGlkXCI7XG4gICAgICBkZW1pbkFwci5ib3JkZXJTdHlsZUZvY3VzZWQgPSBkZW1pbkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBkZW1pbkFwci5ib3JkZXJTdHlsZUhvdmVyZWQgPSBkZW1pbkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgICBkZW1pbkFwci5ib3JkZXJTdHlsZVByZXNzZWQgPSBkZW1pbkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG5cbiAgICAgIC8vYmFja2dyb3VuZFxuICAgICAgZGVtaW5BcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IFwid2hpdGVcIjtcbiAgICAgIGRlbWluQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSBcIndoaXRlXCI7XG4gICAgICBkZW1pbkFwci5iYWNrZ3JvdW5kQ29sb3JIb3ZlcmVkID0gXCIjZTVlNWU1XCI7XG4gICAgICBkZW1pbkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gXCIjY2NjY2NjXCI7XG5cbiAgICAgIC8vY2FwdGlvblxuICAgICAgZGVtaW5BcHIuY2FwdGlvbiA9IFwiXFx1MjVBM1wiO1xuXG4gICAgICBkZW1pbkFwci5jYXB0aW9uQ29sb3JEZWZhdWx0ID0gXCIjOWI5YTliXCI7XG4gICAgICBkZW1pbkFwci5jYXB0aW9uQ29sb3JGb2N1c2VkID0gXCJibGFja1wiO1xuICAgICAgZGVtaW5BcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9IFwiYmxhY2tcIjtcbiAgICAgIGRlbWluQXByLmNhcHRpb25Db2xvclByZXNzZWQgPSBcImJsYWNrXCI7XG5cbiAgICAgIGRlbWluQXByLmNhcHRpb25TaGlmdFlweCA9IDE7XG4gICAgICBkZW1pbkFwci5jYXB0aW9uRm9udFJhdGlvID0gMC42O1xuXG4gICAgICB2YXIgZGVtaW5CdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uKGRlbWluQXByKTtcbiAgICAgIHZhciBlbGVMZWZ0ID0gLTkyO1xuICAgICAgdmFyIGVsZVRvcCA9IC1wYXJzZUludChmQXByLnRpdGxlQmFySGVpZ2h0KTtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiUklHSFRfVE9QXCI7XG5cbiAgICAgIGRlbWluQnRuRWxlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgLy8gJ2Nsb3NlQnV0dG9uJyBpcyBhIHNwZWNpYWwgbmFtZVxuICAgICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudChcbiAgICAgICAgXCJkZW1pbmltaXplQnV0dG9uXCIsXG4gICAgICAgIGRlbWluQnRuRWxlLFxuICAgICAgICBlbGVMZWZ0LFxuICAgICAgICBlbGVUb3AsXG4gICAgICAgIGVsZUFsaWduLFxuICAgICAgKTtcblxuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbZW5kXS8vLy8vLy8vLy8vLy8vXG4gICAgfVxuICAgIHtcbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIHZhciBSRVNUT1JFX01BUksgPSBcIlxcdTI3NEZcIjtcblxuICAgICAgdmFyIHJiQXByID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbkFwcGVhcmFuY2UoKTtcblxuICAgICAgcmJBcHIud2lkdGggPSA0NTtcbiAgICAgIHJiQXByLmhlaWdodCA9IDI4O1xuXG4gICAgICByYkFwci5ib3JkZXJSYWRpdXMgPSAwO1xuICAgICAgcmJBcHIuYm9yZGVyV2lkdGggPSAwO1xuXG4gICAgICByYkFwci5ib3JkZXJDb2xvckRlZmF1bHQgPSBcIiNjNmM2YzZcIjtcbiAgICAgIHJiQXByLmJvcmRlckNvbG9yRm9jdXNlZCA9IFwiI2ZjNjE1Y1wiO1xuICAgICAgcmJBcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gcmJBcHIuYm9yZGVyQ29sb3JGb2N1c2VkO1xuICAgICAgcmJBcHIuYm9yZGVyQ29sb3JQcmVzc2VkID0gXCIjZTY0ODQyXCI7XG5cbiAgICAgIHJiQXByLmJvcmRlclN0eWxlRGVmYXVsdCA9IFwic29saWRcIjtcbiAgICAgIHJiQXByLmJvcmRlclN0eWxlRm9jdXNlZCA9IHJiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICAgIHJiQXByLmJvcmRlclN0eWxlSG92ZXJlZCA9IHJiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICAgIHJiQXByLmJvcmRlclN0eWxlUHJlc3NlZCA9IHJiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcblxuICAgICAgLy9iYWNrZ3JvdW5kXG4gICAgICByYkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gXCJ3aGl0ZVwiO1xuICAgICAgcmJBcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9IFwid2hpdGVcIjtcbiAgICAgIHJiQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBcIiNlNWU1ZTVcIjtcbiAgICAgIHJiQXByLmJhY2tncm91bmRDb2xvclByZXNzZWQgPSBcIiNjY2NjY2NcIjtcblxuICAgICAgLy9jYXB0aW9uXG4gICAgICByYkFwci5jYXB0aW9uID0gUkVTVE9SRV9NQVJLO1xuXG4gICAgICByYkFwci5jYXB0aW9uQ29sb3JEZWZhdWx0ID0gXCIjOWI5YTliXCI7XG4gICAgICByYkFwci5jYXB0aW9uQ29sb3JGb2N1c2VkID0gXCJibGFja1wiO1xuICAgICAgcmJBcHIuY2FwdGlvbkNvbG9ySG92ZXJlZCA9IFwiYmxhY2tcIjtcbiAgICAgIHJiQXByLmNhcHRpb25Db2xvclByZXNzZWQgPSBcImJsYWNrXCI7XG5cbiAgICAgIHJiQXByLmNhcHRpb25TaGlmdFlweCA9IDE7XG4gICAgICByYkFwci5jYXB0aW9uRm9udFJhdGlvID0gMC41NTtcblxuICAgICAgdmFyIHJlc3RvcmVCdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uKHJiQXByKTtcbiAgICAgIHZhciBlbGVMZWZ0ID0gLTQ2O1xuICAgICAgdmFyIGVsZVRvcCA9IC1wYXJzZUludChmQXByLnRpdGxlQmFySGVpZ2h0KTtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiUklHSFRfVE9QXCI7XG5cbiAgICAgIHJlc3RvcmVCdG5FbGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgICBmQXByLmFkZEZyYW1lQ29tcG9uZW50KFxuICAgICAgICBcInJlc3RvcmVCdXR0b25cIixcbiAgICAgICAgcmVzdG9yZUJ0bkVsZSxcbiAgICAgICAgZWxlTGVmdCxcbiAgICAgICAgZWxlVG9wLFxuICAgICAgICBlbGVBbGlnbixcbiAgICAgICk7XG5cbiAgICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2VuZF0vLy8vLy8vLy8vLy8vL1xuICAgIH1cbiAgfTtcbiAgLy9cblxuICByZXR1cm4gZkFwcjtcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0U3R5bGUgPSBnZXRTdHlsZTtcbiIsImZ1bmN0aW9uIGdldFN0eWxlKGZBcHIpIHtcbiAgZkFwci5zaG93VGl0bGVCYXIgPSBmYWxzZTtcbiAgZkFwci5zaG93Q2xvc2VCdXR0b24gPSB0cnVlO1xuXG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFNpemUgPSBcIjBweFwiO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRXZWlnaHQgPSBcIm5vcm1hbFwiO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkxlZnRNYXJnaW4gPSBcIjBweFwiO1xuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkNvbG9yRGVmYXVsdCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgZkFwci50aXRsZUJhckNhcHRpb25Db2xvckZvY3VzZWQgPSBcInRyYW5zcGFyZW50XCI7XG5cbiAgZkFwci50aXRsZUJhckhlaWdodCA9IFwiMHB4XCI7XG5cbiAgZkFwci50aXRsZUJhckNvbG9yRGVmYXVsdCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgZkFwci50aXRsZUJhckNvbG9yRm9jdXNlZCA9IFwidHJhbnNwYXJlbnRcIjtcblxuICBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdCA9IG51bGw7XG4gIGZBcHIudGl0bGVCYXJCb3JkZXJCb3R0b21Gb2N1c2VkID0gbnVsbDtcblxuICBmQXByLmZyYW1lQm9yZGVyUmFkaXVzID0gXCIxMHB4XCI7XG5cbiAgLy9ib3JkZXIgd2lkdGhcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IFwiMHB4XCI7XG4gIGZBcHIuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQgPSBcIjBweFwiO1xuXG4gIC8vYm9yZGVyIGNvbG9yXG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckRlZmF1bHQgPSBcInRyYW5zcGFyZW50XCI7XG4gIGZBcHIuZnJhbWVCb3JkZXJDb2xvckZvY3VzZWQgPSBcInRyYW5zcGFyZW50XCI7XG4gIGZBcHIuZnJhbWVCb3JkZXJTdHlsZSA9IFwic29saWRcIjtcbiAgZkFwci5mcmFtZUJveFNoYWRvdyA9IFwiMnB4IDJweCAxNXB4ICByZ2JhKDAsIDAsIDAsIDAuNSlcIjtcbiAgZkFwci5mcmFtZUJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcblxuICBmQXByLmZyYW1lQ29tcG9uZW50cyA9IFtdO1xuICBmQXByLmZyYW1lSGVpZ2h0QWRqdXN0ID0gMTsgLy9kZWZhdWx0IGlzIDFcblxuICBmQXByLmNhcHRpb25DbG9yID0gXCJkYXJrZ3JheVwiO1xuXG4gIGZBcHIucHVsbFVwRGlzYWJsZWQgPSBmYWxzZTtcblxuICBmQXByLmdldFRpdGxlQmFyU3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGZBcHIuZm9jdXNlZEZyYW1lT25seSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiBcIiBcIixcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiBcIiBcIixcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRGVmYXVsdDogXCIgXCIsXG4gICAgICAgIHRpdGxlQmFyQ2xhc3NOYW1lRm9jdXNlZDogXCIgXCIsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICBmQXByLm9uSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFydHNCdWlsZGVyID0gZkFwci5nZXRQYXJ0c0J1aWxkZXIoKTtcblxuICAgIC8vY29uZmlndXJlIGNsb3NlIGJ1dHRvbiBhcHBlYXJhbmNlW2JlZ2luXS8vLy8vLy8vLy8vLy8vXG5cbiAgICB2YXIgY3Jvc3NNYXJrMCA9IFwiXFx1Mjc0Y1wiO1xuICAgIHZhciBjcm9zc01hcmsxID0gXCJcXHUyNzE2XCI7XG4gICAgdmFyIGNyb3NzTWFyazIgPSBcIlxcdTI3NGVcIjtcbiAgICB2YXIgQ1JPU1NfTUFSSyA9IGNyb3NzTWFyazE7XG5cbiAgICB2YXIgY2JBcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRUZXh0QnV0dG9uQXBwZWFyYW5jZSgpO1xuXG4gICAgY2JBcHIud2lkdGggPSAyMDtcbiAgICBjYkFwci5oZWlnaHQgPSAyMDtcblxuICAgIGNiQXByLmJvcmRlclJhZGl1cyA9IDEwO1xuICAgIGNiQXByLmJvcmRlcldpZHRoID0gMDtcblxuICAgIGNiQXByLmJvcmRlckNvbG9yRGVmYXVsdCA9IFwiI2NjY2NjY1wiO1xuICAgIGNiQXByLmJvcmRlckNvbG9yRm9jdXNlZCA9IFwiI2NjY2NjY1wiO1xuICAgIGNiQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IFwiI2RkZGRkZFwiO1xuICAgIGNiQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9IFwiI2VlZWVlZVwiO1xuXG4gICAgY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gXCJzb2xpZFwiO1xuICAgIGNiQXByLmJvcmRlclN0eWxlRm9jdXNlZCA9IGNiQXByLmJvcmRlclN0eWxlRGVmYXVsdDtcbiAgICBjYkFwci5ib3JkZXJTdHlsZUhvdmVyZWQgPSBjYkFwci5ib3JkZXJTdHlsZURlZmF1bHQ7XG4gICAgY2JBcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgLy9iYWNrZ3JvdW5kXG4gICAgY2JBcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICBjYkFwci5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgIGNiQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBcInRyYW5zcGFyZW50XCI7XG4gICAgY2JBcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IFwidHJhbnNwYXJlbnRcIjtcblxuICAgIGNiQXByLmJhY2tncm91bmRCb3hTaGFkb3cgPSBudWxsOyAvLyAnMnB4IDJweCA1cHggIHJnYmEoMCwgMCwgMCwgMC41KSc7XG5cbiAgICAvL2NhcHRpb25cbiAgICBjYkFwci5jYXB0aW9uID0gQ1JPU1NfTUFSSztcblxuICAgIGNiQXByLmNhcHRpb25Db2xvckRlZmF1bHQgPSBmQXByLmNhcHRpb25DbG9yO1xuICAgIGNiQXByLmNhcHRpb25Db2xvckZvY3VzZWQgPSBmQXByLmNhcHRpb25DbG9yO1xuICAgIGNiQXByLmNhcHRpb25Db2xvckhvdmVyZWQgPSBmQXByLmNhcHRpb25DbG9yO1xuICAgIGNiQXByLmNhcHRpb25Db2xvclByZXNzZWQgPSBmQXByLmNhcHRpb25DbG9yO1xuXG4gICAgY2JBcHIuY2FwdGlvblNoaWZ0WXB4ID0gMTtcbiAgICBjYkFwci5jYXB0aW9uRm9udFJhdGlvID0gMC42O1xuXG4gICAgdmFyIGNsb3NlQnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkVGV4dEJ1dHRvbihjYkFwcik7XG4gICAgdmFyIGVsZUxlZnQgPSAtNjtcbiAgICB2YXIgZWxlVG9wID0gMztcbiAgICB2YXIgZWxlQWxpZ24gPSBcIlJJR0hUX1RPUFwiO1xuXG4gICAgLy8gJ2Nsb3NlQnV0dG9uJyBpcyBhIHNwZWNpYWwgbmFtZVxuICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoXG4gICAgICBcImNsb3NlQnV0dG9uXCIsXG4gICAgICBjbG9zZUJ0bkVsZSxcbiAgICAgIGVsZUxlZnQsXG4gICAgICBlbGVUb3AsXG4gICAgICBlbGVBbGlnbixcbiAgICApO1xuXG4gICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbZW5kXS8vLy8vLy8vLy8vLy8vXG4gIH07XG4gIC8vXG5cbiAgcmV0dXJuIGZBcHI7XG59XG5cbm1vZHVsZS5leHBvcnRzLmdldFN0eWxlID0gZ2V0U3R5bGU7XG4iLCJyZXF1aXJlKFwiLi9QcmVzZXRTdHlsZVlvc2VtaXRlLmNzc1wiKTtcbnZhciBPYmplY3RBc3NpZ25lciA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9PYmplY3RBc3NpZ25lci5qc1wiKTtcblxuZnVuY3Rpb24gZ2V0U3R5bGUoZkFwciwgdXNlclBhcmFtKSB7XG4gIHZhciBzcmNQYXJhbSA9IHtcbiAgICB0aXRsZUJhcjoge1xuICAgICAgZ3JlZW5CdXR0b246IFwibWF4aW1pemVcIiwgLy8nbWF4aW1pemUnIG9yICdmdWxsc2NyZWVuJ1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIHBhcmFtID0gc3JjUGFyYW07XG5cbiAgaWYgKHVzZXJQYXJhbSkge1xuICAgIC8vcGFyYW09T2JqZWN0LmFzc2lnbih7fSxzcmNQYXJhbSwgdXNlclBhcmFtKTtcbiAgICBPYmplY3RBc3NpZ25lci5vYmplY3RBc3NpZ24oc3JjUGFyYW0sIHVzZXJQYXJhbSk7XG4gIH1cblxuICBmQXByLnNob3dUaXRsZUJhciA9IHRydWU7XG4gIGZBcHIuc2hvd0Nsb3NlQnV0dG9uID0gdHJ1ZTtcblxuICBmQXByLnRpdGxlQmFyQ2FwdGlvbkZvbnRTaXplID0gXCIxMXB4XCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uRm9udFdlaWdodCA9IFwibm9ybWFsXCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uTGVmdE1hcmdpbiA9IG51bGw7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JEZWZhdWx0ID0gXCIjNGQ0OTRkXCI7XG4gIGZBcHIudGl0bGVCYXJDYXB0aW9uQ29sb3JGb2N1c2VkID0gXCIjNGQ0OTRkXCI7XG5cbiAgZkFwci50aXRsZUJhckhlaWdodCA9IFwiMjZweFwiO1xuXG4gIGZBcHIudGl0bGVCYXJDb2xvckRlZmF1bHQgPSBudWxsO1xuICBmQXByLnRpdGxlQmFyQ29sb3JGb2N1c2VkID0gbnVsbDtcblxuICBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdCA9IFwiMXB4IHNvbGlkICNiMWFlYjFcIjtcbiAgZkFwci50aXRsZUJhckJvcmRlckJvdHRvbUZvY3VzZWQgPSBmQXByLnRpdGxlQmFyQm9yZGVyQm90dG9tRGVmYXVsdDtcblxuICBmQXByLmZyYW1lQm9yZGVyUmFkaXVzID0gXCI2cHhcIjtcblxuICAvL2JvcmRlciB3aWR0aFxuICBmQXByLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gXCIxcHhcIjtcbiAgZkFwci5mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCA9IFwiMXB4XCI7XG5cbiAgLy9ib3JkZXIgY29sb3JcbiAgZkFwci5mcmFtZUJvcmRlckNvbG9yRGVmYXVsdCA9IFwiI2FjYWNhY1wiO1xuICBmQXByLmZyYW1lQm9yZGVyQ29sb3JGb2N1c2VkID0gXCIjYWNhY2FjXCI7XG5cbiAgZkFwci5mcmFtZUJvcmRlclN0eWxlID0gXCJzb2xpZFwiO1xuXG4gIC8vd2luZG93IHNoYWRvd1xuICBmQXByLmZyYW1lQm94U2hhZG93ID0gXCIwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjMpXCI7XG5cbiAgZkFwci5mcmFtZUJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcblxuICBmQXByLmZyYW1lQ29tcG9uZW50cyA9IG5ldyBBcnJheSgpO1xuXG4gIGZBcHIuZ2V0VGl0bGVCYXJTdHlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZkFwci5mb2N1c2VkRnJhbWVPbmx5KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZURlZmF1bHQ6IFwianNmcmFtZS1wcmVzZXQtc3R5bGUteW9zZW1pdGUtZm9jdXNlZFwiLFxuICAgICAgICB0aXRsZUJhckNsYXNzTmFtZUZvY3VzZWQ6IFwianNmcmFtZS1wcmVzZXQtc3R5bGUteW9zZW1pdGUtZm9jdXNlZFwiLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVEZWZhdWx0OiBcImpzZnJhbWUtcHJlc2V0LXN0eWxlLXlvc2VtaXRlLWRlZmF1bHRcIixcbiAgICAgICAgdGl0bGVCYXJDbGFzc05hbWVGb2N1c2VkOiBcImpzZnJhbWUtcHJlc2V0LXN0eWxlLXlvc2VtaXRlLWZvY3VzZWRcIixcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIGZBcHIub25Jbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJ0c0J1aWxkZXIgPSBmQXByLmdldFBhcnRzQnVpbGRlcigpO1xuXG4gICAgdmFyIGltZ19kYXRhX2Nsb3NlX2hvdmVyZWQgPVxuICAgICAgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFvQUFBQUtDQVlBQUFDTk1zKzlBQUFBV0VsRVFWUW9VMk5rSUJJd0VxbU9BYTZ3Z1pXbEg2U3A0ZmVmUWpDTnhrZFJ5TWpBVVBDZjRmOENrRUpHQnNhRS93d01FMkFhVWF4dVlHV2VEMUlBVWdqUzBQRDdieUxNYWFRckJMbUpLS3VKOWd5aFlDSTZIQUdsRkRBTGY5czdlUUFBQUFCSlJVNUVya0pnZ2c9PVwiO1xuICAgIHZhciBpbWdfZGF0YV9tYXhpbWl6ZV9ob3ZlcmVkID1cbiAgICAgIFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBb0FBQUFLQ0FZQUFBQ05Ncys5QUFBQVZFbEVRVlFvVTJOa0lCSXdvcXZqaXhGb0FJbDlXdklCVE1NQWhrTGVHUDc5SU1uUFN6NDZrcThRWk4xL2h2LzJJQk1ZR1JnTVFQUi9Cb1lMRUQ3alFaQXp3RllUclJEWkxkUnhJN0tKUkFjUHJ2QUhBQVRZS2d2TEgwZkFBQUFBQUVsRlRrU3VRbUNDXCI7XG4gICAgaWYgKHBhcmFtLnRpdGxlQmFyLmdyZWVuQnV0dG9uID09PSBcImZ1bGxzY3JlZW5cIikge1xuICAgICAgaW1nX2RhdGFfbWF4aW1pemVfaG92ZXJlZCA9XG4gICAgICAgIFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBb0FBQUFLQ0FZQUFBQ05Ncys5QUFBQVpFbEVRVlFvVTJOa0lCSXdFcW1PQVVXaFFJS0F3TDgvLy9jek1EQVl3QXo0dE9RaldBMWNJVWpSaHdVZlBxQXJ4bERJRjhOL25vbUYwUkZkTVRhRi94a1lHQzZnSy82MDVLTWhpdFY4TWZ3Z2hTQ0FvaGhrQXk2RktJcGhuaUl2ZVBDRktRRHpHenNMUys3bjJBQUFBQUJKUlU1RXJrSmdnZz09XCI7XG4gICAgfVxuICAgIHZhciBpbWdfZGF0YV9kZW1heGltaXplX2hvdmVyZWQgPVxuICAgICAgXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFvQUFBQUtDQVlBQUFDTk1zKzlBQUFBaVVsRVFWUW9VMk5rd0FJRW9nUU1QaXo3Y0FGWmloR2JRdDRZL3YwTWpJd0xQeS8rc0FBbWoxTWhJd09EdzM5R3hrU1lZcndLUWFiQkZHTlZ5QmZMMS8vL1A2TUJ6RnJtZjR5RmpDQ0gvMlg2M3c5M0MrUC9DNThXZnlwRWR6dllSTjVZZ1FURy8vL25nNjFpWURqd2VjbEhSNndLa1JVVFZBaFR6UEQvZnp4ZUUyRldZUXRza0J3QUt3UTd0VmpBTDRNQUFBQUFTVVZPUks1Q1lJST1cIjtcbiAgICB2YXIgaW1nX2RhdGFfbWluaW1pemVfaG92ZXJlZCA9XG4gICAgICBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQW9BQUFBS0NBWUFBQUNOTXMrOUFBQUFNVWxFUVZRb1UyTmtJQkl3RXFtT2dVWUthN3c0R2hqK005aGpkUVlqdzhHV2JUOGF3RllUclpBWUQ5SElNOFJZRFFCc0VBd0xrcTRJQWdBQUFBQkpSVTVFcmtKZ2dnPT1cIjtcbiAgICB2YXIgaW1nX2RhdGFfMWRvdF90cmFuc3BhcmVudCA9XG4gICAgICBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBWUFBQUFmRmNTSkFBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBQkJKUkVGVWVOcGkrUC8vUHdOQWdBRUFDUHdDL3R1aVRSWUFBQUFBU1VWT1JLNUNZSUk9XCI7XG4gICAgdmFyIGltZ193aWR0aCA9IDEwO1xuICAgIHZhciBpbWdfaGVpZ2h0ID0gMTA7XG4gICAgdmFyIGltZ19zdHlsZSA9IFwibWFyZ2luOjBweDtwYWRkaW5nOjBweDt3aWR0aDpcIiArIGltZ193aWR0aCArIFwicHg7aGVpZ2h0OlwiICtcbiAgICAgIGltZ19oZWlnaHQgKyBcInB4XCI7XG5cbiAgICB2YXIgaW1hZ2VNYXhpbWl6ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1hZ2VNYXhpbWl6ZS5zcmMgPSBpbWdfZGF0YV9tYXhpbWl6ZV9ob3ZlcmVkO1xuICAgIGltYWdlTWF4aW1pemUuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgaW1nX3N0eWxlKTtcblxuICAgIHZhciBpbWFnZURlbWF4aW1pemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGltYWdlRGVtYXhpbWl6ZS5zcmMgPSBpbWdfZGF0YV9kZW1heGltaXplX2hvdmVyZWQ7XG4gICAgaW1hZ2VEZW1heGltaXplLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGltZ19zdHlsZSk7XG5cbiAgICAvLyB2YXIgaW1hZ2VGdWxsU2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgLy8gaW1hZ2VGdWxsU2NyZWVuLnNyYyA9IGltZ19kYXRhX21heGltaXplX2hvdmVyZWQ7XG4gICAgLy8gaW1hZ2VGdWxsU2NyZWVuLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBpbWdfc3R5bGUpO1xuXG4gICAgdmFyIGltYWdlTWluaW1pemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGltYWdlTWluaW1pemUuc3JjID0gaW1nX2RhdGFfbWluaW1pemVfaG92ZXJlZDtcbiAgICBpbWFnZU1pbmltaXplLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIGltZ19zdHlsZSk7XG5cbiAgICB2YXIgaW1hZ2VDbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1hZ2VDbG9zZS5zcmMgPSBpbWdfZGF0YV9jbG9zZV9ob3ZlcmVkO1xuICAgIGltYWdlQ2xvc2Uuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgaW1nX3N0eWxlKTtcblxuICAgIHZhciBpbWdUcmFuc3BhcmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgaW1nVHJhbnNwYXJlbnQuc3JjID0gaW1nX2RhdGFfMWRvdF90cmFuc3BhcmVudDtcbiAgICBpbWdUcmFuc3BhcmVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInN0eWxlXCIsXG4gICAgICBcIm1hcmdpbjowcHg7cGFkZGluZzowcHg7d2lkdGg6NnB4O2hlaWdodDo2cHhcIixcbiAgICApO1xuXG4gICAge1xuICAgICAgLy9jb25maWd1cmUgY2xvc2UgYnV0dG9uIGFwcGVhcmFuY2VbYmVnaW5dLy8vLy8vLy8vLy8vLy9cblxuICAgICAgdmFyIGNiQXByID0gcGFydHNCdWlsZGVyLmJ1aWxkSW1hZ2VCdXR0b25BcHBlYXJhbmNlKCk7XG4gICAgICBjYkFwci5pbWFnZURlZmF1bHQgPSBpbWdUcmFuc3BhcmVudDtcbiAgICAgIGNiQXByLmltYWdlSG92ZXJlZCA9IGltYWdlQ2xvc2U7XG4gICAgICBjYkFwci5pbWFnZVByZXNzZWQgPSBpbWFnZUNsb3NlO1xuICAgICAgY2JBcHIuaW1hZ2VGb2N1c2VkID0gaW1nVHJhbnNwYXJlbnQ7XG4gICAgICBjYkFwci5zaXplID0gMTA7XG5cbiAgICAgIGNiQXByLmJvcmRlclJhZGl1cyA9IDU7XG4gICAgICBjYkFwci5ib3JkZXJXaWR0aCA9IDE7XG5cbiAgICAgIGNiQXByLmJvcmRlckNvbG9yRGVmYXVsdCA9IFwiI2M2YzZjNlwiO1xuICAgICAgY2JBcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gXCIjZDM1MjRlXCI7XG4gICAgICBjYkFwci5ib3JkZXJDb2xvckhvdmVyZWQgPSBjYkFwci5ib3JkZXJDb2xvckZvY3VzZWQ7XG4gICAgICBjYkFwci5ib3JkZXJDb2xvclByZXNzZWQgPSBcIiNlNjQ4NDJcIjtcblxuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0ID0gXCJzb2xpZFwiO1xuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVGb2N1c2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVIb3ZlcmVkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuICAgICAgY2JBcHIuYm9yZGVyU3R5bGVQcmVzc2VkID0gY2JBcHIuYm9yZGVyU3R5bGVEZWZhdWx0O1xuXG4gICAgICAvL2JhY2tncm91bmRcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQgPSBcIiNkMGQwZDBcIjtcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQgPSBcIiNmYzYxNWNcIjtcbiAgICAgIGNiQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBjYkFwci5iYWNrZ3JvdW5kQ29sb3JGb2N1c2VkO1xuICAgICAgY2JBcHIuYmFja2dyb3VuZENvbG9yUHJlc3NlZCA9IGNiQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG4gICAgICBjYkFwci5zZXRTcmMoe1xuICAgICAgICBkZWZhdWx0OiBpbWdfZGF0YV8xZG90X3RyYW5zcGFyZW50LFxuICAgICAgICBmb2N1c2VkOiBpbWdfZGF0YV8xZG90X3RyYW5zcGFyZW50LFxuICAgICAgICBob3ZlcmVkOiBpbWdfZGF0YV9jbG9zZV9ob3ZlcmVkLFxuICAgICAgICBwcmVzc2VkOiBpbWdfZGF0YV9jbG9zZV9ob3ZlcmVkLFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBjbG9zZUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZEJ1dHRvbihjYkFwcik7XG4gICAgICB2YXIgZWxlTGVmdCA9IDg7XG4gICAgICB2YXIgZWxlVG9wID0gLTE5O1xuICAgICAgdmFyIGVsZUFsaWduID0gXCJMRUZUX1RPUFwiO1xuXG4gICAgICAvLyAnY2xvc2VCdXR0b24nIGlzIGEgc3BlY2lhbCBuYW1lXG4gICAgICBmQXByLmFkZEZyYW1lQ29tcG9uZW50KFxuICAgICAgICBwYXJhbS5jbG9zZUJ1dHRvbk5hbWUgfHwgXCJjbG9zZUJ1dHRvblwiLFxuICAgICAgICBjbG9zZUJ0bkVsZSxcbiAgICAgICAgZWxlTGVmdCxcbiAgICAgICAgZWxlVG9wLFxuICAgICAgICBlbGVBbGlnbixcbiAgICAgICk7XG5cbiAgICAgIC8vcHJlcGFyZSBbbWluaW1pemUgYnV0dG9uXVxuICAgICAgdmFyIG1pbkJ0bkFwciA9IHBhcnRzQnVpbGRlci5idWlsZEltYWdlQnV0dG9uQXBwZWFyYW5jZShjYkFwcik7XG4gICAgICBtaW5CdG5BcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gXCIjYzZjNmM2XCI7XG4gICAgICBtaW5CdG5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gXCIjZTZiMzQ3XCI7XG4gICAgICBtaW5CdG5BcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gbWluQnRuQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIG1pbkJ0bkFwci5ib3JkZXJDb2xvclByZXNzZWQgPSBcIiNlMWExMmRcIjtcbiAgICAgIG1pbkJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gXCIjZDBkMGQwXCI7XG4gICAgICBtaW5CdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9IFwiI2ZkYmU0MFwiO1xuICAgICAgbWluQnRuQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBtaW5CdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZDtcbiAgICAgIG1pbkJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gbWluQnRuQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG4gICAgICBtaW5CdG5BcHIuaW1hZ2VEZWZhdWx0ID0gaW1nVHJhbnNwYXJlbnQ7XG4gICAgICBtaW5CdG5BcHIuaW1hZ2VIb3ZlcmVkID0gaW1hZ2VNaW5pbWl6ZTtcbiAgICAgIG1pbkJ0bkFwci5pbWFnZVByZXNzZWQgPSBpbWFnZU1pbmltaXplO1xuICAgICAgbWluQnRuQXByLmltYWdlRm9jdXNlZCA9IGltZ1RyYW5zcGFyZW50O1xuXG4gICAgICB2YXIgbWluQnRuRWxlID0gcGFydHNCdWlsZGVyLmJ1aWxkQnV0dG9uKG1pbkJ0bkFwcik7XG4gICAgICB2YXIgZGVtaW5pbWl6ZUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZEJ1dHRvbihtaW5CdG5BcHIpO1xuICAgICAgZGVtaW5pbWl6ZUJ0bkVsZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB2YXIgZWxlTGVmdCA9IDI4O1xuICAgICAgdmFyIGVsZVRvcCA9IC0xOTtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiTEVGVF9UT1BcIjtcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoXG4gICAgICAgIFwibWluaW1pemVCdXR0b25cIixcbiAgICAgICAgbWluQnRuRWxlLFxuICAgICAgICBlbGVMZWZ0LFxuICAgICAgICBlbGVUb3AsXG4gICAgICAgIGVsZUFsaWduLFxuICAgICAgKTtcbiAgICAgIGZBcHIuYWRkRnJhbWVDb21wb25lbnQoXG4gICAgICAgIFwiZGVtaW5pbWl6ZUJ1dHRvblwiLFxuICAgICAgICBkZW1pbmltaXplQnRuRWxlLFxuICAgICAgICBlbGVMZWZ0LFxuICAgICAgICBlbGVUb3AsXG4gICAgICAgIGVsZUFsaWduLFxuICAgICAgKTtcblxuICAgICAgLy8gcHJlcGFyZSBbbWF4aW1pemUgYnV0dG9uXVxuICAgICAgLy9jb25maWd1cmUgem9vbSBidXR0b24gYXBwZWFyYW5jZVtiZWdpbl0vLy8vLy8vLy8vLy8vL1xuICAgICAgdmFyIG1heEJ0bkFwciA9IHBhcnRzQnVpbGRlci5idWlsZEltYWdlQnV0dG9uQXBwZWFyYW5jZShjYkFwcik7XG4gICAgICBtYXhCdG5BcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gXCIjYzZjNmM2XCI7XG4gICAgICBtYXhCdG5BcHIuYm9yZGVyQ29sb3JGb2N1c2VkID0gXCIjNjdiNjU3XCI7XG4gICAgICBtYXhCdG5BcHIuYm9yZGVyQ29sb3JIb3ZlcmVkID0gbWF4QnRuQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIG1heEJ0bkFwci5ib3JkZXJDb2xvclByZXNzZWQgPSBcIiMwMGFmMzhcIjtcbiAgICAgIG1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JEZWZhdWx0ID0gXCIjZDBkMGQwXCI7XG4gICAgICBtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9IFwiIzM0Y2E0OVwiO1xuICAgICAgbWF4QnRuQXByLmJhY2tncm91bmRDb2xvckhvdmVyZWQgPSBtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZDtcbiAgICAgIG1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gbWF4QnRuQXByLmJhY2tncm91bmRDb2xvckRlZmF1bHQ7XG4gICAgICBtYXhCdG5BcHIuaW1hZ2VEZWZhdWx0ID0gaW1nVHJhbnNwYXJlbnQ7XG4gICAgICBtYXhCdG5BcHIuaW1hZ2VIb3ZlcmVkID0gaW1hZ2VNYXhpbWl6ZTtcbiAgICAgIG1heEJ0bkFwci5pbWFnZVByZXNzZWQgPSBpbWFnZU1heGltaXplO1xuICAgICAgbWF4QnRuQXByLmltYWdlRm9jdXNlZCA9IGltZ1RyYW5zcGFyZW50O1xuXG4gICAgICB2YXIgem9vbUJ0bkVsZSA9IHBhcnRzQnVpbGRlci5idWlsZEJ1dHRvbihtYXhCdG5BcHIpO1xuXG4gICAgICB2YXIgZGVtYXhCdG5BcHIgPSBwYXJ0c0J1aWxkZXIuYnVpbGRJbWFnZUJ1dHRvbkFwcGVhcmFuY2UoY2JBcHIpO1xuICAgICAgZGVtYXhCdG5BcHIuYm9yZGVyQ29sb3JEZWZhdWx0ID0gXCIjYzZjNmM2XCI7XG4gICAgICBkZW1heEJ0bkFwci5ib3JkZXJDb2xvckZvY3VzZWQgPSBcIiM2N2I2NTdcIjtcbiAgICAgIGRlbWF4QnRuQXByLmJvcmRlckNvbG9ySG92ZXJlZCA9IGRlbWF4QnRuQXByLmJvcmRlckNvbG9yRm9jdXNlZDtcbiAgICAgIGRlbWF4QnRuQXByLmJvcmRlckNvbG9yUHJlc3NlZCA9IFwiIzAwYWYzOFwiO1xuICAgICAgZGVtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdCA9IFwiI2QwZDBkMFwiO1xuICAgICAgZGVtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRm9jdXNlZCA9IFwiIzM0Y2E0OVwiO1xuICAgICAgZGVtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9ySG92ZXJlZCA9IGRlbWF4QnRuQXByLmJhY2tncm91bmRDb2xvckZvY3VzZWQ7XG4gICAgICBkZW1heEJ0bkFwci5iYWNrZ3JvdW5kQ29sb3JQcmVzc2VkID0gZGVtYXhCdG5BcHIuYmFja2dyb3VuZENvbG9yRGVmYXVsdDtcbiAgICAgIGRlbWF4QnRuQXByLmltYWdlRGVmYXVsdCA9IGltZ1RyYW5zcGFyZW50O1xuICAgICAgZGVtYXhCdG5BcHIuaW1hZ2VIb3ZlcmVkID0gaW1hZ2VEZW1heGltaXplO1xuICAgICAgZGVtYXhCdG5BcHIuaW1hZ2VQcmVzc2VkID0gaW1hZ2VEZW1heGltaXplO1xuICAgICAgZGVtYXhCdG5BcHIuaW1hZ2VGb2N1c2VkID0gaW1nVHJhbnNwYXJlbnQ7XG4gICAgICB2YXIgZGVtYXhCdG5FbGUgPSBwYXJ0c0J1aWxkZXIuYnVpbGRCdXR0b24oZGVtYXhCdG5BcHIpO1xuICAgICAgZGVtYXhCdG5FbGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgICB2YXIgZWxlTGVmdCA9IDQ4O1xuICAgICAgdmFyIGVsZVRvcCA9IC0xOTtcbiAgICAgIHZhciBlbGVBbGlnbiA9IFwiTEVGVF9UT1BcIjtcblxuICAgICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudChcbiAgICAgICAgXCJkZXpvb21CdXR0b25cIixcbiAgICAgICAgZGVtYXhCdG5FbGUsXG4gICAgICAgIGVsZUxlZnQsXG4gICAgICAgIGVsZVRvcCxcbiAgICAgICAgZWxlQWxpZ24sXG4gICAgICApO1xuICAgICAgZkFwci5hZGRGcmFtZUNvbXBvbmVudChcbiAgICAgICAgXCJ6b29tQnV0dG9uXCIsXG4gICAgICAgIHpvb21CdG5FbGUsXG4gICAgICAgIGVsZUxlZnQsXG4gICAgICAgIGVsZVRvcCxcbiAgICAgICAgZWxlQWxpZ24sXG4gICAgICApO1xuXG4gICAgICAvL2NvbmZpZ3VyZSB6b29tIGJ1dHRvbiBhcHBlYXJhbmNlW2VuZF0vLy8vLy8vLy8vLy8vL1xuICAgIH1cbiAgICAvL1xuICB9O1xuICAvL1xuXG4gIHJldHVybiBmQXByO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5nZXRTdHlsZSA9IGdldFN0eWxlO1xuIiwidmFyIG1lcmdlRGVlcGx5ID0gcmVxdWlyZShcIm1lcmdlLWRlZXBseVwiKTtcblxuZnVuY3Rpb24gZ2V0UHJlc2V0KHBhcmFtKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgcmVzdWx0LmFwcGVhcmFuY2VOYW1lID0gXCJ5b3NlbWl0ZVwiO1xuICByZXN1bHQuYXBwZWFyYW5jZVBhcmFtID0ge307XG5cbiAgdmFyIHByZXNldFBhcmFtID0ge307XG5cbiAgaWYgKHBhcmFtKSB7XG4gICAgcHJlc2V0UGFyYW0gPSBwYXJhbTtcbiAgfVxuXG4gIHZhciBpc0Z1bGxTY3JlZW4gPSBwcmVzZXRQYXJhbS5tYXhpbWl6ZUJ1dHRvbkJlaGF2aW9yID09PSBcImZ1bGxzY3JlZW5cIjtcbiAgdmFyIG1pbmltaXplQnV0dG9uID0gcHJlc2V0UGFyYW0ubWluaW1pemVCdXR0b25CZWhhdmlvciA9PT0gXCJtaW5pbWl6ZVwiXG4gICAgPyBcIm1pbmltaXplQnV0dG9uXCJcbiAgICA6IG51bGw7XG4gIHZhciBoaWRlQnV0dG9uMSA9IHByZXNldFBhcmFtLm1pbmltaXplQnV0dG9uQmVoYXZpb3IgPT09IFwiaGlkZVwiXG4gICAgPyBcIm1pbmltaXplQnV0dG9uXCJcbiAgICA6IG51bGw7XG4gIHZhciBoaWRlQnV0dG9uMiA9IHByZXNldFBhcmFtLmNsb3NlQnV0dG9uQmVoYXZpb3IgPT09IFwiaGlkZVwiXG4gICAgPyBcImN1c3RvbS1jbG9zZS1idXR0b25cIlxuICAgIDogbnVsbDtcbiAgdmFyIHdpbmRvd0NvbnRyb2xQYXJhbSA9IHByZXNldFBhcmFtLmNvbnRyb2w7XG5cbiAgdmFyIGNsb3NlQnV0dG9uTmFtZUJ5Q2xvc2VCdXR0b25CZWhhdmlvciA9IGhpZGVCdXR0b24yO1xuICB2YXIgY2xvc2VCdXR0b25OYW1lID0gcHJlc2V0UGFyYW0uY2xvc2VCdXR0b25OYW1lO1xuXG4gIGlmIChpc0Z1bGxTY3JlZW4pIHtcbiAgICByZXN1bHQuYXBwZWFyYW5jZVBhcmFtLnRpdGxlQmFyID0ge1xuICAgICAgZ3JlZW5CdXR0b246IFwiZnVsbHNjcmVlblwiLCAvLydtYXhpbWl6ZScgaWNvbiBvciAnZnVsbHNjcmVlbicgaWNvblxuICAgIH07XG4gIH1cbiAgLy8gU2V0IHRoaXMgdG8gJ2Nsb3NlQnV0dG9uJyB0byBhdXRvbWF0aWNhbGx5IGNsb3NlIHdoZW4gY2xpY2tpbmdcbiAgcmVzdWx0LmFwcGVhcmFuY2VQYXJhbS5jbG9zZUJ1dHRvbk5hbWUgPVxuICAgIGNsb3NlQnV0dG9uTmFtZUJ5Q2xvc2VCdXR0b25CZWhhdmlvciB8fCBjbG9zZUJ1dHRvbk5hbWUgfHwgXCJjbG9zZUJ1dHRvblwiO1xuXG4gIHJlc3VsdC5zZXR1cFByZXNldFdpbmRvdyA9IGZ1bmN0aW9uIChmcmFtZSkge1xuICAgIHZhciBkZWZhdWx0V2luZG93Q29udHJvbFBhcmFtID0ge1xuICAgICAgbWF4aW1pemVCdXR0b246IFwiem9vbUJ1dHRvblwiLFxuICAgICAgbWF4aW1pemVQYXJhbToge1xuICAgICAgICBmdWxsU2NyZWVuOiBpc0Z1bGxTY3JlZW4sIC8vIHRydWU6bWF4aW1pemVkIHdpdGhvdXQgdGl0bGUgYmFyLGZhbHNlOm1heGltaXplZCB3aXRoIHRpdGxlIGJhclxuICAgICAgICByZXN0b3JlS2V5OiBcIkVzY2FwZVwiLCAvL1NldCBrZXkgY29kZSBmcm9tIGh0dHBzOi8vd3d3LnczLm9yZy9UUi91aWV2ZW50cy1jb2RlLyNrZXlib2FyZC1rZXktY29kZXNcbiAgICAgIH0sXG5cbiAgICAgIGRlbWF4aW1pemVCdXR0b246IFwiZGV6b29tQnV0dG9uXCIsXG4gICAgICBkZW1pbmltaXplQnV0dG9uOiBcImRlbWluaW1pemVCdXR0b25cIixcbiAgICAgIG1pbmltaXplQnV0dG9uOiBtaW5pbWl6ZUJ1dHRvbixcbiAgICAgIGhpZGVCdXR0b25zOiBbaGlkZUJ1dHRvbjEsIGhpZGVCdXR0b24yXSxcbiAgICAgIGhpZGVQYXJhbToge1xuICAgICAgICBhbGlnbjogXCJDRU5URVJfQ0VOVEVSXCIsIC8vQUJTT0xVVEU6SWYgeW91IHdhbnQgdGhlIHdpbmRvdyB0byBkaXNhcHBlYXIgYWZ0ZXIgdHJhbnNpdGlvbmluZyB0byB0aGUgcG9zaXRpb24geW91IHNwZWNpZmllZFxuXG4gICAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICB9LFxuICAgICAgZGVoaWRlUGFyYW06IHtcbiAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgIH0sXG4gICAgICBzdHlsZURpc3BsYXk6IFwiaW5saW5lXCIsXG4gICAgICBhbmltYXRpb246IHRydWUsXG4gICAgICBhbmltYXRpb25EdXJhdGlvbjogMTAwLCAvL1RoZSB3aG9sZSBhbmltYXRpb24gZHVyYXRpb24obWlsbGlzZWMpXG4gICAgfTtcblxuICAgIGlmICh3aW5kb3dDb250cm9sUGFyYW0pIHtcbiAgICAgIG1lcmdlRGVlcGx5KFxuICAgICAgICB7XG4gICAgICAgICAgb3A6IFwib3ZlcndyaXRlLW1lcmdlXCIsXG4gICAgICAgICAgb2JqZWN0MTogZGVmYXVsdFdpbmRvd0NvbnRyb2xQYXJhbSxcbiAgICAgICAgICBvYmplY3QyOiB3aW5kb3dDb250cm9sUGFyYW0sXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cblxuICAgIGZyYW1lLnNldENvbnRyb2woZGVmYXVsdFdpbmRvd0NvbnRyb2xQYXJhbSk7XG4gIH07XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzLmdldFByZXNldFdpbmRvdyA9IGdldFByZXNldDtcbiIsInZhciBDVGltZXIgPSByZXF1aXJlKFwiLi9DVGltZXIuanNcIik7XG5cbi8qKlxuICogQ1NpbXBsZUxheW91dEFuaW1hdG9yIGNsYXNzXG4gKiBDbGFzcyBmb3IgbW92aW5nIGFuaW1hdGlvbiDCtyBzY2FsaW5nIGFuaW1hdGlvbiBvZiBmcmFtZS5cbiAqIDxwPlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENTaW1wbGVMYXlvdXRBbmltYXRvcigpIHtcbiAgdGhpcy5mcHMgPSAzMDtcbiAgdGhpcy5kdXJhdGlvbk1pbGxpcyA9IDIwMDtcbiAgdGhpcy50YXJnZXRGcmFtZSA9IG51bGw7XG5cbiAgdGhpcy5fY3JyQWxwaGEgPSAxLjA7XG4gIHRoaXMuX3RvQWxwaGEgPSAxLjA7XG5cbiAgLy9jdXJyZW50IHdpZHRoL2hlaWdodFxuICB0aGlzLl9jcnJXaWR0aCA9IDA7XG4gIHRoaXMuX2NyckhlaWdodCA9IDA7XG4gIHRoaXMuX3RvV2lkdGggPSAwO1xuICB0aGlzLl90b0hlaWdodCA9IDA7XG5cbiAgLy9jdXJyZW50IHBvc2l0aW9uKHgseSlcbiAgLy90aGlzLl9jcnJYID0gMDtcbiAgLy90aGlzLl9jcnJZID0gMDtcbiAgdGhpcy5fdG9YID0gMDtcbiAgdGhpcy5fdG9ZID0gMDtcblxuICB0aGlzLnBpbm5lZEFuaW1hdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgdGhpcy5fcGluWCA9IDA7XG4gIHRoaXMuX3BpblkgPSAwO1xuICB0aGlzLl9waW5BbmNob3IgPSBudWxsO1xufVxuXG4vKipcbiAqIFNldCBDSUZyYW1lIG9iamVjdCB0byBiZSByZXNpemVkXG4gKiBAcGFyYW0gY2lmcmFtZVxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGNpZnJhbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUudGFyZ2V0RnJhbWUgPSBjaWZyYW1lO1xuXG4gIG1lLmZyb21XaWR0aChjaWZyYW1lLmdldFdpZHRoKCkpO1xuICBtZS5mcm9tSGVpZ2h0KGNpZnJhbWUuZ2V0SGVpZ2h0KCkpO1xuXG4gIG1lLnRvV2lkdGgoY2lmcmFtZS5nZXRXaWR0aCgpKTtcbiAgbWUudG9IZWlnaHQoY2lmcmFtZS5nZXRIZWlnaHQoKSk7XG5cbiAgdmFyIGNyclBvcyA9IGNpZnJhbWUuZ2V0UG9zaXRpb24oKTtcblxuICBtZS5mcm9tUG9zaXRpb24oY3JyUG9zLngsIGNyclBvcy55LCBjcnJQb3MuYW5jaG9yKTtcblxuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIEdldCBDSUZyYW1lIG9iamVjdFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICByZXR1cm4gbWUudGFyZ2V0RnJhbWU7XG59O1xuXG4vKipcbiAqIFNldCBhbmltYXRpb24gZHVyYXRpb24gdGltZSBtaWxsaXNcbiAqIEBwYXJhbSBkdXJhdGlvbk1pbGxpc1xuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuc2V0RHVyYXRpb24gPSBmdW5jdGlvbiAoZHVyYXRpb25NaWxsaXMpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5kdXJhdGlvbk1pbGxpcyA9IGR1cmF0aW9uTWlsbGlzO1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCBleHBlY3RlZCBGUFNcbiAqIEBwYXJhbSBmcHNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLnNldEZQUyA9IGZ1bmN0aW9uIChmcHMpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuZnBzID0gZnBzO1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCBQSU4gcG9zaXRpb25cbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHBhcmFtIGFuY2hvciBQb3NpdGlvbiB3aGVyZSBhbmltYXRpb24gc3RhcnRzIGZyb20uRXhwZWN0ZWQgcGFyYW1ldGVycyBhcyBmb2xsb3dzLlxuICdMRUZUX1RPUCc6RGVmYXVsdC5TcGVjaWZ5IHRoZSBwb3NpdGlvbiBzdGFydGluZyBmcm9tIHRoZSB1cHBlciBsZWZ0LlxuICdDRU5URVJfVE9QJ1xuICdSSUdIVF9UT1AnXG4gJ0xFRlRfQ0VOVEVSJ1xuICdDRU5URVJfQ0VOVEVSJ1xuICdSSUdIVF9DRU5URVInXG4gJ0xFRlRfQk9UVE9NJ1xuICdDRU5URVJfQk9UVE9NJ1xuICdSSUdIVF9CT1RUT00nXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS5mcm9tUG9zaXRpb24gPSBmdW5jdGlvbiAoeCwgeSwgYW5jaG9yKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnBpbm5lZEFuaW1hdGlvbkVuYWJsZWQgPSB0cnVlO1xuXG4gIG1lLl9waW5YID0geDtcbiAgbWUuX3BpblkgPSB5O1xuXG4gIG1lLnRvUG9zaXRpb24oeCwgeSk7XG5cbiAgaWYgKGFuY2hvcikge1xuICAgIG1lLl9waW5BbmNob3IgPSBhbmNob3I7XG4gIH1cbiAgcmV0dXJuIG1lO1xufTtcbi8qKlxuICogU2V0IHJlc2l6ZUZyb20gd2lkdGhcbiAqIEBwYXJhbSBmcm9tV2lkdGhcbiAqIEByZXR1cm5zIHsqfVxuICovXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLmZyb21XaWR0aCA9IGZ1bmN0aW9uIChmcm9tV2lkdGgpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX2NycldpZHRoID0gZnJvbVdpZHRoO1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IHJlc2l6ZUZyb20gaGVpZ2h0XG4gKiBAcGFyYW0gZnJvbUhlaWdodFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuZnJvbUhlaWdodCA9IGZ1bmN0aW9uIChmcm9tSGVpZ2h0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl9jcnJIZWlnaHQgPSBmcm9tSGVpZ2h0O1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IHJlc2l6ZVRvIHdpZHRoXG4gKiBAcGFyYW0gdG9XaWR0aFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9XaWR0aCA9IGZ1bmN0aW9uICh0b1dpZHRoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl90b1dpZHRoID0gdG9XaWR0aDtcblxuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCByZXNpemVUbyBoZWlnaHRcbiAqIEBwYXJhbSB0b0hlaWdodFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9IZWlnaHQgPSBmdW5jdGlvbiAodG9IZWlnaHQpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX3RvSGVpZ2h0ID0gdG9IZWlnaHQ7XG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IGZyb20gYWxwaGFcbiAqIEBwYXJhbSBmcm9tQWxwaGFcbiAqIEByZXR1cm5zIHsqfVxuICovXG5DU2ltcGxlTGF5b3V0QW5pbWF0b3IucHJvdG90eXBlLmZyb21BbHBoYSA9IGZ1bmN0aW9uIChmcm9tQWxwaGEpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX2NyckFscGhhID0gZnJvbUFscGhhO1xuXG4gIHJldHVybiBtZTtcbn07XG5cbi8qKlxuICogU2V0IHRvIGFscGhhXG4gKiBAcGFyYW0gdG9BbHBoYVxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9BbHBoYSA9IGZ1bmN0aW9uICh0b0FscGhhKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl90b0FscGhhID0gdG9BbHBoYTtcblxuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIEdldCBDSUZyYW1lIG9iamVjdFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuZWFzZSA9IGZ1bmN0aW9uIChlYXNlKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLl9lYXNlID0gZWFzZTtcbiAgcmV0dXJuIG1lO1xufTtcblxuLyoqXG4gKiBTZXQgbW92ZSB0byBwb3NpdGlvblxuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS50b1Bvc2l0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX3RvWCA9IHg7XG4gIG1lLl90b1kgPSB5O1xuICByZXR1cm4gbWU7XG59O1xuXG4vKipcbiAqIFNldCBtb3ZlIHRvIHhcbiAqIEBwYXJhbSB4XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuQ1NpbXBsZUxheW91dEFuaW1hdG9yLnByb3RvdHlwZS50b1ggPSBmdW5jdGlvbiAoeCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5fdG9YID0geDtcbiAgcmV0dXJuIG1lO1xufTtcblxuLyoqXG4gKiBTZXQgbW92ZSB0byB5XG4gKiBAcGFyYW0gdFxuICogQHJldHVybnMgeyp9XG4gKi9cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUudG9ZID0gZnVuY3Rpb24gKHQpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuX3RvWSA9IHQ7XG4gIHJldHVybiBtZTtcbn07XG5cbkNTaW1wbGVMYXlvdXRBbmltYXRvci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoXG4gIHdhaXRNaWxsaXMsXG4gIHJlcXVlc3RGb2N1c0VuYWJsZWQsXG4pIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJvbVdpZHRoID0gbWUuX2NycldpZHRoO1xuICB2YXIgZnJvbUhlaWdodCA9IG1lLl9jcnJIZWlnaHQ7XG5cbiAgdmFyIGZyb21YID0gbWUuX3Bpblg7XG4gIHZhciBmcm9tWSA9IG1lLl9waW5ZO1xuXG4gIHZhciBmcm9tQWxwaGEgPSBtZS5fY3JyQWxwaGE7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgbnVtT2ZTdGVwcyA9IHBhcnNlSW50KG1lLmZwcyAqIChtZS5kdXJhdGlvbk1pbGxpcyAvIDEwMDApKTtcbiAgICBpZiAobnVtT2ZTdGVwcyA9PSAwKSB7XG4gICAgICBudW1PZlN0ZXBzID0gMTtcbiAgICB9XG5cbiAgICB2YXIgZGVsdGFXaWR0aCA9IChtZS5fdG9XaWR0aCAtIGZyb21XaWR0aCkgLyBudW1PZlN0ZXBzO1xuICAgIHZhciBkZWx0YUhlaWdodCA9IChtZS5fdG9IZWlnaHQgLSBmcm9tSGVpZ2h0KSAvIG51bU9mU3RlcHM7XG5cbiAgICB2YXIgZGVsdGFYID0gKG1lLl90b1ggLSBmcm9tWCkgLyBudW1PZlN0ZXBzO1xuICAgIHZhciBkZWx0YVkgPSAobWUuX3RvWSAtIGZyb21ZKSAvIG51bU9mU3RlcHM7XG5cbiAgICB2YXIgZGVsdGFBbHBoYSA9IChtZS5fdG9BbHBoYSAtIGZyb21BbHBoYSkgLyBudW1PZlN0ZXBzO1xuICAgIGlmIChtZS5fZWFzZSkge1xuICAgICAgZGVsdGFBbHBoYSA9IGRlbHRhQWxwaGEgLyAxLjI0O1xuICAgIH1cblxuICAgIHZhciB1bml0TWlsbGlzID0gbWUuZHVyYXRpb25NaWxsaXMgLyBudW1PZlN0ZXBzO1xuXG4gICAgdmFyIGlkeCA9IDA7XG5cbiAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgdmFyIHRpbWVyID0gbmV3IENUaW1lcigpO1xuXG4gICAgICB0aW1lci5zZXRJbnRlcnZhbE1pbGxpcyh1bml0TWlsbGlzKTtcblxuICAgICAgdGltZXIuc2V0Q2FsbGJhY2soZnVuY3Rpb24gKHRpbWVyKSB7XG4gICAgICAgIGlmIChpZHggPT0gbnVtT2ZTdGVwcykge1xuICAgICAgICAgIHZhciBfd2lkdGggPSBtZS5fdG9XaWR0aDtcbiAgICAgICAgICB2YXIgX2hlaWdodCA9IG1lLl90b0hlaWdodDtcblxuICAgICAgICAgIHZhciBfeCA9IGZyb21YICsgZGVsdGFYICogaWR4O1xuICAgICAgICAgIHZhciBfeSA9IGZyb21ZICsgZGVsdGFZICogaWR4O1xuXG4gICAgICAgICAgdmFyIF9hbHBoYSA9IG1lLl90b0FscGhhO1xuXG4gICAgICAgICAgaWYgKG1lLnBpbm5lZEFuaW1hdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgICAgIC8vbWUudGFyZ2V0RnJhbWUuX3NldFBvc2l0aW9uSW50ZXJuYWxseShtZS5fcGluWCwgbWUuX3BpblksIG1lLl9waW5BbmNob3IsIF93aWR0aCwgX2hlaWdodCk7XG5cbiAgICAgICAgICAgIG1lLnRhcmdldEZyYW1lLl9zZXRQb3NpdGlvbkludGVybmFsbHkoXG4gICAgICAgICAgICAgIF94LFxuICAgICAgICAgICAgICBfeSxcbiAgICAgICAgICAgICAgbWUuX3BpbkFuY2hvcixcbiAgICAgICAgICAgICAgX3dpZHRoLFxuICAgICAgICAgICAgICBfaGVpZ2h0LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWUudGFyZ2V0RnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICAgIG1lLnRhcmdldEZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBfYWxwaGE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9tZS50YXJnZXRGcmFtZS5yZXNpemVEaXJlY3QoX3dpZHRoLCBfaGVpZ2h0LGZhbHNlKTtcbiAgICAgICAgICBtZS50YXJnZXRGcmFtZS5zZXRTaXplKF93aWR0aCwgX2hlaWdodCwgdHJ1ZSk7XG5cbiAgICAgICAgICBtZS5fY3JyV2lkdGggPSBfd2lkdGg7XG4gICAgICAgICAgbWUuX2NyckhlaWdodCA9IF9oZWlnaHQ7XG5cbiAgICAgICAgICBtZS5fcGluWCA9IF94O1xuICAgICAgICAgIG1lLl9waW5ZID0gX3k7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaWR4ID09IChudW1PZlN0ZXBzICsgMSkpIHtcbiAgICAgICAgICAvL1N0b3AgdGltZXIgYWZ0ZXIgbGFzdCBkcmF3IHVwZGF0ZS5cbiAgICAgICAgICB0aW1lci5zdG9wVGltZXIoKTtcblxuICAgICAgICAgIGlmIChtZS50YXJnZXRGcmFtZS5odG1sRWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgICAgbWUudGFyZ2V0RnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG1lLl90b0FscGhhO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKG1lKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3dpZHRoID0gZnJvbVdpZHRoICsgZGVsdGFXaWR0aCAqIGlkeDtcbiAgICAgICAgdmFyIF9oZWlnaHQgPSBmcm9tSGVpZ2h0ICsgZGVsdGFIZWlnaHQgKiBpZHg7XG5cbiAgICAgICAgdmFyIF94ID0gZnJvbVggKyBkZWx0YVggKiBpZHg7XG4gICAgICAgIHZhciBfeSA9IGZyb21ZICsgZGVsdGFZICogaWR4O1xuXG4gICAgICAgIHZhciBfYWxwaGEgPSBmcm9tQWxwaGEgKyBkZWx0YUFscGhhICogaWR4O1xuXG4gICAgICAgIGlmIChtZS5waW5uZWRBbmltYXRpb25FbmFibGVkKSB7XG4gICAgICAgICAgLy9tZS50YXJnZXRGcmFtZS5fc2V0UG9zaXRpb25JbnRlcm5hbGx5KG1lLl9waW5YLCBtZS5fcGluWSwgbWUuX3BpbkFuY2hvciwgX3dpZHRoLCBfaGVpZ2h0KTtcbiAgICAgICAgICBtZS50YXJnZXRGcmFtZS5fc2V0UG9zaXRpb25JbnRlcm5hbGx5KFxuICAgICAgICAgICAgX3gsXG4gICAgICAgICAgICBfeSxcbiAgICAgICAgICAgIG1lLl9waW5BbmNob3IsXG4gICAgICAgICAgICBfd2lkdGgsXG4gICAgICAgICAgICBfaGVpZ2h0LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUudGFyZ2V0RnJhbWUuaHRtbEVsZW1lbnQuc3R5bGUpIHtcbiAgICAgICAgICBtZS50YXJnZXRGcmFtZS5odG1sRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gX2FscGhhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9tZS50YXJnZXRGcmFtZS5yZXNpemVEaXJlY3QoX3dpZHRoLCBfaGVpZ2h0LGZhbHNlKTtcbiAgICAgICAgbWUudGFyZ2V0RnJhbWUuc2V0U2l6ZShfd2lkdGgsIF9oZWlnaHQsIHRydWUpO1xuXG4gICAgICAgIGlmIChpZHggPT0gMCkge1xuICAgICAgICAgIC8vY2hlY2sgd2luZG93IGV4aXN0ZW5jZVxuICAgICAgICAgIHZhciB3bWdyID0gbWUudGFyZ2V0RnJhbWUucGFyZW50Q2FudmFzO1xuICAgICAgICAgIGlmICh3bWdyKSB7XG4gICAgICAgICAgICB2YXIgX3RhcmdldEZyYW1lID0gd21nci5nZXRXaW5kb3cobWUudGFyZ2V0RnJhbWUuaWQpO1xuICAgICAgICAgICAgaWYgKF90YXJnZXRGcmFtZSkge1xuICAgICAgICAgICAgICBtZS50YXJnZXRGcmFtZS5zaG93KHsgcmVxdWVzdEZvY3VzOiByZXF1ZXN0Rm9jdXNFbmFibGVkIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy90aGUgdGFyZ2V0IHdpbmRvdyBtdXN0IGJlIGRlbGV0ZWQuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWR4Kys7XG4gICAgICB9KTtcblxuICAgICAgdGltZXIuc3RhcnRUaW1lcigpO1xuICAgIH1cblxuICAgIGlmICh3YWl0TWlsbGlzKSB7XG4gICAgICB2YXIgd2FpdGVyID0gbmV3IENUaW1lcigpO1xuICAgICAgd2FpdGVyLnNldEludGVydmFsTWlsbGlzKHdhaXRNaWxsaXMpO1xuICAgICAgd2FpdGVyLnNldENhbGxiYWNrKGZ1bmN0aW9uIChfdGltZXIpIHtcbiAgICAgICAgX3RpbWVyLnN0b3BUaW1lcigpO1xuXG4gICAgICAgIGxvb3AoKTtcbiAgICAgIH0pO1xuICAgICAgd2FpdGVyLnN0YXJ0VGltZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcCgpO1xuICAgIH1cbiAgfSk7XG59OyAvL3N0YXJ0XG5cbi8qKlxuICogZW5kIG9mIENTaW1wbGVMYXlvdXRBbmltYXRvciBjbGFzc1xuICovXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxubW9kdWxlLmV4cG9ydHMgPSBDU2ltcGxlTGF5b3V0QW5pbWF0b3I7XG4iLCIvKipcbiAqIENUaW1lciBjbGFzczxicj5cbiAqXG4gKiBIb3cgdG8gdXNlOlxuICogIHZhciB0aW1lciA9IG5ldyBDVGltZXIoKTtcbiAqICAgIHZhciB2YWx1ZSA9IDA7XG4gKlxuICogICAgdGltZXIuc2V0Q2FsbGJhY2soZnVuY3Rpb24gKHRpbWVyT2JqKSB7XG4gKiAgICAgICAgdmFsdWUrKztcbiAqICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiAgICAgICAgaWYgKHZhbHVlID09IDEwMCkge1xuICogICAgICAgICAgICB0aW1lck9iai5zdG9wVGltZXIoKTtcbiAqICAgICAgICB9XG4gKiAgICB9KTtcbiAqICAgIHRpbWVyLnNldEludGVydmFsTWlsbGlzKDEwMCk7XG4gKiAgICB0aW1lci5zdGFydFRpbWVyKCk7XG4gKlxuICogQGF1dGhvciBUb20gTWlzYXdhIChyaXZlcnN1bi5vcmdAZ21haWwuY29tKVxuICovXG52YXIgQ1RpbWVyID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ1RpbWVyKCkge1xuICAgIHZhciBtZSA9IHRoaXM7XG5cbiAgICBtZS5fdGltZXJJZCA9IG51bGw7XG4gICAgbWUuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIG1lLl90aW1lckludGVydmFsID0gMDtcblxuICAgIG1lLl9pbnRlcm5hbENhbGxiYWNrID0gX2ludGVybmFsQ2FsbGJhY2s7XG4gICAgbWUuX3RpbWVyTWV0aG9kID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIF9pbnRlcm5hbENhbGxiYWNrKCkge1xuICAgICAgaWYgKG1lLl90aW1lck1ldGhvZCkge1xuICAgICAgICBtZS5fdGltZXJNZXRob2QobWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1lLl9pc1J1bm5pbmcpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1lLl90aW1lcklkKTtcbiAgICAgICAgbWUuX3RpbWVySWQgPSBzZXRUaW1lb3V0KG1lLl9pbnRlcm5hbENhbGxiYWNrLCBtZS5fdGltZXJJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQ1RpbWVyLnByb3RvdHlwZS5zZXRDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFja19mdW5jKSB7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICBtZS5fdGltZXJNZXRob2QgPSBjYWxsYmFja19mdW5jO1xuICAgIHJldHVybiBtZTtcbiAgfTtcblxuICBDVGltZXIucHJvdG90eXBlLnNldEludGVydmFsTWlsbGlzID0gZnVuY3Rpb24gKGludGVydmFsKSB7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICBtZS5fdGltZXJJbnRlcnZhbCA9IGludGVydmFsO1xuICAgIHJldHVybiBtZTtcbiAgfTtcblxuICBDVGltZXIucHJvdG90eXBlLnN0b3BUaW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIG1lLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gbWU7XG4gIH07XG5cbiAgQ1RpbWVyLnByb3RvdHlwZS5zdGFydFRpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgaWYgKG1lLl90aW1lckludGVydmFsID4gMCkge1xuICAgICAgbWUuX3RpbWVySWQgPSBzZXRUaW1lb3V0KG1lLl9pbnRlcm5hbENhbGxiYWNrLCBtZS5fdGltZXJJbnRlcnZhbCk7XG4gICAgICBtZS5faXNSdW5uaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG1lO1xuICB9O1xuXG4gIHJldHVybiBDVGltZXI7XG59KSgpO1xuLyoqXG4gKiBlbmQgb2YgQ1RpbWVyIGNsYXNzXG4gKi9cbi8vKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLVxubW9kdWxlLmV4cG9ydHMgPSBDVGltZXI7XG4iLCIvKipcbiAqIEluaGVyaXRhbmNlIGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHN1YkNsYXNzXG4gKiBAcGFyYW0gYmFzZUNsYXNzXG4gKi9cbmZ1bmN0aW9uIGluaGVyaXQoc3ViQ2xhc3MsIGJhc2VDbGFzcykge1xuICBmdW5jdGlvbiBjbGF6eigpIHtcbiAgfVxuXG4gIGNsYXp6LnByb3RvdHlwZSA9IGJhc2VDbGFzcy5wcm90b3R5cGU7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IG5ldyBjbGF6eigpO1xuXG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5zdXBlckNvbnN0cnVjdG9yID0gYmFzZUNsYXNzO1xuICBzdWJDbGFzcy5zdXBlckNsYXNzID0gYmFzZUNsYXNzLnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBFbmQgb2YgaW5oZXJpdGFuY2UgZnVuY3Rpb25cbiAqL1xuXG4vLystKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy0rLSstKy1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmhlcml0O1xuIiwidmFyIF90eXBlb2YgPVxuICB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIlxuICAgID8gZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfVxuICAgIDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJlxuICAgICAgICAgIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmXG4gICAgICAgICAgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlXG4gICAgICAgID8gXCJzeW1ib2xcIlxuICAgICAgICA6IHR5cGVvZiBvYmo7XG4gICAgfTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoaXRlbSkge1xuICByZXR1cm4gKFxuICAgIGl0ZW0gJiZcbiAgICAodHlwZW9mIGl0ZW0gPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihpdGVtKSkgPT09IFwib2JqZWN0XCIgJiZcbiAgICAhQXJyYXkuaXNBcnJheShpdGVtKVxuICApO1xufVxuXG5mdW5jdGlvbiBvYmplY3RBc3NpZ24odGFyZ2V0KSB7XG4gIGZvciAoXG4gICAgdmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgc291cmNlcyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSxcbiAgICAgIF9rZXkgPSAxO1xuICAgIF9rZXkgPCBfbGVuO1xuICAgIF9rZXkrK1xuICApIHtcbiAgICBzb3VyY2VzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmICghc291cmNlcy5sZW5ndGgpIHJldHVybiB0YXJnZXQ7XG4gIHZhciBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cbiAgaWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChpc09iamVjdChzb3VyY2Vba2V5XSkpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRba2V5XSkgT2JqZWN0LmFzc2lnbih0YXJnZXQsIF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCB7fSkpO1xuICAgICAgICBvYmplY3RBc3NpZ24odGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBfZGVmaW5lUHJvcGVydHkoe30sIGtleSwgc291cmNlW2tleV0pKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdEFzc2lnbi5hcHBseSh1bmRlZmluZWQsIFt0YXJnZXRdLmNvbmNhdChzb3VyY2VzKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzLm9iamVjdEFzc2lnbiA9IG9iamVjdEFzc2lnbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQ1NpbXBsZUxheW91dEFuaW1hdG9yID0gcmVxdWlyZShcIi4vQ1NpbXBsZUxheW91dEFuaW1hdG9yLmpzXCIpO1xudmFyIENBTElHTiA9IHJlcXVpcmUoXCIuLi9DQ29tbW9uLmpzXCIpO1xudmFyIG1lcmdlRGVlcGx5ID0gcmVxdWlyZShcIm1lcmdlLWRlZXBseVwiKTtcbnZhciBFdmVudExpc3RlbmVySGVscGVyID0gcmVxdWlyZShcImV2ZW50LWxpc3RlbmVyLWhlbHBlclwiKTtcblxuZnVuY3Rpb24gV2luZG93RXZlbnRIZWxwZXIobW9kZWwpIHtcbiAgdGhpcy5ldmVudExpc3RlbmVySGVscGVyID0gbmV3IEV2ZW50TGlzdGVuZXJIZWxwZXIoKTtcbiAgdGhpcy53aW5kb3dNb2RlID0gXCJkZWZhdWx0XCI7XG4gIHRoaXMuc3R5bGVEaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHRoaXMuaG9yaXpvbnRhbEFsaWduID0gXCJsZWZ0XCI7XG4gIHRoaXMudmVydGljYWxBbGlnbiA9IFwidG9wXCI7XG5cbiAgdGhpcy5rZXlMaXN0ZW5lciA9IG51bGw7XG5cbiAgdGhpcy5taW5pbWl6ZUJ1dHRvbiA9IG51bGw7XG4gIHRoaXMubWF4aW1pemVCdXR0b24gPSBudWxsO1xuICB0aGlzLmRlbWF4aW1pemVCdXR0b24gPSBudWxsO1xuICB0aGlzLmRlbWluaW1pemVCdXR0b24gPSBudWxsO1xuXG4gIHRoaXMub3B0cyA9IG1vZGVsO1xuXG4gIHRoaXMuaXNXaW5kb3dNYW5hZ2VyRml4ZWQgPSBtb2RlbC5mcmFtZS5qc0ZyYW1lLmlzV2luZG93TWFuYWdlckZpeGVkO1xuXG4gIGlmIChtb2RlbC5zdHlsZURpc3BsYXkpIHtcbiAgICB0aGlzLnN0eWxlRGlzcGxheSA9IG1vZGVsLnN0eWxlRGlzcGxheTtcbiAgfVxuICBpZiAobW9kZWwubWluaW1pemVCdXR0b24pIHtcbiAgICB0aGlzLm1pbmltaXplQnV0dG9uID0gbW9kZWwubWluaW1pemVCdXR0b247XG4gIH1cbiAgaWYgKG1vZGVsLmRlbWluaW1pemVCdXR0b24pIHtcbiAgICB0aGlzLmRlbWluaW1pemVCdXR0b24gPSBtb2RlbC5kZW1pbmltaXplQnV0dG9uO1xuICB9XG4gIGlmIChtb2RlbC5tYXhpbWl6ZUJ1dHRvbikge1xuICAgIHRoaXMubWF4aW1pemVCdXR0b24gPSBtb2RlbC5tYXhpbWl6ZUJ1dHRvbjtcbiAgfVxuICBpZiAobW9kZWwuZGVtYXhpbWl6ZUJ1dHRvbikge1xuICAgIHRoaXMuZGVtYXhpbWl6ZUJ1dHRvbiA9IG1vZGVsLmRlbWF4aW1pemVCdXR0b247XG4gIH1cblxuICBpZiAobW9kZWwuaGlkZUJ1dHRvbikge1xuICAgIHRoaXMuaGlkZUJ1dHRvbiA9IG1vZGVsLmhpZGVCdXR0b247XG4gIH1cbiAgaWYgKG1vZGVsLmhpZGVCdXR0b25zKSB7XG4gICAgdGhpcy5oaWRlQnV0dG9ucyA9IG1vZGVsLmhpZGVCdXR0b25zO1xuICB9XG5cbiAgdGhpcy5tYXhpbWl6ZVBhcmFtID0gbW9kZWwubWF4aW1pemVQYXJhbTtcbiAgdGhpcy5kZW1heGltaXplUGFyYW0gPSBtb2RlbC5kZW1heGltaXplUGFyYW07XG4gIHRoaXMubWluaW1pemVQYXJhbSA9IG1vZGVsLm1pbmltaXplUGFyYW07XG4gIHRoaXMuZGVtaW5pbWl6ZVBhcmFtID0gbW9kZWwuZGVtaW5pbWl6ZVBhcmFtO1xuICB0aGlzLmhpZGVQYXJhbSA9IG1vZGVsLmhpZGVQYXJhbTtcbiAgdGhpcy5kZWhpZGVQYXJhbSA9IG1vZGVsLmRlaGlkZVBhcmFtO1xuXG4gIGlmIChtb2RlbC5ob3Jpem9udGFsQWxpZ24pIHtcbiAgICB0aGlzLmhvcml6b250YWxBbGlnbiA9IG1vZGVsLmhvcml6b250YWxBbGlnbjtcbiAgfVxuICBpZiAobW9kZWwudmVydGljYWxBbGlnbikge1xuICAgIHRoaXMudmVydGljYWxBbGlnbiA9IG1vZGVsLnZlcnRpY2FsQWxpZ247XG4gIH1cblxuICB0aGlzLmFuaW1hdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgdGhpcy5hbmltYXRpb25EdXJhdGlvbiA9IDEwMDtcbiAgdGhpcy5mcmFtZSA9IG1vZGVsLmZyYW1lO1xuICB0aGlzLmhpZGVGcmFtZUJvcmRlciA9IHRydWU7XG4gIHRoaXMuaGlkZVRpdGxlQmFyID0gdHJ1ZTtcblxuICB0aGlzLnJlc3RvcmVLZXkgPSBudWxsO1xuICB0aGlzLnJlc3RvcmVEdXJhdGlvbiA9IG51bGw7XG4gIHRoaXMucmVzdG9yZUNhbGxiYWNrID0gbnVsbDtcblxuICB0aGlzLnN0YXRzU3RvcmUgPSB7fTtcblxuICBpZiAobW9kZWwuYW5pbWF0aW9uKSB7XG4gICAgdGhpcy5hbmltYXRpb25FbmFibGVkID0gbW9kZWwuYW5pbWF0aW9uO1xuICB9XG4gIGlmIChtb2RlbC5hbmltYXRpb25EdXJhdGlvbikge1xuICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb24gPSBtb2RlbC5hbmltYXRpb25EdXJhdGlvbjtcbiAgfVxuICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG5cbiAgLy9JZiB0aGUgdXNlciBjaGFuZ2VzIHRoZSB3aW5kb3cgc2l6ZSB3aGVuIHRoZSB3aW5kb3cgaXMgbWF4aW1pemVkIHN0YXRlLFxuICAvLyBhZGp1c3QgdGhlIHNpemUgc28gdGhhdCB3aW5kb3cgbG9va3MgbWF4aW1pemVkLlxuICB0aGlzLnJlc2l6ZUxpc3RlbmVyID0gdGhpcy5oYW5kbGVPblJlc2l6ZS5iaW5kKHRoaXMpO1xuXG4gIGlmICh0aGlzLm1heGltaXplUGFyYW0gJiYgdGhpcy5tYXhpbWl6ZVBhcmFtLm1hdGNoUGFyZW50KSB7XG4gICAgdGhpcy5yZXNpemVMaXN0ZW5lciA9IHRoaXMuaGFuZGxlT25WaXJ0dWFsUmVzaXplLmJpbmQodGhpcyk7XG4gIH1cbn1cblxuV2luZG93RXZlbnRIZWxwZXIuTUFUQ0hfUEFSRU5UX0NIQU5HRV9NQVJLRVJfQVRUUiA9IFwiX19qc2ZyYW1lLW1wLW1hcmtlclwiO1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnRUeXBlLCBjYWxsYmFjaykge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5ldmVudExpc3RlbmVyc1tldmVudFR5cGVdID0gY2FsbGJhY2s7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvTWF4aW1pemUgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAobWUud2luZG93TW9kZSA9PT0gXCJoaWRcIikge1xuICAgIHRocm93IEVycm9yKFxuICAgICAgXCJbSlNyYW1lXSBJdCBpcyBub3QgcG9zc2libGUgdG8gY2hhbmdlIGRpcmVjdGx5IGZyb20gdGhlIGhpZCBzdGF0ZSB0byB0aGUgbWF4aW1pemVkIHN0YXRlXCIsXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobWUud2luZG93TW9kZSA9PT0gXCJtYXhpbWl6ZWRcIiB8fCBtZS53aW5kb3dNb2RlID09PSBcIm1heGltaXppbmdcIikge1xuICAgIC8vIElmIGl0J3MgYWxyZWFkeSAnbWF4aW1pemVkJyBzdGF0dXMsIGl0IGRvZXNuJ3QgZG8gYW55dGhpbmcuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbWUud2luZG93TW9kZSA9IFwibWF4aW1pemluZ1wiO1xuXG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5tYXRjaFBhcmVudCkge1xuICAgIC8vIFRoZSBkaXYgZWxlbWVudCBkb2VzIG5vdCBpc3N1ZSB0aGUgcmVzaXplIGV2ZW50LiBGdXJ0aGVybW9yZSxcbiAgICAvLyBkaXYgaXMgc3BlY2lmaWVkIGFzIDEwMCUsIHNvIHN0eWxlLndpZHRoIGlzIGFsd2F5cyAxMDAlLlxuICAgIC8vIFNvIEkgd2FudCB0byBnZXQgdGhlIGNsaWVudFdpZHRoIGJ1dCBJIGNhbid0IGdldCBpdCB3aXRoIG11dGF0aW9uT2JzZXJ2ZXIuXG4gICAgLy8gVGhlcmVmb3JlLCB3ZSBhZG9wdCBhIG1lY2hhbmlzbSB0byBjYXRjaCB0aGUgcGFyZW50IHdpbmRvd1xuICAgIC8vIHJlc2l6ZSBldmVudCBhbmQgY2hhbmdlIHRoZSBhdHRyaWJ1dGUgb2YgdGhlIHBhcmVudCB3aW5kb3cgY29udGVudFxuICAgIC8vIGJ5IGRpZmZlcmVudGlhdGlvbiB0byBjYXRjaCBpdC5cbiAgICB2YXIgd2luZG93TWFuYWdlciA9IGZyYW1lLmdldFdpbmRvd01hbmFnZXIoKTtcbiAgICB2YXIgcGFyZW50RWxlbWVudCA9IHdpbmRvd01hbmFnZXIuZ2V0UGFyZW50RWxlbWVudCgpO1xuXG4gICAgaWYgKCFtZS5tYXRjaFBhcmVudFJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB2YXIgbWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvbiB2aXJ0dWFsIHJlc2l6ZVwiKTtcbiAgICAgICAgbWUucmVzaXplTGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgICAgbWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlci5vYnNlcnZlKHBhcmVudEVsZW1lbnQsIHtcbiAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbV2luZG93RXZlbnRIZWxwZXIuTUFUQ0hfUEFSRU5UX0NIQU5HRV9NQVJLRVJfQVRUUl0sXG4gICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIG1lLm1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXIgPSBtYXRjaFBhcmVudFJlc2l6ZU9ic2VydmVyO1xuICAgIH1cbiAgfSAvL3NldCBvbnJlc2l6ZSBsaXN0ZW5lclxuICAvL3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBtZS5yZXNpemVMaXN0ZW5lcik7XG4gIGVsc2UgaWYgKFxuICAgICFtZS5ldmVudExpc3RlbmVySGVscGVyLmhhc0V2ZW50TGlzdGVuZXIoXG4gICAgICB3aW5kb3csXG4gICAgICBcInJlc2l6ZVwiLFxuICAgICAgXCJ3aW5kb3ctcmVzaXplLWxpc3RlbmVyXCIsXG4gICAgKVxuICApIHtcbiAgICBtZS5ldmVudExpc3RlbmVySGVscGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICB3aW5kb3csXG4gICAgICBcInJlc2l6ZVwiLFxuICAgICAgbWUucmVzaXplTGlzdGVuZXIsXG4gICAgICB7IGxpc3RlbmVyTmFtZTogXCJ3aW5kb3ctcmVzaXplLWxpc3RlbmVyXCIgfSxcbiAgICApO1xuICB9XG5cbiAgLy9SZW1lbWJlciB0aGUgc3RhdHVzIG9mIHRoZSB3aW5kb3cgYmVmb3JlIG1heGltaXppbmcgdGhlIHdpbmRvdyBzaXplXG4gIG1lLnNhdmVDdXJyZW50V2luZG93U3RhdHMoXCJtYXhpbWl6ZV9tb2RlXCIpO1xuXG4gIG1lLmhpZGVUaXRsZUJhciA9IG1vZGVsID8gbW9kZWwuZnVsbFNjcmVlbiA6IGZhbHNlO1xuXG4gIGlmIChtZS5oaWRlVGl0bGVCYXIpIHtcbiAgICAvL0hpZGUgb25seSB0aGUgY3VycmVudGx5IHZpc2libGUgRnJhbWVDb21wb25lbnRcbiAgICAvL+OCpuOCo+ODs+ODieOCpuOBruODouODvOODieOCkuWkieabtOOBmeOCi+WJjeOBruS7iuOBrueKtuaFi+OBp+WPr+imlueKtuaFi+OBq+OBguOCi+ODleODrOODvOODoOOCs+ODs+ODneODvOODjeODs+ODiO+8iOmWieOBmOOCi+ODnOOCv+ODs+mhnu+8ieOCkuS4jeWPr+imluOBq+OBmeOCi1xuICAgIC8vKOOCv+OCpOODiOODq+ODkOODvOmdnuihqOekuuOBruWgtOWQiOOBq+OBr+acgOWkp+WMluOBmeOCi+OBqOOBjeOBruOCouODi+ODoeODvOOCt+ODp+ODs+OBp+ODleODrOODvOODoOOCs+ODs+ODneODvOODjeODs+ODiOOCkuimi+OBm+OBquOBhOOCiOOBhuOBq+OBmeOCiylcbiAgICBmcmFtZS5oaWRlQWxsVmlzaWJsZUZyYW1lQ29tcG9uZW50cygpO1xuXG4gICAgLy/jgb7jgZ9oaWRlQWxsVmlzaWJsZUZyYW1lQ29tcG9uZW5044KS5a6f5pa944GZ44KL44Go44GN44Gr44CB5YCL5Yil44GuaGlkZUZyYW1lQ29tcG9uZW5044KEc2hvd0ZyYW1lQ29tcG9uZW5044KS5a6f6KGM44GZ44KL44GoXG4gICAgLy/nrqHnkIbjgrnjg4bjg7zjg4jjgYznoLTntrvjgZnjgovjgZ/jgoHjgIHjgr/jgqTjg4jjg6vjg5Djg7zpnZ7ooajnpLrjga7loLTlkIjjga/jganjgYbjgZvmk43kvZzjgafjgY3jgarjgYTjgajjgYTjgYbjgZPjgajjgoLjgYLjgopcbiAgICAvL2hpZGVGcmFtZUNvbXBvbmVudCDjgoQgc2hvd0ZyYW1lQ29tcG9uZW5044Gv5a6f6KGM44GX44Gq44GEXG4gIH0gZWxzZSB7XG4gICAgLy9Qcm9jZXNzIHJlcXVpcmVkIGZvciBtYXhpbWl6YXRpb25cbiAgICBpZiAobWUubWF4aW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLmhpZGVGcmFtZUNvbXBvbmVudChtZS5tYXhpbWl6ZUJ1dHRvbik7XG4gICAgfVxuICAgIGlmIChtZS5kZW1heGltaXplQnV0dG9uKSB7XG4gICAgICBmcmFtZS5zaG93RnJhbWVDb21wb25lbnQobWUuZGVtYXhpbWl6ZUJ1dHRvbiwgbWUuc3R5bGVEaXNwbGF5KTtcbiAgICB9XG4gIH1cblxuICBmcmFtZS5zZXRNb3ZhYmxlKGZhbHNlKTtcbiAgZnJhbWUuc2V0UmVzaXphYmxlKGZhbHNlKTtcblxuICBpZiAobW9kZWwgJiYgbW9kZWwucmVzdG9yZUtleSkge1xuICAgIG1lLnJlc3RvcmVLZXkgPSBtb2RlbC5yZXN0b3JlS2V5O1xuICB9XG4gIGlmIChtb2RlbCAmJiBtb2RlbC5yZXN0b3JlRHVyYXRpb24pIHtcbiAgICBtZS5yZXN0b3JlRHVyYXRpb24gPSBtb2RlbC5yZXN0b3JlRHVyYXRpb247XG4gIH1cbiAgaWYgKG1vZGVsICYmIG1vZGVsLnJlc3RvcmVDYWxsYmFjaykge1xuICAgIG1lLnJlc3RvcmVDYWxsYmFjayA9IG1vZGVsLnJlc3RvcmVDYWxsYmFjaztcbiAgfVxuICAvL1JlbmRlciBtYXhpbWl6YXRpb24gaXRzZWxmXG4gIG1lLnJlbmRlck1heGltaXplZE1vZGUoe1xuICAgIGFuaW1hdGlvbjogbWUuYW5pbWF0aW9uRW5hYmxlZCxcbiAgICBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCwgLy9zZXQgbWF4aW1pemVkIGZpbmlzaGVkIGNhbGxiYWNrXG4gICAgZHVyYXRpb246IChtb2RlbCAmJiBtb2RlbC5kdXJhdGlvbikgPyBtb2RlbC5kdXJhdGlvbiA6IG51bGwsXG4gICAgbWF0Y2hQYXJlbnQ6IChtb2RlbCAmJiBtb2RlbC5tYXRjaFBhcmVudCkgPyBtb2RlbC5tYXRjaFBhcmVudCA6IGZhbHNlLFxuICB9KTtcbn07XG5cbi8qKlxuICogUmVuZGVyIHdpbmRvdyBhcyBhIG1heGltaXplZCBtb2RlKCBmdWxsIHNjcmVlbiApXG4gKi9cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5yZW5kZXJNYXhpbWl6ZWRNb2RlID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuICB2YXIgZnJvbSA9IG1lLmxvYWRXaW5kb3dTdGF0cyhcIm1heGltaXplX21vZGVcIik7XG5cbiAgdmFyIF90b1ggPSAwO1xuICB2YXIgX3RvWSA9IDA7XG4gIHZhciBfdG9XaWR0aCA9IDA7XG4gIHZhciBfdG9IZWlnaHQgPSAwO1xuXG4gIC8vY29tcHV0ZSBwb3NpdGlvbiBhbmQgc2l6ZVtiZWdpbl1cbiAgaWYgKG1lLmhpZGVUaXRsZUJhcikge1xuICAgIF90b1ggPSAwO1xuICAgIF90b1kgPSAtZnJvbS50aXRsZUJhckhlaWdodDtcbiAgfVxuXG4gIHZhciBwYXJlbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB2YXIgcGFyZW50SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIGlmIChtb2RlbC5tYXRjaFBhcmVudCkge1xuICAgIC8vIElmIG1hdGNoUGFyZW50IGlzIHNwZWNpZmllZFxuICAgIC8vIFdoZW4gbWF4aW1pemluZywgdXNlIHRoZSBzaXplIG9mIHBhcmVudEVsZW1lbnQgc3BlY2lmaWVkIGF0IGluaXRpYWxpemF0aW9uXG4gICAgLy8gUGFyZW50bEVsZW1lbnQgaXMgb2Z0ZW4gdXNlZCBvbmx5IGZvciBhZGp1c3RpbmcgdGhlIGRpc3BsYXkgb3JkZXIuXG4gICAgLy8gVGhlcmVmb3JlLCBvbmx5IGlmIG1hdGNoUGFyZW50IGlzIHNwZWNpZmllZCwgbWF0Y2ggdGhlIHNpemUgb2YgcGFyZW50RWxlbWVudFxuICAgIHZhciB3aW5kb3dNYW5hZ2VyID0gZnJhbWUuZ2V0V2luZG93TWFuYWdlcigpO1xuICAgIHZhciBwYXJlbnRFbGVtZW50ID0gd2luZG93TWFuYWdlci5nZXRQYXJlbnRFbGVtZW50KCk7XG4gICAgcGFyZW50V2lkdGggPSBwYXJlbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIHBhcmVudEhlaWdodCA9IHBhcmVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgaWYgKG1lLmhpZGVGcmFtZUJvcmRlcikge1xuICAgIF90b1dpZHRoID0gcGFyZW50V2lkdGg7XG4gICAgX3RvSGVpZ2h0ID0gcGFyZW50SGVpZ2h0ICsgKG1lLmhpZGVUaXRsZUJhciA/IGZyb20udGl0bGVCYXJIZWlnaHQgOiAwKTtcbiAgfSBlbHNlIHtcbiAgICBfdG9XaWR0aCA9IHBhcmVudFdpZHRoIC0gZnJvbS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCAqIDI7XG4gICAgX3RvSGVpZ2h0ID0gcGFyZW50SGVpZ2h0IC0gZnJvbS5mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCAqIDIgK1xuICAgICAgKG1lLmhpZGVUaXRsZUJhciA/IGZyb20udGl0bGVCYXJIZWlnaHQgOiAwKTtcbiAgfVxuICAvL2NvbXB1dGUgcG9zaXRpb24gYW5kIHNpemVbZW5kXVxuXG4gIGlmIChtZS5ob3Jpem9udGFsQWxpZ24gPT0gXCJyaWdodFwiKSB7XG4gICAgX3RvWCA9IC1fdG9XaWR0aDtcbiAgfVxuICBpZiAobWUudmVydGljYWxBbGlnbiA9PSBcImJvdHRvbVwiKSB7XG4gICAgX3RvWSA9IC1fdG9IZWlnaHQ7XG4gIH1cblxuICAvL3JlbmRlciBwb3NpdGlvbiBhbmQgc2l6ZVtiZWdpbl1cbiAgdmFyIGZ1bmNEb1JlbmRlciA9IGZ1bmN0aW9uIChvcHQpIHtcbiAgICB2YXIgZGlzYWJsZUNhbGxiYWNrID0gb3B0ICYmIG9wdC5kaXNhYmxlQ2FsbGJhY2s7XG5cbiAgICBmcmFtZS5zZXRQb3NpdGlvbihfdG9YLCBfdG9ZKTtcblxuICAgIGlmIChtZS5oaWRlRnJhbWVCb3JkZXIpIHtcbiAgICAgIGZyYW1lLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gMDtcbiAgICAgIGZyYW1lLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkID0gMDtcbiAgICAgIGZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gXCIwcHhcIjtcbiAgICB9XG4gICAgZnJhbWUuc2V0U2l6ZShfdG9XaWR0aCwgX3RvSGVpZ2h0LCB0cnVlKTtcblxuICAgIGlmIChkaXNhYmxlQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWUuaGlkZVRpdGxlQmFyKSB7XG4gICAgICAvLyB3aGVuIGZ1bGwgc2NyZWVuIG1vZGUobWVhbnMgaGlkZGVuIHRpdGxlIGJhcilcblxuICAgICAgaWYgKG1lLnJlc3RvcmVLZXkpIHtcbiAgICAgICAgbWUua2V5TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gbWUucmVzdG9yZUtleSkge1xuICAgICAgICAgICAgbWUuZG9Db21tYW5kKFwicmVzdG9yZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbWUua2V5TGlzdGVuZXIpO1xuXG4gICAgICAvL2FkZCBrZXlsaXN0ZW5lciBmb3IgaW5zaWRlIHRoZSBpZnJhbWVcbiAgICAgIGlmIChmcmFtZS5pZnJhbWUpIHtcbiAgICAgICAgZnJhbWUuaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgbWUua2V5TGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lLndpbmRvd01vZGUgPSBcIm1heGltaXplZFwiO1xuXG4gICAgaWYgKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSB7XG4gICAgICBtb2RlbC5jYWxsYmFjayhtZS5mcmFtZSwgeyBldmVudFR5cGU6IFwibWF4aW1pemVkXCIgfSk7XG4gICAgfVxuICAgIGlmIChtZS5ldmVudExpc3RlbmVyc1tcIm1heGltaXplZFwiXSkge1xuICAgICAgbWUuZXZlbnRMaXN0ZW5lcnNbXCJtYXhpbWl6ZWRcIl0obWUuZnJhbWUsIHsgZXZlbnRUeXBlOiBcIm1heGltaXplZFwiIH0pO1xuICAgIH1cbiAgfTsgLy8gZW5kIG9mIGZ1bmNEb1JlbmRlclxuXG4gIGlmIChtb2RlbCAmJiBtb2RlbC5hbmltYXRpb24pIHtcbiAgICBtZS5hbmltYXRlRnJhbWUoe1xuICAgICAgZnJhbWU6IGZyYW1lLFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIHRvOiB7XG4gICAgICAgIGxlZnQ6IF90b1gsXG4gICAgICAgIHRvcDogX3RvWSxcbiAgICAgICAgd2lkdGg6IF90b1dpZHRoLFxuICAgICAgICBoZWlnaHQ6IF90b0hlaWdodCxcbiAgICAgIH0sXG4gICAgICBkdXJhdGlvbjogbW9kZWwuZHVyYXRpb24gPyBtb2RlbC5kdXJhdGlvbiA6IG1lLmFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgY2FsbGJhY2s6IGZ1bmNEb1JlbmRlcixcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuY2FsbGVyID09PSBcImhhbmRsZU9uUmVzaXplXCIpIHtcbiAgICAgIGZ1bmNEb1JlbmRlcih7IGRpc2FibGVDYWxsYmFjazogdHJ1ZSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuY0RvUmVuZGVyKCk7XG4gICAgfVxuICB9XG4gIC8vcmVuZGVyIHBvc2l0aW9uIGFuZCBzaXplW2VuZF1cbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5nZXRXaW5kb3dNb2RlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy53aW5kb3dNb2RlO1xufTtcbi8qKlxuICogUmVzdG9yZSB3aW5kb3cgZnJvbSBtYXhpbWl6ZWQgbW9kZVxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuZG9EZW1heGltaXplID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIGlmIChtZS53aW5kb3dNb2RlID09PSBcImhpZFwiKSB7XG4gICAgLy9jb25zb2xlLmVycm9yKCdkZW1heGltaXplKD1yZWNvdmVyeSBmcm9tIG1heGltaXplZCkgY2Fubm90IGJlIHBlcmZvcm1lZCBpbiBoaWQgc3RhdGUuJyk7XG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICBcIltKU0ZyYW1lXSBkZW1heGltaXplKD1yZWNvdmVyeSBmcm9tIG1heGltaXplZCkgY2Fubm90IGJlIHBlcmZvcm1lZCBpbiBoaWQgc3RhdGUuXCIsXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIW1lLmhhc1dpbmRvd1N0YXRzKFwibWF4aW1pemVfbW9kZVwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChtZS5oaWRlVGl0bGVCYXIpIHtcbiAgfSBlbHNlIHtcbiAgICBpZiAobWUubWF4aW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLnNob3dGcmFtZUNvbXBvbmVudChtZS5tYXhpbWl6ZUJ1dHRvbiwgbWUuc3R5bGVEaXNwbGF5KTtcbiAgICB9XG4gICAgaWYgKG1lLmRlbWF4aW1pemVCdXR0b24pIHtcbiAgICAgIGZyYW1lLmhpZGVGcmFtZUNvbXBvbmVudChtZS5kZW1heGltaXplQnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICBtZS5yZXN0b3JlV2luZG93KHtcbiAgICByZXN0b3JlUG9zaXRpb246IHRydWUsXG4gICAgcmVzdG9yZU1vZGU6IFwibWF4aW1pemVfbW9kZVwiLFxuICAgIGFuaW1hdGlvbjogbWUuYW5pbWF0aW9uRW5hYmxlZCxcbiAgICBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCxcbiAgICBmb3JjZVNob3dGcmFtZUNvbXBvbmVudHM6IChtZS5hbmltYXRpb25FbmFibGVkICYmIG1lLmhpZGVUaXRsZUJhciksXG4gICAgZHVyYXRpb246IChtb2RlbCAmJiBtb2RlbC5kdXJhdGlvbikgPyBtb2RlbC5kdXJhdGlvbiA6IG51bGwsXG4gICAgZXZlbnRUeXBlOiBcImRlbWF4aW1pemVkXCIsXG4gIH0pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjaGFuZ2luZyB0aGUgd2luZG93IHNpemUgYnkgdXNlciBvcGVyYXRpb24gaW4gbWF4aW1pemVkIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmhhbmRsZU9uUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICBtZS5yZW5kZXJNYXhpbWl6ZWRNb2RlKHtcbiAgICBjYWxsZXI6IFwiaGFuZGxlT25SZXNpemVcIixcbiAgICAvL21hdGNoUGFyZW50OiB0cnVlXG4gIH0pO1xufTtcbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5oYW5kbGVPblZpcnR1YWxSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIG1lLnJlbmRlck1heGltaXplZE1vZGUoe1xuICAgIGNhbGxlcjogXCJoYW5kbGVPblJlc2l6ZVwiLFxuICAgIG1hdGNoUGFyZW50OiB0cnVlLFxuICB9KTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogTWFrZSB3aW5kb3cgbWluaW1pemVkIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvTWluaW1pemUgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAobWUud2luZG93TW9kZSA9PT0gXCJtaW5pbWl6ZWRcIiB8fCBtZS53aW5kb3dNb2RlID09PSBcIm1pbmltaXppbmdcIikge1xuICAgIC8vIElmIGl0J3MgYWxyZWFkeSAnbWluaW1pemVkJyBzdGF0dXMsIGl0IGRvZXNuJ3QgZG8gYW55dGhpbmcuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbWUud2luZG93TW9kZSA9IFwibWluaW1pemluZ1wiO1xuXG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIC8vUmVtZW1iZXIgdGhlIHN0YXRzIG9mIHRoZSB3aW5kb3cgYmVmb3JlIG1heGltaXppbmcgdGhlIHdpbmRvd1xuICBtZS5zYXZlQ3VycmVudFdpbmRvd1N0YXRzKFwibWluaW1pemVfbW9kZVwiKTtcblxuICBmcmFtZS5zZXRSZXNpemFibGUoZmFsc2UpO1xuXG4gIG1lLnJlbmRlck1pbmltaXplZE1vZGUoe1xuICAgIGFuaW1hdGlvbjogbWUuYW5pbWF0aW9uRW5hYmxlZCxcbiAgICBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCxcbiAgICBkdXJhdGlvbjogKG1vZGVsICYmIG1vZGVsLmR1cmF0aW9uKSA/IG1vZGVsLmR1cmF0aW9uIDogbnVsbCxcbiAgICB0b1dpZHRoOiAobW9kZWwgJiYgbW9kZWwudG9XaWR0aCkgPyBtb2RlbC50b1dpZHRoIDogbnVsbCxcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlbmRlciB3aW5kb3cgYXMgbWluaW1pemVkIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLnJlbmRlck1pbmltaXplZE1vZGUgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgdmFyIGZyYW1lID0gbWUuZnJhbWU7XG4gIHZhciByaSA9IG1lLmxvYWRXaW5kb3dTdGF0cyhcIm1pbmltaXplX21vZGVcIik7XG5cbiAgdmFyIGZyb20gPSBtZS5nZXRDdXJyZW50V2luZG93U3RhdHMoKTtcbiAgdmFyIHRvID0gbWUuZ2V0Q3VycmVudFdpbmRvd1N0YXRzKCk7XG5cbiAgdG8uaGVpZ2h0ID0gcmkudGl0bGVCYXJIZWlnaHQ7XG4gIGlmIChtb2RlbCAmJiBtb2RlbC50b1dpZHRoKSB7XG4gICAgdG8ud2lkdGggPSBtb2RlbC50b1dpZHRoO1xuICB9XG5cbiAgdmFyIGZ1bmNEb1JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZm9yY2VTZXRTaXplID0gdHJ1ZTtcbiAgICBmcmFtZS5zZXRTaXplKHRvLndpZHRoLCB0by5oZWlnaHQsIGZvcmNlU2V0U2l6ZSk7XG5cbiAgICBtZS53aW5kb3dNb2RlID0gXCJtaW5pbWl6ZWRcIjtcblxuICAgIGlmIChtZS5taW5pbWl6ZUJ1dHRvbikge1xuICAgICAgZnJhbWUuaGlkZUZyYW1lQ29tcG9uZW50KG1lLm1pbmltaXplQnV0dG9uKTtcbiAgICB9XG5cbiAgICBpZiAobWUuZGVtaW5pbWl6ZUJ1dHRvbikge1xuICAgICAgZnJhbWUuc2hvd0ZyYW1lQ29tcG9uZW50KG1lLmRlbWluaW1pemVCdXR0b24sIG1lLnN0eWxlRGlzcGxheSk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGVsLmNhbGxiYWNrKSB7XG4gICAgICBtb2RlbC5jYWxsYmFjayhtZS5mcmFtZSwgeyBldmVudFR5cGU6IFwibWluaW1pemVkXCIgfSk7XG4gICAgfVxuICAgIGlmIChtZS5ldmVudExpc3RlbmVyc1tcIm1pbmltaXplZFwiXSkge1xuICAgICAgbWUuZXZlbnRMaXN0ZW5lcnNbXCJtaW5pbWl6ZWRcIl0obWUuZnJhbWUsIHsgZXZlbnRUeXBlOiBcIm1pbmltaXplZFwiIH0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAobW9kZWwgJiYgbW9kZWwuYW5pbWF0aW9uKSB7XG4gICAgbWUuYW5pbWF0ZUZyYW1lKHtcbiAgICAgIHRvQWxwaGE6IDEuMCxcbiAgICAgIGR1cmF0aW9uOiBtb2RlbC5kdXJhdGlvbiA/IG1vZGVsLmR1cmF0aW9uIDogbWUuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBmcmFtZTogZnJhbWUsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgdG86IHRvLFxuICAgICAgY2FsbGJhY2s6IGZ1bmNEb1JlbmRlcixcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBmdW5jRG9SZW5kZXIoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXN0b3JlIHdpbmRvdyBmcm9tIG1pbmltaXplZCBtb2RlXG4gKi9cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5kb0RlbWluaW1pemUgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcblxuICBpZiAoIW1lLmhhc1dpbmRvd1N0YXRzKFwibWluaW1pemVfbW9kZVwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChtZS5taW5pbWl6ZUJ1dHRvbikge1xuICAgIGZyYW1lLnNob3dGcmFtZUNvbXBvbmVudChtZS5taW5pbWl6ZUJ1dHRvbiwgbWUuc3R5bGVEaXNwbGF5KTtcbiAgfVxuICBpZiAobWUuZGVtaW5pbWl6ZUJ1dHRvbikge1xuICAgIGZyYW1lLmhpZGVGcmFtZUNvbXBvbmVudChtZS5kZW1pbmltaXplQnV0dG9uKTtcbiAgfVxuXG4gIG1lLnJlc3RvcmVXaW5kb3coXG4gICAge1xuICAgICAgcmVzdG9yZVBvc2l0aW9uOiBmYWxzZSxcbiAgICAgIHJlc3RvcmVNb2RlOiBcIm1pbmltaXplX21vZGVcIixcbiAgICAgIGFuaW1hdGlvbjogbWUuYW5pbWF0aW9uRW5hYmxlZCxcbiAgICAgIGR1cmF0aW9uOiAobW9kZWwgJiYgbW9kZWwuZHVyYXRpb24pID8gbW9kZWwuZHVyYXRpb24gOiBudWxsLFxuICAgICAgY2FsbGJhY2s6IChtb2RlbCAmJiBtb2RlbC5jYWxsYmFjaykgPyBtb2RlbC5jYWxsYmFjayA6IG51bGwsXG4gICAgICBldmVudFR5cGU6IFwiZGVtaW5pbWl6ZWRcIixcbiAgICB9LFxuICApO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogTWFrZSB3aW5kb3cgaGlkZGVuIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvSGlkZSA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIGlmIChtZS53aW5kb3dNb2RlID09PSBcImhpZFwiIHx8IG1lLndpbmRvd01vZGUgPT09IFwiaGlkaW5nXCIpIHtcbiAgICAvLyBJZiBpdCdzIGFscmVhZHkgJ2hpZCcgc3RhdHVzLCBpdCBkb2Vzbid0IGRvIGFueXRoaW5nLlxuICAgIHJldHVybjtcbiAgfVxuXG4gIG1lLndpbmRvd01vZGUgPSBcImhpZGluZ1wiO1xuXG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIC8vUmVtZW1iZXIgdGhlIHN0YXRzIG9mIHRoZSB3aW5kb3cgYmVmb3JlIG1heGltaXppbmcgdGhlIHdpbmRvd1xuICBtZS5zYXZlQ3VycmVudFdpbmRvd1N0YXRzKFwiaGlkZV9tb2RlXCIpO1xuXG4gIGZyYW1lLnNldFJlc2l6YWJsZShmYWxzZSk7XG5cbiAgdmFyIGFyZyA9IHtcbiAgICAvLyAgICBzaWxlbnQ6IG1vZGVsLnNpbGVudCxcbiAgICBhbmltYXRpb246IG1lLmFuaW1hdGlvbkVuYWJsZWQsXG4gICAgLy8gZHVyYXRpb246IChtb2RlbCAmJiBtb2RlbC5kdXJhdGlvbikgPyBtb2RlbC5kdXJhdGlvbiA6IG51bGwsXG4gICAgLy8gY2FsbGJhY2s6IChtb2RlbCAmJiBtb2RlbC5jYWxsYmFjaykgPyBtb2RlbC5jYWxsYmFjayA6IG51bGwsXG4gICAgLy8gYWxpZ246IChtb2RlbCAmJiBtb2RlbC5hbGlnbikgPyBtb2RlbC5hbGlnbiA6IG51bGwsXG4gICAgLy8gb2Zmc2V0OiAobW9kZWwgJiYgbW9kZWwuYWxpZ24pID8gbW9kZWwub2Zmc2V0IDogbnVsbCxcbiAgfTtcbiAgaWYgKG1vZGVsKSB7XG4gICAgbWVyZ2VEZWVwbHkoeyBvcDogXCJvdmVyd3JpdGUtbWVyZ2VcIiwgb2JqZWN0MTogYXJnLCBvYmplY3QyOiBtb2RlbCB9KTtcbiAgfVxuICBtZS5yZW5kZXJIaWRlTW9kZShhcmcpO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgd2luZG93IGFzIGhpZGRlbiBtb2RlXG4gKi9cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5yZW5kZXJIaWRlTW9kZSA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcbiAgdmFyIHJpID0gbWUubG9hZFdpbmRvd1N0YXRzKFwiaGlkZV9tb2RlXCIpO1xuXG4gIHZhciBmcm9tID0gbWUuZ2V0Q3VycmVudFdpbmRvd1N0YXRzKCk7XG5cbiAgdmFyIG9mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuICB2YXIgdG9FbGVtZW50ID0gbW9kZWwudG9FbGVtZW50O1xuXG4gIGlmIChtb2RlbC5vZmZzZXQpIHtcbiAgICBvZmZzZXQgPSBtb2RlbC5vZmZzZXQ7XG4gIH1cblxuICB2YXIgbGVmdCA9IDA7XG4gIHZhciB0b3AgPSAwO1xuICB7XG4gICAgdmFyIGFsaWduID0gKG1vZGVsICYmIG1vZGVsLmFsaWduKSA/IG1vZGVsLmFsaWduIDogXCJMRUZUX1RPUFwiO1xuXG4gICAgaWYgKCFhbGlnbiB8fCBDQUxJR04uTEVGVF9UT1AgPT0gYWxpZ24pIHtcbiAgICAgIGxlZnQgPSBmcm9tLmxlZnQ7XG4gICAgICB0b3AgPSBmcm9tLnRvcDtcbiAgICB9IGVsc2UgaWYgKENBTElHTi5IQ0VOVEVSX1RPUCA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdCArIGZyb20ud2lkdGggLyAyO1xuICAgICAgdG9wID0gZnJvbS50b3A7XG4gICAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVE9QID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0ICsgZnJvbS53aWR0aDtcbiAgICAgIHRvcCA9IGZyb20udG9wO1xuICAgIH0gZWxzZSBpZiAoQ0FMSUdOLkxFRlRfVkNFTlRFUiA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdDtcbiAgICAgIHRvcCA9IGZyb20udG9wICsgZnJvbS5oZWlnaHQgLyAyO1xuICAgIH0gZWxzZSBpZiAoQ0FMSUdOLkhDRU5URVJfVkNFTlRFUiA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdCArIGZyb20ud2lkdGggLyAyO1xuICAgICAgdG9wID0gZnJvbS50b3AgKyBmcm9tLmhlaWdodCAvIDI7XG4gICAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfVkNFTlRFUiA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdCArIGZyb20ud2lkdGg7XG4gICAgICB0b3AgPSBmcm9tLnRvcCArIGZyb20uaGVpZ2h0IC8gMjtcbiAgICB9IGVsc2UgaWYgKENBTElHTi5MRUZUX0JPVFRPTSA9PSBhbGlnbikge1xuICAgICAgbGVmdCA9IGZyb20ubGVmdDtcbiAgICAgIHRvcCA9IGZyb20udG9wICsgZnJvbS5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChDQUxJR04uSENFTlRFUl9CT1RUT00gPT0gYWxpZ24pIHtcbiAgICAgIGxlZnQgPSBmcm9tLmxlZnQgKyBmcm9tLndpZHRoIC8gMjtcbiAgICAgIHRvcCA9IGZyb20udG9wICsgZnJvbS5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChDQUxJR04uUklHSFRfQk9UVE9NID09IGFsaWduKSB7XG4gICAgICBsZWZ0ID0gZnJvbS5sZWZ0ICsgZnJvbS53aWR0aDtcbiAgICAgIHRvcCA9IGZyb20udG9wICsgZnJvbS5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChcIkFCU09MVVRFXCIgPT0gYWxpZ24pIHtcbiAgICAgIGlmICh0b0VsZW1lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRSZWN0ID0gdG9FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAobWUuaXNXaW5kb3dNYW5hZ2VyRml4ZWQpIHtcbiAgICAgICAgICBsZWZ0ID0gZWxlbWVudFJlY3QubGVmdDtcbiAgICAgICAgICB0b3AgPSBlbGVtZW50UmVjdC50b3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGVmdCA9IGVsZW1lbnRSZWN0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQ7XG4gICAgICAgICAgdG9wID0gZWxlbWVudFJlY3QudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0ID0gb2Zmc2V0Lng7XG4gICAgICAgIHRvcCA9IG9mZnNldC55O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB0byA9IHtcbiAgICBsZWZ0OiBsZWZ0LFxuICAgIHRvcDogdG9wLFxuICAgIHdpZHRoOiAwLFxuICAgIC8vbWluaW11bSBoZWlnaHQgbXVzdCBiZSB0aXRsZUJhckhlaWdodFxuICAgIGhlaWdodDogcmkudGl0bGVCYXJIZWlnaHQsXG4gIH07XG5cbiAgdmFyIGZ1bmNEb1JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZm9yY2VTZXRTaXplID0gdHJ1ZTtcbiAgICBmcmFtZS5zZXRTaXplKHRvLndpZHRoLCB0by5oZWlnaHQsIGZvcmNlU2V0U2l6ZSk7XG4gICAgLy9mcmFtZS5oaWRlKCk7XG5cbiAgICBtZS53aW5kb3dNb2RlID0gXCJoaWRcIjtcblxuICAgIGlmIChtb2RlbCAmJiBtb2RlbC5jYWxsYmFjaykge1xuICAgICAgbW9kZWwuY2FsbGJhY2sobWUuZnJhbWUsIHsgZXZlbnRUeXBlOiBcImhpZFwiIH0pO1xuICAgIH1cbiAgICBpZiAobWUuZXZlbnRMaXN0ZW5lcnNbXCJoaWRcIl0pIHtcbiAgICAgIG1lLmV2ZW50TGlzdGVuZXJzW1wiaGlkXCJdKG1lLmZyYW1lLCB7IGV2ZW50VHlwZTogXCJoaWRcIiB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy9IaWRlIG9ubHkgdGhlIGN1cnJlbnRseSB2aXNpYmxlIEZyYW1lQ29tcG9uZW50XG4gIGZyYW1lLmhpZGVBbGxWaXNpYmxlRnJhbWVDb21wb25lbnRzKCk7XG5cbiAgaWYgKG1vZGVsICYmIG1vZGVsLmFuaW1hdGlvbikge1xuICAgIG1lLmFuaW1hdGVGcmFtZSh7XG4gICAgICBmcm9tQWxwaGE6IG1vZGVsLnNpbGVudCA/IDAgOiAxLjAsXG4gICAgICB0b0FscGhhOiAwLFxuICAgICAgZWFzZTogdHJ1ZSxcbiAgICAgIGR1cmF0aW9uOiBtb2RlbC5kdXJhdGlvbiA/IG1vZGVsLmR1cmF0aW9uIDogbWUuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBmcmFtZTogZnJhbWUsXG4gICAgICBmcm9tOiBmcm9tLFxuICAgICAgdG86IHRvLFxuICAgICAgY2FsbGJhY2s6IGZ1bmNEb1JlbmRlcixcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBmdW5jRG9SZW5kZXIoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXN0b3JlIHdpbmRvdyBmcm9tIGhpZGVkIG1vZGVcbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmRvRGVoaWRlID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIGlmICghbWUuaGFzV2luZG93U3RhdHMoXCJoaWRlX21vZGVcIikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBtZS5yZXN0b3JlV2luZG93KFxuICAgIHtcbiAgICAgIGR1cmF0aW9uOiAobW9kZWwgJiYgbW9kZWwuZHVyYXRpb24pID8gbW9kZWwuZHVyYXRpb24gOiBudWxsLFxuICAgICAgcmVzdG9yZVBvc2l0aW9uOiB0cnVlLFxuICAgICAgcmVzdG9yZU1vZGU6IFwiaGlkZV9tb2RlXCIsXG4gICAgICBhbmltYXRpb246IG1lLmFuaW1hdGlvbkVuYWJsZWQsXG4gICAgICBmb3JjZVNob3dGcmFtZUNvbXBvbmVudHM6IHRydWUsXG4gICAgICBjYWxsYmFjazogKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSA/IG1vZGVsLmNhbGxiYWNrIDogbnVsbCxcbiAgICAgIGV2ZW50VHlwZTogXCJkZWhpZGVkXCIsXG4gICAgfSxcbiAgKTtcbn07XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLmxvYWRXaW5kb3dTdGF0cyA9IGZ1bmN0aW9uIChzdG9yZUtleU5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXTtcbn07XG5cbi8qKlxuICogUmVtZW1iZXIgdGhlIHN0YXR1cyBvZiB0aGUgd2luZG93IGJlZm9yZSBtYXhpbWl6aW5nIG9yIG1pbmltaXppbmcgdGhlIHdpbmRvdyBzaXplXG4gKiBAcGFyYW0gc3RvcmVLZXlOYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBzdGF0dXMgb2YgdGhlIHdpbmRvdyBoYXMgYmVlbiB1cGRhdGVkIG9yIGlzIGEgbmV3IHN0YXR1cy5cbiAqIFJldHVybnMgZmFsc2UgaWYgdGhlIHN0YXR1cyBoYXMgbm90IGJlZW4gdXBkYXRlZC5cbiAqL1xuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLnNhdmVDdXJyZW50V2luZG93U3RhdHMgPSBmdW5jdGlvbiAoc3RvcmVLZXlOYW1lKSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgdmFyIGNycldpbmRvd1N0YXRzID0gbWUuZ2V0Q3VycmVudFdpbmRvd1N0YXRzKCk7XG5cbiAgaWYgKG1lLmhhc1dpbmRvd1N0YXRzKHN0b3JlS2V5TmFtZSkpIHtcbiAgICB2YXIgc3RvcmVkU3RhdHMgPSBtZS5sb2FkV2luZG93U3RhdHMoc3RvcmVLZXlOYW1lKTtcbiAgICB2YXIgaXNXaW5kb3dTdGF0c1VwZGF0ZWQgPSAhbWUud2luZG93U3RhdHNFcXVhbHMoXG4gICAgICBjcnJXaW5kb3dTdGF0cyxcbiAgICAgIHN0b3JlZFN0YXRzLFxuICAgICk7XG5cbiAgICBpZiAoaXNXaW5kb3dTdGF0c1VwZGF0ZWQpIHtcbiAgICAgIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXSA9IGNycldpbmRvd1N0YXRzO1xuICAgIH1cblxuICAgIHJldHVybiBpc1dpbmRvd1N0YXRzVXBkYXRlZDtcbiAgfSBlbHNlIHtcbiAgICBtZS5zdGF0c1N0b3JlW3N0b3JlS2V5TmFtZV0gPSBjcnJXaW5kb3dTdGF0cztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLndpbmRvd1N0YXRzRXF1YWxzID0gZnVuY3Rpb24gKFxuICB3aW5kb3dTdGF0czEsXG4gIHdpbmRvd1N0YXRzMixcbikge1xuICBpZiAod2luZG93U3RhdHMxICYmIHdpbmRvd1N0YXRzMikge1xuICAgIHZhciByZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh3aW5kb3dTdGF0czEpID09PSBKU09OLnN0cmluZ2lmeSh3aW5kb3dTdGF0czIpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuY2xlYXJXaW5kb3dTdGF0cyA9IGZ1bmN0aW9uIChzdG9yZUtleU5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgbWUuc3RhdHNTdG9yZVtzdG9yZUtleU5hbWVdID0gbnVsbDtcbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5oYXNXaW5kb3dTdGF0cyA9IGZ1bmN0aW9uIChzdG9yZUtleU5hbWUpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgcmV0dXJuIG1lLnN0YXRzU3RvcmVbc3RvcmVLZXlOYW1lXTtcbn07XG5cbldpbmRvd0V2ZW50SGVscGVyLnByb3RvdHlwZS5nZXRDdXJyZW50V2luZG93U3RhdHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBmcmFtZSA9IG1lLmZyYW1lO1xuXG4gIC8vQWNxdWlyZSB3aW5kb3cncyBzdGF0c1xuICB2YXIgX190aXRsZUJhckhlaWdodCA9IHBhcnNlSW50KGZyYW1lLnRpdGxlQmFyLnN0eWxlLmhlaWdodCwgMTApO1xuICB2YXIgX19mcmFtZUJvcmRlcldpZHRoRGVmYXVsdCA9IGZyYW1lLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0OyAvLyBwYXJzZUludChmcmFtZS5odG1sRWxlbWVudC5zdHlsZS5ib3JkZXJXaWR0aCwgMTApO1xuICB2YXIgX19mcmFtZUJvcmRlcldpZHRoRm9jdXNlZCA9IGZyYW1lLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkO1xuICB2YXIgX19sZWZ0ID0gZnJhbWUuZ2V0TGVmdCgpO1xuICB2YXIgX190b3AgPSBmcmFtZS5nZXRUb3AoKTtcbiAgdmFyIF9fd2lkdGggPSBmcmFtZS5nZXRXaWR0aCgpO1xuICB2YXIgX19oZWlnaHQgPSBmcmFtZS5nZXRIZWlnaHQoKTtcbiAgdmFyIF9fcmVzaXphYmxlID0gZnJhbWUucmVzaXphYmxlO1xuICB2YXIgX19tb3ZhYmxlID0gZnJhbWUubW92YWJsZTtcblxuICByZXR1cm4ge1xuICAgIGxlZnQ6IF9fbGVmdCxcbiAgICB0b3A6IF9fdG9wLFxuICAgIHdpZHRoOiBfX3dpZHRoLFxuICAgIGhlaWdodDogX19oZWlnaHQsXG4gICAgdGl0bGVCYXJIZWlnaHQ6IF9fdGl0bGVCYXJIZWlnaHQsXG4gICAgZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ6IF9fZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQsXG4gICAgZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQ6IF9fZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQsXG4gICAgcmVzaXphYmxlOiBfX3Jlc2l6YWJsZSxcbiAgICBtb3ZhYmxlOiBfX21vdmFibGUsXG4gIH07XG59O1xuXG4vKipcbiAqIFJlc3RvcmUgdGhlIHN0YXRlIG9mIHRoZSB3aW5kb3dcbiAqIEBwYXJhbSBtb2RlbFxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUucmVzdG9yZVdpbmRvdyA9IGZ1bmN0aW9uIChtb2RlbCkge1xuICB2YXIgbWUgPSB0aGlzO1xuICB2YXIgZnJhbWUgPSBtZS5mcmFtZTtcbiAgdmFyIHRvID0gbWUubG9hZFdpbmRvd1N0YXRzKG1vZGVsLnJlc3RvcmVNb2RlKTtcbiAgLy/nj77lnKjjga7nirbmhYvjgpLkuIDmmYLkv53lrZjjgZnjgotcbiAgLy9tZS5zYXZlQ3VycmVudFdpbmRvd1N0YXRzKCd0ZW1wJyk7XG4gIHZhciBjcnIgPSBtZS5nZXRDdXJyZW50V2luZG93U3RhdHMoKTsgLy9sb2FkV2luZG93U3RhdHMoJ3RlbXAnKTtcblxuICAvL+S7peS4i+OBrjPjgaTjga/jgIHjg5zjg7zjg4Djg7zjgpLlpKrjgZXjgpLlpInmm7TjgZnjgovjgZ/jgoHjga7jgoLjga7jgaDjgYxcbiAgLy8gZnVuY0RvUmVuZGVy5YaF44Gn5Yem55CG44GX44Gm44GX44G+44GG44Go44Ki44OL44Oh44O844K344On44Oz5Lit44Gr44Gv44Oc44O844OA44O844GM5o+P44GL44KM44Gq44GP44Gq44KLXG4gIC8v44Ki44OL44Oh44O844K344On44Oz5Lit44Gr44Gv44Oc44O844OA44O844Gv5b6p5rS744GX44Gm44GE44Gf44G744GG44GM6Ieq54S244Gq44Gu44GnZnVuY0RvUmVuZGVy5aSW44Gn5a6f6KGM44GZ44KLXG4gIGZyYW1lLmZyYW1lQm9yZGVyV2lkdGhEZWZhdWx0ID0gdG8uZnJhbWVCb3JkZXJXaWR0aERlZmF1bHQ7XG4gIGZyYW1lLmZyYW1lQm9yZGVyV2lkdGhGb2N1c2VkID0gdG8uZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQ7XG4gIGZyYW1lLmh0bWxFbGVtZW50LnN0eWxlLmJvcmRlcldpZHRoID0gZnJhbWUuZnJhbWVCb3JkZXJXaWR0aEZvY3VzZWQ7XG5cbiAgdmFyIGZ1bmNEb1JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobW9kZWwgJiYgbW9kZWwucmVzdG9yZVBvc2l0aW9uID09IGZhbHNlKSB7XG4gICAgICAvL+S9jee9ruOBruenu+WLleOCkuS8tOOCj+OBquOBhOWgtOWQiO+8iOacgOWwj+WMluOBi+OCieaIu+OBmeOBqOOBjeOBquOBqSlcbiAgICAgIHRvLmxlZnQgPSBjcnIubGVmdDtcbiAgICAgIHRvLnRvcCA9IGNyci50b3A7XG4gICAgfVxuXG4gICAgZnJhbWUuc2V0UG9zaXRpb24odG8ubGVmdCwgdG8udG9wKTtcblxuICAgIHZhciBmb3JjZSA9IHRydWU7XG4gICAgZnJhbWUuc2V0U2l6ZSh0by53aWR0aCwgdG8uaGVpZ2h0LCBmb3JjZSk7XG5cbiAgICBmcmFtZS5zZXRSZXNpemFibGUodG8ucmVzaXphYmxlKTtcbiAgICBmcmFtZS5zZXRNb3ZhYmxlKHRvLm1vdmFibGUpO1xuXG4gICAgbWUuY2xlYXJXaW5kb3dTdGF0cyhtb2RlbC5yZXN0b3JlTW9kZSk7XG5cbiAgICBpZiAobWUua2V5TGlzdGVuZXIpIHtcbiAgICAgIC8v44K/44Kk44OI44Or44OQ44O854Sh44GX5pyA5aSn5YyW54q25oWL44GL44KJ5oi744GZ44Gf44KB44Gu44Kt44O844Oq44K544OK44O844Gv5YmK6Zmk44GZ44KLXG5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBtZS5rZXlMaXN0ZW5lcik7XG4gICAgICBpZiAoZnJhbWUuaWZyYW1lKSB7XG4gICAgICAgIGZyYW1lLmlmcmFtZS5jb250ZW50V2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgXCJrZXlkb3duXCIsXG4gICAgICAgICAgbWUua2V5TGlzdGVuZXIsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBtZS5rZXlMaXN0ZW5lciA9IG51bGw7XG4gICAgfVxuXG4gICAgbWUud2luZG93TW9kZSA9IFwiZGVmYXVsdFwiO1xuXG4gICAgaWYgKG1vZGVsICYmIG1vZGVsLmZvcmNlU2hvd0ZyYW1lQ29tcG9uZW50cykge1xuICAgICAgLy/jgqbjgqPjg7Pjg4njgqbjga7jg6Ljg7zjg4nlpInmm7TliY3jgavlj6/oppbnirbmhYvjgavjgYLjgaPjgZ/jg5Xjg6zjg7zjg6DjgrPjg7Pjg53jg7zjg43jg7Pjg4jvvIjplonjgZjjgovjg5zjgr/jg7PpoZ7vvInjgpLlj6/oppbnirbmhYvjgavjgZnjgotcbiAgICAgIGZyYW1lLnNob3dBbGxWaXNpYmxlRnJhbWVDb21wb25lbnRzKCk7XG4gICAgfVxuXG4gICAgZnJhbWUuc2hvdygpO1xuXG4gICAgdmFyIGV2ZW50VHlwZSA9IFwicmVzdG9yZWRcIjtcbiAgICBpZiAobW9kZWwgJiYgbW9kZWwuZXZlbnRUeXBlKSB7XG4gICAgICBldmVudFR5cGUgPSBtb2RlbC5ldmVudFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKG1vZGVsICYmIG1vZGVsLmNhbGxiYWNrKSB7XG4gICAgICBtb2RlbC5jYWxsYmFjayhcbiAgICAgICAgbWUuZnJhbWUsXG4gICAgICAgIHsgZXZlbnRUeXBlOiBldmVudFR5cGUgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChtZS5ldmVudExpc3RlbmVyc1tldmVudFR5cGVdKSB7XG4gICAgICBtZS5ldmVudExpc3RlbmVyc1tldmVudFR5cGVdKG1lLmZyYW1lLCB7IGV2ZW50VHlwZTogZXZlbnRUeXBlIH0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAobW9kZWwgJiYgbW9kZWwuYW5pbWF0aW9uKSB7XG4gICAgbWUuYW5pbWF0ZUZyYW1lKHtcbiAgICAgIGR1cmF0aW9uOiBtb2RlbC5kdXJhdGlvbiA/IG1vZGVsLmR1cmF0aW9uIDogbWUuYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBmcmFtZTogZnJhbWUsXG4gICAgICBmcm9tQWxwaGE6IDAsXG4gICAgICB0b0FscGhhOiAxLFxuICAgICAgZnJvbTogY3JyLFxuICAgICAgdG86IHRvLFxuICAgICAgY2FsbGJhY2s6IGZ1bmNEb1JlbmRlcixcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBmdW5jRG9SZW5kZXIoKTtcbiAgfVxuXG4gIC8vd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG1lLnJlc2l6ZUxpc3RlbmVyKTtcbiAgbWUuZXZlbnRMaXN0ZW5lckhlbHBlci5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgIHdpbmRvdyxcbiAgICBcInJlc2l6ZVwiLFxuICAgIG1lLnJlc2l6ZUxpc3RlbmVyLFxuICApO1xuICBpZiAobWUubWF0Y2hQYXJlbnRSZXNpemVPYnNlcnZlcikge1xuICAgIG1lLm1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIG1lLm1hdGNoUGFyZW50UmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuICB9XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuYW5pbWF0ZUZyYW1lID0gZnVuY3Rpb24gKG1vZGVsKSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBuZWVkUmVxdWVzdEZvY3VzQWZ0ZXJBbmltYXRpb24gPSBmYWxzZTtcblxuICB2YXIgZnJvbUFscGhhID0gIWlzTmFOKG1vZGVsLmZyb21BbHBoYSkgPyBtb2RlbC5mcm9tQWxwaGEgOiAxLjA7XG5cbiAgdmFyIGZyb20gPSBtb2RlbC5mcm9tO1xuICB2YXIgdG8gPSBtb2RlbC50bztcblxuICB2YXIgYW5pbWF0b3IgPSBuZXcgQ1NpbXBsZUxheW91dEFuaW1hdG9yKCk7XG5cbiAgYW5pbWF0b3Iuc2V0KG1vZGVsLmZyYW1lKVxuICAgIC5zZXREdXJhdGlvbihtb2RlbC5kdXJhdGlvbiA/IG1vZGVsLmR1cmF0aW9uIDogbWUuYW5pbWF0aW9uRHVyYXRpb24pXG4gICAgLmZyb21Qb3NpdGlvbihmcm9tLmxlZnQsIGZyb20udG9wLCBcIkxFRlRfVE9QXCIpXG4gICAgLnRvUG9zaXRpb24odG8ubGVmdCwgdG8udG9wLCBcIkxFRlRfVE9QXCIpXG4gICAgLmZyb21XaWR0aChmcm9tLndpZHRoKVxuICAgIC5mcm9tSGVpZ2h0KGZyb20uaGVpZ2h0KVxuICAgIC50b1dpZHRoKHRvLndpZHRoKVxuICAgIC50b0hlaWdodCh0by5oZWlnaHQpXG4gICAgLmZyb21BbHBoYShmcm9tQWxwaGEpXG4gICAgLnRvQWxwaGEoKG1vZGVsLnRvQWxwaGEgPT0gMCkgPyAwIDogMS4wKVxuICAgIC5lYXNlKG1vZGVsLmVhc2UpXG4gICAgLnN0YXJ0KDAsIG5lZWRSZXF1ZXN0Rm9jdXNBZnRlckFuaW1hdGlvbilcbiAgICAudGhlbihmdW5jdGlvbiAoYW5pbWF0b3JPYmopIHtcbiAgICAgIG1vZGVsW1wiY2FsbGJhY2tcIl0oKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUGVyZm9ybSBjb21wbGV4IHdpbmRvd2luZyB3aXRoIHNpbXBsZSBjb21tYW5kc1xuICogQHBhcmFtIGNtZFxuICogQHBhcmFtIG9wdFxuICovXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuZG9Db21tYW5kID0gZnVuY3Rpb24gKGNtZCwgb3B0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG5cbiAgaWYgKGNtZCA9PT0gXCJtYXhpbWl6ZVwiKSB7XG4gICAgbWUuX2RlZmF1bHRGdW5jdGlvbk1heGltaXplKG1lLmZyYW1lKTtcbiAgfVxuICBpZiAoY21kID09PSBcImRlbWF4aW1pemVcIikge1xuICAgIG1lLl9kZWZhdWx0RnVuY3Rpb25EZW1heGltaXplKG1lLmZyYW1lKTtcbiAgfVxuICBpZiAoY21kID09PSBcInJlc3RvcmVcIikge1xuICAgIG1lLl9kZWZhdWx0RnVuY3Rpb25SZXN0b3JlRnJvbUZ1bGxzY3JlZW4obWUuZnJhbWUpO1xuICB9XG4gIGlmIChjbWQgPT09IFwibWluaW1pemVcIikge1xuICAgIG1lLl9kZWZhdWx0RnVuY3Rpb25NaW5pbWl6ZShtZS5mcmFtZSk7XG4gIH1cbiAgaWYgKGNtZCA9PT0gXCJkZW1pbmltaXplXCIpIHtcbiAgICBtZS5fZGVmYXVsdEZ1bmN0aW9uRGVtaW5pbWl6ZShtZS5mcmFtZSk7XG4gIH1cbiAgaWYgKGNtZCA9PT0gXCJoaWRlXCIpIHtcbiAgICBtZS5fZGVmYXVsdEZ1bmN0aW9uSGlkZShtZS5mcmFtZSk7XG4gIH1cbiAgaWYgKGNtZCA9PT0gXCJkZWhpZGVcIikge1xuICAgIG1lLl9kZWZhdWx0RnVuY3Rpb25EZWhpZGUobWUuZnJhbWUpO1xuICB9XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvbk1heGltaXplID0gZnVuY3Rpb24gKF9mcmFtZSwgZXZ0KSB7XG4gIHZhciBtZSA9IHRoaXM7XG4gIHZhciBtb2RlbCA9IG1lLm9wdHM7XG5cbiAgdmFyIHBhcmFtID0ge1xuICAgIC8vIERFUFJFQ0FURUQ6IG1heGltaXplV2l0aG91dFRpdGxlQmFyIGlzIGRlcHJlY2F0ZWRcbiAgICAvLyBVU0UgbWF4aW1pemVQYXJhbS5mdWxsU2NyZWVuXG4gICAgZnVsbFNjcmVlbjogKG1vZGVsLm1heGltaXplV2l0aG91dFRpdGxlQmFyID09PSB0cnVlKSA/IHRydWUgOiBmYWxzZSxcblxuICAgIC8vIERFUFJFQ0FURUQ6IG1vZGVsLnJlc3RvcmVLZXkgaXMgZGVwcmVjYXRlZFxuICAgIC8vIFVTRSBtYXhpbWl6ZVBhcmFtLnJlc3RvcmVLZXlcblxuICAgIC8vIElmIHlvdSB3YW50IHRvIHVzZSB0aGUga2V5IGlucHV0IGluc3RlYWQgb2YgdGhlIHRpdGxlIGJhcixcbiAgICAvLyB5b3UgY2FuIHNwZWNpZnkgdGhlIGtleSBiZWNhdXNlIGl0IGlzIG5vdCBwb3NzaWJsZVxuICAgIC8vIHRvIHJlY292ZXIgd2l0aCB0aGUgYnV0dG9uIHdoZW4gaGlkaW5nIHRoZSB0aXRsZSBiYXIuXG4gICAgcmVzdG9yZUtleTogbW9kZWwucmVzdG9yZUtleSA/IG1vZGVsLnJlc3RvcmVLZXkgOiBcIkVzY2FwZVwiLFxuXG4gICAgLy8gREVQUkVDQVRFRDogbW9kZWwucmVzdG9yZUR1cmF0aW9uIGlzIGRlcHJlY2F0ZWRcbiAgICAvLyBVU0UgbWF4aW1pemVQYXJhbS5yZXN0b3JlRHVyYXRpb25cbiAgICByZXN0b3JlRHVyYXRpb246IG1vZGVsLnJlc3RvcmVEdXJhdGlvbixcbiAgfTtcblxuICBpZiAodGhpcy5tYXhpbWl6ZVBhcmFtKSB7XG4gICAgLy8gd3JpdGUgbWF4aW1pemVQYXJhbSBpbnRvIHBhcmFtXG4gICAgbWVyZ2VEZWVwbHkoXG4gICAgICB7IG9wOiBcIm92ZXJ3cml0ZS1tZXJnZVwiLCBvYmplY3QxOiBwYXJhbSwgb2JqZWN0MjogdGhpcy5tYXhpbWl6ZVBhcmFtIH0sXG4gICAgKTtcbiAgfVxuXG4gIC8v44Km44Kj44Oz44OJ44Km44KS5pyA5aSn5YyW44GZ44KLXG4gIF9mcmFtZS5jb250cm9sLmRvTWF4aW1pemUocGFyYW0pO1xufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLl9kZWZhdWx0RnVuY3Rpb25EZW1heGltaXplID0gZnVuY3Rpb24gKFxuICBfZnJhbWUsXG4gIGV2dCxcbikge1xuICBfZnJhbWUuY29udHJvbC5kb0RlbWF4aW1pemUoXG4gICAge30sXG4gICk7XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvblJlc3RvcmVGcm9tRnVsbHNjcmVlbiA9IGZ1bmN0aW9uIChcbiAgX2ZyYW1lLFxuICBldnQsXG4pIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgX2ZyYW1lLmNvbnRyb2wuZG9EZW1heGltaXplKHtcbiAgICBkdXJhdGlvbjogbWUucmVzdG9yZUR1cmF0aW9uID8gbWUucmVzdG9yZUR1cmF0aW9uIDogbnVsbCxcbiAgICBjYWxsYmFjazogbWUucmVzdG9yZUNhbGxiYWNrID8gbWUucmVzdG9yZUNhbGxiYWNrIDogbnVsbCxcbiAgfSk7XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvbk1pbmltaXplID0gZnVuY3Rpb24gKF9mcmFtZSwgZXZ0KSB7XG4gIC8vJ21pbmltaXplQnV0dG9uJ+OBjOaKvOOBleOCjOOBn+OBqOOBjeOBq+OAgeacgOWwj+WMluOBl+OBn+OBhOWgtOWQiFxuICBfZnJhbWUuY29udHJvbC5kb01pbmltaXplKHRoaXMubWluaW1pemVQYXJhbSk7XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvbkRlbWluaW1pemUgPSBmdW5jdGlvbiAoXG4gIF9mcmFtZSxcbiAgZXZ0LFxuKSB7XG4gIF9mcmFtZS5jb250cm9sLmRvRGVtaW5pbWl6ZSh0aGlzLmRlbWluaW1pemVQYXJhbSk7XG59O1xuXG5XaW5kb3dFdmVudEhlbHBlci5wcm90b3R5cGUuX2RlZmF1bHRGdW5jdGlvbkhpZGUgPSBmdW5jdGlvbiAoX2ZyYW1lLCBldnQpIHtcbiAgdmFyIHBhcmFtID0ge1xuICAgIGFsaWduOiBcIkNFTlRFUl9CT1RUT01cIixcbiAgfTtcbiAgaWYgKHRoaXMuaGlkZVBhcmFtKSB7XG4gICAgcGFyYW0gPSB0aGlzLmhpZGVQYXJhbTtcbiAgfVxuICBfZnJhbWUuY29udHJvbC5kb0hpZGUocGFyYW0pO1xufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLl9kZWZhdWx0RnVuY3Rpb25EZWhpZGUgPSBmdW5jdGlvbiAoX2ZyYW1lLCBldnQpIHtcbiAgdmFyIG1lID0gdGhpcztcbiAgX2ZyYW1lLmNvbnRyb2wuZG9EZWhpZGUobWUuZGVoaWRlUGFyYW0pO1xufTtcblxuV2luZG93RXZlbnRIZWxwZXIucHJvdG90eXBlLnNldHVwRGVmYXVsdEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBpZiAobWUubWF4aW1pemVCdXR0b24pIHtcbiAgICAvL+OCpOODmeODs+ODiOOBr+OCquODvOODkOODvOODqeOCpOODieOBleOCjOOCi1xuICAgIG1lLmZyYW1lLm9uKFxuICAgICAgbWUubWF4aW1pemVCdXR0b24sXG4gICAgICBcImNsaWNrXCIsXG4gICAgICBtZS5fZGVmYXVsdEZ1bmN0aW9uTWF4aW1pemUuYmluZChtZSksXG4gICAgKTtcbiAgfVxuXG4gIGlmIChtZS5kZW1heGltaXplQnV0dG9uKSB7XG4gICAgbWUuZnJhbWUub24oXG4gICAgICBtZS5kZW1heGltaXplQnV0dG9uLFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgbWUuX2RlZmF1bHRGdW5jdGlvbkRlbWF4aW1pemUuYmluZChtZSksXG4gICAgKTtcbiAgfVxuXG4gIGlmIChtZS5taW5pbWl6ZUJ1dHRvbikge1xuICAgIG1lLmZyYW1lLm9uKFxuICAgICAgbWUubWluaW1pemVCdXR0b24sXG4gICAgICBcImNsaWNrXCIsXG4gICAgICBtZS5fZGVmYXVsdEZ1bmN0aW9uTWluaW1pemUuYmluZChtZSksXG4gICAgKTtcbiAgfVxuXG4gIGlmIChtZS5kZW1pbmltaXplQnV0dG9uKSB7XG4gICAgbWUuZnJhbWUub24oXG4gICAgICBtZS5kZW1pbmltaXplQnV0dG9uLFxuICAgICAgXCJjbGlja1wiLFxuICAgICAgbWUuX2RlZmF1bHRGdW5jdGlvbkRlbWluaW1pemUuYmluZChtZSksXG4gICAgKTtcbiAgfVxuXG4gIGlmIChtZS5oaWRlQnV0dG9uKSB7XG4gICAgbWUuZnJhbWUub24obWUuaGlkZUJ1dHRvbiwgXCJjbGlja1wiLCBtZS5fZGVmYXVsdEZ1bmN0aW9uSGlkZS5iaW5kKG1lKSk7XG4gIH1cblxuICBpZiAobWUuaGlkZUJ1dHRvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWUuaGlkZUJ1dHRvbnMpIHtcbiAgICAgIHZhciBoaWRlQnV0dG9uID0gbWUuaGlkZUJ1dHRvbnNba2V5XTtcbiAgICAgIGlmIChoaWRlQnV0dG9uKSB7XG4gICAgICAgIG1lLmZyYW1lLm9uKGhpZGVCdXR0b24sIFwiY2xpY2tcIiwgbWUuX2RlZmF1bHRGdW5jdGlvbkhpZGUuYmluZChtZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXaW5kb3dFdmVudEhlbHBlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gbW9kdWxlWydkZWZhdWx0J10gOlxuXHRcdCgpID0+IG1vZHVsZTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xucmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=