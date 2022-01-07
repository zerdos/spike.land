var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/textdiff-patch/index.js
var require_textdiff_patch = __commonJS({
  "../../node_modules/textdiff-patch/index.js"(exports, module) {
    "use strict";
    module.exports = function(original, delta) {
      var result = "", index = 0;
      for (var i = 0; i < delta.length; i++) {
        var item = delta[i], operation = item[0], value = item[1];
        if (operation == -1) {
          index += value;
        } else if (operation == 0) {
          result += original.slice(index, index += value);
        } else {
          result += value;
        }
      }
      return result;
    };
  }
});

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
    "use strict";
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

// ../../packages/code/package.json
var version = "0.6.19";

// ../../packages/cf-npm-site/dist/index.mjs
function src_default(packageName, version2, serveDir = "") {
  return async function(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version2}${serveDir ? `/${serveDir}` : ``}${pathname}`;
      let myCache = await caches.open(`blog-npm:${version2}-${serveDir}`);
      const cachedResp = await myCache.match(request, {});
      if (cachedResp) {
        return cachedResp;
      }
      let targetPath = uri;
      if (uri.endsWith("/")) {
        targetPath = `${uri}index.html`;
      } else if (pathname.indexOf(".") === -1) {
        targetPath = `${uri}/index.html`;
      }
      const reqCloned = request.clone();
      const newReq = new Request(`https://unpkg.com/${packageName}${targetPath}`, {
        headers: {
          ...reqCloned.headers
        }
      });
      const origResp = await fetch(newReq);
      if (!origResp.ok)
        return origResp;
      const cloned = origResp.clone();
      const resp = new Response(cloned.body, {
        headers: {
          ...cloned.headers,
          "Cache-Control": "no-cache"
        }
      });
      if (pathname.endsWith(".mjs") || pathname.endsWith(".js") || pathname.endsWith(".ts") || pathname.endsWith(".tsx")) {
        resp.headers.delete("content-type");
        resp.headers.set("content-type", "text/javascript;charset=UTF-8");
      } else if (pathname.endsWith(".css")) {
        resp.headers.delete("content-type");
        resp.headers.set("content-type", "text/css;charset=UTF-8");
      } else if (pathname.endsWith(".json")) {
        resp.headers.delete("content-type");
        resp.headers.set("content-type", "application/json;charset=UTF-8");
      } else if (pathname.endsWith(".jpg")) {
        resp.headers.delete("content-type");
        resp.headers.set("content-type", "image/jpeg");
      } else if (pathname.indexOf(".") === -1 || pathname.endsWith(".html")) {
        resp.headers.delete("content-type"), resp.headers.set("content-type", "text/html;charset=UTF-8");
      }
      if (origResp.status === 200)
        myCache.put(request, resp.clone());
      return resp;
    } catch (Error2) {
      return new Response(`No... ${Object.prototype.toString.call(Error2)}`);
    }
  };
}

// src/handleErrors.ts
async function handleErrors(request, func) {
  try {
    return await func();
  } catch (err) {
    if (request.headers.get("Upgrade") === "websocket") {
      let stack = null;
      if (err instanceof Error) {
        stack = err.stack;
        console.log({ error: err.stack, message: err.message });
      }
      let pair = new WebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, { status: 101, webSocket: pair[0] });
    } else {
      let stack = "We have no idea what happened";
      if (err instanceof Error) {
        stack = err.stack || stack;
        console.log({ error: err.stack, message: err.message });
      }
      return new Response(stack, { status: 500 });
    }
  }
}

// src/chat.ts
var chat_default = {
  async fetch(request, env) {
    return handleErrors(request, async () => {
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        return getHTMLResp(env, "code-main");
      }
      switch (path[0]) {
        case "ping":
          return new Response("ping" + Math.random(), {
            headers: {
              "Content-Type": "text/html;charset=UTF-8",
              "Cache-Control": "no-cache"
            }
          });
        case "api":
          return handleApiRequest(path.slice(1), request, env);
        case "live":
          return getHTMLResp(env, path[1]);
        default:
          return src_default("@spike.land/code", version, "js/")(request, env);
      }
    });
  }
};
async function handleApiRequest(path, request, env) {
  switch (path[0]) {
    case "room": {
      if (!path[1]) {
        if (request.method === "POST") {
          let id2 = env.CODE.newUniqueId();
          return new Response(id2.toString(), {
            headers: { "Access-Control-Allow-Origin": "*" }
          });
        } else {
          return new Response("Method not allowed", { status: 405 });
        }
      }
      let name = path[1];
      let id;
      if (name.match(/^[0-9a-f]{64}$/)) {
        id = env.CODE.idFromString(name);
      } else if (name.length <= 32) {
        id = env.CODE.idFromName(name);
      } else {
        return new Response("Name too long", { status: 404 });
      }
      let roomObject = env.CODE.get(id);
      let newUrl = new URL(request.url);
      newUrl.pathname = "/" + path.slice(2).join("/");
      newUrl.searchParams.append("room", name);
      return roomObject.fetch(newUrl.toString(), request);
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}
async function getHTMLResp(env, room) {
  const id = env.CODE.idFromName(room);
  let roomObject = env.CODE.get(id);
  return roomObject.fetch("public");
}

// src/rateLimiterClient.ts
var RateLimiterClient = class {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.limiter = getLimiterStub();
    this.inCoolDown = false;
  }
  limiter;
  inCoolDown;
  checkLimit() {
    if (this.inCoolDown) {
      return false;
    }
    this.inCoolDown = true;
    this.callLimiter();
    return true;
  }
  async callLimiter() {
    try {
      let response;
      try {
        response = await this.limiter.fetch(new Request("https://dummy-url", {
          method: "POST"
        }));
      } catch (err) {
        this.limiter = this.getLimiterStub();
        response = await this.limiter.fetch(new Request("https://dummy-url", {
          method: "POST"
        }));
      }
      let coolDown = +await response.text();
      await new Promise((resolve) => setTimeout(resolve, coolDown * 100));
      this.inCoolDown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
};

// src/index.html
var src_default2 = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width" />
  <base href="https://spike.land/">
  
  <link rel="icon" type="image/png" href="https://unpkg.com/@spike.land/code@{VERSION}/js/assets/zed-icon-big.png" />

  <link rel="stylesheet" href="https://unpkg.com/@spike.land/code@{VERSION}/js/assets/app.css" />

  <script crossorigin src="https://unpkg.com/react@18.0.0-rc.0-next-fe419346d-20220105/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-is@18.0.0-rc.0-next-fe419346d-20220105/umd/react-is.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@18.0.0-rc.0-next-fe419346d-20220105/umd/react-dom.production.min.js"><\/script>

  <script crossorigin src="https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.umd.min.js"><\/script>
  <script>
    let transform = null;
   window.esmsInitOptions = {
 shimMode: true,
 polyfillEnable: ['css-modules', 'json-modules'],
 onerror: error => console.log(error), // defaults to \`((e) => { throw e; })\`
 fetch: async function (url, options) {
   const urlEnd = url.substr(-3);
   if ((url.indexOf("monaco") === -1) && (["tsx", ".ts"].indexOf(urlEnd)!==-1)) {   
     console.log(url);
     const res = await fetch(url, options);
    if (!res.ok) return res;

       const source = await res.text();
       
       transform = transform || (await import("https://unpkg.com/@spike.land/code@{VERSION}/js/esbuildEsm.mjs")).transform;
       const transformed = await transform(source);
       return new Response(new Blob([transformed], { type: 'application/javascript' }));
   }
 return fetch(url, options);

 },
 noLoadEventRetriggers: true,
 skip: "/^https?:\\/\\/(cdn\\.skypack\\.dev|jspm\\.dev)\\//\`"
    } <\/script>
  <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.1/dist/es-module-shims.wasm.js"><\/script>
  <title>Instant React Editor</title>

</style>

		<link
			data-name="vs/editor/editor.main"
			rel="stylesheet"
			href="https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css"
		/>
</head>
<body>
  <div id="root"></div>
  <div id="shadowEditor"></div>
  <script type="importmap-shim" src="https://unpkg.com/@spike.land/code@{VERSION}/js/importmap.json"><\/script>
  <script>
  window.process = { env: { NODE_ENV: "production" } };
<\/script>
  <script type="module-shim">
    import app from "https://unpkg.com/@spike.land/code@{VERSION}/js/starter.mjs";
    app();

    if ('serviceWorker' in navigator){
      const {Workbox} = await import('workbox-window')
        const wb = new Workbox('/sw.js');
          wb.addEventListener("activated", async (event) => {
             if (!event.isUpdate) {
              console.log("Service worker activated for the first time!");
             }
          });
          wb.register();
      }
    <\/script>
</body>
</html>`;

// src/lazy.html
var lazy_default = 'var{React:t}=window,{Suspense:C}=t,b=({name:o,html:c,hash:a,transpiled:l})=>{let[i,p]=t.useState(a);t.useEffect(()=>{let n=setInterval(async()=>{let s=await(await fetch(`https://spike.land/api/room/${o}/hashCodeSession`)).text();p(Number(s))},69e3);return()=>{console.log("INTERVAL CLEARED"),clearInterval(n)}},[]),t.useEffect(()=>{(async()=>{let n=await fetch(`https://spike.land/api/room/${o}/session`),{html:e,css:s,transpiled:L}=await n.json();u({htmlContent:`<div id="root"><style>${s}</style><div id="zbody">${e}</div></div>`,LazyComponent:await y(L)})})()},[i]);let d=t.lazy(()=>import(r(l))),[{htmlContent:m,LazyComponent:h},u]=t.useState({htmlContent:c,LazyComponent:d});return t.createElement(C,{key:i,fallback:t.createElement("div",{dangerouslySetInnerHTML:{__html:m}})},t.createElement(h,{key:a}));function r(n){let e=new Blob([n],{type:"application/javascript"});return URL.createObjectURL(e)}async function y(n){let e=r(n),s=(await import(e)).default;return URL.revokeObjectURL(e),s}},f=o=>t.createElement(b,{...o});export{f as default};\n';

// src/rca.tsx.html
var rca_tsx_default = '/** @jsx jsx */\nimport { css, jsx } from "@emotion/react";\n\nimport { motion } from "framer-motion";\n\nexport default () => (\n  <header\n    css={css`\n      background-color: #282c34;\n      min-height: 100vh;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: calc(10px + 2vmin);\n      color: white;\n      text-align: center;\n      overflow: hidden;\n    `}\n  >\n    <motion.div\n      animate={{ rotate: 360 }}\n      transition={{\n        repeat: 0,\n        duration: 2,\n        repeatType: "loop",\n      }}\n    >\n      <div css="font-size: calc(10px + 20vmin)">|\u{1F525}|</div>\n      -------------------\n    </motion.div>\n    <p>\n      Hey! Try to modify <code>this</code> page.\n    </p>\n\n    <a css="color: #61dafb;" href="./edit/">\n      Open the editor.\n    </a>\n  </header>\n);\n';

// src/hydrated.html
var hydrated_default = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width" />

  <base href="https://spike.land/">

  <script crossorigin src="https://unpkg.com/react@18.0.0-rc.0-next-fe419346d-20220105/umd/react.production.min.js"><\/script>
    <!-- <script crossorigin src="https://unpkg.com/react-is@18.0.0-rc.0-next-fe419346d-20220105/umd/react-is.production.min.js"><\/script> -->
  <script crossorigin src="https://unpkg.com/react-dom@18.0.0-rc.0-next-fe419346d-20220105/umd/react-dom.production.min.js"><\/script>

  <script crossorigin src="https://unpkg.com/@emotion/react@11.7.1/dist/emotion-react.umd.min.js"><\/script>
<script>
     let transform = null;
    window.esmsInitOptions = {
  shimMode: true,
  polyfillEnable: ['css-modules', 'json-modules'],
  onerror: error => console.log(error), // defaults to \`((e) => { throw e; })\`
  fetch: async function (url, options) {
    const urlEnd = url.substr(-3);
    if (url.indexOf("monaco")===-1 && ["tsx", ".ts"].indexOf(urlEnd)!==-1) {   
      console.log(url);
      const res = await fetch(url, options);
     if (!res.ok) return res;

        const source = await res.text();
        
        transform = transform || (await import("./esbuildEsm.mjs")).transform;
        const transformed = await transform(source);
        return new Response(new Blob([transformed], { type: 'application/javascript' }));
    }
  return fetch(url, options);

  },
  noLoadEventRetriggers: true,
  skip: "/^https?:\\/\\/(cdn\\.skypack\\.dev|jspm\\.dev)\\//\`"
     } <\/script>
     <style>
       html,
body,
#root,
#zbody {
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  margin: 0;

}

     </style>
  <script async src="https://unpkg.com/@spike.land/code@0.4.42/js/vendor/es-module-shims.wasm.js"><\/script>
  <title>Instant React Editor</title>
  

</head>
<body>
  <div id="root"></div>
  <script type="importmap-shim" src="https://unpkg.com/@spike.land/code@{VERSION}/js/importmap.json"><\/script>
  <script>
  window.process = { env: { NODE_ENV: "production" } };
<\/script>
<script type="module-shim">
   
    import app from "./starter.mjs";
    app();

  <\/script>
 
</body>
</html>`;

// ../../packages/code/js/importmap.json
var imports = {
  "@emotion/cache": "https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js",
  "@emotion/react": "https://unpkg.com/@spike.land/esm@0.6.9/dist/emotion-react.mjs",
  "@mui/material/Button": "https://ga.jspm.io/npm:@mui/material@5.2.7/Button/index.js",
  "@mui/material/Fab": "https://ga.jspm.io/npm:@mui/material@5.2.7/Fab/index.js",
  "@mui/material/ToggleButton": "https://ga.jspm.io/npm:@mui/material@5.2.7/ToggleButton/index.js",
  "@mui/material/ToggleButtonGroup": "https://ga.jspm.io/npm:@mui/material@5.2.7/ToggleButtonGroup/index.js",
  "@mui/material/utils/createSvgIcon": "https://ga.jspm.io/npm:@mui/material@5.2.7/utils/createSvgIcon.js",
  "async-mutex": "https://ga.jspm.io/npm:async-mutex@0.3.2/index.mjs",
  comlink: "https://ga.jspm.io/npm:comlink@4.3.1/dist/umd/comlink.js",
  immutable: "https://ga.jspm.io/npm:immutable@4.0.0/dist/immutable.es.js",
  "lodash/throttle": "https://ga.jspm.io/npm:lodash@4.17.21/throttle.js",
  react: "https://unpkg.com/@spike.land/esm@0.6.9/dist/react.mjs",
  "react-dom": "https://unpkg.com/@spike.land/esm@0.6.9/dist/react-dom.mjs",
  "react-dom/server": "https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-fe419346d-20220105/server.browser.js",
  "react/jsx-runtime": "https://ga.jspm.io/npm:react@18.0.0-rc.0-next-fe419346d-20220105/jsx-runtime.js",
  "workbox-window": "https://ga.jspm.io/npm:workbox-window@6.4.2/build/workbox-window.prod.es5.mjs",
  "framer-motion": "https://unpkg.com/@spike.land/esm@0.6.9/dist/framer-motion.mjs",
  "textdiff-create": "https://unpkg.com/@spike.land/esm@0.6.9/dist/textdiff-create.mjs",
  "textdiff-patch": "https://unpkg.com/@spike.land/esm@0.6.9/dist/textdiff-patch.mjs"
};
var scopes = {
  "https://ga.jspm.io/": {
    "#FormControlUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/FormControlUnstyled/index.js",
    "#GlobalStyles": "https://ga.jspm.io/npm:@mui/styled-engine@5.2.6/GlobalStyles/index.js",
    "#StyledEngineProvider": "https://ga.jspm.io/npm:@mui/styled-engine@5.2.6/StyledEngineProvider/index.js",
    "#TabPanelUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/TabPanelUnstyled/index.js",
    "#generateUtilityClasses": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/generateUtilityClasses/index.js",
    "#utils": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/utils/index.js",
    "@babel/runtime/helpers/esm/assertThisInitialized": "https://ga.jspm.io/npm:@babel/runtime@7.16.7/helpers/esm/assertThisInitialized.js",
    "@babel/runtime/helpers/esm/extends": "https://ga.jspm.io/npm:@babel/runtime@7.16.7/helpers/esm/extends.js",
    "@babel/runtime/helpers/esm/inheritsLoose": "https://ga.jspm.io/npm:@babel/runtime@7.16.7/helpers/esm/inheritsLoose.js",
    "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose": "https://ga.jspm.io/npm:@babel/runtime@7.16.7/helpers/esm/objectWithoutPropertiesLoose.js",
    "@babel/runtime/helpers/extends": "https://ga.jspm.io/npm:@babel/runtime@7.16.7/helpers/esm/extends.js",
    "@emotion/hash": "https://ga.jspm.io/npm:@emotion/hash@0.8.0/dist/hash.browser.esm.js",
    "@emotion/is-prop-valid": "https://ga.jspm.io/npm:@emotion/is-prop-valid@1.1.1/dist/emotion-is-prop-valid.browser.esm.js",
    "@emotion/memoize": "https://ga.jspm.io/npm:@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
    "@emotion/serialize": "https://ga.jspm.io/npm:@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
    "@emotion/sheet": "https://ga.jspm.io/npm:@emotion/sheet@1.1.0/dist/emotion-sheet.browser.esm.js",
    "@emotion/styled": "https://ga.jspm.io/npm:@emotion/styled@11.6.0/dist/emotion-styled.browser.esm.js",
    "@emotion/unitless": "https://ga.jspm.io/npm:@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
    "@emotion/utils": "https://ga.jspm.io/npm:@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
    "@emotion/weak-memoize": "https://ga.jspm.io/npm:@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
    "@mui/base": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/index.js",
    "@mui/base/AutocompleteUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/AutocompleteUnstyled/index.js",
    "@mui/base/BackdropUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/BackdropUnstyled/index.js",
    "@mui/base/BadgeUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/BadgeUnstyled/index.js",
    "@mui/base/ButtonUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/ButtonUnstyled/index.js",
    "@mui/base/ClickAwayListener": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/ClickAwayListener/index.js",
    "@mui/base/InputUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/InputUnstyled/index.js",
    "@mui/base/ModalUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/ModalUnstyled/index.js",
    "@mui/base/NoSsr": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/NoSsr/index.js",
    "@mui/base/PopperUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/PopperUnstyled/index.js",
    "@mui/base/Portal": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/Portal/index.js",
    "@mui/base/SliderUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/SliderUnstyled/index.js",
    "@mui/base/SwitchUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/SwitchUnstyled/index.js",
    "@mui/base/TabUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/TabUnstyled/index.js",
    "@mui/base/TabsListUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/TabsListUnstyled/index.js",
    "@mui/base/TabsUnstyled": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/TabsUnstyled/index.js",
    "@mui/base/TextareaAutosize": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/TextareaAutosize/index.js",
    "@mui/base/Unstable_TrapFocus": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/Unstable_TrapFocus/index.js",
    "@mui/base/composeClasses": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/composeClasses/index.js",
    "@mui/base/generateUtilityClass": "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/generateUtilityClass/index.js",
    "@mui/material/ButtonBase": "https://ga.jspm.io/npm:@mui/material@5.2.7/ButtonBase/index.js",
    "@mui/material/SvgIcon": "https://ga.jspm.io/npm:@mui/material@5.2.7/SvgIcon/index.js",
    "@mui/material/styles": "https://ga.jspm.io/npm:@mui/material@5.2.7/styles/index.js",
    "@mui/private-theming": "https://ga.jspm.io/npm:@mui/private-theming@5.2.3/index.js",
    "@mui/private-theming/ThemeProvider": "https://ga.jspm.io/npm:@mui/private-theming@5.2.3/ThemeProvider/index.js",
    "@mui/private-theming/useTheme": "https://ga.jspm.io/npm:@mui/private-theming@5.2.3/useTheme/index.js",
    "@mui/styled-engine": "https://ga.jspm.io/npm:@mui/styled-engine@5.2.6/index.js",
    "@mui/system": "https://ga.jspm.io/npm:@mui/system@5.2.6/esm/index.js",
    "@mui/utils": "https://ga.jspm.io/npm:@mui/utils@5.2.3/esm/index.js",
    "@popperjs/core": "https://ga.jspm.io/npm:@popperjs/core@2.11.2/lib/index.js",
    clsx: "https://ga.jspm.io/npm:clsx@1.1.1/dist/clsx.m.js",
    "dom-helpers/addClass": "https://ga.jspm.io/npm:dom-helpers@5.2.0/esm/addClass.js",
    "dom-helpers/removeClass": "https://ga.jspm.io/npm:dom-helpers@5.2.0/esm/removeClass.js",
    "hoist-non-react-statics": "https://ga.jspm.io/npm:hoist-non-react-statics@3.3.2/dist/hoist-non-react-statics.cjs.js",
    "object-assign": "https://ga.jspm.io/npm:object-assign@4.1.1/index.js",
    process: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.14/nodelibs/browser/process-production.js",
    "prop-types": "https://ga.jspm.io/npm:prop-types@15.8.0/index.js",
    "react-is": "https://ga.jspm.io/npm:react-is@16.13.1/index.js",
    "react-transition-group": "https://ga.jspm.io/npm:react-transition-group@4.4.2/esm/index.js",
    "react/jsx-runtime": "https://ga.jspm.io/npm:react@17.0.2/jsx-runtime.js",
    scheduler: "https://ga.jspm.io/npm:scheduler@0.21.0-rc.0-next-fe419346d-20220105/index.js",
    stylis: "https://ga.jspm.io/npm:stylis@4.0.13/index.js"
  },
  "https://ga.jspm.io/npm:@mui/base@5.0.0-alpha.63/": {
    "react-is": "https://ga.jspm.io/npm:react-is@17.0.2/index.js"
  },
  "https://ga.jspm.io/npm:@mui/material@5.2.7/": {
    "react-is": "https://ga.jspm.io/npm:react-is@17.0.2/index.js"
  },
  "https://ga.jspm.io/npm:@mui/utils@5.2.3/": {
    "react-is": "https://ga.jspm.io/npm:react-is@17.0.2/index.js"
  }
};
var importmap_default = {
  imports,
  scopes
};

// src/chatRoom.ts
var import_textdiff_patch2 = __toESM(require_textdiff_patch());

// ../../node_modules/immutable/dist/immutable.es.js
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
var KeyedCollection = /* @__PURE__ */ function(Collection3) {
  function KeyedCollection2(value) {
    return isKeyed(value) ? value : KeyedSeq(value);
  }
  if (Collection3)
    KeyedCollection2.__proto__ = Collection3;
  KeyedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  KeyedCollection2.prototype.constructor = KeyedCollection2;
  return KeyedCollection2;
}(Collection);
var IndexedCollection = /* @__PURE__ */ function(Collection3) {
  function IndexedCollection2(value) {
    return isIndexed(value) ? value : IndexedSeq(value);
  }
  if (Collection3)
    IndexedCollection2.__proto__ = Collection3;
  IndexedCollection2.prototype = Object.create(Collection3 && Collection3.prototype);
  IndexedCollection2.prototype.constructor = IndexedCollection2;
  return IndexedCollection2;
}(Collection);
var SetCollection = /* @__PURE__ */ function(Collection3) {
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
var Seq = /* @__PURE__ */ function(Collection3) {
  function Seq2(value) {
    return value === null || value === void 0 ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
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
var KeyedSeq = /* @__PURE__ */ function(Seq2) {
  function KeyedSeq2(value) {
    return value === null || value === void 0 ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
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
var IndexedSeq = /* @__PURE__ */ function(Seq2) {
  function IndexedSeq2(value) {
    return value === null || value === void 0 ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
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
var SetSeq = /* @__PURE__ */ function(Seq2) {
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
var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
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
var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
  function ObjectSeq2(object) {
    var keys2 = Object.keys(object);
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
var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
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
var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
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
var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
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
var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
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
var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
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
var Map = /* @__PURE__ */ function(KeyedCollection2) {
  function Map2(value) {
    return value === null || value === void 0 ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
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
var MapIterator = /* @__PURE__ */ function(Iterator3) {
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
var List = /* @__PURE__ */ function(IndexedCollection2) {
  function List2(value) {
    var empty = emptyList();
    if (value === null || value === void 0) {
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
var OrderedMap = /* @__PURE__ */ function(Map2) {
  function OrderedMap2(value) {
    return value === null || value === void 0 ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
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
var Stack = /* @__PURE__ */ function(IndexedCollection2) {
  function Stack2(value) {
    return value === null || value === void 0 ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
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
var Set = /* @__PURE__ */ function(SetCollection2) {
  function Set2(value) {
    return value === null || value === void 0 ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set3) {
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
var Range = /* @__PURE__ */ function(IndexedSeq2) {
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
  var h = ordered ? 1 : 0;
  var size = collection.__iterate(keyed ? ordered ? function(v, k) {
    h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
  } : function(v, k) {
    h = h + hashMerge(hash(v), hash(k)) | 0;
  } : ordered ? function(v) {
    h = 31 * h + hash(v) | 0;
  } : function(v) {
    h = h + hash(v) | 0;
  });
  return murmurHashOfSize(size, h);
}
function murmurHashOfSize(size, h) {
  h = imul(h, 3432918353);
  h = imul(h << 15 | h >>> -15, 461845907);
  h = imul(h << 13 | h >>> -13, 5);
  h = (h + 3864292196 | 0) ^ size;
  h = imul(h ^ h >>> 16, 2246822507);
  h = imul(h ^ h >>> 13, 3266489909);
  h = smi(h ^ h >>> 16);
  return h;
}
function hashMerge(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
}
var OrderedSet = /* @__PURE__ */ function(Set2) {
  function OrderedSet2(value) {
    return value === null || value === void 0 ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set3) {
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
  var str = recordName(this) + " { ";
  var keys2 = this._keys;
  var k;
  for (var i = 0, l = keys2.length; i !== l; i++) {
    k = keys2[i];
    str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
  }
  return str + " }";
};
Record.prototype.equals = function equals2(other) {
  return this === other || other && recordSeq(this).equals(recordSeq(other));
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

// ../../packages/code/js/session.tsx
var import_textdiff_create = __toESM(require_textdiff_create());
var import_textdiff_patch = __toESM(require_textdiff_patch());
function initSession(room, u) {
  return Record({ ...u, room, state: Record(u.state)() });
}
var hashStore = {};
var CodeSession = class {
  session;
  hashCodeSession;
  room = "";
  created = new Date().toISOString();
  constructor(room, user) {
    const savedState = null;
    this.room = room;
    this.session = initSession(room, {
      ...user,
      state: savedState ? savedState : user.state,
      capabilities: {
        ...user.capabilities,
        sessionStorage: storageAvailable("sessionStorage")
      }
    })();
    this.hashCodeSession = this.session.get("state").hashCode();
    hashStore[this.session.get("state").hashCode()] = this.session.get("state");
  }
  addEvent(e) {
    this.session.get("events").push({
      ...e
    });
    setTimeout(() => this.processEvents);
  }
  hashCode() {
    return this.session.get("state").hashCode();
  }
  processEvents() {
    const events = this.session.get("events");
    const event = events.shift();
    if (event) {
      switch (event.type) {
        case "code-init":
          const { code, transpiled, i, css, errorDiff, html } = event;
          const sess = {
            code,
            transpiled,
            i,
            css,
            errorDiff,
            html
          };
          this.session.set("events", events);
          this.session.set("state", Record(sess)());
      }
    }
  }
  createPatchFromHashCode(oldHash, state) {
    if (hashStore[oldHash]) {
      const oldRec = hashStore[oldHash];
      const oldState = JSON.stringify(oldRec.toJSON());
      const newRec = oldRec.merge(state);
      const newHash = newRec.hashCode();
      hashStore[newHash] = newRec;
      const newState = JSON.stringify(newRec.toJSON());
      const patch = createPatch(oldState, newState);
      return {
        oldHash,
        newHash,
        patch
      };
    }
  }
  createPatch(state) {
    if (state.code === this.session.get("state").get("code")) {
      return {
        oldHash: this.session.get("state").hashCode(),
        newHash: this.session.get("state").hashCode(),
        patch: ""
      };
    }
    const oldState = JSON.stringify(this.session.get("state").toJSON());
    const oldHash = this.session.get("state").hashCode();
    hashStore[oldHash] = this.session.get("state");
    const oldRec = this.session.get("state");
    const newRec = oldRec.merge(state);
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;
    const newState = JSON.stringify(newRec.toJSON());
    const patch = createPatch(oldState, newState);
    return {
      oldHash,
      newHash,
      patch
    };
  }
  applyPatch({
    oldHash,
    newHash,
    patch
  }) {
    const oldHashCheck = this.session.get("state").hashCode();
    if (oldHashCheck !== oldHash) {
      console.error("Cant update");
      return;
    }
    const oldST = this.session.get("state").toJSON();
    const oldState = JSON.stringify(oldST);
    const oldCode = oldST.code;
    const newState = JSON.parse((0, import_textdiff_patch.default)(oldState, JSON.parse(patch)));
    const newRec = Record(newState)();
    console.log({ newState });
    console.log(newRec.hashCode());
    const newRecord = this.session.get("state").merge(newRec);
    const newCode = newRecord.get("code");
    if (oldCode === newCode) {
      return;
    }
    console.log(newRecord.hashCode());
    const newHashCheck = newRecord.hashCode();
    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
    } else {
      console.log("WRONG");
      console.log({
        newState
      });
    }
  }
  json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }
  setRoom(room) {
    const user = this.session.set("room", room);
    this.session = user;
  }
};
var session = null;
var session_default = (room, u) => session || new CodeSession(room, u);
function storageAvailable(type) {
  try {
    if (!window.hasOwnProperty(type)) {
      return;
    }
    const storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch {
    return false;
  }
}
function createPatch(oldCode, newCode) {
  return JSON.stringify((0, import_textdiff_create.default)(oldCode, newCode));
}

// src/chatRoom.ts
var Code = class {
  constructor(state, env) {
    this.env = env;
    this.kv = state.storage;
    this.state = state;
    this.sessions = [];
    this.env = env;
    this.sessions = [];
    const username = self.crypto.randomUUID().substring(0, 8);
    this.state.blockConcurrencyWhile(async () => {
      const sessionMaybeStr = await this.kv.get("session");
      let session2 = typeof sessionMaybeStr === "string" ? JSON.parse(sessionMaybeStr) : sessionMaybeStr;
      if (!session2) {
        const codeMainId = env.CODE.idFromName("code-main");
        const defaultRoomObject = env.CODE.get(codeMainId);
        const resp = await defaultRoomObject.fetch("session");
        session2 = await resp.json();
        if (!session2) {
          session2 = {
            code: rca_tsx_default,
            transpiled: rca_tsx_default,
            html: "",
            css: "",
            lastTimestamp: 0,
            i: 0
          };
        }
        await this.kv.put("session", session2);
      }
      this.state.mySession = session_default("", {
        name: username,
        capabilities: {
          prettier: false,
          babel: false,
          webRRT: false,
          prerender: false,
          IPFS: false
        },
        users: [],
        state: { ...session2, errorDiff: "" },
        events: []
      });
      return;
    });
  }
  state;
  kv;
  sessions;
  async fetch(request) {
    const mST = () => this.state.mySession.session.get("state");
    return await handleErrors(request, async () => {
      let code = "";
      let patched = false;
      let url = new URL(request.url);
      const codeSpace = url.searchParams.get("room");
      if (codeSpace && this.state.mySession.room === "") {
        this.state.mySession.setRoom(codeSpace);
      }
      let path = url.pathname.slice(1).split("/");
      const vReg = /{VERSION}/ig;
      switch (path[0]) {
        case "code": {
          return new Response(mST().code, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "session":
          return new Response(JSON.stringify(mST().toJSON()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "delta":
          const delta = await this.kv.get("delta");
          let deltaDiffs;
          if (!delta || delta.hashCode !== this.state.mySession.hashCode()) {
            deltaDiffs = [];
          } else {
            deltaDiffs = delta.delta;
          }
          return new Response(JSON.stringify(deltaDiffs || []), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "lazy":
          const { html, css, transpiled } = mST().toJSON();
          const hash2 = this.state.mySession.hashCode();
          return new Response(lazy_default.replace("{...o}", JSON.stringify({
            name: codeSpace,
            transpiled,
            html: `<div id="root"><style>${css}</style><div id="zbody">${html}</div></div>`,
            hash: hash2
          })), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        case "hashCodeSession":
          return new Response(this.state.mySession.hashCode(), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "mySession":
          return new Response(JSON.stringify(this.state.mySession.json()), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json; charset=UTF-8"
            }
          });
        case "js": {
          return new Response(mST().transpiled, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "hydrated": {
          const htmlContent = mST().html;
          const css2 = mST().css;
          const html2 = hydrated_default.replace(`<script type="importmap-shim" src="https://unpkg.com/@spike.land/code@{VERSION}/js/importmap.json"><\/script>`, `<script type="importmap-shim">${JSON.stringify(importmap_default)}<\/script>`).replace(`<div id="root"></div>`, `<div id="root"><style>${css2}</style><div id="zbody">${htmlContent}</div></div>`).replaceAll(vReg, version);
          return new Response(html2, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "env": {
          return new Response(request.url, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "hashCode": {
          const hashCode3 = String(Number(path[1]));
          const patch = await this.kv.get(hashCode3);
          return new Response(JSON.stringify(patch || {}), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "application/javascript; charset=UTF-8"
            }
          });
        }
        case "public": {
          const htmlContent = mST().html;
          const css2 = mST().css;
          const html2 = src_default2.replace(`<script type="importmap-shim" src="https://unpkg.com/@spike.land/code@{VERSION}/js/importmap.json"><\/script>`, `<script type="importmap-shim">${JSON.stringify(importmap_default)}<\/script>`).replace(`<div id="root"></div>`, `<div id="root"><style>${css2}</style><div id="zbody">${htmlContent}</div></div>`).replaceAll(vReg, version);
          return new Response(html2, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "no-cache",
              "Content-Type": "text/html; charset=UTF-8"
            }
          });
        }
        case "websocket": {
          if (request.headers.get("Upgrade") != "websocket") {
            return new Response("expected websocket", { status: 400 });
          }
          let ip = request.headers.get("CF-Connecting-IP") || "192.100.123.1";
          let pair = new WebSocketPair();
          await this.handleSession(pair[1], ip);
          return new Response(null, { status: 101, webSocket: pair[0] });
        }
        default:
          return new Response("Not found", { status: 404 });
      }
    });
  }
  async handleSession(webSocket, ip) {
    const mST = () => this.state.mySession.session.get("state");
    webSocket.accept();
    let limiterId = this.env.LIMITERS.idFromName(ip);
    let limiter = new RateLimiterClient(() => this.env.LIMITERS.get(limiterId), (err) => webSocket.close(1011, err.stack));
    const uuid = self.crypto.randomUUID();
    const newConnEvent = {
      uuid,
      hashCode: this.state.mySession.hashCode(),
      type: "new-ws-connection",
      timestamp: Date.now()
    };
    webSocket.send(JSON.stringify(newConnEvent));
    let session2 = {
      uuid,
      webSocket,
      blockedMessages: []
    };
    this.sessions.push(session2);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session2.blockedMessages.push(JSON.stringify({
          joined: otherSession.name,
          i: mST().i,
          hashCode: this.state.mySession.hashCode()
        }));
      }
    });
    webSocket.addEventListener("message", async (msg) => {
      session2.webSocket.send(JSON.stringify({
        hashCode: this.state.mySession.hashCode()
      }));
      try {
        if (session2.quit) {
          if (session2.name && typeof session2.name === "string") {
          }
          webSocket.close(1011, "WebSocket broken.");
          return;
        }
        if (typeof msg.data !== "string")
          return;
        let data = JSON.parse(msg.data);
        this.state.mySession.addEvent({ ...data, uuid: session2.uuid });
        if (!(data.type && (data.type === "new-ice-candidate" || data.type === "video-offer" || data.type === "video-answer")) && !limiter.checkLimit()) {
          webSocket.send(JSON.stringify({
            error: "Your IP is being rate-limited, please try again later."
          }));
          return;
        }
        if (data.type === "lost") {
          webSocket.send(JSON.stringify({
            ...mST().toJSON()
          }));
        }
        if (!session2.name && data.name) {
          session2.name = "" + (data.name || "anonymous");
          if (session2.name.length > 32) {
            webSocket.send(JSON.stringify({ error: "Name too long." }));
            webSocket.close(1009, "Name too long.");
            return;
          }
          session2.blockedMessages = [];
          const messageEv = {
            type: "code-init",
            hashCode: this.state.mySession.hashCode()
          };
          webSocket.send(JSON.stringify(messageEv));
          return;
        }
        if (data.type && (data.type === "new-ice-candidate" || data.type === "video-offer" || data.type === "video-answer")) {
          this.user2user(data.target, { name: session2.name, ...data });
          return;
        }
        if (data.type && data.type === "delta") {
          const delta = data.delta;
          await this.kv.put("delta", {
            delta,
            hashCode: this.state.mySession.hashCode()
          });
          return;
        }
        if (data.patch && data.oldHash === this.state.mySession.hashCode()) {
          const newHash = data.newHash;
          const oldHash = data.oldHash;
          const patch = data.patch;
          this.state.mySession.applyPatch(data);
          if (newHash === this.state.mySession.hashCode()) {
            this.broadcast(msg.data);
            const session3 = mST().toJSON();
            await this.kv.put("session", session3);
            await this.kv.put(String(newHash), { oldHash, patch });
          } else {
            this.user2user(data.name, {
              hashCode: this.state.mySession.hashCode()
            });
          }
          return;
        }
      } catch {
        webSocket.send(JSON.stringify({
          error: "unknown error"
        }));
      }
    });
    let closeOrErrorHandler = () => {
      session2.quit = true;
      this.sessions = this.sessions.filter((member) => member !== session2);
      if (session2.name) {
        this.broadcast({ quit: session2.name });
      }
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  user2user(to, msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    this.sessions.filter((session2) => session2.name === to).map((s) => s.webSocket.send(message));
  }
  broadcast(msg) {
    const message = typeof msg !== "string" ? JSON.stringify(msg) : msg;
    let quitters = [];
    this.sessions = this.sessions.filter((session2) => {
      if (session2.name) {
        try {
          session2.webSocket.send(message);
          return true;
        } catch (err) {
          session2.quit = true;
          quitters.push(session2);
          return false;
        }
      } else {
        session2.blockedMessages.push(message);
        return true;
      }
    });
    quitters.forEach((quitter) => {
      if (quitter.name) {
        this.broadcast({ quit: quitter.name });
      }
    });
  }
};

// src/rateLimiter.ts
var CodeRateLimiter = class {
  nextAllowedTime;
  constructor(state, env) {
    this.nextAllowedTime = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
      let now = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      if (request.method == "POST") {
        this.nextAllowedTime += 1;
      }
      let coolDown = Math.max(0, this.nextAllowedTime - now - 20);
      return new Response(`${coolDown}`);
    });
  }
};

// src/index.ts
var src_default3 = chat_default;
export {
  Code,
  CodeRateLimiter,
  src_default3 as default
};
