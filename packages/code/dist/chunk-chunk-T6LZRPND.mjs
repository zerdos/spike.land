import {
  $,
  AccessibilitySupport,
  Action,
  ActionBar,
  ActionRunner,
  ActionViewItem,
  ApplyUpdateResult,
  AriaLabelProvider,
  BareFontInfo,
  BaseActionViewItem,
  BrowserFeatures,
  CONTEXT_ACCESSIBILITY_MODE_ENABLED,
  CancellationToken,
  CancellationTokenSource,
  CharacterClassifier,
  ChordKeybinding,
  CodeActionTriggerType,
  CodeEditorWidget,
  Codicon,
  Color,
  ColorScheme,
  CommandsRegistry,
  CompletionItemInsertTextRule,
  CompletionItemKind,
  CompletionItemTag,
  CompletionTriggerKind,
  ConfigurationChangedEvent,
  ConsoleLogger,
  ContentWidgetPositionPreference,
  ContextKeyExpr,
  CountBadge,
  CursorChangeReason,
  DataUri,
  DebounceEmitter,
  DefaultEndOfLine,
  DeferredPromise,
  DiffEditorWidget,
  DiffNavigator,
  Dimension,
  Disposable,
  DisposableStore,
  DocumentHighlightKind2 as DocumentHighlightKind,
  DomScrollableElement,
  EditOperation,
  EditorAutoIndentStrategy,
  EditorOption,
  EditorOptions,
  EditorType,
  ElectronAcceleratorLabelProvider,
  Emitter,
  EmptySubmenuAction,
  EncodedTokenizationResult,
  EndOfLinePreference,
  EndOfLineSequence,
  Event,
  EventHelper,
  EventType,
  EventType2,
  Extensions,
  Extensions2,
  Extensions3,
  FindMatch,
  FoldingRangeKind,
  FontInfo,
  FontMeasurements,
  FormattingConflicts,
  Gesture,
  IAccessibilityService,
  IBulkEditService,
  IClipboardService,
  ICodeEditorService,
  ICommandService,
  IConfigurationService,
  IContextKeyService,
  IContextMenuService,
  IContextViewService,
  IDialogService,
  IEditorProgressService,
  IEditorWorkerService,
  IInstantiationService,
  IKeybindingService,
  ILabelService,
  ILanguageConfigurationService,
  ILanguageFeaturesService,
  ILanguageService,
  IListService,
  ILogService,
  IMMUTABLE_CODE_TO_KEY_CODE,
  IMarkerDecorationsService,
  IMarkerService,
  IMenuService,
  IModelService,
  INotificationService,
  IOpenerService,
  IProgressService,
  IQuickInputService,
  IStorageService,
  ITelemetryService,
  ITextModelService,
  ITextResourceConfigurationService,
  ITextResourcePropertiesService,
  IThemeService,
  IUndoRedoService,
  IWorkspaceContextService,
  IWorkspaceTrustManagementService,
  IconLabel,
  IdGenerator,
  IdleValue,
  ImmortalReference,
  InMemoryStorageService,
  IndentAction,
  InjectedTextCursorStops,
  InlayHintKind2 as InlayHintKind,
  InlineCompletionTriggerKind2 as InlineCompletionTriggerKind,
  InputBox,
  InternalEditorAction,
  IntervalTimer,
  ItemActivation,
  Iterable,
  KeyChord,
  KeyCode,
  KeyCodeUtils,
  KeybindingsRegistry,
  LRUCache,
  LcsDiff,
  LineTokens,
  LinkedList,
  ListService,
  LogService,
  MarkerSeverity,
  MarkerSeverity2,
  MarkerTag,
  MenuId,
  MenuItemAction,
  MenuRegistry,
  Mimes,
  MinimapPosition,
  MinimapPosition2,
  ModelService,
  ModesRegistry,
  ModifierKeyEmitter,
  MouseTargetType,
  MutableDisposable,
  NO_KEY_MODS,
  NoOpNotification,
  NullState,
  OS,
  OVERRIDE_PROPERTY_REGEX,
  OverlayWidgetPositionPreference,
  OverviewRulerLane,
  OverviewRulerLane2,
  PLAINTEXT_LANGUAGE_ID,
  PauseableEmitter,
  Position,
  PositionAffinity,
  PrefixSumComputer,
  QuickInputHideReason,
  Range,
  Range2,
  RawContextKey,
  Registry,
  RenderLineInput,
  RenderLineNumbersType,
  RenderMinimap,
  ResolvedKeybinding,
  ResolvedKeybindingPart,
  ResourceEditStackSnapshot,
  ResourceMap,
  ResourceTextEdit,
  RunOnceScheduler,
  SET_CONTEXT_COMMAND_ID,
  Schemas,
  ScrollType,
  ScrollbarVisibility,
  Selection,
  SelectionDirection,
  Separator,
  ServiceCollection,
  SignatureHelpTriggerKind2 as SignatureHelpTriggerKind,
  SimpleKeybinding,
  StandaloneCodeEditorNLS,
  StandaloneServicesNLS,
  StandardKeyboardEvent,
  StandardMouseEvent,
  StopWatch,
  SubmenuAction,
  SubmenuItemAction,
  SymbolKind,
  SymbolTag,
  SyncDescriptor,
  TernarySearchTree,
  TextEditorCursorBlinkingStyle,
  TextEditorCursorStyle,
  TextModelResolvedOptions,
  Themable,
  ThemeIcon,
  TimeoutTimer,
  Token,
  TokenMetadata,
  TokenizationRegistry,
  TokenizationResult,
  TrackedRangeStickiness,
  UILabelProvider,
  URI,
  UndoRedoGroup,
  UndoRedoSource,
  UnicodeTextModelHighlighter,
  ViewLineRenderingData,
  WorkbenchList,
  WorkspaceFolder,
  WrappingIndent,
  _util,
  activeContrastBorder,
  addDisposableListener,
  addMatchMediaChangeListener,
  addStandardDisposableListener,
  addToValueTree,
  append,
  asCSSPropertyValue,
  asCSSUrl,
  asCssVariableName,
  attachMenuStyler,
  badgeBackground,
  badgeForeground,
  basename,
  basename2,
  buttonBackground,
  buttonForeground,
  buttonHoverBackground,
  canceled,
  clearNode,
  cloneAndChange,
  coalesce,
  combinedDisposable,
  computeStyles,
  contrastBorder,
  createCSSRule,
  createDecorator,
  createKeybinding,
  createProxyObject,
  createStyleSheet,
  deepClone,
  deepFreeze,
  dispose,
  distinct,
  editorActiveIndentGuides,
  editorBackground,
  editorForeground,
  editorInactiveSelection,
  editorIndentGuides,
  editorSelectionHighlight,
  ensureValidWordDefinition,
  equals,
  equals2,
  escape,
  escapeRegExpCharacters,
  expressionsAreEqualWithConstantSubstitution,
  extname,
  extractSelection,
  firstNonWhitespaceIndex,
  firstOrDefault,
  format,
  formatRule,
  getActiveElement,
  getAllMethodNames,
  getClientArea,
  getCodiconAriaLabel,
  getConfigurationValue,
  getDomNodePagePosition,
  getDomNodeZoomLevel,
  getIconRegistry,
  getSingletonServiceDescriptors,
  getTotalHeight,
  getTotalWidth,
  getWordAtText,
  globals,
  hide,
  illegalArgument,
  illegalState,
  implies,
  init_actions,
  init_actions2,
  init_aria,
  init_arrays,
  init_async,
  init_browser,
  init_canIUse,
  init_cancellation,
  init_characterClassifier,
  init_codeEditorService,
  init_codicons,
  init_color,
  init_colorRegistry,
  init_commands,
  init_configuration,
  init_configurationRegistry,
  init_contextkey,
  init_descriptors,
  init_dom,
  init_editOperation,
  init_editorColorRegistry,
  init_editorCommon,
  init_editorExtensions,
  init_editorWorker,
  init_encodedTokenAttributes,
  init_errors,
  init_event,
  init_extensions,
  init_extpath,
  init_format,
  init_functional,
  init_instantiation,
  init_iterator,
  init_keyCodes,
  init_keybindings,
  init_keybindingsRegistry,
  init_keyboardEvent,
  init_language,
  init_languageConfigurationRegistry,
  init_languageFeatureDebounce,
  init_languageFeatures,
  init_languages,
  init_lifecycle,
  init_lineTokens,
  init_linkedList,
  init_log,
  init_map,
  init_mime,
  init_model,
  init_model2,
  init_modelService,
  init_modesRegistry,
  init_mouseEvent,
  init_network,
  init_nls,
  init_nullTokenize,
  init_objects,
  init_opener,
  init_path,
  init_platform,
  init_platform2,
  init_position,
  init_progress,
  init_range,
  init_resolverService,
  init_resources,
  init_selection,
  init_stopwatch,
  init_strings,
  init_telemetry,
  init_textResourceConfiguration,
  init_theme,
  init_themeService,
  init_types,
  init_undoRedo,
  init_uri,
  init_viewLineRenderer,
  init_wordHelper,
  inputBackground,
  inputBorder,
  inputForeground,
  inputValidationErrorBackground,
  inputValidationErrorBorder,
  inputValidationErrorForeground,
  inputValidationInfoBackground,
  inputValidationInfoBorder,
  inputValidationInfoForeground,
  inputValidationWarningBackground,
  inputValidationWarningBorder,
  inputValidationWarningForeground,
  isAncestor,
  isCancellationError,
  isDark,
  isDiffEditorConfigurationKey,
  isDisposable,
  isEditorConfigurationKey,
  isEqualOrParent,
  isFalsyOrEmpty,
  isFirefox,
  isHTMLElement,
  isHighContrast,
  isIMenuItem,
  isIOS,
  isInShadowDOM,
  isLinux,
  isMacintosh,
  isNonEmptyArray,
  isObject,
  isSafari,
  isThenable,
  isUpperAsciiLetter,
  isWeb,
  isWebkitWebView,
  keybindingLabelBackground,
  keybindingLabelBorder,
  keybindingLabelBottomBorder,
  keybindingLabelForeground,
  lastNonWhitespaceIndex,
  localize,
  ltrim,
  matchesFuzzyIconAware,
  matchesScheme,
  matchesSomeScheme,
  memoize,
  minimapError,
  minimapWarning,
  mixin,
  normalize,
  normalizePath,
  nullTokenize,
  nullTokenizeEncoded,
  onUnexpectedError,
  once,
  overrideIdentifiersFromKey,
  overviewRulerError,
  overviewRulerInfo,
  overviewRulerWarning,
  parse,
  parseLabelWithIcons,
  pickerGroupBorder,
  pickerGroupForeground,
  posix,
  progressBarBackground,
  quickInputBackground,
  quickInputForeground,
  quickInputListFocusBackground,
  quickInputListFocusForeground,
  quickInputListFocusIconForeground,
  quickInputTitleBackground,
  range,
  regExpFlags,
  regExpLeadsToEndlessLoop,
  registerEditorContribution,
  registerSingleton,
  removeFastWithoutKeepingOrder,
  removeFromValueTree,
  renderLabelWithIcons,
  renderViewLine2,
  reset,
  rtrim,
  sep,
  setARIAContainer,
  severity_default,
  shouldSynchronizeModel,
  show,
  splitLines,
  startsWithUTF8BOM,
  stringDiff,
  stripIcons,
  themeColorFromId,
  timeout,
  toAction,
  toDisposable,
  toValuesTree,
  trackFocus,
  transformErrorForSerialization,
  widgetShadow,
  windowOpenNoOpener,
  withNullAsUndefined
} from "./chunk-chunk-GDIBQKRB.mjs";
import {
  init_define_process
} from "./chunk-chunk-VOIE2EHU.mjs";
import {
  __export
} from "./chunk-chunk-VTSDAELY.mjs";

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/editor.api.js
var editor_api_exports = {};
__export(editor_api_exports, {
  CancellationTokenSource: () => CancellationTokenSource2,
  Emitter: () => Emitter2,
  KeyCode: () => KeyCode2,
  KeyMod: () => KeyMod2,
  MarkerSeverity: () => MarkerSeverity3,
  MarkerTag: () => MarkerTag2,
  Position: () => Position2,
  Range: () => Range3,
  Selection: () => Selection2,
  SelectionDirection: () => SelectionDirection2,
  Token: () => Token2,
  Uri: () => Uri,
  editor: () => editor,
  languages: () => languages
});
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/editorBaseApi.js
init_define_process();
init_cancellation();
init_event();
init_keyCodes();
init_uri();
init_position();
init_range();
init_selection();
init_languages();
var KeyMod = class {
  static chord(firstPart, secondPart) {
    return KeyChord(firstPart, secondPart);
  }
};
KeyMod.CtrlCmd = 2048;
KeyMod.Shift = 1024;
KeyMod.Alt = 512;
KeyMod.WinCtrl = 256;
function createMonacoBaseAPI() {
  return {
    editor: void 0,
    languages: void 0,
    CancellationTokenSource,
    Emitter,
    KeyCode,
    KeyMod,
    Position,
    Range,
    Selection,
    SelectionDirection,
    MarkerSeverity,
    MarkerTag,
    Uri: URI,
    Token
  };
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneEditor.js
init_define_process();
init_strings();
init_codeEditorService();
init_editorCommon();
init_model();
init_languages();
init_languageConfigurationRegistry();
init_nullTokenize();
init_language();
init_model2();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/webWorker.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/editorWorkerService.js
init_define_process();
init_async();
init_lifecycle();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/common/worker/simpleWorker.js
init_define_process();
init_errors();
init_event();
init_lifecycle();
init_platform();
init_types();
init_strings();
var INITIALIZE = "$initialize";
var webWorkerWarningLogged = false;
function logOnceWebWorkerWarning(err) {
  if (!isWeb) {
    return;
  }
  if (!webWorkerWarningLogged) {
    webWorkerWarningLogged = true;
    console.warn("Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq");
  }
  console.warn(err.message);
}
var RequestMessage = class {
  constructor(vsWorker, req, method, args) {
    this.vsWorker = vsWorker;
    this.req = req;
    this.method = method;
    this.args = args;
    this.type = 0;
  }
};
var ReplyMessage = class {
  constructor(vsWorker, seq, res, err) {
    this.vsWorker = vsWorker;
    this.seq = seq;
    this.res = res;
    this.err = err;
    this.type = 1;
  }
};
var SubscribeEventMessage = class {
  constructor(vsWorker, req, eventName, arg) {
    this.vsWorker = vsWorker;
    this.req = req;
    this.eventName = eventName;
    this.arg = arg;
    this.type = 2;
  }
};
var EventMessage = class {
  constructor(vsWorker, req, event) {
    this.vsWorker = vsWorker;
    this.req = req;
    this.event = event;
    this.type = 3;
  }
};
var UnsubscribeEventMessage = class {
  constructor(vsWorker, req) {
    this.vsWorker = vsWorker;
    this.req = req;
    this.type = 4;
  }
};
var SimpleWorkerProtocol = class {
  constructor(handler) {
    this._workerId = -1;
    this._handler = handler;
    this._lastSentReq = 0;
    this._pendingReplies = /* @__PURE__ */ Object.create(null);
    this._pendingEmitters = /* @__PURE__ */ new Map();
    this._pendingEvents = /* @__PURE__ */ new Map();
  }
  setWorkerId(workerId) {
    this._workerId = workerId;
  }
  sendMessage(method, args) {
    const req = String(++this._lastSentReq);
    return new Promise((resolve, reject) => {
      this._pendingReplies[req] = {
        resolve,
        reject
      };
      this._send(new RequestMessage(this._workerId, req, method, args));
    });
  }
  listen(eventName, arg) {
    let req = null;
    const emitter = new Emitter({
      onFirstListenerAdd: () => {
        req = String(++this._lastSentReq);
        this._pendingEmitters.set(req, emitter);
        this._send(new SubscribeEventMessage(this._workerId, req, eventName, arg));
      },
      onLastListenerRemove: () => {
        this._pendingEmitters.delete(req);
        this._send(new UnsubscribeEventMessage(this._workerId, req));
        req = null;
      }
    });
    return emitter.event;
  }
  handleMessage(message) {
    if (!message || !message.vsWorker) {
      return;
    }
    if (this._workerId !== -1 && message.vsWorker !== this._workerId) {
      return;
    }
    this._handleMessage(message);
  }
  _handleMessage(msg) {
    switch (msg.type) {
      case 1:
        return this._handleReplyMessage(msg);
      case 0:
        return this._handleRequestMessage(msg);
      case 2:
        return this._handleSubscribeEventMessage(msg);
      case 3:
        return this._handleEventMessage(msg);
      case 4:
        return this._handleUnsubscribeEventMessage(msg);
    }
  }
  _handleReplyMessage(replyMessage) {
    if (!this._pendingReplies[replyMessage.seq]) {
      console.warn("Got reply to unknown seq");
      return;
    }
    const reply = this._pendingReplies[replyMessage.seq];
    delete this._pendingReplies[replyMessage.seq];
    if (replyMessage.err) {
      let err = replyMessage.err;
      if (replyMessage.err.$isError) {
        err = new Error();
        err.name = replyMessage.err.name;
        err.message = replyMessage.err.message;
        err.stack = replyMessage.err.stack;
      }
      reply.reject(err);
      return;
    }
    reply.resolve(replyMessage.res);
  }
  _handleRequestMessage(requestMessage) {
    const req = requestMessage.req;
    const result = this._handler.handleMessage(requestMessage.method, requestMessage.args);
    result.then((r) => {
      this._send(new ReplyMessage(this._workerId, req, r, void 0));
    }, (e) => {
      if (e.detail instanceof Error) {
        e.detail = transformErrorForSerialization(e.detail);
      }
      this._send(new ReplyMessage(this._workerId, req, void 0, transformErrorForSerialization(e)));
    });
  }
  _handleSubscribeEventMessage(msg) {
    const req = msg.req;
    const disposable = this._handler.handleEvent(msg.eventName, msg.arg)((event) => {
      this._send(new EventMessage(this._workerId, req, event));
    });
    this._pendingEvents.set(req, disposable);
  }
  _handleEventMessage(msg) {
    if (!this._pendingEmitters.has(msg.req)) {
      console.warn("Got event for unknown req");
      return;
    }
    this._pendingEmitters.get(msg.req).fire(msg.event);
  }
  _handleUnsubscribeEventMessage(msg) {
    if (!this._pendingEvents.has(msg.req)) {
      console.warn("Got unsubscribe for unknown req");
      return;
    }
    this._pendingEvents.get(msg.req).dispose();
    this._pendingEvents.delete(msg.req);
  }
  _send(msg) {
    const transfer = [];
    if (msg.type === 0) {
      for (let i = 0; i < msg.args.length; i++) {
        if (msg.args[i] instanceof ArrayBuffer) {
          transfer.push(msg.args[i]);
        }
      }
    } else if (msg.type === 1) {
      if (msg.res instanceof ArrayBuffer) {
        transfer.push(msg.res);
      }
    }
    this._handler.sendMessage(msg, transfer);
  }
};
var SimpleWorkerClient = class extends Disposable {
  constructor(workerFactory, moduleId, host) {
    super();
    let lazyProxyReject = null;
    this._worker = this._register(workerFactory.create("vs/base/common/worker/simpleWorker", (msg) => {
      this._protocol.handleMessage(msg);
    }, (err) => {
      lazyProxyReject === null || lazyProxyReject === void 0 ? void 0 : lazyProxyReject(err);
    }));
    this._protocol = new SimpleWorkerProtocol({
      sendMessage: (msg, transfer) => {
        this._worker.postMessage(msg, transfer);
      },
      handleMessage: (method, args) => {
        if (typeof host[method] !== "function") {
          return Promise.reject(new Error("Missing method " + method + " on main thread host."));
        }
        try {
          return Promise.resolve(host[method].apply(host, args));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      handleEvent: (eventName, arg) => {
        if (propertyIsDynamicEvent(eventName)) {
          const event = host[eventName].call(host, arg);
          if (typeof event !== "function") {
            throw new Error(`Missing dynamic event ${eventName} on main thread host.`);
          }
          return event;
        }
        if (propertyIsEvent(eventName)) {
          const event = host[eventName];
          if (typeof event !== "function") {
            throw new Error(`Missing event ${eventName} on main thread host.`);
          }
          return event;
        }
        throw new Error(`Malformed event name ${eventName}`);
      }
    });
    this._protocol.setWorkerId(this._worker.getId());
    let loaderConfiguration = null;
    if (typeof globals.require !== "undefined" && typeof globals.require.getConfig === "function") {
      loaderConfiguration = globals.require.getConfig();
    } else if (typeof globals.requirejs !== "undefined") {
      loaderConfiguration = globals.requirejs.s.contexts._.config;
    }
    const hostMethods = getAllMethodNames(host);
    this._onModuleLoaded = this._protocol.sendMessage(INITIALIZE, [
      this._worker.getId(),
      JSON.parse(JSON.stringify(loaderConfiguration)),
      moduleId,
      hostMethods
    ]);
    const proxyMethodRequest = (method, args) => {
      return this._request(method, args);
    };
    const proxyListen = (eventName, arg) => {
      return this._protocol.listen(eventName, arg);
    };
    this._lazyProxy = new Promise((resolve, reject) => {
      lazyProxyReject = reject;
      this._onModuleLoaded.then((availableMethods) => {
        resolve(createProxyObject2(availableMethods, proxyMethodRequest, proxyListen));
      }, (e) => {
        reject(e);
        this._onError("Worker failed to load " + moduleId, e);
      });
    });
  }
  getProxyObject() {
    return this._lazyProxy;
  }
  _request(method, args) {
    return new Promise((resolve, reject) => {
      this._onModuleLoaded.then(() => {
        this._protocol.sendMessage(method, args).then(resolve, reject);
      }, reject);
    });
  }
  _onError(message, error) {
    console.error(message);
    console.info(error);
  }
};
function propertyIsEvent(name) {
  return name[0] === "o" && name[1] === "n" && isUpperAsciiLetter(name.charCodeAt(2));
}
function propertyIsDynamicEvent(name) {
  return /^onDynamic/.test(name) && isUpperAsciiLetter(name.charCodeAt(9));
}
function createProxyObject2(methodNames, invoke, proxyListen) {
  const createProxyMethod = (method) => {
    return function() {
      const args = Array.prototype.slice.call(arguments, 0);
      return invoke(method, args);
    };
  };
  const createProxyDynamicEvent = (eventName) => {
    return function(arg) {
      return proxyListen(eventName, arg);
    };
  };
  const result = {};
  for (const methodName of methodNames) {
    if (propertyIsDynamicEvent(methodName)) {
      result[methodName] = createProxyDynamicEvent(methodName);
      continue;
    }
    if (propertyIsEvent(methodName)) {
      result[methodName] = proxyListen(methodName, void 0);
      continue;
    }
    result[methodName] = createProxyMethod(methodName);
  }
  return result;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/browser/defaultWorkerFactory.js
init_define_process();
init_platform();
var _a;
var ttPolicy = (_a = window.trustedTypes) === null || _a === void 0 ? void 0 : _a.createPolicy("defaultWorkerFactory", { createScriptURL: (value) => value });
function getWorker(label) {
  if (globals.MonacoEnvironment) {
    if (typeof globals.MonacoEnvironment.getWorker === "function") {
      return globals.MonacoEnvironment.getWorker("workerMain.js", label);
    }
    if (typeof globals.MonacoEnvironment.getWorkerUrl === "function") {
      const workerUrl = globals.MonacoEnvironment.getWorkerUrl("workerMain.js", label);
      return new Worker(ttPolicy ? ttPolicy.createScriptURL(workerUrl) : workerUrl, { name: label });
    }
  }
  throw new Error(`You must define a function MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker`);
}
function isPromiseLike(obj) {
  if (typeof obj.then === "function") {
    return true;
  }
  return false;
}
var WebWorker = class {
  constructor(moduleId, id, label, onMessageCallback, onErrorCallback) {
    this.id = id;
    const workerOrPromise = getWorker(label);
    if (isPromiseLike(workerOrPromise)) {
      this.worker = workerOrPromise;
    } else {
      this.worker = Promise.resolve(workerOrPromise);
    }
    this.postMessage(moduleId, []);
    this.worker.then((w) => {
      w.onmessage = function(ev) {
        onMessageCallback(ev.data);
      };
      w.onmessageerror = onErrorCallback;
      if (typeof w.addEventListener === "function") {
        w.addEventListener("error", onErrorCallback);
      }
    });
  }
  getId() {
    return this.id;
  }
  postMessage(message, transfer) {
    var _a4;
    (_a4 = this.worker) === null || _a4 === void 0 ? void 0 : _a4.then((w) => w.postMessage(message, transfer));
  }
  dispose() {
    var _a4;
    (_a4 = this.worker) === null || _a4 === void 0 ? void 0 : _a4.then((w) => w.terminate());
    this.worker = null;
  }
};
var DefaultWorkerFactory = class {
  constructor(label) {
    this._label = label;
    this._webWorkerFailedBeforeError = false;
  }
  create(moduleId, onMessageCallback, onErrorCallback) {
    const workerId = ++DefaultWorkerFactory.LAST_WORKER_ID;
    if (this._webWorkerFailedBeforeError) {
      throw this._webWorkerFailedBeforeError;
    }
    return new WebWorker(moduleId, workerId, this._label || "anonymous" + workerId, onMessageCallback, (err) => {
      logOnceWebWorkerWarning(err);
      this._webWorkerFailedBeforeError = err;
      onErrorCallback(err);
    });
  }
};
DefaultWorkerFactory.LAST_WORKER_ID = 0;

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/editorWorkerService.js
init_range();
init_languageConfigurationRegistry();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js
init_define_process();
init_platform();
init_uri();
init_position();
init_range();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/diff/diffComputer.js
init_define_process();
init_strings();
var MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
function computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
  const diffAlgo = new LcsDiff(originalSequence, modifiedSequence, continueProcessingPredicate);
  return diffAlgo.ComputeDiff(pretty);
}
var LineSequence = class {
  constructor(lines) {
    const startColumns = [];
    const endColumns = [];
    for (let i = 0, length = lines.length; i < length; i++) {
      startColumns[i] = getFirstNonBlankColumn(lines[i], 1);
      endColumns[i] = getLastNonBlankColumn(lines[i], 1);
    }
    this.lines = lines;
    this._startColumns = startColumns;
    this._endColumns = endColumns;
  }
  getElements() {
    const elements = [];
    for (let i = 0, len = this.lines.length; i < len; i++) {
      elements[i] = this.lines[i].substring(this._startColumns[i] - 1, this._endColumns[i] - 1);
    }
    return elements;
  }
  getStrictElement(index) {
    return this.lines[index];
  }
  getStartLineNumber(i) {
    return i + 1;
  }
  getEndLineNumber(i) {
    return i + 1;
  }
  createCharSequence(shouldIgnoreTrimWhitespace, startIndex, endIndex) {
    const charCodes = [];
    const lineNumbers = [];
    const columns = [];
    let len = 0;
    for (let index = startIndex; index <= endIndex; index++) {
      const lineContent = this.lines[index];
      const startColumn = shouldIgnoreTrimWhitespace ? this._startColumns[index] : 1;
      const endColumn = shouldIgnoreTrimWhitespace ? this._endColumns[index] : lineContent.length + 1;
      for (let col = startColumn; col < endColumn; col++) {
        charCodes[len] = lineContent.charCodeAt(col - 1);
        lineNumbers[len] = index + 1;
        columns[len] = col;
        len++;
      }
      if (!shouldIgnoreTrimWhitespace && index < endIndex) {
        charCodes[len] = 10;
        lineNumbers[len] = index + 1;
        columns[len] = lineContent.length + 1;
        len++;
      }
    }
    return new CharSequence(charCodes, lineNumbers, columns);
  }
};
var CharSequence = class {
  constructor(charCodes, lineNumbers, columns) {
    this._charCodes = charCodes;
    this._lineNumbers = lineNumbers;
    this._columns = columns;
  }
  toString() {
    return "[" + this._charCodes.map((s, idx) => (s === 10 ? "\\n" : String.fromCharCode(s)) + `-(${this._lineNumbers[idx]},${this._columns[idx]})`).join(", ") + "]";
  }
  _assertIndex(index, arr) {
    if (index < 0 || index >= arr.length) {
      throw new Error(`Illegal index`);
    }
  }
  getElements() {
    return this._charCodes;
  }
  getStartLineNumber(i) {
    if (i > 0 && i === this._lineNumbers.length) {
      return this.getEndLineNumber(i - 1);
    }
    this._assertIndex(i, this._lineNumbers);
    return this._lineNumbers[i];
  }
  getEndLineNumber(i) {
    if (i === -1) {
      return this.getStartLineNumber(i + 1);
    }
    this._assertIndex(i, this._lineNumbers);
    if (this._charCodes[i] === 10) {
      return this._lineNumbers[i] + 1;
    }
    return this._lineNumbers[i];
  }
  getStartColumn(i) {
    if (i > 0 && i === this._columns.length) {
      return this.getEndColumn(i - 1);
    }
    this._assertIndex(i, this._columns);
    return this._columns[i];
  }
  getEndColumn(i) {
    if (i === -1) {
      return this.getStartColumn(i + 1);
    }
    this._assertIndex(i, this._columns);
    if (this._charCodes[i] === 10) {
      return 1;
    }
    return this._columns[i] + 1;
  }
};
var CharChange = class {
  constructor(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn) {
    this.originalStartLineNumber = originalStartLineNumber;
    this.originalStartColumn = originalStartColumn;
    this.originalEndLineNumber = originalEndLineNumber;
    this.originalEndColumn = originalEndColumn;
    this.modifiedStartLineNumber = modifiedStartLineNumber;
    this.modifiedStartColumn = modifiedStartColumn;
    this.modifiedEndLineNumber = modifiedEndLineNumber;
    this.modifiedEndColumn = modifiedEndColumn;
  }
  static createFromDiffChange(diffChange, originalCharSequence, modifiedCharSequence) {
    const originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
    const originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
    const originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
    const originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
    const modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
    const modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
    const modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
    const modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
    return new CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
  }
};
function postProcessCharChanges(rawChanges) {
  if (rawChanges.length <= 1) {
    return rawChanges;
  }
  const result = [rawChanges[0]];
  let prevChange = result[0];
  for (let i = 1, len = rawChanges.length; i < len; i++) {
    const currChange = rawChanges[i];
    const originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
    const modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
    const matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
    if (matchingLength < MINIMUM_MATCHING_CHARACTER_LENGTH) {
      prevChange.originalLength = currChange.originalStart + currChange.originalLength - prevChange.originalStart;
      prevChange.modifiedLength = currChange.modifiedStart + currChange.modifiedLength - prevChange.modifiedStart;
    } else {
      result.push(currChange);
      prevChange = currChange;
    }
  }
  return result;
}
var LineChange = class {
  constructor(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges) {
    this.originalStartLineNumber = originalStartLineNumber;
    this.originalEndLineNumber = originalEndLineNumber;
    this.modifiedStartLineNumber = modifiedStartLineNumber;
    this.modifiedEndLineNumber = modifiedEndLineNumber;
    this.charChanges = charChanges;
  }
  static createFromDiffResult(shouldIgnoreTrimWhitespace, diffChange, originalLineSequence, modifiedLineSequence, continueCharDiff, shouldComputeCharChanges, shouldPostProcessCharChanges) {
    let originalStartLineNumber;
    let originalEndLineNumber;
    let modifiedStartLineNumber;
    let modifiedEndLineNumber;
    let charChanges = void 0;
    if (diffChange.originalLength === 0) {
      originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
      originalEndLineNumber = 0;
    } else {
      originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
      originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
    }
    if (diffChange.modifiedLength === 0) {
      modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
      modifiedEndLineNumber = 0;
    } else {
      modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
      modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
    }
    if (shouldComputeCharChanges && diffChange.originalLength > 0 && diffChange.originalLength < 20 && diffChange.modifiedLength > 0 && diffChange.modifiedLength < 20 && continueCharDiff()) {
      const originalCharSequence = originalLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
      const modifiedCharSequence = modifiedLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
      if (originalCharSequence.getElements().length > 0 && modifiedCharSequence.getElements().length > 0) {
        let rawChanges = computeDiff(originalCharSequence, modifiedCharSequence, continueCharDiff, true).changes;
        if (shouldPostProcessCharChanges) {
          rawChanges = postProcessCharChanges(rawChanges);
        }
        charChanges = [];
        for (let i = 0, length = rawChanges.length; i < length; i++) {
          charChanges.push(CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
        }
      }
    }
    return new LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
  }
};
var DiffComputer = class {
  constructor(originalLines, modifiedLines, opts) {
    this.shouldComputeCharChanges = opts.shouldComputeCharChanges;
    this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
    this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
    this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
    this.originalLines = originalLines;
    this.modifiedLines = modifiedLines;
    this.original = new LineSequence(originalLines);
    this.modified = new LineSequence(modifiedLines);
    this.continueLineDiff = createContinueProcessingPredicate(opts.maxComputationTime);
    this.continueCharDiff = createContinueProcessingPredicate(opts.maxComputationTime === 0 ? 0 : Math.min(opts.maxComputationTime, 5e3));
  }
  computeDiff() {
    if (this.original.lines.length === 1 && this.original.lines[0].length === 0) {
      if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
        return {
          quitEarly: false,
          changes: []
        };
      }
      return {
        quitEarly: false,
        changes: [{
          originalStartLineNumber: 1,
          originalEndLineNumber: 1,
          modifiedStartLineNumber: 1,
          modifiedEndLineNumber: this.modified.lines.length,
          charChanges: [{
            modifiedEndColumn: 0,
            modifiedEndLineNumber: 0,
            modifiedStartColumn: 0,
            modifiedStartLineNumber: 0,
            originalEndColumn: 0,
            originalEndLineNumber: 0,
            originalStartColumn: 0,
            originalStartLineNumber: 0
          }]
        }]
      };
    }
    if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
      return {
        quitEarly: false,
        changes: [{
          originalStartLineNumber: 1,
          originalEndLineNumber: this.original.lines.length,
          modifiedStartLineNumber: 1,
          modifiedEndLineNumber: 1,
          charChanges: [{
            modifiedEndColumn: 0,
            modifiedEndLineNumber: 0,
            modifiedStartColumn: 0,
            modifiedStartLineNumber: 0,
            originalEndColumn: 0,
            originalEndLineNumber: 0,
            originalStartColumn: 0,
            originalStartLineNumber: 0
          }]
        }]
      };
    }
    const diffResult = computeDiff(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff);
    const rawChanges = diffResult.changes;
    const quitEarly = diffResult.quitEarly;
    if (this.shouldIgnoreTrimWhitespace) {
      const lineChanges = [];
      for (let i = 0, length = rawChanges.length; i < length; i++) {
        lineChanges.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, rawChanges[i], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
      }
      return {
        quitEarly,
        changes: lineChanges
      };
    }
    const result = [];
    let originalLineIndex = 0;
    let modifiedLineIndex = 0;
    for (let i = -1, len = rawChanges.length; i < len; i++) {
      const nextChange = i + 1 < len ? rawChanges[i + 1] : null;
      const originalStop = nextChange ? nextChange.originalStart : this.originalLines.length;
      const modifiedStop = nextChange ? nextChange.modifiedStart : this.modifiedLines.length;
      while (originalLineIndex < originalStop && modifiedLineIndex < modifiedStop) {
        const originalLine = this.originalLines[originalLineIndex];
        const modifiedLine = this.modifiedLines[modifiedLineIndex];
        if (originalLine !== modifiedLine) {
          {
            let originalStartColumn = getFirstNonBlankColumn(originalLine, 1);
            let modifiedStartColumn = getFirstNonBlankColumn(modifiedLine, 1);
            while (originalStartColumn > 1 && modifiedStartColumn > 1) {
              const originalChar = originalLine.charCodeAt(originalStartColumn - 2);
              const modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
              if (originalChar !== modifiedChar) {
                break;
              }
              originalStartColumn--;
              modifiedStartColumn--;
            }
            if (originalStartColumn > 1 || modifiedStartColumn > 1) {
              this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
            }
          }
          {
            let originalEndColumn = getLastNonBlankColumn(originalLine, 1);
            let modifiedEndColumn = getLastNonBlankColumn(modifiedLine, 1);
            const originalMaxColumn = originalLine.length + 1;
            const modifiedMaxColumn = modifiedLine.length + 1;
            while (originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn) {
              const originalChar = originalLine.charCodeAt(originalEndColumn - 1);
              const modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
              if (originalChar !== modifiedChar) {
                break;
              }
              originalEndColumn++;
              modifiedEndColumn++;
            }
            if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) {
              this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
            }
          }
        }
        originalLineIndex++;
        modifiedLineIndex++;
      }
      if (nextChange) {
        result.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, nextChange, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
        originalLineIndex += nextChange.originalLength;
        modifiedLineIndex += nextChange.modifiedLength;
      }
    }
    return {
      quitEarly,
      changes: result
    };
  }
  _pushTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
    if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) {
      return;
    }
    let charChanges = void 0;
    if (this.shouldComputeCharChanges) {
      charChanges = [new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)];
    }
    result.push(new LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, charChanges));
  }
  _mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
    const len = result.length;
    if (len === 0) {
      return false;
    }
    const prevChange = result[len - 1];
    if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) {
      return false;
    }
    if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
      prevChange.originalEndLineNumber = originalLineNumber;
      prevChange.modifiedEndLineNumber = modifiedLineNumber;
      if (this.shouldComputeCharChanges && prevChange.charChanges) {
        prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
      }
      return true;
    }
    return false;
  }
};
function getFirstNonBlankColumn(txt, defaultValue) {
  const r = firstNonWhitespaceIndex(txt);
  if (r === -1) {
    return defaultValue;
  }
  return r + 1;
}
function getLastNonBlankColumn(txt, defaultValue) {
  const r = lastNonWhitespaceIndex(txt);
  if (r === -1) {
    return defaultValue;
  }
  return r + 2;
}
function createContinueProcessingPredicate(maximumRuntime) {
  if (maximumRuntime === 0) {
    return () => true;
  }
  const startTime = Date.now();
  return () => {
    return Date.now() - startTime < maximumRuntime;
  };
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/model/mirrorTextModel.js
init_define_process();
init_strings();
init_position();
var MirrorTextModel = class {
  constructor(uri, lines, eol, versionId) {
    this._uri = uri;
    this._lines = lines;
    this._eol = eol;
    this._versionId = versionId;
    this._lineStarts = null;
    this._cachedTextValue = null;
  }
  dispose() {
    this._lines.length = 0;
  }
  get version() {
    return this._versionId;
  }
  getText() {
    if (this._cachedTextValue === null) {
      this._cachedTextValue = this._lines.join(this._eol);
    }
    return this._cachedTextValue;
  }
  onEvents(e) {
    if (e.eol && e.eol !== this._eol) {
      this._eol = e.eol;
      this._lineStarts = null;
    }
    const changes = e.changes;
    for (const change of changes) {
      this._acceptDeleteRange(change.range);
      this._acceptInsertText(new Position(change.range.startLineNumber, change.range.startColumn), change.text);
    }
    this._versionId = e.versionId;
    this._cachedTextValue = null;
  }
  _ensureLineStarts() {
    if (!this._lineStarts) {
      const eolLength = this._eol.length;
      const linesLength = this._lines.length;
      const lineStartValues = new Uint32Array(linesLength);
      for (let i = 0; i < linesLength; i++) {
        lineStartValues[i] = this._lines[i].length + eolLength;
      }
      this._lineStarts = new PrefixSumComputer(lineStartValues);
    }
  }
  _setLineText(lineIndex, newValue) {
    this._lines[lineIndex] = newValue;
    if (this._lineStarts) {
      this._lineStarts.setValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
    }
  }
  _acceptDeleteRange(range2) {
    if (range2.startLineNumber === range2.endLineNumber) {
      if (range2.startColumn === range2.endColumn) {
        return;
      }
      this._setLineText(range2.startLineNumber - 1, this._lines[range2.startLineNumber - 1].substring(0, range2.startColumn - 1) + this._lines[range2.startLineNumber - 1].substring(range2.endColumn - 1));
      return;
    }
    this._setLineText(range2.startLineNumber - 1, this._lines[range2.startLineNumber - 1].substring(0, range2.startColumn - 1) + this._lines[range2.endLineNumber - 1].substring(range2.endColumn - 1));
    this._lines.splice(range2.startLineNumber, range2.endLineNumber - range2.startLineNumber);
    if (this._lineStarts) {
      this._lineStarts.removeValues(range2.startLineNumber, range2.endLineNumber - range2.startLineNumber);
    }
  }
  _acceptInsertText(position, insertText) {
    if (insertText.length === 0) {
      return;
    }
    const insertLines = splitLines(insertText);
    if (insertLines.length === 1) {
      this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0] + this._lines[position.lineNumber - 1].substring(position.column - 1));
      return;
    }
    insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
    this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0]);
    const newLengths = new Uint32Array(insertLines.length - 1);
    for (let i = 1; i < insertLines.length; i++) {
      this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
      newLengths[i - 1] = insertLines[i].length + this._eol.length;
    }
    if (this._lineStarts) {
      this._lineStarts.insertValues(position.lineNumber, newLengths);
    }
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js
init_wordHelper();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/languages/linkComputer.js
init_define_process();
init_characterClassifier();
var Uint8Matrix = class {
  constructor(rows, cols, defaultValue) {
    const data = new Uint8Array(rows * cols);
    for (let i = 0, len = rows * cols; i < len; i++) {
      data[i] = defaultValue;
    }
    this._data = data;
    this.rows = rows;
    this.cols = cols;
  }
  get(row, col) {
    return this._data[row * this.cols + col];
  }
  set(row, col, value) {
    this._data[row * this.cols + col] = value;
  }
};
var StateMachine = class {
  constructor(edges) {
    let maxCharCode = 0;
    let maxState = 0;
    for (let i = 0, len = edges.length; i < len; i++) {
      const [from, chCode, to] = edges[i];
      if (chCode > maxCharCode) {
        maxCharCode = chCode;
      }
      if (from > maxState) {
        maxState = from;
      }
      if (to > maxState) {
        maxState = to;
      }
    }
    maxCharCode++;
    maxState++;
    const states = new Uint8Matrix(maxState, maxCharCode, 0);
    for (let i = 0, len = edges.length; i < len; i++) {
      const [from, chCode, to] = edges[i];
      states.set(from, chCode, to);
    }
    this._states = states;
    this._maxCharCode = maxCharCode;
  }
  nextState(currentState, chCode) {
    if (chCode < 0 || chCode >= this._maxCharCode) {
      return 0;
    }
    return this._states.get(currentState, chCode);
  }
};
var _stateMachine = null;
function getStateMachine() {
  if (_stateMachine === null) {
    _stateMachine = new StateMachine([
      [1, 104, 2],
      [1, 72, 2],
      [1, 102, 6],
      [1, 70, 6],
      [2, 116, 3],
      [2, 84, 3],
      [3, 116, 4],
      [3, 84, 4],
      [4, 112, 5],
      [4, 80, 5],
      [5, 115, 9],
      [5, 83, 9],
      [5, 58, 10],
      [6, 105, 7],
      [6, 73, 7],
      [7, 108, 8],
      [7, 76, 8],
      [8, 101, 9],
      [8, 69, 9],
      [9, 58, 10],
      [10, 47, 11],
      [11, 47, 12]
    ]);
  }
  return _stateMachine;
}
var _classifier = null;
function getClassifier() {
  if (_classifier === null) {
    _classifier = new CharacterClassifier(0);
    const FORCE_TERMINATION_CHARACTERS = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
    for (let i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++) {
      _classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1);
    }
    const CANNOT_END_WITH_CHARACTERS = ".,;:";
    for (let i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++) {
      _classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2);
    }
  }
  return _classifier;
}
var LinkComputer = class {
  static _createLink(classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
    let lastIncludedCharIndex = linkEndIndex - 1;
    do {
      const chCode = line.charCodeAt(lastIncludedCharIndex);
      const chClass = classifier.get(chCode);
      if (chClass !== 2) {
        break;
      }
      lastIncludedCharIndex--;
    } while (lastIncludedCharIndex > linkBeginIndex);
    if (linkBeginIndex > 0) {
      const charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
      const lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
      if (charCodeBeforeLink === 40 && lastCharCodeInLink === 41 || charCodeBeforeLink === 91 && lastCharCodeInLink === 93 || charCodeBeforeLink === 123 && lastCharCodeInLink === 125) {
        lastIncludedCharIndex--;
      }
    }
    return {
      range: {
        startLineNumber: lineNumber,
        startColumn: linkBeginIndex + 1,
        endLineNumber: lineNumber,
        endColumn: lastIncludedCharIndex + 2
      },
      url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
    };
  }
  static computeLinks(model, stateMachine = getStateMachine()) {
    const classifier = getClassifier();
    const result = [];
    for (let i = 1, lineCount = model.getLineCount(); i <= lineCount; i++) {
      const line = model.getLineContent(i);
      const len = line.length;
      let j = 0;
      let linkBeginIndex = 0;
      let linkBeginChCode = 0;
      let state = 1;
      let hasOpenParens = false;
      let hasOpenSquareBracket = false;
      let inSquareBrackets = false;
      let hasOpenCurlyBracket = false;
      while (j < len) {
        let resetStateMachine = false;
        const chCode = line.charCodeAt(j);
        if (state === 13) {
          let chClass;
          switch (chCode) {
            case 40:
              hasOpenParens = true;
              chClass = 0;
              break;
            case 41:
              chClass = hasOpenParens ? 0 : 1;
              break;
            case 91:
              inSquareBrackets = true;
              hasOpenSquareBracket = true;
              chClass = 0;
              break;
            case 93:
              inSquareBrackets = false;
              chClass = hasOpenSquareBracket ? 0 : 1;
              break;
            case 123:
              hasOpenCurlyBracket = true;
              chClass = 0;
              break;
            case 125:
              chClass = hasOpenCurlyBracket ? 0 : 1;
              break;
            case 39:
              chClass = linkBeginChCode === 39 ? 1 : 0;
              break;
            case 34:
              chClass = linkBeginChCode === 34 ? 1 : 0;
              break;
            case 96:
              chClass = linkBeginChCode === 96 ? 1 : 0;
              break;
            case 42:
              chClass = linkBeginChCode === 42 ? 1 : 0;
              break;
            case 124:
              chClass = linkBeginChCode === 124 ? 1 : 0;
              break;
            case 32:
              chClass = inSquareBrackets ? 0 : 1;
              break;
            default:
              chClass = classifier.get(chCode);
          }
          if (chClass === 1) {
            result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, j));
            resetStateMachine = true;
          }
        } else if (state === 12) {
          let chClass;
          if (chCode === 91) {
            hasOpenSquareBracket = true;
            chClass = 0;
          } else {
            chClass = classifier.get(chCode);
          }
          if (chClass === 1) {
            resetStateMachine = true;
          } else {
            state = 13;
          }
        } else {
          state = stateMachine.nextState(state, chCode);
          if (state === 0) {
            resetStateMachine = true;
          }
        }
        if (resetStateMachine) {
          state = 1;
          hasOpenParens = false;
          hasOpenSquareBracket = false;
          hasOpenCurlyBracket = false;
          linkBeginIndex = j + 1;
          linkBeginChCode = chCode;
        }
        j++;
      }
      if (state === 13) {
        result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, len));
      }
    }
    return result;
  }
};
function computeLinks(model) {
  if (!model || typeof model.getLineCount !== "function" || typeof model.getLineContent !== "function") {
    return [];
  }
  return LinkComputer.computeLinks(model);
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/languages/supports/inplaceReplaceSupport.js
init_define_process();
var BasicInplaceReplace = class {
  constructor() {
    this._defaultValueSet = [
      ["true", "false"],
      ["True", "False"],
      ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
      ["public", "protected", "private"]
    ];
  }
  navigateValueSet(range1, text1, range2, text2, up) {
    if (range1 && text1) {
      const result = this.doNavigateValueSet(text1, up);
      if (result) {
        return {
          range: range1,
          value: result
        };
      }
    }
    if (range2 && text2) {
      const result = this.doNavigateValueSet(text2, up);
      if (result) {
        return {
          range: range2,
          value: result
        };
      }
    }
    return null;
  }
  doNavigateValueSet(text, up) {
    const numberResult = this.numberReplace(text, up);
    if (numberResult !== null) {
      return numberResult;
    }
    return this.textReplace(text, up);
  }
  numberReplace(value, up) {
    const precision = Math.pow(10, value.length - (value.lastIndexOf(".") + 1));
    let n1 = Number(value);
    const n2 = parseFloat(value);
    if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
      if (n1 === 0 && !up) {
        return null;
      } else {
        n1 = Math.floor(n1 * precision);
        n1 += up ? precision : -precision;
        return String(n1 / precision);
      }
    }
    return null;
  }
  textReplace(value, up) {
    return this.valueSetsReplace(this._defaultValueSet, value, up);
  }
  valueSetsReplace(valueSets, value, up) {
    let result = null;
    for (let i = 0, len = valueSets.length; result === null && i < len; i++) {
      result = this.valueSetReplace(valueSets[i], value, up);
    }
    return result;
  }
  valueSetReplace(valueSet, value, up) {
    let idx = valueSet.indexOf(value);
    if (idx >= 0) {
      idx += up ? 1 : -1;
      if (idx < 0) {
        idx = valueSet.length - 1;
      } else {
        idx %= valueSet.length;
      }
      return valueSet[idx];
    }
    return null;
  }
};
BasicInplaceReplace.INSTANCE = new BasicInplaceReplace();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js
init_types();
init_stopwatch();
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var MirrorModel = class extends MirrorTextModel {
  get uri() {
    return this._uri;
  }
  get eol() {
    return this._eol;
  }
  getValue() {
    return this.getText();
  }
  getLinesContent() {
    return this._lines.slice(0);
  }
  getLineCount() {
    return this._lines.length;
  }
  getLineContent(lineNumber) {
    return this._lines[lineNumber - 1];
  }
  getWordAtPosition(position, wordDefinition) {
    const wordAtText = getWordAtText(position.column, ensureValidWordDefinition(wordDefinition), this._lines[position.lineNumber - 1], 0);
    if (wordAtText) {
      return new Range(position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
    }
    return null;
  }
  words(wordDefinition) {
    const lines = this._lines;
    const wordenize = this._wordenize.bind(this);
    let lineNumber = 0;
    let lineText = "";
    let wordRangesIdx = 0;
    let wordRanges = [];
    return {
      *[Symbol.iterator]() {
        while (true) {
          if (wordRangesIdx < wordRanges.length) {
            const value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
            wordRangesIdx += 1;
            yield value;
          } else {
            if (lineNumber < lines.length) {
              lineText = lines[lineNumber];
              wordRanges = wordenize(lineText, wordDefinition);
              wordRangesIdx = 0;
              lineNumber += 1;
            } else {
              break;
            }
          }
        }
      }
    };
  }
  getLineWords(lineNumber, wordDefinition) {
    const content = this._lines[lineNumber - 1];
    const ranges = this._wordenize(content, wordDefinition);
    const words = [];
    for (const range2 of ranges) {
      words.push({
        word: content.substring(range2.start, range2.end),
        startColumn: range2.start + 1,
        endColumn: range2.end + 1
      });
    }
    return words;
  }
  _wordenize(content, wordDefinition) {
    const result = [];
    let match2;
    wordDefinition.lastIndex = 0;
    while (match2 = wordDefinition.exec(content)) {
      if (match2[0].length === 0) {
        break;
      }
      result.push({ start: match2.index, end: match2.index + match2[0].length });
    }
    return result;
  }
  getValueInRange(range2) {
    range2 = this._validateRange(range2);
    if (range2.startLineNumber === range2.endLineNumber) {
      return this._lines[range2.startLineNumber - 1].substring(range2.startColumn - 1, range2.endColumn - 1);
    }
    const lineEnding = this._eol;
    const startLineIndex = range2.startLineNumber - 1;
    const endLineIndex = range2.endLineNumber - 1;
    const resultLines = [];
    resultLines.push(this._lines[startLineIndex].substring(range2.startColumn - 1));
    for (let i = startLineIndex + 1; i < endLineIndex; i++) {
      resultLines.push(this._lines[i]);
    }
    resultLines.push(this._lines[endLineIndex].substring(0, range2.endColumn - 1));
    return resultLines.join(lineEnding);
  }
  offsetAt(position) {
    position = this._validatePosition(position);
    this._ensureLineStarts();
    return this._lineStarts.getPrefixSum(position.lineNumber - 2) + (position.column - 1);
  }
  positionAt(offset) {
    offset = Math.floor(offset);
    offset = Math.max(0, offset);
    this._ensureLineStarts();
    const out = this._lineStarts.getIndexOf(offset);
    const lineLength = this._lines[out.index].length;
    return {
      lineNumber: 1 + out.index,
      column: 1 + Math.min(out.remainder, lineLength)
    };
  }
  _validateRange(range2) {
    const start = this._validatePosition({ lineNumber: range2.startLineNumber, column: range2.startColumn });
    const end = this._validatePosition({ lineNumber: range2.endLineNumber, column: range2.endColumn });
    if (start.lineNumber !== range2.startLineNumber || start.column !== range2.startColumn || end.lineNumber !== range2.endLineNumber || end.column !== range2.endColumn) {
      return {
        startLineNumber: start.lineNumber,
        startColumn: start.column,
        endLineNumber: end.lineNumber,
        endColumn: end.column
      };
    }
    return range2;
  }
  _validatePosition(position) {
    if (!Position.isIPosition(position)) {
      throw new Error("bad position");
    }
    let { lineNumber, column } = position;
    let hasChanged = false;
    if (lineNumber < 1) {
      lineNumber = 1;
      column = 1;
      hasChanged = true;
    } else if (lineNumber > this._lines.length) {
      lineNumber = this._lines.length;
      column = this._lines[lineNumber - 1].length + 1;
      hasChanged = true;
    } else {
      const maxCharacter = this._lines[lineNumber - 1].length + 1;
      if (column < 1) {
        column = 1;
        hasChanged = true;
      } else if (column > maxCharacter) {
        column = maxCharacter;
        hasChanged = true;
      }
    }
    if (!hasChanged) {
      return position;
    } else {
      return { lineNumber, column };
    }
  }
};
var EditorSimpleWorker = class {
  constructor(host, foreignModuleFactory) {
    this._host = host;
    this._models = /* @__PURE__ */ Object.create(null);
    this._foreignModuleFactory = foreignModuleFactory;
    this._foreignModule = null;
  }
  dispose() {
    this._models = /* @__PURE__ */ Object.create(null);
  }
  _getModel(uri) {
    return this._models[uri];
  }
  _getModels() {
    const all = [];
    Object.keys(this._models).forEach((key) => all.push(this._models[key]));
    return all;
  }
  acceptNewModel(data) {
    this._models[data.url] = new MirrorModel(URI.parse(data.url), data.lines, data.EOL, data.versionId);
  }
  acceptModelChanged(strURL, e) {
    if (!this._models[strURL]) {
      return;
    }
    const model = this._models[strURL];
    model.onEvents(e);
  }
  acceptRemovedModel(strURL) {
    if (!this._models[strURL]) {
      return;
    }
    delete this._models[strURL];
  }
  computeUnicodeHighlights(url, options, range2) {
    return __awaiter(this, void 0, void 0, function* () {
      const model = this._getModel(url);
      if (!model) {
        return { ranges: [], hasMore: false, ambiguousCharacterCount: 0, invisibleCharacterCount: 0, nonBasicAsciiCharacterCount: 0 };
      }
      return UnicodeTextModelHighlighter.computeUnicodeHighlights(model, options, range2);
    });
  }
  computeDiff(originalUrl, modifiedUrl, ignoreTrimWhitespace, maxComputationTime) {
    return __awaiter(this, void 0, void 0, function* () {
      const original = this._getModel(originalUrl);
      const modified = this._getModel(modifiedUrl);
      if (!original || !modified) {
        return null;
      }
      return EditorSimpleWorker.computeDiff(original, modified, ignoreTrimWhitespace, maxComputationTime);
    });
  }
  static computeDiff(originalTextModel, modifiedTextModel, ignoreTrimWhitespace, maxComputationTime) {
    const originalLines = originalTextModel.getLinesContent();
    const modifiedLines = modifiedTextModel.getLinesContent();
    const diffComputer = new DiffComputer(originalLines, modifiedLines, {
      shouldComputeCharChanges: true,
      shouldPostProcessCharChanges: true,
      shouldIgnoreTrimWhitespace: ignoreTrimWhitespace,
      shouldMakePrettyDiff: true,
      maxComputationTime
    });
    const diffResult = diffComputer.computeDiff();
    const identical = diffResult.changes.length > 0 ? false : this._modelsAreIdentical(originalTextModel, modifiedTextModel);
    return {
      quitEarly: diffResult.quitEarly,
      identical,
      changes: diffResult.changes
    };
  }
  static _modelsAreIdentical(original, modified) {
    const originalLineCount = original.getLineCount();
    const modifiedLineCount = modified.getLineCount();
    if (originalLineCount !== modifiedLineCount) {
      return false;
    }
    for (let line = 1; line <= originalLineCount; line++) {
      const originalLine = original.getLineContent(line);
      const modifiedLine = modified.getLineContent(line);
      if (originalLine !== modifiedLine) {
        return false;
      }
    }
    return true;
  }
  computeMoreMinimalEdits(modelUrl, edits) {
    return __awaiter(this, void 0, void 0, function* () {
      const model = this._getModel(modelUrl);
      if (!model) {
        return edits;
      }
      const result = [];
      let lastEol = void 0;
      edits = edits.slice(0).sort((a, b) => {
        if (a.range && b.range) {
          return Range.compareRangesUsingStarts(a.range, b.range);
        }
        const aRng = a.range ? 0 : 1;
        const bRng = b.range ? 0 : 1;
        return aRng - bRng;
      });
      for (let { range: range2, text, eol } of edits) {
        if (typeof eol === "number") {
          lastEol = eol;
        }
        if (Range.isEmpty(range2) && !text) {
          continue;
        }
        const original = model.getValueInRange(range2);
        text = text.replace(/\r\n|\n|\r/g, model.eol);
        if (original === text) {
          continue;
        }
        if (Math.max(text.length, original.length) > EditorSimpleWorker._diffLimit) {
          result.push({ range: range2, text });
          continue;
        }
        const changes = stringDiff(original, text, false);
        const editOffset = model.offsetAt(Range.lift(range2).getStartPosition());
        for (const change of changes) {
          const start = model.positionAt(editOffset + change.originalStart);
          const end = model.positionAt(editOffset + change.originalStart + change.originalLength);
          const newEdit = {
            text: text.substr(change.modifiedStart, change.modifiedLength),
            range: { startLineNumber: start.lineNumber, startColumn: start.column, endLineNumber: end.lineNumber, endColumn: end.column }
          };
          if (model.getValueInRange(newEdit.range) !== newEdit.text) {
            result.push(newEdit);
          }
        }
      }
      if (typeof lastEol === "number") {
        result.push({ eol: lastEol, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } });
      }
      return result;
    });
  }
  computeLinks(modelUrl) {
    return __awaiter(this, void 0, void 0, function* () {
      const model = this._getModel(modelUrl);
      if (!model) {
        return null;
      }
      return computeLinks(model);
    });
  }
  textualSuggest(modelUrls, leadingWord, wordDef, wordDefFlags) {
    return __awaiter(this, void 0, void 0, function* () {
      const sw = new StopWatch(true);
      const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
      const seen = /* @__PURE__ */ new Set();
      outer:
        for (const url of modelUrls) {
          const model = this._getModel(url);
          if (!model) {
            continue;
          }
          for (const word of model.words(wordDefRegExp)) {
            if (word === leadingWord || !isNaN(Number(word))) {
              continue;
            }
            seen.add(word);
            if (seen.size > EditorSimpleWorker._suggestionsLimit) {
              break outer;
            }
          }
        }
      return { words: Array.from(seen), duration: sw.elapsed() };
    });
  }
  computeWordRanges(modelUrl, range2, wordDef, wordDefFlags) {
    return __awaiter(this, void 0, void 0, function* () {
      const model = this._getModel(modelUrl);
      if (!model) {
        return /* @__PURE__ */ Object.create(null);
      }
      const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
      const result = /* @__PURE__ */ Object.create(null);
      for (let line = range2.startLineNumber; line < range2.endLineNumber; line++) {
        const words = model.getLineWords(line, wordDefRegExp);
        for (const word of words) {
          if (!isNaN(Number(word.word))) {
            continue;
          }
          let array = result[word.word];
          if (!array) {
            array = [];
            result[word.word] = array;
          }
          array.push({
            startLineNumber: line,
            startColumn: word.startColumn,
            endLineNumber: line,
            endColumn: word.endColumn
          });
        }
      }
      return result;
    });
  }
  navigateValueSet(modelUrl, range2, up, wordDef, wordDefFlags) {
    return __awaiter(this, void 0, void 0, function* () {
      const model = this._getModel(modelUrl);
      if (!model) {
        return null;
      }
      const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
      if (range2.startColumn === range2.endColumn) {
        range2 = {
          startLineNumber: range2.startLineNumber,
          startColumn: range2.startColumn,
          endLineNumber: range2.endLineNumber,
          endColumn: range2.endColumn + 1
        };
      }
      const selectionText = model.getValueInRange(range2);
      const wordRange = model.getWordAtPosition({ lineNumber: range2.startLineNumber, column: range2.startColumn }, wordDefRegExp);
      if (!wordRange) {
        return null;
      }
      const word = model.getValueInRange(wordRange);
      const result = BasicInplaceReplace.INSTANCE.navigateValueSet(range2, selectionText, wordRange, word, up);
      return result;
    });
  }
  loadForeignModule(moduleId, createData, foreignHostMethods) {
    const proxyMethodRequest = (method, args) => {
      return this._host.fhr(method, args);
    };
    const foreignHost = createProxyObject(foreignHostMethods, proxyMethodRequest);
    const ctx = {
      host: foreignHost,
      getMirrorModels: () => {
        return this._getModels();
      }
    };
    if (this._foreignModuleFactory) {
      this._foreignModule = this._foreignModuleFactory(ctx, createData);
      return Promise.resolve(getAllMethodNames(this._foreignModule));
    }
    return Promise.reject(new Error(`Unexpected usage`));
  }
  fmr(method, args) {
    if (!this._foreignModule || typeof this._foreignModule[method] !== "function") {
      return Promise.reject(new Error("Missing requestHandler or method: " + method));
    }
    try {
      return Promise.resolve(this._foreignModule[method].apply(this._foreignModule, args));
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
EditorSimpleWorker._diffLimit = 1e5;
EditorSimpleWorker._suggestionsLimit = 1e4;
if (typeof importScripts === "function") {
  globals.monaco = createMonacoBaseAPI();
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/editorWorkerService.js
init_model2();
init_textResourceConfiguration();
init_strings();
init_arrays();
init_log();
init_stopwatch();
init_errors();
init_languageFeatures();
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var STOP_SYNC_MODEL_DELTA_TIME_MS = 60 * 1e3;
var STOP_WORKER_DELTA_TIME_MS = 5 * 60 * 1e3;
function canSyncModel(modelService, resource) {
  const model = modelService.getModel(resource);
  if (!model) {
    return false;
  }
  if (model.isTooLargeForSyncing()) {
    return false;
  }
  return true;
}
var EditorWorkerService = class EditorWorkerService2 extends Disposable {
  constructor(modelService, configurationService, logService, languageConfigurationService, languageFeaturesService) {
    super();
    this._modelService = modelService;
    this._workerManager = this._register(new WorkerManager(this._modelService, languageConfigurationService));
    this._logService = logService;
    this._register(languageFeaturesService.linkProvider.register({ language: "*", hasAccessToAllModels: true }, {
      provideLinks: (model, token) => {
        if (!canSyncModel(this._modelService, model.uri)) {
          return Promise.resolve({ links: [] });
        }
        return this._workerManager.withWorker().then((client) => client.computeLinks(model.uri)).then((links) => {
          return links && { links };
        });
      }
    }));
    this._register(languageFeaturesService.completionProvider.register("*", new WordBasedCompletionItemProvider(this._workerManager, configurationService, this._modelService, languageConfigurationService)));
  }
  dispose() {
    super.dispose();
  }
  canComputeUnicodeHighlights(uri) {
    return canSyncModel(this._modelService, uri);
  }
  computedUnicodeHighlights(uri, options, range2) {
    return this._workerManager.withWorker().then((client) => client.computedUnicodeHighlights(uri, options, range2));
  }
  computeDiff(original, modified, ignoreTrimWhitespace, maxComputationTime) {
    return this._workerManager.withWorker().then((client) => client.computeDiff(original, modified, ignoreTrimWhitespace, maxComputationTime));
  }
  computeMoreMinimalEdits(resource, edits) {
    if (isNonEmptyArray(edits)) {
      if (!canSyncModel(this._modelService, resource)) {
        return Promise.resolve(edits);
      }
      const sw = StopWatch.create(true);
      const result = this._workerManager.withWorker().then((client) => client.computeMoreMinimalEdits(resource, edits));
      result.finally(() => this._logService.trace("FORMAT#computeMoreMinimalEdits", resource.toString(true), sw.elapsed()));
      return Promise.race([result, timeout(1e3).then(() => edits)]);
    } else {
      return Promise.resolve(void 0);
    }
  }
  canNavigateValueSet(resource) {
    return canSyncModel(this._modelService, resource);
  }
  navigateValueSet(resource, range2, up) {
    return this._workerManager.withWorker().then((client) => client.navigateValueSet(resource, range2, up));
  }
  canComputeWordRanges(resource) {
    return canSyncModel(this._modelService, resource);
  }
  computeWordRanges(resource, range2) {
    return this._workerManager.withWorker().then((client) => client.computeWordRanges(resource, range2));
  }
};
EditorWorkerService = __decorate([
  __param(0, IModelService),
  __param(1, ITextResourceConfigurationService),
  __param(2, ILogService),
  __param(3, ILanguageConfigurationService),
  __param(4, ILanguageFeaturesService)
], EditorWorkerService);
var WordBasedCompletionItemProvider = class {
  constructor(workerManager, configurationService, modelService, languageConfigurationService) {
    this.languageConfigurationService = languageConfigurationService;
    this._debugDisplayName = "wordbasedCompletions";
    this._workerManager = workerManager;
    this._configurationService = configurationService;
    this._modelService = modelService;
  }
  provideCompletionItems(model, position) {
    return __awaiter2(this, void 0, void 0, function* () {
      const config = this._configurationService.getValue(model.uri, position, "editor");
      if (!config.wordBasedSuggestions) {
        return void 0;
      }
      const models = [];
      if (config.wordBasedSuggestionsMode === "currentDocument") {
        if (canSyncModel(this._modelService, model.uri)) {
          models.push(model.uri);
        }
      } else {
        for (const candidate of this._modelService.getModels()) {
          if (!canSyncModel(this._modelService, candidate.uri)) {
            continue;
          }
          if (candidate === model) {
            models.unshift(candidate.uri);
          } else if (config.wordBasedSuggestionsMode === "allDocuments" || candidate.getLanguageId() === model.getLanguageId()) {
            models.push(candidate.uri);
          }
        }
      }
      if (models.length === 0) {
        return void 0;
      }
      const wordDefRegExp = this.languageConfigurationService.getLanguageConfiguration(model.getLanguageId()).getWordDefinition();
      const word = model.getWordAtPosition(position);
      const replace = !word ? Range.fromPositions(position) : new Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);
      const insert = replace.setEndPosition(position.lineNumber, position.column);
      const client = yield this._workerManager.withWorker();
      const data = yield client.textualSuggest(models, word === null || word === void 0 ? void 0 : word.word, wordDefRegExp);
      if (!data) {
        return void 0;
      }
      return {
        duration: data.duration,
        suggestions: data.words.map((word2) => {
          return {
            kind: 18,
            label: word2,
            insertText: word2,
            range: { insert, replace }
          };
        })
      };
    });
  }
};
var WorkerManager = class extends Disposable {
  constructor(modelService, languageConfigurationService) {
    super();
    this.languageConfigurationService = languageConfigurationService;
    this._modelService = modelService;
    this._editorWorkerClient = null;
    this._lastWorkerUsedTime = new Date().getTime();
    const stopWorkerInterval = this._register(new IntervalTimer());
    stopWorkerInterval.cancelAndSet(() => this._checkStopIdleWorker(), Math.round(STOP_WORKER_DELTA_TIME_MS / 2));
    this._register(this._modelService.onModelRemoved((_) => this._checkStopEmptyWorker()));
  }
  dispose() {
    if (this._editorWorkerClient) {
      this._editorWorkerClient.dispose();
      this._editorWorkerClient = null;
    }
    super.dispose();
  }
  _checkStopEmptyWorker() {
    if (!this._editorWorkerClient) {
      return;
    }
    const models = this._modelService.getModels();
    if (models.length === 0) {
      this._editorWorkerClient.dispose();
      this._editorWorkerClient = null;
    }
  }
  _checkStopIdleWorker() {
    if (!this._editorWorkerClient) {
      return;
    }
    const timeSinceLastWorkerUsedTime = new Date().getTime() - this._lastWorkerUsedTime;
    if (timeSinceLastWorkerUsedTime > STOP_WORKER_DELTA_TIME_MS) {
      this._editorWorkerClient.dispose();
      this._editorWorkerClient = null;
    }
  }
  withWorker() {
    this._lastWorkerUsedTime = new Date().getTime();
    if (!this._editorWorkerClient) {
      this._editorWorkerClient = new EditorWorkerClient(this._modelService, false, "editorWorkerService", this.languageConfigurationService);
    }
    return Promise.resolve(this._editorWorkerClient);
  }
};
var EditorModelManager = class extends Disposable {
  constructor(proxy, modelService, keepIdleModels) {
    super();
    this._syncedModels = /* @__PURE__ */ Object.create(null);
    this._syncedModelsLastUsedTime = /* @__PURE__ */ Object.create(null);
    this._proxy = proxy;
    this._modelService = modelService;
    if (!keepIdleModels) {
      const timer = new IntervalTimer();
      timer.cancelAndSet(() => this._checkStopModelSync(), Math.round(STOP_SYNC_MODEL_DELTA_TIME_MS / 2));
      this._register(timer);
    }
  }
  dispose() {
    for (const modelUrl in this._syncedModels) {
      dispose(this._syncedModels[modelUrl]);
    }
    this._syncedModels = /* @__PURE__ */ Object.create(null);
    this._syncedModelsLastUsedTime = /* @__PURE__ */ Object.create(null);
    super.dispose();
  }
  ensureSyncedResources(resources, forceLargeModels) {
    for (const resource of resources) {
      const resourceStr = resource.toString();
      if (!this._syncedModels[resourceStr]) {
        this._beginModelSync(resource, forceLargeModels);
      }
      if (this._syncedModels[resourceStr]) {
        this._syncedModelsLastUsedTime[resourceStr] = new Date().getTime();
      }
    }
  }
  _checkStopModelSync() {
    const currentTime = new Date().getTime();
    const toRemove = [];
    for (const modelUrl in this._syncedModelsLastUsedTime) {
      const elapsedTime = currentTime - this._syncedModelsLastUsedTime[modelUrl];
      if (elapsedTime > STOP_SYNC_MODEL_DELTA_TIME_MS) {
        toRemove.push(modelUrl);
      }
    }
    for (const e of toRemove) {
      this._stopModelSync(e);
    }
  }
  _beginModelSync(resource, forceLargeModels) {
    const model = this._modelService.getModel(resource);
    if (!model) {
      return;
    }
    if (!forceLargeModels && model.isTooLargeForSyncing()) {
      return;
    }
    const modelUrl = resource.toString();
    this._proxy.acceptNewModel({
      url: model.uri.toString(),
      lines: model.getLinesContent(),
      EOL: model.getEOL(),
      versionId: model.getVersionId()
    });
    const toDispose = new DisposableStore();
    toDispose.add(model.onDidChangeContent((e) => {
      this._proxy.acceptModelChanged(modelUrl.toString(), e);
    }));
    toDispose.add(model.onWillDispose(() => {
      this._stopModelSync(modelUrl);
    }));
    toDispose.add(toDisposable(() => {
      this._proxy.acceptRemovedModel(modelUrl);
    }));
    this._syncedModels[modelUrl] = toDispose;
  }
  _stopModelSync(modelUrl) {
    const toDispose = this._syncedModels[modelUrl];
    delete this._syncedModels[modelUrl];
    delete this._syncedModelsLastUsedTime[modelUrl];
    dispose(toDispose);
  }
};
var SynchronousWorkerClient = class {
  constructor(instance) {
    this._instance = instance;
    this._proxyObj = Promise.resolve(this._instance);
  }
  dispose() {
    this._instance.dispose();
  }
  getProxyObject() {
    return this._proxyObj;
  }
};
var EditorWorkerHost = class {
  constructor(workerClient) {
    this._workerClient = workerClient;
  }
  fhr(method, args) {
    return this._workerClient.fhr(method, args);
  }
};
var EditorWorkerClient = class extends Disposable {
  constructor(modelService, keepIdleModels, label, languageConfigurationService) {
    super();
    this.languageConfigurationService = languageConfigurationService;
    this._disposed = false;
    this._modelService = modelService;
    this._keepIdleModels = keepIdleModels;
    this._workerFactory = new DefaultWorkerFactory(label);
    this._worker = null;
    this._modelManager = null;
  }
  fhr(method, args) {
    throw new Error(`Not implemented!`);
  }
  _getOrCreateWorker() {
    if (!this._worker) {
      try {
        this._worker = this._register(new SimpleWorkerClient(this._workerFactory, "vs/editor/common/services/editorSimpleWorker", new EditorWorkerHost(this)));
      } catch (err) {
        logOnceWebWorkerWarning(err);
        this._worker = new SynchronousWorkerClient(new EditorSimpleWorker(new EditorWorkerHost(this), null));
      }
    }
    return this._worker;
  }
  _getProxy() {
    return this._getOrCreateWorker().getProxyObject().then(void 0, (err) => {
      logOnceWebWorkerWarning(err);
      this._worker = new SynchronousWorkerClient(new EditorSimpleWorker(new EditorWorkerHost(this), null));
      return this._getOrCreateWorker().getProxyObject();
    });
  }
  _getOrCreateModelManager(proxy) {
    if (!this._modelManager) {
      this._modelManager = this._register(new EditorModelManager(proxy, this._modelService, this._keepIdleModels));
    }
    return this._modelManager;
  }
  _withSyncedResources(resources, forceLargeModels = false) {
    return __awaiter2(this, void 0, void 0, function* () {
      if (this._disposed) {
        return Promise.reject(canceled());
      }
      return this._getProxy().then((proxy) => {
        this._getOrCreateModelManager(proxy).ensureSyncedResources(resources, forceLargeModels);
        return proxy;
      });
    });
  }
  computedUnicodeHighlights(uri, options, range2) {
    return this._withSyncedResources([uri]).then((proxy) => {
      return proxy.computeUnicodeHighlights(uri.toString(), options, range2);
    });
  }
  computeDiff(original, modified, ignoreTrimWhitespace, maxComputationTime) {
    return this._withSyncedResources([original, modified], true).then((proxy) => {
      return proxy.computeDiff(original.toString(), modified.toString(), ignoreTrimWhitespace, maxComputationTime);
    });
  }
  computeMoreMinimalEdits(resource, edits) {
    return this._withSyncedResources([resource]).then((proxy) => {
      return proxy.computeMoreMinimalEdits(resource.toString(), edits);
    });
  }
  computeLinks(resource) {
    return this._withSyncedResources([resource]).then((proxy) => {
      return proxy.computeLinks(resource.toString());
    });
  }
  textualSuggest(resources, leadingWord, wordDefRegExp) {
    return __awaiter2(this, void 0, void 0, function* () {
      const proxy = yield this._withSyncedResources(resources);
      const wordDef = wordDefRegExp.source;
      const wordDefFlags = regExpFlags(wordDefRegExp);
      return proxy.textualSuggest(resources.map((r) => r.toString()), leadingWord, wordDef, wordDefFlags);
    });
  }
  computeWordRanges(resource, range2) {
    return this._withSyncedResources([resource]).then((proxy) => {
      const model = this._modelService.getModel(resource);
      if (!model) {
        return Promise.resolve(null);
      }
      const wordDefRegExp = this.languageConfigurationService.getLanguageConfiguration(model.getLanguageId()).getWordDefinition();
      const wordDef = wordDefRegExp.source;
      const wordDefFlags = regExpFlags(wordDefRegExp);
      return proxy.computeWordRanges(resource.toString(), range2, wordDef, wordDefFlags);
    });
  }
  navigateValueSet(resource, range2, up) {
    return this._withSyncedResources([resource]).then((proxy) => {
      const model = this._modelService.getModel(resource);
      if (!model) {
        return null;
      }
      const wordDefRegExp = this.languageConfigurationService.getLanguageConfiguration(model.getLanguageId()).getWordDefinition();
      const wordDef = wordDefRegExp.source;
      const wordDefFlags = regExpFlags(wordDefRegExp);
      return proxy.navigateValueSet(resource.toString(), range2, up, wordDef, wordDefFlags);
    });
  }
  dispose() {
    super.dispose();
    this._disposed = true;
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/webWorker.js
init_types();
function createWebWorker(modelService, languageConfigurationService, opts) {
  return new MonacoWebWorkerImpl(modelService, languageConfigurationService, opts);
}
var MonacoWebWorkerImpl = class extends EditorWorkerClient {
  constructor(modelService, languageConfigurationService, opts) {
    super(modelService, opts.keepIdleModels || false, opts.label, languageConfigurationService);
    this._foreignModuleId = opts.moduleId;
    this._foreignModuleCreateData = opts.createData || null;
    this._foreignModuleHost = opts.host || null;
    this._foreignProxy = null;
  }
  fhr(method, args) {
    if (!this._foreignModuleHost || typeof this._foreignModuleHost[method] !== "function") {
      return Promise.reject(new Error("Missing method " + method + " or missing main thread foreign host."));
    }
    try {
      return Promise.resolve(this._foreignModuleHost[method].apply(this._foreignModuleHost, args));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  _getForeignProxy() {
    if (!this._foreignProxy) {
      this._foreignProxy = this._getProxy().then((proxy) => {
        const foreignHostMethods = this._foreignModuleHost ? getAllMethodNames(this._foreignModuleHost) : [];
        return proxy.loadForeignModule(this._foreignModuleId, this._foreignModuleCreateData, foreignHostMethods).then((foreignMethods) => {
          this._foreignModuleCreateData = null;
          const proxyMethodRequest = (method, args) => {
            return proxy.fmr(method, args);
          };
          const createProxyMethod = (method, proxyMethodRequest2) => {
            return function() {
              const args = Array.prototype.slice.call(arguments, 0);
              return proxyMethodRequest2(method, args);
            };
          };
          const foreignProxy = {};
          for (const foreignMethod of foreignMethods) {
            foreignProxy[foreignMethod] = createProxyMethod(foreignMethod, proxyMethodRequest);
          }
          return foreignProxy;
        });
      });
    }
    return this._foreignProxy;
  }
  getProxy() {
    return this._getForeignProxy();
  }
  withSyncedResources(resources) {
    return this._withSyncedResources(resources).then((_) => this.getProxy());
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/colorizer.js
init_define_process();
init_strings();
init_lineTokens();
init_languages();
init_viewLineRenderer();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/common/monarch/monarchLexer.js
init_define_process();
init_languages();
init_nullTokenize();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/common/monarch/monarchCommon.js
init_define_process();
function isFuzzyActionArr(what) {
  return Array.isArray(what);
}
function isFuzzyAction(what) {
  return !isFuzzyActionArr(what);
}
function isString(what) {
  return typeof what === "string";
}
function isIAction(what) {
  return !isString(what);
}
function empty(s) {
  return s ? false : true;
}
function fixCase(lexer, str) {
  return lexer.ignoreCase && str ? str.toLowerCase() : str;
}
function sanitize(s) {
  return s.replace(/[&<>'"_]/g, "-");
}
function log(lexer, msg) {
  console.log(`${lexer.languageId}: ${msg}`);
}
function createError(lexer, msg) {
  return new Error(`${lexer.languageId}: ${msg}`);
}
function substituteMatches(lexer, str, id, matches, state) {
  const re = /\$((\$)|(#)|(\d\d?)|[sS](\d\d?)|@(\w+))/g;
  let stateMatches = null;
  return str.replace(re, function(full, sub, dollar, hash, n, s, attr, ofs, total) {
    if (!empty(dollar)) {
      return "$";
    }
    if (!empty(hash)) {
      return fixCase(lexer, id);
    }
    if (!empty(n) && n < matches.length) {
      return fixCase(lexer, matches[n]);
    }
    if (!empty(attr) && lexer && typeof lexer[attr] === "string") {
      return lexer[attr];
    }
    if (stateMatches === null) {
      stateMatches = state.split(".");
      stateMatches.unshift(state);
    }
    if (!empty(s) && s < stateMatches.length) {
      return fixCase(lexer, stateMatches[s]);
    }
    return "";
  });
}
function findRules(lexer, inState) {
  let state = inState;
  while (state && state.length > 0) {
    const rules = lexer.tokenizer[state];
    if (rules) {
      return rules;
    }
    const idx = state.lastIndexOf(".");
    if (idx < 0) {
      state = null;
    } else {
      state = state.substr(0, idx);
    }
  }
  return null;
}
function stateExists(lexer, inState) {
  let state = inState;
  while (state && state.length > 0) {
    const exist = lexer.stateNames[state];
    if (exist) {
      return true;
    }
    const idx = state.lastIndexOf(".");
    if (idx < 0) {
      state = null;
    } else {
      state = state.substr(0, idx);
    }
  }
  return false;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/common/monarch/monarchLexer.js
init_configuration();
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param2 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CACHE_STACK_DEPTH = 5;
var MonarchStackElementFactory = class {
  constructor(maxCacheDepth) {
    this._maxCacheDepth = maxCacheDepth;
    this._entries = /* @__PURE__ */ Object.create(null);
  }
  static create(parent, state) {
    return this._INSTANCE.create(parent, state);
  }
  create(parent, state) {
    if (parent !== null && parent.depth >= this._maxCacheDepth) {
      return new MonarchStackElement(parent, state);
    }
    let stackElementId = MonarchStackElement.getStackElementId(parent);
    if (stackElementId.length > 0) {
      stackElementId += "|";
    }
    stackElementId += state;
    let result = this._entries[stackElementId];
    if (result) {
      return result;
    }
    result = new MonarchStackElement(parent, state);
    this._entries[stackElementId] = result;
    return result;
  }
};
MonarchStackElementFactory._INSTANCE = new MonarchStackElementFactory(CACHE_STACK_DEPTH);
var MonarchStackElement = class {
  constructor(parent, state) {
    this.parent = parent;
    this.state = state;
    this.depth = (this.parent ? this.parent.depth : 0) + 1;
  }
  static getStackElementId(element) {
    let result = "";
    while (element !== null) {
      if (result.length > 0) {
        result += "|";
      }
      result += element.state;
      element = element.parent;
    }
    return result;
  }
  static _equals(a, b) {
    while (a !== null && b !== null) {
      if (a === b) {
        return true;
      }
      if (a.state !== b.state) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    }
    if (a === null && b === null) {
      return true;
    }
    return false;
  }
  equals(other) {
    return MonarchStackElement._equals(this, other);
  }
  push(state) {
    return MonarchStackElementFactory.create(this, state);
  }
  pop() {
    return this.parent;
  }
  popall() {
    let result = this;
    while (result.parent) {
      result = result.parent;
    }
    return result;
  }
  switchTo(state) {
    return MonarchStackElementFactory.create(this.parent, state);
  }
};
var EmbeddedLanguageData = class {
  constructor(languageId, state) {
    this.languageId = languageId;
    this.state = state;
  }
  equals(other) {
    return this.languageId === other.languageId && this.state.equals(other.state);
  }
  clone() {
    const stateClone = this.state.clone();
    if (stateClone === this.state) {
      return this;
    }
    return new EmbeddedLanguageData(this.languageId, this.state);
  }
};
var MonarchLineStateFactory = class {
  constructor(maxCacheDepth) {
    this._maxCacheDepth = maxCacheDepth;
    this._entries = /* @__PURE__ */ Object.create(null);
  }
  static create(stack, embeddedLanguageData) {
    return this._INSTANCE.create(stack, embeddedLanguageData);
  }
  create(stack, embeddedLanguageData) {
    if (embeddedLanguageData !== null) {
      return new MonarchLineState(stack, embeddedLanguageData);
    }
    if (stack !== null && stack.depth >= this._maxCacheDepth) {
      return new MonarchLineState(stack, embeddedLanguageData);
    }
    const stackElementId = MonarchStackElement.getStackElementId(stack);
    let result = this._entries[stackElementId];
    if (result) {
      return result;
    }
    result = new MonarchLineState(stack, null);
    this._entries[stackElementId] = result;
    return result;
  }
};
MonarchLineStateFactory._INSTANCE = new MonarchLineStateFactory(CACHE_STACK_DEPTH);
var MonarchLineState = class {
  constructor(stack, embeddedLanguageData) {
    this.stack = stack;
    this.embeddedLanguageData = embeddedLanguageData;
  }
  clone() {
    const embeddedlanguageDataClone = this.embeddedLanguageData ? this.embeddedLanguageData.clone() : null;
    if (embeddedlanguageDataClone === this.embeddedLanguageData) {
      return this;
    }
    return MonarchLineStateFactory.create(this.stack, this.embeddedLanguageData);
  }
  equals(other) {
    if (!(other instanceof MonarchLineState)) {
      return false;
    }
    if (!this.stack.equals(other.stack)) {
      return false;
    }
    if (this.embeddedLanguageData === null && other.embeddedLanguageData === null) {
      return true;
    }
    if (this.embeddedLanguageData === null || other.embeddedLanguageData === null) {
      return false;
    }
    return this.embeddedLanguageData.equals(other.embeddedLanguageData);
  }
};
var MonarchClassicTokensCollector = class {
  constructor() {
    this._tokens = [];
    this._languageId = null;
    this._lastTokenType = null;
    this._lastTokenLanguage = null;
  }
  enterLanguage(languageId) {
    this._languageId = languageId;
  }
  emit(startOffset, type) {
    if (this._lastTokenType === type && this._lastTokenLanguage === this._languageId) {
      return;
    }
    this._lastTokenType = type;
    this._lastTokenLanguage = this._languageId;
    this._tokens.push(new Token(startOffset, type, this._languageId));
  }
  nestedLanguageTokenize(embeddedLanguageLine, hasEOL, embeddedLanguageData, offsetDelta) {
    const nestedLanguageId = embeddedLanguageData.languageId;
    const embeddedModeState = embeddedLanguageData.state;
    const nestedLanguageTokenizationSupport = TokenizationRegistry.get(nestedLanguageId);
    if (!nestedLanguageTokenizationSupport) {
      this.enterLanguage(nestedLanguageId);
      this.emit(offsetDelta, "");
      return embeddedModeState;
    }
    const nestedResult = nestedLanguageTokenizationSupport.tokenize(embeddedLanguageLine, hasEOL, embeddedModeState);
    if (offsetDelta !== 0) {
      for (const token of nestedResult.tokens) {
        this._tokens.push(new Token(token.offset + offsetDelta, token.type, token.language));
      }
    } else {
      this._tokens = this._tokens.concat(nestedResult.tokens);
    }
    this._lastTokenType = null;
    this._lastTokenLanguage = null;
    this._languageId = null;
    return nestedResult.endState;
  }
  finalize(endState) {
    return new TokenizationResult(this._tokens, endState);
  }
};
var MonarchModernTokensCollector = class {
  constructor(languageService, theme) {
    this._languageService = languageService;
    this._theme = theme;
    this._prependTokens = null;
    this._tokens = [];
    this._currentLanguageId = 0;
    this._lastTokenMetadata = 0;
  }
  enterLanguage(languageId) {
    this._currentLanguageId = this._languageService.languageIdCodec.encodeLanguageId(languageId);
  }
  emit(startOffset, type) {
    const metadata = this._theme.match(this._currentLanguageId, type);
    if (this._lastTokenMetadata === metadata) {
      return;
    }
    this._lastTokenMetadata = metadata;
    this._tokens.push(startOffset);
    this._tokens.push(metadata);
  }
  static _merge(a, b, c) {
    const aLen = a !== null ? a.length : 0;
    const bLen = b.length;
    const cLen = c !== null ? c.length : 0;
    if (aLen === 0 && bLen === 0 && cLen === 0) {
      return new Uint32Array(0);
    }
    if (aLen === 0 && bLen === 0) {
      return c;
    }
    if (bLen === 0 && cLen === 0) {
      return a;
    }
    const result = new Uint32Array(aLen + bLen + cLen);
    if (a !== null) {
      result.set(a);
    }
    for (let i = 0; i < bLen; i++) {
      result[aLen + i] = b[i];
    }
    if (c !== null) {
      result.set(c, aLen + bLen);
    }
    return result;
  }
  nestedLanguageTokenize(embeddedLanguageLine, hasEOL, embeddedLanguageData, offsetDelta) {
    const nestedLanguageId = embeddedLanguageData.languageId;
    const embeddedModeState = embeddedLanguageData.state;
    const nestedLanguageTokenizationSupport = TokenizationRegistry.get(nestedLanguageId);
    if (!nestedLanguageTokenizationSupport) {
      this.enterLanguage(nestedLanguageId);
      this.emit(offsetDelta, "");
      return embeddedModeState;
    }
    const nestedResult = nestedLanguageTokenizationSupport.tokenizeEncoded(embeddedLanguageLine, hasEOL, embeddedModeState);
    if (offsetDelta !== 0) {
      for (let i = 0, len = nestedResult.tokens.length; i < len; i += 2) {
        nestedResult.tokens[i] += offsetDelta;
      }
    }
    this._prependTokens = MonarchModernTokensCollector._merge(this._prependTokens, this._tokens, nestedResult.tokens);
    this._tokens = [];
    this._currentLanguageId = 0;
    this._lastTokenMetadata = 0;
    return nestedResult.endState;
  }
  finalize(endState) {
    return new EncodedTokenizationResult(MonarchModernTokensCollector._merge(this._prependTokens, this._tokens, null), endState);
  }
};
var MonarchTokenizer = class MonarchTokenizer2 {
  constructor(languageService, standaloneThemeService, languageId, lexer, _configurationService) {
    this._configurationService = _configurationService;
    this._languageService = languageService;
    this._standaloneThemeService = standaloneThemeService;
    this._languageId = languageId;
    this._lexer = lexer;
    this._embeddedLanguages = /* @__PURE__ */ Object.create(null);
    this.embeddedLoaded = Promise.resolve(void 0);
    let emitting = false;
    this._tokenizationRegistryListener = TokenizationRegistry.onDidChange((e) => {
      if (emitting) {
        return;
      }
      let isOneOfMyEmbeddedModes = false;
      for (let i = 0, len = e.changedLanguages.length; i < len; i++) {
        const language = e.changedLanguages[i];
        if (this._embeddedLanguages[language]) {
          isOneOfMyEmbeddedModes = true;
          break;
        }
      }
      if (isOneOfMyEmbeddedModes) {
        emitting = true;
        TokenizationRegistry.fire([this._languageId]);
        emitting = false;
      }
    });
    this._maxTokenizationLineLength = this._configurationService.getValue("editor.maxTokenizationLineLength", {
      overrideIdentifier: this._languageId
    });
    this._configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("editor.maxTokenizationLineLength")) {
        this._maxTokenizationLineLength = this._configurationService.getValue("editor.maxTokenizationLineLength", {
          overrideIdentifier: this._languageId
        });
      }
    });
  }
  dispose() {
    this._tokenizationRegistryListener.dispose();
  }
  getLoadStatus() {
    const promises = [];
    for (const nestedLanguageId in this._embeddedLanguages) {
      const tokenizationSupport = TokenizationRegistry.get(nestedLanguageId);
      if (tokenizationSupport) {
        if (tokenizationSupport instanceof MonarchTokenizer2) {
          const nestedModeStatus = tokenizationSupport.getLoadStatus();
          if (nestedModeStatus.loaded === false) {
            promises.push(nestedModeStatus.promise);
          }
        }
        continue;
      }
      if (!TokenizationRegistry.isResolved(nestedLanguageId)) {
        promises.push(TokenizationRegistry.getOrCreate(nestedLanguageId));
      }
    }
    if (promises.length === 0) {
      return {
        loaded: true
      };
    }
    return {
      loaded: false,
      promise: Promise.all(promises).then((_) => void 0)
    };
  }
  getInitialState() {
    const rootState = MonarchStackElementFactory.create(null, this._lexer.start);
    return MonarchLineStateFactory.create(rootState, null);
  }
  tokenize(line, hasEOL, lineState) {
    if (line.length >= this._maxTokenizationLineLength) {
      return nullTokenize(this._languageId, lineState);
    }
    const tokensCollector = new MonarchClassicTokensCollector();
    const endLineState = this._tokenize(line, hasEOL, lineState, tokensCollector);
    return tokensCollector.finalize(endLineState);
  }
  tokenizeEncoded(line, hasEOL, lineState) {
    if (line.length >= this._maxTokenizationLineLength) {
      return nullTokenizeEncoded(this._languageService.languageIdCodec.encodeLanguageId(this._languageId), lineState);
    }
    const tokensCollector = new MonarchModernTokensCollector(this._languageService, this._standaloneThemeService.getColorTheme().tokenTheme);
    const endLineState = this._tokenize(line, hasEOL, lineState, tokensCollector);
    return tokensCollector.finalize(endLineState);
  }
  _tokenize(line, hasEOL, lineState, collector) {
    if (lineState.embeddedLanguageData) {
      return this._nestedTokenize(line, hasEOL, lineState, 0, collector);
    } else {
      return this._myTokenize(line, hasEOL, lineState, 0, collector);
    }
  }
  _findLeavingNestedLanguageOffset(line, state) {
    let rules = this._lexer.tokenizer[state.stack.state];
    if (!rules) {
      rules = findRules(this._lexer, state.stack.state);
      if (!rules) {
        throw createError(this._lexer, "tokenizer state is not defined: " + state.stack.state);
      }
    }
    let popOffset = -1;
    let hasEmbeddedPopRule = false;
    for (const rule of rules) {
      if (!isIAction(rule.action) || rule.action.nextEmbedded !== "@pop") {
        continue;
      }
      hasEmbeddedPopRule = true;
      let regex = rule.regex;
      const regexSource = rule.regex.source;
      if (regexSource.substr(0, 4) === "^(?:" && regexSource.substr(regexSource.length - 1, 1) === ")") {
        const flags = (regex.ignoreCase ? "i" : "") + (regex.unicode ? "u" : "");
        regex = new RegExp(regexSource.substr(4, regexSource.length - 5), flags);
      }
      const result = line.search(regex);
      if (result === -1 || result !== 0 && rule.matchOnlyAtLineStart) {
        continue;
      }
      if (popOffset === -1 || result < popOffset) {
        popOffset = result;
      }
    }
    if (!hasEmbeddedPopRule) {
      throw createError(this._lexer, 'no rule containing nextEmbedded: "@pop" in tokenizer embedded state: ' + state.stack.state);
    }
    return popOffset;
  }
  _nestedTokenize(line, hasEOL, lineState, offsetDelta, tokensCollector) {
    const popOffset = this._findLeavingNestedLanguageOffset(line, lineState);
    if (popOffset === -1) {
      const nestedEndState = tokensCollector.nestedLanguageTokenize(line, hasEOL, lineState.embeddedLanguageData, offsetDelta);
      return MonarchLineStateFactory.create(lineState.stack, new EmbeddedLanguageData(lineState.embeddedLanguageData.languageId, nestedEndState));
    }
    const nestedLanguageLine = line.substring(0, popOffset);
    if (nestedLanguageLine.length > 0) {
      tokensCollector.nestedLanguageTokenize(nestedLanguageLine, false, lineState.embeddedLanguageData, offsetDelta);
    }
    const restOfTheLine = line.substring(popOffset);
    return this._myTokenize(restOfTheLine, hasEOL, lineState, offsetDelta + popOffset, tokensCollector);
  }
  _safeRuleName(rule) {
    if (rule) {
      return rule.name;
    }
    return "(unknown)";
  }
  _myTokenize(lineWithoutLF, hasEOL, lineState, offsetDelta, tokensCollector) {
    tokensCollector.enterLanguage(this._languageId);
    const lineWithoutLFLength = lineWithoutLF.length;
    const line = hasEOL && this._lexer.includeLF ? lineWithoutLF + "\n" : lineWithoutLF;
    const lineLength = line.length;
    let embeddedLanguageData = lineState.embeddedLanguageData;
    let stack = lineState.stack;
    let pos = 0;
    let groupMatching = null;
    let forceEvaluation = true;
    while (forceEvaluation || pos < lineLength) {
      const pos0 = pos;
      const stackLen0 = stack.depth;
      const groupLen0 = groupMatching ? groupMatching.groups.length : 0;
      const state = stack.state;
      let matches = null;
      let matched = null;
      let action = null;
      let rule = null;
      let enteringEmbeddedLanguage = null;
      if (groupMatching) {
        matches = groupMatching.matches;
        const groupEntry = groupMatching.groups.shift();
        matched = groupEntry.matched;
        action = groupEntry.action;
        rule = groupMatching.rule;
        if (groupMatching.groups.length === 0) {
          groupMatching = null;
        }
      } else {
        if (!forceEvaluation && pos >= lineLength) {
          break;
        }
        forceEvaluation = false;
        let rules = this._lexer.tokenizer[state];
        if (!rules) {
          rules = findRules(this._lexer, state);
          if (!rules) {
            throw createError(this._lexer, "tokenizer state is not defined: " + state);
          }
        }
        const restOfLine = line.substr(pos);
        for (const rule2 of rules) {
          if (pos === 0 || !rule2.matchOnlyAtLineStart) {
            matches = restOfLine.match(rule2.regex);
            if (matches) {
              matched = matches[0];
              action = rule2.action;
              break;
            }
          }
        }
      }
      if (!matches) {
        matches = [""];
        matched = "";
      }
      if (!action) {
        if (pos < lineLength) {
          matches = [line.charAt(pos)];
          matched = matches[0];
        }
        action = this._lexer.defaultToken;
      }
      if (matched === null) {
        break;
      }
      pos += matched.length;
      while (isFuzzyAction(action) && isIAction(action) && action.test) {
        action = action.test(matched, matches, state, pos === lineLength);
      }
      let result = null;
      if (typeof action === "string" || Array.isArray(action)) {
        result = action;
      } else if (action.group) {
        result = action.group;
      } else if (action.token !== null && action.token !== void 0) {
        if (action.tokenSubst) {
          result = substituteMatches(this._lexer, action.token, matched, matches, state);
        } else {
          result = action.token;
        }
        if (action.nextEmbedded) {
          if (action.nextEmbedded === "@pop") {
            if (!embeddedLanguageData) {
              throw createError(this._lexer, "cannot pop embedded language if not inside one");
            }
            embeddedLanguageData = null;
          } else if (embeddedLanguageData) {
            throw createError(this._lexer, "cannot enter embedded language from within an embedded language");
          } else {
            enteringEmbeddedLanguage = substituteMatches(this._lexer, action.nextEmbedded, matched, matches, state);
          }
        }
        if (action.goBack) {
          pos = Math.max(0, pos - action.goBack);
        }
        if (action.switchTo && typeof action.switchTo === "string") {
          let nextState = substituteMatches(this._lexer, action.switchTo, matched, matches, state);
          if (nextState[0] === "@") {
            nextState = nextState.substr(1);
          }
          if (!findRules(this._lexer, nextState)) {
            throw createError(this._lexer, "trying to switch to a state '" + nextState + "' that is undefined in rule: " + this._safeRuleName(rule));
          } else {
            stack = stack.switchTo(nextState);
          }
        } else if (action.transform && typeof action.transform === "function") {
          throw createError(this._lexer, "action.transform not supported");
        } else if (action.next) {
          if (action.next === "@push") {
            if (stack.depth >= this._lexer.maxStack) {
              throw createError(this._lexer, "maximum tokenizer stack size reached: [" + stack.state + "," + stack.parent.state + ",...]");
            } else {
              stack = stack.push(state);
            }
          } else if (action.next === "@pop") {
            if (stack.depth <= 1) {
              throw createError(this._lexer, "trying to pop an empty stack in rule: " + this._safeRuleName(rule));
            } else {
              stack = stack.pop();
            }
          } else if (action.next === "@popall") {
            stack = stack.popall();
          } else {
            let nextState = substituteMatches(this._lexer, action.next, matched, matches, state);
            if (nextState[0] === "@") {
              nextState = nextState.substr(1);
            }
            if (!findRules(this._lexer, nextState)) {
              throw createError(this._lexer, "trying to set a next state '" + nextState + "' that is undefined in rule: " + this._safeRuleName(rule));
            } else {
              stack = stack.push(nextState);
            }
          }
        }
        if (action.log && typeof action.log === "string") {
          log(this._lexer, this._lexer.languageId + ": " + substituteMatches(this._lexer, action.log, matched, matches, state));
        }
      }
      if (result === null) {
        throw createError(this._lexer, "lexer rule has no well-defined action in rule: " + this._safeRuleName(rule));
      }
      const computeNewStateForEmbeddedLanguage = (enteringEmbeddedLanguage2) => {
        const languageId = this._languageService.getLanguageIdByLanguageName(enteringEmbeddedLanguage2) || this._languageService.getLanguageIdByMimeType(enteringEmbeddedLanguage2) || enteringEmbeddedLanguage2;
        const embeddedLanguageData2 = this._getNestedEmbeddedLanguageData(languageId);
        if (pos < lineLength) {
          const restOfLine = lineWithoutLF.substr(pos);
          return this._nestedTokenize(restOfLine, hasEOL, MonarchLineStateFactory.create(stack, embeddedLanguageData2), offsetDelta + pos, tokensCollector);
        } else {
          return MonarchLineStateFactory.create(stack, embeddedLanguageData2);
        }
      };
      if (Array.isArray(result)) {
        if (groupMatching && groupMatching.groups.length > 0) {
          throw createError(this._lexer, "groups cannot be nested: " + this._safeRuleName(rule));
        }
        if (matches.length !== result.length + 1) {
          throw createError(this._lexer, "matched number of groups does not match the number of actions in rule: " + this._safeRuleName(rule));
        }
        let totalLen = 0;
        for (let i = 1; i < matches.length; i++) {
          totalLen += matches[i].length;
        }
        if (totalLen !== matched.length) {
          throw createError(this._lexer, "with groups, all characters should be matched in consecutive groups in rule: " + this._safeRuleName(rule));
        }
        groupMatching = {
          rule,
          matches,
          groups: []
        };
        for (let i = 0; i < result.length; i++) {
          groupMatching.groups[i] = {
            action: result[i],
            matched: matches[i + 1]
          };
        }
        pos -= matched.length;
        continue;
      } else {
        if (result === "@rematch") {
          pos -= matched.length;
          matched = "";
          matches = null;
          result = "";
          if (enteringEmbeddedLanguage !== null) {
            return computeNewStateForEmbeddedLanguage(enteringEmbeddedLanguage);
          }
        }
        if (matched.length === 0) {
          if (lineLength === 0 || stackLen0 !== stack.depth || state !== stack.state || (!groupMatching ? 0 : groupMatching.groups.length) !== groupLen0) {
            continue;
          } else {
            throw createError(this._lexer, "no progress in tokenizer in rule: " + this._safeRuleName(rule));
          }
        }
        let tokenType = null;
        if (isString(result) && result.indexOf("@brackets") === 0) {
          const rest = result.substr("@brackets".length);
          const bracket = findBracket(this._lexer, matched);
          if (!bracket) {
            throw createError(this._lexer, "@brackets token returned but no bracket defined as: " + matched);
          }
          tokenType = sanitize(bracket.token + rest);
        } else {
          const token = result === "" ? "" : result + this._lexer.tokenPostfix;
          tokenType = sanitize(token);
        }
        if (pos0 < lineWithoutLFLength) {
          tokensCollector.emit(pos0 + offsetDelta, tokenType);
        }
      }
      if (enteringEmbeddedLanguage !== null) {
        return computeNewStateForEmbeddedLanguage(enteringEmbeddedLanguage);
      }
    }
    return MonarchLineStateFactory.create(stack, embeddedLanguageData);
  }
  _getNestedEmbeddedLanguageData(languageId) {
    if (!this._languageService.isRegisteredLanguageId(languageId)) {
      return new EmbeddedLanguageData(languageId, NullState);
    }
    if (languageId !== this._languageId) {
      TokenizationRegistry.getOrCreate(languageId);
      this._embeddedLanguages[languageId] = true;
    }
    const tokenizationSupport = TokenizationRegistry.get(languageId);
    if (tokenizationSupport) {
      return new EmbeddedLanguageData(languageId, tokenizationSupport.getInitialState());
    }
    return new EmbeddedLanguageData(languageId, NullState);
  }
};
MonarchTokenizer = __decorate2([
  __param2(4, IConfigurationService)
], MonarchTokenizer);
function findBracket(lexer, matched) {
  if (!matched) {
    return null;
  }
  matched = fixCase(lexer, matched);
  const brackets = lexer.brackets;
  for (const bracket of brackets) {
    if (bracket.open === matched) {
      return { token: bracket.token, bracketType: 1 };
    } else if (bracket.close === matched) {
      return { token: bracket.token, bracketType: -1 };
    }
  }
  return null;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/colorizer.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _a2;
var ttPolicy2 = (_a2 = window.trustedTypes) === null || _a2 === void 0 ? void 0 : _a2.createPolicy("standaloneColorizer", { createHTML: (value) => value });
var Colorizer = class {
  static colorizeElement(themeService, languageService, domNode, options) {
    options = options || {};
    const theme = options.theme || "vs";
    const mimeType = options.mimeType || domNode.getAttribute("lang") || domNode.getAttribute("data-lang");
    if (!mimeType) {
      console.error("Mode not detected");
      return Promise.resolve();
    }
    const languageId = languageService.getLanguageIdByMimeType(mimeType) || mimeType;
    themeService.setTheme(theme);
    const text = domNode.firstChild ? domNode.firstChild.nodeValue : "";
    domNode.className += " " + theme;
    const render = (str) => {
      var _a4;
      const trustedhtml = (_a4 = ttPolicy2 === null || ttPolicy2 === void 0 ? void 0 : ttPolicy2.createHTML(str)) !== null && _a4 !== void 0 ? _a4 : str;
      domNode.innerHTML = trustedhtml;
    };
    return this.colorize(languageService, text || "", languageId, options).then(render, (err) => console.error(err));
  }
  static colorize(languageService, text, languageId, options) {
    return __awaiter3(this, void 0, void 0, function* () {
      const languageIdCodec = languageService.languageIdCodec;
      let tabSize = 4;
      if (options && typeof options.tabSize === "number") {
        tabSize = options.tabSize;
      }
      if (startsWithUTF8BOM(text)) {
        text = text.substr(1);
      }
      const lines = splitLines(text);
      if (!languageService.isRegisteredLanguageId(languageId)) {
        return _fakeColorize(lines, tabSize, languageIdCodec);
      }
      const tokenizationSupport = yield TokenizationRegistry.getOrCreate(languageId);
      if (tokenizationSupport) {
        return _colorize(lines, tabSize, tokenizationSupport, languageIdCodec);
      }
      return _fakeColorize(lines, tabSize, languageIdCodec);
    });
  }
  static colorizeLine(line, mightContainNonBasicASCII, mightContainRTL, tokens, tabSize = 4) {
    const isBasicASCII = ViewLineRenderingData.isBasicASCII(line, mightContainNonBasicASCII);
    const containsRTL = ViewLineRenderingData.containsRTL(line, isBasicASCII, mightContainRTL);
    const renderResult = renderViewLine2(new RenderLineInput(false, true, line, false, isBasicASCII, containsRTL, 0, tokens, [], tabSize, 0, 0, 0, 0, -1, "none", false, false, null));
    return renderResult.html;
  }
  static colorizeModelLine(model, lineNumber, tabSize = 4) {
    const content = model.getLineContent(lineNumber);
    model.tokenization.forceTokenization(lineNumber);
    const tokens = model.tokenization.getLineTokens(lineNumber);
    const inflatedTokens = tokens.inflate();
    return this.colorizeLine(content, model.mightContainNonBasicASCII(), model.mightContainRTL(), inflatedTokens, tabSize);
  }
};
function _colorize(lines, tabSize, tokenizationSupport, languageIdCodec) {
  return new Promise((c, e) => {
    const execute = () => {
      const result = _actualColorize(lines, tabSize, tokenizationSupport, languageIdCodec);
      if (tokenizationSupport instanceof MonarchTokenizer) {
        const status = tokenizationSupport.getLoadStatus();
        if (status.loaded === false) {
          status.promise.then(execute, e);
          return;
        }
      }
      c(result);
    };
    execute();
  });
}
function _fakeColorize(lines, tabSize, languageIdCodec) {
  let html = [];
  const defaultMetadata = (0 << 11 | 1 << 15 | 2 << 24) >>> 0;
  const tokens = new Uint32Array(2);
  tokens[0] = 0;
  tokens[1] = defaultMetadata;
  for (let i = 0, length = lines.length; i < length; i++) {
    const line = lines[i];
    tokens[0] = line.length;
    const lineTokens = new LineTokens(tokens, line, languageIdCodec);
    const isBasicASCII = ViewLineRenderingData.isBasicASCII(line, true);
    const containsRTL = ViewLineRenderingData.containsRTL(line, isBasicASCII, true);
    const renderResult = renderViewLine2(new RenderLineInput(false, true, line, false, isBasicASCII, containsRTL, 0, lineTokens, [], tabSize, 0, 0, 0, 0, -1, "none", false, false, null));
    html = html.concat(renderResult.html);
    html.push("<br/>");
  }
  return html.join("");
}
function _actualColorize(lines, tabSize, tokenizationSupport, languageIdCodec) {
  let html = [];
  let state = tokenizationSupport.getInitialState();
  for (let i = 0, length = lines.length; i < length; i++) {
    const line = lines[i];
    const tokenizeResult = tokenizationSupport.tokenizeEncoded(line, true, state);
    LineTokens.convertToEndOffset(tokenizeResult.tokens, line.length);
    const lineTokens = new LineTokens(tokenizeResult.tokens, line, languageIdCodec);
    const isBasicASCII = ViewLineRenderingData.isBasicASCII(line, true);
    const containsRTL = ViewLineRenderingData.containsRTL(line, isBasicASCII, true);
    const renderResult = renderViewLine2(new RenderLineInput(false, true, line, false, isBasicASCII, containsRTL, 0, lineTokens.inflate(), [], tabSize, 0, 0, 0, 0, -1, "none", false, false, null));
    html = html.concat(renderResult.html);
    html.push("<br/>");
    state = tokenizeResult.endState;
  }
  return html.join("");
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeEditor.js
init_define_process();
init_aria();
init_lifecycle();
init_codeEditorService();
init_editorWorker();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_define_process();
init_languageConfigurationRegistry();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeEditorService.js
init_define_process();
init_dom();
init_network();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/abstractCodeEditorService.js
init_define_process();
init_event();
init_lifecycle();
init_linkedList();
init_themeService();
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param3 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var AbstractCodeEditorService = class AbstractCodeEditorService2 extends Disposable {
  constructor(_themeService) {
    super();
    this._themeService = _themeService;
    this._onCodeEditorAdd = this._register(new Emitter());
    this.onCodeEditorAdd = this._onCodeEditorAdd.event;
    this._onCodeEditorRemove = this._register(new Emitter());
    this.onCodeEditorRemove = this._onCodeEditorRemove.event;
    this._onDiffEditorAdd = this._register(new Emitter());
    this.onDiffEditorAdd = this._onDiffEditorAdd.event;
    this._onDiffEditorRemove = this._register(new Emitter());
    this.onDiffEditorRemove = this._onDiffEditorRemove.event;
    this._decorationOptionProviders = /* @__PURE__ */ new Map();
    this._codeEditorOpenHandlers = new LinkedList();
    this._modelProperties = /* @__PURE__ */ new Map();
    this._codeEditors = /* @__PURE__ */ Object.create(null);
    this._diffEditors = /* @__PURE__ */ Object.create(null);
    this._globalStyleSheet = null;
  }
  addCodeEditor(editor2) {
    this._codeEditors[editor2.getId()] = editor2;
    this._onCodeEditorAdd.fire(editor2);
  }
  removeCodeEditor(editor2) {
    if (delete this._codeEditors[editor2.getId()]) {
      this._onCodeEditorRemove.fire(editor2);
    }
  }
  listCodeEditors() {
    return Object.keys(this._codeEditors).map((id) => this._codeEditors[id]);
  }
  addDiffEditor(editor2) {
    this._diffEditors[editor2.getId()] = editor2;
    this._onDiffEditorAdd.fire(editor2);
  }
  removeDiffEditor(editor2) {
    if (delete this._diffEditors[editor2.getId()]) {
      this._onDiffEditorRemove.fire(editor2);
    }
  }
  listDiffEditors() {
    return Object.keys(this._diffEditors).map((id) => this._diffEditors[id]);
  }
  getFocusedCodeEditor() {
    let editorWithWidgetFocus = null;
    const editors = this.listCodeEditors();
    for (const editor2 of editors) {
      if (editor2.hasTextFocus()) {
        return editor2;
      }
      if (editor2.hasWidgetFocus()) {
        editorWithWidgetFocus = editor2;
      }
    }
    return editorWithWidgetFocus;
  }
  removeDecorationType(key) {
    const provider = this._decorationOptionProviders.get(key);
    if (provider) {
      provider.refCount--;
      if (provider.refCount <= 0) {
        this._decorationOptionProviders.delete(key);
        provider.dispose();
        this.listCodeEditors().forEach((ed) => ed.removeDecorationsByType(key));
      }
    }
  }
  setModelProperty(resource, key, value) {
    const key1 = resource.toString();
    let dest;
    if (this._modelProperties.has(key1)) {
      dest = this._modelProperties.get(key1);
    } else {
      dest = /* @__PURE__ */ new Map();
      this._modelProperties.set(key1, dest);
    }
    dest.set(key, value);
  }
  getModelProperty(resource, key) {
    const key1 = resource.toString();
    if (this._modelProperties.has(key1)) {
      const innerMap = this._modelProperties.get(key1);
      return innerMap.get(key);
    }
    return void 0;
  }
  openCodeEditor(input, source, sideBySide) {
    return __awaiter4(this, void 0, void 0, function* () {
      for (const handler of this._codeEditorOpenHandlers) {
        const candidate = yield handler(input, source, sideBySide);
        if (candidate !== null) {
          return candidate;
        }
      }
      return null;
    });
  }
  registerCodeEditorOpenHandler(handler) {
    const rm = this._codeEditorOpenHandlers.unshift(handler);
    return toDisposable(rm);
  }
};
AbstractCodeEditorService = __decorate3([
  __param3(0, IThemeService)
], AbstractCodeEditorService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeEditorService.js
init_codeEditorService();
init_contextkey();
init_extensions();
init_themeService();
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param4 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var StandaloneCodeEditorService = class StandaloneCodeEditorService2 extends AbstractCodeEditorService {
  constructor(contextKeyService, themeService) {
    super(themeService);
    this.onCodeEditorAdd(() => this._checkContextKey());
    this.onCodeEditorRemove(() => this._checkContextKey());
    this._editorIsOpen = contextKeyService.createKey("editorIsOpen", false);
    this._activeCodeEditor = null;
    this.registerCodeEditorOpenHandler((input, source, sideBySide) => __awaiter5(this, void 0, void 0, function* () {
      if (!source) {
        return null;
      }
      return this.doOpenEditor(source, input);
    }));
  }
  _checkContextKey() {
    let hasCodeEditor = false;
    for (const editor2 of this.listCodeEditors()) {
      if (!editor2.isSimpleWidget) {
        hasCodeEditor = true;
        break;
      }
    }
    this._editorIsOpen.set(hasCodeEditor);
  }
  setActiveCodeEditor(activeCodeEditor) {
    this._activeCodeEditor = activeCodeEditor;
  }
  getActiveCodeEditor() {
    return this._activeCodeEditor;
  }
  doOpenEditor(editor2, input) {
    const model = this.findModel(editor2, input.resource);
    if (!model) {
      if (input.resource) {
        const schema = input.resource.scheme;
        if (schema === Schemas.http || schema === Schemas.https) {
          windowOpenNoOpener(input.resource.toString());
          return editor2;
        }
      }
      return null;
    }
    const selection = input.options ? input.options.selection : null;
    if (selection) {
      if (typeof selection.endLineNumber === "number" && typeof selection.endColumn === "number") {
        editor2.setSelection(selection);
        editor2.revealRangeInCenter(selection, 1);
      } else {
        const pos = {
          lineNumber: selection.startLineNumber,
          column: selection.startColumn
        };
        editor2.setPosition(pos);
        editor2.revealPositionInCenter(pos, 1);
      }
    }
    return editor2;
  }
  findModel(editor2, resource) {
    const model = editor2.getModel();
    if (model && model.uri.toString() !== resource.toString()) {
      return null;
    }
    return model;
  }
};
StandaloneCodeEditorService = __decorate4([
  __param4(0, IContextKeyService),
  __param4(1, IThemeService)
], StandaloneCodeEditorService);
registerSingleton(ICodeEditorService, StandaloneCodeEditorService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneLayoutService.js
init_define_process();
init_dom();
init_event();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/layout/browser/layoutService.js
init_define_process();
init_instantiation();
var ILayoutService = createDecorator("layoutService");

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneLayoutService.js
init_codeEditorService();
init_extensions();
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param5 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var StandaloneLayoutService = class StandaloneLayoutService2 {
  constructor(_codeEditorService) {
    this._codeEditorService = _codeEditorService;
    this.onDidLayout = Event.None;
    this.offset = { top: 0, quickPickTop: 0 };
  }
  get dimension() {
    if (!this._dimension) {
      this._dimension = getClientArea(window.document.body);
    }
    return this._dimension;
  }
  get hasContainer() {
    return false;
  }
  get container() {
    throw new Error(`ILayoutService.container is not available in the standalone editor!`);
  }
  focus() {
    var _a4;
    (_a4 = this._codeEditorService.getFocusedCodeEditor()) === null || _a4 === void 0 ? void 0 : _a4.focus();
  }
};
StandaloneLayoutService = __decorate5([
  __param5(0, ICodeEditorService)
], StandaloneLayoutService);
var EditorScopedLayoutService = class EditorScopedLayoutService2 extends StandaloneLayoutService {
  constructor(_container, codeEditorService) {
    super(codeEditorService);
    this._container = _container;
  }
  get hasContainer() {
    return false;
  }
  get container() {
    return this._container;
  }
};
EditorScopedLayoutService = __decorate5([
  __param5(1, ICodeEditorService)
], EditorScopedLayoutService);
registerSingleton(ILayoutService, StandaloneLayoutService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/undoRedo/common/undoRedoService.js
init_define_process();
init_errors();
init_lifecycle();
init_network();
init_nls();
init_extensions();
init_undoRedo();
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param6 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var DEBUG = false;
function getResourceLabel(resource) {
  return resource.scheme === Schemas.file ? resource.fsPath : resource.path;
}
var stackElementCounter = 0;
var ResourceStackElement = class {
  constructor(actual, resourceLabel, strResource, groupId, groupOrder, sourceId, sourceOrder) {
    this.id = ++stackElementCounter;
    this.type = 0;
    this.actual = actual;
    this.label = actual.label;
    this.confirmBeforeUndo = actual.confirmBeforeUndo || false;
    this.resourceLabel = resourceLabel;
    this.strResource = strResource;
    this.resourceLabels = [this.resourceLabel];
    this.strResources = [this.strResource];
    this.groupId = groupId;
    this.groupOrder = groupOrder;
    this.sourceId = sourceId;
    this.sourceOrder = sourceOrder;
    this.isValid = true;
  }
  setValid(isValid) {
    this.isValid = isValid;
  }
  toString() {
    return `[id:${this.id}] [group:${this.groupId}] [${this.isValid ? "  VALID" : "INVALID"}] ${this.actual.constructor.name} - ${this.actual}`;
  }
};
var ResourceReasonPair = class {
  constructor(resourceLabel, reason) {
    this.resourceLabel = resourceLabel;
    this.reason = reason;
  }
};
var RemovedResources = class {
  constructor() {
    this.elements = /* @__PURE__ */ new Map();
  }
  createMessage() {
    const externalRemoval = [];
    const noParallelUniverses = [];
    for (const [, element] of this.elements) {
      const dest = element.reason === 0 ? externalRemoval : noParallelUniverses;
      dest.push(element.resourceLabel);
    }
    const messages = [];
    if (externalRemoval.length > 0) {
      messages.push(localize({ key: "externalRemoval", comment: ["{0} is a list of filenames"] }, "The following files have been closed and modified on disk: {0}.", externalRemoval.join(", ")));
    }
    if (noParallelUniverses.length > 0) {
      messages.push(localize({ key: "noParallelUniverses", comment: ["{0} is a list of filenames"] }, "The following files have been modified in an incompatible way: {0}.", noParallelUniverses.join(", ")));
    }
    return messages.join("\n");
  }
  get size() {
    return this.elements.size;
  }
  has(strResource) {
    return this.elements.has(strResource);
  }
  set(strResource, value) {
    this.elements.set(strResource, value);
  }
  delete(strResource) {
    return this.elements.delete(strResource);
  }
};
var WorkspaceStackElement = class {
  constructor(actual, resourceLabels, strResources, groupId, groupOrder, sourceId, sourceOrder) {
    this.id = ++stackElementCounter;
    this.type = 1;
    this.actual = actual;
    this.label = actual.label;
    this.confirmBeforeUndo = actual.confirmBeforeUndo || false;
    this.resourceLabels = resourceLabels;
    this.strResources = strResources;
    this.groupId = groupId;
    this.groupOrder = groupOrder;
    this.sourceId = sourceId;
    this.sourceOrder = sourceOrder;
    this.removedResources = null;
    this.invalidatedResources = null;
  }
  canSplit() {
    return typeof this.actual.split === "function";
  }
  removeResource(resourceLabel, strResource, reason) {
    if (!this.removedResources) {
      this.removedResources = new RemovedResources();
    }
    if (!this.removedResources.has(strResource)) {
      this.removedResources.set(strResource, new ResourceReasonPair(resourceLabel, reason));
    }
  }
  setValid(resourceLabel, strResource, isValid) {
    if (isValid) {
      if (this.invalidatedResources) {
        this.invalidatedResources.delete(strResource);
        if (this.invalidatedResources.size === 0) {
          this.invalidatedResources = null;
        }
      }
    } else {
      if (!this.invalidatedResources) {
        this.invalidatedResources = new RemovedResources();
      }
      if (!this.invalidatedResources.has(strResource)) {
        this.invalidatedResources.set(strResource, new ResourceReasonPair(resourceLabel, 0));
      }
    }
  }
  toString() {
    return `[id:${this.id}] [group:${this.groupId}] [${this.invalidatedResources ? "INVALID" : "  VALID"}] ${this.actual.constructor.name} - ${this.actual}`;
  }
};
var ResourceEditStack = class {
  constructor(resourceLabel, strResource) {
    this.resourceLabel = resourceLabel;
    this.strResource = strResource;
    this._past = [];
    this._future = [];
    this.locked = false;
    this.versionId = 1;
  }
  dispose() {
    for (const element of this._past) {
      if (element.type === 1) {
        element.removeResource(this.resourceLabel, this.strResource, 0);
      }
    }
    for (const element of this._future) {
      if (element.type === 1) {
        element.removeResource(this.resourceLabel, this.strResource, 0);
      }
    }
    this.versionId++;
  }
  toString() {
    const result = [];
    result.push(`* ${this.strResource}:`);
    for (let i = 0; i < this._past.length; i++) {
      result.push(`   * [UNDO] ${this._past[i]}`);
    }
    for (let i = this._future.length - 1; i >= 0; i--) {
      result.push(`   * [REDO] ${this._future[i]}`);
    }
    return result.join("\n");
  }
  flushAllElements() {
    this._past = [];
    this._future = [];
    this.versionId++;
  }
  _setElementValidFlag(element, isValid) {
    if (element.type === 1) {
      element.setValid(this.resourceLabel, this.strResource, isValid);
    } else {
      element.setValid(isValid);
    }
  }
  setElementsValidFlag(isValid, filter) {
    for (const element of this._past) {
      if (filter(element.actual)) {
        this._setElementValidFlag(element, isValid);
      }
    }
    for (const element of this._future) {
      if (filter(element.actual)) {
        this._setElementValidFlag(element, isValid);
      }
    }
  }
  pushElement(element) {
    for (const futureElement of this._future) {
      if (futureElement.type === 1) {
        futureElement.removeResource(this.resourceLabel, this.strResource, 1);
      }
    }
    this._future = [];
    this._past.push(element);
    this.versionId++;
  }
  createSnapshot(resource) {
    const elements = [];
    for (let i = 0, len = this._past.length; i < len; i++) {
      elements.push(this._past[i].id);
    }
    for (let i = this._future.length - 1; i >= 0; i--) {
      elements.push(this._future[i].id);
    }
    return new ResourceEditStackSnapshot(resource, elements);
  }
  restoreSnapshot(snapshot) {
    const snapshotLength = snapshot.elements.length;
    let isOK = true;
    let snapshotIndex = 0;
    let removePastAfter = -1;
    for (let i = 0, len = this._past.length; i < len; i++, snapshotIndex++) {
      const element = this._past[i];
      if (isOK && (snapshotIndex >= snapshotLength || element.id !== snapshot.elements[snapshotIndex])) {
        isOK = false;
        removePastAfter = 0;
      }
      if (!isOK && element.type === 1) {
        element.removeResource(this.resourceLabel, this.strResource, 0);
      }
    }
    let removeFutureBefore = -1;
    for (let i = this._future.length - 1; i >= 0; i--, snapshotIndex++) {
      const element = this._future[i];
      if (isOK && (snapshotIndex >= snapshotLength || element.id !== snapshot.elements[snapshotIndex])) {
        isOK = false;
        removeFutureBefore = i;
      }
      if (!isOK && element.type === 1) {
        element.removeResource(this.resourceLabel, this.strResource, 0);
      }
    }
    if (removePastAfter !== -1) {
      this._past = this._past.slice(0, removePastAfter);
    }
    if (removeFutureBefore !== -1) {
      this._future = this._future.slice(removeFutureBefore + 1);
    }
    this.versionId++;
  }
  getElements() {
    const past = [];
    const future = [];
    for (const element of this._past) {
      past.push(element.actual);
    }
    for (const element of this._future) {
      future.push(element.actual);
    }
    return { past, future };
  }
  getClosestPastElement() {
    if (this._past.length === 0) {
      return null;
    }
    return this._past[this._past.length - 1];
  }
  getSecondClosestPastElement() {
    if (this._past.length < 2) {
      return null;
    }
    return this._past[this._past.length - 2];
  }
  getClosestFutureElement() {
    if (this._future.length === 0) {
      return null;
    }
    return this._future[this._future.length - 1];
  }
  hasPastElements() {
    return this._past.length > 0;
  }
  hasFutureElements() {
    return this._future.length > 0;
  }
  splitPastWorkspaceElement(toRemove, individualMap) {
    for (let j = this._past.length - 1; j >= 0; j--) {
      if (this._past[j] === toRemove) {
        if (individualMap.has(this.strResource)) {
          this._past[j] = individualMap.get(this.strResource);
        } else {
          this._past.splice(j, 1);
        }
        break;
      }
    }
    this.versionId++;
  }
  splitFutureWorkspaceElement(toRemove, individualMap) {
    for (let j = this._future.length - 1; j >= 0; j--) {
      if (this._future[j] === toRemove) {
        if (individualMap.has(this.strResource)) {
          this._future[j] = individualMap.get(this.strResource);
        } else {
          this._future.splice(j, 1);
        }
        break;
      }
    }
    this.versionId++;
  }
  moveBackward(element) {
    this._past.pop();
    this._future.push(element);
    this.versionId++;
  }
  moveForward(element) {
    this._future.pop();
    this._past.push(element);
    this.versionId++;
  }
};
var EditStackSnapshot = class {
  constructor(editStacks) {
    this.editStacks = editStacks;
    this._versionIds = [];
    for (let i = 0, len = this.editStacks.length; i < len; i++) {
      this._versionIds[i] = this.editStacks[i].versionId;
    }
  }
  isValid() {
    for (let i = 0, len = this.editStacks.length; i < len; i++) {
      if (this._versionIds[i] !== this.editStacks[i].versionId) {
        return false;
      }
    }
    return true;
  }
};
var missingEditStack = new ResourceEditStack("", "");
missingEditStack.locked = true;
var UndoRedoService = class UndoRedoService2 {
  constructor(_dialogService, _notificationService) {
    this._dialogService = _dialogService;
    this._notificationService = _notificationService;
    this._editStacks = /* @__PURE__ */ new Map();
    this._uriComparisonKeyComputers = [];
  }
  getUriComparisonKey(resource) {
    for (const uriComparisonKeyComputer of this._uriComparisonKeyComputers) {
      if (uriComparisonKeyComputer[0] === resource.scheme) {
        return uriComparisonKeyComputer[1].getComparisonKey(resource);
      }
    }
    return resource.toString();
  }
  _print(label) {
    console.log(`------------------------------------`);
    console.log(`AFTER ${label}: `);
    const str = [];
    for (const element of this._editStacks) {
      str.push(element[1].toString());
    }
    console.log(str.join("\n"));
  }
  pushElement(element, group = UndoRedoGroup.None, source = UndoRedoSource.None) {
    if (element.type === 0) {
      const resourceLabel = getResourceLabel(element.resource);
      const strResource = this.getUriComparisonKey(element.resource);
      this._pushElement(new ResourceStackElement(element, resourceLabel, strResource, group.id, group.nextOrder(), source.id, source.nextOrder()));
    } else {
      const seen = /* @__PURE__ */ new Set();
      const resourceLabels = [];
      const strResources = [];
      for (const resource of element.resources) {
        const resourceLabel = getResourceLabel(resource);
        const strResource = this.getUriComparisonKey(resource);
        if (seen.has(strResource)) {
          continue;
        }
        seen.add(strResource);
        resourceLabels.push(resourceLabel);
        strResources.push(strResource);
      }
      if (resourceLabels.length === 1) {
        this._pushElement(new ResourceStackElement(element, resourceLabels[0], strResources[0], group.id, group.nextOrder(), source.id, source.nextOrder()));
      } else {
        this._pushElement(new WorkspaceStackElement(element, resourceLabels, strResources, group.id, group.nextOrder(), source.id, source.nextOrder()));
      }
    }
    if (DEBUG) {
      this._print("pushElement");
    }
  }
  _pushElement(element) {
    for (let i = 0, len = element.strResources.length; i < len; i++) {
      const resourceLabel = element.resourceLabels[i];
      const strResource = element.strResources[i];
      let editStack;
      if (this._editStacks.has(strResource)) {
        editStack = this._editStacks.get(strResource);
      } else {
        editStack = new ResourceEditStack(resourceLabel, strResource);
        this._editStacks.set(strResource, editStack);
      }
      editStack.pushElement(element);
    }
  }
  getLastElement(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      if (editStack.hasFutureElements()) {
        return null;
      }
      const closestPastElement = editStack.getClosestPastElement();
      return closestPastElement ? closestPastElement.actual : null;
    }
    return null;
  }
  _splitPastWorkspaceElement(toRemove, ignoreResources) {
    const individualArr = toRemove.actual.split();
    const individualMap = /* @__PURE__ */ new Map();
    for (const _element of individualArr) {
      const resourceLabel = getResourceLabel(_element.resource);
      const strResource = this.getUriComparisonKey(_element.resource);
      const element = new ResourceStackElement(_element, resourceLabel, strResource, 0, 0, 0, 0);
      individualMap.set(element.strResource, element);
    }
    for (const strResource of toRemove.strResources) {
      if (ignoreResources && ignoreResources.has(strResource)) {
        continue;
      }
      const editStack = this._editStacks.get(strResource);
      editStack.splitPastWorkspaceElement(toRemove, individualMap);
    }
  }
  _splitFutureWorkspaceElement(toRemove, ignoreResources) {
    const individualArr = toRemove.actual.split();
    const individualMap = /* @__PURE__ */ new Map();
    for (const _element of individualArr) {
      const resourceLabel = getResourceLabel(_element.resource);
      const strResource = this.getUriComparisonKey(_element.resource);
      const element = new ResourceStackElement(_element, resourceLabel, strResource, 0, 0, 0, 0);
      individualMap.set(element.strResource, element);
    }
    for (const strResource of toRemove.strResources) {
      if (ignoreResources && ignoreResources.has(strResource)) {
        continue;
      }
      const editStack = this._editStacks.get(strResource);
      editStack.splitFutureWorkspaceElement(toRemove, individualMap);
    }
  }
  removeElements(resource) {
    const strResource = typeof resource === "string" ? resource : this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      editStack.dispose();
      this._editStacks.delete(strResource);
    }
    if (DEBUG) {
      this._print("removeElements");
    }
  }
  setElementsValidFlag(resource, isValid, filter) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      editStack.setElementsValidFlag(isValid, filter);
    }
    if (DEBUG) {
      this._print("setElementsValidFlag");
    }
  }
  createSnapshot(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.createSnapshot(resource);
    }
    return new ResourceEditStackSnapshot(resource, []);
  }
  restoreSnapshot(snapshot) {
    const strResource = this.getUriComparisonKey(snapshot.resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      editStack.restoreSnapshot(snapshot);
      if (!editStack.hasPastElements() && !editStack.hasFutureElements()) {
        editStack.dispose();
        this._editStacks.delete(strResource);
      }
    }
    if (DEBUG) {
      this._print("restoreSnapshot");
    }
  }
  getElements(resource) {
    const strResource = this.getUriComparisonKey(resource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.getElements();
    }
    return { past: [], future: [] };
  }
  _findClosestUndoElementWithSource(sourceId) {
    if (!sourceId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestPastElement();
      if (!candidate) {
        continue;
      }
      if (candidate.sourceId === sourceId) {
        if (!matchedElement || candidate.sourceOrder > matchedElement.sourceOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  canUndo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestUndoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? true : false;
    }
    const strResource = this.getUriComparisonKey(resourceOrSource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.hasPastElements();
    }
    return false;
  }
  _onError(err, element) {
    onUnexpectedError(err);
    for (const strResource of element.strResources) {
      this.removeElements(strResource);
    }
    this._notificationService.error(err);
  }
  _acquireLocks(editStackSnapshot) {
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.locked) {
        throw new Error("Cannot acquire edit stack lock");
      }
    }
    for (const editStack of editStackSnapshot.editStacks) {
      editStack.locked = true;
    }
    return () => {
      for (const editStack of editStackSnapshot.editStacks) {
        editStack.locked = false;
      }
    };
  }
  _safeInvokeWithLocks(element, invoke, editStackSnapshot, cleanup, continuation) {
    const releaseLocks = this._acquireLocks(editStackSnapshot);
    let result;
    try {
      result = invoke();
    } catch (err) {
      releaseLocks();
      cleanup.dispose();
      return this._onError(err, element);
    }
    if (result) {
      return result.then(() => {
        releaseLocks();
        cleanup.dispose();
        return continuation();
      }, (err) => {
        releaseLocks();
        cleanup.dispose();
        return this._onError(err, element);
      });
    } else {
      releaseLocks();
      cleanup.dispose();
      return continuation();
    }
  }
  _invokeWorkspacePrepare(element) {
    return __awaiter6(this, void 0, void 0, function* () {
      if (typeof element.actual.prepareUndoRedo === "undefined") {
        return Disposable.None;
      }
      const result = element.actual.prepareUndoRedo();
      if (typeof result === "undefined") {
        return Disposable.None;
      }
      return result;
    });
  }
  _invokeResourcePrepare(element, callback) {
    if (element.actual.type !== 1 || typeof element.actual.prepareUndoRedo === "undefined") {
      return callback(Disposable.None);
    }
    const r = element.actual.prepareUndoRedo();
    if (!r) {
      return callback(Disposable.None);
    }
    if (isDisposable(r)) {
      return callback(r);
    }
    return r.then((disposable) => {
      return callback(disposable);
    });
  }
  _getAffectedEditStacks(element) {
    const affectedEditStacks = [];
    for (const strResource of element.strResources) {
      affectedEditStacks.push(this._editStacks.get(strResource) || missingEditStack);
    }
    return new EditStackSnapshot(affectedEditStacks);
  }
  _tryToSplitAndUndo(strResource, element, ignoreResources, message) {
    if (element.canSplit()) {
      this._splitPastWorkspaceElement(element, ignoreResources);
      this._notificationService.warn(message);
      return new WorkspaceVerificationError(this._undo(strResource, 0, true));
    } else {
      for (const strResource2 of element.strResources) {
        this.removeElements(strResource2);
      }
      this._notificationService.warn(message);
      return new WorkspaceVerificationError();
    }
  }
  _checkWorkspaceUndo(strResource, element, editStackSnapshot, checkInvalidatedResources) {
    if (element.removedResources) {
      return this._tryToSplitAndUndo(strResource, element, element.removedResources, localize({ key: "cannotWorkspaceUndo", comment: ["{0} is a label for an operation. {1} is another message."] }, "Could not undo '{0}' across all files. {1}", element.label, element.removedResources.createMessage()));
    }
    if (checkInvalidatedResources && element.invalidatedResources) {
      return this._tryToSplitAndUndo(strResource, element, element.invalidatedResources, localize({ key: "cannotWorkspaceUndo", comment: ["{0} is a label for an operation. {1} is another message."] }, "Could not undo '{0}' across all files. {1}", element.label, element.invalidatedResources.createMessage()));
    }
    const cannotUndoDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.getClosestPastElement() !== element) {
        cannotUndoDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotUndoDueToResources.length > 0) {
      return this._tryToSplitAndUndo(strResource, element, null, localize({ key: "cannotWorkspaceUndoDueToChanges", comment: ["{0} is a label for an operation. {1} is a list of filenames."] }, "Could not undo '{0}' across all files because changes were made to {1}", element.label, cannotUndoDueToResources.join(", ")));
    }
    const cannotLockDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.locked) {
        cannotLockDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotLockDueToResources.length > 0) {
      return this._tryToSplitAndUndo(strResource, element, null, localize({ key: "cannotWorkspaceUndoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] }, "Could not undo '{0}' across all files because there is already an undo or redo operation running on {1}", element.label, cannotLockDueToResources.join(", ")));
    }
    if (!editStackSnapshot.isValid()) {
      return this._tryToSplitAndUndo(strResource, element, null, localize({ key: "cannotWorkspaceUndoDueToInMeantimeUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] }, "Could not undo '{0}' across all files because an undo or redo operation occurred in the meantime", element.label));
    }
    return null;
  }
  _workspaceUndo(strResource, element, undoConfirmed) {
    const affectedEditStacks = this._getAffectedEditStacks(element);
    const verificationError = this._checkWorkspaceUndo(strResource, element, affectedEditStacks, false);
    if (verificationError) {
      return verificationError.returnValue;
    }
    return this._confirmAndExecuteWorkspaceUndo(strResource, element, affectedEditStacks, undoConfirmed);
  }
  _isPartOfUndoGroup(element) {
    if (!element.groupId) {
      return false;
    }
    for (const [, editStack] of this._editStacks) {
      const pastElement = editStack.getClosestPastElement();
      if (!pastElement) {
        continue;
      }
      if (pastElement === element) {
        const secondPastElement = editStack.getSecondClosestPastElement();
        if (secondPastElement && secondPastElement.groupId === element.groupId) {
          return true;
        }
      }
      if (pastElement.groupId === element.groupId) {
        return true;
      }
    }
    return false;
  }
  _confirmAndExecuteWorkspaceUndo(strResource, element, editStackSnapshot, undoConfirmed) {
    return __awaiter6(this, void 0, void 0, function* () {
      if (element.canSplit() && !this._isPartOfUndoGroup(element)) {
        const result = yield this._dialogService.show(severity_default.Info, localize("confirmWorkspace", "Would you like to undo '{0}' across all files?", element.label), [
          localize({ key: "ok", comment: ["{0} denotes a number that is > 1"] }, "Undo in {0} Files", editStackSnapshot.editStacks.length),
          localize("nok", "Undo this File"),
          localize("cancel", "Cancel")
        ], {
          cancelId: 2
        });
        if (result.choice === 2) {
          return;
        }
        if (result.choice === 1) {
          this._splitPastWorkspaceElement(element, null);
          return this._undo(strResource, 0, true);
        }
        const verificationError1 = this._checkWorkspaceUndo(strResource, element, editStackSnapshot, false);
        if (verificationError1) {
          return verificationError1.returnValue;
        }
        undoConfirmed = true;
      }
      let cleanup;
      try {
        cleanup = yield this._invokeWorkspacePrepare(element);
      } catch (err) {
        return this._onError(err, element);
      }
      const verificationError2 = this._checkWorkspaceUndo(strResource, element, editStackSnapshot, true);
      if (verificationError2) {
        cleanup.dispose();
        return verificationError2.returnValue;
      }
      for (const editStack of editStackSnapshot.editStacks) {
        editStack.moveBackward(element);
      }
      return this._safeInvokeWithLocks(element, () => element.actual.undo(), editStackSnapshot, cleanup, () => this._continueUndoInGroup(element.groupId, undoConfirmed));
    });
  }
  _resourceUndo(editStack, element, undoConfirmed) {
    if (!element.isValid) {
      editStack.flushAllElements();
      return;
    }
    if (editStack.locked) {
      const message = localize({ key: "cannotResourceUndoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation."] }, "Could not undo '{0}' because there is already an undo or redo operation running.", element.label);
      this._notificationService.warn(message);
      return;
    }
    return this._invokeResourcePrepare(element, (cleanup) => {
      editStack.moveBackward(element);
      return this._safeInvokeWithLocks(element, () => element.actual.undo(), new EditStackSnapshot([editStack]), cleanup, () => this._continueUndoInGroup(element.groupId, undoConfirmed));
    });
  }
  _findClosestUndoElementInGroup(groupId) {
    if (!groupId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestPastElement();
      if (!candidate) {
        continue;
      }
      if (candidate.groupId === groupId) {
        if (!matchedElement || candidate.groupOrder > matchedElement.groupOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  _continueUndoInGroup(groupId, undoConfirmed) {
    if (!groupId) {
      return;
    }
    const [, matchedStrResource] = this._findClosestUndoElementInGroup(groupId);
    if (matchedStrResource) {
      return this._undo(matchedStrResource, 0, undoConfirmed);
    }
  }
  undo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestUndoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? this._undo(matchedStrResource, resourceOrSource.id, false) : void 0;
    }
    if (typeof resourceOrSource === "string") {
      return this._undo(resourceOrSource, 0, false);
    }
    return this._undo(this.getUriComparisonKey(resourceOrSource), 0, false);
  }
  _undo(strResource, sourceId = 0, undoConfirmed) {
    if (!this._editStacks.has(strResource)) {
      return;
    }
    const editStack = this._editStacks.get(strResource);
    const element = editStack.getClosestPastElement();
    if (!element) {
      return;
    }
    if (element.groupId) {
      const [matchedElement, matchedStrResource] = this._findClosestUndoElementInGroup(element.groupId);
      if (element !== matchedElement && matchedStrResource) {
        return this._undo(matchedStrResource, sourceId, undoConfirmed);
      }
    }
    const shouldPromptForConfirmation = element.sourceId !== sourceId || element.confirmBeforeUndo;
    if (shouldPromptForConfirmation && !undoConfirmed) {
      return this._confirmAndContinueUndo(strResource, sourceId, element);
    }
    try {
      if (element.type === 1) {
        return this._workspaceUndo(strResource, element, undoConfirmed);
      } else {
        return this._resourceUndo(editStack, element, undoConfirmed);
      }
    } finally {
      if (DEBUG) {
        this._print("undo");
      }
    }
  }
  _confirmAndContinueUndo(strResource, sourceId, element) {
    return __awaiter6(this, void 0, void 0, function* () {
      const result = yield this._dialogService.show(severity_default.Info, localize("confirmDifferentSource", "Would you like to undo '{0}'?", element.label), [
        localize("confirmDifferentSource.yes", "Yes"),
        localize("confirmDifferentSource.no", "No")
      ], {
        cancelId: 1
      });
      if (result.choice === 1) {
        return;
      }
      return this._undo(strResource, sourceId, true);
    });
  }
  _findClosestRedoElementWithSource(sourceId) {
    if (!sourceId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestFutureElement();
      if (!candidate) {
        continue;
      }
      if (candidate.sourceId === sourceId) {
        if (!matchedElement || candidate.sourceOrder < matchedElement.sourceOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  canRedo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestRedoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? true : false;
    }
    const strResource = this.getUriComparisonKey(resourceOrSource);
    if (this._editStacks.has(strResource)) {
      const editStack = this._editStacks.get(strResource);
      return editStack.hasFutureElements();
    }
    return false;
  }
  _tryToSplitAndRedo(strResource, element, ignoreResources, message) {
    if (element.canSplit()) {
      this._splitFutureWorkspaceElement(element, ignoreResources);
      this._notificationService.warn(message);
      return new WorkspaceVerificationError(this._redo(strResource));
    } else {
      for (const strResource2 of element.strResources) {
        this.removeElements(strResource2);
      }
      this._notificationService.warn(message);
      return new WorkspaceVerificationError();
    }
  }
  _checkWorkspaceRedo(strResource, element, editStackSnapshot, checkInvalidatedResources) {
    if (element.removedResources) {
      return this._tryToSplitAndRedo(strResource, element, element.removedResources, localize({ key: "cannotWorkspaceRedo", comment: ["{0} is a label for an operation. {1} is another message."] }, "Could not redo '{0}' across all files. {1}", element.label, element.removedResources.createMessage()));
    }
    if (checkInvalidatedResources && element.invalidatedResources) {
      return this._tryToSplitAndRedo(strResource, element, element.invalidatedResources, localize({ key: "cannotWorkspaceRedo", comment: ["{0} is a label for an operation. {1} is another message."] }, "Could not redo '{0}' across all files. {1}", element.label, element.invalidatedResources.createMessage()));
    }
    const cannotRedoDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.getClosestFutureElement() !== element) {
        cannotRedoDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotRedoDueToResources.length > 0) {
      return this._tryToSplitAndRedo(strResource, element, null, localize({ key: "cannotWorkspaceRedoDueToChanges", comment: ["{0} is a label for an operation. {1} is a list of filenames."] }, "Could not redo '{0}' across all files because changes were made to {1}", element.label, cannotRedoDueToResources.join(", ")));
    }
    const cannotLockDueToResources = [];
    for (const editStack of editStackSnapshot.editStacks) {
      if (editStack.locked) {
        cannotLockDueToResources.push(editStack.resourceLabel);
      }
    }
    if (cannotLockDueToResources.length > 0) {
      return this._tryToSplitAndRedo(strResource, element, null, localize({ key: "cannotWorkspaceRedoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] }, "Could not redo '{0}' across all files because there is already an undo or redo operation running on {1}", element.label, cannotLockDueToResources.join(", ")));
    }
    if (!editStackSnapshot.isValid()) {
      return this._tryToSplitAndRedo(strResource, element, null, localize({ key: "cannotWorkspaceRedoDueToInMeantimeUndoRedo", comment: ["{0} is a label for an operation. {1} is a list of filenames."] }, "Could not redo '{0}' across all files because an undo or redo operation occurred in the meantime", element.label));
    }
    return null;
  }
  _workspaceRedo(strResource, element) {
    const affectedEditStacks = this._getAffectedEditStacks(element);
    const verificationError = this._checkWorkspaceRedo(strResource, element, affectedEditStacks, false);
    if (verificationError) {
      return verificationError.returnValue;
    }
    return this._executeWorkspaceRedo(strResource, element, affectedEditStacks);
  }
  _executeWorkspaceRedo(strResource, element, editStackSnapshot) {
    return __awaiter6(this, void 0, void 0, function* () {
      let cleanup;
      try {
        cleanup = yield this._invokeWorkspacePrepare(element);
      } catch (err) {
        return this._onError(err, element);
      }
      const verificationError = this._checkWorkspaceRedo(strResource, element, editStackSnapshot, true);
      if (verificationError) {
        cleanup.dispose();
        return verificationError.returnValue;
      }
      for (const editStack of editStackSnapshot.editStacks) {
        editStack.moveForward(element);
      }
      return this._safeInvokeWithLocks(element, () => element.actual.redo(), editStackSnapshot, cleanup, () => this._continueRedoInGroup(element.groupId));
    });
  }
  _resourceRedo(editStack, element) {
    if (!element.isValid) {
      editStack.flushAllElements();
      return;
    }
    if (editStack.locked) {
      const message = localize({ key: "cannotResourceRedoDueToInProgressUndoRedo", comment: ["{0} is a label for an operation."] }, "Could not redo '{0}' because there is already an undo or redo operation running.", element.label);
      this._notificationService.warn(message);
      return;
    }
    return this._invokeResourcePrepare(element, (cleanup) => {
      editStack.moveForward(element);
      return this._safeInvokeWithLocks(element, () => element.actual.redo(), new EditStackSnapshot([editStack]), cleanup, () => this._continueRedoInGroup(element.groupId));
    });
  }
  _findClosestRedoElementInGroup(groupId) {
    if (!groupId) {
      return [null, null];
    }
    let matchedElement = null;
    let matchedStrResource = null;
    for (const [strResource, editStack] of this._editStacks) {
      const candidate = editStack.getClosestFutureElement();
      if (!candidate) {
        continue;
      }
      if (candidate.groupId === groupId) {
        if (!matchedElement || candidate.groupOrder < matchedElement.groupOrder) {
          matchedElement = candidate;
          matchedStrResource = strResource;
        }
      }
    }
    return [matchedElement, matchedStrResource];
  }
  _continueRedoInGroup(groupId) {
    if (!groupId) {
      return;
    }
    const [, matchedStrResource] = this._findClosestRedoElementInGroup(groupId);
    if (matchedStrResource) {
      return this._redo(matchedStrResource);
    }
  }
  redo(resourceOrSource) {
    if (resourceOrSource instanceof UndoRedoSource) {
      const [, matchedStrResource] = this._findClosestRedoElementWithSource(resourceOrSource.id);
      return matchedStrResource ? this._redo(matchedStrResource) : void 0;
    }
    if (typeof resourceOrSource === "string") {
      return this._redo(resourceOrSource);
    }
    return this._redo(this.getUriComparisonKey(resourceOrSource));
  }
  _redo(strResource) {
    if (!this._editStacks.has(strResource)) {
      return;
    }
    const editStack = this._editStacks.get(strResource);
    const element = editStack.getClosestFutureElement();
    if (!element) {
      return;
    }
    if (element.groupId) {
      const [matchedElement, matchedStrResource] = this._findClosestRedoElementInGroup(element.groupId);
      if (element !== matchedElement && matchedStrResource) {
        return this._redo(matchedStrResource);
      }
    }
    try {
      if (element.type === 1) {
        return this._workspaceRedo(strResource, element);
      } else {
        return this._resourceRedo(editStack, element);
      }
    } finally {
      if (DEBUG) {
        this._print("redo");
      }
    }
  }
};
UndoRedoService = __decorate6([
  __param6(0, IDialogService),
  __param6(1, INotificationService)
], UndoRedoService);
var WorkspaceVerificationError = class {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }
};
registerSingleton(IUndoRedoService, UndoRedoService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_languageFeatureDebounce();
init_strings();
init_dom();
init_keyboardEvent();
init_event();
init_keybindings();
init_lifecycle();
init_platform();
init_uri();
init_editOperation();
init_position();
init_range();
init_model2();
init_resolverService();
init_textResourceConfiguration();
init_commands();
init_configuration();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/configuration/common/configurationModels.js
init_define_process();
init_arrays();
init_map();
init_objects();
init_types();
init_uri();
init_configuration();
var ConfigurationModel = class {
  constructor(_contents = {}, _keys = [], _overrides = []) {
    this._contents = _contents;
    this._keys = _keys;
    this._overrides = _overrides;
    this.frozen = false;
    this.overrideConfigurations = /* @__PURE__ */ new Map();
  }
  get contents() {
    return this.checkAndFreeze(this._contents);
  }
  get overrides() {
    return this.checkAndFreeze(this._overrides);
  }
  get keys() {
    return this.checkAndFreeze(this._keys);
  }
  isEmpty() {
    return this._keys.length === 0 && Object.keys(this._contents).length === 0 && this._overrides.length === 0;
  }
  getValue(section) {
    return section ? getConfigurationValue(this.contents, section) : this.contents;
  }
  getOverrideValue(section, overrideIdentifier) {
    const overrideContents = this.getContentsForOverrideIdentifer(overrideIdentifier);
    return overrideContents ? section ? getConfigurationValue(overrideContents, section) : overrideContents : void 0;
  }
  override(identifier) {
    let overrideConfigurationModel = this.overrideConfigurations.get(identifier);
    if (!overrideConfigurationModel) {
      overrideConfigurationModel = this.createOverrideConfigurationModel(identifier);
      this.overrideConfigurations.set(identifier, overrideConfigurationModel);
    }
    return overrideConfigurationModel;
  }
  merge(...others) {
    const contents = deepClone(this.contents);
    const overrides = deepClone(this.overrides);
    const keys = [...this.keys];
    for (const other of others) {
      if (other.isEmpty()) {
        continue;
      }
      this.mergeContents(contents, other.contents);
      for (const otherOverride of other.overrides) {
        const [override] = overrides.filter((o) => equals(o.identifiers, otherOverride.identifiers));
        if (override) {
          this.mergeContents(override.contents, otherOverride.contents);
          override.keys.push(...otherOverride.keys);
          override.keys = distinct(override.keys);
        } else {
          overrides.push(deepClone(otherOverride));
        }
      }
      for (const key of other.keys) {
        if (keys.indexOf(key) === -1) {
          keys.push(key);
        }
      }
    }
    return new ConfigurationModel(contents, keys, overrides);
  }
  freeze() {
    this.frozen = true;
    return this;
  }
  createOverrideConfigurationModel(identifier) {
    const overrideContents = this.getContentsForOverrideIdentifer(identifier);
    if (!overrideContents || typeof overrideContents !== "object" || !Object.keys(overrideContents).length) {
      return this;
    }
    const contents = {};
    for (const key of distinct([...Object.keys(this.contents), ...Object.keys(overrideContents)])) {
      let contentsForKey = this.contents[key];
      const overrideContentsForKey = overrideContents[key];
      if (overrideContentsForKey) {
        if (typeof contentsForKey === "object" && typeof overrideContentsForKey === "object") {
          contentsForKey = deepClone(contentsForKey);
          this.mergeContents(contentsForKey, overrideContentsForKey);
        } else {
          contentsForKey = overrideContentsForKey;
        }
      }
      contents[key] = contentsForKey;
    }
    return new ConfigurationModel(contents, this.keys, this.overrides);
  }
  mergeContents(source, target) {
    for (const key of Object.keys(target)) {
      if (key in source) {
        if (isObject(source[key]) && isObject(target[key])) {
          this.mergeContents(source[key], target[key]);
          continue;
        }
      }
      source[key] = deepClone(target[key]);
    }
  }
  checkAndFreeze(data) {
    if (this.frozen && !Object.isFrozen(data)) {
      return deepFreeze(data);
    }
    return data;
  }
  getContentsForOverrideIdentifer(identifier) {
    let contentsForIdentifierOnly = null;
    let contents = null;
    const mergeContents = (contentsToMerge) => {
      if (contentsToMerge) {
        if (contents) {
          this.mergeContents(contents, contentsToMerge);
        } else {
          contents = deepClone(contentsToMerge);
        }
      }
    };
    for (const override of this.overrides) {
      if (equals(override.identifiers, [identifier])) {
        contentsForIdentifierOnly = override.contents;
      } else if (override.identifiers.includes(identifier)) {
        mergeContents(override.contents);
      }
    }
    mergeContents(contentsForIdentifierOnly);
    return contents;
  }
  toJSON() {
    return {
      contents: this.contents,
      overrides: this.overrides,
      keys: this.keys
    };
  }
  setValue(key, value) {
    this.addKey(key);
    addToValueTree(this.contents, key, value, (e) => {
      throw new Error(e);
    });
  }
  removeValue(key) {
    if (this.removeKey(key)) {
      removeFromValueTree(this.contents, key);
    }
  }
  addKey(key) {
    let index = this.keys.length;
    for (let i = 0; i < index; i++) {
      if (key.indexOf(this.keys[i]) === 0) {
        index = i;
      }
    }
    this.keys.splice(index, 1, key);
  }
  removeKey(key) {
    const index = this.keys.indexOf(key);
    if (index !== -1) {
      this.keys.splice(index, 1);
      return true;
    }
    return false;
  }
};
var Configuration = class {
  constructor(_defaultConfiguration, _policyConfiguration, _applicationConfiguration, _localUserConfiguration, _remoteUserConfiguration = new ConfigurationModel(), _workspaceConfiguration = new ConfigurationModel(), _folderConfigurations = new ResourceMap(), _memoryConfiguration = new ConfigurationModel(), _memoryConfigurationByResource = new ResourceMap(), _freeze = true) {
    this._defaultConfiguration = _defaultConfiguration;
    this._policyConfiguration = _policyConfiguration;
    this._applicationConfiguration = _applicationConfiguration;
    this._localUserConfiguration = _localUserConfiguration;
    this._remoteUserConfiguration = _remoteUserConfiguration;
    this._workspaceConfiguration = _workspaceConfiguration;
    this._folderConfigurations = _folderConfigurations;
    this._memoryConfiguration = _memoryConfiguration;
    this._memoryConfigurationByResource = _memoryConfigurationByResource;
    this._freeze = _freeze;
    this._workspaceConsolidatedConfiguration = null;
    this._foldersConsolidatedConfigurations = new ResourceMap();
    this._userConfiguration = null;
  }
  getValue(section, overrides, workspace) {
    const consolidateConfigurationModel = this.getConsolidatedConfigurationModel(section, overrides, workspace);
    return consolidateConfigurationModel.getValue(section);
  }
  updateValue(key, value, overrides = {}) {
    let memoryConfiguration;
    if (overrides.resource) {
      memoryConfiguration = this._memoryConfigurationByResource.get(overrides.resource);
      if (!memoryConfiguration) {
        memoryConfiguration = new ConfigurationModel();
        this._memoryConfigurationByResource.set(overrides.resource, memoryConfiguration);
      }
    } else {
      memoryConfiguration = this._memoryConfiguration;
    }
    if (value === void 0) {
      memoryConfiguration.removeValue(key);
    } else {
      memoryConfiguration.setValue(key, value);
    }
    if (!overrides.resource) {
      this._workspaceConsolidatedConfiguration = null;
    }
  }
  inspect(key, overrides, workspace) {
    const consolidateConfigurationModel = this.getConsolidatedConfigurationModel(key, overrides, workspace);
    const folderConfigurationModel = this.getFolderConfigurationModelForResource(overrides.resource, workspace);
    const memoryConfigurationModel = overrides.resource ? this._memoryConfigurationByResource.get(overrides.resource) || this._memoryConfiguration : this._memoryConfiguration;
    const defaultValue = overrides.overrideIdentifier ? this._defaultConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this._defaultConfiguration.freeze().getValue(key);
    const policyValue = this._policyConfiguration.isEmpty() ? void 0 : this._policyConfiguration.freeze().getValue(key);
    const applicationValue = this.applicationConfiguration.isEmpty() ? void 0 : this.applicationConfiguration.freeze().getValue(key);
    const userValue = overrides.overrideIdentifier ? this.userConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.userConfiguration.freeze().getValue(key);
    const userLocalValue = overrides.overrideIdentifier ? this.localUserConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.localUserConfiguration.freeze().getValue(key);
    const userRemoteValue = overrides.overrideIdentifier ? this.remoteUserConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.remoteUserConfiguration.freeze().getValue(key);
    const workspaceValue = workspace ? overrides.overrideIdentifier ? this._workspaceConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this._workspaceConfiguration.freeze().getValue(key) : void 0;
    const workspaceFolderValue = folderConfigurationModel ? overrides.overrideIdentifier ? folderConfigurationModel.freeze().override(overrides.overrideIdentifier).getValue(key) : folderConfigurationModel.freeze().getValue(key) : void 0;
    const memoryValue = overrides.overrideIdentifier ? memoryConfigurationModel.override(overrides.overrideIdentifier).getValue(key) : memoryConfigurationModel.getValue(key);
    const value = consolidateConfigurationModel.getValue(key);
    const overrideIdentifiers = distinct(consolidateConfigurationModel.overrides.map((override) => override.identifiers).flat()).filter((overrideIdentifier) => consolidateConfigurationModel.getOverrideValue(key, overrideIdentifier) !== void 0);
    return {
      defaultValue,
      policyValue,
      applicationValue,
      userValue,
      userLocalValue,
      userRemoteValue,
      workspaceValue,
      workspaceFolderValue,
      memoryValue,
      value,
      default: defaultValue !== void 0 ? { value: this._defaultConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this._defaultConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      policy: policyValue !== void 0 ? { value: policyValue } : void 0,
      application: applicationValue !== void 0 ? { value: applicationValue, override: overrides.overrideIdentifier ? this.applicationConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      user: userValue !== void 0 ? { value: this.userConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.userConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      userLocal: userLocalValue !== void 0 ? { value: this.localUserConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.localUserConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      userRemote: userRemoteValue !== void 0 ? { value: this.remoteUserConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.remoteUserConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      workspace: workspaceValue !== void 0 ? { value: this._workspaceConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this._workspaceConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      workspaceFolder: workspaceFolderValue !== void 0 ? { value: folderConfigurationModel === null || folderConfigurationModel === void 0 ? void 0 : folderConfigurationModel.freeze().getValue(key), override: overrides.overrideIdentifier ? folderConfigurationModel === null || folderConfigurationModel === void 0 ? void 0 : folderConfigurationModel.freeze().getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      memory: memoryValue !== void 0 ? { value: memoryConfigurationModel.getValue(key), override: overrides.overrideIdentifier ? memoryConfigurationModel.getOverrideValue(key, overrides.overrideIdentifier) : void 0 } : void 0,
      overrideIdentifiers: overrideIdentifiers.length ? overrideIdentifiers : void 0
    };
  }
  get applicationConfiguration() {
    return this._applicationConfiguration;
  }
  get userConfiguration() {
    if (!this._userConfiguration) {
      this._userConfiguration = this._remoteUserConfiguration.isEmpty() ? this._localUserConfiguration : this._localUserConfiguration.merge(this._remoteUserConfiguration);
      if (this._freeze) {
        this._userConfiguration.freeze();
      }
    }
    return this._userConfiguration;
  }
  get localUserConfiguration() {
    return this._localUserConfiguration;
  }
  get remoteUserConfiguration() {
    return this._remoteUserConfiguration;
  }
  getConsolidatedConfigurationModel(section, overrides, workspace) {
    let configurationModel = this.getConsolidatedConfigurationModelForResource(overrides, workspace);
    if (overrides.overrideIdentifier) {
      configurationModel = configurationModel.override(overrides.overrideIdentifier);
    }
    if (!this._policyConfiguration.isEmpty() && this._policyConfiguration.getValue(section) !== void 0) {
      configurationModel = configurationModel.merge(this._policyConfiguration);
    }
    return configurationModel;
  }
  getConsolidatedConfigurationModelForResource({ resource }, workspace) {
    let consolidateConfiguration = this.getWorkspaceConsolidatedConfiguration();
    if (workspace && resource) {
      const root = workspace.getFolder(resource);
      if (root) {
        consolidateConfiguration = this.getFolderConsolidatedConfiguration(root.uri) || consolidateConfiguration;
      }
      const memoryConfigurationForResource = this._memoryConfigurationByResource.get(resource);
      if (memoryConfigurationForResource) {
        consolidateConfiguration = consolidateConfiguration.merge(memoryConfigurationForResource);
      }
    }
    return consolidateConfiguration;
  }
  getWorkspaceConsolidatedConfiguration() {
    if (!this._workspaceConsolidatedConfiguration) {
      this._workspaceConsolidatedConfiguration = this._defaultConfiguration.merge(this.applicationConfiguration, this.userConfiguration, this._workspaceConfiguration, this._memoryConfiguration);
      if (this._freeze) {
        this._workspaceConfiguration = this._workspaceConfiguration.freeze();
      }
    }
    return this._workspaceConsolidatedConfiguration;
  }
  getFolderConsolidatedConfiguration(folder) {
    let folderConsolidatedConfiguration = this._foldersConsolidatedConfigurations.get(folder);
    if (!folderConsolidatedConfiguration) {
      const workspaceConsolidateConfiguration = this.getWorkspaceConsolidatedConfiguration();
      const folderConfiguration = this._folderConfigurations.get(folder);
      if (folderConfiguration) {
        folderConsolidatedConfiguration = workspaceConsolidateConfiguration.merge(folderConfiguration);
        if (this._freeze) {
          folderConsolidatedConfiguration = folderConsolidatedConfiguration.freeze();
        }
        this._foldersConsolidatedConfigurations.set(folder, folderConsolidatedConfiguration);
      } else {
        folderConsolidatedConfiguration = workspaceConsolidateConfiguration;
      }
    }
    return folderConsolidatedConfiguration;
  }
  getFolderConfigurationModelForResource(resource, workspace) {
    if (workspace && resource) {
      const root = workspace.getFolder(resource);
      if (root) {
        return this._folderConfigurations.get(root.uri);
      }
    }
    return void 0;
  }
  toData() {
    return {
      defaults: {
        contents: this._defaultConfiguration.contents,
        overrides: this._defaultConfiguration.overrides,
        keys: this._defaultConfiguration.keys
      },
      policy: {
        contents: this._policyConfiguration.contents,
        overrides: this._policyConfiguration.overrides,
        keys: this._policyConfiguration.keys
      },
      application: {
        contents: this.applicationConfiguration.contents,
        overrides: this.applicationConfiguration.overrides,
        keys: this.applicationConfiguration.keys
      },
      user: {
        contents: this.userConfiguration.contents,
        overrides: this.userConfiguration.overrides,
        keys: this.userConfiguration.keys
      },
      workspace: {
        contents: this._workspaceConfiguration.contents,
        overrides: this._workspaceConfiguration.overrides,
        keys: this._workspaceConfiguration.keys
      },
      folders: [...this._folderConfigurations.keys()].reduce((result, folder) => {
        const { contents, overrides, keys } = this._folderConfigurations.get(folder);
        result.push([folder, { contents, overrides, keys }]);
        return result;
      }, [])
    };
  }
  static parse(data) {
    const defaultConfiguration = this.parseConfigurationModel(data.defaults);
    const policyConfiguration = this.parseConfigurationModel(data.policy);
    const applicationConfiguration = this.parseConfigurationModel(data.application);
    const userConfiguration = this.parseConfigurationModel(data.user);
    const workspaceConfiguration = this.parseConfigurationModel(data.workspace);
    const folders = data.folders.reduce((result, value) => {
      result.set(URI.revive(value[0]), this.parseConfigurationModel(value[1]));
      return result;
    }, new ResourceMap());
    return new Configuration(defaultConfiguration, policyConfiguration, applicationConfiguration, userConfiguration, new ConfigurationModel(), workspaceConfiguration, folders, new ConfigurationModel(), new ResourceMap(), false);
  }
  static parseConfigurationModel(model) {
    return new ConfigurationModel(model.contents, model.keys, model.overrides).freeze();
  }
};
var ConfigurationChangeEvent = class {
  constructor(change, previous, currentConfiguraiton, currentWorkspace) {
    this.change = change;
    this.previous = previous;
    this.currentConfiguraiton = currentConfiguraiton;
    this.currentWorkspace = currentWorkspace;
    this._previousConfiguration = void 0;
    const keysSet = /* @__PURE__ */ new Set();
    change.keys.forEach((key) => keysSet.add(key));
    change.overrides.forEach(([, keys]) => keys.forEach((key) => keysSet.add(key)));
    this.affectedKeys = [...keysSet.values()];
    const configurationModel = new ConfigurationModel();
    this.affectedKeys.forEach((key) => configurationModel.setValue(key, {}));
    this.affectedKeysTree = configurationModel.contents;
  }
  get previousConfiguration() {
    if (!this._previousConfiguration && this.previous) {
      this._previousConfiguration = Configuration.parse(this.previous.data);
    }
    return this._previousConfiguration;
  }
  affectsConfiguration(section, overrides) {
    var _a4;
    if (this.doesAffectedKeysTreeContains(this.affectedKeysTree, section)) {
      if (overrides) {
        const value1 = this.previousConfiguration ? this.previousConfiguration.getValue(section, overrides, (_a4 = this.previous) === null || _a4 === void 0 ? void 0 : _a4.workspace) : void 0;
        const value2 = this.currentConfiguraiton.getValue(section, overrides, this.currentWorkspace);
        return !equals2(value1, value2);
      }
      return true;
    }
    return false;
  }
  doesAffectedKeysTreeContains(affectedKeysTree, section) {
    let requestedTree = toValuesTree({ [section]: true }, () => {
    });
    let key;
    while (typeof requestedTree === "object" && (key = Object.keys(requestedTree)[0])) {
      affectedKeysTree = affectedKeysTree[key];
      if (!affectedKeysTree) {
        return false;
      }
      requestedTree = requestedTree[key];
    }
    return true;
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_contextkey();
init_instantiation();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/keybinding/common/abstractKeybindingService.js
init_define_process();
init_async();
init_event();
init_lifecycle();
init_nls();
var HIGH_FREQ_COMMANDS = /^(cursor|delete)/;
var AbstractKeybindingService = class extends Disposable {
  constructor(_contextKeyService, _commandService, _telemetryService, _notificationService, _logService) {
    super();
    this._contextKeyService = _contextKeyService;
    this._commandService = _commandService;
    this._telemetryService = _telemetryService;
    this._notificationService = _notificationService;
    this._logService = _logService;
    this._onDidUpdateKeybindings = this._register(new Emitter());
    this._currentChord = null;
    this._currentChordChecker = new IntervalTimer();
    this._currentChordStatusMessage = null;
    this._ignoreSingleModifiers = KeybindingModifierSet.EMPTY;
    this._currentSingleModifier = null;
    this._currentSingleModifierClearTimeout = new TimeoutTimer();
    this._logging = false;
  }
  get onDidUpdateKeybindings() {
    return this._onDidUpdateKeybindings ? this._onDidUpdateKeybindings.event : Event.None;
  }
  dispose() {
    super.dispose();
  }
  _log(str) {
    if (this._logging) {
      this._logService.info(`[KeybindingService]: ${str}`);
    }
  }
  getKeybindings() {
    return this._getResolver().getKeybindings();
  }
  lookupKeybinding(commandId, context) {
    const result = this._getResolver().lookupPrimaryKeybinding(commandId, context || this._contextKeyService);
    if (!result) {
      return void 0;
    }
    return result.resolvedKeybinding;
  }
  dispatchEvent(e, target) {
    return this._dispatch(e, target);
  }
  softDispatch(e, target) {
    this._log(`/ Soft dispatching keyboard event`);
    const keybinding = this.resolveKeyboardEvent(e);
    if (keybinding.isChord()) {
      console.warn("Unexpected keyboard event mapped to a chord");
      return null;
    }
    const [firstPart] = keybinding.getDispatchParts();
    if (firstPart === null) {
      this._log(`\\ Keyboard event cannot be dispatched`);
      return null;
    }
    const contextValue = this._contextKeyService.getContext(target);
    const currentChord = this._currentChord ? this._currentChord.keypress : null;
    return this._getResolver().resolve(contextValue, currentChord, firstPart);
  }
  _enterChordMode(firstPart, keypressLabel) {
    this._currentChord = {
      keypress: firstPart,
      label: keypressLabel
    };
    this._currentChordStatusMessage = this._notificationService.status(localize("first.chord", "({0}) was pressed. Waiting for second key of chord...", keypressLabel));
    const chordEnterTime = Date.now();
    this._currentChordChecker.cancelAndSet(() => {
      if (!this._documentHasFocus()) {
        this._leaveChordMode();
        return;
      }
      if (Date.now() - chordEnterTime > 5e3) {
        this._leaveChordMode();
      }
    }, 500);
  }
  _leaveChordMode() {
    if (this._currentChordStatusMessage) {
      this._currentChordStatusMessage.dispose();
      this._currentChordStatusMessage = null;
    }
    this._currentChordChecker.cancel();
    this._currentChord = null;
  }
  _dispatch(e, target) {
    return this._doDispatch(this.resolveKeyboardEvent(e), target, false);
  }
  _singleModifierDispatch(e, target) {
    const keybinding = this.resolveKeyboardEvent(e);
    const [singleModifier] = keybinding.getSingleModifierDispatchParts();
    if (singleModifier) {
      if (this._ignoreSingleModifiers.has(singleModifier)) {
        this._log(`+ Ignoring single modifier ${singleModifier} due to it being pressed together with other keys.`);
        this._ignoreSingleModifiers = KeybindingModifierSet.EMPTY;
        this._currentSingleModifierClearTimeout.cancel();
        this._currentSingleModifier = null;
        return false;
      }
      this._ignoreSingleModifiers = KeybindingModifierSet.EMPTY;
      if (this._currentSingleModifier === null) {
        this._log(`+ Storing single modifier for possible chord ${singleModifier}.`);
        this._currentSingleModifier = singleModifier;
        this._currentSingleModifierClearTimeout.cancelAndSet(() => {
          this._log(`+ Clearing single modifier due to 300ms elapsed.`);
          this._currentSingleModifier = null;
        }, 300);
        return false;
      }
      if (singleModifier === this._currentSingleModifier) {
        this._log(`/ Dispatching single modifier chord ${singleModifier} ${singleModifier}`);
        this._currentSingleModifierClearTimeout.cancel();
        this._currentSingleModifier = null;
        return this._doDispatch(keybinding, target, true);
      }
      this._log(`+ Clearing single modifier due to modifier mismatch: ${this._currentSingleModifier} ${singleModifier}`);
      this._currentSingleModifierClearTimeout.cancel();
      this._currentSingleModifier = null;
      return false;
    }
    const [firstPart] = keybinding.getParts();
    this._ignoreSingleModifiers = new KeybindingModifierSet(firstPart);
    if (this._currentSingleModifier !== null) {
      this._log(`+ Clearing single modifier due to other key up.`);
    }
    this._currentSingleModifierClearTimeout.cancel();
    this._currentSingleModifier = null;
    return false;
  }
  _doDispatch(keybinding, target, isSingleModiferChord = false) {
    let shouldPreventDefault = false;
    if (keybinding.isChord()) {
      console.warn("Unexpected keyboard event mapped to a chord");
      return false;
    }
    let firstPart = null;
    let currentChord = null;
    if (isSingleModiferChord) {
      const [dispatchKeyname] = keybinding.getSingleModifierDispatchParts();
      firstPart = dispatchKeyname;
      currentChord = dispatchKeyname;
    } else {
      [firstPart] = keybinding.getDispatchParts();
      currentChord = this._currentChord ? this._currentChord.keypress : null;
    }
    if (firstPart === null) {
      this._log(`\\ Keyboard event cannot be dispatched in keydown phase.`);
      return shouldPreventDefault;
    }
    const contextValue = this._contextKeyService.getContext(target);
    const keypressLabel = keybinding.getLabel();
    const resolveResult = this._getResolver().resolve(contextValue, currentChord, firstPart);
    this._logService.trace("KeybindingService#dispatch", keypressLabel, resolveResult === null || resolveResult === void 0 ? void 0 : resolveResult.commandId);
    if (resolveResult && resolveResult.enterChord) {
      shouldPreventDefault = true;
      this._enterChordMode(firstPart, keypressLabel);
      this._log(`+ Entering chord mode...`);
      return shouldPreventDefault;
    }
    if (this._currentChord) {
      if (!resolveResult || !resolveResult.commandId) {
        this._log(`+ Leaving chord mode: Nothing bound to "${this._currentChord.label} ${keypressLabel}".`);
        this._notificationService.status(localize("missing.chord", "The key combination ({0}, {1}) is not a command.", this._currentChord.label, keypressLabel), { hideAfter: 10 * 1e3 });
        shouldPreventDefault = true;
      }
    }
    this._leaveChordMode();
    if (resolveResult && resolveResult.commandId) {
      if (!resolveResult.bubble) {
        shouldPreventDefault = true;
      }
      this._log(`+ Invoking command ${resolveResult.commandId}.`);
      if (typeof resolveResult.commandArgs === "undefined") {
        this._commandService.executeCommand(resolveResult.commandId).then(void 0, (err) => this._notificationService.warn(err));
      } else {
        this._commandService.executeCommand(resolveResult.commandId, resolveResult.commandArgs).then(void 0, (err) => this._notificationService.warn(err));
      }
      if (!HIGH_FREQ_COMMANDS.test(resolveResult.commandId)) {
        this._telemetryService.publicLog2("workbenchActionExecuted", { id: resolveResult.commandId, from: "keybinding" });
      }
    }
    return shouldPreventDefault;
  }
  mightProducePrintableCharacter(event) {
    if (event.ctrlKey || event.metaKey) {
      return false;
    }
    if (event.keyCode >= 31 && event.keyCode <= 56 || event.keyCode >= 21 && event.keyCode <= 30) {
      return true;
    }
    return false;
  }
};
var KeybindingModifierSet = class {
  constructor(source) {
    this._ctrlKey = source ? source.ctrlKey : false;
    this._shiftKey = source ? source.shiftKey : false;
    this._altKey = source ? source.altKey : false;
    this._metaKey = source ? source.metaKey : false;
  }
  has(modifier) {
    switch (modifier) {
      case "ctrl":
        return this._ctrlKey;
      case "shift":
        return this._shiftKey;
      case "alt":
        return this._altKey;
      case "meta":
        return this._metaKey;
    }
  }
};
KeybindingModifierSet.EMPTY = new KeybindingModifierSet(null);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/keybinding/common/keybindingResolver.js
init_define_process();
init_contextkey();
var KeybindingResolver = class {
  constructor(defaultKeybindings, overrides, log2) {
    this._log = log2;
    this._defaultKeybindings = defaultKeybindings;
    this._defaultBoundCommands = /* @__PURE__ */ new Map();
    for (const defaultKeybinding of defaultKeybindings) {
      const command = defaultKeybinding.command;
      if (command && command.charAt(0) !== "-") {
        this._defaultBoundCommands.set(command, true);
      }
    }
    this._map = /* @__PURE__ */ new Map();
    this._lookupMap = /* @__PURE__ */ new Map();
    this._keybindings = KeybindingResolver.handleRemovals([].concat(defaultKeybindings).concat(overrides));
    for (let i = 0, len = this._keybindings.length; i < len; i++) {
      const k = this._keybindings[i];
      if (k.keypressParts.length === 0) {
        continue;
      }
      if (k.when && k.when.type === 0) {
        continue;
      }
      this._addKeyPress(k.keypressParts[0], k);
    }
  }
  static _isTargetedForRemoval(defaultKb, keypressFirstPart, keypressChordPart, when) {
    if (keypressFirstPart && defaultKb.keypressParts[0] !== keypressFirstPart) {
      return false;
    }
    if (keypressChordPart && defaultKb.keypressParts[1] !== keypressChordPart) {
      return false;
    }
    if (when) {
      if (!defaultKb.when) {
        return false;
      }
      if (!expressionsAreEqualWithConstantSubstitution(when, defaultKb.when)) {
        return false;
      }
    }
    return true;
  }
  static handleRemovals(rules) {
    const removals = /* @__PURE__ */ new Map();
    for (let i = 0, len = rules.length; i < len; i++) {
      const rule = rules[i];
      if (rule.command && rule.command.charAt(0) === "-") {
        const command = rule.command.substring(1);
        if (!removals.has(command)) {
          removals.set(command, [rule]);
        } else {
          removals.get(command).push(rule);
        }
      }
    }
    if (removals.size === 0) {
      return rules;
    }
    const result = [];
    for (let i = 0, len = rules.length; i < len; i++) {
      const rule = rules[i];
      if (!rule.command || rule.command.length === 0) {
        result.push(rule);
        continue;
      }
      if (rule.command.charAt(0) === "-") {
        continue;
      }
      const commandRemovals = removals.get(rule.command);
      if (!commandRemovals || !rule.isDefault) {
        result.push(rule);
        continue;
      }
      let isRemoved = false;
      for (const commandRemoval of commandRemovals) {
        const keypressFirstPart = commandRemoval.keypressParts[0];
        const keypressChordPart = commandRemoval.keypressParts[1];
        const when = commandRemoval.when;
        if (this._isTargetedForRemoval(rule, keypressFirstPart, keypressChordPart, when)) {
          isRemoved = true;
          break;
        }
      }
      if (!isRemoved) {
        result.push(rule);
        continue;
      }
    }
    return result;
  }
  _addKeyPress(keypress, item) {
    const conflicts = this._map.get(keypress);
    if (typeof conflicts === "undefined") {
      this._map.set(keypress, [item]);
      this._addToLookupMap(item);
      return;
    }
    for (let i = conflicts.length - 1; i >= 0; i--) {
      const conflict = conflicts[i];
      if (conflict.command === item.command) {
        continue;
      }
      const conflictIsChord = conflict.keypressParts.length > 1;
      const itemIsChord = item.keypressParts.length > 1;
      if (conflictIsChord && itemIsChord && conflict.keypressParts[1] !== item.keypressParts[1]) {
        continue;
      }
      if (KeybindingResolver.whenIsEntirelyIncluded(conflict.when, item.when)) {
        this._removeFromLookupMap(conflict);
      }
    }
    conflicts.push(item);
    this._addToLookupMap(item);
  }
  _addToLookupMap(item) {
    if (!item.command) {
      return;
    }
    let arr = this._lookupMap.get(item.command);
    if (typeof arr === "undefined") {
      arr = [item];
      this._lookupMap.set(item.command, arr);
    } else {
      arr.push(item);
    }
  }
  _removeFromLookupMap(item) {
    if (!item.command) {
      return;
    }
    const arr = this._lookupMap.get(item.command);
    if (typeof arr === "undefined") {
      return;
    }
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === item) {
        arr.splice(i, 1);
        return;
      }
    }
  }
  static whenIsEntirelyIncluded(a, b) {
    if (!b || b.type === 1) {
      return true;
    }
    if (!a || a.type === 1) {
      return false;
    }
    return implies(a, b);
  }
  getKeybindings() {
    return this._keybindings;
  }
  lookupPrimaryKeybinding(commandId, context) {
    const items = this._lookupMap.get(commandId);
    if (typeof items === "undefined" || items.length === 0) {
      return null;
    }
    if (items.length === 1) {
      return items[0];
    }
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      if (context.contextMatchesRules(item.when)) {
        return item;
      }
    }
    return items[items.length - 1];
  }
  resolve(context, currentChord, keypress) {
    this._log(`| Resolving ${keypress}${currentChord ? ` chorded from ${currentChord}` : ``}`);
    let lookupMap = null;
    if (currentChord !== null) {
      const candidates = this._map.get(currentChord);
      if (typeof candidates === "undefined") {
        this._log(`\\ No keybinding entries.`);
        return null;
      }
      lookupMap = [];
      for (let i = 0, len = candidates.length; i < len; i++) {
        const candidate = candidates[i];
        if (candidate.keypressParts[1] === keypress) {
          lookupMap.push(candidate);
        }
      }
    } else {
      const candidates = this._map.get(keypress);
      if (typeof candidates === "undefined") {
        this._log(`\\ No keybinding entries.`);
        return null;
      }
      lookupMap = candidates;
    }
    const result = this._findCommand(context, lookupMap);
    if (!result) {
      this._log(`\\ From ${lookupMap.length} keybinding entries, no when clauses matched the context.`);
      return null;
    }
    if (currentChord === null && result.keypressParts.length > 1 && result.keypressParts[1] !== null) {
      this._log(`\\ From ${lookupMap.length} keybinding entries, matched chord, when: ${printWhenExplanation(result.when)}, source: ${printSourceExplanation(result)}.`);
      return {
        enterChord: true,
        leaveChord: false,
        commandId: null,
        commandArgs: null,
        bubble: false
      };
    }
    this._log(`\\ From ${lookupMap.length} keybinding entries, matched ${result.command}, when: ${printWhenExplanation(result.when)}, source: ${printSourceExplanation(result)}.`);
    return {
      enterChord: false,
      leaveChord: result.keypressParts.length > 1,
      commandId: result.command,
      commandArgs: result.commandArgs,
      bubble: result.bubble
    };
  }
  _findCommand(context, matches) {
    for (let i = matches.length - 1; i >= 0; i--) {
      const k = matches[i];
      if (!KeybindingResolver._contextMatchesRules(context, k.when)) {
        continue;
      }
      return k;
    }
    return null;
  }
  static _contextMatchesRules(context, rules) {
    if (!rules) {
      return true;
    }
    return rules.evaluate(context);
  }
};
function printWhenExplanation(when) {
  if (!when) {
    return `no when condition`;
  }
  return `${when.serialize()}`;
}
function printSourceExplanation(kb) {
  return kb.extensionId ? kb.isBuiltinExtension ? `built-in extension ${kb.extensionId}` : `user extension ${kb.extensionId}` : kb.isDefault ? `built-in` : `user`;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_keybindingsRegistry();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/keybinding/common/resolvedKeybindingItem.js
init_define_process();
var ResolvedKeybindingItem = class {
  constructor(resolvedKeybinding, command, commandArgs, when, isDefault, extensionId, isBuiltinExtension) {
    this._resolvedKeybindingItemBrand = void 0;
    this.resolvedKeybinding = resolvedKeybinding;
    this.keypressParts = resolvedKeybinding ? removeElementsAfterNulls(resolvedKeybinding.getDispatchParts()) : [];
    if (resolvedKeybinding && this.keypressParts.length === 0) {
      this.keypressParts = removeElementsAfterNulls(resolvedKeybinding.getSingleModifierDispatchParts());
    }
    this.bubble = command ? command.charCodeAt(0) === 94 : false;
    this.command = this.bubble ? command.substr(1) : command;
    this.commandArgs = commandArgs;
    this.when = when;
    this.isDefault = isDefault;
    this.extensionId = extensionId;
    this.isBuiltinExtension = isBuiltinExtension;
  }
};
function removeElementsAfterNulls(arr) {
  const result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    const element = arr[i];
    if (!element) {
      return result;
    }
    result.push(element);
  }
  return result;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/keybinding/common/usLayoutResolvedKeybinding.js
init_define_process();
init_keyCodes();
init_keybindings();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/keybinding/common/baseResolvedKeybinding.js
init_define_process();
init_errors();
init_keybindings();
var BaseResolvedKeybinding = class extends ResolvedKeybinding {
  constructor(os, parts) {
    super();
    if (parts.length === 0) {
      throw illegalArgument(`parts`);
    }
    this._os = os;
    this._parts = parts;
  }
  getLabel() {
    return UILabelProvider.toLabel(this._os, this._parts, (keybinding) => this._getLabel(keybinding));
  }
  getAriaLabel() {
    return AriaLabelProvider.toLabel(this._os, this._parts, (keybinding) => this._getAriaLabel(keybinding));
  }
  getElectronAccelerator() {
    if (this._parts.length > 1) {
      return null;
    }
    if (this._parts[0].isDuplicateModifierCase()) {
      return null;
    }
    return ElectronAcceleratorLabelProvider.toLabel(this._os, this._parts, (keybinding) => this._getElectronAccelerator(keybinding));
  }
  isChord() {
    return this._parts.length > 1;
  }
  getParts() {
    return this._parts.map((keybinding) => this._getPart(keybinding));
  }
  _getPart(keybinding) {
    return new ResolvedKeybindingPart(keybinding.ctrlKey, keybinding.shiftKey, keybinding.altKey, keybinding.metaKey, this._getLabel(keybinding), this._getAriaLabel(keybinding));
  }
  getDispatchParts() {
    return this._parts.map((keybinding) => this._getDispatchPart(keybinding));
  }
  getSingleModifierDispatchParts() {
    return this._parts.map((keybinding) => this._getSingleModifierDispatchPart(keybinding));
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/keybinding/common/usLayoutResolvedKeybinding.js
var USLayoutResolvedKeybinding = class extends BaseResolvedKeybinding {
  constructor(actual, os) {
    super(os, actual.parts);
  }
  _keyCodeToUILabel(keyCode) {
    if (this._os === 2) {
      switch (keyCode) {
        case 15:
          return "\u2190";
        case 16:
          return "\u2191";
        case 17:
          return "\u2192";
        case 18:
          return "\u2193";
      }
    }
    return KeyCodeUtils.toString(keyCode);
  }
  _getLabel(keybinding) {
    if (keybinding.isDuplicateModifierCase()) {
      return "";
    }
    return this._keyCodeToUILabel(keybinding.keyCode);
  }
  _getAriaLabel(keybinding) {
    if (keybinding.isDuplicateModifierCase()) {
      return "";
    }
    return KeyCodeUtils.toString(keybinding.keyCode);
  }
  _getElectronAccelerator(keybinding) {
    return KeyCodeUtils.toElectronAccelerator(keybinding.keyCode);
  }
  _getDispatchPart(keybinding) {
    return USLayoutResolvedKeybinding.getDispatchStr(keybinding);
  }
  static getDispatchStr(keybinding) {
    if (keybinding.isModifierKey()) {
      return null;
    }
    let result = "";
    if (keybinding.ctrlKey) {
      result += "ctrl+";
    }
    if (keybinding.shiftKey) {
      result += "shift+";
    }
    if (keybinding.altKey) {
      result += "alt+";
    }
    if (keybinding.metaKey) {
      result += "meta+";
    }
    result += KeyCodeUtils.toString(keybinding.keyCode);
    return result;
  }
  _getSingleModifierDispatchPart(keybinding) {
    if (keybinding.keyCode === 5 && !keybinding.shiftKey && !keybinding.altKey && !keybinding.metaKey) {
      return "ctrl";
    }
    if (keybinding.keyCode === 4 && !keybinding.ctrlKey && !keybinding.altKey && !keybinding.metaKey) {
      return "shift";
    }
    if (keybinding.keyCode === 6 && !keybinding.ctrlKey && !keybinding.shiftKey && !keybinding.metaKey) {
      return "alt";
    }
    if (keybinding.keyCode === 57 && !keybinding.ctrlKey && !keybinding.shiftKey && !keybinding.altKey) {
      return "meta";
    }
    return null;
  }
  static _scanCodeToKeyCode(scanCode) {
    const immutableKeyCode = IMMUTABLE_CODE_TO_KEY_CODE[scanCode];
    if (immutableKeyCode !== -1) {
      return immutableKeyCode;
    }
    switch (scanCode) {
      case 10:
        return 31;
      case 11:
        return 32;
      case 12:
        return 33;
      case 13:
        return 34;
      case 14:
        return 35;
      case 15:
        return 36;
      case 16:
        return 37;
      case 17:
        return 38;
      case 18:
        return 39;
      case 19:
        return 40;
      case 20:
        return 41;
      case 21:
        return 42;
      case 22:
        return 43;
      case 23:
        return 44;
      case 24:
        return 45;
      case 25:
        return 46;
      case 26:
        return 47;
      case 27:
        return 48;
      case 28:
        return 49;
      case 29:
        return 50;
      case 30:
        return 51;
      case 31:
        return 52;
      case 32:
        return 53;
      case 33:
        return 54;
      case 34:
        return 55;
      case 35:
        return 56;
      case 36:
        return 22;
      case 37:
        return 23;
      case 38:
        return 24;
      case 39:
        return 25;
      case 40:
        return 26;
      case 41:
        return 27;
      case 42:
        return 28;
      case 43:
        return 29;
      case 44:
        return 30;
      case 45:
        return 21;
      case 51:
        return 83;
      case 52:
        return 81;
      case 53:
        return 87;
      case 54:
        return 89;
      case 55:
        return 88;
      case 56:
        return 0;
      case 57:
        return 80;
      case 58:
        return 90;
      case 59:
        return 86;
      case 60:
        return 82;
      case 61:
        return 84;
      case 62:
        return 85;
      case 106:
        return 92;
    }
    return 0;
  }
  static _resolveSimpleUserBinding(binding) {
    if (!binding) {
      return null;
    }
    if (binding instanceof SimpleKeybinding) {
      return binding;
    }
    const keyCode = this._scanCodeToKeyCode(binding.scanCode);
    if (keyCode === 0) {
      return null;
    }
    return new SimpleKeybinding(binding.ctrlKey, binding.shiftKey, binding.altKey, binding.metaKey, keyCode);
  }
  static resolveUserBinding(input, os) {
    const parts = removeElementsAfterNulls(input.map((keybinding) => this._resolveSimpleUserBinding(keybinding)));
    if (parts.length > 0) {
      return [new USLayoutResolvedKeybinding(new ChordKeybinding(parts), os)];
    }
    return [];
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_progress();
init_telemetry();
init_resources();
init_codeEditorService();
init_log();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextViewService.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.js
init_define_process();
init_canIUse();
init_dom();
init_lifecycle();
init_platform();
var LayoutAnchorMode;
(function(LayoutAnchorMode2) {
  LayoutAnchorMode2[LayoutAnchorMode2["AVOID"] = 0] = "AVOID";
  LayoutAnchorMode2[LayoutAnchorMode2["ALIGN"] = 1] = "ALIGN";
})(LayoutAnchorMode || (LayoutAnchorMode = {}));
function layout(viewportSize, viewSize, anchor) {
  const layoutAfterAnchorBoundary = anchor.mode === LayoutAnchorMode.ALIGN ? anchor.offset : anchor.offset + anchor.size;
  const layoutBeforeAnchorBoundary = anchor.mode === LayoutAnchorMode.ALIGN ? anchor.offset + anchor.size : anchor.offset;
  if (anchor.position === 0) {
    if (viewSize <= viewportSize - layoutAfterAnchorBoundary) {
      return layoutAfterAnchorBoundary;
    }
    if (viewSize <= layoutBeforeAnchorBoundary) {
      return layoutBeforeAnchorBoundary - viewSize;
    }
    return Math.max(viewportSize - viewSize, 0);
  } else {
    if (viewSize <= layoutBeforeAnchorBoundary) {
      return layoutBeforeAnchorBoundary - viewSize;
    }
    if (viewSize <= viewportSize - layoutAfterAnchorBoundary) {
      return layoutAfterAnchorBoundary;
    }
    return 0;
  }
}
var ContextView = class extends Disposable {
  constructor(container, domPosition) {
    super();
    this.container = null;
    this.delegate = null;
    this.toDisposeOnClean = Disposable.None;
    this.toDisposeOnSetContainer = Disposable.None;
    this.shadowRoot = null;
    this.shadowRootHostElement = null;
    this.view = $(".context-view");
    this.useFixedPosition = false;
    this.useShadowDOM = false;
    hide(this.view);
    this.setContainer(container, domPosition);
    this._register(toDisposable(() => this.setContainer(null, 1)));
  }
  setContainer(container, domPosition) {
    var _a4;
    if (this.container) {
      this.toDisposeOnSetContainer.dispose();
      if (this.shadowRoot) {
        this.shadowRoot.removeChild(this.view);
        this.shadowRoot = null;
        (_a4 = this.shadowRootHostElement) === null || _a4 === void 0 ? void 0 : _a4.remove();
        this.shadowRootHostElement = null;
      } else {
        this.container.removeChild(this.view);
      }
      this.container = null;
    }
    if (container) {
      this.container = container;
      this.useFixedPosition = domPosition !== 1;
      this.useShadowDOM = domPosition === 3;
      if (this.useShadowDOM) {
        this.shadowRootHostElement = $(".shadow-root-host");
        this.container.appendChild(this.shadowRootHostElement);
        this.shadowRoot = this.shadowRootHostElement.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = SHADOW_ROOT_CSS;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.view);
        this.shadowRoot.appendChild($("slot"));
      } else {
        this.container.appendChild(this.view);
      }
      const toDisposeOnSetContainer = new DisposableStore();
      ContextView.BUBBLE_UP_EVENTS.forEach((event) => {
        toDisposeOnSetContainer.add(addStandardDisposableListener(this.container, event, (e) => {
          this.onDOMEvent(e, false);
        }));
      });
      ContextView.BUBBLE_DOWN_EVENTS.forEach((event) => {
        toDisposeOnSetContainer.add(addStandardDisposableListener(this.container, event, (e) => {
          this.onDOMEvent(e, true);
        }, true));
      });
      this.toDisposeOnSetContainer = toDisposeOnSetContainer;
    }
  }
  show(delegate) {
    var _a4, _b;
    if (this.isVisible()) {
      this.hide();
    }
    clearNode(this.view);
    this.view.className = "context-view";
    this.view.style.top = "0px";
    this.view.style.left = "0px";
    this.view.style.zIndex = "2575";
    this.view.style.position = this.useFixedPosition ? "fixed" : "absolute";
    show(this.view);
    this.toDisposeOnClean = delegate.render(this.view) || Disposable.None;
    this.delegate = delegate;
    this.doLayout();
    (_b = (_a4 = this.delegate).focus) === null || _b === void 0 ? void 0 : _b.call(_a4);
  }
  getViewElement() {
    return this.view;
  }
  layout() {
    if (!this.isVisible()) {
      return;
    }
    if (this.delegate.canRelayout === false && !(isIOS && BrowserFeatures.pointerEvents)) {
      this.hide();
      return;
    }
    if (this.delegate.layout) {
      this.delegate.layout();
    }
    this.doLayout();
  }
  doLayout() {
    if (!this.isVisible()) {
      return;
    }
    const anchor = this.delegate.getAnchor();
    let around;
    if (isHTMLElement(anchor)) {
      const elementPosition = getDomNodePagePosition(anchor);
      const zoom = getDomNodeZoomLevel(anchor);
      around = {
        top: elementPosition.top * zoom,
        left: elementPosition.left * zoom,
        width: elementPosition.width * zoom,
        height: elementPosition.height * zoom
      };
    } else {
      around = {
        top: anchor.y,
        left: anchor.x,
        width: anchor.width || 1,
        height: anchor.height || 2
      };
    }
    const viewSizeWidth = getTotalWidth(this.view);
    const viewSizeHeight = getTotalHeight(this.view);
    const anchorPosition = this.delegate.anchorPosition || 0;
    const anchorAlignment = this.delegate.anchorAlignment || 0;
    const anchorAxisAlignment = this.delegate.anchorAxisAlignment || 0;
    let top;
    let left;
    if (anchorAxisAlignment === 0) {
      const verticalAnchor = { offset: around.top - window.pageYOffset, size: around.height, position: anchorPosition === 0 ? 0 : 1 };
      const horizontalAnchor = { offset: around.left, size: around.width, position: anchorAlignment === 0 ? 0 : 1, mode: LayoutAnchorMode.ALIGN };
      top = layout(window.innerHeight, viewSizeHeight, verticalAnchor) + window.pageYOffset;
      if (Range2.intersects({ start: top, end: top + viewSizeHeight }, { start: verticalAnchor.offset, end: verticalAnchor.offset + verticalAnchor.size })) {
        horizontalAnchor.mode = LayoutAnchorMode.AVOID;
      }
      left = layout(window.innerWidth, viewSizeWidth, horizontalAnchor);
    } else {
      const horizontalAnchor = { offset: around.left, size: around.width, position: anchorAlignment === 0 ? 0 : 1 };
      const verticalAnchor = { offset: around.top, size: around.height, position: anchorPosition === 0 ? 0 : 1, mode: LayoutAnchorMode.ALIGN };
      left = layout(window.innerWidth, viewSizeWidth, horizontalAnchor);
      if (Range2.intersects({ start: left, end: left + viewSizeWidth }, { start: horizontalAnchor.offset, end: horizontalAnchor.offset + horizontalAnchor.size })) {
        verticalAnchor.mode = LayoutAnchorMode.AVOID;
      }
      top = layout(window.innerHeight, viewSizeHeight, verticalAnchor) + window.pageYOffset;
    }
    this.view.classList.remove("top", "bottom", "left", "right");
    this.view.classList.add(anchorPosition === 0 ? "bottom" : "top");
    this.view.classList.add(anchorAlignment === 0 ? "left" : "right");
    this.view.classList.toggle("fixed", this.useFixedPosition);
    const containerPosition = getDomNodePagePosition(this.container);
    this.view.style.top = `${top - (this.useFixedPosition ? getDomNodePagePosition(this.view).top : containerPosition.top)}px`;
    this.view.style.left = `${left - (this.useFixedPosition ? getDomNodePagePosition(this.view).left : containerPosition.left)}px`;
    this.view.style.width = "initial";
  }
  hide(data) {
    const delegate = this.delegate;
    this.delegate = null;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.onHide) {
      delegate.onHide(data);
    }
    this.toDisposeOnClean.dispose();
    hide(this.view);
  }
  isVisible() {
    return !!this.delegate;
  }
  onDOMEvent(e, onCapture) {
    if (this.delegate) {
      if (this.delegate.onDOMEvent) {
        this.delegate.onDOMEvent(e, document.activeElement);
      } else if (onCapture && !isAncestor(e.target, this.container)) {
        this.hide();
      }
    }
  }
  dispose() {
    this.hide();
    super.dispose();
  }
};
ContextView.BUBBLE_UP_EVENTS = ["click", "keydown", "focus", "blur"];
ContextView.BUBBLE_DOWN_EVENTS = ["click"];
var SHADOW_ROOT_CSS = `
	:host {
		all: initial; /* 1st rule so subsequent properties are reset. */
	}

	@font-face {
		font-family: "codicon";
		font-display: block;
		src: url("./codicon.ttf?5d4d76ab2ce5108968ad644d591a16a6") format("truetype");
	}

	.codicon[class*='codicon-'] {
		font: normal normal normal 16px/1 codicon;
		display: inline-block;
		text-decoration: none;
		text-rendering: auto;
		text-align: center;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}

	:host {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "HelveticaNeue-Light", system-ui, "Ubuntu", "Droid Sans", sans-serif;
	}

	:host-context(.mac) { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
	:host-context(.mac:lang(zh-Hans)) { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", sans-serif; }
	:host-context(.mac:lang(zh-Hant)) { font-family: -apple-system, BlinkMacSystemFont, "PingFang TC", sans-serif; }
	:host-context(.mac:lang(ja)) { font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic Pro", sans-serif; }
	:host-context(.mac:lang(ko)) { font-family: -apple-system, BlinkMacSystemFont, "Nanum Gothic", "Apple SD Gothic Neo", "AppleGothic", sans-serif; }

	:host-context(.windows) { font-family: "Segoe WPC", "Segoe UI", sans-serif; }
	:host-context(.windows:lang(zh-Hans)) { font-family: "Segoe WPC", "Segoe UI", "Microsoft YaHei", sans-serif; }
	:host-context(.windows:lang(zh-Hant)) { font-family: "Segoe WPC", "Segoe UI", "Microsoft Jhenghei", sans-serif; }
	:host-context(.windows:lang(ja)) { font-family: "Segoe WPC", "Segoe UI", "Yu Gothic UI", "Meiryo UI", sans-serif; }
	:host-context(.windows:lang(ko)) { font-family: "Segoe WPC", "Segoe UI", "Malgun Gothic", "Dotom", sans-serif; }

	:host-context(.linux) { font-family: system-ui, "Ubuntu", "Droid Sans", sans-serif; }
	:host-context(.linux:lang(zh-Hans)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans SC", "Source Han Sans CN", "Source Han Sans", sans-serif; }
	:host-context(.linux:lang(zh-Hant)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans TC", "Source Han Sans TW", "Source Han Sans", sans-serif; }
	:host-context(.linux:lang(ja)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans J", "Source Han Sans JP", "Source Han Sans", sans-serif; }
	:host-context(.linux:lang(ko)) { font-family: system-ui, "Ubuntu", "Droid Sans", "Source Han Sans K", "Source Han Sans JR", "Source Han Sans", "UnDotum", "FBaekmuk Gulim", sans-serif; }
`;

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextViewService.js
init_lifecycle();
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param7 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var ContextViewService = class ContextViewService2 extends Disposable {
  constructor(layoutService) {
    super();
    this.layoutService = layoutService;
    this.currentViewDisposable = Disposable.None;
    this.container = layoutService.hasContainer ? layoutService.container : null;
    this.contextView = this._register(new ContextView(this.container, 1));
    this.layout();
    this._register(layoutService.onDidLayout(() => this.layout()));
  }
  setContainer(container, domPosition) {
    this.contextView.setContainer(container, domPosition || 1);
  }
  showContextView(delegate, container, shadowRoot) {
    if (container) {
      if (container !== this.container || this.shadowRoot !== shadowRoot) {
        this.container = container;
        this.setContainer(container, shadowRoot ? 3 : 2);
      }
    } else {
      if (this.layoutService.hasContainer && this.container !== this.layoutService.container) {
        this.container = this.layoutService.container;
        this.setContainer(this.container, 1);
      }
    }
    this.shadowRoot = shadowRoot;
    this.contextView.show(delegate);
    const disposable = toDisposable(() => {
      if (this.currentViewDisposable === disposable) {
        this.hideContextView();
      }
    });
    this.currentViewDisposable = disposable;
    return disposable;
  }
  getContextViewElement() {
    return this.contextView.getViewElement();
  }
  layout() {
    this.contextView.layout();
  }
  hideContextView(data) {
    this.contextView.hide(data);
  }
};
ContextViewService = __decorate7([
  __param7(0, ILayoutService)
], ContextViewService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languageService.js
init_define_process();
init_event();
init_lifecycle();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languagesRegistry.js
init_define_process();
init_errors();
init_event();
init_lifecycle();
init_strings();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languagesAssociations.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/common/glob.js
init_define_process();
init_async();
init_extpath();
init_map();
init_path();
init_platform();
init_strings();
var __awaiter7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var GLOBSTAR = "**";
var GLOB_SPLIT = "/";
var PATH_REGEX = "[/\\\\]";
var NO_PATH_REGEX = "[^/\\\\]";
var ALL_FORWARD_SLASHES = /\//g;
function starsToRegExp(starCount, isLastPattern) {
  switch (starCount) {
    case 0:
      return "";
    case 1:
      return `${NO_PATH_REGEX}*?`;
    default:
      return `(?:${PATH_REGEX}|${NO_PATH_REGEX}+${PATH_REGEX}${isLastPattern ? `|${PATH_REGEX}${NO_PATH_REGEX}+` : ""})*?`;
  }
}
function splitGlobAware(pattern, splitChar) {
  if (!pattern) {
    return [];
  }
  const segments = [];
  let inBraces = false;
  let inBrackets = false;
  let curVal = "";
  for (const char of pattern) {
    switch (char) {
      case splitChar:
        if (!inBraces && !inBrackets) {
          segments.push(curVal);
          curVal = "";
          continue;
        }
        break;
      case "{":
        inBraces = true;
        break;
      case "}":
        inBraces = false;
        break;
      case "[":
        inBrackets = true;
        break;
      case "]":
        inBrackets = false;
        break;
    }
    curVal += char;
  }
  if (curVal) {
    segments.push(curVal);
  }
  return segments;
}
function parseRegExp(pattern) {
  if (!pattern) {
    return "";
  }
  let regEx = "";
  const segments = splitGlobAware(pattern, GLOB_SPLIT);
  if (segments.every((segment) => segment === GLOBSTAR)) {
    regEx = ".*";
  } else {
    let previousSegmentWasGlobStar = false;
    segments.forEach((segment, index) => {
      if (segment === GLOBSTAR) {
        if (previousSegmentWasGlobStar) {
          return;
        }
        regEx += starsToRegExp(2, index === segments.length - 1);
      } else {
        let inBraces = false;
        let braceVal = "";
        let inBrackets = false;
        let bracketVal = "";
        for (const char of segment) {
          if (char !== "}" && inBraces) {
            braceVal += char;
            continue;
          }
          if (inBrackets && (char !== "]" || !bracketVal)) {
            let res;
            if (char === "-") {
              res = char;
            } else if ((char === "^" || char === "!") && !bracketVal) {
              res = "^";
            } else if (char === GLOB_SPLIT) {
              res = "";
            } else {
              res = escapeRegExpCharacters(char);
            }
            bracketVal += res;
            continue;
          }
          switch (char) {
            case "{":
              inBraces = true;
              continue;
            case "[":
              inBrackets = true;
              continue;
            case "}": {
              const choices = splitGlobAware(braceVal, ",");
              const braceRegExp = `(?:${choices.map((choice) => parseRegExp(choice)).join("|")})`;
              regEx += braceRegExp;
              inBraces = false;
              braceVal = "";
              break;
            }
            case "]": {
              regEx += "[" + bracketVal + "]";
              inBrackets = false;
              bracketVal = "";
              break;
            }
            case "?":
              regEx += NO_PATH_REGEX;
              continue;
            case "*":
              regEx += starsToRegExp(1);
              continue;
            default:
              regEx += escapeRegExpCharacters(char);
          }
        }
        if (index < segments.length - 1 && (segments[index + 1] !== GLOBSTAR || index + 2 < segments.length)) {
          regEx += PATH_REGEX;
        }
      }
      previousSegmentWasGlobStar = segment === GLOBSTAR;
    });
  }
  return regEx;
}
var T1 = /^\*\*\/\*\.[\w\.-]+$/;
var T2 = /^\*\*\/([\w\.-]+)\/?$/;
var T3 = /^{\*\*\/\*?[\w\.-]+\/?(,\*\*\/\*?[\w\.-]+\/?)*}$/;
var T3_2 = /^{\*\*\/\*?[\w\.-]+(\/(\*\*)?)?(,\*\*\/\*?[\w\.-]+(\/(\*\*)?)?)*}$/;
var T4 = /^\*\*((\/[\w\.-]+)+)\/?$/;
var T5 = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/;
var CACHE = new LRUCache(1e4);
var FALSE = function() {
  return false;
};
var NULL = function() {
  return null;
};
function parsePattern(arg1, options) {
  if (!arg1) {
    return NULL;
  }
  let pattern;
  if (typeof arg1 !== "string") {
    pattern = arg1.pattern;
  } else {
    pattern = arg1;
  }
  pattern = pattern.trim();
  const patternKey = `${pattern}_${!!options.trimForExclusions}`;
  let parsedPattern = CACHE.get(patternKey);
  if (parsedPattern) {
    return wrapRelativePattern(parsedPattern, arg1);
  }
  let match2;
  if (T1.test(pattern)) {
    parsedPattern = trivia1(pattern.substr(4), pattern);
  } else if (match2 = T2.exec(trimForExclusions(pattern, options))) {
    parsedPattern = trivia2(match2[1], pattern);
  } else if ((options.trimForExclusions ? T3_2 : T3).test(pattern)) {
    parsedPattern = trivia3(pattern, options);
  } else if (match2 = T4.exec(trimForExclusions(pattern, options))) {
    parsedPattern = trivia4and5(match2[1].substr(1), pattern, true);
  } else if (match2 = T5.exec(trimForExclusions(pattern, options))) {
    parsedPattern = trivia4and5(match2[1], pattern, false);
  } else {
    parsedPattern = toRegExp(pattern);
  }
  CACHE.set(patternKey, parsedPattern);
  return wrapRelativePattern(parsedPattern, arg1);
}
function wrapRelativePattern(parsedPattern, arg2) {
  if (typeof arg2 === "string") {
    return parsedPattern;
  }
  const wrappedPattern = function(path, basename3) {
    if (!isEqualOrParent(path, arg2.base, !isLinux)) {
      return null;
    }
    return parsedPattern(path.substr(arg2.base.length + 1), basename3);
  };
  wrappedPattern.allBasenames = parsedPattern.allBasenames;
  wrappedPattern.allPaths = parsedPattern.allPaths;
  wrappedPattern.basenames = parsedPattern.basenames;
  wrappedPattern.patterns = parsedPattern.patterns;
  return wrappedPattern;
}
function trimForExclusions(pattern, options) {
  return options.trimForExclusions && pattern.endsWith("/**") ? pattern.substr(0, pattern.length - 2) : pattern;
}
function trivia1(base, pattern) {
  return function(path, basename3) {
    return typeof path === "string" && path.endsWith(base) ? pattern : null;
  };
}
function trivia2(base, pattern) {
  const slashBase = `/${base}`;
  const backslashBase = `\\${base}`;
  const parsedPattern = function(path, basename3) {
    if (typeof path !== "string") {
      return null;
    }
    if (basename3) {
      return basename3 === base ? pattern : null;
    }
    return path === base || path.endsWith(slashBase) || path.endsWith(backslashBase) ? pattern : null;
  };
  const basenames = [base];
  parsedPattern.basenames = basenames;
  parsedPattern.patterns = [pattern];
  parsedPattern.allBasenames = basenames;
  return parsedPattern;
}
function trivia3(pattern, options) {
  const parsedPatterns = aggregateBasenameMatches(pattern.slice(1, -1).split(",").map((pattern2) => parsePattern(pattern2, options)).filter((pattern2) => pattern2 !== NULL), pattern);
  const patternsLength = parsedPatterns.length;
  if (!patternsLength) {
    return NULL;
  }
  if (patternsLength === 1) {
    return parsedPatterns[0];
  }
  const parsedPattern = function(path, basename3) {
    for (let i = 0, n = parsedPatterns.length; i < n; i++) {
      if (parsedPatterns[i](path, basename3)) {
        return pattern;
      }
    }
    return null;
  };
  const withBasenames = parsedPatterns.find((pattern2) => !!pattern2.allBasenames);
  if (withBasenames) {
    parsedPattern.allBasenames = withBasenames.allBasenames;
  }
  const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
  if (allPaths.length) {
    parsedPattern.allPaths = allPaths;
  }
  return parsedPattern;
}
function trivia4and5(targetPath, pattern, matchPathEnds) {
  const usingPosixSep = sep === posix.sep;
  const nativePath = usingPosixSep ? targetPath : targetPath.replace(ALL_FORWARD_SLASHES, sep);
  const nativePathEnd = sep + nativePath;
  const targetPathEnd = posix.sep + targetPath;
  let parsedPattern;
  if (matchPathEnds) {
    parsedPattern = function(path, basename3) {
      return typeof path === "string" && (path === nativePath || path.endsWith(nativePathEnd) || !usingPosixSep && (path === targetPath || path.endsWith(targetPathEnd))) ? pattern : null;
    };
  } else {
    parsedPattern = function(path, basename3) {
      return typeof path === "string" && (path === nativePath || !usingPosixSep && path === targetPath) ? pattern : null;
    };
  }
  parsedPattern.allPaths = [(matchPathEnds ? "*/" : "./") + targetPath];
  return parsedPattern;
}
function toRegExp(pattern) {
  try {
    const regExp = new RegExp(`^${parseRegExp(pattern)}$`);
    return function(path) {
      regExp.lastIndex = 0;
      return typeof path === "string" && regExp.test(path) ? pattern : null;
    };
  } catch (error) {
    return NULL;
  }
}
function match(arg1, path, hasSibling) {
  if (!arg1 || typeof path !== "string") {
    return false;
  }
  return parse2(arg1)(path, void 0, hasSibling);
}
function parse2(arg1, options = {}) {
  if (!arg1) {
    return FALSE;
  }
  if (typeof arg1 === "string" || isRelativePattern(arg1)) {
    const parsedPattern = parsePattern(arg1, options);
    if (parsedPattern === NULL) {
      return FALSE;
    }
    const resultPattern = function(path, basename3) {
      return !!parsedPattern(path, basename3);
    };
    if (parsedPattern.allBasenames) {
      resultPattern.allBasenames = parsedPattern.allBasenames;
    }
    if (parsedPattern.allPaths) {
      resultPattern.allPaths = parsedPattern.allPaths;
    }
    return resultPattern;
  }
  return parsedExpression(arg1, options);
}
function isRelativePattern(obj) {
  const rp = obj;
  if (!rp) {
    return false;
  }
  return typeof rp.base === "string" && typeof rp.pattern === "string";
}
function parsedExpression(expression, options) {
  const parsedPatterns = aggregateBasenameMatches(Object.getOwnPropertyNames(expression).map((pattern) => parseExpressionPattern(pattern, expression[pattern], options)).filter((pattern) => pattern !== NULL));
  const patternsLength = parsedPatterns.length;
  if (!patternsLength) {
    return NULL;
  }
  if (!parsedPatterns.some((parsedPattern) => !!parsedPattern.requiresSiblings)) {
    if (patternsLength === 1) {
      return parsedPatterns[0];
    }
    const resultExpression2 = function(path, basename3) {
      let resultPromises = void 0;
      for (let i = 0, n = parsedPatterns.length; i < n; i++) {
        const result = parsedPatterns[i](path, basename3);
        if (typeof result === "string") {
          return result;
        }
        if (isThenable(result)) {
          if (!resultPromises) {
            resultPromises = [];
          }
          resultPromises.push(result);
        }
      }
      if (resultPromises) {
        return (() => __awaiter7(this, void 0, void 0, function* () {
          for (const resultPromise of resultPromises) {
            const result = yield resultPromise;
            if (typeof result === "string") {
              return result;
            }
          }
          return null;
        }))();
      }
      return null;
    };
    const withBasenames2 = parsedPatterns.find((pattern) => !!pattern.allBasenames);
    if (withBasenames2) {
      resultExpression2.allBasenames = withBasenames2.allBasenames;
    }
    const allPaths2 = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
    if (allPaths2.length) {
      resultExpression2.allPaths = allPaths2;
    }
    return resultExpression2;
  }
  const resultExpression = function(path, base, hasSibling) {
    let name = void 0;
    let resultPromises = void 0;
    for (let i = 0, n = parsedPatterns.length; i < n; i++) {
      const parsedPattern = parsedPatterns[i];
      if (parsedPattern.requiresSiblings && hasSibling) {
        if (!base) {
          base = basename(path);
        }
        if (!name) {
          name = base.substr(0, base.length - extname(path).length);
        }
      }
      const result = parsedPattern(path, base, name, hasSibling);
      if (typeof result === "string") {
        return result;
      }
      if (isThenable(result)) {
        if (!resultPromises) {
          resultPromises = [];
        }
        resultPromises.push(result);
      }
    }
    if (resultPromises) {
      return (() => __awaiter7(this, void 0, void 0, function* () {
        for (const resultPromise of resultPromises) {
          const result = yield resultPromise;
          if (typeof result === "string") {
            return result;
          }
        }
        return null;
      }))();
    }
    return null;
  };
  const withBasenames = parsedPatterns.find((pattern) => !!pattern.allBasenames);
  if (withBasenames) {
    resultExpression.allBasenames = withBasenames.allBasenames;
  }
  const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
  if (allPaths.length) {
    resultExpression.allPaths = allPaths;
  }
  return resultExpression;
}
function parseExpressionPattern(pattern, value, options) {
  if (value === false) {
    return NULL;
  }
  const parsedPattern = parsePattern(pattern, options);
  if (parsedPattern === NULL) {
    return NULL;
  }
  if (typeof value === "boolean") {
    return parsedPattern;
  }
  if (value) {
    const when = value.when;
    if (typeof when === "string") {
      const result = (path, basename3, name, hasSibling) => {
        if (!hasSibling || !parsedPattern(path, basename3)) {
          return null;
        }
        const clausePattern = when.replace("$(basename)", name);
        const matched = hasSibling(clausePattern);
        return isThenable(matched) ? matched.then((match2) => match2 ? pattern : null) : matched ? pattern : null;
      };
      result.requiresSiblings = true;
      return result;
    }
  }
  return parsedPattern;
}
function aggregateBasenameMatches(parsedPatterns, result) {
  const basenamePatterns = parsedPatterns.filter((parsedPattern) => !!parsedPattern.basenames);
  if (basenamePatterns.length < 2) {
    return parsedPatterns;
  }
  const basenames = basenamePatterns.reduce((all, current) => {
    const basenames2 = current.basenames;
    return basenames2 ? all.concat(basenames2) : all;
  }, []);
  let patterns;
  if (result) {
    patterns = [];
    for (let i = 0, n = basenames.length; i < n; i++) {
      patterns.push(result);
    }
  } else {
    patterns = basenamePatterns.reduce((all, current) => {
      const patterns2 = current.patterns;
      return patterns2 ? all.concat(patterns2) : all;
    }, []);
  }
  const aggregate = function(path, basename3) {
    if (typeof path !== "string") {
      return null;
    }
    if (!basename3) {
      let i;
      for (i = path.length; i > 0; i--) {
        const ch = path.charCodeAt(i - 1);
        if (ch === 47 || ch === 92) {
          break;
        }
      }
      basename3 = path.substr(i);
    }
    const index = basenames.indexOf(basename3);
    return index !== -1 ? patterns[index] : null;
  };
  aggregate.basenames = basenames;
  aggregate.patterns = patterns;
  aggregate.allBasenames = basenames;
  const aggregatedPatterns = parsedPatterns.filter((parsedPattern) => !parsedPattern.basenames);
  aggregatedPatterns.push(aggregate);
  return aggregatedPatterns;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languagesAssociations.js
init_mime();
init_network();
init_path();
init_resources();
init_strings();
init_modesRegistry();
var registeredAssociations = [];
var nonUserRegisteredAssociations = [];
var userRegisteredAssociations = [];
function registerPlatformLanguageAssociation(association, warnOnOverwrite = false) {
  _registerLanguageAssociation(association, false, warnOnOverwrite);
}
function _registerLanguageAssociation(association, userConfigured, warnOnOverwrite) {
  const associationItem = toLanguageAssociationItem(association, userConfigured);
  registeredAssociations.push(associationItem);
  if (!associationItem.userConfigured) {
    nonUserRegisteredAssociations.push(associationItem);
  } else {
    userRegisteredAssociations.push(associationItem);
  }
  if (warnOnOverwrite && !associationItem.userConfigured) {
    registeredAssociations.forEach((a) => {
      if (a.mime === associationItem.mime || a.userConfigured) {
        return;
      }
      if (associationItem.extension && a.extension === associationItem.extension) {
        console.warn(`Overwriting extension <<${associationItem.extension}>> to now point to mime <<${associationItem.mime}>>`);
      }
      if (associationItem.filename && a.filename === associationItem.filename) {
        console.warn(`Overwriting filename <<${associationItem.filename}>> to now point to mime <<${associationItem.mime}>>`);
      }
      if (associationItem.filepattern && a.filepattern === associationItem.filepattern) {
        console.warn(`Overwriting filepattern <<${associationItem.filepattern}>> to now point to mime <<${associationItem.mime}>>`);
      }
      if (associationItem.firstline && a.firstline === associationItem.firstline) {
        console.warn(`Overwriting firstline <<${associationItem.firstline}>> to now point to mime <<${associationItem.mime}>>`);
      }
    });
  }
}
function toLanguageAssociationItem(association, userConfigured) {
  return {
    id: association.id,
    mime: association.mime,
    filename: association.filename,
    extension: association.extension,
    filepattern: association.filepattern,
    firstline: association.firstline,
    userConfigured,
    filenameLowercase: association.filename ? association.filename.toLowerCase() : void 0,
    extensionLowercase: association.extension ? association.extension.toLowerCase() : void 0,
    filepatternLowercase: association.filepattern ? parse2(association.filepattern.toLowerCase()) : void 0,
    filepatternOnPath: association.filepattern ? association.filepattern.indexOf(posix.sep) >= 0 : false
  };
}
function clearPlatformLanguageAssociations() {
  registeredAssociations = registeredAssociations.filter((a) => a.userConfigured);
  nonUserRegisteredAssociations = [];
}
function getLanguageIds(resource, firstLine) {
  return getAssociations(resource, firstLine).map((item) => item.id);
}
function getAssociations(resource, firstLine) {
  let path;
  if (resource) {
    switch (resource.scheme) {
      case Schemas.file:
        path = resource.fsPath;
        break;
      case Schemas.data: {
        const metadata = DataUri.parseMetaData(resource);
        path = metadata.get(DataUri.META_DATA_LABEL);
        break;
      }
      case Schemas.vscodeNotebookCell:
        path = void 0;
        break;
      default:
        path = resource.path;
    }
  }
  if (!path) {
    return [{ id: "unknown", mime: Mimes.unknown }];
  }
  path = path.toLowerCase();
  const filename = basename(path);
  const configuredLanguage = getAssociationByPath(path, filename, userRegisteredAssociations);
  if (configuredLanguage) {
    return [configuredLanguage, { id: PLAINTEXT_LANGUAGE_ID, mime: Mimes.text }];
  }
  const registeredLanguage = getAssociationByPath(path, filename, nonUserRegisteredAssociations);
  if (registeredLanguage) {
    return [registeredLanguage, { id: PLAINTEXT_LANGUAGE_ID, mime: Mimes.text }];
  }
  if (firstLine) {
    const firstlineLanguage = getAssociationByFirstline(firstLine);
    if (firstlineLanguage) {
      return [firstlineLanguage, { id: PLAINTEXT_LANGUAGE_ID, mime: Mimes.text }];
    }
  }
  return [{ id: "unknown", mime: Mimes.unknown }];
}
function getAssociationByPath(path, filename, associations) {
  var _a4;
  let filenameMatch = void 0;
  let patternMatch = void 0;
  let extensionMatch = void 0;
  for (let i = associations.length - 1; i >= 0; i--) {
    const association = associations[i];
    if (filename === association.filenameLowercase) {
      filenameMatch = association;
      break;
    }
    if (association.filepattern) {
      if (!patternMatch || association.filepattern.length > patternMatch.filepattern.length) {
        const target = association.filepatternOnPath ? path : filename;
        if ((_a4 = association.filepatternLowercase) === null || _a4 === void 0 ? void 0 : _a4.call(association, target)) {
          patternMatch = association;
        }
      }
    }
    if (association.extension) {
      if (!extensionMatch || association.extension.length > extensionMatch.extension.length) {
        if (filename.endsWith(association.extensionLowercase)) {
          extensionMatch = association;
        }
      }
    }
  }
  if (filenameMatch) {
    return filenameMatch;
  }
  if (patternMatch) {
    return patternMatch;
  }
  if (extensionMatch) {
    return extensionMatch;
  }
  return void 0;
}
function getAssociationByFirstline(firstLine) {
  if (startsWithUTF8BOM(firstLine)) {
    firstLine = firstLine.substr(1);
  }
  if (firstLine.length > 0) {
    for (let i = registeredAssociations.length - 1; i >= 0; i--) {
      const association = registeredAssociations[i];
      if (!association.firstline) {
        continue;
      }
      const matches = firstLine.match(association.firstline);
      if (matches && matches.length > 0) {
        return association;
      }
    }
  }
  return void 0;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languagesRegistry.js
init_modesRegistry();
init_configurationRegistry();
init_platform2();
var hasOwnProperty = Object.prototype.hasOwnProperty;
var NULL_LANGUAGE_ID = "vs.editor.nullLanguage";
var LanguageIdCodec = class {
  constructor() {
    this._languageIdToLanguage = [];
    this._languageToLanguageId = /* @__PURE__ */ new Map();
    this._register(NULL_LANGUAGE_ID, 0);
    this._register(PLAINTEXT_LANGUAGE_ID, 1);
    this._nextLanguageId = 2;
  }
  _register(language, languageId) {
    this._languageIdToLanguage[languageId] = language;
    this._languageToLanguageId.set(language, languageId);
  }
  register(language) {
    if (this._languageToLanguageId.has(language)) {
      return;
    }
    const languageId = this._nextLanguageId++;
    this._register(language, languageId);
  }
  encodeLanguageId(languageId) {
    return this._languageToLanguageId.get(languageId) || 0;
  }
  decodeLanguageId(languageId) {
    return this._languageIdToLanguage[languageId] || NULL_LANGUAGE_ID;
  }
};
var LanguagesRegistry = class extends Disposable {
  constructor(useModesRegistry = true, warnOnOverwrite = false) {
    super();
    this._onDidChange = this._register(new Emitter());
    this.onDidChange = this._onDidChange.event;
    LanguagesRegistry.instanceCount++;
    this._warnOnOverwrite = warnOnOverwrite;
    this.languageIdCodec = new LanguageIdCodec();
    this._dynamicLanguages = [];
    this._languages = {};
    this._mimeTypesMap = {};
    this._nameMap = {};
    this._lowercaseNameMap = {};
    if (useModesRegistry) {
      this._initializeFromRegistry();
      this._register(ModesRegistry.onDidChangeLanguages((m) => {
        this._initializeFromRegistry();
      }));
    }
  }
  dispose() {
    LanguagesRegistry.instanceCount--;
    super.dispose();
  }
  _initializeFromRegistry() {
    this._languages = {};
    this._mimeTypesMap = {};
    this._nameMap = {};
    this._lowercaseNameMap = {};
    clearPlatformLanguageAssociations();
    const desc = [].concat(ModesRegistry.getLanguages()).concat(this._dynamicLanguages);
    this._registerLanguages(desc);
  }
  _registerLanguages(desc) {
    for (const d of desc) {
      this._registerLanguage(d);
    }
    this._mimeTypesMap = {};
    this._nameMap = {};
    this._lowercaseNameMap = {};
    Object.keys(this._languages).forEach((langId) => {
      const language = this._languages[langId];
      if (language.name) {
        this._nameMap[language.name] = language.identifier;
      }
      language.aliases.forEach((alias) => {
        this._lowercaseNameMap[alias.toLowerCase()] = language.identifier;
      });
      language.mimetypes.forEach((mimetype) => {
        this._mimeTypesMap[mimetype] = language.identifier;
      });
    });
    Registry.as(Extensions.Configuration).registerOverrideIdentifiers(this.getRegisteredLanguageIds());
    this._onDidChange.fire();
  }
  _registerLanguage(lang) {
    const langId = lang.id;
    let resolvedLanguage;
    if (hasOwnProperty.call(this._languages, langId)) {
      resolvedLanguage = this._languages[langId];
    } else {
      this.languageIdCodec.register(langId);
      resolvedLanguage = {
        identifier: langId,
        name: null,
        mimetypes: [],
        aliases: [],
        extensions: [],
        filenames: [],
        configurationFiles: [],
        icons: []
      };
      this._languages[langId] = resolvedLanguage;
    }
    this._mergeLanguage(resolvedLanguage, lang);
  }
  _mergeLanguage(resolvedLanguage, lang) {
    const langId = lang.id;
    let primaryMime = null;
    if (Array.isArray(lang.mimetypes) && lang.mimetypes.length > 0) {
      resolvedLanguage.mimetypes.push(...lang.mimetypes);
      primaryMime = lang.mimetypes[0];
    }
    if (!primaryMime) {
      primaryMime = `text/x-${langId}`;
      resolvedLanguage.mimetypes.push(primaryMime);
    }
    if (Array.isArray(lang.extensions)) {
      if (lang.configuration) {
        resolvedLanguage.extensions = lang.extensions.concat(resolvedLanguage.extensions);
      } else {
        resolvedLanguage.extensions = resolvedLanguage.extensions.concat(lang.extensions);
      }
      for (const extension of lang.extensions) {
        registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, extension }, this._warnOnOverwrite);
      }
    }
    if (Array.isArray(lang.filenames)) {
      for (const filename of lang.filenames) {
        registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, filename }, this._warnOnOverwrite);
        resolvedLanguage.filenames.push(filename);
      }
    }
    if (Array.isArray(lang.filenamePatterns)) {
      for (const filenamePattern of lang.filenamePatterns) {
        registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, filepattern: filenamePattern }, this._warnOnOverwrite);
      }
    }
    if (typeof lang.firstLine === "string" && lang.firstLine.length > 0) {
      let firstLineRegexStr = lang.firstLine;
      if (firstLineRegexStr.charAt(0) !== "^") {
        firstLineRegexStr = "^" + firstLineRegexStr;
      }
      try {
        const firstLineRegex = new RegExp(firstLineRegexStr);
        if (!regExpLeadsToEndlessLoop(firstLineRegex)) {
          registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, firstline: firstLineRegex }, this._warnOnOverwrite);
        }
      } catch (err) {
        onUnexpectedError(err);
      }
    }
    resolvedLanguage.aliases.push(langId);
    let langAliases = null;
    if (typeof lang.aliases !== "undefined" && Array.isArray(lang.aliases)) {
      if (lang.aliases.length === 0) {
        langAliases = [null];
      } else {
        langAliases = lang.aliases;
      }
    }
    if (langAliases !== null) {
      for (const langAlias of langAliases) {
        if (!langAlias || langAlias.length === 0) {
          continue;
        }
        resolvedLanguage.aliases.push(langAlias);
      }
    }
    const containsAliases = langAliases !== null && langAliases.length > 0;
    if (containsAliases && langAliases[0] === null) {
    } else {
      const bestName = (containsAliases ? langAliases[0] : null) || langId;
      if (containsAliases || !resolvedLanguage.name) {
        resolvedLanguage.name = bestName;
      }
    }
    if (lang.configuration) {
      resolvedLanguage.configurationFiles.push(lang.configuration);
    }
    if (lang.icon) {
      resolvedLanguage.icons.push(lang.icon);
    }
  }
  isRegisteredLanguageId(languageId) {
    if (!languageId) {
      return false;
    }
    return hasOwnProperty.call(this._languages, languageId);
  }
  getRegisteredLanguageIds() {
    return Object.keys(this._languages);
  }
  getLanguageIdByLanguageName(languageName) {
    const languageNameLower = languageName.toLowerCase();
    if (!hasOwnProperty.call(this._lowercaseNameMap, languageNameLower)) {
      return null;
    }
    return this._lowercaseNameMap[languageNameLower];
  }
  getLanguageIdByMimeType(mimeType) {
    if (!mimeType) {
      return null;
    }
    if (hasOwnProperty.call(this._mimeTypesMap, mimeType)) {
      return this._mimeTypesMap[mimeType];
    }
    return null;
  }
  guessLanguageIdByFilepathOrFirstLine(resource, firstLine) {
    if (!resource && !firstLine) {
      return [];
    }
    return getLanguageIds(resource, firstLine);
  }
};
LanguagesRegistry.instanceCount = 0;

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languageService.js
init_arrays();
init_languages();
init_modesRegistry();
var LanguageService = class extends Disposable {
  constructor(warnOnOverwrite = false) {
    super();
    this._onDidEncounterLanguage = this._register(new Emitter());
    this.onDidEncounterLanguage = this._onDidEncounterLanguage.event;
    this._onDidChange = this._register(new Emitter({ leakWarningThreshold: 200 }));
    this.onDidChange = this._onDidChange.event;
    LanguageService.instanceCount++;
    this._encounteredLanguages = /* @__PURE__ */ new Set();
    this._registry = this._register(new LanguagesRegistry(true, warnOnOverwrite));
    this.languageIdCodec = this._registry.languageIdCodec;
    this._register(this._registry.onDidChange(() => this._onDidChange.fire()));
  }
  dispose() {
    LanguageService.instanceCount--;
    super.dispose();
  }
  isRegisteredLanguageId(languageId) {
    return this._registry.isRegisteredLanguageId(languageId);
  }
  getLanguageIdByLanguageName(languageName) {
    return this._registry.getLanguageIdByLanguageName(languageName);
  }
  getLanguageIdByMimeType(mimeType) {
    return this._registry.getLanguageIdByMimeType(mimeType);
  }
  guessLanguageIdByFilepathOrFirstLine(resource, firstLine) {
    const languageIds = this._registry.guessLanguageIdByFilepathOrFirstLine(resource, firstLine);
    return firstOrDefault(languageIds, null);
  }
  createById(languageId) {
    return new LanguageSelection(this.onDidChange, () => {
      return this._createAndGetLanguageIdentifier(languageId);
    });
  }
  createByFilepathOrFirstLine(resource, firstLine) {
    return new LanguageSelection(this.onDidChange, () => {
      const languageId = this.guessLanguageIdByFilepathOrFirstLine(resource, firstLine);
      return this._createAndGetLanguageIdentifier(languageId);
    });
  }
  _createAndGetLanguageIdentifier(languageId) {
    if (!languageId || !this.isRegisteredLanguageId(languageId)) {
      languageId = PLAINTEXT_LANGUAGE_ID;
    }
    if (!this._encounteredLanguages.has(languageId)) {
      this._encounteredLanguages.add(languageId);
      TokenizationRegistry.getOrCreate(languageId);
      this._onDidEncounterLanguage.fire(languageId);
    }
    return languageId;
  }
};
LanguageService.instanceCount = 0;
var LanguageSelection = class {
  constructor(_onDidChangeLanguages, _selector) {
    this._onDidChangeLanguages = _onDidChangeLanguages;
    this._selector = _selector;
    this._listener = null;
    this._emitter = null;
    this.languageId = this._selector();
  }
  _dispose() {
    if (this._listener) {
      this._listener.dispose();
      this._listener = null;
    }
    if (this._emitter) {
      this._emitter.dispose();
      this._emitter = null;
    }
  }
  get onDidChange() {
    if (!this._listener) {
      this._listener = this._onDidChangeLanguages(() => this._evaluate());
    }
    if (!this._emitter) {
      this._emitter = new Emitter({
        onLastListenerRemove: () => {
          this._dispose();
        }
      });
    }
    return this._emitter.event;
  }
  _evaluate() {
    var _a4;
    const languageId = this._selector();
    if (languageId === this.languageId) {
      return;
    }
    this.languageId = languageId;
    (_a4 = this._emitter) === null || _a4 === void 0 ? void 0 : _a4.fire(this.languageId);
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuService.js
init_define_process();
init_dom();
init_event();
init_lifecycle();
init_telemetry();
init_themeService();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.js
init_define_process();
init_dom();
init_mouseEvent();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.js
init_define_process();
init_browser();
init_dom();
init_keyboardEvent();
init_mouseEvent();
init_actions();
init_async();
init_codicons();
init_lifecycle();
init_platform();
init_strings();
var MENU_MNEMONIC_REGEX = /\(&([^\s&])\)|(^|[^&])&([^\s&])/;
var MENU_ESCAPED_MNEMONIC_REGEX = /(&amp;)?(&amp;)([^\s&])/g;
var Direction;
(function(Direction2) {
  Direction2[Direction2["Right"] = 0] = "Right";
  Direction2[Direction2["Left"] = 1] = "Left";
})(Direction || (Direction = {}));
var Menu = class extends ActionBar {
  constructor(container, actions, options = {}) {
    container.classList.add("monaco-menu-container");
    container.setAttribute("role", "presentation");
    const menuElement = document.createElement("div");
    menuElement.classList.add("monaco-menu");
    menuElement.setAttribute("role", "presentation");
    super(menuElement, {
      orientation: 1,
      actionViewItemProvider: (action) => this.doGetActionViewItem(action, options, parentData),
      context: options.context,
      actionRunner: options.actionRunner,
      ariaLabel: options.ariaLabel,
      ariaRole: "menu",
      focusOnlyEnabledItems: true,
      triggerKeys: { keys: [3, ...isMacintosh || isLinux ? [10] : []], keyDown: true }
    });
    this.menuElement = menuElement;
    this.actionsList.tabIndex = 0;
    this.menuDisposables = this._register(new DisposableStore());
    this.initializeOrUpdateStyleSheet(container, {});
    this._register(Gesture.addTarget(menuElement));
    addDisposableListener(menuElement, EventType.KEY_DOWN, (e) => {
      const event = new StandardKeyboardEvent(e);
      if (event.equals(2)) {
        e.preventDefault();
      }
    });
    if (options.enableMnemonics) {
      this.menuDisposables.add(addDisposableListener(menuElement, EventType.KEY_DOWN, (e) => {
        const key = e.key.toLocaleLowerCase();
        if (this.mnemonics.has(key)) {
          EventHelper.stop(e, true);
          const actions2 = this.mnemonics.get(key);
          if (actions2.length === 1) {
            if (actions2[0] instanceof SubmenuMenuActionViewItem && actions2[0].container) {
              this.focusItemByElement(actions2[0].container);
            }
            actions2[0].onClick(e);
          }
          if (actions2.length > 1) {
            const action = actions2.shift();
            if (action && action.container) {
              this.focusItemByElement(action.container);
              actions2.push(action);
            }
            this.mnemonics.set(key, actions2);
          }
        }
      }));
    }
    if (isLinux) {
      this._register(addDisposableListener(menuElement, EventType.KEY_DOWN, (e) => {
        const event = new StandardKeyboardEvent(e);
        if (event.equals(14) || event.equals(11)) {
          this.focusedItem = this.viewItems.length - 1;
          this.focusNext();
          EventHelper.stop(e, true);
        } else if (event.equals(13) || event.equals(12)) {
          this.focusedItem = 0;
          this.focusPrevious();
          EventHelper.stop(e, true);
        }
      }));
    }
    this._register(addDisposableListener(this.domNode, EventType.MOUSE_OUT, (e) => {
      const relatedTarget = e.relatedTarget;
      if (!isAncestor(relatedTarget, this.domNode)) {
        this.focusedItem = void 0;
        this.updateFocus();
        e.stopPropagation();
      }
    }));
    this._register(addDisposableListener(this.actionsList, EventType.MOUSE_OVER, (e) => {
      let target = e.target;
      if (!target || !isAncestor(target, this.actionsList) || target === this.actionsList) {
        return;
      }
      while (target.parentElement !== this.actionsList && target.parentElement !== null) {
        target = target.parentElement;
      }
      if (target.classList.contains("action-item")) {
        const lastFocusedItem = this.focusedItem;
        this.setFocusedItem(target);
        if (lastFocusedItem !== this.focusedItem) {
          this.updateFocus();
        }
      }
    }));
    this._register(Gesture.addTarget(this.actionsList));
    this._register(addDisposableListener(this.actionsList, EventType2.Tap, (e) => {
      let target = e.initialTarget;
      if (!target || !isAncestor(target, this.actionsList) || target === this.actionsList) {
        return;
      }
      while (target.parentElement !== this.actionsList && target.parentElement !== null) {
        target = target.parentElement;
      }
      if (target.classList.contains("action-item")) {
        const lastFocusedItem = this.focusedItem;
        this.setFocusedItem(target);
        if (lastFocusedItem !== this.focusedItem) {
          this.updateFocus();
        }
      }
    }));
    const parentData = {
      parent: this
    };
    this.mnemonics = /* @__PURE__ */ new Map();
    this.scrollableElement = this._register(new DomScrollableElement(menuElement, {
      alwaysConsumeMouseWheel: true,
      horizontal: 2,
      vertical: 3,
      verticalScrollbarSize: 7,
      handleMouseWheel: true,
      useShadows: true
    }));
    const scrollElement = this.scrollableElement.getDomNode();
    scrollElement.style.position = "";
    this._register(addDisposableListener(menuElement, EventType2.Change, (e) => {
      EventHelper.stop(e, true);
      const scrollTop = this.scrollableElement.getScrollPosition().scrollTop;
      this.scrollableElement.setScrollPosition({ scrollTop: scrollTop - e.translationY });
    }));
    this._register(addDisposableListener(scrollElement, EventType.MOUSE_UP, (e) => {
      e.preventDefault();
    }));
    menuElement.style.maxHeight = `${Math.max(10, window.innerHeight - container.getBoundingClientRect().top - 35)}px`;
    actions = actions.filter((a) => {
      var _a4;
      if ((_a4 = options.submenuIds) === null || _a4 === void 0 ? void 0 : _a4.has(a.id)) {
        console.warn(`Found submenu cycle: ${a.id}`);
        return false;
      }
      return true;
    });
    this.push(actions, { icon: true, label: true, isMenu: true });
    container.appendChild(this.scrollableElement.getDomNode());
    this.scrollableElement.scanDomNode();
    this.viewItems.filter((item) => !(item instanceof MenuSeparatorActionViewItem)).forEach((item, index, array) => {
      item.updatePositionInSet(index + 1, array.length);
    });
  }
  initializeOrUpdateStyleSheet(container, style) {
    if (!this.styleSheet) {
      if (isInShadowDOM(container)) {
        this.styleSheet = createStyleSheet(container);
      } else {
        if (!Menu.globalStyleSheet) {
          Menu.globalStyleSheet = createStyleSheet();
        }
        this.styleSheet = Menu.globalStyleSheet;
      }
    }
    this.styleSheet.textContent = getMenuWidgetCSS(style, isInShadowDOM(container));
  }
  style(style) {
    const container = this.getContainer();
    this.initializeOrUpdateStyleSheet(container, style);
    const fgColor = style.foregroundColor ? `${style.foregroundColor}` : "";
    const bgColor = style.backgroundColor ? `${style.backgroundColor}` : "";
    const border = style.borderColor ? `1px solid ${style.borderColor}` : "";
    const borderRadius = "5px";
    const shadow = style.shadowColor ? `0 2px 8px ${style.shadowColor}` : "";
    container.style.outline = border;
    container.style.borderRadius = borderRadius;
    container.style.color = fgColor;
    container.style.backgroundColor = bgColor;
    container.style.boxShadow = shadow;
    if (this.viewItems) {
      this.viewItems.forEach((item) => {
        if (item instanceof BaseMenuActionViewItem || item instanceof MenuSeparatorActionViewItem) {
          item.style(style);
        }
      });
    }
  }
  getContainer() {
    return this.scrollableElement.getDomNode();
  }
  get onScroll() {
    return this.scrollableElement.onScroll;
  }
  focusItemByElement(element) {
    const lastFocusedItem = this.focusedItem;
    this.setFocusedItem(element);
    if (lastFocusedItem !== this.focusedItem) {
      this.updateFocus();
    }
  }
  setFocusedItem(element) {
    for (let i = 0; i < this.actionsList.children.length; i++) {
      const elem = this.actionsList.children[i];
      if (element === elem) {
        this.focusedItem = i;
        break;
      }
    }
  }
  updateFocus(fromRight) {
    super.updateFocus(fromRight, true, true);
    if (typeof this.focusedItem !== "undefined") {
      this.scrollableElement.setScrollPosition({
        scrollTop: Math.round(this.menuElement.scrollTop)
      });
    }
  }
  doGetActionViewItem(action, options, parentData) {
    if (action instanceof Separator) {
      return new MenuSeparatorActionViewItem(options.context, action, { icon: true });
    } else if (action instanceof SubmenuAction) {
      const menuActionViewItem = new SubmenuMenuActionViewItem(action, action.actions, parentData, Object.assign(Object.assign({}, options), { submenuIds: /* @__PURE__ */ new Set([...options.submenuIds || [], action.id]) }));
      if (options.enableMnemonics) {
        const mnemonic = menuActionViewItem.getMnemonic();
        if (mnemonic && menuActionViewItem.isEnabled()) {
          let actionViewItems = [];
          if (this.mnemonics.has(mnemonic)) {
            actionViewItems = this.mnemonics.get(mnemonic);
          }
          actionViewItems.push(menuActionViewItem);
          this.mnemonics.set(mnemonic, actionViewItems);
        }
      }
      return menuActionViewItem;
    } else {
      const menuItemOptions = { enableMnemonics: options.enableMnemonics, useEventAsContext: options.useEventAsContext };
      if (options.getKeyBinding) {
        const keybinding = options.getKeyBinding(action);
        if (keybinding) {
          const keybindingLabel = keybinding.getLabel();
          if (keybindingLabel) {
            menuItemOptions.keybinding = keybindingLabel;
          }
        }
      }
      const menuActionViewItem = new BaseMenuActionViewItem(options.context, action, menuItemOptions);
      if (options.enableMnemonics) {
        const mnemonic = menuActionViewItem.getMnemonic();
        if (mnemonic && menuActionViewItem.isEnabled()) {
          let actionViewItems = [];
          if (this.mnemonics.has(mnemonic)) {
            actionViewItems = this.mnemonics.get(mnemonic);
          }
          actionViewItems.push(menuActionViewItem);
          this.mnemonics.set(mnemonic, actionViewItems);
        }
      }
      return menuActionViewItem;
    }
  }
};
var BaseMenuActionViewItem = class extends BaseActionViewItem {
  constructor(ctx, action, options = {}) {
    options.isMenu = true;
    super(action, action, options);
    this.options = options;
    this.options.icon = options.icon !== void 0 ? options.icon : false;
    this.options.label = options.label !== void 0 ? options.label : true;
    this.cssClass = "";
    if (this.options.label && options.enableMnemonics) {
      const label = this.getAction().label;
      if (label) {
        const matches = MENU_MNEMONIC_REGEX.exec(label);
        if (matches) {
          this.mnemonic = (!!matches[1] ? matches[1] : matches[3]).toLocaleLowerCase();
        }
      }
    }
    this.runOnceToEnableMouseUp = new RunOnceScheduler(() => {
      if (!this.element) {
        return;
      }
      this._register(addDisposableListener(this.element, EventType.MOUSE_UP, (e) => {
        EventHelper.stop(e, true);
        if (isFirefox) {
          const mouseEvent = new StandardMouseEvent(e);
          if (mouseEvent.rightButton) {
            return;
          }
          this.onClick(e);
        } else {
          setTimeout(() => {
            this.onClick(e);
          }, 0);
        }
      }));
      this._register(addDisposableListener(this.element, EventType.CONTEXT_MENU, (e) => {
        EventHelper.stop(e, true);
      }));
    }, 100);
    this._register(this.runOnceToEnableMouseUp);
  }
  render(container) {
    super.render(container);
    if (!this.element) {
      return;
    }
    this.container = container;
    this.item = append(this.element, $("a.action-menu-item"));
    if (this._action.id === Separator.ID) {
      this.item.setAttribute("role", "presentation");
    } else {
      this.item.setAttribute("role", "menuitem");
      if (this.mnemonic) {
        this.item.setAttribute("aria-keyshortcuts", `${this.mnemonic}`);
      }
    }
    this.check = append(this.item, $("span.menu-item-check" + Codicon.menuSelection.cssSelector));
    this.check.setAttribute("role", "none");
    this.label = append(this.item, $("span.action-label"));
    if (this.options.label && this.options.keybinding) {
      append(this.item, $("span.keybinding")).textContent = this.options.keybinding;
    }
    this.runOnceToEnableMouseUp.schedule();
    this.updateClass();
    this.updateLabel();
    this.updateTooltip();
    this.updateEnabled();
    this.updateChecked();
  }
  blur() {
    super.blur();
    this.applyStyle();
  }
  focus() {
    super.focus();
    if (this.item) {
      this.item.focus();
    }
    this.applyStyle();
  }
  updatePositionInSet(pos, setSize) {
    if (this.item) {
      this.item.setAttribute("aria-posinset", `${pos}`);
      this.item.setAttribute("aria-setsize", `${setSize}`);
    }
  }
  updateLabel() {
    var _a4;
    if (!this.label) {
      return;
    }
    if (this.options.label) {
      clearNode(this.label);
      let label = stripIcons(this.getAction().label);
      if (label) {
        const cleanLabel = cleanMnemonic(label);
        if (!this.options.enableMnemonics) {
          label = cleanLabel;
        }
        this.label.setAttribute("aria-label", cleanLabel.replace(/&&/g, "&"));
        const matches = MENU_MNEMONIC_REGEX.exec(label);
        if (matches) {
          label = escape(label);
          MENU_ESCAPED_MNEMONIC_REGEX.lastIndex = 0;
          let escMatch = MENU_ESCAPED_MNEMONIC_REGEX.exec(label);
          while (escMatch && escMatch[1]) {
            escMatch = MENU_ESCAPED_MNEMONIC_REGEX.exec(label);
          }
          const replaceDoubleEscapes = (str) => str.replace(/&amp;&amp;/g, "&amp;");
          if (escMatch) {
            this.label.append(ltrim(replaceDoubleEscapes(label.substr(0, escMatch.index)), " "), $("u", { "aria-hidden": "true" }, escMatch[3]), rtrim(replaceDoubleEscapes(label.substr(escMatch.index + escMatch[0].length)), " "));
          } else {
            this.label.innerText = replaceDoubleEscapes(label).trim();
          }
          (_a4 = this.item) === null || _a4 === void 0 ? void 0 : _a4.setAttribute("aria-keyshortcuts", (!!matches[1] ? matches[1] : matches[3]).toLocaleLowerCase());
        } else {
          this.label.innerText = label.replace(/&&/g, "&").trim();
        }
      }
    }
  }
  updateTooltip() {
  }
  updateClass() {
    if (this.cssClass && this.item) {
      this.item.classList.remove(...this.cssClass.split(" "));
    }
    if (this.options.icon && this.label) {
      this.cssClass = this.getAction().class || "";
      this.label.classList.add("icon");
      if (this.cssClass) {
        this.label.classList.add(...this.cssClass.split(" "));
      }
      this.updateEnabled();
    } else if (this.label) {
      this.label.classList.remove("icon");
    }
  }
  updateEnabled() {
    if (this.getAction().enabled) {
      if (this.element) {
        this.element.classList.remove("disabled");
        this.element.removeAttribute("aria-disabled");
      }
      if (this.item) {
        this.item.classList.remove("disabled");
        this.item.removeAttribute("aria-disabled");
        this.item.tabIndex = 0;
      }
    } else {
      if (this.element) {
        this.element.classList.add("disabled");
        this.element.setAttribute("aria-disabled", "true");
      }
      if (this.item) {
        this.item.classList.add("disabled");
        this.item.setAttribute("aria-disabled", "true");
      }
    }
  }
  updateChecked() {
    if (!this.item) {
      return;
    }
    const checked = this.getAction().checked;
    this.item.classList.toggle("checked", !!checked);
    if (checked !== void 0) {
      this.item.setAttribute("role", "menuitemcheckbox");
      this.item.setAttribute("aria-checked", checked ? "true" : "false");
    } else {
      this.item.setAttribute("role", "menuitem");
      this.item.setAttribute("aria-checked", "");
    }
  }
  getMnemonic() {
    return this.mnemonic;
  }
  applyStyle() {
    if (!this.menuStyle) {
      return;
    }
    const isSelected = this.element && this.element.classList.contains("focused");
    const fgColor = isSelected && this.menuStyle.selectionForegroundColor ? this.menuStyle.selectionForegroundColor : this.menuStyle.foregroundColor;
    const bgColor = isSelected && this.menuStyle.selectionBackgroundColor ? this.menuStyle.selectionBackgroundColor : void 0;
    const outline = isSelected && this.menuStyle.selectionBorderColor ? `1px solid ${this.menuStyle.selectionBorderColor}` : "";
    const outlineOffset = isSelected && this.menuStyle.selectionBorderColor ? `-1px` : "";
    if (this.item) {
      this.item.style.color = fgColor ? fgColor.toString() : "";
      this.item.style.backgroundColor = bgColor ? bgColor.toString() : "";
      this.item.style.outline = outline;
      this.item.style.outlineOffset = outlineOffset;
    }
    if (this.check) {
      this.check.style.color = fgColor ? fgColor.toString() : "";
    }
  }
  style(style) {
    this.menuStyle = style;
    this.applyStyle();
  }
};
var SubmenuMenuActionViewItem = class extends BaseMenuActionViewItem {
  constructor(action, submenuActions, parentData, submenuOptions) {
    super(action, action, submenuOptions);
    this.submenuActions = submenuActions;
    this.parentData = parentData;
    this.submenuOptions = submenuOptions;
    this.mysubmenu = null;
    this.submenuDisposables = this._register(new DisposableStore());
    this.mouseOver = false;
    this.expandDirection = submenuOptions && submenuOptions.expandDirection !== void 0 ? submenuOptions.expandDirection : Direction.Right;
    this.showScheduler = new RunOnceScheduler(() => {
      if (this.mouseOver) {
        this.cleanupExistingSubmenu(false);
        this.createSubmenu(false);
      }
    }, 250);
    this.hideScheduler = new RunOnceScheduler(() => {
      if (this.element && (!isAncestor(getActiveElement(), this.element) && this.parentData.submenu === this.mysubmenu)) {
        this.parentData.parent.focus(false);
        this.cleanupExistingSubmenu(true);
      }
    }, 750);
  }
  render(container) {
    super.render(container);
    if (!this.element) {
      return;
    }
    if (this.item) {
      this.item.classList.add("monaco-submenu-item");
      this.item.tabIndex = 0;
      this.item.setAttribute("aria-haspopup", "true");
      this.updateAriaExpanded("false");
      this.submenuIndicator = append(this.item, $("span.submenu-indicator" + Codicon.menuSubmenu.cssSelector));
      this.submenuIndicator.setAttribute("aria-hidden", "true");
    }
    this._register(addDisposableListener(this.element, EventType.KEY_UP, (e) => {
      const event = new StandardKeyboardEvent(e);
      if (event.equals(17) || event.equals(3)) {
        EventHelper.stop(e, true);
        this.createSubmenu(true);
      }
    }));
    this._register(addDisposableListener(this.element, EventType.KEY_DOWN, (e) => {
      const event = new StandardKeyboardEvent(e);
      if (getActiveElement() === this.item) {
        if (event.equals(17) || event.equals(3)) {
          EventHelper.stop(e, true);
        }
      }
    }));
    this._register(addDisposableListener(this.element, EventType.MOUSE_OVER, (e) => {
      if (!this.mouseOver) {
        this.mouseOver = true;
        this.showScheduler.schedule();
      }
    }));
    this._register(addDisposableListener(this.element, EventType.MOUSE_LEAVE, (e) => {
      this.mouseOver = false;
    }));
    this._register(addDisposableListener(this.element, EventType.FOCUS_OUT, (e) => {
      if (this.element && !isAncestor(getActiveElement(), this.element)) {
        this.hideScheduler.schedule();
      }
    }));
    this._register(this.parentData.parent.onScroll(() => {
      if (this.parentData.submenu === this.mysubmenu) {
        this.parentData.parent.focus(false);
        this.cleanupExistingSubmenu(true);
      }
    }));
  }
  updateEnabled() {
  }
  onClick(e) {
    EventHelper.stop(e, true);
    this.cleanupExistingSubmenu(false);
    this.createSubmenu(true);
  }
  cleanupExistingSubmenu(force) {
    if (this.parentData.submenu && (force || this.parentData.submenu !== this.mysubmenu)) {
      try {
        this.parentData.submenu.dispose();
      } catch (_a4) {
      }
      this.parentData.submenu = void 0;
      this.updateAriaExpanded("false");
      if (this.submenuContainer) {
        this.submenuDisposables.clear();
        this.submenuContainer = void 0;
      }
    }
  }
  calculateSubmenuMenuLayout(windowDimensions, submenu, entry, expandDirection) {
    const ret = { top: 0, left: 0 };
    ret.left = layout(windowDimensions.width, submenu.width, { position: expandDirection === Direction.Right ? 0 : 1, offset: entry.left, size: entry.width });
    if (ret.left >= entry.left && ret.left < entry.left + entry.width) {
      if (entry.left + 10 + submenu.width <= windowDimensions.width) {
        ret.left = entry.left + 10;
      }
      entry.top += 10;
      entry.height = 0;
    }
    ret.top = layout(windowDimensions.height, submenu.height, { position: 0, offset: entry.top, size: 0 });
    if (ret.top + submenu.height === entry.top && ret.top + entry.height + submenu.height <= windowDimensions.height) {
      ret.top += entry.height;
    }
    return ret;
  }
  createSubmenu(selectFirstItem = true) {
    if (!this.element) {
      return;
    }
    if (!this.parentData.submenu) {
      this.updateAriaExpanded("true");
      this.submenuContainer = append(this.element, $("div.monaco-submenu"));
      this.submenuContainer.classList.add("menubar-menu-items-holder", "context-view");
      const computedStyles = getComputedStyle(this.parentData.parent.domNode);
      const paddingTop = parseFloat(computedStyles.paddingTop || "0") || 0;
      this.submenuContainer.style.zIndex = "1";
      this.submenuContainer.style.position = "fixed";
      this.submenuContainer.style.top = "0";
      this.submenuContainer.style.left = "0";
      this.parentData.submenu = new Menu(this.submenuContainer, this.submenuActions.length ? this.submenuActions : [new EmptySubmenuAction()], this.submenuOptions);
      if (this.menuStyle) {
        this.parentData.submenu.style(this.menuStyle);
      }
      const entryBox = this.element.getBoundingClientRect();
      const entryBoxUpdated = {
        top: entryBox.top - paddingTop,
        left: entryBox.left,
        height: entryBox.height + 2 * paddingTop,
        width: entryBox.width
      };
      const viewBox = this.submenuContainer.getBoundingClientRect();
      const { top, left } = this.calculateSubmenuMenuLayout(new Dimension(window.innerWidth, window.innerHeight), Dimension.lift(viewBox), entryBoxUpdated, this.expandDirection);
      this.submenuContainer.style.left = `${left - viewBox.left}px`;
      this.submenuContainer.style.top = `${top - viewBox.top}px`;
      this.submenuDisposables.add(addDisposableListener(this.submenuContainer, EventType.KEY_UP, (e) => {
        const event = new StandardKeyboardEvent(e);
        if (event.equals(15)) {
          EventHelper.stop(e, true);
          this.parentData.parent.focus();
          this.cleanupExistingSubmenu(true);
        }
      }));
      this.submenuDisposables.add(addDisposableListener(this.submenuContainer, EventType.KEY_DOWN, (e) => {
        const event = new StandardKeyboardEvent(e);
        if (event.equals(15)) {
          EventHelper.stop(e, true);
        }
      }));
      this.submenuDisposables.add(this.parentData.submenu.onDidCancel(() => {
        this.parentData.parent.focus();
        this.cleanupExistingSubmenu(true);
      }));
      this.parentData.submenu.focus(selectFirstItem);
      this.mysubmenu = this.parentData.submenu;
    } else {
      this.parentData.submenu.focus(false);
    }
  }
  updateAriaExpanded(value) {
    var _a4;
    if (this.item) {
      (_a4 = this.item) === null || _a4 === void 0 ? void 0 : _a4.setAttribute("aria-expanded", value);
    }
  }
  applyStyle() {
    var _a4;
    super.applyStyle();
    if (!this.menuStyle) {
      return;
    }
    const isSelected = this.element && this.element.classList.contains("focused");
    const fgColor = isSelected && this.menuStyle.selectionForegroundColor ? this.menuStyle.selectionForegroundColor : this.menuStyle.foregroundColor;
    if (this.submenuIndicator) {
      this.submenuIndicator.style.color = fgColor ? `${fgColor}` : "";
    }
    (_a4 = this.parentData.submenu) === null || _a4 === void 0 ? void 0 : _a4.style(this.menuStyle);
  }
  dispose() {
    super.dispose();
    this.hideScheduler.dispose();
    if (this.mysubmenu) {
      this.mysubmenu.dispose();
      this.mysubmenu = null;
    }
    if (this.submenuContainer) {
      this.submenuContainer = void 0;
    }
  }
};
var MenuSeparatorActionViewItem = class extends ActionViewItem {
  style(style) {
    if (this.label) {
      this.label.style.borderBottomColor = style.separatorColor ? `${style.separatorColor}` : "";
    }
  }
};
function cleanMnemonic(label) {
  const regex = MENU_MNEMONIC_REGEX;
  const matches = regex.exec(label);
  if (!matches) {
    return label;
  }
  const mnemonicInText = !matches[1];
  return label.replace(regex, mnemonicInText ? "$2$3" : "").trim();
}
function getMenuWidgetCSS(style, isForShadowDom) {
  let result = `
.monaco-menu {
	font-size: 13px;
	border-radius: 5px;
	min-width: 160px;
}

${formatRule(Codicon.menuSelection)}
${formatRule(Codicon.menuSubmenu)}

.monaco-menu .monaco-action-bar {
	text-align: right;
	overflow: hidden;
	white-space: nowrap;
}

.monaco-menu .monaco-action-bar .actions-container {
	display: flex;
	margin: 0 auto;
	padding: 0;
	width: 100%;
	justify-content: flex-end;
}

.monaco-menu .monaco-action-bar.vertical .actions-container {
	display: inline-block;
}

.monaco-menu .monaco-action-bar.reverse .actions-container {
	flex-direction: row-reverse;
}

.monaco-menu .monaco-action-bar .action-item {
	cursor: pointer;
	display: inline-block;
	transition: transform 50ms ease;
	position: relative;  /* DO NOT REMOVE - this is the key to preventing the ghosting icon bug in Chrome 42 */
}

.monaco-menu .monaco-action-bar .action-item.disabled {
	cursor: default;
}

.monaco-menu .monaco-action-bar.animated .action-item.active {
	transform: scale(1.272019649, 1.272019649); /* 1.272019649 = \u221A\u03C6 */
}

.monaco-menu .monaco-action-bar .action-item .icon,
.monaco-menu .monaco-action-bar .action-item .codicon {
	display: inline-block;
}

.monaco-menu .monaco-action-bar .action-item .codicon {
	display: flex;
	align-items: center;
}

.monaco-menu .monaco-action-bar .action-label {
	font-size: 11px;
	margin-right: 4px;
}

.monaco-menu .monaco-action-bar .action-item.disabled .action-label,
.monaco-menu .monaco-action-bar .action-item.disabled .action-label:hover {
	color: var(--vscode-disabledForeground);
}

/* Vertical actions */

.monaco-menu .monaco-action-bar.vertical {
	text-align: left;
}

.monaco-menu .monaco-action-bar.vertical .action-item {
	display: block;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator {
	display: block;
	border-bottom: 1px solid var(--vscode-menu-separatorBackground);
	padding-top: 1px;
	padding: 30px;
}

.monaco-menu .secondary-actions .monaco-action-bar .action-label {
	margin-left: 6px;
}

/* Action Items */
.monaco-menu .monaco-action-bar .action-item.select-container {
	overflow: hidden; /* somehow the dropdown overflows its container, we prevent it here to not push */
	flex: 1;
	max-width: 170px;
	min-width: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
}

.monaco-menu .monaco-action-bar.vertical {
	margin-left: 0;
	overflow: visible;
}

.monaco-menu .monaco-action-bar.vertical .actions-container {
	display: block;
}

.monaco-menu .monaco-action-bar.vertical .action-item {
	padding: 0;
	transform: none;
	display: flex;
}

.monaco-menu .monaco-action-bar.vertical .action-item.active {
	transform: none;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item {
	flex: 1 1 auto;
	display: flex;
	height: 2em;
	align-items: center;
	position: relative;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .keybinding,
.monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .keybinding {
	opacity: unset;
}

.monaco-menu .monaco-action-bar.vertical .action-label {
	flex: 1 1 auto;
	text-decoration: none;
	padding: 0 1em;
	background: none;
	font-size: 12px;
	line-height: 1;
}

.monaco-menu .monaco-action-bar.vertical .keybinding,
.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	display: inline-block;
	flex: 2 1 auto;
	padding: 0 1em;
	text-align: right;
	font-size: 12px;
	line-height: 1;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	height: 100%;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon {
	font-size: 16px !important;
	display: flex;
	align-items: center;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon::before {
	margin-left: auto;
	margin-right: -20px;
}

.monaco-menu .monaco-action-bar.vertical .action-item.disabled .keybinding,
.monaco-menu .monaco-action-bar.vertical .action-item.disabled .submenu-indicator {
	opacity: 0.4;
}

.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator) {
	display: inline-block;
	box-sizing: border-box;
	margin: 0;
}

.monaco-menu .monaco-action-bar.vertical .action-item {
	position: static;
	overflow: visible;
}

.monaco-menu .monaco-action-bar.vertical .action-item .monaco-submenu {
	position: absolute;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator {
	width: 100%;
	height: 0px !important;
	opacity: 1;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator.text {
	padding: 0.7em 1em 0.1em 1em;
	font-weight: bold;
	opacity: 1;
}

.monaco-menu .monaco-action-bar.vertical .action-label:hover {
	color: inherit;
}

.monaco-menu .monaco-action-bar.vertical .menu-item-check {
	position: absolute;
	visibility: hidden;
	width: 1em;
	height: 100%;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item.checked .menu-item-check {
	visibility: visible;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Context Menu */

.context-view.monaco-menu-container {
	outline: 0;
	border: none;
	animation: fadeIn 0.083s linear;
	-webkit-app-region: no-drag;
}

.context-view.monaco-menu-container :focus,
.context-view.monaco-menu-container .monaco-action-bar.vertical:focus,
.context-view.monaco-menu-container .monaco-action-bar.vertical :focus {
	outline: 0;
}

.hc-black .context-view.monaco-menu-container,
.hc-light .context-view.monaco-menu-container,
:host-context(.hc-black) .context-view.monaco-menu-container,
:host-context(.hc-light) .context-view.monaco-menu-container {
	box-shadow: none;
}

.hc-black .monaco-menu .monaco-action-bar.vertical .action-item.focused,
.hc-light .monaco-menu .monaco-action-bar.vertical .action-item.focused,
:host-context(.hc-black) .monaco-menu .monaco-action-bar.vertical .action-item.focused,
:host-context(.hc-light) .monaco-menu .monaco-action-bar.vertical .action-item.focused {
	background: none;
}

/* Vertical Action Bar Styles */

.monaco-menu .monaco-action-bar.vertical {
	padding: .6em 0;
}

.monaco-menu .monaco-action-bar.vertical .action-menu-item {
	height: 2em;
}

.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator),
.monaco-menu .monaco-action-bar.vertical .keybinding {
	font-size: inherit;
	padding: 0 2em;
}

.monaco-menu .monaco-action-bar.vertical .menu-item-check {
	font-size: inherit;
	width: 2em;
}

.monaco-menu .monaco-action-bar.vertical .action-label.separator {
	font-size: inherit;
	margin: 5px 0 !important;
	padding: 0;
	border-radius: 0;
}

.linux .monaco-menu .monaco-action-bar.vertical .action-label.separator,
:host-context(.linux) .monaco-menu .monaco-action-bar.vertical .action-label.separator {
	margin-left: 0;
	margin-right: 0;
}

.monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	font-size: 60%;
	padding: 0 1.8em;
}

.linux .monaco-menu .monaco-action-bar.vertical .submenu-indicator {
:host-context(.linux) .monaco-menu .monaco-action-bar.vertical .submenu-indicator {
	height: 100%;
	mask-size: 10px 10px;
	-webkit-mask-size: 10px 10px;
}

.monaco-menu .action-item {
	cursor: default;
}`;
  if (isForShadowDom) {
    result += `
			/* Arrows */
			.monaco-scrollable-element > .scrollbar > .scra {
				cursor: pointer;
				font-size: 11px !important;
			}

			.monaco-scrollable-element > .visible {
				opacity: 1;

				/* Background rule added for IE9 - to allow clicks on dom node */
				background:rgba(0,0,0,0);

				transition: opacity 100ms linear;
			}
			.monaco-scrollable-element > .invisible {
				opacity: 0;
				pointer-events: none;
			}
			.monaco-scrollable-element > .invisible.fade {
				transition: opacity 800ms linear;
			}

			/* Scrollable Content Inset Shadow */
			.monaco-scrollable-element > .shadow {
				position: absolute;
				display: none;
			}
			.monaco-scrollable-element > .shadow.top {
				display: block;
				top: 0;
				left: 3px;
				height: 3px;
				width: 100%;
			}
			.monaco-scrollable-element > .shadow.left {
				display: block;
				top: 3px;
				left: 0;
				height: 100%;
				width: 3px;
			}
			.monaco-scrollable-element > .shadow.top-left-corner {
				display: block;
				top: 0;
				left: 0;
				height: 3px;
				width: 3px;
			}
		`;
    const scrollbarShadowColor = style.scrollbarShadow;
    if (scrollbarShadowColor) {
      result += `
				.monaco-scrollable-element > .shadow.top {
					box-shadow: ${scrollbarShadowColor} 0 6px 6px -6px inset;
				}

				.monaco-scrollable-element > .shadow.left {
					box-shadow: ${scrollbarShadowColor} 6px 0 6px -6px inset;
				}

				.monaco-scrollable-element > .shadow.top.left {
					box-shadow: ${scrollbarShadowColor} 6px 6px 6px -6px inset;
				}
			`;
    }
    const scrollbarSliderBackgroundColor = style.scrollbarSliderBackground;
    if (scrollbarSliderBackgroundColor) {
      result += `
				.monaco-scrollable-element > .scrollbar > .slider {
					background: ${scrollbarSliderBackgroundColor};
				}
			`;
    }
    const scrollbarSliderHoverBackgroundColor = style.scrollbarSliderHoverBackground;
    if (scrollbarSliderHoverBackgroundColor) {
      result += `
				.monaco-scrollable-element > .scrollbar > .slider:hover {
					background: ${scrollbarSliderHoverBackgroundColor};
				}
			`;
    }
    const scrollbarSliderActiveBackgroundColor = style.scrollbarSliderActiveBackground;
    if (scrollbarSliderActiveBackgroundColor) {
      result += `
				.monaco-scrollable-element > .scrollbar > .slider.active {
					background: ${scrollbarSliderActiveBackgroundColor};
				}
			`;
    }
  }
  return result;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.js
init_actions();
init_errors();
init_lifecycle();
var ContextMenuHandler = class {
  constructor(contextViewService, telemetryService, notificationService, keybindingService, themeService) {
    this.contextViewService = contextViewService;
    this.telemetryService = telemetryService;
    this.notificationService = notificationService;
    this.keybindingService = keybindingService;
    this.themeService = themeService;
    this.focusToReturn = null;
    this.block = null;
    this.options = { blockMouse: true };
  }
  configure(options) {
    this.options = options;
  }
  showContextMenu(delegate) {
    const actions = delegate.getActions();
    if (!actions.length) {
      return;
    }
    this.focusToReturn = document.activeElement;
    let menu;
    const shadowRootElement = isHTMLElement(delegate.domForShadowRoot) ? delegate.domForShadowRoot : void 0;
    this.contextViewService.showContextView({
      getAnchor: () => delegate.getAnchor(),
      canRelayout: false,
      anchorAlignment: delegate.anchorAlignment,
      anchorAxisAlignment: delegate.anchorAxisAlignment,
      render: (container) => {
        const className = delegate.getMenuClassName ? delegate.getMenuClassName() : "";
        if (className) {
          container.className += " " + className;
        }
        if (this.options.blockMouse) {
          this.block = container.appendChild($(".context-view-block"));
          this.block.style.position = "fixed";
          this.block.style.cursor = "initial";
          this.block.style.left = "0";
          this.block.style.top = "0";
          this.block.style.width = "100%";
          this.block.style.height = "100%";
          this.block.style.zIndex = "-1";
          addDisposableListener(this.block, EventType.MOUSE_DOWN, (e) => e.stopPropagation());
        }
        const menuDisposables = new DisposableStore();
        const actionRunner = delegate.actionRunner || new ActionRunner();
        actionRunner.onBeforeRun(this.onActionRun, this, menuDisposables);
        actionRunner.onDidRun(this.onDidActionRun, this, menuDisposables);
        menu = new Menu(container, actions, {
          actionViewItemProvider: delegate.getActionViewItem,
          context: delegate.getActionsContext ? delegate.getActionsContext() : null,
          actionRunner,
          getKeyBinding: delegate.getKeyBinding ? delegate.getKeyBinding : (action) => this.keybindingService.lookupKeybinding(action.id)
        });
        menuDisposables.add(attachMenuStyler(menu, this.themeService));
        menu.onDidCancel(() => this.contextViewService.hideContextView(true), null, menuDisposables);
        menu.onDidBlur(() => this.contextViewService.hideContextView(true), null, menuDisposables);
        menuDisposables.add(addDisposableListener(window, EventType.BLUR, () => this.contextViewService.hideContextView(true)));
        menuDisposables.add(addDisposableListener(window, EventType.MOUSE_DOWN, (e) => {
          if (e.defaultPrevented) {
            return;
          }
          const event = new StandardMouseEvent(e);
          let element = event.target;
          if (event.rightButton) {
            return;
          }
          while (element) {
            if (element === container) {
              return;
            }
            element = element.parentElement;
          }
          this.contextViewService.hideContextView(true);
        }));
        return combinedDisposable(menuDisposables, menu);
      },
      focus: () => {
        menu === null || menu === void 0 ? void 0 : menu.focus(!!delegate.autoSelectFirstItem);
      },
      onHide: (didCancel) => {
        var _a4;
        (_a4 = delegate.onHide) === null || _a4 === void 0 ? void 0 : _a4.call(delegate, !!didCancel);
        if (this.block) {
          this.block.remove();
          this.block = null;
        }
        if (this.focusToReturn) {
          this.focusToReturn.focus();
        }
      }
    }, shadowRootElement, !!shadowRootElement);
  }
  onActionRun(e) {
    this.telemetryService.publicLog2("workbenchActionExecuted", { id: e.action.id, from: "contextMenu" });
    this.contextViewService.hideContextView(false);
    if (this.focusToReturn) {
      this.focusToReturn.focus();
    }
  }
  onDidActionRun(e) {
    if (e.error && !isCancellationError(e.error)) {
      this.notificationService.error(e.error);
    }
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuService.js
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param8 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var ContextMenuService = class ContextMenuService2 extends Disposable {
  constructor(telemetryService, notificationService, contextViewService, keybindingService, themeService) {
    super();
    this._onDidShowContextMenu = new Emitter();
    this._onDidHideContextMenu = new Emitter();
    this.contextMenuHandler = new ContextMenuHandler(contextViewService, telemetryService, notificationService, keybindingService, themeService);
  }
  configure(options) {
    this.contextMenuHandler.configure(options);
  }
  showContextMenu(delegate) {
    this.contextMenuHandler.showContextMenu(Object.assign(Object.assign({}, delegate), { onHide: (didCancel) => {
      var _a4;
      (_a4 = delegate.onHide) === null || _a4 === void 0 ? void 0 : _a4.call(delegate, didCancel);
      this._onDidHideContextMenu.fire();
    } }));
    ModifierKeyEmitter.getInstance().resetKeyStatus();
    this._onDidShowContextMenu.fire();
  }
};
ContextMenuService = __decorate8([
  __param8(0, ITelemetryService),
  __param8(1, INotificationService),
  __param8(2, IContextViewService),
  __param8(3, IKeybindingService),
  __param8(4, IThemeService)
], ContextMenuService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_themeService();
init_extensions();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/openerService.js
init_define_process();
init_dom();
init_cancellation();
init_linkedList();
init_map();
init_network();
init_resources();
init_uri();
init_codeEditorService();
init_commands();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/editor/common/editor.js
init_define_process();
var EditorOpenSource;
(function(EditorOpenSource2) {
  EditorOpenSource2[EditorOpenSource2["API"] = 0] = "API";
  EditorOpenSource2[EditorOpenSource2["USER"] = 1] = "USER";
})(EditorOpenSource || (EditorOpenSource = {}));

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/browser/services/openerService.js
init_opener();
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param9 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var CommandOpener = class CommandOpener2 {
  constructor(_commandService) {
    this._commandService = _commandService;
  }
  open(target, options) {
    return __awaiter8(this, void 0, void 0, function* () {
      if (!matchesScheme(target, Schemas.command)) {
        return false;
      }
      if (!(options === null || options === void 0 ? void 0 : options.allowCommands)) {
        return true;
      }
      if (typeof target === "string") {
        target = URI.parse(target);
      }
      let args = [];
      try {
        args = parse(decodeURIComponent(target.query));
      } catch (_a4) {
        try {
          args = parse(target.query);
        } catch (_b) {
        }
      }
      if (!Array.isArray(args)) {
        args = [args];
      }
      yield this._commandService.executeCommand(target.path, ...args);
      return true;
    });
  }
};
CommandOpener = __decorate9([
  __param9(0, ICommandService)
], CommandOpener);
var EditorOpener = class EditorOpener2 {
  constructor(_editorService) {
    this._editorService = _editorService;
  }
  open(target, options) {
    return __awaiter8(this, void 0, void 0, function* () {
      if (typeof target === "string") {
        target = URI.parse(target);
      }
      const { selection, uri } = extractSelection(target);
      target = uri;
      if (target.scheme === Schemas.file) {
        target = normalizePath(target);
      }
      yield this._editorService.openCodeEditor({
        resource: target,
        options: Object.assign({ selection, source: (options === null || options === void 0 ? void 0 : options.fromUserGesture) ? EditorOpenSource.USER : EditorOpenSource.API }, options === null || options === void 0 ? void 0 : options.editorOptions)
      }, this._editorService.getFocusedCodeEditor(), options === null || options === void 0 ? void 0 : options.openToSide);
      return true;
    });
  }
};
EditorOpener = __decorate9([
  __param9(0, ICodeEditorService)
], EditorOpener);
var OpenerService = class OpenerService2 {
  constructor(editorService, commandService) {
    this._openers = new LinkedList();
    this._validators = new LinkedList();
    this._resolvers = new LinkedList();
    this._resolvedUriTargets = new ResourceMap((uri) => uri.with({ path: null, fragment: null, query: null }).toString());
    this._externalOpeners = new LinkedList();
    this._defaultExternalOpener = {
      openExternal: (href) => __awaiter8(this, void 0, void 0, function* () {
        if (matchesSomeScheme(href, Schemas.http, Schemas.https)) {
          windowOpenNoOpener(href);
        } else {
          window.location.href = href;
        }
        return true;
      })
    };
    this._openers.push({
      open: (target, options) => __awaiter8(this, void 0, void 0, function* () {
        if ((options === null || options === void 0 ? void 0 : options.openExternal) || matchesSomeScheme(target, Schemas.mailto, Schemas.http, Schemas.https, Schemas.vsls)) {
          yield this._doOpenExternal(target, options);
          return true;
        }
        return false;
      })
    });
    this._openers.push(new CommandOpener(commandService));
    this._openers.push(new EditorOpener(editorService));
  }
  registerOpener(opener) {
    const remove = this._openers.unshift(opener);
    return { dispose: remove };
  }
  registerValidator(validator) {
    const remove = this._validators.push(validator);
    return { dispose: remove };
  }
  registerExternalUriResolver(resolver) {
    const remove = this._resolvers.push(resolver);
    return { dispose: remove };
  }
  setDefaultExternalOpener(externalOpener) {
    this._defaultExternalOpener = externalOpener;
  }
  registerExternalOpener(opener) {
    const remove = this._externalOpeners.push(opener);
    return { dispose: remove };
  }
  open(target, options) {
    var _a4;
    return __awaiter8(this, void 0, void 0, function* () {
      const targetURI = typeof target === "string" ? URI.parse(target) : target;
      const validationTarget = (_a4 = this._resolvedUriTargets.get(targetURI)) !== null && _a4 !== void 0 ? _a4 : target;
      for (const validator of this._validators) {
        if (!(yield validator.shouldOpen(validationTarget, options))) {
          return false;
        }
      }
      for (const opener of this._openers) {
        const handled = yield opener.open(target, options);
        if (handled) {
          return true;
        }
      }
      return false;
    });
  }
  resolveExternalUri(resource, options) {
    return __awaiter8(this, void 0, void 0, function* () {
      for (const resolver of this._resolvers) {
        try {
          const result = yield resolver.resolveExternalUri(resource, options);
          if (result) {
            if (!this._resolvedUriTargets.has(result.resolved)) {
              this._resolvedUriTargets.set(result.resolved, resource);
            }
            return result;
          }
        } catch (_a4) {
        }
      }
      throw new Error("Could not resolve external URI: " + resource.toString());
    });
  }
  _doOpenExternal(resource, options) {
    return __awaiter8(this, void 0, void 0, function* () {
      const uri = typeof resource === "string" ? URI.parse(resource) : resource;
      let externalUri;
      try {
        externalUri = (yield this.resolveExternalUri(uri, options)).resolved;
      } catch (_a4) {
        externalUri = uri;
      }
      let href;
      if (typeof resource === "string" && uri.toString() === externalUri.toString()) {
        href = resource;
      } else {
        href = encodeURI(externalUri.toString(true));
      }
      if (options === null || options === void 0 ? void 0 : options.allowContributedOpeners) {
        const preferredOpenerId = typeof (options === null || options === void 0 ? void 0 : options.allowContributedOpeners) === "string" ? options === null || options === void 0 ? void 0 : options.allowContributedOpeners : void 0;
        for (const opener of this._externalOpeners) {
          const didOpen = yield opener.openExternal(href, {
            sourceUri: uri,
            preferredOpenerId
          }, CancellationToken.None);
          if (didOpen) {
            return true;
          }
        }
      }
      return this._defaultExternalOpener.openExternal(href, { sourceUri: uri }, CancellationToken.None);
    });
  }
  dispose() {
    this._validators.clear();
  }
};
OpenerService = __decorate9([
  __param9(0, ICodeEditorService),
  __param9(1, ICommandService)
], OpenerService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_editorWorker();
init_language();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/markerDecorationsService.js
init_define_process();
init_lifecycle();
init_model();
init_themeService();
init_editorColorRegistry();
init_model2();
init_range();
init_network();
init_event();
init_colorRegistry();
init_map();
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param10 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var MarkerDecorations = class extends Disposable {
  constructor(model) {
    super();
    this.model = model;
    this._markersData = /* @__PURE__ */ new Map();
    this._register(toDisposable(() => {
      this.model.deltaDecorations([...this._markersData.keys()], []);
      this._markersData.clear();
    }));
  }
  update(markers, newDecorations) {
    const oldIds = [...this._markersData.keys()];
    this._markersData.clear();
    const ids = this.model.deltaDecorations(oldIds, newDecorations);
    for (let index = 0; index < ids.length; index++) {
      this._markersData.set(ids[index], markers[index]);
    }
    return oldIds.length !== 0 || ids.length !== 0;
  }
  getMarker(decoration) {
    return this._markersData.get(decoration.id);
  }
};
var MarkerDecorationsService = class MarkerDecorationsService2 extends Disposable {
  constructor(modelService, _markerService) {
    super();
    this._markerService = _markerService;
    this._onDidChangeMarker = this._register(new Emitter());
    this._markerDecorations = new ResourceMap();
    modelService.getModels().forEach((model) => this._onModelAdded(model));
    this._register(modelService.onModelAdded(this._onModelAdded, this));
    this._register(modelService.onModelRemoved(this._onModelRemoved, this));
    this._register(this._markerService.onMarkerChanged(this._handleMarkerChange, this));
  }
  dispose() {
    super.dispose();
    this._markerDecorations.forEach((value) => value.dispose());
    this._markerDecorations.clear();
  }
  getMarker(uri, decoration) {
    const markerDecorations = this._markerDecorations.get(uri);
    return markerDecorations ? markerDecorations.getMarker(decoration) || null : null;
  }
  _handleMarkerChange(changedResources) {
    changedResources.forEach((resource) => {
      const markerDecorations = this._markerDecorations.get(resource);
      if (markerDecorations) {
        this._updateDecorations(markerDecorations);
      }
    });
  }
  _onModelAdded(model) {
    const markerDecorations = new MarkerDecorations(model);
    this._markerDecorations.set(model.uri, markerDecorations);
    this._updateDecorations(markerDecorations);
  }
  _onModelRemoved(model) {
    var _a4;
    const markerDecorations = this._markerDecorations.get(model.uri);
    if (markerDecorations) {
      markerDecorations.dispose();
      this._markerDecorations.delete(model.uri);
    }
    if (model.uri.scheme === Schemas.inMemory || model.uri.scheme === Schemas.internal || model.uri.scheme === Schemas.vscode) {
      (_a4 = this._markerService) === null || _a4 === void 0 ? void 0 : _a4.read({ resource: model.uri }).map((marker) => marker.owner).forEach((owner) => this._markerService.remove(owner, [model.uri]));
    }
  }
  _updateDecorations(markerDecorations) {
    const markers = this._markerService.read({ resource: markerDecorations.model.uri, take: 500 });
    const newModelDecorations = markers.map((marker) => {
      return {
        range: this._createDecorationRange(markerDecorations.model, marker),
        options: this._createDecorationOption(marker)
      };
    });
    if (markerDecorations.update(markers, newModelDecorations)) {
      this._onDidChangeMarker.fire(markerDecorations.model);
    }
  }
  _createDecorationRange(model, rawMarker) {
    let ret = Range.lift(rawMarker);
    if (rawMarker.severity === MarkerSeverity2.Hint && !this._hasMarkerTag(rawMarker, 1) && !this._hasMarkerTag(rawMarker, 2)) {
      ret = ret.setEndPosition(ret.startLineNumber, ret.startColumn + 2);
    }
    ret = model.validateRange(ret);
    if (ret.isEmpty()) {
      const maxColumn = model.getLineLastNonWhitespaceColumn(ret.startLineNumber) || model.getLineMaxColumn(ret.startLineNumber);
      if (maxColumn === 1 || ret.endColumn >= maxColumn) {
        return ret;
      }
      const word = model.getWordAtPosition(ret.getStartPosition());
      if (word) {
        ret = new Range(ret.startLineNumber, word.startColumn, ret.endLineNumber, word.endColumn);
      }
    } else if (rawMarker.endColumn === Number.MAX_VALUE && rawMarker.startColumn === 1 && ret.startLineNumber === ret.endLineNumber) {
      const minColumn = model.getLineFirstNonWhitespaceColumn(rawMarker.startLineNumber);
      if (minColumn < ret.endColumn) {
        ret = new Range(ret.startLineNumber, minColumn, ret.endLineNumber, ret.endColumn);
        rawMarker.startColumn = minColumn;
      }
    }
    return ret;
  }
  _createDecorationOption(marker) {
    let className;
    let color = void 0;
    let zIndex;
    let inlineClassName = void 0;
    let minimap;
    switch (marker.severity) {
      case MarkerSeverity2.Hint:
        if (this._hasMarkerTag(marker, 2)) {
          className = void 0;
        } else if (this._hasMarkerTag(marker, 1)) {
          className = "squiggly-unnecessary";
        } else {
          className = "squiggly-hint";
        }
        zIndex = 0;
        break;
      case MarkerSeverity2.Warning:
        className = "squiggly-warning";
        color = themeColorFromId(overviewRulerWarning);
        zIndex = 20;
        minimap = {
          color: themeColorFromId(minimapWarning),
          position: MinimapPosition2.Inline
        };
        break;
      case MarkerSeverity2.Info:
        className = "squiggly-info";
        color = themeColorFromId(overviewRulerInfo);
        zIndex = 10;
        break;
      case MarkerSeverity2.Error:
      default:
        className = "squiggly-error";
        color = themeColorFromId(overviewRulerError);
        zIndex = 30;
        minimap = {
          color: themeColorFromId(minimapError),
          position: MinimapPosition2.Inline
        };
        break;
    }
    if (marker.tags) {
      if (marker.tags.indexOf(1) !== -1) {
        inlineClassName = "squiggly-inline-unnecessary";
      }
      if (marker.tags.indexOf(2) !== -1) {
        inlineClassName = "squiggly-inline-deprecated";
      }
    }
    return {
      description: "marker-decoration",
      stickiness: 1,
      className,
      showIfCollapsed: true,
      overviewRuler: {
        color,
        position: OverviewRulerLane2.Right
      },
      minimap,
      zIndex,
      inlineClassName
    };
  }
  _hasMarkerTag(marker, tag) {
    if (marker.tags) {
      return marker.tags.indexOf(tag) >= 0;
    }
    return false;
  }
};
MarkerDecorationsService = __decorate10([
  __param10(0, IModelService),
  __param10(1, IMarkerService)
], MarkerDecorationsService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_modelService();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickInput/standaloneQuickInputService.js
init_define_process();
init_editorExtensions();
init_themeService();
init_cancellation();
init_instantiation();
init_contextkey();
init_codeEditorService();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/quickInput.js
init_define_process();
init_cancellation();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInput.js
init_define_process();
init_dom();
init_keyboardEvent();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/browser/ui/button/button.js
init_define_process();
init_dom();
init_keyboardEvent();
init_color();
init_event();
init_lifecycle();
init_objects();
var defaultOptions = {
  buttonBackground: Color.fromHex("#0E639C"),
  buttonHoverBackground: Color.fromHex("#006BB3"),
  buttonSeparator: Color.white,
  buttonForeground: Color.white
};
var Button = class extends Disposable {
  constructor(container, options) {
    super();
    this._onDidClick = this._register(new Emitter());
    this.options = options || /* @__PURE__ */ Object.create(null);
    mixin(this.options, defaultOptions, false);
    this.buttonForeground = this.options.buttonForeground;
    this.buttonBackground = this.options.buttonBackground;
    this.buttonHoverBackground = this.options.buttonHoverBackground;
    this.buttonSecondaryForeground = this.options.buttonSecondaryForeground;
    this.buttonSecondaryBackground = this.options.buttonSecondaryBackground;
    this.buttonSecondaryHoverBackground = this.options.buttonSecondaryHoverBackground;
    this.buttonBorder = this.options.buttonBorder;
    this._element = document.createElement("a");
    this._element.classList.add("monaco-button");
    this._element.tabIndex = 0;
    this._element.setAttribute("role", "button");
    container.appendChild(this._element);
    this._register(Gesture.addTarget(this._element));
    [EventType.CLICK, EventType2.Tap].forEach((eventType) => {
      this._register(addDisposableListener(this._element, eventType, (e) => {
        if (!this.enabled) {
          EventHelper.stop(e);
          return;
        }
        this._onDidClick.fire(e);
      }));
    });
    this._register(addDisposableListener(this._element, EventType.KEY_DOWN, (e) => {
      const event = new StandardKeyboardEvent(e);
      let eventHandled = false;
      if (this.enabled && (event.equals(3) || event.equals(10))) {
        this._onDidClick.fire(e);
        eventHandled = true;
      } else if (event.equals(9)) {
        this._element.blur();
        eventHandled = true;
      }
      if (eventHandled) {
        EventHelper.stop(event, true);
      }
    }));
    this._register(addDisposableListener(this._element, EventType.MOUSE_OVER, (e) => {
      if (!this._element.classList.contains("disabled")) {
        this.setHoverBackground();
      }
    }));
    this._register(addDisposableListener(this._element, EventType.MOUSE_OUT, (e) => {
      this.applyStyles();
    }));
    this.focusTracker = this._register(trackFocus(this._element));
    this._register(this.focusTracker.onDidFocus(() => {
      if (this.enabled) {
        this.setHoverBackground();
      }
    }));
    this._register(this.focusTracker.onDidBlur(() => {
      if (this.enabled) {
        this.applyStyles();
      }
    }));
    this.applyStyles();
  }
  get onDidClick() {
    return this._onDidClick.event;
  }
  setHoverBackground() {
    let hoverBackground;
    if (this.options.secondary) {
      hoverBackground = this.buttonSecondaryHoverBackground ? this.buttonSecondaryHoverBackground.toString() : null;
    } else {
      hoverBackground = this.buttonHoverBackground ? this.buttonHoverBackground.toString() : null;
    }
    if (hoverBackground) {
      this._element.style.backgroundColor = hoverBackground;
    }
  }
  style(styles) {
    this.buttonForeground = styles.buttonForeground;
    this.buttonBackground = styles.buttonBackground;
    this.buttonHoverBackground = styles.buttonHoverBackground;
    this.buttonSecondaryForeground = styles.buttonSecondaryForeground;
    this.buttonSecondaryBackground = styles.buttonSecondaryBackground;
    this.buttonSecondaryHoverBackground = styles.buttonSecondaryHoverBackground;
    this.buttonBorder = styles.buttonBorder;
    this.applyStyles();
  }
  applyStyles() {
    if (this._element) {
      let background, foreground;
      if (this.options.secondary) {
        foreground = this.buttonSecondaryForeground ? this.buttonSecondaryForeground.toString() : "";
        background = this.buttonSecondaryBackground ? this.buttonSecondaryBackground.toString() : "";
      } else {
        foreground = this.buttonForeground ? this.buttonForeground.toString() : "";
        background = this.buttonBackground ? this.buttonBackground.toString() : "";
      }
      const border = this.buttonBorder ? this.buttonBorder.toString() : "";
      this._element.style.color = foreground;
      this._element.style.backgroundColor = background;
      this._element.style.borderWidth = border ? "1px" : "";
      this._element.style.borderStyle = border ? "solid" : "";
      this._element.style.borderColor = border;
    }
  }
  get element() {
    return this._element;
  }
  set label(value) {
    this._element.classList.add("monaco-text-button");
    if (this.options.supportIcons) {
      reset(this._element, ...renderLabelWithIcons(value));
    } else {
      this._element.textContent = value;
    }
    if (typeof this.options.title === "string") {
      this._element.title = this.options.title;
    } else if (this.options.title) {
      this._element.title = value;
    }
  }
  set enabled(value) {
    if (value) {
      this._element.classList.remove("disabled");
      this._element.setAttribute("aria-disabled", String(false));
      this._element.tabIndex = 0;
    } else {
      this._element.classList.add("disabled");
      this._element.setAttribute("aria-disabled", String(true));
    }
  }
  get enabled() {
    return !this._element.classList.contains("disabled");
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/browser/ui/progressbar/progressbar.js
init_define_process();
init_dom();
init_async();
init_color();
init_lifecycle();
init_objects();
var CSS_DONE = "done";
var CSS_ACTIVE = "active";
var CSS_INFINITE = "infinite";
var CSS_INFINITE_LONG_RUNNING = "infinite-long-running";
var CSS_DISCRETE = "discrete";
var defaultOpts = {
  progressBarBackground: Color.fromHex("#0E70C0")
};
var ProgressBar = class extends Disposable {
  constructor(container, options) {
    super();
    this.options = options || /* @__PURE__ */ Object.create(null);
    mixin(this.options, defaultOpts, false);
    this.workedVal = 0;
    this.progressBarBackground = this.options.progressBarBackground;
    this.showDelayedScheduler = this._register(new RunOnceScheduler(() => show(this.element), 0));
    this.longRunningScheduler = this._register(new RunOnceScheduler(() => this.infiniteLongRunning(), ProgressBar.LONG_RUNNING_INFINITE_THRESHOLD));
    this.create(container);
  }
  create(container) {
    this.element = document.createElement("div");
    this.element.classList.add("monaco-progress-container");
    this.element.setAttribute("role", "progressbar");
    this.element.setAttribute("aria-valuemin", "0");
    container.appendChild(this.element);
    this.bit = document.createElement("div");
    this.bit.classList.add("progress-bit");
    this.element.appendChild(this.bit);
    this.applyStyles();
  }
  off() {
    this.bit.style.width = "inherit";
    this.bit.style.opacity = "1";
    this.element.classList.remove(CSS_ACTIVE, CSS_INFINITE, CSS_INFINITE_LONG_RUNNING, CSS_DISCRETE);
    this.workedVal = 0;
    this.totalWork = void 0;
    this.longRunningScheduler.cancel();
  }
  stop() {
    return this.doDone(false);
  }
  doDone(delayed) {
    this.element.classList.add(CSS_DONE);
    if (!this.element.classList.contains(CSS_INFINITE)) {
      this.bit.style.width = "inherit";
      if (delayed) {
        setTimeout(() => this.off(), 200);
      } else {
        this.off();
      }
    } else {
      this.bit.style.opacity = "0";
      if (delayed) {
        setTimeout(() => this.off(), 200);
      } else {
        this.off();
      }
    }
    return this;
  }
  infinite() {
    this.bit.style.width = "2%";
    this.bit.style.opacity = "1";
    this.element.classList.remove(CSS_DISCRETE, CSS_DONE, CSS_INFINITE_LONG_RUNNING);
    this.element.classList.add(CSS_ACTIVE, CSS_INFINITE);
    this.longRunningScheduler.schedule();
    return this;
  }
  infiniteLongRunning() {
    this.element.classList.add(CSS_INFINITE_LONG_RUNNING);
  }
  getContainer() {
    return this.element;
  }
  style(styles) {
    this.progressBarBackground = styles.progressBarBackground;
    this.applyStyles();
  }
  applyStyles() {
    if (this.bit) {
      const background = this.progressBarBackground ? this.progressBarBackground.toString() : "";
      this.bit.style.backgroundColor = background;
    }
  }
};
ProgressBar.LONG_RUNNING_INFINITE_THRESHOLD = 1e4;

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInput.js
init_actions();
init_arrays();
init_async();
init_cancellation();
init_codicons();
init_event();
init_lifecycle();
init_platform();
init_types();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInputUtils.js
init_define_process();
init_dom();
var iconPathToClass = {};
var iconClassGenerator = new IdGenerator("quick-input-button-icon-");
function getIconClass(iconPath) {
  if (!iconPath) {
    return void 0;
  }
  let iconClass;
  const key = iconPath.dark.toString();
  if (iconPathToClass[key]) {
    iconClass = iconPathToClass[key];
  } else {
    iconClass = iconClassGenerator.nextId();
    createCSSRule(`.${iconClass}, .hc-light .${iconClass}`, `background-image: ${asCSSUrl(iconPath.light || iconPath.dark)}`);
    createCSSRule(`.vs-dark .${iconClass}, .hc-black .${iconClass}`, `background-image: ${asCSSUrl(iconPath.dark)}`);
    iconPathToClass[key] = iconClass;
  }
  return iconClass;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInput.js
init_nls();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInputBox.js
init_define_process();
init_dom();
init_keyboardEvent();
init_mouseEvent();
init_lifecycle();
var $2 = $;
var QuickInputBox = class extends Disposable {
  constructor(parent) {
    super();
    this.parent = parent;
    this.onKeyDown = (handler) => {
      return addDisposableListener(this.inputBox.inputElement, EventType.KEY_DOWN, (e) => {
        handler(new StandardKeyboardEvent(e));
      });
    };
    this.onMouseDown = (handler) => {
      return addDisposableListener(this.inputBox.inputElement, EventType.MOUSE_DOWN, (e) => {
        handler(new StandardMouseEvent(e));
      });
    };
    this.onDidChange = (handler) => {
      return this.inputBox.onDidChange(handler);
    };
    this.container = append(this.parent, $2(".quick-input-box"));
    this.inputBox = this._register(new InputBox(this.container, void 0));
  }
  get value() {
    return this.inputBox.value;
  }
  set value(value) {
    this.inputBox.value = value;
  }
  select(range2 = null) {
    this.inputBox.select(range2);
  }
  isSelectionAtEnd() {
    return this.inputBox.isSelectionAtEnd();
  }
  get placeholder() {
    return this.inputBox.inputElement.getAttribute("placeholder") || "";
  }
  set placeholder(placeholder) {
    this.inputBox.setPlaceHolder(placeholder);
  }
  get ariaLabel() {
    return this.inputBox.getAriaLabel();
  }
  set ariaLabel(ariaLabel) {
    this.inputBox.setAriaLabel(ariaLabel);
  }
  get password() {
    return this.inputBox.inputElement.type === "password";
  }
  set password(password) {
    this.inputBox.inputElement.type = password ? "password" : "text";
  }
  setAttribute(name, value) {
    this.inputBox.inputElement.setAttribute(name, value);
  }
  removeAttribute(name) {
    this.inputBox.inputElement.removeAttribute(name);
  }
  showDecoration(decoration) {
    if (decoration === severity_default.Ignore) {
      this.inputBox.hideMessage();
    } else {
      this.inputBox.showMessage({ type: decoration === severity_default.Info ? 1 : decoration === severity_default.Warning ? 2 : 3, content: "" });
    }
  }
  stylesForType(decoration) {
    return this.inputBox.stylesForType(decoration === severity_default.Info ? 1 : decoration === severity_default.Warning ? 2 : 3);
  }
  setFocus() {
    this.inputBox.focus();
  }
  layout() {
    this.inputBox.layout();
  }
  style(styles) {
    this.inputBox.style(styles);
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInputList.js
init_define_process();
init_dom();
init_keyboardEvent();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/browser/ui/keybindingLabel/keybindingLabel.js
init_define_process();
init_dom();
init_objects();
init_nls();
var $3 = $;
var KeybindingLabel = class {
  constructor(container, os, options) {
    this.os = os;
    this.keyElements = /* @__PURE__ */ new Set();
    this.options = options || /* @__PURE__ */ Object.create(null);
    this.labelBackground = this.options.keybindingLabelBackground;
    this.labelForeground = this.options.keybindingLabelForeground;
    this.labelBorder = this.options.keybindingLabelBorder;
    this.labelBottomBorder = this.options.keybindingLabelBottomBorder;
    this.labelShadow = this.options.keybindingLabelShadow;
    this.domNode = append(container, $3(".monaco-keybinding"));
    this.didEverRender = false;
    container.appendChild(this.domNode);
  }
  get element() {
    return this.domNode;
  }
  set(keybinding, matches) {
    if (this.didEverRender && this.keybinding === keybinding && KeybindingLabel.areSame(this.matches, matches)) {
      return;
    }
    this.keybinding = keybinding;
    this.matches = matches;
    this.render();
  }
  render() {
    this.clear();
    if (this.keybinding) {
      const [firstPart, chordPart] = this.keybinding.getParts();
      if (firstPart) {
        this.renderPart(this.domNode, firstPart, this.matches ? this.matches.firstPart : null);
      }
      if (chordPart) {
        append(this.domNode, $3("span.monaco-keybinding-key-chord-separator", void 0, " "));
        this.renderPart(this.domNode, chordPart, this.matches ? this.matches.chordPart : null);
      }
      this.domNode.title = this.keybinding.getAriaLabel() || "";
    } else if (this.options && this.options.renderUnboundKeybindings) {
      this.renderUnbound(this.domNode);
    }
    this.applyStyles();
    this.didEverRender = true;
  }
  clear() {
    clearNode(this.domNode);
    this.keyElements.clear();
  }
  renderPart(parent, part, match2) {
    const modifierLabels = UILabelProvider.modifierLabels[this.os];
    if (part.ctrlKey) {
      this.renderKey(parent, modifierLabels.ctrlKey, Boolean(match2 === null || match2 === void 0 ? void 0 : match2.ctrlKey), modifierLabels.separator);
    }
    if (part.shiftKey) {
      this.renderKey(parent, modifierLabels.shiftKey, Boolean(match2 === null || match2 === void 0 ? void 0 : match2.shiftKey), modifierLabels.separator);
    }
    if (part.altKey) {
      this.renderKey(parent, modifierLabels.altKey, Boolean(match2 === null || match2 === void 0 ? void 0 : match2.altKey), modifierLabels.separator);
    }
    if (part.metaKey) {
      this.renderKey(parent, modifierLabels.metaKey, Boolean(match2 === null || match2 === void 0 ? void 0 : match2.metaKey), modifierLabels.separator);
    }
    const keyLabel = part.keyLabel;
    if (keyLabel) {
      this.renderKey(parent, keyLabel, Boolean(match2 === null || match2 === void 0 ? void 0 : match2.keyCode), "");
    }
  }
  renderKey(parent, label, highlight, separator) {
    append(parent, this.createKeyElement(label, highlight ? ".highlight" : ""));
    if (separator) {
      append(parent, $3("span.monaco-keybinding-key-separator", void 0, separator));
    }
  }
  renderUnbound(parent) {
    append(parent, this.createKeyElement(localize("unbound", "Unbound")));
  }
  createKeyElement(label, extraClass = "") {
    const keyElement = $3("span.monaco-keybinding-key" + extraClass, void 0, label);
    this.keyElements.add(keyElement);
    return keyElement;
  }
  style(styles) {
    this.labelBackground = styles.keybindingLabelBackground;
    this.labelForeground = styles.keybindingLabelForeground;
    this.labelBorder = styles.keybindingLabelBorder;
    this.labelBottomBorder = styles.keybindingLabelBottomBorder;
    this.labelShadow = styles.keybindingLabelShadow;
    this.applyStyles();
  }
  applyStyles() {
    var _a4;
    if (this.element) {
      for (const keyElement of this.keyElements) {
        if (this.labelBackground) {
          keyElement.style.backgroundColor = (_a4 = this.labelBackground) === null || _a4 === void 0 ? void 0 : _a4.toString();
        }
        if (this.labelBorder) {
          keyElement.style.borderColor = this.labelBorder.toString();
        }
        if (this.labelBottomBorder) {
          keyElement.style.borderBottomColor = this.labelBottomBorder.toString();
        }
        if (this.labelShadow) {
          keyElement.style.boxShadow = `inset 0 -1px 0 ${this.labelShadow}`;
        }
      }
      if (this.labelForeground) {
        this.element.style.color = this.labelForeground.toString();
      }
    }
  }
  static areSame(a, b) {
    if (a === b || !a && !b) {
      return true;
    }
    return !!a && !!b && equals2(a.firstPart, b.firstPart) && equals2(a.chordPart, b.chordPart);
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInputList.js
init_actions();
init_arrays();
init_codicons();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/common/comparers.js
init_define_process();
init_async();
var intlFileNameCollatorBaseNumeric = new IdleValue(() => {
  const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
  return {
    collator,
    collatorIsNumeric: collator.resolvedOptions().numeric
  };
});
var intlFileNameCollatorNumeric = new IdleValue(() => {
  const collator = new Intl.Collator(void 0, { numeric: true });
  return {
    collator
  };
});
var intlFileNameCollatorNumericCaseInsensitive = new IdleValue(() => {
  const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "accent" });
  return {
    collator
  };
});
function compareFileNames(one, other, caseSensitive = false) {
  const a = one || "";
  const b = other || "";
  const result = intlFileNameCollatorBaseNumeric.value.collator.compare(a, b);
  if (intlFileNameCollatorBaseNumeric.value.collatorIsNumeric && result === 0 && a !== b) {
    return a < b ? -1 : 1;
  }
  return result;
}
function compareAnything(one, other, lookFor) {
  const elementAName = one.toLowerCase();
  const elementBName = other.toLowerCase();
  const prefixCompare = compareByPrefix(one, other, lookFor);
  if (prefixCompare) {
    return prefixCompare;
  }
  const elementASuffixMatch = elementAName.endsWith(lookFor);
  const elementBSuffixMatch = elementBName.endsWith(lookFor);
  if (elementASuffixMatch !== elementBSuffixMatch) {
    return elementASuffixMatch ? -1 : 1;
  }
  const r = compareFileNames(elementAName, elementBName);
  if (r !== 0) {
    return r;
  }
  return elementAName.localeCompare(elementBName);
}
function compareByPrefix(one, other, lookFor) {
  const elementAName = one.toLowerCase();
  const elementBName = other.toLowerCase();
  const elementAPrefixMatch = elementAName.startsWith(lookFor);
  const elementBPrefixMatch = elementBName.startsWith(lookFor);
  if (elementAPrefixMatch !== elementBPrefixMatch) {
    return elementAPrefixMatch ? -1 : 1;
  } else if (elementAPrefixMatch && elementBPrefixMatch) {
    if (elementAName.length < elementBName.length) {
      return -1;
    }
    if (elementAName.length > elementBName.length) {
      return 1;
    }
  }
  return 0;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInputList.js
init_event();
init_lifecycle();
init_platform();
init_strings();
init_types();
init_nls();
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var $4 = $;
var ListElement = class {
  constructor(init) {
    this.hidden = false;
    this._onChecked = new Emitter();
    this.onChecked = this._onChecked.event;
    Object.assign(this, init);
  }
  get checked() {
    return !!this._checked;
  }
  set checked(value) {
    if (value !== this._checked) {
      this._checked = value;
      this._onChecked.fire(value);
    }
  }
  dispose() {
    this._onChecked.dispose();
  }
};
var ListElementRenderer = class {
  get templateId() {
    return ListElementRenderer.ID;
  }
  renderTemplate(container) {
    const data = /* @__PURE__ */ Object.create(null);
    data.toDisposeElement = [];
    data.toDisposeTemplate = [];
    data.entry = append(container, $4(".quick-input-list-entry"));
    const label = append(data.entry, $4("label.quick-input-list-label"));
    data.toDisposeTemplate.push(addStandardDisposableListener(label, EventType.CLICK, (e) => {
      if (!data.checkbox.offsetParent) {
        e.preventDefault();
      }
    }));
    data.checkbox = append(label, $4("input.quick-input-list-checkbox"));
    data.checkbox.type = "checkbox";
    data.toDisposeTemplate.push(addStandardDisposableListener(data.checkbox, EventType.CHANGE, (e) => {
      data.element.checked = data.checkbox.checked;
    }));
    const rows = append(label, $4(".quick-input-list-rows"));
    const row1 = append(rows, $4(".quick-input-list-row"));
    const row2 = append(rows, $4(".quick-input-list-row"));
    data.label = new IconLabel(row1, { supportHighlights: true, supportDescriptionHighlights: true, supportIcons: true });
    const keybindingContainer = append(row1, $4(".quick-input-list-entry-keybinding"));
    data.keybinding = new KeybindingLabel(keybindingContainer, OS);
    const detailContainer = append(row2, $4(".quick-input-list-label-meta"));
    data.detail = new IconLabel(detailContainer, { supportHighlights: true, supportIcons: true });
    data.separator = append(data.entry, $4(".quick-input-list-separator"));
    data.actionBar = new ActionBar(data.entry);
    data.actionBar.domNode.classList.add("quick-input-list-entry-action-bar");
    data.toDisposeTemplate.push(data.actionBar);
    return data;
  }
  renderElement(element, index, data) {
    data.toDisposeElement = dispose(data.toDisposeElement);
    data.element = element;
    data.checkbox.checked = element.checked;
    data.toDisposeElement.push(element.onChecked((checked) => data.checkbox.checked = checked));
    const { labelHighlights, descriptionHighlights, detailHighlights } = element;
    const options = /* @__PURE__ */ Object.create(null);
    options.matches = labelHighlights || [];
    options.descriptionTitle = element.saneDescription;
    options.descriptionMatches = descriptionHighlights || [];
    options.extraClasses = element.item.iconClasses;
    options.italic = element.item.italic;
    options.strikethrough = element.item.strikethrough;
    data.label.setLabel(element.saneLabel, element.saneDescription, options);
    data.keybinding.set(element.item.keybinding);
    if (element.saneDetail) {
      data.detail.setLabel(element.saneDetail, void 0, {
        matches: detailHighlights,
        title: element.saneDetail
      });
    }
    if (element.separator && element.separator.label) {
      data.separator.textContent = element.separator.label;
      data.separator.style.display = "";
    } else {
      data.separator.style.display = "none";
    }
    data.entry.classList.toggle("quick-input-list-separator-border", !!element.separator);
    data.actionBar.clear();
    const buttons = element.item.buttons;
    if (buttons && buttons.length) {
      data.actionBar.push(buttons.map((button, index2) => {
        let cssClasses = button.iconClass || (button.iconPath ? getIconClass(button.iconPath) : void 0);
        if (button.alwaysVisible) {
          cssClasses = cssClasses ? `${cssClasses} always-visible` : "always-visible";
        }
        const action = new Action(`id-${index2}`, "", cssClasses, true, () => __awaiter9(this, void 0, void 0, function* () {
          element.fireButtonTriggered({
            button,
            item: element.item
          });
        }));
        action.tooltip = button.tooltip || "";
        return action;
      }), { icon: true, label: false });
      data.entry.classList.add("has-actions");
    } else {
      data.entry.classList.remove("has-actions");
    }
  }
  disposeElement(element, index, data) {
    data.toDisposeElement = dispose(data.toDisposeElement);
  }
  disposeTemplate(data) {
    data.toDisposeElement = dispose(data.toDisposeElement);
    data.toDisposeTemplate = dispose(data.toDisposeTemplate);
  }
};
ListElementRenderer.ID = "listelement";
var ListElementDelegate = class {
  getHeight(element) {
    return element.saneDetail ? 44 : 22;
  }
  getTemplateId(element) {
    return ListElementRenderer.ID;
  }
};
var QuickInputListFocus;
(function(QuickInputListFocus2) {
  QuickInputListFocus2[QuickInputListFocus2["First"] = 1] = "First";
  QuickInputListFocus2[QuickInputListFocus2["Second"] = 2] = "Second";
  QuickInputListFocus2[QuickInputListFocus2["Last"] = 3] = "Last";
  QuickInputListFocus2[QuickInputListFocus2["Next"] = 4] = "Next";
  QuickInputListFocus2[QuickInputListFocus2["Previous"] = 5] = "Previous";
  QuickInputListFocus2[QuickInputListFocus2["NextPage"] = 6] = "NextPage";
  QuickInputListFocus2[QuickInputListFocus2["PreviousPage"] = 7] = "PreviousPage";
})(QuickInputListFocus || (QuickInputListFocus = {}));
var QuickInputList = class {
  constructor(parent, id, options) {
    this.parent = parent;
    this.inputElements = [];
    this.elements = [];
    this.elementsToIndexes = /* @__PURE__ */ new Map();
    this.matchOnDescription = false;
    this.matchOnDetail = false;
    this.matchOnLabel = true;
    this.matchOnLabelMode = "fuzzy";
    this.matchOnMeta = true;
    this.sortByLabel = true;
    this._onChangedAllVisibleChecked = new Emitter();
    this.onChangedAllVisibleChecked = this._onChangedAllVisibleChecked.event;
    this._onChangedCheckedCount = new Emitter();
    this.onChangedCheckedCount = this._onChangedCheckedCount.event;
    this._onChangedVisibleCount = new Emitter();
    this.onChangedVisibleCount = this._onChangedVisibleCount.event;
    this._onChangedCheckedElements = new Emitter();
    this.onChangedCheckedElements = this._onChangedCheckedElements.event;
    this._onButtonTriggered = new Emitter();
    this.onButtonTriggered = this._onButtonTriggered.event;
    this._onKeyDown = new Emitter();
    this.onKeyDown = this._onKeyDown.event;
    this._onLeave = new Emitter();
    this.onLeave = this._onLeave.event;
    this._fireCheckedEvents = true;
    this.elementDisposables = [];
    this.disposables = [];
    this.id = id;
    this.container = append(this.parent, $4(".quick-input-list"));
    const delegate = new ListElementDelegate();
    const accessibilityProvider = new QuickInputAccessibilityProvider();
    this.list = options.createList("QuickInput", this.container, delegate, [new ListElementRenderer()], {
      identityProvider: { getId: (element) => element.saneLabel },
      setRowLineHeight: false,
      multipleSelectionSupport: false,
      horizontalScrolling: false,
      accessibilityProvider
    });
    this.list.getHTMLElement().id = id;
    this.disposables.push(this.list);
    this.disposables.push(this.list.onKeyDown((e) => {
      const event = new StandardKeyboardEvent(e);
      switch (event.keyCode) {
        case 10:
          this.toggleCheckbox();
          break;
        case 31:
          if (isMacintosh ? e.metaKey : e.ctrlKey) {
            this.list.setFocus(range(this.list.length));
          }
          break;
        case 16: {
          const focus1 = this.list.getFocus();
          if (focus1.length === 1 && focus1[0] === 0) {
            this._onLeave.fire();
          }
          break;
        }
        case 18: {
          const focus2 = this.list.getFocus();
          if (focus2.length === 1 && focus2[0] === this.list.length - 1) {
            this._onLeave.fire();
          }
          break;
        }
      }
      this._onKeyDown.fire(event);
    }));
    this.disposables.push(this.list.onMouseDown((e) => {
      if (e.browserEvent.button !== 2) {
        e.browserEvent.preventDefault();
      }
    }));
    this.disposables.push(addDisposableListener(this.container, EventType.CLICK, (e) => {
      if (e.x || e.y) {
        this._onLeave.fire();
      }
    }));
    this.disposables.push(this.list.onMouseMiddleClick((e) => {
      this._onLeave.fire();
    }));
    this.disposables.push(this.list.onContextMenu((e) => {
      if (typeof e.index === "number") {
        e.browserEvent.preventDefault();
        this.list.setSelection([e.index]);
      }
    }));
    this.disposables.push(this._onChangedAllVisibleChecked, this._onChangedCheckedCount, this._onChangedVisibleCount, this._onChangedCheckedElements, this._onButtonTriggered, this._onLeave, this._onKeyDown);
  }
  get onDidChangeFocus() {
    return Event.map(this.list.onDidChangeFocus, (e) => e.elements.map((e2) => e2.item));
  }
  get onDidChangeSelection() {
    return Event.map(this.list.onDidChangeSelection, (e) => ({ items: e.elements.map((e2) => e2.item), event: e.browserEvent }));
  }
  get scrollTop() {
    return this.list.scrollTop;
  }
  set scrollTop(scrollTop) {
    this.list.scrollTop = scrollTop;
  }
  getAllVisibleChecked() {
    return this.allVisibleChecked(this.elements, false);
  }
  allVisibleChecked(elements, whenNoneVisible = true) {
    for (let i = 0, n = elements.length; i < n; i++) {
      const element = elements[i];
      if (!element.hidden) {
        if (!element.checked) {
          return false;
        } else {
          whenNoneVisible = true;
        }
      }
    }
    return whenNoneVisible;
  }
  getCheckedCount() {
    let count = 0;
    const elements = this.elements;
    for (let i = 0, n = elements.length; i < n; i++) {
      if (elements[i].checked) {
        count++;
      }
    }
    return count;
  }
  getVisibleCount() {
    let count = 0;
    const elements = this.elements;
    for (let i = 0, n = elements.length; i < n; i++) {
      if (!elements[i].hidden) {
        count++;
      }
    }
    return count;
  }
  setAllVisibleChecked(checked) {
    try {
      this._fireCheckedEvents = false;
      this.elements.forEach((element) => {
        if (!element.hidden) {
          element.checked = checked;
        }
      });
    } finally {
      this._fireCheckedEvents = true;
      this.fireCheckedEvents();
    }
  }
  setElements(inputElements) {
    this.elementDisposables = dispose(this.elementDisposables);
    const fireButtonTriggered = (event) => this.fireButtonTriggered(event);
    this.inputElements = inputElements;
    this.elements = inputElements.reduce((result, item, index) => {
      var _a4, _b, _c;
      if (item.type !== "separator") {
        const previous = index && inputElements[index - 1];
        const saneLabel = item.label && item.label.replace(/\r?\n/g, " ");
        const saneSortLabel = parseLabelWithIcons(saneLabel).text.trim();
        const saneMeta = item.meta && item.meta.replace(/\r?\n/g, " ");
        const saneDescription = item.description && item.description.replace(/\r?\n/g, " ");
        const saneDetail = item.detail && item.detail.replace(/\r?\n/g, " ");
        const saneAriaLabel = item.ariaLabel || [saneLabel, saneDescription, saneDetail].map((s) => getCodiconAriaLabel(s)).filter((s) => !!s).join(", ");
        const hasCheckbox = this.parent.classList.contains("show-checkboxes");
        result.push(new ListElement({
          hasCheckbox,
          index,
          item,
          saneLabel,
          saneSortLabel,
          saneMeta,
          saneAriaLabel,
          saneDescription,
          saneDetail,
          labelHighlights: (_a4 = item.highlights) === null || _a4 === void 0 ? void 0 : _a4.label,
          descriptionHighlights: (_b = item.highlights) === null || _b === void 0 ? void 0 : _b.description,
          detailHighlights: (_c = item.highlights) === null || _c === void 0 ? void 0 : _c.detail,
          checked: false,
          separator: previous && previous.type === "separator" ? previous : void 0,
          fireButtonTriggered
        }));
      }
      return result;
    }, []);
    this.elementDisposables.push(...this.elements);
    this.elementDisposables.push(...this.elements.map((element) => element.onChecked(() => this.fireCheckedEvents())));
    this.elementsToIndexes = this.elements.reduce((map, element, index) => {
      map.set(element.item, index);
      return map;
    }, /* @__PURE__ */ new Map());
    this.list.splice(0, this.list.length);
    this.list.splice(0, this.list.length, this.elements);
    this._onChangedVisibleCount.fire(this.elements.length);
  }
  getFocusedElements() {
    return this.list.getFocusedElements().map((e) => e.item);
  }
  setFocusedElements(items) {
    this.list.setFocus(items.filter((item) => this.elementsToIndexes.has(item)).map((item) => this.elementsToIndexes.get(item)));
    if (items.length > 0) {
      const focused = this.list.getFocus()[0];
      if (typeof focused === "number") {
        this.list.reveal(focused);
      }
    }
  }
  getActiveDescendant() {
    return this.list.getHTMLElement().getAttribute("aria-activedescendant");
  }
  setSelectedElements(items) {
    this.list.setSelection(items.filter((item) => this.elementsToIndexes.has(item)).map((item) => this.elementsToIndexes.get(item)));
  }
  getCheckedElements() {
    return this.elements.filter((e) => e.checked).map((e) => e.item);
  }
  setCheckedElements(items) {
    try {
      this._fireCheckedEvents = false;
      const checked = /* @__PURE__ */ new Set();
      for (const item of items) {
        checked.add(item);
      }
      for (const element of this.elements) {
        element.checked = checked.has(element.item);
      }
    } finally {
      this._fireCheckedEvents = true;
      this.fireCheckedEvents();
    }
  }
  set enabled(value) {
    this.list.getHTMLElement().style.pointerEvents = value ? "" : "none";
  }
  focus(what) {
    if (!this.list.length) {
      return;
    }
    if (what === QuickInputListFocus.Next && this.list.getFocus()[0] === this.list.length - 1) {
      what = QuickInputListFocus.First;
    }
    if (what === QuickInputListFocus.Previous && this.list.getFocus()[0] === 0) {
      what = QuickInputListFocus.Last;
    }
    if (what === QuickInputListFocus.Second && this.list.length < 2) {
      what = QuickInputListFocus.First;
    }
    switch (what) {
      case QuickInputListFocus.First:
        this.list.focusFirst();
        break;
      case QuickInputListFocus.Second:
        this.list.focusNth(1);
        break;
      case QuickInputListFocus.Last:
        this.list.focusLast();
        break;
      case QuickInputListFocus.Next:
        this.list.focusNext();
        break;
      case QuickInputListFocus.Previous:
        this.list.focusPrevious();
        break;
      case QuickInputListFocus.NextPage:
        this.list.focusNextPage();
        break;
      case QuickInputListFocus.PreviousPage:
        this.list.focusPreviousPage();
        break;
    }
    const focused = this.list.getFocus()[0];
    if (typeof focused === "number") {
      this.list.reveal(focused);
    }
  }
  clearFocus() {
    this.list.setFocus([]);
  }
  domFocus() {
    this.list.domFocus();
  }
  layout(maxHeight) {
    this.list.getHTMLElement().style.maxHeight = maxHeight ? `calc(${Math.floor(maxHeight / 44) * 44}px)` : "";
    this.list.layout();
  }
  filter(query) {
    if (!(this.sortByLabel || this.matchOnLabel || this.matchOnDescription || this.matchOnDetail)) {
      this.list.layout();
      return false;
    }
    const queryWithWhitespace = query;
    query = query.trim();
    if (!query || !(this.matchOnLabel || this.matchOnDescription || this.matchOnDetail)) {
      this.elements.forEach((element) => {
        element.labelHighlights = void 0;
        element.descriptionHighlights = void 0;
        element.detailHighlights = void 0;
        element.hidden = false;
        const previous = element.index && this.inputElements[element.index - 1];
        element.separator = previous && previous.type === "separator" ? previous : void 0;
      });
    } else {
      let currentSeparator;
      this.elements.forEach((element) => {
        let labelHighlights;
        if (this.matchOnLabelMode === "fuzzy") {
          labelHighlights = this.matchOnLabel ? withNullAsUndefined(matchesFuzzyIconAware(query, parseLabelWithIcons(element.saneLabel))) : void 0;
        } else {
          labelHighlights = this.matchOnLabel ? withNullAsUndefined(matchesContiguousIconAware(queryWithWhitespace, parseLabelWithIcons(element.saneLabel))) : void 0;
        }
        const descriptionHighlights = this.matchOnDescription ? withNullAsUndefined(matchesFuzzyIconAware(query, parseLabelWithIcons(element.saneDescription || ""))) : void 0;
        const detailHighlights = this.matchOnDetail ? withNullAsUndefined(matchesFuzzyIconAware(query, parseLabelWithIcons(element.saneDetail || ""))) : void 0;
        const metaHighlights = this.matchOnMeta ? withNullAsUndefined(matchesFuzzyIconAware(query, parseLabelWithIcons(element.saneMeta || ""))) : void 0;
        if (labelHighlights || descriptionHighlights || detailHighlights || metaHighlights) {
          element.labelHighlights = labelHighlights;
          element.descriptionHighlights = descriptionHighlights;
          element.detailHighlights = detailHighlights;
          element.hidden = false;
        } else {
          element.labelHighlights = void 0;
          element.descriptionHighlights = void 0;
          element.detailHighlights = void 0;
          element.hidden = !element.item.alwaysShow;
        }
        element.separator = void 0;
        if (!this.sortByLabel) {
          const previous = element.index && this.inputElements[element.index - 1];
          currentSeparator = previous && previous.type === "separator" ? previous : currentSeparator;
          if (currentSeparator && !element.hidden) {
            element.separator = currentSeparator;
            currentSeparator = void 0;
          }
        }
      });
    }
    const shownElements = this.elements.filter((element) => !element.hidden);
    if (this.sortByLabel && query) {
      const normalizedSearchValue = query.toLowerCase();
      shownElements.sort((a, b) => {
        return compareEntries(a, b, normalizedSearchValue);
      });
    }
    this.elementsToIndexes = shownElements.reduce((map, element, index) => {
      map.set(element.item, index);
      return map;
    }, /* @__PURE__ */ new Map());
    this.list.splice(0, this.list.length, shownElements);
    this.list.setFocus([]);
    this.list.layout();
    this._onChangedAllVisibleChecked.fire(this.getAllVisibleChecked());
    this._onChangedVisibleCount.fire(shownElements.length);
    return true;
  }
  toggleCheckbox() {
    try {
      this._fireCheckedEvents = false;
      const elements = this.list.getFocusedElements();
      const allChecked = this.allVisibleChecked(elements);
      for (const element of elements) {
        element.checked = !allChecked;
      }
    } finally {
      this._fireCheckedEvents = true;
      this.fireCheckedEvents();
    }
  }
  display(display) {
    this.container.style.display = display ? "" : "none";
  }
  isDisplayed() {
    return this.container.style.display !== "none";
  }
  dispose() {
    this.elementDisposables = dispose(this.elementDisposables);
    this.disposables = dispose(this.disposables);
  }
  fireCheckedEvents() {
    if (this._fireCheckedEvents) {
      this._onChangedAllVisibleChecked.fire(this.getAllVisibleChecked());
      this._onChangedCheckedCount.fire(this.getCheckedCount());
      this._onChangedCheckedElements.fire(this.getCheckedElements());
    }
  }
  fireButtonTriggered(event) {
    this._onButtonTriggered.fire(event);
  }
  style(styles) {
    this.list.style(styles);
  }
};
__decorate11([
  memoize
], QuickInputList.prototype, "onDidChangeFocus", null);
__decorate11([
  memoize
], QuickInputList.prototype, "onDidChangeSelection", null);
function matchesContiguousIconAware(query, target) {
  const { text, iconOffsets } = target;
  if (!iconOffsets || iconOffsets.length === 0) {
    return matchesContiguous(query, text);
  }
  const wordToMatchAgainstWithoutIconsTrimmed = ltrim(text, " ");
  const leadingWhitespaceOffset = text.length - wordToMatchAgainstWithoutIconsTrimmed.length;
  const matches = matchesContiguous(query, wordToMatchAgainstWithoutIconsTrimmed);
  if (matches) {
    for (const match2 of matches) {
      const iconOffset = iconOffsets[match2.start + leadingWhitespaceOffset] + leadingWhitespaceOffset;
      match2.start += iconOffset;
      match2.end += iconOffset;
    }
  }
  return matches;
}
function matchesContiguous(word, wordToMatchAgainst) {
  const matchIndex = wordToMatchAgainst.toLowerCase().indexOf(word.toLowerCase());
  if (matchIndex !== -1) {
    return [{ start: matchIndex, end: matchIndex + word.length }];
  }
  return null;
}
function compareEntries(elementA, elementB, lookFor) {
  const labelHighlightsA = elementA.labelHighlights || [];
  const labelHighlightsB = elementB.labelHighlights || [];
  if (labelHighlightsA.length && !labelHighlightsB.length) {
    return -1;
  }
  if (!labelHighlightsA.length && labelHighlightsB.length) {
    return 1;
  }
  if (labelHighlightsA.length === 0 && labelHighlightsB.length === 0) {
    return 0;
  }
  return compareAnything(elementA.saneSortLabel, elementB.saneSortLabel, lookFor);
}
var QuickInputAccessibilityProvider = class {
  getWidgetAriaLabel() {
    return localize("quickInput", "Quick Input");
  }
  getAriaLabel(element) {
    var _a4;
    return ((_a4 = element.separator) === null || _a4 === void 0 ? void 0 : _a4.label) ? `${element.saneAriaLabel}, ${element.separator.label}` : element.saneAriaLabel;
  }
  getWidgetRole() {
    return "listbox";
  }
  getRole(element) {
    return element.hasCheckbox ? "checkbox" : "option";
  }
  isChecked(element) {
    if (!element.hasCheckbox) {
      return void 0;
    }
    return {
      value: element.checked,
      onDidChange: element.onChecked
    };
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/quickInput.js
var __awaiter10 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var $5 = $;
var backButton = {
  iconClass: Codicon.quickInputBack.classNames,
  tooltip: localize("quickInput.back", "Back"),
  handle: -1
};
var QuickInput = class extends Disposable {
  constructor(ui) {
    super();
    this.ui = ui;
    this.visible = false;
    this._enabled = true;
    this._busy = false;
    this._ignoreFocusOut = false;
    this._buttons = [];
    this.noValidationMessage = QuickInput.noPromptMessage;
    this._severity = severity_default.Ignore;
    this.buttonsUpdated = false;
    this.onDidTriggerButtonEmitter = this._register(new Emitter());
    this.onDidHideEmitter = this._register(new Emitter());
    this.onDisposeEmitter = this._register(new Emitter());
    this.visibleDisposables = this._register(new DisposableStore());
    this.onDidHide = this.onDidHideEmitter.event;
  }
  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
    this.update();
  }
  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
    this.update();
  }
  get step() {
    return this._steps;
  }
  set step(step) {
    this._steps = step;
    this.update();
  }
  get totalSteps() {
    return this._totalSteps;
  }
  set totalSteps(totalSteps) {
    this._totalSteps = totalSteps;
    this.update();
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(enabled) {
    this._enabled = enabled;
    this.update();
  }
  get contextKey() {
    return this._contextKey;
  }
  set contextKey(contextKey) {
    this._contextKey = contextKey;
    this.update();
  }
  get busy() {
    return this._busy;
  }
  set busy(busy) {
    this._busy = busy;
    this.update();
  }
  get ignoreFocusOut() {
    return this._ignoreFocusOut;
  }
  set ignoreFocusOut(ignoreFocusOut) {
    const shouldUpdate = this._ignoreFocusOut !== ignoreFocusOut && !isIOS;
    this._ignoreFocusOut = ignoreFocusOut && !isIOS;
    if (shouldUpdate) {
      this.update();
    }
  }
  get buttons() {
    return this._buttons;
  }
  set buttons(buttons) {
    this._buttons = buttons;
    this.buttonsUpdated = true;
    this.update();
  }
  get validationMessage() {
    return this._validationMessage;
  }
  set validationMessage(validationMessage) {
    this._validationMessage = validationMessage;
    this.update();
  }
  get severity() {
    return this._severity;
  }
  set severity(severity) {
    this._severity = severity;
    this.update();
  }
  show() {
    if (this.visible) {
      return;
    }
    this.visibleDisposables.add(this.ui.onDidTriggerButton((button) => {
      if (this.buttons.indexOf(button) !== -1) {
        this.onDidTriggerButtonEmitter.fire(button);
      }
    }));
    this.ui.show(this);
    this.visible = true;
    this._lastValidationMessage = void 0;
    this._lastSeverity = void 0;
    if (this.buttons.length) {
      this.buttonsUpdated = true;
    }
    this.update();
  }
  hide() {
    if (!this.visible) {
      return;
    }
    this.ui.hide();
  }
  didHide(reason = QuickInputHideReason.Other) {
    this.visible = false;
    this.visibleDisposables.clear();
    this.onDidHideEmitter.fire({ reason });
  }
  update() {
    if (!this.visible) {
      return;
    }
    const title = this.getTitle();
    if (title && this.ui.title.textContent !== title) {
      this.ui.title.textContent = title;
    } else if (!title && this.ui.title.innerHTML !== "&nbsp;") {
      this.ui.title.innerText = "\xA0";
    }
    const description = this.getDescription();
    if (this.ui.description1.textContent !== description) {
      this.ui.description1.textContent = description;
    }
    if (this.ui.description2.textContent !== description) {
      this.ui.description2.textContent = description;
    }
    if (this.busy && !this.busyDelay) {
      this.busyDelay = new TimeoutTimer();
      this.busyDelay.setIfNotSet(() => {
        if (this.visible) {
          this.ui.progressBar.infinite();
        }
      }, 800);
    }
    if (!this.busy && this.busyDelay) {
      this.ui.progressBar.stop();
      this.busyDelay.cancel();
      this.busyDelay = void 0;
    }
    if (this.buttonsUpdated) {
      this.buttonsUpdated = false;
      this.ui.leftActionBar.clear();
      const leftButtons = this.buttons.filter((button) => button === backButton);
      this.ui.leftActionBar.push(leftButtons.map((button, index) => {
        const action = new Action(`id-${index}`, "", button.iconClass || getIconClass(button.iconPath), true, () => __awaiter10(this, void 0, void 0, function* () {
          this.onDidTriggerButtonEmitter.fire(button);
        }));
        action.tooltip = button.tooltip || "";
        return action;
      }), { icon: true, label: false });
      this.ui.rightActionBar.clear();
      const rightButtons = this.buttons.filter((button) => button !== backButton);
      this.ui.rightActionBar.push(rightButtons.map((button, index) => {
        const action = new Action(`id-${index}`, "", button.iconClass || getIconClass(button.iconPath), true, () => __awaiter10(this, void 0, void 0, function* () {
          this.onDidTriggerButtonEmitter.fire(button);
        }));
        action.tooltip = button.tooltip || "";
        return action;
      }), { icon: true, label: false });
    }
    this.ui.ignoreFocusOut = this.ignoreFocusOut;
    this.ui.setEnabled(this.enabled);
    this.ui.setContextKey(this.contextKey);
    const validationMessage = this.validationMessage || this.noValidationMessage;
    if (this._lastValidationMessage !== validationMessage) {
      this._lastValidationMessage = validationMessage;
      reset(this.ui.message, ...renderLabelWithIcons(validationMessage));
    }
    if (this._lastSeverity !== this.severity) {
      this._lastSeverity = this.severity;
      this.showMessageDecoration(this.severity);
    }
  }
  getTitle() {
    if (this.title && this.step) {
      return `${this.title} (${this.getSteps()})`;
    }
    if (this.title) {
      return this.title;
    }
    if (this.step) {
      return this.getSteps();
    }
    return "";
  }
  getDescription() {
    return this.description || "";
  }
  getSteps() {
    if (this.step && this.totalSteps) {
      return localize("quickInput.steps", "{0}/{1}", this.step, this.totalSteps);
    }
    if (this.step) {
      return String(this.step);
    }
    return "";
  }
  showMessageDecoration(severity) {
    this.ui.inputBox.showDecoration(severity);
    if (severity !== severity_default.Ignore) {
      const styles = this.ui.inputBox.stylesForType(severity);
      this.ui.message.style.color = styles.foreground ? `${styles.foreground}` : "";
      this.ui.message.style.backgroundColor = styles.background ? `${styles.background}` : "";
      this.ui.message.style.border = styles.border ? `1px solid ${styles.border}` : "";
      this.ui.message.style.marginBottom = "-2px";
    } else {
      this.ui.message.style.color = "";
      this.ui.message.style.backgroundColor = "";
      this.ui.message.style.border = "";
      this.ui.message.style.marginBottom = "";
    }
  }
  dispose() {
    this.hide();
    this.onDisposeEmitter.fire();
    super.dispose();
  }
};
QuickInput.noPromptMessage = localize("inputModeEntry", "Press 'Enter' to confirm your input or 'Escape' to cancel");
var QuickPick = class extends QuickInput {
  constructor() {
    super(...arguments);
    this._value = "";
    this.onDidChangeValueEmitter = this._register(new Emitter());
    this.onWillAcceptEmitter = this._register(new Emitter());
    this.onDidAcceptEmitter = this._register(new Emitter());
    this.onDidCustomEmitter = this._register(new Emitter());
    this._items = [];
    this.itemsUpdated = false;
    this._canSelectMany = false;
    this._canAcceptInBackground = false;
    this._matchOnDescription = false;
    this._matchOnDetail = false;
    this._matchOnLabel = true;
    this._matchOnLabelMode = "fuzzy";
    this._sortByLabel = true;
    this._autoFocusOnList = true;
    this._keepScrollPosition = false;
    this._itemActivation = this.ui.isScreenReaderOptimized() ? ItemActivation.NONE : ItemActivation.FIRST;
    this._activeItems = [];
    this.activeItemsUpdated = false;
    this.activeItemsToConfirm = [];
    this.onDidChangeActiveEmitter = this._register(new Emitter());
    this._selectedItems = [];
    this.selectedItemsUpdated = false;
    this.selectedItemsToConfirm = [];
    this.onDidChangeSelectionEmitter = this._register(new Emitter());
    this.onDidTriggerItemButtonEmitter = this._register(new Emitter());
    this.valueSelectionUpdated = true;
    this._ok = "default";
    this._customButton = false;
    this.filterValue = (value) => value;
    this.onDidChangeValue = this.onDidChangeValueEmitter.event;
    this.onWillAccept = this.onWillAcceptEmitter.event;
    this.onDidAccept = this.onDidAcceptEmitter.event;
    this.onDidChangeActive = this.onDidChangeActiveEmitter.event;
    this.onDidChangeSelection = this.onDidChangeSelectionEmitter.event;
    this.onDidTriggerItemButton = this.onDidTriggerItemButtonEmitter.event;
  }
  get quickNavigate() {
    return this._quickNavigate;
  }
  set quickNavigate(quickNavigate) {
    this._quickNavigate = quickNavigate;
    this.update();
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this.doSetValue(value);
  }
  doSetValue(value, skipUpdate) {
    if (this._value !== value) {
      this._value = value;
      if (!skipUpdate) {
        this.update();
      }
      if (this.visible) {
        const didFilter = this.ui.list.filter(this.filterValue(this._value));
        if (didFilter) {
          this.trySelectFirst();
        }
      }
      this.onDidChangeValueEmitter.fire(this._value);
    }
  }
  set ariaLabel(ariaLabel) {
    this._ariaLabel = ariaLabel;
    this.update();
  }
  get ariaLabel() {
    return this._ariaLabel;
  }
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.update();
  }
  get items() {
    return this._items;
  }
  get scrollTop() {
    return this.ui.list.scrollTop;
  }
  set scrollTop(scrollTop) {
    this.ui.list.scrollTop = scrollTop;
  }
  set items(items) {
    this._items = items;
    this.itemsUpdated = true;
    this.update();
  }
  get canSelectMany() {
    return this._canSelectMany;
  }
  set canSelectMany(canSelectMany) {
    this._canSelectMany = canSelectMany;
    this.update();
  }
  get canAcceptInBackground() {
    return this._canAcceptInBackground;
  }
  set canAcceptInBackground(canAcceptInBackground) {
    this._canAcceptInBackground = canAcceptInBackground;
  }
  get matchOnDescription() {
    return this._matchOnDescription;
  }
  set matchOnDescription(matchOnDescription) {
    this._matchOnDescription = matchOnDescription;
    this.update();
  }
  get matchOnDetail() {
    return this._matchOnDetail;
  }
  set matchOnDetail(matchOnDetail) {
    this._matchOnDetail = matchOnDetail;
    this.update();
  }
  get matchOnLabel() {
    return this._matchOnLabel;
  }
  set matchOnLabel(matchOnLabel) {
    this._matchOnLabel = matchOnLabel;
    this.update();
  }
  get matchOnLabelMode() {
    return this._matchOnLabelMode;
  }
  set matchOnLabelMode(matchOnLabelMode) {
    this._matchOnLabelMode = matchOnLabelMode;
    this.update();
  }
  get sortByLabel() {
    return this._sortByLabel;
  }
  set sortByLabel(sortByLabel) {
    this._sortByLabel = sortByLabel;
    this.update();
  }
  get autoFocusOnList() {
    return this._autoFocusOnList;
  }
  set autoFocusOnList(autoFocusOnList) {
    this._autoFocusOnList = autoFocusOnList;
    this.update();
  }
  get keepScrollPosition() {
    return this._keepScrollPosition;
  }
  set keepScrollPosition(keepScrollPosition) {
    this._keepScrollPosition = keepScrollPosition;
  }
  get itemActivation() {
    return this._itemActivation;
  }
  set itemActivation(itemActivation) {
    this._itemActivation = itemActivation;
  }
  get activeItems() {
    return this._activeItems;
  }
  set activeItems(activeItems) {
    this._activeItems = activeItems;
    this.activeItemsUpdated = true;
    this.update();
  }
  get selectedItems() {
    return this._selectedItems;
  }
  set selectedItems(selectedItems) {
    this._selectedItems = selectedItems;
    this.selectedItemsUpdated = true;
    this.update();
  }
  get keyMods() {
    if (this._quickNavigate) {
      return NO_KEY_MODS;
    }
    return this.ui.keyMods;
  }
  set valueSelection(valueSelection) {
    this._valueSelection = valueSelection;
    this.valueSelectionUpdated = true;
    this.update();
  }
  get customButton() {
    return this._customButton;
  }
  set customButton(showCustomButton) {
    this._customButton = showCustomButton;
    this.update();
  }
  get customLabel() {
    return this._customButtonLabel;
  }
  set customLabel(label) {
    this._customButtonLabel = label;
    this.update();
  }
  get customHover() {
    return this._customButtonHover;
  }
  set customHover(hover) {
    this._customButtonHover = hover;
    this.update();
  }
  get ok() {
    return this._ok;
  }
  set ok(showOkButton) {
    this._ok = showOkButton;
    this.update();
  }
  get hideInput() {
    return !!this._hideInput;
  }
  set hideInput(hideInput) {
    this._hideInput = hideInput;
    this.update();
  }
  trySelectFirst() {
    if (this.autoFocusOnList) {
      if (!this.canSelectMany) {
        this.ui.list.focus(QuickInputListFocus.First);
      }
    }
  }
  show() {
    if (!this.visible) {
      this.visibleDisposables.add(this.ui.inputBox.onDidChange((value) => {
        this.doSetValue(value, true);
      }));
      this.visibleDisposables.add(this.ui.inputBox.onMouseDown((event) => {
        if (!this.autoFocusOnList) {
          this.ui.list.clearFocus();
        }
      }));
      this.visibleDisposables.add((this._hideInput ? this.ui.list : this.ui.inputBox).onKeyDown((event) => {
        switch (event.keyCode) {
          case 18:
            this.ui.list.focus(QuickInputListFocus.Next);
            if (this.canSelectMany) {
              this.ui.list.domFocus();
            }
            EventHelper.stop(event, true);
            break;
          case 16:
            if (this.ui.list.getFocusedElements().length) {
              this.ui.list.focus(QuickInputListFocus.Previous);
            } else {
              this.ui.list.focus(QuickInputListFocus.Last);
            }
            if (this.canSelectMany) {
              this.ui.list.domFocus();
            }
            EventHelper.stop(event, true);
            break;
          case 12:
            this.ui.list.focus(QuickInputListFocus.NextPage);
            if (this.canSelectMany) {
              this.ui.list.domFocus();
            }
            EventHelper.stop(event, true);
            break;
          case 11:
            this.ui.list.focus(QuickInputListFocus.PreviousPage);
            if (this.canSelectMany) {
              this.ui.list.domFocus();
            }
            EventHelper.stop(event, true);
            break;
          case 17:
            if (!this._canAcceptInBackground) {
              return;
            }
            if (!this.ui.inputBox.isSelectionAtEnd()) {
              return;
            }
            if (this.activeItems[0]) {
              this._selectedItems = [this.activeItems[0]];
              this.onDidChangeSelectionEmitter.fire(this.selectedItems);
              this.handleAccept(true);
            }
            break;
          case 14:
            if ((event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey) {
              this.ui.list.focus(QuickInputListFocus.First);
              EventHelper.stop(event, true);
            }
            break;
          case 13:
            if ((event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey) {
              this.ui.list.focus(QuickInputListFocus.Last);
              EventHelper.stop(event, true);
            }
            break;
        }
      }));
      this.visibleDisposables.add(this.ui.onDidAccept(() => {
        if (this.canSelectMany) {
          if (!this.ui.list.getCheckedElements().length) {
            this._selectedItems = [];
            this.onDidChangeSelectionEmitter.fire(this.selectedItems);
          }
        } else if (this.activeItems[0]) {
          this._selectedItems = [this.activeItems[0]];
          this.onDidChangeSelectionEmitter.fire(this.selectedItems);
        }
        this.handleAccept(false);
      }));
      this.visibleDisposables.add(this.ui.onDidCustom(() => {
        this.onDidCustomEmitter.fire();
      }));
      this.visibleDisposables.add(this.ui.list.onDidChangeFocus((focusedItems) => {
        if (this.activeItemsUpdated) {
          return;
        }
        if (this.activeItemsToConfirm !== this._activeItems && equals(focusedItems, this._activeItems, (a, b) => a === b)) {
          return;
        }
        this._activeItems = focusedItems;
        this.onDidChangeActiveEmitter.fire(focusedItems);
      }));
      this.visibleDisposables.add(this.ui.list.onDidChangeSelection(({ items: selectedItems, event }) => {
        if (this.canSelectMany) {
          if (selectedItems.length) {
            this.ui.list.setSelectedElements([]);
          }
          return;
        }
        if (this.selectedItemsToConfirm !== this._selectedItems && equals(selectedItems, this._selectedItems, (a, b) => a === b)) {
          return;
        }
        this._selectedItems = selectedItems;
        this.onDidChangeSelectionEmitter.fire(selectedItems);
        if (selectedItems.length) {
          this.handleAccept(event instanceof MouseEvent && event.button === 1);
        }
      }));
      this.visibleDisposables.add(this.ui.list.onChangedCheckedElements((checkedItems) => {
        if (!this.canSelectMany) {
          return;
        }
        if (this.selectedItemsToConfirm !== this._selectedItems && equals(checkedItems, this._selectedItems, (a, b) => a === b)) {
          return;
        }
        this._selectedItems = checkedItems;
        this.onDidChangeSelectionEmitter.fire(checkedItems);
      }));
      this.visibleDisposables.add(this.ui.list.onButtonTriggered((event) => this.onDidTriggerItemButtonEmitter.fire(event)));
      this.visibleDisposables.add(this.registerQuickNavigation());
      this.valueSelectionUpdated = true;
    }
    super.show();
  }
  handleAccept(inBackground) {
    let veto = false;
    this.onWillAcceptEmitter.fire({ veto: () => veto = true });
    if (!veto) {
      this.onDidAcceptEmitter.fire({ inBackground });
    }
  }
  registerQuickNavigation() {
    return addDisposableListener(this.ui.container, EventType.KEY_UP, (e) => {
      if (this.canSelectMany || !this._quickNavigate) {
        return;
      }
      const keyboardEvent = new StandardKeyboardEvent(e);
      const keyCode = keyboardEvent.keyCode;
      const quickNavKeys = this._quickNavigate.keybindings;
      const wasTriggerKeyPressed = quickNavKeys.some((k) => {
        const [firstPart, chordPart] = k.getParts();
        if (chordPart) {
          return false;
        }
        if (firstPart.shiftKey && keyCode === 4) {
          if (keyboardEvent.ctrlKey || keyboardEvent.altKey || keyboardEvent.metaKey) {
            return false;
          }
          return true;
        }
        if (firstPart.altKey && keyCode === 6) {
          return true;
        }
        if (firstPart.ctrlKey && keyCode === 5) {
          return true;
        }
        if (firstPart.metaKey && keyCode === 57) {
          return true;
        }
        return false;
      });
      if (wasTriggerKeyPressed) {
        if (this.activeItems[0]) {
          this._selectedItems = [this.activeItems[0]];
          this.onDidChangeSelectionEmitter.fire(this.selectedItems);
          this.handleAccept(false);
        }
        this._quickNavigate = void 0;
      }
    });
  }
  update() {
    if (!this.visible) {
      return;
    }
    const scrollTopBefore = this.keepScrollPosition ? this.scrollTop : 0;
    const hideInput = !!this._hideInput && this._items.length > 0;
    this.ui.container.classList.toggle("hidden-input", hideInput && !this.description);
    const visibilities = {
      title: !!this.title || !!this.step || !!this.buttons.length,
      description: !!this.description,
      checkAll: this.canSelectMany && !this._hideCheckAll,
      checkBox: this.canSelectMany,
      inputBox: !hideInput,
      progressBar: !hideInput,
      visibleCount: true,
      count: this.canSelectMany,
      ok: this.ok === "default" ? this.canSelectMany : this.ok,
      list: true,
      message: !!this.validationMessage,
      customButton: this.customButton
    };
    this.ui.setVisibilities(visibilities);
    super.update();
    if (this.ui.inputBox.value !== this.value) {
      this.ui.inputBox.value = this.value;
    }
    if (this.valueSelectionUpdated) {
      this.valueSelectionUpdated = false;
      this.ui.inputBox.select(this._valueSelection && { start: this._valueSelection[0], end: this._valueSelection[1] });
    }
    if (this.ui.inputBox.placeholder !== (this.placeholder || "")) {
      this.ui.inputBox.placeholder = this.placeholder || "";
    }
    let ariaLabel = this.ariaLabel;
    if (!ariaLabel) {
      ariaLabel = this.placeholder || QuickPick.DEFAULT_ARIA_LABEL;
      if (this.title) {
        ariaLabel += ` - ${this.title}`;
      }
    }
    if (this.ui.inputBox.ariaLabel !== ariaLabel) {
      this.ui.inputBox.ariaLabel = ariaLabel;
    }
    this.ui.list.matchOnDescription = this.matchOnDescription;
    this.ui.list.matchOnDetail = this.matchOnDetail;
    this.ui.list.matchOnLabel = this.matchOnLabel;
    this.ui.list.matchOnLabelMode = this.matchOnLabelMode;
    this.ui.list.sortByLabel = this.sortByLabel;
    if (this.itemsUpdated) {
      this.itemsUpdated = false;
      this.ui.list.setElements(this.items);
      this.ui.list.filter(this.filterValue(this.ui.inputBox.value));
      this.ui.checkAll.checked = this.ui.list.getAllVisibleChecked();
      this.ui.visibleCount.setCount(this.ui.list.getVisibleCount());
      this.ui.count.setCount(this.ui.list.getCheckedCount());
      switch (this._itemActivation) {
        case ItemActivation.NONE:
          this._itemActivation = ItemActivation.FIRST;
          break;
        case ItemActivation.SECOND:
          this.ui.list.focus(QuickInputListFocus.Second);
          this._itemActivation = ItemActivation.FIRST;
          break;
        case ItemActivation.LAST:
          this.ui.list.focus(QuickInputListFocus.Last);
          this._itemActivation = ItemActivation.FIRST;
          break;
        default:
          this.trySelectFirst();
          break;
      }
    }
    if (this.ui.container.classList.contains("show-checkboxes") !== !!this.canSelectMany) {
      if (this.canSelectMany) {
        this.ui.list.clearFocus();
      } else {
        this.trySelectFirst();
      }
    }
    if (this.activeItemsUpdated) {
      this.activeItemsUpdated = false;
      this.activeItemsToConfirm = this._activeItems;
      this.ui.list.setFocusedElements(this.activeItems);
      if (this.activeItemsToConfirm === this._activeItems) {
        this.activeItemsToConfirm = null;
      }
    }
    if (this.selectedItemsUpdated) {
      this.selectedItemsUpdated = false;
      this.selectedItemsToConfirm = this._selectedItems;
      if (this.canSelectMany) {
        this.ui.list.setCheckedElements(this.selectedItems);
      } else {
        this.ui.list.setSelectedElements(this.selectedItems);
      }
      if (this.selectedItemsToConfirm === this._selectedItems) {
        this.selectedItemsToConfirm = null;
      }
    }
    this.ui.customButton.label = this.customLabel || "";
    this.ui.customButton.element.title = this.customHover || "";
    this.ui.setComboboxAccessibility(true);
    if (!visibilities.inputBox) {
      this.ui.list.domFocus();
      if (this.canSelectMany) {
        this.ui.list.focus(QuickInputListFocus.First);
      }
    }
    if (this.keepScrollPosition) {
      this.scrollTop = scrollTopBefore;
    }
  }
};
QuickPick.DEFAULT_ARIA_LABEL = localize("quickInputBox.ariaLabel", "Type to narrow down results.");
var QuickInputController = class extends Disposable {
  constructor(options) {
    super();
    this.options = options;
    this.comboboxAccessibility = false;
    this.enabled = true;
    this.onDidAcceptEmitter = this._register(new Emitter());
    this.onDidCustomEmitter = this._register(new Emitter());
    this.onDidTriggerButtonEmitter = this._register(new Emitter());
    this.keyMods = { ctrlCmd: false, alt: false };
    this.controller = null;
    this.onShowEmitter = this._register(new Emitter());
    this.onShow = this.onShowEmitter.event;
    this.onHideEmitter = this._register(new Emitter());
    this.onHide = this.onHideEmitter.event;
    this.idPrefix = options.idPrefix;
    this.parentElement = options.container;
    this.styles = options.styles;
    this.registerKeyModsListeners();
  }
  registerKeyModsListeners() {
    const listener = (e) => {
      this.keyMods.ctrlCmd = e.ctrlKey || e.metaKey;
      this.keyMods.alt = e.altKey;
    };
    this._register(addDisposableListener(window, EventType.KEY_DOWN, listener, true));
    this._register(addDisposableListener(window, EventType.KEY_UP, listener, true));
    this._register(addDisposableListener(window, EventType.MOUSE_DOWN, listener, true));
  }
  getUI() {
    if (this.ui) {
      return this.ui;
    }
    const container = append(this.parentElement, $5(".quick-input-widget.show-file-icons"));
    container.tabIndex = -1;
    container.style.display = "none";
    const styleSheet = createStyleSheet(container);
    const titleBar = append(container, $5(".quick-input-titlebar"));
    const leftActionBar = this._register(new ActionBar(titleBar));
    leftActionBar.domNode.classList.add("quick-input-left-action-bar");
    const title = append(titleBar, $5(".quick-input-title"));
    const rightActionBar = this._register(new ActionBar(titleBar));
    rightActionBar.domNode.classList.add("quick-input-right-action-bar");
    const description1 = append(container, $5(".quick-input-description"));
    const headerContainer = append(container, $5(".quick-input-header"));
    const checkAll = append(headerContainer, $5("input.quick-input-check-all"));
    checkAll.type = "checkbox";
    checkAll.setAttribute("aria-label", localize("quickInput.checkAll", "Toggle all checkboxes"));
    this._register(addStandardDisposableListener(checkAll, EventType.CHANGE, (e) => {
      const checked = checkAll.checked;
      list.setAllVisibleChecked(checked);
    }));
    this._register(addDisposableListener(checkAll, EventType.CLICK, (e) => {
      if (e.x || e.y) {
        inputBox.setFocus();
      }
    }));
    const description2 = append(headerContainer, $5(".quick-input-description"));
    const extraContainer = append(headerContainer, $5(".quick-input-and-message"));
    const filterContainer = append(extraContainer, $5(".quick-input-filter"));
    const inputBox = this._register(new QuickInputBox(filterContainer));
    inputBox.setAttribute("aria-describedby", `${this.idPrefix}message`);
    const visibleCountContainer = append(filterContainer, $5(".quick-input-visible-count"));
    visibleCountContainer.setAttribute("aria-live", "polite");
    visibleCountContainer.setAttribute("aria-atomic", "true");
    const visibleCount = new CountBadge(visibleCountContainer, { countFormat: localize({ key: "quickInput.visibleCount", comment: ["This tells the user how many items are shown in a list of items to select from. The items can be anything. Currently not visible, but read by screen readers."] }, "{0} Results") });
    const countContainer = append(filterContainer, $5(".quick-input-count"));
    countContainer.setAttribute("aria-live", "polite");
    const count = new CountBadge(countContainer, { countFormat: localize({ key: "quickInput.countSelected", comment: ["This tells the user how many items are selected in a list of items to select from. The items can be anything."] }, "{0} Selected") });
    const okContainer = append(headerContainer, $5(".quick-input-action"));
    const ok = new Button(okContainer);
    ok.label = localize("ok", "OK");
    this._register(ok.onDidClick((e) => {
      this.onDidAcceptEmitter.fire();
    }));
    const customButtonContainer = append(headerContainer, $5(".quick-input-action"));
    const customButton = new Button(customButtonContainer);
    customButton.label = localize("custom", "Custom");
    this._register(customButton.onDidClick((e) => {
      this.onDidCustomEmitter.fire();
    }));
    const message = append(extraContainer, $5(`#${this.idPrefix}message.quick-input-message`));
    const list = this._register(new QuickInputList(container, this.idPrefix + "list", this.options));
    this._register(list.onChangedAllVisibleChecked((checked) => {
      checkAll.checked = checked;
    }));
    this._register(list.onChangedVisibleCount((c) => {
      visibleCount.setCount(c);
    }));
    this._register(list.onChangedCheckedCount((c) => {
      count.setCount(c);
    }));
    this._register(list.onLeave(() => {
      setTimeout(() => {
        inputBox.setFocus();
        if (this.controller instanceof QuickPick && this.controller.canSelectMany) {
          list.clearFocus();
        }
      }, 0);
    }));
    this._register(list.onDidChangeFocus(() => {
      if (this.comboboxAccessibility) {
        this.getUI().inputBox.setAttribute("aria-activedescendant", this.getUI().list.getActiveDescendant() || "");
      }
    }));
    const progressBar = new ProgressBar(container);
    progressBar.getContainer().classList.add("quick-input-progress");
    const focusTracker = trackFocus(container);
    this._register(focusTracker);
    this._register(addDisposableListener(container, EventType.FOCUS, (e) => {
      this.previousFocusElement = e.relatedTarget instanceof HTMLElement ? e.relatedTarget : void 0;
    }, true));
    this._register(focusTracker.onDidBlur(() => {
      if (!this.getUI().ignoreFocusOut && !this.options.ignoreFocusOut()) {
        this.hide(QuickInputHideReason.Blur);
      }
      this.previousFocusElement = void 0;
    }));
    this._register(addDisposableListener(container, EventType.FOCUS, (e) => {
      inputBox.setFocus();
    }));
    this._register(addDisposableListener(container, EventType.KEY_DOWN, (e) => {
      const event = new StandardKeyboardEvent(e);
      switch (event.keyCode) {
        case 3:
          EventHelper.stop(e, true);
          this.onDidAcceptEmitter.fire();
          break;
        case 9:
          EventHelper.stop(e, true);
          this.hide(QuickInputHideReason.Gesture);
          break;
        case 2:
          if (!event.altKey && !event.ctrlKey && !event.metaKey) {
            const selectors = [".action-label.codicon"];
            if (container.classList.contains("show-checkboxes")) {
              selectors.push("input");
            } else {
              selectors.push("input[type=text]");
            }
            if (this.getUI().list.isDisplayed()) {
              selectors.push(".monaco-list");
            }
            const stops = container.querySelectorAll(selectors.join(", "));
            if (event.shiftKey && event.target === stops[0]) {
              EventHelper.stop(e, true);
              stops[stops.length - 1].focus();
            } else if (!event.shiftKey && event.target === stops[stops.length - 1]) {
              EventHelper.stop(e, true);
              stops[0].focus();
            }
          }
          break;
      }
    }));
    this.ui = {
      container,
      styleSheet,
      leftActionBar,
      titleBar,
      title,
      description1,
      description2,
      rightActionBar,
      checkAll,
      filterContainer,
      inputBox,
      visibleCountContainer,
      visibleCount,
      countContainer,
      count,
      okContainer,
      ok,
      message,
      customButtonContainer,
      customButton,
      list,
      progressBar,
      onDidAccept: this.onDidAcceptEmitter.event,
      onDidCustom: this.onDidCustomEmitter.event,
      onDidTriggerButton: this.onDidTriggerButtonEmitter.event,
      ignoreFocusOut: false,
      keyMods: this.keyMods,
      isScreenReaderOptimized: () => this.options.isScreenReaderOptimized(),
      show: (controller) => this.show(controller),
      hide: () => this.hide(),
      setVisibilities: (visibilities) => this.setVisibilities(visibilities),
      setComboboxAccessibility: (enabled) => this.setComboboxAccessibility(enabled),
      setEnabled: (enabled) => this.setEnabled(enabled),
      setContextKey: (contextKey) => this.options.setContextKey(contextKey)
    };
    this.updateStyles();
    return this.ui;
  }
  pick(picks, options = {}, token = CancellationToken.None) {
    return new Promise((doResolve, reject) => {
      let resolve = (result) => {
        var _a4;
        resolve = doResolve;
        (_a4 = options.onKeyMods) === null || _a4 === void 0 ? void 0 : _a4.call(options, input.keyMods);
        doResolve(result);
      };
      if (token.isCancellationRequested) {
        resolve(void 0);
        return;
      }
      const input = this.createQuickPick();
      let activeItem;
      const disposables = [
        input,
        input.onDidAccept(() => {
          if (input.canSelectMany) {
            resolve(input.selectedItems.slice());
            input.hide();
          } else {
            const result = input.activeItems[0];
            if (result) {
              resolve(result);
              input.hide();
            }
          }
        }),
        input.onDidChangeActive((items) => {
          const focused = items[0];
          if (focused && options.onDidFocus) {
            options.onDidFocus(focused);
          }
        }),
        input.onDidChangeSelection((items) => {
          if (!input.canSelectMany) {
            const result = items[0];
            if (result) {
              resolve(result);
              input.hide();
            }
          }
        }),
        input.onDidTriggerItemButton((event) => options.onDidTriggerItemButton && options.onDidTriggerItemButton(Object.assign(Object.assign({}, event), { removeItem: () => {
          const index = input.items.indexOf(event.item);
          if (index !== -1) {
            const items = input.items.slice();
            const removed = items.splice(index, 1);
            const activeItems = input.activeItems.filter((activeItem2) => activeItem2 !== removed[0]);
            const keepScrollPositionBefore = input.keepScrollPosition;
            input.keepScrollPosition = true;
            input.items = items;
            if (activeItems) {
              input.activeItems = activeItems;
            }
            input.keepScrollPosition = keepScrollPositionBefore;
          }
        } }))),
        input.onDidChangeValue((value) => {
          if (activeItem && !value && (input.activeItems.length !== 1 || input.activeItems[0] !== activeItem)) {
            input.activeItems = [activeItem];
          }
        }),
        token.onCancellationRequested(() => {
          input.hide();
        }),
        input.onDidHide(() => {
          dispose(disposables);
          resolve(void 0);
        })
      ];
      input.title = options.title;
      input.canSelectMany = !!options.canPickMany;
      input.placeholder = options.placeHolder;
      input.ignoreFocusOut = !!options.ignoreFocusLost;
      input.matchOnDescription = !!options.matchOnDescription;
      input.matchOnDetail = !!options.matchOnDetail;
      input.matchOnLabel = options.matchOnLabel === void 0 || options.matchOnLabel;
      input.autoFocusOnList = options.autoFocusOnList === void 0 || options.autoFocusOnList;
      input.quickNavigate = options.quickNavigate;
      input.hideInput = !!options.hideInput;
      input.contextKey = options.contextKey;
      input.busy = true;
      Promise.all([picks, options.activeItem]).then(([items, _activeItem]) => {
        activeItem = _activeItem;
        input.busy = false;
        input.items = items;
        if (input.canSelectMany) {
          input.selectedItems = items.filter((item) => item.type !== "separator" && item.picked);
        }
        if (activeItem) {
          input.activeItems = [activeItem];
        }
      });
      input.show();
      Promise.resolve(picks).then(void 0, (err) => {
        reject(err);
        input.hide();
      });
    });
  }
  createQuickPick() {
    const ui = this.getUI();
    return new QuickPick(ui);
  }
  show(controller) {
    const ui = this.getUI();
    this.onShowEmitter.fire();
    const oldController = this.controller;
    this.controller = controller;
    if (oldController) {
      oldController.didHide();
    }
    this.setEnabled(true);
    ui.leftActionBar.clear();
    ui.title.textContent = "";
    ui.description1.textContent = "";
    ui.description2.textContent = "";
    ui.rightActionBar.clear();
    ui.checkAll.checked = false;
    ui.inputBox.placeholder = "";
    ui.inputBox.password = false;
    ui.inputBox.showDecoration(severity_default.Ignore);
    ui.visibleCount.setCount(0);
    ui.count.setCount(0);
    reset(ui.message);
    ui.progressBar.stop();
    ui.list.setElements([]);
    ui.list.matchOnDescription = false;
    ui.list.matchOnDetail = false;
    ui.list.matchOnLabel = true;
    ui.list.sortByLabel = true;
    ui.ignoreFocusOut = false;
    this.setComboboxAccessibility(false);
    ui.inputBox.ariaLabel = "";
    const backKeybindingLabel = this.options.backKeybindingLabel();
    backButton.tooltip = backKeybindingLabel ? localize("quickInput.backWithKeybinding", "Back ({0})", backKeybindingLabel) : localize("quickInput.back", "Back");
    ui.container.style.display = "";
    this.updateLayout();
    ui.inputBox.setFocus();
  }
  setVisibilities(visibilities) {
    const ui = this.getUI();
    ui.title.style.display = visibilities.title ? "" : "none";
    ui.description1.style.display = visibilities.description && (visibilities.inputBox || visibilities.checkAll) ? "" : "none";
    ui.description2.style.display = visibilities.description && !(visibilities.inputBox || visibilities.checkAll) ? "" : "none";
    ui.checkAll.style.display = visibilities.checkAll ? "" : "none";
    ui.filterContainer.style.display = visibilities.inputBox ? "" : "none";
    ui.visibleCountContainer.style.display = visibilities.visibleCount ? "" : "none";
    ui.countContainer.style.display = visibilities.count ? "" : "none";
    ui.okContainer.style.display = visibilities.ok ? "" : "none";
    ui.customButtonContainer.style.display = visibilities.customButton ? "" : "none";
    ui.message.style.display = visibilities.message ? "" : "none";
    ui.progressBar.getContainer().style.display = visibilities.progressBar ? "" : "none";
    ui.list.display(!!visibilities.list);
    ui.container.classList[visibilities.checkBox ? "add" : "remove"]("show-checkboxes");
    this.updateLayout();
  }
  setComboboxAccessibility(enabled) {
    if (enabled !== this.comboboxAccessibility) {
      const ui = this.getUI();
      this.comboboxAccessibility = enabled;
      if (this.comboboxAccessibility) {
        ui.inputBox.setAttribute("role", "combobox");
        ui.inputBox.setAttribute("aria-haspopup", "true");
        ui.inputBox.setAttribute("aria-autocomplete", "list");
        ui.inputBox.setAttribute("aria-activedescendant", ui.list.getActiveDescendant() || "");
      } else {
        ui.inputBox.removeAttribute("role");
        ui.inputBox.removeAttribute("aria-haspopup");
        ui.inputBox.removeAttribute("aria-autocomplete");
        ui.inputBox.removeAttribute("aria-activedescendant");
      }
    }
  }
  setEnabled(enabled) {
    if (enabled !== this.enabled) {
      this.enabled = enabled;
      for (const item of this.getUI().leftActionBar.viewItems) {
        item.getAction().enabled = enabled;
      }
      for (const item of this.getUI().rightActionBar.viewItems) {
        item.getAction().enabled = enabled;
      }
      this.getUI().checkAll.disabled = !enabled;
      this.getUI().ok.enabled = enabled;
      this.getUI().list.enabled = enabled;
    }
  }
  hide(reason) {
    var _a4;
    const controller = this.controller;
    if (controller) {
      const focusChanged = !((_a4 = this.ui) === null || _a4 === void 0 ? void 0 : _a4.container.contains(document.activeElement));
      this.controller = null;
      this.onHideEmitter.fire();
      this.getUI().container.style.display = "none";
      if (!focusChanged) {
        let currentElement = this.previousFocusElement;
        while (currentElement && !currentElement.offsetParent) {
          currentElement = withNullAsUndefined(currentElement.parentElement);
        }
        if (currentElement === null || currentElement === void 0 ? void 0 : currentElement.offsetParent) {
          currentElement.focus();
          this.previousFocusElement = void 0;
        } else {
          this.options.returnFocus();
        }
      }
      controller.didHide(reason);
    }
  }
  layout(dimension, titleBarOffset) {
    this.dimension = dimension;
    this.titleBarOffset = titleBarOffset;
    this.updateLayout();
  }
  updateLayout() {
    if (this.ui) {
      this.ui.container.style.top = `${this.titleBarOffset}px`;
      const style = this.ui.container.style;
      const width = Math.min(this.dimension.width * 0.62, QuickInputController.MAX_WIDTH);
      style.width = width + "px";
      style.marginLeft = "-" + width / 2 + "px";
      this.ui.inputBox.layout();
      this.ui.list.layout(this.dimension && this.dimension.height * 0.4);
    }
  }
  applyStyles(styles) {
    this.styles = styles;
    this.updateStyles();
  }
  updateStyles() {
    if (this.ui) {
      const { quickInputTitleBackground: quickInputTitleBackground2, quickInputBackground: quickInputBackground2, quickInputForeground: quickInputForeground2, contrastBorder: contrastBorder2, widgetShadow: widgetShadow2 } = this.styles.widget;
      this.ui.titleBar.style.backgroundColor = quickInputTitleBackground2 ? quickInputTitleBackground2.toString() : "";
      this.ui.container.style.backgroundColor = quickInputBackground2 ? quickInputBackground2.toString() : "";
      this.ui.container.style.color = quickInputForeground2 ? quickInputForeground2.toString() : "";
      this.ui.container.style.border = contrastBorder2 ? `1px solid ${contrastBorder2}` : "";
      this.ui.container.style.boxShadow = widgetShadow2 ? `0 0 8px 2px ${widgetShadow2}` : "";
      this.ui.inputBox.style(this.styles.inputBox);
      this.ui.count.style(this.styles.countBadge);
      this.ui.ok.style(this.styles.button);
      this.ui.customButton.style(this.styles.button);
      this.ui.progressBar.style(this.styles.progressBar);
      this.ui.list.style(this.styles.list);
      const content = [];
      if (this.styles.list.pickerGroupBorder) {
        content.push(`.quick-input-list .quick-input-list-entry { border-top-color:  ${this.styles.list.pickerGroupBorder}; }`);
      }
      if (this.styles.list.pickerGroupForeground) {
        content.push(`.quick-input-list .quick-input-list-separator { color:  ${this.styles.list.pickerGroupForeground}; }`);
      }
      if (this.styles.keybindingLabel.keybindingLabelBackground || this.styles.keybindingLabel.keybindingLabelBorder || this.styles.keybindingLabel.keybindingLabelBottomBorder || this.styles.keybindingLabel.keybindingLabelShadow || this.styles.keybindingLabel.keybindingLabelForeground) {
        content.push(".quick-input-list .monaco-keybinding > .monaco-keybinding-key {");
        if (this.styles.keybindingLabel.keybindingLabelBackground) {
          content.push(`background-color: ${this.styles.keybindingLabel.keybindingLabelBackground};`);
        }
        if (this.styles.keybindingLabel.keybindingLabelBorder) {
          content.push(`border-color: ${this.styles.keybindingLabel.keybindingLabelBorder};`);
        }
        if (this.styles.keybindingLabel.keybindingLabelBottomBorder) {
          content.push(`border-bottom-color: ${this.styles.keybindingLabel.keybindingLabelBottomBorder};`);
        }
        if (this.styles.keybindingLabel.keybindingLabelShadow) {
          content.push(`box-shadow: inset 0 -1px 0 ${this.styles.keybindingLabel.keybindingLabelShadow};`);
        }
        if (this.styles.keybindingLabel.keybindingLabelForeground) {
          content.push(`color: ${this.styles.keybindingLabel.keybindingLabelForeground};`);
        }
        content.push("}");
      }
      const newStyles = content.join("\n");
      if (newStyles !== this.ui.styleSheet.textContent) {
        this.ui.styleSheet.textContent = newStyles;
      }
    }
  }
};
QuickInputController.MAX_WIDTH = 600;

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/quickInput.js
init_contextkey();
init_instantiation();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/quickAccess.js
init_define_process();
init_async();
init_cancellation();
init_functional();
init_lifecycle();
init_instantiation();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/common/quickAccess.js
init_define_process();
init_arrays();
init_lifecycle();
init_platform2();
var DefaultQuickAccessFilterValue;
(function(DefaultQuickAccessFilterValue2) {
  DefaultQuickAccessFilterValue2[DefaultQuickAccessFilterValue2["PRESERVE"] = 0] = "PRESERVE";
  DefaultQuickAccessFilterValue2[DefaultQuickAccessFilterValue2["LAST"] = 1] = "LAST";
})(DefaultQuickAccessFilterValue || (DefaultQuickAccessFilterValue = {}));
var Extensions4 = {
  Quickaccess: "workbench.contributions.quickaccess"
};
var QuickAccessRegistry = class {
  constructor() {
    this.providers = [];
    this.defaultProvider = void 0;
  }
  registerQuickAccessProvider(provider) {
    if (provider.prefix.length === 0) {
      this.defaultProvider = provider;
    } else {
      this.providers.push(provider);
    }
    this.providers.sort((providerA, providerB) => providerB.prefix.length - providerA.prefix.length);
    return toDisposable(() => {
      this.providers.splice(this.providers.indexOf(provider), 1);
      if (this.defaultProvider === provider) {
        this.defaultProvider = void 0;
      }
    });
  }
  getQuickAccessProviders() {
    return coalesce([this.defaultProvider, ...this.providers]);
  }
  getQuickAccessProvider(prefix) {
    const result = prefix ? this.providers.find((provider) => prefix.startsWith(provider.prefix)) || void 0 : void 0;
    return result || this.defaultProvider;
  }
};
Registry.add(Extensions4.Quickaccess, new QuickAccessRegistry());

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/quickAccess.js
init_platform2();
var __decorate12 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param11 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var QuickAccessController = class QuickAccessController2 extends Disposable {
  constructor(quickInputService, instantiationService) {
    super();
    this.quickInputService = quickInputService;
    this.instantiationService = instantiationService;
    this.registry = Registry.as(Extensions4.Quickaccess);
    this.mapProviderToDescriptor = /* @__PURE__ */ new Map();
    this.lastAcceptedPickerValues = /* @__PURE__ */ new Map();
    this.visibleQuickAccess = void 0;
  }
  show(value = "", options) {
    this.doShowOrPick(value, false, options);
  }
  doShowOrPick(value, pick, options) {
    var _a4;
    const [provider, descriptor] = this.getOrInstantiateProvider(value);
    const visibleQuickAccess = this.visibleQuickAccess;
    const visibleDescriptor = visibleQuickAccess === null || visibleQuickAccess === void 0 ? void 0 : visibleQuickAccess.descriptor;
    if (visibleQuickAccess && descriptor && visibleDescriptor === descriptor) {
      if (value !== descriptor.prefix && !(options === null || options === void 0 ? void 0 : options.preserveValue)) {
        visibleQuickAccess.picker.value = value;
      }
      this.adjustValueSelection(visibleQuickAccess.picker, descriptor, options);
      return;
    }
    if (descriptor && !(options === null || options === void 0 ? void 0 : options.preserveValue)) {
      let newValue = void 0;
      if (visibleQuickAccess && visibleDescriptor && visibleDescriptor !== descriptor) {
        const newValueCandidateWithoutPrefix = visibleQuickAccess.value.substr(visibleDescriptor.prefix.length);
        if (newValueCandidateWithoutPrefix) {
          newValue = `${descriptor.prefix}${newValueCandidateWithoutPrefix}`;
        }
      }
      if (!newValue) {
        const defaultFilterValue = provider === null || provider === void 0 ? void 0 : provider.defaultFilterValue;
        if (defaultFilterValue === DefaultQuickAccessFilterValue.LAST) {
          newValue = this.lastAcceptedPickerValues.get(descriptor);
        } else if (typeof defaultFilterValue === "string") {
          newValue = `${descriptor.prefix}${defaultFilterValue}`;
        }
      }
      if (typeof newValue === "string") {
        value = newValue;
      }
    }
    const disposables = new DisposableStore();
    const picker = disposables.add(this.quickInputService.createQuickPick());
    picker.value = value;
    this.adjustValueSelection(picker, descriptor, options);
    picker.placeholder = descriptor === null || descriptor === void 0 ? void 0 : descriptor.placeholder;
    picker.quickNavigate = options === null || options === void 0 ? void 0 : options.quickNavigateConfiguration;
    picker.hideInput = !!picker.quickNavigate && !visibleQuickAccess;
    if (typeof (options === null || options === void 0 ? void 0 : options.itemActivation) === "number" || (options === null || options === void 0 ? void 0 : options.quickNavigateConfiguration)) {
      picker.itemActivation = (_a4 = options === null || options === void 0 ? void 0 : options.itemActivation) !== null && _a4 !== void 0 ? _a4 : ItemActivation.SECOND;
    }
    picker.contextKey = descriptor === null || descriptor === void 0 ? void 0 : descriptor.contextKey;
    picker.filterValue = (value2) => value2.substring(descriptor ? descriptor.prefix.length : 0);
    if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.placeholder) {
      picker.ariaLabel = descriptor === null || descriptor === void 0 ? void 0 : descriptor.placeholder;
    }
    let pickPromise = void 0;
    if (pick) {
      pickPromise = new DeferredPromise();
      disposables.add(once(picker.onWillAccept)((e) => {
        e.veto();
        picker.hide();
      }));
    }
    disposables.add(this.registerPickerListeners(picker, provider, descriptor, value));
    const cts = disposables.add(new CancellationTokenSource());
    if (provider) {
      disposables.add(provider.provide(picker, cts.token));
    }
    once(picker.onDidHide)(() => {
      if (picker.selectedItems.length === 0) {
        cts.cancel();
      }
      disposables.dispose();
      pickPromise === null || pickPromise === void 0 ? void 0 : pickPromise.complete(picker.selectedItems.slice(0));
    });
    picker.show();
    if (pick) {
      return pickPromise === null || pickPromise === void 0 ? void 0 : pickPromise.p;
    }
  }
  adjustValueSelection(picker, descriptor, options) {
    var _a4;
    let valueSelection;
    if (options === null || options === void 0 ? void 0 : options.preserveValue) {
      valueSelection = [picker.value.length, picker.value.length];
    } else {
      valueSelection = [(_a4 = descriptor === null || descriptor === void 0 ? void 0 : descriptor.prefix.length) !== null && _a4 !== void 0 ? _a4 : 0, picker.value.length];
    }
    picker.valueSelection = valueSelection;
  }
  registerPickerListeners(picker, provider, descriptor, value) {
    const disposables = new DisposableStore();
    const visibleQuickAccess = this.visibleQuickAccess = { picker, descriptor, value };
    disposables.add(toDisposable(() => {
      if (visibleQuickAccess === this.visibleQuickAccess) {
        this.visibleQuickAccess = void 0;
      }
    }));
    disposables.add(picker.onDidChangeValue((value2) => {
      const [providerForValue] = this.getOrInstantiateProvider(value2);
      if (providerForValue !== provider) {
        this.show(value2, { preserveValue: true });
      } else {
        visibleQuickAccess.value = value2;
      }
    }));
    if (descriptor) {
      disposables.add(picker.onDidAccept(() => {
        this.lastAcceptedPickerValues.set(descriptor, picker.value);
      }));
    }
    return disposables;
  }
  getOrInstantiateProvider(value) {
    const providerDescriptor = this.registry.getQuickAccessProvider(value);
    if (!providerDescriptor) {
      return [void 0, void 0];
    }
    let provider = this.mapProviderToDescriptor.get(providerDescriptor);
    if (!provider) {
      provider = this.instantiationService.createInstance(providerDescriptor.ctor);
      this.mapProviderToDescriptor.set(providerDescriptor, provider);
    }
    return [provider, providerDescriptor];
  }
};
QuickAccessController = __decorate12([
  __param11(0, IQuickInputService),
  __param11(1, IInstantiationService)
], QuickAccessController);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/quickinput/browser/quickInput.js
init_colorRegistry();
init_themeService();
var __decorate13 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param12 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var QuickInputService = class QuickInputService2 extends Themable {
  constructor(instantiationService, contextKeyService, themeService, accessibilityService, layoutService) {
    super(themeService);
    this.instantiationService = instantiationService;
    this.contextKeyService = contextKeyService;
    this.accessibilityService = accessibilityService;
    this.layoutService = layoutService;
    this.contexts = /* @__PURE__ */ new Map();
  }
  get controller() {
    if (!this._controller) {
      this._controller = this._register(this.createController());
    }
    return this._controller;
  }
  get quickAccess() {
    if (!this._quickAccess) {
      this._quickAccess = this._register(this.instantiationService.createInstance(QuickAccessController));
    }
    return this._quickAccess;
  }
  createController(host = this.layoutService, options) {
    const defaultOptions2 = {
      idPrefix: "quickInput_",
      container: host.container,
      ignoreFocusOut: () => false,
      isScreenReaderOptimized: () => this.accessibilityService.isScreenReaderOptimized(),
      backKeybindingLabel: () => void 0,
      setContextKey: (id) => this.setContextKey(id),
      returnFocus: () => host.focus(),
      createList: (user, container, delegate, renderers, options2) => this.instantiationService.createInstance(WorkbenchList, user, container, delegate, renderers, options2),
      styles: this.computeStyles()
    };
    const controller = this._register(new QuickInputController(Object.assign(Object.assign({}, defaultOptions2), options)));
    controller.layout(host.dimension, host.offset.quickPickTop);
    this._register(host.onDidLayout((dimension) => controller.layout(dimension, host.offset.quickPickTop)));
    this._register(controller.onShow(() => this.resetContextKeys()));
    this._register(controller.onHide(() => this.resetContextKeys()));
    return controller;
  }
  setContextKey(id) {
    let key;
    if (id) {
      key = this.contexts.get(id);
      if (!key) {
        key = new RawContextKey(id, false).bindTo(this.contextKeyService);
        this.contexts.set(id, key);
      }
    }
    if (key && key.get()) {
      return;
    }
    this.resetContextKeys();
    key === null || key === void 0 ? void 0 : key.set(true);
  }
  resetContextKeys() {
    this.contexts.forEach((context) => {
      if (context.get()) {
        context.reset();
      }
    });
  }
  pick(picks, options = {}, token = CancellationToken.None) {
    return this.controller.pick(picks, options, token);
  }
  createQuickPick() {
    return this.controller.createQuickPick();
  }
  updateStyles() {
    this.controller.applyStyles(this.computeStyles());
  }
  computeStyles() {
    return {
      widget: Object.assign({}, computeStyles(this.theme, {
        quickInputBackground,
        quickInputForeground,
        quickInputTitleBackground,
        contrastBorder,
        widgetShadow
      })),
      inputBox: computeStyles(this.theme, {
        inputForeground,
        inputBackground,
        inputBorder,
        inputValidationInfoBackground,
        inputValidationInfoForeground,
        inputValidationInfoBorder,
        inputValidationWarningBackground,
        inputValidationWarningForeground,
        inputValidationWarningBorder,
        inputValidationErrorBackground,
        inputValidationErrorForeground,
        inputValidationErrorBorder
      }),
      countBadge: computeStyles(this.theme, {
        badgeBackground,
        badgeForeground,
        badgeBorder: contrastBorder
      }),
      button: computeStyles(this.theme, {
        buttonForeground,
        buttonBackground,
        buttonHoverBackground,
        buttonBorder: contrastBorder
      }),
      progressBar: computeStyles(this.theme, {
        progressBarBackground
      }),
      keybindingLabel: computeStyles(this.theme, {
        keybindingLabelBackground,
        keybindingLabelForeground,
        keybindingLabelBorder,
        keybindingLabelBottomBorder,
        keybindingLabelShadow: widgetShadow
      }),
      list: computeStyles(this.theme, {
        listBackground: quickInputBackground,
        listInactiveFocusForeground: quickInputListFocusForeground,
        listInactiveSelectionIconForeground: quickInputListFocusIconForeground,
        listInactiveFocusBackground: quickInputListFocusBackground,
        listFocusOutline: activeContrastBorder,
        listInactiveFocusOutline: activeContrastBorder,
        pickerGroupBorder,
        pickerGroupForeground
      })
    };
  }
};
QuickInputService = __decorate13([
  __param12(0, IInstantiationService),
  __param12(1, IContextKeyService),
  __param12(2, IThemeService),
  __param12(3, IAccessibilityService),
  __param12(4, ILayoutService)
], QuickInputService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickInput/standaloneQuickInputService.js
init_functional();
var __decorate14 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param13 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var EditorScopedQuickInputService = class EditorScopedQuickInputService2 extends QuickInputService {
  constructor(editor2, instantiationService, contextKeyService, themeService, accessibilityService, codeEditorService) {
    super(instantiationService, contextKeyService, themeService, accessibilityService, new EditorScopedLayoutService(editor2.getContainerDomNode(), codeEditorService));
    this.host = void 0;
    const contribution = QuickInputEditorContribution.get(editor2);
    if (contribution) {
      const widget = contribution.widget;
      this.host = {
        _serviceBrand: void 0,
        get hasContainer() {
          return true;
        },
        get container() {
          return widget.getDomNode();
        },
        get dimension() {
          return editor2.getLayoutInfo();
        },
        get onDidLayout() {
          return editor2.onDidLayoutChange;
        },
        focus: () => editor2.focus(),
        offset: { top: 0, quickPickTop: 0 }
      };
    } else {
      this.host = void 0;
    }
  }
  createController() {
    return super.createController(this.host);
  }
};
EditorScopedQuickInputService = __decorate14([
  __param13(1, IInstantiationService),
  __param13(2, IContextKeyService),
  __param13(3, IThemeService),
  __param13(4, IAccessibilityService),
  __param13(5, ICodeEditorService)
], EditorScopedQuickInputService);
var StandaloneQuickInputService = class StandaloneQuickInputService2 {
  constructor(instantiationService, codeEditorService) {
    this.instantiationService = instantiationService;
    this.codeEditorService = codeEditorService;
    this.mapEditorToService = /* @__PURE__ */ new Map();
  }
  get activeService() {
    const editor2 = this.codeEditorService.getFocusedCodeEditor();
    if (!editor2) {
      throw new Error("Quick input service needs a focused editor to work.");
    }
    let quickInputService = this.mapEditorToService.get(editor2);
    if (!quickInputService) {
      const newQuickInputService = quickInputService = this.instantiationService.createInstance(EditorScopedQuickInputService, editor2);
      this.mapEditorToService.set(editor2, quickInputService);
      once(editor2.onDidDispose)(() => {
        newQuickInputService.dispose();
        this.mapEditorToService.delete(editor2);
      });
    }
    return quickInputService;
  }
  get quickAccess() {
    return this.activeService.quickAccess;
  }
  pick(picks, options = {}, token = CancellationToken.None) {
    return this.activeService.pick(picks, options, token);
  }
  createQuickPick() {
    return this.activeService.createQuickPick();
  }
};
StandaloneQuickInputService = __decorate14([
  __param13(0, IInstantiationService),
  __param13(1, ICodeEditorService)
], StandaloneQuickInputService);
var QuickInputEditorContribution = class {
  constructor(editor2) {
    this.editor = editor2;
    this.widget = new QuickInputEditorWidget(this.editor);
  }
  static get(editor2) {
    return editor2.getContribution(QuickInputEditorContribution.ID);
  }
  dispose() {
    this.widget.dispose();
  }
};
QuickInputEditorContribution.ID = "editor.controller.quickInput";
var QuickInputEditorWidget = class {
  constructor(codeEditor) {
    this.codeEditor = codeEditor;
    this.domNode = document.createElement("div");
    this.codeEditor.addOverlayWidget(this);
  }
  getId() {
    return QuickInputEditorWidget.ID;
  }
  getDomNode() {
    return this.domNode;
  }
  getPosition() {
    return { preference: 2 };
  }
  dispose() {
    this.codeEditor.removeOverlayWidget(this);
  }
};
QuickInputEditorWidget.ID = "editor.contrib.quickInputWidget";
registerEditorContribution(QuickInputEditorContribution.ID, QuickInputEditorContribution);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneThemeService.js
init_define_process();
init_dom();
init_browser();
init_color();
init_event();
init_languages();
init_encodedTokenAttributes();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/languages/supports/tokenization.js
init_define_process();
init_color();
var ParsedTokenThemeRule = class {
  constructor(token, index, fontStyle, foreground, background) {
    this._parsedThemeRuleBrand = void 0;
    this.token = token;
    this.index = index;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
};
function parseTokenTheme(source) {
  if (!source || !Array.isArray(source)) {
    return [];
  }
  const result = [];
  let resultLen = 0;
  for (let i = 0, len = source.length; i < len; i++) {
    const entry = source[i];
    let fontStyle = -1;
    if (typeof entry.fontStyle === "string") {
      fontStyle = 0;
      const segments = entry.fontStyle.split(" ");
      for (let j = 0, lenJ = segments.length; j < lenJ; j++) {
        const segment = segments[j];
        switch (segment) {
          case "italic":
            fontStyle = fontStyle | 1;
            break;
          case "bold":
            fontStyle = fontStyle | 2;
            break;
          case "underline":
            fontStyle = fontStyle | 4;
            break;
          case "strikethrough":
            fontStyle = fontStyle | 8;
            break;
        }
      }
    }
    let foreground = null;
    if (typeof entry.foreground === "string") {
      foreground = entry.foreground;
    }
    let background = null;
    if (typeof entry.background === "string") {
      background = entry.background;
    }
    result[resultLen++] = new ParsedTokenThemeRule(entry.token || "", i, fontStyle, foreground, background);
  }
  return result;
}
function resolveParsedTokenThemeRules(parsedThemeRules, customTokenColors) {
  parsedThemeRules.sort((a, b) => {
    const r = strcmp(a.token, b.token);
    if (r !== 0) {
      return r;
    }
    return a.index - b.index;
  });
  let defaultFontStyle = 0;
  let defaultForeground = "000000";
  let defaultBackground = "ffffff";
  while (parsedThemeRules.length >= 1 && parsedThemeRules[0].token === "") {
    const incomingDefaults = parsedThemeRules.shift();
    if (incomingDefaults.fontStyle !== -1) {
      defaultFontStyle = incomingDefaults.fontStyle;
    }
    if (incomingDefaults.foreground !== null) {
      defaultForeground = incomingDefaults.foreground;
    }
    if (incomingDefaults.background !== null) {
      defaultBackground = incomingDefaults.background;
    }
  }
  const colorMap = new ColorMap();
  for (const color of customTokenColors) {
    colorMap.getId(color);
  }
  const foregroundColorId = colorMap.getId(defaultForeground);
  const backgroundColorId = colorMap.getId(defaultBackground);
  const defaults = new ThemeTrieElementRule(defaultFontStyle, foregroundColorId, backgroundColorId);
  const root = new ThemeTrieElement(defaults);
  for (let i = 0, len = parsedThemeRules.length; i < len; i++) {
    const rule = parsedThemeRules[i];
    root.insert(rule.token, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
  }
  return new TokenTheme(colorMap, root);
}
var colorRegExp = /^#?([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/;
var ColorMap = class {
  constructor() {
    this._lastColorId = 0;
    this._id2color = [];
    this._color2id = /* @__PURE__ */ new Map();
  }
  getId(color) {
    if (color === null) {
      return 0;
    }
    const match2 = color.match(colorRegExp);
    if (!match2) {
      throw new Error("Illegal value for token color: " + color);
    }
    color = match2[1].toUpperCase();
    let value = this._color2id.get(color);
    if (value) {
      return value;
    }
    value = ++this._lastColorId;
    this._color2id.set(color, value);
    this._id2color[value] = Color.fromHex("#" + color);
    return value;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
};
var TokenTheme = class {
  constructor(colorMap, root) {
    this._colorMap = colorMap;
    this._root = root;
    this._cache = /* @__PURE__ */ new Map();
  }
  static createFromRawTokenTheme(source, customTokenColors) {
    return this.createFromParsedTokenTheme(parseTokenTheme(source), customTokenColors);
  }
  static createFromParsedTokenTheme(source, customTokenColors) {
    return resolveParsedTokenThemeRules(source, customTokenColors);
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  _match(token) {
    return this._root.match(token);
  }
  match(languageId, token) {
    let result = this._cache.get(token);
    if (typeof result === "undefined") {
      const rule = this._match(token);
      const standardToken = toStandardTokenType(token);
      result = (rule.metadata | standardToken << 8) >>> 0;
      this._cache.set(token, result);
    }
    return (result | languageId << 0) >>> 0;
  }
};
var STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|regexp)\b/;
function toStandardTokenType(tokenType) {
  const m = tokenType.match(STANDARD_TOKEN_TYPE_REGEXP);
  if (!m) {
    return 0;
  }
  switch (m[1]) {
    case "comment":
      return 1;
    case "string":
      return 2;
    case "regex":
      return 3;
    case "regexp":
      return 3;
  }
  throw new Error("Unexpected match for standard token type!");
}
function strcmp(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
var ThemeTrieElementRule = class {
  constructor(fontStyle, foreground, background) {
    this._themeTrieElementRuleBrand = void 0;
    this._fontStyle = fontStyle;
    this._foreground = foreground;
    this._background = background;
    this.metadata = (this._fontStyle << 11 | this._foreground << 15 | this._background << 24) >>> 0;
  }
  clone() {
    return new ThemeTrieElementRule(this._fontStyle, this._foreground, this._background);
  }
  acceptOverwrite(fontStyle, foreground, background) {
    if (fontStyle !== -1) {
      this._fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      this._foreground = foreground;
    }
    if (background !== 0) {
      this._background = background;
    }
    this.metadata = (this._fontStyle << 11 | this._foreground << 15 | this._background << 24) >>> 0;
  }
};
var ThemeTrieElement = class {
  constructor(mainRule) {
    this._themeTrieElementBrand = void 0;
    this._mainRule = mainRule;
    this._children = /* @__PURE__ */ new Map();
  }
  match(token) {
    if (token === "") {
      return this._mainRule;
    }
    const dotIndex = token.indexOf(".");
    let head;
    let tail;
    if (dotIndex === -1) {
      head = token;
      tail = "";
    } else {
      head = token.substring(0, dotIndex);
      tail = token.substring(dotIndex + 1);
    }
    const child = this._children.get(head);
    if (typeof child !== "undefined") {
      return child.match(tail);
    }
    return this._mainRule;
  }
  insert(token, fontStyle, foreground, background) {
    if (token === "") {
      this._mainRule.acceptOverwrite(fontStyle, foreground, background);
      return;
    }
    const dotIndex = token.indexOf(".");
    let head;
    let tail;
    if (dotIndex === -1) {
      head = token;
      tail = "";
    } else {
      head = token.substring(0, dotIndex);
      tail = token.substring(dotIndex + 1);
    }
    let child = this._children.get(head);
    if (typeof child === "undefined") {
      child = new ThemeTrieElement(this._mainRule.clone());
      this._children.set(head, child);
    }
    child.insert(tail, fontStyle, foreground, background);
  }
};
function generateTokensCSSForColorMap(colorMap) {
  const rules = [];
  for (let i = 1, len = colorMap.length; i < len; i++) {
    const color = colorMap[i];
    rules[i] = `.mtk${i} { color: ${color}; }`;
  }
  rules.push(".mtki { font-style: italic; }");
  rules.push(".mtkb { font-weight: bold; }");
  rules.push(".mtku { text-decoration: underline; text-underline-position: under; }");
  rules.push(".mtks { text-decoration: line-through; }");
  rules.push(".mtks.mtku { text-decoration: underline line-through; text-underline-position: under; }");
  return rules.join("\n");
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/common/themes.js
init_define_process();
init_editorColorRegistry();
init_colorRegistry();
var vs = {
  base: "vs",
  inherit: false,
  rules: [
    { token: "", foreground: "000000", background: "fffffe" },
    { token: "invalid", foreground: "cd3131" },
    { token: "emphasis", fontStyle: "italic" },
    { token: "strong", fontStyle: "bold" },
    { token: "variable", foreground: "001188" },
    { token: "variable.predefined", foreground: "4864AA" },
    { token: "constant", foreground: "dd0000" },
    { token: "comment", foreground: "008000" },
    { token: "number", foreground: "098658" },
    { token: "number.hex", foreground: "3030c0" },
    { token: "regexp", foreground: "800000" },
    { token: "annotation", foreground: "808080" },
    { token: "type", foreground: "008080" },
    { token: "delimiter", foreground: "000000" },
    { token: "delimiter.html", foreground: "383838" },
    { token: "delimiter.xml", foreground: "0000FF" },
    { token: "tag", foreground: "800000" },
    { token: "tag.id.pug", foreground: "4F76AC" },
    { token: "tag.class.pug", foreground: "4F76AC" },
    { token: "meta.scss", foreground: "800000" },
    { token: "metatag", foreground: "e00000" },
    { token: "metatag.content.html", foreground: "FF0000" },
    { token: "metatag.html", foreground: "808080" },
    { token: "metatag.xml", foreground: "808080" },
    { token: "metatag.php", fontStyle: "bold" },
    { token: "key", foreground: "863B00" },
    { token: "string.key.json", foreground: "A31515" },
    { token: "string.value.json", foreground: "0451A5" },
    { token: "attribute.name", foreground: "FF0000" },
    { token: "attribute.value", foreground: "0451A5" },
    { token: "attribute.value.number", foreground: "098658" },
    { token: "attribute.value.unit", foreground: "098658" },
    { token: "attribute.value.html", foreground: "0000FF" },
    { token: "attribute.value.xml", foreground: "0000FF" },
    { token: "string", foreground: "A31515" },
    { token: "string.html", foreground: "0000FF" },
    { token: "string.sql", foreground: "FF0000" },
    { token: "string.yaml", foreground: "0451A5" },
    { token: "keyword", foreground: "0000FF" },
    { token: "keyword.json", foreground: "0451A5" },
    { token: "keyword.flow", foreground: "AF00DB" },
    { token: "keyword.flow.scss", foreground: "0000FF" },
    { token: "operator.scss", foreground: "666666" },
    { token: "operator.sql", foreground: "778899" },
    { token: "operator.swift", foreground: "666666" },
    { token: "predefined.sql", foreground: "C700C7" }
  ],
  colors: {
    [editorBackground]: "#FFFFFE",
    [editorForeground]: "#000000",
    [editorInactiveSelection]: "#E5EBF1",
    [editorIndentGuides]: "#D3D3D3",
    [editorActiveIndentGuides]: "#939393",
    [editorSelectionHighlight]: "#ADD6FF4D"
  }
};
var vs_dark = {
  base: "vs-dark",
  inherit: false,
  rules: [
    { token: "", foreground: "D4D4D4", background: "1E1E1E" },
    { token: "invalid", foreground: "f44747" },
    { token: "emphasis", fontStyle: "italic" },
    { token: "strong", fontStyle: "bold" },
    { token: "variable", foreground: "74B0DF" },
    { token: "variable.predefined", foreground: "4864AA" },
    { token: "variable.parameter", foreground: "9CDCFE" },
    { token: "constant", foreground: "569CD6" },
    { token: "comment", foreground: "608B4E" },
    { token: "number", foreground: "B5CEA8" },
    { token: "number.hex", foreground: "5BB498" },
    { token: "regexp", foreground: "B46695" },
    { token: "annotation", foreground: "cc6666" },
    { token: "type", foreground: "3DC9B0" },
    { token: "delimiter", foreground: "DCDCDC" },
    { token: "delimiter.html", foreground: "808080" },
    { token: "delimiter.xml", foreground: "808080" },
    { token: "tag", foreground: "569CD6" },
    { token: "tag.id.pug", foreground: "4F76AC" },
    { token: "tag.class.pug", foreground: "4F76AC" },
    { token: "meta.scss", foreground: "A79873" },
    { token: "meta.tag", foreground: "CE9178" },
    { token: "metatag", foreground: "DD6A6F" },
    { token: "metatag.content.html", foreground: "9CDCFE" },
    { token: "metatag.html", foreground: "569CD6" },
    { token: "metatag.xml", foreground: "569CD6" },
    { token: "metatag.php", fontStyle: "bold" },
    { token: "key", foreground: "9CDCFE" },
    { token: "string.key.json", foreground: "9CDCFE" },
    { token: "string.value.json", foreground: "CE9178" },
    { token: "attribute.name", foreground: "9CDCFE" },
    { token: "attribute.value", foreground: "CE9178" },
    { token: "attribute.value.number.css", foreground: "B5CEA8" },
    { token: "attribute.value.unit.css", foreground: "B5CEA8" },
    { token: "attribute.value.hex.css", foreground: "D4D4D4" },
    { token: "string", foreground: "CE9178" },
    { token: "string.sql", foreground: "FF0000" },
    { token: "keyword", foreground: "569CD6" },
    { token: "keyword.flow", foreground: "C586C0" },
    { token: "keyword.json", foreground: "CE9178" },
    { token: "keyword.flow.scss", foreground: "569CD6" },
    { token: "operator.scss", foreground: "909090" },
    { token: "operator.sql", foreground: "778899" },
    { token: "operator.swift", foreground: "909090" },
    { token: "predefined.sql", foreground: "FF00FF" }
  ],
  colors: {
    [editorBackground]: "#1E1E1E",
    [editorForeground]: "#D4D4D4",
    [editorInactiveSelection]: "#3A3D41",
    [editorIndentGuides]: "#404040",
    [editorActiveIndentGuides]: "#707070",
    [editorSelectionHighlight]: "#ADD6FF26"
  }
};
var hc_black = {
  base: "hc-black",
  inherit: false,
  rules: [
    { token: "", foreground: "FFFFFF", background: "000000" },
    { token: "invalid", foreground: "f44747" },
    { token: "emphasis", fontStyle: "italic" },
    { token: "strong", fontStyle: "bold" },
    { token: "variable", foreground: "1AEBFF" },
    { token: "variable.parameter", foreground: "9CDCFE" },
    { token: "constant", foreground: "569CD6" },
    { token: "comment", foreground: "608B4E" },
    { token: "number", foreground: "FFFFFF" },
    { token: "regexp", foreground: "C0C0C0" },
    { token: "annotation", foreground: "569CD6" },
    { token: "type", foreground: "3DC9B0" },
    { token: "delimiter", foreground: "FFFF00" },
    { token: "delimiter.html", foreground: "FFFF00" },
    { token: "tag", foreground: "569CD6" },
    { token: "tag.id.pug", foreground: "4F76AC" },
    { token: "tag.class.pug", foreground: "4F76AC" },
    { token: "meta", foreground: "D4D4D4" },
    { token: "meta.tag", foreground: "CE9178" },
    { token: "metatag", foreground: "569CD6" },
    { token: "metatag.content.html", foreground: "1AEBFF" },
    { token: "metatag.html", foreground: "569CD6" },
    { token: "metatag.xml", foreground: "569CD6" },
    { token: "metatag.php", fontStyle: "bold" },
    { token: "key", foreground: "9CDCFE" },
    { token: "string.key", foreground: "9CDCFE" },
    { token: "string.value", foreground: "CE9178" },
    { token: "attribute.name", foreground: "569CD6" },
    { token: "attribute.value", foreground: "3FF23F" },
    { token: "string", foreground: "CE9178" },
    { token: "string.sql", foreground: "FF0000" },
    { token: "keyword", foreground: "569CD6" },
    { token: "keyword.flow", foreground: "C586C0" },
    { token: "operator.sql", foreground: "778899" },
    { token: "operator.swift", foreground: "909090" },
    { token: "predefined.sql", foreground: "FF00FF" }
  ],
  colors: {
    [editorBackground]: "#000000",
    [editorForeground]: "#FFFFFF",
    [editorIndentGuides]: "#FFFFFF",
    [editorActiveIndentGuides]: "#FFFFFF"
  }
};
var hc_light = {
  base: "hc-light",
  inherit: false,
  rules: [
    { token: "", foreground: "292929", background: "FFFFFF" },
    { token: "invalid", foreground: "B5200D" },
    { token: "emphasis", fontStyle: "italic" },
    { token: "strong", fontStyle: "bold" },
    { token: "variable", foreground: "264F70" },
    { token: "variable.predefined", foreground: "4864AA" },
    { token: "constant", foreground: "dd0000" },
    { token: "comment", foreground: "008000" },
    { token: "number", foreground: "098658" },
    { token: "number.hex", foreground: "3030c0" },
    { token: "regexp", foreground: "800000" },
    { token: "annotation", foreground: "808080" },
    { token: "type", foreground: "008080" },
    { token: "delimiter", foreground: "000000" },
    { token: "delimiter.html", foreground: "383838" },
    { token: "tag", foreground: "800000" },
    { token: "tag.id.pug", foreground: "4F76AC" },
    { token: "tag.class.pug", foreground: "4F76AC" },
    { token: "meta.scss", foreground: "800000" },
    { token: "metatag", foreground: "e00000" },
    { token: "metatag.content.html", foreground: "B5200D" },
    { token: "metatag.html", foreground: "808080" },
    { token: "metatag.xml", foreground: "808080" },
    { token: "metatag.php", fontStyle: "bold" },
    { token: "key", foreground: "863B00" },
    { token: "string.key.json", foreground: "A31515" },
    { token: "string.value.json", foreground: "0451A5" },
    { token: "attribute.name", foreground: "264F78" },
    { token: "attribute.value", foreground: "0451A5" },
    { token: "string", foreground: "A31515" },
    { token: "string.sql", foreground: "B5200D" },
    { token: "keyword", foreground: "0000FF" },
    { token: "keyword.flow", foreground: "AF00DB" },
    { token: "operator.sql", foreground: "778899" },
    { token: "operator.swift", foreground: "666666" },
    { token: "predefined.sql", foreground: "C700C7" }
  ],
  colors: {
    [editorBackground]: "#FFFFFF",
    [editorForeground]: "#292929",
    [editorIndentGuides]: "#292929",
    [editorActiveIndentGuides]: "#292929"
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneThemeService.js
init_platform2();
init_colorRegistry();
init_themeService();
init_lifecycle();
init_theme();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/theme/browser/iconsStyleSheet.js
init_define_process();
init_dom();
init_event();
init_themeService();
function getIconsStyleSheet(themeService) {
  const onDidChangeEmmiter = new Emitter();
  const iconRegistry = getIconRegistry();
  iconRegistry.onDidChange(() => onDidChangeEmmiter.fire());
  themeService === null || themeService === void 0 ? void 0 : themeService.onDidProductIconThemeChange(() => onDidChangeEmmiter.fire());
  return {
    onDidChange: onDidChangeEmmiter.event,
    getCSS() {
      const productIconTheme = themeService ? themeService.getProductIconTheme() : new UnthemedProductIconTheme();
      const usedFontIds = {};
      const formatIconRule = (contribution) => {
        const definition = productIconTheme.getIcon(contribution);
        if (!definition) {
          return void 0;
        }
        const fontContribution = definition.font;
        if (fontContribution) {
          usedFontIds[fontContribution.id] = fontContribution.definition;
          return `.codicon-${contribution.id}:before { content: '${definition.fontCharacter}'; font-family: ${asCSSPropertyValue(fontContribution.id)}; }`;
        }
        return `.codicon-${contribution.id}:before { content: '${definition.fontCharacter}'; }`;
      };
      const rules = [];
      for (const contribution of iconRegistry.getIcons()) {
        const rule = formatIconRule(contribution);
        if (rule) {
          rules.push(rule);
        }
      }
      for (const id in usedFontIds) {
        const definition = usedFontIds[id];
        const fontWeight = definition.weight ? `font-weight: ${definition.weight};` : "";
        const fontStyle = definition.style ? `font-style: ${definition.style};` : "";
        const src = definition.src.map((l) => `${asCSSUrl(l.location)} format('${l.format}')`).join(", ");
        rules.push(`@font-face { src: ${src}; font-family: ${asCSSPropertyValue(id)};${fontWeight}${fontStyle} font-display: block; }`);
      }
      return rules.join("\n");
    }
  };
}
var UnthemedProductIconTheme = class {
  getIcon(contribution) {
    const iconRegistry = getIconRegistry();
    let definition = contribution.defaults;
    while (ThemeIcon.isThemeIcon(definition)) {
      const c = iconRegistry.getIcon(definition.id);
      if (!c) {
        return void 0;
      }
      definition = c.defaults;
    }
    return definition;
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneThemeService.js
var VS_LIGHT_THEME_NAME = "vs";
var VS_DARK_THEME_NAME = "vs-dark";
var HC_BLACK_THEME_NAME = "hc-black";
var HC_LIGHT_THEME_NAME = "hc-light";
var colorRegistry = Registry.as(Extensions3.ColorContribution);
var themingRegistry = Registry.as(Extensions2.ThemingContribution);
var StandaloneTheme = class {
  constructor(name, standaloneThemeData) {
    this.semanticHighlighting = false;
    this.themeData = standaloneThemeData;
    const base = standaloneThemeData.base;
    if (name.length > 0) {
      if (isBuiltinTheme(name)) {
        this.id = name;
      } else {
        this.id = base + " " + name;
      }
      this.themeName = name;
    } else {
      this.id = base;
      this.themeName = base;
    }
    this.colors = null;
    this.defaultColors = /* @__PURE__ */ Object.create(null);
    this._tokenTheme = null;
  }
  get base() {
    return this.themeData.base;
  }
  notifyBaseUpdated() {
    if (this.themeData.inherit) {
      this.colors = null;
      this._tokenTheme = null;
    }
  }
  getColors() {
    if (!this.colors) {
      const colors = /* @__PURE__ */ new Map();
      for (const id in this.themeData.colors) {
        colors.set(id, Color.fromHex(this.themeData.colors[id]));
      }
      if (this.themeData.inherit) {
        const baseData = getBuiltinRules(this.themeData.base);
        for (const id in baseData.colors) {
          if (!colors.has(id)) {
            colors.set(id, Color.fromHex(baseData.colors[id]));
          }
        }
      }
      this.colors = colors;
    }
    return this.colors;
  }
  getColor(colorId, useDefault) {
    const color = this.getColors().get(colorId);
    if (color) {
      return color;
    }
    if (useDefault !== false) {
      return this.getDefault(colorId);
    }
    return void 0;
  }
  getDefault(colorId) {
    let color = this.defaultColors[colorId];
    if (color) {
      return color;
    }
    color = colorRegistry.resolveDefaultColor(colorId, this);
    this.defaultColors[colorId] = color;
    return color;
  }
  defines(colorId) {
    return Object.prototype.hasOwnProperty.call(this.getColors(), colorId);
  }
  get type() {
    switch (this.base) {
      case VS_LIGHT_THEME_NAME:
        return ColorScheme.LIGHT;
      case HC_BLACK_THEME_NAME:
        return ColorScheme.HIGH_CONTRAST_DARK;
      case HC_LIGHT_THEME_NAME:
        return ColorScheme.HIGH_CONTRAST_LIGHT;
      default:
        return ColorScheme.DARK;
    }
  }
  get tokenTheme() {
    if (!this._tokenTheme) {
      let rules = [];
      let encodedTokensColors = [];
      if (this.themeData.inherit) {
        const baseData = getBuiltinRules(this.themeData.base);
        rules = baseData.rules;
        if (baseData.encodedTokensColors) {
          encodedTokensColors = baseData.encodedTokensColors;
        }
      }
      const editorForeground2 = this.themeData.colors["editor.foreground"];
      const editorBackground2 = this.themeData.colors["editor.background"];
      if (editorForeground2 || editorBackground2) {
        const rule = { token: "" };
        if (editorForeground2) {
          rule.foreground = editorForeground2;
        }
        if (editorBackground2) {
          rule.background = editorBackground2;
        }
        rules.push(rule);
      }
      rules = rules.concat(this.themeData.rules);
      if (this.themeData.encodedTokensColors) {
        encodedTokensColors = this.themeData.encodedTokensColors;
      }
      this._tokenTheme = TokenTheme.createFromRawTokenTheme(rules, encodedTokensColors);
    }
    return this._tokenTheme;
  }
  getTokenStyleMetadata(type, modifiers, modelLanguage) {
    const style = this.tokenTheme._match([type].concat(modifiers).join("."));
    const metadata = style.metadata;
    const foreground = TokenMetadata.getForeground(metadata);
    const fontStyle = TokenMetadata.getFontStyle(metadata);
    return {
      foreground,
      italic: Boolean(fontStyle & 1),
      bold: Boolean(fontStyle & 2),
      underline: Boolean(fontStyle & 4),
      strikethrough: Boolean(fontStyle & 8)
    };
  }
};
function isBuiltinTheme(themeName) {
  return themeName === VS_LIGHT_THEME_NAME || themeName === VS_DARK_THEME_NAME || themeName === HC_BLACK_THEME_NAME || themeName === HC_LIGHT_THEME_NAME;
}
function getBuiltinRules(builtinTheme) {
  switch (builtinTheme) {
    case VS_LIGHT_THEME_NAME:
      return vs;
    case VS_DARK_THEME_NAME:
      return vs_dark;
    case HC_BLACK_THEME_NAME:
      return hc_black;
    case HC_LIGHT_THEME_NAME:
      return hc_light;
  }
}
function newBuiltInTheme(builtinTheme) {
  const themeData = getBuiltinRules(builtinTheme);
  return new StandaloneTheme(builtinTheme, themeData);
}
var StandaloneThemeService = class extends Disposable {
  constructor() {
    super();
    this._onColorThemeChange = this._register(new Emitter());
    this.onDidColorThemeChange = this._onColorThemeChange.event;
    this._onProductIconThemeChange = this._register(new Emitter());
    this.onDidProductIconThemeChange = this._onProductIconThemeChange.event;
    this._environment = /* @__PURE__ */ Object.create(null);
    this._builtInProductIconTheme = new UnthemedProductIconTheme();
    this._autoDetectHighContrast = true;
    this._knownThemes = /* @__PURE__ */ new Map();
    this._knownThemes.set(VS_LIGHT_THEME_NAME, newBuiltInTheme(VS_LIGHT_THEME_NAME));
    this._knownThemes.set(VS_DARK_THEME_NAME, newBuiltInTheme(VS_DARK_THEME_NAME));
    this._knownThemes.set(HC_BLACK_THEME_NAME, newBuiltInTheme(HC_BLACK_THEME_NAME));
    this._knownThemes.set(HC_LIGHT_THEME_NAME, newBuiltInTheme(HC_LIGHT_THEME_NAME));
    const iconsStyleSheet = getIconsStyleSheet(this);
    this._codiconCSS = iconsStyleSheet.getCSS();
    this._themeCSS = "";
    this._allCSS = `${this._codiconCSS}
${this._themeCSS}`;
    this._globalStyleElement = null;
    this._styleElements = [];
    this._colorMapOverride = null;
    this.setTheme(VS_LIGHT_THEME_NAME);
    this._onOSSchemeChanged();
    iconsStyleSheet.onDidChange(() => {
      this._codiconCSS = iconsStyleSheet.getCSS();
      this._updateCSS();
    });
    addMatchMediaChangeListener("(forced-colors: active)", () => {
      this._onOSSchemeChanged();
    });
  }
  registerEditorContainer(domNode) {
    if (isInShadowDOM(domNode)) {
      return this._registerShadowDomContainer(domNode);
    }
    return this._registerRegularEditorContainer();
  }
  _registerRegularEditorContainer() {
    if (!this._globalStyleElement) {
      this._globalStyleElement = createStyleSheet();
      this._globalStyleElement.className = "monaco-colors";
      this._globalStyleElement.textContent = this._allCSS;
      this._styleElements.push(this._globalStyleElement);
    }
    return Disposable.None;
  }
  _registerShadowDomContainer(domNode) {
    const styleElement = createStyleSheet(domNode);
    styleElement.className = "monaco-colors";
    styleElement.textContent = this._allCSS;
    this._styleElements.push(styleElement);
    return {
      dispose: () => {
        for (let i = 0; i < this._styleElements.length; i++) {
          if (this._styleElements[i] === styleElement) {
            this._styleElements.splice(i, 1);
            return;
          }
        }
      }
    };
  }
  defineTheme(themeName, themeData) {
    if (!/^[a-z0-9\-]+$/i.test(themeName)) {
      throw new Error("Illegal theme name!");
    }
    if (!isBuiltinTheme(themeData.base) && !isBuiltinTheme(themeName)) {
      throw new Error("Illegal theme base!");
    }
    this._knownThemes.set(themeName, new StandaloneTheme(themeName, themeData));
    if (isBuiltinTheme(themeName)) {
      this._knownThemes.forEach((theme) => {
        if (theme.base === themeName) {
          theme.notifyBaseUpdated();
        }
      });
    }
    if (this._theme.themeName === themeName) {
      this.setTheme(themeName);
    }
  }
  getColorTheme() {
    return this._theme;
  }
  setColorMapOverride(colorMapOverride) {
    this._colorMapOverride = colorMapOverride;
    this._updateThemeOrColorMap();
  }
  setTheme(themeName) {
    let theme;
    if (this._knownThemes.has(themeName)) {
      theme = this._knownThemes.get(themeName);
    } else {
      theme = this._knownThemes.get(VS_LIGHT_THEME_NAME);
    }
    this._updateActualTheme(theme);
  }
  _updateActualTheme(desiredTheme) {
    if (!desiredTheme || this._theme === desiredTheme) {
      return;
    }
    this._theme = desiredTheme;
    this._updateThemeOrColorMap();
  }
  _onOSSchemeChanged() {
    if (this._autoDetectHighContrast) {
      const wantsHighContrast = window.matchMedia(`(forced-colors: active)`).matches;
      if (wantsHighContrast !== isHighContrast(this._theme.type)) {
        let newThemeName;
        if (isDark(this._theme.type)) {
          newThemeName = wantsHighContrast ? HC_BLACK_THEME_NAME : VS_DARK_THEME_NAME;
        } else {
          newThemeName = wantsHighContrast ? HC_LIGHT_THEME_NAME : VS_LIGHT_THEME_NAME;
        }
        this._updateActualTheme(this._knownThemes.get(newThemeName));
      }
    }
  }
  setAutoDetectHighContrast(autoDetectHighContrast) {
    this._autoDetectHighContrast = autoDetectHighContrast;
    this._onOSSchemeChanged();
  }
  _updateThemeOrColorMap() {
    const cssRules = [];
    const hasRule = {};
    const ruleCollector = {
      addRule: (rule) => {
        if (!hasRule[rule]) {
          cssRules.push(rule);
          hasRule[rule] = true;
        }
      }
    };
    themingRegistry.getThemingParticipants().forEach((p) => p(this._theme, ruleCollector, this._environment));
    const colorVariables = [];
    for (const item of colorRegistry.getColors()) {
      const color = this._theme.getColor(item.id, true);
      if (color) {
        colorVariables.push(`${asCssVariableName(item.id)}: ${color.toString()};`);
      }
    }
    ruleCollector.addRule(`.monaco-editor { ${colorVariables.join("\n")} }`);
    const colorMap = this._colorMapOverride || this._theme.tokenTheme.getColorMap();
    ruleCollector.addRule(generateTokensCSSForColorMap(colorMap));
    this._themeCSS = cssRules.join("\n");
    this._updateCSS();
    TokenizationRegistry.setColorMap(colorMap);
    this._onColorThemeChange.fire(this._theme);
  }
  _updateCSS() {
    this._allCSS = `${this._codiconCSS}
${this._themeCSS}`;
    this._styleElements.forEach((styleElement) => styleElement.textContent = this._allCSS);
  }
  getFileIconTheme() {
    return {
      hasFileIcons: false,
      hasFolderIcons: false,
      hidesExplorerArrows: false
    };
  }
  getProductIconTheme() {
    return this._builtInProductIconTheme;
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/common/standaloneTheme.js
init_define_process();
init_instantiation();
var IStandaloneThemeService = createDecorator("themeService");

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/accessibility/browser/accessibilityService.js
init_define_process();
init_dom();
init_event();
init_lifecycle();
init_configuration();
init_contextkey();
var __decorate15 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param14 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var AccessibilityService = class AccessibilityService2 extends Disposable {
  constructor(_contextKeyService, _layoutService, _configurationService) {
    super();
    this._contextKeyService = _contextKeyService;
    this._layoutService = _layoutService;
    this._configurationService = _configurationService;
    this._accessibilitySupport = 0;
    this._onDidChangeScreenReaderOptimized = new Emitter();
    this._onDidChangeReducedMotion = new Emitter();
    this._accessibilityModeEnabledContext = CONTEXT_ACCESSIBILITY_MODE_ENABLED.bindTo(this._contextKeyService);
    const updateContextKey = () => this._accessibilityModeEnabledContext.set(this.isScreenReaderOptimized());
    this._register(this._configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("editor.accessibilitySupport")) {
        updateContextKey();
        this._onDidChangeScreenReaderOptimized.fire();
      }
      if (e.affectsConfiguration("workbench.reduceMotion")) {
        this._configMotionReduced = this._configurationService.getValue("workbench.reduceMotion");
        this._onDidChangeReducedMotion.fire();
      }
    }));
    updateContextKey();
    this._register(this.onDidChangeScreenReaderOptimized(() => updateContextKey()));
    const reduceMotionMatcher = window.matchMedia(`(prefers-reduced-motion: reduce)`);
    this._systemMotionReduced = reduceMotionMatcher.matches;
    this._configMotionReduced = this._configurationService.getValue("workbench.reduceMotion");
    this.initReducedMotionListeners(reduceMotionMatcher);
  }
  initReducedMotionListeners(reduceMotionMatcher) {
    if (!this._layoutService.hasContainer) {
      return;
    }
    this._register(addDisposableListener(reduceMotionMatcher, "change", () => {
      this._systemMotionReduced = reduceMotionMatcher.matches;
      if (this._configMotionReduced === "auto") {
        this._onDidChangeReducedMotion.fire();
      }
    }));
    const updateRootClasses = () => {
      const reduce = this.isMotionReduced();
      this._layoutService.container.classList.toggle("reduce-motion", reduce);
      this._layoutService.container.classList.toggle("enable-motion", !reduce);
    };
    updateRootClasses();
    this._register(this.onDidChangeReducedMotion(() => updateRootClasses()));
  }
  get onDidChangeScreenReaderOptimized() {
    return this._onDidChangeScreenReaderOptimized.event;
  }
  isScreenReaderOptimized() {
    const config = this._configurationService.getValue("editor.accessibilitySupport");
    return config === "on" || config === "auto" && this._accessibilitySupport === 2;
  }
  get onDidChangeReducedMotion() {
    return this._onDidChangeReducedMotion.event;
  }
  isMotionReduced() {
    const config = this._configMotionReduced;
    return config === "on" || config === "auto" && this._systemMotionReduced;
  }
  getAccessibilitySupport() {
    return this._accessibilitySupport;
  }
};
AccessibilityService = __decorate15([
  __param14(0, IContextKeyService),
  __param14(1, ILayoutService),
  __param14(2, IConfigurationService)
], AccessibilityService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_actions2();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/actions/common/menuService.js
init_define_process();
init_async();
init_event();
init_lifecycle();
init_actions2();
init_commands();
init_contextkey();
init_actions();
init_arrays();
init_nls();
var __decorate16 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param15 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var MenuService = class MenuService2 {
  constructor(_commandService, storageService) {
    this._commandService = _commandService;
    this._hiddenStates = new PersistedMenuHideState(storageService);
  }
  createMenu(id, contextKeyService, options) {
    return new Menu2(id, this._hiddenStates, Object.assign({ emitEventsForSubmenuChanges: false, eventDebounceDelay: 50 }, options), this._commandService, contextKeyService, this);
  }
};
MenuService = __decorate16([
  __param15(0, ICommandService),
  __param15(1, IStorageService)
], MenuService);
var PersistedMenuHideState = class PersistedMenuHideState2 {
  constructor(_storageService) {
    this._storageService = _storageService;
    this._disposables = new DisposableStore();
    this._onDidChange = new Emitter();
    this.onDidChange = this._onDidChange.event;
    this._ignoreChangeEvent = false;
    try {
      const raw = _storageService.get(PersistedMenuHideState2._key, 0, "{}");
      this._data = JSON.parse(raw);
    } catch (err) {
      this._data = /* @__PURE__ */ Object.create(null);
    }
    this._disposables.add(_storageService.onDidChangeValue((e) => {
      if (e.key !== PersistedMenuHideState2._key) {
        return;
      }
      if (!this._ignoreChangeEvent) {
        try {
          const raw = _storageService.get(PersistedMenuHideState2._key, 0, "{}");
          this._data = JSON.parse(raw);
        } catch (err) {
          console.log("FAILED to read storage after UPDATE", err);
        }
      }
      this._onDidChange.fire();
    }));
  }
  dispose() {
    this._onDidChange.dispose();
    this._disposables.dispose();
  }
  isHidden(menu, commandId) {
    var _a4, _b;
    return (_b = (_a4 = this._data[menu.id]) === null || _a4 === void 0 ? void 0 : _a4.includes(commandId)) !== null && _b !== void 0 ? _b : false;
  }
  updateHidden(menu, commandId, hidden) {
    const entries = this._data[menu.id];
    if (!hidden) {
      if (entries) {
        const idx = entries.indexOf(commandId);
        if (idx >= 0) {
          removeFastWithoutKeepingOrder(entries, idx);
        }
        if (entries.length === 0) {
          delete this._data[menu.id];
        }
      }
    } else {
      if (!entries) {
        this._data[menu.id] = [commandId];
      } else {
        const idx = entries.indexOf(commandId);
        if (idx < 0) {
          entries.push(commandId);
        }
      }
    }
    this._persist();
  }
  _persist() {
    try {
      this._ignoreChangeEvent = true;
      const raw = JSON.stringify(this._data);
      this._storageService.store(PersistedMenuHideState2._key, raw, 0, 0);
    } finally {
      this._ignoreChangeEvent = false;
    }
  }
};
PersistedMenuHideState._key = "menu.hiddenCommands";
PersistedMenuHideState = __decorate16([
  __param15(0, IStorageService)
], PersistedMenuHideState);
var Menu2 = class Menu3 {
  constructor(_id, _hiddenStates, _options, _commandService, _contextKeyService, _menuService) {
    this._id = _id;
    this._hiddenStates = _hiddenStates;
    this._options = _options;
    this._commandService = _commandService;
    this._contextKeyService = _contextKeyService;
    this._menuService = _menuService;
    this._disposables = new DisposableStore();
    this._menuGroups = [];
    this._contextKeys = /* @__PURE__ */ new Set();
    this._build();
    const rebuildMenuSoon = new RunOnceScheduler(() => {
      this._build();
      this._onDidChange.fire(this);
    }, _options.eventDebounceDelay);
    this._disposables.add(rebuildMenuSoon);
    this._disposables.add(MenuRegistry.onDidChangeMenu((e) => {
      if (e.has(_id)) {
        rebuildMenuSoon.schedule();
      }
    }));
    const lazyListener = this._disposables.add(new DisposableStore());
    const startLazyListener = () => {
      const fireChangeSoon = new RunOnceScheduler(() => this._onDidChange.fire(this), _options.eventDebounceDelay);
      lazyListener.add(fireChangeSoon);
      lazyListener.add(_contextKeyService.onDidChangeContext((e) => {
        if (e.affectsSome(this._contextKeys)) {
          fireChangeSoon.schedule();
        }
      }));
      lazyListener.add(_hiddenStates.onDidChange(() => {
        fireChangeSoon.schedule();
      }));
    };
    this._onDidChange = new Emitter({
      onFirstListenerAdd: startLazyListener,
      onLastListenerRemove: lazyListener.clear.bind(lazyListener)
    });
    this.onDidChange = this._onDidChange.event;
  }
  dispose() {
    this._disposables.dispose();
    this._onDidChange.dispose();
  }
  _build() {
    this._menuGroups.length = 0;
    this._contextKeys.clear();
    const menuItems = MenuRegistry.getMenuItems(this._id);
    let group;
    menuItems.sort(Menu3._compareMenuItems);
    for (const item of menuItems) {
      const groupName = item.group || "";
      if (!group || group[0] !== groupName) {
        group = [groupName, []];
        this._menuGroups.push(group);
      }
      group[1].push(item);
      this._collectContextKeys(item);
    }
  }
  _collectContextKeys(item) {
    Menu3._fillInKbExprKeys(item.when, this._contextKeys);
    if (isIMenuItem(item)) {
      if (item.command.precondition) {
        Menu3._fillInKbExprKeys(item.command.precondition, this._contextKeys);
      }
      if (item.command.toggled) {
        const toggledExpression = item.command.toggled.condition || item.command.toggled;
        Menu3._fillInKbExprKeys(toggledExpression, this._contextKeys);
      }
    } else if (this._options.emitEventsForSubmenuChanges) {
      MenuRegistry.getMenuItems(item.submenu).forEach(this._collectContextKeys, this);
    }
  }
  getActions(options) {
    const result = [];
    const allToggleActions = [];
    for (const group of this._menuGroups) {
      const [id, items] = group;
      const toggleActions = [];
      const activeActions = [];
      for (const item of items) {
        if (this._contextKeyService.contextMatchesRules(item.when)) {
          let action;
          const isMenuItem = isIMenuItem(item);
          if (isMenuItem) {
            const menuHide = createMenuHide(this._id, item.command, this._hiddenStates);
            action = new MenuItemAction(item.command, item.alt, options, menuHide, this._contextKeyService, this._commandService);
          } else {
            action = new SubmenuItemAction(item, this._menuService, this._contextKeyService, options);
            if (action.actions.length === 0) {
              action.dispose();
              action = void 0;
            }
          }
          if (action) {
            activeActions.push(action);
          }
        }
      }
      if (activeActions.length > 0) {
        result.push([id, activeActions]);
      }
      if (toggleActions.length > 0) {
        allToggleActions.push(toggleActions);
      }
    }
    return result;
  }
  static _fillInKbExprKeys(exp, set) {
    if (exp) {
      for (const key of exp.keys()) {
        set.add(key);
      }
    }
  }
  static _compareMenuItems(a, b) {
    const aGroup = a.group;
    const bGroup = b.group;
    if (aGroup !== bGroup) {
      if (!aGroup) {
        return 1;
      } else if (!bGroup) {
        return -1;
      }
      if (aGroup === "navigation") {
        return -1;
      } else if (bGroup === "navigation") {
        return 1;
      }
      const value = aGroup.localeCompare(bGroup);
      if (value !== 0) {
        return value;
      }
    }
    const aPrio = a.order || 0;
    const bPrio = b.order || 0;
    if (aPrio < bPrio) {
      return -1;
    } else if (aPrio > bPrio) {
      return 1;
    }
    return Menu3._compareTitles(isIMenuItem(a) ? a.command.title : a.title, isIMenuItem(b) ? b.command.title : b.title);
  }
  static _compareTitles(a, b) {
    const aStr = typeof a === "string" ? a : a.original;
    const bStr = typeof b === "string" ? b : b.original;
    return aStr.localeCompare(bStr);
  }
};
Menu2 = __decorate16([
  __param15(3, ICommandService),
  __param15(4, IContextKeyService),
  __param15(5, IMenuService)
], Menu2);
function createMenuHide(menu, command, states) {
  const id = `${menu.id}/${command.id}`;
  const title = typeof command.title === "string" ? command.title : command.title.value;
  const hide2 = toAction({
    id,
    label: localize("hide.label", "Hide '{0}'", title),
    run() {
      states.updateHidden(menu, command.id, true);
    }
  });
  const toggle = toAction({
    id,
    label: title,
    get checked() {
      return !states.isHidden(menu, command.id);
    },
    run() {
      const newValue = !states.isHidden(menu, command.id);
      states.updateHidden(menu, command.id, newValue);
    }
  });
  return {
    hide: hide2,
    toggle,
    get isHidden() {
      return !toggle.checked;
    }
  };
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/clipboard/browser/clipboardService.js
init_define_process();
init_browser();
init_dom();
init_async();
init_lifecycle();
init_log();
var __decorate17 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param16 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter11 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var BrowserClipboardService = class BrowserClipboardService2 extends Disposable {
  constructor(layoutService, logService) {
    super();
    this.layoutService = layoutService;
    this.logService = logService;
    this.mapTextToType = /* @__PURE__ */ new Map();
    this.findText = "";
    this.resources = [];
    if (isSafari || isWebkitWebView) {
      this.installWebKitWriteTextWorkaround();
    }
  }
  installWebKitWriteTextWorkaround() {
    const handler = () => {
      const currentWritePromise = new DeferredPromise();
      if (this.webKitPendingClipboardWritePromise && !this.webKitPendingClipboardWritePromise.isSettled) {
        this.webKitPendingClipboardWritePromise.cancel();
      }
      this.webKitPendingClipboardWritePromise = currentWritePromise;
      navigator.clipboard.write([new ClipboardItem({
        "text/plain": currentWritePromise.p
      })]).catch((err) => __awaiter11(this, void 0, void 0, function* () {
        if (!(err instanceof Error) || err.name !== "NotAllowedError" || !currentWritePromise.isRejected) {
          this.logService.error(err);
        }
      }));
    };
    if (this.layoutService.hasContainer) {
      this._register(addDisposableListener(this.layoutService.container, "click", handler));
      this._register(addDisposableListener(this.layoutService.container, "keydown", handler));
    }
  }
  writeText(text, type) {
    return __awaiter11(this, void 0, void 0, function* () {
      if (type) {
        this.mapTextToType.set(type, text);
        return;
      }
      if (this.webKitPendingClipboardWritePromise) {
        return this.webKitPendingClipboardWritePromise.complete(text);
      }
      try {
        return yield navigator.clipboard.writeText(text);
      } catch (error) {
        console.error(error);
      }
      const activeElement = document.activeElement;
      const textArea = document.body.appendChild($("textarea", { "aria-hidden": true }));
      textArea.style.height = "1px";
      textArea.style.width = "1px";
      textArea.style.position = "absolute";
      textArea.value = text;
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      if (activeElement instanceof HTMLElement) {
        activeElement.focus();
      }
      document.body.removeChild(textArea);
      return;
    });
  }
  readText(type) {
    return __awaiter11(this, void 0, void 0, function* () {
      if (type) {
        return this.mapTextToType.get(type) || "";
      }
      try {
        return yield navigator.clipboard.readText();
      } catch (error) {
        console.error(error);
        return "";
      }
    });
  }
  readFindText() {
    return __awaiter11(this, void 0, void 0, function* () {
      return this.findText;
    });
  }
  writeFindText(text) {
    return __awaiter11(this, void 0, void 0, function* () {
      this.findText = text;
    });
  }
  readResources() {
    return __awaiter11(this, void 0, void 0, function* () {
      return this.resources;
    });
  }
};
BrowserClipboardService = __decorate17([
  __param16(0, ILayoutService),
  __param16(1, ILogService)
], BrowserClipboardService);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/contextkey/browser/contextKeyService.js
init_define_process();
init_event();
init_iterator();
init_lifecycle();
init_map();
init_objects();
init_uri();
init_nls();
init_commands();
init_configuration();
init_contextkey();
var __decorate18 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param17 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var KEYBINDING_CONTEXT_ATTR = "data-keybinding-context";
var Context = class {
  constructor(id, parent) {
    this._id = id;
    this._parent = parent;
    this._value = /* @__PURE__ */ Object.create(null);
    this._value["_contextId"] = id;
  }
  get value() {
    return Object.assign({}, this._value);
  }
  setValue(key, value) {
    if (this._value[key] !== value) {
      this._value[key] = value;
      return true;
    }
    return false;
  }
  removeValue(key) {
    if (key in this._value) {
      delete this._value[key];
      return true;
    }
    return false;
  }
  getValue(key) {
    const ret = this._value[key];
    if (typeof ret === "undefined" && this._parent) {
      return this._parent.getValue(key);
    }
    return ret;
  }
};
var NullContext = class extends Context {
  constructor() {
    super(-1, null);
  }
  setValue(key, value) {
    return false;
  }
  removeValue(key) {
    return false;
  }
  getValue(key) {
    return void 0;
  }
};
NullContext.INSTANCE = new NullContext();
var ConfigAwareContextValuesContainer = class extends Context {
  constructor(id, _configurationService, emitter) {
    super(id, null);
    this._configurationService = _configurationService;
    this._values = TernarySearchTree.forConfigKeys();
    this._listener = this._configurationService.onDidChangeConfiguration((event) => {
      if (event.source === 7) {
        const allKeys = Array.from(Iterable.map(this._values, ([k]) => k));
        this._values.clear();
        emitter.fire(new ArrayContextKeyChangeEvent(allKeys));
      } else {
        const changedKeys = [];
        for (const configKey of event.affectedKeys) {
          const contextKey = `config.${configKey}`;
          const cachedItems = this._values.findSuperstr(contextKey);
          if (cachedItems !== void 0) {
            changedKeys.push(...Iterable.map(cachedItems, ([key]) => key));
            this._values.deleteSuperstr(contextKey);
          }
          if (this._values.has(contextKey)) {
            changedKeys.push(contextKey);
            this._values.delete(contextKey);
          }
        }
        emitter.fire(new ArrayContextKeyChangeEvent(changedKeys));
      }
    });
  }
  dispose() {
    this._listener.dispose();
  }
  getValue(key) {
    if (key.indexOf(ConfigAwareContextValuesContainer._keyPrefix) !== 0) {
      return super.getValue(key);
    }
    if (this._values.has(key)) {
      return this._values.get(key);
    }
    const configKey = key.substr(ConfigAwareContextValuesContainer._keyPrefix.length);
    const configValue = this._configurationService.getValue(configKey);
    let value = void 0;
    switch (typeof configValue) {
      case "number":
      case "boolean":
      case "string":
        value = configValue;
        break;
      default:
        if (Array.isArray(configValue)) {
          value = JSON.stringify(configValue);
        } else {
          value = configValue;
        }
    }
    this._values.set(key, value);
    return value;
  }
  setValue(key, value) {
    return super.setValue(key, value);
  }
  removeValue(key) {
    return super.removeValue(key);
  }
};
ConfigAwareContextValuesContainer._keyPrefix = "config.";
var ContextKey = class {
  constructor(service, key, defaultValue) {
    this._service = service;
    this._key = key;
    this._defaultValue = defaultValue;
    this.reset();
  }
  set(value) {
    this._service.setContext(this._key, value);
  }
  reset() {
    if (typeof this._defaultValue === "undefined") {
      this._service.removeContext(this._key);
    } else {
      this._service.setContext(this._key, this._defaultValue);
    }
  }
  get() {
    return this._service.getContextKeyValue(this._key);
  }
};
var SimpleContextKeyChangeEvent = class {
  constructor(key) {
    this.key = key;
  }
  affectsSome(keys) {
    return keys.has(this.key);
  }
  allKeysContainedIn(keys) {
    return this.affectsSome(keys);
  }
};
var ArrayContextKeyChangeEvent = class {
  constructor(keys) {
    this.keys = keys;
  }
  affectsSome(keys) {
    for (const key of this.keys) {
      if (keys.has(key)) {
        return true;
      }
    }
    return false;
  }
  allKeysContainedIn(keys) {
    return this.keys.every((key) => keys.has(key));
  }
};
var CompositeContextKeyChangeEvent = class {
  constructor(events) {
    this.events = events;
  }
  affectsSome(keys) {
    for (const e of this.events) {
      if (e.affectsSome(keys)) {
        return true;
      }
    }
    return false;
  }
  allKeysContainedIn(keys) {
    return this.events.every((evt) => evt.allKeysContainedIn(keys));
  }
};
function allEventKeysInContext(event, context) {
  return event.allKeysContainedIn(new Set(Object.keys(context)));
}
var AbstractContextKeyService = class {
  constructor(myContextId) {
    this._onDidChangeContext = new PauseableEmitter({ merge: (input) => new CompositeContextKeyChangeEvent(input) });
    this.onDidChangeContext = this._onDidChangeContext.event;
    this._isDisposed = false;
    this._myContextId = myContextId;
  }
  createKey(key, defaultValue) {
    if (this._isDisposed) {
      throw new Error(`AbstractContextKeyService has been disposed`);
    }
    return new ContextKey(this, key, defaultValue);
  }
  bufferChangeEvents(callback) {
    this._onDidChangeContext.pause();
    try {
      callback();
    } finally {
      this._onDidChangeContext.resume();
    }
  }
  createScoped(domNode) {
    if (this._isDisposed) {
      throw new Error(`AbstractContextKeyService has been disposed`);
    }
    return new ScopedContextKeyService(this, domNode);
  }
  contextMatchesRules(rules) {
    if (this._isDisposed) {
      throw new Error(`AbstractContextKeyService has been disposed`);
    }
    const context = this.getContextValuesContainer(this._myContextId);
    const result = rules ? rules.evaluate(context) : true;
    return result;
  }
  getContextKeyValue(key) {
    if (this._isDisposed) {
      return void 0;
    }
    return this.getContextValuesContainer(this._myContextId).getValue(key);
  }
  setContext(key, value) {
    if (this._isDisposed) {
      return;
    }
    const myContext = this.getContextValuesContainer(this._myContextId);
    if (!myContext) {
      return;
    }
    if (myContext.setValue(key, value)) {
      this._onDidChangeContext.fire(new SimpleContextKeyChangeEvent(key));
    }
  }
  removeContext(key) {
    if (this._isDisposed) {
      return;
    }
    if (this.getContextValuesContainer(this._myContextId).removeValue(key)) {
      this._onDidChangeContext.fire(new SimpleContextKeyChangeEvent(key));
    }
  }
  getContext(target) {
    if (this._isDisposed) {
      return NullContext.INSTANCE;
    }
    return this.getContextValuesContainer(findContextAttr(target));
  }
};
var ContextKeyService = class ContextKeyService2 extends AbstractContextKeyService {
  constructor(configurationService) {
    super(0);
    this._contexts = /* @__PURE__ */ new Map();
    this._toDispose = new DisposableStore();
    this._lastContextId = 0;
    const myContext = new ConfigAwareContextValuesContainer(this._myContextId, configurationService, this._onDidChangeContext);
    this._contexts.set(this._myContextId, myContext);
    this._toDispose.add(myContext);
  }
  dispose() {
    this._onDidChangeContext.dispose();
    this._isDisposed = true;
    this._toDispose.dispose();
  }
  getContextValuesContainer(contextId) {
    if (this._isDisposed) {
      return NullContext.INSTANCE;
    }
    return this._contexts.get(contextId) || NullContext.INSTANCE;
  }
  createChildContext(parentContextId = this._myContextId) {
    if (this._isDisposed) {
      throw new Error(`ContextKeyService has been disposed`);
    }
    const id = ++this._lastContextId;
    this._contexts.set(id, new Context(id, this.getContextValuesContainer(parentContextId)));
    return id;
  }
  disposeContext(contextId) {
    if (!this._isDisposed) {
      this._contexts.delete(contextId);
    }
  }
};
ContextKeyService = __decorate18([
  __param17(0, IConfigurationService)
], ContextKeyService);
var ScopedContextKeyService = class extends AbstractContextKeyService {
  constructor(parent, domNode) {
    super(parent.createChildContext());
    this._parentChangeListener = new MutableDisposable();
    this._parent = parent;
    this._updateParentChangeListener();
    this._domNode = domNode;
    if (this._domNode.hasAttribute(KEYBINDING_CONTEXT_ATTR)) {
      let extraInfo = "";
      if (this._domNode.classList) {
        extraInfo = Array.from(this._domNode.classList.values()).join(", ");
      }
      console.error(`Element already has context attribute${extraInfo ? ": " + extraInfo : ""}`);
    }
    this._domNode.setAttribute(KEYBINDING_CONTEXT_ATTR, String(this._myContextId));
  }
  _updateParentChangeListener() {
    this._parentChangeListener.value = this._parent.onDidChangeContext((e) => {
      const thisContainer = this._parent.getContextValuesContainer(this._myContextId);
      const thisContextValues = thisContainer.value;
      if (!allEventKeysInContext(e, thisContextValues)) {
        this._onDidChangeContext.fire(e);
      }
    });
  }
  dispose() {
    if (this._isDisposed) {
      return;
    }
    this._onDidChangeContext.dispose();
    this._parent.disposeContext(this._myContextId);
    this._parentChangeListener.dispose();
    this._domNode.removeAttribute(KEYBINDING_CONTEXT_ATTR);
    this._isDisposed = true;
  }
  getContextValuesContainer(contextId) {
    if (this._isDisposed) {
      return NullContext.INSTANCE;
    }
    return this._parent.getContextValuesContainer(contextId);
  }
  createChildContext(parentContextId = this._myContextId) {
    if (this._isDisposed) {
      throw new Error(`ScopedContextKeyService has been disposed`);
    }
    return this._parent.createChildContext(parentContextId);
  }
  disposeContext(contextId) {
    if (this._isDisposed) {
      return;
    }
    this._parent.disposeContext(contextId);
  }
};
function findContextAttr(domNode) {
  while (domNode) {
    if (domNode.hasAttribute(KEYBINDING_CONTEXT_ATTR)) {
      const attr = domNode.getAttribute(KEYBINDING_CONTEXT_ATTR);
      if (attr) {
        return parseInt(attr, 10);
      }
      return NaN;
    }
    domNode = domNode.parentElement;
  }
  return 0;
}
function setContext(accessor, contextKey, contextValue) {
  accessor.get(IContextKeyService).createKey(String(contextKey), stringifyURIs(contextValue));
}
function stringifyURIs(contextValue) {
  return cloneAndChange(contextValue, (obj) => {
    if (typeof obj === "object" && obj.$mid === 1) {
      return URI.revive(obj).toString();
    }
    if (obj instanceof URI) {
      return obj.toString();
    }
    return void 0;
  });
}
CommandsRegistry.registerCommand(SET_CONTEXT_COMMAND_ID, setContext);
CommandsRegistry.registerCommand({
  id: "getContextKeyInfo",
  handler() {
    return [...RawContextKey.all()].sort((a, b) => a.key.localeCompare(b.key));
  },
  description: {
    description: localize("getContextKeyInfo", "A command that returns information about context keys"),
    args: []
  }
});
CommandsRegistry.registerCommand("_generateContextKeyInfo", function() {
  const result = [];
  const seen = /* @__PURE__ */ new Set();
  for (const info of RawContextKey.all()) {
    if (!seen.has(info.key)) {
      seen.add(info.key);
      result.push(info);
    }
  }
  result.sort((a, b) => a.key.localeCompare(b.key));
  console.log(JSON.stringify(result, void 0, 2));
});

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_descriptors();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiationService.js
init_define_process();
init_async();
init_errors();
init_descriptors();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/instantiation/common/graph.js
init_define_process();
var Node = class {
  constructor(data) {
    this.incoming = /* @__PURE__ */ new Map();
    this.outgoing = /* @__PURE__ */ new Map();
    this.data = data;
  }
};
var Graph = class {
  constructor(_hashFn) {
    this._hashFn = _hashFn;
    this._nodes = /* @__PURE__ */ new Map();
  }
  roots() {
    const ret = [];
    for (const node of this._nodes.values()) {
      if (node.outgoing.size === 0) {
        ret.push(node);
      }
    }
    return ret;
  }
  insertEdge(from, to) {
    const fromNode = this.lookupOrInsertNode(from);
    const toNode = this.lookupOrInsertNode(to);
    fromNode.outgoing.set(this._hashFn(to), toNode);
    toNode.incoming.set(this._hashFn(from), fromNode);
  }
  removeNode(data) {
    const key = this._hashFn(data);
    this._nodes.delete(key);
    for (const node of this._nodes.values()) {
      node.outgoing.delete(key);
      node.incoming.delete(key);
    }
  }
  lookupOrInsertNode(data) {
    const key = this._hashFn(data);
    let node = this._nodes.get(key);
    if (!node) {
      node = new Node(data);
      this._nodes.set(key, node);
    }
    return node;
  }
  isEmpty() {
    return this._nodes.size === 0;
  }
  toString() {
    const data = [];
    for (const [key, value] of this._nodes) {
      data.push(`${key}, (incoming)[${[...value.incoming.keys()].join(", ")}], (outgoing)[${[...value.outgoing.keys()].join(",")}]`);
    }
    return data.join("\n");
  }
  findCycleSlow() {
    for (const [id, node] of this._nodes) {
      const seen = /* @__PURE__ */ new Set([id]);
      const res = this._findCycle(node, seen);
      if (res) {
        return res;
      }
    }
    return void 0;
  }
  _findCycle(node, seen) {
    for (const [id, outgoing] of node.outgoing) {
      if (seen.has(id)) {
        return [...seen, id].join(" -> ");
      }
      seen.add(id);
      const value = this._findCycle(outgoing, seen);
      if (value) {
        return value;
      }
      seen.delete(id);
    }
    return void 0;
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/instantiation/common/instantiationService.js
init_instantiation();
var _enableTracing = false;
var CyclicDependencyError = class extends Error {
  constructor(graph) {
    var _a4;
    super("cyclic dependency between services");
    this.message = (_a4 = graph.findCycleSlow()) !== null && _a4 !== void 0 ? _a4 : `UNABLE to detect cycle, dumping graph: 
${graph.toString()}`;
  }
};
var InstantiationService = class {
  constructor(services = new ServiceCollection(), strict = false, parent) {
    this._activeInstantiations = /* @__PURE__ */ new Set();
    this._services = services;
    this._strict = strict;
    this._parent = parent;
    this._services.set(IInstantiationService, this);
  }
  createChild(services) {
    return new InstantiationService(services, this._strict, this);
  }
  invokeFunction(fn, ...args) {
    const _trace = Trace.traceInvocation(fn);
    let _done = false;
    try {
      const accessor = {
        get: (id) => {
          if (_done) {
            throw illegalState("service accessor is only valid during the invocation of its target method");
          }
          const result = this._getOrCreateServiceInstance(id, _trace);
          if (!result) {
            throw new Error(`[invokeFunction] unknown service '${id}'`);
          }
          return result;
        }
      };
      return fn(accessor, ...args);
    } finally {
      _done = true;
      _trace.stop();
    }
  }
  createInstance(ctorOrDescriptor, ...rest) {
    let _trace;
    let result;
    if (ctorOrDescriptor instanceof SyncDescriptor) {
      _trace = Trace.traceCreation(ctorOrDescriptor.ctor);
      result = this._createInstance(ctorOrDescriptor.ctor, ctorOrDescriptor.staticArguments.concat(rest), _trace);
    } else {
      _trace = Trace.traceCreation(ctorOrDescriptor);
      result = this._createInstance(ctorOrDescriptor, rest, _trace);
    }
    _trace.stop();
    return result;
  }
  _createInstance(ctor, args = [], _trace) {
    const serviceDependencies = _util.getServiceDependencies(ctor).sort((a, b) => a.index - b.index);
    const serviceArgs = [];
    for (const dependency of serviceDependencies) {
      const service = this._getOrCreateServiceInstance(dependency.id, _trace);
      if (!service) {
        this._throwIfStrict(`[createInstance] ${ctor.name} depends on UNKNOWN service ${dependency.id}.`, false);
      }
      serviceArgs.push(service);
    }
    const firstServiceArgPos = serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;
    if (args.length !== firstServiceArgPos) {
      console.trace(`[createInstance] First service dependency of ${ctor.name} at position ${firstServiceArgPos + 1} conflicts with ${args.length} static arguments`);
      const delta = firstServiceArgPos - args.length;
      if (delta > 0) {
        args = args.concat(new Array(delta));
      } else {
        args = args.slice(0, firstServiceArgPos);
      }
    }
    return new ctor(...[...args, ...serviceArgs]);
  }
  _setServiceInstance(id, instance) {
    if (this._services.get(id) instanceof SyncDescriptor) {
      this._services.set(id, instance);
    } else if (this._parent) {
      this._parent._setServiceInstance(id, instance);
    } else {
      throw new Error("illegalState - setting UNKNOWN service instance");
    }
  }
  _getServiceInstanceOrDescriptor(id) {
    const instanceOrDesc = this._services.get(id);
    if (!instanceOrDesc && this._parent) {
      return this._parent._getServiceInstanceOrDescriptor(id);
    } else {
      return instanceOrDesc;
    }
  }
  _getOrCreateServiceInstance(id, _trace) {
    const thing = this._getServiceInstanceOrDescriptor(id);
    if (thing instanceof SyncDescriptor) {
      return this._safeCreateAndCacheServiceInstance(id, thing, _trace.branch(id, true));
    } else {
      _trace.branch(id, false);
      return thing;
    }
  }
  _safeCreateAndCacheServiceInstance(id, desc, _trace) {
    if (this._activeInstantiations.has(id)) {
      throw new Error(`illegal state - RECURSIVELY instantiating service '${id}'`);
    }
    this._activeInstantiations.add(id);
    try {
      return this._createAndCacheServiceInstance(id, desc, _trace);
    } finally {
      this._activeInstantiations.delete(id);
    }
  }
  _createAndCacheServiceInstance(id, desc, _trace) {
    const graph = new Graph((data) => data.id.toString());
    let cycleCount = 0;
    const stack = [{ id, desc, _trace }];
    while (stack.length) {
      const item = stack.pop();
      graph.lookupOrInsertNode(item);
      if (cycleCount++ > 1e3) {
        throw new CyclicDependencyError(graph);
      }
      for (const dependency of _util.getServiceDependencies(item.desc.ctor)) {
        const instanceOrDesc = this._getServiceInstanceOrDescriptor(dependency.id);
        if (!instanceOrDesc) {
          this._throwIfStrict(`[createInstance] ${id} depends on ${dependency.id} which is NOT registered.`, true);
        }
        if (instanceOrDesc instanceof SyncDescriptor) {
          const d = { id: dependency.id, desc: instanceOrDesc, _trace: item._trace.branch(dependency.id, true) };
          graph.insertEdge(item, d);
          stack.push(d);
        }
      }
    }
    while (true) {
      const roots = graph.roots();
      if (roots.length === 0) {
        if (!graph.isEmpty()) {
          throw new CyclicDependencyError(graph);
        }
        break;
      }
      for (const { data } of roots) {
        const instanceOrDesc = this._getServiceInstanceOrDescriptor(data.id);
        if (instanceOrDesc instanceof SyncDescriptor) {
          const instance = this._createServiceInstanceWithOwner(data.id, data.desc.ctor, data.desc.staticArguments, data.desc.supportsDelayedInstantiation, data._trace);
          this._setServiceInstance(data.id, instance);
        }
        graph.removeNode(data);
      }
    }
    return this._getServiceInstanceOrDescriptor(id);
  }
  _createServiceInstanceWithOwner(id, ctor, args = [], supportsDelayedInstantiation, _trace) {
    if (this._services.get(id) instanceof SyncDescriptor) {
      return this._createServiceInstance(ctor, args, supportsDelayedInstantiation, _trace);
    } else if (this._parent) {
      return this._parent._createServiceInstanceWithOwner(id, ctor, args, supportsDelayedInstantiation, _trace);
    } else {
      throw new Error(`illegalState - creating UNKNOWN service instance ${ctor.name}`);
    }
  }
  _createServiceInstance(ctor, args = [], _supportsDelayedInstantiation, _trace) {
    if (!_supportsDelayedInstantiation) {
      return this._createInstance(ctor, args, _trace);
    } else {
      const idle = new IdleValue(() => this._createInstance(ctor, args, _trace));
      return new Proxy(/* @__PURE__ */ Object.create(null), {
        get(target, key) {
          if (key in target) {
            return target[key];
          }
          const obj = idle.value;
          let prop = obj[key];
          if (typeof prop !== "function") {
            return prop;
          }
          prop = prop.bind(obj);
          target[key] = prop;
          return prop;
        },
        set(_target, p, value) {
          idle.value[p] = value;
          return true;
        }
      });
    }
  }
  _throwIfStrict(msg, printWarning) {
    if (printWarning) {
      console.warn(msg);
    }
    if (this._strict) {
      throw new Error(msg);
    }
  }
};
var Trace = class {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this._start = Date.now();
    this._dep = [];
  }
  static traceInvocation(ctor) {
    return !_enableTracing ? Trace._None : new Trace(1, ctor.name || ctor.toString().substring(0, 42).replace(/\n/g, ""));
  }
  static traceCreation(ctor) {
    return !_enableTracing ? Trace._None : new Trace(0, ctor.name);
  }
  branch(id, first) {
    const child = new Trace(2, id.toString());
    this._dep.push([id, first, child]);
    return child;
  }
  stop() {
    const dur = Date.now() - this._start;
    Trace._totals += dur;
    let causedCreation = false;
    function printChild(n, trace) {
      const res = [];
      const prefix = new Array(n + 1).join("	");
      for (const [id, first, child] of trace._dep) {
        if (first && child) {
          causedCreation = true;
          res.push(`${prefix}CREATES -> ${id}`);
          const nested = printChild(n + 1, child);
          if (nested) {
            res.push(nested);
          }
        } else {
          res.push(`${prefix}uses -> ${id}`);
        }
      }
      return res.join("\n");
    }
    const lines = [
      `${this.type === 0 ? "CREATE" : "CALL"} ${this.name}`,
      `${printChild(1, this)}`,
      `DONE, took ${dur.toFixed(2)}ms (grand total ${Trace._totals.toFixed(2)}ms)`
    ];
    if (dur > 2 || causedCreation) {
      console.log(lines.join("\n"));
    }
  }
};
Trace._None = new class extends Trace {
  constructor() {
    super(-1, null);
  }
  stop() {
  }
  branch() {
    return this;
  }
}();
Trace._totals = 0;

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/markers/common/markerService.js
init_define_process();
init_arrays();
init_event();
init_iterator();
init_map();
init_network();
init_uri();
var DoubleResourceMap = class {
  constructor() {
    this._byResource = new ResourceMap();
    this._byOwner = /* @__PURE__ */ new Map();
  }
  set(resource, owner, value) {
    let ownerMap = this._byResource.get(resource);
    if (!ownerMap) {
      ownerMap = /* @__PURE__ */ new Map();
      this._byResource.set(resource, ownerMap);
    }
    ownerMap.set(owner, value);
    let resourceMap = this._byOwner.get(owner);
    if (!resourceMap) {
      resourceMap = new ResourceMap();
      this._byOwner.set(owner, resourceMap);
    }
    resourceMap.set(resource, value);
  }
  get(resource, owner) {
    const ownerMap = this._byResource.get(resource);
    return ownerMap === null || ownerMap === void 0 ? void 0 : ownerMap.get(owner);
  }
  delete(resource, owner) {
    let removedA = false;
    let removedB = false;
    const ownerMap = this._byResource.get(resource);
    if (ownerMap) {
      removedA = ownerMap.delete(owner);
    }
    const resourceMap = this._byOwner.get(owner);
    if (resourceMap) {
      removedB = resourceMap.delete(resource);
    }
    if (removedA !== removedB) {
      throw new Error("illegal state");
    }
    return removedA && removedB;
  }
  values(key) {
    var _a4, _b, _c, _d;
    if (typeof key === "string") {
      return (_b = (_a4 = this._byOwner.get(key)) === null || _a4 === void 0 ? void 0 : _a4.values()) !== null && _b !== void 0 ? _b : Iterable.empty();
    }
    if (URI.isUri(key)) {
      return (_d = (_c = this._byResource.get(key)) === null || _c === void 0 ? void 0 : _c.values()) !== null && _d !== void 0 ? _d : Iterable.empty();
    }
    return Iterable.map(Iterable.concat(...this._byOwner.values()), (map) => map[1]);
  }
};
var MarkerStats = class {
  constructor(service) {
    this.errors = 0;
    this.infos = 0;
    this.warnings = 0;
    this.unknowns = 0;
    this._data = new ResourceMap();
    this._service = service;
    this._subscription = service.onMarkerChanged(this._update, this);
  }
  dispose() {
    this._subscription.dispose();
  }
  _update(resources) {
    for (const resource of resources) {
      const oldStats = this._data.get(resource);
      if (oldStats) {
        this._substract(oldStats);
      }
      const newStats = this._resourceStats(resource);
      this._add(newStats);
      this._data.set(resource, newStats);
    }
  }
  _resourceStats(resource) {
    const result = { errors: 0, warnings: 0, infos: 0, unknowns: 0 };
    if (resource.scheme === Schemas.inMemory || resource.scheme === Schemas.walkThrough || resource.scheme === Schemas.walkThroughSnippet || resource.scheme === Schemas.vscodeSourceControl) {
      return result;
    }
    for (const { severity } of this._service.read({ resource })) {
      if (severity === MarkerSeverity2.Error) {
        result.errors += 1;
      } else if (severity === MarkerSeverity2.Warning) {
        result.warnings += 1;
      } else if (severity === MarkerSeverity2.Info) {
        result.infos += 1;
      } else {
        result.unknowns += 1;
      }
    }
    return result;
  }
  _substract(op) {
    this.errors -= op.errors;
    this.warnings -= op.warnings;
    this.infos -= op.infos;
    this.unknowns -= op.unknowns;
  }
  _add(op) {
    this.errors += op.errors;
    this.warnings += op.warnings;
    this.infos += op.infos;
    this.unknowns += op.unknowns;
  }
};
var MarkerService = class {
  constructor() {
    this._onMarkerChanged = new DebounceEmitter({
      delay: 0,
      merge: MarkerService._merge
    });
    this.onMarkerChanged = this._onMarkerChanged.event;
    this._data = new DoubleResourceMap();
    this._stats = new MarkerStats(this);
  }
  dispose() {
    this._stats.dispose();
    this._onMarkerChanged.dispose();
  }
  remove(owner, resources) {
    for (const resource of resources || []) {
      this.changeOne(owner, resource, []);
    }
  }
  changeOne(owner, resource, markerData) {
    if (isFalsyOrEmpty(markerData)) {
      const removed = this._data.delete(resource, owner);
      if (removed) {
        this._onMarkerChanged.fire([resource]);
      }
    } else {
      const markers = [];
      for (const data of markerData) {
        const marker = MarkerService._toMarker(owner, resource, data);
        if (marker) {
          markers.push(marker);
        }
      }
      this._data.set(resource, owner, markers);
      this._onMarkerChanged.fire([resource]);
    }
  }
  static _toMarker(owner, resource, data) {
    let { code, severity, message, source, startLineNumber, startColumn, endLineNumber, endColumn, relatedInformation, tags } = data;
    if (!message) {
      return void 0;
    }
    startLineNumber = startLineNumber > 0 ? startLineNumber : 1;
    startColumn = startColumn > 0 ? startColumn : 1;
    endLineNumber = endLineNumber >= startLineNumber ? endLineNumber : startLineNumber;
    endColumn = endColumn > 0 ? endColumn : startColumn;
    return {
      resource,
      owner,
      code,
      severity,
      message,
      source,
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn,
      relatedInformation,
      tags
    };
  }
  changeAll(owner, data) {
    const changes = [];
    const existing = this._data.values(owner);
    if (existing) {
      for (const data2 of existing) {
        const first = Iterable.first(data2);
        if (first) {
          changes.push(first.resource);
          this._data.delete(first.resource, owner);
        }
      }
    }
    if (isNonEmptyArray(data)) {
      const groups = new ResourceMap();
      for (const { resource, marker: markerData } of data) {
        const marker = MarkerService._toMarker(owner, resource, markerData);
        if (!marker) {
          continue;
        }
        const array = groups.get(resource);
        if (!array) {
          groups.set(resource, [marker]);
          changes.push(resource);
        } else {
          array.push(marker);
        }
      }
      for (const [resource, value] of groups) {
        this._data.set(resource, owner, value);
      }
    }
    if (changes.length > 0) {
      this._onMarkerChanged.fire(changes);
    }
  }
  read(filter = /* @__PURE__ */ Object.create(null)) {
    let { owner, resource, severities, take } = filter;
    if (!take || take < 0) {
      take = -1;
    }
    if (owner && resource) {
      const data = this._data.get(resource, owner);
      if (!data) {
        return [];
      } else {
        const result = [];
        for (const marker of data) {
          if (MarkerService._accept(marker, severities)) {
            const newLen = result.push(marker);
            if (take > 0 && newLen === take) {
              break;
            }
          }
        }
        return result;
      }
    } else if (!owner && !resource) {
      const result = [];
      for (const markers of this._data.values()) {
        for (const data of markers) {
          if (MarkerService._accept(data, severities)) {
            const newLen = result.push(data);
            if (take > 0 && newLen === take) {
              return result;
            }
          }
        }
      }
      return result;
    } else {
      const iterable = this._data.values(resource !== null && resource !== void 0 ? resource : owner);
      const result = [];
      for (const markers of iterable) {
        for (const data of markers) {
          if (MarkerService._accept(data, severities)) {
            const newLen = result.push(data);
            if (take > 0 && newLen === take) {
              return result;
            }
          }
        }
      }
      return result;
    }
  }
  static _accept(marker, severities) {
    return severities === void 0 || (severities & marker.severity) === marker.severity;
  }
  static _merge(all) {
    const set = new ResourceMap();
    for (const array of all) {
      for (const item of array) {
        set.set(item, true);
      }
    }
    return Array.from(set.keys());
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
init_opener();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeaturesService.js
init_define_process();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/languageFeatureRegistry.js
init_define_process();
init_event();
init_lifecycle();
init_model();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/languageSelector.js
init_define_process();
init_path();
function score(selector, candidateUri, candidateLanguage, candidateIsSynchronized, candidateNotebookUri, candidateNotebookType) {
  if (Array.isArray(selector)) {
    let ret = 0;
    for (const filter of selector) {
      const value = score(filter, candidateUri, candidateLanguage, candidateIsSynchronized, candidateNotebookUri, candidateNotebookType);
      if (value === 10) {
        return value;
      }
      if (value > ret) {
        ret = value;
      }
    }
    return ret;
  } else if (typeof selector === "string") {
    if (!candidateIsSynchronized) {
      return 0;
    }
    if (selector === "*") {
      return 5;
    } else if (selector === candidateLanguage) {
      return 10;
    } else {
      return 0;
    }
  } else if (selector) {
    const { language, pattern, scheme, hasAccessToAllModels, notebookType } = selector;
    if (!candidateIsSynchronized && !hasAccessToAllModels) {
      return 0;
    }
    if (notebookType && candidateNotebookUri) {
      candidateUri = candidateNotebookUri;
    }
    let ret = 0;
    if (scheme) {
      if (scheme === candidateUri.scheme) {
        ret = 10;
      } else if (scheme === "*") {
        ret = 5;
      } else {
        return 0;
      }
    }
    if (language) {
      if (language === candidateLanguage) {
        ret = 10;
      } else if (language === "*") {
        ret = Math.max(ret, 5);
      } else {
        return 0;
      }
    }
    if (notebookType) {
      if (notebookType === candidateNotebookType) {
        ret = 10;
      } else if (notebookType === "*" && candidateNotebookType !== void 0) {
        ret = Math.max(ret, 5);
      } else {
        return 0;
      }
    }
    if (pattern) {
      let normalizedPattern;
      if (typeof pattern === "string") {
        normalizedPattern = pattern;
      } else {
        normalizedPattern = Object.assign(Object.assign({}, pattern), { base: normalize(pattern.base) });
      }
      if (normalizedPattern === candidateUri.fsPath || match(normalizedPattern, candidateUri.fsPath)) {
        ret = 10;
      } else {
        return 0;
      }
    }
    return ret;
  } else {
    return 0;
  }
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/languageFeatureRegistry.js
function isExclusive(selector) {
  if (typeof selector === "string") {
    return false;
  } else if (Array.isArray(selector)) {
    return selector.every(isExclusive);
  } else {
    return !!selector.exclusive;
  }
}
var MatchCandidate = class {
  constructor(uri, languageId, notebookUri, notebookType) {
    this.uri = uri;
    this.languageId = languageId;
    this.notebookUri = notebookUri;
    this.notebookType = notebookType;
  }
  equals(other) {
    var _a4, _b;
    return this.notebookType === other.notebookType && this.languageId === other.languageId && this.uri.toString() === other.uri.toString() && ((_a4 = this.notebookUri) === null || _a4 === void 0 ? void 0 : _a4.toString()) === ((_b = other.notebookUri) === null || _b === void 0 ? void 0 : _b.toString());
  }
};
var LanguageFeatureRegistry = class {
  constructor(_notebookInfoResolver) {
    this._notebookInfoResolver = _notebookInfoResolver;
    this._clock = 0;
    this._entries = [];
    this._onDidChange = new Emitter();
    this.onDidChange = this._onDidChange.event;
  }
  register(selector, provider) {
    let entry = {
      selector,
      provider,
      _score: -1,
      _time: this._clock++
    };
    this._entries.push(entry);
    this._lastCandidate = void 0;
    this._onDidChange.fire(this._entries.length);
    return toDisposable(() => {
      if (entry) {
        const idx = this._entries.indexOf(entry);
        if (idx >= 0) {
          this._entries.splice(idx, 1);
          this._lastCandidate = void 0;
          this._onDidChange.fire(this._entries.length);
          entry = void 0;
        }
      }
    });
  }
  has(model) {
    return this.all(model).length > 0;
  }
  all(model) {
    if (!model) {
      return [];
    }
    this._updateScores(model);
    const result = [];
    for (const entry of this._entries) {
      if (entry._score > 0) {
        result.push(entry.provider);
      }
    }
    return result;
  }
  ordered(model) {
    const result = [];
    this._orderedForEach(model, (entry) => result.push(entry.provider));
    return result;
  }
  orderedGroups(model) {
    const result = [];
    let lastBucket;
    let lastBucketScore;
    this._orderedForEach(model, (entry) => {
      if (lastBucket && lastBucketScore === entry._score) {
        lastBucket.push(entry.provider);
      } else {
        lastBucketScore = entry._score;
        lastBucket = [entry.provider];
        result.push(lastBucket);
      }
    });
    return result;
  }
  _orderedForEach(model, callback) {
    this._updateScores(model);
    for (const entry of this._entries) {
      if (entry._score > 0) {
        callback(entry);
      }
    }
  }
  _updateScores(model) {
    var _a4, _b;
    const notebookInfo = (_a4 = this._notebookInfoResolver) === null || _a4 === void 0 ? void 0 : _a4.call(this, model.uri);
    const candidate = notebookInfo ? new MatchCandidate(model.uri, model.getLanguageId(), notebookInfo.uri, notebookInfo.type) : new MatchCandidate(model.uri, model.getLanguageId(), void 0, void 0);
    if ((_b = this._lastCandidate) === null || _b === void 0 ? void 0 : _b.equals(candidate)) {
      return;
    }
    this._lastCandidate = candidate;
    for (const entry of this._entries) {
      entry._score = score(entry.selector, candidate.uri, candidate.languageId, shouldSynchronizeModel(model), candidate.notebookUri, candidate.notebookType);
      if (isExclusive(entry.selector) && entry._score > 0) {
        for (const entry2 of this._entries) {
          entry2._score = 0;
        }
        entry._score = 1e3;
        break;
      }
    }
    this._entries.sort(LanguageFeatureRegistry._compareByScoreAndTime);
  }
  static _compareByScoreAndTime(a, b) {
    if (a._score < b._score) {
      return 1;
    } else if (a._score > b._score) {
      return -1;
    } else if (a._time < b._time) {
      return 1;
    } else if (a._time > b._time) {
      return -1;
    } else {
      return 0;
    }
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/common/services/languageFeaturesService.js
init_languageFeatures();
init_extensions();
var LanguageFeaturesService = class {
  constructor() {
    this.referenceProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.renameProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.codeActionProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.definitionProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.typeDefinitionProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.declarationProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.implementationProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentSymbolProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.inlayHintsProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.colorProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.codeLensProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentFormattingEditProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentRangeFormattingEditProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.onTypeFormattingEditProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.signatureHelpProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.hoverProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentHighlightProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.selectionRangeProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.foldingRangeProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.linkProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.inlineCompletionsProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.completionProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.linkedEditingRangeProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentRangeSemanticTokensProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentSemanticTokensProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentOnDropEditProvider = new LanguageFeatureRegistry(this._score.bind(this));
    this.documentPasteEditProvider = new LanguageFeatureRegistry(this._score.bind(this));
  }
  _score(uri) {
    var _a4;
    return (_a4 = this._notebookTypeResolver) === null || _a4 === void 0 ? void 0 : _a4.call(this, uri);
  }
};
registerSingleton(ILanguageFeaturesService, LanguageFeaturesService, true);

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/platform/configuration/common/configurations.js
init_define_process();
init_configuration();
init_configurationRegistry();
init_platform2();
var DefaultConfigurationModel = class extends ConfigurationModel {
  constructor(configurationDefaultsOverrides = {}) {
    const properties = Registry.as(Extensions.Configuration).getConfigurationProperties();
    const keys = Object.keys(properties);
    const contents = /* @__PURE__ */ Object.create(null);
    const overrides = [];
    for (const key in properties) {
      const defaultOverrideValue = configurationDefaultsOverrides[key];
      const value = defaultOverrideValue !== void 0 ? defaultOverrideValue : properties[key].default;
      addToValueTree(contents, key, value, (message) => console.error(`Conflict in default settings: ${message}`));
    }
    for (const key of Object.keys(contents)) {
      if (OVERRIDE_PROPERTY_REGEX.test(key)) {
        overrides.push({
          identifiers: overrideIdentifiersFromKey(key),
          keys: Object.keys(contents[key]),
          contents: toValuesTree(contents[key], (message) => console.error(`Conflict in default settings file: ${message}`))
        });
      }
    }
    super(contents, keys, overrides);
  }
};

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneServices.js
var __decorate19 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param18 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var __awaiter12 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var SimpleModel = class {
  constructor(model) {
    this.disposed = false;
    this.model = model;
    this._onWillDispose = new Emitter();
  }
  get textEditorModel() {
    return this.model;
  }
  dispose() {
    this.disposed = true;
    this._onWillDispose.fire();
  }
};
var StandaloneTextModelService = class StandaloneTextModelService2 {
  constructor(modelService) {
    this.modelService = modelService;
  }
  createModelReference(resource) {
    const model = this.modelService.getModel(resource);
    if (!model) {
      return Promise.reject(new Error(`Model not found`));
    }
    return Promise.resolve(new ImmortalReference(new SimpleModel(model)));
  }
};
StandaloneTextModelService = __decorate19([
  __param18(0, IModelService)
], StandaloneTextModelService);
var StandaloneEditorProgressService = class {
  show() {
    return StandaloneEditorProgressService.NULL_PROGRESS_RUNNER;
  }
  showWhile(promise, delay) {
    return __awaiter12(this, void 0, void 0, function* () {
      yield promise;
    });
  }
};
StandaloneEditorProgressService.NULL_PROGRESS_RUNNER = {
  done: () => {
  },
  total: () => {
  },
  worked: () => {
  }
};
var StandaloneProgressService = class {
  withProgress(_options, task, onDidCancel) {
    return task({
      report: () => {
      }
    });
  }
};
var StandaloneDialogService = class {
  confirm(confirmation) {
    return this.doConfirm(confirmation).then((confirmed) => {
      return {
        confirmed,
        checkboxChecked: false
      };
    });
  }
  doConfirm(confirmation) {
    let messageText = confirmation.message;
    if (confirmation.detail) {
      messageText = messageText + "\n\n" + confirmation.detail;
    }
    return Promise.resolve(window.confirm(messageText));
  }
  show(severity, message, buttons, options) {
    return Promise.resolve({ choice: 0 });
  }
};
var StandaloneNotificationService = class {
  info(message) {
    return this.notify({ severity: severity_default.Info, message });
  }
  warn(message) {
    return this.notify({ severity: severity_default.Warning, message });
  }
  error(error) {
    return this.notify({ severity: severity_default.Error, message: error });
  }
  notify(notification) {
    switch (notification.severity) {
      case severity_default.Error:
        console.error(notification.message);
        break;
      case severity_default.Warning:
        console.warn(notification.message);
        break;
      default:
        console.log(notification.message);
        break;
    }
    return StandaloneNotificationService.NO_OP;
  }
  status(message, options) {
    return Disposable.None;
  }
};
StandaloneNotificationService.NO_OP = new NoOpNotification();
var StandaloneCommandService = class StandaloneCommandService2 {
  constructor(instantiationService) {
    this._onWillExecuteCommand = new Emitter();
    this._onDidExecuteCommand = new Emitter();
    this.onWillExecuteCommand = this._onWillExecuteCommand.event;
    this.onDidExecuteCommand = this._onDidExecuteCommand.event;
    this._instantiationService = instantiationService;
  }
  executeCommand(id, ...args) {
    const command = CommandsRegistry.getCommand(id);
    if (!command) {
      return Promise.reject(new Error(`command '${id}' not found`));
    }
    try {
      this._onWillExecuteCommand.fire({ commandId: id, args });
      const result = this._instantiationService.invokeFunction.apply(this._instantiationService, [command.handler, ...args]);
      this._onDidExecuteCommand.fire({ commandId: id, args });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
StandaloneCommandService = __decorate19([
  __param18(0, IInstantiationService)
], StandaloneCommandService);
var StandaloneKeybindingService = class StandaloneKeybindingService2 extends AbstractKeybindingService {
  constructor(contextKeyService, commandService, telemetryService, notificationService, logService, codeEditorService) {
    super(contextKeyService, commandService, telemetryService, notificationService, logService);
    this._cachedResolver = null;
    this._dynamicKeybindings = [];
    this._domNodeListeners = [];
    const addContainer = (domNode) => {
      const disposables = new DisposableStore();
      disposables.add(addDisposableListener(domNode, EventType.KEY_DOWN, (e) => {
        const keyEvent = new StandardKeyboardEvent(e);
        const shouldPreventDefault = this._dispatch(keyEvent, keyEvent.target);
        if (shouldPreventDefault) {
          keyEvent.preventDefault();
          keyEvent.stopPropagation();
        }
      }));
      disposables.add(addDisposableListener(domNode, EventType.KEY_UP, (e) => {
        const keyEvent = new StandardKeyboardEvent(e);
        const shouldPreventDefault = this._singleModifierDispatch(keyEvent, keyEvent.target);
        if (shouldPreventDefault) {
          keyEvent.preventDefault();
        }
      }));
      this._domNodeListeners.push(new DomNodeListeners(domNode, disposables));
    };
    const removeContainer = (domNode) => {
      for (let i = 0; i < this._domNodeListeners.length; i++) {
        const domNodeListeners = this._domNodeListeners[i];
        if (domNodeListeners.domNode === domNode) {
          this._domNodeListeners.splice(i, 1);
          domNodeListeners.dispose();
        }
      }
    };
    const addCodeEditor = (codeEditor) => {
      if (codeEditor.getOption(56)) {
        return;
      }
      addContainer(codeEditor.getContainerDomNode());
    };
    const removeCodeEditor = (codeEditor) => {
      if (codeEditor.getOption(56)) {
        return;
      }
      removeContainer(codeEditor.getContainerDomNode());
    };
    this._register(codeEditorService.onCodeEditorAdd(addCodeEditor));
    this._register(codeEditorService.onCodeEditorRemove(removeCodeEditor));
    codeEditorService.listCodeEditors().forEach(addCodeEditor);
    const addDiffEditor = (diffEditor) => {
      addContainer(diffEditor.getContainerDomNode());
    };
    const removeDiffEditor = (diffEditor) => {
      removeContainer(diffEditor.getContainerDomNode());
    };
    this._register(codeEditorService.onDiffEditorAdd(addDiffEditor));
    this._register(codeEditorService.onDiffEditorRemove(removeDiffEditor));
    codeEditorService.listDiffEditors().forEach(addDiffEditor);
  }
  addDynamicKeybinding(commandId, _keybinding, handler, when) {
    const keybinding = createKeybinding(_keybinding, OS);
    const toDispose = new DisposableStore();
    if (keybinding) {
      this._dynamicKeybindings.push({
        keybinding: keybinding.parts,
        command: commandId,
        when,
        weight1: 1e3,
        weight2: 0,
        extensionId: null,
        isBuiltinExtension: false
      });
      toDispose.add(toDisposable(() => {
        for (let i = 0; i < this._dynamicKeybindings.length; i++) {
          const kb = this._dynamicKeybindings[i];
          if (kb.command === commandId) {
            this._dynamicKeybindings.splice(i, 1);
            this.updateResolver();
            return;
          }
        }
      }));
    }
    toDispose.add(CommandsRegistry.registerCommand(commandId, handler));
    this.updateResolver();
    return toDispose;
  }
  updateResolver() {
    this._cachedResolver = null;
    this._onDidUpdateKeybindings.fire();
  }
  _getResolver() {
    if (!this._cachedResolver) {
      const defaults = this._toNormalizedKeybindingItems(KeybindingsRegistry.getDefaultKeybindings(), true);
      const overrides = this._toNormalizedKeybindingItems(this._dynamicKeybindings, false);
      this._cachedResolver = new KeybindingResolver(defaults, overrides, (str) => this._log(str));
    }
    return this._cachedResolver;
  }
  _documentHasFocus() {
    return document.hasFocus();
  }
  _toNormalizedKeybindingItems(items, isDefault) {
    const result = [];
    let resultLen = 0;
    for (const item of items) {
      const when = item.when || void 0;
      const keybinding = item.keybinding;
      if (!keybinding) {
        result[resultLen++] = new ResolvedKeybindingItem(void 0, item.command, item.commandArgs, when, isDefault, null, false);
      } else {
        const resolvedKeybindings = USLayoutResolvedKeybinding.resolveUserBinding(keybinding, OS);
        for (const resolvedKeybinding of resolvedKeybindings) {
          result[resultLen++] = new ResolvedKeybindingItem(resolvedKeybinding, item.command, item.commandArgs, when, isDefault, null, false);
        }
      }
    }
    return result;
  }
  resolveKeyboardEvent(keyboardEvent) {
    const keybinding = new SimpleKeybinding(keyboardEvent.ctrlKey, keyboardEvent.shiftKey, keyboardEvent.altKey, keyboardEvent.metaKey, keyboardEvent.keyCode).toChord();
    return new USLayoutResolvedKeybinding(keybinding, OS);
  }
};
StandaloneKeybindingService = __decorate19([
  __param18(0, IContextKeyService),
  __param18(1, ICommandService),
  __param18(2, ITelemetryService),
  __param18(3, INotificationService),
  __param18(4, ILogService),
  __param18(5, ICodeEditorService)
], StandaloneKeybindingService);
var DomNodeListeners = class extends Disposable {
  constructor(domNode, disposables) {
    super();
    this.domNode = domNode;
    this._register(disposables);
  }
};
function isConfigurationOverrides(thing) {
  return thing && typeof thing === "object" && (!thing.overrideIdentifier || typeof thing.overrideIdentifier === "string") && (!thing.resource || thing.resource instanceof URI);
}
var StandaloneConfigurationService = class {
  constructor() {
    this._onDidChangeConfiguration = new Emitter();
    this.onDidChangeConfiguration = this._onDidChangeConfiguration.event;
    this._configuration = new Configuration(new DefaultConfigurationModel(), new ConfigurationModel(), new ConfigurationModel(), new ConfigurationModel());
  }
  getValue(arg1, arg2) {
    const section = typeof arg1 === "string" ? arg1 : void 0;
    const overrides = isConfigurationOverrides(arg1) ? arg1 : isConfigurationOverrides(arg2) ? arg2 : {};
    return this._configuration.getValue(section, overrides, void 0);
  }
  updateValues(values) {
    const previous = { data: this._configuration.toData() };
    const changedKeys = [];
    for (const entry of values) {
      const [key, value] = entry;
      if (this.getValue(key) === value) {
        continue;
      }
      this._configuration.updateValue(key, value);
      changedKeys.push(key);
    }
    if (changedKeys.length > 0) {
      const configurationChangeEvent = new ConfigurationChangeEvent({ keys: changedKeys, overrides: [] }, previous, this._configuration);
      configurationChangeEvent.source = 8;
      configurationChangeEvent.sourceConfig = null;
      this._onDidChangeConfiguration.fire(configurationChangeEvent);
    }
    return Promise.resolve();
  }
  updateValue(key, value, arg3, arg4) {
    return this.updateValues([[key, value]]);
  }
  inspect(key, options = {}) {
    return this._configuration.inspect(key, options, void 0);
  }
};
var StandaloneResourceConfigurationService = class StandaloneResourceConfigurationService2 {
  constructor(configurationService) {
    this.configurationService = configurationService;
    this._onDidChangeConfiguration = new Emitter();
    this.configurationService.onDidChangeConfiguration((e) => {
      this._onDidChangeConfiguration.fire({ affectedKeys: e.affectedKeys, affectsConfiguration: (resource, configuration) => e.affectsConfiguration(configuration) });
    });
  }
  getValue(resource, arg2, arg3) {
    const position = Position.isIPosition(arg2) ? arg2 : null;
    const section = position ? typeof arg3 === "string" ? arg3 : void 0 : typeof arg2 === "string" ? arg2 : void 0;
    if (typeof section === "undefined") {
      return this.configurationService.getValue();
    }
    return this.configurationService.getValue(section);
  }
};
StandaloneResourceConfigurationService = __decorate19([
  __param18(0, IConfigurationService)
], StandaloneResourceConfigurationService);
var StandaloneResourcePropertiesService = class StandaloneResourcePropertiesService2 {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }
  getEOL(resource, language) {
    const eol = this.configurationService.getValue("files.eol", { overrideIdentifier: language, resource });
    if (eol && typeof eol === "string" && eol !== "auto") {
      return eol;
    }
    return isLinux || isMacintosh ? "\n" : "\r\n";
  }
};
StandaloneResourcePropertiesService = __decorate19([
  __param18(0, IConfigurationService)
], StandaloneResourcePropertiesService);
var StandaloneTelemetryService = class {
  publicLog(eventName, data) {
    return Promise.resolve(void 0);
  }
  publicLog2(eventName, data) {
    return this.publicLog(eventName, data);
  }
};
var StandaloneWorkspaceContextService = class {
  constructor() {
    const resource = URI.from({ scheme: StandaloneWorkspaceContextService.SCHEME, authority: "model", path: "/" });
    this.workspace = { id: "4064f6ec-cb38-4ad0-af64-ee6467e63c82", folders: [new WorkspaceFolder({ uri: resource, name: "", index: 0 })] };
  }
  getWorkspace() {
    return this.workspace;
  }
  getWorkspaceFolder(resource) {
    return resource && resource.scheme === StandaloneWorkspaceContextService.SCHEME ? this.workspace.folders[0] : null;
  }
};
StandaloneWorkspaceContextService.SCHEME = "inmemory";
function updateConfigurationService(configurationService, source, isDiffEditor) {
  if (!source) {
    return;
  }
  if (!(configurationService instanceof StandaloneConfigurationService)) {
    return;
  }
  const toUpdate = [];
  Object.keys(source).forEach((key) => {
    if (isEditorConfigurationKey(key)) {
      toUpdate.push([`editor.${key}`, source[key]]);
    }
    if (isDiffEditor && isDiffEditorConfigurationKey(key)) {
      toUpdate.push([`diffEditor.${key}`, source[key]]);
    }
  });
  if (toUpdate.length > 0) {
    configurationService.updateValues(toUpdate);
  }
}
var StandaloneBulkEditService = class StandaloneBulkEditService2 {
  constructor(_modelService) {
    this._modelService = _modelService;
  }
  hasPreviewHandler() {
    return false;
  }
  apply(edits, _options) {
    return __awaiter12(this, void 0, void 0, function* () {
      const textEdits = /* @__PURE__ */ new Map();
      for (const edit of edits) {
        if (!(edit instanceof ResourceTextEdit)) {
          throw new Error("bad edit - only text edits are supported");
        }
        const model = this._modelService.getModel(edit.resource);
        if (!model) {
          throw new Error("bad edit - model not found");
        }
        if (typeof edit.versionId === "number" && model.getVersionId() !== edit.versionId) {
          throw new Error("bad state - model changed in the meantime");
        }
        let array = textEdits.get(model);
        if (!array) {
          array = [];
          textEdits.set(model, array);
        }
        array.push(EditOperation.replaceMove(Range.lift(edit.textEdit.range), edit.textEdit.text));
      }
      let totalEdits = 0;
      let totalFiles = 0;
      for (const [model, edits2] of textEdits) {
        model.pushStackElement();
        model.pushEditOperations([], edits2, () => []);
        model.pushStackElement();
        totalFiles += 1;
        totalEdits += edits2.length;
      }
      return {
        ariaSummary: format(StandaloneServicesNLS.bulkEditServiceSummary, totalEdits, totalFiles)
      };
    });
  }
};
StandaloneBulkEditService = __decorate19([
  __param18(0, IModelService)
], StandaloneBulkEditService);
var StandaloneUriLabelService = class {
  getUriLabel(resource, options) {
    if (resource.scheme === "file") {
      return resource.fsPath;
    }
    return resource.path;
  }
  getUriBasenameLabel(resource) {
    return basename2(resource);
  }
};
var StandaloneContextViewService = class StandaloneContextViewService2 extends ContextViewService {
  constructor(layoutService, _codeEditorService) {
    super(layoutService);
    this._codeEditorService = _codeEditorService;
  }
  showContextView(delegate, container, shadowRoot) {
    if (!container) {
      const codeEditor = this._codeEditorService.getFocusedCodeEditor() || this._codeEditorService.getActiveCodeEditor();
      if (codeEditor) {
        container = codeEditor.getContainerDomNode();
      }
    }
    return super.showContextView(delegate, container, shadowRoot);
  }
};
StandaloneContextViewService = __decorate19([
  __param18(0, ILayoutService),
  __param18(1, ICodeEditorService)
], StandaloneContextViewService);
var StandaloneWorkspaceTrustManagementService = class {
  constructor() {
    this._neverEmitter = new Emitter();
    this.onDidChangeTrust = this._neverEmitter.event;
  }
  isWorkspaceTrusted() {
    return true;
  }
};
var StandaloneLanguageService = class extends LanguageService {
  constructor() {
    super();
  }
};
var StandaloneLogService = class extends LogService {
  constructor() {
    super(new ConsoleLogger());
  }
};
var StandaloneContextMenuService = class StandaloneContextMenuService2 extends ContextMenuService {
  constructor(telemetryService, notificationService, contextViewService, keybindingService, themeService) {
    super(telemetryService, notificationService, contextViewService, keybindingService, themeService);
    this.configure({ blockMouse: false });
  }
};
StandaloneContextMenuService = __decorate19([
  __param18(0, ITelemetryService),
  __param18(1, INotificationService),
  __param18(2, IContextViewService),
  __param18(3, IKeybindingService),
  __param18(4, IThemeService)
], StandaloneContextMenuService);
registerSingleton(IConfigurationService, StandaloneConfigurationService);
registerSingleton(ITextResourceConfigurationService, StandaloneResourceConfigurationService);
registerSingleton(ITextResourcePropertiesService, StandaloneResourcePropertiesService);
registerSingleton(IWorkspaceContextService, StandaloneWorkspaceContextService);
registerSingleton(ILabelService, StandaloneUriLabelService);
registerSingleton(ITelemetryService, StandaloneTelemetryService);
registerSingleton(IDialogService, StandaloneDialogService);
registerSingleton(INotificationService, StandaloneNotificationService);
registerSingleton(IMarkerService, MarkerService);
registerSingleton(ILanguageService, StandaloneLanguageService);
registerSingleton(IStandaloneThemeService, StandaloneThemeService);
registerSingleton(ILogService, StandaloneLogService);
registerSingleton(IModelService, ModelService);
registerSingleton(IMarkerDecorationsService, MarkerDecorationsService);
registerSingleton(IContextKeyService, ContextKeyService);
registerSingleton(IProgressService, StandaloneProgressService);
registerSingleton(IEditorProgressService, StandaloneEditorProgressService);
registerSingleton(IStorageService, InMemoryStorageService);
registerSingleton(IEditorWorkerService, EditorWorkerService);
registerSingleton(IBulkEditService, StandaloneBulkEditService);
registerSingleton(IWorkspaceTrustManagementService, StandaloneWorkspaceTrustManagementService);
registerSingleton(ITextModelService, StandaloneTextModelService);
registerSingleton(IAccessibilityService, AccessibilityService);
registerSingleton(IListService, ListService);
registerSingleton(ICommandService, StandaloneCommandService);
registerSingleton(IKeybindingService, StandaloneKeybindingService);
registerSingleton(IQuickInputService, StandaloneQuickInputService);
registerSingleton(IContextViewService, StandaloneContextViewService);
registerSingleton(IOpenerService, OpenerService);
registerSingleton(IClipboardService, BrowserClipboardService);
registerSingleton(IContextMenuService, StandaloneContextMenuService);
registerSingleton(IMenuService, MenuService);
var StandaloneServices;
(function(StandaloneServices2) {
  const serviceCollection = new ServiceCollection();
  for (const [id, descriptor] of getSingletonServiceDescriptors()) {
    serviceCollection.set(id, descriptor);
  }
  const instantiationService = new InstantiationService(serviceCollection, true);
  serviceCollection.set(IInstantiationService, instantiationService);
  function get(serviceId) {
    const r = serviceCollection.get(serviceId);
    if (!r) {
      throw new Error("Missing service " + serviceId);
    }
    if (r instanceof SyncDescriptor) {
      return instantiationService.invokeFunction((accessor) => accessor.get(serviceId));
    } else {
      return r;
    }
  }
  StandaloneServices2.get = get;
  let initialized = false;
  function initialize(overrides) {
    if (initialized) {
      return instantiationService;
    }
    initialized = true;
    for (const [id, descriptor] of getSingletonServiceDescriptors()) {
      if (!serviceCollection.get(id)) {
        serviceCollection.set(id, descriptor);
      }
    }
    for (const serviceId in overrides) {
      if (overrides.hasOwnProperty(serviceId)) {
        const serviceIdentifier = createDecorator(serviceId);
        const r = serviceCollection.get(serviceIdentifier);
        if (r instanceof SyncDescriptor) {
          serviceCollection.set(serviceIdentifier, overrides[serviceId]);
        }
      }
    }
    return instantiationService;
  }
  StandaloneServices2.initialize = initialize;
})(StandaloneServices || (StandaloneServices = {}));

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeEditor.js
init_actions2();
init_commands();
init_configuration();
init_contextkey();
init_instantiation();
init_themeService();
init_progress();
init_model2();
init_language();
init_modesRegistry();
init_languageConfigurationRegistry();
init_languageFeatures();
var __decorate20 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param19 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var LAST_GENERATED_COMMAND_ID = 0;
var ariaDomNodeCreated = false;
function createAriaDomNode(parent) {
  if (!parent) {
    if (ariaDomNodeCreated) {
      return;
    }
    ariaDomNodeCreated = true;
  }
  setARIAContainer(parent || document.body);
}
var StandaloneCodeEditor = class StandaloneCodeEditor2 extends CodeEditorWidget {
  constructor(domElement, _options, instantiationService, codeEditorService, commandService, contextKeyService, keybindingService, themeService, notificationService, accessibilityService, languageConfigurationService, languageFeaturesService) {
    const options = Object.assign({}, _options);
    options.ariaLabel = options.ariaLabel || StandaloneCodeEditorNLS.editorViewAccessibleLabel;
    options.ariaLabel = options.ariaLabel + ";" + StandaloneCodeEditorNLS.accessibilityHelpMessage;
    super(domElement, options, {}, instantiationService, codeEditorService, commandService, contextKeyService, themeService, notificationService, accessibilityService, languageConfigurationService, languageFeaturesService);
    if (keybindingService instanceof StandaloneKeybindingService) {
      this._standaloneKeybindingService = keybindingService;
    } else {
      this._standaloneKeybindingService = null;
    }
    createAriaDomNode(options.ariaContainerElement);
  }
  addCommand(keybinding, handler, context) {
    if (!this._standaloneKeybindingService) {
      console.warn("Cannot add command because the editor is configured with an unrecognized KeybindingService");
      return null;
    }
    const commandId = "DYNAMIC_" + ++LAST_GENERATED_COMMAND_ID;
    const whenExpression = ContextKeyExpr.deserialize(context);
    this._standaloneKeybindingService.addDynamicKeybinding(commandId, keybinding, handler, whenExpression);
    return commandId;
  }
  createContextKey(key, defaultValue) {
    return this._contextKeyService.createKey(key, defaultValue);
  }
  addAction(_descriptor) {
    if (typeof _descriptor.id !== "string" || typeof _descriptor.label !== "string" || typeof _descriptor.run !== "function") {
      throw new Error("Invalid action descriptor, `id`, `label` and `run` are required properties!");
    }
    if (!this._standaloneKeybindingService) {
      console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService");
      return Disposable.None;
    }
    const id = _descriptor.id;
    const label = _descriptor.label;
    const precondition = ContextKeyExpr.and(ContextKeyExpr.equals("editorId", this.getId()), ContextKeyExpr.deserialize(_descriptor.precondition));
    const keybindings = _descriptor.keybindings;
    const keybindingsWhen = ContextKeyExpr.and(precondition, ContextKeyExpr.deserialize(_descriptor.keybindingContext));
    const contextMenuGroupId = _descriptor.contextMenuGroupId || null;
    const contextMenuOrder = _descriptor.contextMenuOrder || 0;
    const run = (accessor, ...args) => {
      return Promise.resolve(_descriptor.run(this, ...args));
    };
    const toDispose = new DisposableStore();
    const uniqueId = this.getId() + ":" + id;
    toDispose.add(CommandsRegistry.registerCommand(uniqueId, run));
    if (contextMenuGroupId) {
      const menuItem = {
        command: {
          id: uniqueId,
          title: label
        },
        when: precondition,
        group: contextMenuGroupId,
        order: contextMenuOrder
      };
      toDispose.add(MenuRegistry.appendMenuItem(MenuId.EditorContext, menuItem));
    }
    if (Array.isArray(keybindings)) {
      for (const kb of keybindings) {
        toDispose.add(this._standaloneKeybindingService.addDynamicKeybinding(uniqueId, kb, run, keybindingsWhen));
      }
    }
    const internalAction = new InternalEditorAction(uniqueId, label, label, precondition, run, this._contextKeyService);
    this._actions[id] = internalAction;
    toDispose.add(toDisposable(() => {
      delete this._actions[id];
    }));
    return toDispose;
  }
  _triggerCommand(handlerId, payload) {
    if (this._codeEditorService instanceof StandaloneCodeEditorService) {
      try {
        this._codeEditorService.setActiveCodeEditor(this);
        super._triggerCommand(handlerId, payload);
      } finally {
        this._codeEditorService.setActiveCodeEditor(null);
      }
    } else {
      super._triggerCommand(handlerId, payload);
    }
  }
};
StandaloneCodeEditor = __decorate20([
  __param19(2, IInstantiationService),
  __param19(3, ICodeEditorService),
  __param19(4, ICommandService),
  __param19(5, IContextKeyService),
  __param19(6, IKeybindingService),
  __param19(7, IThemeService),
  __param19(8, INotificationService),
  __param19(9, IAccessibilityService),
  __param19(10, ILanguageConfigurationService),
  __param19(11, ILanguageFeaturesService)
], StandaloneCodeEditor);
var StandaloneEditor = class StandaloneEditor2 extends StandaloneCodeEditor {
  constructor(domElement, _options, instantiationService, codeEditorService, commandService, contextKeyService, keybindingService, themeService, notificationService, configurationService, accessibilityService, modelService, languageService, languageConfigurationService, languageFeaturesService) {
    const options = Object.assign({}, _options);
    updateConfigurationService(configurationService, options, false);
    const themeDomRegistration = themeService.registerEditorContainer(domElement);
    if (typeof options.theme === "string") {
      themeService.setTheme(options.theme);
    }
    if (typeof options.autoDetectHighContrast !== "undefined") {
      themeService.setAutoDetectHighContrast(Boolean(options.autoDetectHighContrast));
    }
    const _model = options.model;
    delete options.model;
    super(domElement, options, instantiationService, codeEditorService, commandService, contextKeyService, keybindingService, themeService, notificationService, accessibilityService, languageConfigurationService, languageFeaturesService);
    this._configurationService = configurationService;
    this._standaloneThemeService = themeService;
    this._register(themeDomRegistration);
    let model;
    if (typeof _model === "undefined") {
      const languageId = languageService.getLanguageIdByMimeType(options.language) || options.language || PLAINTEXT_LANGUAGE_ID;
      model = createTextModel(modelService, languageService, options.value || "", languageId, void 0);
      this._ownsModel = true;
    } else {
      model = _model;
      this._ownsModel = false;
    }
    this._attachModel(model);
    if (model) {
      const e = {
        oldModelUrl: null,
        newModelUrl: model.uri
      };
      this._onDidChangeModel.fire(e);
    }
  }
  dispose() {
    super.dispose();
  }
  updateOptions(newOptions) {
    updateConfigurationService(this._configurationService, newOptions, false);
    if (typeof newOptions.theme === "string") {
      this._standaloneThemeService.setTheme(newOptions.theme);
    }
    if (typeof newOptions.autoDetectHighContrast !== "undefined") {
      this._standaloneThemeService.setAutoDetectHighContrast(Boolean(newOptions.autoDetectHighContrast));
    }
    super.updateOptions(newOptions);
  }
  _postDetachModelCleanup(detachedModel) {
    super._postDetachModelCleanup(detachedModel);
    if (detachedModel && this._ownsModel) {
      detachedModel.dispose();
      this._ownsModel = false;
    }
  }
};
StandaloneEditor = __decorate20([
  __param19(2, IInstantiationService),
  __param19(3, ICodeEditorService),
  __param19(4, ICommandService),
  __param19(5, IContextKeyService),
  __param19(6, IKeybindingService),
  __param19(7, IStandaloneThemeService),
  __param19(8, INotificationService),
  __param19(9, IConfigurationService),
  __param19(10, IAccessibilityService),
  __param19(11, IModelService),
  __param19(12, ILanguageService),
  __param19(13, ILanguageConfigurationService),
  __param19(14, ILanguageFeaturesService)
], StandaloneEditor);
var StandaloneDiffEditor = class StandaloneDiffEditor2 extends DiffEditorWidget {
  constructor(domElement, _options, instantiationService, contextKeyService, editorWorkerService, codeEditorService, themeService, notificationService, configurationService, contextMenuService, editorProgressService, clipboardService) {
    const options = Object.assign({}, _options);
    updateConfigurationService(configurationService, options, true);
    const themeDomRegistration = themeService.registerEditorContainer(domElement);
    if (typeof options.theme === "string") {
      themeService.setTheme(options.theme);
    }
    if (typeof options.autoDetectHighContrast !== "undefined") {
      themeService.setAutoDetectHighContrast(Boolean(options.autoDetectHighContrast));
    }
    super(domElement, options, {}, clipboardService, editorWorkerService, contextKeyService, instantiationService, codeEditorService, themeService, notificationService, contextMenuService, editorProgressService);
    this._configurationService = configurationService;
    this._standaloneThemeService = themeService;
    this._register(themeDomRegistration);
  }
  dispose() {
    super.dispose();
  }
  updateOptions(newOptions) {
    updateConfigurationService(this._configurationService, newOptions, true);
    if (typeof newOptions.theme === "string") {
      this._standaloneThemeService.setTheme(newOptions.theme);
    }
    if (typeof newOptions.autoDetectHighContrast !== "undefined") {
      this._standaloneThemeService.setAutoDetectHighContrast(Boolean(newOptions.autoDetectHighContrast));
    }
    super.updateOptions(newOptions);
  }
  _createInnerEditor(instantiationService, container, options) {
    return instantiationService.createInstance(StandaloneCodeEditor, container, options);
  }
  getOriginalEditor() {
    return super.getOriginalEditor();
  }
  getModifiedEditor() {
    return super.getModifiedEditor();
  }
  addCommand(keybinding, handler, context) {
    return this.getModifiedEditor().addCommand(keybinding, handler, context);
  }
  createContextKey(key, defaultValue) {
    return this.getModifiedEditor().createContextKey(key, defaultValue);
  }
  addAction(descriptor) {
    return this.getModifiedEditor().addAction(descriptor);
  }
};
StandaloneDiffEditor = __decorate20([
  __param19(2, IInstantiationService),
  __param19(3, IContextKeyService),
  __param19(4, IEditorWorkerService),
  __param19(5, ICodeEditorService),
  __param19(6, IStandaloneThemeService),
  __param19(7, INotificationService),
  __param19(8, IConfigurationService),
  __param19(9, IContextMenuService),
  __param19(10, IEditorProgressService),
  __param19(11, IClipboardService)
], StandaloneDiffEditor);
function createTextModel(modelService, languageService, value, languageId, uri) {
  value = value || "";
  if (!languageId) {
    const firstLF = value.indexOf("\n");
    let firstLine = value;
    if (firstLF !== -1) {
      firstLine = value.substring(0, firstLF);
    }
    return doCreateModel(modelService, value, languageService.createByFilepathOrFirstLine(uri || null, firstLine), uri);
  }
  return doCreateModel(modelService, value, languageService.createById(languageId), uri);
}
function doCreateModel(modelService, value, languageSelection, uri) {
  return modelService.createModel(value, languageSelection, uri);
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneEditor.js
init_commands();
function create(domElement, options, override) {
  const instantiationService = StandaloneServices.initialize(override || {});
  return instantiationService.createInstance(StandaloneEditor, domElement, options);
}
function onDidCreateEditor(listener) {
  const codeEditorService = StandaloneServices.get(ICodeEditorService);
  return codeEditorService.onCodeEditorAdd((editor2) => {
    listener(editor2);
  });
}
function onDidCreateDiffEditor(listener) {
  const codeEditorService = StandaloneServices.get(ICodeEditorService);
  return codeEditorService.onDiffEditorAdd((editor2) => {
    listener(editor2);
  });
}
function getEditors() {
  const codeEditorService = StandaloneServices.get(ICodeEditorService);
  return codeEditorService.listCodeEditors();
}
function getDiffEditors() {
  const codeEditorService = StandaloneServices.get(ICodeEditorService);
  return codeEditorService.listDiffEditors();
}
function createDiffEditor(domElement, options, override) {
  const instantiationService = StandaloneServices.initialize(override || {});
  return instantiationService.createInstance(StandaloneDiffEditor, domElement, options);
}
function createDiffNavigator(diffEditor, opts) {
  return new DiffNavigator(diffEditor, opts);
}
function createModel(value, language, uri) {
  const languageService = StandaloneServices.get(ILanguageService);
  const languageId = languageService.getLanguageIdByMimeType(language) || language;
  return createTextModel(StandaloneServices.get(IModelService), languageService, value, languageId, uri);
}
function setModelLanguage(model, languageId) {
  const languageService = StandaloneServices.get(ILanguageService);
  const modelService = StandaloneServices.get(IModelService);
  modelService.setMode(model, languageService.createById(languageId));
}
function setModelMarkers(model, owner, markers) {
  if (model) {
    const markerService = StandaloneServices.get(IMarkerService);
    markerService.changeOne(owner, model.uri, markers);
  }
}
function removeAllMarkers(owner) {
  const markerService = StandaloneServices.get(IMarkerService);
  markerService.changeAll(owner, []);
}
function getModelMarkers(filter) {
  const markerService = StandaloneServices.get(IMarkerService);
  return markerService.read(filter);
}
function onDidChangeMarkers(listener) {
  const markerService = StandaloneServices.get(IMarkerService);
  return markerService.onMarkerChanged(listener);
}
function getModel(uri) {
  const modelService = StandaloneServices.get(IModelService);
  return modelService.getModel(uri);
}
function getModels() {
  const modelService = StandaloneServices.get(IModelService);
  return modelService.getModels();
}
function onDidCreateModel(listener) {
  const modelService = StandaloneServices.get(IModelService);
  return modelService.onModelAdded(listener);
}
function onWillDisposeModel(listener) {
  const modelService = StandaloneServices.get(IModelService);
  return modelService.onModelRemoved(listener);
}
function onDidChangeModelLanguage(listener) {
  const modelService = StandaloneServices.get(IModelService);
  return modelService.onModelLanguageChanged((e) => {
    listener({
      model: e.model,
      oldLanguage: e.oldLanguageId
    });
  });
}
function createWebWorker2(opts) {
  return createWebWorker(StandaloneServices.get(IModelService), StandaloneServices.get(ILanguageConfigurationService), opts);
}
function colorizeElement(domNode, options) {
  const languageService = StandaloneServices.get(ILanguageService);
  const themeService = StandaloneServices.get(IStandaloneThemeService);
  themeService.registerEditorContainer(domNode);
  return Colorizer.colorizeElement(themeService, languageService, domNode, options);
}
function colorize(text, languageId, options) {
  const languageService = StandaloneServices.get(ILanguageService);
  const themeService = StandaloneServices.get(IStandaloneThemeService);
  themeService.registerEditorContainer(document.body);
  return Colorizer.colorize(languageService, text, languageId, options);
}
function colorizeModelLine(model, lineNumber, tabSize = 4) {
  const themeService = StandaloneServices.get(IStandaloneThemeService);
  themeService.registerEditorContainer(document.body);
  return Colorizer.colorizeModelLine(model, lineNumber, tabSize);
}
function getSafeTokenizationSupport(language) {
  const tokenizationSupport = TokenizationRegistry.get(language);
  if (tokenizationSupport) {
    return tokenizationSupport;
  }
  return {
    getInitialState: () => NullState,
    tokenize: (line, hasEOL, state) => nullTokenize(language, state)
  };
}
function tokenize(text, languageId) {
  TokenizationRegistry.getOrCreate(languageId);
  const tokenizationSupport = getSafeTokenizationSupport(languageId);
  const lines = splitLines(text);
  const result = [];
  let state = tokenizationSupport.getInitialState();
  for (let i = 0, len = lines.length; i < len; i++) {
    const line = lines[i];
    const tokenizationResult = tokenizationSupport.tokenize(line, true, state);
    result[i] = tokenizationResult.tokens;
    state = tokenizationResult.endState;
  }
  return result;
}
function defineTheme(themeName, themeData) {
  const standaloneThemeService = StandaloneServices.get(IStandaloneThemeService);
  standaloneThemeService.defineTheme(themeName, themeData);
}
function setTheme(themeName) {
  const standaloneThemeService = StandaloneServices.get(IStandaloneThemeService);
  standaloneThemeService.setTheme(themeName);
}
function remeasureFonts() {
  FontMeasurements.clearAllFontInfos();
}
function registerCommand(id, handler) {
  return CommandsRegistry.registerCommand({ id, handler });
}
function createMonacoEditorAPI() {
  return {
    create,
    getEditors,
    getDiffEditors,
    onDidCreateEditor,
    onDidCreateDiffEditor,
    createDiffEditor,
    createDiffNavigator,
    createModel,
    setModelLanguage,
    setModelMarkers,
    getModelMarkers,
    removeAllMarkers,
    onDidChangeMarkers,
    getModels,
    getModel,
    onDidCreateModel,
    onWillDisposeModel,
    onDidChangeModelLanguage,
    createWebWorker: createWebWorker2,
    colorizeElement,
    colorize,
    colorizeModelLine,
    tokenize,
    defineTheme,
    setTheme,
    remeasureFonts,
    registerCommand,
    AccessibilitySupport,
    ContentWidgetPositionPreference,
    CursorChangeReason,
    DefaultEndOfLine,
    EditorAutoIndentStrategy,
    EditorOption,
    EndOfLinePreference,
    EndOfLineSequence,
    MinimapPosition,
    MouseTargetType,
    OverlayWidgetPositionPreference,
    OverviewRulerLane,
    RenderLineNumbersType,
    RenderMinimap,
    ScrollbarVisibility,
    ScrollType,
    TextEditorCursorBlinkingStyle,
    TextEditorCursorStyle,
    TrackedRangeStickiness,
    WrappingIndent,
    InjectedTextCursorStops,
    PositionAffinity,
    ConfigurationChangedEvent,
    BareFontInfo,
    FontInfo,
    TextModelResolvedOptions,
    FindMatch,
    ApplyUpdateResult,
    EditorType,
    EditorOptions
  };
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneLanguages.js
init_define_process();
init_color();
init_range();
init_languages();
init_languageConfigurationRegistry();
init_modesRegistry();
init_language();

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/common/monarch/monarchCompile.js
init_define_process();
function isArrayOf(elemType, obj) {
  if (!obj) {
    return false;
  }
  if (!Array.isArray(obj)) {
    return false;
  }
  for (const el of obj) {
    if (!elemType(el)) {
      return false;
    }
  }
  return true;
}
function bool(prop, defValue) {
  if (typeof prop === "boolean") {
    return prop;
  }
  return defValue;
}
function string(prop, defValue) {
  if (typeof prop === "string") {
    return prop;
  }
  return defValue;
}
function arrayToHash(array) {
  const result = {};
  for (const e of array) {
    result[e] = true;
  }
  return result;
}
function createKeywordMatcher(arr, caseInsensitive = false) {
  if (caseInsensitive) {
    arr = arr.map(function(x) {
      return x.toLowerCase();
    });
  }
  const hash = arrayToHash(arr);
  if (caseInsensitive) {
    return function(word) {
      return hash[word.toLowerCase()] !== void 0 && hash.hasOwnProperty(word.toLowerCase());
    };
  } else {
    return function(word) {
      return hash[word] !== void 0 && hash.hasOwnProperty(word);
    };
  }
}
function compileRegExp(lexer, str) {
  str = str.replace(/@@/g, ``);
  let n = 0;
  let hadExpansion;
  do {
    hadExpansion = false;
    str = str.replace(/@(\w+)/g, function(s, attr) {
      hadExpansion = true;
      let sub = "";
      if (typeof lexer[attr] === "string") {
        sub = lexer[attr];
      } else if (lexer[attr] && lexer[attr] instanceof RegExp) {
        sub = lexer[attr].source;
      } else {
        if (lexer[attr] === void 0) {
          throw createError(lexer, "language definition does not contain attribute '" + attr + "', used at: " + str);
        } else {
          throw createError(lexer, "attribute reference '" + attr + "' must be a string, used at: " + str);
        }
      }
      return empty(sub) ? "" : "(?:" + sub + ")";
    });
    n++;
  } while (hadExpansion && n < 5);
  str = str.replace(/\x01/g, "@");
  const flags = (lexer.ignoreCase ? "i" : "") + (lexer.unicode ? "u" : "");
  return new RegExp(str, flags);
}
function selectScrutinee(id, matches, state, num) {
  if (num < 0) {
    return id;
  }
  if (num < matches.length) {
    return matches[num];
  }
  if (num >= 100) {
    num = num - 100;
    const parts = state.split(".");
    parts.unshift(state);
    if (num < parts.length) {
      return parts[num];
    }
  }
  return null;
}
function createGuard(lexer, ruleName, tkey, val) {
  let scrut = -1;
  let oppat = tkey;
  let matches = tkey.match(/^\$(([sS]?)(\d\d?)|#)(.*)$/);
  if (matches) {
    if (matches[3]) {
      scrut = parseInt(matches[3]);
      if (matches[2]) {
        scrut = scrut + 100;
      }
    }
    oppat = matches[4];
  }
  let op = "~";
  let pat = oppat;
  if (!oppat || oppat.length === 0) {
    op = "!=";
    pat = "";
  } else if (/^\w*$/.test(pat)) {
    op = "==";
  } else {
    matches = oppat.match(/^(@|!@|~|!~|==|!=)(.*)$/);
    if (matches) {
      op = matches[1];
      pat = matches[2];
    }
  }
  let tester;
  if ((op === "~" || op === "!~") && /^(\w|\|)*$/.test(pat)) {
    const inWords = createKeywordMatcher(pat.split("|"), lexer.ignoreCase);
    tester = function(s) {
      return op === "~" ? inWords(s) : !inWords(s);
    };
  } else if (op === "@" || op === "!@") {
    const words = lexer[pat];
    if (!words) {
      throw createError(lexer, "the @ match target '" + pat + "' is not defined, in rule: " + ruleName);
    }
    if (!isArrayOf(function(elem) {
      return typeof elem === "string";
    }, words)) {
      throw createError(lexer, "the @ match target '" + pat + "' must be an array of strings, in rule: " + ruleName);
    }
    const inWords = createKeywordMatcher(words, lexer.ignoreCase);
    tester = function(s) {
      return op === "@" ? inWords(s) : !inWords(s);
    };
  } else if (op === "~" || op === "!~") {
    if (pat.indexOf("$") < 0) {
      const re = compileRegExp(lexer, "^" + pat + "$");
      tester = function(s) {
        return op === "~" ? re.test(s) : !re.test(s);
      };
    } else {
      tester = function(s, id, matches2, state) {
        const re = compileRegExp(lexer, "^" + substituteMatches(lexer, pat, id, matches2, state) + "$");
        return re.test(s);
      };
    }
  } else {
    if (pat.indexOf("$") < 0) {
      const patx = fixCase(lexer, pat);
      tester = function(s) {
        return op === "==" ? s === patx : s !== patx;
      };
    } else {
      const patx = fixCase(lexer, pat);
      tester = function(s, id, matches2, state, eos) {
        const patexp = substituteMatches(lexer, patx, id, matches2, state);
        return op === "==" ? s === patexp : s !== patexp;
      };
    }
  }
  if (scrut === -1) {
    return {
      name: tkey,
      value: val,
      test: function(id, matches2, state, eos) {
        return tester(id, id, matches2, state, eos);
      }
    };
  } else {
    return {
      name: tkey,
      value: val,
      test: function(id, matches2, state, eos) {
        const scrutinee = selectScrutinee(id, matches2, state, scrut);
        return tester(!scrutinee ? "" : scrutinee, id, matches2, state, eos);
      }
    };
  }
}
function compileAction(lexer, ruleName, action) {
  if (!action) {
    return { token: "" };
  } else if (typeof action === "string") {
    return action;
  } else if (action.token || action.token === "") {
    if (typeof action.token !== "string") {
      throw createError(lexer, "a 'token' attribute must be of type string, in rule: " + ruleName);
    } else {
      const newAction = { token: action.token };
      if (action.token.indexOf("$") >= 0) {
        newAction.tokenSubst = true;
      }
      if (typeof action.bracket === "string") {
        if (action.bracket === "@open") {
          newAction.bracket = 1;
        } else if (action.bracket === "@close") {
          newAction.bracket = -1;
        } else {
          throw createError(lexer, "a 'bracket' attribute must be either '@open' or '@close', in rule: " + ruleName);
        }
      }
      if (action.next) {
        if (typeof action.next !== "string") {
          throw createError(lexer, "the next state must be a string value in rule: " + ruleName);
        } else {
          let next = action.next;
          if (!/^(@pop|@push|@popall)$/.test(next)) {
            if (next[0] === "@") {
              next = next.substr(1);
            }
            if (next.indexOf("$") < 0) {
              if (!stateExists(lexer, substituteMatches(lexer, next, "", [], ""))) {
                throw createError(lexer, "the next state '" + action.next + "' is not defined in rule: " + ruleName);
              }
            }
          }
          newAction.next = next;
        }
      }
      if (typeof action.goBack === "number") {
        newAction.goBack = action.goBack;
      }
      if (typeof action.switchTo === "string") {
        newAction.switchTo = action.switchTo;
      }
      if (typeof action.log === "string") {
        newAction.log = action.log;
      }
      if (typeof action.nextEmbedded === "string") {
        newAction.nextEmbedded = action.nextEmbedded;
        lexer.usesEmbedded = true;
      }
      return newAction;
    }
  } else if (Array.isArray(action)) {
    const results = [];
    for (let i = 0, len = action.length; i < len; i++) {
      results[i] = compileAction(lexer, ruleName, action[i]);
    }
    return { group: results };
  } else if (action.cases) {
    const cases = [];
    for (const tkey in action.cases) {
      if (action.cases.hasOwnProperty(tkey)) {
        const val = compileAction(lexer, ruleName, action.cases[tkey]);
        if (tkey === "@default" || tkey === "@" || tkey === "") {
          cases.push({ test: void 0, value: val, name: tkey });
        } else if (tkey === "@eos") {
          cases.push({ test: function(id, matches, state, eos) {
            return eos;
          }, value: val, name: tkey });
        } else {
          cases.push(createGuard(lexer, ruleName, tkey, val));
        }
      }
    }
    const def = lexer.defaultToken;
    return {
      test: function(id, matches, state, eos) {
        for (const _case of cases) {
          const didmatch = !_case.test || _case.test(id, matches, state, eos);
          if (didmatch) {
            return _case.value;
          }
        }
        return def;
      }
    };
  } else {
    throw createError(lexer, "an action must be a string, an object with a 'token' or 'cases' attribute, or an array of actions; in rule: " + ruleName);
  }
}
var Rule = class {
  constructor(name) {
    this.regex = new RegExp("");
    this.action = { token: "" };
    this.matchOnlyAtLineStart = false;
    this.name = "";
    this.name = name;
  }
  setRegex(lexer, re) {
    let sregex;
    if (typeof re === "string") {
      sregex = re;
    } else if (re instanceof RegExp) {
      sregex = re.source;
    } else {
      throw createError(lexer, "rules must start with a match string or regular expression: " + this.name);
    }
    this.matchOnlyAtLineStart = sregex.length > 0 && sregex[0] === "^";
    this.name = this.name + ": " + sregex;
    this.regex = compileRegExp(lexer, "^(?:" + (this.matchOnlyAtLineStart ? sregex.substr(1) : sregex) + ")");
  }
  setAction(lexer, act) {
    this.action = compileAction(lexer, this.name, act);
  }
};
function compile(languageId, json) {
  if (!json || typeof json !== "object") {
    throw new Error("Monarch: expecting a language definition object");
  }
  const lexer = {};
  lexer.languageId = languageId;
  lexer.includeLF = bool(json.includeLF, false);
  lexer.noThrow = false;
  lexer.maxStack = 100;
  lexer.start = typeof json.start === "string" ? json.start : null;
  lexer.ignoreCase = bool(json.ignoreCase, false);
  lexer.unicode = bool(json.unicode, false);
  lexer.tokenPostfix = string(json.tokenPostfix, "." + lexer.languageId);
  lexer.defaultToken = string(json.defaultToken, "source");
  lexer.usesEmbedded = false;
  const lexerMin = json;
  lexerMin.languageId = languageId;
  lexerMin.includeLF = lexer.includeLF;
  lexerMin.ignoreCase = lexer.ignoreCase;
  lexerMin.unicode = lexer.unicode;
  lexerMin.noThrow = lexer.noThrow;
  lexerMin.usesEmbedded = lexer.usesEmbedded;
  lexerMin.stateNames = json.tokenizer;
  lexerMin.defaultToken = lexer.defaultToken;
  function addRules(state, newrules, rules) {
    for (const rule of rules) {
      let include = rule.include;
      if (include) {
        if (typeof include !== "string") {
          throw createError(lexer, "an 'include' attribute must be a string at: " + state);
        }
        if (include[0] === "@") {
          include = include.substr(1);
        }
        if (!json.tokenizer[include]) {
          throw createError(lexer, "include target '" + include + "' is not defined at: " + state);
        }
        addRules(state + "." + include, newrules, json.tokenizer[include]);
      } else {
        const newrule = new Rule(state);
        if (Array.isArray(rule) && rule.length >= 1 && rule.length <= 3) {
          newrule.setRegex(lexerMin, rule[0]);
          if (rule.length >= 3) {
            if (typeof rule[1] === "string") {
              newrule.setAction(lexerMin, { token: rule[1], next: rule[2] });
            } else if (typeof rule[1] === "object") {
              const rule1 = rule[1];
              rule1.next = rule[2];
              newrule.setAction(lexerMin, rule1);
            } else {
              throw createError(lexer, "a next state as the last element of a rule can only be given if the action is either an object or a string, at: " + state);
            }
          } else {
            newrule.setAction(lexerMin, rule[1]);
          }
        } else {
          if (!rule.regex) {
            throw createError(lexer, "a rule must either be an array, or an object with a 'regex' or 'include' field at: " + state);
          }
          if (rule.name) {
            if (typeof rule.name === "string") {
              newrule.name = rule.name;
            }
          }
          if (rule.matchOnlyAtStart) {
            newrule.matchOnlyAtLineStart = bool(rule.matchOnlyAtLineStart, false);
          }
          newrule.setRegex(lexerMin, rule.regex);
          newrule.setAction(lexerMin, rule.action);
        }
        newrules.push(newrule);
      }
    }
  }
  if (!json.tokenizer || typeof json.tokenizer !== "object") {
    throw createError(lexer, "a language definition must define the 'tokenizer' attribute as an object");
  }
  lexer.tokenizer = [];
  for (const key in json.tokenizer) {
    if (json.tokenizer.hasOwnProperty(key)) {
      if (!lexer.start) {
        lexer.start = key;
      }
      const rules = json.tokenizer[key];
      lexer.tokenizer[key] = new Array();
      addRules("tokenizer." + key, lexer.tokenizer[key], rules);
    }
  }
  lexer.usesEmbedded = lexerMin.usesEmbedded;
  if (json.brackets) {
    if (!Array.isArray(json.brackets)) {
      throw createError(lexer, "the 'brackets' attribute must be defined as an array");
    }
  } else {
    json.brackets = [
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" },
      { open: "<", close: ">", token: "delimiter.angle" }
    ];
  }
  const brackets = [];
  for (const el of json.brackets) {
    let desc = el;
    if (desc && Array.isArray(desc) && desc.length === 3) {
      desc = { token: desc[2], open: desc[0], close: desc[1] };
    }
    if (desc.open === desc.close) {
      throw createError(lexer, "open and close brackets in a 'brackets' attribute must be different: " + desc.open + "\n hint: use the 'bracket' attribute if matching on equal brackets is required.");
    }
    if (typeof desc.open === "string" && typeof desc.token === "string" && typeof desc.close === "string") {
      brackets.push({
        token: desc.token + lexer.tokenPostfix,
        open: fixCase(lexer, desc.open),
        close: fixCase(lexer, desc.close)
      });
    } else {
      throw createError(lexer, "every element in the 'brackets' array must be a '{open,close,token}' object or array");
    }
  }
  lexer.brackets = brackets;
  lexer.noThrow = true;
  return lexer;
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/standalone/browser/standaloneLanguages.js
init_languageFeatures();
init_configuration();
var __awaiter13 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function register(language) {
  ModesRegistry.registerLanguage(language);
}
function getLanguages() {
  let result = [];
  result = result.concat(ModesRegistry.getLanguages());
  return result;
}
function getEncodedLanguageId(languageId) {
  const languageService = StandaloneServices.get(ILanguageService);
  return languageService.languageIdCodec.encodeLanguageId(languageId);
}
function onLanguage(languageId, callback) {
  const languageService = StandaloneServices.get(ILanguageService);
  const disposable = languageService.onDidEncounterLanguage((encounteredLanguageId) => {
    if (encounteredLanguageId === languageId) {
      disposable.dispose();
      callback();
    }
  });
  return disposable;
}
function setLanguageConfiguration(languageId, configuration) {
  const languageService = StandaloneServices.get(ILanguageService);
  if (!languageService.isRegisteredLanguageId(languageId)) {
    throw new Error(`Cannot set configuration for unknown language ${languageId}`);
  }
  const languageConfigurationService = StandaloneServices.get(ILanguageConfigurationService);
  return languageConfigurationService.register(languageId, configuration, 100);
}
var EncodedTokenizationSupportAdapter = class {
  constructor(languageId, actual) {
    this._languageId = languageId;
    this._actual = actual;
  }
  getInitialState() {
    return this._actual.getInitialState();
  }
  tokenize(line, hasEOL, state) {
    if (typeof this._actual.tokenize === "function") {
      return TokenizationSupportAdapter.adaptTokenize(this._languageId, this._actual, line, state);
    }
    throw new Error("Not supported!");
  }
  tokenizeEncoded(line, hasEOL, state) {
    const result = this._actual.tokenizeEncoded(line, state);
    return new EncodedTokenizationResult(result.tokens, result.endState);
  }
};
var TokenizationSupportAdapter = class {
  constructor(_languageId, _actual, _languageService, _standaloneThemeService) {
    this._languageId = _languageId;
    this._actual = _actual;
    this._languageService = _languageService;
    this._standaloneThemeService = _standaloneThemeService;
  }
  getInitialState() {
    return this._actual.getInitialState();
  }
  static _toClassicTokens(tokens, language) {
    const result = [];
    let previousStartIndex = 0;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const t = tokens[i];
      let startIndex = t.startIndex;
      if (i === 0) {
        startIndex = 0;
      } else if (startIndex < previousStartIndex) {
        startIndex = previousStartIndex;
      }
      result[i] = new Token(startIndex, t.scopes, language);
      previousStartIndex = startIndex;
    }
    return result;
  }
  static adaptTokenize(language, actual, line, state) {
    const actualResult = actual.tokenize(line, state);
    const tokens = TokenizationSupportAdapter._toClassicTokens(actualResult.tokens, language);
    let endState;
    if (actualResult.endState.equals(state)) {
      endState = state;
    } else {
      endState = actualResult.endState;
    }
    return new TokenizationResult(tokens, endState);
  }
  tokenize(line, hasEOL, state) {
    return TokenizationSupportAdapter.adaptTokenize(this._languageId, this._actual, line, state);
  }
  _toBinaryTokens(languageIdCodec, tokens) {
    const languageId = languageIdCodec.encodeLanguageId(this._languageId);
    const tokenTheme = this._standaloneThemeService.getColorTheme().tokenTheme;
    const result = [];
    let resultLen = 0;
    let previousStartIndex = 0;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const t = tokens[i];
      const metadata = tokenTheme.match(languageId, t.scopes);
      if (resultLen > 0 && result[resultLen - 1] === metadata) {
        continue;
      }
      let startIndex = t.startIndex;
      if (i === 0) {
        startIndex = 0;
      } else if (startIndex < previousStartIndex) {
        startIndex = previousStartIndex;
      }
      result[resultLen++] = startIndex;
      result[resultLen++] = metadata;
      previousStartIndex = startIndex;
    }
    const actualResult = new Uint32Array(resultLen);
    for (let i = 0; i < resultLen; i++) {
      actualResult[i] = result[i];
    }
    return actualResult;
  }
  tokenizeEncoded(line, hasEOL, state) {
    const actualResult = this._actual.tokenize(line, state);
    const tokens = this._toBinaryTokens(this._languageService.languageIdCodec, actualResult.tokens);
    let endState;
    if (actualResult.endState.equals(state)) {
      endState = state;
    } else {
      endState = actualResult.endState;
    }
    return new EncodedTokenizationResult(tokens, endState);
  }
};
function isATokensProvider(provider) {
  return typeof provider.getInitialState === "function";
}
function isEncodedTokensProvider(provider) {
  return "tokenizeEncoded" in provider;
}
function isThenable2(obj) {
  return obj && typeof obj.then === "function";
}
function setColorMap(colorMap) {
  const standaloneThemeService = StandaloneServices.get(IStandaloneThemeService);
  if (colorMap) {
    const result = [null];
    for (let i = 1, len = colorMap.length; i < len; i++) {
      result[i] = Color.fromHex(colorMap[i]);
    }
    standaloneThemeService.setColorMapOverride(result);
  } else {
    standaloneThemeService.setColorMapOverride(null);
  }
}
function createTokenizationSupportAdapter(languageId, provider) {
  if (isEncodedTokensProvider(provider)) {
    return new EncodedTokenizationSupportAdapter(languageId, provider);
  } else {
    return new TokenizationSupportAdapter(languageId, provider, StandaloneServices.get(ILanguageService), StandaloneServices.get(IStandaloneThemeService));
  }
}
function registerTokensProviderFactory(languageId, factory) {
  const adaptedFactory = {
    createTokenizationSupport: () => __awaiter13(this, void 0, void 0, function* () {
      const result = yield Promise.resolve(factory.create());
      if (!result) {
        return null;
      }
      if (isATokensProvider(result)) {
        return createTokenizationSupportAdapter(languageId, result);
      }
      return new MonarchTokenizer(StandaloneServices.get(ILanguageService), StandaloneServices.get(IStandaloneThemeService), languageId, compile(languageId, result), StandaloneServices.get(IConfigurationService));
    })
  };
  return TokenizationRegistry.registerFactory(languageId, adaptedFactory);
}
function setTokensProvider(languageId, provider) {
  const languageService = StandaloneServices.get(ILanguageService);
  if (!languageService.isRegisteredLanguageId(languageId)) {
    throw new Error(`Cannot set tokens provider for unknown language ${languageId}`);
  }
  if (isThenable2(provider)) {
    return registerTokensProviderFactory(languageId, { create: () => provider });
  }
  return TokenizationRegistry.register(languageId, createTokenizationSupportAdapter(languageId, provider));
}
function setMonarchTokensProvider(languageId, languageDef) {
  const create2 = (languageDef2) => {
    return new MonarchTokenizer(StandaloneServices.get(ILanguageService), StandaloneServices.get(IStandaloneThemeService), languageId, compile(languageId, languageDef2), StandaloneServices.get(IConfigurationService));
  };
  if (isThenable2(languageDef)) {
    return registerTokensProviderFactory(languageId, { create: () => languageDef });
  }
  return TokenizationRegistry.register(languageId, create2(languageDef));
}
function registerReferenceProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.referenceProvider.register(languageSelector, provider);
}
function registerRenameProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.renameProvider.register(languageSelector, provider);
}
function registerSignatureHelpProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.signatureHelpProvider.register(languageSelector, provider);
}
function registerHoverProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.hoverProvider.register(languageSelector, {
    provideHover: (model, position, token) => {
      const word = model.getWordAtPosition(position);
      return Promise.resolve(provider.provideHover(model, position, token)).then((value) => {
        if (!value) {
          return void 0;
        }
        if (!value.range && word) {
          value.range = new Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);
        }
        if (!value.range) {
          value.range = new Range(position.lineNumber, position.column, position.lineNumber, position.column);
        }
        return value;
      });
    }
  });
}
function registerDocumentSymbolProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.documentSymbolProvider.register(languageSelector, provider);
}
function registerDocumentHighlightProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.documentHighlightProvider.register(languageSelector, provider);
}
function registerLinkedEditingRangeProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.linkedEditingRangeProvider.register(languageSelector, provider);
}
function registerDefinitionProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.definitionProvider.register(languageSelector, provider);
}
function registerImplementationProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.implementationProvider.register(languageSelector, provider);
}
function registerTypeDefinitionProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.typeDefinitionProvider.register(languageSelector, provider);
}
function registerCodeLensProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.codeLensProvider.register(languageSelector, provider);
}
function registerCodeActionProvider(languageSelector, provider, metadata) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.codeActionProvider.register(languageSelector, {
    providedCodeActionKinds: metadata === null || metadata === void 0 ? void 0 : metadata.providedCodeActionKinds,
    documentation: metadata === null || metadata === void 0 ? void 0 : metadata.documentation,
    provideCodeActions: (model, range2, context, token) => {
      const markerService = StandaloneServices.get(IMarkerService);
      const markers = markerService.read({ resource: model.uri }).filter((m) => {
        return Range.areIntersectingOrTouching(m, range2);
      });
      return provider.provideCodeActions(model, range2, { markers, only: context.only, trigger: context.trigger }, token);
    },
    resolveCodeAction: provider.resolveCodeAction
  });
}
function registerDocumentFormattingEditProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.documentFormattingEditProvider.register(languageSelector, provider);
}
function registerDocumentRangeFormattingEditProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.documentRangeFormattingEditProvider.register(languageSelector, provider);
}
function registerOnTypeFormattingEditProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.onTypeFormattingEditProvider.register(languageSelector, provider);
}
function registerLinkProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.linkProvider.register(languageSelector, provider);
}
function registerCompletionItemProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.completionProvider.register(languageSelector, provider);
}
function registerColorProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.colorProvider.register(languageSelector, provider);
}
function registerFoldingRangeProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.foldingRangeProvider.register(languageSelector, provider);
}
function registerDeclarationProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.declarationProvider.register(languageSelector, provider);
}
function registerSelectionRangeProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.selectionRangeProvider.register(languageSelector, provider);
}
function registerDocumentSemanticTokensProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.documentSemanticTokensProvider.register(languageSelector, provider);
}
function registerDocumentRangeSemanticTokensProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.documentRangeSemanticTokensProvider.register(languageSelector, provider);
}
function registerInlineCompletionsProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.inlineCompletionsProvider.register(languageSelector, provider);
}
function registerInlayHintsProvider(languageSelector, provider) {
  const languageFeaturesService = StandaloneServices.get(ILanguageFeaturesService);
  return languageFeaturesService.inlayHintsProvider.register(languageSelector, provider);
}
function createMonacoLanguagesAPI() {
  return {
    register,
    getLanguages,
    onLanguage,
    getEncodedLanguageId,
    setLanguageConfiguration,
    setColorMap,
    registerTokensProviderFactory,
    setTokensProvider,
    setMonarchTokensProvider,
    registerReferenceProvider,
    registerRenameProvider,
    registerCompletionItemProvider,
    registerSignatureHelpProvider,
    registerHoverProvider,
    registerDocumentSymbolProvider,
    registerDocumentHighlightProvider,
    registerLinkedEditingRangeProvider,
    registerDefinitionProvider,
    registerImplementationProvider,
    registerTypeDefinitionProvider,
    registerCodeLensProvider,
    registerCodeActionProvider,
    registerDocumentFormattingEditProvider,
    registerDocumentRangeFormattingEditProvider,
    registerOnTypeFormattingEditProvider,
    registerLinkProvider,
    registerColorProvider,
    registerFoldingRangeProvider,
    registerDeclarationProvider,
    registerSelectionRangeProvider,
    registerDocumentSemanticTokensProvider,
    registerDocumentRangeSemanticTokensProvider,
    registerInlineCompletionsProvider,
    registerInlayHintsProvider,
    DocumentHighlightKind,
    CompletionItemKind,
    CompletionItemTag,
    CompletionItemInsertTextRule,
    SymbolKind,
    SymbolTag,
    IndentAction,
    CompletionTriggerKind,
    SignatureHelpTriggerKind,
    InlayHintKind,
    InlineCompletionTriggerKind,
    CodeActionTriggerType,
    FoldingRangeKind
  };
}

// ../../.yarn/global/cache/monaco-editor-npm-0.34.0-2a8aa5269e-9.zip/node_modules/monaco-editor/esm/vs/editor/editor.api.js
init_platform();
init_format();
var _a3;
EditorOptions.wrappingIndent.defaultValue = 0;
EditorOptions.glyphMargin.defaultValue = false;
EditorOptions.autoIndent.defaultValue = 3;
EditorOptions.overviewRulerLanes.defaultValue = 2;
FormattingConflicts.setFormatterSelector((formatter, document2, mode) => Promise.resolve(formatter[0]));
var api = createMonacoBaseAPI();
api.editor = createMonacoEditorAPI();
api.languages = createMonacoLanguagesAPI();
var CancellationTokenSource2 = api.CancellationTokenSource;
var Emitter2 = api.Emitter;
var KeyCode2 = api.KeyCode;
var KeyMod2 = api.KeyMod;
var Position2 = api.Position;
var Range3 = api.Range;
var Selection2 = api.Selection;
var SelectionDirection2 = api.SelectionDirection;
var MarkerSeverity3 = api.MarkerSeverity;
var MarkerTag2 = api.MarkerTag;
var Uri = api.Uri;
var Token2 = api.Token;
var editor = api.editor;
var languages = api.languages;
if (((_a3 = globals.MonacoEnvironment) === null || _a3 === void 0 ? void 0 : _a3.globalAPI) || typeof define === "function" && define.amd) {
  self.monaco = api;
}
if (typeof self.require !== "undefined" && typeof self.require.config === "function") {
  self.require.config({
    ignoreDuplicateModules: [
      "vscode-languageserver-types",
      "vscode-languageserver-types/main",
      "vscode-languageserver-textdocument",
      "vscode-languageserver-textdocument/main",
      "vscode-nls",
      "vscode-nls/vscode-nls",
      "jsonc-parser",
      "jsonc-parser/main",
      "vscode-uri",
      "vscode-uri/index",
      "vs/basic-languages/typescript/typescript"
    ]
  });
}

export {
  CancellationTokenSource2 as CancellationTokenSource,
  Emitter2 as Emitter,
  KeyCode2 as KeyCode,
  KeyMod2 as KeyMod,
  Position2 as Position,
  Range3 as Range,
  Selection2 as Selection,
  SelectionDirection2 as SelectionDirection,
  MarkerSeverity3 as MarkerSeverity,
  MarkerTag2 as MarkerTag,
  Uri,
  Token2 as Token,
  editor,
  languages,
  editor_api_exports
};
