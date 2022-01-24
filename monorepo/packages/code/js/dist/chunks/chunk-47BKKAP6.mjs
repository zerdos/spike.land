import {
  __commonJS
} from "./chunk-XHYF4LCB.mjs";

// ../../node_modules/fast-diff/diff.js
var require_diff = __commonJS({
  "../../node_modules/fast-diff/diff.js"(exports, module) {
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
    function starts_with_pair_end(str) {
      return is_surrogate_pair_end(str.charCodeAt(0));
    }
    function ends_with_pair_start(str) {
      return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
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
    function diff(text1, text2, cursor_pos) {
      return diff_main(text1, text2, cursor_pos, true);
    }
    diff.INSERT = DIFF_INSERT;
    diff.DELETE = DIFF_DELETE;
    diff.EQUAL = DIFF_EQUAL;
    module.exports = diff;
  }
});

// ../../node_modules/textdiff-create/index.js
var require_textdiff_create = __commonJS({
  "../../node_modules/textdiff-create/index.js"(exports, module) {
    var diff = require_diff();
    module.exports = function(original, revision) {
      var result = diff(original, revision);
      for (var i = 0; i < result.length; i++) {
        var item = result[i];
        if (item[0] < 1) {
          item[1] = item[1].length;
        }
      }
      return result;
    };
  }
});

export {
  require_textdiff_create
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Zhc3QtZGlmZi9kaWZmLmpzIiwgIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90ZXh0ZGlmZi1jcmVhdGUvaW5kZXguanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogVGhpcyBsaWJyYXJ5IG1vZGlmaWVzIHRoZSBkaWZmLXBhdGNoLW1hdGNoIGxpYnJhcnkgYnkgTmVpbCBGcmFzZXJcbiAqIGJ5IHJlbW92aW5nIHRoZSBwYXRjaCBhbmQgbWF0Y2ggZnVuY3Rpb25hbGl0eSBhbmQgY2VydGFpbiBhZHZhbmNlZFxuICogb3B0aW9ucyBpbiB0aGUgZGlmZiBmdW5jdGlvbi4gVGhlIG9yaWdpbmFsIGxpY2Vuc2UgaXMgYXMgZm9sbG93czpcbiAqXG4gKiA9PT1cbiAqXG4gKiBEaWZmIE1hdGNoIGFuZCBQYXRjaFxuICpcbiAqIENvcHlyaWdodCAyMDA2IEdvb2dsZSBJbmMuXG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZ29vZ2xlLWRpZmYtbWF0Y2gtcGF0Y2gvXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICogVGhlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIGRpZmYgaXMgYW4gYXJyYXkgb2YgdHVwbGVzOlxuICogW1tESUZGX0RFTEVURSwgJ0hlbGxvJ10sIFtESUZGX0lOU0VSVCwgJ0dvb2RieWUnXSwgW0RJRkZfRVFVQUwsICcgd29ybGQuJ11dXG4gKiB3aGljaCBtZWFuczogZGVsZXRlICdIZWxsbycsIGFkZCAnR29vZGJ5ZScgYW5kIGtlZXAgJyB3b3JsZC4nXG4gKi9cbnZhciBESUZGX0RFTEVURSA9IC0xO1xudmFyIERJRkZfSU5TRVJUID0gMTtcbnZhciBESUZGX0VRVUFMID0gMDtcblxuXG4vKipcbiAqIEZpbmQgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdHdvIHRleHRzLiAgU2ltcGxpZmllcyB0aGUgcHJvYmxlbSBieSBzdHJpcHBpbmdcbiAqIGFueSBjb21tb24gcHJlZml4IG9yIHN1ZmZpeCBvZmYgdGhlIHRleHRzIGJlZm9yZSBkaWZmaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIE9sZCBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtJbnR8T2JqZWN0fSBbY3Vyc29yX3Bvc10gRWRpdCBwb3NpdGlvbiBpbiB0ZXh0MSBvciBvYmplY3Qgd2l0aCBtb3JlIGluZm9cbiAqIEByZXR1cm4ge0FycmF5fSBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqL1xuZnVuY3Rpb24gZGlmZl9tYWluKHRleHQxLCB0ZXh0MiwgY3Vyc29yX3BvcywgX2ZpeF91bmljb2RlKSB7XG4gIC8vIENoZWNrIGZvciBlcXVhbGl0eVxuICBpZiAodGV4dDEgPT09IHRleHQyKSB7XG4gICAgaWYgKHRleHQxKSB7XG4gICAgICByZXR1cm4gW1tESUZGX0VRVUFMLCB0ZXh0MV1dO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAoY3Vyc29yX3BvcyAhPSBudWxsKSB7XG4gICAgdmFyIGVkaXRkaWZmID0gZmluZF9jdXJzb3JfZWRpdF9kaWZmKHRleHQxLCB0ZXh0MiwgY3Vyc29yX3Bvcyk7XG4gICAgaWYgKGVkaXRkaWZmKSB7XG4gICAgICByZXR1cm4gZWRpdGRpZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgY29tbW9uIHByZWZpeCAoc3BlZWR1cCkuXG4gIHZhciBjb21tb25sZW5ndGggPSBkaWZmX2NvbW1vblByZWZpeCh0ZXh0MSwgdGV4dDIpO1xuICB2YXIgY29tbW9ucHJlZml4ID0gdGV4dDEuc3Vic3RyaW5nKDAsIGNvbW1vbmxlbmd0aCk7XG4gIHRleHQxID0gdGV4dDEuc3Vic3RyaW5nKGNvbW1vbmxlbmd0aCk7XG4gIHRleHQyID0gdGV4dDIuc3Vic3RyaW5nKGNvbW1vbmxlbmd0aCk7XG5cbiAgLy8gVHJpbSBvZmYgY29tbW9uIHN1ZmZpeCAoc3BlZWR1cCkuXG4gIGNvbW1vbmxlbmd0aCA9IGRpZmZfY29tbW9uU3VmZml4KHRleHQxLCB0ZXh0Mik7XG4gIHZhciBjb21tb25zdWZmaXggPSB0ZXh0MS5zdWJzdHJpbmcodGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcbiAgdGV4dDEgPSB0ZXh0MS5zdWJzdHJpbmcoMCwgdGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcbiAgdGV4dDIgPSB0ZXh0Mi5zdWJzdHJpbmcoMCwgdGV4dDIubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcblxuICAvLyBDb21wdXRlIHRoZSBkaWZmIG9uIHRoZSBtaWRkbGUgYmxvY2suXG4gIHZhciBkaWZmcyA9IGRpZmZfY29tcHV0ZV8odGV4dDEsIHRleHQyKTtcblxuICAvLyBSZXN0b3JlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgaWYgKGNvbW1vbnByZWZpeCkge1xuICAgIGRpZmZzLnVuc2hpZnQoW0RJRkZfRVFVQUwsIGNvbW1vbnByZWZpeF0pO1xuICB9XG4gIGlmIChjb21tb25zdWZmaXgpIHtcbiAgICBkaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBjb21tb25zdWZmaXhdKTtcbiAgfVxuICBkaWZmX2NsZWFudXBNZXJnZShkaWZmcywgX2ZpeF91bmljb2RlKTtcbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vKipcbiAqIEZpbmQgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdHdvIHRleHRzLiAgQXNzdW1lcyB0aGF0IHRoZSB0ZXh0cyBkbyBub3RcbiAqIGhhdmUgYW55IGNvbW1vbiBwcmVmaXggb3Igc3VmZml4LlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIE9sZCBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHJldHVybiB7QXJyYXl9IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICovXG5mdW5jdGlvbiBkaWZmX2NvbXB1dGVfKHRleHQxLCB0ZXh0Mikge1xuICB2YXIgZGlmZnM7XG5cbiAgaWYgKCF0ZXh0MSkge1xuICAgIC8vIEp1c3QgYWRkIHNvbWUgdGV4dCAoc3BlZWR1cCkuXG4gICAgcmV0dXJuIFtbRElGRl9JTlNFUlQsIHRleHQyXV07XG4gIH1cblxuICBpZiAoIXRleHQyKSB7XG4gICAgLy8gSnVzdCBkZWxldGUgc29tZSB0ZXh0IChzcGVlZHVwKS5cbiAgICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdXTtcbiAgfVxuXG4gIHZhciBsb25ndGV4dCA9IHRleHQxLmxlbmd0aCA+IHRleHQyLmxlbmd0aCA/IHRleHQxIDogdGV4dDI7XG4gIHZhciBzaG9ydHRleHQgPSB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggPyB0ZXh0MiA6IHRleHQxO1xuICB2YXIgaSA9IGxvbmd0ZXh0LmluZGV4T2Yoc2hvcnR0ZXh0KTtcbiAgaWYgKGkgIT09IC0xKSB7XG4gICAgLy8gU2hvcnRlciB0ZXh0IGlzIGluc2lkZSB0aGUgbG9uZ2VyIHRleHQgKHNwZWVkdXApLlxuICAgIGRpZmZzID0gW1xuICAgICAgW0RJRkZfSU5TRVJULCBsb25ndGV4dC5zdWJzdHJpbmcoMCwgaSldLFxuICAgICAgW0RJRkZfRVFVQUwsIHNob3J0dGV4dF0sXG4gICAgICBbRElGRl9JTlNFUlQsIGxvbmd0ZXh0LnN1YnN0cmluZyhpICsgc2hvcnR0ZXh0Lmxlbmd0aCldXG4gICAgXTtcbiAgICAvLyBTd2FwIGluc2VydGlvbnMgZm9yIGRlbGV0aW9ucyBpZiBkaWZmIGlzIHJldmVyc2VkLlxuICAgIGlmICh0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGgpIHtcbiAgICAgIGRpZmZzWzBdWzBdID0gZGlmZnNbMl1bMF0gPSBESUZGX0RFTEVURTtcbiAgICB9XG4gICAgcmV0dXJuIGRpZmZzO1xuICB9XG5cbiAgaWYgKHNob3J0dGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAvLyBTaW5nbGUgY2hhcmFjdGVyIHN0cmluZy5cbiAgICAvLyBBZnRlciB0aGUgcHJldmlvdXMgc3BlZWR1cCwgdGhlIGNoYXJhY3RlciBjYW4ndCBiZSBhbiBlcXVhbGl0eS5cbiAgICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdLCBbRElGRl9JTlNFUlQsIHRleHQyXV07XG4gIH1cblxuICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIHByb2JsZW0gY2FuIGJlIHNwbGl0IGluIHR3by5cbiAgdmFyIGhtID0gZGlmZl9oYWxmTWF0Y2hfKHRleHQxLCB0ZXh0Mik7XG4gIGlmIChobSkge1xuICAgIC8vIEEgaGFsZi1tYXRjaCB3YXMgZm91bmQsIHNvcnQgb3V0IHRoZSByZXR1cm4gZGF0YS5cbiAgICB2YXIgdGV4dDFfYSA9IGhtWzBdO1xuICAgIHZhciB0ZXh0MV9iID0gaG1bMV07XG4gICAgdmFyIHRleHQyX2EgPSBobVsyXTtcbiAgICB2YXIgdGV4dDJfYiA9IGhtWzNdO1xuICAgIHZhciBtaWRfY29tbW9uID0gaG1bNF07XG4gICAgLy8gU2VuZCBib3RoIHBhaXJzIG9mZiBmb3Igc2VwYXJhdGUgcHJvY2Vzc2luZy5cbiAgICB2YXIgZGlmZnNfYSA9IGRpZmZfbWFpbih0ZXh0MV9hLCB0ZXh0Ml9hKTtcbiAgICB2YXIgZGlmZnNfYiA9IGRpZmZfbWFpbih0ZXh0MV9iLCB0ZXh0Ml9iKTtcbiAgICAvLyBNZXJnZSB0aGUgcmVzdWx0cy5cbiAgICByZXR1cm4gZGlmZnNfYS5jb25jYXQoW1tESUZGX0VRVUFMLCBtaWRfY29tbW9uXV0sIGRpZmZzX2IpO1xuICB9XG5cbiAgcmV0dXJuIGRpZmZfYmlzZWN0Xyh0ZXh0MSwgdGV4dDIpO1xufTtcblxuXG4vKipcbiAqIEZpbmQgdGhlICdtaWRkbGUgc25ha2UnIG9mIGEgZGlmZiwgc3BsaXQgdGhlIHByb2JsZW0gaW4gdHdvXG4gKiBhbmQgcmV0dXJuIHRoZSByZWN1cnNpdmVseSBjb25zdHJ1Y3RlZCBkaWZmLlxuICogU2VlIE15ZXJzIDE5ODYgcGFwZXI6IEFuIE8oTkQpIERpZmZlcmVuY2UgQWxnb3JpdGhtIGFuZCBJdHMgVmFyaWF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEByZXR1cm4ge0FycmF5fSBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRpZmZfYmlzZWN0Xyh0ZXh0MSwgdGV4dDIpIHtcbiAgLy8gQ2FjaGUgdGhlIHRleHQgbGVuZ3RocyB0byBwcmV2ZW50IG11bHRpcGxlIGNhbGxzLlxuICB2YXIgdGV4dDFfbGVuZ3RoID0gdGV4dDEubGVuZ3RoO1xuICB2YXIgdGV4dDJfbGVuZ3RoID0gdGV4dDIubGVuZ3RoO1xuICB2YXIgbWF4X2QgPSBNYXRoLmNlaWwoKHRleHQxX2xlbmd0aCArIHRleHQyX2xlbmd0aCkgLyAyKTtcbiAgdmFyIHZfb2Zmc2V0ID0gbWF4X2Q7XG4gIHZhciB2X2xlbmd0aCA9IDIgKiBtYXhfZDtcbiAgdmFyIHYxID0gbmV3IEFycmF5KHZfbGVuZ3RoKTtcbiAgdmFyIHYyID0gbmV3IEFycmF5KHZfbGVuZ3RoKTtcbiAgLy8gU2V0dGluZyBhbGwgZWxlbWVudHMgdG8gLTEgaXMgZmFzdGVyIGluIENocm9tZSAmIEZpcmVmb3ggdGhhbiBtaXhpbmdcbiAgLy8gaW50ZWdlcnMgYW5kIHVuZGVmaW5lZC5cbiAgZm9yICh2YXIgeCA9IDA7IHggPCB2X2xlbmd0aDsgeCsrKSB7XG4gICAgdjFbeF0gPSAtMTtcbiAgICB2Mlt4XSA9IC0xO1xuICB9XG4gIHYxW3Zfb2Zmc2V0ICsgMV0gPSAwO1xuICB2Mlt2X29mZnNldCArIDFdID0gMDtcbiAgdmFyIGRlbHRhID0gdGV4dDFfbGVuZ3RoIC0gdGV4dDJfbGVuZ3RoO1xuICAvLyBJZiB0aGUgdG90YWwgbnVtYmVyIG9mIGNoYXJhY3RlcnMgaXMgb2RkLCB0aGVuIHRoZSBmcm9udCBwYXRoIHdpbGwgY29sbGlkZVxuICAvLyB3aXRoIHRoZSByZXZlcnNlIHBhdGguXG4gIHZhciBmcm9udCA9IChkZWx0YSAlIDIgIT09IDApO1xuICAvLyBPZmZzZXRzIGZvciBzdGFydCBhbmQgZW5kIG9mIGsgbG9vcC5cbiAgLy8gUHJldmVudHMgbWFwcGluZyBvZiBzcGFjZSBiZXlvbmQgdGhlIGdyaWQuXG4gIHZhciBrMXN0YXJ0ID0gMDtcbiAgdmFyIGsxZW5kID0gMDtcbiAgdmFyIGsyc3RhcnQgPSAwO1xuICB2YXIgazJlbmQgPSAwO1xuICBmb3IgKHZhciBkID0gMDsgZCA8IG1heF9kOyBkKyspIHtcbiAgICAvLyBXYWxrIHRoZSBmcm9udCBwYXRoIG9uZSBzdGVwLlxuICAgIGZvciAodmFyIGsxID0gLWQgKyBrMXN0YXJ0OyBrMSA8PSBkIC0gazFlbmQ7IGsxICs9IDIpIHtcbiAgICAgIHZhciBrMV9vZmZzZXQgPSB2X29mZnNldCArIGsxO1xuICAgICAgdmFyIHgxO1xuICAgICAgaWYgKGsxID09PSAtZCB8fCAoazEgIT09IGQgJiYgdjFbazFfb2Zmc2V0IC0gMV0gPCB2MVtrMV9vZmZzZXQgKyAxXSkpIHtcbiAgICAgICAgeDEgPSB2MVtrMV9vZmZzZXQgKyAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHgxID0gdjFbazFfb2Zmc2V0IC0gMV0gKyAxO1xuICAgICAgfVxuICAgICAgdmFyIHkxID0geDEgLSBrMTtcbiAgICAgIHdoaWxlIChcbiAgICAgICAgeDEgPCB0ZXh0MV9sZW5ndGggJiYgeTEgPCB0ZXh0Ml9sZW5ndGggJiZcbiAgICAgICAgdGV4dDEuY2hhckF0KHgxKSA9PT0gdGV4dDIuY2hhckF0KHkxKVxuICAgICAgKSB7XG4gICAgICAgIHgxKys7XG4gICAgICAgIHkxKys7XG4gICAgICB9XG4gICAgICB2MVtrMV9vZmZzZXRdID0geDE7XG4gICAgICBpZiAoeDEgPiB0ZXh0MV9sZW5ndGgpIHtcbiAgICAgICAgLy8gUmFuIG9mZiB0aGUgcmlnaHQgb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMWVuZCArPSAyO1xuICAgICAgfSBlbHNlIGlmICh5MSA+IHRleHQyX2xlbmd0aCkge1xuICAgICAgICAvLyBSYW4gb2ZmIHRoZSBib3R0b20gb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMXN0YXJ0ICs9IDI7XG4gICAgICB9IGVsc2UgaWYgKGZyb250KSB7XG4gICAgICAgIHZhciBrMl9vZmZzZXQgPSB2X29mZnNldCArIGRlbHRhIC0gazE7XG4gICAgICAgIGlmIChrMl9vZmZzZXQgPj0gMCAmJiBrMl9vZmZzZXQgPCB2X2xlbmd0aCAmJiB2MltrMl9vZmZzZXRdICE9PSAtMSkge1xuICAgICAgICAgIC8vIE1pcnJvciB4MiBvbnRvIHRvcC1sZWZ0IGNvb3JkaW5hdGUgc3lzdGVtLlxuICAgICAgICAgIHZhciB4MiA9IHRleHQxX2xlbmd0aCAtIHYyW2syX29mZnNldF07XG4gICAgICAgICAgaWYgKHgxID49IHgyKSB7XG4gICAgICAgICAgICAvLyBPdmVybGFwIGRldGVjdGVkLlxuICAgICAgICAgICAgcmV0dXJuIGRpZmZfYmlzZWN0U3BsaXRfKHRleHQxLCB0ZXh0MiwgeDEsIHkxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXYWxrIHRoZSByZXZlcnNlIHBhdGggb25lIHN0ZXAuXG4gICAgZm9yICh2YXIgazIgPSAtZCArIGsyc3RhcnQ7IGsyIDw9IGQgLSBrMmVuZDsgazIgKz0gMikge1xuICAgICAgdmFyIGsyX29mZnNldCA9IHZfb2Zmc2V0ICsgazI7XG4gICAgICB2YXIgeDI7XG4gICAgICBpZiAoazIgPT09IC1kIHx8IChrMiAhPT0gZCAmJiB2MltrMl9vZmZzZXQgLSAxXSA8IHYyW2syX29mZnNldCArIDFdKSkge1xuICAgICAgICB4MiA9IHYyW2syX29mZnNldCArIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeDIgPSB2MltrMl9vZmZzZXQgLSAxXSArIDE7XG4gICAgICB9XG4gICAgICB2YXIgeTIgPSB4MiAtIGsyO1xuICAgICAgd2hpbGUgKFxuICAgICAgICB4MiA8IHRleHQxX2xlbmd0aCAmJiB5MiA8IHRleHQyX2xlbmd0aCAmJlxuICAgICAgICB0ZXh0MS5jaGFyQXQodGV4dDFfbGVuZ3RoIC0geDIgLSAxKSA9PT0gdGV4dDIuY2hhckF0KHRleHQyX2xlbmd0aCAtIHkyIC0gMSlcbiAgICAgICkge1xuICAgICAgICB4MisrO1xuICAgICAgICB5MisrO1xuICAgICAgfVxuICAgICAgdjJbazJfb2Zmc2V0XSA9IHgyO1xuICAgICAgaWYgKHgyID4gdGV4dDFfbGVuZ3RoKSB7XG4gICAgICAgIC8vIFJhbiBvZmYgdGhlIGxlZnQgb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMmVuZCArPSAyO1xuICAgICAgfSBlbHNlIGlmICh5MiA+IHRleHQyX2xlbmd0aCkge1xuICAgICAgICAvLyBSYW4gb2ZmIHRoZSB0b3Agb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMnN0YXJ0ICs9IDI7XG4gICAgICB9IGVsc2UgaWYgKCFmcm9udCkge1xuICAgICAgICB2YXIgazFfb2Zmc2V0ID0gdl9vZmZzZXQgKyBkZWx0YSAtIGsyO1xuICAgICAgICBpZiAoazFfb2Zmc2V0ID49IDAgJiYgazFfb2Zmc2V0IDwgdl9sZW5ndGggJiYgdjFbazFfb2Zmc2V0XSAhPT0gLTEpIHtcbiAgICAgICAgICB2YXIgeDEgPSB2MVtrMV9vZmZzZXRdO1xuICAgICAgICAgIHZhciB5MSA9IHZfb2Zmc2V0ICsgeDEgLSBrMV9vZmZzZXQ7XG4gICAgICAgICAgLy8gTWlycm9yIHgyIG9udG8gdG9wLWxlZnQgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gICAgICAgICAgeDIgPSB0ZXh0MV9sZW5ndGggLSB4MjtcbiAgICAgICAgICBpZiAoeDEgPj0geDIpIHtcbiAgICAgICAgICAgIC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG4gICAgICAgICAgICByZXR1cm4gZGlmZl9iaXNlY3RTcGxpdF8odGV4dDEsIHRleHQyLCB4MSwgeTEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBEaWZmIHRvb2sgdG9vIGxvbmcgYW5kIGhpdCB0aGUgZGVhZGxpbmUgb3JcbiAgLy8gbnVtYmVyIG9mIGRpZmZzIGVxdWFscyBudW1iZXIgb2YgY2hhcmFjdGVycywgbm8gY29tbW9uYWxpdHkgYXQgYWxsLlxuICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdLCBbRElGRl9JTlNFUlQsIHRleHQyXV07XG59O1xuXG5cbi8qKlxuICogR2l2ZW4gdGhlIGxvY2F0aW9uIG9mIHRoZSAnbWlkZGxlIHNuYWtlJywgc3BsaXQgdGhlIGRpZmYgaW4gdHdvIHBhcnRzXG4gKiBhbmQgcmVjdXJzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4IEluZGV4IG9mIHNwbGl0IHBvaW50IGluIHRleHQxLlxuICogQHBhcmFtIHtudW1iZXJ9IHkgSW5kZXggb2Ygc3BsaXQgcG9pbnQgaW4gdGV4dDIuXG4gKiBAcmV0dXJuIHtBcnJheX0gQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmZ1bmN0aW9uIGRpZmZfYmlzZWN0U3BsaXRfKHRleHQxLCB0ZXh0MiwgeCwgeSkge1xuICB2YXIgdGV4dDFhID0gdGV4dDEuc3Vic3RyaW5nKDAsIHgpO1xuICB2YXIgdGV4dDJhID0gdGV4dDIuc3Vic3RyaW5nKDAsIHkpO1xuICB2YXIgdGV4dDFiID0gdGV4dDEuc3Vic3RyaW5nKHgpO1xuICB2YXIgdGV4dDJiID0gdGV4dDIuc3Vic3RyaW5nKHkpO1xuXG4gIC8vIENvbXB1dGUgYm90aCBkaWZmcyBzZXJpYWxseS5cbiAgdmFyIGRpZmZzID0gZGlmZl9tYWluKHRleHQxYSwgdGV4dDJhKTtcbiAgdmFyIGRpZmZzYiA9IGRpZmZfbWFpbih0ZXh0MWIsIHRleHQyYik7XG5cbiAgcmV0dXJuIGRpZmZzLmNvbmNhdChkaWZmc2IpO1xufTtcblxuXG4vKipcbiAqIERldGVybWluZSB0aGUgY29tbW9uIHByZWZpeCBvZiB0d28gc3RyaW5ncy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBGaXJzdCBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgU2Vjb25kIHN0cmluZy5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGNvbW1vbiB0byB0aGUgc3RhcnQgb2YgZWFjaFxuICogICAgIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZGlmZl9jb21tb25QcmVmaXgodGV4dDEsIHRleHQyKSB7XG4gIC8vIFF1aWNrIGNoZWNrIGZvciBjb21tb24gbnVsbCBjYXNlcy5cbiAgaWYgKCF0ZXh0MSB8fCAhdGV4dDIgfHwgdGV4dDEuY2hhckF0KDApICE9PSB0ZXh0Mi5jaGFyQXQoMCkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICAvLyBCaW5hcnkgc2VhcmNoLlxuICAvLyBQZXJmb3JtYW5jZSBhbmFseXNpczogaHR0cDovL25laWwuZnJhc2VyLm5hbWUvbmV3cy8yMDA3LzEwLzA5L1xuICB2YXIgcG9pbnRlcm1pbiA9IDA7XG4gIHZhciBwb2ludGVybWF4ID0gTWF0aC5taW4odGV4dDEubGVuZ3RoLCB0ZXh0Mi5sZW5ndGgpO1xuICB2YXIgcG9pbnRlcm1pZCA9IHBvaW50ZXJtYXg7XG4gIHZhciBwb2ludGVyc3RhcnQgPSAwO1xuICB3aGlsZSAocG9pbnRlcm1pbiA8IHBvaW50ZXJtaWQpIHtcbiAgICBpZiAoXG4gICAgICB0ZXh0MS5zdWJzdHJpbmcocG9pbnRlcnN0YXJ0LCBwb2ludGVybWlkKSA9PVxuICAgICAgdGV4dDIuc3Vic3RyaW5nKHBvaW50ZXJzdGFydCwgcG9pbnRlcm1pZClcbiAgICApIHtcbiAgICAgIHBvaW50ZXJtaW4gPSBwb2ludGVybWlkO1xuICAgICAgcG9pbnRlcnN0YXJ0ID0gcG9pbnRlcm1pbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlcm1heCA9IHBvaW50ZXJtaWQ7XG4gICAgfVxuICAgIHBvaW50ZXJtaWQgPSBNYXRoLmZsb29yKChwb2ludGVybWF4IC0gcG9pbnRlcm1pbikgLyAyICsgcG9pbnRlcm1pbik7XG4gIH1cblxuICBpZiAoaXNfc3Vycm9nYXRlX3BhaXJfc3RhcnQodGV4dDEuY2hhckNvZGVBdChwb2ludGVybWlkIC0gMSkpKSB7XG4gICAgcG9pbnRlcm1pZC0tO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50ZXJtaWQ7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIHRoZSBjb21tb24gc3VmZml4IG9mIHR3byBzdHJpbmdzLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIEZpcnN0IHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBTZWNvbmQgc3RyaW5nLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgY29tbW9uIHRvIHRoZSBlbmQgb2YgZWFjaCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGRpZmZfY29tbW9uU3VmZml4KHRleHQxLCB0ZXh0Mikge1xuICAvLyBRdWljayBjaGVjayBmb3IgY29tbW9uIG51bGwgY2FzZXMuXG4gIGlmICghdGV4dDEgfHwgIXRleHQyIHx8IHRleHQxLnNsaWNlKC0xKSAhPT0gdGV4dDIuc2xpY2UoLTEpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgLy8gQmluYXJ5IHNlYXJjaC5cbiAgLy8gUGVyZm9ybWFuY2UgYW5hbHlzaXM6IGh0dHA6Ly9uZWlsLmZyYXNlci5uYW1lL25ld3MvMjAwNy8xMC8wOS9cbiAgdmFyIHBvaW50ZXJtaW4gPSAwO1xuICB2YXIgcG9pbnRlcm1heCA9IE1hdGgubWluKHRleHQxLmxlbmd0aCwgdGV4dDIubGVuZ3RoKTtcbiAgdmFyIHBvaW50ZXJtaWQgPSBwb2ludGVybWF4O1xuICB2YXIgcG9pbnRlcmVuZCA9IDA7XG4gIHdoaWxlIChwb2ludGVybWluIDwgcG9pbnRlcm1pZCkge1xuICAgIGlmIChcbiAgICAgIHRleHQxLnN1YnN0cmluZyh0ZXh0MS5sZW5ndGggLSBwb2ludGVybWlkLCB0ZXh0MS5sZW5ndGggLSBwb2ludGVyZW5kKSA9PVxuICAgICAgdGV4dDIuc3Vic3RyaW5nKHRleHQyLmxlbmd0aCAtIHBvaW50ZXJtaWQsIHRleHQyLmxlbmd0aCAtIHBvaW50ZXJlbmQpXG4gICAgKSB7XG4gICAgICBwb2ludGVybWluID0gcG9pbnRlcm1pZDtcbiAgICAgIHBvaW50ZXJlbmQgPSBwb2ludGVybWluO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb2ludGVybWF4ID0gcG9pbnRlcm1pZDtcbiAgICB9XG4gICAgcG9pbnRlcm1pZCA9IE1hdGguZmxvb3IoKHBvaW50ZXJtYXggLSBwb2ludGVybWluKSAvIDIgKyBwb2ludGVybWluKTtcbiAgfVxuXG4gIGlmIChpc19zdXJyb2dhdGVfcGFpcl9lbmQodGV4dDEuY2hhckNvZGVBdCh0ZXh0MS5sZW5ndGggLSBwb2ludGVybWlkKSkpIHtcbiAgICBwb2ludGVybWlkLS07XG4gIH1cblxuICByZXR1cm4gcG9pbnRlcm1pZDtcbn07XG5cblxuLyoqXG4gKiBEbyB0aGUgdHdvIHRleHRzIHNoYXJlIGEgc3Vic3RyaW5nIHdoaWNoIGlzIGF0IGxlYXN0IGhhbGYgdGhlIGxlbmd0aCBvZiB0aGVcbiAqIGxvbmdlciB0ZXh0P1xuICogVGhpcyBzcGVlZHVwIGNhbiBwcm9kdWNlIG5vbi1taW5pbWFsIGRpZmZzLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIEZpcnN0IHN0cmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBTZWNvbmQgc3RyaW5nLlxuICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59IEZpdmUgZWxlbWVudCBBcnJheSwgY29udGFpbmluZyB0aGUgcHJlZml4IG9mXG4gKiAgICAgdGV4dDEsIHRoZSBzdWZmaXggb2YgdGV4dDEsIHRoZSBwcmVmaXggb2YgdGV4dDIsIHRoZSBzdWZmaXggb2ZcbiAqICAgICB0ZXh0MiBhbmQgdGhlIGNvbW1vbiBtaWRkbGUuICBPciBudWxsIGlmIHRoZXJlIHdhcyBubyBtYXRjaC5cbiAqL1xuZnVuY3Rpb24gZGlmZl9oYWxmTWF0Y2hfKHRleHQxLCB0ZXh0Mikge1xuICB2YXIgbG9uZ3RleHQgPSB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggPyB0ZXh0MSA6IHRleHQyO1xuICB2YXIgc2hvcnR0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDIgOiB0ZXh0MTtcbiAgaWYgKGxvbmd0ZXh0Lmxlbmd0aCA8IDQgfHwgc2hvcnR0ZXh0Lmxlbmd0aCAqIDIgPCBsb25ndGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDsgIC8vIFBvaW50bGVzcy5cbiAgfVxuXG4gIC8qKlxuICAgKiBEb2VzIGEgc3Vic3RyaW5nIG9mIHNob3J0dGV4dCBleGlzdCB3aXRoaW4gbG9uZ3RleHQgc3VjaCB0aGF0IHRoZSBzdWJzdHJpbmdcbiAgICogaXMgYXQgbGVhc3QgaGFsZiB0aGUgbGVuZ3RoIG9mIGxvbmd0ZXh0P1xuICAgKiBDbG9zdXJlLCBidXQgZG9lcyBub3QgcmVmZXJlbmNlIGFueSBleHRlcm5hbCB2YXJpYWJsZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb25ndGV4dCBMb25nZXIgc3RyaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2hvcnR0ZXh0IFNob3J0ZXIgc3RyaW5nLlxuICAgKiBAcGFyYW0ge251bWJlcn0gaSBTdGFydCBpbmRleCBvZiBxdWFydGVyIGxlbmd0aCBzdWJzdHJpbmcgd2l0aGluIGxvbmd0ZXh0LlxuICAgKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn0gRml2ZSBlbGVtZW50IEFycmF5LCBjb250YWluaW5nIHRoZSBwcmVmaXggb2ZcbiAgICogICAgIGxvbmd0ZXh0LCB0aGUgc3VmZml4IG9mIGxvbmd0ZXh0LCB0aGUgcHJlZml4IG9mIHNob3J0dGV4dCwgdGhlIHN1ZmZpeFxuICAgKiAgICAgb2Ygc2hvcnR0ZXh0IGFuZCB0aGUgY29tbW9uIG1pZGRsZS4gIE9yIG51bGwgaWYgdGhlcmUgd2FzIG5vIG1hdGNoLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gZGlmZl9oYWxmTWF0Y2hJXyhsb25ndGV4dCwgc2hvcnR0ZXh0LCBpKSB7XG4gICAgLy8gU3RhcnQgd2l0aCBhIDEvNCBsZW5ndGggc3Vic3RyaW5nIGF0IHBvc2l0aW9uIGkgYXMgYSBzZWVkLlxuICAgIHZhciBzZWVkID0gbG9uZ3RleHQuc3Vic3RyaW5nKGksIGkgKyBNYXRoLmZsb29yKGxvbmd0ZXh0Lmxlbmd0aCAvIDQpKTtcbiAgICB2YXIgaiA9IC0xO1xuICAgIHZhciBiZXN0X2NvbW1vbiA9ICcnO1xuICAgIHZhciBiZXN0X2xvbmd0ZXh0X2EsIGJlc3RfbG9uZ3RleHRfYiwgYmVzdF9zaG9ydHRleHRfYSwgYmVzdF9zaG9ydHRleHRfYjtcbiAgICB3aGlsZSAoKGogPSBzaG9ydHRleHQuaW5kZXhPZihzZWVkLCBqICsgMSkpICE9PSAtMSkge1xuICAgICAgdmFyIHByZWZpeExlbmd0aCA9IGRpZmZfY29tbW9uUHJlZml4KFxuICAgICAgICBsb25ndGV4dC5zdWJzdHJpbmcoaSksIHNob3J0dGV4dC5zdWJzdHJpbmcoaikpO1xuICAgICAgdmFyIHN1ZmZpeExlbmd0aCA9IGRpZmZfY29tbW9uU3VmZml4KFxuICAgICAgICBsb25ndGV4dC5zdWJzdHJpbmcoMCwgaSksIHNob3J0dGV4dC5zdWJzdHJpbmcoMCwgaikpO1xuICAgICAgaWYgKGJlc3RfY29tbW9uLmxlbmd0aCA8IHN1ZmZpeExlbmd0aCArIHByZWZpeExlbmd0aCkge1xuICAgICAgICBiZXN0X2NvbW1vbiA9IHNob3J0dGV4dC5zdWJzdHJpbmcoXG4gICAgICAgICAgaiAtIHN1ZmZpeExlbmd0aCwgaikgKyBzaG9ydHRleHQuc3Vic3RyaW5nKGosIGogKyBwcmVmaXhMZW5ndGgpO1xuICAgICAgICBiZXN0X2xvbmd0ZXh0X2EgPSBsb25ndGV4dC5zdWJzdHJpbmcoMCwgaSAtIHN1ZmZpeExlbmd0aCk7XG4gICAgICAgIGJlc3RfbG9uZ3RleHRfYiA9IGxvbmd0ZXh0LnN1YnN0cmluZyhpICsgcHJlZml4TGVuZ3RoKTtcbiAgICAgICAgYmVzdF9zaG9ydHRleHRfYSA9IHNob3J0dGV4dC5zdWJzdHJpbmcoMCwgaiAtIHN1ZmZpeExlbmd0aCk7XG4gICAgICAgIGJlc3Rfc2hvcnR0ZXh0X2IgPSBzaG9ydHRleHQuc3Vic3RyaW5nKGogKyBwcmVmaXhMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoYmVzdF9jb21tb24ubGVuZ3RoICogMiA+PSBsb25ndGV4dC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIGJlc3RfbG9uZ3RleHRfYSwgYmVzdF9sb25ndGV4dF9iLFxuICAgICAgICBiZXN0X3Nob3J0dGV4dF9hLCBiZXN0X3Nob3J0dGV4dF9iLCBiZXN0X2NvbW1vblxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLy8gRmlyc3QgY2hlY2sgaWYgdGhlIHNlY29uZCBxdWFydGVyIGlzIHRoZSBzZWVkIGZvciBhIGhhbGYtbWF0Y2guXG4gIHZhciBobTEgPSBkaWZmX2hhbGZNYXRjaElfKGxvbmd0ZXh0LCBzaG9ydHRleHQsIE1hdGguY2VpbChsb25ndGV4dC5sZW5ndGggLyA0KSk7XG4gIC8vIENoZWNrIGFnYWluIGJhc2VkIG9uIHRoZSB0aGlyZCBxdWFydGVyLlxuICB2YXIgaG0yID0gZGlmZl9oYWxmTWF0Y2hJXyhsb25ndGV4dCwgc2hvcnR0ZXh0LCBNYXRoLmNlaWwobG9uZ3RleHQubGVuZ3RoIC8gMikpO1xuICB2YXIgaG07XG4gIGlmICghaG0xICYmICFobTIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBlbHNlIGlmICghaG0yKSB7XG4gICAgaG0gPSBobTE7XG4gIH0gZWxzZSBpZiAoIWhtMSkge1xuICAgIGhtID0gaG0yO1xuICB9IGVsc2Uge1xuICAgIC8vIEJvdGggbWF0Y2hlZC4gIFNlbGVjdCB0aGUgbG9uZ2VzdC5cbiAgICBobSA9IGhtMVs0XS5sZW5ndGggPiBobTJbNF0ubGVuZ3RoID8gaG0xIDogaG0yO1xuICB9XG5cbiAgLy8gQSBoYWxmLW1hdGNoIHdhcyBmb3VuZCwgc29ydCBvdXQgdGhlIHJldHVybiBkYXRhLlxuICB2YXIgdGV4dDFfYSwgdGV4dDFfYiwgdGV4dDJfYSwgdGV4dDJfYjtcbiAgaWYgKHRleHQxLmxlbmd0aCA+IHRleHQyLmxlbmd0aCkge1xuICAgIHRleHQxX2EgPSBobVswXTtcbiAgICB0ZXh0MV9iID0gaG1bMV07XG4gICAgdGV4dDJfYSA9IGhtWzJdO1xuICAgIHRleHQyX2IgPSBobVszXTtcbiAgfSBlbHNlIHtcbiAgICB0ZXh0Ml9hID0gaG1bMF07XG4gICAgdGV4dDJfYiA9IGhtWzFdO1xuICAgIHRleHQxX2EgPSBobVsyXTtcbiAgICB0ZXh0MV9iID0gaG1bM107XG4gIH1cbiAgdmFyIG1pZF9jb21tb24gPSBobVs0XTtcbiAgcmV0dXJuIFt0ZXh0MV9hLCB0ZXh0MV9iLCB0ZXh0Ml9hLCB0ZXh0Ml9iLCBtaWRfY29tbW9uXTtcbn07XG5cblxuLyoqXG4gKiBSZW9yZGVyIGFuZCBtZXJnZSBsaWtlIGVkaXQgc2VjdGlvbnMuICBNZXJnZSBlcXVhbGl0aWVzLlxuICogQW55IGVkaXQgc2VjdGlvbiBjYW4gbW92ZSBhcyBsb25nIGFzIGl0IGRvZXNuJ3QgY3Jvc3MgYW4gZXF1YWxpdHkuXG4gKiBAcGFyYW0ge0FycmF5fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZml4X3VuaWNvZGUgV2hldGhlciB0byBub3JtYWxpemUgdG8gYSB1bmljb2RlLWNvcnJlY3QgZGlmZlxuICovXG5mdW5jdGlvbiBkaWZmX2NsZWFudXBNZXJnZShkaWZmcywgZml4X3VuaWNvZGUpIHtcbiAgZGlmZnMucHVzaChbRElGRl9FUVVBTCwgJyddKTsgIC8vIEFkZCBhIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG4gIHZhciBwb2ludGVyID0gMDtcbiAgdmFyIGNvdW50X2RlbGV0ZSA9IDA7XG4gIHZhciBjb3VudF9pbnNlcnQgPSAwO1xuICB2YXIgdGV4dF9kZWxldGUgPSAnJztcbiAgdmFyIHRleHRfaW5zZXJ0ID0gJyc7XG4gIHZhciBjb21tb25sZW5ndGg7XG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoKSB7XG4gICAgaWYgKHBvaW50ZXIgPCBkaWZmcy5sZW5ndGggLSAxICYmICFkaWZmc1twb2ludGVyXVsxXSkge1xuICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIsIDEpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHN3aXRjaCAoZGlmZnNbcG9pbnRlcl1bMF0pIHtcbiAgICAgIGNhc2UgRElGRl9JTlNFUlQ6XG5cbiAgICAgICAgY291bnRfaW5zZXJ0Kys7XG4gICAgICAgIHRleHRfaW5zZXJ0ICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgY291bnRfZGVsZXRlKys7XG4gICAgICAgIHRleHRfZGVsZXRlICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICB2YXIgcHJldmlvdXNfZXF1YWxpdHkgPSBwb2ludGVyIC0gY291bnRfaW5zZXJ0IC0gY291bnRfZGVsZXRlIC0gMTtcbiAgICAgICAgaWYgKGZpeF91bmljb2RlKSB7XG4gICAgICAgICAgLy8gcHJldmVudCBzcGxpdHRpbmcgb2YgdW5pY29kZSBzdXJyb2dhdGUgcGFpcnMuICB3aGVuIGZpeF91bmljb2RlIGlzIHRydWUsXG4gICAgICAgICAgLy8gd2UgYXNzdW1lIHRoYXQgdGhlIG9sZCBhbmQgbmV3IHRleHQgaW4gdGhlIGRpZmYgYXJlIGNvbXBsZXRlIGFuZCBjb3JyZWN0XG4gICAgICAgICAgLy8gdW5pY29kZS1lbmNvZGVkIEpTIHN0cmluZ3MsIGJ1dCB0aGUgdHVwbGUgYm91bmRhcmllcyBtYXkgZmFsbCBiZXR3ZWVuXG4gICAgICAgICAgLy8gc3Vycm9nYXRlIHBhaXJzLiAgd2UgZml4IHRoaXMgYnkgc2hhdmluZyBvZmYgc3RyYXkgc3Vycm9nYXRlcyBmcm9tIHRoZSBlbmRcbiAgICAgICAgICAvLyBvZiB0aGUgcHJldmlvdXMgZXF1YWxpdHkgYW5kIHRoZSBiZWdpbm5pbmcgb2YgdGhpcyBlcXVhbGl0eS4gIHRoaXMgbWF5IGNyZWF0ZVxuICAgICAgICAgIC8vIGVtcHR5IGVxdWFsaXRpZXMgb3IgYSBjb21tb24gcHJlZml4IG9yIHN1ZmZpeC4gIGZvciBleGFtcGxlLCBpZiBBQiBhbmQgQUMgYXJlXG4gICAgICAgICAgLy8gZW1vamlzLCBgW1swLCAnQSddLCBbLTEsICdCQSddLCBbMCwgJ0MnXV1gIHdvdWxkIHR1cm4gaW50byBkZWxldGluZyAnQUJBQycgYW5kXG4gICAgICAgICAgLy8gaW5zZXJ0aW5nICdBQycsIGFuZCB0aGVuIHRoZSBjb21tb24gc3VmZml4ICdBQycgd2lsbCBiZSBlbGltaW5hdGVkLiAgaW4gdGhpc1xuICAgICAgICAgIC8vIHBhcnRpY3VsYXIgY2FzZSwgYm90aCBlcXVhbGl0aWVzIGdvIGF3YXksIHdlIGFic29yYiBhbnkgcHJldmlvdXMgaW5lcXVhbGl0aWVzLFxuICAgICAgICAgIC8vIGFuZCB3ZSBrZWVwIHNjYW5uaW5nIGZvciB0aGUgbmV4dCBlcXVhbGl0eSBiZWZvcmUgcmV3cml0aW5nIHRoZSB0dXBsZXMuXG4gICAgICAgICAgaWYgKHByZXZpb3VzX2VxdWFsaXR5ID49IDAgJiYgZW5kc193aXRoX3BhaXJfc3RhcnQoZGlmZnNbcHJldmlvdXNfZXF1YWxpdHldWzFdKSkge1xuICAgICAgICAgICAgdmFyIHN0cmF5ID0gZGlmZnNbcHJldmlvdXNfZXF1YWxpdHldWzFdLnNsaWNlKC0xKTtcbiAgICAgICAgICAgIGRpZmZzW3ByZXZpb3VzX2VxdWFsaXR5XVsxXSA9IGRpZmZzW3ByZXZpb3VzX2VxdWFsaXR5XVsxXS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICB0ZXh0X2RlbGV0ZSA9IHN0cmF5ICsgdGV4dF9kZWxldGU7XG4gICAgICAgICAgICB0ZXh0X2luc2VydCA9IHN0cmF5ICsgdGV4dF9pbnNlcnQ7XG4gICAgICAgICAgICBpZiAoIWRpZmZzW3ByZXZpb3VzX2VxdWFsaXR5XVsxXSkge1xuICAgICAgICAgICAgICAvLyBlbXB0aWVkIG91dCBwcmV2aW91cyBlcXVhbGl0eSwgc28gZGVsZXRlIGl0IGFuZCBpbmNsdWRlIHByZXZpb3VzIGRlbGV0ZS9pbnNlcnRcbiAgICAgICAgICAgICAgZGlmZnMuc3BsaWNlKHByZXZpb3VzX2VxdWFsaXR5LCAxKTtcbiAgICAgICAgICAgICAgcG9pbnRlci0tO1xuICAgICAgICAgICAgICB2YXIgayA9IHByZXZpb3VzX2VxdWFsaXR5IC0gMTtcbiAgICAgICAgICAgICAgaWYgKGRpZmZzW2tdICYmIGRpZmZzW2tdWzBdID09PSBESUZGX0lOU0VSVCkge1xuICAgICAgICAgICAgICAgIGNvdW50X2luc2VydCsrO1xuICAgICAgICAgICAgICAgIHRleHRfaW5zZXJ0ID0gZGlmZnNba11bMV0gKyB0ZXh0X2luc2VydDtcbiAgICAgICAgICAgICAgICBrLS07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGRpZmZzW2tdICYmIGRpZmZzW2tdWzBdID09PSBESUZGX0RFTEVURSkge1xuICAgICAgICAgICAgICAgIGNvdW50X2RlbGV0ZSsrO1xuICAgICAgICAgICAgICAgIHRleHRfZGVsZXRlID0gZGlmZnNba11bMV0gKyB0ZXh0X2RlbGV0ZTtcbiAgICAgICAgICAgICAgICBrLS07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcHJldmlvdXNfZXF1YWxpdHkgPSBrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RhcnRzX3dpdGhfcGFpcl9lbmQoZGlmZnNbcG9pbnRlcl1bMV0pKSB7XG4gICAgICAgICAgICB2YXIgc3RyYXkgPSBkaWZmc1twb2ludGVyXVsxXS5jaGFyQXQoMCk7XG4gICAgICAgICAgICBkaWZmc1twb2ludGVyXVsxXSA9IGRpZmZzW3BvaW50ZXJdWzFdLnNsaWNlKDEpO1xuICAgICAgICAgICAgdGV4dF9kZWxldGUgKz0gc3RyYXk7XG4gICAgICAgICAgICB0ZXh0X2luc2VydCArPSBzdHJheTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvaW50ZXIgPCBkaWZmcy5sZW5ndGggLSAxICYmICFkaWZmc1twb2ludGVyXVsxXSkge1xuICAgICAgICAgIC8vIGZvciBlbXB0eSBlcXVhbGl0eSBub3QgYXQgZW5kLCB3YWl0IGZvciBuZXh0IGVxdWFsaXR5XG4gICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIsIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ZXh0X2RlbGV0ZS5sZW5ndGggPiAwIHx8IHRleHRfaW5zZXJ0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBub3RlIHRoYXQgZGlmZl9jb21tb25QcmVmaXggYW5kIGRpZmZfY29tbW9uU3VmZml4IGFyZSB1bmljb2RlLWF3YXJlXG4gICAgICAgICAgaWYgKHRleHRfZGVsZXRlLmxlbmd0aCA+IDAgJiYgdGV4dF9pbnNlcnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gRmFjdG9yIG91dCBhbnkgY29tbW9uIHByZWZpeGVzLlxuICAgICAgICAgICAgY29tbW9ubGVuZ3RoID0gZGlmZl9jb21tb25QcmVmaXgodGV4dF9pbnNlcnQsIHRleHRfZGVsZXRlKTtcbiAgICAgICAgICAgIGlmIChjb21tb25sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgaWYgKHByZXZpb3VzX2VxdWFsaXR5ID49IDApIHtcbiAgICAgICAgICAgICAgICBkaWZmc1twcmV2aW91c19lcXVhbGl0eV1bMV0gKz0gdGV4dF9pbnNlcnQuc3Vic3RyaW5nKDAsIGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlmZnMuc3BsaWNlKDAsIDAsIFtESUZGX0VRVUFMLCB0ZXh0X2luc2VydC5zdWJzdHJpbmcoMCwgY29tbW9ubGVuZ3RoKV0pO1xuICAgICAgICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0ZXh0X2luc2VydCA9IHRleHRfaW5zZXJ0LnN1YnN0cmluZyhjb21tb25sZW5ndGgpO1xuICAgICAgICAgICAgICB0ZXh0X2RlbGV0ZSA9IHRleHRfZGVsZXRlLnN1YnN0cmluZyhjb21tb25sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmFjdG9yIG91dCBhbnkgY29tbW9uIHN1ZmZpeGVzLlxuICAgICAgICAgICAgY29tbW9ubGVuZ3RoID0gZGlmZl9jb21tb25TdWZmaXgodGV4dF9pbnNlcnQsIHRleHRfZGVsZXRlKTtcbiAgICAgICAgICAgIGlmIChjb21tb25sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgZGlmZnNbcG9pbnRlcl1bMV0gPVxuICAgICAgICAgICAgICAgIHRleHRfaW5zZXJ0LnN1YnN0cmluZyh0ZXh0X2luc2VydC5sZW5ndGggLSBjb21tb25sZW5ndGgpICsgZGlmZnNbcG9pbnRlcl1bMV07XG4gICAgICAgICAgICAgIHRleHRfaW5zZXJ0ID0gdGV4dF9pbnNlcnQuc3Vic3RyaW5nKDAsIHRleHRfaW5zZXJ0Lmxlbmd0aCAtIGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICAgIHRleHRfZGVsZXRlID0gdGV4dF9kZWxldGUuc3Vic3RyaW5nKDAsIHRleHRfZGVsZXRlLmxlbmd0aCAtIGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIERlbGV0ZSB0aGUgb2ZmZW5kaW5nIHJlY29yZHMgYW5kIGFkZCB0aGUgbWVyZ2VkIG9uZXMuXG4gICAgICAgICAgdmFyIG4gPSBjb3VudF9pbnNlcnQgKyBjb3VudF9kZWxldGU7XG4gICAgICAgICAgaWYgKHRleHRfZGVsZXRlLmxlbmd0aCA9PT0gMCAmJiB0ZXh0X2luc2VydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gbiwgbik7XG4gICAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciAtIG47XG4gICAgICAgICAgfSBlbHNlIGlmICh0ZXh0X2RlbGV0ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gbiwgbiwgW0RJRkZfSU5TRVJULCB0ZXh0X2luc2VydF0pO1xuICAgICAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIgLSBuICsgMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRleHRfaW5zZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIgLSBuLCBuLCBbRElGRl9ERUxFVEUsIHRleHRfZGVsZXRlXSk7XG4gICAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciAtIG4gKyAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciAtIG4sIG4sIFtESUZGX0RFTEVURSwgdGV4dF9kZWxldGVdLCBbRElGRl9JTlNFUlQsIHRleHRfaW5zZXJ0XSk7XG4gICAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciAtIG4gKyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocG9pbnRlciAhPT0gMCAmJiBkaWZmc1twb2ludGVyIC0gMV1bMF0gPT09IERJRkZfRVFVQUwpIHtcbiAgICAgICAgICAvLyBNZXJnZSB0aGlzIGVxdWFsaXR5IHdpdGggdGhlIHByZXZpb3VzIG9uZS5cbiAgICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0gKz0gZGlmZnNbcG9pbnRlcl1bMV07XG4gICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBjb3VudF9pbnNlcnQgPSAwO1xuICAgICAgICBjb3VudF9kZWxldGUgPSAwO1xuICAgICAgICB0ZXh0X2RlbGV0ZSA9ICcnO1xuICAgICAgICB0ZXh0X2luc2VydCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKGRpZmZzW2RpZmZzLmxlbmd0aCAtIDFdWzFdID09PSAnJykge1xuICAgIGRpZmZzLnBvcCgpOyAgLy8gUmVtb3ZlIHRoZSBkdW1teSBlbnRyeSBhdCB0aGUgZW5kLlxuICB9XG5cbiAgLy8gU2Vjb25kIHBhc3M6IGxvb2sgZm9yIHNpbmdsZSBlZGl0cyBzdXJyb3VuZGVkIG9uIGJvdGggc2lkZXMgYnkgZXF1YWxpdGllc1xuICAvLyB3aGljaCBjYW4gYmUgc2hpZnRlZCBzaWRld2F5cyB0byBlbGltaW5hdGUgYW4gZXF1YWxpdHkuXG4gIC8vIGUuZzogQTxpbnM+QkE8L2lucz5DIC0+IDxpbnM+QUI8L2lucz5BQ1xuICB2YXIgY2hhbmdlcyA9IGZhbHNlO1xuICBwb2ludGVyID0gMTtcbiAgLy8gSW50ZW50aW9uYWxseSBpZ25vcmUgdGhlIGZpcnN0IGFuZCBsYXN0IGVsZW1lbnQgKGRvbid0IG5lZWQgY2hlY2tpbmcpLlxuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCAtIDEpIHtcbiAgICBpZiAoZGlmZnNbcG9pbnRlciAtIDFdWzBdID09PSBESUZGX0VRVUFMICYmXG4gICAgICBkaWZmc1twb2ludGVyICsgMV1bMF0gPT09IERJRkZfRVFVQUwpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSBzaW5nbGUgZWRpdCBzdXJyb3VuZGVkIGJ5IGVxdWFsaXRpZXMuXG4gICAgICBpZiAoZGlmZnNbcG9pbnRlcl1bMV0uc3Vic3RyaW5nKGRpZmZzW3BvaW50ZXJdWzFdLmxlbmd0aCAtXG4gICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXS5sZW5ndGgpID09PSBkaWZmc1twb2ludGVyIC0gMV1bMV0pIHtcbiAgICAgICAgLy8gU2hpZnQgdGhlIGVkaXQgb3ZlciB0aGUgcHJldmlvdXMgZXF1YWxpdHkuXG4gICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdID0gZGlmZnNbcG9pbnRlciAtIDFdWzFdICtcbiAgICAgICAgICBkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoMCwgZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoIC1cbiAgICAgICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXS5sZW5ndGgpO1xuICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMV0gPSBkaWZmc1twb2ludGVyIC0gMV1bMV0gKyBkaWZmc1twb2ludGVyICsgMV1bMV07XG4gICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gMSwgMSk7XG4gICAgICAgIGNoYW5nZXMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoMCwgZGlmZnNbcG9pbnRlciArIDFdWzFdLmxlbmd0aCkgPT1cbiAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzFdKSB7XG4gICAgICAgIC8vIFNoaWZ0IHRoZSBlZGl0IG92ZXIgdGhlIG5leHQgZXF1YWxpdHkuXG4gICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXSArPSBkaWZmc1twb2ludGVyICsgMV1bMV07XG4gICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdID1cbiAgICAgICAgICBkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoZGlmZnNbcG9pbnRlciArIDFdWzFdLmxlbmd0aCkgK1xuICAgICAgICAgIGRpZmZzW3BvaW50ZXIgKyAxXVsxXTtcbiAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIgKyAxLCAxKTtcbiAgICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHBvaW50ZXIrKztcbiAgfVxuICAvLyBJZiBzaGlmdHMgd2VyZSBtYWRlLCB0aGUgZGlmZiBuZWVkcyByZW9yZGVyaW5nIGFuZCBhbm90aGVyIHNoaWZ0IHN3ZWVwLlxuICBpZiAoY2hhbmdlcykge1xuICAgIGRpZmZfY2xlYW51cE1lcmdlKGRpZmZzLCBmaXhfdW5pY29kZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGlzX3N1cnJvZ2F0ZV9wYWlyX3N0YXJ0KGNoYXJDb2RlKSB7XG4gIHJldHVybiBjaGFyQ29kZSA+PSAweEQ4MDAgJiYgY2hhckNvZGUgPD0gMHhEQkZGO1xufVxuXG5mdW5jdGlvbiBpc19zdXJyb2dhdGVfcGFpcl9lbmQoY2hhckNvZGUpIHtcbiAgcmV0dXJuIGNoYXJDb2RlID49IDB4REMwMCAmJiBjaGFyQ29kZSA8PSAweERGRkY7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0c193aXRoX3BhaXJfZW5kKHN0cikge1xuICByZXR1cm4gaXNfc3Vycm9nYXRlX3BhaXJfZW5kKHN0ci5jaGFyQ29kZUF0KDApKTtcbn1cblxuZnVuY3Rpb24gZW5kc193aXRoX3BhaXJfc3RhcnQoc3RyKSB7XG4gIHJldHVybiBpc19zdXJyb2dhdGVfcGFpcl9zdGFydChzdHIuY2hhckNvZGVBdChzdHIubGVuZ3RoIC0gMSkpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVfZW1wdHlfdHVwbGVzKHR1cGxlcykge1xuICB2YXIgcmV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHVwbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR1cGxlc1tpXVsxXS5sZW5ndGggPiAwKSB7XG4gICAgICByZXQucHVzaCh0dXBsZXNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBtYWtlX2VkaXRfc3BsaWNlKGJlZm9yZSwgb2xkTWlkZGxlLCBuZXdNaWRkbGUsIGFmdGVyKSB7XG4gIGlmIChlbmRzX3dpdGhfcGFpcl9zdGFydChiZWZvcmUpIHx8IHN0YXJ0c193aXRoX3BhaXJfZW5kKGFmdGVyKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiByZW1vdmVfZW1wdHlfdHVwbGVzKFtcbiAgICBbRElGRl9FUVVBTCwgYmVmb3JlXSxcbiAgICBbRElGRl9ERUxFVEUsIG9sZE1pZGRsZV0sXG4gICAgW0RJRkZfSU5TRVJULCBuZXdNaWRkbGVdLFxuICAgIFtESUZGX0VRVUFMLCBhZnRlcl1cbiAgXSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRfY3Vyc29yX2VkaXRfZGlmZihvbGRUZXh0LCBuZXdUZXh0LCBjdXJzb3JfcG9zKSB7XG4gIC8vIG5vdGU6IHRoaXMgcnVucyBhZnRlciBlcXVhbGl0eSBjaGVjayBoYXMgcnVsZWQgb3V0IGV4YWN0IGVxdWFsaXR5XG4gIHZhciBvbGRSYW5nZSA9IHR5cGVvZiBjdXJzb3JfcG9zID09PSAnbnVtYmVyJyA/XG4gICAgeyBpbmRleDogY3Vyc29yX3BvcywgbGVuZ3RoOiAwIH0gOiBjdXJzb3JfcG9zLm9sZFJhbmdlO1xuICB2YXIgbmV3UmFuZ2UgPSB0eXBlb2YgY3Vyc29yX3BvcyA9PT0gJ251bWJlcicgP1xuICAgIG51bGwgOiBjdXJzb3JfcG9zLm5ld1JhbmdlO1xuICAvLyB0YWtlIGludG8gYWNjb3VudCB0aGUgb2xkIGFuZCBuZXcgc2VsZWN0aW9uIHRvIGdlbmVyYXRlIHRoZSBiZXN0IGRpZmZcbiAgLy8gcG9zc2libGUgZm9yIGEgdGV4dCBlZGl0LiAgZm9yIGV4YW1wbGUsIGEgdGV4dCBjaGFuZ2UgZnJvbSBcInh4eFwiIHRvIFwieHhcIlxuICAvLyBjb3VsZCBiZSBhIGRlbGV0ZSBvciBmb3J3YXJkcy1kZWxldGUgb2YgYW55IG9uZSBvZiB0aGUgeCdzLCBvciB0aGVcbiAgLy8gcmVzdWx0IG9mIHNlbGVjdGluZyB0d28gb2YgdGhlIHgncyBhbmQgdHlwaW5nIFwieFwiLlxuICB2YXIgb2xkTGVuZ3RoID0gb2xkVGV4dC5sZW5ndGg7XG4gIHZhciBuZXdMZW5ndGggPSBuZXdUZXh0Lmxlbmd0aDtcbiAgaWYgKG9sZFJhbmdlLmxlbmd0aCA9PT0gMCAmJiAobmV3UmFuZ2UgPT09IG51bGwgfHwgbmV3UmFuZ2UubGVuZ3RoID09PSAwKSkge1xuICAgIC8vIHNlZSBpZiB3ZSBoYXZlIGFuIGluc2VydCBvciBkZWxldGUgYmVmb3JlIG9yIGFmdGVyIGN1cnNvclxuICAgIHZhciBvbGRDdXJzb3IgPSBvbGRSYW5nZS5pbmRleDtcbiAgICB2YXIgb2xkQmVmb3JlID0gb2xkVGV4dC5zbGljZSgwLCBvbGRDdXJzb3IpO1xuICAgIHZhciBvbGRBZnRlciA9IG9sZFRleHQuc2xpY2Uob2xkQ3Vyc29yKTtcbiAgICB2YXIgbWF5YmVOZXdDdXJzb3IgPSBuZXdSYW5nZSA/IG5ld1JhbmdlLmluZGV4IDogbnVsbDtcbiAgICBlZGl0QmVmb3JlOiB7XG4gICAgICAvLyBpcyB0aGlzIGFuIGluc2VydCBvciBkZWxldGUgcmlnaHQgYmVmb3JlIG9sZEN1cnNvcj9cbiAgICAgIHZhciBuZXdDdXJzb3IgPSBvbGRDdXJzb3IgKyBuZXdMZW5ndGggLSBvbGRMZW5ndGg7XG4gICAgICBpZiAobWF5YmVOZXdDdXJzb3IgIT09IG51bGwgJiYgbWF5YmVOZXdDdXJzb3IgIT09IG5ld0N1cnNvcikge1xuICAgICAgICBicmVhayBlZGl0QmVmb3JlO1xuICAgICAgfVxuICAgICAgaWYgKG5ld0N1cnNvciA8IDAgfHwgbmV3Q3Vyc29yID4gbmV3TGVuZ3RoKSB7XG4gICAgICAgIGJyZWFrIGVkaXRCZWZvcmU7XG4gICAgICB9XG4gICAgICB2YXIgbmV3QmVmb3JlID0gbmV3VGV4dC5zbGljZSgwLCBuZXdDdXJzb3IpO1xuICAgICAgdmFyIG5ld0FmdGVyID0gbmV3VGV4dC5zbGljZShuZXdDdXJzb3IpO1xuICAgICAgaWYgKG5ld0FmdGVyICE9PSBvbGRBZnRlcikge1xuICAgICAgICBicmVhayBlZGl0QmVmb3JlO1xuICAgICAgfVxuICAgICAgdmFyIHByZWZpeExlbmd0aCA9IE1hdGgubWluKG9sZEN1cnNvciwgbmV3Q3Vyc29yKTtcbiAgICAgIHZhciBvbGRQcmVmaXggPSBvbGRCZWZvcmUuc2xpY2UoMCwgcHJlZml4TGVuZ3RoKTtcbiAgICAgIHZhciBuZXdQcmVmaXggPSBuZXdCZWZvcmUuc2xpY2UoMCwgcHJlZml4TGVuZ3RoKTtcbiAgICAgIGlmIChvbGRQcmVmaXggIT09IG5ld1ByZWZpeCkge1xuICAgICAgICBicmVhayBlZGl0QmVmb3JlO1xuICAgICAgfVxuICAgICAgdmFyIG9sZE1pZGRsZSA9IG9sZEJlZm9yZS5zbGljZShwcmVmaXhMZW5ndGgpO1xuICAgICAgdmFyIG5ld01pZGRsZSA9IG5ld0JlZm9yZS5zbGljZShwcmVmaXhMZW5ndGgpO1xuICAgICAgcmV0dXJuIG1ha2VfZWRpdF9zcGxpY2Uob2xkUHJlZml4LCBvbGRNaWRkbGUsIG5ld01pZGRsZSwgb2xkQWZ0ZXIpO1xuICAgIH1cbiAgICBlZGl0QWZ0ZXI6IHtcbiAgICAgIC8vIGlzIHRoaXMgYW4gaW5zZXJ0IG9yIGRlbGV0ZSByaWdodCBhZnRlciBvbGRDdXJzb3I/XG4gICAgICBpZiAobWF5YmVOZXdDdXJzb3IgIT09IG51bGwgJiYgbWF5YmVOZXdDdXJzb3IgIT09IG9sZEN1cnNvcikge1xuICAgICAgICBicmVhayBlZGl0QWZ0ZXI7XG4gICAgICB9XG4gICAgICB2YXIgY3Vyc29yID0gb2xkQ3Vyc29yO1xuICAgICAgdmFyIG5ld0JlZm9yZSA9IG5ld1RleHQuc2xpY2UoMCwgY3Vyc29yKTtcbiAgICAgIHZhciBuZXdBZnRlciA9IG5ld1RleHQuc2xpY2UoY3Vyc29yKTtcbiAgICAgIGlmIChuZXdCZWZvcmUgIT09IG9sZEJlZm9yZSkge1xuICAgICAgICBicmVhayBlZGl0QWZ0ZXI7XG4gICAgICB9XG4gICAgICB2YXIgc3VmZml4TGVuZ3RoID0gTWF0aC5taW4ob2xkTGVuZ3RoIC0gY3Vyc29yLCBuZXdMZW5ndGggLSBjdXJzb3IpO1xuICAgICAgdmFyIG9sZFN1ZmZpeCA9IG9sZEFmdGVyLnNsaWNlKG9sZEFmdGVyLmxlbmd0aCAtIHN1ZmZpeExlbmd0aCk7XG4gICAgICB2YXIgbmV3U3VmZml4ID0gbmV3QWZ0ZXIuc2xpY2UobmV3QWZ0ZXIubGVuZ3RoIC0gc3VmZml4TGVuZ3RoKTtcbiAgICAgIGlmIChvbGRTdWZmaXggIT09IG5ld1N1ZmZpeCkge1xuICAgICAgICBicmVhayBlZGl0QWZ0ZXI7XG4gICAgICB9XG4gICAgICB2YXIgb2xkTWlkZGxlID0gb2xkQWZ0ZXIuc2xpY2UoMCwgb2xkQWZ0ZXIubGVuZ3RoIC0gc3VmZml4TGVuZ3RoKTtcbiAgICAgIHZhciBuZXdNaWRkbGUgPSBuZXdBZnRlci5zbGljZSgwLCBuZXdBZnRlci5sZW5ndGggLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgcmV0dXJuIG1ha2VfZWRpdF9zcGxpY2Uob2xkQmVmb3JlLCBvbGRNaWRkbGUsIG5ld01pZGRsZSwgb2xkU3VmZml4KTtcbiAgICB9XG4gIH1cbiAgaWYgKG9sZFJhbmdlLmxlbmd0aCA+IDAgJiYgbmV3UmFuZ2UgJiYgbmV3UmFuZ2UubGVuZ3RoID09PSAwKSB7XG4gICAgcmVwbGFjZVJhbmdlOiB7XG4gICAgICAvLyBzZWUgaWYgZGlmZiBjb3VsZCBiZSBhIHNwbGljZSBvZiB0aGUgb2xkIHNlbGVjdGlvbiByYW5nZVxuICAgICAgdmFyIG9sZFByZWZpeCA9IG9sZFRleHQuc2xpY2UoMCwgb2xkUmFuZ2UuaW5kZXgpO1xuICAgICAgdmFyIG9sZFN1ZmZpeCA9IG9sZFRleHQuc2xpY2Uob2xkUmFuZ2UuaW5kZXggKyBvbGRSYW5nZS5sZW5ndGgpO1xuICAgICAgdmFyIHByZWZpeExlbmd0aCA9IG9sZFByZWZpeC5sZW5ndGg7XG4gICAgICB2YXIgc3VmZml4TGVuZ3RoID0gb2xkU3VmZml4Lmxlbmd0aDtcbiAgICAgIGlmIChuZXdMZW5ndGggPCBwcmVmaXhMZW5ndGggKyBzdWZmaXhMZW5ndGgpIHtcbiAgICAgICAgYnJlYWsgcmVwbGFjZVJhbmdlO1xuICAgICAgfVxuICAgICAgdmFyIG5ld1ByZWZpeCA9IG5ld1RleHQuc2xpY2UoMCwgcHJlZml4TGVuZ3RoKTtcbiAgICAgIHZhciBuZXdTdWZmaXggPSBuZXdUZXh0LnNsaWNlKG5ld0xlbmd0aCAtIHN1ZmZpeExlbmd0aCk7XG4gICAgICBpZiAob2xkUHJlZml4ICE9PSBuZXdQcmVmaXggfHwgb2xkU3VmZml4ICE9PSBuZXdTdWZmaXgpIHtcbiAgICAgICAgYnJlYWsgcmVwbGFjZVJhbmdlO1xuICAgICAgfVxuICAgICAgdmFyIG9sZE1pZGRsZSA9IG9sZFRleHQuc2xpY2UocHJlZml4TGVuZ3RoLCBvbGRMZW5ndGggLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgdmFyIG5ld01pZGRsZSA9IG5ld1RleHQuc2xpY2UocHJlZml4TGVuZ3RoLCBuZXdMZW5ndGggLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgcmV0dXJuIG1ha2VfZWRpdF9zcGxpY2Uob2xkUHJlZml4LCBvbGRNaWRkbGUsIG5ld01pZGRsZSwgb2xkU3VmZml4KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZGlmZih0ZXh0MSwgdGV4dDIsIGN1cnNvcl9wb3MpIHtcbiAgLy8gb25seSBwYXNzIGZpeF91bmljb2RlPXRydWUgYXQgdGhlIHRvcCBsZXZlbCwgbm90IHdoZW4gZGlmZl9tYWluIGlzXG4gIC8vIHJlY3Vyc2l2ZWx5IGludm9rZWRcbiAgcmV0dXJuIGRpZmZfbWFpbih0ZXh0MSwgdGV4dDIsIGN1cnNvcl9wb3MsIHRydWUpO1xufVxuXG5kaWZmLklOU0VSVCA9IERJRkZfSU5TRVJUO1xuZGlmZi5ERUxFVEUgPSBESUZGX0RFTEVURTtcbmRpZmYuRVFVQUwgPSBESUZGX0VRVUFMO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRpZmY7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGlmZiA9IHJlcXVpcmUoJ2Zhc3QtZGlmZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgcmV2aXNpb24pIHtcbiAgdmFyIHJlc3VsdCA9IGRpZmYob3JpZ2luYWwsIHJldmlzaW9uKTtcbiAgLy8gQWNjb3JkaW5nIHRvIGxhdGVzdCBqc3BlcmYgdGVzdHMsIHRoZXJlJ3Mgbm8gbmVlZCB0byBjYWNoZSBhcnJheSBsZW5ndGhcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHJlc3VsdFtpXTtcbiAgICAvLyBJZiBvcGVyYXRpb24gaXMgREVMRVRFIG9yIEVRVUFMLCByZXBsYWNlIHRoZSBhY3R1YWwgdGV4dCBieSBpdHMgbGVuZ3RoXG4gICAgaWYgKGl0ZW1bMF0gPCAxKSB7XG4gICAgICBpdGVtWzFdID0gaXRlbVsxXS5sZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQTtBQUFBO0FBK0JBLFFBQUksY0FBYztBQUNsQixRQUFJLGNBQWM7QUFDbEIsUUFBSSxhQUFhO0FBV2pCLHVCQUFtQixPQUFPLE9B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
