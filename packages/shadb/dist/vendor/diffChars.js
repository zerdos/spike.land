function Diff() {
}
Diff.prototype = {
    diff: function diff(oldString, newString) {
        var options = arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : {};
        var callback = options.callback;
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        this.options = options;
        var self = this;
        function done(value) {
            if (callback) {
                setTimeout(function () {
                    callback(undefined, value);
                }, 0);
                return true;
            }
            else {
                return value;
            }
        }
        oldString = this.castInput(oldString);
        newString = this.castInput(newString);
        oldString = this.removeEmpty(this.tokenize(oldString));
        newString = this.removeEmpty(this.tokenize(newString));
        var newLen = newString.length, oldLen = oldString.length;
        var editLength = 1;
        var maxEditLength = newLen + oldLen;
        var bestPath = [
            {
                newPos: -1,
                components: [],
            },
        ];
        var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
        if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
            return done([
                {
                    value: this.join(newString),
                    count: newString.length,
                },
            ]);
        }
        function execEditLength() {
            for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
                var basePath = void 0;
                var addPath = bestPath[diagonalPath - 1], removePath = bestPath[diagonalPath + 1], _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
                if (addPath) {
                    bestPath[diagonalPath - 1] = undefined;
                }
                var canAdd = addPath && addPath.newPos + 1 < newLen, canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
                if (!canAdd && !canRemove) {
                    bestPath[diagonalPath] = undefined;
                    continue;
                }
                if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
                    basePath = clonePath(removePath);
                    self.pushComponent(basePath.components, undefined, true);
                }
                else {
                    basePath = addPath;
                    basePath.newPos++;
                    self.pushComponent(basePath.components, true, undefined);
                }
                _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);
                if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
                    return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
                }
                else {
                    bestPath[diagonalPath] = basePath;
                }
            }
            editLength++;
        }
        if (callback) {
            (function exec() {
                setTimeout(function () {
                    if (editLength > maxEditLength) {
                        return callback();
                    }
                    if (!execEditLength()) {
                        exec();
                    }
                }, 0);
            })();
        }
        else {
            while (editLength <= maxEditLength) {
                var ret = execEditLength();
                if (ret) {
                    return ret;
                }
            }
        }
    },
    pushComponent: function pushComponent(components, added, removed) {
        var last = components[components.length - 1];
        if (last && last.added === added && last.removed === removed) {
            components[components.length - 1] = {
                count: last.count + 1,
                added: added,
                removed: removed,
            };
        }
        else {
            components.push({
                count: 1,
                added: added,
                removed: removed,
            });
        }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
        var newLen = newString.length, oldLen = oldString.length, newPos = basePath.newPos, oldPos = newPos - diagonalPath, commonCount = 0;
        while (newPos + 1 < newLen && oldPos + 1 < oldLen &&
            this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
            newPos++;
            oldPos++;
            commonCount++;
        }
        if (commonCount) {
            basePath.components.push({
                count: commonCount,
            });
        }
        basePath.newPos = newPos;
        return oldPos;
    },
    equals: function equals(left, right) {
        if (this.options.comparator) {
            return this.options.comparator(left, right);
        }
        else {
            return left === right ||
                this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
        }
    },
    removeEmpty: function removeEmpty(array) {
        var ret = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i]) {
                ret.push(array[i]);
            }
        }
        return ret;
    },
    castInput: function castInput(value) {
        return value;
    },
    tokenize: function tokenize(value) {
        return value.split("");
    },
    join: function join(chars) {
        return chars.join("");
    },
};
function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
    for (; componentPos < componentLen; componentPos++) {
        var component = components[componentPos];
        if (!component.removed) {
            if (!component.added && useLongestToken) {
                var value = newString.slice(newPos, newPos + component.count);
                value = value.map(function (value1, i) {
                    var oldValue = oldString[oldPos + i];
                    return oldValue.length > value1.length ? oldValue : value1;
                });
                component.value = diff.join(value);
            }
            else {
                component.value = diff.join(newString.slice(newPos, newPos + component.count));
            }
            newPos += component.count;
            if (!component.added) {
                oldPos += component.count;
            }
        }
        else {
            component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
            oldPos += component.count;
            if (componentPos && components[componentPos - 1].added) {
                var tmp = components[componentPos - 1];
                components[componentPos - 1] = components[componentPos];
                components[componentPos] = tmp;
            }
        }
    }
    var lastComponent = components[componentLen - 1];
    if (componentLen > 1 && typeof lastComponent.value === "string" &&
        (lastComponent.added || lastComponent.removed) &&
        diff.equals("", lastComponent.value)) {
        components[componentLen - 2].value += lastComponent.value;
        components.pop();
    }
    return components;
}
function clonePath(path) {
    return {
        newPos: path.newPos,
        components: path.components.slice(0),
    };
}
var characterDiff = new Diff();
function diffChars1(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
}
var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
var reWhitespace = /\S/;
var wordDiff = new Diff();
wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
        left = left.toLowerCase();
        right = right.toLowerCase();
    }
    return left === right ||
        this.options.ignoreWhitespace && !reWhitespace.test(left) &&
            !reWhitespace.test(right);
};
wordDiff.tokenize = function (value) {
    var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
    for (var i = 0; i < tokens.length - 1; i++) {
        if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) &&
            extendedWordChars.test(tokens[i + 2])) {
            tokens[i] += tokens[i + 2];
            tokens.splice(i + 1, 2);
            i--;
        }
    }
    return tokens;
};
var lineDiff = new Diff();
lineDiff.tokenize = function (value) {
    var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
        linesAndNewlines.pop();
    }
    for (var i = 0; i < linesAndNewlines.length; i++) {
        var line = linesAndNewlines[i];
        if (i % 2 && !this.options.newlineIsToken) {
            retLines[retLines.length - 1] += line;
        }
        else {
            if (this.options.ignoreWhitespace) {
                line = line.trim();
            }
            retLines.push(line);
        }
    }
    return retLines;
};
var sentenceDiff = new Diff();
sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var cssDiff = new Diff();
cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
};
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj1) {
            return typeof obj1;
        };
    }
    else {
        _typeof = function (obj1) {
            return obj1 && typeof Symbol === "function" &&
                obj1.constructor === Symbol && obj1 !== Symbol.prototype
                ? "symbol"
                : typeof obj1;
        };
    }
    return _typeof(obj);
}
var objectPrototypeToString = Object.prototype.toString;
var jsonDiff = new Diff();
jsonDiff.useLongestToken = true;
jsonDiff.tokenize = lineDiff.tokenize;
jsonDiff.castInput = function (value) {
    var _this$options = this.options, undefinedReplacement = _this$options.undefinedReplacement, _this$options$stringi = _this$options.stringifyReplacer, stringifyReplacer = _this$options$stringi === void 0
        ? function (k, v) {
            return typeof v === "undefined" ? undefinedReplacement : v;
        }
        : _this$options$stringi;
    return typeof value === "string"
        ? value
        : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, "  ");
};
jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"));
};
function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];
    if (replacer) {
        obj = replacer(key, obj);
    }
    var i;
    for (i = 0; i < stack.length; i += 1) {
        if (stack[i] === obj) {
            return replacementStack[i];
        }
    }
    var canonicalizedObj;
    if ("[object Array]" === objectPrototypeToString.call(obj)) {
        stack.push(obj);
        canonicalizedObj = new Array(obj.length);
        replacementStack.push(canonicalizedObj);
        for (i = 0; i < obj.length; i += 1) {
            canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
        }
        stack.pop();
        replacementStack.pop();
        return canonicalizedObj;
    }
    if (obj && obj.toJSON) {
        obj = obj.toJSON();
    }
    if (_typeof(obj) === "object" && obj !== null) {
        stack.push(obj);
        canonicalizedObj = {};
        replacementStack.push(canonicalizedObj);
        var sortedKeys = [], _key;
        for (_key in obj) {
            if (obj.hasOwnProperty(_key)) {
                sortedKeys.push(_key);
            }
        }
        sortedKeys.sort();
        for (i = 0; i < sortedKeys.length; i += 1) {
            _key = sortedKeys[i];
            canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
        }
        stack.pop();
        replacementStack.pop();
    }
    else {
        canonicalizedObj = obj;
    }
    return canonicalizedObj;
}
var arrayDiff = new Diff();
arrayDiff.tokenize = function (value) {
    return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
};
export { diffChars1 as diffChars };
