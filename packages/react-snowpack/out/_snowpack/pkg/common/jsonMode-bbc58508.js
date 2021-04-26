import { e as editor, p as process, R as Range$1, l as languages, a as MarkerSeverity } from './editor.main-786cb7a1.js';
import './_commonjsHelpers-eb5a497e.js';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var STOP_WHEN_IDLE_FOR = 2 * 60 * 1000; // 2min
var WorkerManager = /** @class */ (function () {
    function WorkerManager(defaults) {
        var _this = this;
        this._defaults = defaults;
        this._worker = null;
        this._idleCheckInterval = setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);
        this._lastUsedTime = 0;
        this._configChangeListener = this._defaults.onDidChange(function () { return _this._stopWorker(); });
    }
    WorkerManager.prototype._stopWorker = function () {
        if (this._worker) {
            this._worker.dispose();
            this._worker = null;
        }
        this._client = null;
    };
    WorkerManager.prototype.dispose = function () {
        clearInterval(this._idleCheckInterval);
        this._configChangeListener.dispose();
        this._stopWorker();
    };
    WorkerManager.prototype._checkIfIdle = function () {
        if (!this._worker) {
            return;
        }
        var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
        if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
            this._stopWorker();
        }
    };
    WorkerManager.prototype._getClient = function () {
        this._lastUsedTime = Date.now();
        if (!this._client) {
            this._worker = editor.createWebWorker({
                // module that exports the create() method and returns a `JSONWorker` instance
                moduleId: 'vs/language/json/jsonWorker',
                label: this._defaults.languageId,
                // passed in to the create() method
                createData: {
                    languageSettings: this._defaults.diagnosticsOptions,
                    languageId: this._defaults.languageId,
                    enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest
                }
            });
            this._client = this._worker.getProxy();
        }
        return this._client;
    };
    WorkerManager.prototype.getLanguageServiceWorker = function () {
        var _this = this;
        var resources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            resources[_i] = arguments[_i];
        }
        var _client;
        return this._getClient()
            .then(function (client) {
            _client = client;
        })
            .then(function (_) {
            return _this._worker.withSyncedResources(resources);
        })
            .then(function (_) { return _client; });
    };
    return WorkerManager;
}());

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */
function createScanner(text, ignoreTrivia) {
    if (ignoreTrivia === void 0) { ignoreTrivia = false; }
    var len = text.length;
    var pos = 0, value = '', tokenOffset = 0, token = 16 /* Unknown */, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0 /* None */;
    function scanHexDigits(count, exact) {
        var digits = 0;
        var value = 0;
        while (digits < count || !exact) {
            var ch = text.charCodeAt(pos);
            if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
                value = value * 16 + ch - 48 /* _0 */;
            }
            else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
                value = value * 16 + ch - 65 /* A */ + 10;
            }
            else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
                value = value * 16 + ch - 97 /* a */ + 10;
            }
            else {
                break;
            }
            pos++;
            digits++;
        }
        if (digits < count) {
            value = -1;
        }
        return value;
    }
    function setPosition(newPosition) {
        pos = newPosition;
        value = '';
        tokenOffset = 0;
        token = 16 /* Unknown */;
        scanError = 0 /* None */;
    }
    function scanNumber() {
        var start = pos;
        if (text.charCodeAt(pos) === 48 /* _0 */) {
            pos++;
        }
        else {
            pos++;
            while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
            }
        }
        if (pos < text.length && text.charCodeAt(pos) === 46 /* dot */) {
            pos++;
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
            }
            else {
                scanError = 3 /* UnexpectedEndOfNumber */;
                return text.substring(start, pos);
            }
        }
        var end = pos;
        if (pos < text.length && (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */)) {
            pos++;
            if (pos < text.length && text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */) {
                pos++;
            }
            if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
                end = pos;
            }
            else {
                scanError = 3 /* UnexpectedEndOfNumber */;
            }
        }
        return text.substring(start, end);
    }
    function scanString() {
        var result = '', start = pos;
        while (true) {
            if (pos >= len) {
                result += text.substring(start, pos);
                scanError = 2 /* UnexpectedEndOfString */;
                break;
            }
            var ch = text.charCodeAt(pos);
            if (ch === 34 /* doubleQuote */) {
                result += text.substring(start, pos);
                pos++;
                break;
            }
            if (ch === 92 /* backslash */) {
                result += text.substring(start, pos);
                pos++;
                if (pos >= len) {
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                var ch2 = text.charCodeAt(pos++);
                switch (ch2) {
                    case 34 /* doubleQuote */:
                        result += '\"';
                        break;
                    case 92 /* backslash */:
                        result += '\\';
                        break;
                    case 47 /* slash */:
                        result += '/';
                        break;
                    case 98 /* b */:
                        result += '\b';
                        break;
                    case 102 /* f */:
                        result += '\f';
                        break;
                    case 110 /* n */:
                        result += '\n';
                        break;
                    case 114 /* r */:
                        result += '\r';
                        break;
                    case 116 /* t */:
                        result += '\t';
                        break;
                    case 117 /* u */:
                        var ch3 = scanHexDigits(4, true);
                        if (ch3 >= 0) {
                            result += String.fromCharCode(ch3);
                        }
                        else {
                            scanError = 4 /* InvalidUnicode */;
                        }
                        break;
                    default:
                        scanError = 5 /* InvalidEscapeCharacter */;
                }
                start = pos;
                continue;
            }
            if (ch >= 0 && ch <= 0x1f) {
                if (isLineBreak(ch)) {
                    result += text.substring(start, pos);
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                else {
                    scanError = 6 /* InvalidCharacter */;
                    // mark as error but continue with string
                }
            }
            pos++;
        }
        return result;
    }
    function scanNext() {
        value = '';
        scanError = 0 /* None */;
        tokenOffset = pos;
        lineStartOffset = lineNumber;
        prevTokenLineStartOffset = tokenLineStartOffset;
        if (pos >= len) {
            // at the end
            tokenOffset = len;
            return token = 17 /* EOF */;
        }
        var code = text.charCodeAt(pos);
        // trivia: whitespace
        if (isWhiteSpace(code)) {
            do {
                pos++;
                value += String.fromCharCode(code);
                code = text.charCodeAt(pos);
            } while (isWhiteSpace(code));
            return token = 15 /* Trivia */;
        }
        // trivia: newlines
        if (isLineBreak(code)) {
            pos++;
            value += String.fromCharCode(code);
            if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
                pos++;
                value += '\n';
            }
            lineNumber++;
            tokenLineStartOffset = pos;
            return token = 14 /* LineBreakTrivia */;
        }
        switch (code) {
            // tokens: []{}:,
            case 123 /* openBrace */:
                pos++;
                return token = 1 /* OpenBraceToken */;
            case 125 /* closeBrace */:
                pos++;
                return token = 2 /* CloseBraceToken */;
            case 91 /* openBracket */:
                pos++;
                return token = 3 /* OpenBracketToken */;
            case 93 /* closeBracket */:
                pos++;
                return token = 4 /* CloseBracketToken */;
            case 58 /* colon */:
                pos++;
                return token = 6 /* ColonToken */;
            case 44 /* comma */:
                pos++;
                return token = 5 /* CommaToken */;
            // strings
            case 34 /* doubleQuote */:
                pos++;
                value = scanString();
                return token = 10 /* StringLiteral */;
            // comments
            case 47 /* slash */:
                var start = pos - 1;
                // Single-line comment
                if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                    pos += 2;
                    while (pos < len) {
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    value = text.substring(start, pos);
                    return token = 12 /* LineCommentTrivia */;
                }
                // Multi-line comment
                if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                    pos += 2;
                    var safeLength = len - 1; // For lookahead.
                    var commentClosed = false;
                    while (pos < safeLength) {
                        var ch = text.charCodeAt(pos);
                        if (ch === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                            pos += 2;
                            commentClosed = true;
                            break;
                        }
                        pos++;
                        if (isLineBreak(ch)) {
                            if (ch === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
                                pos++;
                            }
                            lineNumber++;
                            tokenLineStartOffset = pos;
                        }
                    }
                    if (!commentClosed) {
                        pos++;
                        scanError = 1 /* UnexpectedEndOfComment */;
                    }
                    value = text.substring(start, pos);
                    return token = 13 /* BlockCommentTrivia */;
                }
                // just a single slash
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* Unknown */;
            // numbers
            case 45 /* minus */:
                value += String.fromCharCode(code);
                pos++;
                if (pos === len || !isDigit(text.charCodeAt(pos))) {
                    return token = 16 /* Unknown */;
                }
            // found a minus, followed by a number so
            // we fall through to proceed with scanning
            // numbers
            case 48 /* _0 */:
            case 49 /* _1 */:
            case 50 /* _2 */:
            case 51 /* _3 */:
            case 52 /* _4 */:
            case 53 /* _5 */:
            case 54 /* _6 */:
            case 55 /* _7 */:
            case 56 /* _8 */:
            case 57 /* _9 */:
                value += scanNumber();
                return token = 11 /* NumericLiteral */;
            // literals and unknown symbols
            default:
                // is a literal? Read the full word.
                while (pos < len && isUnknownContentCharacter(code)) {
                    pos++;
                    code = text.charCodeAt(pos);
                }
                if (tokenOffset !== pos) {
                    value = text.substring(tokenOffset, pos);
                    // keywords: true, false, null
                    switch (value) {
                        case 'true': return token = 8 /* TrueKeyword */;
                        case 'false': return token = 9 /* FalseKeyword */;
                        case 'null': return token = 7 /* NullKeyword */;
                    }
                    return token = 16 /* Unknown */;
                }
                // some
                value += String.fromCharCode(code);
                pos++;
                return token = 16 /* Unknown */;
        }
    }
    function isUnknownContentCharacter(code) {
        if (isWhiteSpace(code) || isLineBreak(code)) {
            return false;
        }
        switch (code) {
            case 125 /* closeBrace */:
            case 93 /* closeBracket */:
            case 123 /* openBrace */:
            case 91 /* openBracket */:
            case 34 /* doubleQuote */:
            case 58 /* colon */:
            case 44 /* comma */:
            case 47 /* slash */:
                return false;
        }
        return true;
    }
    function scanNextNonTrivia() {
        var result;
        do {
            result = scanNext();
        } while (result >= 12 /* LineCommentTrivia */ && result <= 15 /* Trivia */);
        return result;
    }
    return {
        setPosition: setPosition,
        getPosition: function () { return pos; },
        scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
        getToken: function () { return token; },
        getTokenValue: function () { return value; },
        getTokenOffset: function () { return tokenOffset; },
        getTokenLength: function () { return pos - tokenOffset; },
        getTokenStartLine: function () { return lineStartOffset; },
        getTokenStartCharacter: function () { return tokenOffset - prevTokenLineStartOffset; },
        getTokenError: function () { return scanError; },
    };
}
function isWhiteSpace(ch) {
    return ch === 32 /* space */ || ch === 9 /* tab */ || ch === 11 /* verticalTab */ || ch === 12 /* formFeed */ ||
        ch === 160 /* nonBreakingSpace */ || ch === 5760 /* ogham */ || ch >= 8192 /* enQuad */ && ch <= 8203 /* zeroWidthSpace */ ||
        ch === 8239 /* narrowNoBreakSpace */ || ch === 8287 /* mathematicalSpace */ || ch === 12288 /* ideographicSpace */ || ch === 65279 /* byteOrderMark */;
}
function isLineBreak(ch) {
    return ch === 10 /* lineFeed */ || ch === 13 /* carriageReturn */ || ch === 8232 /* lineSeparator */ || ch === 8233 /* paragraphSeparator */;
}
function isDigit(ch) {
    return ch >= 48 /* _0 */ && ch <= 57 /* _9 */;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var ParseOptions;
(function (ParseOptions) {
    ParseOptions.DEFAULT = {
        allowTrailingComma: false
    };
})(ParseOptions || (ParseOptions = {}));
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore always check the errors list to find out if the input was valid.
 */
function parse(text, errors, options) {
    if (errors === void 0) { errors = []; }
    if (options === void 0) { options = ParseOptions.DEFAULT; }
    var currentProperty = null;
    var currentParent = [];
    var previousParents = [];
    function onValue(value) {
        if (Array.isArray(currentParent)) {
            currentParent.push(value);
        }
        else if (currentProperty !== null) {
            currentParent[currentProperty] = value;
        }
    }
    var visitor = {
        onObjectBegin: function () {
            var object = {};
            onValue(object);
            previousParents.push(currentParent);
            currentParent = object;
            currentProperty = null;
        },
        onObjectProperty: function (name) {
            currentProperty = name;
        },
        onObjectEnd: function () {
            currentParent = previousParents.pop();
        },
        onArrayBegin: function () {
            var array = [];
            onValue(array);
            previousParents.push(currentParent);
            currentParent = array;
            currentProperty = null;
        },
        onArrayEnd: function () {
            currentParent = previousParents.pop();
        },
        onLiteralValue: onValue,
        onError: function (error, offset, length) {
            errors.push({ error: error, offset: offset, length: length });
        }
    };
    visit(text, visitor, options);
    return currentParent[0];
}
/**
 * Evaluates the JavaScript object of the given JSON DOM node
 */
function getNodeValue(node) {
    switch (node.type) {
        case 'array':
            return node.children.map(getNodeValue);
        case 'object':
            var obj = Object.create(null);
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var prop = _a[_i];
                var valueNode = prop.children[1];
                if (valueNode) {
                    obj[prop.children[0].value] = getNodeValue(valueNode);
                }
            }
            return obj;
        case 'null':
        case 'string':
        case 'number':
        case 'boolean':
            return node.value;
        default:
            return undefined;
    }
}
/**
 * Parses the given text and invokes the visitor functions for each object, array and literal reached.
 */
function visit(text, visitor, options) {
    if (options === void 0) { options = ParseOptions.DEFAULT; }
    var _scanner = createScanner(text, false);
    function toNoArgVisit(visitFunction) {
        return visitFunction ? function () { return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()); } : function () { return true; };
    }
    function toOneArgVisit(visitFunction) {
        return visitFunction ? function (arg) { return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()); } : function () { return true; };
    }
    var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
    var disallowComments = options && options.disallowComments;
    var allowTrailingComma = options && options.allowTrailingComma;
    function scanNext() {
        while (true) {
            var token = _scanner.scan();
            switch (_scanner.getTokenError()) {
                case 4 /* InvalidUnicode */:
                    handleError(14 /* InvalidUnicode */);
                    break;
                case 5 /* InvalidEscapeCharacter */:
                    handleError(15 /* InvalidEscapeCharacter */);
                    break;
                case 3 /* UnexpectedEndOfNumber */:
                    handleError(13 /* UnexpectedEndOfNumber */);
                    break;
                case 1 /* UnexpectedEndOfComment */:
                    if (!disallowComments) {
                        handleError(11 /* UnexpectedEndOfComment */);
                    }
                    break;
                case 2 /* UnexpectedEndOfString */:
                    handleError(12 /* UnexpectedEndOfString */);
                    break;
                case 6 /* InvalidCharacter */:
                    handleError(16 /* InvalidCharacter */);
                    break;
            }
            switch (token) {
                case 12 /* LineCommentTrivia */:
                case 13 /* BlockCommentTrivia */:
                    if (disallowComments) {
                        handleError(10 /* InvalidCommentToken */);
                    }
                    else {
                        onComment();
                    }
                    break;
                case 16 /* Unknown */:
                    handleError(1 /* InvalidSymbol */);
                    break;
                case 15 /* Trivia */:
                case 14 /* LineBreakTrivia */:
                    break;
                default:
                    return token;
            }
        }
    }
    function handleError(error, skipUntilAfter, skipUntil) {
        if (skipUntilAfter === void 0) { skipUntilAfter = []; }
        if (skipUntil === void 0) { skipUntil = []; }
        onError(error);
        if (skipUntilAfter.length + skipUntil.length > 0) {
            var token = _scanner.getToken();
            while (token !== 17 /* EOF */) {
                if (skipUntilAfter.indexOf(token) !== -1) {
                    scanNext();
                    break;
                }
                else if (skipUntil.indexOf(token) !== -1) {
                    break;
                }
                token = scanNext();
            }
        }
    }
    function parseString(isValue) {
        var value = _scanner.getTokenValue();
        if (isValue) {
            onLiteralValue(value);
        }
        else {
            onObjectProperty(value);
        }
        scanNext();
        return true;
    }
    function parseLiteral() {
        switch (_scanner.getToken()) {
            case 11 /* NumericLiteral */:
                var tokenValue = _scanner.getTokenValue();
                var value = Number(tokenValue);
                if (isNaN(value)) {
                    handleError(2 /* InvalidNumberFormat */);
                    value = 0;
                }
                onLiteralValue(value);
                break;
            case 7 /* NullKeyword */:
                onLiteralValue(null);
                break;
            case 8 /* TrueKeyword */:
                onLiteralValue(true);
                break;
            case 9 /* FalseKeyword */:
                onLiteralValue(false);
                break;
            default:
                return false;
        }
        scanNext();
        return true;
    }
    function parseProperty() {
        if (_scanner.getToken() !== 10 /* StringLiteral */) {
            handleError(3 /* PropertyNameExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            return false;
        }
        parseString(false);
        if (_scanner.getToken() === 6 /* ColonToken */) {
            onSeparator(':');
            scanNext(); // consume colon
            if (!parseValue()) {
                handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
        }
        else {
            handleError(5 /* ColonExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
        }
        return true;
    }
    function parseObject() {
        onObjectBegin();
        scanNext(); // consume open brace
        var needsComma = false;
        while (_scanner.getToken() !== 2 /* CloseBraceToken */ && _scanner.getToken() !== 17 /* EOF */) {
            if (_scanner.getToken() === 5 /* CommaToken */) {
                if (!needsComma) {
                    handleError(4 /* ValueExpected */, [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 2 /* CloseBraceToken */ && allowTrailingComma) {
                    break;
                }
            }
            else if (needsComma) {
                handleError(6 /* CommaExpected */, [], []);
            }
            if (!parseProperty()) {
                handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
            needsComma = true;
        }
        onObjectEnd();
        if (_scanner.getToken() !== 2 /* CloseBraceToken */) {
            handleError(7 /* CloseBraceExpected */, [2 /* CloseBraceToken */], []);
        }
        else {
            scanNext(); // consume close brace
        }
        return true;
    }
    function parseArray() {
        onArrayBegin();
        scanNext(); // consume open bracket
        var needsComma = false;
        while (_scanner.getToken() !== 4 /* CloseBracketToken */ && _scanner.getToken() !== 17 /* EOF */) {
            if (_scanner.getToken() === 5 /* CommaToken */) {
                if (!needsComma) {
                    handleError(4 /* ValueExpected */, [], []);
                }
                onSeparator(',');
                scanNext(); // consume comma
                if (_scanner.getToken() === 4 /* CloseBracketToken */ && allowTrailingComma) {
                    break;
                }
            }
            else if (needsComma) {
                handleError(6 /* CommaExpected */, [], []);
            }
            if (!parseValue()) {
                handleError(4 /* ValueExpected */, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
            }
            needsComma = true;
        }
        onArrayEnd();
        if (_scanner.getToken() !== 4 /* CloseBracketToken */) {
            handleError(8 /* CloseBracketExpected */, [4 /* CloseBracketToken */], []);
        }
        else {
            scanNext(); // consume close bracket
        }
        return true;
    }
    function parseValue() {
        switch (_scanner.getToken()) {
            case 3 /* OpenBracketToken */:
                return parseArray();
            case 1 /* OpenBraceToken */:
                return parseObject();
            case 10 /* StringLiteral */:
                return parseString(true);
            default:
                return parseLiteral();
        }
    }
    scanNext();
    if (_scanner.getToken() === 17 /* EOF */) {
        if (options.allowEmptyContent) {
            return true;
        }
        handleError(4 /* ValueExpected */, [], []);
        return false;
    }
    if (!parseValue()) {
        handleError(4 /* ValueExpected */, [], []);
        return false;
    }
    if (_scanner.getToken() !== 17 /* EOF */) {
        handleError(9 /* EndOfFileExpected */, [], []);
    }
    return true;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Creates a JSON scanner on the given text.
 * If ignoreTrivia is set, whitespaces or comments are ignored.
 */
var createScanner$1 = createScanner;
/**
 * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore, always check the errors list to find out if the input was valid.
 */
var parse$1 = parse;
/**
 * Evaluates the JavaScript object of the given JSON DOM node
 */
var getNodeValue$1 = getNodeValue;

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
function isBoolean(val) {
    return typeof val === 'boolean';
}

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var integer;
(function (integer) {
    integer.MIN_VALUE = -2147483648;
    integer.MAX_VALUE = 2147483647;
})(integer || (integer = {}));
var uinteger;
(function (uinteger) {
    uinteger.MIN_VALUE = 0;
    uinteger.MAX_VALUE = 2147483647;
})(uinteger || (uinteger = {}));
/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        if (line === Number.MAX_VALUE) {
            line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
            character = uinteger.MAX_VALUE;
        }
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given literal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange))
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.numberRange(candidate.red, 0, 1)
            && Is.numberRange(candidate.green, 0, 1)
            && Is.numberRange(candidate.blue, 0, 1)
            && Is.numberRange(candidate.alpha, 0, 1);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * Enum of known range kinds
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
        var result = {
            startLine: startLine,
            endLine: endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
var DiagnosticTag;
(function (DiagnosticTag) {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    DiagnosticTag.Unnecessary = 1;
    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */
    DiagnosticTag.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
/**
 * The CodeDescription namespace provides functions to deal with descriptions for diagnostic codes.
 *
 * @since 3.16.0
 */
var CodeDescription;
(function (CodeDescription) {
    function is(value) {
        var candidate = value;
        return candidate !== undefined && candidate !== null && Is.string(candidate.href);
    }
    CodeDescription.is = is;
})(CodeDescription || (CodeDescription = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var _a;
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.undefined(candidate.codeDescription) || (Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation) {
    function create(label, needsConfirmation, description) {
        var result = { label: label };
        if (needsConfirmation !== undefined) {
            result.needsConfirmation = needsConfirmation;
        }
        if (description !== undefined) {
            result.description = description;
        }
        return result;
    }
    ChangeAnnotation.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && Is.objectLiteral(candidate) && Is.string(candidate.label) &&
            (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) &&
            (Is.string(candidate.description) || candidate.description === undefined);
    }
    ChangeAnnotation.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier) {
    function is(value) {
        var candidate = value;
        return typeof candidate === 'string';
    }
    ChangeAnnotationIdentifier.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function (AnnotatedTextEdit) {
    /**
     * Creates an annotated replace text edit.
     *
     * @param range The range of text to be replaced.
     * @param newText The new text.
     * @param annotation The annotation.
     */
    function replace(range, newText, annotation) {
        return { range: range, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.replace = replace;
    /**
     * Creates an annotated insert text edit.
     *
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     * @param annotation The annotation.
     */
    function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText: newText, annotationId: annotation };
    }
    AnnotatedTextEdit.insert = insert;
    /**
     * Creates an annotated delete text edit.
     *
     * @param range The range of text to be deleted.
     * @param annotation The annotation.
     */
    function del(range, annotation) {
        return { range: range, newText: '', annotationId: annotation };
    }
    AnnotatedTextEdit.del = del;
    function is(value) {
        var candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    AnnotatedTextEdit.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'create',
            uri: uri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options, annotation) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
        };
        if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined ||
            ((candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options, annotation) {
        var result = {
            kind: 'delete',
            uri: uri
        };
        if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
            result.options = options;
        }
        if (annotation !== undefined) {
            result.annotationId = annotation;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined ||
            ((candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists)))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== undefined || candidate.documentChanges !== undefined) &&
            (candidate.documentChanges === undefined || candidate.documentChanges.every(function (change) {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.insert(position, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.insert(position, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.insert(position, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.replace = function (range, newText, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.replace(range, newText);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.replace(range, newText, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.replace(range, newText, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.delete = function (range, annotation) {
        var edit;
        var id;
        if (annotation === undefined) {
            edit = TextEdit.del(range);
        }
        else if (ChangeAnnotationIdentifier.is(annotation)) {
            id = annotation;
            edit = AnnotatedTextEdit.del(range, annotation);
        }
        else {
            this.assertChangeAnnotations(this.changeAnnotations);
            id = this.changeAnnotations.manage(annotation);
            edit = AnnotatedTextEdit.del(range, id);
        }
        this.edits.push(edit);
        if (id !== undefined) {
            return id;
        }
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    TextEditChangeImpl.prototype.assertChangeAnnotations = function (value) {
        if (value === undefined) {
            throw new Error("Text edit change is not configured to manage change annotations.");
        }
    };
    return TextEditChangeImpl;
}());
/**
 * A helper class
 */
var ChangeAnnotations = /** @class */ (function () {
    function ChangeAnnotations(annotations) {
        this._annotations = annotations === undefined ? Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
    }
    ChangeAnnotations.prototype.all = function () {
        return this._annotations;
    };
    Object.defineProperty(ChangeAnnotations.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    ChangeAnnotations.prototype.manage = function (idOrAnnotation, annotation) {
        var id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
            id = idOrAnnotation;
        }
        else {
            id = this.nextId();
            annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== undefined) {
            throw new Error("Id " + id + " is already in use.");
        }
        if (annotation === undefined) {
            throw new Error("No annotation provided for id " + id);
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
    };
    ChangeAnnotations.prototype.nextId = function () {
        this._counter++;
        return this._counter.toString();
    };
    return ChangeAnnotations;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit !== undefined) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
                workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
        else {
            this._workspaceEdit = {};
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            this.initDocumentChanges();
            if (this._changeAnnotations !== undefined) {
                if (this._changeAnnotations.size === 0) {
                    this._workspaceEdit.changeAnnotations = undefined;
                }
                else {
                    this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
                }
            }
            return this._workspaceEdit;
        },
        enumerable: false,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
            this.initDocumentChanges();
            if (this._workspaceEdit.documentChanges === undefined) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = { uri: key.uri, version: key.version };
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits, this._changeAnnotations);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            this.initChanges();
            if (this._workspaceEdit.changes === undefined) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.initDocumentChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._changeAnnotations = new ChangeAnnotations();
            this._workspaceEdit.documentChanges = [];
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
    };
    WorkspaceChange.prototype.initChanges = function () {
        if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
            this._workspaceEdit.changes = Object.create(null);
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = CreateFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = CreateFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = RenameFile.create(oldUri, newUri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = RenameFile.create(oldUri, newUri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    WorkspaceChange.prototype.deleteFile = function (uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === undefined) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
        var annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
            annotation = optionsOrAnnotation;
        }
        else {
            options = optionsOrAnnotation;
        }
        var operation;
        var id;
        if (annotation === undefined) {
            operation = DeleteFile.create(uri, options);
        }
        else {
            id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
            operation = DeleteFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== undefined) {
            return id;
        }
    };
    return WorkspaceChange;
}());
/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The OptionalVersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) literals.
 */
var OptionalVersionedTextDocumentIdentifier;
(function (OptionalVersionedTextDocumentIdentifier) {
    /**
     * Creates a new OptionalVersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    OptionalVersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
    }
    OptionalVersionedTextDocumentIdentifier.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
(function (MarkupKind) {
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
        var candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
var CompletionItemTag;
(function (CompletionItemTag) {
    /**
     * Render a completion as obsolete, usually using a strike-out.
     */
    CompletionItemTag.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
/**
 * The InsertReplaceEdit namespace provides functions to deal with insert / replace edits.
 *
 * @since 3.16.0
 */
var InsertReplaceEdit;
(function (InsertReplaceEdit) {
    /**
     * Creates a new insert / replace edit
     */
    function create(newText, insert, replace) {
        return { newText: newText, insert: insert, replace: replace };
    }
    InsertReplaceEdit.create = create;
    /**
     * Checks whether the given literal conforms to the [InsertReplaceEdit](#InsertReplaceEdit) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
    }
    InsertReplaceEdit.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
/**
 * How whitespace and indentation is handled during completion
 * item insertion.
 *
 * @since 3.16.0
 */
var InsertTextMode;
(function (InsertTextMode) {
    /**
     * The insertion or replace strings is taken as it is. If the
     * value is multi line the lines below the cursor will be
     * inserted using the indentation defined in the string value.
     * The client will not apply any kind of adjustments to the
     * string.
     */
    InsertTextMode.asIs = 1;
    /**
     * The editor adjusts leading whitespace of new lines so that
     * they match the indentation up to the cursor of the line for
     * which the item is accepted.
     *
     * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
     * multi line completion item is indented using 2 tabs and all
     * following lines inserted will be indented using 2 tabs as well.
     */
    InsertTextMode.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
/**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 * @since 3.16
 */
var SymbolTag;
(function (SymbolTag) {
    /**
     * Render a symbol as obsolete, usually using a strike-out.
     */
    SymbolTag.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var DocumentSymbol;
(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
        };
        if (children !== undefined) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === undefined || Is.string(candidate.detail)) &&
            (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) &&
            (candidate.children === undefined || Array.isArray(candidate.children)) &&
            (candidate.tags === undefined || Array.isArray(candidate.tags));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Empty kind.
     */
    CodeActionKind.Empty = '';
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
    /**
     * Base kind for auto-fix source actions: `source.fixAll`.
     *
     * Fix all actions automatically fix errors that have a clear fix that do not require user input.
     * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
     *
     * @since 3.15.0
     */
    CodeActionKind.SourceFixAll = 'source.fixAll';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only) {
        var result = { diagnostics: diagnostics };
        if (only !== undefined && only !== null) {
            result.only = only;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, kindOrCommandOrEdit, kind) {
        var result = { title: title };
        var checkKind = true;
        if (typeof kindOrCommandOrEdit === 'string') {
            checkKind = false;
            result.kind = kindOrCommandOrEdit;
        }
        else if (Command.is(kindOrCommandOrEdit)) {
            result.command = kindOrCommandOrEdit;
        }
        else {
            result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== undefined) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === undefined || Is.string(candidate.kind)) &&
            (candidate.edit !== undefined || candidate.command !== undefined) &&
            (candidate.command === undefined || Command.is(candidate.command)) &&
            (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) &&
            (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data)) {
            result.data = data;
        }
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
var DocumentLink;
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
/**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */
var SelectionRange;
(function (SelectionRange) {
    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */
    function create(range, parent) {
        return { range: range, parent: parent };
    }
    SelectionRange.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
    }
    SelectionRange.is = is;
})(SelectionRange || (SelectionRange = {}));
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: false,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: false,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined$1(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined$1;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function numberRange(value, min, max) {
        return toString.call(value) === '[object Number]' && min <= value && value <= max;
    }
    Is.numberRange = numberRange;
    function integer(value) {
        return toString.call(value) === '[object Number]' && -2147483648 <= value && value <= 2147483647;
    }
    Is.integer = integer;
    function uinteger(value) {
        return toString.call(value) === '[object Number]' && 0 <= value && value <= 2147483647;
    }
    Is.uinteger = uinteger;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var FullTextDocument$1 = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (changes, version) {
        for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
            var change = changes_1[_i];
            if (FullTextDocument.isIncremental(change)) {
                // makes sure start is before end
                var range = getWellformedRange(change.range);
                // update content
                var startOffset = this.offsetAt(range.start);
                var endOffset = this.offsetAt(range.end);
                this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
                // update the offsets
                var startLine = Math.max(range.start.line, 0);
                var endLine = Math.max(range.end.line, 0);
                var lineOffsets = this._lineOffsets;
                var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
                if (endLine - startLine === addedLineOffsets.length) {
                    for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
                        lineOffsets[i + startLine + 1] = addedLineOffsets[i];
                    }
                }
                else {
                    if (addedLineOffsets.length < 10000) {
                        lineOffsets.splice.apply(lineOffsets, [startLine + 1, endLine - startLine].concat(addedLineOffsets));
                    }
                    else { // avoid too many arguments for splice
                        this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
                    }
                }
                var diff = change.text.length - (endOffset - startOffset);
                if (diff !== 0) {
                    for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
                        lineOffsets[i] = lineOffsets[i] + diff;
                    }
                }
            }
            else if (FullTextDocument.isFull(change)) {
                this._content = change.text;
                this._lineOffsets = undefined;
            }
            else {
                throw new Error('Unknown change event received');
            }
        }
        this._version = version;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            this._lineOffsets = computeLineOffsets(this._content, true);
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return { line: 0, character: offset };
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return { line: line, character: offset - lineOffsets[line] };
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.isIncremental = function (event) {
        var candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range !== undefined &&
            (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
    };
    FullTextDocument.isFull = function (event) {
        var candidate = event;
        return candidate !== undefined && candidate !== null &&
            typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
    };
    return FullTextDocument;
}());
var TextDocument$1;
(function (TextDocument) {
    /**
     * Creates a new text document.
     *
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param version The document's initial version number.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument$1(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Updates a TextDocument by modifing its content.
     *
     * @param document the document to update. Only documents created by TextDocument.create are valid inputs.
     * @param changes the changes to apply to the document.
     * @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
     *
     */
    function update(document, changes, version) {
        if (document instanceof FullTextDocument$1) {
            document.update(changes, version);
            return document;
        }
        else {
            throw new Error('TextDocument.update: document must be created by TextDocument.create');
        }
    }
    TextDocument.update = update;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits.map(getWellformedEdit), function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = 0;
        var spans = [];
        for (var _i = 0, sortedEdits_1 = sortedEdits; _i < sortedEdits_1.length; _i++) {
            var e = sortedEdits_1[_i];
            var startOffset = document.offsetAt(e.range.start);
            if (startOffset < lastModifiedOffset) {
                throw new Error('Overlapping edit');
            }
            else if (startOffset > lastModifiedOffset) {
                spans.push(text.substring(lastModifiedOffset, startOffset));
            }
            if (e.newText.length) {
                spans.push(e.newText);
            }
            lastModifiedOffset = document.offsetAt(e.range.end);
        }
        spans.push(text.substr(lastModifiedOffset));
        return spans.join('');
    }
    TextDocument.applyEdits = applyEdits;
})(TextDocument$1 || (TextDocument$1 = {}));
function mergeSort(data, compare) {
    if (data.length <= 1) {
        // sorted
        return data;
    }
    var p = (data.length / 2) | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
        var ret = compare(left[leftIdx], right[rightIdx]);
        if (ret <= 0) {
            // smaller_equal -> take left to preserve order
            data[i++] = left[leftIdx++];
        }
        else {
            // greater -> take right
            data[i++] = right[rightIdx++];
        }
    }
    while (leftIdx < left.length) {
        data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
        data[i++] = right[rightIdx++];
    }
    return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset) {
    if (textOffset === void 0) { textOffset = 0; }
    var result = isAtLineStart ? [textOffset] : [];
    for (var i = 0; i < text.length; i++) {
        var ch = text.charCodeAt(i);
        if (ch === 13 /* CarriageReturn */ || ch === 10 /* LineFeed */) {
            if (ch === 13 /* CarriageReturn */ && i + 1 < text.length && text.charCodeAt(i + 1) === 10 /* LineFeed */) {
                i++;
            }
            result.push(textOffset + i + 1);
        }
    }
    return result;
}
function getWellformedRange(range) {
    var start = range.start;
    var end = range.end;
    if (start.line > end.line || (start.line === end.line && start.character > end.character)) {
        return { start: end, end: start };
    }
    return range;
}
function getWellformedEdit(textEdit) {
    var range = getWellformedRange(textEdit.range);
    if (range !== textEdit.range) {
        return { newText: textEdit.newText, range: range };
    }
    return textEdit;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Error codes used by diagnostics
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
    ErrorCode[ErrorCode["EnumValueMismatch"] = 1] = "EnumValueMismatch";
    ErrorCode[ErrorCode["Deprecated"] = 2] = "Deprecated";
    ErrorCode[ErrorCode["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
    ErrorCode[ErrorCode["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
    ErrorCode[ErrorCode["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
    ErrorCode[ErrorCode["InvalidUnicode"] = 260] = "InvalidUnicode";
    ErrorCode[ErrorCode["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
    ErrorCode[ErrorCode["InvalidCharacter"] = 262] = "InvalidCharacter";
    ErrorCode[ErrorCode["PropertyExpected"] = 513] = "PropertyExpected";
    ErrorCode[ErrorCode["CommaExpected"] = 514] = "CommaExpected";
    ErrorCode[ErrorCode["ColonExpected"] = 515] = "ColonExpected";
    ErrorCode[ErrorCode["ValueExpected"] = 516] = "ValueExpected";
    ErrorCode[ErrorCode["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
    ErrorCode[ErrorCode["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
    ErrorCode[ErrorCode["TrailingComma"] = 519] = "TrailingComma";
    ErrorCode[ErrorCode["DuplicateKey"] = 520] = "DuplicateKey";
    ErrorCode[ErrorCode["CommentNotPermitted"] = 521] = "CommentNotPermitted";
    ErrorCode[ErrorCode["SchemaResolveError"] = 768] = "SchemaResolveError";
})(ErrorCode || (ErrorCode = {}));
var ClientCapabilities;
(function (ClientCapabilities) {
    ClientCapabilities.LATEST = {
        textDocument: {
            completion: {
                completionItem: {
                    documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText],
                    commitCharactersSupport: true
                }
            }
        }
    };
})(ClientCapabilities || (ClientCapabilities = {}));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function format(message, args) {
    var result;
    if (args.length === 0) {
        result = message;
    }
    else {
        result = message.replace(/\{(\d+)\}/g, function (match, rest) {
            var index = rest[0];
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
    return result;
}
function localize(key, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return format(message, args);
}
function loadMessageBundle(file) {
    return localize;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var localize$1 = loadMessageBundle();
var formats = {
    'color-hex': { errorMessage: localize$1('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'), pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/ },
    'date-time': { errorMessage: localize$1('dateTimeFormatWarning', 'String is not a RFC3339 date-time.'), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i },
    'date': { errorMessage: localize$1('dateFormatWarning', 'String is not a RFC3339 date.'), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i },
    'time': { errorMessage: localize$1('timeFormatWarning', 'String is not a RFC3339 time.'), pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i },
    'email': { errorMessage: localize$1('emailFormatWarning', 'String is not an e-mail address.'), pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
};
var ASTNodeImpl = /** @class */ (function () {
    function ASTNodeImpl(parent, offset, length) {
        if (length === void 0) { length = 0; }
        this.offset = offset;
        this.length = length;
        this.parent = parent;
    }
    Object.defineProperty(ASTNodeImpl.prototype, "children", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    ASTNodeImpl.prototype.toString = function () {
        return 'type: ' + this.type + ' (' + this.offset + '/' + this.length + ')' + (this.parent ? ' parent: {' + this.parent.toString() + '}' : '');
    };
    return ASTNodeImpl;
}());
var NullASTNodeImpl = /** @class */ (function (_super) {
    __extends(NullASTNodeImpl, _super);
    function NullASTNodeImpl(parent, offset) {
        var _this = _super.call(this, parent, offset) || this;
        _this.type = 'null';
        _this.value = null;
        return _this;
    }
    return NullASTNodeImpl;
}(ASTNodeImpl));
var BooleanASTNodeImpl = /** @class */ (function (_super) {
    __extends(BooleanASTNodeImpl, _super);
    function BooleanASTNodeImpl(parent, boolValue, offset) {
        var _this = _super.call(this, parent, offset) || this;
        _this.type = 'boolean';
        _this.value = boolValue;
        return _this;
    }
    return BooleanASTNodeImpl;
}(ASTNodeImpl));
var ArrayASTNodeImpl = /** @class */ (function (_super) {
    __extends(ArrayASTNodeImpl, _super);
    function ArrayASTNodeImpl(parent, offset) {
        var _this = _super.call(this, parent, offset) || this;
        _this.type = 'array';
        _this.items = [];
        return _this;
    }
    Object.defineProperty(ArrayASTNodeImpl.prototype, "children", {
        get: function () {
            return this.items;
        },
        enumerable: false,
        configurable: true
    });
    return ArrayASTNodeImpl;
}(ASTNodeImpl));
var NumberASTNodeImpl = /** @class */ (function (_super) {
    __extends(NumberASTNodeImpl, _super);
    function NumberASTNodeImpl(parent, offset) {
        var _this = _super.call(this, parent, offset) || this;
        _this.type = 'number';
        _this.isInteger = true;
        _this.value = Number.NaN;
        return _this;
    }
    return NumberASTNodeImpl;
}(ASTNodeImpl));
var StringASTNodeImpl = /** @class */ (function (_super) {
    __extends(StringASTNodeImpl, _super);
    function StringASTNodeImpl(parent, offset, length) {
        var _this = _super.call(this, parent, offset, length) || this;
        _this.type = 'string';
        _this.value = '';
        return _this;
    }
    return StringASTNodeImpl;
}(ASTNodeImpl));
var PropertyASTNodeImpl = /** @class */ (function (_super) {
    __extends(PropertyASTNodeImpl, _super);
    function PropertyASTNodeImpl(parent, offset, keyNode) {
        var _this = _super.call(this, parent, offset) || this;
        _this.type = 'property';
        _this.colonOffset = -1;
        _this.keyNode = keyNode;
        return _this;
    }
    Object.defineProperty(PropertyASTNodeImpl.prototype, "children", {
        get: function () {
            return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
        },
        enumerable: false,
        configurable: true
    });
    return PropertyASTNodeImpl;
}(ASTNodeImpl));
var ObjectASTNodeImpl = /** @class */ (function (_super) {
    __extends(ObjectASTNodeImpl, _super);
    function ObjectASTNodeImpl(parent, offset) {
        var _this = _super.call(this, parent, offset) || this;
        _this.type = 'object';
        _this.properties = [];
        return _this;
    }
    Object.defineProperty(ObjectASTNodeImpl.prototype, "children", {
        get: function () {
            return this.properties;
        },
        enumerable: false,
        configurable: true
    });
    return ObjectASTNodeImpl;
}(ASTNodeImpl));
function asSchema(schema) {
    if (isBoolean(schema)) {
        return schema ? {} : { "not": {} };
    }
    return schema;
}
var EnumMatch;
(function (EnumMatch) {
    EnumMatch[EnumMatch["Key"] = 0] = "Key";
    EnumMatch[EnumMatch["Enum"] = 1] = "Enum";
})(EnumMatch || (EnumMatch = {}));
var NoOpSchemaCollector = /** @class */ (function () {
    function NoOpSchemaCollector() {
    }
    Object.defineProperty(NoOpSchemaCollector.prototype, "schemas", {
        get: function () { return []; },
        enumerable: false,
        configurable: true
    });
    NoOpSchemaCollector.prototype.add = function (schema) { };
    NoOpSchemaCollector.prototype.merge = function (other) { };
    NoOpSchemaCollector.prototype.include = function (node) { return true; };
    NoOpSchemaCollector.prototype.newSub = function () { return this; };
    NoOpSchemaCollector.instance = new NoOpSchemaCollector();
    return NoOpSchemaCollector;
}());
function getNodeValue$2(node) {
    return getNodeValue$1(node);
}

/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
        return false;
    }
    for (var i = 0; i < needle.length; i++) {
        if (haystack[i] !== needle[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Determines if haystack ends with needle.
 */
function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
        return haystack.lastIndexOf(needle) === diff;
    }
    else if (diff === 0) {
        return haystack === needle;
    }
    else {
        return false;
    }
}
function convertSimple2RegExpPattern(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}

var LIB;LIB=(()=>{var t={470:t=>{function e(t){if("string"!=typeof t)throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,e){for(var r,n="",o=0,i=-1,a=0,h=0;h<=t.length;++h){if(h<t.length)r=t.charCodeAt(h);else {if(47===r)break;r=47;}if(47===r){if(i===h-1||1===a);else if(i!==h-1&&2===a){if(n.length<2||2!==o||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var s=n.lastIndexOf("/");if(s!==n.length-1){-1===s?(n="",o=0):o=(n=n.slice(0,s)).length-1-n.lastIndexOf("/"),i=h,a=0;continue}}else if(2===n.length||1===n.length){n="",o=0,i=h,a=0;continue}e&&(n.length>0?n+="/..":n="..",o=2);}else n.length>0?n+="/"+t.slice(i+1,h):n=t.slice(i+1,h),o=h-i-1;i=h,a=0;}else 46===r&&-1!==a?++a:a=-1;}return n}var n={resolve:function(){for(var t,n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var a;i>=0?a=arguments[i]:(void 0===t&&(t=process.cwd()),a=t),e(a),0!==a.length&&(n=a+"/"+n,o=47===a.charCodeAt(0));}return n=r(n,!o),o?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(t){if(e(t),0===t.length)return ".";var n=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return 0!==(t=r(t,!n)).length||n||(t="."),t.length>0&&o&&(t+="/"),n?"/"+t:t},isAbsolute:function(t){return e(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0===arguments.length)return ".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];e(o),o.length>0&&(void 0===t?t=o:t+="/"+o);}return void 0===t?".":n.normalize(t)},relative:function(t,r){if(e(t),e(r),t===r)return "";if((t=n.resolve(t))===(r=n.resolve(r)))return "";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var i=t.length,a=i-o,h=1;h<r.length&&47===r.charCodeAt(h);++h);for(var s=r.length-h,f=a<s?a:s,u=-1,c=0;c<=f;++c){if(c===f){if(s>f){if(47===r.charCodeAt(h+c))return r.slice(h+c+1);if(0===c)return r.slice(h+c)}else a>f&&(47===t.charCodeAt(o+c)?u=c:0===c&&(u=0));break}var l=t.charCodeAt(o+c);if(l!==r.charCodeAt(h+c))break;47===l&&(u=c);}var p="";for(c=o+u+1;c<=i;++c)c!==i&&47!==t.charCodeAt(c)||(0===p.length?p+="..":p+="/..");return p.length>0?p+r.slice(h+u):(h+=u,47===r.charCodeAt(h)&&++h,r.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(e(t),0===t.length)return ".";for(var r=t.charCodeAt(0),n=47===r,o=-1,i=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!i){o=a;break}}else i=!1;return -1===o?n?"/":".":n&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw new TypeError('"ext" argument must be a string');e(t);var n,o=0,i=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return "";var h=r.length-1,s=-1;for(n=t.length-1;n>=0;--n){var f=t.charCodeAt(n);if(47===f){if(!a){o=n+1;break}}else -1===s&&(a=!1,s=n+1),h>=0&&(f===r.charCodeAt(h)?-1==--h&&(i=n):(h=-1,i=s));}return o===i?i=s:-1===i&&(i=t.length),t.slice(o,i)}for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!a){o=n+1;break}}else -1===i&&(a=!1,i=n+1);return -1===i?"":t.slice(o,i)},extname:function(t){e(t);for(var r=-1,n=0,o=-1,i=!0,a=0,h=t.length-1;h>=0;--h){var s=t.charCodeAt(h);if(47!==s)-1===o&&(i=!1,o=h+1),46===s?-1===r?r=h:1!==a&&(a=1):-1!==r&&(a=-1);else if(!i){n=h+1;break}}return -1===r||-1===o||0===a||1===a&&r===o-1&&r===n+1?"":t.slice(r,o)},format:function(t){if(null===t||"object"!=typeof t)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return function(t,e){var r=e.dir||e.root,n=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+n:r+"/"+n:n}(0,t)},parse:function(t){e(t);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;var n,o=t.charCodeAt(0),i=47===o;i?(r.root="/",n=1):n=0;for(var a=-1,h=0,s=-1,f=!0,u=t.length-1,c=0;u>=n;--u)if(47!==(o=t.charCodeAt(u)))-1===s&&(f=!1,s=u+1),46===o?-1===a?a=u:1!==c&&(c=1):-1!==a&&(c=-1);else if(!f){h=u+1;break}return -1===a||-1===s||0===c||1===c&&a===s-1&&a===h+1?-1!==s&&(r.base=r.name=0===h&&i?t.slice(1,s):t.slice(h,s)):(0===h&&i?(r.name=t.slice(1,a),r.base=t.slice(1,s)):(r.name=t.slice(h,a),r.base=t.slice(h,s)),r.ext=t.slice(a,s)),h>0?r.dir=t.slice(0,h-1):i&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};n.posix=n,t.exports=n;},447:(t,e,r)=>{var n;if(r.r(e),r.d(e,{URI:()=>g,Utils:()=>O}),"object"==typeof process)n="win32"===process.platform;else if("object"==typeof navigator){var o=navigator.userAgent;n=o.indexOf("Windows")>=0;}var i,a,h=(i=function(t,e){return (i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);})(t,e)},function(t,e){function r(){this.constructor=t;}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r);}),s=/^\w[\w\d+.-]*$/,f=/^\//,u=/^\/\//,c="",l="/",p=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,g=function(){function t(t,e,r,n,o,i){void 0===i&&(i=!1),"object"==typeof t?(this.scheme=t.scheme||c,this.authority=t.authority||c,this.path=t.path||c,this.query=t.query||c,this.fragment=t.fragment||c):(this.scheme=function(t,e){return t||e?t:"file"}(t,i),this.authority=e||c,this.path=function(t,e){switch(t){case"https":case"http":case"file":e?e[0]!==l&&(e=l+e):e=l;}return e}(this.scheme,r||c),this.query=n||c,this.fragment=o||c,function(t,e){if(!t.scheme&&e)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'+t.authority+'", path: "'+t.path+'", query: "'+t.query+'", fragment: "'+t.fragment+'"}');if(t.scheme&&!s.test(t.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(t.path)if(t.authority){if(!f.test(t.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(u.test(t.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}(this,i));}return t.isUri=function(e){return e instanceof t||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"function"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString},Object.defineProperty(t.prototype,"fsPath",{get:function(){return C(this,!1)},enumerable:!1,configurable:!0}),t.prototype.with=function(t){if(!t)return this;var e=t.scheme,r=t.authority,n=t.path,o=t.query,i=t.fragment;return void 0===e?e=this.scheme:null===e&&(e=c),void 0===r?r=this.authority:null===r&&(r=c),void 0===n?n=this.path:null===n&&(n=c),void 0===o?o=this.query:null===o&&(o=c),void 0===i?i=this.fragment:null===i&&(i=c),e===this.scheme&&r===this.authority&&n===this.path&&o===this.query&&i===this.fragment?this:new v(e,r,n,o,i)},t.parse=function(t,e){void 0===e&&(e=!1);var r=p.exec(t);return r?new v(r[2]||c,x(r[4]||c),x(r[5]||c),x(r[7]||c),x(r[9]||c),e):new v(c,c,c,c,c)},t.file=function(t){var e=c;if(n&&(t=t.replace(/\\/g,l)),t[0]===l&&t[1]===l){var r=t.indexOf(l,2);-1===r?(e=t.substring(2),t=l):(e=t.substring(2,r),t=t.substring(r)||l);}return new v("file",e,t,c,c)},t.from=function(t){return new v(t.scheme,t.authority,t.path,t.query,t.fragment)},t.prototype.toString=function(t){return void 0===t&&(t=!1),A(this,t)},t.prototype.toJSON=function(){return this},t.revive=function(e){if(e){if(e instanceof t)return e;var r=new v(e);return r._formatted=e.external,r._fsPath=e._sep===d?e.fsPath:null,r}return e},t}(),d=n?1:void 0,v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._formatted=null,e._fsPath=null,e}return h(e,t),Object.defineProperty(e.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=C(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(t){return void 0===t&&(t=!1),t?A(this,!0):(this._formatted||(this._formatted=A(this,!1)),this._formatted)},e.prototype.toJSON=function(){var t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=d),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t},e}(g),m=((a={})[58]="%3A",a[47]="%2F",a[63]="%3F",a[35]="%23",a[91]="%5B",a[93]="%5D",a[64]="%40",a[33]="%21",a[36]="%24",a[38]="%26",a[39]="%27",a[40]="%28",a[41]="%29",a[42]="%2A",a[43]="%2B",a[44]="%2C",a[59]="%3B",a[61]="%3D",a[32]="%20",a);function y(t,e){for(var r=void 0,n=-1,o=0;o<t.length;o++){var i=t.charCodeAt(o);if(i>=97&&i<=122||i>=65&&i<=90||i>=48&&i<=57||45===i||46===i||95===i||126===i||e&&47===i)-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),void 0!==r&&(r+=t.charAt(o));else {void 0===r&&(r=t.substr(0,o));var a=m[i];void 0!==a?(-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),r+=a):-1===n&&(n=o);}}return -1!==n&&(r+=encodeURIComponent(t.substring(n))),void 0!==r?r:t}function b(t){for(var e=void 0,r=0;r<t.length;r++){var n=t.charCodeAt(r);35===n||63===n?(void 0===e&&(e=t.substr(0,r)),e+=m[n]):void 0!==e&&(e+=t[r]);}return void 0!==e?e:t}function C(t,e){var r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?"//"+t.authority+t.path:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&t.path.charCodeAt(1)<=90||t.path.charCodeAt(1)>=97&&t.path.charCodeAt(1)<=122)&&58===t.path.charCodeAt(2)?e?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,n&&(r=r.replace(/\//g,"\\")),r}function A(t,e){var r=e?b:y,n="",o=t.scheme,i=t.authority,a=t.path,h=t.query,s=t.fragment;if(o&&(n+=o,n+=":"),(i||"file"===o)&&(n+=l,n+=l),i){var f=i.indexOf("@");if(-1!==f){var u=i.substr(0,f);i=i.substr(f+1),-1===(f=u.indexOf(":"))?n+=r(u,!1):(n+=r(u.substr(0,f),!1),n+=":",n+=r(u.substr(f+1),!1)),n+="@";}-1===(f=(i=i.toLowerCase()).indexOf(":"))?n+=r(i,!1):(n+=r(i.substr(0,f),!1),n+=i.substr(f));}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2))(c=a.charCodeAt(1))>=65&&c<=90&&(a="/"+String.fromCharCode(c+32)+":"+a.substr(3));else if(a.length>=2&&58===a.charCodeAt(1)){var c;(c=a.charCodeAt(0))>=65&&c<=90&&(a=String.fromCharCode(c+32)+":"+a.substr(2));}n+=r(a,!0);}return h&&(n+="?",n+=r(h,!1)),s&&(n+="#",n+=e?s:y(s,!1)),n}function w(t){try{return decodeURIComponent(t)}catch(e){return t.length>3?t.substr(0,3)+w(t.substr(3)):t}}var _=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function x(t){return t.match(_)?t.replace(_,(function(t){return w(t)})):t}var O,P=r(470),j=function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<r;e++)for(var i=arguments[e],a=0,h=i.length;a<h;a++,o++)n[o]=i[a];return n},U=P.posix||P;!function(t){t.joinPath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t.with({path:U.join.apply(U,j([t.path],e))})},t.resolvePath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n=t.path||"/";return t.with({path:U.resolve.apply(U,j([n],e))})},t.dirname=function(t){var e=U.dirname(t.path);return 1===e.length&&46===e.charCodeAt(0)?t:t.with({path:e})},t.basename=function(t){return U.basename(t.path)},t.extname=function(t){return U.extname(t.path)};}(O||(O={}));}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}return r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]});},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},r(447)})();const{URI,Utils}=LIB;

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var localize$2 = loadMessageBundle();
var FilePatternAssociation = /** @class */ (function () {
    function FilePatternAssociation(pattern, uris) {
        this.patternRegExps = [];
        this.isInclude = [];
        try {
            for (var _i = 0, pattern_1 = pattern; _i < pattern_1.length; _i++) {
                var p = pattern_1[_i];
                var include = p[0] !== '!';
                if (!include) {
                    p = p.substring(1);
                }
                this.patternRegExps.push(new RegExp(convertSimple2RegExpPattern(p) + '$'));
                this.isInclude.push(include);
            }
            this.uris = uris;
        }
        catch (e) {
            // invalid pattern
            this.patternRegExps.length = 0;
            this.isInclude.length = 0;
            this.uris = [];
        }
    }
    FilePatternAssociation.prototype.matchesPattern = function (fileName) {
        var match = false;
        for (var i = 0; i < this.patternRegExps.length; i++) {
            var regExp = this.patternRegExps[i];
            if (regExp.test(fileName)) {
                match = this.isInclude[i];
            }
        }
        return match;
    };
    FilePatternAssociation.prototype.getURIs = function () {
        return this.uris;
    };
    return FilePatternAssociation;
}());
var SchemaHandle = /** @class */ (function () {
    function SchemaHandle(service, url, unresolvedSchemaContent) {
        this.service = service;
        this.url = url;
        this.dependencies = {};
        if (unresolvedSchemaContent) {
            this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
        }
    }
    SchemaHandle.prototype.getUnresolvedSchema = function () {
        if (!this.unresolvedSchema) {
            this.unresolvedSchema = this.service.loadSchema(this.url);
        }
        return this.unresolvedSchema;
    };
    SchemaHandle.prototype.getResolvedSchema = function () {
        var _this = this;
        if (!this.resolvedSchema) {
            this.resolvedSchema = this.getUnresolvedSchema().then(function (unresolved) {
                return _this.service.resolveSchemaContent(unresolved, _this.url, _this.dependencies);
            });
        }
        return this.resolvedSchema;
    };
    SchemaHandle.prototype.clearSchema = function () {
        this.resolvedSchema = undefined;
        this.unresolvedSchema = undefined;
        this.dependencies = {};
    };
    return SchemaHandle;
}());
var UnresolvedSchema = /** @class */ (function () {
    function UnresolvedSchema(schema, errors) {
        if (errors === void 0) { errors = []; }
        this.schema = schema;
        this.errors = errors;
    }
    return UnresolvedSchema;
}());
var ResolvedSchema = /** @class */ (function () {
    function ResolvedSchema(schema, errors) {
        if (errors === void 0) { errors = []; }
        this.schema = schema;
        this.errors = errors;
    }
    ResolvedSchema.prototype.getSection = function (path) {
        var schemaRef = this.getSectionRecursive(path, this.schema);
        if (schemaRef) {
            return asSchema(schemaRef);
        }
        return undefined;
    };
    ResolvedSchema.prototype.getSectionRecursive = function (path, schema) {
        if (!schema || typeof schema === 'boolean' || path.length === 0) {
            return schema;
        }
        var next = path.shift();
        if (schema.properties && typeof schema.properties[next]) {
            return this.getSectionRecursive(path, schema.properties[next]);
        }
        else if (schema.patternProperties) {
            for (var _i = 0, _a = Object.keys(schema.patternProperties); _i < _a.length; _i++) {
                var pattern = _a[_i];
                var regex = new RegExp(pattern);
                if (regex.test(next)) {
                    return this.getSectionRecursive(path, schema.patternProperties[pattern]);
                }
            }
        }
        else if (typeof schema.additionalProperties === 'object') {
            return this.getSectionRecursive(path, schema.additionalProperties);
        }
        else if (next.match('[0-9]+')) {
            if (Array.isArray(schema.items)) {
                var index = parseInt(next, 10);
                if (!isNaN(index) && schema.items[index]) {
                    return this.getSectionRecursive(path, schema.items[index]);
                }
            }
            else if (schema.items) {
                return this.getSectionRecursive(path, schema.items);
            }
        }
        return undefined;
    };
    return ResolvedSchema;
}());
var JSONSchemaService = /** @class */ (function () {
    function JSONSchemaService(requestService, contextService, promiseConstructor) {
        this.contextService = contextService;
        this.requestService = requestService;
        this.promiseConstructor = promiseConstructor || Promise;
        this.callOnDispose = [];
        this.contributionSchemas = {};
        this.contributionAssociations = [];
        this.schemasById = {};
        this.filePatternAssociations = [];
        this.registeredSchemasIds = {};
    }
    JSONSchemaService.prototype.getRegisteredSchemaIds = function (filter) {
        return Object.keys(this.registeredSchemasIds).filter(function (id) {
            var scheme = URI.parse(id).scheme;
            return scheme !== 'schemaservice' && (!filter || filter(scheme));
        });
    };
    Object.defineProperty(JSONSchemaService.prototype, "promise", {
        get: function () {
            return this.promiseConstructor;
        },
        enumerable: false,
        configurable: true
    });
    JSONSchemaService.prototype.dispose = function () {
        while (this.callOnDispose.length > 0) {
            this.callOnDispose.pop()();
        }
    };
    JSONSchemaService.prototype.onResourceChange = function (uri) {
        var _this = this;
        var hasChanges = false;
        uri = normalizeId(uri);
        var toWalk = [uri];
        var all = Object.keys(this.schemasById).map(function (key) { return _this.schemasById[key]; });
        while (toWalk.length) {
            var curr = toWalk.pop();
            for (var i = 0; i < all.length; i++) {
                var handle = all[i];
                if (handle && (handle.url === curr || handle.dependencies[curr])) {
                    if (handle.url !== curr) {
                        toWalk.push(handle.url);
                    }
                    handle.clearSchema();
                    all[i] = undefined;
                    hasChanges = true;
                }
            }
        }
        return hasChanges;
    };
    JSONSchemaService.prototype.setSchemaContributions = function (schemaContributions) {
        if (schemaContributions.schemas) {
            var schemas = schemaContributions.schemas;
            for (var id in schemas) {
                var normalizedId = normalizeId(id);
                this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
            }
        }
        if (Array.isArray(schemaContributions.schemaAssociations)) {
            var schemaAssociations = schemaContributions.schemaAssociations;
            for (var _i = 0, schemaAssociations_1 = schemaAssociations; _i < schemaAssociations_1.length; _i++) {
                var schemaAssociation = schemaAssociations_1[_i];
                var uris = schemaAssociation.uris.map(normalizeId);
                var association = this.addFilePatternAssociation(schemaAssociation.pattern, uris);
                this.contributionAssociations.push(association);
            }
        }
    };
    JSONSchemaService.prototype.addSchemaHandle = function (id, unresolvedSchemaContent) {
        var schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
        this.schemasById[id] = schemaHandle;
        return schemaHandle;
    };
    JSONSchemaService.prototype.getOrAddSchemaHandle = function (id, unresolvedSchemaContent) {
        return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
    };
    JSONSchemaService.prototype.addFilePatternAssociation = function (pattern, uris) {
        var fpa = new FilePatternAssociation(pattern, uris);
        this.filePatternAssociations.push(fpa);
        return fpa;
    };
    JSONSchemaService.prototype.registerExternalSchema = function (uri, filePatterns, unresolvedSchemaContent) {
        var id = normalizeId(uri);
        this.registeredSchemasIds[id] = true;
        this.cachedSchemaForResource = undefined;
        if (filePatterns) {
            this.addFilePatternAssociation(filePatterns, [uri]);
        }
        return unresolvedSchemaContent ? this.addSchemaHandle(id, unresolvedSchemaContent) : this.getOrAddSchemaHandle(id);
    };
    JSONSchemaService.prototype.clearExternalSchemas = function () {
        this.schemasById = {};
        this.filePatternAssociations = [];
        this.registeredSchemasIds = {};
        this.cachedSchemaForResource = undefined;
        for (var id in this.contributionSchemas) {
            this.schemasById[id] = this.contributionSchemas[id];
            this.registeredSchemasIds[id] = true;
        }
        for (var _i = 0, _a = this.contributionAssociations; _i < _a.length; _i++) {
            var contributionAssociation = _a[_i];
            this.filePatternAssociations.push(contributionAssociation);
        }
    };
    JSONSchemaService.prototype.getResolvedSchema = function (schemaId) {
        var id = normalizeId(schemaId);
        var schemaHandle = this.schemasById[id];
        if (schemaHandle) {
            return schemaHandle.getResolvedSchema();
        }
        return this.promise.resolve(undefined);
    };
    JSONSchemaService.prototype.loadSchema = function (url) {
        if (!this.requestService) {
            var errorMessage = localize$2('json.schema.norequestservice', 'Unable to load schema from \'{0}\'. No schema request service available', toDisplayString(url));
            return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
        }
        return this.requestService(url).then(function (content) {
            if (!content) {
                var errorMessage = localize$2('json.schema.nocontent', 'Unable to load schema from \'{0}\': No content.', toDisplayString(url));
                return new UnresolvedSchema({}, [errorMessage]);
            }
            var schemaContent = {};
            var jsonErrors = [];
            schemaContent = parse$1(content, jsonErrors);
            var errors = jsonErrors.length ? [localize$2('json.schema.invalidFormat', 'Unable to parse content from \'{0}\': Parse error at offset {1}.', toDisplayString(url), jsonErrors[0].offset)] : [];
            return new UnresolvedSchema(schemaContent, errors);
        }, function (error) {
            var errorMessage = error.toString();
            var errorSplit = error.toString().split('Error: ');
            if (errorSplit.length > 1) {
                // more concise error message, URL and context are attached by caller anyways
                errorMessage = errorSplit[1];
            }
            if (endsWith(errorMessage, '.')) {
                errorMessage = errorMessage.substr(0, errorMessage.length - 1);
            }
            return new UnresolvedSchema({}, [localize$2('json.schema.nocontent', 'Unable to load schema from \'{0}\': {1}.', toDisplayString(url), errorMessage)]);
        });
    };
    JSONSchemaService.prototype.resolveSchemaContent = function (schemaToResolve, schemaURL, dependencies) {
        var _this = this;
        var resolveErrors = schemaToResolve.errors.slice(0);
        var schema = schemaToResolve.schema;
        if (schema.$schema) {
            var id = normalizeId(schema.$schema);
            if (id === 'http://json-schema.org/draft-03/schema') {
                return this.promise.resolve(new ResolvedSchema({}, [localize$2('json.schema.draft03.notsupported', "Draft-03 schemas are not supported.")]));
            }
            else if (id === 'https://json-schema.org/draft/2019-09/schema') {
                resolveErrors.push(localize$2('json.schema.draft201909.notsupported', "Draft 2019-09 schemas are not yet fully supported."));
            }
        }
        var contextService = this.contextService;
        var findSection = function (schema, path) {
            if (!path) {
                return schema;
            }
            var current = schema;
            if (path[0] === '/') {
                path = path.substr(1);
            }
            path.split('/').some(function (part) {
                current = current[part];
                return !current;
            });
            return current;
        };
        var merge = function (target, sourceRoot, sourceURI, refSegment) {
            var path = refSegment ? decodeURIComponent(refSegment) : undefined;
            var section = findSection(sourceRoot, path);
            if (section) {
                for (var key in section) {
                    if (section.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
                        target[key] = section[key];
                    }
                }
            }
            else {
                resolveErrors.push(localize$2('json.schema.invalidref', '$ref \'{0}\' in \'{1}\' can not be resolved.', path, sourceURI));
            }
        };
        var resolveExternalLink = function (node, uri, refSegment, parentSchemaURL, parentSchemaDependencies) {
            if (contextService && !/^\w+:\/\/.*/.test(uri)) {
                uri = contextService.resolveRelativePath(uri, parentSchemaURL);
            }
            uri = normalizeId(uri);
            var referencedHandle = _this.getOrAddSchemaHandle(uri);
            return referencedHandle.getUnresolvedSchema().then(function (unresolvedSchema) {
                parentSchemaDependencies[uri] = true;
                if (unresolvedSchema.errors.length) {
                    var loc = refSegment ? uri + '#' + refSegment : uri;
                    resolveErrors.push(localize$2('json.schema.problemloadingref', 'Problems loading reference \'{0}\': {1}', loc, unresolvedSchema.errors[0]));
                }
                merge(node, unresolvedSchema.schema, uri, refSegment);
                return resolveRefs(node, unresolvedSchema.schema, uri, referencedHandle.dependencies);
            });
        };
        var resolveRefs = function (node, parentSchema, parentSchemaURL, parentSchemaDependencies) {
            if (!node || typeof node !== 'object') {
                return Promise.resolve(null);
            }
            var toWalk = [node];
            var seen = [];
            var openPromises = [];
            var collectEntries = function () {
                var entries = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    entries[_i] = arguments[_i];
                }
                for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
                    var entry = entries_1[_a];
                    if (typeof entry === 'object') {
                        toWalk.push(entry);
                    }
                }
            };
            var collectMapEntries = function () {
                var maps = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    maps[_i] = arguments[_i];
                }
                for (var _a = 0, maps_1 = maps; _a < maps_1.length; _a++) {
                    var map = maps_1[_a];
                    if (typeof map === 'object') {
                        for (var k in map) {
                            var key = k;
                            var entry = map[key];
                            if (typeof entry === 'object') {
                                toWalk.push(entry);
                            }
                        }
                    }
                }
            };
            var collectArrayEntries = function () {
                var arrays = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arrays[_i] = arguments[_i];
                }
                for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
                    var array = arrays_1[_a];
                    if (Array.isArray(array)) {
                        for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
                            var entry = array_1[_b];
                            if (typeof entry === 'object') {
                                toWalk.push(entry);
                            }
                        }
                    }
                }
            };
            var handleRef = function (next) {
                var seenRefs = [];
                while (next.$ref) {
                    var ref = next.$ref;
                    var segments = ref.split('#', 2);
                    delete next.$ref;
                    if (segments[0].length > 0) {
                        openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentSchemaURL, parentSchemaDependencies));
                        return;
                    }
                    else {
                        if (seenRefs.indexOf(ref) === -1) {
                            merge(next, parentSchema, parentSchemaURL, segments[1]); // can set next.$ref again, use seenRefs to avoid circle
                            seenRefs.push(ref);
                        }
                    }
                }
                collectEntries(next.items, next.additionalItems, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else);
                collectMapEntries(next.definitions, next.properties, next.patternProperties, next.dependencies);
                collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.items);
            };
            while (toWalk.length) {
                var next = toWalk.pop();
                if (seen.indexOf(next) >= 0) {
                    continue;
                }
                seen.push(next);
                handleRef(next);
            }
            return _this.promise.all(openPromises);
        };
        return resolveRefs(schema, schema, schemaURL, dependencies).then(function (_) { return new ResolvedSchema(schema, resolveErrors); });
    };
    JSONSchemaService.prototype.getSchemaForResource = function (resource, document) {
        // first use $schema if present
        if (document && document.root && document.root.type === 'object') {
            var schemaProperties = document.root.properties.filter(function (p) { return (p.keyNode.value === '$schema') && p.valueNode && p.valueNode.type === 'string'; });
            if (schemaProperties.length > 0) {
                var valueNode = schemaProperties[0].valueNode;
                if (valueNode && valueNode.type === 'string') {
                    var schemeId = getNodeValue$2(valueNode);
                    if (schemeId && startsWith(schemeId, '.') && this.contextService) {
                        schemeId = this.contextService.resolveRelativePath(schemeId, resource);
                    }
                    if (schemeId) {
                        var id = normalizeId(schemeId);
                        return this.getOrAddSchemaHandle(id).getResolvedSchema();
                    }
                }
            }
        }
        if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === resource) {
            return this.cachedSchemaForResource.resolvedSchema;
        }
        var seen = Object.create(null);
        var schemas = [];
        var normalizedResource = normalizeResourceForMatching(resource);
        for (var _i = 0, _a = this.filePatternAssociations; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.matchesPattern(normalizedResource)) {
                for (var _b = 0, _c = entry.getURIs(); _b < _c.length; _b++) {
                    var schemaId = _c[_b];
                    if (!seen[schemaId]) {
                        schemas.push(schemaId);
                        seen[schemaId] = true;
                    }
                }
            }
        }
        var resolvedSchema = schemas.length > 0 ? this.createCombinedSchema(resource, schemas).getResolvedSchema() : this.promise.resolve(undefined);
        this.cachedSchemaForResource = { resource: resource, resolvedSchema: resolvedSchema };
        return resolvedSchema;
    };
    JSONSchemaService.prototype.createCombinedSchema = function (resource, schemaIds) {
        if (schemaIds.length === 1) {
            return this.getOrAddSchemaHandle(schemaIds[0]);
        }
        else {
            var combinedSchemaId = 'schemaservice://combinedSchema/' + encodeURIComponent(resource);
            var combinedSchema = {
                allOf: schemaIds.map(function (schemaId) { return ({ $ref: schemaId }); })
            };
            return this.addSchemaHandle(combinedSchemaId, combinedSchema);
        }
    };
    JSONSchemaService.prototype.getMatchingSchemas = function (document, jsonDocument, schema) {
        if (schema) {
            var id = schema.id || ('schemaservice://untitled/matchingSchemas/' + idCounter++);
            return this.resolveSchemaContent(new UnresolvedSchema(schema), id, {}).then(function (resolvedSchema) {
                return jsonDocument.getMatchingSchemas(resolvedSchema.schema).filter(function (s) { return !s.inverted; });
            });
        }
        return this.getSchemaForResource(document.uri, jsonDocument).then(function (schema) {
            if (schema) {
                return jsonDocument.getMatchingSchemas(schema.schema).filter(function (s) { return !s.inverted; });
            }
            return [];
        });
    };
    return JSONSchemaService;
}());
var idCounter = 0;
function normalizeId(id) {
    // remove trailing '#', normalize drive capitalization
    try {
        return URI.parse(id).toString();
    }
    catch (e) {
        return id;
    }
}
function normalizeResourceForMatching(resource) {
    // remove querues and fragments, normalize drive capitalization
    try {
        return URI.parse(resource).with({ fragment: null, query: null }).toString();
    }
    catch (e) {
        return resource;
    }
}
function toDisplayString(url) {
    try {
        var uri = URI.parse(url);
        if (uri.scheme === 'file') {
            return uri.fsPath;
        }
    }
    catch (e) {
        // ignore
    }
    return url;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var localize$3 = loadMessageBundle();
var schemaContributions = {
    schemaAssociations: [],
    schemas: {
        // refer to the latest schema
        'http://json-schema.org/schema#': {
            $ref: 'http://json-schema.org/draft-07/schema#'
        },
        // bundle the schema-schema to include (localized) descriptions
        'http://json-schema.org/draft-04/schema#': {
            'title': localize$3('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
            '$schema': 'http://json-schema.org/draft-04/schema#',
            'definitions': {
                'schemaArray': {
                    'type': 'array',
                    'minItems': 1,
                    'items': {
                        '$ref': '#'
                    }
                },
                'positiveInteger': {
                    'type': 'integer',
                    'minimum': 0
                },
                'positiveIntegerDefault0': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveInteger'
                        },
                        {
                            'default': 0
                        }
                    ]
                },
                'simpleTypes': {
                    'type': 'string',
                    'enum': [
                        'array',
                        'boolean',
                        'integer',
                        'null',
                        'number',
                        'object',
                        'string'
                    ]
                },
                'stringArray': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    },
                    'minItems': 1,
                    'uniqueItems': true
                }
            },
            'type': 'object',
            'properties': {
                'id': {
                    'type': 'string',
                    'format': 'uri'
                },
                '$schema': {
                    'type': 'string',
                    'format': 'uri'
                },
                'title': {
                    'type': 'string'
                },
                'description': {
                    'type': 'string'
                },
                'default': {},
                'multipleOf': {
                    'type': 'number',
                    'minimum': 0,
                    'exclusiveMinimum': true
                },
                'maximum': {
                    'type': 'number'
                },
                'exclusiveMaximum': {
                    'type': 'boolean',
                    'default': false
                },
                'minimum': {
                    'type': 'number'
                },
                'exclusiveMinimum': {
                    'type': 'boolean',
                    'default': false
                },
                'maxLength': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveInteger'
                        }
                    ]
                },
                'minLength': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveIntegerDefault0'
                        }
                    ]
                },
                'pattern': {
                    'type': 'string',
                    'format': 'regex'
                },
                'additionalItems': {
                    'anyOf': [
                        {
                            'type': 'boolean'
                        },
                        {
                            '$ref': '#'
                        }
                    ],
                    'default': {}
                },
                'items': {
                    'anyOf': [
                        {
                            '$ref': '#'
                        },
                        {
                            '$ref': '#/definitions/schemaArray'
                        }
                    ],
                    'default': {}
                },
                'maxItems': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveInteger'
                        }
                    ]
                },
                'minItems': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveIntegerDefault0'
                        }
                    ]
                },
                'uniqueItems': {
                    'type': 'boolean',
                    'default': false
                },
                'maxProperties': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveInteger'
                        }
                    ]
                },
                'minProperties': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/positiveIntegerDefault0'
                        }
                    ]
                },
                'required': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/stringArray'
                        }
                    ]
                },
                'additionalProperties': {
                    'anyOf': [
                        {
                            'type': 'boolean'
                        },
                        {
                            '$ref': '#'
                        }
                    ],
                    'default': {}
                },
                'definitions': {
                    'type': 'object',
                    'additionalProperties': {
                        '$ref': '#'
                    },
                    'default': {}
                },
                'properties': {
                    'type': 'object',
                    'additionalProperties': {
                        '$ref': '#'
                    },
                    'default': {}
                },
                'patternProperties': {
                    'type': 'object',
                    'additionalProperties': {
                        '$ref': '#'
                    },
                    'default': {}
                },
                'dependencies': {
                    'type': 'object',
                    'additionalProperties': {
                        'anyOf': [
                            {
                                '$ref': '#'
                            },
                            {
                                '$ref': '#/definitions/stringArray'
                            }
                        ]
                    }
                },
                'enum': {
                    'type': 'array',
                    'minItems': 1,
                    'uniqueItems': true
                },
                'type': {
                    'anyOf': [
                        {
                            '$ref': '#/definitions/simpleTypes'
                        },
                        {
                            'type': 'array',
                            'items': {
                                '$ref': '#/definitions/simpleTypes'
                            },
                            'minItems': 1,
                            'uniqueItems': true
                        }
                    ]
                },
                'format': {
                    'anyOf': [
                        {
                            'type': 'string',
                            'enum': [
                                'date-time',
                                'uri',
                                'email',
                                'hostname',
                                'ipv4',
                                'ipv6',
                                'regex'
                            ]
                        },
                        {
                            'type': 'string'
                        }
                    ]
                },
                'allOf': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/schemaArray'
                        }
                    ]
                },
                'anyOf': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/schemaArray'
                        }
                    ]
                },
                'oneOf': {
                    'allOf': [
                        {
                            '$ref': '#/definitions/schemaArray'
                        }
                    ]
                },
                'not': {
                    'allOf': [
                        {
                            '$ref': '#'
                        }
                    ]
                }
            },
            'dependencies': {
                'exclusiveMaximum': [
                    'maximum'
                ],
                'exclusiveMinimum': [
                    'minimum'
                ]
            },
            'default': {}
        },
        'http://json-schema.org/draft-07/schema#': {
            'title': localize$3('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
            'definitions': {
                'schemaArray': {
                    'type': 'array',
                    'minItems': 1,
                    'items': { '$ref': '#' }
                },
                'nonNegativeInteger': {
                    'type': 'integer',
                    'minimum': 0
                },
                'nonNegativeIntegerDefault0': {
                    'allOf': [
                        { '$ref': '#/definitions/nonNegativeInteger' },
                        { 'default': 0 }
                    ]
                },
                'simpleTypes': {
                    'enum': [
                        'array',
                        'boolean',
                        'integer',
                        'null',
                        'number',
                        'object',
                        'string'
                    ]
                },
                'stringArray': {
                    'type': 'array',
                    'items': { 'type': 'string' },
                    'uniqueItems': true,
                    'default': []
                }
            },
            'type': ['object', 'boolean'],
            'properties': {
                '$id': {
                    'type': 'string',
                    'format': 'uri-reference'
                },
                '$schema': {
                    'type': 'string',
                    'format': 'uri'
                },
                '$ref': {
                    'type': 'string',
                    'format': 'uri-reference'
                },
                '$comment': {
                    'type': 'string'
                },
                'title': {
                    'type': 'string'
                },
                'description': {
                    'type': 'string'
                },
                'default': true,
                'readOnly': {
                    'type': 'boolean',
                    'default': false
                },
                'examples': {
                    'type': 'array',
                    'items': true
                },
                'multipleOf': {
                    'type': 'number',
                    'exclusiveMinimum': 0
                },
                'maximum': {
                    'type': 'number'
                },
                'exclusiveMaximum': {
                    'type': 'number'
                },
                'minimum': {
                    'type': 'number'
                },
                'exclusiveMinimum': {
                    'type': 'number'
                },
                'maxLength': { '$ref': '#/definitions/nonNegativeInteger' },
                'minLength': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
                'pattern': {
                    'type': 'string',
                    'format': 'regex'
                },
                'additionalItems': { '$ref': '#' },
                'items': {
                    'anyOf': [
                        { '$ref': '#' },
                        { '$ref': '#/definitions/schemaArray' }
                    ],
                    'default': true
                },
                'maxItems': { '$ref': '#/definitions/nonNegativeInteger' },
                'minItems': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
                'uniqueItems': {
                    'type': 'boolean',
                    'default': false
                },
                'contains': { '$ref': '#' },
                'maxProperties': { '$ref': '#/definitions/nonNegativeInteger' },
                'minProperties': { '$ref': '#/definitions/nonNegativeIntegerDefault0' },
                'required': { '$ref': '#/definitions/stringArray' },
                'additionalProperties': { '$ref': '#' },
                'definitions': {
                    'type': 'object',
                    'additionalProperties': { '$ref': '#' },
                    'default': {}
                },
                'properties': {
                    'type': 'object',
                    'additionalProperties': { '$ref': '#' },
                    'default': {}
                },
                'patternProperties': {
                    'type': 'object',
                    'additionalProperties': { '$ref': '#' },
                    'propertyNames': { 'format': 'regex' },
                    'default': {}
                },
                'dependencies': {
                    'type': 'object',
                    'additionalProperties': {
                        'anyOf': [
                            { '$ref': '#' },
                            { '$ref': '#/definitions/stringArray' }
                        ]
                    }
                },
                'propertyNames': { '$ref': '#' },
                'const': true,
                'enum': {
                    'type': 'array',
                    'items': true,
                    'minItems': 1,
                    'uniqueItems': true
                },
                'type': {
                    'anyOf': [
                        { '$ref': '#/definitions/simpleTypes' },
                        {
                            'type': 'array',
                            'items': { '$ref': '#/definitions/simpleTypes' },
                            'minItems': 1,
                            'uniqueItems': true
                        }
                    ]
                },
                'format': { 'type': 'string' },
                'contentMediaType': { 'type': 'string' },
                'contentEncoding': { 'type': 'string' },
                'if': { '$ref': '#' },
                'then': { '$ref': '#' },
                'else': { '$ref': '#' },
                'allOf': { '$ref': '#/definitions/schemaArray' },
                'anyOf': { '$ref': '#/definitions/schemaArray' },
                'oneOf': { '$ref': '#/definitions/schemaArray' },
                'not': { '$ref': '#' }
            },
            'default': true
        }
    }
};
var descriptions = {
    id: localize$3('schema.json.id', "A unique identifier for the schema."),
    $schema: localize$3('schema.json.$schema', "The schema to verify this document against."),
    title: localize$3('schema.json.title', "A descriptive title of the element."),
    description: localize$3('schema.json.description', "A long description of the element. Used in hover menus and suggestions."),
    default: localize$3('schema.json.default', "A default value. Used by suggestions."),
    multipleOf: localize$3('schema.json.multipleOf', "A number that should cleanly divide the current value (i.e. have no remainder)."),
    maximum: localize$3('schema.json.maximum', "The maximum numerical value, inclusive by default."),
    exclusiveMaximum: localize$3('schema.json.exclusiveMaximum', "Makes the maximum property exclusive."),
    minimum: localize$3('schema.json.minimum', "The minimum numerical value, inclusive by default."),
    exclusiveMinimum: localize$3('schema.json.exclusiveMininum', "Makes the minimum property exclusive."),
    maxLength: localize$3('schema.json.maxLength', "The maximum length of a string."),
    minLength: localize$3('schema.json.minLength', "The minimum length of a string."),
    pattern: localize$3('schema.json.pattern', "A regular expression to match the string against. It is not implicitly anchored."),
    additionalItems: localize$3('schema.json.additionalItems', "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
    items: localize$3('schema.json.items', "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
    maxItems: localize$3('schema.json.maxItems', "The maximum number of items that can be inside an array. Inclusive."),
    minItems: localize$3('schema.json.minItems', "The minimum number of items that can be inside an array. Inclusive."),
    uniqueItems: localize$3('schema.json.uniqueItems', "If all of the items in the array must be unique. Defaults to false."),
    maxProperties: localize$3('schema.json.maxProperties', "The maximum number of properties an object can have. Inclusive."),
    minProperties: localize$3('schema.json.minProperties', "The minimum number of properties an object can have. Inclusive."),
    required: localize$3('schema.json.required', "An array of strings that lists the names of all properties required on this object."),
    additionalProperties: localize$3('schema.json.additionalProperties', "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
    definitions: localize$3('schema.json.definitions', "Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
    properties: localize$3('schema.json.properties', "A map of property names to schemas for each property."),
    patternProperties: localize$3('schema.json.patternProperties', "A map of regular expressions on property names to schemas for matching properties."),
    dependencies: localize$3('schema.json.dependencies', "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
    enum: localize$3('schema.json.enum', "The set of literal values that are valid."),
    type: localize$3('schema.json.type', "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
    format: localize$3('schema.json.format', "Describes the format expected for the value."),
    allOf: localize$3('schema.json.allOf', "An array of schemas, all of which must match."),
    anyOf: localize$3('schema.json.anyOf', "An array of schemas, where at least one must match."),
    oneOf: localize$3('schema.json.oneOf', "An array of schemas, exactly one of which must match."),
    not: localize$3('schema.json.not', "A schema which must not match."),
    $id: localize$3('schema.json.$id', "A unique identifier for the schema."),
    $ref: localize$3('schema.json.$ref', "Reference a definition hosted on any location."),
    $comment: localize$3('schema.json.$comment', "Comments from schema authors to readers or maintainers of the schema."),
    readOnly: localize$3('schema.json.readOnly', "Indicates that the value of the instance is managed exclusively by the owning authority."),
    examples: localize$3('schema.json.examples', "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
    contains: localize$3('schema.json.contains', "An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
    propertyNames: localize$3('schema.json.propertyNames', "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
    const: localize$3('schema.json.const', "An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
    contentMediaType: localize$3('schema.json.contentMediaType', "Describes the media type of a string property."),
    contentEncoding: localize$3('schema.json.contentEncoding', "Describes the content encoding of a string property."),
    if: localize$3('schema.json.if', "The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
    then: localize$3('schema.json.then', "The \"if\" subschema is used for validation when the \"if\" subschema succeeds."),
    else: localize$3('schema.json.else', "The \"else\" subschema is used for validation when the \"if\" subschema fails.")
};
for (var schemaName in schemaContributions.schemas) {
    var schema = schemaContributions.schemas[schemaName];
    for (var property in schema.properties) {
        var propertyObject = schema.properties[property];
        if (typeof propertyObject === 'boolean') {
            propertyObject = schema.properties[property] = {};
        }
        var description = descriptions[property];
        if (description) {
            propertyObject['description'] = description;
        }
        else {
            console.log(property + ": localize('schema.json." + property + "', \"\")");
        }
    }
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// --- diagnostics --- ---
var DiagnosticsAdapter = /** @class */ (function () {
    function DiagnosticsAdapter(_languageId, _worker, defaults) {
        var _this = this;
        this._languageId = _languageId;
        this._worker = _worker;
        this._disposables = [];
        this._listener = Object.create(null);
        var onModelAdd = function (model) {
            var modeId = model.getModeId();
            if (modeId !== _this._languageId) {
                return;
            }
            var handle;
            _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
                clearTimeout(handle);
                handle = setTimeout(function () { return _this._doValidate(model.uri, modeId); }, 500);
            });
            _this._doValidate(model.uri, modeId);
        };
        var onModelRemoved = function (model) {
            editor.setModelMarkers(model, _this._languageId, []);
            var uriStr = model.uri.toString();
            var listener = _this._listener[uriStr];
            if (listener) {
                listener.dispose();
                delete _this._listener[uriStr];
            }
        };
        this._disposables.push(editor.onDidCreateModel(onModelAdd));
        this._disposables.push(editor.onWillDisposeModel(function (model) {
            onModelRemoved(model);
            _this._resetSchema(model.uri);
        }));
        this._disposables.push(editor.onDidChangeModelLanguage(function (event) {
            onModelRemoved(event.model);
            onModelAdd(event.model);
            _this._resetSchema(event.model.uri);
        }));
        this._disposables.push(defaults.onDidChange(function (_) {
            editor.getModels().forEach(function (model) {
                if (model.getModeId() === _this._languageId) {
                    onModelRemoved(model);
                    onModelAdd(model);
                }
            });
        }));
        this._disposables.push({
            dispose: function () {
                editor.getModels().forEach(onModelRemoved);
                for (var key in _this._listener) {
                    _this._listener[key].dispose();
                }
            }
        });
        editor.getModels().forEach(onModelAdd);
    }
    DiagnosticsAdapter.prototype.dispose = function () {
        this._disposables.forEach(function (d) { return d && d.dispose(); });
        this._disposables = [];
    };
    DiagnosticsAdapter.prototype._resetSchema = function (resource) {
        this._worker().then(function (worker) {
            worker.resetSchema(resource.toString());
        });
    };
    DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
        this._worker(resource)
            .then(function (worker) {
            return worker.doValidation(resource.toString()).then(function (diagnostics) {
                var markers = diagnostics.map(function (d) { return toDiagnostics(resource, d); });
                var model = editor.getModel(resource);
                if (model && model.getModeId() === languageId) {
                    editor.setModelMarkers(model, languageId, markers);
                }
            });
        })
            .then(undefined, function (err) {
            console.error(err);
        });
    };
    return DiagnosticsAdapter;
}());
function toSeverity(lsSeverity) {
    switch (lsSeverity) {
        case DiagnosticSeverity.Error:
            return MarkerSeverity.Error;
        case DiagnosticSeverity.Warning:
            return MarkerSeverity.Warning;
        case DiagnosticSeverity.Information:
            return MarkerSeverity.Info;
        case DiagnosticSeverity.Hint:
            return MarkerSeverity.Hint;
        default:
            return MarkerSeverity.Info;
    }
}
function toDiagnostics(resource, diag) {
    var code = typeof diag.code === 'number' ? String(diag.code) : diag.code;
    return {
        severity: toSeverity(diag.severity),
        startLineNumber: diag.range.start.line + 1,
        startColumn: diag.range.start.character + 1,
        endLineNumber: diag.range.end.line + 1,
        endColumn: diag.range.end.character + 1,
        message: diag.message,
        code: code,
        source: diag.source
    };
}
// --- completion ------
function fromPosition(position) {
    if (!position) {
        return void 0;
    }
    return { character: position.column - 1, line: position.lineNumber - 1 };
}
function fromRange(range) {
    if (!range) {
        return void 0;
    }
    return {
        start: {
            line: range.startLineNumber - 1,
            character: range.startColumn - 1
        },
        end: { line: range.endLineNumber - 1, character: range.endColumn - 1 }
    };
}
function toRange(range) {
    if (!range) {
        return void 0;
    }
    return new Range$1(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}
function isInsertReplaceEdit(edit) {
    return (typeof edit.insert !== 'undefined' &&
        typeof edit.replace !== 'undefined');
}
function toCompletionItemKind(kind) {
    var mItemKind = languages.CompletionItemKind;
    switch (kind) {
        case CompletionItemKind.Text:
            return mItemKind.Text;
        case CompletionItemKind.Method:
            return mItemKind.Method;
        case CompletionItemKind.Function:
            return mItemKind.Function;
        case CompletionItemKind.Constructor:
            return mItemKind.Constructor;
        case CompletionItemKind.Field:
            return mItemKind.Field;
        case CompletionItemKind.Variable:
            return mItemKind.Variable;
        case CompletionItemKind.Class:
            return mItemKind.Class;
        case CompletionItemKind.Interface:
            return mItemKind.Interface;
        case CompletionItemKind.Module:
            return mItemKind.Module;
        case CompletionItemKind.Property:
            return mItemKind.Property;
        case CompletionItemKind.Unit:
            return mItemKind.Unit;
        case CompletionItemKind.Value:
            return mItemKind.Value;
        case CompletionItemKind.Enum:
            return mItemKind.Enum;
        case CompletionItemKind.Keyword:
            return mItemKind.Keyword;
        case CompletionItemKind.Snippet:
            return mItemKind.Snippet;
        case CompletionItemKind.Color:
            return mItemKind.Color;
        case CompletionItemKind.File:
            return mItemKind.File;
        case CompletionItemKind.Reference:
            return mItemKind.Reference;
    }
    return mItemKind.Property;
}
function toTextEdit(textEdit) {
    if (!textEdit) {
        return void 0;
    }
    return {
        range: toRange(textEdit.range),
        text: textEdit.newText
    };
}
var CompletionAdapter = /** @class */ (function () {
    function CompletionAdapter(_worker) {
        this._worker = _worker;
    }
    Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
        get: function () {
            return [' ', ':'];
        },
        enumerable: false,
        configurable: true
    });
    CompletionAdapter.prototype.provideCompletionItems = function (model, position, context, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.doComplete(resource.toString(), fromPosition(position));
        })
            .then(function (info) {
            if (!info) {
                return;
            }
            var wordInfo = model.getWordUntilPosition(position);
            var wordRange = new Range$1(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
            var items = info.items.map(function (entry) {
                var item = {
                    label: entry.label,
                    insertText: entry.insertText || entry.label,
                    sortText: entry.sortText,
                    filterText: entry.filterText,
                    documentation: entry.documentation,
                    detail: entry.detail,
                    range: wordRange,
                    kind: toCompletionItemKind(entry.kind)
                };
                if (entry.textEdit) {
                    if (isInsertReplaceEdit(entry.textEdit)) {
                        item.range = {
                            insert: toRange(entry.textEdit.insert),
                            replace: toRange(entry.textEdit.replace)
                        };
                    }
                    else {
                        item.range = toRange(entry.textEdit.range);
                    }
                    item.insertText = entry.textEdit.newText;
                }
                if (entry.additionalTextEdits) {
                    item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
                }
                if (entry.insertTextFormat === InsertTextFormat.Snippet) {
                    item.insertTextRules = languages.CompletionItemInsertTextRule.InsertAsSnippet;
                }
                return item;
            });
            return {
                isIncomplete: info.isIncomplete,
                suggestions: items
            };
        });
    };
    return CompletionAdapter;
}());
function isMarkupContent(thing) {
    return (thing &&
        typeof thing === 'object' &&
        typeof thing.kind === 'string');
}
function toMarkdownString(entry) {
    if (typeof entry === 'string') {
        return {
            value: entry
        };
    }
    if (isMarkupContent(entry)) {
        if (entry.kind === 'plaintext') {
            return {
                value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
            };
        }
        return {
            value: entry.value
        };
    }
    return { value: '```' + entry.language + '\n' + entry.value + '\n```\n' };
}
function toMarkedStringArray(contents) {
    if (!contents) {
        return void 0;
    }
    if (Array.isArray(contents)) {
        return contents.map(toMarkdownString);
    }
    return [toMarkdownString(contents)];
}
// --- hover ------
var HoverAdapter = /** @class */ (function () {
    function HoverAdapter(_worker) {
        this._worker = _worker;
    }
    HoverAdapter.prototype.provideHover = function (model, position, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.doHover(resource.toString(), fromPosition(position));
        })
            .then(function (info) {
            if (!info) {
                return;
            }
            return {
                range: toRange(info.range),
                contents: toMarkedStringArray(info.contents)
            };
        });
    };
    return HoverAdapter;
}());
// --- document symbols ------
function toSymbolKind(kind) {
    var mKind = languages.SymbolKind;
    switch (kind) {
        case SymbolKind.File:
            return mKind.Array;
        case SymbolKind.Module:
            return mKind.Module;
        case SymbolKind.Namespace:
            return mKind.Namespace;
        case SymbolKind.Package:
            return mKind.Package;
        case SymbolKind.Class:
            return mKind.Class;
        case SymbolKind.Method:
            return mKind.Method;
        case SymbolKind.Property:
            return mKind.Property;
        case SymbolKind.Field:
            return mKind.Field;
        case SymbolKind.Constructor:
            return mKind.Constructor;
        case SymbolKind.Enum:
            return mKind.Enum;
        case SymbolKind.Interface:
            return mKind.Interface;
        case SymbolKind.Function:
            return mKind.Function;
        case SymbolKind.Variable:
            return mKind.Variable;
        case SymbolKind.Constant:
            return mKind.Constant;
        case SymbolKind.String:
            return mKind.String;
        case SymbolKind.Number:
            return mKind.Number;
        case SymbolKind.Boolean:
            return mKind.Boolean;
        case SymbolKind.Array:
            return mKind.Array;
    }
    return mKind.Function;
}
var DocumentSymbolAdapter = /** @class */ (function () {
    function DocumentSymbolAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentSymbolAdapter.prototype.provideDocumentSymbols = function (model, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) { return worker.findDocumentSymbols(resource.toString()); })
            .then(function (items) {
            if (!items) {
                return;
            }
            return items.map(function (item) { return ({
                name: item.name,
                detail: '',
                containerName: item.containerName,
                kind: toSymbolKind(item.kind),
                range: toRange(item.location.range),
                selectionRange: toRange(item.location.range),
                tags: []
            }); });
        });
    };
    return DocumentSymbolAdapter;
}());
function fromFormattingOptions(options) {
    return {
        tabSize: options.tabSize,
        insertSpaces: options.insertSpaces
    };
}
var DocumentFormattingEditProvider = /** @class */ (function () {
    function DocumentFormattingEditProvider(_worker) {
        this._worker = _worker;
    }
    DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (model, options, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) {
            return worker
                .format(resource.toString(), null, fromFormattingOptions(options))
                .then(function (edits) {
                if (!edits || edits.length === 0) {
                    return;
                }
                return edits.map(toTextEdit);
            });
        });
    };
    return DocumentFormattingEditProvider;
}());
var DocumentRangeFormattingEditProvider = /** @class */ (function () {
    function DocumentRangeFormattingEditProvider(_worker) {
        this._worker = _worker;
    }
    DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
        var resource = model.uri;
        return this._worker(resource).then(function (worker) {
            return worker
                .format(resource.toString(), fromRange(range), fromFormattingOptions(options))
                .then(function (edits) {
                if (!edits || edits.length === 0) {
                    return;
                }
                return edits.map(toTextEdit);
            });
        });
    };
    return DocumentRangeFormattingEditProvider;
}());
var DocumentColorAdapter = /** @class */ (function () {
    function DocumentColorAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentColorAdapter.prototype.provideDocumentColors = function (model, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) { return worker.findDocumentColors(resource.toString()); })
            .then(function (infos) {
            if (!infos) {
                return;
            }
            return infos.map(function (item) { return ({
                color: item.color,
                range: toRange(item.range)
            }); });
        });
    };
    DocumentColorAdapter.prototype.provideColorPresentations = function (model, info, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range));
        })
            .then(function (presentations) {
            if (!presentations) {
                return;
            }
            return presentations.map(function (presentation) {
                var item = {
                    label: presentation.label
                };
                if (presentation.textEdit) {
                    item.textEdit = toTextEdit(presentation.textEdit);
                }
                if (presentation.additionalTextEdits) {
                    item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
                }
                return item;
            });
        });
    };
    return DocumentColorAdapter;
}());
var FoldingRangeAdapter = /** @class */ (function () {
    function FoldingRangeAdapter(_worker) {
        this._worker = _worker;
    }
    FoldingRangeAdapter.prototype.provideFoldingRanges = function (model, context, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) { return worker.getFoldingRanges(resource.toString(), context); })
            .then(function (ranges) {
            if (!ranges) {
                return;
            }
            return ranges.map(function (range) {
                var result = {
                    start: range.startLine + 1,
                    end: range.endLine + 1
                };
                if (typeof range.kind !== 'undefined') {
                    result.kind = toFoldingRangeKind(range.kind);
                }
                return result;
            });
        });
    };
    return FoldingRangeAdapter;
}());
function toFoldingRangeKind(kind) {
    switch (kind) {
        case FoldingRangeKind.Comment:
            return languages.FoldingRangeKind.Comment;
        case FoldingRangeKind.Imports:
            return languages.FoldingRangeKind.Imports;
        case FoldingRangeKind.Region:
            return languages.FoldingRangeKind.Region;
    }
    return void 0;
}
var SelectionRangeAdapter = /** @class */ (function () {
    function SelectionRangeAdapter(_worker) {
        this._worker = _worker;
    }
    SelectionRangeAdapter.prototype.provideSelectionRanges = function (model, positions, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) { return worker.getSelectionRanges(resource.toString(), positions.map(fromPosition)); })
            .then(function (selectionRanges) {
            if (!selectionRanges) {
                return;
            }
            return selectionRanges.map(function (selectionRange) {
                var result = [];
                while (selectionRange) {
                    result.push({ range: toRange(selectionRange.range) });
                    selectionRange = selectionRange.parent;
                }
                return result;
            });
        });
    };
    return SelectionRangeAdapter;
}());

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function createTokenizationSupport(supportComments) {
    return {
        getInitialState: function () { return new JSONState(null, null, false, null); },
        tokenize: function (line, state, offsetDelta, stopAtOffset) {
            return tokenize(supportComments, line, state, offsetDelta);
        }
    };
}
var TOKEN_DELIM_OBJECT = 'delimiter.bracket.json';
var TOKEN_DELIM_ARRAY = 'delimiter.array.json';
var TOKEN_DELIM_COLON = 'delimiter.colon.json';
var TOKEN_DELIM_COMMA = 'delimiter.comma.json';
var TOKEN_VALUE_BOOLEAN = 'keyword.json';
var TOKEN_VALUE_NULL = 'keyword.json';
var TOKEN_VALUE_STRING = 'string.value.json';
var TOKEN_VALUE_NUMBER = 'number.json';
var TOKEN_PROPERTY_NAME = 'string.key.json';
var TOKEN_COMMENT_BLOCK = 'comment.block.json';
var TOKEN_COMMENT_LINE = 'comment.line.json';
var ParentsStack = /** @class */ (function () {
    function ParentsStack(parent, type) {
        this.parent = parent;
        this.type = type;
    }
    ParentsStack.pop = function (parents) {
        if (parents) {
            return parents.parent;
        }
        return null;
    };
    ParentsStack.push = function (parents, type) {
        return new ParentsStack(parents, type);
    };
    ParentsStack.equals = function (a, b) {
        if (!a && !b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        while (a && b) {
            if (a === b) {
                return true;
            }
            if (a.type !== b.type) {
                return false;
            }
            a = a.parent;
            b = b.parent;
        }
        return true;
    };
    return ParentsStack;
}());
var JSONState = /** @class */ (function () {
    function JSONState(state, scanError, lastWasColon, parents) {
        this._state = state;
        this.scanError = scanError;
        this.lastWasColon = lastWasColon;
        this.parents = parents;
    }
    JSONState.prototype.clone = function () {
        return new JSONState(this._state, this.scanError, this.lastWasColon, this.parents);
    };
    JSONState.prototype.equals = function (other) {
        if (other === this) {
            return true;
        }
        if (!other || !(other instanceof JSONState)) {
            return false;
        }
        return (this.scanError === other.scanError &&
            this.lastWasColon === other.lastWasColon &&
            ParentsStack.equals(this.parents, other.parents));
    };
    JSONState.prototype.getStateData = function () {
        return this._state;
    };
    JSONState.prototype.setStateData = function (state) {
        this._state = state;
    };
    return JSONState;
}());
function tokenize(comments, line, state, offsetDelta, stopAtOffset) {
    if (offsetDelta === void 0) { offsetDelta = 0; }
    // handle multiline strings and block comments
    var numberOfInsertedCharacters = 0;
    var adjustOffset = false;
    switch (state.scanError) {
        case 2 /* UnexpectedEndOfString */:
            line = '"' + line;
            numberOfInsertedCharacters = 1;
            break;
        case 1 /* UnexpectedEndOfComment */:
            line = '/*' + line;
            numberOfInsertedCharacters = 2;
            break;
    }
    var scanner = createScanner$1(line);
    var lastWasColon = state.lastWasColon;
    var parents = state.parents;
    var ret = {
        tokens: [],
        endState: state.clone()
    };
    while (true) {
        var offset = offsetDelta + scanner.getPosition();
        var type = '';
        var kind = scanner.scan();
        if (kind === 17 /* EOF */) {
            break;
        }
        // Check that the scanner has advanced
        if (offset === offsetDelta + scanner.getPosition()) {
            throw new Error('Scanner did not advance, next 3 characters are: ' + line.substr(scanner.getPosition(), 3));
        }
        // In case we inserted /* or " character, we need to
        // adjust the offset of all tokens (except the first)
        if (adjustOffset) {
            offset -= numberOfInsertedCharacters;
        }
        adjustOffset = numberOfInsertedCharacters > 0;
        // brackets and type
        switch (kind) {
            case 1 /* OpenBraceToken */:
                parents = ParentsStack.push(parents, 0 /* Object */);
                type = TOKEN_DELIM_OBJECT;
                lastWasColon = false;
                break;
            case 2 /* CloseBraceToken */:
                parents = ParentsStack.pop(parents);
                type = TOKEN_DELIM_OBJECT;
                lastWasColon = false;
                break;
            case 3 /* OpenBracketToken */:
                parents = ParentsStack.push(parents, 1 /* Array */);
                type = TOKEN_DELIM_ARRAY;
                lastWasColon = false;
                break;
            case 4 /* CloseBracketToken */:
                parents = ParentsStack.pop(parents);
                type = TOKEN_DELIM_ARRAY;
                lastWasColon = false;
                break;
            case 6 /* ColonToken */:
                type = TOKEN_DELIM_COLON;
                lastWasColon = true;
                break;
            case 5 /* CommaToken */:
                type = TOKEN_DELIM_COMMA;
                lastWasColon = false;
                break;
            case 8 /* TrueKeyword */:
            case 9 /* FalseKeyword */:
                type = TOKEN_VALUE_BOOLEAN;
                lastWasColon = false;
                break;
            case 7 /* NullKeyword */:
                type = TOKEN_VALUE_NULL;
                lastWasColon = false;
                break;
            case 10 /* StringLiteral */:
                var currentParent = parents ? parents.type : 0 /* Object */;
                var inArray = currentParent === 1 /* Array */;
                type =
                    lastWasColon || inArray ? TOKEN_VALUE_STRING : TOKEN_PROPERTY_NAME;
                lastWasColon = false;
                break;
            case 11 /* NumericLiteral */:
                type = TOKEN_VALUE_NUMBER;
                lastWasColon = false;
                break;
        }
        // comments, iff enabled
        if (comments) {
            switch (kind) {
                case 12 /* LineCommentTrivia */:
                    type = TOKEN_COMMENT_LINE;
                    break;
                case 13 /* BlockCommentTrivia */:
                    type = TOKEN_COMMENT_BLOCK;
                    break;
            }
        }
        ret.endState = new JSONState(state.getStateData(), scanner.getTokenError(), lastWasColon, parents);
        ret.tokens.push({
            startIndex: offset,
            scopes: type
        });
    }
    return ret;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function setupMode(defaults) {
    var disposables = [];
    var providers = [];
    var client = new WorkerManager(defaults);
    disposables.push(client);
    var worker = function () {
        var uris = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uris[_i] = arguments[_i];
        }
        return client.getLanguageServiceWorker.apply(client, uris);
    };
    function registerProviders() {
        var languageId = defaults.languageId, modeConfiguration = defaults.modeConfiguration;
        disposeAll(providers);
        if (modeConfiguration.documentFormattingEdits) {
            providers.push(languages.registerDocumentFormattingEditProvider(languageId, new DocumentFormattingEditProvider(worker)));
        }
        if (modeConfiguration.documentRangeFormattingEdits) {
            providers.push(languages.registerDocumentRangeFormattingEditProvider(languageId, new DocumentRangeFormattingEditProvider(worker)));
        }
        if (modeConfiguration.completionItems) {
            providers.push(languages.registerCompletionItemProvider(languageId, new CompletionAdapter(worker)));
        }
        if (modeConfiguration.hovers) {
            providers.push(languages.registerHoverProvider(languageId, new HoverAdapter(worker)));
        }
        if (modeConfiguration.documentSymbols) {
            providers.push(languages.registerDocumentSymbolProvider(languageId, new DocumentSymbolAdapter(worker)));
        }
        if (modeConfiguration.tokens) {
            providers.push(languages.setTokensProvider(languageId, createTokenizationSupport(true)));
        }
        if (modeConfiguration.colors) {
            providers.push(languages.registerColorProvider(languageId, new DocumentColorAdapter(worker)));
        }
        if (modeConfiguration.foldingRanges) {
            providers.push(languages.registerFoldingRangeProvider(languageId, new FoldingRangeAdapter(worker)));
        }
        if (modeConfiguration.diagnostics) {
            providers.push(new DiagnosticsAdapter(languageId, worker, defaults));
        }
        if (modeConfiguration.selectionRanges) {
            providers.push(languages.registerSelectionRangeProvider(languageId, new SelectionRangeAdapter(worker)));
        }
    }
    registerProviders();
    disposables.push(languages.setLanguageConfiguration(defaults.languageId, richEditConfiguration));
    var modeConfiguration = defaults.modeConfiguration;
    defaults.onDidChange(function (newDefaults) {
        if (newDefaults.modeConfiguration !== modeConfiguration) {
            modeConfiguration = newDefaults.modeConfiguration;
            registerProviders();
        }
    });
    disposables.push(asDisposable(providers));
    return asDisposable(disposables);
}
function asDisposable(disposables) {
    return { dispose: function () { return disposeAll(disposables); } };
}
function disposeAll(disposables) {
    while (disposables.length) {
        disposables.pop().dispose();
    }
}
var richEditConfiguration = {
    wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']']
    ],
    autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string'] },
        { open: '[', close: ']', notIn: ['string'] },
        { open: '"', close: '"', notIn: ['string'] }
    ]
};

export { setupMode };
