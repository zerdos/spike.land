// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      const e = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(e)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
      return v;
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("diff", [], function (exports_1, context_1) {
    "use strict";
    var DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL;
    var __moduleName = context_1 && context_1.id;
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
        var front = (delta % 2 !== 0);
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d = 0; d < max_d; d++) {
            for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
                var k1_offset = v_offset + k1;
                var x1;
                if (k1 === -d || (k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
                    x1 = v1[k1_offset + 1];
                }
                else {
                    x1 = v1[k1_offset - 1] + 1;
                }
                var y1 = x1 - k1;
                while (x1 < text1_length && y1 < text2_length &&
                    text1.charAt(x1) === text2.charAt(y1)) {
                    x1++;
                    y1++;
                }
                v1[k1_offset] = x1;
                if (x1 > text1_length) {
                    k1end += 2;
                }
                else if (y1 > text2_length) {
                    k1start += 2;
                }
                else if (front) {
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
                if (k2 === -d || (k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
                    x2 = v2[k2_offset + 1];
                }
                else {
                    x2 = v2[k2_offset - 1] + 1;
                }
                var y2 = x2 - k2;
                while (x2 < text1_length && y2 < text2_length &&
                    text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
                    x2++;
                    y2++;
                }
                v2[k2_offset] = x2;
                if (x2 > text1_length) {
                    k2end += 2;
                }
                else if (y2 > text2_length) {
                    k2start += 2;
                }
                else if (!front) {
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
            if (text1.substring(pointerstart, pointermid) ==
                text2.substring(pointerstart, pointermid)) {
                pointermin = pointermid;
                pointerstart = pointermin;
            }
            else {
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
            if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
                text2.substring(text2.length - pointermid, text2.length - pointerend)) {
                pointermin = pointermid;
                pointerend = pointermin;
            }
            else {
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
        function diff_halfMatchI_(longtext, shorttext, i) {
            var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
            var j = -1;
            var best_common = '';
            var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
            while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
                var prefixLength = diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
                var suffixLength = diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
                if (best_common.length < suffixLength + prefixLength) {
                    best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
                    best_longtext_a = longtext.substring(0, i - suffixLength);
                    best_longtext_b = longtext.substring(i + prefixLength);
                    best_shorttext_a = shorttext.substring(0, j - suffixLength);
                    best_shorttext_b = shorttext.substring(j + prefixLength);
                }
            }
            if (best_common.length * 2 >= longtext.length) {
                return [
                    best_longtext_a, best_longtext_b,
                    best_shorttext_a, best_shorttext_b, best_common
                ];
            }
            else {
                return null;
            }
        }
        var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
        var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
        var hm;
        if (!hm1 && !hm2) {
            return null;
        }
        else if (!hm2) {
            hm = hm1;
        }
        else if (!hm1) {
            hm = hm2;
        }
        else {
            hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
            text1_a = hm[0];
            text1_b = hm[1];
            text2_a = hm[2];
            text2_b = hm[3];
        }
        else {
            text2_a = hm[0];
            text2_b = hm[1];
            text1_a = hm[2];
            text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
    }
    function diff_cleanupMerge(diffs, fix_unicode) {
        diffs.push([DIFF_EQUAL, '']);
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = '';
        var text_insert = '';
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
                                }
                                else {
                                    diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                                    pointer++;
                                }
                                text_insert = text_insert.substring(commonlength);
                                text_delete = text_delete.substring(commonlength);
                            }
                            commonlength = diff_commonSuffix(text_insert, text_delete);
                            if (commonlength !== 0) {
                                diffs[pointer][1] =
                                    text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                                text_insert = text_insert.substring(0, text_insert.length - commonlength);
                                text_delete = text_delete.substring(0, text_delete.length - commonlength);
                            }
                        }
                        var n = count_insert + count_delete;
                        if (text_delete.length === 0 && text_insert.length === 0) {
                            diffs.splice(pointer - n, n);
                            pointer = pointer - n;
                        }
                        else if (text_delete.length === 0) {
                            diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
                            pointer = pointer - n + 1;
                        }
                        else if (text_insert.length === 0) {
                            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
                            pointer = pointer - n + 1;
                        }
                        else {
                            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
                            pointer = pointer - n + 2;
                        }
                    }
                    if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
                        diffs[pointer - 1][1] += diffs[pointer][1];
                        diffs.splice(pointer, 1);
                    }
                    else {
                        pointer++;
                    }
                    count_insert = 0;
                    count_delete = 0;
                    text_delete = '';
                    text_insert = '';
                    break;
            }
        }
        if (diffs[diffs.length - 1][1] === '') {
            diffs.pop();
        }
        var changes = false;
        pointer = 1;
        while (pointer < diffs.length - 1) {
            if (diffs[pointer - 1][0] === DIFF_EQUAL &&
                diffs[pointer + 1][0] === DIFF_EQUAL) {
                if (diffs[pointer][1].substring(diffs[pointer][1].length -
                    diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
                    diffs[pointer][1] = diffs[pointer - 1][1] +
                        diffs[pointer][1].substring(0, diffs[pointer][1].length -
                            diffs[pointer - 1][1].length);
                    diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
                    diffs.splice(pointer - 1, 1);
                    changes = true;
                }
                else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
                    diffs[pointer + 1][1]) {
                    diffs[pointer - 1][1] += diffs[pointer + 1][1];
                    diffs[pointer][1] =
                        diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
                            diffs[pointer + 1][1];
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
    exports_1("diff_cleanupMerge", diff_cleanupMerge);
    function is_surrogate_pair_start(charCode) {
        return charCode >= 0xD800 && charCode <= 0xDBFF;
    }
    function is_surrogate_pair_end(charCode) {
        return charCode >= 0xDC00 && charCode <= 0xDFFF;
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
        var oldRange = typeof cursor_pos === 'number' ?
            { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
        var newRange = typeof cursor_pos === 'number' ?
            null : cursor_pos.newRange;
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
    exports_1("diff", diff);
    return {
        setters: [],
        execute: function () {
            DIFF_DELETE = -1;
            DIFF_INSERT = 1;
            DIFF_EQUAL = 0;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            ;
            diff.INSERT = DIFF_INSERT;
            diff.DELETE = DIFF_DELETE;
            diff.EQUAL = DIFF_EQUAL;
        }
    };
});
System.register("codeBox", ["diff"], function (exports_2, context_2) {
    "use strict";
    var diff_js_1, importScript, run;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (diff_js_1_1) {
                diff_js_1 = diff_js_1_1;
            }
        ],
        execute: function () {
            importScript = async (src) => new Promise(function (resolve, reject) {
                const s = document.createElement("script");
                s.src = src;
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
            exports_2("run", run = async (startMonaco) => {
                await importScript("https://cdnjs.cloudflare.com/ajax/libs/core-js/3.6.5/minified.js");
                await importScript("https://unpkg.com/@babel/standalone@7.12.4/babel.min.js");
                await importScript("https://unpkg.com/react@17.0.1/umd/react.production.min.js");
                await importScript("https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js");
                await importScript("https://unpkg.com/interactjs@1.10.0/dist/interact.min.js");
                const searchRegExp = /import/gi;
                const replaceWith = "///";
                setTimeout(() => makeDragabble(), 100);
                let latestGoodCode = "";
                const transpileCode = (code) => window["Babel"].transform(code, {
                    plugins: [],
                    presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
                }).code.replace(searchRegExp, replaceWith);
                const restartCode = async (transpileCode) => {
                    const restart = new Function("transpileCode", `return function(){ ${transpileCode} }`)();
                    const body = {
                        codeTranspiled: transpileCode,
                        code: latestGoodCode,
                    };
                    const stringBody = JSON.stringify(body);
                    const request = new Request("https://my-ts-project.zed-vision.workers.dev", {
                        body: stringBody,
                        method: "POST",
                        headers: { "content-type": "application/json;charset=UTF-8" },
                    });
                    const response = await fetch(request);
                    const { hash } = await response.json();
                    try {
                        const localStorage = window.localStorage;
                        const prev = localStorage.getItem("codeBoXHash");
                        localStorage.setItem("codeBoXHash", hash);
                        localStorage.setItem(hash, latestGoodCode);
                        location.hash = hash;
                    }
                    catch (e) {
                        console.log("no Localstorage");
                    }
                    restart();
                };
                let keystrokeTillNoError = 0;
                let latestCode = "";
                let errorReported = "";
                let busy = 0;
                let latestBadCode = "";
                (async () => {
                    const example = getCodeToLoad();
                    latestGoodCode = example;
                    latestBadCode = example;
                    const editor = await startMonaco({
                        language: "typescript",
                        code: example,
                        onChange: (code) => {
                            latestCode = code;
                            const runner = async (cd) => {
                                if (busy === 1)
                                    return;
                                busy = 1;
                                const err = await getErrors(editor);
                                const errorDiv = document.getElementById("error");
                                try {
                                    busy = 0;
                                    if (cd !== latestCode)
                                        return;
                                    if (err && err.length) {
                                        if (latestCode != cd)
                                            return;
                                        if (errorReported === cd)
                                            return;
                                        document.getElementById("root").classList.add("almosthidden");
                                        const slices = diff_js_1.diff(latestGoodCode, cd);
                                        console.log(slices);
                                        if (slices.length <= 3) {
                                            latestBadCode = cd;
                                            window["monaco"].editor.setTheme("hc-black");
                                            return;
                                        }
                                        errorDiv.innerHTML = errors[0].messageText;
                                        document.getElementById("root").style.setProperty("dispay", "none");
                                        errorDiv.style.display = "block";
                                        errorReported = cd;
                                        window["monaco"].editor.setTheme("vs-light");
                                        setTimeout(() => {
                                            window["monaco"].editor.setTheme("hc-black");
                                        }, keystrokeTillNoError++);
                                        return;
                                    }
                                    latestGoodCode = cd;
                                    errorDiv.style.display = "none";
                                    window["monaco"].editor.setTheme("vs-dark");
                                    document.getElementById("root").classList.remove("almosthidden");
                                    keystrokeTillNoError = 0;
                                    busy = 0;
                                    restartCode(transpileCode(cd));
                                }
                                catch (err) {
                                    busy = 0;
                                    if (cd !== latestCode)
                                        return;
                                    window["monaco"].editor.setTheme("vs-light");
                                    setTimeout(() => {
                                        window["monaco"].editor.setTheme("hc-black");
                                    }, 10);
                                    console.error(err);
                                }
                            };
                            if (!busy)
                                runner(latestCode);
                            else {
                                const myCode = code;
                                const cl = setInterval(() => {
                                    if (myCode !== latestCode || !busy) {
                                        clearInterval(cl);
                                    }
                                    if (!busy)
                                        runner(latestCode);
                                }, 100);
                            }
                        },
                    });
                })();
                restartCode(transpileCode(getCodeToLoad()));
                document.getElementById("root").setAttribute("style", "display:block");
                async function getErrors(editor) {
                    const model = editor.getModel("file:///main.tsx");
                    const tsWorker = await window["monaco"].languages.typescript
                        .getTypeScriptWorker();
                    const modelUri = model?.uri;
                    if (!modelUri)
                        return;
                    const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
                    const comp = await (await tsWorker(modelUri))
                        .getCompilerOptionsDiagnostics("file:///main.tsx");
                    const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
                    return [...diag, ...comp, ...syntax];
                }
                const makeDragabble = () => {
                    window.interact(".draggable")
                        .draggable({
                        inertia: true,
                        modifiers: [
                            interact.modifiers.restrictRect({
                                restriction: "parent",
                                endOnly: true,
                            }),
                        ],
                        autoScroll: false,
                        listeners: {
                            move: dragMoveListener,
                        },
                    });
                };
                function dragMoveListener(event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
                    target.style.webkitTransform = target.style.transform = "translate(" + x +
                        "px, " + y + "px)";
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                }
                function getCodeToLoad() {
                    const hash = window.localStorage.getItem("codeBoXHash");
                    return window.localStorage.getItem(location.hash.substring(1)) ||
                        window.localStorage.getItem(hash) ||
                        window.localStorage.getItem("STARTER");
                }
            });
        }
    };
});

const __exp = __instantiate("codeBox", false);
export const run = __exp["run"];

