import { e as editor, p as process, R as Range$1, l as languages, a as MarkerSeverity, U as Uri } from './editor.main-9bc99ce2.js';
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
        this._idleCheckInterval = window.setInterval(function () { return _this._checkIfIdle(); }, 30 * 1000);
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
                // module that exports the create() method and returns a `CSSWorker` instance
                moduleId: 'vs/language/css/cssWorker',
                label: this._defaults.languageId,
                // passed in to the create() method
                createData: {
                    languageSettings: this._defaults.diagnosticsOptions,
                    languageId: this._defaults.languageId
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
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Ident"] = 0] = "Ident";
    TokenType[TokenType["AtKeyword"] = 1] = "AtKeyword";
    TokenType[TokenType["String"] = 2] = "String";
    TokenType[TokenType["BadString"] = 3] = "BadString";
    TokenType[TokenType["UnquotedString"] = 4] = "UnquotedString";
    TokenType[TokenType["Hash"] = 5] = "Hash";
    TokenType[TokenType["Num"] = 6] = "Num";
    TokenType[TokenType["Percentage"] = 7] = "Percentage";
    TokenType[TokenType["Dimension"] = 8] = "Dimension";
    TokenType[TokenType["UnicodeRange"] = 9] = "UnicodeRange";
    TokenType[TokenType["CDO"] = 10] = "CDO";
    TokenType[TokenType["CDC"] = 11] = "CDC";
    TokenType[TokenType["Colon"] = 12] = "Colon";
    TokenType[TokenType["SemiColon"] = 13] = "SemiColon";
    TokenType[TokenType["CurlyL"] = 14] = "CurlyL";
    TokenType[TokenType["CurlyR"] = 15] = "CurlyR";
    TokenType[TokenType["ParenthesisL"] = 16] = "ParenthesisL";
    TokenType[TokenType["ParenthesisR"] = 17] = "ParenthesisR";
    TokenType[TokenType["BracketL"] = 18] = "BracketL";
    TokenType[TokenType["BracketR"] = 19] = "BracketR";
    TokenType[TokenType["Whitespace"] = 20] = "Whitespace";
    TokenType[TokenType["Includes"] = 21] = "Includes";
    TokenType[TokenType["Dashmatch"] = 22] = "Dashmatch";
    TokenType[TokenType["SubstringOperator"] = 23] = "SubstringOperator";
    TokenType[TokenType["PrefixOperator"] = 24] = "PrefixOperator";
    TokenType[TokenType["SuffixOperator"] = 25] = "SuffixOperator";
    TokenType[TokenType["Delim"] = 26] = "Delim";
    TokenType[TokenType["EMS"] = 27] = "EMS";
    TokenType[TokenType["EXS"] = 28] = "EXS";
    TokenType[TokenType["Length"] = 29] = "Length";
    TokenType[TokenType["Angle"] = 30] = "Angle";
    TokenType[TokenType["Time"] = 31] = "Time";
    TokenType[TokenType["Freq"] = 32] = "Freq";
    TokenType[TokenType["Exclamation"] = 33] = "Exclamation";
    TokenType[TokenType["Resolution"] = 34] = "Resolution";
    TokenType[TokenType["Comma"] = 35] = "Comma";
    TokenType[TokenType["Charset"] = 36] = "Charset";
    TokenType[TokenType["EscapedJavaScript"] = 37] = "EscapedJavaScript";
    TokenType[TokenType["BadEscapedJavaScript"] = 38] = "BadEscapedJavaScript";
    TokenType[TokenType["Comment"] = 39] = "Comment";
    TokenType[TokenType["SingleLineComment"] = 40] = "SingleLineComment";
    TokenType[TokenType["EOF"] = 41] = "EOF";
    TokenType[TokenType["CustomToken"] = 42] = "CustomToken";
})(TokenType || (TokenType = {}));
var MultiLineStream = /** @class */ (function () {
    function MultiLineStream(source) {
        this.source = source;
        this.len = source.length;
        this.position = 0;
    }
    MultiLineStream.prototype.substring = function (from, to) {
        if (to === void 0) { to = this.position; }
        return this.source.substring(from, to);
    };
    MultiLineStream.prototype.eos = function () {
        return this.len <= this.position;
    };
    MultiLineStream.prototype.pos = function () {
        return this.position;
    };
    MultiLineStream.prototype.goBackTo = function (pos) {
        this.position = pos;
    };
    MultiLineStream.prototype.goBack = function (n) {
        this.position -= n;
    };
    MultiLineStream.prototype.advance = function (n) {
        this.position += n;
    };
    MultiLineStream.prototype.nextChar = function () {
        return this.source.charCodeAt(this.position++) || 0;
    };
    MultiLineStream.prototype.peekChar = function (n) {
        if (n === void 0) { n = 0; }
        return this.source.charCodeAt(this.position + n) || 0;
    };
    MultiLineStream.prototype.lookbackChar = function (n) {
        if (n === void 0) { n = 0; }
        return this.source.charCodeAt(this.position - n) || 0;
    };
    MultiLineStream.prototype.advanceIfChar = function (ch) {
        if (ch === this.source.charCodeAt(this.position)) {
            this.position++;
            return true;
        }
        return false;
    };
    MultiLineStream.prototype.advanceIfChars = function (ch) {
        if (this.position + ch.length > this.source.length) {
            return false;
        }
        var i = 0;
        for (; i < ch.length; i++) {
            if (this.source.charCodeAt(this.position + i) !== ch[i]) {
                return false;
            }
        }
        this.advance(i);
        return true;
    };
    MultiLineStream.prototype.advanceWhileChar = function (condition) {
        var posNow = this.position;
        while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
            this.position++;
        }
        return this.position - posNow;
    };
    return MultiLineStream;
}());
var _a = 'a'.charCodeAt(0);
var _f = 'f'.charCodeAt(0);
var _z = 'z'.charCodeAt(0);
var _A = 'A'.charCodeAt(0);
var _F = 'F'.charCodeAt(0);
var _Z = 'Z'.charCodeAt(0);
var _0 = '0'.charCodeAt(0);
var _9 = '9'.charCodeAt(0);
var _TLD = '~'.charCodeAt(0);
var _HAT = '^'.charCodeAt(0);
var _EQS = '='.charCodeAt(0);
var _PIP = '|'.charCodeAt(0);
var _MIN = '-'.charCodeAt(0);
var _USC = '_'.charCodeAt(0);
var _PRC = '%'.charCodeAt(0);
var _MUL = '*'.charCodeAt(0);
var _LPA = '('.charCodeAt(0);
var _RPA = ')'.charCodeAt(0);
var _LAN = '<'.charCodeAt(0);
var _RAN = '>'.charCodeAt(0);
var _ATS = '@'.charCodeAt(0);
var _HSH = '#'.charCodeAt(0);
var _DLR = '$'.charCodeAt(0);
var _BSL = '\\'.charCodeAt(0);
var _FSL = '/'.charCodeAt(0);
var _NWL = '\n'.charCodeAt(0);
var _CAR = '\r'.charCodeAt(0);
var _LFD = '\f'.charCodeAt(0);
var _DQO = '"'.charCodeAt(0);
var _SQO = '\''.charCodeAt(0);
var _WSP = ' '.charCodeAt(0);
var _TAB = '\t'.charCodeAt(0);
var _SEM = ';'.charCodeAt(0);
var _COL = ':'.charCodeAt(0);
var _CUL = '{'.charCodeAt(0);
var _CUR = '}'.charCodeAt(0);
var _BRL = '['.charCodeAt(0);
var _BRR = ']'.charCodeAt(0);
var _CMA = ','.charCodeAt(0);
var _DOT = '.'.charCodeAt(0);
var _BNG = '!'.charCodeAt(0);
var staticTokenTable = {};
staticTokenTable[_SEM] = TokenType.SemiColon;
staticTokenTable[_COL] = TokenType.Colon;
staticTokenTable[_CUL] = TokenType.CurlyL;
staticTokenTable[_CUR] = TokenType.CurlyR;
staticTokenTable[_BRR] = TokenType.BracketR;
staticTokenTable[_BRL] = TokenType.BracketL;
staticTokenTable[_LPA] = TokenType.ParenthesisL;
staticTokenTable[_RPA] = TokenType.ParenthesisR;
staticTokenTable[_CMA] = TokenType.Comma;
var staticUnitTable = {};
staticUnitTable['em'] = TokenType.EMS;
staticUnitTable['ex'] = TokenType.EXS;
staticUnitTable['px'] = TokenType.Length;
staticUnitTable['cm'] = TokenType.Length;
staticUnitTable['mm'] = TokenType.Length;
staticUnitTable['in'] = TokenType.Length;
staticUnitTable['pt'] = TokenType.Length;
staticUnitTable['pc'] = TokenType.Length;
staticUnitTable['deg'] = TokenType.Angle;
staticUnitTable['rad'] = TokenType.Angle;
staticUnitTable['grad'] = TokenType.Angle;
staticUnitTable['ms'] = TokenType.Time;
staticUnitTable['s'] = TokenType.Time;
staticUnitTable['hz'] = TokenType.Freq;
staticUnitTable['khz'] = TokenType.Freq;
staticUnitTable['%'] = TokenType.Percentage;
staticUnitTable['fr'] = TokenType.Percentage;
staticUnitTable['dpi'] = TokenType.Resolution;
staticUnitTable['dpcm'] = TokenType.Resolution;
var Scanner = /** @class */ (function () {
    function Scanner() {
        this.stream = new MultiLineStream('');
        this.ignoreComment = true;
        this.ignoreWhitespace = true;
        this.inURL = false;
    }
    Scanner.prototype.setSource = function (input) {
        this.stream = new MultiLineStream(input);
    };
    Scanner.prototype.finishToken = function (offset, type, text) {
        return {
            offset: offset,
            len: this.stream.pos() - offset,
            type: type,
            text: text || this.stream.substring(offset)
        };
    };
    Scanner.prototype.substring = function (offset, len) {
        return this.stream.substring(offset, offset + len);
    };
    Scanner.prototype.pos = function () {
        return this.stream.pos();
    };
    Scanner.prototype.goBackTo = function (pos) {
        this.stream.goBackTo(pos);
    };
    Scanner.prototype.scanUnquotedString = function () {
        var offset = this.stream.pos();
        var content = [];
        if (this._unquotedString(content)) {
            return this.finishToken(offset, TokenType.UnquotedString, content.join(''));
        }
        return null;
    };
    Scanner.prototype.scan = function () {
        // processes all whitespaces and comments
        var triviaToken = this.trivia();
        if (triviaToken !== null) {
            return triviaToken;
        }
        var offset = this.stream.pos();
        // End of file/input
        if (this.stream.eos()) {
            return this.finishToken(offset, TokenType.EOF);
        }
        return this.scanNext(offset);
    };
    Scanner.prototype.scanNext = function (offset) {
        // CDO <!--
        if (this.stream.advanceIfChars([_LAN, _BNG, _MIN, _MIN])) {
            return this.finishToken(offset, TokenType.CDO);
        }
        // CDC -->
        if (this.stream.advanceIfChars([_MIN, _MIN, _RAN])) {
            return this.finishToken(offset, TokenType.CDC);
        }
        var content = [];
        if (this.ident(content)) {
            return this.finishToken(offset, TokenType.Ident, content.join(''));
        }
        // at-keyword
        if (this.stream.advanceIfChar(_ATS)) {
            content = ['@'];
            if (this._name(content)) {
                var keywordText = content.join('');
                if (keywordText === '@charset') {
                    return this.finishToken(offset, TokenType.Charset, keywordText);
                }
                return this.finishToken(offset, TokenType.AtKeyword, keywordText);
            }
            else {
                return this.finishToken(offset, TokenType.Delim);
            }
        }
        // hash
        if (this.stream.advanceIfChar(_HSH)) {
            content = ['#'];
            if (this._name(content)) {
                return this.finishToken(offset, TokenType.Hash, content.join(''));
            }
            else {
                return this.finishToken(offset, TokenType.Delim);
            }
        }
        // Important
        if (this.stream.advanceIfChar(_BNG)) {
            return this.finishToken(offset, TokenType.Exclamation);
        }
        // Numbers
        if (this._number()) {
            var pos = this.stream.pos();
            content = [this.stream.substring(offset, pos)];
            if (this.stream.advanceIfChar(_PRC)) {
                // Percentage 43%
                return this.finishToken(offset, TokenType.Percentage);
            }
            else if (this.ident(content)) {
                var dim = this.stream.substring(pos).toLowerCase();
                var tokenType_1 = staticUnitTable[dim];
                if (typeof tokenType_1 !== 'undefined') {
                    // Known dimension 43px
                    return this.finishToken(offset, tokenType_1, content.join(''));
                }
                else {
                    // Unknown dimension 43ft
                    return this.finishToken(offset, TokenType.Dimension, content.join(''));
                }
            }
            return this.finishToken(offset, TokenType.Num);
        }
        // String, BadString
        content = [];
        var tokenType = this._string(content);
        if (tokenType !== null) {
            return this.finishToken(offset, tokenType, content.join(''));
        }
        // single character tokens
        tokenType = staticTokenTable[this.stream.peekChar()];
        if (typeof tokenType !== 'undefined') {
            this.stream.advance(1);
            return this.finishToken(offset, tokenType);
        }
        // includes ~=
        if (this.stream.peekChar(0) === _TLD && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.Includes);
        }
        // DashMatch |=
        if (this.stream.peekChar(0) === _PIP && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.Dashmatch);
        }
        // Substring operator *=
        if (this.stream.peekChar(0) === _MUL && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.SubstringOperator);
        }
        // Substring operator ^=
        if (this.stream.peekChar(0) === _HAT && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.PrefixOperator);
        }
        // Substring operator $=
        if (this.stream.peekChar(0) === _DLR && this.stream.peekChar(1) === _EQS) {
            this.stream.advance(2);
            return this.finishToken(offset, TokenType.SuffixOperator);
        }
        // Delim
        this.stream.nextChar();
        return this.finishToken(offset, TokenType.Delim);
    };
    Scanner.prototype.trivia = function () {
        while (true) {
            var offset = this.stream.pos();
            if (this._whitespace()) {
                if (!this.ignoreWhitespace) {
                    return this.finishToken(offset, TokenType.Whitespace);
                }
            }
            else if (this.comment()) {
                if (!this.ignoreComment) {
                    return this.finishToken(offset, TokenType.Comment);
                }
            }
            else {
                return null;
            }
        }
    };
    Scanner.prototype.comment = function () {
        if (this.stream.advanceIfChars([_FSL, _MUL])) {
            var success_1 = false, hot_1 = false;
            this.stream.advanceWhileChar(function (ch) {
                if (hot_1 && ch === _FSL) {
                    success_1 = true;
                    return false;
                }
                hot_1 = ch === _MUL;
                return true;
            });
            if (success_1) {
                this.stream.advance(1);
            }
            return true;
        }
        return false;
    };
    Scanner.prototype._number = function () {
        var npeek = 0, ch;
        if (this.stream.peekChar() === _DOT) {
            npeek = 1;
        }
        ch = this.stream.peekChar(npeek);
        if (ch >= _0 && ch <= _9) {
            this.stream.advance(npeek + 1);
            this.stream.advanceWhileChar(function (ch) {
                return ch >= _0 && ch <= _9 || npeek === 0 && ch === _DOT;
            });
            return true;
        }
        return false;
    };
    Scanner.prototype._newline = function (result) {
        var ch = this.stream.peekChar();
        switch (ch) {
            case _CAR:
            case _LFD:
            case _NWL:
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                if (ch === _CAR && this.stream.advanceIfChar(_NWL)) {
                    result.push('\n');
                }
                return true;
        }
        return false;
    };
    Scanner.prototype._escape = function (result, includeNewLines) {
        var ch = this.stream.peekChar();
        if (ch === _BSL) {
            this.stream.advance(1);
            ch = this.stream.peekChar();
            var hexNumCount = 0;
            while (hexNumCount < 6 && (ch >= _0 && ch <= _9 || ch >= _a && ch <= _f || ch >= _A && ch <= _F)) {
                this.stream.advance(1);
                ch = this.stream.peekChar();
                hexNumCount++;
            }
            if (hexNumCount > 0) {
                try {
                    var hexVal = parseInt(this.stream.substring(this.stream.pos() - hexNumCount), 16);
                    if (hexVal) {
                        result.push(String.fromCharCode(hexVal));
                    }
                }
                catch (e) {
                    // ignore
                }
                // optional whitespace or new line, not part of result text
                if (ch === _WSP || ch === _TAB) {
                    this.stream.advance(1);
                }
                else {
                    this._newline([]);
                }
                return true;
            }
            if (ch !== _CAR && ch !== _LFD && ch !== _NWL) {
                this.stream.advance(1);
                result.push(String.fromCharCode(ch));
                return true;
            }
            else if (includeNewLines) {
                return this._newline(result);
            }
        }
        return false;
    };
    Scanner.prototype._stringChar = function (closeQuote, result) {
        // not closeQuote, not backslash, not newline
        var ch = this.stream.peekChar();
        if (ch !== 0 && ch !== closeQuote && ch !== _BSL && ch !== _CAR && ch !== _LFD && ch !== _NWL) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    };
    Scanner.prototype._string = function (result) {
        if (this.stream.peekChar() === _SQO || this.stream.peekChar() === _DQO) {
            var closeQuote = this.stream.nextChar();
            result.push(String.fromCharCode(closeQuote));
            while (this._stringChar(closeQuote, result) || this._escape(result, true)) {
                // loop
            }
            if (this.stream.peekChar() === closeQuote) {
                this.stream.nextChar();
                result.push(String.fromCharCode(closeQuote));
                return TokenType.String;
            }
            else {
                return TokenType.BadString;
            }
        }
        return null;
    };
    Scanner.prototype._unquotedChar = function (result) {
        // not closeQuote, not backslash, not newline
        var ch = this.stream.peekChar();
        if (ch !== 0 && ch !== _BSL && ch !== _SQO && ch !== _DQO && ch !== _LPA && ch !== _RPA && ch !== _WSP && ch !== _TAB && ch !== _NWL && ch !== _LFD && ch !== _CAR) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    };
    Scanner.prototype._unquotedString = function (result) {
        var hasContent = false;
        while (this._unquotedChar(result) || this._escape(result)) {
            hasContent = true;
        }
        return hasContent;
    };
    Scanner.prototype._whitespace = function () {
        var n = this.stream.advanceWhileChar(function (ch) {
            return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR;
        });
        return n > 0;
    };
    Scanner.prototype._name = function (result) {
        var matched = false;
        while (this._identChar(result) || this._escape(result)) {
            matched = true;
        }
        return matched;
    };
    Scanner.prototype.ident = function (result) {
        var pos = this.stream.pos();
        var hasMinus = this._minus(result);
        if (hasMinus && this._minus(result) /* -- */) {
            if (this._identFirstChar(result) || this._escape(result)) {
                while (this._identChar(result) || this._escape(result)) {
                    // loop
                }
                return true;
            }
        }
        else if (this._identFirstChar(result) || this._escape(result)) {
            while (this._identChar(result) || this._escape(result)) {
                // loop
            }
            return true;
        }
        this.stream.goBackTo(pos);
        return false;
    };
    Scanner.prototype._identFirstChar = function (result) {
        var ch = this.stream.peekChar();
        if (ch === _USC || // _
            ch >= _a && ch <= _z || // a-z
            ch >= _A && ch <= _Z || // A-Z
            ch >= 0x80 && ch <= 0xFFFF) { // nonascii
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    };
    Scanner.prototype._minus = function (result) {
        var ch = this.stream.peekChar();
        if (ch === _MIN) {
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    };
    Scanner.prototype._identChar = function (result) {
        var ch = this.stream.peekChar();
        if (ch === _USC || // _
            ch === _MIN || // -
            ch >= _a && ch <= _z || // a-z
            ch >= _A && ch <= _Z || // A-Z
            ch >= _0 && ch <= _9 || // 0/9
            ch >= 0x80 && ch <= 0xFFFF) { // nonascii
            this.stream.advance(1);
            result.push(String.fromCharCode(ch));
            return true;
        }
        return false;
    };
    return Scanner;
}());

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
/**
 * Limit of string length.
 */
function getLimitedString(str, ellipsis) {
    if (ellipsis === void 0) { ellipsis = true; }
    if (!str) {
        return '';
    }
    if (str.length < 140) {
        return str;
    }
    return str.slice(0, 140) + (ellipsis ? '\u2026' : '');
}
/**
 * Limit of string length.
 */
function trim(str, regexp) {
    var m = regexp.exec(str);
    if (m && m[0].length) {
        return str.substr(0, str.length - m[0].length);
    }
    return str;
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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <summary>
/// Nodes for the css 2.1 specification. See for reference:
/// http://www.w3.org/TR/CSS21/grammar.html#grammar
/// </summary>
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Undefined"] = 0] = "Undefined";
    NodeType[NodeType["Identifier"] = 1] = "Identifier";
    NodeType[NodeType["Stylesheet"] = 2] = "Stylesheet";
    NodeType[NodeType["Ruleset"] = 3] = "Ruleset";
    NodeType[NodeType["Selector"] = 4] = "Selector";
    NodeType[NodeType["SimpleSelector"] = 5] = "SimpleSelector";
    NodeType[NodeType["SelectorInterpolation"] = 6] = "SelectorInterpolation";
    NodeType[NodeType["SelectorCombinator"] = 7] = "SelectorCombinator";
    NodeType[NodeType["SelectorCombinatorParent"] = 8] = "SelectorCombinatorParent";
    NodeType[NodeType["SelectorCombinatorSibling"] = 9] = "SelectorCombinatorSibling";
    NodeType[NodeType["SelectorCombinatorAllSiblings"] = 10] = "SelectorCombinatorAllSiblings";
    NodeType[NodeType["SelectorCombinatorShadowPiercingDescendant"] = 11] = "SelectorCombinatorShadowPiercingDescendant";
    NodeType[NodeType["Page"] = 12] = "Page";
    NodeType[NodeType["PageBoxMarginBox"] = 13] = "PageBoxMarginBox";
    NodeType[NodeType["ClassSelector"] = 14] = "ClassSelector";
    NodeType[NodeType["IdentifierSelector"] = 15] = "IdentifierSelector";
    NodeType[NodeType["ElementNameSelector"] = 16] = "ElementNameSelector";
    NodeType[NodeType["PseudoSelector"] = 17] = "PseudoSelector";
    NodeType[NodeType["AttributeSelector"] = 18] = "AttributeSelector";
    NodeType[NodeType["Declaration"] = 19] = "Declaration";
    NodeType[NodeType["Declarations"] = 20] = "Declarations";
    NodeType[NodeType["Property"] = 21] = "Property";
    NodeType[NodeType["Expression"] = 22] = "Expression";
    NodeType[NodeType["BinaryExpression"] = 23] = "BinaryExpression";
    NodeType[NodeType["Term"] = 24] = "Term";
    NodeType[NodeType["Operator"] = 25] = "Operator";
    NodeType[NodeType["Value"] = 26] = "Value";
    NodeType[NodeType["StringLiteral"] = 27] = "StringLiteral";
    NodeType[NodeType["URILiteral"] = 28] = "URILiteral";
    NodeType[NodeType["EscapedValue"] = 29] = "EscapedValue";
    NodeType[NodeType["Function"] = 30] = "Function";
    NodeType[NodeType["NumericValue"] = 31] = "NumericValue";
    NodeType[NodeType["HexColorValue"] = 32] = "HexColorValue";
    NodeType[NodeType["MixinDeclaration"] = 33] = "MixinDeclaration";
    NodeType[NodeType["MixinReference"] = 34] = "MixinReference";
    NodeType[NodeType["VariableName"] = 35] = "VariableName";
    NodeType[NodeType["VariableDeclaration"] = 36] = "VariableDeclaration";
    NodeType[NodeType["Prio"] = 37] = "Prio";
    NodeType[NodeType["Interpolation"] = 38] = "Interpolation";
    NodeType[NodeType["NestedProperties"] = 39] = "NestedProperties";
    NodeType[NodeType["ExtendsReference"] = 40] = "ExtendsReference";
    NodeType[NodeType["SelectorPlaceholder"] = 41] = "SelectorPlaceholder";
    NodeType[NodeType["Debug"] = 42] = "Debug";
    NodeType[NodeType["If"] = 43] = "If";
    NodeType[NodeType["Else"] = 44] = "Else";
    NodeType[NodeType["For"] = 45] = "For";
    NodeType[NodeType["Each"] = 46] = "Each";
    NodeType[NodeType["While"] = 47] = "While";
    NodeType[NodeType["MixinContentReference"] = 48] = "MixinContentReference";
    NodeType[NodeType["MixinContentDeclaration"] = 49] = "MixinContentDeclaration";
    NodeType[NodeType["Media"] = 50] = "Media";
    NodeType[NodeType["Keyframe"] = 51] = "Keyframe";
    NodeType[NodeType["FontFace"] = 52] = "FontFace";
    NodeType[NodeType["Import"] = 53] = "Import";
    NodeType[NodeType["Namespace"] = 54] = "Namespace";
    NodeType[NodeType["Invocation"] = 55] = "Invocation";
    NodeType[NodeType["FunctionDeclaration"] = 56] = "FunctionDeclaration";
    NodeType[NodeType["ReturnStatement"] = 57] = "ReturnStatement";
    NodeType[NodeType["MediaQuery"] = 58] = "MediaQuery";
    NodeType[NodeType["FunctionParameter"] = 59] = "FunctionParameter";
    NodeType[NodeType["FunctionArgument"] = 60] = "FunctionArgument";
    NodeType[NodeType["KeyframeSelector"] = 61] = "KeyframeSelector";
    NodeType[NodeType["ViewPort"] = 62] = "ViewPort";
    NodeType[NodeType["Document"] = 63] = "Document";
    NodeType[NodeType["AtApplyRule"] = 64] = "AtApplyRule";
    NodeType[NodeType["CustomPropertyDeclaration"] = 65] = "CustomPropertyDeclaration";
    NodeType[NodeType["CustomPropertySet"] = 66] = "CustomPropertySet";
    NodeType[NodeType["ListEntry"] = 67] = "ListEntry";
    NodeType[NodeType["Supports"] = 68] = "Supports";
    NodeType[NodeType["SupportsCondition"] = 69] = "SupportsCondition";
    NodeType[NodeType["NamespacePrefix"] = 70] = "NamespacePrefix";
    NodeType[NodeType["GridLine"] = 71] = "GridLine";
    NodeType[NodeType["Plugin"] = 72] = "Plugin";
    NodeType[NodeType["UnknownAtRule"] = 73] = "UnknownAtRule";
    NodeType[NodeType["Use"] = 74] = "Use";
    NodeType[NodeType["ModuleConfiguration"] = 75] = "ModuleConfiguration";
    NodeType[NodeType["Forward"] = 76] = "Forward";
    NodeType[NodeType["ForwardVisibility"] = 77] = "ForwardVisibility";
    NodeType[NodeType["Module"] = 78] = "Module";
})(NodeType || (NodeType = {}));
var ReferenceType;
(function (ReferenceType) {
    ReferenceType[ReferenceType["Mixin"] = 0] = "Mixin";
    ReferenceType[ReferenceType["Rule"] = 1] = "Rule";
    ReferenceType[ReferenceType["Variable"] = 2] = "Variable";
    ReferenceType[ReferenceType["Function"] = 3] = "Function";
    ReferenceType[ReferenceType["Keyframe"] = 4] = "Keyframe";
    ReferenceType[ReferenceType["Unknown"] = 5] = "Unknown";
    ReferenceType[ReferenceType["Module"] = 6] = "Module";
    ReferenceType[ReferenceType["Forward"] = 7] = "Forward";
    ReferenceType[ReferenceType["ForwardVisibility"] = 8] = "ForwardVisibility";
})(ReferenceType || (ReferenceType = {}));
function getNodeAtOffset(node, offset) {
    var candidate = null;
    if (!node || offset < node.offset || offset > node.end) {
        return null;
    }
    // Find the shortest node at the position
    node.accept(function (node) {
        if (node.offset === -1 && node.length === -1) {
            return true;
        }
        if (node.offset <= offset && node.end >= offset) {
            if (!candidate) {
                candidate = node;
            }
            else if (node.length <= candidate.length) {
                candidate = node;
            }
            return true;
        }
        return false;
    });
    return candidate;
}
function getNodePath(node, offset) {
    var candidate = getNodeAtOffset(node, offset);
    var path = [];
    while (candidate) {
        path.unshift(candidate);
        candidate = candidate.parent;
    }
    return path;
}
function getParentDeclaration(node) {
    var decl = node.findParent(NodeType.Declaration);
    var value = decl && decl.getValue();
    if (value && value.encloses(node)) {
        return decl;
    }
    return null;
}
var Node = /** @class */ (function () {
    function Node(offset, len, nodeType) {
        if (offset === void 0) { offset = -1; }
        if (len === void 0) { len = -1; }
        this.parent = null;
        this.offset = offset;
        this.length = len;
        if (nodeType) {
            this.nodeType = nodeType;
        }
    }
    Object.defineProperty(Node.prototype, "end", {
        get: function () { return this.offset + this.length; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "type", {
        get: function () {
            return this.nodeType || NodeType.Undefined;
        },
        set: function (type) {
            this.nodeType = type;
        },
        enumerable: false,
        configurable: true
    });
    Node.prototype.getTextProvider = function () {
        var node = this;
        while (node && !node.textProvider) {
            node = node.parent;
        }
        if (node) {
            return node.textProvider;
        }
        return function () { return 'unknown'; };
    };
    Node.prototype.getText = function () {
        return this.getTextProvider()(this.offset, this.length);
    };
    Node.prototype.matches = function (str) {
        return this.length === str.length && this.getTextProvider()(this.offset, this.length) === str;
    };
    Node.prototype.startsWith = function (str) {
        return this.length >= str.length && this.getTextProvider()(this.offset, str.length) === str;
    };
    Node.prototype.endsWith = function (str) {
        return this.length >= str.length && this.getTextProvider()(this.end - str.length, str.length) === str;
    };
    Node.prototype.accept = function (visitor) {
        if (visitor(this) && this.children) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.accept(visitor);
            }
        }
    };
    Node.prototype.acceptVisitor = function (visitor) {
        this.accept(visitor.visitNode.bind(visitor));
    };
    Node.prototype.adoptChild = function (node, index) {
        if (index === void 0) { index = -1; }
        if (node.parent && node.parent.children) {
            var idx = node.parent.children.indexOf(node);
            if (idx >= 0) {
                node.parent.children.splice(idx, 1);
            }
        }
        node.parent = this;
        var children = this.children;
        if (!children) {
            children = this.children = [];
        }
        if (index !== -1) {
            children.splice(index, 0, node);
        }
        else {
            children.push(node);
        }
        return node;
    };
    Node.prototype.attachTo = function (parent, index) {
        if (index === void 0) { index = -1; }
        if (parent) {
            parent.adoptChild(this, index);
        }
        return this;
    };
    Node.prototype.collectIssues = function (results) {
        if (this.issues) {
            results.push.apply(results, this.issues);
        }
    };
    Node.prototype.addIssue = function (issue) {
        if (!this.issues) {
            this.issues = [];
        }
        this.issues.push(issue);
    };
    Node.prototype.hasIssue = function (rule) {
        return Array.isArray(this.issues) && this.issues.some(function (i) { return i.getRule() === rule; });
    };
    Node.prototype.isErroneous = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        if (this.issues && this.issues.length > 0) {
            return true;
        }
        return recursive && Array.isArray(this.children) && this.children.some(function (c) { return c.isErroneous(true); });
    };
    Node.prototype.setNode = function (field, node, index) {
        if (index === void 0) { index = -1; }
        if (node) {
            node.attachTo(this, index);
            this[field] = node;
            return true;
        }
        return false;
    };
    Node.prototype.addChild = function (node) {
        if (node) {
            if (!this.children) {
                this.children = [];
            }
            node.attachTo(this);
            this.updateOffsetAndLength(node);
            return true;
        }
        return false;
    };
    Node.prototype.updateOffsetAndLength = function (node) {
        if (node.offset < this.offset || this.offset === -1) {
            this.offset = node.offset;
        }
        var nodeEnd = node.end;
        if ((nodeEnd > this.end) || this.length === -1) {
            this.length = nodeEnd - this.offset;
        }
    };
    Node.prototype.hasChildren = function () {
        return !!this.children && this.children.length > 0;
    };
    Node.prototype.getChildren = function () {
        return this.children ? this.children.slice(0) : [];
    };
    Node.prototype.getChild = function (index) {
        if (this.children && index < this.children.length) {
            return this.children[index];
        }
        return null;
    };
    Node.prototype.addChildren = function (nodes) {
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            this.addChild(node);
        }
    };
    Node.prototype.findFirstChildBeforeOffset = function (offset) {
        if (this.children) {
            var current = null;
            for (var i = this.children.length - 1; i >= 0; i--) {
                // iterate until we find a child that has a start offset smaller than the input offset
                current = this.children[i];
                if (current.offset <= offset) {
                    return current;
                }
            }
        }
        return null;
    };
    Node.prototype.findChildAtOffset = function (offset, goDeep) {
        var current = this.findFirstChildBeforeOffset(offset);
        if (current && current.end >= offset) {
            if (goDeep) {
                return current.findChildAtOffset(offset, true) || current;
            }
            return current;
        }
        return null;
    };
    Node.prototype.encloses = function (candidate) {
        return this.offset <= candidate.offset && this.offset + this.length >= candidate.offset + candidate.length;
    };
    Node.prototype.getParent = function () {
        var result = this.parent;
        while (result instanceof Nodelist) {
            result = result.parent;
        }
        return result;
    };
    Node.prototype.findParent = function (type) {
        var result = this;
        while (result && result.type !== type) {
            result = result.parent;
        }
        return result;
    };
    Node.prototype.findAParent = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        var result = this;
        while (result && !types.some(function (t) { return result.type === t; })) {
            result = result.parent;
        }
        return result;
    };
    Node.prototype.setData = function (key, value) {
        if (!this.options) {
            this.options = {};
        }
        this.options[key] = value;
    };
    Node.prototype.getData = function (key) {
        if (!this.options || !this.options.hasOwnProperty(key)) {
            return null;
        }
        return this.options[key];
    };
    return Node;
}());
var Nodelist = /** @class */ (function (_super) {
    __extends(Nodelist, _super);
    function Nodelist(parent, index) {
        if (index === void 0) { index = -1; }
        var _this = _super.call(this, -1, -1) || this;
        _this.attachTo(parent, index);
        _this.offset = -1;
        _this.length = -1;
        return _this;
    }
    return Nodelist;
}(Node));
var Identifier = /** @class */ (function (_super) {
    __extends(Identifier, _super);
    function Identifier(offset, length) {
        var _this = _super.call(this, offset, length) || this;
        _this.isCustomProperty = false;
        return _this;
    }
    Object.defineProperty(Identifier.prototype, "type", {
        get: function () {
            return NodeType.Identifier;
        },
        enumerable: false,
        configurable: true
    });
    Identifier.prototype.containsInterpolation = function () {
        return this.hasChildren();
    };
    return Identifier;
}(Node));
var Stylesheet = /** @class */ (function (_super) {
    __extends(Stylesheet, _super);
    function Stylesheet(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Stylesheet.prototype, "type", {
        get: function () {
            return NodeType.Stylesheet;
        },
        enumerable: false,
        configurable: true
    });
    return Stylesheet;
}(Node));
var Declarations = /** @class */ (function (_super) {
    __extends(Declarations, _super);
    function Declarations(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Declarations.prototype, "type", {
        get: function () {
            return NodeType.Declarations;
        },
        enumerable: false,
        configurable: true
    });
    return Declarations;
}(Node));
var BodyDeclaration = /** @class */ (function (_super) {
    __extends(BodyDeclaration, _super);
    function BodyDeclaration(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    BodyDeclaration.prototype.getDeclarations = function () {
        return this.declarations;
    };
    BodyDeclaration.prototype.setDeclarations = function (decls) {
        return this.setNode('declarations', decls);
    };
    return BodyDeclaration;
}(Node));
var RuleSet = /** @class */ (function (_super) {
    __extends(RuleSet, _super);
    function RuleSet(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(RuleSet.prototype, "type", {
        get: function () {
            return NodeType.Ruleset;
        },
        enumerable: false,
        configurable: true
    });
    RuleSet.prototype.getSelectors = function () {
        if (!this.selectors) {
            this.selectors = new Nodelist(this);
        }
        return this.selectors;
    };
    RuleSet.prototype.isNested = function () {
        return !!this.parent && this.parent.findParent(NodeType.Declarations) !== null;
    };
    return RuleSet;
}(BodyDeclaration));
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Selector.prototype, "type", {
        get: function () {
            return NodeType.Selector;
        },
        enumerable: false,
        configurable: true
    });
    return Selector;
}(Node));
var SimpleSelector = /** @class */ (function (_super) {
    __extends(SimpleSelector, _super);
    function SimpleSelector(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(SimpleSelector.prototype, "type", {
        get: function () {
            return NodeType.SimpleSelector;
        },
        enumerable: false,
        configurable: true
    });
    return SimpleSelector;
}(Node));
var AtApplyRule = /** @class */ (function (_super) {
    __extends(AtApplyRule, _super);
    function AtApplyRule(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(AtApplyRule.prototype, "type", {
        get: function () {
            return NodeType.AtApplyRule;
        },
        enumerable: false,
        configurable: true
    });
    AtApplyRule.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    AtApplyRule.prototype.getIdentifier = function () {
        return this.identifier;
    };
    AtApplyRule.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    return AtApplyRule;
}(Node));
var AbstractDeclaration = /** @class */ (function (_super) {
    __extends(AbstractDeclaration, _super);
    function AbstractDeclaration(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    return AbstractDeclaration;
}(Node));
var CustomPropertySet = /** @class */ (function (_super) {
    __extends(CustomPropertySet, _super);
    function CustomPropertySet(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(CustomPropertySet.prototype, "type", {
        get: function () {
            return NodeType.CustomPropertySet;
        },
        enumerable: false,
        configurable: true
    });
    return CustomPropertySet;
}(BodyDeclaration));
var Declaration = /** @class */ (function (_super) {
    __extends(Declaration, _super);
    function Declaration(offset, length) {
        var _this = _super.call(this, offset, length) || this;
        _this.property = null;
        return _this;
    }
    Object.defineProperty(Declaration.prototype, "type", {
        get: function () {
            return NodeType.Declaration;
        },
        enumerable: false,
        configurable: true
    });
    Declaration.prototype.setProperty = function (node) {
        return this.setNode('property', node);
    };
    Declaration.prototype.getProperty = function () {
        return this.property;
    };
    Declaration.prototype.getFullPropertyName = function () {
        var propertyName = this.property ? this.property.getName() : 'unknown';
        if (this.parent instanceof Declarations && this.parent.getParent() instanceof NestedProperties) {
            var parentDecl = this.parent.getParent().getParent();
            if (parentDecl instanceof Declaration) {
                return parentDecl.getFullPropertyName() + propertyName;
            }
        }
        return propertyName;
    };
    Declaration.prototype.getNonPrefixedPropertyName = function () {
        var propertyName = this.getFullPropertyName();
        if (propertyName && propertyName.charAt(0) === '-') {
            var vendorPrefixEnd = propertyName.indexOf('-', 1);
            if (vendorPrefixEnd !== -1) {
                return propertyName.substring(vendorPrefixEnd + 1);
            }
        }
        return propertyName;
    };
    Declaration.prototype.setValue = function (value) {
        return this.setNode('value', value);
    };
    Declaration.prototype.getValue = function () {
        return this.value;
    };
    Declaration.prototype.setNestedProperties = function (value) {
        return this.setNode('nestedProperties', value);
    };
    Declaration.prototype.getNestedProperties = function () {
        return this.nestedProperties;
    };
    return Declaration;
}(AbstractDeclaration));
var CustomPropertyDeclaration = /** @class */ (function (_super) {
    __extends(CustomPropertyDeclaration, _super);
    function CustomPropertyDeclaration(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(CustomPropertyDeclaration.prototype, "type", {
        get: function () {
            return NodeType.CustomPropertyDeclaration;
        },
        enumerable: false,
        configurable: true
    });
    CustomPropertyDeclaration.prototype.setPropertySet = function (value) {
        return this.setNode('propertySet', value);
    };
    CustomPropertyDeclaration.prototype.getPropertySet = function () {
        return this.propertySet;
    };
    return CustomPropertyDeclaration;
}(Declaration));
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Property.prototype, "type", {
        get: function () {
            return NodeType.Property;
        },
        enumerable: false,
        configurable: true
    });
    Property.prototype.setIdentifier = function (value) {
        return this.setNode('identifier', value);
    };
    Property.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Property.prototype.getName = function () {
        return trim(this.getText(), /[_\+]+$/); /* +_: less merge */
    };
    Property.prototype.isCustomProperty = function () {
        return !!this.identifier && this.identifier.isCustomProperty;
    };
    return Property;
}(Node));
var Invocation = /** @class */ (function (_super) {
    __extends(Invocation, _super);
    function Invocation(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Invocation.prototype, "type", {
        get: function () {
            return NodeType.Invocation;
        },
        enumerable: false,
        configurable: true
    });
    Invocation.prototype.getArguments = function () {
        if (!this.arguments) {
            this.arguments = new Nodelist(this);
        }
        return this.arguments;
    };
    return Invocation;
}(Node));
var Function = /** @class */ (function (_super) {
    __extends(Function, _super);
    function Function(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Function.prototype, "type", {
        get: function () {
            return NodeType.Function;
        },
        enumerable: false,
        configurable: true
    });
    Function.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    Function.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Function.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    return Function;
}(Invocation));
var FunctionParameter = /** @class */ (function (_super) {
    __extends(FunctionParameter, _super);
    function FunctionParameter(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(FunctionParameter.prototype, "type", {
        get: function () {
            return NodeType.FunctionParameter;
        },
        enumerable: false,
        configurable: true
    });
    FunctionParameter.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    FunctionParameter.prototype.getIdentifier = function () {
        return this.identifier;
    };
    FunctionParameter.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    FunctionParameter.prototype.setDefaultValue = function (node) {
        return this.setNode('defaultValue', node, 0);
    };
    FunctionParameter.prototype.getDefaultValue = function () {
        return this.defaultValue;
    };
    return FunctionParameter;
}(Node));
var FunctionArgument = /** @class */ (function (_super) {
    __extends(FunctionArgument, _super);
    function FunctionArgument(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(FunctionArgument.prototype, "type", {
        get: function () {
            return NodeType.FunctionArgument;
        },
        enumerable: false,
        configurable: true
    });
    FunctionArgument.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    FunctionArgument.prototype.getIdentifier = function () {
        return this.identifier;
    };
    FunctionArgument.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    FunctionArgument.prototype.setValue = function (node) {
        return this.setNode('value', node, 0);
    };
    FunctionArgument.prototype.getValue = function () {
        return this.value;
    };
    return FunctionArgument;
}(Node));
var IfStatement = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(IfStatement.prototype, "type", {
        get: function () {
            return NodeType.If;
        },
        enumerable: false,
        configurable: true
    });
    IfStatement.prototype.setExpression = function (node) {
        return this.setNode('expression', node, 0);
    };
    IfStatement.prototype.setElseClause = function (elseClause) {
        return this.setNode('elseClause', elseClause);
    };
    return IfStatement;
}(BodyDeclaration));
var ForStatement = /** @class */ (function (_super) {
    __extends(ForStatement, _super);
    function ForStatement(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(ForStatement.prototype, "type", {
        get: function () {
            return NodeType.For;
        },
        enumerable: false,
        configurable: true
    });
    ForStatement.prototype.setVariable = function (node) {
        return this.setNode('variable', node, 0);
    };
    return ForStatement;
}(BodyDeclaration));
var EachStatement = /** @class */ (function (_super) {
    __extends(EachStatement, _super);
    function EachStatement(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(EachStatement.prototype, "type", {
        get: function () {
            return NodeType.Each;
        },
        enumerable: false,
        configurable: true
    });
    EachStatement.prototype.getVariables = function () {
        if (!this.variables) {
            this.variables = new Nodelist(this);
        }
        return this.variables;
    };
    return EachStatement;
}(BodyDeclaration));
var WhileStatement = /** @class */ (function (_super) {
    __extends(WhileStatement, _super);
    function WhileStatement(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(WhileStatement.prototype, "type", {
        get: function () {
            return NodeType.While;
        },
        enumerable: false,
        configurable: true
    });
    return WhileStatement;
}(BodyDeclaration));
var ElseStatement = /** @class */ (function (_super) {
    __extends(ElseStatement, _super);
    function ElseStatement(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(ElseStatement.prototype, "type", {
        get: function () {
            return NodeType.Else;
        },
        enumerable: false,
        configurable: true
    });
    return ElseStatement;
}(BodyDeclaration));
var FunctionDeclaration = /** @class */ (function (_super) {
    __extends(FunctionDeclaration, _super);
    function FunctionDeclaration(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(FunctionDeclaration.prototype, "type", {
        get: function () {
            return NodeType.FunctionDeclaration;
        },
        enumerable: false,
        configurable: true
    });
    FunctionDeclaration.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    FunctionDeclaration.prototype.getIdentifier = function () {
        return this.identifier;
    };
    FunctionDeclaration.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    FunctionDeclaration.prototype.getParameters = function () {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    };
    return FunctionDeclaration;
}(BodyDeclaration));
var ViewPort = /** @class */ (function (_super) {
    __extends(ViewPort, _super);
    function ViewPort(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(ViewPort.prototype, "type", {
        get: function () {
            return NodeType.ViewPort;
        },
        enumerable: false,
        configurable: true
    });
    return ViewPort;
}(BodyDeclaration));
var FontFace = /** @class */ (function (_super) {
    __extends(FontFace, _super);
    function FontFace(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(FontFace.prototype, "type", {
        get: function () {
            return NodeType.FontFace;
        },
        enumerable: false,
        configurable: true
    });
    return FontFace;
}(BodyDeclaration));
var NestedProperties = /** @class */ (function (_super) {
    __extends(NestedProperties, _super);
    function NestedProperties(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(NestedProperties.prototype, "type", {
        get: function () {
            return NodeType.NestedProperties;
        },
        enumerable: false,
        configurable: true
    });
    return NestedProperties;
}(BodyDeclaration));
var Keyframe = /** @class */ (function (_super) {
    __extends(Keyframe, _super);
    function Keyframe(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Keyframe.prototype, "type", {
        get: function () {
            return NodeType.Keyframe;
        },
        enumerable: false,
        configurable: true
    });
    Keyframe.prototype.setKeyword = function (keyword) {
        return this.setNode('keyword', keyword, 0);
    };
    Keyframe.prototype.getKeyword = function () {
        return this.keyword;
    };
    Keyframe.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    Keyframe.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Keyframe.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    return Keyframe;
}(BodyDeclaration));
var KeyframeSelector = /** @class */ (function (_super) {
    __extends(KeyframeSelector, _super);
    function KeyframeSelector(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(KeyframeSelector.prototype, "type", {
        get: function () {
            return NodeType.KeyframeSelector;
        },
        enumerable: false,
        configurable: true
    });
    return KeyframeSelector;
}(BodyDeclaration));
var Import = /** @class */ (function (_super) {
    __extends(Import, _super);
    function Import(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Import.prototype, "type", {
        get: function () {
            return NodeType.Import;
        },
        enumerable: false,
        configurable: true
    });
    Import.prototype.setMedialist = function (node) {
        if (node) {
            node.attachTo(this);
            return true;
        }
        return false;
    };
    return Import;
}(Node));
var Use = /** @class */ (function (_super) {
    __extends(Use, _super);
    function Use() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Use.prototype, "type", {
        get: function () {
            return NodeType.Use;
        },
        enumerable: false,
        configurable: true
    });
    Use.prototype.getParameters = function () {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    };
    Use.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    Use.prototype.getIdentifier = function () {
        return this.identifier;
    };
    return Use;
}(Node));
var ModuleConfiguration = /** @class */ (function (_super) {
    __extends(ModuleConfiguration, _super);
    function ModuleConfiguration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ModuleConfiguration.prototype, "type", {
        get: function () {
            return NodeType.ModuleConfiguration;
        },
        enumerable: false,
        configurable: true
    });
    ModuleConfiguration.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    ModuleConfiguration.prototype.getIdentifier = function () {
        return this.identifier;
    };
    ModuleConfiguration.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    ModuleConfiguration.prototype.setValue = function (node) {
        return this.setNode('value', node, 0);
    };
    ModuleConfiguration.prototype.getValue = function () {
        return this.value;
    };
    return ModuleConfiguration;
}(Node));
var Forward = /** @class */ (function (_super) {
    __extends(Forward, _super);
    function Forward() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Forward.prototype, "type", {
        get: function () {
            return NodeType.Forward;
        },
        enumerable: false,
        configurable: true
    });
    Forward.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    Forward.prototype.getIdentifier = function () {
        return this.identifier;
    };
    Forward.prototype.getMembers = function () {
        if (!this.members) {
            this.members = new Nodelist(this);
        }
        return this.members;
    };
    Forward.prototype.getParameters = function () {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    };
    return Forward;
}(Node));
var ForwardVisibility = /** @class */ (function (_super) {
    __extends(ForwardVisibility, _super);
    function ForwardVisibility() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ForwardVisibility.prototype, "type", {
        get: function () {
            return NodeType.ForwardVisibility;
        },
        enumerable: false,
        configurable: true
    });
    ForwardVisibility.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    ForwardVisibility.prototype.getIdentifier = function () {
        return this.identifier;
    };
    return ForwardVisibility;
}(Node));
var Namespace = /** @class */ (function (_super) {
    __extends(Namespace, _super);
    function Namespace(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Namespace.prototype, "type", {
        get: function () {
            return NodeType.Namespace;
        },
        enumerable: false,
        configurable: true
    });
    return Namespace;
}(Node));
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Media.prototype, "type", {
        get: function () {
            return NodeType.Media;
        },
        enumerable: false,
        configurable: true
    });
    return Media;
}(BodyDeclaration));
var Supports = /** @class */ (function (_super) {
    __extends(Supports, _super);
    function Supports(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Supports.prototype, "type", {
        get: function () {
            return NodeType.Supports;
        },
        enumerable: false,
        configurable: true
    });
    return Supports;
}(BodyDeclaration));
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Document.prototype, "type", {
        get: function () {
            return NodeType.Document;
        },
        enumerable: false,
        configurable: true
    });
    return Document;
}(BodyDeclaration));
var Medialist = /** @class */ (function (_super) {
    __extends(Medialist, _super);
    function Medialist(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Medialist.prototype.getMediums = function () {
        if (!this.mediums) {
            this.mediums = new Nodelist(this);
        }
        return this.mediums;
    };
    return Medialist;
}(Node));
var MediaQuery = /** @class */ (function (_super) {
    __extends(MediaQuery, _super);
    function MediaQuery(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(MediaQuery.prototype, "type", {
        get: function () {
            return NodeType.MediaQuery;
        },
        enumerable: false,
        configurable: true
    });
    return MediaQuery;
}(Node));
var SupportsCondition = /** @class */ (function (_super) {
    __extends(SupportsCondition, _super);
    function SupportsCondition(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(SupportsCondition.prototype, "type", {
        get: function () {
            return NodeType.SupportsCondition;
        },
        enumerable: false,
        configurable: true
    });
    return SupportsCondition;
}(Node));
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Page.prototype, "type", {
        get: function () {
            return NodeType.Page;
        },
        enumerable: false,
        configurable: true
    });
    return Page;
}(BodyDeclaration));
var PageBoxMarginBox = /** @class */ (function (_super) {
    __extends(PageBoxMarginBox, _super);
    function PageBoxMarginBox(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(PageBoxMarginBox.prototype, "type", {
        get: function () {
            return NodeType.PageBoxMarginBox;
        },
        enumerable: false,
        configurable: true
    });
    return PageBoxMarginBox;
}(BodyDeclaration));
var Expression = /** @class */ (function (_super) {
    __extends(Expression, _super);
    function Expression(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Expression.prototype, "type", {
        get: function () {
            return NodeType.Expression;
        },
        enumerable: false,
        configurable: true
    });
    return Expression;
}(Node));
var BinaryExpression = /** @class */ (function (_super) {
    __extends(BinaryExpression, _super);
    function BinaryExpression(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(BinaryExpression.prototype, "type", {
        get: function () {
            return NodeType.BinaryExpression;
        },
        enumerable: false,
        configurable: true
    });
    BinaryExpression.prototype.setLeft = function (left) {
        return this.setNode('left', left);
    };
    BinaryExpression.prototype.getLeft = function () {
        return this.left;
    };
    BinaryExpression.prototype.setRight = function (right) {
        return this.setNode('right', right);
    };
    BinaryExpression.prototype.getRight = function () {
        return this.right;
    };
    BinaryExpression.prototype.setOperator = function (value) {
        return this.setNode('operator', value);
    };
    BinaryExpression.prototype.getOperator = function () {
        return this.operator;
    };
    return BinaryExpression;
}(Node));
var Term = /** @class */ (function (_super) {
    __extends(Term, _super);
    function Term(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Term.prototype, "type", {
        get: function () {
            return NodeType.Term;
        },
        enumerable: false,
        configurable: true
    });
    Term.prototype.setOperator = function (value) {
        return this.setNode('operator', value);
    };
    Term.prototype.getOperator = function () {
        return this.operator;
    };
    Term.prototype.setExpression = function (value) {
        return this.setNode('expression', value);
    };
    Term.prototype.getExpression = function () {
        return this.expression;
    };
    return Term;
}(Node));
var AttributeSelector = /** @class */ (function (_super) {
    __extends(AttributeSelector, _super);
    function AttributeSelector(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(AttributeSelector.prototype, "type", {
        get: function () {
            return NodeType.AttributeSelector;
        },
        enumerable: false,
        configurable: true
    });
    AttributeSelector.prototype.setNamespacePrefix = function (value) {
        return this.setNode('namespacePrefix', value);
    };
    AttributeSelector.prototype.getNamespacePrefix = function () {
        return this.namespacePrefix;
    };
    AttributeSelector.prototype.setIdentifier = function (value) {
        return this.setNode('identifier', value);
    };
    AttributeSelector.prototype.getIdentifier = function () {
        return this.identifier;
    };
    AttributeSelector.prototype.setOperator = function (operator) {
        return this.setNode('operator', operator);
    };
    AttributeSelector.prototype.getOperator = function () {
        return this.operator;
    };
    AttributeSelector.prototype.setValue = function (value) {
        return this.setNode('value', value);
    };
    AttributeSelector.prototype.getValue = function () {
        return this.value;
    };
    return AttributeSelector;
}(Node));
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Operator.prototype, "type", {
        get: function () {
            return NodeType.Operator;
        },
        enumerable: false,
        configurable: true
    });
    return Operator;
}(Node));
var HexColorValue = /** @class */ (function (_super) {
    __extends(HexColorValue, _super);
    function HexColorValue(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(HexColorValue.prototype, "type", {
        get: function () {
            return NodeType.HexColorValue;
        },
        enumerable: false,
        configurable: true
    });
    return HexColorValue;
}(Node));
var _dot = '.'.charCodeAt(0), _0$1 = '0'.charCodeAt(0), _9$1 = '9'.charCodeAt(0);
var NumericValue = /** @class */ (function (_super) {
    __extends(NumericValue, _super);
    function NumericValue(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(NumericValue.prototype, "type", {
        get: function () {
            return NodeType.NumericValue;
        },
        enumerable: false,
        configurable: true
    });
    NumericValue.prototype.getValue = function () {
        var raw = this.getText();
        var unitIdx = 0;
        var code;
        for (var i = 0, len = raw.length; i < len; i++) {
            code = raw.charCodeAt(i);
            if (!(_0$1 <= code && code <= _9$1 || code === _dot)) {
                break;
            }
            unitIdx += 1;
        }
        return {
            value: raw.substring(0, unitIdx),
            unit: unitIdx < raw.length ? raw.substring(unitIdx) : undefined
        };
    };
    return NumericValue;
}(Node));
var VariableDeclaration = /** @class */ (function (_super) {
    __extends(VariableDeclaration, _super);
    function VariableDeclaration(offset, length) {
        var _this = _super.call(this, offset, length) || this;
        _this.variable = null;
        _this.value = null;
        _this.needsSemicolon = true;
        return _this;
    }
    Object.defineProperty(VariableDeclaration.prototype, "type", {
        get: function () {
            return NodeType.VariableDeclaration;
        },
        enumerable: false,
        configurable: true
    });
    VariableDeclaration.prototype.setVariable = function (node) {
        if (node) {
            node.attachTo(this);
            this.variable = node;
            return true;
        }
        return false;
    };
    VariableDeclaration.prototype.getVariable = function () {
        return this.variable;
    };
    VariableDeclaration.prototype.getName = function () {
        return this.variable ? this.variable.getName() : '';
    };
    VariableDeclaration.prototype.setValue = function (node) {
        if (node) {
            node.attachTo(this);
            this.value = node;
            return true;
        }
        return false;
    };
    VariableDeclaration.prototype.getValue = function () {
        return this.value;
    };
    return VariableDeclaration;
}(AbstractDeclaration));
var Interpolation = /** @class */ (function (_super) {
    __extends(Interpolation, _super);
    // private _interpolations: void; // workaround for https://github.com/Microsoft/TypeScript/issues/18276
    function Interpolation(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Interpolation.prototype, "type", {
        get: function () {
            return NodeType.Interpolation;
        },
        enumerable: false,
        configurable: true
    });
    return Interpolation;
}(Node));
var Variable = /** @class */ (function (_super) {
    __extends(Variable, _super);
    function Variable(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(Variable.prototype, "type", {
        get: function () {
            return NodeType.VariableName;
        },
        enumerable: false,
        configurable: true
    });
    Variable.prototype.getName = function () {
        return this.getText();
    };
    return Variable;
}(Node));
var ExtendsReference = /** @class */ (function (_super) {
    __extends(ExtendsReference, _super);
    function ExtendsReference(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(ExtendsReference.prototype, "type", {
        get: function () {
            return NodeType.ExtendsReference;
        },
        enumerable: false,
        configurable: true
    });
    ExtendsReference.prototype.getSelectors = function () {
        if (!this.selectors) {
            this.selectors = new Nodelist(this);
        }
        return this.selectors;
    };
    return ExtendsReference;
}(Node));
var MixinContentReference = /** @class */ (function (_super) {
    __extends(MixinContentReference, _super);
    function MixinContentReference(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(MixinContentReference.prototype, "type", {
        get: function () {
            return NodeType.MixinContentReference;
        },
        enumerable: false,
        configurable: true
    });
    MixinContentReference.prototype.getArguments = function () {
        if (!this.arguments) {
            this.arguments = new Nodelist(this);
        }
        return this.arguments;
    };
    return MixinContentReference;
}(Node));
var MixinContentDeclaration = /** @class */ (function (_super) {
    __extends(MixinContentDeclaration, _super);
    function MixinContentDeclaration(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(MixinContentDeclaration.prototype, "type", {
        get: function () {
            return NodeType.MixinContentReference;
        },
        enumerable: false,
        configurable: true
    });
    MixinContentDeclaration.prototype.getParameters = function () {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    };
    return MixinContentDeclaration;
}(BodyDeclaration));
var MixinReference = /** @class */ (function (_super) {
    __extends(MixinReference, _super);
    function MixinReference(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(MixinReference.prototype, "type", {
        get: function () {
            return NodeType.MixinReference;
        },
        enumerable: false,
        configurable: true
    });
    MixinReference.prototype.getNamespaces = function () {
        if (!this.namespaces) {
            this.namespaces = new Nodelist(this);
        }
        return this.namespaces;
    };
    MixinReference.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    MixinReference.prototype.getIdentifier = function () {
        return this.identifier;
    };
    MixinReference.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    MixinReference.prototype.getArguments = function () {
        if (!this.arguments) {
            this.arguments = new Nodelist(this);
        }
        return this.arguments;
    };
    MixinReference.prototype.setContent = function (node) {
        return this.setNode('content', node);
    };
    MixinReference.prototype.getContent = function () {
        return this.content;
    };
    return MixinReference;
}(Node));
var MixinDeclaration = /** @class */ (function (_super) {
    __extends(MixinDeclaration, _super);
    function MixinDeclaration(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(MixinDeclaration.prototype, "type", {
        get: function () {
            return NodeType.MixinDeclaration;
        },
        enumerable: false,
        configurable: true
    });
    MixinDeclaration.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    MixinDeclaration.prototype.getIdentifier = function () {
        return this.identifier;
    };
    MixinDeclaration.prototype.getName = function () {
        return this.identifier ? this.identifier.getText() : '';
    };
    MixinDeclaration.prototype.getParameters = function () {
        if (!this.parameters) {
            this.parameters = new Nodelist(this);
        }
        return this.parameters;
    };
    MixinDeclaration.prototype.setGuard = function (node) {
        if (node) {
            node.attachTo(this);
            this.guard = node;
        }
        return false;
    };
    return MixinDeclaration;
}(BodyDeclaration));
var UnknownAtRule = /** @class */ (function (_super) {
    __extends(UnknownAtRule, _super);
    function UnknownAtRule(offset, length) {
        return _super.call(this, offset, length) || this;
    }
    Object.defineProperty(UnknownAtRule.prototype, "type", {
        get: function () {
            return NodeType.UnknownAtRule;
        },
        enumerable: false,
        configurable: true
    });
    UnknownAtRule.prototype.setAtRuleName = function (atRuleName) {
        this.atRuleName = atRuleName;
    };
    UnknownAtRule.prototype.getAtRuleName = function () {
        return this.atRuleName;
    };
    return UnknownAtRule;
}(BodyDeclaration));
var ListEntry = /** @class */ (function (_super) {
    __extends(ListEntry, _super);
    function ListEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ListEntry.prototype, "type", {
        get: function () {
            return NodeType.ListEntry;
        },
        enumerable: false,
        configurable: true
    });
    ListEntry.prototype.setKey = function (node) {
        return this.setNode('key', node, 0);
    };
    ListEntry.prototype.setValue = function (node) {
        return this.setNode('value', node, 1);
    };
    return ListEntry;
}(Node));
var LessGuard = /** @class */ (function (_super) {
    __extends(LessGuard, _super);
    function LessGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LessGuard.prototype.getConditions = function () {
        if (!this.conditions) {
            this.conditions = new Nodelist(this);
        }
        return this.conditions;
    };
    return LessGuard;
}(Node));
var GuardCondition = /** @class */ (function (_super) {
    __extends(GuardCondition, _super);
    function GuardCondition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuardCondition.prototype.setVariable = function (node) {
        return this.setNode('variable', node);
    };
    return GuardCondition;
}(Node));
var Module = /** @class */ (function (_super) {
    __extends(Module, _super);
    function Module() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Module.prototype, "type", {
        get: function () {
            return NodeType.Module;
        },
        enumerable: false,
        configurable: true
    });
    Module.prototype.setIdentifier = function (node) {
        return this.setNode('identifier', node, 0);
    };
    Module.prototype.getIdentifier = function () {
        return this.identifier;
    };
    return Module;
}(Node));
var Level;
(function (Level) {
    Level[Level["Ignore"] = 1] = "Ignore";
    Level[Level["Warning"] = 2] = "Warning";
    Level[Level["Error"] = 4] = "Error";
})(Level || (Level = {}));
var Marker = /** @class */ (function () {
    function Marker(node, rule, level, message, offset, length) {
        if (offset === void 0) { offset = node.offset; }
        if (length === void 0) { length = node.length; }
        this.node = node;
        this.rule = rule;
        this.level = level;
        this.message = message || rule.message;
        this.offset = offset;
        this.length = length;
    }
    Marker.prototype.getRule = function () {
        return this.rule;
    };
    Marker.prototype.getLevel = function () {
        return this.level;
    };
    Marker.prototype.getOffset = function () {
        return this.offset;
    };
    Marker.prototype.getLength = function () {
        return this.length;
    };
    Marker.prototype.getNode = function () {
        return this.node;
    };
    Marker.prototype.getMessage = function () {
        return this.message;
    };
    return Marker;
}());
/*
export class DefaultVisitor implements IVisitor {

    public visitNode(node:Node):boolean {
        switch (node.type) {
            case NodeType.Stylesheet:
                return this.visitStylesheet(<Stylesheet> node);
            case NodeType.FontFace:
                return this.visitFontFace(<FontFace> node);
            case NodeType.Ruleset:
                return this.visitRuleSet(<RuleSet> node);
            case NodeType.Selector:
                return this.visitSelector(<Selector> node);
            case NodeType.SimpleSelector:
                return this.visitSimpleSelector(<SimpleSelector> node);
            case NodeType.Declaration:
                return this.visitDeclaration(<Declaration> node);
            case NodeType.Function:
                return this.visitFunction(<Function> node);
            case NodeType.FunctionDeclaration:
                return this.visitFunctionDeclaration(<FunctionDeclaration> node);
            case NodeType.FunctionParameter:
                return this.visitFunctionParameter(<FunctionParameter> node);
            case NodeType.FunctionArgument:
                return this.visitFunctionArgument(<FunctionArgument> node);
            case NodeType.Term:
                return this.visitTerm(<Term> node);
            case NodeType.Declaration:
                return this.visitExpression(<Expression> node);
            case NodeType.NumericValue:
                return this.visitNumericValue(<NumericValue> node);
            case NodeType.Page:
                return this.visitPage(<Page> node);
            case NodeType.PageBoxMarginBox:
                return this.visitPageBoxMarginBox(<PageBoxMarginBox> node);
            case NodeType.Property:
                return this.visitProperty(<Property> node);
            case NodeType.NumericValue:
                return this.visitNodelist(<Nodelist> node);
            case NodeType.Import:
                return this.visitImport(<Import> node);
            case NodeType.Namespace:
                return this.visitNamespace(<Namespace> node);
            case NodeType.Keyframe:
                return this.visitKeyframe(<Keyframe> node);
            case NodeType.KeyframeSelector:
                return this.visitKeyframeSelector(<KeyframeSelector> node);
            case NodeType.MixinDeclaration:
                return this.visitMixinDeclaration(<MixinDeclaration> node);
            case NodeType.MixinReference:
                return this.visitMixinReference(<MixinReference> node);
            case NodeType.Variable:
                return this.visitVariable(<Variable> node);
            case NodeType.VariableDeclaration:
                return this.visitVariableDeclaration(<VariableDeclaration> node);
        }
        return this.visitUnknownNode(node);
    }

    public visitFontFace(node:FontFace):boolean {
        return true;
    }

    public visitKeyframe(node:Keyframe):boolean {
        return true;
    }

    public visitKeyframeSelector(node:KeyframeSelector):boolean {
        return true;
    }

    public visitStylesheet(node:Stylesheet):boolean {
        return true;
    }

    public visitProperty(Node:Property):boolean {
        return true;
    }

    public visitRuleSet(node:RuleSet):boolean {
        return true;
    }

    public visitSelector(node:Selector):boolean {
        return true;
    }

    public visitSimpleSelector(node:SimpleSelector):boolean {
        return true;
    }

    public visitDeclaration(node:Declaration):boolean {
        return true;
    }

    public visitFunction(node:Function):boolean {
        return true;
    }

    public visitFunctionDeclaration(node:FunctionDeclaration):boolean {
        return true;
    }

    public visitInvocation(node:Invocation):boolean {
        return true;
    }

    public visitTerm(node:Term):boolean {
        return true;
    }

    public visitImport(node:Import):boolean {
        return true;
    }

    public visitNamespace(node:Namespace):boolean {
        return true;
    }

    public visitExpression(node:Expression):boolean {
        return true;
    }

    public visitNumericValue(node:NumericValue):boolean {
        return true;
    }

    public visitPage(node:Page):boolean {
        return true;
    }

    public visitPageBoxMarginBox(node:PageBoxMarginBox):boolean {
        return true;
    }

    public visitNodelist(node:Nodelist):boolean {
        return true;
    }

    public visitVariableDeclaration(node:VariableDeclaration):boolean {
        return true;
    }

    public visitVariable(node:Variable):boolean {
        return true;
    }

    public visitMixinDeclaration(node:MixinDeclaration):boolean {
        return true;
    }

    public visitMixinReference(node:MixinReference):boolean {
        return true;
    }

    public visitUnknownNode(node:Node):boolean {
        return true;
    }
}
*/
var ParseErrorCollector = /** @class */ (function () {
    function ParseErrorCollector() {
        this.entries = [];
    }
    ParseErrorCollector.entries = function (node) {
        var visitor = new ParseErrorCollector();
        node.acceptVisitor(visitor);
        return visitor.entries;
    };
    ParseErrorCollector.prototype.visitNode = function (node) {
        if (node.isErroneous()) {
            node.collectIssues(this.entries);
        }
        return true;
    };
    return ParseErrorCollector;
}());

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
var localize$1 = loadMessageBundle();
var CSSIssueType = /** @class */ (function () {
    function CSSIssueType(id, message) {
        this.id = id;
        this.message = message;
    }
    return CSSIssueType;
}());
var ParseError = {
    NumberExpected: new CSSIssueType('css-numberexpected', localize$1('expected.number', "number expected")),
    ConditionExpected: new CSSIssueType('css-conditionexpected', localize$1('expected.condt', "condition expected")),
    RuleOrSelectorExpected: new CSSIssueType('css-ruleorselectorexpected', localize$1('expected.ruleorselector', "at-rule or selector expected")),
    DotExpected: new CSSIssueType('css-dotexpected', localize$1('expected.dot', "dot expected")),
    ColonExpected: new CSSIssueType('css-colonexpected', localize$1('expected.colon', "colon expected")),
    SemiColonExpected: new CSSIssueType('css-semicolonexpected', localize$1('expected.semicolon', "semi-colon expected")),
    TermExpected: new CSSIssueType('css-termexpected', localize$1('expected.term', "term expected")),
    ExpressionExpected: new CSSIssueType('css-expressionexpected', localize$1('expected.expression', "expression expected")),
    OperatorExpected: new CSSIssueType('css-operatorexpected', localize$1('expected.operator', "operator expected")),
    IdentifierExpected: new CSSIssueType('css-identifierexpected', localize$1('expected.ident', "identifier expected")),
    PercentageExpected: new CSSIssueType('css-percentageexpected', localize$1('expected.percentage', "percentage expected")),
    URIOrStringExpected: new CSSIssueType('css-uriorstringexpected', localize$1('expected.uriorstring', "uri or string expected")),
    URIExpected: new CSSIssueType('css-uriexpected', localize$1('expected.uri', "URI expected")),
    VariableNameExpected: new CSSIssueType('css-varnameexpected', localize$1('expected.varname', "variable name expected")),
    VariableValueExpected: new CSSIssueType('css-varvalueexpected', localize$1('expected.varvalue', "variable value expected")),
    PropertyValueExpected: new CSSIssueType('css-propertyvalueexpected', localize$1('expected.propvalue', "property value expected")),
    LeftCurlyExpected: new CSSIssueType('css-lcurlyexpected', localize$1('expected.lcurly', "{ expected")),
    RightCurlyExpected: new CSSIssueType('css-rcurlyexpected', localize$1('expected.rcurly', "} expected")),
    LeftSquareBracketExpected: new CSSIssueType('css-rbracketexpected', localize$1('expected.lsquare', "[ expected")),
    RightSquareBracketExpected: new CSSIssueType('css-lbracketexpected', localize$1('expected.rsquare', "] expected")),
    LeftParenthesisExpected: new CSSIssueType('css-lparentexpected', localize$1('expected.lparen', "( expected")),
    RightParenthesisExpected: new CSSIssueType('css-rparentexpected', localize$1('expected.rparent', ") expected")),
    CommaExpected: new CSSIssueType('css-commaexpected', localize$1('expected.comma', "comma expected")),
    PageDirectiveOrDeclarationExpected: new CSSIssueType('css-pagedirordeclexpected', localize$1('expected.pagedirordecl', "page directive or declaraton expected")),
    UnknownAtRule: new CSSIssueType('css-unknownatrule', localize$1('unknown.atrule', "at-rule unknown")),
    UnknownKeyword: new CSSIssueType('css-unknownkeyword', localize$1('unknown.keyword', "unknown keyword")),
    SelectorExpected: new CSSIssueType('css-selectorexpected', localize$1('expected.selector', "selector expected")),
    StringLiteralExpected: new CSSIssueType('css-stringliteralexpected', localize$1('expected.stringliteral', "string literal expected")),
    WhitespaceExpected: new CSSIssueType('css-whitespaceexpected', localize$1('expected.whitespace', "whitespace expected")),
    MediaQueryExpected: new CSSIssueType('css-mediaqueryexpected', localize$1('expected.mediaquery', "media query expected")),
    IdentifierOrWildcardExpected: new CSSIssueType('css-idorwildcardexpected', localize$1('expected.idorwildcard', "identifier or wildcard expected")),
    WildcardExpected: new CSSIssueType('css-wildcardexpected', localize$1('expected.wildcard', "wildcard expected")),
    IdentifierOrVariableExpected: new CSSIssueType('css-idorvarexpected', localize$1('expected.idorvar', "identifier or variable expected")),
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var browserNames = {
    E: 'Edge',
    FF: 'Firefox',
    S: 'Safari',
    C: 'Chrome',
    IE: 'IE',
    O: 'Opera'
};
function getEntryStatus(status) {
    switch (status) {
        case 'experimental':
            return '⚠️ Property is experimental. Be cautious when using it.️\n\n';
        case 'nonstandard':
            return '🚨️ Property is nonstandard. Avoid using it.\n\n';
        case 'obsolete':
            return '🚨️️️ Property is obsolete. Avoid using it.\n\n';
        default:
            return '';
    }
}
function getEntryDescription(entry, doesSupportMarkdown, settings) {
    var result;
    if (doesSupportMarkdown) {
        result = {
            kind: 'markdown',
            value: getEntryMarkdownDescription(entry, settings)
        };
    }
    else {
        result = {
            kind: 'plaintext',
            value: getEntryStringDescription(entry, settings)
        };
    }
    if (result.value === '') {
        return undefined;
    }
    return result;
}
function textToMarkedString(text) {
    text = text.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function getEntryStringDescription(entry, settings) {
    if (!entry.description || entry.description === '') {
        return '';
    }
    if (typeof entry.description !== 'string') {
        return entry.description.value;
    }
    var result = '';
    if ((settings === null || settings === void 0 ? void 0 : settings.documentation) !== false) {
        if (entry.status) {
            result += getEntryStatus(entry.status);
        }
        result += entry.description;
        var browserLabel = getBrowserLabel(entry.browsers);
        if (browserLabel) {
            result += '\n(' + browserLabel + ')';
        }
        if ('syntax' in entry) {
            result += "\n\nSyntax: " + entry.syntax;
        }
    }
    if (entry.references && entry.references.length > 0 && (settings === null || settings === void 0 ? void 0 : settings.references) !== false) {
        if (result.length > 0) {
            result += '\n\n';
        }
        result += entry.references.map(function (r) {
            return r.name + ": " + r.url;
        }).join(' | ');
    }
    return result;
}
function getEntryMarkdownDescription(entry, settings) {
    if (!entry.description || entry.description === '') {
        return '';
    }
    var result = '';
    if ((settings === null || settings === void 0 ? void 0 : settings.documentation) !== false) {
        if (entry.status) {
            result += getEntryStatus(entry.status);
        }
        var description = typeof entry.description === 'string' ? entry.description : entry.description.value;
        result += textToMarkedString(description);
        var browserLabel = getBrowserLabel(entry.browsers);
        if (browserLabel) {
            result += '\n\n(' + textToMarkedString(browserLabel) + ')';
        }
        if ('syntax' in entry && entry.syntax) {
            result += "\n\nSyntax: " + textToMarkedString(entry.syntax);
        }
    }
    if (entry.references && entry.references.length > 0 && (settings === null || settings === void 0 ? void 0 : settings.references) !== false) {
        if (result.length > 0) {
            result += '\n\n';
        }
        result += entry.references.map(function (r) {
            return "[" + r.name + "](" + r.url + ")";
        }).join(' | ');
    }
    return result;
}
/**
 * Input is like `["E12","FF49","C47","IE","O"]`
 * Output is like `Edge 12, Firefox 49, Chrome 47, IE, Opera`
 */
function getBrowserLabel(browsers) {
    if (browsers === void 0) { browsers = []; }
    if (browsers.length === 0) {
        return null;
    }
    return browsers
        .map(function (b) {
        var result = '';
        var matches = b.match(/([A-Z]+)(\d+)?/);
        var name = matches[1];
        var version = matches[2];
        if (name in browserNames) {
            result += browserNames[name];
        }
        if (version) {
            result += ' ' + version;
        }
        return result;
    })
        .join(', ');
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var localize$2 = loadMessageBundle();
var colorFunctions = [
    { func: 'rgb($red, $green, $blue)', desc: localize$2('css.builtin.rgb', 'Creates a Color from red, green, and blue values.') },
    { func: 'rgba($red, $green, $blue, $alpha)', desc: localize$2('css.builtin.rgba', 'Creates a Color from red, green, blue, and alpha values.') },
    { func: 'hsl($hue, $saturation, $lightness)', desc: localize$2('css.builtin.hsl', 'Creates a Color from hue, saturation, and lightness values.') },
    { func: 'hsla($hue, $saturation, $lightness, $alpha)', desc: localize$2('css.builtin.hsla', 'Creates a Color from hue, saturation, lightness, and alpha values.') }
];
var colors = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgrey: '#a9a9a9',
    darkgreen: '#006400',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgrey: '#d3d3d3',
    lightgreen: '#90ee90',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370d8',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#d87093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    red: '#ff0000',
    rebeccapurple: '#663399',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32'
};
var colorKeywords = {
    'currentColor': 'The value of the \'color\' property. The computed value of the \'currentColor\' keyword is the computed value of the \'color\' property. If the \'currentColor\' keyword is set on the \'color\' property itself, it is treated as \'color:inherit\' at parse time.',
    'transparent': 'Fully transparent. This keyword can be considered a shorthand for rgba(0,0,0,0) which is its computed value.',
};
function getNumericValue(node, factor) {
    var val = node.getText();
    var m = val.match(/^([-+]?[0-9]*\.?[0-9]+)(%?)$/);
    if (m) {
        if (m[2]) {
            factor = 100.0;
        }
        var result = parseFloat(m[1]) / factor;
        if (result >= 0 && result <= 1) {
            return result;
        }
    }
    throw new Error();
}
function getAngle(node) {
    var val = node.getText();
    var m = val.match(/^([-+]?[0-9]*\.?[0-9]+)(deg)?$/);
    if (m) {
        return parseFloat(val) % 360;
    }
    throw new Error();
}
function isColorConstructor(node) {
    var name = node.getName();
    if (!name) {
        return false;
    }
    return /^(rgb|rgba|hsl|hsla)$/gi.test(name);
}
var Digit0 = 48;
var Digit9 = 57;
var A = 65;
var a = 97;
var f = 102;
function hexDigit(charCode) {
    if (charCode < Digit0) {
        return 0;
    }
    if (charCode <= Digit9) {
        return charCode - Digit0;
    }
    if (charCode < a) {
        charCode += (a - A);
    }
    if (charCode >= a && charCode <= f) {
        return charCode - a + 10;
    }
    return 0;
}
function colorFromHex(text) {
    if (text[0] !== '#') {
        return null;
    }
    switch (text.length) {
        case 4:
            return {
                red: (hexDigit(text.charCodeAt(1)) * 0x11) / 255.0,
                green: (hexDigit(text.charCodeAt(2)) * 0x11) / 255.0,
                blue: (hexDigit(text.charCodeAt(3)) * 0x11) / 255.0,
                alpha: 1
            };
        case 5:
            return {
                red: (hexDigit(text.charCodeAt(1)) * 0x11) / 255.0,
                green: (hexDigit(text.charCodeAt(2)) * 0x11) / 255.0,
                blue: (hexDigit(text.charCodeAt(3)) * 0x11) / 255.0,
                alpha: (hexDigit(text.charCodeAt(4)) * 0x11) / 255.0,
            };
        case 7:
            return {
                red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
                green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
                blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
                alpha: 1
            };
        case 9:
            return {
                red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
                green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
                blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
                alpha: (hexDigit(text.charCodeAt(7)) * 0x10 + hexDigit(text.charCodeAt(8))) / 255.0
            };
    }
    return null;
}
function colorFromHSL(hue, sat, light, alpha) {
    if (alpha === void 0) { alpha = 1.0; }
    hue = hue / 60.0;
    if (sat === 0) {
        return { red: light, green: light, blue: light, alpha: alpha };
    }
    else {
        var hueToRgb = function (t1, t2, hue) {
            while (hue < 0) {
                hue += 6;
            }
            while (hue >= 6) {
                hue -= 6;
            }
            if (hue < 1) {
                return (t2 - t1) * hue + t1;
            }
            if (hue < 3) {
                return t2;
            }
            if (hue < 4) {
                return (t2 - t1) * (4 - hue) + t1;
            }
            return t1;
        };
        var t2 = light <= 0.5 ? (light * (sat + 1)) : (light + sat - (light * sat));
        var t1 = light * 2 - t2;
        return { red: hueToRgb(t1, t2, hue + 2), green: hueToRgb(t1, t2, hue), blue: hueToRgb(t1, t2, hue - 2), alpha: alpha };
    }
}
function hslFromColor(rgba) {
    var r = rgba.red;
    var g = rgba.green;
    var b = rgba.blue;
    var a = rgba.alpha;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (min + max) / 2;
    var chroma = max - min;
    if (chroma > 0) {
        s = Math.min((l <= 0.5 ? chroma / (2 * l) : chroma / (2 - (2 * l))), 1);
        switch (max) {
            case r:
                h = (g - b) / chroma + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / chroma + 2;
                break;
            case b:
                h = (r - g) / chroma + 4;
                break;
        }
        h *= 60;
        h = Math.round(h);
    }
    return { h: h, s: s, l: l, a: a };
}
function getColorValue(node) {
    if (node.type === NodeType.HexColorValue) {
        var text = node.getText();
        return colorFromHex(text);
    }
    else if (node.type === NodeType.Function) {
        var functionNode = node;
        var name = functionNode.getName();
        var colorValues = functionNode.getArguments().getChildren();
        if (!name || colorValues.length < 3 || colorValues.length > 4) {
            return null;
        }
        try {
            var alpha = colorValues.length === 4 ? getNumericValue(colorValues[3], 1) : 1;
            if (name === 'rgb' || name === 'rgba') {
                return {
                    red: getNumericValue(colorValues[0], 255.0),
                    green: getNumericValue(colorValues[1], 255.0),
                    blue: getNumericValue(colorValues[2], 255.0),
                    alpha: alpha
                };
            }
            else if (name === 'hsl' || name === 'hsla') {
                var h = getAngle(colorValues[0]);
                var s = getNumericValue(colorValues[1], 100.0);
                var l = getNumericValue(colorValues[2], 100.0);
                return colorFromHSL(h, s, l, alpha);
            }
        }
        catch (e) {
            // parse error on numeric value
            return null;
        }
    }
    else if (node.type === NodeType.Identifier) {
        if (node.parent && node.parent.type !== NodeType.Term) {
            return null;
        }
        var term = node.parent;
        if (term && term.parent && term.parent.type === NodeType.BinaryExpression) {
            var expression = term.parent;
            if (expression.parent && expression.parent.type === NodeType.ListEntry && expression.parent.key === expression) {
                return null;
            }
        }
        var candidateColor = node.getText().toLowerCase();
        if (candidateColor === 'none') {
            return null;
        }
        var colorHex = colors[candidateColor];
        if (colorHex) {
            return colorFromHex(colorHex);
        }
    }
    return null;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var positionKeywords = {
    'bottom': 'Computes to ‘100%’ for the vertical position if one or two values are given, otherwise specifies the bottom edge as the origin for the next offset.',
    'center': 'Computes to ‘50%’ (‘left 50%’) for the horizontal position if the horizontal position is not otherwise specified, or ‘50%’ (‘top 50%’) for the vertical position if it is.',
    'left': 'Computes to ‘0%’ for the horizontal position if one or two values are given, otherwise specifies the left edge as the origin for the next offset.',
    'right': 'Computes to ‘100%’ for the horizontal position if one or two values are given, otherwise specifies the right edge as the origin for the next offset.',
    'top': 'Computes to ‘0%’ for the vertical position if one or two values are given, otherwise specifies the top edge as the origin for the next offset.'
};
var repeatStyleKeywords = {
    'no-repeat': 'Placed once and not repeated in this direction.',
    'repeat': 'Repeated in this direction as often as needed to cover the background painting area.',
    'repeat-x': 'Computes to ‘repeat no-repeat’.',
    'repeat-y': 'Computes to ‘no-repeat repeat’.',
    'round': 'Repeated as often as will fit within the background positioning area. If it doesn’t fit a whole number of times, it is rescaled so that it does.',
    'space': 'Repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area.'
};
var lineStyleKeywords = {
    'dashed': 'A series of square-ended dashes.',
    'dotted': 'A series of round dots.',
    'double': 'Two parallel solid lines with some space between them.',
    'groove': 'Looks as if it were carved in the canvas.',
    'hidden': 'Same as ‘none’, but has different behavior in the border conflict resolution rules for border-collapsed tables.',
    'inset': 'Looks as if the content on the inside of the border is sunken into the canvas.',
    'none': 'No border. Color and width are ignored.',
    'outset': 'Looks as if the content on the inside of the border is coming out of the canvas.',
    'ridge': 'Looks as if it were coming out of the canvas.',
    'solid': 'A single line segment.'
};
var lineWidthKeywords = ['medium', 'thick', 'thin'];
var boxKeywords = {
    'border-box': 'The background is painted within (clipped to) the border box.',
    'content-box': 'The background is painted within (clipped to) the content box.',
    'padding-box': 'The background is painted within (clipped to) the padding box.'
};
var geometryBoxKeywords = {
    'margin-box': 'Uses the margin box as reference box.',
    'fill-box': 'Uses the object bounding box as reference box.',
    'stroke-box': 'Uses the stroke bounding box as reference box.',
    'view-box': 'Uses the nearest SVG viewport as reference box.'
};
var cssWideKeywords = {
    'initial': 'Represents the value specified as the property’s initial value.',
    'inherit': 'Represents the computed value of the property on the element’s parent.',
    'unset': 'Acts as either `inherit` or `initial`, depending on whether the property is inherited or not.'
};
var imageFunctions = {
    'url()': 'Reference an image file by URL',
    'image()': 'Provide image fallbacks and annotations.',
    '-webkit-image-set()': 'Provide multiple resolutions. Remember to use unprefixed image-set() in addition.',
    'image-set()': 'Provide multiple resolutions of an image and const the UA decide which is most appropriate in a given situation.',
    '-moz-element()': 'Use an element in the document as an image. Remember to use unprefixed element() in addition.',
    'element()': 'Use an element in the document as an image.',
    'cross-fade()': 'Indicates the two images to be combined and how far along in the transition the combination is.',
    '-webkit-gradient()': 'Deprecated. Use modern linear-gradient() or radial-gradient() instead.',
    '-webkit-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
    '-moz-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
    '-o-linear-gradient()': 'Linear gradient. Remember to use unprefixed version in addition.',
    'linear-gradient()': 'A linear gradient is created by specifying a straight gradient line, and then several colors placed along that line.',
    '-webkit-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
    '-moz-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
    '-o-repeating-linear-gradient()': 'Repeating Linear gradient. Remember to use unprefixed version in addition.',
    'repeating-linear-gradient()': 'Same as linear-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.',
    '-webkit-radial-gradient()': 'Radial gradient. Remember to use unprefixed version in addition.',
    '-moz-radial-gradient()': 'Radial gradient. Remember to use unprefixed version in addition.',
    'radial-gradient()': 'Colors emerge from a single point and smoothly spread outward in a circular or elliptical shape.',
    '-webkit-repeating-radial-gradient()': 'Repeating radial gradient. Remember to use unprefixed version in addition.',
    '-moz-repeating-radial-gradient()': 'Repeating radial gradient. Remember to use unprefixed version in addition.',
    'repeating-radial-gradient()': 'Same as radial-gradient, except the color-stops are repeated infinitely in both directions, with their positions shifted by multiples of the difference between the last specified color-stop’s position and the first specified color-stop’s position.'
};
var transitionTimingFunctions = {
    'ease': 'Equivalent to cubic-bezier(0.25, 0.1, 0.25, 1.0).',
    'ease-in': 'Equivalent to cubic-bezier(0.42, 0, 1.0, 1.0).',
    'ease-in-out': 'Equivalent to cubic-bezier(0.42, 0, 0.58, 1.0).',
    'ease-out': 'Equivalent to cubic-bezier(0, 0, 0.58, 1.0).',
    'linear': 'Equivalent to cubic-bezier(0.0, 0.0, 1.0, 1.0).',
    'step-end': 'Equivalent to steps(1, end).',
    'step-start': 'Equivalent to steps(1, start).',
    'steps()': 'The first parameter specifies the number of intervals in the function. The second parameter, which is optional, is either the value “start” or “end”.',
    'cubic-bezier()': 'Specifies a cubic-bezier curve. The four values specify points P1 and P2  of the curve as (x1, y1, x2, y2).',
    'cubic-bezier(0.6, -0.28, 0.735, 0.045)': 'Ease-in Back. Overshoots.',
    'cubic-bezier(0.68, -0.55, 0.265, 1.55)': 'Ease-in-out Back. Overshoots.',
    'cubic-bezier(0.175, 0.885, 0.32, 1.275)': 'Ease-out Back. Overshoots.',
    'cubic-bezier(0.6, 0.04, 0.98, 0.335)': 'Ease-in Circular. Based on half circle.',
    'cubic-bezier(0.785, 0.135, 0.15, 0.86)': 'Ease-in-out Circular. Based on half circle.',
    'cubic-bezier(0.075, 0.82, 0.165, 1)': 'Ease-out Circular. Based on half circle.',
    'cubic-bezier(0.55, 0.055, 0.675, 0.19)': 'Ease-in Cubic. Based on power of three.',
    'cubic-bezier(0.645, 0.045, 0.355, 1)': 'Ease-in-out Cubic. Based on power of three.',
    'cubic-bezier(0.215, 0.610, 0.355, 1)': 'Ease-out Cubic. Based on power of three.',
    'cubic-bezier(0.95, 0.05, 0.795, 0.035)': 'Ease-in Exponential. Based on two to the power ten.',
    'cubic-bezier(1, 0, 0, 1)': 'Ease-in-out Exponential. Based on two to the power ten.',
    'cubic-bezier(0.19, 1, 0.22, 1)': 'Ease-out Exponential. Based on two to the power ten.',
    'cubic-bezier(0.47, 0, 0.745, 0.715)': 'Ease-in Sine.',
    'cubic-bezier(0.445, 0.05, 0.55, 0.95)': 'Ease-in-out Sine.',
    'cubic-bezier(0.39, 0.575, 0.565, 1)': 'Ease-out Sine.',
    'cubic-bezier(0.55, 0.085, 0.68, 0.53)': 'Ease-in Quadratic. Based on power of two.',
    'cubic-bezier(0.455, 0.03, 0.515, 0.955)': 'Ease-in-out Quadratic. Based on power of two.',
    'cubic-bezier(0.25, 0.46, 0.45, 0.94)': 'Ease-out Quadratic. Based on power of two.',
    'cubic-bezier(0.895, 0.03, 0.685, 0.22)': 'Ease-in Quartic. Based on power of four.',
    'cubic-bezier(0.77, 0, 0.175, 1)': 'Ease-in-out Quartic. Based on power of four.',
    'cubic-bezier(0.165, 0.84, 0.44, 1)': 'Ease-out Quartic. Based on power of four.',
    'cubic-bezier(0.755, 0.05, 0.855, 0.06)': 'Ease-in Quintic. Based on power of five.',
    'cubic-bezier(0.86, 0, 0.07, 1)': 'Ease-in-out Quintic. Based on power of five.',
    'cubic-bezier(0.23, 1, 0.320, 1)': 'Ease-out Quintic. Based on power of five.'
};
var basicShapeFunctions = {
    'circle()': 'Defines a circle.',
    'ellipse()': 'Defines an ellipse.',
    'inset()': 'Defines an inset rectangle.',
    'polygon()': 'Defines a polygon.'
};
var units = {
    'length': ['em', 'rem', 'ex', 'px', 'cm', 'mm', 'in', 'pt', 'pc', 'ch', 'vw', 'vh', 'vmin', 'vmax'],
    'angle': ['deg', 'rad', 'grad', 'turn'],
    'time': ['ms', 's'],
    'frequency': ['Hz', 'kHz'],
    'resolution': ['dpi', 'dpcm', 'dppx'],
    'percentage': ['%', 'fr']
};
var html5Tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer',
    'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link',
    'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q',
    'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td',
    'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'const', 'video', 'wbr'];
var svgElements = ['circle', 'clipPath', 'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
    'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
    'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'foreignObject', 'g', 'hatch', 'hatchpath', 'image', 'line', 'linearGradient',
    'marker', 'mask', 'mesh', 'meshpatch', 'meshrow', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'set', 'solidcolor', 'stop', 'svg', 'switch',
    'symbol', 'text', 'textPath', 'tspan', 'use', 'view'];
var pageBoxDirectives = [
    '@bottom-center', '@bottom-left', '@bottom-left-corner', '@bottom-right', '@bottom-right-corner',
    '@left-bottom', '@left-middle', '@left-top', '@right-bottom', '@right-middle', '@right-top',
    '@top-center', '@top-left', '@top-left-corner', '@top-right', '@top-right-corner'
];

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function isDefined(obj) {
    return typeof obj !== 'undefined';
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/// <summary>
/// A parser for the css core specification. See for reference:
/// https://www.w3.org/TR/CSS21/grammar.html
/// http://www.w3.org/TR/CSS21/syndata.html#tokenization
/// </summary>
var Parser = /** @class */ (function () {
    function Parser(scnr) {
        if (scnr === void 0) { scnr = new Scanner(); }
        this.keyframeRegex = /^@(\-(webkit|ms|moz|o)\-)?keyframes$/i;
        this.scanner = scnr;
        this.token = { type: TokenType.EOF, offset: -1, len: 0, text: '' };
        this.prevToken = undefined;
    }
    Parser.prototype.peekIdent = function (text) {
        return TokenType.Ident === this.token.type && text.length === this.token.text.length && text === this.token.text.toLowerCase();
    };
    Parser.prototype.peekKeyword = function (text) {
        return TokenType.AtKeyword === this.token.type && text.length === this.token.text.length && text === this.token.text.toLowerCase();
    };
    Parser.prototype.peekDelim = function (text) {
        return TokenType.Delim === this.token.type && text === this.token.text;
    };
    Parser.prototype.peek = function (type) {
        return type === this.token.type;
    };
    Parser.prototype.peekOne = function (types) {
        return types.indexOf(this.token.type) !== -1;
    };
    Parser.prototype.peekRegExp = function (type, regEx) {
        if (type !== this.token.type) {
            return false;
        }
        return regEx.test(this.token.text);
    };
    Parser.prototype.hasWhitespace = function () {
        return !!this.prevToken && (this.prevToken.offset + this.prevToken.len !== this.token.offset);
    };
    Parser.prototype.consumeToken = function () {
        this.prevToken = this.token;
        this.token = this.scanner.scan();
    };
    Parser.prototype.mark = function () {
        return {
            prev: this.prevToken,
            curr: this.token,
            pos: this.scanner.pos()
        };
    };
    Parser.prototype.restoreAtMark = function (mark) {
        this.prevToken = mark.prev;
        this.token = mark.curr;
        this.scanner.goBackTo(mark.pos);
    };
    Parser.prototype.try = function (func) {
        var pos = this.mark();
        var node = func();
        if (!node) {
            this.restoreAtMark(pos);
            return null;
        }
        return node;
    };
    Parser.prototype.acceptOneKeyword = function (keywords) {
        if (TokenType.AtKeyword === this.token.type) {
            for (var _i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
                var keyword = keywords_1[_i];
                if (keyword.length === this.token.text.length && keyword === this.token.text.toLowerCase()) {
                    this.consumeToken();
                    return true;
                }
            }
        }
        return false;
    };
    Parser.prototype.accept = function (type) {
        if (type === this.token.type) {
            this.consumeToken();
            return true;
        }
        return false;
    };
    Parser.prototype.acceptIdent = function (text) {
        if (this.peekIdent(text)) {
            this.consumeToken();
            return true;
        }
        return false;
    };
    Parser.prototype.acceptKeyword = function (text) {
        if (this.peekKeyword(text)) {
            this.consumeToken();
            return true;
        }
        return false;
    };
    Parser.prototype.acceptDelim = function (text) {
        if (this.peekDelim(text)) {
            this.consumeToken();
            return true;
        }
        return false;
    };
    Parser.prototype.acceptRegexp = function (regEx) {
        if (regEx.test(this.token.text)) {
            this.consumeToken();
            return true;
        }
        return false;
    };
    Parser.prototype._parseRegexp = function (regEx) {
        var node = this.createNode(NodeType.Identifier);
        do { } while (this.acceptRegexp(regEx));
        return this.finish(node);
    };
    Parser.prototype.acceptUnquotedString = function () {
        var pos = this.scanner.pos();
        this.scanner.goBackTo(this.token.offset);
        var unquoted = this.scanner.scanUnquotedString();
        if (unquoted) {
            this.token = unquoted;
            this.consumeToken();
            return true;
        }
        this.scanner.goBackTo(pos);
        return false;
    };
    Parser.prototype.resync = function (resyncTokens, resyncStopTokens) {
        while (true) {
            if (resyncTokens && resyncTokens.indexOf(this.token.type) !== -1) {
                this.consumeToken();
                return true;
            }
            else if (resyncStopTokens && resyncStopTokens.indexOf(this.token.type) !== -1) {
                return true;
            }
            else {
                if (this.token.type === TokenType.EOF) {
                    return false;
                }
                this.token = this.scanner.scan();
            }
        }
    };
    Parser.prototype.createNode = function (nodeType) {
        return new Node(this.token.offset, this.token.len, nodeType);
    };
    Parser.prototype.create = function (ctor) {
        return new ctor(this.token.offset, this.token.len);
    };
    Parser.prototype.finish = function (node, error, resyncTokens, resyncStopTokens) {
        // parseNumeric misuses error for boolean flagging (however the real error mustn't be a false)
        // + nodelist offsets mustn't be modified, because there is a offset hack in rulesets for smartselection
        if (!(node instanceof Nodelist)) {
            if (error) {
                this.markError(node, error, resyncTokens, resyncStopTokens);
            }
            // set the node end position
            if (this.prevToken) {
                // length with more elements belonging together
                var prevEnd = this.prevToken.offset + this.prevToken.len;
                node.length = prevEnd > node.offset ? prevEnd - node.offset : 0; // offset is taken from current token, end from previous: Use 0 for empty nodes
            }
        }
        return node;
    };
    Parser.prototype.markError = function (node, error, resyncTokens, resyncStopTokens) {
        if (this.token !== this.lastErrorToken) { // do not report twice on the same token
            node.addIssue(new Marker(node, error, Level.Error, undefined, this.token.offset, this.token.len));
            this.lastErrorToken = this.token;
        }
        if (resyncTokens || resyncStopTokens) {
            this.resync(resyncTokens, resyncStopTokens);
        }
    };
    Parser.prototype.parseStylesheet = function (textDocument) {
        var versionId = textDocument.version;
        var text = textDocument.getText();
        var textProvider = function (offset, length) {
            if (textDocument.version !== versionId) {
                throw new Error('Underlying model has changed, AST is no longer valid');
            }
            return text.substr(offset, length);
        };
        return this.internalParse(text, this._parseStylesheet, textProvider);
    };
    Parser.prototype.internalParse = function (input, parseFunc, textProvider) {
        this.scanner.setSource(input);
        this.token = this.scanner.scan();
        var node = parseFunc.bind(this)();
        if (node) {
            if (textProvider) {
                node.textProvider = textProvider;
            }
            else {
                node.textProvider = function (offset, length) { return input.substr(offset, length); };
            }
        }
        return node;
    };
    Parser.prototype._parseStylesheet = function () {
        var node = this.create(Stylesheet);
        while (node.addChild(this._parseStylesheetStart())) {
            // Parse statements only valid at the beginning of stylesheets.
        }
        var inRecovery = false;
        do {
            var hasMatch = false;
            do {
                hasMatch = false;
                var statement = this._parseStylesheetStatement();
                if (statement) {
                    node.addChild(statement);
                    hasMatch = true;
                    inRecovery = false;
                    if (!this.peek(TokenType.EOF) && this._needsSemicolonAfter(statement) && !this.accept(TokenType.SemiColon)) {
                        this.markError(node, ParseError.SemiColonExpected);
                    }
                }
                while (this.accept(TokenType.SemiColon) || this.accept(TokenType.CDO) || this.accept(TokenType.CDC)) {
                    // accept empty statements
                    hasMatch = true;
                    inRecovery = false;
                }
            } while (hasMatch);
            if (this.peek(TokenType.EOF)) {
                break;
            }
            if (!inRecovery) {
                if (this.peek(TokenType.AtKeyword)) {
                    this.markError(node, ParseError.UnknownAtRule);
                }
                else {
                    this.markError(node, ParseError.RuleOrSelectorExpected);
                }
                inRecovery = true;
            }
            this.consumeToken();
        } while (!this.peek(TokenType.EOF));
        return this.finish(node);
    };
    Parser.prototype._parseStylesheetStart = function () {
        return this._parseCharset();
    };
    Parser.prototype._parseStylesheetStatement = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        if (this.peek(TokenType.AtKeyword)) {
            return this._parseStylesheetAtStatement(isNested);
        }
        return this._parseRuleset(isNested);
    };
    Parser.prototype._parseStylesheetAtStatement = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        return this._parseImport()
            || this._parseMedia(isNested)
            || this._parsePage()
            || this._parseFontFace()
            || this._parseKeyframe()
            || this._parseSupports(isNested)
            || this._parseViewPort()
            || this._parseNamespace()
            || this._parseDocument()
            || this._parseUnknownAtRule();
    };
    Parser.prototype._tryParseRuleset = function (isNested) {
        var mark = this.mark();
        if (this._parseSelector(isNested)) {
            while (this.accept(TokenType.Comma) && this._parseSelector(isNested)) {
                // loop
            }
            if (this.accept(TokenType.CurlyL)) {
                this.restoreAtMark(mark);
                return this._parseRuleset(isNested);
            }
        }
        this.restoreAtMark(mark);
        return null;
    };
    Parser.prototype._parseRuleset = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        var node = this.create(RuleSet);
        var selectors = node.getSelectors();
        if (!selectors.addChild(this._parseSelector(isNested))) {
            return null;
        }
        while (this.accept(TokenType.Comma)) {
            if (!selectors.addChild(this._parseSelector(isNested))) {
                return this.finish(node, ParseError.SelectorExpected);
            }
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    Parser.prototype._parseRuleSetDeclarationAtStatement = function () {
        return this._parseAtApply()
            || this._parseUnknownAtRule();
    };
    Parser.prototype._parseRuleSetDeclaration = function () {
        // https://www.w3.org/TR/css-syntax-3/#consume-a-list-of-declarations0
        if (this.peek(TokenType.AtKeyword)) {
            return this._parseRuleSetDeclarationAtStatement();
        }
        return this._parseDeclaration();
    };
    /**
     * Parses declarations like:
     *   @apply --my-theme;
     *
     * Follows https://tabatkins.github.io/specs/css-apply-rule/#using
     */
    Parser.prototype._parseAtApply = function () {
        if (!this.peekKeyword('@apply')) {
            return null;
        }
        var node = this.create(AtApplyRule);
        this.consumeToken();
        if (!node.setIdentifier(this._parseIdent([ReferenceType.Variable]))) {
            return this.finish(node, ParseError.IdentifierExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._needsSemicolonAfter = function (node) {
        switch (node.type) {
            case NodeType.Keyframe:
            case NodeType.ViewPort:
            case NodeType.Media:
            case NodeType.Ruleset:
            case NodeType.Namespace:
            case NodeType.If:
            case NodeType.For:
            case NodeType.Each:
            case NodeType.While:
            case NodeType.MixinDeclaration:
            case NodeType.FunctionDeclaration:
            case NodeType.MixinContentDeclaration:
                return false;
            case NodeType.ExtendsReference:
            case NodeType.MixinContentReference:
            case NodeType.ReturnStatement:
            case NodeType.MediaQuery:
            case NodeType.Debug:
            case NodeType.Import:
            case NodeType.AtApplyRule:
            case NodeType.CustomPropertyDeclaration:
                return true;
            case NodeType.VariableDeclaration:
                return node.needsSemicolon;
            case NodeType.MixinReference:
                return !node.getContent();
            case NodeType.Declaration:
                return !node.getNestedProperties();
        }
        return false;
    };
    Parser.prototype._parseDeclarations = function (parseDeclaration) {
        var node = this.create(Declarations);
        if (!this.accept(TokenType.CurlyL)) {
            return null;
        }
        var decl = parseDeclaration();
        while (node.addChild(decl)) {
            if (this.peek(TokenType.CurlyR)) {
                break;
            }
            if (this._needsSemicolonAfter(decl) && !this.accept(TokenType.SemiColon)) {
                return this.finish(node, ParseError.SemiColonExpected, [TokenType.SemiColon, TokenType.CurlyR]);
            }
            // We accepted semicolon token. Link it to declaration.
            if (decl && this.prevToken && this.prevToken.type === TokenType.SemiColon) {
                decl.semicolonPosition = this.prevToken.offset;
            }
            while (this.accept(TokenType.SemiColon)) {
                // accept empty statements
            }
            decl = parseDeclaration();
        }
        if (!this.accept(TokenType.CurlyR)) {
            return this.finish(node, ParseError.RightCurlyExpected, [TokenType.CurlyR, TokenType.SemiColon]);
        }
        return this.finish(node);
    };
    Parser.prototype._parseBody = function (node, parseDeclaration) {
        if (!node.setDeclarations(this._parseDeclarations(parseDeclaration))) {
            return this.finish(node, ParseError.LeftCurlyExpected, [TokenType.CurlyR, TokenType.SemiColon]);
        }
        return this.finish(node);
    };
    Parser.prototype._parseSelector = function (isNested) {
        var node = this.create(Selector);
        var hasContent = false;
        if (isNested) {
            // nested selectors can start with a combinator
            hasContent = node.addChild(this._parseCombinator());
        }
        while (node.addChild(this._parseSimpleSelector())) {
            hasContent = true;
            node.addChild(this._parseCombinator()); // optional
        }
        return hasContent ? this.finish(node) : null;
    };
    Parser.prototype._parseDeclaration = function (stopTokens) {
        var custonProperty = this._tryParseCustomPropertyDeclaration(stopTokens);
        if (custonProperty) {
            return custonProperty;
        }
        var node = this.create(Declaration);
        if (!node.setProperty(this._parseProperty())) {
            return null;
        }
        if (!this.accept(TokenType.Colon)) {
            return this.finish(node, ParseError.ColonExpected, [TokenType.Colon], stopTokens || [TokenType.SemiColon]);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        if (!node.setValue(this._parseExpr())) {
            return this.finish(node, ParseError.PropertyValueExpected);
        }
        node.addChild(this._parsePrio());
        if (this.peek(TokenType.SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    };
    Parser.prototype._tryParseCustomPropertyDeclaration = function (stopTokens) {
        if (!this.peekRegExp(TokenType.Ident, /^--/)) {
            return null;
        }
        var node = this.create(CustomPropertyDeclaration);
        if (!node.setProperty(this._parseProperty())) {
            return null;
        }
        if (!this.accept(TokenType.Colon)) {
            return this.finish(node, ParseError.ColonExpected, [TokenType.Colon]);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        var mark = this.mark();
        if (this.peek(TokenType.CurlyL)) {
            // try to parse it as nested declaration
            var propertySet = this.create(CustomPropertySet);
            var declarations = this._parseDeclarations(this._parseRuleSetDeclaration.bind(this));
            if (propertySet.setDeclarations(declarations) && !declarations.isErroneous(true)) {
                propertySet.addChild(this._parsePrio());
                if (this.peek(TokenType.SemiColon)) {
                    this.finish(propertySet);
                    node.setPropertySet(propertySet);
                    node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
                    return this.finish(node);
                }
            }
            this.restoreAtMark(mark);
        }
        // try tp parse as expression
        var expression = this._parseExpr();
        if (expression && !expression.isErroneous(true)) {
            this._parsePrio();
            if (this.peekOne(stopTokens || [TokenType.SemiColon])) {
                node.setValue(expression);
                node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
                return this.finish(node);
            }
        }
        this.restoreAtMark(mark);
        node.addChild(this._parseCustomPropertyValue(stopTokens));
        node.addChild(this._parsePrio());
        if (isDefined(node.colonPosition) && this.token.offset === node.colonPosition + 1) {
            return this.finish(node, ParseError.PropertyValueExpected);
        }
        return this.finish(node);
    };
    /**
     * Parse custom property values.
     *
     * Based on https://www.w3.org/TR/css-variables/#syntax
     *
     * This code is somewhat unusual, as the allowed syntax is incredibly broad,
     * parsing almost any sequence of tokens, save for a small set of exceptions.
     * Unbalanced delimitors, invalid tokens, and declaration
     * terminators like semicolons and !important directives (when not inside
     * of delimitors).
     */
    Parser.prototype._parseCustomPropertyValue = function (stopTokens) {
        var _this = this;
        if (stopTokens === void 0) { stopTokens = [TokenType.CurlyR]; }
        var node = this.create(Node);
        var isTopLevel = function () { return curlyDepth === 0 && parensDepth === 0 && bracketsDepth === 0; };
        var onStopToken = function () { return stopTokens.indexOf(_this.token.type) !== -1; };
        var curlyDepth = 0;
        var parensDepth = 0;
        var bracketsDepth = 0;
        done: while (true) {
            switch (this.token.type) {
                case TokenType.SemiColon:
                    // A semicolon only ends things if we're not inside a delimitor.
                    if (isTopLevel()) {
                        break done;
                    }
                    break;
                case TokenType.Exclamation:
                    // An exclamation ends the value if we're not inside delims.
                    if (isTopLevel()) {
                        break done;
                    }
                    break;
                case TokenType.CurlyL:
                    curlyDepth++;
                    break;
                case TokenType.CurlyR:
                    curlyDepth--;
                    if (curlyDepth < 0) {
                        // The property value has been terminated without a semicolon, and
                        // this is the last declaration in the ruleset.
                        if (onStopToken() && parensDepth === 0 && bracketsDepth === 0) {
                            break done;
                        }
                        return this.finish(node, ParseError.LeftCurlyExpected);
                    }
                    break;
                case TokenType.ParenthesisL:
                    parensDepth++;
                    break;
                case TokenType.ParenthesisR:
                    parensDepth--;
                    if (parensDepth < 0) {
                        if (onStopToken() && bracketsDepth === 0 && curlyDepth === 0) {
                            break done;
                        }
                        return this.finish(node, ParseError.LeftParenthesisExpected);
                    }
                    break;
                case TokenType.BracketL:
                    bracketsDepth++;
                    break;
                case TokenType.BracketR:
                    bracketsDepth--;
                    if (bracketsDepth < 0) {
                        return this.finish(node, ParseError.LeftSquareBracketExpected);
                    }
                    break;
                case TokenType.BadString: // fall through
                    break done;
                case TokenType.EOF:
                    // We shouldn't have reached the end of input, something is
                    // unterminated.
                    var error = ParseError.RightCurlyExpected;
                    if (bracketsDepth > 0) {
                        error = ParseError.RightSquareBracketExpected;
                    }
                    else if (parensDepth > 0) {
                        error = ParseError.RightParenthesisExpected;
                    }
                    return this.finish(node, error);
            }
            this.consumeToken();
        }
        return this.finish(node);
    };
    Parser.prototype._tryToParseDeclaration = function (stopTokens) {
        var mark = this.mark();
        if (this._parseProperty() && this.accept(TokenType.Colon)) {
            // looks like a declaration, go ahead
            this.restoreAtMark(mark);
            return this._parseDeclaration(stopTokens);
        }
        this.restoreAtMark(mark);
        return null;
    };
    Parser.prototype._parseProperty = function () {
        var node = this.create(Property);
        var mark = this.mark();
        if (this.acceptDelim('*') || this.acceptDelim('_')) {
            // support for  IE 5.x, 6 and 7 star hack: see http://en.wikipedia.org/wiki/CSS_filter#Star_hack
            if (this.hasWhitespace()) {
                this.restoreAtMark(mark);
                return null;
            }
        }
        if (node.setIdentifier(this._parsePropertyIdentifier())) {
            return this.finish(node);
        }
        return null;
    };
    Parser.prototype._parsePropertyIdentifier = function () {
        return this._parseIdent();
    };
    Parser.prototype._parseCharset = function () {
        if (!this.peek(TokenType.Charset)) {
            return null;
        }
        var node = this.create(Node);
        this.consumeToken(); // charset
        if (!this.accept(TokenType.String)) {
            return this.finish(node, ParseError.IdentifierExpected);
        }
        if (!this.accept(TokenType.SemiColon)) {
            return this.finish(node, ParseError.SemiColonExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseImport = function () {
        if (!this.peekKeyword('@import')) {
            return null;
        }
        var node = this.create(Import);
        this.consumeToken(); // @import
        if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
            return this.finish(node, ParseError.URIOrStringExpected);
        }
        if (!this.peek(TokenType.SemiColon) && !this.peek(TokenType.EOF)) {
            node.setMedialist(this._parseMediaQueryList());
        }
        return this.finish(node);
    };
    Parser.prototype._parseNamespace = function () {
        // http://www.w3.org/TR/css3-namespace/
        // namespace  : NAMESPACE_SYM S* [IDENT S*]? [STRING|URI] S* ';' S*
        if (!this.peekKeyword('@namespace')) {
            return null;
        }
        var node = this.create(Namespace);
        this.consumeToken(); // @namespace
        if (!node.addChild(this._parseURILiteral())) { // url literal also starts with ident
            node.addChild(this._parseIdent()); // optional prefix
            if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
                return this.finish(node, ParseError.URIExpected, [TokenType.SemiColon]);
            }
        }
        if (!this.accept(TokenType.SemiColon)) {
            return this.finish(node, ParseError.SemiColonExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseFontFace = function () {
        if (!this.peekKeyword('@font-face')) {
            return null;
        }
        var node = this.create(FontFace);
        this.consumeToken(); // @font-face
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    Parser.prototype._parseViewPort = function () {
        if (!this.peekKeyword('@-ms-viewport') &&
            !this.peekKeyword('@-o-viewport') &&
            !this.peekKeyword('@viewport')) {
            return null;
        }
        var node = this.create(ViewPort);
        this.consumeToken(); // @-ms-viewport
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    Parser.prototype._parseKeyframe = function () {
        if (!this.peekRegExp(TokenType.AtKeyword, this.keyframeRegex)) {
            return null;
        }
        var node = this.create(Keyframe);
        var atNode = this.create(Node);
        this.consumeToken(); // atkeyword
        node.setKeyword(this.finish(atNode));
        if (atNode.matches('@-ms-keyframes')) { // -ms-keyframes never existed
            this.markError(atNode, ParseError.UnknownKeyword);
        }
        if (!node.setIdentifier(this._parseKeyframeIdent())) {
            return this.finish(node, ParseError.IdentifierExpected, [TokenType.CurlyR]);
        }
        return this._parseBody(node, this._parseKeyframeSelector.bind(this));
    };
    Parser.prototype._parseKeyframeIdent = function () {
        return this._parseIdent([ReferenceType.Keyframe]);
    };
    Parser.prototype._parseKeyframeSelector = function () {
        var node = this.create(KeyframeSelector);
        if (!node.addChild(this._parseIdent()) && !this.accept(TokenType.Percentage)) {
            return null;
        }
        while (this.accept(TokenType.Comma)) {
            if (!node.addChild(this._parseIdent()) && !this.accept(TokenType.Percentage)) {
                return this.finish(node, ParseError.PercentageExpected);
            }
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    Parser.prototype._tryParseKeyframeSelector = function () {
        var node = this.create(KeyframeSelector);
        var pos = this.mark();
        if (!node.addChild(this._parseIdent()) && !this.accept(TokenType.Percentage)) {
            return null;
        }
        while (this.accept(TokenType.Comma)) {
            if (!node.addChild(this._parseIdent()) && !this.accept(TokenType.Percentage)) {
                this.restoreAtMark(pos);
                return null;
            }
        }
        if (!this.peek(TokenType.CurlyL)) {
            this.restoreAtMark(pos);
            return null;
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    Parser.prototype._parseSupports = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        // SUPPORTS_SYM S* supports_condition '{' S* ruleset* '}' S*
        if (!this.peekKeyword('@supports')) {
            return null;
        }
        var node = this.create(Supports);
        this.consumeToken(); // @supports
        node.addChild(this._parseSupportsCondition());
        return this._parseBody(node, this._parseSupportsDeclaration.bind(this, isNested));
    };
    Parser.prototype._parseSupportsDeclaration = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        if (isNested) {
            // if nested, the body can contain rulesets, but also declarations
            return this._tryParseRuleset(true)
                || this._tryToParseDeclaration()
                || this._parseStylesheetStatement(true);
        }
        return this._parseStylesheetStatement(false);
    };
    Parser.prototype._parseSupportsCondition = function () {
        // supports_condition : supports_negation | supports_conjunction | supports_disjunction | supports_condition_in_parens ;
        // supports_condition_in_parens: ( '(' S* supports_condition S* ')' ) | supports_declaration_condition | general_enclosed ;
        // supports_negation: NOT S+ supports_condition_in_parens ;
        // supports_conjunction: supports_condition_in_parens ( S+ AND S+ supports_condition_in_parens )+;
        // supports_disjunction: supports_condition_in_parens ( S+ OR S+ supports_condition_in_parens )+;
        // supports_declaration_condition: '(' S* declaration ')';
        // general_enclosed: ( FUNCTION | '(' ) ( any | unused )* ')' ;
        var node = this.create(SupportsCondition);
        if (this.acceptIdent('not')) {
            node.addChild(this._parseSupportsConditionInParens());
        }
        else {
            node.addChild(this._parseSupportsConditionInParens());
            if (this.peekRegExp(TokenType.Ident, /^(and|or)$/i)) {
                var text = this.token.text.toLowerCase();
                while (this.acceptIdent(text)) {
                    node.addChild(this._parseSupportsConditionInParens());
                }
            }
        }
        return this.finish(node);
    };
    Parser.prototype._parseSupportsConditionInParens = function () {
        var node = this.create(SupportsCondition);
        if (this.accept(TokenType.ParenthesisL)) {
            if (this.prevToken) {
                node.lParent = this.prevToken.offset;
            }
            if (!node.addChild(this._tryToParseDeclaration([TokenType.ParenthesisR]))) {
                if (!this._parseSupportsCondition()) {
                    return this.finish(node, ParseError.ConditionExpected);
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected, [TokenType.ParenthesisR], []);
            }
            if (this.prevToken) {
                node.rParent = this.prevToken.offset;
            }
            return this.finish(node);
        }
        else if (this.peek(TokenType.Ident)) {
            var pos = this.mark();
            this.consumeToken();
            if (!this.hasWhitespace() && this.accept(TokenType.ParenthesisL)) {
                var openParentCount = 1;
                while (this.token.type !== TokenType.EOF && openParentCount !== 0) {
                    if (this.token.type === TokenType.ParenthesisL) {
                        openParentCount++;
                    }
                    else if (this.token.type === TokenType.ParenthesisR) {
                        openParentCount--;
                    }
                    this.consumeToken();
                }
                return this.finish(node);
            }
            else {
                this.restoreAtMark(pos);
            }
        }
        return this.finish(node, ParseError.LeftParenthesisExpected, [], [TokenType.ParenthesisL]);
    };
    Parser.prototype._parseMediaDeclaration = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        if (isNested) {
            // if nested, the body can contain rulesets, but also declarations
            return this._tryParseRuleset(true)
                || this._tryToParseDeclaration()
                || this._parseStylesheetStatement(true);
        }
        return this._parseStylesheetStatement(false);
    };
    Parser.prototype._parseMedia = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        // MEDIA_SYM S* media_query_list '{' S* ruleset* '}' S*
        // media_query_list : S* [media_query [ ',' S* media_query ]* ]?
        if (!this.peekKeyword('@media')) {
            return null;
        }
        var node = this.create(Media);
        this.consumeToken(); // @media
        if (!node.addChild(this._parseMediaQueryList())) {
            return this.finish(node, ParseError.MediaQueryExpected);
        }
        return this._parseBody(node, this._parseMediaDeclaration.bind(this, isNested));
    };
    Parser.prototype._parseMediaQueryList = function () {
        var node = this.create(Medialist);
        if (!node.addChild(this._parseMediaQuery([TokenType.CurlyL]))) {
            return this.finish(node, ParseError.MediaQueryExpected);
        }
        while (this.accept(TokenType.Comma)) {
            if (!node.addChild(this._parseMediaQuery([TokenType.CurlyL]))) {
                return this.finish(node, ParseError.MediaQueryExpected);
            }
        }
        return this.finish(node);
    };
    Parser.prototype._parseMediaQuery = function (resyncStopToken) {
        // http://www.w3.org/TR/css3-mediaqueries/
        // media_query : [ONLY | NOT]? S* IDENT S* [ AND S* expression ]* | expression [ AND S* expression ]*
        // expression : '(' S* IDENT S* [ ':' S* expr ]? ')' S*
        var node = this.create(MediaQuery);
        var parseExpression = true;
        var hasContent = false;
        if (!this.peek(TokenType.ParenthesisL)) {
            if (this.acceptIdent('only') || this.acceptIdent('not')) ;
            if (!node.addChild(this._parseIdent())) {
                return null;
            }
            hasContent = true;
            parseExpression = this.acceptIdent('and');
        }
        while (parseExpression) {
            // Allow short-circuting for other language constructs.
            if (node.addChild(this._parseMediaContentStart())) {
                parseExpression = this.acceptIdent('and');
                continue;
            }
            if (!this.accept(TokenType.ParenthesisL)) {
                if (hasContent) {
                    return this.finish(node, ParseError.LeftParenthesisExpected, [], resyncStopToken);
                }
                return null;
            }
            if (!node.addChild(this._parseMediaFeatureName())) {
                return this.finish(node, ParseError.IdentifierExpected, [], resyncStopToken);
            }
            if (this.accept(TokenType.Colon)) {
                if (!node.addChild(this._parseExpr())) {
                    return this.finish(node, ParseError.TermExpected, [], resyncStopToken);
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected, [], resyncStopToken);
            }
            parseExpression = this.acceptIdent('and');
        }
        return this.finish(node);
    };
    Parser.prototype._parseMediaContentStart = function () {
        return null;
    };
    Parser.prototype._parseMediaFeatureName = function () {
        return this._parseIdent();
    };
    Parser.prototype._parseMedium = function () {
        var node = this.create(Node);
        if (node.addChild(this._parseIdent())) {
            return this.finish(node);
        }
        else {
            return null;
        }
    };
    Parser.prototype._parsePageDeclaration = function () {
        return this._parsePageMarginBox() || this._parseRuleSetDeclaration();
    };
    Parser.prototype._parsePage = function () {
        // http://www.w3.org/TR/css3-page/
        // page_rule : PAGE_SYM S* page_selector_list '{' S* page_body '}' S*
        // page_body :  /* Can be empty */ declaration? [ ';' S* page_body ]? | page_margin_box page_body
        if (!this.peekKeyword('@page')) {
            return null;
        }
        var node = this.create(Page);
        this.consumeToken();
        if (node.addChild(this._parsePageSelector())) {
            while (this.accept(TokenType.Comma)) {
                if (!node.addChild(this._parsePageSelector())) {
                    return this.finish(node, ParseError.IdentifierExpected);
                }
            }
        }
        return this._parseBody(node, this._parsePageDeclaration.bind(this));
    };
    Parser.prototype._parsePageMarginBox = function () {
        // page_margin_box :  margin_sym S* '{' S* declaration? [ ';' S* declaration? ]* '}' S*
        if (!this.peek(TokenType.AtKeyword)) {
            return null;
        }
        var node = this.create(PageBoxMarginBox);
        if (!this.acceptOneKeyword(pageBoxDirectives)) {
            this.markError(node, ParseError.UnknownAtRule, [], [TokenType.CurlyL]);
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    Parser.prototype._parsePageSelector = function () {
        // page_selector : pseudo_page+ | IDENT pseudo_page*
        // pseudo_page :  ':' [ "left" | "right" | "first" | "blank" ];
        if (!this.peek(TokenType.Ident) && !this.peek(TokenType.Colon)) {
            return null;
        }
        var node = this.create(Node);
        node.addChild(this._parseIdent()); // optional ident
        if (this.accept(TokenType.Colon)) {
            if (!node.addChild(this._parseIdent())) { // optional ident
                return this.finish(node, ParseError.IdentifierExpected);
            }
        }
        return this.finish(node);
    };
    Parser.prototype._parseDocument = function () {
        // -moz-document is experimental but has been pushed to css4
        if (!this.peekKeyword('@-moz-document')) {
            return null;
        }
        var node = this.create(Document);
        this.consumeToken(); // @-moz-document
        this.resync([], [TokenType.CurlyL]); // ignore all the rules
        return this._parseBody(node, this._parseStylesheetStatement.bind(this));
    };
    // https://www.w3.org/TR/css-syntax-3/#consume-an-at-rule
    Parser.prototype._parseUnknownAtRule = function () {
        if (!this.peek(TokenType.AtKeyword)) {
            return null;
        }
        var node = this.create(UnknownAtRule);
        node.addChild(this._parseUnknownAtRuleName());
        var isTopLevel = function () { return curlyDepth === 0 && parensDepth === 0 && bracketsDepth === 0; };
        var curlyLCount = 0;
        var curlyDepth = 0;
        var parensDepth = 0;
        var bracketsDepth = 0;
        done: while (true) {
            switch (this.token.type) {
                case TokenType.SemiColon:
                    if (isTopLevel()) {
                        break done;
                    }
                    break;
                case TokenType.EOF:
                    if (curlyDepth > 0) {
                        return this.finish(node, ParseError.RightCurlyExpected);
                    }
                    else if (bracketsDepth > 0) {
                        return this.finish(node, ParseError.RightSquareBracketExpected);
                    }
                    else if (parensDepth > 0) {
                        return this.finish(node, ParseError.RightParenthesisExpected);
                    }
                    else {
                        return this.finish(node);
                    }
                case TokenType.CurlyL:
                    curlyLCount++;
                    curlyDepth++;
                    break;
                case TokenType.CurlyR:
                    curlyDepth--;
                    // End of at-rule, consume CurlyR and return node
                    if (curlyLCount > 0 && curlyDepth === 0) {
                        this.consumeToken();
                        if (bracketsDepth > 0) {
                            return this.finish(node, ParseError.RightSquareBracketExpected);
                        }
                        else if (parensDepth > 0) {
                            return this.finish(node, ParseError.RightParenthesisExpected);
                        }
                        break done;
                    }
                    if (curlyDepth < 0) {
                        // The property value has been terminated without a semicolon, and
                        // this is the last declaration in the ruleset.
                        if (parensDepth === 0 && bracketsDepth === 0) {
                            break done;
                        }
                        return this.finish(node, ParseError.LeftCurlyExpected);
                    }
                    break;
                case TokenType.ParenthesisL:
                    parensDepth++;
                    break;
                case TokenType.ParenthesisR:
                    parensDepth--;
                    if (parensDepth < 0) {
                        return this.finish(node, ParseError.LeftParenthesisExpected);
                    }
                    break;
                case TokenType.BracketL:
                    bracketsDepth++;
                    break;
                case TokenType.BracketR:
                    bracketsDepth--;
                    if (bracketsDepth < 0) {
                        return this.finish(node, ParseError.LeftSquareBracketExpected);
                    }
                    break;
            }
            this.consumeToken();
        }
        return node;
    };
    Parser.prototype._parseUnknownAtRuleName = function () {
        var node = this.create(Node);
        if (this.accept(TokenType.AtKeyword)) {
            return this.finish(node);
        }
        return node;
    };
    Parser.prototype._parseOperator = function () {
        // these are operators for binary expressions
        if (this.peekDelim('/') ||
            this.peekDelim('*') ||
            this.peekDelim('+') ||
            this.peekDelim('-') ||
            this.peek(TokenType.Dashmatch) ||
            this.peek(TokenType.Includes) ||
            this.peek(TokenType.SubstringOperator) ||
            this.peek(TokenType.PrefixOperator) ||
            this.peek(TokenType.SuffixOperator) ||
            this.peekDelim('=')) { // doesn't stick to the standard here
            var node = this.createNode(NodeType.Operator);
            this.consumeToken();
            return this.finish(node);
        }
        else {
            return null;
        }
    };
    Parser.prototype._parseUnaryOperator = function () {
        if (!this.peekDelim('+') && !this.peekDelim('-')) {
            return null;
        }
        var node = this.create(Node);
        this.consumeToken();
        return this.finish(node);
    };
    Parser.prototype._parseCombinator = function () {
        if (this.peekDelim('>')) {
            var node = this.create(Node);
            this.consumeToken();
            var mark = this.mark();
            if (!this.hasWhitespace() && this.acceptDelim('>')) {
                if (!this.hasWhitespace() && this.acceptDelim('>')) {
                    node.type = NodeType.SelectorCombinatorShadowPiercingDescendant;
                    return this.finish(node);
                }
                this.restoreAtMark(mark);
            }
            node.type = NodeType.SelectorCombinatorParent;
            return this.finish(node);
        }
        else if (this.peekDelim('+')) {
            var node = this.create(Node);
            this.consumeToken();
            node.type = NodeType.SelectorCombinatorSibling;
            return this.finish(node);
        }
        else if (this.peekDelim('~')) {
            var node = this.create(Node);
            this.consumeToken();
            node.type = NodeType.SelectorCombinatorAllSiblings;
            return this.finish(node);
        }
        else if (this.peekDelim('/')) {
            var node = this.create(Node);
            this.consumeToken();
            var mark = this.mark();
            if (!this.hasWhitespace() && this.acceptIdent('deep') && !this.hasWhitespace() && this.acceptDelim('/')) {
                node.type = NodeType.SelectorCombinatorShadowPiercingDescendant;
                return this.finish(node);
            }
            this.restoreAtMark(mark);
        }
        return null;
    };
    Parser.prototype._parseSimpleSelector = function () {
        // simple_selector
        //  : element_name [ HASH | class | attrib | pseudo ]* | [ HASH | class | attrib | pseudo ]+ ;
        var node = this.create(SimpleSelector);
        var c = 0;
        if (node.addChild(this._parseElementName())) {
            c++;
        }
        while ((c === 0 || !this.hasWhitespace()) && node.addChild(this._parseSimpleSelectorBody())) {
            c++;
        }
        return c > 0 ? this.finish(node) : null;
    };
    Parser.prototype._parseSimpleSelectorBody = function () {
        return this._parsePseudo() || this._parseHash() || this._parseClass() || this._parseAttrib();
    };
    Parser.prototype._parseSelectorIdent = function () {
        return this._parseIdent();
    };
    Parser.prototype._parseHash = function () {
        if (!this.peek(TokenType.Hash) && !this.peekDelim('#')) {
            return null;
        }
        var node = this.createNode(NodeType.IdentifierSelector);
        if (this.acceptDelim('#')) {
            if (this.hasWhitespace() || !node.addChild(this._parseSelectorIdent())) {
                return this.finish(node, ParseError.IdentifierExpected);
            }
        }
        else {
            this.consumeToken(); // TokenType.Hash
        }
        return this.finish(node);
    };
    Parser.prototype._parseClass = function () {
        // class: '.' IDENT ;
        if (!this.peekDelim('.')) {
            return null;
        }
        var node = this.createNode(NodeType.ClassSelector);
        this.consumeToken(); // '.'
        if (this.hasWhitespace() || !node.addChild(this._parseSelectorIdent())) {
            return this.finish(node, ParseError.IdentifierExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseElementName = function () {
        // element_name: (ns? '|')? IDENT | '*';
        var pos = this.mark();
        var node = this.createNode(NodeType.ElementNameSelector);
        node.addChild(this._parseNamespacePrefix());
        if (!node.addChild(this._parseSelectorIdent()) && !this.acceptDelim('*')) {
            this.restoreAtMark(pos);
            return null;
        }
        return this.finish(node);
    };
    Parser.prototype._parseNamespacePrefix = function () {
        var pos = this.mark();
        var node = this.createNode(NodeType.NamespacePrefix);
        if (!node.addChild(this._parseIdent()) && !this.acceptDelim('*')) ;
        if (!this.acceptDelim('|')) {
            this.restoreAtMark(pos);
            return null;
        }
        return this.finish(node);
    };
    Parser.prototype._parseAttrib = function () {
        // attrib : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*   [ IDENT | STRING ] S* ]? ']'
        if (!this.peek(TokenType.BracketL)) {
            return null;
        }
        var node = this.create(AttributeSelector);
        this.consumeToken(); // BracketL
        // Optional attrib namespace
        node.setNamespacePrefix(this._parseNamespacePrefix());
        if (!node.setIdentifier(this._parseIdent())) {
            return this.finish(node, ParseError.IdentifierExpected);
        }
        if (node.setOperator(this._parseOperator())) {
            node.setValue(this._parseBinaryExpr());
            this.acceptIdent('i'); // case insensitive matching
        }
        if (!this.accept(TokenType.BracketR)) {
            return this.finish(node, ParseError.RightSquareBracketExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parsePseudo = function () {
        var _this = this;
        // pseudo: ':' [ IDENT | FUNCTION S* [IDENT S*]? ')' ]
        var node = this._tryParsePseudoIdentifier();
        if (node) {
            if (!this.hasWhitespace() && this.accept(TokenType.ParenthesisL)) {
                var tryAsSelector = function () {
                    var selectors = _this.create(Node);
                    if (!selectors.addChild(_this._parseSelector(false))) {
                        return null;
                    }
                    while (_this.accept(TokenType.Comma) && selectors.addChild(_this._parseSelector(false))) {
                        // loop
                    }
                    if (_this.peek(TokenType.ParenthesisR)) {
                        return _this.finish(selectors);
                    }
                    return null;
                };
                node.addChild(this.try(tryAsSelector) || this._parseBinaryExpr());
                if (!this.accept(TokenType.ParenthesisR)) {
                    return this.finish(node, ParseError.RightParenthesisExpected);
                }
            }
            return this.finish(node);
        }
        return null;
    };
    Parser.prototype._tryParsePseudoIdentifier = function () {
        if (!this.peek(TokenType.Colon)) {
            return null;
        }
        var pos = this.mark();
        var node = this.createNode(NodeType.PseudoSelector);
        this.consumeToken(); // Colon
        if (this.hasWhitespace()) {
            this.restoreAtMark(pos);
            return null;
        }
        // optional, support ::
        this.accept(TokenType.Colon);
        if (this.hasWhitespace() || !node.addChild(this._parseIdent())) {
            return this.finish(node, ParseError.IdentifierExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._tryParsePrio = function () {
        var mark = this.mark();
        var prio = this._parsePrio();
        if (prio) {
            return prio;
        }
        this.restoreAtMark(mark);
        return null;
    };
    Parser.prototype._parsePrio = function () {
        if (!this.peek(TokenType.Exclamation)) {
            return null;
        }
        var node = this.createNode(NodeType.Prio);
        if (this.accept(TokenType.Exclamation) && this.acceptIdent('important')) {
            return this.finish(node);
        }
        return null;
    };
    Parser.prototype._parseExpr = function (stopOnComma) {
        if (stopOnComma === void 0) { stopOnComma = false; }
        var node = this.create(Expression);
        if (!node.addChild(this._parseBinaryExpr())) {
            return null;
        }
        while (true) {
            if (this.peek(TokenType.Comma)) { // optional
                if (stopOnComma) {
                    return this.finish(node);
                }
                this.consumeToken();
            }
            if (!node.addChild(this._parseBinaryExpr())) {
                break;
            }
        }
        return this.finish(node);
    };
    Parser.prototype._parseNamedLine = function () {
        // https://www.w3.org/TR/css-grid-1/#named-lines
        if (!this.peek(TokenType.BracketL)) {
            return null;
        }
        var node = this.createNode(NodeType.GridLine);
        this.consumeToken();
        while (node.addChild(this._parseIdent())) {
            // repeat
        }
        if (!this.accept(TokenType.BracketR)) {
            return this.finish(node, ParseError.RightSquareBracketExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseBinaryExpr = function (preparsedLeft, preparsedOper) {
        var node = this.create(BinaryExpression);
        if (!node.setLeft((preparsedLeft || this._parseTerm()))) {
            return null;
        }
        if (!node.setOperator(preparsedOper || this._parseOperator())) {
            return this.finish(node);
        }
        if (!node.setRight(this._parseTerm())) {
            return this.finish(node, ParseError.TermExpected);
        }
        // things needed for multiple binary expressions
        node = this.finish(node);
        var operator = this._parseOperator();
        if (operator) {
            node = this._parseBinaryExpr(node, operator);
        }
        return this.finish(node);
    };
    Parser.prototype._parseTerm = function () {
        var node = this.create(Term);
        node.setOperator(this._parseUnaryOperator()); // optional
        if (node.setExpression(this._parseTermExpression())) {
            return this.finish(node);
        }
        return null;
    };
    Parser.prototype._parseTermExpression = function () {
        return this._parseURILiteral() || // url before function
            this._parseFunction() || // function before ident
            this._parseIdent() ||
            this._parseStringLiteral() ||
            this._parseNumeric() ||
            this._parseHexColor() ||
            this._parseOperation() ||
            this._parseNamedLine();
    };
    Parser.prototype._parseOperation = function () {
        if (!this.peek(TokenType.ParenthesisL)) {
            return null;
        }
        var node = this.create(Node);
        this.consumeToken(); // ParenthesisL
        node.addChild(this._parseExpr());
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseNumeric = function () {
        if (this.peek(TokenType.Num) ||
            this.peek(TokenType.Percentage) ||
            this.peek(TokenType.Resolution) ||
            this.peek(TokenType.Length) ||
            this.peek(TokenType.EMS) ||
            this.peek(TokenType.EXS) ||
            this.peek(TokenType.Angle) ||
            this.peek(TokenType.Time) ||
            this.peek(TokenType.Dimension) ||
            this.peek(TokenType.Freq)) {
            var node = this.create(NumericValue);
            this.consumeToken();
            return this.finish(node);
        }
        return null;
    };
    Parser.prototype._parseStringLiteral = function () {
        if (!this.peek(TokenType.String) && !this.peek(TokenType.BadString)) {
            return null;
        }
        var node = this.createNode(NodeType.StringLiteral);
        this.consumeToken();
        return this.finish(node);
    };
    Parser.prototype._parseURILiteral = function () {
        if (!this.peekRegExp(TokenType.Ident, /^url(-prefix)?$/i)) {
            return null;
        }
        var pos = this.mark();
        var node = this.createNode(NodeType.URILiteral);
        this.accept(TokenType.Ident);
        if (this.hasWhitespace() || !this.peek(TokenType.ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        this.scanner.inURL = true;
        this.consumeToken(); // consume ()
        node.addChild(this._parseURLArgument()); // argument is optional
        this.scanner.inURL = false;
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseURLArgument = function () {
        var node = this.create(Node);
        if (!this.accept(TokenType.String) && !this.accept(TokenType.BadString) && !this.acceptUnquotedString()) {
            return null;
        }
        return this.finish(node);
    };
    Parser.prototype._parseIdent = function (referenceTypes) {
        if (!this.peek(TokenType.Ident)) {
            return null;
        }
        var node = this.create(Identifier);
        if (referenceTypes) {
            node.referenceTypes = referenceTypes;
        }
        node.isCustomProperty = this.peekRegExp(TokenType.Ident, /^--/);
        this.consumeToken();
        return this.finish(node);
    };
    Parser.prototype._parseFunction = function () {
        var pos = this.mark();
        var node = this.create(Function);
        if (!node.setIdentifier(this._parseFunctionIdentifier())) {
            return null;
        }
        if (this.hasWhitespace() || !this.accept(TokenType.ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        if (node.getArguments().addChild(this._parseFunctionArgument())) {
            while (this.accept(TokenType.Comma)) {
                if (this.peek(TokenType.ParenthesisR)) {
                    break;
                }
                if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                    this.markError(node, ParseError.ExpressionExpected);
                }
            }
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    Parser.prototype._parseFunctionIdentifier = function () {
        if (!this.peek(TokenType.Ident)) {
            return null;
        }
        var node = this.create(Identifier);
        node.referenceTypes = [ReferenceType.Function];
        if (this.acceptIdent('progid')) {
            // support for IE7 specific filters: 'progid:DXImageTransform.Microsoft.MotionBlur(strength=13, direction=310)'
            if (this.accept(TokenType.Colon)) {
                while (this.accept(TokenType.Ident) && this.acceptDelim('.')) {
                    // loop
                }
            }
            return this.finish(node);
        }
        this.consumeToken();
        return this.finish(node);
    };
    Parser.prototype._parseFunctionArgument = function () {
        var node = this.create(FunctionArgument);
        if (node.setValue(this._parseExpr(true))) {
            return this.finish(node);
        }
        return null;
    };
    Parser.prototype._parseHexColor = function () {
        if (this.peekRegExp(TokenType.Hash, /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/g)) {
            var node = this.create(HexColorValue);
            this.consumeToken();
            return this.finish(node);
        }
        else {
            return null;
        }
    };
    return Parser;
}());

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */
function findFirst(array, p) {
    var low = 0, high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    return low;
}
function includes(array, item) {
    return array.indexOf(item) !== -1;
}
function union() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    var result = [];
    for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
        var array = arrays_1[_a];
        for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
            var item = array_1[_b];
            if (!includes(result, item)) {
                result.push(item);
            }
        }
    }
    return result;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scope = /** @class */ (function () {
    function Scope(offset, length) {
        this.offset = offset;
        this.length = length;
        this.symbols = [];
        this.parent = null;
        this.children = [];
    }
    Scope.prototype.addChild = function (scope) {
        this.children.push(scope);
        scope.setParent(this);
    };
    Scope.prototype.setParent = function (scope) {
        this.parent = scope;
    };
    Scope.prototype.findScope = function (offset, length) {
        if (length === void 0) { length = 0; }
        if (this.offset <= offset && this.offset + this.length > offset + length || this.offset === offset && this.length === length) {
            return this.findInScope(offset, length);
        }
        return null;
    };
    Scope.prototype.findInScope = function (offset, length) {
        if (length === void 0) { length = 0; }
        // find the first scope child that has an offset larger than offset + length
        var end = offset + length;
        var idx = findFirst(this.children, function (s) { return s.offset > end; });
        if (idx === 0) {
            // all scopes have offsets larger than our end
            return this;
        }
        var res = this.children[idx - 1];
        if (res.offset <= offset && res.offset + res.length >= offset + length) {
            return res.findInScope(offset, length);
        }
        return this;
    };
    Scope.prototype.addSymbol = function (symbol) {
        this.symbols.push(symbol);
    };
    Scope.prototype.getSymbol = function (name, type) {
        for (var index = 0; index < this.symbols.length; index++) {
            var symbol = this.symbols[index];
            if (symbol.name === name && symbol.type === type) {
                return symbol;
            }
        }
        return null;
    };
    Scope.prototype.getSymbols = function () {
        return this.symbols;
    };
    return Scope;
}());
var GlobalScope = /** @class */ (function (_super) {
    __extends$1(GlobalScope, _super);
    function GlobalScope() {
        return _super.call(this, 0, Number.MAX_VALUE) || this;
    }
    return GlobalScope;
}(Scope));
var Symbol$1 = /** @class */ (function () {
    function Symbol(name, value, node, type) {
        this.name = name;
        this.value = value;
        this.node = node;
        this.type = type;
    }
    return Symbol;
}());
var ScopeBuilder = /** @class */ (function () {
    function ScopeBuilder(scope) {
        this.scope = scope;
    }
    ScopeBuilder.prototype.addSymbol = function (node, name, value, type) {
        if (node.offset !== -1) {
            var current = this.scope.findScope(node.offset, node.length);
            if (current) {
                current.addSymbol(new Symbol$1(name, value, node, type));
            }
        }
    };
    ScopeBuilder.prototype.addScope = function (node) {
        if (node.offset !== -1) {
            var current = this.scope.findScope(node.offset, node.length);
            if (current && (current.offset !== node.offset || current.length !== node.length)) { // scope already known?
                var newScope = new Scope(node.offset, node.length);
                current.addChild(newScope);
                return newScope;
            }
            return current;
        }
        return null;
    };
    ScopeBuilder.prototype.addSymbolToChildScope = function (scopeNode, node, name, value, type) {
        if (scopeNode && scopeNode.offset !== -1) {
            var current = this.addScope(scopeNode); // create the scope or gets the existing one
            if (current) {
                current.addSymbol(new Symbol$1(name, value, node, type));
            }
        }
    };
    ScopeBuilder.prototype.visitNode = function (node) {
        switch (node.type) {
            case NodeType.Keyframe:
                this.addSymbol(node, node.getName(), void 0, ReferenceType.Keyframe);
                return true;
            case NodeType.CustomPropertyDeclaration:
                return this.visitCustomPropertyDeclarationNode(node);
            case NodeType.VariableDeclaration:
                return this.visitVariableDeclarationNode(node);
            case NodeType.Ruleset:
                return this.visitRuleSet(node);
            case NodeType.MixinDeclaration:
                this.addSymbol(node, node.getName(), void 0, ReferenceType.Mixin);
                return true;
            case NodeType.FunctionDeclaration:
                this.addSymbol(node, node.getName(), void 0, ReferenceType.Function);
                return true;
            case NodeType.FunctionParameter: {
                return this.visitFunctionParameterNode(node);
            }
            case NodeType.Declarations:
                this.addScope(node);
                return true;
            case NodeType.For:
                var forNode = node;
                var scopeNode = forNode.getDeclarations();
                if (scopeNode && forNode.variable) {
                    this.addSymbolToChildScope(scopeNode, forNode.variable, forNode.variable.getName(), void 0, ReferenceType.Variable);
                }
                return true;
            case NodeType.Each: {
                var eachNode = node;
                var scopeNode_1 = eachNode.getDeclarations();
                if (scopeNode_1) {
                    var variables = eachNode.getVariables().getChildren();
                    for (var _i = 0, variables_1 = variables; _i < variables_1.length; _i++) {
                        var variable = variables_1[_i];
                        this.addSymbolToChildScope(scopeNode_1, variable, variable.getName(), void 0, ReferenceType.Variable);
                    }
                }
                return true;
            }
        }
        return true;
    };
    ScopeBuilder.prototype.visitRuleSet = function (node) {
        var current = this.scope.findScope(node.offset, node.length);
        if (current) {
            for (var _i = 0, _a = node.getSelectors().getChildren(); _i < _a.length; _i++) {
                var child = _a[_i];
                if (child instanceof Selector) {
                    if (child.getChildren().length === 1) { // only selectors with a single element can be extended
                        current.addSymbol(new Symbol$1(child.getChild(0).getText(), void 0, child, ReferenceType.Rule));
                    }
                }
            }
        }
        return true;
    };
    ScopeBuilder.prototype.visitVariableDeclarationNode = function (node) {
        var value = node.getValue() ? node.getValue().getText() : void 0;
        this.addSymbol(node, node.getName(), value, ReferenceType.Variable);
        return true;
    };
    ScopeBuilder.prototype.visitFunctionParameterNode = function (node) {
        // parameters are part of the body scope
        var scopeNode = node.getParent().getDeclarations();
        if (scopeNode) {
            var valueNode = node.getDefaultValue();
            var value = valueNode ? valueNode.getText() : void 0;
            this.addSymbolToChildScope(scopeNode, node, node.getName(), value, ReferenceType.Variable);
        }
        return true;
    };
    ScopeBuilder.prototype.visitCustomPropertyDeclarationNode = function (node) {
        var value = node.getValue() ? node.getValue().getText() : '';
        this.addCSSVariable(node.getProperty(), node.getProperty().getName(), value, ReferenceType.Variable);
        return true;
    };
    ScopeBuilder.prototype.addCSSVariable = function (node, name, value, type) {
        if (node.offset !== -1) {
            this.scope.addSymbol(new Symbol$1(name, value, node, type));
        }
    };
    return ScopeBuilder;
}());
var Symbols = /** @class */ (function () {
    function Symbols(node) {
        this.global = new GlobalScope();
        node.acceptVisitor(new ScopeBuilder(this.global));
    }
    Symbols.prototype.findSymbolsAtOffset = function (offset, referenceType) {
        var scope = this.global.findScope(offset, 0);
        var result = [];
        var names = {};
        while (scope) {
            var symbols = scope.getSymbols();
            for (var i = 0; i < symbols.length; i++) {
                var symbol = symbols[i];
                if (symbol.type === referenceType && !names[symbol.name]) {
                    result.push(symbol);
                    names[symbol.name] = true;
                }
            }
            scope = scope.parent;
        }
        return result;
    };
    Symbols.prototype.internalFindSymbol = function (node, referenceTypes) {
        var scopeNode = node;
        if (node.parent instanceof FunctionParameter && node.parent.getParent() instanceof BodyDeclaration) {
            scopeNode = node.parent.getParent().getDeclarations();
        }
        if (node.parent instanceof FunctionArgument && node.parent.getParent() instanceof Function) {
            var funcId = node.parent.getParent().getIdentifier();
            if (funcId) {
                var functionSymbol = this.internalFindSymbol(funcId, [ReferenceType.Function]);
                if (functionSymbol) {
                    scopeNode = functionSymbol.node.getDeclarations();
                }
            }
        }
        if (!scopeNode) {
            return null;
        }
        var name = node.getText();
        var scope = this.global.findScope(scopeNode.offset, scopeNode.length);
        while (scope) {
            for (var index = 0; index < referenceTypes.length; index++) {
                var type = referenceTypes[index];
                var symbol = scope.getSymbol(name, type);
                if (symbol) {
                    return symbol;
                }
            }
            scope = scope.parent;
        }
        return null;
    };
    Symbols.prototype.evaluateReferenceTypes = function (node) {
        if (node instanceof Identifier) {
            var referenceTypes = node.referenceTypes;
            if (referenceTypes) {
                return referenceTypes;
            }
            else {
                if (node.isCustomProperty) {
                    return [ReferenceType.Variable];
                }
                // are a reference to a keyframe?
                var decl = getParentDeclaration(node);
                if (decl) {
                    var propertyName = decl.getNonPrefixedPropertyName();
                    if ((propertyName === 'animation' || propertyName === 'animation-name')
                        && decl.getValue() && decl.getValue().offset === node.offset) {
                        return [ReferenceType.Keyframe];
                    }
                }
            }
        }
        else if (node instanceof Variable) {
            return [ReferenceType.Variable];
        }
        var selector = node.findAParent(NodeType.Selector, NodeType.ExtendsReference);
        if (selector) {
            return [ReferenceType.Rule];
        }
        return null;
    };
    Symbols.prototype.findSymbolFromNode = function (node) {
        if (!node) {
            return null;
        }
        while (node.type === NodeType.Interpolation) {
            node = node.getParent();
        }
        var referenceTypes = this.evaluateReferenceTypes(node);
        if (referenceTypes) {
            return this.internalFindSymbol(node, referenceTypes);
        }
        return null;
    };
    Symbols.prototype.matchesSymbol = function (node, symbol) {
        if (!node) {
            return false;
        }
        while (node.type === NodeType.Interpolation) {
            node = node.getParent();
        }
        if (!node.matches(symbol.name)) {
            return false;
        }
        var referenceTypes = this.evaluateReferenceTypes(node);
        if (!referenceTypes || referenceTypes.indexOf(symbol.type) === -1) {
            return false;
        }
        var nodeSymbol = this.internalFindSymbol(node, referenceTypes);
        return nodeSymbol === symbol;
    };
    Symbols.prototype.findSymbol = function (name, type, offset) {
        var scope = this.global.findScope(offset);
        while (scope) {
            var symbol = scope.getSymbol(name, type);
            if (symbol) {
                return symbol;
            }
            scope = scope.parent;
        }
        return null;
    };
    return Symbols;
}());

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
var ClientCapabilities;
(function (ClientCapabilities) {
    ClientCapabilities.LATEST = {
        textDocument: {
            completion: {
                completionItem: {
                    documentationFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
                }
            },
            hover: {
                contentFormat: [MarkupKind.Markdown, MarkupKind.PlainText]
            }
        }
    };
})(ClientCapabilities || (ClientCapabilities = {}));
var FileType;
(function (FileType) {
    /**
     * The file type is unknown.
     */
    FileType[FileType["Unknown"] = 0] = "Unknown";
    /**
     * A regular file.
     */
    FileType[FileType["File"] = 1] = "File";
    /**
     * A directory.
     */
    FileType[FileType["Directory"] = 2] = "Directory";
    /**
     * A symbolic link to a file.
     */
    FileType[FileType["SymbolicLink"] = 64] = "SymbolicLink";
})(FileType || (FileType = {}));

var LIB;LIB=(()=>{var t={470:t=>{function e(t){if("string"!=typeof t)throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,e){for(var r,n="",o=0,i=-1,a=0,h=0;h<=t.length;++h){if(h<t.length)r=t.charCodeAt(h);else {if(47===r)break;r=47;}if(47===r){if(i===h-1||1===a);else if(i!==h-1&&2===a){if(n.length<2||2!==o||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var s=n.lastIndexOf("/");if(s!==n.length-1){-1===s?(n="",o=0):o=(n=n.slice(0,s)).length-1-n.lastIndexOf("/"),i=h,a=0;continue}}else if(2===n.length||1===n.length){n="",o=0,i=h,a=0;continue}e&&(n.length>0?n+="/..":n="..",o=2);}else n.length>0?n+="/"+t.slice(i+1,h):n=t.slice(i+1,h),o=h-i-1;i=h,a=0;}else 46===r&&-1!==a?++a:a=-1;}return n}var n={resolve:function(){for(var t,n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var a;i>=0?a=arguments[i]:(void 0===t&&(t=process.cwd()),a=t),e(a),0!==a.length&&(n=a+"/"+n,o=47===a.charCodeAt(0));}return n=r(n,!o),o?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(t){if(e(t),0===t.length)return ".";var n=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return 0!==(t=r(t,!n)).length||n||(t="."),t.length>0&&o&&(t+="/"),n?"/"+t:t},isAbsolute:function(t){return e(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0===arguments.length)return ".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];e(o),o.length>0&&(void 0===t?t=o:t+="/"+o);}return void 0===t?".":n.normalize(t)},relative:function(t,r){if(e(t),e(r),t===r)return "";if((t=n.resolve(t))===(r=n.resolve(r)))return "";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var i=t.length,a=i-o,h=1;h<r.length&&47===r.charCodeAt(h);++h);for(var s=r.length-h,f=a<s?a:s,u=-1,c=0;c<=f;++c){if(c===f){if(s>f){if(47===r.charCodeAt(h+c))return r.slice(h+c+1);if(0===c)return r.slice(h+c)}else a>f&&(47===t.charCodeAt(o+c)?u=c:0===c&&(u=0));break}var l=t.charCodeAt(o+c);if(l!==r.charCodeAt(h+c))break;47===l&&(u=c);}var p="";for(c=o+u+1;c<=i;++c)c!==i&&47!==t.charCodeAt(c)||(0===p.length?p+="..":p+="/..");return p.length>0?p+r.slice(h+u):(h+=u,47===r.charCodeAt(h)&&++h,r.slice(h))},_makeLong:function(t){return t},dirname:function(t){if(e(t),0===t.length)return ".";for(var r=t.charCodeAt(0),n=47===r,o=-1,i=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!i){o=a;break}}else i=!1;return -1===o?n?"/":".":n&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw new TypeError('"ext" argument must be a string');e(t);var n,o=0,i=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return "";var h=r.length-1,s=-1;for(n=t.length-1;n>=0;--n){var f=t.charCodeAt(n);if(47===f){if(!a){o=n+1;break}}else -1===s&&(a=!1,s=n+1),h>=0&&(f===r.charCodeAt(h)?-1==--h&&(i=n):(h=-1,i=s));}return o===i?i=s:-1===i&&(i=t.length),t.slice(o,i)}for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!a){o=n+1;break}}else -1===i&&(a=!1,i=n+1);return -1===i?"":t.slice(o,i)},extname:function(t){e(t);for(var r=-1,n=0,o=-1,i=!0,a=0,h=t.length-1;h>=0;--h){var s=t.charCodeAt(h);if(47!==s)-1===o&&(i=!1,o=h+1),46===s?-1===r?r=h:1!==a&&(a=1):-1!==r&&(a=-1);else if(!i){n=h+1;break}}return -1===r||-1===o||0===a||1===a&&r===o-1&&r===n+1?"":t.slice(r,o)},format:function(t){if(null===t||"object"!=typeof t)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return function(t,e){var r=e.dir||e.root,n=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+n:r+"/"+n:n}(0,t)},parse:function(t){e(t);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;var n,o=t.charCodeAt(0),i=47===o;i?(r.root="/",n=1):n=0;for(var a=-1,h=0,s=-1,f=!0,u=t.length-1,c=0;u>=n;--u)if(47!==(o=t.charCodeAt(u)))-1===s&&(f=!1,s=u+1),46===o?-1===a?a=u:1!==c&&(c=1):-1!==a&&(c=-1);else if(!f){h=u+1;break}return -1===a||-1===s||0===c||1===c&&a===s-1&&a===h+1?-1!==s&&(r.base=r.name=0===h&&i?t.slice(1,s):t.slice(h,s)):(0===h&&i?(r.name=t.slice(1,a),r.base=t.slice(1,s)):(r.name=t.slice(h,a),r.base=t.slice(h,s)),r.ext=t.slice(a,s)),h>0?r.dir=t.slice(0,h-1):i&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};n.posix=n,t.exports=n;},447:(t,e,r)=>{var n;if(r.r(e),r.d(e,{URI:()=>g,Utils:()=>O}),"object"==typeof process)n="win32"===process.platform;else if("object"==typeof navigator){var o=navigator.userAgent;n=o.indexOf("Windows")>=0;}var i,a,h=(i=function(t,e){return (i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);})(t,e)},function(t,e){function r(){this.constructor=t;}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r);}),s=/^\w[\w\d+.-]*$/,f=/^\//,u=/^\/\//,c="",l="/",p=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,g=function(){function t(t,e,r,n,o,i){void 0===i&&(i=!1),"object"==typeof t?(this.scheme=t.scheme||c,this.authority=t.authority||c,this.path=t.path||c,this.query=t.query||c,this.fragment=t.fragment||c):(this.scheme=function(t,e){return t||e?t:"file"}(t,i),this.authority=e||c,this.path=function(t,e){switch(t){case"https":case"http":case"file":e?e[0]!==l&&(e=l+e):e=l;}return e}(this.scheme,r||c),this.query=n||c,this.fragment=o||c,function(t,e){if(!t.scheme&&e)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'+t.authority+'", path: "'+t.path+'", query: "'+t.query+'", fragment: "'+t.fragment+'"}');if(t.scheme&&!s.test(t.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(t.path)if(t.authority){if(!f.test(t.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(u.test(t.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}(this,i));}return t.isUri=function(e){return e instanceof t||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"function"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString},Object.defineProperty(t.prototype,"fsPath",{get:function(){return C(this,!1)},enumerable:!1,configurable:!0}),t.prototype.with=function(t){if(!t)return this;var e=t.scheme,r=t.authority,n=t.path,o=t.query,i=t.fragment;return void 0===e?e=this.scheme:null===e&&(e=c),void 0===r?r=this.authority:null===r&&(r=c),void 0===n?n=this.path:null===n&&(n=c),void 0===o?o=this.query:null===o&&(o=c),void 0===i?i=this.fragment:null===i&&(i=c),e===this.scheme&&r===this.authority&&n===this.path&&o===this.query&&i===this.fragment?this:new v(e,r,n,o,i)},t.parse=function(t,e){void 0===e&&(e=!1);var r=p.exec(t);return r?new v(r[2]||c,x(r[4]||c),x(r[5]||c),x(r[7]||c),x(r[9]||c),e):new v(c,c,c,c,c)},t.file=function(t){var e=c;if(n&&(t=t.replace(/\\/g,l)),t[0]===l&&t[1]===l){var r=t.indexOf(l,2);-1===r?(e=t.substring(2),t=l):(e=t.substring(2,r),t=t.substring(r)||l);}return new v("file",e,t,c,c)},t.from=function(t){return new v(t.scheme,t.authority,t.path,t.query,t.fragment)},t.prototype.toString=function(t){return void 0===t&&(t=!1),A(this,t)},t.prototype.toJSON=function(){return this},t.revive=function(e){if(e){if(e instanceof t)return e;var r=new v(e);return r._formatted=e.external,r._fsPath=e._sep===d?e.fsPath:null,r}return e},t}(),d=n?1:void 0,v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._formatted=null,e._fsPath=null,e}return h(e,t),Object.defineProperty(e.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=C(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(t){return void 0===t&&(t=!1),t?A(this,!0):(this._formatted||(this._formatted=A(this,!1)),this._formatted)},e.prototype.toJSON=function(){var t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=d),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t},e}(g),m=((a={})[58]="%3A",a[47]="%2F",a[63]="%3F",a[35]="%23",a[91]="%5B",a[93]="%5D",a[64]="%40",a[33]="%21",a[36]="%24",a[38]="%26",a[39]="%27",a[40]="%28",a[41]="%29",a[42]="%2A",a[43]="%2B",a[44]="%2C",a[59]="%3B",a[61]="%3D",a[32]="%20",a);function y(t,e){for(var r=void 0,n=-1,o=0;o<t.length;o++){var i=t.charCodeAt(o);if(i>=97&&i<=122||i>=65&&i<=90||i>=48&&i<=57||45===i||46===i||95===i||126===i||e&&47===i)-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),void 0!==r&&(r+=t.charAt(o));else {void 0===r&&(r=t.substr(0,o));var a=m[i];void 0!==a?(-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),r+=a):-1===n&&(n=o);}}return -1!==n&&(r+=encodeURIComponent(t.substring(n))),void 0!==r?r:t}function b(t){for(var e=void 0,r=0;r<t.length;r++){var n=t.charCodeAt(r);35===n||63===n?(void 0===e&&(e=t.substr(0,r)),e+=m[n]):void 0!==e&&(e+=t[r]);}return void 0!==e?e:t}function C(t,e){var r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?"//"+t.authority+t.path:47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&t.path.charCodeAt(1)<=90||t.path.charCodeAt(1)>=97&&t.path.charCodeAt(1)<=122)&&58===t.path.charCodeAt(2)?e?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,n&&(r=r.replace(/\//g,"\\")),r}function A(t,e){var r=e?b:y,n="",o=t.scheme,i=t.authority,a=t.path,h=t.query,s=t.fragment;if(o&&(n+=o,n+=":"),(i||"file"===o)&&(n+=l,n+=l),i){var f=i.indexOf("@");if(-1!==f){var u=i.substr(0,f);i=i.substr(f+1),-1===(f=u.indexOf(":"))?n+=r(u,!1):(n+=r(u.substr(0,f),!1),n+=":",n+=r(u.substr(f+1),!1)),n+="@";}-1===(f=(i=i.toLowerCase()).indexOf(":"))?n+=r(i,!1):(n+=r(i.substr(0,f),!1),n+=i.substr(f));}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2))(c=a.charCodeAt(1))>=65&&c<=90&&(a="/"+String.fromCharCode(c+32)+":"+a.substr(3));else if(a.length>=2&&58===a.charCodeAt(1)){var c;(c=a.charCodeAt(0))>=65&&c<=90&&(a=String.fromCharCode(c+32)+":"+a.substr(2));}n+=r(a,!0);}return h&&(n+="?",n+=r(h,!1)),s&&(n+="#",n+=e?s:y(s,!1)),n}function w(t){try{return decodeURIComponent(t)}catch(e){return t.length>3?t.substr(0,3)+w(t.substr(3)):t}}var _=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function x(t){return t.match(_)?t.replace(_,(function(t){return w(t)})):t}var O,P=r(470),j=function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),o=0;for(e=0;e<r;e++)for(var i=arguments[e],a=0,h=i.length;a<h;a++,o++)n[o]=i[a];return n},U=P.posix||P;!function(t){t.joinPath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t.with({path:U.join.apply(U,j([t.path],e))})},t.resolvePath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var n=t.path||"/";return t.with({path:U.resolve.apply(U,j([n],e))})},t.dirname=function(t){var e=U.dirname(t.path);return 1===e.length&&46===e.charCodeAt(0)?t:t.with({path:e})},t.basename=function(t){return U.basename(t.path)},t.extname=function(t){return U.extname(t.path)};}(O||(O={}));}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}return r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]});},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},r(447)})();const{URI,Utils}=LIB;

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function dirname(uriString) {
    return Utils.dirname(URI.parse(uriString)).toString();
}
function joinPath(uriString) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return Utils.joinPath.apply(Utils, __spreadArray([URI.parse(uriString)], paths)).toString();
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PathCompletionParticipant = /** @class */ (function () {
    function PathCompletionParticipant(readDirectory) {
        this.readDirectory = readDirectory;
        this.literalCompletions = [];
        this.importCompletions = [];
    }
    PathCompletionParticipant.prototype.onCssURILiteralValue = function (context) {
        this.literalCompletions.push(context);
    };
    PathCompletionParticipant.prototype.onCssImportPath = function (context) {
        this.importCompletions.push(context);
    };
    PathCompletionParticipant.prototype.computeCompletions = function (document, documentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, literalCompletion, uriValue, fullValue, items, _b, items_1, item, _c, _d, importCompletion, pathValue, fullValue, suggestions, _e, suggestions_1, item;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        result = { items: [], isIncomplete: false };
                        _i = 0, _a = this.literalCompletions;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        literalCompletion = _a[_i];
                        uriValue = literalCompletion.uriValue;
                        fullValue = stripQuotes(uriValue);
                        if (!(fullValue === '.' || fullValue === '..')) return [3 /*break*/, 2];
                        result.isIncomplete = true;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.providePathSuggestions(uriValue, literalCompletion.position, literalCompletion.range, document, documentContext)];
                    case 3:
                        items = _f.sent();
                        for (_b = 0, items_1 = items; _b < items_1.length; _b++) {
                            item = items_1[_b];
                            result.items.push(item);
                        }
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        _c = 0, _d = this.importCompletions;
                        _f.label = 6;
                    case 6:
                        if (!(_c < _d.length)) return [3 /*break*/, 10];
                        importCompletion = _d[_c];
                        pathValue = importCompletion.pathValue;
                        fullValue = stripQuotes(pathValue);
                        if (!(fullValue === '.' || fullValue === '..')) return [3 /*break*/, 7];
                        result.isIncomplete = true;
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.providePathSuggestions(pathValue, importCompletion.position, importCompletion.range, document, documentContext)];
                    case 8:
                        suggestions = _f.sent();
                        if (document.languageId === 'scss') {
                            suggestions.forEach(function (s) {
                                if (startsWith(s.label, '_') && endsWith(s.label, '.scss')) {
                                    if (s.textEdit) {
                                        s.textEdit.newText = s.label.slice(1, -5);
                                    }
                                    else {
                                        s.label = s.label.slice(1, -5);
                                    }
                                }
                            });
                        }
                        for (_e = 0, suggestions_1 = suggestions; _e < suggestions_1.length; _e++) {
                            item = suggestions_1[_e];
                            result.items.push(item);
                        }
                        _f.label = 9;
                    case 9:
                        _c++;
                        return [3 /*break*/, 6];
                    case 10: return [2 /*return*/, result];
                }
            });
        });
    };
    PathCompletionParticipant.prototype.providePathSuggestions = function (pathValue, position, range, document, documentContext) {
        return __awaiter(this, void 0, void 0, function () {
            var fullValue, isValueQuoted, valueBeforeCursor, currentDocUri, fullValueRange, replaceRange, valueBeforeLastSlash, parentDir, result, infos, _i, infos_1, _a, name, type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fullValue = stripQuotes(pathValue);
                        isValueQuoted = startsWith(pathValue, "'") || startsWith(pathValue, "\"");
                        valueBeforeCursor = isValueQuoted
                            ? fullValue.slice(0, position.character - (range.start.character + 1))
                            : fullValue.slice(0, position.character - range.start.character);
                        currentDocUri = document.uri;
                        fullValueRange = isValueQuoted ? shiftRange(range, 1, -1) : range;
                        replaceRange = pathToReplaceRange(valueBeforeCursor, fullValue, fullValueRange);
                        valueBeforeLastSlash = valueBeforeCursor.substring(0, valueBeforeCursor.lastIndexOf('/') + 1);
                        parentDir = documentContext.resolveReference(valueBeforeLastSlash || '.', currentDocUri);
                        if (!parentDir) return [3 /*break*/, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        result = [];
                        return [4 /*yield*/, this.readDirectory(parentDir)];
                    case 2:
                        infos = _b.sent();
                        for (_i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                            _a = infos_1[_i], name = _a[0], type = _a[1];
                            // Exclude paths that start with `.`
                            if (name.charCodeAt(0) !== CharCode_dot && (type === FileType.Directory || joinPath(parentDir, name) !== currentDocUri)) {
                                result.push(createCompletionItem(name, type === FileType.Directory, replaceRange));
                            }
                        }
                        return [2 /*return*/, result];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, []];
                }
            });
        });
    };
    return PathCompletionParticipant;
}());
var CharCode_dot = '.'.charCodeAt(0);
function stripQuotes(fullValue) {
    if (startsWith(fullValue, "'") || startsWith(fullValue, "\"")) {
        return fullValue.slice(1, -1);
    }
    else {
        return fullValue;
    }
}
function pathToReplaceRange(valueBeforeCursor, fullValue, fullValueRange) {
    var replaceRange;
    var lastIndexOfSlash = valueBeforeCursor.lastIndexOf('/');
    if (lastIndexOfSlash === -1) {
        replaceRange = fullValueRange;
    }
    else {
        // For cases where cursor is in the middle of attribute value, like <script src="./s|rc/test.js">
        // Find the last slash before cursor, and calculate the start of replace range from there
        var valueAfterLastSlash = fullValue.slice(lastIndexOfSlash + 1);
        var startPos = shiftPosition(fullValueRange.end, -valueAfterLastSlash.length);
        // If whitespace exists, replace until it
        var whitespaceIndex = valueAfterLastSlash.indexOf(' ');
        var endPos = void 0;
        if (whitespaceIndex !== -1) {
            endPos = shiftPosition(startPos, whitespaceIndex);
        }
        else {
            endPos = fullValueRange.end;
        }
        replaceRange = Range.create(startPos, endPos);
    }
    return replaceRange;
}
function createCompletionItem(name, isDir, replaceRange) {
    if (isDir) {
        name = name + '/';
        return {
            label: escapePath(name),
            kind: CompletionItemKind.Folder,
            textEdit: TextEdit.replace(replaceRange, escapePath(name)),
            command: {
                title: 'Suggest',
                command: 'editor.action.triggerSuggest'
            }
        };
    }
    else {
        return {
            label: escapePath(name),
            kind: CompletionItemKind.File,
            textEdit: TextEdit.replace(replaceRange, escapePath(name))
        };
    }
}
// Escape https://www.w3.org/TR/CSS1/#url
function escapePath(p) {
    return p.replace(/(\s|\(|\)|,|"|')/g, '\\$1');
}
function shiftPosition(pos, offset) {
    return Position.create(pos.line, pos.character + offset);
}
function shiftRange(range, startOffset, endOffset) {
    var start = shiftPosition(range.start, startOffset);
    var end = shiftPosition(range.end, endOffset);
    return Range.create(start, end);
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var localize$3 = loadMessageBundle();
var SnippetFormat = InsertTextFormat.Snippet;
var SortTexts;
(function (SortTexts) {
    // char code 32, comes before everything
    SortTexts["Enums"] = " ";
    SortTexts["Normal"] = "d";
    SortTexts["VendorPrefixed"] = "x";
    SortTexts["Term"] = "y";
    SortTexts["Variable"] = "z";
})(SortTexts || (SortTexts = {}));
var CSSCompletion = /** @class */ (function () {
    function CSSCompletion(variablePrefix, lsOptions, cssDataManager) {
        if (variablePrefix === void 0) { variablePrefix = null; }
        this.variablePrefix = variablePrefix;
        this.lsOptions = lsOptions;
        this.cssDataManager = cssDataManager;
        this.completionParticipants = [];
    }
    CSSCompletion.prototype.configure = function (settings) {
        this.defaultSettings = settings;
    };
    CSSCompletion.prototype.getSymbolContext = function () {
        if (!this.symbolContext) {
            this.symbolContext = new Symbols(this.styleSheet);
        }
        return this.symbolContext;
    };
    CSSCompletion.prototype.setCompletionParticipants = function (registeredCompletionParticipants) {
        this.completionParticipants = registeredCompletionParticipants || [];
    };
    CSSCompletion.prototype.doComplete2 = function (document, position, styleSheet, documentContext, completionSettings) {
        if (completionSettings === void 0) { completionSettings = this.defaultSettings; }
        return __awaiter$1(this, void 0, void 0, function () {
            var participant, contributedParticipants, result, pathCompletionResult;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory) {
                            return [2 /*return*/, this.doComplete(document, position, styleSheet, completionSettings)];
                        }
                        participant = new PathCompletionParticipant(this.lsOptions.fileSystemProvider.readDirectory);
                        contributedParticipants = this.completionParticipants;
                        this.completionParticipants = [participant].concat(contributedParticipants);
                        result = this.doComplete(document, position, styleSheet, completionSettings);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, participant.computeCompletions(document, documentContext)];
                    case 2:
                        pathCompletionResult = _a.sent();
                        return [2 /*return*/, {
                                isIncomplete: result.isIncomplete || pathCompletionResult.isIncomplete,
                                items: pathCompletionResult.items.concat(result.items)
                            }];
                    case 3:
                        this.completionParticipants = contributedParticipants;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CSSCompletion.prototype.doComplete = function (document, position, styleSheet, documentSettings) {
        this.offset = document.offsetAt(position);
        this.position = position;
        this.currentWord = getCurrentWord(document, this.offset);
        this.defaultReplaceRange = Range.create(Position.create(this.position.line, this.position.character - this.currentWord.length), this.position);
        this.textDocument = document;
        this.styleSheet = styleSheet;
        this.documentSettings = documentSettings;
        try {
            var result = { isIncomplete: false, items: [] };
            this.nodePath = getNodePath(this.styleSheet, this.offset);
            for (var i = this.nodePath.length - 1; i >= 0; i--) {
                var node = this.nodePath[i];
                if (node instanceof Property) {
                    this.getCompletionsForDeclarationProperty(node.getParent(), result);
                }
                else if (node instanceof Expression) {
                    if (node.parent instanceof Interpolation) {
                        this.getVariableProposals(null, result);
                    }
                    else {
                        this.getCompletionsForExpression(node, result);
                    }
                }
                else if (node instanceof SimpleSelector) {
                    var parentRef = node.findAParent(NodeType.ExtendsReference, NodeType.Ruleset);
                    if (parentRef) {
                        if (parentRef.type === NodeType.ExtendsReference) {
                            this.getCompletionsForExtendsReference(parentRef, node, result);
                        }
                        else {
                            var parentRuleSet = parentRef;
                            this.getCompletionsForSelector(parentRuleSet, parentRuleSet && parentRuleSet.isNested(), result);
                        }
                    }
                }
                else if (node instanceof FunctionArgument) {
                    this.getCompletionsForFunctionArgument(node, node.getParent(), result);
                }
                else if (node instanceof Declarations) {
                    this.getCompletionsForDeclarations(node, result);
                }
                else if (node instanceof VariableDeclaration) {
                    this.getCompletionsForVariableDeclaration(node, result);
                }
                else if (node instanceof RuleSet) {
                    this.getCompletionsForRuleSet(node, result);
                }
                else if (node instanceof Interpolation) {
                    this.getCompletionsForInterpolation(node, result);
                }
                else if (node instanceof FunctionDeclaration) {
                    this.getCompletionsForFunctionDeclaration(node, result);
                }
                else if (node instanceof MixinReference) {
                    this.getCompletionsForMixinReference(node, result);
                }
                else if (node instanceof Function) {
                    this.getCompletionsForFunctionArgument(null, node, result);
                }
                else if (node instanceof Supports) {
                    this.getCompletionsForSupports(node, result);
                }
                else if (node instanceof SupportsCondition) {
                    this.getCompletionsForSupportsCondition(node, result);
                }
                else if (node instanceof ExtendsReference) {
                    this.getCompletionsForExtendsReference(node, null, result);
                }
                else if (node.type === NodeType.URILiteral) {
                    this.getCompletionForUriLiteralValue(node, result);
                }
                else if (node.parent === null) {
                    this.getCompletionForTopLevel(result);
                }
                else if (node.type === NodeType.StringLiteral && this.isImportPathParent(node.parent.type)) {
                    this.getCompletionForImportPath(node, result);
                    // } else if (node instanceof nodes.Variable) {
                    // this.getCompletionsForVariableDeclaration()
                }
                else {
                    continue;
                }
                if (result.items.length > 0 || this.offset > node.offset) {
                    return this.finalize(result);
                }
            }
            this.getCompletionsForStylesheet(result);
            if (result.items.length === 0) {
                if (this.variablePrefix && this.currentWord.indexOf(this.variablePrefix) === 0) {
                    this.getVariableProposals(null, result);
                }
            }
            return this.finalize(result);
        }
        finally {
            // don't hold on any state, clear symbolContext
            this.position = null;
            this.currentWord = null;
            this.textDocument = null;
            this.styleSheet = null;
            this.symbolContext = null;
            this.defaultReplaceRange = null;
            this.nodePath = null;
        }
    };
    CSSCompletion.prototype.isImportPathParent = function (type) {
        return type === NodeType.Import;
    };
    CSSCompletion.prototype.finalize = function (result) {
        return result;
    };
    CSSCompletion.prototype.findInNodePath = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        for (var i = this.nodePath.length - 1; i >= 0; i--) {
            var node = this.nodePath[i];
            if (types.indexOf(node.type) !== -1) {
                return node;
            }
        }
        return null;
    };
    CSSCompletion.prototype.getCompletionsForDeclarationProperty = function (declaration, result) {
        return this.getPropertyProposals(declaration, result);
    };
    CSSCompletion.prototype.getPropertyProposals = function (declaration, result) {
        var _this = this;
        var triggerPropertyValueCompletion = this.isTriggerPropertyValueCompletionEnabled;
        var completePropertyWithSemicolon = this.isCompletePropertyWithSemicolonEnabled;
        var properties = this.cssDataManager.getProperties();
        properties.forEach(function (entry) {
            var range;
            var insertText;
            var retrigger = false;
            if (declaration) {
                range = _this.getCompletionRange(declaration.getProperty());
                insertText = entry.name;
                if (!isDefined(declaration.colonPosition)) {
                    insertText += ': ';
                    retrigger = true;
                }
            }
            else {
                range = _this.getCompletionRange(null);
                insertText = entry.name + ': ';
                retrigger = true;
            }
            // Empty .selector { | } case
            if (!declaration && completePropertyWithSemicolon) {
                insertText += '$0;';
            }
            // Cases such as .selector { p; } or .selector { p:; }
            if (declaration && !declaration.semicolonPosition) {
                if (completePropertyWithSemicolon && _this.offset >= _this.textDocument.offsetAt(range.end)) {
                    insertText += '$0;';
                }
            }
            var item = {
                label: entry.name,
                documentation: getEntryDescription(entry, _this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [CompletionItemTag.Deprecated] : [],
                textEdit: TextEdit.replace(range, insertText),
                insertTextFormat: InsertTextFormat.Snippet,
                kind: CompletionItemKind.Property
            };
            if (!entry.restrictions) {
                retrigger = false;
            }
            if (triggerPropertyValueCompletion && retrigger) {
                item.command = {
                    title: 'Suggest',
                    command: 'editor.action.triggerSuggest'
                };
            }
            var relevance = typeof entry.relevance === 'number' ? Math.min(Math.max(entry.relevance, 0), 99) : 50;
            var sortTextSuffix = (255 - relevance).toString(16);
            var sortTextPrefix = startsWith(entry.name, '-') ? SortTexts.VendorPrefixed : SortTexts.Normal;
            item.sortText = sortTextPrefix + '_' + sortTextSuffix;
            result.items.push(item);
        });
        this.completionParticipants.forEach(function (participant) {
            if (participant.onCssProperty) {
                participant.onCssProperty({
                    propertyName: _this.currentWord,
                    range: _this.defaultReplaceRange
                });
            }
        });
        return result;
    };
    Object.defineProperty(CSSCompletion.prototype, "isTriggerPropertyValueCompletionEnabled", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.documentSettings) === null || _a === void 0 ? void 0 : _a.triggerPropertyValueCompletion) !== null && _b !== void 0 ? _b : true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CSSCompletion.prototype, "isCompletePropertyWithSemicolonEnabled", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.documentSettings) === null || _a === void 0 ? void 0 : _a.completePropertyWithSemicolon) !== null && _b !== void 0 ? _b : true;
        },
        enumerable: false,
        configurable: true
    });
    CSSCompletion.prototype.getCompletionsForDeclarationValue = function (node, result) {
        var _this = this;
        var propertyName = node.getFullPropertyName();
        var entry = this.cssDataManager.getProperty(propertyName);
        var existingNode = node.getValue() || null;
        while (existingNode && existingNode.hasChildren()) {
            existingNode = existingNode.findChildAtOffset(this.offset, false);
        }
        this.completionParticipants.forEach(function (participant) {
            if (participant.onCssPropertyValue) {
                participant.onCssPropertyValue({
                    propertyName: propertyName,
                    propertyValue: _this.currentWord,
                    range: _this.getCompletionRange(existingNode)
                });
            }
        });
        if (entry) {
            if (entry.restrictions) {
                for (var _i = 0, _a = entry.restrictions; _i < _a.length; _i++) {
                    var restriction = _a[_i];
                    switch (restriction) {
                        case 'color':
                            this.getColorProposals(entry, existingNode, result);
                            break;
                        case 'position':
                            this.getPositionProposals(entry, existingNode, result);
                            break;
                        case 'repeat':
                            this.getRepeatStyleProposals(entry, existingNode, result);
                            break;
                        case 'line-style':
                            this.getLineStyleProposals(entry, existingNode, result);
                            break;
                        case 'line-width':
                            this.getLineWidthProposals(entry, existingNode, result);
                            break;
                        case 'geometry-box':
                            this.getGeometryBoxProposals(entry, existingNode, result);
                            break;
                        case 'box':
                            this.getBoxProposals(entry, existingNode, result);
                            break;
                        case 'image':
                            this.getImageProposals(entry, existingNode, result);
                            break;
                        case 'timing-function':
                            this.getTimingFunctionProposals(entry, existingNode, result);
                            break;
                        case 'shape':
                            this.getBasicShapeProposals(entry, existingNode, result);
                            break;
                    }
                }
            }
            this.getValueEnumProposals(entry, existingNode, result);
            this.getCSSWideKeywordProposals(entry, existingNode, result);
            this.getUnitProposals(entry, existingNode, result);
        }
        else {
            var existingValues = collectValues(this.styleSheet, node);
            for (var _b = 0, _c = existingValues.getEntries(); _b < _c.length; _b++) {
                var existingValue = _c[_b];
                result.items.push({
                    label: existingValue,
                    textEdit: TextEdit.replace(this.getCompletionRange(existingNode), existingValue),
                    kind: CompletionItemKind.Value
                });
            }
        }
        this.getVariableProposals(existingNode, result);
        this.getTermProposals(entry, existingNode, result);
        return result;
    };
    CSSCompletion.prototype.getValueEnumProposals = function (entry, existingNode, result) {
        if (entry.values) {
            for (var _i = 0, _a = entry.values; _i < _a.length; _i++) {
                var value = _a[_i];
                var insertString = value.name;
                var insertTextFormat = void 0;
                if (endsWith(insertString, ')')) {
                    var from = insertString.lastIndexOf('(');
                    if (from !== -1) {
                        insertString = insertString.substr(0, from) + '($1)';
                        insertTextFormat = SnippetFormat;
                    }
                }
                var sortText = SortTexts.Enums;
                if (startsWith(value.name, '-')) {
                    sortText += SortTexts.VendorPrefixed;
                }
                var item = {
                    label: value.name,
                    documentation: getEntryDescription(value, this.doesSupportMarkdown()),
                    tags: isDeprecated(entry) ? [CompletionItemTag.Deprecated] : [],
                    textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertString),
                    sortText: sortText,
                    kind: CompletionItemKind.Value,
                    insertTextFormat: insertTextFormat
                };
                result.items.push(item);
            }
        }
        return result;
    };
    CSSCompletion.prototype.getCSSWideKeywordProposals = function (entry, existingNode, result) {
        for (var keywords in cssWideKeywords) {
            result.items.push({
                label: keywords,
                documentation: cssWideKeywords[keywords],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), keywords),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForInterpolation = function (node, result) {
        if (this.offset >= node.offset + 2) {
            this.getVariableProposals(null, result);
        }
        return result;
    };
    CSSCompletion.prototype.getVariableProposals = function (existingNode, result) {
        var symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, ReferenceType.Variable);
        for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
            var symbol = symbols_1[_i];
            var insertText = startsWith(symbol.name, '--') ? "var(" + symbol.name + ")" : symbol.name;
            var completionItem = {
                label: symbol.name,
                documentation: symbol.value ? getLimitedString(symbol.value) : symbol.value,
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                kind: CompletionItemKind.Variable,
                sortText: SortTexts.Variable
            };
            if (typeof completionItem.documentation === 'string' && isColorString(completionItem.documentation)) {
                completionItem.kind = CompletionItemKind.Color;
            }
            if (symbol.node.type === NodeType.FunctionParameter) {
                var mixinNode = (symbol.node.getParent());
                if (mixinNode.type === NodeType.MixinDeclaration) {
                    completionItem.detail = localize$3('completion.argument', 'argument from \'{0}\'', mixinNode.getName());
                }
            }
            result.items.push(completionItem);
        }
        return result;
    };
    CSSCompletion.prototype.getVariableProposalsForCSSVarFunction = function (result) {
        var symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, ReferenceType.Variable);
        symbols = symbols.filter(function (symbol) {
            return startsWith(symbol.name, '--');
        });
        for (var _i = 0, symbols_2 = symbols; _i < symbols_2.length; _i++) {
            var symbol = symbols_2[_i];
            var completionItem = {
                label: symbol.name,
                documentation: symbol.value ? getLimitedString(symbol.value) : symbol.value,
                textEdit: TextEdit.replace(this.getCompletionRange(null), symbol.name),
                kind: CompletionItemKind.Variable
            };
            if (typeof completionItem.documentation === 'string' && isColorString(completionItem.documentation)) {
                completionItem.kind = CompletionItemKind.Color;
            }
            result.items.push(completionItem);
        }
        return result;
    };
    CSSCompletion.prototype.getUnitProposals = function (entry, existingNode, result) {
        var currentWord = '0';
        if (this.currentWord.length > 0) {
            var numMatch = this.currentWord.match(/^-?\d[\.\d+]*/);
            if (numMatch) {
                currentWord = numMatch[0];
                result.isIncomplete = currentWord.length === this.currentWord.length;
            }
        }
        else if (this.currentWord.length === 0) {
            result.isIncomplete = true;
        }
        if (existingNode && existingNode.parent && existingNode.parent.type === NodeType.Term) {
            existingNode = existingNode.getParent(); // include the unary operator
        }
        if (entry.restrictions) {
            for (var _i = 0, _a = entry.restrictions; _i < _a.length; _i++) {
                var restriction = _a[_i];
                var units$1 = units[restriction];
                if (units$1) {
                    for (var _b = 0, units_1 = units$1; _b < units_1.length; _b++) {
                        var unit = units_1[_b];
                        var insertText = currentWord + unit;
                        result.items.push({
                            label: insertText,
                            textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                            kind: CompletionItemKind.Unit
                        });
                    }
                }
            }
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionRange = function (existingNode) {
        if (existingNode && existingNode.offset <= this.offset && this.offset <= existingNode.end) {
            var end = existingNode.end !== -1 ? this.textDocument.positionAt(existingNode.end) : this.position;
            var start = this.textDocument.positionAt(existingNode.offset);
            if (start.line === end.line) {
                return Range.create(start, end); // multi line edits are not allowed
            }
        }
        return this.defaultReplaceRange;
    };
    CSSCompletion.prototype.getColorProposals = function (entry, existingNode, result) {
        for (var color in colors) {
            result.items.push({
                label: color,
                documentation: colors[color],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), color),
                kind: CompletionItemKind.Color
            });
        }
        for (var color in colorKeywords) {
            result.items.push({
                label: color,
                documentation: colorKeywords[color],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), color),
                kind: CompletionItemKind.Value
            });
        }
        var colorValues = new Set();
        this.styleSheet.acceptVisitor(new ColorValueCollector(colorValues, this.offset));
        for (var _i = 0, _a = colorValues.getEntries(); _i < _a.length; _i++) {
            var color = _a[_i];
            result.items.push({
                label: color,
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), color),
                kind: CompletionItemKind.Color
            });
        }
        var _loop_1 = function (p) {
            var tabStop = 1;
            var replaceFunction = function (_match, p1) { return '${' + tabStop++ + ':' + p1 + '}'; };
            var insertText = p.func.replace(/\[?\$(\w+)\]?/g, replaceFunction);
            result.items.push({
                label: p.func.substr(0, p.func.indexOf('(')),
                detail: p.func,
                documentation: p.desc,
                textEdit: TextEdit.replace(this_1.getCompletionRange(existingNode), insertText),
                insertTextFormat: SnippetFormat,
                kind: CompletionItemKind.Function
            });
        };
        var this_1 = this;
        for (var _b = 0, _c = colorFunctions; _b < _c.length; _b++) {
            var p = _c[_b];
            _loop_1(p);
        }
        return result;
    };
    CSSCompletion.prototype.getPositionProposals = function (entry, existingNode, result) {
        for (var position in positionKeywords) {
            result.items.push({
                label: position,
                documentation: positionKeywords[position],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), position),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getRepeatStyleProposals = function (entry, existingNode, result) {
        for (var repeat in repeatStyleKeywords) {
            result.items.push({
                label: repeat,
                documentation: repeatStyleKeywords[repeat],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), repeat),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getLineStyleProposals = function (entry, existingNode, result) {
        for (var lineStyle in lineStyleKeywords) {
            result.items.push({
                label: lineStyle,
                documentation: lineStyleKeywords[lineStyle],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), lineStyle),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getLineWidthProposals = function (entry, existingNode, result) {
        for (var _i = 0, _a = lineWidthKeywords; _i < _a.length; _i++) {
            var lineWidth = _a[_i];
            result.items.push({
                label: lineWidth,
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), lineWidth),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getGeometryBoxProposals = function (entry, existingNode, result) {
        for (var box in geometryBoxKeywords) {
            result.items.push({
                label: box,
                documentation: geometryBoxKeywords[box],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), box),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getBoxProposals = function (entry, existingNode, result) {
        for (var box in boxKeywords) {
            result.items.push({
                label: box,
                documentation: boxKeywords[box],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), box),
                kind: CompletionItemKind.Value
            });
        }
        return result;
    };
    CSSCompletion.prototype.getImageProposals = function (entry, existingNode, result) {
        for (var image in imageFunctions) {
            var insertText = moveCursorInsideParenthesis(image);
            result.items.push({
                label: image,
                documentation: imageFunctions[image],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                kind: CompletionItemKind.Function,
                insertTextFormat: image !== insertText ? SnippetFormat : void 0
            });
        }
        return result;
    };
    CSSCompletion.prototype.getTimingFunctionProposals = function (entry, existingNode, result) {
        for (var timing in transitionTimingFunctions) {
            var insertText = moveCursorInsideParenthesis(timing);
            result.items.push({
                label: timing,
                documentation: transitionTimingFunctions[timing],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                kind: CompletionItemKind.Function,
                insertTextFormat: timing !== insertText ? SnippetFormat : void 0
            });
        }
        return result;
    };
    CSSCompletion.prototype.getBasicShapeProposals = function (entry, existingNode, result) {
        for (var shape in basicShapeFunctions) {
            var insertText = moveCursorInsideParenthesis(shape);
            result.items.push({
                label: shape,
                documentation: basicShapeFunctions[shape],
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                kind: CompletionItemKind.Function,
                insertTextFormat: shape !== insertText ? SnippetFormat : void 0
            });
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForStylesheet = function (result) {
        var node = this.styleSheet.findFirstChildBeforeOffset(this.offset);
        if (!node) {
            return this.getCompletionForTopLevel(result);
        }
        if (node instanceof RuleSet) {
            return this.getCompletionsForRuleSet(node, result);
        }
        if (node instanceof Supports) {
            return this.getCompletionsForSupports(node, result);
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionForTopLevel = function (result) {
        var _this = this;
        this.cssDataManager.getAtDirectives().forEach(function (entry) {
            result.items.push({
                label: entry.name,
                textEdit: TextEdit.replace(_this.getCompletionRange(null), entry.name),
                documentation: getEntryDescription(entry, _this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [CompletionItemTag.Deprecated] : [],
                kind: CompletionItemKind.Keyword
            });
        });
        this.getCompletionsForSelector(null, false, result);
        return result;
    };
    CSSCompletion.prototype.getCompletionsForRuleSet = function (ruleSet, result) {
        var declarations = ruleSet.getDeclarations();
        var isAfter = declarations && declarations.endsWith('}') && this.offset >= declarations.end;
        if (isAfter) {
            return this.getCompletionForTopLevel(result);
        }
        var isInSelectors = !declarations || this.offset <= declarations.offset;
        if (isInSelectors) {
            return this.getCompletionsForSelector(ruleSet, ruleSet.isNested(), result);
        }
        return this.getCompletionsForDeclarations(ruleSet.getDeclarations(), result);
    };
    CSSCompletion.prototype.getCompletionsForSelector = function (ruleSet, isNested, result) {
        var _this = this;
        var existingNode = this.findInNodePath(NodeType.PseudoSelector, NodeType.IdentifierSelector, NodeType.ClassSelector, NodeType.ElementNameSelector);
        if (!existingNode && this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ':')) {
            // after the ':' of a pseudo selector, no node generated for just ':'
            this.currentWord = ':' + this.currentWord;
            if (this.hasCharacterAtPosition(this.offset - this.currentWord.length - 1, ':')) {
                this.currentWord = ':' + this.currentWord; // for '::'
            }
            this.defaultReplaceRange = Range.create(Position.create(this.position.line, this.position.character - this.currentWord.length), this.position);
        }
        var pseudoClasses = this.cssDataManager.getPseudoClasses();
        pseudoClasses.forEach(function (entry) {
            var insertText = moveCursorInsideParenthesis(entry.name);
            var item = {
                label: entry.name,
                textEdit: TextEdit.replace(_this.getCompletionRange(existingNode), insertText),
                documentation: getEntryDescription(entry, _this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [CompletionItemTag.Deprecated] : [],
                kind: CompletionItemKind.Function,
                insertTextFormat: entry.name !== insertText ? SnippetFormat : void 0
            };
            if (startsWith(entry.name, ':-')) {
                item.sortText = SortTexts.VendorPrefixed;
            }
            result.items.push(item);
        });
        var pseudoElements = this.cssDataManager.getPseudoElements();
        pseudoElements.forEach(function (entry) {
            var insertText = moveCursorInsideParenthesis(entry.name);
            var item = {
                label: entry.name,
                textEdit: TextEdit.replace(_this.getCompletionRange(existingNode), insertText),
                documentation: getEntryDescription(entry, _this.doesSupportMarkdown()),
                tags: isDeprecated(entry) ? [CompletionItemTag.Deprecated] : [],
                kind: CompletionItemKind.Function,
                insertTextFormat: entry.name !== insertText ? SnippetFormat : void 0
            };
            if (startsWith(entry.name, '::-')) {
                item.sortText = SortTexts.VendorPrefixed;
            }
            result.items.push(item);
        });
        if (!isNested) { // show html tags only for top level
            for (var _i = 0, _a = html5Tags; _i < _a.length; _i++) {
                var entry = _a[_i];
                result.items.push({
                    label: entry,
                    textEdit: TextEdit.replace(this.getCompletionRange(existingNode), entry),
                    kind: CompletionItemKind.Keyword
                });
            }
            for (var _b = 0, _c = svgElements; _b < _c.length; _b++) {
                var entry = _c[_b];
                result.items.push({
                    label: entry,
                    textEdit: TextEdit.replace(this.getCompletionRange(existingNode), entry),
                    kind: CompletionItemKind.Keyword
                });
            }
        }
        var visited = {};
        visited[this.currentWord] = true;
        var docText = this.textDocument.getText();
        this.styleSheet.accept(function (n) {
            if (n.type === NodeType.SimpleSelector && n.length > 0) {
                var selector = docText.substr(n.offset, n.length);
                if (selector.charAt(0) === '.' && !visited[selector]) {
                    visited[selector] = true;
                    result.items.push({
                        label: selector,
                        textEdit: TextEdit.replace(_this.getCompletionRange(existingNode), selector),
                        kind: CompletionItemKind.Keyword
                    });
                }
                return false;
            }
            return true;
        });
        if (ruleSet && ruleSet.isNested()) {
            var selector = ruleSet.getSelectors().findFirstChildBeforeOffset(this.offset);
            if (selector && ruleSet.getSelectors().getChildren().indexOf(selector) === 0) {
                this.getPropertyProposals(null, result);
            }
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForDeclarations = function (declarations, result) {
        if (!declarations || this.offset === declarations.offset) { // incomplete nodes
            return result;
        }
        var node = declarations.findFirstChildBeforeOffset(this.offset);
        if (!node) {
            return this.getCompletionsForDeclarationProperty(null, result);
        }
        if (node instanceof AbstractDeclaration) {
            var declaration = node;
            if (!isDefined(declaration.colonPosition) || this.offset <= declaration.colonPosition) {
                // complete property
                return this.getCompletionsForDeclarationProperty(declaration, result);
            }
            else if ((isDefined(declaration.semicolonPosition) && declaration.semicolonPosition < this.offset)) {
                if (this.offset === declaration.semicolonPosition + 1) {
                    return result; // don't show new properties right after semicolon (see Bug 15421:[intellisense] [css] Be less aggressive when manually typing CSS)
                }
                // complete next property
                return this.getCompletionsForDeclarationProperty(null, result);
            }
            if (declaration instanceof Declaration) {
                // complete value
                return this.getCompletionsForDeclarationValue(declaration, result);
            }
        }
        else if (node instanceof ExtendsReference) {
            this.getCompletionsForExtendsReference(node, null, result);
        }
        else if (this.currentWord && this.currentWord[0] === '@') {
            this.getCompletionsForDeclarationProperty(null, result);
        }
        else if (node instanceof RuleSet) {
            this.getCompletionsForDeclarationProperty(null, result);
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForVariableDeclaration = function (declaration, result) {
        if (this.offset && isDefined(declaration.colonPosition) && this.offset > declaration.colonPosition) {
            this.getVariableProposals(declaration.getValue(), result);
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForExpression = function (expression, result) {
        var parent = expression.getParent();
        if (parent instanceof FunctionArgument) {
            this.getCompletionsForFunctionArgument(parent, parent.getParent(), result);
            return result;
        }
        var declaration = expression.findParent(NodeType.Declaration);
        if (!declaration) {
            this.getTermProposals(undefined, null, result);
            return result;
        }
        var node = expression.findChildAtOffset(this.offset, true);
        if (!node) {
            return this.getCompletionsForDeclarationValue(declaration, result);
        }
        if (node instanceof NumericValue || node instanceof Identifier) {
            return this.getCompletionsForDeclarationValue(declaration, result);
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForFunctionArgument = function (arg, func, result) {
        var identifier = func.getIdentifier();
        if (identifier && identifier.matches('var')) {
            if (!func.getArguments().hasChildren() || func.getArguments().getChild(0) === arg) {
                this.getVariableProposalsForCSSVarFunction(result);
            }
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForFunctionDeclaration = function (decl, result) {
        var declarations = decl.getDeclarations();
        if (declarations && this.offset > declarations.offset && this.offset < declarations.end) {
            this.getTermProposals(undefined, null, result);
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForMixinReference = function (ref, result) {
        var _this = this;
        var allMixins = this.getSymbolContext().findSymbolsAtOffset(this.offset, ReferenceType.Mixin);
        for (var _i = 0, allMixins_1 = allMixins; _i < allMixins_1.length; _i++) {
            var mixinSymbol = allMixins_1[_i];
            if (mixinSymbol.node instanceof MixinDeclaration) {
                result.items.push(this.makeTermProposal(mixinSymbol, mixinSymbol.node.getParameters(), null));
            }
        }
        var identifierNode = ref.getIdentifier() || null;
        this.completionParticipants.forEach(function (participant) {
            if (participant.onCssMixinReference) {
                participant.onCssMixinReference({
                    mixinName: _this.currentWord,
                    range: _this.getCompletionRange(identifierNode)
                });
            }
        });
        return result;
    };
    CSSCompletion.prototype.getTermProposals = function (entry, existingNode, result) {
        var allFunctions = this.getSymbolContext().findSymbolsAtOffset(this.offset, ReferenceType.Function);
        for (var _i = 0, allFunctions_1 = allFunctions; _i < allFunctions_1.length; _i++) {
            var functionSymbol = allFunctions_1[_i];
            if (functionSymbol.node instanceof FunctionDeclaration) {
                result.items.push(this.makeTermProposal(functionSymbol, functionSymbol.node.getParameters(), existingNode));
            }
        }
        return result;
    };
    CSSCompletion.prototype.makeTermProposal = function (symbol, parameters, existingNode) {
        var decl = symbol.node;
        var params = parameters.getChildren().map(function (c) {
            return (c instanceof FunctionParameter) ? c.getName() : c.getText();
        });
        var insertText = symbol.name + '(' + params.map(function (p, index) { return '${' + (index + 1) + ':' + p + '}'; }).join(', ') + ')';
        return {
            label: symbol.name,
            detail: symbol.name + '(' + params.join(', ') + ')',
            textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
            insertTextFormat: SnippetFormat,
            kind: CompletionItemKind.Function,
            sortText: SortTexts.Term
        };
    };
    CSSCompletion.prototype.getCompletionsForSupportsCondition = function (supportsCondition, result) {
        var child = supportsCondition.findFirstChildBeforeOffset(this.offset);
        if (child) {
            if (child instanceof Declaration) {
                if (!isDefined(child.colonPosition) || this.offset <= child.colonPosition) {
                    return this.getCompletionsForDeclarationProperty(child, result);
                }
                else {
                    return this.getCompletionsForDeclarationValue(child, result);
                }
            }
            else if (child instanceof SupportsCondition) {
                return this.getCompletionsForSupportsCondition(child, result);
            }
        }
        if (isDefined(supportsCondition.lParent) && this.offset > supportsCondition.lParent && (!isDefined(supportsCondition.rParent) || this.offset <= supportsCondition.rParent)) {
            return this.getCompletionsForDeclarationProperty(null, result);
        }
        return result;
    };
    CSSCompletion.prototype.getCompletionsForSupports = function (supports, result) {
        var declarations = supports.getDeclarations();
        var inInCondition = !declarations || this.offset <= declarations.offset;
        if (inInCondition) {
            var child = supports.findFirstChildBeforeOffset(this.offset);
            if (child instanceof SupportsCondition) {
                return this.getCompletionsForSupportsCondition(child, result);
            }
            return result;
        }
        return this.getCompletionForTopLevel(result);
    };
    CSSCompletion.prototype.getCompletionsForExtendsReference = function (extendsRef, existingNode, result) {
        return result;
    };
    CSSCompletion.prototype.getCompletionForUriLiteralValue = function (uriLiteralNode, result) {
        var uriValue;
        var position;
        var range;
        // No children, empty value
        if (!uriLiteralNode.hasChildren()) {
            uriValue = '';
            position = this.position;
            var emptyURIValuePosition = this.textDocument.positionAt(uriLiteralNode.offset + 'url('.length);
            range = Range.create(emptyURIValuePosition, emptyURIValuePosition);
        }
        else {
            var uriValueNode = uriLiteralNode.getChild(0);
            uriValue = uriValueNode.getText();
            position = this.position;
            range = this.getCompletionRange(uriValueNode);
        }
        this.completionParticipants.forEach(function (participant) {
            if (participant.onCssURILiteralValue) {
                participant.onCssURILiteralValue({
                    uriValue: uriValue,
                    position: position,
                    range: range
                });
            }
        });
        return result;
    };
    CSSCompletion.prototype.getCompletionForImportPath = function (importPathNode, result) {
        var _this = this;
        this.completionParticipants.forEach(function (participant) {
            if (participant.onCssImportPath) {
                participant.onCssImportPath({
                    pathValue: importPathNode.getText(),
                    position: _this.position,
                    range: _this.getCompletionRange(importPathNode)
                });
            }
        });
        return result;
    };
    CSSCompletion.prototype.hasCharacterAtPosition = function (offset, char) {
        var text = this.textDocument.getText();
        return (offset >= 0 && offset < text.length) && text.charAt(offset) === char;
    };
    CSSCompletion.prototype.doesSupportMarkdown = function () {
        var _a, _b, _c;
        if (!isDefined(this.supportsMarkdown)) {
            if (!isDefined(this.lsOptions.clientCapabilities)) {
                this.supportsMarkdown = true;
                return this.supportsMarkdown;
            }
            var documentationFormat = (_c = (_b = (_a = this.lsOptions.clientCapabilities.textDocument) === null || _a === void 0 ? void 0 : _a.completion) === null || _b === void 0 ? void 0 : _b.completionItem) === null || _c === void 0 ? void 0 : _c.documentationFormat;
            this.supportsMarkdown = Array.isArray(documentationFormat) && documentationFormat.indexOf(MarkupKind.Markdown) !== -1;
        }
        return this.supportsMarkdown;
    };
    return CSSCompletion;
}());
function isDeprecated(entry) {
    if (entry.status && (entry.status === 'nonstandard' || entry.status === 'obsolete')) {
        return true;
    }
    return false;
}
var Set = /** @class */ (function () {
    function Set() {
        this.entries = {};
    }
    Set.prototype.add = function (entry) {
        this.entries[entry] = true;
    };
    Set.prototype.getEntries = function () {
        return Object.keys(this.entries);
    };
    return Set;
}());
function moveCursorInsideParenthesis(text) {
    return text.replace(/\(\)$/, "($1)");
}
function collectValues(styleSheet, declaration) {
    var fullPropertyName = declaration.getFullPropertyName();
    var entries = new Set();
    function visitValue(node) {
        if (node instanceof Identifier || node instanceof NumericValue || node instanceof HexColorValue) {
            entries.add(node.getText());
        }
        return true;
    }
    function matchesProperty(decl) {
        var propertyName = decl.getFullPropertyName();
        return fullPropertyName === propertyName;
    }
    function vistNode(node) {
        if (node instanceof Declaration && node !== declaration) {
            if (matchesProperty(node)) {
                var value = node.getValue();
                if (value) {
                    value.accept(visitValue);
                }
            }
        }
        return true;
    }
    styleSheet.accept(vistNode);
    return entries;
}
var ColorValueCollector = /** @class */ (function () {
    function ColorValueCollector(entries, currentOffset) {
        this.entries = entries;
        this.currentOffset = currentOffset;
        // nothing to do
    }
    ColorValueCollector.prototype.visitNode = function (node) {
        if (node instanceof HexColorValue || (node instanceof Function && isColorConstructor(node))) {
            if (this.currentOffset < node.offset || node.end < this.currentOffset) {
                this.entries.add(node.getText());
            }
        }
        return true;
    };
    return ColorValueCollector;
}());
function getCurrentWord(document, offset) {
    var i = offset - 1;
    var text = document.getText();
    while (i >= 0 && ' \t\n\r":{[()]},*>+'.indexOf(text.charAt(i)) === -1) {
        i--;
    }
    return text.substring(i + 1, offset);
}
function isColorString(s) {
    // From https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
    return (s.toLowerCase() in colors) || /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(s);
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Element = /** @class */ (function () {
    function Element() {
        this.parent = null;
        this.children = null;
        this.attributes = null;
    }
    Element.prototype.findAttribute = function (name) {
        if (this.attributes) {
            for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
                var attribute = _a[_i];
                if (attribute.name === name) {
                    return attribute.value;
                }
            }
        }
        return null;
    };
    Element.prototype.addChild = function (child) {
        if (child instanceof Element) {
            child.parent = this;
        }
        if (!this.children) {
            this.children = [];
        }
        this.children.push(child);
    };
    Element.prototype.append = function (text) {
        if (this.attributes) {
            var last = this.attributes[this.attributes.length - 1];
            last.value = last.value + text;
        }
    };
    Element.prototype.prepend = function (text) {
        if (this.attributes) {
            var first = this.attributes[0];
            first.value = text + first.value;
        }
    };
    Element.prototype.findRoot = function () {
        var curr = this;
        while (curr.parent && !(curr.parent instanceof RootElement)) {
            curr = curr.parent;
        }
        return curr;
    };
    Element.prototype.removeChild = function (child) {
        if (this.children) {
            var index = this.children.indexOf(child);
            if (index !== -1) {
                this.children.splice(index, 1);
                return true;
            }
        }
        return false;
    };
    Element.prototype.addAttr = function (name, value) {
        if (!this.attributes) {
            this.attributes = [];
        }
        for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
            var attribute = _a[_i];
            if (attribute.name === name) {
                attribute.value += ' ' + value;
                return;
            }
        }
        this.attributes.push({ name: name, value: value });
    };
    Element.prototype.clone = function (cloneChildren) {
        if (cloneChildren === void 0) { cloneChildren = true; }
        var elem = new Element();
        if (this.attributes) {
            elem.attributes = [];
            for (var _i = 0, _a = this.attributes; _i < _a.length; _i++) {
                var attribute = _a[_i];
                elem.addAttr(attribute.name, attribute.value);
            }
        }
        if (cloneChildren && this.children) {
            elem.children = [];
            for (var index = 0; index < this.children.length; index++) {
                elem.addChild(this.children[index].clone());
            }
        }
        return elem;
    };
    Element.prototype.cloneWithParent = function () {
        var clone = this.clone(false);
        if (this.parent && !(this.parent instanceof RootElement)) {
            var parentClone = this.parent.cloneWithParent();
            parentClone.addChild(clone);
        }
        return clone;
    };
    return Element;
}());
var RootElement = /** @class */ (function (_super) {
    __extends$2(RootElement, _super);
    function RootElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RootElement;
}(Element));
var LabelElement = /** @class */ (function (_super) {
    __extends$2(LabelElement, _super);
    function LabelElement(label) {
        var _this = _super.call(this) || this;
        _this.addAttr('name', label);
        return _this;
    }
    return LabelElement;
}(Element));
var quotes;
(function (quotes) {
    function ensure(value, which) {
        return which + remove(value) + which;
    }
    quotes.ensure = ensure;
    function remove(value) {
        var match = value.match(/^['"](.*)["']$/);
        if (match) {
            return match[1];
        }
        return value;
    }
    quotes.remove = remove;
})(quotes || (quotes = {}));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var localize$4 = loadMessageBundle();
var CSSNavigation = /** @class */ (function () {
    function CSSNavigation(fileSystemProvider) {
        this.fileSystemProvider = fileSystemProvider;
    }
    CSSNavigation.prototype.findDefinition = function (document, position, stylesheet) {
        var symbols = new Symbols(stylesheet);
        var offset = document.offsetAt(position);
        var node = getNodeAtOffset(stylesheet, offset);
        if (!node) {
            return null;
        }
        var symbol = symbols.findSymbolFromNode(node);
        if (!symbol) {
            return null;
        }
        return {
            uri: document.uri,
            range: getRange(symbol.node, document)
        };
    };
    CSSNavigation.prototype.findReferences = function (document, position, stylesheet) {
        var highlights = this.findDocumentHighlights(document, position, stylesheet);
        return highlights.map(function (h) {
            return {
                uri: document.uri,
                range: h.range
            };
        });
    };
    CSSNavigation.prototype.findDocumentHighlights = function (document, position, stylesheet) {
        var result = [];
        var offset = document.offsetAt(position);
        var node = getNodeAtOffset(stylesheet, offset);
        if (!node || node.type === NodeType.Stylesheet || node.type === NodeType.Declarations) {
            return result;
        }
        if (node.type === NodeType.Identifier && node.parent && node.parent.type === NodeType.ClassSelector) {
            node = node.parent;
        }
        var symbols = new Symbols(stylesheet);
        var symbol = symbols.findSymbolFromNode(node);
        var name = node.getText();
        stylesheet.accept(function (candidate) {
            if (symbol) {
                if (symbols.matchesSymbol(candidate, symbol)) {
                    result.push({
                        kind: getHighlightKind(candidate),
                        range: getRange(candidate, document)
                    });
                    return false;
                }
            }
            else if (node && node.type === candidate.type && candidate.matches(name)) {
                // Same node type and data
                result.push({
                    kind: getHighlightKind(candidate),
                    range: getRange(candidate, document)
                });
            }
            return true;
        });
        return result;
    };
    CSSNavigation.prototype.isRawStringDocumentLinkNode = function (node) {
        return node.type === NodeType.Import;
    };
    CSSNavigation.prototype.findDocumentLinks = function (document, stylesheet, documentContext) {
        var links = this.findUnresolvedLinks(document, stylesheet);
        for (var i = 0; i < links.length; i++) {
            var target = links[i].target;
            if (target && !(/^\w+:\/\//g.test(target))) {
                var resolved = documentContext.resolveReference(target, document.uri);
                if (resolved) {
                    links[i].target = resolved;
                }
            }
        }
        return links;
    };
    CSSNavigation.prototype.findDocumentLinks2 = function (document, stylesheet, documentContext) {
        return __awaiter$2(this, void 0, void 0, function () {
            var links, resolvedLinks, _i, links_1, link, target, resolvedTarget;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        links = this.findUnresolvedLinks(document, stylesheet);
                        resolvedLinks = [];
                        _i = 0, links_1 = links;
                        _a.label = 1;
                    case 1:
                        if (!(_i < links_1.length)) return [3 /*break*/, 5];
                        link = links_1[_i];
                        target = link.target;
                        if (!(target && !(/^\w+:\/\//g.test(target)))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.resolveRelativeReference(target, document.uri, documentContext)];
                    case 2:
                        resolvedTarget = _a.sent();
                        if (resolvedTarget !== undefined) {
                            link.target = resolvedTarget;
                            resolvedLinks.push(link);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        resolvedLinks.push(link);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, resolvedLinks];
                }
            });
        });
    };
    CSSNavigation.prototype.findUnresolvedLinks = function (document, stylesheet) {
        var _this = this;
        var result = [];
        var collect = function (uriStringNode) {
            var rawUri = uriStringNode.getText();
            var range = getRange(uriStringNode, document);
            // Make sure the range is not empty
            if (range.start.line === range.end.line && range.start.character === range.end.character) {
                return;
            }
            if (startsWith(rawUri, "'") || startsWith(rawUri, "\"")) {
                rawUri = rawUri.slice(1, -1);
            }
            result.push({ target: rawUri, range: range });
        };
        stylesheet.accept(function (candidate) {
            if (candidate.type === NodeType.URILiteral) {
                var first = candidate.getChild(0);
                if (first) {
                    collect(first);
                }
                return false;
            }
            /**
             * In @import, it is possible to include links that do not use `url()`
             * For example, `@import 'foo.css';`
             */
            if (candidate.parent && _this.isRawStringDocumentLinkNode(candidate.parent)) {
                var rawText = candidate.getText();
                if (startsWith(rawText, "'") || startsWith(rawText, "\"")) {
                    collect(candidate);
                }
                return false;
            }
            return true;
        });
        return result;
    };
    CSSNavigation.prototype.findDocumentSymbols = function (document, stylesheet) {
        var result = [];
        stylesheet.accept(function (node) {
            var entry = {
                name: null,
                kind: SymbolKind.Class,
                location: null
            };
            var locationNode = node;
            if (node instanceof Selector) {
                entry.name = node.getText();
                locationNode = node.findAParent(NodeType.Ruleset, NodeType.ExtendsReference);
                if (locationNode) {
                    entry.location = Location.create(document.uri, getRange(locationNode, document));
                    result.push(entry);
                }
                return false;
            }
            else if (node instanceof VariableDeclaration) {
                entry.name = node.getName();
                entry.kind = SymbolKind.Variable;
            }
            else if (node instanceof MixinDeclaration) {
                entry.name = node.getName();
                entry.kind = SymbolKind.Method;
            }
            else if (node instanceof FunctionDeclaration) {
                entry.name = node.getName();
                entry.kind = SymbolKind.Function;
            }
            else if (node instanceof Keyframe) {
                entry.name = localize$4('literal.keyframes', "@keyframes {0}", node.getName());
            }
            else if (node instanceof FontFace) {
                entry.name = localize$4('literal.fontface', "@font-face");
            }
            else if (node instanceof Media) {
                var mediaList = node.getChild(0);
                if (mediaList instanceof Medialist) {
                    entry.name = '@media ' + mediaList.getText();
                    entry.kind = SymbolKind.Module;
                }
            }
            if (entry.name) {
                entry.location = Location.create(document.uri, getRange(locationNode, document));
                result.push(entry);
            }
            return true;
        });
        return result;
    };
    CSSNavigation.prototype.findDocumentColors = function (document, stylesheet) {
        var result = [];
        stylesheet.accept(function (node) {
            var colorInfo = getColorInformation(node, document);
            if (colorInfo) {
                result.push(colorInfo);
            }
            return true;
        });
        return result;
    };
    CSSNavigation.prototype.getColorPresentations = function (document, stylesheet, color, range) {
        var result = [];
        var red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
        var label;
        if (color.alpha === 1) {
            label = "rgb(" + red256 + ", " + green256 + ", " + blue256 + ")";
        }
        else {
            label = "rgba(" + red256 + ", " + green256 + ", " + blue256 + ", " + color.alpha + ")";
        }
        result.push({ label: label, textEdit: TextEdit.replace(range, label) });
        if (color.alpha === 1) {
            label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256);
        }
        else {
            label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256) + toTwoDigitHex(Math.round(color.alpha * 255));
        }
        result.push({ label: label, textEdit: TextEdit.replace(range, label) });
        var hsl = hslFromColor(color);
        if (hsl.a === 1) {
            label = "hsl(" + hsl.h + ", " + Math.round(hsl.s * 100) + "%, " + Math.round(hsl.l * 100) + "%)";
        }
        else {
            label = "hsla(" + hsl.h + ", " + Math.round(hsl.s * 100) + "%, " + Math.round(hsl.l * 100) + "%, " + hsl.a + ")";
        }
        result.push({ label: label, textEdit: TextEdit.replace(range, label) });
        return result;
    };
    CSSNavigation.prototype.doRename = function (document, position, newName, stylesheet) {
        var _a;
        var highlights = this.findDocumentHighlights(document, position, stylesheet);
        var edits = highlights.map(function (h) { return TextEdit.replace(h.range, newName); });
        return {
            changes: (_a = {}, _a[document.uri] = edits, _a)
        };
    };
    CSSNavigation.prototype.resolveRelativeReference = function (ref, documentUri, documentContext) {
        return __awaiter$2(this, void 0, void 0, function () {
            var moduleName, rootFolderUri, documentFolderUri, modulePath, pathWithinModule;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ref[0] === '~' && ref[1] !== '/' && this.fileSystemProvider)) return [3 /*break*/, 3];
                        ref = ref.substring(1);
                        if (!startsWith(documentUri, 'file://')) return [3 /*break*/, 2];
                        moduleName = getModuleNameFromPath(ref);
                        rootFolderUri = documentContext.resolveReference('/', documentUri);
                        documentFolderUri = dirname(documentUri);
                        return [4 /*yield*/, this.resolvePathToModule(moduleName, documentFolderUri, rootFolderUri)];
                    case 1:
                        modulePath = _a.sent();
                        if (modulePath) {
                            pathWithinModule = ref.substring(moduleName.length + 1);
                            return [2 /*return*/, joinPath(modulePath, pathWithinModule)];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, documentContext.resolveReference(ref, documentUri)];
                    case 3: return [2 /*return*/, documentContext.resolveReference(ref, documentUri)];
                }
            });
        });
    };
    CSSNavigation.prototype.resolvePathToModule = function (_moduleName, documentFolderUri, rootFolderUri) {
        return __awaiter$2(this, void 0, void 0, function () {
            var packPath;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        packPath = joinPath(documentFolderUri, 'node_modules', _moduleName, 'package.json');
                        return [4 /*yield*/, this.fileExists(packPath)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, dirname(packPath)];
                        }
                        else if (rootFolderUri && documentFolderUri.startsWith(rootFolderUri) && (documentFolderUri.length !== rootFolderUri.length)) {
                            return [2 /*return*/, this.resolvePathToModule(_moduleName, dirname(documentFolderUri), rootFolderUri)];
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    CSSNavigation.prototype.fileExists = function (uri) {
        return __awaiter$2(this, void 0, void 0, function () {
            var stat;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.fileSystemProvider) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fileSystemProvider.stat(uri)];
                    case 2:
                        stat = _a.sent();
                        if (stat.type === FileType.Unknown && stat.size === -1) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CSSNavigation;
}());
function getColorInformation(node, document) {
    var color = getColorValue(node);
    if (color) {
        var range = getRange(node, document);
        return { color: color, range: range };
    }
    return null;
}
function getRange(node, document) {
    return Range.create(document.positionAt(node.offset), document.positionAt(node.end));
}
function getHighlightKind(node) {
    if (node.type === NodeType.Selector) {
        return DocumentHighlightKind.Write;
    }
    if (node instanceof Identifier) {
        if (node.parent && node.parent instanceof Property) {
            if (node.isCustomProperty) {
                return DocumentHighlightKind.Write;
            }
        }
    }
    if (node.parent) {
        switch (node.parent.type) {
            case NodeType.FunctionDeclaration:
            case NodeType.MixinDeclaration:
            case NodeType.Keyframe:
            case NodeType.VariableDeclaration:
            case NodeType.FunctionParameter:
                return DocumentHighlightKind.Write;
        }
    }
    return DocumentHighlightKind.Read;
}
function toTwoDigitHex(n) {
    var r = n.toString(16);
    return r.length !== 2 ? '0' + r : r;
}
function getModuleNameFromPath(path) {
    // If a scoped module (starts with @) then get up until second instance of '/', otherwise get until first instance of '/'
    if (path[0] === '@') {
        return path.substring(0, path.indexOf('/', path.indexOf('/') + 1));
    }
    return path.substring(0, path.indexOf('/'));
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var localize$5 = loadMessageBundle();
var Warning = Level.Warning;
var Error$1 = Level.Error;
var Ignore = Level.Ignore;
var Rule = /** @class */ (function () {
    function Rule(id, message, defaultValue) {
        this.id = id;
        this.message = message;
        this.defaultValue = defaultValue;
        // nothing to do
    }
    return Rule;
}());
var Setting = /** @class */ (function () {
    function Setting(id, message, defaultValue) {
        this.id = id;
        this.message = message;
        this.defaultValue = defaultValue;
        // nothing to do
    }
    return Setting;
}());
var Rules = {
    AllVendorPrefixes: new Rule('compatibleVendorPrefixes', localize$5('rule.vendorprefixes.all', "When using a vendor-specific prefix make sure to also include all other vendor-specific properties"), Ignore),
    IncludeStandardPropertyWhenUsingVendorPrefix: new Rule('vendorPrefix', localize$5('rule.standardvendorprefix.all', "When using a vendor-specific prefix also include the standard property"), Warning),
    DuplicateDeclarations: new Rule('duplicateProperties', localize$5('rule.duplicateDeclarations', "Do not use duplicate style definitions"), Ignore),
    EmptyRuleSet: new Rule('emptyRules', localize$5('rule.emptyRuleSets', "Do not use empty rulesets"), Warning),
    ImportStatemement: new Rule('importStatement', localize$5('rule.importDirective', "Import statements do not load in parallel"), Ignore),
    BewareOfBoxModelSize: new Rule('boxModel', localize$5('rule.bewareOfBoxModelSize', "Do not use width or height when using padding or border"), Ignore),
    UniversalSelector: new Rule('universalSelector', localize$5('rule.universalSelector', "The universal selector (*) is known to be slow"), Ignore),
    ZeroWithUnit: new Rule('zeroUnits', localize$5('rule.zeroWidthUnit', "No unit for zero needed"), Ignore),
    RequiredPropertiesForFontFace: new Rule('fontFaceProperties', localize$5('rule.fontFaceProperties', "@font-face rule must define 'src' and 'font-family' properties"), Warning),
    HexColorLength: new Rule('hexColorLength', localize$5('rule.hexColor', "Hex colors must consist of three, four, six or eight hex numbers"), Error$1),
    ArgsInColorFunction: new Rule('argumentsInColorFunction', localize$5('rule.colorFunction', "Invalid number of parameters"), Error$1),
    UnknownProperty: new Rule('unknownProperties', localize$5('rule.unknownProperty', "Unknown property."), Warning),
    UnknownAtRules: new Rule('unknownAtRules', localize$5('rule.unknownAtRules', "Unknown at-rule."), Warning),
    IEStarHack: new Rule('ieHack', localize$5('rule.ieHack', "IE hacks are only necessary when supporting IE7 and older"), Ignore),
    UnknownVendorSpecificProperty: new Rule('unknownVendorSpecificProperties', localize$5('rule.unknownVendorSpecificProperty', "Unknown vendor specific property."), Ignore),
    PropertyIgnoredDueToDisplay: new Rule('propertyIgnoredDueToDisplay', localize$5('rule.propertyIgnoredDueToDisplay', "Property is ignored due to the display."), Warning),
    AvoidImportant: new Rule('important', localize$5('rule.avoidImportant', "Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored."), Ignore),
    AvoidFloat: new Rule('float', localize$5('rule.avoidFloat', "Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes."), Ignore),
    AvoidIdSelector: new Rule('idSelector', localize$5('rule.avoidIdSelector', "Selectors should not contain IDs because these rules are too tightly coupled with the HTML."), Ignore),
};
var Settings = {
    ValidProperties: new Setting('validProperties', localize$5('rule.validProperties', "A list of properties that are not validated against the `unknownProperties` rule."), [])
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var Element$1 = /** @class */ (function () {
    function Element(decl) {
        this.fullPropertyName = decl.getFullPropertyName().toLowerCase();
        this.node = decl;
    }
    return Element;
}());
function setSide(model, side, value, property) {
    var state = model[side];
    state.value = value;
    if (value) {
        if (!includes(state.properties, property)) {
            state.properties.push(property);
        }
    }
}
function setAllSides(model, value, property) {
    setSide(model, 'top', value, property);
    setSide(model, 'right', value, property);
    setSide(model, 'bottom', value, property);
    setSide(model, 'left', value, property);
}
function updateModelWithValue(model, side, value, property) {
    if (side === 'top' || side === 'right' ||
        side === 'bottom' || side === 'left') {
        setSide(model, side, value, property);
    }
    else {
        setAllSides(model, value, property);
    }
}
function updateModelWithList(model, values, property) {
    switch (values.length) {
        case 1:
            updateModelWithValue(model, undefined, values[0], property);
            break;
        case 2:
            updateModelWithValue(model, 'top', values[0], property);
            updateModelWithValue(model, 'bottom', values[0], property);
            updateModelWithValue(model, 'right', values[1], property);
            updateModelWithValue(model, 'left', values[1], property);
            break;
        case 3:
            updateModelWithValue(model, 'top', values[0], property);
            updateModelWithValue(model, 'right', values[1], property);
            updateModelWithValue(model, 'left', values[1], property);
            updateModelWithValue(model, 'bottom', values[2], property);
            break;
        case 4:
            updateModelWithValue(model, 'top', values[0], property);
            updateModelWithValue(model, 'right', values[1], property);
            updateModelWithValue(model, 'bottom', values[2], property);
            updateModelWithValue(model, 'left', values[3], property);
            break;
    }
}
function matches(value, candidates) {
    for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
        var candidate = candidates_1[_i];
        if (value.matches(candidate)) {
            return true;
        }
    }
    return false;
}
/**
 * @param allowsKeywords whether the initial value of property is zero, so keywords `initial` and `unset` count as zero
 * @return `true` if this node represents a non-zero border; otherwise, `false`
 */
function checkLineWidth(value, allowsKeywords) {
    if (allowsKeywords === void 0) { allowsKeywords = true; }
    if (allowsKeywords && matches(value, ['initial', 'unset'])) {
        return false;
    }
    // a <length> is a value and a unit
    // so use `parseFloat` to strip the unit
    return parseFloat(value.getText()) !== 0;
}
function checkLineWidthList(nodes, allowsKeywords) {
    if (allowsKeywords === void 0) { allowsKeywords = true; }
    return nodes.map(function (node) { return checkLineWidth(node, allowsKeywords); });
}
/**
 * @param allowsKeywords whether keywords `initial` and `unset` count as zero
 * @return `true` if this node represents a non-zero border; otherwise, `false`
 */
function checkLineStyle(valueNode, allowsKeywords) {
    if (allowsKeywords === void 0) { allowsKeywords = true; }
    if (matches(valueNode, ['none', 'hidden'])) {
        return false;
    }
    if (allowsKeywords && matches(valueNode, ['initial', 'unset'])) {
        return false;
    }
    return true;
}
function checkLineStyleList(nodes, allowsKeywords) {
    if (allowsKeywords === void 0) { allowsKeywords = true; }
    return nodes.map(function (node) { return checkLineStyle(node, allowsKeywords); });
}
function checkBorderShorthand(node) {
    var children = node.getChildren();
    // the only child can be a keyword, a <line-width>, or a <line-style>
    // if either check returns false, the result is no border
    if (children.length === 1) {
        var value = children[0];
        return checkLineWidth(value) && checkLineStyle(value);
    }
    // multiple children can't contain keywords
    // if any child means no border, the result is no border
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        var value = child;
        if (!checkLineWidth(value, /* allowsKeywords: */ false) ||
            !checkLineStyle(value, /* allowsKeywords: */ false)) {
            return false;
        }
    }
    return true;
}
function calculateBoxModel(propertyTable) {
    var model = {
        top: { value: false, properties: [] },
        right: { value: false, properties: [] },
        bottom: { value: false, properties: [] },
        left: { value: false, properties: [] },
    };
    for (var _i = 0, propertyTable_1 = propertyTable; _i < propertyTable_1.length; _i++) {
        var property = propertyTable_1[_i];
        var value = property.node.value;
        if (typeof value === 'undefined') {
            continue;
        }
        switch (property.fullPropertyName) {
            case 'box-sizing':
                // has `box-sizing`, bail out
                return {
                    top: { value: false, properties: [] },
                    right: { value: false, properties: [] },
                    bottom: { value: false, properties: [] },
                    left: { value: false, properties: [] },
                };
            case 'width':
                model.width = property;
                break;
            case 'height':
                model.height = property;
                break;
            default:
                var segments = property.fullPropertyName.split('-');
                switch (segments[0]) {
                    case 'border':
                        switch (segments[1]) {
                            case undefined:
                            case 'top':
                            case 'right':
                            case 'bottom':
                            case 'left':
                                switch (segments[2]) {
                                    case undefined:
                                        updateModelWithValue(model, segments[1], checkBorderShorthand(value), property);
                                        break;
                                    case 'width':
                                        // the initial value of `border-width` is `medium`, not zero
                                        updateModelWithValue(model, segments[1], checkLineWidth(value, false), property);
                                        break;
                                    case 'style':
                                        // the initial value of `border-style` is `none`
                                        updateModelWithValue(model, segments[1], checkLineStyle(value, true), property);
                                        break;
                                }
                                break;
                            case 'width':
                                // the initial value of `border-width` is `medium`, not zero
                                updateModelWithList(model, checkLineWidthList(value.getChildren(), false), property);
                                break;
                            case 'style':
                                // the initial value of `border-style` is `none`
                                updateModelWithList(model, checkLineStyleList(value.getChildren(), true), property);
                                break;
                        }
                        break;
                    case 'padding':
                        if (segments.length === 1) {
                            // the initial value of `padding` is zero
                            updateModelWithList(model, checkLineWidthList(value.getChildren(), true), property);
                        }
                        else {
                            // the initial value of `padding` is zero
                            updateModelWithValue(model, segments[1], checkLineWidth(value, true), property);
                        }
                        break;
                }
                break;
        }
    }
    return model;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var localize$6 = loadMessageBundle();
var NodesByRootMap = /** @class */ (function () {
    function NodesByRootMap() {
        this.data = {};
    }
    NodesByRootMap.prototype.add = function (root, name, node) {
        var entry = this.data[root];
        if (!entry) {
            entry = { nodes: [], names: [] };
            this.data[root] = entry;
        }
        entry.names.push(name);
        if (node) {
            entry.nodes.push(node);
        }
    };
    return NodesByRootMap;
}());
var LintVisitor = /** @class */ (function () {
    function LintVisitor(document, settings, cssDataManager) {
        var _this = this;
        this.cssDataManager = cssDataManager;
        this.warnings = [];
        this.settings = settings;
        this.documentText = document.getText();
        this.keyframes = new NodesByRootMap();
        this.validProperties = {};
        var properties = settings.getSetting(Settings.ValidProperties);
        if (Array.isArray(properties)) {
            properties.forEach(function (p) {
                if (typeof p === 'string') {
                    var name = p.trim().toLowerCase();
                    if (name.length) {
                        _this.validProperties[name] = true;
                    }
                }
            });
        }
    }
    LintVisitor.entries = function (node, document, settings, cssDataManager, entryFilter) {
        var visitor = new LintVisitor(document, settings, cssDataManager);
        node.acceptVisitor(visitor);
        visitor.completeValidations();
        return visitor.getEntries(entryFilter);
    };
    LintVisitor.prototype.isValidPropertyDeclaration = function (element) {
        var propertyName = element.fullPropertyName;
        return this.validProperties[propertyName];
    };
    LintVisitor.prototype.fetch = function (input, s) {
        var elements = [];
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var curr = input_1[_i];
            if (curr.fullPropertyName === s) {
                elements.push(curr);
            }
        }
        return elements;
    };
    LintVisitor.prototype.fetchWithValue = function (input, s, v) {
        var elements = [];
        for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
            var inputElement = input_2[_i];
            if (inputElement.fullPropertyName === s) {
                var expression = inputElement.node.getValue();
                if (expression && this.findValueInExpression(expression, v)) {
                    elements.push(inputElement);
                }
            }
        }
        return elements;
    };
    LintVisitor.prototype.findValueInExpression = function (expression, v) {
        var found = false;
        expression.accept(function (node) {
            if (node.type === NodeType.Identifier && node.matches(v)) {
                found = true;
            }
            return !found;
        });
        return found;
    };
    LintVisitor.prototype.getEntries = function (filter) {
        if (filter === void 0) { filter = (Level.Warning | Level.Error); }
        return this.warnings.filter(function (entry) {
            return (entry.getLevel() & filter) !== 0;
        });
    };
    LintVisitor.prototype.addEntry = function (node, rule, details) {
        var entry = new Marker(node, rule, this.settings.getRule(rule), details);
        this.warnings.push(entry);
    };
    LintVisitor.prototype.getMissingNames = function (expected, actual) {
        var expectedClone = expected.slice(0); // clone
        for (var i = 0; i < actual.length; i++) {
            var k = expectedClone.indexOf(actual[i]);
            if (k !== -1) {
                expectedClone[k] = null;
            }
        }
        var result = null;
        for (var i = 0; i < expectedClone.length; i++) {
            var curr = expectedClone[i];
            if (curr) {
                if (result === null) {
                    result = localize$6('namelist.single', "'{0}'", curr);
                }
                else {
                    result = localize$6('namelist.concatenated', "{0}, '{1}'", result, curr);
                }
            }
        }
        return result;
    };
    LintVisitor.prototype.visitNode = function (node) {
        switch (node.type) {
            case NodeType.UnknownAtRule:
                return this.visitUnknownAtRule(node);
            case NodeType.Keyframe:
                return this.visitKeyframe(node);
            case NodeType.FontFace:
                return this.visitFontFace(node);
            case NodeType.Ruleset:
                return this.visitRuleSet(node);
            case NodeType.SimpleSelector:
                return this.visitSimpleSelector(node);
            case NodeType.Function:
                return this.visitFunction(node);
            case NodeType.NumericValue:
                return this.visitNumericValue(node);
            case NodeType.Import:
                return this.visitImport(node);
            case NodeType.HexColorValue:
                return this.visitHexColorValue(node);
            case NodeType.Prio:
                return this.visitPrio(node);
            case NodeType.IdentifierSelector:
                return this.visitIdentifierSelector(node);
        }
        return true;
    };
    LintVisitor.prototype.completeValidations = function () {
        this.validateKeyframes();
    };
    LintVisitor.prototype.visitUnknownAtRule = function (node) {
        var atRuleName = node.getChild(0);
        if (!atRuleName) {
            return false;
        }
        var atDirective = this.cssDataManager.getAtDirective(atRuleName.getText());
        if (atDirective) {
            return false;
        }
        this.addEntry(atRuleName, Rules.UnknownAtRules, "Unknown at rule " + atRuleName.getText());
        return true;
    };
    LintVisitor.prototype.visitKeyframe = function (node) {
        var keyword = node.getKeyword();
        if (!keyword) {
            return false;
        }
        var text = keyword.getText();
        this.keyframes.add(node.getName(), text, (text !== '@keyframes') ? keyword : null);
        return true;
    };
    LintVisitor.prototype.validateKeyframes = function () {
        // @keyframe and it's vendor specific alternatives
        // @keyframe should be included
        var expected = ['@-webkit-keyframes', '@-moz-keyframes', '@-o-keyframes'];
        for (var name in this.keyframes.data) {
            var actual = this.keyframes.data[name].names;
            var needsStandard = (actual.indexOf('@keyframes') === -1);
            if (!needsStandard && actual.length === 1) {
                continue; // only the non-vendor specific keyword is used, that's fine, no warning
            }
            var missingVendorSpecific = this.getMissingNames(expected, actual);
            if (missingVendorSpecific || needsStandard) {
                for (var _i = 0, _a = this.keyframes.data[name].nodes; _i < _a.length; _i++) {
                    var node = _a[_i];
                    if (needsStandard) {
                        var message = localize$6('keyframes.standardrule.missing', "Always define standard rule '@keyframes' when defining keyframes.");
                        this.addEntry(node, Rules.IncludeStandardPropertyWhenUsingVendorPrefix, message);
                    }
                    if (missingVendorSpecific) {
                        var message = localize$6('keyframes.vendorspecific.missing', "Always include all vendor specific rules: Missing: {0}", missingVendorSpecific);
                        this.addEntry(node, Rules.AllVendorPrefixes, message);
                    }
                }
            }
        }
        return true;
    };
    LintVisitor.prototype.visitSimpleSelector = function (node) {
        /////////////////////////////////////////////////////////////
        //	Lint - The universal selector (*) is known to be slow.
        /////////////////////////////////////////////////////////////
        var firstChar = this.documentText.charAt(node.offset);
        if (node.length === 1 && firstChar === '*') {
            this.addEntry(node, Rules.UniversalSelector);
        }
        return true;
    };
    LintVisitor.prototype.visitIdentifierSelector = function (node) {
        /////////////////////////////////////////////////////////////
        //	Lint - Avoid id selectors
        /////////////////////////////////////////////////////////////
        this.addEntry(node, Rules.AvoidIdSelector);
        return true;
    };
    LintVisitor.prototype.visitImport = function (node) {
        /////////////////////////////////////////////////////////////
        //	Lint - Import statements shouldn't be used, because they aren't offering parallel downloads.
        /////////////////////////////////////////////////////////////
        this.addEntry(node, Rules.ImportStatemement);
        return true;
    };
    LintVisitor.prototype.visitRuleSet = function (node) {
        /////////////////////////////////////////////////////////////
        //	Lint - Don't use empty rulesets.
        /////////////////////////////////////////////////////////////
        var declarations = node.getDeclarations();
        if (!declarations) {
            // syntax error
            return false;
        }
        if (!declarations.hasChildren()) {
            this.addEntry(node.getSelectors(), Rules.EmptyRuleSet);
        }
        var propertyTable = [];
        for (var _i = 0, _a = declarations.getChildren(); _i < _a.length; _i++) {
            var element = _a[_i];
            if (element instanceof Declaration) {
                propertyTable.push(new Element$1(element));
            }
        }
        /////////////////////////////////////////////////////////////
        // the rule warns when it finds:
        // width being used with border, border-left, border-right, padding, padding-left, or padding-right
        // height being used with border, border-top, border-bottom, padding, padding-top, or padding-bottom
        // No error when box-sizing property is specified, as it assumes the user knows what he's doing.
        // see https://github.com/CSSLint/csslint/wiki/Beware-of-box-model-size
        /////////////////////////////////////////////////////////////
        var boxModel = calculateBoxModel(propertyTable);
        if (boxModel.width) {
            var properties = [];
            if (boxModel.right.value) {
                properties = union(properties, boxModel.right.properties);
            }
            if (boxModel.left.value) {
                properties = union(properties, boxModel.left.properties);
            }
            if (properties.length !== 0) {
                for (var _b = 0, properties_1 = properties; _b < properties_1.length; _b++) {
                    var item = properties_1[_b];
                    this.addEntry(item.node, Rules.BewareOfBoxModelSize);
                }
                this.addEntry(boxModel.width.node, Rules.BewareOfBoxModelSize);
            }
        }
        if (boxModel.height) {
            var properties = [];
            if (boxModel.top.value) {
                properties = union(properties, boxModel.top.properties);
            }
            if (boxModel.bottom.value) {
                properties = union(properties, boxModel.bottom.properties);
            }
            if (properties.length !== 0) {
                for (var _c = 0, properties_2 = properties; _c < properties_2.length; _c++) {
                    var item = properties_2[_c];
                    this.addEntry(item.node, Rules.BewareOfBoxModelSize);
                }
                this.addEntry(boxModel.height.node, Rules.BewareOfBoxModelSize);
            }
        }
        /////////////////////////////////////////////////////////////
        //	Properties ignored due to display
        /////////////////////////////////////////////////////////////
        // With 'display: inline-block', 'float' has no effect
        var displayElems = this.fetchWithValue(propertyTable, 'display', 'inline-block');
        if (displayElems.length > 0) {
            var elem = this.fetch(propertyTable, 'float');
            for (var index = 0; index < elem.length; index++) {
                var node_1 = elem[index].node;
                var value = node_1.getValue();
                if (value && !value.matches('none')) {
                    this.addEntry(node_1, Rules.PropertyIgnoredDueToDisplay, localize$6('rule.propertyIgnoredDueToDisplayInlineBlock', "inline-block is ignored due to the float. If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'"));
                }
            }
        }
        // With 'display: block', 'vertical-align' has no effect
        displayElems = this.fetchWithValue(propertyTable, 'display', 'block');
        if (displayElems.length > 0) {
            var elem = this.fetch(propertyTable, 'vertical-align');
            for (var index = 0; index < elem.length; index++) {
                this.addEntry(elem[index].node, Rules.PropertyIgnoredDueToDisplay, localize$6('rule.propertyIgnoredDueToDisplayBlock', "Property is ignored due to the display. With 'display: block', vertical-align should not be used."));
            }
        }
        /////////////////////////////////////////////////////////////
        //	Avoid 'float'
        /////////////////////////////////////////////////////////////
        var elements = this.fetch(propertyTable, 'float');
        for (var index = 0; index < elements.length; index++) {
            var element = elements[index];
            if (!this.isValidPropertyDeclaration(element)) {
                this.addEntry(element.node, Rules.AvoidFloat);
            }
        }
        /////////////////////////////////////////////////////////////
        //	Don't use duplicate declarations.
        /////////////////////////////////////////////////////////////
        for (var i = 0; i < propertyTable.length; i++) {
            var element = propertyTable[i];
            if (element.fullPropertyName !== 'background' && !this.validProperties[element.fullPropertyName]) {
                var value = element.node.getValue();
                if (value && this.documentText.charAt(value.offset) !== '-') {
                    var elements_1 = this.fetch(propertyTable, element.fullPropertyName);
                    if (elements_1.length > 1) {
                        for (var k = 0; k < elements_1.length; k++) {
                            var value_1 = elements_1[k].node.getValue();
                            if (value_1 && this.documentText.charAt(value_1.offset) !== '-' && elements_1[k] !== element) {
                                this.addEntry(element.node, Rules.DuplicateDeclarations);
                            }
                        }
                    }
                }
            }
        }
        /////////////////////////////////////////////////////////////
        //	Unknown propery & When using a vendor-prefixed gradient, make sure to use them all.
        /////////////////////////////////////////////////////////////
        var isExportBlock = node.getSelectors().matches(":export");
        if (!isExportBlock) {
            var propertiesBySuffix = new NodesByRootMap();
            var containsUnknowns = false;
            for (var _d = 0, propertyTable_1 = propertyTable; _d < propertyTable_1.length; _d++) {
                var element = propertyTable_1[_d];
                var decl = element.node;
                if (this.isCSSDeclaration(decl)) {
                    var name = element.fullPropertyName;
                    var firstChar = name.charAt(0);
                    if (firstChar === '-') {
                        if (name.charAt(1) !== '-') { // avoid css variables
                            if (!this.cssDataManager.isKnownProperty(name) && !this.validProperties[name]) {
                                this.addEntry(decl.getProperty(), Rules.UnknownVendorSpecificProperty);
                            }
                            var nonPrefixedName = decl.getNonPrefixedPropertyName();
                            propertiesBySuffix.add(nonPrefixedName, name, decl.getProperty());
                        }
                    }
                    else {
                        var fullName = name;
                        if (firstChar === '*' || firstChar === '_') {
                            this.addEntry(decl.getProperty(), Rules.IEStarHack);
                            name = name.substr(1);
                        }
                        // _property and *property might be contributed via custom data
                        if (!this.cssDataManager.isKnownProperty(fullName) && !this.cssDataManager.isKnownProperty(name)) {
                            if (!this.validProperties[name]) {
                                this.addEntry(decl.getProperty(), Rules.UnknownProperty, localize$6('property.unknownproperty.detailed', "Unknown property: '{0}'", decl.getFullPropertyName()));
                            }
                        }
                        propertiesBySuffix.add(name, name, null); // don't pass the node as we don't show errors on the standard
                    }
                }
                else {
                    containsUnknowns = true;
                }
            }
            if (!containsUnknowns) { // don't perform this test if there are
                for (var suffix in propertiesBySuffix.data) {
                    var entry = propertiesBySuffix.data[suffix];
                    var actual = entry.names;
                    var needsStandard = this.cssDataManager.isStandardProperty(suffix) && (actual.indexOf(suffix) === -1);
                    if (!needsStandard && actual.length === 1) {
                        continue; // only the non-vendor specific rule is used, that's fine, no warning
                    }
                    var expected = [];
                    for (var i = 0, len = LintVisitor.prefixes.length; i < len; i++) {
                        var prefix = LintVisitor.prefixes[i];
                        if (this.cssDataManager.isStandardProperty(prefix + suffix)) {
                            expected.push(prefix + suffix);
                        }
                    }
                    var missingVendorSpecific = this.getMissingNames(expected, actual);
                    if (missingVendorSpecific || needsStandard) {
                        for (var _e = 0, _f = entry.nodes; _e < _f.length; _e++) {
                            var node_2 = _f[_e];
                            if (needsStandard) {
                                var message = localize$6('property.standard.missing', "Also define the standard property '{0}' for compatibility", suffix);
                                this.addEntry(node_2, Rules.IncludeStandardPropertyWhenUsingVendorPrefix, message);
                            }
                            if (missingVendorSpecific) {
                                var message = localize$6('property.vendorspecific.missing', "Always include all vendor specific properties: Missing: {0}", missingVendorSpecific);
                                this.addEntry(node_2, Rules.AllVendorPrefixes, message);
                            }
                        }
                    }
                }
            }
        }
        return true;
    };
    LintVisitor.prototype.visitPrio = function (node) {
        /////////////////////////////////////////////////////////////
        //	Don't use !important
        /////////////////////////////////////////////////////////////
        this.addEntry(node, Rules.AvoidImportant);
        return true;
    };
    LintVisitor.prototype.visitNumericValue = function (node) {
        /////////////////////////////////////////////////////////////
        //	0 has no following unit
        /////////////////////////////////////////////////////////////
        var funcDecl = node.findParent(NodeType.Function);
        if (funcDecl && funcDecl.getName() === 'calc') {
            return true;
        }
        var decl = node.findParent(NodeType.Declaration);
        if (decl) {
            var declValue = decl.getValue();
            if (declValue) {
                var value = node.getValue();
                if (!value.unit || units.length.indexOf(value.unit.toLowerCase()) === -1) {
                    return true;
                }
                if (parseFloat(value.value) === 0.0 && !!value.unit && !this.validProperties[decl.getFullPropertyName()]) {
                    this.addEntry(node, Rules.ZeroWithUnit);
                }
            }
        }
        return true;
    };
    LintVisitor.prototype.visitFontFace = function (node) {
        var declarations = node.getDeclarations();
        if (!declarations) {
            // syntax error
            return false;
        }
        var definesSrc = false, definesFontFamily = false;
        var containsUnknowns = false;
        for (var _i = 0, _a = declarations.getChildren(); _i < _a.length; _i++) {
            var node_3 = _a[_i];
            if (this.isCSSDeclaration(node_3)) {
                var name = node_3.getProperty().getName().toLowerCase();
                if (name === 'src') {
                    definesSrc = true;
                }
                if (name === 'font-family') {
                    definesFontFamily = true;
                }
            }
            else {
                containsUnknowns = true;
            }
        }
        if (!containsUnknowns && (!definesSrc || !definesFontFamily)) {
            this.addEntry(node, Rules.RequiredPropertiesForFontFace);
        }
        return true;
    };
    LintVisitor.prototype.isCSSDeclaration = function (node) {
        if (node instanceof Declaration) {
            if (!node.getValue()) {
                return false;
            }
            var property = node.getProperty();
            if (!property) {
                return false;
            }
            var identifier = property.getIdentifier();
            if (!identifier || identifier.containsInterpolation()) {
                return false;
            }
            return true;
        }
        return false;
    };
    LintVisitor.prototype.visitHexColorValue = function (node) {
        // Rule: #eeff0011 or #eeff00 or #ef01 or #ef0
        var length = node.length;
        if (length !== 9 && length !== 7 && length !== 5 && length !== 4) {
            this.addEntry(node, Rules.HexColorLength);
        }
        return false;
    };
    LintVisitor.prototype.visitFunction = function (node) {
        var fnName = node.getName().toLowerCase();
        var expectedAttrCount = -1;
        var actualAttrCount = 0;
        switch (fnName) {
            case 'rgb(':
            case 'hsl(':
                expectedAttrCount = 3;
                break;
            case 'rgba(':
            case 'hsla(':
                expectedAttrCount = 4;
                break;
        }
        if (expectedAttrCount !== -1) {
            node.getArguments().accept(function (n) {
                if (n instanceof BinaryExpression) {
                    actualAttrCount += 1;
                    return false;
                }
                return true;
            });
            if (actualAttrCount !== expectedAttrCount) {
                this.addEntry(node, Rules.ArgsInColorFunction);
            }
        }
        return true;
    };
    LintVisitor.prefixes = [
        '-ms-', '-moz-', '-o-', '-webkit-', // Quite common
        //		'-xv-', '-atsc-', '-wap-', '-khtml-', 'mso-', 'prince-', '-ah-', '-hp-', '-ro-', '-rim-', '-tc-' // Quite un-common
    ];
    return LintVisitor;
}());

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _FSL$1 = '/'.charCodeAt(0);
var _NWL$1 = '\n'.charCodeAt(0);
var _CAR$1 = '\r'.charCodeAt(0);
var _LFD$1 = '\f'.charCodeAt(0);
var _DLR$1 = '$'.charCodeAt(0);
var _HSH$1 = '#'.charCodeAt(0);
var _CUL$1 = '{'.charCodeAt(0);
var _EQS$1 = '='.charCodeAt(0);
var _BNG$1 = '!'.charCodeAt(0);
var _LAN$1 = '<'.charCodeAt(0);
var _RAN$1 = '>'.charCodeAt(0);
var _DOT$1 = '.'.charCodeAt(0);
var customTokenValue = TokenType.CustomToken;
var VariableName = customTokenValue++;
var InterpolationFunction = customTokenValue++;
var Default = customTokenValue++;
var EqualsOperator = customTokenValue++;
var NotEqualsOperator = customTokenValue++;
var GreaterEqualsOperator = customTokenValue++;
var SmallerEqualsOperator = customTokenValue++;
var Ellipsis = customTokenValue++;
var Module$1 = customTokenValue++;
var SCSSScanner = /** @class */ (function (_super) {
    __extends$3(SCSSScanner, _super);
    function SCSSScanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SCSSScanner.prototype.scanNext = function (offset) {
        // scss variable
        if (this.stream.advanceIfChar(_DLR$1)) {
            var content = ['$'];
            if (this.ident(content)) {
                return this.finishToken(offset, VariableName, content.join(''));
            }
            else {
                this.stream.goBackTo(offset);
            }
        }
        // scss: interpolation function #{..})
        if (this.stream.advanceIfChars([_HSH$1, _CUL$1])) {
            return this.finishToken(offset, InterpolationFunction);
        }
        // operator ==
        if (this.stream.advanceIfChars([_EQS$1, _EQS$1])) {
            return this.finishToken(offset, EqualsOperator);
        }
        // operator !=
        if (this.stream.advanceIfChars([_BNG$1, _EQS$1])) {
            return this.finishToken(offset, NotEqualsOperator);
        }
        // operators <, <=
        if (this.stream.advanceIfChar(_LAN$1)) {
            if (this.stream.advanceIfChar(_EQS$1)) {
                return this.finishToken(offset, SmallerEqualsOperator);
            }
            return this.finishToken(offset, TokenType.Delim);
        }
        // ooperators >, >=
        if (this.stream.advanceIfChar(_RAN$1)) {
            if (this.stream.advanceIfChar(_EQS$1)) {
                return this.finishToken(offset, GreaterEqualsOperator);
            }
            return this.finishToken(offset, TokenType.Delim);
        }
        // ellipis
        if (this.stream.advanceIfChars([_DOT$1, _DOT$1, _DOT$1])) {
            return this.finishToken(offset, Ellipsis);
        }
        return _super.prototype.scanNext.call(this, offset);
    };
    SCSSScanner.prototype.comment = function () {
        if (_super.prototype.comment.call(this)) {
            return true;
        }
        if (!this.inURL && this.stream.advanceIfChars([_FSL$1, _FSL$1])) {
            this.stream.advanceWhileChar(function (ch) {
                switch (ch) {
                    case _NWL$1:
                    case _CAR$1:
                    case _LFD$1:
                        return false;
                    default:
                        return true;
                }
            });
            return true;
        }
        else {
            return false;
        }
    };
    return SCSSScanner;
}(Scanner));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var localize$7 = loadMessageBundle();
var SCSSIssueType = /** @class */ (function () {
    function SCSSIssueType(id, message) {
        this.id = id;
        this.message = message;
    }
    return SCSSIssueType;
}());
var SCSSParseError = {
    FromExpected: new SCSSIssueType('scss-fromexpected', localize$7('expected.from', "'from' expected")),
    ThroughOrToExpected: new SCSSIssueType('scss-throughexpected', localize$7('expected.through', "'through' or 'to' expected")),
    InExpected: new SCSSIssueType('scss-fromexpected', localize$7('expected.in', "'in' expected")),
};

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <summary>
/// A parser for scss
/// http://sass-lang.com/documentation/file.SASS_REFERENCE.html
/// </summary>
var SCSSParser = /** @class */ (function (_super) {
    __extends$4(SCSSParser, _super);
    function SCSSParser() {
        return _super.call(this, new SCSSScanner()) || this;
    }
    SCSSParser.prototype._parseStylesheetStatement = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        if (this.peek(TokenType.AtKeyword)) {
            return this._parseWarnAndDebug() // @warn, @debug and @error statements
                || this._parseControlStatement() // @if, @while, @for, @each
                || this._parseMixinDeclaration() // @mixin
                || this._parseMixinContent() // @content
                || this._parseMixinReference() // @include
                || this._parseFunctionDeclaration() // @function
                || this._parseForward() // @forward
                || this._parseUse() // @use
                || this._parseRuleset(isNested) // @at-rule
                || _super.prototype._parseStylesheetAtStatement.call(this, isNested);
        }
        return this._parseRuleset(true) || this._parseVariableDeclaration();
    };
    SCSSParser.prototype._parseImport = function () {
        if (!this.peekKeyword('@import')) {
            return null;
        }
        var node = this.create(Import);
        this.consumeToken();
        if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
            return this.finish(node, ParseError.URIOrStringExpected);
        }
        while (this.accept(TokenType.Comma)) {
            if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
                return this.finish(node, ParseError.URIOrStringExpected);
            }
        }
        if (!this.peek(TokenType.SemiColon) && !this.peek(TokenType.EOF)) {
            node.setMedialist(this._parseMediaQueryList());
        }
        return this.finish(node);
    };
    // scss variables: $font-size: 12px;
    SCSSParser.prototype._parseVariableDeclaration = function (panic) {
        if (panic === void 0) { panic = []; }
        if (!this.peek(VariableName)) {
            return null;
        }
        var node = this.create(VariableDeclaration);
        if (!node.setVariable(this._parseVariable())) {
            return null;
        }
        if (!this.accept(TokenType.Colon)) {
            return this.finish(node, ParseError.ColonExpected);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        if (!node.setValue(this._parseExpr())) {
            return this.finish(node, ParseError.VariableValueExpected, [], panic);
        }
        while (this.peek(TokenType.Exclamation)) {
            if (node.addChild(this._tryParsePrio())) ;
            else {
                this.consumeToken();
                if (!this.peekRegExp(TokenType.Ident, /^(default|global)$/)) {
                    return this.finish(node, ParseError.UnknownKeyword);
                }
                this.consumeToken();
            }
        }
        if (this.peek(TokenType.SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseMediaContentStart = function () {
        return this._parseInterpolation();
    };
    SCSSParser.prototype._parseMediaFeatureName = function () {
        return this._parseModuleMember()
            || this._parseFunction() // function before ident
            || this._parseIdent()
            || this._parseVariable();
    };
    SCSSParser.prototype._parseKeyframeSelector = function () {
        return this._tryParseKeyframeSelector()
            || this._parseControlStatement(this._parseKeyframeSelector.bind(this))
            || this._parseVariableDeclaration()
            || this._parseMixinContent();
    };
    SCSSParser.prototype._parseVariable = function () {
        if (!this.peek(VariableName)) {
            return null;
        }
        var node = this.create(Variable);
        this.consumeToken();
        return node;
    };
    SCSSParser.prototype._parseModuleMember = function () {
        var pos = this.mark();
        var node = this.create(Module);
        if (!node.setIdentifier(this._parseIdent([ReferenceType.Module]))) {
            return null;
        }
        if (this.hasWhitespace()
            || !this.acceptDelim('.')
            || this.hasWhitespace()) {
            this.restoreAtMark(pos);
            return null;
        }
        if (!node.addChild(this._parseVariable() || this._parseFunction())) {
            return this.finish(node, ParseError.IdentifierOrVariableExpected);
        }
        return node;
    };
    SCSSParser.prototype._parseIdent = function (referenceTypes) {
        var _this = this;
        if (!this.peek(TokenType.Ident) && !this.peek(InterpolationFunction) && !this.peekDelim('-')) {
            return null;
        }
        var node = this.create(Identifier);
        node.referenceTypes = referenceTypes;
        node.isCustomProperty = this.peekRegExp(TokenType.Ident, /^--/);
        var hasContent = false;
        var indentInterpolation = function () {
            var pos = _this.mark();
            if (_this.acceptDelim('-')) {
                if (!_this.hasWhitespace()) {
                    _this.acceptDelim('-');
                }
                if (_this.hasWhitespace()) {
                    _this.restoreAtMark(pos);
                    return null;
                }
            }
            return _this._parseInterpolation();
        };
        while (this.accept(TokenType.Ident) || node.addChild(indentInterpolation()) || (hasContent && this.acceptRegexp(/^[\w-]/))) {
            hasContent = true;
            if (this.hasWhitespace()) {
                break;
            }
        }
        return hasContent ? this.finish(node) : null;
    };
    SCSSParser.prototype._parseTermExpression = function () {
        return this._parseModuleMember() ||
            this._parseVariable() ||
            this._parseSelectorCombinator() ||
            //this._tryParsePrio() ||
            _super.prototype._parseTermExpression.call(this);
    };
    SCSSParser.prototype._parseInterpolation = function () {
        if (this.peek(InterpolationFunction)) {
            var node = this.create(Interpolation);
            this.consumeToken();
            if (!node.addChild(this._parseExpr()) && !this._parseSelectorCombinator()) {
                if (this.accept(TokenType.CurlyR)) {
                    return this.finish(node);
                }
                return this.finish(node, ParseError.ExpressionExpected);
            }
            if (!this.accept(TokenType.CurlyR)) {
                return this.finish(node, ParseError.RightCurlyExpected);
            }
            return this.finish(node);
        }
        return null;
    };
    SCSSParser.prototype._parseOperator = function () {
        if (this.peek(EqualsOperator) || this.peek(NotEqualsOperator)
            || this.peek(GreaterEqualsOperator) || this.peek(SmallerEqualsOperator)
            || this.peekDelim('>') || this.peekDelim('<')
            || this.peekIdent('and') || this.peekIdent('or')
            || this.peekDelim('%')) {
            var node = this.createNode(NodeType.Operator);
            this.consumeToken();
            return this.finish(node);
        }
        return _super.prototype._parseOperator.call(this);
    };
    SCSSParser.prototype._parseUnaryOperator = function () {
        if (this.peekIdent('not')) {
            var node = this.create(Node);
            this.consumeToken();
            return this.finish(node);
        }
        return _super.prototype._parseUnaryOperator.call(this);
    };
    SCSSParser.prototype._parseRuleSetDeclaration = function () {
        if (this.peek(TokenType.AtKeyword)) {
            return this._parseKeyframe() // nested @keyframe
                || this._parseImport() // nested @import
                || this._parseMedia(true) // nested @media
                || this._parseFontFace() // nested @font-face
                || this._parseWarnAndDebug() // @warn, @debug and @error statements
                || this._parseControlStatement() // @if, @while, @for, @each
                || this._parseFunctionDeclaration() // @function
                || this._parseExtends() // @extends
                || this._parseMixinReference() // @include
                || this._parseMixinContent() // @content
                || this._parseMixinDeclaration() // nested @mixin
                || this._parseRuleset(true) // @at-rule
                || this._parseSupports(true) // @supports
                || _super.prototype._parseRuleSetDeclarationAtStatement.call(this);
        }
        return this._parseVariableDeclaration() // variable declaration
            || this._tryParseRuleset(true) // nested ruleset
            || _super.prototype._parseRuleSetDeclaration.call(this); // try css ruleset declaration as last so in the error case, the ast will contain a declaration
    };
    SCSSParser.prototype._parseDeclaration = function (stopTokens) {
        var custonProperty = this._tryParseCustomPropertyDeclaration(stopTokens);
        if (custonProperty) {
            return custonProperty;
        }
        var node = this.create(Declaration);
        if (!node.setProperty(this._parseProperty())) {
            return null;
        }
        if (!this.accept(TokenType.Colon)) {
            return this.finish(node, ParseError.ColonExpected, [TokenType.Colon], stopTokens || [TokenType.SemiColon]);
        }
        if (this.prevToken) {
            node.colonPosition = this.prevToken.offset;
        }
        var hasContent = false;
        if (node.setValue(this._parseExpr())) {
            hasContent = true;
            node.addChild(this._parsePrio());
        }
        if (this.peek(TokenType.CurlyL)) {
            node.setNestedProperties(this._parseNestedProperties());
        }
        else {
            if (!hasContent) {
                return this.finish(node, ParseError.PropertyValueExpected);
            }
        }
        if (this.peek(TokenType.SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseNestedProperties = function () {
        var node = this.create(NestedProperties);
        return this._parseBody(node, this._parseDeclaration.bind(this));
    };
    SCSSParser.prototype._parseExtends = function () {
        if (this.peekKeyword('@extend')) {
            var node = this.create(ExtendsReference);
            this.consumeToken();
            if (!node.getSelectors().addChild(this._parseSimpleSelector())) {
                return this.finish(node, ParseError.SelectorExpected);
            }
            while (this.accept(TokenType.Comma)) {
                node.getSelectors().addChild(this._parseSimpleSelector());
            }
            if (this.accept(TokenType.Exclamation)) {
                if (!this.acceptIdent('optional')) {
                    return this.finish(node, ParseError.UnknownKeyword);
                }
            }
            return this.finish(node);
        }
        return null;
    };
    SCSSParser.prototype._parseSimpleSelectorBody = function () {
        return this._parseSelectorCombinator() || this._parseSelectorPlaceholder() || _super.prototype._parseSimpleSelectorBody.call(this);
    };
    SCSSParser.prototype._parseSelectorCombinator = function () {
        if (this.peekDelim('&')) {
            var node = this.createNode(NodeType.SelectorCombinator);
            this.consumeToken();
            while (!this.hasWhitespace() && (this.acceptDelim('-') || this.accept(TokenType.Num) || this.accept(TokenType.Dimension) || node.addChild(this._parseIdent()) || this.acceptDelim('&'))) {
                //  support &-foo-1
            }
            return this.finish(node);
        }
        return null;
    };
    SCSSParser.prototype._parseSelectorPlaceholder = function () {
        if (this.peekDelim('%')) {
            var node = this.createNode(NodeType.SelectorPlaceholder);
            this.consumeToken();
            this._parseIdent();
            return this.finish(node);
        }
        else if (this.peekKeyword('@at-root')) {
            var node = this.createNode(NodeType.SelectorPlaceholder);
            this.consumeToken();
            return this.finish(node);
        }
        return null;
    };
    SCSSParser.prototype._parseElementName = function () {
        var pos = this.mark();
        var node = _super.prototype._parseElementName.call(this);
        if (node && !this.hasWhitespace() && this.peek(TokenType.ParenthesisL)) { // for #49589
            this.restoreAtMark(pos);
            return null;
        }
        return node;
    };
    SCSSParser.prototype._tryParsePseudoIdentifier = function () {
        return this._parseInterpolation() || _super.prototype._tryParsePseudoIdentifier.call(this); // for #49589
    };
    SCSSParser.prototype._parseWarnAndDebug = function () {
        if (!this.peekKeyword('@debug')
            && !this.peekKeyword('@warn')
            && !this.peekKeyword('@error')) {
            return null;
        }
        var node = this.createNode(NodeType.Debug);
        this.consumeToken(); // @debug, @warn or @error
        node.addChild(this._parseExpr()); // optional
        return this.finish(node);
    };
    SCSSParser.prototype._parseControlStatement = function (parseStatement) {
        if (parseStatement === void 0) { parseStatement = this._parseRuleSetDeclaration.bind(this); }
        if (!this.peek(TokenType.AtKeyword)) {
            return null;
        }
        return this._parseIfStatement(parseStatement) || this._parseForStatement(parseStatement)
            || this._parseEachStatement(parseStatement) || this._parseWhileStatement(parseStatement);
    };
    SCSSParser.prototype._parseIfStatement = function (parseStatement) {
        if (!this.peekKeyword('@if')) {
            return null;
        }
        return this._internalParseIfStatement(parseStatement);
    };
    SCSSParser.prototype._internalParseIfStatement = function (parseStatement) {
        var node = this.create(IfStatement);
        this.consumeToken(); // @if or if
        if (!node.setExpression(this._parseExpr(true))) {
            return this.finish(node, ParseError.ExpressionExpected);
        }
        this._parseBody(node, parseStatement);
        if (this.acceptKeyword('@else')) {
            if (this.peekIdent('if')) {
                node.setElseClause(this._internalParseIfStatement(parseStatement));
            }
            else if (this.peek(TokenType.CurlyL)) {
                var elseNode = this.create(ElseStatement);
                this._parseBody(elseNode, parseStatement);
                node.setElseClause(elseNode);
            }
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseForStatement = function (parseStatement) {
        if (!this.peekKeyword('@for')) {
            return null;
        }
        var node = this.create(ForStatement);
        this.consumeToken(); // @for
        if (!node.setVariable(this._parseVariable())) {
            return this.finish(node, ParseError.VariableNameExpected, [TokenType.CurlyR]);
        }
        if (!this.acceptIdent('from')) {
            return this.finish(node, SCSSParseError.FromExpected, [TokenType.CurlyR]);
        }
        if (!node.addChild(this._parseBinaryExpr())) {
            return this.finish(node, ParseError.ExpressionExpected, [TokenType.CurlyR]);
        }
        if (!this.acceptIdent('to') && !this.acceptIdent('through')) {
            return this.finish(node, SCSSParseError.ThroughOrToExpected, [TokenType.CurlyR]);
        }
        if (!node.addChild(this._parseBinaryExpr())) {
            return this.finish(node, ParseError.ExpressionExpected, [TokenType.CurlyR]);
        }
        return this._parseBody(node, parseStatement);
    };
    SCSSParser.prototype._parseEachStatement = function (parseStatement) {
        if (!this.peekKeyword('@each')) {
            return null;
        }
        var node = this.create(EachStatement);
        this.consumeToken(); // @each
        var variables = node.getVariables();
        if (!variables.addChild(this._parseVariable())) {
            return this.finish(node, ParseError.VariableNameExpected, [TokenType.CurlyR]);
        }
        while (this.accept(TokenType.Comma)) {
            if (!variables.addChild(this._parseVariable())) {
                return this.finish(node, ParseError.VariableNameExpected, [TokenType.CurlyR]);
            }
        }
        this.finish(variables);
        if (!this.acceptIdent('in')) {
            return this.finish(node, SCSSParseError.InExpected, [TokenType.CurlyR]);
        }
        if (!node.addChild(this._parseExpr())) {
            return this.finish(node, ParseError.ExpressionExpected, [TokenType.CurlyR]);
        }
        return this._parseBody(node, parseStatement);
    };
    SCSSParser.prototype._parseWhileStatement = function (parseStatement) {
        if (!this.peekKeyword('@while')) {
            return null;
        }
        var node = this.create(WhileStatement);
        this.consumeToken(); // @while
        if (!node.addChild(this._parseBinaryExpr())) {
            return this.finish(node, ParseError.ExpressionExpected, [TokenType.CurlyR]);
        }
        return this._parseBody(node, parseStatement);
    };
    SCSSParser.prototype._parseFunctionBodyDeclaration = function () {
        return this._parseVariableDeclaration() || this._parseReturnStatement() || this._parseWarnAndDebug()
            || this._parseControlStatement(this._parseFunctionBodyDeclaration.bind(this));
    };
    SCSSParser.prototype._parseFunctionDeclaration = function () {
        if (!this.peekKeyword('@function')) {
            return null;
        }
        var node = this.create(FunctionDeclaration);
        this.consumeToken(); // @function
        if (!node.setIdentifier(this._parseIdent([ReferenceType.Function]))) {
            return this.finish(node, ParseError.IdentifierExpected, [TokenType.CurlyR]);
        }
        if (!this.accept(TokenType.ParenthesisL)) {
            return this.finish(node, ParseError.LeftParenthesisExpected, [TokenType.CurlyR]);
        }
        if (node.getParameters().addChild(this._parseParameterDeclaration())) {
            while (this.accept(TokenType.Comma)) {
                if (this.peek(TokenType.ParenthesisR)) {
                    break;
                }
                if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                    return this.finish(node, ParseError.VariableNameExpected);
                }
            }
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected, [TokenType.CurlyR]);
        }
        return this._parseBody(node, this._parseFunctionBodyDeclaration.bind(this));
    };
    SCSSParser.prototype._parseReturnStatement = function () {
        if (!this.peekKeyword('@return')) {
            return null;
        }
        var node = this.createNode(NodeType.ReturnStatement);
        this.consumeToken(); // @function
        if (!node.addChild(this._parseExpr())) {
            return this.finish(node, ParseError.ExpressionExpected);
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseMixinDeclaration = function () {
        if (!this.peekKeyword('@mixin')) {
            return null;
        }
        var node = this.create(MixinDeclaration);
        this.consumeToken();
        if (!node.setIdentifier(this._parseIdent([ReferenceType.Mixin]))) {
            return this.finish(node, ParseError.IdentifierExpected, [TokenType.CurlyR]);
        }
        if (this.accept(TokenType.ParenthesisL)) {
            if (node.getParameters().addChild(this._parseParameterDeclaration())) {
                while (this.accept(TokenType.Comma)) {
                    if (this.peek(TokenType.ParenthesisR)) {
                        break;
                    }
                    if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                        return this.finish(node, ParseError.VariableNameExpected);
                    }
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected, [TokenType.CurlyR]);
            }
        }
        return this._parseBody(node, this._parseRuleSetDeclaration.bind(this));
    };
    SCSSParser.prototype._parseParameterDeclaration = function () {
        var node = this.create(FunctionParameter);
        if (!node.setIdentifier(this._parseVariable())) {
            return null;
        }
        if (this.accept(Ellipsis)) ;
        if (this.accept(TokenType.Colon)) {
            if (!node.setDefaultValue(this._parseExpr(true))) {
                return this.finish(node, ParseError.VariableValueExpected, [], [TokenType.Comma, TokenType.ParenthesisR]);
            }
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseMixinContent = function () {
        if (!this.peekKeyword('@content')) {
            return null;
        }
        var node = this.create(MixinContentReference);
        this.consumeToken();
        if (this.accept(TokenType.ParenthesisL)) {
            if (node.getArguments().addChild(this._parseFunctionArgument())) {
                while (this.accept(TokenType.Comma)) {
                    if (this.peek(TokenType.ParenthesisR)) {
                        break;
                    }
                    if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                        return this.finish(node, ParseError.ExpressionExpected);
                    }
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected);
            }
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseMixinReference = function () {
        if (!this.peekKeyword('@include')) {
            return null;
        }
        var node = this.create(MixinReference);
        this.consumeToken();
        // Could be module or mixin identifier, set as mixin as default.
        var firstIdent = this._parseIdent([ReferenceType.Mixin]);
        if (!node.setIdentifier(firstIdent)) {
            return this.finish(node, ParseError.IdentifierExpected, [TokenType.CurlyR]);
        }
        // Is a module accessor.
        if (!this.hasWhitespace() && this.acceptDelim('.') && !this.hasWhitespace()) {
            var secondIdent = this._parseIdent([ReferenceType.Mixin]);
            if (!secondIdent) {
                return this.finish(node, ParseError.IdentifierExpected, [TokenType.CurlyR]);
            }
            var moduleToken = this.create(Module);
            // Re-purpose first matched ident as identifier for module token.
            firstIdent.referenceTypes = [ReferenceType.Module];
            moduleToken.setIdentifier(firstIdent);
            // Override identifier with second ident.
            node.setIdentifier(secondIdent);
            node.addChild(moduleToken);
        }
        if (this.accept(TokenType.ParenthesisL)) {
            if (node.getArguments().addChild(this._parseFunctionArgument())) {
                while (this.accept(TokenType.Comma)) {
                    if (this.peek(TokenType.ParenthesisR)) {
                        break;
                    }
                    if (!node.getArguments().addChild(this._parseFunctionArgument())) {
                        return this.finish(node, ParseError.ExpressionExpected);
                    }
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected);
            }
        }
        if (this.peekIdent('using') || this.peek(TokenType.CurlyL)) {
            node.setContent(this._parseMixinContentDeclaration());
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseMixinContentDeclaration = function () {
        var node = this.create(MixinContentDeclaration);
        if (this.acceptIdent('using')) {
            if (!this.accept(TokenType.ParenthesisL)) {
                return this.finish(node, ParseError.LeftParenthesisExpected, [TokenType.CurlyL]);
            }
            if (node.getParameters().addChild(this._parseParameterDeclaration())) {
                while (this.accept(TokenType.Comma)) {
                    if (this.peek(TokenType.ParenthesisR)) {
                        break;
                    }
                    if (!node.getParameters().addChild(this._parseParameterDeclaration())) {
                        return this.finish(node, ParseError.VariableNameExpected);
                    }
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected, [TokenType.CurlyL]);
            }
        }
        if (this.peek(TokenType.CurlyL)) {
            this._parseBody(node, this._parseMixinReferenceBodyStatement.bind(this));
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseMixinReferenceBodyStatement = function () {
        return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration();
    };
    SCSSParser.prototype._parseFunctionArgument = function () {
        // [variableName ':'] expression | variableName '...'
        var node = this.create(FunctionArgument);
        var pos = this.mark();
        var argument = this._parseVariable();
        if (argument) {
            if (!this.accept(TokenType.Colon)) {
                if (this.accept(Ellipsis)) { // optional
                    node.setValue(argument);
                    return this.finish(node);
                }
                else {
                    this.restoreAtMark(pos);
                }
            }
            else {
                node.setIdentifier(argument);
            }
        }
        if (node.setValue(this._parseExpr(true))) {
            this.accept(Ellipsis); // #43746
            node.addChild(this._parsePrio()); // #9859
            return this.finish(node);
        }
        else if (node.setValue(this._tryParsePrio())) {
            return this.finish(node);
        }
        return null;
    };
    SCSSParser.prototype._parseURLArgument = function () {
        var pos = this.mark();
        var node = _super.prototype._parseURLArgument.call(this);
        if (!node || !this.peek(TokenType.ParenthesisR)) {
            this.restoreAtMark(pos);
            var node_1 = this.create(Node);
            node_1.addChild(this._parseBinaryExpr());
            return this.finish(node_1);
        }
        return node;
    };
    SCSSParser.prototype._parseOperation = function () {
        if (!this.peek(TokenType.ParenthesisL)) {
            return null;
        }
        var node = this.create(Node);
        this.consumeToken();
        while (node.addChild(this._parseListElement())) {
            this.accept(TokenType.Comma); // optional
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseListElement = function () {
        var node = this.create(ListEntry);
        var child = this._parseBinaryExpr();
        if (!child) {
            return null;
        }
        if (this.accept(TokenType.Colon)) {
            node.setKey(child);
            if (!node.setValue(this._parseBinaryExpr())) {
                return this.finish(node, ParseError.ExpressionExpected);
            }
        }
        else {
            node.setValue(child);
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseUse = function () {
        if (!this.peekKeyword('@use')) {
            return null;
        }
        var node = this.create(Use);
        this.consumeToken(); // @use
        if (!node.addChild(this._parseStringLiteral())) {
            return this.finish(node, ParseError.StringLiteralExpected);
        }
        if (!this.peek(TokenType.SemiColon) && !this.peek(TokenType.EOF)) {
            if (!this.peekRegExp(TokenType.Ident, /as|with/)) {
                return this.finish(node, ParseError.UnknownKeyword);
            }
            if (this.acceptIdent('as') &&
                (!node.setIdentifier(this._parseIdent([ReferenceType.Module])) && !this.acceptDelim('*'))) {
                return this.finish(node, ParseError.IdentifierOrWildcardExpected);
            }
            if (this.acceptIdent('with')) {
                if (!this.accept(TokenType.ParenthesisL)) {
                    return this.finish(node, ParseError.LeftParenthesisExpected, [TokenType.ParenthesisR]);
                }
                // First variable statement, no comma.
                if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                    return this.finish(node, ParseError.VariableNameExpected);
                }
                while (this.accept(TokenType.Comma)) {
                    if (this.peek(TokenType.ParenthesisR)) {
                        break;
                    }
                    if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                        return this.finish(node, ParseError.VariableNameExpected);
                    }
                }
                if (!this.accept(TokenType.ParenthesisR)) {
                    return this.finish(node, ParseError.RightParenthesisExpected);
                }
            }
        }
        if (!this.accept(TokenType.SemiColon) && !this.accept(TokenType.EOF)) {
            return this.finish(node, ParseError.SemiColonExpected);
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseModuleConfigDeclaration = function () {
        var node = this.create(ModuleConfiguration);
        if (!node.setIdentifier(this._parseVariable())) {
            return null;
        }
        if (!this.accept(TokenType.Colon) || !node.setValue(this._parseExpr(true))) {
            return this.finish(node, ParseError.VariableValueExpected, [], [TokenType.Comma, TokenType.ParenthesisR]);
        }
        if (this.accept(TokenType.Exclamation)) {
            if (this.hasWhitespace() || !this.acceptIdent('default')) {
                return this.finish(node, ParseError.UnknownKeyword);
            }
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseForward = function () {
        if (!this.peekKeyword('@forward')) {
            return null;
        }
        var node = this.create(Forward);
        this.consumeToken();
        if (!node.addChild(this._parseStringLiteral())) {
            return this.finish(node, ParseError.StringLiteralExpected);
        }
        if (this.acceptIdent('with')) {
            if (!this.accept(TokenType.ParenthesisL)) {
                return this.finish(node, ParseError.LeftParenthesisExpected, [TokenType.ParenthesisR]);
            }
            // First variable statement, no comma.
            if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                return this.finish(node, ParseError.VariableNameExpected);
            }
            while (this.accept(TokenType.Comma)) {
                if (this.peek(TokenType.ParenthesisR)) {
                    break;
                }
                if (!node.getParameters().addChild(this._parseModuleConfigDeclaration())) {
                    return this.finish(node, ParseError.VariableNameExpected);
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected);
            }
        }
        if (!this.peek(TokenType.SemiColon) && !this.peek(TokenType.EOF)) {
            if (!this.peekRegExp(TokenType.Ident, /as|hide|show/)) {
                return this.finish(node, ParseError.UnknownKeyword);
            }
            if (this.acceptIdent('as')) {
                var identifier = this._parseIdent([ReferenceType.Forward]);
                if (!node.setIdentifier(identifier)) {
                    return this.finish(node, ParseError.IdentifierExpected);
                }
                // Wildcard must be the next character after the identifier string.
                if (this.hasWhitespace() || !this.acceptDelim('*')) {
                    return this.finish(node, ParseError.WildcardExpected);
                }
            }
            if (this.peekIdent('hide') || this.peekIdent('show')) {
                if (!node.addChild(this._parseForwardVisibility())) {
                    return this.finish(node, ParseError.IdentifierOrVariableExpected);
                }
            }
        }
        if (!this.accept(TokenType.SemiColon) && !this.accept(TokenType.EOF)) {
            return this.finish(node, ParseError.SemiColonExpected);
        }
        return this.finish(node);
    };
    SCSSParser.prototype._parseForwardVisibility = function () {
        var node = this.create(ForwardVisibility);
        // Assume to be "hide" or "show".
        node.setIdentifier(this._parseIdent());
        while (node.addChild(this._parseVariable() || this._parseIdent())) {
            // Consume all variables and idents ahead.
            this.accept(TokenType.Comma);
        }
        // More than just identifier 
        return node.getChildren().length > 1 ? node : null;
    };
    SCSSParser.prototype._parseSupportsCondition = function () {
        return this._parseInterpolation() || _super.prototype._parseSupportsCondition.call(this);
    };
    return SCSSParser;
}(Parser));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var localize$8 = loadMessageBundle();
var SCSSCompletion = /** @class */ (function (_super) {
    __extends$5(SCSSCompletion, _super);
    function SCSSCompletion(lsServiceOptions, cssDataManager) {
        var _this = _super.call(this, '$', lsServiceOptions, cssDataManager) || this;
        addReferencesToDocumentation(SCSSCompletion.scssModuleLoaders);
        addReferencesToDocumentation(SCSSCompletion.scssModuleBuiltIns);
        return _this;
    }
    SCSSCompletion.prototype.isImportPathParent = function (type) {
        return type === NodeType.Forward
            || type === NodeType.Use
            || _super.prototype.isImportPathParent.call(this, type);
    };
    SCSSCompletion.prototype.getCompletionForImportPath = function (importPathNode, result) {
        var parentType = importPathNode.getParent().type;
        if (parentType === NodeType.Forward || parentType === NodeType.Use) {
            for (var _i = 0, _a = SCSSCompletion.scssModuleBuiltIns; _i < _a.length; _i++) {
                var p = _a[_i];
                var item = {
                    label: p.label,
                    documentation: p.documentation,
                    textEdit: TextEdit.replace(this.getCompletionRange(importPathNode), "'" + p.label + "'"),
                    kind: CompletionItemKind.Module
                };
                result.items.push(item);
            }
        }
        return _super.prototype.getCompletionForImportPath.call(this, importPathNode, result);
    };
    SCSSCompletion.prototype.createReplaceFunction = function () {
        var tabStopCounter = 1;
        return function (_match, p1) {
            return '\\' + p1 + ': ${' + tabStopCounter++ + ':' + (SCSSCompletion.variableDefaults[p1] || '') + '}';
        };
    };
    SCSSCompletion.prototype.createFunctionProposals = function (proposals, existingNode, sortToEnd, result) {
        for (var _i = 0, proposals_1 = proposals; _i < proposals_1.length; _i++) {
            var p = proposals_1[_i];
            var insertText = p.func.replace(/\[?(\$\w+)\]?/g, this.createReplaceFunction());
            var label = p.func.substr(0, p.func.indexOf('('));
            var item = {
                label: label,
                detail: p.func,
                documentation: p.desc,
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), insertText),
                insertTextFormat: InsertTextFormat.Snippet,
                kind: CompletionItemKind.Function
            };
            if (sortToEnd) {
                item.sortText = 'z';
            }
            result.items.push(item);
        }
        return result;
    };
    SCSSCompletion.prototype.getCompletionsForSelector = function (ruleSet, isNested, result) {
        this.createFunctionProposals(SCSSCompletion.selectorFuncs, null, true, result);
        return _super.prototype.getCompletionsForSelector.call(this, ruleSet, isNested, result);
    };
    SCSSCompletion.prototype.getTermProposals = function (entry, existingNode, result) {
        var functions = SCSSCompletion.builtInFuncs;
        if (entry) {
            functions = functions.filter(function (f) { return !f.type || !entry.restrictions || entry.restrictions.indexOf(f.type) !== -1; });
        }
        this.createFunctionProposals(functions, existingNode, true, result);
        return _super.prototype.getTermProposals.call(this, entry, existingNode, result);
    };
    SCSSCompletion.prototype.getColorProposals = function (entry, existingNode, result) {
        this.createFunctionProposals(SCSSCompletion.colorProposals, existingNode, false, result);
        return _super.prototype.getColorProposals.call(this, entry, existingNode, result);
    };
    SCSSCompletion.prototype.getCompletionsForDeclarationProperty = function (declaration, result) {
        this.getCompletionForAtDirectives(result);
        this.getCompletionsForSelector(null, true, result);
        return _super.prototype.getCompletionsForDeclarationProperty.call(this, declaration, result);
    };
    SCSSCompletion.prototype.getCompletionsForExtendsReference = function (_extendsRef, existingNode, result) {
        var symbols = this.getSymbolContext().findSymbolsAtOffset(this.offset, ReferenceType.Rule);
        for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
            var symbol = symbols_1[_i];
            var suggest = {
                label: symbol.name,
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), symbol.name),
                kind: CompletionItemKind.Function,
            };
            result.items.push(suggest);
        }
        return result;
    };
    SCSSCompletion.prototype.getCompletionForAtDirectives = function (result) {
        var _a;
        (_a = result.items).push.apply(_a, SCSSCompletion.scssAtDirectives);
        return result;
    };
    SCSSCompletion.prototype.getCompletionForTopLevel = function (result) {
        this.getCompletionForAtDirectives(result);
        this.getCompletionForModuleLoaders(result);
        _super.prototype.getCompletionForTopLevel.call(this, result);
        return result;
    };
    SCSSCompletion.prototype.getCompletionForModuleLoaders = function (result) {
        var _a;
        (_a = result.items).push.apply(_a, SCSSCompletion.scssModuleLoaders);
        return result;
    };
    SCSSCompletion.variableDefaults = {
        '$red': '1',
        '$green': '2',
        '$blue': '3',
        '$alpha': '1.0',
        '$color': '#000000',
        '$weight': '0.5',
        '$hue': '0',
        '$saturation': '0%',
        '$lightness': '0%',
        '$degrees': '0',
        '$amount': '0',
        '$string': '""',
        '$substring': '"s"',
        '$number': '0',
        '$limit': '1'
    };
    SCSSCompletion.colorProposals = [
        { func: 'red($color)', desc: localize$8('scss.builtin.red', 'Gets the red component of a color.') },
        { func: 'green($color)', desc: localize$8('scss.builtin.green', 'Gets the green component of a color.') },
        { func: 'blue($color)', desc: localize$8('scss.builtin.blue', 'Gets the blue component of a color.') },
        { func: 'mix($color, $color, [$weight])', desc: localize$8('scss.builtin.mix', 'Mixes two colors together.') },
        { func: 'hue($color)', desc: localize$8('scss.builtin.hue', 'Gets the hue component of a color.') },
        { func: 'saturation($color)', desc: localize$8('scss.builtin.saturation', 'Gets the saturation component of a color.') },
        { func: 'lightness($color)', desc: localize$8('scss.builtin.lightness', 'Gets the lightness component of a color.') },
        { func: 'adjust-hue($color, $degrees)', desc: localize$8('scss.builtin.adjust-hue', 'Changes the hue of a color.') },
        { func: 'lighten($color, $amount)', desc: localize$8('scss.builtin.lighten', 'Makes a color lighter.') },
        { func: 'darken($color, $amount)', desc: localize$8('scss.builtin.darken', 'Makes a color darker.') },
        { func: 'saturate($color, $amount)', desc: localize$8('scss.builtin.saturate', 'Makes a color more saturated.') },
        { func: 'desaturate($color, $amount)', desc: localize$8('scss.builtin.desaturate', 'Makes a color less saturated.') },
        { func: 'grayscale($color)', desc: localize$8('scss.builtin.grayscale', 'Converts a color to grayscale.') },
        { func: 'complement($color)', desc: localize$8('scss.builtin.complement', 'Returns the complement of a color.') },
        { func: 'invert($color)', desc: localize$8('scss.builtin.invert', 'Returns the inverse of a color.') },
        { func: 'alpha($color)', desc: localize$8('scss.builtin.alpha', 'Gets the opacity component of a color.') },
        { func: 'opacity($color)', desc: 'Gets the alpha component (opacity) of a color.' },
        { func: 'rgba($color, $alpha)', desc: localize$8('scss.builtin.rgba', 'Changes the alpha component for a color.') },
        { func: 'opacify($color, $amount)', desc: localize$8('scss.builtin.opacify', 'Makes a color more opaque.') },
        { func: 'fade-in($color, $amount)', desc: localize$8('scss.builtin.fade-in', 'Makes a color more opaque.') },
        { func: 'transparentize($color, $amount)', desc: localize$8('scss.builtin.transparentize', 'Makes a color more transparent.') },
        { func: 'fade-out($color, $amount)', desc: localize$8('scss.builtin.fade-out', 'Makes a color more transparent.') },
        { func: 'adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])', desc: localize$8('scss.builtin.adjust-color', 'Increases or decreases one or more components of a color.') },
        { func: 'scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])', desc: localize$8('scss.builtin.scale-color', 'Fluidly scales one or more properties of a color.') },
        { func: 'change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])', desc: localize$8('scss.builtin.change-color', 'Changes one or more properties of a color.') },
        { func: 'ie-hex-str($color)', desc: localize$8('scss.builtin.ie-hex-str', 'Converts a color into the format understood by IE filters.') }
    ];
    SCSSCompletion.selectorFuncs = [
        { func: 'selector-nest($selectors…)', desc: localize$8('scss.builtin.selector-nest', 'Nests selector beneath one another like they would be nested in the stylesheet.') },
        { func: 'selector-append($selectors…)', desc: localize$8('scss.builtin.selector-append', 'Appends selectors to one another without spaces in between.') },
        { func: 'selector-extend($selector, $extendee, $extender)', desc: localize$8('scss.builtin.selector-extend', 'Extends $extendee with $extender within $selector.') },
        { func: 'selector-replace($selector, $original, $replacement)', desc: localize$8('scss.builtin.selector-replace', 'Replaces $original with $replacement within $selector.') },
        { func: 'selector-unify($selector1, $selector2)', desc: localize$8('scss.builtin.selector-unify', 'Unifies two selectors to produce a selector that matches elements matched by both.') },
        { func: 'is-superselector($super, $sub)', desc: localize$8('scss.builtin.is-superselector', 'Returns whether $super matches all the elements $sub does, and possibly more.') },
        { func: 'simple-selectors($selector)', desc: localize$8('scss.builtin.simple-selectors', 'Returns the simple selectors that comprise a compound selector.') },
        { func: 'selector-parse($selector)', desc: localize$8('scss.builtin.selector-parse', 'Parses a selector into the format returned by &.') }
    ];
    SCSSCompletion.builtInFuncs = [
        { func: 'unquote($string)', desc: localize$8('scss.builtin.unquote', 'Removes quotes from a string.') },
        { func: 'quote($string)', desc: localize$8('scss.builtin.quote', 'Adds quotes to a string.') },
        { func: 'str-length($string)', desc: localize$8('scss.builtin.str-length', 'Returns the number of characters in a string.') },
        { func: 'str-insert($string, $insert, $index)', desc: localize$8('scss.builtin.str-insert', 'Inserts $insert into $string at $index.') },
        { func: 'str-index($string, $substring)', desc: localize$8('scss.builtin.str-index', 'Returns the index of the first occurance of $substring in $string.') },
        { func: 'str-slice($string, $start-at, [$end-at])', desc: localize$8('scss.builtin.str-slice', 'Extracts a substring from $string.') },
        { func: 'to-upper-case($string)', desc: localize$8('scss.builtin.to-upper-case', 'Converts a string to upper case.') },
        { func: 'to-lower-case($string)', desc: localize$8('scss.builtin.to-lower-case', 'Converts a string to lower case.') },
        { func: 'percentage($number)', desc: localize$8('scss.builtin.percentage', 'Converts a unitless number to a percentage.'), type: 'percentage' },
        { func: 'round($number)', desc: localize$8('scss.builtin.round', 'Rounds a number to the nearest whole number.') },
        { func: 'ceil($number)', desc: localize$8('scss.builtin.ceil', 'Rounds a number up to the next whole number.') },
        { func: 'floor($number)', desc: localize$8('scss.builtin.floor', 'Rounds a number down to the previous whole number.') },
        { func: 'abs($number)', desc: localize$8('scss.builtin.abs', 'Returns the absolute value of a number.') },
        { func: 'min($numbers)', desc: localize$8('scss.builtin.min', 'Finds the minimum of several numbers.') },
        { func: 'max($numbers)', desc: localize$8('scss.builtin.max', 'Finds the maximum of several numbers.') },
        { func: 'random([$limit])', desc: localize$8('scss.builtin.random', 'Returns a random number.') },
        { func: 'length($list)', desc: localize$8('scss.builtin.length', 'Returns the length of a list.') },
        { func: 'nth($list, $n)', desc: localize$8('scss.builtin.nth', 'Returns a specific item in a list.') },
        { func: 'set-nth($list, $n, $value)', desc: localize$8('scss.builtin.set-nth', 'Replaces the nth item in a list.') },
        { func: 'join($list1, $list2, [$separator])', desc: localize$8('scss.builtin.join', 'Joins together two lists into one.') },
        { func: 'append($list1, $val, [$separator])', desc: localize$8('scss.builtin.append', 'Appends a single value onto the end of a list.') },
        { func: 'zip($lists)', desc: localize$8('scss.builtin.zip', 'Combines several lists into a single multidimensional list.') },
        { func: 'index($list, $value)', desc: localize$8('scss.builtin.index', 'Returns the position of a value within a list.') },
        { func: 'list-separator(#list)', desc: localize$8('scss.builtin.list-separator', 'Returns the separator of a list.') },
        { func: 'map-get($map, $key)', desc: localize$8('scss.builtin.map-get', 'Returns the value in a map associated with a given key.') },
        { func: 'map-merge($map1, $map2)', desc: localize$8('scss.builtin.map-merge', 'Merges two maps together into a new map.') },
        { func: 'map-remove($map, $keys)', desc: localize$8('scss.builtin.map-remove', 'Returns a new map with keys removed.') },
        { func: 'map-keys($map)', desc: localize$8('scss.builtin.map-keys', 'Returns a list of all keys in a map.') },
        { func: 'map-values($map)', desc: localize$8('scss.builtin.map-values', 'Returns a list of all values in a map.') },
        { func: 'map-has-key($map, $key)', desc: localize$8('scss.builtin.map-has-key', 'Returns whether a map has a value associated with a given key.') },
        { func: 'keywords($args)', desc: localize$8('scss.builtin.keywords', 'Returns the keywords passed to a function that takes variable arguments.') },
        { func: 'feature-exists($feature)', desc: localize$8('scss.builtin.feature-exists', 'Returns whether a feature exists in the current Sass runtime.') },
        { func: 'variable-exists($name)', desc: localize$8('scss.builtin.variable-exists', 'Returns whether a variable with the given name exists in the current scope.') },
        { func: 'global-variable-exists($name)', desc: localize$8('scss.builtin.global-variable-exists', 'Returns whether a variable with the given name exists in the global scope.') },
        { func: 'function-exists($name)', desc: localize$8('scss.builtin.function-exists', 'Returns whether a function with the given name exists.') },
        { func: 'mixin-exists($name)', desc: localize$8('scss.builtin.mixin-exists', 'Returns whether a mixin with the given name exists.') },
        { func: 'inspect($value)', desc: localize$8('scss.builtin.inspect', 'Returns the string representation of a value as it would be represented in Sass.') },
        { func: 'type-of($value)', desc: localize$8('scss.builtin.type-of', 'Returns the type of a value.') },
        { func: 'unit($number)', desc: localize$8('scss.builtin.unit', 'Returns the unit(s) associated with a number.') },
        { func: 'unitless($number)', desc: localize$8('scss.builtin.unitless', 'Returns whether a number has units.') },
        { func: 'comparable($number1, $number2)', desc: localize$8('scss.builtin.comparable', 'Returns whether two numbers can be added, subtracted, or compared.') },
        { func: 'call($name, $args…)', desc: localize$8('scss.builtin.call', 'Dynamically calls a Sass function.') }
    ];
    SCSSCompletion.scssAtDirectives = [
        {
            label: "@extend",
            documentation: localize$8("scss.builtin.@extend", "Inherits the styles of another selector."),
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@at-root",
            documentation: localize$8("scss.builtin.@at-root", "Causes one or more rules to be emitted at the root of the document."),
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@debug",
            documentation: localize$8("scss.builtin.@debug", "Prints the value of an expression to the standard error output stream. Useful for debugging complicated Sass files."),
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@warn",
            documentation: localize$8("scss.builtin.@warn", "Prints the value of an expression to the standard error output stream. Useful for libraries that need to warn users of deprecations or recovering from minor mixin usage mistakes. Warnings can be turned off with the `--quiet` command-line option or the `:quiet` Sass option."),
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@error",
            documentation: localize$8("scss.builtin.@error", "Throws the value of an expression as a fatal error with stack trace. Useful for validating arguments to mixins and functions."),
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@if",
            documentation: localize$8("scss.builtin.@if", "Includes the body if the expression does not evaluate to `false` or `null`."),
            insertText: "@if ${1:expr} {\n\t$0\n}",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@for",
            documentation: localize$8("scss.builtin.@for", "For loop that repeatedly outputs a set of styles for each `$var` in the `from/through` or `from/to` clause."),
            insertText: "@for \\$${1:var} from ${2:start} ${3|to,through|} ${4:end} {\n\t$0\n}",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@each",
            documentation: localize$8("scss.builtin.@each", "Each loop that sets `$var` to each item in the list or map, then outputs the styles it contains using that value of `$var`."),
            insertText: "@each \\$${1:var} in ${2:list} {\n\t$0\n}",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@while",
            documentation: localize$8("scss.builtin.@while", "While loop that takes an expression and repeatedly outputs the nested styles until the statement evaluates to `false`."),
            insertText: "@while ${1:condition} {\n\t$0\n}",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@mixin",
            documentation: localize$8("scss.builtin.@mixin", "Defines styles that can be re-used throughout the stylesheet with `@include`."),
            insertText: "@mixin ${1:name} {\n\t$0\n}",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@include",
            documentation: localize$8("scss.builtin.@include", "Includes the styles defined by another mixin into the current rule."),
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@function",
            documentation: localize$8("scss.builtin.@function", "Defines complex operations that can be re-used throughout stylesheets."),
            kind: CompletionItemKind.Keyword
        }
    ];
    SCSSCompletion.scssModuleLoaders = [
        {
            label: "@use",
            documentation: localize$8("scss.builtin.@use", "Loads mixins, functions, and variables from other Sass stylesheets as 'modules', and combines CSS from multiple stylesheets together."),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/at-rules/use' }],
            insertText: "@use $0;",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
        {
            label: "@forward",
            documentation: localize$8("scss.builtin.@forward", "Loads a Sass stylesheet and makes its mixins, functions, and variables available when this stylesheet is loaded with the @use rule."),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/at-rules/forward' }],
            insertText: "@forward $0;",
            insertTextFormat: InsertTextFormat.Snippet,
            kind: CompletionItemKind.Keyword
        },
    ];
    SCSSCompletion.scssModuleBuiltIns = [
        {
            label: 'sass:math',
            documentation: localize$8('scss.builtin.sass:math', 'Provides functions that operate on numbers.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/math' }]
        },
        {
            label: 'sass:string',
            documentation: localize$8('scss.builtin.sass:string', 'Makes it easy to combine, search, or split apart strings.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/string' }]
        },
        {
            label: 'sass:color',
            documentation: localize$8('scss.builtin.sass:color', 'Generates new colors based on existing ones, making it easy to build color themes.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/color' }]
        },
        {
            label: 'sass:list',
            documentation: localize$8('scss.builtin.sass:list', 'Lets you access and modify values in lists.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/list' }]
        },
        {
            label: 'sass:map',
            documentation: localize$8('scss.builtin.sass:map', 'Makes it possible to look up the value associated with a key in a map, and much more.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/map' }]
        },
        {
            label: 'sass:selector',
            documentation: localize$8('scss.builtin.sass:selector', 'Provides access to Sass’s powerful selector engine.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/selector' }]
        },
        {
            label: 'sass:meta',
            documentation: localize$8('scss.builtin.sass:meta', 'Exposes the details of Sass’s inner workings.'),
            references: [{ name: 'Sass documentation', url: 'https://sass-lang.com/documentation/modules/meta' }]
        },
    ];
    return SCSSCompletion;
}(CSSCompletion));
/**
 * Todo @Pine: Remove this and do it through custom data
 */
function addReferencesToDocumentation(items) {
    items.forEach(function (i) {
        if (i.documentation && i.references && i.references.length > 0) {
            var markdownDoc = typeof i.documentation === 'string'
                ? { kind: 'markdown', value: i.documentation }
                : { kind: 'markdown', value: i.documentation.value };
            markdownDoc.value += '\n\n';
            markdownDoc.value += i.references
                .map(function (r) {
                return "[" + r.name + "](" + r.url + ")";
            })
                .join(' | ');
            i.documentation = markdownDoc;
        }
    });
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _FSL$2 = '/'.charCodeAt(0);
var _NWL$2 = '\n'.charCodeAt(0);
var _CAR$2 = '\r'.charCodeAt(0);
var _LFD$2 = '\f'.charCodeAt(0);
var _TIC = '`'.charCodeAt(0);
var _DOT$2 = '.'.charCodeAt(0);
var customTokenValue$1 = TokenType.CustomToken;
var Ellipsis$1 = customTokenValue$1++;
var LESSScanner = /** @class */ (function (_super) {
    __extends$6(LESSScanner, _super);
    function LESSScanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LESSScanner.prototype.scanNext = function (offset) {
        // LESS: escaped JavaScript code `const a = "dddd"`
        var tokenType = this.escapedJavaScript();
        if (tokenType !== null) {
            return this.finishToken(offset, tokenType);
        }
        if (this.stream.advanceIfChars([_DOT$2, _DOT$2, _DOT$2])) {
            return this.finishToken(offset, Ellipsis$1);
        }
        return _super.prototype.scanNext.call(this, offset);
    };
    LESSScanner.prototype.comment = function () {
        if (_super.prototype.comment.call(this)) {
            return true;
        }
        if (!this.inURL && this.stream.advanceIfChars([_FSL$2, _FSL$2])) {
            this.stream.advanceWhileChar(function (ch) {
                switch (ch) {
                    case _NWL$2:
                    case _CAR$2:
                    case _LFD$2:
                        return false;
                    default:
                        return true;
                }
            });
            return true;
        }
        else {
            return false;
        }
    };
    LESSScanner.prototype.escapedJavaScript = function () {
        var ch = this.stream.peekChar();
        if (ch === _TIC) {
            this.stream.advance(1);
            this.stream.advanceWhileChar(function (ch) { return ch !== _TIC; });
            return this.stream.advanceIfChar(_TIC) ? TokenType.EscapedJavaScript : TokenType.BadEscapedJavaScript;
        }
        return null;
    };
    return LESSScanner;
}(Scanner));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <summary>
/// A parser for LESS
/// http://lesscss.org/
/// </summary>
var LESSParser = /** @class */ (function (_super) {
    __extends$7(LESSParser, _super);
    function LESSParser() {
        return _super.call(this, new LESSScanner()) || this;
    }
    LESSParser.prototype._parseStylesheetStatement = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        if (this.peek(TokenType.AtKeyword)) {
            return this._parseVariableDeclaration()
                || this._parsePlugin()
                || _super.prototype._parseStylesheetAtStatement.call(this, isNested);
        }
        return this._tryParseMixinDeclaration()
            || this._tryParseMixinReference()
            || this._parseFunction()
            || this._parseRuleset(true);
    };
    LESSParser.prototype._parseImport = function () {
        if (!this.peekKeyword('@import') && !this.peekKeyword('@import-once') /* deprecated in less 1.4.1 */) {
            return null;
        }
        var node = this.create(Import);
        this.consumeToken();
        // less 1.4.1: @import (css) "lib"
        if (this.accept(TokenType.ParenthesisL)) {
            if (!this.accept(TokenType.Ident)) {
                return this.finish(node, ParseError.IdentifierExpected, [TokenType.SemiColon]);
            }
            do {
                if (!this.accept(TokenType.Comma)) {
                    break;
                }
            } while (this.accept(TokenType.Ident));
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected, [TokenType.SemiColon]);
            }
        }
        if (!node.addChild(this._parseURILiteral()) && !node.addChild(this._parseStringLiteral())) {
            return this.finish(node, ParseError.URIOrStringExpected, [TokenType.SemiColon]);
        }
        if (!this.peek(TokenType.SemiColon) && !this.peek(TokenType.EOF)) {
            node.setMedialist(this._parseMediaQueryList());
        }
        return this.finish(node);
    };
    LESSParser.prototype._parsePlugin = function () {
        if (!this.peekKeyword('@plugin')) {
            return null;
        }
        var node = this.createNode(NodeType.Plugin);
        this.consumeToken(); // @import
        if (!node.addChild(this._parseStringLiteral())) {
            return this.finish(node, ParseError.StringLiteralExpected);
        }
        if (!this.accept(TokenType.SemiColon)) {
            return this.finish(node, ParseError.SemiColonExpected);
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseMediaQuery = function (resyncStopToken) {
        var node = _super.prototype._parseMediaQuery.call(this, resyncStopToken);
        if (!node) {
            var node_1 = this.create(MediaQuery);
            if (node_1.addChild(this._parseVariable())) {
                return this.finish(node_1);
            }
            return null;
        }
        return node;
    };
    LESSParser.prototype._parseMediaDeclaration = function (isNested) {
        if (isNested === void 0) { isNested = false; }
        return this._tryParseRuleset(isNested)
            || this._tryToParseDeclaration()
            || this._tryParseMixinDeclaration()
            || this._tryParseMixinReference()
            || this._parseDetachedRuleSetMixin()
            || this._parseStylesheetStatement(isNested);
    };
    LESSParser.prototype._parseMediaFeatureName = function () {
        return this._parseIdent() || this._parseVariable();
    };
    LESSParser.prototype._parseVariableDeclaration = function (panic) {
        if (panic === void 0) { panic = []; }
        var node = this.create(VariableDeclaration);
        var mark = this.mark();
        if (!node.setVariable(this._parseVariable(true))) {
            return null;
        }
        if (this.accept(TokenType.Colon)) {
            if (this.prevToken) {
                node.colonPosition = this.prevToken.offset;
            }
            if (node.setValue(this._parseDetachedRuleSet())) {
                node.needsSemicolon = false;
            }
            else if (!node.setValue(this._parseExpr())) {
                return this.finish(node, ParseError.VariableValueExpected, [], panic);
            }
            node.addChild(this._parsePrio());
        }
        else {
            this.restoreAtMark(mark);
            return null; // at keyword, but no ':', not a variable declaration but some at keyword
        }
        if (this.peek(TokenType.SemiColon)) {
            node.semicolonPosition = this.token.offset; // not part of the declaration, but useful information for code assist
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseDetachedRuleSet = function () {
        var mark = this.mark();
        // "Anonymous mixin" used in each() and possibly a generic type in the future
        if (this.peekDelim('#') || this.peekDelim('.')) {
            this.consumeToken();
            if (!this.hasWhitespace() && this.accept(TokenType.ParenthesisL)) {
                var node = this.create(MixinDeclaration);
                if (node.getParameters().addChild(this._parseMixinParameter())) {
                    while (this.accept(TokenType.Comma) || this.accept(TokenType.SemiColon)) {
                        if (this.peek(TokenType.ParenthesisR)) {
                            break;
                        }
                        if (!node.getParameters().addChild(this._parseMixinParameter())) {
                            this.markError(node, ParseError.IdentifierExpected, [], [TokenType.ParenthesisR]);
                        }
                    }
                }
                if (!this.accept(TokenType.ParenthesisR)) {
                    this.restoreAtMark(mark);
                    return null;
                }
            }
            else {
                this.restoreAtMark(mark);
                return null;
            }
        }
        if (!this.peek(TokenType.CurlyL)) {
            return null;
        }
        var content = this.create(BodyDeclaration);
        this._parseBody(content, this._parseDetachedRuleSetBody.bind(this));
        return this.finish(content);
    };
    LESSParser.prototype._parseDetachedRuleSetBody = function () {
        return this._tryParseKeyframeSelector() || this._parseRuleSetDeclaration();
    };
    LESSParser.prototype._addLookupChildren = function (node) {
        if (!node.addChild(this._parseLookupValue())) {
            return false;
        }
        var expectsValue = false;
        while (true) {
            if (this.peek(TokenType.BracketL)) {
                expectsValue = true;
            }
            if (!node.addChild(this._parseLookupValue())) {
                break;
            }
            expectsValue = false;
        }
        return !expectsValue;
    };
    LESSParser.prototype._parseLookupValue = function () {
        var node = this.create(Node);
        var mark = this.mark();
        if (!this.accept(TokenType.BracketL)) {
            this.restoreAtMark(mark);
            return null;
        }
        if (((node.addChild(this._parseVariable(false, true)) ||
            node.addChild(this._parsePropertyIdentifier())) &&
            this.accept(TokenType.BracketR)) || this.accept(TokenType.BracketR)) {
            return node;
        }
        this.restoreAtMark(mark);
        return null;
    };
    LESSParser.prototype._parseVariable = function (declaration, insideLookup) {
        if (declaration === void 0) { declaration = false; }
        if (insideLookup === void 0) { insideLookup = false; }
        var isPropertyReference = !declaration && this.peekDelim('$');
        if (!this.peekDelim('@') && !isPropertyReference && !this.peek(TokenType.AtKeyword)) {
            return null;
        }
        var node = this.create(Variable);
        var mark = this.mark();
        while (this.acceptDelim('@') || (!declaration && this.acceptDelim('$'))) {
            if (this.hasWhitespace()) {
                this.restoreAtMark(mark);
                return null;
            }
        }
        if (!this.accept(TokenType.AtKeyword) && !this.accept(TokenType.Ident)) {
            this.restoreAtMark(mark);
            return null;
        }
        if (!insideLookup && this.peek(TokenType.BracketL)) {
            if (!this._addLookupChildren(node)) {
                this.restoreAtMark(mark);
                return null;
            }
        }
        return node;
    };
    LESSParser.prototype._parseTermExpression = function () {
        return this._parseVariable() ||
            this._parseEscaped() ||
            _super.prototype._parseTermExpression.call(this) || // preference for colors before mixin references
            this._tryParseMixinReference(false);
    };
    LESSParser.prototype._parseEscaped = function () {
        if (this.peek(TokenType.EscapedJavaScript) ||
            this.peek(TokenType.BadEscapedJavaScript)) {
            var node = this.createNode(NodeType.EscapedValue);
            this.consumeToken();
            return this.finish(node);
        }
        if (this.peekDelim('~')) {
            var node = this.createNode(NodeType.EscapedValue);
            this.consumeToken();
            if (this.accept(TokenType.String) || this.accept(TokenType.EscapedJavaScript)) {
                return this.finish(node);
            }
            else {
                return this.finish(node, ParseError.TermExpected);
            }
        }
        return null;
    };
    LESSParser.prototype._parseOperator = function () {
        var node = this._parseGuardOperator();
        if (node) {
            return node;
        }
        else {
            return _super.prototype._parseOperator.call(this);
        }
    };
    LESSParser.prototype._parseGuardOperator = function () {
        if (this.peekDelim('>')) {
            var node = this.createNode(NodeType.Operator);
            this.consumeToken();
            this.acceptDelim('=');
            return node;
        }
        else if (this.peekDelim('=')) {
            var node = this.createNode(NodeType.Operator);
            this.consumeToken();
            this.acceptDelim('<');
            return node;
        }
        else if (this.peekDelim('<')) {
            var node = this.createNode(NodeType.Operator);
            this.consumeToken();
            this.acceptDelim('=');
            return node;
        }
        return null;
    };
    LESSParser.prototype._parseRuleSetDeclaration = function () {
        if (this.peek(TokenType.AtKeyword)) {
            return this._parseKeyframe()
                || this._parseMedia(true)
                || this._parseImport()
                || this._parseSupports(true) // @supports
                || this._parseDetachedRuleSetMixin() // less detached ruleset mixin
                || this._parseVariableDeclaration() // Variable declarations
                || _super.prototype._parseRuleSetDeclarationAtStatement.call(this);
        }
        return this._tryParseMixinDeclaration()
            || this._tryParseRuleset(true) // nested ruleset
            || this._tryParseMixinReference() // less mixin reference
            || this._parseFunction()
            || this._parseExtend() // less extend declaration
            || _super.prototype._parseRuleSetDeclaration.call(this); // try css ruleset declaration as the last option
    };
    LESSParser.prototype._parseKeyframeIdent = function () {
        return this._parseIdent([ReferenceType.Keyframe]) || this._parseVariable();
    };
    LESSParser.prototype._parseKeyframeSelector = function () {
        return this._parseDetachedRuleSetMixin() // less detached ruleset mixin
            || _super.prototype._parseKeyframeSelector.call(this);
    };
    LESSParser.prototype._parseSimpleSelectorBody = function () {
        return this._parseSelectorCombinator() || _super.prototype._parseSimpleSelectorBody.call(this);
    };
    LESSParser.prototype._parseSelector = function (isNested) {
        // CSS Guards
        var node = this.create(Selector);
        var hasContent = false;
        if (isNested) {
            // nested selectors can start with a combinator
            hasContent = node.addChild(this._parseCombinator());
        }
        while (node.addChild(this._parseSimpleSelector())) {
            hasContent = true;
            var mark = this.mark();
            if (node.addChild(this._parseGuard()) && this.peek(TokenType.CurlyL)) {
                break;
            }
            this.restoreAtMark(mark);
            node.addChild(this._parseCombinator()); // optional
        }
        return hasContent ? this.finish(node) : null;
    };
    LESSParser.prototype._parseSelectorCombinator = function () {
        if (this.peekDelim('&')) {
            var node = this.createNode(NodeType.SelectorCombinator);
            this.consumeToken();
            while (!this.hasWhitespace() && (this.acceptDelim('-') || this.accept(TokenType.Num) || this.accept(TokenType.Dimension) || node.addChild(this._parseIdent()) || this.acceptDelim('&'))) {
                //  support &-foo
            }
            return this.finish(node);
        }
        return null;
    };
    LESSParser.prototype._parseSelectorIdent = function () {
        if (!this.peekInterpolatedIdent()) {
            return null;
        }
        var node = this.createNode(NodeType.SelectorInterpolation);
        var hasContent = this._acceptInterpolatedIdent(node);
        return hasContent ? this.finish(node) : null;
    };
    LESSParser.prototype._parsePropertyIdentifier = function (inLookup) {
        if (inLookup === void 0) { inLookup = false; }
        var propertyRegex = /^[\w-]+/;
        if (!this.peekInterpolatedIdent() && !this.peekRegExp(this.token.type, propertyRegex)) {
            return null;
        }
        var mark = this.mark();
        var node = this.create(Identifier);
        node.isCustomProperty = this.acceptDelim('-') && this.acceptDelim('-');
        var childAdded = false;
        if (!inLookup) {
            if (node.isCustomProperty) {
                childAdded = this._acceptInterpolatedIdent(node);
            }
            else {
                childAdded = this._acceptInterpolatedIdent(node, propertyRegex);
            }
        }
        else {
            if (node.isCustomProperty) {
                childAdded = node.addChild(this._parseIdent());
            }
            else {
                childAdded = node.addChild(this._parseRegexp(propertyRegex));
            }
        }
        if (!childAdded) {
            this.restoreAtMark(mark);
            return null;
        }
        if (!inLookup && !this.hasWhitespace()) {
            this.acceptDelim('+');
            if (!this.hasWhitespace()) {
                this.acceptIdent('_');
            }
        }
        return this.finish(node);
    };
    LESSParser.prototype.peekInterpolatedIdent = function () {
        return this.peek(TokenType.Ident) ||
            this.peekDelim('@') ||
            this.peekDelim('$') ||
            this.peekDelim('-');
    };
    LESSParser.prototype._acceptInterpolatedIdent = function (node, identRegex) {
        var _this = this;
        var hasContent = false;
        var indentInterpolation = function () {
            var pos = _this.mark();
            if (_this.acceptDelim('-')) {
                if (!_this.hasWhitespace()) {
                    _this.acceptDelim('-');
                }
                if (_this.hasWhitespace()) {
                    _this.restoreAtMark(pos);
                    return null;
                }
            }
            return _this._parseInterpolation();
        };
        var accept = identRegex ?
            function () { return _this.acceptRegexp(identRegex); } :
            function () { return _this.accept(TokenType.Ident); };
        while (accept() ||
            node.addChild(this._parseInterpolation() ||
                this.try(indentInterpolation))) {
            hasContent = true;
            if (this.hasWhitespace()) {
                break;
            }
        }
        return hasContent;
    };
    LESSParser.prototype._parseInterpolation = function () {
        // @{name} Variable or
        // ${name} Property
        var mark = this.mark();
        if (this.peekDelim('@') || this.peekDelim('$')) {
            var node = this.createNode(NodeType.Interpolation);
            this.consumeToken();
            if (this.hasWhitespace() || !this.accept(TokenType.CurlyL)) {
                this.restoreAtMark(mark);
                return null;
            }
            if (!node.addChild(this._parseIdent())) {
                return this.finish(node, ParseError.IdentifierExpected);
            }
            if (!this.accept(TokenType.CurlyR)) {
                return this.finish(node, ParseError.RightCurlyExpected);
            }
            return this.finish(node);
        }
        return null;
    };
    LESSParser.prototype._tryParseMixinDeclaration = function () {
        var mark = this.mark();
        var node = this.create(MixinDeclaration);
        if (!node.setIdentifier(this._parseMixinDeclarationIdentifier()) || !this.accept(TokenType.ParenthesisL)) {
            this.restoreAtMark(mark);
            return null;
        }
        if (node.getParameters().addChild(this._parseMixinParameter())) {
            while (this.accept(TokenType.Comma) || this.accept(TokenType.SemiColon)) {
                if (this.peek(TokenType.ParenthesisR)) {
                    break;
                }
                if (!node.getParameters().addChild(this._parseMixinParameter())) {
                    this.markError(node, ParseError.IdentifierExpected, [], [TokenType.ParenthesisR]);
                }
            }
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            this.restoreAtMark(mark);
            return null;
        }
        node.setGuard(this._parseGuard());
        if (!this.peek(TokenType.CurlyL)) {
            this.restoreAtMark(mark);
            return null;
        }
        return this._parseBody(node, this._parseMixInBodyDeclaration.bind(this));
    };
    LESSParser.prototype._parseMixInBodyDeclaration = function () {
        return this._parseFontFace() || this._parseRuleSetDeclaration();
    };
    LESSParser.prototype._parseMixinDeclarationIdentifier = function () {
        var identifier;
        if (this.peekDelim('#') || this.peekDelim('.')) {
            identifier = this.create(Identifier);
            this.consumeToken(); // # or .
            if (this.hasWhitespace() || !identifier.addChild(this._parseIdent())) {
                return null;
            }
        }
        else if (this.peek(TokenType.Hash)) {
            identifier = this.create(Identifier);
            this.consumeToken(); // TokenType.Hash
        }
        else {
            return null;
        }
        identifier.referenceTypes = [ReferenceType.Mixin];
        return this.finish(identifier);
    };
    LESSParser.prototype._parsePseudo = function () {
        if (!this.peek(TokenType.Colon)) {
            return null;
        }
        var mark = this.mark();
        var node = this.create(ExtendsReference);
        this.consumeToken(); // :
        if (this.acceptIdent('extend')) {
            return this._completeExtends(node);
        }
        this.restoreAtMark(mark);
        return _super.prototype._parsePseudo.call(this);
    };
    LESSParser.prototype._parseExtend = function () {
        if (!this.peekDelim('&')) {
            return null;
        }
        var mark = this.mark();
        var node = this.create(ExtendsReference);
        this.consumeToken(); // &
        if (this.hasWhitespace() || !this.accept(TokenType.Colon) || !this.acceptIdent('extend')) {
            this.restoreAtMark(mark);
            return null;
        }
        return this._completeExtends(node);
    };
    LESSParser.prototype._completeExtends = function (node) {
        if (!this.accept(TokenType.ParenthesisL)) {
            return this.finish(node, ParseError.LeftParenthesisExpected);
        }
        var selectors = node.getSelectors();
        if (!selectors.addChild(this._parseSelector(true))) {
            return this.finish(node, ParseError.SelectorExpected);
        }
        while (this.accept(TokenType.Comma)) {
            if (!selectors.addChild(this._parseSelector(true))) {
                return this.finish(node, ParseError.SelectorExpected);
            }
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseDetachedRuleSetMixin = function () {
        if (!this.peek(TokenType.AtKeyword)) {
            return null;
        }
        var mark = this.mark();
        var node = this.create(MixinReference);
        if (node.addChild(this._parseVariable(true)) && (this.hasWhitespace() || !this.accept(TokenType.ParenthesisL))) {
            this.restoreAtMark(mark);
            return null;
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    LESSParser.prototype._tryParseMixinReference = function (atRoot) {
        if (atRoot === void 0) { atRoot = true; }
        var mark = this.mark();
        var node = this.create(MixinReference);
        var identifier = this._parseMixinDeclarationIdentifier();
        while (identifier) {
            this.acceptDelim('>');
            var nextId = this._parseMixinDeclarationIdentifier();
            if (nextId) {
                node.getNamespaces().addChild(identifier);
                identifier = nextId;
            }
            else {
                break;
            }
        }
        if (!node.setIdentifier(identifier)) {
            this.restoreAtMark(mark);
            return null;
        }
        var hasArguments = false;
        if (this.accept(TokenType.ParenthesisL)) {
            hasArguments = true;
            if (node.getArguments().addChild(this._parseMixinArgument())) {
                while (this.accept(TokenType.Comma) || this.accept(TokenType.SemiColon)) {
                    if (this.peek(TokenType.ParenthesisR)) {
                        break;
                    }
                    if (!node.getArguments().addChild(this._parseMixinArgument())) {
                        return this.finish(node, ParseError.ExpressionExpected);
                    }
                }
            }
            if (!this.accept(TokenType.ParenthesisR)) {
                return this.finish(node, ParseError.RightParenthesisExpected);
            }
            identifier.referenceTypes = [ReferenceType.Mixin];
        }
        else {
            identifier.referenceTypes = [ReferenceType.Mixin, ReferenceType.Rule];
        }
        if (this.peek(TokenType.BracketL)) {
            if (!atRoot) {
                this._addLookupChildren(node);
            }
        }
        else {
            node.addChild(this._parsePrio());
        }
        if (!hasArguments && !this.peek(TokenType.SemiColon) && !this.peek(TokenType.CurlyR) && !this.peek(TokenType.EOF)) {
            this.restoreAtMark(mark);
            return null;
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseMixinArgument = function () {
        // [variableName ':'] expression | variableName '...'
        var node = this.create(FunctionArgument);
        var pos = this.mark();
        var argument = this._parseVariable();
        if (argument) {
            if (!this.accept(TokenType.Colon)) {
                this.restoreAtMark(pos);
            }
            else {
                node.setIdentifier(argument);
            }
        }
        if (node.setValue(this._parseDetachedRuleSet() || this._parseExpr(true))) {
            return this.finish(node);
        }
        this.restoreAtMark(pos);
        return null;
    };
    LESSParser.prototype._parseMixinParameter = function () {
        var node = this.create(FunctionParameter);
        // special rest variable: @rest...
        if (this.peekKeyword('@rest')) {
            var restNode = this.create(Node);
            this.consumeToken();
            if (!this.accept(Ellipsis$1)) {
                return this.finish(node, ParseError.DotExpected, [], [TokenType.Comma, TokenType.ParenthesisR]);
            }
            node.setIdentifier(this.finish(restNode));
            return this.finish(node);
        }
        // special const args: ...
        if (this.peek(Ellipsis$1)) {
            var varargsNode = this.create(Node);
            this.consumeToken();
            node.setIdentifier(this.finish(varargsNode));
            return this.finish(node);
        }
        var hasContent = false;
        // default variable declaration: @param: 12 or @name
        if (node.setIdentifier(this._parseVariable())) {
            this.accept(TokenType.Colon);
            hasContent = true;
        }
        if (!node.setDefaultValue(this._parseDetachedRuleSet() || this._parseExpr(true)) && !hasContent) {
            return null;
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseGuard = function () {
        if (!this.peekIdent('when')) {
            return null;
        }
        var node = this.create(LessGuard);
        this.consumeToken(); // when
        node.isNegated = this.acceptIdent('not');
        if (!node.getConditions().addChild(this._parseGuardCondition())) {
            return this.finish(node, ParseError.ConditionExpected);
        }
        while (this.acceptIdent('and') || this.accept(TokenType.Comma)) {
            if (!node.getConditions().addChild(this._parseGuardCondition())) {
                return this.finish(node, ParseError.ConditionExpected);
            }
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseGuardCondition = function () {
        if (!this.peek(TokenType.ParenthesisL)) {
            return null;
        }
        var node = this.create(GuardCondition);
        this.consumeToken(); // ParenthesisL
        if (!node.addChild(this._parseExpr())) ;
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseFunction = function () {
        var pos = this.mark();
        var node = this.create(Function);
        if (!node.setIdentifier(this._parseFunctionIdentifier())) {
            return null;
        }
        if (this.hasWhitespace() || !this.accept(TokenType.ParenthesisL)) {
            this.restoreAtMark(pos);
            return null;
        }
        if (node.getArguments().addChild(this._parseMixinArgument())) {
            while (this.accept(TokenType.Comma) || this.accept(TokenType.SemiColon)) {
                if (this.peek(TokenType.ParenthesisR)) {
                    break;
                }
                if (!node.getArguments().addChild(this._parseMixinArgument())) {
                    return this.finish(node, ParseError.ExpressionExpected);
                }
            }
        }
        if (!this.accept(TokenType.ParenthesisR)) {
            return this.finish(node, ParseError.RightParenthesisExpected);
        }
        return this.finish(node);
    };
    LESSParser.prototype._parseFunctionIdentifier = function () {
        if (this.peekDelim('%')) {
            var node = this.create(Identifier);
            node.referenceTypes = [ReferenceType.Function];
            this.consumeToken();
            return this.finish(node);
        }
        return _super.prototype._parseFunctionIdentifier.call(this);
    };
    LESSParser.prototype._parseURLArgument = function () {
        var pos = this.mark();
        var node = _super.prototype._parseURLArgument.call(this);
        if (!node || !this.peek(TokenType.ParenthesisR)) {
            this.restoreAtMark(pos);
            var node_2 = this.create(Node);
            node_2.addChild(this._parseBinaryExpr());
            return this.finish(node_2);
        }
        return node;
    };
    return LESSParser;
}(Parser));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var localize$9 = loadMessageBundle();
var LESSCompletion = /** @class */ (function (_super) {
    __extends$8(LESSCompletion, _super);
    function LESSCompletion(lsOptions, cssDataManager) {
        return _super.call(this, '@', lsOptions, cssDataManager) || this;
    }
    LESSCompletion.prototype.createFunctionProposals = function (proposals, existingNode, sortToEnd, result) {
        for (var _i = 0, proposals_1 = proposals; _i < proposals_1.length; _i++) {
            var p = proposals_1[_i];
            var item = {
                label: p.name,
                detail: p.example,
                documentation: p.description,
                textEdit: TextEdit.replace(this.getCompletionRange(existingNode), p.name + '($0)'),
                insertTextFormat: InsertTextFormat.Snippet,
                kind: CompletionItemKind.Function
            };
            if (sortToEnd) {
                item.sortText = 'z';
            }
            result.items.push(item);
        }
        return result;
    };
    LESSCompletion.prototype.getTermProposals = function (entry, existingNode, result) {
        var functions = LESSCompletion.builtInProposals;
        if (entry) {
            functions = functions.filter(function (f) { return !f.type || !entry.restrictions || entry.restrictions.indexOf(f.type) !== -1; });
        }
        this.createFunctionProposals(functions, existingNode, true, result);
        return _super.prototype.getTermProposals.call(this, entry, existingNode, result);
    };
    LESSCompletion.prototype.getColorProposals = function (entry, existingNode, result) {
        this.createFunctionProposals(LESSCompletion.colorProposals, existingNode, false, result);
        return _super.prototype.getColorProposals.call(this, entry, existingNode, result);
    };
    LESSCompletion.prototype.getCompletionsForDeclarationProperty = function (declaration, result) {
        this.getCompletionsForSelector(null, true, result);
        return _super.prototype.getCompletionsForDeclarationProperty.call(this, declaration, result);
    };
    LESSCompletion.builtInProposals = [
        // Boolean functions
        {
            'name': 'if',
            'example': 'if(condition, trueValue [, falseValue]);',
            'description': localize$9('less.builtin.if', 'returns one of two values depending on a condition.')
        },
        {
            'name': 'boolean',
            'example': 'boolean(condition);',
            'description': localize$9('less.builtin.boolean', '"store" a boolean test for later evaluation in a guard or if().')
        },
        // List functions
        {
            'name': 'length',
            'example': 'length(@list);',
            'description': localize$9('less.builtin.length', 'returns the number of elements in a value list')
        },
        {
            'name': 'extract',
            'example': 'extract(@list, index);',
            'description': localize$9('less.builtin.extract', 'returns a value at the specified position in the list')
        },
        {
            'name': 'range',
            'example': 'range([start, ] end [, step]);',
            'description': localize$9('less.builtin.range', 'generate a list spanning a range of values')
        },
        {
            'name': 'each',
            'example': 'each(@list, ruleset);',
            'description': localize$9('less.builtin.each', 'bind the evaluation of a ruleset to each member of a list.')
        },
        // Other built-ins
        {
            'name': 'escape',
            'example': 'escape(@string);',
            'description': localize$9('less.builtin.escape', 'URL encodes a string')
        },
        {
            'name': 'e',
            'example': 'e(@string);',
            'description': localize$9('less.builtin.e', 'escape string content')
        },
        {
            'name': 'replace',
            'example': 'replace(@string, @pattern, @replacement[, @flags]);',
            'description': localize$9('less.builtin.replace', 'string replace')
        },
        {
            'name': 'unit',
            'example': 'unit(@dimension, [@unit: \'\']);',
            'description': localize$9('less.builtin.unit', 'remove or change the unit of a dimension')
        },
        {
            'name': 'color',
            'example': 'color(@string);',
            'description': localize$9('less.builtin.color', 'parses a string to a color'),
            'type': 'color'
        },
        {
            'name': 'convert',
            'example': 'convert(@value, unit);',
            'description': localize$9('less.builtin.convert', 'converts numbers from one type into another')
        },
        {
            'name': 'data-uri',
            'example': 'data-uri([mimetype,] url);',
            'description': localize$9('less.builtin.data-uri', 'inlines a resource and falls back to `url()`'),
            'type': 'url'
        },
        {
            'name': 'abs',
            'description': localize$9('less.builtin.abs', 'absolute value of a number'),
            'example': 'abs(number);'
        },
        {
            'name': 'acos',
            'description': localize$9('less.builtin.acos', 'arccosine - inverse of cosine function'),
            'example': 'acos(number);'
        },
        {
            'name': 'asin',
            'description': localize$9('less.builtin.asin', 'arcsine - inverse of sine function'),
            'example': 'asin(number);'
        },
        {
            'name': 'ceil',
            'example': 'ceil(@number);',
            'description': localize$9('less.builtin.ceil', 'rounds up to an integer')
        },
        {
            'name': 'cos',
            'description': localize$9('less.builtin.cos', 'cosine function'),
            'example': 'cos(number);'
        },
        {
            'name': 'floor',
            'description': localize$9('less.builtin.floor', 'rounds down to an integer'),
            'example': 'floor(@number);'
        },
        {
            'name': 'percentage',
            'description': localize$9('less.builtin.percentage', 'converts to a %, e.g. 0.5 > 50%'),
            'example': 'percentage(@number);',
            'type': 'percentage'
        },
        {
            'name': 'round',
            'description': localize$9('less.builtin.round', 'rounds a number to a number of places'),
            'example': 'round(number, [places: 0]);'
        },
        {
            'name': 'sqrt',
            'description': localize$9('less.builtin.sqrt', 'calculates square root of a number'),
            'example': 'sqrt(number);'
        },
        {
            'name': 'sin',
            'description': localize$9('less.builtin.sin', 'sine function'),
            'example': 'sin(number);'
        },
        {
            'name': 'tan',
            'description': localize$9('less.builtin.tan', 'tangent function'),
            'example': 'tan(number);'
        },
        {
            'name': 'atan',
            'description': localize$9('less.builtin.atan', 'arctangent - inverse of tangent function'),
            'example': 'atan(number);'
        },
        {
            'name': 'pi',
            'description': localize$9('less.builtin.pi', 'returns pi'),
            'example': 'pi();'
        },
        {
            'name': 'pow',
            'description': localize$9('less.builtin.pow', 'first argument raised to the power of the second argument'),
            'example': 'pow(@base, @exponent);'
        },
        {
            'name': 'mod',
            'description': localize$9('less.builtin.mod', 'first argument modulus second argument'),
            'example': 'mod(number, number);'
        },
        {
            'name': 'min',
            'description': localize$9('less.builtin.min', 'returns the lowest of one or more values'),
            'example': 'min(@x, @y);'
        },
        {
            'name': 'max',
            'description': localize$9('less.builtin.max', 'returns the lowest of one or more values'),
            'example': 'max(@x, @y);'
        }
    ];
    LESSCompletion.colorProposals = [
        {
            'name': 'argb',
            'example': 'argb(@color);',
            'description': localize$9('less.builtin.argb', 'creates a #AARRGGBB')
        },
        {
            'name': 'hsl',
            'example': 'hsl(@hue, @saturation, @lightness);',
            'description': localize$9('less.builtin.hsl', 'creates a color')
        },
        {
            'name': 'hsla',
            'example': 'hsla(@hue, @saturation, @lightness, @alpha);',
            'description': localize$9('less.builtin.hsla', 'creates a color')
        },
        {
            'name': 'hsv',
            'example': 'hsv(@hue, @saturation, @value);',
            'description': localize$9('less.builtin.hsv', 'creates a color')
        },
        {
            'name': 'hsva',
            'example': 'hsva(@hue, @saturation, @value, @alpha);',
            'description': localize$9('less.builtin.hsva', 'creates a color')
        },
        {
            'name': 'hue',
            'example': 'hue(@color);',
            'description': localize$9('less.builtin.hue', 'returns the `hue` channel of `@color` in the HSL space')
        },
        {
            'name': 'saturation',
            'example': 'saturation(@color);',
            'description': localize$9('less.builtin.saturation', 'returns the `saturation` channel of `@color` in the HSL space')
        },
        {
            'name': 'lightness',
            'example': 'lightness(@color);',
            'description': localize$9('less.builtin.lightness', 'returns the `lightness` channel of `@color` in the HSL space')
        },
        {
            'name': 'hsvhue',
            'example': 'hsvhue(@color);',
            'description': localize$9('less.builtin.hsvhue', 'returns the `hue` channel of `@color` in the HSV space')
        },
        {
            'name': 'hsvsaturation',
            'example': 'hsvsaturation(@color);',
            'description': localize$9('less.builtin.hsvsaturation', 'returns the `saturation` channel of `@color` in the HSV space')
        },
        {
            'name': 'hsvvalue',
            'example': 'hsvvalue(@color);',
            'description': localize$9('less.builtin.hsvvalue', 'returns the `value` channel of `@color` in the HSV space')
        },
        {
            'name': 'red',
            'example': 'red(@color);',
            'description': localize$9('less.builtin.red', 'returns the `red` channel of `@color`')
        },
        {
            'name': 'green',
            'example': 'green(@color);',
            'description': localize$9('less.builtin.green', 'returns the `green` channel of `@color`')
        },
        {
            'name': 'blue',
            'example': 'blue(@color);',
            'description': localize$9('less.builtin.blue', 'returns the `blue` channel of `@color`')
        },
        {
            'name': 'alpha',
            'example': 'alpha(@color);',
            'description': localize$9('less.builtin.alpha', 'returns the `alpha` channel of `@color`')
        },
        {
            'name': 'luma',
            'example': 'luma(@color);',
            'description': localize$9('less.builtin.luma', 'returns the `luma` value (perceptual brightness) of `@color`')
        },
        {
            'name': 'saturate',
            'example': 'saturate(@color, 10%);',
            'description': localize$9('less.builtin.saturate', 'return `@color` 10% points more saturated')
        },
        {
            'name': 'desaturate',
            'example': 'desaturate(@color, 10%);',
            'description': localize$9('less.builtin.desaturate', 'return `@color` 10% points less saturated')
        },
        {
            'name': 'lighten',
            'example': 'lighten(@color, 10%);',
            'description': localize$9('less.builtin.lighten', 'return `@color` 10% points lighter')
        },
        {
            'name': 'darken',
            'example': 'darken(@color, 10%);',
            'description': localize$9('less.builtin.darken', 'return `@color` 10% points darker')
        },
        {
            'name': 'fadein',
            'example': 'fadein(@color, 10%);',
            'description': localize$9('less.builtin.fadein', 'return `@color` 10% points less transparent')
        },
        {
            'name': 'fadeout',
            'example': 'fadeout(@color, 10%);',
            'description': localize$9('less.builtin.fadeout', 'return `@color` 10% points more transparent')
        },
        {
            'name': 'fade',
            'example': 'fade(@color, 50%);',
            'description': localize$9('less.builtin.fade', 'return `@color` with 50% transparency')
        },
        {
            'name': 'spin',
            'example': 'spin(@color, 10);',
            'description': localize$9('less.builtin.spin', 'return `@color` with a 10 degree larger in hue')
        },
        {
            'name': 'mix',
            'example': 'mix(@color1, @color2, [@weight: 50%]);',
            'description': localize$9('less.builtin.mix', 'return a mix of `@color1` and `@color2`')
        },
        {
            'name': 'greyscale',
            'example': 'greyscale(@color);',
            'description': localize$9('less.builtin.greyscale', 'returns a grey, 100% desaturated color'),
        },
        {
            'name': 'contrast',
            'example': 'contrast(@color1, [@darkcolor: black], [@lightcolor: white], [@threshold: 43%]);',
            'description': localize$9('less.builtin.contrast', 'return `@darkcolor` if `@color1 is> 43% luma` otherwise return `@lightcolor`, see notes')
        },
        {
            'name': 'multiply',
            'example': 'multiply(@color1, @color2);'
        },
        {
            'name': 'screen',
            'example': 'screen(@color1, @color2);'
        },
        {
            'name': 'overlay',
            'example': 'overlay(@color1, @color2);'
        },
        {
            'name': 'softlight',
            'example': 'softlight(@color1, @color2);'
        },
        {
            'name': 'hardlight',
            'example': 'hardlight(@color1, @color2);'
        },
        {
            'name': 'difference',
            'example': 'difference(@color1, @color2);'
        },
        {
            'name': 'exclusion',
            'example': 'exclusion(@color1, @color2);'
        },
        {
            'name': 'average',
            'example': 'average(@color1, @color2);'
        },
        {
            'name': 'negation',
            'example': 'negation(@color1, @color2);'
        }
    ];
    return LESSCompletion;
}(CSSCompletion));

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SCSSNavigation = /** @class */ (function (_super) {
    __extends$9(SCSSNavigation, _super);
    function SCSSNavigation(fileSystemProvider) {
        return _super.call(this, fileSystemProvider) || this;
    }
    SCSSNavigation.prototype.isRawStringDocumentLinkNode = function (node) {
        return (_super.prototype.isRawStringDocumentLinkNode.call(this, node) ||
            node.type === NodeType.Use ||
            node.type === NodeType.Forward);
    };
    SCSSNavigation.prototype.resolveRelativeReference = function (ref, documentUri, documentContext) {
        return __awaiter$3(this, void 0, void 0, function () {
            function toPathVariations(uri) {
                // No valid path
                if (uri.path === '') {
                    return undefined;
                }
                // No variation for links that ends with suffix
                if (uri.path.endsWith('.scss') || uri.path.endsWith('.css')) {
                    return undefined;
                }
                // If a link is like a/, try resolving a/index.scss and a/_index.scss
                if (uri.path.endsWith('/')) {
                    return [
                        uri.with({ path: uri.path + 'index.scss' }).toString(),
                        uri.with({ path: uri.path + '_index.scss' }).toString()
                    ];
                }
                // Use `uri.path` since it's normalized to use `/` in all platforms
                var pathFragments = uri.path.split('/');
                var basename = pathFragments[pathFragments.length - 1];
                var pathWithoutBasename = uri.path.slice(0, -basename.length);
                // No variation for links such as _a
                if (basename.startsWith('_')) {
                    if (uri.path.endsWith('.scss')) {
                        return undefined;
                    }
                    else {
                        return [uri.with({ path: uri.path + '.scss' }).toString()];
                    }
                }
                var normalizedBasename = basename + '.scss';
                var documentUriWithBasename = function (newBasename) {
                    return uri.with({ path: pathWithoutBasename + newBasename }).toString();
                };
                var normalizedPath = documentUriWithBasename(normalizedBasename);
                var underScorePath = documentUriWithBasename('_' + normalizedBasename);
                var indexPath = documentUriWithBasename(normalizedBasename.slice(0, -5) + '/index.scss');
                var indexUnderscoreUri = documentUriWithBasename(normalizedBasename.slice(0, -5) + '/_index.scss');
                var cssPath = documentUriWithBasename(normalizedBasename.slice(0, -5) + '.css');
                return [normalizedPath, underScorePath, indexPath, indexUnderscoreUri, cssPath];
            }
            var target, parsedUri, pathVariations, j;
            return __generator$3(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (startsWith(ref, 'sass:')) {
                            return [2 /*return*/, undefined]; // sass library
                        }
                        return [4 /*yield*/, _super.prototype.resolveRelativeReference.call(this, ref, documentUri, documentContext)];
                    case 1:
                        target = _a.sent();
                        if (!(this.fileSystemProvider && target)) return [3 /*break*/, 8];
                        parsedUri = URI.parse(target);
                        if (!(parsedUri.path && Utils.extname(parsedUri).length === 0)) return [3 /*break*/, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        pathVariations = toPathVariations(parsedUri);
                        if (!pathVariations) return [3 /*break*/, 6];
                        j = 0;
                        _a.label = 3;
                    case 3:
                        if (!(j < pathVariations.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.fileExists(pathVariations[j])];
                    case 4:
                        if (_a.sent()) {
                            return [2 /*return*/, pathVariations[j]];
                        }
                        _a.label = 5;
                    case 5:
                        j++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, undefined];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, target];
                }
            });
        });
    };
    return SCSSNavigation;
}(CSSNavigation));

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
                window.clearTimeout(handle);
                handle = window.setTimeout(function () { return _this._doValidate(model.uri, modeId); }, 500);
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
        this._disposables.push(editor.onWillDisposeModel(onModelRemoved));
        this._disposables.push(editor.onDidChangeModelLanguage(function (event) {
            onModelRemoved(event.model);
            onModelAdd(event.model);
        }));
        defaults.onDidChange(function (_) {
            editor.getModels().forEach(function (model) {
                if (model.getModeId() === _this._languageId) {
                    onModelRemoved(model);
                    onModelAdd(model);
                }
            });
        });
        this._disposables.push({
            dispose: function () {
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
    DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
        this._worker(resource)
            .then(function (worker) {
            return worker.doValidation(resource.toString());
        })
            .then(function (diagnostics) {
            var markers = diagnostics.map(function (d) { return toDiagnostics(resource, d); });
            var model = editor.getModel(resource);
            if (model && model.getModeId() === languageId) {
                editor.setModelMarkers(model, languageId, markers);
            }
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
    return (thing && typeof thing === 'object' && typeof thing.kind === 'string');
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
// --- document highlights ------
function toDocumentHighlightKind(kind) {
    switch (kind) {
        case DocumentHighlightKind.Read:
            return languages.DocumentHighlightKind.Read;
        case DocumentHighlightKind.Write:
            return languages.DocumentHighlightKind.Write;
        case DocumentHighlightKind.Text:
            return languages.DocumentHighlightKind.Text;
    }
    return languages.DocumentHighlightKind.Text;
}
var DocumentHighlightAdapter = /** @class */ (function () {
    function DocumentHighlightAdapter(_worker) {
        this._worker = _worker;
    }
    DocumentHighlightAdapter.prototype.provideDocumentHighlights = function (model, position, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.findDocumentHighlights(resource.toString(), fromPosition(position));
        })
            .then(function (entries) {
            if (!entries) {
                return;
            }
            return entries.map(function (entry) {
                return {
                    range: toRange(entry.range),
                    kind: toDocumentHighlightKind(entry.kind)
                };
            });
        });
    };
    return DocumentHighlightAdapter;
}());
// --- definition ------
function toLocation(location) {
    return {
        uri: Uri.parse(location.uri),
        range: toRange(location.range)
    };
}
var DefinitionAdapter = /** @class */ (function () {
    function DefinitionAdapter(_worker) {
        this._worker = _worker;
    }
    DefinitionAdapter.prototype.provideDefinition = function (model, position, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.findDefinition(resource.toString(), fromPosition(position));
        })
            .then(function (definition) {
            if (!definition) {
                return;
            }
            return [toLocation(definition)];
        });
    };
    return DefinitionAdapter;
}());
// --- references ------
var ReferenceAdapter = /** @class */ (function () {
    function ReferenceAdapter(_worker) {
        this._worker = _worker;
    }
    ReferenceAdapter.prototype.provideReferences = function (model, position, context, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.findReferences(resource.toString(), fromPosition(position));
        })
            .then(function (entries) {
            if (!entries) {
                return;
            }
            return entries.map(toLocation);
        });
    };
    return ReferenceAdapter;
}());
// --- rename ------
function toWorkspaceEdit(edit) {
    if (!edit || !edit.changes) {
        return void 0;
    }
    var resourceEdits = [];
    for (var uri in edit.changes) {
        var _uri = Uri.parse(uri);
        // let edits: languages.TextEdit[] = [];
        for (var _i = 0, _a = edit.changes[uri]; _i < _a.length; _i++) {
            var e = _a[_i];
            resourceEdits.push({
                resource: _uri,
                edit: {
                    range: toRange(e.range),
                    text: e.newText
                }
            });
        }
    }
    return {
        edits: resourceEdits
    };
}
var RenameAdapter = /** @class */ (function () {
    function RenameAdapter(_worker) {
        this._worker = _worker;
    }
    RenameAdapter.prototype.provideRenameEdits = function (model, position, newName, token) {
        var resource = model.uri;
        return this._worker(resource)
            .then(function (worker) {
            return worker.doRename(resource.toString(), fromPosition(position), newName);
        })
            .then(function (edit) {
            return toWorkspaceEdit(edit);
        });
    };
    return RenameAdapter;
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
                tags: [],
                range: toRange(item.location.range),
                selectionRange: toRange(item.location.range)
            }); });
        });
    };
    return DocumentSymbolAdapter;
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
        if (modeConfiguration.completionItems) {
            providers.push(languages.registerCompletionItemProvider(languageId, new CompletionAdapter(worker)));
        }
        if (modeConfiguration.hovers) {
            providers.push(languages.registerHoverProvider(languageId, new HoverAdapter(worker)));
        }
        if (modeConfiguration.documentHighlights) {
            providers.push(languages.registerDocumentHighlightProvider(languageId, new DocumentHighlightAdapter(worker)));
        }
        if (modeConfiguration.definitions) {
            providers.push(languages.registerDefinitionProvider(languageId, new DefinitionAdapter(worker)));
        }
        if (modeConfiguration.references) {
            providers.push(languages.registerReferenceProvider(languageId, new ReferenceAdapter(worker)));
        }
        if (modeConfiguration.documentSymbols) {
            providers.push(languages.registerDocumentSymbolProvider(languageId, new DocumentSymbolAdapter(worker)));
        }
        if (modeConfiguration.rename) {
            providers.push(languages.registerRenameProvider(languageId, new RenameAdapter(worker)));
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

export { setupMode };
