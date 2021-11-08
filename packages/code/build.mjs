var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  __markAsModule(target);
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// js/workers/getWorker.mjs
var getWorker;
var init_getWorker = __esm({
  "js/workers/getWorker.mjs"() {
    getWorker = (file) => {
      let workerSrc4;
      let forceNormalWorker4 = false;
      const { pathname } = window.location;
      if (pathname.indexOf("/ipfs/") !== -1) {
        const cid = pathname.slice(6, 52);
        forceNormalWorker4 = true;
        workerSrc4 = `/ipfs/${cid}/js/workers/${file}`;
      } else if (location.origin !== "https://code.spike.land") {
        forceNormalWorker4 = true;
        workerSrc4 = window.URL.createObjectURL(new Blob([
          `self.importScripts("https://code.spike.land/js/workers/${file}");`
        ]));
      } else {
        workerSrc4 = `https://code.spike.land/js/workers/${file}`;
      }
      return {
        workerSrc: workerSrc4,
        forceNormalWorker: forceNormalWorker4
      };
    };
  }
});

// js/ipfsClient.mjs
import {
  all,
  CID,
  concat,
  fromHexString,
  IPFSClient,
  raceToSuccess,
  toString
} from "https://unpkg.com/@spike.land/ipfs@0.0.48/dist/ipfs.client.mjs";
var workerSrc, forceNormalWorker, port, ipfsClient, ipfsCat;
var init_ipfsClient = __esm({
  "js/ipfsClient.mjs"() {
    init_getWorker();
    ({ workerSrc, forceNormalWorker } = getWorker("ipfsWorker.js"));
    if (typeof SharedWorker !== "undefined" && !forceNormalWorker) {
      const ipfsWorker = new SharedWorker(workerSrc);
      port = ipfsWorker.port;
    } else {
      const worker = new Worker(workerSrc);
      const { port1, port2 } = new MessageChannel();
      const msg = {
        clientInit: true,
        port: port1
      };
      worker.postMessage(msg, [port1]);
      port = port2;
    }
    ipfsClient = IPFSClient.from(port);
    ipfsCat = async (cid, opts) => {
      const options = opts || {};
      const res = ipfsClient.cat(cid, options);
      const result = concat(await all(res));
      const resultStr = toString(result);
      return resultStr;
    };
    globalThis.ipfsClient = ipfsClient;
    globalThis.ipfsCat = ipfsCat;
  }
});

// js/importmap.json
var imports, importmap_default;
var init_importmap = __esm({
  "js/importmap.json"() {
    imports = {
      "@babel/runtime/helpers/asyncIterator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/asyncIterator.js",
      "@babel/runtime/helpers/esm/asyncIterator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/asyncIterator.js",
      "@babel/runtime/helpers/jsx": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/jsx.js",
      "@babel/runtime/helpers/esm/jsx": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/jsx.js",
      "@babel/runtime/helpers/objectSpread2": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectSpread2.js",
      "@babel/runtime/helpers/esm/objectSpread2": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectSpread2.js",
      "@babel/runtime/helpers/typeof": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/typeof.js",
      "@babel/runtime/helpers/esm/typeof": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/typeof.js",
      "@babel/runtime/helpers/wrapRegExp": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/wrapRegExp.js",
      "@babel/runtime/helpers/esm/wrapRegExp": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/wrapRegExp.js",
      "@babel/runtime/helpers/AwaitValue": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/AwaitValue.js",
      "@babel/runtime/helpers/esm/AwaitValue": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/AwaitValue.js",
      "@babel/runtime/helpers/AsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/AsyncGenerator.js",
      "@babel/runtime/helpers/esm/AsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/AsyncGenerator.js",
      "@babel/runtime/helpers/wrapAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/wrapAsyncGenerator.js",
      "@babel/runtime/helpers/esm/wrapAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/wrapAsyncGenerator.js",
      "@babel/runtime/helpers/awaitAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/awaitAsyncGenerator.js",
      "@babel/runtime/helpers/esm/awaitAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/awaitAsyncGenerator.js",
      "@babel/runtime/helpers/asyncGeneratorDelegate": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/asyncGeneratorDelegate.js",
      "@babel/runtime/helpers/esm/asyncGeneratorDelegate": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/asyncGeneratorDelegate.js",
      "@babel/runtime/helpers/asyncToGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/asyncToGenerator.js",
      "@babel/runtime/helpers/esm/asyncToGenerator": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/asyncToGenerator.js",
      "@babel/runtime/helpers/classCallCheck": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classCallCheck.js",
      "@babel/runtime/helpers/esm/classCallCheck": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classCallCheck.js",
      "@babel/runtime/helpers/createClass": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createClass.js",
      "@babel/runtime/helpers/esm/createClass": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createClass.js",
      "@babel/runtime/helpers/defineEnumerableProperties": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/defineEnumerableProperties.js",
      "@babel/runtime/helpers/esm/defineEnumerableProperties": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/defineEnumerableProperties.js",
      "@babel/runtime/helpers/defaults": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/defaults.js",
      "@babel/runtime/helpers/esm/defaults": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/defaults.js",
      "@babel/runtime/helpers/defineProperty": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/defineProperty.js",
      "@babel/runtime/helpers/esm/defineProperty": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/defineProperty.js",
      "@babel/runtime/helpers/extends": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/extends.js",
      "@babel/runtime/helpers/esm/extends": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/extends.js",
      "@babel/runtime/helpers/objectSpread": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectSpread.js",
      "@babel/runtime/helpers/esm/objectSpread": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectSpread.js",
      "@babel/runtime/helpers/inherits": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/inherits.js",
      "@babel/runtime/helpers/esm/inherits": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/inherits.js",
      "@babel/runtime/helpers/inheritsLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/inheritsLoose.js",
      "@babel/runtime/helpers/esm/inheritsLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/inheritsLoose.js",
      "@babel/runtime/helpers/getPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/getPrototypeOf.js",
      "@babel/runtime/helpers/esm/getPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/getPrototypeOf.js",
      "@babel/runtime/helpers/setPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/setPrototypeOf.js",
      "@babel/runtime/helpers/esm/setPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/setPrototypeOf.js",
      "@babel/runtime/helpers/isNativeReflectConstruct": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/isNativeReflectConstruct.js",
      "@babel/runtime/helpers/esm/isNativeReflectConstruct": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/isNativeReflectConstruct.js",
      "@babel/runtime/helpers/construct": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/construct.js",
      "@babel/runtime/helpers/esm/construct": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/construct.js",
      "@babel/runtime/helpers/isNativeFunction": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/isNativeFunction.js",
      "@babel/runtime/helpers/esm/isNativeFunction": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/isNativeFunction.js",
      "@babel/runtime/helpers/wrapNativeSuper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/wrapNativeSuper.js",
      "@babel/runtime/helpers/esm/wrapNativeSuper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/wrapNativeSuper.js",
      "@babel/runtime/helpers/instanceof": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/instanceof.js",
      "@babel/runtime/helpers/esm/instanceof": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/instanceof.js",
      "@babel/runtime/helpers/interopRequireDefault": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/interopRequireDefault.js",
      "@babel/runtime/helpers/esm/interopRequireDefault": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/interopRequireDefault.js",
      "@babel/runtime/helpers/interopRequireWildcard": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/interopRequireWildcard.js",
      "@babel/runtime/helpers/esm/interopRequireWildcard": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/interopRequireWildcard.js",
      "@babel/runtime/helpers/newArrowCheck": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/newArrowCheck.js",
      "@babel/runtime/helpers/esm/newArrowCheck": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/newArrowCheck.js",
      "@babel/runtime/helpers/objectDestructuringEmpty": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectDestructuringEmpty.js",
      "@babel/runtime/helpers/esm/objectDestructuringEmpty": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectDestructuringEmpty.js",
      "@babel/runtime/helpers/objectWithoutPropertiesLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectWithoutPropertiesLoose.js",
      "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectWithoutPropertiesLoose.js",
      "@babel/runtime/helpers/objectWithoutProperties": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectWithoutProperties.js",
      "@babel/runtime/helpers/esm/objectWithoutProperties": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/objectWithoutProperties.js",
      "@babel/runtime/helpers/assertThisInitialized": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/assertThisInitialized.js",
      "@babel/runtime/helpers/esm/assertThisInitialized": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/assertThisInitialized.js",
      "@babel/runtime/helpers/possibleConstructorReturn": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/possibleConstructorReturn.js",
      "@babel/runtime/helpers/esm/possibleConstructorReturn": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/possibleConstructorReturn.js",
      "@babel/runtime/helpers/createSuper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createSuper.js",
      "@babel/runtime/helpers/esm/createSuper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createSuper.js",
      "@babel/runtime/helpers/superPropBase": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/superPropBase.js",
      "@babel/runtime/helpers/esm/superPropBase": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/superPropBase.js",
      "@babel/runtime/helpers/get": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/get.js",
      "@babel/runtime/helpers/esm/get": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/get.js",
      "@babel/runtime/helpers/set": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/set.js",
      "@babel/runtime/helpers/esm/set": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/set.js",
      "@babel/runtime/helpers/taggedTemplateLiteral": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/taggedTemplateLiteral.js",
      "@babel/runtime/helpers/esm/taggedTemplateLiteral": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/taggedTemplateLiteral.js",
      "@babel/runtime/helpers/taggedTemplateLiteralLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/taggedTemplateLiteralLoose.js",
      "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/taggedTemplateLiteralLoose.js",
      "@babel/runtime/helpers/readOnlyError": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/readOnlyError.js",
      "@babel/runtime/helpers/esm/readOnlyError": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/readOnlyError.js",
      "@babel/runtime/helpers/writeOnlyError": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/writeOnlyError.js",
      "@babel/runtime/helpers/esm/writeOnlyError": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/writeOnlyError.js",
      "@babel/runtime/helpers/classNameTDZError": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classNameTDZError.js",
      "@babel/runtime/helpers/esm/classNameTDZError": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classNameTDZError.js",
      "@babel/runtime/helpers/temporalUndefined": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/temporalUndefined.js",
      "@babel/runtime/helpers/esm/temporalUndefined": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/temporalUndefined.js",
      "@babel/runtime/helpers/tdz": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/tdz.js",
      "@babel/runtime/helpers/esm/tdz": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/tdz.js",
      "@babel/runtime/helpers/temporalRef": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/temporalRef.js",
      "@babel/runtime/helpers/esm/temporalRef": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/temporalRef.js",
      "@babel/runtime/helpers/slicedToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/slicedToArray.js",
      "@babel/runtime/helpers/esm/slicedToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/slicedToArray.js",
      "@babel/runtime/helpers/slicedToArrayLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/slicedToArrayLoose.js",
      "@babel/runtime/helpers/esm/slicedToArrayLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/slicedToArrayLoose.js",
      "@babel/runtime/helpers/toArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toArray.js",
      "@babel/runtime/helpers/esm/toArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toArray.js",
      "@babel/runtime/helpers/toConsumableArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toConsumableArray.js",
      "@babel/runtime/helpers/esm/toConsumableArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toConsumableArray.js",
      "@babel/runtime/helpers/arrayWithoutHoles": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/arrayWithoutHoles.js",
      "@babel/runtime/helpers/esm/arrayWithoutHoles": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/arrayWithoutHoles.js",
      "@babel/runtime/helpers/arrayWithHoles": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/arrayWithHoles.js",
      "@babel/runtime/helpers/esm/arrayWithHoles": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/arrayWithHoles.js",
      "@babel/runtime/helpers/maybeArrayLike": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/maybeArrayLike.js",
      "@babel/runtime/helpers/esm/maybeArrayLike": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/maybeArrayLike.js",
      "@babel/runtime/helpers/iterableToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/iterableToArray.js",
      "@babel/runtime/helpers/esm/iterableToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/iterableToArray.js",
      "@babel/runtime/helpers/iterableToArrayLimit": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/iterableToArrayLimit.js",
      "@babel/runtime/helpers/esm/iterableToArrayLimit": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/iterableToArrayLimit.js",
      "@babel/runtime/helpers/iterableToArrayLimitLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/iterableToArrayLimitLoose.js",
      "@babel/runtime/helpers/esm/iterableToArrayLimitLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/iterableToArrayLimitLoose.js",
      "@babel/runtime/helpers/unsupportedIterableToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/unsupportedIterableToArray.js",
      "@babel/runtime/helpers/esm/unsupportedIterableToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/unsupportedIterableToArray.js",
      "@babel/runtime/helpers/arrayLikeToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/arrayLikeToArray.js",
      "@babel/runtime/helpers/esm/arrayLikeToArray": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/arrayLikeToArray.js",
      "@babel/runtime/helpers/nonIterableSpread": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/nonIterableSpread.js",
      "@babel/runtime/helpers/esm/nonIterableSpread": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/nonIterableSpread.js",
      "@babel/runtime/helpers/nonIterableRest": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/nonIterableRest.js",
      "@babel/runtime/helpers/esm/nonIterableRest": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/nonIterableRest.js",
      "@babel/runtime/helpers/createForOfIteratorHelper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createForOfIteratorHelper.js",
      "@babel/runtime/helpers/esm/createForOfIteratorHelper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createForOfIteratorHelper.js",
      "@babel/runtime/helpers/createForOfIteratorHelperLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createForOfIteratorHelperLoose.js",
      "@babel/runtime/helpers/esm/createForOfIteratorHelperLoose": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/createForOfIteratorHelperLoose.js",
      "@babel/runtime/helpers/skipFirstGeneratorNext": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/skipFirstGeneratorNext.js",
      "@babel/runtime/helpers/esm/skipFirstGeneratorNext": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/skipFirstGeneratorNext.js",
      "@babel/runtime/helpers/toPrimitive": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toPrimitive.js",
      "@babel/runtime/helpers/esm/toPrimitive": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toPrimitive.js",
      "@babel/runtime/helpers/toPropertyKey": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toPropertyKey.js",
      "@babel/runtime/helpers/esm/toPropertyKey": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/toPropertyKey.js",
      "@babel/runtime/helpers/initializerWarningHelper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/initializerWarningHelper.js",
      "@babel/runtime/helpers/esm/initializerWarningHelper": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/initializerWarningHelper.js",
      "@babel/runtime/helpers/initializerDefineProperty": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/initializerDefineProperty.js",
      "@babel/runtime/helpers/esm/initializerDefineProperty": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/initializerDefineProperty.js",
      "@babel/runtime/helpers/applyDecoratedDescriptor": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/applyDecoratedDescriptor.js",
      "@babel/runtime/helpers/esm/applyDecoratedDescriptor": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/applyDecoratedDescriptor.js",
      "@babel/runtime/helpers/classPrivateFieldLooseKey": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldLooseKey.js",
      "@babel/runtime/helpers/esm/classPrivateFieldLooseKey": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldLooseKey.js",
      "@babel/runtime/helpers/classPrivateFieldLooseBase": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldLooseBase.js",
      "@babel/runtime/helpers/esm/classPrivateFieldLooseBase": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldLooseBase.js",
      "@babel/runtime/helpers/classPrivateFieldGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldGet.js",
      "@babel/runtime/helpers/esm/classPrivateFieldGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldGet.js",
      "@babel/runtime/helpers/classPrivateFieldSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldSet.js",
      "@babel/runtime/helpers/esm/classPrivateFieldSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldSet.js",
      "@babel/runtime/helpers/classPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldDestructureSet.js",
      "@babel/runtime/helpers/esm/classPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldDestructureSet.js",
      "@babel/runtime/helpers/classExtractFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classExtractFieldDescriptor.js",
      "@babel/runtime/helpers/esm/classExtractFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classExtractFieldDescriptor.js",
      "@babel/runtime/helpers/classStaticPrivateFieldSpecGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateFieldSpecGet.js",
      "@babel/runtime/helpers/esm/classStaticPrivateFieldSpecGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateFieldSpecGet.js",
      "@babel/runtime/helpers/classStaticPrivateFieldSpecSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateFieldSpecSet.js",
      "@babel/runtime/helpers/esm/classStaticPrivateFieldSpecSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateFieldSpecSet.js",
      "@babel/runtime/helpers/classStaticPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateMethodGet.js",
      "@babel/runtime/helpers/esm/classStaticPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateMethodGet.js",
      "@babel/runtime/helpers/classStaticPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateMethodSet.js",
      "@babel/runtime/helpers/esm/classStaticPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateMethodSet.js",
      "@babel/runtime/helpers/classApplyDescriptorGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classApplyDescriptorGet.js",
      "@babel/runtime/helpers/esm/classApplyDescriptorGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classApplyDescriptorGet.js",
      "@babel/runtime/helpers/classApplyDescriptorSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classApplyDescriptorSet.js",
      "@babel/runtime/helpers/esm/classApplyDescriptorSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classApplyDescriptorSet.js",
      "@babel/runtime/helpers/classApplyDescriptorDestructureSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classApplyDescriptorDestructureSet.js",
      "@babel/runtime/helpers/esm/classApplyDescriptorDestructureSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classApplyDescriptorDestructureSet.js",
      "@babel/runtime/helpers/classStaticPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateFieldDestructureSet.js",
      "@babel/runtime/helpers/esm/classStaticPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classStaticPrivateFieldDestructureSet.js",
      "@babel/runtime/helpers/classCheckPrivateStaticAccess": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classCheckPrivateStaticAccess.js",
      "@babel/runtime/helpers/esm/classCheckPrivateStaticAccess": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classCheckPrivateStaticAccess.js",
      "@babel/runtime/helpers/classCheckPrivateStaticFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
      "@babel/runtime/helpers/esm/classCheckPrivateStaticFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
      "@babel/runtime/helpers/decorate": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/decorate.js",
      "@babel/runtime/helpers/esm/decorate": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/decorate.js",
      "@babel/runtime/helpers/classPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateMethodGet.js",
      "@babel/runtime/helpers/esm/classPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateMethodGet.js",
      "@babel/runtime/helpers/checkPrivateRedeclaration": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/checkPrivateRedeclaration.js",
      "@babel/runtime/helpers/esm/checkPrivateRedeclaration": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/checkPrivateRedeclaration.js",
      "@babel/runtime/helpers/classPrivateFieldInitSpec": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldInitSpec.js",
      "@babel/runtime/helpers/esm/classPrivateFieldInitSpec": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateFieldInitSpec.js",
      "@babel/runtime/helpers/classPrivateMethodInitSpec": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateMethodInitSpec.js",
      "@babel/runtime/helpers/esm/classPrivateMethodInitSpec": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateMethodInitSpec.js",
      "@babel/runtime/helpers/classPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateMethodSet.js",
      "@babel/runtime/helpers/esm/classPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.0/helpers/esm/classPrivateMethodSet.js",
      "@emotion/cache": "https://unpkg.com/@emotion/cache@11.5.0/dist/emotion-cache.browser.esm.js",
      "@emotion/hash": "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
      "@emotion/is-prop-valid": "https://unpkg.com/@emotion/is-prop-valid@1.1.0/dist/emotion-is-prop-valid.browser.esm.js",
      "@emotion/memoize": "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
      "@emotion/react": "https://unpkg.com/@emotion/react@11.5.0/dist/emotion-react.browser.esm.js",
      "@emotion/serialize": "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
      "@emotion/sheet": "https://unpkg.com/@emotion/sheet@1.0.3/dist/emotion-sheet.browser.esm.js",
      "@emotion/styled": "https://unpkg.com/@emotion/styled@11.3.0/dist/emotion-styled.browser.esm.js",
      "@emotion/utils": "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
      "@emotion/unitless": "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
      "@emotion/weak-memoize": "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
      "prop-types": "https://esm.sh/prop-types",
      "framer-motion": "https://unpkg.com/framer-motion@5.2.1/dist/es/index.mjs",
      framesync: "https://unpkg.com/framesync@6.0.1/dist/es/index.mjs",
      "hey-listen": "https://unpkg.com/hey-listen@1.0.8/dist/hey-listen.es.js",
      "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
      popmotion: "https://unpkg.com/popmotion@11.0.0/dist/es/index.mjs",
      react: "https://unpkg.com/@spike.land/esm@0.0.48/dist/react.mjs",
      "react-dom": "https://unpkg.com/@spike.land/esm@0.0.48/dist/react-dom.mjs",
      "react-is": "https://unpkg.com/@spike.land/esm@0.0.48/dist/react-is.mjs",
      "react-transition-group": "https://esm.sh/react-transition-group",
      "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
      "@spike.land/renderer": "https://unpkg.com/@spike.land/renderer@0.0.48/dist/renderer.js",
      "style-value-types": "https://unpkg.com/style-value-types@5.0.0/dist/es/index.mjs",
      stylis: "https://unpkg.com/stylis@4.0.10/dist/stylis.mjs",
      "@spike.land/qrious": "https://unpkg.com/@spike.land/qrious@0.0.48/dist/QRious.mjs",
      tslib: "https://unpkg.com/tslib@2.3.1/tslib.es6.js",
      "@spike.land/smart-monaco-editor": "https://unpkg.com/@spike.land/smart-monaco-editor@0.0.48/dist/editor.mjs",
      "@zedvision/swm": "https://unpkg.com/@zedvision/swm@4.0.0/public/swm-esm.js",
      "uuid/": "https://unpkg.com/uuid@8.3.2/dist/esm-browser/",
      "@spike.land/shadb": "https://unpkg.com/@spike.land/shadb@0.0.48/dist/shaDB.mjs",
      "@spike.land/code": "https://unpkg.com/@spike.land/code@0.0.48/js/reactLoader.mjs",
      comlink: "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs",
      "@spike.land/ipfs": "https://unpkg.com/@spike.land/ipfs@0.0.48/dist/ipfs.client.mjs",
      "workbox-window": "https://unpkg.com/workbox-window@6.3.0/build/workbox-window.prod.es5.mjs"
    };
    importmap_default = {
      imports
    };
  }
});

// js/templates.ts
var templates_exports = {};
__export(templates_exports, {
  getEditorHTML: () => getEditorHTML,
  getHtml: () => getHtml
});
function getHtml({ html, css }) {
  const titleStart = html.indexOf("<title>");
  const titleEnd = html.indexOf("</title>");
  const hasTitle = titleStart < titleEnd && titleStart >= -1;
  const title = hasTitle ? html.slice(titleStart, titleEnd) : "(code).spike.land :)";
  return `<!DOCTYPE html>
<html lang="en"> 
<head profile="http://www.w3.org/2005/10/profile">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="Description" content="Generated with spike.land">
<title>${title}</title>
<link rel="modulepreload" href="./app.js">  
<link rel="icon" type="image/png" href="https://code.spike.land/zed-icon-big.png" />
<link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
<script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"><\/script>
<script crossorigin src="https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js"><\/script>
<script async src="https://unpkg.com/es-module-shims@1.3.1/dist/es-module-shims.js"><\/script>
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000000;
  color: white;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
${css}</style>
</head>
<body>
<a class="skip-link" href="#zbody">Jump to the page</a>
<main id="zbody">
  ${html}
</main>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap-shim">
${JSON.stringify(importmap_default)}
<\/script>
<script type="module-shim">
  import App from './app.js';
  import {jsx} from "@emotion/react"        
  ReactDOM.render(jsx(App),document.getElementById('zbody'));
<\/script>
</body>
</html>
`;
}
var getEditorHTML;
var init_templates = __esm({
  "js/templates.ts"() {
    init_importmap();
    getEditorHTML = () => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="icon" type="image/png" href="https://code.spike.land/zed-icon-big.png" />
  <script async src="https://unpkg.com/es-module-shims@1.3.1/dist/es-module-shims.js"><\/script>
  <script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js"><\/script>
<title>Instant React Editor</title>
</head>
<body>
<script>window.process = {env: {NODE_ENV:"production" }}<\/script>
<script type="importmap-shim">
${JSON.stringify(importmap_default)}
<\/script>
<script type="module-shim">
import {edit} from "https://code.spike.land/js/data.mjs"
try{
  edit(location.pathname.slice(42, 52));
}catch(error){
  fetch("https://code.spike.land/error", {method: "POST",  body: JSON.stringify({error})})
}
<\/script>
</body>
</html>`;
  }
});

// js/share.mjs
var share_exports = {};
__export(share_exports, {
  shareItAsHtml: () => shareItAsHtml
});
import { sha256, shaDB } from "https://unpkg.com/@spike.land/shadb@0.0.48/dist/shaDB.mjs";
async function addAll(files) {
  try {
    const res = await all(ipfsClient.addAll(files));
    return res.map((r) => {
      const CID2 = r.cid.toString();
      return { path: r.path, CID: CID2 };
    });
  } catch (e) {
    console.error({ error: e });
  }
}
var shareItAsHtml;
var init_share = __esm({
  "js/share.mjs"() {
    init_ipfsClient();
    shareItAsHtml = async ({ transpiled, code, html }) => {
      var _a;
      const bodyClass = String((_a = window.document.getElementById("zbody")) == null ? void 0 : _a.getAttribute("class"));
      let css = "";
      const cssRules = window.document.querySelector("head > style[data-emotion=css]");
      if (cssRules) {
        try {
          css = Array.from(window.document.querySelector("head > style[data-emotion=css]").sheet.cssRules).map((x) => x.cssText).filter((cssRule) => {
            const selector = cssRule.substring(5, 10);
            const isSelectorBody = bodyClass.indexOf(selector) !== -1;
            const isInGeneratedHtml = html.indexOf(selector) !== -1;
            const shouldInclude = isSelectorBody || isInGeneratedHtml;
            return shouldInclude;
          }).join("\n  ").replace(`#zbody`, "body");
        } catch (e) {
          console.error({ e });
        }
      }
      const globalCssRules = window.document.querySelector("head > style[data-emotion=css-global]");
      if (globalCssRules) {
        try {
          css += Array.from(window.document.querySelector("head > style[data-emotion=css-global]").sheet.cssRules).map((x) => x.cssText).join("\n  ").replace(`#zbody`, "body");
        } catch (e) {
          console.error({ e });
        }
      }
      const { getHtml: getHtml2, getEditorHTML: getEditorHTML2 } = await Promise.resolve().then(() => (init_templates(), templates_exports));
      const allContent = [
        { path: "/app/index.html", content: getHtml2({ html, css }) },
        { path: "/app/app.js", content: transpiled },
        { path: "/app/app.tsx", content: code },
        { path: "/app/edit/index.html", content: getEditorHTML2() }
      ];
      const sha = await sha256(JSON.stringify(allContent));
      let rootUrl = await shaDB.get(sha, "string");
      if (rootUrl === null) {
        const res = await addAll(allContent);
        const appDir = res.find((x) => x.path === "app");
        if (typeof appDir === "undefined")
          return null;
        rootUrl = `https://ipfs.io/ipfs/${appDir.CID}`;
        const { pathname } = new URL(window.location.href);
        if (pathname.endsWith("/edit/") || pathname.endsWith("/edit")) {
          history.pushState({}, "", `/ipfs/${appDir.CID}/edit/`);
        }
        await shaDB.put(sha, rootUrl);
      }
      return rootUrl;
    };
  }
});

// ../../node_modules/uuid/lib/rng-browser.js
var require_rng_browser = __commonJS({
  "../../node_modules/uuid/lib/rng-browser.js"(exports, module) {
    var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (getRandomValues) {
      rnds8 = new Uint8Array(16);
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      rnds = new Array(16);
      module.exports = function mathRNG() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 3) === 0)
            r = Math.random() * 4294967296;
          rnds[i] = r >>> ((i & 3) << 3) & 255;
        }
        return rnds;
      };
    }
    var rnds8;
    var rnds;
  }
});

// ../../node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "../../node_modules/uuid/lib/bytesToUuid.js"(exports, module) {
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 256).toString(16).substr(1);
    }
    var i;
    function bytesToUuid(buf, offset) {
      var i2 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        "-",
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]],
        bth[buf[i2++]]
      ].join("");
    }
    module.exports = bytesToUuid;
  }
});

// ../../node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "../../node_modules/uuid/v4.js"(exports, module) {
    var rng = require_rng_browser();
    var bytesToUuid = require_bytesToUuid();
    function v42(options, buf, offset) {
      var i = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i + ii] = rnds[ii];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module.exports = v42;
  }
});

// js/data.mjs
import { sha256 as sha2562, shaDB as shaDB2 } from "https://unpkg.com/@spike.land/shadb@0.0.48/dist/shaDB.mjs";
async function getUserId() {
  if (uuid)
    return uuid;
  const newID = await shaDB2.get("uuid", "string");
  if (!newID) {
    const resp = await fetch("https://spike.land/register");
    const data = await resp.json();
    if (uuid)
      return uuid;
    uuid = data.uuid;
    await shaDB2.put("uuid", data.uuid);
    return data.uuid;
  }
  return newID;
}
async function getActiveProject() {
  if (activeProject)
    return activeProject;
  const projects = await getProjects();
  if (projects.rootUrl)
    return projects;
  activeProject = projects[0];
  return activeProject;
}
async function getIPFSCodeToLoad(_rootUrl) {
  const rootUrl = _rootUrl || (window.location.href.endsWith("/edit/") ? window.location.href.slice(0, -5) : window.location.href.slice(0, -4));
  const codeReq = await fetch(rootUrl + "app.tsx");
  const code = await codeReq.text();
  const ret = {
    code,
    url: rootUrl,
    transpiled: "",
    html: ""
  };
  console.log({ ret });
  return ret;
}
async function getCodeToLoad() {
  const projectName = await getActiveProject();
  if (projectName.rootUrl) {
    return getIPFSCodeToLoad(projectName.rootUrl);
  }
  const keyToLoad = await shaDB2.get(projectName, "string");
  let projectDesc;
  try {
    projectDesc = await shaDB2.get(keyToLoad, "json");
  } catch (e) {
    const data2 = {
      code: projectDesc,
      transpiled: null,
      html: null
    };
    return data2;
  }
  if (projectDesc !== null && projectDesc !== void 0) {
    const data2 = {
      code: await shaDB2.get(projectDesc.code, "string") || await getStarter(),
      transpiled: await shaDB2.get(projectDesc.transpiled, "string") || "",
      html: await shaDB2.get(projectDesc.html, "string") || ""
    };
    return data2;
  }
  const data = {
    code: await shaDB2.get(projectDesc, "string") || await getStarter(),
    transpiled: null,
    html: null
  };
  return data;
}
function getStarter() {
  return fetch(`https://code.spike.land/js/examples/rca.tsx`).then((res) => res.text());
}
var import_v4, uuid, getProjects, activeProject, saved, toSave, saveCode;
var init_data = __esm({
  "js/data.mjs"() {
    import_v4 = __toModule(require_v4());
    init_ipfsClient();
    getProjects = async () => {
      uuid = await getUserId();
      const userData = await shaDB2.get(uuid, "json");
      let appHash = null;
      if (userData && userData.signal) {
        return userData.signal;
      }
      if (typeof userData === "string" || userData === null || !userData.list) {
        const projectId = (0, import_v4.default)();
        await shaDB2.put(uuid, JSON.stringify({
          ...userData,
          list: [projectId],
          [projectId]: {
            lastOpen: Date.now()
          }
        }));
        if (appHash !== null)
          await shaDB2.put(projectId, appHash);
        return [projectId];
      }
      if (appHash !== null)
        await shaDB2.put(userData.list[0], appHash);
      return userData.list;
    };
    saved = {
      code: "",
      html: null,
      transpiled: null,
      url: null
    };
    toSave = {
      code: "",
      html: null,
      transpiled: null
    };
    saveCode = async (opts, counter) => {
      const { code, html, transpiled } = opts;
      toSave.code = code || await getStarter();
      if (opts.i > counter)
        return;
      if (opts.code !== toSave.code) {
        return null;
      }
      if (toSave.code === saved.code && saved.url !== null) {
        return saved.url;
      }
      toSave.code = opts.code;
      const { shareItAsHtml: shareItAsHtml2 } = await Promise.resolve().then(() => (init_share(), share_exports));
      const sharePromise = shareItAsHtml2({ code, html, transpiled });
      if (opts.i > counter)
        return;
      const url = await sharePromise;
      const projectName = await getActiveProject();
      if (opts.i > counter)
        return;
      opts.url = url;
      const desc = {
        url: await sha2562(url),
        code: await sha2562(code),
        html: await sha2562(html),
        transpiled: await sha2562(transpiled)
      };
      const hash = await sha2562(JSON.stringify(desc));
      await shaDB2.put(hash, JSON.stringify(desc));
      if (code) {
        await shaDB2.put(desc.code, code);
      }
      if (html) {
        await shaDB2.put(desc.html, html);
      }
      if (transpiled) {
        await shaDB2.put(desc.transpiled, transpiled);
      }
      await shaDB2.put(projectName, hash);
      Object.assign(saved, { html, code, transpiled, url });
      return saved;
    };
  }
});

// js/sendSignalToQrCode.mjs
var sendSignalToQrCode_exports = {};
__export(sendSignalToQrCode_exports, {
  getZkey: () => getZkey,
  sendSignalToQrCode: () => sendSignalToQrCode
});
import { sha256 as sha2563 } from "https://unpkg.com/@spike.land/shadb@0.0.48/dist/shaDB.mjs";
async function sendSignalToQrCode(session) {
  const { searchParams } = new URL(window.location.href);
  const maybeRoute = searchParams.get("signalToQr") || "";
  const isKey = maybeRoute.length === 8 && [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0;
  if (!isKey)
    return;
  await saveCode(session);
  const { sendSignal } = await import("https://unpkg.com/@spike.land/ipfs@0.0.48/dist/ipfs.client.mjs");
  const signal = `https://code.spike.land/${maybeRoute}`;
  await sendSignal(signal, {
    rootUrl: `${session.url}edit/`,
    signals: {
      onChange: "url",
      onLogout: "url"
    }
  });
}
async function getZkey(hash) {
  const uuid2 = await getUserId();
  const uKey = await sha2563(uuid2);
  const gKey = await sha2563(hash + uKey);
  const vKey = await sha2563(hash + uuid2);
  return `${hash}${uKey}${gKey}${vKey}`;
}
var init_sendSignalToQrCode = __esm({
  "js/sendSignalToQrCode.mjs"() {
    init_data();
  }
});

// js/renderPreviewWindow.mjs
async function renderPreviewWindow(session) {
  const {
    DraggableWindow: DraggableWindow2,
    jsx: jsx3,
    render: render2
  } = await import("https://unpkg.com/@spike.land/renderer@0.0.48/dist/renderer.js");
  const onShare = async () => {
    const { shareItAsHtml: shareItAsHtml2 } = await Promise.resolve().then(() => (init_share(), share_exports));
    const link = await shareItAsHtml2({
      code: session.code,
      transpiled: session.transpiled,
      html: session.html
    });
    open(link + "/");
  };
  let preview = window.document.getElementById("preview");
  if (!preview) {
    const element = window.document.createElement("div");
    window.document.body.appendChild(element);
    preview = element;
  }
  render2(jsx3(DraggableWindow2, {
    onShare,
    session,
    onRestore: () => {
      const { monaco } = window;
      const modelUri = monaco.Uri.parse(`file:///main.tsx`);
      const model = monaco.editor.getModel(modelUri);
      model.setValue(session.code);
    },
    position: session.mode === "window" ? "fixed" : "absolute"
  }), preview);
}

// js/openWindows.mjs
async function openWindows() {
  const WM = await import("https://unpkg.com/@zedvision/swm@4.0.0/public/swm-esm.js");
  const WindowManager = WM.WindowManager ? WM.WindowManager : window.WindowManager.WindowManager;
  const wm = new WindowManager({ backgroundWindow: "green" });
  wm.snap(false);
  const win = wm.createWindow({
    titlebarHeight: "42px",
    width: 720,
    closable: false,
    borderRadius: "0px",
    overflow: "hidden",
    backgroundWindow: "#1e1e1e",
    height: "100vh",
    title: "app.tsx"
  });
  win.content.innerHTML = `<div style="min-height: 20px;  min-width: 600px; height: ${isMobile() ? "2000px" : "calc(100%)"}; width:100%; display: block; overflow: hidden;" id="editor"></div>`;
  if (!isMobile()) {
    try {
      const element = window.document.querySelector("body > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > section");
      if (element !== null) {
        element.style.overflow = "";
      }
    } catch (e) {
      console.error({ e });
    }
  }
  (function(global) {
    if (typeof global === "undefined") {
      throw new Error("window is undefined");
    }
    var _hash = "!";
    var noBackPlease = function() {
      global.location.href += "#";
      global.setTimeout(function() {
        global.location.href += "!";
      }, 50);
    };
    global.onhashchange = function() {
      if (global.location.hash !== _hash) {
        global.location.hash = _hash;
      }
    };
    global.onload = function() {
      noBackPlease();
      document.body.onkeydown = function(e) {
        var elm = e.target.nodeName.toLowerCase();
        if (e.which === 8 && (elm !== "input" && elm !== "textarea")) {
          e.preventDefault();
        }
        e.stopPropagation();
      };
    };
  })(window);
}
function isMobile() {
  if (typeof window === "undefined") {
    return false;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

// js/codeLoader.mjs
init_data();

// js/transpile.mjs
init_getWorker();
import { wrap } from "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs";
var { workerSrc: workerSrc2, forceNormalWorker: forceNormalWorker2 } = getWorker("transpile.worker.js");
var transform = null;
async function transpileCode(code) {
  if (transform === null) {
    await init();
    return transpileCode(code);
  }
  const transformed = await transform(code);
  return transformed;
}
async function init() {
  if (forceNormalWorker2 || typeof SharedWorker === "undefined") {
    const worker2 = new Worker(workerSrc2);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1
    };
    worker2.postMessage(msg, [port1]);
    transform = await wrap(port2);
    return transform;
  }
  const worker = new SharedWorker(workerSrc2);
  worker.port.start();
  transform = await wrap(worker.port);
  return transform;
}

// js/formatter.mjs
init_getWorker();
import { wrap as wrap2 } from "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs";
var { workerSrc: workerSrc3, forceNormalWorker: forceNormalWorker3 } = getWorker("prettierWorker.js");
var format = null;
async function formatter(code) {
  if (format === null) {
    await init2();
    return formatter(code);
  }
  const formatted = await format(code);
  return formatted;
}
async function init2() {
  if (format) {
    console.log("INIT INIT");
  }
  if (forceNormalWorker3 || typeof SharedWorker === "undefined") {
    const worker2 = new Worker(workerSrc3);
    const { port1, port2 } = new MessageChannel();
    const msg = {
      comlinkInit: true,
      port: port1
    };
    worker2.postMessage(msg, [port1]);
    format = await wrap2(port2);
    return format;
  }
  const worker = new SharedWorker(workerSrc3);
  worker.port.start();
  format = await wrap2(worker.port);
  return format;
}

// js/codeLoader.mjs
init_ipfsClient();
init_data();
import React from "https://unpkg.com/@spike.land/esm@0.0.48/dist/react.mjs";
import startMonaco from "https://unpkg.com/@spike.land/smart-monaco-editor@0.0.48/dist/editor.mjs";
import { jsx } from "https://unpkg.com/@emotion/react@11.5.0/dist/emotion-react.browser.esm.js";
import { DraggableWindow, jsx as jsx2, render } from "https://unpkg.com/@spike.land/renderer@0.0.48/dist/renderer.js";
function getSession() {
  const session = {
    i: 0,
    unmount: () => {
    },
    errorText: "",
    lastErrors: 0,
    children: React.Fragment,
    setChild: () => {
    },
    div: document.createElement("div"),
    html: "",
    url: "",
    transpiled: "",
    code: ""
  };
  return session;
}
async function run(mode = "window", code = "") {
  const session = getSession();
  let monaco;
  try {
    console.log("Runner!");
    const { pathname } = new URL(window.location.href);
    if (mode === "window") {
      await openWindows();
    }
    session.mode = mode;
    if (code) {
      session.code = await formatter(code);
      session.transpiled = await transpileCode(session.code);
    }
    if (!code) {
      try {
        const { code: code2, transpiled, html } = pathname.endsWith("/edit/") || pathname.endsWith("/edit") ? await getIPFSCodeToLoad(void 0) : await getCodeToLoad();
        session.code = await formatter(code2);
        session.transpiled = await transpileCode(session.code) || transpiled;
        session.div.innerHTML = html;
      } catch (e) {
        console.error({ e, message: "couldn't start" });
        return;
      }
    }
    const container = window.document.getElementById("editor");
    if (container === null)
      return "No editor window";
    const editorPromise = startMonaco({
      language: "typescript",
      container,
      code: session.code,
      onChange: (code2) => runner(code2)
    });
    try {
      await renderPreviewWindow(session);
    } catch (e) {
      throw e;
    }
    await restartCode(session.transpiled, session.code, session.i);
    await editorPromise;
    monaco = window.monaco;
    monaco.editor.createModel("define module './hash.js';", "typescript", monaco.Uri.parse("file:///refs.d.ts"));
    if (!session.url) {
      await saveCode(session, session.i);
    }
    const { sendSignalToQrCode: sendSignalToQrCode2 } = await Promise.resolve().then(() => (init_sendSignalToQrCode(), sendSignalToQrCode_exports));
    await sendSignalToQrCode2(session);
  } catch (e) {
    throw e;
  }
  async function runner(c) {
    session.errorText = "";
    session.i++;
    const counter = session.i;
    try {
      const cd = await formatter(c);
      const transpiled = await transpileCode(cd);
      let restartError = false;
      if (transpiled.length && session.lastErrors < 2) {
        if (counter < session.i)
          return;
        restartError = await restartCode(transpiled, c, counter);
      }
      if (session.i > counter)
        return;
      const err = await getErrors(cd);
      if (session.i > counter)
        return;
      if (restartError) {
        err.push({ messageText: "Error while starting the app. Check the console!" });
      }
      if (err.length)
        console.log({ err });
      if (session.lastErrors && err.length === 0) {
        restartCode(transpiled, c, counter);
      }
      session.lastErrors = err.length;
      if (err.length === 0 && transpiled.length) {
        if (session.i > counter)
          return;
        session.code = cd;
        saveCode(session, counter);
      } else {
        console.log({ code: c, transpiled });
        if (session.i > counter)
          return;
        if (cd.length < 1e3 && session.code.length < 1e3) {
          const { diff } = await import("../modules/diff.js");
          const slices = await diff(session.code, cd);
          if (slices.c.length <= 3) {
            session.lastErrors = 0;
            return;
          }
          if (slices.c.length == 4) {
            session.lastErrors = 0;
            monaco.editor.setTheme("hc-black");
            return;
          }
        }
        if (err && err[0] && err[0].messageText) {
          console.error(err[0].messageText.toString());
        }
        return;
      }
      monaco.editor.setTheme("vs-dark");
    } catch (err) {
      if (err.message) {
        session.errorText = err.message;
        const saveErrorCode = async () => {
          const res = await ipfsClient.add(c, { onlyHash: true });
          const CID2 = res.cid.toString();
          const url = `/error/${CID2}`;
          fetch(`https://code.spike.land${url}`, {
            method: "POST",
            body: c
          });
        };
        saveErrorCode();
        return;
      }
      monaco.editor.setTheme("vs-light");
      setTimeout(() => {
        monaco.editor.setTheme("hc-black");
      }, 50);
      console.error(err);
    }
  }
  async function getErrors() {
    if (!monaco) {
      return [{ messageText: "Error with the error checking. Try to reload!" }];
    }
    const filename = `file:///main.tsx`;
    const uri = monaco.Uri.parse(filename);
    const model = monaco.editor.getModel(uri);
    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model.uri);
    const diag = client.getSemanticDiagnostics(filename);
    const comp = client.getCompilerOptionsDiagnostics(filename);
    const syntax = client.getSyntacticDiagnostics(filename);
    const fastError = await Promise.race([diag, comp, syntax]);
    return [
      ...fastError
    ];
  }
  async function getReactChild(transpiled) {
    const codeToHydrate = mode === "window" ? transpiled.replace("body{", "#zbody{") : transpiled;
    const objUrl = createJsBlob(codeToHydrate);
    const mod = await import(objUrl);
    URL.revokeObjectURL(objUrl);
    return jsx(mod.default);
  }
  async function restartCode(transpiled, code2, counter) {
    if (session.i > counter)
      return false;
    if (session.actualT === transpiled)
      return false;
    session.actualT = transpiled;
    session.html = "";
    session.transpiled = "";
    let hadError = false;
    if (typeof transpiled !== "string" || transpiled === "") {
      hadError = true;
      return hadError;
    }
    let children;
    try {
      children = await getReactChild(transpiled);
    } catch (error) {
      console.error({ error, message: "error in rendering" });
      return false;
    }
    const zbody = document.createElement("div");
    ReactDOM.render(children, zbody);
    session.div = zbody;
    if (!!zbody.innerHTML) {
      session.transpiled = transpiled;
      session.html = zbody.innerHTML;
      session.children = children;
      session.setChild((c) => [...c, session.children]);
    }
    return !zbody.innerHTML;
  }
}
function createJsBlob(code) {
  const blob = new Blob([code], { type: "application/javascript" });
  return URL.createObjectURL(blob);
}
export {
  DraggableWindow,
  jsx2 as jsx,
  render,
  run
};
