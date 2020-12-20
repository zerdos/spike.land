Object.defineProperty(exports, "__esModule", {
  value: true,
});
function Diff() {
}
function buildValues(diff, components, newString, oldString, useLongestToken) {
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
        component.value = diff.join(value);
      } else {
        component.value = diff.join(
          newString.slice(newPos, newPos + component.count),
        );
      }
      newPos += component.count;
      if (!component.added) {
        oldPos += component.count;
      }
    } else {
      component.value = diff.join(
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
    diff.equals("", lastComponent.value)
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
const sha256 = async (x) =>
  Array.from(
    new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        typeof x === "string" ? new TextEncoder().encode(x) : x,
      ),
    ).slice(0, 4),
  ).map((b) => ("00" + b.toString(16)).slice(-2)).join("");
const diff1 = async (str1, str2) => {
  const sha1Str1 = sha256(str1);
  const res = diff(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x) => x.added ? x.value : x.removed ? -x.count : x.count),
  };
};
export { diff1 as diff };
export const isDiff = (str) => {
  if (str.length < 10) return false;
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
export const assemble = (oldValue, instructions) => {
  const instArr = JSON.parse(instructions);
  let old = oldValue.slice();
  let ret = "";
  instArr.forEach((element) => {
    if (Number(element) === element) {
      const absNum = Math.abs(element);
      const currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) ret += String(currentString);
    } else {
      ret += String(element);
    }
  });
  return ret;
};
exports["default"] = Diff;
Diff.prototype = {
  diff: function diff2(oldString, newString) {
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
