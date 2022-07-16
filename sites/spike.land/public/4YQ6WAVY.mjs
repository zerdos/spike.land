import {
  jsx
} from "./D4S3JOF6.mjs";
import {
  __commonJS,
  __toESM,
  init_define_process
} from "./LC4ALKUC.mjs";

// ../../node_modules/fast-diff/diff.js
var require_diff = __commonJS({
  "../../node_modules/fast-diff/diff.js"(exports, module) {
    init_define_process();
    var DIFF_DELETE = -1;
    var DIFF_INSERT = 1;
    var DIFF_EQUAL = 0;
    function diff_main(text1, text2, cursor_pos, _fix_unicode) {
      if (text1 === text2) {
        if (text1) {
          return [[DIFF_EQUAL, text1]];
        }
        return [];
      }
      if (cursor_pos != null) {
        var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
        if (editdiff) {
          return editdiff;
        }
      }
      var commonlength = diff_commonPrefix(text1, text2);
      var commonprefix = text1.substring(0, commonlength);
      text1 = text1.substring(commonlength);
      text2 = text2.substring(commonlength);
      commonlength = diff_commonSuffix(text1, text2);
      var commonsuffix = text1.substring(text1.length - commonlength);
      text1 = text1.substring(0, text1.length - commonlength);
      text2 = text2.substring(0, text2.length - commonlength);
      var diffs = diff_compute_(text1, text2);
      if (commonprefix) {
        diffs.unshift([DIFF_EQUAL, commonprefix]);
      }
      if (commonsuffix) {
        diffs.push([DIFF_EQUAL, commonsuffix]);
      }
      diff_cleanupMerge(diffs, _fix_unicode);
      return diffs;
    }
    function diff_compute_(text1, text2) {
      var diffs;
      if (!text1) {
        return [[DIFF_INSERT, text2]];
      }
      if (!text2) {
        return [[DIFF_DELETE, text1]];
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      var i = longtext.indexOf(shorttext);
      if (i !== -1) {
        diffs = [
          [DIFF_INSERT, longtext.substring(0, i)],
          [DIFF_EQUAL, shorttext],
          [DIFF_INSERT, longtext.substring(i + shorttext.length)]
        ];
        if (text1.length > text2.length) {
          diffs[0][0] = diffs[2][0] = DIFF_DELETE;
        }
        return diffs;
      }
      if (shorttext.length === 1) {
        return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
      }
      var hm = diff_halfMatch_(text1, text2);
      if (hm) {
        var text1_a = hm[0];
        var text1_b = hm[1];
        var text2_a = hm[2];
        var text2_b = hm[3];
        var mid_common = hm[4];
        var diffs_a = diff_main(text1_a, text2_a);
        var diffs_b = diff_main(text1_b, text2_b);
        return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
      }
      return diff_bisect_(text1, text2);
    }
    function diff_bisect_(text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      var max_d = Math.ceil((text1_length + text2_length) / 2);
      var v_offset = max_d;
      var v_length = 2 * max_d;
      var v1 = new Array(v_length);
      var v2 = new Array(v_length);
      for (var x = 0; x < v_length; x++) {
        v1[x] = -1;
        v2[x] = -1;
      }
      v1[v_offset + 1] = 0;
      v2[v_offset + 1] = 0;
      var delta = text1_length - text2_length;
      var front = delta % 2 !== 0;
      var k1start = 0;
      var k1end = 0;
      var k2start = 0;
      var k2end = 0;
      for (var d = 0; d < max_d; d++) {
        for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
          var k1_offset = v_offset + k1;
          var x1;
          if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
            x1 = v1[k1_offset + 1];
          } else {
            x1 = v1[k1_offset - 1] + 1;
          }
          var y1 = x1 - k1;
          while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
            x1++;
            y1++;
          }
          v1[k1_offset] = x1;
          if (x1 > text1_length) {
            k1end += 2;
          } else if (y1 > text2_length) {
            k1start += 2;
          } else if (front) {
            var k2_offset = v_offset + delta - k1;
            if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
              var x2 = text1_length - v2[k2_offset];
              if (x1 >= x2) {
                return diff_bisectSplit_(text1, text2, x1, y1);
              }
            }
          }
        }
        for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
          var k2_offset = v_offset + k2;
          var x2;
          if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
            x2 = v2[k2_offset + 1];
          } else {
            x2 = v2[k2_offset - 1] + 1;
          }
          var y2 = x2 - k2;
          while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
            x2++;
            y2++;
          }
          v2[k2_offset] = x2;
          if (x2 > text1_length) {
            k2end += 2;
          } else if (y2 > text2_length) {
            k2start += 2;
          } else if (!front) {
            var k1_offset = v_offset + delta - k2;
            if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
              var x1 = v1[k1_offset];
              var y1 = v_offset + x1 - k1_offset;
              x2 = text1_length - x2;
              if (x1 >= x2) {
                return diff_bisectSplit_(text1, text2, x1, y1);
              }
            }
          }
        }
      }
      return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
    }
    function diff_bisectSplit_(text1, text2, x, y) {
      var text1a = text1.substring(0, x);
      var text2a = text2.substring(0, y);
      var text1b = text1.substring(x);
      var text2b = text2.substring(y);
      var diffs = diff_main(text1a, text2a);
      var diffsb = diff_main(text1b, text2b);
      return diffs.concat(diffsb);
    }
    function diff_commonPrefix(text1, text2) {
      if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerstart = 0;
      while (pointermin < pointermid) {
        if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
          pointermin = pointermid;
          pointerstart = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
        pointermid--;
      }
      return pointermid;
    }
    function diff_commonSuffix(text1, text2) {
      if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
        return 0;
      }
      var pointermin = 0;
      var pointermax = Math.min(text1.length, text2.length);
      var pointermid = pointermax;
      var pointerend = 0;
      while (pointermin < pointermid) {
        if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
          pointermin = pointermid;
          pointerend = pointermin;
        } else {
          pointermax = pointermid;
        }
        pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
      }
      if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
        pointermid--;
      }
      return pointermid;
    }
    function diff_halfMatch_(text1, text2) {
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
      }
      function diff_halfMatchI_(longtext2, shorttext2, i) {
        var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
        var j = -1;
        var best_common = "";
        var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
        while ((j = shorttext2.indexOf(seed, j + 1)) !== -1) {
          var prefixLength = diff_commonPrefix(longtext2.substring(i), shorttext2.substring(j));
          var suffixLength = diff_commonSuffix(longtext2.substring(0, i), shorttext2.substring(0, j));
          if (best_common.length < suffixLength + prefixLength) {
            best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
            best_longtext_a = longtext2.substring(0, i - suffixLength);
            best_longtext_b = longtext2.substring(i + prefixLength);
            best_shorttext_a = shorttext2.substring(0, j - suffixLength);
            best_shorttext_b = shorttext2.substring(j + prefixLength);
          }
        }
        if (best_common.length * 2 >= longtext2.length) {
          return [
            best_longtext_a,
            best_longtext_b,
            best_shorttext_a,
            best_shorttext_b,
            best_common
          ];
        } else {
          return null;
        }
      }
      var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
      var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
      var hm;
      if (!hm1 && !hm2) {
        return null;
      } else if (!hm2) {
        hm = hm1;
      } else if (!hm1) {
        hm = hm2;
      } else {
        hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
      }
      var text1_a, text1_b, text2_a, text2_b;
      if (text1.length > text2.length) {
        text1_a = hm[0];
        text1_b = hm[1];
        text2_a = hm[2];
        text2_b = hm[3];
      } else {
        text2_a = hm[0];
        text2_b = hm[1];
        text1_a = hm[2];
        text1_b = hm[3];
      }
      var mid_common = hm[4];
      return [text1_a, text1_b, text2_a, text2_b, mid_common];
    }
    function diff_cleanupMerge(diffs, fix_unicode) {
      diffs.push([DIFF_EQUAL, ""]);
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      var commonlength;
      while (pointer < diffs.length) {
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          diffs.splice(pointer, 1);
          continue;
        }
        switch (diffs[pointer][0]) {
          case DIFF_INSERT:
            count_insert++;
            text_insert += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_DELETE:
            count_delete++;
            text_delete += diffs[pointer][1];
            pointer++;
            break;
          case DIFF_EQUAL:
            var previous_equality = pointer - count_insert - count_delete - 1;
            if (fix_unicode) {
              if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
                var stray = diffs[previous_equality][1].slice(-1);
                diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);
                text_delete = stray + text_delete;
                text_insert = stray + text_insert;
                if (!diffs[previous_equality][1]) {
                  diffs.splice(previous_equality, 1);
                  pointer--;
                  var k = previous_equality - 1;
                  if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                    count_insert++;
                    text_insert = diffs[k][1] + text_insert;
                    k--;
                  }
                  if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                    count_delete++;
                    text_delete = diffs[k][1] + text_delete;
                    k--;
                  }
                  previous_equality = k;
                }
              }
              if (starts_with_pair_end(diffs[pointer][1])) {
                var stray = diffs[pointer][1].charAt(0);
                diffs[pointer][1] = diffs[pointer][1].slice(1);
                text_delete += stray;
                text_insert += stray;
              }
            }
            if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
              diffs.splice(pointer, 1);
              break;
            }
            if (text_delete.length > 0 || text_insert.length > 0) {
              if (text_delete.length > 0 && text_insert.length > 0) {
                commonlength = diff_commonPrefix(text_insert, text_delete);
                if (commonlength !== 0) {
                  if (previous_equality >= 0) {
                    diffs[previous_equality][1] += text_insert.substring(0, commonlength);
                  } else {
                    diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                    pointer++;
                  }
                  text_insert = text_insert.substring(commonlength);
                  text_delete = text_delete.substring(commonlength);
                }
                commonlength = diff_commonSuffix(text_insert, text_delete);
                if (commonlength !== 0) {
                  diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                  text_insert = text_insert.substring(0, text_insert.length - commonlength);
                  text_delete = text_delete.substring(0, text_delete.length - commonlength);
                }
              }
              var n = count_insert + count_delete;
              if (text_delete.length === 0 && text_insert.length === 0) {
                diffs.splice(pointer - n, n);
                pointer = pointer - n;
              } else if (text_delete.length === 0) {
                diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
                pointer = pointer - n + 1;
              } else if (text_insert.length === 0) {
                diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
                pointer = pointer - n + 1;
              } else {
                diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
                pointer = pointer - n + 2;
              }
            }
            if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
              diffs[pointer - 1][1] += diffs[pointer][1];
              diffs.splice(pointer, 1);
            } else {
              pointer++;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
      }
      if (diffs[diffs.length - 1][1] === "") {
        diffs.pop();
      }
      var changes = false;
      pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
          if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
            diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
            diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
            diffs.splice(pointer - 1, 1);
            changes = true;
          } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
            diffs[pointer - 1][1] += diffs[pointer + 1][1];
            diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
            diffs.splice(pointer + 1, 1);
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        diff_cleanupMerge(diffs, fix_unicode);
      }
    }
    function is_surrogate_pair_start(charCode) {
      return charCode >= 55296 && charCode <= 56319;
    }
    function is_surrogate_pair_end(charCode) {
      return charCode >= 56320 && charCode <= 57343;
    }
    function starts_with_pair_end(str2) {
      return is_surrogate_pair_end(str2.charCodeAt(0));
    }
    function ends_with_pair_start(str2) {
      return is_surrogate_pair_start(str2.charCodeAt(str2.length - 1));
    }
    function remove_empty_tuples(tuples) {
      var ret = [];
      for (var i = 0; i < tuples.length; i++) {
        if (tuples[i][1].length > 0) {
          ret.push(tuples[i]);
        }
      }
      return ret;
    }
    function make_edit_splice(before, oldMiddle, newMiddle, after) {
      if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
        return null;
      }
      return remove_empty_tuples([
        [DIFF_EQUAL, before],
        [DIFF_DELETE, oldMiddle],
        [DIFF_INSERT, newMiddle],
        [DIFF_EQUAL, after]
      ]);
    }
    function find_cursor_edit_diff(oldText, newText, cursor_pos) {
      var oldRange = typeof cursor_pos === "number" ? { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
      var newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
      var oldLength = oldText.length;
      var newLength = newText.length;
      if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
        var oldCursor = oldRange.index;
        var oldBefore = oldText.slice(0, oldCursor);
        var oldAfter = oldText.slice(oldCursor);
        var maybeNewCursor = newRange ? newRange.index : null;
        editBefore: {
          var newCursor = oldCursor + newLength - oldLength;
          if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
            break editBefore;
          }
          if (newCursor < 0 || newCursor > newLength) {
            break editBefore;
          }
          var newBefore = newText.slice(0, newCursor);
          var newAfter = newText.slice(newCursor);
          if (newAfter !== oldAfter) {
            break editBefore;
          }
          var prefixLength = Math.min(oldCursor, newCursor);
          var oldPrefix = oldBefore.slice(0, prefixLength);
          var newPrefix = newBefore.slice(0, prefixLength);
          if (oldPrefix !== newPrefix) {
            break editBefore;
          }
          var oldMiddle = oldBefore.slice(prefixLength);
          var newMiddle = newBefore.slice(prefixLength);
          return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
        }
        editAfter: {
          if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
            break editAfter;
          }
          var cursor = oldCursor;
          var newBefore = newText.slice(0, cursor);
          var newAfter = newText.slice(cursor);
          if (newBefore !== oldBefore) {
            break editAfter;
          }
          var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
          var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
          var newSuffix = newAfter.slice(newAfter.length - suffixLength);
          if (oldSuffix !== newSuffix) {
            break editAfter;
          }
          var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
          var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
          return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
        }
      }
      if (oldRange.length > 0 && newRange && newRange.length === 0) {
        replaceRange: {
          var oldPrefix = oldText.slice(0, oldRange.index);
          var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
          var prefixLength = oldPrefix.length;
          var suffixLength = oldSuffix.length;
          if (newLength < prefixLength + suffixLength) {
            break replaceRange;
          }
          var newPrefix = newText.slice(0, prefixLength);
          var newSuffix = newText.slice(newLength - suffixLength);
          if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
            break replaceRange;
          }
          var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
          var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
          return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
        }
      }
      return null;
    }
    function diff2(text1, text2, cursor_pos) {
      return diff_main(text1, text2, cursor_pos, true);
    }
    diff2.INSERT = DIFF_INSERT;
    diff2.DELETE = DIFF_DELETE;
    diff2.EQUAL = DIFF_EQUAL;
    module.exports = diff2;
  }
});

// ../../node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "../../node_modules/lodash/lodash.js"(exports, module) {
    init_define_process();
    (function() {
      var undefined2;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof self == "object" && self && self.Object === Object && self;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      function arrayPush(array, values2) {
        var index = -1, length = values2.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values2[index];
        }
        return array;
      }
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function baseIsNaN(value) {
        return value !== value;
      }
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      function mapToArray(map2) {
        var index = -1, result = Array(map2.size);
        map2.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      function setToArray(set3) {
        var index = -1, result = Array(set3.size);
        set3.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      function setToPairs(set3) {
        var index = -1, result = Array(set3.size);
        set3.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      var runInContext = function runInContext2(context) {
        context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty2 = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        var Buffer = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice2 = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap2 && new WeakMap2();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty2.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        var baseCreate = function() {
          function object() {
          }
          return function(proto) {
            if (!isObject(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        }();
        function baseLodash() {
        }
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        lodash.templateSettings = {
          "escape": reEscape,
          "evaluate": reEvaluate,
          "interpolate": reInterpolate,
          "variable": "",
          "imports": {
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries3) {
          var index = -1, length = entries3 == null ? 0 : entries3.length;
          this.clear();
          while (++index < length) {
            var entry = entries3[index];
            this.set(entry[0], entry[1]);
          }
        }
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty2.call(data, key) ? data[key] : undefined2;
        }
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty2.call(data, key);
        }
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries3) {
          var index = -1, length = entries3 == null ? 0 : entries3.length;
          this.clear();
          while (++index < length) {
            var entry = entries3[index];
            this.set(entry[0], entry[1]);
          }
        }
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice2.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries3) {
          var index = -1, length = entries3 == null ? 0 : entries3.length;
          this.clear();
          while (++index < length) {
            var entry = entries3[index];
            this.set(entry[0], entry[1]);
          }
        }
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values3) {
          var index = -1, length = values3 == null ? 0 : values3.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values3[index]);
          }
        }
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack2(entries3) {
          var data = this.__data__ = new ListCache(entries3);
          this.size = data.size;
        }
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        function stackGet(key) {
          return this.__data__.get(key);
        }
        function stackHas(key) {
          return this.__data__.has(key);
        }
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        Stack2.prototype.clear = stackClear;
        Stack2.prototype["delete"] = stackDelete;
        Stack2.prototype.get = stackGet;
        Stack2.prototype.has = stackHas;
        Stack2.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty2.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        function baseAssign(object, source) {
          return object && copyObject(source, keys2(source), object);
        }
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip2 = object == null;
          while (++index < length) {
            result2[index] = skip2 ? undefined2 : get11(object, paths[index]);
          }
          return result2;
        }
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject(value)) {
            return value;
          }
          var isArr = isArray(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack2());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet2(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap2(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys2;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        function baseConforms(source) {
          var props = keys2(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        function baseDifference(array, values3, iteratee2, comparator) {
          var index = -1, includes4 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values3.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values3 = arrayMap(values3, baseUnary(iteratee2));
          }
          if (comparator) {
            includes4 = arrayIncludesWith;
            isCommon = false;
          } else if (values3.length >= LARGE_ARRAY_SIZE) {
            includes4 = cacheHas;
            isCommon = false;
            values3 = new SetCache(values3);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values3[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes4(values3, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys2);
        }
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys2);
        }
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction(object[key]);
          });
        }
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        function baseGt(value, other) {
          return value > other;
        }
        function baseHas(object, key) {
          return object != null && hasOwnProperty2.call(object, key);
        }
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes4 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes4(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes4(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last3(path))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack2());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack2());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack2());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack2();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        function baseIsNative(value) {
          if (!isObject(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty2.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseKeysIn(object) {
          if (!isObject(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        function baseLt(value, other) {
          return value < other;
        }
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get11(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn2(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack2());
            if (isObject(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject2(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject(objValue) || isFunction(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn2(object, path);
          });
        }
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        function basePullAll(array, values3, iteratee2, comparator) {
          var indexOf3 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values3.length, seen = array;
          if (array === values3) {
            values3 = copyArray(values3);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values3[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf3(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice2.call(seen, fromIndex, 1);
              }
              splice2.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice2.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        function baseSample(collection) {
          return arraySample(values2(collection));
        }
        function baseSampleSize(collection, n) {
          var array = values2(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        function baseSet(object, path, value, customizer) {
          if (!isObject(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values2(collection));
        }
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes4 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes4 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set4 = iteratee2 ? null : createSet(array);
            if (set4) {
              return setToArray(set4);
            }
            isCommon = false;
            includes4 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes4(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last3(path))];
        }
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        function baseZipObject(props, values3, assignFunc) {
          var index = -1, length = props.length, valsLength = values3.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values3[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        function castPath(value, object) {
          if (isArray(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString5(value));
        }
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        var clearTimeout = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike2(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          return wrapper;
        }
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString5(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject(result2) ? result2 : thisBinding;
          };
        }
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          return wrapper;
        }
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike2(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys2(collection);
              predicate = function(key) {
                return iteratee2(iterable[key], key, iterable);
              };
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          return wrapper;
        }
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          return wrapper;
        }
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString5(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString5(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values3) {
          return new Set2(values3);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty2.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject(objValue) && isObject(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        function customOmitClone(value) {
          return isPlainObject2(value) ? undefined2 : value;
        }
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten3), func + "");
        }
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys2, getSymbols);
        }
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty2.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        function getHolder(func) {
          var object = hasOwnProperty2.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        function getMapData(map3, key) {
          var data = map3.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        function getMatchData(object) {
          var result2 = keys2(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        function getRawTag(value) {
          var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
          getTag = function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          };
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
        }
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        function isFlattenable(value) {
          return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike2(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        function isKey(value, object) {
          if (isArray(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        var isMaskable = coreJsData ? isFunction : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        function isStrictComparable(value) {
          return value === value && !isObject(value);
        }
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        function shortOut(func) {
          var count2 = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count2 >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count2 = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        function concat2() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        var difference = baseRest(function(array, values3) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values3, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values3) {
          var iteratee2 = last3(values3);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values3, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values3) {
          var comparator = last3(values3);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values3, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        function findIndex2(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        function findLastIndex2(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        function flatten3(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        function indexOf2(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last3(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last3(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last3(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join3(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        function last3(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        function lastIndexOf2(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        var pull = baseRest(pullAll);
        function pullAll(array, values3) {
          return array && array.length && values3 && values3.length ? basePullAll(array, values3) : array;
        }
        function pullAllBy(array, values3, iteratee2) {
          return array && array.length && values3 && values3.length ? basePullAll(array, values3, getIteratee(iteratee2, 2)) : array;
        }
        function pullAllWith(array, values3, comparator) {
          return array && array.length && values3 && values3.length ? basePullAll(array, values3, undefined2, comparator) : array;
        }
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove3(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        function reverse3(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        function slice3(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        function take2(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        function takeWhile2(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last3(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last3(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        var without = baseRest(function(array, values3) {
          return isArrayLikeObject(array) ? baseDifference(array, values3) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last3(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last3(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip2 = baseRest(unzip);
        function zipObject(props, values3) {
          return baseZipObject(props || [], values3 || [], assignValue);
        }
        function zipObjectDeep(props, values3) {
          return baseZipObject(props || [], values3 || [], baseSet);
        }
        var zipWith2 = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        function thru(value, interceptor) {
          return interceptor(value);
        }
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
            return baseAt(object, paths);
          };
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray2(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        function wrapperToIterator() {
          return this;
        }
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse3],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse3);
        }
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var countBy2 = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every2(collection, predicate, guard) {
          var func = isArray(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        function filter3(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        var find2 = createFind(findIndex2);
        var findLast2 = createFind(findLastIndex2);
        function flatMap2(collection, iteratee2) {
          return baseFlatten(map2(collection, iteratee2), 1);
        }
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map2(collection, iteratee2), INFINITY);
        }
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map2(collection, iteratee2), depth);
        }
        function forEach2(collection, iteratee2) {
          var func = isArray(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function forEachRight(collection, iteratee2) {
          var func = isArray(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        var groupBy2 = createAggregator(function(result2, value, key) {
          if (hasOwnProperty2.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes3(collection, value, fromIndex, guard) {
          collection = isArrayLike2(collection) ? collection : values2(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike2(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map2(collection, iteratee2) {
          var func = isArray(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce2(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        function reduceRight2(collection, iteratee2, accumulator) {
          var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        function reject(collection, predicate) {
          var func = isArray(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        function sample(collection) {
          var func = isArray(collection) ? arraySample : baseSample;
          return func(collection);
        }
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        function shuffle(collection) {
          var func = isArray(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike2(collection)) {
            return isString(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        function some2(collection, predicate, guard) {
          var func = isArray(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        var sortBy2 = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip2(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          };
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        function once(func) {
          return before(2, func);
        }
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest2(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        function throttle2(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        function unary(func) {
          return ary(func, 1);
        }
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray(value) ? value : [value];
        }
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys2(source));
        }
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike2(value) {
          return value != null && isLength(value.length) && !isFunction(value);
        }
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike2(value);
        }
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject2(value);
        }
        function isEmpty2(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike2(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty2.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject2(value);
        }
        function isFinite(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        function isFunction(value) {
          if (!isObject(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        function isObject(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        var isMap2 = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        function isNaN(value) {
          return isNumber(value) && value != +value;
        }
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        function isNull(value) {
          return value === null;
        }
        function isNil(value) {
          return value == null;
        }
        function isNumber(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        function isPlainObject2(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        var isSet2 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString(value) {
          return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray2(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike2(value)) {
            return isString(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values2;
          return func(value);
        }
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        function toString5(value) {
          return value == null ? "" : baseToString(value);
        }
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike2(source)) {
            copyObject(source, keys2(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty2.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys2(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty2.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey2(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        function findLastKey2(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys2(object));
        }
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        function get11(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        function has5(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        function hasIn2(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty2.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys2(object) {
          return isArrayLike2(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        function keysIn(object) {
          return isArrayLike2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        function mapKeys2(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction(value) ? value.call(object) : value;
          }
          return object;
        }
        function set3(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        var toPairs = createToPairs(keys2);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject(object)) {
              accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        function update8(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        function values2(object) {
          return object == null ? [] : baseValues(object, keys2(object));
        }
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString5(string).toLowerCase());
        }
        function deburr(string) {
          string = toString5(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        function endsWith(string, target, position) {
          string = toString5(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        function escape(string) {
          string = toString5(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        function escapeRegExp(string) {
          string = toString5(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString5(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        function padEnd(string, length, chars) {
          string = toString5(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        function padStart(string, length, chars) {
          string = toString5(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString5(string).replace(reTrimStart, ""), radix || 0);
        }
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString5(string), n);
        }
        function replace() {
          var args = arguments, string = toString5(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString5(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString5(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString5(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys2(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
          var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty2.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        function toLower(value) {
          return toString5(value).toLowerCase();
        }
        function toUpper(value) {
          return toString5(value).toUpperCase();
        }
        function trim(string, chars, guard) {
          string = toString5(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        function trimEnd(string, chars, guard) {
          string = toString5(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        function trimStart(string, chars, guard) {
          string = toString5(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString5(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString5(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        function unescape(string) {
          string = toString5(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString5(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        function constant(value) {
          return function() {
            return value;
          };
        }
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin2(object, source, options) {
          var props = keys2(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys2(source));
          }
          var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        function noop() {
        }
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        function stubFalse() {
          return false;
        }
        function stubObject() {
          return {};
        }
        function stubString() {
          return "";
        }
        function stubTrue() {
          return true;
        }
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        function toPath(value) {
          if (isArray(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString5(value)));
        }
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString5(prefix) + id;
        }
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max2(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        function maxBy2(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        function mean(array) {
          return baseMean(array, identity);
        }
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        function min2(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        function minBy2(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat2;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy2;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter3;
        lodash.flatMap = flatMap2;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten3;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip2;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy2;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys2;
        lodash.keysIn = keysIn;
        lodash.map = map2;
        lodash.mapKeys = mapKeys2;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin2;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove3;
        lodash.rest = rest2;
        lodash.reverse = reverse3;
        lodash.sampleSize = sampleSize;
        lodash.set = set3;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice3;
        lodash.sortBy = sortBy2;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take2;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile2;
        lodash.tap = tap;
        lodash.throttle = throttle2;
        lodash.thru = thru;
        lodash.toArray = toArray2;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update8;
        lodash.updateWith = updateWith;
        lodash.values = values2;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip2;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith2;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin2(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every2;
        lodash.find = find2;
        lodash.findIndex = findIndex2;
        lodash.findKey = findKey2;
        lodash.findLast = findLast2;
        lodash.findLastIndex = findLastIndex2;
        lodash.findLastKey = findLastKey2;
        lodash.floor = floor;
        lodash.forEach = forEach2;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get11;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has5;
        lodash.hasIn = hasIn2;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes3;
        lodash.indexOf = indexOf2;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike2;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty2;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap2;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject2;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet2;
        lodash.isString = isString;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join3;
        lodash.kebabCase = kebabCase;
        lodash.last = last3;
        lodash.lastIndexOf = lastIndexOf2;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max2;
        lodash.maxBy = maxBy2;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min2;
        lodash.minBy = minBy2;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce2;
        lodash.reduceRight = reduceRight2;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some2;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString5;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach2;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin2(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty2.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
            var interceptor = function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            };
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty2.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      };
      var _ = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _;
        define(function() {
          return _;
        });
      } else if (freeModule) {
        (freeModule.exports = _)._ = _;
        freeExports._ = _;
      } else {
        root._ = _;
      }
    }).call(exports);
  }
});

// js/ws.ts
init_define_process();

// js/session.ts
init_define_process();

// ../../node_modules/immutable/dist/immutable.es.js
init_define_process();
var DELETE = "delete";
var SHIFT = 5;
var SIZE = 1 << SHIFT;
var MASK = SIZE - 1;
var NOT_SET = {};
function MakeRef() {
  return { value: false };
}
function SetRef(ref) {
  if (ref) {
    ref.value = true;
  }
}
function OwnerID() {
}
function ensureSize(iter) {
  if (iter.size === void 0) {
    iter.size = iter.__iterate(returnTrue);
  }
  return iter.size;
}
function wrapIndex(iter, index) {
  if (typeof index !== "number") {
    var uint32Index = index >>> 0;
    if ("" + uint32Index !== index || uint32Index === 4294967295) {
      return NaN;
    }
    index = uint32Index;
  }
  return index < 0 ? ensureSize(iter) + index : index;
}
function returnTrue() {
  return true;
}
function wholeSlice(begin, end, size) {
  return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
}
function resolveBegin(begin, size) {
  return resolveIndex(begin, size, 0);
}
function resolveEnd(end, size) {
  return resolveIndex(end, size, size);
}
function resolveIndex(index, size, defaultIndex) {
  return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
}
function isNeg(value) {
  return value < 0 || value === 0 && 1 / value === -Infinity;
}
var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
function isCollection(maybeCollection) {
  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
}
var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
function isKeyed(maybeKeyed) {
  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
}
var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
function isIndexed(maybeIndexed) {
  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
}
function isAssociative(maybeAssociative) {
  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
}
var Collection = function Collection2(value) {
  return isCollection(value) ? value : Seq(value);
};
var KeyedCollection = function(Collection3) {
  function KeyedCollection2(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }
  if (Collection3)
    KeyedCollection2.__proto__ = Collection3;
  KeyedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  KeyedCollection2.prototype.constructor = KeyedCollection2;
  return KeyedCollection2;
}(Collection);
var IndexedCollection = function(Collection3) {
  function IndexedCollection2(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }
  if (Collection3)
    IndexedCollection2.__proto__ = Collection3;
  IndexedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  IndexedCollection2.prototype.constructor = IndexedCollection2;
  return IndexedCollection2;
}(Collection);
var SetCollection = function(Collection3) {
  function SetCollection2(value) {
    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
  }
  if (Collection3)
    SetCollection2.__proto__ = Collection3;
  SetCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  SetCollection2.prototype.constructor = SetCollection2;
  return SetCollection2;
}(Collection);
Collection.Keyed = KeyedCollection;
Collection.Indexed = IndexedCollection;
Collection.Set = SetCollection;
var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
function isSeq(maybeSeq) {
  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
}
var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isRecord(maybeRecord) {
  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
}
function isImmutable(maybeImmutable) {
  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
}
var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
function isOrdered(maybeOrdered) {
  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
}
var ITERATE_KEYS = 0;
var ITERATE_VALUES = 1;
var ITERATE_ENTRIES = 2;
var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = "@@iterator";
var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
var Iterator = function Iterator2(next) {
  this.next = next;
};
Iterator.prototype.toString = function toString() {
  return "[Iterator]";
};
Iterator.KEYS = ITERATE_KEYS;
Iterator.VALUES = ITERATE_VALUES;
Iterator.ENTRIES = ITERATE_ENTRIES;
Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
  return this.toString();
};
Iterator.prototype[ITERATOR_SYMBOL] = function() {
  return this;
};
function iteratorValue(type, k, v, iteratorResult) {
  var value = type === 0 ? k : type === 1 ? v : [k, v];
  iteratorResult ? iteratorResult.value = value : iteratorResult = {
    value,
    done: false
  };
  return iteratorResult;
}
function iteratorDone() {
  return { value: void 0, done: true };
}
function hasIterator(maybeIterable) {
  if (Array.isArray(maybeIterable)) {
    return true;
  }
  return !!getIteratorFn(maybeIterable);
}
function isIterator(maybeIterator) {
  return maybeIterator && typeof maybeIterator.next === "function";
}
function getIterator(iterable) {
  var iteratorFn = getIteratorFn(iterable);
  return iteratorFn && iteratorFn.call(iterable);
}
function getIteratorFn(iterable) {
  var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === "function") {
    return iteratorFn;
  }
}
function isEntriesIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.entries;
}
function isKeysIterable(maybeIterable) {
  var iteratorFn = getIteratorFn(maybeIterable);
  return iteratorFn && iteratorFn === maybeIterable.keys;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isArrayLike(value) {
  if (Array.isArray(value) || typeof value === "string") {
    return true;
  }
  return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? Object.keys(value).length === 1 : value.hasOwnProperty(value.length - 1));
}
var Seq = function(Collection3) {
  function Seq2(value) {
    return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
  }
  if (Collection3)
    Seq2.__proto__ = Collection3;
  Seq2.prototype = Object.create(Collection3 && Collection3.prototype);
  Seq2.prototype.constructor = Seq2;
  Seq2.prototype.toSeq = function toSeq3() {
    return this;
  };
  Seq2.prototype.toString = function toString5() {
    return this.__toString("Seq {", "}");
  };
  Seq2.prototype.cacheResult = function cacheResult() {
    if (!this._cache && this.__iterateUncached) {
      this._cache = this.entrySeq().toArray();
      this.size = this._cache.length;
    }
    return this;
  };
  Seq2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      while (i !== size) {
        var entry = cache[reverse3 ? size - ++i : i++];
        if (fn(entry[1], entry[0], this) === false) {
          break;
        }
      }
      return i;
    }
    return this.__iterateUncached(fn, reverse3);
  };
  Seq2.prototype.__iterator = function __iterator2(type, reverse3) {
    var cache = this._cache;
    if (cache) {
      var size = cache.length;
      var i = 0;
      return new Iterator(function() {
        if (i === size) {
          return iteratorDone();
        }
        var entry = cache[reverse3 ? size - ++i : i++];
        return iteratorValue(type, entry[0], entry[1]);
      });
    }
    return this.__iteratorUncached(type, reverse3);
  };
  return Seq2;
}(Collection);
var KeyedSeq = function(Seq2) {
  function KeyedSeq2(value) {
    return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
  }
  if (Seq2)
    KeyedSeq2.__proto__ = Seq2;
  KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  KeyedSeq2.prototype.constructor = KeyedSeq2;
  KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq3() {
    return this;
  };
  return KeyedSeq2;
}(Seq);
var IndexedSeq = function(Seq2) {
  function IndexedSeq2(value) {
    return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
  }
  if (Seq2)
    IndexedSeq2.__proto__ = Seq2;
  IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  IndexedSeq2.prototype.constructor = IndexedSeq2;
  IndexedSeq2.of = function of() {
    return IndexedSeq2(arguments);
  };
  IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq2() {
    return this;
  };
  IndexedSeq2.prototype.toString = function toString5() {
    return this.__toString("Seq [", "]");
  };
  return IndexedSeq2;
}(Seq);
var SetSeq = function(Seq2) {
  function SetSeq2(value) {
    return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
  }
  if (Seq2)
    SetSeq2.__proto__ = Seq2;
  SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
  SetSeq2.prototype.constructor = SetSeq2;
  SetSeq2.of = function of() {
    return SetSeq2(arguments);
  };
  SetSeq2.prototype.toSetSeq = function toSetSeq2() {
    return this;
  };
  return SetSeq2;
}(Seq);
Seq.isSeq = isSeq;
Seq.Keyed = KeyedSeq;
Seq.Set = SetSeq;
Seq.Indexed = IndexedSeq;
Seq.prototype[IS_SEQ_SYMBOL] = true;
var ArraySeq = function(IndexedSeq2) {
  function ArraySeq2(array) {
    this._array = array;
    this.size = array.length;
  }
  if (IndexedSeq2)
    ArraySeq2.__proto__ = IndexedSeq2;
  ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ArraySeq2.prototype.constructor = ArraySeq2;
  ArraySeq2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
  };
  ArraySeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    while (i !== size) {
      var ii = reverse3 ? size - ++i : i++;
      if (fn(array[ii], ii, this) === false) {
        break;
      }
    }
    return i;
  };
  ArraySeq2.prototype.__iterator = function __iterator2(type, reverse3) {
    var array = this._array;
    var size = array.length;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var ii = reverse3 ? size - ++i : i++;
      return iteratorValue(type, ii, array[ii]);
    });
  };
  return ArraySeq2;
}(IndexedSeq);
var ObjectSeq = function(KeyedSeq2) {
  function ObjectSeq2(object) {
    var keys2 = Object.keys(object).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []);
    this._object = object;
    this._keys = keys2;
    this.size = keys2.length;
  }
  if (KeyedSeq2)
    ObjectSeq2.__proto__ = KeyedSeq2;
  ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ObjectSeq2.prototype.constructor = ObjectSeq2;
  ObjectSeq2.prototype.get = function get11(key, notSetValue) {
    if (notSetValue !== void 0 && !this.has(key)) {
      return notSetValue;
    }
    return this._object[key];
  };
  ObjectSeq2.prototype.has = function has5(key) {
    return hasOwnProperty.call(this._object, key);
  };
  ObjectSeq2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var object = this._object;
    var keys2 = this._keys;
    var size = keys2.length;
    var i = 0;
    while (i !== size) {
      var key = keys2[reverse3 ? size - ++i : i++];
      if (fn(object[key], key, this) === false) {
        break;
      }
    }
    return i;
  };
  ObjectSeq2.prototype.__iterator = function __iterator2(type, reverse3) {
    var object = this._object;
    var keys2 = this._keys;
    var size = keys2.length;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var key = keys2[reverse3 ? size - ++i : i++];
      return iteratorValue(type, key, object[key]);
    });
  };
  return ObjectSeq2;
}(KeyedSeq);
ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
var CollectionSeq = function(IndexedSeq2) {
  function CollectionSeq2(collection) {
    this._collection = collection;
    this.size = collection.length || collection.size;
  }
  if (IndexedSeq2)
    CollectionSeq2.__proto__ = IndexedSeq2;
  CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  CollectionSeq2.prototype.constructor = CollectionSeq2;
  CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    var iterations = 0;
    if (isIterator(iterator)) {
      var step;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
    }
    return iterations;
  };
  CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var collection = this._collection;
    var iterator = getIterator(collection);
    if (!isIterator(iterator)) {
      return new Iterator(iteratorDone);
    }
    var iterations = 0;
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, iterations++, step.value);
    });
  };
  return CollectionSeq2;
}(IndexedSeq);
var EMPTY_SEQ;
function emptySequence() {
  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
}
function keyedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq.fromEntrySeq();
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + value);
}
function indexedSeqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return seq;
  }
  throw new TypeError("Expected Array or collection object of values: " + value);
}
function seqFromValue(value) {
  var seq = maybeIndexedSeqFromValue(value);
  if (seq) {
    return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
  }
  if (typeof value === "object") {
    return new ObjectSeq(value);
  }
  throw new TypeError("Expected Array or collection object of values, or keyed object: " + value);
}
function maybeIndexedSeqFromValue(value) {
  return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
}
var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
function isMap(maybeMap) {
  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
}
function isOrderedMap(maybeOrderedMap) {
  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
}
function isValueObject(maybeValue) {
  return Boolean(maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function");
}
function is(valueA, valueB) {
  if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
    return true;
  }
  if (!valueA || !valueB) {
    return false;
  }
  if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
    valueA = valueA.valueOf();
    valueB = valueB.valueOf();
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
  }
  return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
}
var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
  a |= 0;
  b |= 0;
  var c = a & 65535;
  var d = b & 65535;
  return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
};
function smi(i32) {
  return i32 >>> 1 & 1073741824 | i32 & 3221225471;
}
var defaultValueOf = Object.prototype.valueOf;
function hash(o) {
  if (o == null) {
    return hashNullish(o);
  }
  if (typeof o.hashCode === "function") {
    return smi(o.hashCode(o));
  }
  var v = valueOf(o);
  if (v == null) {
    return hashNullish(v);
  }
  switch (typeof v) {
    case "boolean":
      return v ? 1108378657 : 1108378656;
    case "number":
      return hashNumber(v);
    case "string":
      return v.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v) : hashString(v);
    case "object":
    case "function":
      return hashJSObj(v);
    case "symbol":
      return hashSymbol(v);
    default:
      if (typeof v.toString === "function") {
        return hashString(v.toString());
      }
      throw new Error("Value type " + typeof v + " cannot be hashed.");
  }
}
function hashNullish(nullish) {
  return nullish === null ? 1108378658 : 1108378659;
}
function hashNumber(n) {
  if (n !== n || n === Infinity) {
    return 0;
  }
  var hash2 = n | 0;
  if (hash2 !== n) {
    hash2 ^= n * 4294967295;
  }
  while (n > 4294967295) {
    n /= 4294967295;
    hash2 ^= n;
  }
  return smi(hash2);
}
function cachedHashString(string) {
  var hashed = stringHashCache[string];
  if (hashed === void 0) {
    hashed = hashString(string);
    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
      STRING_HASH_CACHE_SIZE = 0;
      stringHashCache = {};
    }
    STRING_HASH_CACHE_SIZE++;
    stringHashCache[string] = hashed;
  }
  return hashed;
}
function hashString(string) {
  var hashed = 0;
  for (var ii = 0; ii < string.length; ii++) {
    hashed = 31 * hashed + string.charCodeAt(ii) | 0;
  }
  return smi(hashed);
}
function hashSymbol(sym) {
  var hashed = symbolMap[sym];
  if (hashed !== void 0) {
    return hashed;
  }
  hashed = nextHash();
  symbolMap[sym] = hashed;
  return hashed;
}
function hashJSObj(obj) {
  var hashed;
  if (usingWeakMap) {
    hashed = weakMap.get(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = obj[UID_HASH_KEY];
  if (hashed !== void 0) {
    return hashed;
  }
  if (!canDefineProperty) {
    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
    if (hashed !== void 0) {
      return hashed;
    }
    hashed = getIENodeHash(obj);
    if (hashed !== void 0) {
      return hashed;
    }
  }
  hashed = nextHash();
  if (usingWeakMap) {
    weakMap.set(obj, hashed);
  } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
    throw new Error("Non-extensible objects are not allowed as keys.");
  } else if (canDefineProperty) {
    Object.defineProperty(obj, UID_HASH_KEY, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: hashed
    });
  } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
    obj.propertyIsEnumerable = function() {
      return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
    };
    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
  } else if (obj.nodeType !== void 0) {
    obj[UID_HASH_KEY] = hashed;
  } else {
    throw new Error("Unable to set a non-enumerable property on object.");
  }
  return hashed;
}
var isExtensible = Object.isExtensible;
var canDefineProperty = function() {
  try {
    Object.defineProperty({}, "@", {});
    return true;
  } catch (e) {
    return false;
  }
}();
function getIENodeHash(node) {
  if (node && node.nodeType > 0) {
    switch (node.nodeType) {
      case 1:
        return node.uniqueID;
      case 9:
        return node.documentElement && node.documentElement.uniqueID;
    }
  }
}
function valueOf(obj) {
  return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
}
function nextHash() {
  var nextHash2 = ++_objHashUID;
  if (_objHashUID & 1073741824) {
    _objHashUID = 0;
  }
  return nextHash2;
}
var usingWeakMap = typeof WeakMap === "function";
var weakMap;
if (usingWeakMap) {
  weakMap = /* @__PURE__ */ new WeakMap();
}
var symbolMap = /* @__PURE__ */ Object.create(null);
var _objHashUID = 0;
var UID_HASH_KEY = "__immutablehash__";
if (typeof Symbol === "function") {
  UID_HASH_KEY = Symbol(UID_HASH_KEY);
}
var STRING_HASH_CACHE_MIN_STRLEN = 16;
var STRING_HASH_CACHE_MAX_SIZE = 255;
var STRING_HASH_CACHE_SIZE = 0;
var stringHashCache = {};
var ToKeyedSequence = function(KeyedSeq2) {
  function ToKeyedSequence2(indexed, useKeys) {
    this._iter = indexed;
    this._useKeys = useKeys;
    this.size = indexed.size;
  }
  if (KeyedSeq2)
    ToKeyedSequence2.__proto__ = KeyedSeq2;
  ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
  ToKeyedSequence2.prototype.get = function get11(key, notSetValue) {
    return this._iter.get(key, notSetValue);
  };
  ToKeyedSequence2.prototype.has = function has5(key) {
    return this._iter.has(key);
  };
  ToKeyedSequence2.prototype.valueSeq = function valueSeq2() {
    return this._iter.valueSeq();
  };
  ToKeyedSequence2.prototype.reverse = function reverse3() {
    var this$1$1 = this;
    var reversedSequence = reverseFactory(this, true);
    if (!this._useKeys) {
      reversedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().reverse();
      };
    }
    return reversedSequence;
  };
  ToKeyedSequence2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    var mappedSequence = mapFactory(this, mapper, context);
    if (!this._useKeys) {
      mappedSequence.valueSeq = function() {
        return this$1$1._iter.toSeq().map(mapper, context);
      };
    }
    return mappedSequence;
  };
  ToKeyedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v, k) {
      return fn(v, k, this$1$1);
    }, reverse3);
  };
  ToKeyedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._iter.__iterator(type, reverse3);
  };
  return ToKeyedSequence2;
}(KeyedSeq);
ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
var ToIndexedSequence = function(IndexedSeq2) {
  function ToIndexedSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  if (IndexedSeq2)
    ToIndexedSequence2.__proto__ = IndexedSeq2;
  ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
  ToIndexedSequence2.prototype.includes = function includes3(value) {
    return this._iter.includes(value);
  };
  ToIndexedSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var i = 0;
    reverse3 && ensureSize(this);
    return this._iter.__iterate(function(v) {
      return fn(v, reverse3 ? this$1$1.size - ++i : i++, this$1$1);
    }, reverse3);
  };
  ToIndexedSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var this$1$1 = this;
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    var i = 0;
    reverse3 && ensureSize(this);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, reverse3 ? this$1$1.size - ++i : i++, step.value, step);
    });
  };
  return ToIndexedSequence2;
}(IndexedSeq);
var ToSetSequence = function(SetSeq2) {
  function ToSetSequence2(iter) {
    this._iter = iter;
    this.size = iter.size;
  }
  if (SetSeq2)
    ToSetSequence2.__proto__ = SetSeq2;
  ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
  ToSetSequence2.prototype.constructor = ToSetSequence2;
  ToSetSequence2.prototype.has = function has5(key) {
    return this._iter.includes(key);
  };
  ToSetSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(v) {
      return fn(v, v, this$1$1);
    }, reverse3);
  };
  ToSetSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      return step.done ? step : iteratorValue(type, step.value, step.value, step);
    });
  };
  return ToSetSequence2;
}(SetSeq);
var FromEntriesSequence = function(KeyedSeq2) {
  function FromEntriesSequence2(entries3) {
    this._iter = entries3;
    this.size = entries3.size;
  }
  if (KeyedSeq2)
    FromEntriesSequence2.__proto__ = KeyedSeq2;
  FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
  FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
  FromEntriesSequence2.prototype.entrySeq = function entrySeq2() {
    return this._iter.toSeq();
  };
  FromEntriesSequence2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._iter.__iterate(function(entry) {
      if (entry) {
        validateEntry(entry);
        var indexedCollection = isCollection(entry);
        return fn(indexedCollection ? entry.get(1) : entry[1], indexedCollection ? entry.get(0) : entry[0], this$1$1);
      }
    }, reverse3);
  };
  FromEntriesSequence2.prototype.__iterator = function __iterator2(type, reverse3) {
    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse3);
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return iteratorValue(type, indexedCollection ? entry.get(0) : entry[0], indexedCollection ? entry.get(1) : entry[1], step);
        }
      }
    });
  };
  return FromEntriesSequence2;
}(KeyedSeq);
ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
function flipFactory(collection) {
  var flipSequence = makeSequence(collection);
  flipSequence._iter = collection;
  flipSequence.size = collection.size;
  flipSequence.flip = function() {
    return collection;
  };
  flipSequence.reverse = function() {
    var reversedSequence = collection.reverse.apply(this);
    reversedSequence.flip = function() {
      return collection.reverse();
    };
    return reversedSequence;
  };
  flipSequence.has = function(key) {
    return collection.includes(key);
  };
  flipSequence.includes = function(key) {
    return collection.has(key);
  };
  flipSequence.cacheResult = cacheResultThrough;
  flipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(function(v, k) {
      return fn(k, v, this$1$1) !== false;
    }, reverse3);
  };
  flipSequence.__iteratorUncached = function(type, reverse3) {
    if (type === ITERATE_ENTRIES) {
      var iterator = collection.__iterator(type, reverse3);
      return new Iterator(function() {
        var step = iterator.next();
        if (!step.done) {
          var k = step.value[0];
          step.value[0] = step.value[1];
          step.value[1] = k;
        }
        return step;
      });
    }
    return collection.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse3);
  };
  return flipSequence;
}
function mapFactory(collection, mapper, context) {
  var mappedSequence = makeSequence(collection);
  mappedSequence.size = collection.size;
  mappedSequence.has = function(key) {
    return collection.has(key);
  };
  mappedSequence.get = function(key, notSetValue) {
    var v = collection.get(key, NOT_SET);
    return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
  };
  mappedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    return collection.__iterate(function(v, k, c) {
      return fn(mapper.call(context, v, k, c), k, this$1$1) !== false;
    }, reverse3);
  };
  mappedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var key = entry[0];
      return iteratorValue(type, key, mapper.call(context, entry[1], key, collection), step);
    });
  };
  return mappedSequence;
}
function reverseFactory(collection, useKeys) {
  var this$1$1 = this;
  var reversedSequence = makeSequence(collection);
  reversedSequence._iter = collection;
  reversedSequence.size = collection.size;
  reversedSequence.reverse = function() {
    return collection;
  };
  if (collection.flip) {
    reversedSequence.flip = function() {
      var flipSequence = flipFactory(collection);
      flipSequence.reverse = function() {
        return collection.flip();
      };
      return flipSequence;
    };
  }
  reversedSequence.get = function(key, notSetValue) {
    return collection.get(useKeys ? key : -1 - key, notSetValue);
  };
  reversedSequence.has = function(key) {
    return collection.has(useKeys ? key : -1 - key);
  };
  reversedSequence.includes = function(value) {
    return collection.includes(value);
  };
  reversedSequence.cacheResult = cacheResultThrough;
  reversedSequence.__iterate = function(fn, reverse3) {
    var this$1$12 = this;
    var i = 0;
    reverse3 && ensureSize(collection);
    return collection.__iterate(function(v, k) {
      return fn(v, useKeys ? k : reverse3 ? this$1$12.size - ++i : i++, this$1$12);
    }, !reverse3);
  };
  reversedSequence.__iterator = function(type, reverse3) {
    var i = 0;
    reverse3 && ensureSize(collection);
    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse3);
    return new Iterator(function() {
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      return iteratorValue(type, useKeys ? entry[0] : reverse3 ? this$1$1.size - ++i : i++, entry[1], step);
    });
  };
  return reversedSequence;
}
function filterFactory(collection, predicate, context, useKeys) {
  var filterSequence = makeSequence(collection);
  if (useKeys) {
    filterSequence.has = function(key) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
    };
    filterSequence.get = function(key, notSetValue) {
      var v = collection.get(key, NOT_SET);
      return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
    };
  }
  filterSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    }, reverse3);
    return iterations;
  };
  filterSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterations = 0;
    return new Iterator(function() {
      while (true) {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        var value = entry[1];
        if (predicate.call(context, value, key, collection)) {
          return iteratorValue(type, useKeys ? key : iterations++, value, step);
        }
      }
    });
  };
  return filterSequence;
}
function countByFactory(collection, grouper, context) {
  var groups = Map().asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), 0, function(a) {
      return a + 1;
    });
  });
  return groups.asImmutable();
}
function groupByFactory(collection, grouper, context) {
  var isKeyedIter = isKeyed(collection);
  var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
  collection.__iterate(function(v, k) {
    groups.update(grouper.call(context, v, k, collection), function(a) {
      return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
    });
  });
  var coerce = collectionClass(collection);
  return groups.map(function(arr) {
    return reify(collection, coerce(arr));
  }).asImmutable();
}
function sliceFactory(collection, begin, end, useKeys) {
  var originalSize = collection.size;
  if (wholeSlice(begin, end, originalSize)) {
    return collection;
  }
  var resolvedBegin = resolveBegin(begin, originalSize);
  var resolvedEnd = resolveEnd(end, originalSize);
  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
  }
  var resolvedSize = resolvedEnd - resolvedBegin;
  var sliceSize;
  if (resolvedSize === resolvedSize) {
    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
  }
  var sliceSeq = makeSequence(collection);
  sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
    sliceSeq.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
    };
  }
  sliceSeq.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (sliceSize === 0) {
      return 0;
    }
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var skipped = 0;
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k) {
      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
      }
    });
    return iterations;
  };
  sliceSeq.__iteratorUncached = function(type, reverse3) {
    if (sliceSize !== 0 && reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    if (sliceSize === 0) {
      return new Iterator(iteratorDone);
    }
    var iterator = collection.__iterator(type, reverse3);
    var skipped = 0;
    var iterations = 0;
    return new Iterator(function() {
      while (skipped++ < resolvedBegin) {
        iterator.next();
      }
      if (++iterations > sliceSize) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (useKeys || type === ITERATE_VALUES || step.done) {
        return step;
      }
      if (type === ITERATE_KEYS) {
        return iteratorValue(type, iterations - 1, void 0, step);
      }
      return iteratorValue(type, iterations - 1, step.value[1], step);
    });
  };
  return sliceSeq;
}
function takeWhileFactory(collection, predicate, context) {
  var takeSequence = makeSequence(collection);
  takeSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1$1);
    });
    return iterations;
  };
  takeSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var iterating = true;
    return new Iterator(function() {
      if (!iterating) {
        return iteratorDone();
      }
      var step = iterator.next();
      if (step.done) {
        return step;
      }
      var entry = step.value;
      var k = entry[0];
      var v = entry[1];
      if (!predicate.call(context, v, k, this$1$1)) {
        iterating = false;
        return iteratorDone();
      }
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return takeSequence;
}
function skipWhileFactory(collection, predicate, context, useKeys) {
  var skipSequence = makeSequence(collection);
  skipSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var isSkipping = true;
    var iterations = 0;
    collection.__iterate(function(v, k, c) {
      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
        iterations++;
        return fn(v, useKeys ? k : iterations - 1, this$1$1);
      }
    });
    return iterations;
  };
  skipSequence.__iteratorUncached = function(type, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse3);
    var skipping = true;
    var iterations = 0;
    return new Iterator(function() {
      var step;
      var k;
      var v;
      do {
        step = iterator.next();
        if (step.done) {
          if (useKeys || type === ITERATE_VALUES) {
            return step;
          }
          if (type === ITERATE_KEYS) {
            return iteratorValue(type, iterations++, void 0, step);
          }
          return iteratorValue(type, iterations++, step.value[1], step);
        }
        var entry = step.value;
        k = entry[0];
        v = entry[1];
        skipping && (skipping = predicate.call(context, v, k, this$1$1));
      } while (skipping);
      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
    });
  };
  return skipSequence;
}
function concatFactory(collection, values2) {
  var isKeyedCollection = isKeyed(collection);
  var iters = [collection].concat(values2).map(function(v) {
    if (!isCollection(v)) {
      v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
    } else if (isKeyedCollection) {
      v = KeyedCollection(v);
    }
    return v;
  }).filter(function(v) {
    return v.size !== 0;
  });
  if (iters.length === 0) {
    return collection;
  }
  if (iters.length === 1) {
    var singleton = iters[0];
    if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
      return singleton;
    }
  }
  var concatSeq = new ArraySeq(iters);
  if (isKeyedCollection) {
    concatSeq = concatSeq.toKeyedSeq();
  } else if (!isIndexed(collection)) {
    concatSeq = concatSeq.toSetSeq();
  }
  concatSeq = concatSeq.flatten(true);
  concatSeq.size = iters.reduce(function(sum, seq) {
    if (sum !== void 0) {
      var size = seq.size;
      if (size !== void 0) {
        return sum + size;
      }
    }
  }, 0);
  return concatSeq;
}
function flattenFactory(collection, depth, useKeys) {
  var flatSequence = makeSequence(collection);
  flatSequence.__iterateUncached = function(fn, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterate(fn, reverse3);
    }
    var iterations = 0;
    var stopped = false;
    function flatDeep(iter, currentDepth) {
      iter.__iterate(function(v, k) {
        if ((!depth || currentDepth < depth) && isCollection(v)) {
          flatDeep(v, currentDepth + 1);
        } else {
          iterations++;
          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
            stopped = true;
          }
        }
        return !stopped;
      }, reverse3);
    }
    flatDeep(collection, 0);
    return iterations;
  };
  flatSequence.__iteratorUncached = function(type, reverse3) {
    if (reverse3) {
      return this.cacheResult().__iterator(type, reverse3);
    }
    var iterator = collection.__iterator(type, reverse3);
    var stack = [];
    var iterations = 0;
    return new Iterator(function() {
      while (iterator) {
        var step = iterator.next();
        if (step.done !== false) {
          iterator = stack.pop();
          continue;
        }
        var v = step.value;
        if (type === ITERATE_ENTRIES) {
          v = v[1];
        }
        if ((!depth || stack.length < depth) && isCollection(v)) {
          stack.push(iterator);
          iterator = v.__iterator(type, reverse3);
        } else {
          return useKeys ? step : iteratorValue(type, iterations++, v, step);
        }
      }
      return iteratorDone();
    });
  };
  return flatSequence;
}
function flatMapFactory(collection, mapper, context) {
  var coerce = collectionClass(collection);
  return collection.toSeq().map(function(v, k) {
    return coerce(mapper.call(context, v, k, collection));
  }).flatten(true);
}
function interposeFactory(collection, separator) {
  var interposedSequence = makeSequence(collection);
  interposedSequence.size = collection.size && collection.size * 2 - 1;
  interposedSequence.__iterateUncached = function(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    collection.__iterate(function(v) {
      return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v, iterations++, this$1$1) !== false;
    }, reverse3);
    return iterations;
  };
  interposedSequence.__iteratorUncached = function(type, reverse3) {
    var iterator = collection.__iterator(ITERATE_VALUES, reverse3);
    var iterations = 0;
    var step;
    return new Iterator(function() {
      if (!step || iterations % 2) {
        step = iterator.next();
        if (step.done) {
          return step;
        }
      }
      return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
    });
  };
  return interposedSequence;
}
function sortFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  var isKeyedCollection = isKeyed(collection);
  var index = 0;
  var entries3 = collection.toSeq().map(function(v, k) {
    return [k, v, index++, mapper ? mapper(v, k, collection) : v];
  }).valueSeq().toArray();
  entries3.sort(function(a, b) {
    return comparator(a[3], b[3]) || a[2] - b[2];
  }).forEach(isKeyedCollection ? function(v, i) {
    entries3[i].length = 2;
  } : function(v, i) {
    entries3[i] = v[1];
  });
  return isKeyedCollection ? KeyedSeq(entries3) : isIndexed(collection) ? IndexedSeq(entries3) : SetSeq(entries3);
}
function maxFactory(collection, comparator, mapper) {
  if (!comparator) {
    comparator = defaultComparator;
  }
  if (mapper) {
    var entry = collection.toSeq().map(function(v, k) {
      return [v, mapper(v, k, collection)];
    }).reduce(function(a, b) {
      return maxCompare(comparator, a[1], b[1]) ? b : a;
    });
    return entry && entry[0];
  }
  return collection.reduce(function(a, b) {
    return maxCompare(comparator, a, b) ? b : a;
  });
}
function maxCompare(comparator, a, b) {
  var comp = comparator(b, a);
  return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
}
function zipWithFactory(keyIter, zipper, iters, zipAll2) {
  var zipSequence = makeSequence(keyIter);
  var sizes = new ArraySeq(iters).map(function(i) {
    return i.size;
  });
  zipSequence.size = zipAll2 ? sizes.max() : sizes.min();
  zipSequence.__iterate = function(fn, reverse3) {
    var iterator = this.__iterator(ITERATE_VALUES, reverse3);
    var step;
    var iterations = 0;
    while (!(step = iterator.next()).done) {
      if (fn(step.value, iterations++, this) === false) {
        break;
      }
    }
    return iterations;
  };
  zipSequence.__iteratorUncached = function(type, reverse3) {
    var iterators = iters.map(function(i) {
      return i = Collection(i), getIterator(reverse3 ? i.reverse() : i);
    });
    var iterations = 0;
    var isDone = false;
    return new Iterator(function() {
      var steps;
      if (!isDone) {
        steps = iterators.map(function(i) {
          return i.next();
        });
        isDone = zipAll2 ? steps.every(function(s) {
          return s.done;
        }) : steps.some(function(s) {
          return s.done;
        });
      }
      if (isDone) {
        return iteratorDone();
      }
      return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function(s) {
        return s.value;
      })));
    });
  };
  return zipSequence;
}
function reify(iter, seq) {
  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
}
function validateEntry(entry) {
  if (entry !== Object(entry)) {
    throw new TypeError("Expected [K, V] tuple: " + entry);
  }
}
function collectionClass(collection) {
  return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
}
function makeSequence(collection) {
  return Object.create((isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype);
}
function cacheResultThrough() {
  if (this._iter.cacheResult) {
    this._iter.cacheResult();
    this.size = this._iter.size;
    return this;
  }
  return Seq.prototype.cacheResult.call(this);
}
function defaultComparator(a, b) {
  if (a === void 0 && b === void 0) {
    return 0;
  }
  if (a === void 0) {
    return 1;
  }
  if (b === void 0) {
    return -1;
  }
  return a > b ? 1 : a < b ? -1 : 0;
}
function arrCopy(arr, offset) {
  offset = offset || 0;
  var len = Math.max(0, arr.length - offset);
  var newArr = new Array(len);
  for (var ii = 0; ii < len; ii++) {
    newArr[ii] = arr[ii + offset];
  }
  return newArr;
}
function invariant(condition, error) {
  if (!condition) {
    throw new Error(error);
  }
}
function assertNotInfinite(size) {
  invariant(size !== Infinity, "Cannot perform this action with an infinite size.");
}
function coerceKeyPath(keyPath) {
  if (isArrayLike(keyPath) && typeof keyPath !== "string") {
    return keyPath;
  }
  if (isOrdered(keyPath)) {
    return keyPath.toArray();
  }
  throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + keyPath);
}
var toString2 = Object.prototype.toString;
function isPlainObject(value) {
  if (!value || typeof value !== "object" || toString2.call(value) !== "[object Object]") {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  var parentProto = proto;
  var nextProto = Object.getPrototypeOf(proto);
  while (nextProto !== null) {
    parentProto = nextProto;
    nextProto = Object.getPrototypeOf(parentProto);
  }
  return parentProto === proto;
}
function isDataStructure(value) {
  return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
}
function quoteString(value) {
  try {
    return typeof value === "string" ? JSON.stringify(value) : String(value);
  } catch (_ignoreError) {
    return JSON.stringify(value);
  }
}
function has(collection, key) {
  return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
}
function get(collection, key, notSetValue) {
  return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
}
function shallowCopy(from) {
  if (Array.isArray(from)) {
    return arrCopy(from);
  }
  var to = {};
  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      to[key] = from[key];
    }
  }
  return to;
}
function remove(collection, key) {
  if (!isDataStructure(collection)) {
    throw new TypeError("Cannot update non-data-structure value: " + collection);
  }
  if (isImmutable(collection)) {
    if (!collection.remove) {
      throw new TypeError("Cannot update immutable value without .remove() method: " + collection);
    }
    return collection.remove(key);
  }
  if (!hasOwnProperty.call(collection, key)) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  if (Array.isArray(collectionCopy)) {
    collectionCopy.splice(key, 1);
  } else {
    delete collectionCopy[key];
  }
  return collectionCopy;
}
function set(collection, key, value) {
  if (!isDataStructure(collection)) {
    throw new TypeError("Cannot update non-data-structure value: " + collection);
  }
  if (isImmutable(collection)) {
    if (!collection.set) {
      throw new TypeError("Cannot update immutable value without .set() method: " + collection);
    }
    return collection.set(key, value);
  }
  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
    return collection;
  }
  var collectionCopy = shallowCopy(collection);
  collectionCopy[key] = value;
  return collectionCopy;
}
function updateIn$1(collection, keyPath, notSetValue, updater) {
  if (!updater) {
    updater = notSetValue;
    notSetValue = void 0;
  }
  var updatedValue = updateInDeeply(isImmutable(collection), collection, coerceKeyPath(keyPath), 0, notSetValue, updater);
  return updatedValue === NOT_SET ? notSetValue : updatedValue;
}
function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
  var wasNotSet = existing === NOT_SET;
  if (i === keyPath.length) {
    var existingValue = wasNotSet ? notSetValue : existing;
    var newValue = updater(existingValue);
    return newValue === existingValue ? existing : newValue;
  }
  if (!wasNotSet && !isDataStructure(existing)) {
    throw new TypeError("Cannot update within non-data-structure value in path [" + keyPath.slice(0, i).map(quoteString) + "]: " + existing);
  }
  var key = keyPath[i];
  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
  var nextUpdated = updateInDeeply(nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting), nextExisting, keyPath, i + 1, notSetValue, updater);
  return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(wasNotSet ? inImmutable ? emptyMap() : {} : existing, key, nextUpdated);
}
function setIn$1(collection, keyPath, value) {
  return updateIn$1(collection, keyPath, NOT_SET, function() {
    return value;
  });
}
function setIn(keyPath, v) {
  return setIn$1(this, keyPath, v);
}
function removeIn(collection, keyPath) {
  return updateIn$1(collection, keyPath, function() {
    return NOT_SET;
  });
}
function deleteIn(keyPath) {
  return removeIn(this, keyPath);
}
function update$1(collection, key, notSetValue, updater) {
  return updateIn$1(collection, [key], notSetValue, updater);
}
function update(key, notSetValue, updater) {
  return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
}
function updateIn(keyPath, notSetValue, updater) {
  return updateIn$1(this, keyPath, notSetValue, updater);
}
function merge$1() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeIntoKeyedWith(this, iters);
}
function mergeWith$1(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  if (typeof merger !== "function") {
    throw new TypeError("Invalid merger function: " + merger);
  }
  return mergeIntoKeyedWith(this, iters, merger);
}
function mergeIntoKeyedWith(collection, collections, merger) {
  var iters = [];
  for (var ii = 0; ii < collections.length; ii++) {
    var collection$1 = KeyedCollection(collections[ii]);
    if (collection$1.size !== 0) {
      iters.push(collection$1);
    }
  }
  if (iters.length === 0) {
    return collection;
  }
  if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
    return collection.constructor(iters[0]);
  }
  return collection.withMutations(function(collection2) {
    var mergeIntoCollection = merger ? function(value, key) {
      update$1(collection2, key, NOT_SET, function(oldVal) {
        return oldVal === NOT_SET ? value : merger(oldVal, value, key);
      });
    } : function(value, key) {
      collection2.set(key, value);
    };
    for (var ii2 = 0; ii2 < iters.length; ii2++) {
      iters[ii2].forEach(mergeIntoCollection);
    }
  });
}
function mergeDeepWithSources(collection, sources, merger) {
  return mergeWithSources(collection, sources, deepMergerWith(merger));
}
function mergeWithSources(collection, sources, merger) {
  if (!isDataStructure(collection)) {
    throw new TypeError("Cannot merge into non-data-structure value: " + collection);
  }
  if (isImmutable(collection)) {
    return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
  }
  var isArray = Array.isArray(collection);
  var merged = collection;
  var Collection3 = isArray ? IndexedCollection : KeyedCollection;
  var mergeItem = isArray ? function(value) {
    if (merged === collection) {
      merged = shallowCopy(merged);
    }
    merged.push(value);
  } : function(value, key) {
    var hasVal = hasOwnProperty.call(merged, key);
    var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
    if (!hasVal || nextVal !== merged[key]) {
      if (merged === collection) {
        merged = shallowCopy(merged);
      }
      merged[key] = nextVal;
    }
  };
  for (var i = 0; i < sources.length; i++) {
    Collection3(sources[i]).forEach(mergeItem);
  }
  return merged;
}
function deepMergerWith(merger) {
  function deepMerger(oldValue, newValue, key) {
    return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
  }
  return deepMerger;
}
function areMergeable(oldDataStructure, newDataStructure) {
  var oldSeq = Seq(oldDataStructure);
  var newSeq = Seq(newDataStructure);
  return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
}
function mergeDeep() {
  var iters = [], len = arguments.length;
  while (len--)
    iters[len] = arguments[len];
  return mergeDeepWithSources(this, iters);
}
function mergeDeepWith(merger) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return mergeDeepWithSources(this, iters, merger);
}
function mergeIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeWithSources(m, iters);
  });
}
function mergeDeepIn(keyPath) {
  var iters = [], len = arguments.length - 1;
  while (len-- > 0)
    iters[len] = arguments[len + 1];
  return updateIn$1(this, keyPath, emptyMap(), function(m) {
    return mergeDeepWithSources(m, iters);
  });
}
function withMutations(fn) {
  var mutable = this.asMutable();
  fn(mutable);
  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
}
function asMutable() {
  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
}
function asImmutable() {
  return this.__ensureOwner();
}
function wasAltered() {
  return this.__altered;
}
var Map = function(KeyedCollection2) {
  function Map2(value) {
    return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
      var iter = KeyedCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  if (KeyedCollection2)
    Map2.__proto__ = KeyedCollection2;
  Map2.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
  Map2.prototype.constructor = Map2;
  Map2.of = function of() {
    var keyValues = [], len = arguments.length;
    while (len--)
      keyValues[len] = arguments[len];
    return emptyMap().withMutations(function(map2) {
      for (var i = 0; i < keyValues.length; i += 2) {
        if (i + 1 >= keyValues.length) {
          throw new Error("Missing value for key: " + keyValues[i]);
        }
        map2.set(keyValues[i], keyValues[i + 1]);
      }
    });
  };
  Map2.prototype.toString = function toString5() {
    return this.__toString("Map {", "}");
  };
  Map2.prototype.get = function get11(k, notSetValue) {
    return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
  };
  Map2.prototype.set = function set3(k, v) {
    return updateMap(this, k, v);
  };
  Map2.prototype.remove = function remove3(k) {
    return updateMap(this, k, NOT_SET);
  };
  Map2.prototype.deleteAll = function deleteAll(keys2) {
    var collection = Collection(keys2);
    if (collection.size === 0) {
      return this;
    }
    return this.withMutations(function(map2) {
      collection.forEach(function(key) {
        return map2.remove(key);
      });
    });
  };
  Map2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._root = null;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyMap();
  };
  Map2.prototype.sort = function sort2(comparator) {
    return OrderedMap(sortFactory(this, comparator));
  };
  Map2.prototype.sortBy = function sortBy2(mapper, comparator) {
    return OrderedMap(sortFactory(this, comparator, mapper));
  };
  Map2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(map3) {
      map3.forEach(function(value, key) {
        map3.set(key, mapper.call(context, value, key, this$1$1));
      });
    });
  };
  Map2.prototype.__iterator = function __iterator2(type, reverse3) {
    return new MapIterator(this, type, reverse3);
  };
  Map2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    var iterations = 0;
    this._root && this._root.iterate(function(entry) {
      iterations++;
      return fn(entry[1], entry[0], this$1$1);
    }, reverse3);
    return iterations;
  };
  Map2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeMap(this.size, this._root, ownerID, this.__hash);
  };
  return Map2;
}(KeyedCollection);
Map.isMap = isMap;
var MapPrototype = Map.prototype;
MapPrototype[IS_MAP_SYMBOL] = true;
MapPrototype[DELETE] = MapPrototype.remove;
MapPrototype.removeAll = MapPrototype.deleteAll;
MapPrototype.setIn = setIn;
MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
MapPrototype.update = update;
MapPrototype.updateIn = updateIn;
MapPrototype.merge = MapPrototype.concat = merge$1;
MapPrototype.mergeWith = mergeWith$1;
MapPrototype.mergeDeep = mergeDeep;
MapPrototype.mergeDeepWith = mergeDeepWith;
MapPrototype.mergeIn = mergeIn;
MapPrototype.mergeDeepIn = mergeDeepIn;
MapPrototype.withMutations = withMutations;
MapPrototype.wasAltered = wasAltered;
MapPrototype.asImmutable = asImmutable;
MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
MapPrototype["@@transducer/step"] = function(result, arr) {
  return result.set(arr[0], arr[1]);
};
MapPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
var ArrayMapNode = function ArrayMapNode2(ownerID, entries3) {
  this.ownerID = ownerID;
  this.entries = entries3;
};
ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
};
ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var entries3 = this.entries;
  var idx = 0;
  var len = entries3.length;
  for (; idx < len; idx++) {
    if (is(key, entries3[idx][0])) {
      break;
    }
  }
  var exists = idx < len;
  if (exists ? entries3[idx][1] === value : removed) {
    return this;
  }
  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);
  if (removed && entries3.length === 1) {
    return;
  }
  if (!exists && !removed && entries3.length >= MAX_ARRAY_MAP_SIZE) {
    return createNodes(ownerID, entries3, key, value);
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries3 : arrCopy(entries3);
  if (exists) {
    if (removed) {
      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }
  if (isEditable) {
    this.entries = newEntries;
    return this;
  }
  return new ArrayMapNode(ownerID, newEntries);
};
var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
  this.ownerID = ownerID;
  this.bitmap = bitmap;
  this.nodes = nodes;
};
BitmapIndexedNode.prototype.get = function get3(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
  var bitmap = this.bitmap;
  return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
};
BitmapIndexedNode.prototype.update = function update3(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var bit = 1 << keyHashFrag;
  var bitmap = this.bitmap;
  var exists = (bitmap & bit) !== 0;
  if (!exists && value === NOT_SET) {
    return this;
  }
  var idx = popCount(bitmap & bit - 1);
  var nodes = this.nodes;
  var node = exists ? nodes[idx] : void 0;
  var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
  if (newNode === node) {
    return this;
  }
  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
  }
  if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
    return nodes[idx ^ 1];
  }
  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
    return newNode;
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
  var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
  if (isEditable) {
    this.bitmap = newBitmap;
    this.nodes = newNodes;
    return this;
  }
  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
};
var HashArrayMapNode = function HashArrayMapNode2(ownerID, count2, nodes) {
  this.ownerID = ownerID;
  this.count = count2;
  this.nodes = nodes;
};
HashArrayMapNode.prototype.get = function get4(shift, keyHash, key, notSetValue) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var node = this.nodes[idx];
  return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
};
HashArrayMapNode.prototype.update = function update4(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var removed = value === NOT_SET;
  var nodes = this.nodes;
  var node = nodes[idx];
  if (removed && !node) {
    return this;
  }
  var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
  if (newNode === node) {
    return this;
  }
  var newCount = this.count;
  if (!node) {
    newCount++;
  } else if (!newNode) {
    newCount--;
    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
      return packNodes(ownerID, nodes, newCount, idx);
    }
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newNodes = setAt(nodes, idx, newNode, isEditable);
  if (isEditable) {
    this.count = newCount;
    this.nodes = newNodes;
    return this;
  }
  return new HashArrayMapNode(ownerID, newCount, newNodes);
};
var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries3) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entries = entries3;
};
HashCollisionNode.prototype.get = function get5(shift, keyHash, key, notSetValue) {
  var entries3 = this.entries;
  for (var ii = 0, len = entries3.length; ii < len; ii++) {
    if (is(key, entries3[ii][0])) {
      return entries3[ii][1];
    }
  }
  return notSetValue;
};
HashCollisionNode.prototype.update = function update5(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (keyHash === void 0) {
    keyHash = hash(key);
  }
  var removed = value === NOT_SET;
  if (keyHash !== this.keyHash) {
    if (removed) {
      return this;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
  }
  var entries3 = this.entries;
  var idx = 0;
  var len = entries3.length;
  for (; idx < len; idx++) {
    if (is(key, entries3[idx][0])) {
      break;
    }
  }
  var exists = idx < len;
  if (exists ? entries3[idx][1] === value : removed) {
    return this;
  }
  SetRef(didAlter);
  (removed || !exists) && SetRef(didChangeSize);
  if (removed && len === 2) {
    return new ValueNode(ownerID, this.keyHash, entries3[idx ^ 1]);
  }
  var isEditable = ownerID && ownerID === this.ownerID;
  var newEntries = isEditable ? entries3 : arrCopy(entries3);
  if (exists) {
    if (removed) {
      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
    } else {
      newEntries[idx] = [key, value];
    }
  } else {
    newEntries.push([key, value]);
  }
  if (isEditable) {
    this.entries = newEntries;
    return this;
  }
  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
};
var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
  this.ownerID = ownerID;
  this.keyHash = keyHash;
  this.entry = entry;
};
ValueNode.prototype.get = function get6(shift, keyHash, key, notSetValue) {
  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
};
ValueNode.prototype.update = function update6(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  var removed = value === NOT_SET;
  var keyMatch = is(key, this.entry[0]);
  if (keyMatch ? value === this.entry[1] : removed) {
    return this;
  }
  SetRef(didAlter);
  if (removed) {
    SetRef(didChangeSize);
    return;
  }
  if (keyMatch) {
    if (ownerID && ownerID === this.ownerID) {
      this.entry[1] = value;
      return this;
    }
    return new ValueNode(ownerID, this.keyHash, [key, value]);
  }
  SetRef(didChangeSize);
  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
};
ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse3) {
  var entries3 = this.entries;
  for (var ii = 0, maxIndex = entries3.length - 1; ii <= maxIndex; ii++) {
    if (fn(entries3[reverse3 ? maxIndex - ii : ii]) === false) {
      return false;
    }
  }
};
BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse3) {
  var nodes = this.nodes;
  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
    var node = nodes[reverse3 ? maxIndex - ii : ii];
    if (node && node.iterate(fn, reverse3) === false) {
      return false;
    }
  }
};
ValueNode.prototype.iterate = function(fn, reverse3) {
  return fn(this.entry);
};
var MapIterator = function(Iterator3) {
  function MapIterator2(map2, type, reverse3) {
    this._type = type;
    this._reverse = reverse3;
    this._stack = map2._root && mapIteratorFrame(map2._root);
  }
  if (Iterator3)
    MapIterator2.__proto__ = Iterator3;
  MapIterator2.prototype = Object.create(Iterator3 && Iterator3.prototype);
  MapIterator2.prototype.constructor = MapIterator2;
  MapIterator2.prototype.next = function next() {
    var type = this._type;
    var stack = this._stack;
    while (stack) {
      var node = stack.node;
      var index = stack.index++;
      var maxIndex = void 0;
      if (node.entry) {
        if (index === 0) {
          return mapIteratorValue(type, node.entry);
        }
      } else if (node.entries) {
        maxIndex = node.entries.length - 1;
        if (index <= maxIndex) {
          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
        }
      } else {
        maxIndex = node.nodes.length - 1;
        if (index <= maxIndex) {
          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
          if (subNode) {
            if (subNode.entry) {
              return mapIteratorValue(type, subNode.entry);
            }
            stack = this._stack = mapIteratorFrame(subNode, stack);
          }
          continue;
        }
      }
      stack = this._stack = this._stack.__prev;
    }
    return iteratorDone();
  };
  return MapIterator2;
}(Iterator);
function mapIteratorValue(type, entry) {
  return iteratorValue(type, entry[0], entry[1]);
}
function mapIteratorFrame(node, prev) {
  return {
    node,
    index: 0,
    __prev: prev
  };
}
function makeMap(size, root, ownerID, hash2) {
  var map2 = Object.create(MapPrototype);
  map2.size = size;
  map2._root = root;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
var EMPTY_MAP;
function emptyMap() {
  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
}
function updateMap(map2, k, v) {
  var newRoot;
  var newSize;
  if (!map2._root) {
    if (v === NOT_SET) {
      return map2;
    }
    newSize = 1;
    newRoot = new ArrayMapNode(map2.__ownerID, [[k, v]]);
  } else {
    var didChangeSize = MakeRef();
    var didAlter = MakeRef();
    newRoot = updateNode(map2._root, map2.__ownerID, 0, void 0, k, v, didChangeSize, didAlter);
    if (!didAlter.value) {
      return map2;
    }
    newSize = map2.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
  }
  if (map2.__ownerID) {
    map2.size = newSize;
    map2._root = newRoot;
    map2.__hash = void 0;
    map2.__altered = true;
    return map2;
  }
  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
}
function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
  if (!node) {
    if (value === NOT_SET) {
      return node;
    }
    SetRef(didAlter);
    SetRef(didChangeSize);
    return new ValueNode(ownerID, keyHash, [key, value]);
  }
  return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
}
function isLeafNode(node) {
  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
}
function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
  if (node.keyHash === keyHash) {
    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
  }
  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
  var newNode;
  var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
  return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
}
function createNodes(ownerID, entries3, key, value) {
  if (!ownerID) {
    ownerID = new OwnerID();
  }
  var node = new ValueNode(ownerID, hash(key), [key, value]);
  for (var ii = 0; ii < entries3.length; ii++) {
    var entry = entries3[ii];
    node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
  }
  return node;
}
function packNodes(ownerID, nodes, count2, excluding) {
  var bitmap = 0;
  var packedII = 0;
  var packedNodes = new Array(count2);
  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
    var node = nodes[ii];
    if (node !== void 0 && ii !== excluding) {
      bitmap |= bit;
      packedNodes[packedII++] = node;
    }
  }
  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
}
function expandNodes(ownerID, nodes, bitmap, including, node) {
  var count2 = 0;
  var expandedNodes = new Array(SIZE);
  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
    expandedNodes[ii] = bitmap & 1 ? nodes[count2++] : void 0;
  }
  expandedNodes[including] = node;
  return new HashArrayMapNode(ownerID, count2 + 1, expandedNodes);
}
function popCount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function setAt(array, idx, val, canEdit) {
  var newArray = canEdit ? array : arrCopy(array);
  newArray[idx] = val;
  return newArray;
}
function spliceIn(array, idx, val, canEdit) {
  var newLen = array.length + 1;
  if (canEdit && idx + 1 === newLen) {
    array[idx] = val;
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      newArray[ii] = val;
      after = -1;
    } else {
      newArray[ii] = array[ii + after];
    }
  }
  return newArray;
}
function spliceOut(array, idx, canEdit) {
  var newLen = array.length - 1;
  if (canEdit && idx === newLen) {
    array.pop();
    return array;
  }
  var newArray = new Array(newLen);
  var after = 0;
  for (var ii = 0; ii < newLen; ii++) {
    if (ii === idx) {
      after = 1;
    }
    newArray[ii] = array[ii + after];
  }
  return newArray;
}
var MAX_ARRAY_MAP_SIZE = SIZE / 4;
var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
function isList(maybeList) {
  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
}
var List = function(IndexedCollection2) {
  function List2(value) {
    var empty = emptyList();
    if (value === void 0 || value === null) {
      return empty;
    }
    if (isList(value)) {
      return value;
    }
    var iter = IndexedCollection2(value);
    var size = iter.size;
    if (size === 0) {
      return empty;
    }
    assertNotInfinite(size);
    if (size > 0 && size < SIZE) {
      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
    }
    return empty.withMutations(function(list) {
      list.setSize(size);
      iter.forEach(function(v, i) {
        return list.set(i, v);
      });
    });
  }
  if (IndexedCollection2)
    List2.__proto__ = IndexedCollection2;
  List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  List2.prototype.constructor = List2;
  List2.of = function of() {
    return this(arguments);
  };
  List2.prototype.toString = function toString5() {
    return this.__toString("List [", "]");
  };
  List2.prototype.get = function get11(index, notSetValue) {
    index = wrapIndex(this, index);
    if (index >= 0 && index < this.size) {
      index += this._origin;
      var node = listNodeFor(this, index);
      return node && node.array[index & MASK];
    }
    return notSetValue;
  };
  List2.prototype.set = function set3(index, value) {
    return updateList(this, index, value);
  };
  List2.prototype.remove = function remove3(index) {
    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
  };
  List2.prototype.insert = function insert(index, value) {
    return this.splice(index, 0, value);
  };
  List2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = this._origin = this._capacity = 0;
      this._level = SHIFT;
      this._root = this._tail = this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyList();
  };
  List2.prototype.push = function push() {
    var values2 = arguments;
    var oldSize = this.size;
    return this.withMutations(function(list) {
      setListBounds(list, 0, oldSize + values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(oldSize + ii, values2[ii]);
      }
    });
  };
  List2.prototype.pop = function pop() {
    return setListBounds(this, 0, -1);
  };
  List2.prototype.unshift = function unshift() {
    var values2 = arguments;
    return this.withMutations(function(list) {
      setListBounds(list, -values2.length);
      for (var ii = 0; ii < values2.length; ii++) {
        list.set(ii, values2[ii]);
      }
    });
  };
  List2.prototype.shift = function shift() {
    return setListBounds(this, 1);
  };
  List2.prototype.concat = function concat2() {
    var arguments$1 = arguments;
    var seqs = [];
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments$1[i];
      var seq = IndexedCollection2(typeof argument !== "string" && hasIterator(argument) ? argument : [argument]);
      if (seq.size !== 0) {
        seqs.push(seq);
      }
    }
    if (seqs.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
      return this.constructor(seqs[0]);
    }
    return this.withMutations(function(list) {
      seqs.forEach(function(seq2) {
        return seq2.forEach(function(value) {
          return list.push(value);
        });
      });
    });
  };
  List2.prototype.setSize = function setSize(size) {
    return setListBounds(this, 0, size);
  };
  List2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    return this.withMutations(function(list) {
      for (var i = 0; i < this$1$1.size; i++) {
        list.set(i, mapper.call(context, list.get(i), i, this$1$1));
      }
    });
  };
  List2.prototype.slice = function slice3(begin, end) {
    var size = this.size;
    if (wholeSlice(begin, end, size)) {
      return this;
    }
    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
  };
  List2.prototype.__iterator = function __iterator2(type, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    return new Iterator(function() {
      var value = values2();
      return value === DONE ? iteratorDone() : iteratorValue(type, reverse3 ? --index : index++, value);
    });
  };
  List2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var index = reverse3 ? this.size : 0;
    var values2 = iterateList(this, reverse3);
    var value;
    while ((value = values2()) !== DONE) {
      if (fn(value, reverse3 ? --index : index++, this) === false) {
        break;
      }
    }
    return index;
  };
  List2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyList();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
  };
  return List2;
}(IndexedCollection);
List.isList = isList;
var ListPrototype = List.prototype;
ListPrototype[IS_LIST_SYMBOL] = true;
ListPrototype[DELETE] = ListPrototype.remove;
ListPrototype.merge = ListPrototype.concat;
ListPrototype.setIn = setIn;
ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
ListPrototype.update = update;
ListPrototype.updateIn = updateIn;
ListPrototype.mergeIn = mergeIn;
ListPrototype.mergeDeepIn = mergeDeepIn;
ListPrototype.withMutations = withMutations;
ListPrototype.wasAltered = wasAltered;
ListPrototype.asImmutable = asImmutable;
ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
ListPrototype["@@transducer/step"] = function(result, arr) {
  return result.push(arr);
};
ListPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
var VNode = function VNode2(array, ownerID) {
  this.array = array;
  this.ownerID = ownerID;
};
VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
  if (index === level ? 1 << level : this.array.length === 0) {
    return this;
  }
  var originIndex = index >>> level & MASK;
  if (originIndex >= this.array.length) {
    return new VNode([], ownerID);
  }
  var removingFirst = originIndex === 0;
  var newChild;
  if (level > 0) {
    var oldChild = this.array[originIndex];
    newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
    if (newChild === oldChild && removingFirst) {
      return this;
    }
  }
  if (removingFirst && !newChild) {
    return this;
  }
  var editable = editableVNode(this, ownerID);
  if (!removingFirst) {
    for (var ii = 0; ii < originIndex; ii++) {
      editable.array[ii] = void 0;
    }
  }
  if (newChild) {
    editable.array[originIndex] = newChild;
  }
  return editable;
};
VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
    return this;
  }
  var sizeIndex = index - 1 >>> level & MASK;
  if (sizeIndex >= this.array.length) {
    return this;
  }
  var newChild;
  if (level > 0) {
    var oldChild = this.array[sizeIndex];
    newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
      return this;
    }
  }
  var editable = editableVNode(this, ownerID);
  editable.array.splice(sizeIndex + 1);
  if (newChild) {
    editable.array[sizeIndex] = newChild;
  }
  return editable;
};
var DONE = {};
function iterateList(list, reverse3) {
  var left = list._origin;
  var right = list._capacity;
  var tailPos = getTailOffset(right);
  var tail = list._tail;
  return iterateNodeOrLeaf(list._root, list._level, 0);
  function iterateNodeOrLeaf(node, level, offset) {
    return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
  }
  function iterateLeaf(node, offset) {
    var array = offset === tailPos ? tail && tail.array : node && node.array;
    var from = offset > left ? 0 : left - offset;
    var to = right - offset;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      if (from === to) {
        return DONE;
      }
      var idx = reverse3 ? --to : from++;
      return array && array[idx];
    };
  }
  function iterateNode(node, level, offset) {
    var values2;
    var array = node && node.array;
    var from = offset > left ? 0 : left - offset >> level;
    var to = (right - offset >> level) + 1;
    if (to > SIZE) {
      to = SIZE;
    }
    return function() {
      while (true) {
        if (values2) {
          var value = values2();
          if (value !== DONE) {
            return value;
          }
          values2 = null;
        }
        if (from === to) {
          return DONE;
        }
        var idx = reverse3 ? --to : from++;
        values2 = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
      }
    };
  }
}
function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
  var list = Object.create(ListPrototype);
  list.size = capacity - origin;
  list._origin = origin;
  list._capacity = capacity;
  list._level = level;
  list._root = root;
  list._tail = tail;
  list.__ownerID = ownerID;
  list.__hash = hash2;
  list.__altered = false;
  return list;
}
var EMPTY_LIST;
function emptyList() {
  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
}
function updateList(list, index, value) {
  index = wrapIndex(list, index);
  if (index !== index) {
    return list;
  }
  if (index >= list.size || index < 0) {
    return list.withMutations(function(list2) {
      index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
    });
  }
  index += list._origin;
  var newTail = list._tail;
  var newRoot = list._root;
  var didAlter = MakeRef();
  if (index >= getTailOffset(list._capacity)) {
    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
  } else {
    newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
  }
  if (!didAlter.value) {
    return list;
  }
  if (list.__ownerID) {
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
}
function updateVNode(node, ownerID, level, index, value, didAlter) {
  var idx = index >>> level & MASK;
  var nodeHas = node && idx < node.array.length;
  if (!nodeHas && value === void 0) {
    return node;
  }
  var newNode;
  if (level > 0) {
    var lowerNode = node && node.array[idx];
    var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
    if (newLowerNode === lowerNode) {
      return node;
    }
    newNode = editableVNode(node, ownerID);
    newNode.array[idx] = newLowerNode;
    return newNode;
  }
  if (nodeHas && node.array[idx] === value) {
    return node;
  }
  if (didAlter) {
    SetRef(didAlter);
  }
  newNode = editableVNode(node, ownerID);
  if (value === void 0 && idx === newNode.array.length - 1) {
    newNode.array.pop();
  } else {
    newNode.array[idx] = value;
  }
  return newNode;
}
function editableVNode(node, ownerID) {
  if (ownerID && node && ownerID === node.ownerID) {
    return node;
  }
  return new VNode(node ? node.array.slice() : [], ownerID);
}
function listNodeFor(list, rawIndex) {
  if (rawIndex >= getTailOffset(list._capacity)) {
    return list._tail;
  }
  if (rawIndex < 1 << list._level + SHIFT) {
    var node = list._root;
    var level = list._level;
    while (node && level > 0) {
      node = node.array[rawIndex >>> level & MASK];
      level -= SHIFT;
    }
    return node;
  }
}
function setListBounds(list, begin, end) {
  if (begin !== void 0) {
    begin |= 0;
  }
  if (end !== void 0) {
    end |= 0;
  }
  var owner = list.__ownerID || new OwnerID();
  var oldOrigin = list._origin;
  var oldCapacity = list._capacity;
  var newOrigin = oldOrigin + begin;
  var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
    return list;
  }
  if (newOrigin >= newCapacity) {
    return list.clear();
  }
  var newLevel = list._level;
  var newRoot = list._root;
  var offsetShift = 0;
  while (newOrigin + offsetShift < 0) {
    newRoot = new VNode(newRoot && newRoot.array.length ? [void 0, newRoot] : [], owner);
    newLevel += SHIFT;
    offsetShift += 1 << newLevel;
  }
  if (offsetShift) {
    newOrigin += offsetShift;
    oldOrigin += offsetShift;
    newCapacity += offsetShift;
    oldCapacity += offsetShift;
  }
  var oldTailOffset = getTailOffset(oldCapacity);
  var newTailOffset = getTailOffset(newCapacity);
  while (newTailOffset >= 1 << newLevel + SHIFT) {
    newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
    newLevel += SHIFT;
  }
  var oldTail = list._tail;
  var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
  if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
    newRoot = editableVNode(newRoot, owner);
    var node = newRoot;
    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
      var idx = oldTailOffset >>> level & MASK;
      node = node.array[idx] = editableVNode(node.array[idx], owner);
    }
    node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
  }
  if (newCapacity < oldCapacity) {
    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
  }
  if (newOrigin >= newTailOffset) {
    newOrigin -= newTailOffset;
    newCapacity -= newTailOffset;
    newLevel = SHIFT;
    newRoot = null;
    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
    offsetShift = 0;
    while (newRoot) {
      var beginIndex = newOrigin >>> newLevel & MASK;
      if (beginIndex !== newTailOffset >>> newLevel & MASK) {
        break;
      }
      if (beginIndex) {
        offsetShift += (1 << newLevel) * beginIndex;
      }
      newLevel -= SHIFT;
      newRoot = newRoot.array[beginIndex];
    }
    if (newRoot && newOrigin > oldOrigin) {
      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
    }
    if (newRoot && newTailOffset < oldTailOffset) {
      newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
    }
    if (offsetShift) {
      newOrigin -= offsetShift;
      newCapacity -= offsetShift;
    }
  }
  if (list.__ownerID) {
    list.size = newCapacity - newOrigin;
    list._origin = newOrigin;
    list._capacity = newCapacity;
    list._level = newLevel;
    list._root = newRoot;
    list._tail = newTail;
    list.__hash = void 0;
    list.__altered = true;
    return list;
  }
  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
}
function getTailOffset(size) {
  return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
}
var OrderedMap = function(Map2) {
  function OrderedMap2(value) {
    return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
      var iter = KeyedCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v, k) {
        return map2.set(k, v);
      });
    });
  }
  if (Map2)
    OrderedMap2.__proto__ = Map2;
  OrderedMap2.prototype = Object.create(Map2 && Map2.prototype);
  OrderedMap2.prototype.constructor = OrderedMap2;
  OrderedMap2.of = function of() {
    return this(arguments);
  };
  OrderedMap2.prototype.toString = function toString5() {
    return this.__toString("OrderedMap {", "}");
  };
  OrderedMap2.prototype.get = function get11(k, notSetValue) {
    var index = this._map.get(k);
    return index !== void 0 ? this._list.get(index)[1] : notSetValue;
  };
  OrderedMap2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._map.clear();
      this._list.clear();
      this.__altered = true;
      return this;
    }
    return emptyOrderedMap();
  };
  OrderedMap2.prototype.set = function set3(k, v) {
    return updateOrderedMap(this, k, v);
  };
  OrderedMap2.prototype.remove = function remove3(k) {
    return updateOrderedMap(this, k, NOT_SET);
  };
  OrderedMap2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._list.__iterate(function(entry) {
      return entry && fn(entry[1], entry[0], this$1$1);
    }, reverse3);
  };
  OrderedMap2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._list.fromEntrySeq().__iterator(type, reverse3);
  };
  OrderedMap2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    var newList = this._list.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return emptyOrderedMap();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      this._map = newMap;
      this._list = newList;
      return this;
    }
    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
  };
  return OrderedMap2;
}(Map);
OrderedMap.isOrderedMap = isOrderedMap;
OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
function makeOrderedMap(map2, list, ownerID, hash2) {
  var omap = Object.create(OrderedMap.prototype);
  omap.size = map2 ? map2.size : 0;
  omap._map = map2;
  omap._list = list;
  omap.__ownerID = ownerID;
  omap.__hash = hash2;
  omap.__altered = false;
  return omap;
}
var EMPTY_ORDERED_MAP;
function emptyOrderedMap() {
  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
}
function updateOrderedMap(omap, k, v) {
  var map2 = omap._map;
  var list = omap._list;
  var i = map2.get(k);
  var has5 = i !== void 0;
  var newMap;
  var newList;
  if (v === NOT_SET) {
    if (!has5) {
      return omap;
    }
    if (list.size >= SIZE && list.size >= map2.size * 2) {
      newList = list.filter(function(entry, idx) {
        return entry !== void 0 && i !== idx;
      });
      newMap = newList.toKeyedSeq().map(function(entry) {
        return entry[0];
      }).flip().toMap();
      if (omap.__ownerID) {
        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
      }
    } else {
      newMap = map2.remove(k);
      newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
    }
  } else if (has5) {
    if (v === list.get(i)[1]) {
      return omap;
    }
    newMap = map2;
    newList = list.set(i, [k, v]);
  } else {
    newMap = map2.set(k, list.size);
    newList = list.set(list.size, [k, v]);
  }
  if (omap.__ownerID) {
    omap.size = newMap.size;
    omap._map = newMap;
    omap._list = newList;
    omap.__hash = void 0;
    omap.__altered = true;
    return omap;
  }
  return makeOrderedMap(newMap, newList);
}
var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
function isStack(maybeStack) {
  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
}
var Stack = function(IndexedCollection2) {
  function Stack2(value) {
    return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
  }
  if (IndexedCollection2)
    Stack2.__proto__ = IndexedCollection2;
  Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
  Stack2.prototype.constructor = Stack2;
  Stack2.of = function of() {
    return this(arguments);
  };
  Stack2.prototype.toString = function toString5() {
    return this.__toString("Stack [", "]");
  };
  Stack2.prototype.get = function get11(index, notSetValue) {
    var head = this._head;
    index = wrapIndex(this, index);
    while (head && index--) {
      head = head.next;
    }
    return head ? head.value : notSetValue;
  };
  Stack2.prototype.peek = function peek() {
    return this._head && this._head.value;
  };
  Stack2.prototype.push = function push() {
    var arguments$1 = arguments;
    if (arguments.length === 0) {
      return this;
    }
    var newSize = this.size + arguments.length;
    var head = this._head;
    for (var ii = arguments.length - 1; ii >= 0; ii--) {
      head = {
        value: arguments$1[ii],
        next: head
      };
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.pushAll = function pushAll(iter) {
    iter = IndexedCollection2(iter);
    if (iter.size === 0) {
      return this;
    }
    if (this.size === 0 && isStack(iter)) {
      return iter;
    }
    assertNotInfinite(iter.size);
    var newSize = this.size;
    var head = this._head;
    iter.__iterate(function(value) {
      newSize++;
      head = {
        value,
        next: head
      };
    }, true);
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.pop = function pop() {
    return this.slice(1);
  };
  Stack2.prototype.clear = function clear2() {
    if (this.size === 0) {
      return this;
    }
    if (this.__ownerID) {
      this.size = 0;
      this._head = void 0;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return emptyStack();
  };
  Stack2.prototype.slice = function slice3(begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    var resolvedBegin = resolveBegin(begin, this.size);
    var resolvedEnd = resolveEnd(end, this.size);
    if (resolvedEnd !== this.size) {
      return IndexedCollection2.prototype.slice.call(this, begin, end);
    }
    var newSize = this.size - resolvedBegin;
    var head = this._head;
    while (resolvedBegin--) {
      head = head.next;
    }
    if (this.__ownerID) {
      this.size = newSize;
      this._head = head;
      this.__hash = void 0;
      this.__altered = true;
      return this;
    }
    return makeStack(newSize, head);
  };
  Stack2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    if (!ownerID) {
      if (this.size === 0) {
        return emptyStack();
      }
      this.__ownerID = ownerID;
      this.__altered = false;
      return this;
    }
    return makeStack(this.size, this._head, ownerID, this.__hash);
  };
  Stack2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    if (reverse3) {
      return new ArraySeq(this.toArray()).__iterate(function(v, k) {
        return fn(v, k, this$1$1);
      }, reverse3);
    }
    var iterations = 0;
    var node = this._head;
    while (node) {
      if (fn(node.value, iterations++, this) === false) {
        break;
      }
      node = node.next;
    }
    return iterations;
  };
  Stack2.prototype.__iterator = function __iterator2(type, reverse3) {
    if (reverse3) {
      return new ArraySeq(this.toArray()).__iterator(type, reverse3);
    }
    var iterations = 0;
    var node = this._head;
    return new Iterator(function() {
      if (node) {
        var value = node.value;
        node = node.next;
        return iteratorValue(type, iterations++, value);
      }
      return iteratorDone();
    });
  };
  return Stack2;
}(IndexedCollection);
Stack.isStack = isStack;
var StackPrototype = Stack.prototype;
StackPrototype[IS_STACK_SYMBOL] = true;
StackPrototype.shift = StackPrototype.pop;
StackPrototype.unshift = StackPrototype.push;
StackPrototype.unshiftAll = StackPrototype.pushAll;
StackPrototype.withMutations = withMutations;
StackPrototype.wasAltered = wasAltered;
StackPrototype.asImmutable = asImmutable;
StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
StackPrototype["@@transducer/step"] = function(result, arr) {
  return result.unshift(arr);
};
StackPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
function makeStack(size, head, ownerID, hash2) {
  var map2 = Object.create(StackPrototype);
  map2.size = size;
  map2._head = head;
  map2.__ownerID = ownerID;
  map2.__hash = hash2;
  map2.__altered = false;
  return map2;
}
var EMPTY_STACK;
function emptyStack() {
  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
}
var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
function isSet(maybeSet) {
  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
}
function isOrderedSet(maybeOrderedSet) {
  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
}
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (!isCollection(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
    return false;
  }
  if (a.size === 0 && b.size === 0) {
    return true;
  }
  var notAssociative = !isAssociative(a);
  if (isOrdered(a)) {
    var entries3 = a.entries();
    return b.every(function(v, k) {
      var entry = entries3.next().value;
      return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
    }) && entries3.next().done;
  }
  var flipped = false;
  if (a.size === void 0) {
    if (b.size === void 0) {
      if (typeof a.cacheResult === "function") {
        a.cacheResult();
      }
    } else {
      flipped = true;
      var _ = a;
      a = b;
      b = _;
    }
  }
  var allEqual = true;
  var bSize = b.__iterate(function(v, k) {
    if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
      allEqual = false;
      return false;
    }
  });
  return allEqual && a.size === bSize;
}
function mixin(ctor, methods) {
  var keyCopier = function(key) {
    ctor.prototype[key] = methods[key];
  };
  Object.keys(methods).forEach(keyCopier);
  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
  return ctor;
}
function toJS(value) {
  if (!value || typeof value !== "object") {
    return value;
  }
  if (!isCollection(value)) {
    if (!isDataStructure(value)) {
      return value;
    }
    value = Seq(value);
  }
  if (isKeyed(value)) {
    var result$1 = {};
    value.__iterate(function(v, k) {
      result$1[k] = toJS(v);
    });
    return result$1;
  }
  var result = [];
  value.__iterate(function(v) {
    result.push(toJS(v));
  });
  return result;
}
var Set = function(SetCollection2) {
  function Set2(value) {
    return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
      var iter = SetCollection2(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  if (SetCollection2)
    Set2.__proto__ = SetCollection2;
  Set2.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
  Set2.prototype.constructor = Set2;
  Set2.of = function of() {
    return this(arguments);
  };
  Set2.fromKeys = function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  };
  Set2.intersect = function intersect(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.intersect.apply(Set2(sets.pop()), sets) : emptySet();
  };
  Set2.union = function union(sets) {
    sets = Collection(sets).toArray();
    return sets.length ? SetPrototype.union.apply(Set2(sets.pop()), sets) : emptySet();
  };
  Set2.prototype.toString = function toString5() {
    return this.__toString("Set {", "}");
  };
  Set2.prototype.has = function has5(value) {
    return this._map.has(value);
  };
  Set2.prototype.add = function add(value) {
    return updateSet(this, this._map.set(value, value));
  };
  Set2.prototype.remove = function remove3(value) {
    return updateSet(this, this._map.remove(value));
  };
  Set2.prototype.clear = function clear2() {
    return updateSet(this, this._map.clear());
  };
  Set2.prototype.map = function map2(mapper, context) {
    var this$1$1 = this;
    var didChanges = false;
    var newMap = updateSet(this, this._map.mapEntries(function(ref) {
      var v = ref[1];
      var mapped = mapper.call(context, v, v, this$1$1);
      if (mapped !== v) {
        didChanges = true;
      }
      return [mapped, mapped];
    }, context));
    return didChanges ? newMap : this;
  };
  Set2.prototype.union = function union() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    iters = iters.filter(function(x) {
      return x.size !== 0;
    });
    if (iters.length === 0) {
      return this;
    }
    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
      return this.constructor(iters[0]);
    }
    return this.withMutations(function(set3) {
      for (var ii = 0; ii < iters.length; ii++) {
        SetCollection2(iters[ii]).forEach(function(value) {
          return set3.add(value);
        });
      }
    });
  };
  Set2.prototype.intersect = function intersect() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function(iter) {
      return SetCollection2(iter);
    });
    var toRemove = [];
    this.forEach(function(value) {
      if (!iters.every(function(iter) {
        return iter.includes(value);
      })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function(set3) {
      toRemove.forEach(function(value) {
        set3.remove(value);
      });
    });
  };
  Set2.prototype.subtract = function subtract() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    if (iters.length === 0) {
      return this;
    }
    iters = iters.map(function(iter) {
      return SetCollection2(iter);
    });
    var toRemove = [];
    this.forEach(function(value) {
      if (iters.some(function(iter) {
        return iter.includes(value);
      })) {
        toRemove.push(value);
      }
    });
    return this.withMutations(function(set3) {
      toRemove.forEach(function(value) {
        set3.remove(value);
      });
    });
  };
  Set2.prototype.sort = function sort2(comparator) {
    return OrderedSet(sortFactory(this, comparator));
  };
  Set2.prototype.sortBy = function sortBy2(mapper, comparator) {
    return OrderedSet(sortFactory(this, comparator, mapper));
  };
  Set2.prototype.wasAltered = function wasAltered3() {
    return this._map.wasAltered();
  };
  Set2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var this$1$1 = this;
    return this._map.__iterate(function(k) {
      return fn(k, k, this$1$1);
    }, reverse3);
  };
  Set2.prototype.__iterator = function __iterator2(type, reverse3) {
    return this._map.__iterator(type, reverse3);
  };
  Set2.prototype.__ensureOwner = function __ensureOwner2(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newMap = this._map.__ensureOwner(ownerID);
    if (!ownerID) {
      if (this.size === 0) {
        return this.__empty();
      }
      this.__ownerID = ownerID;
      this._map = newMap;
      return this;
    }
    return this.__make(newMap, ownerID);
  };
  return Set2;
}(SetCollection);
Set.isSet = isSet;
var SetPrototype = Set.prototype;
SetPrototype[IS_SET_SYMBOL] = true;
SetPrototype[DELETE] = SetPrototype.remove;
SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
SetPrototype.withMutations = withMutations;
SetPrototype.asImmutable = asImmutable;
SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
SetPrototype["@@transducer/step"] = function(result, arr) {
  return result.add(arr);
};
SetPrototype["@@transducer/result"] = function(obj) {
  return obj.asImmutable();
};
SetPrototype.__empty = emptySet;
SetPrototype.__make = makeSet;
function updateSet(set3, newMap) {
  if (set3.__ownerID) {
    set3.size = newMap.size;
    set3._map = newMap;
    return set3;
  }
  return newMap === set3._map ? set3 : newMap.size === 0 ? set3.__empty() : set3.__make(newMap);
}
function makeSet(map2, ownerID) {
  var set3 = Object.create(SetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
var EMPTY_SET;
function emptySet() {
  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
}
var Range = function(IndexedSeq2) {
  function Range2(start, end, step) {
    if (!(this instanceof Range2)) {
      return new Range2(start, end, step);
    }
    invariant(step !== 0, "Cannot step a Range by 0");
    start = start || 0;
    if (end === void 0) {
      end = Infinity;
    }
    step = step === void 0 ? 1 : Math.abs(step);
    if (end < start) {
      step = -step;
    }
    this._start = start;
    this._end = end;
    this._step = step;
    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
    if (this.size === 0) {
      if (EMPTY_RANGE) {
        return EMPTY_RANGE;
      }
      EMPTY_RANGE = this;
    }
  }
  if (IndexedSeq2)
    Range2.__proto__ = IndexedSeq2;
  Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  Range2.prototype.constructor = Range2;
  Range2.prototype.toString = function toString5() {
    if (this.size === 0) {
      return "Range []";
    }
    return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
  };
  Range2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
  };
  Range2.prototype.includes = function includes3(searchValue) {
    var possibleIndex = (searchValue - this._start) / this._step;
    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
  };
  Range2.prototype.slice = function slice3(begin, end) {
    if (wholeSlice(begin, end, this.size)) {
      return this;
    }
    begin = resolveBegin(begin, this.size);
    end = resolveEnd(end, this.size);
    if (end <= begin) {
      return new Range2(0, 0);
    }
    return new Range2(this.get(begin, this._end), this.get(end, this._end), this._step);
  };
  Range2.prototype.indexOf = function indexOf2(searchValue) {
    var offsetValue = searchValue - this._start;
    if (offsetValue % this._step === 0) {
      var index = offsetValue / this._step;
      if (index >= 0 && index < this.size) {
        return index;
      }
    }
    return -1;
  };
  Range2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
    return this.indexOf(searchValue);
  };
  Range2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var size = this.size;
    var step = this._step;
    var value = reverse3 ? this._start + (size - 1) * step : this._start;
    var i = 0;
    while (i !== size) {
      if (fn(value, reverse3 ? size - ++i : i++, this) === false) {
        break;
      }
      value += reverse3 ? -step : step;
    }
    return i;
  };
  Range2.prototype.__iterator = function __iterator2(type, reverse3) {
    var size = this.size;
    var step = this._step;
    var value = reverse3 ? this._start + (size - 1) * step : this._start;
    var i = 0;
    return new Iterator(function() {
      if (i === size) {
        return iteratorDone();
      }
      var v = value;
      value += reverse3 ? -step : step;
      return iteratorValue(type, reverse3 ? size - ++i : i++, v);
    });
  };
  Range2.prototype.equals = function equals3(other) {
    return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
  };
  return Range2;
}(IndexedSeq);
var EMPTY_RANGE;
function getIn$1(collection, searchKeyPath, notSetValue) {
  var keyPath = coerceKeyPath(searchKeyPath);
  var i = 0;
  while (i !== keyPath.length) {
    collection = get(collection, keyPath[i++], NOT_SET);
    if (collection === NOT_SET) {
      return notSetValue;
    }
  }
  return collection;
}
function getIn(searchKeyPath, notSetValue) {
  return getIn$1(this, searchKeyPath, notSetValue);
}
function hasIn$1(collection, keyPath) {
  return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
}
function hasIn(searchKeyPath) {
  return hasIn$1(this, searchKeyPath);
}
function toObject() {
  assertNotInfinite(this.size);
  var object = {};
  this.__iterate(function(v, k) {
    object[k] = v;
  });
  return object;
}
Collection.isIterable = isCollection;
Collection.isKeyed = isKeyed;
Collection.isIndexed = isIndexed;
Collection.isAssociative = isAssociative;
Collection.isOrdered = isOrdered;
Collection.Iterator = Iterator;
mixin(Collection, {
  toArray: function toArray() {
    assertNotInfinite(this.size);
    var array = new Array(this.size || 0);
    var useTuples = isKeyed(this);
    var i = 0;
    this.__iterate(function(v, k) {
      array[i++] = useTuples ? [k, v] : v;
    });
    return array;
  },
  toIndexedSeq: function toIndexedSeq() {
    return new ToIndexedSequence(this);
  },
  toJS: function toJS$1() {
    return toJS(this);
  },
  toKeyedSeq: function toKeyedSeq() {
    return new ToKeyedSequence(this, true);
  },
  toMap: function toMap() {
    return Map(this.toKeyedSeq());
  },
  toObject,
  toOrderedMap: function toOrderedMap() {
    return OrderedMap(this.toKeyedSeq());
  },
  toOrderedSet: function toOrderedSet() {
    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
  },
  toSet: function toSet() {
    return Set(isKeyed(this) ? this.valueSeq() : this);
  },
  toSetSeq: function toSetSeq() {
    return new ToSetSequence(this);
  },
  toSeq: function toSeq() {
    return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
  },
  toStack: function toStack() {
    return Stack(isKeyed(this) ? this.valueSeq() : this);
  },
  toList: function toList() {
    return List(isKeyed(this) ? this.valueSeq() : this);
  },
  toString: function toString3() {
    return "[Collection]";
  },
  __toString: function __toString(head, tail) {
    if (this.size === 0) {
      return head + tail;
    }
    return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
  },
  concat: function concat() {
    var values2 = [], len = arguments.length;
    while (len--)
      values2[len] = arguments[len];
    return reify(this, concatFactory(this, values2));
  },
  includes: function includes(searchValue) {
    return this.some(function(value) {
      return is(value, searchValue);
    });
  },
  entries: function entries() {
    return this.__iterator(ITERATE_ENTRIES);
  },
  every: function every(predicate, context) {
    assertNotInfinite(this.size);
    var returnValue = true;
    this.__iterate(function(v, k, c) {
      if (!predicate.call(context, v, k, c)) {
        returnValue = false;
        return false;
      }
    });
    return returnValue;
  },
  filter: function filter(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, true));
  },
  find: function find(predicate, context, notSetValue) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[1] : notSetValue;
  },
  forEach: function forEach(sideEffect, context) {
    assertNotInfinite(this.size);
    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
  },
  join: function join(separator) {
    assertNotInfinite(this.size);
    separator = separator !== void 0 ? "" + separator : ",";
    var joined = "";
    var isFirst = true;
    this.__iterate(function(v) {
      isFirst ? isFirst = false : joined += separator;
      joined += v !== null && v !== void 0 ? v.toString() : "";
    });
    return joined;
  },
  keys: function keys() {
    return this.__iterator(ITERATE_KEYS);
  },
  map: function map(mapper, context) {
    return reify(this, mapFactory(this, mapper, context));
  },
  reduce: function reduce$1(reducer, initialReduction, context) {
    return reduce(this, reducer, initialReduction, context, arguments.length < 2, false);
  },
  reduceRight: function reduceRight(reducer, initialReduction, context) {
    return reduce(this, reducer, initialReduction, context, arguments.length < 2, true);
  },
  reverse: function reverse() {
    return reify(this, reverseFactory(this, true));
  },
  slice: function slice(begin, end) {
    return reify(this, sliceFactory(this, begin, end, true));
  },
  some: function some(predicate, context) {
    return !this.every(not(predicate), context);
  },
  sort: function sort(comparator) {
    return reify(this, sortFactory(this, comparator));
  },
  values: function values() {
    return this.__iterator(ITERATE_VALUES);
  },
  butLast: function butLast() {
    return this.slice(0, -1);
  },
  isEmpty: function isEmpty() {
    return this.size !== void 0 ? this.size === 0 : !this.some(function() {
      return true;
    });
  },
  count: function count(predicate, context) {
    return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
  },
  countBy: function countBy(grouper, context) {
    return countByFactory(this, grouper, context);
  },
  equals: function equals(other) {
    return deepEqual(this, other);
  },
  entrySeq: function entrySeq() {
    var collection = this;
    if (collection._cache) {
      return new ArraySeq(collection._cache);
    }
    var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
    entriesSequence.fromEntrySeq = function() {
      return collection.toSeq();
    };
    return entriesSequence;
  },
  filterNot: function filterNot(predicate, context) {
    return this.filter(not(predicate), context);
  },
  findEntry: function findEntry(predicate, context, notSetValue) {
    var found = notSetValue;
    this.__iterate(function(v, k, c) {
      if (predicate.call(context, v, k, c)) {
        found = [k, v];
        return false;
      }
    });
    return found;
  },
  findKey: function findKey(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry && entry[0];
  },
  findLast: function findLast(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
  },
  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
    return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
  },
  findLastKey: function findLastKey(predicate, context) {
    return this.toKeyedSeq().reverse().findKey(predicate, context);
  },
  first: function first(notSetValue) {
    return this.find(returnTrue, null, notSetValue);
  },
  flatMap: function flatMap(mapper, context) {
    return reify(this, flatMapFactory(this, mapper, context));
  },
  flatten: function flatten(depth) {
    return reify(this, flattenFactory(this, depth, true));
  },
  fromEntrySeq: function fromEntrySeq() {
    return new FromEntriesSequence(this);
  },
  get: function get7(searchKey, notSetValue) {
    return this.find(function(_, key) {
      return is(key, searchKey);
    }, void 0, notSetValue);
  },
  getIn,
  groupBy: function groupBy(grouper, context) {
    return groupByFactory(this, grouper, context);
  },
  has: function has2(searchKey) {
    return this.get(searchKey, NOT_SET) !== NOT_SET;
  },
  hasIn,
  isSubset: function isSubset(iter) {
    iter = typeof iter.includes === "function" ? iter : Collection(iter);
    return this.every(function(value) {
      return iter.includes(value);
    });
  },
  isSuperset: function isSuperset(iter) {
    iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
    return iter.isSubset(this);
  },
  keyOf: function keyOf(searchValue) {
    return this.findKey(function(value) {
      return is(value, searchValue);
    });
  },
  keySeq: function keySeq() {
    return this.toSeq().map(keyMapper).toIndexedSeq();
  },
  last: function last(notSetValue) {
    return this.toSeq().reverse().first(notSetValue);
  },
  lastKeyOf: function lastKeyOf(searchValue) {
    return this.toKeyedSeq().reverse().keyOf(searchValue);
  },
  max: function max(comparator) {
    return maxFactory(this, comparator);
  },
  maxBy: function maxBy(mapper, comparator) {
    return maxFactory(this, comparator, mapper);
  },
  min: function min(comparator) {
    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
  },
  minBy: function minBy(mapper, comparator) {
    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
  },
  rest: function rest() {
    return this.slice(1);
  },
  skip: function skip(amount) {
    return amount === 0 ? this : this.slice(Math.max(0, amount));
  },
  skipLast: function skipLast(amount) {
    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
  },
  skipWhile: function skipWhile(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, true));
  },
  skipUntil: function skipUntil(predicate, context) {
    return this.skipWhile(not(predicate), context);
  },
  sortBy: function sortBy(mapper, comparator) {
    return reify(this, sortFactory(this, comparator, mapper));
  },
  take: function take(amount) {
    return this.slice(0, Math.max(0, amount));
  },
  takeLast: function takeLast(amount) {
    return this.slice(-Math.max(0, amount));
  },
  takeWhile: function takeWhile(predicate, context) {
    return reify(this, takeWhileFactory(this, predicate, context));
  },
  takeUntil: function takeUntil(predicate, context) {
    return this.takeWhile(not(predicate), context);
  },
  update: function update7(fn) {
    return fn(this);
  },
  valueSeq: function valueSeq() {
    return this.toIndexedSeq();
  },
  hashCode: function hashCode() {
    return this.__hash || (this.__hash = hashCollection(this));
  }
});
var CollectionPrototype = Collection.prototype;
CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
CollectionPrototype.toJSON = CollectionPrototype.toArray;
CollectionPrototype.__toStringMapper = quoteString;
CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
  return this.toString();
};
CollectionPrototype.chain = CollectionPrototype.flatMap;
CollectionPrototype.contains = CollectionPrototype.includes;
mixin(KeyedCollection, {
  flip: function flip() {
    return reify(this, flipFactory(this));
  },
  mapEntries: function mapEntries(mapper, context) {
    var this$1$1 = this;
    var iterations = 0;
    return reify(this, this.toSeq().map(function(v, k) {
      return mapper.call(context, [k, v], iterations++, this$1$1);
    }).fromEntrySeq());
  },
  mapKeys: function mapKeys(mapper, context) {
    var this$1$1 = this;
    return reify(this, this.toSeq().flip().map(function(k, v) {
      return mapper.call(context, k, v, this$1$1);
    }).flip());
  }
});
var KeyedCollectionPrototype = KeyedCollection.prototype;
KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
KeyedCollectionPrototype.toJSON = toObject;
KeyedCollectionPrototype.__toStringMapper = function(v, k) {
  return quoteString(k) + ": " + quoteString(v);
};
mixin(IndexedCollection, {
  toKeyedSeq: function toKeyedSeq2() {
    return new ToKeyedSequence(this, false);
  },
  filter: function filter2(predicate, context) {
    return reify(this, filterFactory(this, predicate, context, false));
  },
  findIndex: function findIndex(predicate, context) {
    var entry = this.findEntry(predicate, context);
    return entry ? entry[0] : -1;
  },
  indexOf: function indexOf(searchValue) {
    var key = this.keyOf(searchValue);
    return key === void 0 ? -1 : key;
  },
  lastIndexOf: function lastIndexOf(searchValue) {
    var key = this.lastKeyOf(searchValue);
    return key === void 0 ? -1 : key;
  },
  reverse: function reverse2() {
    return reify(this, reverseFactory(this, false));
  },
  slice: function slice2(begin, end) {
    return reify(this, sliceFactory(this, begin, end, false));
  },
  splice: function splice(index, removeNum) {
    var numArgs = arguments.length;
    removeNum = Math.max(removeNum || 0, 0);
    if (numArgs === 0 || numArgs === 2 && !removeNum) {
      return this;
    }
    index = resolveBegin(index, index < 0 ? this.count() : this.size);
    var spliced = this.slice(0, index);
    return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
  },
  findLastIndex: function findLastIndex(predicate, context) {
    var entry = this.findLastEntry(predicate, context);
    return entry ? entry[0] : -1;
  },
  first: function first2(notSetValue) {
    return this.get(0, notSetValue);
  },
  flatten: function flatten2(depth) {
    return reify(this, flattenFactory(this, depth, false));
  },
  get: function get8(index, notSetValue) {
    index = wrapIndex(this, index);
    return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
      return key === index;
    }, void 0, notSetValue);
  },
  has: function has3(index) {
    index = wrapIndex(this, index);
    return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
  },
  interpose: function interpose(separator) {
    return reify(this, interposeFactory(this, separator));
  },
  interleave: function interleave() {
    var collections = [this].concat(arrCopy(arguments));
    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
    var interleaved = zipped.flatten(true);
    if (zipped.size) {
      interleaved.size = zipped.size * collections.length;
    }
    return reify(this, interleaved);
  },
  keySeq: function keySeq2() {
    return Range(0, this.size);
  },
  last: function last2(notSetValue) {
    return this.get(-1, notSetValue);
  },
  skipWhile: function skipWhile2(predicate, context) {
    return reify(this, skipWhileFactory(this, predicate, context, false));
  },
  zip: function zip() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections));
  },
  zipAll: function zipAll() {
    var collections = [this].concat(arrCopy(arguments));
    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
  },
  zipWith: function zipWith(zipper) {
    var collections = arrCopy(arguments);
    collections[0] = this;
    return reify(this, zipWithFactory(this, zipper, collections));
  }
});
var IndexedCollectionPrototype = IndexedCollection.prototype;
IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
mixin(SetCollection, {
  get: function get9(value, notSetValue) {
    return this.has(value) ? value : notSetValue;
  },
  includes: function includes2(value) {
    return this.has(value);
  },
  keySeq: function keySeq3() {
    return this.valueSeq();
  }
});
var SetCollectionPrototype = SetCollection.prototype;
SetCollectionPrototype.has = CollectionPrototype.includes;
SetCollectionPrototype.contains = SetCollectionPrototype.includes;
SetCollectionPrototype.keys = SetCollectionPrototype.values;
mixin(KeyedSeq, KeyedCollectionPrototype);
mixin(IndexedSeq, IndexedCollectionPrototype);
mixin(SetSeq, SetCollectionPrototype);
function reduce(collection, reducer, reduction, context, useFirst, reverse3) {
  assertNotInfinite(collection.size);
  collection.__iterate(function(v, k, c) {
    if (useFirst) {
      useFirst = false;
      reduction = v;
    } else {
      reduction = reducer.call(context, reduction, v, k, c);
    }
  }, reverse3);
  return reduction;
}
function keyMapper(v, k) {
  return k;
}
function entryMapper(v, k) {
  return [k, v];
}
function not(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
}
function neg(predicate) {
  return function() {
    return -predicate.apply(this, arguments);
  };
}
function defaultZipper() {
  return arrCopy(arguments);
}
function defaultNegComparator(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}
function hashCollection(collection) {
  if (collection.size === Infinity) {
    return 0;
  }
  var ordered = isOrdered(collection);
  var keyed = isKeyed(collection);
  var h2 = ordered ? 1 : 0;
  var size = collection.__iterate(keyed ? ordered ? function(v, k) {
    h2 = 31 * h2 + hashMerge(hash(v), hash(k)) | 0;
  } : function(v, k) {
    h2 = h2 + hashMerge(hash(v), hash(k)) | 0;
  } : ordered ? function(v) {
    h2 = 31 * h2 + hash(v) | 0;
  } : function(v) {
    h2 = h2 + hash(v) | 0;
  });
  return murmurHashOfSize(size, h2);
}
function murmurHashOfSize(size, h2) {
  h2 = imul(h2, 3432918353);
  h2 = imul(h2 << 15 | h2 >>> -15, 461845907);
  h2 = imul(h2 << 13 | h2 >>> -13, 5);
  h2 = (h2 + 3864292196 | 0) ^ size;
  h2 = imul(h2 ^ h2 >>> 16, 2246822507);
  h2 = imul(h2 ^ h2 >>> 13, 3266489909);
  h2 = smi(h2 ^ h2 >>> 16);
  return h2;
}
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
var OrderedSet = function(Set2) {
  function OrderedSet2(value) {
    return value === void 0 || value === null ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set3) {
      var iter = SetCollection(value);
      assertNotInfinite(iter.size);
      iter.forEach(function(v) {
        return set3.add(v);
      });
    });
  }
  if (Set2)
    OrderedSet2.__proto__ = Set2;
  OrderedSet2.prototype = Object.create(Set2 && Set2.prototype);
  OrderedSet2.prototype.constructor = OrderedSet2;
  OrderedSet2.of = function of() {
    return this(arguments);
  };
  OrderedSet2.fromKeys = function fromKeys(value) {
    return this(KeyedCollection(value).keySeq());
  };
  OrderedSet2.prototype.toString = function toString5() {
    return this.__toString("OrderedSet {", "}");
  };
  return OrderedSet2;
}(Set);
OrderedSet.isOrderedSet = isOrderedSet;
var OrderedSetPrototype = OrderedSet.prototype;
OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
OrderedSetPrototype.__empty = emptyOrderedSet;
OrderedSetPrototype.__make = makeOrderedSet;
function makeOrderedSet(map2, ownerID) {
  var set3 = Object.create(OrderedSetPrototype);
  set3.size = map2 ? map2.size : 0;
  set3._map = map2;
  set3.__ownerID = ownerID;
  return set3;
}
var EMPTY_ORDERED_SET;
function emptyOrderedSet() {
  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
}
function throwOnInvalidDefaultValues(defaultValues) {
  if (isRecord(defaultValues)) {
    throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
  }
  if (isImmutable(defaultValues)) {
    throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
  }
  if (defaultValues === null || typeof defaultValues !== "object") {
    throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
  }
}
var Record = function Record2(defaultValues, name) {
  var hasInitialized;
  throwOnInvalidDefaultValues(defaultValues);
  var RecordType = function Record3(values2) {
    var this$1$1 = this;
    if (values2 instanceof RecordType) {
      return values2;
    }
    if (!(this instanceof RecordType)) {
      return new RecordType(values2);
    }
    if (!hasInitialized) {
      hasInitialized = true;
      var keys2 = Object.keys(defaultValues);
      var indices = RecordTypePrototype._indices = {};
      RecordTypePrototype._name = name;
      RecordTypePrototype._keys = keys2;
      RecordTypePrototype._defaultValues = defaultValues;
      for (var i = 0; i < keys2.length; i++) {
        var propName = keys2[i];
        indices[propName] = i;
        if (RecordTypePrototype[propName]) {
          typeof console === "object" && console.warn && console.warn("Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.');
        } else {
          setProp(RecordTypePrototype, propName);
        }
      }
    }
    this.__ownerID = void 0;
    this._values = List().withMutations(function(l) {
      l.setSize(this$1$1._keys.length);
      KeyedCollection(values2).forEach(function(v, k) {
        l.set(this$1$1._indices[k], v === this$1$1._defaultValues[k] ? void 0 : v);
      });
    });
    return this;
  };
  var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
  RecordTypePrototype.constructor = RecordType;
  if (name) {
    RecordType.displayName = name;
  }
  return RecordType;
};
Record.prototype.toString = function toString4() {
  var str2 = recordName(this) + " { ";
  var keys2 = this._keys;
  var k;
  for (var i = 0, l = keys2.length; i !== l; i++) {
    k = keys2[i];
    str2 += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
  }
  return str2 + " }";
};
Record.prototype.equals = function equals2(other) {
  return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
};
Record.prototype.hashCode = function hashCode2() {
  return recordSeq(this).hashCode();
};
Record.prototype.has = function has4(k) {
  return this._indices.hasOwnProperty(k);
};
Record.prototype.get = function get10(k, notSetValue) {
  if (!this.has(k)) {
    return notSetValue;
  }
  var index = this._indices[k];
  var value = this._values.get(index);
  return value === void 0 ? this._defaultValues[k] : value;
};
Record.prototype.set = function set2(k, v) {
  if (this.has(k)) {
    var newValues = this._values.set(this._indices[k], v === this._defaultValues[k] ? void 0 : v);
    if (newValues !== this._values && !this.__ownerID) {
      return makeRecord(this, newValues);
    }
  }
  return this;
};
Record.prototype.remove = function remove2(k) {
  return this.set(k);
};
Record.prototype.clear = function clear() {
  var newValues = this._values.clear().setSize(this._keys.length);
  return this.__ownerID ? this : makeRecord(this, newValues);
};
Record.prototype.wasAltered = function wasAltered2() {
  return this._values.wasAltered();
};
Record.prototype.toSeq = function toSeq2() {
  return recordSeq(this);
};
Record.prototype.toJS = function toJS$12() {
  return toJS(this);
};
Record.prototype.entries = function entries2() {
  return this.__iterator(ITERATE_ENTRIES);
};
Record.prototype.__iterator = function __iterator(type, reverse3) {
  return recordSeq(this).__iterator(type, reverse3);
};
Record.prototype.__iterate = function __iterate(fn, reverse3) {
  return recordSeq(this).__iterate(fn, reverse3);
};
Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
  if (ownerID === this.__ownerID) {
    return this;
  }
  var newValues = this._values.__ensureOwner(ownerID);
  if (!ownerID) {
    this.__ownerID = ownerID;
    this._values = newValues;
    return this;
  }
  return makeRecord(this, newValues, ownerID);
};
Record.isRecord = isRecord;
Record.getDescriptiveName = recordName;
var RecordPrototype = Record.prototype;
RecordPrototype[IS_RECORD_SYMBOL] = true;
RecordPrototype[DELETE] = RecordPrototype.remove;
RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
RecordPrototype.getIn = getIn;
RecordPrototype.hasIn = CollectionPrototype.hasIn;
RecordPrototype.merge = merge$1;
RecordPrototype.mergeWith = mergeWith$1;
RecordPrototype.mergeIn = mergeIn;
RecordPrototype.mergeDeep = mergeDeep;
RecordPrototype.mergeDeepWith = mergeDeepWith;
RecordPrototype.mergeDeepIn = mergeDeepIn;
RecordPrototype.setIn = setIn;
RecordPrototype.update = update;
RecordPrototype.updateIn = updateIn;
RecordPrototype.withMutations = withMutations;
RecordPrototype.asMutable = asMutable;
RecordPrototype.asImmutable = asImmutable;
RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
RecordPrototype.inspect = RecordPrototype.toSource = function() {
  return this.toString();
};
function makeRecord(likeRecord, values2, ownerID) {
  var record = Object.create(Object.getPrototypeOf(likeRecord));
  record._values = values2;
  record.__ownerID = ownerID;
  return record;
}
function recordName(record) {
  return record.constructor.displayName || record.constructor.name || "Record";
}
function recordSeq(record) {
  return keyedSeqFromValue(record._keys.map(function(k) {
    return [k, record.get(k)];
  }));
}
function setProp(prototype, name) {
  try {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, "Cannot set on an immutable record.");
        this.set(name, value);
      }
    });
  } catch (error) {
  }
}
var Repeat = function(IndexedSeq2) {
  function Repeat2(value, times) {
    if (!(this instanceof Repeat2)) {
      return new Repeat2(value, times);
    }
    this._value = value;
    this.size = times === void 0 ? Infinity : Math.max(0, times);
    if (this.size === 0) {
      if (EMPTY_REPEAT) {
        return EMPTY_REPEAT;
      }
      EMPTY_REPEAT = this;
    }
  }
  if (IndexedSeq2)
    Repeat2.__proto__ = IndexedSeq2;
  Repeat2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
  Repeat2.prototype.constructor = Repeat2;
  Repeat2.prototype.toString = function toString5() {
    if (this.size === 0) {
      return "Repeat []";
    }
    return "Repeat [ " + this._value + " " + this.size + " times ]";
  };
  Repeat2.prototype.get = function get11(index, notSetValue) {
    return this.has(index) ? this._value : notSetValue;
  };
  Repeat2.prototype.includes = function includes3(searchValue) {
    return is(this._value, searchValue);
  };
  Repeat2.prototype.slice = function slice3(begin, end) {
    var size = this.size;
    return wholeSlice(begin, end, size) ? this : new Repeat2(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
  };
  Repeat2.prototype.reverse = function reverse3() {
    return this;
  };
  Repeat2.prototype.indexOf = function indexOf2(searchValue) {
    if (is(this._value, searchValue)) {
      return 0;
    }
    return -1;
  };
  Repeat2.prototype.lastIndexOf = function lastIndexOf2(searchValue) {
    if (is(this._value, searchValue)) {
      return this.size;
    }
    return -1;
  };
  Repeat2.prototype.__iterate = function __iterate2(fn, reverse3) {
    var size = this.size;
    var i = 0;
    while (i !== size) {
      if (fn(this._value, reverse3 ? size - ++i : i++, this) === false) {
        break;
      }
    }
    return i;
  };
  Repeat2.prototype.__iterator = function __iterator2(type, reverse3) {
    var this$1$1 = this;
    var size = this.size;
    var i = 0;
    return new Iterator(function() {
      return i === size ? iteratorDone() : iteratorValue(type, reverse3 ? size - ++i : i++, this$1$1._value);
    });
  };
  Repeat2.prototype.equals = function equals3(other) {
    return other instanceof Repeat2 ? is(this._value, other._value) : deepEqual(other);
  };
  return Repeat2;
}(IndexedSeq);
var EMPTY_REPEAT;

// js/textDiff.ts
init_define_process();
var import_fast_diff = __toESM(require_diff(), 1);
function createDelta(original, revision) {
  var result = (0, import_fast_diff.default)(original, revision);
  const delta = result.map((r) => r[0] === 1 ? r : [r[0], r[1].length]);
  return delta;
}
function applyPatch(original, delta) {
  var result = "", index = 0;
  for (var i = 0; i < delta.length; i++) {
    var item = delta[i], operation = item[0], value = item[1];
    if (item[0] === -1 && typeof value === "number") {
      index += value;
    } else if (operation == 0 && typeof value === "number") {
      result += original.slice(index, index += value);
    } else {
      result += value;
    }
  }
  return result;
}

// js/session.ts
function initSession(room, u) {
  return Record({ ...u, room, state: Record(u.state)() });
}
var session = null;
var hashStore = {};
var CodeSession = class {
  session;
  update() {
    Object.keys(this.cb).map((k) => this.cb[k]).map((x) => {
      try {
        x(true);
      } catch (err) {
        console.error("error calling callback", { err });
      }
    });
  }
  cb = {};
  onUpdate(fn, regId) {
    this.cb[regId] = fn;
  }
  hashCodeSession = 0;
  room;
  originStr;
  created = new Date().toISOString();
  constructor(room, user2, originStr) {
    session = this;
    this.room = room;
    this.originStr = originStr;
    const savedState = null;
    this.session = initSession(room, {
      ...user2,
      state: savedState ? savedState : JSON.parse(str(user2.state, this.originStr))
    })();
  }
  hashOfState = () => {
    const state = this.session.get("state");
    const hashCode4 = state.hashCode();
    hashStore[hashCode4] = state;
    return hashCode4;
  };
  createPatchFromHashCode = async (oldHash, state) => {
    const s = JSON.parse(str(state, this.originStr));
    if (!hashStore[oldHash]) {
      const resp = await fetch(`/live/${this.room}
        `);
      const { mST: mST2, hashCode: hashCode4 } = await resp.json();
      hashStore[hashCode4] = this.session.get("state").merge(mST2);
    }
    const oldRec = hashStore[oldHash];
    const oldStr = str(oldRec.toJSON(), this.originStr);
    const newRec = oldRec.merge(s);
    const newStr = str(newRec.toJSON(), this.originStr);
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;
    const patch = createPatch(oldStr, newStr);
    return {
      oldHash,
      newHash,
      patch
    };
  };
  applyPatch = async ({
    oldHash,
    newHash,
    patch
  }) => {
    const codeSpace2 = this.room || "";
    if (!Object.keys(hashStore).map((x) => Number(x)).includes(Number(oldHash)) && codeSpace2) {
      console.log(Object.keys(hashStore));
      const resp = await fetch(`/live/${codeSpace2}/mST`);
      if (resp.ok) {
        const s = await resp.json();
        const serverRecord = this.session.get("state").merge(JSON.parse(str(s.mST, this.originStr)));
        hashStore[serverRecord.hashCode()] = serverRecord;
      } else {
        const { mST: mST2 } = await import(location.origin + `/live/${this.room}/mst.mjs?${Date.now()}`);
        const latestRec = this.session.get("state").merge(JSON.parse(str(mST2, this.originStr)));
        hashStore[latestRec.hashCode()] = latestRec;
      }
    }
    const oldStr = str(hashStore[oldHash].toJSON(), this.originStr);
    const applied = applyPatch(oldStr, patch);
    const newState = JSON.parse(applied);
    const newRec = this.session.get("state").merge(newState);
    const newRecord = this.session.get("state").merge(newRec);
    const newHashCheck = newRecord.hashCode();
    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
    } else {
      new Error("Wrong patch");
      return;
    }
  };
  json() {
    const user2 = this.session.toJSON();
    const state = user2.state.toJSON();
    return { ...user2, state };
  }
  setRoom(codeSpace2) {
    const user2 = this.session.set("room", codeSpace2);
    this.session = user2;
  }
};
var hashCode3 = () => session ? session.hashOfState() : 0;
var mST = (originStr) => {
  if (!session) {
    return {
      i: 0,
      transpiled: "",
      code: "",
      html: "",
      css: ""
    };
  }
  if (originStr)
    return addOrigin(session.json().state, originStr);
  const { i, transpiled, code, html, css } = session.json().state;
  return { i, transpiled, code, html, css };
};
function addOrigin(s, originStr) {
  const { i, transpiled, code, html, css } = s;
  const mst = { i, transpiled, code, html, css };
  mst.code = mst.code.replace(`from '/live`, `from '${originStr}/live`);
  mst.code = mst.code.replace(`from './`, `from '${originStr}/live/`);
  mst.transpiled = mst.transpiled.replace(`from "/live`, `from "${originStr}/live`);
  mst.transpiled = mst.transpiled.replace(`from "./`, `from "${originStr}/live/`);
  return mst;
}
function str(s, originStr) {
  return JSON.stringify(addOrigin(s, originStr));
}
var applyPatch2 = async (x) => {
  await session?.applyPatch(x);
  session?.update();
};
var onSessionUpdate = (fn, regId = "default") => session?.onUpdate(fn, regId);
var makePatchFrom = (n, st) => session.createPatchFromHashCode(n, st);
var makePatch = (st) => makePatchFrom(hashCode3(), st);
var startSession = (room, u, originStr) => session || new CodeSession(room, u, originStr);
function createPatch(oldCode, newCode) {
  return createDelta(oldCode, newCode);
}

// js/uidV4.mjs
init_define_process();
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function stringify(array) {
  const offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const uuid = (byteToHex[array[offset + 0]] + byteToHex[array[offset + 1]] + byteToHex[array[offset + 2]] + byteToHex[array[offset + 3]] + "-" + byteToHex[array[offset + 4]] + byteToHex[array[offset + 5]] + "-" + byteToHex[array[offset + 6]] + byteToHex[array[offset + 7]] + "-" + byteToHex[array[offset + 8]] + byteToHex[array[offset + 9]] + "-" + byteToHex[array[offset + 10]] + byteToHex[array[offset + 11]] + byteToHex[array[offset + 12]] + byteToHex[array[offset + 13]] + byteToHex[array[offset + 14]] + byteToHex[array[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}

// js/starter.tsx
init_define_process();
import { Fragment } from "/react.mjs";

// js/md5.js
init_define_process();
function md5(inputString) {
  var hc = "0123456789abcdef";
  function rh(n) {
    var j, s = "";
    for (j = 0; j <= 3; j++) {
      s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
    }
    return s;
  }
  function ad(x2, y) {
    var l = (x2 & 65535) + (y & 65535);
    var m = (x2 >> 16) + (y >> 16) + (l >> 16);
    return m << 16 | l & 65535;
  }
  function rl(n, c2) {
    return n << c2 | n >>> 32 - c2;
  }
  function cm(q, a2, b2, x2, s, t) {
    return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
  }
  function ff(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
  }
  function gg(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
  }
  function hh(a2, b2, c2, d2, x2, s, t) {
    return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
  }
  function ii(a2, b2, c2, d2, x2, s, t) {
    return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
  }
  function sb(x2) {
    var i2;
    var nblk = (x2.length + 8 >> 6) + 1;
    var blks = new Array(nblk * 16);
    for (i2 = 0; i2 < nblk * 16; i2++)
      blks[i2] = 0;
    for (i2 = 0; i2 < x2.length; i2++) {
      blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
    }
    blks[i2 >> 2] |= 128 << i2 % 4 * 8;
    blks[nblk * 16 - 2] = x2.length * 8;
    return blks;
  }
  var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = ad(a, olda);
    b = ad(b, oldb);
    c = ad(c, oldc);
    d = ad(d, oldd);
  }
  return rh(a) + rh(b) + rh(c) + rh(d);
}

// ../../node_modules/es-module-shims/dist/es-module-shims.js
init_define_process();
(function() {
  const hasWindow = typeof window !== "undefined";
  const hasDocument = typeof document !== "undefined";
  const noop = () => {
  };
  const optionsScript = hasDocument ? document.querySelector("script[type=esms-options]") : void 0;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const skip2 = esmsInitOptions.skip ? new RegExp(esmsInitOptions.skip) : null;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;
  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector("script[nonce]");
    if (nonceElement)
      nonce = nonceElement.nonce || nonceElement.getAttribute("nonce");
  }
  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log("%c^^ Module TypeError above is polyfilled and can be ignored ^^", "font-weight:900;color:#391");
  };
  const { revokeBlobURLs, noLoadEventRetriggers, enforceIntegrity } = esmsInitOptions;
  function globalHook(name) {
    return typeof name === "string" ? self[name] : name;
  }
  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes("css-modules");
  const jsonModulesEnabled = enable.includes("json-modules");
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes("/") ? location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) : location.pathname}`;
  function createBlob(source, type = "text/javascript") {
    return URL.createObjectURL(new Blob([source], { type }));
  }
  const eoop = (err2) => setTimeout(() => {
    throw err2;
  });
  const throwError = (err2) => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err2), void onerror(err2);
  };
  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : "";
  }
  let importMapSrcOrLazy = false;
  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  }
  if (!shimMode) {
    if (document.querySelectorAll("script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]").length) {
      shimMode = true;
    } else {
      let seenScript = false;
      for (const script of document.querySelectorAll("script[type=module],script[type=importmap]")) {
        if (!seenScript) {
          if (script.type === "module" && !script.ep)
            seenScript = true;
        } else if (script.type === "importmap" && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }
  const backslashRegEx = /\\/g;
  function isURL(url) {
    if (url.indexOf(":") === -1)
      return false;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl("./" + relUrl, parentUrl));
  }
  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    const queryHashIndex = parentUrl.indexOf("?", parentUrl.indexOf("#") === -1 ? parentUrl.indexOf("#") : parentUrl.length);
    if (queryHashIndex !== -1)
      parentUrl = parentUrl.slice(0, queryHashIndex);
    if (relUrl.indexOf("\\") !== -1)
      relUrl = relUrl.replace(backslashRegEx, "/");
    if (relUrl[0] === "/" && relUrl[1] === "/") {
      return parentUrl.slice(0, parentUrl.indexOf(":") + 1) + relUrl;
    } else if (relUrl[0] === "." && (relUrl[1] === "/" || relUrl[1] === "." && (relUrl[2] === "/" || relUrl.length === 2 && (relUrl += "/")) || relUrl.length === 1 && (relUrl += "/")) || relUrl[0] === "/") {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(":") + 1);
      let pathname;
      if (parentUrl[parentProtocol.length + 1] === "/") {
        if (parentProtocol !== "file:") {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf("/") + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === "/"));
      }
      if (relUrl[0] === "/")
        return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl;
      const segmented = pathname.slice(0, pathname.lastIndexOf("/") + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;
      for (let i2 = 0; i2 < segmented.length; i2++) {
        if (segmentIndex !== -1) {
          if (segmented[i2] === "/") {
            output.push(segmented.slice(segmentIndex, i2 + 1));
            segmentIndex = -1;
          }
          continue;
        } else if (segmented[i2] === ".") {
          if (segmented[i2 + 1] === "." && (segmented[i2 + 2] === "/" || i2 + 2 === segmented.length)) {
            output.pop();
            i2 += 2;
            continue;
          } else if (segmented[i2 + 1] === "/" || i2 + 1 === segmented.length) {
            i2 += 1;
            continue;
          }
        }
        while (segmented[i2] === "/")
          i2++;
        segmentIndex = i2;
      }
      if (segmentIndex !== -1)
        output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join("");
    }
  }
  function resolveAndComposeImportMap(json, baseUrl2, parentMap) {
    const outMap = { imports: Object.assign({}, parentMap.imports), scopes: Object.assign({}, parentMap.scopes) };
    if (json.imports)
      resolveAndComposePackages(json.imports, outMap.imports, baseUrl2, parentMap);
    if (json.scopes)
      for (let s2 in json.scopes) {
        const resolvedScope = resolveUrl(s2, baseUrl2);
        resolveAndComposePackages(json.scopes[s2], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl2, parentMap);
      }
    return outMap;
  }
  function getMatch(path, matchObj) {
    if (matchObj[path])
      return path;
    let sepIndex = path.length;
    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj)
        return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
  }
  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);
    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null)
        return;
      return pkg + id.slice(pkgName.length);
    }
  }
  function resolveImportMap(importMap2, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap2.scopes);
    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap2.scopes[scopeUrl]);
      if (packageResolution)
        return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), importMap2.scopes);
    }
    return applyPackages(resolvedOrPlain, importMap2.imports) || resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain;
  }
  function resolveAndComposePackages(packages, outPackages, baseUrl2, parentMap) {
    for (let p2 in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p2, baseUrl2) || p2;
      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }
      let target = packages[p2];
      if (typeof target !== "string")
        continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl2) || target, baseUrl2);
      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }
      console.warn(`Mapping "${p2}" -> "${packages[p2]}" does not resolve`);
    }
  }
  let err;
  window.addEventListener("error", (_err) => err = _err);
  function dynamicImportScript(url, { errUrl = url } = {}) {
    err = void 0;
    const src = createBlob(`import*as m from'${url}';self._esmsi=m`);
    const s2 = Object.assign(document.createElement("script"), { type: "module", src, ep: true });
    s2.setAttribute("nonce", nonce);
    s2.setAttribute("noshim", "");
    const p2 = new Promise((resolve2, reject) => {
      s2.addEventListener("error", cb);
      s2.addEventListener("load", cb);
      function cb(_err) {
        document.head.removeChild(s2);
        if (self._esmsi) {
          resolve2(self._esmsi, baseUrl);
          self._esmsi = void 0;
        } else {
          reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading or executing the graph of ${errUrl} (check the console for ${src}).`));
          err = void 0;
        }
      }
    });
    document.head.appendChild(s2);
    return p2;
  }
  let dynamicImport = dynamicImportScript;
  const supportsDynamicImportCheck = dynamicImportScript(createBlob("export default u=>import(u)")).then((_dynamicImport) => {
    if (_dynamicImport)
      dynamicImport = _dynamicImport.default;
    return !!_dynamicImport;
  }, noop);
  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  let supportsImportMaps = hasDocument && HTMLScriptElement.supports ? HTMLScriptElement.supports("importmap") : false;
  let supportsImportMeta = supportsImportMaps;
  let supportsDynamicImport = false;
  const featureDetectionPromise = Promise.resolve(supportsImportMaps || supportsDynamicImportCheck).then((_supportsDynamicImport) => {
    if (!_supportsDynamicImport)
      return;
    supportsDynamicImport = true;
    return Promise.all([
      supportsImportMaps || dynamicImport(createBlob("import.meta")).then(() => supportsImportMeta = true, noop),
      cssModulesEnabled && dynamicImport(createBlob(`import"${createBlob("", "text/css")}"assert{type:"css"}`)).then(() => supportsCssAssertions = true, noop),
      jsonModulesEnabled && dynamicImport(createBlob(`import"${createBlob("{}", "text/json")}"assert{type:"json"}`)).then(() => supportsJsonAssertions = true, noop),
      supportsImportMaps || hasDocument && (HTMLScriptElement.supports || new Promise((resolve2) => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.setAttribute("nonce", nonce);
        iframe.srcdoc = `<!doctype html><script nonce="${nonce}"><${""}/script>`;
        document.head.appendChild(iframe);
        iframe.onload = () => {
          self._$s = (v) => {
            document.head.removeChild(iframe);
            supportsImportMaps = v;
            delete self._$s;
            resolve2();
          };
          const supportsSrcDoc = iframe.contentDocument.head.childNodes.length > 0;
          const importMapTest = `<!doctype html><script type=importmap nonce="${nonce}">{"imports":{"x":"${createBlob("")}"}<${""}/script><script nonce="${nonce}">import('x').catch(() => {}).then(v=>parent._$s(!!v))<${""}/script>`;
          if (supportsSrcDoc)
            iframe.srcdoc = importMapTest;
          else
            iframe.contentDocument.write(importMapTest);
        };
      }))
    ]);
  });
  let e, a, r, s = 2 << 19;
  const i = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function(e2, a2) {
    const r2 = e2.length;
    let s2 = 0;
    for (; s2 < r2; )
      a2[s2] = e2.charCodeAt(s2++);
  } : function(e2, a2) {
    const r2 = e2.length;
    let s2 = 0;
    for (; s2 < r2; ) {
      const r3 = e2.charCodeAt(s2);
      a2[s2++] = (255 & r3) << 8 | r3 >>> 8;
    }
  }, t = "xportmportlassetafromssertvoyiedeleinstantyreturdebuggeawaithrwhileforifcatcfinallels";
  let c$1, f, n;
  function parse(k2, l2 = "@") {
    c$1 = k2, f = l2;
    const u2 = 2 * c$1.length + (2 << 18);
    if (u2 > s || !e) {
      for (; u2 > s; )
        s *= 2;
      a = new ArrayBuffer(s), i(t, new Uint16Array(a, 16, 85)), e = function(e2, a2, r2) {
        ;
        var s2 = new e2.Int8Array(r2), i2 = new e2.Int16Array(r2), t2 = new e2.Int32Array(r2), c2 = new e2.Uint8Array(r2), f2 = new e2.Uint16Array(r2), n2 = 992;
        function b2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, c3 = 0, b3 = 0, u4 = 0, w3 = 0, v2 = 0;
          v2 = n2;
          n2 = n2 + 11520 | 0;
          u4 = v2 + 2048 | 0;
          s2[763] = 1;
          i2[377] = 0;
          i2[378] = 0;
          i2[379] = 0;
          i2[380] = -1;
          t2[57] = t2[2];
          s2[764] = 0;
          t2[56] = 0;
          s2[762] = 0;
          t2[58] = v2 + 10496;
          t2[59] = v2 + 2304;
          t2[60] = v2;
          s2[765] = 0;
          e3 = (t2[3] | 0) + -2 | 0;
          t2[61] = e3;
          a3 = e3 + (t2[54] << 1) | 0;
          t2[62] = a3;
          e:
            while (1) {
              r3 = e3 + 2 | 0;
              t2[61] = r3;
              if (e3 >>> 0 >= a3 >>> 0) {
                b3 = 18;
                break;
              }
              a:
                do {
                  switch (i2[r3 >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;
                    case 101: {
                      if ((((i2[379] | 0) == 0 ? D(r3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) ? (k3(), (s2[763] | 0) == 0) : 0) {
                        b3 = 9;
                        break e;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 105: {
                      if (D(r3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                        l3();
                        b3 = 17;
                      } else
                        b3 = 17;
                      break;
                    }
                    case 59: {
                      b3 = 17;
                      break;
                    }
                    case 47:
                      switch (i2[e3 + 4 >> 1] | 0) {
                        case 47: {
                          j();
                          break a;
                        }
                        case 42: {
                          y(1);
                          break a;
                        }
                        default: {
                          b3 = 16;
                          break e;
                        }
                      }
                    default: {
                      b3 = 16;
                      break e;
                    }
                  }
                } while (0);
              if ((b3 | 0) == 17) {
                b3 = 0;
                t2[57] = t2[61];
              }
              e3 = t2[61] | 0;
              a3 = t2[62] | 0;
            }
          if ((b3 | 0) == 9) {
            e3 = t2[61] | 0;
            t2[57] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 16) {
            s2[763] = 0;
            t2[61] = e3;
            b3 = 19;
          } else if ((b3 | 0) == 18)
            if (!(s2[762] | 0)) {
              e3 = r3;
              b3 = 19;
            } else
              e3 = 0;
          do {
            if ((b3 | 0) == 19) {
              e:
                while (1) {
                  a3 = e3 + 2 | 0;
                  t2[61] = a3;
                  c3 = a3;
                  if (e3 >>> 0 >= (t2[62] | 0) >>> 0) {
                    b3 = 75;
                    break;
                  }
                  a:
                    do {
                      switch (i2[a3 >> 1] | 0) {
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 32:
                          break;
                        case 101: {
                          if (((i2[379] | 0) == 0 ? D(a3) | 0 : 0) ? (m(e3 + 4 | 0, 16, 10) | 0) == 0 : 0) {
                            k3();
                            b3 = 74;
                          } else
                            b3 = 74;
                          break;
                        }
                        case 105: {
                          if (D(a3) | 0 ? (m(e3 + 4 | 0, 26, 10) | 0) == 0 : 0) {
                            l3();
                            b3 = 74;
                          } else
                            b3 = 74;
                          break;
                        }
                        case 99: {
                          if ((D(a3) | 0 ? (m(e3 + 4 | 0, 36, 8) | 0) == 0 : 0) ? M(i2[e3 + 12 >> 1] | 0) | 0 : 0) {
                            s2[765] = 1;
                            b3 = 74;
                          } else
                            b3 = 74;
                          break;
                        }
                        case 40: {
                          r3 = t2[57] | 0;
                          c3 = t2[59] | 0;
                          b3 = i2[379] | 0;
                          i2[379] = b3 + 1 << 16 >> 16;
                          t2[c3 + ((b3 & 65535) << 2) >> 2] = r3;
                          b3 = 74;
                          break;
                        }
                        case 41: {
                          a3 = i2[379] | 0;
                          if (!(a3 << 16 >> 16)) {
                            b3 = 36;
                            break e;
                          }
                          a3 = a3 + -1 << 16 >> 16;
                          i2[379] = a3;
                          r3 = i2[378] | 0;
                          if (r3 << 16 >> 16 != 0 ? (w3 = t2[(t2[60] | 0) + ((r3 & 65535) + -1 << 2) >> 2] | 0, (t2[w3 + 20 >> 2] | 0) == (t2[(t2[59] | 0) + ((a3 & 65535) << 2) >> 2] | 0)) : 0) {
                            a3 = w3 + 4 | 0;
                            if (!(t2[a3 >> 2] | 0))
                              t2[a3 >> 2] = c3;
                            t2[w3 + 12 >> 2] = e3 + 4;
                            i2[378] = r3 + -1 << 16 >> 16;
                            b3 = 74;
                          } else
                            b3 = 74;
                          break;
                        }
                        case 123: {
                          b3 = t2[57] | 0;
                          c3 = t2[51] | 0;
                          e3 = b3;
                          do {
                            if ((i2[b3 >> 1] | 0) == 41 & (c3 | 0) != 0 ? (t2[c3 + 4 >> 2] | 0) == (b3 | 0) : 0) {
                              a3 = t2[52] | 0;
                              t2[51] = a3;
                              if (!a3) {
                                t2[47] = 0;
                                break;
                              } else {
                                t2[a3 + 28 >> 2] = 0;
                                break;
                              }
                            }
                          } while (0);
                          r3 = i2[379] | 0;
                          b3 = r3 & 65535;
                          s2[u4 + b3 >> 0] = s2[765] | 0;
                          s2[765] = 0;
                          c3 = t2[59] | 0;
                          i2[379] = r3 + 1 << 16 >> 16;
                          t2[c3 + (b3 << 2) >> 2] = e3;
                          b3 = 74;
                          break;
                        }
                        case 125: {
                          e3 = i2[379] | 0;
                          if (!(e3 << 16 >> 16)) {
                            b3 = 49;
                            break e;
                          }
                          r3 = e3 + -1 << 16 >> 16;
                          i2[379] = r3;
                          a3 = i2[380] | 0;
                          if (e3 << 16 >> 16 != a3 << 16 >> 16)
                            if (a3 << 16 >> 16 != -1 & (r3 & 65535) < (a3 & 65535)) {
                              b3 = 53;
                              break e;
                            } else {
                              b3 = 74;
                              break a;
                            }
                          else {
                            c3 = t2[58] | 0;
                            b3 = (i2[377] | 0) + -1 << 16 >> 16;
                            i2[377] = b3;
                            i2[380] = i2[c3 + ((b3 & 65535) << 1) >> 1] | 0;
                            h3();
                            b3 = 74;
                            break a;
                          }
                        }
                        case 39: {
                          d2(39);
                          b3 = 74;
                          break;
                        }
                        case 34: {
                          d2(34);
                          b3 = 74;
                          break;
                        }
                        case 47:
                          switch (i2[e3 + 4 >> 1] | 0) {
                            case 47: {
                              j();
                              break a;
                            }
                            case 42: {
                              y(1);
                              break a;
                            }
                            default: {
                              a3 = t2[57] | 0;
                              r3 = i2[a3 >> 1] | 0;
                              r:
                                do {
                                  if (!(U(r3) | 0)) {
                                    switch (r3 << 16 >> 16) {
                                      case 41:
                                        if (q(t2[(t2[59] | 0) + (f2[379] << 2) >> 2] | 0) | 0) {
                                          b3 = 71;
                                          break r;
                                        } else {
                                          b3 = 68;
                                          break r;
                                        }
                                      case 125:
                                        break;
                                      default: {
                                        b3 = 68;
                                        break r;
                                      }
                                    }
                                    e3 = f2[379] | 0;
                                    if (!(p2(t2[(t2[59] | 0) + (e3 << 2) >> 2] | 0) | 0) ? (s2[u4 + e3 >> 0] | 0) == 0 : 0)
                                      b3 = 68;
                                    else
                                      b3 = 71;
                                  } else
                                    switch (r3 << 16 >> 16) {
                                      case 46:
                                        if (((i2[a3 + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                          b3 = 68;
                                          break r;
                                        } else {
                                          b3 = 71;
                                          break r;
                                        }
                                      case 43:
                                        if ((i2[a3 + -2 >> 1] | 0) == 43) {
                                          b3 = 68;
                                          break r;
                                        } else {
                                          b3 = 71;
                                          break r;
                                        }
                                      case 45:
                                        if ((i2[a3 + -2 >> 1] | 0) == 45) {
                                          b3 = 68;
                                          break r;
                                        } else {
                                          b3 = 71;
                                          break r;
                                        }
                                      default: {
                                        b3 = 71;
                                        break r;
                                      }
                                    }
                                } while (0);
                              r:
                                do {
                                  if ((b3 | 0) == 68) {
                                    b3 = 0;
                                    if (!(o2(a3) | 0)) {
                                      switch (r3 << 16 >> 16) {
                                        case 0: {
                                          b3 = 71;
                                          break r;
                                        }
                                        case 47:
                                          break;
                                        default: {
                                          e3 = 1;
                                          break r;
                                        }
                                      }
                                      if (!(s2[764] | 0))
                                        e3 = 1;
                                      else
                                        b3 = 71;
                                    } else
                                      b3 = 71;
                                  }
                                } while (0);
                              if ((b3 | 0) == 71) {
                                g();
                                e3 = 0;
                              }
                              s2[764] = e3;
                              b3 = 74;
                              break a;
                            }
                          }
                        case 96: {
                          h3();
                          b3 = 74;
                          break;
                        }
                        default:
                          b3 = 74;
                      }
                    } while (0);
                  if ((b3 | 0) == 74) {
                    b3 = 0;
                    t2[57] = t2[61];
                  }
                  e3 = t2[61] | 0;
                }
              if ((b3 | 0) == 36) {
                L();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 49) {
                L();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 53) {
                L();
                e3 = 0;
                break;
              } else if ((b3 | 0) == 75) {
                e3 = (i2[380] | 0) == -1 & (i2[379] | 0) == 0 & (s2[762] | 0) == 0 & (i2[378] | 0) == 0;
                break;
              }
            }
          } while (0);
          n2 = v2;
          return e3 | 0;
        }
        function k3() {
          var e3 = 0, a3 = 0, r3 = 0, c3 = 0, f3 = 0, n3 = 0;
          f3 = t2[61] | 0;
          n3 = f3 + 12 | 0;
          t2[61] = n3;
          a3 = w2(1) | 0;
          e3 = t2[61] | 0;
          if (!((e3 | 0) == (n3 | 0) ? !(I(a3) | 0) : 0))
            c3 = 3;
          e:
            do {
              if ((c3 | 0) == 3) {
                a:
                  do {
                    switch (a3 << 16 >> 16) {
                      case 100: {
                        B(e3, e3 + 14 | 0);
                        break e;
                      }
                      case 97: {
                        t2[61] = e3 + 10;
                        w2(1) | 0;
                        e3 = t2[61] | 0;
                        c3 = 6;
                        break;
                      }
                      case 102: {
                        c3 = 6;
                        break;
                      }
                      case 99: {
                        if ((m(e3 + 2 | 0, 36, 8) | 0) == 0 ? (r3 = e3 + 10 | 0, $(i2[r3 >> 1] | 0) | 0) : 0) {
                          t2[61] = r3;
                          f3 = w2(1) | 0;
                          n3 = t2[61] | 0;
                          E(f3) | 0;
                          B(n3, t2[61] | 0);
                          t2[61] = (t2[61] | 0) + -2;
                          break e;
                        }
                        e3 = e3 + 4 | 0;
                        t2[61] = e3;
                        c3 = 13;
                        break;
                      }
                      case 108:
                      case 118: {
                        c3 = 13;
                        break;
                      }
                      case 123: {
                        t2[61] = e3 + 2;
                        e3 = w2(1) | 0;
                        r3 = t2[61] | 0;
                        while (1) {
                          if (N(e3) | 0) {
                            d2(e3);
                            e3 = (t2[61] | 0) + 2 | 0;
                            t2[61] = e3;
                          } else {
                            E(e3) | 0;
                            e3 = t2[61] | 0;
                          }
                          w2(1) | 0;
                          e3 = C(r3, e3) | 0;
                          if (e3 << 16 >> 16 == 44) {
                            t2[61] = (t2[61] | 0) + 2;
                            e3 = w2(1) | 0;
                          }
                          a3 = r3;
                          r3 = t2[61] | 0;
                          if (e3 << 16 >> 16 == 125) {
                            c3 = 32;
                            break;
                          }
                          if ((r3 | 0) == (a3 | 0)) {
                            c3 = 29;
                            break;
                          }
                          if (r3 >>> 0 > (t2[62] | 0) >>> 0) {
                            c3 = 31;
                            break;
                          }
                        }
                        if ((c3 | 0) == 29) {
                          L();
                          break e;
                        } else if ((c3 | 0) == 31) {
                          L();
                          break e;
                        } else if ((c3 | 0) == 32) {
                          t2[61] = r3 + 2;
                          c3 = 34;
                          break a;
                        }
                        break;
                      }
                      case 42: {
                        t2[61] = e3 + 2;
                        w2(1) | 0;
                        c3 = t2[61] | 0;
                        C(c3, c3) | 0;
                        c3 = 34;
                        break;
                      }
                      default: {
                      }
                    }
                  } while (0);
                if ((c3 | 0) == 6) {
                  t2[61] = e3 + 16;
                  e3 = w2(1) | 0;
                  if (e3 << 16 >> 16 == 42) {
                    t2[61] = (t2[61] | 0) + 2;
                    e3 = w2(1) | 0;
                  }
                  n3 = t2[61] | 0;
                  E(e3) | 0;
                  B(n3, t2[61] | 0);
                  t2[61] = (t2[61] | 0) + -2;
                  break;
                } else if ((c3 | 0) == 13) {
                  e3 = e3 + 4 | 0;
                  t2[61] = e3;
                  s2[763] = 0;
                  a:
                    while (1) {
                      t2[61] = e3 + 2;
                      n3 = w2(1) | 0;
                      e3 = t2[61] | 0;
                      switch ((E(n3) | 0) << 16 >> 16) {
                        case 91:
                        case 123: {
                          c3 = 15;
                          break a;
                        }
                        default: {
                        }
                      }
                      a3 = t2[61] | 0;
                      if ((a3 | 0) == (e3 | 0))
                        break e;
                      B(e3, a3);
                      switch ((w2(1) | 0) << 16 >> 16) {
                        case 61: {
                          c3 = 19;
                          break a;
                        }
                        case 44:
                          break;
                        default: {
                          c3 = 20;
                          break a;
                        }
                      }
                      e3 = t2[61] | 0;
                    }
                  if ((c3 | 0) == 15) {
                    t2[61] = (t2[61] | 0) + -2;
                    break;
                  } else if ((c3 | 0) == 19) {
                    t2[61] = (t2[61] | 0) + -2;
                    break;
                  } else if ((c3 | 0) == 20) {
                    t2[61] = (t2[61] | 0) + -2;
                    break;
                  }
                } else if ((c3 | 0) == 34)
                  a3 = w2(1) | 0;
                e3 = t2[61] | 0;
                if (a3 << 16 >> 16 == 102 ? (m(e3 + 2 | 0, 52, 6) | 0) == 0 : 0) {
                  t2[61] = e3 + 8;
                  u3(f3, w2(1) | 0);
                  break;
                }
                t2[61] = e3 + -2;
              }
            } while (0);
          return;
        }
        function l3() {
          var e3 = 0, a3 = 0, r3 = 0, c3 = 0, f3 = 0;
          f3 = t2[61] | 0;
          a3 = f3 + 12 | 0;
          t2[61] = a3;
          e:
            do {
              switch ((w2(1) | 0) << 16 >> 16) {
                case 40: {
                  e3 = t2[61] | 0;
                  a3 = t2[59] | 0;
                  r3 = i2[379] | 0;
                  i2[379] = r3 + 1 << 16 >> 16;
                  t2[a3 + ((r3 & 65535) << 2) >> 2] = e3;
                  if ((i2[t2[57] >> 1] | 0) != 46) {
                    e3 = t2[61] | 0;
                    t2[61] = e3 + 2;
                    r3 = w2(1) | 0;
                    v(f3, t2[61] | 0, 0, e3);
                    e3 = t2[51] | 0;
                    a3 = t2[60] | 0;
                    f3 = i2[378] | 0;
                    i2[378] = f3 + 1 << 16 >> 16;
                    t2[a3 + ((f3 & 65535) << 2) >> 2] = e3;
                    switch (r3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        t2[61] = (t2[61] | 0) + -2;
                        break e;
                      }
                    }
                    e3 = (t2[61] | 0) + 2 | 0;
                    t2[61] = e3;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 44: {
                        t2[61] = (t2[61] | 0) + 2;
                        w2(1) | 0;
                        r3 = t2[51] | 0;
                        t2[r3 + 4 >> 2] = e3;
                        f3 = t2[61] | 0;
                        t2[r3 + 16 >> 2] = f3;
                        s2[r3 + 24 >> 0] = 1;
                        t2[61] = f3 + -2;
                        break e;
                      }
                      case 41: {
                        i2[379] = (i2[379] | 0) + -1 << 16 >> 16;
                        f3 = t2[51] | 0;
                        t2[f3 + 4 >> 2] = e3;
                        t2[f3 + 12 >> 2] = (t2[61] | 0) + 2;
                        s2[f3 + 24 >> 0] = 1;
                        i2[378] = (i2[378] | 0) + -1 << 16 >> 16;
                        break e;
                      }
                      default: {
                        t2[61] = (t2[61] | 0) + -2;
                        break e;
                      }
                    }
                  }
                  break;
                }
                case 46: {
                  t2[61] = (t2[61] | 0) + 2;
                  if (((w2(1) | 0) << 16 >> 16 == 109 ? (e3 = t2[61] | 0, (m(e3 + 2 | 0, 44, 6) | 0) == 0) : 0) ? (i2[t2[57] >> 1] | 0) != 46 : 0)
                    v(f3, f3, e3 + 8 | 0, 2);
                  break;
                }
                case 42:
                case 39:
                case 34: {
                  c3 = 16;
                  break;
                }
                case 123: {
                  e3 = t2[61] | 0;
                  if (i2[379] | 0) {
                    t2[61] = e3 + -2;
                    break e;
                  }
                  while (1) {
                    if (e3 >>> 0 >= (t2[62] | 0) >>> 0)
                      break;
                    e3 = w2(1) | 0;
                    if (!(N(e3) | 0)) {
                      if (e3 << 16 >> 16 == 125) {
                        c3 = 31;
                        break;
                      }
                    } else
                      d2(e3);
                    e3 = (t2[61] | 0) + 2 | 0;
                    t2[61] = e3;
                  }
                  if ((c3 | 0) == 31)
                    t2[61] = (t2[61] | 0) + 2;
                  w2(1) | 0;
                  e3 = t2[61] | 0;
                  if (m(e3, 50, 8) | 0) {
                    L();
                    break e;
                  }
                  t2[61] = e3 + 8;
                  e3 = w2(1) | 0;
                  if (N(e3) | 0) {
                    u3(f3, e3);
                    break e;
                  } else {
                    L();
                    break e;
                  }
                }
                default:
                  if ((t2[61] | 0) != (a3 | 0))
                    c3 = 16;
              }
            } while (0);
          do {
            if ((c3 | 0) == 16) {
              if (i2[379] | 0) {
                t2[61] = (t2[61] | 0) + -2;
                break;
              }
              e3 = t2[62] | 0;
              a3 = t2[61] | 0;
              while (1) {
                if (a3 >>> 0 >= e3 >>> 0) {
                  c3 = 23;
                  break;
                }
                r3 = i2[a3 >> 1] | 0;
                if (N(r3) | 0) {
                  c3 = 21;
                  break;
                }
                c3 = a3 + 2 | 0;
                t2[61] = c3;
                a3 = c3;
              }
              if ((c3 | 0) == 21) {
                u3(f3, r3);
                break;
              } else if ((c3 | 0) == 23) {
                L();
                break;
              }
            }
          } while (0);
          return;
        }
        function u3(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, s3 = 0;
          r3 = (t2[61] | 0) + 2 | 0;
          switch (a3 << 16 >> 16) {
            case 39: {
              d2(39);
              s3 = 5;
              break;
            }
            case 34: {
              d2(34);
              s3 = 5;
              break;
            }
            default:
              L();
          }
          do {
            if ((s3 | 0) == 5) {
              v(e3, r3, t2[61] | 0, 1);
              t2[61] = (t2[61] | 0) + 2;
              s3 = (w2(0) | 0) << 16 >> 16 == 97;
              a3 = t2[61] | 0;
              if (s3 ? (m(a3 + 2 | 0, 58, 10) | 0) == 0 : 0) {
                t2[61] = a3 + 12;
                if ((w2(1) | 0) << 16 >> 16 != 123) {
                  t2[61] = a3;
                  break;
                }
                e3 = t2[61] | 0;
                r3 = e3;
                e:
                  while (1) {
                    t2[61] = r3 + 2;
                    r3 = w2(1) | 0;
                    switch (r3 << 16 >> 16) {
                      case 39: {
                        d2(39);
                        t2[61] = (t2[61] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      case 34: {
                        d2(34);
                        t2[61] = (t2[61] | 0) + 2;
                        r3 = w2(1) | 0;
                        break;
                      }
                      default:
                        r3 = E(r3) | 0;
                    }
                    if (r3 << 16 >> 16 != 58) {
                      s3 = 16;
                      break;
                    }
                    t2[61] = (t2[61] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 39: {
                        d2(39);
                        break;
                      }
                      case 34: {
                        d2(34);
                        break;
                      }
                      default: {
                        s3 = 20;
                        break e;
                      }
                    }
                    t2[61] = (t2[61] | 0) + 2;
                    switch ((w2(1) | 0) << 16 >> 16) {
                      case 125: {
                        s3 = 25;
                        break e;
                      }
                      case 44:
                        break;
                      default: {
                        s3 = 24;
                        break e;
                      }
                    }
                    t2[61] = (t2[61] | 0) + 2;
                    if ((w2(1) | 0) << 16 >> 16 == 125) {
                      s3 = 25;
                      break;
                    }
                    r3 = t2[61] | 0;
                  }
                if ((s3 | 0) == 16) {
                  t2[61] = a3;
                  break;
                } else if ((s3 | 0) == 20) {
                  t2[61] = a3;
                  break;
                } else if ((s3 | 0) == 24) {
                  t2[61] = a3;
                  break;
                } else if ((s3 | 0) == 25) {
                  s3 = t2[51] | 0;
                  t2[s3 + 16 >> 2] = e3;
                  t2[s3 + 12 >> 2] = (t2[61] | 0) + 2;
                  break;
                }
              }
              t2[61] = a3 + -2;
            }
          } while (0);
          return;
        }
        function o2(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (i2[e3 >> 1] | 0) {
                case 100:
                  switch (i2[e3 + -2 >> 1] | 0) {
                    case 105: {
                      e3 = S(e3 + -4 | 0, 68, 2) | 0;
                      break e;
                    }
                    case 108: {
                      e3 = S(e3 + -4 | 0, 72, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                case 101: {
                  switch (i2[e3 + -2 >> 1] | 0) {
                    case 115:
                      break;
                    case 116: {
                      e3 = S(e3 + -4 | 0, 78, 4) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                  switch (i2[e3 + -4 >> 1] | 0) {
                    case 108: {
                      e3 = O(e3 + -6 | 0, 101) | 0;
                      break e;
                    }
                    case 97: {
                      e3 = O(e3 + -6 | 0, 99) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                }
                case 102: {
                  if ((i2[e3 + -2 >> 1] | 0) == 111 ? (i2[e3 + -4 >> 1] | 0) == 101 : 0)
                    switch (i2[e3 + -6 >> 1] | 0) {
                      case 99: {
                        e3 = S(e3 + -8 | 0, 86, 6) | 0;
                        break e;
                      }
                      case 112: {
                        e3 = S(e3 + -8 | 0, 98, 2) | 0;
                        break e;
                      }
                      default: {
                        e3 = 0;
                        break e;
                      }
                    }
                  else
                    e3 = 0;
                  break;
                }
                case 110: {
                  e3 = e3 + -2 | 0;
                  if (O(e3, 105) | 0)
                    e3 = 1;
                  else
                    e3 = S(e3, 102, 5) | 0;
                  break;
                }
                case 111: {
                  e3 = O(e3 + -2 | 0, 100) | 0;
                  break;
                }
                case 114: {
                  e3 = S(e3 + -2 | 0, 112, 7) | 0;
                  break;
                }
                case 116: {
                  e3 = S(e3 + -2 | 0, 126, 4) | 0;
                  break;
                }
                case 119:
                  switch (i2[e3 + -2 >> 1] | 0) {
                    case 101: {
                      e3 = O(e3 + -4 | 0, 110) | 0;
                      break e;
                    }
                    case 111: {
                      e3 = S(e3 + -4 | 0, 134, 3) | 0;
                      break e;
                    }
                    default: {
                      e3 = 0;
                      break e;
                    }
                  }
                default:
                  e3 = 0;
              }
            } while (0);
          return e3 | 0;
        }
        function h3() {
          var e3 = 0, a3 = 0, r3 = 0;
          a3 = t2[62] | 0;
          r3 = t2[61] | 0;
          e:
            while (1) {
              e3 = r3 + 2 | 0;
              if (r3 >>> 0 >= a3 >>> 0) {
                a3 = 8;
                break;
              }
              switch (i2[e3 >> 1] | 0) {
                case 96: {
                  a3 = 9;
                  break e;
                }
                case 36: {
                  if ((i2[r3 + 4 >> 1] | 0) == 123) {
                    a3 = 6;
                    break e;
                  }
                  break;
                }
                case 92: {
                  e3 = r3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              r3 = e3;
            }
          if ((a3 | 0) == 6) {
            t2[61] = r3 + 4;
            e3 = i2[380] | 0;
            a3 = t2[58] | 0;
            r3 = i2[377] | 0;
            i2[377] = r3 + 1 << 16 >> 16;
            i2[a3 + ((r3 & 65535) << 1) >> 1] = e3;
            r3 = (i2[379] | 0) + 1 << 16 >> 16;
            i2[379] = r3;
            i2[380] = r3;
          } else if ((a3 | 0) == 8) {
            t2[61] = e3;
            L();
          } else if ((a3 | 0) == 9)
            t2[61] = e3;
          return;
        }
        function w2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, s3 = 0;
          r3 = t2[61] | 0;
          e:
            do {
              a3 = i2[r3 >> 1] | 0;
              a:
                do {
                  if (a3 << 16 >> 16 != 47)
                    if (e3)
                      if (M(a3) | 0)
                        break;
                      else
                        break e;
                    else if (z(a3) | 0)
                      break;
                    else
                      break e;
                  else
                    switch (i2[r3 + 2 >> 1] | 0) {
                      case 47: {
                        j();
                        break a;
                      }
                      case 42: {
                        y(e3);
                        break a;
                      }
                      default: {
                        a3 = 47;
                        break e;
                      }
                    }
                } while (0);
              s3 = t2[61] | 0;
              r3 = s3 + 2 | 0;
              t2[61] = r3;
            } while (s3 >>> 0 < (t2[62] | 0) >>> 0);
          return a3 | 0;
        }
        function d2(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, s3 = 0, c3 = 0;
          c3 = t2[62] | 0;
          a3 = t2[61] | 0;
          while (1) {
            s3 = a3 + 2 | 0;
            if (a3 >>> 0 >= c3 >>> 0) {
              a3 = 9;
              break;
            }
            r3 = i2[s3 >> 1] | 0;
            if (r3 << 16 >> 16 == e3 << 16 >> 16) {
              a3 = 10;
              break;
            }
            if (r3 << 16 >> 16 == 92) {
              r3 = a3 + 4 | 0;
              if ((i2[r3 >> 1] | 0) == 13) {
                a3 = a3 + 6 | 0;
                a3 = (i2[a3 >> 1] | 0) == 10 ? a3 : r3;
              } else
                a3 = r3;
            } else if (T(r3) | 0) {
              a3 = 9;
              break;
            } else
              a3 = s3;
          }
          if ((a3 | 0) == 9) {
            t2[61] = s3;
            L();
          } else if ((a3 | 0) == 10)
            t2[61] = s3;
          return;
        }
        function v(e3, a3, r3, i3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          i3 = i3 | 0;
          var c3 = 0, f3 = 0;
          c3 = t2[55] | 0;
          t2[55] = c3 + 32;
          f3 = t2[51] | 0;
          t2[((f3 | 0) == 0 ? 188 : f3 + 28 | 0) >> 2] = c3;
          t2[52] = f3;
          t2[51] = c3;
          t2[c3 + 8 >> 2] = e3;
          if (2 == (i3 | 0))
            e3 = r3;
          else
            e3 = 1 == (i3 | 0) ? r3 + 2 | 0 : 0;
          t2[c3 + 12 >> 2] = e3;
          t2[c3 >> 2] = a3;
          t2[c3 + 4 >> 2] = r3;
          t2[c3 + 16 >> 2] = 0;
          t2[c3 + 20 >> 2] = i3;
          s2[c3 + 24 >> 0] = 1 == (i3 | 0) & 1;
          t2[c3 + 28 >> 2] = 0;
          return;
        }
        function A() {
          var e3 = 0, a3 = 0, r3 = 0;
          r3 = t2[62] | 0;
          a3 = t2[61] | 0;
          e:
            while (1) {
              e3 = a3 + 2 | 0;
              if (a3 >>> 0 >= r3 >>> 0) {
                a3 = 6;
                break;
              }
              switch (i2[e3 >> 1] | 0) {
                case 13:
                case 10: {
                  a3 = 6;
                  break e;
                }
                case 93: {
                  a3 = 7;
                  break e;
                }
                case 92: {
                  e3 = a3 + 4 | 0;
                  break;
                }
                default: {
                }
              }
              a3 = e3;
            }
          if ((a3 | 0) == 6) {
            t2[61] = e3;
            L();
            e3 = 0;
          } else if ((a3 | 0) == 7) {
            t2[61] = e3;
            e3 = 93;
          }
          return e3 | 0;
        }
        function C(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, s3 = 0;
          r3 = t2[61] | 0;
          s3 = i2[r3 >> 1] | 0;
          if (s3 << 16 >> 16 == 97) {
            t2[61] = r3 + 4;
            r3 = w2(1) | 0;
            e3 = t2[61] | 0;
            if (N(r3) | 0) {
              d2(r3);
              a3 = (t2[61] | 0) + 2 | 0;
              t2[61] = a3;
            } else {
              E(r3) | 0;
              a3 = t2[61] | 0;
            }
            s3 = w2(1) | 0;
            r3 = t2[61] | 0;
          }
          if ((r3 | 0) != (e3 | 0))
            B(e3, a3);
          return s3 | 0;
        }
        function g() {
          var e3 = 0, a3 = 0, r3 = 0;
          e:
            while (1) {
              e3 = t2[61] | 0;
              a3 = e3 + 2 | 0;
              t2[61] = a3;
              if (e3 >>> 0 >= (t2[62] | 0) >>> 0) {
                r3 = 7;
                break;
              }
              switch (i2[a3 >> 1] | 0) {
                case 13:
                case 10: {
                  r3 = 7;
                  break e;
                }
                case 47:
                  break e;
                case 91: {
                  A() | 0;
                  break;
                }
                case 92: {
                  t2[61] = e3 + 4;
                  break;
                }
                default: {
                }
              }
            }
          if ((r3 | 0) == 7)
            L();
          return;
        }
        function p2(e3) {
          e3 = e3 | 0;
          switch (i2[e3 >> 1] | 0) {
            case 62: {
              e3 = (i2[e3 + -2 >> 1] | 0) == 61;
              break;
            }
            case 41:
            case 59: {
              e3 = 1;
              break;
            }
            case 104: {
              e3 = S(e3 + -2 | 0, 160, 4) | 0;
              break;
            }
            case 121: {
              e3 = S(e3 + -2 | 0, 168, 6) | 0;
              break;
            }
            case 101: {
              e3 = S(e3 + -2 | 0, 180, 3) | 0;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function y(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, s3 = 0, c3 = 0, f3 = 0;
          c3 = (t2[61] | 0) + 2 | 0;
          t2[61] = c3;
          r3 = t2[62] | 0;
          while (1) {
            a3 = c3 + 2 | 0;
            if (c3 >>> 0 >= r3 >>> 0)
              break;
            s3 = i2[a3 >> 1] | 0;
            if (!e3 ? T(s3) | 0 : 0)
              break;
            if (s3 << 16 >> 16 == 42 ? (i2[c3 + 4 >> 1] | 0) == 47 : 0) {
              f3 = 8;
              break;
            }
            c3 = a3;
          }
          if ((f3 | 0) == 8) {
            t2[61] = a3;
            a3 = c3 + 4 | 0;
          }
          t2[61] = a3;
          return;
        }
        function m(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var i3 = 0, t3 = 0;
          e:
            do {
              if (!r3)
                e3 = 0;
              else {
                while (1) {
                  i3 = s2[e3 >> 0] | 0;
                  t3 = s2[a3 >> 0] | 0;
                  if (i3 << 24 >> 24 != t3 << 24 >> 24)
                    break;
                  r3 = r3 + -1 | 0;
                  if (!r3) {
                    e3 = 0;
                    break e;
                  } else {
                    e3 = e3 + 1 | 0;
                    a3 = a3 + 1 | 0;
                  }
                }
                e3 = (i3 & 255) - (t3 & 255) | 0;
              }
            } while (0);
          return e3 | 0;
        }
        function I(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33: {
                  e3 = 1;
                  break;
                }
                default:
                  if ((e3 & -8) << 16 >> 16 == 40 | (e3 + -58 & 65535) < 6)
                    e3 = 1;
                  else {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 93:
                      case 94: {
                        e3 = 1;
                        break e;
                      }
                      default: {
                      }
                    }
                    e3 = (e3 + -123 & 65535) < 4;
                  }
              }
            } while (0);
          return e3 | 0;
        }
        function U(e3) {
          e3 = e3 | 0;
          e:
            do {
              switch (e3 << 16 >> 16) {
                case 38:
                case 37:
                case 33:
                  break;
                default:
                  if (!((e3 + -58 & 65535) < 6 | (e3 + -40 & 65535) < 7 & e3 << 16 >> 16 != 41)) {
                    switch (e3 << 16 >> 16) {
                      case 91:
                      case 94:
                        break e;
                      default: {
                      }
                    }
                    return e3 << 16 >> 16 != 125 & (e3 + -123 & 65535) < 4 | 0;
                  }
              }
            } while (0);
          return 1;
        }
        function x(e3) {
          e3 = e3 | 0;
          var a3 = 0, r3 = 0, s3 = 0, c3 = 0;
          r3 = n2;
          n2 = n2 + 16 | 0;
          s3 = r3;
          t2[s3 >> 2] = 0;
          t2[54] = e3;
          a3 = t2[3] | 0;
          c3 = a3 + (e3 << 1) | 0;
          e3 = c3 + 2 | 0;
          i2[c3 >> 1] = 0;
          t2[s3 >> 2] = e3;
          t2[55] = e3;
          t2[47] = 0;
          t2[51] = 0;
          t2[49] = 0;
          t2[48] = 0;
          t2[53] = 0;
          t2[50] = 0;
          n2 = r3;
          return a3 | 0;
        }
        function S(e3, a3, r3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          r3 = r3 | 0;
          var s3 = 0, c3 = 0;
          s3 = e3 + (0 - r3 << 1) | 0;
          c3 = s3 + 2 | 0;
          e3 = t2[3] | 0;
          if (c3 >>> 0 >= e3 >>> 0 ? (m(c3, a3, r3 << 1) | 0) == 0 : 0)
            if ((c3 | 0) == (e3 | 0))
              e3 = 1;
            else
              e3 = $(i2[s3 >> 1] | 0) | 0;
          else
            e3 = 0;
          return e3 | 0;
        }
        function O(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0;
          r3 = t2[3] | 0;
          if (r3 >>> 0 <= e3 >>> 0 ? (i2[e3 >> 1] | 0) == a3 << 16 >> 16 : 0)
            if ((r3 | 0) == (e3 | 0))
              r3 = 1;
            else
              r3 = $(i2[e3 + -2 >> 1] | 0) | 0;
          else
            r3 = 0;
          return r3 | 0;
        }
        function $(e3) {
          e3 = e3 | 0;
          e:
            do {
              if ((e3 + -9 & 65535) < 5)
                e3 = 1;
              else {
                switch (e3 << 16 >> 16) {
                  case 32:
                  case 160: {
                    e3 = 1;
                    break e;
                  }
                  default: {
                  }
                }
                e3 = e3 << 16 >> 16 != 46 & (I(e3) | 0);
              }
            } while (0);
          return e3 | 0;
        }
        function j() {
          var e3 = 0, a3 = 0, r3 = 0;
          e3 = t2[62] | 0;
          r3 = t2[61] | 0;
          e:
            while (1) {
              a3 = r3 + 2 | 0;
              if (r3 >>> 0 >= e3 >>> 0)
                break;
              switch (i2[a3 >> 1] | 0) {
                case 13:
                case 10:
                  break e;
                default:
                  r3 = a3;
              }
            }
          t2[61] = a3;
          return;
        }
        function B(e3, a3) {
          e3 = e3 | 0;
          a3 = a3 | 0;
          var r3 = 0, s3 = 0;
          r3 = t2[55] | 0;
          t2[55] = r3 + 12;
          s3 = t2[53] | 0;
          t2[((s3 | 0) == 0 ? 192 : s3 + 8 | 0) >> 2] = r3;
          t2[53] = r3;
          t2[r3 >> 2] = e3;
          t2[r3 + 4 >> 2] = a3;
          t2[r3 + 8 >> 2] = 0;
          return;
        }
        function E(e3) {
          e3 = e3 | 0;
          while (1) {
            if (M(e3) | 0)
              break;
            if (I(e3) | 0)
              break;
            e3 = (t2[61] | 0) + 2 | 0;
            t2[61] = e3;
            e3 = i2[e3 >> 1] | 0;
            if (!(e3 << 16 >> 16)) {
              e3 = 0;
              break;
            }
          }
          return e3 | 0;
        }
        function P() {
          var e3 = 0;
          e3 = t2[(t2[49] | 0) + 20 >> 2] | 0;
          switch (e3 | 0) {
            case 1: {
              e3 = -1;
              break;
            }
            case 2: {
              e3 = -2;
              break;
            }
            default:
              e3 = e3 - (t2[3] | 0) >> 1;
          }
          return e3 | 0;
        }
        function q(e3) {
          e3 = e3 | 0;
          if (!(S(e3, 140, 5) | 0) ? !(S(e3, 150, 3) | 0) : 0)
            e3 = S(e3, 156, 2) | 0;
          else
            e3 = 1;
          return e3 | 0;
        }
        function z(e3) {
          e3 = e3 | 0;
          switch (e3 << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9: {
              e3 = 1;
              break;
            }
            default:
              e3 = 0;
          }
          return e3 | 0;
        }
        function D(e3) {
          e3 = e3 | 0;
          if ((t2[3] | 0) == (e3 | 0))
            e3 = 1;
          else
            e3 = $(i2[e3 + -2 >> 1] | 0) | 0;
          return e3 | 0;
        }
        function F() {
          var e3 = 0;
          e3 = t2[(t2[49] | 0) + 12 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function G() {
          var e3 = 0;
          e3 = t2[(t2[49] | 0) + 16 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function H() {
          var e3 = 0;
          e3 = t2[(t2[49] | 0) + 4 >> 2] | 0;
          if (!e3)
            e3 = -1;
          else
            e3 = e3 - (t2[3] | 0) >> 1;
          return e3 | 0;
        }
        function J() {
          var e3 = 0;
          e3 = t2[49] | 0;
          e3 = t2[((e3 | 0) == 0 ? 188 : e3 + 28 | 0) >> 2] | 0;
          t2[49] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function K() {
          var e3 = 0;
          e3 = t2[50] | 0;
          e3 = t2[((e3 | 0) == 0 ? 192 : e3 + 8 | 0) >> 2] | 0;
          t2[50] = e3;
          return (e3 | 0) != 0 | 0;
        }
        function L() {
          s2[762] = 1;
          t2[56] = (t2[61] | 0) - (t2[3] | 0) >> 1;
          t2[61] = (t2[62] | 0) + 2;
          return;
        }
        function M(e3) {
          e3 = e3 | 0;
          return (e3 | 128) << 16 >> 16 == 160 | (e3 + -9 & 65535) < 5 | 0;
        }
        function N(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 39 | e3 << 16 >> 16 == 34 | 0;
        }
        function Q() {
          return (t2[(t2[49] | 0) + 8 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function R() {
          return (t2[(t2[50] | 0) + 4 >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function T(e3) {
          e3 = e3 | 0;
          return e3 << 16 >> 16 == 13 | e3 << 16 >> 16 == 10 | 0;
        }
        function V() {
          return (t2[t2[49] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function W() {
          return (t2[t2[50] >> 2] | 0) - (t2[3] | 0) >> 1 | 0;
        }
        function X() {
          return c2[(t2[49] | 0) + 24 >> 0] | 0 | 0;
        }
        function Y(e3) {
          e3 = e3 | 0;
          t2[3] = e3;
          return;
        }
        function Z() {
          return (s2[763] | 0) != 0 | 0;
        }
        function _() {
          return t2[56] | 0;
        }
        function ee(e3) {
          e3 = e3 | 0;
          n2 = e3 + 992 + 15 & -16;
          return 992;
        }
        return { su: ee, ai: G, e: _, ee: R, es: W, f: Z, id: P, ie: H, ip: X, is: V, p: b2, re: K, ri: J, sa: x, se: F, ses: Y, ss: Q };
      }("undefined" != typeof self ? self : self, {}, a), r = e.su(s - (2 << 17));
    }
    const h2 = c$1.length + 1;
    e.ses(r), e.sa(h2 - 1), i(c$1, new Uint16Array(a, r, h2)), e.p() || (n = e.e(), o());
    const w = [], d = [];
    for (; e.ri(); ) {
      const a2 = e.is(), r2 = e.ie(), s2 = e.ai(), i2 = e.id(), t2 = e.ss(), f2 = e.se();
      let n2;
      e.ip() && (n2 = b(-1 === i2 ? a2 : a2 + 1, c$1.charCodeAt(-1 === i2 ? a2 - 1 : a2))), w.push({ n: n2, s: a2, e: r2, ss: t2, se: f2, d: i2, a: s2 });
    }
    for (; e.re(); ) {
      const a2 = e.es(), r2 = c$1.charCodeAt(a2);
      d.push(34 === r2 || 39 === r2 ? b(a2 + 1, r2) : c$1.slice(e.es(), e.ee()));
    }
    return [w, d, !!e.f()];
  }
  function b(e2, a2) {
    n = e2;
    let r2 = "", s2 = n;
    for (; ; ) {
      n >= c$1.length && o();
      const e3 = c$1.charCodeAt(n);
      if (e3 === a2)
        break;
      92 === e3 ? (r2 += c$1.slice(s2, n), r2 += k(), s2 = n) : (8232 === e3 || 8233 === e3 || u(e3) && o(), ++n);
    }
    return r2 += c$1.slice(s2, n++), r2;
  }
  function k() {
    let e2 = c$1.charCodeAt(++n);
    switch (++n, e2) {
      case 110:
        return "\n";
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(l(2));
      case 117:
        return function() {
          let e3;
          123 === c$1.charCodeAt(n) ? (++n, e3 = l(c$1.indexOf("}", n) - n), ++n, e3 > 1114111 && o()) : e3 = l(4);
          return e3 <= 65535 ? String.fromCharCode(e3) : (e3 -= 65536, String.fromCharCode(55296 + (e3 >> 10), 56320 + (1023 & e3)));
        }();
      case 116:
        return "	";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        10 === c$1.charCodeAt(n) && ++n;
      case 10:
        return "";
      case 56:
      case 57:
        o();
      default:
        if (e2 >= 48 && e2 <= 55) {
          let a2 = c$1.substr(n - 1, 3).match(/^[0-7]+/)[0], r2 = parseInt(a2, 8);
          return r2 > 255 && (a2 = a2.slice(0, -1), r2 = parseInt(a2, 8)), n += a2.length - 1, e2 = c$1.charCodeAt(n), "0" === a2 && 56 !== e2 && 57 !== e2 || o(), String.fromCharCode(r2);
        }
        return u(e2) ? "" : String.fromCharCode(e2);
    }
  }
  function l(e2) {
    const a2 = n;
    let r2 = 0, s2 = 0;
    for (let a3 = 0; a3 < e2; ++a3, ++n) {
      let e3, i2 = c$1.charCodeAt(n);
      if (95 !== i2) {
        if (i2 >= 97)
          e3 = i2 - 97 + 10;
        else if (i2 >= 65)
          e3 = i2 - 65 + 10;
        else {
          if (!(i2 >= 48 && i2 <= 57))
            break;
          e3 = i2 - 48;
        }
        if (e3 >= 16)
          break;
        s2 = i2, r2 = 16 * r2 + e3;
      } else
        95 !== s2 && 0 !== a3 || o(), s2 = i2;
    }
    return 95 !== s2 && n - a2 === e2 || o(), r2;
  }
  function u(e2) {
    return 13 === e2 || 10 === e2;
  }
  function o() {
    throw Object.assign(Error(`Parse error ${f}:${c$1.slice(0, n).split("\n").length}:${n - c$1.lastIndexOf("\n", n - 1)}`), { idx: n });
  }
  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      b: !urlResolved && !isURL(id)
    };
  }
  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve);
    if (result && result.then)
      result = await result;
    return result ? { r: result, b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id) } : _resolve(id, parentUrl);
  } : _resolve;
  async function importShim2(id, ...args) {
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== "string")
      parentUrl = baseUrl;
    await initPromise;
    if (importHook)
      await importHook(id, typeof args[1] !== "string" ? args[1] : {}, parentUrl);
    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument)
        processImportMaps();
      if (!shimMode)
        acceptingImportMaps = false;
    }
    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, { credentials: "same-origin" });
  }
  self.importShim = importShim2;
  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }
  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }
  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };
  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }
  importShim2.resolve = resolveSync;
  importShim2.getImportMap = () => JSON.parse(JSON.stringify(importMap));
  importShim2.addImportMap = (importMapIn) => {
    if (!shimMode)
      throw new Error("Unsupported in polyfill mode.");
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };
  const registry = importShim2._r = {};
  async function loadAll(load, seen) {
    if (load.b || seen[load.u])
      return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map((dep) => loadAll(dep, seen)));
    if (!load.n)
      load.n = load.d.some((dep) => dep.n);
  }
  let importMap = { imports: {}, scopes: {} };
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && true;
    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || ((type) => type === "classic" || type === "module");
        HTMLScriptElement.supports = (type) => type === "importmap" || supports(type);
      }
      if (shimMode || !baselinePassthrough) {
        new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type !== "childList")
              continue;
            for (const node of mutation.addedNodes) {
              if (node.tagName === "SCRIPT") {
                if (node.type === (shimMode ? "module-shim" : "module"))
                  processScript(node);
                if (node.type === (shimMode ? "importmap-shim" : "importmap"))
                  processImportMap(node);
              } else if (node.tagName === "LINK" && node.rel === (shimMode ? "modulepreload-shim" : "modulepreload"))
                processPreload(node);
            }
          }
        }).observe(document, { childList: true, subtree: true });
        processImportMaps();
        processScriptsAndPreloads();
        if (document.readyState === "complete") {
          readyStateCompleteCheck();
        } else {
          async function readyListener() {
            await initPromise;
            processImportMaps();
            if (document.readyState === "complete") {
              readyStateCompleteCheck();
              document.removeEventListener("readystatechange", readyListener);
            }
          }
          document.addEventListener("readystatechange", readyListener);
        }
      }
    }
    return void 0;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;
  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise2) {
    if (!shimMode)
      acceptingImportMaps = false;
    await importMapPromise;
    if (importHook)
      await importHook(url, typeof fetchOpts !== "string" ? fetchOpts : {}, "");
    if (!shimMode && baselinePassthrough) {
      if (nativelyLoaded)
        return null;
      await lastStaticLoadPromise2;
      return dynamicImport(source ? createBlob(source) : url, { errUrl: url || source });
    }
    const load = getOrCreateLoad(url, fetchOpts, null, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = void 0;
    resolveDeps(load, seen);
    await lastStaticLoadPromise2;
    if (source && !shimMode && !load.n && true) {
      const module2 = await dynamicImport(createBlob(source), { errUrl: source });
      if (revokeBlobURLs)
        revokeObjectURLs(Object.keys(seen));
      return module2;
    }
    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }
    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, { errUrl: load.u });
    if (load.s)
      (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs)
      revokeObjectURLs(Object.keys(seen));
    return module;
  }
  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);
    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength)
        return;
      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load)
          URL.revokeObjectURL(load.b);
      }
      batch++;
      schedule(cleanup);
    }
  }
  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }
  let lastLoad;
  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u])
      return;
    seen[load.u] = 0;
    for (const dep of load.d)
      resolveDeps(dep, seen);
    const [imports] = load.a;
    const source = load.S;
    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : "";
    if (!imports.length) {
      resolvedSource += source;
    } else {
      let pushStringTo = function(originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }
        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      };
      let lastIndex = 0, depIndex = 0, dynamicImportEndStack = [];
      for (const { s: start, ss: statementStart, se: statementEnd, d: dynamicImportIndex } of imports) {
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++], blobUrl = depLoad.b, cycleShell = !blobUrl;
          if (cycleShell) {
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map((name) => name === "default" ? `d$_=m.default` : `${name}=m.${name}`).join(",")}}${depLoad.a[1].map((name) => name === "default" ? `let d$_;export{d$_ as default}` : `export let ${name}`).join(";")}
//# sourceURL=${depLoad.r}?cycle`);
            }
          }
          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`;
          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = void 0;
          }
          lastIndex = statementEnd;
        } else if (dynamicImportIndex === -2) {
          load.m = { url: load.r, resolve: metaResolve };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        } else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      }
      pushStringTo(source.length);
    }
    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL)
      resolvedSource += "\n//# sourceURL=" + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = void 0;
  }
  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g;
  let p = [];
  let c = 0;
  function pushFetchPool() {
    if (++c > 100)
      return new Promise((r2) => p.push(r2));
  }
  function popFetchPool() {
    c--;
    if (p.length)
      p.shift()();
  }
  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity)
      throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue)
      await poolQueue;
    try {
      var res = await fetchHook(url, fetchOpts);
    } catch (e2) {
      e2.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.
` + e2.message;
      throw e2;
    } finally {
      popFetchPool();
    }
    if (!res.ok)
      throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }
  async function fetchModule(url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get("content-type");
    if (jsContentType.test(contentType))
      return { r: res.url, s: await res.text(), t: "js" };
    else if (jsonContentType.test(contentType))
      return { r: res.url, s: `export default ${await res.text()}`, t: "json" };
    else if (cssContentType.test(contentType)) {
      return { r: res.url, s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = "", relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`, t: "css" };
    } else
      throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }
  function getOrCreateLoad(url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source)
      return load;
    load = {
      u: url,
      r: source ? url : void 0,
      f: void 0,
      S: void 0,
      L: void 0,
      a: void 0,
      d: void 0,
      b: void 0,
      s: void 0,
      n: false,
      t: null,
      m: null
    };
    if (registry[url]) {
      let i2 = 0;
      while (registry[load.u + ++i2])
        ;
      load.u += i2;
    }
    registry[load.u] = load;
    load.f = (async () => {
      if (!source) {
        let t2;
        ({ r: load.r, s: source, t: t2 } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));
        if (t2 && !shimMode) {
          if (t2 === "css" && !cssModulesEnabled || t2 === "json" && !jsonModulesEnabled)
            throw Error(`${t2}-modules require <script type="esms-options">{ "polyfillEnable": ["${t2}-modules"] }<${""}/script>`);
          if (t2 === "css" && !supportsCssAssertions || t2 === "json" && !supportsJsonAssertions)
            load.n = true;
        }
      }
      try {
        load.a = parse(source, load.u);
      } catch (e2) {
        throwError(e2);
        load.a = [[], [], false];
      }
      load.S = source;
      return load;
    })();
    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({ n: n2, d }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta)
          load.n = true;
        if (d !== -1 || !n2)
          return;
        const { r: r2, b: b2 } = await resolve(n2, load.r || load.u);
        if (b2 && (!supportsImportMaps || importMapSrcOrLazy))
          load.n = true;
        if (skip2 && skip2.test(r2))
          return { b: r2 };
        if (childFetchOpts.integrity)
          childFetchOpts = Object.assign({}, childFetchOpts, { integrity: void 0 });
        return getOrCreateLoad(r2, childFetchOpts, load.r).f;
      }))).filter((l2) => l2);
    });
    return load;
  }
  function processScriptsAndPreloads() {
    for (const script of document.querySelectorAll(shimMode ? "script[type=module-shim]" : "script[type=module]"))
      processScript(script);
    for (const link of document.querySelectorAll(shimMode ? "link[rel=modulepreload-shim]" : "link[rel=modulepreload]"))
      processPreload(link);
  }
  function processImportMaps() {
    for (const script of document.querySelectorAll(shimMode ? 'script[type="importmap-shim"]' : 'script[type="importmap"]'))
      processImportMap(script);
  }
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;
  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("DOMContentLoaded"));
  }
  if (hasDocument) {
    document.addEventListener("DOMContentLoaded", async () => {
      await initPromise;
      domContentLoadedCheck();
      if (shimMode || !baselinePassthrough) {
        processImportMaps();
        processScriptsAndPreloads();
      }
    });
  }
  let readyStateCompleteCnt = 1;
  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers)
      document.dispatchEvent(new Event("readystatechange"));
  }
  function processImportMap(script) {
    if (script.ep)
      return;
    if (!script.src && !script.innerHTML)
      return;
    script.ep = true;
    if (script.src) {
      if (!shimMode)
        return;
      setImportMapSrcOrLazy();
    }
    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch(throwError);
      if (!shimMode)
        acceptingImportMaps = false;
    }
  }
  function processScript(script) {
    if (script.ep)
      return;
    if (script.getAttribute("noshim") !== null)
      return;
    if (!script.src && !script.innerHTML)
      return;
    script.ep = true;
    const isBlockingReadyScript = script.getAttribute("async") === null && readyStateCompleteCnt > 0;
    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript)
      readyStateCompleteCnt++;
    if (isDomContentLoadedScript)
      domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (isBlockingReadyScript)
      lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript)
      loadPromise.then(domContentLoadedCheck);
  }
  const fetchCache = {};
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    if (fetchCache[link.href])
      return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();

// js/starter.tsx
Object.assign(window, {});
var orig = location.origin.includes("localhost") ? "." : location.origin;
var initShims = async (assets) => location.origin.includes("localhost") ? importShim.addImportMap({
  "imports": {
    "@emotion/react": orig + "/" + assets["emotion.mjs"],
    "framer-motion": "./framer-motion",
    "react": orig + "/" + assets["react.mjs"],
    "react-dom": orig + "/" + assets["react.mjs"],
    "react-dom/client": orig + "/" + assets["react.mjs"],
    "react-dom/server": orig + "/" + assets["react.mjs"],
    "react/jsx-runtime": orig + "/" + assets["react.mjs"]
  }
}) : importShim.addImportMap({
  "imports": {
    "framer-motion": location.origin + "/" + assets["framer-motion.mjs"],
    "@emotion/react": location.origin + "/" + assets["emotion.mjs"],
    "react": location.origin + "/" + assets["react.mjs"],
    "react-dom": location.origin + "/" + assets["react.mjs"],
    "react-dom/client": location.origin + "/" + assets["react.mjs"],
    "react-dom/server": location.origin + "/" + assets["react.mjs"],
    "react/jsx-runtime": location.origin + "/" + assets["react.mjs"]
  }
});
var App = () => jsx(Fragment, null);
var apps = {};
var AutoUpdateApp = ({ hash: hash2 }) => {
  const result = md5(mST().transpiled);
  if (apps[result]) {
    App = apps[result];
  }
  return jsx(App, {
    key: hash2
  });
};
async function appFactory(transpiled) {
  const result = md5(transpiled);
  if (!apps[result]) {
    apps[result] = (await importShim(createJsBlob(transpiled))).default;
  }
  App = apps[result];
  return apps[result];
}
function createJsBlob(code) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript"
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// js/ws.ts
var import_lodash = __toESM(require_lodash(), 1);
var webRtcArray = [];
var user = (self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID() || v4()).slice(0, 8);
var rtcConns = {};
var bc;
var codeSpace;
var address;
var wsLastHashCode = 0;
var webRTCLastSeenHashCode = 0;
var lastSeenTimestamp = 0;
var lastSeenNow = 0;
var ws = null;
var sendWS;
var rejoined = false;
var sendChannel = {
  webRtcArray,
  rtcConns,
  send: (data) => {
    const target = data.target;
    const messageString = JSON.stringify({
      ...data,
      name: data.name || user
    });
    webRtcArray.map((ch) => {
      try {
        console.log("WebRtc send", data, ch);
        if (ch.readyState !== "open")
          return;
        if (!target || ch.target === target && !ignoreUsers.includes(ch.target)) {
          ch.send(messageString);
        }
      } catch (e) {
        console.error("Error in broadcasting event", { e });
      }
    });
  }
};
async function quickStart(codeSpace2) {
  const { renderPreviewWindow } = await import("./TBIJTDDP.mjs");
  return renderPreviewWindow(codeSpace2);
}
var run = async (startState) => {
  codeSpace = startState.codeSpace;
  address = startState.address;
  const { assets } = startState;
  startSession(codeSpace, {
    name: user,
    state: startState.mST
  }, "");
  initShims(assets);
  quickStart(codeSpace);
  join2();
  bc = new BroadcastChannel("spike.land");
  bc.onmessage = async (event) => {
    if (event.data.ignoreUser && event.data.ignoreUser === user)
      return;
    console.log({ event });
    if (event.data.codeSpace === codeSpace && event.data.address && !address) {
      ws?.send(JSON.stringify({ codeSpace, address: event.data.address }));
    }
    if (event.data.ignoreUser) {
      !ignoreUsers.includes(event.data.ignoreUser) && ignoreUsers.push(event.data.ignoreUser);
    }
    if (event.data.codeSpace === codeSpace && event.data.sess.code !== mST().code) {
      const messageData = await makePatch(event.data.sess);
      await applyPatch2(messageData);
    }
  };
};
(async () => {
  if (navigator && navigator?.serviceWorker) {
    navigator.serviceWorker.register("/sw.js", {
      scope: "/"
    });
    const current = await navigator.serviceWorker.ready;
    await sw();
    Promise.all((await navigator.serviceWorker.getRegistrations()).map((sw2) => {
      if (current !== sw2)
        sw2.unregister();
    }));
  }
})();
var intervalHandler = null;
async function rejoin() {
  if (!rejoined || ws === null) {
    ws = null;
    const newWs = await join2();
    return newWs;
  }
  return ws;
}
var ignoreUsers = [];
async function saveCode(sess) {
  if (sess.i <= mST().i)
    return;
  console.log("creating a patch");
  const messageData = await makePatch(sess);
  console.log("applying the patch");
  await applyPatch2(messageData);
  console.log("done");
  if (sess.i !== mST().i)
    return;
  bc.postMessage({ ignoreUser: user, sess, codeSpace, address, messageData });
  try {
    (async () => {
      if (Object.keys(rtcConns).length == 0)
        return;
      try {
        const message = webRTCLastSeenHashCode ? await makePatchFrom(webRTCLastSeenHashCode, sess) : await makePatch(sess);
        if (message && message.patch) {
          console.log("sendRTC");
          sendChannel.send(message);
        }
      } catch (e) {
        console.error("Error sending RTC...", { e });
      }
    })();
  } catch (e) {
    console.log("Error 1");
  }
  try {
    (async () => {
      if (ws) {
        console.log({ wsLastHashCode });
        const message = await makePatchFrom(wsLastHashCode, sess);
        if (!message)
          return;
        if (message.newHash !== hashCode3()) {
          console.error("NEW hash is not even hashCode", hashCode3());
          return;
        }
        const messageString = JSON.stringify({ ...message, name: user });
        sendWS(messageString);
      } else {
        rejoined = false;
        await rejoin();
      }
    })();
  } catch (e) {
    console.error("error 2", { e });
  }
}
async function join2() {
  if (ws !== null)
    return ws;
  rejoined = true;
  console.log("WS connect!");
  if (location.host.includes("localhost"))
    return;
  const wsConnection = new WebSocket(`wss://${location.host}/live/` + codeSpace + "/websocket");
  rejoined = false;
  wsConnection.addEventListener("open", () => {
    console.log("NEW WS CONNECTION");
    ws = wsConnection;
    const mess = (data) => {
      try {
        ws && ws?.send && ws?.send(data);
      } catch (e) {
        ws = null;
        rejoined = false;
        rejoin();
      }
    };
    sendWS = (0, import_lodash.throttle)(mess, 500, {
      leading: true,
      trailing: true
    });
    ws.addEventListener("message", (message) => processWsMessage(message, "ws"));
    if (intervalHandler) {
      clearInterval(intervalHandler);
    }
    intervalHandler = setInterval(() => {
      const now = Date.now();
      const diff2 = now - lastSeenNow;
      if (diff2 > 4e4) {
        try {
          if (wsConnection.readyState === wsConnection.OPEN) {
            return wsConnection?.send(JSON.stringify({
              name: user,
              timestamp: lastSeenTimestamp + diff2
            }));
          }
          rejoined = false;
          rejoin();
        } catch {
          rejoined = false;
          rejoin();
        }
      }
    }, 3e4);
    wsConnection.send(JSON.stringify({ name: user }));
    return wsConnection;
  });
  return wsConnection;
}
var h = {};
async function processWsMessage(event, source) {
  if (ws == null)
    return;
  lastSeenNow = Date.now();
  const data = JSON.parse(event.data);
  console.log("ws", data.name, data.oldHash, data.newHash);
  if (source === "ws" && data.timestamp) {
    lastSeenNow = Date.now();
    lastSeenTimestamp = data.timestamp;
  }
  if (source === "ws" && (data.hashCode || data.newHash)) {
    wsLastHashCode = data.hashCode || data.newHash;
  }
  if (source === "rtc" && data.hashCode || data.newHash) {
    webRTCLastSeenHashCode = data.hashCode || data.newHash;
  }
  if (ignoreUsers.includes(data.name))
    return;
  if (data.newHash === hashCode3())
    return;
  if (data.oldHash && data.newHash) {
    if (h[data.oldHash] && h[data.oldHash] === data.newHash)
      return;
    h[data.oldHash] = data.newHash;
  }
  if (data.newHash === hashCode3())
    return;
  (async () => {
    try {
      if (data.type === "new-ice-candidate") {
        await handleNewICECandidateMessage(data.candidate, data.name);
        return;
      }
      if (data.type === "offer") {
        await handleChatOffer(data.offer, data.name);
        return;
      }
      if (data.type === "answer") {
        await handleChatAnswerMessage(data.answer, data.name);
        return;
      }
      if (data.name && data.name !== user && !rtcConns[data.name]) {
        await createPeerConnection(data.name);
        return;
      }
    } catch (error) {
      console.log({ e: error });
      log_error("Error with p2p");
    }
  })();
  if (data.patch && data.name !== user) {
    if (data.newHash === hashCode3()) {
      return;
    }
    await applyPatch2(data);
    if (data.newHash === hashCode3()) {
      if (sendChannel) {
        sendChannel.send({ hashCode: data.newHash });
      }
      return;
    } else {
      console.log("error -sending on sendChannel");
    }
    return;
  }
  if (data.name === user) {
    return;
  }
  function createPeerConnection(target) {
    log(`Setting up a connection with ${target}`);
    if (rtcConns[target]) {
      log(`Aborting, since we have connection with this ${target}`);
      return;
    }
    rtcConns[target] = new RTCPeerConnection(rcpOptions);
    rtcConns[target].onicecandidate = (event2) => {
      if (event2.candidate) {
        log("*** Outgoing ICE candidate: " + event2.candidate);
        ws?.send(JSON.stringify({
          type: "new-ice-candidate",
          target,
          name: user,
          candidate: event2.candidate.toJSON()
        }));
      }
    };
    rtcConns[target].oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    rtcConns[target].onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    rtcConns[target].onsignalingstatechange = () => {
      log("*** rtcConns[target].signalingState  changed to: " + rtcConns[target].signalingState);
      switch (rtcConns[target].signalingState) {
        case "closed":
          break;
      }
    };
    rtcConns[target].onnegotiationneeded = handleNegotiationNeededEvent;
    rtcConns[target].ontrack = (ev) => console.log(ev);
    rtcConns[target].ondatachannel = (event2) => {
      console.log("Receive Channel Callback");
      const rtc2 = event2.channel;
      rtc2.binaryType = "arraybuffer";
      rtc2.addEventListener("close", onReceiveChannelClosed);
      rtc2.addEventListener("message", (message) => processWsMessage(message, "rtc"));
      const rtcWithTarget = Object.assign(rtc2, { target });
      webRtcArray.push(rtcWithTarget);
    };
    const dataChannelOptions = {
      ordered: true,
      reliable: true,
      maxPacketLifeTime: 3e3
    };
    const rtc = Object.assign(rtcConns[target].createDataChannel(target, dataChannelOptions), { target });
    rtc.binaryType = "arraybuffer";
    rtc.addEventListener("message", (message) => {
      console.log("***********RTC***", { msg: message });
      const data2 = JSON.parse(message.data);
      if (data2 && data2.hashCode) {
        webRTCLastSeenHashCode = data2.hashCode;
      }
      if (data2 && data2.newHash) {
        webRTCLastSeenHashCode = data2.newHash;
      }
      return processWsMessage(message, "rtc");
    });
    rtc.addEventListener("error", (error) => {
      console.log("xxxxxx-  Data Channel Error:", error);
    });
    rtc.addEventListener("open", () => {
      console.log("@@@@@@@@RTC IS OPEN&&&&&&&&");
      webRtcArray.push(rtc);
    });
    rtc.addEventListener("close", () => {
      console.log("xxxxxxxx- The Data Channel is Closed");
    });
    return rtcConns[target];
    function onReceiveChannelClosed() {
      console.log("Receive channel is closed");
      rtcConns[target].close();
      delete rtcConns[target];
      console.log("Closed remote peer connection");
    }
    async function handleNegotiationNeededEvent() {
      log("*** Negotiation needed");
      try {
        log("---> Creating offer");
        const offer = await rtcConns[target].createOffer();
        if (rtcConns[target].signalingState != "stable") {
          log("The connection isn't stable yet; postponing...");
          return;
        }
        log("---> Setting local description to the offer");
        await rtcConns[target].setLocalDescription(offer);
        log("---> Sending the offer to the remote peer");
        ws?.send(JSON.stringify({
          target,
          name: user,
          type: "offer",
          offer: rtcConns[target].localDescription
        }));
      } catch {
        log("*** The following error occurred while handling the negotiationneeded event:");
      }
    }
    function handleICEConnectionStateChangeEvent() {
      log("*** ICE connection state changed to " + rtcConns[target].iceConnectionState);
      switch (rtcConns[target].iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
          break;
      }
    }
    function handleICEGatheringStateChangeEvent() {
      log("*** rtcConns[target].iceGatheringState changed to: " + rtcConns[target].iceGatheringState);
    }
  }
  async function handleChatAnswerMessage(answer, target) {
    log("*** Call recipient has accepted our call");
    await rtcConns[target].setRemoteDescription(new RTCSessionDescription(answer)).catch(console.error);
  }
  async function handleChatOffer(offer, target) {
    if (!rtcConns[target])
      createPeerConnection(target);
    await rtcConns[target].setRemoteDescription(new RTCSessionDescription(offer));
    log("---> Creating and sending answer to caller");
    const answer = await rtcConns[target].createAnswer();
    await rtcConns[target].setLocalDescription(answer);
    ws?.send(JSON.stringify({
      target,
      name: user,
      type: "answer",
      answer
    }));
  }
}
function log(text) {
  const time = new Date();
  console.log("[" + time.toLocaleTimeString() + "] " + text);
}
function log_error(text) {
  const time = new Date();
  console.trace("[" + time.toLocaleTimeString() + "] " + text);
}
var rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`
  }))
};
rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302"
}];
async function handleNewICECandidateMessage(init, target) {
  log("*** Adding received ICE candidate: " + JSON.stringify(init));
  const candidate = new RTCIceCandidate(init);
  console.log(rtcConns[target]);
  await rtcConns[target].addIceCandidate(candidate);
}
async function sw() {
  try {
    navigator.serviceWorker.onmessage = async (event) => {
      const serviceWorker = event.source;
      if (serviceWorker == null)
        return;
      switch (event.data.method) {
        case "ipfs-message-port":
          console.log("Message port request");
          const { connect } = await import("./OZ6N6YBV.mjs");
          console.log("can connect trough", { connect });
          const channel = new MessageChannel();
          await connect(channel);
          console.log({ channel });
          return serviceWorker.postMessage({
            method: "ipfs-message-port",
            id: event.data.id,
            port: channel.port2
          }, { transfer: [channel.port2] });
      }
    };
    if (document.documentElement.dataset.viewer) {
      const load = async (path) => {
        const paths = path && path.split("/") || [];
        const protocol = paths[0] || "";
        switch (protocol) {
          case "ipfs":
          case "ipns": {
            document.body.innerHTML = `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
          }
        }
      };
      return load(location.pathname);
    }
  } catch {
    console.log("ipfs load error");
  }
}

export {
  hashCode3 as hashCode,
  mST,
  onSessionUpdate,
  AutoUpdateApp,
  appFactory,
  quickStart,
  run,
  saveCode,
  join2 as join
};
