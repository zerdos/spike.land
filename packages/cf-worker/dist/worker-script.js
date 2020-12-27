const diff = async (str1, str2) => {
  const { Diff } = await import(
    "https://unpkg.com/diff@5.0.0/lib/index.es6.js"
  );
  const { sha256 } = await import(
    "https://unpkg.com/@zedvision/sha256@10.12.14/sha256.js"
  );
  const sha1Str1 = sha256(str1);
  const diff1 = new Diff();
  const res = diff1.diff(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x) => x.added ? x.value : x.removed ? -x.count : x.count),
  };
};
const isDiff = (str) => {
  if (str.length < 10) {
    return false;
  }
  const isKey = [
    ...str.slice(0, 8),
  ].filter((x) => x < "0" || x > "f").length === 0;
  const maybeInst = str.slice(8);
  if (
    isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
  ) {
    try {
      return JSON.parse(maybeInst).length > 1;
    } catch {
      return false;
    }
  }
  return false;
};
const assemble = (oldValue, instructions) => {
  const instArr = JSON.parse(instructions);
  let old = oldValue.slice();
  let ret = "";
  instArr.forEach((element) => {
    if (Number(element) === element) {
      const absNum = Math.abs(element);
      const currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) {
        ret += String(currentString);
      }
    } else {
      ret += String(element);
    }
  });
  return ret;
};
const sha256 = async (x) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ).slice(0, 4),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
function Diff() {
}
function buildValues(diff1, components, newString, oldString, useLongestToken) {
  var componentPos = 0,
    componentLen = components.length,
    newPos = 0,
    oldPos = 0;
  for (; componentPos < componentLen; componentPos++) {
    var component = components[componentPos];
    if (!component.removed) {
      if (!component.added && useLongestToken) {
        var value = newString.slice(newPos, newPos + component.count);
        value = value.map(function (value1, i) {
          var oldValue = oldString[oldPos + i];
          return oldValue.length > value1.length ? oldValue : value1;
        });
        component.value = diff1.join(value);
      } else {
        component.value = diff1.join(
          newString.slice(newPos, newPos + component.count),
        );
      }
      newPos += component.count;
      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff1.join(
        oldString.slice(oldPos, oldPos + component.count),
      );
      oldPos += component.count;
      if (componentPos && components[componentPos - 1].added) {
        var tmp = components[componentPos - 1];
        components[componentPos - 1] = components[componentPos];
        components[componentPos] = tmp;
      }
    }
  }
  var lastComponent = components[componentLen - 1];
  if (
    componentLen > 1 && typeof lastComponent.value === "string" &&
    (lastComponent.added || lastComponent.removed) &&
    diff1.equals("", lastComponent.value)
  ) {
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
function generateOptions(options, defaults) {
  if (typeof options === "function") {
    defaults.callback = options;
  } else if (options) {
    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        defaults[name] = options[name];
      }
    }
  }
  return defaults;
}
var extendedWordChars =
  /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
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
    if (
      !tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) &&
      extendedWordChars.test(tokens[i + 2])
    ) {
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
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }
      retLines.push(line);
    }
  }
  return retLines;
};
function diffLines(oldStr, newStr, callback) {
  return lineDiff.diff(oldStr, newStr, callback);
}
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
  } else {
    _typeof = function (obj1) {
      return obj1 && typeof Symbol === "function" &&
          obj1.constructor === Symbol && obj1 !== Symbol.prototype
        ? "symbol"
        : typeof obj1;
    };
  }
  return _typeof(obj);
}
function _iterableToArray(iter) {
  if (
    typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)
  ) {
    return Array.from(iter);
  }
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}
var objectPrototypeToString = Object.prototype.toString;
var jsonDiff = new Diff();
jsonDiff.useLongestToken = true;
jsonDiff.tokenize = lineDiff.tokenize;
jsonDiff.equals = function (left, right) {
  return Diff.prototype.equals.call(
    jsonDiff,
    left.replace(/,([\r\n])/g, "$1"),
    right.replace(/,([\r\n])/g, "$1"),
  );
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
      canonicalizedObj[i] = canonicalize(
        obj[i],
        stack,
        replacementStack,
        replacer,
        key,
      );
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
      canonicalizedObj[_key] = canonicalize(
        obj[_key],
        stack,
        replacementStack,
        replacer,
        _key,
      );
    }
    stack.pop();
    replacementStack.pop();
  } else {
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
function parsePatch(uniDiff) {
  var options = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : {};
  var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
    delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
    list = [],
    i = 0;
  function parseIndex() {
    var index = {};
    list.push(index);
    while (i < diffstr.length) {
      var line = diffstr[i];
      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
        break;
      }
      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
      if (header) {
        index.index = header[1];
      }
      i++;
    }
    parseFileHeader(index);
    parseFileHeader(index);
    index.hunks = [];
    while (i < diffstr.length) {
      var _line = diffstr[i];
      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
        break;
      } else if (/^@@/.test(_line)) {
        index.hunks.push(parseHunk());
      } else if (_line && options.strict) {
        throw new Error(
          "Unknown line " + (i + 1) + " " + JSON.stringify(_line),
        );
      } else {
        i++;
      }
    }
  }
  function parseFileHeader(index) {
    var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);
    if (fileHeader) {
      var keyPrefix = fileHeader[1] === "---" ? "old" : "new";
      var data = fileHeader[2].split("\t", 2);
      var fileName = data[0].replace(/\\\\/g, "\\");
      if (/^".*"$/.test(fileName)) {
        fileName = fileName.substr(1, fileName.length - 2);
      }
      index[keyPrefix + "FileName"] = fileName;
      index[keyPrefix + "Header"] = (data[1] || "").trim();
      i++;
    }
  }
  function parseHunk() {
    var chunkHeaderIndex = i,
      chunkHeaderLine = diffstr[i++],
      chunkHeader = chunkHeaderLine.split(
        /@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/,
      );
    var hunk = {
      oldStart: +chunkHeader[1],
      oldLines: typeof chunkHeader[2] === "undefined" ? 1 : +chunkHeader[2],
      newStart: +chunkHeader[3],
      newLines: typeof chunkHeader[4] === "undefined" ? 1 : +chunkHeader[4],
      lines: [],
      linedelimiters: [],
    };
    if (hunk.oldLines === 0) {
      hunk.oldStart += 1;
    }
    if (hunk.newLines === 0) {
      hunk.newStart += 1;
    }
    var addCount = 0, removeCount = 0;
    for (; i < diffstr.length; i++) {
      if (
        diffstr[i].indexOf("--- ") === 0 && i + 2 < diffstr.length &&
        diffstr[i + 1].indexOf("+++ ") === 0 &&
        diffstr[i + 2].indexOf("@@") === 0
      ) {
        break;
      }
      var operation = diffstr[i].length == 0 && i != diffstr.length - 1
        ? " "
        : diffstr[i][0];
      if (
        operation === "+" || operation === "-" || operation === " " ||
        operation === "\\"
      ) {
        hunk.lines.push(diffstr[i]);
        hunk.linedelimiters.push(delimiters[i] || "\n");
        if (operation === "+") {
          addCount++;
        } else if (operation === "-") {
          removeCount++;
        } else if (operation === " ") {
          addCount++;
          removeCount++;
        }
      } else {
        break;
      }
    }
    if (!addCount && hunk.newLines === 1) {
      hunk.newLines = 0;
    }
    if (!removeCount && hunk.oldLines === 1) {
      hunk.oldLines = 0;
    }
    if (options.strict) {
      if (addCount !== hunk.newLines) {
        throw new Error(
          "Added line count did not match for hunk at line " +
            (chunkHeaderIndex + 1),
        );
      }
      if (removeCount !== hunk.oldLines) {
        throw new Error(
          "Removed line count did not match for hunk at line " +
            (chunkHeaderIndex + 1),
        );
      }
    }
    return hunk;
  }
  while (i < diffstr.length) {
    parseIndex();
  }
  return list;
}
function distanceIterator(start, minLine, maxLine) {
  var wantForward = true,
    backwardExhausted = false,
    forwardExhausted = false,
    localOffset = 1;
  return function iterator() {
    if (wantForward && !forwardExhausted) {
      if (backwardExhausted) {
        localOffset++;
      } else {
        wantForward = false;
      }
      if (start + localOffset <= maxLine) {
        return localOffset;
      }
      forwardExhausted = true;
    }
    if (!backwardExhausted) {
      if (!forwardExhausted) {
        wantForward = true;
      }
      if (minLine <= start - localOffset) {
        return -localOffset++;
      }
      backwardExhausted = true;
      return iterator();
    }
  };
}
function applyPatch(source, uniDiff) {
  var options = arguments.length > 2 && arguments[2] !== undefined
    ? arguments[2]
    : {};
  if (typeof uniDiff === "string") {
    uniDiff = parsePatch(uniDiff);
  }
  if (Array.isArray(uniDiff)) {
    if (uniDiff.length > 1) {
      throw new Error("applyPatch only works with a single input.");
    }
    uniDiff = uniDiff[0];
  }
  var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
    delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
    hunks = uniDiff.hunks,
    compareLine = options.compareLine ||
      function (lineNumber, line, operation, patchContent) {
        return line === patchContent;
      },
    errorCount = 0,
    fuzzFactor = options.fuzzFactor || 0,
    minLine = 0,
    offset = 0,
    removeEOFNL,
    addEOFNL;
  function hunkFits(hunk, toPos) {
    for (var j = 0; j < hunk.lines.length; j++) {
      var line = hunk.lines[j],
        operation = line.length > 0 ? line[0] : " ",
        content = line.length > 0 ? line.substr(1) : line;
      if (operation === " " || operation === "-") {
        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
          errorCount++;
          if (errorCount > fuzzFactor) {
            return false;
          }
        }
        toPos++;
      }
    }
    return true;
  }
  for (var i = 0; i < hunks.length; i++) {
    var hunk = hunks[i],
      maxLine = lines.length - hunk.oldLines,
      localOffset = 0,
      toPos = offset + hunk.oldStart - 1;
    var iterator = distanceIterator(toPos, minLine, maxLine);
    for (; localOffset !== undefined; localOffset = iterator()) {
      if (hunkFits(hunk, toPos + localOffset)) {
        hunk.offset = offset += localOffset;
        break;
      }
    }
    if (localOffset === undefined) {
      return false;
    }
    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
  }
  var diffOffset = 0;
  for (var _i = 0; _i < hunks.length; _i++) {
    var _hunk = hunks[_i],
      _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;
    diffOffset += _hunk.newLines - _hunk.oldLines;
    for (var j = 0; j < _hunk.lines.length; j++) {
      var line = _hunk.lines[j],
        operation = line.length > 0 ? line[0] : " ",
        content = line.length > 0 ? line.substr(1) : line,
        delimiter = _hunk.linedelimiters[j];
      if (operation === " ") {
        _toPos++;
      } else if (operation === "-") {
        lines.splice(_toPos, 1);
        delimiters.splice(_toPos, 1);
      } else if (operation === "+") {
        lines.splice(_toPos, 0, content);
        delimiters.splice(_toPos, 0, delimiter);
        _toPos++;
      } else if (operation === "\\") {
        var previousOperation = _hunk.lines[j - 1]
          ? _hunk.lines[j - 1][0]
          : null;
        if (previousOperation === "+") {
          removeEOFNL = true;
        } else if (previousOperation === "-") {
          addEOFNL = true;
        }
      }
    }
  }
  if (removeEOFNL) {
    while (!lines[lines.length - 1]) {
      lines.pop();
      delimiters.pop();
    }
  } else if (addEOFNL) {
    lines.push("");
    delimiters.push("\n");
  }
  for (var _k = 0; _k < lines.length - 1; _k++) {
    lines[_k] = lines[_k] + delimiters[_k];
  }
  return lines.join("");
}
function formatPatch(diff1) {
  var ret = [];
  if (diff1.oldFileName == diff1.newFileName) {
    ret.push("Index: " + diff1.oldFileName);
  }
  ret.push(
    "===================================================================",
  );
  ret.push(
    "--- " + diff1.oldFileName + (typeof diff1.oldHeader === "undefined"
      ? ""
      : "\t" + diff1.oldHeader),
  );
  ret.push(
    "+++ " + diff1.newFileName + (typeof diff1.newHeader === "undefined"
      ? ""
      : "\t" + diff1.newHeader),
  );
  for (var i = 0; i < diff1.hunks.length; i++) {
    var hunk = diff1.hunks[i];
    if (hunk.oldLines === 0) {
      hunk.oldStart -= 1;
    }
    if (hunk.newLines === 0) {
      hunk.newStart -= 1;
    }
    ret.push(
      "@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart +
        "," + hunk.newLines + " @@",
    );
    ret.push.apply(ret, hunk.lines);
  }
  return ret.join("\n") + "\n";
}
function arrayStartsWith(array, start) {
  if (start.length > array.length) {
    return false;
  }
  for (var i = 0; i < start.length; i++) {
    if (start[i] !== array[i]) {
      return false;
    }
  }
  return true;
}
function fileNameChanged(patch) {
  return patch.newFileName && patch.newFileName !== patch.oldFileName;
}
function selectField(index, mine, theirs) {
  if (mine === theirs) {
    return mine;
  } else {
    index.conflict = true;
    return {
      mine: mine,
      theirs: theirs,
    };
  }
}
function hunkBefore(test, check) {
  return test.oldStart < check.oldStart &&
    test.oldStart + test.oldLines < check.oldStart;
}
function cloneHunk(hunk, offset) {
  return {
    oldStart: hunk.oldStart,
    oldLines: hunk.oldLines,
    newStart: hunk.newStart + offset,
    newLines: hunk.newLines,
    lines: hunk.lines,
  };
}
function conflict(hunk, mine, their) {
  hunk.conflict = true;
  hunk.lines.push({
    conflict: true,
    mine: mine,
    theirs: their,
  });
}
function insertLeading(hunk, insert, their) {
  while (insert.offset < their.offset && insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
    insert.offset++;
  }
}
function insertTrailing(hunk, insert) {
  while (insert.index < insert.lines.length) {
    var line = insert.lines[insert.index++];
    hunk.lines.push(line);
  }
}
function collectChange(state) {
  var ret = [], operation = state.lines[state.index][0];
  while (state.index < state.lines.length) {
    var line = state.lines[state.index];
    if (operation === "-" && line[0] === "+") {
      operation = "+";
    }
    if (operation === line[0]) {
      ret.push(line);
      state.index++;
    } else {
      break;
    }
  }
  return ret;
}
function collectContext(state, matchChanges) {
  var changes = [],
    merged = [],
    matchIndex = 0,
    contextChanges = false,
    conflicted = false;
  while (matchIndex < matchChanges.length && state.index < state.lines.length) {
    var change = state.lines[state.index], match = matchChanges[matchIndex];
    if (match[0] === "+") {
      break;
    }
    contextChanges = contextChanges || change[0] !== " ";
    merged.push(match);
    matchIndex++;
    if (change[0] === "+") {
      conflicted = true;
      while (change[0] === "+") {
        changes.push(change);
        change = state.lines[++state.index];
      }
    }
    if (match.substr(1) === change.substr(1)) {
      changes.push(change);
      state.index++;
    } else {
      conflicted = true;
    }
  }
  if ((matchChanges[matchIndex] || "")[0] === "+" && contextChanges) {
    conflicted = true;
  }
  if (conflicted) {
    return changes;
  }
  while (matchIndex < matchChanges.length) {
    merged.push(matchChanges[matchIndex++]);
  }
  return {
    merged: merged,
    changes: changes,
  };
}
function allRemoves(changes) {
  return changes.reduce(function (prev, change) {
    return prev && change[0] === "-";
  }, true);
}
function skipRemoveSuperset(state, removeChanges, delta) {
  for (var i = 0; i < delta; i++) {
    var changeContent = removeChanges[removeChanges.length - delta + i].substr(
      1,
    );
    if (state.lines[state.index + i] !== " " + changeContent) {
      return false;
    }
  }
  state.index += delta;
  return true;
}
function calcOldNewLineCount(lines) {
  var oldLines = 0;
  var newLines = 0;
  lines.forEach(function (line) {
    if (typeof line !== "string") {
      var myCount = calcOldNewLineCount(line.mine);
      var theirCount = calcOldNewLineCount(line.theirs);
      if (oldLines !== undefined) {
        if (myCount.oldLines === theirCount.oldLines) {
          oldLines += myCount.oldLines;
        } else {
          oldLines = undefined;
        }
      }
      if (newLines !== undefined) {
        if (myCount.newLines === theirCount.newLines) {
          newLines += myCount.newLines;
        } else {
          newLines = undefined;
        }
      }
    } else {
      if (newLines !== undefined && (line[0] === "+" || line[0] === " ")) {
        newLines++;
      }
      if (oldLines !== undefined && (line[0] === "-" || line[0] === " ")) {
        oldLines++;
      }
    }
  });
  return {
    oldLines: oldLines,
    newLines: newLines,
  };
}
function escapeHTML(s) {
  var n = s;
  n = n.replace(/&/g, "&amp;");
  n = n.replace(/</g, "&lt;");
  n = n.replace(/>/g, "&gt;");
  n = n.replace(/"/g, "&quot;");
  return n;
}
const getDbObj = (db) => {
  const dbObj = {
    async get(key, format = "string") {
      let data;
      try {
        data = await db.get(key);
        if (!data) {
          return null;
        }
      } catch (_) {
        return null;
      }
      if (format === "json") {
        return JSON.parse(data);
      }
      const allData = await data;
      if (format === "string") {
        if (typeof allData === "string" && format === "string") {
          const text = allData;
          if (isDiff(allData)) {
            const keyOfDiff = allData.slice(0, 8);
            const instructions = allData.slice(8);
            const oldValue = await dbObj.get(keyOfDiff);
            return assemble(oldValue, instructions);
          }
          return allData;
        }
        return new TextDecoder().decode(allData);
      }
      return data;
    },
    async put(key, val) {
      let prev;
      try {
        const oldKey = await dbObj.get(key);
        if (
          typeof oldKey === "string" && typeof val === "string" &&
          oldKey.length === 8 && oldKey !== val
        ) {
          const actualValue = await dbObj.get(val);
          const prevValue = await dbObj.get(oldKey);
          if (typeof prevValue === "string") {
            const prevSha = await sha256(prevValue);
            if (prevSha === oldKey) {
              const diffObj = await diff(actualValue, prevValue);
              const diffAsStr = diffObj.b + JSON.stringify(diffObj.c);
              await dbObj.put(prevSha, diffAsStr);
            }
          }
        }
      } catch {
        prev = "";
      }
      if (prev !== "" && val === prev) {
        return val;
      }
      let str;
      if (typeof val !== "string") {
        str = new TextDecoder().decode(val);
      } else {
        str = val;
      }
      return await db.put(key, str);
    },
    async delete(key) {
      return await db.delete(key);
    },
    async clear() {
      return await db.clear();
    },
    async keys() {
      return await db.getAllKeys();
    },
  };
  return dbObj;
};
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues =
      typeof crypto !== "undefined" && crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto) ||
      typeof msCrypto !== "undefined" &&
        typeof msCrypto.getRandomValues === "function" &&
        msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
      );
    }
  }
  return getRandomValues(rnds8);
}
const __default =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : 0;
  var uuid =
    (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] +
      byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" +
      byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" +
      byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" +
      byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" +
      byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] +
      byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] +
      byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}
const v41 = () => v4();
var SHAKV;
var USERS;
var LOGS;
var USERKEYS;
var API_KEY;
let now = 0;
function log(message, data = {}) {
  now = now || Date.now();
  const [hour, minute] = new Date().toLocaleTimeString("en-US").split(/:| /);
  return LOGS.put(
    String(2000000000000 - now++),
    JSON.stringify({
      message,
      time: `${hour}:${minute}`,
      data,
    }),
    {
      expirationTtl: 86400 * 7,
    },
  );
}
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};
function json(resp) {
  return new Response(JSON.stringify(resp), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
}
function text(resp) {
  return new Response(resp, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html;charset=UTF-8",
    },
  });
}
function js(resp) {
  return new Response(resp, {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/javascript;charset=UTF-8",
    },
  });
}
function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    const respHeaders = {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers",
      ),
    };
    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: corsHeaders["Access-Control-Allow-Methods"],
      },
    });
  }
}
Diff.prototype = {
  diff: function diff1(oldString, newString) {
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
      } else {
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
      for (
        var diagonalPath = -1 * editLength;
        diagonalPath <= editLength;
        diagonalPath += 2
      ) {
        var basePath = void 0;
        var addPath = bestPath[diagonalPath - 1],
          removePath = bestPath[diagonalPath + 1],
          _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
        if (addPath) {
          bestPath[diagonalPath - 1] = undefined;
        }
        var canAdd = addPath && addPath.newPos + 1 < newLen,
          canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
        if (!canAdd && !canRemove) {
          bestPath[diagonalPath] = undefined;
          continue;
        }
        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
          basePath = clonePath(removePath);
          self.pushComponent(basePath.components, undefined, true);
        } else {
          basePath = addPath;
          basePath.newPos++;
          self.pushComponent(basePath.components, true, undefined);
        }
        _oldPos = self.extractCommon(
          basePath,
          newString,
          oldString,
          diagonalPath,
        );
        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
          return done(
            buildValues(
              self,
              basePath.components,
              newString,
              oldString,
              self.useLongestToken,
            ),
          );
        } else {
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
    } else {
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
    } else {
      components.push({
        count: 1,
        added: added,
        removed: removed,
      });
    }
  },
  extractCommon: function extractCommon(
    basePath,
    newString,
    oldString,
    diagonalPath,
  ) {
    var newLen = newString.length,
      oldLen = oldString.length,
      newPos = basePath.newPos,
      oldPos = newPos - diagonalPath,
      commonCount = 0;
    while (
      newPos + 1 < newLen && oldPos + 1 < oldLen &&
      this.equals(newString[newPos + 1], oldString[oldPos + 1])
    ) {
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
    } else {
      return left === right ||
        this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
    }
  },
  removeEmpty: function removeEmpty(array) {
    var ret = [];
    for (var i1 = 0; i1 < array.length; i1++) {
      if (array[i1]) {
        ret.push(array[i1]);
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
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (
    n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
  ) {
    return _arrayLikeToArray(o, minLen);
  }
}
jsonDiff.castInput = function (value) {
  var _this$options = this.options,
    undefinedReplacement = _this$options.undefinedReplacement,
    _this$options$stringi = _this$options.stringifyReplacer,
    stringifyReplacer = _this$options$stringi === void 0
      ? function (k, v) {
        return typeof v === "undefined" ? undefinedReplacement : v;
      }
      : _this$options$stringi;
  return typeof value === "string"
    ? value
    : JSON.stringify(
      canonicalize(value, null, null, stringifyReplacer),
      stringifyReplacer,
      "  ",
    );
};
function arrayEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return arrayStartsWith(a, b);
}
function calcLineCount(hunk) {
  var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
    oldLines = _calcOldNewLineCount.oldLines,
    newLines = _calcOldNewLineCount.newLines;
  if (oldLines !== undefined) {
    hunk.oldLines = oldLines;
  } else {
    delete hunk.oldLines;
  }
  if (newLines !== undefined) {
    hunk.newLines = newLines;
  } else {
    delete hunk.newLines;
  }
}
async function handleAdmin(request, searchParams, pathname, SHAKV1) {
  if (pathname === "/keys/") {
    const prefix = searchParams.get("prefix");
    const value = await SHAKV1.list({
      prefix,
    });
    return json(value);
  }
  if (pathname === "/keys/delete/") {
    const hash = searchParams.get("hash");
    const value = await SHAKV1.delete(hash);
    return json(value);
  }
  return json({
    error: "not implemented",
  });
}
async function handleCloudRequest(request) {
  const { country, colo } = request.cf || {
    country: "",
    colo: "",
  };
  const url = new URL(request.url);
  const { searchParams, pathname } = url;
  const psk = String(request.headers.get("API_KEY") || "");
  log("request", {
    searchParams,
    pathname,
    country,
    colo,
  });
  if (request.method === "GET" && psk && psk == API_KEY) {
    return handleAdmin(request, searchParams, pathname, SHAKV);
  } else if (request.method === "GET") {
    if (pathname === "/robots.txt") {
      return text("User-agent: * Disallow: /");
    }
    if (pathname === "/connect") {
      if (searchParams.get("key")) {
        const key = searchParams.get("key");
        const tokenKey = key.slice(0, 8);
        const userIdKey = key.slice(8, 16);
        const pass = key.slice(16, 24);
        const tokenPassUserId = key.slice(24, 32);
        const checkTokenPassUserId = await sha256(tokenKey + userIdKey);
        if (
          !tokenKey || !userIdKey || !pass ||
          checkTokenPassUserId !== tokenPassUserId
        ) {
          return json({
            error: "auth error",
          });
        }
        const uuid = await USERKEYS.get(userIdKey);
        if (uuid === null) {
          return json({
            error: 401,
          });
        }
        const tokenUuid = await USERKEYS.get(tokenKey);
        if (tokenUuid === null) {
          return json({
            error: 404,
            message: "token not found",
          });
        }
        const checkPass = await sha256(tokenKey + uuid);
        const checkPassToken = await sha256(tokenUuid + uuid);
        if (checkPass === pass) {
          await USERS.put(
            tokenUuid,
            JSON.stringify({
              uuid,
              connected: userIdKey,
            }),
            {
              expirationTtl: 60,
            },
          );
          return json({
            success: true,
          });
        } else if (checkPassToken === pass) {
          return json({
            success: true,
          });
        }
        return json({
          error: 401,
        });
      }
    }
    if (pathname === "/check") {
      const key = searchParams.get("key");
      if (key === null) return new Response("500");
      const waitForChange = async () => {
        const uuid = await USERKEYS.get(key);
        if (!uuid) return null;
        const data = await USERS.get(uuid, "json");
        if (!data || data.connected) {
          return data;
        }
        return new Promise((resolve) => {
          const clear = setInterval(async () => {
            const data1 = await USERS.get(uuid, "json");
            if (!data1 || data1.connected) {
              clearInterval(clear);
              resolve(data1);
            }
          }, 1000);
        });
      };
      const data = await waitForChange();
      return json({
        expired: data === null,
      });
    }
    if (pathname === "/register") {
      const uuid = v41();
      const uuidHash = await sha256(uuid);
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          uuidHash,
          registered: Date.now(),
          country,
          colo,
        }),
      );
      await log("register", {
        uuidHash,
      });
      await USERKEYS.put(uuidHash, uuid);
      return json({
        uuid,
      });
    }
    if (pathname === "/token") {
      const uuid = v41();
      const uuidHash = await sha256(uuid);
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          registered: Date.now(),
          country,
          colo,
        }),
        {
          expirationTtl: 60,
        },
      );
      await USERKEYS.put(uuidHash, uuid, {
        expirationTtl: 60,
      });
      return json({
        uuid,
        key: uuidHash,
      });
    }
    if (pathname === "/create-project") {
      const uuidHash = request.headers.get("TOKEN");
      const uuid = v41();
      await USERS.put(
        uuid,
        JSON.stringify({
          uuid,
          registered: Date.now(),
          country,
          colo,
        }),
      );
      return json({
        uuid,
      });
    }
    const maybeRoute = pathname.substr(1);
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = await shaDB.get(maybeRoute);
      if (result !== null) {
        if (result.indexOf("export") === 0) return js(result);
        return text(result);
      }
    }
    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    const zkey = String(request.headers.get("ZKEY") || "");
    const sha = zkey.slice(0, 8);
    const uKey = zkey.slice(8, 16);
    const gKey = zkey.slice(16, 24);
    const proofKey = zkey.slice(24, 32);
    if (!sha || !uKey || !gKey || !proofKey) {
      return json({
        error: 401,
        "message": "not matching keys",
      });
    }
    const checkGkey = await sha256(sha + uKey);
    if (checkGkey !== gKey) {
      return json({
        error: 401,
        "message": "content and userkeys are not a pain",
      });
    }
    const myBuffer = await request.arrayBuffer();
    const hash = await sha256(myBuffer);
    const smallerKey = hash.substring(0, 8);
    if (smallerKey !== sha) {
      return json({
        error: 401,
        message:
          `body hash not matching with the sent hash: ${smallerKey} -- ${zkey}`,
      });
    }
    const uuid = await USERKEYS.get(uKey);
    if (!uuid) {
      return json({
        error: 500,
        message: "user not found",
      });
    }
    const checkProofKey = await sha256(sha + uuid);
    if (checkProofKey !== proofKey) {
      return json({
        error: 401,
        message: "user not verified",
      });
    }
    await log("new html", {
      sha,
      uKey,
    });
    const maybeRoute = pathname.substr(1);
    await SHAKV.put(smallerKey, myBuffer);
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = await shaDB.put(maybeRoute, smallerKey);
    }
    return json({
      hash: smallerKey,
    });
  }
  return new Response("404");
}
addEventListener("fetch", (event) => {
  if (event.request.method === "OPTIONS") {
    event.respondWith(handleOptions(event.request));
  } else {
    event.respondWith(handleCloudRequest(event.request));
  }
});
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function structuredPatch(
  oldFileName,
  newFileName,
  oldStr,
  newStr,
  oldHeader,
  newHeader,
  options,
) {
  if (!options) {
    options = {};
  }
  if (typeof options.context === "undefined") {
    options.context = 4;
  }
  var diff1 = diffLines(oldStr, newStr, options);
  diff1.push({
    value: "",
    lines: [],
  });
  function contextLines(lines) {
    return lines.map(function (entry) {
      return " " + entry;
    });
  }
  var hunks = [];
  var oldRangeStart = 0,
    newRangeStart = 0,
    curRange = [],
    oldLine = 1,
    newLine = 1;
  var _loop = function _loop(i1) {
    var current = diff1[i1],
      lines = current.lines || current.value.replace(/\n$/, "").split("\n");
    current.lines = lines;
    if (current.added || current.removed) {
      var _curRange;
      if (!oldRangeStart) {
        var prev = diff1[i1 - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;
        if (prev) {
          curRange = options.context > 0
            ? contextLines(prev.lines.slice(-options.context))
            : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      }
      (_curRange = curRange).push.apply(
        _curRange,
        _toConsumableArray(lines.map(function (entry) {
          return (current.added ? "+" : "-") + entry;
        })),
      );
      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      if (oldRangeStart) {
        if (lines.length <= options.context * 2 && i1 < diff1.length - 2) {
          var _curRange2;
          (_curRange2 = curRange).push.apply(
            _curRange2,
            _toConsumableArray(contextLines(lines)),
          );
        } else {
          var _curRange3;
          var contextSize = Math.min(lines.length, options.context);
          (_curRange3 = curRange).push.apply(
            _curRange3,
            _toConsumableArray(contextLines(lines.slice(0, contextSize))),
          );
          var hunk = {
            oldStart: oldRangeStart,
            oldLines: oldLine - oldRangeStart + contextSize,
            newStart: newRangeStart,
            newLines: newLine - newRangeStart + contextSize,
            lines: curRange,
          };
          if (i1 >= diff1.length - 2 && lines.length <= options.context) {
            var oldEOFNewline = /\n$/.test(oldStr);
            var newEOFNewline = /\n$/.test(newStr);
            var noNlBeforeAdds = lines.length == 0 &&
              curRange.length > hunk.oldLines;
            if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
              curRange.splice(hunk.oldLines, 0, "\\ No newline at end of file");
            }
            if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
              curRange.push("\\ No newline at end of file");
            }
          }
          hunks.push(hunk);
          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }
      oldLine += lines.length;
      newLine += lines.length;
    }
  };
  for (var i1 = 0; i1 < diff1.length; i1++) {
    _loop(i1);
  }
  return {
    oldFileName: oldFileName,
    newFileName: newFileName,
    oldHeader: oldHeader,
    newHeader: newHeader,
    hunks: hunks,
  };
}
function createTwoFilesPatch(
  oldFileName,
  newFileName,
  oldStr,
  newStr,
  oldHeader,
  newHeader,
  options,
) {
  return formatPatch(
    structuredPatch(
      oldFileName,
      newFileName,
      oldStr,
      newStr,
      oldHeader,
      newHeader,
      options,
    ),
  );
}
function loadPatch(param, base) {
  if (typeof param === "string") {
    if (/^@@/m.test(param) || /^Index:/m.test(param)) {
      return parsePatch(param)[0];
    }
    if (!base) {
      throw new Error("Must provide a base reference or pass in a patch");
    }
    return structuredPatch(undefined, undefined, base, param);
  }
  return param;
}
function mutualChange(hunk, mine, their) {
  var myChanges = collectChange(mine), theirChanges = collectChange(their);
  if (allRemoves(myChanges) && allRemoves(theirChanges)) {
    if (
      arrayStartsWith(myChanges, theirChanges) &&
      skipRemoveSuperset(
        their,
        myChanges,
        myChanges.length - theirChanges.length,
      )
    ) {
      var _hunk$lines3;
      (_hunk$lines3 = hunk.lines).push.apply(
        _hunk$lines3,
        _toConsumableArray(myChanges),
      );
      return;
    } else if (
      arrayStartsWith(theirChanges, myChanges) &&
      skipRemoveSuperset(
        mine,
        theirChanges,
        theirChanges.length - myChanges.length,
      )
    ) {
      var _hunk$lines4;
      (_hunk$lines4 = hunk.lines).push.apply(
        _hunk$lines4,
        _toConsumableArray(theirChanges),
      );
      return;
    }
  } else if (arrayEqual(myChanges, theirChanges)) {
    var _hunk$lines5;
    (_hunk$lines5 = hunk.lines).push.apply(
      _hunk$lines5,
      _toConsumableArray(myChanges),
    );
    return;
  }
  conflict(hunk, myChanges, theirChanges);
}
function removal(hunk, mine, their, swap) {
  var myChanges = collectChange(mine),
    theirChanges = collectContext(their, myChanges);
  if (theirChanges.merged) {
    var _hunk$lines6;
    (_hunk$lines6 = hunk.lines).push.apply(
      _hunk$lines6,
      _toConsumableArray(theirChanges.merged),
    );
  } else {
    conflict(
      hunk,
      swap ? theirChanges : myChanges,
      swap ? myChanges : theirChanges,
    );
  }
}
function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
  var mine = {
      offset: mineOffset,
      lines: mineLines,
      index: 0,
    },
    their = {
      offset: theirOffset,
      lines: theirLines,
      index: 0,
    };
  insertLeading(hunk, mine, their);
  insertLeading(hunk, their, mine);
  while (mine.index < mine.lines.length && their.index < their.lines.length) {
    var mineCurrent = mine.lines[mine.index],
      theirCurrent = their.lines[their.index];
    if (
      (mineCurrent[0] === "-" || mineCurrent[0] === "+") &&
      (theirCurrent[0] === "-" || theirCurrent[0] === "+")
    ) {
      mutualChange(hunk, mine, their);
    } else if (mineCurrent[0] === "+" && theirCurrent[0] === " ") {
      var _hunk$lines;
      (_hunk$lines = hunk.lines).push.apply(
        _hunk$lines,
        _toConsumableArray(collectChange(mine)),
      );
    } else if (theirCurrent[0] === "+" && mineCurrent[0] === " ") {
      var _hunk$lines2;
      (_hunk$lines2 = hunk.lines).push.apply(
        _hunk$lines2,
        _toConsumableArray(collectChange(their)),
      );
    } else if (mineCurrent[0] === "-" && theirCurrent[0] === " ") {
      removal(hunk, mine, their);
    } else if (theirCurrent[0] === "-" && mineCurrent[0] === " ") {
      removal(hunk, their, mine, true);
    } else if (mineCurrent === theirCurrent) {
      hunk.lines.push(mineCurrent);
      mine.index++;
      their.index++;
    } else {
      conflict(hunk, collectChange(mine), collectChange(their));
    }
  }
  insertTrailing(hunk, mine);
  insertTrailing(hunk, their);
  calcLineCount(hunk);
}
